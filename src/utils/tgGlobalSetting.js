const tg = window.Telegram.WebApp;

tg.BackButton.isVisible = true;

tg.BackButton.onClick(() => {
  window.history.go(-1);
});

window.localStorage.setItem("canTarabbit", "0");
