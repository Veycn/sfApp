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
    <view class="scroll">
      <scroll-view class="test-papers" style="width: 586rpx" scroll-x="true">
        <block
          v-for="(item, index) in seclist.exams"
          v-for-item="exams"
          :key="index"
        >
          <view
            :class="index === 0 ? 'test-item' : 'test-item-nofirst'"
            @tap="toExam"
            :data-knowledgePointId="seclist.id"
            :data-submitStatus="exams.status"
            :data-examId="exams.id"
          >
            <block v-if="exams.status === 1 && exams.ratio < 0.25">
              <image class="image" :src="didimg1"></image>
              <text class="paper-name">{{ exams.exam }}</text>
            </block>
            <block
              v-else-if="exams.status === 1 && exams.ratio >= 0.25 &&  exams.ratio < 0.5"
            >
              <image class="image" :src="didimg2"></image>
              <text class="paper-name">{{ exams.exam }}</text>
            </block>
            <block
              v-else-if="exams.status === 1 && exams.ratio >= 0.5 &&  exams.ratio < 0.75"
            >
              <image class="image" :src="didimg3"></image>
              <text class="paper-name">{{ exams.exam }}</text>
            </block>
            <block v-else-if="exams.status === 1 && exams.ratio >= 0.75">
              <image class="image" :src="didimg4"></image>
              <text class="paper-name">{{ exams.exam }}</text>
            </block>
            <block v-else>
              <image class="image" :src="nodidimg"></image>
              <text class="nopaper-name">{{ exams.exam }}</text>
            </block>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
</script>

<style lang="less">
.sec-wrap {
  width: 706rpx;
  height: 200rpx;
  margin: 3rpx auto 0;
  border-radius: 10rpx;
  background-color: #fff;
  position: relative;
}
.sec-chapter {
  position: absolute;
  height: 40rpx;
  width: 100%;
  top: 24rpx;
  left: 0;
  display: flex;
  align-items: center;
}
.sec-top {
  width: 84rpx;
  height: 40rpx;
  line-height: 40rpx;
  background-color: rgb(24, 219, 155);
  border-radius: 6rpx;
  color: #fff;
  font-size: 20rpx;
  font-family: "PingFang-SC-Regular";
  text-align: center;
}
.scroll-view {
  white-space: nowrap;
  width: 580rpx;
  overflow: auto;
}
.sec-name {
  display: inline-block;
  margin-left: 30rpx;
  font-size: 38rpx;
}
.sec-ratio {
  display: inline-block;
  margin-left: 30rpx;
  font-size: 20rpx;
}
.scroll {
  position: absolute;
  bottom: 36rpx;
  left: 62rpx;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.test-papers {
  width: 586rpx;
  height: 74rpx;
  white-space: nowrap;
}
.test-item {
  width: 65rpx;
  height: 73rpx;
  position: relative;
  display: inline-block;
}
.test-item-nofirst {
  width: 65rpx;
  height: 73rpx;
  margin-left: 99rpx;
  position: relative;
  display: inline-block;
}
.test-item .image,
.test-item-nofirst .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 65rpx;
  height: 73rpx;
}
.test-papers .paper-name {
  position: absolute;
  top: 9rpx;
  left: 2rpx;
  font-size: 24rpx;
  height: 73rpx;
  width: 32rpx;
  color: #fff;
  white-space: pre-wrap;
}
.nopaper-name {
  position: absolute;
  font-size: 24rpx;
  height: 73rpx;
  line-height: 73rpx;
  width: 60rpx;
  text-align: center;
}
</style>