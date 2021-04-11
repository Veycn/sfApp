<template>
  <view class="similar">
    <view class="s-course" v-for="item in 3" @tap="toPlay">
      <view class="title f-30 c-fff">对面路口等我去了大吉大利委屈的</view>
      <view class="info flex f-fd-r f-jc-sb">
        <view class="teacher flex ">
          <image class="img" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2662097736,3011062945&fm=26&gp=0.jpg"/>
          <view class="c-fff f-24">主讲师：{{'大声点'}}</view>
        </view>
        <view class="other flex ">
          <view class="sub c-fff"><text class="iconfont icon-share"></text> 123</view>
          <view class="sub c-fff"><text class="iconfont icon-like1 red"></text> 123</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import API from '../../utils/api'
import Taro from '@tarojs/taro'
export default {
  name: "Similar",
  onLoad(e){
    console.log(e);
    this.courseId = e.id || 0;
  },
  data(){
    return {
      courseId: 0
    }
  },
  created(){
    this.getSimilarCourse()
  },
  methods: {
    getSimilarCourse(){
      API.getSimilarCourse({
        courseId: this.courseId
      }).then(res => {
        console.log(res);
        this.courseList = res
      })
    },
    toPlay(){
      Taro.navigateTo({url: `/pages/play/index?courseId=10`})
    }
  }
}
</script>

<style lang="less">
.similar{
  width: 100vw;
  height: 100vh;
  background-color: #000;
  padding: 25px;
  .s-course{
    width: 700px;
    padding: 30px 38px;
    box-sizing: border-box;
    background-color: #2d2d2d;
    margin-bottom: 10px;
    .title{
      margin-bottom: 20px;
    }
    .info{
      .img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 22px;
      }
      .other{
        .sub{
          margin-left: 40px;
          .iconfont{
            font-size: 40px;
          }
        }
      }
    }
  }
}
</style>
