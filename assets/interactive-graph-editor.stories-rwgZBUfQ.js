import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as u}from"./index-qhcEwEpg.js";import{I as m}from"./interactive-graph-editor-0tKdl1TM.js";import{I as P}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-E7DFtRQw.js";import"./compare-59FC1ybr.js";import"./version-akiLXZts.js";import"./prop-types-hDZ1fL08.js";import"./index-V35CFGao.js";import"./index-s2vhHSme.js";import"./index-hYQ6Pa3_.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-3oI5GQ1q.js";import"./index-eZ2N530f.js";import"./tabbar-TVJyj4KM.js";import"./item-Vt4CkKC9.js";import"./index-FSlvaNFm.js";import"./index-tvtfaFq4.js";import"./index-ACL0N2lY.js";import"./button-assets-K2ZoY3Yc.js";import"./keypad-button-EL6QtoOZ.js";import"./operators-page-KzJU43Xg.js";import"./navigation-pad-UuYbFhLA.js";import"./index-uu39Elyn.js";import"./key-translator-wyL18-El.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-pyF2Xqh8.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-HY4DXPYW.js";import"./index-e6QWP3dX.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-0RXiyYTM.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-BHFLb_M-.js";import"./index-Nu3-Yboj.js";import"./index-tMKG4RaL.js";import"./index-K7FSCCGN.js";import"./index-G0tWdZ0L.js";import"./index-SM3muJE2.js";import"./Popper-2p8US95Y.js";import"./math-input-dC6tjm5G.js";import"./index-2IlhG4BY.js";import"./unit-kRJG92HA.js";import"./input-with-examples-9vRCIfD_.js";import"./math-output-o5-UebzW.js";import"./text-input-RuOkEIgH.js";import"./index-lQzT3gLW.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-o9N8VAO8.js";import"./base-radio-5KMQqIKA.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-_Jh7KU-D.js";import"./icon-HbAIhp4d.js";import"./choice-icon-VPjkQVvj.js";import"./focus-ring-4m7DGTUl.js";import"./option-status-YdbdjcBE.js";import"./choice-none-above-om3KEm8J.js";import"./video-transcript-link-HLRrsdSq.js";import"./answer-choices-ngtaRiXp.js";import"./button-group-eBTrRsKy.js";import"./graph-ZVYcs1bM.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-wjwyUctM.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-lwrURXqC.js";import"./prop-check-box-Wzzgb5Z4.js";import"./range-input-ar8q3yJk.js";import"./marker-NMZmSBvB.js";import"./answer-pill-a1KpbYSt.js";import"./sortable-bkmCyC6f.js";import"./multi-renderer-9HFIo8Un.js";import"./hints-renderer-1mYJn9r9.js";import"./components-eRkN4_Up.js";import"./index-UhH8Obic.js";import"./index-a3cmqwki.js";import"./locked-point-settings-RAMyUFPY.js";import"./color-circle-T7KCycz_.js";import"./color-select-KaoSHZ2D.js";import"./perseus-types-FVzQqVLf.js";import"./util-QZ-4fnoK.js";import"./interactive-graph-settings-0f4rJKUU.js";const T={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...P},Ce={title:"Perseus Editor/Widgets/Interactive Graph Editor",component:m,argTypes:T},a=c=>d(m,{...c});a.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const i={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{});return d(m,{...e,onChange:r})}},p={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"},lockedFigures:[{type:"point",coord:[1,1],color:"blue",filled:!0},{type:"point",coord:[-1,-1],color:"purple",filled:!1}]});return d(m,{...e,onChange:r})}},s={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"}});return d(m,{...e,onChange:r})}};var l,h,g;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,y,R,E,v;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
        flags: {
          mafs: {
            segment: true
          }
        }
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
place and not interactive.`,...(G=(I=p.parameters)==null?void 0:I.docs)==null?void 0:G.description}}};var S,x,C,j,O;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const reducer = (state, newState) => {
      return {
        ...state,
        ...newState
      };
    };
    const [state, dispatch] = React.useReducer(reducer, {
      apiOptions: {
        flags: {
          mafs: {
            segment: true
          }
        }
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
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source},description:{story:`Example of what the InteractiveGraphEditor experience is when using
a Mafs-based InteractiveGraph.`,...(O=(j=s.parameters)==null?void 0:j.docs)==null?void 0:O.description}}};const je=["Default","Controlled","WithLockedPoints","WithMafs"];export{i as Controlled,a as Default,p as WithLockedPoints,s as WithMafs,je as __namedExportsOrder,Ce as default};
