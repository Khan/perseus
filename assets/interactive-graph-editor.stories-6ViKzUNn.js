import{j as p}from"./jsx-runtime-BGVbfQ2Z.js";import{r as c}from"./index-qhcEwEpg.js";import{I as s,f as V}from"./flags-for-api-options-xiw1yEKw.js";import{g as X}from"./util-RicqMZ0C.js";import{I as Y}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-WvQWLN3r.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-OpXxk17X.js";import"./dependencies-fnqF3NiV.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./jquery-5v7aFUvu.js";import"./svg-image-xT-AdWRe.js";import"./index-TymzEsVR.js";import"./index-awljIyHI.js";import"./index-oMd7J_hd.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./article-renderer-CfMZ0raB.js";import"./prop-types-3U8aPQU9.js";import"./index-AMPNwp1g.js";import"./tabbar-RiuhgrwC.js";import"./item-UPBCIzra.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./index-JT1-kTlx.js";import"./key-translator-LscBjx_B.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-z9rWSR-h.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-ctkvcPpY.js";import"./index-wU63jaE4.js";import"./index-B3k62xyQ.js";import"./index-O-KD2pfb.js";import"./index-D5BWnz-K.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-ZA3sNY0n.js";import"./index-JYyfyxPN.js";import"./unit-uxf7imOh.js";import"./input-with-examples-LExXbWq1.js";import"./math-output-xqbS761x.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-ioObjG0H.js";import"./base-radio-fBmWjiK5.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-I7vspaEF.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-dQNhc1ou.js";import"./video-transcript-link-XsIXgcwt.js";import"./answer-choices-pUTJh6qw.js";import"./button-group-eBTrRsKy.js";import"./graph-cl_EfieJ.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-xms-bDN2.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-Z3f7giBx.js";import"./range-input-IMzA4hKn.js";import"./marker-HYWYvCk-.js";import"./answer-pill-yTPXaj9l.js";import"./sortable-OgepMx9Y.js";import"./multi-renderer-S-51dG1a.js";import"./hints-renderer-uHGOXOMU.js";import"./components-D6ZoG2gO.js";import"./interactive-graph-settings-lieGTxfq.js";import"./toggleable-caret-1K5GCJBX.js";import"./locked-figures-section-eCQifnw9.js";import"./locked-ellipse-settings-sANeSO6o.js";import"./color-select-YsnYXCes.js";import"./color-swatch-yr1PCf22.js";import"./locked-figure-settings-actions-1VXcFq7Z.js";import"./locked-line-settings-6LZtEdxY.js";import"./labeled-switch-x5Wo3s19.js";import"./line-swatch-WCT2dGsG.js";import"./locked-point-settings-Y9Zn-rZv.js";import"./locked-vector-settings-ijEXF0D_.js";const Z={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...Y},f={apiOptions:{flags:V},graph:{type:"segment"},correct:{type:"segment"}},i=X("point"),Zt={title:"PerseusEditor/Widgets/Interactive Graph Editor",component:s,argTypes:Z},g=a=>p(s,{...a});g.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const d={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=c.useReducer(e,{});return p(s,{...t,onChange:r})}},m={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=c.useReducer(e,f);return p(s,{...t,onChange:r})}},l={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=c.useReducer(e,{...f,graph:{type:"polygon"},correct:{type:"polygon",numSides:4,showAngles:!0,showSides:!0,snapTo:"angles"}});return p(s,{...t,onChange:r})}},u={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=c.useReducer(e,{...f,lockedFigures:[{...i,coord:[1,1]},{...i,coord:[-1,-1]}]});return p(s,{...t,onChange:r})}},h={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=c.useReducer(e,{...f,lockedFigures:[{type:"line",kind:"line",points:[{...i,coord:[0,2]},{...i,coord:[2,3]}],color:"green",lineStyle:"solid",showPoint1:!1,showPoint2:!1},{type:"line",kind:"ray",points:[{...i,color:"pink",coord:[0,0]},{...i,color:"pink",coord:[4,2]}],color:"pink",lineStyle:"solid",showPoint1:!0,showPoint2:!1},{type:"line",kind:"segment",points:[{...i,color:"grayH",coord:[0,-2]},{...i,color:"grayH",coord:[4,0]}],color:"grayH",lineStyle:"solid",showPoint1:!0,showPoint2:!0}]});return p(s,{...t,onChange:r})}},y={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=c.useReducer(e,{...f,lockedFigures:[{type:"ellipse",center:[0,0],radius:[5,2],angle:0,color:"green",fillStyle:"translucent",strokeStyle:"solid"}]});return p(s,{...t,onChange:r})}};var w,k,P;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(P=(k=g.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var S,R,E,v,I;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {});
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(E=(R=d.parameters)==null?void 0:R.docs)==null?void 0:E.source},description:{story:`Example of what the InteractiveGraphEditor experience is when all
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(I=(v=d.parameters)==null?void 0:v.docs)==null?void 0:I.description}}};var G,b,C,x,L;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, mafsOptions);
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(C=(b=m.parameters)==null?void 0:b.docs)==null?void 0:C.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph.`,...(L=(x=m.parameters)==null?void 0:x.docs)==null?void 0:L.description}}};var T,W,F,O,j;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {
      ...mafsOptions,
      graph: {
        type: "polygon"
      },
      correct: {
        type: "polygon",
        numSides: 4,
        showAngles: true,
        showSides: true,
        snapTo: "angles"
      }
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(F=(W=l.parameters)==null?void 0:W.docs)==null?void 0:F.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph to create Polygons.`,...(j=(O=l.parameters)==null?void 0:O.docs)==null?void 0:j.description}}};var A,H,M,q,D;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {
      // Use locked figures with mafs only.
      ...mafsOptions,
      lockedFigures: [{
        ...defaultPointProps,
        coord: [1, 1]
      }, {
        ...defaultPointProps,
        coord: [-1, -1]
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(M=(H=u.parameters)==null?void 0:H.docs)==null?void 0:M.source},description:{story:`This InteractiveGraphEditor has locked points.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(D=(q=u.parameters)==null?void 0:q.docs)==null?void 0:D.description}}};var U,_,z,B,J;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {
      // Use locked figures with mafs only.
      ...mafsOptions,
      lockedFigures: [{
        type: "line",
        kind: "line",
        points: [{
          ...defaultPointProps,
          coord: [0, 2]
        }, {
          ...defaultPointProps,
          coord: [2, 3]
        }],
        color: "green",
        lineStyle: "solid",
        showPoint1: false,
        showPoint2: false
      }, {
        type: "line",
        kind: "ray",
        points: [{
          ...defaultPointProps,
          color: "pink",
          coord: [0, 0]
        }, {
          ...defaultPointProps,
          color: "pink",
          coord: [4, 2]
        }],
        color: "pink",
        lineStyle: "solid",
        showPoint1: true,
        showPoint2: false
      }, {
        type: "line",
        kind: "segment",
        points: [{
          ...defaultPointProps,
          color: "grayH",
          coord: [0, -2]
        }, {
          ...defaultPointProps,
          color: "grayH",
          coord: [4, 0]
        }],
        color: "grayH",
        lineStyle: "solid",
        showPoint1: true,
        showPoint2: true
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(z=(_=h.parameters)==null?void 0:_.docs)==null?void 0:z.source},description:{story:`This InteractiveGraphEditor has a locked line segment, line, and ray.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(J=(B=h.parameters)==null?void 0:B.docs)==null?void 0:J.description}}};var K,N,Q;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {
      // Use locked figures with mafs only.
      ...mafsOptions,
      lockedFigures: [{
        type: "ellipse",
        center: [0, 0],
        radius: [5, 2],
        angle: 0,
        color: "green",
        fillStyle: "translucent",
        strokeStyle: "solid"
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(Q=(N=y.parameters)==null?void 0:N.docs)==null?void 0:Q.source}}};const $t=["Default","Controlled","WithMafs","WithMafsPolygon","WithLockedPoints","WithLockedLines","WithLockedEllipses"];export{d as Controlled,g as Default,y as WithLockedEllipses,h as WithLockedLines,u as WithLockedPoints,m as WithMafs,l as WithMafsPolygon,$t as __namedExportsOrder,Zt as default};
