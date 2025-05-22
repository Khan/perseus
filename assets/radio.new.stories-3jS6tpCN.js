import{j as B}from"./jsx-runtime-BT65X5dW.js";import"./index-default-BcKQpA1a.js";import{g as t}from"./index-DktHmiAd.js";import{S as F}from"./server-item-renderer-with-debug-ui-C6Jelntw.js";import{a as l,c as G,S as H,b as J,m as K,d as U,e as V}from"./radio.testdata-C1vj3X_t.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./no-important-DlFk8a1I.js";import"./index-BN1f3DJf.js";import"./index-B1Gws05u.js";import"./index-C0xJ1VDw.js";import"./index-BfjDPqC2.js";import"./split-view-Bj3Zehqg.js";import"./index-B_N1aciG.js";import"./index-DyG-XbLr.js";import"./index-BDsoIsav.js";import"./index-BPL71wmx.js";import"./test-keypad-context-wrapper--C-uYlz0.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-DvhXuqfO.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B_E71Lmv.js";import"./tabbar-CdwZ7NtL.js";import"./item-CU19aERO.js";import"./button-assets-C9T5fNLz.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-CXqAcJRc.js";import"./operators-page-C3H2X4aA.js";import"./navigation-pad-i78wd4WL.js";import"./prop-types-BXAxUNpE.js";import"./key-translator-D-skzBJe.js";import"./index-CrGd2QqM.js";import"./split-perseus-item-JKIdQbrf.js";import"./util-AEEC48XJ.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./server-item-renderer-DMUML-QJ.js";import"./renderer-DrjTKFcr.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-BT3CWGFO.js";import"./svg-image-8T6Bqk5w.js";import"./index-DD9muzfp.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-DFYLNfT-.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./lint-D0FI20JF.js";import"./hints-renderer-COyQwuVx.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-Bo9vAyf0.js";import"./all-widgets-DUOAfzV1.js";import"./index-HPnoKG0_.js";import"./index-BOy187jj.js";import"./index-CcqtyHPG.js";import"./index-BWwc-H8c.js";import"./Popper-Bj3TCzZA.js";import"./math-input-CG7LDH-Z.js";import"./index-W1pK7nxW.js";import"./simple-keypad-input-Bl9QRvgR.js";import"./input-with-examples-2YKqsWc5.js";import"./text-input-CQ4Ha-J8.js";import"./index-CkYjwmgs.js";import"./base-radio-CbqtFMIq.js";import"./choice-BG23lCZ9.js";import"./index-C_76Tegg.js";import"./icon-BfyZ3piz.js";import"./choice-icon-x_McTlZQ.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CK7EF2QT.js";import"./choice-none-above-CSj3Ys-J.js";import"./phet-simulation-Bo8Pw36Z.js";import"./index-DE1wyAWu.js";import"./warning-circle-BLJ1dLdU.js";import"./answer-choices-DPNv9k5F.js";import"./index-Bl4treR9.js";import"./free-response-BLh4IDUx.js";import"./index-BMWTWptC.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./index-ChAlgF23.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-Bqp2ujXM.js";import"./range-input--OsOJO6O.js";import"./marker-CFwOioE6.js";import"./answer-pill-CmZSMnU9.js";import"./sortable-BSP4IWpH.js";import"./video-transcript-link-DfQd4tMq.js";const Gt={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:t({question:l})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>B.jsx(F,{item:X(e),apiOptions:Y(e),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},X=e=>{const u={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[k,z]of Object.entries(e.item.question.widgets))u.question.widgets[k]={...z,static:e.static};return u},Y=e=>({crossOutEnabled:e.crossOutEnabled,flags:{"new-radio-widget":!0}}),r={args:{item:t({question:l})}},o={args:{item:t({question:G})}},s={args:{item:t({question:H})}},i={args:{item:t({question:J})}},m={args:{item:t({question:K})}},n={args:{item:t({question:U})}},a={args:{item:t({question:V})}},p={args:{item:t({question:l}),startAnswerless:!0}},c={args:{item:t({question:U}),startAnswerless:!0}};var g,d,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(S=(d=r.parameters)==null?void 0:d.docs)==null?void 0:S.source}}};var w,h,q;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(q=(h=o.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var f,I,O;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(O=(I=s.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var A,W,C;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(N=(L=c.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};const Ht=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{c as AnswerlessMultiSelect,p as AnswerlessSingleSelect,n as MultiSelect,m as MultiSelectSimple,a as MultiSelectWithScroll,o as SelectWithImages,s as SelectWithImagesAndScroll,r as SingleSelect,i as SingleSelectWithScroll,Ht as __namedExportsOrder,Gt as default};
