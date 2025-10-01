import{bl as _,bj as z,j as l,bm as F}from"./iframe-MEhIakqK.js";import{S as j}from"./server-item-renderer-with-debug-ui-XaLwvWyo.js";import"./server-item-renderer-CloFckl8.js";import"./hints-renderer-dh5_1Uk0.js";import"./main-BomwycC2.js";import"./test-keypad-context-wrapper-Cgbt3w-T.js";import"./Popper-kOFu604f.js";const i=(o,n=_.version)=>({question:{content:"[[☃ expression 1]]",images:{},widgets:{"expression 1":{type:"expression",graded:!0,options:o,version:n}}},answerArea:z(),hints:[]});i({answerForms:[],times:!1,buttonSets:["basic"],functions:[],buttonsVisible:"always",ariaLabel:"Test aria label",visibleLabel:"Test visible label",extraKeys:[]});const D=i({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"123-x"},{considered:"correct",form:!1,simplify:!1,value:"x-123"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),A=i({answerForms:[{considered:"ungraded",form:!1,simplify:!1,value:"x+1"},{considered:"wrong",form:!1,simplify:!1,value:"y+1"},{considered:"correct",form:!1,simplify:!1,value:"z+1"},{considered:"correct",form:!1,simplify:!1,value:"a+1"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"focused",visibleLabel:"number of cm",ariaLabel:"number of centimeters",extraKeys:["z","a"]}),T=i({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"5/8"}],times:!0,buttonSets:["basic+div"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),q={title:"Widgets/Expression",component:j,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input and validate mathematical expressions,                    supporting various notations and formats for algebra, calculus, and other math topics."}}}},e=o=>l.jsx("div",{style:{padding:"2rem"},children:l.jsx(F.widget,{alignment:null,visibleLabel:"",ariaLabel:"",containerSizeClass:"small",findWidgets:n=>[],problemNum:1,static:!1,handleUserInput:()=>{},userInput:"",trackInteraction:()=>{},widgetId:"expression",widgetIndex:0,extraKeys:["x","y","z"],reviewMode:!1,answerForms:[{considered:"correct",form:!1,simplify:!1,value:"8675309"}]})}),r={args:{item:D}},t={args:{item:A}},s={args:{item:T}},a={args:{item:A,startAnswerless:!0}};e.__docgenInfo={description:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,methods:[],displayName:"DesktopKitchenSink"};var c,m,p,d,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args: Story["args"]): React.ReactElement => {
  return <div style={{
    padding: "2rem"
  }}>
            <expressionExport.widget alignment={null} visibleLabel="" ariaLabel="" containerSizeClass="small" findWidgets={callback => []} problemNum={1} static={false} handleUserInput={() => {}} userInput="" trackInteraction={() => {}} widgetId="expression" widgetIndex={0} extraKeys={["x", "y", "z"]} reviewMode={false} answerForms={[{
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
}`,...(I=(v=s.parameters)==null?void 0:v.docs)==null?void 0:I.source},description:{story:"This story allows us to specifically test division in the expression widget.",...(k=(S=s.parameters)==null?void 0:S.docs)==null?void 0:k.description}}};var E,K,L;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: expressionItem3,
    startAnswerless: true
  }
}`,...(L=(K=a.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};const J=["DesktopKitchenSink","ExpressionItem2","ExpressionItem3","ExpressionItem4","AnswerlessExpression"];export{a as AnswerlessExpression,e as DesktopKitchenSink,r as ExpressionItem2,t as ExpressionItem3,s as ExpressionItem4,J as __namedExportsOrder,q as default};
