import{j as m,r as P}from"./iframe-BLnk7R3A.js";import{L as r}from"./locked-function-settings-DuVlIhUy.js";import{g as x}from"./util-ByHPnHME.js";import"./color-select-DrQkhqmR.js";import"./Popper-PxStMmPD.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DEF6DLkZ.js";import"./line-stroke-select-DD6ds7lk.js";import"./line-swatch-BjBquZtr.js";import"./locked-figure-aria-CC_kllJt.js";import"./item-version-BkF3W7GB.js";import"./article-renderer-BwUiNcPk.js";import"./server-item-renderer-IpHh8sRL.js";import"./hints-renderer-DEhrvpZS.js";import"./components-JIs2XqQb.js";import"./locked-label-settings-BPytXpa0.js";import"./scrollless-number-text-field-WZRplWiT.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
