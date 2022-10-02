<template>
  <div class="aside-box">
    <ul class="aside-tabs">
      <template v-for="item in list" :key="item.name">
        <router-link
          class="aside-tab"
          :to="item.route"
          active-class="aside-tab-active"
          href=""
        >
          <li class="text">{{ item.name }}</li>
        </router-link>
        <!-- <li class="aside-tab" active-class="aside-tab-active">
          <router-link class="text" :to="item.route" href="">{{
            item.name
          }}</router-link>
        </li> -->
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const list = [
  { name: '账号设置', route: '/setting/setupCenter' },
  { name: '主题更换', route: '/setting/topics' },
  { name: '用户隐私协议', route: '/setting/privacyAgreement' },
  { name: '关于', route: '/setting/about' }
]
</script>
<style scoped>
.aside-tabs {
  border-right: 1px solid #eee;
  width: 12rem;
  height: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
}
.aside-tab {
  height: 3rem;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  padding: 0 0.5rem;
}
.text {
  border-radius: 8px;
  padding-left: 0.5rem;
  padding-top: 0.7rem;
  display: flex;
  text-align: center;
  height: 100%;
  align-content: center;
  justify-content: flex-start;
  width: 100%;
}
.aside-tab :hover {
  background: rgb(0, 123, 255);
  color: #eee;
}
.aside-tab-active {
  color: #147ad9;
  border-left: 2px solid #147ad9;
}
</style>
