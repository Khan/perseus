import{j as a}from"./jsx-runtime-63Ea5SlK.js";import{r as l}from"./index-6oxdNXpR.js";import{T as n}from"./tabbar-D-BeWJQY.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-CgfdZoMj.js";import"./index-awljIyHI.js";import"./item-W49ZrBwd.js";import"./index-NVT999Ia.js";import"./index-dmcq622U.js";const y={title:"math-input/components/Tab Bar",component:n};function i(e){const[p,c]=l.useState("Numbers");return a.jsx(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a.jsx(i,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const N=["Demo"];export{t as Demo,N as __namedExportsOrder,y as default};
