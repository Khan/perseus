import{j as i,r as c}from"./iframe-B_16MRTp.js";import{L as s}from"./locked-polygon-settings-TMOUjLKb.js";import{g as C}from"./util-8jB5qdwX.js";import"./color-select-BSL8fz8E.js";import"./Popper-CMBk6tY9.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-D9gsdh3s.js";import"./item-version-9W43G8cZ.js";import"./article-renderer-LUbgHaPn.js";import"./server-item-renderer-1LUmkp6m.js";import"./hints-renderer-B-q9yvuG.js";import"./components-CA-pBWcu.js";import"./scrollless-number-text-field-DUF2EDN8.js";import"./perseus-editor-accordion-CUKo9tOI.js";import"./trash-bold-BLGUig5L.js";import"./labeled-switch-D8HPlhqM.js";import"./line-stroke-select-Da6T46Zr.js";import"./locked-figure-aria-EX74BjUV.js";const B={title:"PerseusEditor/Components/Locked Polygon Settings",component:s},e=p=>i.jsx(s,{...p}),m={...C("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const o={render:function(){const[r,a]=c.useState(m),t=d=>{a({...r,...d})};return i.jsx(s,{...r,onChangeProps:t})}};o.parameters={chromatic:{disableSnapshot:!0}};const n={render:function(){const[r,a]=c.useState(!0),[t,d]=c.useState(m),E=y=>{d({...t,...y})};return i.jsx(s,{...t,expanded:r,onToggle:a,onChangeProps:E})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,l,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(R=(h=n.parameters)==null?void 0:h.docs)==null?void 0:R.source}}};const G=["Default","Controlled","Expanded"];export{o as Controlled,e as Default,n as Expanded,G as __namedExportsOrder,B as default};
