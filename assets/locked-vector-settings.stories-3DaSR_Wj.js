import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as R}from"./index-4g5l5LRQ.js";import{L as p}from"./locked-vector-settings-9ShYKIeW.js";import{g as k}from"./util-ifLumoC3.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-TKXSNoh3.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./jquery-5v7aFUvu.js";import"./svg-image-oYAG2f52.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-A74C9PE_.js";import"./index-wjVcXLkf.js";import"./index-QR_wlop5.js";import"./locked-figure-settings-actions-5GvS_tT4.js";import"./index-_rEjQfTM.js";import"./minus-bold-ONmDo3Ve.js";import"./answer-choices-gTU4FC1A.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./x-6ZxseNgc.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./Popper-D86xJ3go.js";import"./i18n-context-3gTlIcWM.js";import"./strings-YJ61eiUN.js";import"./renderer-GKDviKbQ.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-cFDIds9P.js";import"./stub-tag-editor-HTvc7FsQ.js";import"./text-list-editor-A-LpoxgU.js";import"./lint-IvfTv29b.js";import"./choice--TeDH0lH.js";import"./index-wgZGcu4m.js";import"./icon-TA3bBVIW.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-cBSCcTMf.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-o8Ma0JxL.js";import"./color-select-oaa8geAA.js";import"./article-renderer-rjwZ1oZc.js";import"./prop-types-4qPBfWmq.js";import"./mobile-keypad-_omH0y9g.js";import"./tabbar-Oqt6c7oQ.js";import"./item-BvwJUNFE.js";import"./button-assets-W0P3gTHH.js";import"./keypad-button-dkA26ccQ.js";import"./operators-page-AaL31SSd.js";import"./navigation-pad-J3QJzD-6.js";import"./key-translator-2vF_So3l.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./info-tip-7k4XWhfR.js";import"./math-input-b0AfbzvY.js";import"./input-with-examples-FYjnIVEa.js";import"./text-input-Q1V0RBx1.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-3R2CyUYq.js";import"./base-radio-nYA-9s8h.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-5Mf7ttC9.js";import"./video-transcript-link-6o6i_Fnt.js";import"./button-group-KR3umc1e.js";import"./graph-pewJN-kC.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-JKQiwz_W.js";import"./prop-check-box-f7I2HerX.js";import"./range-input--OPosy8W.js";import"./marker-jT1__H6r.js";import"./answer-pill-OpToGOpb.js";import"./sortable-0kl_Gwn3.js";import"./multi-renderer--Aj7Gc6O.js";import"./hints-renderer-sHpQTDOm.js";import"./color-swatch-PrwGaeiO.js";import"./line-swatch-dmDjMbG6.js";const ut={title:"PerseusEditor/Components/Locked Vector Settings",component:p},r=i=>m(p,{...i}),a={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};r.args=a;const e={render:function(){const[t,s]=R.useState(a);return m(p,{...t,expanded:!0,onChangeProps:n=>{s({...t,...n})}})}},o={render:function(){const[t,s]=R.useState(a);return m(p,{...t,points:[[0,0],[0,0]],expanded:!0,onChangeProps:n=>{s({...t,...n})}})}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};var d,c,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
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
in this case.`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.description}}};const lt=["Default","Expanded","WithInvalidPoints"];export{r as Default,e as Expanded,o as WithInvalidPoints,lt as __namedExportsOrder,ut as default};
