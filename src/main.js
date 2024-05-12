import { createApp } from "vue";
import "./assets/base.css";
import App from "./App.vue";
import router from "./router";
import "@/utils/tgGlobalSetting";
//for dev
import eruda from "eruda";
eruda.init();

//import "animate.css";
const app = createApp(App);

app.use(router);

app.mount("#app");
