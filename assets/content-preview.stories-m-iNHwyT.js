import{j as r}from"./jsx-runtime-BT65X5dW.js";import"./all-widgets-Czjd7lN7.js";import{V as f}from"./index-CW2s7ekB.js";import"./answer-choices-C307ETSJ.js";import"./index-CFvGmn7i.js";import{r as v}from"./index-C6mWTJJr.js";import"./index-B1Gws05u.js";import{P as w,m as j}from"./i18n-context-3AkWzTTj.js";import"./perseus-api-Ty_QvlNi.js";import"./renderer-CIZRNe7W.js";import"./index-D7h-teXI.js";import"./jquery-CkHB0_Mt.js";import"./underscore-U-AHniOr.js";import"./dependencies-BsVPGK1s.js";import"./util-Cnd83mYg.js";import"./zoomable-tex-Dy-nElJT.js";import"./svg-image-BG_fwTJE.js";import"./core-widget-registry-EaDT6WdJ.js";import"./no-important-DlFk8a1I.js";import"./number-input-DJLc-JT-.js";import"./simple-keypad-input-DKAfK-Ek.js";import"./text-input-c7h_A2uZ.js";import"./phet-simulation-DSu5lgF2.js";import"./sortable-fE4eteb1.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./math-input-yoYWkwsT.js";import"./video-transcript-link-BsyCgIOs.js";import"./item-version-CqFgHd2R.js";import"./article-renderer-B4cgHB5E.js";import"./server-item-renderer-Bm7s5Z3N.js";import"./hints-renderer-D3trTJX5.js";import"./base-radio-BlkTs6zL.js";import"./button-group-CrIfrEdw.js";import"./hud-CP_ly967.js";import"./icon-BfyZ3piz.js";import"./index-C4D8Bo9-.js";import"./inline-icon-AJRwMA4Z.js";import"./multi-button-group-U6RQwTwG.js";import"./range-input-CFDi5ibj.js";import"./text-list-editor-HcP7oGoC.js";import"./index-Dd-cahjY.js";import{s as W}from"./index-Ds5N5m2R.js";import{a as E}from"./article-renderer.testdata-BhE1T5ao.js";import{q as P}from"./radio.testdata-BxskjDkr.js";import{D as q}from"./device-framer-DIhcv6s8.js";import{V as y}from"./viewport-resizer-r8YWJzpI.js";import{C as g}from"./content-preview-CbrhuBSq.js";/* empty css                       */import"./prop-types-BWpyLefs.js";import"./mobile-keypad-CYRmecKW.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-DIFuz7Pv.js";import"./tabbar-MpFAbKP0.js";import"./item-bIeXIAjZ.js";import"./index-CazpBUXm.js";import"./extends-DDykod_l.js";import"./button-assets-BuNVZDyI.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-DIY-uAvj.js";import"./operators-page-s8dl8sig.js";import"./navigation-pad-CPYKGzKa.js";import"./key-translator-CvzGIC3A.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CrGd2QqM.js";import"./index-qaYZOyAC.js";import"./index-ZfDK3AP8.js";import"./index-DAJiRA_A.js";import"./index-Bdux6mmb.js";import"./index-CUPgSPQO.js";import"./Popper-Bj3TCzZA.js";import"./perseus-error-CSETqePQ.js";import"./input-with-examples-Blh0uoKZ.js";import"./constants-BIpV3g0K.js";import"./media-queries-D4w_O5TS.js";import"./choice-Bj0k_uqp.js";import"./index-DIAPPyDo.js";import"./index-DEiJo70o.js";import"./index-BXjKE-B5.js";import"./choice-icon-CV0CEgs0.js";import"./icon-paths-C3bPmxpL.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CqSyvrjW.js";import"./shared-Dtpp87RV.js";import"./tiny-invariant-CopsF_GD.js";import"./marker-C7RgC5Jl.js";import"./answer-pill-DTNghp90.js";import"./index-zDEGjj32.js";import"./index-C3jIZeAf.js";import"./stub-tag-editor-B8lH250S.js";import"./tex-BONImhZG.js";import"./zoomable-C_CCSKDG.js";import"./lint-D0FI20JF.js";import"./client-CAS5PaPY.js";import"./image-loader-CdkY-jNs.js";import"./index-Ck9WKKww.js";import"./choice-none-above-Cco3eu2g.js";import"./constants-kyOY0S4e.js";import"./components-DBdgl4Nd.js";import"./icon-paths-Cfjy_uoj.js";const C=t=>{const[m,x]=v.useState("phone");return r.jsxs(f,{children:[r.jsx(y,{deviceType:m,onViewportSizeChanged:x}),r.jsx(q,{nochrome:!1,deviceType:m,children:r.jsx(g,{...t})})]})},wt={title:"PerseusEditor/Content Preview",component:g,decorators:[t=>r.jsx(f,{style:{margin:W.xxSmall_6},children:r.jsx(w,{strings:j,locale:"en",children:r.jsx(t,{})})})],render:t=>r.jsx(C,{...t})},o={args:{question:P}},e={args:{question:E}},i={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

Here is some unclosed math: $1+1=3

We should use \`\\dfrac{}\` instead of \`\\frac{}\`: $\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]`,widgets:{"radio 1":{type:"radio",options:{choices:[{content:"Red"},{content:"# Green"},{content:"Blue",correct:!0},{content:"None of these!",isNoneOfTheAbove:!0}]}}},images:{}}}};var n,p,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    question
  }
}`,...(s=(p=o.parameters)==null?void 0:p.docs)==null?void 0:s.source}}};var a,c,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    question: articleWithImages
  }
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var h,u,l;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    linterContext: {
      contentType: "exercise",
      highlightLint: true,
      stack: [],
      paths: []
    },
    question: {
      content: \`# H1s bad

Here is some unclosed math: $1+1=3

We should use \\\`\\\\dfrac{}\\\` instead of \\\`\\\\frac{}\\\`: $\\\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]\`,
      widgets: {
        "radio 1": {
          type: "radio",
          options: {
            choices: [{
              content: "Red"
            }, {
              content: "# Green"
            }, {
              content: "Blue",
              correct: true
            }, {
              content: "None of these!",
              isNoneOfTheAbove: true
            }]
          }
        }
      },
      images: {}
    }
  }
}`,...(l=(u=i.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const jt=["Exercise","Article","WithLintErrors"];export{e as Article,o as Exercise,i as WithLintErrors,jt as __namedExportsOrder,wt as default};
