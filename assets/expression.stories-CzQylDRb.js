import{bl as k,bj as S,j as n,bm as E}from"./iframe-DqR7m31b.js";import{S as L}from"./server-item-renderer-with-debug-ui-BKQQhDLN.js";import"./server-item-renderer-CEP2UnIb.js";import"./hints-renderer-Byr7gtNZ.js";import"./main-rp53_vuR.js";import"./test-keypad-context-wrapper-BvP9j1iy.js";import"./Popper-Dpb6re_t.js";const i=(o,a=k.version)=>({question:{content:"[[☃ expression 1]]",images:{},widgets:{"expression 1":{type:"expression",graded:!0,options:o,version:a}}},answerArea:S(),hints:[]});i({answerForms:[],times:!1,buttonSets:["basic"],functions:[],buttonsVisible:"always",ariaLabel:"Test aria label",visibleLabel:"Test visible label",extraKeys:[]});const C=i({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"123-x"},{considered:"correct",form:!1,simplify:!1,value:"x-123"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),I=i({answerForms:[{considered:"ungraded",form:!1,simplify:!1,value:"x+1"},{considered:"wrong",form:!1,simplify:!1,value:"y+1"},{considered:"correct",form:!1,simplify:!1,value:"z+1"},{considered:"correct",form:!1,simplify:!1,value:"a+1"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"focused",visibleLabel:"number of cm",ariaLabel:"number of centimeters",extraKeys:["z","a"]}),D={title:"Widgets/Expression",component:L,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input and validate mathematical expressions,                    supporting various notations and formats for algebra, calculus, and other math topics."}}}},e=o=>{const a={keypadType:"EXPRESSION",extraKeys:["x","y","z"]};return n.jsx("div",{style:{padding:"2rem"},children:n.jsx(E.widget,{alignment:null,visibleLabel:"",ariaLabel:"",containerSizeClass:"small",findWidgets:K=>[],isLastUsedWidget:!1,onChange:()=>{},problemNum:1,static:!1,handleUserInput:()=>{},userInput:"",trackInteraction:()=>{},widgetId:"expression",keypadConfiguration:a,reviewMode:!1})})},s={args:{item:C}},r={args:{item:I}},t={args:{item:I,startAnswerless:!0}};e.__docgenInfo={description:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,methods:[],displayName:"DesktopKitchenSink"};var l,p,c,d,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`(args: Story["args"]): React.ReactElement => {
  const keypadConfiguration: KeypadConfiguration = {
    keypadType: "EXPRESSION",
    extraKeys: ["x", "y", "z"]
  };
  return <div style={{
    padding: "2rem"
  }}>
            <expressionExport.widget alignment={null} visibleLabel="" ariaLabel="" containerSizeClass="small" findWidgets={callback => []} isLastUsedWidget={false} onChange={() => {}} problemNum={1} static={false} handleUserInput={() => {}} userInput="" trackInteraction={() => {}} widgetId="expression" keypadConfiguration={keypadConfiguration} reviewMode={false} />
        </div>;
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source},description:{story:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.description}}};var u,f,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    item: expressionItem2
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var x,b,y;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: expressionItem3
  }
}`,...(y=(b=r.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var h,w,v;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    item: expressionItem3,
    startAnswerless: true
  }
}`,...(v=(w=t.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};const N=["DesktopKitchenSink","ExpressionItem2","ExpressionItem3","AnswerlessExpression"];export{t as AnswerlessExpression,e as DesktopKitchenSink,s as ExpressionItem2,r as ExpressionItem3,N as __namedExportsOrder,D as default};
