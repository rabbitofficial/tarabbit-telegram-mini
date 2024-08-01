<template>
  <div class="carousel-container">
    <div class="carousel-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
      <div class="button-container" v-for="(button, buttonIndex) in row" :key="button.id" :style="getButtonStyle(buttonIndex)">
        <button>{{ button.label }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { id: 1, label: "Button 1" },
        { id: 2, label: "Button 2" },
        { id: 3, label: "Button 3" },
        { id: 4, label: "Button 4" },
        { id: 5, label: "Button 5" },
        { id: 6, label: "Button 6" },
        { id: 7, label: "Button 7" },
        { id: 8, label: "Button 8" },
        { id: 9, label: "Button 9" }
      ]
    };
  },
  computed: {
    rows() {
      const numRows = 3;
      return Array.from({ length: numRows }, (_, i) =>
          this.buttons.filter((_, index) => index % numRows === i)
      );
    }
  },
  methods: {
    getButtonStyle(index2) {
      const speeds = [10, 30, 50]; // 每个按钮的速度（秒）
      return {
        animation: `scroll-horizontal ${speeds[3 % speeds.length]}s linear infinite`,
        animationDelay: `(5 - ${index2 * 1})s` // 每个按钮不同的延迟
      };
    }
  }
};
</script>

<style>
.carousel-container {
  overflow: hidden;
  width: 100%;
  height: 150px; /* 根据需要调整 */
  position: relative;
}

.carousel-row {
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
}

.button-container {
  display: inline-block;
  white-space: nowrap;
}

@keyframes scroll-horizontal {
  from {
    transform: translateX(-300%);
  }
  to {
    transform: translateX(100%);
  }
}

  button {
    margin-right: 10px; /* 按钮之间的间距 */
  }
</style>
