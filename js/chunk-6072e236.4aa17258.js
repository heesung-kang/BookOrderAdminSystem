(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6072e236"],{"226a":function(t,s,e){"use strict";e("8056")},"2bb3":function(t,s,e){"use strict";e.r(s);e("14d9");var a=e("ea7b"),i=e("e71f"),o=e("e31c");const c=Object(a.b)(o.a);var n={name:"SignUp",data:()=>({email:"",password:"",publisher:"",sid:0}),async created(){const t=await Object(i.c)(Object(i.b)(o.b,"sid","counting"));this.sid=t.data().count+1},methods:{userRegistration(){if(""!==this.publisher)if(""!==this.email)if(""!==this.password){try{this.$store.commit("common/setLoading",!0),Object(a.a)(c,this.email,this.password).then(()=>{Object(a.e)(Object(a.b)().currentUser,{displayName:this.publisher+"-2"}).then(()=>{this.addInfo()}).catch(t=>{alert(t.message)})}).catch(t=>{alert(t.message)})}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)}else alert("비밀번호를 입력해주세요.");else alert("이메일을 입력해주세요.");else alert("출판사명 입력해주세요.")},async addInfo(){this.$store.commit("common/setLoading",!0);try{await Object(a.c)(c,this.email,this.password).then(async t=>{const{uid:s}=t.user;await Object(i.i)(Object(i.b)(o.b,"publisherInfo",s),{email:this.email,publisher:this.publisher,sid:this.sid,timestamp:Object(i.h)()}),alert("정상 가입 되셨습니다."),this.$router.push("/Login"),await Object(i.j)(Object(i.b)(o.b,"sid","counting"),{count:this.sid})}).catch(t=>{console.log(t)})}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)}}},r=(e("226a"),e("2877")),l=Object(r.a)(n,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"wrap"},[s("h1",[t._v("출판사 회원가입")]),s("div",{staticClass:"mt10"},[t._v("출판사명 : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.publisher,expression:"publisher"}],staticClass:"basic",attrs:{placeholder:"출판사명",type:"text"},domProps:{value:t.publisher},on:{input:function(s){s.target.composing||(t.publisher=s.target.value)}}})]),s("div",{staticClass:"mt5"},[t._v("ID : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"basic",attrs:{placeholder:"이메일 입력",type:"text"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})]),s("div",{staticClass:"mt5"},[t._v("PW : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"basic",attrs:{placeholder:"비밀번호는 6자리이상 입력",type:"password"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})]),s("div",{staticClass:"btn-wrap"},[s("button",{on:{click:t.userRegistration}},[t._v("가입")])])])])}),[],!1,null,"d48d8f48",null);s.default=l.exports},8056:function(t,s,e){}}]);