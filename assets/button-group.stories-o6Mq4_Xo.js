import{j as o}from"./jsx-runtime-BT65X5dW.js";import{r as h}from"./index-C6mWTJJr.js";import{B as T}from"./button-group-B24xCvY2.js";import"./_commonjsHelpers-BosuxZz1.js";import"./no-important-DlFk8a1I.js";const x={title:"Perseus/Components/Button Group"},c=n=>{const[l,p]=h.useState(null);return o.jsx(T,{buttons:n.buttons,value:l,onChange:d=>{p(d)}})},t=n=>o.jsx(c,{buttons:[{value:"One",content:"Item #1"},{value:"Two",content:"Item #2"},{value:"Three",content:"Item #3"}]}),e=n=>o.jsx(c,{buttons:[{value:"One",content:"Item #1",title:"The first item"},{value:"Two",content:"Item #2",title:"The second item"},{value:"Three",content:"Item #3",title:"The third item"}]});t.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithNoTitles"};e.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithTitles"};var s,r,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(r=t.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var u,i,m;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const b=["ButtonsWithNoTitles","ButtonsWithTitles"];export{t as ButtonsWithNoTitles,e as ButtonsWithTitles,b as __namedExportsOrder,x as default};
