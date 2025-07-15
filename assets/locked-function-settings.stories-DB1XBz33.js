import{j as m,r as P}from"./iframe-2mn_P961.js";import{L as r}from"./locked-function-settings-Y-moHVZ3.js";import{g as x}from"./util-C7EwdJhK.js";import"./color-select-Bm3BgliV.js";import"./Popper-wTckCh2k.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CIICLN4v.js";import"./line-stroke-select-C1U6wmG4.js";import"./line-swatch-C9LjvkST.js";import"./line-weight-select-Dk-mH1YW.js";import"./locked-figure-aria-C432q6hg.js";import"./item-version-DM2DahxC.js";import"./article-renderer-BJ0ERF-7.js";import"./server-item-renderer-CZRgO9-K.js";import"./hints-renderer-Bi4cn4Bc.js";import"./components-Bu559I3z.js";import"./locked-label-settings-BYBFCU4w.js";import"./scrollless-number-text-field-CalUj8jR.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
