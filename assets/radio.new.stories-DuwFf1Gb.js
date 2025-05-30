import{j as r}from"./jsx-runtime-BT65X5dW.js";import"./index-default-BcKQpA1a.js";import{g as t}from"./index-DUN-iEmu.js";import{S as ie}from"./server-item-renderer-with-debug-ui-BryfAoOJ.js";import{a as S,c as ne,S as $,b as ee,m as me,d as te,e as re}from"./radio.testdata-C1vj3X_t.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./no-important-DlFk8a1I.js";import"./index-BN1f3DJf.js";import"./index-B1Gws05u.js";import"./index-C0xJ1VDw.js";import"./index-BfjDPqC2.js";import"./split-view-Bj3Zehqg.js";import"./index-B_N1aciG.js";import"./index-DyG-XbLr.js";import"./index-BDsoIsav.js";import"./index-BPL71wmx.js";import"./test-keypad-context-wrapper-HO2B7e1Z.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./mobile-keypad-BemQstVB.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B_E71Lmv.js";import"./tabbar-CdwZ7NtL.js";import"./item-CU19aERO.js";import"./button-assets-DmHPz6Ev.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-K_cGliPR.js";import"./operators-page-D0v7fvOw.js";import"./navigation-pad-DQbq-Eiy.js";import"./prop-types-jXha2SHy.js";import"./key-translator-BKEQd_vD.js";import"./index-CrGd2QqM.js";import"./split-perseus-item-CxQKjEI4.js";import"./util-CKVKlVyf.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./server-item-renderer-C5q_V1Ru.js";import"./renderer-BB4EQnCf.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-BlpvwUdd.js";import"./svg-image-gox5qzdo.js";import"./index-DD9muzfp.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-fTM3z0tF.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./lint-D0FI20JF.js";import"./hints-renderer-oqMA7Zfl.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./test-dependencies-DUdVP3ug.js";import"./all-widgets-BoETMdvb.js";import"./index-DsTg7R03.js";import"./index-BsVzSXL3.js";import"./index-gdjMQqRz.js";import"./index-BWwc-H8c.js";import"./Popper-Bj3TCzZA.js";import"./math-input-Cd7-V_Wb.js";import"./index-DMlccmQw.js";import"./simple-keypad-input-CDUGLTAA.js";import"./input-with-examples-CvXvuO8z.js";import"./text-input-CDDWJkQJ.js";import"./index-6t7BHVg9.js";import"./base-radio-Dfrd0WvF.js";import"./choice-BliUEeWf.js";import"./choice-icon-CxMgSXH9.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-s0oq-B2K.js";import"./choice-none-above-D8DH-M_u.js";import"./phet-simulation-BaMZDrAC.js";import"./index-DE1wyAWu.js";import"./warning-circle-BLJ1dLdU.js";import"./answer-choices-DpvF_9Vj.js";import"./index-MxyfnP9n.js";import"./free-response-DMGBgdZk.js";import"./index-BMWTWptC.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./icon-BfyZ3piz.js";import"./index-DsINhqRJ.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-CEa3MK3a.js";import"./range-input-BiJ-VE74.js";import"./marker-Cy7KctGR.js";import"./answer-pill-B45WDyhu.js";import"./sortable-BLce0cK5.js";import"./video-transcript-link-RsYwKknS.js";const rr={title:"Perseus/Widgets/RadioNew",args:{static:!1,startAnswerless:!1,reviewMode:!1,showSolutions:"none",item:t({question:S})},argTypes:{showSolutions:{options:["none","all","selected"],control:{type:"select"}}},render:e=>r.jsx(ie,{item:ae(e),apiOptions:ce(),reviewMode:e.reviewMode,showSolutions:e.showSolutions,startAnswerless:e.startAnswerless}),parameters:{docs:{description:{component:`This is a story for the new radio widget.
It will replace radio.stories.tsx after the feature flag is no longer needed.

TODO(LEMS-2994): Clean up this file.`}}}},ae=e=>{const h={...e.item,question:{...e.item.question,widgets:{}},apiOptions:{flags:{"new-radio-widget":!0}}};for(const[oe,se]of Object.entries(e.item.question.widgets))h.question.widgets[oe]={...se,static:e.static};return h},ce=e=>({flags:{"new-radio-widget":!0}}),o={args:{item:t({question:S})}},s={args:{item:t({question:ne})}},i={args:{item:t({question:$})}},n={args:{item:t({question:ee})}},m={args:{item:t({question:me})}},a={args:{item:t({question:te})}},c={args:{item:t({question:re})}},p={args:{item:t({question:S}),startAnswerless:!0}},l={args:{item:t({question:te}),startAnswerless:!0}},u={args:{item:t({question:$})},decorators:[e=>(document.body.setAttribute("dir","rtl"),r.jsx("div",{style:{direction:"rtl"},children:r.jsx(e,{})}))],play:async()=>{document.body.removeAttribute("dir")}},d={args:{item:t({question:ee})},decorators:[e=>(document.body.setAttribute("dir","rtl"),r.jsx("div",{style:{direction:"rtl"},children:r.jsx(e,{})}))],play:async()=>{document.body.removeAttribute("dir")}},g={args:{item:t({question:re})},decorators:[e=>(document.body.setAttribute("dir","rtl"),r.jsx("div",{style:{direction:"rtl"},children:r.jsx(e,{})}))],play:async()=>{document.body.removeAttribute("dir")}};var y,w,f;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    })
  }
}`,...(f=(w=o.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var q,A,I;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: choicesWithImages
    })
  }
}`,...(I=(A=s.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var b,v,T;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  }
}`,...(T=(v=i.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var W,C,P;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  }
}`,...(P=(C=n.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var O,R,M;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimple
    })
  }
}`,...(M=(R=m.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var x,j,L;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    })
  }
}`,...(L=(j=a.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};var Q,_,E;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  }
}`,...(E=(_=c.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var D,N,U;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: questionWithPassage
    }),
    startAnswerless: true
  }
}`,...(U=(N=p.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var k,z,B;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestion
    }),
    startAnswerless: true
  }
}`,...(B=(z=l.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var F,G,H;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowImageContent
    })
  },
  decorators: [Story => {
    // Set RTL for testing
    document.body.setAttribute("dir", "rtl");
    return <div style={{
      direction: "rtl"
    }}>
                    <Story />
                </div>;
  }],
  play: async () => {
    // Reset the direction after the story
    document.body.removeAttribute("dir");
  }
}`,...(H=(G=u.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,K,V;d.parameters={...d.parameters,docs:{...(J=d.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: SingleSelectOverflowContent
    })
  },
  decorators: [Story => {
    // Set RTL for testing
    document.body.setAttribute("dir", "rtl");
    return <div style={{
      direction: "rtl"
    }}>
                    <Story />
                </div>;
  }],
  play: async () => {
    // Reset the direction after the story
    document.body.removeAttribute("dir");
  }
}`,...(V=(K=d.parameters)==null?void 0:K.docs)==null?void 0:V.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: multiChoiceQuestionSimpleOverflowContent
    })
  },
  decorators: [Story => {
    // Set RTL for testing
    document.body.setAttribute("dir", "rtl");
    return <div style={{
      direction: "rtl"
    }}>
                    <Story />
                </div>;
  }],
  play: async () => {
    // Reset the direction after the story
    document.body.removeAttribute("dir");
  }
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const or=["SingleSelect","SelectWithImages","SelectWithImagesAndScroll","SingleSelectWithScroll","MultiSelectSimple","MultiSelect","MultiSelectWithScroll","AnswerlessSingleSelect","AnswerlessMultiSelect","SelectWithImagesAndScrollRTL","SingleSelectWithScrollRTL","MultiSelectWithScrollRTL"];export{l as AnswerlessMultiSelect,p as AnswerlessSingleSelect,a as MultiSelect,m as MultiSelectSimple,c as MultiSelectWithScroll,g as MultiSelectWithScrollRTL,s as SelectWithImages,i as SelectWithImagesAndScroll,u as SelectWithImagesAndScrollRTL,o as SingleSelect,n as SingleSelectWithScroll,d as SingleSelectWithScrollRTL,or as __namedExportsOrder,rr as default};
