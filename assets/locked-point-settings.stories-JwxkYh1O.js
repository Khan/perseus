import{j as i,r as p}from"./iframe-CiZ4rom4.js";import{L as a}from"./locked-point-settings-B0MdsZoC.js";import{g as w}from"./util-H5sE61uR.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-C_Cnfp2w.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import"./components-zJqkJmyj.js";import"./scrollless-number-text-field-D9uDYSfu.js";import"./trash-bold-CBNk1Rb_.js";import"./color-select-DEYIoEID.js";import"./labeled-switch-BwqH28ms.js";import"./locked-figure-aria-DsPtqjuL.js";const G={title:"PerseusEditor/Components/Locked Point Settings",component:a},n=d=>i.jsx(a,{...d}),P={...w("point"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};n.args=P;const s={render:function(){const[o,t]=p.useState(P),e=r=>{t({...o,...r})};return i.jsx(a,{...o,onChangeProps:e})}};s.parameters={chromatic:{disableSnapshot:!0}};const c={render:function(){const[o,t]=p.useState(!0),[e,r]=p.useState(P),m=l=>{r({...e,...l})};return i.jsx(a,{...e,expanded:o,onToggle:t,onChangeProps:m})}},u={render:function(){const[o,t]=p.useState(!0),[e,r]=p.useState(P),m=l=>{r({...e,...l})};return i.jsx(a,{...e,expanded:o,onToggle:t,onChangeProps:m})}};n.__docgenInfo={description:"",methods:[],displayName:"Default"};var g,x,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`(args): React.ReactElement => {
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
}`,...(U=(C=c.parameters)==null?void 0:C.docs)==null?void 0:U.source}}};var k,L,j;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(j=(L=u.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};const H=["Default","Controlled","Expanded","ExpandedNondefaultProps"];export{s as Controlled,n as Default,c as Expanded,u as ExpandedNondefaultProps,H as __namedExportsOrder,G as default};
