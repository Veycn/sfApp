<template>
  <view class="index">
    <view class="userInfo flex f-ai-c" v-if="isLogin">
      <image :src="userInfo.avatarUrl"></image>
      <text class="userName">{{ userInfo.nickName }}</text>
    </view>
    <view class="userInfo flex f-ai-c" v-else>
      <image src="https://www.shenfu.online/pic/icon/user.png"></image>
      <button
        class="userName loginbtn"
        @getuserinfo="getUserInfo"
        open-type="getUserInfo"
        style="background: black"
      >
        登录
      </button>
    </view>

    <view class="operate">
      <view class="common flex f-ai-c f-jc-sb" @tap="toGrade">
        <text style="color: white">{{
          bookInfo || "暂无记录, 登录后可选择或查看哦."
        }}</text>
        <image src="https://www.shenfu.online/pic/icon/right.png"></image>
      </view>
      <button class="common btn flex f-ai-c f-jc-sb" open-type="contact">
        <text style="color: white">我的客服</text>
        <image src="https://www.shenfu.online/pic/icon/right.png"></image>
      </button>
      <view class="common flex f-ai-c f-jc-sb" @tap="tLogin">
        <text style="color: white">教师中心</text>
        <image src="https://www.shenfu.online/pic/icon/right.png"></image>
      </view>
    </view>
    <view class="logout" v-if="isLogin">
      <!-- <navigator target="miniProgram" open-type="exit"  bindtap="logout"><view class="btn">退出账号</view></navigator> -->
      <view class="btn" @tap="logout">退出账号</view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import request from "../../utils/http";
import API from "../../utils/api";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      bookInfo: "",
      isLogin: false,
      userInfo: {},
      hasUserInfo: false,
      code: "",
      loginInfo: {},
      canLogin: false,
    };
  },
  created() {
    this.isLogin && this.getBookInfo();
  },
  onLoad() {
    this.init()
  },
  methods: {
    init() {
      this.getWxUserInfo();
      this.getWxCode();
      this.getStorageUserToken();
    },

    checkLogin(){
      this.getStorageUserToken();
    },

    getUserInfo(e) {
      const userInfo = e.detail.userInfo;
      const { avatarUrl, gender, nickName } = userInfo;
      this.userInfo = userInfo
      console.log(userInfo);
      Taro.login({
        success: (res) => {
          console.log(res);
          if (res.code) {
            API.userLogin({ code: res.code, avatarUrl, gender, nickName }).then((res) => {
              const {
                subjectId,
                textbookVersionId,
                textbookId,
                token,
              } = res?.data?.data;
              if (res?.data?.data?.token) {
                this.isLogin = true;
                Taro.setStorage({
                  key: "userToken",
                  data: token,
                  success: () => {
                    this.getBookInfo();
                  },
                });
              }
            });
          }
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },

    getWxUserInfo() {
      Taro.getUserInfo({
        success: (res) => {
          console.log(res);
          this.userInfo = res.userInfo;
          Taro.setStorage({
            key: "userInfo",
            data: res.userInfo,
          });
        },
      });
    },
    getStorageUserInfo() {
      Taro.getStorage({
        key: "userInfo",
        success: (res) => {
          if (res.data) {
            this.userInfo = res.data;
          }
        },
      });
      Taro.getStorage({
        key: "code",
        success: (res) => {
          console.log(res);
          if (res.data) {
            this.userToken = res.data;
          }
        },
      });
    },
    getStorageUserToken() {
      Taro.getStorage({
        key: "userToken",
        success: () => {
          this.isLogin = true;
          this.getBookInfo();
        },
      });
    },
    getWxCode() {
      Taro.login({
        success: (res) => {
          console.log(res);
          this.code = res.code;
        },
      });
    },
    login() {
      this.confirmLogin();
    },
    confirmLogin() {
      Taro.showModal({
        title: "温馨提示",
        content: "深辅需要您登录以提供更优质服务!",
        confirmText: "确认登录",
        cancelText: "暂不登录",
        success: (res) => {
          let { cancel, confirm } = res;
          if (cancel) {
            return;
          }
          if (confirm) {
            this.handleLogin();
          }
        },
      });
    },
    handleLogin() {
      const code = this.code;
      const { avatarUrl, gender, nickName } = this.userInfo;
      API.userLogin({ code, avatarUrl, gender, nickName }).then((res) => {
        const {
          subjectId,
          textbookVersionId,
          textbookId,
          token,
        } = res?.data?.data;
        if (res?.data?.data?.token) {
          this.isLogin = true;
          Taro.setStorage({
            key: "userToken",
            data: token,
            success: () => {
              this.getBookInfo();
            },
          });
        }
      });
    },
    logout() {
      Taro.showToast({ title: "您已退出登录!" });
      this.isLogin = false;
      Taro.clearStorageSync();
      Taro.switchTab({ url: "/pages/user/index" });
    },
    getBookInfo() {
      API.getBookInfo().then((res) => {
        this.bookInfo = res?.data?.data;
      });
    },
    toGrade() {
      if (!this.isLogin) return;
      Taro.navigateTo({
        url: "/pages/index/index",
      });
    },
    tLogin() {
      wx.showModal({
        title: "提示",
        content: "将要通过登录教师账号前往教师管理界面, 是否前往?",
        success(res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: "/pages/tLogin/index",
            });
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style lang='less'>
.index {
  height: 100%;
  background-color: #101010;
}
.userInfo {
  height: 236px;
  padding: 0px 58px 58px;
  image {
    width: 148px;
    height: 148px;
  }
  .userName {
    color: #fff;
    margin-left: 36px;
    font-size: 35px;
  }
  .loginbtn {
    font-weight: bold;
    width: 300px;
  }
}
.operate {
  padding: 0 62px;
  box-sizing: border-box;
}
.common {
  padding: 0 28px;
  margin-bottom: 28px;
  height: 106px;
  font-size: 28px;
  background: #2d2d2d;
  box-shadow: 0px 2px 6px 0px rgba(50, 55, 53, 0.05);
  border-radius: 12px;
  image {
    width: 25px;
    height: 25px;
  }
}
.common.btn {
  width: 100%;
}
.common.btn::after {
  border: none;
}

.logout {
  width: 100%;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout .btn {
  width: 588px;
  height: 80px;
  text-align: center;
  color: #434343;
  background-color: rgb(240, 240, 240);
  line-height: 80px;
}

.loginbtn {
  font-weight: bold;
  width: 300px;
}
.loginbtn::after {
  border: none;
}
</style>
