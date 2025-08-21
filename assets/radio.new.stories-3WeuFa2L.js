import{aI as e,j as L}from"./iframe-CBzmwlmW.js";import{S as d}from"./server-item-renderer-with-debug-ui-B74dM4uh.js";import{q as p,c as V,S as X,a as Y,m as Z,b as H,d as $,o as ee}from"./radio.testdata-mzuH3OJc.js";import"./server-item-renderer-DZO-SYMc.js";import"./hints-renderer-CQmkUpJG.js";import"./main-Cv6ANuPn.js";import"./test-keypad-context-wrapper-D7vvyzKc.js";import"./Popper-TvX6wtwH.js";const ue={title:"Widgets/RadioNew",component:d,tags:["!dev"],parameters:{docs:{description:{component:"A new version of the radio widget that allows users to select a single option from a list of choices,                    with improved accessibility and interface features."}}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:e({question:p})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:s=>L.jsx(d,{item:se(s),apiOptions:te(),reviewMode:s.reviewMode,showSolutions:s.showSolutions,startAnswerless:s.startAnswerless})},se=s=>{const g={...s.item,question:{...s.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[J,K]of Object.entries(s.item.question.widgets))g.question.widgets[J]={...K,static:s.static};return g},te=s=>({flags:{"new-radio-widget":!0}}),t={args:{item:e({question:p})}},r={args:{item:e({question:V})}},o={args:{item:e({question:X})}},n={args:{item:e({question:Y})}},i={args:{item:e({question:Z})}},a={args:{item:e({question:H})}},c={args:{item:e({question:$})}},l={args:{item:e({question:ee})}},m={args:{item:e({question:p}),startAnswerless:!0}},u={args:{item:e({question:H}),startAnswerless:!0}};var S,w,h;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(h=(w=t.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var q,I,f;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(f=(I=r.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};var A,v,C;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(C=(v=o.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var W,P,T;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(_=(j=c.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var R,E,D;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: overflowContentInGradedGroupSet
    })
  }
}`,...(D=(E=l.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var N,U,k;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(k=(U=m.parameters)==null?void 0:U.docs)==null?void 0:k.source}}};var z,B,F;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(F=(B=u.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};const pe=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","ScrollingInGradedGroupSet","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{u as AnswerlessMultiSelect,m as AnswerlessSingleSelect,a as MultiSelect,i as MultiSelectSimple,c as MultiSelectWithScroll,l as ScrollingInGradedGroupSet,r as SelectWithImages,o as SelectWithImagesAndScroll,t as SingleSelect,n as SingleSelectWithScroll,pe as __namedExportsOrder,ue as default};
