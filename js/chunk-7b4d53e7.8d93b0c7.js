(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7b4d53e7"],{"10a8":function(t,s,e){"use strict";e("402d")},2469:function(t,s,e){},"287f":function(t,s,e){"use strict";var a=e("490a"),i=e("2f62"),o=e("e71f"),l=e("e31c"),c={name:"Order",components:{modalWrap:e("7402").a},props:["books"],data:()=>({memo:""}),computed:{...Object(i.b)("common",["loading"])},methods:{close(){this.$emit("close")},async save(){try{this.$store.commit("common/setLoading",!0);const t=Object(o.j)(),s=Object(o.n)(l.b);await this.books.forEach(e=>{const a=Object(o.d)(l.b,"orderRequest",e.id);s.update(a,{publisher_reply_status:e.data.publisher_reply_status,reply_count:parseInt(e.data.reply_count),shop_order_status:1,reply_time:t,reply_time_id:this.$date().format("YYYYMMDDHHmmss"),memo:this.memo})}),await s.commit(),this.$emit("close"),this.$attrs.update()}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)}}},r=(e("10a8"),e("2877")),n=Object(r.a)(c,(function(){var t=this,s=t._self._c;return s("modalWrap",{on:{close:t.close}},[s("template",{slot:"head"},[s("h2",[t._v("메모")])]),s("template",{slot:"body"},[s("div",{staticClass:"v-application"},[t.loading?s(a.a,{staticClass:"spinner",attrs:{size:70,width:7,color:"amber",indeterminate:""}}):t._e()],1),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.memo,expression:"memo"}],attrs:{placeholder:"남기실 메모가 있으면 적어주세요"},domProps:{value:t.memo},on:{input:function(s){s.target.composing||(t.memo=s.target.value)}}}),s("div",{staticClass:"btn-wrap"},[s("button",{staticClass:"primary",on:{click:t.save}},[t._v("보내기")])])])],2)}),[],!1,null,"76a61d57",null);s.a=n.exports},"402d":function(t,s,e){},4809:function(t,s,e){},5245:function(t,s,e){"use strict";e.r(s);e("14d9");var a=e("2f62"),i=e("68e0"),o=e("287f"),l=e("b974"),c={props:["dafaultValue","index"],data:()=>({select:0,itemList:[{item:"정상",value:0},{item:"품절",value:1},{item:"절판",value:2},{item:"재고부족",value:3}]}),watch:{select(t){this.$emit("select",{value:t,index:this.index})}},mounted(){this.select=this.dafaultValue}},r=(e("ebc4"),e("2877")),n=Object(r.a)(c,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"selects"},[s(l.a,{attrs:{dense:"",items:t.itemList,"item-text":"item","item-value":"value",outlined:""},model:{value:t.select,callback:function(s){t.select=s},expression:"select"}})],1)}),[],!1,null,"551e7ea0",null).exports,d=e("e71f"),p=e("e31c"),u=e("3129"),m={name:"BookListSkeleton"},v=(e("b57b"),Object(r.a)(m,(function(){var t=this._self._c;return t("div",[t("ul",[t("li",[t("section",{staticClass:"d-flex align-center justify-space-between skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"d-flex align-center justify-space-between skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"d-flex align-center justify-space-between skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"d-flex align-center justify-space-between skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"d-flex align-center justify-space-between skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1),t("div",{staticClass:"text"},[t(u.a,{attrs:{type:"text"}})],1)])])])])}),[],!1,null,"d8eeb990",null).exports),b={name:"BookListMobileSkeleton"},_=(e("f412"),{components:{SelectsReply:n,BookListSkeleton:v,BookListMobileSkeleton:Object(r.a)(b,(function(){var t=this._self._c;return t("div",[t("ul",[t("li",[t("section",{staticClass:"skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}})],1)])]),t("li",[t("section",{staticClass:"skeleton-book-list"},[t("div",{staticClass:"img"},[t(u.a,{attrs:{type:"list-item-avatar-two-line"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}}),t(u.a,{attrs:{type:"text"}})],1)])])])])}),[],!1,null,"975c769e",null).exports},props:["id","orderTimeId","uid"],data:()=>({selected:[],books:[]}),computed:{...Object(a.b)("common",["windowWidth","mobile","skeletonLoading"]),bookCount(){let t=0;return this.books.forEach(s=>t+=Number(s.data.reply_count)),t},totalPrice(){let t=0;return this.books.forEach(s=>{t+=s.data.price*s.data.supply_rate*s.data.reply_count/100}),t}},created(){this.load()},methods:{async load(){try{this.books=[],this.$store.commit("common/setSkeleton",!0);const t=Object(d.i)(Object(d.b)(p.b,"orderRequest"),Object(d.m)("uid","==",this.uid),Object(d.m)("sid","==",Number(this.id)),Object(d.m)("order_time_id","==",this.orderTimeId)),s=await Object(d.f)(t);await s.forEach(t=>{this.books.push({id:t.id,data:t.data()})})}catch(t){console.log(t)}this.$store.commit("common/setSkeleton",!1)},showModal(){this.mobile?this.$modal.show(o.a,{books:this.books,update:this.load},Object(i.a)("ModalMemo","95%","auto",!1)):this.$modal.show(o.a,{books:this.books,update:this.load},Object(i.a)("ModalMemo","500px","auto",!1))},changeStatus(t){switch(this.books[t.index].data.publisher_reply_status=t.value,t.value){case 0:this.books[t.index].data.reply_count=this.books[t.index].data.count;break;case 1:case 2:this.books[t.index].data.reply_count=0}}}}),x=(e("f1b5"),{components:{OrderResultList:Object(r.a)(_,(function(){var t=this,s=t._self._c;return s("section",[!t.mobile&&t.skeletonLoading?s("BookListSkeleton"):t._e(),t.mobile&&t.skeletonLoading?s("BookListMobileSkeleton"):t._e(),t.mobile||t.skeletonLoading?t._e():s("section",{staticClass:"header d-flex"},[s("div",[t._v("품목정보")]),s("div",[t._v("ISBN")]),t._m(0),s("div",[t._v("공급가")]),s("div",[t._v("주문")]),s("div",[t._v("공급")]),s("div",[t._v("회신")])]),s("ul",{staticClass:"body"},t._l(t.books,(function(e,a){var i;return s("li",{key:a,staticClass:"d-flex align-center"},[s("div",{staticClass:"d-flex align-center info-wrap"},[s("div",{staticClass:"book-info"},[s("h3",[t._v(t._s(e.data.subject))]),s("div",{staticClass:"author"},[t._v(t._s(e.data.author))])])]),s("div",{staticClass:"isbn"},[t._v(t._s(e.data.isbn))]),s("div",{staticClass:"d-flex price-info"},[s("div",{staticClass:"normal-price"},[t.mobile?s("span",[t._v("정가")]):t._e(),t._v(" "+t._s(null===(i=e.data.price)||void 0===i?void 0:i.toLocaleString()))]),s("div",[t.mobile?s("span",[t._v("공급률")]):t._e(),t._v(" "+t._s(e.data.supply_rate)+"%")])]),s("div",{staticClass:"final-price"},[t.mobile?s("span",[t._v("공급가")]):t._e(),t._v(" "+t._s((e.data.price*e.data.supply_rate/100).toLocaleString()))]),s("div",{staticClass:"count"},[t.mobile?s("span",[t._v("주문")]):t._e(),t._v(" "+t._s(e.data.count))]),s("div",{staticClass:"count"},[t.mobile?s("span",[t._v("공급")]):t._e(),0===e.data.shop_order_status?s("input",{directives:[{name:"model",rawName:"v-model",value:e.data.reply_count,expression:"book.data.reply_count"}],staticClass:"basic reply-count",attrs:{type:"number",disabled:3!==e.data.publisher_reply_status},domProps:{value:e.data.reply_count},on:{input:function(s){s.target.composing||t.$set(e.data,"reply_count",s.target.value)}}}):s("span",[t._v(t._s(e.data.reply_count))])]),s("div",{staticClass:"btn-wrap"},[0===e.data.shop_order_status?s("SelectsReply",{attrs:{index:a,dafaultValue:e.data.publisher_reply_status},on:{select:t.changeStatus}}):s("div",[t._v("\n          "+t._s(0===e.data.publisher_reply_status?"정상":1===e.data.publisher_reply_status?"품절":2===e.data.publisher_reply_status?"절판":"재고부족")+"\n        ")])],1)])})),0),t.skeletonLoading?t._e():s("section",{staticClass:"total-wrap mt24"},[s("div",[s("span",{staticClass:"total-prod"},[t._v("총 "+t._s(t.bookCount)+"권")]),s("span",{staticClass:"total"},[t._v("합계 "+t._s(t.totalPrice.toLocaleString())+"원")])]),s("div",{staticClass:"d-flex"},[0!==t.books[0].data.shop_order_status?s("span",[t._v("회신완료")]):s("button",{staticClass:"primary",attrs:{disabled:0!==t.books[0].data.shop_order_status},on:{click:t.showModal}},[t._v("회신")])])])],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"d-flex"},[t("div",[this._v("정가")]),t("div",[this._v("공급률")])])}],!1,null,"f4833360",null).exports},data(){return{id:this.$route.params.id,date:this.$route.params.date,shopName:this.$route.params.shopName,orderTimeId:this.$route.params.orderTimeId,uid:this.$route.params.uid}}}),y=(e("81ff"),Object(r.a)(x,(function(){var t=this,s=t._self._c;return s("section",[s("h2",{staticClass:"sub-title"},[t._v("주문 상세 보기 및 회신")]),s("section",{staticClass:"sub-container"},[s("article",{staticClass:"order-info d-flex justify-space-between"},[s("div",[t._v("\n        서점명: "),s("strong",[t._v(t._s(t.shopName))])]),s("div",[t._v(t._s(t.date))])]),s("OrderResultList",{attrs:{id:t.id,orderTimeId:t.orderTimeId,uid:t.uid}})],1)])}),[],!1,null,"f5dbbca2",null));s.default=y.exports},"68e0":function(t,s,e){"use strict";e.d(s,"a",(function(){return a}));const a=function(t,s,e,a){return{name:t,width:s,height:e,resizable:a,clickToClose:!0,draggable:".popup-title",scrollable:!0}}},7402:function(t,s,e){"use strict";var a=e("132d"),i={methods:{close(){this.$emit("close")}}},o=(e("cc0a"),e("2877")),l=Object(o.a)(i,(function(){var t=this._self._c;return t("div",{staticClass:"modal-wrap"},[t("div",{staticClass:"close",on:{click:this.close}},[t(a.a,[this._v("mdi-window-close")])],1),this._t("head"),t("div",{staticClass:"line"}),t("div",{staticClass:"body"},[this._t("body")],2),this._t("footer")],2)}),[],!1,null,"1c84da6b",null);s.a=l.exports},7605:function(t,s,e){},"81ff":function(t,s,e){"use strict";e("f029")},b57b:function(t,s,e){"use strict";e("da01")},c2fe:function(t,s,e){},cc0a:function(t,s,e){"use strict";e("4809")},da01:function(t,s,e){},ebc4:function(t,s,e){"use strict";e("2469")},f029:function(t,s,e){},f1b5:function(t,s,e){"use strict";e("7605")},f412:function(t,s,e){"use strict";e("c2fe")}}]);