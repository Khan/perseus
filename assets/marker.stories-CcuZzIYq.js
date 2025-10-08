import{j as o,n as l}from"./iframe-Ub8Lz-nA.js";import{M as u}from"./marker-BOjPeNFK.js";import"./changeable-CL99IcSK.js";import"./article-renderer-FDodx0VF.js";import"./server-item-renderer-CDoUwnZ-.js";import"./hints-renderer-BCDFA4Wp.js";import"./components-B_sY-GQ1.js";import"./global-colors-DSS4FaUr.js";import"./form-wrapped-text-field-ChSTKyuD.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,M={title:"Widgets/Label Image/Widget Internal Components/Marker"},R=l.StyleSheet.create({wrapper:{marginTop:150,position:"relative",width:32,height:32}}),d=a=>o.jsx("div",{className:l.css(R.wrapper),children:o.jsx(u,{...a})}),r=a=>{const t={answers:[],choices:[],label:"",onChange:(...e)=>{s("onChange")(...e)},onRemove:(...e)=>{s("onRemove")(...e)},x:50,y:50};return o.jsx(d,{...t})},n=a=>{const t={answers:["BMW","Ferrari"],choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],label:"Automotive",onChange:(...e)=>{s("onChange")(...e)},onRemove:(...e)=>{s("onRemove")(...e)},x:50,y:50};return o.jsx(d,{...t})};r.__docgenInfo={description:"",methods:[],displayName:"Empty"};n.__docgenInfo={description:"",methods:[],displayName:"WithAnswers"};var i,p,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,g,h;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const S=["Empty","WithAnswers"];export{r as Empty,n as WithAnswers,S as __namedExportsOrder,M as default};
