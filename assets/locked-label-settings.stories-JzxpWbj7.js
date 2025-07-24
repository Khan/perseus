import{j as m,r as f}from"./iframe-JBJONHHl.js";import{L as o}from"./locked-label-settings-CYeWuF6E.js";import{g as x}from"./util-YNxvp7px.js";import"./item-version-DMyJMDPk.js";import"./article-renderer-ISec000u.js";import"./server-item-renderer-DM0y70U2.js";import"./hints-renderer-HTTi4Bca.js";import"./components-BhOs_jtJ.js";import"./color-select-C0VutpKM.js";import"./Popper-C6tyzPej.js";import"./scrollless-number-text-field-DOF6pgyb.js";import"./perseus-editor-accordion-BxmCKcMU.js";import"./caret-up-bold-DYHm6Jyl.js";import"./trash-bold-BLGUig5L.js";const y={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const F=["Default","Expanded"];export{e as Default,r as Expanded,F as __namedExportsOrder,y as default};
