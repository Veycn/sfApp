<template>
  <view class="cp-wrapper">
    <video :src="video.playURL" id="myVideo" class="cp-player"></video>
    <view class="cp-info flex f-fd-r f-jc-sb c-fff">
      <text class="buy">{{course.courseSales || 0}} 人已购</text>
      <view class=""><text class="red iconfont icon-like1"></text> {{course.courseStars || 0}}</view>
    </view>
    <image class="cp-poster" :src="poster"></image>
    <view class="cp-btn flex f-jc-c f-ai-c" v-if="source != 1">
      <view class="s-btn" @tap="buyCourse"><text class="sig">¥</text> {{course.coursePrice || 0}}元购买课程</view>
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
      course: {},
      source: '',
      sales: 0,
      stars: 0,
      price: 0,
      poster: null,
      videoContext: null,
      playId: ''
    };
  },
  onLoad: function (options) {
    console.log(options);
    // "755e07bcee834344b956ac00a6e1a7dd"
    const source = +options.source || 0
    const playId = options.playId || ''
    const courseId = +options.courseId || 0
    this.courseInfo = {
      courseId: +options.courseId || 0,
      courseStars: +options.stars || 0,
      courseSales: +options.sales || 0,
      poster: options.poster || '',
      coursePrice: +options.price || 0
    }

    if(source === 1){
      this.getPlayInfo(playId)
    }
    // 直播跳过来的
    if(source === 2){
      if(!courseId){
        return Taro.navigateBack()
      }
      this.getLiveDetail(courseId)
    }
  },
  onShow() {},
  methods: {
    buyCourse(){
      console.log(this.course);
      API.getPayInfo({
        courseId: this.course.courseId
      }).then(res => {
        console.log(res);
        Taro.showToast({
          title: "购买成功！",
          icon: "none"
        })
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/mycourse/index'
          })
        }, 2000)
      })
    },
    getPlayInfo(playId){
      API.getVideoPlayInfo({
        isTry: false,
        videoPlayId: playId
      }).then(res => {
        this.video = res.data.data
        this.videoContext = Taro.createVideoContext("myVideo");
        this.videoContext.play();
      })
    },
    getLiveDetail(courseId){
      API.getLiveDetail({
        courseId
      }).then(res => {
        const courseInfo = res?.data?.data;
        this.course = courseInfo;
        if(!courseInfo.ossVideoId) return;
        this.getPlayInfo(courseInfo.ossVideoId)
      })
    }
  },
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