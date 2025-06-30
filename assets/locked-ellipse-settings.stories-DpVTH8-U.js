import{j as i,r as c}from"./iframe-Bcg17xLF.js";import{L as n}from"./locked-ellipse-settings-BYIH_cOB.js";import{g as k}from"./util-Dg7Zt9il.js";import"./item-version-Cq6y6B1E.js";import"./article-renderer-CkfdpRoI.js";import"./server-item-renderer-CUMfm4hX.js";import"./hints-renderer-CrMQM1rf.js";import"./components-z5lU3uB1.js";import"./color-select-B5Js-S1X.js";import"./Popper-Bksjufvv.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-D6QHuXR4.js";import"./locked-label-settings-Dof-jKA5.js";import"./trash-bold-VOo_FpSm.js";import"./line-stroke-select-dKlzNf26.js";import"./locked-figure-aria-DlJDjBMQ.js";const z={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),l={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=l;const r={render:function(){const[o,a]=c.useState(l),t=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:t})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[o,a]=c.useState(!0),[t,d]=c.useState(l),R=C=>{d({...t,...C})};return i.jsx(n,{...t,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(f=(x=r.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var E,S,h;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const A=["Default","Controlled","Expanded"];export{r as Controlled,e as Default,s as Expanded,A as __namedExportsOrder,z as default};
