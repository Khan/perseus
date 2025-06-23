import{j as W,r as _}from"./iframe-AqpKHAY9.js";import{F as R}from"./free-response-editor-CRmX5fGM.js";import"./item-version-B8Toki3N.js";import"./article-renderer-CMSUfeiO.js";import"./server-item-renderer-BJjmxO8L.js";import"./hints-renderer-BTjqbEcf.js";import"./plus-circle-DsgEZe2H.js";const k={component:R,title:"PerseusEditor/Widgets/Free Response Editor"},t={args:{}},s={args:{scoringCriteria:[{text:"50 points for Gryffindor!"}]}},o={args:{scoringCriteria:[{text:"50 points for Gryffindor!"},{text:"50 points for Slytherin!"},{text:"50 points for Hufflepuff!"}]}},e={args:{question:"[[☃ radio 1]]"}},b=()=>{const[i,j]=_.useState({allowUnlimitedCharacters:!1,characterLimit:500,placeholder:"Enter your answer here",question:"What is is the truth?",scoringCriteria:[{text:""}]}),q=G=>{j({...i,...G})};return W.jsx(R,{...i,onChange:q})},r=i=>W.jsx(b,{});r.__docgenInfo={description:"",methods:[],displayName:"Editable"};var a,n,c;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {}
}`,...(c=(n=t.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var p,d,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    scoringCriteria: [{
      text: "50 points for Gryffindor!"
    }]
  }
}`,...(m=(d=s.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,f,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    scoringCriteria: [{
      text: "50 points for Gryffindor!"
    }, {
      text: "50 points for Slytherin!"
    }, {
      text: "50 points for Hufflepuff!"
    }]
  }
}`,...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var l,h,x,C,S;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    question: "[[\\u2603 radio 1]]"
  }
}`,...(x=(h=e.parameters)==null?void 0:h.docs)==null?void 0:x.source},description:{story:`An example story showing how the editor looks when a widget is contained
in the free response widget's question field. Widgets are not allowed in
the free response widget.`,...(S=(C=e.parameters)==null?void 0:C.docs)==null?void 0:S.description}}};var y,E,w;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(w=(E=r.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};const I=["NoCriteria","OneCriterion","ThreeCriteria","QuestionWithWidget","Editable"];export{r as Editable,t as NoCriteria,s as OneCriterion,e as QuestionWithWidget,o as ThreeCriteria,I as __namedExportsOrder,k as default};
