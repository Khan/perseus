import{j as o}from"./jsx-runtime-63Ea5SlK.js";import{a as U}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{B as n}from"./base-radio-J9duxrxM.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./index-awljIyHI.js";import"./index-dnMhQZ-1.js";import"./index-9gkyvru-.js";import"./jquery-yG1GhClm.js";import"./i18n-context-fsWEgybQ.js";import"./perseus-api-1-ethIrW.js";import"./index-0C4KXdeC.js";import"./invariant-bu5zBsRS.js";import"./stub-tag-editor-qMhJW4bS.js";import"./text-list-editor-aj1SAzcA.js";import"./constants-iPV6vHZm.js";import"./media-queries-gbofTbz-.js";import"./shared-4TdECMLk.js";import"./util-_iDv4tVD.js";import"./version-akiLXZts.js";import"./perseus-error-l3K_anoI.js";import"./choice-Xr-SKHrB.js";import"./index-0DbkllkJ.js";import"./react-router-dom-VIBHfbW6.js";import"./index-i1pBWAmI.js";import"./index-deFLJwr4.js";import"./index-18qWGOW7.js";import"./index-vITVWi7a.js";import"./index-f-3iKkZU.js";import"./index-469F30Ub.js";import"./index-CyYhwSUV.js";import"./index-nqMmpXbO.js";import"./index-zFNZn_u0.js";import"./index-jxhLXBHb.js";import"./index-7-BESUpx.js";import"./Popper-Y5KDXl-P.js";import"./index-Dfd6auV6.js";import"./icon-7RFbyLiL.js";import"./choice-icon-9x4jcq5T.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./focus-ring-qYEF-qqz.js";import"./option-status-8mB213vS.js";import"./choice-none-above-p-QcDZWl.js";import"./renderer-1bticOut.js";import"./index-J2t_5nK1.js";import"./asset-context-H6Iqp7Gi.js";import"./svg-image-DfnNwPGn.js";import"./dependencies-CP7Uh8Kq.js";import"./fixed-to-responsive-for_tVF1.js";import"./client-Rb4DelHy.js";import"./image-loader-17De8yEj.js";import"./tex-MX5FPdQh.js";import"./zoomable-_uYFBX1Q.js";import"./zoomable-tex-Jjwex-Ep.js";import"./lint-CRWxUAIQ.js";function r(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const Ge={title:"Perseus/Widgets/Radio/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1}},s={apiOptions:{},reviewMode:!1,choices:[r({content:"Content 1"}),r({content:"Content 2"}),r({content:"Content 3",correct:!0}),r({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:U("changed"),isLastUsedWidget:!1},a=t=>{const e={...s,...t};return o.jsx(n,{...e})},l=t=>{const e={...s,multipleSelect:!1};return o.jsx(n,{...e})},p=t=>{const e={...s,multipleSelect:!0};return o.jsx(n,{...e})},u=t=>{const e={...s,multipleSelect:!0,numCorrect:2,countChoices:!0};return o.jsx(n,{...e})},d=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0;const i={...s,multipleSelect:!1,choices:e};return o.jsx(n,{...i})},m=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`}));e[1].checked=!0,e[2].checked=!0;const i={...s,multipleSelect:!0,choices:e};return o.jsx(n,{...i})},h=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const i={...s,multipleSelect:!1,choices:e};return o.jsx(n,{...i})},S=t=>{const e=Array(4).fill(null).map((g,c)=>r({content:`Choice ${c+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const i={...s,multipleSelect:!0,numCorrect:2,choices:e};return o.jsx(n,{...i})};a.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"SingleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithCountChoicesLabel",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"SingleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"MultipleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"SingleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultipleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};var f,y,C;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(M=(q=u.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var A,k,N;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(N=(k=d.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var x,W,B;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(B=(W=m.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var E,I,j;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(j=(I=h.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var $,K,O;S.parameters={...S.parameters,docs:{...($=S.parameters)==null?void 0:$.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(O=(K=S.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};const He=["Interactive","SingleSelectWithNothingSelected","MultipleSelectWithNothingSelected","MultipleSelectWithCountChoicesLabel","SingleSelected","MultipleSelected","SingleKitchenSink","MultipleKitchenSink"];export{a as Interactive,S as MultipleKitchenSink,u as MultipleSelectWithCountChoicesLabel,p as MultipleSelectWithNothingSelected,m as MultipleSelected,h as SingleKitchenSink,l as SingleSelectWithNothingSelected,d as SingleSelected,He as __namedExportsOrder,Ge as default};
