import{j as W,r as _}from"./iframe-Bn4eIUvs.js";import{F as R}from"./free-response-editor-DAujeROR.js";import"./item-version-DeXeNc9j.js";import"./article-renderer-De3DbS1j.js";import"./server-item-renderer-dzpsa8GX.js";import"./hints-renderer-Wq2tBpaB.js";const T={component:R,title:"Widgets/Free Response/Editor Demo",tags:["!dev"],parameters:{docs:{description:{component:"An editor for adding a free response widget that allow users to enter open-ended text answers."}}}},t={args:{}},s={args:{scoringCriteria:[{text:"50 points for Gryffindor!"}]}},o={args:{scoringCriteria:[{text:"50 points for Gryffindor!"},{text:"50 points for Slytherin!"},{text:"50 points for Hufflepuff!"}]}},e={args:{question:"[[☃ radio 1]]"}},b=()=>{const[a,j]=_.useState({allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"What is is the truth?",scoringCriteria:[{text:""}]}),q=G=>{j({...a,...G})};return W.jsx(R,{...a,onChange:q})},r=a=>W.jsx(b,{});r.__docgenInfo={description:"",methods:[],displayName:"Editable"};var n,i,c;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {}
}`,...(c=(i=t.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,p,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    scoringCriteria: [{
      text: "50 points for Gryffindor!"
    }]
  }
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,f,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    scoringCriteria: [{
      text: "50 points for Gryffindor!"
    }, {
      text: "50 points for Slytherin!"
    }, {
      text: "50 points for Hufflepuff!"
    }]
  }
}`,...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var l,h,x,C,w;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    question: "[[\\u2603 radio 1]]"
  }
}`,...(x=(h=e.parameters)==null?void 0:h.docs)==null?void 0:x.source},description:{story:`An example story showing how the editor looks when a widget is contained
in the free response widget's question field. Widgets are not allowed in
the free response widget.`,...(w=(C=e.parameters)==null?void 0:C.docs)==null?void 0:w.description}}};var S,y,E;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(E=(y=r.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};const k=["NoCriteria","OneCriterion","ThreeCriteria","QuestionWithWidget","Editable"];export{r as Editable,t as NoCriteria,s as OneCriterion,e as QuestionWithWidget,o as ThreeCriteria,k as __namedExportsOrder,T as default};
