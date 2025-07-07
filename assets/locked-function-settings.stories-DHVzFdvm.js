import{j as m,r as P}from"./iframe-iAiOm5Ap.js";import{L as r}from"./locked-function-settings-BYHVSgAp.js";import{g as x}from"./util-yGxPFB_n.js";import"./color-select-CTDtn5_B.js";import"./Popper-Bt_XS3y4.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BGuWDQ7Q.js";import"./line-stroke-select-RIsl9SSu.js";import"./line-swatch-Cn9oZD9h.js";import"./line-weight-select-BJxwmXG1.js";import"./locked-figure-aria-CLcyVw6I.js";import"./item-version-C5i0v7iA.js";import"./article-renderer-p79UJ7Qj.js";import"./server-item-renderer-dGwu8wgv.js";import"./hints-renderer-Brs_fc6P.js";import"./components-CdSEnTNx.js";import"./locked-label-settings-CY6O8gkz.js";import"./scrollless-number-text-field-BrgzPkPA.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
