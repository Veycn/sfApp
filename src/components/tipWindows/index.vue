<template>
  <view class="t-container">
    <view class="t-wrap">
      <view
        class="tip-logo"
        @tap="handleExitModal"
      >
        <image
          mode="widthFix"
          src="https://www.shenfu.online/pic/icon/exit2.png"
        />
      </view>
      <view class="tip-text">
        * 需要选中科目、教材和版本
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  props: {
    exitModal: Function
  },
  methods: {
    handleExitModal() {
      this.exitModal && this.exitModal();
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.t-container .t-wrap {
  width: 500px;
  height: 254px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fff;
  position: relative;
}
.t-container .t-wrap .tip-logo {
  width: 100%;
  height: 81px;
  background-color: #2b2b2b;
  position: relative;
}
.t-container .t-wrap .tip-logo image {
  width: 52px;
  position: absolute;
  top: 14px;
  right: 19px;
}
.t-container .t-wrap .tip-text {
  position: absolute;
  left: 33px;
  bottom: 109px;
  color: #ff0000;
  font-size: 32px;
}
</style>