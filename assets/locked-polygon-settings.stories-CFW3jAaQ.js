import{j as i,r as c}from"./iframe-Fv9__JIn.js";import{L as s}from"./locked-polygon-settings-BPdgU_lx.js";import{g as C}from"./util-DTnki1AO.js";import"./color-select-jDOn1p5o.js";import"./Popper-CbrqrQ01.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-DK-HYlXZ.js";import"./item-version-Bq0Objmq.js";import"./article-renderer-UejcvxLK.js";import"./server-item-renderer-B5MufK4m.js";import"./hints-renderer-KmMPHYF1.js";import"./components-D5IfPqjC.js";import"./scrollless-number-text-field-C1cCFdIL.js";import"./trash-bold-BXOwgqOZ.js";import"./labeled-switch-B1k5rKl3.js";import"./line-stroke-select-DuSL_BD5.js";import"./line-weight-select-Cqor9uhN.js";import"./locked-figure-aria-BVGR8kkY.js";const B={title:"PerseusEditor/Components/Locked Polygon Settings",component:s},e=p=>i.jsx(s,{...p}),m={...C("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const o={render:function(){const[r,a]=c.useState(m),t=d=>{a({...r,...d})};return i.jsx(s,{...r,onChangeProps:t})}};o.parameters={chromatic:{disableSnapshot:!0}};const n={render:function(){const[r,a]=c.useState(!0),[t,d]=c.useState(m),E=y=>{d({...t,...y})};return i.jsx(s,{...t,expanded:r,onToggle:a,onChangeProps:E})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,l,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
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
