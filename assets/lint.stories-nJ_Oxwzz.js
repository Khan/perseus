import{j as e}from"./jsx-runtime-FVsy8kgq.js";import{L as t}from"./lint-I_5mQeXl.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./index-7vsPyIck.js";import"./constants-I_nlPaPx.js";import"./inline-icon-tKY1iMkH.js";const P={title:"Perseus/Components/Lint"},n={children:e("div",{children:"This is the sample lint child"}),insideTable:!1,message:"Test message",ruleName:"Test rule"},a=({children:r})=>e("div",{style:{width:"250px",padding:"8px",margin:"20px",border:"solid 1px grey"},children:r}),i=r=>e(a,{children:e(t,{...n})}),s=r=>e(a,{children:e(t,{...n,severity:1})}),o=r=>e(a,{children:e(t,{...n,severity:2})}),c=r=>e(a,{children:e(t,{...n,severity:3})}),d=r=>e(a,{children:e(t,{...n,severity:4})}),m=r=>e(a,{children:e(t,{...n,inline:!0})});i.__docgenInfo={description:"",methods:[],displayName:"DefaultLintContainerAndMessage"};s.__docgenInfo={description:"",methods:[],displayName:"LintSeverity1Error"};o.__docgenInfo={description:"",methods:[],displayName:"LintSeverity2Warning"};c.__docgenInfo={description:"",methods:[],displayName:"LintSeverity3Recommendation"};d.__docgenInfo={description:"",methods:[],displayName:"LintSeverity4OfflineReportingOnly"};m.__docgenInfo={description:"",methods:[],displayName:"InlineLintContainerAndMessage"};var l,p,g;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} />
        </Container>;
}`,...(g=(p=i.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var u,y,L;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={1} />
        </Container>;
}`,...(L=(y=s.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var f,S,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={2} />
        </Container>;
}`,...(v=(S=o.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var C,h,R;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={3} />
        </Container>;
}`,...(R=(h=c.parameters)==null?void 0:h.docs)==null?void 0:R.source}}};var O,_,A;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} severity={4} />
        </Container>;
}`,...(A=(_=d.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var E,b,j;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} inline={true} />
        </Container>;
}`,...(j=(b=m.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const k=["DefaultLintContainerAndMessage","LintSeverity1Error","LintSeverity2Warning","LintSeverity3Recommendation","LintSeverity4OfflineReportingOnly","InlineLintContainerAndMessage"];export{i as DefaultLintContainerAndMessage,m as InlineLintContainerAndMessage,s as LintSeverity1Error,o as LintSeverity2Warning,c as LintSeverity3Recommendation,d as LintSeverity4OfflineReportingOnly,k as __namedExportsOrder,P as default};
