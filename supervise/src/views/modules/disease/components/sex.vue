<template>
  <div class="disease-sex">
    <base-layout :option="option">
      <div class="title" slot="title">
        <span>疾病与性别</span>
        <img src="@/assets/star.png" alt="star">
      </div>
    </base-layout>
  </div>
</template>

<script>
import mixin from "../mixin.js";
export default {
  name: "DiseaseSex",
  mixins: [mixin],
  data() {
    return {
      path: "/supervise/factDiseaseLabelDay/getSexDividedAmount"
    };
  },
  methods: {
    // 获取疾病与性别数据
    getOption() {
      this.$get("/data/my", this.data).then(res => {
        if (res.state === 0) {
          const list = res.data;
          let [diseaseNames, male, female] = [[], [], []];
          for (let item of list) {
            diseaseNames.push(item.diseaseName);
            switch (item.sexCode) {
              case 1:
                male.push(item.diseaseSexAmount);
                break;
              case 2:
                female.push(item.diseaseSexAmount);
                break;
            }
          }
          diseaseNames = [...new Set(diseaseNames)];
          const option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
                crossStyle: {
                  color: "#999"
                }
              }
            },
            grid: {
              left: "3%",
              right: "3%",
              bottom: "3%",
              containLabel: true
            },
            legend: {
              data: [
                {
                  name: "男",
                  textStyle: {
                    color: "#fff"
                  }
                },
                {
                  name: "女",
                  textStyle: {
                    color: "#fff"
                  }
                }
              ]
            },
            xAxis: [
              {
                type: "category",
                data: diseaseNames,
                axisLine: {
                  lineStyle: {
                    color: "#fff"
                  }
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  },
                  interval: 0,
                  rotate: 30
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
                },
                axisLabel: {
                  formatter: "{value}"
                }
              }
            ],
            series: [
              {
                name: "男",
                type: "bar",
                data: male,
                itemStyle: {
                  normal: {
                    color: "#56C6B7"
                  }
                }
              },
              {
                name: "女",
                type: "bar",
                data: female,
                itemStyle: {
                  normal: {
                    color: "#B54ABC"
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
