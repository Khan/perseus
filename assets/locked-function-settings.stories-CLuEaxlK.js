import{j as m,r as P}from"./iframe-CdKw17cY.js";import{L as r}from"./locked-function-settings-gw0b0hu4.js";import{g as x}from"./util-0cUl0iG6.js";import"./color-select-B6jgMiF9.js";import"./Popper-COwVOKD4.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-Cu5qKUK7.js";import"./line-stroke-select-BuvoEUAG.js";import"./line-swatch-D9cX1W51.js";import"./locked-figure-aria-DPcPcm5I.js";import"./item-version-M67OA0Xz.js";import"./article-renderer-CR-MsTDv.js";import"./server-item-renderer-DDcQhKB2.js";import"./hints-renderer-AS4jLqdB.js";import"./components-B_aY1Nxk.js";import"./locked-label-settings-C_7KH_kA.js";import"./scrollless-number-text-field-DRln1rGy.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
