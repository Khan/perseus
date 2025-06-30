import{j as e,n,r as f}from"./iframe-CvVOl_wM.js";import{S}from"./select-image-D3Byr4Rq.js";import"./item-version-CM-vdOGJ.js";import"./article-renderer-ifo9MFST.js";import"./server-item-renderer-BWrjrsdx.js";import"./hints-renderer-vP4aZU-y.js";import"./form-wrapped-text-field-BBq21htE.js";import"./global-colors-BJx09mFA.js";const N={title:"PerseusEditor/Widgets/Label Image/Select Image"},x=n.StyleSheet.create({wrapper:{width:338}}),y=r=>e.jsx("div",{className:n.css(x.wrapper),children:e.jsx(S,{...r})}),E=()=>{const[r,s]=f.useState("");return e.jsx("div",{className:n.css(x.wrapper),children:e.jsx(S,{onChange:I=>s(I),url:r})})},t=r=>{const s={url:"",onChange:()=>{}};return e.jsx(y,{...s})},a=r=>{const s={url:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",onChange:()=>{}};return e.jsx(y,{...s})},o=r=>e.jsx(E,{});t.__docgenInfo={description:"",methods:[],displayName:"Empty"};a.__docgenInfo={description:"",methods:[],displayName:"Filled"};o.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var c,p,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
