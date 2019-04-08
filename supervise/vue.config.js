/**
 * vue.config.js
 * https://cli.vuejs.org/config/
 */
module.exports = {
  // 构建时开启多进程处理babel编译
  parallel: require("os").cpus().length > 1,
  // 开发环境请求代理
  devServer: {
    proxy: {
      "/data/my": {
        target: "http://admin.dev.yidoka.cn/data/my",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/data/my": "/"
        }
      }
    }
  }
};
