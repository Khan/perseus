import{j as m,r as f}from"./iframe-CiZ4rom4.js";import{L as o}from"./locked-label-settings-C_Cnfp2w.js";import{g as x}from"./util-H5sE61uR.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import"./components-zJqkJmyj.js";import"./scrollless-number-text-field-D9uDYSfu.js";import"./trash-bold-CBNk1Rb_.js";import"./color-select-DEYIoEID.js";const U={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const v=["Default","Expanded"];export{e as Default,r as Expanded,v as __namedExportsOrder,U as default};
