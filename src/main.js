import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import "./assets/base.css";
import App from "./App.vue";
import router from "./router";
import "@/utils/tgGlobalSetting";
import i18nData from "@/i18n/i18n";
import {TonConnectUI} from '@tonconnect/ui'
//for dev
//import eruda from "eruda";
//eruda.init();

const i18n = createI18n(i18nData);
const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://t.me/psycholinkdai_bot/psycholinkdai/tonconnect-manifest.json',
})
//import "animate.css";
const app = createApp(App);
app.config.globalProperties.$tonConnect = tonConnectUI;
app.use(router);
app.use(i18n);
app.mount("#app");
