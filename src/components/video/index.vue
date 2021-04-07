<template>
  <view class="video-wrapper flex f-ai-c f-jc-c">
    <view class="operation">
      <view class="operate" @tap="handleAction('share')">
        <text class="operate-icon iconfont icon-share"></text>
        <view class="operate-desc">123</view>
      </view>
      <view class="operate" @tap="handleAction('like')">
        <text class="operate-icon iconfont icon-like1" v-if="isStar"></text>
        <text class="operate-icon iconfont icon-like" v-else></text>
        <view class="operate-desc">{{video.courseStars}}</view>
      </view>
      <view class="operate" @tap="handleAction('similar')">
        <text class="operate-icon iconfont icon-similar big"></text>
        <view class="operate-desc">同类</view>
      </view>
      <view class="operate" @tap="handleAction('fullscreen')">
        <text class="operate-icon iconfont icon-full"></text>
        <view class="operate-desc">全屏</view>
      </view>
    </view>
    <view class="video">
      <video-play :video="video" :full="full"></video-play>
    </view>
    <view class="video-info flex f-fd-r">
      <view class="base-info">
        <view class="video-desc">
          <view class="title">课程介绍</view>
          <view class="introduction">{{video.courseIntro}}</view>
        </view>
        <view class="buy-info flex f-fd-r f-ai-b">
          <view class="buy-btn" @tap="buyCourse">购买课程</view>
          <view class="buy-price">
            <text class="price">{{this.currency(video.coursePrice)}}</text>
            <text class="yuan">元</text>
          </view>
          <view class="buy-users">{{video.courseSales}} | 已购</view>
        </view>
      </view>
      <view class="teacher-info">
        <view class="avatar">
          <image :src="video.teacherAvatar"></image>
        </view>
        <view class="info">
          <view class="info-desc">讲师：{{video.teacherName}}</view>
          <view class="info-desc">播放：9000</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Taro from "@tarojs/taro";
import Index from "./index";
import Mixins from "../../Mixins";
import VideoPlay from "../videoPlay/index.vue";
import API from "../../utils/api";
export default Vue.extend({
  name: "video-window",
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isStar: false,
      full: false
    };
  },
  created(){
    this.getIsStar()
  },
  methods: {
    buyCourse(){
      API.getPayInfo({
        courseId: this.video.id
      }).then(res => {
        console.log(res);
      })
    },
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
          Taro.navigateTo({ url: "/pages/similar/index?courseId=" + this.video.id});
          break;
        case "fullscreen":
          this.full = true
          break;
        default:
      }
    },

    getIsStar(){
      API.getIsStar({courseId: this.video.id}).then(res => {
        console.log(res);
        this.isStar = res.data.data
      })
    },

    handleLike() {
      // const videoId = this.videoId;
      const {id, courseStars} = this.video;
      API.starCourse({
        courseId: id,
        courseStars
      }).then(res => {
        console.log(res);
      })
    },

    handleShare() {},
  },
  components: {VideoPlay},
  mixins: [Index, Mixins],
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
        font-size: 50px;
        font-weight: bold;
        &.big{
          font-size: 80px;
        }
        &.icon-like1{
          color: red;
        }
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
        image{
          width: 120px;
          height: 120px;
          display: inline-block;
        }
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