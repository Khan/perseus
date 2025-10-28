var x=Object.defineProperty;var y=(r,e,t)=>e in r?x(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var i=(r,e,t)=>y(r,typeof e!="symbol"?e+"":e,t);import{j as s,Z as C,r as N}from"./iframe-Drd1SmRq.js";import{A as v}from"./answer-choices-d0Kbt_VK.js";import"./changeable-DTjDaQev.js";import"./article-renderer-QWMa5iwH.js";import"./server-item-renderer-DSCwYT3W.js";import"./hints-renderer-nULHa8p5.js";import"./components-DkrwPn-v.js";import"./form-wrapped-text-field-DSgvgUNZ.js";import"./global-colors-DSS4FaUr.js";const{action:E}=__STORYBOOK_MODULE_ACTIONS__,k={title:"Widgets/Label Image/Widget Internal Components/Answer Choices"},W=C.StyleSheet.create({wrapper:{width:338}}),c=r=>s.jsx("div",{className:C.css(W.wrapper),children:s.jsx(v,{...r,onChange:(...e)=>{E("onChange")(...e),r.onChange(...e)}})});class j extends N.Component{constructor(){super(...arguments);i(this,"state",{choices:[]})}render(){const{choices:t}=this.state;return s.jsx(c,{choices:t,onChange:S=>this.setState({choices:S})})}}const o=r=>{const e={choices:[],onChange:(...t)=>{}};return s.jsx(c,{...e})},n=r=>{const e={choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],onChange:(...t)=>{}};return s.jsx(c,{...e})},a=r=>s.jsx(j,{});o.__docgenInfo={description:"",methods:[],displayName:"EmptyNonInteractive"};n.__docgenInfo={description:"",methods:[],displayName:"FilledNonInteractive"};a.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var p,m,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    choices: [],
    onChange: (...args) => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,h,l;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    choices: ["Lamborghini", "BMW", "Volkswagen", "Fiat", "Porsche", "Ferrari"],
    onChange: (...args) => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(l=(h=n.parameters)==null?void 0:h.docs)==null?void 0:l.source}}};var u,I,_;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(_=(I=a.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const P=["EmptyNonInteractive","FilledNonInteractive","Interactive"];export{o as EmptyNonInteractive,n as FilledNonInteractive,a as Interactive,P as __namedExportsOrder,k as default};
