<template>
  <scroll-view
    scroll-y="true"
    class="btn-container"
  >
    <block
      v-for="(item, index) in scantronList"
      :key="index"
    >
      <view
        :data-index="index"
        :class="['default', isFinshed[index] > -1 ? 'active' : 'init']"
        @tap="rediretTopic"
      >
        {{ index + 1 }}
      </view>
    </block>
  </scroll-view>
</template>

<script lang="ts">
export default {
  props: {
    scantronList: Array,
    isFinshed: Array,
    submitAnswer: Object,
    isK: Boolean,
    spendTime: Number,
    hideAnswerCard: Function,
  },
  methods: {
    rediretTopic(e) {
      let currentIndex = e.target.dataset.index;
      this.hideAnswerCard && this.hideAnswerCard({ currentIndex });
    },
    onClose() {
      setTimeout(() => {
        this.hideAnswerCard && this.hideAnswerCard();
      }, 300);
    },
  },
};
</script>

<style lang="less">
.btn-container {
  width: 100%;
  height: 490px;
  box-sizing: border-box;
  margin-top: 39px;
  display: grid;
  justify-content: space-between;
  grid-auto-columns: repeat(4, 104px);
}
.btn-container .default {
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