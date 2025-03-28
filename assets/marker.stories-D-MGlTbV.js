import{a as i}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import{n as h}from"./no-important-DlFk8a1I.js";import{r as m}from"./index-C6mWTJJr.js";import{M as u}from"./marker-Bk1g54Xn.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-BosuxZz1.js";import"./all-widgets-jOUcstV-.js";import"./core-widget-registry-2tCIH_GM.js";import"./underscore-U-AHniOr.js";import"./prop-types-Bt57fpTf.js";import"./mobile-keypad-BTuEqmKk.js";import"./index-Xl5L4rvz.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./index-CskvhqFA.js";import"./assertThisInitialized-B9jnkVVz.js";import"./index-1LDQje0j.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CC9jxhwQ.js";import"./tabbar-ShCvdYam.js";import"./item-DMOJOx6J.js";import"./button-assets-CICggd4J.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-Ce4opAXu.js";import"./operators-page-ByyAQb6A.js";import"./navigation-pad-DdOxfhts.js";import"./key-translator-bknjHtsc.js";import"./index-CrGd2QqM.js";import"./renderer-DOOqq4LB.js";import"./perseus-error-UcbLzupY.js";import"./util-C98KaClM.js";import"./jquery-CkHB0_Mt.js";import"./index-D7h-teXI.js";import"./zoomable-tex-CQuDYaJy.js";import"./tex-CmmEazdv.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-BOJ0NYz6.js";import"./i18n-context-glBZFVwC.js";import"./svg-image-lxb6cAXo.js";import"./index-BGfZpMKd.js";import"./fixed-to-responsive-CXYuKT1B.js";import"./constants-BIpV3g0K.js";import"./client-CASytsYC.js";import"./inline-icon-olZqfQoG.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-Clck2KCg.js";import"./perseus-api-DmwU2RjF.js";import"./stub-tag-editor-B6BG5mUz.js";import"./text-list-editor-Rb8EP659.js";import"./lint-DBu4bfMa.js";import"./index-DhnSWwsH.js";import"./index-WxhLWi3g.js";import"./index-L0QPXFmk.js";import"./index-CIHqsnLr.js";import"./index-CbNKSLRm.js";import"./index-D-mrA-Lm.js";import"./Popper-Dy4DMz1_.js";import"./math-input-CYtrbsT8.js";import"./index-D3YmW7kw.js";import"./simple-keypad-input-DmzcuhVA.js";import"./input-with-examples-BTtYNK_1.js";import"./text-input-wa-toQ9v.js";import"./index-DaA-XyhK.js";import"./base-radio-DfLbTTDj.js";import"./media-queries-D4w_O5TS.js";import"./choice-B9Bv3a_w.js";import"./index-DpD-xBMx.js";import"./icon-90vA-eeT.js";import"./choice-icon-BrRsPlMe.js";import"./focus-ring-UKCvrZUA.js";import"./option-status-JW_Swo5-.js";import"./choice-none-above-CHQ7iSQR.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-CRP1AVh1.js";import"./index-BPSVujIw.js";import"./answer-choices-NwUK5mwS.js";import"./index-IRljdxki.js";import"./button-group-q129tbVV.js";import"./index-Dd-cahjY.js";import"./jsx-runtime-BT65X5dW.js";import"./hud--52rQRjV.js";import"./index-CfM4f3_8.js";import"./multi-button-group-CGE8ZIlq.js";import"./number-input-BgY8Orpp.js";import"./range-input-CYqeCeGp.js";import"./marker-Bz-GEPu9.js";import"./answer-pill-qgDu9cG2.js";import"./sortable-DE0gpsMA.js";import"./video-transcript-link-DxCx5I6Z.js";import"./server-item-renderer-BPjEh1Qz.js";import"./hints-renderer-TqV6n1QR.js";import"./article-renderer-D4HJITCY.js";import"./components-M2i0BlZK.js";import"./global-colors-DSS4FaUr.js";import"./form-wrapped-text-field-DZhcbnDw.js";const mo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=h.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=p=>m.createElement("div",{className:h.css(y.wrapper)},m.createElement(u,{...p})),o=p=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})},t=p=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,a,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var c,g,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(l=(g=t.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};const po=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,po as __namedExportsOrder,mo as default};
