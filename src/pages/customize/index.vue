<template>
  <view class="index">
    <view class="search" @tap="toSearch"><text class="iconfont icon-search f-48 bold"></text></view>
    <view class="list-wrapper" >
      <v-scroller ></v-scroller>
    </view>
  </view>
</template>

<script>
import VScroller from '../../components/vscroller/index.vue'
import Taro from '@tarojs/taro';
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    toSearch(){
      Taro.navigateTo({url: `/pages/search/index`})
    }
  },
  components: {
    VScroller
  },
};
</script>

<style lang="less">
.index {
  height: 100%;
  position: relative;
  background-color: #000;
  .search{
    position: absolute;
    right: 48px;
    top: 30px;
    color: #fff;
    height: 40px;
    z-index: 9999;
  }
  .list-wrapper {
    height: 100%;
    overflow: scroll;
    .scroller {
      height: 100%;
    }
  }
}
</style>
