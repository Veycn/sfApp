
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
        <text class="number">{{ buyTotal || 0 }}</text>
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
        <text class="number">{{ likeTotal || 0 }}</text>
      </view>
    </view>
    <view class="courses">
      <template v-for="c in renderList" v-if="activeTab == 'buy'">
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
      <template v-if="activeTab == 'like'">
        <view class="s-course" v-for="(course, index) in renderList" @tap="toPlay(index)">
          <view class="title f-30 c-fff">{{ course.courseName }}</view>
          <view class="info flex f-fd-r f-jc-sb">
            <view class="teacher flex f-ai-c">
              <image class="img" :src="course.teacherAvatar" />
              <view class="c-fff f-24">主讲师：{{ course.teacherName }}</view>
            </view>
            <view class="other flex">
              <view class="sub c-fff"
                ><text class="iconfont icon-share"></text>
                {{ course.relayNum || 0 }}</view
              >
              <view class="sub c-fff"
                ><text class="iconfont icon-like1 red"></text>
                {{ course.courseStars || 0 }}</view
              >
            </view>
          </view>
        </view>
      </template>
      <view class="no" v-if="activeTab == 'buy' && !myBuys.length">你还没有相关课程～</view>
      <view class="no" v-if="activeTab == 'like' && !myLike.length">你还没有相关课程～</view>
    </view>
  </view>
</template>

<script>
import API from "../../utils/api";
import Taro from "@tarojs/taro";
import Course from "../../components/course/index.vue";
export default {
  name: "Index",
  data() {
    return {
      activeTab: "buy",
      myBuys: [],
      myLike: [],
      buyPageNum: 0,
      buyPageSize: 10,
      buyTotal: 0,
      likePageNum: 0,
      likePageSize: 10,
      likeTotal: 0,
      buyHasReady: false,
      likeHasReady: false
    };
  },
  onLoad() {
  },

  onShow(){
    this.refreshCourse()
  },

  methods: {
    refreshCourse(){
      this.myBuys = [];
      this.myLike = [];
      this.buyPageNum = 0;
      this.likePageNum = 0;
      this.buyTotal = 0;
      this.likeTotal = 0;
      this.getMyBuyCourse();
      this.getMyLikeCourse();
    },
    getMyBuyCourse() {
      API.getMyCourseList({
        pageNo: ++this.buyPageNum,
        pageSize: this.buyPageSize,
      }).then((res) => {
        this.myBuys = this.myBuys.concat(res?.data?.data?.list || []);
        this.buyTotal = res?.data?.data?.total || 0;
        this.buyHasReady = true
      });
    },
    getMyLikeCourse() {
      API.getMyLikeCourse({
        pageNo: ++this.likePageNum,
        pageSize: this.likePageSize,
      }).then((res) => {
        this.myLike = this.myLike.concat(res?.data?.data?.list || []);
        this.likeTotal = res?.data?.data?.total || 0;
        this.likeHasReady = true
      });
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    toPlay(videoIdOrIndex, playId, sales, stars, poster, relayNum) {
      if (this.activeTab === "like") {
        return Taro.navigateTo({ url: `/pages/slide/index?type=4&startIndex=${videoIdOrIndex}` });
      }
      Taro.navigateTo({
        url: `/pages/play/index?source=${1}&courseId=${videoIdOrIndex}&playId=${playId}&sales=${sales}&stars=${stars}&poster=${poster}&relayNum=${relayNum}`,
      });
    },
  },
  onReachBottom() {
    console.log(1);
    if (this.activeTab === "buy") {
      this.getMyBuyCourse();
    } else {
      this.getMyLikeCourse();
    }
  },
  computed: {
    renderList() {
      return this.activeTab === "buy" ? this.myBuys : this.myLike;
    },
    hasBuyNext() {
      return this.buyHasReady && this.myBuys.length < this.buyTotal;
    },
    hasLikeNext() {
      return this.likeHasReady && this.myLike.length < this.likeTotal;
    },
  },
  components: {
    Course,
  },
};
</script>

<style lang="less">
.index {
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
    &.active {
      .text {
        color: #fff;
      }
      .number {
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

.s-course {
  width: 700px;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #2d2d2d;
  margin-bottom: 10px;
  .title {
    margin-bottom: 20px;
  }
  .info {
    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 22px;
    }
    .other {
      .sub {
        margin-left: 40px;
        .iconfont {
          font-size: 40px;
        }
      }
    }
  }
}

.no{
  text-align: center;
  color: #fff;
  padding: 100px 0;
}
</style>
