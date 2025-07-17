import{j as m,r as P}from"./iframe-dtRUXA0K.js";import{L as r}from"./locked-function-settings-DJU3WB-P.js";import{g as x}from"./util-CfvQLB2H.js";import"./color-select-BzE4WvfI.js";import"./Popper-C2-c6jHx.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-jwHsoyvY.js";import"./line-stroke-select-iLpAr8tM.js";import"./line-swatch-Ao22XXhz.js";import"./line-weight-select-D-rkj1hD.js";import"./locked-figure-aria-Dw1In3RR.js";import"./item-version-DMJCE50v.js";import"./article-renderer-Byw2HVqp.js";import"./server-item-renderer-qMN3rKYq.js";import"./hints-renderer-vaNkg7zC.js";import"./components-sXKLdkR2.js";import"./locked-label-settings-DtT-Xtg4.js";import"./scrollless-number-text-field-D0lIy96v.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
