import{j as u}from"./jsx-runtime-BGVbfQ2Z.js";import{r as h}from"./index-qhcEwEpg.js";import{I as s,f as D}from"./flags-for-api-options-8lPQRbiv.js";import{g as M}from"./util-cblgOEF4.js";import{I as _}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-F6mGosoY.js";import"./compare-59FC1ybr.js";import"./version-akiLXZts.js";import"./prop-types-6SZ7wpGj.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-YbdDueCh.js";import"./index-4c2J3ov1.js";import"./tabbar-JzIL1KLI.js";import"./item-Ik_jgcdN.js";import"./index-2ewQ9tq7.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-bmoIASdR.js";import"./operators-page-cUYg3cIm.js";import"./navigation-pad-kidqz-Lu.js";import"./index-KwIbMdjJ.js";import"./key-translator-clrWbFgY.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./renderer-g-jl5vfe.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-1xirUsO_.js";import"./index-mohBxQl_.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-EDQcR2F7.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-9NPhLZtS.js";import"./index-0C4KXdeC.js";import"./stub-tag-editor-f1WdYARp.js";import"./text-list-editor-xQBHt64k.js";import"./lint-4QkP-VXi.js";import"./index--QaGaZ0E.js";import"./index-LEiXrFpA.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./index-h47zdzUa.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-0_Vag4zz.js";import"./index-YCszv_sI.js";import"./unit-sO4C0-pw.js";import"./input-with-examples-g810P0PJ.js";import"./math-output-tIDciKOM.js";import"./text-input-zm8-q8wG.js";import"./index-TrT5d_9G.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-lRXaX8DC.js";import"./base-radio-818h8kEA.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-eX2sc0Eo.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-1YYjOM3M.js";import"./video-transcript-link-Q_kxj4Rb.js";import"./answer-choices-hXlZqckn.js";import"./button-group-eBTrRsKy.js";import"./graph-leroHitF.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-S2eTRAyl.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-k4bRs4vK.js";import"./prop-check-box-zg5E6TRo.js";import"./range-input-zCtWZXYe.js";import"./marker-EMbLNSLC.js";import"./answer-pill-rDQKYKDj.js";import"./sortable-3H8wox3S.js";import"./multi-renderer-S_r8TVCE.js";import"./hints-renderer-9Wrzta78.js";import"./components-M0zqdzxn.js";import"./interactive-graph-settings-q8oL8VVR.js";import"./locked-figures-section--tlyV5cn.js";import"./locked-line-settings--Zc2X6aR.js";import"./color-select-DdwwwsV1.js";import"./color-swatch-nSTPqLAT.js";import"./locked-point-settings-4LYtpLY4.js";const U={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},..._},g={apiOptions:{flags:D},graph:{type:"segment"},correct:{type:"segment"}},e=M("point"),qt={title:"PerseusEditor/Widgets/Interactive Graph Editor",component:s,argTypes:U},l=a=>u(s,{...a});l.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const p={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{});return u(s,{...r,onChange:o})}},c={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,g);return u(s,{...r,onChange:o})}},d={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{...e,coord:[1,1]},{...e,coord:[-1,-1]}]});return u(s,{...r,onChange:o})}},m={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{type:"line",kind:"line",points:[{...e,coord:[0,2]},{...e,coord:[2,3]}],color:"green",lineStyle:"solid",showPoint1:!1,showPoint2:!1},{type:"line",kind:"ray",points:[{...e,color:"pink",coord:[0,0]},{...e,color:"pink",coord:[4,2]}],color:"pink",lineStyle:"solid",showPoint1:!0,showPoint2:!1},{type:"line",kind:"segment",points:[{...e,color:"grayH",coord:[0,-2]},{...e,color:"grayH",coord:[4,0]}],color:"grayH",lineStyle:"solid",showPoint1:!0,showPoint2:!0}]});return u(s,{...r,onChange:o})}};var f,y,P;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(P=(y=l.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var k,w,R,S,E;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(R=(w=p.parameters)==null?void 0:w.docs)==null?void 0:R.source},description:{story:`Example of what the InteractiveGraphEditor experience is when all
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(E=(S=p.parameters)==null?void 0:S.docs)==null?void 0:E.description}}};var v,b,I,G,C;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(I=(b=c.parameters)==null?void 0:b.docs)==null?void 0:I.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph.`,...(C=(G=c.parameters)==null?void 0:G.docs)==null?void 0:C.description}}};var x,L,T,j,F;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(T=(L=d.parameters)==null?void 0:L.docs)==null?void 0:T.source},description:{story:`This InteractiveGraphEditor has locked points.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(F=(j=d.parameters)==null?void 0:j.docs)==null?void 0:F.description}}};var O,W,H,q,A;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(H=(W=m.parameters)==null?void 0:W.docs)==null?void 0:H.source},description:{story:`This InteractiveGraphEditor has a locked line segment, line, and ray.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(A=(q=m.parameters)==null?void 0:q.docs)==null?void 0:A.description}}};const At=["Default","Controlled","WithMafs","WithLockedPoints","WithLockedLines"];export{p as Controlled,l as Default,m as WithLockedLines,d as WithLockedPoints,c as WithMafs,At as __namedExportsOrder,qt as default};
