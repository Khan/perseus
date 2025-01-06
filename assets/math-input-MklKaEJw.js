import{j as s}from"./jsx-runtime-63Ea5SlK.js";import"./prop-types-ch_7vUTQ.js";import{a as f,c as q,g as m,m as A}from"./key-translator-HspkCZQ2.js";import{C,K as E}from"./mobile-keypad-3xFFuAxL.js";import{M as R,c as j}from"./button-assets-ozecF1qE.js";import{C as P}from"./index-NVT999Ia.js";import{V as K}from"./index-CgfdZoMj.js";import{P as I,a as S}from"./index-Zf2-LtSj.js";import{c as l,s as w}from"./index-dmcq622U.js";import{d as D}from"./index-6ID5EQ9c.js";import{l as V}from"./index-awljIyHI.js";import{c as F}from"./index-dnMhQZ-1.js";import{_ as N,$ as U}from"./jquery-yG1GhClm.js";import{r as g}from"./index-6oxdNXpR.js";import{P as B}from"./i18n-context-BsFRgdNa.js";var i=[];for(var h=0;h<256;++h)i.push((h+256).toString(16).slice(1));function H(r,e=0){return(i[r[e+0]]+i[r[e+1]]+i[r[e+2]]+i[r[e+3]]+"-"+i[r[e+4]]+i[r[e+5]]+"-"+i[r[e+6]]+i[r[e+7]]+"-"+i[r[e+8]]+i[r[e+9]]+"-"+i[r[e+10]]+i[r[e+11]]+i[r[e+12]]+i[r[e+13]]+i[r[e+14]]+i[r[e+15]]).toLowerCase()}var d,M=new Uint8Array(16);function O(){if(!d&&(d=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!d))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return d(M)}var W=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const k={randomUUID:W};function Y(r,e,t){if(k.randomUUID&&!e&&!r)return k.randomUUID();r=r||{};var a=r.random||(r.rng||O)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,e){t=t||0;for(var n=0;n<16;++n)e[t+n]=a[n];return e}return H(a)}const L=V.StyleSheet.create({srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}}),Z=(r,e)=>{let t=null;return(...a)=>{t&&clearTimeout(t),t=window.setTimeout(()=>{r(...a)},e)}},c=class c extends g.Component{constructor(){super(...arguments),this.__mathFieldWrapperRef=null,this.__mathField=null,this.state={focused:!1,keypadOpen:this.props.buttonsVisible==="always",cursorContext:C.NONE},this.insert=e=>{const t=this.mathField(),{locale:a}=this.context,o={...f(a,this.context.strings),FRAC:u=>{const _=u.latex();u.typedText("/"),u.latex()===_&&u.cmd("\\frac")}}[e];if(o){o(t,e),t==null||t.focus();return}N(e).isFunction()?e(t):e[0]==="\\"?t==null||t.cmd(e).focus():t==null||t.write(e).focus(),t==null||t.focus()},this.mathField=()=>{var e;if(!this.__mathField&&this.__mathFieldWrapperRef){const{locale:t}=this.context;this.__mathField=q(this.__mathFieldWrapperRef,t,this.props.mathInputStrings,a=>({...a,handlers:{edit:Z(n=>{let o=n.latex();if(o=o.replace(/<>/g,"\\ne"),j(t,this.props.convertDotToTimes)){o=o.replace(/\\cdot/g,"\\times");const u=n.cursor()[A.L];u&&u.ctrlSeq==="\\cdot "&&(n.controller().backspace(),n.cmd("\\times"))}else o=o.replace(/\\times/g,"\\cdot");this.props.value!==o&&this.props.onChange(o),this.setState({cursorContext:m(n)})},100),enter:()=>{this.__mathFieldWrapperRef&&U(this.__mathFieldWrapperRef).submit()},upOutOf:n=>{n.typedText("^")}}}))}return(e=this.__mathField)==null||e.setAriaLabel(this.props.ariaLabel),this.__mathField},this.focus=()=>{var e;(e=this.mathField())==null||e.focus(),this.setState({focused:!0})},this.blur=()=>this.setState({focused:!1}),this.handleKeypadPress=(e,t)=>{const{locale:a}=this.context,n=f(a,this.context.strings)[e],o=this.mathField();o&&(n&&n(o,e),this.setState({cursorContext:m(o)})),t.type==="click"&&this.focus()}}componentDidMount(){var e;(e=this.mathField())==null||e.latex(this.props.value)}openKeypad(){this.props.buttonsVisible!=="never"&&this.setState({keypadOpen:!0})}closeKeypad(){this.setState({keypadOpen:!1})}render(){let e=F({"perseus-math-input":!0,"mq-editable-field":!0,"mq-math-mode":!0});const t=Y().slice(0,8);return this.props.className&&(e=e+" "+this.props.className),s.jsx(K,{style:[p.outerWrapper,this.state.focused&&p.wrapperFocused,this.props.hasError&&p.wrapperError],children:s.jsxs("div",{style:{display:"flex",padding:1},onClick:a=>{a.stopPropagation();const n=this.mathField();n&&this.setState({cursorContext:m(n)})},children:[s.jsx("span",{className:e,ref:a=>this.__mathFieldWrapperRef=a,onFocus:()=>this.focus(),onBlur:()=>this.blur()}),s.jsx(I,{rootBoundary:"document",opened:this.state.keypadOpen,onClose:()=>this.closeKeypad(),dismissEnabled:!0,"aria-label":this.context.strings.mathInputTitle,"aria-describedby":`popover-content-${t}`,content:()=>{var a;return s.jsxs(s.Fragment,{children:[s.jsx(D,{id:`popover-content-${t}`,style:L.srOnly,children:this.context.strings.mathInputDescription}),s.jsx(S,{closeButtonVisible:!0,style:p.popoverContent,children:s.jsx(E,{onAnalyticsEvent:this.props.onAnalyticsEvent,extraKeys:this.props.extraKeys,onClickKey:this.handleKeypadPress,cursorContext:this.state.cursorContext,convertDotToTimes:this.props.convertDotToTimes,...this.props.keypadButtonSets??$((a=this.props)==null?void 0:a.buttonSets)})})]})},children:this.props.buttonsVisible==="never"?s.jsx(x,{hovered:!1,focused:!1,active:!1}):s.jsx(P,{"aria-label":this.state.keypadOpen?this.context.strings.closeKeypad:this.context.strings.openKeypad,role:"button",onClick:()=>this.state.keypadOpen?this.closeKeypad():this.openKeypad(),children:a=>s.jsx(x,{active:this.state.keypadOpen,...a})})})]})})}};c.contextType=B,c.defaultProps={value:"",convertDotToTimes:!1};let v=c;const y=class y extends g.Component{constructor(){super(...arguments),this.inputRef=g.createRef()}blur(){var e;(e=this.inputRef.current)==null||e.blur()}focus(){var e;(e=this.inputRef.current)==null||e.focus()}insert(e){var t;(t=this.inputRef.current)==null||t.insert(e)}render(){return s.jsx(v,{...this.props,ref:this.inputRef,mathInputStrings:this.context.strings})}};y.contextType=R,y.defaultProps={ariaLabel:"Math input"};let b=y;const x=({hovered:r,focused:e,active:t})=>{let a;switch(!0){case(e||t):a=l.white;break;case r:a=l.blue;break;default:a=l.offBlack;break}const n=t||e?p.iconActive:p.iconInactive;return s.jsx(K,{style:[p.iconContainer,n],children:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:a,viewBox:"0 0 256 256",children:s.jsx("path",{d:"M112,72a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h64A8,8,0,0,1,112,72Zm-8,104H80V152a8,8,0,0,0-16,0v24H40a8,8,0,0,0,0,16H64v24a8,8,0,0,0,16,0V192h24a8,8,0,0,0,0-16Zm48,0h64a8,8,0,0,0,0-16H152a8,8,0,0,0,0,16Zm64,16H152a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-61.66-90.34a8,8,0,0,0,11.32,0L184,83.31l18.34,18.35a8,8,0,0,0,11.32-11.32L195.31,72l18.35-18.34a8,8,0,0,0-11.32-11.32L184,60.69,165.66,42.34a8,8,0,0,0-11.32,11.32L172.69,72,154.34,90.34A8,8,0,0,0,154.34,101.66Z"})})})},$=r=>{const e={};return r&&r.forEach(t=>{switch(t){case"advanced relations":e.advancedRelations=!0;break;case"basic relations":e.basicRelations=!0;break;case"basic+div":e.divisionKey=!0;break;case"logarithms":e.logarithms=!0;break;case"prealgebra":e.preAlgebra=!0;break;case"trig":e.trigonometry=!0;break;case"scientific":e.scientific=!0;break}}),e},T={borderWidth:2,borderColor:l.blue,margin:-1},p=V.StyleSheet.create({iconContainer:{display:"flex",justifyContent:"center",height:"100%",padding:w.xxxSmall_4,borderRadius:1},iconInactive:{border:"2px solid transparent",backgroundColor:l.offBlack8},iconActive:{border:`2px solid ${l.white}`,backgroundColor:l.offBlack64},outerWrapper:{display:"inline-block",borderStyle:"solid",borderWidth:1,borderColor:l.offBlack50,borderRadius:3,background:l.white,":hover":T},wrapperFocused:T,wrapperError:{borderColor:l.red,background:l.fadedRed8,":hover":{borderColor:l.red}},popoverContent:{padding:0,paddingBottom:w.xxSmall_6,maxWidth:"initial"}});b.__docgenInfo={description:"",methods:[{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"insert",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:{name:"any"}}],returns:null}],displayName:"MathInput",props:{className:{required:!1,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"any"},description:""},convertDotToTimes:{required:!0,tsType:{name:"boolean"},description:""},buttonSets:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "basic"
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
| {
      type: "perseus:widget-rendering-error";
      payload: {
          widgetType: string;
          widgetId: string;
      };
  }
| {
      type: "perseus:interactive-graph-widget:rendered";
      payload: {
          type: string;
          widgetType: string;
          widgetId: string;
      };
  }
| {
      type: "perseus:label-image:toggle-answers-hidden";
      payload: null;
  }
| {
      type: "perseus:label-image:marker-interacted-with";
      payload: null;
  }
| {
      type: "perseus:label-image:choiced-interacted-with";
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
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:`| "MATH_INPUT_KEYPAD_V2"
| "REACT_NATIVE_KEYPAD"`,elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}},{key:"result",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:expression-focused";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:expression-focused"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:widget-rendering-error";
    payload: {
        widgetType: string;
        widgetId: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget-rendering-error"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetType: string;
    widgetId: string;
}`,signature:{properties:[{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
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
    type: "perseus:label-image:toggle-answers-hidden";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:toggle-answers-hidden"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:marker-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:marker-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:choiced-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:choiced-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-closed";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-closed"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:`| "MATH_INPUT_KEYPAD_V2"
| "REACT_NATIVE_KEYPAD"`,elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-opened";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-opened"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:`| "MATH_INPUT_KEYPAD_V2"
| "REACT_NATIVE_KEYPAD"`,elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},name:"event"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{b as M,L as a};
