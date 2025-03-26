import{r as a,R as v}from"./index-6oxdNXpR.js";import{n as g}from"./no-important-xCWWYXQR.js";import{F as _}from"./index-9gkyvru-.js";import{w as te}from"./index-OQMtW1Q1.js";import{e as ne}from"./index-J2t_5nK1.js";import{V as T,_ as re,a as ae}from"./index-hw7d7wq0.js";import{_ as ie}from"./assertThisInitialized-4q6YPdh3.js";import{_ as se}from"./index-OMSOgf8r.js";import{c as K}from"./index-zRqVZh6A.js";import{T as oe}from"./tabbar-B0kYgJj9.js";import{u as R,K as m}from"./button-assets-L8ov_9cF.js";import{K as p}from"./keypad-button-SQB6sX9u.js";import{N as le,O as ue,G as de}from"./operators-page-LLpnvJeI.js";import{N as pe}from"./navigation-pad-mlqM3fWh.js";var y=(n=>(n.NONE="NONE",n.IN_PARENS="IN_PARENS",n.IN_SUPER_SCRIPT="IN_SUPER_SCRIPT",n.IN_SUB_SCRIPT="IN_SUB_SCRIPT",n.IN_NUMERATOR="IN_NUMERATOR",n.IN_DENOMINATOR="IN_DENOMINATOR",n.BEFORE_FRACTION="BEFORE_FRACTION",n))(y||{});const ce=["az","cs","da","de","hu","hy","kk","ky","lt","lv","nb","sk","sr","sv","uz"],me=["fr","tr","pt-pt"];function ye(n,e){return ce.includes(n)?!1:me.includes(n)?!0:e}var D;const Le=typeof process<"u"&&!!((D=process==null?void 0:process.env)!=null&&D.JEST_WORKER_ID),q=3;function O(n){const{extraKeys:e,onClickKey:t}=n,{strings:s}=R(),i=m(s);return a.createElement(a.Fragment,null,e.map((r,o)=>{const l=o%q,u=o/q;return a.createElement(p,{key:r,keyConfig:i[r],onClickKey:t,coord:[l,u]})}))}O.__docgenInfo={description:"",methods:[],displayName:"ExtrasPage",props:{extraKeys:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>"},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""}}};const x=500;function P(n,e){if(!e)return null;switch(e){case y.NONE:return null;case y.IN_PARENS:return m(n).JUMP_OUT_PARENTHESES;case y.IN_SUPER_SCRIPT:return m(n).JUMP_OUT_EXPONENT;case y.IN_SUB_SCRIPT:return m(n).JUMP_OUT_BASE;case y.IN_NUMERATOR:return m(n).JUMP_OUT_NUMERATOR;case y.IN_DENOMINATOR:return m(n).JUMP_OUT_DENOMINATOR;case y.BEFORE_FRACTION:return m(n).JUMP_INTO_NUMERATOR}}function V(n){const{onClickKey:e,cursorContext:t}=n,{strings:s}=R(),i=P(s,t),r=m(s);return a.createElement(a.Fragment,null,a.createElement(p,{keyConfig:r.NUM_1,onClickKey:e,coord:[0,2]}),a.createElement(p,{keyConfig:r.NUM_2,onClickKey:e,coord:[1,2]}),a.createElement(p,{keyConfig:r.NUM_3,onClickKey:e,coord:[2,2]}),a.createElement(p,{keyConfig:r.NUM_4,onClickKey:e,coord:[0,1]}),a.createElement(p,{keyConfig:r.NUM_5,onClickKey:e,coord:[1,1]}),a.createElement(p,{keyConfig:r.NUM_6,onClickKey:e,coord:[2,1]}),a.createElement(p,{keyConfig:r.NUM_7,onClickKey:e,coord:[0,0]}),a.createElement(p,{keyConfig:r.NUM_8,onClickKey:e,coord:[1,0]}),a.createElement(p,{keyConfig:r.NUM_9,onClickKey:e,coord:[2,0]}),a.createElement(p,{keyConfig:r.NUM_0,onClickKey:e,coord:[0,3]}),a.createElement(p,{keyConfig:r.DECIMAL,onClickKey:e,coord:[1,3]}),a.createElement(p,{keyConfig:r.NEGATIVE,onClickKey:e,coord:[2,3]}),a.createElement(p,{keyConfig:r.PERCENT,onClickKey:e,coord:[3,0],secondary:!0}),a.createElement(p,{keyConfig:r.PI,onClickKey:e,coord:[3,1],secondary:!0}),a.createElement(p,{keyConfig:r.FRAC,onClickKey:e,coord:[3,2],secondary:!0}),i&&a.createElement(p,{keyConfig:i,onClickKey:e,coord:[3,3],secondary:!0}),a.createElement(p,{keyConfig:r.BACKSPACE,onClickKey:e,coord:[4,3],action:!0}))}V.__docgenInfo={description:"",methods:[],displayName:"FractionsPage",props:{onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""}}};function L(n){const{onClickKey:e,cursorContext:t,divisionKey:s,convertDotToTimes:i,selectedPage:r}=n,{strings:o,locale:l}=R(),u=P(o,t),d=m(o),c=r==="Numbers"||r==="Operators"?[3,1]:[3,0];return a.createElement(a.Fragment,null,a.createElement(p,{keyConfig:d.FRAC,onClickKey:e,coord:c,secondary:!0}),a.createElement(p,{keyConfig:d.PLUS,onClickKey:e,coord:[4,0],secondary:!0}),a.createElement(p,{keyConfig:d.MINUS,onClickKey:e,coord:[5,0],secondary:!0}),a.createElement(p,{keyConfig:ye(l,!!i)?d.TIMES:d.CDOT,onClickKey:e,coord:[4,1],secondary:!0}),s&&a.createElement(p,{keyConfig:d.DIVIDE,onClickKey:e,coord:[5,1],secondary:!0}),a.createElement(p,{keyConfig:d.LEFT_PAREN,onClickKey:e,coord:[4,2],secondary:!0}),a.createElement(p,{keyConfig:d.RIGHT_PAREN,onClickKey:e,coord:[5,2],secondary:!0}),u&&a.createElement(p,{keyConfig:u,onClickKey:e,coord:[4,3],secondary:!0}),a.createElement(p,{keyConfig:d.BACKSPACE,onClickKey:e,coord:[5,3],secondary:!0}))}L.__docgenInfo={description:"",methods:[],displayName:"SharedKeys",props:{onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},selectedPage:{required:!0,tsType:{name:"union",raw:`| "Geometry"
| "Operators"
| "Numbers"
| "Fractions"
| "Extras"
| "Dismiss"`,elements:[{name:"literal",value:'"Geometry"'},{name:"literal",value:'"Operators"'},{name:"literal",value:'"Numbers"'},{name:"literal",value:'"Fractions"'},{name:"literal",value:'"Extras"'},{name:"literal",value:'"Dismiss"'}]},description:""},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""},convertDotToTimes:{required:!1,tsType:{name:"boolean"},description:""},divisionKey:{required:!1,tsType:{name:"boolean"},description:""}}};function he(n){var t;if(n.fractionsOnly)return[];const e=["Numbers"];return(n.preAlgebra||n.logarithms||n.basicRelations||n.advancedRelations)&&e.push("Operators"),n.trigonometry&&e.push("Geometry"),(t=n.extraKeys)!=null&&t.length&&e.push("Extras"),e}function U({extraKeys:n=[],...e}){const t=e.fractionsOnly?"Fractions":"Numbers",[s,i]=a.useState(t),[r,o]=a.useState(!1),l=he({...e,extraKeys:n}),{onClickKey:u,cursorContext:d,convertDotToTimes:c,divisionKey:W,preAlgebra:Y,logarithms:B,basicRelations:J,advancedRelations:Q,scientific:$,showDismiss:X,onAnalyticsEvent:k,fractionsOnly:S,expandedView:C}=e,Z=S?h.fractionsGrid:h.expressionGrid;return a.useEffect(()=>{i(t)},[S,t]),a.useEffect(()=>(r||(k({type:"math-input:keypad-opened",payload:{virtualKeypadVersion:"MATH_INPUT_KEYPAD_V2"}}),o(!0)),()=>{r&&(k({type:"math-input:keypad-closed",payload:{virtualKeypadVersion:"MATH_INPUT_KEYPAD_V2"}}),o(!1))}),[k,r]),a.createElement(T,{style:C?h.keypadOuterContainer:null},a.createElement(T,{style:[h.wrapper,C?h.expandedWrapper:null]},a.createElement(oe,{items:l,selectedItem:s,onSelectItem:ee=>{i(ee)},onClickClose:X?()=>u("DISMISS"):void 0}),a.createElement(T,{style:h.keypadInnerContainer},a.createElement(T,{style:[h.keypadGrid,Z],"aria-label":"Keypad"},s==="Fractions"&&a.createElement(V,{onClickKey:u,cursorContext:d}),s==="Numbers"&&a.createElement(le,{onClickKey:u,scientific:$}),s==="Extras"&&a.createElement(O,{onClickKey:u,extraKeys:n}),s==="Operators"&&a.createElement(ue,{onClickKey:u,preAlgebra:Y,logarithms:B,basicRelations:J,advancedRelations:Q}),s==="Geometry"&&a.createElement(de,{onClickKey:u}),!S&&a.createElement(L,{onClickKey:u,cursorContext:d,convertDotToTimes:c,divisionKey:W,selectedPage:s})),C&&a.createElement(pe,{onClickKey:u}))))}const h=g.StyleSheet.create({keypadOuterContainer:{display:"flex",alignItems:"center"},wrapper:{background:K.white},expandedWrapper:{borderWidth:"1px 1px 0 1px",borderColor:K.offBlack32,maxWidth:x,borderRadius:"3px 3px 0 0"},keypadInnerContainer:{display:"flex",flexDirection:"row",backgroundColor:"#DBDCDD"},keypadGrid:{display:"grid",gridTemplateRows:"repeat(4, 1fr)",flex:1},expressionGrid:{gridTemplateColumns:"repeat(6, 1fr)"},fractionsGrid:{gridTemplateColumns:"repeat(5, 1fr)"}});U.__docgenInfo={description:"",methods:[],displayName:"Keypad",props:{extraKeys:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>"},description:"",defaultValue:{value:"[]",computed:!1}},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""},showDismiss:{required:!1,tsType:{name:"boolean"},description:""},expandedView:{required:!1,tsType:{name:"boolean"},description:""},convertDotToTimes:{required:!1,tsType:{name:"boolean"},description:""},divisionKey:{required:!1,tsType:{name:"boolean"},description:""},trigonometry:{required:!1,tsType:{name:"boolean"},description:""},preAlgebra:{required:!1,tsType:{name:"boolean"},description:""},logarithms:{required:!1,tsType:{name:"boolean"},description:""},basicRelations:{required:!1,tsType:{name:"boolean"},description:""},advancedRelations:{required:!1,tsType:{name:"boolean"},description:""},fractionsOnly:{required:!1,tsType:{name:"boolean"},description:""},scientific:{required:!1,tsType:{name:"boolean"},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    key: KeypadKey,
    event?: React.SyntheticEvent,
) => void`,signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},onAnalyticsEvent:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    event: PerseusAnalyticsEvent,
) => Promise<void>`,signature:{arguments:[{type:{name:"union",raw:`| {
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
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},name:"event"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};const H=a.createContext({setKeypadActive:n=>{},keypadActive:!1,setKeypadElement:n=>{},keypadElement:null,setRenderer:n=>{},renderer:null,setScrollableElement:n=>{},scrollableElement:null});function fe(n){const[e,t]=a.useState(!1),[s,i]=a.useState(),[r,o]=a.useState(),[l,u]=a.useState(),d=a.useMemo(()=>({keypadActive:e,setKeypadActive:t,keypadElement:s,setKeypadElement:i,renderer:r,setRenderer:o,scrollableElement:l,setScrollableElement:u}),[e,t,s,i,r,o,l,u]);return a.createElement(H.Provider,{value:d},n.children)}fe.__docgenInfo={description:"",methods:[],displayName:"StatefulKeypadContextProvider"};const b=class b extends a.Component{render(){const e=g.css(b.styles.initial,...Array.isArray(this.props.style)?this.props.style:[this.props.style])+(this.props.extraClassName?` ${this.props.extraClassName}`:"");return a.createElement("div",{className:e,style:this.props.dynamicStyle,onClick:this.props.onClick,onTouchCancel:this.props.onTouchCancel,onTouchEnd:this.props.onTouchEnd,onTouchMove:this.props.onTouchMove,onTouchStart:this.props.onTouchStart,"aria-label":this.props.ariaLabel,role:this.props.role,ref:this.props.forwardRef},this.props.children)}};b.styles=g.StyleSheet.create({initial:{alignItems:"stretch",borderWidth:0,borderStyle:"solid",boxSizing:"border-box",display:"flex",flexBasis:"auto",flexDirection:"column",margin:0,padding:0,position:"relative",backgroundColor:"transparent",color:"inherit",font:"inherit",textAlign:"inherit",textDecorationLine:"none",listStyle:"none",maxWidth:"100%",minHeight:0,minWidth:0}});let w=b;w.__docgenInfo={description:"",methods:[],displayName:"View",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dynamicStyle:{required:!1,tsType:{name:"CSSProperties"},description:""},extraClassName:{required:!1,tsType:{name:"string"},description:""},numberOfLines:{required:!1,tsType:{name:"number"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.SyntheticEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchStart:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},role:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},forwardRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},description:""}}};const M=v.createContext(null);function N(n,e){var t=function(r){return e&&a.isValidElement(r)?e(r):r},s=Object.create(null);return n&&a.Children.map(n,function(i){return i}).forEach(function(i){s[i.key]=t(i)}),s}function ge(n,e){n=n||{},e=e||{};function t(c){return c in e?e[c]:n[c]}var s=Object.create(null),i=[];for(var r in n)r in e?i.length&&(s[r]=i,i=[]):i.push(r);var o,l={};for(var u in e){if(s[u])for(o=0;o<s[u].length;o++){var d=s[u][o];l[s[u][o]]=t(d)}l[u]=t(u)}for(o=0;o<i.length;o++)l[i[o]]=t(i[o]);return l}function f(n,e,t){return t[e]!=null?t[e]:n.props[e]}function ve(n,e){return N(n.children,function(t){return a.cloneElement(t,{onExited:e.bind(null,t),in:!0,appear:f(t,"appear",n),enter:f(t,"enter",n),exit:f(t,"exit",n)})})}function Te(n,e,t){var s=N(n.children),i=ge(e,s);return Object.keys(i).forEach(function(r){var o=i[r];if(a.isValidElement(o)){var l=r in e,u=r in s,d=e[r],c=a.isValidElement(d)&&!d.props.in;u&&(!l||c)?i[r]=a.cloneElement(o,{onExited:t.bind(null,o),in:!0,exit:f(o,"exit",n),enter:f(o,"enter",n)}):!u&&l&&!c?i[r]=a.cloneElement(o,{in:!1}):u&&l&&a.isValidElement(d)&&(i[r]=a.cloneElement(o,{onExited:t.bind(null,o),in:d.props.in,exit:f(o,"exit",n),enter:f(o,"enter",n)}))}}),i}var Ee=Object.values||function(n){return Object.keys(n).map(function(e){return n[e]})},we={component:"div",childFactory:function(e){return e}},A=function(n){se(e,n);function e(s,i){var r;r=n.call(this,s,i)||this;var o=r.handleExited.bind(ie(r));return r.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},r}var t=e.prototype;return t.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},t.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(i,r){var o=r.children,l=r.handleExited,u=r.firstRender;return{children:u?ve(i,l):Te(i,o,l),firstRender:!1}},t.handleExited=function(i,r){var o=N(this.props.children);i.key in o||(i.props.onExited&&i.props.onExited(r),this.mounted&&this.setState(function(l){var u=re({},l.children);return delete u[i.key],{children:u}}))},t.render=function(){var i=this.props,r=i.component,o=i.childFactory,l=ae(i,["component","childFactory"]),u=this.state.contextValue,d=Ee(this.state.children).map(o);return delete l.appear,delete l.enter,delete l.exit,r===null?v.createElement(M.Provider,{value:u},d):v.createElement(M.Provider,{value:u},v.createElement(r,l,d))},e}(v.Component);A.propTypes={};A.defaultProps=we;function j(n){const e=[];if(!n)return e;if(Array.isArray(n))for(const t of n)e.push(...j(t));else e.push(n);return e}function I(n){const e=[],t=[];if(!n)return{style:{},className:""};const s=typeof globalThis<"u"&&globalThis.SNAPSHOT_INLINE_APHRODITE;j(n).forEach(r=>{const o=r._definition;if(o!=null)if(s){const l={};for(const[u,d]of ne(o))l[u.replace(/-[a-z]/g,c=>c[1].toUpperCase())]=d;t.push(l)}else e.push(r);else t.push(r)});const i=Object.assign({},...t);if(t.length>0&&!s){const r=g.StyleSheet.create({inlineStyles:i});e.push(r.inlineStyles)}return{style:s?i:{},className:g.css(...e)}}class z extends a.Component{constructor(e){super(e),this._isMounted=!1,this.addClass=(t,s)=>{s&&(t.classList.add(s),this.appliedClassNames.add(s))},this.removeClass=(t,s)=>{s&&(t.classList.remove(s),this.appliedClassNames.delete(s))},this.flushClassNameQueue=()=>{if(this._isMounted){const t=_.findDOMNode(this);t instanceof Element&&this.classNameQueue.forEach(([s,i])=>{this.removeClass(t,s),this.addClass(t,i)})}this.classNameQueue.length=0},this._isMounted=!1,this.classNameQueue=[],this.appliedClassNames=new Set,this.state={status:"mounted"}}static getDerivedStateFromProps({in:e},t){return e&&t.status==="unmounted"?{status:"mounted"}:null}componentDidMount(){this._isMounted=!0,typeof this.props.appearTimeout=="number"?this.transition("appear",this.props.appearTimeout):this.transition("enter",this.props.enterTimeout)}componentDidUpdate(e,t){e.in&&!this.props.in?this.transition("leave",this.props.leaveTimeout):!e.in&&this.props.in&&this.transition("enter",this.props.enterTimeout),t.status!=="mounted"&&this.state.status==="mounted"&&this.setState({status:"unmounted"})}componentWillUnmount(){this._isMounted=!1,this.props.schedule.clearAll()}removeAllClasses(e){for(const t of this.appliedClassNames)this.removeClass(e,t)}transition(e,t){const s=_.findDOMNode(this);if(!(s instanceof Element))return;this.removeAllClasses(s),this.props.schedule.clearAll();const i=typeof this.props.transitionStyles=="function"?this.props.transitionStyles():this.props.transitionStyles,{className:r}=I(i[e]),{className:o}=I([i[e],i[e+"Active"]]);this.addClass(s,r),this.queueClass(r,o),e==="leave"&&this.props.schedule.timeout(()=>{this._isMounted&&this.setState({status:"unmounted"})},t||0)}queueClass(e,t){this.classNameQueue.push([e,t]),this.props.schedule.timeout(this.flushClassNameQueue,0)}render(){const{status:e}=this.state;return e==="unmounted"?null:this.props.children}}const be=te(z);z.__docgenInfo={description:"",methods:[{name:"removeAllClasses",docblock:null,modifiers:[],params:[{name:"node",optional:!1,type:{name:"Element",alias:"Element"}}],returns:null},{name:"addClass",docblock:null,modifiers:[],params:[{name:"elem",optional:!1,type:{name:"Element",alias:"Element"}},{name:"className",optional:!1,type:{name:"string"}}],returns:{type:{name:"void"}}},{name:"removeClass",docblock:null,modifiers:[],params:[{name:"elem",optional:!1,type:{name:"Element",alias:"Element"}},{name:"className",optional:!1,type:{name:"string"}}],returns:{type:{name:"void"}}},{name:"transition",docblock:null,modifiers:[],params:[{name:"animationType",optional:!1,type:{name:"union",raw:'"appear" | "enter" | "leave"',elements:[{name:"literal",value:'"appear"'},{name:"literal",value:'"enter"'},{name:"literal",value:'"leave"'}]}},{name:"duration",optional:!0,type:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]}}],returns:null},{name:"queueClass",docblock:null,modifiers:[],params:[{name:"removeClassName",optional:!1,type:{name:"string"}},{name:"addClassName",optional:!1,type:{name:"string"}}],returns:null},{name:"flushClassNameQueue",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TransitionChild",props:{transitionStyles:{required:!0,tsType:{name:"union",raw:"AnimationStyles | (() => AnimationStyles)",elements:[{name:"signature",type:"object",raw:`{
    enter?: StyleType;
    enterActive?: StyleType;
    leave?: StyleType;
    leaveActive?: StyleType;
    appear?: StyleType;
    appearActive?: StyleType;
}`,signature:{properties:[{key:"enter",value:{name:"StyleType",required:!1}},{key:"enterActive",value:{name:"StyleType",required:!1}},{key:"leave",value:{name:"StyleType",required:!1}},{key:"leaveActive",value:{name:"StyleType",required:!1}},{key:"appear",value:{name:"StyleType",required:!1}},{key:"appearActive",value:{name:"StyleType",required:!1}}]}},{name:"unknown"}]},description:""},appearTimeout:{required:!1,tsType:{name:"number"},description:""},enterTimeout:{required:!1,tsType:{name:"number"},description:""},leaveTimeout:{required:!1,tsType:{name:"number"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},in:{required:!1,tsType:{name:"boolean"},description:""}}};class F extends a.Component{render(){const{children:e}=this.props;return a.createElement(A,{component:null},a.Children.map(e,t=>a.createElement(be,{transitionStyles:this.props.transitionStyle,appearTimeout:this.props.transitionAppearTimeout,enterTimeout:this.props.transitionEnterTimeout,leaveTimeout:this.props.transitionLeaveTimeout},t)))}}F.__docgenInfo={description:"",methods:[],displayName:"AphroditeCSSTransitionGroup",props:{transitionStyle:{required:!0,tsType:{name:"union",raw:"AnimationStyles | (() => AnimationStyles)",elements:[{name:"signature",type:"object",raw:`{
    enter?: StyleType;
    enterActive?: StyleType;
    leave?: StyleType;
    leaveActive?: StyleType;
    appear?: StyleType;
    appearActive?: StyleType;
}`,signature:{properties:[{key:"enter",value:{name:"StyleType",required:!1}},{key:"enterActive",value:{name:"StyleType",required:!1}},{key:"leave",value:{name:"StyleType",required:!1}},{key:"leaveActive",value:{name:"StyleType",required:!1}},{key:"appear",value:{name:"StyleType",required:!1}},{key:"appearActive",value:{name:"StyleType",required:!1}}]}},{name:"unknown"}]},description:""},transitionAppearTimeout:{required:!1,tsType:{name:"number"},description:""},transitionEnterTimeout:{required:!1,tsType:{name:"number"},description:""},transitionLeaveTimeout:{required:!1,tsType:{name:"number"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const E=200;class G extends a.Component{constructor(){super(...arguments),this._containerRef=a.createRef(),this._containerResizeObserver=null,this._throttleResize=!1,this.state={containerWidth:0},this._resize=()=>{var t;const e=((t=this._containerRef.current)==null?void 0:t.clientWidth)||0;this.setState({containerWidth:e})},this._throttleResizeHandler=()=>{this._throttleResize||(this._throttleResize=!0,setTimeout(()=>{this._resize(),this._throttleResize=!1},100))},this.activate=()=>{this.props.setKeypadActive(!0)},this.dismiss=()=>{var e,t;this.props.setKeypadActive(!1),(t=(e=this.props).onDismiss)==null||t.call(e)},this.configure=(e,t)=>{this.setState({keypadConfig:e}),setTimeout(()=>t&&t())},this.setCursor=e=>{this.setState({cursor:e})},this.setKeyHandler=e=>{this.setState({keyHandler:e})},this.getDOMNode=()=>_.findDOMNode(this)}componentDidMount(){var e,t;this._resize(),window.addEventListener("resize",this._throttleResizeHandler),window.addEventListener("orientationchange",this._throttleResizeHandler),"ResizeObserver"in window&&(this._containerResizeObserver=new window.ResizeObserver(this._throttleResizeHandler),this._containerRef.current&&this._containerResizeObserver.observe(this._containerRef.current)),(t=(e=this.props).onElementMounted)==null||t.call(e,{activate:this.activate,dismiss:this.dismiss,configure:this.configure,setCursor:this.setCursor,setKeyHandler:this.setKeyHandler,getDOMNode:this.getDOMNode})}componentWillUnmount(){var e;window.removeEventListener("resize",this._throttleResizeHandler),window.removeEventListener("orientationchange",this._throttleResizeHandler),(e=this._containerResizeObserver)==null||e.disconnect()}_handleClickKey(e){var s,i;if(e==="DISMISS"){this.dismiss();return}const t=(i=(s=this.state).keyHandler)==null?void 0:i.call(s,e);this.setState({cursor:t})}render(){const{keypadActive:e,style:t}=this.props,{containerWidth:s,cursor:i,keypadConfig:r}=this.state,o=[ke.keypadContainer,...Array.isArray(t)?t:[t]],l=(r==null?void 0:r.keypadType)==="EXPRESSION",u=r==null?void 0:r.times;return a.createElement(w,{style:o,forwardRef:this._containerRef},a.createElement(F,{transitionEnterTimeout:E,transitionLeaveTimeout:E,transitionStyle:{enter:{transform:"translate3d(0, 100%, 0)",transition:`${E}ms ease-out`},enterActive:{transform:"translate3d(0, 0, 0)"},leave:{transform:"translate3d(0, 0, 0)",transition:`${E}ms ease-out`},leaveActive:{transform:"translate3d(0, 100%, 0)"}}},e?a.createElement(U,{onAnalyticsEvent:this.props.onAnalyticsEvent,extraKeys:r==null?void 0:r.extraKeys,onClickKey:d=>this._handleClickKey(d),cursorContext:i==null?void 0:i.context,fractionsOnly:!l,convertDotToTimes:u,divisionKey:l,trigonometry:l,preAlgebra:l,logarithms:l,basicRelations:l,advancedRelations:l,expandedView:s>x,showDismiss:!0,scientific:l&&(r==null?void 0:r.scientific)}):null))}}const ke=g.StyleSheet.create({keypadContainer:{bottom:0,left:0,right:0,position:"fixed"}});G.__docgenInfo={description:`This is the v2 equivalent of v1's ProvidedKeypad. It follows the same
external API so that it can be hot-swapped with the v1 keypad and
is responsible for connecting the keypad with MathInput and the Renderer.

