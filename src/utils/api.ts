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
      url: `/api/userCourse/updateCourseStars?courseId=${params.courseId}&courseStars=${params.courseStars}`,
      params
    })
  },
  // 获取课程支付信息
  getPayInfo(params){
    return Services.post({
      url: `api/wxPay/placeOrder?courseId=${params.courseId}`,
      params
    })
  },
  getSimilarCourse(params){
    return Services.get({
      url: '/api/recommendCourse/getSimilarCourse',
      params
    })
  },
  getMyCourseList(){
    return Services.get({
      url: 'api/userCourse/getMyCourseList',
    })
  },
  userLogin(params){
    return Services.post({
      url: 'api/userAccount/login',
      params
    })
  },
  getBookInfo(){
    return Services.get({
      url: 'api/exam/getUserTextbookInfo',
    })
  },
  updateRelay(params){
    return Services.post({
      url: `api/userCourse/updateCourseRelayNum?courseId=${params.courseId}&relayNum=${params.relayNum}`,
    })
  }
};

export default API;

// usage:
// import API from '/utils/api'
// API.getUserInfo(params).then(res => { // do something ... })
