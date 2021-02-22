import Taro from "@tarojs/taro";

interface Http {
  get: Function;
  post: Function;
  polling: Function;
}

const request = (url: string, params: object, type: string) => {
  let contentType: string = "";
  const userToken = Taro.getStorageSync("userToken");
  if (type === "form") {
    contentType = "application/x-www-form-urlencoded";
  } else {
    contentType = "application/json";
  }
  return Taro.request({
    url,
    data: params,
    header: {
      "content-type": contentType,
      token: userToken
    }
  });
};

const get = ({ url, params, type }) => {
  return request(url, params, type);
};

const post = ({ url, params, type }) => {
  return request(url, params, type);
};

const polling = ({ url, params, type }) => {
  return request(url, params, type);
};

const Services: Http = {
  get,
  post,
  polling
};

export default Services;
