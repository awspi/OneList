<template>
  <div class="overflow-auto flex flex-col items-center">
    <img ref="imgTarget" :src="blob" alt="" />
    <m-button
      class="mt-4 w-[80%] xl:1/2"
      :loading="loading"
      @click="onConfirmClick"
      >确定</m-button
    >
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
//PC端配置对象
const pcOptions = {
  aspectRatio: 1 / 1
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
//裁剪图片
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { getOSSClient } from '@/utils/sts.js'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { putProfile } from '@/api/user.js'

const loading = ref(false)
const imgTarget = ref(null)
const emits = defineEmits([EMITS_CLOSE])
defineProps({
  blob: {
    type: String,
    required: true
  }
})
/**
 * 裁剪头像
 * !vue中 onMounted之后再获取DOM
 */
let cropper = null
onMounted(() => {
  cropper = new Cropper(imgTarget.value, pcOptions)
})

const onConfirmClick = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob((blob) => {
    // console.log(URL.createObjectURL(blob))
    putObjectToOSS(blob)
  })
}
/**
 * OSS上传
 */
let ossClient = null
let store = useStore()
const putObjectToOSS = async (file) => {
  console.log(123, file)
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    // 因为当前凭证只具备 avatar 文件夹下的访问权限，所以图片需要上传到 avatar/xxx.xx 。否则你将得到一个 《AccessDeniedError: You have no right to access this object because of bucket acl.》 的错误
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    // 文件存放路径，文件
    const res = await ossClient.put(`avatar/${fileName}`, file)
    // 通知服务器
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
  }
}
/**
 *
 * @param {*} avatar
 */
const onChangeProfile = async (img) => {
  //更新vuex
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    img
  })
  await putProfile({ img })
  // 通知
  message('success', '用户头像修改成功')
  // 关闭 loading
  loading.value = false
  // 关闭 dialog
  close()
}

const close = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
