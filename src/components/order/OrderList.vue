<template>
  <section>
    <TableSkeleton v-if="skeletonLoading" />
    <table class="basic" v-else>
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
        <tr
          v-for="(item, index) in result"
          :key="index"
          @click="statement({ id: item.sid, date: item.timestamp, orderTimeId: item.order_time_id, shopName: item.shop_name, uid: item.uid })"
        >
          <td>{{ item.shop_name }}</td>
          <td>{{ item.count }}</td>
          <td>
            {{ item.shop_order_status === 0 ? "회신 전" : item.shop_order_status === 1 ? "회신" : item.shop_order_status === 2 ? "발주" : "출고" }}
          </td>
          <td>{{ item.timestamp }}</td>
          <td>{{ item.replytimestamp }}</td>
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
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/utils/db";
import { getCookie } from "@/utils/cookie";
import arrMerge from "@/utils/arrMerge";
import TableSkeleton from "@/skeletons/TableSkeleton";
export default {
  name: "OrderList",
  components: { TableSkeleton },
  props: ["searchObj"],
  data() {
    return {
      list: ["test"],
      books: [],
      result: [],
      searchResult: [],
    };
  },
  computed: {
    ...mapGetters("common", ["skeletonLoading"]),
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
      const first = query(collection(db, "orderRequest"), where("sid", "==", sid), orderBy("order_time_id", "desc"));
      const documentSnapshots = await getDocs(first);
      documentSnapshots.forEach(doc => {
        const temp = doc.data();
        temp.timestamp = this.$date(doc.data().order_time.toDate()).format("YYYY-MM-DD HH:mm:ss");
        doc.data().reply_time === "-"
          ? (temp.replytimestamp = "-")
          : (temp.replytimestamp = this.$date(doc.data().reply_time.toDate()).format("YYYY-MM-DD HH:mm:ss"));
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
    statement(data) {
      this.$router.push(`/OrderListDetail/${data.id}/${data.date}/${data.orderTimeId}/${data.shopName}/${data.uid}`);
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
</style>
