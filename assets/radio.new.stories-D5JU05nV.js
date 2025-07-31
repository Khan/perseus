import{aI as s,j as G}from"./iframe-PTfoOlLs.js";import{S as p}from"./server-item-renderer-with-debug-ui-BYRMK9A-.js";import{q as u,c as H,S as J,a as K,m as L,b as z,d as V}from"./radio.testdata-CZiEqSW5.js";import"./server-item-renderer-dZxXIULY.js";import"./hints-renderer-Bp8123xH.js";import"./main-B-IRtUWI.js";import"./test-keypad-context-wrapper-xJGPs3BM.js";import"./Popper-aJVJ3TdR.js";const ie={title:"Widgets/RadioNew",component:p,tags:["!dev"],parameters:{docs:{description:{component:"A new version of the radio widget that allows users to select a single option from a list of choices,                    with improved accessibility and interface features."}}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:s({question:u})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>G.jsx(p,{item:X(e),apiOptions:Y(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless})},X=e=>{const g={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[B,F]of Object.entries(e.item.question.widgets))g.question.widgets[B]={...F,static:e.static};return g},Y=e=>({flags:{"new-radio-widget":!0}}),t={args:{item:s({question:u})}},r={args:{item:s({question:H})}},o={args:{item:s({question:J})}},n={args:{item:s({question:K})}},i={args:{item:s({question:L})}},a={args:{item:s({question:z})}},c={args:{item:s({question:V})}},l={args:{item:s({question:u}),startAnswerless:!0}},m={args:{item:s({question:z}),startAnswerless:!0}};var S,d,w;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(w=(d=t.parameters)==null?void 0:d.docs)==null?void 0:w.source}}};var h,q,I;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(I=(q=r.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var f,A,W;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(W=(A=o.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};var v,C,P;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(P=(C=n.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var M,O,T;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(T=(O=i.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var Q,y,b;a.parameters={...a.parameters,docs:{...(Q=a.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(D=(E=l.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var N,U,k;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(k=(U=m.parameters)==null?void 0:U.docs)==null?void 0:k.source}}};const ae=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{m as AnswerlessMultiSelect,l as AnswerlessSingleSelect,a as MultiSelect,i as MultiSelectSimple,c as MultiSelectWithScroll,r as SelectWithImages,o as SelectWithImagesAndScroll,t as SingleSelect,n as SingleSelectWithScroll,ae as __namedExportsOrder,ie as default};
