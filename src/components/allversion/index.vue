<template>
  <view class="all-wrap">
    <block v-for="(item, index) in allVersion" :key="index">
      <block v-if="index % 2 === 0">
        <view
          :class="[
            'all-item',
            'all-item-left',
            choosed === index ? 'active' : '',
          ]"
          @tap="chooseVersion"
          :data-idx="item.id"
          :data-index="index"
        >
          {{ item.textbook }}
        </view>
      </block>
      <block v-else-if="index % 2 === 1">
        <view
          :class="[
            'all-item',
            'all-item-right',
            choosed === index ? 'active' : '',
          ]"
          @tap="chooseVersion"
          :data-idx="item.id"
          :data-index="index"
        >
          {{ item.textbook }}
        </view>
      </block>
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
    chooseVersion(e) {
      let choosed = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.idx;
      if (this.data.isTap) {
        this.setData({
          choosed,
          id,
        });
      }
      this.triggerEvent("choosedVersion", { choosed, id });
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