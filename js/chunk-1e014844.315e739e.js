(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1e014844"],{"1a22":function(s,t,e){s.exports=e.p+"img/toast_check.8494ca51.svg"},3284:function(s,t,e){"use strict";e("5a51")},"36ff":function(s,t,e){},"5a51":function(s,t,e){},"704c":function(s,t,e){s.exports=e.p+"img/cart_xs.3d6bd69d.svg"},"78dc":function(s,t,e){"use strict";var a=[function(){var s=this._self._c;return s("div",{staticClass:"mr24"},[s("img",{attrs:{src:e("1a22"),alt:""}})])}],i={name:"Toast",props:["status","message","withBtn"],data:()=>({isActive:!1,wrap:"toastWrap"}),watch:{status(){this.handleVisible()}},methods:{handleVisible(){this.isActive=!0,setTimeout(()=>{this.isActive=!1},2e3)}}},o=(e("3284"),e("2877")),n=Object(o.a)(i,(function(){var s=this._self._c;return s("section",{class:[{active:this.isActive},this.wrap]},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"d-flex message-wrap"},[this._m(0),s("div",{staticClass:"message",domProps:{innerHTML:this._s(this.message)}})]),this.withBtn?s("div",{staticClass:"mt10 right"},[s("router-link",{staticClass:"btn",attrs:{to:"/Cart"}},[s("span",[s("img",{attrs:{src:e("704c"),alt:""}})]),s("span",{staticClass:"ml5"},[this._v("바로가기")])])],1):this._e()])])}),a,!1,null,"19bb7941",null);t.a=n.exports},ede4:function(s,t,e){"use strict";e.r(t);var a=e("132d"),i=(e("14d9"),e("f3e4")),o=e("ea7b"),n=e("e71f"),c=e("e31c"),r=e("78dc");const l=Object(o.c)(c.a);var m={components:{Toast:r.a},data:()=>({email:"",password:"",logMessage:"",message:"",status:!1}),methods:{async signIn(){try{this.$store.commit("common/setLoading",!0),Object(o.e)(l,o.a).then(()=>Object(o.f)(l,this.email,this.password).then(async s=>{const t=s.user,e=t.displayName.split("-");if(2!==Number(e[1]))this.status=!this.status,this.message="출판사회원이 아닙니다.",this.$store.commit("common/setLoading",!1);else{const s=await Object(n.g)(Object(n.d)(c.b,"publisherInfo",t.uid));Object(i.c)("userInfo",{uid:t.uid,name:e[0],email:t.email,type:Number(e[1]),info:s.data()}),this.$store.commit("common/setLoading",!1),this.$router.push("/")}}).catch(s=>{switch(this.$store.commit("common/setLoading",!1),s.code){case"auth/invalid-email":this.logMessage="이메일을 잘못 입력 하셨습니다.";break;case"auth/user-not-found":this.logMessage="존재하지 않는 이메일 주소입니다.";break;case"auth/wrong-password":this.logMessage="비밀번호를 잘못 입력 하셨습니다.";break;case"auth/too-many-requests":this.logMessage="접속 시도를 너무 많이 하셨습니다.";break;default:this.logMessage="이메일 혹은 비밀번호가 틀렸습니다."}})).catch(s=>{console.log(s),this.$store.commit("common/setLoading",!1)})}catch(s){console.log(s),this.$store.commit("common/setLoading",!1)}}}},u=(e("f6d9"),e("2877")),d=Object(u.a)(m,(function(){var s=this,t=s._self._c;return t("div",{staticClass:"login-container"},[t("div",{staticClass:"login-box"},[t("h1",[s._v("출판사 로그인")]),t("form",{on:{submit:function(t){return t.preventDefault(),s.signIn.apply(null,arguments)}}},[t("div",{staticClass:"mt30 field"},[t(a.a,[s._v("mdi-account")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.email,expression:"email"}],attrs:{type:"text",placeholder:"아이디를 입력하세요."},domProps:{value:s.email},on:{input:function(t){t.target.composing||(s.email=t.target.value)}}})],1),t("div",{staticClass:"mt10 field"},[t(a.a,[s._v("mdi-shield-key")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.password,expression:"password"}],attrs:{type:"password",placeholder:"비밀번호를 입력하세요."},domProps:{value:s.password},on:{input:function(t){t.target.composing||(s.password=t.target.value)}}})],1),t("button",{staticClass:"btn-login mt25",attrs:{type:"submit"}},[s._v("로그인")]),t("p",{staticClass:"error-message"},[s._v(s._s(s.logMessage))]),t("div",{staticClass:"signup"},[t("router-link",{attrs:{to:"/SignUp"}},[s._v("회원가입")]),s._v(" |  "),t("router-link",{attrs:{to:"/FindPw"}},[s._v("비밀번호 찾기")])],1)])]),t("Toast",{attrs:{status:s.status,message:s.message}})],1)}),[],!1,null,"59e60ab8",null);t.default=d.exports},f6d9:function(s,t,e){"use strict";e("36ff")}}]);