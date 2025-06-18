import{j as m,r as P}from"./iframe-C7PW0sis.js";import{L as r}from"./locked-function-settings-CCJS1dQ6.js";import{g as x}from"./util-CZ-1dilU.js";import"./color-select-D6FTkYE6.js";import"./Popper-ChXQ5gks.js";import"./plus-circle-DsgEZe2H.js";import"./perseus-editor-accordion-C1gIZO7M.js";import"./line-stroke-select-B7G4JZ0N.js";import"./line-swatch-CEPKNkkj.js";import"./locked-figure-aria-BJchdu7I.js";import"./item-version-DIeKpaj3.js";import"./article-renderer-BQoFzl2S.js";import"./server-item-renderer-DD0DwK9e.js";import"./hints-renderer-Ccd9Ou7K.js";import"./components-B6sji5Cj.js";import"./locked-label-settings-CG5lhsLI.js";import"./scrollless-number-text-field-5HwE-YEH.js";import"./trash-bold-BLGUig5L.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
