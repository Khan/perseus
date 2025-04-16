var F=Object.defineProperty;var C=(l,d,e)=>d in l?F(l,d,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[d]=e;var t=(l,d,e)=>(C(l,typeof d!="symbol"?d+"":d,e),e);import{j as s}from"./jsx-runtime-BT65X5dW.js";import{b as A,f as w,p as j,P as S}from"./core-widget-registry-DuWAbnlP.js";import{E as q}from"./all-widgets-BNX29P1d.js";import"./index-CskvhqFA.js";import"./answer-choices-AVIBiDK4.js";import{H as v,e as T}from"./index-CbNKSLRm.js";import{r as k}from"./index-C6mWTJJr.js";import"./index-B1Gws05u.js";import"./i18n-context-3AkWzTTj.js";import"./perseus-api-Ty_QvlNi.js";import"./renderer-BfXJPn7_.js";import"./index-D7h-teXI.js";import"./jquery-CkHB0_Mt.js";import{_ as R}from"./underscore-U-AHniOr.js";import"./dependencies-BsVPGK1s.js";import"./util-DuhzGyTK.js";import"./zoomable-tex-Dy-nElJT.js";import"./svg-image-JkPvtbXc.js";import{n as o}from"./no-important-DlFk8a1I.js";import"./number-input-D7b8WnZJ.js";import"./simple-keypad-input-DPae8uak.js";import"./text-input-D8eW524Y.js";import"./phet-simulation-ylWgoYlI.js";import"./sortable-C82TqQ6p.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./math-input-BontzfuQ.js";import"./video-transcript-link-C7EJC_3o.js";import"./item-version-BP5eV8JA.js";import"./article-renderer-C7GDTbas.js";import"./server-item-renderer-mDI7tv2V.js";import"./hints-renderer-BmvmycYB.js";import"./base-radio-Cf8OwqnL.js";import{c as L}from"./components-CevsFBrs.js";import{f as E}from"./index-BzwLglMS.js";import"./index-Dd-cahjY.js";import{B as b}from"./index-CQe11mMd.js";import{C as h,l as f}from"./index-BePo9uoZ.js";import{S as K}from"./index-CbIoTxL4.js";import{s as p,c as y}from"./index-CjnMbH_2.js";const{InfoTip:c}=L,x=["basic","trig","prealgebra","logarithms","scientific","basic relations","advanced relations"];class g extends k.Component{constructor(e){super(e);t(this,"getSaveWarnings",()=>{const e=[];return this.props.answerForms.length===0?e.push("No answers specified"):(this.props.answerForms.some(a=>a.considered==="correct")||e.push("No correct answer specified"),R(this.props.answerForms).each((a,n)=>{if(this.props.value==="")e.push(`Answer ${n+1} is empty`);else{const m=j(a.value,{functions:this.props.functions});m.parsed?a.simplify&&!m.expr.isSimplified()&&e.push(`${a.value} isn't simplified, but is required" +
                            " to be`):e.push(`Couldn't parse ${a.value}`)}})),e});t(this,"newAnswer",()=>{const e=this.props.answerForms.slice(),a={considered:"correct",form:!1,key:`${crypto.randomUUID()}`,simplify:!1,value:""};e.push(a),this.props.onChange({answerForms:e})});t(this,"handleRemoveForm",e=>{const r=this.props.answerForms.slice();r.splice(e,1),this.props.onChange({answerForms:r})});t(this,"handleButtonSet",e=>{const a=x.filter(n=>this.props.buttonSets.includes(n)!==(n===e));this.props.onChange({buttonSets:a})});t(this,"handleToggleDiv",()=>{let e,r;this.props.buttonSets.includes("basic+div")?(e="basic",r="basic+div"):(e="basic+div",r="basic");const a=this.props.buttonSets.filter(n=>n!==r).concat(e);this.props.onChange({buttonSets:a})});t(this,"handleTexInsert",e=>{this.refs.expression.insert(e)});t(this,"handleFunctions",e=>{this.setState({functionsInternal:e});const r={};r.functions=e.split(/[ ,]+/).filter(E),this.props.onChange(r)});t(this,"handleVisibleLabel",e=>{this.props.onChange({visibleLabel:e})});t(this,"handleAriaLabel",e=>{this.props.onChange({ariaLabel:e})});t(this,"changeExpressionWidget",(e,r)=>{const a={...this.props.answerForms[e],value:r.value};this.updateAnswerForm(e,a)});this.state={functionsInternal:this.props.functions.join(" ")}}serialize(){const{answerForms:e,buttonSets:r,functions:a,times:n,visibleLabel:m,ariaLabel:u}=this.props;return{answerForms:e,buttonSets:r,functions:a,times:n,visibleLabel:m,ariaLabel:u,extraKeys:w(this.props)}}updateAnswerForm(e,r){const a=this.props.answerForms.slice();a[e]=r;const{extraKeys:n,...m}=this.props,u=w({...m,answerForms:a});this.props.onChange({answerForms:a,extraKeys:u})}changeSimplify(e,r){const a={...this.props.answerForms[e],simplify:r};this.updateAnswerForm(e,a)}changeForm(e,r){const a={...this.props.answerForms[e],form:r};this.updateAnswerForm(e,a)}changeConsidered(e,r){const a={...this.props.answerForms[e],considered:r};this.updateAnswerForm(e,a)}changeTimes(e){this.props.onChange({times:e})}render(){const e=this.props.answerForms.map((a,n)=>{const m={times:this.props.times,functions:this.props.functions,buttonSets:this.props.buttonSets,buttonsVisible:"focused",value:a.value,onChange:u=>this.changeExpressionWidget(n,u),trackInteraction:()=>{},widgetId:this.props.widgetId+"-"+a.key,visibleLabel:this.props.visibleLabel,ariaLabel:this.props.ariaLabel};return s.jsx(P,{considered:a.considered,expressionProps:m,form:a.form,simplify:a.simplify,onDelete:()=>this.handleRemoveForm(n),onChangeSimplify:u=>this.changeSimplify(n,u),onChangeForm:u=>this.changeForm(n,u),onChangeConsidered:u=>this.changeConsidered(n,u)},a.key)}),r=x.map(a=>{const n=a==="basic",m=this.props.buttonSets.includes(a)||n;return s.jsx(h,{label:a,checked:m,disabled:n,onChange:()=>this.handleButtonSet(a)},a)});return r.unshift(s.jsx(h,{label:"show ÷ button",checked:this.props.buttonSets.includes("basic+div"),onChange:this.handleToggleDiv},"show ÷ button")),s.jsxs("div",{children:[s.jsx(v,{children:"Global Options"}),s.jsxs("div",{className:o.css(i.paddedY),children:[s.jsx(f,{label:"Visible label",value:this.props.visibleLabel||"",onChange:this.handleVisibleLabel}),s.jsx(c,{children:s.jsx("p",{children:"Optional visible text; strongly encouraged to help learners using dictation software, but can be omitted if the surrounding content provides enough context."})})]}),s.jsxs("div",{className:o.css(i.paddedY),children:[s.jsx(f,{label:"Aria label",value:this.props.ariaLabel||"",onChange:this.handleAriaLabel}),s.jsx(c,{children:s.jsxs("p",{children:["Label text that's read by screen readers. Highly recommend adding a label here to ensure your exercise is accessible. For more information on writting accessible labels, please see"," ",s.jsx("a",{href:"https://www.w3.org/WAI/tips/designing/#ensure-that-form-elements-include-clearly-associated-labels",target:"_blank",rel:"noreferrer",children:"this article."})]})})]}),s.jsxs("div",{className:o.css(i.paddedY),children:[s.jsx(f,{label:"Function variables",value:this.state.functionsInternal,onChange:this.handleFunctions}),s.jsx(c,{children:s.jsx("p",{children:'Single-letter variables listed here will be interpreted as functions. This let us know that f(x) means "f of x" and not "f times x".'})})]}),s.jsxs("div",{className:o.css(i.paddedY),children:[s.jsx(h,{label:"Use × instead of ⋅ for multiplication",checked:this.props.times,onChange:a=>{this.changeTimes(a)}}),s.jsx(c,{children:s.jsx("p",{children:"For pre-algebra problems this option displays multiplication as \\times instead of \\cdot in both the rendered output and the acceptable formats examples."})})]}),s.jsxs("div",{className:o.css(i.paddedY),children:[s.jsx(T,{children:"Button Sets"}),r]}),s.jsx(v,{children:"Answers"}),s.jsx("p",{style:{margin:"4px 0"},children:"student responses area matched against these from top to bottom"}),e,s.jsx("div",{children:s.jsx(b,{size:"small",onClick:this.newAnswer,children:"Add new answer"})})]})}}t(g,"widgetName","expression"),t(g,"defaultProps",A.defaultWidgetOptions);const N=function(l,d){let e=l.indexOf(d);return e=(e+1)%l.length,l[e]};class P extends k.Component{constructor(){super(...arguments);t(this,"state",{deleteFocused:!1});t(this,"handleImSure",()=>{this.props.onDelete(),this.handleCancelDelete()});t(this,"handleCancelDelete",()=>{this.setState({deleteFocused:!1})});t(this,"handleDelete",()=>{this.setState({deleteFocused:!0})});t(this,"toggleConsidered",()=>{const e=N(S,this.props.considered);this.props.onChangeConsidered(e)})}render(){const e=this.state.deleteFocused?s.jsxs(s.Fragment,{children:[s.jsx(b,{size:"small",onClick:this.handleImSure,color:"destructive",children:"I'm sure!"}),s.jsx(K,{size:p.small_12}),s.jsx(b,{size:"small",onClick:this.handleCancelDelete,light:!0,children:"Cancel"})]}):s.jsx(b,{size:"small",onClick:this.handleDelete,color:"destructive",light:!0,children:"Delete"}),r=o.css(i.answerStatus,this.props.considered==="wrong"&&i.answerStatusWrong,this.props.considered==="correct"&&i.answerStatusCorrect,this.props.considered==="ungraded"&&i.answerStatusUngraded);return s.jsx("div",{className:o.css(i.answerOption),children:s.jsxs("div",{className:o.css(i.answerBody),children:[s.jsxs("div",{children:[s.jsx("button",{onClick:this.toggleConsidered,className:r,children:this.props.considered}),s.jsx("div",{children:s.jsx(q,{...this.props.expressionProps})})]}),s.jsxs("div",{className:o.css(i.paddedY,i.paddedX),children:[s.jsx(h,{label:"Answer expression must have the same form.",checked:this.props.form,onChange:this.props.onChangeForm}),s.jsx(c,{children:s.jsx("p",{children:"The student's answer must be in the same form. Commutativity and excess negative signs are ignored."})})]}),s.jsxs("div",{className:o.css(i.paddedY,i.paddedX),children:[s.jsx(h,{label:"Answer expression must be fully expanded and simplified.",checked:this.props.simplify,onChange:this.props.onChangeSimplify}),s.jsx(c,{children:s.jsx("p",{children:`The student's answer must be fully expanded and simplified. Answering this equation (x^2+2x+1) with this factored equation (x+1)^2 will render this response "Your answer is not fully expanded and simplified."`})})]}),s.jsx("div",{className:o.css(i.buttonRow,i.paddedY),children:e})]})})}}const i=o.StyleSheet.create({paddedX:{paddingLeft:p.xSmall_8,paddingRight:p.xSmall_8},paddedY:{paddingTop:p.xxSmall_6,paddingBottom:p.xxSmall_6},answerOption:{border:"1px solid #ddd",borderRadius:"3px",display:"flex"},answerStatus:{border:"none",userSelect:"none",width:"100px",paddingTop:p.small_12,paddingBottom:p.small_12},answerStatusWrong:{backgroundColor:y.fadedRed16},answerStatusCorrect:{backgroundColor:y.fadedGreen16},answerStatusUngraded:{backgroundColor:y.fadedBlue16},answerBody:{},buttonRow:{display:"flex"}});g.__docgenInfo={description:"",methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    // The expression forms the answer may come in
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    buttonSets: LegacyButtonSets;
    // Variables that can be used as functions.  Default: ["f", "g", "h"]
    functions: ReadonlyArray<string>;
    // Use x for rendering multiplication instead of a center dot.
    times: boolean;
    // What extra keys need to be displayed on the keypad so that the
    // question can be answerable without a keyboard (ie mobile)
    // TODO: this is really ReadonlyArray<Key>
    extraKeys?: ReadonlyArray<KeypadKey>;
    // visible label associated with the MathQuill field
    visibleLabel?: string;
    // aria label for screen readers attached to MathQuill field
    ariaLabel?: string;
    // Controls when buttons for special characters are visible when using a
    // desktop browser.  Defaults to "focused".
    // NOTE: This isn't listed in perseus-format.js or perseus_data.go, but
    // appears in item data in the datastore.
    buttonsVisible?: "always" | "never" | "focused";
}`,signature:{properties:[{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The TeX form of the expression.  e.g. "x\\\\cdot3=y"
    value: string;
    // The Answer expression must have the same form
    form: boolean;
    // The answer expression must be fully expanded and simplified
    simplify: boolean;
    // Whether the form is considered "correct", "wrong", or "ungraded"
    considered: (typeof PerseusExpressionAnswerFormConsidered)[number];
    // A key to identify the answer form in a list
    // NOTE: perseus-format.js says this is required even though it isn't necessary.
    key?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"ReadonlyArray<PerseusExpressionAnswerForm>",required:!0}},{key:"buttonSets",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "basic"
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
>`,required:!0}},{key:"functions",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"extraKeys",value:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>",required:!1}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"newAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"handleRemoveForm",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null}],returns:null},{name:"updateAnswerForm",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"answerFormProps",optional:!1,type:{name:"ReadonlyArray[number]",raw:'PerseusExpressionWidgetOptions["answerForms"][number]',alias:"AnswerForm"}}],returns:null},{name:"handleButtonSet",docblock:null,modifiers:[],params:[{name:"changingName",optional:!1,type:null}],returns:null},{name:"handleToggleDiv",docblock:null,modifiers:[],params:[],returns:null},{name:"handleTexInsert",docblock:null,modifiers:[],params:[{name:"str",optional:!1,type:null}],returns:null},{name:"handleFunctions",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handleVisibleLabel",docblock:null,modifiers:[],params:[{name:"visibleLabel",optional:!1,type:null}],returns:null},{name:"handleAriaLabel",docblock:null,modifiers:[],params:[{name:"ariaLabel",optional:!1,type:null}],returns:null},{name:"changeSimplify",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"simplify",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeForm",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"form",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeConsidered",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"considered",optional:!1,type:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]"}}],returns:null},{name:"changeTimes",docblock:null,modifiers:[],params:[{name:"times",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeExpressionWidget",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:null},{name:"props",optional:!1,type:null}],returns:null}],displayName:"ExpressionEditor",props:{widgetId:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: Partial<PerseusExpressionWidgetOptions>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    // The expression forms the answer may come in
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    buttonSets: LegacyButtonSets;
    // Variables that can be used as functions.  Default: ["f", "g", "h"]
    functions: ReadonlyArray<string>;
    // Use x for rendering multiplication instead of a center dot.
    times: boolean;
    // What extra keys need to be displayed on the keypad so that the
    // question can be answerable without a keyboard (ie mobile)
    // TODO: this is really ReadonlyArray<Key>
    extraKeys?: ReadonlyArray<KeypadKey>;
    // visible label associated with the MathQuill field
    visibleLabel?: string;
    // aria label for screen readers attached to MathQuill field
    ariaLabel?: string;
    // Controls when buttons for special characters are visible when using a
    // desktop browser.  Defaults to "focused".
    // NOTE: This isn't listed in perseus-format.js or perseus_data.go, but
    // appears in item data in the datastore.
    buttonsVisible?: "always" | "never" | "focused";
}`,signature:{properties:[{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The TeX form of the expression.  e.g. "x\\\\cdot3=y"
    value: string;
    // The Answer expression must have the same form
    form: boolean;
    // The answer expression must be fully expanded and simplified
    simplify: boolean;
    // Whether the form is considered "correct", "wrong", or "ungraded"
    considered: (typeof PerseusExpressionAnswerFormConsidered)[number];
    // A key to identify the answer form in a list
    // NOTE: perseus-format.js says this is required even though it isn't necessary.
    key?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"ReadonlyArray<PerseusExpressionAnswerForm>",required:!0}},{key:"buttonSets",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "basic"
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
>`,required:!0}},{key:"functions",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"extraKeys",value:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>",required:!1}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}}],raw:"Partial<PerseusExpressionWidgetOptions>"},name:"newValues"}],return:{name:"void"}}},description:""},answerForms:{defaultValue:{value:"[]",computed:!1},required:!1},times:{defaultValue:{value:"false",computed:!1},required:!1},buttonSets:{defaultValue:{value:'["basic"]',computed:!1},required:!1},functions:{defaultValue:{value:'["f", "g", "h"]',computed:!1},required:!1}}};export{g as E};
