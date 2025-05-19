import{j as a}from"./jsx-runtime-BT65X5dW.js";import{r as i}from"./index-C6mWTJJr.js";import{T as n}from"./tabbar-FOReZWMi.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-B7dHvlFm.js";import"./no-important-DlFk8a1I.js";import"./item-D-gx1NxB.js";import"./index-CMC37hoy.js";import"./index-B1Gws05u.js";import"./index-Ds5N5m2R.js";const N={title:"math-input/components/Tab Bar",component:n};function l(e){const[p,c]=i.useState("Numbers");return a.jsx(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a.jsx(l,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  argTypes: {
    selectedItem: {
      options: ["Numbers", "Geometry", "Operators"]
    }
  },
  args: {
    items: ["Numbers", "Geometry", "Operators"]
  },
  parameters: {
    controls: {
      exclude: ["items", "onSelectItem", "selectedItem", "onClickClose"]
    }
  },
  render: args => <StatefulTabbarWrapper {...args} />
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const O=["Demo"];export{t as Demo,O as __namedExportsOrder,N as default};
