import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{a as f}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{C as t}from"./choice-XoQfklAK.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./v4-yQnnJER4.js";import"./index-_CVl-B2F.js";import"./index-_3CKOwHy.js";import"./no-important-xCWWYXQR.js";import"./index-0pCajwWr.js";import"./index-QHkT31Yt.js";import"./index-4dAUYsag.js";import"./index-oE4Tpxqm.js";import"./index-ZdJtI3z8.js";import"./index-7Z-R4z4z.js";import"./index-o999uk82.js";import"./index-8_CLcrTy.js";import"./index-9gkyvru-.js";import"./index-rXO3OHs_.js";import"./index-wvJr82a4.js";import"./index-OQMtW1Q1.js";import"./Popper-Y5KDXl-P.js";import"./index-dnMhQZ-1.js";import"./i18n-context-GVCAGr7t.js";import"./icon-7RFbyLiL.js";import"./perseus-api-DO0X8arb.js";import"./index-IiwcBdIZ.js";import"./stub-tag-editor-3VEaZ-53.js";import"./text-list-editor-ND6Qift6.js";import"./jquery-5v7aFUvu.js";import"./index-default-4_ZsnO94.js";import"./media-queries-AtsgWQBm.js";import"./constants-qvNmarDy.js";import"./choice-icon-M7ulrC-T.js";import"./inline-icon-6fh0Wu1y.js";import"./icon-paths-5JCXzGsq.js";import"./focus-ring-NR0ydWyB.js";import"./option-status-OKcFildK.js";const i={checked:!1,rationale:"This is a good rationale",content:"This is a possible choice",correct:!0,disabled:!1,pos:0,reviewMode:!1,showRationale:!1,showCorrectness:!1,multipleSelect:!1,crossedOut:!1,previouslyAnswered:!1,onChange:f("changed")},ie={title:"Perseus/Widgets/Radio/Choice",args:i},o=a=>e.jsx(t,{...a}),n=a=>{const r={...i,checked:!0,showCorrectness:!0},d={...r,correct:!0,content:"This choice is correct"},u={...r,correct:!1,content:"This choice is incorrect"};return e.jsxs(e.Fragment,{children:[e.jsx(t,{...d}),e.jsx(t,{...u})]})},s=a=>{const r={...i,showCorrectness:!0,reviewMode:!0,multipleSelect:!0};return e.jsxs(e.Fragment,{children:[e.jsx(t,{...r,correct:!0,checked:!0,content:"This choice was correct and checked"}),e.jsx(t,{...r,correct:!0,content:"This choice was also correct and not checked"}),e.jsx(t,{...r,correct:!1,checked:!0,content:"This choice was incorrect and checked"}),e.jsx(t,{...r,correct:!1,content:"This choice was also incorrect and not checked"})]})},c=a=>{const r={...i,checked:!0,showCorrectness:!0,showRationale:!0,reviewMode:!0},d={...r,correct:!0,content:"This choice is correct",rationale:"It was correct because of the way it is"},u={...r,correct:!1,content:"This choice is incorrect",rationale:"It was incorrect because of the way it is"};return e.jsxs(e.Fragment,{children:[e.jsx(t,{...d}),e.jsx(t,{...u})]})};o.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};n.__docgenInfo={description:"",methods:[],displayName:"Checked",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"ReviewMode",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"Rationale",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},rationale:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},disabled:{required:!0,tsType:{name:"boolean"},description:""},pos:{required:!0,tsType:{name:"number"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},showRationale:{required:!0,tsType:{name:"boolean"},description:""},showCorrectness:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},crossedOut:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: {checked: boolean; crossedOut: boolean}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{checked: boolean; crossedOut: boolean}",signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""}}};var p,l,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(b=(y=n.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,T,q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(q=(T=s.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var R,g,k;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(k=(g=c.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};const de=["Interactive","Checked","ReviewMode","Rationale"];export{n as Checked,o as Interactive,c as Rationale,s as ReviewMode,de as __namedExportsOrder,ie as default};
