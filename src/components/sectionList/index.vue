<template>
  <view class="sec-wrap">
    <view class="sec-chapter">
      <view class="sec-top">{{ first === 0 ? "置顶" : " " }}</view>
      <scroll-view scroll-x="true">
        <view class="scroll-view">
          <view class="sec-name">{{ seclist.section }}</view>
        </view>
      </scroll-view>
    </view>
    <view class="scroll-list">
      <scroll-view class="test-papers" scrollX="true">
        <template v-for="(item, index) in seclist['exams']">
          <view
            :key="index"
            :class="index === 0 ? 'test-item' : 'test-item-nofirst'"
            :data-knowledgePointId="seclist.id"
            :data-submitStatus="item.status"
            :data-examId="item.id"
            @tap="toExam"
          >
            <view v-if="item['status'] === 1 && item['ratio'] < 0.25">
              <image class="image" :src="didimg1"></image>
              <text class="paper-name">{{ item["exam"] }}</text>
            </view>
            <view
              v-else-if="
                item['status'] === 1 &&
                item['ratio'] >= 0.25 &&
                item['ratio'] < 0.5
              "
            >
              <image class="image" :src="didimg2"></image>
              <text class="paper-name">{{ item["exam"] }}</text>
            </view>
            <view
              v-else-if="
                item['status'] === 1 &&
                item['ratio'] >= 0.5 &&
                item['ratio'] < 0.75
              "
            >
              <image class="image" :src="didimg3"></image>
              <text class="paper-name">{{ item["exam"] }}</text>
            </view>
            <view v-else-if="item['status'] === 1 && item['ratio'] >= 0.75">
              <image class="image" :src="didimg4"></image>
              <text class="paper-name">{{ item["exam"] }}</text>
            </view>
            <view v-else>
              <image class="image" :src="nodidimg"></image>
              <text class="nopaper-name">{{ item["exam"] }}</text>
            </view>
          </view>
        </template>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro";
import paper0 from "../../assets/pic/paper0.png";
import paper1 from "../../assets/pic/paper1.png";
import paper2 from "../../assets/pic/paper2.png";
import paper3 from "../../assets/pic/paper3.png";
import paper4 from "../../assets/pic/paper4.png";

export default {
  data() {
    return {
      didimg1: paper1,
      didimg2: paper2,
      didimg3: paper3,
      didimg4: paper4,
      nodidimg: paper0,
      status: 0,
    };
  },
  props: {
    first: Number,
    videoId: Number,
    seclist: Object,
  },
  methods: {
    // 判断status
    toExam(e) {
      const { knowledgePointId, examId, submitStatus } = e.currentTarget.dataset;
      if (submitStatus === 0) {
        Taro.navigateTo({
          url: `/pages/exam/index?examId=${examId}&&knowledgePointId=${knowledgePointId}`,
        });
      } else {
        Taro.navigateTo({
          url: `/pages/points/index?knowledgepointid=${knowledgePointId}&&examId=${examId}`,
        });
      }
    },
  },
};
</script>

<style lang="less">
.sec-wrap {
  width: 706px;
  height: 200px;
  margin: 3px auto 0;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
}
.sec-chapter {
  position: absolute;
  height: 40px;
  width: 100%;
  top: 24px;
  left: 0;
  display: flex;
  align-items: center;
}
.sec-top {
  width: 84px;
  height: 40px;
  line-height: 40px;
  background-color: rgb(24, 219, 155);
  border-radius: 6px;
  color: #fff;
  font-size: 20px;
  font-family: "PingFang-SC-Regular";
  text-align: center;
}
.scroll-view {
  white-space: nowrap;
  width: 580px;
  overflow: auto;
}
.sec-name {
  display: inline-block;
  margin-left: 30px;
  font-size: 38px;
}
.sec-ratio {
  display: inline-block;
  margin-left: 30px;
  font-size: 20px;
}
.scroll-list {
  position: absolute;
  bottom: 36px;
  left: 62px;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.test-papers {
  width: 586px;
  height: 74px;
  white-space: nowrap;
}
.test-item {
  width: 65px;
  height: 73px;
  position: relative;
  display: inline-block;
}
.test-item-nofirst {
  width: 65px;
  height: 73px;
  margin-left: 99px;
  position: relative;
  display: inline-block;
}
.test-item .image,
.test-item-nofirst .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 65px;
  height: 73px;
}
.test-papers .paper-name {
  position: absolute;
  top: 9px;
  left: 2px;
  font-size: 24px;
  height: 73px;
  width: 32px;
  color: #fff;
  white-space: pre-wrap;
}
.nopaper-name {
  position: absolute;
  font-size: 24px;
  height: 73px;
  line-height: 73px;
  width: 60px;
  text-align: center;
}
</style>