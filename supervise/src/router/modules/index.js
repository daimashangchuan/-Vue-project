const requireRoutes = require.context(
  // 检查目录的相对路径
  ".",
  // 是否查询其子目录
  false,
  // "_" .js文件
  /_[\w-]+\.js$/
);

// 定义首页子路由合集(children)
let routes = [];

// 遍历子模块push到routes集合里
requireRoutes.keys().map(router => {
  const routesConfig = requireRoutes(router);
  routes.push(...routesConfig.default);
});

export default [
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login")
  },
  {
    path: "/forget",
    name: "忘记密码",
    component: () => import("@/views/login/forget")
  },
  {
    path: "/",
    name: "首页",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/layout"),
    children: routes
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/error/401")
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/error/404")
  }
];
