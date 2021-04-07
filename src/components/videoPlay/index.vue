<template>
  <view class="video-play">
    <view class="video-content">
      <video :id="'sf_v'+video.id" :src="playUrl" class="video"></video>
      <!-- <view class="poster" v-show="showPlay">
        <image class="img" :src="video.courseCoverUrl"></image>
        <image class="play"  :src="playImg" @tap="playVideo"></image>
      </view> -->
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import playImg from '../../assets/icon/play.png';
import API from '../../utils/api';
export default {
  name: "VideoPlay",
  props: {
    video: {
      type: Object,
      default: () => {}
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      playImg,
      playUrl: '',
      showPlay: true
    }
  },
  created(){
    const {isPurchase, ossVideoId = '', id} = this.video;
    this.videoContext = Taro.createVideoContext('sfv_'+this.video.id)
    const isTry = isPurchase ? false : true;
    API.getVideoPlayInfo({
      isTry: false,
      videoPlayId: ossVideoId
    }).then(res => {
      console.log(res);
      res = res.data.data;
      this.playUrl = res.playURL
    })
  },
  methods: {
    
    playVideo(){
      this.videoContext.play();
      this.showPlay = false;
    }
  },
  watch: {
    full(n, c){
      console.log(n,c);
      if(n){
        console.log(this.videoContext);
        this.videoContext.requestFullScreen({direction: 0})
      }
    }
  }
}
</script>

<style lang="less">
.video-play{
  width: 750px;
  .video-content{
    position: relative;
    .video{
      width: 750px;
      height: 514px;
    }
    .poster{
      width: 750px;
      height: 514px;
      position: absolute;
      left: 0;
      top: 0;
      .img{
        width: 750px;
        height: 514px;
      }
      .play{
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>