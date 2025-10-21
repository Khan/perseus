import{b5 as M,b7 as q,j as t,b8 as J,r as O}from"./iframe-BxY6-TkQ.js";import{S as C}from"./server-item-renderer-with-debug-ui-nAbCGXM0.js";import"./server-item-renderer-CSu13Qsq.js";import"./hints-renderer-BqEsfExB.js";import"./main-_bYQQuqo.js";import"./test-keypad-context-wrapper-D8UqmtkJ.js";import"./Popper-CPVRWjVK.js";const n=(e,i=!1)=>({question:{content:"[[☃ expression 1]]",images:{},widgets:{"expression 1":{type:"expression",graded:!0,options:e,version:q.version,static:i}}},answerArea:M(),hints:[]});n({answerForms:[],times:!1,buttonSets:["basic"],functions:[],buttonsVisible:"always",ariaLabel:"Test aria label",visibleLabel:"Test visible label",extraKeys:[]});const G=n({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"123-x"},{considered:"correct",form:!1,simplify:!1,value:"x-123"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),N=n({answerForms:[{considered:"ungraded",form:!1,simplify:!1,value:"x+1"},{considered:"wrong",form:!1,simplify:!1,value:"y+1"},{considered:"correct",form:!1,simplify:!1,value:"z+1"},{considered:"correct",form:!1,simplify:!1,value:"a+1"}],times:!1,buttonSets:["basic"],functions:["f","g","h"],buttonsVisible:"focused",visibleLabel:"number of cm",ariaLabel:"number of centimeters",extraKeys:["z","a"]}),U=n({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"5/8"}],times:!0,buttonSets:["basic+div"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]}),B=n({answerForms:[{considered:"correct",form:!1,simplify:!1,value:"5/8"}],times:!0,buttonSets:["basic+div"],functions:["f","g","h"],buttonsVisible:"always",extraKeys:["x"]},!0),ee={title:"Widgets/Expression",component:C,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input and validate mathematical expressions,                    supporting various notations and formats for algebra, calculus, and other math topics."}}}},s=e=>t.jsx("div",{style:{padding:"2rem"},children:t.jsx(J.widget,{alignment:null,visibleLabel:"",ariaLabel:"",containerSizeClass:"small",findWidgets:i=>[],problemNum:1,static:!1,handleUserInput:()=>{},userInput:"",trackInteraction:()=>{},widgetId:"expression",widgetIndex:0,extraKeys:["x","y","z"],reviewMode:!1,answerForms:[{considered:"correct",form:!1,simplify:!1,value:"8675309"}]})}),a={args:{item:G}},c={args:{item:N}},o={args:{item:U}},p={args:{item:N,startAnswerless:!0}},l={args:{item:B}},r=()=>{const[e,i]=O.useState(!0);return t.jsxs("div",{style:{padding:"2rem"},children:[t.jsxs("label",{children:[t.jsx("input",{type:"checkbox",checked:e,onChange:()=>i(!e)}),"Show answer"]}),t.jsx(C,{item:e?B:U})]})};s.__docgenInfo={description:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,methods:[],displayName:"DesktopKitchenSink"};r.__docgenInfo={description:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,methods:[],displayName:"ShowAnswerButton"};var m,d,u,w,f;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`(args: Story["args"]): React.ReactElement => {
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
}`,...(u=(d=s.parameters)==null?void 0:d.docs)==null?void 0:u.source},description:{story:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,...(f=(w=s.parameters)==null?void 0:w.docs)==null?void 0:f.description}}};var h,x,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    item: expressionItem2
  }
}`,...(g=(x=a.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var b,y,v;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    item: expressionItem3
  }
}`,...(v=(y=c.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var S,I,k,A,E;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    item: expressionItem4
  }
}`,...(k=(I=o.parameters)==null?void 0:I.docs)==null?void 0:k.source},description:{story:"This story allows us to specifically test division in the expression widget.",...(E=(A=o.parameters)==null?void 0:A.docs)==null?void 0:E.description}}};var _,K,L;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    item: expressionItem3,
    startAnswerless: true
  }
}`,...(L=(K=p.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var j,R,F;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    item: expressionItem4Static
  }
}`,...(F=(R=l.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var T,z,D,W,V;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`(): React.ReactElement => {
  const [showAnswer, setShowAnswer] = React.useState(true);
  return <div style={{
    padding: "2rem"
  }}>
            <label>
                <input type="checkbox" checked={showAnswer} onChange={() => setShowAnswer(!showAnswer)} />
                Show answer
            </label>
            <ServerItemRendererWithDebugUI item={showAnswer ? expressionItem4Static : expressionItem4} />
        </div>;
}`,...(D=(z=r.parameters)==null?void 0:z.docs)==null?void 0:D.source},description:{story:`This story shows how the expression widget looks when the keypad is
configured with _every_ option it supports.`,...(V=(W=r.parameters)==null?void 0:W.docs)==null?void 0:V.description}}};const se=["DesktopKitchenSink","ExpressionItem2","ExpressionItem3","ExpressionItem4","AnswerlessExpression","StaticExpression","ShowAnswerButton"];export{p as AnswerlessExpression,s as DesktopKitchenSink,a as ExpressionItem2,c as ExpressionItem3,o as ExpressionItem4,r as ShowAnswerButton,l as StaticExpression,se as __namedExportsOrder,ee as default};
