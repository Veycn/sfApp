<template>
  <view class="p-container">
    <official-account></official-account>
    <swiper
      class="swiper"
      indicator-dots="{{indicatorDots}}"
      autoplay="{{autoplay}}"
      interval="{{interval}}"
      duration="{{duration}}"
    >
      <block wx:for="{{background}}" wx:key="*this">
        <swiper-item>
          <view data-url="{{item}}" bindtap="skip" class="swiper-item"
            ><image class="lbt" src="{{item}}"
          /></view>
        </swiper-item>
      </block>
    </swiper>
    <view class="header">
      <view class="chapter">
        <image class="img" src="https://www.shenfu.online/pic/Image.png" />
        <view class="txt"
          >{{ subjectVersion
          }}<image
            class="down"
            bindtap="reselect"
            src="../../assets/pic/down.png"
        /></view>
        <view class="tip">欢迎使用深辅智能在线教育</view>
      </view>
      <view class="scroll">
        <scroll-view class="scroller" scroll-x="true" style="width: 100%">
          <block wx:for="{{chapters}}" wx:key="index">
            <view
              id=""
              class="item {{activeIndex === index ? '_active' : ''}}"
              data-item="{{item}}"
              data-index="{{index}}"
              catchtap="chapterTap"
            >
              {{ item.chapter }}
            </view>
          </block>
        </scroll-view>
      </view>
    </view>
    <view class="section-list">
      <block wx:for="{{seclist}}" wx:key="index">
        <view class="sec-wraps">
          <s-sectionlist seclist="{{item}}" first="{{index}}" />
        </view>
      </block>
    </view>
  </view>
</template>

<script>
const { request } = require("../../utils/request.js");
const app = Taro.getApp();
import SectionList from "../../components/sectionList/index.vue";

export default {
  name: "Detect",
  data() {
    return {
      subjectVersion: "数学七年级上人教版",
      chapters: [],
      list: [],
      seclist: [],
      isToastShow: false,
      activeChapter: "",
      activeChapterId: 1,
      hasDetected: false,
      activeIndex: 0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      background: ["../../assets/pic/pic1.png", "../../assets/pic/pic2.png"],
    };
  },
  onLoad: function (options) {
    this.launch();
    let { activeIndex } = this.data;
    request("api/exam/getChapterList", "get", {}, (res) => {
      if (res.status == 200) {
        this.setData({
          chapters: res.data,
        });
        this.getSections(res.data && res.data[activeIndex].id);
      }
    });
  },
  onShow() {
    try {
      var choosedTitle = Taro.getStorageSync("choosedTitle");
      if (choosedTitle) {
        this.setData({
          subjectVersion: choosedTitle,
        });
      }
    } catch (e) {
      console.log("从缓存中获取choosedTitle失败！");
    }

    let { activeIndex } = this.data;
    request("api/exam/getChapterList", "get", {}, (res) => {
      if (res.status == 200) {
        this.setData({
          chapters: res.data,
        });
        this.getSections(res.data && res.data[activeIndex].id);
      } else {
        Taro.navigateTo({
          url: "/pages/login/index",
        });
      }
    });
  },
  methods: {
    skip(e) {
      console.log(e.currentTarget.dataset.url);
    },
    skipPage: function (e) {
      let { submitstatus } = e.currentTarget.dataset;
      if (submitstatus === 2) {
        this.toPoints(e);
      } else {
        this.toDetect(e);
      }
    },
    toDetect: function (e) {
      let { id, section, examid } = e.currentTarget.dataset;
      console.log(e.currentTarget.dataset);
      Taro.navigateTo({
        url: `/pages/exam/index?knowledgePointId=${id}&&examId=${examid}`,
      });
    },
    toPoints: function (e) {
      let { id, item } = e.currentTarget.dataset;
      Taro.navigateTo({
        url: `/pages/points/index?id=${id}&section=${item}`,
      });
    },
    changeChapter: function (e) {
      let { c, i } = e.currentTarget.dataset;
      this.setData({
        activeChapter: c.substring(0, 3),
        activeChapterId: i,
        isToastShow: false,
      });
      this.getSections();
    },
    openToast: function () {
      this.setData({
        isToastShow: true,
      });
    },
    closeToast() {
      this.setData({
        isToastShow: false,
      });
    },
    getSections(id) {
      request(
        "api/exam/getSectionList",
        "get",
        {
          chapterId: id,
        },
        (res) => {
          if (res.status === 200) {
            this.setData({
              seclist: res.data,
              list: res.data
            });
            // this.setData({
            //   list: res.data,
            // });
          } else {
            Taro.showToast({
              title: res.msg | "请求异常！",
              icon: "none",
            });
          }
        },
        "form"
      );
    },
    chapterTap(e) {
      let { item, index } = e.currentTarget.dataset;
      this.setData({
        activeIndex: index,
      });
      this.getSections(item.id);
    },
    onCustomTap(e) {
      Taro.reLaunch({
        url: `/pages/customize/index?hascustomize=${e.currentTarget.dataset.hascustomize}`,
      });
    },
    reselect() {
      Taro.navigateTo({ url: "/pages/index/index" });
    },
    /**
     * 加入启动小程序逻辑:
     *  任何时候启动都应该进入此页面, 然后判断用户身份信息
     *  即: 进行一次用户不知道的登录
     *  一是已经完成登录过程(选择年级科目并保存)的用户, 此举可以更新用户身份信息(token)
     *  二是登录如果失败则证明是新用户, 执行跳转至登录页逻辑
     */
    launch() {
      Taro.getStorage({
        key: "userToken",
        success: (res) => {
          this.login();
        },
        fail: (res) => {
          // token 获取失败
          Taro.navigateTo({
            url: "/pages/login/index",
          });
        },
      });
    },
    login() {
      Taro.getStorage({
        key: "userInfo",
        success: (res) => {},
        fail: (res) => {
          console.log(res);
          Taro.navigateTo({
            url: "/pages/login/index",
          });
        },
      });
    },
  },
  components: {
    SectionList
  },
};
</script>

