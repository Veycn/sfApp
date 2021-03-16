<template>
  <view class="all-wrap">
    <block v-for="(item, index) in currentSubjects" :key="index">
      <view
        :class="['all-item', choosed === index ? 'active' : '']"
        @tap="choosedSubject"
        :data-idx="item.id"
        :data-index="index"
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
      allSubjects: [],
      choosed: -1,
      id: -1,
    };
  },

  methods: {
    choosedSubject(e) {
      let index = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.idx;
      if (this.data.isTap) {
        this.setData({
          choosed: index,
          id,
        });
        this.triggerEvent("choosedSubject", { id: this.data.id });
      }
    },
  },
};
</script>

<style lang="less">
.all-wrap {
  width: 645rpx;
  min-height: 40rpx;
  overflow: hidden;
}
.all-item {
  float: left;
  width: 210rpx;
  line-height: 60rpx;
  margin-top: 18rpx;
  text-align: center;
  border: 1rpx dashed #ccc;
}
.all-item-left {
  margin-left: 42rpx;
}
.all-item-right {
  margin-left: 130rpx;
}
.active {
  background-color: rgb(19, 109, 184);
  color: #ffffff;
}
</style>