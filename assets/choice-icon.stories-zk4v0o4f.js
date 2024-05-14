import{j as e,a as o}from"./jsx-runtime-BGVbfQ2Z.js";import{r as g}from"./index-qhcEwEpg.js";import{C as r}from"./choice-icon-8EqwF5gf.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-lUErx3pE.js";import"./index-awljIyHI.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./constants-I_nlPaPx.js";import"./focus-ring-SGFL5fpl.js";const t={pos:0,checked:!1,crossedOut:!1,focused:!1,hovered:!1,pressed:!1,correct:!1,showCorrectness:!1,multipleSelect:!1,reviewMode:!1,previouslyAnswered:!1},ee={title:"Perseus/Widgets/Radio/Choice Icon",argTypes:{pos:{control:{type:"number",min:0,max:25,step:1}}},args:t},s=c=>e("div",{style:{padding:"10px"},children:c.children}),n=c=>e(s,{children:e(r,{...c})}),u=c=>o(s,{children:[e(r,{...t}),e(r,{...t,multipleSelect:!0})]}),l=c=>o(s,{children:[e(r,{...t,focused:!0}),e(r,{...t,focused:!0,multipleSelect:!0})]}),i=c=>o(s,{children:[e(r,{...t,checked:!0}),e(r,{...t,checked:!0,multipleSelect:!0})]}),d=c=>o(s,{children:[e(r,{...t,crossedOut:!0}),e(r,{...t,crossedOut:!0,multipleSelect:!0})]}),p=c=>o(s,{children:[e(r,{...t,checked:!0,correct:!0,showCorrectness:!0,reviewMode:!0}),e(r,{...t,checked:!0,correct:!0,showCorrectness:!0,reviewMode:!0,multipleSelect:!0})]}),m=c=>o(s,{children:[e(r,{...t,checked:!0,correct:!1,showCorrectness:!0,reviewMode:!0}),e(r,{...t,checked:!0,correct:!1,showCorrectness:!0,reviewMode:!0,multipleSelect:!0})]}),h=c=>{const f=Array(26).fill();return o(s,{children:[f.map((B,a)=>g.createElement(r,{...t,pos:a,key:"choice"+a})),e("br",{}),f.map((B,a)=>g.createElement(r,{...t,pos:a,multipleSelect:!0,key:"choice"+a}))]})};var P,C,S;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Panel>
            <ChoiceIcon {...args} />
        </Panel>;
}`,...(S=(C=n.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var I,k,w;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Panel>
            <ChoiceIcon {...defaultProps} />
            <ChoiceIcon {...defaultProps} multipleSelect={true} />
        </Panel>;
}`,...(w=(k=u.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var y,R,v;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Panel>
            <ChoiceIcon {...defaultProps} focused={true} />
            <ChoiceIcon {...defaultProps} focused={true} multipleSelect={true} />
        </Panel>;
}`,...(v=(R=l.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};var E,A,x;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Panel>
            <ChoiceIcon {...defaultProps} checked={true} />
            <ChoiceIcon {...defaultProps} checked={true} multipleSelect={true} />
        </Panel>;
}`,...(x=(A=i.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var M,O,_;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Panel>
            <ChoiceIcon {...defaultProps} crossedOut={true} />
            <ChoiceIcon {...defaultProps} crossedOut={true} multipleSelect={true} />
        </Panel>;
}`,...(_=(O=d.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var b,L,j;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Panel>
            <ChoiceIcon {...defaultProps} checked={true} correct={true} showCorrectness={true} reviewMode={true} />
            <ChoiceIcon {...defaultProps} checked={true} correct={true} showCorrectness={true} reviewMode={true} multipleSelect={true} />
        </Panel>;
}`,...(j=(L=p.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var F,D,T;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Panel>
            <ChoiceIcon {...defaultProps} checked={true} correct={false} showCorrectness={true} reviewMode={true} />
            <ChoiceIcon {...defaultProps} checked={true} correct={false} showCorrectness={true} reviewMode={true} multipleSelect={true} />
        </Panel>;
}`,...(T=(D=m.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var W,q,z;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // @ts-expect-error [FEI-5003] - TS2554 - Expected 1-3 arguments, but got 0.
  const allLetters = Array(26).fill();
  return <Panel>
            {allLetters.map((_, i: number) => <ChoiceIcon {...defaultProps} pos={i} key={"choice" + i} />)}
            <br />
            {allLetters.map((_, i: number) => <ChoiceIcon {...defaultProps} pos={i} multipleSelect={true} key={"choice" + i} />)}
        </Panel>;
}`,...(z=(q=h.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};const re=["Interactive","Default","Focused","Checked","CrossedOut","Correct","Incorrect","AllPositions"];export{h as AllPositions,i as Checked,p as Correct,d as CrossedOut,u as Default,l as Focused,m as Incorrect,n as Interactive,re as __namedExportsOrder,ee as default};
