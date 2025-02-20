import{j as i}from"./jsx-runtime-63Ea5SlK.js";import{a as p}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{n as l}from"./no-important-xCWWYXQR.js";import{M as u}from"./marker-1TZ14xW_.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./article-renderer-5fcH0OnH.js";import"./util-nmML-gwR.js";import"./random-util-SPl7f2gt.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-c07pHhM9.js";import"./prop-types-P3G9EAeA.js";import"./mobile-keypad-82HGBSTf.js";import"./index-9gkyvru-.js";import"./index-OQMtW1Q1.js";import"./index-J2t_5nK1.js";import"./index-_3CKOwHy.js";import"./assertThisInitialized-4q6YPdh3.js";import"./index-0pCajwWr.js";import"./index-QHkT31Yt.js";import"./tabbar-UtkI9pTR.js";import"./item-YVSph9Dw.js";import"./button-assets-7m1T_4mc.js";import"./keypad-button-hhOS0syC.js";import"./operators-page-JeXau95Y.js";import"./navigation-pad-zT5MrliL.js";import"./key-translator-Q-blX8Cr.js";import"./enums-x5qaTru7.js";import"./renderer-uejWNbLH.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-OTkyDBc-.js";import"./tex-MX5FPdQh.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-pOEbOEqK.js";import"./i18n-context-GVCAGr7t.js";import"./svg-image-cdZc2Rc_.js";import"./index-oE4Tpxqm.js";import"./fixed-to-responsive-I_PLOgi8.js";import"./constants-qvNmarDy.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./perseus-api-DO0X8arb.js";import"./index-o42urCig.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./lint-r_VdOcfh.js";import"./index-rXO3OHs_.js";import"./index-wvJr82a4.js";import"./index-ZdJtI3z8.js";import"./index-7Z-R4z4z.js";import"./index-4dAUYsag.js";import"./index-o999uk82.js";import"./Popper-Y5KDXl-P.js";import"./math-input-9VGdpeLV.js";import"./index-8_CLcrTy.js";import"./input-with-examples-eODgI1cA.js";import"./text-input-huKPH8lY.js";import"./index-DQJhbslN.js";import"./tooltip-Lp8Mlfe3.js";import"./simple-keypad-input-KMl49iwP.js";import"./base-radio-vNurH8zt.js";import"./media-queries-AtsgWQBm.js";import"./choice-XoQfklAK.js";import"./index-_CVl-B2F.js";import"./icon-7RFbyLiL.js";import"./choice-icon-M7ulrC-T.js";import"./focus-ring-NR0ydWyB.js";import"./option-status-OKcFildK.js";import"./choice-none-above-kdaTjM3Q.js";import"./shared-apNPYhSn.js";import"./phet-simulation-t69N-Bc7.js";import"./index-Xg8lxIoz.js";import"./answer-choices-JpTF-jVF.js";import"./index-MBMqDkZ-.js";import"./button-group-SY8dumRU.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./hud-n-xEkDjs.js";import"./index-4SmKKGcF.js";import"./multi-button-group-3E5hf1eq.js";import"./number-input-IZRLTOJy.js";import"./range-input-xMXfHgMy.js";import"./marker-AuEnt2DW.js";import"./answer-pill-nkDrhM8K.js";import"./sortable-1Abk9-OE.js";import"./video-transcript-link-V9S2M50Z.js";import"./server-item-renderer-KorhdWx4.js";import"./hints-renderer-vfmCDny8.js";import"./components-fBKcSb9S.js";import"./global-colors-VIVU4Od4.js";import"./form-wrapped-text-field-Vtx_KZ3q.js";const mo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(y.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,s,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
