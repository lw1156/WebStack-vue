import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Index from './views/wechatnav/WechatIndex.vue'
import JumpTo from './views/wechatnav/JumpTo.vue'
import About from './views/about.vue'
import './assets/css/fonts/linecons/css/linecons.css'
import './assets/css/fonts/fontawesome/css/font-awesome.min.css'
import './assets/css/bootstrap.css'
import './assets/css/xenon-core.css'
import './assets/css/xenon-components.css'
import './assets/css/xenon-skins.css'
import './assets/css/nav.css'


// 引入全局可用阿里图标样式文件
// import './assets/wechatnav/iconfont.css'
// 引入全局可用阿里图标js文件
import './assets/wechatnav/iconfont.js'
// 引入自己设置的全局icon基础样式，一般用于规定基础的svg宽高和图标大小

//axios引入
import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.config.ignoredElements = ['wx-open-launch-weapp'];

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
  { path: '/jump', component: JumpTo },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
