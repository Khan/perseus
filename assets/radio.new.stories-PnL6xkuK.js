import{j as B}from"./jsx-runtime-BT65X5dW.js";import"./index-default-BcKQpA1a.js";import{g as t}from"./index-BUODOpkA.js";import{S as F}from"./server-item-renderer-with-debug-ui-ohhPyGF4.js";import{a as l,c as G,S as H,b as J,m as K,d as U,e as V}from"./radio.testdata-C1vj3X_t.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-B7dHvlFm.js";import"./no-important-DlFk8a1I.js";import"./index-CMC37hoy.js";import"./index-B1Gws05u.js";import"./index-Ds5N5m2R.js";import"./free-response-vbfqv37w.js";import"./index-xphSTE5M.js";import"./index-D119TXlg.js";import"./index-DE1Lf0hK.js";import"./index-Cif-W75O.js";import"./warning-circle-BLJ1dLdU.js";import"./i18n-context-BT3CWGFO.js";import"./renderer-b3AqMvui.js";import"./perseus-error-CSETqePQ.js";import"./util-CGP9vJ11.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./index-CrGd2QqM.js";import"./index-BzwLglMS.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./svg-image-DOhLqCKs.js";import"./index-D1T7ADRD.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-DFYLNfT-.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./lint-D0FI20JF.js";import"./split-view-197QHFlq.js";import"./index-B8XopcQ6.js";import"./test-keypad-context-wrapper-QfhL0rdh.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-DVn9l6wp.js";import"./index-3H81sEQ1.js";import"./assertThisInitialized-B_E71Lmv.js";import"./tabbar-FOReZWMi.js";import"./item-D-gx1NxB.js";import"./button-assets-7kLRbTB4.js";import"./keypad-button-DqzXxUFQ.js";import"./operators-page-8E7mDx3D.js";import"./navigation-pad-BQuDuwE2.js";import"./prop-types-DII6u8qS.js";import"./key-translator-Cd2BJekA.js";import"./split-perseus-item-C904ooUd.js";import"./server-item-renderer-ByOfquMN.js";import"./hints-renderer-CsFkD0Ju.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-CfiaLLRZ.js";import"./all-widgets-XSeYKN8W.js";import"./index-k-zaz638.js";import"./index-CfV-e7Bp.js";import"./Popper-Bj3TCzZA.js";import"./math-input-DitpJy60.js";import"./index-DDt0cNu_.js";import"./simple-keypad-input-CI48E-cK.js";import"./input-with-examples-DKOrTdj6.js";import"./text-input-BJNOW--X.js";import"./base-radio-2gveBxyV.js";import"./choice-DyubyUTn.js";import"./index-DxGu-VKt.js";import"./icon-BfyZ3piz.js";import"./choice-icon-C95VN2vK.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-DKp0foLs.js";import"./choice-none-above-psWYU1Rq.js";import"./phet-simulation-p4Ww9v2-.js";import"./index-D4yPF4AR.js";import"./answer-choices-BtOPuLms.js";import"./index-C1P1rqGb.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./index-pboxztk9.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-Bk8LRa7W.js";import"./range-input-BOdz6A6W.js";import"./marker-DdChLnSi.js";import"./answer-pill-gHuYs82h.js";import"./sortable-D_X6vPhS.js";import"./video-transcript-link-CrOd0mXS.js";const zt={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:t({question:l})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>B.jsx(F,{item:X(e),apiOptions:Y(e),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},X=e=>{const u={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[k,z]of Object.entries(e.item.question.widgets))u.question.widgets[k]={...z,static:e.static};return u},Y=e=>({crossOutEnabled:e.crossOutEnabled,flags:{"new-radio-widget":!0}}),r={args:{item:t({question:l})}},s={args:{item:t({question:G})}},o={args:{item:t({question:H})}},i={args:{item:t({question:J})}},m={args:{item:t({question:K})}},n={args:{item:t({question:U})}},a={args:{item:t({question:V})}},p={args:{item:t({question:l}),startAnswerless:!0}},c={args:{item:t({question:U}),startAnswerless:!0}};var g,d,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(S=(d=r.parameters)==null?void 0:d.docs)==null?void 0:S.source}}};var w,h,q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(q=(h=s.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var f,I,O;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(O=(I=o.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var A,W,C;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(C=(W=i.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var P,T,M;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(M=(T=m.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var v,b,Q;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(Q=(b=n.parameters)==null?void 0:b.docs)==null?void 0:Q.source}}};var x,y,E;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(E=(y=a.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var j,_,R;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(R=(_=p.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var D,L,N;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(N=(L=c.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};const Bt=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{c as AnswerlessMultiSelect,p as AnswerlessSingleSelect,n as MultiSelect,m as MultiSelectSimple,a as MultiSelectWithScroll,s as SelectWithImages,o as SelectWithImagesAndScroll,r as SingleSelect,i as SingleSelectWithScroll,Bt as __namedExportsOrder,zt as default};
