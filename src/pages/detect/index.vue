<template>
  <view class="p-container">
    <official-account></official-account>
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
    <view class="header">
      <view class="chapter">
        <image class="img" src="https://www.shenfu.online/pic/Image.png" />
        <view class="txt">
          {{ subjectVersion }}
          <image
            class="down"
            @tap="reselect"
            src="https://www.shenfu.online/pic/down.png"
          />
        </view>
        <view class="tip">欢迎使用深辅智能在线教育</view>
      </view>
      <view class="detect-scroll">
        <scroll-view class="detect-scroller" scroll-x="true">
          <template v-for="(item, index) in chapters">
            <view
              :key="index"
              class="item"
              :class="activeIndex === index ? '_active' : ''"
              :data-item="item"
              :data-idx="index"
              @tap="chapterTap"
            >
              {{ item.chapter }}
            </view>
          </template>
        </scroll-view>
      </view>
    </view>
    <view class="section-list">
      <block v-for="(item, index) in seclist" :key="index">
        <view class="sec-wraps">
          <section-list :seclist="item" :first="index" />
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import request from "../../utils/http";
import SectionList from "../../components/sectionList/index.vue";
import Taro from "@tarojs/taro";
const app = Taro.getApp();

export default {
  name: "Detect",
  data() {
    return {
      subjectVersion: "",
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
      background: [
        "https://www.shenfu.online/pic/pic1.png",
        "https://www.shenfu.online/pic/pic2.png",
      ],
    };
  },
  onLoad: async function (options) {
    this.launch();
  },
  onShow() {
    try {
      var choosedTitle = Taro.getStorageSync("choosedTitle");
      if (choosedTitle) {
        this.subjectVersion = choosedTitle;
      }
    } catch (e) {
      console.log("从缓存中获取choosedTitle失败！");
    }

    const activeIndex = this.activeIndex;
    request
      .get({
        url: "api/exam/getChapterList",
        params: {},
      })
      .then((res) => {
        if (res.data.status == 200) {
          this.chapters = res.data.data;
          this.getSections(res.data.data && res.data.data[activeIndex].id);
        } else {
          Taro.switchTab({
            url: "/pages/user/index",
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

      this.activeChapter = c.substring(0, 3);
      this.activeChapterId = i;
      this.isToastShow = false;
      this.getSections();
    },
    openToast: function () {
      this.isToastShow = true;
    },
    closeToast() {
      this.isToastShow = false;
    },
    async getSections(id) {
      const res = await request.get({
        url: "api/exam/getSectionList",
        params: { chapterId: id },
        type: "form",
      });
      if (res.data.status === 200) {
        this.seclist = [...res.data.data];
        this.list = res.data.data;
      } else {
        Taro.showToast({
          title: res.msg | "请求异常！",
          icon: "none",
        });
      }
    },
    chapterTap(e) {
      let { item, idx } = e.currentTarget.dataset;
      this.activeIndex = idx;
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
          Taro.switchTab({
            url: "/pages/user/index",
          });
        },
      });
    },
    login() {
      Taro.getStorage({
        key: "userInfo",
        success: (res) => {
          console.log("login success", res);
        },
        fail: (res) => {
          console.log(res);
          Taro.switchTab({
            url: "/pages/user/index",
          });
        },
      });
    },
  },
  components: {
    SectionList,
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
  height: 296px;
  width: 100%;
}
.swiper-item {
  height: 296px;
  width: 100%;
  line-height: 296px;
  text-align: center;
}
.banner {
  width: 100%;
  height: 294px;
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
  padding: 40px 78px 10px;
  position: relative;
  background-image: url("https://www.shenfu.online/pic/Image.png");
  background-repeat: no-repeat;
  background-size: 120px 74px;
  background-position: 38px 40px;
}

.header .chapter .img {
  width: 120px;
  height: 74px;
  vertical-align: middle;
  position: absolute;
  left: 40px;
  z-index: -1;
}

.lbt {
  width: 100%;
  height: 296px;
}

.header .chapter .txt {
  font-weight: bold;
  font-size: 48px;
  padding-bottom: 20px;
}

.header .chapter .txt .down {
  width: 31px;
  height: 31px;
  margin-left: 17px;
}

.header .chapter .tip {
  font-size: 24px;
  color: #1c1b1b;
}
.detect-scroll {
  width: 588px;
  margin: auto;
}
.detect-scroll .detect-scroller {
  width: 100%;
  height: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
}

.detect-scroll .detect-scroller .item {
  display: inline-block;
  height: 100%;
  text-align: center;
  margin-right: 90px;
  font-size: 30px;
  font-weight: bold;
  box-sizing: border-box;
  padding-top: 24px;
  border-bottom: 1px solid transparent;
}

.detect-scroll .detect-scroller .item._active {
  color: #24dd88;
  border-bottom: 1px solid #24dd88;
}

.p-container .section-list {
  width: 710px;
  margin: 20px auto;
  background-color: rgb(240, 242, 245);
  padding-bottom: 20px;
}

.p-container .section-list .sec-wraps {
  width: 705px;
  margin: 0 auto 15px;
}

.slide-image {
  width: 100%;
  height: 100%;
}
</style>
