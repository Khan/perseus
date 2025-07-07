import{j as m,r as P}from"./iframe-BrZki5aV.js";import{L as r}from"./locked-function-settings-B25VeWrA.js";import{g as x}from"./util-D3bF6ycH.js";import"./color-select-C8WhaQ1B.js";import"./Popper-DabCz0PI.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BNSzINQh.js";import"./line-stroke-select-dNppHcxV.js";import"./line-swatch-apgWy0aW.js";import"./line-weight-select-gV90JqXx.js";import"./locked-figure-aria-4DYBVJsn.js";import"./item-version-CZs_lB4_.js";import"./article-renderer-DluLuKbE.js";import"./server-item-renderer-DQT5DUvS.js";import"./hints-renderer-BIjefl_K.js";import"./components-CkzJH8Q9.js";import"./locked-label-settings-DCDEiNAK.js";import"./scrollless-number-text-field-DKPOyT2t.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
