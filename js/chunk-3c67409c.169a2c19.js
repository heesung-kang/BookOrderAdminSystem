(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3c67409c"],{"084f":function(t,s,i){"use strict";i("1223")},1223:function(t,s,i){},"1a22":function(t,s,i){t.exports=i.p+"img/toast_check.8494ca51.svg"},"1f26":function(t,s,i){"use strict";i("6009")},3284:function(t,s,i){"use strict";i("5a51")},4809:function(t,s,i){},"5a51":function(t,s,i){},6009:function(t,s,i){},"68e0":function(t,s,i){"use strict";i.d(s,"a",(function(){return e}));const e=function(t,s,i,e){return{name:t,width:s,height:i,resizable:e,clickToClose:!0,draggable:".popup-title",scrollable:!0}}},"704c":function(t,s,i){t.exports=i.p+"img/cart_xs.3d6bd69d.svg"},7402:function(t,s,i){"use strict";var e=i("132d"),a={methods:{close(){this.$emit("close")}}},o=(i("cc0a"),i("2877")),n=Object(o.a)(a,(function(){var t=this._self._c;return t("div",{staticClass:"modal-wrap"},[t("div",{staticClass:"close",on:{click:this.close}},[t(e.a,[this._v("mdi-window-close")])],1),this._t("head"),t("div",{staticClass:"line"}),t("div",{staticClass:"body"},[this._t("body")],2),this._t("footer")],2)}),[],!1,null,"1c84da6b",null);s.a=n.exports},"78dc":function(t,s,i){"use strict";var e=[function(){var t=this._self._c;return t("div",{staticClass:"mr24"},[t("img",{attrs:{src:i("1a22"),alt:""}})])}],a={name:"Toast",props:["status","message","withBtn"],data:()=>({isActive:!1,wrap:"toastWrap"}),watch:{status(){this.handleVisible()}},methods:{handleVisible(){this.isActive=!0,setTimeout(()=>{this.isActive=!1},2e3)}}},o=(i("3284"),i("2877")),n=Object(o.a)(a,(function(){var t=this._self._c;return t("section",{class:[{active:this.isActive},this.wrap]},[t("div",{staticClass:"wrapper"},[t("div",{staticClass:"d-flex message-wrap"},[this._m(0),t("div",{staticClass:"message",domProps:{innerHTML:this._s(this.message)}})]),this.withBtn?t("div",{staticClass:"mt10 right"},[t("router-link",{staticClass:"btn",attrs:{to:"/Cart"}},[t("span",[t("img",{attrs:{src:i("704c"),alt:""}})]),t("span",{staticClass:"ml5"},[this._v("바로가기")])])],1):this._e()])])}),e,!1,null,"19bb7941",null);s.a=n.exports},cc0a:function(t,s,i){"use strict";i("4809")},dfe2:function(t,s,i){"use strict";var e={components:{modalWrap:i("7402").a},data:()=>({zip:"",addr1:"",sido:"",sigungu:"",bname:""}),watch:{zip(){this.$attrs.updateZip({zip:this.zip,addr1:this.addr1,sido:this.sido,sigungu:this.sigungu,dong:this.bname}),this.$emit("close")}},mounted(){this.showApi()},methods:{showApi(){new window.daum.Postcode({width:"100%",oncomplete:t=>{let s=t.roadAddress,i="";""!==t.bname&&/[동|로|가]$/g.test(t.bname)&&(i+=t.bname),""!==t.buildingName&&"Y"===t.apartment&&(i+=""!==i?", "+t.buildingName:t.buildingName),""!==i&&(i=" ("+i+")"),""!==s&&(s+=i),this.zip=t.zonecode,this.addr1=s,this.sido=t.sido,this.sigungu=t.sigungu,this.bname=t.bname}}).embed(this.$refs.embed)},close(){this.$emit("close")}}},a=i("2877"),o=Object(a.a)(e,(function(){var t=this._self._c;return t("modalWrap",{on:{close:this.close}},[t("template",{slot:"head"},[t("h2",[this._v("주소찾기")])]),t("template",{slot:"body"},[t("div",{ref:"embed"})])],2)}),[],!1,null,null,null);s.a=o.exports},eb85:function(t,s,i){"use strict";i.r(s);var e=i("2f62"),a=i("f3e4"),o=i("e71f"),n=i("e31c"),c=i("dfe2"),m=i("68e0"),d=i("ea7b"),r=i("78dc"),l={name:"Distribution",components:{Toast:r.a},data:()=>({infoModify:!1,modify:!1,uid:"",sid:"",info:{},infoTemp:{},bank:"",accNum:"",accHolder:"",supplyRate:"",zip:"",sids:[],message:"",status:!1}),computed:{...Object(e.b)("common",["mobile"])},created(){const t=Object(a.b)("userInfo");this.uid=t.uid,this.sid=t.info.sid,this.load()},methods:{statusChange(){this.modify=!0},infoStatusChange(){this.infoModify=!0},cancel(){this.infoModify=!1,this.infoTemp=this.info},async load(){try{this.$store.commit("common/setLoading",!0);const t=Object(o.d)(n.b,"publisherInfo",this.uid),s=await Object(o.g)(t);this.info=s.data(),this.infoTemp=s.data(),this.bank=s.data().bank,this.accNum=s.data().accNum,this.accHolder=s.data().accHolder,this.supplyRate=s.data().supplyRate}catch(t){console.log(t),this.$store.commit("common/setLoading",!1)}this.$store.commit("common/setLoading",!1)},async update(){this.modify=!1;try{this.$store.commit("common/setLoading",!0);const t=Object(o.d)(n.b,"publisherInfo",this.uid);await Object(o.q)(t,{bank:this.bank,accNum:this.accNum,accHolder:this.accHolder,supplyRate:this.supplyRate}),await this.load()}catch(t){console.log(t),this.$store.commit("common/setLoading",!1)}this.$store.commit("common/setLoading",!1)},async infoUpdate(){if(""===this.infoTemp.publisher)return this.status=!this.status,void(this.message="출판사명을 입력해주세요");if(""===this.infoTemp.name)return this.status=!this.status,void(this.message="대표자명을 입력해주세요");if(""===this.infoTemp.tel)return this.status=!this.status,void(this.message="대표연락처를 입력해주세요");if(""===this.infoTemp.cnNum)return this.status=!this.status,void(this.message="사업자등록번호를 입력해주세요");if(""===this.infoTemp.address2)return this.status=!this.status,void(this.message="주소를 입력해주세요");this.$store.commit("common/setLoading",!0),this.infoModify=!1,this.info=this.infoTemp;try{const t=Object(o.d)(n.b,"publisherInfo",this.uid);await Object(o.q)(t,{publisher:this.infoTemp.publisher,name:this.infoTemp.name,email:this.infoTemp.email,tel:this.infoTemp.tel,cnNum:this.infoTemp.cnNum,zip:this.zip,address1:this.infoTemp.address1,address2:this.infoTemp.address2});const s=Object(d.c)(n.a);await Object(d.h)(s.currentUser,this.infoTemp.email).then(()=>{this.$store.commit("common/setLoading",!1)}).catch(t=>{this.$store.commit("common/setLoading",!1),console.log(t)}),this.$store.commit("common/setLoading",!1),await this.load()}catch(t){console.log(t),this.$store.commit("common/setLoading",!1)}this.$store.commit("common/setLoading",!1)},showAddressModalPopup(){this.mobile?this.$modal.show(c.a,{updateZip:this.updateZip},Object(m.a)("AddressModal","95%","auto",!1)):this.$modal.show(c.a,{updateZip:this.updateZip},Object(m.a)("AddressModal","600px","auto",!1))},updateZip(t){this.infoTemp.address1=t.addr1,this.zip=t.zip}}},u=(i("084f"),i("2877")),p=Object(u.a)(l,(function(){var t=this,s=t._self._c;return s("section",[s("h3",[t._v("출판사 정보")]),s("table",{staticClass:"info-tbl mt5"},[t._m(0),s("tbody",[s("tr",[s("td",[t._v("출판사명")]),s("td",[t.infoModify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.infoTemp.publisher,expression:"infoTemp.publisher"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.infoTemp.publisher},on:{input:function(s){s.target.composing||t.$set(t.infoTemp,"publisher",s.target.value)}}}):s("span",[t._v(t._s(t.info.publisher))])])]),s("tr",[s("td",[t._v("아이디(이메일)")]),s("td",[t._v(t._s(t.info.email))])]),s("tr",[s("td",[t._v("대표자명")]),s("td",[t.infoModify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.infoTemp.name,expression:"infoTemp.name"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.infoTemp.name},on:{input:function(s){s.target.composing||t.$set(t.infoTemp,"name",s.target.value)}}}):s("span",[t._v(t._s(t.info.name))])])]),s("tr",[s("td",[t._v("대표연락처")]),s("td",[t.infoModify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.infoTemp.tel,expression:"infoTemp.tel"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.infoTemp.tel},on:{input:function(s){s.target.composing||t.$set(t.infoTemp,"tel",s.target.value)}}}):s("span",[t._v(t._s(t.info.tel))])])]),s("tr",[s("td",[t._v("사업자등록번호")]),s("td",[t.infoModify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.infoTemp.cnNum,expression:"infoTemp.cnNum"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.infoTemp.cnNum},on:{input:function(s){s.target.composing||t.$set(t.infoTemp,"cnNum",s.target.value)}}}):s("span",[t._v(t._s(t.info.cnNum))])])]),s("tr",[s("td",[t._v("주소")]),s("td",[t.infoModify?s("div",[s("div",[s("button",{staticClass:"basic xs",on:{click:t.showAddressModalPopup}},[t._v("주소찾기")])]),s("div",{staticClass:"mt5"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.infoTemp.address1,expression:"infoTemp.address1"}],staticClass:"basic",attrs:{type:"text",readonly:""},domProps:{value:t.infoTemp.address1},on:{input:function(s){s.target.composing||t.$set(t.infoTemp,"address1",s.target.value)}}})]),s("div",{staticClass:"mt5"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.infoTemp.address2,expression:"infoTemp.address2"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.infoTemp.address2},on:{input:function(s){s.target.composing||t.$set(t.infoTemp,"address2",s.target.value)}}})])]):s("span",[t._v(t._s(t.info.address1)+" "+t._s(t.info.address2))])])])])]),s("section",[t.infoModify?s("div",{staticClass:"d-flex justify-end mt5"},[s("button",{staticClass:"basic mr5",on:{click:t.cancel}},[t._v("취소")]),s("button",{staticClass:"primary",on:{click:t.infoUpdate}},[t._v("확인")])]):s("div",{staticClass:"d-flex justify-end mt5"},[s("button",{staticClass:"primary",on:{click:t.infoStatusChange}},[t._v("수정")])])]),s("div",{staticClass:"d-flex justify-space-between mt50"},[s("h3",[t._v("정산 정보")]),s("div",[s("router-link",{staticClass:"btn-xs",attrs:{to:"/ShopRate"}},[t._v("서점별 공급률 설정")])],1)]),s("section",{staticClass:"cal-wrap mt5"},[s("article",[s("div",[t._v("은행명")]),s("div",[t.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.bank,expression:"bank"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.bank},on:{input:function(s){s.target.composing||(t.bank=s.target.value)}}}):s("span",[t._v(t._s(t.bank))])])]),s("article",[s("div",[t._v("계좌번호")]),s("div",[t.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.accNum,expression:"accNum"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.accNum},on:{input:function(s){s.target.composing||(t.accNum=s.target.value)}}}):s("span",[t._v(t._s(t.accNum))])])]),s("article",[s("div",[t._v("예금주명")]),s("div",[t.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.accHolder,expression:"accHolder"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.accHolder},on:{input:function(s){s.target.composing||(t.accHolder=s.target.value)}}}):s("span",[t._v(t._s(t.accHolder))])])]),s("article",[s("div",[t._v("기본 공급률")]),s("div",[t.modify?s("input",{directives:[{name:"model",rawName:"v-model",value:t.supplyRate,expression:"supplyRate"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.supplyRate},on:{input:function(s){s.target.composing||(t.supplyRate=s.target.value)}}}):s("span",[t._v(t._s(t.supplyRate))])])])]),s("section",[t.modify?s("div",{staticClass:"d-flex justify-end mt5"},[s("button",{staticClass:"basic mr5",on:{click:function(s){t.modify=!1}}},[t._v("취소")]),s("button",{staticClass:"primary",on:{click:t.update}},[t._v("확인")])]):s("div",{staticClass:"d-flex justify-end mt5"},[s("button",{staticClass:"primary",on:{click:t.statusChange}},[t._v("수정")])])]),s("Toast",{attrs:{status:t.status,message:t.message}})],1)}),[function(){var t=this._self._c;return t("colgroup",[t("col",{attrs:{width:"100"}}),t("col",{attrs:{width:"*"}})])}],!1,null,"b124c4b0",null).exports,h=i("132d"),f=(i("14d9"),{name:"Distribution",components:{Toast:r.a},data:()=>({modify:"",companyNameTemp:"",nameTemp:"",companyName:"",telTemp:"",name:"",tel:"",uid:"",distribution:[],message:"",status:!1}),created(){const{uid:t}=Object(a.b)("userInfo");this.uid=t,this.load()},methods:{async load(){try{this.$store.commit("common/setLoading",!0);const t=Object(o.m)(Object(o.b)(n.b,"distribution"),Object(o.r)("uid","==",this.uid)),s=await Object(o.h)(t);this.modify="",this.distribution=[],s.forEach(t=>{this.distribution.push({id:t.id,data:t.data()})})}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)},async add(){if(""===this.companyName)return this.status=!this.status,void(this.message="배본사명을 입력해주세요");if(""===this.name)return this.status=!this.status,void(this.message="담당자를 입력해주세요");if(""===this.tel)return this.status=!this.status,void(this.message="연락처를 입력해주세요");try{this.$store.commit("common/setLoading",!0),await Object(o.a)(Object(o.b)(n.b,"distribution"),{companyName:this.companyName,name:this.name,tel:this.tel,uid:this.uid}),this.companyName="",this.name="",this.tel="",await this.load()}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)},async update(t){try{this.$store.commit("common/setLoading",!0);const s=Object(o.d)(n.b,"distribution",t);await Object(o.q)(s,{companyName:this.companyNameTemp,name:this.nameTemp,tel:this.telTemp}),await this.load()}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)},async del(t){try{this.$store.commit("common/setLoading",!0),await Object(o.c)(Object(o.d)(n.b,"distribution",t)),await this.load()}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)},modifyTemp(t){this.modify=t.id,this.companyNameTemp=t.companyName,this.nameTemp=t.name,this.telTemp=t.tel}}}),v=(i("1f26"),{components:{Distribution:Object(u.a)(f,(function(){var t=this,s=t._self._c;return s("section",[s("h3",{staticClass:"mt50"},[t._v("배본 정보")]),s("table",{staticClass:"dis-tbl mt5"},[t._m(0),t._m(1),s("tbody",[t._l(t.distribution,(function(i,e){return s("tr",{key:e},[s("td",[t.modify!==i.id?s("span",[t._v(t._s(i.data.companyName))]):s("input",{directives:[{name:"model",rawName:"v-model",value:t.companyNameTemp,expression:"companyNameTemp"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.companyNameTemp},on:{input:function(s){s.target.composing||(t.companyNameTemp=s.target.value)}}})]),s("td",[t.modify!==i.id?s("span",[t._v(t._s(i.data.name))]):s("input",{directives:[{name:"model",rawName:"v-model",value:t.nameTemp,expression:"nameTemp"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.nameTemp},on:{input:function(s){s.target.composing||(t.nameTemp=s.target.value)}}})]),s("td",[t.modify!==i.id?s("span",[t._v(t._s(i.data.tel))]):s("input",{directives:[{name:"model",rawName:"v-model",value:t.telTemp,expression:"telTemp"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.telTemp},on:{input:function(s){s.target.composing||(t.telTemp=s.target.value)}}})]),s("td",[s("div",{staticClass:"d-flex"},[t.modify!==i.id?s("div",[s("button",{staticClass:"basic xs",on:{click:function(s){return t.modifyTemp({id:i.id,companyName:i.data.companyName,name:i.data.name,tel:i.data.tel})}}},[t._v("\n                수정\n              ")])]):s("div",{staticClass:"d-flex"},[s("button",{staticClass:"basic xs mr5",on:{click:function(s){t.modify=""}}},[t._v("취소")]),s("button",{staticClass:"primary xs",on:{click:function(s){return t.update(i.id)}}},[t._v("확인")])]),t.modify!==i.id?s("div",[s(h.a,{staticClass:"delete",on:{click:function(s){return t.del(i.id)}}},[t._v("mdi-close")])],1):t._e()])])])})),s("tr",[s("td",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.companyName,expression:"companyName"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.companyName},on:{input:function(s){s.target.composing||(t.companyName=s.target.value)}}})]),s("td",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}})]),s("td",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],staticClass:"basic",attrs:{type:"text"},domProps:{value:t.tel},on:{input:function(s){s.target.composing||(t.tel=s.target.value)}}})]),s("td",[s("button",{staticClass:"primary",on:{click:t.add}},[t._v("추가")])])])],2)]),s("Toast",{attrs:{status:t.status,message:t.message}})],1)}),[function(){var t=this._self._c;return t("colgroup",[t("col",{attrs:{width:"*"}}),t("col",{attrs:{width:"*"}}),t("col",{attrs:{width:"*"}}),t("col",{attrs:{width:"100"}})])},function(){var t=this._self._c;return t("thead",[t("tr",[t("th",[this._v("배본사명")]),t("th",[this._v("담당자")]),t("th",[this._v("연락처")]),t("th")])])}],!1,null,"69c4cdc5",null).exports,PublisherInfo:p}}),b=Object(u.a)(v,(function(){var t=this._self._c;return t("section",[t("h2",{staticClass:"sub-title"},[this._v("출판사 정보")]),t("section",{staticClass:"sub-container"},[t("PublisherInfo"),t("Distribution")],1)])}),[],!1,null,"ecad2ad0",null);s.default=b.exports}}]);