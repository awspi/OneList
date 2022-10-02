<template>
  <div class="about-box">
    <p class="about-title">关于</p>
    <p class="about-text">
      使用中遇到无法解决的问题或者对我们有什么想反馈的意见，你可以发送反馈或者发送邮件到3214026782@qq.com联系我们
    </p>
    <p class="about-title">下载</p>
    <p class="about-text">
      你可以在Android,iPhone,Web等多个平台，甚至微信小程序上使用一个清单，随时随地记录查看你的任务。平台之间同步速度快，完全免费。
    </p>
    <div class="download-box">
      <div class="download-bnt">
        <m-svg-icon
          name="android"
          class="mt-6 w-12 h-12 p-1 rounded-md duration-150 cursor-pointe icon"
          fill-class="text-black"
        ></m-svg-icon>
        <p class="bnt-name">Android</p>
      </div>
      <div class="download-bnt">
        <m-svg-icon
          name="apple"
          class="mt-6 w-12 h-12 p-1 rounded-md duration-150 cursor-pointe icon"
          fill-class="text-black"
        ></m-svg-icon>
        <p class="bnt-name">ios</p>
      </div>
      <div class="download-bnt">
        <m-svg-icon
          name="weixin-mini-app"
          class="mt-6 w-12 h-12 p-1 rounded-md duration-150 cursor-pointe icon"
          fill-class="text-black"
        ></m-svg-icon>
        <p class="bnt-name">微信小程序</p>
      </div>
    </div>
    <p class="about-title">致谢</p>
    <p class="about-text">
      一个清单是有我们“小而美团队”共同完成，十分感谢大家的努力与付出和老师的精心指导!
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>
<style scoped>
.about-box {
  padding: 1.5rem;
}
.about-title {
  margin-top: 1rem;
  font-size: 1.5rem;
}
.about-text {
  color: #101010;
  width: 40rem;
  margin-top: 1rem;
}

.download-box {
  margin-top: 1rem;
  height: 10rem;
  width: 65%;
  justify-content: space-between;
  align-items: center;
  /* background: #ccc; */
  display: flex;
}

.download-bnt {
  border-radius: 8px;
  width: 8rem;
  height: 9rem;
  /* background: #ccc; */
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.download-bnt:hover {
  background: #ccc;
}

.bnt-name {
  margin: 1rem;
}
</style>
