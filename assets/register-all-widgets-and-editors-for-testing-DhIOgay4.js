var Hi=Object.defineProperty;var Ui=(i,r,n)=>r in i?Hi(i,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[r]=n;var l=(i,r,n)=>Ui(i,typeof r!="symbol"?r+"":r,n);import{ch as Ki,ci as Xi,cj as Yi,ck as Ji,r as h,_ as y,j as e,bS as Tr,a7 as I,A as Ea,cl as de,cm as Qi,al as K,a9 as ae,cn as Zi,co as eo,w as yt,bQ as no,E as ao,cp as to,cq as ro,ag as Sr,ar as W,k as U,cr as Fe,i as bt,cs as io,bn as oo,ct as Et,cu as so,cv as lo,V as x,H as lt,n as R,ae as Ka,cw as tn,cx as uo,s as m,l as L,ao as ne,cy as _t,cz as mo,bv as T,o as O,cA as po,cB as co,cC as Jn,U as ue,cD as fa,cE as ho,cF as go,cG as Ar,cH as yo,cI as jr,cJ as bo,cK as wo,cL as fo,cM as se,cN as vo,b4 as ko,cO as De,cP as xo,I as Qn,cc as Pr,cQ as Nr,cR as aa,cS as Co,cT as qo,q as E,bw as Re,cU as wt,bD as Ir,t as M,bC as ve,cV as To,h as gn,cW as Se,cX as So,b1 as on,ca as ta,by as Ge,g as Ao,cY as jo,c8 as ft,cZ as Lr,L as We,c_ as Po,c$ as No,c9 as Io,d0 as fe,aq as Rr,bJ as Fr,d1 as vt,d2 as _a,d3 as kt,b_ as Lo,bO as Or,d4 as wn,d5 as xt,b2 as Ro,d6 as Ee,d7 as za,ap as ce,c0 as fn,d8 as Fo,d9 as Oo,da as Ct,aw as qe,db as Er,dc as _r,dd as zr,de as Dr,df as Mr,dg as $r,dh as Vr,di as Wr,dj as Gr,dk as Br,dl as Hr,dm as Eo,dn as _o,dp as ie,dq as zo,dr as Do,ds as Mo,dt as $o,du as Vo,dv as Wo,dw as Go,dx as Bo,dy as Ho,bH as zt,dz as Uo,dA as Ko,dB as dn,bX as Xo,dC as Yo,dD as Jo,dE as Qo,dF as Zo,b9 as es,ba as ns,c1 as as,c2 as ts,c3 as rs}from"./iframe-BcUK2hYc.js";import"./item-version-DDS7dZSD.js";import"./article-renderer-jlYA3cTY.js";import"./server-item-renderer-_SCIumcW.js";import"./hints-renderer-EacNxn1w.js";import{c as G}from"./components-Cv7mMrXd.js";import{E as Q}from"./editor-jsonify-CFFswu14.js";import{B as Oe}from"./blur-input-Dor38g0g.js";import{E as Ae,I as is}from"./image-editor-CO3RpZOc.js";import{i as Ur,g as os,b as ss,a as ls}from"./icon-paths-TWGXQwCz.js";import{p as rn,F as us}from"./free-response-editor-MzCl4IB-.js";import{I as ds}from"./input-number-editor-B-JxfaMb.js";import{P as ms,d as ps}from"./Popper-D4lDcsfB.js";import{a as cs}from"./tex-error-view-BS_rdTYj.js";import{L as hs}from"./label-image-editor-BwDntSvu.js";import{M as gs}from"./matcher-editor-C17g6f0-.js";import{N as ys}from"./number-line-editor-CPy-eLTv.js";import{P as bs}from"./phet-simulation-editor-wUmrISQF.js";import{P as ws}from"./plotter-editor-RC45O6sd.js";import{P as fs}from"./python-program-editor-DkT8Zlac.js";import{S as vs}from"./sorter-editor-9hy_VZGw.js";const ks={chooseType:Ki,defaultPlotProps:Xi,getEquationString:Yi,typeToButton:Ji};class ut extends h.Component{constructor(r){super(r),this.state=this.getInitialState(),this.handleBlur=this.handleBlur.bind(this),this.handleChange=this.handleChange.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}getInitialState(){return{currentValue:JSON.stringify(this.props.value,null,4),valid:!0}}UNSAFE_componentWillReceiveProps(r){(!this.state.valid||!y.isEqual(r.value,JSON.parse(this.state.currentValue?this.state.currentValue:"")))&&this.setState(this.getInitialState())}handleKeyDown(r){if(r.key==="Tab"){const n=r.target.selectionStart,a=r.target.value,t=a.substring(0,n),o=a.substring(n,a.length);r.target.value=t+"    "+o,r.target.selectionStart=t.length+4,r.target.selectionEnd=t.length+4,r.preventDefault(),this.handleChange(r)}}handleChange(r){const n=r.target.value;try{let a=JSON.parse(n);y.isString(a)&&(a=JSON.parse(a)),this.setState({currentValue:n,valid:!0},function(){this.props.onChange(a)})}catch{this.setState({currentValue:n,valid:!1})}}handleBlur(r){const n=r.target.value;try{let a=JSON.parse(n);y.isString(a)&&(a=JSON.parse(a)),this.setState({currentValue:JSON.stringify(a,null,4),valid:!0},function(){this.props.onChange(a)})}catch{this.setState({currentValue:JSON.stringify(this.props.value,null,4),valid:!0})}}render(){const r="perseus-json-editor "+(this.state.valid?"valid":"invalid");return e.jsx("textarea",{className:r,value:this.state.currentValue,onChange:this.handleChange,onKeyDown:this.handleKeyDown,onBlur:this.handleBlur})}}l(ut,"displayName"),l(ut,"defaultProps",{value:{}});ut.__docgenInfo={description:"",methods:[{name:"handleKeyDown",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleBlur",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null}],props:{multiLine:{required:!0,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"{}",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newJson: any) => void",signature:{arguments:[{type:{name:"any"},name:"newJson"}],return:{name:"void"}}},description:""}}};let Dt=0;const dt={},mt={};window.iframeDataStore={};window.addEventListener("message",i=>{if(typeof i.data=="string"){const r=dt[i.data];r&&r()}else i.data.id&&(i.data.height!==void 0?mt[i.data.id](i.data.height):i.data.lintWarnings&&Tr.log("LINTER REPORT",{lintWarnings:JSON.stringify(i.data.lintWarnings)}))});class xs extends h.Component{constructor(){super(...arguments);l(this,"_frame");l(this,"container",h.createRef());l(this,"_isMounted");l(this,"_lastData");l(this,"_lastHeight");l(this,"iframeID")}componentDidMount(){this._isMounted=!0,this.iframeID=Dt,Dt++,this._prepareFrame(),dt[this.iframeID]=()=>{this.sendNewData(this._lastData)},mt[this.iframeID]=n=>{this._lastHeight=n,this._isMounted&&this.props.seamless&&this.container.current&&(this.container.current.style.height=n+"px")}}shouldComponentUpdate(n){return n.datasetValue!==this.props.datasetValue||n.seamless!==this.props.seamless}componentDidUpdate(n){this.container.current&&(this.props.seamless?this.container.current.style.height=this._lastHeight+"px":this.container.current.style.height="100%"),n.datasetValue!==this.props.datasetValue&&this._prepareFrame()}componentWillUnmount(){dt[this.iframeID]=null,mt[this.iframeID]=null,this._isMounted=!1}_prepareFrame(){var a,t;this._frame&&((a=this.container.current)==null||a.removeChild(this._frame));const n=document.createElement("iframe");n.style.width="100%",n.style.height="100%",n.src=this.props.url,this.props.datasetKey&&(n.dataset[this.props.datasetKey]=this.props.datasetValue),n.dataset.id=String(this.iframeID),this.props.seamless&&(n.dataset.lintGutter="true"),(t=this.container.current)==null||t.appendChild(n),this._frame=n}sendNewData(n){const a=this._frame;this._isMounted&&n&&(a!=null&&a.contentWindow)&&(this._lastData=n,window.iframeDataStore[this.iframeID]=n,a.contentWindow.postMessage(this.iframeID,"*"))}render(){return e.jsx("div",{ref:this.container,style:{width:"100%",height:"100%"}})}}xs.__docgenInfo={description:"",methods:[{name:"_prepareFrame",docblock:null,modifiers:[],params:[],returns:null},{name:"sendNewData",docblock:null,modifiers:[],params:[{name:"data",optional:!1,type:{name:"any"}}],returns:null}],displayName:"IframeContentRenderer",props:{url:{required:!0,tsType:{name:"string"},description:""},datasetKey:{required:!0,tsType:{name:"string"},description:""},datasetValue:{required:!0,tsType:{name:"any"},description:""},seamless:{required:!0,tsType:{name:"boolean"},description:""}}};const{TextListEditor:Mt}=G,Cs=Zi.widget;class In extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const n={items:this.props.items,categories:this.props.categories,userInput:{values:this.props.values},handleUserInput:a=>{this.props.onChange({values:a.values})},apiOptions:this.props.apiOptions,trackInteraction:function(){}};return e.jsxs("div",{children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ae,{label:"Randomize item order",checked:this.props.randomizeItems,onChange:a=>{this.props.onChange({randomizeItems:a})}})}),"Categories:",e.jsx(Mt,{options:this.props.categories,onChange:a=>{this.change("categories",a)},layout:"horizontal"}),"Items:",e.jsx(Mt,{options:this.props.items,onChange:a=>{this.change({items:a,values:y.first(this.props.values,a.length)})},layout:"vertical"}),e.jsx(Cs,{...n})]})}}l(In,"propTypes",{...de,apiOptions:Ea.propTypes,items:I.arrayOf(I.string),categories:I.arrayOf(I.string),values:I.arrayOf(I.number),randomizeItems:I.bool}),l(In,"widgetName","categorizer"),l(In,"defaultProps",Qi.defaultWidgetOptions);In.__docgenInfo={description:"An editor for adding a categorizer widget that allows users to sort items into categories.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"CategorizerEditor",props:{items:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},categories:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},values:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1},randomizeItems:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0}},composes:["@khanacademy/perseus"]};const{InfoTip:$t}=G,qs=400,Ts=400;var wa;let Ss=(wa=class extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("fieldset",{className:"pair-editor",children:[e.jsxs("label",{children:["Name:"," ",e.jsx(Oe,{value:this.props.name,onChange:this.change("name")})]}),e.jsxs("label",{children:[" ","Value:"," ",e.jsx(Oe,{value:this.props.value,onChange:this.change("value")})]})]})}},l(wa,"propTypes",{...de,name:I.string,value:I.string}),l(wa,"defaultProps",{name:"",value:""}),wa);var st;let As=(st=class extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"handlePairChange",(n,a)=>{const t=this.props.pairs.slice();t[n]=a;const o=t[t.length-1];o.name&&o.value&&t.push({name:"",value:""}),this.change("pairs",t)});l(this,"serialize",()=>Q.serialize.call(this))}render(){const n=y.map(this.props.pairs,(a,t)=>e.jsx(Ss,{name:a.name,value:a.value,onChange:this.handlePairChange.bind(this,t)},t));return e.jsx("div",{children:n})}},l(st,"propTypes",{...de,pairs:I.arrayOf(I.shape({name:I.string,value:I.string})).isRequired}),st);const js=/khanacademy\.org\/computer-programming\/[^\/]+\/(\d+)/;function Ps(i){const r=js.exec(i);return r&&(i=r[1]),i}class Ln extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"_handleSettingsChange",n=>{this.change({settings:n.pairs})});l(this,"_handleProgramIDChange",n=>{n=Ps(n);const{isDevServer:a,InitialRequestUrl:t}=yt(),s=`${a?t.origin:"https://www.khanacademy.org"}/api/internal/scratchpads/${n}`;no.getJSON(s).done(u=>{const d=u.userAuthoredContentType;this.change({width:u.width,height:u.height,programID:n,programType:d})}).fail((u,d,c)=>{Tr.error("Error retrieving scratchpad info for program ID ",ao.TransientService,{cause:c,loggedMetadata:{textStatus:d,programID:n}}),this.change({width:qs,height:Ts,programID:n,programType:null})})});l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsxs("label",{children:["Url or Program ID:"," ",e.jsx(Oe,{value:this.props.programID,onChange:this._handleProgramIDChange})]}),e.jsx("br",{}),e.jsx(ae,{label:"Show Editor",checked:this.props.showEditor,onChange:n=>{this.props.onChange({showEditor:n})}}),e.jsx($t,{children:'If you show the editor, you should use the "full-width" alignment to make room for the width of the editor.'}),e.jsx("br",{}),e.jsx(ae,{label:"Show Buttons",checked:this.props.showButtons,onChange:n=>{this.props.onChange({showButtons:n})}}),e.jsx("br",{}),e.jsxs("label",{children:["Settings:",e.jsx(As,{name:"settings",pairs:this.props.settings,onChange:this._handleSettingsChange}),e.jsxs($t,{children:["Settings that you add here are available to the program as an object returned by ",e.jsx("code",{children:"Program.settings()"})]})]})]})}}l(Ln,"propTypes",{...de}),l(Ln,"widgetName","cs-program"),l(Ln,"defaultProps",eo.defaultWidgetOptions);Ln.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_handleSettingsChange",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"_handleProgramIDChange",docblock:null,modifiers:[],params:[{name:"programID",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"CSProgramEditor",props:{programID:{defaultValue:{value:'""',computed:!1},required:!1},programType:{defaultValue:{value:"null",computed:!1},required:!1},settings:{defaultValue:{value:'[{name: "", value: ""}]',computed:!1},required:!1},showEditor:{defaultValue:{value:"false",computed:!1},required:!1},showButtons:{defaultValue:{value:"false",computed:!1},required:!1},height:{defaultValue:{value:"400",computed:!1},required:!1}},composes:["@khanacademy/perseus"]};const{TextInput:Ns}=G;class Rn extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("div",{className:"perseus-widget-definition-editor",children:[e.jsx("a",{href:"https://docs.google.com/document/d/1udaPef4imOfTMhmLDlWq4SM0mxL0r3YHFZE-5J1uGfo",target:"_blank",rel:"noreferrer",children:"Definition style guide"}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Word to be defined:"," ",e.jsx(Ns,{value:this.props.togglePrompt,onChange:this.change("togglePrompt"),placeholder:"define me"})]})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(Ae,{apiOptions:this.props.apiOptions,content:this.props.definition,widgetEnabled:!1,placeholder:"definition goes here",onChange:n=>{const a={};y.has(n,"content")&&(a.definition=n.content),this.change(a)}})})]})}}l(Rn,"propTypes",{...de,togglePrompt:I.string,definition:I.string,apiOptions:I.any}),l(Rn,"widgetName","definition"),l(Rn,"defaultProps",to.defaultWidgetOptions);Rn.__docgenInfo={description:`An editor for adding an interactive definition widget that allows content
editors to embed clickable terms with expandable explanations within content.`,methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"DefinitionEditor",props:{togglePrompt:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},definition:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},apiOptions:{description:"",type:{name:"any"},required:!1}},composes:["@khanacademy/perseus"]};class qt extends h.Component{serialize(){return Q.serialize.call(this)}render(){return e.jsxs("div",{children:[e.jsx("p",{children:"This widget has been deprecated and removed"}),e.jsx("p",{children:"Learners will see a message and they will not be graded on this part. Please replace this widget with a supported one."})]})}}l(qt,"widgetName","deprecated-standin");qt.__docgenInfo={description:"",methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"any"}}}],displayName:"DeprecatedStandinEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(options: any) => void",signature:{arguments:[{type:{name:"any"},name:"options"}],return:{name:"void"}}},description:""}}};const{InfoTip:sa,InlineIcon:Vt}=G;class Fn extends h.Component{constructor(){super(...arguments);l(this,"onVisibleLabelChange",n=>{this.props.onChange({visibleLabel:n})});l(this,"onAriaLabelChange",n=>{this.props.onChange({ariaLabel:n})});l(this,"onPlaceholderChange",n=>{this.props.onChange({placeholder:n})});l(this,"onCorrectChange",n=>{const a=y.map(this.props.choices,function(t,o){return y.extend({},t,{correct:o===n})});this.props.onChange({choices:a})});l(this,"onContentChange",(n,a)=>{const t=this.props.choices.slice(),o=y.clone(t[n]);o.content=a.target.value,t[n]=o,this.props.onChange({choices:t})});l(this,"addChoice",n=>{n.preventDefault();const a=this.props.choices,t={content:"",correct:!1};this.props.onChange({choices:a.concat([t])},this.focus.bind(this,a.length))});l(this,"removeChoice",(n,a)=>{a.preventDefault();const t=y(this.props.choices).clone();t.splice(n,1),this.props.onChange({choices:t})});l(this,"focus",n=>(Sr.findDOMNode(this.refs["editor"+n]).focus(),!0));l(this,"serialize",()=>Q.serialize.call(this))}render(){const n=y.uniqueId("perseus_dropdown_");return e.jsxs("div",{className:"perseus-widget-dropdown",children:[e.jsxs("div",{className:"dropdown-info",children:[e.jsx(W,{children:"Dropdown"}),e.jsx(sa,{children:e.jsxs("p",{children:["The drop down is useful for making inequalities in a custom format. We normally use the symbols ","<",","," ",">",', ≤, ≥ (in that order) which you can copy into the choices. When possible, use the "multiple choice" answer type instead.']})})]}),e.jsxs("div",{className:"dropdown-field",children:[e.jsxs(U,{children:["Visible label",e.jsx(Fe,{value:this.props.visibleLabel,onChange:this.onVisibleLabelChange})]}),e.jsx(sa,{children:e.jsx("p",{children:"Optional visible label"})})]}),e.jsxs("div",{className:"dropdown-field",children:[e.jsxs(U,{children:["Aria label",e.jsx(Fe,{value:this.props.ariaLabel,onChange:this.onAriaLabelChange,type:"text"})]}),e.jsx(sa,{children:e.jsxs("p",{children:["Label text that's read by screen readers. Highly recommend adding a label here to ensure your exercise is accessible. For more information on writing accessible labels, please see"," ",e.jsx("a",{href:"https://www.w3.org/WAI/tips/designing/#ensure-that-form-elements-include-clearly-associated-labels",target:"_blank",rel:"noreferrer",children:"this article."})," ",'If left blank, the value will default to "Select an answer".']})})]}),e.jsxs("div",{className:"dropdown-field",children:[e.jsxs(U,{children:["Placeholder",e.jsx(Fe,{value:this.props.placeholder,onChange:this.onPlaceholderChange,placeholder:"Placeholder value"})]}),e.jsx(sa,{children:e.jsx("p",{children:"This value will appear as the drop down default. It should give the user some indication of the values available in the drop down itself, e.g., Yes/No/Maybe."})})]}),e.jsx("div",{className:"clearfix"}),e.jsx(U,{children:"Choices"}),e.jsx("ul",{className:"dropdown-choices",children:this.props.choices.map(function(a,t){const o=a.correct?"correct":"incorrect";return e.jsx("li",{children:e.jsxs("div",{children:[e.jsx("input",{ref:"radio"+t,type:"radio",name:n,checked:a.correct?"checked":"",onChange:this.onCorrectChange.bind(this,t),value:t}),e.jsx("input",{type:"text",ref:"editor"+t,onChange:this.onContentChange.bind(this,t),className:o,value:a.content}),e.jsx("a",{href:"#",className:"simple-button orange","aria-label":"Delete choice",onClick:this.removeChoice.bind(this,t),children:e.jsx("span",{className:"remove-choice",children:e.jsx(Vt,{...bt})})})]})},""+t)},this)}),e.jsx("div",{className:"add-choice-container",children:e.jsxs("a",{href:"#",className:"simple-button orange",onClick:this.addChoice,children:[e.jsx(Vt,{...Ur})," Add a choice"," "]})})]})}}l(Fn,"propTypes",{choices:I.arrayOf(I.shape({content:I.string,correct:I.bool})),placeholder:I.string}),l(Fn,"widgetName","dropdown"),l(Fn,"defaultProps",ro.defaultWidgetOptions);Fn.__docgenInfo={description:"An editor for adding a dropdown widget that allows users to select an option from a predefined list.",methods:[{name:"onVisibleLabelChange",docblock:null,modifiers:[],params:[{name:"visibleLabel",optional:!1,type:null}],returns:null},{name:"onAriaLabelChange",docblock:null,modifiers:[],params:[{name:"ariaLabel",optional:!1,type:null}],returns:null},{name:"onPlaceholderChange",docblock:null,modifiers:[],params:[{name:"placeholder",optional:!1,type:null}],returns:null},{name:"onCorrectChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onContentChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"addChoice",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"removeChoice",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"DropdownEditor",props:{placeholder:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},choices:{defaultValue:{value:`[
    {
        content: "",
        correct: false,
    },
]`,computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{content:{name:"string",required:!1},correct:{name:"bool",required:!1}}}},required:!1}}};const{TextInput:Wt}=G;class On extends h.Component{constructor(){super(...arguments);l(this,"state",{});l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("div",{className:"perseus-widget-explanation-editor",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Prompt to show explanation:"," ",e.jsx(Wt,{value:this.props.showPrompt,onChange:this.change("showPrompt")})]})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Prompt to hide explanation:"," ",e.jsx(Wt,{value:this.props.hidePrompt,onChange:this.change("hidePrompt")})]})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(Ae,{apiOptions:this.props.apiOptions,content:this.props.explanation,widgets:this.props.widgets,widgetEnabled:!0,immutableWidgets:!1,onChange:n=>{const a={};y.has(n,"content")&&(a.explanation=n.content),y.has(n,"widgets")&&(a.widgets=n.widgets),this.change(a)}})})]})}}l(On,"propTypes",{...de,showPrompt:I.string,hidePrompt:I.string,explanation:I.string,widgets:I.object,apiOptions:I.any}),l(On,"widgetName","explanation"),l(On,"defaultProps",io.defaultWidgetOptions);On.__docgenInfo={description:"An editor for adding an explanation widget that provides supplementary information to users.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ExplanationEditor",props:{showPrompt:{defaultValue:{value:'"Explain"',computed:!1},description:"",type:{name:"string"},required:!1},hidePrompt:{defaultValue:{value:'"Hide explanation"',computed:!1},description:"",type:{name:"string"},required:!1},explanation:{defaultValue:{value:'"explanation goes here\\n\\nmore explanation"',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},apiOptions:{description:"",type:{name:"any"},required:!1}},composes:["@khanacademy/perseus"]};const{ButtonGroup:Is,InfoTip:hn}=G,Gt=["basic","trig","prealgebra","logarithms","scientific","basic relations","advanced relations"];class va extends h.Component{constructor(n){super(n);l(this,"getSaveWarnings",()=>{const n=[];return this.props.answerForms.length===0?n.push("No answers specified"):(this.props.answerForms.some(t=>t.considered==="correct")||n.push("No correct answer specified"),y(this.props.answerForms).each((t,o)=>{if(this.props.value==="")n.push(`Answer ${o+1} is empty`);else{const s=so(t.value,{functions:this.props.functions});s.parsed?t.simplify&&!s.expr.isSimplified()&&n.push(`${t.value} isn't simplified, but is required" +
                            " to be`):n.push(`Couldn't parse ${t.value}`)}})),n});l(this,"newAnswer",()=>{const n=this.props.answerForms.slice(),t={considered:"correct",form:!1,key:`${crypto.randomUUID()}`,simplify:!1,value:""};n.push(t),this.props.onChange({answerForms:n})});l(this,"handleRemoveForm",n=>{const a=this.props.answerForms.slice();a.splice(n,1),this.props.onChange({answerForms:a})});l(this,"handleButtonSet",n=>{const t=Gt.filter(o=>this.props.buttonSets.includes(o)!==(o===n));this.props.onChange({buttonSets:t})});l(this,"handleToggleDiv",()=>{let n,a;this.props.buttonSets.includes("basic+div")?(n="basic",a="basic+div"):(n="basic+div",a="basic");const t=this.props.buttonSets.filter(o=>o!==a).concat(n);this.props.onChange({buttonSets:t})});l(this,"handleTexInsert",n=>{this.refs.expression.insert(n)});l(this,"handleFunctions",n=>{this.setState({functionsInternal:n});const a={};a.functions=n.split(/[ ,]+/).filter(lo),this.props.onChange(a)});l(this,"handleVisibleLabel",n=>{this.props.onChange({visibleLabel:n})});l(this,"handleAriaLabel",n=>{this.props.onChange({ariaLabel:n})});l(this,"changeExpressionWidget",(n,a)=>{const t={...this.props.answerForms[n],value:a};this.updateAnswerForm(n,t)});this.state={functionsInternal:this.props.functions.join(" ")}}serialize(){const{answerForms:n,buttonSets:a,functions:t,times:o,visibleLabel:s,ariaLabel:u}=this.props;return{answerForms:n,buttonSets:a,functions:t,times:o,visibleLabel:s,ariaLabel:u,extraKeys:Et(this.props)}}updateAnswerForm(n,a){const t=this.props.answerForms.slice();t[n]=a;const{extraKeys:o,...s}=this.props,u=Et({...s,answerForms:t});this.props.onChange({answerForms:t,extraKeys:u})}changeSimplify(n,a){const t={...this.props.answerForms[n],simplify:a};this.updateAnswerForm(n,t)}changeForm(n,a){const t={...this.props.answerForms[n],form:a};this.updateAnswerForm(n,t)}changeConsidered(n,a){const t={...this.props.answerForms[n],considered:a};this.updateAnswerForm(n,t)}changeTimes(n){this.props.onChange({times:n})}render(){const n=this.props.answerForms.map((t,o)=>{const s={times:this.props.times,functions:this.props.functions,buttonSets:this.props.buttonSets,buttonsVisible:"focused",userInput:t.value,handleUserInput:u=>this.changeExpressionWidget(o,u),trackInteraction:()=>{},widgetId:this.props.widgetId+"-"+t.key,visibleLabel:this.props.visibleLabel,ariaLabel:this.props.ariaLabel};return e.jsx(Rs,{considered:t.considered,expressionProps:s,form:t.form,simplify:t.simplify,onDelete:()=>this.handleRemoveForm(o),onChangeSimplify:u=>this.changeSimplify(o,u),onChangeForm:u=>this.changeForm(o,u),onChangeConsidered:u=>this.changeConsidered(o,u)},t.key)}),a=Gt.map(t=>{const o=t==="basic",s=this.props.buttonSets.includes(t)||o;return e.jsx(ae,{label:t,checked:s,disabled:o,onChange:()=>this.handleButtonSet(t)},t)});return a.unshift(e.jsx(ae,{label:"show ÷ button",checked:this.props.buttonSets.includes("basic+div"),onChange:this.handleToggleDiv},"show ÷ button")),e.jsxs(x,{children:[e.jsx(lt,{children:"Global Options"}),e.jsx("div",{className:R.css(pe.paddedY),children:e.jsx(Ka,{label:e.jsxs(e.Fragment,{children:["Visible label",e.jsx(hn,{children:"Optional visible text; strongly encouraged to help learners using dictation software, but can be omitted if the surrounding content provides enough context."})]}),value:this.props.visibleLabel||"",onChange:this.handleVisibleLabel})}),e.jsx("div",{className:R.css(pe.paddedY),children:e.jsx(Ka,{label:e.jsxs(e.Fragment,{children:["Aria label",e.jsxs(hn,{children:["Label text that's read by screen readers. Highly recommend adding a label here to ensure your exercise is accessible. For more information on writting accessible labels, please see"," ",e.jsx("a",{href:"https://www.w3.org/WAI/tips/designing/#ensure-that-form-elements-include-clearly-associated-labels",target:"_blank",rel:"noreferrer",children:"this article."})]})]}),value:this.props.ariaLabel||"",onChange:this.handleAriaLabel})}),e.jsx("div",{className:R.css(pe.paddedY),children:e.jsx(Ka,{label:e.jsxs(e.Fragment,{children:["Function variables",e.jsx(hn,{children:'Single-letter variables listed here will be interpreted as functions. This let us know that f(x) means "f of x" and not "f times x".'})]}),value:this.state.functionsInternal,onChange:this.handleFunctions})}),e.jsx("div",{className:R.css(pe.paddedY),children:e.jsx(ae,{label:e.jsxs(e.Fragment,{children:["Use × instead of ⋅ for multiplication",e.jsx(hn,{children:"For pre-algebra problems this option displays multiplication as \\times instead of \\cdot in both the rendered output and the acceptable formats examples."})]}),checked:this.props.times,onChange:t=>{this.changeTimes(t)}})}),e.jsxs("div",{className:R.css(pe.paddedY),children:[e.jsx(tn,{children:"Button Sets"}),a]}),e.jsx(lt,{children:"Answers"}),e.jsx(uo,{style:pe.answersSubtitle,children:"student responses area matched against these from top to bottom"}),e.jsx(x,{style:{gap:m.xSmall_8},children:n}),e.jsx(L,{size:m.small_12}),e.jsx(ne,{size:"small",onClick:this.newAnswer,children:"Add new answer"})]})}}l(va,"widgetName","expression"),l(va,"defaultProps",oo.defaultWidgetOptions);const Ls=function(i,r){let n=i.indexOf(r);return n=(n+1)%i.length,i[n]};class Rs extends h.Component{constructor(){super(...arguments);l(this,"state",{deleteFocused:!1});l(this,"handleImSure",()=>{this.props.onDelete(),this.handleCancelDelete()});l(this,"handleCancelDelete",()=>{this.setState({deleteFocused:!1})});l(this,"handleDelete",()=>{this.setState({deleteFocused:!0})});l(this,"toggleConsidered",()=>{const n=Ls(_t,this.props.considered);this.props.onChangeConsidered(n)})}render(){const n=this.state.deleteFocused?e.jsxs(e.Fragment,{children:[e.jsx(ne,{size:"small",onClick:this.handleImSure,actionType:"destructive",children:"I'm sure!"}),e.jsx(L,{size:m.small_12}),e.jsx(ne,{size:"small",onClick:this.handleCancelDelete,kind:"secondary",children:"Cancel"})]}):e.jsx(ne,{size:"small",onClick:this.handleDelete,actionType:"destructive",kind:"tertiary",style:pe.deleteButton,children:"Delete"});return e.jsxs("div",{className:R.css(pe.answerOption),children:[e.jsx(Is,{onChange:this.toggleConsidered,allowEmpty:!1,value:this.props.considered,selectedButtonStyle:Fs[this.props.considered],buttons:_t.map(a=>({value:a,content:a,title:`This answer will be considered ${a}`}))}),e.jsx(mo,{...this.props.expressionProps}),e.jsx("div",{className:R.css(pe.paddedY,pe.paddedX),children:e.jsx(ae,{label:e.jsxs(e.Fragment,{children:["Answer expression must have the same form.",e.jsx(hn,{children:"The student's answer must be in the same form. Commutativity and excess negative signs are ignored."})]}),checked:this.props.form,onChange:this.props.onChangeForm})}),e.jsx("div",{className:R.css(pe.paddedY,pe.paddedX),children:e.jsx(ae,{label:e.jsxs(e.Fragment,{children:["Answer expression must be fully expanded and simplified.",e.jsx(hn,{children:`The student's answer must be fully expanded and simplified. Answering this equation (x^2+2x+1) with this factored equation (x+1)^2 will render this response "Your answer is not fully expanded and simplified."`})]}),checked:this.props.simplify,onChange:this.props.onChangeSimplify})}),e.jsx("div",{className:R.css(pe.buttonRow,pe.paddedY),children:n})]})}}const pe=R.StyleSheet.create({paddedX:{paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8},paddedY:{paddingTop:m.xxSmall_6,paddingBottom:m.xxSmall_6},answersSubtitle:{fontStyle:"italic"},answerOption:{border:"1px solid #ddd",borderRadius:"3px",display:"flex",flexDirection:"column"},answerStatusWrong:{backgroundColor:O.fadedRed16},answerStatusCorrect:{backgroundColor:O.fadedGreen16},answerStatusUngraded:{backgroundColor:O.fadedBlue16},buttonRow:{display:"flex"},deleteButton:{paddingInline:T.size_160}}),Fs={wrong:pe.answerStatusWrong,correct:pe.answerStatusCorrect,ungraded:pe.answerStatusUngraded};va.__docgenInfo={description:"An editor for adding an expression widget that allows users to enter mathematical expressions.",methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
>`,required:!0}},{key:"functions",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"extraKeys",value:{name:"Array",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"KeypadKey[]",required:!1}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"newAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"handleRemoveForm",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null}],returns:null},{name:"updateAnswerForm",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"answerFormProps",optional:!1,type:{name:"Array[number]",raw:'PerseusExpressionWidgetOptions["answerForms"][number]',alias:"AnswerForm"}}],returns:null},{name:"handleButtonSet",docblock:null,modifiers:[],params:[{name:"changingName",optional:!1,type:null}],returns:null},{name:"handleToggleDiv",docblock:null,modifiers:[],params:[],returns:null},{name:"handleTexInsert",docblock:null,modifiers:[],params:[{name:"str",optional:!1,type:null}],returns:null},{name:"handleFunctions",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handleVisibleLabel",docblock:null,modifiers:[],params:[{name:"visibleLabel",optional:!1,type:null}],returns:null},{name:"handleAriaLabel",docblock:null,modifiers:[],params:[{name:"ariaLabel",optional:!1,type:null}],returns:null},{name:"changeSimplify",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"simplify",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeForm",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"form",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeConsidered",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"considered",optional:!1,type:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]"}}],returns:null},{name:"changeTimes",docblock:null,modifiers:[],params:[{name:"times",optional:!1,type:{name:"boolean"}}],returns:null},{name:"changeExpressionWidget",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:null},{name:"input",optional:!1,type:null}],returns:null}],displayName:"ExpressionEditor",props:{widgetId:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValues: Partial<PerseusExpressionWidgetOptions>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
>`,required:!0}},{key:"functions",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"extraKeys",value:{name:"Array",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"KeypadKey[]",required:!1}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}}],raw:"Partial<PerseusExpressionWidgetOptions>"},name:"newValues"}],return:{name:"void"}}},description:""},answerForms:{defaultValue:{value:"[]",computed:!1},required:!1},times:{defaultValue:{value:"false",computed:!1},required:!1},buttonSets:{defaultValue:{value:'["basic"]',computed:!1},required:!1},functions:{defaultValue:{value:'["f", "g", "h"]',computed:!1},required:!1}}};const{InlineIcon:Bt,TextInput:Os}=G;class en extends h.Component{constructor(){super(...arguments);l(this,"editor",h.createRef());l(this,"hintEditor",h.createRef());l(this,"change",(...n)=>K.apply(this,n));l(this,"handleAddHint",()=>{const n={content:"",images:{},widgets:{}};this.props.onChange({hint:n},()=>{var a;(a=this.hintEditor.current)==null||a.focus()})});l(this,"handleRemoveHint",n=>{this.props.onChange({hint:null})});l(this,"getSaveWarnings",()=>{var n;return(n=this.editor.current)==null?void 0:n.getSaveWarnings()});l(this,"serialize",()=>{var n,a;return{title:this.props.title,...(n=this.editor.current)==null?void 0:n.serialize(),hint:(a=this.hintEditor.current)==null?void 0:a.serialize()}})}render(){return e.jsxs("div",{className:"perseus-group-editor",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{className:R.css(Xa.title),children:["Title:"," ",e.jsx(Os,{value:this.props.title,className:R.css(Xa.input),onChange:this.change("title")})]})}),e.jsx(Ae,{ref:this.editor,content:this.props.content,widgets:this.props.widgets,apiOptions:this.props.apiOptions,images:this.props.images,widgetEnabled:!0,immutableWidgets:!1,onChange:this.props.onChange,warnNoPrompt:!0,warnNoWidgets:!0}),!this.props.hint&&e.jsxs("button",{type:"button",style:{marginTop:10},className:"add-hint simple-button orange",onClick:this.handleAddHint,children:[e.jsx(Bt,{...Ur})," Add a hint"]}),this.props.hint&&e.jsxs("div",{className:"perseus-hint-editor",children:[e.jsx("div",{className:R.css(Xa.hintsTitle),children:"Hint"}),e.jsx(Ae,{ref:this.hintEditor,content:this.props.hint?this.props.hint.content:"",widgets:this.props.hint?this.props.hint.widgets:{},apiOptions:this.props.apiOptions,images:this.props.hint&&this.props.hint.images,widgetEnabled:!0,immutableWidgets:!1,onChange:n=>{this.change("hint",Object.assign({},this.props.hint,n))}}),e.jsxs("button",{type:"button",className:"remove-hint simple-button orange",onClick:this.handleRemoveHint,children:[e.jsx(Bt,{...bt})," Remove this hint"]})]})]})}}l(en,"propTypes",{...de,title:I.string,content:I.string,widgets:I.object,images:I.object,apiOptions:Ea.propTypes}),l(en,"widgetName","graded-group"),l(en,"defaultProps",po.defaultWidgetOptions);const Xa=R.StyleSheet.create({title:{fontSize:18,fontWeight:"bold"},input:{fontSize:18},hintsTitle:{marginTop:10,fontSize:"110%",fontWeight:"bold"}});en.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleAddHint",docblock:null,modifiers:[],params:[],returns:null},{name:"handleRemoveHint",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GradedGroupEditor",props:{title:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},images:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},hint:{defaultValue:{value:"null",computed:!1},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0}},composes:["@khanacademy/perseus"]};class En extends h.Component{constructor(){super(...arguments);l(this,"_editors");l(this,"change",(...n)=>K.apply(this,n));l(this,"getSaveWarnings",()=>[].concat(...this._editors.map(n=>n?n.getSaveWarnings():[])));l(this,"serialize",()=>({gradedGroups:this.props.gradedGroups}));l(this,"renderGroups",()=>this.props.gradedGroups?this.props.gradedGroups.map((n,a)=>e.jsx(en,{ref:t=>this._editors[a]=t,...n,apiOptions:this.props.apiOptions,widgetEnabled:!0,immutableWidgets:!1,onChange:t=>this.change("gradedGroups",Es(this.props.gradedGroups,a,{...this.props.gradedGroups[a],...t}))},a)):null);l(this,"addGroup",()=>{const n=this.props.gradedGroups||[];this.change("gradedGroups",n.concat([en.defaultProps]))})}UNSAFE_componentWillMount(){this._editors=[]}render(){return e.jsxs("div",{className:"perseus-group-editor",children:[this.renderGroups(),e.jsx("button",{onClick:this.addGroup,children:"Add group"})]})}}l(En,"propTypes",{...de,apiOptions:Ea.propTypes,gradedGroups:I.array,onChange:I.func.isRequired}),l(En,"widgetName","graded-group-set"),l(En,"defaultProps",co.defaultWidgetOptions);const Es=(i,r,n)=>[...i.slice(0,r),n,...i.slice(r+1)];En.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null},{name:"renderGroups",docblock:null,modifiers:[],params:[],returns:null},{name:"addGroup",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GradedGroupSetEditor",props:{gradedGroups:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"array"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0},onChange:{description:"",type:{name:"func"},required:!0}},composes:["@khanacademy/perseus"]};const{ButtonGroup:_s,InfoTip:zs,RangeInput:mn}=G,Ds={url:null,width:0,height:0};function Ms(i,r){return Math.floor((i[1]-i[0])/r)}class Zn extends h.Component{constructor(n){super(n);l(this,"_isMounted",!1);this.state=this.getInitialState(),this.change=this.change.bind(this),this.changeBackgroundUrl=this.changeBackgroundUrl.bind(this),this.changeGraph=this.changeGraph.bind(this),this.changeGridStep=this.changeGridStep.bind(this),this.changeLabel=this.changeLabel.bind(this),this.changeRange=this.changeRange.bind(this),this.changeRulerLabel=this.changeRulerLabel.bind(this),this.changeRulerTicks=this.changeRulerTicks.bind(this),this.changeSnapStep=this.changeSnapStep.bind(this),this.changeStep=this.changeStep.bind(this)}getInitialState(){return this.stateFromProps(this.props)}componentDidMount(){this._isMounted=!0,this.changeGraph=y.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(n){(!y.isEqual(this.props.labels,n.labels)||!y.isEqual(this.props.gridStep,n.gridStep)||!y.isEqual(this.props.snapStep,n.snapStep)||!y.isEqual(this.props.step,n.step)||!y.isEqual(this.props.range,n.range)||!y.isEqual(this.props.backgroundImage,n.backgroundImage))&&this.setState(this.stateFromProps(n))}componentWillUnmount(){this._isMounted=!1}stateFromProps(n){return{labelsTextbox:n.labels,gridStepTextbox:n.gridStep,snapStepTextbox:n.snapStep,stepTextbox:n.step,rangeTextbox:n.range,backgroundImage:y.clone(n.backgroundImage)}}change(...n){return K.apply(this,n)}changeRulerLabel(n){this.change({rulerLabel:n.target.value})}changeRulerTicks(n){this.change({rulerTicks:+n.target.value})}changeBackgroundUrl(n){if(n.type==="keypress"&&n.key!=="Enter")return;const a=(o,s,u)=>{const d=y.clone(this.props.backgroundImage);d.url=o,d.width=s,d.height=u,this.setState({backgroundImage:d},this.changeGraph)},t=Sr.findDOMNode(this.refs["bg-url"]).value;t?ue.getImageSize(t,(o,s)=>{this._isMounted&&a(t,o,s)}):a(null,0,0)}renderLabelChoices(n){return y.map(n,function([a,t]){return e.jsx("option",{value:t,children:a},t)})}validRange(n){return y.every(n,function(t){return y.isFinite(t)})?n[0]>=n[1]?"Range must have a higher number on the right":!0:"Range must be a valid number"}validateStepValue(n){const{step:a,range:t,name:o,minTicks:s,maxTicks:u}=n;if(!y.isFinite(a))return o+" must be a valid number";const d=Ms(t,a);return d<s?o+" is too large, there must be at least "+s+" ticks.":d>u?o+" is too small, there can be at most "+u+" ticks.":!0}validSnapStep(n,a){return this.validateStepValue({step:n,range:a,name:"Snap step",minTicks:5,maxTicks:60})}validGridStep(n,a){return this.validateStepValue({step:n,range:a,name:"Grid step",minTicks:3,maxTicks:60})}validStep(n,a){return this.validateStepValue({step:n,range:a,name:"Step",minTicks:3,maxTicks:20})}validBackgroundImageSize(n){return n.url?n.width<=450&&n.height<=450?!0:"Image must be smaller than 450px x 450px.":!0}validateGraphSettings(n,a,t,o,s){const u=this;let d;if(!y.every(n,function(f){return d=u.validRange(f),d===!0})||!y.every(a,function(f,w){return d=u.validStep(f,n[w]),d===!0})||!y.every(t,function(f,w){return d=u.validGridStep(f,n[w]),d===!0})||!y.every(o,function(f,w){return d=u.validSnapStep(f,n[w]),d===!0}))return d;const A=this.validBackgroundImageSize(s);return A!==!0?(d=A,d):!0}changeLabel(n,a){const t=a.target.value,o=this.state.labelsTextbox.slice();o[n]=t,this.setState({labelsTextbox:o},this.changeGraph)}changeRange(n,a){const t=this.state.rangeTextbox.slice();t[n]=a;const o=this.state.stepTextbox.slice(),s=this.state.gridStepTextbox.slice(),u=this.state.snapStepTextbox.slice(),d=ue.scaleFromExtent(t[n],this.props.box[n]);this.validRange(t[n])===!0&&(o[n]=ue.tickStepFromExtent(t[n],this.props.box[n]),s[n]=ue.gridStepFromTickStep(o[n],d),u[n]=s[n]/2),this.setState({stepTextbox:o,gridStepTextbox:s,snapStepTextbox:u,rangeTextbox:t},this.changeGraph)}changeStep(n){this.setState({stepTextbox:n},this.changeGraph)}changeSnapStep(n){this.setState({snapStepTextbox:n},this.changeGraph)}changeGridStep(n){this.setState({gridStepTextbox:n,snapStepTextbox:y.map(n,function(a){return a/2})},this.changeGraph)}changeGraph(){const n=this.state.labelsTextbox,a=y.map(this.state.rangeTextbox,function(c){return y.map(c,Number)}),t=y.map(this.state.stepTextbox,Number),o=this.state.gridStepTextbox,s=this.state.snapStepTextbox,u=this.state.backgroundImage,d=this.validateGraphSettings(a,t,o,s,u);d===!0?this.change({valid:!0,labels:n,range:a,step:t,gridStep:o,snapStep:s,backgroundImage:u}):this.change({valid:d})}render(){const n=[fa.roundTo(2,ue.scaleFromExtent(this.props.range[0],this.props.box[0])),fa.roundTo(2,ue.scaleFromExtent(this.props.range[1],this.props.box[1]))],{TeX:a}=yt();return e.jsxs("div",{children:[y.contains(this.props.editableSettings,"canvas")&&e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{htmlFor:"canvas-size",children:"Canvas size (x,y pixels)"}),e.jsx(mn,{id:"canvas-size",value:this.props.box,onChange:t=>{this.change({box:t})}})]}),e.jsxs("div",{className:"perseus-widget-row",children:["Scale (px per div):"," ",e.jsx(a,{children:"("+n[0]+", "+n[1]+")"})]})]}),y.contains(this.props.editableSettings,"graph")&&e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("div",{className:"perseus-widget-left-col",children:[e.jsx("label",{htmlFor:"labels-x",children:"x Label"}),e.jsx("input",{id:"labels-x",type:"text",className:"graph-settings-axis-label",ref:"labels-0",onChange:t=>this.changeLabel(0,t),value:this.state.labelsTextbox[0]||""})]}),e.jsxs("div",{className:"perseus-widget-right-col",children:[e.jsx("label",{htmlFor:"labels-y",children:"y Label"}),e.jsx("input",{id:"labels-y",type:"text",className:"graph-settings-axis-label",ref:"labels-1",onChange:t=>this.changeLabel(1,t),value:this.state.labelsTextbox[1]||""})]})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("div",{className:"perseus-widget-left-col",children:[e.jsx("label",{htmlFor:"range-x",children:"x Range"}),e.jsx(mn,{id:"range-x",value:this.state.rangeTextbox[0],onChange:t=>this.changeRange(0,t)})]}),e.jsxs("div",{className:"perseus-widget-right-col",children:[e.jsx("label",{htmlFor:"range-y",children:"y Range"}),e.jsx(mn,{id:"range-y",value:this.state.rangeTextbox[1],onChange:t=>this.changeRange(1,t)})]})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("div",{className:"perseus-widget-left-col",children:[e.jsx("label",{htmlFor:"tick-step",children:"Tick Step"}),e.jsx(mn,{id:"tick-step",value:this.state.stepTextbox,onChange:this.changeStep})]}),e.jsxs("div",{className:"perseus-widget-right-col",children:[e.jsx("label",{htmlFor:"grid-step",children:"Grid Step"}),e.jsx(mn,{id:"grid-step",value:this.state.gridStepTextbox,onChange:this.changeGridStep})]})]}),y.contains(this.props.editableSettings,"snap")&&e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("div",{className:"perseus-widget-left-col",children:[e.jsx("label",{htmlFor:"snap-step",children:"Snap Step"}),e.jsx(mn,{id:"snap-step",value:this.state.snapStepTextbox,onChange:this.changeSnapStep})]})}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Markings: "}),e.jsx(_s,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})]}),e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ae,{label:"Show tooltips",checked:this.props.showTooltips,onChange:t=>{this.change({showTooltips:t})}})})]}),y.contains(this.props.editableSettings,"image")&&e.jsxs("div",{className:"image-settings",children:[e.jsx("div",{children:"Background image:"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bg-url",children:"Url:"}),e.jsx("input",{id:"bg-url",type:"text",className:"graph-settings-background-url",ref:"bg-url",value:this.state.backgroundImage.url||"",onChange:t=>{const o=y.clone(this.props.backgroundImage);o.url=t.target.value,this.setState({backgroundImage:o})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),e.jsx(zs,{children:e.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]})]}),y.contains(this.props.editableSettings,"measure")&&e.jsxs("div",{className:"misc-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ae,{label:"Show ruler",checked:this.props.showRuler,onChange:t=>{this.change({showRuler:t})}})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ae,{label:"Show protractor",checked:this.props.showProtractor,onChange:t=>{this.change({showProtractor:t})}})})]}),this.props.showRuler&&e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler label:"," ",e.jsxs("select",{onChange:this.changeRulerLabel,value:this.props.rulerLabel,children:[e.jsx("option",{value:"",children:"None"}),e.jsx("optgroup",{label:"Metric",children:this.renderLabelChoices([["milimeters","mm"],["centimeters","cm"],["meters","m"],["kilometers","km"]])}),e.jsx("optgroup",{label:"Imperial",children:this.renderLabelChoices([["inches","in"],["feet","ft"],["yards","yd"],["miles","mi"]])})]})]})}),e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler ticks:"," ",e.jsx("select",{onChange:this.changeRulerTicks,value:this.props.rulerTicks,children:y.map([1,2,4,8,10,16],function(t){return e.jsx("option",{value:t,children:t},t)})})]})})]})]})]})}}l(Zn,"displayName"),l(Zn,"defaultProps",{editableSettings:["graph","snap","image","measure"],box:[Jn.defaultBoxSizeSmall,Jn.defaultBoxSizeSmall],labels:["x","y"],range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:Ds,markings:"graph",rulerLabel:"",rulerTicks:10,showProtractor:!1,showRuler:!1,showTooltips:!1});Zn.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:[],params:[{name:"props",optional:!1,type:null}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeRulerLabel",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeRulerTicks",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],props:{editableSettings:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:'"canvas" | "graph" | "snap" | "image" | "measure"',elements:[{name:"literal",value:'"canvas"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"snap"'},{name:"literal",value:'"image"'},{name:"literal",value:'"measure"'}]}],raw:`ReadonlyArray<
    "canvas" | "graph" | "snap" | "image" | "measure"
