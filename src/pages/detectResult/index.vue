<template>
  <view class="p-wrapper">
    <view class="drw">
      <detect-result
        :result-arr="resultArr"
        :point-number="4"
        :title-list="titleList"
        class="dr"
      />
      <view class="line" />
    </view>
    <view class="recommand">
      <image
        src="https://www.shenfu.online/pic/customize.png"
        class="img"
        mode="widthFix"
        @tap="toCourse"
      />
      <view
        class="exit"
        @tap="exit"
      >
        退 出
      </view>
    </view>
  </view>
</template>

<script>
import DetectResult from "../../components/detectResult/index.vue";
import Taro from "@tarojs/taro";

export default {
  name: "Detect",
  components: {
    DetectResult,
  },
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
    let arr = [];
    let { ratio, rightNum, useTime, submitNum } = JSON.parse(options.data);

    arr.push(`${submitNum}题`);
    arr.push(`${isNaN(ratio) ? 0 : ratio.toFixed(2) * 100}%`);
    arr.push(`${rightNum}题`);
    let m = Math.floor(useTime / 60);
    let s = useTime % 60;
    arr.push(`${m}分${s}秒`);
    this.resultArr = arr;
  },

  methods: {
    exit() {
      Taro.switchTab({ url: "/pages/detect/index" });
    },
    toCourse() {
      Taro.switchTab({ url: "/pages/customize/index" });
    },
  },
};
</script>

<style lang="less">
.p-wrapper {
  height: 100%;
}


.p-wrapper .title {
  width: 100%;
  height: 200rpx;
}


.p-wrapper .drw {
  height: 40%;
  padding-top: 120rpx;
  box-sizing: border-box;
  position: relative;
}


.p-wrapper .drw .dr {
  display: block;
}

.p-wrapper .drw  .line {
  position: absolute;
  bottom: 0;
  width: 594rpx;
  height: 2rpx;
  transform: translateX(78rpx);
  background: rgb(230, 230, 230);
}


.recommand {
  width: 100%;
  height: 60%;
  box-sizing: border-box;
  /* padding: 100rpx; */
  text-align: center;
}

.recommand > .img {
  margin-top: 75rpx;
}

.recommand .big-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 26rpx;
}

.recommand .sub-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 42rpx;

}

.recommand .custom {
  font-size: 48rpx;
  font-weight: bold;
  color: #15DA7F;
}

.recommand .exit {
  width: 215rpx;
  height: 60rpx;
  background: #15DA7F;
  border-radius: 30rpx;
  position: absolute;
  left: 50%;
  bottom: 92rpx;
  transform: translateX(-50%);
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
  line-height: 60rpx;
}

</style>
