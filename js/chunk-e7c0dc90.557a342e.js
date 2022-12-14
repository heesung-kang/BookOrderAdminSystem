(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e7c0dc90"],{0:function(t,s){},"0e2a":function(t,s,e){},2:function(t,s){},3:function(t,s){},"333e":function(t,s,e){},"7b31":function(t,s,e){"use strict";e("b8e6")},"9dcd":function(t,s,e){"use strict";e("0e2a")},a05a:function(t,s,e){"use strict";var i=e("b974"),a={props:["itemList"],data:()=>({select:""}),mounted(){this.select=this.itemList[0].value}},o=(e("c715"),e("2877")),d=Object(o.a)(a,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"selects"},[s(i.a,{attrs:{dense:"",items:t.itemList,"item-text":"item","item-value":"value",outlined:""},on:{input:function(s){return t.$emit("change",t.select)}},model:{value:t.select,callback:function(s){t.select=s},expression:"select"}})],1)}),[],!1,null,"5d7fff57",null);s.a=d.exports},b8e6:function(t,s,e){},c715:function(t,s,e){"use strict";e("333e")},e424:function(t,s,e){"use strict";e.r(s);e("14d9");var i=e("2f62"),a=e("a05a"),o=e("691b"),d=e("1f0b"),r=e("e71f"),l=e("e31c"),n=e("f3e4"),c=e("6ccd"),u=e.n(c),m=e("78dc"),h={components:{Selects:a.a,BookListSkeleton:o.a,BookListMobileSkeleton:d.a,Toast:m.a},props:["id","orderRealTimeId","uid"],data:()=>({select:"",itemList:[],books:[],address1:"",address2:"",puid:"",message:"",status:!1,isActive:!1}),computed:{...Object(i.b)("common",["windowWidth","mobile","skeletonLoading"]),bookCount(){let t=0;return this.books.forEach(s=>t+=Number(s.data.reply_count)),t},totalPrice(){let t=0;return this.books.forEach(s=>{t+=s.data.price*Number(s.data.supply_rate)*s.data.reply_count/100}),t}},async created(){const t=Object(n.b)("userInfo");this.puid=t.uid,await this.load(),await this.distribution(),await this.getAddress()},mounted(){window.onresize=()=>{this.setSize()}},methods:{async load(){try{this.books=[],this.$store.commit("common/setSkeleton",!0);const t=Object(r.m)(Object(r.b)(l.b,"orderRequest"),Object(r.r)("uid","==",this.uid),Object(r.r)("sid","==",Number(this.id)),Object(r.r)("order_check","==",!0),Object(r.r)("order_real_time_id","==",this.orderRealTimeId)),s=await Object(r.h)(t);await s.forEach(t=>{this.books.push({id:t.id,data:t.data()})}),setTimeout(()=>{this.setSize()},500)}catch(t){console.log(t)}this.$store.commit("common/setSkeleton",!1)},async getAddress(){const t=this.books[0].data.uid,s=Object(r.d)(l.b,"shopInfo",t),e=await Object(r.g)(s);this.address1=e.data().address1,this.address2=e.data().address2},async distribution(){const t=Object(r.m)(Object(r.b)(l.b,"distribution"),Object(r.r)("uid","==",this.puid)),s=await Object(r.h)(t);s.docs.length>0&&(this.itemList=[{item:"배본사 선택",value:""}],await s.forEach(t=>{this.itemList.push({value:t.data().companyName,item:t.data().companyName})}))},changeSelect(t){this.select=t},async order(){if(""===this.select)return this.status=!this.status,void(this.message="배본사를 선택해주세요.");const t=Object(r.s)(l.b);try{this.$store.commit("common/setLoading",!0);const s=Object(r.n)();await this.books.forEach(e=>{const i=Object(r.d)(l.b,"orderRequest",e.id);t.update(i,{shop_order_status:4,release_time_id:this.$date().format("YYYYMMDDHHmmss"),release_time:s,distribution:this.select})}),await t.commit(),await this.load()}catch(t){console.log(t)}this.$store.commit("common/setLoading",!1)},exportExcel(){const t=[];this.books.forEach(s=>{t.push({shop_name:s.data.shop_name,address:`${this.address1} ${this.address2}`,subject:s.data.subject,author:s.data.author,isbn:s.data.isbn,price:s.data.price*Number(s.data.supply_rate)/100,reply_count:s.data.reply_count,distribution:s.data.distribution,release_time:this.$date(s.data.release_time.toDate()).format("YYYY-MM-DD HH:mm:ss")})});const s=u.a.utils.json_to_sheet(t),e=u.a.utils.book_new();s.A1.v="서점",s.B1.v="배송지",s.C1.v="제목",s.D1.v="저자",s.E1.v="isbn",s.F1.v="출고가",s.G1.v="수량",s.H1.v="배본사",s.I1.v="출고지시일",s.A1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.B1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.C1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.D1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.E1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.F1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.G1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.H1.s={fill:{fgColor:{rgb:"d9ead3"}}},s.I1.s={fill:{fgColor:{rgb:"d9ead3"}}},u.a.utils.book_append_sheet(e,s,"books"),u.a.writeFile(e,"출고리스트.xlsx")},setSize(){this.mobile?(this.listWidth=document.querySelector(".body").clientWidth,this.titleMaxWidth=this.listWidth,setTimeout(()=>{document.querySelectorAll(".book-name").forEach(t=>{t.style.maxWidth=this.titleMaxWidth+"px"})},500)):(this.listWidth=document.querySelector(".body").clientWidth,this.titleMaxWidth=this.listWidth-550,setTimeout(()=>{document.querySelectorAll(".book-name").forEach(t=>{t.style.maxWidth=this.titleMaxWidth+"px"})},500))},tooltipToggle(t){this.isActive=t}}},_=(e("9dcd"),e("2877")),b={components:{DeliverList:Object(_.a)(h,(function(){var t=this,s=t._self._c;return s("section",[!t.mobile&&t.skeletonLoading?s("BookListSkeleton"):t._e(),t.mobile&&t.skeletonLoading?s("BookListMobileSkeleton"):t._e(),t.mobile||t.skeletonLoading?t._e():s("section",{staticClass:"header d-flex"},[s("div",[t._v("품목정보")]),s("div",[t._v("ISBN")]),t._m(0),s("div",[t._v("공급가")]),t._m(1),s("div",[t._v("상태")])]),s("ul",{staticClass:"body"},t._l(t.books,(function(e,i){var a;return s("li",{key:i,staticClass:"d-flex align-center"},[s("div",{staticClass:"d-flex align-center info-wrap"},[s("div",{staticClass:"book-info"},[s("h3",{staticClass:"book-name",on:{mouseover:function(s){return t.tooltipToggle(!0)},mouseout:function(s){return t.tooltipToggle(!1)}}},[t._v("\n            "+t._s(e.data.subject)+"\n          ")]),s("span",{class:[{active:t.isActive},"tooltip"]},[t._v(t._s(e.data.subject))]),s("div",{staticClass:"author"},[t._v(t._s(e.data.author))])])]),s("div",{staticClass:"isbn"},[t._v(t._s(e.data.isbn))]),s("div",{staticClass:"d-flex price-info"},[s("div",{staticClass:"normal-price"},[t.mobile?s("span",[t._v("정가")]):t._e(),t._v(" "+t._s(null===(a=e.data.price)||void 0===a?void 0:a.toLocaleString())+"원")]),s("div",[t.mobile?s("span",[t._v("공급률")]):t._e(),t._v(" "+t._s(e.data.supply_rate)+"%")])]),s("div",{staticClass:"final-price"},[t.mobile?s("span",[t._v("공급가")]):t._e(),t._v(" "+t._s((e.data.price*e.data.supply_rate/100).toLocaleString())+"원")]),s("div",{staticClass:"d-flex price-info"},[s("div",{staticClass:"normal-price"},[t.mobile?s("span",[t._v("주문")]):t._e(),t._v(" "+t._s(e.data.count))]),s("div",{staticClass:"count"},[t.mobile?s("span",[t._v("공급")]):t._e(),s("span",{class:{warning:e.data.count>e.data.reply_count}},[t._v(t._s(e.data.reply_count))])])]),s("div",[t.mobile?s("span",[t._v("상태")]):t._e(),t._v(" "+t._s(3===e.data.shop_order_status?"-":4===e.data.shop_order_status?"출고":"완료"))])])})),0),t.skeletonLoading?t._e():s("section",{staticClass:"total-wrap mt24"},[s("div",[s("span",{staticClass:"total-prod"},[t._v("총 "+t._s(t.bookCount)+"권")]),s("span",{staticClass:"total"},[t._v("합계 "+t._s(t.totalPrice.toLocaleString())+"원")])]),s("div",{staticClass:"address"},[s("p",[t._v("수령지: "+t._s(t.address1)+" "+t._s(t.address2))]),t.books[0].data.shop_order_status>3?s("p",[t._v("배본사 : "+t._s(t.books[0].data.distribution))]):t._e()])]),t.skeletonLoading||3!==t.books[0].data.shop_order_status?t._e():s("div",{staticClass:"d-flex align-center mt10 justify-end"},[t.itemList.length>0?s("span",{staticStyle:{display:"flex","align-items":"center"}},[s("span",{staticClass:"mr10"},[t._v("배본 설정: ")]),s("Selects",{attrs:{itemList:t.itemList},on:{change:t.changeSelect}})],1):s("span",[t._v("배본사를 설정하세요")]),s("button",{staticClass:"primary ml10 order",attrs:{disabled:0===t.itemList.length},on:{click:t.order}},[t._v("출고지시")])]),t.skeletonLoading||4!==t.books[0].data.shop_order_status?t._e():s("div",{staticClass:"d-flex align-center mt10 justify-end"},[s("button",{staticClass:"primary ml10 order",on:{click:t.exportExcel}},[t._v("엑셀출력")])]),s("Toast",{attrs:{status:t.status,message:t.message}})],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"d-flex"},[t("div",[this._v("정가")]),t("div",[this._v("공급률")])])},function(){var t=this._self._c;return t("div",{staticClass:"d-flex"},[t("div",[this._v("주문")]),t("div",[this._v("공급")])])}],!1,null,"29da9994",null).exports},data(){return{id:this.$route.params.id,date:this.$route.params.date,shopName:this.$route.params.shopName,orderRealTimeId:this.$route.params.orderRealTimeId,uid:this.$route.params.uid}}},p=(e("7b31"),Object(_.a)(b,(function(){var t=this,s=t._self._c;return s("section",[s("h2",{staticClass:"sub-title"},[t._v("주문 상세 보기 및 내역서 회신")]),s("section",{staticClass:"sub-container"},[s("article",{staticClass:"order-info d-flex justify-space-between"},[s("div",[t._v("\n        서점명: "),s("strong",[t._v(t._s(t.shopName))])]),s("div",[t._v(t._s(t.date))])]),s("DeliverList",{attrs:{id:t.id,orderRealTimeId:t.orderRealTimeId,uid:t.uid}})],1)])}),[],!1,null,"6273d9a8",null));s.default=p.exports}}]);