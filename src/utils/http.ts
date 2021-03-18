import Taro from "@tarojs/taro";

interface Http {
  get: Function;
  post: Function;
  polling: Function;
}
const BASE = 'https://www.shenfu.online/sfeduWx/';
enum Method{
  GET = 'GET',
  POST = 'POST'
}
const request = (url: string, params: object, method: Method=Method.GET, type?: string,) => {
  let contentType: string = "";
  const userToken = Taro.getStorageSync("userToken");
  if (type === "form") {
    contentType = "application/x-www-form-urlencoded";
  } else {
    contentType = "application/json";
  }
  console.log(method);
  return Taro.request({
    url: BASE+url,
    data: params,
    method: method,
    header: {
      "content-type": contentType,
      token: userToken
    }
  });
};

function getHeader (id=0) {
  return new Promise((resolve, reject) => {
    if(id === 1){
      console.log(1);
      
      Taro.getStorage({
        key: 'teacherToken',
        success: result => {
          resolve(result.data)
        }
      })
    }else if(id === 0){
      Taro.getStorage({
        key: 'userToken',
        success: result => {
          console.log(result);
          resolve(result.data)
        }
      })
    }
  })
}

const get = ({ url, params }) => {
  return request(url, params,Method.GET);
};

const post = ({ url, params, type }) => {
  return request(url, params,Method.POST, type);
};

const polling = ({ url, params}) => {
  return request(url, params);
};

const Services: Http = {
  get,
  post,
  polling
};

export default Services;
