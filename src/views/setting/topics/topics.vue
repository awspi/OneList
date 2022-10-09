<template>
  <div class="topics-box">
    <p class="topics-title">主题更换</p>
    <div class="topics-content">
      <div class="color-frame" @click="changeColor('#eeeeee')">
        <div class="color-block color-white"></div>
        <p class="color-title">霜白</p>
      </div>
      <div class="color-frame" @click="changeColor('#82b3e2')">
        <div class="color-block color-blue"></div>
        <p class="color-title">天蓝</p>
      </div>
      <div class="color-frame" @click="changeColor('#cccccc')">
        <div class="color-block color-grey"></div>
        <p class="color-title">朦灰</p>
      </div>
      <div class="color-frame" @click="changeColor('#75f9fd')">
        <div class="color-block color-green"></div>
        <p class="color-title">踏青</p>
      </div>
      <div class="color-frame" @click="changeColor('#de868f')">
        <div class="color-block color-red"></div>
        <p class="color-title">桃红</p>
      </div>
      <div class="color-frame" @click="changeColor('#7728f5')">
        <div class="color-block color-purple"></div>
        <p class="color-title">静夜</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore()

const changeColor = (newColor) => {
  const res = store.commit('app/setThemecolor', newColor)
  // console.log(res)
}
</script>
<style scoped>
.topics-box {
  height: 100%;
  width: 100%;
  padding: 1.5rem;
}

.topics-title {
  font-size: 1.5rem;
}

.topics-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.color-frame {
  border-radius: 8px;
  margin: 2rem 2rem 2rem 0;
  width: 10.5rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: aqua; */
}

.color-block {
  width: 100%;
  height: 16.5rem;
  border-radius: 8px;
}
.color-title {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: #101010;
}
.color-block:hover {
  border: 3px solid #fff;
}

.color-white {
  background: #eeeeee;
}
.color-blue {
  background: #82b3e2;
}
.color-grey {
  background: #cccccc;
}
.color-green {
  background: #75f9fd;
}
.color-red {
  background: #de868f;
}
.color-purple {
  background: #7728f5;
}
</style>
