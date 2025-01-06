import{j as i}from"./jsx-runtime-63Ea5SlK.js";import{a as p}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{l}from"./index-awljIyHI.js";import{M as u}from"./marker-An9SbOdy.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./article-renderer-H7paFTjH.js";import"./util-_iDv4tVD.js";import"./jquery-yG1GhClm.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./prop-types-ch_7vUTQ.js";import"./mobile-keypad-3xFFuAxL.js";import"./index-9gkyvru-.js";import"./index-7-BESUpx.js";import"./index-J2t_5nK1.js";import"./index-NVT999Ia.js";import"./index-CgfdZoMj.js";import"./index-dmcq622U.js";import"./assertThisInitialized-4q6YPdh3.js";import"./tabbar-D-BeWJQY.js";import"./item-W49ZrBwd.js";import"./button-assets-ozecF1qE.js";import"./keypad-button-h2VccZ5R.js";import"./operators-page-3PR1Ra4Y.js";import"./navigation-pad-d1QCNA_k.js";import"./key-translator-HspkCZQ2.js";import"./enums-x5qaTru7.js";import"./renderer-wB4ymqub.js";import"./index-dnMhQZ-1.js";import"./asset-context-H6Iqp7Gi.js";import"./i18n-context-BsFRgdNa.js";import"./svg-image--maxZNcn.js";import"./index-JG9NzwvL.js";import"./dependencies-CP7Uh8Kq.js";import"./fixed-to-responsive-for_tVF1.js";import"./constants-iPV6vHZm.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-17De8yEj.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./perseus-api-ooj0_ZRv.js";import"./index-o42urCig.js";import"./stub-tag-editor-zsURaARz.js";import"./text-list-editor-K49FGdd7.js";import"./lint-CRWxUAIQ.js";import"./index-OpAdY7qh.js";import"./index-sJx7e_Q7.js";import"./index-fsOXV5-c.js";import"./index-XlX4hVME.js";import"./index-6ID5EQ9c.js";import"./index-C1N8lBvx.js";import"./Popper-Y5KDXl-P.js";import"./math-input-MklKaEJw.js";import"./index-Zf2-LtSj.js";import"./input-with-examples-aFgDdcbo.js";import"./text-input-uyhLZIJm.js";import"./index-n_qhmlFr.js";import"./tooltip-Lp8Mlfe3.js";import"./simple-keypad-input-pdqW2OJZ.js";import"./base-radio-O9ZaJYqR.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./choice-3TLyHy4g.js";import"./index-69t9pbsh.js";import"./icon-7RFbyLiL.js";import"./choice-icon-cGj1ZMr3.js";import"./focus-ring-qYEF-qqz.js";import"./option-status-2pdRaHO2.js";import"./choice-none-above-UTymoW0T.js";import"./phet-simulation-lTku5ZuX.js";import"./index-Vn7fg-lP.js";import"./answer-choices-AOW1X0hQ.js";import"./index-hgFKmD12.js";import"./button-group-G5CZaedn.js";import"./graph-XirA6zBn.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./hud-ifw9Ofbw.js";import"./index-1hft2BpG.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-62ygQwJh.js";import"./range-input--wUKryQl.js";import"./marker-O_d_PTB4.js";import"./answer-pill-HBOR8ypn.js";import"./sortable-3Tygdldk.js";import"./video-transcript-link-bPLfY-IU.js";import"./perseus-item-oCfICX1I.js";import"./hints-renderer-z7KLc5U6.js";import"./components-q_IOM_C9.js";import"./global-colors-VIVU4Od4.js";import"./util-qk2aeK8X.js";import"./form-wrapped-text-field-q2LxQQ4u.js";const eo={title:"PerseusEditor/Widgets/Label Image/Marker"},x=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(x.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var s,n,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
