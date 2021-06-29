<template>
  <view class="similar" v-if="hasReady">
    <template v-if="courseList.length">
      <view class="s-course" v-for="course in courseList" @tap="toPlay">
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
    <template v-else>
      <view class="no">没有找到相关课程</view>
    </template>
  </view>
</template>
<script>
import API from "../../utils/api";
import Taro from "@tarojs/taro";
export default {
  name: "Similar",
  onLoad(e) {
    console.log(e);
    this.courseId = e.courseId && +e.courseId || 0;
    this.getSimilarCourse();
  },
  data() {
    return {
      courseId: 0,
      courseList: [],
      hasReady: false,
    };
  },
  created() {},
  methods: {
    getSimilarCourse() {
      API.getSimilarCourse({
        courseId: this.courseId,
      }).then((res) => {
        console.log(res);
        this.courseList = res.data.data || [];
        this.hasReady = true;
      });
    },
    toPlay() {
      Taro.navigateTo({
        url: `/pages/slide/index?courseId=${this.courseId}&type=2`,
      });
    },
  },
};
</script>

<style lang="less">
.similar {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  padding: 25px;
  position: relative;
  .s-course {
    width: 700px;
    padding: 30px 38px;
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
    padding: 100px 0 0;
    text-align: center;
    color: #fff;
  }
}
</style>
