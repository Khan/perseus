import{j as m,r as P}from"./iframe-BXVA8BYU.js";import{L as r}from"./locked-function-settings-mFzjTNNF.js";import{g as x}from"./util-kqF8lh1e.js";import"./color-select-CzJhIei-.js";import"./Popper-4-x9NNzV.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-B_PZD8ch.js";import"./line-stroke-select-C12wfR4Q.js";import"./line-swatch-BrskSQWx.js";import"./locked-figure-aria-DHRNV88Q.js";import"./item-version-BykZ0nru.js";import"./article-renderer-CvpNpo6i.js";import"./server-item-renderer-CWYIQbo4.js";import"./hints-renderer-BHzQDwYd.js";import"./components-DNWlZddO.js";import"./locked-label-settings-YbstwhQv.js";import"./scrollless-number-text-field-CcvSl_B0.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
