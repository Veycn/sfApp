<template>
<view class="lesson" @tap="tobuy">
  <image :src="courseImage" mode="widthFix" class="courseImage" />
  <view class="courseInfo">
    <text class="title">{{title}}</text>
    <view class="desc">
      <text class="section">{{section}}</text>
      <text class="space">|</text>
      <text class="buynum">{{sales}}人已购</text>
      <text class="space">|</text>
      <text class="star">{{stars}}</text>
      <image src="../../assets/icon/star.png" class="starImage"></image>
    </view>

    <view class="teacher">
      <image class="img" :src="teacherImage" />
      <text class="teacherName">主讲师：{{teacherName}}</text>
      <view class='buycourse' v-if="!isBuy">
        <!-- <text bindtap="tobuy" data-id="{{courseId}}">购买</text> -->
        <text style="color:#fff;">{{price}}</text>
        <text class="yuan">￥</text>
      </view>
      <view class="buycourse_active" v-else>已购买</view>
    </view>
  </view>
</view>
</template>

<script>
import Taro from '@tarojs/taro';
export default {
  data() {
    return {

    }
  },
  created() {
    console.log(this.title, this.courseName);
  },
  props:{
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
  methods: {
    tobuy(){
      let {courseId,teacherName,source,playId,courseIntro,courseName,videoId,isBuy, _income} = this.$props;
      Taro.navigateTo({
        url: `/pages/publicinfo/index?id=${courseId}&teacherName=${teacherName}&videoId=${videoId}&source=${source}&playId=${playId}&courseIntro=${courseIntro}&courseName=${courseName}&isBuy=${isBuy}&_income=${_income}`
      })
    },
  },
}
</script>


<style lang="less">
/* components/descourse/index.wxss */
.lesson {
  height: 220px;
  width: 668px;
  margin: 0 auto;
  margin-top: 24px;
  align-items: center;
  border-bottom: 1px solid #E3E3E3;
  display: flex;
  position: relative;
}
.courseImage {
  height: 154px;
  width: 154px;
}
.courseInfo {
  display: flex;
  flex-direction: column;
  margin-left: 42px;
}
.title {
  color: #fff;
  font-size: 30px;
  font-family:PingFang SC;
  font-weight:400;
  width: 500px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.desc {
  display: flex;
  color: #fff;
font-size:20px;
font-family:PingFang SC;
font-weight:400;
margin-top: 20px;
align-items: center;
}
.space {
  margin: 0 15px;
}

.teacher {
display: flex;
margin-top: 22px;
align-items: center;
}
.teacher .img {
 height: 50px;
 width: 50px;
 border-radius: 50%;
 overflow: hidden;
 margin-right: 24px;
}
.teacherName {
  color: #fff;
  font-size:24px;
  font-family:PingFang SC;
  font-weight:400;
}
.buycourse {
  font-size: 28px;
  position: absolute;
  right: 0;
  bottom: 38px;
}
.buycourse_active {
  font-size: 24px;
  position: absolute;
  right: 0;
  bottom: 38px;
  background-color:#23ED8D ;
  color:white;
  border-radius: 10px;
  padding: 8px;
}
.yuan {
  color: #fff;
}
.desc > .group {
  font-size: 20px;
  color: #fff;
}

.desc > .time{
  color: #009CFF;
}

.desc > .starImage {
  width: 26px;
  height: 24px;
  margin-left: 10px;
}

.gr {
  display: flex;
  justify-content: center;
  align-items: center;
}


.gr > .avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #ccc;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  margin-right: 22px;
  font-size: 20px;
  color: #fff;
}


.gr > .avatar > .img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

</style>