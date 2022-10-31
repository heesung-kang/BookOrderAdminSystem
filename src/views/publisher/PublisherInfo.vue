<template>
  <section>
    <h2 class="sub-title">출판사 정보</h2>
    <section class="sub-container">
      <PublisherInfo />
      <Distribution />
    </section>
  </section>
</template>

<script>
import PublisherInfo from "@/components/pubilsher/PublisherInfo";
import Distribution from "@/components/pubilsher/Distribution";
export default {
  components: { Distribution, PublisherInfo },
};
</script>

<style lang="scss" scoped></style>
