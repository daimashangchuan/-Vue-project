import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引用基础组件
import "@/components";
// element ui
import "./plugins/element.js";

// Array.from(ie浏览器不支持)
import "@/utils/polyfill";

import { get, post } from "@/utils/request.js";

// Vue prototype
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
