import{j as r}from"./jsx-runtime-BT65X5dW.js";import"./underscore-U-AHniOr.js";import"./index-BGZPTKJ1.js";import"./all-widgets-BxqYmSlK.js";import{V as f}from"./index-CW2s7ekB.js";import"./answer-choices-CzD6p2WE.js";import"./index-CFvGmn7i.js";import{r as v}from"./index-C6mWTJJr.js";import"./index-B1Gws05u.js";import{P as w,m as j}from"./i18n-context-3AkWzTTj.js";import"./perseus-api-Ty_QvlNi.js";import"./renderer-BQnqw_bS.js";import"./index-D7h-teXI.js";import"./jquery-CkHB0_Mt.js";import"./dependencies-BsVPGK1s.js";import"./util-BZVT15oW.js";import"./zoomable-tex-Dy-nElJT.js";import"./svg-image-CiYXMMWe.js";import"./no-important-DlFk8a1I.js";import"./number-input-N6NlG4cu.js";import"./simple-keypad-input-B5FHAE1F.js";import"./text-input-DX6O0s2s.js";import"./phet-simulation-DSu5lgF2.js";import"./sortable-T7pPQHk4.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./math-input-c9CwVTBX.js";import"./video-transcript-link-BsyCgIOs.js";import"./item-version-DEniaf-W.js";import"./article-renderer-XhZ35AMj.js";import"./server-item-renderer-DbGjM8D_.js";import"./hints-renderer-BZ-4Zvd5.js";import"./base-radio-Bs1bZn8h.js";import"./button-group-CrIfrEdw.js";import"./hud-CP_ly967.js";import"./icon-BfyZ3piz.js";import"./index-C4D8Bo9-.js";import"./inline-icon-AJRwMA4Z.js";import"./multi-button-group-U6RQwTwG.js";import"./range-input-CQQdELOs.js";import"./text-list-editor-HcP7oGoC.js";import"./index-Dd-cahjY.js";import{s as W}from"./index-Ds5N5m2R.js";import{a as E}from"./article-renderer.testdata-BhE1T5ao.js";import{q as P}from"./radio.testdata-BxskjDkr.js";import{D as q}from"./device-framer-DIhcv6s8.js";import{V as y}from"./viewport-resizer-D6e6NRSm.js";import{C as g}from"./content-preview-BvmsFICK.js";/* empty css                       */import"./_commonjsHelpers-BosuxZz1.js";import"./prop-types-DPSiQdhc.js";import"./mobile-keypad-DFrgxEQk.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-DIFuz7Pv.js";import"./tabbar-MpFAbKP0.js";import"./item-bIeXIAjZ.js";import"./index-CazpBUXm.js";import"./extends-DDykod_l.js";import"./button-assets-Co79gGh-.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-Ckeya4lx.js";import"./operators-page-DCxIUjpq.js";import"./navigation-pad-D67yemnZ.js";import"./key-translator-D1CXf9G3.js";import"./index-CrGd2QqM.js";import"./index-qaYZOyAC.js";import"./index-ZfDK3AP8.js";import"./index-DAJiRA_A.js";import"./index-Bdux6mmb.js";import"./index-CUPgSPQO.js";import"./Popper-Bj3TCzZA.js";import"./perseus-error-CSETqePQ.js";import"./input-with-examples-Da61fFRL.js";import"./constants-BIpV3g0K.js";import"./media-queries-D4w_O5TS.js";import"./choice-Bj0k_uqp.js";import"./index-DIAPPyDo.js";import"./index-DEiJo70o.js";import"./index-BXjKE-B5.js";import"./choice-icon-CV0CEgs0.js";import"./icon-paths-C3bPmxpL.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CqSyvrjW.js";import"./shared-Dtpp87RV.js";import"./tiny-invariant-CopsF_GD.js";import"./marker-BH8ctVWK.js";import"./answer-pill-B3iusx6N.js";import"./index-zDEGjj32.js";import"./index-C3jIZeAf.js";import"./stub-tag-editor-B8lH250S.js";import"./tex-BONImhZG.js";import"./zoomable-C_CCSKDG.js";import"./lint-D0FI20JF.js";import"./client-CAS5PaPY.js";import"./image-loader-CdkY-jNs.js";import"./index-Ck9WKKww.js";import"./choice-none-above-DIm4SgKb.js";import"./constants-kyOY0S4e.js";import"./components-BjYbk8jk.js";import"./icon-paths-Cfjy_uoj.js";const C=t=>{const[m,x]=v.useState("phone");return r.jsxs(f,{children:[r.jsx(y,{deviceType:m,onViewportSizeChanged:x}),r.jsx(q,{nochrome:!1,deviceType:m,children:r.jsx(g,{...t})})]})},wt={title:"PerseusEditor/Content Preview",component:g,decorators:[t=>r.jsx(f,{style:{margin:W.xxSmall_6},children:r.jsx(w,{strings:j,locale:"en",children:r.jsx(t,{})})})],render:t=>r.jsx(C,{...t})},o={args:{question:P}},e={args:{question:E}},i={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

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
