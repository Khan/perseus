import{j as m,r as P}from"./iframe-97DLHr7_.js";import{L as r}from"./locked-function-settings-DZlbZh8g.js";import{g as x}from"./util-oMHdU0ja.js";import"./color-select-Bbj_MZWy.js";import"./Popper-BJ5IysKc.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BL8qeOU5.js";import"./line-stroke-select-DXUk1FTN.js";import"./line-swatch-BTpkqxp7.js";import"./locked-figure-aria-D0_uxw2y.js";import"./item-version-B7NSTz3N.js";import"./article-renderer-BeLDF-1h.js";import"./server-item-renderer-D_pEvYK6.js";import"./hints-renderer-DipfMXxv.js";import"./components-Coe1cn55.js";import"./locked-label-settings-D7PRFWNd.js";import"./scrollless-number-text-field-DCqDld5i.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
