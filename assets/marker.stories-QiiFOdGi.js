import{j as n,n as l}from"./iframe-CFuaP2rl.js";import{M as u}from"./marker-CMmp0giG.js";import"./item-version-dbi47DrE.js";import"./article-renderer-CWbQ3RaI.js";import"./server-item-renderer-W-hRuRM8.js";import"./hints-renderer-Cq53Ebn7.js";import"./components-DpoOYy7y.js";import"./global-colors-BJx09mFA.js";import"./form-wrapped-text-field-BDUHhVgY.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,M={title:"PerseusEditor/Widgets/Label Image/Marker"},R=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=a=>n.jsx("div",{className:l.css(R.wrapper),children:n.jsx(u,{...a})}),r=a=>{const t={answers:[],choices:[],label:"",onChange:(...e)=>{s("onChange")(...e)},onRemove:(...e)=>{s("onRemove")(...e)},x:50,y:50};return n.jsx(d,{...t})},o=a=>{const t={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...e)=>{s("onChange")(...e)},onRemove:(...e)=>{s("onRemove")(...e)},x:50,y:50};return n.jsx(d,{...t})};r.__docgenInfo={description:"",methods:[],displayName:"Empty"};o.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var i,c,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    answers: [],
    choices: [],
    label: "",
    onChange: (...args) => {
      action("onChange")(...args);
    },
    onRemove: (...args) => {
      action("onRemove")(...args);
    },
    x: 50,
    y: 50
  } as const;
  return <Wrapper {...props} />;
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,g,h;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = {
    answers: ["BMW", "Ferrari"],
    choices: ["Lamborghini", "BMW", "Volkswagen", "Fiat", "Porsche", "Ferrari"],
    label: "Automotive",
    onChange: (...args) => {
      action("onChange")(...args);
    },
    onRemove: (...args) => {
      action("onRemove")(...args);
    },
    x: 50,
    y: 50
  } as const;
  return <Wrapper {...props} />;
}`,...(h=(g=o.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const S=["Empty","WithAnswers"];export{r as Empty,o as WithAnswers,S as __namedExportsOrder,M as default};
