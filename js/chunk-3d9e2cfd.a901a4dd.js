(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3d9e2cfd"],{4809:function(t,s,i){},5245:function(t,s,i){"use strict";i.r(s);var a=i("ac7c"),e=[function(){var t=this._self._c;return t("div",{staticClass:"d-flex dual"},[t("div",[this._v("발주")]),t("div",[this._v("품목정보")])])},function(){var t=this._self._c;return t("div",{staticClass:"d-flex"},[t("div",[this._v("정가")]),t("div",[this._v("공급률")])])},function(){var t=this._self._c;return t("div",{staticClass:"thumbnail"},[t("img",{attrs:{src:i("9811"),alt:""}})])},function(){var t=this._self._c;return t("div",{staticClass:"book-info"},[t("h3",[this._v("아노말리(양장본 Hardcover)")]),t("div",{staticClass:"author"},[this._v("에르베 르 텔리에")])])},function(){var t=this._self._c;return t("section",{staticClass:"memo"},[t("h4",[this._v("메모")]),t("div",[this._v("아노말리(9788937427220)는 일시 품절이나 3일 후 입고 예정입니다.")])])},function(){var t=this._self._c;return t("div",[t("span",{staticClass:"total-prod"},[this._v("총 6권")]),t("span",{staticClass:"total"},[this._v("합계 72,000원")])])}],c=i("2f62");const o=function(t,s,i,a){return{name:t,width:s,height:i,resizable:a,clickToClose:!0,draggable:".popup-title",scrollable:!0}};var l=i("f579"),n=i.n(l),d=i("132d"),r={methods:{close(){this.$emit("close")}}},v=(i("cc0a"),i("2877")),h={name:"Order",components:{modalWrap:Object(v.a)(r,(function(){var t=this._self._c;return t("div",{staticClass:"modal-wrap"},[t("div",{staticClass:"close",on:{click:this.close}},[t(d.a,[this._v("mdi-window-close")])],1),this._t("head"),t("div",{staticClass:"line"}),t("div",{staticClass:"body"},[this._t("body")],2),this._t("footer")],2)}),[],!1,null,"1c84da6b",null).exports,barcode:n.a},data:()=>({barcode:"9791130692791"}),methods:{close(){this.$emit("close")}}},u=(i("61ea"),Object(v.a)(h,(function(){var t=this._self._c;return t("modalWrap",{on:{close:this.close}},[t("template",{slot:"head"},[t("h2",[this._v("발주(결제)")])]),t("template",{slot:"body"},[t("section",{staticClass:"info"},[t("div",[t("h3",[this._v("아노말리(양장본 Hardcover) 외 2권")]),t("p",{staticClass:"price"},[this._v("15,000원")])]),t("div",{staticClass:"barcode-wrap"},[t("barcode",{staticClass:"barcode",attrs:{format:"EAN13",value:this.barcode,"font-options":"bold",width:"2px",height:"100px"}}),t("div",{staticClass:"pay"},[this._v("인스타페이 앱으로 결제해 주세요")])],1)])])],2)}),[],!1,null,"2a1577a9",null).exports),_={data:()=>({selected:[],mobile:!1}),computed:{...Object(c.b)("common",["windowWidth"])},watch:{windowWidth(t){this.mobile=!(t>600)}},mounted(){this.windowWidth>600?this.mobile=!1:this.mobile=!0},methods:{showModal(){this.mobile?this.$modal.show(u,{},o("orderModal","95%","auto",!1)):this.$modal.show(u,{},o("orderModal","500px","auto",!1))}}},f=(i("91a2"),{name:"OrderResult",components:{OrderResultList:Object(v.a)(_,(function(){var t=this,s=t._self._c;return s("section",[t.mobile?t._e():s("section",{staticClass:"header d-flex"},[t._m(0),s("div",[t._v("ISBN")]),t._m(1),s("div",[t._v("공급가")]),s("div",[t._v("수량")])]),s("ul",{staticClass:"body"},[s("li",{staticClass:"d-flex align-center"},[s("div",{staticClass:"d-flex align-center info-wrap"},[s("div",{staticClass:"ck-box"},[s(a.a,{attrs:{value:"9788937427220"},model:{value:t.selected,callback:function(s){t.selected=s},expression:"selected"}})],1),t._m(2),t._m(3)]),s("div",{staticClass:"isbn"},[t._v("9788937427220")]),s("div",{staticClass:"d-flex price-info"},[s("div",{staticClass:"normal-price"},[t.mobile?s("span",[t._v("정가")]):t._e(),t._v(" 20,000")]),s("div",[t.mobile?s("span",[t._v("공급률")]):t._e(),t._v(" 60%")])]),s("div",{staticClass:"final-price"},[t.mobile?s("span",[t._v("공급가")]):t._e(),t._v(" 12,000")]),s("div",{staticClass:"count"},[t.mobile?s("span",[t._v("수량")]):t._e(),t._v(" 품절")])])]),t._m(4),s("section",{staticClass:"total-wrap mt24"},[t._m(5),s("button",{staticClass:"primary",on:{click:t.showModal}},[t._v("발주")])])])}),e,!1,null,"f8fe4b18",null).exports}}),b=(i("5db0"),Object(v.a)(f,(function(){var t=this._self._c;return t("section",[t("h2",{staticClass:"sub-title"},[this._v("내역서 확인")]),t("section",{staticClass:"sub-container"},[this._m(0),t("OrderResultList")],1)])}),[function(){var t=this._self._c;return t("article",{staticClass:"order-info d-flex justify-space-between"},[t("div",[this._v("출판사명: "),t("strong",[this._v("민음사")])]),t("div",[this._v("주문일자:2022.10.4")])])}],!1,null,"fbfe3dc4",null));s.default=b.exports},"5db0":function(t,s,i){"use strict";i("9699")},"61ea":function(t,s,i){"use strict";i("96a9")},"91a2":function(t,s,i){"use strict";i("db97")},9699:function(t,s,i){},"96a9":function(t,s,i){},9811:function(t,s,i){t.exports=i.p+"img/book.504b6ed5.jpg"},cc0a:function(t,s,i){"use strict";i("4809")},db97:function(t,s,i){}}]);