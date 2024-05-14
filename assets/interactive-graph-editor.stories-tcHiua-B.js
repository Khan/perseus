import{j as u}from"./jsx-runtime-BGVbfQ2Z.js";import{r as h}from"./index-qhcEwEpg.js";import{I as s,f as D}from"./flags-for-api-options-H8m-lfU0.js";import{g as M}from"./util-cblgOEF4.js";import{I as _}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-ndmyR9cr.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-da35HsqX.js";import"./index-25YgVP-A.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-NYf4zfpa.js";import"./index-4c2J3ov1.js";import"./tabbar-0ADFFMFf.js";import"./item-Xl3u6w2R.js";import"./index-IxqgEL7X.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-Xf3EMv8Q.js";import"./operators-page-oziijydk.js";import"./navigation-pad-tBxIIqLP.js";import"./index-pb777vIT.js";import"./key-translator-vogSlYsi.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-V6_4AklZ.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-6q36axAB.js";import"./index-Or3qlYxC.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-BDbMqVg2.js";import"./index-PurVa-Tf.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./index-BrnICqZg.js";import"./Popper-2p8US95Y.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-guqC3cBI.js";import"./index-wpOEyefj.js";import"./unit-1L4OY2_r.js";import"./input-with-examples-SZqb7UBZ.js";import"./math-output-o5-UebzW.js";import"./text-input-77oq4TCL.js";import"./index-sXD0g-3O.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-Rzz-r-EH.js";import"./base-radio-7PMhimd8.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-2FGmwb-T.js";import"./icon-HbAIhp4d.js";import"./choice-icon-5Wq30UUO.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-_ONChKTK.js";import"./choice-none-above-0U8vaPiM.js";import"./video-transcript-link-wp-Fzerj.js";import"./answer-choices-dZYesy7J.js";import"./button-group-eBTrRsKy.js";import"./graph-kG_TBAvu.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-IhIrlX7t.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-CBSxyfjJ.js";import"./prop-check-box-OYeLup7m.js";import"./range-input-YYhLn03P.js";import"./marker-KayRHL5C.js";import"./answer-pill-TDnlkTLI.js";import"./sortable-6KjeHSiM.js";import"./multi-renderer-9-ohGwcu.js";import"./hints-renderer-BLygMiIY.js";import"./components-UeanbTvK.js";import"./interactive-graph-settings-lzpY_mCU.js";import"./locked-figures-section-R5XWHWjP.js";import"./color-select-_Q2eekWS.js";import"./color-swatch-8CrZsHpk.js";import"./locked-point-settings-Ic7--tp8.js";const U={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},..._},g={apiOptions:{flags:D},graph:{type:"segment"},correct:{type:"segment"}},e=M("point"),Ot={title:"PerseusEditor/Widgets/Interactive Graph Editor",component:s,argTypes:U},l=a=>u(s,{...a});l.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const p={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{});return u(s,{...r,onChange:o})}},c={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,g);return u(s,{...r,onChange:o})}},d={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{...e,coord:[1,1]},{...e,coord:[-1,-1]}]});return u(s,{...r,onChange:o})}},m={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{type:"line",kind:"line",points:[{...e,coord:[0,2]},{...e,coord:[2,3]}],color:"green",lineStyle:"solid",showPoint1:!1,showPoint2:!1},{type:"line",kind:"ray",points:[{...e,color:"pink",coord:[0,0]},{...e,color:"pink",coord:[4,2]}],color:"pink",lineStyle:"solid",showPoint1:!0,showPoint2:!1},{type:"line",kind:"segment",points:[{...e,color:"grayH",coord:[0,-2]},{...e,color:"grayH",coord:[4,0]}],color:"grayH",lineStyle:"solid",showPoint1:!0,showPoint2:!0}]});return u(s,{...r,onChange:o})}};var f,y,P;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`(args): React.ReactElement => {
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
with the "Add element" dropdown at the bottom.`,...(A=(q=m.parameters)==null?void 0:q.docs)==null?void 0:A.description}}};const Wt=["Default","Controlled","WithMafs","WithLockedPoints","WithLockedLines"];export{p as Controlled,l as Default,m as WithLockedLines,d as WithLockedPoints,c as WithMafs,Wt as __namedExportsOrder,Ot as default};
