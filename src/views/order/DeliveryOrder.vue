<template>
  <section>
    <h2 class="sub-title">출고 현황</h2>
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
      <DeliverList :id="id" :orderRealTimeId="orderRealTimeId" :uid="uid" />
    </section>
  </section>
</template>
<script>
import DeliverList from "@/components/order/DeliverDetail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/db";
export default {
  components: { DeliverList },
  data() {
    return {
      id: this.$route.params.id,
      date: this.$route.params.date,
      shopName: this.$route.params.shopName,
      orderRealTimeId: this.$route.params.orderRealTimeId,
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
  font-size: 1.6rem;
  margin-bottom: 20px;
}
</style>
