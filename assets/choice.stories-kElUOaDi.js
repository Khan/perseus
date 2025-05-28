import{j as e}from"./jsx-runtime-BT65X5dW.js";import{a as f}from"./index-B-lxVbXh.js";import{C as t}from"./choice-sPmdcwyZ.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CtRu48qb.js";import"./index-BN1f3DJf.js";import"./no-important-DlFk8a1I.js";import"./index-B1Gws05u.js";import"./index-C0xJ1VDw.js";import"./index-BfjDPqC2.js";import"./index-D7h-teXI.js";import"./i18n-context-bNNtSo4z.js";import"./perseus-api-fTM3z0tF.js";import"./index-CrGd2QqM.js";import"./stub-tag-editor-CZXxAW63.js";import"./text-list-editor-C2gddtxS.js";import"./jquery-CkHB0_Mt.js";import"./index-default-BcKQpA1a.js";import"./media-queries-D4w_O5TS.js";import"./constants-BIpV3g0K.js";import"./choice-icon-DnZQOXWT.js";import"./inline-icon-AJRwMA4Z.js";import"./icon-paths-C3bPmxpL.js";import"./focus-ring-CuRoZzyy.js";import"./option-status-D6Ad0RwN.js";const i={checked:!1,rationale:"This is a good rationale",content:"This is a possible choice",correct:!0,disabled:!1,pos:0,reviewMode:!1,showRationale:!1,showCorrectness:!1,multipleSelect:!1,previouslyAnswered:!1,onChange:f("changed")},X={title:"Perseus/Widgets/Radio/Choice",args:i},o=a=>e.jsx(t,{...a}),n=a=>{const r={...i,checked:!0,showCorrectness:!0},d={...r,correct:!0,content:"This choice is correct"},p={...r,correct:!1,content:"This choice is incorrect"};return e.jsxs(e.Fragment,{children:[e.jsx(t,{...d}),e.jsx(t,{...p})]})},c=a=>{const r={...i,showCorrectness:!0,reviewMode:!0,multipleSelect:!0};return e.jsxs(e.Fragment,{children:[e.jsx(t,{...r,correct:!0,checked:!0,content:"This choice was correct and checked"}),e.jsx(t,{...r,correct:!0,content:"This choice was also correct and not checked"}),e.jsx(t,{...r,correct:!1,checked:!0,content:"This choice was incorrect and checked"}),e.jsx(t,{...r,correct:!1,content:"This choice was also incorrect and not checked"})]})},s=a=>{const r={...i,checked:!0,showCorrectness:!0,showRationale:!0,reviewMode:!0},d={...r,correct:!0,content:"This choice is correct",rationale:"It was correct because of the way it is"},p={...r,correct:!1,content:"This choice is incorrect",rationale:"It was incorrect because of the way it is"};return e.jsxs(e.Fragment,{children:[e.jsx(t,{...d}),e.jsx(t,{...p})]})};o.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};n.__docgenInfo={description:"",methods:[],displayName:"Checked",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"ReviewMode",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"Rationale",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};var u,l,m;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Choice {...args} />;
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var h,y,w;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = {
    ...defaultProps,
    checked: true,
    showCorrectness: true
  } as const;
  const correctProps = {
    ...sharedProps,
    correct: true,
    content: "This choice is correct"
  } as const;
  const incorrectProps = {
    ...sharedProps,
    correct: false,
    content: "This choice is incorrect"
  } as const;
  return <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>;
}`,...(w=(y=n.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var T,b,R;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = {
    ...defaultProps,
    showCorrectness: true,
    reviewMode: true,
    multipleSelect: true
  } as const;
  return <>
            <Choice {...sharedProps} correct={true} checked={true} content="This choice was correct and checked" />
            <Choice {...sharedProps} correct={true} content="This choice was also correct and not checked" />
            <Choice {...sharedProps} correct={false} checked={true} content="This choice was incorrect and checked" />
            <Choice {...sharedProps} correct={false} content="This choice was also incorrect and not checked" />
        </>;
}`,...(R=(b=c.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};var g,q,k;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = {
    ...defaultProps,
    checked: true,
    showCorrectness: true,
    showRationale: true,
    reviewMode: true
  } as const;
  const correctProps = {
    ...sharedProps,
    correct: true,
    content: "This choice is correct",
    rationale: "It was correct because of the way it is"
  } as const;
  const incorrectProps = {
    ...sharedProps,
    correct: false,
    content: "This choice is incorrect",
    rationale: "It was incorrect because of the way it is"
  } as const;
  return <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>;
}`,...(k=(q=s.parameters)==null?void 0:q.docs)==null?void 0:k.source}}};const Y=["Interactive","Checked","ReviewMode","Rationale"];export{n as Checked,o as Interactive,s as Rationale,c as ReviewMode,Y as __namedExportsOrder,X as default};
