import{j as o,br as n}from"./iframe-k7awQKLv.js";function r(t){return{...{checked:!1,crossedOut:!1,content:"",rationale:"",hasRationale:!1,showRationale:!1,showCorrectness:!1,correct:!1,isNoneOfTheAbove:!1,highlighted:!1,previouslyAnswered:!1,revealNoneOfTheAbove:!1,disabled:!1},...t}}const{action:U}=__STORYBOOK_MODULE_ACTIONS__,Y={title:"Widgets/Radio/Widget Internal Components/Base Radio",args:{multipleSelect:!1,editMode:!1,countChoices:!1},tags:["!dev"]},s={apiOptions:{},reviewMode:!1,choices:[r({content:"Content 1"}),r({content:"Content 2"}),r({content:"Content 3",correct:!0}),r({isNoneOfTheAbove:!0})],deselectEnabled:!1,editMode:!1,labelWrap:!1,countChoices:!1,numCorrect:1,multipleSelect:!1,onChange:U("changed"),isLastUsedWidget:!1},a=t=>{const e={...s,...t};return o.jsx(n,{...e})},l=t=>{const e={...s,multipleSelect:!1};return o.jsx(n,{...e})},u=t=>{const e={...s,multipleSelect:!0};return o.jsx(n,{...e})},p=t=>{const e={...s,multipleSelect:!0,numCorrect:2,countChoices:!0};return o.jsx(n,{...e})},d=t=>{const e=Array(4).fill(null).map((g,i)=>r({content:`Choice ${i+1}`}));e[1].checked=!0;const c={...s,multipleSelect:!1,choices:e};return o.jsx(n,{...c})},h=t=>{const e=Array(4).fill(null).map((g,i)=>r({content:`Choice ${i+1}`}));e[1].checked=!0,e[2].checked=!0;const c={...s,multipleSelect:!0,choices:e};return o.jsx(n,{...c})},m=t=>{const e=Array(4).fill(null).map((g,i)=>r({content:`Choice ${i+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].correct=!0;const c={...s,multipleSelect:!1,choices:e};return o.jsx(n,{...c})},S=t=>{const e=Array(4).fill(null).map((g,i)=>r({content:`Choice ${i+1}`,rationale:"This is a neat rationale",hasRationale:!0,showRationale:!0,correct:!1,showCorrectness:!0}));e[1].checked=!0,e[2].checked=!0,e[2].correct=!0,e[3].correct=!0;const c={...s,multipleSelect:!0,numCorrect:2,choices:e};return o.jsx(n,{...c})};a.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};l.__docgenInfo={description:"",methods:[],displayName:"SingleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};u.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithNothingSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};p.__docgenInfo={description:"",methods:[],displayName:"MultipleSelectWithCountChoicesLabel",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"SingleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"MultipleSelected",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};m.__docgenInfo={description:"",methods:[],displayName:"SingleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultipleKitchenSink",props:{multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},editMode:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"boolean"},description:""}}};var f,y,C;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(w=(b=l.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var v,P,T;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(T=(P=u.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var _,q,M;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const overwrittenProps = {
    ...defaultProps,
    multipleSelect: true,
    numCorrect: 2,
    countChoices: true
  } as const;
  return <BaseRadio {...overwrittenProps} />;
}`,...(M=(q=p.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var A,k,N;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(N=(k=d.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var I,W,x;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(x=(W=h.parameters)==null?void 0:W.docs)==null?void 0:x.source}}};var E,B,O;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(O=(B=m.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var j,$,K;S.parameters={...S.parameters,docs:{...(j=S.parameters)==null?void 0:j.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(K=($=S.parameters)==null?void 0:$.docs)==null?void 0:K.source}}};const z=["Interactive","SingleSelectWithNothingSelected","MultipleSelectWithNothingSelected","MultipleSelectWithCountChoicesLabel","SingleSelected","MultipleSelected","SingleKitchenSink","MultipleKitchenSink"];export{a as Interactive,S as MultipleKitchenSink,p as MultipleSelectWithCountChoicesLabel,u as MultipleSelectWithNothingSelected,h as MultipleSelected,m as SingleKitchenSink,l as SingleSelectWithNothingSelected,d as SingleSelected,z as __namedExportsOrder,Y as default};
