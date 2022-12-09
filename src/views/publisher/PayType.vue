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
            <th>결제방식</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in shops" :key="index">
          <tr>
            <td>{{ item.data.shop }}</td>
            <td>{{ item.data.email }}</td>
            <td>
              <div class="selectWrap">
                <SelectPayType :itemList="itemList" @change="change" :uid="item.uid" :payType="item.data.payType" :sid="sid" />
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="shops.length === 0">
          <tr>
            <td colspan="4">서점 리스트가 없습니다.</td>
          </tr>
        </tfoot>
      </table>
      <div class="save mt20"><button class="primary" @click="handleSave">저장</button></div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/utils/db";
import { collection, doc, getDocs, query, writeBatch } from "firebase/firestore";
import { getCookie } from "@/utils/cookie";
import TableSkeleton from "@/skeletons/TableSkeleton";
import SelectPayType from "@/components/form/SelectPayType";

export default {
  name: "PayType",
  components: { SelectPayType, TableSkeleton },
  data() {
    return {
      origin: [],
      shops: [],
      keyword: "",
      sid: "",
      selectMutations: [],
      itemList: [
        { item: "일반결제", value: 0 },
        { item: "월결제", value: 1 },
      ],
    };
  },
  computed: {
    ...mapGetters("common", ["skeletonLoading", "mobile"]),
  },
  async created() {
    const infos = getCookie("userInfo");
    this.sid = infos.info.sid;
    await this.load();
  },
  methods: {
    //select change
    change(payload) {
      this.selectMutations = this.selectMutations.map(ele => {
        if (ele.uid === payload.uid) {
          return payload;
        } else {
          return ele;
        }
      });
    },
    //저장
    async handleSave() {
      try {
        this.$store.commit("common/setLoading", true);
        const batch = writeBatch(db);
        this.shops.forEach(ele => {
          const shopRef = doc(db, "shopInfo", ele.uid);
          const oldPayType = ele.data.payType.filter(payType => {
            if (payType.sid !== this.sid) {
              return payType;
            }
          });
          this.selectMutations.forEach(elm =>
            ele.uid === elm.uid ? batch.set(shopRef, { ...ele.data, payType: [...oldPayType, { sid: this.sid, payType: elm.value }] }) : null,
          );
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
          doc.data().payType.forEach(ele => {
            if (this.sid === ele.sid) {
              this.selectMutations.push({ uid: doc.id, value: ele.payType });
            }
          });
        });
        this.$store.commit("common/setSkeleton", false);
      } catch (e) {
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
      padding: 3px 0;
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
.selectWrap {
  display: flex;
  justify-content: center;
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
