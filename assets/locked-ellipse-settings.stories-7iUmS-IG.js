import{j as i,r as c}from"./iframe-Bhupwh5w.js";import{L as n}from"./locked-ellipse-settings-CV8s95WG.js";import{g as k}from"./util-CrHNlbRq.js";import"./item-version-BvnWmnrc.js";import"./article-renderer-BOD8X9FD.js";import"./server-item-renderer-B4bVe63V.js";import"./hints-renderer-BRXn_qM1.js";import"./components-CTVSIdpE.js";import"./color-select-BY5hSW6z.js";import"./Popper-jfYSIreo.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CzO1RTfR.js";import"./locked-label-settings-upXbDCQt.js";import"./trash-bold-BCH5dp9w.js";import"./line-stroke-select-BLhijXgP.js";import"./locked-figure-aria-DBme-zk4.js";const z={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),l={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=l;const r={render:function(){const[o,a]=c.useState(l),t=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:t})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[o,a]=c.useState(!0),[t,d]=c.useState(l),R=C=>{d({...t,...C})};return i.jsx(n,{...t,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
