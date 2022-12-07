<template>
  <section>
    <h2 class="sub-title">도서 관리</h2>
    <section class="sub-container">
      <h3>도서 리스트</h3>
      <table class="info-tbl mt5">
        <colgroup>
          <col width="120" />
          <col width="*" />
          <col width="80" />
        </colgroup>
        <tbody>
          <tr>
            <th>isbn</th>
            <th>도서명</th>
            <th>저자</th>
          </tr>
          <tr v-for="book in books" :key="book.data.isbn">
            <td>{{ book.data.isbn }}</td>
            <td>{{ book.data.subject }}</td>
            <td>{{ book.data.author }}</td>
          </tr>
        </tbody>
      </table>
      <section class="pagination">
        <button @click="prev" class="prev" :disabled="page === 1">&lt;</button>
        <button @click="next" class="next" :disabled="page === totalPage">&gt;</button>
      </section>
    </section>
  </section>
</template>

<script>
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
  getCountFromServer,
  startAfter,
  startAt,
  endBefore,
  endAt,
  limitToLast,
  orderBy,
} from "firebase/firestore";
import { db, app } from "@/utils/db";
import { getCookie } from "@/utils/cookie";
export default {
  name: "BookManagement",
  data() {
    return {
      limit: 20,
      page: 1,
      totalPage: 0,
      sid: "",
      books: [],
      documentSnapshots: "",
      first: "",
    };
  },
  created() {
    const infos = getCookie("userInfo");
    this.uid = infos.uid;
    this.sid = infos.info.sid;
  },
  async mounted() {
    //출판사 보유 서적 전체 갯수
    this.$store.commit("common/setLoading", true);
    const query_ = query(collection(db, "booksData"), where("sid", "==", this.sid));
    const snapshot = await getCountFromServer(query_);
    const totalLen = snapshot.data().count;
    //출판사 보유 서적 첫페이지 로드
    const first = query(collection(db, "booksData"), where("sid", "==", this.sid), orderBy("subject", "asc"), limit(this.limit));
    this.documentSnapshots = await getDocs(first);
    this.$store.commit("common/setLoading", false);
    this.documentSnapshots.forEach(doc => {
      this.books.push({ id: doc.id, data: doc.data() });
    });
    this.totalPage = Math.ceil(totalLen / this.limit);
  },
  methods: {
    async prev() {
      this.page -= 1;
      this.$store.commit("common/setLoading", true);
      const last = this.documentSnapshots.docs[0];
      const prev = query(
        collection(db, "booksData"),
        where("sid", "==", this.sid),
        orderBy("subject", "asc"),
        endBefore(last),
        limitToLast(this.limit),
      );
      this.documentSnapshots = await getDocs(prev);
      this.books = [];
      this.$store.commit("common/setLoading", false);
      this.documentSnapshots.forEach(doc => {
        this.books.push({ id: doc.id, data: doc.data() });
      });
    },
    async next() {
      this.page += 1;
      this.$store.commit("common/setLoading", true);
      const last = this.documentSnapshots.docs[this.documentSnapshots.docs.length - 1];
      const next = query(collection(db, "booksData"), where("sid", "==", this.sid), orderBy("subject", "asc"), startAfter(last), limit(this.limit));
      this.documentSnapshots = await getDocs(next);
      this.books = [];
      this.$store.commit("common/setLoading", false);
      this.documentSnapshots.forEach(doc => {
        this.books.push({ id: doc.id, data: doc.data() });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.6rem;
}
.info-tbl {
  border-top: 1px solid #000000;
  tr {
    th {
      border-bottom: 1px solid #ccc;
      height: 40px;
      padding: 5px 0;
    }
    td {
      border-bottom: 1px solid #ccc;
      height: 40px;
      padding: 5px 0;
      text-align: center;
      &:nth-child(2) {
        text-align: left;
      }
      .xs {
        font-size: 1.4rem !important;
        padding: 0 10px !important;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .prev {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 1px 10px;
    cursor: pointer;
    margin-right: 5px;
  }
  .next {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 1px 10px;
    cursor: pointer;
  }
}
</style>
