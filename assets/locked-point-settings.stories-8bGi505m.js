import{j as u,r as p}from"./iframe-qfk1c0wx.js";import{L as a}from"./locked-point-settings-DOsxsXkq.js";import{g as w}from"./util-D0aHefUI.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-BQj4t1JH.js";import"./item-version-DXWFoSVz.js";import"./article-renderer-D2p-Zvlh.js";import"./server-item-renderer-vluqCfII.js";import"./hints-renderer-Dge91Vhi.js";import"./components-5FeqireL.js";import"./color-select-t4VtVHAD.js";import"./Popper-B8EhtmUB.js";import"./scrollless-number-text-field-BE8rQPwd.js";import"./trash-bold-DuCFjCDF.js";import"./labeled-switch-DuZQMhFh.js";import"./locked-figure-aria-CBstWXJ_.js";const H={title:"PerseusEditor/Components/Locked Point Settings",component:a},n=d=>u.jsx(a,{...d}),m={...w("point"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};n.args=m;const s={render:function(){const[o,t]=p.useState(m),e=r=>{t({...o,...r})};return u.jsx(a,{...o,onChangeProps:e})}};s.parameters={chromatic:{disableSnapshot:!0}};const c={render:function(){const[o,t]=p.useState(!0),[e,r]=p.useState(m),P=l=>{r({...e,...l})};return u.jsx(a,{...e,expanded:o,onToggle:t,onChangeProps:P})}},i={render:function(){const[o,t]=p.useState(!0),[e,r]=p.useState(m),P=l=>{r({...e,...l})};return u.jsx(a,{...e,expanded:o,onToggle:t,onChangeProps:P})}};n.__docgenInfo={description:"",methods:[],displayName:"Default"};var g,x,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedPointSettings {...args} />;
}`,...(S=(x=n.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var f,h,E;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(E=(h=s.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var R,C,U;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(U=(C=c.parameters)==null?void 0:C.docs)==null?void 0:U.source}}};var k,L,j;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedPointSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(j=(L=i.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};const J=["Default","Controlled","Expanded","ExpandedNondefaultProps"];export{s as Controlled,n as Default,c as Expanded,i as ExpandedNondefaultProps,J as __namedExportsOrder,H as default};
