import{j as m,r as f}from"./iframe-D3VzT3LL.js";import{L as o}from"./locked-label-settings-BUQcaqGP.js";import{g as x}from"./util-BqQaeTdh.js";import"./item-version-m_0hhLH7.js";import"./article-renderer-CT6n8g1l.js";import"./server-item-renderer-TtIqDjpg.js";import"./hints-renderer-C7KhoaEn.js";import"./components-DRJn21hJ.js";import"./color-select-fF9B68dj.js";import"./Popper-BINN5MFU.js";import"./scrollless-number-text-field-Xh5HxFDA.js";import"./trash-bold-BVYeKEKD.js";const v={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
