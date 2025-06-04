import{cK as i}from"./iframe-CTGSzrNH.js";import{S as u}from"./server-item-renderer-with-debug-ui-84Y0VH5d.js";import"./split-view-Cx_VHRoh.js";import"./test-keypad-context-wrapper-JC9CqDkh.js";import"./server-item-renderer-5SrB5Xy-.js";import"./hints-renderer-DPlBwx24.js";function p(c={}){return{...{content:`The answer is 42
[[☃ table 1]]`,widgets:{"table 1":{type:"table",options:{headers:["Column 1","Column 2"],rows:2,columns:2,answers:[["42","42"],["42","42"]]}}},images:{}},...c}}const I={title:"Perseus/Widgets/Table",component:u},l=i({question:p()}),e={args:{item:l}},s={args:{item:l,startAnswerless:!0}};var r,t,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: tableItem
  }
}`,...(a=(t=e.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};var n,o,m;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    item: tableItem,
    startAnswerless: true
  }
}`,...(m=(o=s.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};const S=["AnswerfulTable","AnswerlessTable"];export{e as AnswerfulTable,s as AnswerlessTable,S as __namedExportsOrder,I as default};
