<template>
  <div class="setting-box">
    <div class="settting-header">
      <p class="header-title">设置中心</p>
      <router-link to="/"><button class="header-bnt">完成</button></router-link>
    </div>
    <div class="setting-content">
      <asideVue class="asideVue"></asideVue>
      <mainVue class="mainVue"></mainVue>
    </div>
  </div>
</template>

<script setup>
import mainVue from './components/main.vue'
import asideVue from './components/aside.vue'
</script>

<style scoped>
.setting-box {
  width: 60rem;
  height: 100vh;
  margin: auto;
}
.settting-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding-top: 1.3rem;
  height: 9vh;
  width: 100%;
}
.header-title {
  font-size: 2em;
  font-family: AliFont;
}
.header-bnt {
  border: 1px solid #ccc;
  color: #eee;
  background: #4095e5;
  border-radius: 8px;
  height: 3rem;
  width: 8rem;
}
.setting-content {
  height: 88vh;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  display: flex;
}

.asideVue {
  width: 12rem;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #fff;
}
.mainVue {
  flex: 1;
  height: 100%;
}
</style>
