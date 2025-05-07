import{j as E}from"./jsx-runtime-BT65X5dW.js";import"./underscore-U-AHniOr.js";import{g as e}from"./index-BWagKz4k.js";import{S as Q}from"./server-item-renderer-with-debug-ui-B7jnPHh2.js";import{a as n,c as j,m as v,b as x}from"./radio.testdata-BxskjDkr.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./extends-DDykod_l.js";import"./no-important-DlFk8a1I.js";import"./index-CazpBUXm.js";import"./index-B1Gws05u.js";import"./index-CW2s7ekB.js";import"./index-Ds5N5m2R.js";import"./index-DOvxIgPk.js";import"./split-view-C75H4AdG.js";import"./index-DAJiRA_A.js";import"./index-Bdux6mmb.js";import"./test-keypad-context-wrapper-BPBv492P.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-CHRzDf3x.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-DIFuz7Pv.js";import"./tabbar-MpFAbKP0.js";import"./item-bIeXIAjZ.js";import"./button-assets-DzVnr2CQ.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-BKQrjn02.js";import"./operators-page-B6xXwJ9R.js";import"./navigation-pad-DXwsZi5_.js";import"./prop-types-DMHcqbnf.js";import"./key-translator-BRQ7LI7C.js";import"./index-CrGd2QqM.js";import"./split-perseus-item-DbwQ1xHE.js";import"./util-2bFi3N3g.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./server-item-renderer-B5HgCHn9.js";import"./renderer-CDMpjcHH.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-3AkWzTTj.js";import"./svg-image-ywfOpLF6.js";import"./index-DEiJo70o.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-Ty_QvlNi.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./lint-D0FI20JF.js";import"./hints-renderer-BFnEHlSw.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-DCA3L6OM.js";import"./all-widgets-C1Wi8nVq.js";import"./index-DqS3kFds.js";import"./index-ByoCYR4k.js";import"./index-DfoJsr3g.js";import"./index-CUPgSPQO.js";import"./Popper-Bj3TCzZA.js";import"./math-input-DB2MX6eh.js";import"./index-KG0hCCNB.js";import"./simple-keypad-input-B68QIuHr.js";import"./input-with-examples-Dx1hfyEE.js";import"./text-input-By3UgNXT.js";import"./index-CU62RnlP.js";import"./base-radio-CT7cpDvl.js";import"./choice-C1fKyBL7.js";import"./index-CWnBGvvR.js";import"./icon-BfyZ3piz.js";import"./choice-icon-CV0CEgs0.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CqSyvrjW.js";import"./choice-none-above-gZSIRPXr.js";import"./phet-simulation-CrX_59te.js";import"./index-Ck9WKKww.js";import"./answer-choices-BqW-lyA6.js";import"./index-BDp5rntB.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./index-3tXmpMZ8.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-Dh208Jd4.js";import"./range-input-DCt_VlY_.js";import"./marker-D3ythF61.js";import"./answer-pill-DhBoGlEF.js";import"./sortable-BGfk7U0z.js";import"./video-transcript-link-BsyCgIOs.js";const Oe={title:"Perseus/Widgets/Radio",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:e({question:n})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:t=>E.jsx(Q,{item:R(t),apiOptions:_(t),reviewMode:t.reviewMode,showSolutions:t.showSolutions,startAnswerless:t.startAnswerless})},R=t=>{const a={...t.item,question:{...t.item.question,widgets:{}}};for(const[y,C]of Object.entries(t.item.question.widgets))a.question.widgets[y]={...C,static:t.static};return a},_=t=>({crossOutEnabled:t.crossOutEnabled}),r={args:{item:e({question:n})}},o={args:{item:e({question:j})}},s={args:{item:e({question:v})}},i={args:{item:e({question:x})}},m={args:{item:e({question:n}),startAnswerless:!0}},p={args:{item:e({question:x}),startAnswerless:!0}};var c,u,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(l=(u=r.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var d,g,S;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(S=(g=o.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var w,q,h;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(h=(q=s.parameters)==null?void 0:q.docs)==null?void 0:h.source}}};var I,A,f;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(f=(A=i.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var P,M,W;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(W=(M=m.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var T,b,O;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(O=(b=p.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const xe=["SingleSelect","SelectWithImages","MultiSelectSimple","MultiSelect","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{p as AnswerlessMultiSelect,m as AnswerlessSingleSelect,i as MultiSelect,s as MultiSelectSimple,o as SelectWithImages,r as SingleSelect,xe as __namedExportsOrder,Oe as default};
