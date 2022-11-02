<template>
  <section>
    <BookListSkeleton v-if="!mobile && skeletonLoading" />
    <BookListMobileSkeleton v-if="mobile && skeletonLoading" />
    <!-- 발주 내역 -->
    <section class="header d-flex" v-if="!mobile && !skeletonLoading">
      <div>품목정보</div>
      <div>ISBN</div>
      <div class="d-flex">
        <div>정가</div>
        <div>공급률</div>
      </div>
      <div>공급가</div>
      <div class="d-flex">
        <div>주문</div>
        <div>공급</div>
      </div>
      <div>상태</div>
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
          <div class="normal-price"><span v-if="mobile">정가</span> {{ book.data.price?.toLocaleString() }}원</div>
          <div><span v-if="mobile">공급률</span> {{ book.data.supply_rate }}%</div>
        </div>
        <div class="final-price"><span v-if="mobile">공급가</span> {{ ((book.data.price * book.data.supply_rate) / 100).toLocaleString() }}원</div>
        <div class="d-flex price-info">
          <div class="normal-price"><span v-if="mobile">주문</span> {{ book.data.count }}</div>
          <div class="count">
            <span v-if="mobile">공급</span> <span :class="{ warning: book.data.count > book.data.reply_count }">{{ book.data.reply_count }}</span>
          </div>
        </div>
        <div><span v-if="mobile">상태</span> {{ book.data.shop_order_status === 3 ? "-" : book.data.shop_order_status === 4 ? "출고" : "완료" }}</div>
      </li>
    </ul>
    <!-- //발주 내역 -->
    <!-- 총 합계 --->
    <section class="total-wrap mt24" v-if="!skeletonLoading">
      <div>
        <span class="total-prod">총 {{ bookCount }}권</span>
        <span class="total">합계 {{ totalPrice.toLocaleString() }}원</span>
      </div>
      <div class="address">
        <p>수령지: {{ address1 }} {{ address2 }}</p>
        <p v-if="books[0].data.shop_order_status > 3">배본사 : {{ books[0].data.distribution }}</p>
      </div>
    </section>
    <!-- //총 합계 --->
    <!-- 배본 설정 -->
    <div class="d-flex align-center mt10 justify-end" v-if="!skeletonLoading && books[0].data.shop_order_status === 3">
      <span class="mr10">배본 설정: </span>
      <Selects :itemList="itemList" @change="changeSelect" />
      <button class="primary ml10" @click="order">출고지시</button>
    </div>
    <!-- //배본 설정 -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Selects from "@/components/form/Selects";
import BookListSkeleton from "@/skeletons/BookListSkeleton";
import BookListMobileSkeleton from "@/skeletons/BookListMobileSkeleton";
import { collection, getDocs, query, where, writeBatch, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/db";
export default {
  components: { Selects, BookListSkeleton, BookListMobileSkeleton },
  props: ["id", "orderRealTimeId", "uid"],
  data() {
    return {
      select: "",
      itemList: [{ item: "배본사 선택", value: "" }],
      books: [],
      address1: "",
      address2: "",
    };
  },
  computed: {
    ...mapGetters("common", ["windowWidth", "mobile", "skeletonLoading"]),
    bookCount() {
      //총 권수 계산
      let count = 0;
      this.books.forEach(ele => (count += Number(ele.data.reply_count)));
      return count;
    },
    totalPrice() {
      //총 금액 계산
      let price = 0;
      this.books.forEach(ele => {
        price += (ele.data.price * ele.data.supply_rate * ele.data.reply_count) / 100;
      });
      return price;
    },
  },
  async created() {
    await this.load();
    await this.distribution();
    await this.getAddress();
  },
  methods: {
    async load() {
      try {
        this.books = [];
        this.$store.commit("common/setSkeleton", true);
        const first = query(
          collection(db, "orderRequest"),
          where("uid", "==", this.uid),
          where("sid", "==", Number(this.id)),
          where("order_check", "==", true),
          where("order_real_time_id", "==", this.orderRealTimeId),
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
    //수령지 주소
    async getAddress() {
      const uid = this.books[0].data.uid;
      const docRef = doc(db, "shopInfo", uid);
      const docSnap = await getDoc(docRef);
      this.address1 = docSnap.data().address1;
      this.address2 = docSnap.data().address2;
    },
    //배본사 select
    async distribution() {
      const first = query(collection(db, "distribution"));
      const documentSnapshots = await getDocs(first);
      await documentSnapshots.forEach(doc => {
        this.itemList.push({ value: doc.data().companyName, item: doc.data().companyName });
      });
    },
    changeSelect(data) {
      this.select = data;
    },
    //출고지시
    async order() {
      if (this.select === "") {
        alert("배본사를 선택해주세요.");
        return;
      }
      const batch = writeBatch(db);
      try {
        this.$store.commit("common/setLoading", true);
        const timestamp = serverTimestamp();
        await this.books.forEach(ele => {
          const docRef = doc(db, "orderRequest", ele.id);
          batch.update(docRef, {
            shop_order_status: 4,
            release_time_id: this.$date().format("YYYYMMDDHHmmss"),
            release_time: timestamp,
            distribution: this.select,
          });
        });
        await batch.commit();
        await this.load();
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
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
    border: 1px solid #000;
    padding: 5px 13px;
    margin-bottom: 6px;
    .final-price {
      @include NotoSans(1.4, 700, #000);
    }
    .count {
      .warning {
        color: red !important;
        background-color: #fff !important;
        font-weight: 700 !important;
      }
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
    width: calc(100% - 140px);
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
    width: 120px;
  }
  &:nth-child(5) {
    width: 120px;
    & > div {
      &:nth-child(1) {
        width: 60px;
      }
      &:nth-child(2) {
        width: 60px;
      }
    }
  }
  &:nth-child(6) {
    width: 60px;
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
        text-align: left;
        .thumbnail {
          width: 50px;
          min-width: 50px;
          img {
            width: 100%;
            height: 52px;
            border: 1px solid #ccc;
          }
        }
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
        font-size: 1.6rem !important;
      }
      .count {
        text-align: left;
        white-space: nowrap;
      }
      .btn-wrap {
        margin: 10px 0 0 60px;
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
