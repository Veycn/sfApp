export default {
  pages: [
    "pages/index/index",
    "pages/customize/index",
    "pages/mycourse/index",
    "pages/user/index",
    "pages/exam/index",
    "pages/detect/index",
    "pages/detectResult/index",
    "pages/tLogin/index",
    "pages/income/index",
    "pages/points/index",
    "pages/search/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#000",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white"
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/customize/index",
        text: "定制课程",
        iconPath: "assets/icon/b.png",
        selectedIconPath: "assets/icon/b_active.png"
      },
      {
        pagePath: "pages/detect/index",
        text: "认知检测",
        iconPath: "assets/icon/a.png",
        selectedIconPath: "assets/icon/a_active.png"
      },
      {
        pagePath: "pages/mycourse/index",
        text: "我的课程",
        iconPath: "assets/icon/c.png",
        selectedIconPath: "assets/icon/c_active.png"
      },
      {
        pagePath: "pages/user/index",
        text: "个人中心",
        iconPath: "assets/icon/c.png",
        selectedIconPath: "assets/icon/c_active.png"
      }
    ],
    color: "#ffffff",
    selectedColor: "#15EC89",
    backgroundColor: "#000",
    borderStyle: "black",
  }
};
