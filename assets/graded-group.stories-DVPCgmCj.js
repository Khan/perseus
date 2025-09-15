import{aH as m}from"./iframe-Dxi_7cS6.js";import{S as p}from"./server-item-renderer-with-debug-ui-BYFpZMSq.js";import{q as d,g as u}from"./graded-group.testdata-cmTFTujG.js";import"./server-item-renderer-DJVITHBn.js";import"./hints-renderer-K-yvR1ip.js";import"./main-B1TmmNMq.js";import"./test-keypad-context-wrapper-BdQFnF8e.js";import"./Popper-Czy8iEXb.js";const I={title:"Widgets/Graded Group",component:p,tags:["!dev"],parameters:{docs:{description:{component:"A widget that combines multiple questions into a single group with shared feedback and grading,                    allowing for complex problem-solving scenarios with multiple parts."}}}},e={args:{item:m({question:d})}},t={args:{item:m({question:u})}};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: question1
    })
  }
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var a,i,n;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: groupedRadioRationaleQuestion
    })
  }
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const b=["Question1","WithRadioWidget"];export{e as Question1,t as WithRadioWidget,b as __namedExportsOrder,I as default};
