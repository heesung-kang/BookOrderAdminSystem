<template>
  <modalWrap @close="close">
    <template slot="head"><h2>서적별 공급률 설정</h2></template>
    <template slot="body">
      <div class="v-application">
        <v-progress-circular :size="70" :width="7" color="amber" indeterminate class="spinner" v-if="loading"></v-progress-circular>
      </div>
      <div class="overflow">
        <ul>
          <li v-for="book in booksList" :key="book.data.isbn" class="d-flex book-list">
            <div class="wrap">
              <span class="mr10 isbn">{{ book.data.isbn }}</span>
              <span class="mr10 subject">{{ book.data.subject }}</span>
              <span class="init"><input type="number" v-model="book.rate" /></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn-save"><button class="primary" @click="booksRateSave(id)">서적별 공급률 저장</button></div>
    </template>
  </modalWrap>
</template>

<script>
import { mapGetters } from "vuex";
import { doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/utils/db";
import modalWrap from "@/components/modal/ModalTemplate";
import { getCookie } from "@/utils/cookie";
export default {
  name: "Order",
  components: { modalWrap },
  props: ["id", "origin"],
  data() {
    return {
      memo: "",
      booksList: [],
      sid: "",
    };
  },
  computed: {
    ...mapGetters("common", ["loading"]),
  },
  async created() {
    const infos = getCookie("userInfo");
    this.sid = infos.info.sid;
  },
  async mounted() {
    this.$store.commit("common/setLoading", true);
    this.booksList = [];
    //출판사 보유 서적 불러오기
    const first = query(collection(db, "booksData"), where("sid", "==", this.sid));
    const documentSnapshots = await getDocs(first);
    documentSnapshots.forEach(doc => {
      this.booksList.push({ id: this.id, data: doc.data(), rate: "" });
    });
    //서적별 rate 정보 가져오기
    const rates = [];
    this.origin.forEach(elm => {
      if (elm.uid === this.id) {
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
  },
  methods: {
    close() {
      this.$emit("close");
    },
    //서적별 공급률 저장
    async booksRateSave(id) {
      this.origin.forEach(ele => {
        if (ele.uid === id) {
          this.oldRate = ele.data.bookRate;
        }
      });
      const newRate = [];
      this.booksList.forEach(ele => {
        newRate.push({ uid: id, data: { isbn: ele.data.isbn, rate: ele.rate } });
      });
      const filterRate = this.oldRate.filter(ele => {
        newRate.forEach(elm => {
          if (ele.data.isbn !== elm.data.isbn) {
            return ele;
          }
        });
      });
      const finalRate = newRate.concat(filterRate);
      this.$store.commit("common/setLoading", true);
      try {
        await updateDoc(doc(db, "shopInfo", id), {
          bookRate: finalRate,
        });
        this.$store.commit("common/setLoading", false);
        this.$attrs.update();
        this.close();
      } catch (e) {
        console.log(e);
        this.$store.commit("common/setLoading", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  .isbn {
    width: 100px;
  }
  .subject {
    width: calc(100% - 150px);
  }
  .init {
    width: 30px;
  }
}
li {
  border-bottom: 1px dashed #ccc;
  padding: 5px 0;
}
input {
  border: 1px solid #000;
  width: 30px;
  text-align: center;
}
.btn-save {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.overflow {
  max-height: 300px;
  overflow: auto;
}
</style>
