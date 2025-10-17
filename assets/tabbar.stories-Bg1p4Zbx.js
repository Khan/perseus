import{T as n,j as m,r as l}from"./iframe-DQbDbjVf.js";const i={title:"Math Input/Components/Tab Bar",tags:["!dev"],component:n};function u(e){const[c,p]=l.useState("Numbers");return m.jsx(n,{...e,selectedItem:c,onSelectItem:r=>{e.onSelectItem(r),p(r)}})}const t={argTypes:{selectedItem:{options:["Numbers","Geometry","Operators"]}},args:{items:["Numbers","Geometry","Operators"]},parameters:{controls:{exclude:["items","onSelectItem","selectedItem","onClickClose"]}},render:e=>m.jsx(u,{...e})};var s,o,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(a=(o=t.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const b=["Demo"];export{t as Demo,b as __namedExportsOrder,i as default};
