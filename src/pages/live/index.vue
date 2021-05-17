<template>
  <view class="live-container">
    <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <swiper-item v-for="(item, index) in background" :key="index">
        <view :data-url="item" @tap="skip" class="swiper-item">
          <image class="lbt" :src="item" />
        </view>
      </swiper-item>
    </swiper>
    <view class="live-wrapper">
      <view class="live-course" v-for="c in renderList" @tap="toPlay(c)">
        <view class="live-header flex f-jc-sb f-ai-c">
          <view class="live-title c-fff f-30">{{ c.courseName }}</view>
          <view class="live-price">
            <text class="sign c-fff">¥</text>
            <text class="f-48 c-fff bold">{{c.coursePrice}}</text>
          </view>
        </view>
        <view class="flex f-fd-r s-center">
          <view class="mr-30">
            <text class="iconfont icon-share f-40"></text>
            <text class="c-fff f-24">{{ c.relayNum }}</text>
          </view>
          <view  class="mr-30">
            <text class="iconfont icon-like1 red f-40"></text>
            <text class="c-fff f-24">{{ c.courseStars }}</text>
          </view>
          <view  class="mr-30">
            <text class="iconfont icon-cart f-40"></text>
            <text class="c-fff f-24">{{ c.courseSales }}</text>
          </view>
        </view>
        <view class="flex f-jc-sb f-ai-c">
          <view class="flex f-fd-r f-jc-c f-ai-c">
            <image
              class="img"
              :src="c.teacherAvatar"
            ></image>
            <text class="c-fff f-24">主讲师：{{ c.teacherName }}</text>
          </view>
          <view class="btn-buy buyed f-24" v-if="c.isPurchased">已购</view>
          <view class="btn-buy f-24" v-else>购买</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import API from "../../utils/api";
import Taro from "@tarojs/taro";
export default {
  name: "Index",
  data() {
    return {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      pageSize: 5,
      pageNum: 0,
      background: [
        "https://www.shenfu.online/pic/pic1.png",
        "https://www.shenfu.online/pic/pic2.png",
      ],
      renderList: []
    };
  },
  onLoad: function (options) {
    this.getCourse()
  },
  methods: {
    getCourse(){
      API.getLiveCourse({
        pageSize: this.pageSize,
        pageNum: ++this.pageNum
      }).then(res => {
        this.renderList = this.renderList.concat(res?.data?.data?.data?.list || [])
        this.total = res?.data?.data?.data?.total || 0
      })
    },
    skip(e) {
      console.log(e.currentTarget.dataset.url);
    },
    toPlay(course) {
      Taro.navigateTo({url: `/pages/play/index?source=${2}&courseId=${course.courseId}`})
    },
  },
  onReachBottom(){
    this.hasNext && this.getCourse()
  },
  computed: {
    hasNext(){
      return this.renderList.length < this.total
    }
  },
  components: {},
};
</script>

<style lang="less">
.live-container {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  .live-wrapper{
    padding: 25px;
    background-color: #000;
  }
  .live-course {
    background-color: #2d2d2d;
    padding: 48px 40px 48px 60px;
    margin-bottom: 10px;
    .s-center{
      margin-bottom: 20px;
    }
    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .btn-buy{
      width: 90px;
      height: 40px;
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
      background-color: #15ec89;
      color: #000;
      &.buyed{
        background-color: #818181;
        color: #fff;
      }
    }
  }

}
.swiper {
  height: 296px;
  width: 100%;
}
.swiper-item {
  height: 296px;
  width: 100%;
  line-height: 296px;
  text-align: center;
}

.lbt {
  width: 100%;
  height: 296px;
}
</style>
