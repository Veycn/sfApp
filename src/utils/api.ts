import Services from "./http";

const API = {
  getUserInfo: params => {
    return Services.get({
      url: "/api",
      params
    });
  }
};

export default API;

// usage:
// import API from '/utils/api'
// API.getUserInfo(params).then(res => { // do something ... })
