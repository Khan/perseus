import{j as m,r as P}from"./iframe-YKV31o64.js";import{L as r}from"./locked-function-settings-BFJKx1yg.js";import{g as x}from"./util-ckYU2rVO.js";import"./color-select-DuLtDjT7.js";import"./Popper-BWTOPqNy.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-Deco_rzA.js";import"./line-stroke-select-BQLttffs.js";import"./line-swatch-BKhf-5GR.js";import"./locked-figure-aria-DiyTbo2R.js";import"./item-version-CXVZxRsh.js";import"./article-renderer-DqRsdQha.js";import"./server-item-renderer-UUlWUSLm.js";import"./hints-renderer-D-t2fIeV.js";import"./components-DeHeXBes.js";import"./locked-label-settings-DUe-0Crc.js";import"./scrollless-number-text-field-B-5jSEKO.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
