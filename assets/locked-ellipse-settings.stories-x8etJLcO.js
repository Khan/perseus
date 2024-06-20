import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as a}from"./index-qhcEwEpg.js";import{L as e}from"./locked-ellipse-settings-YwqzqYUm.js";import{g as C}from"./util-RicqMZ0C.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-A-HQ80o-.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-3U8aPQU9.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-AMPNwp1g.js";import"./index-oMd7J_hd.js";import"./tabbar-RiuhgrwC.js";import"./item-UPBCIzra.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./index-JT1-kTlx.js";import"./key-translator-LscBjx_B.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-z9rWSR-h.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-xT-AdWRe.js";import"./index-TymzEsVR.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-JK7f6wub.js";import"./index-1lR5LStt.js";import"./index-B3k62xyQ.js";import"./index-O-KD2pfb.js";import"./index-KIBY7gd7.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-lgAGkFTu.js";import"./index-_6fd2Dz3.js";import"./unit-uxf7imOh.js";import"./input-with-examples-vUMb1LNk.js";import"./math-output-xqbS761x.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-ioObjG0H.js";import"./base-radio-X4yVNRMy.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-U2lXOTna.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-YN5vr-lD.js";import"./video-transcript-link-BKfVoN1g.js";import"./answer-choices-TmPiLQ8g.js";import"./button-group-eBTrRsKy.js";import"./graph-cl_EfieJ.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-_E95qi8X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-Z3f7giBx.js";import"./range-input-IMzA4hKn.js";import"./marker-HYWYvCk-.js";import"./answer-pill-yTPXaj9l.js";import"./sortable-OgepMx9Y.js";import"./multi-renderer-_cJgjxkE.js";import"./hints-renderer-FaPMGqg5.js";import"./components-InvkBiTZ.js";import"./color-select-TApXDNCA.js";import"./color-swatch-Zr03SRmg.js";import"./locked-figure-settings-actions-dCyRpQ3y.js";const Po={title:"PerseusEditor/Components/Locked Ellipse Settings",component:e},r=i=>d(e,{...i}),c={...C("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};r.args=c;const o={render:function(){const[t,s]=a.useState(c);return d(e,{...t,onChangeProps:n=>{s({...t,...n})}})}};o.parameters={chromatic:{disableSnapshot:!0}};const p={render:function(){const[t,s]=a.useState(!0),[m,n]=a.useState(c);return d(e,{...m,expanded:t,onToggle:s,onChangeProps:R=>{n({...m,...R})}})}};var l,u,P;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedEllipseSettings {...args} />;
}`,...(P=(u=r.parameters)==null?void 0:u.docs)==null?void 0:P.source}}};var g,S,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(f=(S=o.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var h,E,x;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(x=(E=p.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};const go=["Default","Controlled","Expanded"];export{o as Controlled,r as Default,p as Expanded,go as __namedExportsOrder,Po as default};
