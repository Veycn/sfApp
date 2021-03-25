<template>
  <view class="course">
    <view class="header flex f-fd-r f-jc-sb f-ai-c">
      <view class="title">{{title}}</view>
      <view class="price">
        <text class="num">{{price}}</text>
        <text class="sig">元</text>
      </view>
    </view>
    <view class="info flex f-fd-r f-ai-c f-jc-fs">
      <view class="info-item flex f-fd-r f-ai-c">
        <text class="iconfont icon-share">12</text>
        <text class="text">123</text>
      </view>
      <view class="info-item flex f-fd-r f-ai-c">
        <text class="iconfont icon-like">12</text>
        <text class="text">123</text>
      </view>
      <view class="info-item flex f-fd-r f-ai-c">
        <text class="iconfont icon-similar">12</text>
        <text class="text">123</text>
      </view>
    </view>
    <view class="bottom flex f-fd-r f-jc-sb f-ai-c">
      <view class="teacher flex f-fd-r f-ai-c">
        <image :src="teacherImage" class="avatar"></image>
        <view class="text">主讲师：{{teacherName}}</view>
      </view>
      <template v-if="!isBuy">
        <view class="buy active" @tap="toBuy">购买</view>
      </template>
      <template v-else>
        <view class="buy">已购</view>
      </template>
    </view>
  </view> 
</template>

<script>
export default {
  name: 'Course',
  props: {
    title:String,
    section:String,
    courseId:Number,
    courseDuration:String,
    teacherName:String,
    teacherImage:String,
    courseImage:String,
    courseStatus: Number,
    groupInfo: null,
    _income: String,
    price:String,
    sales: Number,
    section: String,
    stars:Number,
    videoId:String,
    source: String, // 组件被哪个页面使用
    playId: String,  // 视频播放id
    courseName: String, // 课程名称
    courseIntro: String, // 视频课程介绍,
    isBuy:{
      type:Boolean,
      value:false
    }, // 是否购买过
  },
  data(){
    return {}
  },
  created(){

  },
  methods: {
    toBuy(){

    }
  },
  computed: {

  }
}
</script>

<style lang="less">
.course{
  margin: 10px 26px;
  padding: 46px 40px;
  background-color: #2d2d2d;
  color: #fff;
  .header{
    .title{
      font-size: 30px;
    }
    .price{
      .num{
        font-size: 48px;
        font-weight: bold;
      }
      .sig{
        font-size: 24px;
      }
    }
  }
  .info{
    .info-item{
      margin-right: 32px;
      font-size: 20px;
      color: #fff;
    }
  }
  .bottom{
        padding-top: 20px;

    .teacher{
      font-size: 24px;
      .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    .buy{
        width: 90px;
        height: 40px;
        border-radius: 20px;
        background-color: #818181;
        color: #fff;
        font-size: 24px;
        text-align: center;
        line-height: 40px;
        &.active{
          background-color: #15EC89;
          color: #000;
        }
      }
  }
}
</style>