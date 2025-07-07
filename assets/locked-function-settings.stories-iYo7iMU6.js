import{j as m,r as P}from"./iframe-FixlUAlH.js";import{L as r}from"./locked-function-settings-nbTCBdYO.js";import{g as x}from"./util-DUtup_cr.js";import"./color-select-BoHWxGqp.js";import"./Popper-CFF_Yah7.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BIp54dEC.js";import"./line-stroke-select-D4WZ6L1D.js";import"./line-swatch-BuBAC-Pw.js";import"./locked-figure-aria-DZR5qwvP.js";import"./item-version-ZIBcJGu4.js";import"./article-renderer-CUboaJ7C.js";import"./server-item-renderer-Q94llRYT.js";import"./hints-renderer-DwEQF4ur.js";import"./components-ON4HqAvU.js";import"./locked-label-settings-BKK7QXSi.js";import"./scrollless-number-text-field-BmNpxMBf.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
