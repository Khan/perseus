var re=Object.defineProperty;var ae=(n,t,e)=>t in n?re(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var y=(n,t,e)=>(ae(n,typeof t!="symbol"?t+"":t,e),e);import{j as o}from"./jsx-runtime-BT65X5dW.js";import{r as c,R as E}from"./index-C6mWTJJr.js";import{n as T}from"./no-important-DlFk8a1I.js";import{h as N}from"./index-B1Gws05u.js";import{w as ie}from"./index-3H81sEQ1.js";import{e as se}from"./index-BzwLglMS.js";import{V as k,_ as oe,a as le}from"./index-CskvhqFA.js";import{_ as ue}from"./assertThisInitialized-B9jnkVVz.js";import{_ as de}from"./index-KFdEgasi.js";import{c as q}from"./index-CjnMbH_2.js";import{T as pe}from"./tabbar-CZSBNGic.js";import{u as x,K as h}from"./button-assets-jgEZxWWu.js";import{K as p}from"./keypad-button-BJU3sZeL.js";import{N as ce,O as ye,G as me}from"./operators-page-C4Y73DnP.js";import{N as he}from"./navigation-pad-B5FLjl7S.js";var f=(n=>(n.NONE="NONE",n.IN_PARENS="IN_PARENS",n.IN_SUPER_SCRIPT="IN_SUPER_SCRIPT",n.IN_SUB_SCRIPT="IN_SUB_SCRIPT",n.IN_NUMERATOR="IN_NUMERATOR",n.IN_DENOMINATOR="IN_DENOMINATOR",n.BEFORE_FRACTION="BEFORE_FRACTION",n))(f||{});const fe=["az","cs","da","de","hu","hy","kk","ky","lt","lv","nb","sk","sr","sv","uz"],ve=["fr","tr","pt-pt"];function ge(n,t){return fe.includes(n)?!1:ve.includes(n)?!0:t}var D;const Ge=typeof process<"u"&&!!((D=process==null?void 0:process.env)!=null&&D.JEST_WORKER_ID),M=3;function O(n){const{extraKeys:t,onClickKey:e}=n,{strings:r}=x(),i=h(r);return o.jsx(o.Fragment,{children:t.map((a,s)=>{const u=s%M,l=s/M;return o.jsx(p,{keyConfig:i[a],onClickKey:e,coord:[u,l]},a)})})}O.__docgenInfo={description:"",methods:[],displayName:"ExtrasPage",props:{extraKeys:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>"},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""}}};const P=500;function V(n,t){if(!t)return null;switch(t){case f.NONE:return null;case f.IN_PARENS:return h(n).JUMP_OUT_PARENTHESES;case f.IN_SUPER_SCRIPT:return h(n).JUMP_OUT_EXPONENT;case f.IN_SUB_SCRIPT:return h(n).JUMP_OUT_BASE;case f.IN_NUMERATOR:return h(n).JUMP_OUT_NUMERATOR;case f.IN_DENOMINATOR:return h(n).JUMP_OUT_DENOMINATOR;case f.BEFORE_FRACTION:return h(n).JUMP_INTO_NUMERATOR}}function L(n){const{onClickKey:t,cursorContext:e}=n,{strings:r}=x(),i=V(r,e),a=h(r);return o.jsxs(o.Fragment,{children:[o.jsx(p,{keyConfig:a.NUM_1,onClickKey:t,coord:[0,2]}),o.jsx(p,{keyConfig:a.NUM_2,onClickKey:t,coord:[1,2]}),o.jsx(p,{keyConfig:a.NUM_3,onClickKey:t,coord:[2,2]}),o.jsx(p,{keyConfig:a.NUM_4,onClickKey:t,coord:[0,1]}),o.jsx(p,{keyConfig:a.NUM_5,onClickKey:t,coord:[1,1]}),o.jsx(p,{keyConfig:a.NUM_6,onClickKey:t,coord:[2,1]}),o.jsx(p,{keyConfig:a.NUM_7,onClickKey:t,coord:[0,0]}),o.jsx(p,{keyConfig:a.NUM_8,onClickKey:t,coord:[1,0]}),o.jsx(p,{keyConfig:a.NUM_9,onClickKey:t,coord:[2,0]}),o.jsx(p,{keyConfig:a.NUM_0,onClickKey:t,coord:[0,3]}),o.jsx(p,{keyConfig:a.DECIMAL,onClickKey:t,coord:[1,3]}),o.jsx(p,{keyConfig:a.NEGATIVE,onClickKey:t,coord:[2,3]}),o.jsx(p,{keyConfig:a.PERCENT,onClickKey:t,coord:[3,0],secondary:!0}),o.jsx(p,{keyConfig:a.PI,onClickKey:t,coord:[3,1],secondary:!0}),o.jsx(p,{keyConfig:a.FRAC,onClickKey:t,coord:[3,2],secondary:!0}),i&&o.jsx(p,{keyConfig:i,onClickKey:t,coord:[3,3],secondary:!0}),o.jsx(p,{keyConfig:a.BACKSPACE,onClickKey:t,coord:[4,3],action:!0})]})}L.__docgenInfo={description:"",methods:[],displayName:"FractionsPage",props:{onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""}}};function U(n){const{onClickKey:t,cursorContext:e,divisionKey:r,convertDotToTimes:i,selectedPage:a}=n,{strings:s,locale:u}=x(),l=V(s,e),d=h(s),m=a==="Numbers"||a==="Operators"?[3,1]:[3,0];return o.jsxs(o.Fragment,{children:[o.jsx(p,{keyConfig:d.FRAC,onClickKey:t,coord:m,secondary:!0}),o.jsx(p,{keyConfig:d.PLUS,onClickKey:t,coord:[4,0],secondary:!0}),o.jsx(p,{keyConfig:d.MINUS,onClickKey:t,coord:[5,0],secondary:!0}),o.jsx(p,{keyConfig:ge(u,!!i)?d.TIMES:d.CDOT,onClickKey:t,coord:[4,1],secondary:!0}),r&&o.jsx(p,{keyConfig:d.DIVIDE,onClickKey:t,coord:[5,1],secondary:!0}),o.jsx(p,{keyConfig:d.LEFT_PAREN,onClickKey:t,coord:[4,2],secondary:!0}),o.jsx(p,{keyConfig:d.RIGHT_PAREN,onClickKey:t,coord:[5,2],secondary:!0}),l&&o.jsx(p,{keyConfig:l,onClickKey:t,coord:[4,3],secondary:!0}),o.jsx(p,{keyConfig:d.BACKSPACE,onClickKey:t,coord:[5,3],secondary:!0})]})}U.__docgenInfo={description:"",methods:[],displayName:"SharedKeys",props:{onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},selectedPage:{required:!0,tsType:{name:"union",raw:`| "Geometry"
| "Operators"
| "Numbers"
| "Fractions"
| "Extras"
| "Dismiss"`,elements:[{name:"literal",value:'"Geometry"'},{name:"literal",value:'"Operators"'},{name:"literal",value:'"Numbers"'},{name:"literal",value:'"Fractions"'},{name:"literal",value:'"Extras"'},{name:"literal",value:'"Dismiss"'}]},description:""},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""},convertDotToTimes:{required:!1,tsType:{name:"boolean"},description:""},divisionKey:{required:!1,tsType:{name:"boolean"},description:""}}};function Te(n){var e;if(n.fractionsOnly)return[];const t=["Numbers"];return(n.preAlgebra||n.logarithms||n.basicRelations||n.advancedRelations)&&t.push("Operators"),n.trigonometry&&t.push("Geometry"),(e=n.extraKeys)!=null&&e.length&&t.push("Extras"),t}function H({extraKeys:n=[],...t}){const e=t.fractionsOnly?"Fractions":"Numbers",[r,i]=c.useState(e),[a,s]=c.useState(!1),u=Te({...t,extraKeys:n}),{onClickKey:l,cursorContext:d,convertDotToTimes:m,divisionKey:B,preAlgebra:J,logarithms:Q,basicRelations:$,advancedRelations:X,scientific:Z,showDismiss:ee,onAnalyticsEvent:C,fractionsOnly:_,expandedView:R}=t,te=_?v.fractionsGrid:v.expressionGrid;return c.useEffect(()=>{i(e)},[_,e]),c.useEffect(()=>(a||(C({type:"math-input:keypad-opened",payload:{virtualKeypadVersion:"MATH_INPUT_KEYPAD_V2"}}),s(!0)),()=>{a&&(C({type:"math-input:keypad-closed",payload:{virtualKeypadVersion:"MATH_INPUT_KEYPAD_V2"}}),s(!1))}),[C,a]),o.jsx(k,{style:R?v.keypadOuterContainer:null,children:o.jsxs(k,{style:[v.wrapper,R?v.expandedWrapper:null],children:[o.jsx(pe,{items:u,selectedItem:r,onSelectItem:ne=>{i(ne)},onClickClose:ee?()=>l("DISMISS"):void 0}),o.jsxs(k,{style:v.keypadInnerContainer,children:[o.jsxs(k,{style:[v.keypadGrid,te],"aria-label":"Keypad",children:[r==="Fractions"&&o.jsx(L,{onClickKey:l,cursorContext:d}),r==="Numbers"&&o.jsx(ce,{onClickKey:l,scientific:Z}),r==="Extras"&&o.jsx(O,{onClickKey:l,extraKeys:n}),r==="Operators"&&o.jsx(ye,{onClickKey:l,preAlgebra:J,logarithms:Q,basicRelations:$,advancedRelations:X}),r==="Geometry"&&o.jsx(me,{onClickKey:l}),!_&&o.jsx(U,{onClickKey:l,cursorContext:d,convertDotToTimes:m,divisionKey:B,selectedPage:r})]}),R&&o.jsx(he,{onClickKey:l})]})]})})}const v=T.StyleSheet.create({keypadOuterContainer:{display:"flex",alignItems:"center"},wrapper:{background:q.white},expandedWrapper:{borderWidth:"1px 1px 0 1px",borderColor:q.offBlack32,maxWidth:P,borderRadius:"3px 3px 0 0"},keypadInnerContainer:{display:"flex",flexDirection:"row",backgroundColor:"#DBDCDD"},keypadGrid:{display:"grid",gridTemplateRows:"repeat(4, 1fr)",flex:1},expressionGrid:{gridTemplateColumns:"repeat(6, 1fr)"},fractionsGrid:{gridTemplateColumns:"repeat(5, 1fr)"}});H.__docgenInfo={description:"",methods:[],displayName:"Keypad",props:{extraKeys:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>"},description:"",defaultValue:{value:"[]",computed:!1}},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""},showDismiss:{required:!1,tsType:{name:"boolean"},description:""},expandedView:{required:!1,tsType:{name:"boolean"},description:""},convertDotToTimes:{required:!1,tsType:{name:"boolean"},description:""},divisionKey:{required:!1,tsType:{name:"boolean"},description:""},trigonometry:{required:!1,tsType:{name:"boolean"},description:""},preAlgebra:{required:!1,tsType:{name:"boolean"},description:""},logarithms:{required:!1,tsType:{name:"boolean"},description:""},basicRelations:{required:!1,tsType:{name:"boolean"},description:""},advancedRelations:{required:!1,tsType:{name:"boolean"},description:""},fractionsOnly:{required:!1,tsType:{name:"boolean"},description:""},scientific:{required:!1,tsType:{name:"boolean"},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},onAnalyticsEvent:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    event: Extract<
        PerseusAnalyticsEvent,
        {type: "math-input:keypad-opened" | "math-input:keypad-closed"}
    >,
) => void`,signature:{arguments:[{type:{name:"Extract",elements:[{name:"union",raw:`| {
      type: "perseus:expression-evaluated";
      payload: {
          virtualKeypadVersion: VirtualKeypadVersion;
          result: "correct" | "incorrect" | "invalid";
      };
  }
| {
      type: "perseus:expression-focused";
      payload: null;
  }
| {
      type: "perseus:widget-rendering-error:ti";
      payload: {
          widgetSubType: string;
          widgetType: string;
          widgetId: string;
          message: string;
          userAgent: string;
      };
  }
// TODO(LEMS-2827): Remove this error type in LEMS-2827
| {
      type: "perseus:interactive-graph-widget:rendered";
      payload: {
          type: string;
          widgetType: string;
          widgetId: string;
      };
  }
| {
      type: "perseus:widget:rendered:ti";
      payload: {
          widgetSubType: string;
          widgetType: string;
          widgetId: string;
      };
  }
// TODO(LEMS-2831): Remove this error type in LEMS-2831
| {
      type: "perseus:label-image:toggle-answers-hidden";
      payload: null;
  }
// TODO(LEMS-2830): Remove this error type in LEMS-2830
| {
      type: "perseus:label-image:marker-interacted-with";
      payload: null;
  }
// TODO(LEMS-2829): Remove this error type in LEMS-2829
| {
      type: "perseus:label-image:choiced-interacted-with";
      payload: null;
  }
| {
      type: "perseus:label-image:toggle-answers-hidden:ti";
      payload: null;
  }
| {
      type: "perseus:label-image:marker-interacted-with:ti";
      payload: null;
  }
| {
      type: "perseus:label-image:choiced-interacted-with:ti";
      payload: null;
  }
| {
      type: "math-input:keypad-closed";
      payload: {
          virtualKeypadVersion: VirtualKeypadVersion;
      };
  }
| {
      type: "math-input:keypad-opened";
      payload: {
          virtualKeypadVersion: VirtualKeypadVersion;
      };
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "perseus:expression-evaluated";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
        result: "correct" | "incorrect" | "invalid";
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:expression-evaluated"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
    result: "correct" | "incorrect" | "invalid";
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}},{key:"result",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:expression-focused";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:expression-focused"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:widget-rendering-error:ti";
    payload: {
        widgetSubType: string;
        widgetType: string;
        widgetId: string;
        message: string;
        userAgent: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget-rendering-error:ti"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetSubType: string;
    widgetType: string;
    widgetId: string;
    message: string;
    userAgent: string;
}`,signature:{properties:[{key:"widgetSubType",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}},{key:"message",value:{name:"string",required:!0}},{key:"userAgent",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:interactive-graph-widget:rendered";
    payload: {
        type: string;
        widgetType: string;
        widgetId: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:interactive-graph-widget:rendered"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    type: string;
    widgetType: string;
    widgetId: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:widget:rendered:ti";
    payload: {
        widgetSubType: string;
        widgetType: string;
        widgetId: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget:rendered:ti"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetSubType: string;
    widgetType: string;
    widgetId: string;
}`,signature:{properties:[{key:"widgetSubType",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:toggle-answers-hidden";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:toggle-answers-hidden"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:marker-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:marker-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:choiced-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:choiced-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:toggle-answers-hidden:ti";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:toggle-answers-hidden:ti"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:marker-interacted-with:ti";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:marker-interacted-with:ti"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:choiced-interacted-with:ti";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:choiced-interacted-with:ti"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-closed";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-closed"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-opened";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-opened"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},{name:"signature",type:"object",raw:'{type: "math-input:keypad-opened" | "math-input:keypad-closed"}',signature:{properties:[{key:"type",value:{name:"union",raw:'"math-input:keypad-opened" | "math-input:keypad-closed"',elements:[{name:"literal",value:'"math-input:keypad-opened"'},{name:"literal",value:'"math-input:keypad-closed"'}],required:!0}}]}}],raw:`Extract<
    PerseusAnalyticsEvent,
    {type: "math-input:keypad-opened" | "math-input:keypad-closed"}
>`},name:"event"}],return:{name:"void"}}},description:""}}};const z=c.createContext({setKeypadActive:n=>{},keypadActive:!1,setKeypadElement:n=>{},keypadElement:null,setRenderer:n=>{},renderer:null,setScrollableElement:n=>{},scrollableElement:null});function Ee(n){const[t,e]=c.useState(!1),[r,i]=c.useState(),[a,s]=c.useState(),[u,l]=c.useState(),d=c.useMemo(()=>({keypadActive:t,setKeypadActive:e,keypadElement:r,setKeypadElement:i,renderer:a,setRenderer:s,scrollableElement:u,setScrollableElement:l}),[t,e,r,i,a,s,u,l]);return o.jsx(z.Provider,{value:d,children:n.children})}Ee.__docgenInfo={description:"",methods:[],displayName:"StatefulKeypadContextProvider"};const S=class S extends c.Component{render(){const t=T.css(S.styles.initial,...Array.isArray(this.props.style)?this.props.style:[this.props.style])+(this.props.extraClassName?` ${this.props.extraClassName}`:"");return o.jsx("div",{className:t,style:this.props.dynamicStyle,onClick:this.props.onClick,onTouchCancel:this.props.onTouchCancel,onTouchEnd:this.props.onTouchEnd,onTouchMove:this.props.onTouchMove,onTouchStart:this.props.onTouchStart,"aria-label":this.props.ariaLabel,role:this.props.role,ref:this.props.forwardRef,children:this.props.children})}};y(S,"styles",T.StyleSheet.create({initial:{alignItems:"stretch",borderWidth:0,borderStyle:"solid",boxSizing:"border-box",display:"flex",flexBasis:"auto",flexDirection:"column",margin:0,padding:0,position:"relative",backgroundColor:"transparent",color:"inherit",font:"inherit",textAlign:"inherit",textDecorationLine:"none",listStyle:"none",maxWidth:"100%",minHeight:0,minWidth:0}}));let b=S;b.__docgenInfo={description:"",methods:[],displayName:"View",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dynamicStyle:{required:!1,tsType:{name:"CSSProperties"},description:""},extraClassName:{required:!1,tsType:{name:"string"},description:""},numberOfLines:{required:!1,tsType:{name:"number"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.SyntheticEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchStart:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},role:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},forwardRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},description:""}}};const I=E.createContext(null);function A(n,t){var e=function(a){return t&&c.isValidElement(a)?t(a):a},r=Object.create(null);return n&&c.Children.map(n,function(i){return i}).forEach(function(i){r[i.key]=e(i)}),r}function ke(n,t){n=n||{},t=t||{};function e(m){return m in t?t[m]:n[m]}var r=Object.create(null),i=[];for(var a in n)a in t?i.length&&(r[a]=i,i=[]):i.push(a);var s,u={};for(var l in t){if(r[l])for(s=0;s<r[l].length;s++){var d=r[l][s];u[r[l][s]]=e(d)}u[l]=e(l)}for(s=0;s<i.length;s++)u[i[s]]=e(i[s]);return u}function g(n,t,e){return e[t]!=null?e[t]:n.props[t]}function we(n,t){return A(n.children,function(e){return c.cloneElement(e,{onExited:t.bind(null,e),in:!0,appear:g(e,"appear",n),enter:g(e,"enter",n),exit:g(e,"exit",n)})})}function be(n,t,e){var r=A(n.children),i=ke(t,r);return Object.keys(i).forEach(function(a){var s=i[a];if(c.isValidElement(s)){var u=a in t,l=a in r,d=t[a],m=c.isValidElement(d)&&!d.props.in;l&&(!u||m)?i[a]=c.cloneElement(s,{onExited:e.bind(null,s),in:!0,exit:g(s,"exit",n),enter:g(s,"enter",n)}):!l&&u&&!m?i[a]=c.cloneElement(s,{in:!1}):l&&u&&c.isValidElement(d)&&(i[a]=c.cloneElement(s,{onExited:e.bind(null,s),in:d.props.in,exit:g(s,"exit",n),enter:g(s,"enter",n)}))}}),i}var Se=Object.values||function(n){return Object.keys(n).map(function(t){return n[t]})},Ce={component:"div",childFactory:function(t){return t}},K=function(n){de(t,n);function t(r,i){var a;a=n.call(this,r,i)||this;var s=a.handleExited.bind(ue(a));return a.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},a}var e=t.prototype;return e.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},e.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(i,a){var s=a.children,u=a.handleExited,l=a.firstRender;return{children:l?we(i,u):be(i,s,u),firstRender:!1}},e.handleExited=function(i,a){var s=A(this.props.children);i.key in s||(i.props.onExited&&i.props.onExited(a),this.mounted&&this.setState(function(u){var l=oe({},u.children);return delete l[i.key],{children:l}}))},e.render=function(){var i=this.props,a=i.component,s=i.childFactory,u=le(i,["component","childFactory"]),l=this.state.contextValue,d=Se(this.state.children).map(s);return delete u.appear,delete u.enter,delete u.exit,a===null?E.createElement(I.Provider,{value:l},d):E.createElement(I.Provider,{value:l},E.createElement(a,u,d))},t}(E.Component);K.propTypes={};K.defaultProps=Ce;function F(n){const t=[];if(!n)return t;if(Array.isArray(n))for(const e of n)t.push(...F(e));else t.push(n);return t}function j(n){const t=[],e=[];if(!n)return{style:{},className:""};const r=typeof globalThis<"u"&&globalThis.SNAPSHOT_INLINE_APHRODITE;F(n).forEach(a=>{const s=a._definition;if(s!=null)if(r){const u={};for(const[l,d]of se(s))u[l.replace(/-[a-z]/g,m=>m[1].toUpperCase())]=d;e.push(u)}else t.push(a);else e.push(a)});const i=Object.assign({},...e);if(e.length>0&&!r){const a=T.StyleSheet.create({inlineStyles:i});t.push(a.inlineStyles)}return{style:r?i:{},className:T.css(...t)}}class G extends c.Component{constructor(e){super(e);y(this,"classNameQueue");y(this,"appliedClassNames");y(this,"_isMounted",!1);y(this,"addClass",(e,r)=>{r&&(e.classList.add(r),this.appliedClassNames.add(r))});y(this,"removeClass",(e,r)=>{r&&(e.classList.remove(r),this.appliedClassNames.delete(r))});y(this,"flushClassNameQueue",()=>{if(this._isMounted){const e=N.findDOMNode(this);e instanceof Element&&this.classNameQueue.forEach(([r,i])=>{this.removeClass(e,r),this.addClass(e,i)})}this.classNameQueue.length=0});this._isMounted=!1,this.classNameQueue=[],this.appliedClassNames=new Set,this.state={status:"mounted"}}static getDerivedStateFromProps({in:e},r){return e&&r.status==="unmounted"?{status:"mounted"}:null}componentDidMount(){this._isMounted=!0,typeof this.props.appearTimeout=="number"?this.transition("appear",this.props.appearTimeout):this.transition("enter",this.props.enterTimeout)}componentDidUpdate(e,r){e.in&&!this.props.in?this.transition("leave",this.props.leaveTimeout):!e.in&&this.props.in&&this.transition("enter",this.props.enterTimeout),r.status!=="mounted"&&this.state.status==="mounted"&&this.setState({status:"unmounted"})}componentWillUnmount(){this._isMounted=!1,this.props.schedule.clearAll()}removeAllClasses(e){for(const r of this.appliedClassNames)this.removeClass(e,r)}transition(e,r){const i=N.findDOMNode(this);if(!(i instanceof Element))return;this.removeAllClasses(i),this.props.schedule.clearAll();const a=typeof this.props.transitionStyles=="function"?this.props.transitionStyles():this.props.transitionStyles,{className:s}=j(a[e]),{className:u}=j([a[e],a[e+"Active"]]);this.addClass(i,s),this.queueClass(s,u),e==="leave"&&this.props.schedule.timeout(()=>{this._isMounted&&this.setState({status:"unmounted"})},r||0)}queueClass(e,r){this.classNameQueue.push([e,r]),this.props.schedule.timeout(this.flushClassNameQueue,0)}render(){const{status:e}=this.state;return e==="unmounted"?null:this.props.children}}const _e=ie(G);G.__docgenInfo={description:"",methods:[{name:"removeAllClasses",docblock:null,modifiers:[],params:[{name:"node",optional:!1,type:{name:"Element",alias:"Element"}}],returns:null},{name:"addClass",docblock:null,modifiers:[],params:[{name:"elem",optional:!1,type:{name:"Element",alias:"Element"}},{name:"className",optional:!1,type:{name:"string"}}],returns:{type:{name:"void"}}},{name:"removeClass",docblock:null,modifiers:[],params:[{name:"elem",optional:!1,type:{name:"Element",alias:"Element"}},{name:"className",optional:!1,type:{name:"string"}}],returns:{type:{name:"void"}}},{name:"transition",docblock:null,modifiers:[],params:[{name:"animationType",optional:!1,type:{name:"union",raw:'"appear" | "enter" | "leave"',elements:[{name:"literal",value:'"appear"'},{name:"literal",value:'"enter"'},{name:"literal",value:'"leave"'}]}},{name:"duration",optional:!0,type:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]}}],returns:null},{name:"queueClass",docblock:null,modifiers:[],params:[{name:"removeClassName",optional:!1,type:{name:"string"}},{name:"addClassName",optional:!1,type:{name:"string"}}],returns:null},{name:"flushClassNameQueue",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TransitionChild",props:{transitionStyles:{required:!0,tsType:{name:"union",raw:"AnimationStyles | (() => AnimationStyles)",elements:[{name:"signature",type:"object",raw:`{
    enter?: StyleType;
    enterActive?: StyleType;
    leave?: StyleType;
    leaveActive?: StyleType;
    appear?: StyleType;
    appearActive?: StyleType;
}`,signature:{properties:[{key:"enter",value:{name:"StyleType",required:!1}},{key:"enterActive",value:{name:"StyleType",required:!1}},{key:"leave",value:{name:"StyleType",required:!1}},{key:"leaveActive",value:{name:"StyleType",required:!1}},{key:"appear",value:{name:"StyleType",required:!1}},{key:"appearActive",value:{name:"StyleType",required:!1}}]}},{name:"unknown"}]},description:""},appearTimeout:{required:!1,tsType:{name:"number"},description:""},enterTimeout:{required:!1,tsType:{name:"number"},description:""},leaveTimeout:{required:!1,tsType:{name:"number"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},in:{required:!1,tsType:{name:"boolean"},description:""}}};class W extends c.Component{render(){const{children:t}=this.props;return o.jsx(K,{component:null,children:c.Children.map(t,e=>o.jsx(_e,{transitionStyles:this.props.transitionStyle,appearTimeout:this.props.transitionAppearTimeout,enterTimeout:this.props.transitionEnterTimeout,leaveTimeout:this.props.transitionLeaveTimeout,children:e}))})}}W.__docgenInfo={description:"",methods:[],displayName:"AphroditeCSSTransitionGroup",props:{transitionStyle:{required:!0,tsType:{name:"union",raw:"AnimationStyles | (() => AnimationStyles)",elements:[{name:"signature",type:"object",raw:`{
    enter?: StyleType;
    enterActive?: StyleType;
    leave?: StyleType;
    leaveActive?: StyleType;
    appear?: StyleType;
    appearActive?: StyleType;
}`,signature:{properties:[{key:"enter",value:{name:"StyleType",required:!1}},{key:"enterActive",value:{name:"StyleType",required:!1}},{key:"leave",value:{name:"StyleType",required:!1}},{key:"leaveActive",value:{name:"StyleType",required:!1}},{key:"appear",value:{name:"StyleType",required:!1}},{key:"appearActive",value:{name:"StyleType",required:!1}}]}},{name:"unknown"}]},description:""},transitionAppearTimeout:{required:!1,tsType:{name:"number"},description:""},transitionEnterTimeout:{required:!1,tsType:{name:"number"},description:""},transitionLeaveTimeout:{required:!1,tsType:{name:"number"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const w=200;class Y extends c.Component{constructor(){super(...arguments);y(this,"_containerRef",c.createRef());y(this,"_containerResizeObserver",null);y(this,"_throttleResize",!1);y(this,"state",{containerWidth:0});y(this,"_resize",()=>{var r;const e=((r=this._containerRef.current)==null?void 0:r.clientWidth)||0;this.setState({containerWidth:e})});y(this,"_throttleResizeHandler",()=>{this._throttleResize||(this._throttleResize=!0,setTimeout(()=>{this._resize(),this._throttleResize=!1},100))});y(this,"activate",()=>{this.props.setKeypadActive(!0)});y(this,"dismiss",()=>{var e,r;this.props.setKeypadActive(!1),(r=(e=this.props).onDismiss)==null||r.call(e)});y(this,"configure",(e,r)=>{this.setState({keypadConfig:e}),setTimeout(()=>r&&r())});y(this,"setCursor",e=>{this.setState({cursor:e})});y(this,"setKeyHandler",e=>{this.setState({keyHandler:e})});y(this,"getDOMNode",()=>N.findDOMNode(this))}componentDidMount(){var e,r;this._resize(),window.addEventListener("resize",this._throttleResizeHandler),window.addEventListener("orientationchange",this._throttleResizeHandler),"ResizeObserver"in window&&(this._containerResizeObserver=new window.ResizeObserver(this._throttleResizeHandler),this._containerRef.current&&this._containerResizeObserver.observe(this._containerRef.current)),(r=(e=this.props).onElementMounted)==null||r.call(e,{activate:this.activate,dismiss:this.dismiss,configure:this.configure,setCursor:this.setCursor,setKeyHandler:this.setKeyHandler,getDOMNode:this.getDOMNode})}componentWillUnmount(){var e;window.removeEventListener("resize",this._throttleResizeHandler),window.removeEventListener("orientationchange",this._throttleResizeHandler),(e=this._containerResizeObserver)==null||e.disconnect()}_handleClickKey(e){var i,a;if(e==="DISMISS"){this.dismiss();return}const r=(a=(i=this.state).keyHandler)==null?void 0:a.call(i,e);this.setState({cursor:r})}render(){const{keypadActive:e,style:r}=this.props,{containerWidth:i,cursor:a,keypadConfig:s}=this.state,u=[Re.keypadContainer,...Array.isArray(r)?r:[r]],l=(s==null?void 0:s.keypadType)==="EXPRESSION",d=s==null?void 0:s.times;return o.jsx(b,{style:u,forwardRef:this._containerRef,children:o.jsx(W,{transitionEnterTimeout:w,transitionLeaveTimeout:w,transitionStyle:{enter:{transform:"translate3d(0, 100%, 0)",transition:`${w}ms ease-out`},enterActive:{transform:"translate3d(0, 0, 0)"},leave:{transform:"translate3d(0, 0, 0)",transition:`${w}ms ease-out`},leaveActive:{transform:"translate3d(0, 100%, 0)"}},children:e?o.jsx(H,{onAnalyticsEvent:this.props.onAnalyticsEvent,extraKeys:s==null?void 0:s.extraKeys,onClickKey:m=>this._handleClickKey(m),cursorContext:a==null?void 0:a.context,fractionsOnly:!l,convertDotToTimes:d,divisionKey:l,trigonometry:l,preAlgebra:l,logarithms:l,basicRelations:l,advancedRelations:l,expandedView:i>P,showDismiss:!0,scientific:l&&(s==null?void 0:s.scientific)}):null})})}}const Re=T.StyleSheet.create({keypadContainer:{bottom:0,left:0,right:0,position:"fixed"}});Y.__docgenInfo={description:`This is the v2 equivalent of v1's ProvidedKeypad. It follows the same
external API so that it can be hot-swapped with the v1 keypad and
is responsible for connecting the keypad with MathInput and the Renderer.

Ideally this strategy of attaching methods on the class component for
other components to call will be replaced props/callbacks since React
doesn't support this type of code anymore (functional components
can't have methods attached to them).`,methods:[{name:"_resize",docblock:null,modifiers:[],params:[],returns:null},{name:"_throttleResizeHandler",docblock:null,modifiers:[],params:[],returns:null},{name:"activate",docblock:null,modifiers:[],params:[],returns:null},{name:"dismiss",docblock:null,modifiers:[],params:[],returns:null},{name:"configure",docblock:null,modifiers:[],params:[{name:"configuration",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"setCursor",docblock:null,modifiers:[],params:[{name:"cursor",optional:!1,type:null}],returns:null},{name:"setKeyHandler",docblock:null,modifiers:[],params:[{name:"keyHandler",optional:!1,type:null}],returns:null},{name:"getDOMNode",docblock:null,modifiers:[],params:[],returns:null},{name:"_handleClickKey",docblock:null,modifiers:[],params:[{name:"key",optional:!1,type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]",alias:"KeypadKey"}}],returns:null}],displayName:"MobileKeypadInternals"};function Ne(n){return o.jsx(z.Consumer,{children:({keypadActive:t,setKeypadActive:e})=>o.jsx(Y,{...n,keypadActive:t,setKeypadActive:e})})}Ne.__docgenInfo={description:"",methods:[],displayName:"MobileKeypad"};export{f as C,H as K,Ne as M,Ee as S,b as V,z as a,ge as c,Ge as i};
