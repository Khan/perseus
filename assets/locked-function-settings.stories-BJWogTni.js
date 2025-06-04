import{j as m,r as P}from"./iframe-CHyJX4M4.js";import{L as r}from"./locked-function-settings-3iVmGpB8.js";import{g as x}from"./util-DgoBsP2o.js";import"./color-select-DO9YQW7B.js";import"./Popper-BICro7bh.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-D4eDHxnb.js";import"./line-stroke-select-4zByI_1A.js";import"./line-swatch-C7kX1awk.js";import"./locked-figure-aria-DiO5S3vH.js";import"./item-version-BXIllmSv.js";import"./article-renderer-DZh_xXjl.js";import"./server-item-renderer-J5PHmMM-.js";import"./hints-renderer-BSDON6Vl.js";import"./components-CkqhwenY.js";import"./locked-label-settings-DRPZK-mY.js";import"./scrollless-number-text-field-B0H87epB.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
