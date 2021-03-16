<template>
  <view class="container" :animation="modalAnimation">
    <view class="content" :animation="btnAnimation">
      <view class="exit" @tap="onClose">
        答题卡
        <image class="img" src="../../assets/icon/exit_pic.png" />
      </view>
      <slot name="scantron" />
      <view class="tip" @tap="watchResult">交卷并查看结果</view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  data() {
    return {
      btnAnimation: "",
      modalAnimation: "",
    };
  },

  methods: {
    hBtnAnimation() {
      let hideBtnAnimation = Taro.createAnimation({
        duration: 300,
      });
      hideBtnAnimation.translate(0, 300).opacity(0.3).step();
      this.setData({
        btnAnimation: hideBtnAnimation.export(),
      });
    },
    hModalAnimation() {
      let hideModalAnimation = Taro.createAnimation({
        duration: 300,
      });
      hideModalAnimation.opacity(0).step();
      this.setData({
        modalAnimation: hideModalAnimation.export(),
      });
    },
    // 关闭答题卡页面
    onClose() {
      this.hBtnAnimation();
      this.hModalAnimation();
      setTimeout(() => {
        this.triggerEvent("hideAnswerCard");
      }, 300);
    },
    // 提交并查看结果
    watchResult() {
      this.triggerEvent("isSubmit");
    },
  },
};
</script>

<style lang="less">
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(121, 121, 121, 0.6);
  z-index: 999;
}
.content {
  width: 100%;
  height: 800rpx;
  background: #fff;
  position: absolute;
  bottom: 0;
  border-radius: 20rpx 20rpx 0 0;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 999;
}
.exit {
  line-height: 110rpx;
  position: relative;
  text-align: center;
  color: #fff;
  background-color: rgba(43, 43, 43, 1);
  font-size: 36rpx;
}
.exit .img {
  position: absolute;
  right: 28rpx;
  top: 32rpx;
  width: 50rpx;
  height: 50rpx;
}

.btn {
  position: absolute;
  bottom: 39rpx;
  left: 50%;
  transform: translateX(-50%);
}
.tip {
  width: 516rpx;
  line-height: 78rpx;
  background-color: rgb(21, 236, 137);
  border-radius: 36rpx;
  text-align: center;
  color: #fff;
  font-size: 30rpx;
  font-family: "PingFang-SC-Regular";
  position: absolute;
  bottom: 75rpx;
  left: 115rpx;
}
</style>