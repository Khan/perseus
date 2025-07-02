import{r as t,cR as f,j as C,cS as S}from"./iframe-D3VzT3LL.js";import{T as g}from"./toggleable-caret-CcWTVfgu.js";const b={title:"PerseusEditor/Components/Toggleable Caret",component:g};function e(){const[r,n]=t.useState(!1),E=t.useCallback(()=>{n(!r)},[n,r]);return f(E,500,{schedulePolicy:S.Immediately}),C.jsx(g,{isExpanded:r})}const s={args:{isExpanded:!0}},a={args:{isExpanded:!1}};e.__docgenInfo={description:"",methods:[],displayName:"Transitions"};var o,d,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`function Transitions() {
  const [expanded, setExpanded] = React.useState(false);
  const toggler = React.useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);
  useInterval(toggler, 500, {
    schedulePolicy: SchedulePolicy.Immediately
  });
  return <ToggleableCaret isExpanded={expanded} />;
}`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var l,p,i;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    isExpanded: true
  }
}`,...(i=(p=s.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var u,m,x;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    isExpanded: false
  }
}`,...(x=(m=a.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const h=["Transitions","Expanded","Collapsed"];export{a as Collapsed,s as Expanded,e as Transitions,h as __namedExportsOrder,b as default};
