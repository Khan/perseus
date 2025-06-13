import{j as m,r as P}from"./iframe-DNbQgjGT.js";import{L as r}from"./locked-function-settings-BQMWWSbN.js";import{g as x}from"./util-oQyb-f4h.js";import"./color-select-2hjirrCw.js";import"./Popper-DUrDoNvt.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DV2DLnq_.js";import"./line-stroke-select-CaxWSCYy.js";import"./line-swatch-B1RmQghm.js";import"./locked-figure-aria-Bs0LHmQW.js";import"./item-version-BiARHrCi.js";import"./article-renderer-E8oLjVIL.js";import"./server-item-renderer-DT6HFeiY.js";import"./hints-renderer-DRWGABRz.js";import"./components-CGVS3hVu.js";import"./locked-label-settings-B6HjpmLH.js";import"./scrollless-number-text-field-aTts9tEH.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
