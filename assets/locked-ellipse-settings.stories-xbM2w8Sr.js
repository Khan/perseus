import{j as i,r as c}from"./iframe-CiZ4rom4.js";import{L as n}from"./locked-ellipse-settings-DpmTb_t-.js";import{g as k}from"./util-H5sE61uR.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import"./components-zJqkJmyj.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-D9uDYSfu.js";import"./locked-label-settings-C_Cnfp2w.js";import"./trash-bold-CBNk1Rb_.js";import"./color-select-DEYIoEID.js";import"./line-stroke-select-BqvcYVMh.js";import"./locked-figure-aria-DsPtqjuL.js";const q={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),l={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=l;const r={render:function(){const[o,a]=c.useState(l),s=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:s})}};r.parameters={chromatic:{disableSnapshot:!0}};const t={render:function(){const[o,a]=c.useState(!0),[s,d]=c.useState(l),R=C=>{d({...s,...C})};return i.jsx(n,{...s,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedEllipseSettings {...args} />;
}`,...(g=(u=e.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var P,x,f;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(f=(x=r.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var E,S,h;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedEllipseSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(h=(S=t.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const z=["Default","Controlled","Expanded"];export{r as Controlled,e as Default,t as Expanded,z as __namedExportsOrder,q as default};
