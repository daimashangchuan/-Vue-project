import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo", "colorList", "ageList"]),
    data() {
      return {
        pathL: this.path,
        superviseProvinceId: this.userInfo.superviseProvinceId,
        superviseCityId: this.userInfo.superviseCityId,
        superviseCountyId: this.userInfo.superviseCountyId
      };
    }
  },
  data() {
    return {
      path: "",
      option: {}
    };
  },
  mounted() {
    this.getOption();
  }
};
