import{j as i,r as c}from"./iframe-DnQciuiI.js";import{L as n}from"./locked-ellipse-settings-BJfZfj_s.js";import{g as k}from"./util-5qZ517jZ.js";import"./item-version-BNtEaiNh.js";import"./article-renderer-CNsp64T0.js";import"./server-item-renderer-Dl6dULhI.js";import"./hints-renderer-C71IX-9-.js";import"./components-BXD-d-sH.js";import"./color-select-RFupFcUT.js";import"./Popper-DGJtFqDw.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-p-xp318c.js";import"./locked-label-settings-DXuXiqp4.js";import"./perseus-editor-accordion-C3tUVgCs.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-Cqjx3TNo.js";import"./line-weight-select-CwVCvAGf.js";import"./locked-figure-aria-fySmZlel.js";const B={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),m={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const r={render:function(){const[o,a]=c.useState(m),t=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:t})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[o,a]=c.useState(!0),[t,d]=c.useState(m),R=C=>{d({...t,...C})};return i.jsx(n,{...t,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var l,u,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedEllipseSettings {...args} />;
}`,...(g=(u=e.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var P,x,f;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(f=(x=r.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var E,S,h;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const G=["Default","Controlled","Expanded"];export{r as Controlled,e as Default,s as Expanded,G as __namedExportsOrder,B as default};
