import{j as m}from"./jsx-runtime-BGVbfQ2Z.js";import{r as n}from"./index-qhcEwEpg.js";import{L as p}from"./locked-line-settings-PSPlYRwr.js";import{g}from"./util-RR67UMDN.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-Kf-UsGkl.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./compare-VLxlEkSV.js";import"./jquery-5v7aFUvu.js";import"./svg-image-ImGr8npy.js";import"./index-TymzEsVR.js";import"./index-awljIyHI.js";import"./index-oMd7J_hd.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-fnqF3NiV.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./answer-choices-Y9Xz84Nm.js";import"./index-B3k62xyQ.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./index-KIBY7gd7.js";import"./index-O-KD2pfb.js";import"./minus-bold-ONmDo3Ve.js";import"./index-1lR5LStt.js";import"./index-JT1-kTlx.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./renderer--qvWlSJl.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./locked-figure-settings-actions-ohFDpDl1.js";import"./index-ZObC1LzG.js";import"./choice-U2lXOTna.js";import"./index-_6fd2Dz3.js";import"./index-JK7f6wub.js";import"./icon-HbAIhp4d.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./color-select-UGfAdSXZ.js";import"./article-renderer-mEwkL7TN.js";import"./prop-types-oYjo1VuK.js";import"./index-3xb9Ri9D.js";import"./tabbar-_VM3Ijmc.js";import"./item-HTAlbNMZ.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./key-translator-yjRRNSuW.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./math-input-Ah4BQ4X3.js";import"./unit-3mV5sRes.js";import"./input-with-examples-iGYlZivN.js";import"./text-input-yDsqFbe3.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-NKfzL8jd.js";import"./base-radio-L2CQ04LW.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-MDBaQstQ.js";import"./video-transcript-link-BKfVoN1g.js";import"./button-group-eBTrRsKy.js";import"./graph-Bysq6csc.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-_E95qi8X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-nytuiJQZ.js";import"./prop-check-box-s_QybB1E.js";import"./range-input-qxBl8f4w.js";import"./marker-Y5tkNjao.js";import"./answer-pill-hif8yB8_.js";import"./sortable-PbO9y_mO.js";import"./multi-renderer-t1dfkskt.js";import"./hints-renderer-pIUhNPbD.js";import"./color-swatch-kjTOKiuP.js";import"./labeled-switch-Ik3SN9L1.js";import"./line-swatch-rV4RQNQP.js";const Er={title:"PerseusEditor/Components/Locked Line Settings",component:p},a=s=>m(p,{...s}),c={...g("line"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};a.args=c;const d={render:function(){const[e,t]=n.useState(c);return m(p,{...e,onChangeProps:o=>{t({...e,...o})}})}};d.parameters={chromatic:{disableSnapshot:!0}};const i={render:function(){const[e,t]=n.useState(c),r=o=>{t({...e,...o})};return m(p,{...e,points:[g("point"),g("point")],expanded:!0,onChangeProps:r})}},u={render:function(){const[e,t]=n.useState(!0),[r,o]=n.useState(c);return m(p,{...r,expanded:e,onToggle:t,onChangeProps:P=>{o({...r,...P})}})}},l={render:function(){const[e,t]=n.useState(!0),[r,o]=n.useState({...c,kind:"segment",color:"green",lineStyle:"dashed"});return m(p,{...r,expanded:e,onToggle:t,onChangeProps:P=>{o({...r,...P})}})}};var h,f,S;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedLineSettings {...args} />;
}`,...(S=(f=a.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,R,L;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(L=(R=d.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var U,E,C,k,w;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} points={[getDefaultFigureForType("point"), getDefaultFigureForType("point")]} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(C=(E=i.parameters)==null?void 0:E.docs)==null?void 0:C.source},description:{story:`If the two points defining the line are the same, the line is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(w=(k=i.parameters)==null?void 0:k.docs)==null?void 0:w.description}}};var y,T,v;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(v=(T=u.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var F,D,I;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState({
      ...defaultProps,
      kind: ("segment" as const),
      color: ("green" as const),
      lineStyle: ("dashed" as const)
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(I=(D=l.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};const Cr=["Default","Controlled","WithInvalidPoints","Expanded","ExpandedNondefaultProps"];export{d as Controlled,a as Default,u as Expanded,l as ExpandedNondefaultProps,i as WithInvalidPoints,Cr as __namedExportsOrder,Er as default};
