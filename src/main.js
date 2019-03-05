import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import  "./assets/flexible";

import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui';

Vue.prototype.$message = Message;
Vue.prototype.$axios = axios;


Vue.config.productionTip = false





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
