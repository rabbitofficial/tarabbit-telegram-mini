<script setup>
import { onMounted, reactive } from 'vue';


//const imgUrl = new URL('@/assets/cards/2C.svg', import.meta.url)

const cardList = ['@/assets/images/heartFill.svg', '@/assets/images/hatFill.svg', '@/assets/images/moneyFill.svg']
const getCard = (combo) => {
    const myurl = `@/assets/cards/${combo}.svg`
    return new URL(myurl, import.meta.url).href
}

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRamdomCard = (number = 1) => {
    const cardType = ['S', 'H', 'D', 'C']
    const cardNumber = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    const randomComboList = []
    let isGetAllCard = false
    let countCard = 0
    while (!isGetAllCard) {
        const randCombo = cardNumber[getRandomNumber(0, 12)] + cardType[getRandomNumber(0, 3)]
        if (!randomComboList.includes(randCombo)) {
            countCard++
            randomComboList.push(randCombo)
        }

        if (countCard >= number) {
            isGetAllCard = true
        }
    }
    return randomComboList.map(item => getCard(item))
}

onMounted(() => {
    //console.log(getRamdomCard(3))
})
</script>
<template>
    <div>123</div>
</template>

<style></style>