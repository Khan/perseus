import{aI as m}from"./iframe-twR19s2R.js";import{S as p}from"./server-item-renderer-with-debug-ui-K2ybI8UR.js";import{q as d,g as u}from"./graded-group.testdata-cmTFTujG.js";import"./server-item-renderer-DEJrks84.js";import"./hints-renderer-dNA-Hqdu.js";import"./main-DwXNxWYj.js";import"./test-keypad-context-wrapper-Djay-Orm.js";import"./Popper-DAXHXale.js";const W={title:"Widgets/Graded Group",component:p,tags:["!dev"],parameters:{docs:{description:{component:"A widget that combines multiple questions into a single group with shared feedback and grading,                    allowing for complex problem-solving scenarios with multiple parts."}}}},e={args:{item:m({question:d})}},t={args:{item:m({question:u})}};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const b=["Question1","WithRadioWidget"];export{e as Question1,t as WithRadioWidget,b as __namedExportsOrder,W as default};
