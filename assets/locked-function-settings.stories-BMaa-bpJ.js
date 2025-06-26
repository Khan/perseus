import{j as m,r as P}from"./iframe-Oo-GQJqP.js";import{L as r}from"./locked-function-settings-CPehXeQ6.js";import{g as x}from"./util-DNCTHf5V.js";import"./color-select-Bo66qpBQ.js";import"./Popper-CO3y_-vH.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-D7huKe_N.js";import"./line-stroke-select-2BfDZABu.js";import"./line-swatch-BKCG3M_O.js";import"./locked-figure-aria-TgWQ4miM.js";import"./item-version-BT0M_TQO.js";import"./article-renderer-CbFZ1AVI.js";import"./server-item-renderer-JT-oBpKQ.js";import"./hints-renderer-DVunkuAj.js";import"./components-R-BMGwjI.js";import"./locked-label-settings-Dx2grI4a.js";import"./scrollless-number-text-field-nVVbuiMx.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
