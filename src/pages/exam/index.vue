<template>
  <view class="clock-container">
    <block v-if="isShowAnswerCard">
      <answer-card @hideAnswerCard="hideAnswerCard" @isSubmit="isSubmited">
        <topics-btn
          slot="scantron"
          @rediretTopic="rediretTopic"
          @hideAnswerCard="hideAnswerCard"
          :isFinshed="userAnswers"
          :scantron-list="topicsList"
        />
      </answer-card>
    </block>
    <view class="clock-wrap">
      <view class="clock-list">
        <view :class="['timer', type == 'isKnowledge' ? 'hide' : '']">
          <view class="item-one">
            <image class="img" mode="widthFix" :src="szimg" />
            <text class="item-text">{{ minutes }}:{{ seconds }}</text>
          </view>
        </view>
        <view class="answer-card" @tap="showAnswerCard">答题卡/提交</view>
        <view>{{ topicsList.length }}/{{ currentTopicIndex + 1 }}</view>
      </view>
    </view>

    <view class="topic-wrap">
      <swiper @change="nextTopic" :current="currentTopicIndex">
        <block v-for="(item, index) in topicsList" :key="index">
          <swiper-item>
            <view>
              <view class="topic-img">
                <image mode="widthFix" :src="item.url" />
              </view>
              <view class="quetype">
                <view class="quetype-con">
                  <view class="item"
                    ><image mode="widthFix" :src="tyimg" />单选题</view
                  >
                </view>
              </view>
              <view class="btn-wrap">
                <block v-for="(item, index) in answerLists" :key="index">
                  <view
                    v-if="type === 'isKnowledge'"
                    :class="[
                      'q',
                      'btn-item',
                      choosedTopicIndex === index ? 'active' : '',
                    ]"
                    :data-index="index"
                    @tap="getUserAnswer"
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
                    v-else
                    :class="[
                      'btn-item',
                      choosedTopicIndex === index ? 'active' : 'abc',
                    ]"
                    :data-index="index"
                    @tap="getUserAnswer"
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
import request from "../../utils/http";
import Taro from "@tarojs/taro";
const header = {
  "content-type": "application/json",
};

import TopicsBtn from "../../components/topicsbtn/index.vue";
import AnswerCard from "../../components/answercard/index.vue";

import clock from "../../assets/icon/clock.png";
import icon_circle from "../../assets/icon/icon_circle.png";
import icon_poss from "../../assets/icon/icon_poss.png";

