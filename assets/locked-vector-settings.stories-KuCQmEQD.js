import{j as m}from"./jsx-runtime-BGVbfQ2Z.js";import{r as R}from"./index-qhcEwEpg.js";import{L as e}from"./locked-vector-settings-Tuyn3Ym_.js";import{g as k}from"./util-RicqMZ0C.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-WvQWLN3r.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-OpXxk17X.js";import"./dependencies-fnqF3NiV.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./jquery-5v7aFUvu.js";import"./svg-image-xT-AdWRe.js";import"./index-TymzEsVR.js";import"./index-awljIyHI.js";import"./index-oMd7J_hd.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./index-KIBY7gd7.js";import"./index-OY3Waz-e.js";import"./locked-figure-settings-actions-Pvyh1btQ.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./answer-choices-Ay8Xtf93.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./index-O-KD2pfb.js";import"./index-DDXzYFOx.js";import"./index-JT1-kTlx.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./renderer-0WTyF9ZX.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./choice-unuhbNi1.js";import"./index-abFgrC9j.js";import"./index-1qqOuAdm.js";import"./icon-HbAIhp4d.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./color-select-rz9TkPVj.js";import"./article-renderer-to0ZfarK.js";import"./prop-types-jdUahVZn.js";import"./index-sCB_kSsR.js";import"./tabbar-RiuhgrwC.js";import"./item-UPBCIzra.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./key-translator-UzZNd-SZ.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./math-input-MqsITSV1.js";import"./unit-uxf7imOh.js";import"./input-with-examples-qIcgAf54.js";import"./text-input-yDsqFbe3.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-BUDc8s6t.js";import"./base-radio-ZMSPcM4W.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-Hcuv7pqR.js";import"./video-transcript-link-BKfVoN1g.js";import"./button-group-eBTrRsKy.js";import"./graph-cl_EfieJ.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-8pHiOl5T.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-yQKE-Nit.js";import"./range-input-IMzA4hKn.js";import"./marker-OdTsGYa1.js";import"./answer-pill-O4c6x4l9.js";import"./sortable-1YPVk0eX.js";import"./multi-renderer-o3BJ6a2L.js";import"./hints-renderer-PcBqRSON.js";import"./color-swatch-5i6KR9T1.js";import"./line-swatch-azrdlGRT.js";const ut={title:"PerseusEditor/Components/Locked Vector Settings",component:e},o=i=>m(e,{...i}),a={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};o.args=a;const p={render:function(){const[r,s]=R.useState(a);return m(e,{...r,expanded:!0,onChangeProps:n=>{s({...r,...n})}})}},t={render:function(){const[r,s]=R.useState(a);return m(e,{...r,points:[[0,0],[0,0]],expanded:!0,onChangeProps:n=>{s({...r,...n})}})}};var d,c,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedVectorSettings {...args} />;
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var P,l,g;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedVectorSettings {...props} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(g=(l=p.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var h,f,S,x,v;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedVectorSettings {...props} points={[[0, 0], [0, 0]]} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(S=(f=t.parameters)==null?void 0:f.docs)==null?void 0:S.source},description:{story:`If the two points defining the vector are the same, the vector is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(v=(x=t.parameters)==null?void 0:x.docs)==null?void 0:v.description}}};const Pt=["Default","Expanded","WithInvalidPoints"];export{o as Default,p as Expanded,t as WithInvalidPoints,Pt as __namedExportsOrder,ut as default};
