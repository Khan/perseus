import{j as s}from"./jsx-runtime-63Ea5SlK.js";import{r as c,R as T}from"./index-6oxdNXpR.js";import{n as v}from"./no-important-xCWWYXQR.js";import{F as R}from"./index-9gkyvru-.js";import{w as ne}from"./index-OQMtW1Q1.js";import{e as re}from"./index-J2t_5nK1.js";import{V as E,_ as ae,a as ie}from"./index-_3CKOwHy.js";import{_ as se}from"./assertThisInitialized-4q6YPdh3.js";import{_ as oe}from"./index-0pCajwWr.js";import{c as q}from"./index-QHkT31Yt.js";import{T as le}from"./tabbar-UtkI9pTR.js";import{u as A,K as m}from"./button-assets-OFdVZZ8g.js";import{K as p}from"./keypad-button-46M25VLh.js";import{N as ue,O as de,G as pe}from"./operators-page-a2o7DNF2.js";import{N as ce}from"./navigation-pad-Cesbzfhi.js";var g=(n=>(n.NONE="NONE",n.IN_PARENS="IN_PARENS",n.IN_SUPER_SCRIPT="IN_SUPER_SCRIPT",n.IN_SUB_SCRIPT="IN_SUB_SCRIPT",n.IN_NUMERATOR="IN_NUMERATOR",n.IN_DENOMINATOR="IN_DENOMINATOR",n.BEFORE_FRACTION="BEFORE_FRACTION",n))(g||{});const ye=["az","cs","da","de","hu","hy","kk","ky","lt","lv","nb","sk","sr","sv","uz"],me=["fr","tr","pt-pt"];function ge(n,e){return ye.includes(n)?!1:me.includes(n)?!0:e}var j;const Ue=typeof process<"u"&&!!((j=process==null?void 0:process.env)!=null&&j.JEST_WORKER_ID),I=3;function D(n){const{extraKeys:e,onClickKey:t}=n,{strings:i}=A(),a=m(i);return s.jsx(s.Fragment,{children:e.map((r,o)=>{const l=o%I,u=o/I;return s.jsx(p,{keyConfig:a[r],onClickKey:t,coord:[l,u]},r)})})}D.__docgenInfo={description:"",methods:[],displayName:"ExtrasPage",props:{extraKeys:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeyArray)[number]"}],raw:"ReadonlyArray<Key>"},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""}}};const O=500;function P(n,e){if(!e)return null;switch(e){case g.NONE:return null;case g.IN_PARENS:return m(n).JUMP_OUT_PARENTHESES;case g.IN_SUPER_SCRIPT:return m(n).JUMP_OUT_EXPONENT;case g.IN_SUB_SCRIPT:return m(n).JUMP_OUT_BASE;case g.IN_NUMERATOR:return m(n).JUMP_OUT_NUMERATOR;case g.IN_DENOMINATOR:return m(n).JUMP_OUT_DENOMINATOR;case g.BEFORE_FRACTION:return m(n).JUMP_INTO_NUMERATOR}}function V(n){const{onClickKey:e,cursorContext:t}=n,{strings:i}=A(),a=P(i,t),r=m(i);return s.jsxs(s.Fragment,{children:[s.jsx(p,{keyConfig:r.NUM_1,onClickKey:e,coord:[0,2]}),s.jsx(p,{keyConfig:r.NUM_2,onClickKey:e,coord:[1,2]}),s.jsx(p,{keyConfig:r.NUM_3,onClickKey:e,coord:[2,2]}),s.jsx(p,{keyConfig:r.NUM_4,onClickKey:e,coord:[0,1]}),s.jsx(p,{keyConfig:r.NUM_5,onClickKey:e,coord:[1,1]}),s.jsx(p,{keyConfig:r.NUM_6,onClickKey:e,coord:[2,1]}),s.jsx(p,{keyConfig:r.NUM_7,onClickKey:e,coord:[0,0]}),s.jsx(p,{keyConfig:r.NUM_8,onClickKey:e,coord:[1,0]}),s.jsx(p,{keyConfig:r.NUM_9,onClickKey:e,coord:[2,0]}),s.jsx(p,{keyConfig:r.NUM_0,onClickKey:e,coord:[0,3]}),s.jsx(p,{keyConfig:r.DECIMAL,onClickKey:e,coord:[1,3]}),s.jsx(p,{keyConfig:r.NEGATIVE,onClickKey:e,coord:[2,3]}),s.jsx(p,{keyConfig:r.PERCENT,onClickKey:e,coord:[3,0],secondary:!0}),s.jsx(p,{keyConfig:r.PI,onClickKey:e,coord:[3,1],secondary:!0}),s.jsx(p,{keyConfig:r.FRAC,onClickKey:e,coord:[3,2],secondary:!0}),a&&s.jsx(p,{keyConfig:a,onClickKey:e,coord:[3,3],secondary:!0}),s.jsx(p,{keyConfig:r.BACKSPACE,onClickKey:e,coord:[4,3],action:!0})]})}V.__docgenInfo={description:"",methods:[],displayName:"FractionsPage",props:{onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""}}};function L(n){const{onClickKey:e,cursorContext:t,divisionKey:i,convertDotToTimes:a,selectedPage:r}=n,{strings:o,locale:l}=A(),u=P(o,t),d=m(o),y=r==="Numbers"||r==="Operators"?[3,1]:[3,0];return s.jsxs(s.Fragment,{children:[s.jsx(p,{keyConfig:d.FRAC,onClickKey:e,coord:y,secondary:!0}),s.jsx(p,{keyConfig:d.PLUS,onClickKey:e,coord:[4,0],secondary:!0}),s.jsx(p,{keyConfig:d.MINUS,onClickKey:e,coord:[5,0],secondary:!0}),s.jsx(p,{keyConfig:ge(l,!!a)?d.TIMES:d.CDOT,onClickKey:e,coord:[4,1],secondary:!0}),i&&s.jsx(p,{keyConfig:d.DIVIDE,onClickKey:e,coord:[5,1],secondary:!0}),s.jsx(p,{keyConfig:d.LEFT_PAREN,onClickKey:e,coord:[4,2],secondary:!0}),s.jsx(p,{keyConfig:d.RIGHT_PAREN,onClickKey:e,coord:[5,2],secondary:!0}),u&&s.jsx(p,{keyConfig:u,onClickKey:e,coord:[4,3],secondary:!0}),s.jsx(p,{keyConfig:d.BACKSPACE,onClickKey:e,coord:[5,3],action:!0})]})}L.__docgenInfo={description:"",methods:[],displayName:"SharedKeys",props:{onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},selectedPage:{required:!0,tsType:{name:"union",raw:`| "Geometry"
| "Operators"
| "Numbers"
| "Fractions"
| "Extras"
| "Dismiss"`,elements:[{name:"literal",value:'"Geometry"'},{name:"literal",value:'"Operators"'},{name:"literal",value:'"Numbers"'},{name:"literal",value:'"Fractions"'},{name:"literal",value:'"Extras"'},{name:"literal",value:'"Dismiss"'}]},description:""},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""},convertDotToTimes:{required:!1,tsType:{name:"boolean"},description:""},divisionKey:{required:!1,tsType:{name:"boolean"},description:""}}};function he(n){var t;if(n.fractionsOnly)return[];const e=["Numbers"];return(n.preAlgebra||n.logarithms||n.basicRelations||n.advancedRelations)&&e.push("Operators"),n.trigonometry&&e.push("Geometry"),(t=n.extraKeys)!=null&&t.length&&e.push("Extras"),e}function U({extraKeys:n=[],...e}){const t=e.fractionsOnly?"Fractions":"Numbers",[i,a]=c.useState(t),[r,o]=c.useState(!1),l=he({...e,extraKeys:n}),{onClickKey:u,cursorContext:d,convertDotToTimes:y,divisionKey:Y,preAlgebra:B,logarithms:J,basicRelations:Q,advancedRelations:$,scientific:X,showDismiss:Z,onAnalyticsEvent:S,fractionsOnly:C,expandedView:_}=e,ee=C?h.fractionsGrid:h.expressionGrid;return c.useEffect(()=>{a(t)},[C,t]),c.useEffect(()=>(r||(S({type:"math-input:keypad-opened",payload:{virtualKeypadVersion:"MATH_INPUT_KEYPAD_V2"}}),o(!0)),()=>{r&&(S({type:"math-input:keypad-closed",payload:{virtualKeypadVersion:"MATH_INPUT_KEYPAD_V2"}}),o(!1))}),[S,r]),s.jsx(E,{style:_?h.keypadOuterContainer:null,children:s.jsxs(E,{style:[h.wrapper,_?h.expandedWrapper:null],children:[s.jsx(le,{items:l,selectedItem:i,onSelectItem:te=>{a(te)},onClickClose:Z?()=>u("DISMISS"):void 0}),s.jsxs(E,{style:h.keypadInnerContainer,children:[s.jsxs(E,{style:[h.keypadGrid,ee],"aria-label":"Keypad",children:[i==="Fractions"&&s.jsx(V,{onClickKey:u,cursorContext:d}),i==="Numbers"&&s.jsx(ue,{onClickKey:u,scientific:X}),i==="Extras"&&s.jsx(D,{onClickKey:u,extraKeys:n}),i==="Operators"&&s.jsx(de,{onClickKey:u,preAlgebra:B,logarithms:J,basicRelations:Q,advancedRelations:$}),i==="Geometry"&&s.jsx(pe,{onClickKey:u}),!C&&s.jsx(L,{onClickKey:u,cursorContext:d,convertDotToTimes:y,divisionKey:Y,selectedPage:i})]}),_&&s.jsx(ce,{onClickKey:u})]})]})})}const h=v.StyleSheet.create({keypadOuterContainer:{display:"flex",alignItems:"center"},wrapper:{background:q.white},expandedWrapper:{borderWidth:"1px 1px 0 1px",borderColor:q.offBlack32,maxWidth:O,borderRadius:"3px 3px 0 0"},keypadInnerContainer:{display:"flex",flexDirection:"row",backgroundColor:"#DBDCDD"},keypadGrid:{display:"grid",gridTemplateRows:"repeat(4, 1fr)",flex:1},expressionGrid:{gridTemplateColumns:"repeat(6, 1fr)"},fractionsGrid:{gridTemplateColumns:"repeat(5, 1fr)"}});U.__docgenInfo={description:"",methods:[],displayName:"Keypad",props:{extraKeys:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeyArray)[number]"}],raw:"ReadonlyArray<Key>"},description:"",defaultValue:{value:"[]",computed:!1}},cursorContext:{required:!1,tsType:{name:"unknown[unknown]",raw:"(typeof CursorContext)[keyof typeof CursorContext]"},description:""},showDismiss:{required:!1,tsType:{name:"boolean"},description:""},expandedView:{required:!1,tsType:{name:"boolean"},description:""},convertDotToTimes:{required:!1,tsType:{name:"boolean"},description:""},divisionKey:{required:!1,tsType:{name:"boolean"},description:""},trigonometry:{required:!1,tsType:{name:"boolean"},description:""},preAlgebra:{required:!1,tsType:{name:"boolean"},description:""},logarithms:{required:!1,tsType:{name:"boolean"},description:""},basicRelations:{required:!1,tsType:{name:"boolean"},description:""},advancedRelations:{required:!1,tsType:{name:"boolean"},description:""},fractionsOnly:{required:!1,tsType:{name:"boolean"},description:""},scientific:{required:!1,tsType:{name:"boolean"},description:""},onClickKey:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: Key, event?: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]"},name:"key"},{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"event"}],return:{name:"void"}}},description:""},onAnalyticsEvent:{required:!0,tsType:{name:"signature",type:"function",raw:`(
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
// TODO(LEMS-2826): Remove this error type in LEMS-2826
| {
      type: "perseus:widget-rendering-error";
      payload: {
          widgetSubType: string;
          widgetType: string;
          widgetId: string;
          message: string;
          userAgent: string;
      };
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
    type: "perseus:widget-rendering-error";
    payload: {
        widgetSubType: string;
        widgetType: string;
        widgetId: string;
        message: string;
        userAgent: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget-rendering-error"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetSubType: string;
    widgetType: string;
    widgetId: string;
    message: string;
    userAgent: string;
}`,signature:{properties:[{key:"widgetSubType",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}},{key:"message",value:{name:"string",required:!0}},{key:"userAgent",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},name:"event"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};const H=c.createContext({setKeypadActive:n=>{},keypadActive:!1,setKeypadElement:n=>{},keypadElement:null,setRenderer:n=>{},renderer:null,setScrollableElement:n=>{},scrollableElement:null});function fe(n){const[e,t]=c.useState(!1),[i,a]=c.useState(),[r,o]=c.useState(),[l,u]=c.useState(),d=c.useMemo(()=>({keypadActive:e,setKeypadActive:t,keypadElement:i,setKeypadElement:a,renderer:r,setRenderer:o,scrollableElement:l,setScrollableElement:u}),[e,t,i,a,r,o,l,u]);return s.jsx(H.Provider,{value:d,children:n.children})}fe.__docgenInfo={description:"",methods:[],displayName:"StatefulKeypadContextProvider"};const k=class k extends c.Component{render(){const e=v.css(k.styles.initial,...Array.isArray(this.props.style)?this.props.style:[this.props.style])+(this.props.extraClassName?` ${this.props.extraClassName}`:"");return s.jsx("div",{className:e,style:this.props.dynamicStyle,onClick:this.props.onClick,onTouchCancel:this.props.onTouchCancel,onTouchEnd:this.props.onTouchEnd,onTouchMove:this.props.onTouchMove,onTouchStart:this.props.onTouchStart,"aria-label":this.props.ariaLabel,role:this.props.role,ref:this.props.forwardRef,children:this.props.children})}};k.styles=v.StyleSheet.create({initial:{alignItems:"stretch",borderWidth:0,borderStyle:"solid",boxSizing:"border-box",display:"flex",flexBasis:"auto",flexDirection:"column",margin:0,padding:0,position:"relative",backgroundColor:"transparent",color:"inherit",font:"inherit",textAlign:"inherit",textDecorationLine:"none",listStyle:"none",maxWidth:"100%",minHeight:0,minWidth:0}});let b=k;b.__docgenInfo={description:"",methods:[],displayName:"View",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},dynamicStyle:{required:!1,tsType:{name:"CSSProperties"},description:""},extraClassName:{required:!1,tsType:{name:"string"},description:""},numberOfLines:{required:!1,tsType:{name:"number"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.SyntheticEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},onTouchStart:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: React.TouchEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"ReactTouchEvent",raw:"React.TouchEvent<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},name:"arg1"}],return:{name:"void"}}},description:""},role:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},forwardRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement>",elements:[{name:"HTMLDivElement"}]},description:""}}};const M=T.createContext(null);function N(n,e){var t=function(r){return e&&c.isValidElement(r)?e(r):r},i=Object.create(null);return n&&c.Children.map(n,function(a){return a}).forEach(function(a){i[a.key]=t(a)}),i}function ve(n,e){n=n||{},e=e||{};function t(y){return y in e?e[y]:n[y]}var i=Object.create(null),a=[];for(var r in n)r in e?a.length&&(i[r]=a,a=[]):a.push(r);var o,l={};for(var u in e){if(i[u])for(o=0;o<i[u].length;o++){var d=i[u][o];l[i[u][o]]=t(d)}l[u]=t(u)}for(o=0;o<a.length;o++)l[a[o]]=t(a[o]);return l}function f(n,e,t){return t[e]!=null?t[e]:n.props[e]}function Te(n,e){return N(n.children,function(t){return c.cloneElement(t,{onExited:e.bind(null,t),in:!0,appear:f(t,"appear",n),enter:f(t,"enter",n),exit:f(t,"exit",n)})})}function Ee(n,e,t){var i=N(n.children),a=ve(e,i);return Object.keys(a).forEach(function(r){var o=a[r];if(c.isValidElement(o)){var l=r in e,u=r in i,d=e[r],y=c.isValidElement(d)&&!d.props.in;u&&(!l||y)?a[r]=c.cloneElement(o,{onExited:t.bind(null,o),in:!0,exit:f(o,"exit",n),enter:f(o,"enter",n)}):!u&&l&&!y?a[r]=c.cloneElement(o,{in:!1}):u&&l&&c.isValidElement(d)&&(a[r]=c.cloneElement(o,{onExited:t.bind(null,o),in:d.props.in,exit:f(o,"exit",n),enter:f(o,"enter",n)}))}}),a}var we=Object.values||function(n){return Object.keys(n).map(function(e){return n[e]})},be={component:"div",childFactory:function(e){return e}},x=function(n){oe(e,n);function e(i,a){var r;r=n.call(this,i,a)||this;var o=r.handleExited.bind(se(r));return r.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},r}var t=e.prototype;return t.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},t.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(a,r){var o=r.children,l=r.handleExited,u=r.firstRender;return{children:u?Te(a,l):Ee(a,o,l),firstRender:!1}},t.handleExited=function(a,r){var o=N(this.props.children);a.key in o||(a.props.onExited&&a.props.onExited(r),this.mounted&&this.setState(function(l){var u=ae({},l.children);return delete u[a.key],{children:u}}))},t.render=function(){var a=this.props,r=a.component,o=a.childFactory,l=ie(a,["component","childFactory"]),u=this.state.contextValue,d=we(this.state.children).map(o);return delete l.appear,delete l.enter,delete l.exit,r===null?T.createElement(M.Provider,{value:u},d):T.createElement(M.Provider,{value:u},T.createElement(r,l,d))},e}(T.Component);x.propTypes={};x.defaultProps=be;function z(n){const e=[];if(!n)return e;if(Array.isArray(n))for(const t of n)e.push(...z(t));else e.push(n);return e}function K(n){const e=[],t=[];if(!n)return{style:{},className:""};const i=typeof globalThis<"u"&&globalThis.SNAPSHOT_INLINE_APHRODITE;z(n).forEach(r=>{const o=r._definition;if(o!=null)if(i){const l={};for(const[u,d]of re(o))l[u.replace(/-[a-z]/g,y=>y[1].toUpperCase())]=d;t.push(l)}else e.push(r);else t.push(r)});const a=Object.assign({},...t);if(t.length>0&&!i){const r=v.StyleSheet.create({inlineStyles:a});e.push(r.inlineStyles)}return{style:i?a:{},className:v.css(...e)}}class F extends c.Component{constructor(e){super(e),this._isMounted=!1,this.addClass=(t,i)=>{i&&(t.classList.add(i),this.appliedClassNames.add(i))},this.removeClass=(t,i)=>{i&&(t.classList.remove(i),this.appliedClassNames.delete(i))},this.flushClassNameQueue=()=>{if(this._isMounted){const t=R.findDOMNode(this);t instanceof Element&&this.classNameQueue.forEach(([i,a])=>{this.removeClass(t,i),this.addClass(t,a)})}this.classNameQueue.length=0},this._isMounted=!1,this.classNameQueue=[],this.appliedClassNames=new Set,this.state={status:"mounted"}}static getDerivedStateFromProps({in:e},t){return e&&t.status==="unmounted"?{status:"mounted"}:null}componentDidMount(){this._isMounted=!0,typeof this.props.appearTimeout=="number"?this.transition("appear",this.props.appearTimeout):this.transition("enter",this.props.enterTimeout)}componentDidUpdate(e,t){e.in&&!this.props.in?this.transition("leave",this.props.leaveTimeout):!e.in&&this.props.in&&this.transition("enter",this.props.enterTimeout),t.status!=="mounted"&&this.state.status==="mounted"&&this.setState({status:"unmounted"})}componentWillUnmount(){this._isMounted=!1,this.props.schedule.clearAll()}removeAllClasses(e){for(const t of this.appliedClassNames)this.removeClass(e,t)}transition(e,t){const i=R.findDOMNode(this);if(!(i instanceof Element))return;this.removeAllClasses(i),this.props.schedule.clearAll();const a=typeof this.props.transitionStyles=="function"?this.props.transitionStyles():this.props.transitionStyles,{className:r}=K(a[e]),{className:o}=K([a[e],a[e+"Active"]]);this.addClass(i,r),this.queueClass(r,o),e==="leave"&&this.props.schedule.timeout(()=>{this._isMounted&&this.setState({status:"unmounted"})},t||0)}queueClass(e,t){this.classNameQueue.push([e,t]),this.props.schedule.timeout(this.flushClassNameQueue,0)}render(){const{status:e}=this.state;return e==="unmounted"?null:this.props.children}}const ke=ne(F);F.__docgenInfo={description:"",methods:[{name:"removeAllClasses",docblock:null,modifiers:[],params:[{name:"node",optional:!1,type:{name:"Element",alias:"Element"}}],returns:null},{name:"addClass",docblock:null,modifiers:[],params:[{name:"elem",optional:!1,type:{name:"Element",alias:"Element"}},{name:"className",optional:!1,type:{name:"string"}}],returns:{type:{name:"void"}}},{name:"removeClass",docblock:null,modifiers:[],params:[{name:"elem",optional:!1,type:{name:"Element",alias:"Element"}},{name:"className",optional:!1,type:{name:"string"}}],returns:{type:{name:"void"}}},{name:"transition",docblock:null,modifiers:[],params:[{name:"animationType",optional:!1,type:{name:"union",raw:'"appear" | "enter" | "leave"',elements:[{name:"literal",value:'"appear"'},{name:"literal",value:'"enter"'},{name:"literal",value:'"leave"'}]}},{name:"duration",optional:!0,type:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]}}],returns:null},{name:"queueClass",docblock:null,modifiers:[],params:[{name:"removeClassName",optional:!1,type:{name:"string"}},{name:"addClassName",optional:!1,type:{name:"string"}}],returns:null},{name:"flushClassNameQueue",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TransitionChild",props:{transitionStyles:{required:!0,tsType:{name:"union",raw:"AnimationStyles | (() => AnimationStyles)",elements:[{name:"signature",type:"object",raw:`{
    enter?: StyleType;
    enterActive?: StyleType;
    leave?: StyleType;
    leaveActive?: StyleType;
    appear?: StyleType;
    appearActive?: StyleType;
}`,signature:{properties:[{key:"enter",value:{name:"StyleType",required:!1}},{key:"enterActive",value:{name:"StyleType",required:!1}},{key:"leave",value:{name:"StyleType",required:!1}},{key:"leaveActive",value:{name:"StyleType",required:!1}},{key:"appear",value:{name:"StyleType",required:!1}},{key:"appearActive",value:{name:"StyleType",required:!1}}]}},{name:"unknown"}]},description:""},appearTimeout:{required:!1,tsType:{name:"number"},description:""},enterTimeout:{required:!1,tsType:{name:"number"},description:""},leaveTimeout:{required:!1,tsType:{name:"number"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},in:{required:!1,tsType:{name:"boolean"},description:""}}};class G extends c.Component{render(){const{children:e}=this.props;return s.jsx(x,{component:null,children:c.Children.map(e,t=>s.jsx(ke,{transitionStyles:this.props.transitionStyle,appearTimeout:this.props.transitionAppearTimeout,enterTimeout:this.props.transitionEnterTimeout,leaveTimeout:this.props.transitionLeaveTimeout,children:t}))})}}G.__docgenInfo={description:"",methods:[],displayName:"AphroditeCSSTransitionGroup",props:{transitionStyle:{required:!0,tsType:{name:"union",raw:"AnimationStyles | (() => AnimationStyles)",elements:[{name:"signature",type:"object",raw:`{
    enter?: StyleType;
    enterActive?: StyleType;
    leave?: StyleType;
    leaveActive?: StyleType;
    appear?: StyleType;
    appearActive?: StyleType;
}`,signature:{properties:[{key:"enter",value:{name:"StyleType",required:!1}},{key:"enterActive",value:{name:"StyleType",required:!1}},{key:"leave",value:{name:"StyleType",required:!1}},{key:"leaveActive",value:{name:"StyleType",required:!1}},{key:"appear",value:{name:"StyleType",required:!1}},{key:"appearActive",value:{name:"StyleType",required:!1}}]}},{name:"unknown"}]},description:""},transitionAppearTimeout:{required:!1,tsType:{name:"number"},description:""},transitionEnterTimeout:{required:!1,tsType:{name:"number"},description:""},transitionLeaveTimeout:{required:!1,tsType:{name:"number"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const w=200;class W extends c.Component{constructor(){super(...arguments),this._containerRef=c.createRef(),this._containerResizeObserver=null,this._throttleResize=!1,this.state={containerWidth:0},this._resize=()=>{var t;const e=((t=this._containerRef.current)==null?void 0:t.clientWidth)||0;this.setState({containerWidth:e})},this._throttleResizeHandler=()=>{this._throttleResize||(this._throttleResize=!0,setTimeout(()=>{this._resize(),this._throttleResize=!1},100))},this.activate=()=>{this.props.setKeypadActive(!0)},this.dismiss=()=>{var e,t;this.props.setKeypadActive(!1),(t=(e=this.props).onDismiss)==null||t.call(e)},this.configure=(e,t)=>{this.setState({keypadConfig:e}),setTimeout(()=>t&&t())},this.setCursor=e=>{this.setState({cursor:e})},this.setKeyHandler=e=>{this.setState({keyHandler:e})},this.getDOMNode=()=>R.findDOMNode(this)}componentDidMount(){var e,t;this._resize(),window.addEventListener("resize",this._throttleResizeHandler),window.addEventListener("orientationchange",this._throttleResizeHandler),"ResizeObserver"in window&&(this._containerResizeObserver=new window.ResizeObserver(this._throttleResizeHandler),this._containerRef.current&&this._containerResizeObserver.observe(this._containerRef.current)),(t=(e=this.props).onElementMounted)==null||t.call(e,{activate:this.activate,dismiss:this.dismiss,configure:this.configure,setCursor:this.setCursor,setKeyHandler:this.setKeyHandler,getDOMNode:this.getDOMNode})}componentWillUnmount(){var e;window.removeEventListener("resize",this._throttleResizeHandler),window.removeEventListener("orientationchange",this._throttleResizeHandler),(e=this._containerResizeObserver)==null||e.disconnect()}_handleClickKey(e){var i,a;if(e==="DISMISS"){this.dismiss();return}const t=(a=(i=this.state).keyHandler)==null?void 0:a.call(i,e);this.setState({cursor:t})}render(){const{keypadActive:e,style:t}=this.props,{containerWidth:i,cursor:a,keypadConfig:r}=this.state,o=[Se.keypadContainer,...Array.isArray(t)?t:[t]],l=(r==null?void 0:r.keypadType)==="EXPRESSION",u=r==null?void 0:r.times;return s.jsx(b,{style:o,forwardRef:this._containerRef,children:s.jsx(G,{transitionEnterTimeout:w,transitionLeaveTimeout:w,transitionStyle:{enter:{transform:"translate3d(0, 100%, 0)",transition:`${w}ms ease-out`},enterActive:{transform:"translate3d(0, 0, 0)"},leave:{transform:"translate3d(0, 0, 0)",transition:`${w}ms ease-out`},leaveActive:{transform:"translate3d(0, 100%, 0)"}},children:e?s.jsx(U,{onAnalyticsEvent:this.props.onAnalyticsEvent,extraKeys:r==null?void 0:r.extraKeys,onClickKey:d=>this._handleClickKey(d),cursorContext:a==null?void 0:a.context,fractionsOnly:!l,convertDotToTimes:u,divisionKey:l,trigonometry:l,preAlgebra:l,logarithms:l,basicRelations:l,advancedRelations:l,expandedView:i>O,showDismiss:!0,scientific:l&&(r==null?void 0:r.scientific)}):null})})}}const Se=v.StyleSheet.create({keypadContainer:{bottom:0,left:0,right:0,position:"fixed"}});W.__docgenInfo={description:`This is the v2 equivalent of v1's ProvidedKeypad. It follows the same
external API so that it can be hot-swapped with the v1 keypad and
is responsible for connecting the keypad with MathInput and the Renderer.

Ideally this strategy of attaching methods on the class component for
other components to call will be replaced props/callbacks since React
doesn't support this type of code anymore (functional components
can't have methods attached to them).`,methods:[{name:"_resize",docblock:null,modifiers:[],params:[],returns:null},{name:"_throttleResizeHandler",docblock:null,modifiers:[],params:[],returns:null},{name:"activate",docblock:null,modifiers:[],params:[],returns:null},{name:"dismiss",docblock:null,modifiers:[],params:[],returns:null},{name:"configure",docblock:null,modifiers:[],params:[{name:"configuration",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"setCursor",docblock:null,modifiers:[],params:[{name:"cursor",optional:!1,type:null}],returns:null},{name:"setKeyHandler",docblock:null,modifiers:[],params:[{name:"keyHandler",optional:!1,type:null}],returns:null},{name:"getDOMNode",docblock:null,modifiers:[],params:[],returns:null},{name:"_handleClickKey",docblock:null,modifiers:[],params:[{name:"key",optional:!1,type:{name:"unknown[number]",raw:"(typeof KeyArray)[number]",alias:"Key"}}],returns:null}],displayName:"MobileKeypadInternals"};function Ce(n){return s.jsx(H.Consumer,{children:({keypadActive:e,setKeypadActive:t})=>s.jsx(W,{...n,keypadActive:e,setKeypadActive:t})})}Ce.__docgenInfo={description:"",methods:[],displayName:"MobileKeypad"};export{g as C,U as K,Ce as M,fe as S,b as V,H as a,ge as c,Ue as i};
