import{j as d}from"./jsx-runtime-BGVbfQ2Z.js";import{r as a}from"./index-qhcEwEpg.js";import{L as p}from"./locked-ellipse-settings-_7SoBPpV.js";import{g as c}from"./util-ridwBHs0.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-SWusn7m7.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-18HXJOop.js";import"./index-lUErx3pE.js";import"./index-J2t_5nK1.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./index-halg33Zp.js";import"./index-4c2J3ov1.js";import"./tabbar-_HYg3Kcf.js";import"./item-MgaZQyPg.js";import"./index-VhM44oCk.js";import"./index-tvtfaFq4.js";import"./button-assets-cmoMUwP4.js";import"./keypad-button-BUF7auet.js";import"./operators-page-H6dLcd0l.js";import"./navigation-pad-URlj9thj.js";import"./index-JT1-kTlx.js";import"./key-translator-t-qTln-I.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-DMyJQEwa.js";import"./index-dnMhQZ-1.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-owHOs5t6.js";import"./index-mohBxQl_.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-WvQWLN3r.js";import"./fixed-to-responsive-ybwlrogx.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-4QkP-VXi.js";import"./index-xE_wKg8s.js";import"./index-kutQl4v0.js";import"./index-qh_wob3p.js";import"./index-_15Y2y0p.js";import"./index-h47zdzUa.js";import"./Popper-uHddJoXq.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./math-input-LoGoPcYm.js";import"./index-3tBZ6RgE.js";import"./unit-uxf7imOh.js";import"./input-with-examples-XZe44WHb.js";import"./math-output-xqbS761x.js";import"./text-input-yDsqFbe3.js";import"./index-ZObC1LzG.js";import"./minus-bold-ONmDo3Ve.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-A9uEOuum.js";import"./base-radio-sJkwrgzI.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./choice-gorLtsnE.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-4JlK6ypp.js";import"./video-transcript-link-g12jSPmn.js";import"./answer-choices-sexF1cp0.js";import"./button-group-eBTrRsKy.js";import"./graph-QO4osesG.js";import"./tiny-invariant-bHgPayXn.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-Q7Km3N9P.js";import"./info-tip-7OZQMH1X.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-QmtkIb5a.js";import"./prop-check-box-gTxQyzCz.js";import"./range-input-IMzA4hKn.js";import"./marker-M-XurWPn.js";import"./answer-pill-mZpPK3jT.js";import"./sortable-I0MCW1FB.js";import"./multi-renderer-VE_hlJ_c.js";import"./hints-renderer-utgbZ6JQ.js";import"./components-3mf2_vMo.js";import"./color-select-GB_ZG0SQ.js";import"./color-swatch-verANv8Y.js";import"./locked-figure-settings-actions-vFYJqugY.js";const uo={title:"PerseusEditor/Components/Locked Ellipse Settings",component:p},r=i=>d(p,{...i});r.args={...c("ellipse"),onChangeProps:()=>{},onRemove:()=>{}};const o={render:function(){const[t,m]=a.useState({...c("ellipse"),onRemove:()=>{}});return d(p,{...t,onChangeProps:s=>{m({...t,...s})}})}};o.parameters={chromatic:{disableSnapshot:!0}};const e={render:function(){const[t,m]=a.useState(!0),[n,s]=a.useState({...c("ellipse"),onRemove:()=>{}});return d(p,{...n,expanded:t,onToggle:m,onChangeProps:x=>{s({...n,...x})}})}};var l,u,g;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedEllipseSettings {...args} />;
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var P,S,h;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("ellipse"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(h=(S=o.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var E,f,R;e.parameters={...e.parameters,docs:{...(E=e.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState({
      ...getDefaultFigureForType("ellipse"),
      onRemove: () => {}
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(R=(f=e.parameters)==null?void 0:f.docs)==null?void 0:R.source}}};const go=["Default","Controlled","Expanded"];export{o as Controlled,r as Default,e as Expanded,go as __namedExportsOrder,uo as default};
