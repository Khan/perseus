import{r as c,j as a}from"./iframe-UtCD2W5C.js";import{V as n}from"./viewport-resizer-qzG2980R.js";import"./item-version-BOeu8wCo.js";import"./article-renderer-JYZYc9Wg.js";import"./server-item-renderer-BpR8JcK3.js";import"./hints-renderer-D-7KbmbH.js";import"./components-B51QW2vZ.js";import"./constants-kyOY0S4e.js";import"./icon-paths-BU5otBoc.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,S={component:n,title:"PerseusEditor/Components/Viewport Resizer"},e=()=>{const[p,s]=c.useState("phone");return a.jsx(n,{deviceType:p,onViewportSizeChanged:o=>{d("onViewportSizeChanged")(o),s(o)}})};e.__docgenInfo={description:"",methods:[],displayName:"Controlled"};var t,r,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  const [deviceType, setDeviceType] = React.useState<DeviceType>("phone");
  return <ViewportResizer deviceType={deviceType} onViewportSizeChanged={newDeviceType => {
    action("onViewportSizeChanged")(newDeviceType);
    setDeviceType(newDeviceType);
  }} />;
}`,...(i=(r=e.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const V=["Controlled"];export{e as Controlled,V as __namedExportsOrder,S as default};
