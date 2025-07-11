import{j as m,r as f}from"./iframe-Cm8NUS_Y.js";import{L as o}from"./locked-label-settings-DGpBy2gv.js";import{g as x}from"./util-MBvzIVar.js";import"./item-version-D5C1uYsd.js";import"./article-renderer-B5DIoItv.js";import"./server-item-renderer-CT3U3M3v.js";import"./hints-renderer-pQxN6z_3.js";import"./components-FB5QV9Xg.js";import"./color-select-ib9pDJUU.js";import"./Popper-TtfX7zON.js";import"./scrollless-number-text-field-BFQ29XtH.js";import"./trash-bold-DXAzIJnp.js";const v={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
