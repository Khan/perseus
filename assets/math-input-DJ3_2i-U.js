var V=Object.defineProperty;var A=(a,t,e)=>t in a?V(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var l=(a,t,e)=>(A(a,typeof t!="symbol"?t+"":t,e),e);import{j as s}from"./jsx-runtime-BT65X5dW.js";import"./prop-types-DJauriGs.js";import{g as w,c as S,a as m,m as C}from"./key-translator-CvWrtXQI.js";import{C as E,K as I,c as j}from"./mobile-keypad-cn5_O5Gq.js";import{M as R}from"./button-assets-CTkWLD9I.js";import{C as D}from"./index-CazpBUXm.js";import{V as q}from"./index-CW2s7ekB.js";import{P,a as M}from"./index-BXjKE-B5.js";import{s as f,c as p}from"./index-Ds5N5m2R.js";import{c as F}from"./index-CFvGmn7i.js";import{n as K}from"./no-important-DlFk8a1I.js";import{c as O}from"./index-D7h-teXI.js";import{$ as N}from"./jquery-CkHB0_Mt.js";import{r as h}from"./index-C6mWTJJr.js";import{_ as L}from"./underscore-U-AHniOr.js";import{a as U}from"./i18n-context-3AkWzTTj.js";var n=[];for(var g=0;g<256;++g)n.push((g+256).toString(16).slice(1));function B(a,t=0){return(n[a[t+0]]+n[a[t+1]]+n[a[t+2]]+n[a[t+3]]+"-"+n[a[t+4]]+n[a[t+5]]+"-"+n[a[t+6]]+n[a[t+7]]+"-"+n[a[t+8]]+n[a[t+9]]+"-"+n[a[t+10]]+n[a[t+11]]+n[a[t+12]]+n[a[t+13]]+n[a[t+14]]+n[a[t+15]]).toLowerCase()}var y,H=new Uint8Array(16);function W(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(H)}var Y=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const k={randomUUID:Y};function Z(a,t,e){if(k.randomUUID&&!a)return k.randomUUID();a=a||{};var r=a.random||(a.rng||W)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,B(r)}const $=K.StyleSheet.create({srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}}),z=(a,t)=>{let e=null;return(...r)=>{e&&clearTimeout(e),e=window.setTimeout(()=>{a(...r)},t)}};class v extends h.Component{constructor(){super(...arguments);l(this,"mouseDown");l(this,"__mathFieldWrapperRef",null);l(this,"__mathField",null);l(this,"state",{focused:!1,keypadOpen:this.props.buttonsVisible==="always",cursorContext:E.NONE});l(this,"insert",e=>{const r=this.mathField(),{locale:i}=this.context,o={...w(i,this.context.strings),FRAC:d=>{const _=d.latex();d.typedText("/"),d.latex()===_&&d.cmd("\\frac")}}[e];if(o){o(r,e),r==null||r.focus();return}L(e).isFunction()?e(r):e[0]==="\\"?r==null||r.cmd(e).focus():r==null||r.write(e).focus(),r==null||r.focus()});l(this,"mathField",()=>{var e;if(!this.__mathField&&this.__mathFieldWrapperRef){const{locale:r}=this.context;this.__mathField=S(this.__mathFieldWrapperRef,r,this.props.mathInputStrings,i=>({...i,handlers:{edit:z(u=>{let o=u.latex();if(o=o.replace(/<>/g,"\\ne"),j(r,this.props.convertDotToTimes)){o=o.replace(/\\cdot/g,"\\times");const d=u.cursor()[C.L];d&&d.ctrlSeq==="\\cdot "&&(u.controller().backspace(),u.cmd("\\times"))}else o=o.replace(/\\times/g,"\\cdot");this.props.value!==o&&this.props.onChange(o),this.setState({cursorContext:m(u)})},100),enter:()=>{this.__mathFieldWrapperRef&&N(this.__mathFieldWrapperRef).submit()},upOutOf:u=>{u.typedText("^")}}}))}return(e=this.__mathField)==null||e.setAriaLabel(this.props.ariaLabel),this.__mathField});l(this,"focus",()=>{var e;(e=this.mathField())==null||e.focus(),this.setState({focused:!0})});l(this,"blur",()=>this.setState({focused:!1}));l(this,"handleKeypadPress",(e,r)=>{const{locale:i}=this.context,u=w(i,this.context.strings)[e],o=this.mathField();o&&(u&&u(o,e),this.setState({cursorContext:m(o)})),(r==null?void 0:r.type)==="click"&&this.focus(),e==="DISMISS"&&this.closeKeypad()})}componentDidMount(){var e;(e=this.mathField())==null||e.latex(this.props.value)}openKeypad(){this.props.buttonsVisible!=="never"&&this.setState({keypadOpen:!0})}closeKeypad(){this.setState({keypadOpen:!1})}render(){let e=O({"perseus-math-input":!0,"mq-editable-field":!0,"mq-math-mode":!0});const r=Z().slice(0,8);return this.props.className&&(e=e+" "+this.props.className),s.jsx(q,{style:[c.outerWrapper,this.state.focused&&c.wrapperFocused,this.props.hasError&&c.wrapperError],children:s.jsxs("div",{style:{display:"flex",padding:1},onClick:i=>{i.stopPropagation();const u=this.mathField();u&&this.setState({cursorContext:m(u)})},children:[s.jsx("span",{className:e,ref:i=>this.__mathFieldWrapperRef=i,onFocus:()=>this.focus(),onBlur:()=>this.blur()}),s.jsx(P,{opened:this.state.keypadOpen,dismissEnabled:!0,rootBoundary:"document","aria-label":this.context.strings.mathInputTitle,"aria-describedby":`popover-content-${r}`,content:()=>{var i;return s.jsxs(s.Fragment,{children:[s.jsx(F,{id:`popover-content-${r}`,style:$.srOnly,children:this.context.strings.mathInputDescription}),s.jsx(M,{style:c.popoverContent,children:s.jsx(I,{onAnalyticsEvent:this.props.onAnalyticsEvent,extraKeys:this.props.extraKeys,onClickKey:this.handleKeypadPress,cursorContext:this.state.cursorContext,convertDotToTimes:this.props.convertDotToTimes,...this.props.keypadButtonSets??G((i=this.props)==null?void 0:i.buttonSets),showDismiss:!0})})]})},children:this.props.buttonsVisible==="never"?s.jsx(T,{hovered:!1,focused:!1,active:!1}):s.jsx(D,{"aria-label":this.state.keypadOpen?this.context.strings.closeKeypad:this.context.strings.openKeypad,role:"button",onClick:()=>this.state.keypadOpen?this.closeKeypad():this.openKeypad(),children:i=>s.jsx(T,{active:this.state.keypadOpen,...i})})})]})})}}l(v,"contextType",U),l(v,"defaultProps",{value:"",convertDotToTimes:!1});class b extends h.Component{constructor(){super(...arguments);l(this,"inputRef",h.createRef())}blur(){var e;(e=this.inputRef.current)==null||e.blur()}focus(){var e;(e=this.inputRef.current)==null||e.focus()}insert(e){var r;(r=this.inputRef.current)==null||r.insert(e)}render(){return s.jsx(v,{...this.props,ref:this.inputRef,mathInputStrings:this.context.strings})}}l(b,"contextType",R),l(b,"defaultProps",{ariaLabel:"Math input"});const T=({hovered:a,focused:t,active:e})=>{let r;switch(!0){case(t||e):r=p.white;break;case a:r=p.blue;break;default:r=p.offBlack;break}const i=e||t?c.iconActive:c.iconInactive;return s.jsx(q,{style:[c.iconContainer,i],children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:r,viewBox:"0 0 256 256",children:s.jsx("path",{d:"M112,72a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h64A8,8,0,0,1,112,72Zm-8,104H80V152a8,8,0,0,0-16,0v24H40a8,8,0,0,0,0,16H64v24a8,8,0,0,0,16,0V192h24a8,8,0,0,0,0-16Zm48,0h64a8,8,0,0,0,0-16H152a8,8,0,0,0,0,16Zm64,16H152a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-61.66-90.34a8,8,0,0,0,11.32,0L184,83.31l18.34,18.35a8,8,0,0,0,11.32-11.32L195.31,72l18.35-18.34a8,8,0,0,0-11.32-11.32L184,60.69,165.66,42.34a8,8,0,0,0-11.32,11.32L172.69,72,154.34,90.34A8,8,0,0,0,154.34,101.66Z"})})})},G=a=>{const t={};return a&&a.forEach(e=>{switch(e){case"advanced relations":t.advancedRelations=!0;break;case"basic relations":t.basicRelations=!0;break;case"basic+div":t.divisionKey=!0;break;case"logarithms":t.logarithms=!0;break;case"prealgebra":t.preAlgebra=!0;break;case"trig":t.trigonometry=!0;break;case"scientific":t.scientific=!0;break}}),t},x={borderWidth:2,borderColor:p.blue,margin:-1},c=K.StyleSheet.create({iconContainer:{display:"flex",justifyContent:"center",height:"100%",padding:f.xxxSmall_4,borderRadius:1},iconInactive:{border:"2px solid transparent",backgroundColor:p.offBlack8},iconActive:{border:`2px solid ${p.white}`,backgroundColor:p.offBlack64},outerWrapper:{display:"inline-block",borderStyle:"solid",borderWidth:1,borderColor:p.offBlack50,borderRadius:3,background:p.white,":hover":x},wrapperFocused:x,wrapperError:{borderColor:p.red,background:p.fadedRed8,":hover":{borderColor:p.red}},popoverContent:{padding:0,paddingBottom:f.xxSmall_6,maxWidth:"initial"}});b.__docgenInfo={description:"",methods:[{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"insert",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:{name:"any"}}],returns:null}],displayName:"MathInput",props:{className:{required:!1,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"any"},description:""},convertDotToTimes:{required:!0,tsType:{name:"boolean"},description:""},buttonSets:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:`| "basic"
| "basic+div"
| "trig"
| "prealgebra"
| "logarithms"
| "basic relations"
| "advanced relations"
| "scientific"`,elements:[{name:"literal",value:'"basic"'},{name:"literal",value:'"basic+div"'},{name:"literal",value:'"trig"'},{name:"literal",value:'"prealgebra"'},{name:"literal",value:'"logarithms"'},{name:"literal",value:'"basic relations"'},{name:"literal",value:'"advanced relations"'},{name:"literal",value:'"scientific"'}]}],raw:`Array<
    | "basic"
    | "basic+div"
    | "trig"
    | "prealgebra"
    | "logarithms"
    | "basic relations"
    | "advanced relations"
    | "scientific"
>`},description:"@deprecated Use `keypadButtonSets` instead. Maps to `keypadButtonSets`.\n@see keypadButtonSets"},keypadButtonSets:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    advancedRelations?: boolean;
    basicRelations?: boolean;
    divisionKey?: boolean;
    logarithms?: boolean;
    preAlgebra?: boolean;
    trigonometry?: boolean;
    scientific?: boolean;
}`,signature:{properties:[{key:"advancedRelations",value:{name:"boolean",required:!1}},{key:"basicRelations",value:{name:"boolean",required:!1}},{key:"divisionKey",value:{name:"boolean",required:!1}},{key:"logarithms",value:{name:"boolean",required:!1}},{key:"preAlgebra",value:{name:"boolean",required:!1}},{key:"trigonometry",value:{name:"boolean",required:!1}},{key:"scientific",value:{name:"boolean",required:!1}}]}},description:"Overrides deprecated `buttonSets` prop."},ariaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Math input"',computed:!1}},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:""},extraKeys:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>"},description:""},buttonsVisible:{required:!1,tsType:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}]},description:"Whether to show the keypad buttons.\nThe strings now misleading, but we keep them for backwards compatibility.\n- `focused` means that the keypad **appears on toggle, *off* by default**.\n- `always` means that the keypad **appears on toggle, *on* by default.**\n- `never` means that the keypad is **never shown**."},onAnalyticsEvent:{required:!0,tsType:{name:"signature",type:"function",raw:`(
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
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},name:"event"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{b as M,$ as a};
