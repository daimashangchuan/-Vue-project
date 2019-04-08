// 正则验证表

// 密码验证
const isValidPwd = str => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  return reg.test(str);
};
export { isValidPwd };
