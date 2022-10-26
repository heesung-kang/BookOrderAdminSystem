<template>
  <div class="login-container">
    <div class="wrap">
      <h1>출판사 회원가입</h1>
      <div class="mt10">출판사명 : <input class="basic" v-model="publisher" placeholder="출판사명" type="text" /></div>
      <div class="mt5">ID : <input class="basic" v-model="email" placeholder="이메일 입력" type="text" /></div>
      <div class="mt5">PW : <input class="basic" v-model="password" placeholder="비밀번호는 6자리이상 입력" type="password" /></div>
      <div class="btn-wrap"><button @click="userRegistration">가입</button></div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { app, db } from "@/utils/db";
const auth = getAuth(app);
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      publisher: "",
      sid: 0,
    };
  },
  async created() {
    //sid 자동 배정
    const docSnap = await getDoc(doc(db, "sid", "counting"));
    this.sid = docSnap.data().count + 1;
  },
  methods: {
    userRegistration() {
      if (this.publisher === "") {
        alert("출판사명 입력해주세요.");
        return;
      }
      if (this.email === "") {
        alert("이메일을 입력해주세요.");
        return;
      }
      if (this.password === "") {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      try {
        this.$store.commit("common/setLoading", true);
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            updateProfile(getAuth().currentUser, {
              displayName: `${this.publisher}-2`,
            })
              .then(() => {
                this.addInfo();
              })
              .catch(error => {
                alert(error.message);
              });
          })
          .catch(error => {
            alert(error.message);
          });
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
    },
    async addInfo() {
      this.$store.commit("common/setLoading", true);
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
          .then(async userCredential => {
            // Signed in
            const { uid } = userCredential.user;
            await setDoc(doc(db, "publisherInfo", uid), {
              email: this.email,
              publisher: this.publisher,
              sid: this.sid,
              timestamp: serverTimestamp(),
            });
            alert("정상 가입 되셨습니다.");
            this.$router.push("/Login");
            //sid count 업데이트
            await updateDoc(doc(db, "sid", "counting"), {
              count: this.sid,
            });
          })
          .catch(error => {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("common/setLoading", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: #f5f5f5;
  .wrap {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 50px;
    background-color: #fff;
    h1 {
      font-size: 1.6rem;
    }
  }
  input {
    border: 1px solid #000;
    padding: 0 10px;
    height: 30px;
    width: 100%;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
  .btn-wrap {
    text-align: center;
    button {
      margin-top: 10px;
      padding: 2px 15px;
      background: deepskyblue;
      color: #fff;
      font-size: 1.5rem;
      border-radius: 3px;
    }
  }
}
</style>
