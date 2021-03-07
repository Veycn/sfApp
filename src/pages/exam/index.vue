<template>
  <view class="clock-container">
    <view class="{{ isShowExitModal ? 'show':'hide' }}">
      <s-exitmodal bindhideExitModal="hideExitModal" />
    </view>
    <block wx:if="{{ isShowAnswerCard }}">
      <s-answercard bindhideAnswerCard="hideAnswerCard" bindisSubmit="isSubmit">
        <s-topicsbtn
          submitAnswer="{{examTemp}}"
          slot="scantron"
          isFinshed="{{ userAnswers }}"
          bindrediretTopic="rediretTopic"
          scantron-list="{{ topicsList }}"
          bindhideAnswerCard="hideAnswerCard"
          spendTime="{{spendTime}}"
        />
      </s-answercard>
    </block>
    <view class="clock-wrap">
      <view class="clock-list">
        <view class="timer {{type == 'isKnowledge' ? 'hide' : ''}}">
          <view class="item-one">
            <image class="img" mode="widthFix" src="{{szimg}}" />
            <text class="item-text">{{ minutes }}:{{ seconds }}</text>
          </view>
        </view>
        <view class="answer-card" bindtap="showAnswerCard">答题卡/提交</view>
        <view>{{ topicsList.length }}/{{ currentTopicIndex + 1 }}</view>
      </view>
    </view>

    <view class="topic-wrap">
      <swiper bindchange="nextTopic" current="{{ currentTopicIndex }}">
        <block wx:for="{{ topicsList }}" wx:key="index">
          <swiper-item>
            <view>
              <view class="topic-img">
                <image mode="widthFix" src="{{ item.url }}" />
              </view>
              <view class="quetype">
                <view class="quetype-con">
                  <view class="item"
                    ><image mode="widthFix" src="{{ tyimg }}" />单选题</view
                  >
                </view>
              </view>
              <view class="btn-wrap">
                <block wx:for="{{ answerLists }}" wx:key="index">
                  <view
                    wx:if="{{type == 'isKnowledge'}}"
                    class="q btn-item {{ choosedTopicIndex===index?'active' : '' }}"
                    data-index="{{ index }}"
                    bindtap="getUserAnswer"
                    >{{
                      choosedTopicIndex === index &&
                      topicsList[currentTopicIndex]["userAnswer"] ===
                        index + 1 &&
                      topicsList[currentTopicIndex]["judgeResult"] === 1
                        ? "✔"
                        : item
                    }}</view
                  >

                  <view
                    wx:else
                    class="btn-item {{ choosedTopicIndex===index?'active':'abc' }}"
                    data-index="{{ index }}"
                    bindtap="getUserAnswer"
                  >
                    {{ item }}
                  </view>
                </block>
              </view>
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>
    <view class="footer">
      <view class="tip-b">点击答题卡可提交已测试题目</view>
      <view class="tip-s"
        >如果著作权人发现，请第一时间通知我们，我们马上删除。</view
      >
    </view>
  </view>
</template>

<script>
const { request, getHeader } = require("../../utils/request.js");
const header = {
  "content-type": "application/json",
};

import ExitModal from "../../components/exitmodal/index.vue";
import TopicsBtn from "../../components/topicsbtn/index.vue";
import AnswerCard from "../../components/answercard/index.vue";

