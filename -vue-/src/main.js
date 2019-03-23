// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Card, Button, Tab, Tabs, Lazyload } from 'vant'
import axios from 'axios'

/* eslint-disable no-new */
import moment from 'moment'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:5000/'
const options = {
  loading: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3141884915,1244172667&fm=26&gp=0.jpg'
}
Vue
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Card)
  .use(Button)
  .use(Tab)
  .use(Tabs)
  .use(Lazyload, options)

// Vue.config.productionTip = false

// 全局过滤器
Vue.filter('datemt', (data, str = 'YYYY MM DD hh:mm:ss') => {
  return moment(data).format(str)
})
new Vue({
  el: '#app',
  render: c => c(App),
  router
})
