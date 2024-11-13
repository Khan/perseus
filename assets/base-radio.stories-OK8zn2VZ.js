import{j as o}from"./jsx-runtime-FVsy8kgq.js";import{a as U}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{B as n}from"./base-radio-0TJgSoM5.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-awljIyHI.js";import"./index-dnMhQZ-1.js";import"./index-7vsPyIck.js";import"./jquery-yG1GhClm.js";import"./i18n-context-P5sgPFep.js";import"./perseus-api-Nq3s7IMx.js";import"./index-k-0mNqHS.js";import"./invariant-bu5zBsRS.js";import"./stub-tag-editor-74YQ4o9G.js";import"./text-list-editor-Jz35fIN1.js";import"./constants-iPV6vHZm.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./util-F8-MDmsT.js";import"./version-akiLXZts.js";import"./choice-I73s7vIV.js";import"./index-6h5t6F0w.js";import"./react-router-dom-W_e8xVUu.js";import"./index-tvtfaFq4.js";import"./index-o3wWn3Y5.js";import"./index-deFLJwr4.js";import"./index-h_CiYGGb.js";import"./index-ngddCaVG.js";import"./index-rfN0X25E.js";import"./index-xuPsLuPk.js";import"./index-WNT3sUKf.js";import"./index-qUyqkRvh.js";import"./index-BPSWBbj5.js";import"./index-YCTzZMik.js";import"./index-CkAxGj88.js";import"./Popper-kGnKOid7.js";import"./icon-R5gZamfG.js";import"./choice-icon-StuadxRF.js";import"./inline-icon-NjJlm7d0.js";import"./icon-paths-5JCXzGsq.js";import"./focus-ring-2b4ybtc7.js";import"./option-status-Yr5mIJZ4.js";import"./choice-none-above--sKwYbJK.js";import"./renderer-cceihh3N.js";import"./index-J2t_5nK1.js";import"./asset-context-I7yIqWki.js";import"./svg-image-4Vh9uTQ6.js";import"./dependencies-d8cZibFS.js";import"./fixed-to-responsive-AkRQxH3P.js";import"./client-rbWgHzHN.js";import"./image-loader-3HliPbpF.js";import"./tex-6yhnhbtf.js";import"./zoomable-CA1NzpZD.js";import"./zoomable-tex-hbM7rxrP.js";import"./lint-kpBgzQ8K.js";function r(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const Ge={title:"Perseus/Widgets/Radio/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1}},i={apiOptions:{},reviewMode:!1,choices:[r({content:"Content 1"}),r({content:"Content 2"}),r({content:"Content 3",correct:!0}),r({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:U("changed"),isLastUsedWidget:!1},a=t=>{const e={...i,...t};return o(n,{...e})},l=t=>{const e={...i,multipleSelect:!1};return o(n,{...e})},p=t=>{const e={...i,multipleSelect:!0};return o(n,{...e})},u=t=>{const e={...i,multipleSelect:!0,numCorrect:2,countChoices:!0};return o(n,{...e})},d=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0;const s={...i,multipleSelect:!1,choices:e};return o(n,{...s})},m=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0,e[2].checked=!0;const s={...i,multipleSelect:!0,choices:e};return o(n,{...s})},h=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const s={...i,multipleSelect:!1,choices:e};return o(n,{...s})},S=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const s={...i,multipleSelect:!0,numCorrect:2,choices:e};return o(n,{...s})};a.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"SingleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithCountChoicesLabel",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"SingleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"MultipleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"SingleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultipleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};var f,y,C;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    ...args
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(C=(y=a.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var R,b,w;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: false
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(w=(b=l.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var P,v,T;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(T=(v=p.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var _,q,M;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    countChoices: true
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(M=(q=u.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var A,k,N;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(N=(k=d.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var W,B,I;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(I=(B=m.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var E,$,K;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: false,
    choices
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(K=($=h.parameters)==null?void 0:$.docs)==null?void 0:K.source}}};var O,L,x;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
  const overwrittenProps = ({
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    choices
  } as const);
  return <BaseRadio {...overwrittenProps} />;
}`,...(x=(L=S.parameters)==null?void 0:L.docs)==null?void 0:x.source}}};const He=["Interactive","SingleSelectWithNothingSelected","MultipleSelectWithNothingSelected","MultipleSelectWithCountChoicesLabel","SingleSelected","MultipleSelected","SingleKitchenSink","MultipleKitchenSink"];export{a as Interactive,S as MultipleKitchenSink,u as MultipleSelectWithCountChoicesLabel,p as MultipleSelectWithNothingSelected,m as MultipleSelected,h as SingleKitchenSink,l as SingleSelectWithNothingSelected,d as SingleSelected,He as __namedExportsOrder,Ge as default};
