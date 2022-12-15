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
            <h3 class="book-name" @mouseover="tooltipToggle(true)" @mouseout="tooltipToggle(false)">
              {{ book.data.subject }}
            </h3>
            <span :class="[{ active: isActive }, 'tooltip']">{{ book.data.subject }}</span>
            <div class="author">{{ book.data.author }}</div>
          </div>
        </div>
        <div class="isbn">{{ book.data.isbn }}</div>
        <div class="d-flex price-info">
          <div class="normal-price"><span v-if="mobile">정가</span> {{ book.data.price?.toLocaleString() }}원</div>
          <div><span v-if="mobile">공급률</span> {{ book.data.supply_rate }}%</div>
        </div>
        <!-- 상점별 공급률 없을 경우 -->
        <div class="final-price"><span v-if="mobile">공급가</span> {{ ((book.data.price * book.data.supply_rate) / 100).toLocaleString() }}원</div>
        <div class="d-flex price-info">
          <div class="normal-price"><span v-if="mobile">주문</span> {{ book.data.count }}</div>
          <div class="count">
            <span v-if="mobile">공급</span>
            <span :class="{ warning: book.data.count > book.data.reply_count }">{{ book.data.reply_count }}</span>
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
      <span style="display: flex; align-items: center" v-if="itemList.length > 0"
        ><span class="mr10">배본 설정: </span><Selects :itemList="itemList" @change="changeSelect"
      /></span>
      <span v-else>배본사를 설정하세요</span>
      <button class="primary ml10 order" @click="order" :disabled="itemList.length === 0">출고지시</button>
    </div>
    <!-- //배본 설정 -->
    <div class="d-flex align-center mt10 justify-end" v-if="!skeletonLoading && books[0].data.shop_order_status === 4">
      <button class="primary ml10 order" @click="exportExcel">엑셀출력</button>
    </div>
    <Toast :status="status" :message="message" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Selects from "@/components/form/Selects";
import BookListSkeleton from "@/skeletons/BookListSkeleton";
import BookListMobileSkeleton from "@/skeletons/BookListMobileSkeleton";
import { collection, getDocs, query, where, writeBatch, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/db";
import { getCookie } from "@/utils/cookie";
import XLSX from "sheetjs-style";
import Toast from "@/components/common/Toast";
export default {
  components: { Selects, BookListSkeleton, BookListMobileSkeleton, Toast },
  props: ["id", "orderRealTimeId", "uid"],
  data() {
    return {
      select: "",
      itemList: [],
      books: [],
      address1: "",
      address2: "",
      puid: "",
      message: "",
      status: false,
      isActive: false,
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
        price += (ele.data.price * Number(ele.data.supply_rate) * ele.data.reply_count) / 100;
      });
      return price;
    },
  },
  async created() {
    const infos = getCookie("userInfo");
    this.puid = infos.uid;
    await this.load();
    await this.distribution();
    await this.getAddress();
  },
  mounted() {
    window.onresize = () => {
      this.setSize();
    };
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
        setTimeout(() => {
          this.setSize();
        }, 200);
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
      const first = query(collection(db, "distribution"), where("uid", "==", this.puid));
      const documentSnapshots = await getDocs(first);
      if (documentSnapshots.docs.length > 0) {
        this.itemList = [{ item: "배본사 선택", value: "" }];
        await documentSnapshots.forEach(doc => {
          this.itemList.push({ value: doc.data().companyName, item: doc.data().companyName });
        });
      }
    },
    changeSelect(data) {
      this.select = data;
    },
    //출고지시
    async order() {
      if (this.select === "") {
        this.status = !this.status;
        this.message = "배본사를 선택해주세요.";
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
    //엑셀출력
    exportExcel() {
      const excelData = [];
      this.books.forEach(ele => {
        excelData.push({
          shop_name: ele.data.shop_name,
          address: `${this.address1} ${this.address2}`,
          subject: ele.data.subject,
          author: ele.data.author,
          isbn: ele.data.isbn,
          originPrice: `${ele.data.price.toLocaleString()}원`,
          supply_rate: `${ele.data.supply_rate}%`,
          price: `${((ele.data.price * Number(ele.data.supply_rate)) / 100).toLocaleString()}원`,
          reply_count: ele.data.reply_count,
          distribution: ele.data.distribution,
          release_time: this.$date(ele.data.release_time.toDate()).format("YYYY-MM-DD HH:mm:ss"),
        });
      });
      const booksWS = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new(); // make Workbook of Excel
      //셀 제목 변경
      booksWS["A1"].v = "서점";
      booksWS["B1"].v = "배송지";
      booksWS["C1"].v = "제목";
      booksWS["D1"].v = "저자";
      booksWS["E1"].v = "isbn";
      booksWS["F1"].v = "정가";
      booksWS["G1"].v = "공급률";
      booksWS["H1"].v = "출고가";
      booksWS["I1"].v = "수량";
      booksWS["J1"].v = "배본사";
      booksWS["K1"].v = "출고지시일";
      booksWS["A1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["B1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["C1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["D1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["E1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["F1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["G1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["H1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["I1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["J1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      booksWS["K1"].s = {
        fill: {
          fgColor: { rgb: "d9ead3" },
        },
      };
      XLSX.utils.book_append_sheet(wb, booksWS, "books"); // sheetAName is name of Worksheet
      XLSX.writeFile(wb, "출고리스트.xlsx");
    },
    setSize() {
      if (this.mobile) {
        this.listWidth = document.querySelector(".body").clientWidth;
        this.titleMaxWidth = this.listWidth;
        setTimeout(() => {
          const select = document.querySelectorAll(".book-name");
          select.forEach(ele => {
            ele.style.maxWidth = `${this.titleMaxWidth}px`;
          });
        }, 200);
      } else {
        this.listWidth = document.querySelector(".body").clientWidth;
        this.titleMaxWidth = this.listWidth - 550;
        setTimeout(() => {
          const select = document.querySelectorAll(".book-name");
          select.forEach(ele => {
            ele.style.maxWidth = `${this.titleMaxWidth}px`;
          });
        }, 200);
      }
    },
    tooltipToggle(status) {
      this.isActive = status;
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
        position: relative;
        h3 {
          @include NotoSans(1.5, 500, #000);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .tooltip {
          position: absolute;
          top: 22px;
          left: 0;
          background: #ccc;
          white-space: nowrap;
          padding: 3px 15px;
          border-radius: 20px;
          display: none;
          &.active {
            display: block;
          }
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
.order {
  &:disabled {
    background-color: #d9d9d9 !important;
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
