<template>
  <div class="disease-ranking">
    <base-layout :option="option">
      <div class="title" slot="title">
        <span>疾病排名</span>
        <img src="@/assets/star-left.png" alt="star">
      </div>
    </base-layout>
  </div>
</template>

<script>
import mixin from "../mixin.js";
export default {
  name: "SigingRanking",
  mixins: [mixin],
  data() {
    return {
      path: "/supervise/factDiseaseLabelDay/getTotalSeperated"
    };
  },
  methods: {
    // 获取疾病排行数据
    getOption() {
      this.$get("/data/my", this.data).then(res => {
        if (res.state === 0) {
          const option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow"
              }
            },
            grid: {
              left: "3%",
              right: "3%",
              bottom: "3%",
              top: "10%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: res.data.diseasesNameList[0],
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                  lineStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                axisLine: {
                  lineStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            series: [
              {
                name: "人数",
                type: "bar",
                data: res.data.totalAmountList[0],
                itemStyle: {
                  normal: {
                    // 随机显示
                    //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                    // 定制显示（按顺序）
                    color: params => this.colorList[params.dataIndex]
                  }
                }
              }
            ]
          };
          this.option = option;
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      });
    }
  }
};
</script>