export default {
  data() {
    return {
      szimg: "../../assets/icon/clock.png",
      tyimg: "../../assets/icon/icon_circle.png",
      psimg: "../../assets/icon/icon_poss.png",
      minutes: "00",
      seconds: "00",
      timer: null, // 倒计时 器
      forwardtimer: null, //正向计时器
      lasttime: 0, // 过去的秒数
      isDone: true,
      answerLists: ["A", "B", "C", "D"],
      isLastTopic: false,
      isSubmit: false,
      submited: false,
      currentTopicIndex: 0,
      topicsLength: 1,
      topicsList: [],
      isShowAnswerCard: false,
      isShowExitModal: false,
      choosedTopicIndex: -1,
      type: "",
      count: [], // 用来记录用户做过题的数量
      userAnswers: [], // 记录用户做过的题目
      examKnowledgeTemp: {
        examId: 0,
        examItemTempList: [],
      },
      examSectionTemp: {
        dealType: 0,
        examItemTempList: [],
        examId: 0,
        timeSecond: 0,
        timeWay: 0,
      },
      examId: 0,
      intervalTime: 1000 * 60, // 自动保存的间隔时间
      stimer: null,
      sectionId: 0,
      sectionName: "",
      tempSaveAns: [],
      query: {},
    };
  },

  onLoad: function (options) {
    if (options.isKnowledge) {
      this.setData({
        type: "isKnowledge",
        examId: options.examId,
        sectionId: options.sectionId,
        sectionName: options.sectionName,
      });
    }
    this.getTopicsList(options.examId, options.knowledgePointId);
  },
  onShow: function () {
    if (this.data.isKnowledge !== "isKnowledge") {
      this.autoSave();
    }
  },
  onUnload: function () {
    if (this.data.isKnowledge !== "isKnowledge") {
      clearInterval(this.data.stimer);
      this.clearTimer();
      this.clearForTimer();
      if (!this.data.submited) {
        console.log("页面卸载时保存");
        this.saveAns();
      }
    }
  },
  methods: {
    init: function () {
      this.setData({
        minutes: "00",
        second: "00",
      });
    },
    // 清除倒计时的计时器
    clearTimer: function () {
      clearInterval(this.data.timer);
      this.setData({
        timer: null,
      });
      this.init();
    },
    // 清除正向计时器
    clearForTimer: function () {
      clearInterval(this.data.forwardtimer);
      this.setData({
        forwardtimer: null,
      });
      this.init();
    },
    forwardCount() {
      var forwardtimer = setInterval(() => {
        var forwardtime = this.data.examSectionTemp.timeSecond + 1;
        this.setData({
          ["examSectionTemp.timeSecond"]: forwardtime,
          ["examSectionTemp.timeWay"]: 1,
        });
        var str = this.conversion(forwardtime).split(":");
        this.setData({
          minutes: str[0],
          seconds: str[1],
        });
        if (this.data.isSubmit) {
          this.setData({
            isSubmit: false,
            submited: true,
          });
          this.spendAllTime();
        }
      }, 1000);
      this.setData({
        forwardtimer,
      });
    },
    countDown: function (duration) {
      if (duration <= 0) {
        this.clearTimer();
        this.forwardCount();
      }
      return this.conversion(duration);
    },
    conversion: function (time) {
      var seconds = this._format(time % 60);
      var minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      return `${minutes}:${seconds}`;
    },
    _format: function (time) {
      return time >= 10 ? time : `0${time}`;
    },
    runCountDown: function (initDuration) {
      console.log(`总时间为${initDuration}`);
      var timer = setInterval(() => {
        var totalseconds = initDuration;
        var lasttime = this.data.lasttime + 1;
        totalseconds = totalseconds - lasttime;
        this.setData({
          lasttime,
          ["examSectionTemp.timeSecond"]: totalseconds,
        });
        var str = this.countDown(totalseconds).split(":");
        this.setData({
          minutes: str[0],
          seconds: str[1],
        });
        // 判断是否提交，如果提交计算做题花费总时间
        if (this.data.isSubmit) {
          this.setData({
            isSubmit: false,
            submited: true,
          });
          this.spendAllTime();
        }
      }, 1000);
      this.setData({
        timer,
      });
    },
    saveAns() {
      let sign = "save";
      console.log(`倒计时时间${this.data.examSectionTemp.timeSecond}`);
      this.setData({
        ["examSectionTemp.dealType"]: 1,
      });
      this.subOrSaveReq(sign);
    },
    autoSave() {
      let stimer = setInterval(() => {
        this.saveAns();
      }, this.data.intervalTime);
      this.setData({
        stimer,
      });
    },
    // 显示答题卡
    showAnswerCard() {
      this.setData({
        isShowAnswerCard: true,
      });
    },
    // 点击答题卡中的按钮进行跳转
    rediretTopic(e) {
      let currentTopicIndex = e.detail.currentIndex;
      this.setData({
        currentTopicIndex,
        isShowAnswerCard: false,
      });
    },
    // 隐藏答题卡
    hideAnswerCard() {
      this.setData({
        isShowAnswerCard: false,
      });
    },
    getDoneQue() {
      let doneArr = [];
      let quesArr = this.data.tempSaveAns;
      for (let i = 0; i < quesArr.length; ++i) {
        if (quesArr[i].userAnswer !== 0) {
          doneArr.push(quesArr[i]);
        }
      }
      if (this.data.type === "isKnowledge") {
        this.setData({
          ["examKnowledgeTemp.examItemTempList"]: doneArr,
        });
      } else {
        this.setData({
          ["examSectionTemp.examItemTempList"]: doneArr,
        });
      }
    },
    subOrSaveReq(sign = "submit") {
      console.log("submit");
      if (sign === "submit") {
        wx.showLoading({
          title: "加载中...",
          icon: "none",
        });
      }
      getHeader().then((token) => {
        if (token) {
          header.token = token;
        } else {
          console.error("token get faild!");
        }
        let url = "";
        let data = {};
        console.log(`type的值是${this.data.type}`);
        this.getDoneQue();

        if (this.data.type === "isKnowledge") {
          url = "https://www.shenfu.online/sfeduWx/api/exam/dealKnowledgeExam";
          data = this.data.examKnowledgeTemp;
        } else {
          url = "https://www.shenfu.online/sfeduWx/api/exam/dealSectionExam";
          data = this.data.examSectionTemp;
        }
        console.log(data);
        wx.request({
          url: url,
          data: data,
          method: "post", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: header, // 设置请求的 header
          success: (res) => {
            console.log(res);
            if (sign === "submit") {
              if (this.data.type === "isKnowledge") {
                wx.hideLoading();
                this.setData({
                  type: "",
                });
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
                prevPage.setData({
                  examId: this.data.examId,
                });
                prevPage.getList(prevPage.data.examId);
                wx.navigateBack({
                  delta: 1,
                });
              } else {
                wx.hideLoading();
                wx.reLaunch({
                  url: `/pages/detectResult/index?data=${JSON.stringify(
                    res.data.data
                  )}`,
                });
              }
            }
          },
          fail: function () {
            // fail
          },
          // 防止请求不成功一直 loading
          complete: () => {
            wx.hideLoading();
          },
        });
      });
    },
    spendAllTime() {
      if (this.data.type === "isKnowledge") {
        // console.log(`${this.data.examKnowledgeTemp.timeWay}计时,倒计时总时间为${this.data.examKnowledgeTemp.timeSecond}s`)
        // this.setData({
        //   ['examKnowledgeTemp.dealType']: 2
        // })
        // console.log(this.data.examKnowledgeTemp)
      } else {
        console.log(
          `${this.data.examSectionTemp.timeWay}计时,倒计时总时间为${this.data.examSectionTemp.timeSecond}s`
        );
        this.setData({
          ["examSectionTemp.dealType"]: 2,
        });
        console.log(this.data.examSectionTemp);
      }
      this.subOrSaveReq();
    },
    // 得到用户的答案
    getUserAnswer(e) {
      console.log(e);
      // this.isMakeAllTopic()
      let userAnswers = this.data.userAnswers;
      let choosedTopicIndex = e.target.dataset.index;
      this.setData({
        choosedTopicIndex,
      });
      let currentTopicIndex = this.data.currentTopicIndex;
      let submitAnswer = [];
      submitAnswer = this.data.tempSaveAns;
      submitAnswer[currentTopicIndex].userAnswer = choosedTopicIndex + 1;
      this.setData({
        tempSaveAns: submitAnswer,
      });
      userAnswers[currentTopicIndex] = choosedTopicIndex;
      if (currentTopicIndex < this.data.topicsLength - 1) {
        currentTopicIndex = currentTopicIndex + 1;
      } else {
        setTimeout(() => {
          this.showAnswerCard();
        }, 300);
      }
      setTimeout(() => {
        this.setData({
          userAnswers,
          currentTopicIndex,
        });
      }, 300);
    },
    isSubmit() {
      this.setData({
        isSubmit: true,
      });
    },
    // 提交答案
    submitUserAnswer() {
      this.setData({
        isShowAnswerCard: true,
      });
    },
    // 滑动至下一题或上一题
    nextTopic(e) {
      let userAnswers = this.data.userAnswers;
      let currentTopicIndex = e.detail.current;
      if (userAnswers.length !== 0) {
        let choosedTopicIndex = userAnswers[currentTopicIndex];
        this.setData({
          choosedTopicIndex,
        });
      }
      this.isShowSubmit(currentTopicIndex);
    },
    // 判断是否显示提交按钮
    isShowSubmit(value) {
      let currentTopicIndex = value;
      let len = this.data.topicsLength;
      let lastTopicIndex = len - 1;
      let count = this.data.count.size;
      if (currentTopicIndex === lastTopicIndex || count === len) {
        this.setData({
          isLastTopic: true,
        });
      } else {
        this.setData({
          isLastTopic: false,
        });
      }
      this.setData({
        currentTopicIndex,
      });
    },

    // 得到题目集合
    getTopicsList(examId, knowledgePointId) {
      if (this.data.type === "isKnowledge") {
        request(
          "api/exam/getKnowledgeExamOfUser",
          "get",
          {
            examId,
            knowledgePointId,
          },
          (res) => {
            console.log(res);
            let tempArr = [];
            let questionList = res.data;
            let len = questionList.length;
            let arr = new Array(len).fill(-1);
            for (var i = 0; i < len; i++) {
              tempArr.push({
                questionId: questionList[i].id,
                userAnswer: questionList[i].userAnswer,
              });
              console.log(questionList[i]);
              if (
                questionList[i].userAnswer !== 0 &&
                questionList[i].judgeResult == 1
              ) {
                arr[i] = questionList[i].userAnswer - 1;
              }
            }
            this.setData({
              userAnswers: arr,
              topicsList: questionList,
              topicsLength: questionList.length,
              tempSaveAns: tempArr,
              examKnowledgeTemp: {
                examId: examId,
                examItemTempList: tempArr,
              },
            });
            console.log(arr);
            console.log(this.data.examKnowledgeTemp.examItemTempList);

            if (arr[0] !== -1) {
              let choosedTopicIndex = arr[0];
              this.setData({
                choosedTopicIndex,
              });
            }
            this.forwardCount();
          },
          "form"
        );
      } else {
        request(
          "api/exam/getSectionExamOfUser",
          "get",
          {
            examId,
          },
          (res) => {
            console.log(res.data);
            if (res.data.questionList) {
              this.setData({
                topicsList: res.data.questionList,
                topicsLength: res.data.questionList.length,
                ["examSectionTemp.examId"]: res.data.examId,
                ["examSectionTemp.timeSecond"]: res.data.timeSecond,
                ["examSectionTemp.timeWay"]: res.data.timeWay,
              });

              let len = this.data.topicsLength;
              let list = this.data.topicsList;
              let arr = new Array(len).fill(-1);
              let tempArr = [];
              for (let i = 0; i < len; ++i) {
                let obj = {
                  questionId: 0,
                  userAnswer: 0,
                };
                obj.questionId = list[i].id;
                obj.userAnswer = list[i].userAnswer;
                if (obj.userAnswer !== 0) {
                  arr[i] = obj.userAnswer - 1;
                }
                tempArr.push(obj);
              }
              this.setData({
                userAnswers: arr,
                tempSaveAns: tempArr,
              });
              console.log(arr);
              console.log(this.data.examSectionTemp.examItemTempList);
              if (arr[0] !== -1) {
                let choosedTopicIndex = arr[0];
                this.setData({
                  choosedTopicIndex,
                });
              }
              if (this.data.examSectionTemp.timeWay === 0) {
                this.runCountDown(this.data.examSectionTemp.timeSecond);
              } else {
                this.forwardCount();
              }
            }
          },
          "form"
        );
      }
    },
  },
  components: {
    ExitModal,
    TopicsBtn,
    AnswerCard,
  },
};
</script>

