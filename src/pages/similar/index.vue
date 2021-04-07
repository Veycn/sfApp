<template>
  <view class="similar">同类</view>
</template>
<script>
import API from '../../utils/api'
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
    }
  }
}
</script>