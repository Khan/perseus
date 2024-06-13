import{j as s}from"./jsx-runtime-BGVbfQ2Z.js";import{r as x}from"./index-qhcEwEpg.js";import{L as p}from"./locked-vector-settings-bJQ4sWgj.js";import{g as a}from"./util-NNtyu1l3.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-EDQcR2F7.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-OpXxk17X.js";import"./dependencies-fnqF3NiV.js";import"./compare-59FC1ybr.js";import"./version-akiLXZts.js";import"./jquery-5v7aFUvu.js";import"./svg-image-lYtLGErm.js";import"./index-mohBxQl_.js";import"./index-awljIyHI.js";import"./index-4c2J3ov1.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./index-h47zdzUa.js";import"./index-qh_wob3p.js";import"./color-select-DJdQsRso.js";import"./article-renderer-GkWQa1ny.js";import"./prop-types-VEqj8M-u.js";import"./index-sCIolE-R.js";import"./tabbar-_HYg3Kcf.js";import"./item-MgaZQyPg.js";import"./index-VhM44oCk.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-BUF7auet.js";import"./operators-page-H6dLcd0l.js";import"./navigation-pad-URlj9thj.js";import"./index-JT1-kTlx.js";import"./key-translator-uZU3CxVJ.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./renderer-hl8X5cVO.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-XkoWPDUZ.js";import"./index-0C4KXdeC.js";import"./stub-tag-editor-f1WdYARp.js";import"./text-list-editor-xQBHt64k.js";import"./lint-4QkP-VXi.js";import"./index-xE_wKg8s.js";import"./index-kutQl4v0.js";import"./index-_15Y2y0p.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-VMbNQVXB.js";import"./index-3tBZ6RgE.js";import"./unit-ovoXKu5O.js";import"./input-with-examples-jyEz1IVC.js";import"./math-output-me3cXzXD.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-6x94GZ43.js";import"./base-radio-o-i9tZ9C.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-rFAFMrR4.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-mR5lZbAT.js";import"./video-transcript-link-g12jSPmn.js";import"./answer-choices-NDEW-H2U.js";import"./button-group-eBTrRsKy.js";import"./graph-e5NeKk0k.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-7OZQMH1X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-k4bRs4vK.js";import"./prop-check-box-ZNuWlBix.js";import"./range-input-zCtWZXYe.js";import"./marker-2GXURCib.js";import"./answer-pill-l5agfFCB.js";import"./sortable-8PK3J5nJ.js";import"./multi-renderer-8S9Ndef_.js";import"./hints-renderer-D_ElXUgG.js";import"./color-swatch-fKCxZxWv.js";import"./locked-figure-settings-actions-9S_GFDtM.js";import"./line-swatch-Y2qXMUFh.js";const Po={title:"PerseusEditor/Components/Locked Vector Settings",component:p},t=i=>s(p,{...i});t.args={...a("vector"),onChangeProps:()=>{},onRemove:()=>{}};const e={render:function(){const[r,n]=x.useState({...a("vector"),onRemove:()=>{}});return s(p,{...r,expanded:!0,onChangeProps:m=>{n({...r,...m})}})}},o={render:function(){const[r,n]=x.useState({...a("vector"),onRemove:()=>{}});return s(p,{...r,points:[[0,0],[0,0]],expanded:!0,onChangeProps:m=>{n({...r,...m})}})}};var d,c,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedVectorSettings {...args} />;
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var g,l,P;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("vector"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedVectorSettings {...props} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(P=(l=e.parameters)==null?void 0:l.docs)==null?void 0:P.source}}};var h,f,v,R,S;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("vector"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedVectorSettings {...props} points={[[0, 0], [0, 0]]} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(v=(f=o.parameters)==null?void 0:f.docs)==null?void 0:v.source},description:{story:`If the two points defining the vector are the same, the vector is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(S=(R=o.parameters)==null?void 0:R.docs)==null?void 0:S.description}}};const ho=["Default","Expanded","WithInvalidPoints"];export{t as Default,e as Expanded,o as WithInvalidPoints,ho as __namedExportsOrder,Po as default};
