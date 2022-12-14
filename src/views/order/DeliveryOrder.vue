<template>
  <section>
    <h2 class="sub-title">주문 상세 보기 및 내역서 회신</h2>
    <section class="sub-container">
      <article class="order-info d-flex justify-space-between">
        <div>
          서점명: <strong>{{ shopName }}</strong>
        </div>
        <div>{{ date }}</div>
      </article>
      <DeliverList :id="id" :orderRealTimeId="orderRealTimeId" :uid="uid" />
    </section>
  </section>
</template>
<script>
import DeliverList from "@/components/order/DeliverDetail";
export default {
  components: { DeliverList },
  data() {
    return {
      id: this.$route.params.id,
      date: this.$route.params.date,
      shopName: this.$route.params.shopName,
      orderRealTimeId: this.$route.params.orderRealTimeId,
      uid: this.$route.params.uid,
    };
  },
};
</script>
<style lang="scss" scoped>
.order-info {
  font-size: 1.6rem;
  margin-bottom: 20px;
}
</style>
