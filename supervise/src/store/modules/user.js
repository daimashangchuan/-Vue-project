import { getCookie, setCookie, removeCookie } from "@/utils/cookie";
import { LoginIn, GetInfo, LoginOut } from "@/api/login";
import getMapJson from "@/api/map";

const user = {
  state: {
    //  accessToken
    accessToken: getCookie("accessToken"),
    //  refreshToken
    refreshToken: getCookie("refreshToken"),
    //  userId
    userId: getCookie("userId"),
    //  用户菜单
    menuInfo: null,
    //  用户信息
    userInfo: null,
    // 地理数据结构 geoJson
    geoJson: null,
    //  颜色列表
    colorList: [
      "#4E7EFF",
      "#D2C418",
      "#30E7E5",
      "#797CFF",
      "#A98DDE",
      "#A620A8",
      "#BA6C6C",
      "#7857EE",
      "#399B4B"
    ],
    // 年龄分段列表
    ageList: [
      "0～6岁",
      "7～18岁",
      "19～35岁",
      "36～59岁",
      "60～79岁",
      "80岁以上"
    ]
  },

  mutations: {
    // accessToken
    SET_TOKEN: (state, token) => {
      state.accessToken = token.accessToken;
      state.refreshToken = token.refreshToken;
    },
    // userId
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    // menuInfo
    SET_MENUINFO: (state, menuInfo) => {
      state.menuInfo = menuInfo;
    },
    // userInfo
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    // geoJson
    SET_GEOJSON: (state, geoJson) => {
      state.geoJson = geoJson;
    },
    // clear
    CLEAR_INFO: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;
      state.menuInfo = null;
      state.userInfo = null;
    }
  },

  actions: {
    // 登录
    async LoginIn({ commit }, data) {
      try {
        const { loginName, pwd } = data;
        const result = await LoginIn(loginName, pwd);
        if (result.state === 0) {
          const info = result.data.loginInfo;
          // 存储token
          commit("SET_TOKEN", info);
          setCookie("accessToken", info.accessToken);
          setCookie("refreshToken", info.refreshToken);
          // 存储用户ID
          commit("SET_USERID", info.id);
          setCookie("userId", info.id);
        }
        return result;
      } catch (error) {
        return error;
      }
    },

    // 获取信息
    async GetInfo({ commit }) {
      try {
        const result = await GetInfo();
        const getGeoJson = await getMapJson(result.data.userInfo);
        // 拉取用户信息和菜单信息
        if (result.state === 0) {
          const userInfo = result.data;
          commit("SET_USERINFO", userInfo.userInfo);
          commit("SET_MENUINFO", userInfo.menuInfo);
        }
        // 拉取用户权限地图信息
        if (getGeoJson.state === 0) {
          const geoJson = JSON.parse(getGeoJson.data.jasonMap);
          commit("SET_GEOJSON", geoJson);
        }
        return result;
      } catch (error) {
        return error;
      }
    },

    // 退出
    async LoginOut({ commit }) {
      try {
        const result = await LoginOut();
        commit("CLEAR_INFO");
        removeCookie("accessToken");
        removeCookie("refreshToken");
        removeCookie("userId");
        return result;
      } catch (error) {
        return error;
      }
    }
  }
};

export default user;
