import{j as i}from"./jsx-runtime-63Ea5SlK.js";import{a as p}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{l}from"./index-awljIyHI.js";import{M as u}from"./marker-kBrXrZ51.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./article-renderer-zPjdUlLS.js";import"./util-_iDv4tVD.js";import"./jquery-yG1GhClm.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./prop-types-8jWRcF72.js";import"./mobile-keypad-ZHZ0NI5E.js";import"./index-9gkyvru-.js";import"./index-7-BESUpx.js";import"./index-J2t_5nK1.js";import"./index-glC8WTvQ.js";import"./assertThisInitialized-4q6YPdh3.js";import"./index-rDXm6JjH.js";import"./index-dmcq622U.js";import"./tabbar-3r6sEokv.js";import"./item-Ytnrydoz.js";import"./button-assets-ozecF1qE.js";import"./keypad-button-vE6mhmf6.js";import"./operators-page-f8JQHV76.js";import"./navigation-pad-LynhtGkb.js";import"./key-translator-T3Ft2Fiq.js";import"./enums-x5qaTru7.js";import"./renderer-fE8shvP-.js";import"./index-dnMhQZ-1.js";import"./asset-context-H6Iqp7Gi.js";import"./i18n-context-ei4f54eq.js";import"./svg-image-3LTMuTsF.js";import"./index-nxskEkPa.js";import"./dependencies-CP7Uh8Kq.js";import"./fixed-to-responsive-for_tVF1.js";import"./constants-iPV6vHZm.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./perseus-api-ooj0_ZRv.js";import"./index-IiwcBdIZ.js";import"./stub-tag-editor-zsURaARz.js";import"./text-list-editor-K49FGdd7.js";import"./lint-CRWxUAIQ.js";import"./index-AIigN4FC.js";import"./index-Uc2s6Xfa.js";import"./index-eyFID18T.js";import"./index-Nm93P9tc.js";import"./index-SZdB7w_U.js";import"./index-R5O7Arjo.js";import"./Popper-Y5KDXl-P.js";import"./math-input-N_MDxKlQ.js";import"./index-PDC3zbX8.js";import"./input-with-examples-a60N8jIv.js";import"./text-input-0d3Qfm7R.js";import"./index-WDW9kCBC.js";import"./tooltip-Lp8Mlfe3.js";import"./simple-keypad-input-9NsbT2Cr.js";import"./base-radio-pgwo-5L3.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./choice-z0ppa_FG.js";import"./index-o183v7SS.js";import"./icon-7RFbyLiL.js";import"./choice-icon-BD8zPTU8.js";import"./focus-ring-qYEF-qqz.js";import"./option-status-drlCsbdK.js";import"./choice-none-above-Pg0eYH5O.js";import"./phet-simulation-VOua3fMz.js";import"./index-udZzDgAx.js";import"./answer-choices-FNRVtUNv.js";import"./index-UDsSAJlr.js";import"./button-group-G5CZaedn.js";import"./graph-lX85VXnO.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./hud-ifw9Ofbw.js";import"./index-ZIpjk6I_.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-T6lG2NEQ.js";import"./range-input-Gg2JKhNA.js";import"./marker-WojW-X10.js";import"./answer-pill-Ot3LQBpY.js";import"./sortable-87T8h6rE.js";import"./video-transcript-link-NNQriQJO.js";import"./perseus-item-AHZmJsDh.js";import"./hints-renderer-_vvYsFS8.js";import"./components-h3JKYRA5.js";import"./global-colors-VIVU4Od4.js";import"./util-qk2aeK8X.js";import"./form-wrapped-text-field-q2LxQQ4u.js";const eo={title:"PerseusEditor/Widgets/Label Image/Marker"},x=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(x.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var s,n,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const so=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,so as __namedExportsOrder,eo as default};
