import{cL as s,j as B}from"./iframe-rTh-qpeb.js";import{S as F}from"./server-item-renderer-with-debug-ui-DHswwy1J.js";import{a as u,c as G,S as H,b as J,m as K,d as U,e as V}from"./radio.testdata-Bgd99Ljq.js";import"./server-item-renderer-CMOhgjPp.js";import"./hints-renderer-Ced41RaC.js";import"./main-DIwaG8I8.js";import"./test-keypad-context-wrapper-CLvMSEDZ.js";import"./Popper-BPNXaN-S.js";const ie={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:s({question:u})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>B.jsx(F,{item:X(e),apiOptions:Y(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},X=e=>{const g={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[k,z]of Object.entries(e.item.question.widgets))g.question.widgets[k]={...z,static:e.static};return g},Y=e=>({flags:{"new-radio-widget":!0}}),t={args:{item:s({question:u})}},r={args:{item:s({question:G})}},o={args:{item:s({question:H})}},n={args:{item:s({question:J})}},i={args:{item:s({question:K})}},a={args:{item:s({question:U})}},c={args:{item:s({question:V})}},l={args:{item:s({question:u}),startAnswerless:!0}},m={args:{item:s({question:U}),startAnswerless:!0}};var p,S,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(d=(S=t.parameters)==null?void 0:S.docs)==null?void 0:d.source}}};var w,h,q;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(q=(h=r.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var I,f,A;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(A=(f=o.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var W,C,P;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(P=(C=n.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var O,T,M;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(M=(T=i.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var v,Q,x;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(x=(Q=a.parameters)==null?void 0:Q.docs)==null?void 0:x.source}}};var y,b,j;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(j=(b=c.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var _,E,R;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(R=(E=l.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var D,L,N;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(N=(L=m.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};const ae=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{m as AnswerlessMultiSelect,l as AnswerlessSingleSelect,a as MultiSelect,i as MultiSelectSimple,c as MultiSelectWithScroll,r as SelectWithImages,o as SelectWithImagesAndScroll,t as SingleSelect,n as SingleSelectWithScroll,ae as __namedExportsOrder,ie as default};