<style lang="less">
.clock-list {
  width: 682rpx;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: rgb(254, 254, 254);
  font-size: 30rpx;
}
.clock-wrap {
  width: 100%;
  height: 84rpx;
  background-color: #15da7f;
}

.clock-list button {
  border-radius: 4rpx;
  padding: 0rpx;
  margin: 0rpx;
  display: inline-block;
  line-height: 44rpx;
  width: 96rpx;
  text-align: center;
  border: 1rpx solid #ccc;
}

.clock-list button::after {
  border: none;
}

.pass {
  background-color: #ffffff;
  color: #626262;
}

.button-hover {
  color: #fff;
  background-color: rgb(19, 109, 184);
}

.timer {
  display: table-cell;
}

.answer-card {
  line-height: 44rpx;
  text-align: center;
}

.topic-wrap {
  width: 100%;
  height: 1334rpx;
  background-color: #f2f6f7;
}

.topic-wrap swiper {
  height: 100%;
  background: #fff;
}

.topic-wrap swiper image {
  width: 98%;
  display: block;
  margin: auto;
}

.topic-img {
  height: 854rpx;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20rpx;
}
.topic-img image {
  max-height: 834rpx;
}
.btn-wrap {
  width: 640rpx;
  height: 120rpx;
  display: flex;
  margin: 50rpx auto 0;
  justify-content: space-between;
  align-items: center;
}

