import{j as e,n,r as f}from"./iframe-pO6GGAuj.js";import{S}from"./select-image-CXmlpjd7.js";import"./changeable-BgQi80HA.js";import"./article-renderer-DZq4xfLR.js";import"./server-item-renderer-LNXGqjDS.js";import"./hints-renderer-BJT36Vgf.js";import"./form-wrapped-text-field-q3sXR6Ek.js";import"./global-colors-DSS4FaUr.js";const N={title:"Widgets/Label Image/Widget Internal Components/Select Image"},x=n.StyleSheet.create({wrapper:{width:338}}),I=r=>e.jsx("div",{className:n.css(x.wrapper),children:e.jsx(S,{...r})}),j=()=>{const[r,s]=f.useState("");return e.jsx("div",{className:n.css(x.wrapper),children:e.jsx(S,{onChange:y=>s(y),url:r})})},t=r=>{const s={url:"",onChange:()=>{}};return e.jsx(I,{...s})},a=r=>{const s={url:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",onChange:()=>{}};return e.jsx(I,{...s})},o=r=>e.jsx(j,{});t.__docgenInfo={description:"",methods:[],displayName:"Empty"};a.__docgenInfo={description:"",methods:[],displayName:"Filled"};o.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var c,p,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    url: "",
    onChange: () => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var i,d,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    url: "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
    onChange: () => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var g,u,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const A=["Empty","Filled","Interactive"];export{t as Empty,a as Filled,o as Interactive,A as __namedExportsOrder,N as default};
