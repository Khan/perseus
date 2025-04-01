import{r as Q}from"./index-C6mWTJJr.js";import{S as v}from"./server-item-renderer-with-debug-ui-BINOfrXt.js";import{g as t}from"./test-utils-B-ObItAN.js";import{a as n,c as x,m as _,b as E}from"./radio.testdata-C06gW6g0.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DpD-xBMx.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./index-1LDQje0j.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CC9jxhwQ.js";import"./index-CbNKSLRm.js";import"./index-BGfZpMKd.js";import"./index-L0QPXFmk.js";import"./index-CIHqsnLr.js";import"./index-D-mrA-Lm.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-2tCIH_GM.js";import"./split-perseus-item-D_z-OoAi.js";import"./util-Cjm22Ttl.js";import"./perseus-error-UcbLzupY.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./all-widgets-tRlJWtrE.js";import"./prop-types-Bt57fpTf.js";import"./mobile-keypad-BTuEqmKk.js";import"./index-Xl5L4rvz.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B9jnkVVz.js";import"./tabbar-ShCvdYam.js";import"./item-DMOJOx6J.js";import"./button-assets-CICggd4J.js";import"./keypad-button-Ce4opAXu.js";import"./operators-page-ByyAQb6A.js";import"./navigation-pad-DdOxfhts.js";import"./key-translator-bknjHtsc.js";import"./index-CrGd2QqM.js";import"./renderer-Dk-W13T9.js";import"./index-D7h-teXI.js";import"./zoomable-tex-CQuDYaJy.js";import"./tex-CmmEazdv.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-BOJ0NYz6.js";import"./i18n-context-glBZFVwC.js";import"./svg-image-DAYn0iDa.js";import"./fixed-to-responsive-CXYuKT1B.js";import"./constants-BIpV3g0K.js";import"./client-CASytsYC.js";import"./inline-icon-olZqfQoG.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-Clck2KCg.js";import"./perseus-api-DmwU2RjF.js";import"./stub-tag-editor-B6BG5mUz.js";import"./text-list-editor-Rb8EP659.js";import"./lint-DBu4bfMa.js";import"./index-DhnSWwsH.js";import"./index-WxhLWi3g.js";import"./Popper-Dy4DMz1_.js";import"./math-input-CYtrbsT8.js";import"./index-D3YmW7kw.js";import"./simple-keypad-input-DmzcuhVA.js";import"./input-with-examples-DSA6_4W-.js";import"./text-input-wa-toQ9v.js";import"./index-DaA-XyhK.js";import"./base-radio-_o7Aud29.js";import"./media-queries-D4w_O5TS.js";import"./choice-B9Bv3a_w.js";import"./icon-90vA-eeT.js";import"./choice-icon-BrRsPlMe.js";import"./focus-ring-UKCvrZUA.js";import"./option-status-JW_Swo5-.js";import"./choice-none-above-C1Dyp3wQ.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-CRP1AVh1.js";import"./index-BPSVujIw.js";import"./answer-choices-CUdxwhbX.js";import"./index-IRljdxki.js";import"./button-group-q129tbVV.js";import"./index-Dd-cahjY.js";import"./jsx-runtime-BT65X5dW.js";import"./hud--52rQRjV.js";import"./index-CfM4f3_8.js";import"./multi-button-group-CGE8ZIlq.js";import"./number-input-CDxfqmZD.js";import"./range-input-pvBjtf5m.js";import"./marker-C7px7_TJ.js";import"./answer-pill-BbqH6s3j.js";import"./sortable-CT-kFXuK.js";import"./video-transcript-link-DxCx5I6Z.js";import"./server-item-renderer-BYboQbOk.js";import"./hints-renderer-D7pIA0Cj.js";import"./article-renderer-BDBMlFVD.js";import"./split-view-DIdTXuH9.js";import"./test-dependencies-_iLD15SY.js";import"./register-all-widgets-for-testing-C3avViEm.js";const Tt={title:"Perseus/Widgets/Radio",args:{static:!1,startAnswerless:!1,crossOutEnabled:!1,reviewMode:!1,showSolutions:"none",item:t({question:n})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>Q.createElement(v,{item:R(e),apiOptions:j(e),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless})},R=e=>{const a={...e.item,question:{...e.item.question,widgets:{}}};for(const[y,C]of Object.entries(e.item.question.widgets))a.question.widgets[y]={...C,static:e.static};return a},j=e=>({crossOutEnabled:e.crossOutEnabled}),r={args:{item:t({question:n})}},o={args:{item:t({question:x})}},s={args:{item:t({question:_})}},i={args:{item:t({question:E})}},m={args:{item:t({question:n}),startAnswerless:!0}},p={args:{item:t({question:E}),startAnswerless:!0}};var c,u,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(O=(b=p.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};const bt=["SingleSelect","SelectWithImages","MultiSelectSimple","MultiSelect","AnswerlessSingleSelect","AnswerlessMultiSelect"];export{p as AnswerlessMultiSelect,m as AnswerlessSingleSelect,i as MultiSelect,s as MultiSelectSimple,o as SelectWithImages,r as SingleSelect,bt as __namedExportsOrder,Tt as default};
