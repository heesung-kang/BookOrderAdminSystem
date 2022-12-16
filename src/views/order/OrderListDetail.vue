<template>
  <section>
    <h2 class="sub-title">주문 내역 확인</h2>
    <section class="sub-container">
      <article class="order-info d-flex justify-space-between">
        <div>
          서점명: <strong>{{ shopName }}</strong>
          <span class="ml20"
            >전화번호: <strong>{{ shopInfo.tel }}</strong></span
          >
        </div>
        <div>{{ date }}</div>
      </article>
      <OrderResultList :id="id" :orderTimeId="orderTimeId" :uid="uid" />
    </section>
  </section>
</template>

<script>
import { db } from "@/utils/db";
import { getDoc, doc } from "firebase/firestore";
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
      shopInfo: "",
    };
  },
  async mounted() {
    try {
      const docRef = doc(db, "shopInfo", this.uid);
      const docSnap = await getDoc(docRef);
      this.shopInfo = docSnap.data();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
};
</script>

<style lang="scss" scoped>
.order-info {
  margin-bottom: 20px;
  font-size: 1.6rem;
}
</style>
