import{j as s}from"./jsx-runtime-63Ea5SlK.js";import"./prop-types-OXICk5n1.js";import{a as w,c as V,g as m,m as _}from"./key-translator-P972Clll.js";import{C as S,K as E,c as C}from"./mobile-keypad-taovYQqa.js";import{M as R}from"./button-assets-hOlALWgM.js";import{C as j}from"./index-0pCajwWr.js";import{V as q}from"./index-_3CKOwHy.js";import{P as I,a as P}from"./index-8_CLcrTy.js";import{c as l,s as f}from"./index-QHkT31Yt.js";import{c as D}from"./index-4dAUYsag.js";import{n as A}from"./no-important-xCWWYXQR.js";import{c as F}from"./index-dnMhQZ-1.js";import{$ as M}from"./jquery-5v7aFUvu.js";import{r as h}from"./index-6oxdNXpR.js";import{_ as O}from"./index-default-4_ZsnO94.js";import{P as L}from"./i18n-context-GVCAGr7t.js";var i=[];for(var g=0;g<256;++g)i.push((g+256).toString(16).slice(1));function N(r,e=0){return(i[r[e+0]]+i[r[e+1]]+i[r[e+2]]+i[r[e+3]]+"-"+i[r[e+4]]+i[r[e+5]]+"-"+i[r[e+6]]+i[r[e+7]]+"-"+i[r[e+8]]+i[r[e+9]]+"-"+i[r[e+10]]+i[r[e+11]]+i[r[e+12]]+i[r[e+13]]+i[r[e+14]]+i[r[e+15]]).toLowerCase()}var p,U=new Uint8Array(16);function B(){if(!p&&(p=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!p))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return p(U)}var H=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const k={randomUUID:H};function W(r,e,t){if(k.randomUUID&&!e&&!r)return k.randomUUID();r=r||{};var n=r.random||(r.rng||B)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,e){t=t||0;for(var a=0;a<16;++a)e[t+a]=n[a];return e}return N(n)}const Y=A.StyleSheet.create({srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}}),Z=(r,e)=>{let t=null;return(...n)=>{t&&clearTimeout(t),t=window.setTimeout(()=>{r(...n)},e)}},y=class y extends h.Component{constructor(){super(...arguments),this.__mathFieldWrapperRef=null,this.__mathField=null,this.state={focused:!1,keypadOpen:this.props.buttonsVisible==="always",cursorContext:S.NONE},this.insert=e=>{const t=this.mathField(),{locale:n}=this.context,o={...w(n,this.context.strings),FRAC:u=>{const K=u.latex();u.typedText("/"),u.latex()===K&&u.cmd("\\frac")}}[e];if(o){o(t,e),t==null||t.focus();return}O(e).isFunction()?e(t):e[0]==="\\"?t==null||t.cmd(e).focus():t==null||t.write(e).focus(),t==null||t.focus()},this.mathField=()=>{var e;if(!this.__mathField&&this.__mathFieldWrapperRef){const{locale:t}=this.context;this.__mathField=V(this.__mathFieldWrapperRef,t,this.props.mathInputStrings,n=>({...n,handlers:{edit:Z(a=>{let o=a.latex();if(o=o.replace(/<>/g,"\\ne"),C(t,this.props.convertDotToTimes)){o=o.replace(/\\cdot/g,"\\times");const u=a.cursor()[_.L];u&&u.ctrlSeq==="\\cdot "&&(a.controller().backspace(),a.cmd("\\times"))}else o=o.replace(/\\times/g,"\\cdot");this.props.value!==o&&this.props.onChange(o),this.setState({cursorContext:m(a)})},100),enter:()=>{this.__mathFieldWrapperRef&&M(this.__mathFieldWrapperRef).submit()},upOutOf:a=>{a.typedText("^")}}}))}return(e=this.__mathField)==null||e.setAriaLabel(this.props.ariaLabel),this.__mathField},this.focus=()=>{var e;(e=this.mathField())==null||e.focus(),this.setState({focused:!0})},this.blur=()=>this.setState({focused:!1}),this.handleKeypadPress=(e,t)=>{const{locale:n}=this.context,a=w(n,this.context.strings)[e],o=this.mathField();o&&(a&&a(o,e),this.setState({cursorContext:m(o)})),t.type==="click"&&this.focus()}}componentDidMount(){var e;(e=this.mathField())==null||e.latex(this.props.value)}openKeypad(){this.props.buttonsVisible!=="never"&&this.setState({keypadOpen:!0})}closeKeypad(){this.setState({keypadOpen:!1})}render(){let e=F({"perseus-math-input":!0,"mq-editable-field":!0,"mq-math-mode":!0});const t=W().slice(0,8);return this.props.className&&(e=e+" "+this.props.className),s.jsx(q,{style:[d.outerWrapper,this.state.focused&&d.wrapperFocused,this.props.hasError&&d.wrapperError],children:s.jsxs("div",{style:{display:"flex",padding:1},onClick:n=>{n.stopPropagation();const a=this.mathField();a&&this.setState({cursorContext:m(a)})},children:[s.jsx("span",{className:e,ref:n=>this.__mathFieldWrapperRef=n,onFocus:()=>this.focus(),onBlur:()=>this.blur()}),s.jsx(I,{rootBoundary:"document",opened:this.state.keypadOpen,onClose:()=>this.closeKeypad(),dismissEnabled:!0,"aria-label":this.context.strings.mathInputTitle,"aria-describedby":`popover-content-${t}`,content:()=>{var n;return s.jsxs(s.Fragment,{children:[s.jsx(D,{id:`popover-content-${t}`,style:Y.srOnly,children:this.context.strings.mathInputDescription}),s.jsx(P,{closeButtonVisible:!0,style:d.popoverContent,children:s.jsx(E,{onAnalyticsEvent:this.props.onAnalyticsEvent,extraKeys:this.props.extraKeys,onClickKey:this.handleKeypadPress,cursorContext:this.state.cursorContext,convertDotToTimes:this.props.convertDotToTimes,...this.props.keypadButtonSets??$((n=this.props)==null?void 0:n.buttonSets)})})]})},children:this.props.buttonsVisible==="never"?s.jsx(T,{hovered:!1,focused:!1,active:!1}):s.jsx(j,{"aria-label":this.state.keypadOpen?this.context.strings.closeKeypad:this.context.strings.openKeypad,role:"button",onClick:()=>this.state.keypadOpen?this.closeKeypad():this.openKeypad(),children:n=>s.jsx(T,{active:this.state.keypadOpen,...n})})})]})})}};y.contextType=L,y.defaultProps={value:"",convertDotToTimes:!1};let v=y;const c=class c extends h.Component{constructor(){super(...arguments),this.inputRef=h.createRef()}blur(){var e;(e=this.inputRef.current)==null||e.blur()}focus(){var e;(e=this.inputRef.current)==null||e.focus()}insert(e){var t;(t=this.inputRef.current)==null||t.insert(e)}render(){return s.jsx(v,{...this.props,ref:this.inputRef,mathInputStrings:this.context.strings})}};c.contextType=R,c.defaultProps={ariaLabel:"Math input"};let b=c;const T=({hovered:r,focused:e,active:t})=>{let n;switch(!0){case(e||t):n=l.white;break;case r:n=l.blue;break;default:n=l.offBlack;break}const a=t||e?d.iconActive:d.iconInactive;return s.jsx(q,{style:[d.iconContainer,a],children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:n,viewBox:"0 0 256 256",children:s.jsx("path",{d:"M112,72a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h64A8,8,0,0,1,112,72Zm-8,104H80V152a8,8,0,0,0-16,0v24H40a8,8,0,0,0,0,16H64v24a8,8,0,0,0,16,0V192h24a8,8,0,0,0,0-16Zm48,0h64a8,8,0,0,0,0-16H152a8,8,0,0,0,0,16Zm64,16H152a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-61.66-90.34a8,8,0,0,0,11.32,0L184,83.31l18.34,18.35a8,8,0,0,0,11.32-11.32L195.31,72l18.35-18.34a8,8,0,0,0-11.32-11.32L184,60.69,165.66,42.34a8,8,0,0,0-11.32,11.32L172.69,72,154.34,90.34A8,8,0,0,0,154.34,101.66Z"})})})},$=r=>{const e={};return r&&r.forEach(t=>{switch(t){case"advanced relations":e.advancedRelations=!0;break;case"basic relations":e.basicRelations=!0;break;case"basic+div":e.divisionKey=!0;break;case"logarithms":e.logarithms=!0;break;case"prealgebra":e.preAlgebra=!0;break;case"trig":e.trigonometry=!0;break;case"scientific":e.scientific=!0;break}}),e},x={borderWidth:2,borderColor:l.blue,margin:-1},d=A.StyleSheet.create({iconContainer:{display:"flex",justifyContent:"center",height:"100%",padding:f.xxxSmall_4,borderRadius:1},iconInactive:{border:"2px solid transparent",backgroundColor:l.offBlack8},iconActive:{border:`2px solid ${l.white}`,backgroundColor:l.offBlack64},outerWrapper:{display:"inline-block",borderStyle:"solid",borderWidth:1,borderColor:l.offBlack50,borderRadius:3,background:l.white,":hover":x},wrapperFocused:x,wrapperError:{borderColor:l.red,background:l.fadedRed8,":hover":{borderColor:l.red}},popoverContent:{padding:0,paddingBottom:f.xxSmall_6,maxWidth:"initial"}});b.__docgenInfo={description:"",methods:[{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"insert",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:{name:"any"}}],returns:null}],displayName:"MathInput",props:{className:{required:!1,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"any"},description:""},convertDotToTimes:{required:!0,tsType:{name:"boolean"},description:""},buttonSets:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "basic"
| "basic+div"
| "trig"
| "prealgebra"
| "logarithms"
| "basic relations"
| "advanced relations"
| "scientific"`,elements:[{name:"literal",value:'"basic"'},{name:"literal",value:'"basic+div"'},{name:"literal",value:'"trig"'},{name:"literal",value:'"prealgebra"'},{name:"literal",value:'"logarithms"'},{name:"literal",value:'"basic relations"'},{name:"literal",value:'"advanced relations"'},{name:"literal",value:'"scientific"'}]}],raw:`ReadonlyArray<
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
}`,signature:{properties:[{key:"advancedRelations",value:{name:"boolean",required:!1}},{key:"basicRelations",value:{name:"boolean",required:!1}},{key:"divisionKey",value:{name:"boolean",required:!1}},{key:"logarithms",value:{name:"boolean",required:!1}},{key:"preAlgebra",value:{name:"boolean",required:!1}},{key:"trigonometry",value:{name:"boolean",required:!1}},{key:"scientific",value:{name:"boolean",required:!1}}]}},description:"Overrides deprecated `buttonSets` prop."},ariaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Math input"',computed:!1}},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},hasError:{required:!1,tsType:{name:"boolean"},description:""},extraKeys:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeyArray)[number]"}],raw:"ReadonlyArray<Keys>"},description:""},buttonsVisible:{required:!1,tsType:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}]},description:"Whether to show the keypad buttons.\nThe strings now misleading, but we keep them for backwards compatibility.\n- `focused` means that the keypad **appears on toggle, *off* by default**.\n- `always` means that the keypad **appears on toggle, *on* by default.**\n- `never` means that the keypad is **never shown**."},onAnalyticsEvent:{required:!0,tsType:{name:"signature",type:"function",raw:`(
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
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},name:"event"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{b as M,Y as a};
