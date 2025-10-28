import{aB as u,j as s,t as g,A as h}from"./iframe-Drd1SmRq.js";import{S as I}from"./server-item-renderer-DSCwYT3W.js";import{n as l}from"./numeric-input-question-builder-6lxfIute.js";import"./hints-renderer-nULHa8p5.js";const R={title:"Widgets/Numeric Input/Visual Regression Tests/Initial State",component:f,tags:["!dev"],parameters:{docs:{description:{component:"Regression tests for the numeric input widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page."}},chromatic:{disableSnapshot:!1}}},e={args:{item:u({question:l().withSize("small").build()})}},t={args:{item:u({question:l().withSize("normal").build()})}};function f(c){const{item:d,rtl:p}=c,S={margin:20};return s.jsx("div",{dir:p?"rtl":"ltr",style:S,children:s.jsx(I,{item:d,apiOptions:{...h.defaults},dependencies:g})})}var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: numericInputQuestionBuilder().withSize("small").build()
    })
  }
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var a,o,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: numericInputQuestionBuilder().withSize("normal").build()
    })
  }
}`,...(m=(o=t.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};const N=["SizeSmall","SizeNormal"];export{t as SizeNormal,e as SizeSmall,N as __namedExportsOrder,R as default};
