import{j as m,r as P}from"./iframe-CTOs5xNT.js";import{L as r}from"./locked-function-settings-CTmou3-F.js";import{g as x}from"./util-SDpAv-jP.js";import"./color-select-Dj6aF5hw.js";import"./Popper-CCxsJDV-.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-XLuAycyM.js";import"./line-stroke-select-DWvz4J06.js";import"./line-swatch-DntDs-_C.js";import"./locked-figure-aria-DVtYBv8e.js";import"./item-version-Cc_SfDGX.js";import"./article-renderer-DhN21r3O.js";import"./server-item-renderer-BDe2OHhV.js";import"./hints-renderer-DgXLEwYt.js";import"./components-DJE46TyK.js";import"./locked-label-settings-CPlK9InF.js";import"./scrollless-number-text-field-wERWZtL8.js";import"./trash-bold-BLGUig5L.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
