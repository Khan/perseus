import{j as i,r as c}from"./iframe-JBJONHHl.js";import{L as n}from"./locked-ellipse-settings-DfR9UYfx.js";import{g as k}from"./util-YNxvp7px.js";import"./item-version-DMyJMDPk.js";import"./article-renderer-ISec000u.js";import"./server-item-renderer-DM0y70U2.js";import"./hints-renderer-HTTi4Bca.js";import"./components-BhOs_jtJ.js";import"./color-select-C0VutpKM.js";import"./Popper-C6tyzPej.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-DOF6pgyb.js";import"./locked-label-settings-CYeWuF6E.js";import"./perseus-editor-accordion-BxmCKcMU.js";import"./caret-up-bold-DYHm6Jyl.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-CGq0wUFP.js";import"./line-weight-select-CEoMQR8j.js";import"./locked-figure-aria-sqeSPsJa.js";const G={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),m={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const r={render:function(){const[o,a]=c.useState(m),t=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:t})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[o,a]=c.useState(!0),[t,d]=c.useState(m),R=C=>{d({...t,...C})};return i.jsx(n,{...t,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var l,u,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const H=["Default","Controlled","Expanded"];export{r as Controlled,e as Default,s as Expanded,H as __namedExportsOrder,G as default};
