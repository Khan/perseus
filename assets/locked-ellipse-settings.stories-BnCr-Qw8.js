import{j as i,r as c}from"./iframe-CFuaP2rl.js";import{L as n}from"./locked-ellipse-settings-DRUk0_OR.js";import{g as k}from"./util-DDTZEnTo.js";import"./item-version-dbi47DrE.js";import"./article-renderer-CWbQ3RaI.js";import"./server-item-renderer-W-hRuRM8.js";import"./hints-renderer-Cq53Ebn7.js";import"./components-DpoOYy7y.js";import"./color-select-BWVyLB5v.js";import"./Popper-Qbe8fQC5.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-CPmighY0.js";import"./locked-label-settings-B-3wqLqn.js";import"./trash-bold-C9Txfyrj.js";import"./line-stroke-select-ClGJ3YTb.js";import"./line-weight-select-_5ACBSVD.js";import"./locked-figure-aria-vxoXcOq6.js";const A={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),l={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=l;const r={render:function(){const[o,a]=c.useState(l),t=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:t})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[o,a]=c.useState(!0),[t,d]=c.useState(l),R=C=>{d({...t,...C})};return i.jsx(n,{...t,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var m,u,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`(args): React.ReactElement => {
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
