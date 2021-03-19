<template>
  <view class="p-wrapper">
    <view class="banner">
      <image class="bg" src="../../assets/pic/jhbg.png" />
      <text class="c">{{ sectionName }}</text>
      <text class="s">欢迎使用深辅智能在线教育</text>
    </view>
    <view class="points">
      <template v-for="(item, index) in renderList">
        <view :key="index">
          <point-item
            :point-name="item['knowledgePoint']"
            :right-list="item['rightList']"
            :status="item['text']"
            :color="item['color']"
            :level="item['level']"
            @pointTap="toQuestion"
            :id="item['id']"
          />
        </view>
      </template>
    </view>
    <view class="btn-wrapper">
      <image
        class="btn"
        @tap="customize"
        src="../../assets/pic/btn_curriculum.png"
      />
      <text class="txt">深辅AI智能精选课程</text>
    </view>
  </view>
</template>

<script>
import request from "../../utils/http";
import pointItem from "../../components/pointItem/index.vue";
import Taro from "@tarojs/taro";
const app = Taro.getApp();

export default {
  name: "Points",
  data() {
    return {
      sectionName: "",
      sectionId: -1,
      renderList: null,
      examId: 0,
    };
  },
  onLoad: async function (options) {
    let { examId } = options;
    this.getList(examId);
    Taro.eventCenter.on('pointTap', this.toQuestion);
  },
  onShow() {},
  methods: {
    async getList(id) {
      const res = await request.get({
        url: "api/exam/getSectionExamOfUser",
        params: { examId: id },
      });
      if (res.data.status === 200) {
        const {examId, knowledgeList} = res.data.data;
        this.examId = examId;
        let renderList = knowledgeList;
        let arr = [];
        for (let i = 0; i < renderList.length; i++) {
          let temp = new Object();
          if (renderList[i].ratio === 0) {
            temp.text = "未完成";
            temp.level = 0;
            temp.color = "#ececec";
          } else if (renderList[i].ratio < 0.4) {
            temp.text = "已了解/未掌握";
            temp.level = 1;
            temp.color = "#afffeb";
          } else if (renderList[i].ratio < 0.7) {
            temp.text = "已理解/未掌握";
            temp.level = 2;
            temp.color = "#55ffb1";
          } else {
            temp.text = "已掌握";
            temp.level = 3;
            temp.color = "#15EC89";
          }
          renderList[i] = { ...temp, ...renderList[i] };
          arr.push(temp);
        }
        this.renderList = renderList;
      }
    },

    toQuestion(e) {
      Taro.navigateTo({
        url: `/pages/exam/index?sectionId=${this.sectionId}&sectionName=${this.sectionName}&examId=${this.examId}&knowledgePointId=${e.id}&isKnowledge=${true}`,
      });
    },

    customize() {
      Taro.switchTab({ url: "/pages/customize/index" });
    },
  },
  components: {
    pointItem,
  },
};
</script>

<style lang="less">
.p-wrapper,
page {
  background: rgb(240, 242, 245);
}

.p-wrapper .banner {
  width: 100%;
  height: 200rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
}

.p-wrapper .banner .bg {
  width: 750rpx;
  height: 200rpx;
  position: absolute;
  left: 0;
  top: 0;
}
.p-wrapper .banner .c {
  color: #1c1b1b;
  font-size: 48rpx;
  font-weight: bold;
  z-index: 10;
}

.p-wrapper .banner .s {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
  z-index: 10;
}

.points {
  width: 100%;
  box-sizing: border-box;
  padding: 220rpx 22rpx 200rpx;
  overflow-y: scroll;
}

.btn-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ffffff;
  width: 100%;
  height: 200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 6rpx 0 rgba(50, 55, 53, 0.05);
  border-top: 1rpx solid #e4e4e4;
}
.btn-wrapper .btn {
  width: 260rpx;
  height: 87rpx;
}

.btn-wrapper .txt {
  font-size: 24rpx;
  color: #999;
}
</style>
