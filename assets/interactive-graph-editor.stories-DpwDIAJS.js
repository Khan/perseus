import{j as p}from"./jsx-runtime-BGVbfQ2Z.js";import{r as h}from"./index-qhcEwEpg.js";import{I as s,f as z}from"./flags-for-api-options-6OyUhk9h.js";import{g as B}from"./util-NNtyu1l3.js";import{I as J}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-WvQWLN3r.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-OpXxk17X.js";import"./dependencies-fnqF3NiV.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./jquery-5v7aFUvu.js";import"./svg-image-owHOs5t6.js";import"./index-mohBxQl_.js";import"./index-awljIyHI.js";import"./index-4c2J3ov1.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./article-renderer-KiGLfAOq.js";import"./prop-types-shj0h1ib.js";import"./index-sCIolE-R.js";import"./tabbar-_HYg3Kcf.js";import"./item-MgaZQyPg.js";import"./index-VhM44oCk.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-BUF7auet.js";import"./operators-page-H6dLcd0l.js";import"./navigation-pad-URlj9thj.js";import"./index-JT1-kTlx.js";import"./key-translator-uZU3CxVJ.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-DMyJQEwa.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-xE_wKg8s.js";import"./index-kutQl4v0.js";import"./index-qh_wob3p.js";import"./index-_15Y2y0p.js";import"./index-h47zdzUa.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-Bw4Zlb2x.js";import"./index-3tBZ6RgE.js";import"./unit-uxf7imOh.js";import"./input-with-examples-Nx17j6wP.js";import"./math-output-xqbS761x.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-595DYuz6.js";import"./base-radio-sJkwrgzI.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-gorLtsnE.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-4JlK6ypp.js";import"./video-transcript-link-g12jSPmn.js";import"./answer-choices-sexF1cp0.js";import"./button-group-eBTrRsKy.js";import"./graph-QO4osesG.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-7OZQMH1X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-gTxQyzCz.js";import"./range-input-IMzA4hKn.js";import"./marker-M-XurWPn.js";import"./answer-pill-mZpPK3jT.js";import"./sortable-I0MCW1FB.js";import"./multi-renderer-LGskqdmj.js";import"./hints-renderer-WwkvegeM.js";import"./components-vu6XVVNc.js";import"./interactive-graph-settings-sVZOB5JS.js";import"./toggleable-caret-s4JdKAQK.js";import"./locked-figures-section-kEIy4QaA.js";import"./locked-ellipse-settings-CHP1rdOS.js";import"./color-select-oLKlWZ_9.js";import"./color-swatch-0f2qVzSv.js";import"./locked-figure-settings-actions-vFYJqugY.js";import"./locked-line-settings-iMBIzR41.js";import"./labeled-switch--AvfuBcK.js";import"./line-swatch-6lZBnlW5.js";import"./locked-point-settings-cHzcO5ZO.js";import"./locked-vector-settings-9TyNl2lZ.js";const K={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...J},f={apiOptions:{flags:z},graph:{type:"segment"},correct:{type:"segment"}},i=B("point"),Kt={title:"PerseusEditor/Widgets/Interactive Graph Editor",component:s,argTypes:K},u=a=>p(s,{...a});u.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const c={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=h.useReducer(e,{});return p(s,{...t,onChange:r})}},d={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=h.useReducer(e,f);return p(s,{...t,onChange:r})}},m={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=h.useReducer(e,{...f,lockedFigures:[{...i,coord:[1,1]},{...i,coord:[-1,-1]}]});return p(s,{...t,onChange:r})}},l={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=h.useReducer(e,{...f,lockedFigures:[{type:"line",kind:"line",points:[{...i,coord:[0,2]},{...i,coord:[2,3]}],color:"green",lineStyle:"solid",showPoint1:!1,showPoint2:!1},{type:"line",kind:"ray",points:[{...i,color:"pink",coord:[0,0]},{...i,color:"pink",coord:[4,2]}],color:"pink",lineStyle:"solid",showPoint1:!0,showPoint2:!1},{type:"line",kind:"segment",points:[{...i,color:"grayH",coord:[0,-2]},{...i,color:"grayH",coord:[4,0]}],color:"grayH",lineStyle:"solid",showPoint1:!0,showPoint2:!0}]});return p(s,{...t,onChange:r})}},g={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=h.useReducer(e,{...f,lockedFigures:[{type:"ellipse",center:[0,0],radius:[5,2],angle:0,color:"green",fillStyle:"translucent",strokeStyle:"solid"}]});return p(s,{...t,onChange:r})}};var y,k,w;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(w=(k=u.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var P,S,R,E,v;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(R=(S=c.parameters)==null?void 0:S.docs)==null?void 0:R.source},description:{story:`Example of what the InteractiveGraphEditor experience is when all
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(v=(E=c.parameters)==null?void 0:E.docs)==null?void 0:v.description}}};var I,b,G,C,L;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(G=(b=d.parameters)==null?void 0:b.docs)==null?void 0:G.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph.`,...(L=(C=d.parameters)==null?void 0:C.docs)==null?void 0:L.description}}};var x,F,T,W,j;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(T=(F=m.parameters)==null?void 0:F.docs)==null?void 0:T.source},description:{story:`This InteractiveGraphEditor has locked points.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(j=(W=m.parameters)==null?void 0:W.docs)==null?void 0:j.description}}};var O,H,q,A,D;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(q=(H=l.parameters)==null?void 0:H.docs)==null?void 0:q.source},description:{story:`This InteractiveGraphEditor has a locked line segment, line, and ray.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(D=(A=l.parameters)==null?void 0:A.docs)==null?void 0:D.description}}};var M,U,_;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(_=(U=g.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};const Nt=["Default","Controlled","WithMafs","WithLockedPoints","WithLockedLines","WithLockedEllipses"];export{c as Controlled,u as Default,g as WithLockedEllipses,l as WithLockedLines,m as WithLockedPoints,d as WithMafs,Nt as __namedExportsOrder,Kt as default};
