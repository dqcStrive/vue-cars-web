import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index";
import user from "../views/user/index";
import safe from "../views/safe/index";
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
      //安全设置首页
      {
        path: '/safe',
        name: 'Safe',
        component: safe
      },
      {
        path: '/password',
        name: 'Password',
        component: password
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
