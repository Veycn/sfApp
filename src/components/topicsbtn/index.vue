<template>
  <scroll-view scroll-y="true" class="container">
    <block wx:for="{{ scantronList }}" wx:key="index">
      <view
        bindtap="rediretTopic"
        data-index="{{index}}"
        class="default {{ isFinshed[index] > -1 ? 'active' : 'init' }}"
        >{{ index + 1 }}</view
      >
    </block>
  </scroll-view>
</template>

<script lang="ts">
export default {
  methods: {
    rediretTopic(e) {
      let currentIndex = e.currentTarget.dataset.index;
      this.triggerEvent("rediretTopic", { currentIndex });
    },
    onClose() {
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
  width: 100%;
  height: 490rpx;
  box-sizing: border-box;
  padding: 0 50rpx;
  margin-top: 39rpx;
}
.container .default {
  display: inline-block;
  width: 104rpx;
  text-align: center;
  border-radius: 50%;
  font-size: 30rpx;
  line-height: 104rpx;
  margin-left: 67rpx;
  margin-bottom: 46rpx;
  font-family: "Adobe Heiti Std R";
  border: 1px solid rgba(230, 230, 230, 1);
}
.container .default:nth-child(4n + 1) {
  margin-left: 0;
}
.init {
  background-color: #ffffff;
  color: #626262;
}

.active {
  background-color: #15da7f;
  color: #ffffff;
}
.tip {
  width: 400rpx;
  line-height: 60rpx;
  background-color: rgb(21, 236, 137);
  border-radius: 30rpx;
  margin: 60rpx auto 30rpx;
  text-align: center;
  color: #fff;
  font-size: 30rpx;
}
</style>