<template>
  <view class="p-wrapper">
    <view class="drw">
      <s-detectResult
        :resultArr="resultArr"
        :point-number="4"
        :title-list="titleList"
        class="dr"
      />
      <view class="line"></view>
    </view>
    <view class="recommand">
      <image
        src="https://www.shenfu.online/pic/customize.png"
        class="img"
        mode="widthFix"
        @tap="toCourse"
      />
      <view class="exit" @tap="exit">退 出</view>
    </view>
  </view>
</template>

<script>
import DetectResult from "../../components/detectResult/index.vue";
import Taro from "@tarojs/taro";

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
    let arr = this.resultArr;
    let { ratio, rightNum, useTime, submitNum } = JSON.parse(options.data);

    arr.push(`${submitNum}题`);
    arr.push(`${isNaN(ratio) ? 0 : ratio.toFixed(2) * 100}%`);
    arr.push(`${rightNum}题`);
    let m = Math.floor(useTime / 60);
    let s = useTime % 60;
    arr.push(`${m}分${s}秒`);
    this.resultArr = arr;
    console.log(arr);
  },

  methods: {
    exit() {
      Taro.switchTab({ url: "/pages/detect/index" });
    },
    toCourse() {
      app.globalData.hascustomize = true;
      Taro.switchTab({ url: "/pages/customize/index" });
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
  height: 296px;
  width: 100%;
}
.swiper-item {
  height: 296px;
  width: 100%;
  line-height: 296px;
  text-align: center;
}
.banner {
  width: 100%;
  height: 294px;
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
  padding: 40px 78px 10px;
  position: relative;
  background-image: url("https://www.shenfu.online/pic/Image.png");
  background-repeat: no-repeat;
  background-size: 120px 74px;
  background-position: 38px 40px;
}

.header .chapter .img {
  width: 120px;
  height: 74px;
  vertical-align: middle;
  position: absolute;
  left: 40px;
  z-index: -1;
}

.lbt {
  width: 100%;
  height: 296px;
}

.header .chapter .txt {
  font-weight: bold;
  font-size: 48px;
  padding-bottom: 20px;
}

.header .chapter .txt .down {
  width: 31px;
  height: 31px;
  margin-left: 17px;
}

.header .chapter .tip {
  font-size: 24px;
  color: #1c1b1b;
}
.scroll {
  width: 588px;
  margin: auto;
}
.scroll .scroller {
  width: 100%;
  height: 100px;
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
  margin-right: 90px;
  font-size: 30px;
  font-weight: bold;
  box-sizing: border-box;
  padding-top: 24px;
  border-bottom: 1px solid transparent;
}

.scroll .scroller .item._active {
  color: #24dd88;
  border-bottom: 1px solid #24dd88;
}

.p-container .section-list {
  width: 710px;
  margin: 20px auto;
  background-color: rgb(240, 242, 245);
  padding-bottom: 20px;
}

.p-container .section-list .sec-wraps {
  width: 705px;
  margin: 0 auto 15px;
}

.slide-image {
  width: 100%;
  height: 100%;
}
</style>
