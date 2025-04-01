import{r}from"./index-C6mWTJJr.js";import{T as n}from"./tabbar-B0Mnsvv7.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./item-73m9Uma6.js";import"./index-DN4d7MfU.js";import"./tiny-invariant-CopsF_GD.js";import"./index-C9RM_t1w.js";const y={title:"math-input/components/Tab Bar",component:n};function l(e){const[p,c]=r.useState("Numbers");return r.createElement(n,{...e,selectedItem:p,onSelectItem:o=>{e.onSelectItem(o),c(o)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>r.createElement(l,{...e})};var s,m,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
