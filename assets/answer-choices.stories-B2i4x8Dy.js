var x=Object.defineProperty;var y=(r,e,t)=>e in r?x(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var i=(r,e,t)=>(y(r,typeof e!="symbol"?e+"":e,t),t);import{j as s,n as C,r as E}from"./iframe-UtCD2W5C.js";import{A as N}from"./answer-choices-BbLKcB32.js";import"./item-version-BOeu8wCo.js";import"./article-renderer-JYZYc9Wg.js";import"./server-item-renderer-BpR8JcK3.js";import"./hints-renderer-D-7KbmbH.js";import"./components-B51QW2vZ.js";import"./form-wrapped-text-field-Bvn5vNVV.js";import"./global-colors-BJx09mFA.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,P={title:"PerseusEditor/Widgets/Label Image/Answer Choices"},j=C.StyleSheet.create({wrapper:{width:338}}),c=r=>s.jsx("div",{className:C.css(j.wrapper),children:s.jsx(N,{...r,onChange:(...e)=>{v("onChange")(...e),r.onChange(...e)}})});class w extends E.Component{constructor(){super(...arguments);i(this,"state",{choices:[]})}render(){const{choices:t}=this.state;return s.jsx(c,{choices:t,onChange:S=>this.setState({choices:S})})}}const o=r=>{const e={choices:[],onChange:(...t)=>{}};return s.jsx(c,{...e})},a=r=>{const e={choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],onChange:(...t)=>{}};return s.jsx(c,{...e})},n=r=>s.jsx(w,{});o.__docgenInfo={description:"",methods:[],displayName:"EmptyNonInteractive"};a.__docgenInfo={description:"",methods:[],displayName:"FilledNonInteractive"};n.__docgenInfo={description:"",methods:[],displayName:"Interactive"};var p,m,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    choices: [],
    onChange: (...args) => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,h,l;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    choices: ["Lamborghini", "BMW", "Volkswagen", "Fiat", "Porsche", "Ferrari"],
    onChange: (...args) => {}
  } as const;
  return <Wrapper {...props} />;
}`,...(l=(h=a.parameters)==null?void 0:h.docs)==null?void 0:l.source}}};var u,I,_;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(_=(I=n.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const k=["EmptyNonInteractive","FilledNonInteractive","Interactive"];export{o as EmptyNonInteractive,a as FilledNonInteractive,n as Interactive,k as __namedExportsOrder,P as default};
