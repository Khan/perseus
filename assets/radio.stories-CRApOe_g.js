import{j as E}from"./jsx-runtime-BT65X5dW.js";import"./underscore-U-AHniOr.js";import{g as e}from"./index-BGZPTKJ1.js";import{S as Q}from"./server-item-renderer-with-debug-ui-CxpHg1rn.js";import{a as n,c as j,m as v,b as x}from"./radio.testdata-BxskjDkr.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./extends-DDykod_l.js";import"./no-important-DlFk8a1I.js";import"./index-CazpBUXm.js";import"./index-B1Gws05u.js";import"./index-CW2s7ekB.js";import"./index-Ds5N5m2R.js";import"./index-DOvxIgPk.js";import"./split-view-C75H4AdG.js";import"./index-DAJiRA_A.js";import"./index-Bdux6mmb.js";import"./test-keypad-context-wrapper-BtZTAi4B.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-DFrgxEQk.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-DIFuz7Pv.js";import"./tabbar-MpFAbKP0.js";import"./item-bIeXIAjZ.js";import"./button-assets-Co79gGh-.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-Ckeya4lx.js";import"./operators-page-DCxIUjpq.js";import"./navigation-pad-D67yemnZ.js";import"./prop-types-DPSiQdhc.js";import"./key-translator-D1CXf9G3.js";import"./index-CrGd2QqM.js";import"./split-perseus-item-CzYR4eV1.js";import"./util-BZVT15oW.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./server-item-renderer-DbGjM8D_.js";import"./renderer-BQnqw_bS.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-3AkWzTTj.js";import"./svg-image-CiYXMMWe.js";import"./index-DEiJo70o.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-Ty_QvlNi.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./lint-D0FI20JF.js";import"./hints-renderer-BZ-4Zvd5.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-Ck8nQiEy.js";import"./all-widgets-CG5w6-WI.js";import"./index-DqS3kFds.js";import"./index-ByoCYR4k.js";import"./index-DfoJsr3g.js";import"./index-CUPgSPQO.js";import"./Popper-Bj3TCzZA.js";import"./math-input-Cvkg7A_0.js";import"./index-KG0hCCNB.js";import"./simple-keypad-input-B5FHAE1F.js";import"./input-with-examples-D6CBGvUU.js";import"./text-input-Dvur2sgY.js";import"./index-CU62RnlP.js";import"./base-radio-BstglnyH.js";import"./choice-C1fKyBL7.js";import"./index-CWnBGvvR.js";import"./icon-BfyZ3piz.js";import"./choice-icon-CV0CEgs0.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CqSyvrjW.js";import"./choice-none-above-OZK8HsZt.js";import"./phet-simulation-CrX_59te.js";import"./index-Ck9WKKww.js";import"./answer-choices-CWdHy9nd.js";import"./index-BDp5rntB.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./index-3tXmpMZ8.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-N6NlG4cu.js";import"./range-input-CQQdELOs.js";import"./marker-520oT_Eq.js";import"./answer-pill-2tCnwxTo.js";import"./sortable-T7pPQHk4.js";import"./video-transcript-link-BsyCgIOs.js";const Oe={title:"Perseus/Widgets/Radio",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:e({question:n})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:t=>E.jsx(Q,{item:R(t),apiOptions:_(t),reviewMode:t.reviewMode,showSolutions:t.showSolutions,startAnswerless:t.startAnswerless})},R=t=>{const a={...t.item,question:{...t.item.question,widgets:{}}};for(const[y,C]of Object.entries(t.item.question.widgets))a.question.widgets[y]={...C,static:t.static};return a},_=t=>({crossOutEnabled:t.crossOutEnabled}),r={args:{item:e({question:n})}},o={args:{item:e({question:j})}},s={args:{item:e({question:v})}},i={args:{item:e({question:x})}},m={args:{item:e({question:n}),startAnswerless:!0}},p={args:{item:e({question:x}),startAnswerless:!0}};var c,u,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
