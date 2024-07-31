import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as R}from"./index-4g5l5LRQ.js";import{L as p}from"./locked-vector-settings-zetEV3Rf.js";import{g as k}from"./util-Id6PCvd0.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-Q3BXsyUV.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./jquery-5v7aFUvu.js";import"./svg-image-1N9MukZl.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-A74C9PE_.js";import"./index-wjVcXLkf.js";import"./index-QR_wlop5.js";import"./locked-figure-settings-actions-8x3nUSLl.js";import"./index-_rEjQfTM.js";import"./minus-bold-ONmDo3Ve.js";import"./answer-choices-NDfgNgvH.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./x-6ZxseNgc.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./Popper-D86xJ3go.js";import"./i18n-context-DsDGD6dy.js";import"./strings-3jqcfOzr.js";import"./renderer-JrrbFnUG.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-cFDIds9P.js";import"./stub-tag-editor-HTvc7FsQ.js";import"./text-list-editor-A-LpoxgU.js";import"./lint-IvfTv29b.js";import"./choice-qG_WG2X3.js";import"./index-wgZGcu4m.js";import"./icon-TA3bBVIW.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-401hL_KJ.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-DOdQ-QjF.js";import"./color-select-4mnY_BL7.js";import"./article-renderer-YIHHPhvz.js";import"./prop-types-ew9eayR0.js";import"./mobile-keypad-8hkmmP-T.js";import"./tabbar-tY-vWj59.js";import"./item-kdyp1JvI.js";import"./button-assets-W0P3gTHH.js";import"./keypad-button-dkA26ccQ.js";import"./operators-page-AaL31SSd.js";import"./navigation-pad-J3QJzD-6.js";import"./key-translator-NrLPOiYy.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./info-tip-7k4XWhfR.js";import"./math-input-NQxFBc18.js";import"./input-with-examples-oId8yfSS.js";import"./text-input-Q1V0RBx1.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-tVloz1vV.js";import"./base-radio-jjzrjL5j.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-aC8Dh0vL.js";import"./video-transcript-link-WioFGlG-.js";import"./button-group-KR3umc1e.js";import"./graph-xQwCqgdo.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-qa6WcWGj.js";import"./prop-check-box-f7I2HerX.js";import"./range-input-8CEPNQ51.js";import"./marker-tCR8bInb.js";import"./answer-pill-kCSNcNzQ.js";import"./sortable-jy7O6trk.js";import"./multi-renderer-bg111NeV.js";import"./hints-renderer-cyjup-_j.js";import"./color-swatch-nkZydW8F.js";import"./line-swatch-ISG-bxUc.js";const ut={title:"PerseusEditor/Components/Locked Vector Settings",component:p},r=i=>m(p,{...i}),a={...k("vector"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};r.args=a;const e={render:function(){const[t,s]=R.useState(a);return m(p,{...t,expanded:!0,onChangeProps:n=>{s({...t,...n})}})}},o={render:function(){const[t,s]=R.useState(a);return m(p,{...t,points:[[0,0],[0,0]],expanded:!0,onChangeProps:n=>{s({...t,...n})}})}};r.__docgenInfo={description:"",methods:[],displayName:"Default"};var d,c,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
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
