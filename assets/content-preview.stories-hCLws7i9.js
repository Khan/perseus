import{j as e,a as x,F as W}from"./jsx-runtime-FVsy8kgq.js";import"./article-renderer-oI4YmYfU.js";import"./index-default-4_ZsnO94.js";import"./util-Q3BXsyUV.js";import"./phet-simulation-mWZYlqxH.js";import"./version-akiLXZts.js";import"./dependencies-8XILypbq.js";import"./perseus-api-TZuPrt69.js";import"./multi-renderer-P0C-I-iG.js";import"./hints-renderer-xXQhzKns.js";import{R as D}from"./renderer-_VS37mk6.js";import"./base-radio-tGYiHWel.js";import"./button-group-nsoLlHtM.js";import"./graph-7upsjcvo.js";import"./svg-image-1KPe8aE1.js";import"./hud-FI3E3dT_.js";import"./icon-YuYiVxsK.js";import"./index-sNnTAXhT.js";import"./inline-icon-tKY1iMkH.js";import"./math-input-7QTcx3Ho.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-pCzft7OM.js";import"./range-input-ayWbl0Ct.js";import"./text-input-UKLpKhjh.js";import"./text-list-editor-oYfrC68v.js";import"./jquery-5v7aFUvu.js";import{u as R,a as A}from"./i18n-context-W41LcU6B.js";import{V as m}from"./index-6h5t6F0w.js";import{s as b}from"./index-deFLJwr4.js";import{r as $}from"./index-TT1qJ6UJ.js";import{c as I}from"./article-renderer.testdata-spwNviYy.js";import{m as L}from"./strings-4Ql_kQxk.js";import{b as O}from"./radio.testdata-2PKv1ek5.js";import{D as _}from"./device-framer-C-zf2col.js";import{V as k}from"./viewport-resizer-ejsLEQqp.js";import{S as V,a as H,M}from"./mobile-keypad-6FB87h35.js";import"./prop-types-nSWwc1hR.js";import"./key-translator-w6GK8UdZ.js";import"./button-assets-txIojR3b.js";import{l as j}from"./constants-hQyjCzwz.js";import{l as z}from"./index-awljIyHI.js";/* empty css                       */import"./enums-x5qaTru7.js";import"./perseus-error-l3K_anoI.js";import"./index-h_CiYGGb.js";import"./index-dnMhQZ-1.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-7vsPyIck.js";import"./input-with-examples-Id57pxBf.js";import"./tooltip-S_hcgkAT.js";import"./simple-keypad-input-vsRGHRFI.js";import"./index-tvtfaFq4.js";import"./icon-paths-AuJwhOz7.js";import"./media-queries-MaBBbpNq.js";import"./constants-I_nlPaPx.js";import"./shared-3pf9YZIg.js";import"./index-u34vH4Ah.js";import"./index-dTfPrQ97.js";import"./index-KnMeZIm4.js";import"./index--wY930uG.js";import"./index-CkAxGj88.js";import"./Popper-kGnKOid7.js";import"./answer-choices-0G6D5qUP.js";import"./index-xuPsLuPk.js";import"./minus-bold-ONmDo3Ve.js";import"./choice-fYS92oPm.js";import"./index-ngddCaVG.js";import"./index-qUyqkRvh.js";import"./choice-icon-tgwIPBbY.js";import"./focus-ring-sgSTt4fM.js";import"./option-status-GwxF4Pf4.js";import"./asset-context-I7yIqWki.js";import"./index-J2t_5nK1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-7jAAHVxW.js";import"./marker-aR8pbMaX.js";import"./answer-pill-v_78Q0di.js";import"./sortable-Z65T0-N6.js";import"./fixed-to-responsive-1fSZ1n--.js";import"./video-transcript-link-iTc4P2FB.js";import"./arrow-square-out-bold-090vdhrx.js";import"./stub-tag-editor-PtEloNzA.js";import"./tex-VP4hirbI.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-MZi7Hqbp.js";import"./lint-I_5mQeXl.js";import"./choice-none-above-BfNQKOBW.js";import"./client-rbWgHzHN.js";import"./image-loader-mgyZcN0j.js";import"./index-aLQwBKgs.js";import"./randomizers-tLYvdSLl.js";import"./components-H6FlNzQ8.js";import"./tabbar-qQQo4fB1.js";import"./item--2I-4f2E.js";import"./keypad-button-Oyhkb2Xv.js";import"./operators-page-eUz2SZPX.js";import"./navigation-pad-L84zJoYQ.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";function p({question:t,apiOptions:r,seamless:s,linterContext:P,legacyPerseusLint:T,previewDevice:q}){const C=R(),a=q!=="desktop";return e(m,{className:`framework-perseus ${a?"perseus-mobile":""}`,style:[c.container,s?void 0:c.gutter],children:e(V,{children:e(H.Consumer,{children:({setKeypadActive:S,keypadElement:E,setKeypadElement:N})=>x(W,{children:[e(D,{strings:C.strings,apiOptions:{...r,isMobile:a},keypadElement:E,linterContext:P,legacyPerseusLint:T,...t}),e(M,{onAnalyticsEvent:()=>Promise.resolve(),onDismiss:()=>S(!1),onElementMounted:N})]})})})})}const c=z.StyleSheet.create({container:{padding:b.xxxSmall_4,containerType:"inline-size",containerName:"perseus-root"},gutter:{marginRight:j}});p.__docgenInfo={description:"The `ContentPreview` component provides a simple preview system for Perseus\nContent. Due to how Persus styles are built, the preview styling matches the\ncurrent device based on the viewport width (using `@media` queries for\n`min-width` and `max-width`).\n\nThe preview will render the mobile variant (styling and layout) when the\n`previewDevice` is phone or tablet. Note that the styling cannot be matched\n100% due to the above `@media` query limitation.",methods:[],displayName:"ContentPreview",props:{question:{required:!1,tsType:{name:"PerseusRenderer"},description:""},apiOptions:{required:!1,tsType:{name:"APIOptions"},description:""},seamless:{required:!1,tsType:{name:"boolean"},description:""},linterContext:{required:!1,tsType:{name:"LinterContextProps"},description:""},legacyPerseusLint:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},previewDevice:{required:!0,tsType:{name:"DeviceType"},description:""}}};const F=t=>{const[r,s]=$.useState("phone");return x(m,{children:[e(k,{deviceType:r,onViewportSizeChanged:s}),e(_,{nochrome:!1,deviceType:r,children:e(p,{...t})})]})},Ot={title:"PerseusEditor/Content Preview",component:p,decorators:[t=>e(m,{style:{margin:b.xxSmall_6},children:e(A,{strings:L,locale:"en",children:e(t,{})})})],render:t=>e(F,{...t})},o={args:{question:O}},i={args:{question:I}},n={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

Here is some unclosed math: $1+1=3

We should use \`\\dfrac{}\` instead of \`\\frac{}\`: $\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]`,widgets:{"radio 1":{type:"radio",options:{choices:[{content:"Red"},{content:"# Green"},{content:"Blue",correct:!0},{content:"None of these!",isNoneOfTheAbove:!0}]}}},images:{}}}};var d,l,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    question
  }
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var h,f,g;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    question: articleWithImages
  }
}`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,v,w;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(w=(v=n.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const _t=["Exercise","Article","WithLintErrors"];export{i as Article,o as Exercise,n as WithLintErrors,_t as __namedExportsOrder,Ot as default};
