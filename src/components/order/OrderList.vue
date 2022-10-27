<template>
  <section>
    <table class="basic">
      <caption>
        서점별 주문리스트
      </caption>
      <thead>
        <tr>
          <th>서점</th>
          <th>수량</th>
          <th>상태</th>
          <th>발신일시</th>
          <th>회신일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in result" :key="index">
          <td>{{ item.shop_name }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.shop_order_status === 0 ? "회신 전" : item.shop_order_status === 1 ? "회신" : "발주" }}</td>
          <td>{{ item.timestamp }}</td>
          <td>-</td>
        </tr>
      </tbody>
      <tfoot v-if="result.length === 0">
        <tr>
          <td colspan="5">주문 리스트가 없습니다.</td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/db";
import { getCookie } from "@/utils/cookie";
import arrMerge from "@/utils/arrMerge";
import TableSkeleton from "@/skeletons/TableSkeleton";
export default {
  name: "OrderList",
  props: ["searchObj"],
  data() {
    return {
      list: ["test"],
      books: [],
      result: [],
      searchResult: [],
    };
  },
  watch: {
    searchObj() {
      this.search();
    },
  },
  async created() {
    try {
      this.$store.commit("common/setSkeleton", true);
      const {
        info: { sid },
      } = getCookie("userInfo");
      const first = query(collection(db, "orderRequest"), where("sid", "==", sid));
      const documentSnapshots = await getDocs(first);
      documentSnapshots.forEach(doc => {
        const temp = doc.data();
        temp.timestamp = this.$date(doc.data().order_time.toDate()).format("YYYY-MM-DD HH:mm:ss");
        doc.data().reply_time !== "-" ? (temp.replytimestamp = this.$date(doc.data().reply_time.toDate()).format("YYYY-MM-DD HH:mm:ss")) : null;
        this.books.push(temp);
      });
      this.result = arrMerge(this.books);
      this.searchResult = this.searchResult.concat(this.result);
    } catch (e) {
      console.log(e);
    }
    this.$store.commit("common/setSkeleton", false);
  },
  methods: {
    //검색
    search() {
      this.result = this.searchResult.filter(ele => {
        if (this.searchObj.shop_name === "" && this.searchObj.startDate === undefined) {
          //검색어와 날짜가 비어 있는 경우
          return ele;
        } else if (this.searchObj.shop_name === "" && this.searchObj.startDate !== undefined) {
          //날짜만 있는경우
          if (ele.timestamp >= this.searchObj.startDate && ele.timestamp <= this.searchObj.endDate) {
            return ele;
          }
        } else if (this.searchObj.shop_name !== "") {
          //검색어가 있는 경우
          if (ele.shop_name.includes(this.searchObj.shop_name)) {
            if (this.searchObj.startDate !== undefined) {
              //검색어와 날짜가 있는 경우
              if (ele.timestamp >= this.searchObj.startDate && ele.timestamp <= this.searchObj.endDate) {
                return ele;
              }
            } else {
              return ele;
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
