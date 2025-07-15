import{j as i,r as c}from"./iframe-2mn_P961.js";import{L as s}from"./locked-polygon-settings-CCgQURro.js";import{g as C}from"./util-C7EwdJhK.js";import"./color-select-Bm3BgliV.js";import"./Popper-wTckCh2k.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-BYBFCU4w.js";import"./item-version-DM2DahxC.js";import"./article-renderer-BJ0ERF-7.js";import"./server-item-renderer-CZRgO9-K.js";import"./hints-renderer-Bi4cn4Bc.js";import"./components-Bu559I3z.js";import"./scrollless-number-text-field-CalUj8jR.js";import"./trash-bold-CIICLN4v.js";import"./labeled-switch-BQddU1CS.js";import"./line-stroke-select-C1U6wmG4.js";import"./line-weight-select-Dk-mH1YW.js";import"./locked-figure-aria-C432q6hg.js";const B={title:"PerseusEditor/Components/Locked Polygon Settings",component:s},e=p=>i.jsx(s,{...p}),m={...C("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const o={render:function(){const[r,a]=c.useState(m),t=d=>{a({...r,...d})};return i.jsx(s,{...r,onChangeProps:t})}};o.parameters={chromatic:{disableSnapshot:!0}};const n={render:function(){const[r,a]=c.useState(!0),[t,d]=c.useState(m),E=y=>{d({...t,...y})};return i.jsx(s,{...t,expanded:r,onToggle:a,onChangeProps:E})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,l,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
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
