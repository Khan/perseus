import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as R}from"./index-4g5l5LRQ.js";import{L as p}from"./locked-vector-settings-XOYNR8i3.js";import{g as k}from"./util-12KovFoR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./svg-image-w4vAVvEs.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-xwrcC5GD.js";import"./constants-CTNUT-ej.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./index-wjVcXLkf.js";import"./index-T3HXbpha.js";import"./coordinate-pair-input-oQdrVkC8.js";import"./scrollless-number-text-field-GDkKIt-C.js";import"./index-YQYcT5qz.js";import"./minus-bold-ONmDo3Ve.js";import"./locked-figure-settings-actions-bovzTqbK.js";import"./answer-choices--Sssr-eZ.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./Popper-bdbcdpLA.js";import"./index-z05-Lc8k.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./i18n-context-SHL040F7.js";import"./strings-U4LenZoO.js";import"./renderer-CDkxU16B.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-nhuHdd9z.js";import"./choice-RL6irUBp.js";import"./index-WyPu8vtE.js";import"./icon-TA3bBVIW.js";import"./media-queries-cW_QgwNP.js";import"./choice-icon-Uwdm3B_j.js";import"./focus-ring-z-znzPiA.js";import"./option-status-_NngQfjZ.js";import"./color-select-4qy4_RTS.js";import"./article-renderer-eZD1-vSC.js";import"./prop-types-6Qz-9GtK.js";import"./mobile-keypad-cY_XnmKN.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./button-assets-Z9EPvaqZ.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./key-translator-TewQj1fb.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./math-input-8DeMRXLB.js";import"./input-with-examples-6953sV_1.js";import"./text-input-wkUsDgzz.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-4VUVJbnD.js";import"./base-radio-Kq3rgYOa.js";import"./shared-43ihVE4t.js";import"./choice-none-above-xqvD6jJd.js";import"./video-transcript-link-jDAvsjOz.js";import"./button-group-KR3umc1e.js";import"./graph-pxFsqRWv.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-McwHJ8wr.js";import"./index-Z7PPA4aZ.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-_vmR2dDD.js";import"./range-input-W6BaCFKq.js";import"./marker-HNvhLreX.js";import"./answer-pill-WP7EFtov.js";import"./sortable-1fSPVr9M.js";import"./multi-renderer-XMBbXefU.js";import"./hints-renderer-ojm-2f9p.js";import"./color-swatch-FUmSS5mk.js";import"./line-swatch-ZKkgtFzL.js";const dt={title:"PerseusEditor/Components/Locked Vector Settings",component:p},r=i=>m(p,{...i}),a={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};r.args=a;const e={render:function(){const[t,s]=R.useState(a);return m(p,{...t,expanded:!0,onChangeProps:n=>{s({...t,...n})}})}},o={render:function(){const[t,s]=R.useState(a);return m(p,{...t,points:[[0,0],[0,0]],expanded:!0,onChangeProps:n=>{s({...t,...n})}})}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};var d,c,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedVectorSettings {...args} />;
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var l,P,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(g=(P=e.parameters)==null?void 0:P.docs)==null?void 0:g.source}}};var h,f,S,x,v;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(S=(f=o.parameters)==null?void 0:f.docs)==null?void 0:S.source},description:{story:`If the two points defining the vector are the same, the vector is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.description}}};const ct=["Default","Expanded","WithInvalidPoints"];export{r as Default,e as Expanded,o as WithInvalidPoints,ct as __namedExportsOrder,dt as default};
