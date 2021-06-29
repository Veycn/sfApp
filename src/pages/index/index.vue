<template>
  <view class="p-container">
    <scroll-view
      class="scroll-wrap"
      scroll-y="true"
    >
      <choose-board
        tag-name="科目"
        :render-list="allGrades"
        type="subject"
        :tag-be-choosed="handleChoosed"
      />
      <choose-board
        tag-name="教材"
        :render-list="currentSubjects"
        type="textbook"
        :tag-be-choosed="handleChoosed"
      />
      <choose-board
        tag-name="版本"
        :render-list="allVersion"
        type="textbookVersion"
        :tag-be-choosed="handleChoosed"
      />
      <view
        class="to-learn"
        @tap="startStudy"
      >
        <image
          class="pic"
          src="https://www.shenfu.online/pic/icon_open.png"
        />
      </view>
      <block v-if="isChoosed">
        <tip-windows :exit-modal="exitModal" />
      </block>
    </scroll-view>
  </view>
</template>

<script>
import ChooseBoard from "../../components/chooseBoard/index.vue";
import TipWindows from "../../components/tipWindows/index.vue";
import Taro from "@tarojs/taro";
import API from "../../utils/api";

const app = Taro.getApp();

export default {
  name: "Index",
  components: {
    ChooseBoard,
    TipWindows,
  },
  data() {
    return {
      code: "",
      subject: "subject",
      textbook: "textbook",
      textbookVersion: "textbookVersion",
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
      choosedSubject: "",
      choosedBook: "",
      choosedVersion: "",
    };
  },
  onLoad: function (options) {
    this.getAllGrades();
  },
  methods: {
    handleChoosed(e) {
      const type = Object.keys(e.item)[1];
      switch (type) {
        case "subject":
          this.gradeChoosed(e);
          break;
        case "textbook":
          this.subjectChoosed(e);
          break;
        case "textbookVersion":
          this.versionChoosed(e);
          break;
        default:
          break;
      }
    },
    async startStudy() {
      if (this.isStartStudy) {
        const choosedTitle =
          this.choosedSubject + this.choosedBook + this.choosedVersion;
        // app.globalData.requestMsg = this.getversion;
        Taro.setStorage({
          key: "choosedTitle",
          data: choosedTitle,
        });
        const res = await API.getCourseInfo({ ...this.getversion });
        if (res.data.status) {
          Taro.switchTab({ url: `../detect/index` });
        }
      } else {
        this.isChoosed = true;
      }
    },
    exitModal() {
      this.isChoosed = false;
    },

    async getAllGrades() {
      const res = await API.getAllGrades();
      this.allGrades = res.data.data;
    },
    async getSubjects(id) {
      const res = await API.getSubjects({ subjectId: id });
      this.currentSubjects = res.data.data;
    },
    async getTextBooks(id) {
      const res = await API.getTextBooks({ textbookId: id });
      this.allVersion = res.data.data;
    },
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo;
      this.userInfo = e.detail.userInfo;
      this.hasUserInfo = true;
    },

    userLogin: function () {
      const { code } = this.data;
      const { nickName, gender, city, province, country, avatarUrl } =
        this.userInfo;
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
      const { id, subject } = e.item;
      this.choosedSubject = subject;
      this.getversion.subjectId = id;
      this.getSubjects(id);
    },
    subjectChoosed(e) {
      const { id, textbook } = e.item;
      this.choosedBook = textbook;
      this.getversion.textbookId = id;
      this.getTextBooks(id);
    },
    versionChoosed(e) {
      const { id, textbookVersion } = e.item;
      this.choosedVersion = textbookVersion;
      this.getversion.textbookVersionId = id;
      this.isStartStudy = true;
    },
  },
};
</script>

<style lang="less">
.p-container {
  width: 100%;
  height: 100%;
  background: #101010;
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
