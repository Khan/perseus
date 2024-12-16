import{j as i}from"./jsx-runtime-63Ea5SlK.js";import{a as p}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{l}from"./index-awljIyHI.js";import{M as u}from"./marker-UnGywe8V.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./article-renderer-WSalx0gO.js";import"./util-_iDv4tVD.js";import"./jquery-yG1GhClm.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./prop-types-3A1l5Zo1.js";import"./mobile-keypad-C4WzlYJE.js";import"./index-9gkyvru-.js";import"./index-7-BESUpx.js";import"./index-J2t_5nK1.js";import"./index-mBmS45op.js";import"./index-qqHuISYU.js";import"./index-dmcq622U.js";import"./assertThisInitialized-4q6YPdh3.js";import"./tabbar-78fjxKSi.js";import"./item-a8wzguDW.js";import"./button-assets-ozecF1qE.js";import"./keypad-button-05lEoDkM.js";import"./operators-page-pmCj9mWy.js";import"./navigation-pad-ImleHZzz.js";import"./key-translator-u6OvDcvl.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./renderer-j_M2Im6q.js";import"./index-dnMhQZ-1.js";import"./asset-context-H6Iqp7Gi.js";import"./i18n-context-8x3SvuMF.js";import"./svg-image-CjkzrssK.js";import"./index-CsLEG2RF.js";import"./dependencies-CP7Uh8Kq.js";import"./fixed-to-responsive-for_tVF1.js";import"./constants-iPV6vHZm.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-17De8yEj.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./perseus-api-1-ethIrW.js";import"./index-0C4KXdeC.js";import"./stub-tag-editor-qMhJW4bS.js";import"./text-list-editor-aj1SAzcA.js";import"./lint-CRWxUAIQ.js";import"./index-yskWdb_J.js";import"./index-qEp884-b.js";import"./index-_TZUXKdV.js";import"./index-7u-EAEig.js";import"./index-yN1k6wu6.js";import"./index-bqpQUxVv.js";import"./Popper-Y5KDXl-P.js";import"./math-input-nNW7dLOZ.js";import"./index-IOflpEkR.js";import"./input-with-examples-VOxXA4UI.js";import"./text-input-c9ERh2n0.js";import"./index-aqU7Evdr.js";import"./tooltip-Lp8Mlfe3.js";import"./simple-keypad-input-K8SNw_tt.js";import"./base-radio-GYGpXrFl.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./choice-QIZ3w0KX.js";import"./index-j8jHrVh7.js";import"./icon-7RFbyLiL.js";import"./choice-icon-QGlQMOUd.js";import"./focus-ring-qYEF-qqz.js";import"./option-status-qknO1Y0J.js";import"./choice-none-above-fDHVqwAj.js";import"./phet-simulation--j2mnZvl.js";import"./index-TZ9pJZqR.js";import"./answer-choices-KtMoUayl.js";import"./index-bItUyohT.js";import"./button-group-G5CZaedn.js";import"./graph-3SDlkCP1.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";import"./hud-ifw9Ofbw.js";import"./index-pboZUpmV.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-xohq0Rz5.js";import"./range-input-HEj_-e6o.js";import"./marker-W21NrB3W.js";import"./answer-pill-JtBcqfc3.js";import"./sortable-w_JAF9Gl.js";import"./video-transcript-link-V2LBj_oN.js";import"./perseus-item-RK_8grDM.js";import"./hints-renderer-DqPYkjzG.js";import"./components-M0fgWLxv.js";import"./global-colors-VIVU4Od4.js";import"./util-qk2aeK8X.js";import"./form-wrapped-text-field-q2LxQQ4u.js";const so={title:"PerseusEditor/Widgets/Label Image/Marker"},x=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=m=>i.jsx("div",{className:l.css(x.wrapper),children:i.jsx(u,{...m})}),o=m=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})},t=m=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{p("onChange")(...r)},onRemove:(...r)=>{p("onRemove")(...r)},x:50,y:50};return i.jsx(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var s,n,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
