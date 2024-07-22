import{j as o,a as h}from"./jsx-runtime-5BUNAZ9W.js";import{I as a}from"./info-tip-Xz6DLOQD.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-zE8cp1oq.js";import"./index-awljIyHI.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-Kk6-WMea.js";import"./index-jmm5gWkb.js";import"./index-88hrcj9K.js";import"./index-Nvrg7yVC.js";import"./index-FsYHUvK_.js";import"./index-AFG5vh6r.js";import"./index-tvtfaFq4.js";import"./index-wjVcXLkf.js";import"./Popper-D86xJ3go.js";const P={title:"Perseus/Components/Info Tip"},e=n=>o(a,{children:"Sample text"}),r=n=>h(a,{children:["Settings that you add here are available to the program as an object returned by ",o("code",{children:"Program.settings()"})]}),t=n=>h(a,{children:[o("p",{children:"First paragraph"}),o("p",{children:"Second paragraph"})]});e.__docgenInfo={description:"",methods:[],displayName:"TextOnMouseover"};r.__docgenInfo={description:"",methods:[],displayName:"CodeInText"};t.__docgenInfo={description:"",methods:[],displayName:"MultipleElements"};var s,p,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <InfoTip>Sample text</InfoTip>;
}`,...(i=(p=e.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var c,m,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return (
    // InfoTip is complaining about <code> not being a string
    // or React.ReactElement even though it should be valid.
    // @ts-expect-error - TS2769 - No overload matches this call.
    <InfoTip>
            Settings that you add here are available to the program as an object
            returned by <code>Program.settings()</code>
        </InfoTip>
  );
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var l,g,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <InfoTip>
            <p>First paragraph</p>
            <p>Second paragraph</p>
        </InfoTip>;
}`,...(u=(g=t.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const F=["TextOnMouseover","CodeInText","MultipleElements"];export{r as CodeInText,t as MultipleElements,e as TextOnMouseover,F as __namedExportsOrder,P as default};
