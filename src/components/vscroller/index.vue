<template>
  <view class="similar">
    <swiper
      @change="changeSwiper"
      :current="current"
      :circular="circular"
      :vertical="true"
      class="swiper"
      @touchstart="touchstart"
      @touchend="touchend"
    >
      <template v-for="(item, index) in list" v-if="playInfos.length">
              
        <swiper-item :key="index" class="swiper-item" @tap.stop="playOrPause" >
          <template v-if="current == index">
            <video
              id="myVideo"
              :class="['my-video', currentVideo.videoType == 1 ? 'small' : '']"
              :src="playInfos[index].playURL"
              object-fit="cover"
              :loop="false"
              :initial-time="0.01"
              :custom-cache="false"
              @waiting="videoWaiting"
              @timeupdate="timeupdate"
              @loadedmetadata="loadedmetadata"
              @progress="progress"
              @play="eventPlay"
              :autoplay="true"
              :show-progress="true"
              :show-fullscreen-btn="false"
              :show-play-btn="false"
              :show-center-play-btn="false"
              :enable-progress-gesture="false"
              @tap.stop="playOrPause"
            ></video>
          </template>
          <view v-if="!isPlaying" :data-index="index" @tap="play" class="stop">
            <image class="img pause" src="https://www.shenfu.online/pic/play1.png"></image>
          </view>
        </swiper-item>
      </template>
    </swiper>
    <view class="operation" v-if="currentVideo">
      <view class="operate" @tap="handleAction('like')">
        <text class="operate-icon iconfont icon-like1" v-if="isStar"></text>
        <text class="operate-icon iconfont icon-like" v-else></text>
        <view class="operate-desc">{{currentVideo.courseStars}}</view>
      </view>
      <view class="operate" @tap="handleAction('share')">
        <button class="share" open-type="share">
          <text class="operate-icon iconfont icon-share1"></text>
        </button>
        <view class="operate-desc">{{currentVideo.relayNum || 0}}</view>
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
    <view class="video-info" v-if="currentVideo">
      <view class="teacher-info flex f-ai-c">
        <view class="avatar mr-30">
          <image :src="currentVideo.teacherAvatar"></image>
        </view>
        <view class="info-desc mr-30 f-24 c-fff">讲师：{{currentVideo.teacherName || ''}}</view>
        <view class="info-desc f-20 c-fff">播放: {{currentVideo.playNum || 0}}</view>
      </view>
      <view class="base-info">
        <view class="video-desc">
          <view class="introduction">{{currentVideo.courseIntro || ''}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import API from "../../utils/api";
import Taro from "@tarojs/taro";
export default {
  name: "Test",
  props: {
    // 1 定制课程
    // 2 同类课程
    // 3 搜索课程
    useType: {
      type: Number | String,
      default: () => 1
    },
    courseId: {
      type: Number | String,
      require: false
    },

    courseName: {
      type: String,
      require: false
    },

    startIndex: {
      type: Number | String,
      default: 0
    },

    page: {
      type: Number | String,
      default: 0
    }
  },
  data() {
    return {
      current: 0, // 记录上一个current
      circular: false, // 是否可以循环播放
      isPlaying: true, // 暂停|播放
      windowH: 0,
      rzindex: 0,
      videoContext: null,
      pageSize: 10,
      pageNum: 0,
      list: [],
      playInfos: [],
      currentVideo: null,
      isStar: false,
      total: 1,
      startY: 0,
      times: 0
    };
  },
  created() {
    this.videoContext = Taro.createVideoContext("myVideo");
    this.pageNum = this.page > 0 ? this.page - 1 : 0;
    this.useHelper()
    if(this.startIndex){
      this.current = this.startIndex
    }
    Taro.showToast({title: "加载中...", icon: "none", duration: 3000})
  },
  methods: {
    useHelper(){
      if(!this.hasNext){
        
        return Taro.showToast({title: "没有更多了", icon: "none"});
      } 
      switch (+this.useType) {
        // 定制
        case 1:
          this.getCourse()
          break;
        // 同类
        case 2:
          this.getSimilarCourse()
          break;
        // 搜索
        case 3:
          this.getSearchCourse()
          break;
        // 喜欢/点赞
        case 4:
          this.getLikeCourse()
          break;
        default:
          break;
      }
    },
    getSimilarCourse(){
      API.getSimilarCourse({
        courseId: this.courseId
      }).then(res => {
        console.log(res);
        const list = res.data.data || []
        const ids = list.map(v => v.courseId)
        this.list = this.list.concat(list)
        this.currentVideo = list[this.current] || {}
        this.getIsStar(list[0].courseId)
        this.getPlayInfo(ids)
        this.total = (res.data.data || []).length
      })
    },
    getCourse(){
      API.getPrivateCourseList({
        pageNum: ++this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(this.pageNum);
        const list = res?.data?.data?.list || []
        const ids = list.map(v => v.id)
        this.list = this.list.concat(list)
        this.currentVideo = list[this.current] || {}
        this.total = res?.data?.data?.total || 0
        this.getPlayInfo(ids)
        this.getIsStar(list[0].id)
      })
    },
    getSearchCourse(){
      API.getSearchCourse({ courseName: this.courseName}).then(res => {
        const list = res?.data?.data || []
        const ids = list.map(v => v.courseId)
        this.list = this.list.concat(list)
        this.currentVideo = list[this.current] || {}
        this.total = list.length || 0
        this.getPlayInfo(ids)
        this.getIsStar(list[0].courseId)
      })
    },
    getLikeCourse(){
      API.getMyLikeCourse({
        pageNo: ++this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        const list = res?.data?.data?.list || [];
        const ids = list.map(v => v.id)
        this.list = this.list.concat(list)
        this.currentVideo = list[this.current] || {}
        this.total = res?.data?.data?.total || 0
        this.getPlayInfo(ids)
        this.getIsStar(list[0].id)

      });
    },
    getPlayInfo(ids){
      API.getPlayInfo(ids).then(res => {
        console.log(res);
        const infos  = (res.data.data || []).map(item => item.videoPlayInfoDTO)
        this.playInfos = this.playInfos.concat(infos)
      })
    },
    play(){
      this.videoContext && this.videoContext.play()
    },
    changeSwiper: function (e) {
      if (e.detail.source == "touch") {
        // 手动
        let data = this.data;
        // swiper滑到的位置
        let swiperIndex = e.detail.current;
        // 当前item的位置
        let current = this.current;
        // 如果没有切换就不执行其他操作
        if (current == swiperIndex) {
          return;
        }

        if(swiperIndex === this.list.length - 1){
          this.useHelper()
        }
        // 播放视频
        console.log(swiperIndex);
        this.playVideo();
        this.updatePlay();
        this.current = swiperIndex;
        this.isPlaying = true;
      }
    },
    touchstart(e){
      const startY = e.changedTouches[0].clientY
      this.startY = startY
    },
    touchend(e){
      const endY = e.changedTouches[0].clientY
      if(endY - this.startY < -50 ){
        if(+this.useType == 1 && this.current === this.list.length - 1){
          if(!this.times){
            return this.times = this.times + 1
          }
          Taro.showModal({
            title: "温馨提示",
            content: "没有更多视频了，去做认知检测？",
            success: (res) => {
              if(res.confirm){
                Taro.switchTab({
                  url: "/pages/detect/index"
                })
              }else{
                console.log('cancel');
              }
            }
          })
        }
      }
    },
    playVideo(e) {
      this.videoContext.play();
    },
    playOrPause(e) {
      if (this.isPlaying) {
        this.videoContext.pause();
      } else {
        this.videoContext.play();
      }

      let isPlayingTemp = !this.isPlaying;
      this.isPlaying = isPlayingTemp;
    },
    eventPlay(e) {
      this.rzindex = -1;
    },

    getIsStar(id){
      API.getIsStar({courseId: id}).then(res => {
        this.isStar = res.data.data
      })
    },

    handleAction(type) {
      switch (type) {
        case "like":
          this.handleLike();
          break;
        case "share":
          this.handleShare();
          break;
        case "similar":
          const id = this.list[this.current].id || this.list[this.current].courseId || 0
          Taro.navigateTo({ url: "/pages/similar/index?courseId=" + id});
          break;
        case "fullscreen":
          this.videoContext.requestFullScreen({
            direction: 90
          })
          break;
        default:
      }
    },

    handleLike() {
      // const videoId = this.videoId;
      const { id, courseId, courseStars } = this.currentVideo, courseInfo = this.currentVideo;
      API.starCourse({
        courseId: id || courseId,
        type: this.isStar ? 0 : 1
      }).then(res => {
        console.log(res);
        courseInfo.courseStars = this.isStar ? courseStars - 1 : courseStars + 1
        this.isStar = !this.isStar
        this.$set(this.list, this.current, courseInfo)
      })
    },

    handleShare(){
      const {id, courseId, relayNum} = this.currentVideo, courseInfo = this.currentVideo;
      API.updateRelay({
        courseId: id || courseId,
        relayNum: relayNum
      }).then(res => {
        courseInfo.relayNum = relayNum + 1
        this.$set(this.list, this.current, courseInfo)
      })
    },

    updatePlay(){
      const {id, courseId, playNum} = this.currentVideo, courseInfo = this.currentVideo;
      API.updatePlayNum({
        courseId: id || courseId,
      }).then(res => {
        // courseInfo.playNum = playNum + 1
        // this.$set(this.list, this.current, courseInfo)
      })
    },

    /**
     * 播放进度变化
     */
    timeupdate(e) {
      let percent = (e.detail.currentTime / e.detail.duration) * 100;
    },

    /**
     * 视频缓冲
     */
    videoWaiting(e) {
      // console.log("-========>>>>>>  videoWaiting");
    },

    /**
     * 加载元数据
     */
    loadedmetadata(e) {
      // console.log("-========>>>>>>  loadedmetadata");
    },

    /**
     * 加载进度变化时触发，只支持一段加载
     */
    progress(e) {
      // console.log("-========>>>>>>  progress");
      // console.log(e.detail.buffered);
    },
  },
  watch: {
    current: {
      handler: function(n, o){
        if(n >= 0){
          const newC = this.list[n]
          this.currentVideo = newC
          const id = newC ? newC.id || newC.courseId : ''
          newC && this.getIsStar(id)
          this.videoContext && this.videoContext.play()
        }
      },
      immediate: true
    }
  },
  computed: {
    hasNext(){
      return this.list.length < this.total
    }
  }
};
</script>

<style lang="less">
@import "./index.less";

</style>