>`},description:"",defaultValue:{value:'["graph", "snap", "image", "measure"]',computed:!1}},box:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:`[
    interactiveSizes.defaultBoxSizeSmall,
    interactiveSizes.defaultBoxSizeSmall,
]`,computed:!1}},labels:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:'["x", "y"]',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},description:"",defaultValue:{value:`[
    [-10, 10],
    [-10, 10],
]`,computed:!1}},step:{required:!1,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:"",defaultValue:{value:"[1, 1]",computed:!1}},gridStep:{required:!1,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:"",defaultValue:{value:"[1, 1]",computed:!1}},snapStep:{required:!1,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:"",defaultValue:{value:"[1, 1]",computed:!1}},valid:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:`{
    url: null,
    width: 0,
    height: 0,
}`,computed:!1}},markings:{required:!1,tsType:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:"",defaultValue:{value:'"graph"',computed:!1}},showProtractor:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showRuler:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showTooltips:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},rulerLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},rulerTicks:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}}}};const{InfoTip:$s,MultiButtonGroup:Vs}=G,Ws=ho.widget,{chooseType:Gs,defaultPlotProps:Bs,getEquationString:Hs,typeToButton:Us}=ks;class _n extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"handleAvailableTypesChange",n=>{let a=this.props.correct;if(!y.contains(n,this.props.correct.type)){const t=this.props.graph,o=Gs(n);a=Bs(o,t)}this.props.onChange({availableTypes:n,correct:a})});l(this,"serialize",()=>y.chain(this.props).pick("correct","availableTypes").extend({graph:y.omit(this.props.graph,"box")}).value())}render(){const n=jr.SMALL;let a,t;if(this.props.graph.valid===!0){const o={apiOptions:this.props.apiOptions,containerSizeClass:n,graph:this.props.graph,userInput:this.props.correct,handleUserInput:(s,u)=>{let d=this.props.correct;d.type===(s==null?void 0:s.type)?d=y.extend({},d,s):d=s,this.props.onChange({correct:d},u)},availableTypes:this.props.availableTypes,trackInteraction:function(){}};t=e.jsx(Ws,{...o}),a=Hs(o.userInput)}else t=e.jsx("div",{className:"perseus-error",children:this.props.graph.valid});return e.jsxs("div",{children:[e.jsxs("div",{children:["Correct answer"," ",e.jsx($s,{children:e.jsx("p",{children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."})})," ",": ",a]}),e.jsx(Zn,{editableSettings:["graph","snap","image"],box:Ar(n),range:this.props.graph.range,labels:this.props.graph.labels,step:this.props.graph.step,gridStep:this.props.graph.gridStep,snapStep:this.props.graph.snapStep,valid:this.props.graph.valid,backgroundImage:this.props.graph.backgroundImage,markings:this.props.graph.markings,rulerLabel:this.props.graph.rulerLabel,rulerTicks:this.props.graph.rulerTicks,showTooltips:this.props.graph.showTooltips,onChange:this.change("graph")}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Available functions: "}),e.jsx(Vs,{allowEmpty:!1,values:this.props.availableTypes,buttons:y.map(yo,Us),onChange:this.handleAvailableTypesChange})]}),t]})}}l(_n,"propTypes",{...de}),l(_n,"widgetName","grapher"),l(_n,"defaultProps",go.defaultWidgetOptions);_n.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleAvailableTypesChange",docblock:null,modifiers:[],params:[{name:"newAvailableTypes",optional:!1,type:{name:"Array",elements:[{name:"any"}],raw:"Array<any>",alias:"Array"}}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GrapherEditor",props:{graph:{defaultValue:{value:`{
    labels: ["x", "y"],
    range: [
        [-10, 10],
        [-10, 10],
    ],
    step: [1, 1],
    backgroundImage: {
        url: null,
    },
    markings: "graph",
    rulerLabel: "",
    rulerTicks: 10,
    valid: true,
    showTooltips: false,
}`,computed:!1},required:!1},correct:{defaultValue:{value:`{
    type: "linear",
    coords: null,
}`,computed:!1},required:!1},availableTypes:{defaultValue:{value:'["linear"]',computed:!1},required:!1}},composes:["@khanacademy/perseus"]};class zn extends h.Component{constructor(){super(...arguments);l(this,"editor",h.createRef());l(this,"getSaveWarnings",()=>{var n;return(n=this.editor.current)==null?void 0:n.getSaveWarnings()});l(this,"serialize",()=>{var n;return y.extend({},(n=this.editor.current)==null?void 0:n.serialize())})}render(){return e.jsx("div",{className:"perseus-group-editor",children:e.jsx(Ae,{ref:this.editor,content:this.props.content,widgets:this.props.widgets,apiOptions:this.props.apiOptions,images:this.props.images,widgetEnabled:!0,immutableWidgets:!1,onChange:this.props.onChange})})}}l(zn,"propTypes",{content:I.string,widgets:I.object,images:I.object,apiOptions:Ea.propTypes}),l(zn,"widgetName","group"),l(zn,"defaultProps",bo.defaultWidgetOptions);zn.__docgenInfo={description:"",methods:[{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GroupEditor",props:{content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},images:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0}}};class pt extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("fieldset",{children:[e.jsxs("label",{children:["Name:",e.jsx(Oe,{value:this.props.name,onChange:this.change("name")})]}),e.jsxs("label",{children:["Value:",e.jsx(Oe,{value:this.props.value,onChange:this.change("value")})]})]})}}l(pt,"propTypes",{...de,name:I.string,value:I.string}),l(pt,"defaultProps",{name:"",value:""});class Kr extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"handlePairChange",(n,a)=>{const t=this.props.pairs.slice();t[n]=a;const o=t[t.length-1];o.name&&o.value&&t.push({name:"",value:""}),this.change("pairs",t)});l(this,"serialize",()=>Q.serialize.call(this))}render(){const n=y.map(this.props.pairs,(a,t)=>e.jsx(pt,{name:a.name,value:a.value,onChange:this.handlePairChange.bind(this,t)},t));return e.jsx("div",{children:n})}}l(Kr,"propTypes",{...de,pairs:I.arrayOf(I.shape({name:I.string,value:I.string})).isRequired});class Dn extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"handleSettingsChange",n=>{this.change({settings:n.pairs})});l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsxs("div",{style:{fontWeight:"bold",textAlign:"center"},children:["This widget is deprecated! ",e.jsx("br",{}),"Try using the Video or CS Program widgets instead."]}),e.jsxs("label",{children:["Url or Program ID:",e.jsx(Oe,{value:this.props.url,onChange:this.change("url")})]}),e.jsx("br",{}),e.jsxs("label",{children:["Settings:",e.jsx(Kr,{name:"settings",pairs:this.props.settings,onChange:this.handleSettingsChange})]}),e.jsx("br",{}),e.jsxs("label",{children:["Width:",e.jsx(Oe,{value:this.props.width,onChange:this.change("width")})]}),e.jsxs("label",{children:["Height:",e.jsx(Oe,{value:this.props.height,onChange:this.change("height")})]}),e.jsx(ae,{label:"Allow full screen",checked:this.props.allowFullScreen,onChange:n=>{this.props.onChange({allowFullScreen:n})}}),e.jsx("br",{}),e.jsx(ae,{label:"Allow iframe content to redirect the page",checked:this.props.allowTopNavigation,onChange:n=>{this.props.onChange({allowTopNavigation:n})}})]})}}l(Dn,"propTypes",{...de}),l(Dn,"widgetName","iframe"),l(Dn,"defaultProps",wo.defaultWidgetOptions);Dn.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleSettingsChange",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"IframeEditor",props:{url:{defaultValue:{value:'""',computed:!1},required:!1},settings:{defaultValue:{value:'[{name: "", value: ""}]',computed:!1},required:!1},width:{defaultValue:{value:'"400"',computed:!1},required:!1},height:{defaultValue:{value:'"400"',computed:!1},required:!1},allowFullScreen:{defaultValue:{value:"false",computed:!1},required:!1},allowTopNavigation:{defaultValue:{value:"false",computed:!1},required:!1}},composes:["@khanacademy/perseus"]};const{InlineIcon:xn}=G;class Te extends h.Component{constructor(n){super(n);l(this,"toggle",n=>{n.preventDefault(),this.setState({show:!this.state.show})});this.state={show:n.initiallyVisible}}render(){return e.jsxs("div",{className:"perseus-interaction-element",children:[e.jsxs("a",{href:"#",className:"perseus-interaction-element-title "+(this.state.show?"open":"closed"),onClick:this.toggle,children:[this.state.show?e.jsx(xn,{...fo}):e.jsx(xn,{...os}),this.props.title]}),e.jsxs("div",{className:"perseus-interaction-element-content "+(this.state.show?"enter":"leave"),children:[this.props.children,(this.props.onUp!=null||this.props.onDown!=null||this.props.onDelete!=null)&&e.jsxs("div",{className:"edit-controls",children:[this.props.onUp!=null&&e.jsx("button",{onClick:this.props.onUp,children:e.jsx(xn,{...ss})}),this.props.onDown!=null&&e.jsx("button",{onClick:this.props.onDown,children:e.jsx(xn,{...ls})}),this.props.onDelete!=null&&e.jsx("button",{onClick:this.props.onDelete,children:e.jsx(xn,{...bt})})]})]})]})}}l(Te,"defaultProps",{initiallyVisible:!1,title:"More"});Te.__docgenInfo={description:"",methods:[{name:"toggle",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent",alias:"React.SyntheticEvent"}}],returns:null}],displayName:"ElementContainer",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement<any> | ReadonlyArray<React.ReactElement<any>>",elements:[{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]},{name:"ReadonlyArray",elements:[{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}],raw:"ReadonlyArray<React.ReactElement<any>>"}]},description:""},initiallyVisible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void | null | undefined",signature:{arguments:[],return:{name:"union",raw:"void | null | undefined",elements:[{name:"void"},{name:"null"},{name:"undefined"}]}}},description:""},onDown:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void | null | undefined",signature:{arguments:[],return:{name:"union",raw:"void | null | undefined",elements:[{name:"void"},{name:"null"},{name:"undefined"}]}}},description:""},onUp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void | null | undefined",signature:{arguments:[],return:{name:"union",raw:"void | null | undefined",elements:[{name:"void"},{name:"null"},{name:"undefined"}]}}},description:""},title:{required:!1,tsType:{name:"union",raw:"string | React.ReactElement<any>",elements:[{name:"string"},{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}]},description:"",defaultValue:{value:'"More"',computed:!1}}}};const{ButtonGroup:Ks}=G,Xs=[se.BLACK,se.BLUE,se.GREEN,se.PINK,se.PURPLE,se.RED,se.GRAY],Ys=[se.LIGHT_BLUE,se.LIGHT_ORANGE,se.LIGHT_PINK,se.LIGHT_GREEN,se.LIGHT_PURPLE,se.LIGHT_RED,"#fff"];class He extends h.Component{render(){const r=this.props.lightColors?Ys:Xs;return e.jsx(Ks,{value:this.props.value,allowEmpty:!1,buttons:y.map(r,n=>({value:n,content:e.jsxs("span",{children:[e.jsx("span",{className:"colorpicker-circle",style:{background:n}})," "]})})),onChange:this.props.onChange})}}l(He,"defaultProps",{value:se.BLACK,lightColors:!1});He.__docgenInfo={description:"",methods:[],displayName:"ColorPicker",props:{lightColors:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"black"',computed:!1}}}};const{ButtonGroup:Js}=G;class ra extends h.Component{render(){return e.jsx(Js,{value:this.props.value,allowEmpty:!1,buttons:[{value:"",content:e.jsx("span",{children:"—"})},{value:"-",content:e.jsx("span",{children:"–––"})},{value:"- ",content:e.jsx("span",{children:"–  –"})},{value:".",content:e.jsx("span",{children:"····"})},{value:". ",content:e.jsx("span",{children:"· · ·"})}],onChange:this.props.onChange})}}l(ra,"defaultProps",{value:""});ra.__docgenInfo={description:"",methods:[],displayName:"DashPicker",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};function H(i){const r=h.useRef(null),n=h.useRef(),{locale:a,strings:t}=vo();return h.useEffect(()=>{r.current&&!n.current&&(n.current=ko(r.current,a,t,o=>({...o,handlers:{edit:s=>{let u=s.latex();u=u.replace(/<>/g,"\\ne"),i.value!==u&&i.onChange(u)},upOutOf:s=>{s.typedText("^")}}})))}),e.jsx(x,{style:Qs.outerWrapper,children:e.jsx("span",{ref:r,className:"perseus-math-input mq-editable-field mq-math-mode"})})}const Qs=R.StyleSheet.create({outerWrapper:{display:"inline-block",borderStyle:"solid",borderWidth:1,borderColor:O.offBlack50,borderRadius:3,background:O.white}});H.__docgenInfo={description:`A simple Mathquill MathField input for the InteractionEditor.
Unlike our other uses of Mathquill, we're not using a keypad here;
it's just the input itself for use writing TeX.`,methods:[],displayName:"MathquillInput",props:{value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};const{NumberInput:Zs}=G,{getDependencies:el}=De;class ka extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=el();return e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(n,{children:this.props.funcName+"(x)="})," ",e.jsx(H,{value:this.props.value,onChange:this.change("value")})]}),e.jsxs("div",{className:"perseus-widget-row",children:["Range: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.rangeMin,onChange:this.change("rangeMin")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.rangeMax,onChange:this.change("rangeMax")}),e.jsx(n,{children:"\\Large)"})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(He,{value:this.props.color,onChange:this.change("color")})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ra,{value:this.props.strokeDasharray,onChange:this.change("strokeDasharray")})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("div",{className:"perseus-widget-left-col",children:["Width:"," ",e.jsx(Zs,{value:this.props.strokeWidth,placeholder:2,onChange:this.change("strokeWidth")})]})})]})}}l(ka,"defaultProps",{value:"x",rangeMin:"-10",rangeMax:"10",color:se.BLUE,strokeDasharray:"",strokeWidth:2});ka.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"FunctionEditor",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"x"',computed:!1}},rangeMin:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"-10"',computed:!1}},rangeMax:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"10"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"color.blue",computed:!0}},strokeDasharray:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}}}};const{TextInput:nl}=G,{getDependencies:al}=De;class xa extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=al();return e.jsxs("div",{className:"graph-settings",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(nl,{value:this.props.label,onChange:this.change("label"),style:{width:"100%"}})}),e.jsxs("div",{className:"perseus-widget-row",children:["Location: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.coordX,onChange:this.change("coordX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.coordY,onChange:this.change("coordY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(He,{value:this.props.color,onChange:this.change("color")})})]})}}l(xa,"defaultProps",{coordX:"0",coordY:"0",color:se.BLACK,label:"\\phi"});xa.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"LabelEditor",props:{color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"black"',computed:!1}},coordX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},coordY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"\\\\phi"',computed:!1}}}};const{ButtonGroup:tl}=G;class Tt extends h.Component{render(){return e.jsx(tl,{value:this.props.value,allowEmpty:!1,buttons:[{value:"",content:e.jsx("span",{children:"—"})},{value:"->",content:e.jsx("span",{children:"→"})}],onChange:this.props.onChange})}}l(Tt,"defaultProps",{value:""});Tt.__docgenInfo={description:"",methods:[],displayName:"ArrowPicker",props:{value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const{NumberInput:rl}=G,{getDependencies:il}=De;class Ca extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=il();return e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:["Start: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.startX,onChange:this.change("startX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.startY,onChange:this.change("startY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsxs("div",{className:"perseus-widget-row",children:["End: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.endX,onChange:this.change("endX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.endY,onChange:this.change("endY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(He,{value:this.props.color,onChange:this.change("color")})}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(ra,{value:this.props.strokeDasharray,onChange:this.change("strokeDasharray")}),"   ",e.jsx(Tt,{value:this.props.arrows,onChange:this.change("arrows")})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("div",{className:"perseus-widget-left-col",children:["Width:"," ",e.jsx(rl,{value:this.props.strokeWidth,placeholder:2,onChange:this.change("strokeWidth")})]})})]})}}l(Ca,"defaultProps",{startX:"-5",startY:"5",endX:"5",endY:"5",color:se.BLACK,strokeDasharray:"",arrows:"",strokeWidth:2});Ca.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"LineEditor",props:{startX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"-5"',computed:!1}},startY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"5"',computed:!1}},endX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"5"',computed:!1}},endY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"5"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"black"',computed:!1}},strokeDasharray:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},arrows:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}}}};const{ButtonGroup:ol,NumberInput:sl}=G;class Da extends h.Component{constructor(){super(...arguments);l(this,"change",n=>K.call(this,n))}render(){const{TeX:n}=yt();return e.jsxs("div",{children:[e.jsxs("div",{className:"perseus-widget-row",children:["Constraint:"," ",e.jsx(ol,{value:this.props.constraint,allowEmpty:!1,buttons:[{value:"none",content:"None"},{value:"snap",content:"Snap"},{value:"x",content:"x="},{value:"y",content:"y="}],onChange:this.change("constraint")})]}),this.props.constraint==="snap"&&e.jsxs("div",{className:"perseus-widget-row",children:["Snap:"," ",e.jsx(sl,{value:this.props.snap,placeholder:0,onChange:this.change("snap")})]}),this.props.constraint==="x"&&e.jsx("div",{className:"graph-settings",children:e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(n,{children:"x="})," ",e.jsx(H,{value:this.props.constraintFn,onChange:this.change("constraintFn")})]})}),this.props.constraint==="y"&&e.jsx("div",{className:"graph-settings",children:e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(n,{children:"y="})," ",e.jsx(H,{value:this.props.constraintFn,onChange:this.change("constraintFn")})]})}),"Ensure these are set so nothing can be dragged off the canvas:",e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(n,{children:"x \\in \\Large["})," ",e.jsx(H,{value:this.props.constraintXMin,onChange:this.change("constraintXMin")}),e.jsx(n,{children:", "})," ",e.jsx(H,{value:this.props.constraintXMax,onChange:this.change("constraintXMax")})," ",e.jsx(n,{children:"\\Large]"})]})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(n,{children:"y \\in \\Large["})," ",e.jsx(H,{value:this.props.constraintYMin,onChange:this.change("constraintYMin")}),e.jsx(n,{children:", "})," ",e.jsx(H,{value:this.props.constraintYMax,onChange:this.change("constraintYMax")})," ",e.jsx(n,{children:"\\Large]"})]})})]})}}l(Da,"defaultProps",{constraint:"none",snap:.5,constraintFn:"0",constraintXMin:"-10",constraintXMax:"10",constraintYMin:"-10",constraintYMax:"10"});Da.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"propName",optional:!1,type:{name:"string"}}],returns:{type:{name:"unknown"}}}],displayName:"ConstraintEditor",props:{constraint:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"none"',computed:!1}},constraintFn:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},constraintXMax:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"10"',computed:!1}},constraintXMin:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"-10"',computed:!1}},constraintYMax:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"10"',computed:!1}},constraintYMin:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"-10"',computed:!1}},snap:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.5",computed:!1}}}};const{NumberInput:Ht}=G,{getDependencies:ll}=De;class qa extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=ll();return e.jsxs("div",{className:"graph-settings",children:["Initial position:",e.jsxs("div",{className:"perseus-widget-row",children:["Start: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.startX,onChange:this.change("startX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.startY,onChange:this.change("startY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsxs("div",{className:"perseus-widget-row",children:["End: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.endX,onChange:this.change("endX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.endY,onChange:this.change("endY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsxs("div",{className:"perseus-widget-row",children:["Start updates ",e.jsx(n,{children:"(x_n, y_n)"})," for ",e.jsx(n,{children:"n ="}),e.jsx(Ht,{value:this.props.startSubscript,placeholder:0,onChange:this.change("startSubscript")})]}),e.jsxs("div",{className:"perseus-widget-row",children:["End updates ",e.jsx(n,{children:"(x_m, y_m)"})," for ",e.jsx(n,{children:"m ="}),e.jsx(Ht,{value:this.props.endSubscript,placeholder:0,onChange:this.change("endSubscript")})]}),e.jsx("div",{className:"perseus-widget-row",children:"All constraints are applied to the start point."}),e.jsx(Da,{...this.props})]})}}l(qa,"defaultProps",{startX:"-5",startY:"5",endX:"5",endY:"5",constraint:"none",snap:.5,constraintFn:"0",constraintXMin:"-10",constraintXMax:"10",constraintYMin:"-10",constraintYMax:"10"});qa.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MovableLineEditor",props:{startX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"-5"',computed:!1}},startY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"5"',computed:!1}},endX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"5"',computed:!1}},endY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"5"',computed:!1}},constraint:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"none"',computed:!1}},snap:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.5",computed:!1}},constraintFn:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},startSubscript:{required:!0,tsType:{name:"number"},description:""},endSubscript:{required:!0,tsType:{name:"number"},description:""},constraintXMin:{defaultValue:{value:'"-10"',computed:!1},required:!1},constraintXMax:{defaultValue:{value:'"10"',computed:!1},required:!1},constraintYMin:{defaultValue:{value:'"-10"',computed:!1},required:!1},constraintYMax:{defaultValue:{value:'"10"',computed:!1},required:!1}}};const{NumberInput:ul}=G,{getDependencies:dl}=De;class Ta extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=dl();return e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:["Start: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.startX,onChange:this.change("startX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.startY,onChange:this.change("startY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsxs("div",{className:"perseus-widget-row",children:["Update ",e.jsx(n,{children:"(x_n, y_n)"})," for ",e.jsx(n,{children:"n ="})," ",e.jsx(ul,{value:this.props.varSubscript,placeholder:0,onChange:this.change("varSubscript")})]}),e.jsx(Da,{...this.props})]})}}l(Ta,"defaultProps",{startX:"0",startY:"0",constraint:"none",snap:.5,constraintFn:"0",constraintXMin:"-10",constraintXMax:"10",constraintYMin:"-10",constraintYMax:"10"});Ta.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MovablePointEditor",props:{startX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},startY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},constraint:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"none"',computed:!1}},snap:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.5",computed:!1}},constraintFn:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},varSubscript:{required:!0,tsType:{name:"number"},description:""},constraintXMin:{defaultValue:{value:'"-10"',computed:!1},required:!1},constraintXMax:{defaultValue:{value:'"10"',computed:!1},required:!1},constraintYMin:{defaultValue:{value:'"-10"',computed:!1},required:!1},constraintYMax:{defaultValue:{value:'"10"',computed:!1},required:!1}}};const{NumberInput:ml}=G,{getDependencies:pl}=De;class Sa extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=pl();return e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(n,{children:"X(t) ="})," ",e.jsx(H,{value:this.props.x,onChange:this.change("x")})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(n,{children:"Y(t) ="})," ",e.jsx(H,{value:this.props.y,onChange:this.change("y")})]}),e.jsxs("div",{className:"perseus-widget-row",children:["Range: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.rangeMin,onChange:this.change("rangeMin")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.rangeMax,onChange:this.change("rangeMax")}),e.jsx(n,{children:"\\Large)"})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(He,{value:this.props.color,onChange:this.change("color")})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ra,{value:this.props.strokeDasharray,onChange:this.change("strokeDasharray")})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("div",{className:"perseus-widget-left-col",children:["Width:"," ",e.jsx(ml,{value:this.props.strokeWidth,placeholder:2,onChange:this.change("strokeWidth")})]})})]})}}l(Sa,"defaultProps",{x:"cos(t)",y:"sin(t)",rangeMin:"0",rangeMax:"2\\pi",color:se.BLUE,strokeDasharray:"",strokeWidth:2});Sa.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ParametricEditor",props:{x:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"cos(t)"',computed:!1}},y:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"sin(t)"',computed:!1}},rangeMin:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},rangeMax:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"2\\\\pi"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"color.blue",computed:!0}},strokeDasharray:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}}}};const{getDependencies:cl}=De;class Aa extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=cl();return e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:["Coordinate: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.coordX,onChange:this.change("coordX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.coordY,onChange:this.change("coordY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(He,{value:this.props.color,onChange:this.change("color")})})]})}}l(Aa,"defaultProps",{coordX:"0",coordY:"0",color:se.BLACK});Aa.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PointEditor",props:{coordX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},coordY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"0"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"black"',computed:!1}}}};const{getDependencies:hl}=De;class ja extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const{TeX:n}=hl();return e.jsxs("div",{className:"graph-settings",children:[e.jsxs("div",{className:"perseus-widget-row",children:["Bottom left: ",e.jsx(n,{children:"\\Large("}),e.jsx(H,{value:this.props.coordX,onChange:this.change("coordX")}),e.jsx(n,{children:","})," ",e.jsx(H,{value:this.props.coordY,onChange:this.change("coordY")}),e.jsx(n,{children:"\\Large)"})]}),e.jsxs("div",{className:"perseus-widget-row",children:["Width:"," ",e.jsx(H,{value:this.props.width,onChange:this.change("width")})]}),e.jsxs("div",{className:"perseus-widget-row",children:["Height:"," ",e.jsx(H,{value:this.props.height,onChange:this.change("height")})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(He,{value:this.props.color,lightColors:!0,onChange:this.change("color")})}),e.jsx("div",{className:"perseus-widget-row",children:"You want a border? Sorry, draw your own."})]})}}l(ja,"defaultProps",{coordX:"-5",coordY:"5",width:"2",height:"3",color:se.LIGHT_BLUE});ja.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"RectangleEditor",props:{color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#9AB8ED"',computed:!1}},coordX:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"-5"',computed:!1}},coordY:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"5"',computed:!1}},height:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"3"',computed:!1}},width:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"2"',computed:!1}}}};const{getDependencies:gl}=De,{unescapeMathMode:yl}=ue;class Pa extends h.Component{constructor(){super(...arguments);l(this,"state",{usedVarSubscripts:this._getAllVarSubscripts(this.props.elements),usedFunctionNames:this._getAllFunctionNames(this.props.elements)});l(this,"_updateGraphProps",n=>{this.change({graph:y.extend(y.omit(n,"step"),{tickStep:n.step})})});l(this,"_addNewElement",n=>{const a=n.target.value;if(a==="")return;n.target.value="";const t={type:a,key:a+"-"+(Math.random()*16777215<<0).toString(16),options:a==="point"?y.clone(Aa.defaultProps):a==="line"?y.clone(Ca.defaultProps):a==="movable-point"?y.clone(Ta.defaultProps):a==="movable-line"?y.clone(qa.defaultProps):a==="function"?y.clone(ka.defaultProps):a==="parametric"?y.clone(Sa.defaultProps):a==="label"?y.clone(xa.defaultProps):a==="rectangle"?y.clone(ja.defaultProps):{}};let o;if(a==="movable-point")o=y.max([y.max(this.state.usedVarSubscripts),-1])+1,t.options.varSubscript=o;else if(a==="movable-line")o=y.max([y.max(this.state.usedVarSubscripts),-1])+1,t.options.startSubscript=o,t.options.endSubscript=o+1;else if(a==="function"){const s=String.fromCharCode(y.max([y.max(y.map(this.state.usedFunctionNames,function(u){return u.charCodeAt(0)})),101])+1);t.options.funcName=s}this.change({elements:this.props.elements.concat(t)})});l(this,"_deleteElement",n=>{const a=this.props.elements[n];this.change({elements:y.without(this.props.elements,a)})});l(this,"_moveElementUp",n=>{const a=this.props.elements[n],t=y.without(this.props.elements,a);t.splice(n-1,0,a),this.change({elements:t})});l(this,"_moveElementDown",n=>{const a=this.props.elements[n],t=y.without(this.props.elements,a);t.splice(n+1,0,a),this.change({elements:t})});l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}UNSAFE_componentWillReceiveProps(n){this.setState({usedVarSubscripts:this._getAllVarSubscripts(n.elements),usedFunctionNames:this._getAllFunctionNames(n.elements)})}_getAllVarSubscripts(n){return y.map(y.where(n,{type:"movable-point"}),a=>a.options.varSubscript).concat(y.map(y.where(n,{type:"movable-line"}),a=>a.options.startSubscript)).concat(y.map(y.where(n,{type:"movable-line"}),a=>a.options.endSubscript))}_getAllFunctionNames(n){return y.map(y.where(n,{type:"function"}),a=>a.options.funcName)}render(){const{TeX:n}=gl();return e.jsxs("div",{className:"perseus-widget-interaction-editor",children:[e.jsxs(Te,{title:"Grid settings",children:[e.jsx(Zn,{editableSettings:["canvas","graph"],box:this.props.graph.box,labels:this.props.graph.labels,range:this.props.graph.range,step:this.props.graph.tickStep,gridStep:this.props.graph.gridStep,markings:this.props.graph.markings,onChange:this._updateGraphProps}),e.jsx(e.Fragment,{children:this.props.graph.valid!==!0&&e.jsx("div",{children:this.props.graph.valid})})]}),y.map(this.props.elements,function(a,t){if(a.type==="movable-point")return e.jsx(Te,{title:e.jsxs("span",{children:["Movable point"," ",e.jsx(n,{children:"(x_{"+a.options.varSubscript+"}, y_{"+a.options.varSubscript+"})"})]}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement.bind(this,t),children:e.jsx(Ta,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key);if(a.type==="movable-line")return e.jsx(Te,{title:e.jsxs("span",{children:["Movable line"," ",e.jsx(n,{children:"(x_{"+a.options.startSubscript+"}, y_{"+a.options.startSubscript+"})"})," ","to"," ",e.jsx(n,{children:"(x_{"+a.options.endSubscript+"}, y_{"+a.options.endSubscript+"})"})]}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement.bind(this,t),children:e.jsx(qa,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key);if(a.type==="point")return e.jsx(Te,{title:e.jsxs("span",{children:["Point"," ",e.jsx(n,{children:"("+a.options.coordX+", "+a.options.coordY+")"})]}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement.bind(this,t),children:e.jsx(Aa,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key);if(a.type==="line")return e.jsx(Te,{title:e.jsxs("span",{children:["Line"," ",e.jsx(n,{children:"("+a.options.startX+", "+a.options.startY+")"})," ","to"," ",e.jsx(n,{children:"("+a.options.endX+", "+a.options.endY+")"})]}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement.bind(this,t),children:e.jsx(Ca,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key);if(a.type==="function")return e.jsx(Te,{title:e.jsxs("span",{children:["Function"," ",e.jsx(n,{children:a.options.funcName+"(x) = "+a.options.value})]}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement,children:e.jsx(ka,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key);if(a.type==="parametric")return e.jsx(Te,{title:e.jsx("span",{children:"Parametric"}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement,children:e.jsx(Sa,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key);if(a.type==="label")return e.jsx(Te,{title:e.jsxs("span",{children:["Label"," ",e.jsx(n,{children:yl(a.options.label)})," "]}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement,children:e.jsx(xa,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key);if(a.type==="rectangle")return e.jsx(Te,{title:e.jsxs("span",{children:["Rectangle"," ",e.jsx(n,{children:"("+a.options.coordX+", "+a.options.coordY+")"})," — ",e.jsx(n,{children:a.options.width+" \\times "+a.options.height})]}),onUp:t===0?null:this._moveElementUp.bind(this,t),onDown:t===this.props.elements.length-1?null:this._moveElementDown.bind(this,t),onDelete:this._deleteElement,children:e.jsx(ja,{...a.options,onChange:o=>{const s=JSON.parse(JSON.stringify(this.props.elements));y.extend(s[t].options,o),this.change({elements:s})}})},a.key)},this),e.jsx("div",{className:"perseus-widget-interaction-editor-select-element",children:e.jsxs("select",{onChange:this._addNewElement,children:[e.jsxs("option",{value:"",children:["Add an element","…"]}),e.jsx("option",{disabled:!0,children:"--"}),e.jsx("option",{value:"point",children:"Point"}),e.jsx("option",{value:"line",children:"Line segment"}),e.jsx("option",{value:"function",children:"Function plot"}),e.jsx("option",{value:"parametric",children:"Parametric plot"}),e.jsx("option",{value:"label",children:"Label"}),e.jsx("option",{value:"rectangle",children:"Rectangle"}),e.jsx("option",{value:"movable-point",children:"★ Movable point"}),e.jsx("option",{value:"movable-line",children:"★ Movable line segment"})]})})]})}}l(Pa,"widgetName","interaction"),l(Pa,"defaultProps",xo.defaultWidgetOptions);Pa.__docgenInfo={description:`An editor for the interaction widget that allows users to engage with interactive content.

