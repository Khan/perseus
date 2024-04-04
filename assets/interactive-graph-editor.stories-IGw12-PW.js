import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as u}from"./index-qhcEwEpg.js";import{I as c}from"./interactive-graph-editor-o-KhkMAg.js";import{I as P}from"./interactive-graph-settings.argtypes-6T40gg9D.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-eAROP0i9.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-kPsd7mQ-.js";import"./index-V35CFGao.js";import"./index-Hz0Gzck5.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-ro9eMDh3.js";import"./index-eZ2N530f.js";import"./tabbar-KlCELibv.js";import"./item-5Y8pErNg.js";import"./index-srUwhG8U.js";import"./index-tvtfaFq4.js";import"./button-assets-K2ZoY3Yc.js";import"./keypad-button-VkYP-uH6.js";import"./operators-page-8wHRNqBi.js";import"./navigation-pad-dX3NhTAE.js";import"./index-uu39Elyn.js";import"./key-translator-_9bpijyh.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-BA6wKxz1.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-G7sjuOBT.js";import"./index-4IQmaM8V.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-jqcWD9IE.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-KBRksCab.js";import"./index-TodJevs_.js";import"./index-A0DvNMpb.js";import"./index-K7FSCCGN.js";import"./index-5wVX51Nj.js";import"./index-SM3muJE2.js";import"./Popper-2p8US95Y.js";import"./math-input-H0Iwin6Q.js";import"./unit-tpB2tohZ.js";import"./input-with-examples-zChkbcF4.js";import"./math-output-o5-UebzW.js";import"./text-input-wM71qCBt.js";import"./index-U8sCsfQj.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-s67b1Adp.js";import"./base-radio-yjDB8MiX.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-ycfm5rYV.js";import"./icon-HbAIhp4d.js";import"./choice-icon-xGdQdsqz.js";import"./focus-ring-4m7DGTUl.js";import"./option-status-lQr4Jfyh.js";import"./choice-none-above-GtwLCnuD.js";import"./video-transcript-link-OKNeGZxl.js";import"./answer-choices-fPoQNK3_.js";import"./button-group-eBTrRsKy.js";import"./graph-zDvNmw57.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-wjwyUctM.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-OD1ToMin.js";import"./prop-check-box-HVj5fBdn.js";import"./range-input-3ju1pU_r.js";import"./marker-bx7XojRN.js";import"./answer-pill-VD9RMP8w.js";import"./sortable-yp6Ps7fw.js";import"./multi-renderer-qzUjEOn7.js";import"./hints-renderer-6DpnJxQB.js";import"./components-H-J71Veo.js";import"./interactive-graph-settings-JQG7OuZz.js";import"./util-r1Dnrca2.js";const T={apiOptions:{control:{type:"object"},type:{name:"object",required:!0}},correct:{control:{type:null},type:{name:"object",required:!1}},graph:{control:{type:"object"},type:{name:"object",required:!0}},lockedFigures:{control:{type:"object"},type:{name:"Array<LockedFigure>",required:!1}},onChange:{control:{type:"function"},type:{name:"(props: Partial<Props>) => void",required:!0}},...P},Re={title:"Perseus Editor/Widgets/Interactive Graph Editor",component:c,argTypes:T},a=m=>d(c,{...m});a.args={box:[288,288],gridStep:[1,1],labels:["x","y"],markings:"graph",range:[[-10,10],[-10,10]],rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1,snapStep:[1,1],step:[1,1]};const i={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{});return d(c,{...e,onChange:r})}},p={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"},lockedFigures:[{type:"point",coord:[1,1]},{type:"point",coord:[-1,-1],style:{stroke:"gold",fill:"gold"}}]});return d(c,{...e,onChange:r})}},s={render:function(){const t=(o,n)=>({...o,...n}),[e,r]=u.useReducer(t,{apiOptions:{flags:{mafs:{segment:!0}}},graph:{type:"segment"},correct:{type:"segment"}});return d(c,{...e,onChange:r})}};var l,g,h;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
  return <InteractiveGraphEditor {...args} />;
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,y,R,E,k;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
props are controlled by the parent. (Checkboxes update when clicked, etc.)`,...(k=(E=i.parameters)==null?void 0:E.docs)==null?void 0:k.description}}};var v,w,I,G,S;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
        coord: [-1, -1],
        style: {
          stroke: "gold",
          fill: "gold"
        }
      }]
    });
    return <InteractiveGraphEditor {...state} onChange={dispatch} />;
  }
}`,...(I=(w=p.parameters)==null?void 0:w.docs)==null?void 0:I.source},description:{story:`This InteractiveGraphEditor has locked figures. Locked figures are graph
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
a Mafs-based InteractiveGraph.`,...(O=(j=s.parameters)==null?void 0:j.docs)==null?void 0:O.description}}};const Ee=["Default","Controlled","WithLockedPoints","WithMafs"];export{i as Controlled,a as Default,p as WithLockedPoints,s as WithMafs,Ee as __namedExportsOrder,Re as default};
