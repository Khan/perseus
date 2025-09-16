import{aI as e,j as re}from"./iframe-SVyUCcyc.js";import{g as $}from"./feature-flags-util-Vxq3J9D8.js";import{S as h}from"./server-item-renderer-with-debug-ui-C8aX9TIX.js";import{g as oe}from"./graded-group.testdata-cmTFTujG.js";import{q as d,c as ne,a as ae,S as ie,b as ce,m as me,d as ee,e as ue,o as le}from"./radio.testdata-C_cN_ddT.js";import"./server-item-renderer-Cyy55jFd.js";import"./hints-renderer-DAyRzUb7.js";import"./main-D89Y_4zK.js";import"./test-keypad-context-wrapper-WQY7LDUy.js";import"./Popper-B8pQzd5P.js";import"./radio-question-builder-Dx1IeYvx.js";const Pe={title:"Widgets/RadioNew/Widget Demo",component:h,tags:["!autodocs"],parameters:{docs:{description:{component:"A new version of the radio widget that allows users to select a single option from a list of choices,                    with improved accessibility and interface features."}}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:e({question:d})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:s=>re.jsx(h,{item:pe(s),apiOptions:ge(),reviewMode:s.reviewMode,showSolutions:s.showSolutions,startAnswerless:s.startAnswerless})},pe=s=>{const S={...s.item,question:{...s.item.question,widgets:{}},apiOptions:{flags:$({"new-radio-widget":!0})}};for(const[se,te]of Object.entries(s.item.question.widgets))S.question.widgets[se]={...te,static:s.static};return S},ge=s=>({flags:$({"new-radio-widget":!0})}),t={args:{item:e({question:d})}},r={args:{item:e({question:ne})}},o={args:{item:e({question:ae})}},n={args:{item:e({question:ie})}},a={args:{item:e({question:ce})}},i={args:{item:e({question:me})}},c={args:{item:e({question:ee})}},m={args:{item:e({question:ue})}},u={args:{item:e({question:le})}},l={args:{item:e({question:oe})}},p={args:{item:e({question:d}),startAnswerless:!0}},g={args:{item:e({question:ee}),startAnswerless:!0}};var w,q,I;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(I=(q=t.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var f,W,A;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithGraphie
    })
  }
}`,...(A=(W=r.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var C,G,P;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(P=(G=o.parameters)==null?void 0:G.docs)==null?void 0:P.source}}};var v,T,M;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(M=(T=n.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var O,Q,R;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(R=(Q=a.parameters)==null?void 0:Q.docs)==null?void 0:R.source}}};var y,b,x;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(x=(b=i.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var j,_,D;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(D=(_=c.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var E,F,N;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(N=(F=m.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var U,k,z;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: overflowContentInGradedGroupSet
    })
  }
}`,...(z=(k=u.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var B,H,J;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: groupedRadioRationaleQuestion
    })
  }
}`,...(J=(H=l.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,L,V;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(V=(L=p.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const ve=["SingleSelect","SelectWithGraphie","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","GradedGroupSetWithScroll","GradedGroup","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{g as AnswerlessMultiSelect,p as AnswerlessSingleSelect,l as GradedGroup,u as GradedGroupSetWithScroll,c as MultiSelect,i as MultiSelectSimple,m as MultiSelectWithScroll,r as SelectWithGraphie,o as SelectWithImages,n as SelectWithImagesAndScroll,t as SingleSelect,a as SingleSelectWithScroll,ve as __namedExportsOrder,Pe as default};
