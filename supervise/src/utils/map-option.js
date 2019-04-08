/**
 * 地图option
 * @param text 地图标题
 * @param color 地图标题颜色
 * @param max 地图数据最大值
 * @param data 地图数据
 */
const option = (title, max, data) => {
  return {
    title,
    visualMap: {
      min: 0,
      max,
      text: ["High", "Low"],
      realtime: false,
      calculable: true,
      inRange: {
        color: ["lightskyblue", "yellow", "orangered"]
      }
    },
    tooltip: {
      trigger: "item",
      formatter: params =>
        params.value ? params.name + "<br/>" + params.value + "人" : "0人"
    },
    series: [
      {
        type: "map",
        mapType: "jkyw",
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: "#fff"
            },
            //默认状态
            areaColor: "rgb(17,98,154)", //地图本身的颜色
            borderColor: "rgb(60,180,207)", //省份的边框颜色
            borderWidth: 1, //省份的边框宽度
            opacity: 0.8 //图形透明度
          },
          // 高亮状态
          emphasis: {
            areaColor: "rgb(105,247,180)", //高亮时候地图显示的颜色
            borderWidth: 0 //高亮时候的边框宽度
          }
        },
        data
      }
    ]
  };
};

export default option;
