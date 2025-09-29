import{aJ as s,j as O}from"./iframe-BRRXc9Qf.js";import{S as u}from"./server-item-renderer-with-debug-ui-CY5AJYNo.js";import{q as c,a as b,m as R,d as C}from"./radio.testdata-C_cN_ddT.js";import"./server-item-renderer-sVF9rCGW.js";import"./hints-renderer-CBS4qmP1.js";import"./main-BWbTXVvO.js";import"./test-keypad-context-wrapper-BuAtX6Oe.js";import"./Popper-C374ZHB_.js";import"./radio-question-builder-Dx1IeYvx.js";const K={title:"Widgets/Radio",component:u,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to select a single option from a list of choices,                    supporting multiple-choice questions with text and image content."}}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:s({question:c})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>O.jsx(u,{item:_(e),apiOptions:E(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless})},_=e=>{const m={...e.item,question:{...e.item.question,widgets:{}}};for(const[Q,j]of Object.entries(e.item.question.widgets))m.question.widgets[Q]={...j,static:e.static};return m},E=e=>({}),t={args:{item:s({question:c})}},r={args:{item:s({question:b})}},o={args:{item:s({question:R})}},i={args:{item:s({question:C})}},n={args:{item:s({question:c}),startAnswerless:!0}},a={args:{item:s({question:C}),startAnswerless:!0}};var l,p,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var d,S,w;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var h,q,I;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(I=(q=o.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var A,f,P;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(P=(f=i.parameters)==null?void 0:f.docs)==null?void 0:P.source}}};var M,W,T;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(T=(W=n.parameters)==null?void 0:W.docs)==null?void 0:T.source}}};var x,v,y;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(y=(v=a.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const L=["SingleSelect","SelectWithImages","MultiSelectSimple","MultiSelect","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{a as AnswerlessMultiSelect,n as AnswerlessSingleSelect,i as MultiSelect,o as MultiSelectSimple,r as SelectWithImages,t as SingleSelect,L as __namedExportsOrder,K as default};
