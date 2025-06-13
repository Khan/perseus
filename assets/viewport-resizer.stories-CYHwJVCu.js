import{r as c,j as a}from"./iframe-ZFgYqQyF.js";import{V as n}from"./viewport-resizer-xxwuL6wo.js";import"./item-version-DlZtwoiJ.js";import"./article-renderer-JA5_WgFZ.js";import"./server-item-renderer-jYLlYdnt.js";import"./hints-renderer-CpFykfe9.js";import"./components-DUZEt7jG.js";import"./constants-kyOY0S4e.js";import"./icon-paths-BU5otBoc.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,S={component:n,title:"PerseusEditor/Components/Viewport Resizer"},e=()=>{const[p,s]=c.useState("phone");return a.jsx(n,{deviceType:p,onViewportSizeChanged:o=>{d("onViewportSizeChanged")(o),s(o)}})};e.__docgenInfo={description:"",methods:[],displayName:"Controlled"};var t,r,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  const [deviceType, setDeviceType] = React.useState<DeviceType>("phone");
  return <ViewportResizer deviceType={deviceType} onViewportSizeChanged={newDeviceType => {
    action("onViewportSizeChanged")(newDeviceType);
    setDeviceType(newDeviceType);
  }} />;
}`,...(i=(r=e.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const V=["Controlled"];export{e as Controlled,V as __namedExportsOrder,S as default};
