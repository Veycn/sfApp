<template>
  <view class="index">
    <view class="userInfo flex f-ai-c" v-if="isLogin">
      <image :src='userInfo.avatarUrl'></image>
      <text class="userName">{{userInfo.nickName}}</text>
   </view>
   <view class="userInfo flex f-ai-c" v-else>
      <image src='../../assets/icon/user.png'></image>
      <button class="userName loginbtn" @tap="login" open-type="getUserInfo" style="background:black;">登录</button>
   </view>

    <view class="operate">
    <view class="common flex f-ai-c f-jc-sb" @tap='toGrade'>
      <text style="color:white;">{{bookInfo || '暂无记录, 登录后可选择或查看哦.'}}</text>
      <image src="../../assets/icon/right.png"></image>
    </view>
    <button class="common btn flex f-ai-c f-jc-sb" open-type="contact">
      <text style="color:white;">我的客服</text>
      <image src="../../assets/icon/right.png"></image>
    </button>
    <view class="common flex f-ai-c f-jc-sb" @tap="tLogin">
      <text style="color:white;">教师中心</text>
      <image src="/assets/icon/right.png"></image>
    </view>
    </view>
    <view class="logout" v-if="isLogin">
  <!-- <navigator target="miniProgram" open-type="exit"  bindtap="logout"><view class="btn">退出账号</view></navigator> -->
  <view class="btn"  @tap="logout">退出账号</view>
  </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import  request  from '../../utils/http';
export default {
  name: 'Index',
  components: {
  },
  data() {
    return {
      bookInfo: '',
      canIUse: Taro.canIUse('button.open-type.getUserInfo'),
      isLogin: false,
      userInfo: {},
      hasUserInfo: false,
      code: '',
      loginInfo: {},
      canLogin: false,
    }
  },
  created() {
    this.getBookInfo();
  },
  methods: {
    login (){
      this.confirmLogin();
      Taro.getUserInfo({
        success: res => {
          // app.globalData.userInfo = res.userInfok
            this.userInfo = res.userInfo;
            this.hasUserInfo = true;
        },
        fail: res => {
          console.log(res);
        }
      })
    },
    confirmLogin() {
      Taro.showModal({
        title:"温馨提示",
        content: "深辅需要您登录以提供更优质服务!",
        confirmText: "确认登录",
        cancelText: "暂不登录",
        success: res => {
          let {cancel, confirm} = res
          if(cancel){
            Taro.navigateTo({url: '/pages/user/index'})
            return 
          }
          if(confirm){
            this.handleLogin()
          }
        }
      })
    },
    handleLogin() {
      let codeP = new Promise((resolve, reject) => {
        Taro.login({
          success: res => {
            this.code = res.code;
            resolve(res.data);
          }
        })
      })
      console.log(codeP);
      let userInfoP = new Promise((resolve, reject) => {
        Taro.getUserInfo({
          success: res => {
            this.userInfo = res.userInfo;
            this.hasUserInfo = true;
          },
          fail: res => {
            console.log('error:' + res);
          }
        })
        resolve(1);
      })
      console.log(userInfoP);
      Promise.all([codeP, userInfoP]).then(() => {
        console.log(2);
        this.canLogin = true;
        this.userLogin();
        console.log(1111);
      }).catch(err => {
        console.log(err);
        Taro.showToast({
          title: '系统异常',
          icon: 'none'
        });
      })
    },
    userLogin() {
      console.log('userlogin');
      const code = this.code;
      const { nickName, gender, city, province, country, avatarUrl } = this.userInfo;
      const userInfo = this.userInfo;
      Taro.setStorage({
        key: 'userInfo',
        data: userInfo
      })
      Taro.request({
        url:'https://www.shenfu.online/sfeduWx/api/userAccount/login',
        method: 'post',
        data: { code, nickName, gender, city, province, country, avatarUrl },
        success: res => {
          console.log(res);
          if(res.statusCode === 200 && res.data.status !== -1) {
            this.loginInfo = res.data;
            this.isLogin = true;
            Taro.showToast({
              title: '登录成功',
              icon: 'none'
            });
            Taro.setStorage({
              key: 'userToken',
              data: res.data.data && res.data.data.token || ''
            })
            this.getBookInfo();
          } else {
            Taro.showToast({
              title: '登录失败',
              icon: 'none'
            });
            this.confirmLogin();
          }
        }
      })
    },
    getUserInfo() {
      this.userInfo = e.detail.userInfo;
      this.hasUserInfo = true;
      this.userLogin();
    },
    logout () {
      Taro.showToast({title: '您已退出登录!'})
      this.isLogin = false;
      Taro.clearStorageSync()
      Taro.switchTab({url: '/pages/user/index'})
    },
    getBookInfo () { 
      if(!this.isLogin) return
      request.get({
        url: 'api/exam/getUserTextbookInfo',
        params: {}
      }).then(res=>{
        this.bookInfo = res.data.data;
      })
    },
    toGrade() {
      if(!this.isLogin) return
      Taro.navigateTo({
        url: '/pages/index/index',
      })
    },
    tLogin() {
      wx.showModal({
        title: '提示',
        content: '将要通过登录教师账号前往教师管理界面, 是否前往?',
        success(res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: '/pages/tLogin/index',
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
  }
}
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
    height:148px;
  }
  .userName {
    color:#fff;
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
  background: #2D2D2D;
  box-shadow:0px 2px 6px 0px rgba(50,55,53,0.05);
  border-radius:12px;
  image {
    width: 25px;
    height: 25px;
  }
}
.common.btn{
  width: 100%;
}
.common.btn::after {
  border: none;
}


.logout{
  width: 100%;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout .btn{
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
.loginbtn::after{
  border: none;
}



</style>
