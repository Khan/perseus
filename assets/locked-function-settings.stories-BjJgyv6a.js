import{j as m,r as P}from"./iframe-CiZ4rom4.js";import{L as r}from"./locked-function-settings-Cfpc8u2u.js";import{g as x}from"./util-H5sE61uR.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CBNk1Rb_.js";import"./color-select-DEYIoEID.js";import"./line-stroke-select-BqvcYVMh.js";import"./line-swatch-ICDQTLM-.js";import"./locked-figure-aria-DsPtqjuL.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import"./components-zJqkJmyj.js";import"./locked-label-settings-C_Cnfp2w.js";import"./scrollless-number-text-field-D9uDYSfu.js";const M={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedFunctionSettings {...args} />;
}`,...(a=(p=e.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var c,i,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(d=(i=o.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const N=["Default","Expanded"];export{e as Default,o as Expanded,N as __namedExportsOrder,M as default};
