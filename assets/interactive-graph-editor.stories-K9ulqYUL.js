import{j as c}from"./jsx-runtime-BGVbfQ2Z.js";import{r as p}from"./index-qhcEwEpg.js";import{I as s,f as $}from"./flags-for-api-options-sOF9M4R0.js";import{g as ee}from"./util-RR67UMDN.js";import{I as te}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-Kf-UsGkl.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./compare-VLxlEkSV.js";import"./jquery-5v7aFUvu.js";import"./svg-image-ImGr8npy.js";import"./index-TymzEsVR.js";import"./index-awljIyHI.js";import"./index-oMd7J_hd.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-fnqF3NiV.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./article-renderer-2xLM6xaa.js";import"./prop-types-oYjo1VuK.js";import"./index-3xb9Ri9D.js";import"./tabbar-_VM3Ijmc.js";import"./item-HTAlbNMZ.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./index-JT1-kTlx.js";import"./key-translator-yjRRNSuW.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer--qvWlSJl.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-JK7f6wub.js";import"./index-1lR5LStt.js";import"./index-B3k62xyQ.js";import"./index-O-KD2pfb.js";import"./index-KIBY7gd7.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-Ah4BQ4X3.js";import"./index-_6fd2Dz3.js";import"./unit-3mV5sRes.js";import"./input-with-examples-iGYlZivN.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-NKfzL8jd.js";import"./base-radio-L2CQ04LW.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-U2lXOTna.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-MDBaQstQ.js";import"./video-transcript-link-BKfVoN1g.js";import"./answer-choices-Y9Xz84Nm.js";import"./button-group-eBTrRsKy.js";import"./graph-Bysq6csc.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-_E95qi8X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-nytuiJQZ.js";import"./prop-check-box-s_QybB1E.js";import"./range-input-qxBl8f4w.js";import"./marker-Y5tkNjao.js";import"./answer-pill-hif8yB8_.js";import"./sortable-PbO9y_mO.js";import"./multi-renderer-sX_PdM-S.js";import"./hints-renderer-khre-RxA.js";import"./components-IoB9EuXw.js";import"./interactive-graph-settings-tgF0DnlD.js";import"./toggleable-caret-1K5GCJBX.js";import"./locked-figures-section-TWiu8ziL.js";import"./locked-ellipse-settings-zKnYo18s.js";import"./locked-figure-settings-actions-ALpkmKqJ.js";import"./color-select-i812A6cY.js";import"./color-swatch--O563jOI.js";import"./locked-line-settings-tN58gObQ.js";import"./labeled-switch-6-c80PHL.js";import"./line-swatch-MJgRAYAo.js";import"./locked-point-settings-KuYJym4U.js";import"./locked-polygon-settings-UQ9QKgro.js";import"./locked-vector-settings-86dxAOl-.js";const re={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...te},d={apiOptions:{flags:$},graph:{type:"segment"},correct:{type:"segment"}},a=ee("point"),rr={title:"PerseusEditor/Widgets/Interactive Graph Editor",component:s,argTypes:re},y=i=>c(s,{...i});y.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const l={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=p.useReducer(e,{});return c(s,{...t,onChange:r})}},m={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=p.useReducer(e,d);return c(s,{...t,onChange:r})}},u={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=p.useReducer(e,{...d,graph:{type:"polygon"},correct:{type:"polygon",numSides:4,showAngles:!0,showSides:!0,snapTo:"angles"}});return c(s,{...t,onChange:r})}},h={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=p.useReducer(e,{...d,lockedFigures:[{...a,coord:[1,1]},{...a,coord:[-1,-1]}]});return c(s,{...t,onChange:r})}},g={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=p.useReducer(e,{...d,lockedFigures:[{type:"line",kind:"line",points:[{...a,coord:[0,2]},{...a,coord:[2,3]}],color:"green",lineStyle:"solid",showPoint1:!1,showPoint2:!1},{type:"line",kind:"ray",points:[{...a,color:"pink",coord:[0,0]},{...a,color:"pink",coord:[4,2]}],color:"pink",lineStyle:"solid",showPoint1:!0,showPoint2:!1},{type:"line",kind:"segment",points:[{...a,color:"grayH",coord:[0,-2]},{...a,color:"grayH",coord:[4,0]}],color:"grayH",lineStyle:"solid",showPoint1:!0,showPoint2:!0}]});return c(s,{...t,onChange:r})}},f={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=p.useReducer(e,{...d,lockedFigures:[{type:"ellipse",center:[0,0],radius:[5,2],angle:0,color:"green",fillStyle:"translucent",strokeStyle:"solid"}]});return c(s,{...t,onChange:r})}},k={render:function(){const e=(n,o)=>({...n,...o}),[t,r]=p.useReducer(e,{...d,lockedFigures:[{type:"polygon",points:[[-9,4],[-6,4],[-6,1],[-9,1]],color:"green",fillStyle:"translucent",strokeStyle:"solid"}]});return c(s,{...t,onChange:r})}};var w,S,P;y.parameters={...y.parameters,docs:{...(w=y.parameters)==null?void 0:w.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(P=(S=y.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var R,E,v,I,G;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(v=(E=l.parameters)==null?void 0:E.docs)==null?void 0:v.source},description:{story:`Example of what the InteractiveGraphEditor experience is when all
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(G=(I=l.parameters)==null?void 0:I.docs)==null?void 0:G.description}}};var C,b,L,x,W;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(L=(b=m.parameters)==null?void 0:b.docs)==null?void 0:L.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph.`,...(W=(x=m.parameters)==null?void 0:x.docs)==null?void 0:W.description}}};var F,T,O,j,A;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(O=(T=u.parameters)==null?void 0:T.docs)==null?void 0:O.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph to create Polygons.`,...(A=(j=u.parameters)==null?void 0:j.docs)==null?void 0:A.description}}};var H,M,q,U,D;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(q=(M=h.parameters)==null?void 0:M.docs)==null?void 0:q.source},description:{story:`This InteractiveGraphEditor has locked points.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(D=(U=h.parameters)==null?void 0:U.docs)==null?void 0:D.description}}};var _,z,B,J,K;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(B=(z=g.parameters)==null?void 0:z.docs)==null?void 0:B.source},description:{story:`This InteractiveGraphEditor has a locked line segment, line, and ray.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.description}}};var N,Q,V;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(V=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var X,Y,Z;k.parameters={...k.parameters,docs:{...(X=k.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
        type: "polygon",
        points: [[-9, 4], [-6, 4], [-6, 1], [-9, 1]],
        color: "green",
        fillStyle: "translucent",
        strokeStyle: "solid"
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(Z=(Y=k.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const nr=["Default","Controlled","WithMafs","WithMafsPolygon","WithLockedPoints","WithLockedLines","WithLockedEllipses","WithLockedPolygons"];export{l as Controlled,y as Default,f as WithLockedEllipses,g as WithLockedLines,h as WithLockedPoints,k as WithLockedPolygons,m as WithMafs,u as WithMafsPolygon,nr as __namedExportsOrder,rr as default};
