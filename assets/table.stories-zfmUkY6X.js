import{cL as i}from"./iframe-B9Y7vzCP.js";import{S as u}from"./server-item-renderer-with-debug-ui-CXzw0Dpy.js";import"./split-view-E5QCRLdp.js";import"./test-keypad-context-wrapper-Bl9Q8Qdl.js";import"./server-item-renderer-qvZIhmuu.js";import"./hints-renderer-DMpno9jz.js";function p(c={}){return{...{content:`The answer is 42
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
