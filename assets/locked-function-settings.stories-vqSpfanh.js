import{j as m,r as P}from"./iframe-B_16MRTp.js";import{L as r}from"./locked-function-settings-D3vpoAaf.js";import{g as x}from"./util-8jB5qdwX.js";import"./color-select-BSL8fz8E.js";import"./Popper-CMBk6tY9.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-CUKo9tOI.js";import"./line-stroke-select-Da6T46Zr.js";import"./line-swatch-DrIy6YmM.js";import"./locked-figure-aria-EX74BjUV.js";import"./item-version-9W43G8cZ.js";import"./article-renderer-LUbgHaPn.js";import"./server-item-renderer-1LUmkp6m.js";import"./hints-renderer-B-q9yvuG.js";import"./components-CA-pBWcu.js";import"./locked-label-settings-D9gsdh3s.js";import"./scrollless-number-text-field-DUF2EDN8.js";import"./trash-bold-BLGUig5L.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
