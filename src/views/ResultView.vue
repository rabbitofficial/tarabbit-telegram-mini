<script setup>
import emptyCard from '../assets/images/emptyCard.svg';
import tarotData from '../assets/json/tarot.json';
import { reactive, ref, toRaw, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import helper from '@/utils/helper';
import Loading from '@/components/Loading.vue';
import axios from 'axios';
import _ from 'underscore';
const router = useRouter()
const route = useRoute()
const navicatePage = (page) => {
  router.push(`/${page}`)
}
const resultListRender = reactive({ data: [] })
/* poker logic */
/* const allCards = import.meta.glob("@/assets/cards/*.svg", { eager: true }); 
const cardList = reactive({ list: [] })
const cardRandomList = helper.getRamdomCard(3)
let cardResultList = []
_.each(allCards, (v, k) => {
  cardResultList.push({
    [k.replace(/(.*\/)*([^.]+)/i, "$2").replace('.svg', '')]: v.default
  })
})
cardResultList = _.filter(cardResultList, item => {
  return cardRandomList.includes(_.keys(item)[0])
})
cardResultList = _.map(cardResultList, (obj) => _.values(obj)[0]);
cardList.list = cardResultList */
const showLoading = ref(false)
/* const resetDefault = (dom) => {
  dom.style['transition-timing-function'] = ''
  dom.style['transform'] = ''
}
const flip2 = ref(null)
const flip2back = ref(null)

const queryContent = reactive({
  "userId": "123456",
  "tarotCards": ["The Fool upright", "The Magician reserved", "The High Priestess"],
  "query": "Can you please share some guidance to me in 6 months?"
}) */
const resultTime = ref(new Date().toTimeString())
const tarotResult = ref(`Certainly! In the next 6 months, it looks like you may encounter some delays or setbacks with the Page of Wands and Seven of Pentacles both being reserved. This could indicate a period of feeling stuck or lacking motivation in pursuing your goals. However, with the World card upright, there is a sense of completion and fulfillment on the horizon. This may suggest that despite the challenges you face in the coming months, you will eventually reach a point of success and achievement. Keep pushing forward and stay focused on your long-term goals. Trust that you have the skills and capabilities to overcome any obstacles that come your way. Remember to stay patient and consistent in your efforts, as your hard work will pay off in the end. Trust in the process and believe in yourself.`)

const loadTarotData = async () => {
  showLoading.value = true
  const result = await axios({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: helper.baseUrl + 'fortune/check-my-fortune',
    data: JSON.stringify({
      "userId": "123456",
      "tarotCards": _.pluck(resultListRender.data, 'query'),
      "query": "Can you please share some guidance to me in 6 months?"
    })
  })
  showLoading.value = false
  tarotResult.value = result.data.fortune
  resultTime.value = new Date().toTimeString()
}

const randomTarot = () => {
  //const resultList = []
  const cardNumberList = []
  let count = 0

  while (count < 3) {
    const randomNumber = helper.getRandomNumber(0, 77)
    if (!cardNumberList.includes(randomNumber)) {
      count++
      cardNumberList.push([randomNumber, helper.getRandomNumber(0, 1)])
    }
  }

  cardNumberList.forEach(item => {
    resultListRender.data.push({
      query: tarotData.tarot[item[0]].name + (item[1] == 0 ? ' upright' : ' reserved'),
      display: tarotData.tarot[item[0]].name,
      isReversed: item[1] == 1
    })
  })

  loadTarotData()
}

onMounted(() => {
  randomTarot()
})
/* const flipCard = () => {
  move(flip2.value).rotateY(180).then(() => {

  }).end(() => {
    //resetDefault(flip2.value)
  })

  move(flip2back.value).rotateY(0).end(() => {
    //resetDefault(flip2.value)
  })
} */
</script>

<template>
  <Loading :display="showLoading"></Loading>
  <div class="main-container light-gradient">
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
        <!-- <span class="whats-my-fortune-today">What’s My Fortune Today?</span> -->
        <span class="whats-my-fortune-today">What’s My Fortune Today?</span>
      </button>
      <!-- <input type="text" placeholder="input content" v-model="resultListRender?.data[index].query"
        v-for="(item, index) in resultListRender.data" :key="index" /> -->
      <!-- <span class="otherTopics">Other topics</span> -->
    </div>

    <div class="shuffleCard flexCenter">
      <div class="cardWrap" v-for="(item, index) in 3" :key="index">
        <img :src="emptyCard" alt="">
      </div>
      <div class="cardContent1" :style="{ transform: `rotate(${resultListRender.data[0]?.isReversed ? 180 : 0}deg)` }">
        {{
          resultListRender.data[0]?.display }}</div>
      <div class="cardContent2" :style="{ transform: `rotate(${resultListRender.data[1]?.isReversed ? 180 : 0}deg)` }">
        {{ resultListRender.data[1]?.display }}</div>
      <div class="cardContent3" :style="{ transform: `rotate(${resultListRender.data[2]?.isReversed ? 180 : 0}deg)` }">
        {{ resultListRender.data[2]?.display }}</div>
      <!-- <div class="cardWrap">
        <img :src="heartFill" alt="" ref="flip1">
        <div class="flexCenter backCard1" ref="flip1back"></div>
      </div>
      <div class="cardWrap">
        <img :src="hatFill" alt="" ref="flip2">
        <div class="flexCenter backCard2" ref="flip2back">123</div>
      </div>

      <div class="cardWrap">
        <img :src="moneyFill" alt="" ref="flip3">
        <div class="flexCenter backCard3" ref="flip3back"></div>
      </div> -->
    </div>

    <div class="textContent">
      <div class="time">{{ resultTime }}</div>
      <div class="middleTextContent">
        {{ tarotResult }}
      </div>
    </div>
    <div class="otherTopic flexCenter" @click="navicatePage('questionList')">
      <div class="otherButton">
        <span class="content">Other Topics</span>
      </div>
    </div>

    <div class="atBottom">
      <div class="rectangle">
        <router-link to="/">
          <div class="frame-1">
            <div class="suit-club-fill">
              <div class="people-fill">
                <div class="vector-1"></div>
              </div>
            </div>
            <span class="label-7">Earn <br />Token</span>
          </div>
        </router-link>

        <router-link to="/boost">
          <div class="frame-3">
            <div class="cards-4"></div>
            <span class="label">Boosts <br />Fortunes</span>
          </div>
        </router-link>

        <router-link to="/inviteFriend">
          <div class="frame-5">
            <div class="suit-club-fill">
              <div class="people-fill">
                <div class="vector-6"></div>
              </div>
            </div>
            <span class="label-7">Invite <br />Friends</span>
          </div>
        </router-link>

      </div>
    </div>
    <!-- <div class="light-gradient"></div> -->
  </div>
</template>

<style scoped>
.cardContent1 {
  position: absolute;
  top: calc(51* var(--rpx));
  left: calc(64* var(--rpx));
  z-index: 100;
  font-size: calc(13* var(--rpx));
  width: calc(65* var(--rpx));
  height: calc(50* var(--rpx));
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  /* transform: rotate(180deg); */
}

.cardContent2 {
  position: absolute;
  top: calc(51* var(--rpx));
  left: calc(185* var(--rpx));
  z-index: 100;
  font-size: calc(13* var(--rpx));
  width: calc(65* var(--rpx));
  height: calc(50* var(--rpx));
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.cardContent3 {
  position: absolute;
  top: calc(51* var(--rpx));
  right: calc(59* var(--rpx));
  z-index: 100;
  font-size: calc(13* var(--rpx));
  width: calc(65* var(--rpx));
  height: calc(50* var(--rpx));
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.middleText input {
  margin-top: 10px;
}

.main-container {
  padding-bottom: calc(70* var(--rpx));
}

.middleTextContent {
  line-height: 130%;
  text-align: justify;
}

.textContent {
  position: relative;
  flex-direction: column;
  display: flex;
  z-index: 55;
  box-sizing: border-box;
  width: 100%;
  padding: 0 5%;
  align-items: center;
  justify-content: center;
  font-size: calc(22* var(--rpx));
}

.textContent .time {
  font-size: calc(16* var(--rpx));
  margin: calc(30* var(--rpx)) 0;
}

.atBottom {
  display: flex;
  width: 100%;
  height: calc(200* var(--rpx));
  position: relative;
  top: calc(8* var(--rpx));
  align-items: center;
  justify-content: center;
}

.rectangle {
  position: absolute;
  width: 90%;
  height: calc(134 * var(--rpx));
  top: calc(23 * var(--rpx));
  background: rgba(255, 255, 255, 0.2);
  border: calc(1 * var(--rpx)) solid #ffffff;
  z-index: 16;
  border-radius: calc(16 * var(--rpx));
  box-shadow: 0 calc(6 * var(--rpx)) calc(10 * var(--rpx)) 0 rgba(120, 120, 120, 0.1);
}

/* bootst */

.frame-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: calc(8 * var(--rpx));
  position: absolute;
  /*  width: calc(79 * var(--rpx));
  height: calc(106 * var(--rpx)); */
  top: calc(16 * var(--rpx));
  left: calc(29 * var(--rpx));
  padding: calc(10 * var(--rpx)) 0 calc(10 * var(--rpx)) 0;
  z-index: 17;
}

.vector-1 {
  position: relative;
  width: calc(32.000001907348633 * var(--rpx));
  height: calc(32.000001907348633 * var(--rpx));
  margin: calc(0.662109375 * var(--rpx)) 0 0 calc(2.4986572265625 * var(--rpx));
  background: url(../assets/images/DollarCoin.png) no-repeat center;
  background-size: 100% 100%;
  z-index: 23;
}

.frame-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: calc(8 * var(--rpx));
  position: absolute;
  /*  width: calc(79 * var(--rpx));
  height: calc(106 * var(--rpx)); */
  top: calc(16 * var(--rpx));
  left: calc(153 * var(--rpx));
  padding: calc(10 * var(--rpx)) 0 calc(10 * var(--rpx)) 0;
  z-index: 17;
}

.cards-4 {
  flex-shrink: 0;
  position: relative;
  width: calc(30 * var(--rpx));
  height: calc(30 * var(--rpx));
  background: url(../assets/images/poker.svg) no-repeat center;
  background-size: contain;
  z-index: 18;
}

.label {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  /* width: calc(79 * var(--rpx));
  height: calc(48 * var(--rpx)); */
  color: #ffffff;
  font-family: Lato, var(--default-font-family);
  font-size: calc(20 * var(--rpx));
  font-weight: 500;
  line-height: calc(24 * var(--rpx));
  text-align: center;
  text-overflow: initial;
  z-index: 19;
  overflow: hidden;
}

/* invite friends */

.frame-5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: calc(8 * var(--rpx));
  position: absolute;
  width: calc(65 * var(--rpx));
  height: calc(106 * var(--rpx));
  top: calc(16 * var(--rpx));
  right: calc(26 * var(--rpx));
  padding: calc(10 * var(--rpx)) 0 calc(10 * var(--rpx)) 0;
  z-index: 20;
}

