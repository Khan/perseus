import{j as e,a_ as r}from"./iframe-BI7ThRyc.js";const p={title:"Widgets/Radio/Widget Internal Components/Option Status",args:{checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0},tags:["!dev"]},t=o=>e.jsx(r,{...o}),s=o=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:["Checked Correct:",e.jsx(r,{checked:!0,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Checked Not Correct:",e.jsx(r,{checked:!0,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Correct:",e.jsx(r,{checked:!1,correct:!0,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Not Correct Previously Answered:",e.jsx(r,{checked:!1,correct:!1,previouslyAnswered:!0,reviewMode:!0})]}),e.jsx("hr",{}),e.jsxs("div",{children:["Not Checked Not Correct Not Previously Answered:",e.jsx(r,{checked:!1,correct:!1,previouslyAnswered:!1,reviewMode:!0})]}),e.jsx("hr",{})]});t.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"AllPossibleOutputs",props:{checked:{required:!0,tsType:{name:"boolean"},description:""},correct:{required:!0,tsType:{name:"boolean"},description:""},previouslyAnswered:{required:!0,tsType:{name:"boolean"},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""}}};var n,c,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <OptionStatus {...args} />;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var i,u,a;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(u=s.parameters)==null?void 0:u.docs)==null?void 0:a.source}}};const v=["Interactive","AllPossibleOutputs"];export{s as AllPossibleOutputs,t as Interactive,v as __namedExportsOrder,p as default};
