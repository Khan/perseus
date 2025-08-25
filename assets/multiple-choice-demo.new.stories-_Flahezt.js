import{aJ as e,j as L}from"./iframe-3hb076BO.js";import{S as d}from"./server-item-renderer-with-debug-ui-BAGSCWon.js";import{q as p,c as V,S as X,a as Y,m as Z,b as F,d as $,o as ee}from"./radio.testdata-BHusjmhp.js";import"./server-item-renderer-BIEks0VV.js";import"./hints-renderer-CoakVpcE.js";import"./main-7jUvGmI4.js";import"./test-keypad-context-wrapper-NgPm3hDZ.js";import"./Popper-BmY6TTDj.js";import"./radio-question-builder-CVptyQHR.js";const pe={title:"Widgets/RadioNew/Widget Demo",component:d,tags:["!autodocs"],parameters:{docs:{description:{component:"A new version of the radio widget that allows users to select a single option from a list of choices,                    with improved accessibility and interface features."}}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:e({question:p})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:t=>L.jsx(d,{item:te(t),apiOptions:se(),reviewMode:t.reviewMode,showSolutions:t.showSolutions,startAnswerless:t.startAnswerless})},te=t=>{const g={...t.item,question:{...t.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[H,K]of Object.entries(t.item.question.widgets))g.question.widgets[H]={...K,static:t.static};return g},se=t=>({flags:{"new-radio-widget":!0}}),s={args:{item:e({question:p})}},r={args:{item:e({question:V})}},o={args:{item:e({question:X})}},n={args:{item:e({question:Y})}},i={args:{item:e({question:Z})}},a={args:{item:e({question:F})}},c={args:{item:e({question:$})}},l={args:{item:e({question:ee})}},m={args:{item:e({question:p}),startAnswerless:!0}},u={args:{item:e({question:F}),startAnswerless:!0}};var S,w,h;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(h=(w=s.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var q,I,f;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(f=(I=r.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};var A,C,W;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(W=(C=o.parameters)==null?void 0:C.docs)==null?void 0:W.source}}};var v,P,T;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(T=(P=n.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var M,O,G;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(G=(O=i.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var Q,y,b;a.parameters={...a.parameters,docs:{...(Q=a.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(b=(y=a.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var x,j,_;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(_=(j=c.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var D,R,E;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: overflowContentInGradedGroupSet
    })
  }
}`,...(E=(R=l.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var J,N,U;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(U=(N=m.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var k,z,B;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(B=(z=u.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};const ge=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","ScrollingInGradedGroupSet","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{u as AnswerlessMultiSelect,m as AnswerlessSingleSelect,a as MultiSelect,i as MultiSelectSimple,c as MultiSelectWithScroll,l as ScrollingInGradedGroupSet,r as SelectWithImages,o as SelectWithImagesAndScroll,s as SingleSelect,n as SingleSelectWithScroll,ge as __namedExportsOrder,pe as default};
