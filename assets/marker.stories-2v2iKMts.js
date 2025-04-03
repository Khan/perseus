import{j as i}from"./jsx-runtime-BT65X5dW.js";import{a as p}from"./index-B-lxVbXh.js";import{n as l}from"./no-important-DlFk8a1I.js";import{M as u}from"./marker-BD_kcg_l.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CtRu48qb.js";import"./all-widgets-Bml3Xsqb.js";import"./core-widget-registry-2eRuEUfZ.js";import"./underscore-U-AHniOr.js";import"./prop-types-DU6aMTXt.js";import"./mobile-keypad-DFoeLE4Y.js";import"./index-B1Gws05u.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./index-CskvhqFA.js";import"./assertThisInitialized-B9jnkVVz.js";import"./index-DN4d7MfU.js";import"./tiny-invariant-CopsF_GD.js";import"./index-C9RM_t1w.js";import"./tabbar-BmTZy4vx.js";import"./item-DEo0REHz.js";import"./button-assets-qUGjw7KS.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-D1iDSTcu.js";import"./operators-page-C0OAgvtK.js";import"./navigation-pad-Bc2f4g4G.js";import"./key-translator-CtlI53Cl.js";import"./index-CrGd2QqM.js";import"./renderer-DnhW87FU.js";import"./perseus-error-CSETqePQ.js";import"./util-CfzqFt4k.js";import"./jquery-CkHB0_Mt.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-3AkWzTTj.js";import"./svg-image-9gRPvOod.js";import"./index-CQ5XbMj6.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-Ty_QvlNi.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./lint-D0FI20JF.js";import"./index-LbDnW-cL.js";import"./index-gKND8Itv.js";import"./index-CfqIx-dS.js";import"./index-CIHqsnLr.js";import"./index-CbNKSLRm.js";import"./index-B-CZbs2J.js";import"./Popper-Bj3TCzZA.js";import"./math-input-Cx3Nq8BR.js";import"./index-CCUx4bp6.js";import"./simple-keypad-input-1R0khRCc.js";import"./input-with-examples-WnHorsOL.js";import"./text-input-sKoOaXZH.js";import"./index-CieYLtDP.js";import"./base-radio-Lq31BfxU.js";import"./media-queries-D4w_O5TS.js";import"./choice-D9-CDHmz.js";import"./index-CYrfVekP.js";import"./icon-BfyZ3piz.js";import"./choice-icon-vWqj_I_B.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CibXZAsW.js";import"./choice-none-above-DyvWsXxe.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-Bf9VVn_f.js";import"./index-BRgWRRgj.js";import"./answer-choices-BLw65nLN.js";import"./index-Dy7GuG9o.js";import"./button-group-CrIfrEdw.js";import"./index-Dd-cahjY.js";import"./hud-CP_ly967.js";import"./index-D75qsWGa.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-DRyiTmoO.js";import"./range-input-BRhuxdZq.js";import"./marker-BQSEMhtb.js";import"./answer-pill-B0SThEfW.js";import"./sortable-BPGVCo8B.js";import"./video-transcript-link-C0e3jsHe.js";import"./server-item-renderer-B58-tAJS.js";import"./hints-renderer-gqxYhAO9.js";import"./article-renderer-qpM876TX.js";import"./components-Df20Qgck.js";import"./global-colors-DSS4FaUr.js";import"./form-wrapped-text-field-rpxoHLU5.js";const po={title:"PerseusEditor/Widgets/Label Image/Marker"},y=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(y.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,s,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const mo=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,mo as __namedExportsOrder,po as default};
