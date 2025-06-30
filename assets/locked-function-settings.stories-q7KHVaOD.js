import{j as m,r as P}from"./iframe-BFBE40jw.js";import{L as r}from"./locked-function-settings-ghjHOhKE.js";import{g as x}from"./util-DpNWkRrm.js";import"./color-select-BFqrC3IC.js";import"./Popper-iHmo5qQ4.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-Bkx6RHOP.js";import"./line-stroke-select-q8ljRCik.js";import"./line-swatch-BI4vYFVC.js";import"./locked-figure-aria-CFUE7Qjc.js";import"./item-version-DPPrvkrd.js";import"./article-renderer-CEcI6UIH.js";import"./server-item-renderer-McPgKEqx.js";import"./hints-renderer-C00xdREK.js";import"./components-BKDWucW4.js";import"./locked-label-settings-BD8wS156.js";import"./scrollless-number-text-field-9Q1LO1WF.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
