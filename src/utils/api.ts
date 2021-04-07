import Services from "./http";

const API = {
  getPrivateCourseList: () => {
    return Services.get({
      url: '/api/recommendCourse/getPrivateCourseList'
    })
  },
  getVideoPlayInfo: (params) => {
    return Services.get({
      url: '/api/recommendCourse/getVideoPlayInfo',
      params
    })
  },
  getIsStar(params){
    return Services.get({
      url: '/api/userCourse/judgeCourseIsStar',
      params
    })
  },
  // 给课程点赞
  starCourse(params){
    return Services.post({
      url: '/api/userCourse/updateCourseStars',
      params
    })
  },
  // 获取课程支付信息
  getPayInfo(params){
    return Services.post({
      url: '/api/wxPay/placeOrder',
      params
    })
  },
  getSimilarCourse(params){
    return Services.get({
      url: '/api/recommendCourse/getSimilarCourse',
      params
    })
  }
};

export default API;

// usage:
// import API from '/utils/api'
// API.getUserInfo(params).then(res => { // do something ... })
