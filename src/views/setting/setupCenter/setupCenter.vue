<template>
  <div class="sc-box">
    <div class="sc-header">
      <p class="sc-title">账号设置</p>
      <div class="avatar">
        <img
          src="https://img9.vilipix.com/picture/logo/2022/05/01/19/30/22652455_da3716e7a44e66b9c49b17f3fec20438_170.jpg"
          class="avatar-img"
          alt=""
        />
        <p class="avatar-name"><span>洛依尘</span></p>
      </div>
    </div>
    <div class="sc-content">
      <p class="sc-title">账号信息</p>
      <div class="info-title info-space">密码</div>
      <div class="passworld info-space">
        <a class="passworld-change-bnt">更改密码</a>
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
      <div class="cancellation">注销账号</div>
    </div>
  </div>
</template>

<script setup>
const data = {
  passworld: 'XW*******58'
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
</style>
