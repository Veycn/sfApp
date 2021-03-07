<template>
  <view class="t-container">
    <view class="wrap">
      <view class="tip-logo" bindtap="exitModal"
        ><image mode="widthFix" src="../../assets/icon/exit2.png"></image
      ></view>
      <view class="tip-text">* 需要选中科目、教材和版本</view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  methods: {
    exitModal() {
      this.triggerEvent("exitModal");
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
  width: 500rpx;
  height: 254rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin: 557rpx auto;
  background-color: #fff;
  position: relative;
}
.t-container .wrap .tip-logo {
  width: 100%;
  height: 81rpx;
  background-color: #2b2b2b;
  position: relative;
}
.t-container .wrap .tip-logo image {
  width: 52rpx;
  position: absolute;
  top: 14rpx;
  right: 19rpx;
}
.t-container .wrap .tip-text {
  position: absolute;
  left: 33rpx;
  bottom: 109rpx;
  color: #ff0000;
  font-size: 36rpx;
}
</style>