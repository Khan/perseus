import{a as j}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{r as o}from"./index-6oxdNXpR.js";import{B as n}from"./base-radio-OV84uprd.js";import"./v4-yQnnJER4.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./no-important-xCWWYXQR.js";import"./index-dnMhQZ-1.js";import"./index-9gkyvru-.js";import"./underscore-885MUNGo.js";import"./i18n-context-G764lc9R.js";import"./perseus-api-Y55S7ZPk.js";import"./index-o42urCig.js";import"./stub-tag-editor--BF0WBUz.js";import"./text-list-editor-9dKImvgD.js";import"./jquery-5v7aFUvu.js";import"./constants-vGHYchdS.js";import"./media-queries-OayJ4KsJ.js";import"./util-pvSEraUQ.js";import"./random-util-wZstT-Qs.js";import"./perseus-error-l3K_anoI.js";import"./get-decimal-separator-C5N_K9o2.js";import"./choice-BsiDnWp1.js";import"./index-dLgOY9TT.js";import"./index-iTGWTR8W.js";import"./index-k8usAFZT.js";import"./tiny-invariant-bHgPayXn.js";import"./index-QHkT31Yt.js";import"./index-OUR0CuKj.js";import"./index-oeg-q71o.js";import"./index-DQI2fDhH.js";import"./index-xxLWRBZ2.js";import"./index-86cQASob.js";import"./index-Q2smMtUQ.js";import"./index-z5d8ny9G.js";import"./index-NdzxJoEP.js";import"./index-OQMtW1Q1.js";import"./Popper-Y5KDXl-P.js";import"./icon-H34hvC3Q.js";import"./choice-icon-BwiQ50pd.js";import"./inline-icon-8e4u-lSW.js";import"./icon-paths-5JCXzGsq.js";import"./focus-ring-bfQ0sQA2.js";import"./option-status-MvFdle4J.js";import"./choice-none-above-nLDkal13.js";import"./renderer-aVwTQQzh.js";import"./index-J2t_5nK1.js";import"./zoomable-tex-vrUOkV3E.js";import"./tex-q_4hQMGs.js";import"./dependencies-CP7Uh8Kq.js";import"./zoomable-m_J-BBOg.js";import"./svg-image-m8JdpBjX.js";import"./fixed-to-responsive-8Rm8IBlT.js";import"./client-Rb4DelHy.js";import"./image-loader-qCu_dXQl.js";import"./lint-a43UkMJQ.js";function r(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const De={title:"Perseus/Widgets/Radio/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1}},i={apiOptions:{},reviewMode:!1,choices:[r({content:"Content 1"}),r({content:"Content 2"}),r({content:"Content 3",correct:!0}),r({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:j("changed"),isLastUsedWidget:!1},a=t=>{const e={...i,...t};return o.createElement(n,{...e})},l=t=>{const e={...i,multipleSelect:!1};return o.createElement(n,{...e})},p=t=>{const e={...i,multipleSelect:!0};return o.createElement(n,{...e})},u=t=>{const e={...i,multipleSelect:!0,numCorrect:2,countChoices:!0};return o.createElement(n,{...e})},d=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0;const s={...i,multipleSelect:!1,choices:e};return o.createElement(n,{...s})},m=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0,e[2].checked=!0;const s={...i,multipleSelect:!0,choices:e};return o.createElement(n,{...s})},h=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const s={...i,multipleSelect:!1,choices:e};return o.createElement(n,{...s})},S=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const s={...i,multipleSelect:!0,numCorrect:2,choices:e};return o.createElement(n,{...s})};a.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"SingleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithCountChoicesLabel",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"SingleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"MultipleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"SingleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultipleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};var f,y,C;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    ...args
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(C=(y=a.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var R,b,w;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: false
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(w=(b=l.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var P,v,T;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(T=(v=p.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var _,q,M;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    countChoices: true
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(M=(q=u.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var A,k,E;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const choices = Array(4).fill(null).map((_, i) => generateChoice({
    content: \`Choice \${i + 1}\`
  }));
  choices[1].checked = true;
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: false,
    choices
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(E=(k=d.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var N,W,B;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const choices = Array(4).fill(null).map((_, i) => generateChoice({
    content: \`Choice \${i + 1}\`
  }));
  choices[1].checked = true;
  choices[2].checked = true;
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true,
    choices
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(B=(W=m.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var I,$,K;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: false,
    choices
  } as const;
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
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    choices
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(x=(L=S.parameters)==null?void 0:L.docs)==null?void 0:x.source}}};const Fe=["Interactive","SingleSelectWithNothingSelected","MultipleSelectWithNothingSelected","MultipleSelectWithCountChoicesLabel","SingleSelected","MultipleSelected","SingleKitchenSink","MultipleKitchenSink"];export{a as Interactive,S as MultipleKitchenSink,u as MultipleSelectWithCountChoicesLabel,p as MultipleSelectWithNothingSelected,m as MultipleSelected,h as SingleKitchenSink,l as SingleSelectWithNothingSelected,d as SingleSelected,Fe as __namedExportsOrder,De as default};
