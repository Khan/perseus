import{j as a}from"./jsx-runtime-FVsy8kgq.js";import{r as i}from"./index-TT1qJ6UJ.js";import{T as n}from"./tabbar-0qVYH8vK.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-FlmdAi7b.js";import"./extends-wRoo2ExD.js";import"./index-awljIyHI.js";import"./item-C3mVvHZj.js";import"./index-az6L7JTG.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./index-deFLJwr4.js";const C={title:"math-input/components/Tab Bar",component:n};function l(e){const[p,c]=i.useState("Numbers");return a(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a(l,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const G=["Demo"];export{t as Demo,G as __namedExportsOrder,C as default};
