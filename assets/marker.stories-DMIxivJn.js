import{j as i}from"./jsx-runtime-BT65X5dW.js";import{a as p}from"./index-B-lxVbXh.js";import{n as l}from"./no-important-DlFk8a1I.js";import{M as u}from"./marker-BKaon23D.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CtRu48qb.js";import"./underscore-U-AHniOr.js";import"./index-BWagKz4k.js";import"./all-widgets-BXQAs3V9.js";import"./prop-types-DMHcqbnf.js";import"./mobile-keypad-CHRzDf3x.js";import"./index-B1Gws05u.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./index-CW2s7ekB.js";import"./assertThisInitialized-DIFuz7Pv.js";import"./index-Ds5N5m2R.js";import"./tabbar-MpFAbKP0.js";import"./item-bIeXIAjZ.js";import"./index-CazpBUXm.js";import"./extends-DDykod_l.js";import"./button-assets-DzVnr2CQ.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-BKQrjn02.js";import"./operators-page-B6xXwJ9R.js";import"./navigation-pad-DXwsZi5_.js";import"./key-translator-BRQ7LI7C.js";import"./index-CrGd2QqM.js";import"./util-2bFi3N3g.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./renderer-CDMpjcHH.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-3AkWzTTj.js";import"./svg-image-ywfOpLF6.js";import"./index-DEiJo70o.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-Ty_QvlNi.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./lint-D0FI20JF.js";import"./index-DqS3kFds.js";import"./index-ByoCYR4k.js";import"./index-DAJiRA_A.js";import"./index-Bdux6mmb.js";import"./index-DfoJsr3g.js";import"./index-CUPgSPQO.js";import"./Popper-Bj3TCzZA.js";import"./math-input-DB2MX6eh.js";import"./index-KG0hCCNB.js";import"./simple-keypad-input-B68QIuHr.js";import"./input-with-examples-BVolRgwA.js";import"./text-input-By3UgNXT.js";import"./index-CU62RnlP.js";import"./base-radio-B1J_ERPo.js";import"./media-queries-D4w_O5TS.js";import"./choice-D39PKTiz.js";import"./index-CWnBGvvR.js";import"./icon-BfyZ3piz.js";import"./choice-icon-C494qWeQ.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CqSyvrjW.js";import"./choice-none-above-BepqcS8x.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-CrX_59te.js";import"./index-Ck9WKKww.js";import"./answer-choices-BqW-lyA6.js";import"./index-BDp5rntB.js";import"./button-group-B24xCvY2.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";import"./hud-CP_ly967.js";import"./index-3tXmpMZ8.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-Dh208Jd4.js";import"./range-input-DCt_VlY_.js";import"./marker-D3ythF61.js";import"./answer-pill-DhBoGlEF.js";import"./sortable-BGfk7U0z.js";import"./video-transcript-link-BsyCgIOs.js";import"./item-version-B5dQLrhV.js";import"./article-renderer-BwxYabli.js";import"./server-item-renderer-B5HgCHn9.js";import"./hints-renderer-BFnEHlSw.js";import"./components-DV9EF346.js";import"./global-colors-DSS4FaUr.js";import"./form-wrapped-text-field-BTRvuk8B.js";const eo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(y.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,s,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    answers: [],
    choices: [],
    label: "",
    onChange: (...args) => {
      action("onChange")(...args);
    },
    onRemove: (...args) => {
      action("onRemove")(...args);
    },
    x: 50,
    y: 50
  } as const;
  return <Wrapper {...props} />;
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var c,g,h;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    answers: ["BMW", "Ferrari"],
    choices: ["Lamborghini", "BMW", "Volkswagen", "Fiat", "Porsche", "Ferrari"],
    label: "Automotive",
    onChange: (...args) => {
      action("onChange")(...args);
    },
    onRemove: (...args) => {
      action("onRemove")(...args);
    },
    x: 50,
    y: 50
  } as const;
  return <Wrapper {...props} />;
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const no=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,no as __namedExportsOrder,eo as default};
