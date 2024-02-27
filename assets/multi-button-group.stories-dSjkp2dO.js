import{j as o}from"./jsx-runtime-BGVbfQ2Z.js";import{r as d}from"./index-qhcEwEpg.js";import{M as h}from"./multi-button-group-rHU9dGVb.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";const w={title:"Perseus/Components/Muli-Button Group",args:{allowEmpty:!0}},c=t=>{const[l,p]=d.useState(null);return o(h,{...t,values:l,onChange:T=>{p(T)}})},e=t=>o(c,{...t,buttons:[{value:"One",content:"Item #1"},{value:"Two",content:"Item #2"},{value:"Three",content:"Item #3"}]}),n=t=>o(c,{...t,buttons:[{value:"One",content:"Item #1",title:"The first item"},{value:"Two",content:"Item #2",title:"The second item"},{value:"Three",content:"Item #3",title:"The third item"}]});var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <HarnassedButtonGroup {...args} buttons={[{
    value: "One",
    content: "Item #1"
  }, {
    value: "Two",
    content: "Item #2"
  }, {
    value: "Three",
    content: "Item #3"
  }]} />;
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var u,m,i;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <HarnassedButtonGroup {...args} buttons={[{
    value: "One",
    content: "Item #1",
    title: "The first item"
  }, {
    value: "Two",
    content: "Item #2",
    title: "The second item"
  }, {
    value: "Three",
    content: "Item #3",
    title: "The third item"
  }]} />;
}`,...(i=(m=n.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};const E=["ButtonsWithNoTitles","ButtonsWithTitles"];export{e as ButtonsWithNoTitles,n as ButtonsWithTitles,E as __namedExportsOrder,w as default};
