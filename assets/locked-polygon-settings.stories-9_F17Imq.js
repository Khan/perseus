import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as a}from"./index-qhcEwEpg.js";import{L as e}from"./locked-polygon-settings-8AJdjyIo.js";import{g as y}from"./util-RR67UMDN.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-4ybG3pwb.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-oYjo1VuK.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-3xb9Ri9D.js";import"./index-oMd7J_hd.js";import"./tabbar-_VM3Ijmc.js";import"./item-HTAlbNMZ.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./index-JT1-kTlx.js";import"./key-translator-yjRRNSuW.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./perseus-error-l3K_anoI.js";import"./renderer--qvWlSJl.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-ImGr8npy.js";import"./index-TymzEsVR.js";import"./dependencies-fnqF3NiV.js";import"./util-Kf-UsGkl.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-JK7f6wub.js";import"./index-1lR5LStt.js";import"./index-B3k62xyQ.js";import"./index-O-KD2pfb.js";import"./index-KIBY7gd7.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-Ah4BQ4X3.js";import"./index-_6fd2Dz3.js";import"./unit-3mV5sRes.js";import"./input-with-examples-iGYlZivN.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-NKfzL8jd.js";import"./base-radio-L2CQ04LW.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-U2lXOTna.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-MDBaQstQ.js";import"./video-transcript-link-BKfVoN1g.js";import"./answer-choices-Y9Xz84Nm.js";import"./button-group-eBTrRsKy.js";import"./graph-Bysq6csc.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-_E95qi8X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-nytuiJQZ.js";import"./prop-check-box-s_QybB1E.js";import"./range-input-qxBl8f4w.js";import"./marker-Y5tkNjao.js";import"./answer-pill-hif8yB8_.js";import"./sortable-PbO9y_mO.js";import"./multi-renderer-sqnU2hbR.js";import"./hints-renderer-_Xno86Gb.js";import"./locked-figure-settings-actions-ohFDpDl1.js";import"./color-select-FJaolJQ1.js";import"./color-swatch-Almbs7PS.js";import"./labeled-switch-wUuHqWej.js";const lr={title:"PerseusEditor/Components/Locked Polygon Settings",component:e},o=n=>d(e,{...n}),c={...y("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};o.args=c;const r={render:function(){const[t,m]=a.useState(c);return d(e,{...t,onChangeProps:s=>{m({...t,...s})}})}};r.parameters={chromatic:{disableSnapshot:!0}};const p={render:function(){const[t,m]=a.useState(!0),[i,s]=a.useState(c);return d(e,{...i,expanded:t,onToggle:m,onChangeProps:E=>{s({...i,...E})}})}};var u,l,P;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedPolygonSettings {...args} />;
}`,...(P=(l=o.parameters)==null?void 0:l.docs)==null?void 0:P.source}}};var g,S,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPolygonSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(f=(S=r.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var h,x,R;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPolygonSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(R=(x=p.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};const Pr=["Default","Controlled","Expanded"];export{r as Controlled,o as Default,p as Expanded,Pr as __namedExportsOrder,lr as default};
