import{j as f}from"./jsx-runtime-FVsy8kgq.js";import{u as C,S}from"./index-CkAxGj88.js";import{r as t}from"./index-TT1qJ6UJ.js";import{T as x}from"./toggleable-caret-TlitN4zT.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-4_uZjoSD.js";import"./extends-wRoo2ExD.js";import"./index-awljIyHI.js";import"./index-FlmdAi7b.js";const v={title:"PerseusEditor/Components/Toggleable Caret",component:x};function e(){const[r,o]=t.useState(!1),E=t.useCallback(()=>{o(!r)},[o,r]);return C(E,500,{schedulePolicy:S.Immediately}),f(x,{isExpanded:r})}const a={args:{isExpanded:!0}},s={args:{isExpanded:!1}};e.__docgenInfo={description:"",methods:[],displayName:"Transitions"};var n,d,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`function Transitions() {
  const [expanded, setExpanded] = React.useState(false);
  const toggler = React.useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);
  useInterval(toggler, 500, {
    schedulePolicy: SchedulePolicy.Immediately
  });
  return <ToggleableCaret isExpanded={expanded} />;
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var c,i,l;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isExpanded: true
  }
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var m,u,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    isExpanded: false
  }
}`,...(g=(u=s.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const R=["Transitions","Expanded","Collapsed"];export{s as Collapsed,a as Expanded,e as Transitions,R as __namedExportsOrder,v as default};
