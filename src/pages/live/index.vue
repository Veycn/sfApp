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
      <view class="live-course" v-for="item in 3">
        <view class="live-header flex f-jc-sb f-ai-c">
          <view class="live-title c-fff f-30">{{ "大四大吉大利大酒店" }}</view>
          <view class="live-price">
            <text class="sign c-fff">¥</text>
            <text class="f-48 c-fff bold">0.9</text>
          </view>
        </view>
        <view class="flex f-fd-r s-center">
          <view class="mr-30">
            <text class="iconfont icon-share f-40"></text>
            <text class="c-fff f-24">{{ 200 }}</text>
          </view>
          <view  class="mr-30">
            <text class="iconfont icon-like1 red f-40"></text>
            <text class="c-fff f-24">{{ 200 }}</text>
          </view>
          <view  class="mr-30">
            <text class="iconfont icon-cart f-40"></text>
            <text class="c-fff f-24">{{ 200 }}</text>
          </view>
        </view>
        <view class="flex f-jc-sb f-ai-c">
          <view class="flex f-fd-r f-jc-c f-ai-c">
            <image
              class="img"
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2662097736,3011062945&fm=26&gp=0.jpg"
            ></image>
            <text class="c-fff f-24">主讲师：{{ "读卡器" }}</text>
          </view>
          <view class="btn-buy f-24">购买</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      background: [
        "https://www.shenfu.online/pic/pic1.png",
        "https://www.shenfu.online/pic/pic2.png",
      ],
    };
  },
  onLoad: function (options) {},
  methods: {
    skip(e) {
      console.log(e.currentTarget.dataset.url);
    },
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
