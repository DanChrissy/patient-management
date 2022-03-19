"use strict";(self.webpackChunkpatient_manage=self.webpackChunkpatient_manage||[]).push([[97],{43539:function(n,r,e){var o,t=e(30168),i=e(1413),a=e(45987),l=e(15751),s=e(80184),d=["title","disabled","customStyles","onClick"];r.Z=function(n){var r=n.title,e=n.disabled,o=n.customStyles,t=n.onClick,l=(0,a.Z)(n,d);return(0,s.jsx)(c,(0,i.Z)((0,i.Z)({type:"button",onClick:t,disabled:e,style:o},l),{},{children:r}))};var c=l.ZP.button(o||(o=(0,t.Z)(["\n    outline: none;\n    border: none;\n\n    width: auto;\n    padding: var(--space-12) var(--space-14);\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    font-family: 'DM Sans';\n    font-size: var(--font-14);\n    font-weight: normal;\n    font-size: normal;\n\n    color: var(--color-white);\n    background-color: var(--color-purple-800);\n    border-radius: 0.25rem;\n\n   cursor: pointer;\n\n   :disabled {\n       cursor: default;\n   }\n\n\n"])))},12538:function(n,r,e){e.d(r,{q:function(){return d},s:function(){return c}});var o,t,i,a=e(30168),l=e(15751),s=e(80184),d=function(n){var r=n.title,e=n.customStyles,o=n.titleStyles,t=n.children;return(0,s.jsxs)(u,{style:e,children:[(0,s.jsx)("p",{className:"group-title",style:o,children:r}),t]})},c=function(n){var r=n.title,e=n.customStyles,o=n.onClick,t=n.disabled,i=void 0!==t&&t;return(0,s.jsx)(v,{disabled:i,style:e,onClick:function(){return!i&&o&&o()},children:r})},u=l.ZP.div(o||(o=(0,a.Z)(["\n    display: flex;\n    flex-direction: column;\n\n    .group-title {\n        margin: 0;\n\n        font-family: 'DM Sans';\n        font-size: 0.625rem;\n        line-height: 0.625rem;\n        font-weight: normal;\n        font-style: normal;\n\n        color: var(--color-gray-100);\n\n        padding: 0.25rem var(--space-16);\n        margin-bottom: var(--space-8);\n\n        background-color: var(--color-gray-800);\n        text-transform: uppercase;\n    }\n"]))),v=l.ZP.div(t||(t=(0,a.Z)(["\n    padding: 0.5rem 0.625rem;\n\n    display: flex;\n    align-items: center;\n\n\n    font-family: Inter;\n    font-size: var(--font-14);\n    font-weight: normal;\n    font-style: normal;\n\n    color: var(--color-gray-100);\n\n    ","\n\n\n"])),(function(n){return!n.disabled&&(0,l.iv)(i||(i=(0,a.Z)(["\n        :hover {\n            background-color: var(--color-gray-800);\n            cursor: pointer;\n        }\n    "])))}))},10824:function(n,r,e){var o,t,i,a,l,s,d=e(30168),c=e(70885),u=e(72791),v=e(15751),p=e(95717),f=e(80184);r.Z=function(n){var r=n.styledType,e=n.trigger,o=n.error,t=n.customContainerStyes,i=n.children,a=(0,u.useState)(!1),l=(0,c.Z)(a,2),s=l[0],d=l[1];return(0,f.jsxs)(m,{children:[(0,f.jsx)(g,{styledType:r,error:o,onClick:function(){return d(!s)},children:e}),s&&(0,f.jsx)(h,{style:t,children:i})]})};var m=v.ZP.div(o||(o=(0,d.Z)(["\n    width: auto;\n\n    display: flex;\n    flex-direction: column;\n\n    position: relative;\n\n    ::-webkit-scrollbar {\n        display: none;\n    }\n\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n"]))),g=v.ZP.div(t||(t=(0,d.Z)(["\n    padding: var(--space-10) var(--space-12);\n    background-color: var(--color-white);\n    border: 1px solid var(--color-gray-800);\n\n    font-family: Inter;\n    font-size: var(--font-14);\n    font-weight: normal;\n    font-style: normal;\n    color: var(--color-gray-600);\n\n    border-radius: 0.25rem;\n    box-sizing: border-box;\n\n    ","\n\n    ","\n\n    ","\n"])),(function(n){return n.styledType===p.G.LARGE&&(0,v.iv)(i||(i=(0,d.Z)(["\n        min-width: 25rem;\n        min-height: 3rem;\n\n        font-size: var(--font-16);\n        font-weight: 500;\n\n        border: 2px solid var(--color-gray-600);\n\n    "])))}),(function(n){return n.error&&(0,v.iv)(a||(a=(0,d.Z)(["\n        border-color: var(--color-orange-600);\n        background-color: var(--color-orange-100);\n    "])))}),(function(n){return n.error&&n.styledType===p.G.LARGE&&(0,v.iv)(l||(l=(0,d.Z)(["\n        border: 2px solid var(--color-red-600);\n        background-color: var(--color-white);\n        color: var(--color-black);\n    "])))})),h=v.ZP.div(s||(s=(0,d.Z)(["\n    width: auto;\n    min-width: 14rem;\n    /* min-width: max-content; */\n\n    position: absolute;\n    z-index: 2;\n    top: 2.5rem;\n\n    display: flex;\n    flex-direction: column;\n    margin-top: 0.125rem;\n\n    padding: var(--space-8) 0;\n    background-color: var(--color-gray-900);\n    color: var(--color-white);\n\n    border-radius: 0.25rem;\n"])))},95717:function(n,r,e){e.d(r,{G:function(){return v}});var o,t,i,a,l,s,d,c,u,v,p=e(30168),f=e(1413),m=e(45987),g=e(15751),h=e(80184),y=["styledType","type","value","error","onChange"];!function(n){n.LARGE="LARGE",n.SMALL="SMALL"}(v||(v={}));r.Z=function(n){var r=n.styledType,e=n.type,o=void 0===e?"text":e,t=n.value,i=n.error,a=void 0===i?{hasError:!1}:i,l=n.onChange,s=(0,m.Z)(n,y);return(0,h.jsxs)(x,{children:[(0,h.jsx)(Z,(0,f.Z)({styledType:r,type:o,value:t,onChange:l,error:a.hasError},s)),a.hasError&&a.errorMsg&&(0,h.jsx)(b,{styledType:r,children:a.errorMsg})]})};var x=g.ZP.div(o||(o=(0,p.Z)(["\n    width: auto;\n\n    display: flex;\n    flex-direction: column;\n"]))),Z=g.ZP.input(t||(t=(0,p.Z)(["\n    outline: none !important;\n\n    padding: var(--space-10) var(--space-12);\n    background-color: var(--color-white);\n    border: 1px solid var(--color-gray-800);\n\n    font-family: Inter;\n    font-size: var(--font-14);\n    font-weight: normal;\n    font-style: normal;\n    color: var(--color-gray-600);\n\n    border-radius: 0.25rem;\n    box-sizing: border-box;\n\n    ::placeholder {\n        color: var(--color-gray-400);\n    }\n\n    :focus {\n        border: 1px solid var(--color-purple-800);\n\n        ","\n\n        ","\n    }\n\n    ","\n\n    ","\n\n    ","\n\n\n"])),(function(n){return n.styledType===v.LARGE&&(0,g.iv)(i||(i=(0,p.Z)(["\n            border: 2px solid var(--color-purple-800);\n        "])))}),(function(n){return n.error&&n.styledType===v.LARGE&&(0,g.iv)(a||(a=(0,p.Z)(["\n            border: 2px solid var(--color-red-600);\n        "])))}),(function(n){return n.error&&(0,g.iv)(l||(l=(0,p.Z)(["\n        border: 1px solid var(--color-orange-600);\n        background-color: var(--color-orange-100);\n    "])))}),(function(n){return n.styledType===v.LARGE&&(0,g.iv)(s||(s=(0,p.Z)(["\n        min-width: 25rem;\n        min-height: 3rem;\n\n        font-size: var(--font-16);\n        font-weight: 500;\n\n        border: 2px solid var(--color-gray-600);\n\n    "])))}),(function(n){return n.error&&n.styledType===v.LARGE&&(0,g.iv)(d||(d=(0,p.Z)(["\n        border: 2px solid var(--color-red-600);\n        background-color: var(--color-white);\n        color: var(--color-black);\n    "])))})),b=g.ZP.div(c||(c=(0,p.Z)(["\n    margin-top: var(--space-8);\n    padding: var(--space-8);\n    border-radius: 0.25rem;\n\n    font-size: var(--font-10);\n\n    color: var(--color-orange-800);\n    background-color: var(--color-red-100);\n\n    border: 1px solid var(--color-red-800);\n\n    ","\n\n"])),(function(n){return n.styledType===v.LARGE&&(0,g.iv)(u||(u=(0,p.Z)(["\n        font-size: var(--font-12);\n    "])))}))},19969:function(n,r,e){var o,t=e(30168),i=e(1413),a=e(45987),l=e(15751),s=e(95717),d=e(80184),c=["title","customStyleProps","customField"];r.Z=function(n){var r=n.title,e=n.customStyleProps,o=n.customField,t=(0,a.Z)(n,c);return(0,d.jsxs)(u,{style:e,children:[(0,d.jsx)("p",{children:r}),o||(0,d.jsx)(s.Z,(0,i.Z)({},t))]})};var u=l.ZP.div(o||(o=(0,t.Z)(["\n    display: flex;\n    flex-direction: column;\n\n    font-family: Inter;\n    font-size: var(--font-14);\n    font-weight: normal;\n    font-style: normal;\n    color: var(--color-gray-600);\n\n    p { margin: 0; margin-bottom: var(--space-8);}\n\n"])))},5097:function(n,r,e){e.r(r);var o,t,i,a,l=e(30168),s=e(15861),d=e(4942),c=e(1413),u=e(70885),v=e(87757),p=e.n(v),f=e(72791),m=e(16030),g=e(16871),h=e(94275),y=e.n(h),x=e(68181),Z=e(15751),b=e(19969),w=e(83647),j=e(43539),k=e(10824),S=e(12538),C=e(80184),P=["Kingston","St. Andrew","Hanover","St. Catherine","St. Elizabeth","St. James","Trelawny","Westmoreland","Clarendon","Manchester","St. Ann","St. Mary","Portland","St. Thomas"];r.default=function(n){Object.assign({},n);var r=(0,m.I0)(),e=(0,m.v9)(w.PR),o=(0,g.s0)(),t=(0,f.useState)(),i=(0,u.Z)(t,2),a=i[0],l=i[1],v=(0,f.useState)(),h=(0,u.Z)(v,2),Z=h[0],z=h[1];function M(n){var r=n.currentTarget,e=r.name,o=r.value;l((0,c.Z)((0,c.Z)({},a),{},(0,d.Z)({},e,o)))}function G(){var n=!0,r=[];return null!==a&&void 0!==a&&a.firstName||r.push("firstName"),null!==a&&void 0!==a&&a.lastName||r.push("lastName"),r.length>0&&(n=!1),z(r),n}function R(){return(R=(0,s.Z)(p().mark((function n(){var o,t,i,l,s,d,u,v,f,m;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(G()){n.next=3;break}return n.abrupt("return");case 3:return o={address1:(null===a||void 0===a?void 0:a.address1)||"",address2:(null===a||void 0===a?void 0:a.address2)||"",city:(null===a||void 0===a?void 0:a.city)||"",parish:(null===a||void 0===a?void 0:a.parish)||""},t=(null===a||void 0===a?void 0:a.trn)||"",i=(null===a||void 0===a?void 0:a.firstName)||"",l=(null===a||void 0===a?void 0:a.lastName)||"",s=null===a||void 0===a?void 0:a.dob.replace(/-/g,"/"),d=null!==a&&void 0!==a&&a.dob?new Date(s).toString():"",u=new(y().Query)("_User"),n.prev=10,n.next=13,u.get(e.id);case 13:return v=n.sent,console.log("Object: ",v),v.set("address",o),v.set("trn",t),v.set("firstName",i),v.set("lastName",l),v.set("dateOfBirth",d),n.prev=20,n.next=23,v.save();case 23:f=n.sent,delete(m=(0,c.Z)({id:f.id},f.attributes)).sessionToken,delete m.ACL,r((0,w.av)(m)),alert("User successfully updated"),n.next=35;break;case 31:n.prev=31,n.t0=n.catch(20),console.error("Error while updating ",n.t0),alert("Error updating user");case 35:n.next=41;break;case 37:n.prev=37,n.t1=n.catch(10),console.log("Error updating: ",n.t1),alert("Error updating user");case 41:case"end":return n.stop()}}),n,null,[[10,37],[20,31]])})))).apply(this,arguments)}return(0,f.useEffect)((function(){var n,r,o,t;e&&l((0,c.Z)((0,c.Z)({},e),{},{emailAddress:(null===e||void 0===e?void 0:e.email)||"",address1:(null===e||void 0===e||null===(n=e.address)||void 0===n?void 0:n.address1)||"",address2:(null===e||void 0===e||null===(r=e.address)||void 0===r?void 0:r.address1)||"",city:(null===e||void 0===e||null===(o=e.address)||void 0===o?void 0:o.city)||"",parish:(null===e||void 0===e||null===(t=e.address)||void 0===t?void 0:t.parish)||"",dob:null!==e&&void 0!==e&&e.dateOfBirth?(0,x.Z)(new Date(null===e||void 0===e?void 0:e.dateOfBirth),"yyyy-MM-dd"):""}))}),[]),(0,C.jsx)(A,{children:(0,C.jsxs)(N,{children:[(0,C.jsxs)(L,{children:[(0,C.jsx)(b.Z,{title:"First Name",name:"firstName",value:(null===a||void 0===a?void 0:a.firstName)||"",onChange:M,error:{hasError:(null===Z||void 0===Z?void 0:Z.includes("firstName"))||!1,errorMsg:"Please enter a value"}}),(0,C.jsx)(b.Z,{title:"Last Name",name:"lastName",value:(null===a||void 0===a?void 0:a.lastName)||"",onChange:M,error:{hasError:(null===Z||void 0===Z?void 0:Z.includes("lastName"))||!1,errorMsg:"Please enter a value"}}),(0,C.jsx)(b.Z,{title:"Address Line 1",name:"address1",value:(null===a||void 0===a?void 0:a.address1)||"",onChange:M}),(0,C.jsx)(b.Z,{title:"Address Line 2",name:"address2",value:(null===a||void 0===a?void 0:a.address2)||"",onChange:M}),(0,C.jsx)(b.Z,{title:"City",name:"city",value:(null===a||void 0===a?void 0:a.city)||"",onChange:M}),(0,C.jsx)(b.Z,{title:"Parish",name:"parish",customField:(0,C.jsx)(k.Z,{trigger:(0,C.jsx)("div",{children:(null===a||void 0===a?void 0:a.parish)||"No Parish Selected"}),customContainerStyes:{width:"auto"},children:(0,C.jsx)(S.q,{title:"PARISHES",customStyles:{maxHeight:"10rem",zIndex:2,overflow:"auto"},children:P.map((function(n,r){return(0,C.jsx)(S.s,{title:n,onClick:function(){return r=n,void l((0,c.Z)((0,c.Z)({},a),{},{parish:r}));var r}})}))})}),value:(null===a||void 0===a?void 0:a.parish)||"",onChange:M}),(0,C.jsx)(b.Z,{title:"TRN",maxLength:"9",name:"trn",value:(null===a||void 0===a?void 0:a.trn)||"",onChange:M}),(0,C.jsx)(b.Z,{title:"Date Of Birth",name:"dob",type:"date",value:null===a||void 0===a?void 0:a.dob,max:(0,x.Z)(new Date,"yyyy-MM-dd"),onChange:M})]}),(0,C.jsxs)(T,{children:[(0,C.jsx)(j.Z,{title:"Update User",customStyles:E,onClick:function(){return R.apply(this,arguments)}}),(0,C.jsx)(j.Z,{title:"Add Appointment",customStyles:E,onClick:function(){o("/appointment",{replace:!1})}})]})]})})};var E={width:"10rem"},A=Z.ZP.div(o||(o=(0,l.Z)(["\n    height: 100%;\n    width: 100%;\n\n    margin: 0;\n    padding: 0;\n"]))),N=Z.ZP.div(t||(t=(0,l.Z)(["\n    height: calc(100% - var(--space-32));\n    width: 100%;\n\n    display: flex;\n    flex-direction: column;\n\n    padding-top: var(--space-32);\n"]))),L=Z.ZP.div(i||(i=(0,l.Z)(["\n    /* height: 100%; */\n\n    display: grid;\n    grid-template-columns: repeat(2, 20rem);\n    justify-content: center;\n    align-content: center;\n\n    grid-column-gap: var(--space-24);\n    grid-row-gap: var(--space-14);\n"]))),T=Z.ZP.div(a||(a=(0,l.Z)(["\n    margin-top: var(--space-24);\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n\n    button {\n        :first-of-type {\n             margin-right: var(--space-14);\n        }\n    }\n    :first-child{\n       \n    }\n"])))}}]);
//# sourceMappingURL=97.32add565.chunk.js.map