import{j as m,r as P}from"./iframe-DTktfcfm.js";import{L as r}from"./locked-function-settings-D_Zqd-ho.js";import{g as x}from"./util-Bn69jzv6.js";import"./color-select-DgKfqFoq.js";import"./Popper-DlaF0ENk.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-CHhxdmM7.js";import"./line-stroke-select-BYns5wdv.js";import"./line-swatch-DfW98qhs.js";import"./locked-figure-aria-CQfizhEc.js";import"./item-version-BvWhgKyI.js";import"./article-renderer-D4VzMFep.js";import"./server-item-renderer-CJUvzYwm.js";import"./hints-renderer-Dab54eyk.js";import"./components-B5t7-my3.js";import"./locked-label-settings-mKUISBaq.js";import"./scrollless-number-text-field-B54fnWRI.js";const N={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
