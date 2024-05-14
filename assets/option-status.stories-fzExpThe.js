import{j as e,a as r,F as v}from"./jsx-runtime-BGVbfQ2Z.js";import{O as t}from"./option-status-atX5Qolq.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-lUErx3pE.js";import"./index-awljIyHI.js";import"./i18n-context-9-s9cJ--.js";import"./strings-YJ61eiUN.js";const A={title:"Perseus/Widgets/Radio/Option Status",args:{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0}},s=c=>e(t,{...c}),o=c=>r(v,{children:[r("div",{children:["Checked Correct:",e(t,{crossedOut:!1,checked:!0,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Checked Not Correct:",e(t,{crossedOut:!1,checked:!0,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Not Checked Correct:",e(t,{crossedOut:!1,checked:!1,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Not Checked Not Correct Previously Answered:",e(t,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Not Checked Not Correct Not Previously Answered:",e(t,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0})]}),e("hr",{}),r("div",{children:["Crossed Out Correct:",e(t,{crossedOut:!0,checked:!1,correct:!0,previouslyAnswered:!1,reviewMode:!0})]})]});var d,u,i;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <OptionStatus {...args} />;
}`,...(i=(u=s.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var n,a,l;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(l=(a=o.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const y=["Interactive","AllPossibleOutputs"];export{o as AllPossibleOutputs,s as Interactive,y as __namedExportsOrder,A as default};
