<template>
  <view class="p-container">
    <scroll-view class="scroll-wrap" scroll-y="true">
      <choose-board
        tag-name="科目"
        :render-list="allGrades"
        type="subject"
        active-color="#85F267"
        @tagBeChoosed="gradeChoosed"
      ></choose-board>
      <choose-board
        tag-name="教材"
        :render-list="currentSubjects"
        type="textbook"
        active-color="#15DA7F"
        @tagBeChoosed="subjectChoosed"
      ></choose-board>
      <choose-board
        tag-name="版本"
        :render-list="allVersion"
        type="textbookVersion"
        active-color="#15DABC"
        @tagBeChoosed="versionChoosed"
      ></choose-board>
      <view class="to-learn" @tap="startStudy">
        <image class="pic" src="../../assets/pic/icon_open.png" />
      </view>
      <block v-if="isChoosed">
        <tip-windows @exitModal="exitModal" />
      </block>
    </scroll-view>
  </view>
</template>

<script>
import Tag from "../../components/tag/index.vue";
import ChooseBoard from "../../components/chooseBoard/index.vue";
import TipWindows from "../../components/tipWindows/index.vue";
import Taro from "@tarojs/taro";
import request from "../../utils/http";

export default {
  name: "Index",
  data() {
    return {
      code: "",
      currentSubjects: [],
      choosed: -1,
      isChoosed: false,
      getversion: {
        subjectId: -1,
        textbookId: -1,
        textbookVersionId: -1,
      },
      allGrades: [],
      allVersion: [],
      isStartStudy: false,
      hasUserInfo: false,
      canIUse: Taro.canIUse("button.open-type.getUserInfo"),
      userInfo: {},
      isChoosed: false,
      choosedSubject: "",
      choosedBook: "",
      choosedVersion: "",
    };
  },
  onLoad: function (options) {
    this.getAllGrades();
    Taro.eventCenter.on("exitModal", this.exitModal);
  },
  methods: {
    startStudy() {
      console.log("startStudy", this.isStartStudy);
      console.log(this.data);
      if (this.isStartStudy) {
        const choosedTitle =
          this.choosedSubject + this.choosedBook + this.choosedVersion;
        console.log(`选中的信息是:`);
        console.log(choosedTitle);
        app.globalData.requestMsg = this.getversion;
        Taro.setStorage({
          key: "choosedTitle",
          data: choosedTitle,
        });
        request.post({
          url: "api/userInfo/addUserInfo",
          params: this.getversion
        }).then(res => {
          console.log(res);
        })
        // request(
        //   "api/userInfo/addUserInfo",
        //   "post",
        //   this.getversion,
        //   (res) => {
        //     console.log(res);
        //   },
        //   "form"
        // );
        Taro.switchTab({ url: `../detect/index` });
      } else {
        this.isChoosed = true;
      }
    },
    exitModal() {
      console.log("exitModal");
      this.isChoosed = false;
    },

    getAllGrades() {
      console.log("getAllGrades");
      request
        .get({
          url: "api/userInfo/getSubjectList",
          params: {},
        })
        .then((res) => {
          console.log("getAllGrades", res);
          this.allGrades = res.data;
        });
    },
    getSubjects(id) {
      request(
        "api/userInfo/getTextbookList",
        "get",
        { subjectId: id },
        (res) => {
          this.currentSubjects = res.data;
        }
      );
    },
    getTextBooks(id) {
      request(
        "api/userInfo/getTextbookVersionList",
        "get",
        { textbookId: id },
        (res) => {
          this.allVersion = res.data;
        }
      );
    },
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo;
      this.userInfo = e.detail.userInfo;
      this.hasUserInfo = true;
    },

    userLogin: function () {
      const { code } = this.data;
      const {
        nickName,
        gender,
        city,
        province,
        country,
        avatarUrl,
      } = this.userInfo;
      request(
        "api/userAccount/login",
        "post",
        {
          TaroUserInfo: {
            code,
            nickName,
            gender,
            city,
            province,
            country,
            avatarUrl,
          },
        },
        function (res) {
          console.log(res);
        }
      );
    },

    gradeChoosed(e) {
      console.log(e.detail.item.subject);
      this.choosedSubject = e.detail.item.subject;
      const id = e.detail.item.id;
      this.getversion.subjectId = id;
      this.getSubjects(id);
    },
    subjectChoosed(e) {
      console.log(e.detail.item.textbook);
      this.choosedBook = e.detail.item.textbook;
      const id = e.detail.item.id;
      this.getversion.textbookId = id;
      this.getTextBooks(id);
    },

    versionChoosed(e) {
      console.log(e.detail.item.textbookVersion);
      this.choosedVersion = e.detail.item.textbookVersion;
      const id = e.detail.item.id;
      this.getversion.textbookVersionId = id;
      this.isStartStudy = true;
    },
  },
  components: {
    Tag,
    ChooseBoard,
    TipWindows,
  },
};
</script>

<style lang="less">
.p-container {
  width: 100%;
  height: 100%;
  background: rgba(240, 242, 245, 1);
  padding-top: 40px;
}
.scroll-wrap {
  height: 100%;
}
.to-learn {
  margin-top: 25px;
  margin-bottom: 50px;
  width: 416px;
  height: 154px;
  background: transparent;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.to-learn .pic {
  width: 100%;
  height: 100%;
}
</style>
