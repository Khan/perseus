import{x as R}from"./index-CyvfwEp7.js";import{d as x}from"./iframe-Dxi_7cS6.js";const e="Operators Page",i="Numbers Page",O="Geometry Page",E="Fractions Page",k={title:"Math Input/Full Keypad",parameters:{backgrounds:{values:[{name:"light background",value:"white",default:!0}]},viewport:{defaultViewport:"iphone6",viewports:R},docs:{description:{component:"A customizable virtual keyboard for mathematical input that provides different key layouts for various math concepts."}}},tags:["!dev"],component:x,args:{advancedRelations:!1,basicRelations:!1,divisionKey:!1,logarithms:!1,fractionsOnly:!1,convertDotToTimes:!1,preAlgebra:!1,trigonometry:!1,sendEvent:()=>{},onAnalyticsEvent:async()=>{}},argTypes:{advancedRelations:{control:"boolean",table:{category:e}},basicRelations:{control:"boolean",table:{category:e}},divisionKey:{control:"boolean",table:{category:i}},logarithms:{control:"boolean",table:{category:e}},fractionsOnly:{control:"boolean",table:{category:E}},multiplicationDot:{control:"boolean",table:{category:i}},preAlgebra:{control:"boolean",table:{category:e}},trigonometry:{control:"boolean",table:{category:O}}}},r={},a={args:{preAlgebra:!0}},t={args:{preAlgebra:!0,trigonometry:!0}},o={args:{fractionsOnly:!0}},s={args:{advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!1,preAlgebra:!0,trigonometry:!0,expandedView:!0,showDismiss:!0,extraKeys:["a","b","c"]}},n={args:{advancedRelations:!0,basicRelations:!0,divisionKey:!0,logarithms:!0,convertDotToTimes:!1,preAlgebra:!0,trigonometry:!0,expandedView:!1,showDismiss:!0,extraKeys:["a","b","c"]}};var c,l,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(l=r.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var g,m,d;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    preAlgebra: true
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,y,b;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    preAlgebra: true,
    trigonometry: true
  }
}`,...(b=(y=t.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var v,f,h;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    fractionsOnly: true
  }
}`,...(h=(f=o.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var A,K,T;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    advancedRelations: true,
    basicRelations: true,
    divisionKey: true,
    logarithms: true,
    convertDotToTimes: false,
    preAlgebra: true,
    trigonometry: true,
    expandedView: true,
    showDismiss: true,
    extraKeys: ["a", "b", "c"]
  }
}`,...(T=(K=s.parameters)==null?void 0:K.docs)==null?void 0:T.source}}};var w,D,P;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    advancedRelations: true,
    basicRelations: true,
    divisionKey: true,
    logarithms: true,
    convertDotToTimes: false,
    preAlgebra: true,
    trigonometry: true,
    expandedView: false,
    showDismiss: true,
    extraKeys: ["a", "b", "c"]
  }
}`,...(P=(D=n.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};const F=["Default","PreAlgebra","Trigonometry","FractionsOnly","Everything","EverythingMinusNavigationPad"];export{r as Default,s as Everything,n as EverythingMinusNavigationPad,o as FractionsOnly,a as PreAlgebra,t as Trigonometry,F as __namedExportsOrder,k as default};
