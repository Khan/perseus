import{j as m,r as P}from"./iframe-qfk1c0wx.js";import{L as r}from"./locked-function-settings-CljDkQvR.js";import{g as x}from"./util-D0aHefUI.js";import"./color-select-t4VtVHAD.js";import"./Popper-B8EhtmUB.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DuCFjCDF.js";import"./line-stroke-select-ChX-B41Y.js";import"./line-swatch-D07cTGUs.js";import"./locked-figure-aria-CBstWXJ_.js";import"./item-version-DXWFoSVz.js";import"./article-renderer-D2p-Zvlh.js";import"./server-item-renderer-vluqCfII.js";import"./hints-renderer-Dge91Vhi.js";import"./components-5FeqireL.js";import"./locked-label-settings-BQj4t1JH.js";import"./scrollless-number-text-field-BE8rQPwd.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
