import Cookies from "js-cookie";
const domain =
  document.domain === "localhost" ? "localhost" : process.env.VUE_APP_DOMAIN;
const getCookie = TokenKey => Cookies.get(TokenKey);
const setCookie = (TokenKey, token) =>
  Cookies.set(TokenKey, token, {
    expires: 7,
    domain
  });
const removeCookie = TokenKey =>
  Cookies.remove(TokenKey, {
    domain
  });
export { getCookie, setCookie, removeCookie };
