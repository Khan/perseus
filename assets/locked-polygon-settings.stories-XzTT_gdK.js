import{j as d}from"./jsx-runtime-5BUNAZ9W.js";import{r as a}from"./index-4g5l5LRQ.js";import{L as e}from"./locked-polygon-settings-_coByCGf.js";import{g as E}from"./util-URBAQ7SL.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-KJSzUwse.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./prop-types-SiNm5cRq.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-jmm5gWkb.js";import"./mobile-keypad-fIN5N6sB.js";import"./index-FsYHUvK_.js";import"./index-e4P84RkC.js";import"./tabbar-tY-vWj59.js";import"./item-kdyp1JvI.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./button-assets-gSR_ngpH.js";import"./keypad-button-i3yjQmDW.js";import"./operators-page-AY25AXJ7.js";import"./navigation-pad-Z2fVjJac.js";import"./key-translator-uJhRSksH.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-bN75HO46.js";import"./index-dnMhQZ-1.js";import"./asset-context-4nzQV6k0.js";import"./svg-image-UfCByHtE.js";import"./index-zXbQRqKp.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-IvfTv29b.js";import"./index-unb9_VrH.js";import"./index-zE8cp1oq.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-QR_wlop5.js";import"./x-6ZxseNgc.js";import"./index-wjVcXLkf.js";import"./Popper-D86xJ3go.js";import"./i18n-context-SHL040F7.js";import"./strings-U4LenZoO.js";import"./math-input-FrakTMQN.js";import"./index-GPnNv0mI.js";import"./input-with-examples-TCaUQG9B.js";import"./text-input-Q1V0RBx1.js";import"./index-_rEjQfTM.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-JN8pTcjL.js";import"./base-radio-oSiEycJG.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-S5THRw8V.js";import"./icon-TA3bBVIW.js";import"./choice-icon-Fa6RfAAR.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-_NngQfjZ.js";import"./choice-none-above-qe5ccICH.js";import"./video-transcript-link-jDAvsjOz.js";import"./answer-choices-ZWrmm1Sg.js";import"./button-group-KR3umc1e.js";import"./graph-VKYZ1zR1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-_vmR2dDD.js";import"./range-input-W6BaCFKq.js";import"./marker-XyKMwKgn.js";import"./answer-pill-PjLcSVyV.js";import"./sortable-BJ0XVHDz.js";import"./multi-renderer--fGCB2aS.js";import"./hints-renderer-_cfyGynV.js";import"./locked-figure-settings-actions-_ujnFzt_.js";import"./scrollless-number-text-field-A6-KLyao.js";import"./color-select-4OReIL0Z.js";import"./color-swatch-kRP-kS_U.js";import"./labeled-switch-EVCtPoHd.js";const cr={title:"PerseusEditor/Components/Locked Polygon Settings",component:e},o=n=>d(e,{...n}),c={...E("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};o.args=c;const r={render:function(){const[t,s]=a.useState(c);return d(e,{...t,onChangeProps:m=>{s({...t,...m})}})}};r.parameters={chromatic:{disableSnapshot:!0}};const p={render:function(){const[t,s]=a.useState(!0),[i,m]=a.useState(c);return d(e,{...i,expanded:t,onToggle:s,onChangeProps:y=>{m({...i,...y})}})}};o.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,l,P;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedPolygonSettings {...args} />;
}`,...(P=(l=o.parameters)==null?void 0:l.docs)==null?void 0:P.source}}};var g,f,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var S,x,R;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(R=(x=p.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};const ur=["Default","Controlled","Expanded"];export{r as Controlled,o as Default,p as Expanded,ur as __namedExportsOrder,cr as default};
