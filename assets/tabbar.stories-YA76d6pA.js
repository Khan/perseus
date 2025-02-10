import{j as a}from"./jsx-runtime-63Ea5SlK.js";import{r as l}from"./index-6oxdNXpR.js";import{T as n}from"./tabbar-UtkI9pTR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-_3CKOwHy.js";import"./no-important-xCWWYXQR.js";import"./item-YVSph9Dw.js";import"./index-0pCajwWr.js";import"./index-QHkT31Yt.js";const y={title:"math-input/components/Tab Bar",component:n};function i(e){const[p,c]=l.useState("Numbers");return a.jsx(n,{...e,selectedItem:p,onSelectItem:r=>{e.onSelectItem(r),c(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>a.jsx(i,{...e})};var o,s,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
