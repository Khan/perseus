import{j as f}from"./jsx-runtime-BGVbfQ2Z.js";import{u as C,S}from"./index-JT1-kTlx.js";import{r as o}from"./index-qhcEwEpg.js";import{T as x}from"./toggleable-caret-1K5GCJBX.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-O-KD2pfb.js";import"./index-awljIyHI.js";import"./index-oMd7J_hd.js";const k={title:"PerseusEditor/Components/Toggleable Caret",component:x};function e(){const[r,t]=o.useState(!1),E=o.useCallback(()=>{t(!r)},[t,r]);return C(E,500,{schedulePolicy:S.Immediately}),f(x,{isExpanded:r})}const a={args:{isExpanded:!0}},s={args:{isExpanded:!1}};var n,d,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`function Transitions() {
  const [expanded, setExpanded] = React.useState(false);
  const toggler = React.useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);
  useInterval(toggler, 500, {
    schedulePolicy: SchedulePolicy.Immediately
  });
  return <ToggleableCaret isExpanded={expanded} />;
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var c,l,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isExpanded: true
  }
}`,...(i=(l=a.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var m,u,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    isExpanded: false
  }
}`,...(g=(u=s.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const v=["Transitions","Expanded","Collapsed"];export{s as Collapsed,a as Expanded,e as Transitions,v as __namedExportsOrder,k as default};
