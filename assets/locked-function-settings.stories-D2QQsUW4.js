import{j as m,r as P}from"./iframe-D9rAzJ36.js";import{L as r}from"./locked-function-settings-BSLKY1e5.js";import{g as x}from"./util-B1TocK4h.js";import"./color-select-pdVYC5o5.js";import"./Popper-DiikopbE.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-5ai_Guyw.js";import"./line-stroke-select-BclxK8u9.js";import"./line-swatch-DfKWQbw5.js";import"./locked-figure-aria-8XAkNeHD.js";import"./item-version-DHULgNSn.js";import"./article-renderer-D103Rxyu.js";import"./server-item-renderer-DPRFYaNi.js";import"./hints-renderer-BOcngWg2.js";import"./components-Br9t_cqf.js";import"./locked-label-settings-C_NbDNKf.js";import"./scrollless-number-text-field-D63OlmaC.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
