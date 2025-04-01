import{a as i}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import{n as h}from"./no-important-DlFk8a1I.js";import{r as m}from"./index-C6mWTJJr.js";import{M as u}from"./marker-D3-aGEVI.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-BosuxZz1.js";import"./all-widgets-DT--A9xM.js";import"./core-widget-registry-2tCIH_GM.js";import"./underscore-U-AHniOr.js";import"./prop-types-B77NothT.js";import"./mobile-keypad-CyWweNsY.js";import"./index-Xl5L4rvz.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./index-CskvhqFA.js";import"./assertThisInitialized-B9jnkVVz.js";import"./index-DN4d7MfU.js";import"./tiny-invariant-CopsF_GD.js";import"./index-C9RM_t1w.js";import"./tabbar-B0Mnsvv7.js";import"./item-73m9Uma6.js";import"./button-assets-CICggd4J.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-DuisPKWg.js";import"./operators-page-D-ejvmyb.js";import"./navigation-pad-DoSm_5u8.js";import"./key-translator-Dv1F1EEG.js";import"./index-CrGd2QqM.js";import"./renderer-Doy-sv_3.js";import"./perseus-error-UcbLzupY.js";import"./util-Cjm22Ttl.js";import"./jquery-CkHB0_Mt.js";import"./index-D7h-teXI.js";import"./zoomable-tex-CQuDYaJy.js";import"./tex-CmmEazdv.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-BOJ0NYz6.js";import"./i18n-context-glBZFVwC.js";import"./svg-image-fTqFFTIk.js";import"./index-CQ5XbMj6.js";import"./fixed-to-responsive-CXYuKT1B.js";import"./constants-BIpV3g0K.js";import"./client-CASytsYC.js";import"./inline-icon-olZqfQoG.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-Clck2KCg.js";import"./perseus-api-DmwU2RjF.js";import"./stub-tag-editor-B6BG5mUz.js";import"./text-list-editor-Rb8EP659.js";import"./lint-DBu4bfMa.js";import"./index-CjqMeO8x.js";import"./index-r7GwIklR.js";import"./index-CfqIx-dS.js";import"./index-CIHqsnLr.js";import"./index-CbNKSLRm.js";import"./index-B-CZbs2J.js";import"./Popper-Dy4DMz1_.js";import"./math-input-BlyVf4im.js";import"./index-kzHyWCTU.js";import"./simple-keypad-input-b-i9KXUl.js";import"./input-with-examples-sO6ENmik.js";import"./text-input-DZHbtyPE.js";import"./index-CieYLtDP.js";import"./base-radio-kaSH4GDV.js";import"./media-queries-D4w_O5TS.js";import"./choice-DPaYDYWU.js";import"./index-CYrfVekP.js";import"./icon-90vA-eeT.js";import"./choice-icon-DbZ2pZ_o.js";import"./focus-ring-UKCvrZUA.js";import"./option-status-9LBY7MsL.js";import"./choice-none-above-Dl9L-8RG.js";import"./shared-Dtpp87RV.js";import"./phet-simulation-DOXsIrrc.js";import"./index-BRgWRRgj.js";import"./answer-choices-DVQOAvoJ.js";import"./index-Dy7GuG9o.js";import"./button-group-q129tbVV.js";import"./index-Dd-cahjY.js";import"./jsx-runtime-BT65X5dW.js";import"./hud--52rQRjV.js";import"./index-BMj1EjxY.js";import"./multi-button-group-CGE8ZIlq.js";import"./number-input-CDxfqmZD.js";import"./range-input-pvBjtf5m.js";import"./marker-CdQLtPrj.js";import"./answer-pill-BSENQyTr.js";import"./sortable-B2aWWOwR.js";import"./video-transcript-link-vfF_Z3Vk.js";import"./server-item-renderer-B2-PPl2j.js";import"./hints-renderer-Bgu9Wu6L.js";import"./article-renderer-XuVFlMX9.js";import"./components-DVAzFIw2.js";import"./global-colors-DSS4FaUr.js";import"./form-wrapped-text-field-BiMFbofc.js";const mo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=h.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=p=>m.createElement("div",{className:h.css(y.wrapper)},m.createElement(u,{...p})),o=p=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})},t=p=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,a,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
