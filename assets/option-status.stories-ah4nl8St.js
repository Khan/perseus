import{j as e}from"./jsx-runtime-BT65X5dW.js";import{O as r}from"./option-status-D6Ad0RwN.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-BfjDPqC2.js";import"./no-important-DlFk8a1I.js";import"./i18n-context-bNNtSo4z.js";const k={title:"Perseus/Widgets/Radio/Option Status",args:{checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0}},t=o=>e.jsx(r,{...o}),s=o=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:["Checked Correct:",e.jsx(r,{checked:!0,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Checked Not Correct:",e.jsx(r,{checked:!0,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Correct:",e.jsx(r,{checked:!1,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Not Correct Previously Answered:",e.jsx(r,{checked:!1,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Not Correct Not Previously Answered:",e.jsx(r,{checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0})]}),e.jsx("hr",{})]});t.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"AllPossibleOutputs",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};var c,i,n;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <OptionStatus {...args} />;
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var d,u,a;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <>
            <div>
                Checked Correct:
                <OptionStatus checked={true} correct={true} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Checked Not Correct:
                <OptionStatus checked={true} correct={false} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Not Checked Correct:
                <OptionStatus checked={false} correct={true} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Not Checked Not Correct Previously Answered:
                <OptionStatus checked={false} correct={false} previouslyAnswered={true} reviewMode={true} />
            </div>
            <hr />
            <div>
                Not Checked Not Correct Not Previously Answered:
                <OptionStatus checked={false} correct={false} previouslyAnswered={false} reviewMode={true} />
            </div>
            <hr />
        </>;
}`,...(a=(u=s.parameters)==null?void 0:u.docs)==null?void 0:a.source}}};const f=["Interactive","AllPossibleOutputs"];export{s as AllPossibleOutputs,t as Interactive,f as __namedExportsOrder,k as default};
