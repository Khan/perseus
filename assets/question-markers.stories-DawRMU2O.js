var w=Object.defineProperty;var S=(r,e,a)=>e in r?w(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a;var c=(r,e,a)=>S(r,typeof e!="symbol"?e+"":e,a);import{j as s,n as i,r as j}from"./iframe-DY2ryAtZ.js";import{Q as k}from"./question-markers-DyZoCZ1l.js";import"./changeable-BnPcVnxi.js";import"./article-renderer-MjjZaD46.js";import"./server-item-renderer-RW67PJWA.js";import"./hints-renderer-tAg2QKhI.js";import"./global-colors-DSS4FaUr.js";import"./marker-BeoE-3kZ.js";import"./components-Cyz89qTa.js";import"./form-wrapped-text-field-BQRYEu1K.js";const A={title:"Widgets/Label Image/Widget Internal Components/Question Markers"},y=i.StyleSheet.create({wrapper:{width:338}}),W=r=>s.jsx("div",{className:i.css(y.wrapper),children:s.jsx(k,{...r})});class E extends j.Component{constructor(){super(...arguments);c(this,"state",{markers:[{answers:[],label:"",x:50,y:50}]})}render(){const{markers:a}=this.state;return s.jsx("div",{className:i.css(y.wrapper),children:s.jsx(k,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:a,onChange:f=>this.setState({markers:f})})})}}const t=r=>{const e={choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}};return s.jsx(W,{...e})},n=r=>{const e={choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}};return s.jsx(W,{...e})},o=r=>s.jsx(E,{});t.__docgenInfo={description:"",methods:[],displayName:"Empty"};n.__docgenInfo={description:"",methods:[],displayName:"Filled"};o.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var m,p,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    choices: [],
    imageUrl: "",
    imageWidth: 0,
    imageHeight: 0,
    markers: [],
    onChange: () => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var d,l,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    choices: [],
    imageUrl: "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
    imageWidth: 1280,
    imageHeight: 1024,
    markers: [{
      answers: [],
      label: "",
      x: 50,
      y: 50
    }],
    onChange: () => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(h=(l=n.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var u,x,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};const Q=["Empty","Filled","Interactive"];export{t as Empty,n as Filled,o as Interactive,Q as __namedExportsOrder,A as default};
