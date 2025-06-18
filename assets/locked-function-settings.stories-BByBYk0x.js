import{j as m,r as P}from"./iframe-BrZ1H8ZK.js";import{L as r}from"./locked-function-settings-D2Qk7O58.js";import{g as x}from"./util-BV9IRbPv.js";import"./color-select-Drqrxf9j.js";import"./Popper-El47U0sO.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DfvYDK3y.js";import"./line-stroke-select-CQ7mA6Xk.js";import"./line-swatch-BEK_bS3V.js";import"./locked-figure-aria-FozlI6ws.js";import"./item-version-DFykEjDa.js";import"./article-renderer-BGqm1xOZ.js";import"./server-item-renderer-BFvp-8bw.js";import"./hints-renderer-CIxBRI6H.js";import"./components-CZOyNMWg.js";import"./locked-label-settings-DRY8G7F1.js";import"./scrollless-number-text-field-1eYC2IET.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
