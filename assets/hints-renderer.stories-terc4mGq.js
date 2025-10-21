import{ao as p,A as u,j as t,V as h}from"./iframe-BxY6-TkQ.js";import{H as f}from"./hints-renderer-BqEsfExB.js";import{i as e}from"./interactive-graph-question-builder-Drt-aKcK.js";const m=u.defaults,v={title:"Renderers/Hints Renderer",component:f,decorators:[d=>t.jsx(h,{style:{left:80},children:t.jsx(d,{})})],argTypes:{hintsVisible:{control:{min:0},defaultValue:3}}},i={args:{dependencies:p,hints:[{content:"this is hint 1",images:{},replace:!1,widgets:{}},{content:"this is hint 2",images:{},replace:!1,widgets:{}},{content:"this is hint 3",images:{},replace:!1,widgets:{}}]}},n={args:{apiOptions:m,dependencies:p,hints:[{...e().withAngle().build(),replace:!1},{...e().withCircle().build(),replace:!1},{...e().withLinear().build(),replace:!1},{...e().withLinearSystem().build(),replace:!1},{...e().withPoints(3).build(),replace:!1},{...e().withPolygon().build(),replace:!1},{...e().withRay().build(),replace:!1},{...e().withSegments().build(),replace:!1},{...e().withQuadratic().build(),replace:!1},{...e().withSinusoid().build(),replace:!1}]}};var a,s,r;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    dependencies: storybookDependenciesV2,
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
}`,...(r=(s=i.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};var l,c,o;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    apiOptions: defaultApiOptions,
    dependencies: storybookDependenciesV2,
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
}`,...(o=(c=n.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};const G=["Interactive","WithAllInteractiveGraphs"];export{i as Interactive,n as WithAllInteractiveGraphs,G as __namedExportsOrder,v as default};
