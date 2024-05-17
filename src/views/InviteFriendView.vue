<script setup>
import doubleHandFriend from '../assets/images/doubleHandFriend.svg';
import hatFill from '../assets/images/hatFill.svg';
import moneyFill from '../assets/images/moneyFill.svg';
import { ref } from 'vue';

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
    <div class="middleContent flexCenter">
      <div class="friendNum">1 Friend</div>
      <div class="friendImg">
        <img :src="doubleHandFriend" alt="">
      </div>
      <div class="friendControl">
        <div class="friendLeft">
          <div>Normal Users</div>
          <div>150</div>
        </div>
        <div class="friendRight">
          <div>Premium Users</div>
          <div>300</div>
        </div>
      </div>
    </div>
    <div class="bottonText flexCenter">
      <div class="bottomButton">
        <span class="content">Invite Friends</span>
      </div>
    </div>

    <div class="light-gradient"></div>
  </div>
</template>

<style scoped>
.middleContent {
  position: relative;
  z-index: 60;
  flex-direction: column;
}

.friendNum {
  margin-top: calc(30 * var(--rpx));
  font-size: calc(40 * var(--rpx));
  font-weight: bold;
}

.friendImg {
  margin-top: calc(40 * var(--rpx));
}

.friendImg img {
  width: calc(205 * var(--rpx));
}

.friendControl {
  width: 90%;
  box-sizing: border-box;
  margin-top: calc(50 * var(--rpx));
  background: rgba(255, 255, 255, 0.2);
  border: calc(1 * var(--rpx)) solid #FFFFFF;
  box-shadow: 0 calc(6 * var(--rpx)) calc(10 * var(--rpx)) rgba(120, 120, 120, 0.1);
  border-radius: calc(16 * var(--rpx));
  height: calc(120 * var(--rpx))
}

.friendControl {
  display: flex;
  font-size: calc(20 * var(--rpx));
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(30 * var(--rpx));
  box-sizing: border-box;
}

.friendControl .friendLeft {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: calc(10 * var(--rpx));
}

.friendControl .friendRight {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: calc(10 * var(--rpx));
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
  font-size: calc(24 * var(--rpx));
}

.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
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


.light-gradient {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: url(../assets/images/bg.svg) no-repeat center;
  background-size: cover;
  overflow: hidden;
}
</style>
