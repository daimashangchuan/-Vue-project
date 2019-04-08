<template>
  <div class="disease-age">
    <base-layout :option="option">
      <div class="title" slot="title">
        <span>疾病与年龄</span>
        <img src="@/assets/star.png" alt="star">
      </div>
    </base-layout>
  </div>
</template>

<script>
import mixin from "../mixin.js";
export default {
  name: "DiseaseAge",
  mixins: [mixin],
  data() {
    return {
      path: "/supervise/factDiseaseLabelDay/getAgeDividedAmount"
    };
  },
  methods: {
    // 获取疾病与性别数据
    getOption() {
      this.$get("/data/my", this.data).then(res => {
        if (res.state === 0) {
          const data = res.data;
          let itemData = [];
          let series = [];
          let list = {};
          let [age1, age2, age3, age4, age5, age6] = [[], [], [], [], [], []]; //  年龄段
          let ageList = [];
          for (let item of data) {
            ageList.push(item.diseaseName);
            switch (item.ageCode) {
              case 1:
                age1.push(item.diseaseAgeAmount); // 0-6岁
                break;
              case 2:
                age2.push(item.diseaseAgeAmount); // 7～18岁
                break;
              case 3:
                age3.push(item.diseaseAgeAmount); // 19～35岁
                break;
              case 4:
                age4.push(item.diseaseAgeAmount); // 36～59岁
                break;
              case 5:
                age5.push(item.diseaseAgeAmount); // 60～79岁
                break;
              case 6:
                age6.push(item.diseaseAgeAmount); // 80岁以上
                break;
            }
          }
          ageList = [...new Set(ageList)];
          itemData.push(age1, age2, age3, age4, age5, age6);
          for (let i = 0; i < 6; i++) {
            list[i] = {
              name: this.ageList[i],
              type: "bar",
              textStyle: {
                color: this.colorList[i]
              },
              itemStyle: {
                normal: {
                  color: this.colorList[i]
                }
              },
              data: itemData[i]
            };
            series.push(list[i]);
          }
          const option = {
            grid: {
              left: "3%",
              right: "3%",
              bottom: "3%",
              containLabel: true
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
                crossStyle: {
                  color: "#999"
                }
              }
            },
            legend: {
              data: series
            },
            calculable: true,
            xAxis: [
              {
                type: "category",
                data: ageList,
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
            series: series
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
