import{j as m,r as P}from"./iframe-DWRR6BFw.js";import{L as r}from"./locked-function-settings-pHVs0SGT.js";import{g as x}from"./util-4W5ASnJz.js";import"./color-select-DnNbNLuK.js";import"./Popper-B-Np5sTy.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-Dh12O6KF.js";import"./line-stroke-select-CaJlU0pu.js";import"./line-swatch--NqT3a1_.js";import"./line-weight-select-CRqA4PrF.js";import"./locked-figure-aria-DGGVFtIK.js";import"./item-version-BHjGM5GU.js";import"./article-renderer-C2WikEUN.js";import"./server-item-renderer-BumdbWFr.js";import"./hints-renderer-DByUCtLg.js";import"./components-BWKRvEJb.js";import"./locked-label-settings-CxMjvVOC.js";import"./scrollless-number-text-field-le9_pGiy.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
