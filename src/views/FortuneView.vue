<script setup>
import GenFill from '../assets/images/genFill.svg';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import _ from 'underscore'
import helper from '@/utils/helper';

const router = useRouter()
const route = useRoute()
const cardDoms = []
const canClick = ref(true)
helper.test()
const setItemRefs = (el, item) => {
  cardDoms.push({
    id: item,
    el,
  })
}

const navicatePage = (page) => {
  router.push(`/${page}`)
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const ramdomNa = (Math.random() - 0.5) * 2 * 50
const resetDefault = (dom) => {
  dom.style['transition-timing-function'] = ''
  dom.style['transform'] = ''
  //dom.style['transition-duration'] = ''
}

const shuffle = () => {
  canClick.value = false
  cardDoms.forEach((item, index) => {
    const myMoveObj = move(item.el);
    //myMoveObj.duration(300).translate(getRandomInRange(-200, 200, 2), getRandomInRange(-200, 200, 2)).skew(getRandomInRange(-100, 100, 2)).rotate(getRandomInRange(-1100, 1100, 2)).ease('snap').end(() => {
    //myMoveObj.duration(200).translate(getRandomInRange(-300, 300, 2), getRandomInRange(-300, 300, 2)).ease('snap').end(() => {
    myMoveObj.duration(800).scale(0).rotate(getRandomInRange(-1100, 1100, 2)).translate(getRandomInRange(-600, 600, 2), getRandomInRange(-600, 600, 2)).ease('linear').end(() => {
      //item.el.removeAttribute('style')
      resetDefault(item.el)
      myMoveObj.duration(500).translate(0, 0).scale(1).ease('linear').end(() => {
        resetDefault(item.el)
      })
    })
  })

  setTimeout(() => {
    navicatePage('fortuneFlip')
  }, 2000)
}

</script>

<template>
  <div class="main-container">
    <div class="iphone-x-light-default"></div>

    <div class="nav">
      <div class="nav-2">
        <div class="internet">
          <div class="iconLeft globalHide">
            <img src="../assets/images/wallet.svg" alt="">
            <span>100</span>
          </div>
          <div class="iconRight">
            <img src="../assets/images/lang.svg" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="middleText">
      <button class="cta-with-icon">
        <div class="cards"></div>
        <span class="whats-my-fortune-today">What’s My Fortune Today?</span>
      </button>
      <span class="otherTopics" @click="navicatePage('questionList')">Other topics</span>
    </div>

    <div class="shuffleCard flexCenter">

      <!-- <img src="../assets/images/cards.svg" alt=""> -->
      <img :src="GenFill" alt="" v-for="(item, index) in 12" :key="index" :ref="(el) => setItemRefs(el, item)"
        :style="{ left: 'calc(' + (index + 1) * 6 + ' * var(--rpx))' }">
    </div>
    <div class="bottonText flexCenter" @click="canClick && shuffle()">
      <div class="bottomButton">
        <span class="content">Shuffle Cards</span>
      </div>
    </div>

    <div class="light-gradient"></div>
  </div>
</template>

<style scoped>
.internet {
  position: relative;
  box-sizing: border-box;
  padding: 0 calc(25 * var(--rpx));
  z-index: 13;
  display: flex;
  color: white;
  justify-content: space-between;
  width: 100%;
  font-size: calc(18 * var(--rpx));
}


.shuffleCard {
  width: 100%;
  position: relative;
  margin-top: calc(60 * var(--rpx));
  left: calc(100 * var(--rpx));
}

.shuffleCard img {
  z-index: 52;
  width: calc(130 * var(--rpx));
  object-fit: contain;
  box-sizing: border-box;
  border: calc(1 * var(--rpx)) solid #141414;
  top: 0;
  border-radius: calc(24 * var(--rpx));
  position: absolute;
}

.bottonText {
  position: absolute;
  bottom: calc(50 * var(--rpx));
  width: 100%;
}

.bottomButton {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: calc(12 * var(--rpx));
  box-sizing: border-box;
  position: relative;
  width: 90%;
  margin: calc(58 * var(--rpx)) 0 0 0;
  padding: calc(15 * var(--rpx)) calc(10 * var(--rpx)) calc(15 * var(--rpx)) calc(10 * var(--rpx));
  cursor: pointer;
  z-index: 31;
  box-shadow: calc(-8 * var(--rpx)) calc(6 * var(--rpx)) calc(5.800000190734863 * var(--rpx)) 0 rgba(119, 119, 119, 0.1);
  color: white;
  background: rgba(255, 255, 255, 0.3);
  border: calc(1 * var(--rpx)) solid #FFFFFF;
  border-radius: calc(100 * var(--rpx));

}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  width: calc(282 * var(--rpx));
  height: calc(29 * var(--rpx));
  font-family: Lato, var(--default-font-family);
  font-size: calc(24 * var(--rpx));
  font-weight: 500;
  line-height: calc(29 * var(--rpx));
  text-align: center;
  white-space: nowrap;
  z-index: 33;
}

