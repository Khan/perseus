import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as R}from"./index-4g5l5LRQ.js";import{L as p}from"./locked-vector-settings-h60C0MeR.js";import{g as k}from"./util-gC4TkU3b.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./svg-image-UfCByHtE.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./index-wjVcXLkf.js";import"./index-QR_wlop5.js";import"./locked-figure-settings-actions-YLvABO1y.js";import"./scrollless-number-text-field-A6-KLyao.js";import"./index-_rEjQfTM.js";import"./minus-bold-ONmDo3Ve.js";import"./answer-choices-99eGZVAv.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./x-6ZxseNgc.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./Popper-D86xJ3go.js";import"./i18n-context-DsDGD6dy.js";import"./strings-3jqcfOzr.js";import"./renderer-oy_Lc-D5.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-IvfTv29b.js";import"./choice-9W9dDTV4.js";import"./index-wgZGcu4m.js";import"./icon-TA3bBVIW.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-401hL_KJ.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-DOdQ-QjF.js";import"./color-select-v5AwKqWD.js";import"./article-renderer-SmZ0i9O2.js";import"./prop-types-ew9eayR0.js";import"./mobile-keypad-8hkmmP-T.js";import"./tabbar-tY-vWj59.js";import"./item-kdyp1JvI.js";import"./button-assets-W0P3gTHH.js";import"./keypad-button-dkA26ccQ.js";import"./operators-page-AaL31SSd.js";import"./navigation-pad-J3QJzD-6.js";import"./key-translator-NrLPOiYy.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./index-unb9_VrH.js";import"./math-input-TH7UZ2rn.js";import"./input-with-examples-05qPHCmY.js";import"./text-input-Q1V0RBx1.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-tVloz1vV.js";import"./base-radio-JGHr_AaJ.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-pNDEyvJb.js";import"./video-transcript-link-WioFGlG-.js";import"./button-group-KR3umc1e.js";import"./graph-VKYZ1zR1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-9C90QKz-.js";import"./range-input--rysMEnL.js";import"./marker-u70BHlat.js";import"./answer-pill-B78kpmfJ.js";import"./sortable-_U62NJ9c.js";import"./multi-renderer-cBeI2FHY.js";import"./hints-renderer-qD9-HtxR.js";import"./color-swatch-TI09xICT.js";import"./line-swatch-7dz03e1W.js";const dt={title:"PerseusEditor/Components/Locked Vector Settings",component:p},r=i=>m(p,{...i}),a={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};r.args=a;const e={render:function(){const[t,s]=R.useState(a);return m(p,{...t,expanded:!0,onChangeProps:n=>{s({...t,...n})}})}},o={render:function(){const[t,s]=R.useState(a);return m(p,{...t,points:[[0,0],[0,0]],expanded:!0,onChangeProps:n=>{s({...t,...n})}})}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};var d,c,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
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
