import{br as k,d2 as S,j as o,de as E}from"./iframe-B8IXMsWE.js";import{S as L}from"./server-item-renderer-with-debug-ui-C56ynTCF.js";import"./server-item-renderer-BpUAnMe6.js";import"./hints-renderer-DoCLgHSp.js";import"./main-DYfBSATf.js";import"./test-keypad-context-wrapper-Bh-eFY9c.js";import"./Popper-BYaqK5oV.js";const i=(n,a=k.version)=>({question:{content:"[[☃ expression 1]]",images:{},widgets:{"expression 1":{type:"expression",graded:!0,options:n,version:a}}},answerArea:S(),hints:[]});i({answerForms:[],times:!1,buttonSets:["basic"],functions:[],buttonsVisible:"always",ariaLabel:"Test aria label",visibleLabel:"Test visible label",extraKeys:[]});const C=i({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"123-x"},{considered:"correct",form:!1,simplify:!1,value:"x-123"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),v=i({answerForms:[{considered:"ungraded",form:!1,simplify:!1,value:"x+1"},{considered:"wrong",form:!1,simplify:!1,value:"y+1"},{considered:"correct",form:!1,simplify:!1,value:"z+1"},{considered:"correct",form:!1,simplify:!1,value:"a+1"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"focused",visibleLabel:"number of cm",ariaLabel:"number of centimeters",extraKeys:["z","a"]}),N={title:"Perseus/Widgets/Expression",component:L},e=n=>{const a={keypadType:"EXPRESSION",extraKeys:["x","y","z"]};return o.jsx("div",{style:{padding:"2rem"},children:o.jsx(E.widget,{alignment:null,visibleLabel:"",ariaLabel:"",containerSizeClass:"small",findWidgets:K=>[],isLastUsedWidget:!1,onChange:()=>{},problemNum:1,static:!1,handleUserInput:()=>{},userInput:"",trackInteraction:()=>{},widgetId:"expression",keypadConfiguration:a,reviewMode:!1})})},s={args:{item:C}},r={args:{item:v}},t={args:{item:v,startAnswerless:!0}};e.__docgenInfo={description:`This story shows how the expression widget looks when the keypad is
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
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var x,y,b;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    item: expressionItem3
  }
}`,...(b=(y=r.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,h,I;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: expressionItem3,
    startAnswerless: true
  }
}`,...(I=(h=t.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};const U=["DesktopKitchenSink","ExpressionItem2","ExpressionItem3","AnswerlessExpression"];export{t as AnswerlessExpression,e as DesktopKitchenSink,s as ExpressionItem2,r as ExpressionItem3,U as __namedExportsOrder,N as default};