The interaction widget provides a dynamic graph interface with various interactive elements
including points, lines, movable points, movable lines, functions, parametric curves,
labels, and rectangles. This editor allows content creators to configure those elements
and their properties.`,methods:[{name:"_getAllVarSubscripts",docblock:null,modifiers:[],params:[{name:"elements",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"ReadonlyArray"}}],returns:{type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>"}}},{name:"_getAllFunctionNames",docblock:null,modifiers:[],params:[{name:"elements",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"ReadonlyArray"}}],returns:{type:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}}},{name:"_updateGraphProps",docblock:null,modifiers:[],params:[{name:"newProps",optional:!1,type:null}],returns:null},{name:"_addNewElement",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"_deleteElement",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:null}],returns:null},{name:"_moveElementUp",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:null}],returns:null},{name:"_moveElementDown",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:null}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractionEditor",props:{elements:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>"},description:"",defaultValue:{value:"[]",computed:!1}},graph:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    box: ReadonlyArray<number>;
    labels: ReadonlyArray<string>;
    range: Coords;
    tickStep: [number, number];
    gridStep: [number, number];
    markings: MarkingsType;
    valid?: boolean;
}`,signature:{properties:[{key:"box",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"range",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"tickStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0}},{key:"valid",value:{name:"boolean",required:!1}}]}},description:"",defaultValue:{value:`{
    box: [400, 400],
    labels: ["x", "y"],
    range: [
        [-10, 10],
        [-10, 10],
    ],
    tickStep: [1, 1],
    gridStep: [1, 1],
    markings: "graph",
}`,computed:!1}}}};const bl={marginBlock:T.size_080},wl={minHeight:100},yn=40,Xr=9,Yr=9,Le={clearSearch:"Clear search",filter:"Filter",noResults:"No results",someSelected:i=>i===1?"1 item":`${i} items`};var fl={listbox:{border:{radius:M.radius.radius_040},layout:{padding:{inline:T.size_0,block:T.size_040}},shadow:{default:`0 ${T.size_080} ${T.size_080} 0 ${E.core.shadow.transparent}`}},opener:{border:{width:{error:M.width.thin},radius:{rest:M.radius.radius_040}},color:{icon:E.core.foreground.neutral.default},layout:{padding:{inline:T.size_160,inlineStart:T.size_160,inlineEnd:T.size_120}}},item:{border:{radius:{default:M.radius.radius_040,press:M.radius.radius_040}},layout:{padding:{block:T.size_100,inlineStart:T.size_080,inlineEnd:T.size_160}},font:{weight:Ge.weight.regular}}},ee=Ir(fl,"--wb-c-dropdown-");class ea extends h.Component{static isClassOf(r){return r&&r.type&&r.type.__IS_ACTION_ITEM__}render(){const{disabled:r,horizontalRule:n,href:a,target:t,indent:o,label:s,lang:u,leftAccessory:d,rightAccessory:c,onClick:b,role:k,style:C,subtitle1:A,subtitle2:f,testId:w,active:_}=this.props,P=[Cn.wrapper,C],N=typeof s=="string"?e.jsx(aa,{tag:"div",lang:u,style:Cn.label,children:s}):h.cloneElement(s,{lang:u,style:Cn.label,...s.props});return e.jsx(Nr,{disabled:r,horizontalRule:n,leftAccessory:d,rightAccessory:c,style:[P,Cn.shared,o&&Cn.indent],role:k,testId:w,subtitle1:A,title:N,subtitle2:f,href:a,target:t,onClick:b,active:_})}}ea.defaultProps={disabled:!1,horizontalRule:"none",indent:!1,role:"menuitem"};ea.__IS_ACTION_ITEM__=!0;const Cn=R.StyleSheet.create({wrapper:{minHeight:yn,touchAction:"manipulation",":focus":{borderRadius:ee.item.border.radius.default,outline:ve.focus[":focus-visible"].outline,outlineOffset:`calc(${M.width.medium} * -1)`,boxShadow:`inset 0 0 0 calc(${M.width.medium}*2) ${E.focus.inner}`,":after":{content:"unset"}}},shared:{minHeight:yn,paddingBlock:ee.item.layout.padding.block},label:{fontWeight:ee.item.font.weight,lineHeight:T.size_200,whiteSpace:"nowrap",userSelect:"none"},indent:{paddingInlineStart:T.size_320}}),vl=function(i){const{selected:r,disabled:n}=i,a=n?E.core.foreground.disabled.strong:E.core.foreground.instructive.default;return e.jsx(Re,{color:a,icon:wt,size:"small",style:[Ut.bounds,!r&&Ut.hide]})},Ut=R.StyleSheet.create({bounds:{alignSelf:"center",height:T.size_160,minHeight:T.size_160,minWidth:T.size_160},hide:{visibility:"hidden"}}),kl=function(i){const{disabled:r,selected:n}=i;return e.jsx(x,{className:"checkbox",style:[la.checkbox,n&&!r&&la.selected,r&&la.disabledCheckbox],children:n&&e.jsx(Re,{icon:wt,size:"small",className:"check",style:[{width:T.size_120,height:T.size_120,margin:T.size_020},r&&n&&la.disabledCheckFormatting]})})},pn={color:{default:{border:E.input.default.border,background:E.input.default.background},disabled:{border:E.input.disabled.border,background:E.input.disabled.background},selected:{background:E.input.checked.background,foreground:E.input.checked.foreground}}},la=R.StyleSheet.create({checkbox:{alignSelf:"center",minHeight:T.size_160,minWidth:T.size_160,height:T.size_160,background:pn.color.default.background,borderRadius:3,borderWidth:M.width.thin,borderStyle:"solid",borderColor:pn.color.default.border},selected:{borderWidth:0,background:pn.color.selected.background,color:pn.color.selected.foreground},disabledCheckbox:{borderColor:pn.color.disabled.border,backgroundColor:pn.color.disabled.background},disabledCheckFormatting:{position:"absolute",top:-1,left:-1}});class D extends h.Component{static isClassOf(r){return r&&r.type&&r.type.__IS_OPTION_ITEM__}getCheckComponent(){return this.props.variant==="check"?vl:kl}render(){const{disabled:r,focused:n,label:a,selected:t,testId:o,leftAccessory:s,horizontalRule:u,parentComponent:d,rightAccessory:c,style:b,subtitle1:k,subtitle2:C,value:A,onClick:f,onToggle:w,variant:_,role:P,...N}=this.props,g=this.getCheckComponent(),p=[qn.optionItem,b],v=[qn.listboxOptionItem,n&&qn.listboxOptionItemFocused],S=[qn.selectOptionItem];return e.jsx(Nr,{disabled:r,horizontalRule:u,style:[p,d==="listbox"?v:S],"aria-selected":t?"true":"false",role:P,testId:o,leftAccessory:e.jsx(e.Fragment,{children:s?e.jsxs(x,{style:{flexDirection:"row",gap:T.size_080},children:[e.jsx(g,{disabled:r,selected:t}),s]}):e.jsx(g,{disabled:r,selected:t})}),rightAccessory:c,subtitle1:k,title:e.jsx(aa,{tag:"div",style:qn.label,children:a}),subtitle2:C,onClick:this.handleClick,tabIndex:d==="listbox"?-1:void 0,...N})}constructor(...r){super(...r),this.handleClick=()=>{const{onClick:n,onToggle:a,value:t}=this.props;a(t),n&&n()}}}D.defaultProps={disabled:!1,focused:!1,horizontalRule:"none",onToggle:()=>{},role:"option",selected:!1};D.__IS_OPTION_ITEM__=!0;const Ya={borderRadius:ee.item.border.radius.default,outline:ve.focus[":focus-visible"].outline,outlineOffset:`calc(${M.width.medium} * -1)`,boxShadow:`inset 0 0 0 calc(${M.width.medium}*2) ${E.focus.inner}`},Kt={outline:"none",boxShadow:"none"},qn=R.StyleSheet.create({optionItem:{paddingBlock:ee.item.layout.padding.block,paddingInlineStart:ee.item.layout.padding.inlineStart,paddingInlineEnd:ee.item.layout.padding.inlineEnd,whiteSpace:"nowrap",minHeight:T.size_400,":active":{borderRadius:ee.item.border.radius.press},":is([aria-disabled=true])":{":focus":Kt}},listboxOptionItem:{":focus-visible":Kt},listboxOptionItemFocused:{...Ya,":focus-visible":Ya},selectOptionItem:{":focus":Ya},label:{fontWeight:ee.item.font.weight,lineHeight:T.size_200,whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},hide:{visibility:"hidden"}});class nn extends h.Component{static isClassOf(r){return r&&r.type&&r.type.__IS_SEPARATOR_ITEM__}render(){return e.jsx(x,{style:[xl.separator,this.props.style],"aria-hidden":"true"})}}nn.__IS_SEPARATOR_ITEM__=!0;const xl=R.StyleSheet.create({separator:{borderTop:`${M.width.thin} solid ${E.core.border.neutral.subtle}`,height:1,minHeight:1,marginBlock:T.size_040}});class St extends h.Component{renderAnchorChildren(r,n){const{disabled:a,testId:t,text:o,opened:s,"aria-controls":u,"aria-haspopup":d,"aria-required":c,id:b,role:k,onBlur:C}=this.props,A=this.props.children({...r,text:o,opened:s}),f=A.props,w=this.getTestIdFromProps(f),_=f["aria-label"]??this.props["aria-label"];return h.cloneElement(A,{...n,"aria-label":_??void 0,"aria-invalid":this.props.error,disabled:a,"aria-controls":u,role:k,id:b,"aria-expanded":s?"true":"false","aria-haspopup":d,"aria-required":c,onClick:f.onClick?P=>{f.onClick(P),n.onClick(P)}:n.onClick,"data-testid":w||t,onBlur:C})}render(){return e.jsx(So,{onClick:this.props.onClick,disabled:this.props.disabled,tabIndex:0,children:(r,n)=>this.renderAnchorChildren(r,n)})}constructor(...r){super(...r),this.getTestIdFromProps=n=>n.testId||n["data-testid"]}}St.defaultProps={disabled:!1};class Cl extends h.Component{render(){const{data:r,index:n,style:a}=this.props,t=r[n];if(nn.isClassOf(t.component))return h.cloneElement(t.component,{style:a});{const{component:o,populatedProps:s,onClick:u,role:d,ref:c}=t;return h.cloneElement(o,{style:a,...s,key:n,onClick:u,ref:t.focusable&&c,role:d})}}}function Xt(i,r=0){return i.slice(0,Xr).reduce((n,a)=>nn.isClassOf(a.component)?n+Yr:n+yn,r)}class ql extends h.Component{componentDidMount(){const{schedule:r}=this.props;r.animationFrame(()=>{this.setWidth()})}componentDidUpdate(r){const{data:n,listRef:a}=this.props;r.data.length!==n.length&&(this.setHeight(),a&&a.current&&a.current.resetAfterIndex(1))}setWidth(){const r=gn.findDOMNode(this),n=r==null?void 0:r.parentElement;if(n){const a=n.getBoundingClientRect().width;this.setState({width:a})}}setHeight(){const r=Xt(this.props.data);this.setState({height:r})}renderInitialItems(){const{data:r}=this.props,n=r.map(t=>t.component);return h.Children.toArray(n).filter(Boolean).sort((t,o)=>o.props.label&&t.props.label?o.props.label.length-t.props.label.length:-1).slice(0,Xr).map(t=>h.cloneElement(t,{style:{visibility:"hidden"}}))}renderVirtualizedList(r,n){const{data:a,listRef:t}=this.props;return e.jsx(jo,{height:n,itemCount:a.length,itemSize:this.getItemSize,itemData:a,style:{overflowX:"hidden"},width:r,overscanCount:5,ref:t,children:Cl})}render(){const{width:r,height:n}=this.state;return r==null?this.renderInitialItems():this.renderVirtualizedList(r,n)}constructor(r){super(r),this.getItemSize=n=>{const a=this.props.data[n];return nn.isClassOf(a.component)?Yr:yn},this.state={height:Xt(r.data),width:r.width}}}var Tl=Pr(ql);function Sl({state:i,options:r}){const n=ps(i,r),{y:a}=i.modifiersData.preventOverflow||{y:0},{height:t}=i.rects.popper,[o]=i.placement.split("-"),u=t-n[o==="top"?"top":"bottom"]-a;i.styles.popper={...i.styles.popper,maxHeight:`${u}px`,"--popper-max-height":`${u}px`}}const Al={name:"maxHeight",enabled:!0,phase:"main",options:{padding:yn},requiresIfExists:["offset","preventOverflow","flip"],fn:Sl},jl=[{name:"preventOverflow",options:{rootBoundary:"viewport",altAxis:!0,tether:!1}},Al],Pl=function({children:i,alignment:r="left",onPopperElement:n,referenceElement:a}){const t=Ao(a)||document.querySelector("body");return t?gn.createPortal(e.jsx(ms,{innerRef:o=>{o&&n&&n(o)},referenceElement:a,strategy:"fixed",placement:r==="left"?"bottom-start":"bottom-end",modifiers:jl,children:({placement:o,ref:s,style:u,hasPopperEscaped:d,isReferenceHidden:c})=>{const b=!!(d||c);return e.jsx("div",{ref:s,style:u,"data-testid":"dropdown-popper","data-placement":o,children:i(b)})}}),t):null};function Nl(i){return i.length===1||!/^[A-Z]/i.test(i)?i:""}function Il(i,r){let n;return function(...t){const o=()=>{clearTimeout(n),i(...t)};clearTimeout(n),n=setTimeout(o,r)}}function Yt(i){return typeof i=="string"}function Na(i){return Yt(i.label)?i.label:Yt(i.labelAsText)?i.labelAsText:""}function Ll(i,r){return i?Na(r):r.label}const Rl=125;class Ma extends h.Component{static sameItemsFocusable(r,n){if(r.length!==n.length)return!1;for(let a=0;a<r.length;a++)if(r[a].focusable!==n[a].focusable)return!1;return!0}static getDerivedStateFromProps(r,n){if(n.itemRefs.length===0&&r.open||!Ma.sameItemsFocusable(n.prevItems,r.items)){const a=[];for(let t=0;t<r.items.length;t++)if(r.items[t].focusable){const o=h.createRef();a.push({ref:o,originalIndex:t})}return{itemRefs:a,prevItems:r.items,sameItemsFocusable:!1}}else return{prevItems:r.items,sameItemsFocusable:!0}}componentDidMount(){this.updateEventListeners(),this.maybeFocusInitialItem()}componentDidUpdate(r){const{open:n,searchText:a}=this.props;if(r.open!==n)this.updateEventListeners(),this.maybeFocusInitialItem();else if(n){const{itemRefs:t,sameItemsFocusable:o}=this.state;if(o||r.searchText!==a)return;{const s=t.findIndex(u=>u.originalIndex===this.focusedOriginalIndex);s===-1?(this.focusedIndex=0,this.itemsClicked=!1,this.scheduleToFocusCurrentItem()):this.focusedIndex=s}this.props.labels!==r.labels&&this.setState({labels:{...this.state.labels,...this.props.labels}})}}componentWillUnmount(){this.removeEventListeners()}resetFocusedIndex(){const{initialFocusedIndex:r}=this.props;if(typeof r<"u")this.focusedIndex=r;else{if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=0}}maybeFocusInitialItem(){const{autoFocus:r,open:n}=this.props;r&&(n?(this.resetFocusedIndex(),this.scheduleToFocusCurrentItem()):n||(this.itemsClicked=!1))}updateEventListeners(){this.props.open?this.addEventListeners():this.removeEventListeners()}addEventListeners(){document.addEventListener("mouseup",this.handleInteract),document.addEventListener("touchend",this.handleInteract)}removeEventListeners(){document.removeEventListener("mouseup",this.handleInteract),document.removeEventListener("touchend",this.handleInteract)}scheduleToFocusCurrentItem(r){this.shouldVirtualizeList()?this.props.schedule.animationFrame(()=>{this.focusCurrentItem(r)}):this.focusCurrentItem(r)}focusCurrentItem(r){const n=this.state.itemRefs[this.focusedIndex];if(!n)return;const{current:a}=this.virtualizedListRef;a&&a.scrollToItem(n.originalIndex);const t=()=>{if(!this.props.open)return;const o=this.state.itemRefs[this.focusedIndex],s=gn.findDOMNode(o.ref.current);if(!s&&this.shouldVirtualizeList()){this.props.schedule.animationFrame(t);return}s&&(s.focus(),this.focusedOriginalIndex=o.originalIndex,r&&r(s))};this.shouldVirtualizeList()?this.props.schedule.animationFrame(t):t()}focusSearchField(){this.searchFieldRef.current&&this.searchFieldRef.current.focus()}hasSearchField(){return!!this.props.isFilterable}isSearchFieldFocused(){return this.hasSearchField()&&document.activeElement===this.searchFieldRef.current}focusPreviousItem(){if(this.focusedIndex===0||this.isSearchFieldFocused()&&!this.props.enableTypeAhead){if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=this.state.itemRefs.length-1}else this.isSearchFieldFocused()||(this.focusedIndex-=1);this.scheduleToFocusCurrentItem()}focusNextItem(){if(this.focusedIndex===this.state.itemRefs.length-1||this.isSearchFieldFocused()&&!this.props.enableTypeAhead){if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=0}else this.isSearchFieldFocused()||(this.focusedIndex+=1);this.scheduleToFocusCurrentItem()}restoreTabOrder(){this.props.openerElement&&this.props.openerElement.focus()}getItemRole(){const{role:r}=this.props;switch(r){case"listbox":return"option";case"menu":return"menuitem";default:throw new Error(`Expected "listbox" or "menu" for role, but receieved "${r}" instead.`)}}maybeRenderNoResults(){const{items:r,labels:{noResults:n}}=this.props;return r.length===0?e.jsx(aa,{style:cn.noResult,testId:"dropdown-core-no-results",children:n}):null}shouldVirtualizeList(){return this.props.items.length>Rl}renderList(){let r=0;const n=this.getItemRole();return this.props.items.map((a,t)=>{if(nn.isClassOf(a.component))return a.component;const{component:o,focusable:s,populatedProps:u}=a;s&&(r+=1);const d=r-1,c=this.state.itemRefs[d]?this.state.itemRefs[d].ref:null;return h.cloneElement(o,{...u,key:t,onClick:()=>{this.handleItemClick(d,a)},ref:s?c:null,role:u.role||n})})}parseVirtualizedItems(){let r=0;const n=this.getItemRole();return this.props.items.map((a,t)=>{const{populatedProps:o}=a;!nn.isClassOf(a.component)&&a.focusable&&(r+=1);const s=r-1;return{...a,role:o.role||n,ref:a.focusable&&this.state.itemRefs[s]?this.state.itemRefs[s].ref:null,onClick:()=>{this.handleItemClick(s,a)}}})}renderVirtualizedList(){const r=this.parseVirtualizedItems();return e.jsx(Tl,{data:r,listRef:this.virtualizedListRef})}renderSearchField(){const{searchText:r}=this.props,{labels:n}=this.state;return e.jsx(To,{clearAriaLabel:n.clearSearch,onChange:this.handleSearchTextChanged,placeholder:n.filter,ref:this.searchFieldRef,style:cn.searchInputStyle,value:r||""})}renderDropdownMenu(r,n){const{"aria-invalid":a,"aria-required":t,dropdownStyle:o,isFilterable:s,openerElement:u,role:d,id:c}=this.props,b=u&&window.getComputedStyle(u),k=b?b.getPropertyValue("width"):0;return e.jsxs(x,{onMouseUp:this.handleDropdownMouseUp,style:[cn.dropdown,n&&cn.hidden,o],testId:"dropdown-core-container",children:[s&&this.renderSearchField(),e.jsx(x,{id:c,role:d,style:[cn.listboxOrMenu,{minWidth:k}],"aria-invalid":d==="listbox"?a:void 0,"aria-required":d==="listbox"?t:void 0,children:r}),this.maybeRenderNoResults()]})}renderDropdown(){const{alignment:r,openerElement:n}=this.props,a=this.shouldVirtualizeList()?this.renderVirtualizedList():this.renderList();return e.jsx(Pl,{alignment:r,onPopperElement:t=>{this.popperElement=t},referenceElement:n,children:t=>this.renderDropdownMenu(a,t)})}render(){const{open:r,opener:n,style:a,className:t,disabled:o}=this.props;return e.jsxs(x,{onKeyDown:o?void 0:this.handleKeyDown,onKeyUp:o?void 0:this.handleKeyUp,style:[cn.menuWrapper,a],className:t,children:[n,r&&this.renderDropdown()]})}constructor(r){super(r),this.focusedIndex=-1,this.focusedOriginalIndex=-1,this.itemsClicked=!1,this.searchFieldRef=h.createRef(),this.handleInteract=n=>{const{open:a,onOpenChanged:t}=this.props,o=n.target,s=gn.findDOMNode(this);a&&s&&!s.contains(o)&&this.popperElement&&!this.popperElement.contains(o)&&t(!1)},this.handleKeyDown=n=>{const{enableTypeAhead:a,onOpenChanged:t,open:o,searchText:s}=this.props,u=n.key;if(a&&Nl(u)&&(n.stopPropagation(),this.textSuggestion+=u,this.handleKeyDownDebounced(this.textSuggestion)),!o){if(u===Se.down){n.preventDefault(),t(!0);return}return}switch(u){case Se.tab:if(this.isSearchFieldFocused()&&s)return;this.restoreTabOrder(),t(!1);return;case Se.space:if(this.isSearchFieldFocused())return;n.preventDefault();return;case Se.up:n.preventDefault(),this.focusPreviousItem();return;case Se.down:n.preventDefault(),this.focusNextItem();return}},this.handleKeyUp=n=>{const{onOpenChanged:a,open:t}=this.props;switch(n.key){case Se.space:if(this.isSearchFieldFocused())return;n.preventDefault();return;case Se.escape:t&&(n.stopPropagation(),this.restoreTabOrder(),a(!1));return}},this.handleKeyDownDebounceResult=n=>{const a=this.props.items.filter(t=>t.focusable).findIndex(({component:t})=>{if(nn.isClassOf(t))return!1;if(D.isClassOf(t)){const o=t.props;return Na(o).toLowerCase().startsWith(n.toLowerCase())}return!1});if(a>=0){const t=!this.props.open;t&&this.props.onOpenChanged(!0),this.focusedIndex=a,this.scheduleToFocusCurrentItem(o=>{this.props.selectionType==="single"&&t&&o&&(o.click(),this.props.onOpenChanged(!1))})}this.textSuggestion=""},this.handleClickFocus=n=>{this.itemsClicked=!0,this.focusedIndex=n,this.focusedOriginalIndex=this.state.itemRefs[this.focusedIndex].originalIndex},this.handleDropdownMouseUp=n=>{n.nativeEvent.stopImmediatePropagation?n.nativeEvent.stopImmediatePropagation():n.stopPropagation()},this.handleItemClick=(n,a)=>{this.handleClickFocus(n),a.component.props.onClick&&a.component.props.onClick(),a.populatedProps.onClick&&a.populatedProps.onClick()},this.handleSearchTextChanged=n=>{const{onSearchTextChanged:a}=this.props;a&&a(n)},this.resetFocusedIndex(),this.state={prevItems:this.props.items,itemRefs:[],sameItemsFocusable:!1,labels:{noResults:Le.noResults,someResults:Le.someSelected,...r.labels}},this.virtualizedListRef=h.createRef(),this.handleKeyDownDebounced=Il(this.handleKeyDownDebounceResult,500),this.textSuggestion=""}}Ma.defaultProps={alignment:"left",autoFocus:!0,enableTypeAhead:!0,labels:{clearSearch:Le.clearSearch,filter:Le.filter,noResults:Le.noResults,someResults:Le.someSelected},selectionType:"single"};const cn=R.StyleSheet.create({menuWrapper:{width:"fit-content"},dropdown:{backgroundColor:E.surface.primary,borderRadius:ee.listbox.border.radius,paddingBlock:ee.listbox.layout.padding.block,paddingInline:ee.listbox.layout.padding.inline,border:`solid ${M.width.thin} ${E.core.border.neutral.subtle}`,boxShadow:ee.listbox.shadow.default,maxHeight:"var(--popper-max-height)"},listboxOrMenu:{overflowY:"auto"},hidden:{pointerEvents:"none",visibility:"hidden"},noResult:{color:E.core.foreground.neutral.default,alignSelf:"center",marginBlockStart:T.size_060},searchInputStyle:{margin:T.size_080,marginBlockStart:T.size_040,minHeight:"auto",position:"sticky"},srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}});var Jr=Pr(Ma);const Fl=T.size_040,Ol={root:{border:{width:{primary:{default:M.width.none,hover:M.width.medium,press:M.width.medium},secondary:{default:M.width.thin,hover:M.width.thin,press:M.width.thin},tertiary:{default:M.width.none,hover:M.width.none,press:M.width.none}},offset:{primary:M.width.medium,secondary:0,tertiary:0},radius:{default:M.radius.radius_040,hover:M.radius.radius_040,press:M.radius.radius_040}},sizing:{height:{small:T.size_320,medium:T.size_400,large:T.size_560},underline:{hover:T.size_020,press:T.size_010}},layout:{padding:{inline:{primary:{small:T.size_160,medium:T.size_160,large:T.size_320},secondary:{small:T.size_120,medium:T.size_160,large:T.size_180},tertiary:{small:T.size_0,medium:T.size_0,large:T.size_0}}}},font:{size:{large:"1.8rem"},lineHeight:{small:Ge.lineHeight.xMedium,default:Ge.lineHeight.large,large:"2.6rem"},weight:{default:Ge.weight.bold},decoration:{hover:"underline",press:"underline"},offset:{default:Fl}}},icon:{margin:{inline:{inner:T.size_060,outer:`calc(-1 * ${M.width.medium})`}},padding:T.size_020,sizing:{small:T.size_160,medium:T.size_240,large:T.size_240}}};var Y=Ir(Ol,"--wb-c-button-");function Jt({icon:i,size:r,style:n,testId:a}){const t={width:Y.icon.sizing[r],height:Y.icon.sizing[r]},o={"aria-hidden":!0,color:"currentColor",style:[n,t],testId:a};switch(r){case"small":return e.jsx(Re,{...o,size:"small",icon:i});case"medium":default:return e.jsx(Re,{...o,size:"medium",icon:i})}}const El=on("a"),_l=on("button"),zl=on(Io),Qr=h.forwardRef(function(r,n){const{children:a,disabled:t,href:o,id:s,skipClientNav:u,style:d,testId:c,type:b,...k}=r,C={"data-testid":c,id:s,role:"button",style:[Dl.reset,d],...k},A=ft();return o&&!t?A&&!u&&No(o)?e.jsx(zl,{...C,to:o,ref:n,children:a}):e.jsx(El,{...C,href:o,ref:n,children:a}):e.jsx(_l,{type:b||"button",...C,"aria-disabled":t,ref:n,children:a})}),Dl=R.StyleSheet.create({reset:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",margin:0,padding:0,border:"none",cursor:"pointer",outline:"none",textDecoration:"none",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",":focus":{WebkitTapHighlightColor:"rgba(0,0,0,0)"}}}),Ml=h.forwardRef(function(r,n){const{children:a,skipClientNav:t,actionType:o,disabled:s,focused:u,hovered:d,href:c=void 0,kind:b="primary",labelStyle:k,pressed:C,size:A="medium",style:f,testId:w,type:_=void 0,spinner:P,startIcon:N,endIcon:g,id:p,waiting:v,...S}=r,q=$l(o,b,A),j=P||s,F=[me.shared,N&&me.withStartIcon,g&&me.withEndIcon,q.default,j&&q.disabled,!j&&C&&q.pressed,A==="small"&&me.small,A==="large"&&me.large],B=A==="small"?We:W,Z=e.jsx(B,{style:[me.text,A==="small"&&me.smallText,A==="large"&&me.largeText,k,P&&me.hiddenText],testId:w?`${w}-inner-label`:void 0,children:a}),z={medium:"small",small:"xsmall",large:"medium"},V=A==="small"?"small":"medium",$=e.jsxs(h.Fragment,{children:[N&&e.jsx(x,{style:me.iconWrapper,children:e.jsx(Jt,{size:V,icon:N,style:[me.startIcon,b==="tertiary"&&me.tertiaryStartIcon],testId:w?`${w}-start-icon`:void 0})}),Z,P&&e.jsx(Po,{style:me.spinner,size:z[A],light:b==="primary",testId:`${w||"button"}-spinner`}),g&&e.jsx(x,{testId:w?`${w}-end-icon-wrapper`:void 0,style:[me.endIcon,me.iconWrapper,me.endIconWrapper,b==="tertiary"&&me.endIconWrapperTertiary],children:e.jsx(Jt,{size:V,icon:g,testId:w?`${w}-end-icon`:void 0})})]});return e.jsx(Qr,{...S,disabled:j,href:c,id:p,ref:n,skipClientNav:t,style:[F,f],testId:w,tabIndex:r.tabIndex,type:_,children:$})}),me=R.StyleSheet.create({shared:{height:Y.root.sizing.height.medium,paddingBlock:0},small:{height:Y.root.sizing.height.small},large:{height:Y.root.sizing.height.large},text:{alignItems:"center",fontWeight:Y.root.font.weight.default,whiteSpace:"nowrap",overflow:"hidden",lineHeight:Y.root.font.lineHeight.default,textOverflow:"ellipsis",display:"inline-block",pointerEvents:"none"},smallText:{lineHeight:Y.root.font.lineHeight.small},largeText:{fontSize:Y.root.font.size.large,lineHeight:Y.root.font.lineHeight.large},hiddenText:{visibility:"hidden"},spinner:{position:"absolute"},startIcon:{marginInlineStart:Y.icon.margin.inline.outer,marginInlineEnd:Y.icon.margin.inline.inner},tertiaryStartIcon:{marginInlineStart:0},endIcon:{marginInlineStart:Y.icon.margin.inline.inner},iconWrapper:{padding:Y.icon.padding,minWidth:"auto"},endIconWrapper:{marginInlineStart:Y.icon.margin.inline.inner,marginInlineEnd:Y.icon.margin.inline.outer},endIconWrapperTertiary:{marginInlineEnd:0}}),ua={},$l=(i="progressive",r,n)=>{const a=`${i}-${r}-${n}`;if(ua[a])return ua[a];const t=Y.root.layout.padding.inline[r][n],o=Y.root.border.width[r],s=Y.root.border.offset[r],u=E.action[r][i],d=E.action[r].disabled,c={borderColor:d.border,borderWidth:o.default,borderRadius:Y.root.border.radius.default,background:d.background,color:d.foreground},b={...c,outline:"none",boxShadow:"none",textDecoration:"none",textDecorationThickness:"unset",textUnderlineOffset:"unset"},k={background:u.press.background,borderRadius:Y.root.border.radius.press,color:u.press.foreground,...r==="primary"?{outline:`${o.press} solid ${u.press.border}`,outlineOffset:s}:void 0,...r!=="primary"?{borderColor:u.press.border,boxShadow:`inset 0 0 0 ${o.press} ${u.press.border}`}:void 0,...r==="tertiary"?{textUnderlineOffset:Y.root.font.offset.default,textDecoration:`${Y.root.font.decoration.press} ${Y.root.sizing.underline.press}`}:void 0},C={default:{borderRadius:Y.root.border.radius.default,paddingInline:t,borderStyle:"solid",borderWidth:o.default,borderColor:u.default.border,background:u.default.background,color:u.default.foreground,transition:"border-radius 0.1s ease-in-out","@media (hover: hover)":{":hover":{background:u.hover.background,borderRadius:Y.root.border.radius.hover,color:u.hover.foreground,...r==="primary"?{outline:`${o.hover} solid ${u.hover.border}`,outlineOffset:s}:void 0,...r!=="primary"?{borderColor:u.hover.border,boxShadow:`inset 0 0 0 ${o.hover} ${u.hover.border}`}:void 0,...r==="tertiary"?{textUnderlineOffset:Y.root.font.offset.default,textDecoration:`${Y.root.font.decoration.hover} ${Y.root.sizing.underline.hover}`}:void 0}},":active":k,...ve.focus,...r==="secondary"?{":focus-visible:hover":{...ve.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${o.hover} ${u.hover.border}, ${ve.focus[":focus-visible"].boxShadow}`},":focus-visible:active":{...ve.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${o.press} ${u.press.border}, ${ve.focus[":focus-visible"].boxShadow}`}}:{}},pressed:k,disabled:{cursor:"not-allowed",...c,":hover":b,":active":b,":focus-visible":c}};return ua[a]=R.StyleSheet.create(C),ua[a]},Vl=h.forwardRef(function(r,n){const{href:a=void 0,type:t=void 0,children:o,skipClientNav:s,onClick:u,beforeNav:d=void 0,safeWithNav:c=void 0,tabIndex:b,target:k,rel:C,actionType:A="progressive",kind:f="primary",size:w="medium",disabled:_=!1,spinner:P=!1,...N}=r,g=ft(),p=Lr(a,s,g),v=d?{beforeNav:d}:{target:k};return e.jsx(p,{disabled:P||_,href:a,role:"button",type:t,onClick:u,safeWithNav:c,rel:C,...v,children:(S,q)=>e.jsx(Ml,{...N,...S,...q,disabled:_,spinner:P||S.waiting,actionType:A,kind:f,size:w,skipClientNav:s,href:a,target:k,type:t,tabIndex:b,ref:n,children:o})})}),Wl=h.forwardRef(function(r,n){const{children:a,disabled:t=!1,kind:o="primary",focused:s,pressed:u,styles:d,type:c=void 0,startIcon:b,endIcon:k,hovered:C,waiting:A,...f}=r,w=Gl("progressive",t,o),_=[w.button,t&&w.disabled,!t&&u&&w.pressed,!t&&!u&&s&&w.focused,d==null?void 0:d.root],P=[w.chonky,t&&w.chonkyDisabled,!t&&u&&w.chonkyPressed,d==null?void 0:d.box];return e.jsx(Qr,{...f,disabled:t,ref:n,style:_,type:c,children:e.jsx(e.Fragment,{children:e.jsxs(x,{style:P,className:"chonky",children:[b&&e.jsx(Re,{size:"medium",color:"currentColor",icon:b,style:[Ja.icon,d==null?void 0:d.startIcon],"aria-hidden":"true"}),e.jsx(aa,{tag:"span",size:"medium",weight:"semi",style:[Ja.label,d==null?void 0:d.label],children:a}),k&&e.jsx(Re,{size:"medium",color:"currentColor",icon:k,style:[Ja.icon,d==null?void 0:d.endIcon],"aria-hidden":"true"})]})})})});h.forwardRef(function(r,n){const{href:a=void 0,type:t=void 0,children:o,skipClientNav:s,onClick:u,beforeNav:d=void 0,safeWithNav:c=void 0,tabIndex:b,target:k,rel:C,kind:A="primary",disabled:f=!1,...w}=r,_=ft(),P=Lr(a,s,_),N=d?{beforeNav:d}:{target:k};return e.jsx(P,{disabled:f,href:a,role:a?"link":"button",type:t,onClick:u,safeWithNav:c,rel:C,...N,children:(g,p)=>e.jsx(Wl,{...w,...g,...p,disabled:f,kind:A,skipClientNav:s,href:a,target:k,type:t,tabIndex:b,ref:n,children:o})})});const oe={root:{border:{width:{primary:{rest:M.width.thin,hover:M.width.thin,press:M.width.thin},secondary:{rest:M.width.thin,hover:M.width.thin,press:M.width.thin},tertiary:{rest:M.width.thin,hover:M.width.thin,press:M.width.thin}},radius:M.radius.radius_120},layout:{padding:{block:T.size_140,inline:T.size_480}},shadow:{y:{rest:"6px",hover:"8px",press:T.size_0}}},label:{color:{progressive:E.core.foreground.instructive.default,neutral:E.core.foreground.neutral.default,disabled:E.core.foreground.disabled.default},font:{lineHeight:T.size_140},layout:{padding:{blockStart:T.size_040,blockEnd:T.size_060},width:T.size_640}},icon:{sizing:{height:T.size_200,width:T.size_200}}},Ja={icon:{alignSelf:"center",width:oe.icon.sizing.width,height:oe.icon.sizing.height},label:{lineHeight:oe.label.font.lineHeight,paddingBlockStart:oe.label.layout.padding.blockStart,paddingBlockEnd:oe.label.layout.padding.blockEnd}},da={},Gl=(i="progressive",r,n)=>{const a=`${i}-d_${r}-${n}`;if(da[a])return da[a];const t=oe.root.border.width[n],o=E.chonky[i],s=E.chonky.disabled,u={outline:"none",transform:"none"},d={background:s.background[n],borderWidth:t.rest,borderColor:s.border[n],color:s.foreground[n],boxShadow:`0 ${oe.root.shadow.y.rest} 0 0 ${s.shadow[n]}`,transform:"none"},c={background:o.background[n].press,border:`${t.press} solid ${o.border[n].press}`,boxShadow:`0 ${oe.root.shadow.y.press} 0 0 ${o.shadow[n].press}`,color:o.foreground[n].press,transform:`translateY(${oe.root.shadow.y.rest})`},b={button:{background:"transparent",borderRadius:oe.root.border.radius,color:oe.label.color[i],height:"auto",flexDirection:"column",gap:T.size_020,alignSelf:"flex-start",justifySelf:"center",":is(:hover) .chonky":{background:o.background[n].hover,border:`${t.hover} solid ${o.border[n].hover}`,boxShadow:`0 ${oe.root.shadow.y.hover} 0 0 ${o.shadow[n].hover}`,color:o.foreground[n].hover,transform:`translateY(calc((${oe.root.shadow.y.hover} - ${oe.root.shadow.y.rest}) * -1))`},":is(:active) .chonky":c,...ve.focus},focused:ve.focus[":focus-visible"],disabled:{cursor:"not-allowed",color:oe.label.color.disabled,...u,":hover":u,":active":u,":focus-visible":{transform:"none"},":is(:hover) .chonky":u,":is(:hover) .chonky":d,":is(:active) .chonky":d},pressed:{".chonky":c},chonky:{flexDirection:"row",gap:T.size_080,borderRadius:oe.root.border.radius,marginBlockEnd:oe.root.shadow.y.rest,maxWidth:"100%",paddingBlock:oe.root.layout.padding.block,paddingInline:oe.root.layout.padding.inline,background:o.background[n].rest,border:`${t.rest} solid ${o.border[n].rest}`,color:o.foreground[n].rest,boxShadow:`0 ${oe.root.shadow.y.rest} 0 0 ${o.shadow[n].rest}`,transition:"all 0.12s ease-out","@media not (hover: hover)":{transition:"none"}},chonkyPressed:c,chonkyDisabled:d};return da[a]=R.StyleSheet.create(b),da[a]};class Bl extends h.Component{render(){const{children:r,disabled:n,waiting:a,testId:t,opened:o,"aria-label":s,...u}=this.props;return e.jsx(Vl,{"aria-expanded":o?"true":"false","aria-haspopup":"menu",kind:"tertiary","aria-label":s,disabled:n,...u,testId:t,endIcon:ta,children:r})}}class Zr extends h.Component{static getDerivedStateFromProps(r,n){return{opened:typeof r.opened=="boolean"?r.opened:n.opened}}getMenuItems(){const{children:r,selectedValues:n}=this.props,a=h.Children.toArray(r).filter(Boolean),t=a.some(o=>D.isClassOf(o));return a.map(o=>{const{value:s,disabled:u}=o.props,d={component:o,focusable:ea.isClassOf(o)||D.isClassOf(o)?!u:!1,populatedProps:{}};if(ea.isClassOf(o))return{...d,populatedProps:{indent:t,onClick:this.handleItemSelected}};if(D.isClassOf(o)){const c=n?n.includes(s):!1;return{...d,populatedProps:{onToggle:this.handleOptionSelected,selected:c,variant:"check",role:"menuitemcheckbox","aria-checked":c,"aria-selected":void 0}}}else return d})}renderOpener(r,n){const{disabled:a,menuText:t,opener:o,testId:s,id:u}=this.props;return e.jsx(Qn,{id:u,children:d=>e.jsx(St,{id:d,"aria-controls":n,"aria-haspopup":"menu",onClick:this.handleClick,disabled:r===0||a,text:t,ref:this.handleOpenerRef,testId:o?void 0:s,opened:this.state.opened,role:"button",children:o||(c=>{const{text:b,opened:k,...C}=c;return e.jsx(Bl,{...C,disabled:a,opened:!!k,testId:s,children:t})})})})}render(){const{alignment:r,dropdownStyle:n,style:a,className:t,dropdownId:o}=this.props,s=this.getMenuItems();return e.jsx(Qn,{id:o,children:u=>e.jsx(Jr,{id:u,role:"menu",style:a,className:t,opener:this.renderOpener(s.length,u),alignment:r,open:this.state.opened,items:s,openerElement:this.openerElement,onOpenChanged:this.handleOpenChanged,dropdownStyle:[Hl.menuTopSpace,n]})})}constructor(...r){super(...r),this.state={opened:!1},this.handleItemSelected=()=>{this.handleOpenChanged(!1),this.openerElement&&this.openerElement.focus()},this.handleOpenChanged=n=>{this.setState({opened:n}),this.props.onToggle&&this.props.onToggle(n)},this.handleOptionSelected=n=>{const{onChange:a,selectedValues:t}=this.props;if(!(!a||!t)){if(t.includes(n)){const o=t.indexOf(n),s=[...t.slice(0,o),...t.slice(o+1)];a(s)}else a([...t,n]);this.handleItemSelected()}},this.handleOpenerRef=n=>{this.openerElement=gn.findDOMNode(n)},this.handleClick=n=>{this.handleOpenChanged(!this.state.opened)}}}Zr.defaultProps={alignment:"left",disabled:!1};const Hl=R.StyleSheet.create({caret:{marginInlineStart:T.size_040},opener:{whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},menuTopSpace:{top:`calc(-1 * ${T.size_040})`}}),Ul=on("button");class ei extends h.Component{render(){const{children:r,disabled:n,error:a,id:t,isPlaceholder:o,open:s,testId:u,"aria-label":d,"aria-required":c,"aria-controls":b,onBlur:k,onOpenChanged:C,...A}=this.props,f=n?E.core.foreground.disabled.default:ee.opener.color.icon,w=[Me.shared,Me.default,n&&Me.disabled,a&&Me.error,o&&Me.placeholder,!n&&this.state.pressed&&Me.press];return e.jsxs(Ul,{...A,"aria-disabled":n,"aria-expanded":s?"true":"false","aria-invalid":a,"aria-label":d??void 0,"aria-required":c,"aria-haspopup":"listbox","aria-controls":b,"data-testid":u,id:t,role:"combobox",type:"button",style:w,onClick:n?void 0:this.handleClick,onKeyDown:n?void 0:this.handleKeyDown,onKeyUp:n?void 0:this.handleKeyUp,onBlur:k,children:[e.jsx(aa,{tag:"span",style:Me.text,children:r||e.jsx("span",{"aria-hidden":"true",children:" "})}),e.jsx(Re,{icon:ta,color:f,size:"small",style:Me.caret,"aria-hidden":"true"})]})}constructor(r){super(r),this.handleClick=n=>{const{open:a}=this.props;this.props.onOpenChanged(!a)},this.handleKeyDown=n=>{const a=n.key;(a===Se.enter||a===Se.space)&&(this.setState({pressed:!0}),n.preventDefault())},this.handleKeyUp=n=>{const a=n.key;(a===Se.enter||a===Se.space)&&(this.setState({pressed:!1}),this.handleClick(n))},this.state={pressed:!1}}}ei.defaultProps={disabled:!1,error:!1,isPlaceholder:!1};const Qa=`0 0 0 ${M.width.thin} ${E.input.default.border}`,Me=R.StyleSheet.create({shared:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"space-between",color:E.core.foreground.neutral.strong,height:yn,paddingInlineStart:ee.opener.layout.padding.inlineStart,paddingInlineEnd:ee.opener.layout.padding.inlineEnd,borderWidth:0,borderRadius:ee.opener.border.radius.rest,borderStyle:"solid",outline:"none",textDecoration:"none",boxSizing:"border-box",whiteSpace:"nowrap",touchAction:"manipulation"},text:{marginInlineEnd:T.size_080,whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},caret:{minWidth:T.size_160},default:{background:E.input.default.background,border:`${M.width.thin} solid ${E.input.default.border}`,color:E.input.default.foreground,cursor:"pointer",...ve.focus,":active":{boxShadow:Qa}},error:{background:E.input.error.background,border:`${ee.opener.border.width.error} solid ${E.input.error.border}`,color:E.input.error.foreground},disabled:{background:E.input.disabled.background,border:`${M.width.thin} solid ${E.input.disabled.border}`,color:E.input.disabled.foreground,cursor:"not-allowed",":active":{boxShadow:"none"}},press:{boxShadow:Qa,":focus-visible":{boxShadow:`${Qa}, ${ve.focus[":focus-visible"].boxShadow}`}},placeholder:{color:E.input.default.placeholder}}),Kl="This field is required.";function Tn(i){return i?i.length>0:!1}function Xl({value:i,disabled:r=!1,validate:n,onValidate:a,required:t,open:o}){const[s,u]=h.useState(()=>n&&Tn(i)&&!r&&n(i)||null),d=h.useCallback(A=>{if(!r){if(n){const f=A!==void 0&&n(A)||null;if(u(f),a&&a(f),f)return}if(t){const f=typeof t=="string"?t:Kl,w=Tn(A)?null:f;u(w),a&&a(w)}}},[r,n,u,a,t]);Co(()=>{Tn(i)&&d(i)});function c(){!o&&t&&!Tn(i)&&d(i)}return{errorMessage:s,onOpenerBlurValidation:c,onDropdownClosedValidation:()=>{t&&!Tn(i)&&d(i)},onSelectionValidation:A=>{d(A)},onSelectedValuesChangeValidation:()=>{u(null),a&&a(null)}}}const he=i=>{const r=h.useRef(0),{children:n,error:a=!1,id:t,opener:o,placeholder:s,selectedValue:u,testId:d,alignment:c="left",autoFocus:b=!0,dropdownStyle:k,enableTypeAhead:C=!0,isFilterable:A,labels:f={clearSearch:Le.clearSearch,filter:Le.filter,noResults:Le.noResults,someResults:Le.someSelected},onChange:w,onToggle:_,opened:P,style:N,className:g,"aria-label":p,"aria-invalid":v,"aria-required":S,disabled:q=!1,dropdownId:j,validate:F,onValidate:B,required:Z,showOpenerLabelAsText:z=!0,...V}=i,[$,ke]=h.useState(!1),[Ye,jt]=h.useState(""),[Ga,Fi]=h.useState(),{errorMessage:Oi,onOpenerBlurValidation:Pt,onDropdownClosedValidation:Ei,onSelectionValidation:_i}=Xl({value:u,disabled:q,validate:F,onValidate:B,required:Z,open:$}),Nt=a||!!Oi;h.useEffect(()=>{q?ke(!1):typeof P=="boolean"&&ke(P)},[q,P]);const Ba=X=>{ke(X),jt(""),_&&_(X),X||Ei()},zi=X=>{X!==u&&w(X),$&&Ga&&Ga.focus(),ke(!1),_&&_(!1),_i(X)},Di=X=>{let xe=0;return r.current=0,X.map(je=>{const{disabled:ln,value:un}=je.props,Ua=u===un;return Ua&&(r.current=xe),ln||(xe+=1),{component:je,focusable:!ln,populatedProps:{onToggle:zi,selected:Ua,variant:"check"}}})},Mi=X=>{const xe=Ye.toLowerCase();return X.filter(({props:je})=>!Ye||Na(je).toLowerCase().indexOf(xe)>-1)},$i=X=>Di(A?Mi(X):X),Vi=X=>{jt(X)},It=X=>{const xe=gn.findDOMNode(X);Fi(xe)},Wi=X=>{Ba(!$)},Lt=X=>{qo({message:X})};h.useEffect(()=>{const xe=h.Children.toArray(n).find(je=>je.props.value===u);if(xe){const je=Na(xe.props);je&&Lt(je)}},[u,n]);const Gi=(X,xe)=>{const ln=h.Children.toArray(n).find(oa=>oa.props.value===u);let un;return ln?un=Ll(z,ln.props):un=s,e.jsx(Qn,{id:t,children:oa=>o?e.jsx(St,{id:oa,"aria-label":p,"aria-controls":xe,"aria-haspopup":"listbox",onClick:Wi,disabled:X,ref:It,role:"combobox",text:un,opened:$,error:Nt,onBlur:Pt,children:o}):e.jsx(ei,{...V,"aria-label":p,"aria-controls":xe,disabled:X,id:oa,error:Nt,isPlaceholder:!ln,onOpenChanged:Ba,open:$,ref:It,testId:d,onBlur:Pt,children:un})})},Rt=h.Children.toArray(n).filter(Boolean),Bi=Rt.filter(X=>!X.props.disabled).length,Ha=$i(Rt),Ft=Bi===0||q,{someResults:Ot}=f;return h.useEffect(()=>{$&&Lt(Ot(Ha.length))},[Ha.length,Ot,$]),e.jsx(Qn,{id:j,children:X=>e.jsx(Jr,{id:X,role:"listbox",selectionType:"single",alignment:c,autoFocus:b,enableTypeAhead:C,dropdownStyle:[A&&wl,bl,k],initialFocusedIndex:r.current,items:Ha,onOpenChanged:Ba,open:$,opener:Gi(Ft,X),openerElement:Ga,style:N,className:g,isFilterable:A,onSearchTextChanged:A?Vi:void 0,searchText:A?Ye:"",labels:f,"aria-invalid":v,"aria-required":S,disabled:Ft})})};on("span");R.StyleSheet.create({srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}});h.memo(function({disabled:r,focusedMultiSelectIndex:n,id:a,labels:t,onRemove:o,removeSelectedLabel:s,selected:u,testId:d}){return e.jsx(x,{role:"group",style:Za.pillsWrapper,id:a,children:u.map((c,b)=>{const k=t[b],C=b===n,A=a+b;return e.jsx(fe,{id:A,testId:d?`${d}-pill-${b}`:void 0,size:"small",style:[Za.pill,C&&Za.pillFocused],kind:C?"info":"neutral","aria-label":s(k),tabIndex:-1,onClick:()=>o(c),children:e.jsxs(e.Fragment,{children:[k,!r&&e.jsx(Re,{icon:Rr,size:"small"})]})},A)})})});const Za=R.StyleSheet.create({pillsWrapper:{flexDirection:"row",flexWrap:"wrap"},pill:{fontSize:Ge.body.size.small,justifyContent:"space-between",alignItems:"center",marginBlockStart:T.size_040,marginInlineEnd:T.size_040,paddingInlineEnd:T.size_040},pillFocused:ve.focus[":focus-visible"]});R.StyleSheet.create({listbox:{backgroundColor:E.surface.primary,outline:"none",paddingBlock:ee.listbox.layout.padding.block,paddingInline:ee.listbox.layout.padding.inline},disabled:{color:E.action.secondary.disabled.foreground}});R.StyleSheet.create({wrapper:{flexDirection:"row",alignItems:"center",width:"100%",maxWidth:"100%",flexWrap:"wrap",background:E.surface.primary,borderRadius:ee.opener.border.radius.rest,border:`${M.width.thin} solid ${E.core.border.neutral.subtle}`,paddingInline:ee.opener.layout.padding.inline,overflow:"hidden"},focused:ve.focus[":focus-visible"],disabled:{background:E.input.disabled.background,border:`${M.width.thin} solid ${E.input.disabled.border}`,color:E.input.disabled.foreground},error:{background:E.input.error.background,border:`${ee.opener.border.width.error} solid ${E.input.error.border}`,color:E.input.error.foreground},combobox:{appearance:"none",background:"none",border:"none",outline:"none",padding:0,minWidth:T.size_040,width:"auto",display:"inline-grid",gridArea:"1 / 2",":focus-visible":{outline:"none",border:"none"}},listbox:{backgroundColor:E.surface.primary,borderRadius:ee.listbox.border.radius,border:`solid ${M.width.thin} ${E.core.border.neutral.subtle}`,boxShadow:ee.listbox.shadow.default,maxHeight:"var(--popper-max-height)",overflowY:"auto"},hidden:{pointerEvents:"none",visibility:"hidden"},button:{position:"absolute",right:T.size_040,top:T.size_040,margin:0},buttonOpen:{transform:"rotate(180deg)"},clearButton:{right:T.size_400},iconWrapper:{padding:T.size_040,minWidth:"auto"}});const ct="unlimited",ni=i=>{const r=parseInt(i,10);return isNaN(r)||r===0?ct:r},ai=({numPoints:i=1,onChange:r})=>e.jsx(he,{selectedValue:`${i}`,onChange:n=>{r(ni(n))},placeholder:"",style:Yl.singleSelectShort,children:[...[...Array(7).keys()].map(n=>e.jsx(D,{value:`${n}`,label:`${n} point${n>1?"s":""}`},n)),e.jsx(D,{value:ct,label:"unlimited"},"unlimited")]}),Yl=R.StyleSheet.create({singleSelectShort:{height:26}});ai.__docgenInfo={description:"",methods:[],displayName:"GraphPointsCountSelector",props:{numPoints:{required:!1,tsType:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(points: PointValue) => void",signature:{arguments:[{type:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},name:"points"}],return:{name:"void"}}},description:""}}};const ti=i=>e.jsxs(he,{selectedValue:i.graphType,onChange:i.onChange,placeholder:"Select an answer type",style:Jl.singleSelectShort,children:[e.jsx(D,{value:"none",label:"None"}),e.jsx(D,{value:"linear",label:"Linear function"}),e.jsx(D,{value:"quadratic",label:"Quadratic function"}),e.jsx(D,{value:"sinusoid",label:"Sinusoid function"}),e.jsx(D,{value:"circle",label:"Circle"}),e.jsx(D,{value:"point",label:"Point(s)"}),e.jsx(D,{value:"linear-system",label:"Linear System"}),e.jsx(D,{value:"polygon",label:"Polygon"}),e.jsx(D,{value:"segment",label:"Line Segment(s)"}),e.jsx(D,{value:"ray",label:"Ray"}),e.jsx(D,{value:"angle",label:"Angle"})]}),Jl=R.StyleSheet.create({singleSelectShort:{height:26}});ti.__docgenInfo={description:"",methods:[],displayName:"GraphTypeSelector",props:{graphType:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newGraphType: string) => void",signature:{arguments:[{type:{name:"string"},name:"newGraphType"}],return:{name:"void"}}},description:""}}};function _e({title:i,isOpen:r,isCollapsible:n,onToggle:a}){return e.jsx(Fr,{style:[et.container,!n&&et.notClickable],disabled:!n,onClick:()=>n&&(a==null?void 0:a(!r)),children:()=>e.jsxs(x,{style:et.heading,children:[e.jsx(W,{style:{fontSize:14,fontWeight:600},children:i}),n&&e.jsx(cs,{isExpanded:r})]})})}const et=R.StyleSheet.create({container:{marginTop:m.small_12,marginInline:-10,backgroundColor:O.offBlack8,padding:m.xSmall_8,width:"calc(100% + 20px)"},heading:{flexDirection:"row",justifyContent:"space-between",userSelect:"none"},notClickable:{color:"inherit",cursor:"default"}});_e.__docgenInfo={description:"",methods:[],displayName:"Heading",props:{title:{required:!0,tsType:{name:"string"},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},isCollapsible:{required:!0,tsType:{name:"boolean"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:""}}};function ri(i){return e.jsxs(e.Fragment,{children:[e.jsx(_e,{title:"Correct Answer",isOpen:!0,isCollapsible:!1}),e.jsxs(x,{id:i.id,children:[e.jsxs(x,{children:[e.jsx(vt,{style:{paddingTop:m.xxSmall_6,paddingBottom:m.xxSmall_6,color:O.offBlack64},children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."}),e.jsx(_a,{style:{fontSize:12,backgroundColor:"#eee",paddingInline:m.xxSmall_6,borderColor:"#ccc",borderStyle:"solid",borderWidth:1},children:i.equationString})]}),i.children]})]})}ri.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCorrectAnswer",props:{id:{required:!0,tsType:{name:"string"},description:""},equationString:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function ii(i){const{ariaLabelValue:r,ariaDescriptionValue:n,onChange:a}=i,[t,o]=h.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(_e,{title:"Description",isCollapsible:!0,isOpen:t,onToggle:o}),t&&e.jsxs(x,{children:[e.jsx(vt,{style:nt.caption,children:"Use these fields to describe the graph as a whole. These are used by screen readers to describe content to users who may be visually impaired."}),e.jsxs(W,{tag:"label",children:["Title",e.jsx(Fe,{value:r,onChange:s=>a({fullGraphAriaLabel:s||void 0}),style:nt.spaceAbove})]}),e.jsx(L,{size:m.small_12}),e.jsxs(W,{tag:"label",children:["Description",e.jsx(kt,{rows:8,resizeType:"vertical",value:n,onChange:s=>a({fullGraphAriaDescription:s||void 0}),style:nt.spaceAbove})]})]})]})}const nt=R.StyleSheet.create({caption:{color:O.offBlack64,paddingTop:m.xxSmall_6,paddingBottom:m.xxSmall_6},spaceAbove:{marginTop:m.xxxSmall_4}});ii.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphDescription",props:{ariaLabelValue:{required:!0,tsType:{name:"string"},description:""},ariaDescriptionValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(graphProps: Partial<EditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation?: AxisLabelLocation;
    /**
     * The range of the graph in the x and y directions.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the \`aria-description\` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's \`aria-describedby\` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["userInput"];
    onChange: (props: Partial<Props>) => void;
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
>`,required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!1},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}}],required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<EditorProps>"},name:"graphProps"}],return:{name:"void"}}},description:""}}};const le=i=>{const{children:r,label:n,labelSide:a="left",style:t}=i;return e.jsx("label",{className:R.css(ma.label),children:e.jsxs(x,{style:[ma.row,t],children:[a==="start"||e.jsx(We,{style:ma.spaceEnd,children:n}),r,a==="end"&&e.jsx(We,{style:ma.spaceStart,children:n})]})})},ma=R.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:m.xSmall_8},spaceEnd:{marginInlineEnd:m.xSmall_8}});le.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:Qt,InfoTip:Zt,RangeInput:Sn}=G,Ql={url:null,width:0,height:0};function Zl(i,r){return Math.floor((i[1]-i[0])/r)}const Yn=class Yn extends h.Component{constructor(n){super(n);l(this,"_isMounted",!1);l(this,"bgUrlRef",h.createRef());l(this,"labelXRef",h.createRef());l(this,"labelYRef",h.createRef());l(this,"change",(...n)=>K.apply(this,n));l(this,"changeBackgroundUrl",n=>{var o;if(n.type==="keypress"&&n.key!=="Enter")return;const a=(s,u,d)=>{const c={...this.props.backgroundImage};c.url=s,c.width=u,c.height=d,this.setState({backgroundImage:c},this.changeGraph)},t=(o=this.bgUrlRef.current)==null?void 0:o.value;t?ue.getImageSize(t,(s,u)=>{this._isMounted&&a(t,s,u)}):a(null,0,0)});l(this,"renderLabelChoices",n=>n.map(a=>e.jsx("option",{value:a[1],children:a[0]},a[1])));l(this,"validRange",n=>y.every(n,function(t){return y.isFinite(t)})?n[0]>=n[1]?"Range must have a higher number on the right":!0:"Range must be a valid number");l(this,"validateStepValue",n=>{const{step:a,range:t,name:o,minTicks:s,maxTicks:u}=n,d=Zl(t,a);return d<s?o+" is too large, there must be at least "+s+" ticks.":d>u?o+" is too small, there can be at most "+u+" ticks.":!0});l(this,"validSnapStep",(n,a)=>this.validateStepValue({step:n,range:a,name:"Snap step",minTicks:5,maxTicks:60}));l(this,"validGridStep",(n,a)=>this.validateStepValue({step:n,range:a,name:"Grid step",minTicks:3,maxTicks:60}));l(this,"validStep",(n,a)=>this.validateStepValue({step:n,range:a,name:"Step",minTicks:3,maxTicks:20}));l(this,"validBackgroundImageSize",n=>n.url?n.width<=450&&n.height<=450?!0:"Image must be smaller than 450px x 450px.":!0);l(this,"validateGraphSettings",(n,a,t,o,s)=>{const u=this;let d;if(!y.every(n,function(f){return d=u.validRange(f),d===!0})||!y.every(a,function(f,w){return d=u.validStep(f,n[w]),d===!0})||!y.every(t,function(f,w){return d=u.validGridStep(f,n[w]),d===!0})||!y.every(o,function(f,w){return d=u.validSnapStep(f,n[w]),d===!0}))return d;const A=this.validBackgroundImageSize(s);return A!==!0?(d=A,d):!0});l(this,"changeLabel",(n,a)=>{const t=a.target.value,o=this.state.labelsTextbox.slice();o[n]=t,this.setState({labelsTextbox:o},this.changeGraph)});l(this,"changeRange",(n,a)=>{const t=this.state.rangeTextbox.slice();t[n]=a,this.setState({rangeTextbox:t},this.changeGraph)});l(this,"changeStepsBasedOnRange",()=>{const n=this.state.rangeTextbox.slice(),a=this.state.stepTextbox.slice(),t=this.state.gridStepTextbox.slice(),o=this.state.snapStepTextbox.slice(),s=ue.scaleFromExtent(n[0],this.props.box[0]);if(this.validRange(n[0])===!0){a[0]=ue.tickStepFromExtent(n[0],this.props.box[0]);const d=ue.gridStepFromTickStep(a[0],s);d&&(t[0]=d),o[0]=t[0]/2}const u=ue.scaleFromExtent(n[1],this.props.box[1]);if(this.validRange(n[1])===!0){a[1]=ue.tickStepFromExtent(n[1],this.props.box[1]);const d=ue.gridStepFromTickStep(a[1],u);d&&(t[1]=d),o[1]=t[1]/2}this.setState({stepTextbox:a,gridStepTextbox:t,snapStepTextbox:o,rangeTextbox:n},this.changeGraph)});l(this,"changeStep",n=>{this.setState({stepTextbox:n},this.changeGraph)});l(this,"changeSnapStep",n=>{this.setState({snapStepTextbox:n},this.changeGraph)});l(this,"changeGridStep",n=>{this.setState({gridStepTextbox:n,snapStepTextbox:y.map(n,function(a){return a/2})},this.changeGraph)});l(this,"changeGraph",()=>{const n=this.state.labelsTextbox,a=this.state.labelLocation,t=y.map(this.state.rangeTextbox,function(b){return y.map(b,Number)}),o=y.map(this.state.stepTextbox,Number),s=this.state.gridStepTextbox,u=this.state.snapStepTextbox,d=this.state.backgroundImage,c=this.validateGraphSettings(t,o,s,u,d);c===!0?this.change({valid:!0,labels:n,labelLocation:a,range:t,step:o,gridStep:s,snapStep:u,backgroundImage:d}):this.change({valid:c})});this.state={isExpanded:!0,...Yn.stateFromProps(n)}}static stateFromProps(n){return{labelsTextbox:n.labels,labelLocation:n.labelLocation,gridStepTextbox:n.gridStep,snapStepTextbox:n.snapStep,stepTextbox:n.step,rangeTextbox:n.range,backgroundImage:{...n.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=y.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(n){(!y.isEqual(this.props.labels,n.labels)||!y.isEqual(this.props.labelLocation,n.labelLocation)||!y.isEqual(this.props.gridStep,n.gridStep)||!y.isEqual(this.props.snapStep,n.snapStep)||!y.isEqual(this.props.step,n.step)||!y.isEqual(this.props.range,n.range)||!y.isEqual(this.props.backgroundImage,n.backgroundImage))&&this.setState(Yn.stateFromProps(n))}componentWillUnmount(){this._isMounted=!1}render(){return e.jsxs(e.Fragment,{children:[e.jsx(_e,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&e.jsxs(x,{children:[e.jsxs("div",{className:"graph-settings",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(le,{label:"Label Location",children:e.jsx(Qt,{value:this.props.labelLocation,allowEmpty:!1,buttons:[{value:"onAxis",content:"On Axis"},{value:"alongEdge",content:"Along Graph Edge"}],onChange:this.change("labelLocation")})})}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(le,{label:"x Label",children:e.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:n=>this.changeLabel(0,n),value:this.state.labelsTextbox[0]||""})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(le,{label:"y Label",children:e.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:n=>this.changeLabel(1,n),value:this.state.labelsTextbox[1]||""})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(le,{label:"x Range",children:e.jsx(Sn,{value:this.state.rangeTextbox[0],onChange:n=>this.changeRange(0,n),allowPiTruncation:!0})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(le,{label:"y Range",children:e.jsx(Sn,{value:this.state.rangeTextbox[1],onChange:n=>this.changeRange(1,n),allowPiTruncation:!0})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(le,{label:"Tick Step",children:e.jsx(Sn,{value:this.state.stepTextbox,onChange:this.changeStep,allowPiTruncation:!0})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(le,{label:"Grid Step",children:e.jsx(Sn,{value:this.state.gridStepTextbox,onChange:this.changeGridStep,allowPiTruncation:!0})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(le,{label:"Snap Step",children:e.jsx(Sn,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep,allowPiTruncation:!0})})}),e.jsxs("div",{className:"perseus-widget-right-col",children:[e.jsx(ne,{size:"small",kind:"tertiary",onClick:()=>{this.changeStepsBasedOnRange()},children:"Auto-adjust steps"}),e.jsxs(Zt,{children:[e.jsx("p",{children:'Use the "Auto-adjust" steps button to update the tick step, grid step, and snap step to values that are valid for the current range.'}),e.jsx("br",{}),e.jsx("p",{children:"This is useful when the range is changed, and the graph errors due to the step sizes being too large or too small."})]})]})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(le,{label:"Markings:",children:e.jsx(Qt,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"axes",content:"Axes"},{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ae,{label:"Show tooltips",checked:this.props.showTooltips,onChange:n=>{this.change({showTooltips:n})}})})]}),e.jsxs(le,{label:"Background image URL:",style:An.resetSpaceTop,children:[e.jsx("input",{type:"text",className:R.css(An.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:n=>{const a={...this.props.backgroundImage};a.url=n.target.value,this.setState({backgroundImage:a})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),e.jsx(Zt,{children:e.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),e.jsxs(x,{style:An.protractorSection,children:[e.jsx(x,{style:An.checkboxRow,children:e.jsx(ae,{label:"Show protractor",checked:this.props.showProtractor,onChange:n=>{this.change({showProtractor:n})},style:An.resetSpaceTop})}),this.props.showProtractor&&e.jsx(Lo,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"})]})]})]})}};l(Yn,"defaultProps",{box:[Jn.defaultBoxSizeSmall,Jn.defaultBoxSizeSmall],labels:["$x$","$y$"],labelLocation:"onAxis",range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:Ql,markings:"graph",showProtractor:!1,showTooltips:!1});let Ia=Yn;const An=R.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${O.offBlack32}`,borderRadius:m.xxxSmall_4,padding:m.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:m.xSmall_8},protractorSection:{marginTop:m.xSmall_8,borderTop:`1px solid ${O.offBlack16}`,paddingTop:m.xSmall_8,paddingBottom:m.xSmall_8,borderBottom:`1px solid ${O.offBlack16}`}});Ia.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
    /**
     * The size of the graph area in pixels.
     */
    box: [x: number, y: number];
    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation: AxisLabelLocation;
    /**
     * The range of the graph.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;

    /**
     * The type of markings to display on the graph.
     * - axes: shows the axes without the gride lines
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     */
    showTooltips: boolean;

    onChange: (arg1: Partial<Props>) => void;
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!0},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]},alias:"Props"}}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStepsBasedOnRange",docblock:null,modifiers:[],params:[],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphSettings",props:{box:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph area in pixels.",defaultValue:{value:`[
    interactiveSizes.defaultBoxSizeSmall,
    interactiveSizes.defaultBoxSizeSmall,
]`,computed:!1}},labels:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes.",defaultValue:{value:'["$x$", "$y$"]',computed:!1}},labelLocation:{required:!1,tsType:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}]},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`,defaultValue:{value:'"onAxis"',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph.",defaultValue:{value:`[
    [-10, 10],
    [-10, 10],
]`,computed:!1}},step:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`,defaultValue:{value:"[1, 1]",computed:!1}},gridStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},snapStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},valid:{required:!1,tsType:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
    url: null,
    width: 0,
    height: 0,
}`,computed:!1}},markings:{required:!1,tsType:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`,defaultValue:{value:'"graph"',computed:!1}},showProtractor:{required:!1,tsType:{name:"boolean"},description:"Whether to show the protractor on the graph.",defaultValue:{value:"false",computed:!1}},showTooltips:{required:!1,tsType:{name:"boolean"},description:"Whether to show tooltips on the graph.",defaultValue:{value:"false",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    /**
     * The size of the graph area in pixels.
     */
    box: [x: number, y: number];
    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation: AxisLabelLocation;
    /**
     * The range of the graph.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;

    /**
     * The type of markings to display on the graph.
     * - axes: shows the axes without the gride lines
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     */
    showTooltips: boolean;

    onChange: (arg1: Partial<Props>) => void;
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!0},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};const{InfoTip:eu}=G,nu=on("ul");function au(i){const r=[],n=document.getElementById(i);return n&&n.querySelectorAll("*").forEach(a=>{var u;const t=[],o=a.getAttribute("aria-label"),s=a.getAttribute("aria-describedby");if(o&&t.unshift({name:"label",value:o}),s){const d=s.split(/ +/);for(const c of d){const b=(u=document.getElementById(c))==null?void 0:u.textContent;b&&t.push({name:"description",value:b})}}t.length>0&&r.push({roleOrTag:a.getAttribute("role")||a.tagName.toLowerCase(),className:a.classList[a.classList.length-1]||"",attributes:t})}),r}function tu(i){const{elementArias:r,showTags:n}=i;return e.jsx("ol",{style:{listStyle:"revert",marginLeft:8},children:r.map((a,t)=>e.jsxs("li",{children:[n&&e.jsx(fe,{size:"small",kind:"success",style:Mn.smallSpaceRight,children:a.roleOrTag}),a.className,e.jsx(nu,{style:Mn.indentListLeft,children:a.attributes.map((o,s)=>e.jsxs("li",{children:[e.jsx(fe,{size:"small",kind:o.name==="label"?"info":"neutral",style:Mn.smallSpaceRight,children:o.name}),o.value]},s))})]},t))})}function oi({graphId:i,correct:r,fullGraphAriaLabel:n,fullGraphAriaDescription:a,lockedFigures:t}){const[o,s]=h.useState(!0),[u,d]=h.useState(!1),[c,b]=h.useState([]),k=h.useId();return h.useEffect(()=>{b(au(i))},[r,n,a,i,t]),e.jsxs(e.Fragment,{children:[e.jsx(_e,{title:"Screen reader tree",isOpen:o,onToggle:s,isCollapsible:!0}),o&&e.jsxs(e.Fragment,{children:[e.jsxs(x,{style:[Mn.row,Mn.tagSwitch],children:[e.jsx(Or,{id:k,checked:u,onChange:d}),e.jsx(L,{size:m.xSmall_8}),e.jsx(We,{tag:"label",htmlFor:k,children:"Show HTML roles/tags"}),e.jsx(wn,{}),e.jsx(eu,{children:'This screen reader tree shows the ARIA labels and descriptions for elements within the "correct answer" Interactive Graph widget displayed above.'})]}),e.jsx(tu,{elementArias:c,showTags:u})]})]})}const Mn=R.StyleSheet.create({smallSpaceRight:{marginRight:m.xxSmall_6},indentListLeft:{listStyle:"revert",marginLeft:m.small_12},tagSwitch:{marginTop:m.xSmall_8,marginBottom:m.xSmall_8},row:{flexDirection:"row",alignItems:"center"}});oi.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphSRTree"};const si=({numSegments:i=1,onChange:r})=>e.jsx(he,{selectedValue:`${i}`,placeholder:"",onChange:n=>{const a=+n;r(a)},style:ru.singleSelectShort,children:y.range(1,7).map(n=>e.jsx(D,{value:`${n}`,label:`${n} segment${n>1?"s":""}`},n))},"segment-select"),ru=R.StyleSheet.create({singleSelectShort:{height:26}});si.__docgenInfo={description:"",methods:[],displayName:"SegmentCountSelector",props:{numSegments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(numSegments: number) => void",signature:{arguments:[{type:{name:"number"},name:"numSegments"}],return:{name:"void"}}},description:""}}};const li=i=>{const{id:r,onChange:n}=i,a=["point","line","vector","ellipse","polygon","function","label"];return e.jsx(x,{style:er.container,children:e.jsx(Zr,{menuText:"Add locked figure",style:er.addElementSelect,children:a.map(t=>e.jsx(ea,{label:t,onClick:()=>n(t)},`${r}-${t}`))})})},er=R.StyleSheet.create({container:{marginTop:m.xSmall_8},addElementSelect:{backgroundColor:O.fadedBlue8,borderRadius:m.xxxSmall_4}});li.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSelect",props:{id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: LockedFigureType) => void",signature:{arguments:[{type:{name:'union["type"]',raw:'LockedFigure["type"]'},name:"value"}],return:{name:"void"}}},description:""}}};const na=i=>{const{value:r,onChange:n,...a}=i,[t,o]=h.useState(!1),[s,u]=h.useState(""),d=h.useRef(null);return h.useEffect(()=>{const c=d.current,b=k=>{k.stopPropagation()};return c==null||c.addEventListener("wheel",b),()=>{c==null||c.removeEventListener("wheel",b)}},[d]),e.jsx(Fe,{...a,type:"number",value:t?s:r,onChange:c=>{u(c),n(c)},onFocus:c=>{var b;u(r),o(!0),(b=i.onFocus)==null||b.call(i,c)},onBlur:c=>{var b;o(!1),(b=i.onBlur)==null||b.call(i,c)},ref:d})};na.__docgenInfo={description:`This is a custom text field of type="number" for use in Perseus Editors.

This component makes it so that
1. the text field's input number updates on scroll without
   scrolling the page.
2. the input is controlled as long as it does not have focus.
   While it is focused, it becomes editable and emits onChange
   events. This is useful to make sure that input behavior
   remains predictable, rather than possibly having the cursor
   jump around uenxpectedly.

NOTE 1: Native HTML number inputs do not update the number value on scroll,
they only scroll the page. Inputs in React do NOT work this way (explanation
here: https://stackoverflow.com/a/68266494). By default, scrolling on a
focused number input in React causes BOTH the input value to change AND
the page to scroll. The behavior in this component is an improvement on
the React behavior, but it's the opposite of the native HTML behavior.

NOTE 2: Firefox seems to have a custom override for input scroll. Even
with this stopPropogation, Firefox matches the native HTML behavior.`,methods:[],displayName:"ScrolllessNumberTextField"};const{convertDegreesToRadians:iu,convertRadiansToDegrees:ou}=xt,ui=i=>{const{angle:r,onChange:n}=i,[a,t]=h.useState(ou(r).toString());function o(s){t(s),!(isNaN(+s)||s==="")&&n(iu(s))}return e.jsxs(U,{tag:"label",style:nr.row,children:["angle (degrees)",e.jsx(L,{size:m.xxSmall_6}),e.jsx(na,{value:a,onChange:o,style:nr.textField}),e.jsx(L,{size:m.xxSmall_6})]})},nr=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64}});ui.__docgenInfo={description:"",methods:[],displayName:"AngleInput",props:{angle:{required:!0,tsType:{name:"number"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(angle: number) => void",signature:{arguments:[{type:{name:"number"},name:"angle"}],return:{name:"void"}}},description:""}}};const te=i=>{const{coord:r,labels:n,error:a,style:t,onChange:o}=i,[s,u]=h.useState([r[0].toString(),r[1].toString()]);h.useEffect(()=>{u([r[0].toString(),r[1].toString()])},[r]);function d(c,b){const k=[...s];if(k[b]=c,u(k),isNaN(+c)||c==="")return;const C=[...r];C[b]=+c,o(C)}return e.jsxs(x,{style:[Je.row,t],children:[e.jsxs(U,{tag:"label",style:Je.row,children:[n?n[0]:"x coord",e.jsx(L,{size:m.xxSmall_6}),e.jsx(na,{value:s[0],onChange:c=>d(c,0),style:[Je.textField,a?Je.errorField:void 0]})]}),e.jsx(L,{size:m.medium_16}),e.jsxs(U,{tag:"label",style:Je.row,children:[n?n[1]:"y coord",e.jsx(L,{size:m.xxSmall_6}),e.jsx(na,{value:s[1],onChange:c=>d(c,1),style:[Je.textField,a?Je.errorField:void 0]})]})]})},Je=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64},errorField:{borderColor:O.red,backgroundColor:O.fadedRed8}});te.__docgenInfo={description:"",methods:[],displayName:"CoordinatePairInput",props:{coord:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},labels:{required:!1,tsType:{name:"tuple",raw:"[string, string]",elements:[{name:"string"},{name:"string"}]},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newCoord: Coord) => void",signature:{arguments:[{type:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},name:"newCoord"}],return:{name:"void"}}},description:""}}};const su=on("ul"),lu=6;h.forwardRef(function(r,n){const{children:a,id:t,initialExpandedIndex:o,allowMultipleExpanded:s=!0,caretPosition:u,cornerKind:d="rounded",animated:c,style:b,...k}=r,C=Array(a.length).fill(!1);o!==void 0&&(C[o]=!0);const[A,f]=h.useState(C),w=Array(a.length).fill(null),_=a.length<=lu,P=(g,p)=>{const v=s?[...A]:Array(a.length).fill(!1),S=!A[g];v[g]=S,f(v),p&&p(S)},N=g=>{var v,S,q,j;const p=w.findIndex(F=>F.current===document.activeElement);if(p!==-1)switch(g.key){case"ArrowUp":g.preventDefault();const F=(p+a.length-1)%a.length;(v=w[F].current)==null||v.focus();break;case"ArrowDown":g.preventDefault();const Z=(p+1)%a.length;(S=w[Z].current)==null||S.focus();break;case"Home":g.preventDefault(),(q=w[0].current)==null||q.focus();break;case"End":g.preventDefault(),(j=w[a.length-1].current)==null||j.focus();break}};return e.jsx(su,{style:[uu.wrapper,b],onKeyDown:N,...k,ref:n,children:a.map((g,p)=>{const{caretPosition:v,cornerKind:S,onToggle:q,animated:j}=g.props,F=h.createRef();w[p]=F;const B=p===0,Z=p===a.length-1;return e.jsx("li",{id:t,children:h.cloneElement(g,{animated:j??c,caretPosition:v??u,cornerKind:S??d,expanded:A[p],onToggle:()=>P(p,q),isFirstSection:B,isLastSection:Z,isRegion:_,ref:F})},p)})})});const uu=R.StyleSheet.create({wrapper:{boxSizing:"border-box",listStyle:"none",padding:0,width:"100%"}});function du(i,r,n,a){switch(i){case"rounded-per-section":return{roundedTop:!0,roundedBottom:!a};case"rounded":return{roundedTop:r,roundedBottom:n&&!a};default:return{roundedTop:!1,roundedBottom:!1}}}const mu=h.forwardRef(function(r,n){const{id:a,header:t,caretPosition:o,cornerKind:s,collapsible:u=!0,expanded:d,animated:c,onClick:b,sectionContentUniqueId:k,headerStyle:C,tag:A="h2",testId:f,isFirstSection:w,isLastSection:_}=r,P=typeof t=="string",{roundedTop:N,roundedBottom:g}=du(s,w,_,d);return e.jsx(lt,{tag:A,style:ye.heading,children:e.jsx(Fr,{id:a,"aria-expanded":d,"aria-controls":k,onClick:b,disabled:!u,testId:f?`${f}-header`:void 0,style:[ye.headerWrapper,c&&ye.headerWrapperWithAnimation,o==="start"&&ye.headerWrapperCaretStart,N&&ye.roundedTop,g&&ye.roundedBottom,C,!u&&ye.disabled],ref:n,children:()=>e.jsxs(e.Fragment,{children:[e.jsx(x,{style:[ye.headerContent,P&&ye.headerString],children:P?e.jsx(x,{style:[o==="end"?ye.headerStringCaretEnd:ye.headerStringCaretStart],children:t}):t}),u&&e.jsx(Re,{icon:ta,color:E.core.foreground.neutral.default,size:"small",style:[c&&ye.iconWithAnimation,o==="start"?ye.iconStart:ye.iconEnd,d&&ye.iconExpanded],testId:f?`${f}-caret-icon`:void 0})]})})})}),pa=m.small_12-1,ar="300ms",ye=R.StyleSheet.create({heading:{minWidth:0,marginTop:0},headerWrapper:{display:"flex",flexDirection:"row",alignItems:"center",overflow:"hidden",minWidth:"auto",width:"100%",position:"relative",zIndex:1,":active":{outline:`2px solid ${E.action.secondary.progressive.press.border}`},":hover":{outline:`2px solid ${E.action.secondary.progressive.hover.border}`},":focus-visible":{outline:`2px solid ${E.focus.outer}`}},headerWrapperWithAnimation:{transition:`border-radius ${ar}`},headerWrapperCaretStart:{flexDirection:"row-reverse"},roundedTop:{borderStartStartRadius:pa,borderStartEndRadius:pa},roundedBottom:{borderEndStartRadius:pa,borderEndEndRadius:pa},headerContent:{flexGrow:1,textAlign:"start"},headerString:{paddingTop:m.medium_16,paddingBottom:m.medium_16},headerStringCaretEnd:{paddingInlineEnd:m.small_12,paddingInlineStart:m.medium_16},headerStringCaretStart:{paddingInlineEnd:m.medium_16,paddingInlineStart:m.small_12},iconWithAnimation:{transition:`transform ${ar}`},iconExpanded:{transform:"rotate(180deg)"},iconStart:{marginInlineStart:m.medium_16},iconEnd:{marginInlineEnd:m.medium_16},disabled:{pointerEvents:"none",color:"inherit",":focus-visible":{outline:`2px solid ${E.focus.outer}`}}}),pu=h.forwardRef(function(r,n){const{children:a,id:t,header:o,collapsible:s,expanded:u,animated:d=!1,onToggle:c,caretPosition:b="end",cornerKind:k="rounded",style:C,headerStyle:A,tag:f,testId:w,isFirstSection:_=!0,isLastSection:P=!0,isRegion:N=!0,...g}=r,[p,v]=h.useState(u??!1),S=u!==void 0&&c,q=h.useId(),j=t??q,F=h.useId(),B=t?`${t}-header`:F,Z=h.useId(),z=cu(k,_,P),V=()=>{S?c(!u):(v(!p),c&&c(!p))};let $;return s===!1?$=!0:$=S?u:p,e.jsxs(x,{id:j,style:[$e.wrapper,d&&$e.wrapperWithAnimation,z.wrapper,$?$e.wrapperExpanded:$e.wrapperCollapsed,C],testId:w,...g,children:[e.jsx(mu,{id:B,header:o,caretPosition:b,cornerKind:k,collapsible:s,expanded:$,animated:d,onClick:V,sectionContentUniqueId:Z,headerStyle:A,tag:f,testId:w,isFirstSection:_,isLastSection:P,ref:n}),e.jsx(x,{id:Z,role:N?"region":void 0,"aria-labelledby":B,style:[$e.contentWrapper,$?$e.contentWrapperExpanded:$e.conentWrapperCollapsed,z.contentWrapper],testId:w?`${w}-content-panel`:void 0,children:typeof a=="string"?e.jsx(Ro,{style:$e.stringContent,children:a}):a})]})}),$e=R.StyleSheet.create({wrapper:{display:"grid",position:"static",boxSizing:"border-box",backgroundColor:E.surface.primary},wrapperWithAnimation:{transition:"grid-template-rows 300ms"},wrapperCollapsed:{gridTemplateRows:"min-content 0fr"},wrapperExpanded:{gridTemplateRows:"min-content 1fr"},contentWrapper:{overflow:"hidden"},conentWrapperCollapsed:{visibility:"hidden"},contentWrapperExpanded:{visibility:"visible"},stringContent:{padding:m.medium_16}}),ca={},cu=(i,r,n)=>{const a=`${i}-${r.toString()}-${n.toString()}`;if(ca[a])return ca[a];let t=Object.freeze({}),o=Object.freeze({}),s=Object.freeze({}),u=Object.freeze({});const d=`1px solid ${E.core.border.neutral.subtle}`;i==="square"&&(t={border:d,borderBottom:"none",borderRadius:M.radius.radius_0},n&&(u={borderBottom:d})),i==="rounded"&&(t={border:d,borderBottom:"none"},r&&(s={borderStartStartRadius:m.small_12,borderStartEndRadius:m.small_12}),n&&(u={borderBottom:d,borderEndStartRadius:m.small_12,borderEndEndRadius:m.small_12},o={borderEndEndRadius:m.small_12,borderEndStartRadius:m.small_12})),i==="rounded-per-section"&&(t={border:d,borderRadius:M.radius.radius_120,marginBottom:m.medium_16},o={borderEndEndRadius:m.small_12,borderEndStartRadius:m.small_12});const c={wrapper:{...t,...s,...u},contentWrapper:o};return ca[a]=R.StyleSheet.create(c),ca[a]},be=i=>{const{animated:r,children:n,header:a,expanded:t,containerStyle:o,panelStyle:s,headerStyle:u,onToggle:d}=i;return e.jsx(x,{className:"perseus-editor-accordion",children:e.jsx(pu,{animated:r,expanded:t,onToggle:d,style:[at.container,o],headerStyle:[at.accordionHeader,u],header:a,children:e.jsx(x,{style:[at.accordionPanel,s],children:n})})})},at=R.StyleSheet.create({container:{backgroundColor:E.core.background.instructive.subtle,marginTop:m.xSmall_8},accordionHeader:{padding:m.small_12,paddingInlineEnd:0,height:m.xxLarge_48},accordionPanel:{paddingTop:m.xxSmall_6,paddingBottom:m.xxxSmall_4,paddingLeft:m.small_12,paddingRight:m.small_12}});be.__docgenInfo={description:"",methods:[],displayName:"PerseusEditorAccordion",props:{animated:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"union",raw:"React.ReactNode | React.ReactNode[]",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"}]},description:""},header:{required:!0,tsType:{name:"union",raw:"string | React.ReactElement",elements:[{name:"string"},{name:"ReactReactElement",raw:"React.ReactElement"}]},description:""},expanded:{required:!1,tsType:{name:"boolean"},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""},panelStyle:{required:!1,tsType:{name:"StyleType"},description:""},headerStyle:{required:!1,tsType:{name:"StyleType"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""}}};const At=i=>{const{color:r,filled:n=!0,decorative:a=!1}=i;return e.jsx(x,{"aria-label":a?void 0:`${r}, ${n?"filled":"open"}`,style:[hu.colorSwatch,{border:`4px solid ${Ee[r]}`,backgroundColor:n?Ee[r]:O.white}]})},hu=R.StyleSheet.create({colorSwatch:{outline:`2px solid ${O.offWhite}`,borderRadius:"50%",width:m.large_24,height:m.large_24}});At.__docgenInfo={description:"",methods:[],displayName:"ColorSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!1,tsType:{name:"boolean"},description:""},decorative:{required:!1,tsType:{name:"boolean"},description:""}}};const gu=Object.keys(Ee),Ue=i=>{const{selectedValue:r,style:n,onChange:a}=i;return e.jsx(x,{style:[tr.row,n],children:e.jsxs(U,{tag:"label",style:tr.row,children:["color",e.jsx(L,{size:m.xxSmall_6}),e.jsx(he,{selectedValue:r,onChange:a,placeholder:"",children:gu.map(t=>e.jsx(D,{value:t,label:t,leftAccessory:e.jsx(At,{color:t,decorative:!0})},t))})]})})},tr=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:"auto"}});Ue.__docgenInfo={description:"",methods:[],displayName:"ColorSelect",props:{selectedValue:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newColor: LockedFigureColor) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},name:"newColor"}],return:{name:"void"}}},description:""}}};const di=i=>{const{color:r,fillStyle:n,strokeStyle:a}=i;return e.jsx(x,{"aria-label":`${r}, stroke ${a}, fill ${n}`,style:[rr.container,{border:`4px ${a} ${Ee[r]}`}],children:e.jsx(x,{style:[rr.innerCircle,{backgroundColor:Ee[r],opacity:n==="white"?0:za[n]}]})})},rr=R.StyleSheet.create({container:{outline:`2px solid ${O.offWhite}`,borderRadius:"50%",width:m.xLarge_32,height:m.large_24,backgroundColor:O.white,alignItems:"center",justifyContent:"center"},innerCircle:{width:28,height:20,borderRadius:"50%"}});di.__docgenInfo={description:"",methods:[],displayName:"EllipseSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const ia=i=>{const{selectedValue:r,containerStyle:n,onChange:a}=i;return e.jsxs(U,{tag:"label",style:[yu.lineStrokeSelect,n],children:["stroke",e.jsx(L,{size:m.xxxSmall_4}),e.jsxs(he,{selectedValue:r,onChange:a,placeholder:"",children:[e.jsx(D,{value:"solid",label:"solid"}),e.jsx(D,{value:"dashed",label:"dashed"})]})]})},yu=R.StyleSheet.create({lineStrokeSelect:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0}});ia.__docgenInfo={description:"",methods:[],displayName:"LineStrokeSelect",props:{selectedValue:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: StyleOptions) => void",signature:{arguments:[{type:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},name:"newValue"}],return:{name:"void"}}},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const vn=i=>{const{selectedValue:r,containerStyle:n,onChange:a}=i;return e.jsxs(U,{tag:"label",style:[{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0},n],children:["weight",e.jsx(L,{size:m.xxxSmall_4}),e.jsxs(he,{selectedValue:r,onChange:t=>a(t),placeholder:"",children:[e.jsx(D,{value:"thin",label:"thin"}),e.jsx(D,{value:"medium",label:"medium"}),e.jsx(D,{value:"thick",label:"thick"})]})]})};vn.__docgenInfo={description:"",methods:[],displayName:"LineWeightSelect",props:{selectedValue:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: StrokeWeight) => void",signature:{arguments:[{type:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},name:"newValue"}],return:{name:"void"}}},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const bu=""+new URL("pencil-circle-gxKdCU6a.svg",import.meta.url).href,{InfoTip:wu}=G;function sn(i){const{ariaLabel:r,getPrepopulatedAriaLabel:n,onChangeProps:a}=i,o=`aria-label-${h.useId()}`,[s,u]=h.useState(!1);return e.jsxs(x,{children:[e.jsx(L,{size:m.xSmall_8}),e.jsxs(x,{style:tt.row,children:[e.jsx(U,{tag:"label",htmlFor:o,children:"Aria label"}),e.jsx(wn,{}),e.jsxs(wu,{children:["Aria label is used by screen readers to describe content to users who may be visually impaired. ",e.jsx("br",{}),e.jsx("br",{}),"Populating this field will make it so that users can use a screen reader to navigate to this point and hear the description.",e.jsx("br",{}),e.jsx("br",{}),"If you leave this field blank, the point will be hidden from screen readers. Users will not be able to navigate to this point using a screen reader."]})]}),e.jsx(L,{size:m.xxSmall_6}),e.jsx(vt,{style:tt.caption,children:"The figure is hidden from screen readers if this field is left blank."}),e.jsx(L,{size:m.xxSmall_6}),e.jsx(kt,{id:o,value:s?"Loading...":r??"",onChange:d=>{a({ariaLabel:d||void 0})},placeholder:"Ex. Point at (x, y)",rows:1,resizeType:"vertical"}),e.jsx(ne,{kind:"tertiary",startIcon:bu,style:tt.button,onClick:()=>{u(!0),n().then(d=>{u(!1),a({ariaLabel:d})})},children:"Auto-generate"})]})}const tt=R.StyleSheet.create({row:{flexDirection:"row",alignItems:"center"},button:{alignSelf:"start"},caption:{color:O.offBlack64}});sn.__docgenInfo={description:"",methods:[],displayName:"LockedFigureAria",props:{ariaLabel:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},getPrepopulatedAriaLabel:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:`The async function that generates the prepopulated aria label
for the locked figure with math details converted to spoken words.`},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: {ariaLabel?: string | undefined}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ariaLabel?: string | undefined}",signature:{properties:[{key:"ariaLabel",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}}]}},name:"props"}],return:{name:"void"}}},description:""}}};const mi=""+new URL("caret-double-down-bold-Bd6la7IK.svg",import.meta.url).href,pi=""+new URL("caret-double-up-bold-DXRVAODE.svg",import.meta.url).href,ci=""+new URL("caret-up-bold-DRBgEf-E.svg",import.meta.url).href,$a=""+new URL("trash-bold-CtqTW1Dq.svg",import.meta.url).href,Ke=i=>{const{figureType:r,onMove:n,onRemove:a}=i;return e.jsxs(x,{style:ir.container,children:[e.jsx(ne,{startIcon:$a,"aria-label":`Delete locked ${r}`,onClick:a,kind:"tertiary",style:ir.deleteButton,children:"Delete"}),n&&e.jsxs(e.Fragment,{children:[e.jsx(wn,{}),e.jsx(ce,{icon:pi,kind:"tertiary",size:"small","aria-label":`Move locked ${r} to the back`,onClick:()=>n("back")}),e.jsx(ce,{icon:ci,kind:"tertiary",size:"small","aria-label":`Move locked ${r} backward`,onClick:()=>n("backward")}),e.jsx(ce,{icon:ta,kind:"tertiary",size:"small","aria-label":`Move locked ${r} forward`,onClick:()=>n("forward")}),e.jsx(ce,{icon:mi,kind:"tertiary",size:"small","aria-label":`Move locked ${r} to the front`,onClick:()=>n("front")})]})]})},ir=R.StyleSheet.create({container:{width:"100%",flexDirection:"row",alignItems:"center",marginTop:m.xxxSmall_4},deleteButton:{marginInlineStart:-4}});Ke.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettingsActions",props:{figureType:{required:!0,tsType:{name:'union["type"]',raw:'LockedFigure["type"]'},description:""},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:""},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{InfoTip:fu}=G;function Xe(i){const{type:r,coord:n,color:a,size:t,text:o,expanded:s,onChangeProps:u,onMove:d,onRemove:c,onToggle:b,containerStyle:k}=i;return e.jsxs(be,{expanded:s,onToggle:b,header:e.jsxs(x,{style:[Pe.row,Pe.accordionHeaderContainer],children:[e.jsxs(W,{children:["Label (",n[0],", ",n[1],")"]}),e.jsx(L,{size:m.xSmall_8}),o!==""&&e.jsx(W,{style:[{backgroundColor:O.white,color:Ee[a]},Pe.accordionHeader],children:o})]}),containerStyle:k,children:[e.jsx(te,{coord:n,onChange:C=>{u({coord:C})},style:Pe.spaceUnder}),e.jsxs(x,{style:Pe.row,children:[e.jsxs(U,{tag:"label",style:[Pe.row,Pe.spaceUnder,{flexGrow:1}],children:["text",e.jsx(L,{size:m.xSmall_8}),e.jsx(Fe,{value:o,placeholder:"ex. $x^2$ or $\\frac{1}{2}$",onChange:C=>u({text:C})})]}),e.jsxs(fu,{children:["Surround your text with $ for TeX.",e.jsx("br",{}),"Example: ","This circle has radius $\\frac{1}{2}$ units.",e.jsx("br",{}),e.jsx("br",{}),'It is important to use TeX when appropriate for accessibility. The above example would be read as "This circle has radius one-half units" by screen readers.']})]}),e.jsxs(x,{style:Pe.row,children:[e.jsx(Ue,{selectedValue:a,onChange:C=>{u({color:C})},style:Pe.spaceUnder}),e.jsx(L,{size:m.medium_16}),e.jsxs(U,{tag:"label",style:Pe.row,children:["size",e.jsx(L,{size:m.xSmall_8}),e.jsxs(he,{selectedValue:t,onChange:C=>u({size:C}),placeholder:"",children:[e.jsx(D,{value:"small",label:"small"}),e.jsx(D,{value:"medium",label:"medium"}),e.jsx(D,{value:"large",label:"large"})]})]})]}),e.jsx(Ke,{figureType:r,onMove:d,onRemove:c})]})}const Pe=R.StyleSheet.create({accordionHeaderContainer:{whiteSpace:"nowrap"},accordionHeader:{padding:m.xxxSmall_4,marginInlineEnd:m.xSmall_8,borderRadius:m.xxxSmall_4,textOverflow:"ellipsis",overflow:"hidden"},row:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0},spaceUnder:{marginBottom:m.xSmall_8}});Xe.__docgenInfo={description:"",methods:[],displayName:"LockedLabelSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"label"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},text:{required:!0,tsType:{name:"string"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},size:{required:!0,tsType:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}]},description:""},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedLabelType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"Partial<LockedLabelType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coord, color, etc.) are updated."},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:`Called when a movement button (top, up, down, bottom) is pressed.
This is also used to indicate that this LockedLabelSettings component
is for a standalone label, not part of a larger locked figure.`},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const Qe="grayH";function ze(i){switch(i){case"point":return{type:"point",coord:[0,0],color:Qe,filled:!0,labels:[]};case"line":return{type:"line",kind:"line",points:[ze("point"),{...ze("point"),coord:[2,2]}],color:Qe,lineStyle:"solid",showPoint1:!1,showPoint2:!1,weight:"medium",labels:[]};case"vector":return{type:"vector",points:[[0,0],[2,2]],color:Qe,weight:"medium",labels:[]};case"ellipse":return{type:"ellipse",center:[0,0],radius:[1,1],angle:0,color:Qe,fillStyle:"none",strokeStyle:"solid",weight:"medium",labels:[]};case"polygon":return{type:"polygon",points:[[0,2],[-1,0],[1,0]],color:Qe,showVertices:!1,fillStyle:"none",strokeStyle:"solid",weight:"medium",labels:[]};case"function":return{type:"function",color:Qe,strokeStyle:"solid",weight:"medium",equation:"x^2",domain:[-1/0,1/0],directionalAxis:"x",labels:[]};case"label":return{type:"label",coord:[0,0],text:"label",color:Qe,size:"medium"};default:throw new fn(i)}}function kn(i,r="solid",n,a="medium"){const t=i==="grayH"?"gray":i,s=`. Appearance${a==="medium"?"":` ${a}`} ${r} ${t}`;switch(n){case"none":return`${s} border, with no fill.`;case"white":return`${s} border, with a white fill.`;case"solid":case"translucent":return`${s} border, with a ${n} ${t} fill.`;case void 0:return`${s}.`;default:throw new fn(n)}}async function ge(i){const r=await Fo.SpeechRuleEngine.setup("en");let n="";const a=Oo(i);for(const t of a)switch(t.type){case"math":n+=r.texToSpeech(t.content);break;case"specialCharacter":n+=t.content.length>1?t.content.slice(1):t.content;break;default:n+=t.content;break}return n}async function Be(i){if(i.length===0)return"";const r=i.map(a=>ge(a.text));return` ${(await Promise.all(r)).join(", ")}`}const{convertRadiansToDegrees:vu}=xt,{InfoTip:ku}=G,hi=i=>{const{center:r,radius:n,angle:a,color:t,labels:o,ariaLabel:s,fillStyle:u,strokeStyle:d,weight:c,expanded:b,onToggle:k,onChangeProps:C,onMove:A,onRemove:f}=i;async function w(){const p=await Be(o),v=await ge(`$${r[0]}$`),S=await ge(`$${r[1]}$`),q=await ge(`$${vu(a)}$`),j=n[0]===n[1];let F="";j?F+=`Circle${p} with radius ${n[0]}`:F+=`Ellipse${p} with x radius ${n[0]} and y radius ${n[1]}`,F+=`, centered at ${v} comma ${S}`,!j&&a!==0&&(F+=`, rotated by ${q} degrees`);const B=kn(t,d,u,c);return F+=B,F}function _(p){const v=p[0]-r[0],S=p[1]-r[1],q={center:p};q.labels=o.map(j=>({...j,coord:[j.coord[0]+v,j.coord[1]+S]})),C(q)}function P(p){const v={color:p};v.labels=o.map(S=>({...S,color:p})),C(v)}function N(p,v){const S=[...o];S[v]={...o[v],...p},C({labels:S})}function g(p){const v=o.filter((S,q)=>q!==p);C({labels:v})}return e.jsxs(be,{expanded:b,onToggle:k,header:e.jsxs(x,{style:we.row,children:[e.jsx(W,{children:`Ellipse (${r[0]}, ${r[1]}), radius ${n[0]}, ${n[1]}`}),e.jsx(L,{size:m.xSmall_8}),e.jsx(di,{color:i.color,fillStyle:u,strokeStyle:d})]}),children:[e.jsxs(x,{style:we.row,children:[e.jsx(te,{coord:r,style:we.spaceUnder,onChange:_}),e.jsx(x,{style:we.spaceUnder,children:e.jsx(ku,{children:"The coordinates for the center of the ellipse."})})]}),e.jsx(te,{coord:n,labels:["x radius","y radius"],style:we.spaceUnder,onChange:p=>C({radius:p})}),e.jsx(ui,{angle:a,onChange:p=>C({angle:p})}),e.jsx(L,{size:m.xSmall_8}),e.jsxs(x,{style:[we.row,we.spaceUnder],children:[e.jsx(Ue,{selectedValue:t,onChange:P}),e.jsx(L,{size:m.medium_16}),e.jsxs(U,{tag:"label",style:[we.row,we.truncatedWidth],children:["fill",e.jsx(L,{size:m.xxSmall_6}),e.jsx(he,{selectedValue:u,onChange:p=>C({fillStyle:p}),placeholder:"",children:Object.keys(za).map(p=>e.jsx(D,{value:p,label:p},p))})]})]}),e.jsx(ia,{selectedValue:d,onChange:p=>C({strokeStyle:p}),containerStyle:{marginBottom:T.size_080}}),e.jsx(vn,{selectedValue:c,onChange:p=>C({weight:p})}),e.jsx(L,{size:m.small_12}),e.jsx(x,{style:we.horizontalRule}),e.jsx(sn,{ariaLabel:s,getPrepopulatedAriaLabel:w,onChangeProps:p=>{C(p)}}),e.jsx(L,{size:m.xxxSmall_4}),e.jsx(x,{style:we.horizontalRule}),e.jsx(L,{size:m.small_12}),e.jsx(U,{children:"Visible labels"}),o.map((p,v)=>h.createElement(Xe,{...p,key:v,expanded:!0,onChangeProps:S=>{N(S,v)},onRemove:()=>{g(v)},containerStyle:we.labelContainer})),e.jsx(ne,{kind:"tertiary",startIcon:rn,onClick:()=>{const p={...ze("label"),coord:[r[0],r[1]-o.length],color:t};C({labels:[...o,p]})},style:we.addButton,children:"Add visible label"}),e.jsx(Ke,{figureType:i.type,onMove:A,onRemove:f})]})},we=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},truncatedWidth:{minWidth:0},addButton:{alignSelf:"start"},labelContainer:{backgroundColor:O.white},horizontalRule:{height:1,backgroundColor:O.offBlack16}});hi.__docgenInfo={description:"",methods:[],displayName:"LockedEllipseSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},type:{required:!0,tsType:{name:"literal",value:'"ellipse"'},description:""},center:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},radius:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},angle:{required:!0,tsType:{name:"number"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedEllipseType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedEllipseType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."}}};const xu=""+new URL("copy-ChcUWZci.svg",import.meta.url).href,Cu=""+new URL("note-pencil-CqqXva0w.svg",import.meta.url).href,Va=i=>{const{color:r,lineStyle:n}=i;return e.jsx(x,{style:or.container,children:e.jsx(x,{"aria-label":`${r}, ${n}`,style:[or.lineSwatch,{border:`5px ${n} ${Ee[r]}`}]})})},or=R.StyleSheet.create({container:{backgroundColor:O.white,justifyContent:"center",padding:m.xSmall_8,borderRadius:m.xxxSmall_4},lineSwatch:{width:40}});Va.__docgenInfo={description:"",methods:[],displayName:"LineSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const sr={linear:["x + 5","1/2x - 2"],polynomial:["1/2x^2 + 3x - 4","(1/3)x^3 - 2x^2 + 3x - 4"],trigonometric:["sin(x) * 3","arctan(2x) + 4"]},gi=i=>{const{color:r,strokeStyle:n,equation:a,directionalAxis:t,domain:o,weight:s,ariaLabel:u,onChangeProps:d,onMove:c,onRemove:b}=i,k=i.labels,C=t==="x"?"y=":"x=",A=`Function (${C}${a})`,f=z=>[Number.isFinite(z[0])?z[0].toString():"",Number.isFinite(z[1])?z[1].toString():""],[w,_]=h.useState(f(o)),[P,N]=h.useState("");h.useEffect(()=>{_(f(o))},[o]);async function g(){let V=`Function${await Be(k)} with equation ${C}${a}`;(Number.isFinite(o[0])||Number.isFinite(o[1]))&&(V+=`, domain from ${o[0]} to ${o[1]}`);const $=kn(r,n,void 0,s);return V+=$,V}function p(z,V){const $={};$[z]=V,d($)}function v(z,V){const $=[...w];$[z]=V,_($);const ke=[...o];let Ye=parseFloat(V);V===""&&z===0?Ye=-1/0:V===""&&z===1&&(Ye=1/0),ke[z]=Ye,d({domain:ke})}const S=Object.keys(sr),q=P!=="",j=q?sr[P]:["Select category to see example equations"];function F(z){const V={color:z};V.labels=k.map($=>({...$,color:z})),d(V)}function B(z,V){const $=[...k];$[V]={...k[V],...z},d({labels:$})}function Z(z){const V=k.filter(($,ke)=>ke!==z);d({labels:V})}return e.jsxs(be,{expanded:i.expanded,onToggle:i.onToggle,header:e.jsxs(x,{style:J.row,children:[e.jsx(W,{style:J.accordionHeader,children:A}),e.jsx(L,{size:m.xSmall_8}),e.jsx(Va,{color:r,lineStyle:n})]}),children:[e.jsxs(x,{style:[J.row,{marginBottom:T.size_080}],children:[e.jsx(Ue,{selectedValue:r,onChange:F}),e.jsx(L,{size:m.small_12}),e.jsx(ia,{selectedValue:n,onChange:z=>{p("strokeStyle",z)}})]}),e.jsx(vn,{selectedValue:s,onChange:z=>d({weight:z})}),e.jsxs(x,{style:[J.row,J.rowSpace],children:[e.jsxs(he,{selectedValue:t,onChange:z=>{p("directionalAxis",z)},"aria-label":"equation prefix",style:[J.dropdownLabel,J.axisMenu],placeholder:"",children:[e.jsx(D,{value:"x",label:"y ="}),e.jsx(D,{value:"y",label:"x ="})]}),e.jsx(L,{size:m.xSmall_8}),e.jsx(Fe,{type:"text","aria-label":"equation",value:a,onChange:z=>{p("equation",z)},style:[J.textField]})]}),e.jsxs(x,{style:[J.row,J.rowSpace],children:[e.jsxs(U,{tag:"label",style:[J.dropdownLabel,J.domainMin],children:["domain min",e.jsx(L,{size:m.xxSmall_6}),e.jsx(Fe,{type:"number",style:J.domainMinField,value:w[0],onChange:z=>{v(0,z)}})]}),e.jsx(L,{size:m.medium_16}),e.jsxs(U,{tag:"label","aria-label":"domain max",style:[J.dropdownLabel,J.domainMax],children:["max",e.jsx(L,{size:m.xxSmall_6}),e.jsx(Fe,{type:"number",style:J.domainMaxField,value:w[1],onChange:z=>{v(1,z)}})]})]}),e.jsxs(be,{header:e.jsx(W,{children:"Example Functions"}),expanded:!1,containerStyle:J.exampleWorkspace,panelStyle:J.exampleAccordionPanel,children:[e.jsxs(U,{tag:"label",style:J.dropdownLabel,children:["Choose a category",e.jsx(L,{size:m.xxSmall_6}),e.jsx(he,{selectedValue:P,onChange:N,placeholder:"examples",children:S.map(z=>e.jsx(D,{value:z,label:z},z))})]}),q&&e.jsx("ul",{className:R.css(J.exampleContainer),children:j.map((z,V)=>e.jsx(qu,{category:P,example:z,index:V,pasteEquationFn:p},V))})]}),e.jsx(L,{size:m.small_12}),e.jsx(x,{style:J.horizontalRule}),e.jsx(sn,{ariaLabel:u,getPrepopulatedAriaLabel:g,onChangeProps:z=>{d(z)}}),e.jsx(L,{size:m.xxxSmall_4}),e.jsx(x,{style:J.horizontalRule}),e.jsx(L,{size:m.small_12}),e.jsx(U,{children:"Visible labels"}),k.map((z,V)=>e.jsx(Xe,{...z,expanded:!0,onChangeProps:$=>{B($,V)},onRemove:()=>{Z(V)},containerStyle:J.labelContainer},V)),e.jsx(ne,{kind:"tertiary",startIcon:rn,onClick:()=>{const z={...ze("label"),coord:[0,-k.length],color:r};d({labels:[...k,z]})},style:J.addButton,children:"Add visible label"}),e.jsx(Ke,{figureType:i.type,onMove:c,onRemove:b})]})},qu=i=>{const{category:r,example:n,index:a,pasteEquationFn:t}=i,o=h.useId();return e.jsxs("li",{className:R.css(J.exampleRow),children:[e.jsx(ce,{icon:Cu,kind:"tertiary","aria-label":"paste example","aria-describedby":o,onClick:()=>t("equation",n),size:"medium",style:J.copyPasteButton}),e.jsx(ce,{icon:xu,kind:"tertiary","aria-label":"copy example","aria-describedby":o,onClick:()=>navigator.clipboard.writeText(n),size:"medium",style:J.copyPasteButton}),e.jsx(L,{size:m.xxxSmall_4}),e.jsx(x,{style:J.exampleContent,id:o,children:n})]},`${r}-${a}`)},J=R.StyleSheet.create({accordionHeader:{textOverflow:"ellipsis",maxWidth:"calc(100% - 64px)",overflow:"hidden",whiteSpace:"nowrap"},axisMenu:{minWidth:"auto"},copyPasteButton:{flexShrink:"0",margin:"0 2px"},domainMin:{justifyContent:"space-between",width:"calc(((100% - 141px) / 2) + 88.7px)",textWrap:"nowrap"},domainMinField:{width:"calc(100% - 88.7px)"},domainMax:{width:"calc(((100% - 141px) / 2) + 36.2px)"},domainMaxField:{width:"calc(100% - 36.2px)"},dropdownLabel:{alignItems:"center",display:"flex"},exampleAccordionPanel:{alignItems:"start",paddingBottom:"12px",flexDirection:"row",flexWrap:"wrap"},exampleContainer:{background:"white",border:`1px solid ${O.fadedOffBlack16}`,borderRadius:"4px",flexGrow:"1",listStyleType:"none",maxHeight:"88px",margin:"8px 0 0 0",overflowY:"scroll",padding:"4px 12px 4px 4px"},exampleContent:{fontFamily:'"Lato", sans-serif',flexGrow:"1",color:O.offBlack},exampleRow:{alignItems:"center",display:"flex",flexDirection:"row",minHeight:"44px"},exampleWorkspace:{background:O.white50},rowSpace:{marginTop:m.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{flexGrow:"1"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:O.offBlack16},labelContainer:{backgroundColor:O.white}});gi.__docgenInfo={description:"",methods:[],displayName:"LockedFunctionSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"function"'},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},equation:{required:!0,tsType:{name:"string"},description:"This is the user-defined equation (as it was typed)"},directionalAxis:{required:!0,tsType:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}]},description:"The independent variable of this function"},domain:{required:!0,tsType:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFunctionType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedFunctionType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const an=i=>{const{checked:r,label:n,style:a,onChange:t}=i,o=h.useId();return e.jsxs(x,{style:[Tu.row,a],children:[e.jsx(Or,{id:o,checked:r,onChange:t}),e.jsx(L,{size:m.xSmall_8}),e.jsx(U,{tag:"label",htmlFor:o,children:n})]})},Tu=R.StyleSheet.create({row:{flexDirection:"row",alignItems:"center"}});an.__docgenInfo={description:"",methods:[],displayName:"LabeledSwitch",props:{label:{required:!0,tsType:{name:"string"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"newValue"}],return:{name:"void"}}},description:""}}};const La=i=>{const{headerLabel:r,coord:n,color:a,filled:t=!0,labels:o,ariaLabel:s,onChangeProps:u,onMove:d,onRemove:c,showPoint:b,error:k,expanded:C,onTogglePoint:A,onToggle:f}=i,w=!d&&!c;async function _(){const v=await Be(o),S=await ge(`$${n[0]}$`),q=await ge(`$${n[1]}$`);let j=`Point${v} at ${S} comma ${q}`;const F=kn(a);return j+=F,j}function P(v){const S={color:v};S.labels=o.map(q=>({...q,color:v})),u(S)}function N(v){const S=v[0]-n[0],q=v[1]-n[1],j={coord:v};j.labels=o.map(F=>({...F,coord:[F.coord[0]+S,F.coord[1]+q]})),u(j)}function g(v,S){const q=[...o];q[S]={...o[S],...v},u({labels:q})}function p(v){const S=o.filter((q,j)=>j!==v);u({labels:S})}return e.jsxs(be,{expanded:C,onToggle:f,containerStyle:w?Ne.definingContainer:void 0,panelStyle:w?Ne.definingPanel:void 0,header:e.jsxs(x,{style:Ne.row,children:[e.jsx(W,{children:`${r||"Point"} (${n[0]}, ${n[1]})`}),e.jsx(L,{size:m.xSmall_8}),e.jsx(At,{color:a,filled:t})]}),children:[e.jsx(te,{coord:n,style:Ne.spaceUnder,onChange:N,error:!!k}),A&&e.jsx(an,{label:"show point on graph",checked:!!b,style:b&&Ne.spaceUnder,onChange:A}),(!w||b)&&e.jsxs(e.Fragment,{children:[e.jsx(Ue,{selectedValue:a,onChange:P,style:Ne.spaceUnder}),e.jsx(an,{label:"open point",checked:!t,onChange:v=>{u({filled:!v})}})]}),!w&&e.jsxs(e.Fragment,{children:[e.jsx(L,{size:m.small_12}),e.jsx(x,{style:Ne.horizontalRule}),e.jsx(sn,{ariaLabel:s,getPrepopulatedAriaLabel:_,onChangeProps:v=>{u(v)}})]}),e.jsx(L,{size:m.xxxSmall_4}),e.jsx(x,{style:Ne.horizontalRule}),e.jsx(L,{size:m.small_12}),e.jsx(U,{children:"Visible labels"}),o.map((v,S)=>h.createElement(Xe,{...v,key:S,containerStyle:!w&&Ne.lockedPointLabelContainer,expanded:!0,onChangeProps:q=>{g(q,S)},onRemove:()=>{p(S)}})),e.jsx(ne,{kind:"tertiary",startIcon:rn,onClick:()=>{const v={...ze("label"),coord:[n[0]+.5,n[1]-o.length],color:a};u({labels:[...o,v]})},style:Ne.addButton,children:"Add visible label"}),c&&e.jsx(Ke,{figureType:i.type,onMove:d,onRemove:c})]})},Ne=R.StyleSheet.create({definingContainer:{marginTop:m.xSmall_8,marginBottom:0,marginLeft:-4,marginRight:-4,backgroundColor:O.white},definingPanel:{paddingBottom:m.xxSmall_6},lockedPointLabelContainer:{backgroundColor:O.white},row:{flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:O.offBlack16}});La.__docgenInfo={description:"",methods:[],displayName:"LockedPointSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"point"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},headerLabel:{required:!1,tsType:{name:"string"},description:`Optional label for the point to display in the header summary.
Defaults to "Point".`},showPoint:{required:!1,tsType:{name:"boolean"},description:"Whether the extra point settings are toggled open."},error:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"Optional error message to display."},onTogglePoint:{required:!1,tsType:{name:"signature",type:"function",raw:"(newValue) => void",signature:{arguments:[{name:"newValue"}],return:{name:"void"}}},description:"Called when the extra settings toggle switch is changed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedPointType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedPointType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when the point is moved."},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the point is removed."}}};const rt="The line cannot have length 0.",yi=i=>{const{kind:r,points:n,color:a,lineStyle:t="solid",showPoint1:o,showPoint2:s,weight:u,labels:d,ariaLabel:c,onChangeProps:b,onMove:k,onRemove:C}=i,[A,f]=n,w=r.charAt(0).toUpperCase()+r.slice(1),_=`${w} (${A.coord[0]},
        ${A.coord[1]}), (${f.coord[0]}, ${f.coord[1]})`,P=Ct(A.coord,f.coord);async function N(){const q=await Be(d),j=await Be(A.labels),F=await Be(f.labels),B=await ge(`$${A.coord[0]}$`),Z=await ge(`$${A.coord[1]}$`),z=await ge(`$${f.coord[0]}$`),V=await ge(`$${f.coord[1]}$`);let $;switch(r){case"line":$=`${w}${q} through point${j} at ${B} comma ${Z} and point${F} at ${z} comma ${V}`;break;case"ray":$=`${w}${q} from point${j} at ${B} comma ${Z} through point${F} at ${z} comma ${V}`;break;case"segment":$=`${w}${q} from point${j} at ${B} comma ${Z} to point${F} at ${z} comma ${V}`;break;default:throw new fn(r,"Unknown line kind")}const ke=kn(a,t,void 0,u);return $+=ke,$}function g(q,j){const F=[...n];F[j]={...n[j],...q};const B=qe.midpoint(n[0].coord,n[1].coord),Z=qe.midpoint(F[0].coord,F[1].coord),z=[Z[0]-B[0],Z[1]-B[1]],V=d.map(($,ke)=>({...$,coord:[$.coord[0]+z[0],$.coord[1]+z[1]]}));b({points:F,labels:V})}function p(q){const j=d.map(F=>({...F,color:q}));b({color:q,points:[{...A,color:q,labels:A.labels.map(F=>({...F,color:q}))},{...f,color:q,labels:f.labels.map(F=>({...F,color:q}))}],labels:j})}function v(q,j){const F=[...d];F[j]={...d[j],...q},b({labels:F})}function S(q){const j=d.filter((F,B)=>B!==q);b({labels:j})}return e.jsxs(be,{expanded:i.expanded,onToggle:i.onToggle,header:e.jsxs(x,{style:Ie.row,children:[e.jsx(W,{children:_}),e.jsx(L,{size:m.xSmall_8}),e.jsx(Va,{color:a,lineStyle:t})]}),children:[e.jsxs(U,{tag:"label",style:[Ie.row,Ie.spaceUnder],children:["kind",e.jsx(L,{size:m.xxxSmall_4}),e.jsxs(he,{selectedValue:r,onChange:q=>b({kind:q}),placeholder:"",children:[e.jsx(D,{value:"line",label:"line"}),e.jsx(D,{value:"ray",label:"ray"}),e.jsx(D,{value:"segment",label:"segment"})]})]}),e.jsxs(x,{style:[Ie.row,Ie.spaceUnder],children:[e.jsx(Ue,{selectedValue:a,onChange:p}),e.jsx(L,{size:m.small_12}),e.jsx(ia,{selectedValue:t,onChange:q=>b({lineStyle:q})})]}),e.jsx(vn,{selectedValue:u,onChange:q=>b({weight:q})}),P&&e.jsx(U,{style:Ie.errorText,children:rt}),e.jsx(La,{headerLabel:"Point 1",expanded:!0,showPoint:o,error:P?rt:null,...A,onTogglePoint:q=>b({showPoint1:q}),onChangeProps:q=>g(q,0)}),e.jsx(La,{headerLabel:"Point 2",expanded:!0,showPoint:s,error:P?rt:null,...f,onTogglePoint:q=>b({showPoint2:q}),onChangeProps:q=>g(q,1)}),e.jsx(L,{size:m.small_12}),e.jsx(x,{style:Ie.horizontalRule}),e.jsx(sn,{ariaLabel:c,getPrepopulatedAriaLabel:N,onChangeProps:q=>{b(q)}}),e.jsx(L,{size:m.xxxSmall_4}),e.jsx(x,{style:Ie.horizontalRule}),e.jsx(L,{size:m.small_12}),e.jsx(U,{children:"Visible labels"}),d.map((q,j)=>h.createElement(Xe,{...q,key:j,expanded:!0,onChangeProps:F=>{v(F,j)},onRemove:()=>{S(j)},containerStyle:Ie.labelContainer})),e.jsx(ne,{kind:"tertiary",startIcon:rn,onClick:()=>{const q=[0,-1],j=qe.add(qe.scale(q,d.length),qe.midpoint(n[0].coord,n[1].coord)),F={...ze("label"),coord:j,color:a};b({labels:[...d,F]})},style:Ie.addButton,children:"Add visible label"}),e.jsx(Ke,{figureType:i.type,onMove:k,onRemove:C})]})},Ie=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},errorText:{color:O.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:O.offBlack16},labelContainer:{backgroundColor:O.white}});yi.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFigure>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const Su=""+new URL("arrow-fat-down-Bfm634Ub.svg",import.meta.url).href,Au=""+new URL("arrow-fat-left-vG4eNh8n.svg",import.meta.url).href,ju=""+new URL("arrow-fat-right-LGRtshLE.svg",import.meta.url).href,Pu=""+new URL("arrow-fat-up-BqHZ5poh.svg",import.meta.url).href,Nu=""+new URL("minus-circle-D0QptBrx.svg",import.meta.url).href,bi=i=>{const{color:r,fillStyle:n,strokeStyle:a}=i;return e.jsx(x,{"aria-label":`${r}, stroke ${a}, fill ${n}`,style:[lr.container,{border:`4px ${a} ${Ee[r]}`}],children:e.jsx(x,{style:[lr.innerSquare,{backgroundColor:Ee[r],opacity:n==="white"?0:za[n]}]})})},lr=R.StyleSheet.create({container:{outline:`2px solid ${O.offWhite}`,width:m.large_24,height:m.large_24,backgroundColor:O.white,alignItems:"center",justifyContent:"center"},innerSquare:{width:20,height:20}});bi.__docgenInfo={description:"",methods:[],displayName:"PolygonSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const wi=i=>{const{points:r,color:n,showVertices:a,fillStyle:t,strokeStyle:o,weight:s,labels:u,ariaLabel:d,expanded:c,onToggle:b,onChangeProps:k,onMove:C,onRemove:A}=i;async function f(){let p=`Polygon${await Be(u)} with ${r.length} sides, vertices at `;const v=await Promise.all(r.map(async([q,j])=>{const F=await ge(`$${q}$`),B=await ge(`$${j}$`);return`${F} comma ${B}`}));p+=v.join(", ");const S=kn(n,o,t,s);return p+=S,p}function w(g){const p={color:g};p.labels=u.map(v=>({...v,color:g})),k(p)}function _(g){switch(g){case"up":k({points:r.map(([p,v])=>[p,v+1]),labels:u.map(p=>({...p,coord:[p.coord[0],p.coord[1]+1]}))});break;case"down":k({points:r.map(([p,v])=>[p,v-1]),labels:u.map(p=>({...p,coord:[p.coord[0],p.coord[1]-1]}))});break;case"left":k({points:r.map(([p,v])=>[p-1,v]),labels:u.map(p=>({...p,coord:[p.coord[0]-1,p.coord[1]]}))});break;case"right":k({points:r.map(([p,v])=>[p+1,v]),labels:u.map(p=>({...p,coord:[p.coord[0]+1,p.coord[1]]}))});break}}function P(g,p){const v=[...u];v[p]={...u[p],...g},k({labels:v})}function N(g){const p=u.filter((v,S)=>S!==g);k({labels:p})}return e.jsxs(be,{expanded:c,onToggle:b,header:e.jsxs(x,{style:re.row,children:[e.jsx(W,{children:`Polygon, ${r.length} sides`}),e.jsx(L,{size:m.xSmall_8}),e.jsx(bi,{color:n,fillStyle:t,strokeStyle:o})]}),children:[e.jsxs(x,{style:[re.row,re.spaceUnder],children:[e.jsx(Ue,{selectedValue:n,onChange:w}),e.jsx(L,{size:m.medium_16}),e.jsxs(U,{tag:"label",style:[re.row,re.truncatedWidth],children:["fill",e.jsx(L,{size:m.xxSmall_6}),e.jsx(he,{selectedValue:t,onChange:g=>k({fillStyle:g}),placeholder:"",children:Object.keys(za).map(g=>e.jsx(D,{value:g,label:g},g))})]})]}),e.jsx(ia,{selectedValue:o,onChange:g=>k({strokeStyle:g}),containerStyle:re.spaceUnder}),e.jsx(vn,{selectedValue:s,onChange:g=>k({weight:g}),containerStyle:re.spaceUnder}),e.jsx(an,{label:"show vertices",checked:a,onChange:g=>k({showVertices:g}),style:re.spaceUnder}),e.jsxs(be,{header:e.jsx(W,{children:"Points"}),expanded:!0,containerStyle:re.pointAccordionContainer,panelStyle:re.pointAccordionPanel,children:[r.map((g,p)=>{const v=String.fromCharCode(65+p);return e.jsxs(x,{style:[re.row,re.spaceUnder],children:[e.jsx(W,{children:`${v}:`}),e.jsx(L,{size:m.medium_16}),e.jsx(te,{coord:g,labels:["x","y"],onChange:S=>{const q=[...r];q[p]=S,i.onChangeProps({points:q})}}),r.length>3&&e.jsx(ce,{"aria-label":`Delete polygon point ${v}`,icon:Nu,kind:"tertiary",actionType:"destructive",onClick:()=>{const S=[...r];S.splice(p,1),i.onChangeProps({points:S})},style:re.icon})]},`locked-polygon-point-index-${p}`)}),e.jsxs(x,{style:[re.row,re.polygonActionsContainer],children:[e.jsx(ne,{kind:"tertiary",startIcon:rn,onClick:()=>{i.onChangeProps({points:[...r,[0,0]]})},children:"Add point"}),e.jsx(wn,{}),e.jsxs(x,{style:re.movementButtonsContainer,children:[e.jsx(ce,{"aria-label":"Move polygon up",size:"small",icon:Pu,kind:"tertiary",onClick:()=>_("up")}),e.jsxs(x,{style:re.row,children:[e.jsx(ce,{"aria-label":"Move polygon left",size:"small",icon:Au,kind:"tertiary",onClick:()=>_("left")}),e.jsx(ce,{"aria-label":"Move polygon down",size:"small",icon:Su,kind:"tertiary",onClick:()=>_("down")}),e.jsx(ce,{"aria-label":"Move polygon right",size:"small",icon:ju,kind:"tertiary",onClick:()=>_("right")})]})]})]})]}),e.jsx(L,{size:m.small_12}),e.jsx(x,{style:re.horizontalRule}),e.jsx(sn,{ariaLabel:d,getPrepopulatedAriaLabel:f,onChangeProps:g=>{k(g)}}),e.jsx(L,{size:m.xxxSmall_4}),e.jsx(x,{style:re.horizontalRule}),e.jsx(L,{size:m.small_12}),e.jsx(U,{children:"Visible labels"}),u.map((g,p)=>h.createElement(Xe,{...g,key:p,expanded:!0,onChangeProps:v=>{P(v,p)},onRemove:()=>{N(p)},containerStyle:re.labelContainer})),e.jsx(ne,{kind:"tertiary",startIcon:rn,onClick:()=>{const g={...ze("label"),coord:[r[0][0],r[0][1]-u.length],color:n};k({labels:[...u,g]})},style:re.addButton,children:"Add visible label"}),e.jsx(Ke,{figureType:i.type,onMove:C,onRemove:A})]})},re=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},pointAccordionContainer:{backgroundColor:O.white},pointAccordionPanel:{alignItems:"start"},icon:{marginInlineStart:m.xxxSmall_4},polygonActionsContainer:{width:"100%"},movementButtonsContainer:{display:"flex",flexDirection:"column",alignItems:"center",minWidth:"fit-content"},spaceUnder:{marginBottom:m.xSmall_8},truncatedWidth:{minWidth:0},addButton:{alignSelf:"start"},labelContainer:{backgroundColor:O.white},horizontalRule:{height:1,backgroundColor:O.offBlack16}});wi.__docgenInfo={description:"",methods:[],displayName:"LockedPolygonSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},type:{required:!0,tsType:{name:"literal",value:'"polygon"'},description:""},points:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],raw:"Coord[]"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},showVertices:{required:!0,tsType:{name:"boolean"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedPolygonType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedPolygonType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."}}};const Iu="The vector cannot have length 0.",fi=i=>{const{points:r,color:n,weight:a,labels:t,ariaLabel:o,onChangeProps:s,onMove:u,onRemove:d}=i,[c,b]=r,k=`Vector (${c[0]}, ${c[1]}), (${b[0]}, ${b[1]})`,C=Ct(c,b);async function A(){const N=await Be(t),g=await ge(`$${c[0]}$`),p=await ge(`$${c[1]}$`),v=await ge(`$${b[0]}$`),S=await ge(`$${b[1]}$`);let q=`Vector${N} from ${g} comma ${p} to ${v} comma ${S}`;const j=kn(n,"solid",void 0,a);return q+=j,q}function f(N,g){if(typeof N<"u"){const p=[...r];p[g]=[...N];const v=qe.midpoint(c,b),S=qe.midpoint(p[0],p[1]),q=qe.sub(S,v),j=t.map(F=>({...F,coord:qe.add(F.coord,q)}));s({points:p,labels:j})}}function w(N){const g={color:N};g.labels=t.map(p=>({...p,color:N})),s(g)}function _(N,g){const p=[...t];p[g]={...t[g],...N},s({labels:p})}function P(N){const g=t.filter((p,v)=>v!==N);s({labels:g})}return e.jsxs(be,{expanded:i.expanded,onToggle:i.onToggle,header:e.jsxs(x,{style:Ce.row,children:[e.jsx(W,{children:k}),e.jsx(L,{size:m.xSmall_8}),e.jsx(Va,{color:n,lineStyle:"solid"})]}),children:[e.jsx(Ue,{selectedValue:n,onChange:w,style:{marginBottom:T.size_080}}),e.jsx(vn,{selectedValue:a,onChange:N=>s({weight:N})}),C&&e.jsx(U,{style:Ce.errorText,children:Iu}),e.jsx(be,{expanded:!0,containerStyle:Ce.container,panelStyle:Ce.accordionPanel,header:e.jsx(x,{style:Ce.row,children:e.jsx(W,{children:`Tail (${c[0]}, ${c[1]})`})}),children:e.jsx(te,{coord:c,error:C,onChange:N=>{f(N,0)}})}),e.jsx(be,{expanded:!0,containerStyle:Ce.container,panelStyle:Ce.accordionPanel,header:e.jsx(x,{style:Ce.row,children:e.jsx(W,{children:`Tip (${b[0]}, ${b[1]})`})}),children:e.jsx(te,{coord:b,error:C,onChange:N=>{f(N,1)}})}),e.jsx(L,{size:m.small_12}),e.jsx(x,{style:Ce.horizontalRule}),e.jsx(sn,{ariaLabel:o,getPrepopulatedAriaLabel:A,onChangeProps:N=>{s(N)}}),e.jsx(L,{size:m.xxxSmall_4}),e.jsx(x,{style:Ce.horizontalRule}),e.jsx(L,{size:m.small_12}),e.jsx(U,{children:"Visible labels"}),t.map((N,g)=>h.createElement(Xe,{...N,key:g,expanded:!0,onChangeProps:p=>{_(p,g)},onRemove:()=>{P(g)},containerStyle:Ce.labelContainer})),e.jsx(ne,{kind:"tertiary",startIcon:rn,onClick:()=>{const N=[0,-1],g=qe.add(qe.scale(N,t.length),qe.midpoint(c,b)),p={...ze("label"),coord:g,color:n};s({labels:[...t,p]})},style:Ce.addButton,children:"Add visible label"}),e.jsx(Ke,{figureType:i.type,onMove:u,onRemove:d})]})},Ce=R.StyleSheet.create({accordionPanel:{paddingBottom:m.medium_16},container:{marginTop:m.xSmall_8,marginBottom:0,marginLeft:-4,marginRight:-4,backgroundColor:O.white},errorText:{color:O.red,marginTop:m.xSmall_8},row:{flexDirection:"row",alignItems:"center"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:O.offBlack16},labelContainer:{backgroundColor:O.white}});fi.__docgenInfo={description:"",methods:[],displayName:"LockedVectorSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"vector"'},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFigure>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const vi=i=>{switch(i.type){case"point":return e.jsx(La,{...i});case"line":return e.jsx(yi,{...i});case"vector":return e.jsx(fi,{...i});case"ellipse":return e.jsx(hi,{...i});case"polygon":return e.jsx(wi,{...i});case"function":return e.jsx(gi,{...i});case"label":return e.jsx(Xe,{...i});default:throw new fn(i)}};vi.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."}}};const ki=i=>{const r=Array((i.figures??[]).length).fill(!1),[n,a]=h.useState(r),[t,o]=h.useState(!0),s=h.useId(),{figures:u,onChange:d}=i;function c(P){const g={lockedFigures:[...u||[],ze(P)]};d(g),a([...n,!0])}function b(P,N){if(P===0&&(N==="back"||N==="backward")||u&&P===u.length-1&&(N==="front"||N==="forward"))return;const p=[...u||[]],v=[...n],[S]=p.splice(P,1);switch(v.splice(P,1),N){case"back":p.unshift(S),v.unshift(!0);break;case"backward":p.splice(P-1,0,S),v.splice(P-1,0,!0);break;case"forward":p.splice(P+1,0,S),v.splice(P+1,0,!0);break;case"front":p.push(S),v.push(!0);break}d({lockedFigures:p}),a(v)}function k(P){if(window.confirm("Are you sure you want to delete this figure?")){const N=u||[];d({lockedFigures:[...N.slice(0,P),...N.slice(P+1)]});const g=[...n];g.splice(P,1),a(g)}}function C(P,N){const g=u||[],p={lockedFigures:[...g.slice(0,P),{...g[P],...N},...g.slice(P+1)]};d(p)}function A(P){a(Array(u==null?void 0:u.length).fill(P))}const f=n.every(P=>!P),w=f?"Expand all":"Collapse all",_=!!(u!=null&&u.length);return e.jsxs(e.Fragment,{children:[e.jsx(_e,{title:"Locked Figures",isOpen:t,onToggle:()=>o(!t),isCollapsible:!0}),t&&e.jsxs(x,{children:[u==null?void 0:u.map((P,N)=>e.jsx(vi,{expanded:n[N],onToggle:g=>{const p=[...n];p[N]=g,a(p)},...P,onChangeProps:g=>C(N,g),onMove:g=>b(N,g),onRemove:()=>k(N)},`${s}-locked-${P}-${N}`)),e.jsxs(x,{style:ur.buttonContainer,children:[e.jsx(li,{id:`${s}-select`,onChange:c}),e.jsx(L,{size:m.small_12}),_&&e.jsx(ne,{kind:"secondary",onClick:()=>A(f),style:ur.button,children:w})]})]})]})},ur=R.StyleSheet.create({buttonContainer:{flexDirection:"row",alignItems:"center"},button:{marginTop:m.xSmall_8,flexGrow:1}});ki.__docgenInfo={description:"",methods:[],displayName:"LockedFiguresSection",props:{figures:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<InteractiveGraphEditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation?: AxisLabelLocation;
    /**
     * The range of the graph in the x and y directions.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the \`aria-description\` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's \`aria-describedby\` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["userInput"];
    onChange: (props: Partial<Props>) => void;
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
>`,required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!1},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}}],required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<InteractiveGraphEditorProps>"},name:"props"}],return:{name:"void"}}},description:""}}};const Lu=""+new URL("arrow-counter-clockwise-bold-BmDV9QhN.svg",import.meta.url).href,{getClockwiseAngle:Ru}=xt;function Fu(i){if("startCoords"in i)return i.startCoords}function Ou(i,r,n){switch(i.type){case"linear":case"ray":return Hr({...i,startCoords:void 0},r,n);case"segment":return Br({...i,startCoords:void 0},r,n);case"linear-system":return Gr({...i,startCoords:void 0},r,n);case"circle":const a=$r({...i,startCoords:void 0}),t=Vr(Wr(a.radiusPoint,a.center));return{center:a.center,radius:t};case"sinusoid":return Mr({...i,startCoords:void 0},r,n);case"quadratic":return Dr({...i,startCoords:void 0},r,n);case"point":return zr({...i,startCoords:void 0},r,n);case"polygon":return _r({...i,startCoords:void 0},r,n);case"angle":return Er({graph:{...i,startCoords:void 0},range:r,step:n});default:return}}const Eu=i=>{const r=i[0],n=i[1],a=n[1]-r[1],t=Math.PI/(2*(n[0]-r[0])),o=r[0]*t,s=r[1];return"y = "+a.toFixed(3)+"sin("+t.toFixed(3)+"x - "+o.toFixed(3)+") + "+s.toFixed(3)},_u=i=>{const r=i[0],n=i[1],a=i[2],t=(r[0]-n[0])*(r[0]-a[0])*(n[0]-a[0]);if(t===0)return"Division by zero error";const o=(a[0]*(n[1]-r[1])+n[0]*(r[1]-a[1])+r[0]*(a[1]-n[1]))/t,s=(a[0]*a[0]*(r[1]-n[1])+n[0]*n[0]*(a[1]-r[1])+r[0]*r[0]*(n[1]-a[1]))/t,u=(n[0]*a[0]*(n[0]-a[0])*r[1]+a[0]*r[0]*(a[0]-r[0])*n[1]+r[0]*n[0]*(r[0]-n[0])*a[1])/t;return"y = "+o.toFixed(3)+"x^2 + "+s.toFixed(3)+"x + "+u.toFixed(3)},zu=(i,r=!1)=>{const n=i[1];return`${Ru(i,r).toFixed(0)}° angle at (${n[0]}, ${n[1]})`},Du=(i,r)=>{if(r)return!1;switch(i.type){case"point":return i.numPoints!=="unlimited";case"polygon":return i.numSides!=="unlimited"&&i.snapTo!=="angles"&&i.snapTo!=="sides";case"none":return!1;case"angle":case"circle":case"linear":case"linear-system":case"quadratic":case"ray":case"segment":case"sinusoid":return!0;default:throw new fn(i)}},xi=i=>{const{startCoords:r,allowReflexAngles:n,onChange:a}=i;return e.jsxs(e.Fragment,{children:[e.jsxs(x,{style:jn.equationSection,children:[e.jsx(U,{children:"Starting equation:"}),e.jsx(_a,{style:jn.equationBody,children:zu(r,n)})]}),e.jsxs(x,{style:jn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[0],labels:["x","y"],onChange:t=>a([t,r[1],r[2]])})]}),e.jsxs(x,{style:jn.tile,children:[e.jsx(W,{children:"Vertex:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[1],labels:["x","y"],onChange:t=>a([r[0],t,r[2]])})]}),e.jsxs(x,{style:jn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[2],labels:["x","y"],onChange:t=>a([r[0],r[1],t])})]})]})},jn=R.StyleSheet.create({tile:{backgroundColor:O.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:O.fadedOffBlack8,border:`1px solid ${O.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Ge.size.xSmall}});xi.__docgenInfo={description:"",methods:[],displayName:"StartCoordsAngle",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: AngleCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Ci=i=>{const{startCoords:r,onChange:n}=i,[a,t]=h.useState(r.radius.toString());h.useEffect(()=>{t(r.radius.toString())},[r.radius]);function o(s){t(s),!(isNaN(+s)||s===""||+s==0)&&n({center:r.center,radius:parseFloat(s)})}return e.jsxs(x,{style:ha.tile,children:[e.jsxs(x,{style:ha.row,children:[e.jsx(W,{children:"Center:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r.center,labels:["x","y"],onChange:s=>n({center:s,radius:r.radius})})]}),e.jsx(L,{size:m.small_12}),e.jsxs(W,{tag:"label",style:ha.row,children:["Radius:",e.jsx(L,{size:m.small_12}),e.jsx(na,{value:a,onChange:o,style:ha.textField})]})]})},ha=R.StyleSheet.create({tile:{backgroundColor:O.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64}});Ci.__docgenInfo={description:"",methods:[],displayName:"StartCoordsCircle",props:{startCoords:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CircleCoords) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},name:"startCoords"}],return:{name:"void"}}},description:""}}};const qi=i=>{const{startCoords:r,onChange:n}=i;return e.jsxs(e.Fragment,{children:[e.jsxs(x,{style:dr.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[0],labels:["x","y"],onChange:a=>n([a,r[1]])})]}),e.jsxs(x,{style:dr.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[1],labels:["x","y"],onChange:a=>n([r[0],a])})]})]})},dr=R.StyleSheet.create({tile:{backgroundColor:O.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"}});qi.__docgenInfo={description:"",methods:[],displayName:"StartCoordsLine",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Ti=i=>{const{startCoords:r,type:n,onChange:a}=i,t=n==="segment"?"Segment":"Line";return e.jsx(e.Fragment,{children:r.map((o,s)=>e.jsxs(be,{header:e.jsx(W,{children:`${t} ${s+1}`}),expanded:!0,children:[e.jsxs(x,{style:mr.nestedTile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:o[0],labels:["x","y"],onChange:u=>{const d=[...r];d[s]=[u,o[1]],a(d)}})]}),e.jsxs(x,{style:mr.nestedTile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:o[1],labels:["x","y"],onChange:u=>{const d=[...r];d[s]=[o[0],u],a(d)}})]})]},`segment-${s}-start-coords`))})},mr=R.StyleSheet.create({nestedTile:{paddingBottom:m.small_12,flexDirection:"row",alignItems:"center"}});Ti.__docgenInfo={description:"",methods:[],displayName:"StartCoordsMultiline",props:{type:{required:!0,tsType:{name:"union",raw:'"linear-system" | "segment"',elements:[{name:"literal",value:'"linear-system"'},{name:"literal",value:'"segment"'}]},description:""},startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Si=i=>{const{startCoords:r,onChange:n}=i;return e.jsx(e.Fragment,{children:r.map((a,t)=>e.jsxs(x,{style:Mu.tile,children:[e.jsx(W,{children:`Point ${t+1}:`}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:a,labels:["x","y"],onChange:o=>{const s=[...r];s[t]=o,n(s)}})]},t))})},Mu=R.StyleSheet.create({tile:{backgroundColor:O.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"}});Si.__docgenInfo={description:"",methods:[],displayName:"StartCoordsPoint",props:{startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"Coord[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: Coord[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"Coord[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Ai=i=>{const{startCoords:r,onChange:n}=i;return e.jsxs(e.Fragment,{children:[e.jsxs(x,{style:Pn.equationSection,children:[e.jsx(U,{children:"Starting equation:"}),e.jsx(_a,{style:Pn.equationBody,children:_u(r)})]}),e.jsxs(x,{style:Pn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[0],labels:["x","y"],onChange:a=>n([a,r[1],r[2]])})]}),e.jsxs(x,{style:Pn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[1],labels:["x","y"],onChange:a=>n([r[0],a,r[2]])})]}),e.jsxs(x,{style:Pn.tile,children:[e.jsx(W,{children:"Point 3:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[2],labels:["x","y"],onChange:a=>n([r[0],r[1],a])})]})]})},Pn=R.StyleSheet.create({tile:{backgroundColor:O.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:O.fadedOffBlack8,border:`1px solid ${O.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Ge.size.xSmall}});Ai.__docgenInfo={description:"",methods:[],displayName:"StartCoordsQuadratic",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: [Coord, Coord, Coord]) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const ji=i=>{const{startCoords:r,onChange:n}=i;return e.jsxs(e.Fragment,{children:[e.jsxs(x,{style:ga.equationSection,children:[e.jsx(U,{children:"Starting equation:"}),e.jsx(_a,{style:ga.equationBody,children:Eu(r)})]}),e.jsxs(x,{style:ga.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[0],labels:["x","y"],onChange:a=>n([a,r[1]])})]}),e.jsxs(x,{style:ga.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(L,{size:m.small_12}),e.jsx(te,{coord:r[1],labels:["x","y"],onChange:a=>n([r[0],a])})]})]})},ga=R.StyleSheet.create({tile:{backgroundColor:O.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:O.fadedOffBlack8,border:`1px solid ${O.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Ge.size.xSmall}});ji.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSinusoid",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: SinusoidCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const $u=i=>{const{type:r,range:n,step:a,allowReflexAngles:t,onChange:o}=i;switch(r){case"linear":case"ray":const s=Hr(i,n,a);return e.jsx(qi,{startCoords:s,onChange:o});case"linear-system":case"segment":const u=r==="segment"?Br(i,n,a):Gr(i,n,a);return e.jsx(Ti,{type:r,startCoords:u,onChange:o});case"circle":const d=$r(i),c=Vr(Wr(d.radiusPoint,d.center));return e.jsx(Ci,{startCoords:{center:d.center,radius:c},onChange:o});case"sinusoid":const b=Mr(i,n,a);return e.jsx(ji,{startCoords:b,onChange:o});case"quadratic":const k=Dr(i,n,a);return e.jsx(Ai,{startCoords:k,onChange:o});case"point":case"polygon":const C=r==="point"?zr(i,n,a):_r(i,n,a);return e.jsx(Si,{startCoords:C,onChange:o});case"angle":const A=Er({graph:i,range:n,step:a});return e.jsx(xi,{startCoords:A,allowReflexAngles:t,onChange:o});default:return null}},Pi=i=>{const{range:r,step:n,onChange:a}=i,[t,o]=h.useState(!0);return e.jsxs(x,{children:[e.jsx(_e,{isCollapsible:!0,title:"Start coordinates",isOpen:t,onToggle:()=>o(!t)}),t&&e.jsxs(e.Fragment,{children:[e.jsx($u,{...i}),e.jsx(L,{size:m.small_12}),e.jsx(ne,{startIcon:Lu,kind:"tertiary",size:"small",onClick:()=>{a(Ou(i,r,n))},children:"Use default start coordinates"})]})]})};Pi.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSettings",props:{range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: StartCoords) => void",signature:{arguments:[{type:{name:'Extract["startCoords"]',raw:`Extract<
    PerseusGraphType,
    GraphTypesThatHaveStartCoords
>["startCoords"]`},name:"startCoords"}],return:{name:"void"}}},description:""}}};const{InfoTip:Ze}=G,it=_o.widget,Vu=y.map(y.range(3,13),function(i){return e.jsx(D,{value:`${i}`,label:`${i} sides`},`polygon-sides-${i}`)});class Ra extends h.Component{constructor(){super(...arguments);l(this,"displayName","InteractiveGraphEditor");l(this,"className","perseus-widget-interactive-graph");l(this,"changeStartCoords",n=>{var t;if(!((t=this.props.graph)!=null&&t.type))return;const a={...this.props.graph,startCoords:n};this.props.onChange({graph:a})});l(this,"getSaveWarnings",()=>{var a;const n=[];for(const t of this.props.lockedFigures??[])t.type==="line"&&Ct(t.points[0].coord,t.points[1].coord)&&n.push("The line cannot have length 0.");return((a=this.props.graph)==null?void 0:a.type)==="polygon"&&this.props.graph.numSides==="unlimited"&&this.props.graph.coords===null&&n.push("Polygon must be closed."),n})}serialize(){const n=y.pick(this.props,"step","backgroundImage","markings","labels","labelLocation","showProtractor","showTooltips","range","gridStep","snapStep","lockedFigures","fullGraphAriaLabel","fullGraphAriaDescription"),a=this.refs.graph;if(a){const t=a&&a.getUserInput();y.extend(n,{graph:{type:t.type,startCoords:this.props.graph&&Fu(this.props.graph)},correct:t}),y.each(["allowReflexAngles","angleOffsetDeg","numPoints","numSides","numSegments","showAngles","showSides","snapTo","snapDegrees"],function(o){y.has(t,o)&&(n.graph[o]=t[o])})}return n}render(){let n,a;const t=this.props.gridStep||ue.getGridStep(this.props.range,this.props.step,Jn.defaultBoxSize),o=this.props.snapStep||ue.snapStepFromGridStep(t),s=jr.SMALL;if(this.props.valid===!0){const u=this.props.correct,d={ref:"graph",box:this.props.box,range:this.props.range,labels:this.props.labels,labelLocation:this.props.labelLocation,step:this.props.step,gridStep:t,snapStep:o,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,lockedFigures:this.props.lockedFigures,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,trackInteraction:function(){},userInput:u,handleUserInput:c=>{let b=this.props.correct;ie(c!=null),b.type===c.type?b=Wu(b,c):b=c,this.props.onChange({correct:b,graph:this.props.graph})}};n=e.jsx(it,{...d,containerSizeClass:s,apiOptions:{...this.props.apiOptions,isMobile:!1}}),a=it.getEquationString(d)}else n=e.jsx("div",{className:"perseus-error",children:this.props.valid});return e.jsx(Qn,{children:u=>{var d,c,b,k,C,A,f,w,_,P,N,g,p,v,S,q;return e.jsxs(x,{children:[e.jsx(le,{label:"Answer type:",children:e.jsx(ti,{graphType:((d=this.props.graph)==null?void 0:d.type)??it.defaultProps.userInput.type,onChange:j=>{this.props.onChange({graph:{type:j},correct:{type:j}})}})}),e.jsx(ii,{ariaLabelValue:this.props.fullGraphAriaLabel??"",ariaDescriptionValue:this.props.fullGraphAriaDescription??"",onChange:this.props.onChange}),e.jsx(ri,{id:u,equationString:a,children:n}),((c=this.props.correct)==null?void 0:c.type)==="point"&&e.jsx(le,{label:"Number of Points:",children:e.jsx(ai,{numPoints:(b=this.props.correct)==null?void 0:b.numPoints,onChange:j=>{this.props.onChange({correct:{type:"point",numPoints:j},graph:{type:"point",numPoints:j}})}})}),((k=this.props.correct)==null?void 0:k.type)==="angle"&&e.jsxs(e.Fragment,{children:[e.jsxs(x,{style:Ve.row,children:[e.jsx(ae,{label:e.jsx(We,{children:"Show angle measures"}),checked:!!((C=this.props.correct)!=null&&C.showAngles),onChange:j=>{var F;((F=this.props.graph)==null?void 0:F.type)==="angle"&&(ie(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:j},graph:{...this.props.graph,showAngles:j}}))}}),e.jsx(Ze,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(x,{style:Ve.row,children:[e.jsx(ae,{label:e.jsx(We,{children:"Allow reflex angles"}),checked:!!((A=this.props.correct)!=null&&A.allowReflexAngles),onChange:j=>{var B,Z;ie(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),ie(((B=this.props.graph)==null?void 0:B.type)==="angle",`Expected graph type to be angle, but got ${(Z=this.props.graph)==null?void 0:Z.type}`);const F={allowReflexAngles:j};this.props.onChange({correct:{...this.props.correct,...F},graph:{...this.props.graph,...F}})}}),e.jsx(Ze,{children:e.jsx("p",{children:"Allow students to be able to create reflex angles."})})]})]}),((f=this.props.correct)==null?void 0:f.type)==="polygon"&&e.jsxs(e.Fragment,{children:[e.jsx(le,{label:"Number of sides:",children:e.jsx(he,{selectedValue:(w=this.props.correct)!=null&&w.numSides?`${this.props.correct.numSides}`:"3",placeholder:"",onChange:j=>{var B;ie(((B=this.props.graph)==null?void 0:B.type)==="polygon");const F={numSides:ni(j),coords:void 0,startCoords:void 0,snapTo:"grid"};this.props.onChange({correct:{...this.props.correct,...F},graph:{...this.props.graph,...F}})},style:Ve.singleSelectShort,children:[...Vu,e.jsx(D,{value:"unlimited",label:"unlimited sides"},"unlimited")]},"polygon-select")}),e.jsxs(le,{label:"Snap to:",children:[e.jsxs(he,{selectedValue:((_=this.props.correct)==null?void 0:_.snapTo)||"grid",placeholder:"",onChange:j=>{var B,Z;ie(this.props.correct.type==="polygon",`Expected correct answer type to be polygon, but got ${this.props.correct.type}`),ie(((B=this.props.graph)==null?void 0:B.type)==="polygon",`Expected graph type to be polygon, but got ${(Z=this.props.graph)==null?void 0:Z.type}`);const F={snapTo:j,coords:null};this.props.onChange({correct:{...this.props.correct,...F},graph:{...this.props.graph,...F}})},style:Ve.singleSelectShort,children:[e.jsx(D,{value:"grid",label:"grid"}),((P=this.props.correct)==null?void 0:P.numSides)!=="unlimited"&&e.jsx(D,{value:"angles",label:"interior angles"}),((N=this.props.correct)==null?void 0:N.numSides)!=="unlimited"&&e.jsx(D,{value:"sides",label:"side measures"})]}),e.jsxs(Ze,{children:[e.jsx("p",{children:"These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."}),e.jsx("p",{children:"The interior angle and side measure options guide the points to the nearest whole angle or side measure respectively."})]})]}),e.jsxs(x,{style:Ve.row,children:[e.jsx(ae,{label:e.jsx(We,{children:"Show angle measures"}),checked:!!((g=this.props.correct)!=null&&g.showAngles),onChange:()=>{var j;((j=this.props.graph)==null?void 0:j.type)==="polygon"&&(ie(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:!this.props.correct.showAngles},graph:{...this.props.graph,showAngles:!this.props.graph.showAngles}}))}}),e.jsx(Ze,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(x,{style:Ve.row,children:[e.jsx(ae,{label:e.jsx(We,{children:"Show side measures"}),checked:!!((p=this.props.correct)!=null&&p.showSides),onChange:()=>{var j;((j=this.props.graph)==null?void 0:j.type)==="polygon"&&this.props.correct.type==="polygon"&&this.props.onChange({correct:{...this.props.correct,showSides:!this.props.correct.showSides},graph:{...this.props.graph,showSides:!this.props.graph.showSides}})}}),e.jsx(Ze,{children:e.jsx("p",{children:"Displays the side lengths."})})]})]}),((v=this.props.correct)==null?void 0:v.type)==="segment"&&e.jsx(le,{label:"Number of segments:",children:e.jsx(si,{numSegments:(S=this.props.correct)==null?void 0:S.numSegments,onChange:j=>{this.props.onChange({correct:{type:"segment",numSegments:j,coords:null},graph:{type:"segment",numSegments:j}})}})}),((q=this.props.graph)==null?void 0:q.type)&&Du(this.props.graph,this.props.static)&&e.jsx(Pi,{...this.props.graph,range:this.props.range,step:this.props.step,onChange:this.changeStartCoords}),e.jsx(oi,{graphId:u,correct:this.props.correct,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,lockedFigures:this.props.lockedFigures}),e.jsx(Ia,{box:Ar(s),range:this.props.range,labels:this.props.labels,labelLocation:this.props.labelLocation,step:this.props.step,gridStep:t,snapStep:o,valid:this.props.valid,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,onChange:this.props.onChange}),this.props.correct.type==="polygon"&&e.jsxs(le,{label:"Student answer must",children:[e.jsxs(he,{selectedValue:this.props.correct.match||"exact",onChange:j=>{ie(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`);const F={...this.props.correct,match:j};this.props.onChange({correct:F})},placeholder:"",style:Ve.singleSelectShort,children:[e.jsx(D,{value:"exact",label:"match exactly"}),e.jsx(D,{value:"congruent",label:"be congruent"}),e.jsx(D,{value:"approx",label:"be approximately congruent"}),e.jsx(D,{value:"similar",label:"be similar"})]}),e.jsx(Ze,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Match Exactly:"})," Match exactly in size, orientation, and location on the grid even if it is not shown in the background."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Congruent:"})," Be congruent in size and shape, but can be located anywhere on the grid."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Approximately Congruent:"})," ","Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid."," ",e.jsx("em",{children:"Use this with snapping to angle measure."})]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Similar:"})," Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."]})})]})})]}),this.props.correct.type==="angle"&&e.jsxs(le,{label:"Student answer must",children:[e.jsxs(he,{selectedValue:this.props.correct.match||"exact",onChange:j=>{ie(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,match:j}})},placeholder:"",style:Ve.singleSelectShort,children:[e.jsx(D,{value:"exact",label:"match exactly"}),e.jsx(D,{value:"congruent",label:"be congruent"})]}),e.jsx(Ze,{children:e.jsx("p",{children:"Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."})})]}),e.jsx(ki,{figures:this.props.lockedFigures,onChange:this.props.onChange})]})}})}}l(Ra,"widgetName","interactive-graph"),l(Ra,"defaultProps",{...Eo.defaultWidgetOptions,valid:!0,lockedFigures:[]});function Wu(i,r){if(i.type!==r.type)throw new Error(`Cannot merge graphs with different types (${i.type} and ${r.type})`);switch(i.type){case"angle":return ie(r.type==="angle"),{...i,...r};case"circle":return ie(r.type==="circle"),{...i,...r};case"linear":return ie(r.type==="linear"),{...i,...r};case"linear-system":return ie(r.type==="linear-system"),{...i,...r};case"none":return ie(r.type==="none"),{...i,...r};case"point":return ie(r.type==="point"),{...i,...r};case"polygon":return ie(r.type==="polygon"),{...i,...r};case"quadratic":return ie(r.type==="quadratic"),{...i,...r};case"ray":return ie(r.type==="ray"),{...i,...r};case"segment":return ie(r.type==="segment"),{...i,...r};case"sinusoid":return ie(r.type==="sinusoid"),{...i,...r};default:throw new fn(i)}}const Ve=R.StyleSheet.create({singleSelectShort:{height:26},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center"}});Ra.__docgenInfo={description:`An editor for the InteractiveGraph widget, which allows the user to
specify the graph's properties and the correct answer.

Used in the exercise editor.`,methods:[{name:"changeStartCoords",docblock:null,modifiers:[],params:[{name:"coords",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    // Where the little black axis lines & labels (ticks) should render.
    // Also known as the tick step. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    step: [number, number];
    // Where the grid lines on the graph will render. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    gridStep?: [x: number, y: number];
    // Where the graph points will lock to when they are dragged. default [0.5, 0.5]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    snapStep?: [x: number, y: number];
    // An optional image to use in the background
    backgroundImage?: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     */
    markings: MarkingsType;
    // How to label the X and Y axis.  default: ["x", "y"]
    labels?: string[];
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation?: AxisLabelLocation;
    // Whether to show the Protractor tool overlayed on top of the graph
    showProtractor: boolean;
    /**
     * Whether to show the Ruler tool overlayed on top of the graph.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    showRuler?: boolean;
    // Whether to show tooltips on the graph
    showTooltips?: boolean;
    /**
     * The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
     * "yd", "mi".
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerLabel?: string;
    /**
     * How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
     * an integer.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerTicks?: number;
    // The X and Y coordinate ranges for the view of the graph.  default: [[-10, 10], [-10, 10]]
    // NOTE(kevinb): perseus_data.go defines this as Array<Array<number>>
    // TODO(kevinb): Add a transform function to interactive-graph.jsx to
    // rename \`range\` to \`ranges\` so that things are less confusing.
    range: GraphRange;
    // The type of graph
    graph: PerseusGraphType;
    // The correct kind of graph, if being used to select function type
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    // Shapes (points, chords, etc) displayed on the graph that cannot
    // be moved by the user.
    lockedFigures: LockedFigure[];
    // Aria label that applies to the entire graph.
    fullGraphAriaLabel?: string;
    // Aria description that applies to the entire graph.
    fullGraphAriaDescription?: string;
}`,signature:{properties:[{key:"step",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!1}},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:"The type of markings to display on the graph."},{key:"labels",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!1},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"showProtractor",value:{name:"boolean",required:!0}},{key:"showRuler",value:{name:"boolean",required:!1},description:`Whether to show the Ruler tool overlayed on top of the graph.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"showTooltips",value:{name:"boolean",required:!1}},{key:"rulerLabel",value:{name:"string",required:!1},description:`The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
"yd", "mi".
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"rulerTicks",value:{name:"number",required:!1},description:`How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
an integer.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"range",value:{name:"tuple",raw:`[
    x: [min: number, max: number],
    y: [min: number, max: number],
]`,elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}}],required:!0}},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}}],required:!0}},{key:"lockedFigures",value:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"LockedFigure[]",required:!0}},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}}]}}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphEditor",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
>`},description:""},labels:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes.",defaultValue:{value:'["x", "y"]',computed:!1}},labelLocation:{required:!1,tsType:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}]},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`,defaultValue:{value:'"onAxis"',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph in the x and y directions.",defaultValue:{value:`[
    [-10, 10],
    [-10, 10],
]`,computed:!1}},step:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`,defaultValue:{value:"[1, 1]",computed:!1}},gridStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions."},snapStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions."},box:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph in pixels."},valid:{required:!1,tsType:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
    url: null,
}`,computed:!1}},markings:{required:!1,tsType:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`,defaultValue:{value:'"graph"',computed:!1}},showProtractor:{required:!1,tsType:{name:"boolean"},description:"Whether to show the protractor on the graph.",defaultValue:{value:"false",computed:!1}},showTooltips:{required:!1,tsType:{name:"boolean"},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`,defaultValue:{value:"false",computed:!1}},correct:{required:!1,tsType:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}}]}}]},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`,defaultValue:{value:`{
    type: "linear",
    coords: null,
}`,computed:!1}},lockedFigures:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>"},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`,defaultValue:{value:"[]",computed:!1}},fullGraphAriaLabel:{required:!1,tsType:{name:"string"},description:""},fullGraphAriaDescription:{required:!1,tsType:{name:"string"},description:""},graph:{required:!1,tsType:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]'},description:"The graph to display in the graph area.",defaultValue:{value:`{
    type: "linear",
}`,computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation?: AxisLabelLocation;
    /**
     * The range of the graph in the x and y directions.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the \`aria-description\` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's \`aria-describedby\` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["userInput"];
    onChange: (props: Partial<Props>) => void;
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
>`,required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!1},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!1}}]}}],required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: Coord[];
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"Coord[]",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    weight: StrokeWeight;
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"weight",value:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}}},description:""},static:{required:!1,tsType:{name:"boolean"},description:""}}};const{RangeInput:Gu}=G,Bu=zo.widget,pr=6;class $n extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"onMatrixBoardSizeChange",n=>{const a=Mo(this.props.answers);if(n[0]!==null&&n[1]!==null){n=[Math.round(Math.min(Math.max(n[0],1),pr)),Math.round(Math.min(Math.max(n[1],1),pr))];const t=y(Math.min(n[0],a[0])).times(o=>y(Math.min(n[1],a[1])).times(s=>this.props.answers[o][s]));this.props.onChange({matrixBoardSize:n,answers:t})}});l(this,"serialize",()=>Q.serialize.call(this))}render(){const n={onBlur:()=>{},onFocus:()=>{},trackInteraction:()=>{},userInput:{answers:this.props.answers},handleUserInput:a=>{this.change({answers:a.answers})},...this.props};return e.jsxs("div",{className:"perseus-matrix-editor",children:[e.jsxs("div",{className:"perseus-widget-row",children:[" ","Max matrix size:"," ",e.jsx(Gu,{value:this.props.matrixBoardSize,onChange:this.onMatrixBoardSizeChange,format:this.props.labelStyle,useArrowKeys:!0})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(Bu,{...n})}),e.jsxs("div",{className:"perseus-widget-row",children:[" ","Matrix prefix:"," ",e.jsx(Ae,{ref:"prefix",apiOptions:this.props.apiOptions,content:this.props.prefix,widgetEnabled:!1,onChange:a=>{this.change({prefix:a.content})}})]}),e.jsxs("div",{className:"perseus-widget-row",children:[" ","Matrix suffix:"," ",e.jsx(Ae,{ref:"suffix",apiOptions:this.props.apiOptions,content:this.props.suffix,widgetEnabled:!1,onChange:a=>{this.change({suffix:a.content})}})]})]})}}l($n,"propTypes",{...de,matrixBoardSize:I.arrayOf(I.number).isRequired,answers:I.arrayOf(I.arrayOf(I.number)),prefix:I.string,suffix:I.string,cursorPosition:I.arrayOf(I.number)}),l($n,"widgetName","matrix"),l($n,"defaultProps",Do.defaultWidgetOptions);$n.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onMatrixBoardSizeChange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MatrixEditor",props:{matrixBoardSize:{defaultValue:{value:"[3, 3]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1},answers:{defaultValue:{value:"[[]]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"arrayOf",value:{name:"number"}}},required:!1},prefix:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},suffix:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},cursorPosition:{defaultValue:{value:"[0, 0]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Hu,NumberInput:ya,RangeInput:Uu}=G,Ku={url:null,top:0,left:0};class Vn extends h.Component{constructor(){super(...arguments);l(this,"className","perseus-widget-measurer");l(this,"change",(...n)=>K.apply(this,n));l(this,"_changeUrl",n=>{this._changeImage("url",n.target.value)});l(this,"_changeTop",n=>{this._changeImage("top",n)});l(this,"_changeLeft",n=>{this._changeImage("left",n)});l(this,"_changeImage",(n,a)=>{const t=y.clone(this.props.image);t[n]=a,this.change("image",t)});l(this,"renderLabelChoices",n=>y.map(n,function(a){const[t,o]=a;return e.jsx("option",{value:o,children:t},o)}));l(this,"serialize",()=>Q.serialize.call(this))}render(){const n=y.extend({},Ku,this.props.image);return e.jsxs("div",{className:"perseus-widget-measurer",children:[e.jsx("div",{children:"Image displayed under protractor and/or ruler:"}),e.jsxs("div",{children:["URL:"," ",e.jsx("input",{type:"text",className:"perseus-widget-measurer-url",ref:"image-url",defaultValue:n.url,onChange:this._changeUrl}),e.jsx(Hu,{children:e.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),n.url&&e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("label",{className:"perseus-widget-left-col",children:["Pixels from top:"," ",e.jsx(ya,{placeholder:0,onChange:this._changeTop,value:n.top,useArrowKeys:!0})]}),e.jsxs("label",{className:"perseus-widget-right-col",children:["Pixels from left:"," ",e.jsx(ya,{placeholder:0,onChange:this._changeLeft,value:n.left,useArrowKeys:!0})]})]}),e.jsxs("div",{children:["Containing area [width, height]:"," ",e.jsx(Uu,{onChange:this.change("box"),value:this.props.box,useArrowKeys:!0})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ae,{label:"Show ruler",checked:this.props.showRuler,onChange:a=>{this.props.onChange({showRuler:a})}})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ae,{label:"Show protractor",checked:this.props.showProtractor,onChange:a=>{this.props.onChange({showProtractor:a})}})})]}),this.props.showRuler&&e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler label:"," ",e.jsxs("select",{onChange:a=>this.change("rulerLabel",a.target.value),value:this.props.rulerLabel,children:[e.jsx("option",{value:"",children:"None"}),e.jsx("optgroup",{label:"Metric",children:this.renderLabelChoices([["milimeters","mm"],["centimeters","cm"],["meters","m"],["kilometers","km"]])}),e.jsx("optgroup",{label:"Imperial",children:this.renderLabelChoices([["inches","in"],["feet","ft"],["yards","yd"],["miles","mi"]])})]})]})}),e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler ticks:"," ",e.jsx("select",{onChange:a=>this.change("rulerTicks",+a.target.value),value:this.props.rulerTicks,children:y.map([1,2,4,8,10,16],function(a){return e.jsx("option",{value:a,children:a},a)})})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Ruler pixels per unit:"," ",e.jsx(ya,{placeholder:40,onChange:this.change("rulerPixels"),value:this.props.rulerPixels,useArrowKeys:!0})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Ruler length in units:"," ",e.jsx(ya,{placeholder:10,onChange:this.change("rulerLength"),value:this.props.rulerLength,useArrowKeys:!0})]})})]})]})}}l(Vn,"widgetName","measurer"),l(Vn,"propTypes",{...de,box:I.arrayOf(I.number),image:I.shape({url:I.string,top:I.number,left:I.number}),showProtractor:I.bool,showRuler:I.bool,rulerLabel:I.string,rulerTicks:I.number,rulerPixels:I.number,rulerLength:I.number}),l(Vn,"defaultProps",$o.defaultWidgetOptions);Vn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_changeUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"_changeTop",docblock:null,modifiers:[],params:[{name:"newTop",optional:!1,type:null}],returns:null},{name:"_changeLeft",docblock:null,modifiers:[],params:[{name:"newLeft",optional:!1,type:null}],returns:null},{name:"_changeImage",docblock:null,modifiers:[],params:[{name:"subProp",optional:!1,type:null},{name:"newValue",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MeasurerEditor",props:{box:{defaultValue:{value:"[480, 480]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1},image:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"shape",value:{url:{name:"string",required:!1},top:{name:"number",required:!1},left:{name:"number",required:!1}}},required:!1},showProtractor:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},showRuler:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},rulerLabel:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},rulerTicks:{defaultValue:{value:"10",computed:!1},description:"",type:{name:"number"},required:!1},rulerPixels:{defaultValue:{value:"40",computed:!1},description:"",type:{name:"number"},required:!1},rulerLength:{defaultValue:{value:"10",computed:!1},description:"",type:{name:"number"},required:!1}},composes:["@khanacademy/perseus"]};const{NumberInput:Xu,TextInput:Yu}=G;class Fa extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"updateMolecule",n=>{this.change({smiles:n})});l(this,"updateRotation",n=>{this.change({rotationAngle:n})});l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:["SMILES: ",e.jsx(Yu,{onChange:this.updateMolecule,value:this.props.smiles})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Rotation (deg): ",e.jsx(Xu,{onChange:this.updateRotation,value:this.props.rotationAngle})]})})]})}}l(Fa,"propTypes",{...de,rotationAngle:I.number,smiles:I.string}),l(Fa,"widgetName","molecule-renderer");Fa.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"updateMolecule",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"updateRotation",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MoleculeWidgetEditor",props:{rotationAngle:{description:"",type:{name:"number"},required:!1},smiles:{description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Nn,NumberInput:cr,TextInput:Ju}=G,{firstNumericalParse:hr}=ue,Qu=[{title:"Integers",value:"integer",content:"6"},{title:"Decimals",value:"decimal",content:"0.75"},{title:"Proper fractions",value:"proper",content:"⅗"},{title:"Improper fractions",value:"improper",content:"⁷⁄₄"},{title:"Mixed numbers",value:"mixed",content:"1¾"},{title:"Numbers with π",value:"pi",content:"π"}],gr=i=>({value:null,status:i,message:"",simplify:"required",answerForms:[],strict:!1,maxError:null});class Wn extends h.Component{constructor(n){super(n);l(this,"change",(...n)=>K.apply(this,n));l(this,"onToggleAnswers",n=>{const a=this.state.showAnswerDetails.slice();a[n]=!a[n],this.setState({showAnswerDetails:a})});l(this,"onToggleAnswerForm",(n,a)=>{let t=[...this.props.answers[n].answerForms??[]];t.includes(a)?t=t.filter(u=>u!==a):t.push(a);const s=this.updateAnswer(n,"answerForms");s&&s(t)});l(this,"onToggleHeading",n=>()=>{const a=`show${n}`,t={...this.state};t[a]=!t[a],this.setState(t)});l(this,"onTrashAnswer",n=>{if(n>=0&&n<this.props.answers.length){const a=this.props.answers.slice(0);a.splice(n,1),this.props.onChange({answers:a})}});l(this,"onSpace",(n,a,...t)=>{n.key===" "&&(n.preventDefault(),a.apply(this,t))});l(this,"onStatusChange",n=>{const a=["wrong","ungraded","correct"],t=this.props.answers,o=a.indexOf(t[n].status),s=a[(o+1)%a.length];this.updateAnswer(n,{status:s,simplify:s==="correct"?"required":"accepted"})});l(this,"onEvaluationChange",(n,a)=>{this.updateAnswer(n,{status:a,simplify:a==="correct"?"required":"accepted"})});l(this,"updateAnswer",(n,a)=>{if(!y.isObject(a))return y.partial((o,s,u)=>{const d={};d[s]=u,this.updateAnswer(o,d)},n,a);let t=[...this.props.answers];if(n===t.length){const o=gr(this.state.lastStatus);t=t.concat(o)}t[n]=y.extend({},t[n],a),this.props.onChange({answers:t})});l(this,"addAnswer",()=>{const n=gr(this.state.lastStatus),a=this.props.answers.concat(n),t=this.state.showAnswerDetails.concat(!0);this.setState({showAnswerDetails:t}),this.props.onChange({answers:a})});l(this,"getSaveWarnings",()=>{const n=[];return y.contains(y.pluck(this.props.answers,"value"),"")&&n.push("One or more answers is empty"),this.props.answers.forEach((a,t)=>{a.strict&&(!a.answerForms||a.answerForms.length===0)&&n.push(`Answer ${t+1} is set to string format matching, but no format was selected`)}),n});l(this,"serialize",()=>Q.serialize.call(this));this.state={lastStatus:"wrong",showAnswerDetails:Array(this.props.answers.length).fill(!0),showSettings:!0,showAnswers:!0}}render(){const n=this.props.answers,a={size:"medium",role:"radio",style:{marginRight:"8px"}},t=f=>{const{kind:w,onClick:_,ariaLabel:P,children:N}=f,g=f.role??"radio",p={...a,"aria-label":P,kind:w,role:g,onClick:_};return e.jsx(fe,{...p,children:N})},o=f=>{const{answerIndex:w,answerProperty:_,value:P,children:N}=f,p=n[w][_]===P?"accent":"transparent",v={};v[_]=P;const S=f.onClick??(()=>{this.updateAnswer(w,v)});return e.jsx(t,{kind:p,onClick:S,children:N})},s=f=>e.jsxs("fieldset",{className:"perseus-widget-row unsimplified-options",children:[n[f].status!=="correct"&&e.jsx(e.Fragment,{children:e.jsx("legend",{className:"inline-options",children:"Unsimplified answers are irrelevant for this status"})}),n[f].status==="correct"&&e.jsxs(e.Fragment,{children:[e.jsx("legend",{className:"inline-options",children:"Unsimplified answers are"}),e.jsx("span",{className:"tooltip-for-legend",children:e.jsxs(Nn,{children:[e.jsx("p",{children:'Normally select "ungraded". This will give the user a message saying the answer is correct but not simplified. The user will then have to simplify it and re-enter, but will not be penalized. (5th grade and after)'}),e.jsx("p",{children:'Select "accepted" only if the user is not expected to know how to simplify fractions yet. (Anything prior to 5th grade)'}),e.jsxs("p",{children:['Select "wrong" ',e.jsx("em",{children:"only"})," if we are specifically assessing the ability to simplify."]})]})}),e.jsx("br",{}),e.jsx(o,{answerIndex:f,answerProperty:"simplify",value:"required",children:"Ungraded"}),e.jsx(o,{answerIndex:f,answerProperty:"simplify",value:"optional",children:"Accepted"}),e.jsx(o,{answerIndex:f,answerProperty:"simplify",value:"enforced",children:"Wrong"})]})]}),u=f=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Possible answer formats "}),e.jsxs(Nn,{children:[e.jsx("p",{children:'Formats will be autoselected for you based on the given answer; to show no suggested formats and accept all types, simply have a decimal/integer be the answer. Values with π will have format "pi", and values that are fractions will have some subset (mixed will be "mixed" and "proper"; improper/proper will both be "improper" and "proper"). If you would like to specify that it is only a proper fraction (or only a mixed/improper fraction), deselect the other format. Except for specific cases, you should not need to change the autoselected formats.'}),e.jsxs("p",{children:["To restrict the answer to ",e.jsx("em",{children:"only"}),' an improper fraction (i.e. 7/4), select the improper fraction and toggle "strict" to true. This ',e.jsx("b",{children:"will not"})," ","accept 1.75 as an answer."," "]}),e.jsx("p",{children:"Unless you are testing that specific skill, please do not restrict the answer format."})]}),e.jsx("br",{}),Qu.map(w=>{var g;const P=((g=n[f].answerForms)==null?void 0:g.includes(w.value))?"accent":"transparent",N=()=>{this.onToggleAnswerForm(f,w.value)};return e.jsx(t,{ariaLabel:w.title,kind:P,role:"checkbox",onClick:N,children:w.content},w.value)})]}),e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{children:"Answer formats are: "}),e.jsx(o,{answerIndex:f,answerProperty:"strict",value:!1,children:"Suggested"}),e.jsx(o,{answerIndex:f,answerProperty:"strict",value:!0,children:"Required"})]})]}),d=e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Width: "}),e.jsx(fe,{...a,kind:this.props.size==="normal"?"accent":"transparent",onClick:()=>{this.change("size")("normal")},children:"Normal (80px)"}),e.jsx(fe,{...a,kind:this.props.size==="small"?"accent":"transparent",onClick:()=>{this.change("size")("small")},children:"Small (40px)"}),e.jsx(Nn,{children:e.jsx("p",{children:'Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them.'})})]}),c=e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Alignment: "}),e.jsx(fe,{...a,kind:this.props.rightAlign?"transparent":"accent",onClick:()=>{this.props.onChange({rightAlign:!1})},children:"Left"}),e.jsx(fe,{...a,kind:this.props.rightAlign?"accent":"transparent",onClick:()=>{this.props.onChange({rightAlign:!0})},children:"Right"})]}),b=e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Aria label"}),e.jsx(Nn,{children:e.jsx("p",{children:"Text to describe this input. This will be shown to users using screenreaders."})})]}),e.jsx(Ju,{labelText:"aria label",value:this.props.labelText,onChange:this.change("labelText")})]}),k=e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Number style: "}),e.jsx(fe,{...a,kind:this.props.coefficient?"transparent":"accent",onClick:()=>{this.props.onChange({coefficient:!1})},children:"Standard"}),e.jsx(fe,{...a,kind:this.props.coefficient?"accent":"transparent",onClick:()=>{this.props.onChange({coefficient:!0})},children:"Coefficient"}),e.jsx(Nn,{children:e.jsx("p",{children:"A coefficient style number allows the student to use - for -1 and an empty string to mean 1."})})]}),C={wrong:"(address the mistake/misconception)",ungraded:"(explain in detail to avoid confusion)",correct:"(reinforce the user's understanding)"},A=()=>n.map((f,w)=>{const _=e.jsx(Ae,{apiOptions:this.props.apiOptions,content:f.message||"",placeholder:"Why is this answer "+f.status+"?	"+C[f.status],widgetEnabled:!1,onChange:S=>{"content"in S&&this.updateAnswer(w,{message:S.content})}}),P=f.status.charAt(0).toUpperCase()+f.status.slice(1),N=(f.answerForms||[]).at(-1),g=fa.toNumericString(f.value??0,N),p=f.maxError?`± ${fa.toNumericString(f.maxError,N)}`:"",v=f.value===null?"New Answer":`${P} answer: ${g} ${p}`;return e.jsx("div",{className:"perseus-widget-row answer-option",children:e.jsxs(be,{animated:!0,expanded:this.state.showAnswerDetails[w],onToggle:()=>{this.onToggleAnswers(w)},header:e.jsx(W,{children:v}),children:[e.jsxs("div",{className:"input-answer-editor-value-container"+(f.maxError?" with-max-error":""),children:[e.jsxs("label",{children:["User input:",e.jsx(cr,{value:f.value,className:"numeric-input-value",placeholder:"answer",format:y.last(f.answerForms||[]),onFormatChange:(S,q)=>{let j;q==="pi"?j=["pi"]:q==="mixed"?j=["proper","mixed"]:(q==="proper"||q==="improper")&&(j=["proper","improper"]),this.updateAnswer(w,{value:hr(S),answerForms:j})},onChange:S=>{this.updateAnswer(w,{value:hr(S)})}})]}),e.jsx("span",{className:"max-error-plusmn",children:"±"}),e.jsx(cr,{className:"max-error-input-value",placeholder:0,value:n[w].maxError,format:y.last(f.answerForms||[]),onChange:this.updateAnswer(w,"maxError")})]}),e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx("legend",{className:"inline-options",children:"Status:"}),e.jsx(o,{answerIndex:w,answerProperty:"status",value:"correct",onClick:()=>{this.onEvaluationChange(w,"correct")},children:"Correct"}),e.jsx(o,{answerIndex:w,answerProperty:"status",value:"wrong",onClick:()=>{this.onEvaluationChange(w,"wrong")},children:"Wrong"}),e.jsx(o,{answerIndex:w,answerProperty:"status",value:"ungraded",onClick:()=>{this.onEvaluationChange(w,"ungraded")},children:"Ungraded"})]}),s(w),e.jsx("div",{className:"perseus-widget-row",children:"(Articles only) Message shown to user:"}),_,u(w),e.jsx(ne,{startIcon:$a,"aria-label":`Delete ${v}`,className:"delete-item-button",onClick:()=>{this.onTrashAnswer(w)},kind:"tertiary",children:"Delete"})]})},w)});return e.jsxs("div",{className:"perseus-input-number-editor",children:[e.jsx(_e,{title:"General Settings",isCollapsible:!0,isOpen:this.state.showSettings,onToggle:this.onToggleHeading("Settings")}),e.jsx("div",{className:`perseus-editor-accordion-container ${this.state.showSettings?"expanded":"collapsed"}`,children:e.jsxs("div",{className:"perseus-editor-accordion-content",children:[d,c,k,b]})}),e.jsx(_e,{title:"Answers",isCollapsible:!0,isOpen:this.state.showAnswers,onToggle:this.onToggleHeading("Answers")}),e.jsx("div",{className:`perseus-editor-accordion-container ${this.state.showAnswers?"expanded":"collapsed"}`,children:e.jsxs("div",{className:"perseus-editor-accordion-content",children:[A(),e.jsx(ne,{kind:"tertiary",onClick:this.addAnswer,children:"Add new answer"})]})})]})}}l(Wn,"widgetName","numeric-input"),l(Wn,"displayName","NumericInputEditor"),l(Wn,"defaultProps",Vo.defaultWidgetOptions);Wn.__docgenInfo={description:`An editor for adding a numeric input widget that allows users to enter
numerical values with specific validation rules.`,methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onToggleAnswers",docblock:null,modifiers:[],params:[{name:"answerIndex",optional:!1,type:{name:"number"}}],returns:null},{name:"onToggleAnswerForm",docblock:null,modifiers:[],params:[{name:"answerIndex",optional:!1,type:{name:"number"}},{name:"answerForm",optional:!1,type:null}],returns:null},{name:"onToggleHeading",docblock:null,modifiers:[],params:[{name:"accordionName",optional:!1,type:{name:"string"}}],returns:null},{name:"onTrashAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onSpace",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null},{name:"callback",optional:!1,type:null},{name:"...args",optional:!1,type:null}],returns:null},{name:"onStatusChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onEvaluationChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newStatus",optional:!1,type:null}],returns:null},{name:"updateAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"update",optional:!1,type:null}],returns:null},{name:"addAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"NumericInputEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(results: any) => any",signature:{arguments:[{type:{name:"any"},name:"results"}],return:{name:"any"}}},description:""},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
]`,computed:!1},required:!1},size:{defaultValue:{value:'"normal"',computed:!1},required:!1},coefficient:{defaultValue:{value:"false",computed:!1},required:!1},labelText:{defaultValue:{value:'""',computed:!1},required:!1},rightAlign:{defaultValue:{value:"false",computed:!1},required:!1}}};const{InfoTip:ba,TextListEditor:yr}=G,br="normal",wr="auto",fr="horizontal",vr="vertical",kr=(i,r,n,a)=>{const t={};n&&a!==void 0&&(t[n]=a.map(c=>({content:c})));const o=n==="correctOptions"?t.correctOptions:i,s=n==="otherOptions"?t.otherOptions:r,u=[...o,...s],d=[...new Set(u.map(c=>c.content))].filter(c=>c!=="").sort().sort((c,b)=>{const k=C=>/\d/.test(C)?0:/^\$?[a-zA-Z]+\$?$/.test(C)?2:1;return k(c)-k(b)}).map(c=>({content:c}));return{...t,options:d}};class Gn extends h.Component{constructor(){super(...arguments);l(this,"onOptionsChange",(n,a,t)=>{const o=kr(this.props.correctOptions||[],this.props.otherOptions||[],n,a);this.props.onChange(o,t)});l(this,"onLayoutChange",n=>{this.props.onChange({layout:n.target.value})});l(this,"onHeightChange",n=>{this.props.onChange({height:n.target.value})});l(this,"serialize",()=>{const{options:n}=kr(this.props.correctOptions||[],this.props.otherOptions||[]);return{options:n,correctOptions:this.props.correctOptions,otherOptions:this.props.otherOptions,height:this.props.height,layout:this.props.layout}})}render(){return e.jsxs("div",{className:"perseus-widget-orderer",children:[e.jsxs("div",{children:[" ","Correct answer:"," ",e.jsx(ba,{children:e.jsx("p",{children:"Place the cards in the correct order. The same card can be used more than once in the answer but will only be displayed once at the top of a stack of identical cards."})})]}),e.jsx(yr,{options:y.pluck(this.props.correctOptions,"content"),onChange:this.onOptionsChange.bind(this,"correctOptions"),layout:this.props.layout}),e.jsxs("div",{children:[" ","Other cards:"," ",e.jsx(ba,{children:e.jsx("p",{children:"Create cards that are not part of the answer."})})]}),e.jsx(yr,{options:y.pluck(this.props.otherOptions,"content"),onChange:this.onOptionsChange.bind(this,"otherOptions"),layout:this.props.layout}),e.jsxs("div",{children:[e.jsxs("label",{children:[" ","Layout:"," ",e.jsxs("select",{value:this.props.layout,onChange:this.onLayoutChange,children:[e.jsx("option",{value:fr,children:"Horizontal"}),e.jsx("option",{value:vr,children:"Vertical"})]})]}),e.jsx(ba,{children:e.jsx("p",{children:"Use the horizontal layout for short text and small images. The vertical layout is best for longer text (e.g. proofs)."})})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" ","Height:"," ",e.jsxs("select",{value:this.props.height,onChange:this.onHeightChange,children:[e.jsx("option",{value:br,children:"Normal"}),e.jsx("option",{value:wr,children:"Automatic"})]})]}),e.jsx(ba,{children:e.jsx("p",{children:'Use "Normal" for text, "Automatic" for images.'})})]})]})}}l(Gn,"propTypes",{correctOptions:I.array,otherOptions:I.array,height:I.oneOf([br,wr]),layout:I.oneOf([fr,vr]),onChange:I.func.isRequired}),l(Gn,"widgetName","orderer"),l(Gn,"defaultProps",Wo.defaultWidgetOptions);Gn.__docgenInfo={description:"",methods:[{name:"onOptionsChange",docblock:null,modifiers:[],params:[{name:"whichOptions",optional:!1,type:null},{name:"options",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"onLayoutChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"onHeightChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"OrdererEditor",props:{correctOptions:{defaultValue:{value:'[{content: "$x$"}]',computed:!1},description:"",type:{name:"array"},required:!1},otherOptions:{defaultValue:{value:'[{content: "$y$"}]',computed:!1},description:"",type:{name:"array"},required:!1},height:{defaultValue:{value:'"normal"',computed:!1},description:"",type:{name:"enum",value:[{value:'"normal"',computed:!1},{value:'"auto"',computed:!1}]},required:!1},layout:{defaultValue:{value:'"horizontal"',computed:!1},description:"",type:{name:"enum",value:[{value:'"horizontal"',computed:!1},{value:'"vertical"',computed:!1}]},required:!1},onChange:{description:"",type:{name:"func"},required:!0}}};const{InfoTip:xr}=G;class Bn extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){const n=e.jsx(Ae,{ref:"passage-editor",apiOptions:this.props.apiOptions,content:this.props.passageText,widgetEnabled:!1,placeholder:"Type passage here...",onChange:t=>{this.change({passageText:t.content})},showWordCount:!0}),a=e.jsx(Ae,{ref:"passage-footnotes-editor",apiOptions:this.props.apiOptions,content:this.props.footnotes,widgetEnabled:!1,placeholder:"Type footnotes here...",onChange:t=>{this.change({footnotes:t.content})}});return e.jsxs("div",{className:"perseus-widget-passage-editor",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ae,{label:"Show line numbers",checked:this.props.showLineNumbers,onChange:t=>{this.props.onChange({showLineNumbers:t})}})}),e.jsxs("div",{children:["Passage title:",e.jsx(xr,{children:e.jsx("p",{children:"An optional title that will appear directly above the passage in the same font style. (E.g. Passage 1)"})}),e.jsx("div",{children:e.jsx("input",{type:"text",defaultValue:this.props.passageTitle,onChange:t=>{this.change({passageTitle:t.target.value})}})})]}),e.jsxs("div",{children:["Passage Text:",n]}),e.jsxs("div",{children:["Footnotes:",e.jsx(xr,{children:e.jsx("p",{children:"To add footnotes, add ^ characters where they belong in the passage. Then, add ^ in the footnotes area to reference the footnotes in the passage."})}),a]})]})}}l(Bn,"propTypes",{...de,passageTitle:I.string,passageText:I.string,footnotes:I.string,showLineNumbers:I.bool}),l(Bn,"widgetName","passage"),l(Bn,"defaultProps",Go.defaultWidgetOptions);Bn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageEditor",props:{passageTitle:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},passageText:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},footnotes:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},showLineNumbers:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Zu,NumberInput:Cr,TextInput:ed}=G;class Hn extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:["Passage Number: ",e.jsx(Cr,{value:this.props.passageNumber,onChange:this.change("passageNumber")})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Reference Number: ",e.jsx(Cr,{value:this.props.referenceNumber,onChange:this.change("referenceNumber")})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Summary Text: ",e.jsx(ed,{value:this.props.summaryText,onChange:this.change("summaryText")}),e.jsxs(Zu,{children:[e.jsx("p",{children:"Short summary of the referenced section. This will be included in parentheses and quotes automatically."}),e.jsx("p",{children:"Ex: The start ... the end"})]})]})})]})}}l(Hn,"propTypes",{...de,passageNumber:I.number,referenceNumber:I.number,summaryText:I.string}),l(Hn,"widgetName","passage-ref"),l(Hn,"defaultProps",Bo.defaultWidgetOptions);Hn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageRefEditor",props:{passageNumber:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},referenceNumber:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},summaryText:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};class Un extends h.Component{constructor(){super(...arguments);l(this,"change",(...n)=>K.apply(this,n));l(this,"handleContentChange",n=>{this.change({content:n.target.value})});l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsxs("div",{children:["Content:",e.jsx("input",{type:"text",value:this.props.content,onChange:this.handleContentChange})]})}}l(Un,"propTypes",{...de,content:I.string}),l(Un,"widgetName","passage-ref-target"),l(Un,"defaultProps",Ho.defaultWidgetOptions);Un.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleContentChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageRefTargetEditor",props:{content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};const ht=""+new URL("plus-bold-CG3_Sgx2.svg",import.meta.url).href,bn=i=>{const r=h.useRef(null);return h.useEffect(()=>{const n=r.current;n&&(n.style.height="42px",n.style.height=`${n.scrollHeight}px`)},[i.value]),e.jsx(kt,{...i,ref:r,resizeType:"none",style:{overflow:"hidden",...i.style}})};bn.__docgenInfo={description:"",methods:[],displayName:"AutoResizingTextArea"};const nd="_tile_sgjc0_1",ad="_radio-option-actions-container_sgjc0_14",td="_button-row_sgjc0_21",rd="_image-editor-container_sgjc0_28",Wa={tile:nd,radioOptionActionsContainer:ad,buttonRow:td,imageEditorContainer:rd};function gt({initialImageUrl:i,initialImageAltText:r,containerClassName:n,onSave:a,onClose:t,onDelete:o}){const[s,u]=h.useState(i),[d,c]=h.useState(r);h.useEffect(()=>{u(i??""),c(r??"")},[i,r]);const b=h.useId(),k=`${b}-image-url-textarea`,C=`${b}-image-alt-text-textarea`;function A(){u(""),c(""),t==null||t()}function f(){a(s,d),A()}return e.jsxs("div",{className:n,children:[t&&e.jsx(ce,{"aria-label":"Close",icon:Rr,size:"small",kind:"tertiary",onClick:A,style:{position:"absolute",top:4,right:4}}),e.jsx(tn,{tag:"label",htmlFor:k,style:{marginBlockEnd:T.size_040},children:"Image URL"}),e.jsx(bn,{id:k,value:s,placeholder:"cdn.kastatic.org/...",onChange:w=>{u(w)},style:{marginBlockEnd:T.size_080}}),e.jsx(tn,{tag:"label",htmlFor:C,style:{marginBlockEnd:T.size_040},children:"Image Alt Text"}),e.jsx(bn,{id:C,value:d,placeholder:"Example: Graph of a linear function...",onChange:w=>{c(w)}}),e.jsxs("span",{className:Wa.buttonRow,children:[o&&e.jsx(ne,{size:"small",kind:"tertiary",startIcon:$a,style:{alignSelf:"flex-start"},onClick:o,children:"Delete this image"}),e.jsx(wn,{}),e.jsx(ne,{size:"small",disabled:s===i&&d===r,style:{alignSelf:"flex-start"},onClick:f,children:"Save image"})]})]})}gt.__docgenInfo={description:"",methods:[],displayName:"RadioImageEditor",props:{initialImageUrl:{required:!0,tsType:{name:"string"},description:""},initialImageAltText:{required:!0,tsType:{name:"string"},description:""},containerClassName:{required:!1,tsType:{name:"string"},description:""},onSave:{required:!0,tsType:{name:"signature",type:"function",raw:"(imageUrl: string, imageAltText: string) => void",signature:{arguments:[{type:{name:"string"},name:"imageUrl"},{type:{name:"string"},name:"imageAltText"}],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function id(i,r,n,a){const t=[...i],[o]=t.splice(n,1);switch(a){case"top":if(n===0)return i;t.unshift(o);break;case"up":if(n===0)return i;t.splice(n-1,0,o);break;case"down":if(n===i.length-1||n===i.length-2&&r)return i;t.splice(n+1,0,o);break;case"bottom":if(n===i.length-1)return i;if(r){const s=t.pop();t.push(o),s&&t.push(s)}else t.push(o);break}return t}function od(i){const r=[],n=zt.parse(i,{});zt.traverseContent(n,t=>{t.type==="image"&&r.push({url:t.target||"",altText:t.alt||""})});let a=i;return r.forEach((t,o)=>{const s=`![${t.altText}](${t.url})`,u=`![Image ${o+1}]`,d=a.indexOf(s);d!==-1&&(a=a.substring(0,d)+u+a.substring(d+s.length))}),[a,r]}function ot(i,r){let n=i;for(let a=0;a<r.length;a++){const t=r[a];n=n.replace(`![Image ${a+1}]`,`![${t.altText}](${t.url})`)}return n}const Ni=i=>{const{content:r,choiceIndex:n,onContentChange:a,isNoneOfTheAbove:t}=i,s=`${h.useId()}-content-textarea`,[u,d]=h.useState(""),[c,b]=h.useState([]),[k,C]=h.useState(!1);h.useEffect(()=>{const[g,p]=od(r??"");d(g),b(p)},[r]);const A=(g,p,v)=>{const S=`${r}
![${v}](${p})`;a(g,S)},f=g=>{const p=`![Image ${g+1}]`,v=u.replace(p,"");d(v);const S=ot(v,c);a(n,S)},w=(g,p,v)=>{const S=[...c];S[g]={url:p,altText:v},b(S);const q=ot(u,S);a(n,q)},_=(g,p)=>{d(p);const v=ot(p,c);a(g,v)},P=g=>{const p=g.clipboardData.getData("text");(p.includes("cdn.kastatic.org")||p.includes("graphie"))&&(g.preventDefault(),A(n,p,""))},N=g=>{window.confirm("Are you sure you want to delete this image?")&&f(g)};return t?e.jsxs(e.Fragment,{children:[e.jsx(tn,{tag:"label",htmlFor:s,children:"Content"}),e.jsx(bn,{id:s,value:"None of the above",disabled:!0,onChange:()=>{}})]}):e.jsxs(e.Fragment,{children:[e.jsx(tn,{tag:"label",htmlFor:s,style:{marginBlockEnd:T.size_040},children:"Content"}),e.jsx(bn,{id:s,value:u,placeholder:"Type a choice here...",onChange:g=>{_(n,g)},onPaste:P}),!k&&e.jsx(ne,{startIcon:ht,size:"small",kind:"tertiary",style:{alignSelf:"flex-start"},onClick:()=>{C(!0)},children:"Add image"}),k&&e.jsx(gt,{initialImageUrl:"",initialImageAltText:"",containerClassName:Wa.imageEditorContainer,onSave:(g,p)=>{A(n,g,p)},onClose:()=>{C(!1)}}),(c==null?void 0:c.map((g,p)=>e.jsxs(be,{header:`Image ${p+1}`,expanded:!0,containerStyle:{backgroundColor:E.surface.primary,marginBlockStart:T.size_040,marginBlockEnd:T.size_040},panelStyle:{paddingBlockEnd:T.size_120},children:[e.jsx("img",{src:g.url,alt:g.altText,style:{marginBlockEnd:T.size_080}}),e.jsx(gt,{initialImageUrl:g.url,initialImageAltText:g.altText,onSave:(v,S)=>{w(p,v,S)},onDelete:()=>{N(p)}})]},g.url)))??null]})};Ni.__docgenInfo={description:"",methods:[],displayName:"RadioOptionContentAndImageEditor",props:{isNoneOfTheAbove:{required:!0,tsType:{name:"boolean"},description:""},content:{required:!0,tsType:{name:"string"},description:""},choiceIndex:{required:!0,tsType:{name:"number"},description:""},onContentChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, content: string) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"string"},name:"content"}],return:{name:"void"}}},description:""}}};function Ii({content:i,showDelete:r,showMove:n,onDelete:a,onMove:t}){return e.jsxs("div",{className:Wa.radioOptionActionsContainer,children:[r&&e.jsx(ne,{size:"small",kind:"tertiary",startIcon:$a,onClick:()=>{window.confirm(`Are you sure you want to remove this choice? 

