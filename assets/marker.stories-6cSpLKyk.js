import{j as i}from"./jsx-runtime-BT65X5dW.js";import{a as p}from"./index-B-lxVbXh.js";import{n as l}from"./no-important-DlFk8a1I.js";import{M as u}from"./marker-DVJb5O1S.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CtRu48qb.js";import"./all-widgets-CutwIB83.js";import"./core-widget-registry-DemQrLPv.js";import"./underscore-U-AHniOr.js";import"./prop-types-CzjFAMth.js";import"./mobile-keypad-CbaXAgqD.js";import"./index-B1Gws05u.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./index-CskvhqFA.js";import"./assertThisInitialized-B9jnkVVz.js";import"./index-KFdEgasi.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CjnMbH_2.js";import"./tabbar-CZSBNGic.js";import"./item-BLUJCfQ8.js";import"./button-assets-Ca3KCbzS.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-Duupk4zH.js";import"./operators-page-UCGj6hW8.js";import"./navigation-pad-RqNsivDn.js";import"./key-translator-BZUSoKJt.js";import"./index-CrGd2QqM.js";import"./renderer-d8VwMfZb.js";import"./perseus-error-CSETqePQ.js";import"./util-BU0fl0Cx.js";import"./jquery-CkHB0_Mt.js";import"./index-D7h-teXI.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-3AkWzTTj.js";import"./svg-image-DAY0n-SP.js";import"./index-fj4wzhGb.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./perseus-api-Ty_QvlNi.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./lint-D0FI20JF.js";import"./index-BvHsycGa.js";import"./index-Dr3BtBNU.js";import"./index-C1fpYtXO.js";import"./index-CIHqsnLr.js";import"./index-CbNKSLRm.js";import"./index-CbIoTxL4.js";import"./Popper-Bj3TCzZA.js";import"./math-input-CbUInExg.js";import"./index-BEYgOkb5.js";import"./simple-keypad-input-DMQCWDCJ.js";import"./input-with-examples-LtlP6nI7.js";import"./text-input-BBSUCCjG.js";import"./index-BePo9uoZ.js";import"./base-radio-BUwWhlvv.js";import"./media-queries-D4w_O5TS.js";import"./choice-M-KeScyb.js";import"./index-CQe11mMd.js";import"./icon-BfyZ3piz.js";import"./choice-icon-DaGBSn1O.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-gZhybWxb.js";import"./choice-none-above-CXj07tPf.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-ylWgoYlI.js";import"./index-DgUBVOst.js";import"./answer-choices-CEI5I1r0.js";import"./index-GAWk9lgC.js";import"./button-group-CrIfrEdw.js";import"./index-Dd-cahjY.js";import"./hud-CP_ly967.js";import"./index-CnlhjbO_.js";import"./multi-button-group-U6RQwTwG.js";import"./number-input-htTCX9Es.js";import"./range-input-HFrQbokC.js";import"./marker-CYjDG0JV.js";import"./answer-pill-D6U-j8Q1.js";import"./sortable-BpQkdUdf.js";import"./video-transcript-link-C7EJC_3o.js";import"./item-version-BW1CK5lw.js";import"./article-renderer-YSxIe7Sb.js";import"./server-item-renderer-p-iI-IYI.js";import"./hints-renderer-B0Dmg7sw.js";import"./components-8ygfdXr4.js";import"./global-colors-DSS4FaUr.js";import"./form-wrapped-text-field-cWpA0fyK.js";const mo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(y.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,s,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const eo=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,eo as __namedExportsOrder,mo as default};
