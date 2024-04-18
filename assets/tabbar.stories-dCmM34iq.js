import{j as a}from"./jsx-runtime-BGVbfQ2Z.js";import{r as i}from"./index-qhcEwEpg.js";import{T as n}from"./tabbar-TVJyj4KM.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-eZ2N530f.js";import"./index-awljIyHI.js";import"./item-Vt4CkKC9.js";import"./index-FSlvaNFm.js";import"./index-tvtfaFq4.js";import"./index-ACL0N2lY.js";import"./index-hYQ6Pa3_.js";import"./index-s2vhHSme.js";const C={title:"math-input/components/Tab Bar",component:n};function l(e){const[p,c]=i.useState("Numbers");return a(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a(l,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
