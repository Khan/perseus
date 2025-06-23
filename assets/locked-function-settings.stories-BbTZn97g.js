import{j as m,r as P}from"./iframe-AqpKHAY9.js";import{L as r}from"./locked-function-settings-B_LmJBhr.js";import{g as x}from"./util-ClB3_ScO.js";import"./color-select-MR3llq9r.js";import"./Popper-1Z0P4ALo.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-BNn5RI9j.js";import"./line-stroke-select-DPZWkXCk.js";import"./line-swatch-BCp0Lzna.js";import"./locked-figure-aria-Cv1mfy-e.js";import"./item-version-B8Toki3N.js";import"./article-renderer-CMSUfeiO.js";import"./server-item-renderer-BJjmxO8L.js";import"./hints-renderer-BTjqbEcf.js";import"./components-B4KlTTTG.js";import"./locked-label-settings-DyGpqt7a.js";import"./scrollless-number-text-field-CEqWsi5k.js";import"./trash-bold-BLGUig5L.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
