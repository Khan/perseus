import{j as E}from"./jsx-runtime-BT65X5dW.js";import{S as Q}from"./server-item-renderer-with-debug-ui-BM8goKQe.js";import{g as e}from"./test-utils-W3RBHvdb.js";import{a as n,c as j,m as v,b as x}from"./radio.testdata-C06gW6g0.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CYrfVekP.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./index-DN4d7MfU.js";import"./tiny-invariant-CopsF_GD.js";import"./index-C9RM_t1w.js";import"./index-CbNKSLRm.js";import"./index-CQ5XbMj6.js";import"./index-CfqIx-dS.js";import"./index-CIHqsnLr.js";import"./index-B-CZbs2J.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-2eRuEUfZ.js";import"./split-perseus-item-CsFgMK-K.js";import"./util-CfzqFt4k.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./all-widgets-mRp0dq-A.js";import"./prop-types-DU6aMTXt.js";import"./mobile-keypad-DFoeLE4Y.js";import"./index-B1Gws05u.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B9jnkVVz.js";import"./tabbar-BmTZy4vx.js";import"./item-DEo0REHz.js";import"./button-assets-qUGjw7KS.js";import"./keypad-button-D1iDSTcu.js";import"./operators-page-C0OAgvtK.js";import"./navigation-pad-Bc2f4g4G.js";import"./key-translator-CtlI53Cl.js";import"./index-CrGd2QqM.js";import"./renderer-DnhW87FU.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-3AkWzTTj.js";import"./svg-image-9gRPvOod.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-Ty_QvlNi.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./lint-D0FI20JF.js";import"./index-LbDnW-cL.js";import"./index-gKND8Itv.js";import"./Popper-Bj3TCzZA.js";import"./math-input-Cx3Nq8BR.js";import"./index-CCUx4bp6.js";import"./simple-keypad-input-1R0khRCc.js";import"./input-with-examples-WnHorsOL.js";import"./text-input-sKoOaXZH.js";import"./index-CieYLtDP.js";import"./base-radio-Lq31BfxU.js";import"./media-queries-D4w_O5TS.js";import"./choice-D9-CDHmz.js";import"./icon-BfyZ3piz.js";import"./choice-icon-vWqj_I_B.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CibXZAsW.js";import"./choice-none-above-DyvWsXxe.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-Bf9VVn_f.js";import"./index-BRgWRRgj.js";import"./answer-choices-BLw65nLN.js";import"./index-Dy7GuG9o.js";import"./button-group-CrIfrEdw.js";import"./index-Dd-cahjY.js";import"./hud-CP_ly967.js";import"./index-D75qsWGa.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-DRyiTmoO.js";import"./range-input-BRhuxdZq.js";import"./marker-BQSEMhtb.js";import"./answer-pill-B0SThEfW.js";import"./sortable-BPGVCo8B.js";import"./video-transcript-link-C0e3jsHe.js";import"./server-item-renderer-BO3c19tP.js";import"./hints-renderer-gqxYhAO9.js";import"./article-renderer-qpM876TX.js";import"./split-view-DQPsD37O.js";import"./test-dependencies-JrO89VpZ.js";import"./register-all-widgets-for-testing-DOg_fxGt.js";const Te={title:"Perseus/Widgets/Radio",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:e({question:n})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:t=>E.jsx(Q,{item:R(t),apiOptions:_(t),reviewMode:t.reviewMode,showSolutions:t.showSolutions,startAnswerless:t.startAnswerless})},R=t=>{const a={...t.item,question:{...t.item.question,widgets:{}}};for(const[y,C]of Object.entries(t.item.question.widgets))a.question.widgets[y]={...C,static:t.static};return a},_=t=>({crossOutEnabled:t.crossOutEnabled}),r={args:{item:e({question:n})}},o={args:{item:e({question:j})}},s={args:{item:e({question:v})}},i={args:{item:e({question:x})}},m={args:{item:e({question:n}),startAnswerless:!0}},p={args:{item:e({question:x}),startAnswerless:!0}};var c,u,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(O=(b=p.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const be=["SingleSelect","SelectWithImages","MultiSelectSimple","MultiSelect","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{p as AnswerlessMultiSelect,m as AnswerlessSingleSelect,i as MultiSelect,s as MultiSelectSimple,o as SelectWithImages,r as SingleSelect,be as __namedExportsOrder,Te as default};
