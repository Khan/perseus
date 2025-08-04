import{j as r,aS as c}from"./iframe-VfLzbn0l.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,d={title:"Widgets/Radio/Widget Internal Components/Choice None of the Above",args:{showContent:!1,content:"This is a possible choice"},tags:["!dev"]},l={checked:!1,rationale:"This is a good rational",correct:!0,disabled:!1,pos:0,reviewMode:!1,showRationale:!1,showCorrectness:!1,multipleSelect:!1,crossedOut:!1,previouslyAnswered:!1,apiOptions:{},onChange:i("changed")},e=a=>{const n={...l,...a};return r.jsx(c,{...n})};e.__docgenInfo={description:"",methods:[],displayName:"Example",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},showContent:{required:!1,tsType:{name:"boolean"},description:""}}};var o,s,t;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const combineProps = {
    ...ChoiceDefaults,
    ...args
  } as const;
  return <ChoiceNoneAbove {...combineProps} />;
}`,...(t=(s=e.parameters)==null?void 0:s.docs)==null?void 0:t.source}}};const m=["Example"];export{e as Example,m as __namedExportsOrder,d as default};
