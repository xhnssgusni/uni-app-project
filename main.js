// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 按需导入$http对象
import {
  $http
} from './api/request'

// 在uni-app项目中可以把$http挂载到uni顶级对象上，方便全局调用
uni.$http = $http;
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net';

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

App.mpType = 'app'

const app = new Vue({
  ...App
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
