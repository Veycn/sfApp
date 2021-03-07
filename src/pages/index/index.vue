<template>
  <view class="p-container">
    <scroll-view class="scroll-wrap" scroll-y="true">
      <s-chooseBoard
        tag-name="科目"
        render-list="{{allGrades}}"
        type="subject"
        active-color="#85F267"
        bindtagBeChoosed="gradeChoosed"
      ></s-chooseBoard>
      <s-chooseBoard
        tag-name="教材"
        render-list="{{currentSubjects}}"
        type="textbook"
        active-color="#15DA7F"
        bindtagBeChoosed="subjectChoosed"
      ></s-chooseBoard>
      <s-chooseBoard
        tag-name="版本"
        render-list="{{allVersion}}"
        type="textbookVersion"
        active-color="#15DABC"
        bindtagBeChoosed="versionChoosed"
      ></s-chooseBoard>
      <view class="to-learn" bindtap="startStudy">
        <image class="pic" src="../../assets/pic/icon_open.png" />
      </view>
      <block wx:if="{{ isChoosed }}">
        <s-tipWindows bindexitModal="exitModal" />
      </block>
    </scroll-view>
  </view>
</template>

<script>
import Tag from "../../components/tag/index.vue";
import AllGrades from "../../components/allgrades/index.vue";
import AllSubjects from "../../components/allsubjects/index.vue";
import AllVersion from "../../components/allversion/index.vue";
import ChooseBoard from "../../components/chooseBoard/index.vue";
import TipWindows from "../../components/tipWindows/index.vue";
    
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
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      userInfo: {},
      isChoosed: false,
      choosedSubject: "",
      choosedBook: "",
      choosedVersion: "",
    };
  },
  onLoad: function (options) {
    this.getAllGrades();
  },
  methods: {
    startStudy() {
      if (this.data.isStartStudy) {
        const { choosedSubject, choosedBook, choosedVersion } = this.data;
        const choosedTitle = choosedSubject + choosedBook + choosedVersion;
        console.log(`选中的信息是:`);
        console.log(choosedTitle);
        app.globalData.requestMsg = this.data.getversion;
        // app.globalData.choosedTitle = choosedTitle
        wx.setStorage({
          key: "choosedTitle",
          data: choosedTitle,
        });
        request(
          "api/userInfo/addUserInfo",
          "post",
          this.data.getversion,
          (res) => {
            console.log(res);
          },
          "form"
        );
        wx.switchTab({ url: `../detect/index` });
      } else {
        this.setData({
          isChoosed: true,
        });
      }
    },
    exitModal() {
      this.setData({
        isChoosed: false,
      });
    },

    getAllGrades() {
      request("api/userInfo/getSubjectList", "get", {}, (res) => {
        this.setData({ allGrades: res.data });
      });
    },
    getSubjects(id) {
      request(
        "api/userInfo/getTextbookList",
        "get",
        { subjectId: id },
        (res) => {
          this.setData({ currentSubjects: res.data });
        }
      );
    },
    getTextBooks(id) {
      request(
        "api/userInfo/getTextbookVersionList",
        "get",
        { textbookId: id },
        (res) => {
          this.setData({ allVersion: res.data });
        }
      );
    },
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      });
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
      } = this.data.userInfo;
      request(
        "api/userAccount/login",
        "post",
        {
          wxUserInfo: {
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
      this.setData({
        choosedSubject: e.detail.item.subject,
      });
      const id = e.detail.item.id;
      this.setData({ ["getversion.subjectId"]: id });
      this.getSubjects(id);
    },
    subjectChoosed(e) {
      console.log(e.detail.item.textbook);
      this.setData({
        choosedBook: e.detail.item.textbook,
      });
      const id = e.detail.item.id;
      this.setData({ ["getversion.textbookId"]: id });
      this.getTextBooks(id);
    },

    versionChoosed(e) {
      console.log(e.detail.item.textbookVersion);
      this.setData({
        choosedVersion: e.detail.item.textbookVersion,
      });
      const id = e.detail.item.id;
      this.setData({
        ["getversion.textbookVersionId"]: id,
        isStartStudy: true,
      });
    },
  },
  components: {
    Tag,
    AllGrades,
    AllSubjects,
    AllVersion,
    ChooseBoard,
    TipWindows
  },
};
</script>

<style lang="less">
.p-container {
  width: 100%;
  height: 100%;
  background: rgba(240, 242, 245, 1);
  padding-top: 40rpx;
}
.scroll-wrap {
  height: 100%;
}
.to-learn {
  margin-top: 25rpx;
  margin-bottom: 50rpx;
  width: 416rpx;
  height: 154rpx;
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
