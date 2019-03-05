import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/index",
      name: "index",
      component: () =>
        import("./views/index.vue")
    },
    {
      path: "/customerIntro",
      name: "customerIntro",
      component: () =>
        import("./views/customerIntro.vue")
    },
    {
      path: "/flowCard",
      name: "flowCard",
      // route level code-splitting
      // this generates a separate chunk (flowCard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "flowCard" */ "./views/flowCard.vue")
    },
    {
      path: "/flowDistribute",
      name: "flowDistribute",
      component: () =>
        import("./views/flowDistribute.vue")
    },
    {
      path: "/flowPoolInfo",
      name: "flowPoolInfo",
      component: () =>
        import("./views/flowPoolInfo.vue")
    },
    {
      path: "/flowPoolInfoCard",
      name: "flowPoolInfoCard",
      component: () =>
        import("./views/flowPoolInfoCard.vue")
    },
    {
      path: "/customerInfo",
      name: "customerInfo",
      component: () =>
        import("./views/customerInfo.vue")
    },
    {
      path: "/addEdit",
      name: "addEdit",
      component: () =>
        import("./views/addEdit.vue")
    },
    {
      path: "/customerProductInfo",
      name: "customerProductInfo",
      component: () =>
        import("./views/customerProductInfo.vue")
    },
    {
      path: "/cardInfo",
      name: "cardInfo",
      component: () =>
        import("./views/cardInfo.vue")
    },
    {
      path: "/cardDetail",
      name: "cardDetail",
      component: () =>
        import("./views/cardDetail.vue")
    },
    // -------------------- 操作管理 --------------------
    {
      path: "/userManage",
      name: "userManage",
      component: () =>
        import("./views/userManage.vue")
    },
    {
      path: "/roleConfig",
      name: "roleConfig",
      component: () =>
        import("./views/roleConfig.vue")
    },
    {
      path: "/roleManage",
      name: "roleManage",
      component: () =>
        import("./views/roleManage.vue")
    },
    {
      path: "/departmentManage",
      name: "departmentManage",
      component: () =>
        import("./views/departmentManage.vue")
    }
  ]
});
