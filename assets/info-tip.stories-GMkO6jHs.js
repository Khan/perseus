import{j as o,a as h}from"./jsx-runtime-BGVbfQ2Z.js";import{I as a}from"./info-tip-IhIrlX7t.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-_15Y2y0p.js";import"./index-awljIyHI.js";import"./index-4c2J3ov1.js";import"./index-25YgVP-A.js";import"./index-BDbMqVg2.js";import"./index-E09jvG0x.js";import"./index-PurVa-Tf.js";import"./index-Fg8WJp4t.js";import"./index-pb777vIT.js";import"./index-IxqgEL7X.js";import"./index-tvtfaFq4.js";import"./index-BrnICqZg.js";import"./Popper-2p8US95Y.js";const F={title:"Perseus/Components/Info Tip"},e=n=>o(a,{children:"Sample text"}),r=n=>h(a,{children:["Settings that you add here are available to the program as an object returned by ",o("code",{children:"Program.settings()"})]}),t=n=>h(a,{children:[o("p",{children:"First paragraph"}),o("p",{children:"Second paragraph"})]});var s,p,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(u=(g=t.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const N=["TextOnMouseover","CodeInText","MultipleElements"];export{r as CodeInText,t as MultipleElements,e as TextOnMouseover,N as __namedExportsOrder,F as default};
