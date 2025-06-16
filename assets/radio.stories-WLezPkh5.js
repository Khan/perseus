import{cL as s,j as v}from"./iframe-C0-lSMGx.js";import{S as O}from"./server-item-renderer-with-debug-ui-BCIzmUxA.js";import{a as c,c as b,m as R,d as C}from"./radio.testdata-CcPAYXhw.js";import"./server-item-renderer-DBHmEuGj.js";import"./hints-renderer-BhBsNahl.js";import"./main-DeFE9cWI.js";import"./test-keypad-context-wrapper-BPAQZPLE.js";import"./Popper-rOL93a94.js";const H={title:"Perseus/Widgets/Radio",args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:s({question:c})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>v.jsx(O,{item:_(e),apiOptions:E(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless})},_=e=>{const m={...e.item,question:{...e.item.question,widgets:{}}};for(const[Q,j]of Object.entries(e.item.question.widgets))m.question.widgets[Q]={...j,static:e.static};return m},E=e=>({}),t={args:{item:s({question:c})}},r={args:{item:s({question:b})}},o={args:{item:s({question:R})}},i={args:{item:s({question:C})}},n={args:{item:s({question:c}),startAnswerless:!0}},a={args:{item:s({question:C}),startAnswerless:!0}};var u,l,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var g,d,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(S=(d=r.parameters)==null?void 0:d.docs)==null?void 0:S.source}}};var w,q,h;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(h=(q=o.parameters)==null?void 0:q.docs)==null?void 0:h.source}}};var I,A,P;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(P=(A=i.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var f,M,W;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(W=(M=n.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var T,x,y;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(y=(x=a.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};const J=["SingleSelect","SelectWithImages","MultiSelectSimple","MultiSelect","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{a as AnswerlessMultiSelect,n as AnswerlessSingleSelect,i as MultiSelect,o as MultiSelectSimple,r as SelectWithImages,t as SingleSelect,J as __namedExportsOrder,H as default};
