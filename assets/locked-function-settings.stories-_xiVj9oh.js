import{j as m,r as P}from"./iframe-Bhupwh5w.js";import{L as r}from"./locked-function-settings-CtjvI7RX.js";import{g as x}from"./util-CrHNlbRq.js";import"./color-select-BY5hSW6z.js";import"./Popper-jfYSIreo.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BCH5dp9w.js";import"./line-stroke-select-BLhijXgP.js";import"./line-swatch-C7zGSE1Q.js";import"./locked-figure-aria-DBme-zk4.js";import"./item-version-BvnWmnrc.js";import"./article-renderer-BOD8X9FD.js";import"./server-item-renderer-B4bVe63V.js";import"./hints-renderer-BRXn_qM1.js";import"./components-CTVSIdpE.js";import"./locked-label-settings-upXbDCQt.js";import"./scrollless-number-text-field-CzO1RTfR.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
