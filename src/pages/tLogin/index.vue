<template>
  <view class="p-container">
  <!-- <image class="bg" mode="widthFix" src="../../assets/pic/login_bg.png"/> -->
  <view class="logo">
    <image class="pic" src="../../assets/icon/login_logo1.png"/>
    <text class="title">深辅AI·教师中心</text>
  </view>
  <view class="form">
    <view class="accout item">
      <image src="../../assets/icon/acc.png" class="icon" mode="widthFix"></image>
      <input type="text" placeholder="请输入手机号/邮箱" class="ipt" @Input="onChange" data-type="acc"/>
    </view> 
    <view class="password item">
      <image src="../../assets/icon/password.png" class="icon"  mode="widthFix"></image>
      <input type="password" placeholder="请输入密码" class="ipt"  @Input="onChange" data-type="pas"/>
    </view>
  </view>
  <view class="login" >
    <button class="btn" @tap="teacherLogin"><text class="login-text">登 录</text></button>
  </view>
  <!-- <view class="banner"></view> -->
  </view>
</template>

<script>
import Taro from '@tarojs/taro';
import request from '../../utils/http';
export default {
  data() {
    return {
      account: '1791576240@qq.com',
      password: '105760'
    }
  },
  created() {
      Taro.setStorageSync('teacherToken', "")
  },
  methods: {
    onChange (e) {
      let val = e.detail.value
      let type = e.currentTarget.dataset.type
      if(type === 'acc'){
       this.account = val;
      }else if(type === 'pas') {
      this.password = val;
    }
  },

    teacherLogin () {
    let account = this.account;
    let password = this.password;
    if(!account || !password){
      Taro.showToast({title: "请输入账号和密码!", icon: 'none'})
    }else{      
      request.post({
        url: 'api/teacherAccount/login',
        params: {email: account, psw: password},
      }).then( res => {
        if(res.data.status === 200){
          Taro.showToast({title: "登录成功!", icon: "success"})
          Taro.setStorageSync('teacherToken', res.data.data.token)
          setTimeout(() => {
            Taro.navigateTo({url: '/pages/income/index'}) 
          }, 1200);            
        }else{
          Taro.showToast({title: res.msg, icon: "none"})
        }
      })
    }
    },
  },
}
</script>


<style lang="less">
.p-container {
  background-color: #101010;
  width: 100%;
  height: 100%;
  .logo {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 280px;
    .pic {
      width: 322px;
      height: 150px;
    }
    .title {
      font-size: 30px;
      padding: 20px;
      color: #0BD176;
    }
  }
  .btn {
    margin-top: 100px;
    height: 100px;
    width: 394px;
    border-radius: 50px;
    background: #15DA7F;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-text {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 48px;
      line-height: 100px;
    }
  }
}
.btn::after{
  border: 0;
}

.form{
  padding-top: 80px;
}
.form .icon {
  width: 33px;
  height: 33px;
}
.form > .item {
  width: 496px;
  height: 88px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  background-color: #fff;
}

.form > .item .ipt {
  font-size: 28px;
  margin-left: 25px;
}
</style>