import{r as n}from"./index-6oxdNXpR.js";import{B as h}from"./button-group-f5V3tSn8.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./no-important-xCWWYXQR.js";const g={title:"Perseus/Components/Button Group"},m=o=>{const[l,p]=n.useState(null);return n.createElement(h,{buttons:o.buttons,value:l,onChange:d=>{p(d)}})},t=o=>n.createElement(m,{buttons:[{value:"One",content:"Item #1"},{value:"Two",content:"Item #2"},{value:"Three",content:"Item #3"}]}),e=o=>n.createElement(m,{buttons:[{value:"One",content:"Item #1",title:"The first item"},{value:"Two",content:"Item #2",title:"The second item"},{value:"Three",content:"Item #3",title:"The third item"}]});t.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithNoTitles"};e.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithTitles"};var r,s,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var u,c,i;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const b=["ButtonsWithNoTitles","ButtonsWithTitles"];export{t as ButtonsWithNoTitles,e as ButtonsWithTitles,b as __namedExportsOrder,g as default};
