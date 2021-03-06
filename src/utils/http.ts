import Taro from "@tarojs/taro";

interface Http {
  get: Function;
  post: Function;
  polling: Function;
}

enum Type {
  GET = 'GET',
  POST = 'POST'
}

const request = (url: string, params: object, type: Type = Type.GET) => {
  let contentType: string = "";
  const userToken = Taro.getStorageSync("userToken");
  if (type === Type.POST) {
    contentType = "application/x-www-form-urlencoded";
  } else {
    contentType = "application/json";
  }
  return Taro.request({
    url,
    data: params,
    method: type,
    header: {
      "content-type": contentType,
      token: userToken
    }
  });
};

const get = ({ url, params}) => {
  return request(url, params);
};

const post = ({ url, params }) => {
  return request(url, params, Type.POST);
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
