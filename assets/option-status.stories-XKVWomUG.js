import{r as e}from"./index-6oxdNXpR.js";import{O as r}from"./option-status-MdgQPRmj.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-QHkT31Yt.js";import"./no-important-xCWWYXQR.js";import"./i18n-context-g2lQsEMW.js";const w={title:"Perseus/Widgets/Radio/Option Status",args:{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0}},t=o=>e.createElement(r,{...o}),s=o=>e.createElement(e.Fragment,null,e.createElement("div",null,"Checked Correct:",e.createElement(r,{crossedOut:!1,checked:!0,correct:!0,previouslyAnswered:!0,reviewMode:!0})),e.createElement("hr",null),e.createElement("div",null,"Checked Not Correct:",e.createElement(r,{crossedOut:!1,checked:!0,correct:!1,previouslyAnswered:!0,reviewMode:!0})),e.createElement("hr",null),e.createElement("div",null,"Not Checked Correct:",e.createElement(r,{crossedOut:!1,checked:!1,correct:!0,previouslyAnswered:!0,reviewMode:!0})),e.createElement("hr",null),e.createElement("div",null,"Not Checked Not Correct Previously Answered:",e.createElement(r,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!0,reviewMode:!0})),e.createElement("hr",null),e.createElement("div",null,"Not Checked Not Correct Not Previously Answered:",e.createElement(r,{crossedOut:!1,checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0})),e.createElement("hr",null),e.createElement("div",null,"Crossed Out Correct:",e.createElement(r,{crossedOut:!0,checked:!1,correct:!0,previouslyAnswered:!1,reviewMode:!0})));t.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{crossedOut:{required:!0,tsType:{name:"boolean"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"AllPossibleOutputs",props:{crossedOut:{required:!0,tsType:{name:"boolean"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};var c,n,d;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <OptionStatus {...args} />;
}`,...(d=(n=t.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var u,a,l;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(l=(a=s.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const y=["Interactive","AllPossibleOutputs"];export{s as AllPossibleOutputs,t as Interactive,y as __namedExportsOrder,w as default};
