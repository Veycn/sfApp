<template>
  <view class="similar">
    <view
      class="animation-wrapper"
      :animation="animation"
      @touchstart="touchStart"
      @touchend="touchEnd"
    >
      <block v-for="video in videos" :key="video.poster">
        <view class="animation-image-wrapper">
          <image class="animation-image" :src="video.videoUrl"></image>
        </view>
      </block>
    </view>
    <video
      ref="vi"
      class="vvideo"
      id="video"
      bindtouchcancel="touchCancel"
      binderror="binderror"
      :autoplay="true"
      objectFit="cover"
      :src="videos[videoIndex].videoUrl"
      bindplay="bindplay"
      :controls="controls"
      loop="false"
      v-show="!animationShow"
    ></video>
  </view>
</template>
<script>
import API from "../../utils/api";
import Taro from "@tarojs/taro";
import Event from './event';
export default {
  name: "Test",
  onLoad(e) {
    this.videoChange = this.throttle(this.touchEndHandler, 200);
    this.windowHeight = Taro.getSystemInfoSync().windowHeight;
    this.animation = Taro.createAnimation({
      duration: 500,
      transformOrigin: '0 0 0',
    })
    
  },
  onReady(){
    console.log(2222);
    this.video = Taro.createVideoContext('video', this);
    Event.on('updateVideoIndex', this, index => {
      setTimeout(() => {
        this.animationShow = false;
        this.playState = true;
        setTimeout(() => {
          this.video.play()
        }, 100)
      }, 600)
    })

  },
  data() {
    return {
      Event,
      video: null,
      videos: [
        {
          videoUrl:
            "http://video.microc.cn/dG1wL3d4MzkwNjg3YjY3OTZjZTMzYS5vNnpBSnMzYTJqaDJHUWRGVllDV2JhaHhjTUFzLkFaeGE2d1NIVTV3cjkyNGFlOGIyMjMxYTgwNjYyOTVhZjY2YTJjN2VjY2MwLm1wNA==",
          durations: 10,
          poster: "https://p3.pstatp.com/large/131040001488de047292a.jpg",
          likenum: 10,
          commnetnum: "20",
          rewardNum: "6",
        },
        {
          videoUrl:
            "https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200fce0000bg36q72j2boojh1t030g&line=0",
          durations: 10,
          poster: "https://p99.pstatp.com/large/12c5c0009891b32e947b7.jpg",
          likenum: 10,
          commnetnum: "20",
          rewardNum: "6",
        },
        {
          videoUrl:
            "https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fd10000bfrb9mlpimm72a92fsj0&line=0",
          durations: 10,
          poster: "https://p99.pstatp.com/large/12246000525d4c87900e7.jpg",
          likenum: 10,
          commnetnum: "20",
          rewardNum: "6",
        },
        {
          videoUrl:
            "http://video.microc.cn/lecturer_iOS_201903181745504660A5DxJE9a.mp4",
          durations: 10,
          poster:
            "http://video.microc.cn/lecturer_iOS_201903181745504660A5DxJE9a.mp4?vframe/jpg/offset/0",
          likenum: 10,
          commnetnum: "20",
          rewardNum: "6",
        },
      ],
      animationShow: false,
      controls: false,
      touchStartingY: 0,
      touchStartTime: 0,
      touchEndTime: 0,
      videoChange: () => {},
      videoIndex: 0,
      currentTranslateY: 0,
      windowHeight: 0,
    };
  },
  created() {},
  methods: {
    touchStart(e) {
      let touchStartingY = this.touchStartingY;
      this.touchStartTime = e.timeStamp;
      touchStartingY = e.touches[0].clientY;
      this.touchStartingY = touchStartingY;
    },
    touchEnd(e) {
      console.log(2);
      this.videoChange(e)
    },
    touchEndHandler(e) {
      let touchStartingY = this.touchStartingY;
      let deltaY = e.changedTouches[0].clientY - touchStartingY;
      let index = this.videoIndex;
      if (deltaY > 100 && index !== 0) {
        this.animationShow = true;
        this.createAnimation(-1, index)
      } else if (deltaY < -100 && index !== this.videos.length - 1) {
        this.animationShow = true;
        this.createAnimation(1, index)
      }
    },

    createAnimation(direction, index) {
      let videos = this.videos;
      let currentTranslateY = this.currentTranslateY;
      index += direction;
      currentTranslateY += -direction * this.windowHeight;
      console.log(this.animation);

      this.animation.translateY(currentTranslateY).step();

      // return Promise.resolve({
      //   index: index,
      //   currentTranslateY: currentTranslateY,
      // });
      this.animation = this.animation.export();
      this.videoIndex = index;
      this.currentTranslateY = currentTranslateY;
      this.percent = 1;
      Event.emit('updateVideoIndex', index)
    },

    throttle(fn, delay) {
      var timer = null;
      return function () {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
