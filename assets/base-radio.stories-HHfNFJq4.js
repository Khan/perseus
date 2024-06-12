import{j as c}from"./jsx-runtime-BGVbfQ2Z.js";import{a as z}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{B as n}from"./base-radio-86qzPG8X.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-awljIyHI.js";import"./index-dnMhQZ-1.js";import"./index-E09jvG0x.js";import"./index-default-4_ZsnO94.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";import"./perseus-api-BF68z3pH.js";import"./index-tvtfaFq4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./jquery-5v7aFUvu.js";import"./constants-I_nlPaPx.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./util-WvQWLN3r.js";import"./perseus-error-OpXxk17X.js";import"./dependencies-fnqF3NiV.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./choice-gorLtsnE.js";import"./index-VhM44oCk.js";import"./index-4c2J3ov1.js";import"./index-lUErx3pE.js";import"./index-qh_wob3p.js";import"./index-mohBxQl_.js";import"./index-kutQl4v0.js";import"./index-JT1-kTlx.js";import"./index-_15Y2y0p.js";import"./index-h47zdzUa.js";import"./index-3tBZ6RgE.js";import"./index-xE_wKg8s.js";import"./Popper-uHddJoXq.js";import"./icon-HbAIhp4d.js";import"./choice-icon-8EqwF5gf.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-AuJwhOz7.js";import"./focus-ring-SGFL5fpl.js";import"./option-status-atX5Qolq.js";import"./choice-none-above-mh0XQ1QB.js";import"./renderer-Yl1yS5F-.js";import"./index-J2t_5nK1.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-3DPxKfYm.js";import"./fixed-to-responsive-ybwlrogx.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./lint-4QkP-VXi.js";function o(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const Ge={title:"Perseus/Widgets/Radio/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1}},s={apiOptions:{},choices:[o({content:"Content 1"}),o({content:"Content 2"}),o({content:"Content 3",correct:!0}),o({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:z("changed"),isLastUsedWidget:!1},l=t=>{const e={...s,...t};return c(n,{...e})},u=t=>{const e={...s,multipleSelect:!1};return c(n,{...e})},p=t=>{const e={...s,multipleSelect:!0};return c(n,{...e})},m=t=>{const e={...s,multipleSelect:!0,numCorrect:2,countChoices:!0};return c(n,{...e})},h=t=>{const e=Array(4).fill(null).map((a,r)=>o({content:`Choice ${r+1}`}));e[1].checked=!0;const i={...s,multipleSelect:!1,choices:e};return c(n,{...i})},d=t=>{const e=Array(4).fill(null).map((a,r)=>o({content:`Choice ${r+1}`}));e[1].checked=!0,e[2].checked=!0;const i={...s,multipleSelect:!0,choices:e};return c(n,{...i})},g=t=>{const e=Array(4).fill(null).map((r,f)=>o({content:`Choice ${f+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const i=e.map(({correct:r})=>({content:"",correct:r})),a={...s,multipleSelect:!1,reviewModeRubric:{choices:i},choices:e};return c(n,{...a})},S=t=>{const e=Array(4).fill(null).map((r,f)=>o({content:`Choice ${f+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const i=e.map(r=>({content:"",correct:r.correct})),a={...s,multipleSelect:!0,numCorrect:2,reviewModeRubric:{choices:i},choices:e};return c(n,{...a})};var w,R,v;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    ...args
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(v=(R=l.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};var C,P,b;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: false
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(b=(P=u.parameters)==null?void 0:P.docs)==null?void 0:b.source}}};var y,A,k;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(k=(A=p.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};var M,B,_;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    countChoices: true
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(_=(B=m.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};var E,T,W;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const choices = Array(4).fill(null).map((_, i) => generateChoice({
    content: \`Choice \${i + 1}\`
  }));
  choices[1].checked = true;
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: false,
    choices
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(W=(T=h.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var $,N,I;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const choices = Array(4).fill(null).map((_, i) => generateChoice({
    content: \`Choice \${i + 1}\`
  }));
  choices[1].checked = true;
  choices[2].checked = true;
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true,
    choices
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(I=(N=d.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var O,K,x;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const choices = Array(4).fill(null).map((_, i) => {
    const choice = generateChoice({
      content: \`Choice \${i + 1}\`,
      rationale: "This is a neat rationale",
      hasRationale: true,
      showRationale: true,
      correct: false,
      showCorrectness: true
    });
    return choice;
  });
  choices[1].checked = true;
  choices[2].correct = true;
  const rubricChoices = choices.map(({
    correct
  }) => ({
    // note(matthew): reviewModeRubric.choices requires content,
    // but I don't see how it's getting used and TypeScript gets mad
    // when I use choice.content because it's not a string.
    // reviewModeRubric could probably use a look over.
    content: "",
    correct
  }));
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: false,
    reviewModeRubric: {
      choices: rubricChoices
    },
    choices
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(x=(K=g.parameters)==null?void 0:K.docs)==null?void 0:x.source}}};var L,j,q;S.parameters={...S.parameters,docs:{...(L=S.parameters)==null?void 0:L.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const choices = Array(4).fill(null).map((_, i) => {
    const choice = generateChoice({
      content: \`Choice \${i + 1}\`,
      rationale: "This is a neat rationale",
      hasRationale: true,
      showRationale: true,
      correct: false,
      showCorrectness: true
    });
    return choice;
  });
  choices[1].checked = true;
  choices[2].checked = true;
  choices[2].correct = true;
  choices[3].correct = true;
  const rubricChoices = choices.map(c => ({
    // note(matthew): reviewModeRubric.choices requires content,
    // but I don't see how it's getting used and TypeScript gets mad
    // when I use choice.content because it's not a string.
    // reviewModeRubric could probably use a look over.
    content: "",
    correct: c.correct
  }));
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    reviewModeRubric: {
      choices: rubricChoices
    },
    choices
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(q=(j=S.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};const He=["Interactive","SingleSelectWithNothingSelected","MultipleSelectWithNothingSelected","MultipleSelectWithCountChoicesLabel","SingleSelected","MultipleSelected","SingleKitchenSink","MultipleKitchenSink"];export{l as Interactive,S as MultipleKitchenSink,m as MultipleSelectWithCountChoicesLabel,p as MultipleSelectWithNothingSelected,d as MultipleSelected,g as SingleKitchenSink,u as SingleSelectWithNothingSelected,h as SingleSelected,He as __namedExportsOrder,Ge as default};
