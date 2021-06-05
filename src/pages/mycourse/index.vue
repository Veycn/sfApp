
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
        <text class="mr-10 iconfont icon-buy f-40"></text>
        <text class="text mr-10">已购</text>
        <text class="number">{{buyTotal || 0}}</text>
      </view>
      <view
        @tap="changeTab('like')"
        :class="[
          'tab-item like flex1 flex f-fd-r f-jc-c f-ai-c',
          activeTab === 'like' ? 'active' : '',
        ]"
      >
        <text class="mr-10 iconfont icon-like f-32"></text>
        <text class="text mr-10">喜欢</text>
        <text class="number">{{likeTotal || 0}}</text>
      </view>
    </view>
    <view class="courses">
      <template v-for="c in renderList">
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
      myLike: [],
      buyPageNum: 0,
      buyPageSize: 5,
      buyTotal: 1,
      likePageNum: 0,
      likePageSize: 5,
      likeTotal: 1
    };
  },
  created() {
    this.getMyBuyCourse();
    this.getMyLikeCourse();
  },

  methods: {
    getMyBuyCourse() {
      API.getMyCourseList({
        pageNo: ++this.buyPageNum,
        pageSize: this.buyPageSize
      }).then((res) => {
        this.myBuys = res?.data?.data?.list || [];
        this.buyTotal = res?.data?.data?.total || 0;
      });
    },
    getMyLikeCourse(){
      API.getMyLikeCourse({
        pageNo: ++this.likePageNum,
        pageSize: this.likePageSize
      }).then(res => {
        this.myLike = res?.data?.data?.list || []
        this.likeTotal = res?.data?.data?.total || 0;
      })
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    toPlay(videoId, playId, sales, stars, poster) {
      Taro.navigateTo({url: `/pages/play/index?source=${1}&courseId=${videoId}&playId=${playId}&sales=${sales}&stars=${stars}&poster=${poster}`})
    },
  },
  reachBottom(){
    if(this.activeTab === 'buy'){
      this.getMyBuyCourse();
    }else{
      this.getMyLikeCourse();
    }
  },
  computed: {
    renderList(){
      return this.activeTab === 'buy' ? this.myBuys : this.myLike
    },
    hasBuyNext(){
      return this.myBuys.length < this.buyTotal
    },
    hasLikeNext(){
      return this.myLike.length < this.likeTotal
    }
  },
  components: {
    Course,
  },
};
</script>

<style lang="less">
.index{
  width: 100vw;
  height: 100%;
  background-color: #000;
}
.tab {
  height: 152px;
  background-color: #000;
  position: sticky;
  left: 0;
  top: 0;
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
    &.active{
      .text{
        color: #fff;
      }
      .number{
        color: #fff;
      }
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
  background-color: #000;
}
</style>
