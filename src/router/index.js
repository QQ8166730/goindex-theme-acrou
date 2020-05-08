import Vue from "vue";
import VueRouter from "vue-router";
// 路由数据
import routes from "./routes";

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savePosition) {
    return { x: 0, y: 0 };
  },
  routes,
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  console.log("before:");
  console.log(to,from);
  next();
});

router.afterEach((to) => {
  console.log("after:");
  console.log(to);
});

export default router;