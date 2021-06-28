<template>
  <view
    class="container"
    :animation="modalAnimation"
  >
    <view
      class="content"
      :animation="btnAnimation"
    >
      <view
        class="exit"
        @tap="onClose"
      >
        答题卡
        <image
          class="img"
          src="https://www.shenfu.online/pic/icon/exit_pic.png"
        />
      </view>
      <slot name="scantron" />
      <view
        class="tip"
        @tap="watchResult"
      >
        交卷并查看结果
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro";
export default {
  props: {
    isSubmit: Function,
    hideAnswerCard: Function
  },
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
      this.btnAnimation = hideBtnAnimation.export();
    },
    hModalAnimation() {
      let hideModalAnimation = Taro.createAnimation({
        duration: 300,
      });
      hideModalAnimation.opacity(0).step();
      this.modalAnimation = hideModalAnimation.export();
    },
    // 关闭答题卡页面
    onClose() {
      this.hBtnAnimation();
      this.hModalAnimation();
      setTimeout(() => {
        this.hideAnswerCard && this.hideAnswerCard();
      }, 300);
    },
    // 提交并查看结果
    watchResult() {
      this.isSubmit && this.isSubmit();
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
  height: 800px;
  background: #fff;
  position: absolute;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 999;
}
.exit {
  line-height: 110px;
  position: relative;
  text-align: center;
  color: #fff;
  background-color: rgba(43, 43, 43, 1);
  font-size: 36px;
}
.exit .img {
  position: absolute;
  right: 28px;
  top: 32px;
  width: 50px;
  height: 50px;
}

.btn {
  position: absolute;
  bottom: 39px;
  left: 50%;
  transform: translateX(-50%);
}
.tip {
  width: 516px;
  line-height: 78px;
  background-color: rgb(21, 236, 137);
  border-radius: 36px;
  text-align: center;
  color: #fff;
  font-size: 30px;
  font-family: "PingFang-SC-Regular";
  position: absolute;
  bottom: 75px;
  left: 115px;
}
</style>