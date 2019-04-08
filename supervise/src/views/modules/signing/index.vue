<template>
  <div class="signing">
    <!-- 签约地图 -->
    <div class="signing-map">
      <base-layout type="map" :option="mapOption" flexFlow="column">
        <div class="title" slot="title">
          <span>选择时间</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            size="mini"
            @change="changeDate"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="list" slot="main">
          <ul>
            <li
              v-for="(item,index) in list"
              :key="index"
              :style="{ color: colorList[index] }"
              @click="getMapData(item,index)"
            >
              <p>
                <i :style="{ background: colorList[index] }"></i>
                <span>{{ item.packName }}</span>
              </p>
              <p>{{ item.totalDividedAmount || 0 }}人</p>
            </li>
          </ul>
        </div>
      </base-layout>
    </div>
    <div class="signing-chart">
      <div class="signing-chart-sex">
        <base-layout :option="sexpOption">
          <div class="title" slot="title">
            <span>签约人群性别分析</span>
            <img src="@/assets/star.png" alt="star">
          </div>
        </base-layout>
      </div>
      <div class="signing-chart-age">
        <base-layout :option="ageOption">
          <div class="title" slot="title">
            <p>签约人群年龄分析</p>
            <img src="@/assets/star.png" alt="star">
          </div>
        </base-layout>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mapOption from "@/utils/map-option.js";
let timeStatus = true;
export default {
  name: "Signing",
  computed: {
    ...mapGetters(["userInfo", "colorList", "ageList"]),
    sexpOption() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: this.sexData[0],
                name: "男",
                itemStyle: {
                  color: "#56C6B7"
                }
              },
              {
                value: this.sexData[1],
                name: "女",
                itemStyle: {
                  color: "#B54ABC"
                }
              }
            ]
          }
        ]
      };
    },
    ageOption() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            data: this.ageData,
            roseType: "radius",
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: () => Math.random() * 200
          }
        ]
      };
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
        onPick({ minDate, maxDate }) {
          if (minDate !== null && maxDate !== null) {
            const time = 30 * 24 * 60 * 60 * 1000;
            const times = maxDate.getTime() - minDate.getTime();
            if (time < times) {
              timeStatus = false;
              this.$message({
                message: "时间范围为30天",
                type: "warning",
                center: true
              });
            }
          }
        }
      },
      date: [],
      list: [],
      sexData: [0, 0],
      ageData: [],
      mapOption: {}
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 获取列表数据
    loadData() {
      const data = {
        pathL: "/supervise/calcSignPack/getTotalDividedSignAmount",
        superviseProvinceId: this.userInfo.superviseProvinceId,
        superviseCityId: this.userInfo.superviseCityId,
        superviseCountyId: this.userInfo.superviseCountyId,
        serviceBdateStart: this.date[0] || "",
        serviceBdateEnd: this.date[1] || ""
      };
      this.$get("/data/my", data).then(res => {
        if (res.state === 0) {
          // 服务包列表
          const list = res.data.calcSignPackVos;
          this.list = list;
          const row = {
            packageId: "",
            packName: "",
            packSignTotal: list[0].packSignTotal
          };
          this.getMapData(row, 0);
          // 性别
          const sexList = res.data.sexDevidedAmountList;
          let sexData = [0, 0];
          if (sexList.length !== 0) {
            sexList.map(item => {
              sexData[item.sex - 1] = item.sexDevidedAmount;
            });
          }
          this.sexData = sexData;
          // 年龄
          const ageList = res.data.ageDevidedAmountList;
          let ageValue = Array.from({ length: 6 }, () => 0);
          if (ageList.length !== 0) {
            ageList.forEach(item => {
              ageValue[item.ageCode - 1] = item.ageDevidedAmount;
            });
          }
          const ageData = ageValue.map((item, index) => {
            return {
              value: item,
              name: this.ageList[index],
              itemStyle: {
                color: this.colorList[index]
              }
            };
          });
          this.ageData = ageData;
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      });
    },
    // 获取地图数据
    getMapData(row, index) {
      const data = {
        pathL: "/supervise/calcSignPack/getSubAreaSignPack",
        superviseProvinceId: this.userInfo.superviseProvinceId,
        superviseCityId: this.userInfo.superviseCityId,
        superviseCountyId: this.userInfo.superviseCountyId,
        serviceBdateStart: this.date[0] || "",
        serviceBdateEnd: this.date[1] || "",
        packageId: row.packageId,
        signName: row.packName
      };
      this.$get("/data/my", data).then(res => {
        if (res.state === 0) {
          const list = res.data.subAmountList;
          let data = [];
          if (list.length !== 0) {
            data = list.map(item => {
              return {
                name: item.areamapDesc,
                value: item.subAmount
              };
            });
          }
          const title = {
            text: `${res.data.signName}      ${row.packSignTotal}人`,
            textStyle: {
              color: this.colorList[index]
            },
            padding: [20, 20]
          };
          this.mapOption = mapOption(title, row.packSignTotal, data);
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      });
    },
    // 日期切换
    changeDate() {
      if (timeStatus) {
        this.loadData();
      }
    }
  }
};
</script>

<style lang="scss" src="./index.scss">
</style>
