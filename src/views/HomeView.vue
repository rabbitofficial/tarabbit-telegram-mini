<script setup>
import { TonConnectUI } from '@tonconnect/ui';
import { THEME } from '@tonconnect/ui';
import { onMounted, ref, reactive, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import Loading from '@/components/Loading.vue';
import questionList from '@/utils/tgGlobalSetting';

const { t, locale } = useI18n({ useScope: 'global' });
import helper from '@/utils/helper';
import axios from 'axios';
//https://vue-i18n.intlify.dev/guide/advanced/composition.html
const circleEle = ref(null);
const plusPoint = ref(null);
// const homeLeft = ref(null);
const ctaBtn = ref(null);
const eyeOn = ref(false);
const canRoll = ref(true);
const showLoading = ref(true);
const rotateing = ref(false);

const { appContext } = getCurrentInstance();
const tonConnectUI = appContext.config.globalProperties.$tonConnect;
const userInfoVue = reactive({ data: {} });

const showPopup = (info) => {
	Telegram.WebApp.showPopup({
		title: info.title,
		message: info.message,
	});
};
//locale.value = 'en'
const changeLang = () => {
	locale.value = 'ja1';
};
const index = Math.floor(Math.random() * questionList.length);
const randomQuestion = ref(questionList[index].title);
window.localStorage.setItem('tarot_question_content', randomQuestion.value);
const sendTgInfo = async (user) => {
	const result = await axios({
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		url: helper.baseUrl + 'telegram/api/tg/login',
		data: JSON.stringify({
			tg_id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			language_code: user.language_code,
		}),
	});
};

const updateUserInfo = async (info) => {
	const result = await axios({
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		url: helper.baseUrl + 'telegram/api/tg/login/update',
		data: JSON.stringify({
			...info,
		}),
	});
	userInfoVue.data = await getTgInfo(window.Telegram.WebApp.initDataUnsafe.user.id);
};

const addReferalInfo = async (addInfo) => {
	const result = await axios({
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		url: helper.baseUrl + 'referral/api/referral',
		data: JSON.stringify({
			...addInfo,
		}),
	});
};

const getTgInfo = async (id) => {
	const result = await axios({
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'get',
		url: helper.baseUrl + 'telegram/api/tg/login/fetch?tg_id=' + id,
	});

	return result.data;
};

const getReferInfo = async (id) => {
	const result = await axios({
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'get',
		url: helper.baseUrl + 'referral/api/referral/getInviteInfo?referrer_id=' + id,
	});

	return result.data;
};

onMounted(async () => {
	let startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
	//register user first
	await sendTgInfo(window.Telegram.WebApp.initDataUnsafe.user);

	//get user info
	userInfoVue.data = await getTgInfo(window.Telegram.WebApp.initDataUnsafe.user.id);
	if (startParam && window.Telegram.WebApp.initDataUnsafe.user.id != startParam) {
		const referInfo = await getReferInfo(startParam);
		const already_invited = referInfo.some((item) => item.referred_id == Telegram.WebApp.initDataUnsafe.user.id);
		if (!already_invited) {
			// const referrerInfo = await getTgInfo(startParam)
			// await updateUserInfo({
			//   tg_id: startParam,
			//   points: referrerInfo.points + 2000
			// });
			await addReferalInfo({
				referrer_id: startParam.toString(),
				referred_id: window.Telegram.WebApp.initDataUnsafe.user.id.toString(),
			});
		}
	}

	showLoading.value = false;
});

const connectedWallet = async () => {
	const connectedWallet = await tonConnectUI.connectWallet();
	console.log(connectedWallet);
};
const testNetwork = async () => {
	console.log(123123);
	//const result = await axios.post(helper.baseUrl + 'fortune/check-my-fortune',
	const result = await axios({
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		url: helper.baseUrl + 'fortune/check-my-fortune',
		data: JSON.stringify({
			userId: '123456',
			tarotCards: ['The Fool', 'The Magician', 'The High Priestess'],
			query: 'Can you please share some guidance to me in 6 months?',
		}),
	});

	console.log('result', result);
};
// plus 100 test
const test = () => {
	move(plusPoint.value)
		.duration(800)
		.y(-100)
		.set('opacity', '1')
		.ease('in')
		.end(() => {
			move(plusPoint.value)
				.duration(400)
				.y(-150)
				.set('opacity', '0')
				.ease('out')
				.end(() => {
					setTimeout(() => {
						plusPoint.value.removeAttribute('style');
					}, 300);
				});
		});
};

const roll = async () => {
	if (userInfoVue.data.left_roll_times <= 0) {
		showPopup({
			title: 'Warning',
			message: 'Insufficient rolls, please invite friends to get more',
		});

		return;
	}

	userInfoVue.data.left_roll_times -= 1;
	canRoll.value = false;
	eyeOn.value = false;
	// move(homeLeft.value).duration(800).set('opacity', '0').end();
	move(circleEle.value)
		.duration(2000)
		.rotate(360 * 10)
		.ease('in')
		.end(() => {
			// plus 100
			move(plusPoint.value)
				.duration(800)
				.y(-100)
				.set('opacity', '1')
				.ease('in')
				.end(() => {
					eyeOn.value = true;
					move(plusPoint.value)
						.duration(400)
						.y(-150)
						.set('opacity', '0')
						.ease('out')
						.end(() => {
							setTimeout(() => {
								plusPoint.value.removeAttribute('style');
							}, 300);
						});
				});

			move(circleEle.value)
				.duration(1000)
				.rotate(360 * 20)
				.ease('out')
				.end(async () => {
					userInfoVue.data.points += 1000;
					canRoll.value = true;
					rotateing.value = false;
					await updateUserInfo({
						tg_id: window.Telegram.WebApp.initDataUnsafe.user.id,
						points: userInfoVue.data.points,
						left_roll_times: userInfoVue.data.left_roll_times,
					});
					setTimeout(() => {
						eyeOn.value = false;
					}, 2000);
				});
		});
};
</script>

<template>
	<Loading :display="showLoading"></Loading>
	<div class="main-container light-gradient" style="height: 90%">
		<div class="iphone-x-light-default"></div>
		<img src="../assets/images/wallet.svg" @click="connectedWallet" style="margin-left: 15px" />
		<div class="nav" v-if="false">
			<div class="nav-2">
				<div class="internet">
					<div class="iconLeft">
						<img src="../assets/images/lang.svg" alt="" style="visibility: hidden" />
					</div>
					<div class="iconRight" @click="changeLang()">
						<img src="../assets/images/lang.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="level flexCenter" @click="test">
			<!-- <span class="zero">101</span><span class="level-0">Level 0 {{ t("message.hello") }}</span> -->
			<span class="zero">{{ userInfoVue.data.points ?? 0 }}</span
			><span class="level-0">Level {{ userInfoVue.data.level ?? 0 }}</span>
		</div>

		<div class="circleEye">
			<img v-if="false" ref="homeLeft" class="home-left" src="../assets/images/homeLeft.png" alt="" srcset="" />
			<div class="plusPoint" ref="plusPoint">+1000</div>
			<div class="combine" ref="circleEle">
				<div class="openEye">
					<img class="open" src="../assets/images/eyeOpen.png" alt="" v-if="eyeOn" />
					<img class="close" src="../assets/images/eyeClose.png" alt="" v-if="!eyeOn" />
				</div>
				<div class="frame"></div>
			</div>

			<div class="hand" @click="canRoll && roll()">
				<img src="../assets/images/hand.png" alt="" />
			</div>
		</div>
		<router-link to="/fortune">
			<div class="middleText">
				<button class="cta-with-icon">
					<!--          <div class="cards"></div>-->
					<span class="whats-my-fortune-today">{{ randomQuestion }}</span>
				</button>
			</div>
		</router-link>

		<!-- <div class="light-gradient"></div> -->
		<div class="atBottom">
			<div class="rectangle">
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
			<span class="number">{{ userInfoVue.data.left_roll_times }}</span
			><span class="label-8">Roll Left</span>
		</div>
	</div>
</template>

<style scoped>
/* .combine {
  --animate-duration: 3.5s;
} */
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

.openEye {
	position: absolute;
	z-index: 51;
	width: 100%;
	display: flex;
	align-items: center;
	top: calc(145 * var(--rpx));
	justify-content: center;
}

.openEye .open {
	width: calc(58 * var(--rpx));
}

.openEye .close {
	margin-top: calc(25 * var(--rpx));
	width: calc(58 * var(--rpx));
}

.middleText {
	display: flex;
	align-items: center;
	justify-content: center;
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

.circleEye .home-left {
	width: 60px;
	height: 95px;
	position: absolute;
	left: 48px;
	bottom: 54px;
	z-index: 990;
}
.hand {
	z-index: 60;
	position: absolute;
	top: calc(23 * var(--rpx));
	/* right: calc(60* var(--rpx)); */
	/* background-color: rgba(0, 0, 0, 0.25); */
	width: calc(339 * var(--rpx));
	height: calc(339 * var(--rpx));
}

.hand img {
	width: calc(105 * var(--rpx));
	position: absolute;
	bottom: 0;
	right: 0;
}

.atBottom {
	display: flex;
	height: calc(220 * var(--rpx));
	width: 100%;
	position: relative;
	top: calc(8 * var(--rpx));
	box-sizing: border-box;
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

.frame {
	position: relative;
	width: 83%;
	height: calc(339 * var(--rpx));
	margin: calc(8 * var(--rpx)) 0 0 0;
	background: url(../assets/images/emptyEye.png) no-repeat center;
	background-size: cover;
	z-index: 25;
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
	margin: calc(35 * var(--rpx)) 0 0 0;
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
	white-space: normal; /* 允许换行 */
	overflow-wrap: break-word; /* 单词内换行 */
	word-wrap: break-word; /* 老版本的word-wrap属性 */
	width: 98%;
	height: calc(29 * var(--rpx));
	color: #2a272b;
	font-family: Lato, var(--default-font-family);
	font-size: calc(24 * var(--rpx));
	font-weight: 500;
	line-height: calc(29 * var(--rpx));
	text-align: center;
	/* white-space: nowrap; */
	z-index: 33;
}

/* .light-gradient {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: url(../assets/images/bg.svg) no-repeat center;
  background-size: cover;
  z-index: 2;
} */

.rectangle {
	position: absolute;
	width: calc(274 * var(--rpx));
	height: calc(134 * var(--rpx));
	top: calc(23 * var(--rpx));
	left: calc(129 * var(--rpx));
	background: rgba(255, 255, 255, 0.2);
	border: calc(1 * var(--rpx)) solid #ffffff;
	z-index: 16;
	border-radius: calc(16 * var(--rpx));
	box-shadow: 0 calc(6 * var(--rpx)) calc(10 * var(--rpx)) 0 rgba(120, 120, 120, 0.1);
}

/* bootst */

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
	left: calc(29 * var(--rpx));
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
	left: calc(165 * var(--rpx));
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

/* 3 left */

.number {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: calc(87 * var(--rpx));
	height: calc(38 * var(--rpx));
	top: calc(57 * var(--rpx));
	left: calc(27 * var(--rpx));
	color: #ffffff;
	font-family: Lato, var(--default-font-family);
	font-size: calc(32 * var(--rpx));
	font-weight: 700;
	line-height: calc(38 * var(--rpx));
	text-align: center;
	white-space: nowrap;
	z-index: 30;
}

.label-8 {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: calc(80 * var(--rpx));
	height: calc(24 * var(--rpx));
	top: calc(101 * var(--rpx));
	left: calc(30 * var(--rpx));
	color: #ffffff;
	font-family: Lato, var(--default-font-family);
	font-size: calc(20 * var(--rpx));
	font-weight: 500;
	line-height: calc(24 * var(--rpx));
	text-align: center;
	white-space: nowrap;
	z-index: 29;
}

.ton-connect button {
	background-color: red;
}
</style>
