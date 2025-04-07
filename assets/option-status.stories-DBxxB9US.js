import{j as e}from"./jsx-runtime-BT65X5dW.js";import{O as r}from"./option-status-gZhybWxb.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CjnMbH_2.js";import"./no-important-DlFk8a1I.js";import"./i18n-context-3AkWzTTj.js";const y={title:"Perseus/Widgets/Radio/Option Status",args:{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0}},s=o=>e.jsx(r,{...o}),t=o=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:["Checked Correct:",e.jsx(r,{crossedOut:!1,checked:!0,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Checked Not Correct:",e.jsx(r,{crossedOut:!1,checked:!0,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Correct:",e.jsx(r,{crossedOut:!1,checked:!1,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Not Correct Previously Answered:",e.jsx(r,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Not Correct Not Previously Answered:",e.jsx(r,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Crossed Out Correct:",e.jsx(r,{crossedOut:!0,checked:!1,correct:!0,previouslyAnswered:!1,reviewMode:!0})]})]});s.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{crossedOut:{required:!0,tsType:{name:"boolean"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};t.__docgenInfo={description:"",methods:[],displayName:"AllPossibleOutputs",props:{crossedOut:{required:!0,tsType:{name:"boolean"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};var c,d,i;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <OptionStatus {...args} />;
}`,...(i=(d=s.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var n,u,a;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <>
            <div>
                Checked Correct:
                <OptionStatus crossedOut={false} checked={true} correct={true} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Checked Not Correct:
                <OptionStatus crossedOut={false} checked={true} correct={false} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Not Checked Correct:
                <OptionStatus crossedOut={false} checked={false} correct={true} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Not Checked Not Correct Previously Answered:
                <OptionStatus crossedOut={false} checked={false} correct={false} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Not Checked Not Correct Not Previously Answered:
                <OptionStatus crossedOut={false} checked={false} correct={false} previouslyAnswered={false} reviewMode={true} />
            </div>
            <hr />
            <div>
                Crossed Out Correct:
                <OptionStatus crossedOut={true} checked={false} correct={true} previouslyAnswered={false} reviewMode={true} />
            </div>
        </>;
}`,...(a=(u=t.parameters)==null?void 0:u.docs)==null?void 0:a.source}}};const O=["Interactive","AllPossibleOutputs"];export{t as AllPossibleOutputs,s as Interactive,O as __namedExportsOrder,y as default};
