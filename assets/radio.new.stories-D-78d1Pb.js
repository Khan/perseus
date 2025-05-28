import{j as B}from"./jsx-runtime-BT65X5dW.js";import"./index-default-BcKQpA1a.js";import{g as t}from"./index-DktHmiAd.js";import{S as F}from"./server-item-renderer-with-debug-ui-B3HK5lR4.js";import{a as l,c as G,S as H,b as J,m as K,d as U,e as V}from"./radio.testdata-C1vj3X_t.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./no-important-DlFk8a1I.js";import"./index-BN1f3DJf.js";import"./index-B1Gws05u.js";import"./index-C0xJ1VDw.js";import"./index-BfjDPqC2.js";import"./split-view-Bj3Zehqg.js";import"./index-B_N1aciG.js";import"./index-DyG-XbLr.js";import"./index-BDsoIsav.js";import"./index-BPL71wmx.js";import"./test-keypad-context-wrapper-6tIfx4wE.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-DvhXuqfO.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B_E71Lmv.js";import"./tabbar-CdwZ7NtL.js";import"./item-CU19aERO.js";import"./button-assets-C9T5fNLz.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-CXqAcJRc.js";import"./operators-page-C3H2X4aA.js";import"./navigation-pad-i78wd4WL.js";import"./prop-types-DcC81bXJ.js";import"./key-translator-qlXm3eZ0.js";import"./index-CrGd2QqM.js";import"./split-perseus-item-yazcGxNE.js";import"./util-Cnd0Ukpp.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./server-item-renderer-bJ-x7ddr.js";import"./renderer-DTCW_hQD.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-bNNtSo4z.js";import"./svg-image-BmyLAfxC.js";import"./index-DD9muzfp.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-fTM3z0tF.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./lint-D0FI20JF.js";import"./hints-renderer-CV1Czsbv.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-5s3PUiGH.js";import"./all-widgets-v6tPdLhr.js";import"./index-DsTg7R03.js";import"./index-BsVzSXL3.js";import"./index-gdjMQqRz.js";import"./index-BWwc-H8c.js";import"./Popper-Bj3TCzZA.js";import"./math-input-B2INI_sF.js";import"./index-DMlccmQw.js";import"./simple-keypad-input-CpdZtmJo.js";import"./input-with-examples-26FpOIY_.js";import"./text-input-BdlNOW-6.js";import"./index-6t7BHVg9.js";import"./base-radio-DRQ5uYqC.js";import"./choice-sPmdcwyZ.js";import"./choice-icon-DnZQOXWT.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-D6Ad0RwN.js";import"./choice-none-above-Cq6eeQXv.js";import"./phet-simulation-7JtZXm76.js";import"./index-DE1wyAWu.js";import"./warning-circle-BLJ1dLdU.js";import"./answer-choices-CAW9m8Dd.js";import"./index-MxyfnP9n.js";import"./free-response-3RgbzuUw.js";import"./index-BMWTWptC.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./icon-BfyZ3piz.js";import"./index-DsINhqRJ.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-BoFWJhlc.js";import"./range-input-Bq0Yp9zp.js";import"./marker-Dc-nUZHR.js";import"./answer-pill-CMW6TpXb.js";import"./sortable-CkMd-CCl.js";import"./video-transcript-link-BXfguhTw.js";const Ft={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:t({question:l})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>B.jsx(F,{item:X(e),apiOptions:Y(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},X=e=>{const u={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[k,z]of Object.entries(e.item.question.widgets))u.question.widgets[k]={...z,static:e.static};return u},Y=e=>({flags:{"new-radio-widget":!0}}),r={args:{item:t({question:l})}},o={args:{item:t({question:G})}},s={args:{item:t({question:H})}},i={args:{item:t({question:J})}},m={args:{item:t({question:K})}},n={args:{item:t({question:U})}},a={args:{item:t({question:V})}},p={args:{item:t({question:l}),startAnswerless:!0}},c={args:{item:t({question:U}),startAnswerless:!0}};var g,S,d;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(d=(S=r.parameters)==null?void 0:S.docs)==null?void 0:d.source}}};var w,h,q;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(q=(h=o.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var f,I,A;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(A=(I=s.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var W,C,P;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(P=(C=i.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var O,T,M;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(M=(T=m.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var v,Q,x;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(x=(Q=n.parameters)==null?void 0:Q.docs)==null?void 0:x.source}}};var y,b,j;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(j=(b=a.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var _,E,R;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(R=(E=p.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var D,L,N;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(N=(L=c.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};const Gt=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{c as AnswerlessMultiSelect,p as AnswerlessSingleSelect,n as MultiSelect,m as MultiSelectSimple,a as MultiSelectWithScroll,o as SelectWithImages,s as SelectWithImagesAndScroll,r as SingleSelect,i as SingleSelectWithScroll,Gt as __namedExportsOrder,Ft as default};
