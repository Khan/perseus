import{aI as e,j as te}from"./iframe-O9iTnbIO.js";import{S as h}from"./server-item-renderer-with-debug-ui-DC0MoZEj.js";import{g as re}from"./graded-group.testdata-cmTFTujG.js";import{q as d,c as oe,a as ne,S as ae,b as ie,m as ce,d as $,e as me,o as ue}from"./radio.testdata-C_cN_ddT.js";import"./server-item-renderer-BYLxd-41.js";import"./hints-renderer-B_n3FZ3M.js";import"./main-FI3qfNpQ.js";import"./test-keypad-context-wrapper-Douk_ghO.js";import"./Popper-wL8TAtQp.js";import"./radio-question-builder-Dx1IeYvx.js";const Ce={title:"Widgets/RadioNew/Widget Demo",component:h,tags:["!autodocs"],parameters:{docs:{description:{component:"A new version of the radio widget that allows users to select a single option from a list of choices,                    with improved accessibility and interface features."}}},args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:e({question:d})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:s=>te.jsx(h,{item:le(s),apiOptions:pe(),reviewMode:s.reviewMode,showSolutions:s.showSolutions,startAnswerless:s.startAnswerless})},le=s=>{const S={...s.item,question:{...s.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[ee,se]of Object.entries(s.item.question.widgets))S.question.widgets[ee]={...se,static:s.static};return S},pe=s=>({flags:{"new-radio-widget":!0}}),t={args:{item:e({question:d})}},r={args:{item:e({question:oe})}},o={args:{item:e({question:ne})}},n={args:{item:e({question:ae})}},a={args:{item:e({question:ie})}},i={args:{item:e({question:ce})}},c={args:{item:e({question:$})}},m={args:{item:e({question:me})}},u={args:{item:e({question:ue})}},l={args:{item:e({question:re})}},p={args:{item:e({question:d}),startAnswerless:!0}},g={args:{item:e({question:$}),startAnswerless:!0}};var w,q,I;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(D=(_=c.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var E,N,U;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(U=(N=m.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var k,z,B;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: overflowContentInGradedGroupSet
    })
  }
}`,...(B=(z=u.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var F,H,J;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const Ge=["SingleSelect","SelectWithGraphie","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","GradedGroupSetWithScroll","GradedGroup","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{g as AnswerlessMultiSelect,p as AnswerlessSingleSelect,l as GradedGroup,u as GradedGroupSetWithScroll,c as MultiSelect,i as MultiSelectSimple,m as MultiSelectWithScroll,r as SelectWithGraphie,o as SelectWithImages,n as SelectWithImagesAndScroll,t as SingleSelect,a as SingleSelectWithScroll,Ge as __namedExportsOrder,Ce as default};
