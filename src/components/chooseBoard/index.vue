<template>
  <view class="wrapper">
    <view class="tag" :style="{ background: activeColor }"></view>
    <view class="title">
      <text class="text">{{ tagName }}</text>
    </view>
    <view class="content">
      <block v-for="(item, index) in renderList" :key="index">
        <view
          class="item"
          @tap="itemChoosed"
          :style="{ background: activeIndex === index ? activeColor : '#ccc' }"
          :data-item="item"
          :data-index="index"
          >{{ item[type] }}</view
        >
      </block>
      <block v-if="type === 'grade'">
        <view class="item" @tap="showTip">高二</view>
        <view class="item" @tap="showTip">高三</view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  props: {
    tagName: String,
    renderList: Array,
    type: String,
    activeColor: String,
  },
  data() {
    return {
      activeIndex: -1,
    };
  },

  methods: {
    itemChoosed(e) {
      let { item, index } = e.currentTarget.dataset;
      this.setData({
        activeIndex: index,
      });
      this.triggerEvent("tagBeChoosed", { item, index });
    },
    showTip() {
      Taro.showToast({
        icon: "none",
        title: "敬请期待!",
      });
    },
  },
};
</script>

<style lang="less">
.wrapper {
  width: 700rpx;
  min-height: 270rpx;
  background: #fff;
  border-radius: 10rpx;
  margin: 0 auto;
  margin-bottom: 25rpx;
  position: relative;
  box-sizing: border-box;
  padding: 32rpx 0rpx 0;
  border: 1px;
}

.wrapper .tag {
  width: 84rpx;
  height: 40rpx;
  background: royalblue;
  position: absolute;
  left: -10rpx;
  top: 45rpx;
}
.wrapper .title {
  padding-left: 120rpx;
}
.wrapper .title .text {
  font-size: 48rpx;
  font-weight: bold;
  color: rgba(28, 27, 27, 1);
}

.content {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20rpx 50rpx;
  display: flex;
  white-space: normal;
  flex-wrap: wrap;
}

.content .item {
  display: inline-block;
  min-width: 132rpx;
  height: 60rpx;
  background: #ccc;
  text-align: center;
  box-sizing: border-box;
  font-size: 21rpx;
  line-height: 60rpx;
  margin: 0 20rpx 25rpx 20rpx;
  border-radius: 4rpx;
  padding: 0 10rpx;
  color: #fff;
}
</style>