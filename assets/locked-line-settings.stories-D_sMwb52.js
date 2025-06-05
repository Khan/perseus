import{j as c,r as s}from"./iframe-Df1l_qdN.js";import{L as p}from"./locked-line-settings-D0Eqs_9B.js";import{g as h}from"./util-v0xq8fOo.js";import"./color-select-Do5_PlVz.js";import"./Popper-D68LALif.js";import"./plus-circle-DsgEZe2H.js";import"./trash-bold-DWZJ7XkV.js";import"./line-stroke-select-Dh5WI0RA.js";import"./line-swatch-C9mImIo-.js";import"./locked-figure-aria-Epm04XIR.js";import"./item-version-n2dIChhg.js";import"./article-renderer-DUFs70BB.js";import"./server-item-renderer-a7Aw--JL.js";import"./hints-renderer-D3j6BERN.js";import"./components-BXvGFzmc.js";import"./locked-label-settings-BnIatLc3.js";import"./scrollless-number-text-field-C2i4TLpi.js";import"./locked-point-settings-COSR2AfL.js";import"./labeled-switch-CmHlPrYt.js";const $={title:"PerseusEditor/Components/Locked Line Settings",component:p},o=a=>c.jsx(p,{...a}),u={...h("line"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};o.args=u;const i={render:function(){const[e,t]=s.useState(u),n=r=>{t({...e,...r})};return c.jsx(p,{...e,onChangeProps:n})}};i.parameters={chromatic:{disableSnapshot:!0}};const d={render:function(){const[e,t]=s.useState(u),n=r=>{t({...e,...r})};return c.jsx(p,{...e,points:[h("point"),h("point")],expanded:!0,onChangeProps:n})}},l={render:function(){const[e,t]=s.useState(!0),[n,r]=s.useState(u),P=g=>{r({...n,...g})};return c.jsx(p,{...n,expanded:e,onToggle:t,onChangeProps:P})}},m={render:function(){const[e,t]=s.useState(!0),[n,r]=s.useState({...u,kind:"segment",color:"green",lineStyle:"dashed"}),P=g=>{r({...n,...g})};return c.jsx(p,{...n,expanded:e,onToggle:t,onChangeProps:P})}};o.__docgenInfo={description:"",methods:[],displayName:"Default"};var x,f,S;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`(args): React.ReactElement => {
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
