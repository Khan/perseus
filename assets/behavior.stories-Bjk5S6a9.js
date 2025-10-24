import{r as a,j as c}from"./iframe-BwrJBPZi.js";import{S as p}from"./server-item-renderer-with-debug-ui-C55ToeEg.js";import{B as m}from"./behavior-Bprnwk5T.js";import"./server-item-renderer-8Nv_VSTZ.js";import"./hints-renderer-CTbwAQLh.js";import"./main-Z1nScRPj.js";import"./test-keypad-context-wrapper-OAoeOvSr.js";import"./Popper-CytwErb8.js";import"./global-colors-DSS4FaUr.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,S={title:"Widgets/Label Image/Widget Internal Components/Behavior",component:p,tags:["!dev"],parameters:{docs:{description:{component:"The behavior configuration for the Label Image widget."}}}},e=()=>{const[t,i]=a.useState({multipleAnswers:!1,hideChoicesFromInstructions:!1,preferredPopoverDirection:"NONE"});return c.jsx(m,{multipleAnswers:t.multipleAnswers,hideChoicesFromInstructions:t.hideChoicesFromInstructions,preferredPopoverDirection:t.preferredPopoverDirection,onChange:r=>{d("onChange")(r),i({...t,...r})}})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactNode => {
  const [state, setState] = React.useState({
    multipleAnswers: false,
    hideChoicesFromInstructions: false,
    preferredPopoverDirection: "NONE" as PreferredPopoverDirection
  });
  return <Behavior multipleAnswers={state.multipleAnswers} hideChoicesFromInstructions={state.hideChoicesFromInstructions} preferredPopoverDirection={state.preferredPopoverDirection} onChange={newState => {
    action("onChange")(newState);
    setState({
      ...state,
      ...newState
    });
  }} />;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,S as default};
