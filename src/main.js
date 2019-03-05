import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {baseUrl} from './assets/base'
import 'element-ui/lib/theme-chalk/index.css'

import {
	Dropdown, DropdownMenu, DropdownItem, MessageBox, Message,
	Col, Row, Table, DatePicker, Input, Pagination, Menu, MenuItem,
	Loading, TableColumn, Form, FormItem, Button, Tag, Tabs,
	TabPane, Notification, Submenu, MenuItemGroup, Select, Option,
	Upload, Radio, Tooltip, Badge, Switch, Tree, Transfer
} from 'element-ui';

axios.defaults.baseURL = baseUrl;


Vue.use(Col).use(Row).use(Table).use(DatePicker)
	.use(Input).use(Pagination).use(Menu).use(MenuItem)
	.use(Loading).use(TableColumn).use(Form).use(FormItem)
	.use(Button).use(Tag).use(Tabs).use(TabPane).use(Submenu)
	.use(MenuItemGroup).use(Dropdown).use(DropdownMenu).use(DropdownItem)
	.use(Select).use(Option).use(Upload).use(Radio).use(Tooltip).use(Badge).use(Switch).use(Tree).use(Transfer)


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$axios = axios;


Vue.config.productionTip = false

axios.interceptors.request.use(config => {
	config.params = Object.assign({_token: sessionStorage.getItem('_token')}, config.params)
	return config
}, err => {
	return Promise.reject(err)
})
//
axios.interceptors.response.use(function (response) {
	// token 已过期，重定向到登录页面
	if (response.data.code == 110) {
		console.log(response.data)
		sessionStorage.removeItem('_token')
		router.push('/')
		Message.error({message: (response.data.msg || response.data.info)});
	}
	return response
}, function (error) {
	// Do something with response error
	return Promise.reject(error)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
