import Vue from "vue";
import VueRouter from "vue-router";
const lnb = () => import("@/components/common/Lnb.vue");
const footer = () => import("@/components/common/Footer.vue");

Vue.use(VueRouter);
const key = process.env.VUE_APP_FIREBASE_APP_KEY;
const router = new VueRouter({
  //mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/OrderList",
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: () => import("@/views/login/SignUp.vue"),
      meta: { unauthorized: true },
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("@/views/login/Login.vue"),
      meta: { unauthorized: true },
    },
    {
      path: "/OrderList",
      name: "OrderList",
      components: {
        lnb,
        footer,
        contents: () => import("@/views/order/OrderList.vue"),
      },
    },
    {
      path: "/OrderListDetail/:id/:date/:orderTimeId/:shopName/:uid",
      name: "OrderListDetail",
      components: {
        lnb,
        footer,
        contents: () => import("@/views/order/OrderListDetail.vue"),
      },
    },
    {
      path: "/DeliveryList",
      name: "DeliveryList",
      components: {
        lnb,
        footer,
        contents: () => import("@/views/order/DeliveryList.vue"),
      },
    },
    {
      path: "/DeliveryOrder/:id/:date/:orderRealTimeId/:shopName/:uid",
      name: "DeliveryOrder",
      components: {
        lnb,
        footer,
        contents: () => import("@/views/order/DeliveryOrder.vue"),
      },
    },
    {
      path: "/PublisherInfo",
      name: "PublisherInfo",
      components: {
        lnb,
        footer,
        contents: () => import("@/views/publisher/PublisherInfo.vue"),
      },
    },
    //404
    {
      path: "*",
      name: "pageNotFound",
      component: () => import("@/views/error/NotFoundPage.vue"),
      meta: { unauthorized: true },
    },
  ],
});

//router guard
router.beforeEach(async (to, from, next) => {
  const session = JSON.parse(sessionStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`));
  //session 있거나 로그인 필요 없는 페이지
  if (to.matched.some(record => record.meta.unauthorized) || session) {
    return next();
  }

  //session  없을 경우
  return next("/login");
});

export default router;
