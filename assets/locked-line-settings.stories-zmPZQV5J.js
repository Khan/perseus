import{j as m}from"./jsx-runtime-5BUNAZ9W.js";import{r as n}from"./index-4g5l5LRQ.js";import{L as s}from"./locked-line-settings-L0JLQNZG.js";import{g}from"./util-IYsxzTz8.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-d6C3c8a_.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./jquery-5v7aFUvu.js";import"./svg-image-EUHSmEMe.js";import"./index-zXbQRqKp.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-dnMhQZ-1.js";import"./dependencies-9B_Bv_mA.js";import"./fixed-to-responsive-Q2lYGnje.js";import"./constants-I_nlPaPx.js";import"./index-jmm5gWkb.js";import"./index-J2t_5nK1.js";import"./client-MU6fCXSs.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-s-naDkf8.js";import"./answer-choices-mXgJgHAI.js";import"./index-1f9rdEBk.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-wjVcXLkf.js";import"./index-zE8cp1oq.js";import"./minus-bold-ONmDo3Ve.js";import"./x-6ZxseNgc.js";import"./index-ApTSwHdG.js";import"./index-skotlSua.js";import"./index-FsYHUvK_.js";import"./Popper-D86xJ3go.js";import"./index-QrS3OizK.js";import"./i18n-context-0unq6qj2.js";import"./strings-4Ql_kQxk.js";import"./renderer-VvMXHswL.js";import"./invariant-bu5zBsRS.js";import"./asset-context-4nzQV6k0.js";import"./tex-Co-L2gRx.js";import"./zoomable-fMxvjK02.js";import"./zoomable-tex-ZKYDI9ak.js";import"./perseus-api-7QXTiCE7.js";import"./index-0C4KXdeC.js";import"./stub-tag-editor-Fuvu94kh.js";import"./text-list-editor-vhSOgXmq.js";import"./lint-IvfTv29b.js";import"./locked-figure-settings-actions-9V1gDnmA.js";import"./index-87tT_9ji.js";import"./color-select-62wYsKn7.js";import"./article-renderer-9G2Zk4AT.js";import"./prop-types-OyecWNts.js";import"./mobile-keypad-cY_XnmKN.js";import"./tabbar-bBu8F0LR.js";import"./item-m8Nh1pVx.js";import"./button-assets-Z9EPvaqZ.js";import"./keypad-button--EiKtrcz.js";import"./operators-page-6_sBHI_n.js";import"./navigation-pad-Mri7Skbs.js";import"./key-translator-Hs3Uhnzm.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./index-OKe1jTBT.js";import"./math-input-jANKhZwO.js";import"./index-GPnNv0mI.js";import"./phet-simulation-l-HyHSa4.js";import"./index-QAkz3tPO.js";import"./input-with-examples-qlPoa3UJ.js";import"./text-input-wkUsDgzz.js";import"./index-YQYcT5qz.js";import"./tooltip-vkx2pUmk.js";import"./simple-keypad-input-EuXaHn8w.js";import"./base-radio-08e5ZBNh.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-h9qPYPLs.js";import"./icon-TA3bBVIW.js";import"./choice-icon-8Vp_lZ_f.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-QE-rJ7On.js";import"./choice-none-above-Gfv_D8D0.js";import"./button-group-KR3umc1e.js";import"./graph-RB5WYwBs.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-ylPat90q.js";import"./hud-CJYktPgf.js";import"./multi-button-group-AxfQn4Cq.js";import"./number-input-szeoKHvY.js";import"./range-input-6gV215mj.js";import"./marker-fJI2Hdps.js";import"./answer-pill-sBii8Evw.js";import"./sortable-lnz6VoRg.js";import"./video-transcript-link-cxm-C0v5.js";import"./multi-renderer-w8dkUhHp.js";import"./hints-renderer-tIz86Mj5.js";import"./color-swatch-hhQqmgBp.js";import"./coordinate-pair-input-i8mmzlTh.js";import"./scrollless-number-text-field-GDkKIt-C.js";import"./labeled-switch-G075Eo6g.js";import"./line-stroke-select-M3uc1FH-.js";import"./line-swatch-kAKZ9l70.js";const Ft={title:"PerseusEditor/Components/Locked Line Settings",component:s},p=i=>m(s,{...i}),c={...g("line"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};p.args=c;const d={render:function(){const[e,r]=n.useState(c);return m(s,{...e,onChangeProps:o=>{r({...e,...o})}})}};d.parameters={chromatic:{disableSnapshot:!0}};const a={render:function(){const[e,r]=n.useState(c),t=o=>{r({...e,...o})};return m(s,{...e,points:[g("point"),g("point")],expanded:!0,onChangeProps:t})}},u={render:function(){const[e,r]=n.useState(!0),[t,o]=n.useState(c);return m(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}},l={render:function(){const[e,r]=n.useState(!0),[t,o]=n.useState({...c,kind:"segment",color:"green",lineStyle:"dashed"});return m(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}};p.__docgenInfo={description:"",methods:[],displayName:"Default"};var h,f,S;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(_=(F=l.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};const _t=["Default","Controlled","WithInvalidPoints","Expanded","ExpandedNondefaultProps"];export{d as Controlled,p as Default,u as Expanded,l as ExpandedNondefaultProps,a as WithInvalidPoints,_t as __namedExportsOrder,Ft as default};
