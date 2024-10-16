import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import "./assets/base.css";         // Base styles
import App from "./App.vue";
import router from "./router";      // Vue router
import "@/utils/tgGlobalSetting";   // Telegram global settings
import i18nData from "@/i18n/i18n"; // i18n data
import { TonConnectUI } from '@tonconnect/ui'; // TonConnect UI

// Initialize i18n with the data provided
const i18n = createI18n(i18nData);

// Initialize TonConnectUI with a manifest URL
const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://t.me/psycholinkdai_bot/psycholinkdai/tonconnect-manifest.json',
});

const app = createApp(App);
app.config.globalProperties.$tonConnect = tonConnectUI; // Make tonConnect globally available
app.use(router);  // Use router
app.use(i18n);    // Use i18n
app.mount("#app"); // Mount the Vue application

// Uncomment below lines for development error debugging with eruda
// import eruda from "eruda";
// eruda.init();
