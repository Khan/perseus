var w=Object.defineProperty;var S=(r,e,s)=>e in r?w(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s;var c=(r,e,s)=>(S(r,typeof e!="symbol"?e+"":e,s),s);import{j as a,n as i,r as E}from"./iframe-dtRUXA0K.js";import{Q as k}from"./question-markers-MZacQpg_.js";import"./item-version-DMJCE50v.js";import"./article-renderer-Byw2HVqp.js";import"./server-item-renderer-qMN3rKYq.js";import"./hints-renderer-vaNkg7zC.js";import"./global-colors-BJx09mFA.js";import"./marker-eqRrQpXR.js";import"./components-sXKLdkR2.js";import"./form-wrapped-text-field-CU_j1fz1.js";const A={title:"PerseusEditor/Widgets/Label Image/Question Markers"},y=i.StyleSheet.create({wrapper:{width:338}}),f=r=>a.jsx("div",{className:i.css(y.wrapper),children:a.jsx(k,{...r})});class j extends E.Component{constructor(){super(...arguments);c(this,"state",{markers:[{answers:[],label:"",x:50,y:50}]})}render(){const{markers:s}=this.state;return a.jsx("div",{className:i.css(y.wrapper),children:a.jsx(k,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:s,onChange:W=>this.setState({markers:W})})})}}const t=r=>{const e={choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}};return a.jsx(f,{...e})},n=r=>{const e={choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}};return a.jsx(f,{...e})},o=r=>a.jsx(j,{});t.__docgenInfo={description:"",methods:[],displayName:"Empty"};n.__docgenInfo={description:"",methods:[],displayName:"Filled"};o.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var m,p,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
