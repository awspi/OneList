<template>
  <div class="calendar-box">
    <!-- header部分 -->
    <header class="calendar-header">
      <p class="header-title">日程</p>
      <div class="header-change">
        <span> &lt;</span> <span>2020/10</span> <span>&gt;</span>
      </div>
      <div class="header-bnt">隐藏已完成</div>
    </header>
    <!-- 卡片部分 -->
    <div class="calendar-content">
      <!-- 卡片框 -->
      <Card></Card>
    </div>
  </div>
</template>

<script setup>
import Card from './Card.vue'
</script>
<style scoped>
.calendar-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.calendar-header {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  margin-left: 2rem;
  font-size: 1.5em;
}
.header-change {
  font-size: 1.5em;
}
.header-bnt {
  margin-right: 2rem;
  font-size: 1em;
}

/* 卡片部分css */
.calendar-content {
  flex: 1;
  width: 100%;
  padding-top: 3rem;
  box-sizing: content-box;
  overflow: hidden;
  position: relative;
}
</style>
