import{j as m,r as P}from"./iframe-Df1l_qdN.js";import{L as r}from"./locked-function-settings-CVaTWKs0.js";import{g as x}from"./util-v0xq8fOo.js";import"./color-select-Do5_PlVz.js";import"./Popper-D68LALif.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DWZJ7XkV.js";import"./line-stroke-select-Dh5WI0RA.js";import"./line-swatch-C9mImIo-.js";import"./locked-figure-aria-Epm04XIR.js";import"./item-version-n2dIChhg.js";import"./article-renderer-DUFs70BB.js";import"./server-item-renderer-a7Aw--JL.js";import"./hints-renderer-D3j6BERN.js";import"./components-BXvGFzmc.js";import"./locked-label-settings-BnIatLc3.js";import"./scrollless-number-text-field-C2i4TLpi.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
