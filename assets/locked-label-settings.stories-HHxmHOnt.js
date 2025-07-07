import{j as m,r as f}from"./iframe-BILzkKRO.js";import{L as o}from"./locked-label-settings-UcW8xMYx.js";import{g as x}from"./util-rMrxO8bv.js";import"./item-version-C8UhxAl3.js";import"./article-renderer-CVOzbHwq.js";import"./server-item-renderer-BupeiuMF.js";import"./hints-renderer-BGUZEZ3V.js";import"./components-Cj7GY96Z.js";import"./color-select-BprMzO6O.js";import"./Popper-CLpPPWl3.js";import"./scrollless-number-text-field-BQQxkNQ1.js";import"./trash-bold-Co_9nyHz.js";const v={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedLabelSettings {...args} />;
}`,...(p=(a=e.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};var d,c,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLabelSettings {...props} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const w=["Default","Expanded"];export{e as Default,r as Expanded,w as __namedExportsOrder,v as default};
