<template>
  <div class="card-box">
    <div class="content-card card-left">
      <div class="card-header">
        <p card-title><span>10/03</span> <span>周一</span></p>
        <p class="card-icon">
          <m-svg-icon
            name="plus"
            :fill-class="titleClass"
            class="w-10 h-10 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
        </p>
      </div>
      <div class="card-list">
        <div class="card-item">
          <m-svg-icon
            name="circle"
            :fill-class="titleClass"
            class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
          <div class="item-text">
            <p class="text-index">英语</p>
            <p class="text-time">今天</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-card card-one">
      <div class="card-header">
        <p card-title><span>10/03</span> <span>周一</span></p>
        <p class="card-icon">
          <m-svg-icon
            name="plus"
            :fill-class="titleClass"
            class="w-10 h-10 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
        </p>
      </div>
      <div class="card-list">
        <div class="card-item">
          <m-svg-icon
            name="circle"
            :fill-class="titleClass"
            class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
          <div class="item-text">
            <p class="text-index">英语</p>
            <p class="text-time">今天</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-card card-two">
      <div class="card-header">
        <p card-title><span>10/03</span> <span>周一</span></p>
        <p class="card-icon">
          <m-svg-icon
            name="plus"
            :fill-class="titleClass"
            class="w-10 h-10 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
        </p>
      </div>
      <div class="card-list">
        <div class="card-item">
          <m-svg-icon
            name="circle"
            :fill-class="titleClass"
            class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
          <div class="item-text">
            <p class="text-index">英语</p>
            <p class="text-time">今天</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-card card-active">
      <div class="card-header">
        <p card-title><span>10/03</span> <span>周一</span></p>
        <p class="card-icon">
          <m-svg-icon
            name="plus"
            :fill-class="titleClass"
            class="w-10 h-10 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
        </p>
      </div>
      <div class="card-list">
        <div class="card-item">
          <m-svg-icon
            name="circle"
            :fill-class="titleClass"
            class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
          <div class="item-text">
            <p class="text-index">英语</p>
            <p class="text-time">今天</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-card card-four">
      <div class="card-header">
        <p card-title><span>10/03</span> <span>周一</span></p>
        <p class="card-icon">
          <m-svg-icon
            name="plus"
            :fill-class="titleClass"
            class="w-10 h-10 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
        </p>
      </div>
      <div class="card-list">
        <div class="card-item">
          <m-svg-icon
            name="circle"
            :fill-class="titleClass"
            class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
          <div class="item-text">
            <p class="text-index">英语</p>
            <p class="text-time">今天</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-card card-five">
      <div class="card-header">
        <p card-title><span>10/03</span> <span>周一</span></p>
        <p class="card-icon">
          <m-svg-icon
            name="plus"
            :fill-class="titleClass"
            class="w-10 h-10 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
        </p>
      </div>
      <div class="card-list">
        <div class="card-item">
          <m-svg-icon
            name="circle"
            :fill-class="titleClass"
            class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
          <div class="item-text">
            <p class="text-index">英语</p>
            <p class="text-time">今天</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-card card-right">
      <div class="card-header">
        <p card-title><span>10/03</span> <span>周一</span></p>
        <p class="card-icon">
          <m-svg-icon
            name="plus"
            :fill-class="titleClass"
            class="w-10 h-10 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
        </p>
      </div>
      <div class="card-list">
        <div class="card-item">
          <m-svg-icon
            name="circle"
            :fill-class="titleClass"
            class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
          ></m-svg-icon>
          <div class="item-text">
            <p class="text-index">英语</p>
            <p class="text-time">今天</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  titleClass: {
    type: String,
    default: 'text-pro-4'
  }
})
let data = ref([1, 2, 3, 4, 5])
</script>
<style scoped>
.content-card {
  position: absolute;
  width: 33rem;
  height: 50rem;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  box-shadow: 0 0 5px #e5f8f9, 0 0 25px #e5f8f9, 0 0 50px #e5f8f9,
    0 0 200px #e5f8f9;
}

/* 卡片位置 */
.card-left {
  left: 0;
  margin-left: -60%;
  z-index: 1;
  transform: scale(0.85);
}
.card-one {
  left: 0;
  margin-left: -1.8%;
  z-index: 2;
  transform: scale(0.9);
}
.card-two {
  left: 25%;
  z-index: 3;
  margin-left: -15%;
  transform: scale(0.95);
}
.card-active {
  left: 50%;
  z-index: 4;
  margin-left: -19%;
  transform: scale(1);
}
.card-four {
  right: 25%;
  z-index: 3;
  margin-right: -15%;
  transform: scale(0.95);
}
.card-five {
  right: 0;
  z-index: 2;
  margin-right: -1.8%;
  transform: scale(0.9);
}
.card-right {
  right: 0;
  margin-right: -60%;
  z-index: 1;
  transform: scale(0.85);
}
.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  border-bottom: 1px solid #ccc;
}
.card-icon {
  cursor: pointer;
}
.card-list {
  display: flex;
  flex-direction: column;
}
.card-item {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
}
.item-text {
  margin-left: 0.2rem;
  display: flex;
  flex-direction: column;
}
.text-index {
  font-size: 0.9em;
}
.text-time {
  font-size: 0.5em;
  color: #0084ff;
}
</style>
