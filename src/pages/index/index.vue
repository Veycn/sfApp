<template>
  <view class="index">
    认知检测
    <input class="ipt" @input="onInput"></input>
    <view>{{value}}</view>
  </view>
</template>

<script>

export default {
  name: 'Index',
  data(){
    return {
      value: ''
    }
  },
  methods: {
    onInput(e){
      this.value = e.detail.value;
    }
  },
  components: {
  }
}
</script>

<style lang="less">
  .ipt{
    border: 1px solid #ddd;
  }
</style>
