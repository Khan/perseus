import{j as d}from"./jsx-runtime-FVsy8kgq.js";import{r as n}from"./index-TT1qJ6UJ.js";import{L as s}from"./locked-line-settings--_bWmtYC.js";import{g}from"./util-ud6UXtr-.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./util-d6C3c8a_.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./index-default-4_ZsnO94.js";import"./jquery-5v7aFUvu.js";import"./svg-image-t5Cgz781.js";import"./index-awljIyHI.js";import"./index-FlmdAi7b.js";import"./extends-wRoo2ExD.js";import"./index-deFLJwr4.js";import"./index-dnMhQZ-1.js";import"./dependencies-8XILypbq.js";import"./fixed-to-responsive-1fSZ1n--.js";import"./constants-I_nlPaPx.js";import"./index-7vsPyIck.js";import"./index-J2t_5nK1.js";import"./client-rbWgHzHN.js";import"./inline-icon-tKY1iMkH.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-mgyZcN0j.js";import"./answer-choices-SctSOVes.js";import"./index-az6L7JTG.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./index-YZKI02_d.js";import"./index-4_uZjoSD.js";import"./minus-bold-ONmDo3Ve.js";import"./x-6ZxseNgc.js";import"./index-FqnxIUpe.js";import"./index-KTjdxSp5.js";import"./index-CkAxGj88.js";import"./Popper-kGnKOid7.js";import"./i18n-context-W41LcU6B.js";import"./strings-4Ql_kQxk.js";import"./renderer-EjHytTUv.js";import"./invariant-bu5zBsRS.js";import"./asset-context-I7yIqWki.js";import"./tex-VP4hirbI.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-MZi7Hqbp.js";import"./perseus-api-OW2_bRsL.js";import"./index-k-0mNqHS.js";import"./stub-tag-editor-jAebgctF.js";import"./text-list-editor-_UIkAa1J.js";import"./lint-I_5mQeXl.js";import"./index-oXnU1JZM.js";import"./locked-figure-settings-actions-sJE1ThLE.js";import"./choice-GEddLPkC.js";import"./index-EomT5GpZ.js";import"./index-e-NlR9Ef.js";import"./index-k4M6A0h5.js";import"./icon-YuYiVxsK.js";import"./media-queries-MaBBbpNq.js";import"./choice-icon-tgwIPBbY.js";import"./focus-ring-sgSTt4fM.js";import"./option-status-GwxF4Pf4.js";import"./color-select-uwdDY8bl.js";import"./article-renderer-aqoj3ZJU.js";import"./prop-types-OPS2aBNU.js";import"./mobile-keypad-_Mnx_3BX.js";import"./tabbar-LsQLdiQ0.js";import"./item-1cAYpu7v.js";import"./index-0TTFGgsX.js";import"./button-assets-txIojR3b.js";import"./keypad-button-9nNJwhT2.js";import"./operators-page-o4_oRy25.js";import"./navigation-pad-m28rf6Ao.js";import"./key-translator-n6lcE8k7.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./index-4YIi0kGP.js";import"./math-input-a_pVb5RW.js";import"./phet-simulation-z6qSUYUB.js";import"./arrow-square-out-bold-090vdhrx.js";import"./input-with-examples-LSOFGNgx.js";import"./text-input-HZ8BTbn-.js";import"./index-MUB_I83H.js";import"./tooltip-S_hcgkAT.js";import"./simple-keypad-input-kRVTAsk6.js";import"./base-radio-Ul2i2xAH.js";import"./shared-3pf9YZIg.js";import"./choice-none-above-XuqJpSln.js";import"./button-group-nsoLlHtM.js";import"./graph-AkYjobi3.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-7jAAHVxW.js";import"./hud-FI3E3dT_.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-QJ7SuV66.js";import"./range-input-KJf9tq1R.js";import"./marker-Pg9z05NE.js";import"./answer-pill-mD1fJqMI.js";import"./sortable-tuaKBOMU.js";import"./video-transcript-link-0nAA2iK1.js";import"./multi-renderer-ciIaBiH8.js";import"./hints-renderer-FoD3xmrd.js";import"./color-swatch-TIf6zoec.js";import"./coordinate-pair-input-isxBx5Jg.js";import"./scrollless-number-text-field-57outIIG.js";import"./labeled-switch-Q5sxG7PG.js";import"./line-stroke-select-LyAeA6rh.js";import"./line-swatch-mDqMaqll.js";const It={title:"PerseusEditor/Components/Locked Line Settings",component:s},p=i=>d(s,{...i}),c={...g("line"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};p.args=c;const m={render:function(){const[e,r]=n.useState(c);return d(s,{...e,onChangeProps:o=>{r({...e,...o})}})}};m.parameters={chromatic:{disableSnapshot:!0}};const a={render:function(){const[e,r]=n.useState(c),t=o=>{r({...e,...o})};return d(s,{...e,points:[g("point"),g("point")],expanded:!0,onChangeProps:t})}},u={render:function(){const[e,r]=n.useState(!0),[t,o]=n.useState(c);return d(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}},l={render:function(){const[e,r]=n.useState(!0),[t,o]=n.useState({...c,kind:"segment",color:"green",lineStyle:"dashed"});return d(s,{...t,expanded:e,onToggle:r,onChangeProps:P=>{o({...t,...P})}})}};p.__docgenInfo={description:"",methods:[],displayName:"Default"};var h,f,S;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedLineSettings {...args} />;
}`,...(S=(f=p.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var x,R,L;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(L=(R=m.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var U,E,C,k,w;a.parameters={...a.parameters,docs:{...(U=a.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(_=(F=l.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};const Nt=["Default","Controlled","WithInvalidPoints","Expanded","ExpandedNondefaultProps"];export{m as Controlled,p as Default,u as Expanded,l as ExpandedNondefaultProps,a as WithInvalidPoints,Nt as __namedExportsOrder,It as default};
