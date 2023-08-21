// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 引入store对象
import store from './store/store'

// 按需导入$http对象
import {
  $http
} from './api/request'

// 在uni-app项目中可以把$http挂载到uni顶级对象上，方便全局调用
uni.$http = $http;
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net';

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
  console.log(store)
  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    // 为请求头添加身份认证字段
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.m_user.token,
    }
  }
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

// 取消vue开发工具的警告
Vue.config.productionTip = false

// 在 uni-app 中，每个页面或组件都有一个 mpType 属性，
// 用于指定文件的类型，可以是 'app'、'page' 或 'component'。
App.mpType = 'app'

const app = new Vue({
  ...App,
  // 将 store 挂载到 Vue 实例上
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
