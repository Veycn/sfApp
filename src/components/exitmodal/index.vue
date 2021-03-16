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
export default {
  data() {
    return {
      imgUrl: "/assets/icon/exit.png",
      bgc: "grade_item_white",
    };
  },

  methods: {
    cancel: function () {
      this.triggerEvent("hideExitModal", {
        isExitDetect: false,
      });
    },
    confirm: function () {
      this.triggerEvent("hideExitModal", {
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
  width: 720rpx;
  background-color: #fff;
  height: 424rpx;
  top: 430rpx;
  left: -360rpx;
  margin-left: 50%;
  border-radius: 10rpx;
}
.scroll-view {
  z-index: 1000;
  height: 100%;
}
.exit {
  float: right;
  width: 64rpx;
  height: 64rpx;
  margin-bottom: 10rpx;
}
.exit_img {
  width: 64rpx;
  height: 64rpx;
}

.grade_box {
  display: flex;
  flex-direction: column;
  width: 720rpx;
  height: 346rpx;
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
  width: 400rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-family: PingFang-SC-Regular;
  font-size: 36rpx;
  margin: 20rpx auto;
  text-align: center;
}
.choose {
  width: 512rpx;
  height: 88rpx;
  margin: 10rpx auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.btn-choose {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #fcdd29;
  text-align: center;
  font-family: PingFang-SC-Regular;
  border-radius: 10rpx;
}
</style>