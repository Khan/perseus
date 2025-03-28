import{u as f,S as C}from"./index-3H81sEQ1.js";import{r as t}from"./index-C6mWTJJr.js";import{T as x}from"./toggleable-caret-BkIpktLr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CIHqsnLr.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";const _={title:"PerseusEditor/Components/Toggleable Caret",component:x};function e(){const[r,o]=t.useState(!1),E=t.useCallback(()=>{o(!r)},[o,r]);return f(E,500,{schedulePolicy:C.Immediately}),t.createElement(x,{isExpanded:r})}const a={args:{isExpanded:!0}},s={args:{isExpanded:!1}};e.__docgenInfo={description:"",methods:[],displayName:"Transitions"};var n,d,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`function Transitions() {
  const [expanded, setExpanded] = React.useState(false);
  const toggler = React.useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);
  useInterval(toggler, 500, {
    schedulePolicy: SchedulePolicy.Immediately
  });
  return <ToggleableCaret isExpanded={expanded} />;
}`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,l,i;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    isExpanded: true
  }
}`,...(i=(l=a.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var m,u,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    isExpanded: false
  }
}`,...(g=(u=s.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const k=["Transitions","Expanded","Collapsed"];export{s as Collapsed,a as Expanded,e as Transitions,k as __namedExportsOrder,_ as default};
