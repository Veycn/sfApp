<template>
  <view class="wrapper">
    <view class="tag"></view>
    <view class="title">
      <text class="text">{{ tagName }}</text>
    </view>
    <view class="content">
      <block v-for="(item, index) in renderList" :key="index">
        <view
          class="c-item"
          @tap="itemChoosed"
          :style="{ background: activeIndex === index ? '#15DA7F' : 'transparent' }"
          :data-item="item"
          :data-index="index"
          >{{ item[type] }}</view
        >
      </block>
      <block v-if="type === 'grade'">
        <view class="item" @tap="showTip">高二</view>
        <view class="item" @tap="showTip">高三</view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro";
export default {
  data() {
    return {
      activeIndex: -1,
    };
  },
  props: {
    tagName: String,
    renderList: Array,
    type: String,
    activeColor: String,
  },
  methods: {
    itemChoosed(e) {
      const { item, index } = e.target.dataset;
      this.activeIndex = index;
      Taro.eventCenter.trigger("tagBeChoosed", { item, index });
    },
    showTip() {
      Taro.showToast({
        icon: "none",
        title: "敬请期待!",
      });
    },
  },
};
</script>

<style lang="less">
.wrapper {
  width: 700px;
  min-height: 270px;
  background: rgb(45, 45, 45);
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 25px;
  position: relative;
  box-sizing: border-box;
  padding: 32px 0px 0;
  border: 1px;
}

.wrapper .tag {
  width: 84px;
  height: 40px;
  background: #fff;
  position: absolute;
  border-radius: 4px;
  left: -10px;
  top: 45px;
}
.wrapper .title {
  padding-left: 120px;
}
.wrapper .title .text {
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
}

.content {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px 50px;
  display: flex;
  white-space: normal;
  flex-wrap: wrap;
}

.content .c-item {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 132px;
  height: 60px;
  background: transparent;
  box-sizing: border-box;
  font-size: 21px;
  margin: 0 20px 25px 20px;
  border-radius: 4px;
  color: #fff;
  border: 1px solid #fff;
}
</style>