import{j as n}from"./jsx-runtime-FVsy8kgq.js";import{a}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{r as c}from"./index-TT1qJ6UJ.js";import{B as l}from"./behavior-n6CFW35n.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-uXYWGyOY.js";import"./util-XR-uqOh-.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./prop-types-SKtvHVtl.js";import"./mobile-keypad-wPUeR8mM.js";import"./index-awljIyHI.js";import"./index-7vsPyIck.js";import"./index-CkAxGj88.js";import"./index-J2t_5nK1.js";import"./index-6h5t6F0w.js";import"./index-deFLJwr4.js";import"./tabbar-WYCYDof0.js";import"./item-X9tjzx12.js";import"./index-WNT3sUKf.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./button-assets-txIojR3b.js";import"./keypad-button-rKskH7oM.js";import"./operators-page-C_EsmjPW.js";import"./navigation-pad-ss7r0FKW.js";import"./key-translator-Bl2XtQm9.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./renderer-shnhjTaa.js";import"./index-dnMhQZ-1.js";import"./asset-context-I7yIqWki.js";import"./i18n-context-H_mTdYuW.js";import"./svg-image-h96M64n1.js";import"./dependencies-d8cZibFS.js";import"./fixed-to-responsive-AkRQxH3P.js";import"./constants-iPV6vHZm.js";import"./index-Dfd6auV6.js";import"./client-rbWgHzHN.js";import"./inline-icon-NjJlm7d0.js";import"./icon-paths-5JCXzGsq.js";import"./image-loader-3HliPbpF.js";import"./tex-6yhnhbtf.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-hbM7rxrP.js";import"./perseus-api-Nq3s7IMx.js";import"./index-k-0mNqHS.js";import"./stub-tag-editor-74YQ4o9G.js";import"./text-list-editor-Jz35fIN1.js";import"./lint-kpBgzQ8K.js";import"./index-uzeeKkRr.js";import"./index-xuPsLuPk.js";import"./index-YCTzZMik.js";import"./index-rfN0X25E.js";import"./index-o3wWn3Y5.js";import"./index-h_CiYGGb.js";import"./Popper-kGnKOid7.js";import"./math-input-PhxWhbDZ.js";import"./index-_pgwEZ-g.js";import"./index-BPSWBbj5.js";import"./input-with-examples-uajSVBeQ.js";import"./text-input-15gEhfDF.js";import"./index-QCAhLhLD.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip--mhQefx0.js";import"./simple-keypad-input-LEkrmlga.js";import"./base-radio-Sv3eKype.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./choice-Yxd0I4UE.js";import"./index-ngddCaVG.js";import"./index-qUyqkRvh.js";import"./icon-R5gZamfG.js";import"./choice-icon-mqn5F0kp.js";import"./focus-ring-2b4ybtc7.js";import"./option-status-xLBilE_v.js";import"./choice-none-above-HdMtehPm.js";import"./phet-simulation-a-CqgrmB.js";import"./arrow-square-out-bold-090vdhrx.js";import"./answer-choices-MX0vy2-k.js";import"./button-group-nsoLlHtM.js";import"./graph-LHyvBqdA.js";import"./index-IIMKO4_x.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-7jAAHVxW.js";import"./hud-4BOtaFc1.js";import"./multi-button-group-atHe8dYZ.js";import"./number-input-jMAfQnHS.js";import"./range-input-S-XQz6ZX.js";import"./marker--xkfdTfa.js";import"./answer-pill-J5xWbCKQ.js";import"./sortable-vlrIK0gL.js";import"./video-transcript-link-Em-iVnd5.js";import"./perseus-item-iWjoDclg.js";import"./hints-renderer-w8fwv-TJ.js";import"./global-colors-VIVU4Od4.js";const mr={title:"PerseusEditor/Widgets/Label Image/Behavior"},t=u=>{const[r,e]=c.useState({multipleAnswers:!1,hideChoicesFromInstructions:!1}),s={multipleAnswers:r.multipleAnswers,hideChoicesFromInstructions:r.hideChoicesFromInstructions,onChange:o=>{a("onChange")(o),e({...r,...o})}};return n(l,{preferredPopoverDirection:"NONE",...s})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const [state, setState] = React.useState({
    multipleAnswers: false,
    hideChoicesFromInstructions: false
  });
  const props = ({
    multipleAnswers: state.multipleAnswers,
    hideChoicesFromInstructions: state.hideChoicesFromInstructions,
    onChange: newState => {
      action("onChange")(newState);
      setState({
        ...state,
        ...newState
      });
    }
  } as const);
  return <Behavior preferredPopoverDirection="NONE" {...props} />;
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const pr=["Default"];export{t as Default,pr as __namedExportsOrder,mr as default};