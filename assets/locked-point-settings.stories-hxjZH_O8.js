import{j as c}from"./jsx-runtime-5BUNAZ9W.js";import{r as s}from"./index-4g5l5LRQ.js";import{L as i}from"./locked-point-settings-lLaFTcc0.js";import{g as T}from"./util-ymjsz-zZ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-e4P84RkC.js";import"./index-awljIyHI.js";import"./index-wjVcXLkf.js";import"./index-lUErx3pE.js";import"./index-QR_wlop5.js";import"./locked-figure-settings-actions-YLvABO1y.js";import"./scrollless-number-text-field-A6-KLyao.js";import"./index-_rEjQfTM.js";import"./minus-bold-ONmDo3Ve.js";import"./answer-choices-99eGZVAv.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./index-jmm5gWkb.js";import"./x-6ZxseNgc.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./Popper-D86xJ3go.js";import"./i18n-context-DsDGD6dy.js";import"./strings-3jqcfOzr.js";import"./renderer-oy_Lc-D5.js";import"./version-akiLXZts.js";import"./util-KY8kJaBW.js";import"./jquery-yG1GhClm.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./asset-context-4nzQV6k0.js";import"./svg-image-UfCByHtE.js";import"./index-zXbQRqKp.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-IvfTv29b.js";import"./choice-9W9dDTV4.js";import"./index-wgZGcu4m.js";import"./icon-TA3bBVIW.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-401hL_KJ.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-DOdQ-QjF.js";import"./color-select-QOtGC4FQ.js";import"./article-renderer-5mtZQgsz.js";import"./prop-types-ew9eayR0.js";import"./mobile-keypad-8hkmmP-T.js";import"./tabbar-tY-vWj59.js";import"./item-kdyp1JvI.js";import"./button-assets-W0P3gTHH.js";import"./keypad-button-dkA26ccQ.js";import"./operators-page-AaL31SSd.js";import"./navigation-pad-J3QJzD-6.js";import"./key-translator-NrLPOiYy.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./index-unb9_VrH.js";import"./math-input-TH7UZ2rn.js";import"./input-with-examples-05qPHCmY.js";import"./text-input-Q1V0RBx1.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-tVloz1vV.js";import"./base-radio-JGHr_AaJ.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-pNDEyvJb.js";import"./video-transcript-link-WioFGlG-.js";import"./button-group-KR3umc1e.js";import"./graph-VKYZ1zR1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-9C90QKz-.js";import"./range-input--rysMEnL.js";import"./marker-u70BHlat.js";import"./answer-pill-B78kpmfJ.js";import"./sortable-_U62NJ9c.js";import"./multi-renderer-cnQlWINP.js";import"./hints-renderer-qD9-HtxR.js";import"./color-swatch-AAaEGC3_.js";import"./labeled-switch-Mszd0frV.js";const gr={title:"PerseusEditor/Components/Locked Point Settings",component:i},t=a=>c(i,{...a}),u={...T("point"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};t.args=u;const n={render:function(){const[o,e]=s.useState(u);return c(i,{...o,onChangeProps:p=>{e({...o,...p})}})}};n.parameters={chromatic:{disableSnapshot:!0}};const m={render:function(){const[o,e]=s.useState(!0),[r,p]=s.useState(u);return c(i,{...r,expanded:o,onToggle:e,onChangeProps:P=>{p({...r,...P})}})}},d={render:function(){const[o,e]=s.useState(!0),[r,p]=s.useState(u);return c(i,{...r,expanded:o,onToggle:e,onChangeProps:P=>{p({...r,...P})}})}};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var l,g,f;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedPointSettings {...args} />;
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,x,S;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(S=(x=n.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var E,R,U;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(U=(R=m.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var C,k,L;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(L=(k=d.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};const fr=["Default","Controlled","Expanded","ExpandedNondefaultProps"];export{n as Controlled,t as Default,m as Expanded,d as ExpandedNondefaultProps,fr as __namedExportsOrder,gr as default};
