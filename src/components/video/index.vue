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
          <view class="introduction">一元一次方程详解：只含有一个未知数，且未知数的高次数是1等号两面都是整式，这样的方程叫做一元一次方程。</view>
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
import Vue from "vue";
import Taro from "@tarojs/taro";
import Mixins from "./index";
export default Vue.extend({
  name: "video-window",
  data() {
    return {};
  },
  methods: {
    handleAction(type: string): void {
      switch (type) {
        case "like":
          this.handleLike();
          break;
        case "share":
          console.log("share");
          this.handleShare();
          break;
        case "similar":
          Taro.navigateTo({ url: "pages/similar/index?" });
          break;
        case "fullscreen":
          break;
        default:
      }
    },

    handleLike() {
      // const videoId = this.videoId;
    },

    handleShare() {},
  },
  mixins: [Mixins],
});
</script>

<style lang="less">
.video-wrapper {
  position: relative;
  height: 100%;
  background-color: #000;
  .operation {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 36px;
    z-index: 1000;
    .operate {
      text-align: center;
      margin-top: 40px;
      color: #fff;
      .operate-icon {
        width: 50px;
        height: 50px;

      }
      .operate-desc {
        font-size: 20px;
      }
    }
  }
  .video {
    .context {
      min-width: 750px;
      min-height: 514px;
    }
  }
  .video-info{
    position: absolute;
    bottom: 0;
    padding: 20px 20px 36px 40px;
    color: #fff;
    .base-info{
      .video-desc{
        .title{
          font-size: 30px;
          font-weight: bold;
        }
        .introduction{
          margin-top: 12px;
          font-size: 20px;
          color: #fefefe;
          font-weight: 400;
        }
      }
      .buy-info{
        margin-top: 42px;
        .buy-btn{
          width: 200px;
          height: 50px;
          background-color: #15EC89;
          border-radius: 10px;
          text-align: center;
          line-height: 50px;
          font-size: 30px;
          font-weight: bold;
          color: #000;
        }
        .buy-price{
          font-size: bold;
          color: #17E871;
          margin-left: 38px;
          align-self: flex-end;
          height: 50px;
          .price{
            font-size: 48px;
          }
          .yuan{
            font-size: 24px;
          }
        }
        .buy-users{
          margin-left: 42px;
          font-size: 20px;
          font-weight: 400;
          align-self: flex-end;
          position: relative;
          top: 6px;
        }
      }
    }
    .teacher-info{
      margin-left: 56px;
      width: 120px;
      font-size: 20px;
      color: #fff;
      .avatar{
        width: 120px;
        height: 120px;
        border: 1px solid #fff;
      }
      .info{
        .info-desc{
          margin-top: 10px;
        }
      }
    }
  }
}
</style>