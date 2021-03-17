<template>
  <view class="wrapper">
    <view class="tag" :style="{ background: activeColor }"></view>
    <view class="title">
      <text class="text">{{ tagName }}</text>
    </view>
    <view class="content">
      <block v-for="(item, index) in renderList" :key="index">
        <view
          class="item"
          @tap="itemChoosed"
          :style="{ background: activeIndex === index ? activeColor : '#ccc' }"
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
import Taro from '@tarojs/taro';
export default {
  props: {
    tagName: String,
    renderList: Array,
    type: String,
    activeColor: String,
  },
  data() {
    return {
      activeIndex: -1,
    };
  },

  methods: {
    itemChoosed(e) {
      let { item, index } = e.currentTarget.dataset;
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
  background: #fff;
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
  background: royalblue;
  position: absolute;
  left: -10px;
  top: 45px;
}
.wrapper .title {
  padding-left: 120px;
}
.wrapper .title .text {
  font-size: 48px;
  font-weight: bold;
  color: rgba(28, 27, 27, 1);
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

.content .item {
  display: inline-block;
  min-width: 132px;
  height: 60px;
  background: #ccc;
  text-align: center;
  box-sizing: border-box;
  font-size: 21px;
  line-height: 60px;
  margin: 0 20px 25px 20px;
  border-radius: 4px;
  padding: 0 10px;
  color: #fff;
}
</style>