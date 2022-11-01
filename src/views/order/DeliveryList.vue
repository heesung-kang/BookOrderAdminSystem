<template>
  <section>
    <h2 class="sub-title">출고 목록</h2>
    <section class="sub-container">
      <h3>출고 목록</h3>
      <section class="mt10">
        <SearchDateRangeGroup :itemList="itemList" @search="search" />
      </section>
      <section class="mt30">
        <DeliveryList :searchObj="searchObj" />
      </section>
    </section>
  </section>
</template>

<script>
import SearchDateRangeGroup from "@/components/form/SearchDateRangeGroup";
import DeliveryList from "@/components/order/DeliveryList";
export default {
  components: { SearchDateRangeGroup, DeliveryList },
  data() {
    return {
      itemList: [{ item: "서점", value: "shop" }],
      searchObj: {},
    };
  },
  methods: {
    search(payload) {
      this.searchObj = payload;
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  @include NotoSans(1.6, 500, #000);
}
</style>
