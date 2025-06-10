import{j as m,r as P}from"./iframe-B7jCOty_.js";import{L as r}from"./locked-function-settings-DrzW3xS-.js";import{g as x}from"./util-0icrRHBP.js";import"./color-select-DiYttdaI.js";import"./Popper-MSVxpL3K.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-C7MUjCib.js";import"./line-stroke-select-CdUcdpE8.js";import"./line-swatch-D5l0a2EV.js";import"./locked-figure-aria-RRUk1hsX.js";import"./item-version-0aj83p6L.js";import"./article-renderer-rVLmfG8X.js";import"./server-item-renderer-DsVgY6_U.js";import"./hints-renderer-CEDzZJBN.js";import"./components-DOungNYC.js";import"./locked-label-settings-DGu1IJNB.js";import"./scrollless-number-text-field-C0mYEJt4.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