.iconLeft {
  display: flex;
  align-items: center;

}

.iconLeft img {
  margin-right: calc(10 * var(--rpx));
  width: calc(25 * var(--rpx));
}

.iconRight img {
  width: calc(30 * var(--rpx));
}

.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.middleText {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.middleText .otherTopics {
  z-index: 51;
  color: white;
  margin-top: calc(18 * var(--rpx));
  margin-right: calc(30 * var(--rpx));
  align-self: flex-end;
  cursor: pointer;
}

.level {
  flex-direction: column;
}

.circleEye {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.main-container {
  overflow: hidden;
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

.main-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background: #010007;
  overflow: hidden;
}

.iphone-x-light-default {
  position: relative;
  width: calc(428 * var(--rpx));
  height: calc(10 * var(--rpx));
  margin: 0 0 0 0;
  z-index: 1;
  overflow: hidden;
}

.cta-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: calc(12 * var(--rpx));
  box-sizing: border-box;
  position: relative;
  width: 90%;
  margin: calc(58 * var(--rpx)) 0 0 0;
  padding: calc(15 * var(--rpx)) calc(10 * var(--rpx)) calc(15 * var(--rpx)) calc(10 * var(--rpx));
  cursor: pointer;
  background: #ffffff;
  border: calc(1 * var(--rpx)) solid #ffffff;
  z-index: 31;
  overflow: hidden;
  border-radius: calc(100 * var(--rpx));
  box-shadow: calc(-8 * var(--rpx)) calc(6 * var(--rpx)) calc(5.800000190734863 * var(--rpx)) 0 rgba(119, 119, 119, 0.1);
}

.cards {
  flex-shrink: 0;
  position: relative;
  width: calc(30 * var(--rpx));
  height: calc(30 * var(--rpx));
  background: url(../assets/images/poker_blue.svg) no-repeat center;
  background-size: contain;
  z-index: 32;
}

.whats-my-fortune-today {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  width: calc(282 * var(--rpx));
  height: calc(29 * var(--rpx));
  color: #2a272b;
  font-family: Lato, var(--default-font-family);
  font-size: calc(24 * var(--rpx));
  font-weight: 500;
  line-height: calc(29 * var(--rpx));
  text-align: center;
  white-space: nowrap;
  z-index: 33;
}

.light-gradient {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: url(../assets/images/bg.svg) no-repeat center;
  background-size: cover;
  overflow: hidden;
}

.vector-6 {
  position: relative;
  width: calc(25.000001907348633 * var(--rpx));
  height: calc(22.502517700195312 * var(--rpx));
  margin: calc(3.662109375 * var(--rpx)) 0 0 calc(2.4986572265625 * var(--rpx));
  background: url(../assets/images/people.svg) no-repeat center;
  background-size: 100% 100%;
  z-index: 23;
}
</style>
