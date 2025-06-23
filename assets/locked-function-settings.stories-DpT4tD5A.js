import{j as m,r as P}from"./iframe-JwIKGAjj.js";import{L as r}from"./locked-function-settings-yB0EkluS.js";import{g as x}from"./util-COBBksVd.js";import"./color-select-DAvFGwVO.js";import"./Popper-FXiokIzt.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CB0SclRT.js";import"./line-stroke-select-wq2TFoSn.js";import"./line-swatch-BAzH_MiP.js";import"./locked-figure-aria-B91BmKgj.js";import"./item-version-ARiCEFOU.js";import"./article-renderer-9ES78zh7.js";import"./server-item-renderer-Ck3ZIC3R.js";import"./hints-renderer-B78aTo8X.js";import"./components-B97u6owF.js";import"./locked-label-settings-CiSqCmqO.js";import"./scrollless-number-text-field-COsXlPuF.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
