import{j as a}from"./jsx-runtime-5BUNAZ9W.js";import{r as l}from"./index-4g5l5LRQ.js";import{T as n}from"./tabbar-tY-vWj59.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-e4P84RkC.js";import"./index-awljIyHI.js";import"./item-kdyp1JvI.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-lUErx3pE.js";const N={title:"math-input/components/Tab Bar",component:n};function i(e){const[p,c]=l.useState("Numbers");return a(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a(i,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
