import{j as E}from"./jsx-runtime-BT65X5dW.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-BDqK5cn0.js";import{g as t}from"./test-utils-gBIzEBZJ.js";import{S as Q}from"./server-item-renderer-with-debug-ui-yFGKuncD.js";import{a as n,c as j,m as v,b as x}from"./radio.testdata-C06gW6g0.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CQe11mMd.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./index-KFdEgasi.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CjnMbH_2.js";import"./index-CbNKSLRm.js";import"./index-fj4wzhGb.js";import"./index-C1fpYtXO.js";import"./index-CIHqsnLr.js";import"./index-CbIoTxL4.js";import"./all-widgets-BIjeVBLR.js";import"./prop-types-D88Aat3B.js";import"./mobile-keypad-DHry2vjf.js";import"./index-B1Gws05u.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B9jnkVVz.js";import"./tabbar-CZSBNGic.js";import"./item-BLUJCfQ8.js";import"./button-assets-B5B2nyv6.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-Cr3vNLg6.js";import"./operators-page-D7-m1Ape.js";import"./navigation-pad-BZGI0JVn.js";import"./key-translator-B8rz1_FD.js";import"./index-CrGd2QqM.js";import"./renderer-C_wlR0qd.js";import"./perseus-error-CSETqePQ.js";import"./util-CqRduJsD.js";import"./jquery-CkHB0_Mt.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-3AkWzTTj.js";import"./svg-image-DTeGfHiV.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-Ty_QvlNi.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./lint-D0FI20JF.js";import"./index-BvHsycGa.js";import"./index-Dr3BtBNU.js";import"./Popper-Bj3TCzZA.js";import"./math-input-CUXu073-.js";import"./index-BEYgOkb5.js";import"./simple-keypad-input-CgR_I_1E.js";import"./input-with-examples-DdqJMl5q.js";import"./text-input-DrWLJz8M.js";import"./index-BePo9uoZ.js";import"./base-radio-DmMpDIxh.js";import"./media-queries-D4w_O5TS.js";import"./choice-M-KeScyb.js";import"./icon-BfyZ3piz.js";import"./choice-icon-DaGBSn1O.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-gZhybWxb.js";import"./choice-none-above-Ds2rUtY9.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-ylWgoYlI.js";import"./index-DgUBVOst.js";import"./answer-choices-Dg06pe6A.js";import"./index-GAWk9lgC.js";import"./button-group-CrIfrEdw.js";import"./index-Dd-cahjY.js";import"./hud-CP_ly967.js";import"./index-CnlhjbO_.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-DJoKKmbG.js";import"./range-input-QdjiZnBo.js";import"./marker-DQv7YY8m.js";import"./answer-pill-DMZPZMGo.js";import"./sortable-Ckfby4Jo.js";import"./video-transcript-link-C7EJC_3o.js";import"./test-keypad-context-wrapper-Cd1DCcz9.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./split-perseus-item-DPq5gkED.js";import"./server-item-renderer-DnxVsFPe.js";import"./hints-renderer-CDO5ZQIE.js";import"./split-view-ymrOLumz.js";import"./test-dependencies-BxK23p0A.js";const Wt={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:t({question:n})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>E.jsx(Q,{item:_(e),apiOptions:R(e),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},_=e=>{const a={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[y,C]of Object.entries(e.item.question.widgets))a.question.widgets[y]={...C,static:e.static};return a},R=e=>({crossOutEnabled:e.crossOutEnabled,flags:{"new-radio-widget":!0}}),r={args:{item:t({question:n})}},o={args:{item:t({question:j})}},s={args:{item:t({question:v})}},i={args:{item:t({question:x})}},m={args:{item:t({question:n}),startAnswerless:!0}},p={args:{item:t({question:x}),startAnswerless:!0}};var c,u,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(S=(g=o.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var w,h,q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(q=(h=s.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var f,I,A;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(A=(I=i.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var P,M,O;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(O=(M=m.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var T,W,b;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(b=(W=p.parameters)==null?void 0:W.docs)==null?void 0:b.source}}};const bt=["SingleSelect","SelectWithImages","MultiSelectSimple","MultiSelect","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{p as AnswerlessMultiSelect,m as AnswerlessSingleSelect,i as MultiSelect,s as MultiSelectSimple,o as SelectWithImages,r as SingleSelect,bt as __namedExportsOrder,Wt as default};
