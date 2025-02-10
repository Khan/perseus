import{j as f}from"./jsx-runtime-63Ea5SlK.js";import{u as C,S}from"./index-OQMtW1Q1.js";import{r as o}from"./index-6oxdNXpR.js";import{T as g}from"./toggleable-caret-sFrMrSCU.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-7Z-R4z4z.js";import"./index-_3CKOwHy.js";import"./no-important-xCWWYXQR.js";const R={title:"PerseusEditor/Components/Toggleable Caret",component:g};function e(){const[r,t]=o.useState(!1),E=o.useCallback(()=>{t(!r)},[t,r]);return C(E,500,{schedulePolicy:S.Immediately}),f.jsx(g,{isExpanded:r})}const s={args:{isExpanded:!0}},a={args:{isExpanded:!1}};e.__docgenInfo={description:"",methods:[],displayName:"Transitions"};var n,d,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`function Transitions() {
  const [expanded, setExpanded] = React.useState(false);
  const toggler = React.useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);
  useInterval(toggler, 500, {
    schedulePolicy: SchedulePolicy.Immediately
  });
  return <ToggleableCaret isExpanded={expanded} />;
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var c,i,l;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isExpanded: true
  }
}`,...(l=(i=s.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var m,u,x;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    isExpanded: false
  }
}`,...(x=(u=a.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const k=["Transitions","Expanded","Collapsed"];export{a as Collapsed,s as Expanded,e as Transitions,k as __namedExportsOrder,R as default};
