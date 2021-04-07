<template>
  <view class="index">
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
          <video-window :id="video.scrollId" :key="video.id" :video="video"></video-window>
        </template>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import VideoWindow from "../../components/video/index.vue";
import API from '../../utils/api';
export default {
  name: "Index",
  data() {
    return {
      list: [],
      startY: 0,
      endY: 0,
      activeIndex: 0,
    };
  },
  created(){
    API.getPrivateCourseList().then(res => {
      console.log(res);
      const list = res.data.data.forEach(video => {
        video['scrollId'] = 'v' + video.id
      })
      this.list = res.data.data
    }) 
  },
  methods: {
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
      // console.log(e);
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
          } else {
            console.log("to top");
          }
        } else {
          // 手势向上，滚动向下
          console.log(2);
          if (this.activeIndex < videoAmount) {
            this.activeIndex++;
          } else {
            console.log("load more");
          }
        }
      }
    },
  },
  computed: {
    toView() {
      return (
        (this.list[this.activeIndex] && this.list[this.activeIndex]['scrollId']) || ""
      );
    },
  },
  components: {
    VideoWindow,
  },
};
</script>

<style lang="less">
.index {
  height: 100%;
  .list-wrapper {
    height: 100%;
    overflow: scroll;
    .scroller {
      height: 100%;
    }
  }
}
</style>
