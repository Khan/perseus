import{j as u,r as p}from"./iframe-B7rrjhX-.js";import{L as a}from"./locked-point-settings-GmclWHrC.js";import{g as w}from"./util-DpBZvdzG.js";import"./plus-circle-DsgEZe2H.js";import"./locked-label-settings-BK3uwQNs.js";import"./item-version-C71bDQee.js";import"./article-renderer-CKpNj7Wm.js";import"./server-item-renderer-CzC3QTOf.js";import"./hints-renderer-B1JL43nH.js";import"./components-Dr_1lztj.js";import"./color-select-rH8ph09C.js";import"./Popper-BIyp_Cbc.js";import"./scrollless-number-text-field-DbOJ7h5p.js";import"./perseus-editor-accordion-CN6XVc66.js";import"./trash-bold-BLGUig5L.js";import"./labeled-switch-3rtrXmxF.js";import"./locked-figure-aria-BnZcOiY1.js";const J={title:"PerseusEditor/Components/Locked Point Settings",component:a},t=d=>u.jsx(a,{...d}),m={...w("point"),onChangeProps:()=>{},onMove:()=>{},onRemove:()=>{}};t.args=m;const s={render:function(){const[o,n]=p.useState(m),e=r=>{n({...o,...r})};return u.jsx(a,{...o,onChangeProps:e})}};s.parameters={chromatic:{disableSnapshot:!0}};const c={render:function(){const[o,n]=p.useState(!0),[e,r]=p.useState(m),P=l=>{r({...e,...l})};return u.jsx(a,{...e,expanded:o,onToggle:n,onChangeProps:P})}},i={render:function(){const[o,n]=p.useState(!0),[e,r]=p.useState(m),P=l=>{r({...e,...l})};return u.jsx(a,{...e,expanded:o,onToggle:n,onChangeProps:P})}};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var g,x,S;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`(args): React.ReactElement => {
  return <LockedPointSettings {...args} />;
}`,...(S=(x=t.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var f,h,E;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(j=(L=i.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};const K=["Default","Controlled","Expanded","ExpandedNondefaultProps"];export{s as Controlled,t as Default,c as Expanded,i as ExpandedNondefaultProps,K as __namedExportsOrder,J as default};
