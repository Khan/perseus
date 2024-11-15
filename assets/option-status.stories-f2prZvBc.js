import{j as e,a as r,F as p}from"./jsx-runtime-FVsy8kgq.js";import{O as t}from"./option-status-xLBilE_v.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-Dfd6auV6.js";import"./index-awljIyHI.js";import"./i18n-context-H_mTdYuW.js";const k={title:"Perseus/Widgets/Radio/Option Status",args:{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0}},s=c=>e(t,{...c}),o=c=>r(p,{children:[r("div",{children:["Checked Correct:",e(t,{crossedOut:!1,checked:!0,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Checked Not Correct:",e(t,{crossedOut:!1,checked:!0,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Not Checked Correct:",e(t,{crossedOut:!1,checked:!1,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Not Checked Not Correct Previously Answered:",e(t,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Not Checked Not Correct Not Previously Answered:",e(t,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Crossed Out Correct:",e(t,{crossedOut:!0,checked:!1,correct:!0,previouslyAnswered:!1,reviewMode:!0})]})]});s.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{crossedOut:{required:!0,tsType:{name:"boolean"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};o.__docgenInfo={description:"",methods:[],displayName:"AllPossibleOutputs",props:{crossedOut:{required:!0,tsType:{name:"boolean"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};var d,i,n;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <OptionStatus {...args} />;
}`,...(n=(i=s.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var u,a,l;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(l=(a=o.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const A=["Interactive","AllPossibleOutputs"];export{o as AllPossibleOutputs,s as Interactive,A as __namedExportsOrder,k as default};
