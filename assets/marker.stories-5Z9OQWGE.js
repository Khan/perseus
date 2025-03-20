import{a as i}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{n as h}from"./no-important-xCWWYXQR.js";import{r as m}from"./index-6oxdNXpR.js";import{M as u}from"./marker-Fd5G7OpC.js";import"./v4-yQnnJER4.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./all-widgets-8KQBz02C.js";import"./random-util-qPwTTOJz.js";import"./underscore-885MUNGo.js";import"./prop-types-6vNvOlq5.js";import"./mobile-keypad-0CwlVC6I.js";import"./index-9gkyvru-.js";import"./index-OQMtW1Q1.js";import"./index-J2t_5nK1.js";import"./index-hw7d7wq0.js";import"./assertThisInitialized-4q6YPdh3.js";import"./index-OMSOgf8r.js";import"./tiny-invariant-bHgPayXn.js";import"./index-zRqVZh6A.js";import"./tabbar-B0kYgJj9.js";import"./item-Ztp2GOp4.js";import"./button-assets-lxPOe30G.js";import"./get-decimal-separator-C5N_K9o2.js";import"./keypad-button-4gfuDl7X.js";import"./operators-page--9pv9isl.js";import"./navigation-pad-TF-D1qcK.js";import"./key-translator-XtkY5VKe.js";import"./index-o42urCig.js";import"./renderer-EEP7M_38.js";import"./perseus-error-l3K_anoI.js";import"./util-AXsb50Si.js";import"./jquery-5v7aFUvu.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-w6m6mqm2.js";import"./tex-q_4hQMGs.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-m_J-BBOg.js";import"./i18n-context-T9Cdk0dK.js";import"./svg-image-QtqEBn5V.js";import"./index--z92Kcj-.js";import"./fixed-to-responsive-8Rm8IBlT.js";import"./constants-vGHYchdS.js";import"./client-Rb4DelHy.js";import"./inline-icon-8e4u-lSW.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-qCu_dXQl.js";import"./perseus-api-Y55S7ZPk.js";import"./stub-tag-editor--BF0WBUz.js";import"./text-list-editor-9dKImvgD.js";import"./lint-a43UkMJQ.js";import"./index-X6BFiFsH.js";import"./index-sTgrFwmj.js";import"./index-Y1DiWZsM.js";import"./index-6pF6CjBQ.js";import"./index-jek-Xksa.js";import"./index-v_a-r9JG.js";import"./Popper-Y5KDXl-P.js";import"./math-input-OfplhNyP.js";import"./index-yKRLgHQQ.js";import"./simple-keypad-input-xvn74TpS.js";import"./input-with-examples-UdIuO5_Q.js";import"./text-input-W13PSE1A.js";import"./index-F5uqTDBi.js";import"./base-radio-iRTMK2L6.js";import"./media-queries-OayJ4KsJ.js";import"./choice-ma1WTLKm.js";import"./index-71P4mDMp.js";import"./icon-H34hvC3Q.js";import"./choice-icon-kzcJSngn.js";import"./focus-ring-bfQ0sQA2.js";import"./option-status-eBkcIAn2.js";import"./choice-none-above-VRs0xm5C.js";import"./shared-hWJYD-yu.js";import"./phet-simulation-ZEc6HIcw.js";import"./index-yTmR3PFw.js";import"./answer-choices-lt_PAgMc.js";import"./index-L0cWnnN3.js";import"./button-group-f5V3tSn8.js";import"./index-smZ6iCr_.js";import"./jsx-runtime-63Ea5SlK.js";import"./hud-VpTa1tZ-.js";import"./index-3j9EmwNK.js";import"./multi-button-group-7ejnk4_z.js";import"./number-input-arstEMF_.js";import"./range-input-EVLe-O5o.js";import"./marker-nz6Nko_i.js";import"./answer-pill-gCcyKlUK.js";import"./sortable-l35V_Cem.js";import"./video-transcript-link-t_KHpJXx.js";import"./server-item-renderer-G2iRM89f.js";import"./hints-renderer-btsZeGmx.js";import"./article-renderer-TSj2cCLy.js";import"./components-pH0UwuFS.js";import"./global-colors-VIVU4Od4.js";import"./form-wrapped-text-field-a77rIjBs.js";const mo={title:"PerseusEditor/Widgets/Label Image/Marker"},y=h.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=p=>m.createElement("div",{className:h.css(y.wrapper)},m.createElement(u,{...p})),o=p=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})},t=p=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,a,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
