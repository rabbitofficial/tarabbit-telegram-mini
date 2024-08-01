import {reactive} from "vue";
const tg = window.Telegram.WebApp;

tg.BackButton.isVisible = true;

tg.BackButton.onClick(() => {
  window.history.go(-1);
});

window.localStorage.setItem("canTarabbit", "0");
const questionList = reactive([
  { title: "What’s my fortune today?" },
  { title: "Am I on the right path with my current job?" },
  { title: "Should I change to a new job?" },
  { title: "What is the future of my current relationship?" },
  { title: "Is he/she the right person?" },
  { title: "Will I find love soon?" },
  { title: "How will my finance be over the coming months?" },
  { title: "Is investing in crypto a good decision for me?" },
  { title: "What should I be cautious about health-wise?" },
  { title: "How can I improve my physical and mental well-being?" },
  { title: "Should I make the big move I’ve been considering?" },
  { title: "Is my current choice correct?" }
]);
export default questionList;