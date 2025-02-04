import{j as i}from"./jsx-runtime-63Ea5SlK.js";import{a as p}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{l}from"./index-awljIyHI.js";import{M as u}from"./marker-SSovFvBf.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./article-renderer-obZwyey0.js";import"./util-CFc6mjZH.js";import"./core-widget-registry-uiKfW1Am.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-c07pHhM9.js";import"./prop-types-lcbIn0mB.js";import"./mobile-keypad-9fHJTh3A.js";import"./index-9gkyvru-.js";import"./index-7-BESUpx.js";import"./index-J2t_5nK1.js";import"./index-Cj1jPHW9.js";import"./assertThisInitialized-4q6YPdh3.js";import"./index-bRdc6KRF.js";import"./index-dmcq622U.js";import"./tabbar-1DjuEemW.js";import"./item-E1d38aVD.js";import"./button-assets-xw_2ofjr.js";import"./keypad-button-Iv9s2OZ4.js";import"./operators-page-ukHAnzaJ.js";import"./navigation-pad-wOMrEBqK.js";import"./key-translator-6cbhqwfU.js";import"./enums-x5qaTru7.js";import"./renderer-Fnk1NeV5.js";import"./index-dnMhQZ-1.js";import"./asset-context-H6Iqp7Gi.js";import"./i18n-context-ixQPsVqr.js";import"./svg-image-qrz0lnAf.js";import"./index-wB6JGB7j.js";import"./dependencies-CP7Uh8Kq.js";import"./fixed-to-responsive-m4E_8Ehf.js";import"./constants-NhstHO4m.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./perseus-api-DO0X8arb.js";import"./index-o42urCig.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./lint-ZDfMj7xF.js";import"./index-0kkDMKyq.js";import"./index-ocYiwKv6.js";import"./index-cljMqpCc.js";import"./index-TVweWxDl.js";import"./index-SAZ92ybN.js";import"./index-GucNpBmh.js";import"./Popper-Y5KDXl-P.js";import"./math-input-ULwP0qCH.js";import"./index-SpvvvrhE.js";import"./input-with-examples-vufizoDF.js";import"./text-input-lFfdB4Pt.js";import"./index-5tV1Z6Un.js";import"./tooltip-Lp8Mlfe3.js";import"./simple-keypad-input-i1bObpyx.js";import"./base-radio-ap_gaQiI.js";import"./media-queries-9nQcKCnE.js";import"./choice-2_eap9Kr.js";import"./index-sN6aPTh8.js";import"./icon-7RFbyLiL.js";import"./choice-icon-ITW_41RJ.js";import"./focus-ring-RqL_DCvt.js";import"./option-status-QGdq-J0F.js";import"./choice-none-above-W9OevS5v.js";import"./shared-NsRqKJ7_.js";import"./phet-simulation--dXVcXc8.js";import"./index-kNGCvM5b.js";import"./answer-choices-kU87X2ER.js";import"./index-YAvX_VSA.js";import"./button-group-G5CZaedn.js";import"./graph-BDf__ekZ.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./hud-l_qVjidt.js";import"./index-ioZjKB__.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-jkCMcdIp.js";import"./range-input-gQOI2TRi.js";import"./marker-v8zOTTGk.js";import"./answer-pill-gVUoRVbg.js";import"./sortable-ZbObzyGU.js";import"./video-transcript-link-zWBtAMbH.js";import"./server-item-renderer-pX6mcm0g.js";import"./hints-renderer-e5Yk3Sr5.js";import"./components-fhlCid_0.js";import"./global-colors-VIVU4Od4.js";import"./form-wrapped-text-field-q2LxQQ4u.js";const so={title:"PerseusEditor/Widgets/Label Image/Marker"},x=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(x.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var s,n,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(n=o.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var c,g,h;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const no=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,no as __namedExportsOrder,so as default};
