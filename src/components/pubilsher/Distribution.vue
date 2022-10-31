<template>
  <section>
    <h3>배본 정보</h3>
    <table>
      <thead>
        <tr>
          <th>배본사명</th>
          <th>담당자</th>
          <th>연락처</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dis, index) in distribution" :key="index">
          <td>
            <span v-if="modify !== dis.id">{{ dis.data.companyName }}</span>
            <input type="text" class="basic" v-model="companyNameTemp" v-else />
          </td>
          <td>
            <span v-if="modify !== dis.id">{{ dis.data.name }}</span>
            <input type="text" class="basic" v-model="nameTemp" v-else />
          </td>
          <td>
            <span v-if="modify !== dis.id">{{ dis.data.tel }}</span>
            <input type="text" class="basic" v-model="telTemp" v-else />
          </td>
          <td>
            <div class="d-flex">
              <div v-if="modify !== dis.id">
                <button class="basic" @click="modifyTemp({ id: dis.id, companyName: dis.data.companyName, name: dis.data.name, tel: dis.data.tel })">
                  수정
                </button>
              </div>
              <div v-else class="d-flex">
                <button class="basic" @click="modify = ''">취소</button>
                <button class="basic" @click="update(dis.id)">확인</button>
              </div>
              <div v-if="modify !== dis.id">
                <v-icon @click="del(dis.id)">mdi-close</v-icon>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td><input type="text" class="basic" v-model="companyName" /></td>
          <td><input type="text" class="basic" v-model="name" /></td>
          <td><input type="text" class="basic" v-model="tel" /></td>
          <td><button class="basic" @click="add">추가</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { getCookie } from "@/utils/cookie";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/utils/db";
export default {
  name: "Distribution",
  data() {
    return {
      modify: "",
      companyNameTemp: "",
      nameTemp: "",
      companyName: "",
      telTemp: "",
      name: "",
      tel: "",
      uid: "",
      distribution: [],
    };
  },
  created() {
    const { uid } = getCookie("userInfo");
    this.uid = uid;
    this.load();
  },
  methods: {
    async load() {
      try {
        this.$store.commit("common/setLoading", true);
        const first = query(collection(db, "distribution"), where("uid", "==", this.uid));
        const documentSnapshots = await getDocs(first);
        this.modify = "";
        this.distribution = [];
        documentSnapshots.forEach(doc => {
          this.distribution.push({ id: doc.id, data: doc.data() });
        });
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
    },
    async add() {
      if (this.companyName === "") {
        alert("배본사명을 입력해주세요");
        return;
      }
      if (this.name === "") {
        alert("담당자를 입력해주세요");
        return;
      }
      if (this.tel === "") {
        alert("연락처를 입력해주세요");
        return;
      }
      try {
        this.$store.commit("common/setLoading", true);
        await addDoc(collection(db, "distribution"), {
          companyName: this.companyName,
          name: this.name,
          tel: this.tel,
          uid: this.uid,
        });
        await this.load();
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
    },
    async update(id) {
      try {
        this.$store.commit("common/setLoading", true);
        const updateRef = doc(db, "distribution", id);
        await updateDoc(updateRef, {
          companyName: this.companyNameTemp,
          name: this.nameTemp,
          tel: this.telTemp,
        });
        await this.load();
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
    },
    async del(id) {
      try {
        this.$store.commit("common/setLoading", true);
        await deleteDoc(doc(db, "distribution", id));
        await this.load();
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
    },
    modifyTemp(data) {
      this.modify = data.id;
      this.companyNameTemp = data.companyName;
      this.nameTemp = data.name;
      this.telTemp = data.tel;
    },
  },
};
</script>

<style lang="scss" scoped></style>
