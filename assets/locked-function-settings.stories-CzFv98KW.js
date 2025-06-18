import{j as m,r as P}from"./iframe-CFgdDBZ0.js";import{L as r}from"./locked-function-settings-Tg4AxZkg.js";import{g as x}from"./util-DGgsS3rj.js";import"./color-select-mhrIWUMy.js";import"./Popper-RzlI5AGI.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DQmEOG2F.js";import"./line-stroke-select-Bo7UPC9F.js";import"./line-swatch-CRTY19mr.js";import"./locked-figure-aria-CuhFMhFA.js";import"./item-version-Cbo_E6qa.js";import"./article-renderer-C177145R.js";import"./server-item-renderer-C8TvH69k.js";import"./hints-renderer-C0YRMi4r.js";import"./components-qkQE1Gjs.js";import"./locked-label-settings-UFG0Yv6e.js";import"./scrollless-number-text-field-Bz2JITFT.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
