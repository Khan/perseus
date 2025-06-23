import{j as m,r as P}from"./iframe-o1pCwqXX.js";import{L as r}from"./locked-function-settings-D_jOqr-i.js";import{g as x}from"./util-CwtzpObJ.js";import"./color-select-CqogY1OW.js";import"./Popper-DFWX8J_S.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DpTA5oLD.js";import"./line-stroke-select-C0m8ifdA.js";import"./line-swatch-GXfkQ6EX.js";import"./locked-figure-aria-fsWeTzXe.js";import"./item-version-BAQ_i9c-.js";import"./article-renderer-lXMRMr8O.js";import"./server-item-renderer-DqXChjhQ.js";import"./hints-renderer-BLa8_CQu.js";import"./components-DJhNo76G.js";import"./locked-label-settings-NBObVULI.js";import"./scrollless-number-text-field-Do7us6uT.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
