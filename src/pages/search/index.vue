<template>
  <view class="index">
    <view class="search">
      <input type="text" focus @input="onChange" />
      <text @tap="search">搜索</text>
    </view>

    <view class="courseList" v-if="hasList">
      <view
        class="listItem"
        v-for="(item, index) in courseList"
        :key="index"
        @tap="showCourse(item.courseName)"
      >
        <text>{{ item.courseName }}</text>
      </view>
    </view>
    <!-- 课程卡片 -->
    <block v-for="(item, index) in course" :key="index" v-else>
      <course
        :courseId="item.courseId"
        :title="item.courseName"
        :course-duration="item.courseDuration"
        :teacherName="item.teacherName"
        :teacherImage="
          item.teacherAvatar ? item.teacherAvatar : '/assets/icon/pic.png'
        "
        :sales="item['sales']"
        :section="item['section']"
        :courseImage="item.courseAvatar"
        :stars="item.courseStars"
        :price="item.coursePrice"
        :videoId="item.ossVideoId"
        :handleTap="toPlay"
      />
    </block>

    <!-- 历史记录 -->
    <view class="history" v-if="storageFlag">
      <text class="tip">历史记录</text>
      <text class="clear" @tap="clearHistory">清除历史记录</text>
      <view class="list">
        <view
          class="item"
          v-for="(item, index) in storageList"
          :key="index"
          @tap="showCourse(item)"
          >{{ item }}</view
        >
      </view>
    </view>

    <view class="noSearchData" v-if="searchFlag"
      >抱歉！没有查询到你想要搜索的内容，请换个关键词试试。</view
    >
  </view>
</template>


<script>
import Taro from "@tarojs/taro";
import request from "../../utils/http";
import course from "../../components/course/index.vue";
import Utils from "../../utils/utils";
export default {
  data() {
    return {
      courseList: [],
      course: [],
      hasList: false,
      storageFlag: false,
      storageList: [],
      value: "",
      searchFlag: false,
    };
  },
  created() {
    Taro.getStorage({
      key: "searchList",
      success: (res) => {
        if (res.data.length !== 0) {
          (this.storageFlag = true), (this.storageList = res.data);
        }
      },
    });
  },
  methods: {
    onChange(e) {
      this.value = e.detail.value;
      if (e.detail.value === " ") {
        this.courseList = [];
        this.hasList = false;
      } else {
        this.getSearchCourse(e.detail.value);
      }
    },
    getSearchCourse(value) {
      request
        .get({
          url: "api/recommendCourse/searchCourse",
          params: {
            courseName: this.value,
          },
        })
        .then((res) => {
          if (res.data.data.length) {
            this.storageFlag = false;
            this.courseList = res.data.data;
            this.hasList = true;
            this.searchFlag = false;
          }
        });
    },
    search() {
      // 有相关关键词直接显示课程卡片
      if (this.value) {
        request
          .get({
            url: "api/recommendCourse/searchCourse",
            params: {
              courseName: this.value,
            },
          })
          .then((res) => {
            if (res.data.data.length) {
              this.hasList = false;
              this.storageFlag = false;
              this.course = res.data.data;
            } else {
              this.searchFlag = true;
            }
          });
        let flag = true;
        this.storageList.forEach((item) => {
          if (item == this.value) {
            return (flag = false);
          }
        });
        if (flag) {
          Taro.getStorage({
            key: "searchList",
            success: (res) => {
              if (res.data.length === 6) {
                res.data.pop();
                console.log(res.data);
              }
              res.data.unshift(this.value);
              Taro.setStorage({
                data: res.data,
                key: "searchList",
                success: () => {
                  console.log("保存成功");
                },
              });
            },
            fail: () => {
              let searchList = [];
              searchList.push(this.value);
              Taro.setStorage({
                data: searchList,
                key: "searchList",
                success: () => {
                  console.log("保存成功");
                },
              });
            },
          });
        }
      }
    },
    showCourse(name) {
      let courseName = name;
      request
        .get({
          url: "api/recommendCourse/searchCourse",
          params: {
            courseName: courseName,
          },
        })
        .then((res) => {
          if (res.data.data.length) {
            this.hasList = false;
            this.storageFlag = false;
            this.course = res.data.data;
          } else {
            this.searchFlag = true;
          }
        });
      let flag = true;
      this.storageList.forEach((item) => {
        if (item == courseName) {
          return (flag = false);
        }
      });
      if (flag) {
        Taro.getStorage({
          key: "searchList",
          success: (res) => {
            if (res.data.length === 6) {
              res.data.pop();
              console.log(res.data);
            }
            res.data.unshift(courseName);
            Taro.setStorage({
              data: res.data,
              key: "searchList",
              success: () => {
                console.log("保存成功");
              },
            });
          },
          fail: () => {
            let searchList = [];
            searchList.push(courseName);
            Taro.setStorage({
              data: searchList,
              key: "searchList",
              success: () => {
                console.log("保存成功");
              },
            });
          },
        });
      }
    },
    clearHistory() {
      Taro.removeStorage({
        key: "searchList",
        success: () => {
          this.setStorage = false;
          this.storageList = [];
        },
      });
    },
    toPlay(videoId, playId, sales, stars, poster) {
      Taro.navigateTo({url: `/pages/play/index?source=${1}&courseId=${videoId}&playId=${videoId}&sales=${sales}&stars=${stars}&poster=${poster}`})
    },
  },
  components: {
    course,
  },
};
</script>


<style lang="less">
page {
  background-color: black;
}
.search {
  margin: 0 26px 24px;
  height: 75px;
  position: relative;
  background-color: #2d2d2d;
}

.search > text {
  position: absolute;
  right: 24px;
  width: 90px;
  top: 20px;
  height: 42px;
  background-color: #15ec89;
  border-radius: 19px;
  color: black;
  font-size: 24px;
  text-align: center;
  line-height: 42px;
}

.search input {
  width: 456px;
  position: absolute;
  top: 14px;
  left: 15px;
  font-size: 26px;
  color: #a9a9a9;
  font-size: 24px;
}

.courseList {
  padding: 0 26px;
  height: 50px;
  z-index: 999em;
}

.listItem {
  display: flex;
  align-items: center;
  font-size: 24px;
  border-bottom: 1px solid #000000;
  height: 72px;
  color: #a9a9a9;
  background-color: #1a1a1a;
  font-size: 24px;
  padding-left: 15px;
}

.history {
  margin: 20px 26px 0;
  position: relative;
}

.history .tip {
  font-size: 22px;
  color: #fff;
  margin-bottom: 40px;
}

.history .clear {
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 22px;
  color: #fff;
}

.history .list {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
}

.list > .item {
  padding: 10px 26px;
  height: 44px;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #2d2d2d;
  font-size: 20px;
  font-family: PingFang SC;
  margin-right: 44px;
  margin-bottom: 24px;
}

.noSearchData {
  font-size: 26px;
  color: #bfbfbf;
  width: 500px;
  margin: 40px auto;
  text-align: center;
}
</style>