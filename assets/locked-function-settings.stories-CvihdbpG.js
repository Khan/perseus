import{j as m,r as P}from"./iframe-oVdCiwLc.js";import{L as r}from"./locked-function-settings-BebRpkdA.js";import{g as x}from"./util-DKG8wQoS.js";import"./color-select-CtVpOXsy.js";import"./Popper-CVgS00Y6.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CGZ-cXVd.js";import"./line-stroke-select-Dru8Hikp.js";import"./line-swatch-Bov0nPD6.js";import"./line-weight-select-CSKwZ6CJ.js";import"./locked-figure-aria-BalhOl75.js";import"./item-version-DOq5lPyi.js";import"./article-renderer-BghgEmMn.js";import"./server-item-renderer-B19zWJQi.js";import"./hints-renderer-JZ7chtEs.js";import"./components-Xo-rMjfd.js";import"./locked-label-settings-C6MT0prM.js";import"./scrollless-number-text-field-DjivOxeE.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
