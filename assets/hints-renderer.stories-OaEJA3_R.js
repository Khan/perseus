import{j as m}from"./jsx-runtime-FVsy8kgq.js";import{V as Y}from"./index-6h5t6F0w.js";import{H as Z}from"./hints-renderer-S6zO6eaw.js";import{i as e}from"./interactive-graph-question-builder-2x0pkXFd.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./renderer-K8s-5Tfh.js";import"./version-akiLXZts.js";import"./util-XcxTwqb0.js";import"./jquery-yG1GhClm.js";import"./invariant-bu5zBsRS.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./index-7vsPyIck.js";import"./asset-context-I7yIqWki.js";import"./svg-image-b1fhB-gm.js";import"./index-deFLJwr4.js";import"./dependencies-8XILypbq.js";import"./fixed-to-responsive-1fSZ1n--.js";import"./constants-I_nlPaPx.js";import"./client-rbWgHzHN.js";import"./inline-icon-tKY1iMkH.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-mgyZcN0j.js";import"./tex-VP4hirbI.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-MZi7Hqbp.js";import"./perseus-api--FMzJRa0.js";import"./index-0C4KXdeC.js";import"./stub-tag-editor-Hmby24Jq.js";import"./text-list-editor-pe7AGDAl.js";import"./lint-I_5mQeXl.js";import"./i18n-context-W41LcU6B.js";import"./strings-4Ql_kQxk.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";const He={title:"Perseus/Renderers/Hints Renderer",component:Z,decorators:[X=>m(Y,{style:{left:80},children:m(X,{})})],argTypes:{hintsVisible:{control:{min:0},defaultValue:3}}},r={args:{hints:[{content:"this is hint 1",images:{},replace:!1,widgets:{}},{content:"this is hint 2",images:{},replace:!1,widgets:{}},{content:"this is hint 3",images:{},replace:!1,widgets:{}}]}},a={args:{apiOptions:{flags:{mafs:{angle:!0,circle:!0,linear:!0,"linear-system":!0,point:!0,polygon:!0,ray:!0,segment:!0,quadratic:!0,sinusoid:!0}}},hints:[{...e().withAngle().build(),replace:!1},{...e().withCircle().build(),replace:!1},{...e().withLinear().build(),replace:!1},{...e().withLinearSystem().build(),replace:!1},{...e().withPoints(3).build(),replace:!1},{...e().withPolygon().build(),replace:!1},{...e().withRay().build(),replace:!1},{...e().withSegments().build(),replace:!1},{...e().withQuadratic().build(),replace:!1},{...e().withSinusoid().build(),replace:!1}]}},i={args:{apiOptions:{flags:{mafs:{segment:!0}}},hints:[{...e().build(),replace:!1}]}},n={args:{apiOptions:{flags:{mafs:{linear:!0}}},hints:[{...e().withLinear().build(),replace:!1}]}},t={args:{apiOptions:{flags:{mafs:{"linear-system":!0}}},hints:[{...e().withLinearSystem().build(),replace:!1}]}},s={args:{apiOptions:{flags:{mafs:{ray:!0}}},hints:[{...e().withRay().build(),replace:!1}]}},l={args:{apiOptions:{flags:{mafs:{circle:!0}}},hints:[{...e().withCircle().build(),replace:!1}]}},o={args:{apiOptions:{flags:{mafs:{quadratic:!0}}},hints:[{...e().withQuadratic().build(),replace:!1}]}},p={args:{apiOptions:{flags:{mafs:{circle:!0}}},hints:[{...e().withSinusoid().build(),replace:!1}]}},c={args:{apiOptions:{flags:{mafs:{polygon:!0}}},hints:[{...e().withPolygon().build(),replace:!1},{...e().withPolygon("angles").build(),replace:!1},{...e().withPolygon("sides").build(),replace:!1}]}},u={args:{apiOptions:{flags:{mafs:{point:!0}}},hints:[{...e().withPoints(3).build(),replace:!1}]}},h={args:{apiOptions:{flags:{mafs:{angle:!0}}},hints:[{...e().withAngle().build(),replace:!1}]}};var d,g,f;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var w,v,b;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(b=(v=a.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var G,y,Q;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(Q=(y=i.parameters)==null?void 0:y.docs)==null?void 0:Q.source}}};var S,I,B;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(U=(N=h.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};const je=["Interactive","WithAllInteractiveGraphs","WithSegmentInteractiveGraph","WithLinearInteractiveGraph","WithLinearSystemsInteractiveGraph","WithRayInteractiveGraph","WithCircleInteractiveGraph","WithQuadraticInteractiveGraph","WithSinusoidInteractiveGraph","WithPolygonInteractiveGraph","WithPointsInteractiveGraph","WithAngleInteractiveGraph"];export{r as Interactive,a as WithAllInteractiveGraphs,h as WithAngleInteractiveGraph,l as WithCircleInteractiveGraph,n as WithLinearInteractiveGraph,t as WithLinearSystemsInteractiveGraph,u as WithPointsInteractiveGraph,c as WithPolygonInteractiveGraph,o as WithQuadraticInteractiveGraph,s as WithRayInteractiveGraph,i as WithSegmentInteractiveGraph,p as WithSinusoidInteractiveGraph,je as __namedExportsOrder,He as default};
