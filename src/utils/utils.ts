/**
 * @description 转换价格，拼上价格单位
 * @param {Number|String} price 价格
 * @param {String} currency 价格单位
 * @return {String} 如果入参带单位，则返回原值，
 *                  如果带小数点无单位,则拼上单位返回，
 *                  如果无小数点无单位，则除以100留两位小数，并拼上单位返回
 */
const transformPrice = (price, currency = "¥") => {
  if (/^\d+$/.test(price)) {
    return currency + (parseInt(price, 10) / 100).toFixed(2);
  } else if (/^\d+\.\d+$/.test(price)) {
    return currency + parseFloat(price).toFixed(2);
  } else {
    return price;
  }
};

/**
 * @description 转换价格，不拼上价格单位
 * @param {Number|String} price 价格
 * @param {String} currency 价格单位
 * @return {String} 如果入参带单位，则返回原值，
 *                  如果带小数点无单位,则拼上单位返回，
 *                  如果无小数点无单位，则除以100留两位小数，并拼上单位返回
 */
const transformPriceNumber = (price: string): string => {
  if (/^\d+$/.test(price)) {
    return (parseInt(price, 10) / 100).toFixed(2);
  } else if (/^\d+\.\d+$/.test(price)) {
    return parseFloat(price).toFixed(2);
  } else {
    let priceArr = price.match(/(\d+(\.\d+)?)/gi);
    return priceArr && priceArr.length > 0 ? priceArr[0] : "";
  }
};

/**
 * @description  时间戳格式化函数
 * @param {Number ｜ Object} time   时间戳 或 日期实例
 * @param {String} format 描述日期格式的字符串
 * @return {String} 返回按照指定格式格式化后的字符串
 */

const formatDate = (
  time: number | string | object,
  format: string = "YYYY/MM/DD"
): string => {
  let date: Date;
  if (time instanceof Date) {
    date = time;
  } else if (time !== 0 && time.toString().length < 13) {
    time = +time * 1000;
    date = new Date(time);
  } else {
    throw Error("参数 time" + time + "格式有误");
  }
  const year = date.getFullYear().toString();
  const month = date.getMonth() + 1; //月份是从0开始的
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const prefix = Array.apply(null, Array(10)).map(
    (index: number) => "0" + index
  );

  let newTime = format
    .replace(/YYYY/g, year)
    .replace(/MM/g, prefix[month] || month)
    .replace(/DD/g, prefix[day] || day)
    .replace(/hh/g, prefix[hour] || hour)
    .replace(/mm/g, prefix[min] || min)
    .replace(/ss/g, prefix[sec] || sec);
  return newTime;
};

const throttle = (func: Function, wait: number, options: any): Function => {
  let context: any, args: any, result: any;
  let timeout: any = null;
  let previous = 0;
  if (!options) options = {};
  let later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;

  const later = function() {
    const last = Date.now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = Date.now();
    let callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

export default {
  transformPriceNumber,
  transformPrice,
  formatDate,
  throttle,
  debounce
};
