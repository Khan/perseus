import{j as m,r as P}from"./iframe-Cn2sr9XL.js";import{L as r}from"./locked-function-settings-mBnBupYa.js";import{g as x}from"./util-BxRJXdXY.js";import"./color-select-DnTLIDUM.js";import"./Popper-B91G_J1J.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CxYA3pEV.js";import"./line-stroke-select-Lqk_zGca.js";import"./line-swatch-D7h7Kmaw.js";import"./line-weight-select-Dvy8Wfl1.js";import"./locked-figure-aria-DLdl6QaE.js";import"./item-version-CTN-kA__.js";import"./article-renderer-Cb_B2GZZ.js";import"./server-item-renderer-Ba-JUrlz.js";import"./hints-renderer-Dp6eZWrp.js";import"./components-DoZqPXTQ.js";import"./locked-label-settings-CoxZeMn2.js";import"./scrollless-number-text-field-D33ovrgT.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
