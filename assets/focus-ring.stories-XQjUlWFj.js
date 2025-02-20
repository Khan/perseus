import{r as t}from"./index-6oxdNXpR.js";import{k as a}from"./constants-vGHYchdS.js";import{F as d}from"./focus-ring-bfQ0sQA2.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./no-important-xCWWYXQR.js";const h={title:"Perseus/Widgets/Radio/Focus Ring",args:{children:"",color:a,visible:!0,multipleSelect:!1}},e=r=>{const c={height:"20px",width:"20px",background:r.color,borderRadius:r.multipleSelect?"3px":"50%"},n={...r,children:r.children||t.createElement("div",{style:c})};return t.createElement(d,{...n})};e.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!0,tsType:{name:"string"},description:""},visible:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""}}};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // faux choice is just for demonstration
  const fauxChoiceStyles = {
    height: "20px",
    width: "20px",
    background: args.color,
    borderRadius: args.multipleSelect ? "3px" : "50%"
  } as const;
  const customArgs = {
    ...args,
    children: args.children || <div style={fauxChoiceStyles} />
  } as const;
  return <FocusRing {...customArgs} />;
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const x=["Interactive"];export{e as Interactive,x as __namedExportsOrder,h as default};
