import{j as t}from"./jsx-runtime-BGVbfQ2Z.js";import{k as a}from"./constants-I_nlPaPx.js";import{F as l}from"./focus-ring-4m7DGTUl.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";const x={title:"Perseus/Widgets/Radio/Focus Ring",args:{children:"",color:a,visible:!0,multipleSelect:!1}},r=e=>{const n={height:"20px",width:"20px",background:e.color,borderRadius:e.multipleSelect?"3px":"50%"},i={...e,children:e.children||t("div",{style:n})};return t(l,{...i})};var s,o,c;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(c=(o=r.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const f=["Interactive"];export{r as Interactive,f as __namedExportsOrder,x as default};
