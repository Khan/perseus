import{j as E}from"./jsx-runtime-BT65X5dW.js";import"./index-default-BcKQpA1a.js";import{g as e}from"./index-BUODOpkA.js";import{S as Q}from"./server-item-renderer-with-debug-ui-ohhPyGF4.js";import{a as n,c as j,m as v,d as x}from"./radio.testdata-C1vj3X_t.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-B7dHvlFm.js";import"./no-important-DlFk8a1I.js";import"./index-CMC37hoy.js";import"./index-B1Gws05u.js";import"./index-Ds5N5m2R.js";import"./free-response-vbfqv37w.js";import"./index-xphSTE5M.js";import"./index-D119TXlg.js";import"./index-DE1Lf0hK.js";import"./index-Cif-W75O.js";import"./warning-circle-BLJ1dLdU.js";import"./i18n-context-BT3CWGFO.js";import"./renderer-b3AqMvui.js";import"./perseus-error-CSETqePQ.js";import"./util-CGP9vJ11.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./index-CrGd2QqM.js";import"./index-BzwLglMS.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./svg-image-DOhLqCKs.js";import"./index-D1T7ADRD.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-DFYLNfT-.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./lint-D0FI20JF.js";import"./split-view-197QHFlq.js";import"./index-B8XopcQ6.js";import"./test-keypad-context-wrapper-QfhL0rdh.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-DVn9l6wp.js";import"./index-3H81sEQ1.js";import"./assertThisInitialized-B_E71Lmv.js";import"./tabbar-FOReZWMi.js";import"./item-D-gx1NxB.js";import"./button-assets-7kLRbTB4.js";import"./keypad-button-DqzXxUFQ.js";import"./operators-page-8E7mDx3D.js";import"./navigation-pad-BQuDuwE2.js";import"./prop-types-DII6u8qS.js";import"./key-translator-Cd2BJekA.js";import"./split-perseus-item-C904ooUd.js";import"./server-item-renderer-ByOfquMN.js";import"./hints-renderer-CsFkD0Ju.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-CfiaLLRZ.js";import"./all-widgets-XSeYKN8W.js";import"./index-k-zaz638.js";import"./index-CfV-e7Bp.js";import"./Popper-Bj3TCzZA.js";import"./math-input-DitpJy60.js";import"./index-DDt0cNu_.js";import"./simple-keypad-input-CI48E-cK.js";import"./input-with-examples-DKOrTdj6.js";import"./text-input-BJNOW--X.js";import"./base-radio-2gveBxyV.js";import"./choice-DyubyUTn.js";import"./index-DxGu-VKt.js";import"./icon-BfyZ3piz.js";import"./choice-icon-C95VN2vK.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-DKp0foLs.js";import"./choice-none-above-psWYU1Rq.js";import"./phet-simulation-p4Ww9v2-.js";import"./index-D4yPF4AR.js";import"./answer-choices-BtOPuLms.js";import"./index-C1P1rqGb.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./index-pboxztk9.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-Bk8LRa7W.js";import"./range-input-BOdz6A6W.js";import"./marker-DdChLnSi.js";import"./answer-pill-gHuYs82h.js";import"./sortable-D_X6vPhS.js";import"./video-transcript-link-CrOd0mXS.js";const be={title:"Perseus/Widgets/Radio",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:e({question:n})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:t=>E.jsx(Q,{item:R(t),apiOptions:_(t),reviewMode:t.reviewMode,showSolutions:t.showSolutions,startAnswerless:t.startAnswerless})},R=t=>{const a={...t.item,question:{...t.item.question,widgets:{}}};for(const[y,C]of Object.entries(t.item.question.widgets))a.question.widgets[y]={...C,static:t.static};return a},_=t=>({crossOutEnabled:t.crossOutEnabled}),r={args:{item:e({question:n})}},o={args:{item:e({question:j})}},s={args:{item:e({question:v})}},i={args:{item:e({question:x})}},m={args:{item:e({question:n}),startAnswerless:!0}},p={args:{item:e({question:x}),startAnswerless:!0}};var c,u,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(W=(M=m.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var T,O,b;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(b=(O=p.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};const xe=["SingleSelect","SelectWithImages","MultiSelectSimple","MultiSelect","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{p as AnswerlessMultiSelect,m as AnswerlessSingleSelect,i as MultiSelect,s as MultiSelectSimple,o as SelectWithImages,r as SingleSelect,xe as __namedExportsOrder,be as default};
