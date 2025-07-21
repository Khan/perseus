import{j as m,r as P}from"./iframe-DGYxWGXi.js";import{L as r}from"./locked-function-settings-O3DghSYZ.js";import{g as x}from"./util-BK3DfBSJ.js";import"./color-select-qxpSuDK6.js";import"./Popper-Dv-xcPBL.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-Cl2ZlcI8.js";import"./line-stroke-select-CZdq4v8S.js";import"./line-swatch-CJEV8Hpu.js";import"./line-weight-select-DO6LI0tY.js";import"./locked-figure-aria-BuJD-gae.js";import"./item-version-BXVugThI.js";import"./article-renderer-BO9ngR1F.js";import"./server-item-renderer-BaB5I2uk.js";import"./hints-renderer-yGCLgc6m.js";import"./components-s8nXXC3c.js";import"./locked-label-settings-BwJBfJiH.js";import"./scrollless-number-text-field-B5cbdnio.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
