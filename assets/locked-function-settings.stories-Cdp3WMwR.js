import{j as m,r as P}from"./iframe-DLWI6uzF.js";import{L as r}from"./locked-function-settings-FxmTafMQ.js";import{g as x}from"./util-B7doZQq0.js";import"./color-select-BWkKt7so.js";import"./Popper-Bq9O6c5f.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CACcza_X.js";import"./line-stroke-select-CUqfxfHP.js";import"./line-swatch-DYTqmqYy.js";import"./line-weight-select-DcBGbIXv.js";import"./locked-figure-aria-J7X9XKLu.js";import"./item-version-BmTx6a5n.js";import"./article-renderer-qnvGESzG.js";import"./server-item-renderer-D4lOQ3Yn.js";import"./hints-renderer-BKzF6YmD.js";import"./components-CTYeY55B.js";import"./locked-label-settings-BercU7fK.js";import"./scrollless-number-text-field-BRbqCNc2.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
