window.Telegram.WebApp.BackButton.isVisible = true;

window.Telegram.WebApp.BackButton.onClick(() => {
  window.history.go(-1);
  console.log(123);
});
