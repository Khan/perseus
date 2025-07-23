import{j as i,r as c}from"./iframe-C_FVBbyS.js";import{L as n}from"./locked-ellipse-settings-BKx5caJG.js";import{g as k}from"./util-D5YmjnLD.js";import"./item-version-Dg33Ll3Y.js";import"./article-renderer-DaKBJR0u.js";import"./server-item-renderer-BY7itV5_.js";import"./hints-renderer-BBvEvVOB.js";import"./components-CxTrYglq.js";import"./color-select-D7CnjrnU.js";import"./Popper-B75AFG2E.js";import"./plus-circle-DsgEZe2H.js";import"./scrollless-number-text-field-Bh3Kyziq.js";import"./locked-label-settings-4UK0K7-x.js";import"./perseus-editor-accordion-BxZTU1MM.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-BOcFpz1T.js";import"./line-weight-select-Ct-1Whqg.js";import"./locked-figure-aria-BEZSJSoI.js";const B={title:"PerseusEditor/Components/Locked Ellipse Settings",component:n},e=p=>i.jsx(n,{...p}),m={...k("ellipse"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const r={render:function(){const[o,a]=c.useState(m),t=d=>{a({...o,...d})};return i.jsx(n,{...o,onChangeProps:t})}};r.parameters={chromatic:{disableSnapshot:!0}};const s={render:function(){const[o,a]=c.useState(!0),[t,d]=c.useState(m),R=C=>{d({...t,...C})};return i.jsx(n,{...t,expanded:o,onToggle:a,onChangeProps:R})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var l,u,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const G=["Default","Controlled","Expanded"];export{r as Controlled,e as Default,s as Expanded,G as __namedExportsOrder,B as default};
