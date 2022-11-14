<template>
  <section>
    <TableSkeleton v-if="skeletonLoading" />
    <div v-else>
      <OrderListTable :status="3" :data="result" />
      <OrderListTable :status="4" :data="result" />
      <OrderListTable :status="5" :data="result" />
      <div v-if="result.length === 0">리스트가 없습니다.</div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/utils/db";
import { getCookie } from "@/utils/cookie";
import arrMerge from "@/utils/arrMerge";
import TableSkeleton from "@/skeletons/TableSkeleton";
import OrderListTable from "@/components/order/OrderListTable";
export default {
  name: "OrderList",
  components: { OrderListTable, TableSkeleton },
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
      const first = query(
        collection(db, "orderRequest"),
        where("sid", "==", sid),
        where("shop_order_status", ">=", 3),
        orderBy("shop_order_status", "desc"),
        orderBy("order_real_time_id", "desc"),
      );
      const documentSnapshots = await getDocs(first);
      documentSnapshots.forEach(doc => {
        const temp = doc.data();
        temp.timestamp = this.$date(doc.data().order_real_time.toDate()).format("YYYY-MM-DD HH:mm:ss");
        temp.searchTimestamp = this.$date(doc.data().order_real_time.toDate()).format("YYYY-MM-DD");
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
          if (ele.searchTimestamp >= this.searchObj.startDate && ele.searchTimestamp <= this.searchObj.endDate) {
            return ele;
          }
        } else if (this.searchObj.shop_name !== "") {
          //검색어가 있는 경우
          if (ele.shop_name.includes(this.searchObj.shop_name)) {
            if (this.searchObj.startDate !== undefined) {
              //검색어와 날짜가 있는 경우
              if (ele.searchTimestamp >= this.searchObj.startDate && ele.searchTimestamp <= this.searchObj.endDate) {
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
