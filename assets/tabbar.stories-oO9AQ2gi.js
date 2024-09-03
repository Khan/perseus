import{j as a}from"./jsx-runtime-FVsy8kgq.js";import{r as l}from"./index-TT1qJ6UJ.js";import{T as n}from"./tabbar-qQQo4fB1.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-6h5t6F0w.js";import"./index-awljIyHI.js";import"./item--2I-4f2E.js";import"./index-u34vH4Ah.js";import"./index-tvtfaFq4.js";import"./index-deFLJwr4.js";const N={title:"math-input/components/Tab Bar",component:n};function i(e){const[p,c]=l.useState("Numbers");return a(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a(i,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
