import{j as i,r as c}from"./iframe-BfGmgqQL.js";import{L as s}from"./locked-polygon-settings-DiMaEcSk.js";import{g as C}from"./util-ehWwi9-K.js";import"./color-select-BL-iSzCn.js";import"./Popper-B6Qw_wGp.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-B2lUxUhK.js";import"./item-version-BDaxewFE.js";import"./article-renderer-CN8BN6YT.js";import"./server-item-renderer-D3LnnBfW.js";import"./hints-renderer-DT9PPkpF.js";import"./components-B0sfFe2K.js";import"./scrollless-number-text-field-DuNqBrh9.js";import"./trash-bold-Brgr7b7T.js";import"./labeled-switch-CCJGdtN_.js";import"./line-stroke-select-Ckyq44lU.js";import"./line-weight-select-BtJGrbfT.js";import"./locked-figure-aria-CFlU2oqz.js";const B={title:"PerseusEditor/Components/Locked Polygon Settings",component:s},e=p=>i.jsx(s,{...p}),m={...C("polygon"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};e.args=m;const o={render:function(){const[r,a]=c.useState(m),t=d=>{a({...r,...d})};return i.jsx(s,{...r,onChangeProps:t})}};o.parameters={chromatic:{disableSnapshot:!0}};const n={render:function(){const[r,a]=c.useState(!0),[t,d]=c.useState(m),E=y=>{d({...t,...y})};return i.jsx(s,{...t,expanded:r,onToggle:a,onChangeProps:E})}};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var u,l,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args): React.ReactElement => {
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
