import{j as o}from"./jsx-runtime-FVsy8kgq.js";import{r as h}from"./index-TT1qJ6UJ.js";import{B as T}from"./button-group-nsoLlHtM.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";const b={title:"Perseus/Components/Button Group"},c=n=>{const[l,p]=h.useState(null);return o(T,{buttons:n.buttons,value:l,onChange:d=>{p(d)}})},t=n=>o(c,{buttons:[{value:"One",content:"Item #1"},{value:"Two",content:"Item #2"},{value:"Three",content:"Item #3"}]}),e=n=>o(c,{buttons:[{value:"One",content:"Item #1",title:"The first item"},{value:"Two",content:"Item #2",title:"The second item"},{value:"Three",content:"Item #3",title:"The third item"}]});t.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithNoTitles"};e.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithTitles"};var r,s,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var u,i,m;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const _=["ButtonsWithNoTitles","ButtonsWithTitles"];export{t as ButtonsWithNoTitles,e as ButtonsWithTitles,_ as __namedExportsOrder,b as default};
