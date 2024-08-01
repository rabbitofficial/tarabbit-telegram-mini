<script setup>
import { onMounted, ref, reactive } from "vue";
import Loading from "@/components/Loading.vue";
import helper from "@/utils/helper";
import axios from "axios";
const showLoading = ref(true);

const updateUserInfo = async (info) => {
  const result = await axios({
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
    method: "post",
    url: helper.baseUrl + "telegram/api/tg/login/update",
    data: JSON.stringify({
      ...info
    }),
  });
};

const getTgInfo = async (id) => {
  const result = await axios({
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
    method: "get",
    url: helper.baseUrl + "telegram/api/tg/login/fetch?tg_id=" + id,
  });
  return result.data;
};

const webAppLink = `${helper.inviteLink}?startapp=` + window.Telegram.WebApp.initDataUnsafe.user.id
const receivedContent = "Invite Friends to get more points"
const inviteFriend = () => {
  window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${webAppLink}&text=${receivedContent}`);
}

const userInfoVue = reactive({ data: {} });

const initData = async () => {
  showLoading.value = true;
  userInfoVue.data = await getTgInfo(
    window.Telegram.WebApp.initDataUnsafe.user.id
  );
  showLoading.value = false;
}
onMounted(async () => {
  initData()
});

const showPopup = (info) => {
  Telegram.WebApp.showPopup({
    title: info.title,
    message: info.message,
  });
};

const joinCommunity = async () => {
  if (!userInfoVue.data.joined_community) {
    window.Telegram.WebApp.openTelegramLink('https://t.me/tarabbit')
    await updateUserInfo({
      tg_id: window.Telegram.WebApp.initDataUnsafe.user.id,
      points: userInfoVue.data.points + 10000,
      joined_community: true
    });

    setTimeout(() => {
      initData()
    }, 2000)
  } else {
    showPopup({
      title: "Warning",
      message: "Already joined community",
    });
  }
}

const joinX = async () => {
  if (!userInfoVue.data.joined_X) {
    window.Telegram.WebApp.openLink('https://x.com/tarabbitluck')
    await updateUserInfo({
      tg_id: window.Telegram.WebApp.initDataUnsafe.user.id,
      points: userInfoVue.data.points + 500,
      joined_X: true
    });

    setTimeout(() => {
      initData()
    }, 2000)
  } else {
    showPopup({
      title: "Warning",
      message: "Already joined X",
    });
  }
}
</script>

<template>
  <Loading :display="showLoading"></Loading>
  <div class="main-container">
    <div class="iphone-x-light-default"></div>
    <div class="nav" v-if="false">
      <div class="nav-2">
        <div class="internet">
          <div class="iconLeft">
            <img src="../assets/images/arrowLeft.svg" alt="" style="visibility: hidden" />
          </div>
          <div class="iconRight">
            <img src="../assets/images/lang.svg" alt="" style="visibility: hidden" />
          </div>
        </div>
      </div>
    </div>
    <div class="level flexCenter" @click="test">
      <span class="zero">{{ userInfoVue.data.points ?? 0 }}</span><span class="level-0">Level {{ userInfoVue.data.level
        ?? 0
        }}</span>
    </div>

    <div class="boostContentWrap flexCenter">
      <div class="boostContent" @click="joinCommunity()">
        <div class="bundleLeft">
          <div class="boostLeft">
            <img src="../assets/images/avataaars.svg" alt="" />
          </div>
          <div class="boostMiddle">
            <div class="boostTitle">Join our community</div>
            <div class="boostNumber">+10000</div>
          </div>
        </div>

        <div class="boostRight">
          <img src="../assets/images/arrowRight.svg" alt="" />
        </div>
      </div>

      <div class="boostContent" @click="joinX()">
        <div class="bundleLeft">
          <div class="boostLeft">
            <img src="../assets/images/x.svg" alt="" />
          </div>
          <div class="boostMiddle">
            <div class="boostTitle">Join our X</div>
            <div class="boostNumber">+5000</div>
          </div>
        </div>

        <div class="boostRight">
          <img src="../assets/images/arrowRight.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="bottonText flexCenter" @click="inviteFriend()">
      <div class="bottomButton">
        <span class="content">Invite Friends</span>
      </div>
    </div>
    <div class="light-gradient"></div>
  </div>
</template>

<style scoped>
.boostLeft img {
  width: calc(61 * var(--rpx));
  border-radius: 50%;
  margin-right: calc(16 * var(--rpx));
}

.boostContentWrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.boostContent {
  display: flex;
  position: relative;
  z-index: 56;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 calc(30 * var(--rpx));
  width: 90%;
  height: calc(120 * var(--rpx));
  top: 0;
  background: rgba(255, 255, 255, 0.2);
  border: calc(1 * var(--rpx)) solid #ffffff;
  box-shadow: 0 calc(6 * var(--rpx)) calc(10 * var(--rpx)) rgba(120, 120, 120, 0.1);
  border-radius: calc(16 * var(--rpx));
  margin-top: calc(16 * var(--rpx));
  font-size: calc(24 * var(--rpx));
}

.boostMiddle {
  justify-self: flex-end;
}

.bundleLeft {
  display: flex;
  align-items: center;
}

.boostTitle {
  font-size: calc(20 * var(--rpx));
}

.plusPoint {
  position: absolute;
  z-index: 65;
  top: calc(224 * var(--rpx));
  opacity: 0;
  right: calc(75 * var(--rpx));
  font-size: calc(22 * var(--rpx));
}

.combine {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  align-items: center;
  z-index: 55;
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
  background: linear-gradient(90deg,
      rgba(220, 130, 151, 0.8) 0%,
      rgba(98, 27, 170, 0.8) 100%);
  border: calc(1 * var(--rpx)) solid #ffffff;
  border-radius: calc(100 * var(--rpx));
  font-size: calc(24 * var(--rpx));
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

.zero {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: calc(59 * var(--rpx));
  margin: calc(15 * var(--rpx)) 0 0 0;
  color: #ffffff;
  font-family: Lato, var(--default-font-family);
  font-size: calc(64 * var(--rpx));
  font-weight: 700;
  line-height: calc(59 * var(--rpx));
  text-align: center;
  white-space: nowrap;
  z-index: 27;
}

.level-0 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: calc(87 * var(--rpx));
  height: calc(26 * var(--rpx));
  margin: calc(15 * var(--rpx)) 0 0 0;
  color: #ffffff;
  font-family: Lato, var(--default-font-family);
  font-size: calc(22 * var(--rpx));
  font-weight: 700;
  line-height: calc(26 * var(--rpx));
  text-align: center;
  white-space: nowrap;
  z-index: 26;
  text-shadow: 0 calc(4 * var(--rpx)) calc(4 * var(--rpx)) rgba(0, 0, 0, 0.25);
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
