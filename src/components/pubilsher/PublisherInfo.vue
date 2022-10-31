<template>
  <section>
    <h3>출판사 정보</h3>
    <table>
      <tbody>
        <tr>
          <td>출판사명</td>
          <td>{{ info.publisher }}</td>
        </tr>
        <tr>
          <td>아이디(이메일)</td>
          <td>{{ info.email }}</td>
        </tr>
        <tr>
          <td>대표자명</td>
          <td>{{ info.name }}</td>
        </tr>
        <tr>
          <td>대표연락처</td>
          <td>{{ info.tel }}</td>
        </tr>
        <tr>
          <td>사업자등록번호</td>
          <td>{{ info.cnNum }}</td>
        </tr>
        <tr>
          <td>주소</td>
          <td>{{ info.address1 }} {{ info.address2 }}</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mt30">정산 정보</h3>
    <table>
      <thead>
        <tr>
          <th>은행명</th>
          <th>계좌번호</th>
          <th>예금주명</th>
          <th>기본 공급률</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span v-if="!modify">{{ bank }}</span
            ><input type="text" v-model="bank" class="basic" v-else />
          </td>
          <td>
            <span v-if="!modify">{{ accNum }}</span
            ><input type="text" v-model="accNum" class="basic" v-else />
          </td>
          <td>
            <span v-if="!modify">{{ accHolder }}</span
            ><input type="text" v-model="accHolder" class="basic" v-else />
          </td>
          <td>
            <span v-if="!modify">{{ supplyRate }}</span
            ><input type="text" v-model="supplyRate" class="basic" v-else />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div v-if="!modify" class="d-flex justify-end mt5"><button class="primary" @click="statusChange">수정</button></div>
      <div v-else class="d-flex justify-end mt5">
        <button class="basic" @click="modify = false">취소</button>
        <button class="primary" @click="update">확인</button>
      </div>
    </div>
  </section>
</template>

<script>
import { getCookie } from "@/utils/cookie";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/db";
export default {
  name: "Distribution",
  data() {
    return {
      modify: false,
      uid: "",
      info: {},
      bank: "",
      accNum: "",
      accHolder: "",
      supplyRate: "",
    };
  },
  created() {
    const { uid } = getCookie("userInfo");
    this.uid = uid;
    this.load();
  },
  methods: {
    statusChange() {
      this.modify = true;
    },
    async load() {
      try {
        this.$store.commit("common/setLoading", true);
        const docRef = doc(db, "publisherInfo", this.uid);
        const docSnap = await getDoc(docRef);
        this.info = docSnap.data();
        this.bank = docSnap.data().bank;
        this.accNum = docSnap.data().accNum;
        this.accHolder = docSnap.data().accHolder;
        this.supplyRate = docSnap.data().supplyRate;
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
    },
    async update() {
      this.modify = false;
      try {
        const updateRef = doc(db, "publisherInfo", this.uid);
        await updateDoc(updateRef, {
          bank: this.bank,
          accNum: this.accNum,
          accHolder: this.accHolder,
          supplyRate: this.supplyRate,
        });
        await this.load();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button.primary {
  background-color: #000 !important;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  color: #fff;
}
</style>
