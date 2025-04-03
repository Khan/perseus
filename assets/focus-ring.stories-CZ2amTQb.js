import{j as r}from"./jsx-runtime-BT65X5dW.js";import{k as a}from"./constants-BIpV3g0K.js";import{F as l}from"./focus-ring-CuRoZzyy.js";import"./index-C6mWTJJr.js";import"./_commonjsHelpers-BosuxZz1.js";import"./no-important-DlFk8a1I.js";const h={title:"Perseus/Widgets/Radio/Focus Ring",args:{children:"",color:a,visible:!0,multipleSelect:!1}},e=t=>{const n={height:"20px",width:"20px",background:t.color,borderRadius:t.multipleSelect?"3px":"50%"},c={...t,children:t.children||r.jsx("div",{style:n})};return r.jsx(l,{...c})};e.__docgenInfo={description:"",methods:[],displayName:"Interactive",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!0,tsType:{name:"string"},description:""},visible:{required:!0,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""}}};var s,o,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const R=["Interactive"];export{e as Interactive,R as __namedExportsOrder,h as default};
