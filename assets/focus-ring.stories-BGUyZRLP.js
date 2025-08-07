import{aV as a,j as s,aW as l}from"./iframe-DlDnf9-s.js";const u={title:"Widgets/Radio/Widget Internal Components/Focus Ring",args:{children:"",color:a,visible:!0,multipleSelect:!1},tags:["!dev"]},e=t=>{const i={height:"20px",width:"20px",background:t.color,borderRadius:t.multipleSelect?"3px":"50%"},c={...t,children:t.children||s.jsx("div",{style:i})};return s.jsx(l,{...c})};e.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!0,tsType:{name:"string"},description:""},visible:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""}}};var r,n,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // faux choice is just for demonstration
  const fauxChoiceStyles = {
    height: "20px",
    width: "20px",
    background: args.color,
    borderRadius: args.multipleSelect ? "3px" : "50%"
  } as const;
  const customArgs = {
    ...args,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    children: args.children || <div style={fauxChoiceStyles} />
  } as const;
  return <FocusRing {...customArgs} />;
}`,...(o=(n=e.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const p=["Interactive"];export{e as Interactive,p as __namedExportsOrder,u as default};
