import{j as c}from"./jsx-runtime-5BUNAZ9W.js";import{r as s}from"./index-4g5l5LRQ.js";import{L as i}from"./locked-point-settings-_aREYTxo.js";import{g as T}from"./util-12KovFoR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-e4P84RkC.js";import"./index-awljIyHI.js";import"./index-wjVcXLkf.js";import"./index-lUErx3pE.js";import"./index-T3HXbpha.js";import"./coordinate-pair-input-oQdrVkC8.js";import"./scrollless-number-text-field-GDkKIt-C.js";import"./index-YQYcT5qz.js";import"./minus-bold-ONmDo3Ve.js";import"./locked-figure-settings-actions-bovzTqbK.js";import"./answer-choices--Sssr-eZ.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./index-jmm5gWkb.js";import"./Popper-bdbcdpLA.js";import"./index-z05-Lc8k.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./i18n-context-SHL040F7.js";import"./strings-U4LenZoO.js";import"./renderer-CDkxU16B.js";import"./version-akiLXZts.js";import"./util-KY8kJaBW.js";import"./jquery-yG1GhClm.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./asset-context-4nzQV6k0.js";import"./svg-image-w4vAVvEs.js";import"./index-zXbQRqKp.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-xwrcC5GD.js";import"./constants-CTNUT-ej.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-nhuHdd9z.js";import"./choice-RL6irUBp.js";import"./index-WyPu8vtE.js";import"./icon-TA3bBVIW.js";import"./media-queries-cW_QgwNP.js";import"./choice-icon-Uwdm3B_j.js";import"./focus-ring-z-znzPiA.js";import"./option-status-_NngQfjZ.js";import"./color-select-4qy4_RTS.js";import"./article-renderer-eZD1-vSC.js";import"./prop-types-6Qz-9GtK.js";import"./mobile-keypad-cY_XnmKN.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./button-assets-Z9EPvaqZ.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./key-translator-TewQj1fb.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./math-input-8DeMRXLB.js";import"./input-with-examples-6953sV_1.js";import"./text-input-wkUsDgzz.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-4VUVJbnD.js";import"./base-radio-Kq3rgYOa.js";import"./shared-43ihVE4t.js";import"./choice-none-above-xqvD6jJd.js";import"./video-transcript-link-jDAvsjOz.js";import"./button-group-KR3umc1e.js";import"./graph-pxFsqRWv.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-McwHJ8wr.js";import"./index-Z7PPA4aZ.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-_vmR2dDD.js";import"./range-input-W6BaCFKq.js";import"./marker-HNvhLreX.js";import"./answer-pill-WP7EFtov.js";import"./sortable-1fSPVr9M.js";import"./multi-renderer-XMBbXefU.js";import"./hints-renderer-ojm-2f9p.js";import"./color-swatch-FUmSS5mk.js";import"./labeled-switch-9vikQrzG.js";const gr={title:"PerseusEditor/Components/Locked Point Settings",component:i},t=a=>c(i,{...a}),u={...T("point"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};t.args=u;const n={render:function(){const[o,e]=s.useState(u);return c(i,{...o,onChangeProps:p=>{e({...o,...p})}})}};n.parameters={chromatic:{disableSnapshot:!0}};const m={render:function(){const[o,e]=s.useState(!0),[r,p]=s.useState(u);return c(i,{...r,expanded:o,onToggle:e,onChangeProps:P=>{p({...r,...P})}})}},d={render:function(){const[o,e]=s.useState(!0),[r,p]=s.useState(u);return c(i,{...r,expanded:o,onToggle:e,onChangeProps:P=>{p({...r,...P})}})}};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var l,g,f;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
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
