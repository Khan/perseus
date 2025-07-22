import{j as m,r as P}from"./iframe-DnQciuiI.js";import{L as r}from"./locked-function-settings-ZIDUtnWq.js";import{g as x}from"./util-5qZ517jZ.js";import"./color-select-RFupFcUT.js";import"./Popper-DGJtFqDw.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-C3tUVgCs.js";import"./line-stroke-select-Cqjx3TNo.js";import"./line-swatch-D34LTaMV.js";import"./line-weight-select-CwVCvAGf.js";import"./locked-figure-aria-fySmZlel.js";import"./item-version-BNtEaiNh.js";import"./article-renderer-CNsp64T0.js";import"./server-item-renderer-Dl6dULhI.js";import"./hints-renderer-C71IX-9-.js";import"./components-BXD-d-sH.js";import"./locked-label-settings-DXuXiqp4.js";import"./scrollless-number-text-field-p-xp318c.js";import"./trash-bold-BLGUig5L.js";const T={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
