<template>
  <view class="cp-wrapper">
    <video :src="video.playURL" id="myVideo" class="cp-player" direction="90">
      <!-- <view class="full" @click="full"></view> -->
    </video>
    <view class="cp-info flex f-fd-r f-jc-sb c-fff">
      <text class="buy">{{courseInfo.courseSales || 0}} 人已购</text>
      <view @tap="handleShare">
        <button class="btn" open-type="share" ><text class="f-40 iconfont icon-share1" style="margin-right: 10px"></text> {{courseInfo.relayNum || 0}}</button>
      </view>
      <!-- <view class=""><text class="red iconfont icon-like1"></text> {{courseInfo.courseStars || 0}}</view> -->
    </view>
    <image class="cp-poster" :src="courseInfo.poster"></image>
    <view class="cp-btn flex f-jc-c f-ai-c" v-if="source > 1">
      <view class="s-btn" @tap="buyCourse"><text class="sig">¥</text> {{courseInfo.coursePrice || 0}}元购买课程</view>
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
      playId: '',
      courseInfo: {}
    };
  },
  onLoad: function (options) {
    console.log(options);
    // "755e07bcee834344b956ac00a6e1a7dd"
    const source = +options.source || 0
    const playId = options.playId || ''
    const courseId = +options.courseId || 0
    const relayNum = +options.relayNum || 0
    const coursePrice = +options.coursePrice || 0
    this.courseInfo = {
      courseId: +options.courseId || 0,
      courseStars: +options.stars || 0,
      courseSales: +options.sales || 0,
      poster: options.poster || '',
      coursePrice: coursePrice,
      relayNum: +options.relayNum || 0
    }
    this.source = source

    console.log(source);

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
    handleShare(){
      console.log(this.courseInfo);
      const id = this.courseInfo.courseId || 0
      const relayNum = this.courseInfo.relayNum || 0
      if(!id) return;
      API.updateRelay({
        courseId: id,
        relayNum
      }).then(res => {
        console.log(res);
        this.courseInfo.relayNum = relayNum + 1
      })
    },
    buyCourse(){
      console.log(this.course);
      API.getPayInfo({
        courseId: this.course.courseId
      }).then(res => {
        console.log(res);
        const result = res?.data?.data || {}
        result.package = result.packageStr
        Taro.requestPayment({
          ...result,
          success: response => {
            Taro.showToast({
              title: "购买成功！",
              icon: "none"
            })
            setTimeout(() => {
              Taro.switchTab({
                url: '/pages/mycourse/index'
              })
            }, 2000)
          },
          fail: () => {
            Taro.showToast({
              title: "支付失败！",
              icon: "none"
            })
          }
        })
        
      })
    },
    getPlayInfo(playId){
      API.getVideoPlayInfo({
        isTry: false,
        videoPlayId: playId
      }).then(res => {
        this.video = res.data.data || {}
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
    },
    full(){
      console.log(1);
      this.videoContext.requestFullScreen({direction: -90})
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
    position: relative;
    .full{
      position: absolute;
      width: 80px;
      height: 80px;
      right: 0;
      bottom: 0;
      background-color: red;
      z-index: 9999;
    }
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
.f-40{
  font-size: 40px;
  margin-left: 8px;
}
.btn{
  background-color: transparent;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: #fff;
  &::after{
    border: none;
  }
}
.full{
  position: absolute;
}
</style>