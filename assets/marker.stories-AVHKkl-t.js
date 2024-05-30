import{j as p}from"./jsx-runtime-BGVbfQ2Z.js";import{a as i}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{l}from"./index-awljIyHI.js";import{M as u}from"./marker-o7k7WD4h.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./article-renderer-ReGQGqZ7.js";import"./compare-59FC1ybr.js";import"./version-akiLXZts.js";import"./prop-types-6blYoVJL.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-halg33Zp.js";import"./index-4c2J3ov1.js";import"./tabbar-_HYg3Kcf.js";import"./item-MgaZQyPg.js";import"./index-VhM44oCk.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-BUF7auet.js";import"./operators-page-H6dLcd0l.js";import"./navigation-pad-URlj9thj.js";import"./index-JT1-kTlx.js";import"./key-translator-t-qTln-I.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./renderer-24qLTx0s.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-13Ni6RTr.js";import"./index-mohBxQl_.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-EDQcR2F7.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-XkoWPDUZ.js";import"./index-k-0mNqHS.js";import"./stub-tag-editor-f1WdYARp.js";import"./text-list-editor-xQBHt64k.js";import"./lint-4QkP-VXi.js";import"./index-xE_wKg8s.js";import"./index-kutQl4v0.js";import"./index-qh_wob3p.js";import"./index-_15Y2y0p.js";import"./index-h47zdzUa.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-SkZCBhNw.js";import"./index-3tBZ6RgE.js";import"./unit-ovoXKu5O.js";import"./input-with-examples-3kiytpCL.js";import"./math-output-me3cXzXD.js";import"./text-input-DttuQkw0.js";import"./index-8OBRI-bh.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-Yf867jpU.js";import"./base-radio-3rLOqkvP.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-rFAFMrR4.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-99Ppxiqn.js";import"./video-transcript-link-g12jSPmn.js";import"./answer-choices-x-keru26.js";import"./button-group-eBTrRsKy.js";import"./graph-oAZTfcPK.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-7OZQMH1X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-k4bRs4vK.js";import"./prop-check-box-GJ7Xmp8F.js";import"./range-input-zCtWZXYe.js";import"./marker-tbr2Jc7p.js";import"./answer-pill-UokG_Z2-.js";import"./sortable-zMQr5bax.js";import"./multi-renderer-qDxNRSAC.js";import"./hints-renderer-XHYGysL2.js";import"./components-4RnIAD2-.js";import"./util-YGO3C9Nm.js";import"./form-wrapped-text-field-u4mvTGGM.js";const no={title:"PerseusEditor/Widgets/Label Image/Marker"},v=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),h=m=>p("div",{className:l.css(v.wrapper),children:p(u,{...m})}),o=m=>p(h,{...{answers:[],choices:[],label:"",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50}}),t=m=>p(h,{...{answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50}});var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
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
  } as const);
  return <Wrapper {...props} />;
}`,...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var a,c,g;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
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
  } as const);
  return <Wrapper {...props} />;
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const ao=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,ao as __namedExportsOrder,no as default};
