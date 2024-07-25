import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as n}from"./index-4g5l5LRQ.js";import{L as s}from"./locked-line-settings-T39AzTdW.js";import{g}from"./util-RR67UMDN.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-hMu2nkBL.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./compare-59FC1ybr.js";import"./jquery-5v7aFUvu.js";import"./svg-image-sHK76CH4.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-A74C9PE_.js";import"./answer-choices-B3otJiMf.js";import"./index-QR_wlop5.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-wjVcXLkf.js";import"./index-zE8cp1oq.js";import"./minus-bold-ONmDo3Ve.js";import"./x-6ZxseNgc.js";import"./index-zHEZmPKZ.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./Popper-D86xJ3go.js";import"./i18n-context-3gTlIcWM.js";import"./strings-YJ61eiUN.js";import"./renderer-BDe3lowH.js";import"./invariant-bu5zBsRS.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-7QXTiCE7.js";import"./index-k-0mNqHS.js";import"./stub-tag-editor-Fuvu94kh.js";import"./text-list-editor-vhSOgXmq.js";import"./lint-IvfTv29b.js";import"./locked-figure-settings-actions-Wh-v0VEn.js";import"./index-_rEjQfTM.js";import"./choice-qvE2MQTK.js";import"./index-wgZGcu4m.js";import"./icon-TA3bBVIW.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-cBSCcTMf.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-o8Ma0JxL.js";import"./color-select-drRa9h8Z.js";import"./article-renderer-rCLm7fhA.js";import"./prop-types-dLVY6Cpd.js";import"./mobile-keypad-_omH0y9g.js";import"./tabbar-Oqt6c7oQ.js";import"./item-BvwJUNFE.js";import"./button-assets-W0P3gTHH.js";import"./keypad-button-dkA26ccQ.js";import"./operators-page-AaL31SSd.js";import"./navigation-pad-J3QJzD-6.js";import"./key-translator-2vF_So3l.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./info-tip-7k4XWhfR.js";import"./math-input-3MKeOtqI.js";import"./unit-3x0ZR6Ko.js";import"./input-with-examples-elyyz5Kb.js";import"./text-input-Q1V0RBx1.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-3VL6uesv.js";import"./base-radio-SLROWHH4.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-68_3jwN2.js";import"./video-transcript-link-6o6i_Fnt.js";import"./button-group-KR3umc1e.js";import"./graph-xM0PpZck.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-o7tSxJdU.js";import"./prop-check-box-BcSa0Uvu.js";import"./range-input-sSz5zlV8.js";import"./marker-59cyecU_.js";import"./answer-pill-9JcEqbWg.js";import"./sortable-cGq9yw9H.js";import"./multi-renderer-QCPzVA7S.js";import"./hints-renderer-UX03BjI0.js";import"./color-swatch-cOWi8Jtf.js";import"./labeled-switch--HOx7Z3-.js";import"./line-swatch-8df8Vot0.js";const yt={title:"PerseusEditor/Components/Locked Line Settings",component:s},p=i=>m(s,{...i}),c={...g("line"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};p.args=c;const d={render:function(){const[e,r]=n.useState(c);return m(s,{...e,onChangeProps:o=>{r({...e,...o})}})}};d.parameters={chromatic:{disableSnapshot:!0}};const a={render:function(){const[e,r]=n.useState(c),t=o=>{r({...e,...o})};return m(s,{...e,points:[g("point"),g("point")],expanded:!0,onChangeProps:t})}},u={render:function(){const[e,r]=n.useState(!0),[t,o]=n.useState(c);return m(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}},l={render:function(){const[e,r]=n.useState(!0),[t,o]=n.useState({...c,kind:"segment",color:"green",lineStyle:"dashed"});return m(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}};p.__docgenInfo={description:"",methods:[],displayName:"Default"};var h,f,S;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedLineSettings {...args} />;
}`,...(S=(f=p.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,R,L;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(L=(R=d.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var U,E,C,k,w;a.parameters={...a.parameters,docs:{...(U=a.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} points={[getDefaultFigureForType("point"), getDefaultFigureForType("point")]} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(C=(E=a.parameters)==null?void 0:E.docs)==null?void 0:C.source},description:{story:`If the two points defining the line are the same, the line is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(w=(k=a.parameters)==null?void 0:k.docs)==null?void 0:w.description}}};var y,T,v;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(v=(T=u.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var D,F,_;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState({
      ...defaultProps,
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
}`,...(_=(F=l.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};const Tt=["Default","Controlled","WithInvalidPoints","Expanded","ExpandedNondefaultProps"];export{d as Controlled,p as Default,u as Expanded,l as ExpandedNondefaultProps,a as WithInvalidPoints,Tt as __namedExportsOrder,yt as default};
