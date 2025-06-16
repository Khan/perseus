import{j as m,r as P}from"./iframe-2g4VQTYH.js";import{L as r}from"./locked-function-settings-Mk1C3Kkc.js";import{g as x}from"./util-B2DTO1is.js";import"./color-select-BAY9bjzo.js";import"./Popper-Dw-YncXa.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BPEssxMr.js";import"./line-stroke-select-CiaDu7Ic.js";import"./line-swatch-BWcUvxRe.js";import"./locked-figure-aria-CYDIGRDZ.js";import"./item-version-BJeOYaNJ.js";import"./article-renderer-DrqxFyKt.js";import"./server-item-renderer-CeFddfkI.js";import"./hints-renderer-B15MfxEL.js";import"./components-Dw4odbRc.js";import"./locked-label-settings-BXQTDNpJ.js";import"./scrollless-number-text-field-CBCI2Rrr.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const O=["Default","Expanded"];export{e as Default,o as Expanded,O as __namedExportsOrder,N as default};
