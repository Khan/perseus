import{j as o}from"./jsx-runtime-BGVbfQ2Z.js";import{r as d}from"./index-qhcEwEpg.js";import{B as h}from"./button-group-eBTrRsKy.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";const f={title:"Perseus/Components/Button Group"},i=n=>{const[l,p]=d.useState(null);return o(h,{buttons:n.buttons,value:l,onChange:T=>{p(T)}})},t=n=>o(i,{buttons:[{value:"One",content:"Item #1"},{value:"Two",content:"Item #2"},{value:"Three",content:"Item #3"}]}),e=n=>o(i,{buttons:[{value:"One",content:"Item #1",title:"The first item"},{value:"Two",content:"Item #2",title:"The second item"},{value:"Three",content:"Item #3",title:"The third item"}]});var r,s,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <HarnassedButtonGroup buttons={[{
    value: "One",
    content: "Item #1"
  }, {
    value: "Two",
    content: "Item #2"
  }, {
    value: "Three",
    content: "Item #3"
  }]} />;
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var u,m,c;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <HarnassedButtonGroup buttons={[{
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
}`,...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const G=["ButtonsWithNoTitles","ButtonsWithTitles"];export{t as ButtonsWithNoTitles,e as ButtonsWithTitles,G as __namedExportsOrder,f as default};