Ideally this strategy of attaching methods on the class component for
other components to call will be replaced props/callbacks since React
doesn't support this type of code anymore (functional components
can't have methods attached to them).`,methods:[{name:"_resize",docblock:null,modifiers:[],params:[],returns:null},{name:"_throttleResizeHandler",docblock:null,modifiers:[],params:[],returns:null},{name:"activate",docblock:null,modifiers:[],params:[],returns:null},{name:"dismiss",docblock:null,modifiers:[],params:[],returns:null},{name:"configure",docblock:null,modifiers:[],params:[{name:"configuration",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"setCursor",docblock:null,modifiers:[],params:[{name:"cursor",optional:!1,type:null}],returns:null},{name:"setKeyHandler",docblock:null,modifiers:[],params:[{name:"keyHandler",optional:!1,type:null}],returns:null},{name:"getDOMNode",docblock:null,modifiers:[],params:[],returns:null},{name:"_handleClickKey",docblock:null,modifiers:[],params:[{name:"key",optional:!1,type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]",alias:"KeypadKey"}}],returns:null}],displayName:"MobileKeypadInternals"};function Se(n){return a.createElement(H.Consumer,null,({keypadActive:e,setKeypadActive:t})=>a.createElement(G,{...n,keypadActive:e,setKeypadActive:t}))}Se.__docgenInfo={description:"",methods:[],displayName:"MobileKeypad"};export{y as C,U as K,Se as M,fe as S,w as V,H as a,ye as c,Le as i};
