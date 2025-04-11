import{j as r}from"./jsx-runtime-BT65X5dW.js";import"./all-widgets-DEn0Y4JJ.js";import{V as f}from"./index-CskvhqFA.js";import"./answer-choices-DU9fOrLj.js";import"./index-CbNKSLRm.js";import{r as v}from"./index-C6mWTJJr.js";import"./index-B1Gws05u.js";import{P as w,m as j}from"./i18n-context-3AkWzTTj.js";import"./perseus-api-Ty_QvlNi.js";import"./renderer-BtUcJPDb.js";import"./index-D7h-teXI.js";import"./jquery-CkHB0_Mt.js";import"./underscore-U-AHniOr.js";import"./dependencies-BsVPGK1s.js";import"./util-DwbObvuA.js";import"./zoomable-tex-Dy-nElJT.js";import"./svg-image-BdyKxVxV.js";import"./core-widget-registry-uDhx67d3.js";import"./no-important-DlFk8a1I.js";import"./number-input-Bfpkakta.js";import"./simple-keypad-input-RPQkkjpJ.js";import"./text-input-DMMXsyY1.js";import"./phet-simulation-ylWgoYlI.js";import"./sortable-GEeSu96O.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./math-input-BmEVS56k.js";import"./video-transcript-link-C7EJC_3o.js";import"./item-version-B33j_Ozm.js";import"./article-renderer-BQ8SNDZ2.js";import"./server-item-renderer-Ck2ZylAM.js";import"./hints-renderer-pZx2q0Sw.js";import"./base-radio-t3uzag9T.js";import"./button-group-CrIfrEdw.js";import"./hud-CP_ly967.js";import"./icon-BfyZ3piz.js";import"./index-CnlhjbO_.js";import"./inline-icon-AJRwMA4Z.js";import"./multi-button-group-U6RQwTwG.js";import"./range-input-D1azgtUf.js";import"./text-list-editor-HcP7oGoC.js";import"./index-Dd-cahjY.js";import{s as W}from"./index-CjnMbH_2.js";import{a as E}from"./article-renderer.testdata-BhE1T5ao.js";import{q as P}from"./radio.testdata-C06gW6g0.js";import{D as q}from"./device-framer-DIhcv6s8.js";import{V as y}from"./viewport-resizer-80AQQU5u.js";import{C as g}from"./content-preview-DHcu8HHa.js";/* empty css                       */import"./prop-types-B9crAhmV.js";import"./mobile-keypad-BBtXo6PC.js";import"./index-3H81sEQ1.js";import"./index-BzwLglMS.js";import"./assertThisInitialized-B9jnkVVz.js";import"./index-KFdEgasi.js";import"./_commonjsHelpers-BosuxZz1.js";import"./tiny-invariant-CopsF_GD.js";import"./tabbar-CZSBNGic.js";import"./item-BLUJCfQ8.js";import"./button-assets-jgEZxWWu.js";import"./get-decimal-separator-B2cicA45.js";import"./keypad-button-BJU3sZeL.js";import"./operators-page-C4Y73DnP.js";import"./navigation-pad-B5FLjl7S.js";import"./key-translator-B6uZInnl.js";import"./index-CrGd2QqM.js";import"./index-BvHsycGa.js";import"./index-Dr3BtBNU.js";import"./index-C1fpYtXO.js";import"./index-CIHqsnLr.js";import"./index-CbIoTxL4.js";import"./Popper-Bj3TCzZA.js";import"./perseus-error-CSETqePQ.js";import"./input-with-examples-ChDWIcrc.js";import"./icon-paths-C3bPmxpL.js";import"./media-queries-D4w_O5TS.js";import"./constants-BIpV3g0K.js";import"./shared-Dtpp87RV.js";import"./index-BEYgOkb5.js";import"./index-CQe11mMd.js";import"./index-fj4wzhGb.js";import"./marker-H-qlgcAj.js";import"./answer-pill-BlYLD3eh.js";import"./index-GAWk9lgC.js";import"./index-BePo9uoZ.js";import"./stub-tag-editor-B8lH250S.js";import"./tex-BONImhZG.js";import"./zoomable-C_CCSKDG.js";import"./lint-D0FI20JF.js";import"./client-CAS5PaPY.js";import"./image-loader-CdkY-jNs.js";import"./index-DgUBVOst.js";import"./choice-CXgk4y02.js";import"./choice-icon-DwA_aU-v.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-gZhybWxb.js";import"./choice-none-above-D4Ao0ZOB.js";import"./constants-kyOY0S4e.js";import"./components-C9jZ8EKg.js";import"./icon-paths-Cfjy_uoj.js";const C=t=>{const[m,x]=v.useState("phone");return r.jsxs(f,{children:[r.jsx(y,{deviceType:m,onViewportSizeChanged:x}),r.jsx(q,{nochrome:!1,deviceType:m,children:r.jsx(g,{...t})})]})},vt={title:"PerseusEditor/Content Preview",component:g,decorators:[t=>r.jsx(f,{style:{margin:W.xxSmall_6},children:r.jsx(w,{strings:j,locale:"en",children:r.jsx(t,{})})})],render:t=>r.jsx(C,{...t})},o={args:{question:P}},e={args:{question:E}},i={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

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
}`,...(l=(u=i.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const wt=["Exercise","Article","WithLintErrors"];export{e as Article,o as Exercise,i as WithLintErrors,wt as __namedExportsOrder,vt as default};
