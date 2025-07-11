import{r as c,j as m}from"./iframe-Cm8NUS_Y.js";import{B as p}from"./behavior-DSc40aYk.js";import"./item-version-D5C1uYsd.js";import"./article-renderer-B5DIoItv.js";import"./server-item-renderer-CT3U3M3v.js";import"./hints-renderer-pQxN6z_3.js";import"./global-colors-BJx09mFA.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,I={title:"PerseusEditor/Widgets/Label Image/Behavior"},e=u=>{const[t,a]=c.useState({multipleAnswers:!1,hideChoicesFromInstructions:!1}),i={multipleAnswers:t.multipleAnswers,hideChoicesFromInstructions:t.hideChoicesFromInstructions,onChange:s=>{l("onChange")(s),a({...t,...s})}};return m.jsx(p,{...i})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var o,r,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const [state, setState] = React.useState({
    multipleAnswers: false,
    hideChoicesFromInstructions: false
  });
  const props = {
    multipleAnswers: state.multipleAnswers,
    hideChoicesFromInstructions: state.hideChoicesFromInstructions,
    onChange: newState => {
      action("onChange")(newState);
      setState({
        ...state,
        ...newState
      });
    }
  } as const;
  return <Behavior {...props} />;
}`,...(n=(r=e.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const w=["Default"];export{e as Default,w as __namedExportsOrder,I as default};