.btn-item {
  width: 118rpx;
  line-height: 118rpx;
  text-align: center;
  border-radius: 50%;
  border: 1rpx solid #ccc;
}

.submit {
  width: 588rpx;
  line-height: 80rpx;
  text-align: center;
  position: fixed;
  bottom: 52rpx;
  left: 50%;
  transform: translate(-50%);
  border-radius: 40rpx;
  font-size: 36rpx;
  font-family: "Adobe Heiti Std R";
}

.sans {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.img {
  width: 34rpx;
}
.item-one {
  width: 120rpx;
  line-height: 34rpx;
  display: flex;
  justify-content: flex-start;
}
.item-text {
  width: 57rpx;
  line-height: 34rpx;
  margin-left: 8rpx;
}

.quetype {
  width: 100%;
  height: 80rpx;
  color: #fff;
  font-size: 30rpx;
  background-color: #2b2b2b;
}
.quetype-con {
  width: 670rpx;
  line-height: 80rpx;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.quetype-con .item image {
  vertical-align: middle;
  width: 12rpx;
  height: 12rpx;
  display: inline-block;
  padding: 0 12rpx;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80rpx;
  background-color: #2b2b2b;
}
.tip-b {
  color: #fff;
  font-size: 20rpx;
  text-align: center;
  margin: 19rpx auto 0;
}
.tip-s {
  color: rgb(65, 77, 97);
  font-size: 16rpx;
  text-align: center;
  margin: 4rpx auto 8rpx;
}

.hide {
  display: none;
}
</style>