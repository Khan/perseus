import{j as m,r as P}from"./iframe-C0-lSMGx.js";import{L as r}from"./locked-function-settings-BVgo1WeV.js";import{g as x}from"./util-CgJKHNIC.js";import"./color-select-BPgsHWmK.js";import"./Popper-rOL93a94.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-XSHKwhL_.js";import"./line-stroke-select-DYlFfY7F.js";import"./line-swatch-C-xrTZle.js";import"./locked-figure-aria-DOBaW10N.js";import"./item-version-CMQ17jd8.js";import"./article-renderer-CuBmqWtm.js";import"./server-item-renderer-DBHmEuGj.js";import"./hints-renderer-BhBsNahl.js";import"./components-BU12cmMr.js";import"./locked-label-settings-D9JKk2gR.js";import"./scrollless-number-text-field-Beibnikl.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
