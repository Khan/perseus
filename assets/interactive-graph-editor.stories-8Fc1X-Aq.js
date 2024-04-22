import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as u}from"./index-qhcEwEpg.js";import{I as c,f as P}from"./flags-for-api-options-VFHmwxah.js";import{I as T}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-PN2BD3v_.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-1g6fzmKF.js";import"./index-V35CFGao.js";import"./index-fuyzzUuV.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-2LjNjJpa.js";import"./index-4c2J3ov1.js";import"./tabbar-4UDQk7cN.js";import"./item-P3WrK4af.js";import"./index-1P5txiDe.js";import"./index-tvtfaFq4.js";import"./button-assets-_Am9ApvA.js";import"./keypad-button-Yf_O0DZf.js";import"./operators-page-jaQPWpBb.js";import"./navigation-pad-JIlZRGXW.js";import"./index-uu39Elyn.js";import"./key-translator-e7mZtIzr.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-Egk7x_Xi.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-S4XnA7Yr.js";import"./index-ntsnGU3X.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-HWMzrHku.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-cRKslbtI.js";import"./index-fdRf1OJX.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./index-RrkX9P05.js";import"./Popper-2p8US95Y.js";import"./math-input-ye6imNwR.js";import"./unit-tpB2tohZ.js";import"./input-with-examples-7DE9GVQy.js";import"./math-output-o5-UebzW.js";import"./text-input-aDhxqzgd.js";import"./index-to4e0yK9.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-AZdDUF7E.js";import"./base-radio-oeuKArw6.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-7Bfg02MO.js";import"./icon-HbAIhp4d.js";import"./choice-icon-YaMguKwM.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-hT8t_5a4.js";import"./choice-none-above-Bz4XzcPl.js";import"./video-transcript-link-bbZ3NvJD.js";import"./answer-choices-pKfuNCYh.js";import"./button-group-eBTrRsKy.js";import"./graph-NP6c8P1T.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-Fae-O4h-.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-33S79dZV.js";import"./prop-check-box-wRngoh_G.js";import"./range-input-zsZZAHYZ.js";import"./marker-ekh7P5T3.js";import"./answer-pill-Ob0OzX26.js";import"./sortable-nKhXgoyl.js";import"./multi-renderer-_e5es3jl.js";import"./hints-renderer-WmSACs28.js";import"./components-XwHYAysG.js";import"./interactive-graph-settings-wLNu5--8.js";import"./locked-point-settings-xTD6PuqL.js";import"./color-circle-xqm9n2rJ.js";import"./color-select-iCiPqI7M.js";import"./perseus-types-FVzQqVLf.js";import"./util-kZQrzSJI.js";const q={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...T},kt={title:"Perseus Editor/Widgets/Interactive Graph Editor",component:c,argTypes:q},s=m=>d(c,{...m});s.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const i={render:function(){const r=(o,n)=>({...o,...n}),[t,e]=u.useReducer(r,{});return d(c,{...t,onChange:e})}},p={render:function(){const r=(o,n)=>({...o,...n}),[t,e]=u.useReducer(r,{apiOptions:{flags:P},graph:{type:"segment"},correct:{type:"segment"},lockedFigures:[{type:"point",coord:[1,1],color:"blue",filled:!0},{type:"point",coord:[-1,-1],color:"purple",filled:!1}]});return d(c,{...t,onChange:e})}},a={render:function(){const r=(o,n)=>({...o,...n}),[t,e]=u.useReducer(r,{apiOptions:{flags:P},graph:{type:"segment"},correct:{type:"segment"}});return d(c,{...t,onChange:e})}};var l,h,g;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,y,R,E,v;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(R=(y=i.parameters)==null?void 0:y.docs)==null?void 0:R.source},description:{story:`Example of what the InteractiveGraphEditor experience is when all
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(v=(E=i.parameters)==null?void 0:E.docs)==null?void 0:v.description}}};var w,b,k,I,G;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {
      // Use locked figures with mafs only.
      apiOptions: {
        flags
      },
      graph: {
        type: "segment"
      },
      correct: {
        type: "segment"
      },
      lockedFigures: [{
        type: "point",
        coord: [1, 1],
        color: "blue",
        filled: true
      }, {
        type: "point",
        coord: [-1, -1],
        color: "purple",
        filled: false
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(k=(b=p.parameters)==null?void 0:b.docs)==null?void 0:k.source},description:{story:`This InteractiveGraphEditor has locked figures. Locked figures are graph
elements such as points, lines, line segements, etc. that are locked in
place and not interactive.`,...(G=(I=p.parameters)==null?void 0:I.docs)==null?void 0:G.description}}};var S,x,C,j,O;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {
      apiOptions: {
        flags
      },
      graph: {
        type: "segment"
      },
      correct: {
        type: "segment"
      }
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(C=(x=a.parameters)==null?void 0:x.docs)==null?void 0:C.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph.`,...(O=(j=a.parameters)==null?void 0:j.docs)==null?void 0:O.description}}};const It=["Default","Controlled","WithLockedPoints","WithMafs"];export{i as Controlled,s as Default,p as WithLockedPoints,a as WithMafs,It as __namedExportsOrder,kt as default};
