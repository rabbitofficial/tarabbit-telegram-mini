<script setup>
import { reactive } from 'vue';

const questionList = reactive([
  {
    title: 'Did I meet the one?'
  },
  {
    title: 'How’s my luck today?'
  },
  {
    title: 'Will i P Pass my exam? '
  },
  {
    title: 'Will I get the job? '
  },
  {
    title: 'Will I? '
  },
  {
    title: 'What’s My Fortune Today?'
  },
  {
    title: 'What’s My Fortay334 34234 ?'
  },
  {
    title: 'What’s My Fortay334 34234 ?'
  },
  {
    title: 'What’s My Fortay334 34234 ?'
  },
  {
    title: 'What’s My Fortay334 34234 ?'
  },
  {
    title: 'What’s My Fortay334 34234 ?'
  },
  {
    title: 'What’s My Fortay334 34234 ?'
  },
  {
    title: 'What’s?'
  }
])
</script>

<template>
  <div class="main-container">
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

    <div class="randomQuestion">
      <div v-for="(item, index) in questionList" :key="index" class="subQuestion">{{ item.title }}</div>
    </div>
    <div class="light-gradient"></div>
  </div>
</template>

<style scoped>
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
  padding: calc(10 * var(--rpx)) calc(20 * var(--rpx));
  gap: 10px;
  width: auto;
  color: #010007;
  background: #FFFFFF;
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
