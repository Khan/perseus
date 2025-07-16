import{j as m,r as P}from"./iframe-BT7dGlf3.js";import{L as r}from"./locked-function-settings-ByyPVCYQ.js";import{g as x}from"./util-BJTB277V.js";import"./color-select-DRRaiwiQ.js";import"./Popper-F_i5sdBw.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-D5Oq8RhI.js";import"./line-stroke-select-CIZB_Rk4.js";import"./line-swatch-ChHwULG1.js";import"./line-weight-select-CkGBT0Md.js";import"./locked-figure-aria-Ck5UQsWS.js";import"./item-version-C7889Hsx.js";import"./article-renderer-5bctE__9.js";import"./server-item-renderer-DYK2JkIt.js";import"./hints-renderer-Btvs3bhD.js";import"./components-CvRtWeXJ.js";import"./locked-label-settings-B7Om3HIv.js";import"./scrollless-number-text-field-B56gXjlz.js";const O={title:"PerseusEditor/Components/Locked Function Settings",component:r},e=t=>m.jsx(r,{...t}),u={...x("function"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const o={render:function(){const[n,g]=P.useState(u),l=f=>{g({...n,...f})};return m.jsx(r,{...n,expanded:!0,onChangeProps:l})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,p,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
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
