import{j as m,r as P}from"./iframe-C-wjKudE.js";import{L as r}from"./locked-function-settings-Dx6g5RIE.js";import{g as x}from"./util-llrT9vA5.js";import"./color-select-BQfLMAlG.js";import"./Popper-CzCRypv7.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-hoHt6nwA.js";import"./line-stroke-select-CjbrhS0j.js";import"./line-swatch-DE7CwASx.js";import"./line-weight-select-4PRs8gwm.js";import"./locked-figure-aria-Dd4TxHDD.js";import"./item-version-a7DtHh5j.js";import"./article-renderer-B2JAE8o_.js";import"./server-item-renderer-DbBQSC2v.js";import"./hints-renderer-Dxk8feSH.js";import"./components-Vk11JFRY.js";import"./locked-label-settings-Dr-Kty07.js";import"./scrollless-number-text-field-C3KDqXp5.js";import"./trash-bold-BLGUig5L.js";const T={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const b=["Default","Expanded"];export{e as Default,o as Expanded,b as __namedExportsOrder,T as default};
