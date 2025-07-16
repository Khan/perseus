import{j as m,r as P}from"./iframe-Av__LOls.js";import{L as r}from"./locked-function-settings-DwzeAX5N.js";import{g as x}from"./util-CCGhTNPr.js";import"./color-select-02PaXCTn.js";import"./Popper-CA1_56rf.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-rRr2v9fV.js";import"./line-stroke-select-CWY0Jjok.js";import"./line-swatch-5AzRRd-X.js";import"./line-weight-select-BPcx5QYg.js";import"./locked-figure-aria-dMeY4YzW.js";import"./item-version-CHgavrtG.js";import"./article-renderer-C0sZ0ydP.js";import"./server-item-renderer-aIl7SK8E.js";import"./hints-renderer-C2VM9sFD.js";import"./components-BrYWmJxs.js";import"./locked-label-settings-CTtUMaUi.js";import"./scrollless-number-text-field-2FORyDxz.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
