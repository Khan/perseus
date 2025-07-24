import{j as m,r as P}from"./iframe-JBJONHHl.js";import{L as r}from"./locked-function-settings-Du_lf_k4.js";import{g as x}from"./util-YNxvp7px.js";import"./color-select-C0VutpKM.js";import"./Popper-C6tyzPej.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-BxmCKcMU.js";import"./line-stroke-select-CGq0wUFP.js";import"./line-swatch-D-BiY-6n.js";import"./line-weight-select-CEoMQR8j.js";import"./locked-figure-aria-sqeSPsJa.js";import"./item-version-DMyJMDPk.js";import"./article-renderer-ISec000u.js";import"./server-item-renderer-DM0y70U2.js";import"./hints-renderer-HTTi4Bca.js";import"./components-BhOs_jtJ.js";import"./locked-label-settings-CYeWuF6E.js";import"./scrollless-number-text-field-DOF6pgyb.js";import"./caret-up-bold-DYHm6Jyl.js";import"./trash-bold-BLGUig5L.js";const b={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedFunctionSettings {...args} />;
}`,...(a=(p=e.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var i,c,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedFunctionSettings {...props} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const q=["Default","Expanded"];export{e as Default,o as Expanded,q as __namedExportsOrder,b as default};
