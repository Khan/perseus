import{j as r,a as d,F as m}from"./jsx-runtime-BGVbfQ2Z.js";import{a as y}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{C as o}from"./choice-unuhbNi1.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-TeOhC3cV.js";import"./index-awljIyHI.js";import"./index-tvtfaFq4.js";import"./index-oMd7J_hd.js";import"./index-lUErx3pE.js";import"./index-OY3Waz-e.js";import"./index-TymzEsVR.js";import"./index-DDXzYFOx.js";import"./index-E09jvG0x.js";import"./index-JT1-kTlx.js";import"./index-O-KD2pfb.js";import"./index-KIBY7gd7.js";import"./index-abFgrC9j.js";import"./index-1qqOuAdm.js";import"./Popper-uHddJoXq.js";import"./index-dnMhQZ-1.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./icon-HbAIhp4d.js";import"./perseus-api-BF68z3pH.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./media-queries-MaBBbpNq.js";import"./constants-I_nlPaPx.js";import"./choice-icon-8EqwF5gf.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";const i={checked:!1,rationale:"This is a good rationale",content:"This is a possible choice",correct:!0,disabled:!1,pos:0,reviewMode:!1,showRationale:!1,showCorrectness:!1,multipleSelect:!1,crossedOut:!1,previouslyAnswered:!1,onChange:y("changed")},pe={title:"Perseus/Widgets/Radio/Choice",args:i},t=c=>r(o,{...c}),s=c=>{const e={...i,checked:!0,showCorrectness:!0},h={...e,correct:!0,content:"This choice is correct"},p={...e,correct:!1,content:"This choice is incorrect"};return d(m,{children:[r(o,{...h}),r(o,{...p})]})},n=c=>{const e={...i,showCorrectness:!0,reviewMode:!0,multipleSelect:!0};return d(m,{children:[r(o,{...e,correct:!0,checked:!0,content:"This choice was correct and checked"}),r(o,{...e,correct:!0,content:"This choice was also correct and not checked"}),r(o,{...e,correct:!1,checked:!0,content:"This choice was incorrect and checked"}),r(o,{...e,correct:!1,content:"This choice was also incorrect and not checked"})]})},a=c=>{const e={...i,checked:!0,showCorrectness:!0,showRationale:!0,reviewMode:!0},h={...e,correct:!0,content:"This choice is correct",rationale:"It was correct because of the way it is"},p={...e,correct:!1,content:"This choice is incorrect",rationale:"It was incorrect because of the way it is"};return d(m,{children:[r(o,{...h}),r(o,{...p})]})};var u,l,w;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Choice {...args} />;
}`,...(w=(l=t.parameters)==null?void 0:l.docs)==null?void 0:w.source}}};var P,f,g;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = ({
    ...defaultProps,
    checked: true,
    showCorrectness: true
  } as const);
  const correctProps = ({
    ...sharedProps,
    correct: true,
    content: "This choice is correct"
  } as const);
  const incorrectProps = ({
    ...sharedProps,
    correct: false,
    content: "This choice is incorrect"
  } as const);
  return <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>;
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var C,k,T;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = ({
    ...defaultProps,
    showCorrectness: true,
    reviewMode: true,
    multipleSelect: true
  } as const);
  return <>
            <Choice {...sharedProps} correct={true} checked={true} content="This choice was correct and checked" />
            <Choice {...sharedProps} correct={true} content="This choice was also correct and not checked" />
            <Choice {...sharedProps} correct={false} checked={true} content="This choice was incorrect and checked" />
            <Choice {...sharedProps} correct={false} content="This choice was also incorrect and not checked" />
        </>;
}`,...(T=(k=n.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var R,S,v;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = ({
    ...defaultProps,
    checked: true,
    showCorrectness: true,
    showRationale: true,
    reviewMode: true
  } as const);
  const correctProps = ({
    ...sharedProps,
    correct: true,
    content: "This choice is correct",
    rationale: "It was correct because of the way it is"
  } as const);
  const incorrectProps = ({
    ...sharedProps,
    correct: false,
    content: "This choice is incorrect",
    rationale: "It was incorrect because of the way it is"
  } as const);
  return <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>;
}`,...(v=(S=a.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};const de=["Interactive","Checked","ReviewMode","Rationale"];export{s as Checked,t as Interactive,a as Rationale,n as ReviewMode,de as __namedExportsOrder,pe as default};
