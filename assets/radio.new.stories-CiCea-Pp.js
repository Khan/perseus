import{cL as e,j as oe}from"./iframe-B9Y7vzCP.js";import{S as ne}from"./server-item-renderer-with-debug-ui-CXzw0Dpy.js";import{a as p,c as ie,S as Z,b as $,m as ae,d as ee,e as se}from"./radio.testdata-C1vj3X_t.js";import"./split-view-E5QCRLdp.js";import"./test-keypad-context-wrapper-Bl9Q8Qdl.js";import"./server-item-renderer-qvZIhmuu.js";import"./hints-renderer-DMpno9jz.js";const he={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:e({question:p})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:s=>oe.jsx(ne,{item:ce(s),apiOptions:le(),reviewMode:s.reviewMode,showSolutions:s.showSolutions,startAnswerless:s.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},ce=s=>{const d={...s.item,question:{...s.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[te,re]of Object.entries(s.item.question.widgets))d.question.widgets[te]={...re,static:s.static};return d},le=s=>({flags:{"new-radio-widget":!0}}),t={args:{item:e({question:p})}},r={args:{item:e({question:ie})}},o={args:{item:e({question:Z})}},n={args:{item:e({question:$})}},i={args:{item:e({question:ae})}},a={args:{item:e({question:ee})}},c={args:{item:e({question:se})}},l={args:{item:e({question:p}),startAnswerless:!0}},m={args:{item:e({question:ee}),startAnswerless:!0}},u={args:{item:e({question:Z})}},g={args:{item:e({question:$})}},S={args:{item:e({question:se})}};var w,h,q;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(q=(h=t.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var I,f,T;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(T=(f=r.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var W,C,A;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(A=(C=o.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var P,O,M;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(M=(O=n.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var v,R,L;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(L=(R=i.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var Q,x,y;a.parameters={...a.parameters,docs:{...(Q=a.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(y=(x=a.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var b,j,_;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(_=(j=c.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var E,D,N;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(N=(D=l.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var U,k,z;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(z=(k=m.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var B,F,G;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(G=(F=u.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var H,J,K;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var V,X,Y;S.parameters={...S.parameters,docs:{...(V=S.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(Y=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const qe=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect","SelectWithImagesAndScrollRTL","SingleSelectWithScrollRTL","MultiSelectWithScrollRTL"];export{m as AnswerlessMultiSelect,l as AnswerlessSingleSelect,a as MultiSelect,i as MultiSelectSimple,c as MultiSelectWithScroll,S as MultiSelectWithScrollRTL,r as SelectWithImages,o as SelectWithImagesAndScroll,u as SelectWithImagesAndScrollRTL,t as SingleSelect,n as SingleSelectWithScroll,g as SingleSelectWithScrollRTL,qe as __namedExportsOrder,he as default};