export default {
  props: {
    currentSubjects: {
      type: Array,
      value: [],
    },
    isTap: {
      type: Boolean,
      value: false,
    },
  },
  data() {
    return {
      szimg: clock,
      tyimg: icon_circle,
      psimg: icon_poss,
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
    Taro.eventCenter.on("hideAnswerCard", this.hideAnswerCard);
    Taro.eventCenter.on("rediretTopic", this.rediretTopic);
    Taro.eventCenter.on("isSubmit", this.isSubmited);
    if (options.isKnowledge) {
      this.type = "isKnowledge";
      this.examId = options.examId;
      this.sectionId = options.sectionId;
      this.sectionName = options.sectionName;
    }
    this.getTopicsList(options.examId, options.knowledgePointId);
  },
  onShow: function () {
    if (this.isKnowledge !== "isKnowledge") {
      this.autoSave();
    }
  },
  onUnload: function () {
    if (this.isKnowledge !== "isKnowledge") {
      clearInterval(this.stimer);
      this.clearTimer();
      this.clearForTimer();
      if (!this.submited) {
        console.log("页面卸载时保存");
        this.saveAns();
      }
    }
  },
  methods: {
    init: function () {
      this.minutes = "00";
      this.second = "00";
    },
    // 清除倒计时的计时器
    clearTimer: function () {
      clearInterval(this.timer);
      this.time = null;
      this.init();
    },
    // 清除正向计时器
    clearForTimer: function () {
      clearInterval(this.forwardtimer);
      this.forwardtimer = null;
      this.init();
    },
    forwardCount() {
      var forwardtimer = setInterval(() => {
        var forwardtime = this.examSectionTemp.timeSecond + 1;
        this.examSectionTemp.timeSecond = forwardtime;
        this.examSectionTemp.timeWay = 1;
        var str = this.conversion(forwardtime).split(":");
        this.minutes = str[0];
        this.seconds = str[1];
        if (this.isSubmit) {
          this.isSubmit = false;
          this.submited = true;
          this.spendAllTime();
        }
      }, 1000);
      this.forwardtimer = forwardtimer;
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
        var lasttime = this.lasttime + 1;
        totalseconds = totalseconds - lasttime;
        this.lasttime = lasttime;
        this.examSectionTemp.timeSecond = totalseconds;
        var str = this.countDown(totalseconds).split(":");
        this.minutes = str[0];
        this.seconds = str[1];
        // 判断是否提交，如果提交计算做题花费总时间
        if (this.isSubmit) {
          this.isSubmit = false;
          this.submited = true;
          this.spendAllTime();
        }
      }, 1000);
      this.timer = timer;
    },
    saveAns() {
      let sign = "save";
      console.log(`倒计时时间${this.examSectionTemp.timeSecond}`);
      this.examSectionTemp.dealType = 1;
      this.subOrSaveReq(sign);
    },
    autoSave() {
      let stimer = setInterval(() => {
        this.saveAns();
      }, this.intervalTime);
      this.stimer = stimer;
    },
    // 显示答题卡
    showAnswerCard() {
      this.isShowAnswerCard = true;
    },
    // 点击答题卡中的按钮进行跳转
    rediretTopic(e) {
      this.currentTopicIndex = e.currentIndex;
      this.isShowAnswerCard = false;
    },
    // 隐藏答题卡
    hideAnswerCard() {
      this.isShowAnswerCard = false;
    },
    hideExitModal() {
      console.log("hideExitModal");
    },
    getDoneQue() {
      let doneArr = [];
      let quesArr = this.tempSaveAns;
      for (let i = 0; i < quesArr.length; ++i) {
        if (quesArr[i].userAnswer !== 0) {
          doneArr.push(quesArr[i]);
        }
      }
      if (this.type === "isKnowledge") {
        this.examKnowledgeTemp.examItemTempList = doneArr;
      } else {
        this.examSectionTemp.examItemTempList = doneArr;
      }
    },
    async subOrSaveReq(sign = "submit") {
      if (sign === "submit") {
        Taro.showLoading({
          title: "加载中...",
          icon: "none",
        });
      }
      let url = "";
      let data = {};
      this.getDoneQue();

      if (this.type === "isKnowledge") {
        url = "/api/exam/dealKnowledgeExam";
        data = this.examKnowledgeTemp;
      } else {
        url = "/api/exam/dealSectionExam";
        data = this.examSectionTemp;
      }
      const res = await request.post({
        url,
        params: { ...data },
      });
      if (res.data.status === 200) {
        if (sign === "submit") {
          if (this.type === "isKnowledge") {
            Taro.hideLoading();
            this.type = "";
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            prevPage.setData({
              examId: this.examId,
            });
            prevPage.getList(prevPage.data.examId);
            Taro.navigateBack({
              delta: 1,
            });
          } else {
            Taro.hideLoading();
            Taro.reLaunch({
              url: `/pages/detectResult/index?data=${JSON.stringify(
                res.data.data
              )}`,
            });
          }
        }
      }
    },
    spendAllTime() {
      if (this.type === "isKnowledge") {
        // console.log(`${this.examKnowledgeTemp.timeWay}计时,倒计时总时间为${this.examKnowledgeTemp.timeSecond}s`)
        // this.setData({
        //   ['examKnowledgeTemp.dealType']: 2
        // })
        // console.log(this.examKnowledgeTemp)
      } else {
        console.log(
          `${this.examSectionTemp.timeWay}计时,倒计时总时间为${this.examSectionTemp.timeSecond}s`
        );
        this.examSectionTemp.dealType = 2;
      }
      this.subOrSaveReq();
    },
    // 得到用户的答案
    getUserAnswer(e) {
      // this.isMakeAllTopic()
      let userAnswers = this.userAnswers;
      let choosedTopicIndex = e.target.dataset.index;
      this.choosedTopicIndex = choosedTopicIndex;
      let currentTopicIndex = this.currentTopicIndex;
      let submitAnswer = [];
      submitAnswer = this.tempSaveAns;
      submitAnswer[currentTopicIndex].userAnswer = choosedTopicIndex + 1;
      this.tempSaveAns = submitAnswer;
      userAnswers[currentTopicIndex] = choosedTopicIndex;
      if (currentTopicIndex < this.topicsLength - 1) {
        currentTopicIndex = currentTopicIndex + 1;
      } else {
        setTimeout(() => {
          this.showAnswerCard();
        }, 300);
      }
      setTimeout(() => {
        this.userAnswers = userAnswers;
        this.currentTopicIndex = currentTopicIndex;
      }, 300);
    },
    isSubmited() {
      this.isSubmit = true;
    },
    // 提交答案
    submitUserAnswer() {
      this.isShowAnswerCard = true;
    },
    // 滑动至下一题或上一题
    nextTopic(e) {
      let userAnswers = this.userAnswers;
      let currentTopicIndex = e.detail.current;
      if (userAnswers.length !== 0) {
        let choosedTopicIndex = userAnswers[currentTopicIndex];
        this.choosedTopicIndex = choosedTopicIndex;
      }
      this.isShowSubmit(currentTopicIndex);
    },
    // 判断是否显示提交按钮
    isShowSubmit(value) {
      let currentTopicIndex = value;
      let len = this.topicsLength;
      let lastTopicIndex = len - 1;
      let count = this.count.size;
      if (currentTopicIndex === lastTopicIndex || count === len) {
        this.isLastTopic = true;
      } else {
        this.isLastTopic = false;
      }
      this.currentTopicIndex = currentTopicIndex;
    },

    // 得到题目集合
    async getTopicsList(examId, knowledgePointId) {
      if (this.type === "isKnowledge") {
        const res = await request.get({
          url: "api/exam/getKnowledgeExamOfUser",
          params: {
            examId: Number(examId),
            knowledgePointId: Number(knowledgePointId),
          },
          type: "form",
        });
        let tempArr = [];
        let questionList = res.data.data;
        let len = questionList.length;
        let arr = new Array(len).fill(-1);
        for (var i = 0; i < len; i++) {
          tempArr.push({
            questionId: questionList[i].id,
            userAnswer: questionList[i].userAnswer,
          });
          if (
            questionList[i].userAnswer !== 0 &&
            questionList[i].judgeResult == 1
          ) {
            arr[i] = questionList[i].userAnswer - 1;
          }
        }
        this.userAnswers = arr;
        this.topicsList = questionList;
        this.topicsLength = questionList.length;
        this.tempSaveAns = tempArr;
        this.examKnowledgeTemp.examId = examId;
        this.examKnowledgeTemp.examItemTempList = tempArr;

        if (arr[0] !== -1) {
          let choosedTopicIndex = arr[0];
          this.choosedTopicIndex = choosedTopicIndex;
        }
        this.forwardCount();
      } else {
        const res = await request.get({
          url: "api/exam/getSectionExamOfUser",
          params: { examId },
          type: "form",
        });
        if (res.data.data.questionList) {
          this.topicsList = res.data.data.questionList;
          this.topicsLength = res.data.data.questionList.length;
          this.examSectionTemp.examId = res.data.data.examId;
          this.examSectionTemp.timeSecond = res.data.data.timeSecond;
          this.examSectionTemp.timeWay = res.data.data.timeWay;

          let len = this.topicsLength;
          let list = this.topicsList;
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
          this.userAnswers = arr;
          this.tempSaveAns = tempArr;
          if (arr[0] !== -1) {
            let choosedTopicIndex = arr[0];
            this.choosedTopicIndex = choosedTopicIndex;
          }
          if (this.examSectionTemp.timeWay === 0) {
            this.runCountDown(this.examSectionTemp.timeSecond);
          } else {
            this.forwardCount();
          }
        }
      }
    },
  },
  components: {
    TopicsBtn,
    AnswerCard,
  },
};
</script>

