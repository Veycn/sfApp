export default {
  pages: [
    "pages/customize/index",
    "pages/index/index",
    "pages/live/index",
    "pages/mycourse/index",
    "pages/user/index",
    "pages/exam/index",
    "pages/detect/index",
    "pages/detectResult/index",
    "pages/tLogin/index",
    "pages/income/index",
    "pages/points/index",
    "pages/similar/index",
    "pages/search/index",
    "pages/play/index",
    "pages/slide/index"
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
        text: "首页",
        iconPath: "assets/tab/home.png",
        selectedIconPath: "assets/tab/home_a.png"
      },
      {
        pagePath: "pages/live/index",
        text: "直播课",
        iconPath: "assets/tab/live.png",
        selectedIconPath: "assets/tab/live_a.png"
      },
      {
        pagePath: "pages/detect/index",
        text: "检测",
        iconPath: "assets/tab/check.png",
        selectedIconPath: "assets/tab/check_a.png"
      },
      {
        pagePath: "pages/mycourse/index",
        text: "课程",
        iconPath: "assets/tab/course.png",
        selectedIconPath: "assets/tab/course_a.png"
      },
      {
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "assets/tab/mine.png",
        selectedIconPath: "assets/tab/mine_a.png"
      }
    ],
    color: "#ffffff",
    selectedColor: "#15EC89",
    backgroundColor: "#000",
    borderStyle: "black",
  }
};
