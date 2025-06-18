import{j as m,r as P}from"./iframe-CtkVBj09.js";import{L as r}from"./locked-function-settings-DsVyltG3.js";import{g as x}from"./util-tpfdoI9z.js";import"./color-select-DFG1IsSh.js";import"./Popper-5JZ0qURI.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BIvm57Hv.js";import"./line-stroke-select-CH_KcVnT.js";import"./line-swatch-CZfSWwZv.js";import"./locked-figure-aria-DAov9yY4.js";import"./item-version-unCQtfPQ.js";import"./article-renderer-BH831tcc.js";import"./server-item-renderer-YruOpBiY.js";import"./hints-renderer-BQQsw2Qv.js";import"./components-D60z2x1D.js";import"./locked-label-settings-C7mcF0XM.js";import"./scrollless-number-text-field-eExfWS4f.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
