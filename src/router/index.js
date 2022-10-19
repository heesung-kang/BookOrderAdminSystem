import Vue from "vue";
import VueRouter from "vue-router";

const lnb = () => import("@/components/common/Lnb.vue");
const footer = () => import("@/components/common/Footer.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  //mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/SearchOrder",
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
      meta: { unauthorized: true },
    },
    {
      path: "/OrderListDetail",
      name: "OrderListDetail",
      components: {
        lnb,
        footer,
        contents: () => import("@/views/order/OrderListDetail.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/DeliveryOrder",
      name: "DeliveryOrder",
      components: {
        lnb,
        footer,
        contents: () => import("@/views/order/DeliveryOrder.vue"),
      },
      meta: { unauthorized: true },
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
// router.beforeEach(async (to, from, next) => {
//   //액세스 토큰이 있을 경우
//   if (getAccessTokenCookie() !== null) {
//     return next();
//   }
//
//   //로그인 필요 없는 페이지
//   if (to.matched.some(record => record.meta.unauthorized) || getAccessTokenCookie()) {
//     return next();
//   }
//
//   //액세스 토큰이 없을 경우
//   return next("/login");
// });

export default router;
