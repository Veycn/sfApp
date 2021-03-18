<template>
<view class="view">
  <image src="../../assets/icon/teacherbanner.png" mode="widthFix" class="banner"></image>
  <view class="content">
    <view class="item" style="background-color: rgb(21,218,127);">
      <image src="../../assets/icon/book.png" mode="widthFix" class="icon"></image>
      <text class="txt">课程总收入: ¥{{Income.totalIncome}}元</text>
    </view>
    <view class="item" style="background-color: rgb(58,120,253);">
      <image src="../../assets/icon/graph.png" mode="widthFix" class="icon"></image>
      <text class="txt">我的总收入: ¥{{Income.teacherTotalIncome}}元</text>
    </view>
  </view>
  <block v-for="item in courseList" :key="item.course_id">
    <descourse :courseId="item.id" :group-info="item['group_info']" 
      :title="item.course_name"
      :course-duration="item.course_duration" :teacherName="item.teacher_name"
      :teacherImage="item.teacher_avatar?item.teacher_avatar:'../../assets/icon/pic.png'"
      :sales="item['course_sales']"  :section="item['course_section']"
      :courseImage="item.course_cover_url" :stars="item.course_stars" :course-name="item.course_name"
      :_income="item.income"
      :price="item.course_price" source="teacher" :play-id="item.oss_video_id" :course-intro="item.course_intro" :income="Income"/>
  </block>
</view>
</template>


<script>
import Taro from '@tarojs/taro'
// import request from '../../utils/http'
import descourse from '../../components/descourse/index.vue'

export default {
  components:{
    descourse,
  },
  data() {
    return {
      courseList: [],
      Income: {},
      teacherToken: ''
    }
  },
  created() {
    Taro.getStorage({
      key: 'teacherToken',
      success: res => {
        this.teacherToken = res.data;
        this.getData();
        this.getData2();
      }
    })
  },
  methods: {
    getData () {
      Taro.request({
        url: 'https://www.shenfu.online/sfeduWx/api/teacherAccount/getTotalIncome',
        method: 'GET',
        header: {
          token: this.teacherToken,
          'contentType': "application/json"
        },
        success: res => {
          this.Income = res.data.data;
          Taro.setStorageSync('Income', JSON.stringify(res.data.data))
        },
      })
  },
  
  getData2 () {
      Taro.request({
        url: 'https://www.shenfu.online/sfeduWx//api/teacherAccount/getIncomeByCourse',
        method: 'GET',
        header: {
          token: this.teacherToken,
          'contentType': "application/json"
        },
        success: res => {
           this.courseList = res.data.data;
        },
      })
  },
  },
}
</script>


<style lang="less">
.view {
  background-color:#101010;
}
.banner {
  width: 750px;
}

.item {
  width: 600px;
  height: 103px;
  margin: 40px auto;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 33px;
  height: 33px;
  margin: 35px;
  flex-basis: 15px;
}

.txt {
  font-size: 28px;
  color: #fff;
  display: inline-block;
  flex: 1;
  /* margin-left: 36px; */
  /* vertical-align: top; */
}
</style>