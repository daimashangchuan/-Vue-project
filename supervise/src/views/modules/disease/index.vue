<template>
  <div class="disease">
    <div class="disease-left">
      <!-- 地图 -->
      <disease-map></disease-map>

      <!-- 疾病排名 -->
      <disease-ranking></disease-ranking>
    </div>

    <div class="disease-right">
      <!-- 疾病与性别 -->
      <disease-sex></disease-sex>

      <!-- 疾病与年龄 -->
      <disease-age></disease-age>
    </div>
  </div>
</template>

<script>
import diseaseMap from "./components/map";
import diseaseRanking from "./components/ranking";
import diseaseSex from "./components/sex";
import diseaseAge from "./components/age";
export default {
  name: "Disease",
  components: { diseaseMap, diseaseRanking, diseaseSex, diseaseAge }
};
</script>

<style lang="scss" src="./index.scss">
</style>
