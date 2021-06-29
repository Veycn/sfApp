<template>
  <view class="video-play" >
    <view class="video-content" @tap="handleTap">
      <video
        :id="'sf_v' + video.id"
        :src="playUrl"
        class="video"
        :controls="false"
        @timeupdate="timeupdate"
      ></video>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import API from "../../utils/api";
export default {
  name: "VideoPlay",
  props: {
    video: {
      type: Object,
      default: () => {},
    },
    full: {
      type: Boolean,
      default: false,
    },
    isPlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      playUrl: "",
      showPlay: true,
      videoContext: null,
      _isPlay: false
    };
  },
  mounted() {
    this._isPlay = this.isPlay
    const { isPurchase, ossVideoId = "", id } = this.video;
    const isTry = isPurchase ? false : true;
    this.videoContext = Taro.createVideoContext('sf_v' + id, this)
    API.getVideoPlayInfo({
      isTry: false,
      videoPlayId: ossVideoId,
    }).then((res) => {
      res = res.data.data;
      this.playUrl = res.playURL;
    });
  },
  methods: {
    playVideo() {
      this.videoContext.play();
      this.showPlay = false;
    },
    timeupdate(e) {
      console.log(e);
    },
    handleTap(e){
      console.log(e);
      if(this._isPlay){
        this.videoContext.pause()
      }else{
        this.videoContext.play()
      }
    }
  },
  watch: {
    full(n, c) {
      console.log(n, c);
      if (n) {
        console.log(this.videoContext);
        this.videoContext.requestFullScreen({ direction: 0 });
      }
    },
    isPlay(n, c) {
      if (!n) {
        this.videoContext && this.videoContext.pause();
      } else {
        this.videoContext && this.videoContext.play();
      }
    },
  },
};
</script>

<style lang="less">
.video-play {
  width: 750px;
  height: 100%;
  .video-content {
    position: relative;
    width: 100%;
    height: 100%;
    .video {
      width: 100%;
      height: 100%;
      z-index: 999;
      // &.full{
      //   width: 100%;
      //   height: 100%;
      // }
    }
    .poster {
      width: 750px;
      height: 514px;
      position: absolute;
      left: 0;
      top: 0;
      .img {
        width: 750px;
        height: 514px;
      }
      .play {
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