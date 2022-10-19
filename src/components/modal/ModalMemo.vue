<template>
  <modalWrap @close="close">
    <template slot="head"><h2>메모</h2></template>
    <template slot="body">
      <textarea></textarea>
      <div class="btn-wrap"><button class="primary">보내기</button></div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
export default {
  name: "Order",
  components: { modalWrap },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  height: 200px;
}
.btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>
