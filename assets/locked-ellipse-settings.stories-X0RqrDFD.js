import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as a}from"./index-qhcEwEpg.js";import{L as e}from"./locked-ellipse-settings-Ff7G9s7c.js";import{g as C}from"./util-RicqMZ0C.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-y0ahOLO4.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-3U8aPQU9.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-AMPNwp1g.js";import"./index-oMd7J_hd.js";import"./tabbar-RiuhgrwC.js";import"./item-UPBCIzra.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./index-JT1-kTlx.js";import"./key-translator-LscBjx_B.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-jjL86lKc.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-xT-AdWRe.js";import"./index-TymzEsVR.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-1qqOuAdm.js";import"./index-DDXzYFOx.js";import"./index-OY3Waz-e.js";import"./index-O-KD2pfb.js";import"./index-KIBY7gd7.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-pR17nfay.js";import"./index-abFgrC9j.js";import"./unit-uxf7imOh.js";import"./input-with-examples-8HbLvJn4.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-ioObjG0H.js";import"./base-radio-ws2QVO5j.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-unuhbNi1.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-z6dOcxIR.js";import"./video-transcript-link-BKfVoN1g.js";import"./answer-choices-skv4R9qI.js";import"./button-group-eBTrRsKy.js";import"./graph-cl_EfieJ.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-8pHiOl5T.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-yQKE-Nit.js";import"./range-input-IMzA4hKn.js";import"./marker-VbVSGpet.js";import"./answer-pill-z-mEenC0.js";import"./sortable-dHcTySZE.js";import"./multi-renderer-QkgiNEjB.js";import"./hints-renderer-4c3-2RlH.js";import"./components-UmlgT2Z_.js";import"./color-select-XyiHqUz7.js";import"./color-swatch-ZxkR9SaY.js";import"./locked-figure-settings-actions-0mpFjl1M.js";const uo={title:"PerseusEditor/Components/Locked Ellipse Settings",component:e},r=i=>d(e,{...i}),c={...C("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};r.args=c;const o={render:function(){const[t,s]=a.useState(c);return d(e,{...t,onChangeProps:n=>{s({...t,...n})}})}};o.parameters={chromatic:{disableSnapshot:!0}};const p={render:function(){const[t,s]=a.useState(!0),[m,n]=a.useState(c);return d(e,{...m,expanded:t,onToggle:s,onChangeProps:R=>{n({...m,...R})}})}};var l,u,P;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(x=(E=p.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};const Po=["Default","Controlled","Expanded"];export{o as Controlled,r as Default,p as Expanded,Po as __namedExportsOrder,uo as default};
