import{j as r}from"./jsx-runtime-63Ea5SlK.js";import{V as m}from"./index-_3CKOwHy.js";import{H as u}from"./hints-renderer-1Q_lrB7o.js";import{A as d}from"./perseus-api-DO0X8arb.js";import{i as e}from"./interactive-graph-question-builder-00J3MhwK.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./no-important-xCWWYXQR.js";import"./renderer-rcyCCvDe.js";import"./index-default-4_ZsnO94.js";import"./core-widget-registry-uiKfW1Am.js";import"./perseus-error-l3K_anoI.js";import"./util-BtPxNFcx.js";import"./jquery-5v7aFUvu.js";import"./get-decimal-separator-c07pHhM9.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./index-9gkyvru-.js";import"./asset-context-H6Iqp7Gi.js";import"./i18n-context-60QTaC0J.js";import"./svg-image-gIyesq-y.js";import"./index-oE4Tpxqm.js";import"./index-QHkT31Yt.js";import"./dependencies-CP7Uh8Kq.js";import"./fixed-to-responsive-m4E_8Ehf.js";import"./constants-NhstHO4m.js";import"./client-Rb4DelHy.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-cBoFrbCq.js";import"./tex-MX5FPdQh.js";import"./zoomable-pOEbOEqK.js";import"./zoomable-tex-ZNdgOHRd.js";import"./lint-nh0b87yM.js";import"./media-queries-9nQcKCnE.js";import"./shared-xo4VhZjO.js";import"./index-o42urCig.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./index-smZ6iCr_.js";import"./tiny-invariant-bHgPayXn.js";const h=d.defaults,te={title:"Perseus/Renderers/Hints Renderer",component:u,decorators:[c=>r.jsx(m,{style:{left:80},children:r.jsx(c,{})})],argTypes:{hintsVisible:{control:{min:0},defaultValue:3}}},i={args:{hints:[{content:"this is hint 1",images:{},replace:!1,widgets:{}},{content:"this is hint 2",images:{},replace:!1,widgets:{}},{content:"this is hint 3",images:{},replace:!1,widgets:{}}]}},t={args:{apiOptions:h,hints:[{...e().withAngle().build(),replace:!1},{...e().withCircle().build(),replace:!1},{...e().withLinear().build(),replace:!1},{...e().withLinearSystem().build(),replace:!1},{...e().withPoints(3).build(),replace:!1},{...e().withPolygon().build(),replace:!1},{...e().withRay().build(),replace:!1},{...e().withSegments().build(),replace:!1},{...e().withQuadratic().build(),replace:!1},{...e().withSinusoid().build(),replace:!1}]}};var n,a,s;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
