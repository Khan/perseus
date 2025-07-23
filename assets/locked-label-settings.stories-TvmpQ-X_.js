import{j as m,r as f}from"./iframe-C_FVBbyS.js";import{L as o}from"./locked-label-settings-4UK0K7-x.js";import{g as x}from"./util-D5YmjnLD.js";import"./item-version-Dg33Ll3Y.js";import"./article-renderer-DaKBJR0u.js";import"./server-item-renderer-BY7itV5_.js";import"./hints-renderer-BBvEvVOB.js";import"./components-CxTrYglq.js";import"./color-select-D7CnjrnU.js";import"./Popper-B75AFG2E.js";import"./scrollless-number-text-field-Bh3Kyziq.js";import"./perseus-editor-accordion-BxZTU1MM.js";import"./trash-bold-BLGUig5L.js";const w={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
