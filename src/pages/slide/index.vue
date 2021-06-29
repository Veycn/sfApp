<template>
  <view class="slide-view" v-if="loaded">
    <v-scroller :useType="useType" :courseId="courseId" :courseName="courseName" :startIndex="startIndex"></v-scroller>
  </view>
</template>
<script>
import API from '../../utils/api'
import Taro from '@tarojs/taro'
import VScroller from '../../components/vscroller/index.vue'
export default {
  name: "SlideView",
  onLoad(options){
    console.log(options);
    this.useType = options.type || 2;
    this.courseId = options.courseId || 1;
    this.courseName = options.courseName || ''
    this.startIndex = options.startIndex || 0
    this.loaded = true
  },
  data(){
    return {
      loaded: false,
      useType: 2,
      courseId: 1,
      courseName: '',
      startIndex: 0
    }
  },
  created(){
  },
  methods: {
  },
  components: {
    VScroller
  }
}
</script>

<style lang="less">
.slide-view{
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
}
</style>
