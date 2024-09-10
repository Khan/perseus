import{j as a}from"./jsx-runtime-FVsy8kgq.js";import{r as i}from"./index-TT1qJ6UJ.js";import{T as n}from"./tabbar-WYCYDof0.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-6h5t6F0w.js";import"./index-awljIyHI.js";import"./item-X9tjzx12.js";import"./index-2dmvOE3q.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./index-deFLJwr4.js";const O={title:"math-input/components/Tab Bar",component:n};function l(e){const[p,c]=i.useState("Numbers");return a(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a(l,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const C=["Demo"];export{t as Demo,C as __namedExportsOrder,O as default};
