import{j as m,r as P}from"./iframe-CDICB6G3.js";import{L as r}from"./locked-function-settings-CbgZNEhs.js";import{g as x}from"./util-C2hgOE3_.js";import"./color-select-CleryZGZ.js";import"./Popper-Bs07-cRs.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-Pss1fL4h.js";import"./line-stroke-select-Tz_KmVEk.js";import"./line-swatch-S5H7OX8N.js";import"./line-weight-select-jecTt4lF.js";import"./locked-figure-aria-WdX5a7jH.js";import"./item-version-RjIY43mf.js";import"./article-renderer-C2HkK7E8.js";import"./server-item-renderer-DFw71DzG.js";import"./hints-renderer-BYV49TfX.js";import"./components-Dh66qsYN.js";import"./locked-label-settings-BwEVHR65.js";import"./scrollless-number-text-field-yzZCaBCL.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const T=["Default","Expanded"];export{e as Default,o as Expanded,T as __namedExportsOrder,O as default};
