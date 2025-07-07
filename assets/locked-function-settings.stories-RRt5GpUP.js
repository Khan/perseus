import{j as m,r as P}from"./iframe-Fv9__JIn.js";import{L as r}from"./locked-function-settings-Dwb_D8nc.js";import{g as x}from"./util-DTnki1AO.js";import"./color-select-jDOn1p5o.js";import"./Popper-CbrqrQ01.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BXOwgqOZ.js";import"./line-stroke-select-DuSL_BD5.js";import"./line-swatch-DQ_Eq31u.js";import"./locked-figure-aria-BVGR8kkY.js";import"./item-version-Bq0Objmq.js";import"./article-renderer-UejcvxLK.js";import"./server-item-renderer-B5MufK4m.js";import"./hints-renderer-KmMPHYF1.js";import"./components-D5IfPqjC.js";import"./locked-label-settings-DK-HYlXZ.js";import"./scrollless-number-text-field-C1cCFdIL.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
