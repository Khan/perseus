import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as R}from"./index-4g5l5LRQ.js";import{L as p}from"./locked-vector-settings-WhCuw11_.js";import{g as k}from"./util-00_Q93kT.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./svg-image-UfCByHtE.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./index-wjVcXLkf.js";import"./index-KZ9xT8RQ.js";import"./coordinate-pair-input-QWaIoUlf.js";import"./scrollless-number-text-field-GDkKIt-C.js";import"./index-YQYcT5qz.js";import"./minus-bold-ONmDo3Ve.js";import"./locked-figure-settings-actions-MqTzeX3N.js";import"./answer-choices-91H7kwe8.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./x-6ZxseNgc.js";import"./index-hihFCi2M.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./Popper-D86xJ3go.js";import"./i18n-context-5R-kLn05.js";import"./strings-f8zw0_o5.js";import"./renderer-kDBXo1QQ.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-IvfTv29b.js";import"./choice--doa5VMp.js";import"./index-GPnNv0mI.js";import"./icon-TA3bBVIW.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-LY8yd0no.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-7w42WRhj.js";import"./color-select-gLJkL_LB.js";import"./article-renderer-LD57Whwx.js";import"./prop-types-zMIQXwU0.js";import"./mobile-keypad-cY_XnmKN.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./button-assets-Z9EPvaqZ.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./key-translator-Hs3Uhnzm.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./index-8nUh1h5D.js";import"./math-input-6SkbBwHq.js";import"./input-with-examples-6G0tQKF4.js";import"./text-input-wkUsDgzz.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-Kh9rQ9F_.js";import"./base-radio-juB-Jx_w.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-UKDLp-qA.js";import"./video-transcript-link-92OgvJfI.js";import"./button-group-KR3umc1e.js";import"./graph-VKYZ1zR1.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-CBpHDTnb.js";import"./range-input-pIZWHWbz.js";import"./marker-s550EdTF.js";import"./answer-pill-ShW3Aevp.js";import"./sortable-acK_F6gn.js";import"./multi-renderer-GSo-lpPB.js";import"./hints-renderer-qYrUpJs9.js";import"./color-swatch-OJttb_Wq.js";import"./line-swatch-nNwNKNpQ.js";const ct={title:"PerseusEditor/Components/Locked Vector Settings",component:p},r=i=>m(p,{...i}),a={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};r.args=a;const e={render:function(){const[t,s]=R.useState(a);return m(p,{...t,expanded:!0,onChangeProps:n=>{s({...t,...n})}})}},o={render:function(){const[t,s]=R.useState(a);return m(p,{...t,points:[[0,0],[0,0]],expanded:!0,onChangeProps:n=>{s({...t,...n})}})}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};var d,c,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
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
in this case.`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.description}}};const ut=["Default","Expanded","WithInvalidPoints"];export{r as Default,e as Expanded,o as WithInvalidPoints,ut as __namedExportsOrder,ct as default};
