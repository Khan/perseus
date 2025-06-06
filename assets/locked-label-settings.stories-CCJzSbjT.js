import{j as m,r as f}from"./iframe-BDVJISiT.js";import{L as o}from"./locked-label-settings-CvwUphhc.js";import{g as x}from"./util-BFVF9o4I.js";import"./item-version-rBwLKTlF.js";import"./article-renderer-BTwqu2s8.js";import"./server-item-renderer-Vgm5yKO_.js";import"./hints-renderer-BpiauPQE.js";import"./components-Cyxr-qtA.js";import"./color-select-CPHaHaV9.js";import"./Popper-D6gtNNrd.js";import"./scrollless-number-text-field-jBEEntx6.js";import"./trash-bold-Br1SAYQH.js";const v={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
