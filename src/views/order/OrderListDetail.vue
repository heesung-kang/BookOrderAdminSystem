<template>
  <section>
    <h2 class="sub-title">주문 내역 확인</h2>
    <section class="sub-container">
      <article class="order-info d-flex justify-space-between">
        <div>
          서점명: <strong>{{ shopName }}</strong>
        </div>
        <div>{{ date }}</div>
      </article>
      <OrderResultList :id="id" :orderTimeId="orderTimeId" :uid="uid" />
    </section>
  </section>
</template>

<script>
import OrderResultList from "@/components/order/OrderResultList";
export default {
  components: { OrderResultList },
  data() {
    return {
      id: this.$route.params.id,
      date: this.$route.params.date,
      shopName: this.$route.params.shopName,
      orderTimeId: this.$route.params.orderTimeId,
      uid: this.$route.params.uid,
    };
  },
};
</script>

<style lang="scss" scoped>
.order-info {
  margin-bottom: 20px;
  font-size: 1.6rem;
}
</style>
