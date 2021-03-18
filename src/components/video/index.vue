<template>
  <view class="video-wrapper">
    <view class="operation">
      <view class="operate" @tap="handleAction('like')">
        <view class="operate-icon">1</view>
        <view class="operate-desc">123</view>
      </view>
      <view class="operate" @tap="handleAction('share')">
        <view class="operate-icon">2</view>
        <view class="operate-desc">123</view>
      </view>
      <view class="operate" @tap="handleAction('similar')">
        <view class="operate-icon">3</view>
        <view class="operate-desc">同类</view>
      </view>
      <view class="operate" @tap="handleAction('fullscreen')">
        <view class="operate-icon">4</view>
        <view class="operate-desc">全屏</view>
      </view>
    </view>
    <view class="video">
      <video class="context"></video>
    </view>
    <view class="video-info flex f-fd-r">
      <view class="base-info">
        <view class="video-desc">
          <view class="title">课程介绍</view>
          <view class="introduction"
            >一元一次方程详解：只含有一个未知数，且未知数的高次数是1等号两面都是整式，这样的方程叫做一元一次方程。</view
          >
        </view>
        <view class="buy-info flex f-fd-r f-ai-b">
          <view class="buy-btn">购买课程</view>
          <view class="buy-price">
            <text class="price">0.9</text>
            <text class="yuan">元</text>
          </view>
          <view class="buy-users">890 | 已购</view>
        </view>
      </view>
      <view class="teacher-info">
        <view class="avatar"></view>
        <view class="info">
          <view class="info-desc">讲师：张可</view>
          <view class="info-desc">播放：9000</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "",
  data() {
    return {
      didimg1: "../../assets/pic/paper1.png",
      didimg2: "../../assets/pic/paper2.png",
      didimg3: "../../assets/pic/paper3.png",
      didimg4: "../../assets/pic/paper4.png",
      nodidimg: "../../assets/pic/paper0.png",
      status: 0,
    };
  },
  methods: {
    // 判断status
    toExam(e) {
      let { knowledgepointid, examid, submitstatus } = e.currentTarget.dataset;
      if (submitstatus === 0) {
        Taro.navigateTo({
          url: `/pages/exam/index?examId=${examid}`,
        });
      } else {
        Taro.navigateTo({
          url: `/pages/points/index?knowledgepointid=${knowledgepointid}&&examId=${examid}`,
        });
      }
    },
  },
};
</script>

<style lang="less">
.sec-wrap {
  width: 706rpx;
  height: 200rpx;
  margin: 3rpx auto 0;
  border-radius: 10rpx;
  background-color: #fff;
  position: relative;
}
.sec-chapter {
  position: absolute;
  height: 40rpx;
  width: 100%;
  top: 24rpx;
  left: 0;
  display: flex;
  align-items: center;
}
.sec-top {
  width: 84rpx;
  height: 40rpx;
  line-height: 40rpx;
  background-color: rgb(24, 219, 155);
  border-radius: 6rpx;
  color: #fff;
  font-size: 20rpx;
  font-family: "PingFang-SC-Regular";
  text-align: center;
}
.scroll-view {
  white-space: nowrap;
  width: 580rpx;
  overflow: auto;
}
.sec-name {
  display: inline-block;
  margin-left: 30rpx;
  font-size: 38rpx;
}
.sec-ratio {
  display: inline-block;
  margin-left: 30rpx;
  font-size: 20rpx;
}
.scroll {
  position: absolute;
  bottom: 36rpx;
  left: 62rpx;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.test-papers {
  width: 586rpx;
  height: 74rpx;
  white-space: nowrap;
}
.test-item {
  width: 65rpx;
  height: 73rpx;
  position: relative;
  display: inline-block;
}
.test-item-nofirst {
  width: 65rpx;
  height: 73rpx;
  margin-left: 99rpx;
  position: relative;
  display: inline-block;
}
.test-item .image,
.test-item-nofirst .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 65rpx;
  height: 73rpx;
}
.test-papers .paper-name {
  position: absolute;
  top: 9rpx;
  left: 2rpx;
  font-size: 24rpx;
  height: 73rpx;
  width: 32rpx;
  color: #fff;
  white-space: pre-wrap;
}
.nopaper-name {
  position: absolute;
  font-size: 24rpx;
  height: 73rpx;
  line-height: 73rpx;
  width: 60rpx;
  text-align: center;
}
</style>