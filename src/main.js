import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from "./components/common/toast";

// 添加事件总线对象
Vue.config.productionTip = false
// 安装toast插件 (调用toast.install)
Vue.use(toast)

// 解决移动端300ms延迟\
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyload, {
  // 预加载高度比例
  preLoad: 2,
  // 引入占位图片(没有起作用)
  // loading: '../assets/img/common/placeholder.png'
})

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
