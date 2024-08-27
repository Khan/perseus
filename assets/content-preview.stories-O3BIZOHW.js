import{j as e,a as x,F as W}from"./jsx-runtime-5BUNAZ9W.js";import"./article-renderer-1I1Taxvu.js";import"./index-default-4_ZsnO94.js";import"./util-d6C3c8a_.js";import"./phet-simulation-yAotX045.js";import"./version-akiLXZts.js";import"./dependencies-9B_Bv_mA.js";import"./perseus-api-7QXTiCE7.js";import"./multi-renderer-v7Jz5qbQ.js";import"./hints-renderer-K9CfJJtj.js";import{R as D}from"./renderer-VvMXHswL.js";import"./base-radio-CtTtLwz6.js";import"./button-group-KR3umc1e.js";import"./graph-RB5WYwBs.js";import"./svg-image-EUHSmEMe.js";import"./hud-CJYktPgf.js";import"./icon-TA3bBVIW.js";import"./index-OKe1jTBT.js";import"./inline-icon-QIU9thzn.js";import"./math-input-RxIJU-_B.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-sKwhP-P4.js";import"./range-input-yPkbA4e8.js";import"./text-input-8iYmwa_O.js";import"./text-list-editor-vhSOgXmq.js";import"./jquery-5v7aFUvu.js";import"./index-k-0mNqHS.js";import{u as R,a as A}from"./i18n-context-EATS0TCt.js";import{V as m}from"./index-e4P84RkC.js";import{s as b}from"./index-lUErx3pE.js";import{r as $}from"./index-4g5l5LRQ.js";import{c as I}from"./article-renderer.testdata-spwNviYy.js";import{m as L}from"./strings-4Ql_kQxk.js";import{b as O}from"./radio.testdata-2PKv1ek5.js";import{D as _}from"./device-framer-BNGT7Aao.js";import{V as k}from"./viewport-resizer-lCADPp_h.js";import{S as V,a as H,M}from"./mobile-keypad-cY_XnmKN.js";import"./prop-types-OyecWNts.js";import"./key-translator-Hs3Uhnzm.js";import"./button-assets-Z9EPvaqZ.js";import{l as j}from"./constants-hQyjCzwz.js";import{l as z}from"./index-awljIyHI.js";/* empty css                       */import"./enums-x5qaTru7.js";import"./perseus-error-l3K_anoI.js";import"./index-1f9rdEBk.js";import"./index-dnMhQZ-1.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./input-with-examples-B1P1GF_T.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-EuXaHn8w.js";import"./icon-paths-AuJwhOz7.js";import"./media-queries-MaBBbpNq.js";import"./constants-I_nlPaPx.js";import"./shared-3pf9YZIg.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-BnV5uYoZ.js";import"./objectWithoutPropertiesLoose-d0rO3Elc.js";import"./x-6ZxseNgc.js";import"./Popper-D86xJ3go.js";import"./answer-choices-pwC4QaE5.js";import"./index-wjVcXLkf.js";import"./index-zE8cp1oq.js";import"./minus-bold-ONmDo3Ve.js";import"./index-ApTSwHdG.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./index-QrS3OizK.js";import"./index-87tT_9ji.js";import"./index-zXbQRqKp.js";import"./asset-context-4nzQV6k0.js";import"./index-J2t_5nK1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./marker-RTQm2AnX.js";import"./answer-pill-4hUAzglA.js";import"./sortable-2a3MmMo0.js";import"./invariant-bu5zBsRS.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./video-transcript-link-73nuh6Qy.js";import"./index-QAkz3tPO.js";import"./stub-tag-editor-Fuvu94kh.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./lint-IvfTv29b.js";import"./choice-J9bjg8fB.js";import"./choice-icon-SWHWCeDz.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-405PnsLn.js";import"./choice-none-above-FkllYiGm.js";import"./client-MU6fCXSs.js";import"./image-loader-s-naDkf8.js";import"./index-ZpoNcJZi.js";import"./randomizers-tLYvdSLl.js";import"./components-SRrhS20b.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";function p({question:t,apiOptions:r,seamless:s,linterContext:P,legacyPerseusLint:T,previewDevice:q}){const C=R(),a=q!=="desktop";return e(m,{className:`framework-perseus ${a?"perseus-mobile":""}`,style:[c.container,s?void 0:c.gutter],children:e(V,{children:e(H.Consumer,{children:({setKeypadActive:S,keypadElement:E,setKeypadElement:N})=>x(W,{children:[e(D,{strings:C.strings,apiOptions:{...r,isMobile:a},keypadElement:E,linterContext:P,legacyPerseusLint:T,...t}),e(M,{onAnalyticsEvent:()=>Promise.resolve(),onDismiss:()=>S(!1),onElementMounted:N})]})})})})}const c=z.StyleSheet.create({container:{padding:b.xxxSmall_4,containerType:"inline-size",containerName:"perseus-root"},gutter:{marginRight:j}});p.__docgenInfo={description:"The `ContentPreview` component provides a simple preview system for Perseus\nContent. Due to how Persus styles are built, the preview styling matches the\ncurrent device based on the viewport width (using `@media` queries for\n`min-width` and `max-width`).\n\nThe preview will render the mobile variant (styling and layout) when the\n`previewDevice` is phone or tablet. Note that the styling cannot be matched\n100% due to the above `@media` query limitation.",methods:[],displayName:"ContentPreview",props:{question:{required:!1,tsType:{name:"PerseusRenderer"},description:""},apiOptions:{required:!1,tsType:{name:"APIOptions"},description:""},seamless:{required:!1,tsType:{name:"boolean"},description:""},linterContext:{required:!1,tsType:{name:"LinterContextProps"},description:""},legacyPerseusLint:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},previewDevice:{required:!0,tsType:{name:"DeviceType"},description:""}}};const F=t=>{const[r,s]=$.useState("phone");return x(m,{children:[e(k,{deviceType:r,onViewportSizeChanged:s}),e(_,{nochrome:!1,deviceType:r,children:e(p,{...t})})]})},jt={title:"PerseusEditor/Content Preview",component:p,decorators:[t=>e(m,{style:{margin:b.xxSmall_6},children:e(A,{strings:L,locale:"en",children:e(t,{})})})],render:t=>e(F,{...t})},o={args:{question:O}},i={args:{question:I}},n={args:{linterContext:{contentType:"exercise",highlightLint:!0,stack:[],paths:[]},question:{content:`# H1s bad

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
}`,...(w=(v=n.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const zt=["Exercise","Article","WithLintErrors"];export{i as Article,o as Exercise,n as WithLintErrors,zt as __namedExportsOrder,jt as default};
