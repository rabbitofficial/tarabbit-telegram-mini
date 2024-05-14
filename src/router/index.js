import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FortuneView from "@/views/FortuneView.vue";
import FortuneFlipView from "@/views/FortuneFlipView.vue";
import InviteFriendView from "@/views/InviteFriendView.vue";
import ResultView from "@/views/ResultView.vue";
import BoostView from "@/views/BoostView.vue";
import QuestionListView from "@/views/QuestionListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/fortune",
      name: "fortune",
      component: FortuneView,
    },
    {
      path: "/fortuneFlip",
      name: "fortuneFlip",
      component: FortuneFlipView,
    },
    {
      path: "/inviteFriend",
      name: "inviteFriend",
      component: InviteFriendView,
    },
    {
      path: "/result",
      name: "result",
      component: ResultView,
    },
    {
      path: "/boost",
      name: "boost",
      component: BoostView,
    },
    {
      path: "/questionList",
      name: "questionList",
      component: QuestionListView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
