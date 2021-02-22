<template>
  <view>
    <view class="title">{{ getNumbers }}</view>
  </view>
</template>

<script>
export default {
  name: 'NumberDisplay',
  computed: {
    getNumbers() {
      return this.$store.getters.getNumbers;
    }
  }
}
</script>

<style lang="less">
// .view {
  // width: 100%;
  .title {
    width: 750px;
    font-size: 40px;
  }
// }

</style>
