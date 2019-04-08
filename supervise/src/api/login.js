import { post } from "@/utils/request.js";

// 登录
const LoginIn = (loginName, pwd) => {
  const data = {
    pathL: "/ap/login/",
    loginName,
    pwd
  };
  return post("/data/my", data);
};

// 获取用户信息
const GetInfo = () => {
  const data = {
    pathL: "/ap/login/getMenuByUserId"
  };
  return post("/data/my", data);
};

// 退出
const LoginOut = () => {
  const data = {
    pathL: "/ap/login/out"
  };
  return post("/data/my", data);
};

export { LoginIn, GetInfo, LoginOut };
