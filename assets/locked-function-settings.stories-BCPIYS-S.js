import{j as m,r as P}from"./iframe-Cm8NUS_Y.js";import{L as r}from"./locked-function-settings-COrdBNJr.js";import{g as x}from"./util-MBvzIVar.js";import"./color-select-ib9pDJUU.js";import"./Popper-TtfX7zON.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DXAzIJnp.js";import"./line-stroke-select-C2XCPfSu.js";import"./line-swatch-feBghyu-.js";import"./line-weight-select-CaQM5dex.js";import"./locked-figure-aria-D5CR-BDF.js";import"./item-version-D5C1uYsd.js";import"./article-renderer-B5DIoItv.js";import"./server-item-renderer-CT3U3M3v.js";import"./hints-renderer-pQxN6z_3.js";import"./components-FB5QV9Xg.js";import"./locked-label-settings-DGpBy2gv.js";import"./scrollless-number-text-field-BFQ29XtH.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
