<template>
  <section>
    <!-- 발주 내역 -->
    <section class="header d-flex" v-if="!mobile">
      <div>품목정보</div>
      <div>ISBN</div>
      <div class="d-flex">
        <div>정가</div>
        <div>공급률</div>
      </div>
      <div>공급가</div>
    </section>
    <ul class="body">
      <li class="d-flex align-center">
        <div class="d-flex align-center info-wrap">
          <div class="thumbnail"><img src="@/assets/images/book.jpg" alt="" /></div>
          <div class="book-info">
            <h3>아노말리(양장본 Hardcover)</h3>
            <div class="author">에르베 르 텔리에</div>
          </div>
        </div>
        <div class="isbn">9788937427220</div>
        <div class="d-flex price-info">
          <div class="normal-price"><span v-if="mobile">정가</span> 20,000</div>
          <div><span v-if="mobile">공급률</span> 60%</div>
        </div>
        <div class="final-price"><span v-if="mobile">공급가</span> 12,000</div>
      </li>
    </ul>
    <!-- //발주 내역 -->
    <!-- 총 합계 --->
    <section class="total-wrap mt24">
      <div>
        <span class="total-prod">총 6권</span>
        <span class="total">합계 72,000원</span>
      </div>
      <div class="address">수령지:서울시 관악구 신림동 54-1 낙성대학교 기숙사 A동</div>
    </section>
    <!-- //총 합계 --->
    <!-- 배본 설정 -->
    <div class="d-flex align-center mt10 justify-end">
      <span class="mr10">배본 설정: </span>
      <Selects :itemList="itemList" />
      <button class="primary ml10">출고지시</button>
    </div>
    <!-- //배본 설정 -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { getPopupOpt } from "@/utils/modal";
import ModalMemo from "@/components/modal/ModalMemo.vue";
import Selects from "@/components/form/Selects";
export default {
  components: { Selects },
  data() {
    return {
      selected: [],
      itemList: [{ item: "배본사", value: "01" }],
    };
  },
  computed: {
    ...mapGetters("common", ["windowWidth", "mobile"]),
  },
  methods: {
    showModal() {
      this.mobile
        ? this.$modal.show(ModalMemo, {}, getPopupOpt("ModalMemo", "95%", "auto", false))
        : this.$modal.show(ModalMemo, {}, getPopupOpt("ModalMemo", "500px", "auto", false));
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 5px 13px;
  & > div {
    text-align: center;
    @extend .size;
  }
  .dual {
    div {
      &:nth-child(1) {
        text-align: left;
        width: 80px;
      }
      &:nth-child(2) {
        text-align: center;
        width: calc(100% - 80px);
      }
    }
  }
}
.body {
  li {
    background-color: #fff;
    border: 1px solid #000;
    padding: 5px 13px;
    & > div {
      text-align: center;
      @extend .size;
      .thumbnail {
        width: 40px;
        min-width: 40px;
        img {
          width: 100%;
          height: 50px;
          border: 1px solid #ccc;
        }
      }
      .book-info {
        margin-left: 18px;
        .author {
          text-align: left;
        }
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: center;
    }
  }
}
.total-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #000;
  padding: 15px 42px;
  .total-prod {
    @include NotoSans(1.6, 700, #000);
    margin-right: 48px;
  }
  .total {
    @include NotoSans(1.6, 700, #000);
  }
}
.size {
  &:nth-child(1) {
    width: calc(100% - 360px);
  }
  &:nth-child(2) {
    width: 120px;
  }
  &:nth-child(3) {
    width: 160px;
    & > div {
      &:nth-child(1) {
        width: 80px;
      }
      &:nth-child(2) {
        width: 80px;
      }
    }
  }
  &:nth-child(4) {
    width: 80px;
  }
}
@include mobile {
  .body {
    li {
      padding: 19px 18px;
      flex-direction: column;
      align-items: flex-start !important;
      div {
        font-size: 1.6rem;
      }
      .info-wrap {
        width: 100% !important;
        align-items: flex-start !important;
        .book-info {
          width: 100%;
          h3 {
            text-align: left;
          }
        }
      }
      .isbn {
        margin-left: 56px;
      }
      .price-info {
        margin-left: 60px;
        .normal-price {
          margin-right: 20px;
        }
        div {
          text-align: left;
          white-space: nowrap;
        }
      }
      .final-price {
        margin: 10px 0 0 60px;
        text-align: left;
        white-space: nowrap;
      }
      .count {
        margin-left: 60px;
        text-align: left;
        white-space: nowrap;
      }
      .btn-wrap {
        margin: 10px 0 0 50px;
      }
    }
  }
  .total-wrap {
    align-items: flex-start;
    flex-direction: column;
    background-color: #fff;
    max-width: 100%;
    padding: 15px 20px;
    .total-prod {
      @include NotoSans(1.6, 700, #000);
      margin-right: 28px;
    }
    .total {
      @include NotoSans(1.6, 700, #000);
    }
    .address {
      margin-top: 5px;
      @include NotoSans(1.6, 400, #000);
    }
  }
}
</style>
