<template>
  <!-- 출고대기 -->
  <table class="basic mb50" v-if="dataInit">
    <caption>
      서점별 주문리스트
    </caption>
    <thead>
      <tr>
        <th>서점</th>
        <th>상태</th>
        <th>수량</th>
        <th>발주일시</th>
        <th>결제방식</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="index"
        @click="statement({ id: item.sid, date: item.timestamp, orderRealTimeId: item.order_real_time_id, shopName: item.shop_name, uid: item.uid })"
      >
        <td v-if="item.shop_order_status === status">{{ item.shop_name }}</td>
        <td v-if="item.shop_order_status === status">{{ status === 3 ? "출고대기" : status === 4 ? "출고" : "완료" }}</td>
        <td v-if="item.shop_order_status === status">{{ item.totalCount }}</td>
        <td v-if="item.shop_order_status === status">{{ item.timestamp }}</td>
        <td>{{ item.payType === 0 ? "일반결제" : "월결제" }}</td>
      </tr>
    </tbody>
  </table>
  <!-- //출고대기 -->
</template>

<script>
export default {
  name: "OrderListTable",
  props: ["status", "data"],
  data() {
    return {
      dataInit: false,
    };
  },
  watch: {
    data(n) {
      this.dataInit = n.some(v => v.shop_order_status === this.status);
    },
  },
  mounted() {
    this.dataInit = this.data.some(v => v.shop_order_status === this.status);
  },
  methods: {
    statement(data) {
      this.$router.push(`/DeliveryOrder/${data.id}/${data.date}/${data.orderRealTimeId}/${data.shopName}/${data.uid}`);
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
</style>
