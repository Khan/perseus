import{j as m,r as P}from"./iframe-tEFC830a.js";import{L as r}from"./locked-function-settings-yl-OlnLX.js";import{g as x}from"./util-DOYqah_z.js";import"./color-select-CvzOjvze.js";import"./Popper-lHh3WoTY.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DZzteOGU.js";import"./line-stroke-select-4LcGVrFp.js";import"./line-swatch-CPY7Uq6g.js";import"./line-weight-select-B46dr1C1.js";import"./locked-figure-aria-CxDsQfTf.js";import"./item-version-eHqMuAxM.js";import"./article-renderer-DxNUbkng.js";import"./server-item-renderer-Dsot-jEX.js";import"./hints-renderer-B-HVvaIf.js";import"./components-DYB2Jg9i.js";import"./locked-label-settings-DV4eKpj3.js";import"./scrollless-number-text-field-B_ejFlaG.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
