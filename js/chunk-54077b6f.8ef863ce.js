(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-54077b6f"],{"1a22":function(t,s,e){t.exports=e.p+"img/toast_check.8494ca51.svg"},"2bb3":function(t,s,e){"use strict";e.r(s);e("14d9");var a=e("dfe2"),i=e("68e0"),o=e("2f62"),n=e("ea7b"),c=e("e71f"),d=e("e31c"),r=e("78dc");const l=Object(n.c)(d.a);var u={name:"SignUp",components:{Toast:r.a},data:()=>({email:"",password:"",publisher:"",name:"",tel:"",sid:0,cnNum:"",zip:"",address1:"",address2:"",shops:[],message:"",status:!1}),computed:{...Object(o.b)("common",["mobile"])},async created(){try{const t=await Object(c.g)(Object(c.d)(d.b,"sid","counting"));this.sid=t.data().count+1}catch(t){console.log(t)}try{const t=Object(c.m)(Object(c.b)(d.b,"shopInfo"));(await Object(c.h)(t)).forEach(t=>{this.shops.push({id:t.id,data:t.data()})})}catch(t){console.log(t)}},methods:{userRegistration(){if(""===this.publisher)return this.status=!this.status,void(this.message="출판사명 입력해주세요");if(""===this.email)return this.status=!this.status,void(this.message="이메일을 입력해주세요");if(""===this.password)return this.status=!this.status,void(this.message="비밀번호를 입력해주세요");if(""===this.name)return this.status=!this.status,void(this.message="대표자명을 입력해주세요");if(""===this.tel)return this.status=!this.status,void(this.message="대표연락처를 입력해주세요");if(""===this.cnNum)return this.status=!this.status,void(this.message="사업자등록 번호를 입력해주세요");if(""===this.address1)return this.status=!this.status,void(this.message="주소를 입력해주세요");if(""===this.address2)return this.status=!this.status,void(this.message="주소를 입력해주세요");try{this.$store.commit("common/setLoading",!0),Object(n.b)(l,this.email,this.password).then(()=>{Object(n.i)(Object(n.c)().currentUser,{displayName:this.publisher+"-2"}).then(()=>{this.addInfo()}).catch(t=>{this.status=!this.status,this.message=t.message,this.$store.commit("common/setLoading",!1)})}).catch(t=>{this.status=!this.status,this.message=t.message,this.$store.commit("common/setLoading",!1)})}catch(t){console.log(t),this.$store.commit("common/setLoading",!1)}},async addInfo(){try{await Object(n.f)(l,this.email,this.password).then(async t=>{const{uid:s}=t.user;await Object(c.o)(Object(c.d)(d.b,"publisherInfo",s),{email:this.email,publisher:this.publisher,sid:this.sid,name:this.name,tel:this.tel,cnNum:this.cnNum,zip:this.zip,address1:this.address1,address2:this.address2,bank:null,accNum:null,accHolder:null,supplyRate:"100",timestamp:Object(c.n)()}),await Object(c.q)(Object(c.d)(d.b,"sid","counting"),{count:this.sid});const e=Object(c.s)(d.b);try{await this.shops.forEach(t=>{const s=Object(c.d)(d.b,"shopInfo",t.id);e.update(s,{shopRate:[...t.data.shopRate,{sid:this.sid,rate:""}]})}),await e.commit()}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1),this.status=!this.status,this.message="정상 가입 되셨습니다.",this.$router.push("/Login")}).catch(t=>{console.log(t),this.$store.commit("common/setLoading",!1)})}catch(t){console.log(t),this.$store.commit("common/setLoading",!1)}},showAddressModalPopup(){this.mobile?this.$modal.show(a.a,{updateZip:this.updateZip},Object(i.a)("AddressModal","95%","auto",!1)):this.$modal.show(a.a,{updateZip:this.updateZip},Object(i.a)("AddressModal","600px","auto",!1))},updateZip(t){this.address1=t.addr1,this.zip=t.zip}}},m=(e("66cd"),e("2877")),h=Object(m.a)(u,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"wrap"},[s("h1",[t._v("출판사 회원가입")]),s("div",{staticClass:"mt5"},[t._v("ID : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"basic",attrs:{placeholder:"이메일 입력",type:"text"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})]),s("div",{staticClass:"mt5"},[t._v("PW : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"basic",attrs:{placeholder:"비밀번호는 6자리이상 입력",type:"password"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})]),s("div",{staticClass:"mt10"},[t._v("출판사명 : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.publisher,expression:"publisher"}],staticClass:"basic",attrs:{placeholder:"출판사명",type:"text"},domProps:{value:t.publisher},on:{input:function(s){s.target.composing||(t.publisher=s.target.value)}}})]),s("div",{staticClass:"mt10"},[t._v("대표자명 : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"basic",attrs:{placeholder:"대표자명",type:"text"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}})]),s("div",{staticClass:"mt10"},[t._v("대표연락처 : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],staticClass:"basic",attrs:{placeholder:"대표연락처",type:"text"},domProps:{value:t.tel},on:{input:function(s){s.target.composing||(t.tel=s.target.value)}}})]),s("div",{staticClass:"mt10"},[t._v("사업자등록번호 : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.cnNum,expression:"cnNum"}],staticClass:"basic",attrs:{placeholder:"사업자등록번호",type:"text"},domProps:{value:t.cnNum},on:{input:function(s){s.target.composing||(t.cnNum=s.target.value)}}})]),s("div",{staticClass:"mt10 d-flex align-center"},[t._v("\n      주소 : "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.zip,expression:"zip"}],staticClass:"basic zip",attrs:{placeholder:"우편번호",type:"text",readonly:""},domProps:{value:t.zip},on:{input:function(s){s.target.composing||(t.zip=s.target.value)}}}),s("button",{staticClass:"btn-zip",on:{click:t.showAddressModalPopup}},[t._v("\n        주소 찾기\n      ")])]),s("div",{staticClass:"mt2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.address1,expression:"address1"}],staticClass:"basic",attrs:{type:"text",readonly:""},domProps:{value:t.address1},on:{input:function(s){s.target.composing||(t.address1=s.target.value)}}})]),s("div",{staticClass:"mt2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.address2,expression:"address2"}],staticClass:"basic",attrs:{placeholder:"나머지주소",type:"text"},domProps:{value:t.address2},on:{input:function(s){s.target.composing||(t.address2=s.target.value)}}})]),s("div",{staticClass:"btn-wrap"},[s("button",{on:{click:t.userRegistration}},[t._v("가입")]),s("router-link",{staticClass:"login",attrs:{to:"/login"}},[t._v("로그인")])],1)]),s("Toast",{attrs:{status:t.status,message:t.message}})],1)}),[],!1,null,"593a5fc8",null);s.default=h.exports},3284:function(t,s,e){"use strict";e("5a51")},4809:function(t,s,e){},"5a51":function(t,s,e){},"66cd":function(t,s,e){"use strict";e("cdab")},"68e0":function(t,s,e){"use strict";e.d(s,"a",(function(){return a}));const a=function(t,s,e,a){return{name:t,width:s,height:e,resizable:a,clickToClose:!0,draggable:".popup-title",scrollable:!0}}},"704c":function(t,s,e){t.exports=e.p+"img/cart_xs.3d6bd69d.svg"},7402:function(t,s,e){"use strict";var a=e("132d"),i={methods:{close(){this.$emit("close")}}},o=(e("cc0a"),e("2877")),n=Object(o.a)(i,(function(){var t=this._self._c;return t("div",{staticClass:"modal-wrap"},[t("div",{staticClass:"close",on:{click:this.close}},[t(a.a,[this._v("mdi-window-close")])],1),this._t("head"),t("div",{staticClass:"line"}),t("div",{staticClass:"body"},[this._t("body")],2),this._t("footer")],2)}),[],!1,null,"1c84da6b",null);s.a=n.exports},"78dc":function(t,s,e){"use strict";var a=[function(){var t=this._self._c;return t("div",{staticClass:"mr24"},[t("img",{attrs:{src:e("1a22"),alt:""}})])}],i={name:"Toast",props:["status","message","withBtn"],data:()=>({isActive:!1,wrap:"toastWrap"}),watch:{status(){this.handleVisible()}},methods:{handleVisible(){this.isActive=!0,setTimeout(()=>{this.isActive=!1},2e3)}}},o=(e("3284"),e("2877")),n=Object(o.a)(i,(function(){var t=this._self._c;return t("section",{class:[{active:this.isActive},this.wrap]},[t("div",{staticClass:"wrapper"},[t("div",{staticClass:"d-flex message-wrap"},[this._m(0),t("div",{staticClass:"message",domProps:{innerHTML:this._s(this.message)}})]),this.withBtn?t("div",{staticClass:"mt10 right"},[t("router-link",{staticClass:"btn",attrs:{to:"/Cart"}},[t("span",[t("img",{attrs:{src:e("704c"),alt:""}})]),t("span",{staticClass:"ml5"},[this._v("바로가기")])])],1):this._e()])])}),a,!1,null,"19bb7941",null);s.a=n.exports},cc0a:function(t,s,e){"use strict";e("4809")},cdab:function(t,s,e){},dfe2:function(t,s,e){"use strict";var a={components:{modalWrap:e("7402").a},data:()=>({zip:"",addr1:"",sido:"",sigungu:"",bname:""}),watch:{zip(){this.$attrs.updateZip({zip:this.zip,addr1:this.addr1,sido:this.sido,sigungu:this.sigungu,dong:this.bname}),this.$emit("close")}},mounted(){this.showApi()},methods:{showApi(){new window.daum.Postcode({width:"100%",oncomplete:t=>{let s=t.roadAddress,e="";""!==t.bname&&/[동|로|가]$/g.test(t.bname)&&(e+=t.bname),""!==t.buildingName&&"Y"===t.apartment&&(e+=""!==e?", "+t.buildingName:t.buildingName),""!==e&&(e=" ("+e+")"),""!==s&&(s+=e),this.zip=t.zonecode,this.addr1=s,this.sido=t.sido,this.sigungu=t.sigungu,this.bname=t.bname}}).embed(this.$refs.embed)},close(){this.$emit("close")}}},i=e("2877"),o=Object(i.a)(a,(function(){var t=this._self._c;return t("modalWrap",{on:{close:this.close}},[t("template",{slot:"head"},[t("h2",[this._v("주소찾기")])]),t("template",{slot:"body"},[t("div",{ref:"embed"})])],2)}),[],!1,null,null,null);s.a=o.exports}}]);