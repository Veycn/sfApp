<template>
  <view class="cp-wrapper">
    <video :src="video.playURL" id="myVideo" class="cp-player"></video>
    <view class="cp-info flex f-fd-r f-jc-sb c-fff">
      <text class="buy">{{sales || 0}} 人已购</text>
      <view class=""><text class="red iconfont icon-like1"></text> {{stars || 0}}</view>
    </view>
    <image class="cp-poster" :src="poster"></image>
    <view class="cp-btn flex f-jc-c f-ai-c" v-if="source != 1">
      <view class="s-btn"><text class="sig">¥</text> {{price || 0}}元购买课程</view>
    </view>
  </view>
</template>

<script>
import request from "../../utils/http";
import API from '../../utils/api'
import pointItem from "../../components/pointItem/index.vue";
import Taro from "@tarojs/taro";
const app = Taro.getApp();

export default {
  name: "CoursePlay",
  data() {
    return {
      video: {},
      source: '',
      sales: 0,
      stars: 0,
      price: 0,
      poster: null,
      videoContext: null
    };
  },
  onLoad: function (options) {
    console.log(options);
    // "755e07bcee834344b956ac00a6e1a7dd"
    this.source = +options.source || 0
    this.sales = +options.sales || 0
    this.stars = +options.stars || 0
    this.poster = options.poster
    this.price = +options.price || 0
    API.getVideoPlayInfo({
      isTry: false,
      videoPlayId: "755e07bcee834344b956ac00a6e1a7dd"
    }).then(res => {
      this.video = res.data.data
      this.videoContext = Taro.createVideoContext("myVideo");
      this.videoContext.play();
    })
  },
  onShow() {},
  methods: {},
  components: {
  },
};
</script>

<style lang="less">
.cp-wrapper{
  background-color: #000;
  position: relative;
  width: 100vw;
  height: 100vh;
  .cp-player{
    width: 750px;
    height: 420px;
  }
  .cp-info{
    padding: 20px 30px 30px;
    .red{
      font-size: 40px;
    }
  }
  .cp-poster{
    width: 750px;
  }
  .cp-btn{
    position: absolute;
    bottom: 34px;
    left: 0;
    width: 750px;
    height: 98px;
    .s-btn{
      width: 358px;
      height: 64px;
      background-color: #17e871;
      border-radius: 32px;
      text-align: center;
      line-height: 64px;
      color: #000;
    }
  }
}
</style>