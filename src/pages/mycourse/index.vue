
<template>
  <view class="index">
    <view class="tab flex f-fd-r">
      <view
        @tap="changeTab('buy')"
        :class="[
          'tab-item brought flex1 flex f-fd-r f-jc-c f-ai-c',
          activeTab === 'buy' ? 'active' : '',
        ]"
      >
        <text class="iconfont"></text>
        <text class="text">已购</text>
        <text class="number">128</text>
      </view>
      <view
        @tap="changeTab('like')"
        :class="[
          'tab-item like flex1 flex f-fd-r f-jc-c f-ai-c',
          activeTab === 'like' ? 'active' : '',
        ]"
      >
        <text class="iconfont"></text>
        <text class="text">喜欢</text>
        <text class="number">128</text>
      </view>
    </view>
    <view class="courses">
      <template v-for="c in myBuys">
        <course
          :title="c.courseName"
          :is-buy="true"
          :sales="c.courseSales"
          :stars="c.courseStars"
          :teacher-name="c.teacherName"
          :teacherImage="c.teacherAvatar"
          :handleTap="toPlay"
          :videoId="c.courseId"
          :playId="c.ossVideoId"
          :poster="c.courseCoverUrl"
          :relay="c.relayNum"
        ></course>
      </template>
    </view>
  </view>
</template>

<script>
import API from "../../utils/api";
import Taro from "@tarojs/taro"
import Course from "../../components/course/index.vue";
export default {
  name: "Index",
  data() {
    return {
      activeTab: "buy",
      myBuys: [],
    };
  },
  created() {
    this.getMyCourse();
  },

  methods: {
    getMyCourse() {
      API.getMyCourseList().then((res) => {
        console.log(res);
        this.myBuys = res?.data?.data || [];
      });
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    toPlay(videoId, playId, sales, stars, poster) {
      Taro.navigateTo({url: `/pages/play/index?source=${1}&courseId=${videoId}&playId=${videoId}&sales=${sales}&stars=${stars}&poster=${poster}`})
    },
  },
  components: {
    Course,
  },
};
</script>

<style lang="less">
.index{
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
.tab {
  height: 152px;
  background-color: #000;
  .tab-item {
    position: relative;
    box-sizing: border-box;
    .text {
      color: #808080;
      font-size: 30px;
    }
    .number {
      font-size: 22px;
      color: #808080;
      position: relative;
      top: 6px;
      left: 2px;
    }
    &.active::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      display: inline-block;
      width: 375px;
      height: 6px;
      background-color: #15ec89;
    }
  }
}

.courses {
  padding: 25px;
}
</style>
