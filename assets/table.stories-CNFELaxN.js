import{aJ as c}from"./iframe-DQbDbjVf.js";import{S as p}from"./server-item-renderer-with-debug-ui-dszKowMF.js";import"./server-item-renderer-CBm8ccyx.js";import"./hints-renderer-C6g1ZUd4.js";import"./main-CNSzcsLe.js";import"./test-keypad-context-wrapper-BBCTCcp5.js";import"./Popper-yvSGGUcz.js";function u(l={}){return{...{content:`The answer is 42
[[☃ table 1]]`,widgets:{"table 1":{type:"table",options:{headers:["Column 1","Column 2"],rows:2,columns:2,answers:[["42","42"],["42","42"]]}}},images:{}},...l}}const h={title:"Widgets/Table",component:p,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input data into a table with customizable rows and columns."}}}},i=c({question:u()}),e={args:{item:i}},t={args:{item:i,startAnswerless:!0}};var s,r,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    item: tableItem
  }
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var o,n,m;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    item: tableItem,
    startAnswerless: true
  }
}`,...(m=(n=t.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};const S=["AnswerfulTable","AnswerlessTable"];export{e as AnswerfulTable,t as AnswerlessTable,S as __namedExportsOrder,h as default};
