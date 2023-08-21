// 引入vue库和vuex库用于创建store
import Vue from 'vue';
import Vuex from 'vuex';
// 导入购物车的 vuex 模块
import moduleCart from './cart.js'
// 导入用户的 vuex 模块
import moduleUser from './user.js'
// 将vuex安装为vue的插件
Vue.use(Vuex);
// 创建store共享数据的对象
const store = new Vuex.Store({
  // 挂载store模块
  modules: {
    // 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
    // 购物车模块中 cart 数组的访问路径是 m_cart/cart
    m_cart: moduleCart,
    // 挂载用户的 vuex 模块，访问路径为 m_user
    m_user: moduleUser,
  }
})

// 暴露共享store对象模块
export default store;
