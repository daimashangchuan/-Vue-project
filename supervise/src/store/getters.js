const getters = {
  accessToken: state => state.user.accessToken,
  userId: state => state.user.userId,
  menuInfo: state => state.user.menuInfo,
  userInfo: state => state.user.userInfo,
  geoJson: state => state.user.geoJson,
  colorList: state => state.user.colorList,
  ageList: state => state.user.ageList
};
export default getters;
