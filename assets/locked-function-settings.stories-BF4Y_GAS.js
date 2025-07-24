import{j as m,r as P}from"./iframe-B7rrjhX-.js";import{L as r}from"./locked-function-settings-CagGTrka.js";import{g as x}from"./util-DpBZvdzG.js";import"./color-select-rH8ph09C.js";import"./Popper-BIyp_Cbc.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-CN6XVc66.js";import"./line-stroke-select-DtYh1ZyJ.js";import"./line-swatch-BYnZZCki.js";import"./line-weight-select-Dy0ziK87.js";import"./locked-figure-aria-BnZcOiY1.js";import"./item-version-C71bDQee.js";import"./article-renderer-CKpNj7Wm.js";import"./server-item-renderer-CzC3QTOf.js";import"./hints-renderer-B1JL43nH.js";import"./components-Dr_1lztj.js";import"./locked-label-settings-BK3uwQNs.js";import"./scrollless-number-text-field-DbOJ7h5p.js";import"./trash-bold-BLGUig5L.js";const T={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const b=["Default","Expanded"];export{e as Default,o as Expanded,b as __namedExportsOrder,T as default};
