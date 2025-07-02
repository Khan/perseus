import{j as i,r as c}from"./iframe-Dp3THxR6.js";import{L as s}from"./locked-polygon-settings-DAozMkGw.js";import{g as C}from"./util-DZQ-LJrp.js";import"./color-select-C4Km4AoD.js";import"./Popper-DSSrLSMR.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-LD-N73Wb.js";import"./item-version-BB7FzkBy.js";import"./article-renderer-DOJdkHN2.js";import"./server-item-renderer-Dp8rjiTI.js";import"./hints-renderer-BYuLKa6p.js";import"./components-Byo4uxsz.js";import"./scrollless-number-text-field-D9b-3Ltb.js";import"./trash-bold-DI6m6am-.js";import"./labeled-switch-r7LdRFDe.js";import"./line-stroke-select-Dtn1TdRT.js";import"./locked-figure-aria-BUfEC-nh.js";const A={title:"PerseusEditor/Components/Locked Polygon Settings",component:s},e=p=>i.jsx(s,{...p}),m={...C("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const o={render:function(){const[r,a]=c.useState(m),t=d=>{a({...r,...d})};return i.jsx(s,{...r,onChangeProps:t})}};o.parameters={chromatic:{disableSnapshot:!0}};const n={render:function(){const[r,a]=c.useState(!0),[t,d]=c.useState(m),E=y=>{d({...t,...y})};return i.jsx(s,{...t,expanded:r,onToggle:a,onChangeProps:E})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,l,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedPolygonSettings {...args} />;
}`,...(g=(l=e.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var P,x,f;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPolygonSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(f=(x=o.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var S,h,R;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPolygonSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(R=(h=n.parameters)==null?void 0:h.docs)==null?void 0:R.source}}};const B=["Default","Controlled","Expanded"];export{o as Controlled,e as Default,n as Expanded,B as __namedExportsOrder,A as default};
