import { get } from "@/utils/request.js";

// 获取地图 geoJson
const getMapJson = superviseId => {
  const data = {
    pathL: "/supervise/areaMap/getAreaMapByTotalId",
    superviseProvinceId: superviseId.superviseProvinceId,
    superviseCityId: superviseId.superviseCityId,
    superviseCountyId: superviseId.superviseCountyId
  };
  return get("/data/my", data);
};

export default getMapJson;
