import{j as s}from"./jsx-runtime-BGVbfQ2Z.js";import{r as x}from"./index-qhcEwEpg.js";import{L as p}from"./locked-vector-settings-S6g10Cy-.js";import{g as a}from"./util-RicqMZ0C.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-WvQWLN3r.js";import"./index-default-4_ZsnO94.js";import"./perseus-error-OpXxk17X.js";import"./dependencies-fnqF3NiV.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./jquery-5v7aFUvu.js";import"./svg-image-xT-AdWRe.js";import"./index-TymzEsVR.js";import"./index-awljIyHI.js";import"./index-oMd7J_hd.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./index-E09jvG0x.js";import"./index-J2t_5nK1.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./index-D5BWnz-K.js";import"./index-B3k62xyQ.js";import"./color-select-pXxcu-5c.js";import"./article-renderer-8Bw0MV81.js";import"./prop-types-3U8aPQU9.js";import"./index-AMPNwp1g.js";import"./tabbar-RiuhgrwC.js";import"./item-UPBCIzra.js";import"./index-TeOhC3cV.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-41QiUrLb.js";import"./operators-page-jZhMvB4n.js";import"./navigation-pad-GvGLKm0w.js";import"./index-JT1-kTlx.js";import"./key-translator-LscBjx_B.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-z9rWSR-h.js";import"./asset-context-pmjKTqqL.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-ctkvcPpY.js";import"./index-wU63jaE4.js";import"./index-O-KD2pfb.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-ZA3sNY0n.js";import"./index-JYyfyxPN.js";import"./unit-uxf7imOh.js";import"./input-with-examples-LExXbWq1.js";import"./math-output-xqbS761x.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-ioObjG0H.js";import"./base-radio-fBmWjiK5.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-I7vspaEF.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-dQNhc1ou.js";import"./video-transcript-link-XsIXgcwt.js";import"./answer-choices-pUTJh6qw.js";import"./button-group-eBTrRsKy.js";import"./graph-cl_EfieJ.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-xms-bDN2.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-Z3f7giBx.js";import"./range-input-IMzA4hKn.js";import"./marker-HYWYvCk-.js";import"./answer-pill-yTPXaj9l.js";import"./sortable-OgepMx9Y.js";import"./multi-renderer-rc0oyMeg.js";import"./hints-renderer-FaPMGqg5.js";import"./color-swatch-Wx1G5rrw.js";import"./locked-figure-settings-actions-1VXcFq7Z.js";import"./line-swatch-NqYdmc4g.js";const go={title:"PerseusEditor/Components/Locked Vector Settings",component:p},t=i=>s(p,{...i});t.args={...a("vector"),onChangeProps:()=>{},onRemove:()=>{}};const e={render:function(){const[r,n]=x.useState({...a("vector"),onRemove:()=>{}});return s(p,{...r,expanded:!0,onChangeProps:m=>{n({...r,...m})}})}},o={render:function(){const[r,n]=x.useState({...a("vector"),onRemove:()=>{}});return s(p,{...r,points:[[0,0],[0,0]],expanded:!0,onChangeProps:m=>{n({...r,...m})}})}};var d,c,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`(args): React.ReactElement => {
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
in this case.`,...(S=(R=o.parameters)==null?void 0:R.docs)==null?void 0:S.description}}};const lo=["Default","Expanded","WithInvalidPoints"];export{t as Default,e as Expanded,o as WithInvalidPoints,lo as __namedExportsOrder,go as default};