${i}`)&&a()},children:"Remove"}),n&&e.jsxs(e.Fragment,{children:[e.jsx(wn,{}),e.jsx(ce,{icon:pi,kind:"tertiary",size:"xsmall","aria-label":"Move choice to the top",onClick:()=>t("top")}),e.jsx(ce,{icon:ci,kind:"tertiary",size:"xsmall","aria-label":"Move choice up",onClick:()=>t("up")}),e.jsx(ce,{icon:ta,kind:"tertiary",size:"xsmall","aria-label":"Move choice down",onClick:()=>t("down")}),e.jsx(ce,{icon:mi,kind:"tertiary",size:"xsmall","aria-label":"Move choice to the bottom",onClick:()=>t("bottom")})]})]})}Ii.__docgenInfo={description:"",methods:[],displayName:"RadioOptionSettingsActions",props:{content:{required:!0,tsType:{name:"string"},description:""},showDelete:{required:!0,tsType:{name:"boolean"},description:""},showMove:{required:!0,tsType:{name:"boolean"},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: ChoiceMovementType) => void",signature:{arguments:[{type:{name:"union",raw:'"up" | "down" | "top" | "bottom"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},name:"movement"}],return:{name:"void"}}},description:""}}};function Li({index:i,correct:r,multipleSelect:n,onClick:a}){return e.jsx(fe,{size:"large",style:{marginInlineEnd:T.size_080,color:r?O.white:O.red,backgroundColor:r?O.activeGreen:O.fadedRed8,borderRadius:n?M.radius.radius_040:T.size_240,border:`1px solid ${r?O.activeGreen:O.red}`,width:T.size_560,flexDirection:"row"},onClick:a,children:e.jsxs(e.Fragment,{children:[e.jsx(Re,{size:"small",icon:r?wt:Uo,style:{marginInlineEnd:T.size_060},color:r?O.white:O.red}),String.fromCharCode(65+i)]})})}Li.__docgenInfo={description:"",methods:[],displayName:"RadioStatusPill",props:{index:{required:!0,tsType:{name:"number"},description:""},correct:{required:!1,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function Ri({index:i,choice:r,multipleSelect:n,onStatusChange:a,onContentChange:t,onRationaleChange:o,showDelete:s,showMove:u,onDelete:d,onMove:c}){const{content:b,rationale:k,correct:C,isNoneOfTheAbove:A}=r,w=`${h.useId()}-rationale-textarea`;return e.jsxs("div",{className:Wa.tile,children:[e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx(Li,{index:i,correct:C,multipleSelect:n,onClick:()=>{a(i,!C)}}),e.jsx(tn,{style:{display:"inline",marginInlineEnd:T.size_080},children:"Status"}),e.jsx(fe,{kind:C?"accent":"transparent",onClick:()=>{a(i,!0)},style:{marginInlineEnd:T.size_080,outlineColor:C?E.core.background.instructive.default:E.core.border.neutral.default},children:"Correct"}),e.jsx(fe,{kind:C?"transparent":"accent",onClick:()=>{a(i,!1)},style:{marginInlineEnd:T.size_080,outlineColor:C?E.core.border.neutral.default:E.core.background.instructive.default},children:"Incorrect"})]}),e.jsx(Ni,{content:b,choiceIndex:i,isNoneOfTheAbove:A??!1,onContentChange:t}),e.jsx(tn,{tag:"label",htmlFor:w,style:{marginBlockStart:T.size_040,marginBlockEnd:T.size_040},children:"Rationale"}),e.jsx(bn,{id:w,value:k??"",placeholder:`Why is this choice ${C?"correct":"incorrect"}?`,onChange:_=>{o(i,_)}}),e.jsx(Ii,{content:b,showDelete:s,showMove:u,onDelete:d,onMove:_=>c(i,_)})]})}Ri.__docgenInfo={description:"",methods:[],displayName:"RadioOptionSettings",props:{index:{required:!0,tsType:{name:"number"},description:""},choice:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    // Translatable Markdown; The label for this choice
    content: string;
    // Translatable Markdown; Rationale to give the user when they get it wrong
    rationale?: string;
    // Whether this option is a correct answer or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    correct?: boolean;
    // If this is none of the above, override the content with "None of the above"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    isNoneOfTheAbove?: boolean;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"rationale",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}}]}},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},onStatusChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, correct: boolean) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"boolean"},name:"correct"}],return:{name:"void"}}},description:""},onContentChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, content: string) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"string"},name:"content"}],return:{name:"void"}}},description:""},onRationaleChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, rationale: string) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"string"},name:"rationale"}],return:{name:"void"}}},description:""},showDelete:{required:!0,tsType:{name:"boolean"},description:""},showMove:{required:!0,tsType:{name:"boolean"},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, movement: ChoiceMovementType) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"union",raw:'"up" | "down" | "top" | "bottom"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},name:"movement"}],return:{name:"void"}}},description:""}}};class Oa extends h.Component{constructor(){super(...arguments);l(this,"onMultipleSelectChange",n=>{const a=n.multipleSelect;let t=this.props.choices;a||dn(t)>1&&(t=t.map(s=>({...s,correct:!1}))),this.props.onChange({multipleSelect:a,choices:t,numCorrect:dn(t)})});l(this,"onCountChoicesChange",n=>{const a=n.countChoices;this.props.onChange({countChoices:a})});l(this,"onChange",({checked:n})=>{const a=this.props.choices.map((t,o)=>({...t,correct:n[o],content:t.isNoneOfTheAbove&&!n[o]?"":t.content}));this.props.onChange({choices:a,numCorrect:dn(a)})});l(this,"onStatusChange",(n,a)=>{let t;a&&!this.props.multipleSelect?t=this.props.choices.map(o=>!1):t=this.props.choices.map(o=>o.correct),t[n]=a,this.onChange({checked:t})});l(this,"onContentChange",(n,a)=>{const t=[...this.props.choices];t[n]={...t[n],content:a},this.props.onChange({choices:t})});l(this,"onRationaleChange",(n,a)=>{const t=[...this.props.choices];t[n]={...t[n],rationale:a},a===""&&delete t[n].rationale,this.props.onChange({choices:t})});l(this,"onDelete",n=>{const a=this.props.choices.slice(),t=a[n];a.splice(n,1),this.props.onChange({choices:a,hasNoneOfTheAbove:this.props.hasNoneOfTheAbove&&!t.isNoneOfTheAbove,numCorrect:dn(a)})});l(this,"addChoice",(n,a)=>{a.preventDefault();const t=this.props.choices.slice(),o={isNoneOfTheAbove:n,content:""},s=t.length-(this.props.hasNoneOfTheAbove?1:0);t.splice(s,0,o),this.props.onChange({choices:t,hasNoneOfTheAbove:n||this.props.hasNoneOfTheAbove},()=>{this.refs[`choice-editor${s}`].refs["content-editor"].focus()})});l(this,"handleMove",(n,a)=>{const t=id(this.props.choices,this.props.hasNoneOfTheAbove,n,a);this.props.onChange({choices:t})});l(this,"focus",()=>(this.refs["choice-editor0"].refs["content-editor"].focus(),!0));l(this,"getSaveWarnings",()=>y.some(y.pluck(this.props.choices,"correct"))?[]:["No choice is marked as correct."])}serialize(){const{choices:n,randomize:a,multipleSelect:t,countChoices:o,hasNoneOfTheAbove:s,deselectEnabled:u}=this.props;return{choices:n,randomize:a,multipleSelect:t,countChoices:o,hasNoneOfTheAbove:s,deselectEnabled:u,numCorrect:dn(n)}}render(){const n=dn(this.props.choices);return e.jsxs("div",{children:[e.jsx(Xo,{href:"https://www.khanacademy.org/internal-courses/content-creation-best-practices/xe46daa512cd9c644:question-writing/xe46daa512cd9c644:multiple-choice/a/stems",target:"_blank",children:"Multiple choice best practices"}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(an,{label:"Randomize order",checked:this.props.randomize,onChange:a=>{this.props.onChange({randomize:a})},style:{marginBlockEnd:T.size_060}}),e.jsx(an,{label:"Multiple selections",checked:this.props.multipleSelect,onChange:a=>{this.onMultipleSelectChange({multipleSelect:a})},style:{marginBlockEnd:T.size_060}}),this.props.multipleSelect&&e.jsxs(e.Fragment,{children:[e.jsx(an,{label:"Specify number correct",checked:this.props.countChoices,onChange:a=>{this.onCountChoicesChange({countChoices:a})},style:{marginBlockEnd:T.size_060}}),e.jsxs(Yo,{children:["Current number correct: ",n]})]})]}),this.props.choices.map((a,t)=>e.jsx(Ri,{index:t,choice:a,multipleSelect:this.props.multipleSelect,onStatusChange:this.onStatusChange,onContentChange:this.onContentChange,onRationaleChange:this.onRationaleChange,showDelete:this.props.choices.length>=2,showMove:this.props.choices.length>1&&!a.isNoneOfTheAbove,onDelete:()=>this.onDelete(t),onMove:this.handleMove},`choice-${t}}`)),e.jsxs("div",{className:"add-choice-container",children:[e.jsx(ne,{size:"small",kind:"tertiary",startIcon:ht,onClick:this.addChoice.bind(this,!1),style:{marginInlineEnd:"2.4rem"},children:"Add a choice"}),!this.props.hasNoneOfTheAbove&&e.jsx(ne,{size:"small",kind:"tertiary",startIcon:ht,onClick:this.addChoice.bind(this,!0),children:"None of the above"})]})]})}}l(Oa,"widgetName","radio"),l(Oa,"defaultProps",Ko.defaultWidgetOptions);Oa.__docgenInfo={description:"An editor for adding a radio widget that allows users to select a single option from multiple choices.",methods:[{name:"onMultipleSelectChange",docblock:null,modifiers:[],params:[{name:"allowMultiple",optional:!1,type:null}],returns:null},{name:"onCountChoicesChange",docblock:null,modifiers:[],params:[{name:"count",optional:!1,type:null}],returns:null},{name:"onChange",docblock:null,modifiers:[],params:[{name:"{checked}",optional:!1,type:null}],returns:null},{name:"onStatusChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"correct",optional:!1,type:null}],returns:null},{name:"onContentChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newContent",optional:!1,type:null}],returns:null},{name:"onRationaleChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newRationale",optional:!1,type:null}],returns:null},{name:"onDelete",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"addChoice",docblock:null,modifiers:[],params:[{name:"noneOfTheAbove",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"handleMove",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"movement",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    // The choices provided to the user.
    choices: PerseusRadioChoice[];
    // Does this have a "none of the above" option?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    hasNoneOfTheAbove?: boolean;
    // If multipleSelect is enabled, Specify the number expected to be correct.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    countChoices?: boolean;
    // How many of the choices are correct, which is conditionally used to tell
    // learners ahead of time how many options they'll need.
    numCorrect?: number;
    // Randomize the order of the options or keep them as defined
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    randomize?: boolean;
    // Does this set allow for multiple selections to be correct?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    multipleSelect?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    deselectEnabled?: boolean;
}`,signature:{properties:[{key:"choices",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Markdown; The label for this choice
    content: string;
    // Translatable Markdown; Rationale to give the user when they get it wrong
    rationale?: string;
    // Whether this option is a correct answer or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    correct?: boolean;
    // If this is none of the above, override the content with "None of the above"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    isNoneOfTheAbove?: boolean;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"rationale",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}}]}}],raw:"PerseusRadioChoice[]",required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"countChoices",value:{name:"boolean",required:!1}},{key:"numCorrect",value:{name:"number",required:!1}},{key:"randomize",value:{name:"boolean",required:!1}},{key:"multipleSelect",value:{name:"boolean",required:!1}},{key:"deselectEnabled",value:{name:"boolean",required:!1}}]}}}}],displayName:"RadioEditor",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},countChoices:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},choices:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Markdown; The label for this choice
    content: string;
    // Translatable Markdown; Rationale to give the user when they get it wrong
    rationale?: string;
    // Whether this option is a correct answer or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    correct?: boolean;
    // If this is none of the above, override the content with "None of the above"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    isNoneOfTheAbove?: boolean;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"rationale",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}}]}}],raw:"PerseusRadioChoice[]"},description:"",defaultValue:{value:"[{}, {}, {}, {}]",computed:!1}},randomize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},hasNoneOfTheAbove:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},multipleSelect:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},deselectEnabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},static:{required:!0,tsType:{name:"boolean"},description:""}}};const{InfoTip:sd,NumberInput:qr}=G,ld=Jo.widget;class Kn extends h.Component{constructor(){super(...arguments);l(this,"numberOfColumns",h.createRef());l(this,"focus",()=>{var n;(n=this.numberOfColumns.current)==null||n.focus()});l(this,"onSizeInput",(n,a)=>{let t=+n||0,o=+a||0;t=Math.min(Math.max(1,t),30),o=Math.min(Math.max(1,o),6);const s=this.props.columns,u=this.props.rows,d=this.props.answers;t<=u?d.length=t:y(t-u).times(function(){d.push(ue.stringArrayOfSize(s))});function c(k){o<=s?k.length=o:y(o-s).times(function(){k.push("")})}const b=this.props.headers;c(b),y.each(d,c),this.props.onChange({rows:t,columns:o,answers:d,headers:b})});l(this,"serialize",()=>{const n=y.pick(this.props,"headers","rows","columns");return y.extend({},n,{answers:y.map(this.props.answers,y.clone)})})}render(){const n={headers:this.props.headers,onChange:this.props.onChange,userInput:this.props.answers,handleUserInput:a=>{this.props.onChange({answers:a})},apiOptions:this.props.apiOptions,editableHeaders:!0,onFocus:()=>{},onBlur:()=>{},trackInteraction:()=>{},Editor:Ae};return e.jsxs("div",{children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Number of columns:"," ",e.jsx(qr,{ref:this.numberOfColumns,value:this.props.columns,onChange:a=>{a&&this.onSizeInput(this.props.rows,a)},useArrowKeys:!0})]})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Number of rows:"," ",e.jsx(qr,{ref:"numberOfRows",value:this.props.rows,onChange:a=>{a&&this.onSizeInput(a,this.props.columns)},useArrowKeys:!0})]})}),e.jsxs("div",{children:[" ","Table of answers:"," ",e.jsx(sd,{children:e.jsx("p",{children:"The student has to fill out all cells in the table. For partially filled tables create a table using the template, and insert text input boxes as desired."})})]}),e.jsx("div",{children:e.jsx(ld,{...n})})]})}}l(Kn,"propTypes",{rows:I.number,columns:I.number,headers:I.arrayOf(I.string),answers:I.arrayOf(I.arrayOf(I.string))}),l(Kn,"widgetName","table"),l(Kn,"defaultProps",Qo.defaultWidgetOptions);Kn.__docgenInfo={description:"",methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"onSizeInput",docblock:null,modifiers:[],params:[{name:"numRawRows",optional:!1,type:null},{name:"numRawColumns",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TableEditor",props:{headers:{defaultValue:{value:'[""]',computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},rows:{defaultValue:{value:"4",computed:!1},description:"",type:{name:"number"},required:!1},columns:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},answers:{defaultValue:{value:`new Array(defaultRows)
.fill(0)
.map(() => new Array(defaultColumns).fill(""))`,computed:!0},description:"",type:{name:"arrayOf",value:{name:"arrayOf",value:{name:"string"}}},required:!1}}};const{InfoTip:ud}=G,dd=/khanacademy\.org\/.*\/v\/(.*)$/;function md(i){const r=dd.exec(i);return r?r[1]:i}class Xn extends h.Component{constructor(){super(...arguments);l(this,"_handleUrlChange",n=>{this.props.onChange({location:md(n)})});l(this,"serialize",()=>Q.serialize.call(this))}render(){return e.jsx("div",{children:e.jsxs("label",{children:["KA Video Slug:"," ",e.jsx(Oe,{value:this.props.location,style:{width:290},onChange:this._handleUrlChange}),e.jsx(ud,{children:"KA video URLs will be converted to just the slug."})]})})}}l(Xn,"propTypes",{location:I.string,onChange:I.func}),l(Xn,"widgetName","video"),l(Xn,"defaultProps",Zo.defaultWidgetOptions);Xn.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"_handleUrlChange",docblock:null,modifiers:[],params:[{name:"url",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"VideoEditor",props:{location:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},onChange:{description:"",type:{name:"func"},required:!1}}};const pd=[In,Ln,Rn,Fn,On,va,us,en,En,_n,zn,Dn,is,ds,Pa,Ra,hs,gs,$n,Vn,Fa,ys,Wn,Gn,Bn,Hn,Un,bs,ws,fs,vs,Kn,Xn,Oa,qt],_d=()=>{es(ns),as(pd),ts(),rs()};export{pd as A,In as C,Rn as D,va as E,xs as I,ut as J,Wn as N,be as P,Oa as R,Fn as a,On as b,Pa as c,Ra as d,_d as r};
