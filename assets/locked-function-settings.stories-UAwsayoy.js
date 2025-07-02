import{j as m,r as P}from"./iframe-Dp3THxR6.js";import{L as r}from"./locked-function-settings-CZLDdQTV.js";import{g as x}from"./util-DZQ-LJrp.js";import"./color-select-C4Km4AoD.js";import"./Popper-DSSrLSMR.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DI6m6am-.js";import"./line-stroke-select-Dtn1TdRT.js";import"./line-swatch-inrEzYvI.js";import"./locked-figure-aria-BUfEC-nh.js";import"./item-version-BB7FzkBy.js";import"./article-renderer-DOJdkHN2.js";import"./server-item-renderer-Dp8rjiTI.js";import"./hints-renderer-BYuLKa6p.js";import"./components-Byo4uxsz.js";import"./locked-label-settings-LD-N73Wb.js";import"./scrollless-number-text-field-D9b-3Ltb.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
