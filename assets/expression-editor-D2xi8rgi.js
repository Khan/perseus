var j=Object.defineProperty;var A=(o,l,e)=>l in o?j(o,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[l]=e;var t=(o,l,e)=>(A(o,typeof l!="symbol"?l+"":l,e),e);import{j as s}from"./jsx-runtime-BT65X5dW.js";import{d as w,p as q,P as v}from"./index-vrbntoJ2.js";import{_ as T}from"./index-default-BcKQpA1a.js";import{b as L}from"./util-DvScpRwT.js";import{E}from"./all-widgets-BvboCV5a.js";import{V as x}from"./index-DBQpxcp6.js";import"./answer-choices-D4l3IaQC.js";import{H as k,e as K,C as P}from"./index-CltwzEvY.js";import{r as C}from"./index-C6mWTJJr.js";import"./index-B1Gws05u.js";import"./i18n-context-3AkWzTTj.js";import"./perseus-api-DVNrAHa_.js";import"./renderer-Dtr3EX0A.js";import"./index-D7h-teXI.js";import"./jquery-CkHB0_Mt.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-tex-Dy-nElJT.js";import"./svg-image-YRyyOKdU.js";import{n as m}from"./no-important-DlFk8a1I.js";import"./number-input-Dj47PR1F.js";import"./simple-keypad-input-Nb1b8LMV.js";import"./text-input-scswY8Et.js";import"./phet-simulation-Dwl7eCLH.js";import"./sortable-DTJHI15M.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./math-input-B2rrzHg5.js";import"./video-transcript-link-7CsmY5l0.js";import"./item-version-CDBtmdXZ.js";import"./article-renderer-B46hzNcK.js";import"./server-item-renderer-DS5jnbdz.js";import"./hints-renderer-Cb6xmEhm.js";import"./base-radio-B0WC_dDd.js";import{c as N}from"./components--l9jVI7o.js";import{f as V}from"./index-BzwLglMS.js";import"./index-Dd-cahjY.js";import{B as f}from"./index-B2p7Pm9a.js";import{C as h,l as b}from"./index-DLCVSRRG.js";import{S}from"./index-BeK4tsM-.js";import{s as p,d as D,c as g}from"./index-Ds5N5m2R.js";const{ButtonGroup:I,InfoTip:c}=N,F=["basic","trig","prealgebra","logarithms","scientific","basic relations","advanced relations"];class y extends C.Component{constructor(e){super(e);t(this,"getSaveWarnings",()=>{const e=[];return this.props.answerForms.length===0?e.push("No answers specified"):(this.props.answerForms.some(a=>a.considered==="correct")||e.push("No correct answer specified"),T(this.props.answerForms).each((a,r)=>{if(this.props.value==="")e.push(`Answer ${r+1} is empty`);else{const u=q(a.value,{functions:this.props.functions});u.parsed?a.simplify&&!u.expr.isSimplified()&&e.push(`${a.value} isn't simplified, but is required" +
                            " to be`):e.push(`Couldn't parse ${a.value}`)}})),e});t(this,"newAnswer",()=>{const e=this.props.answerForms.slice(),a={considered:"correct",form:!1,key:`${crypto.randomUUID()}`,simplify:!1,value:""};e.push(a),this.props.onChange({answerForms:e})});t(this,"handleRemoveForm",e=>{const n=this.props.answerForms.slice();n.splice(e,1),this.props.onChange({answerForms:n})});t(this,"handleButtonSet",e=>{const a=F.filter(r=>this.props.buttonSets.includes(r)!==(r===e));this.props.onChange({buttonSets:a})});t(this,"handleToggleDiv",()=>{let e,n;this.props.buttonSets.includes("basic+div")?(e="basic",n="basic+div"):(e="basic+div",n="basic");const a=this.props.buttonSets.filter(r=>r!==n).concat(e);this.props.onChange({buttonSets:a})});t(this,"handleTexInsert",e=>{this.refs.expression.insert(e)});t(this,"handleFunctions",e=>{this.setState({functionsInternal:e});const n={};n.functions=e.split(/[ ,]+/).filter(V),this.props.onChange(n)});t(this,"handleVisibleLabel",e=>{this.props.onChange({visibleLabel:e})});t(this,"handleAriaLabel",e=>{this.props.onChange({ariaLabel:e})});t(this,"changeExpressionWidget",(e,n)=>{const a={...this.props.answerForms[e],value:n.value};this.updateAnswerForm(e,a)});this.state={functionsInternal:this.props.functions.join(" ")}}serialize(){const{answerForms:e,buttonSets:n,functions:a,times:r,visibleLabel:u,ariaLabel:d}=this.props;return{answerForms:e,buttonSets:n,functions:a,times:r,visibleLabel:u,ariaLabel:d,extraKeys:w(this.props)}}updateAnswerForm(e,n){const a=this.props.answerForms.slice();a[e]=n;const{extraKeys:r,...u}=this.props,d=w({...u,answerForms:a});this.props.onChange({answerForms:a,extraKeys:d})}changeSimplify(e,n){const a={...this.props.answerForms[e],simplify:n};this.updateAnswerForm(e,a)}changeForm(e,n){const a={...this.props.answerForms[e],form:n};this.updateAnswerForm(e,a)}changeConsidered(e,n){const a={...this.props.answerForms[e],considered:n};this.updateAnswerForm(e,a)}changeTimes(e){this.props.onChange({times:e})}render(){const e=this.props.answerForms.map((a,r)=>{const u={times:this.props.times,functions:this.props.functions,buttonSets:this.props.buttonSets,buttonsVisible:"focused",value:a.value,onChange:d=>this.changeExpressionWidget(r,d),trackInteraction:()=>{},widgetId:this.props.widgetId+"-"+a.key,visibleLabel:this.props.visibleLabel,ariaLabel:this.props.ariaLabel};return s.jsx(B,{considered:a.considered,expressionProps:u,form:a.form,simplify:a.simplify,onDelete:()=>this.handleRemoveForm(r),onChangeSimplify:d=>this.changeSimplify(r,d),onChangeForm:d=>this.changeForm(r,d),onChangeConsidered:d=>this.changeConsidered(r,d)},a.key)}),n=F.map(a=>{const r=a==="basic",u=this.props.buttonSets.includes(a)||r;return s.jsx(h,{label:a,checked:u,disabled:r,onChange:()=>this.handleButtonSet(a)},a)});return n.unshift(s.jsx(h,{label:"show ÷ button",checked:this.props.buttonSets.includes("basic+div"),onChange:this.handleToggleDiv},"show ÷ button")),s.jsxs(x,{children:[s.jsx(k,{children:"Global Options"}),s.jsx("div",{className:m.css(i.paddedY),children:s.jsx(b,{label:s.jsxs(s.Fragment,{children:["Visible label",s.jsx(c,{children:"Optional visible text; strongly encouraged to help learners using dictation software, but can be omitted if the surrounding content provides enough context."})]}),value:this.props.visibleLabel||"",onChange:this.handleVisibleLabel})}),s.jsx("div",{className:m.css(i.paddedY),children:s.jsx(b,{label:s.jsxs(s.Fragment,{children:["Aria label",s.jsxs(c,{children:["Label text that's read by screen readers. Highly recommend adding a label here to ensure your exercise is accessible. For more information on writting accessible labels, please see"," ",s.jsx("a",{href:"https://www.w3.org/WAI/tips/designing/#ensure-that-form-elements-include-clearly-associated-labels",target:"_blank",rel:"noreferrer",children:"this article."})]})]}),value:this.props.ariaLabel||"",onChange:this.handleAriaLabel})}),s.jsx("div",{className:m.css(i.paddedY),children:s.jsx(b,{label:s.jsxs(s.Fragment,{children:["Function variables",s.jsx(c,{children:'Single-letter variables listed here will be interpreted as functions. This let us know that f(x) means "f of x" and not "f times x".'})]}),value:this.state.functionsInternal,onChange:this.handleFunctions})}),s.jsx("div",{className:m.css(i.paddedY),children:s.jsx(h,{label:s.jsxs(s.Fragment,{children:["Use × instead of ⋅ for multiplication",s.jsx(c,{children:"For pre-algebra problems this option displays multiplication as \\times instead of \\cdot in both the rendered output and the acceptable formats examples."})]}),checked:this.props.times,onChange:a=>{this.changeTimes(a)}})}),s.jsxs("div",{className:m.css(i.paddedY),children:[s.jsx(K,{children:"Button Sets"}),n]}),s.jsx(k,{children:"Answers"}),s.jsx(P,{style:i.answersSubtitle,children:"student responses area matched against these from top to bottom"}),s.jsx(x,{style:{gap:p.xSmall_8},children:e}),s.jsx(S,{size:p.small_12}),s.jsx(f,{size:"small",onClick:this.newAnswer,children:"Add new answer"})]})}}t(y,"widgetName","expression"),t(y,"defaultProps",L.defaultWidgetOptions);const O=function(o,l){let e=o.indexOf(l);return e=(e+1)%o.length,o[e]};class B extends C.Component{constructor(){super(...arguments);t(this,"state",{deleteFocused:!1});t(this,"handleImSure",()=>{this.props.onDelete(),this.handleCancelDelete()});t(this,"handleCancelDelete",()=>{this.setState({deleteFocused:!1})});t(this,"handleDelete",()=>{this.setState({deleteFocused:!0})});t(this,"toggleConsidered",()=>{const e=O(v,this.props.considered);this.props.onChangeConsidered(e)})}render(){const e=this.state.deleteFocused?s.jsxs(s.Fragment,{children:[s.jsx(f,{size:"small",onClick:this.handleImSure,color:"destructive",children:"I'm sure!"}),s.jsx(S,{size:p.small_12}),s.jsx(f,{size:"small",onClick:this.handleCancelDelete,kind:"secondary",children:"Cancel"})]}):s.jsx(f,{size:"small",onClick:this.handleDelete,color:"destructive",kind:"tertiary",style:i.deleteButton,children:"Delete"});return s.jsxs("div",{className:m.css(i.answerOption),children:[s.jsx(I,{onChange:this.toggleConsidered,allowEmpty:!1,value:this.props.considered,selectedButtonStyle:W[this.props.considered],buttons:v.map(n=>({value:n,content:n,title:`This answer will be considered ${n}`}))}),s.jsx(E,{...this.props.expressionProps}),s.jsx("div",{className:m.css(i.paddedY,i.paddedX),children:s.jsx(h,{label:s.jsxs(s.Fragment,{children:["Answer expression must have the same form.",s.jsx(c,{children:"The student's answer must be in the same form. Commutativity and excess negative signs are ignored."})]}),checked:this.props.form,onChange:this.props.onChangeForm})}),s.jsx("div",{className:m.css(i.paddedY,i.paddedX),children:s.jsx(h,{label:s.jsxs(s.Fragment,{children:["Answer expression must be fully expanded and simplified.",s.jsx(c,{children:`The student's answer must be fully expanded and simplified. Answering this equation (x^2+2x+1) with this factored equation (x+1)^2 will render this response "Your answer is not fully expanded and simplified."`})]}),checked:this.props.simplify,onChange:this.props.onChangeSimplify})}),s.jsx("div",{className:m.css(i.buttonRow,i.paddedY),children:e})]})}}const i=m.StyleSheet.create({paddedX:{paddingLeft:p.xSmall_8,paddingRight:p.xSmall_8},paddedY:{paddingTop:p.xxSmall_6,paddingBottom:p.xxSmall_6},answersSubtitle:{fontStyle:"italic"},answerOption:{border:"1px solid #ddd",borderRadius:"3px",display:"flex",flexDirection:"column"},answerStatusWrong:{backgroundColor:g.fadedRed16},answerStatusCorrect:{backgroundColor:g.fadedGreen16},answerStatusUngraded:{backgroundColor:g.fadedBlue16},buttonRow:{display:"flex"},deleteButton:{paddingInline:D.size_160}}),W={wrong:i.answerStatusWrong,correct:i.answerStatusCorrect,ungraded:i.answerStatusUngraded};y.__docgenInfo={description:"",methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    // The expression forms the answer may come in
    answerForms: PerseusExpressionAnswerForm[];
    buttonSets: LegacyButtonSets;
    // Variables that can be used as functions.  Default: ["f", "g", "h"]
    functions: string[];
    // Use x for rendering multiplication instead of a center dot.
    times: boolean;
    // What extra keys need to be displayed on the keypad so that the
    // question can be answerable without a keyboard (ie mobile)
    // TODO: this is really Key[]
    extraKeys?: KeypadKey[];
    // visible label associated with the MathQuill field
    visibleLabel?: string;
    // aria label for screen readers attached to MathQuill field
    ariaLabel?: string;
    // Controls when buttons for special characters are visible when using a
    // desktop browser.  Defaults to "focused".
    // NOTE: This isn't listed in perseus-format.js or perseus_data.go, but
    // appears in item data in the datastore.
    buttonsVisible?: "always" | "never" | "focused";
}`,signature:{properties:[{key:"answerForms",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"PerseusExpressionAnswerForm[]",required:!0}},{key:"buttonSets",value:{name:"Array",elements:[{name:"union",raw:`| "basic"
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
>`,required:!0}},{key:"functions",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"extraKeys",value:{name:"Array",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"KeypadKey[]",required:!1}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"newAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"handleRemoveForm",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null}],returns:null},{name:"updateAnswerForm",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"answerFormProps",optional:!1,type:{name:"Array[number]",raw:'PerseusExpressionWidgetOptions["answerForms"][number]',alias:"AnswerForm"}}],returns:null},{name:"handleButtonSet",docblock:null,modifiers:[],params:[{name:"changingName",optional:!1,type:null}],returns:null},{name:"handleToggleDiv",docblock:null,modifiers:[],params:[],returns:null},{name:"handleTexInsert",docblock:null,modifiers:[],params:[{name:"str",optional:!1,type:null}],returns:null},{name:"handleFunctions",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handleVisibleLabel",docblock:null,modifiers:[],params:[{name:"visibleLabel",optional:!1,type:null}],returns:null},{name:"handleAriaLabel",docblock:null,modifiers:[],params:[{name:"ariaLabel",optional:!1,type:null}],returns:null},{name:"changeSimplify",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"simplify",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeForm",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"form",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeConsidered",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"considered",optional:!1,type:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]"}}],returns:null},{name:"changeTimes",docblock:null,modifiers:[],params:[{name:"times",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeExpressionWidget",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:null},{name:"props",optional:!1,type:null}],returns:null}],displayName:"ExpressionEditor",props:{widgetId:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: Partial<PerseusExpressionWidgetOptions>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    // The expression forms the answer may come in
    answerForms: PerseusExpressionAnswerForm[];
    buttonSets: LegacyButtonSets;
    // Variables that can be used as functions.  Default: ["f", "g", "h"]
    functions: string[];
    // Use x for rendering multiplication instead of a center dot.
    times: boolean;
    // What extra keys need to be displayed on the keypad so that the
    // question can be answerable without a keyboard (ie mobile)
    // TODO: this is really Key[]
    extraKeys?: KeypadKey[];
    // visible label associated with the MathQuill field
    visibleLabel?: string;
    // aria label for screen readers attached to MathQuill field
    ariaLabel?: string;
    // Controls when buttons for special characters are visible when using a
    // desktop browser.  Defaults to "focused".
    // NOTE: This isn't listed in perseus-format.js or perseus_data.go, but
    // appears in item data in the datastore.
    buttonsVisible?: "always" | "never" | "focused";
}`,signature:{properties:[{key:"answerForms",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"PerseusExpressionAnswerForm[]",required:!0}},{key:"buttonSets",value:{name:"Array",elements:[{name:"union",raw:`| "basic"
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
>`,required:!0}},{key:"functions",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"extraKeys",value:{name:"Array",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"KeypadKey[]",required:!1}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}}],raw:"Partial<PerseusExpressionWidgetOptions>"},name:"newValues"}],return:{name:"void"}}},description:""},answerForms:{defaultValue:{value:"[]",computed:!1},required:!1},times:{defaultValue:{value:"false",computed:!1},required:!1},buttonSets:{defaultValue:{value:'["basic"]',computed:!1},required:!1},functions:{defaultValue:{value:'["f", "g", "h"]',computed:!1},required:!1}}};export{y as E};
