<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <!-- 可以从 @getuserinfo 事件处理函数的形参中，获取到用户的基本信息 -->
    <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    SET_USERID
  } from './@/token/token.js'
  // 1. 按需导入 mapMutations 辅助函数
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      // 调用 mapState 辅助方法，把 m_user 模块中的数据映射到当前用组件中使用
      ...mapState('m_user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // 获取微信用户的基本信息
      getUserProfile(e) {
        uni.getUserProfile({
          desc: '你的授权信息',
          success: (res) => {
            // 将信息存到 vuex 中
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: (res) => {
            return uni.$showMsg('您取消了登录授权')
          }
        })
      },
      // 调用登录接口，换取永久的 token
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== "login:ok") return uni.$showError('登录失败！')

        // 下面我们强制获取token字符串，因为使用新接口中用户信息一些不存在，
        // 加着后端进行信息判断，所以返回错误信息，没有token
        // 准备参数对象
        // const query = {
        //   code: res.code,
        //   encryptedData: info.encryptedData,
        //   iv: info.iv,
        //   rawData: info.rawData,
        //   signature: info.signature
        // }

        // // 换取 token
        // const {
        //   data: loginResult
        // } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // 去这里返回来的是错误的信息，因为在新的接口中，getUserProfile返回的数据中不会
        // 再返回用户信息的国家和省份等其他信息
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // // 2. 更新 vuex 中的 token
        // this.updateToken(loginResult.message.token)
        const token = await SET_USERID();
        this.updateToken(token)

        if (this.redirectInfo) return this.navigateBack();
      },
      // 返回登录之前的页面
      navigateBack() {
        // redirectInfo 不为 null，并且导航方式为 switchTab
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          // 调用小程序提供的 uni.switchTab() API 进行页面的导航
          uni.switchTab({
            // 要导航到的页面地址
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
