import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as a}from"./index-qhcEwEpg.js";import{L as p}from"./locked-point-settings-4LYtpLY4.js";import{g as c}from"./util-cblgOEF4.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-4c2J3ov1.js";import"./index-awljIyHI.js";import"./index-TrT5d_9G.js";import"./index-h47zdzUa.js";import"./index-lUErx3pE.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./color-select-DdwwwsV1.js";import"./article-renderer-F6mGosoY.js";import"./compare-59FC1ybr.js";import"./version-akiLXZts.js";import"./prop-types-6SZ7wpGj.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-YbdDueCh.js";import"./tabbar-JzIL1KLI.js";import"./item-Ik_jgcdN.js";import"./index-2ewQ9tq7.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-bmoIASdR.js";import"./operators-page-cUYg3cIm.js";import"./navigation-pad-kidqz-Lu.js";import"./index-KwIbMdjJ.js";import"./key-translator-clrWbFgY.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./invariant-bu5zBsRS.js";import"./enums-x5qaTru7.js";import"./renderer-g-jl5vfe.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-1xirUsO_.js";import"./index-mohBxQl_.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-EDQcR2F7.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-9NPhLZtS.js";import"./index-0C4KXdeC.js";import"./stub-tag-editor-f1WdYARp.js";import"./text-list-editor-xQBHt64k.js";import"./lint-4QkP-VXi.js";import"./index--QaGaZ0E.js";import"./index-LEiXrFpA.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-0_Vag4zz.js";import"./index-YCszv_sI.js";import"./unit-sO4C0-pw.js";import"./input-with-examples-g810P0PJ.js";import"./math-output-tIDciKOM.js";import"./text-input-zm8-q8wG.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-lRXaX8DC.js";import"./base-radio-818h8kEA.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-eX2sc0Eo.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-1YYjOM3M.js";import"./video-transcript-link-Q_kxj4Rb.js";import"./answer-choices-hXlZqckn.js";import"./button-group-eBTrRsKy.js";import"./graph-leroHitF.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-S2eTRAyl.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-k4bRs4vK.js";import"./prop-check-box-zg5E6TRo.js";import"./range-input-zCtWZXYe.js";import"./marker-EMbLNSLC.js";import"./answer-pill-rDQKYKDj.js";import"./sortable-3H8wox3S.js";import"./multi-renderer-S_r8TVCE.js";import"./hints-renderer-9Wrzta78.js";import"./color-swatch-nSTPqLAT.js";const ut={title:"PerseusEditor/Components/Locked Point Settings",component:p},t=i=>d(p,{...i});t.args={...c("point"),onChangeProps:()=>{},onRemove:()=>{}};const e={render:function(){const[r,n]=a.useState({...c("point"),onRemove:()=>{}});return d(p,{...r,onChangeProps:m=>{n({...r,...m})}})}},o={render:function(){const[r,n]=a.useState(!0),[s,m]=a.useState(c("point"));return d(p,{...s,onChangeProps:U=>{m({...s,...U})},toggled:r,onToggle:n})}};var g,l,u;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedPointSettings {...args} />;
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var h,P,f;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("point"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(f=(P=e.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};var S,w,R,T,k;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const [toggled, setToggled] = React.useState(true);
    const [props, setProps] = React.useState(getDefaultFigureForType("point"));
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} onChangeProps={handlePropsUpdate} toggled={toggled} onToggle={setToggled} />;
  }
}`,...(R=(w=o.parameters)==null?void 0:w.docs)==null?void 0:R.source},description:{story:"In some cases, the locked point may be shown or hidden from the graph,\nsuch as when the point is used to define a locked line.\n\nUse `onToggle` and `toggled` to update the visibility of the locked point.\nWhen `onToggled` is passed in, a switch will be rendered to allow\ntoggling the point, which will then show/hide the relevant properties\nfor the locked point.",...(k=(T=o.parameters)==null?void 0:T.docs)==null?void 0:k.description}}};const ht=["Default","Controlled","Toggleable"];export{e as Controlled,t as Default,o as Toggleable,ht as __namedExportsOrder,ut as default};
