import{j as i,r as c}from"./iframe-B8IXMsWE.js";import{L as n}from"./locked-ellipse-settings-BZ4dYmbu.js";import{g as k}from"./util-TKfxggoo.js";import"./item-version-V3N3MGsj.js";import"./article-renderer-DmCYWJOM.js";import"./server-item-renderer-BpUAnMe6.js";import"./hints-renderer-DoCLgHSp.js";import"./components-CgZt9zP1.js";import"./color-select-Bu2dlagM.js";import"./Popper-BYaqK5oV.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Cz9YSwRA.js";import"./locked-label-settings-0NnpLp7y.js";import"./trash-bold-pDoOHEMR.js";import"./line-stroke-select-BzZ1YSqw.js";import"./line-weight-select-DCHYlq0m.js";import"./locked-figure-aria-BTjQbEtV.js";const A={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),l={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=l;const r={render:function(){const[o,a]=c.useState(l),t=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:t})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[o,a]=c.useState(!0),[t,d]=c.useState(l),R=C=>{d({...t,...C})};return i.jsx(n,{...t,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const B=["Default","Controlled","Expanded"];export{r as Controlled,e as Default,s as Expanded,B as __namedExportsOrder,A as default};
