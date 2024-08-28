import{j as t}from"./jsx-runtime-FVsy8kgq.js";import{k as a}from"./constants-I_nlPaPx.js";import{F as d}from"./focus-ring-sgSTt4fM.js";import"./index-TT1qJ6UJ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";const x={title:"Perseus/Widgets/Radio/Focus Ring",args:{children:"",color:a,visible:!0,multipleSelect:!1}},e=r=>{const n={height:"20px",width:"20px",background:r.color,borderRadius:r.multipleSelect?"3px":"50%"},c={...r,children:r.children||t("div",{style:n})};return t(d,{...c})};e.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!0,tsType:{name:"string"},description:""},visible:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""}}};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  // faux choice is just for demonstration
  const fauxChoiceStyles = ({
    height: "20px",
    width: "20px",
    background: args.color,
    borderRadius: args.multipleSelect ? "3px" : "50%"
  } as const);
  const customArgs = ({
    ...args,
    children: args.children || <div style={fauxChoiceStyles} />
  } as const);
  return <FocusRing {...customArgs} />;
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const R=["Interactive"];export{e as Interactive,R as __namedExportsOrder,x as default};