<style lang="less">
.p-container {
  width: 100%;
  height: 100%;
  background: rgb(240, 242, 245);
}

page {
  background-color: rgb(240, 242, 245);
}

.swiper {
  height: 296rpx;
  width: 100%;
}
.swiper-item {
  height: 296rpx;
  width: 100%;
  line-height: 296rpx;
  text-align: center;
}
.banner {
  width: 100%;
  height: 294rpx;
}

.banner > .ba {
  width: 100%;
  height: 100%;
}

.header {
  background: #fff;
}

.header .chapter {
  box-sizing: border-box;
  padding: 40rpx 78rpx 10rpx;
  position: relative;
  background-image: url("https://www.shenfu.online/pic/Image.png");
  background-repeat: no-repeat;
  background-size: 120rpx 74rpx;
  background-position: 38rpx 40rpx;
}

.header .chapter .img {
  width: 120rpx;
  height: 74rpx;
  vertical-align: middle;
  position: absolute;
  left: 40rpx;
  z-index: -1;
}

.lbt {
  width: 100%;
  height: 296rpx;
}

.header .chapter .txt {
  font-weight: bold;
  font-size: 48rpx;
  padding-bottom: 20rpx;
}

.header .chapter .txt .down {
  width: 31rpx;
  height: 31rpx;
  margin-left: 17rpx;
}

.header .chapter .tip {
  font-size: 24rpx;
  color: #1c1b1b;
}
.scroll {
  width: 588rpx;
  margin: auto;
}
.scroll .scroller {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
}

.scroll .scroller .item {
  display: inline-block;
  height: 100%;
  text-align: center;
  margin-right: 90rpx;
  font-size: 30rpx;
  font-weight: bold;
  box-sizing: border-box;
  padding-top: 24rpx;
  border-bottom: 1px solid transparent;
}

.scroll .scroller .item._active {
  color: #24dd88;
  border-bottom: 1px solid #24dd88;
}

.p-container .section-list {
  width: 710rpx;
  margin: 20rpx auto;
  background-color: rgb(240, 242, 245);
  padding-bottom: 20rpx;
}

.p-container .section-list .sec-wraps {
  width: 705rpx;
  margin: 0 auto 15rpx;
}

.slide-image {
  width: 100%;
  height: 100%;
}
</style>
