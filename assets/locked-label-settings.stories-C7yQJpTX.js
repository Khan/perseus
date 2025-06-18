import{j as m,r as f}from"./iframe-CQulAyj4.js";import{L as o}from"./locked-label-settings-Be4tns3Y.js";import{g as x}from"./util-BBrYuiGM.js";import"./item-version-CiqeGUu5.js";import"./article-renderer-cQoZ0G63.js";import"./server-item-renderer-BZGqR-cd.js";import"./hints-renderer-BRKqsHiV.js";import"./components-KUKGpydJ.js";import"./color-select-Cj4pSvu5.js";import"./Popper-DRqVFVaF.js";import"./scrollless-number-text-field-BfM6FLRQ.js";import"./perseus-editor-accordion-C7a69MEy.js";import"./trash-bold-BLGUig5L.js";const w={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const y=["Default","Expanded"];export{e as Default,r as Expanded,y as __namedExportsOrder,w as default};
