(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-99418608"],{"0cea":function(t,s,e){},"1a22":function(t,s,e){t.exports=e.p+"img/toast_check.8494ca51.svg"},3284:function(t,s,e){"use strict";e("5a51")},"5a51":function(t,s,e){},"704c":function(t,s,e){t.exports=e.p+"img/cart_xs.3d6bd69d.svg"},"78dc":function(t,s,e){"use strict";var a=[function(){var t=this._self._c;return t("div",{staticClass:"mr24"},[t("img",{attrs:{src:e("1a22"),alt:""}})])}],i={name:"Toast",props:["status","message","withBtn"],data:()=>({isActive:!1,wrap:"toastWrap"}),watch:{status(){this.handleVisible()}},methods:{handleVisible(){this.isActive=!0,setTimeout(()=>{this.isActive=!1},2e3)}}},o=(e("3284"),e("2877")),n=Object(o.a)(i,(function(){var t=this._self._c;return t("section",{class:[{active:this.isActive},this.wrap]},[t("div",{staticClass:"wrapper"},[t("div",{staticClass:"d-flex message-wrap"},[this._m(0),t("div",{staticClass:"message",domProps:{innerHTML:this._s(this.message)}})]),this.withBtn?t("div",{staticClass:"mt10 right"},[t("router-link",{staticClass:"btn",attrs:{to:"/Cart"}},[t("span",[t("img",{attrs:{src:e("704c"),alt:""}})]),t("span",{staticClass:"ml5"},[this._v("바로가기")])])],1):this._e()])])}),a,!1,null,"19bb7941",null);s.a=n.exports},b399:function(t,s,e){"use strict";e("0cea")},ede4:function(t,s,e){"use strict";e.r(s);var a=e("132d"),i=(e("14d9"),e("f3e4")),o=e("ea7b"),n=e("e71f"),c=e("e31c"),r=e("78dc");const l=Object(o.c)(c.a);var m={components:{Toast:r.a},data:()=>({email:"",password:"",logMessage:"",message:"",status:!1}),methods:{async signIn(){try{this.$store.commit("common/setLoading",!0),Object(o.e)(l,o.a).then(()=>Object(o.f)(l,this.email,this.password).then(async t=>{const s=t.user,e=s.displayName.split("-");if(2!==Number(e[1]))this.status=!this.status,this.message="출판사회원이 아닙니다.",this.$store.commit("common/setLoading",!1);else{const t=await Object(n.g)(Object(n.d)(c.b,"publisherInfo",s.uid));Object(i.c)("userInfo",{uid:s.uid,name:e[0],email:s.email,type:Number(e[1]),info:t.data()}),this.$store.commit("common/setLoading",!1),this.$router.push("/")}}).catch(t=>{switch(this.$store.commit("common/setLoading",!1),t.code){case"auth/invalid-email":this.logMessage="이메일을 잘못 입력 하셨습니다.";break;case"auth/user-not-found":this.logMessage="존재하지 않는 이메일 주소입니다.";break;case"auth/wrong-password":this.logMessage="비밀번호를 잘못 입력 하셨습니다.";break;case"auth/too-many-requests":this.logMessage="접속 시도를 너무 많이 하셨습니다.";break;default:this.logMessage="이메일 혹은 비밀번호가 틀렸습니다."}})).catch(t=>{console.log(t),this.$store.commit("common/setLoading",!1)})}catch(t){console.log(t),this.$store.commit("common/setLoading",!1)}}}},u=(e("b399"),e("2877")),d=Object(u.a)(m,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"login-box"},[s("h1",[t._v("출판사 로그인")]),s("form",{on:{submit:function(s){return s.preventDefault(),t.signIn.apply(null,arguments)}}},[s("div",{staticClass:"mt30 field"},[s(a.a,[t._v("mdi-account")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:"아이디를 입력하세요."},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})],1),s("div",{staticClass:"mt10 field"},[s(a.a,[t._v("mdi-shield-key")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"비밀번호를 입력하세요."},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})],1),s("button",{staticClass:"btn-login mt25",attrs:{type:"submit"}},[t._v("로그인")]),s("p",{staticClass:"error-message"},[t._v(t._s(t.logMessage))]),s("article",{staticClass:"link-wrap d-flex justify-space-between"},[s("a",{attrs:{href:"https://bookorder.instapay.kr/store/#/login",target:"_blank"}},[t._v("서점 로그인")]),s("div",{staticClass:"signup"},[s("router-link",{attrs:{to:"/SignUp"}},[t._v("회원가입")]),t._v(" |  "),s("router-link",{attrs:{to:"/FindPw"}},[t._v("비밀번호 찾기")])],1)])])]),s("Toast",{attrs:{status:t.status,message:t.message}})],1)}),[],!1,null,"e9c779ce",null);s.default=d.exports}}]);