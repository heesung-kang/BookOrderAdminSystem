<template>
  <section>
    <h2 class="sub-title">주문 상세 보기 및 내역서 회신</h2>
    <section class="sub-container">
      <article class="order-info d-flex justify-space-between">
        <div>출판사명: <strong>민음사</strong></div>
        <div>2022.10.4</div>
      </article>
      <OrderResultList />
    </section>
  </section>
</template>

<script>
import OrderResultList from "@/components/order/OrderResultList";
export default {
  components: { OrderResultList },
};
</script>

<style lang="scss" scoped>
.order-info {
  margin-bottom: 20px;
}
</style>
