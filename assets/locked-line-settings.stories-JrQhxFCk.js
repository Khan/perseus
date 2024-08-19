import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as p}from"./index-4g5l5LRQ.js";import{L as s}from"./locked-line-settings-QtcgWr3l.js";import{g}from"./util-icZzwtXO.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-KY8kJaBW.js";import"./version-akiLXZts.js";import"./jquery-yG1GhClm.js";import"./svg-image-w4vAVvEs.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-xwrcC5GD.js";import"./constants-CTNUT-ej.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./answer-choices--Sssr-eZ.js";import"./index-T3HXbpha.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-wjVcXLkf.js";import"./index-zE8cp1oq.js";import"./minus-bold-ONmDo3Ve.js";import"./Popper-bdbcdpLA.js";import"./index-z05-Lc8k.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./i18n-context-SHL040F7.js";import"./strings-U4LenZoO.js";import"./renderer-CDkxU16B.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-GqFoxb6z.js";import"./stub-tag-editor--1JgemZ6.js";import"./text-list-editor--7RKQsFY.js";import"./lint-nhuHdd9z.js";import"./locked-figure-settings-actions-bovzTqbK.js";import"./choice-RL6irUBp.js";import"./index-WyPu8vtE.js";import"./icon-TA3bBVIW.js";import"./media-queries-cW_QgwNP.js";import"./choice-icon-Uwdm3B_j.js";import"./focus-ring-z-znzPiA.js";import"./option-status-_NngQfjZ.js";import"./color-select-9BPVRdGZ.js";import"./article-renderer-eZD1-vSC.js";import"./prop-types-6Qz-9GtK.js";import"./mobile-keypad-cY_XnmKN.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./button-assets-Z9EPvaqZ.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./key-translator-TewQj1fb.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./math-input-8DeMRXLB.js";import"./input-with-examples-6953sV_1.js";import"./text-input-wkUsDgzz.js";import"./index-YQYcT5qz.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-4VUVJbnD.js";import"./base-radio-Kq3rgYOa.js";import"./shared-43ihVE4t.js";import"./choice-none-above-xqvD6jJd.js";import"./video-transcript-link-jDAvsjOz.js";import"./button-group-KR3umc1e.js";import"./graph-pxFsqRWv.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-McwHJ8wr.js";import"./index-Z7PPA4aZ.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-_vmR2dDD.js";import"./range-input-W6BaCFKq.js";import"./marker-HNvhLreX.js";import"./answer-pill-WP7EFtov.js";import"./sortable-1fSPVr9M.js";import"./multi-renderer-khpmYV9b.js";import"./hints-renderer-ojm-2f9p.js";import"./color-swatch-dQGhNtTN.js";import"./coordinate-pair-input-oQdrVkC8.js";import"./scrollless-number-text-field-GDkKIt-C.js";import"./labeled-switch-9vikQrzG.js";import"./line-stroke-select-ikiae0zj.js";import"./line-swatch-Lod_DIP3.js";const Ut={title:"PerseusEditor/Components/Locked Line Settings",component:s},n=i=>m(s,{...i}),c={...g("line"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};n.args=c;const d={render:function(){const[e,r]=p.useState(c);return m(s,{...e,onChangeProps:o=>{r({...e,...o})}})}};d.parameters={chromatic:{disableSnapshot:!0}};const a={render:function(){const[e,r]=p.useState(c),t=o=>{r({...e,...o})};return m(s,{...e,points:[g("point"),g("point")],expanded:!0,onChangeProps:t})}},u={render:function(){const[e,r]=p.useState(!0),[t,o]=p.useState(c);return m(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}},l={render:function(){const[e,r]=p.useState(!0),[t,o]=p.useState({...c,kind:"segment",color:"green",lineStyle:"dashed"});return m(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}};n.__docgenInfo={description:"",methods:[],displayName:"Default"};var h,f,S;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedLineSettings {...args} />;
}`,...(S=(f=n.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,R,L;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(_=(F=l.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};const Et=["Default","Controlled","WithInvalidPoints","Expanded","ExpandedNondefaultProps"];export{d as Controlled,n as Default,u as Expanded,l as ExpandedNondefaultProps,a as WithInvalidPoints,Et as __namedExportsOrder,Ut as default};
