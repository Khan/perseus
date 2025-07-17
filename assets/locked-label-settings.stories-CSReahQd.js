import{j as m,r as f}from"./iframe-dtRUXA0K.js";import{L as o}from"./locked-label-settings-DtT-Xtg4.js";import{g as x}from"./util-CfvQLB2H.js";import"./item-version-DMJCE50v.js";import"./article-renderer-Byw2HVqp.js";import"./server-item-renderer-qMN3rKYq.js";import"./hints-renderer-vaNkg7zC.js";import"./components-sXKLdkR2.js";import"./color-select-BzE4WvfI.js";import"./Popper-C2-c6jHx.js";import"./scrollless-number-text-field-D0lIy96v.js";import"./trash-bold-jwHsoyvY.js";const v={title:"PerseusEditor/Components/Locked Label Settings",component:o},e=t=>m.jsx(o,{...t}),u={...x("label"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=u;const r={render:function(){const[s,l]=f.useState(u),g=P=>{l({...s,...P})};return m.jsx(o,{...s,expanded:!0,onChangeProps:g})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,a,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(args): React.ReactElement => {
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
