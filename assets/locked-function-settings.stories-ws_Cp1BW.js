import{j as m,r as P}from"./iframe-fUEXi0re.js";import{L as r}from"./locked-function-settings-B-bnh3EX.js";import{g as x}from"./util-CGoQxivr.js";import"./color-select-B7QP3UMD.js";import"./Popper-CM_zqNf8.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-D6_Q64QE.js";import"./line-stroke-select-MHC5-s2h.js";import"./line-swatch-Dpxx5fpI.js";import"./locked-figure-aria-x0z2SrV0.js";import"./item-version-DOxEkpQr.js";import"./article-renderer-6DecqqJL.js";import"./server-item-renderer-C9k6fabb.js";import"./hints-renderer-DbnyAC28.js";import"./components-DKKKr1Z9.js";import"./locked-label-settings-Coy7R8en.js";import"./scrollless-number-text-field-QDcrfemU.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
