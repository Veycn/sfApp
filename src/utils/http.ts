
import Taro from "@tarojs/taro";

interface Http {
  get: Function;
  post: Function;
  polling: Function;
}

enum Method{
  GET = 'GET',
  POST = 'POST'
}

const BASE = 'https://www.shenfu.online/sfeduWx/';

const request = (url: string, params: object, method: Method=Method.GET, type?: string,) => {
  let contentType: string = "";
  const userToken = Taro.getStorageSync("userToken");
  if (type === Method.POST) {
    contentType = "application/x-www-form-urlencoded";
  } else {
    contentType = "application/json";
  }
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
