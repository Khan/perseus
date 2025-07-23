import{j as m,r as P}from"./iframe-C_FVBbyS.js";import{L as r}from"./locked-function-settings-QZaHlQiV.js";import{g as x}from"./util-D5YmjnLD.js";import"./color-select-D7CnjrnU.js";import"./Popper-B75AFG2E.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-BxZTU1MM.js";import"./line-stroke-select-BOcFpz1T.js";import"./line-swatch-CIkfAWQI.js";import"./line-weight-select-Ct-1Whqg.js";import"./locked-figure-aria-BEZSJSoI.js";import"./item-version-Dg33Ll3Y.js";import"./article-renderer-DaKBJR0u.js";import"./server-item-renderer-BY7itV5_.js";import"./hints-renderer-BBvEvVOB.js";import"./components-CxTrYglq.js";import"./locked-label-settings-4UK0K7-x.js";import"./scrollless-number-text-field-Bh3Kyziq.js";import"./trash-bold-BLGUig5L.js";const T={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
