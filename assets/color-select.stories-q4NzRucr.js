import{j as d,r as C}from"./iframe-Bcg17xLF.js";import{C as t}from"./color-select-B5Js-S1X.js";import{g as f}from"./util-Dg7Zt9il.js";import"./Popper-Bksjufvv.js";import"./item-version-Cq6y6B1E.js";import"./article-renderer-CkfdpRoI.js";import"./server-item-renderer-CUMfm4hX.js";import"./hints-renderer-CrMQM1rf.js";const j={title:"PerseusEditor/Components/Color Select",component:t},e=o=>d.jsx(t,{...o}),m=f("point").color;e.args={id:"color-select",selectedValue:m,onChange:()=>{}};const r={render:function(){const[p,i]=C.useState(m);return d.jsx(t,{selectedValue:p,onChange:i})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,a,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args): React.ReactElement => {
  return <ColorSelect {...args} />;
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};var n,c,u;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: function Render() {
    const [selectedValue, setSelectedValue] = React.useState<LockedFigureColor>(defaultColor);
    return <ColorSelect selectedValue={selectedValue} onChange={setSelectedValue} />;
  }
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const D=["Default","Controlled"];export{r as Controlled,e as Default,D as __namedExportsOrder,j as default};
