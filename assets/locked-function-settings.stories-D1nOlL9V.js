import{j as m,r as P}from"./iframe-DhYGLGdk.js";import{L as r}from"./locked-function-settings-DK9mdH1M.js";import{g as x}from"./util-BRk0WVpw.js";import"./color-select-Dq9jCQAs.js";import"./Popper-jQ5tTMby.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BDZM3Sb7.js";import"./line-stroke-select-Cm7qUQPp.js";import"./line-swatch-5OEkWn7N.js";import"./locked-figure-aria-DHwus-9w.js";import"./item-version-aCyemDon.js";import"./article-renderer-DmqwZkiO.js";import"./server-item-renderer-P-lmrzRz.js";import"./hints-renderer-Cf1oFcBH.js";import"./components-CQdW-ezA.js";import"./locked-label-settings-Di2IrFV7.js";import"./scrollless-number-text-field-B4LD_kBv.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
