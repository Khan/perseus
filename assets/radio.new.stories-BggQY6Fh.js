import{cL as t,j as s}from"./iframe-DTktfcfm.js";import{S as oe}from"./server-item-renderer-with-debug-ui-BUv1ZxBK.js";import{a as p,c as ie,S as $,b as ee,m as ae,d as te,e as se}from"./radio.testdata-C1vj3X_t.js";import"./split-view-EcbTNUFI.js";import"./test-keypad-context-wrapper-Ba5WW2dD.js";import"./server-item-renderer-CJUvzYwm.js";import"./hints-renderer-Dab54eyk.js";const ye={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:t({question:p})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>s.jsx(oe,{item:ce(e),apiOptions:le(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},ce=e=>{const h={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[re,ne]of Object.entries(e.item.question.widgets))h.question.widgets[re]={...ne,static:e.static};return h},le=e=>({flags:{"new-radio-widget":!0}}),r={args:{item:t({question:p})}},n={args:{item:t({question:ie})}},o={args:{item:t({question:$})}},i={args:{item:t({question:ee})}},a={args:{item:t({question:ae})}},c={args:{item:t({question:te})}},l={args:{item:t({question:se})}},u={args:{item:t({question:p}),startAnswerless:!0}},m={args:{item:t({question:te}),startAnswerless:!0}},d={args:{item:t({question:$})},decorators:[e=>(document.body.setAttribute("dir","rtl"),s.jsx("div",{style:{direction:"rtl"},children:s.jsx(e,{})}))],play:async()=>{document.body.removeAttribute("dir")}},S={args:{item:t({question:ee})},decorators:[e=>(document.body.setAttribute("dir","rtl"),s.jsx("div",{style:{direction:"rtl"},children:s.jsx(e,{})}))],play:async()=>{document.body.removeAttribute("dir")}},g={args:{item:t({question:se})},decorators:[e=>(document.body.setAttribute("dir","rtl"),s.jsx("div",{style:{direction:"rtl"},children:s.jsx(e,{})}))],play:async()=>{document.body.removeAttribute("dir")}};var y,w,q;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(q=(w=r.parameters)==null?void 0:w.docs)==null?void 0:q.source}}};var f,A,I;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(I=(A=n.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var b,v,T;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(T=(v=o.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var W,C,P;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(P=(C=i.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var O,R,M;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(M=(R=a.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var x,L,j;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(j=(L=c.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var Q,_,E;l.parameters={...l.parameters,docs:{...(Q=l.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(E=(_=l.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var D,N,U;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(U=(N=u.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var k,z,B;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(B=(z=m.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var F,G,H;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  },
  decorators: [Story => {
    // Set RTL for testing
    document.body.setAttribute("dir", "rtl");
    return <div style={{
      direction: "rtl"
    }}>
                    <Story />
                </div>;
  }],
  play: async () => {
    // Reset the direction after the story
    document.body.removeAttribute("dir");
  }
}`,...(H=(G=d.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,K,V;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  },
  decorators: [Story => {
    // Set RTL for testing
    document.body.setAttribute("dir", "rtl");
    return <div style={{
      direction: "rtl"
    }}>
                    <Story />
                </div>;
  }],
  play: async () => {
    // Reset the direction after the story
    document.body.removeAttribute("dir");
  }
}`,...(V=(K=S.parameters)==null?void 0:K.docs)==null?void 0:V.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  },
  decorators: [Story => {
    // Set RTL for testing
    document.body.setAttribute("dir", "rtl");
    return <div style={{
      direction: "rtl"
    }}>
                    <Story />
                </div>;
  }],
  play: async () => {
    // Reset the direction after the story
    document.body.removeAttribute("dir");
  }
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const we=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect","SelectWithImagesAndScrollRTL","SingleSelectWithScrollRTL","MultiSelectWithScrollRTL"];export{m as AnswerlessMultiSelect,u as AnswerlessSingleSelect,c as MultiSelect,a as MultiSelectSimple,l as MultiSelectWithScroll,g as MultiSelectWithScrollRTL,n as SelectWithImages,o as SelectWithImagesAndScroll,d as SelectWithImagesAndScrollRTL,r as SingleSelect,i as SingleSelectWithScroll,S as SingleSelectWithScrollRTL,we as __namedExportsOrder,ye as default};
