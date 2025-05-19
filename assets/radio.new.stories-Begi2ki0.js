import{j as N}from"./jsx-runtime-BT65X5dW.js";import"./index-default-BcKQpA1a.js";import{g as t}from"./index-BUODOpkA.js";import{S as U}from"./server-item-renderer-with-debug-ui-BlBrTCdU.js";import{a as c,c as k,S as z,m as B,b as R,d as F}from"./radio.testdata-BEmXme6V.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-B7dHvlFm.js";import"./no-important-DlFk8a1I.js";import"./index-CMC37hoy.js";import"./index-B1Gws05u.js";import"./index-Ds5N5m2R.js";import"./free-response-vbfqv37w.js";import"./index-xphSTE5M.js";import"./index-D119TXlg.js";import"./index-DE1Lf0hK.js";import"./index-Cif-W75O.js";import"./warning-circle-BLJ1dLdU.js";import"./i18n-context-BT3CWGFO.js";import"./renderer-b3AqMvui.js";import"./perseus-error-CSETqePQ.js";import"./util-CGP9vJ11.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./index-CrGd2QqM.js";import"./index-BzwLglMS.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./svg-image-DOhLqCKs.js";import"./index-D1T7ADRD.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-DFYLNfT-.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./lint-D0FI20JF.js";import"./split-view-197QHFlq.js";import"./index-B8XopcQ6.js";import"./test-keypad-context-wrapper-QfhL0rdh.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-DVn9l6wp.js";import"./index-3H81sEQ1.js";import"./assertThisInitialized-B_E71Lmv.js";import"./tabbar-FOReZWMi.js";import"./item-D-gx1NxB.js";import"./button-assets-7kLRbTB4.js";import"./keypad-button-DqzXxUFQ.js";import"./operators-page-8E7mDx3D.js";import"./navigation-pad-BQuDuwE2.js";import"./prop-types-DII6u8qS.js";import"./key-translator-Cd2BJekA.js";import"./split-perseus-item-C904ooUd.js";import"./server-item-renderer-ByOfquMN.js";import"./hints-renderer-CsFkD0Ju.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-BxdNNkR2.js";import"./all-widgets-b4bMp_2g.js";import"./index-k-zaz638.js";import"./index-CfV-e7Bp.js";import"./Popper-Bj3TCzZA.js";import"./math-input-DitpJy60.js";import"./index-DDt0cNu_.js";import"./simple-keypad-input-CI48E-cK.js";import"./input-with-examples-DKOrTdj6.js";import"./text-input-BJNOW--X.js";import"./base-radio-2gveBxyV.js";import"./choice-DyubyUTn.js";import"./index-DxGu-VKt.js";import"./icon-BfyZ3piz.js";import"./choice-icon-C95VN2vK.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-DKp0foLs.js";import"./choice-none-above-psWYU1Rq.js";import"./phet-simulation-p4Ww9v2-.js";import"./index-D4yPF4AR.js";import"./answer-choices-BtOPuLms.js";import"./index-C1P1rqGb.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./index-pboxztk9.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-Bk8LRa7W.js";import"./range-input-BOdz6A6W.js";import"./marker-DdChLnSi.js";import"./answer-pill-gHuYs82h.js";import"./sortable-D_X6vPhS.js";import"./video-transcript-link-CrOd0mXS.js";const Dt={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:t({question:c})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>N.jsx(U,{item:G(e),apiOptions:H(e),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},G=e=>{const l={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[D,L]of Object.entries(e.item.question.widgets))l.question.widgets[D]={...L,static:e.static};return l},H=e=>({crossOutEnabled:e.crossOutEnabled,flags:{"new-radio-widget":!0}}),r={args:{item:t({question:c})}},o={args:{item:t({question:k})}},s={args:{item:t({question:z})}},i={args:{item:t({question:B})}},m={args:{item:t({question:R})}},n={args:{item:t({question:F})}},p={args:{item:t({question:c}),startAnswerless:!0}},a={args:{item:t({question:R}),startAnswerless:!0}};var u,g,d;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(d=(g=r.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var S,w,h;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(h=(w=o.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var q,f,I;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(I=(f=s.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};var O,A,P;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(P=(A=i.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var W,C,M;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(M=(C=m.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var T,v,b;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var Q,x,y;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(y=(x=p.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var E,j,_;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(_=(j=a.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};const Lt=["SingleSelect","SelectWithImages","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{a as AnswerlessMultiSelect,p as AnswerlessSingleSelect,m as MultiSelect,i as MultiSelectSimple,n as MultiSelectWithScroll,o as SelectWithImages,r as SingleSelect,s as SingleSelectWithScroll,Lt as __namedExportsOrder,Dt as default};
