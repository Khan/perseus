import{j as e}from"./jsx-runtime-BGVbfQ2Z.js";import{L as t}from"./lint-4QkP-VXi.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./index-E09jvG0x.js";import"./constants-I_nlPaPx.js";import"./inline-icon-MJBS_-2U.js";const P={title:"Perseus/Components/Lint"},n={children:e("div",{children:"This is the sample lint child"}),insideTable:!1,message:"Test message",ruleName:"Test rule"},a=({children:r})=>e("div",{style:{width:"250px",padding:"8px",margin:"20px",border:"solid 1px grey"},children:r}),s=r=>e(a,{children:e(t,{...n})}),i=r=>e(a,{children:e(t,{...n,severity:1})}),o=r=>e(a,{children:e(t,{...n,severity:2})}),c=r=>e(a,{children:e(t,{...n,severity:3})}),m=r=>e(a,{children:e(t,{...n,severity:4})}),d=r=>e(a,{children:e(t,{...n,inline:!0})});var l,u,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} />
        </Container>;
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var g,y,L;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={1} />
        </Container>;
}`,...(L=(y=i.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var S,v,C;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={2} />
        </Container>;
}`,...(C=(v=o.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var f,R,h;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={3} />
        </Container>;
}`,...(h=(R=c.parameters)==null?void 0:R.docs)==null?void 0:h.source}}};var O,A,b;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={4} />
        </Container>;
}`,...(b=(A=m.parameters)==null?void 0:A.docs)==null?void 0:b.source}}};var j,E,x;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} inline={true} />
        </Container>;
}`,...(x=(E=d.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};const k=["DefaultLintContainerAndMessage","LintSeverity1Error","LintSeverity2Warning","LintSeverity3Recommendation","LintSeverity4OfflineReportingOnly","InlineLintContainerAndMessage"];export{s as DefaultLintContainerAndMessage,d as InlineLintContainerAndMessage,i as LintSeverity1Error,o as LintSeverity2Warning,c as LintSeverity3Recommendation,m as LintSeverity4OfflineReportingOnly,k as __namedExportsOrder,P as default};
