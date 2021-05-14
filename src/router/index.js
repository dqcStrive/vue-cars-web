import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index";
import user from "../views/user/index";
import password from "../views/safe/password";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: index,

    children:[
      {
        path: '/user',
        name: 'User',
        component: user
      },
      // 账户
      // 登录
      {
        path: '/login',
        name: 'Login',
        meta:{
          title: "登录"
        },
        component: () => import("../views/account/login")
      },
      // 注册
      {
        path: '/register',
        name: 'Register',
        meta:{
          title: "注册"
        },
        component: () => import("../views/account/register")
      },
      // 忘记密码
      {
        path: '/forget',
        name: 'Forget',
        meta:{
          title: "忘记密码"
        },
        component: () => import("../views/account/forget")
      },
      //安全设置首页
      {
        path: '/safe',
        name: 'Safe',
        component: () => import("../views/safe/index")
      },
      // 重置密码
      {
        path: '/password',
        name: 'Password',
        component: password
      },
       // 设置资金密码
       {
        path: "/capital",
        name: "Capital",
        meta: {
          title: "设置资金密码"
        },
        component: () => import("../views/safe/capital")
      },
      // 绑定银行卡
      {
        path: "/bank",
        name: "Bank",
        meta: {
          title: "绑定银行卡"
        },
        component: () => import("../views/safe/bank")
      },
      // 绑定银行卡
      {
        path: "/bankAdd",
        name: "BankAdd",
        meta: {
          title: "添加银行卡"
        },
        component: () => import("../views/safe/bankAdd")
      },
      // 我的帐户
      {
        path: "/my",
        name: "My",
        meta: {
          title: "我的帐户"
        },
        component: () => import("../views/my/index")
      },
      // 实名认证
      {
        path: "/authentication",
        name: "Authentication",
        meta: {
          title: "实名认证"
        },
        component: () => import("../views/authentication/index")
      },
      // 充值
      {
        path: "/rechange",
        name: "Rechange",
        meta: {
          title: "充值"
        },
        component: () => import("../views/rechange/index")
      },
      // 订单
      {
        path: "/order",
        name: "Order",
        meta: {
          title: "租车订单"
        },
        component: () => import("../views/order/index")
      },
      {
        path: "/orderDetailed",
        name: "OrderDetailed",
        meta: {
          title: "订单详情"
        },
        component: () => import("../views/order/detailed")
      },
      {
        path: "/payStatus",
        name: "PayStatus",
        meta: {
          title: "支付状态"
        },
        component: () => import("../views/pay/status")
      },
      {
        path: "/payResult",
        name: "PayResult",
        meta: {
          title: "支付结果"
        },
        component: () => import("../views/pay/result")
      },
    ]
  },
];

const routerPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
