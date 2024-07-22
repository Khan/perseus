import{j as r,a as p,F as l}from"./jsx-runtime-5BUNAZ9W.js";import{a as C}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{C as t}from"./choice-1TFJEuT7.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./index-AFG5vh6r.js";import"./index-awljIyHI.js";import"./index-tvtfaFq4.js";import"./index-e4P84RkC.js";import"./index-lUErx3pE.js";import"./index-Nvrg7yVC.js";import"./index-zXbQRqKp.js";import"./index-88hrcj9K.js";import"./index-jmm5gWkb.js";import"./index-FsYHUvK_.js";import"./index-zE8cp1oq.js";import"./index-wjVcXLkf.js";import"./index-uYl2mQzu.js";import"./index-Kk6-WMea.js";import"./Popper-D86xJ3go.js";import"./index-dnMhQZ-1.js";import"./i18n-context-3gTlIcWM.js";import"./strings-YJ61eiUN.js";import"./icon-TA3bBVIW.js";import"./perseus-api-cFDIds9P.js";import"./stub-tag-editor-HTvc7FsQ.js";import"./text-list-editor-A-LpoxgU.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./media-queries-MaBBbpNq.js";import"./constants-I_nlPaPx.js";import"./choice-icon-cBSCcTMf.js";import"./inline-icon-QIU9thzn.js";import"./icon-paths-AuJwhOz7.js";import"./focus-ring-dCiEd0Hc.js";import"./option-status-o8Ma0JxL.js";const i={checked:!1,rationale:"This is a good rationale",content:"This is a possible choice",correct:!0,disabled:!1,pos:0,reviewMode:!1,showRationale:!1,showCorrectness:!1,multipleSelect:!1,crossedOut:!1,previouslyAnswered:!1,onChange:C("changed")},ue={title:"Perseus/Widgets/Radio/Choice",args:i},o=a=>r(t,{...a}),n=a=>{const e={...i,checked:!0,showCorrectness:!0},d={...e,correct:!0,content:"This choice is correct"},u={...e,correct:!1,content:"This choice is incorrect"};return p(l,{children:[r(t,{...d}),r(t,{...u})]})},s=a=>{const e={...i,showCorrectness:!0,reviewMode:!0,multipleSelect:!0};return p(l,{children:[r(t,{...e,correct:!0,checked:!0,content:"This choice was correct and checked"}),r(t,{...e,correct:!0,content:"This choice was also correct and not checked"}),r(t,{...e,correct:!1,checked:!0,content:"This choice was incorrect and checked"}),r(t,{...e,correct:!1,content:"This choice was also incorrect and not checked"})]})},c=a=>{const e={...i,checked:!0,showCorrectness:!0,showRationale:!0,reviewMode:!0},d={...e,correct:!0,content:"This choice is correct",rationale:"It was correct because of the way it is"},u={...e,correct:!1,content:"This choice is incorrect",rationale:"It was incorrect because of the way it is"};return p(l,{children:[r(t,{...d}),r(t,{...u})]})};o.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};n.__docgenInfo={description:"",methods:[],displayName:"Checked",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"ReviewMode",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"Rationale",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};var m,h,y;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <Choice {...args} />;
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var b,w,T;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = ({
    ...defaultProps,
    checked: true,
    showCorrectness: true
  } as const);
  const correctProps = ({
    ...sharedProps,
    correct: true,
    content: "This choice is correct"
  } as const);
  const incorrectProps = ({
    ...sharedProps,
    correct: false,
    content: "This choice is incorrect"
  } as const);
  return <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>;
}`,...(T=(w=n.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var q,R,g;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = ({
    ...defaultProps,
    showCorrectness: true,
    reviewMode: true,
    multipleSelect: true
  } as const);
  return <>
            <Choice {...sharedProps} correct={true} checked={true} content="This choice was correct and checked" />
            <Choice {...sharedProps} correct={true} content="This choice was also correct and not checked" />
            <Choice {...sharedProps} correct={false} checked={true} content="This choice was incorrect and checked" />
            <Choice {...sharedProps} correct={false} content="This choice was also incorrect and not checked" />
        </>;
}`,...(g=(R=s.parameters)==null?void 0:R.docs)==null?void 0:g.source}}};var k,f,v;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const sharedProps = ({
    ...defaultProps,
    checked: true,
    showCorrectness: true,
    showRationale: true,
    reviewMode: true
  } as const);
  const correctProps = ({
    ...sharedProps,
    correct: true,
    content: "This choice is correct",
    rationale: "It was correct because of the way it is"
  } as const);
  const incorrectProps = ({
    ...sharedProps,
    correct: false,
    content: "This choice is incorrect",
    rationale: "It was incorrect because of the way it is"
  } as const);
  return <>
            <Choice {...correctProps} />
            <Choice {...incorrectProps} />
        </>;
}`,...(v=(f=c.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const pe=["Interactive","Checked","ReviewMode","Rationale"];export{n as Checked,o as Interactive,c as Rationale,s as ReviewMode,pe as __namedExportsOrder,ue as default};
