<template>
  <view class="all-wrap">
    <block wx:for="{{ allGrades }}" wx:key="index">
      <view
        bindtap="chooseGrade"
        data-idx="{{ item.id }}"
        data-index="{{ index }}"
        class="all-item {{ choosed === index ? 'active' : '' }}"
      >
        {{ item.subject }}
      </view>
    </block>
  </view>
</template>

<script lang="ts">
export default {
  data() {
    return {
      choosed: -1,
      id: -1,
    };
  },

  methods: {
    chooseGrade(e) {
      let index = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.idx;
      this.setData({
        choosed: index,
        id,
      });
      this.triggerEvent("choosedType", {
        choosed: this.data.choosed,
        id: this.data.id,
      });
    },
  },
};
</script>

<style lang="less">
.all-wrap {
  min-height: 60rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.all-item {
  width: 120rpx;
  line-height: 60rpx;
  margin-top: 18rpx;
  text-align: center;
  background: #ccc;
  border-radius: 4rpx;
  font-size: 30rpx;
  border: 1rpx solid #ccc;
  margin-left: 60rpx;
}
.all-item:nth-child(3n + 1) {
  margin-left: 0;
}
.active {
  background-color: rgb(19, 109, 184);
  color: #ffffff;
}
</style>