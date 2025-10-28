import{aB as m}from"./iframe-Drd1SmRq.js";import{t as p}from"./modes-unQmZwy9.js";import{S as d}from"./server-item-renderer-with-debug-ui-BWwKiLHX.js";import{q as c,w as u}from"./explanation.testdata-BnB2FqC9.js";import"./server-item-renderer-DSCwYT3W.js";import"./hints-renderer-nULHa8p5.js";import"./main-F-7RzE_d.js";import"./test-keypad-context-wrapper-iC1DAP1t.js";import"./Popper-Ci4RRPxU.js";const T={title:"Widgets/Explanation/Visual Regression Tests/Initial State",component:d,tags:["!dev"],parameters:{docs:{description:{component:"Regression tests for the Explanation widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page."}},chromatic:{disableSnapshot:!1,modes:p}}},e={args:{item:m({question:c})}},t={args:{item:m({question:u})}};var s,o,r;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};var a,n,i;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: wideButton
    })
  }
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const x=["Question1","WideButton"];export{e as Question1,t as WideButton,x as __namedExportsOrder,T as default};
