<template>
  <section>
    <h2 class="sub-title">주문 상세 보기 및 내역서 회신</h2>
    <section class="sub-container">
      <article class="order-info d-flex justify-space-between">
        <div>출판사명: <strong>민음사</strong></div>
        <div>2022.10.4</div>
      </article>
      <DeliverList />
    </section>
  </section>
</template>
<script>
import DeliverList from "@/components/deliver/DeliverList";
export default {
  components: { DeliverList },
};
</script>
<style lang="scss" scoped>
.order-info {
  font-size: 1.6rem;
  margin-bottom: 20px;
}
</style>
