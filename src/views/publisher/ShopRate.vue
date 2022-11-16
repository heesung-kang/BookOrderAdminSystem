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
        <tbody>
          <tr v-for="(item, index) in shops" :key="index">
            <td>{{ item.data.shop }}</td>
            <td>{{ item.data.email }}</td>
            <td>
              <span><input type="number" v-model="item.data.rate" /></span>
              <button class="save" @click="shopRateSave({ uid: item.uid, rate: item.data.rate })">저장</button>
            </td>
            <td><button class="each">서적별 설정</button></td>
          </tr>
        </tbody>
        <tfoot v-if="shops.length === 0">
          <tr>
            <td colspan="4">서점 리스트가 없습니다.</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/utils/db";
import { collection, query, getDocs, where, writeBatch, doc, limit } from "firebase/firestore";
import { getCookie } from "@/utils/cookie";
import TableSkeleton from "@/skeletons/TableSkeleton";
export default {
  name: "PublisherList",
  components: { TableSkeleton },
  data() {
    return {
      origin: [],
      shops: [],
      keyword: "",
      sid: "",
      sids: [],
      loadRate: [], //불러온 공급률
    };
  },
  computed: {
    ...mapGetters("common", ["skeletonLoading"]),
  },
  async created() {
    const infos = getCookie("userInfo");
    this.sid = infos.info.sid;
    this.sids = [];
    //출판사 보유 서적 id 불러오기
    this.$store.commit("common/setSkeleton", true);
    const first = query(collection(db, "booksData"), where("sid", "==", this.sid));
    const documentSnapshots = await getDocs(first);
    documentSnapshots.forEach(doc => {
      this.sids.push(doc.id);
    });
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
        const first = query(collection(db, "shopInfo"), where("shop", ">=", this.keyword));
        const documentSnapshots = await getDocs(first);
        documentSnapshots.forEach(doc => {
          this.origin.push({ uid: doc.id, data: doc.data() });
          this.shops.push({ uid: doc.id, data: doc.data() });
        });
        //서점별 공급률 불러오기
        const second = query(collection(db, "booksData"), where("sid", "==", this.sid), limit(1));
        const documentSnapshotsSecond = await getDocs(second);
        documentSnapshotsSecond.forEach(doc => {
          this.loadRate = doc.data().shop_rate;
        });
        //불러온 공급률 매치
        this.shops.forEach((ele, index) => {
          this.loadRate.forEach(elm => {
            if (ele.uid === elm.uid) {
              this.shops[index].data.rate = elm.rate;
              this.origin[index].data.rate = elm.rate;
            }
          });
        });
        this.$store.commit("common/setSkeleton", false);
      } catch (e) {
        console.log(e);
      }
    },
    //서점별 공급률 저장
    async shopRateSave(data) {
      try {
        this.$store.commit("common/setLoading", true);
        //일괄 업데이트
        const batch = writeBatch(db);
        await this.sids.forEach(id => {
          const docRef = doc(db, "booksData", id);
          //동일아이디 빼기
          const filter = this.loadRate.filter(ele => {
            if (ele.uid !== data.uid) {
              return ele;
            }
          });
          batch.update(docRef, {
            shop_rate: [...filter, { uid: data.uid, rate: data.rate }],
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
      .save {
        border: 1px solid #000;
        background-color: #fff;
        margin-left: 3px;
        padding: 0 5px;
      }
      .each {
        background-color: deepskyblue;
        color: #fff;
        padding: 0 5px;
        vorder-radius: 3px;
      }
    }
  }
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
</style>
