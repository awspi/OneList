<template>
  <div class="sc-box">
    <div class="sc-header">
      <p class="sc-title">账号设置</p>
      <div class="avatar">
        <img
          :src="
            $store.getters.userInfo.img ||
            'https://img9.vilipix.com/picture/logo/2022/05/01/19/30/22652455_da3716e7a44e66b9c49b17f3fec20438_170.jpg'
          "
          class="avatar-img"
          alt=""
        />
        <p class="avatar-name">
          <span>{{ $store.getters.userInfo.nickname }}</span>
          <span class="text-sm ml-2">{{
            `(${$store.getters.userInfo.username})`
          }}</span>
        </p>
      </div>
    </div>
    <div class="sc-content">
      <p class="sc-title">账号信息</p>
      <div class="info-title info-space">密码</div>
      <div class="passworld info-space">
        <transition name="pwBlock" mode="out-in">
          <template v-if="!pwChange">
            <div>
              <a class="passworld-change-bnt" @click="changePw">更改密码</a>
            </div>
          </template>
          <template v-else>
            <div class="pw-change-box">
              <div class="changepw-box">
                <input
                  v-model="passwordChange.oldPassword"
                  class="change-input"
                  type="text"
                  placeholder="当前密码"
                  @change="changeInput"
                />
                <input
                  v-model="passwordChange.newPassword"
                  class="change-input"
                  type="text"
                  placeholder="新密码"
                  @change="changeInput"
                />
              </div>
              <div class="pw-bnt-box">
                <button class="pw-bnt" @click="changePw">取消</button>
                <button
                  class="pw-bnt pw-determine"
                  :class="pwFinish ? 'pwFinish' : ''"
                  @click="confirmPw"
                >
                  确定
                </button>
              </div>
            </div>
          </template>
        </transition>
      </div>
      <div class="info-title info-space">第三方账号绑定</div>
      <div class="bind info-space">
        <div class="bind-box">
          <m-svg-icon
            name="QQ"
            class="mt-6 w-10 h-10 p-1 rounded-md duration-150 cursor-pointe icon"
            fill-class="text-white"
          ></m-svg-icon>
          <div class="icon-text">
            <span>QQ </span><a class="change-bnt">立即绑定</a>
          </div>
        </div>
        <div class="bind-box">
          <m-svg-icon
            name="wechat"
            class="mt-6 w-10 h-10 p-1 rounded-md duration-150 cursor-pointe icon"
            fill-class="text-white"
          ></m-svg-icon>
          <div class="icon-text">
            <span>微信</span><a class="change-bnt">立即绑定</a>
          </div>
        </div>
      </div>
      <div class="info-title info-space">注销账号</div>
      <div class="cancellation" @click="cancellation">注销账号</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { confirm, message } from '@/libs'
const store = useStore()

let pwChange = ref(false)
let pwFinish = ref(false)

let passwordChange = ref({
  oldPassword: '',
  newPassword: ''
})

// 修改密码页面切换
const changePw = () => {
  pwChange.value = !pwChange.value
}
// 检查是否账号密码都输入了,改变css
const changeInput = () => {
  if (passwordChange.value.oldPassword && passwordChange.value.newPassword) {
    pwFinish.value = true
  } else {
    pwFinish.value = false
  }
}
// 确定修改
const confirmPw = () => {
  console.log('提交')
}

// 注销账号
const cancellation = async () => {
  confirm('提示', '确定要注销吗').then(async () => {
    try {
      const res = await store.dispatch('user/cancellation')
      if (res.state) {
        message('success', '注销成功')
      }
    } catch (error) {
      console.log(error)
    }
  })
}
</script>
<style scoped>
.sc-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sc-header {
  height: 10rem;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}
.sc-title {
  font-size: 1.5rem;
}

.avatar {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
}
.avatar-img {
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
}
.avatar-name {
  margin-left: 1rem;
  font-size: 1.3rem;
}
.sc-content {
  flex: 1;
  padding: 1.5rem;
}

.info-space {
  margin-top: 1rem;
}

.info-title {
  font-size: 1.2rem;
}
.change-bnt {
  margin-left: 1rem;
  color: #147ad9;
  cursor: pointer;
}
.passworld {
  display: flex;
}

.passworld-change-bnt {
  color: #147ad9;
  cursor: pointer;
}

.pw-change-box {
  display: flex;
  flex-direction: column;
}
.changepw-box {
  display: flex;
  flex-direction: column;
}
.change-input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 2.5rem;
  width: 15rem;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
}
.change-input:focus {
  border: 1px solid #147ad9;
}
.pw-bnt-box {
  display: flex;
}
.pw-bnt {
  height: 2.5rem;
  width: 7rem;
  border-radius: 5px;
  font-size: 0.8em;
  border: 1px solid #ccc;
}

.pw-determine {
  margin-left: 1rem;
  color: #eee;
  pointer-events: none;
  background: rgba(64, 149, 229, 0.5);
}
.pwFinish {
  pointer-events: auto;
  background: rgba(64, 149, 229, 1);
}

.bind {
  display: flex;
  flex-direction: column;
}

.bind-box {
  display: flex;
  align-items: center;
}
.icon-text {
  margin-top: 1.5rem;
}

.cancellation {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #d23333;
  cursor: pointer;
}

/* 动画过度 */
.pwBlock-enter-from,
.pwBlock-leave-to {
  opacity: 0;
}

.pwBlock-enter-active,
.pwBlock-leave-active {
  transition: opacity 0.5s ease;
  /* animation: backOutLeft 1s; */
}
</style>
