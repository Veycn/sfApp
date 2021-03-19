<template>
  <view class="point-wrapper" @tap="onTap">
    <view class="tag" :style="{ background: color }"></view>
    <view class="head">
      <text class="title">{{ pointName }}</text>
      <text class="status">{{ status }}</text>
    </view>
    <view class="process">
      <block v-if="level === 0">
        <view class="s-default"></view>
        <view class="s-default"></view>
        <view class="s-default"></view>
      </block>
      <block v-else-if="level === 1">
        <view class="s-active"></view>
        <view class="s-default"></view>
        <view class="s-default"></view>
      </block>
      <block v-else-if="level === 2">
        <view class="s-active"></view>
        <view class="s-active"></view>
        <view class="s-default"></view>
      </block>
      <block v-else>
        <view class="s-active"></view>
        <view class="s-active"></view>
        <view class="s-active"></view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro';
export default {
  data() {
    return {
      listNum: ["", "", ""],
    };
  },
  props: {
    pointName: String,
    status: String,
    color: String,
    level: Number,
    rightList: Array,
    id: Number
  },
  methods: {
    onTap() {
      Taro.eventCenter.trigger("pointTap", {id: this.$props.id});
    },
  },
};
</script>

<style lang="less">
.point-wrapper {
  width: 100%;
  height: 150rpx;
  background: #fff;
  border-radius: 10rpx;
  position: relative;
  box-sizing: border-box;
  padding: 20rpx 30rpx 20rpx 116rpx;
  margin-bottom: 10rpx;
}

.point-wrapper .tag {
  width: 84rpx;
  height: 38rpx;
  background: #ccc;
  border-radius: 4rpx;
  position: absolute;
  left: -10rpx;
  top: 26rpx;
}

.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.head .title {
  width: 400rpx;
  font-size: 36rxp;
  color: #1c1b1b;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.head .status {
  font-size: 20rpx;
  color: #999;
}

.process {
  width: 100%;
  height: 60rpx;
  display: flex;
  align-items: center;
}
.process > .s-default {
  width: 100rpx;
  height: 6rpx;
  background: #ececec;
  margin-right: 10rpx;
  border-radius: 3rpx;
}
.s-active {
  width: 100rpx;
  height: 6rpx;
  background: rgb(85, 255, 177);
  margin-right: 10rpx;
  border-radius: 3rpx;
}
</style>