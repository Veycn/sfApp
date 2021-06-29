import Services from "./http";

const API = {
  getAllGrades: () => {
    return Services.get({
      url: "api/userInfo/getSubjectList"
    })
  },
  getSubjects: (params) => {
    return Services.get({
      url: "api/userInfo/getTextbookList",
      params
    })
  },
  getTextBooks: (params) => {
    return Services.get({
      url: "api/userInfo/getTextbookVersionList",
      params
    })
  },
  getCourseInfo: params => {
    return Services.post({
      url: "/api/userInfo/addUserInfo",
      params,
      type: "form"
    })
  },
  getPrivateCourseList: (params) => {
    return Services.get({
      url: '/api/recommendCourse/getPrivateCourseList',
      params
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
      url: `/api/userCourse/updateCourseStars?courseId=${params.courseId}&type=${params.type}`,
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
  getPlayInfo(params){
    return Services.post({
      url: `api/recommendCourse/getCourseInfo`,
      params
    })
  },
  updatePlayNum(params){
    return Services.post({
      url: `api/userCourse/updatePlayNum?courseId=${params.courseId}`,
      params
    })
  },
  getSimilarCourse(params){
    return Services.get({
      url: '/api/recommendCourse/getSimilarCourse',
      params
    })
  },
  getMyCourseList(params){
    return Services.get({
      url: 'api/userCourse/getMyCourseList',
      params
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
      params,
      type: 'form'
    })
  },
  getLiveCourse(params){
    return Services.get({
      url: `api/recommendCourse/getSimpleLiveCourse?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    })
  },
  getSearchCourse(params){
    return Services.get({
      url: `api/recommendCourse/searchCourse?courseName=${params.courseName}`,
    })
  },
  getMyLikeCourse(params){
    return Services.get({
      url: 'api/userCourse/getCourseStarListByUser',
      params
    })
  },
  getLiveDetail(params){
    return Services.get({
      url: 'api/recommendCourse/getLiveCourseInfo',
      params,
    })
  }
};

export default API;

// usage:
// import API from '/utils/api'
// API.getUserInfo(params).then(res => { // do something ... })
