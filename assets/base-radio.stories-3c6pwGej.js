import{a as j}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import{r as o}from"./index-C6mWTJJr.js";import{B as n}from"./base-radio-kaSH4GDV.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-BosuxZz1.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-2tCIH_GM.js";import"./no-important-DlFk8a1I.js";import"./index-D7h-teXI.js";import"./index-Xl5L4rvz.js";import"./i18n-context-glBZFVwC.js";import"./perseus-api-DmwU2RjF.js";import"./index-CrGd2QqM.js";import"./stub-tag-editor-B6BG5mUz.js";import"./text-list-editor-Rb8EP659.js";import"./jquery-CkHB0_Mt.js";import"./constants-BIpV3g0K.js";import"./media-queries-D4w_O5TS.js";import"./util-Cjm22Ttl.js";import"./perseus-error-UcbLzupY.js";import"./get-decimal-separator-B2cicA45.js";import"./choice-DPaYDYWU.js";import"./index-CYrfVekP.js";import"./index-CskvhqFA.js";import"./index-DN4d7MfU.js";import"./tiny-invariant-CopsF_GD.js";import"./index-C9RM_t1w.js";import"./index-CbNKSLRm.js";import"./index-CQ5XbMj6.js";import"./index-CfqIx-dS.js";import"./index-CIHqsnLr.js";import"./index-B-CZbs2J.js";import"./index-kzHyWCTU.js";import"./index-CjqMeO8x.js";import"./index-r7GwIklR.js";import"./index-3H81sEQ1.js";import"./Popper-Dy4DMz1_.js";import"./icon-90vA-eeT.js";import"./choice-icon-DbZ2pZ_o.js";import"./inline-icon-olZqfQoG.js";import"./icon-paths-C3bPmxpL.js";import"./focus-ring-UKCvrZUA.js";import"./option-status-9LBY7MsL.js";import"./choice-none-above-Dl9L-8RG.js";import"./renderer-Doy-sv_3.js";import"./index-BzwLglMS.js";import"./zoomable-tex-CQuDYaJy.js";import"./tex-CmmEazdv.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-BOJ0NYz6.js";import"./svg-image-fTqFFTIk.js";import"./fixed-to-responsive-CXYuKT1B.js";import"./client-CASytsYC.js";import"./image-loader-Clck2KCg.js";import"./lint-DBu4bfMa.js";function r(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const De={title:"Perseus/Widgets/Radio/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1}},i={apiOptions:{},reviewMode:!1,choices:[r({content:"Content 1"}),r({content:"Content 2"}),r({content:"Content 3",correct:!0}),r({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:j("changed"),isLastUsedWidget:!1},a=t=>{const e={...i,...t};return o.createElement(n,{...e})},l=t=>{const e={...i,multipleSelect:!1};return o.createElement(n,{...e})},p=t=>{const e={...i,multipleSelect:!0};return o.createElement(n,{...e})},u=t=>{const e={...i,multipleSelect:!0,numCorrect:2,countChoices:!0};return o.createElement(n,{...e})},d=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0;const s={...i,multipleSelect:!1,choices:e};return o.createElement(n,{...s})},m=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0,e[2].checked=!0;const s={...i,multipleSelect:!0,choices:e};return o.createElement(n,{...s})},h=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const s={...i,multipleSelect:!1,choices:e};return o.createElement(n,{...s})},S=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const s={...i,multipleSelect:!0,numCorrect:2,choices:e};return o.createElement(n,{...s})};a.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"SingleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithCountChoicesLabel",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"SingleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"MultipleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"SingleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultipleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};var f,y,C;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
