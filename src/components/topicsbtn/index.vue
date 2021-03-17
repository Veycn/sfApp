<template>
  <scroll-view scroll-y="true" class="container">
    <block v-for="(item, index) in scantronList" :key="index">
      <view
        @tap="rediretTopic"
        :data-index="index"
        :class="['default', isFinshed[index] > -1 ? 'active' : 'init']"
        >{{ index + 1 }}</view
      >
    </block>
  </scroll-view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro';
export default {
  props: {
    scantronList: Array,
    isFinshed:Array,
    submitAnswer: Object,
    isK: Boolean,
    spendTime: Number
  },
  methods: {
    rediretTopic(e) {
      let currentIndex = e.currentTarget.dataset.index;
      Taro.eventCenter.trigger("rediretTopic", { currentIndex });
    },
    onClose() {
      setTimeout(() => {
        Taro.eventCenter.trigger("hideAnswerCard");
      }, 300);
    },
    // 提交并查看结果
    watchResult() {
      Taro.eventCenter.trigger("isSubmit");
    },
  },
};
</script>

<style lang="less">
.container {
  width: 100%;
  height: 490px;
  box-sizing: border-box;
  padding: 0 50px;
  margin-top: 39px;
}
.container .default {
  display: inline-block;
  width: 104px;
  text-align: center;
  border-radius: 50%;
  font-size: 30px;
  line-height: 104px;
  margin-left: 67px;
  margin-bottom: 46px;
  font-family: "Adobe Heiti Std R";
  border: 1px solid rgba(230, 230, 230, 1);
}
.container .default:nth-child(4n + 1) {
  margin-left: 0;
}
.init {
  background-color: #ffffff;
  color: #626262;
}

.active {
  background-color: #15da7f;
  color: #ffffff;
}
.tip {
  width: 400px;
  line-height: 60px;
  background-color: rgb(21, 236, 137);
  border-radius: 30px;
  margin: 60px auto 30px;
  text-align: center;
  color: #fff;
  font-size: 30px;
}
</style>