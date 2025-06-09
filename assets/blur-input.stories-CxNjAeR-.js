import{r as u,j as l}from"./iframe-vtNTHGDv.js";import{B as c}from"./blur-input-21fFJ09r.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,d={title:"PerseusEditor/Components/Blur Input"},e=()=>{const[r,o]=u.useState("");return l.jsx(c,{value:r,onChange:t=>{p("onChange")(t),o(t)}})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var a,n,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`(): React.ReactElement => {
  const [value, setValue] = React.useState("");
  return <BlurInput value={value} onChange={newValue => {
    action("onChange")(newValue);
    setValue(newValue);
  }} />;
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,d as default};
