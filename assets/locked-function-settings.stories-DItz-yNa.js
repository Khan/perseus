import{j as m,r as P}from"./iframe-Bcg17xLF.js";import{L as r}from"./locked-function-settings-C93XwnMM.js";import{g as x}from"./util-Dg7Zt9il.js";import"./color-select-B5Js-S1X.js";import"./Popper-Bksjufvv.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-VOo_FpSm.js";import"./line-stroke-select-dKlzNf26.js";import"./line-swatch-BoPfg3Ut.js";import"./locked-figure-aria-DlJDjBMQ.js";import"./item-version-Cq6y6B1E.js";import"./article-renderer-CkfdpRoI.js";import"./server-item-renderer-CUMfm4hX.js";import"./hints-renderer-CrMQM1rf.js";import"./components-z5lU3uB1.js";import"./locked-label-settings-Dof-jKA5.js";import"./scrollless-number-text-field-D6QHuXR4.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
