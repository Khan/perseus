import{j as o,r as h,Q as T}from"./iframe-B9L61ZNL.js";const v={title:"Components/Button Group"},m=n=>{const[l,d]=h.useState(null);return o.jsx(T,{buttons:n.buttons,value:l,onChange:p=>{d(p)}})},t=n=>o.jsx(m,{buttons:[{value:"One",content:"Item #1"},{value:"Two",content:"Item #2"},{value:"Three",content:"Item #3"}]}),e=n=>o.jsx(m,{buttons:[{value:"One",content:"Item #1",title:"The first item"},{value:"Two",content:"Item #2",title:"The second item"},{value:"Three",content:"Item #3",title:"The third item"}]});t.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithNoTitles"};e.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithTitles"};var s,r,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(r=t.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var u,i,c;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const g=["ButtonsWithNoTitles","ButtonsWithTitles"];export{t as ButtonsWithNoTitles,e as ButtonsWithTitles,g as __namedExportsOrder,v as default};
