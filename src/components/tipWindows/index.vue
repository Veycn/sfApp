<template>
  <view class="t-container">
    <view class="wrap">
      <view class="tip-logo" @tap="exitModal"
        ><image mode="widthFix" src="../../assets/icon/exit2.png"></image
      ></view>
      <view class="tip-text">* 需要选中科目、教材和版本</view>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro";
export default {
  methods: {
    exitModal() {
      Taro.eventCenter.trigger("exitModal");
    },
  },
};
</script>

<style lang="less">
.t-container {
  width: 100%;
  height: 100%;
  background-color: rgba(30, 29, 29, 0.5);
  position: fixed;
  top: 0;
}
.t-container .wrap {
  width: 500px;
  height: 254px;
  border-radius: 20px;
  overflow: hidden;
  margin: 557px auto;
  background-color: #fff;
  position: relative;
}
.t-container .wrap .tip-logo {
  width: 100%;
  height: 81px;
  background-color: #2b2b2b;
  position: relative;
}
.t-container .wrap .tip-logo image {
  width: 52px;
  position: absolute;
  top: 14px;
  right: 19px;
}
.t-container .wrap .tip-text {
  position: absolute;
  left: 33px;
  bottom: 109px;
  color: #ff0000;
  font-size: 36px;
}
</style>