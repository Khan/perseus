import{j as a}from"./jsx-runtime-BGVbfQ2Z.js";import{r as l}from"./index-qhcEwEpg.js";import{T as n}from"./tabbar-RiuhgrwC.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-oMd7J_hd.js";import"./index-awljIyHI.js";import"./item-UPBCIzra.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./index-lUErx3pE.js";const N={title:"math-input/components/Tab Bar",component:n};function i(e){const[p,c]=l.useState("Numbers");return a(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a(i,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
