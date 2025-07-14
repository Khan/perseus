import{j as m,r as P}from"./iframe-CFuaP2rl.js";import{L as r}from"./locked-function-settings-BWydfy9-.js";import{g as x}from"./util-DDTZEnTo.js";import"./color-select-BWVyLB5v.js";import"./Popper-Qbe8fQC5.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-C9Txfyrj.js";import"./line-stroke-select-ClGJ3YTb.js";import"./line-swatch-CascVpyn.js";import"./line-weight-select-_5ACBSVD.js";import"./locked-figure-aria-vxoXcOq6.js";import"./item-version-dbi47DrE.js";import"./article-renderer-CWbQ3RaI.js";import"./server-item-renderer-W-hRuRM8.js";import"./hints-renderer-Cq53Ebn7.js";import"./components-DpoOYy7y.js";import"./locked-label-settings-B-3wqLqn.js";import"./scrollless-number-text-field-CPmighY0.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
