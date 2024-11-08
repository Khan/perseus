import{j as m}from"./jsx-runtime-FVsy8kgq.js";import{V as Y}from"./index-6h5t6F0w.js";import{H as Z}from"./hints-renderer-0tODKVPs.js";import{i as e}from"./interactive-graph-question-builder-Mh2lh4tI.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./renderer-6wjvxpTF.js";import"./version-akiLXZts.js";import"./util-F8-MDmsT.js";import"./jquery-yG1GhClm.js";import"./invariant-bu5zBsRS.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./index-7vsPyIck.js";import"./asset-context-I7yIqWki.js";import"./i18n-context-P5sgPFep.js";import"./svg-image-4Vh9uTQ6.js";import"./index-deFLJwr4.js";import"./dependencies-d8cZibFS.js";import"./fixed-to-responsive-AkRQxH3P.js";import"./constants-iPV6vHZm.js";import"./client-rbWgHzHN.js";import"./inline-icon-NjJlm7d0.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-3HliPbpF.js";import"./tex-6yhnhbtf.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-hbM7rxrP.js";import"./perseus-api-Nq3s7IMx.js";import"./index-k-0mNqHS.js";import"./stub-tag-editor-74YQ4o9G.js";import"./text-list-editor-Jz35fIN1.js";import"./lint-kpBgzQ8K.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./index-IIMKO4_x.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-7jAAHVxW.js";const _e={title:"Perseus/Renderers/Hints Renderer",component:Z,decorators:[X=>m(Y,{style:{left:80},children:m(X,{})})],argTypes:{hintsVisible:{control:{min:0},defaultValue:3}}},r={args:{hints:[{content:"this is hint 1",images:{},replace:!1,widgets:{}},{content:"this is hint 2",images:{},replace:!1,widgets:{}},{content:"this is hint 3",images:{},replace:!1,widgets:{}}]}},i={args:{apiOptions:{flags:{mafs:{angle:!0,circle:!0,linear:!0,"linear-system":!0,point:!0,polygon:!0,ray:!0,segment:!0,quadratic:!0,sinusoid:!0}}},hints:[{...e().withAngle().build(),replace:!1},{...e().withCircle().build(),replace:!1},{...e().withLinear().build(),replace:!1},{...e().withLinearSystem().build(),replace:!1},{...e().withPoints(3).build(),replace:!1},{...e().withPolygon().build(),replace:!1},{...e().withRay().build(),replace:!1},{...e().withSegments().build(),replace:!1},{...e().withQuadratic().build(),replace:!1},{...e().withSinusoid().build(),replace:!1}]}},a={args:{apiOptions:{flags:{mafs:{segment:!0}}},hints:[{...e().build(),replace:!1}]}},n={args:{apiOptions:{flags:{mafs:{linear:!0}}},hints:[{...e().withLinear().build(),replace:!1}]}},t={args:{apiOptions:{flags:{mafs:{"linear-system":!0}}},hints:[{...e().withLinearSystem().build(),replace:!1}]}},s={args:{apiOptions:{flags:{mafs:{ray:!0}}},hints:[{...e().withRay().build(),replace:!1}]}},l={args:{apiOptions:{flags:{mafs:{circle:!0}}},hints:[{...e().withCircle().build(),replace:!1}]}},o={args:{apiOptions:{flags:{mafs:{quadratic:!0}}},hints:[{...e().withQuadratic().build(),replace:!1}]}},p={args:{apiOptions:{flags:{mafs:{circle:!0}}},hints:[{...e().withSinusoid().build(),replace:!1}]}},c={args:{apiOptions:{flags:{mafs:{polygon:!0}}},hints:[{...e().withPolygon().build(),replace:!1},{...e().withPolygon("angles").build(),replace:!1},{...e().withPolygon("sides").build(),replace:!1}]}},u={args:{apiOptions:{flags:{mafs:{point:!0}}},hints:[{...e().withPoints(3).build(),replace:!1}]}},h={args:{apiOptions:{flags:{mafs:{angle:!0}}},hints:[{...e().withAngle().build(),replace:!1}]}};var d,g,f;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var w,v,b;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          angle: true,
          circle: true,
          linear: true,
          "linear-system": true,
          point: true,
          polygon: true,
          ray: true,
          segment: true,
          quadratic: true,
          sinusoid: true
        }
      }
    },
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
}`,...(b=(v=i.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var G,y,Q;a.parameters={...a.parameters,docs:{...(G=a.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          segment: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().build(),
      replace: false
    }]
  }
}`,...(Q=(y=a.parameters)==null?void 0:y.docs)==null?void 0:Q.source}}};var S,I,B;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          linear: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withLinear().build(),
      replace: false
    }]
  }
}`,...(B=(I=n.parameters)==null?void 0:I.docs)==null?void 0:B.source}}};var O,W,P;t.parameters={...t.parameters,docs:{...(O=t.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          "linear-system": true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withLinearSystem().build(),
      replace: false
    }]
  }
}`,...(P=(W=t.parameters)==null?void 0:W.docs)==null?void 0:P.source}}};var L,R,A;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          ray: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withRay().build(),
      replace: false
    }]
  }
}`,...(A=(R=s.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var C,q,V;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          circle: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withCircle().build(),
      replace: false
    }]
  }
}`,...(V=(q=l.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};var x,H,j;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          quadratic: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withQuadratic().build(),
      replace: false
    }]
  }
}`,...(j=(H=o.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var _,E,T;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          circle: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withSinusoid().build(),
      replace: false
    }]
  }
}`,...(T=(E=p.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var k,z,D;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          polygon: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withPolygon().build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withPolygon("angles").build(),
      replace: false
    }, {
      ...interactiveGraphQuestionBuilder().withPolygon("sides").build(),
      replace: false
    }]
  }
}`,...(D=(z=c.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var F,J,K;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          point: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withPoints(3).build(),
      replace: false
    }]
  }
}`,...(K=(J=u.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var M,N,U;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    apiOptions: {
      flags: {
        mafs: {
          angle: true
        }
      }
    },
    hints: [{
      ...interactiveGraphQuestionBuilder().withAngle().build(),
      replace: false
    }]
  }
}`,...(U=(N=h.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};const Ee=["Interactive","WithAllInteractiveGraphs","WithSegmentInteractiveGraph","WithLinearInteractiveGraph","WithLinearSystemsInteractiveGraph","WithRayInteractiveGraph","WithCircleInteractiveGraph","WithQuadraticInteractiveGraph","WithSinusoidInteractiveGraph","WithPolygonInteractiveGraph","WithPointsInteractiveGraph","WithAngleInteractiveGraph"];export{r as Interactive,i as WithAllInteractiveGraphs,h as WithAngleInteractiveGraph,l as WithCircleInteractiveGraph,n as WithLinearInteractiveGraph,t as WithLinearSystemsInteractiveGraph,u as WithPointsInteractiveGraph,c as WithPolygonInteractiveGraph,o as WithQuadraticInteractiveGraph,s as WithRayInteractiveGraph,a as WithSegmentInteractiveGraph,p as WithSinusoidInteractiveGraph,Ee as __namedExportsOrder,_e as default};
