import{j as u}from"./jsx-runtime-BGVbfQ2Z.js";import{r as h}from"./index-qhcEwEpg.js";import{I as s,f as D}from"./flags-for-api-options-nGBCVb4t.js";import{g as M}from"./util-Dgb5ja5A.js";import{I as _}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-JxCU4a8P.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-DPXmIky8.js";import"./index-25YgVP-A.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-o-NbHVFA.js";import"./index-4c2J3ov1.js";import"./tabbar-0ADFFMFf.js";import"./item-Xl3u6w2R.js";import"./index-IxqgEL7X.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-Xf3EMv8Q.js";import"./operators-page-oziijydk.js";import"./navigation-pad-tBxIIqLP.js";import"./index-pb777vIT.js";import"./key-translator-XlSAqAhT.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-V6_4AklZ.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-6q36axAB.js";import"./index-Or3qlYxC.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-BDbMqVg2.js";import"./index-PurVa-Tf.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./index-BrnICqZg.js";import"./Popper-2p8US95Y.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-uxyVs2zw.js";import"./index-wpOEyefj.js";import"./unit-1L4OY2_r.js";import"./input-with-examples-QH-3-KQ5.js";import"./math-output-o5-UebzW.js";import"./text-input-77oq4TCL.js";import"./index-sXD0g-3O.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-T9cfhdby.js";import"./base-radio-T9lap48E.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-iXWfcVOh.js";import"./icon-HbAIhp4d.js";import"./choice-icon-5Wq30UUO.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-_ONChKTK.js";import"./choice-none-above-3ZColgvQ.js";import"./video-transcript-link-wp-Fzerj.js";import"./answer-choices-dZYesy7J.js";import"./button-group-eBTrRsKy.js";import"./graph-kG_TBAvu.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-IhIrlX7t.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-CBSxyfjJ.js";import"./prop-check-box-OYeLup7m.js";import"./range-input-YYhLn03P.js";import"./marker-KayRHL5C.js";import"./answer-pill-TDnlkTLI.js";import"./sortable-6KjeHSiM.js";import"./multi-renderer-5mksrmV1.js";import"./hints-renderer-kN6OwxMF.js";import"./components-8RxosTiD.js";import"./interactive-graph-settings-feMg9Mnp.js";import"./locked-figures-section-o7OWSu1L.js";import"./color-select-AjbSWT3j.js";import"./color-swatch-KbzP7wQ1.js";import"./locked-point-settings-PozAilqe.js";const U={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},..._},g={apiOptions:{flags:D},graph:{type:"segment"},correct:{type:"segment"}},e=M("point"),Ft={title:"PerseusEditor/Widgets/Interactive Graph Editor",component:s,argTypes:U},l=a=>u(s,{...a});l.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const p={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{});return u(s,{...r,onChange:o})}},c={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,g);return u(s,{...r,onChange:o})}},d={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{...e,coord:[1,1]},{...e,coord:[-1,-1]}]});return u(s,{...r,onChange:o})}},m={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{type:"line",kind:"line",points:[{...e,coord:[0,2]},{...e,coord:[2,3]}],color:"green",lineStyle:"solid",showArrows:!1,showStartPoint:!1,showEndPoint:!1},{type:"line",kind:"ray",points:[{...e,color:"pink",coord:[0,0]},{...e,color:"pink",coord:[4,2]}],color:"pink",lineStyle:"solid",showArrows:!0,showStartPoint:!0,showEndPoint:!1},{type:"line",kind:"segment",points:[{...e,color:"grayH",coord:[0,-2]},{...e,color:"grayH",coord:[4,0]}],color:"grayH",lineStyle:"solid",showArrows:!0,showStartPoint:!0,showEndPoint:!0}]});return u(s,{...r,onChange:o})}};var f,y,w;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(w=(y=l.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var P,k,S,E,R;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(S=(k=p.parameters)==null?void 0:k.docs)==null?void 0:S.source},description:{story:`Example of what the InteractiveGraphEditor experience is when all
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(R=(E=p.parameters)==null?void 0:E.docs)==null?void 0:R.description}}};var v,b,I,G,C;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
a Mafs-based InteractiveGraph.`,...(C=(G=c.parameters)==null?void 0:G.docs)==null?void 0:C.description}}};var x,A,L,T,j;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(L=(A=d.parameters)==null?void 0:A.docs)==null?void 0:L.source},description:{story:`This InteractiveGraphEditor has locked points.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(j=(T=d.parameters)==null?void 0:T.docs)==null?void 0:j.description}}};var F,O,W,H,q;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
        showArrows: false,
        showStartPoint: false,
        showEndPoint: false
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
        showArrows: true,
        showStartPoint: true,
        showEndPoint: false
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
        showArrows: true,
        showStartPoint: true,
        showEndPoint: true
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(W=(O=m.parameters)==null?void 0:O.docs)==null?void 0:W.source},description:{story:`This InteractiveGraphEditor has a locked line segment, line, and ray.

Locked figures are graph elements such as points, lines, line segements,
etc. that are locked in place and not interactive. They can be added
with the "Add element" dropdown at the bottom.`,...(q=(H=m.parameters)==null?void 0:H.docs)==null?void 0:q.description}}};const Ot=["Default","Controlled","WithMafs","WithLockedPoints","WithLockedLines"];export{p as Controlled,l as Default,m as WithLockedLines,d as WithLockedPoints,c as WithMafs,Ot as __namedExportsOrder,Ft as default};
