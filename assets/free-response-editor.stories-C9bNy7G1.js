import{j as w,r as q}from"./iframe-CnVpoeZy.js";import{F as W}from"./free-response-editor-DBiLMf8S.js";import"./changeable-Cm3EMqM_.js";import"./article-renderer-CTsZBa-i.js";import"./server-item-renderer-CBnujpVD.js";import"./hints-renderer-Ba8FYBgn.js";const{action:D}=__STORYBOOK_MODULE_ACTIONS__,L={title:"Widgets/Free Response/Editor Demo",component:W,tags:["!dev"]},t={args:{onChange:D("onChange")}},o={args:{scoringCriteria:[{text:"50 points for Gryffindor!"}]}},s={args:{scoringCriteria:[{text:"50 points for Gryffindor!"},{text:"50 points for Slytherin!"},{text:"50 points for Hufflepuff!"}]}},e={args:{question:"[[☃ radio 1]]"}},G=()=>{const[n,O]=q.useState({allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"What is is the truth?",scoringCriteria:[{text:""}]}),R=j=>{O({...n,...j})};return w.jsx(W,{...n,onChange:R})},r=n=>w.jsx(G,{});r.__docgenInfo={description:"",methods:[],displayName:"Editable"};var a,i,c;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    onChange: action("onChange")
  }
}`,...(c=(i=t.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var p,d,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    scoringCriteria: [{
      text: "50 points for Gryffindor!"
    }]
  }
}`,...(m=(d=o.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,u,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    scoringCriteria: [{
      text: "50 points for Gryffindor!"
    }, {
      text: "50 points for Slytherin!"
    }, {
      text: "50 points for Hufflepuff!"
    }]
  }
}`,...(f=(u=s.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var l,h,x,C,S;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    question: "[[\\u2603 radio 1]]"
  }
}`,...(x=(h=e.parameters)==null?void 0:h.docs)==null?void 0:x.source},description:{story:`An example story showing how the editor looks when a widget is contained
in the free response widget's question field. Widgets are not allowed in
the free response widget.`,...(S=(C=e.parameters)==null?void 0:C.docs)==null?void 0:S.description}}};var y,E,_;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(_=(E=r.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};const N=["Default","OneCriterion","ThreeCriteria","QuestionWithWidget","Editable"];export{t as Default,r as Editable,o as OneCriterion,e as QuestionWithWidget,s as ThreeCriteria,N as __namedExportsOrder,L as default};
