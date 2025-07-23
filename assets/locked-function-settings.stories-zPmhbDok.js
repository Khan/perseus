import{j as m,r as P}from"./iframe-DtbX7KBe.js";import{L as r}from"./locked-function-settings-DDWGdzYH.js";import{g as x}from"./util-Bj2ekDMv.js";import"./color-select-D306VRiY.js";import"./Popper-CMu4EmI3.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-Ds6n-yl4.js";import"./line-stroke-select-DUSU6RPC.js";import"./line-swatch-DQ8DdR61.js";import"./line-weight-select-C700oXJx.js";import"./locked-figure-aria-BXlQV6_G.js";import"./item-version-BEL4jV8Z.js";import"./article-renderer-Dl2x5ihV.js";import"./server-item-renderer-BExEo_fl.js";import"./hints-renderer-BGyx14Rl.js";import"./components-dXgi6rqD.js";import"./locked-label-settings-leiLgfZ2.js";import"./scrollless-number-text-field-ENd4KcRs.js";import"./trash-bold-BLGUig5L.js";const T={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
