import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as u}from"./index-qhcEwEpg.js";import{I as c}from"./interactive-graph-editor-U7Xkeg-M.js";import{I as P}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-uZxluT9z.js";import"./compare-59FC1ybr.js";import"./version-akiLXZts.js";import"./prop-types-RdWgf3K6.js";import"./index-hYQ6Pa3_.js";import"./index-V35CFGao.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-k9JCoeOY.js";import"./index-eZ2N530f.js";import"./tabbar-IAxGP4dM.js";import"./item-fHYIN_c3.js";import"./index-4JcgVDnF.js";import"./index-tvtfaFq4.js";import"./index-ACL0N2lY.js";import"./button-assets-K2ZoY3Yc.js";import"./keypad-button-qf5RMNu9.js";import"./operators-page-xJJKH4dX.js";import"./navigation-pad-cRy775HL.js";import"./index-uu39Elyn.js";import"./key-translator-NuuNqL6m.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-tvfqsLYr.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-TV6kwBoe.js";import"./index-e6QWP3dX.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-8OTwBtQh.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-rfwWDdTV.js";import"./index-k69q8Cna.js";import"./index-A0DvNMpb.js";import"./index-K7FSCCGN.js";import"./index-G0tWdZ0L.js";import"./index-SM3muJE2.js";import"./Popper-2p8US95Y.js";import"./math-input-B7gkOzeL.js";import"./unit-kRJG92HA.js";import"./input-with-examples-WdOJRUVL.js";import"./math-output-o5-UebzW.js";import"./text-input-JOc3GxhE.js";import"./index-N9PTEF-9.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-wnXxwSyA.js";import"./base-radio-fK6y60Ht.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-7OBjnDUY.js";import"./icon-HbAIhp4d.js";import"./choice-icon-Sx0010jw.js";import"./focus-ring-4m7DGTUl.js";import"./option-status--OOacwxI.js";import"./choice-none-above-2zb8Tyep.js";import"./video-transcript-link-ZVuMBlt5.js";import"./answer-choices-q5v5Wt5N.js";import"./button-group-eBTrRsKy.js";import"./graph-u5fbe7lV.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-Lk8Jr-mP.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-xUxfZXFc.js";import"./prop-check-box-Onr-2_t-.js";import"./range-input-CHOUH83e.js";import"./marker-JdwusVRD.js";import"./answer-pill-XvCJPa8R.js";import"./sortable-c4gBSOT_.js";import"./multi-renderer-TbomiwQG.js";import"./hints-renderer-_NCVLk8H.js";import"./components-Ly81wA2i.js";import"./interactive-graph-settings-RM8PdJKK.js";import"./util-r1Dnrca2.js";const T={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...P},Ee={title:"Perseus/Editor/Widgets/Interactive Graph Editor",component:c,argTypes:T},a=m=>d(c,{...m});a.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const i={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{});return d(c,{...e,onChange:r})}},p={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"},lockedFigures:[{type:"point",coord:[1,1]},{type:"point",coord:[-1,-1]}]});return d(c,{...e,onChange:r})}},s={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"}});return d(c,{...e,onChange:r})}};var h,l,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(g=(l=a.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var f,y,R,E,v;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(v=(E=i.parameters)==null?void 0:E.docs)==null?void 0:v.description}}};var w,k,I,G,S;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
        coord: [1, 1]
      }, {
        type: "point",
        coord: [-1, -1]
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(I=(k=p.parameters)==null?void 0:k.docs)==null?void 0:I.source},description:{story:`This InteractiveGraphEditor has locked figures. Locked figures are graph
elements such as points, lines, line segements, etc. that are locked in
place and not interactive.`,...(S=(G=p.parameters)==null?void 0:G.docs)==null?void 0:S.description}}};var b,x,C,j,O;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
a Mafs-based InteractiveGraph.`,...(O=(j=s.parameters)==null?void 0:j.docs)==null?void 0:O.description}}};const ve=["Default","Controlled","WithLockedPoints","WithMafs"];export{i as Controlled,a as Default,p as WithLockedPoints,s as WithMafs,ve as __namedExportsOrder,Ee as default};
