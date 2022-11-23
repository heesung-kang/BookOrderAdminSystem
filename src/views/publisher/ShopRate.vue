<template>
  <section>
    <h2 class="sub-title">서점별 공급률 설정</h2>
    <section class="sub-container">
      <section class="search">
        <input type="text" v-model="keyword" @keypress.enter="search" />
        <button @click="search">검색</button>
      </section>
      <TableSkeleton v-if="skeletonLoading" />
      <table v-else>
        <thead>
          <tr>
            <th>서점명</th>
            <th>이메일</th>
            <th>서점 공급률</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in shops" :key="index">
          <tr>
            <td>{{ item.data.shop }}</td>
            <td>{{ item.data.email }}</td>
            <td>
              <span v-for="(rate, index) in item.data.shopRate" :key="index">
                <span v-if="rate.sid === sid"><input type="number" v-model="rate.rate" /></span>
              </span>
            </td>
            <td><button class="each" @click="booksRateSet(item.uid)">서적별 설정</button></td>
          </tr>
          <tr v-if="booksList.length > 0 && item.uid === booksList[0].id">
            <td colspan="4">
              <div v-for="book in booksList" :key="book.data.isbn" class="d-flex book-list">
                <span>{{ book.data.subject }}</span>
                <span>{{ book.data.isbn }}</span>
                <span><input type="number" v-model="book.rate" /></span>
              </div>
              <div class="btn-save"><button class="primary" @click="booksRateSave(item.uid)">서적별 공급률 저장</button></div>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="shops.length === 0">
          <tr>
            <td colspan="4">서점 리스트가 없습니다.</td>
          </tr>
        </tfoot>
      </table>
      <div class="save mt20"><button class="primary" @click="shopRateSave()">저장</button></div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/utils/db";
import { collection, query, getDocs, where, writeBatch, doc, updateDoc } from "firebase/firestore";
import { getCookie } from "@/utils/cookie";
import TableSkeleton from "@/skeletons/TableSkeleton";
import debounce from "lodash.debounce";
export default {
  name: "PublisherList",
  components: { TableSkeleton },
  data() {
    return {
      origin: [],
      shops: [],
      keyword: "",
      sid: "",
      booksList: [],
      oldRate: [],
    };
  },
  computed: {
    ...mapGetters("common", ["skeletonLoading"]),
  },
  async created() {
    const infos = getCookie("userInfo");
    this.sid = infos.info.sid;
    await this.load();
  },
  methods: {
    //서점 리스트
    async load() {
      //초기화
      this.origin = [];
      this.shops = [];
      try {
        this.$store.commit("common/setSkeleton", true);
        const first = query(collection(db, "shopInfo"));
        const documentSnapshots = await getDocs(first);
        documentSnapshots.forEach(doc => {
          this.origin.push({ uid: doc.id, data: doc.data() });
          this.shops.push({ uid: doc.id, data: doc.data() });
        });
        this.$store.commit("common/setSkeleton", false);
      } catch (e) {
        console.log(e);
      }
    },
    //서점별 공급률 저장
    async shopRateSave() {
      try {
        this.$store.commit("common/setLoading", true);
        const batch = writeBatch(db);
        this.shops.forEach(ele => {
          const maintain = ele.data.shopRate.filter(elm => {
            return elm.sid !== this.sid; //변경값 이외의 기존 설정값
          });
          const shopRef = doc(db, "shopInfo", ele.uid);
          ele.data.shopRate.forEach(elm => {
            if (elm.sid === this.sid) {
              batch.set(shopRef, { ...ele.data, shopRate: [...maintain, { sid: this.sid, rate: elm.rate }] });
            }
          });
        });
        await batch.commit();
        await this.load();
        alert("저장되었습니다.");
        this.$store.commit("common/setLoading", false);
      } catch (e) {
        this.$store.commit("common/setLoading", false);
        console.log(e);
      }
    },
    //서적별 공급률 설정
    booksRateSet: debounce(async function (id) {
      this.$store.commit("common/setLoading", true);
      this.booksList = [];
      //출판사 보유 서적 불러오기
      const first = query(collection(db, "booksData"), where("sid", "==", this.sid));
      const documentSnapshots = await getDocs(first);
      documentSnapshots.forEach(doc => {
        this.booksList.push({ id, data: doc.data(), rate: "" });
      });
      //서적별 rate 정보 가져오기
      const rates = [];
      this.origin.forEach(elm => {
        if (elm.uid === id) {
          elm.data.bookRate.forEach(book => {
            rates.push(book.data);
          });
        }
      });
      //서점 정보 불러오기 : 서점정보에 bookRate가 있다면 booksList에 매칭
      this.booksList.forEach(ele => {
        rates.forEach(book => {
          if (book.isbn === ele.data.isbn) {
            ele.rate = book.rate;
          }
        });
      });
      this.$store.commit("common/setLoading", false);
    }, 300),
    //서적별 공급률 저장
    async booksRateSave(id) {
      this.origin.forEach(ele => {
        if (ele.uid === id) {
          this.oldRate = ele.data.bookRate;
        }
      });
      this.booksList.forEach(ele => {
        this.oldRate.push({ uid: id, data: { isbn: ele.data.isbn, rate: ele.rate } });
      });
      this.$store.commit("common/setLoading", true);
      try {
        await updateDoc(doc(db, "shopInfo", id), {
          bookRate: this.oldRate,
        });
        await this.load();
        this.$store.commit("common/setLoading", false);
      } catch (e) {
        console.log(e);
        this.$store.commit("common/setLoading", false);
      }
    },
    search() {
      if (this.keyword !== "") {
        const filter = this.origin.filter(ele => {
          if (ele.data.shop.includes(this.keyword)) {
            return ele;
          }
        });
        this.shops = filter;
      } else {
        this.shops = this.origin;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  tr {
    th {
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      height: 30px;
    }
    td {
      border-bottom: 1px solid #ccc;
      text-align: center;
      height: 30px;
      input {
        border: 1px solid #000;
        width: 50px;
        padding: 0 5px;
        background-color: #fff;
      }
      .each {
        background-color: deepskyblue;
        color: #fff;
        padding: 0 5px;
        border-radius: 3px;
      }
    }
  }
}
.save {
  display: flex;
  justify-content: flex-end;
}
.search {
  margin-bottom: 10px;
  input {
    border: 1px solid #000;
    background-color: #fff;
    padding: 0 10px;
    width: calc(100% - 80px);
    max-width: 300px;
  }
  button {
    width: 70px;
    border: 1px solid #000;
    background: #fff;
    margin-left: 10px;
  }
}
.book-list {
  border-bottom: 1px dashed #cccccc;
  padding: 3px 9%;
  justify-content: space-between;
  span {
    &:nth-child(1) {
      width: calc(100% - 290px);
      text-align: left;
    }
    &:nth-child(2) {
      width: 250px;
    }
    &:nth-child(3) {
      width: 40px;
      input {
        width: 40px !important;
      }
    }
  }
}
.btn-save {
  margin: 5px 0 50px;
  display: flex;
  justify-content: center;
  button {
    @include NotoSans(1.4, 500, #fff);
  }
}
@include mobile {
  .book-list {
    padding: 3px;
    span {
      &:nth-child(1) {
        width: calc(100% - 150px);
        text-align: left;
      }
      &:nth-child(2) {
        width: 110px;
      }
      &:nth-child(3) {
        width: 40px;
        input {
          width: 40px !important;
        }
      }
    }
  }
}
</style>
