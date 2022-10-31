import Vue from "vue";
import VueRouter from "vue-router";
import { getCookie } from "@/utils/cookie";
const lnb = () => import("@/components/common/Lnb.vue");
const footer = () => import("@/components/common/Footer.vue");

Vue.use(VueRouter);

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
      path: "/DeliveryOrder",
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

//router guard 숨김처리
router.beforeEach(async (to, from, next) => {
  //액세스 토큰이 있을 경우
  if (getCookie("accessToken") !== null) {
    return next();
  }

  //로그인 필요 없는 페이지
  if (to.matched.some(record => record.meta.unauthorized) || getCookie("accessToken")) {
    return next();
  }

  //액세스 토큰이 없을 경우
  return next("/login");
});

export default router;