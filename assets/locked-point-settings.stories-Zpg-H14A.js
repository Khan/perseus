import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as a}from"./index-qhcEwEpg.js";import{L as p}from"./locked-point-settings-_Jn0o71u.js";import{g as c}from"./util-GazPx91e.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-4c2J3ov1.js";import"./index-awljIyHI.js";import"./index-sXD0g-3O.js";import"./index-BrnICqZg.js";import"./index-25YgVP-A.js";import"./index-Fg8WJp4t.js";import"./index-_15Y2y0p.js";import"./color-select-2p0mEEgR.js";import"./article-renderer-1AaB7ZRz.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-da35HsqX.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-NYf4zfpa.js";import"./tabbar-0ADFFMFf.js";import"./item-Xl3u6w2R.js";import"./index-IxqgEL7X.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-Xf3EMv8Q.js";import"./operators-page-oziijydk.js";import"./navigation-pad-tBxIIqLP.js";import"./index-pb777vIT.js";import"./key-translator-vogSlYsi.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-V6_4AklZ.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-6q36axAB.js";import"./index-Or3qlYxC.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-G5J_wmel.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-BDbMqVg2.js";import"./index-PurVa-Tf.js";import"./Popper-2p8US95Y.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-guqC3cBI.js";import"./index-wpOEyefj.js";import"./unit-1L4OY2_r.js";import"./input-with-examples-SZqb7UBZ.js";import"./math-output-o5-UebzW.js";import"./text-input-77oq4TCL.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-Rzz-r-EH.js";import"./base-radio-7PMhimd8.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-2FGmwb-T.js";import"./icon-HbAIhp4d.js";import"./choice-icon-5Wq30UUO.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-_ONChKTK.js";import"./choice-none-above-0U8vaPiM.js";import"./video-transcript-link-wp-Fzerj.js";import"./answer-choices-dZYesy7J.js";import"./button-group-eBTrRsKy.js";import"./graph-kG_TBAvu.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-IhIrlX7t.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-CBSxyfjJ.js";import"./prop-check-box-OYeLup7m.js";import"./range-input-YYhLn03P.js";import"./marker-KayRHL5C.js";import"./answer-pill-TDnlkTLI.js";import"./sortable-6KjeHSiM.js";import"./multi-renderer-9e0QOGUG.js";import"./hints-renderer-BLygMiIY.js";import"./color-swatch-u92zCrCL.js";const gt={title:"PerseusEditor/Components/Locked Point Settings",component:p},t=i=>d(p,{...i});t.args={...c("point"),onChangeProps:()=>{},onRemove:()=>{}};const e={render:function(){const[r,n]=a.useState({...c("point"),onRemove:()=>{}});return d(p,{...r,onChangeProps:m=>{n({...r,...m})}})}},o={render:function(){const[r,n]=a.useState(!0),[s,m]=a.useState(c("point"));return d(p,{...s,onChangeProps:U=>{m({...s,...U})},toggled:r,onToggle:n})}};var g,l,u;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(R=(w=o.parameters)==null?void 0:w.docs)==null?void 0:R.source},description:{story:"In some cases, the locked point may be shown or hidden from the graph,\nsuch as when the point is used to define a locked line.\n\nUse `onToggle` and `toggled` to update the visibility of the locked point.\nWhen `onToggled` is passed in, a switch will be rendered to allow\ntoggling the point, which will then show/hide the relevant properties\nfor the locked point.",...(k=(T=o.parameters)==null?void 0:T.docs)==null?void 0:k.description}}};const lt=["Default","Controlled","Toggleable"];export{e as Controlled,t as Default,o as Toggleable,lt as __namedExportsOrder,gt as default};
