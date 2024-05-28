import{j as u}from"./jsx-runtime-BGVbfQ2Z.js";import{r as h}from"./index-qhcEwEpg.js";import{I as s,f as D}from"./flags-for-api-options-Vr1o2JVy.js";import{g as M}from"./util-YGO3C9Nm.js";import{I as _}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-WvQWLN3r.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-OpXxk17X.js";import"./dependencies-fnqF3NiV.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./jquery-5v7aFUvu.js";import"./svg-image-AISNCHeJ.js";import"./index-mohBxQl_.js";import"./index-awljIyHI.js";import"./index-4c2J3ov1.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./article-renderer--ZiYYddj.js";import"./prop-types-18HXJOop.js";import"./index-halg33Zp.js";import"./tabbar-_HYg3Kcf.js";import"./item-MgaZQyPg.js";import"./index-VhM44oCk.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-BUF7auet.js";import"./operators-page-H6dLcd0l.js";import"./navigation-pad-URlj9thj.js";import"./index-JT1-kTlx.js";import"./key-translator-t-qTln-I.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-RSPacoFg.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-xE_wKg8s.js";import"./index-kutQl4v0.js";import"./index-qh_wob3p.js";import"./index-_15Y2y0p.js";import"./index-h47zdzUa.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-LoGoPcYm.js";import"./index-3tBZ6RgE.js";import"./unit-uxf7imOh.js";import"./input-with-examples-yHgRboSW.js";import"./math-output-xqbS761x.js";import"./text-input-jOclSjX3.js";import"./index-U4TAeovv.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-A9uEOuum.js";import"./base-radio-8XhgSIuH.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-gorLtsnE.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-hC2Z-Hs_.js";import"./video-transcript-link-g12jSPmn.js";import"./answer-choices-gEQdiF9a.js";import"./button-group-eBTrRsKy.js";import"./graph-msNArzTL.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-7OZQMH1X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-G44u0RiB.js";import"./range-input-IMzA4hKn.js";import"./marker-rs-oXcHP.js";import"./answer-pill-NVd2l-AE.js";import"./sortable-bsEmWaNy.js";import"./multi-renderer-RSzPxGU4.js";import"./hints-renderer-RuVSOigB.js";import"./components-1njTRPO8.js";import"./interactive-graph-settings-jzFFBRhJ.js";import"./toggleable-caret-s4JdKAQK.js";import"./locked-figures-section-w41mc2F7.js";import"./locked-line-settings-y1ARugS6.js";import"./color-select-zgLP6ONC.js";import"./color-swatch-WEu5ijuz.js";import"./locked-figure-settings-actions-AxM8EsfJ.js";import"./locked-point-settings-adHgDLNK.js";const U={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},..._},g={apiOptions:{flags:D},graph:{type:"segment"},correct:{type:"segment"}},e=M("point"),qt={title:"PerseusEditor/Widgets/Interactive Graph Editor",component:s,argTypes:U},l=a=>u(s,{...a});l.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const p={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{});return u(s,{...r,onChange:o})}},c={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,g);return u(s,{...r,onChange:o})}},d={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{...e,coord:[1,1]},{...e,coord:[-1,-1]}]});return u(s,{...r,onChange:o})}},m={render:function(){const t=(n,i)=>({...n,...i}),[r,o]=h.useReducer(t,{...g,lockedFigures:[{type:"line",kind:"line",points:[{...e,coord:[0,2]},{...e,coord:[2,3]}],color:"green",lineStyle:"solid",showPoint1:!1,showPoint2:!1},{type:"line",kind:"ray",points:[{...e,color:"pink",coord:[0,0]},{...e,color:"pink",coord:[4,2]}],color:"pink",lineStyle:"solid",showPoint1:!0,showPoint2:!1},{type:"line",kind:"segment",points:[{...e,color:"grayH",coord:[0,-2]},{...e,color:"grayH",coord:[4,0]}],color:"grayH",lineStyle:"solid",showPoint1:!0,showPoint2:!0}]});return u(s,{...r,onChange:o})}};var f,y,P;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`(args): React.ReactElement => {
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
