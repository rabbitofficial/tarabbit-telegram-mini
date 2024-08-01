const getCard = (combo) => {
  const myurl = `@/assets/cards/${combo}.svg`;
  return combo;
};

const cardList = [
  "@/assets/images/heartFill.svg",
  "@/assets/images/heartFill.svg",
  "@/assets/images/moneyFill.svg",
];

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRamdomCard = (number = 1) => {
  const cardType = ["S", "H", "D", "C"];
  const cardNumber = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const randomComboList = [];
  let isGetAllCard = false;
  let countCard = 0;
  while (!isGetAllCard) {
    const randCombo =
      cardNumber[getRandomNumber(0, 12)] + cardType[getRandomNumber(0, 3)];
    if (!randomComboList.includes(randCombo)) {
      countCard++;
      randomComboList.push(randCombo);
    }

    if (countCard >= number) {
      isGetAllCard = true;
    }
  }
  return randomComboList.map((item) => getCard(item));
};

const getDefaultCards = () => {
  return cardList;
};

const helper = {
  test: () => {},
  //baseUrl: "https://taapi.cvgo.vip/",
  inviteLink: "http://t.me/Tarabbit_bot/myapp",
  baseUrl: "https://c7ef-210-22-173-90.ngrok-free.app/",
  getRamdomCard,
  getDefaultCards,
  getCard,
  getRandomNumber,
};

export default helper;
