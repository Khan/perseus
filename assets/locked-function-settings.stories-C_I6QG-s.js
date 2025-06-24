import{j as m,r as P}from"./iframe-gHPTgJAT.js";import{L as r}from"./locked-function-settings-CZp3Xq9-.js";import{g as x}from"./util-DlVOUldk.js";import"./color-select-Dh8aaETA.js";import"./Popper-cacjySX8.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BOD_tO_K.js";import"./line-stroke-select-aWYlh_Nv.js";import"./line-swatch-CNwVtvMF.js";import"./locked-figure-aria-CQS-WfIm.js";import"./item-version-BiEcwQw5.js";import"./article-renderer-CJgVKQva.js";import"./server-item-renderer-CKnw9Tcb.js";import"./hints-renderer-pWFvPMC8.js";import"./components-WUX2y3_o.js";import"./locked-label-settings-Scaahz01.js";import"./scrollless-number-text-field-BXijIN6q.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
