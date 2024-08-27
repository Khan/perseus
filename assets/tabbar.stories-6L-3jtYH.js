import{j as a}from"./jsx-runtime-5BUNAZ9W.js";import{r as i}from"./index-4g5l5LRQ.js";import{T as n}from"./tabbar-byZ4rx2R.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-e4P84RkC.js";import"./index-awljIyHI.js";import"./item-zU8_EECn.js";import"./index-EhcO8HWm.js";import"./react-router-dom-hVaNq8bQ.js";import"./index-tvtfaFq4.js";import"./index-lUErx3pE.js";import"./index-eVQtxZE-.js";const C={title:"math-input/components/Tab Bar",component:n};function l(e){const[p,c]=i.useState("Numbers");return a(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a(l,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
