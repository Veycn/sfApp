<template>
  <view>
    <scroll-view class="scroll-view">
      <view :class="modal">
        <view class="nocomplete">
          <view class="exit">
            <image class="exit_img" @tap="cancel" :src="imgUrl" />
          </view>
          <view class="grade_box current">
            <view class="title">{{ title }}</view>
            <view class="choose">
              <view class="btn-choose" @tap="cancel">{{ errorbtn }}</view>
              <view class="btn-choose" @tap="confirm">{{ correctbtn }}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro';
export default {
  data() {
    return {
      imgUrl: "/assets/icon/exit.png",
      bgc: "grade_item_white",
    };
  },

  methods: {
    cancel: function () {
      Taro.eventCenter.trigger("hideExitModal", {
        isExitDetect: false,
      });
    },
    confirm: function () {
      Taro.eventCenter.trigger("hideExitModal", {
        isExitDetect: true,
      });
    },
  },
};
</script>

<style lang="less">
.nocomplete_frame_show {
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.nocomplete {
  z-index: 1000;
  position: fixed;
  width: 720px;
  background-color: #fff;
  height: 424px;
  top: 430px;
  left: -360px;
  margin-left: 50%;
  border-radius: 10px;
}
.scroll-view {
  z-index: 1000;
  height: 100%;
}
.exit {
  float: right;
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
}
.exit_img {
  width: 64px;
  height: 64px;
}

.grade_box {
  display: flex;
  flex-direction: column;
  width: 720px;
  height: 346px;
  justify-content: space-around;
  background-color: #fff;
  opacity: 1;
  flex-wrap: wrap;
}

.current {
  font-style: normal;
  font-family: "PingFang-SC-Regular";
}
.title {
  width: 400px;
  height: 60px;
  line-height: 60px;
  font-family: PingFang-SC-Regular;
  font-size: 36px;
  margin: 20px auto;
  text-align: center;
}
.choose {
  width: 512px;
  height: 88px;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.btn-choose {
  width: 200px;
  height: 80px;
  line-height: 80px;
  background-color: #fcdd29;
  text-align: center;
  font-family: PingFang-SC-Regular;
  border-radius: 10px;
}
</style>