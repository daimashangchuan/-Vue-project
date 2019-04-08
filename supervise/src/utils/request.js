import axios from "axios";
import qs from "qs";
import router from "@/router";
import store from "@/store";

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.version = process.env.VUE_APP_VERSION;
    if (store.getters.accessToken) {
      config.headers.accessToken = store.getters.accessToken;
      config.headers.userId = store.getters.userId;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    switch (response.data.state) {
      case 4011: //token过期
      case 4013: //用户被禁用
      case 1003: //刷新token过期
        store.dispatch("LoginOut").then(() => {
          router.replace({
            path: "/login"
          })
        });
        break;
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  }
);

const get = async (url, query) => {
  try {
    const result = await axios.get(url, { params: query });
    return result.data;
  } catch (error) {
    return error;
  }
};

const post = async (url, data) => {
  try {
    const result = await axios.post(url, qs.stringify(data));
    return result.data;
  } catch (error) {
    return error;
  }
};

export { get, post };
