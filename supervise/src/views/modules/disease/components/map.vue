<template>
  <div class="disease-map">
    <base-layout type="map" :option="option">
      <div class="title" slot="title">
        <span>{{ title + "监管平台" }}</span>
        <img src="@/assets/star-right.png" alt="star">
      </div>
      <div class="list" slot="main">
        <!-- 疾病人数 -->
        <div v-if="list.length !== 0" class="disease-people" @click="getOption">
          <span>监管人数</span>
          <span>{{list[0].supervisedPeople}}</span>
        </div>

        <!-- 疾病数据 -->
        <ul>
          <li
            v-for="(item,index) in list"
            :key="index"
            :style="{ color: colorList[index] }"
            @click="getDiseasePeople(item,index)"
          >
            <p>
              <i :style="{ background: colorList[index] }"></i>
              
              <span>{{item.diseaseName}}</span>
            </p>

            <p>{{item.totalDividedAmount}} 人</p>
          </li>
        </ul>
      </div>
    </base-layout>
  </div>
</template>

<script>
import mixin from "../mixin.js";
import mapOption from "@/utils/map-option.js";
export default {
  name: "DiseaseMap",
  mixins: [mixin],
  computed: {
    title() {
      if (this.userInfo.superviseProvinceId === 0) {
        return this.userInfo.superviseNationName;
      } else {
        return (
          this.userInfo.superviseProvinceName +
          this.userInfo.superviseCityName +
          this.userInfo.superviseCountyName
        );
      }
    }
  },
  data() {
    return {
      path: "/supervise/factDiseaseLabelDay/getTotalDividedAmount",
      list: []
    };
  },
  methods: {
    // 获取疾病列表
    getOption() {
      this.$get("/data/my", this.data).then(res => {
        if (res.state === 0) {
          this.list = res.data;
          const data = {
            diseaseCode: "",
            diseaseName: "",
            supervisedPeople: this.list[0].supervisedPeople
          };
          this.getDiseasePeople(data, 0);
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      });
    },
    // 获取疾病人数
    getDiseasePeople(row, index) {
      const data = {
        pathL: "/supervise/factDiseaseLabelDay/getSubAreaDiseases",
        superviseProvinceId: this.userInfo.superviseProvinceId,
        superviseCityId: this.userInfo.superviseCityId,
        superviseCountyId: this.userInfo.superviseCountyId,
        diseaseCode: row.diseaseCode,
        diseaseName: row.diseaseName
      };
      this.$get("/data/my", data).then(res => {
        if (res.state === 0) {
          const list = res.data.subAmountList;
          const data = list.map(item => {
            return {
              name: item.areamapDesc,
              value: item.subAmount
            };
          });
          const maxList = data.map(item => item.value);
          if (row.diseaseName === "") {
            row.diseaseName = "监管人数";
            row.totalDividedAmount = row.supervisedPeople;
          }
          const [title, max] = [
            {
              text: `${row.diseaseName}    ${row.totalDividedAmount}人`,
              textStyle: {
                color: this.colorList[index]
              },
              padding: [20, 20]
            },
            maxList.reduce((a, b) => a + b)
          ];
          this.option = mapOption(title, max, data);
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
