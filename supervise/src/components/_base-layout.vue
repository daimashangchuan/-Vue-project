<template>
  <!-- layout -->
  <div :class="status?'base-layout-enlarge':'base-layout'">
    <!-- layout header -->
    <div class="base-layout-header">
      <div class="base-layout-title">
        <slot name="title"></slot>
      </div>
      <!-- icon -->
      <img v-if="status" @click="change" class="change-icon" src="@/assets/shrink.png" alt="shrink">
      <img v-else @click="change" class="change-icon" src="@/assets/enlarge.png" alt="enlarge">
    </div>

    <!-- layout main -->
    <div class="base-layout-main" :style="{ flexFlow : flexFlow }">
      <slot name="main"></slot>
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapGetters } from "vuex";
export default {
  name: "BaseLayout",
  computed: {
    ...mapGetters(["userInfo", "geoJson"])
  },
  props: {
    //   chart-option（必填）
    option: {
      type: Object,
      required: true
    },
    //   chart-type（选填）
    type: {
      type: String,
      default: "baseChart"
    },
    //   chart-flexFlow（选填）
    flexFlow: {
      type: String,
      default: "wrap"
    }
  },
  data() {
    return {
      status: false,
      myChart: null
    };
  },
  watch: {
    option(now) {
      this.drawing(now);
    }
  },
  methods: {
    // 绘制图表
    drawing(option) {
      // 初始化echarts实例
      const myChart = echarts.init(this.$refs.chart);

      // 地图图表（map）--- 默认为普通图表（baseChart）
      if (this.type === "map") {
        echarts.registerMap("jkyw", this.geoJson);
      }
      // 使用配置项和数据显示图表
      myChart.setOption(option, true);

      this.myChart = myChart;

      // 屏幕自适应
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    // 放大缩小
    change() {
      this.status = !this.status;
      setTimeout(() => {
        this.myChart.resize();
      }, 0);
    }
  }
};
</script>

<style lang="scss" src="./_base-layout.scss">
</style>
