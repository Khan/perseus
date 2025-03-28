import{a as f}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import{r as e}from"./index-C6mWTJJr.js";import{C as t}from"./choice-B9Bv3a_w.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DpD-xBMx.js";import"./index-CskvhqFA.js";import"./no-important-DlFk8a1I.js";import"./index-1LDQje0j.js";import"./tiny-invariant-CopsF_GD.js";import"./index-CC9jxhwQ.js";import"./index-CbNKSLRm.js";import"./index-BGfZpMKd.js";import"./index-L0QPXFmk.js";import"./index-CIHqsnLr.js";import"./index-D-mrA-Lm.js";import"./index-D3YmW7kw.js";import"./index-Xl5L4rvz.js";import"./index-DhnSWwsH.js";import"./index-WxhLWi3g.js";import"./index-3H81sEQ1.js";import"./Popper-Dy4DMz1_.js";import"./index-D7h-teXI.js";import"./i18n-context-glBZFVwC.js";import"./icon-90vA-eeT.js";import"./perseus-api-DmwU2RjF.js";import"./index-CrGd2QqM.js";import"./stub-tag-editor-B6BG5mUz.js";import"./text-list-editor-Rb8EP659.js";import"./jquery-CkHB0_Mt.js";import"./underscore-U-AHniOr.js";import"./media-queries-D4w_O5TS.js";import"./constants-BIpV3g0K.js";import"./choice-icon-BrRsPlMe.js";import"./inline-icon-olZqfQoG.js";import"./icon-paths-C3bPmxpL.js";import"./focus-ring-UKCvrZUA.js";import"./option-status-JW_Swo5-.js";const i={checked:!1,rationale:"This is a good rationale",content:"This is a possible choice",correct:!0,disabled:!1,pos:0,reviewMode:!1,showRationale:!1,showCorrectness:!1,multipleSelect:!1,crossedOut:!1,previouslyAnswered:!1,onChange:f("changed")},ie={title:"Perseus/Widgets/Radio/Choice",args:i},o=a=>e.createElement(t,{...a}),n=a=>{const r={...i,checked:!0,showCorrectness:!0},d={...r,correct:!0,content:"This choice is correct"},u={...r,correct:!1,content:"This choice is incorrect"};return e.createElement(e.Fragment,null,e.createElement(t,{...d}),e.createElement(t,{...u}))},c=a=>{const r={...i,showCorrectness:!0,reviewMode:!0,multipleSelect:!0};return e.createElement(e.Fragment,null,e.createElement(t,{...r,correct:!0,checked:!0,content:"This choice was correct and checked"}),e.createElement(t,{...r,correct:!0,content:"This choice was also correct and not checked"}),e.createElement(t,{...r,correct:!1,checked:!0,content:"This choice was incorrect and checked"}),e.createElement(t,{...r,correct:!1,content:"This choice was also incorrect and not checked"}))},s=a=>{const r={...i,checked:!0,showCorrectness:!0,showRationale:!0,reviewMode:!0},d={...r,correct:!0,content:"This choice is correct",rationale:"It was correct because of the way it is"},u={...r,correct:!1,content:"This choice is incorrect",rationale:"It was incorrect because of the way it is"};return e.createElement(e.Fragment,null,e.createElement(t,{...d}),e.createElement(t,{...u}))};o.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};n.__docgenInfo={description:"",methods:[],displayName:"Checked",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"ReviewMode",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"Rationale",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};var p,l,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Choice {...args} />;
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var h,y,b;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(b=(y=n.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,T,q;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(q=(T=c.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var R,g,k;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(k=(g=s.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};const de=["Interactive","Checked","ReviewMode","Rationale"];export{n as Checked,o as Interactive,s as Rationale,c as ReviewMode,de as __namedExportsOrder,ie as default};
