<template>
  <section>
    <h3>출판사 정보</h3>
    <!-- 출판사 정보 테이블 -->
    <table class="info-tbl mt5">
      <colgroup>
        <col width="100" />
        <col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <td>출판사명</td>
          <td>
            <span v-if="!infoModify">{{ info.publisher }}</span>
            <input type="text" v-model="infoTemp.publisher" class="basic" v-else />
          </td>
        </tr>
        <tr>
          <td>아이디(이메일)</td>
          <td>{{ info.email }}</td>
          <!--     이메일 수정 숨김 처리     <td>
            <span v-if="!infoModify">{{ info.email }}</span
            ><input type="text" v-model="infoTemp.email" class="basic" v-else />
          </td>-->
        </tr>
        <tr>
          <td>대표자명</td>
          <td>
            <span v-if="!infoModify">{{ info.name }}</span>
            <input type="text" v-model="infoTemp.name" class="basic" v-else />
          </td>
        </tr>
        <tr>
          <td>대표연락처</td>
          <td>
            <span v-if="!infoModify">{{ info.tel }}</span>
            <input type="text" v-model="infoTemp.tel" class="basic" v-else />
          </td>
        </tr>
        <tr>
          <td>사업자등록번호</td>
          <td>
            <span v-if="!infoModify">{{ info.cnNum }}</span>
            <input type="text" v-model="infoTemp.cnNum" class="basic" v-else />
          </td>
        </tr>
        <tr>
          <td>주소</td>
          <td>
            <span v-if="!infoModify">{{ info.address1 }} {{ info.address2 }}</span>
            <div v-else>
              <div><button class="basic xs" @click="showAddressModalPopup">주소찾기</button></div>
              <div class="mt5"><input type="text" v-model="infoTemp.address1" class="basic" readonly /></div>
              <div class="mt5"><input type="text" v-model="infoTemp.address2" class="basic" /></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- //출판사 정보 테이블 -->

    <!-- 버튼 영역 -->
    <section>
      <div v-if="!infoModify" class="d-flex justify-end mt5"><button class="primary" @click="infoStatusChange">수정</button></div>
      <div v-else class="d-flex justify-end mt5">
        <button class="basic mr5" @click="cancel">취소</button>
        <button class="primary" @click="infoUpdate">확인</button>
      </div>
    </section>
    <!-- //버튼 영역 -->

    <!-- 정산정보 -->
    <div class="d-flex justify-space-between mt50">
      <h3>정산 정보</h3>
      <div><router-link to="/ShopRate" class="btn-xs">서점별 공급률 설정</router-link></div>
    </div>
    <section class="cal-wrap mt5">
      <article>
        <div>은행명</div>
        <div>
          <span v-if="!modify">{{ bank }}</span>
          <input type="text" v-model="bank" class="basic" v-else />
        </div>
      </article>
      <article>
        <div>계좌번호</div>
        <div>
          <span v-if="!modify">{{ accNum }}</span>
          <input type="text" v-model="accNum" class="basic" v-else />
        </div>
      </article>
      <article>
        <div>예금주명</div>
        <div>
          <span v-if="!modify">{{ accHolder }}</span>
          <input type="text" v-model="accHolder" class="basic" v-else />
        </div>
      </article>
      <article>
        <div>기본 공급률</div>
        <div>
          <span v-if="!modify">{{ supplyRate }}</span>
          <input type="text" v-model="supplyRate" class="basic" v-else />
        </div>
      </article>
    </section>
    <!-- //정산정보 -->

    <!-- 버튼 영역 -->
    <section>
      <div v-if="!modify" class="d-flex justify-end mt5"><button class="primary" @click="statusChange">수정</button></div>
      <div v-else class="d-flex justify-end mt5">
        <button class="basic mr5" @click="modify = false">취소</button>
        <button class="primary" @click="update">확인</button>
      </div>
    </section>
    <!-- //버튼 영역 -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { getCookie } from "@/utils/cookie";
