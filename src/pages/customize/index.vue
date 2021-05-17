<template>
  <view class="index">
    <view class="search" @tap="toSearch"><text class="iconfont icon-search f-48 bold"></text></view>
    <view class="list-wrapper" @touchstart="touchstart" @touchend="touchend">
      <scroll-view
        class="scroller"
        scrollY="true"
        scroll-with-animation="true"
        @scrolltoupper="upper"
        @scrolltolower="lower"
        :scrollIntoView="toView"
      >
        <template v-for="video in list">
          <video-window :id="video.scrollId" :key="video.id" :video="video" :requestFull="fullScreen"></video-window>
        </template>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import VideoWindow from "../../components/video/index.vue";
import API from '../../utils/api';
import Taro from '@tarojs/taro';
export default {
  name: "Index",
  data() {
    return {
      list: [],
      startY: 0,
      endY: 0,
      activeIndex: -1,
      activeId: 0,
      videoContext: null,
      pageNum: 0,
      pageSize: 5,
      total: 1
    };
  },
  onHide(){
    this.videoContext.stop()
  },
  created(){
    this.getCourse()
  },
  mounted(){
    this.activeIndex = 0
  },
  methods: {
    getCourse(){
      if(!this.hasNext) return Taro.showToast({title: "没有更多了", icon: "none"});
      API.getPrivateCourseList({
        pageNum: ++this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        const list = res?.data?.data?.list || []
        list.forEach(video => {
          video['scrollId'] = 'sf_v' + video.id
        })
        this.list = this.list.concat(list);
        this.total = res?.data?.data?.total || 0
      }) 
    },
    // 到顶
    upper(e) {
      console.log(e);
    },
    // 到底
    lower(e) {
      console.log(e);
    },
    // 滚动事件
    scroll(e) {
      e.preventDefault();
      this.offsetY = e.detail.deltaY;
    },
    fullScreen(){
      this.videoContext.requestFullScreen({
        direction: 90
      })
    },
    touchstart(e) {
      this.startY = e.changedTouches[0].pageY;
    },
    touchend(e) {
      const endY = e.changedTouches[0].pageY;
      const startY = this.startY;
      const offsetY = endY - startY;
      const videoAmount = this.list.length;
      if (Math.abs(offsetY) > 20) {
        if (offsetY > 0) {
          // 手势向下，滚动向上
          console.log(1);
          if (this.activeIndex > 0) {
            this.activeIndex--;
            this.videoContext.stop();
            this.videoContext = null;
          } else {
            console.log("to top");
          }
        } else {
          // 手势向上，滚动向下
          console.log(2);
          if (this.activeIndex < videoAmount) {
            this.activeIndex++;
            this.videoContext.stop();
            this.videoContext = null;
          } else {
            console.log("load more");
            this.getCourse()
          }
        }
      }
    },
    toSearch(){
      Taro.navigateTo({url: `/pages/search/index`})
    }
  },
  watch: {
    'list.length': function(newVal, oldVal){
      if(newVal >= 10 ){
        const list = this.list;
        list.splice(0, 5);
        this.list = list;
      }
    }
  },
  computed: {
    toView() {
      const view = (this.list[this.activeIndex] && this.list[this.activeIndex]['scrollId']) || "";
      this.videoContext = Taro.createVideoContext(view);
      this.videoContext.play()
      return view;
    },
    hasNext(){
      return this.list.length < this.total
    }
  },
  components: {
    VideoWindow,
  },
};
</script>

<style lang="less">
.index {
  height: 100%;
  position: relative;
  background-color: #000;
  .search{
    position: absolute;
    right: 48px;
    top: 30px;
    color: #fff;
    height: 40px;
    z-index: 9999;
  }
  .list-wrapper {
    height: 100%;
    overflow: scroll;
    .scroller {
      height: 100%;
    }
  }
}
</style>
