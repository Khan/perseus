import{aJ as e,j as Z}from"./iframe-BA954KEO.js";import{S}from"./server-item-renderer-with-debug-ui-BwYeq4FN.js";import{g as $}from"./graded-group.testdata-cmTFTujG.js";import{q as d,c as ee,S as te,a as se,m as re,b as V,d as oe,o as ne}from"./radio.testdata-BHusjmhp.js";import"./server-item-renderer-Q5okag7a.js";import"./hints-renderer-0xl2XLV0.js";import"./main-BEYsGJwa.js";import"./test-keypad-context-wrapper-DJJAGbkk.js";import"./Popper-DNRse8BZ.js";import"./radio-question-builder-CVptyQHR.js";const qe={title:"Widgets/RadioNew/Widget Demo",component:S,tags:["!autodocs"],parameters:{docs:{description:{component:"A new version of the radio widget that allows users to select a single option from a list of choices,                    with improved accessibility and interface features."}}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:e({question:d})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:t=>Z.jsx(S,{item:ie(t),apiOptions:ae(),reviewMode:t.reviewMode,showSolutions:t.showSolutions,startAnswerless:t.startAnswerless})},ie=t=>{const g={...t.item,question:{...t.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[X,Y]of Object.entries(t.item.question.widgets))g.question.widgets[X]={...Y,static:t.static};return g},ae=t=>({flags:{"new-radio-widget":!0}}),s={args:{item:e({question:d})}},r={args:{item:e({question:ee})}},o={args:{item:e({question:te})}},n={args:{item:e({question:se})}},i={args:{item:e({question:re})}},a={args:{item:e({question:V})}},c={args:{item:e({question:oe})}},m={args:{item:e({question:ne})}},l={args:{item:e({question:$})}},u={args:{item:e({question:d}),startAnswerless:!0}},p={args:{item:e({question:V}),startAnswerless:!0}};var w,h,q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(q=(h=s.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var I,f,W;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(W=(f=r.parameters)==null?void 0:f.docs)==null?void 0:W.source}}};var A,C,P;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(P=(C=o.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var v,T,G;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(G=(T=n.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var M,O,Q;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(Q=(O=i.parameters)==null?void 0:O.docs)==null?void 0:Q.source}}};var R,y,b;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(_=(j=c.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var D,E,J;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: overflowContentInGradedGroupSet
    })
  }
}`,...(J=(E=m.parameters)==null?void 0:E.docs)==null?void 0:J.source}}};var N,U,k;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: groupedRadioRationaleQuestion
    })
  }
}`,...(k=(U=l.parameters)==null?void 0:U.docs)==null?void 0:k.source}}};var z,B,F;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(F=(B=u.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var H,K,L;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(L=(K=p.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};const Ie=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","GradedGroupSetWithScroll","GradedGroup","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{p as AnswerlessMultiSelect,u as AnswerlessSingleSelect,l as GradedGroup,m as GradedGroupSetWithScroll,a as MultiSelect,i as MultiSelectSimple,c as MultiSelectWithScroll,r as SelectWithImages,o as SelectWithImagesAndScroll,s as SingleSelect,n as SingleSelectWithScroll,Ie as __namedExportsOrder,qe as default};
