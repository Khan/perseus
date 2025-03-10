import{r}from"./index-6oxdNXpR.js";import{T as n}from"./tabbar-B0kYgJj9.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-hw7d7wq0.js";import"./no-important-xCWWYXQR.js";import"./item-Ztp2GOp4.js";import"./index-OMSOgf8r.js";import"./tiny-invariant-bHgPayXn.js";import"./index-zRqVZh6A.js";const y={title:"math-input/components/Tab Bar",component:n};function l(e){const[p,c]=r.useState("Numbers");return r.createElement(n,{...e,selectedItem:p,onSelectItem:o=>{e.onSelectItem(o),c(o)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>r.createElement(l,{...e})};var s,m,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(a=(m=t.parameters)==null?void 0:m.docs)==null?void 0:a.source}}};const x=["Demo"];export{t as Demo,x as __namedExportsOrder,y as default};
