import{j as c}from"./jsx-runtime-BGVbfQ2Z.js";import{r as p}from"./index-qhcEwEpg.js";import{L as s}from"./locked-line-settings-GJzDRmvI.js";import{g as n}from"./util-cblgOEF4.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-4c2J3ov1.js";import"./index-awljIyHI.js";import"./answer-choices-_eCGRFWs.js";import"./index-2Es7CZJJ.js";import"./index-VhM44oCk.js";import"./index-tvtfaFq4.js";import"./index-lUErx3pE.js";import"./index-h47zdzUa.js";import"./index-_15Y2y0p.js";import"./index-KktidPha.js";import"./index-E09jvG0x.js";import"./index-Fk0JNZQD.js";import"./index-JT1-kTlx.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./renderer-9dy5MCqC.js";import"./version-akiLXZts.js";import"./index-J2t_5nK1.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-K2-sSw7D.js";import"./index-mohBxQl_.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./compare-VLxlEkSV.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./color-select-PUcEyAx1.js";import"./article-renderer-XOYTUP2h.js";import"./prop-types-18HXJOop.js";import"./index-halg33Zp.js";import"./tabbar-_HYg3Kcf.js";import"./item-MgaZQyPg.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-BUF7auet.js";import"./operators-page-H6dLcd0l.js";import"./navigation-pad-URlj9thj.js";import"./key-translator-t-qTln-I.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./index-bfZeEiF5.js";import"./math-input-AcRqfdqV.js";import"./index-hU7TnBqE.js";import"./unit-1L4OY2_r.js";import"./input-with-examples-Qtv5hjfZ.js";import"./math-output-o5-UebzW.js";import"./text-input-GIma_XqC.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-A9uEOuum.js";import"./base-radio-k7WnshVw.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-PH0yrPYg.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-QvP72MZ8.js";import"./video-transcript-link-g12jSPmn.js";import"./button-group-eBTrRsKy.js";import"./graph-gX7mFe7S.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-BoVrgmxI.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-U5TrzrfJ.js";import"./range-input-IMzA4hKn.js";import"./marker-OX44YJJ9.js";import"./answer-pill-v4PNCWwW.js";import"./sortable-v0XP6F0w.js";import"./multi-renderer-1QNdfYrR.js";import"./hints-renderer-ISphOZ2X.js";import"./color-swatch-wHCeYcOM.js";import"./locked-figure-settings-actions-Z21e4YxY.js";const Lo={title:"PerseusEditor/Components/Locked Line Settings",component:s},m=i=>c(s,{...i});m.args={...n("line"),onChangeProps:()=>{},onRemove:()=>{}};const d={render:function(){const[e,r]=p.useState({...n("line"),onRemove:()=>{}});return c(s,{...e,onChangeProps:t=>{r({...e,...t})}})}};d.parameters={chromatic:{disableSnapshot:!0}};const a={render:function(){const[e,r]=p.useState({...n("line"),onRemove:()=>{}}),o=t=>{r({...e,...t})};return c(s,{...e,points:[n("point"),n("point")],expanded:!0,onChangeProps:o})}},u={render:function(){const[e,r]=p.useState(!0),[o,t]=p.useState({...n("line"),onRemove:()=>{}});return c(s,{...o,expanded:e,onToggle:r,onChangeProps:g=>{t({...o,...g})}})}},l={render:function(){const[e,r]=p.useState(!0),[o,t]=p.useState({...n("line"),onRemove:()=>{},kind:"segment",color:"green",lineStyle:"dashed"});return c(s,{...o,expanded:e,onToggle:r,onChangeProps:g=>{t({...o,...g})}})}};var P,h,S;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedLineSettings {...args} />;
}`,...(S=(h=m.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var f,R,x;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("line"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(x=(R=d.parameters)==null?void 0:R.docs)==null?void 0:x.source}}};var L,U,E,F,v;a.parameters={...a.parameters,docs:{...(L=a.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("line"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} points={[getDefaultFigureForType("point"), getDefaultFigureForType("point")]} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(E=(U=a.parameters)==null?void 0:U.docs)==null?void 0:E.source},description:{story:`If the two points defining the line are the same, the line is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(v=(F=a.parameters)==null?void 0:F.docs)==null?void 0:v.description}}};var C,y,T;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("line"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(T=(y=u.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var k,w,D;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("line"),
      onRemove: () => {},
      kind: ("segment" as const),
      color: ("green" as const),
      lineStyle: ("dashed" as const)
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(D=(w=l.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const Uo=["Default","Controlled","WithInvalidPoints","Expanded","ExpandedNondefaultProps"];export{d as Controlled,m as Default,u as Expanded,l as ExpandedNondefaultProps,a as WithInvalidPoints,Uo as __namedExportsOrder,Lo as default};
