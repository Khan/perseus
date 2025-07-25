var se=Object.defineProperty;var ie=(u,l,t)=>l in u?se(u,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[l]=t;var f=(u,l,t)=>ie(u,typeof l!="symbol"?l+"":l,t);import{j as e,bS as te,n as W,V as q,i as ae,s as o,l as oe,r as P,B as le,w as j,x as J,H as de,bG as ce,bT as ue,bi as pe,bU as he,ad as me,_ as E,bV as F,as as Q,bW as X,U as ge}from"./iframe-wjYrW4ez.js";import"./item-version-CRWZBURm.js";import"./article-renderer-Cdi5PjQJ.js";import"./server-item-renderer-BgAmqVz9.js";import"./hints-renderer-C1eJwggo.js";import{c as we}from"./components-wgz9aVGz.js";import{E as fe}from"./editor-jsonify-7_TGx9bn.js";import{a as be}from"./tex-error-view-Dp59Ie5r.js";import{E as ye}from"./editor-sVYsoIfM.js";function G({title:u,isOpen:l,isCollapsible:t,onToggle:n}){return e.jsx(te,{style:[B.container,!t&&B.notClickable],disabled:!t,onClick:()=>t&&(n==null?void 0:n(!l)),children:()=>e.jsxs(q,{style:B.heading,children:[e.jsx(ae,{style:{fontSize:14,fontWeight:600},children:u}),t&&e.jsx(be,{isExpanded:l})]})})}const B=W.StyleSheet.create({container:{marginTop:o.small_12,marginInline:-10,backgroundColor:oe.offBlack8,padding:o.xSmall_8,width:"calc(100% + 20px)"},heading:{flexDirection:"row",justifyContent:"space-between",userSelect:"none"},notClickable:{color:"inherit",cursor:"default"}});G.__docgenInfo={description:"",methods:[],displayName:"Heading",props:{title:{required:!0,tsType:{name:"string"},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},isCollapsible:{required:!0,tsType:{name:"boolean"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:""}}};const Ae=pe("ul"),xe=6;P.forwardRef(function(l,t){const{children:n,id:a,initialExpandedIndex:i,allowMultipleExpanded:h=!0,caretPosition:p,cornerKind:m="rounded",animated:v,style:O,...S}=l,R=Array(n.length).fill(!1);i!==void 0&&(R[i]=!0);const[I,s]=P.useState(R),r=Array(n.length).fill(null),A=n.length<=xe,w=(d,c)=>{const b=h?[...I]:Array(n.length).fill(!1),g=!I[d];b[d]=g,s(b),c&&c(g)},x=d=>{var b,g,k,N;const c=r.findIndex(T=>T.current===document.activeElement);if(c!==-1)switch(d.key){case"ArrowUp":d.preventDefault();const T=(c+n.length-1)%n.length;(b=r[T].current)==null||b.focus();break;case"ArrowDown":d.preventDefault();const D=(c+1)%n.length;(g=r[D].current)==null||g.focus();break;case"Home":d.preventDefault(),(k=r[0].current)==null||k.focus();break;case"End":d.preventDefault(),(N=r[n.length-1].current)==null||N.focus();break}};return e.jsx(Ae,{style:[ve.wrapper,O],onKeyDown:x,...S,ref:t,children:n.map((d,c)=>{const{caretPosition:b,cornerKind:g,onToggle:k,animated:N}=d.props,T=P.createRef();r[c]=T;const _=c===0,D=c===n.length-1;return e.jsx("li",{id:a,children:P.cloneElement(d,{animated:N??v,caretPosition:b??p,cornerKind:g??m,expanded:I[c],onToggle:()=>w(c,k),isFirstSection:_,isLastSection:D,isRegion:A,ref:T})},c)})})});const ve=W.StyleSheet.create({wrapper:{boxSizing:"border-box",listStyle:"none",padding:0,width:"100%"}});function ke(u,l,t,n){switch(u){case"rounded-per-section":return{roundedTop:!0,roundedBottom:!n};case"rounded":return{roundedTop:l,roundedBottom:t&&!n};default:return{roundedTop:!1,roundedBottom:!1}}}const Ne=P.forwardRef(function(l,t){const{id:n,header:a,caretPosition:i,cornerKind:h,collapsible:p=!0,expanded:m,animated:v,onClick:O,sectionContentUniqueId:S,headerStyle:R,tag:I="h2",testId:s,isFirstSection:r,isLastSection:A}=l,w=typeof a=="string",{roundedTop:x,roundedBottom:d}=ke(h,r,A,m);return e.jsx(de,{tag:I,style:y.heading,children:e.jsx(te,{id:n,"aria-expanded":m,"aria-controls":S,onClick:O,disabled:!p,testId:s?`${s}-header`:void 0,style:[y.headerWrapper,v&&y.headerWrapperWithAnimation,i==="start"&&y.headerWrapperCaretStart,x&&y.roundedTop,d&&y.roundedBottom,R,!p&&y.disabled],ref:t,children:()=>e.jsxs(e.Fragment,{children:[e.jsx(q,{style:[y.headerContent,w&&y.headerString],children:w?e.jsx(q,{style:[i==="end"?y.headerStringCaretEnd:y.headerStringCaretStart],children:a}):a}),p&&e.jsx(ce,{icon:ue,color:j.core.foreground.neutral.default,size:"small",style:[v&&y.iconWithAnimation,i==="start"?y.iconStart:y.iconEnd,m&&y.iconExpanded],testId:s?`${s}-caret-icon`:void 0})]})})})}),H=o.small_12-1,Y="300ms",y=W.StyleSheet.create({heading:{minWidth:0,marginTop:0},headerWrapper:{display:"flex",flexDirection:"row",alignItems:"center",overflow:"hidden",minWidth:"auto",width:"100%",position:"relative",zIndex:1,":active":{outline:`2px solid ${j.action.secondary.progressive.press.border}`},":hover":{outline:`2px solid ${j.action.secondary.progressive.hover.border}`},":focus-visible":{outline:`2px solid ${j.focus.outer}`}},headerWrapperWithAnimation:{transition:`border-radius ${Y}`},headerWrapperCaretStart:{flexDirection:"row-reverse"},roundedTop:{borderStartStartRadius:H,borderStartEndRadius:H},roundedBottom:{borderEndStartRadius:H,borderEndEndRadius:H},headerContent:{flexGrow:1,textAlign:"start"},headerString:{paddingTop:o.medium_16,paddingBottom:o.medium_16},headerStringCaretEnd:{paddingInlineEnd:o.small_12,paddingInlineStart:o.medium_16},headerStringCaretStart:{paddingInlineEnd:o.medium_16,paddingInlineStart:o.small_12},iconWithAnimation:{transition:`transform ${Y}`},iconExpanded:{transform:"rotate(180deg)"},iconStart:{marginInlineStart:o.medium_16},iconEnd:{marginInlineEnd:o.medium_16},disabled:{pointerEvents:"none",color:"inherit",":focus-visible":{outline:`2px solid ${j.focus.outer}`}}}),Pe=P.forwardRef(function(l,t){const{children:n,id:a,header:i,collapsible:h,expanded:p,animated:m=!1,onToggle:v,caretPosition:O="end",cornerKind:S="rounded",style:R,headerStyle:I,tag:s,testId:r,isFirstSection:A=!0,isLastSection:w=!0,isRegion:x=!0,...d}=l,[c,b]=P.useState(p??!1),g=p!==void 0&&v,k=P.useId(),N=a??k,T=P.useId(),_=a?`${a}-header`:T,D=P.useId(),K=Ie(S,A,w),V=()=>{g?v(!p):(b(!c),v&&v(!c))};let M;return h===!1?M=!0:M=g?p:c,e.jsxs(q,{id:N,style:[C.wrapper,m&&C.wrapperWithAnimation,K.wrapper,M?C.wrapperExpanded:C.wrapperCollapsed,R],testId:r,...d,children:[e.jsx(Ne,{id:_,header:i,caretPosition:O,cornerKind:S,collapsible:h,expanded:M,animated:m,onClick:V,sectionContentUniqueId:D,headerStyle:I,tag:s,testId:r,isFirstSection:A,isLastSection:w,ref:t}),e.jsx(q,{id:D,role:x?"region":void 0,"aria-labelledby":_,style:[C.contentWrapper,M?C.contentWrapperExpanded:C.conentWrapperCollapsed,K.contentWrapper],testId:r?`${r}-content-panel`:void 0,children:typeof n=="string"?e.jsx(le,{style:C.stringContent,children:n}):n})]})}),C=W.StyleSheet.create({wrapper:{display:"grid",position:"static",boxSizing:"border-box",backgroundColor:j.surface.primary},wrapperWithAnimation:{transition:"grid-template-rows 300ms"},wrapperCollapsed:{gridTemplateRows:"min-content 0fr"},wrapperExpanded:{gridTemplateRows:"min-content 1fr"},contentWrapper:{overflow:"hidden"},conentWrapperCollapsed:{visibility:"hidden"},contentWrapperExpanded:{visibility:"visible"},stringContent:{padding:o.medium_16}}),$={},Ie=(u,l,t)=>{const n=`${u}-${l.toString()}-${t.toString()}`;if($[n])return $[n];let a=Object.freeze({}),i=Object.freeze({}),h=Object.freeze({}),p=Object.freeze({});const m=`1px solid ${j.core.border.neutral.subtle}`;u==="square"&&(a={border:m,borderBottom:"none",borderRadius:J.radius.radius_0},t&&(p={borderBottom:m})),u==="rounded"&&(a={border:m,borderBottom:"none"},l&&(h={borderStartStartRadius:o.small_12,borderStartEndRadius:o.small_12}),t&&(p={borderBottom:m,borderEndStartRadius:o.small_12,borderEndEndRadius:o.small_12},i={borderEndEndRadius:o.small_12,borderEndStartRadius:o.small_12})),u==="rounded-per-section"&&(a={border:m,borderRadius:J.radius.radius_120,marginBottom:o.medium_16},i={borderEndEndRadius:o.small_12,borderEndStartRadius:o.small_12});const v={wrapper:{...a,...h,...p},contentWrapper:i};return $[n]=W.StyleSheet.create(v),$[n]},re=u=>{const{animated:l,children:t,header:n,expanded:a,containerStyle:i,panelStyle:h,onToggle:p}=u;return e.jsx(q,{className:"perseus-editor-accordion",children:e.jsx(Pe,{animated:l,expanded:a,onToggle:p,style:[U.container,i],headerStyle:U.accordionHeader,header:n,children:e.jsx(q,{style:[U.accordionPanel,h],children:t})})})},U=W.StyleSheet.create({container:{backgroundColor:j.core.background.instructive.subtle,marginTop:o.xSmall_8},accordionHeader:{padding:o.small_12,paddingInlineEnd:0,height:o.xxLarge_48},accordionPanel:{paddingTop:o.xxSmall_6,paddingBottom:o.xxxSmall_4,paddingLeft:o.small_12,paddingRight:o.small_12}});re.__docgenInfo={description:"",methods:[],displayName:"PerseusEditorAccordion",props:{animated:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"union",raw:"React.ReactNode | React.ReactNode[]",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"}]},description:""},header:{required:!0,tsType:{name:"union",raw:"string | React.ReactElement",elements:[{name:"string"},{name:"ReactReactElement",raw:"React.ReactElement"}]},description:""},expanded:{required:!1,tsType:{name:"boolean"},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""},panelStyle:{required:!1,tsType:{name:"StyleType"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""}}};const Se=""+new URL("trash-bold-CtqTW1Dq.svg",import.meta.url).href,{InfoTip:L,NumberInput:Z,TextInput:Re}=we,{firstNumericalParse:ee}=ge,Te=[{title:"Integers",value:"integer",content:"6"},{title:"Decimals",value:"decimal",content:"0.75"},{title:"Proper fractions",value:"proper",content:"⅗"},{title:"Improper fractions",value:"improper",content:"⁷⁄₄"},{title:"Mixed numbers",value:"mixed",content:"1¾"},{title:"Numbers with π",value:"pi",content:"π"}],ne=u=>({value:null,status:u,message:"",simplify:"required",answerForms:[],strict:!1,maxError:null});class z extends P.Component{constructor(t){super(t);f(this,"change",(...t)=>me.apply(this,t));f(this,"onToggleAnswers",t=>{const n=this.state.showAnswerDetails.slice();n[t]=!n[t],this.setState({showAnswerDetails:n})});f(this,"onToggleAnswerForm",(t,n)=>{let a=[...this.props.answers[t].answerForms??[]];a.includes(n)?a=a.filter(p=>p!==n):a.push(n);const h=this.updateAnswer(t,"answerForms");h&&h(a)});f(this,"onToggleHeading",t=>()=>{const n=`show${t}`,a={...this.state};a[n]=!a[n],this.setState(a)});f(this,"onTrashAnswer",t=>{if(t>=0&&t<this.props.answers.length){const n=this.props.answers.slice(0);n.splice(t,1),this.props.onChange({answers:n})}});f(this,"onSpace",(t,n,...a)=>{t.key===" "&&(t.preventDefault(),n.apply(this,a))});f(this,"onStatusChange",t=>{const n=["wrong","ungraded","correct"],a=this.props.answers,i=n.indexOf(a[t].status),h=n[(i+1)%n.length];this.updateAnswer(t,{status:h,simplify:h==="correct"?"required":"accepted"})});f(this,"onEvaluationChange",(t,n)=>{this.updateAnswer(t,{status:n,simplify:n==="correct"?"required":"accepted"})});f(this,"updateAnswer",(t,n)=>{if(!E.isObject(n))return E.partial((i,h,p)=>{const m={};m[h]=p,this.updateAnswer(i,m)},t,n);let a=[...this.props.answers];if(t===a.length){const i=ne(this.state.lastStatus);a=a.concat(i)}a[t]=E.extend({},a[t],n),this.props.onChange({answers:a})});f(this,"addAnswer",()=>{const t=ne(this.state.lastStatus),n=this.props.answers.concat(t),a=this.state.showAnswerDetails.concat(!0);this.setState({showAnswerDetails:a}),this.props.onChange({answers:n})});f(this,"getSaveWarnings",()=>{const t=[];return E.contains(E.pluck(this.props.answers,"value"),"")&&t.push("One or more answers is empty"),this.props.answers.forEach((n,a)=>{n.strict&&(!n.answerForms||n.answerForms.length===0)&&t.push(`Answer ${a+1} is set to string format matching, but no format was selected`)}),t});f(this,"serialize",()=>fe.serialize.call(this));this.state={lastStatus:"wrong",showAnswerDetails:Array(this.props.answers.length).fill(!0),showSettings:!0,showAnswers:!0}}render(){const t=this.props.answers,n={size:"medium",role:"radio",style:{marginRight:"8px"}},a=s=>{const{kind:r,onClick:A,ariaLabel:w,children:x}=s,d=s.role??"radio",c={...n,"aria-label":w,kind:r,role:d,onClick:A};return e.jsx(F,{...c,children:x})},i=s=>{const{answerIndex:r,answerProperty:A,value:w,children:x}=s,c=t[r][A]===w?"accent":"transparent",b={};b[A]=w;const g=s.onClick??(()=>{this.updateAnswer(r,b)});return e.jsx(a,{kind:c,onClick:g,children:x})},h=s=>e.jsxs("fieldset",{className:"perseus-widget-row unsimplified-options",children:[t[s].status!=="correct"&&e.jsx(e.Fragment,{children:e.jsx("legend",{className:"inline-options",children:"Unsimplified answers are irrelevant for this status"})}),t[s].status==="correct"&&e.jsxs(e.Fragment,{children:[e.jsx("legend",{className:"inline-options",children:"Unsimplified answers are"}),e.jsx("span",{className:"tooltip-for-legend",children:e.jsxs(L,{children:[e.jsx("p",{children:'Normally select "ungraded". This will give the user a message saying the answer is correct but not simplified. The user will then have to simplify it and re-enter, but will not be penalized. (5th grade and after)'}),e.jsx("p",{children:'Select "accepted" only if the user is not expected to know how to simplify fractions yet. (Anything prior to 5th grade)'}),e.jsxs("p",{children:['Select "wrong" ',e.jsx("em",{children:"only"})," if we are specifically assessing the ability to simplify."]})]})}),e.jsx("br",{}),e.jsx(i,{answerIndex:s,answerProperty:"simplify",value:"required",children:"Ungraded"}),e.jsx(i,{answerIndex:s,answerProperty:"simplify",value:"optional",children:"Accepted"}),e.jsx(i,{answerIndex:s,answerProperty:"simplify",value:"enforced",children:"Wrong"})]})]}),p=s=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Possible answer formats "}),e.jsxs(L,{children:[e.jsx("p",{children:'Formats will be autoselected for you based on the given answer; to show no suggested formats and accept all types, simply have a decimal/integer be the answer. Values with π will have format "pi", and values that are fractions will have some subset (mixed will be "mixed" and "proper"; improper/proper will both be "improper" and "proper"). If you would like to specify that it is only a proper fraction (or only a mixed/improper fraction), deselect the other format. Except for specific cases, you should not need to change the autoselected formats.'}),e.jsxs("p",{children:["To restrict the answer to ",e.jsx("em",{children:"only"}),' an improper fraction (i.e. 7/4), select the improper fraction and toggle "strict" to true. This ',e.jsx("b",{children:"will not"})," ","accept 1.75 as an answer."," "]}),e.jsx("p",{children:"Unless you are testing that specific skill, please do not restrict the answer format."})]}),e.jsx("br",{}),Te.map(r=>{var d;const w=((d=t[s].answerForms)==null?void 0:d.includes(r.value))?"accent":"transparent",x=()=>{this.onToggleAnswerForm(s,r.value)};return e.jsx(a,{ariaLabel:r.title,kind:w,role:"checkbox",onClick:x,children:r.content},r.value)})]}),e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{children:"Answer formats are: "}),e.jsx(i,{answerIndex:s,answerProperty:"strict",value:!1,children:"Suggested"}),e.jsx(i,{answerIndex:s,answerProperty:"strict",value:!0,children:"Required"})]})]}),m=e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Width: "}),e.jsx(F,{...n,kind:this.props.size==="normal"?"accent":"transparent",onClick:()=>{this.change("size")("normal")},children:"Normal (80px)"}),e.jsx(F,{...n,kind:this.props.size==="small"?"accent":"transparent",onClick:()=>{this.change("size")("small")},children:"Small (40px)"}),e.jsx(L,{children:e.jsx("p",{children:'Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them.'})})]}),v=e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Alignment: "}),e.jsx(F,{...n,kind:this.props.rightAlign?"transparent":"accent",onClick:()=>{this.props.onChange({rightAlign:!1})},children:"Left"}),e.jsx(F,{...n,kind:this.props.rightAlign?"accent":"transparent",onClick:()=>{this.props.onChange({rightAlign:!0})},children:"Right"})]}),O=e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Aria label"}),e.jsx(L,{children:e.jsx("p",{children:"Text to describe this input. This will be shown to users using screenreaders."})})]}),e.jsx(Re,{labelText:"aria label",value:this.props.labelText,onChange:this.change("labelText")})]}),S=e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Number style: "}),e.jsx(F,{...n,kind:this.props.coefficient?"transparent":"accent",onClick:()=>{this.props.onChange({coefficient:!1})},children:"Standard"}),e.jsx(F,{...n,kind:this.props.coefficient?"accent":"transparent",onClick:()=>{this.props.onChange({coefficient:!0})},children:"Coefficient"}),e.jsx(L,{children:e.jsx("p",{children:"A coefficient style number allows the student to use - for -1 and an empty string to mean 1."})})]}),R={wrong:"(address the mistake/misconception)",ungraded:"(explain in detail to avoid confusion)",correct:"(reinforce the user's understanding)"},I=()=>t.map((s,r)=>{const A=e.jsx(ye,{apiOptions:this.props.apiOptions,content:s.message||"",placeholder:"Why is this answer "+s.status+"?	"+R[s.status],widgetEnabled:!1,onChange:g=>{"content"in g&&this.updateAnswer(r,{message:g.content})}}),w=s.status.charAt(0).toUpperCase()+s.status.slice(1),x=(s.answerForms||[]).at(-1),d=X.toNumericString(s.value??0,x),c=s.maxError?`± ${X.toNumericString(s.maxError,x)}`:"",b=s.value===null?"New Answer":`${w} answer: ${d} ${c}`;return e.jsx("div",{className:"perseus-widget-row answer-option",children:e.jsxs(re,{animated:!0,expanded:this.state.showAnswerDetails[r],onToggle:()=>{this.onToggleAnswers(r)},header:e.jsx(ae,{children:b}),children:[e.jsxs("div",{className:"input-answer-editor-value-container"+(s.maxError?" with-max-error":""),children:[e.jsxs("label",{children:["User input:",e.jsx(Z,{value:s.value,className:"numeric-input-value",placeholder:"answer",format:E.last(s.answerForms||[]),onFormatChange:(g,k)=>{let N;k==="pi"?N=["pi"]:k==="mixed"?N=["proper","mixed"]:(k==="proper"||k==="improper")&&(N=["proper","improper"]),this.updateAnswer(r,{value:ee(g),answerForms:N})},onChange:g=>{this.updateAnswer(r,{value:ee(g)})}})]}),e.jsx("span",{className:"max-error-plusmn",children:"±"}),e.jsx(Z,{className:"max-error-input-value",placeholder:0,value:t[r].maxError,format:E.last(s.answerForms||[]),onChange:this.updateAnswer(r,"maxError")})]}),e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Status:"}),e.jsx(i,{answerIndex:r,answerProperty:"status",value:"correct",onClick:()=>{this.onEvaluationChange(r,"correct")},children:"Correct"}),e.jsx(i,{answerIndex:r,answerProperty:"status",value:"wrong",onClick:()=>{this.onEvaluationChange(r,"wrong")},children:"Wrong"}),e.jsx(i,{answerIndex:r,answerProperty:"status",value:"ungraded",onClick:()=>{this.onEvaluationChange(r,"ungraded")},children:"Ungraded"})]}),h(r),e.jsx("div",{className:"perseus-widget-row",children:"(Articles only) Message shown to user:"}),A,p(r),e.jsx(Q,{startIcon:Se,"aria-label":`Delete ${b}`,className:"delete-item-button",onClick:()=>{this.onTrashAnswer(r)},kind:"tertiary",children:"Delete"})]})},r)});return e.jsxs("div",{className:"perseus-input-number-editor",children:[e.jsx(G,{title:"General Settings",isCollapsible:!0,isOpen:this.state.showSettings,onToggle:this.onToggleHeading("Settings")}),e.jsx("div",{className:`perseus-editor-accordion-container ${this.state.showSettings?"expanded":"collapsed"}`,children:e.jsxs("div",{className:"perseus-editor-accordion-content",children:[m,v,S,O]})}),e.jsx(G,{title:"Answers",isCollapsible:!0,isOpen:this.state.showAnswers,onToggle:this.onToggleHeading("Answers")}),e.jsx("div",{className:`perseus-editor-accordion-container ${this.state.showAnswers?"expanded":"collapsed"}`,children:e.jsxs("div",{className:"perseus-editor-accordion-content",children:[I(),e.jsx(Q,{kind:"tertiary",onClick:this.addAnswer,children:"Add new answer"})]})})]})}}f(z,"widgetName","numeric-input"),f(z,"displayName","NumericInputEditor"),f(z,"defaultProps",he.defaultWidgetOptions);z.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onToggleAnswers",docblock:null,modifiers:[],params:[{name:"answerIndex",optional:!1,type:{name:"number"}}],returns:null},{name:"onToggleAnswerForm",docblock:null,modifiers:[],params:[{name:"answerIndex",optional:!1,type:{name:"number"}},{name:"answerForm",optional:!1,type:null}],returns:null},{name:"onToggleHeading",docblock:null,modifiers:[],params:[{name:"accordionName",optional:!1,type:{name:"string"}}],returns:null},{name:"onTrashAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onSpace",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null},{name:"callback",optional:!1,type:null},{name:"...args",optional:!1,type:null}],returns:null},{name:"onStatusChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onEvaluationChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newStatus",optional:!1,type:null}],returns:null},{name:"updateAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"update",optional:!1,type:null}],returns:null},{name:"addAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"NumericInputEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(results: any) => any",signature:{arguments:[{type:{name:"any"},name:"results"}],return:{name:"any"}}},description:""},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,elements:[{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    /**
     * @deprecated - metadata is no longer used by the Group widget
     */
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** Indicates whether or not to use mobile app styling. */
    isMobileApp?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /**
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     *
     * @deprecated [LEMS-3185] this is externalizing an internal implementation
     * detail similar to serialized state
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}`,signature:{properties:[{key:"isArticle",value:{name:"boolean",required:!1}},{key:"onFocusChange",value:{name:"signature",type:"function",raw:`(
    newFocusPath: FocusPath,
    oldFocusPath: FocusPath,
    keypadHeight?: number,
    focusedElement?: HTMLElement,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1},description:"@deprecated - metadata is no longer used by the Group widget"},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
answered correctly and should no longer be interactive.`},{key:"answerableCallback",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1}},{key:"getAnotherHint",value:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}},required:!1}},{key:"interactionCallback",value:{name:"signature",type:"function",raw:"(widgetData: {[widgetId: string]: any}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{[widgetId: string]: any}",signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"widgetData"}],return:{name:"void"}},required:!1}},{key:"groupAnnotator",value:{name:"signature",type:"function",raw:"(groupNumber: number, widgetId: string) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"groupNumber"},{type:{name:"string"},name:"widgetId"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`A function that takes in the relative problem number (starts at
0 and is incremented for each group widget), and the ID of the
group widget, then returns a react component that will be added
immediately above the renderer in the group widget. If the
function returns null, no annotation will be added.`},{key:"imagePlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If imagePlaceholder is set, Perseus will render the placeholder instead
of the image node.`},{key:"widgetPlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If widgetPlaceholder is set, Perseus will render the placeholder instead
of the widget node.`},{key:"baseElements",value:{name:"signature",type:"object",raw:`{
    /**
     * The <Link /> component provided here must adhere to the same
     * interface as React's base <a /> component.
     */
    Link: React.ComponentType<any>;
}`,signature:{properties:[{key:"Link",value:{name:"ReactComponentType",raw:"React.ComponentType<any>",elements:[{name:"any"}],required:!0},description:`The <Link /> component provided here must adhere to the same
interface as React's base <a /> component.`}]},required:!1},description:`Base React elements that can be used in place of the standard DOM
DOM elements. For example, when provided, <Link /> will be used
in place of <a />. This allows clients to provide pre-styled
components or components with custom behavior.`},{key:"imagePreloader",value:{name:"signature",type:"function",raw:"(dimensions: Dimensions) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]}},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
to display while an image is loading.`},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(args: TrackInteractionArgs) => void",signature:{arguments:[{type:{name:"intersection",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
} & Partial<TrackingGradedGroupExtraArguments> &
    Partial<TrackingSequenceExtraArguments>`,elements:[{name:"signature",type:"object",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"correct",value:{name:"boolean",required:!1}}]}},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    status: "correct" | "incorrect" | "invalid";
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]}}],raw:"Partial<TrackingGradedGroupExtraArguments>"},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    visible: number;
}`,signature:{properties:[{key:"visible",value:{name:"number",required:!0}}]}}],raw:"Partial<TrackingSequenceExtraArguments>"}]},name:"args"}],return:{name:"void"}},required:!1},description:`A function that is called when the user has interacted with a widget. It
also includes any extra parameters that the originating widget provided.
This is used for keeping track of widget interactions.`},{key:"customKeypad",value:{name:"boolean",required:!1},description:`A boolean that indicates whether or not a custom keypad is
being used.  For mobile web this will be the ProvidedKeypad
component.  In this situation we use the MathInput component
from the math-input repo instead of the existing perseus math
input components.`},{key:"nativeKeypadProxy",value:{name:"signature",type:"function",raw:"(blur: () => void) => KeypadAPI",signature:{arguments:[{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"blur"}],return:{name:"KeypadAPI"}},required:!1},description:`If this is provided, it is called instead of appending an instance
of \`math-input\`'s keypad to the body. This is used by the native
apps so they can have the keypad be defined on the native side.
It is called with an function that, when called, blurs the input,
and is expected to return an object of the shape
keypadElementPropType from math-input/src/prop-types.js.`},{key:"isMobile",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile styling."},{key:"isMobileApp",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile app styling."},{key:"setDrawingAreaAvailable",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1},description:`A function, called with a bool indicating whether use of the
drawing area (scratchpad) should be allowed/disallowed.

Previously handled by \`Khan.scratchpad.enable/disable\``},{key:"hintProgressColor",value:{name:"string",required:!1},description:"The color used for the hint progress indicator (eg. 1 / 3)"},{key:"canScrollPage",value:{name:"boolean",required:!1},description:`Whether this Renderer is allowed to auto-scroll the rest of the
page. For example, if this is enabled, the most recently used
radio widget will attempt to keep the "selected" answer in view
after entering review mode.

Defaults to \`false\`.`},{key:"editorChangeDelay",value:{name:"number",required:!1},description:`The value in milliseconds by which the local state of content
in a editor is delayed before propagated to a prop. For example,
when text is typed in the text area of an Editor component,
there will be a delay equal to the value of \`editorChangeDelay\`
before the change is propagated. This is added for better
responsiveness of the editor when used in certain contexts such
as StructuredItem exercises where constant re-rendering for each
keystroke caused text typed in the text area to appear in it
only after a good few seconds.`},{key:"flags",value:{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof PerseusFeatureFlags)[number]"},{name:"boolean"}],raw:"Record<(typeof PerseusFeatureFlags)[number], boolean>",required:!1},description:`Feature flags that can be passed from consuming application.
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
after they have been transformed by the widget's transform function.
This is useful for when we need to know how a widget has shuffled its
the available choices.

@deprecated [LEMS-3185] this is externalizing an internal implementation
detail similar to serialized state`}]}}],raw:`Readonly<{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    /**
     * @deprecated - metadata is no longer used by the Group widget
     */
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** Indicates whether or not to use mobile app styling. */
    isMobileApp?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /**
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     *
     * @deprecated [LEMS-3185] this is externalizing an internal implementation
     * detail similar to serialized state
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"isMobileApp",value:{name:"NonNullable",elements:[{name:'Readonly["isMobileApp"]',raw:'APIOptions["isMobileApp"]'}],raw:'NonNullable<APIOptions["isMobileApp"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
    }
>`},description:""},answers:{defaultValue:{value:`[
    {
        value: null,
        status: "correct",
        message: "",
        simplify: "required",
        answerForms: [],
        strict: false,
        maxError: null,
    },
]`,computed:!1},required:!1},size:{defaultValue:{value:'"normal"',computed:!1},required:!1},coefficient:{defaultValue:{value:"false",computed:!1},required:!1},labelText:{defaultValue:{value:'""',computed:!1},required:!1},rightAlign:{defaultValue:{value:"false",computed:!1},required:!1}}};export{G as H,z as N,re as P,Se as t};
