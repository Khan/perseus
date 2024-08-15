import{j as e}from"./jsx-runtime-5BUNAZ9W.js";import{L as t}from"./lint-nhuHdd9z.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-lUErx3pE.js";import"./index-z05-Lc8k.js";import"./index-jmm5gWkb.js";import"./index-e4P84RkC.js";import"./index-awljIyHI.js";import"./index-skotlSua.js";import"./index-T3HXbpha.js";import"./index-FsYHUvK_.js";import"./Popper-bdbcdpLA.js";import"./index-Cz55-Vre.js";import"./index-tvtfaFq4.js";import"./index-zE8cp1oq.js";import"./index-wjVcXLkf.js";import"./constants-CTNUT-ej.js";import"./inline-icon-QIU9thzn.js";const U={title:"Perseus/Components/Lint"},n={children:e("div",{children:"This is the sample lint child"}),insideTable:!1,message:"Test message",ruleName:"Test rule"},i=({children:r})=>e("div",{style:{width:"250px",padding:"8px",margin:"20px",border:"solid 1px grey"},children:r}),a=r=>e(i,{children:e(t,{...n})}),s=r=>e(i,{children:e(t,{...n,severity:1})}),o=r=>e(i,{children:e(t,{...n,severity:2})}),c=r=>e(i,{children:e(t,{...n,severity:3})}),d=r=>e(i,{children:e(t,{...n,severity:4})}),m=r=>e(i,{children:e(t,{...n,inline:!0})});a.__docgenInfo={description:"",methods:[],displayName:"DefaultLintContainerAndMessage"};s.__docgenInfo={description:"",methods:[],displayName:"LintSeverity1Error"};o.__docgenInfo={description:"",methods:[],displayName:"LintSeverity2Warning"};c.__docgenInfo={description:"",methods:[],displayName:"LintSeverity3Recommendation"};d.__docgenInfo={description:"",methods:[],displayName:"LintSeverity4OfflineReportingOnly"};m.__docgenInfo={description:"",methods:[],displayName:"InlineLintContainerAndMessage"};var p,l,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Container>
            <Lint {...defaultObject} />
        </Container>;
}`,...(g=(l=a.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var u,y,L;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(j=(b=m.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const V=["DefaultLintContainerAndMessage","LintSeverity1Error","LintSeverity2Warning","LintSeverity3Recommendation","LintSeverity4OfflineReportingOnly","InlineLintContainerAndMessage"];export{a as DefaultLintContainerAndMessage,m as InlineLintContainerAndMessage,s as LintSeverity1Error,o as LintSeverity2Warning,c as LintSeverity3Recommendation,d as LintSeverity4OfflineReportingOnly,V as __namedExportsOrder,U as default};
