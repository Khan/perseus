import{j as m,r as P}from"./iframe-ClpJ2tSX.js";import{L as r}from"./locked-function-settings-PD8k23BE.js";import{g as x}from"./util-CjYOiRFR.js";import"./color-select-C92XDuV1.js";import"./Popper-UOVHR52E.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CF2loVbk.js";import"./line-stroke-select-Dgim2eOA.js";import"./line-swatch-B2RHZ_Sz.js";import"./line-weight-select-PhK6FtRb.js";import"./locked-figure-aria-Cw_mXcqZ.js";import"./item-version-CQubXDjk.js";import"./article-renderer-swXFKa55.js";import"./server-item-renderer-DLm0hFtk.js";import"./hints-renderer-m5to_iUG.js";import"./components-BTpdromP.js";import"./locked-label-settings-CxVe76wq.js";import"./scrollless-number-text-field-B4A8hgv0.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
