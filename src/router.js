import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: "/download",
      name: "download",
      component: () =>
        import("./views/download.vue")
    },
    {
      path: "/test",
      name: "test",
      component: () =>
        import("./views/test.vue")
    },
  ]
})
