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
      <div>주문</div>
      <div>공급</div>
      <div>회신</div>
    </section>
    <ul class="body">
      <li class="d-flex align-center" v-for="(book, index) in books" :key="index">
        <div class="d-flex align-center info-wrap">
          <div class="book-info">
            <h3>{{ book.data.subject }}</h3>
            <div class="author">{{ book.data.author }}</div>
          </div>
        </div>
        <div class="isbn">{{ book.data.isbn }}</div>
        <div class="d-flex price-info">
          <div class="normal-price"><span v-if="mobile">정가</span> {{ book.data.price?.toLocaleString() }}</div>
          <div><span v-if="mobile">공급률</span> {{ book.data.supply_rate }}%</div>
        </div>
        <div class="final-price"><span v-if="mobile">공급가</span> {{ ((book.data.price * book.data.supply_rate) / 100).toLocaleString() }}</div>
        <div class="count"><span v-if="mobile">주문</span> {{ book.data.count }}</div>
        <div class="count"><span v-if="mobile">공급</span> <input type="number" class="basic" v-model="book.data.reply_count" /></div>
        <!-- 버튼종류 : 정상, 품절, 절판, 재고부족 -->
        <div class="btn-wrap">
          <SelectsReply @select="changeStatus" :index="index" :dafaultValue="book.data.publisher_reply_status" />
        </div>
      </li>
    </ul>
    <!-- //발주 내역 -->
    <!-- 총 합계 --->
    <section class="total-wrap mt24">
      <div>
        <span class="total-prod">총 6권</span>
        <span class="total">합계 72,000원</span>
      </div>
      <div class="d-flex">
        <button class="primary" @click="showModal">회신</button>
      </div>
    </section>
    <!-- //총 합계 --->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { getPopupOpt } from "@/utils/modal";
import ModalMemo from "@/components/modal/ModalMemo.vue";
import SelectsReply from "@/components/form/SelectsReply";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/db";
import BookListSkeleton from "@/skeletons/BookListSkeleton";
import BookListMobileSkeleton from "@/skeletons/BookListMobileSkeleton";
export default {
  components: { SelectsReply },
  props: ["id", "orderTimeId", "uid"],
  data() {
    return {
      selected: [],
      books: [],
    };
  },
  computed: {
    ...mapGetters("common", ["windowWidth", "mobile"]),
  },
  async created() {
    try {
      this.$store.commit("common/setSkeleton", true);
      const first = query(
        collection(db, "orderRequest"),
        where("uid", "==", this.uid),
        where("sid", "==", Number(this.id)),
        where("order_time_id", "==", this.orderTimeId),
      );
      const documentSnapshots = await getDocs(first);
      await documentSnapshots.forEach(doc => {
        this.books.push({ id: doc.id, data: doc.data() });
      });
    } catch (e) {
      console.log(e);
    }
    this.$store.commit("common/setSkeleton", false);
  },
  methods: {
    showModal() {
      this.mobile
        ? this.$modal.show(ModalMemo, {}, getPopupOpt("ModalMemo", "95%", "auto", false))
        : this.$modal.show(ModalMemo, {}, getPopupOpt("ModalMemo", "500px", "auto", false));
    },
    changeStatus(payload) {
      this.books[payload.index].data.publisher_reply_status = payload.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 5px 13px;
  & > div {
    text-align: center;
    @include NotoSans(1.6, 500, #000);
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
    padding: 5px 13px;
    margin-bottom: 6px;
    .final-price {
      @include NotoSans(1.4, 700, #000);
    }
    & > div {
      text-align: center;
      @extend .size;
      .book-info {
        h3 {
          @include NotoSans(1.6, 500, #000);
        }
        .author {
          text-align: left;
          @include NotoSans(1.4, 400, #000);
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
  max-width: 550px;
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
    width: calc(100% - 460px);
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
  &:nth-child(5) {
    width: 60px;
  }
  &:nth-child(5) {
    width: 60px;
  }
  &:nth-child(6) {
    width: 100px;
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
      .price-info {
        .normal-price {
          margin-right: 20px;
        }
        div {
          text-align: left;
          white-space: nowrap;
        }
      }
      .final-price {
        margin: 10px 0 0 0;
        text-align: left;
        white-space: nowrap;
      }
      .count {
        text-align: left;
        white-space: nowrap;
      }
      .btn-wrap {
        justify-content: flex-start;
        margin: 10px 0 0 0;
      }
    }
  }
  .total-wrap {
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
  }
}
</style>
