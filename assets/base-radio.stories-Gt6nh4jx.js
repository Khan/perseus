import{j as n}from"./jsx-runtime-FVsy8kgq.js";import{a as z}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{B as i}from"./base-radio-KyuFl7Nr.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-awljIyHI.js";import"./index-dnMhQZ-1.js";import"./index-7vsPyIck.js";import"./index-default-4_ZsnO94.js";import"./i18n-context-W41LcU6B.js";import"./strings-4Ql_kQxk.js";import"./perseus-api-OW2_bRsL.js";import"./index-k-0mNqHS.js";import"./invariant-bu5zBsRS.js";import"./stub-tag-editor-jAebgctF.js";import"./text-list-editor-_UIkAa1J.js";import"./jquery-5v7aFUvu.js";import"./constants-I_nlPaPx.js";import"./media-queries-MaBBbpNq.js";import"./shared-3pf9YZIg.js";import"./util-d6C3c8a_.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./choice-Dq9nzPyo.js";import"./index-6h5t6F0w.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./index-o3wWn3Y5.js";import"./index-deFLJwr4.js";import"./index-h_CiYGGb.js";import"./index-ngddCaVG.js";import"./index-rfN0X25E.js";import"./index-xuPsLuPk.js";import"./index-2dmvOE3q.js";import"./index-qUyqkRvh.js";import"./index-BPSWBbj5.js";import"./index-YCTzZMik.js";import"./index-CkAxGj88.js";import"./Popper-kGnKOid7.js";import"./icon-YuYiVxsK.js";import"./choice-icon-tgwIPBbY.js";import"./inline-icon-tKY1iMkH.js";import"./icon-paths-AuJwhOz7.js";import"./focus-ring-sgSTt4fM.js";import"./option-status-GwxF4Pf4.js";import"./choice-none-above-2jLYBm7A.js";import"./renderer-9VzoBWaC.js";import"./index-J2t_5nK1.js";import"./asset-context-I7yIqWki.js";import"./svg-image-BeclIbdJ.js";import"./dependencies-8XILypbq.js";import"./fixed-to-responsive-1fSZ1n--.js";import"./client-rbWgHzHN.js";import"./image-loader-mgyZcN0j.js";import"./tex-VP4hirbI.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-MZi7Hqbp.js";import"./lint-I_5mQeXl.js";function o(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const Ve={title:"Perseus/Widgets/Radio/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1}},c={apiOptions:{},choices:[o({content:"Content 1"}),o({content:"Content 2"}),o({content:"Content 3",correct:!0}),o({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:z("changed"),isLastUsedWidget:!1},l=t=>{const e={...c,...t};return n(i,{...e})},p=t=>{const e={...c,multipleSelect:!1};return n(i,{...e})},u=t=>{const e={...c,multipleSelect:!0};return n(i,{...e})},d=t=>{const e={...c,multipleSelect:!0,numCorrect:2,countChoices:!0};return n(i,{...e})},m=t=>{const e=Array(4).fill(null).map((a,r)=>o({content:`Choice ${r+1}`}));e[1].checked=!0;const s={...c,multipleSelect:!1,choices:e};return n(i,{...s})},h=t=>{const e=Array(4).fill(null).map((a,r)=>o({content:`Choice ${r+1}`}));e[1].checked=!0,e[2].checked=!0;const s={...c,multipleSelect:!0,choices:e};return n(i,{...s})},S=t=>{const e=Array(4).fill(null).map((r,f)=>o({content:`Choice ${f+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const s=e.map(({correct:r})=>({content:"",correct:r})),a={...c,multipleSelect:!1,reviewModeRubric:{choices:s},choices:e};return n(i,{...a})},g=t=>{const e=Array(4).fill(null).map((r,f)=>o({content:`Choice ${f+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const s=e.map(r=>({content:"",correct:r.correct})),a={...c,multipleSelect:!0,numCorrect:2,reviewModeRubric:{choices:s},choices:e};return n(i,{...a})};l.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"SingleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithCountChoicesLabel",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"SingleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"MultipleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"SingleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};g.__docgenInfo={description:"",methods:[],displayName:"MultipleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};var b,y,C;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    ...args
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(C=(y=l.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var w,R,v;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: false
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(v=(R=p.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};var P,T,M;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(M=(T=u.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var _,q,k;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    countChoices: true
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(k=(q=d.parameters)==null?void 0:q.docs)==null?void 0:k.source}}};var A,N,I;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(I=(N=m.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var W,B,E;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(E=(B=h.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var $,K,O;S.parameters={...S.parameters,docs:{...($=S.parameters)==null?void 0:$.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(O=(K=S.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var L,x,j;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(j=(x=g.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};const Xe=["Interactive","SingleSelectWithNothingSelected","MultipleSelectWithNothingSelected","MultipleSelectWithCountChoicesLabel","SingleSelected","MultipleSelected","SingleKitchenSink","MultipleKitchenSink"];export{l as Interactive,g as MultipleKitchenSink,d as MultipleSelectWithCountChoicesLabel,u as MultipleSelectWithNothingSelected,h as MultipleSelected,S as SingleKitchenSink,p as SingleSelectWithNothingSelected,m as SingleSelected,Xe as __namedExportsOrder,Ve as default};
