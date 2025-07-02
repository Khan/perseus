import{j as c,r as s}from"./iframe-97DLHr7_.js";import{L as p}from"./locked-line-settings-Dx4OyHcp.js";import{g as h}from"./util-oMHdU0ja.js";import"./color-select-Bbj_MZWy.js";import"./Popper-BJ5IysKc.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-BL8qeOU5.js";import"./line-stroke-select-DXUk1FTN.js";import"./line-swatch-BTpkqxp7.js";import"./locked-figure-aria-D0_uxw2y.js";import"./item-version-B7NSTz3N.js";import"./article-renderer-BeLDF-1h.js";import"./server-item-renderer-D_pEvYK6.js";import"./hints-renderer-DipfMXxv.js";import"./components-Coe1cn55.js";import"./locked-label-settings-D7PRFWNd.js";import"./scrollless-number-text-field-DCqDld5i.js";import"./locked-point-settings-Ba2BIb4q.js";import"./labeled-switch-Bb-AHqfg.js";const $={title:"PerseusEditor/Components/Locked Line Settings",component:p},o=a=>c.jsx(p,{...a}),u={...h("line"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};o.args=u;const i={render:function(){const[e,t]=s.useState(u),n=r=>{t({...e,...r})};return c.jsx(p,{...e,onChangeProps:n})}};i.parameters={chromatic:{disableSnapshot:!0}};const d={render:function(){const[e,t]=s.useState(u),n=r=>{t({...e,...r})};return c.jsx(p,{...e,points:[h("point"),h("point")],expanded:!0,onChangeProps:n})}},l={render:function(){const[e,t]=s.useState(!0),[n,r]=s.useState(u),P=g=>{r({...n,...g})};return c.jsx(p,{...n,expanded:e,onToggle:t,onChangeProps:P})}},m={render:function(){const[e,t]=s.useState(!0),[n,r]=s.useState({...u,kind:"segment",color:"green",lineStyle:"dashed"}),P=g=>{r({...n,...g})};return c.jsx(p,{...n,expanded:e,onToggle:t,onChangeProps:P})}};o.__docgenInfo={description:"",methods:[],displayName:"Default"};var x,f,S;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedLineSettings {...args} />;
}`,...(S=(f=o.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var R,L,E;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} onChangeProps={handlePropsUpdate} />;
  }
}`,...(E=(L=i.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var C,U,k,w,y;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} points={[getDefaultFigureForType("point"), getDefaultFigureForType("point")]} expanded={true} onChangeProps={handlePropsUpdate} />;
  }
}`,...(k=(U=d.parameters)==null?void 0:U.docs)==null?void 0:k.source},description:{story:`If the two points defining the line are the same, the line is invalid
as that would give it a length of 0. An error message is displayed
in this case.`,...(y=(w=d.parameters)==null?void 0:w.docs)==null?void 0:y.description}}};var j,T,v;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState(defaultProps);
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(v=(T=l.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var D,F,_;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    const [expanded, setExpanded] = React.useState(true);
    const [props, setProps] = React.useState({
      ...defaultProps,
      kind: "segment" as const,
      color: "green" as const,
      lineStyle: "dashed" as const
    });
    const handlePropsUpdate = newProps => {
      setProps({
        ...props,
        ...newProps
      });
    };
    return <LockedLineSettings {...props} expanded={expanded} onToggle={setExpanded} onChangeProps={handlePropsUpdate} />;
  }
}`,...(_=(F=m.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};const ee=["Default","Controlled","WithInvalidPoints","Expanded","ExpandedNondefaultProps"];export{i as Controlled,o as Default,l as Expanded,m as ExpandedNondefaultProps,d as WithInvalidPoints,ee as __namedExportsOrder,$ as default};
