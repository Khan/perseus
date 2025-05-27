import{j as r}from"./jsx-runtime-BT65X5dW.js";import{V as m}from"./index-DyG-XbLr.js";import{H as u}from"./hints-renderer-C62gY8Lh.js";import{A as d}from"./perseus-api-fTM3z0tF.js";import{i as e}from"./interactive-graph-question-builder-ICjdvGjt.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./no-important-DlFk8a1I.js";import"./renderer-C1IoSrZC.js";import"./index-default-BcKQpA1a.js";import"./index-DktHmiAd.js";import"./perseus-error-CSETqePQ.js";import"./util-AEEC48XJ.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./index-CrGd2QqM.js";import"./index-BzwLglMS.js";import"./index-D7h-teXI.js";import"./index-B1Gws05u.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./i18n-context-CwGtWZ68.js";import"./svg-image-8T6Bqk5w.js";import"./index-DD9muzfp.js";import"./index-C0xJ1VDw.js";import"./index-BfjDPqC2.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./constants-BIpV3g0K.js";import"./client-CAS5PaPY.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./image-loader-CdkY-jNs.js";import"./lint-D0FI20JF.js";import"./media-queries-D4w_O5TS.js";import"./shared-Dtpp87RV.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./index-Dd-cahjY.js";import"./tiny-invariant-CopsF_GD.js";const h=d.defaults,te={title:"Perseus/Renderers/Hints Renderer",component:u,decorators:[c=>r.jsx(m,{style:{left:80},children:r.jsx(c,{})})],argTypes:{hintsVisible:{control:{min:0},defaultValue:3}}},i={args:{hints:[{content:"this is hint 1",images:{},replace:!1,widgets:{}},{content:"this is hint 2",images:{},replace:!1,widgets:{}},{content:"this is hint 3",images:{},replace:!1,widgets:{}}]}},t={args:{apiOptions:h,hints:[{...e().withAngle().build(),replace:!1},{...e().withCircle().build(),replace:!1},{...e().withLinear().build(),replace:!1},{...e().withLinearSystem().build(),replace:!1},{...e().withPoints(3).build(),replace:!1},{...e().withPolygon().build(),replace:!1},{...e().withRay().build(),replace:!1},{...e().withSegments().build(),replace:!1},{...e().withQuadratic().build(),replace:!1},{...e().withSinusoid().build(),replace:!1}]}};var n,a,s;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    hints: [{
      content: "this is hint 1",
      images: {},
      replace: false,
      widgets: {}
    }, {
      content: "this is hint 2",
      images: {},
      replace: false,
      widgets: {}
    }, {
      content: "this is hint 3",
      images: {},
      replace: false,
      widgets: {}
    }]
  }
}`,...(s=(a=i.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var l,o,p;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    apiOptions: defaultApiOptions,
    hints: [{
      ...interactiveGraphQuestionBuilder().withAngle().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withCircle().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withLinear().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withLinearSystem().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withPoints(3).build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withPolygon().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withRay().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withSegments().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withQuadratic().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withSinusoid().build(),
      replace: false
    }]
  }
}`,...(p=(o=t.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};const re=["Interactive","WithAllInteractiveGraphs"];export{i as Interactive,t as WithAllInteractiveGraphs,re as __namedExportsOrder,te as default};