.suit-club-fill {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: calc(10 * var(--rpx));
  position: relative;
  width: calc(30.000001907348633 * var(--rpx));
  background: rgba(255, 255, 255, 0);
  z-index: 21;
  border-radius: calc(4 * var(--rpx));
}

.people-fill {
  flex-shrink: 0;
  position: relative;
  width: calc(30.000001907348633 * var(--rpx));
  height: calc(30 * var(--rpx));
  z-index: 22;
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

.label-7 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  /* width: calc(65 * var(--rpx));
  height: calc(48 * var(--rpx)); */
  color: #ffffff;
  font-family: Lato, var(--default-font-family);
  font-size: calc(20 * var(--rpx));
  font-weight: 500;
  line-height: calc(24 * var(--rpx));
  text-align: center;
  text-overflow: initial;
  z-index: 24;
  overflow: hidden;
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
  margin-top: calc(40 * var(--rpx));
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
  bottom: calc(100 * var(--rpx));
  width: 100%;
}

.otherButton {
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
  font-size: calc(24 * var(--rpx));
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



input,
select,
textarea,
button {
  outline: 0;
}

.main-container {
  width: 100vw;
  /* background: #010007; */
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
  top: 0;
  background: linear-gradient(168.43deg, #031728 -10.68%, #3C113F 25.6%, #484A64 62.5%, #52757F 82.66%, #5A9C98 100.61%, #701856 112.31%);
  background: url(../assets/images/bg.svg) no-repeat center;
  background-size: cover;
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
