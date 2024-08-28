import{j as o}from"./jsx-runtime-FVsy8kgq.js";import{r as T}from"./index-TT1qJ6UJ.js";import{M as h}from"./multi-button-group-a0iIfrwx.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./index-7vsPyIck.js";const w={title:"Perseus/Components/Muli-Button Group",args:{allowEmpty:!0}},l=t=>{const[c,p]=T.useState(null);return o(h,{...t,values:c,onChange:d=>{p(d)}})},e=t=>o(l,{...t,buttons:[{value:"One",content:"Item #1"},{value:"Two",content:"Item #2"},{value:"Three",content:"Item #3"}]}),n=t=>o(l,{...t,buttons:[{value:"One",content:"Item #1",title:"The first item"},{value:"Two",content:"Item #2",title:"The second item"},{value:"Three",content:"Item #3",title:"The third item"}]});e.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithNoTitles",props:{allowEmpty:{required:!0,tsType:{name:"boolean"},description:""}}};n.__docgenInfo={description:"",methods:[],displayName:"ButtonsWithTitles",props:{allowEmpty:{required:!0,tsType:{name:"boolean"},description:""}}};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var u,i,m;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(m=(i=n.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const E=["ButtonsWithNoTitles","ButtonsWithTitles"];export{e as ButtonsWithNoTitles,n as ButtonsWithTitles,E as __namedExportsOrder,w as default};
