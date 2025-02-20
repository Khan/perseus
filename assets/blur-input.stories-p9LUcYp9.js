import{a as l}from"./chunk-D5ZWXAHU-vR62DWf0.js";import{r as a}from"./index-6oxdNXpR.js";import{B as c}from"./blur-input-OAUAq3Aj.js";import"./v4-yQnnJER4.js";import"./_commonjsHelpers-4gQjN7DL.js";const g={title:"PerseusEditor/Components/Blur Input"},e=()=>{const[s,u]=a.useState("");return a.createElement(c,{value:s,onChange:t=>{l("onChange")(t),u(t)}})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,n,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(): React.ReactElement => {
  const [value, setValue] = React.useState("");
  return <BlurInput value={value} onChange={newValue => {
    action("onChange")(newValue);
    setValue(newValue);
  }} />;
}`,...(o=(n=e.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const h=["Default"];export{e as Default,h as __namedExportsOrder,g as default};
