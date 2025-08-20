import{bn as S,bl as k,j as n,bo as E}from"./iframe-BEfsupqa.js";import{S as L}from"./server-item-renderer-with-debug-ui-pRV97MT_.js";import"./server-item-renderer-W8xegBfs.js";import"./hints-renderer-CFeAJlbT.js";import"./main-B-EsBYf8.js";import"./test-keypad-context-wrapper-CqLT_OTO.js";import"./Popper-CDosTRkE.js";const a=(i,o=S.version)=>({question:{content:"[[☃ expression 1]]",images:{},widgets:{"expression 1":{type:"expression",graded:!0,options:i,version:o}}},answerArea:k(),hints:[]});a({answerForms:[],times:!1,buttonSets:["basic"],functions:[],buttonsVisible:"always",ariaLabel:"Test aria label",visibleLabel:"Test visible label",extraKeys:[]});const A=a({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"123-x"},{considered:"correct",form:!1,simplify:!1,value:"x-123"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),I=a({answerForms:[{considered:"ungraded",form:!1,simplify:!1,value:"x+1"},{considered:"wrong",form:!1,simplify:!1,value:"y+1"},{considered:"correct",form:!1,simplify:!1,value:"z+1"},{considered:"correct",form:!1,simplify:!1,value:"a+1"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"focused",visibleLabel:"number of cm",ariaLabel:"number of centimeters",extraKeys:["z","a"]}),j={title:"Widgets/Expression",component:L,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input and validate mathematical expressions,                    supporting various notations and formats for algebra, calculus, and other math topics."}}}},e=i=>n.jsx("div",{style:{padding:"2rem"},children:n.jsx(E.widget,{alignment:null,visibleLabel:"",ariaLabel:"",containerSizeClass:"small",findWidgets:o=>[],isLastUsedWidget:!1,onChange:()=>{},problemNum:1,static:!1,handleUserInput:()=>{},userInput:"",trackInteraction:()=>{},widgetId:"expression",extraKeys:["x","y","z"],reviewMode:!1,answerForms:[{considered:"correct",form:!1,simplify:!1,value:"8675309"}]})}),s={args:{item:A}},r={args:{item:I}},t={args:{item:I,startAnswerless:!0}};e.__docgenInfo={description:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,methods:[],displayName:"DesktopKitchenSink"};var l,c,m,p,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`(args: Story["args"]): React.ReactElement => {
  return <div style={{
    padding: "2rem"
  }}>
            <expressionExport.widget alignment={null} visibleLabel="" ariaLabel="" containerSizeClass="small" findWidgets={callback => []} isLastUsedWidget={false} onChange={() => {}} problemNum={1} static={false} handleUserInput={() => {}} userInput="" trackInteraction={() => {}} widgetId="expression" extraKeys={["x", "y", "z"]} reviewMode={false} answerForms={[{
      considered: "correct",
      form: false,
      simplify: false,
      value: "8675309"
    }]} />
        </div>;
}`,...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source},description:{story:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.description}}};var u,f,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    item: expressionItem2
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var x,b,w;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: expressionItem3
  }
}`,...(w=(b=r.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var h,y,v;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    item: expressionItem3,
    startAnswerless: true
  }
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const C=["DesktopKitchenSink","ExpressionItem2","ExpressionItem3","AnswerlessExpression"];export{t as AnswerlessExpression,e as DesktopKitchenSink,s as ExpressionItem2,r as ExpressionItem3,C as __namedExportsOrder,j as default};
