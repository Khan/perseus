import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as u}from"./index-qhcEwEpg.js";import{I as c}from"./interactive-graph-editor-bo6-QIBV.js";import{I as P}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-ZKLAaiPX.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-KRfM671r.js";import"./index-V35CFGao.js";import"./index-Hz0Gzck5.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-6Vp71kw2.js";import"./index-eZ2N530f.js";import"./tabbar-tfdvSs1w.js";import"./item-LrtZPXdS.js";import"./index-8oa4UR4H.js";import"./index-tvtfaFq4.js";import"./button-assets-K2ZoY3Yc.js";import"./keypad-button-7JxJOu1U.js";import"./operators-page-c1GFGYoA.js";import"./navigation-pad-Re9ZPJb7.js";import"./index-uu39Elyn.js";import"./key-translator-WqvM87uk.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-_bsJu_IP.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-Gtdh9yHY.js";import"./index-4IQmaM8V.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-HWMzrHku.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-0-BnELzl.js";import"./index-d6Em9gqx.js";import"./index-tMKG4RaL.js";import"./index-K7FSCCGN.js";import"./index-JYodlA82.js";import"./index-SM3muJE2.js";import"./Popper-2p8US95Y.js";import"./math-input-T_rEODHI.js";import"./unit-tpB2tohZ.js";import"./input-with-examples-JVXG6Unj.js";import"./math-output-o5-UebzW.js";import"./text-input-lrKkZkz6.js";import"./index-0Du6oPxz.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-K-bUKH0m.js";import"./base-radio-atCZ36jN.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-UdraqEpd.js";import"./icon-HbAIhp4d.js";import"./choice-icon-xGdQdsqz.js";import"./focus-ring-4m7DGTUl.js";import"./option-status-lQr4Jfyh.js";import"./choice-none-above-SE19qtph.js";import"./video-transcript-link-9hPzAvt5.js";import"./answer-choices-KFsplkg6.js";import"./button-group-eBTrRsKy.js";import"./graph-ikvgyli5.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-wjwyUctM.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-33S79dZV.js";import"./prop-check-box-KX2CKGx_.js";import"./range-input-zsZZAHYZ.js";import"./marker-J7oFRo_e.js";import"./answer-pill-Iy4SsiNS.js";import"./sortable-ekbbC2Au.js";import"./multi-renderer-y3tyDHFE.js";import"./hints-renderer-vB-0m2XB.js";import"./components-o27Ctktm.js";import"./interactive-graph-settings-rBMnh1OT.js";import"./locked-point-settings-8SfCncs2.js";import"./color-circle-sJX-H4CK.js";import"./color-select-6s_z07Fe.js";import"./perseus-types-FVzQqVLf.js";import"./util-QZ-4fnoK.js";const T={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...P},kt={title:"Perseus Editor/Widgets/Interactive Graph Editor",component:c,argTypes:T},a=m=>d(c,{...m});a.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const i={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=u.useReducer(e,{});return d(c,{...t,onChange:r})}},p={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=u.useReducer(e,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"},lockedFigures:[{type:"point",coord:[1,1],color:"blue",filled:!0},{type:"point",coord:[-1,-1],color:"purple",filled:!1}]});return d(c,{...t,onChange:r})}},s={render:function(){const e=(o,n)=>({...o,...n}),[t,r]=u.useReducer(e,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"}});return d(c,{...t,onChange:r})}};var l,h,g;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
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
a Mafs-based InteractiveGraph.`,...(O=(j=s.parameters)==null?void 0:j.docs)==null?void 0:O.description}}};const It=["Default","Controlled","WithLockedPoints","WithMafs"];export{i as Controlled,a as Default,p as WithLockedPoints,s as WithMafs,It as __namedExportsOrder,kt as default};
