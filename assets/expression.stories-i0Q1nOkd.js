import{bk as _,bi as W,j as l,bl as z}from"./iframe-CP-zQJ4F.js";import{S as F}from"./server-item-renderer-with-debug-ui-Csg4Wb9V.js";import"./server-item-renderer-DsZI4mLS.js";import"./hints-renderer-fXYeMMVS.js";import"./main-Dlrcmh4D.js";import"./test-keypad-context-wrapper-mkbKZQi8.js";import"./Popper-bA2i84KG.js";const a=(o,n=_.version)=>({question:{content:"[[☃ expression 1]]",images:{},widgets:{"expression 1":{type:"expression",graded:!0,options:o,version:n}}},answerArea:W(),hints:[]});a({answerForms:[],times:!1,buttonSets:["basic"],functions:[],buttonsVisible:"always",ariaLabel:"Test aria label",visibleLabel:"Test visible label",extraKeys:[]});const D=a({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"123-x"},{considered:"correct",form:!1,simplify:!1,value:"x-123"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),A=a({answerForms:[{considered:"ungraded",form:!1,simplify:!1,value:"x+1"},{considered:"wrong",form:!1,simplify:!1,value:"y+1"},{considered:"correct",form:!1,simplify:!1,value:"z+1"},{considered:"correct",form:!1,simplify:!1,value:"a+1"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"focused",visibleLabel:"number of cm",ariaLabel:"number of centimeters",extraKeys:["z","a"]}),T=a({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"5/8"}],times:!0,buttonSets:["basic+div"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),q={title:"Widgets/Expression",component:F,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input and validate mathematical expressions,                    supporting various notations and formats for algebra, calculus, and other math topics."}}}},e=o=>l.jsx("div",{style:{padding:"2rem"},children:l.jsx(z.widget,{alignment:null,visibleLabel:"",ariaLabel:"",containerSizeClass:"small",findWidgets:n=>[],isLastUsedWidget:!1,problemNum:1,static:!1,handleUserInput:()=>{},userInput:"",trackInteraction:()=>{},widgetId:"expression",widgetIndex:0,extraKeys:["x","y","z"],reviewMode:!1,answerForms:[{considered:"correct",form:!1,simplify:!1,value:"8675309"}]})}),r={args:{item:D}},t={args:{item:A}},s={args:{item:T}},i={args:{item:A,startAnswerless:!0}};e.__docgenInfo={description:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,methods:[],displayName:"DesktopKitchenSink"};var c,m,p,d,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args: Story["args"]): React.ReactElement => {
  return <div style={{
    padding: "2rem"
  }}>
            <expressionExport.widget alignment={null} visibleLabel="" ariaLabel="" containerSizeClass="small" findWidgets={callback => []} isLastUsedWidget={false} problemNum={1} static={false} handleUserInput={() => {}} userInput="" trackInteraction={() => {}} widgetId="expression" widgetIndex={0} extraKeys={["x", "y", "z"]} reviewMode={false} answerForms={[{
      considered: "correct",
      form: false,
      simplify: false,
      value: "8675309"
    }]} />
        </div>;
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source},description:{story:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,...(u=(d=e.parameters)==null?void 0:d.docs)==null?void 0:u.description}}};var f,g,x;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: expressionItem2
  }
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var b,w,y;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: expressionItem3
  }
}`,...(y=(w=t.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var h,v,I,S,k;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    item: expressionItem4
  }
}`,...(I=(v=s.parameters)==null?void 0:v.docs)==null?void 0:I.source},description:{story:"This story allows us to specifically test division in the expression widget.",...(k=(S=s.parameters)==null?void 0:S.docs)==null?void 0:k.description}}};var E,L,K;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: expressionItem3,
    startAnswerless: true
  }
}`,...(K=(L=i.parameters)==null?void 0:L.docs)==null?void 0:K.source}}};const J=["DesktopKitchenSink","ExpressionItem2","ExpressionItem3","ExpressionItem4","AnswerlessExpression"];export{i as AnswerlessExpression,e as DesktopKitchenSink,r as ExpressionItem2,t as ExpressionItem3,s as ExpressionItem4,J as __namedExportsOrder,q as default};
