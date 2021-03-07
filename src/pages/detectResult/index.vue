<template>
  <view class="p-wrapper">
    <view class="drw">
      <s-detectResult
        resultArr="{{resultArr}}"
        point-number="{{4}}"
        title-list="{{titleList}}"
        class="dr"
      />
      <view class="line"></view>
    </view>
    <view class="recommand">
      <image
        src="https://www.shenfu.online/pic/customize.png"
        class="img"
        mode="widthFix"
        bindtap="toCourse"
      />
      <view class="exit" bindtap="exit">退 出</view>
    </view>
  </view>
</template>

<script>
import DetectResult from "../../components/detectResult/index.vue";

export default {
  name: "Detect",
  data() {
    return {
      titleList: [
        "本次测试题目数",
        "本次测试正确率",
        "本次测试正确题目",
        "花费时间",
      ],
      resultArr: [],
    };
  },
  onLoad: function (options) {
    console.log(options.data);
    let arr = this.data.resultArr;
    let { ratio, rightNum, useTime, submitNum } = JSON.parse(options.data);

    arr.push(`${submitNum}题`);
    arr.push(`${isNaN(ratio) ? 0 : ratio.toFixed(2) * 100}%`);
    arr.push(`${rightNum}题`);
    let m = Math.floor(useTime / 60);
    let s = useTime % 60;
    arr.push(`${m}分${s}秒`);
    this.setData({
      resultArr: arr,
    });
    console.log(arr);
  },

  methods: {
    exit() {
      wx.switchTab({ url: "/pages/detect/index" });
    },
    toCourse() {
      app.globalData.hascustomize = true;
      wx.switchTab({ url: "/pages/customize/index" });
    },
  },
  components: {
    DetectResult,
  },
};
</script>

<style lang="less">
.p-container {
  width: 100%;
  height: 100%;
  background: rgb(240, 242, 245);
}

page {
  background-color: rgb(240, 242, 245);
}

.swiper {
  height: 296rpx;
  width: 100%;
}
.swiper-item {
  height: 296rpx;
  width: 100%;
  line-height: 296rpx;
  text-align: center;
}
.banner {
  width: 100%;
  height: 294rpx;
}

.banner > .ba {
  width: 100%;
  height: 100%;
}

.header {
  background: #fff;
}

.header .chapter {
  box-sizing: border-box;
  padding: 40rpx 78rpx 10rpx;
  position: relative;
  background-image: url("https://www.shenfu.online/pic/Image.png");
  background-repeat: no-repeat;
  background-size: 120rpx 74rpx;
  background-position: 38rpx 40rpx;
}

.header .chapter .img {
  width: 120rpx;
  height: 74rpx;
  vertical-align: middle;
  position: absolute;
  left: 40rpx;
  z-index: -1;
}

.lbt {
  width: 100%;
  height: 296rpx;
}

.header .chapter .txt {
  font-weight: bold;
  font-size: 48rpx;
  padding-bottom: 20rpx;
}

.header .chapter .txt .down {
  width: 31rpx;
  height: 31rpx;
  margin-left: 17rpx;
}

.header .chapter .tip {
  font-size: 24rpx;
  color: #1c1b1b;
}
.scroll {
  width: 588rpx;
  margin: auto;
}
.scroll .scroller {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
}

.scroll .scroller .item {
  display: inline-block;
  height: 100%;
  text-align: center;
  margin-right: 90rpx;
  font-size: 30rpx;
  font-weight: bold;
  box-sizing: border-box;
  padding-top: 24rpx;
  border-bottom: 1px solid transparent;
}

.scroll .scroller .item._active {
  color: #24dd88;
  border-bottom: 1px solid #24dd88;
}

.p-container .section-list {
  width: 710rpx;
  margin: 20rpx auto;
  background-color: rgb(240, 242, 245);
  padding-bottom: 20rpx;
}

.p-container .section-list .sec-wraps {
  width: 705rpx;
  margin: 0 auto 15rpx;
}

.slide-image {
  width: 100%;
  height: 100%;
}
</style>
