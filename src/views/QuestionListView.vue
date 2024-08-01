<script setup>
import { reactive } from 'vue';

import questionList from '@/utils/tgGlobalSetting';
window.Telegram.WebApp.BackButton.isVisible = true;
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const navicatePage = (page) => {
  router.replace(`/${page}`)
}
const changeQuestion = (content) =>{
  window.localStorage.setItem("tarot_question_content", content);
  navicatePage(`fortune`)
}
const newQuestionList= [];
newQuestionList.push(...questionList)
newQuestionList.push(...questionList)
newQuestionList.push(...questionList)

const numRows = 3
const rows = Array.from({ length: numRows }, (_, i) =>
    newQuestionList.filter((_, index) => index % numRows === i)
);


const getRowStyle = (index) => {
  const speeds = [30, 35, 42]; // 不同行的速度（秒）
  return {
    animationDuration: `${speeds[index % speeds.length]}s`
  };
}
window.scrollTo(0, 0);
</script>

<template>
  <div class="main-container" style="width: 100vw;height: 100vh">
    <div class="iphone-x-light-default"></div>
    <div class="nav" v-if="false">
      <div class="nav-2">
        <div class="internet">
          <div class="iconLeft">
            <img src="../assets/images/arrowLeft.svg" alt="" style="visibility: hidden;">
          </div>
          <div class="iconRight">
            <img src="../assets/images/lang.svg" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="title">Choose a question?</div>

<!--    <div class="randomQuestion">-->
<!--      <div v-for="(item, index) in questionList" :key="index" class="subQuestion" @click="changeQuestion(item.title)">{{ item.title }}</div>-->
<!--    </div>-->

    <div class="carousel-container" >
      <div class="carousel">
        <div class="carousel-row" v-for="(row, index2) in rows" :key="index2" :style="getRowStyle(index2)">
          <button v-for="(item, index) in row" :key="index"  @click="changeQuestion(item.title)"   class="subQuestion"  >{{ item.title }} </button>
        </div>
      </div>
    </div>
<!--    <div class="light-gradient"></div>-->
  </div>
</template>

<style scoped>
.background {
  position: fixed; /* 固定位置 */
  top: 0;
  left: 0;
  width: 100vw; /* 宽度设置为视口宽度 */
  height: 100vh; /* 高度设置为视口高度 */
  background-color: #f0f0f0; /* 例如，设置背景颜色 */
  //background-image: url('your-image.jpg'); /* 背景图片 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-position: center; /* 背景图片居中显示 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}


.carousel-container {
  overflow: hidden;
  width: 100vw;
  //height: 100%; /* 根据需要调整 */
  position: relative;
}

.carousel {
  display: flex;
  flex-direction: column;
}

.carousel-row {
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  gap: 10px;
  animation: scroll-horizontal linear infinite;
}

@keyframes scroll-horizontal {
  from {
    transform: translateX(-350%);
  }
  to {
    transform: translateX(30%);
  }
}





.main-container {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.randomQuestion {
  z-index: 1;
  font-size: calc(22 * var(--rpx));
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 calc(22 * var(--rpx)) calc(60 * var(--rpx)) calc(22 * var(--rpx));
  word-break: break-all;
}

.subQuestion {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: large;
  padding: calc(10 * var(--rpx)) calc(20 * var(--rpx));
  //gap: 10px;
  width: auto;
  //color: #010007;
  color: white;
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: calc(100 * var(--rpx));
  margin-top: calc(10 * var(--rpx));
  box-sizing: border-box;
}

.title {
  position: relative;
  z-index: 60;
  display: flex;
  font-size: calc(32 * var(--rpx));
  align-items: center;
  justify-content: center;
  margin: calc(60 * var(--rpx)) 0;
}

.internet {
  position: relative;
  box-sizing: border-box;
  padding: 0 calc(25 * var(--rpx));
  z-index: 13;
  display: flex;
  color: white;
  justify-content: space-between;
  width: 100%;
}

.iconLeft {
  display: flex;
  align-items: center;
}

.iconLeft img {
  margin-right: calc(5 * var(--rpx));
  width: calc(15 * var(--rpx));
}

.iconRight img {
  width: calc(30 * var(--rpx));
}

.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}


.level {
  flex-direction: column;
  margin-bottom: calc(60 * var(--rpx));
}

.main-container,
.main-container * {
  box-sizing: border-box;
}

input,
select,
textarea,
button {
  outline: 0;
}

.iphone-x-light-default {
  position: relative;
  width: calc(428 * var(--rpx));
  height: calc(10 * var(--rpx));
  margin: 0 0 0 0;
  z-index: 1;
  overflow: hidden;
}

/* .light-gradient {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: url(../assets/images/bg.svg) no-repeat center;
  background-size: cover;
  overflow: hidden;
} */
</style>
