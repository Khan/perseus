import{a as i}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{n as h}from"./no-important-xCWWYXQR.js";import{r as m}from"./index-6oxdNXpR.js";import{M as u}from"./marker-0DiKU_ob.js";import"./v4-yQnnJER4.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./all-widgets-QQfdAvPd.js";import"./util-pBxNglIl.js";import"./random-util-wZstT-Qs.js";import"./underscore-885MUNGo.js";import"./perseus-error-l3K_anoI.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-C5N_K9o2.js";import"./prop-types-wVdYMj4F.js";import"./mobile-keypad-JdnpSlpS.js";import"./index-9gkyvru-.js";import"./index-OQMtW1Q1.js";import"./index-J2t_5nK1.js";import"./index-iTGWTR8W.js";import"./assertThisInitialized-4q6YPdh3.js";import"./index-k8usAFZT.js";import"./tiny-invariant-bHgPayXn.js";import"./index-QHkT31Yt.js";import"./tabbar-zpu-45Sc.js";import"./item-Q2jDffTR.js";import"./button-assets-lecB0YuJ.js";import"./keypad-button-Q1001UgL.js";import"./operators-page-mvcqwar6.js";import"./navigation-pad-2BY_2cSo.js";import"./key-translator-B2TmbIpB.js";import"./index-o42urCig.js";import"./enums-x5qaTru7.js";import"./renderer-Kfrxosjs.js";import"./index-dnMhQZ-1.js";import"./zoomable-tex-vrUOkV3E.js";import"./tex-q_4hQMGs.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-m_J-BBOg.js";import"./i18n-context-7Qj84tw8.js";import"./svg-image-Prev2-2p.js";import"./index-oeg-q71o.js";import"./fixed-to-responsive-8Rm8IBlT.js";import"./constants-vGHYchdS.js";import"./client-Rb4DelHy.js";import"./inline-icon-8e4u-lSW.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-qCu_dXQl.js";import"./perseus-api-Y55S7ZPk.js";import"./stub-tag-editor--BF0WBUz.js";import"./text-list-editor-9dKImvgD.js";import"./lint-a43UkMJQ.js";import"./index-z5d8ny9G.js";import"./index-NdzxJoEP.js";import"./index-DQI2fDhH.js";import"./index-xxLWRBZ2.js";import"./index-OUR0CuKj.js";import"./index-86cQASob.js";import"./Popper-Y5KDXl-P.js";import"./math-input-p1GES6DI.js";import"./index-Q2smMtUQ.js";import"./simple-keypad-input-3TReSLdL.js";import"./input-with-examples-7Y5VBdPP.js";import"./text-input-mW04kMv9.js";import"./index-Mag-4PMw.js";import"./base-radio-znvjfwu0.js";import"./media-queries-OayJ4KsJ.js";import"./choice-E7oo2cZ3.js";import"./index-dLgOY9TT.js";import"./icon-H34hvC3Q.js";import"./choice-icon-7RXwth8f.js";import"./focus-ring-bfQ0sQA2.js";import"./option-status-vzaXeCas.js";import"./choice-none-above-7n-uJbRi.js";import"./shared-hWJYD-yu.js";import"./phet-simulation-wsSlKQip.js";import"./index-Pjx4unLq.js";import"./answer-choices-MKnS2irP.js";import"./index-pFS_Jhjg.js";import"./button-group-f5V3tSn8.js";import"./index-smZ6iCr_.js";import"./jsx-runtime-63Ea5SlK.js";import"./hud-VpTa1tZ-.js";import"./index-9tMpZISW.js";import"./multi-button-group-7ejnk4_z.js";import"./number-input-jZO9njCo.js";import"./range-input-L1sIIK8u.js";import"./marker-xuuBN6Rk.js";import"./answer-pill-YvRguRSp.js";import"./sortable-TaUdX__T.js";import"./video-transcript-link-4-OOVa7R.js";import"./server-item-renderer-kzQQVBZ0.js";import"./hints-renderer-Vtt9IJTi.js";import"./article-renderer-v0-wjUIK.js";import"./components-_7fl5BVz.js";import"./global-colors-VIVU4Od4.js";import"./form-wrapped-text-field-tT65vLnq.js";const po={title:"PerseusEditor/Widgets/Label Image/Marker"},y=h.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=p=>m.createElement("div",{className:h.css(y.wrapper)},m.createElement(u,{...p})),o=p=>{const e={answers:[],choices:[],label:"",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})},t=p=>{const e={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...r)=>{i("onChange")(...r)},onRemove:(...r)=>{i("onRemove")(...r)},x:50,y:50};return m.createElement(d,{...e})};o.__docgenInfo={description:"",methods:[],displayName:"Empty"};t.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var n,a,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(l=(g=t.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};const eo=["Empty","WithAnswers"];export{o as Empty,t as WithAnswers,eo as __namedExportsOrder,po as default};
