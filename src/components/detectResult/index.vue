<template>
  <view class="c-wrapper">
    <view class="content">
      <view class="decorate">
        <view
          class="item"
          v-for="(item, index) in pointNumber"
          :key="index"
        ></view>
      </view>
      <view class="text">
        <view v-for="(item, index) in titleList" :key="index" class="title">
          {{ item }} : <text class="data">{{ resultArr[index] }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {};
</script>

<style lang="less">
.content {
  position: relative;
  width: 100%;
  height: auto;
}
.decorate {
  position: absolute;
  left: 204px;
  width: 100%;
}
.decorate > .item {
  width: 18px;
  height: 18px;
  background: #ccc;
  border-radius: 50%;
  margin-bottom: 60px;
  position: relative;
}

.decorate > .item::after {
  content: "";
  display: block;
  width: 2px;
  height: 78px;
  background: #ccc;
  position: absolute;
  left: 9px;
}

.decorate > .item:last-child::after {
  display: none;
}

.text {
  position: absolute;
  left: 250px;
}

.text .title {
  margin-bottom: 46px;
  font-size: 30px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
}

.text > .title > .data {
  color: #15da7f;
}
</style>