<script setup>
import heartFill from '../assets/images/heartFill.svg';
import hatFill from '../assets/images/hatFill.svg';
import moneyFill from '../assets/images/moneyFill.svg';
import doubleHands from '../assets/images/doubleHands.svg';
import cross from '../assets/images/cross.svg';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const navicatePage = (page) => {
  router.push(`/${page}`)
}

const showPopup = ref(false)
const resetDefault = (dom) => {
  dom.style['transition-timing-function'] = ''
  dom.style['transform'] = ''
}
const flip2 = ref(null)
const flip2back = ref(null)

const flipCard = () => {
  move(flip2.value).rotateY(180).then(() => {

  }).end(() => {
    //resetDefault(flip2.value)
  })

  move(flip2back.value).rotateY(0).end(() => {
    //resetDefault(flip2.value)
  })
}

const checkBalance = () => {
  showPopup.value = true
  //navicatePage('result')
}
const checkResult = () => {

}
</script>

<template>
  <div class="main-container">
    <div class="iphone-x-light-default"></div>

    <div class="nav" v-if="false">
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
      <!-- <span class="otherTopics">Other topics</span> -->
    </div>

    <div class="shuffleCard flexCenter">
      <div class="cardWrap">
        <img :src="heartFill" alt="" ref="flip1">
        <!-- <div class="flexCenter backCard1" ref="flip1back"></div> -->
      </div>
      <div class="cardWrap">
        <img :src="hatFill" alt="" ref="flip2">
        <!-- <div class="flexCenter backCard2" ref="flip2back">123</div> -->
      </div>

      <div class="cardWrap">
        <img :src="moneyFill" alt="" ref="flip3">
        <!-- <div class="flexCenter backCard3" ref="flip3back"></div> -->
      </div>

    </div>
    <div class="bottonText flexCenter" @click="checkBalance()">
      <div class="bottomButton">
        <span class="content">Flip Cards -50</span>
      </div>
    </div>

    <div class="light-gradient"></div>
    <div class="popupBalance" v-if="showPopup">
      <div class="popupContent">
        <div>Oops !</div>
        <div><img :src="doubleHands" alt=""></div>
        <div>You don’t have enough points</div>
        <div @click="navicatePage('inviteFriend')"><button>Invite Friends to Earn!</button></div>
        <div class="cross" @click="showPopup = !showPopup"><img :src="cross" alt="" class="rightCross">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popupBalance .cross {
  position: absolute;
  top: 0;
  right: calc(20 * var(--rpx));
  width: calc(20 * var(--rpx));
  height: calc(20 * var(--rpx));
}

.popupBalance .cross .rightCross {
  width: calc(22 * var(--rpx));
}

.popupBalance {
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(20 * var(--rpx));
}

.popupBalance .popupContent img {
  width: calc(200 * var(--rpx));
  margin: calc(18 * var(--rpx)) 0;
}

.popupBalance .popupContent button {
  height: calc(50 * var(--rpx));
  background-color: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  width: 70vw;
  border-radius: calc(100 * var(--rpx));
  color: white;
  font-size: calc(22 * var(--rpx));
  margin-top: calc(22 * var(--rpx));
  border: calc(1 * var(--rpx)) solid white;
}

.popupBalance .popupContent {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75vw;
  height: 60vh;
  border-radius: calc(20 * var(--rpx));
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), radial-gradient(84.77% 84.72% at 50% 50%, #E5A59A 0%, #6521AC 100%);
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
  font-size: calc(18 * var(--rpx));
}

.cardWrap {
  z-index: 61;
  position: relative;

}

.backCard2 {
  position: absolute;
  top: 0;
  background-color: white;
  width: calc(100* var(--rpx));
  height: calc(167* var(--rpx));
  transform: rotateY(180deg);
  z-index: 100;
  color: #010007;
  border-radius: calc(10 * var(--rpx));
}

.shuffleCard {
  width: 100%;
  position: relative;
  margin-top: calc(100 * var(--rpx));
  display: flex;
  align-items: center;
  gap: calc(20 * var(--rpx));
  justify-content: center;
}

.shuffleCard img {
  z-index: 101;
  width: calc(100 * var(--rpx));
  object-fit: contain;
  box-sizing: border-box;
  /* border: calc(1 * var(--rpx)) solid #141414; */
  top: 0;
  position: relative;
  backface-visibility: hidden;
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
  background: linear-gradient(90deg, rgba(220, 130, 151, 0.8) 0%, rgba(98, 27, 170, 0.8) 100%);
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
  /* background: #010007; */
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

/* .light-gradient {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: url(../assets/images/bg.svg) no-repeat center;
  background-size: cover;
  overflow: hidden;
} */

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
