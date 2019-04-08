import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

import { Loading } from "element-ui";
import routes from "./modules";

const router = new Router({
  //  history 去掉#
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  // 跳转路由后滚动行为
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});

// 路由拦截
router.beforeEach((to, from, next) => {
  document.title = "监管平台-" + to.name;

  // 首页跳转疾病（临时）
  if (to.path === "/") {
    next({
      path: "/disease",
      replace: true
    });
  }

  // 登录拦截
  //  是否需要登录
  if (to.meta.requireAuth) {
    //  是否登录成功
    if (store.getters.accessToken) {
      const toPath = to.path;
      //  如果没有获取用户信息
      if (!store.getters.userInfo) {
        let loading = Loading.service();
        //  获取用户信息
        store.dispatch("GetInfo").then(() => {
          loading.close();
          // 权限拦截
          const menuURL = store.getters.menuInfo.menuJGURL;
          let status = false;
          for (let item of menuURL) {
            if (toPath === item) {
              status = true;
            }
          }
          if (status) {
            next();
          } else {
            next({
              path: "/401",
              replace: true
            });
          }
        });
      } else {
        next();
      }
    } else {
      next({
        path: "/login",
        replace: true
      });
    }
  } else {
    next();
  }
});

export default router;