import { doc, getDoc, updateDoc, collection, query, where, limit, getDocs, writeBatch } from "firebase/firestore";
import { db, app } from "@/utils/db";
import AddressModal from "@/components/modal/ModalAddress";
import { getPopupOpt } from "@/utils/modal";
import { getAuth, updateEmail } from "firebase/auth";
export default {
  name: "Distribution",
  data() {
    return {
      infoModify: false,
      modify: false,
      uid: "",
      sid: "",
      info: {},
      infoTemp: {},
      bank: "",
      accNum: "",
      accHolder: "",
      supplyRate: "",
      zip: "",
      sids: [],
    };
  },
  computed: {
    ...mapGetters("common", ["mobile"]),
  },
  created() {
    const infos = getCookie("userInfo");
    this.uid = infos.uid;
    this.sid = infos.info.sid;
    this.load();
  },
  async mounted() {
    //출판사 보유 서적 id 불러오기
    const first = query(collection(db, "booksData"), where("sid", "==", this.sid));
    const documentSnapshots = await getDocs(first);
    documentSnapshots.forEach(doc => {
      this.sids.push(doc.id);
    });
  },
  methods: {
    statusChange() {
      this.modify = true;
    },
    infoStatusChange() {
      this.infoModify = true;
    },
    cancel() {
      //출판사정보 수정 취소
      this.infoModify = false;
      this.infoTemp = this.info;
    },
    async load() {
      //출판사 정보, 정산정보 불러오기
      try {
        this.$store.commit("common/setLoading", true);
        const docRef = doc(db, "publisherInfo", this.uid);
        const docSnap = await getDoc(docRef);
        this.info = docSnap.data();
        this.infoTemp = docSnap.data();
        this.bank = docSnap.data().bank;
        this.accNum = docSnap.data().accNum;
        this.accHolder = docSnap.data().accHolder;
        await this.basicRate();
      } catch (e) {
        console.log(e);
        this.$store.commit("common/setLoading", false);
      }
      this.$store.commit("common/setLoading", false);
    },
    async update() {
      //정산정보 업데이트
      this.modify = false;
      try {
        this.$store.commit("common/setLoading", true);
        const updateRef = doc(db, "publisherInfo", this.uid);
        await updateDoc(updateRef, {
          bank: this.bank,
          accNum: this.accNum,
          accHolder: this.accHolder,
          supplyRate: this.supplyRate,
        });
        //일괄 업데이트
        const batch = writeBatch(db);
        await this.sids.forEach(id => {
          const docRef = doc(db, "booksData", id);
          batch.update(docRef, {
            supply_rate: this.supplyRate,
          });
        });
        await batch.commit();
        await this.load();
      } catch (e) {
        console.log(e);
        this.$store.commit("common/setLoading", false);
      }
      this.$store.commit("common/setLoading", false);
    },
    async infoUpdate() {
      //출판사 정보 업데이트
      if (this.infoTemp.publisher === "") {
        alert("출판사명을 입력해주세요");
        return;
      }
      if (this.infoTemp.name === "") {
        alert("대표자명을 입력해주세요");
        return;
      }
      if (this.infoTemp.tel === "") {
        alert("대표연락처를 입력해주세요");
        return;
      }
      if (this.infoTemp.cnNum === "") {
        alert("사업자등록번호를 입력해주세요");
        return;
      }
      if (this.infoTemp.address2 === "") {
        alert("주소를 입력해주세요");
        return;
      }
      this.$store.commit("common/setLoading", true);
      this.infoModify = false;
      this.info = this.infoTemp;
      try {
        const updateRef = doc(db, "publisherInfo", this.uid);
        await updateDoc(updateRef, {
          publisher: this.infoTemp.publisher,
          name: this.infoTemp.name,
          email: this.infoTemp.email,
          tel: this.infoTemp.tel,
          cnNum: this.infoTemp.cnNum,
          zip: this.zip,
          address1: this.infoTemp.address1,
          address2: this.infoTemp.address2,
        });
        const auth = getAuth(app);
        await updateEmail(auth.currentUser, this.infoTemp.email)
          .then(() => {
            this.$store.commit("common/setLoading", false);
          })
          .catch(error => {
            this.$store.commit("common/setLoading", false);
            console.log(error);
          });
        this.$store.commit("common/setLoading", false);
        await this.load();
      } catch (e) {
        console.log(e);
        this.$store.commit("common/setLoading", false);
      }
      this.$store.commit("common/setLoading", false);
    },
    showAddressModalPopup() {
      this.mobile
        ? this.$modal.show(AddressModal, { updateZip: this.updateZip }, getPopupOpt("AddressModal", "95%", "auto", false))
        : this.$modal.show(AddressModal, { updateZip: this.updateZip }, getPopupOpt("AddressModal", "600px", "auto", false));
    },
    updateZip(data) {
      this.infoTemp.address1 = data.addr1;
      this.zip = data.zip;
    },
    //기본 공급률 불러오기
    async basicRate() {
      const first = query(collection(db, "booksData"), where("sid", "==", this.sid), limit(1));
      const documentSnapshots = await getDocs(first);
      documentSnapshots.forEach(doc => {
        this.supplyRate = doc.data().supply_rate;
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
    td {
      border-bottom: 1px solid #ccc;
      height: 40px;
      padding: 5px 0;
      &:nth-child(1) {
        font-weight: 700;
      }
      .xs {
        font-size: 1.4rem !important;
        padding: 0 10px !important;
      }
    }
  }
}
.cal-wrap {
  display: flex;
  article {
    width: 25%;
    div {
      border-bottom: 1px solid #ccc;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0 10px;
      &:first-child {
        border-top: 1px solid #000000;
        font-weight: 700;
      }
    }
  }
}
button.primary {
  background-color: #000 !important;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  color: #fff;
}
@include mobile {
  .cal-wrap {
    flex-direction: column;
    article {
      width: 100%;
      display: flex;
      div {
        text-align: left;
        &:first-child {
          width: 90px;
          border-top: 0;
        }
        &:last-child {
          width: calc(100% - 90px);
        }
      }
      &:first-child {
        border-top: 1px solid #000000;
      }
    }
  }
}
</style>
