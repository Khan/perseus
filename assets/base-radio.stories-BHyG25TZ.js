import{j as o}from"./jsx-runtime-BT65X5dW.js";import{a as K}from"./index-B-lxVbXh.js";import{B as n}from"./base-radio-Bs1bZn8h.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CtRu48qb.js";import"./underscore-U-AHniOr.js";import"./index-BGZPTKJ1.js";import"./util-BZVT15oW.js";import"./perseus-error-CSETqePQ.js";import"./jquery-CkHB0_Mt.js";import"./get-decimal-separator-B2cicA45.js";import"./no-important-DlFk8a1I.js";import"./index-D7h-teXI.js";import"./index-B1Gws05u.js";import"./i18n-context-3AkWzTTj.js";import"./perseus-api-Ty_QvlNi.js";import"./index-CrGd2QqM.js";import"./stub-tag-editor-B8lH250S.js";import"./text-list-editor-HcP7oGoC.js";import"./constants-BIpV3g0K.js";import"./media-queries-D4w_O5TS.js";import"./choice-Bj0k_uqp.js";import"./index-DIAPPyDo.js";import"./extends-DDykod_l.js";import"./index-CazpBUXm.js";import"./index-CW2s7ekB.js";import"./index-Ds5N5m2R.js";import"./index-CFvGmn7i.js";import"./index-DEiJo70o.js";import"./index-DAJiRA_A.js";import"./index-Bdux6mmb.js";import"./index-CUPgSPQO.js";import"./index-BXjKE-B5.js";import"./index-qaYZOyAC.js";import"./index-ZfDK3AP8.js";import"./index-3H81sEQ1.js";import"./Popper-Bj3TCzZA.js";import"./icon-BfyZ3piz.js";import"./choice-icon-CV0CEgs0.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-CqSyvrjW.js";import"./choice-none-above-DIm4SgKb.js";import"./renderer-BQnqw_bS.js";import"./index-BzwLglMS.js";import"./zoomable-tex-Dy-nElJT.js";import"./tex-BONImhZG.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-C_CCSKDG.js";import"./svg-image-CiYXMMWe.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./client-CAS5PaPY.js";import"./image-loader-CdkY-jNs.js";import"./lint-D0FI20JF.js";function r(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const Fe={title:"Perseus/Widgets/Radio/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1}},i={apiOptions:{},reviewMode:!1,choices:[r({content:"Content 1"}),r({content:"Content 2"}),r({content:"Content 3",correct:!0}),r({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:K("changed"),isLastUsedWidget:!1},c=t=>{const e={...i,...t};return o.jsx(n,{...e})},l=t=>{const e={...i,multipleSelect:!1};return o.jsx(n,{...e})},p=t=>{const e={...i,multipleSelect:!0};return o.jsx(n,{...e})},u=t=>{const e={...i,multipleSelect:!0,numCorrect:2,countChoices:!0};return o.jsx(n,{...e})},m=t=>{const e=Array(4).fill(null).map((f,a)=>r({content:`Choice ${a+1}`}));e[1].checked=!0;const s={...i,multipleSelect:!1,choices:e};return o.jsx(n,{...s})},d=t=>{const e=Array(4).fill(null).map((f,a)=>r({content:`Choice ${a+1}`}));e[1].checked=!0,e[2].checked=!0;const s={...i,multipleSelect:!0,choices:e};return o.jsx(n,{...s})},h=t=>{const e=Array(4).fill(null).map((f,a)=>r({content:`Choice ${a+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const s={...i,multipleSelect:!1,choices:e};return o.jsx(n,{...s})},S=t=>{const e=Array(4).fill(null).map((f,a)=>r({content:`Choice ${a+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const s={...i,multipleSelect:!0,numCorrect:2,choices:e};return o.jsx(n,{...s})};c.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"SingleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithCountChoicesLabel",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"SingleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"MultipleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"SingleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultipleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};var g,b,R;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    ...args
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(R=(b=c.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};var y,v,C;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: false
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(C=(v=l.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var T,w,M;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(M=(w=p.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};var P,O,_;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    countChoices: true
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(_=(O=u.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var x,q,E;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  const choices = Array(4).fill(null).map((_, i) => generateChoice({
    content: \`Choice \${i + 1}\`
  }));
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[1].checked = true;
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: false,
    choices
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(E=(q=m.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var A,k,L;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  const choices = Array(4).fill(null).map((_, i) => generateChoice({
    content: \`Choice \${i + 1}\`
  }));
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[1].checked = true;
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[2].checked = true;
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true,
    choices
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(L=(k=d.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var N,D,W;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
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
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[1].checked = true;
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[2].correct = true;
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: false,
    choices
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(W=(D=h.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var B,I,j;S.parameters={...S.parameters,docs:{...(B=S.parameters)==null?void 0:B.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
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
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[1].checked = true;
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[2].checked = true;
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[2].correct = true;
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line functional/immutable-data
  choices[3].correct = true;
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    choices
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(j=(I=S.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};const Ge=["Interactive","SingleSelectWithNothingSelected","MultipleSelectWithNothingSelected","MultipleSelectWithCountChoicesLabel","SingleSelected","MultipleSelected","SingleKitchenSink","MultipleKitchenSink"];export{c as Interactive,S as MultipleKitchenSink,u as MultipleSelectWithCountChoicesLabel,p as MultipleSelectWithNothingSelected,d as MultipleSelected,h as SingleKitchenSink,l as SingleSelectWithNothingSelected,m as SingleSelected,Ge as __namedExportsOrder,Fe as default};
