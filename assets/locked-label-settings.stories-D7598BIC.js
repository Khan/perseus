import{j as m,r as f}from"./iframe-B9Y7vzCP.js";import{L as o}from"./locked-label-settings-BTe4ZWYt.js";import{g as x}from"./util-B5dMkSHv.js";import"./item-version-DjfTV3sU.js";import"./article-renderer-Qt00rsy4.js";import"./server-item-renderer-qvZIhmuu.js";import"./hints-renderer-DMpno9jz.js";import"./components-DPPD5gWW.js";import"./color-select-fRo4Scor.js";import"./Popper-CPg4ycx6.js";import"./scrollless-number-text-field-mQ-e5vcd.js";import"./trash-bold-D-mo8Y8i.js";const v={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