<style lang="less">
.clock-list {
  width: 682px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: rgb(254, 254, 254);
  font-size: 30px;
}
.clock-wrap {
  width: 100%;
  height: 84px;
  background-color: #15da7f;
}

.clock-list button {
  border-radius: 4px;
  padding: 0px;
  margin: 0px;
  display: inline-block;
  line-height: 44px;
  width: 96px;
  text-align: center;
  border: 1px solid #ccc;
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
  line-height: 44px;
  text-align: center;
}

.topic-wrap {
  width: 100%;
  height: 1334px;
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
  height: 854px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
}
.topic-img image {
  max-height: 834px;
}
.btn-wrap {
  width: 640px;
  height: 120px;
  display: flex;
  margin: 50px auto 0;
  justify-content: space-between;
  align-items: center;
}

.btn-item {
  width: 118px;
  line-height: 118px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #ccc;
}

.submit {
  width: 588px;
  line-height: 80px;
  text-align: center;
  position: fixed;
  bottom: 52px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 40px;
  font-size: 36px;
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
  width: 34px;
}
.item-one {
  width: 120px;
  line-height: 34px;
  display: flex;
  justify-content: flex-start;
}
.item-text {
  width: 57px;
  line-height: 34px;
  margin-left: 8px;
}

.quetype {
  width: 100%;
  height: 80px;
  color: #fff;
  font-size: 30px;
  background-color: #2b2b2b;
}
.quetype-con {
  width: 670px;
  line-height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.quetype-con .item image {
  vertical-align: middle;
  width: 12px;
  height: 12px;
  display: inline-block;
  padding: 0 12px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: #2b2b2b;
}
.tip-b {
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 19px auto 0;
}
.tip-s {
  color: rgb(65, 77, 97);
  font-size: 16px;
  text-align: center;
  margin: 4px auto 8px;
}

.hide {
  display: none;
}
</style>