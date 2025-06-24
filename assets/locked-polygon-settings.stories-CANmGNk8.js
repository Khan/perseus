import{j as i,r as c}from"./iframe-qfk1c0wx.js";import{L as s}from"./locked-polygon-settings-BzBnEocU.js";import{g as C}from"./util-D0aHefUI.js";import"./color-select-t4VtVHAD.js";import"./Popper-B8EhtmUB.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-BQj4t1JH.js";import"./item-version-DXWFoSVz.js";import"./article-renderer-D2p-Zvlh.js";import"./server-item-renderer-vluqCfII.js";import"./hints-renderer-Dge91Vhi.js";import"./components-5FeqireL.js";import"./scrollless-number-text-field-BE8rQPwd.js";import"./trash-bold-DuCFjCDF.js";import"./labeled-switch-DuZQMhFh.js";import"./line-stroke-select-ChX-B41Y.js";import"./locked-figure-aria-CBstWXJ_.js";const A={title:"PerseusEditor/Components/Locked Polygon Settings",component:s},e=p=>i.jsx(s,{...p}),m={...C("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const o={render:function(){const[r,a]=c.useState(m),t=d=>{a({...r,...d})};return i.jsx(s,{...r,onChangeProps:t})}};o.parameters={chromatic:{disableSnapshot:!0}};const n={render:function(){const[r,a]=c.useState(!0),[t,d]=c.useState(m),E=y=>{d({...t,...y})};return i.jsx(s,{...t,expanded:r,onToggle:a,onChangeProps:E})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,l,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
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
