var _t=Object.defineProperty;var Dt=(o,a,n)=>a in o?_t(o,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[a]=n;var d=(o,a,n)=>(Dt(o,typeof a!="symbol"?a+"":a,n),n);import{cD as Mt,cE as $t,cF as Vt,cG as Wt,r as g,_ as z,j as e,c8 as xr,aa as L,ab as ue,ad as ie,cH as Gt,C as Bt,c6 as Ht,E as Ut,ae as pe,A as Aa,cI as Kt,n as R,o as Xt,cJ as Jt,cK as Yt,cL as Qt,cM as qr,cN as Zt,cO as Cr,cP as eo,cQ as no,av as v,bM as Ne,x as D,w as E,bR as Tr,bQ as be,cy as Sr,bi as an,cw as ao,cv as Pa,cR as ro,L as Ie,i as W,V as y,cS as to,cT as Ar,bG as Ae,cU as Fn,bV as Ze,aM as oo,cV as io,cW as lo,cX as so,t as en,cY as uo,cZ as mo,c_ as fe,I as In,bT as ea,bH as La,q as po,c$ as co,d0 as ho,d1 as ja,l as F,s as m,d2 as na,aj as Qe,k as C,d3 as Un,cn as ka,U as Ce,as as se,cf as go,c4 as Pr,d4 as On,d5 as Ia,u as X,d6 as Pe,d7 as aa,aL as le,ch as rn,d8 as yo,d9 as bo,da as Na,aP as ye,db as Lr,dc as jr,dd as Ir,de as Nr,df as Rr,dg as Fr,dh as Or,di as zr,dj as Er,dk as _r,dl as Dr,dm as wo,dn as fo,dp as Q,dq as ko,dr as vo,ds as xo,dt as qo,du as Co,dv as To,dw as So,dx as Ao,aq as ua,dy as Po,dz as Xe,cc as Lo,dA as jo,dB as Io,dC as No,dD as Ro,bo as Fo,bp as Oo,ci as zo,cj as Eo,ck as _o}from"./iframe-xqgRcQf_.js";import"./item-version-CrkFurkW.js";import"./article-renderer-Div8t3tJ.js";import"./server-item-renderer-CB58Q2z9.js";import"./hints-renderer-B51OzCed.js";import{C as Do}from"./categorizer-editor-BNxktKqh.js";import{c as ae}from"./components-BxL5YMMF.js";import{E as de}from"./editor-jsonify-B0uKPUzN.js";import{B as Se}from"./blur-input-Y1ya2ieR.js";import{D as Mo}from"./definition-editor-DjPjjrLB.js";import{D as $o}from"./dropdown-editor-CxiLsNsK.js";import{E as Vo}from"./explanation-editor-eVmWGoNf.js";import{E as Wo}from"./expression-editor-BvlCQDrT.js";import{p as Be,F as Go}from"./free-response-editor-CRj0wgYP.js";import{E as Fe}from"./editor-FZNudshh.js";import{i as Bo}from"./icon-paths-Cfjy_uoj.js";import{G as Ho,I as Uo}from"./interaction-editor-DDKr_Abg.js";import{I as Ko}from"./image-editor-BBfV78kM.js";import{I as Xo}from"./input-number-editor-6UU9n2sb.js";import{P as Jo,d as Yo}from"./Popper-TbAU-DzE.js";import{H as tn,t as Mr,P as we,N as Qo}from"./numeric-input-editor-DAvuzuJs.js";import{L as Zo}from"./label-image-editor-CojwZyuC.js";import{M as ei}from"./matcher-editor-C4vOLjj2.js";import{N as ni}from"./number-line-editor-BcOXWJXf.js";import{P as ai}from"./phet-simulation-editor-giDI7aov.js";import{P as ri}from"./plotter-editor-CIPU-pf8.js";import{P as ti}from"./python-program-editor-DMXQu1yl.js";import{m as oi}from"./minus-circle-bold-jRcNnagP.js";import{S as ii}from"./sorter-editor-o9tCwoT-.js";const li={chooseType:Mt,defaultPlotProps:$t,getEquationString:Vt,typeToButton:Wt};class va extends g.Component{constructor(a){super(a),this.state=this.getInitialState(),this.handleBlur=this.handleBlur.bind(this),this.handleChange=this.handleChange.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}getInitialState(){return{currentValue:JSON.stringify(this.props.value,null,4),valid:!0}}UNSAFE_componentWillReceiveProps(a){(!this.state.valid||!z.isEqual(a.value,JSON.parse(this.state.currentValue?this.state.currentValue:"")))&&this.setState(this.getInitialState())}handleKeyDown(a){if(a.key==="Tab"){const n=a.target.selectionStart,r=a.target.value,t=r.substring(0,n),i=r.substring(n,r.length);a.target.value=t+"    "+i,a.target.selectionStart=t.length+4,a.target.selectionEnd=t.length+4,a.preventDefault(),this.handleChange(a)}}handleChange(a){const n=a.target.value;try{let r=JSON.parse(n);z.isString(r)&&(r=JSON.parse(r)),this.setState({currentValue:n,valid:!0},function(){this.props.onChange(r)})}catch{this.setState({currentValue:n,valid:!1})}}handleBlur(a){const n=a.target.value;try{let r=JSON.parse(n);z.isString(r)&&(r=JSON.parse(r)),this.setState({currentValue:JSON.stringify(r,null,4),valid:!0},function(){this.props.onChange(r)})}catch{this.setState({currentValue:JSON.stringify(this.props.value,null,4),valid:!0})}}render(){const a="perseus-json-editor "+(this.state.valid?"valid":"invalid");return e.jsx("textarea",{className:a,value:this.state.currentValue,onChange:this.handleChange,onKeyDown:this.handleKeyDown,onBlur:this.handleBlur})}}d(va,"displayName"),d(va,"defaultProps",{value:{}});va.__docgenInfo={description:"",methods:[{name:"handleKeyDown",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleBlur",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null}],props:{multiLine:{required:!0,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"{}",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newJson: any) => void",signature:{arguments:[{type:{name:"any"},name:"newJson"}],return:{name:"void"}}},description:""}}};let Ga=0;const xa={},qa={};window.iframeDataStore={};window.addEventListener("message",o=>{if(typeof o.data=="string"){const a=xa[o.data];a&&a()}else o.data.id&&(o.data.height!==void 0?qa[o.data.id](o.data.height):o.data.lintWarnings&&xr.log("LINTER REPORT",{lintWarnings:JSON.stringify(o.data.lintWarnings)}))});class si extends g.Component{constructor(){super(...arguments);d(this,"_frame");d(this,"container",g.createRef());d(this,"_isMounted");d(this,"_lastData");d(this,"_lastHeight");d(this,"iframeID")}componentDidMount(){this._isMounted=!0,this.iframeID=Ga,Ga++,this._prepareFrame(),xa[this.iframeID]=()=>{this.sendNewData(this._lastData)},qa[this.iframeID]=n=>{this._lastHeight=n,this._isMounted&&this.props.seamless&&this.container.current&&(this.container.current.style.height=n+"px")}}shouldComponentUpdate(n){return n.datasetValue!==this.props.datasetValue||n.seamless!==this.props.seamless}componentDidUpdate(n){this.container.current&&(this.props.seamless?this.container.current.style.height=this._lastHeight+"px":this.container.current.style.height="100%"),n.datasetValue!==this.props.datasetValue&&this._prepareFrame()}componentWillUnmount(){xa[this.iframeID]=null,qa[this.iframeID]=null,this._isMounted=!1}_prepareFrame(){var r,t;this._frame&&((r=this.container.current)==null||r.removeChild(this._frame));const n=document.createElement("iframe");n.style.width="100%",n.style.height="100%",n.src=this.props.url,this.props.datasetKey&&(n.dataset[this.props.datasetKey]=this.props.datasetValue),n.dataset.id=String(this.iframeID),this.props.seamless&&(n.dataset.lintGutter="true"),(t=this.container.current)==null||t.appendChild(n),this._frame=n}sendNewData(n){const r=this._frame;this._isMounted&&n&&(r!=null&&r.contentWindow)&&(this._lastData=n,window.iframeDataStore[this.iframeID]=n,r.contentWindow.postMessage(this.iframeID,"*"))}render(){return e.jsx("div",{ref:this.container,style:{width:"100%",height:"100%"}})}}si.__docgenInfo={description:"",methods:[{name:"_prepareFrame",docblock:null,modifiers:[],params:[],returns:null},{name:"sendNewData",docblock:null,modifiers:[],params:[{name:"data",optional:!1,type:{name:"any"}}],returns:null}],displayName:"IframeContentRenderer",props:{url:{required:!0,tsType:{name:"string"},description:""},datasetKey:{required:!0,tsType:{name:"string"},description:""},datasetValue:{required:!0,tsType:{name:"any"},description:""},seamless:{required:!0,tsType:{name:"boolean"},description:""}}};const{InfoTip:Ba}=ae,ui=400,di=400;var Hn;let mi=(Hn=class extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("fieldset",{className:"pair-editor",children:[e.jsxs("label",{children:["Name:"," ",e.jsx(Se,{value:this.props.name,onChange:this.change("name")})]}),e.jsxs("label",{children:[" ","Value:"," ",e.jsx(Se,{value:this.props.value,onChange:this.change("value")})]})]})}},d(Hn,"propTypes",{...ue,name:L.string,value:L.string}),d(Hn,"defaultProps",{name:"",value:""}),Hn);var fa;let pi=(fa=class extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handlePairChange",(n,r)=>{const t=this.props.pairs.slice();t[n]=r;const i=t[t.length-1];i.name&&i.value&&t.push({name:"",value:""}),this.change("pairs",t)});d(this,"serialize",()=>de.serialize.call(this))}render(){const n=z.map(this.props.pairs,(r,t)=>e.jsx(mi,{name:r.name,value:r.value,onChange:this.handlePairChange.bind(this,t)},t));return e.jsx("div",{children:n})}},d(fa,"propTypes",{...ue,pairs:L.arrayOf(L.shape({name:L.string,value:L.string})).isRequired}),fa);const ci=/khanacademy\.org\/computer-programming\/[^\/]+\/(\d+)/;function hi(o){const a=ci.exec(o);return a&&(o=a[1]),o}class yn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"_handleSettingsChange",n=>{this.change({settings:n.pairs})});d(this,"_handleProgramIDChange",n=>{n=hi(n);const{isDevServer:r,InitialRequestUrl:t}=Bt(),s=`${r?t.origin:"https://www.khanacademy.org"}/api/internal/scratchpads/${n}`;Ht.getJSON(s).done(l=>{const u=l.userAuthoredContentType;this.change({width:l.width,height:l.height,programID:n,programType:u})}).fail((l,u,p)=>{xr.error("Error retrieving scratchpad info for program ID ",Ut.TransientService,{cause:p,loggedMetadata:{textStatus:u,programID:n}}),this.change({width:ui,height:di,programID:n,programType:null})})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsxs("label",{children:["Url or Program ID:"," ",e.jsx(Se,{value:this.props.programID,onChange:this._handleProgramIDChange})]}),e.jsx("br",{}),e.jsx(pe,{label:"Show Editor",checked:this.props.showEditor,onChange:n=>{this.props.onChange({showEditor:n})}}),e.jsx(Ba,{children:'If you show the editor, you should use the "full-width" alignment to make room for the width of the editor.'}),e.jsx("br",{}),e.jsx(pe,{label:"Show Buttons",checked:this.props.showButtons,onChange:n=>{this.props.onChange({showButtons:n})}}),e.jsx("br",{}),e.jsxs("label",{children:["Settings:",e.jsx(pi,{name:"settings",pairs:this.props.settings,onChange:this._handleSettingsChange}),e.jsxs(Ba,{children:["Settings that you add here are available to the program as an object returned by ",e.jsx("code",{children:"Program.settings()"})]})]})]})}}d(yn,"propTypes",{...ue}),d(yn,"widgetName","cs-program"),d(yn,"defaultProps",Gt.defaultWidgetOptions);yn.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_handleSettingsChange",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"_handleProgramIDChange",docblock:null,modifiers:[],params:[{name:"programID",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"CSProgramEditor",props:{programID:{defaultValue:{value:'""',computed:!1},required:!1},programType:{defaultValue:{value:"null",computed:!1},required:!1},settings:{defaultValue:{value:'[{name: "", value: ""}]',computed:!1},required:!1},showEditor:{defaultValue:{value:"false",computed:!1},required:!1},showButtons:{defaultValue:{value:"false",computed:!1},required:!1},height:{defaultValue:{value:"400",computed:!1},required:!1}},composes:["@khanacademy/perseus"]};class Ra extends g.Component{serialize(){return de.serialize.call(this)}render(){return e.jsxs("div",{children:[e.jsx("p",{children:"This widget has been deprecated and removed"}),e.jsx("p",{children:"Learners will see a message and they will not be graded on this part. Please replace this widget with a supported one."})]})}}d(Ra,"widgetName","deprecated-standin");Ra.__docgenInfo={description:"",methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"any"}}}],displayName:"DeprecatedStandinEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(options: any) => void",signature:{arguments:[{type:{name:"any"},name:"options"}],return:{name:"void"}}},description:""}}};const{InlineIcon:Ha,TextInput:gi}=ae;class Ve extends g.Component{constructor(){super(...arguments);d(this,"editor",g.createRef());d(this,"hintEditor",g.createRef());d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleAddHint",()=>{const n={content:"",images:{},widgets:{}};this.props.onChange({hint:n},()=>{var r;(r=this.hintEditor.current)==null||r.focus()})});d(this,"handleRemoveHint",n=>{this.props.onChange({hint:null})});d(this,"getSaveWarnings",()=>{var n;return(n=this.editor.current)==null?void 0:n.getSaveWarnings()});d(this,"serialize",()=>{var n,r;return{title:this.props.title,...(n=this.editor.current)==null?void 0:n.serialize(),hint:(r=this.hintEditor.current)==null?void 0:r.serialize()}})}render(){return e.jsxs("div",{className:"perseus-group-editor",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{className:R.css(da.title),children:["Title:"," ",e.jsx(gi,{value:this.props.title,className:R.css(da.input),onChange:this.change("title")})]})}),e.jsx(Fe,{ref:this.editor,content:this.props.content,widgets:this.props.widgets,apiOptions:this.props.apiOptions,images:this.props.images,widgetEnabled:!0,immutableWidgets:!1,onChange:this.props.onChange,warnNoPrompt:!0,warnNoWidgets:!0}),!this.props.hint&&e.jsxs("button",{type:"button",style:{marginTop:10},className:"add-hint simple-button orange",onClick:this.handleAddHint,children:[e.jsx(Ha,{...Bo})," Add a hint"]}),this.props.hint&&e.jsxs("div",{className:"perseus-hint-editor",children:[e.jsx("div",{className:R.css(da.hintsTitle),children:"Hint"}),e.jsx(Fe,{ref:this.hintEditor,content:this.props.hint?this.props.hint.content:"",widgets:this.props.hint?this.props.hint.widgets:{},apiOptions:this.props.apiOptions,images:this.props.hint&&this.props.hint.images,widgetEnabled:!0,immutableWidgets:!1,onChange:n=>{this.change("hint",Object.assign({},this.props.hint,n))}}),e.jsxs("button",{type:"button",className:"remove-hint simple-button orange",onClick:this.handleRemoveHint,children:[e.jsx(Ha,{...Xt})," Remove this hint"]})]})]})}}d(Ve,"propTypes",{...ue,title:L.string,content:L.string,widgets:L.object,images:L.object,apiOptions:Aa.propTypes}),d(Ve,"widgetName","graded-group"),d(Ve,"defaultProps",Kt.defaultWidgetOptions);const da=R.StyleSheet.create({title:{fontSize:18,fontWeight:"bold"},input:{fontSize:18},hintsTitle:{marginTop:10,fontSize:"110%",fontWeight:"bold"}});Ve.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleAddHint",docblock:null,modifiers:[],params:[],returns:null},{name:"handleRemoveHint",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GradedGroupEditor",props:{title:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},images:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},hint:{defaultValue:{value:"null",computed:!1},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0}},composes:["@khanacademy/perseus"]};class bn extends g.Component{constructor(){super(...arguments);d(this,"_editors");d(this,"change",(...n)=>ie.apply(this,n));d(this,"getSaveWarnings",()=>[].concat(...this._editors.map(n=>n?n.getSaveWarnings():[])));d(this,"serialize",()=>({gradedGroups:this.props.gradedGroups}));d(this,"renderGroups",()=>this.props.gradedGroups?this.props.gradedGroups.map((n,r)=>e.jsx(Ve,{ref:t=>this._editors[r]=t,...n,apiOptions:this.props.apiOptions,widgetEnabled:!0,immutableWidgets:!1,onChange:t=>this.change("gradedGroups",yi(this.props.gradedGroups,r,{...this.props.gradedGroups[r],...t}))},r)):null);d(this,"addGroup",()=>{const n=this.props.gradedGroups||[];this.change("gradedGroups",n.concat([Ve.defaultProps]))})}UNSAFE_componentWillMount(){this._editors=[]}render(){return e.jsxs("div",{className:"perseus-group-editor",children:[this.renderGroups(),e.jsx("button",{onClick:this.addGroup,children:"Add group"})]})}}d(bn,"propTypes",{...ue,apiOptions:Aa.propTypes,gradedGroups:L.array,onChange:L.func.isRequired}),d(bn,"widgetName","graded-group-set"),d(bn,"defaultProps",Jt.defaultWidgetOptions);const yi=(o,a,n)=>[...o.slice(0,a),n,...o.slice(a+1)];bn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null},{name:"renderGroups",docblock:null,modifiers:[],params:[],returns:null},{name:"addGroup",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GradedGroupSetEditor",props:{gradedGroups:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"array"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0},onChange:{description:"",type:{name:"func"},required:!0}},composes:["@khanacademy/perseus"]};const{InfoTip:bi,MultiButtonGroup:wi}=ae,fi=Yt.widget,{chooseType:ki,defaultPlotProps:vi,getEquationString:xi,typeToButton:qi}=li;class wn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleAvailableTypesChange",n=>{let r=this.props.correct;if(!z.contains(n,this.props.correct.type)){const t=this.props.graph,i=ki(n);r=vi(i,t)}this.props.onChange({availableTypes:n,correct:r})});d(this,"serialize",()=>z.chain(this.props).pick("correct","availableTypes").extend({graph:z.omit(this.props.graph,"box")}).value())}render(){const n=Cr.SMALL;let r,t;if(this.props.graph.valid===!0){const i={apiOptions:this.props.apiOptions,containerSizeClass:n,graph:this.props.graph,userInput:this.props.correct,handleUserInput:(s,l)=>{let u=this.props.correct;u.type===(s==null?void 0:s.type)?u=z.extend({},u,s):u=s,this.props.onChange({correct:u},l)},availableTypes:this.props.availableTypes,trackInteraction:function(){}};t=e.jsx(fi,{...i}),r=xi(i.userInput)}else t=e.jsx("div",{className:"perseus-error",children:this.props.graph.valid});return e.jsxs("div",{children:[e.jsxs("div",{children:["Correct answer"," ",e.jsx(bi,{children:e.jsx("p",{children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."})})," ",": ",r]}),e.jsx(Ho,{editableSettings:["graph","snap","image"],box:qr(n),range:this.props.graph.range,labels:this.props.graph.labels,step:this.props.graph.step,gridStep:this.props.graph.gridStep,snapStep:this.props.graph.snapStep,valid:this.props.graph.valid,backgroundImage:this.props.graph.backgroundImage,markings:this.props.graph.markings,rulerLabel:this.props.graph.rulerLabel,rulerTicks:this.props.graph.rulerTicks,showTooltips:this.props.graph.showTooltips,onChange:this.change("graph")}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Available functions: "}),e.jsx(wi,{allowEmpty:!1,values:this.props.availableTypes,buttons:z.map(Zt,qi),onChange:this.handleAvailableTypesChange})]}),t]})}}d(wn,"propTypes",{...ue}),d(wn,"widgetName","grapher"),d(wn,"defaultProps",Qt.defaultWidgetOptions);wn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleAvailableTypesChange",docblock:null,modifiers:[],params:[{name:"newAvailableTypes",optional:!1,type:{name:"Array",elements:[{name:"any"}],raw:"Array<any>",alias:"Array"}}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GrapherEditor",props:{graph:{defaultValue:{value:`{
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
}`,computed:!1},required:!1},availableTypes:{defaultValue:{value:'["linear"]',computed:!1},required:!1}},composes:["@khanacademy/perseus"]};class fn extends g.Component{constructor(){super(...arguments);d(this,"editor",g.createRef());d(this,"getSaveWarnings",()=>{var n;return(n=this.editor.current)==null?void 0:n.getSaveWarnings()});d(this,"serialize",()=>{var n;return z.extend({},(n=this.editor.current)==null?void 0:n.serialize())})}render(){return e.jsx("div",{className:"perseus-group-editor",children:e.jsx(Fe,{ref:this.editor,content:this.props.content,widgets:this.props.widgets,apiOptions:this.props.apiOptions,images:this.props.images,widgetEnabled:!0,immutableWidgets:!1,onChange:this.props.onChange})})}}d(fn,"propTypes",{content:L.string,widgets:L.object,images:L.object,apiOptions:Aa.propTypes}),d(fn,"widgetName","group"),d(fn,"defaultProps",eo.defaultWidgetOptions);fn.__docgenInfo={description:"",methods:[{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GroupEditor",props:{content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},images:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0}}};class Ca extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("fieldset",{children:[e.jsxs("label",{children:["Name:",e.jsx(Se,{value:this.props.name,onChange:this.change("name")})]}),e.jsxs("label",{children:["Value:",e.jsx(Se,{value:this.props.value,onChange:this.change("value")})]})]})}}d(Ca,"propTypes",{...ue,name:L.string,value:L.string}),d(Ca,"defaultProps",{name:"",value:""});class $r extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handlePairChange",(n,r)=>{const t=this.props.pairs.slice();t[n]=r;const i=t[t.length-1];i.name&&i.value&&t.push({name:"",value:""}),this.change("pairs",t)});d(this,"serialize",()=>de.serialize.call(this))}render(){const n=z.map(this.props.pairs,(r,t)=>e.jsx(Ca,{name:r.name,value:r.value,onChange:this.handlePairChange.bind(this,t)},t));return e.jsx("div",{children:n})}}d($r,"propTypes",{...ue,pairs:L.arrayOf(L.shape({name:L.string,value:L.string})).isRequired});class kn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleSettingsChange",n=>{this.change({settings:n.pairs})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsxs("div",{style:{fontWeight:"bold",textAlign:"center"},children:["This widget is deprecated! ",e.jsx("br",{}),"Try using the Video or CS Program widgets instead."]}),e.jsxs("label",{children:["Url or Program ID:",e.jsx(Se,{value:this.props.url,onChange:this.change("url")})]}),e.jsx("br",{}),e.jsxs("label",{children:["Settings:",e.jsx($r,{name:"settings",pairs:this.props.settings,onChange:this.handleSettingsChange})]}),e.jsx("br",{}),e.jsxs("label",{children:["Width:",e.jsx(Se,{value:this.props.width,onChange:this.change("width")})]}),e.jsxs("label",{children:["Height:",e.jsx(Se,{value:this.props.height,onChange:this.change("height")})]}),e.jsx(pe,{label:"Allow full screen",checked:this.props.allowFullScreen,onChange:n=>{this.props.onChange({allowFullScreen:n})}}),e.jsx("br",{}),e.jsx(pe,{label:"Allow iframe content to redirect the page",checked:this.props.allowTopNavigation,onChange:n=>{this.props.onChange({allowTopNavigation:n})}})]})}}d(kn,"propTypes",{...ue}),d(kn,"widgetName","iframe"),d(kn,"defaultProps",no.defaultWidgetOptions);kn.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleSettingsChange",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"IframeEditor",props:{url:{defaultValue:{value:'""',computed:!1},required:!1},settings:{defaultValue:{value:'[{name: "", value: ""}]',computed:!1},required:!1},width:{defaultValue:{value:'"400"',computed:!1},required:!1},height:{defaultValue:{value:'"400"',computed:!1},required:!1},allowFullScreen:{defaultValue:{value:"false",computed:!1},required:!1},allowTopNavigation:{defaultValue:{value:"false",computed:!1},required:!1}},composes:["@khanacademy/perseus"]};const Ci={marginBlock:v.size_080},Ti={minHeight:100},nn=40,Vr=9,Wr=9,Te={clearSearch:"Clear search",filter:"Filter",noResults:"No results",someSelected:o=>o===1?"1 item":`${o} items`};var Si={listbox:{border:{radius:D.radius.radius_040},layout:{padding:{inline:v.size_0,block:v.size_040}},shadow:{default:`0 ${v.size_080} ${v.size_080} 0 ${E.core.shadow.transparent}`}},opener:{border:{width:{error:D.width.thin},radius:{rest:D.radius.radius_040,press:D.radius.radius_040}},color:{icon:E.core.foreground.neutral.default},layout:{padding:{inline:v.size_160,inlineStart:v.size_160,inlineEnd:v.size_120}}},item:{border:{radius:{default:D.radius.radius_040,press:D.radius.radius_040}},layout:{padding:{block:v.size_100,inlineStart:v.size_080,inlineEnd:v.size_160}},font:{weight:Ne.weight.regular}}},H=Tr(Si,"--wb-c-dropdown-");class Nn extends g.Component{static isClassOf(a){return a&&a.type&&a.type.__IS_ACTION_ITEM__}render(){const{disabled:a,horizontalRule:n,href:r,target:t,indent:i,label:s,lang:l,leftAccessory:u,rightAccessory:p,onClick:h,role:b,style:x,testId:T,active:S}=this.props,P=[sn.wrapper,x],M=typeof s=="string"?e.jsx(Fn,{tag:"div",lang:l,style:sn.label,children:s}):g.cloneElement(s,{lang:l,style:sn.label,...s.props});return e.jsx(io,{disabled:a,horizontalRule:n,leftAccessory:u,rightAccessory:p,style:[P,sn.shared,i&&sn.indent],role:b,testId:T,title:M,href:r,target:t,onClick:h,active:S})}}Nn.defaultProps={disabled:!1,horizontalRule:"none",indent:!1,role:"menuitem"};Nn.__IS_ACTION_ITEM__=!0;const sn=R.StyleSheet.create({wrapper:{minHeight:nn,touchAction:"manipulation",":focus":{borderRadius:H.item.border.radius.default,outline:be.focus[":focus-visible"].outline,outlineOffset:`calc(${D.width.medium} * -1)`,boxShadow:`inset 0 0 0 calc(${D.width.medium}*2) ${E.focus.inner}`,":after":{content:"unset"}}},shared:{minHeight:nn,paddingBlock:H.item.layout.padding.block},label:{fontWeight:H.item.font.weight,lineHeight:v.size_200,whiteSpace:"nowrap",userSelect:"none"},indent:{paddingInlineStart:v.size_320}}),Ai=function(o){const{selected:a,disabled:n}=o,r=n?E.core.foreground.disabled.strong:E.core.foreground.instructive.default;return e.jsx(Ae,{color:r,icon:La,size:"small",style:[Ua.bounds,!a&&Ua.hide]})},Ua=R.StyleSheet.create({bounds:{alignSelf:"center",height:v.size_160,minHeight:v.size_160,minWidth:v.size_160},hide:{visibility:"hidden"}}),Pi=function(o){const{disabled:a,selected:n}=o;return e.jsx(y,{className:"checkbox",style:[_n.checkbox,n&&!a&&_n.selected,a&&_n.disabledCheckbox],children:n&&e.jsx(Ae,{icon:La,size:"small",className:"check",style:[{width:v.size_120,height:v.size_120,margin:v.size_020},a&&n&&_n.disabledCheckFormatting]})})},Je={color:{default:{border:E.input.default.border,background:E.input.default.background},disabled:{border:E.input.disabled.border,background:E.input.disabled.background},selected:{background:E.input.checked.background,foreground:E.input.checked.foreground}}},_n=R.StyleSheet.create({checkbox:{alignSelf:"center",minHeight:v.size_160,minWidth:v.size_160,height:v.size_160,background:Je.color.default.background,borderRadius:3,borderWidth:D.width.thin,borderStyle:"solid",borderColor:Je.color.default.border},selected:{borderWidth:0,background:Je.color.selected.background,color:Je.color.selected.foreground},disabledCheckbox:{borderColor:Je.color.disabled.border,backgroundColor:Je.color.disabled.background},disabledCheckFormatting:{position:"absolute",top:-1,left:-1}});class _ extends g.Component{static isClassOf(a){return a&&a.type&&a.type.__IS_OPTION_ITEM__}getCheckComponent(){return this.props.variant==="check"?Ai:Pi}render(){const{disabled:a,focused:n,label:r,selected:t,testId:i,leftAccessory:s,horizontalRule:l,parentComponent:u,rightAccessory:p,style:h,subtitle1:b,subtitle2:x,value:T,onClick:S,onToggle:P,variant:M,role:j,...A}=this.props,w=this.getCheckComponent(),c=[un.optionItem,h],k=[un.listboxOptionItem,n&&un.listboxOptionItemFocused],I=[un.selectOptionItem];return e.jsx(lo,{disabled:a,horizontalRule:l,style:[c,u==="listbox"?k:I],"aria-selected":t?"true":"false",role:j,testId:i,leftAccessory:e.jsx(e.Fragment,{children:s?e.jsxs(y,{style:{flexDirection:"row",gap:v.size_080},children:[e.jsx(w,{disabled:a,selected:t}),s]}):e.jsx(w,{disabled:a,selected:t})}),rightAccessory:p,subtitle1:b,title:e.jsx(Fn,{tag:"div",style:un.label,children:r}),subtitle2:x,onClick:this.handleClick,tabIndex:u==="listbox"?-1:void 0,...A})}constructor(...a){super(...a),this.handleClick=()=>{const{onClick:n,onToggle:r,value:t}=this.props;r(t),n&&n()}}}_.defaultProps={disabled:!1,focused:!1,horizontalRule:"none",onToggle:()=>{},role:"option",selected:!1};_.__IS_OPTION_ITEM__=!0;const ma={borderRadius:H.item.border.radius.default,outline:be.focus[":focus-visible"].outline,outlineOffset:`calc(${D.width.medium} * -1)`,boxShadow:`inset 0 0 0 calc(${D.width.medium}*2) ${E.focus.inner}`},Ka={outline:"none",boxShadow:"none"},un=R.StyleSheet.create({optionItem:{paddingBlock:H.item.layout.padding.block,paddingInlineStart:H.item.layout.padding.inlineStart,paddingInlineEnd:H.item.layout.padding.inlineEnd,whiteSpace:"nowrap",minHeight:v.size_400,":active":{borderRadius:H.item.border.radius.press},":is([aria-disabled=true])":{":focus":Ka}},listboxOptionItem:{":focus-visible":Ka},listboxOptionItemFocused:{...ma,":focus-visible":ma},selectOptionItem:{":focus":ma},label:{fontWeight:H.item.font.weight,lineHeight:v.size_200,whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},hide:{visibility:"hidden"}});class We extends g.Component{static isClassOf(a){return a&&a.type&&a.type.__IS_SEPARATOR_ITEM__}render(){return e.jsx(y,{style:[Li.separator,this.props.style],"aria-hidden":"true"})}}We.__IS_SEPARATOR_ITEM__=!0;const Li=R.StyleSheet.create({separator:{borderTop:`${D.width.thin} solid ${E.core.border.neutral.subtle}`,height:1,minHeight:1,marginBlock:v.size_040}});class Fa extends g.Component{renderAnchorChildren(a,n){const{disabled:r,testId:t,text:i,opened:s,"aria-controls":l,"aria-haspopup":u,"aria-required":p,id:h,role:b,onBlur:x}=this.props,T=this.props.children({...a,text:i,opened:s}),S=T.props,P=this.getTestIdFromProps(S),M=S["aria-label"]??this.props["aria-label"];return g.cloneElement(T,{...n,"aria-label":M??void 0,"aria-invalid":this.props.error,disabled:r,"aria-controls":l,role:b,id:h,"aria-expanded":s?"true":"false","aria-haspopup":u,"aria-required":p,onClick:S.onClick?j=>{S.onClick(j),n.onClick(j)}:n.onClick,"data-testid":P||t,onBlur:x})}render(){return e.jsx(so,{onClick:this.props.onClick,disabled:this.props.disabled,tabIndex:0,children:(a,n)=>this.renderAnchorChildren(a,n)})}constructor(...a){super(...a),this.getTestIdFromProps=n=>n.testId||n["data-testid"]}}Fa.defaultProps={disabled:!1};class ji extends g.Component{render(){const{data:a,index:n,style:r}=this.props,t=a[n];if(We.isClassOf(t.component))return g.cloneElement(t.component,{style:r});{const{component:i,populatedProps:s,onClick:l,role:u,ref:p}=t;return g.cloneElement(i,{style:r,...s,key:n,onClick:l,ref:t.focusable&&p,role:u})}}}function Xa(o,a=0){return o.slice(0,Vr).reduce((n,r)=>We.isClassOf(r.component)?n+Wr:n+nn,a)}class Ii extends g.Component{componentDidMount(){const{schedule:a}=this.props;a.animationFrame(()=>{this.setWidth()})}componentDidUpdate(a){const{data:n,listRef:r}=this.props;a.data.length!==n.length&&(this.setHeight(),r&&r.current&&r.current.resetAfterIndex(1))}setWidth(){const a=en.findDOMNode(this),n=a==null?void 0:a.parentElement;if(n){const r=n.getBoundingClientRect().width;this.setState({width:r})}}setHeight(){const a=Xa(this.props.data);this.setState({height:a})}renderInitialItems(){const{data:a}=this.props,n=a.map(t=>t.component);return g.Children.toArray(n).filter(Boolean).sort((t,i)=>i.props.label&&t.props.label?i.props.label.length-t.props.label.length:-1).slice(0,Vr).map(t=>g.cloneElement(t,{style:{visibility:"hidden"}}))}renderVirtualizedList(a,n){const{data:r,listRef:t}=this.props;return e.jsx(uo,{height:n,itemCount:r.length,itemSize:this.getItemSize,itemData:r,style:{overflowX:"hidden"},width:a,overscanCount:5,ref:t,children:ji})}render(){const{width:a,height:n}=this.state;return a==null?this.renderInitialItems():this.renderVirtualizedList(a,n)}constructor(a){super(a),this.getItemSize=n=>{const r=this.props.data[n];return We.isClassOf(r.component)?Wr:nn},this.state={height:Xa(a.data),width:a.width}}}var Ni=Sr(Ii);function Ri({state:o,options:a}){const n=Yo(o,a),{y:r}=o.modifiersData.preventOverflow||{y:0},{height:t}=o.rects.popper,[i]=o.placement.split("-"),l=t-n[i==="top"?"top":"bottom"]-r;o.styles.popper={...o.styles.popper,maxHeight:`${l}px`,"--popper-max-height":`${l}px`}}const Fi={name:"maxHeight",enabled:!0,phase:"main",options:{padding:nn},requiresIfExists:["offset","preventOverflow","flip"],fn:Ri},Oi=[{name:"preventOverflow",options:{rootBoundary:"viewport",altAxis:!0,tether:!1}},Fi],zi=function({children:o,alignment:a="left",onPopperElement:n,referenceElement:r}){const t=po(r)||document.querySelector("body");return t?en.createPortal(e.jsx(Jo,{innerRef:i=>{i&&n&&n(i)},referenceElement:r,strategy:"fixed",placement:a==="left"?"bottom-start":"bottom-end",modifiers:Oi,children:({placement:i,ref:s,style:l,hasPopperEscaped:u,isReferenceHidden:p})=>{const h=!!(u||p);return e.jsx("div",{ref:s,style:l,"data-testid":"dropdown-popper","data-placement":i,children:o(h)})}}),t):null};function Ei(o){return o.length===1||!/^[A-Z]/i.test(o)?o:""}function _i(o,a){let n;return function(...t){const i=()=>{clearTimeout(n),o(...t)};clearTimeout(n),n=setTimeout(i,a)}}function Ja(o){return typeof o=="string"}function Kn(o){return Ja(o.label)?o.label:Ja(o.labelAsText)?o.labelAsText:""}function Di(o,a){return o?Kn(a):a.label}const Mi=125;class ra extends g.Component{static sameItemsFocusable(a,n){if(a.length!==n.length)return!1;for(let r=0;r<a.length;r++)if(a[r].focusable!==n[r].focusable)return!1;return!0}static getDerivedStateFromProps(a,n){if(n.itemRefs.length===0&&a.open||!ra.sameItemsFocusable(n.prevItems,a.items)){const r=[];for(let t=0;t<a.items.length;t++)if(a.items[t].focusable){const i=g.createRef();r.push({ref:i,originalIndex:t})}return{itemRefs:r,prevItems:a.items,sameItemsFocusable:!1}}else return{prevItems:a.items,sameItemsFocusable:!0}}componentDidMount(){this.updateEventListeners(),this.maybeFocusInitialItem()}componentDidUpdate(a){const{open:n,searchText:r}=this.props;if(a.open!==n)this.updateEventListeners(),this.maybeFocusInitialItem();else if(n){const{itemRefs:t,sameItemsFocusable:i}=this.state;if(i||a.searchText!==r)return;{const s=t.findIndex(l=>l.originalIndex===this.focusedOriginalIndex);s===-1?(this.focusedIndex=0,this.itemsClicked=!1,this.scheduleToFocusCurrentItem()):this.focusedIndex=s}this.props.labels!==a.labels&&this.setState({labels:{...this.state.labels,...this.props.labels}})}}componentWillUnmount(){this.removeEventListeners()}resetFocusedIndex(){const{initialFocusedIndex:a}=this.props;if(typeof a<"u")this.focusedIndex=a;else{if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=0}}maybeFocusInitialItem(){const{autoFocus:a,open:n}=this.props;a&&(n?(this.resetFocusedIndex(),this.scheduleToFocusCurrentItem()):n||(this.itemsClicked=!1))}updateEventListeners(){this.props.open?this.addEventListeners():this.removeEventListeners()}addEventListeners(){document.addEventListener("mouseup",this.handleInteract),document.addEventListener("touchend",this.handleInteract)}removeEventListeners(){document.removeEventListener("mouseup",this.handleInteract),document.removeEventListener("touchend",this.handleInteract)}scheduleToFocusCurrentItem(a){this.shouldVirtualizeList()?this.props.schedule.animationFrame(()=>{this.focusCurrentItem(a)}):this.focusCurrentItem(a)}focusCurrentItem(a){const n=this.state.itemRefs[this.focusedIndex];if(!n)return;const{current:r}=this.virtualizedListRef;r&&r.scrollToItem(n.originalIndex);const t=()=>{if(!this.props.open)return;const i=this.state.itemRefs[this.focusedIndex],s=en.findDOMNode(i.ref.current);if(!s&&this.shouldVirtualizeList()){this.props.schedule.animationFrame(t);return}s&&(s.focus(),this.focusedOriginalIndex=i.originalIndex,a&&a(s))};this.shouldVirtualizeList()?this.props.schedule.animationFrame(t):t()}focusSearchField(){this.searchFieldRef.current&&this.searchFieldRef.current.focus()}hasSearchField(){return!!this.props.isFilterable}isSearchFieldFocused(){return this.hasSearchField()&&document.activeElement===this.searchFieldRef.current}focusPreviousItem(){if(this.focusedIndex===0||this.isSearchFieldFocused()&&!this.props.enableTypeAhead){if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=this.state.itemRefs.length-1}else this.isSearchFieldFocused()||(this.focusedIndex-=1);this.scheduleToFocusCurrentItem()}focusNextItem(){if(this.focusedIndex===this.state.itemRefs.length-1||this.isSearchFieldFocused()&&!this.props.enableTypeAhead){if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=0}else this.isSearchFieldFocused()||(this.focusedIndex+=1);this.scheduleToFocusCurrentItem()}restoreTabOrder(){this.props.openerElement&&this.props.openerElement.focus()}getItemRole(){const{role:a}=this.props;switch(a){case"listbox":return"option";case"menu":return"menuitem";default:throw new Error(`Expected "listbox" or "menu" for role, but receieved "${a}" instead.`)}}maybeRenderNoResults(){const{items:a,labels:{noResults:n}}=this.props;return a.length===0?e.jsx(Fn,{style:Ye.noResult,testId:"dropdown-core-no-results",children:n}):null}shouldVirtualizeList(){return this.props.items.length>Mi}renderList(){let a=0;const n=this.getItemRole();return this.props.items.map((r,t)=>{if(We.isClassOf(r.component))return r.component;const{component:i,focusable:s,populatedProps:l}=r;s&&(a+=1);const u=a-1,p=this.state.itemRefs[u]?this.state.itemRefs[u].ref:null;return g.cloneElement(i,{...l,key:t,onClick:()=>{this.handleItemClick(u,r)},ref:s?p:null,role:l.role||n})})}parseVirtualizedItems(){let a=0;const n=this.getItemRole();return this.props.items.map((r,t)=>{const{populatedProps:i}=r;!We.isClassOf(r.component)&&r.focusable&&(a+=1);const s=a-1;return{...r,role:i.role||n,ref:r.focusable&&this.state.itemRefs[s]?this.state.itemRefs[s].ref:null,onClick:()=>{this.handleItemClick(s,r)}}})}renderVirtualizedList(){const a=this.parseVirtualizedItems();return e.jsx(Ni,{data:a,listRef:this.virtualizedListRef})}renderSearchField(){const{searchText:a}=this.props,{labels:n}=this.state;return e.jsx(mo,{clearAriaLabel:n.clearSearch,onChange:this.handleSearchTextChanged,placeholder:n.filter,ref:this.searchFieldRef,style:Ye.searchInputStyle,value:a||""})}renderDropdownMenu(a,n){const{"aria-invalid":r,"aria-required":t,dropdownStyle:i,isFilterable:s,openerElement:l,role:u,id:p}=this.props,h=l&&window.getComputedStyle(l),b=h?h.getPropertyValue("width"):0;return e.jsxs(y,{onMouseUp:this.handleDropdownMouseUp,style:[Ye.dropdown,n&&Ye.hidden,i],testId:"dropdown-core-container",children:[s&&this.renderSearchField(),e.jsx(y,{id:p,role:u,style:[Ye.listboxOrMenu,{minWidth:b}],"aria-invalid":u==="listbox"?r:void 0,"aria-required":u==="listbox"?t:void 0,children:a}),this.maybeRenderNoResults()]})}renderDropdown(){const{alignment:a,openerElement:n}=this.props,r=this.shouldVirtualizeList()?this.renderVirtualizedList():this.renderList();return e.jsx(zi,{alignment:a,onPopperElement:t=>{this.popperElement=t},referenceElement:n,children:t=>this.renderDropdownMenu(r,t)})}render(){const{open:a,opener:n,style:r,className:t,disabled:i}=this.props;return e.jsxs(y,{onKeyDown:i?void 0:this.handleKeyDown,onKeyUp:i?void 0:this.handleKeyUp,style:[Ye.menuWrapper,r],className:t,children:[n,a&&this.renderDropdown()]})}constructor(a){super(a),this.focusedIndex=-1,this.focusedOriginalIndex=-1,this.itemsClicked=!1,this.searchFieldRef=g.createRef(),this.handleInteract=n=>{const{open:r,onOpenChanged:t}=this.props,i=n.target,s=en.findDOMNode(this);r&&s&&!s.contains(i)&&this.popperElement&&!this.popperElement.contains(i)&&t(!1)},this.handleKeyDown=n=>{const{enableTypeAhead:r,onOpenChanged:t,open:i,searchText:s}=this.props,l=n.key;if(r&&Ei(l)&&(n.stopPropagation(),this.textSuggestion+=l,this.handleKeyDownDebounced(this.textSuggestion)),!i){if(l===fe.down){n.preventDefault(),t(!0);return}return}switch(l){case fe.tab:if(this.isSearchFieldFocused()&&s)return;this.restoreTabOrder(),t(!1);return;case fe.space:if(this.isSearchFieldFocused())return;n.preventDefault();return;case fe.up:n.preventDefault(),this.focusPreviousItem();return;case fe.down:n.preventDefault(),this.focusNextItem();return}},this.handleKeyUp=n=>{const{onOpenChanged:r,open:t}=this.props;switch(n.key){case fe.space:if(this.isSearchFieldFocused())return;n.preventDefault();return;case fe.escape:t&&(n.stopPropagation(),this.restoreTabOrder(),r(!1));return}},this.handleKeyDownDebounceResult=n=>{const r=this.props.items.filter(t=>t.focusable).findIndex(({component:t})=>{if(We.isClassOf(t))return!1;if(_.isClassOf(t)){const i=t.props;return Kn(i).toLowerCase().startsWith(n.toLowerCase())}return!1});if(r>=0){const t=!this.props.open;t&&this.props.onOpenChanged(!0),this.focusedIndex=r,this.scheduleToFocusCurrentItem(i=>{this.props.selectionType==="single"&&t&&i&&(i.click(),this.props.onOpenChanged(!1))})}this.textSuggestion=""},this.handleClickFocus=n=>{this.itemsClicked=!0,this.focusedIndex=n,this.focusedOriginalIndex=this.state.itemRefs[this.focusedIndex].originalIndex},this.handleDropdownMouseUp=n=>{n.nativeEvent.stopImmediatePropagation?n.nativeEvent.stopImmediatePropagation():n.stopPropagation()},this.handleItemClick=(n,r)=>{this.handleClickFocus(n),r.component.props.onClick&&r.component.props.onClick(),r.populatedProps.onClick&&r.populatedProps.onClick()},this.handleSearchTextChanged=n=>{const{onSearchTextChanged:r}=this.props;r&&r(n)},this.resetFocusedIndex(),this.state={prevItems:this.props.items,itemRefs:[],sameItemsFocusable:!1,labels:{noResults:Te.noResults,someResults:Te.someSelected,...a.labels}},this.virtualizedListRef=g.createRef(),this.handleKeyDownDebounced=_i(this.handleKeyDownDebounceResult,500),this.textSuggestion=""}}ra.defaultProps={alignment:"left",autoFocus:!0,enableTypeAhead:!0,labels:{clearSearch:Te.clearSearch,filter:Te.filter,noResults:Te.noResults,someResults:Te.someSelected},selectionType:"single"};const Ye=R.StyleSheet.create({menuWrapper:{width:"fit-content"},dropdown:{backgroundColor:E.surface.primary,borderRadius:H.listbox.border.radius,paddingBlock:H.listbox.layout.padding.block,paddingInline:H.listbox.layout.padding.inline,border:`solid ${D.width.thin} ${E.core.border.neutral.subtle}`,boxShadow:H.listbox.shadow.default,maxHeight:"var(--popper-max-height)"},listboxOrMenu:{overflowY:"auto"},hidden:{pointerEvents:"none",visibility:"hidden"},noResult:{color:E.core.foreground.neutral.default,alignSelf:"center",marginBlockStart:v.size_060},searchInputStyle:{margin:v.size_080,marginBlockStart:v.size_040,minHeight:"auto",position:"sticky"},srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}});var Gr=Sr(ra);const $i=v.size_040,Vi={root:{border:{width:{primary:{default:D.width.none,hover:D.width.medium,press:D.width.medium},secondary:{default:D.width.thin,hover:D.width.thin,press:D.width.thin},tertiary:{default:D.width.none,hover:D.width.none,press:D.width.none}},offset:{primary:D.width.medium,secondary:0,tertiary:0},radius:{default:D.radius.radius_040,hover:D.radius.radius_040,press:D.radius.radius_040}},sizing:{height:{small:v.size_320,medium:v.size_400,large:v.size_560},underline:{hover:v.size_020,press:v.size_010}},layout:{padding:{inline:{primary:{small:v.size_160,medium:v.size_160,large:v.size_320},secondary:{small:v.size_120,medium:v.size_160,large:v.size_180},tertiary:{small:v.size_0,medium:v.size_0,large:v.size_0}}}},font:{size:{large:"1.8rem"},lineHeight:{small:Ne.lineHeight.xMedium,default:Ne.lineHeight.large,large:"2.6rem"},weight:{default:Ne.weight.bold},decoration:{hover:"underline",press:"underline"},offset:{default:$i}}},icon:{margin:{inline:{inner:v.size_060,outer:`calc(-1 * ${D.width.medium})`}},padding:v.size_020,sizing:{small:v.size_160,medium:v.size_240,large:v.size_240}}};var B=Tr(Vi,"--wb-c-button-");function Ya({icon:o,size:a,style:n,testId:r}){const t={width:B.icon.sizing[a],height:B.icon.sizing[a]},i={"aria-hidden":!0,color:"currentColor",style:[n,t],testId:r};switch(a){case"small":return e.jsx(Ae,{...i,size:"small",icon:o});case"medium":default:return e.jsx(Ae,{...i,size:"medium",icon:o})}}const Wi=an("a"),Gi=an("button"),Bi=an(ao),Br=g.forwardRef(function(a,n){const{children:r,disabled:t,href:i,id:s,skipClientNav:l,style:u,testId:p,type:h,...b}=a,x={"data-testid":p,id:s,role:"button",style:[Hi.reset,u],...b},T=Pa();return i&&!t?T&&!l&&ro(i)?e.jsx(Bi,{...x,to:i,ref:n,children:r}):e.jsx(Wi,{...x,href:i,ref:n,children:r}):e.jsx(Gi,{type:h||"button",...x,"aria-disabled":t,ref:n,children:r})}),Hi=R.StyleSheet.create({reset:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",margin:0,padding:0,border:"none",cursor:"pointer",outline:"none",textDecoration:"none",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",":focus":{WebkitTapHighlightColor:"rgba(0,0,0,0)"}}}),Ui=g.forwardRef(function(a,n){const{children:r,skipClientNav:t,actionType:i,disabled:s,focused:l,hovered:u,href:p=void 0,kind:h="primary",labelStyle:b,pressed:x,size:T="medium",style:S,testId:P,type:M=void 0,spinner:j,startIcon:A,endIcon:w,id:c,waiting:k,...I}=a,f=Ki(i,h,T),q=j||s,N=[re.shared,A&&re.withStartIcon,w&&re.withEndIcon,f.default,q&&f.disabled,!q&&(x?f.pressed:l&&f.focused),T==="small"&&re.small,T==="large"&&re.large],K=T==="small"?Ie:W,ee=e.jsx(K,{style:[re.text,T==="small"&&re.smallText,T==="large"&&re.largeText,b,j&&re.hiddenText,h==="tertiary"&&!q&&(x?[f.hover,f.active]:u&&f.hover)],testId:P?`${P}-inner-label`:void 0,children:r}),O={medium:"small",small:"xsmall",large:"medium"},$=T==="small"?"small":"medium",V=e.jsxs(g.Fragment,{children:[A&&e.jsx(y,{style:re.iconWrapper,children:e.jsx(Ya,{size:$,icon:A,style:[re.startIcon,h==="tertiary"&&re.tertiaryStartIcon],testId:P?`${P}-start-icon`:void 0})}),ee,j&&e.jsx(to,{style:re.spinner,size:O[T],light:h==="primary",testId:`${P||"button"}-spinner`}),w&&e.jsx(y,{testId:P?`${P}-end-icon-wrapper`:void 0,style:[gn.endIcon,re.iconWrapper,re.endIconWrapper,h==="tertiary"&&re.endIconWrapperTertiary],children:e.jsx(Ya,{size:$,icon:w,testId:P?`${P}-end-icon`:void 0})})]});return e.jsx(Br,{...I,disabled:q,href:p,id:c,ref:n,skipClientNav:t,style:[N,S],testId:P,tabIndex:a.tabIndex,type:M,children:V})}),re=R.StyleSheet.create({shared:{height:B.root.sizing.height.medium,paddingBlock:0},small:{height:B.root.sizing.height.small},large:{height:B.root.sizing.height.large},text:{alignItems:"center",fontWeight:B.root.font.weight.default,whiteSpace:"nowrap",overflow:"hidden",lineHeight:B.root.font.lineHeight.default,textOverflow:"ellipsis",display:"inline-block",pointerEvents:"none"},smallText:{lineHeight:B.root.font.lineHeight.small},largeText:{fontSize:B.root.font.size.large,lineHeight:B.root.font.lineHeight.large},hiddenText:{visibility:"hidden"},spinner:{position:"absolute"},startIcon:{marginInlineStart:B.icon.margin.inline.outer,marginInlineEnd:B.icon.margin.inline.inner},tertiaryStartIcon:{marginInlineStart:0},endIcon:{marginInlineStart:B.icon.margin.inline.inner},iconWrapper:{padding:B.icon.padding,minWidth:"auto"},endIconWrapper:{marginInlineStart:B.icon.margin.inline.inner,marginInlineEnd:B.icon.margin.inline.outer},endIconWrapperTertiary:{marginInlineEnd:0}}),gn={},Ki=(o="progressive",a,n)=>{const r=`${o}-${a}-${n}`;if(gn[r])return gn[r];const t=B.root.layout.padding.inline[a][n],i=B.root.border.width[a],s=B.root.border.offset[a],l=E.action[a][o],u=E.action[a].disabled,p={borderColor:u.border,borderWidth:i.default,borderRadius:B.root.border.radius.default,background:u.background,color:u.foreground},h={...p,outline:"none",boxShadow:"none",textDecoration:"none",textDecorationThickness:"unset",textUnderlineOffset:"unset"},b={background:l.press.background,borderRadius:B.root.border.radius.press,color:l.press.foreground,...a==="primary"?{outline:`${i.press} solid ${l.press.border}`,outlineOffset:s}:void 0,...a!=="primary"?{borderColor:l.press.border,boxShadow:`inset 0 0 0 ${i.press} ${l.press.border}`}:void 0,...a==="tertiary"?{textUnderlineOffset:B.root.font.offset.default,textDecoration:`${B.root.font.decoration.press} ${B.root.sizing.underline.press}`}:void 0},x={default:{borderRadius:B.root.border.radius.default,paddingInline:t,borderStyle:"solid",borderWidth:i.default,borderColor:l.default.border,background:l.default.background,color:l.default.foreground,transition:"border-radius 0.1s ease-in-out",":hover":{background:l.hover.background,borderRadius:B.root.border.radius.hover,color:l.hover.foreground,...a==="primary"?{outline:`${i.hover} solid ${l.hover.border}`,outlineOffset:s}:void 0,...a!=="primary"?{borderColor:l.hover.border,boxShadow:`inset 0 0 0 ${i.hover} ${l.hover.border}`}:void 0,...a==="tertiary"?{textUnderlineOffset:B.root.font.offset.default,textDecoration:`${B.root.font.decoration.hover} ${B.root.sizing.underline.hover}`}:void 0},"@media not (hover: hover)":{":hover":{backgroundColor:"transparent"}},":active":b,...be.focus,...a==="secondary"?{":focus-visible:hover":{...be.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${i.hover} ${l.hover.border}, ${be.focus[":focus-visible"].boxShadow}`},":focus-visible:active":{...be.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${i.press} ${l.press.border}, ${be.focus[":focus-visible"].boxShadow}`}}:{}},pressed:b,disabled:{cursor:"not-allowed",...p,":hover":h,":active":h,":focus-visible":p}};return gn[r]=R.StyleSheet.create(x),gn[r]},Xi=g.forwardRef(function(a,n){const{href:r=void 0,type:t=void 0,children:i,skipClientNav:s,onClick:l,beforeNav:u=void 0,safeWithNav:p=void 0,tabIndex:h,target:b,rel:x,actionType:T="progressive",kind:S="primary",size:P="medium",disabled:M=!1,spinner:j=!1,...A}=a,w=Pa(),c=Ar(r,s,w),k=u?{beforeNav:u}:{target:b};return e.jsx(c,{disabled:j||M,href:r,role:"button",type:t,onClick:l,safeWithNav:p,rel:x,...k,children:(I,f)=>e.jsx(Ui,{...A,...I,...f,disabled:M,spinner:j||I.waiting,actionType:T,kind:S,size:P,skipClientNav:s,href:r,target:b,type:t,tabIndex:h,ref:n,children:i})})}),Ji=g.forwardRef(function(a,n){const{children:r,disabled:t=!1,kind:i="primary",focused:s,pressed:l,styles:u,type:p=void 0,startIcon:h,endIcon:b,hovered:x,waiting:T,...S}=a,P=Yi("progressive",t,i),M=[P.button,t&&P.disabled,!t&&l&&P.pressed,!t&&!l&&s&&P.focused,u==null?void 0:u.root],j=[P.chonky,t&&P.chonkyDisabled,!t&&l&&P.chonkyPressed,u==null?void 0:u.box];return e.jsx(Br,{...S,disabled:t,ref:n,style:M,type:p,children:e.jsx(e.Fragment,{children:e.jsxs(y,{style:j,className:"chonky",children:[h&&e.jsx(Ae,{size:"medium",color:"currentColor",icon:h,style:[pa.icon,u==null?void 0:u.startIcon],"aria-hidden":"true"}),e.jsx(Fn,{tag:"span",size:"medium",weight:"semi",style:[pa.label,u==null?void 0:u.label],children:r}),b&&e.jsx(Ae,{size:"medium",color:"currentColor",icon:b,style:[pa.icon,u==null?void 0:u.endIcon],"aria-hidden":"true"})]})})})});g.forwardRef(function(a,n){const{href:r=void 0,type:t=void 0,children:i,skipClientNav:s,onClick:l,beforeNav:u=void 0,safeWithNav:p=void 0,tabIndex:h,target:b,rel:x,kind:T="primary",disabled:S=!1,...P}=a,M=Pa(),j=Ar(r,s,M),A=u?{beforeNav:u}:{target:b};return e.jsx(j,{disabled:S,href:r,role:r?"link":"button",type:t,onClick:l,safeWithNav:p,rel:x,...A,children:(w,c)=>e.jsx(Ji,{...P,...w,...c,disabled:S,kind:T,skipClientNav:s,href:r,target:b,type:t,tabIndex:h,ref:n,children:i})})});const Z={root:{border:{width:{primary:{rest:D.width.thin,hover:D.width.thin,press:D.width.thin},secondary:{rest:D.width.thin,hover:D.width.thin,press:D.width.thin},tertiary:{rest:D.width.thin,hover:D.width.thin,press:D.width.thin}},radius:D.radius.radius_120},layout:{padding:{block:v.size_140,inline:v.size_480}},shadow:{y:{rest:"6px",hover:"8px",press:v.size_0}}},label:{color:{progressive:E.core.foreground.instructive.default,neutral:E.core.foreground.neutral.default,disabled:E.core.foreground.disabled.default},font:{lineHeight:v.size_140},layout:{padding:{blockStart:v.size_040,blockEnd:v.size_060},width:v.size_640}},icon:{sizing:{height:v.size_200,width:v.size_200}}},pa={icon:{alignSelf:"center",width:Z.icon.sizing.width,height:Z.icon.sizing.height},label:{lineHeight:Z.label.font.lineHeight,paddingBlockStart:Z.label.layout.padding.blockStart,paddingBlockEnd:Z.label.layout.padding.blockEnd}},Dn={},Yi=(o="progressive",a,n)=>{const r=`${o}-d_${a}-${n}`;if(Dn[r])return Dn[r];const t=Z.root.border.width[n],i=E.chonky[o],s=E.chonky.disabled,l={outline:"none",transform:"none"},u={background:s.background[n],borderWidth:t.rest,borderColor:s.border[n],color:s.foreground[n],boxShadow:`0 ${Z.root.shadow.y.rest} 0 0 ${s.shadow[n]}`,transform:"none"},p={background:i.background[n].press,border:`${t.press} solid ${i.border[n].press}`,boxShadow:`0 ${Z.root.shadow.y.press} 0 0 ${i.shadow[n].press}`,color:i.foreground[n].press,transform:`translateY(${Z.root.shadow.y.rest})`},h={button:{background:"transparent",borderRadius:Z.root.border.radius,color:Z.label.color[o],height:"auto",flexDirection:"column",gap:v.size_020,alignSelf:"flex-start",justifySelf:"center",":is(:hover) .chonky":{background:i.background[n].hover,border:`${t.hover} solid ${i.border[n].hover}`,boxShadow:`0 ${Z.root.shadow.y.hover} 0 0 ${i.shadow[n].hover}`,color:i.foreground[n].hover,transform:`translateY(calc((${Z.root.shadow.y.hover} - ${Z.root.shadow.y.rest}) * -1))`},":is(:active) .chonky":p,...be.focus},focused:be.focus[":focus-visible"],disabled:{cursor:"not-allowed",color:Z.label.color.disabled,...l,":hover":l,":active":l,":focus-visible":{transform:"none"},":is(:hover) .chonky":l,":is(:hover) .chonky":u,":is(:active) .chonky":u},pressed:{".chonky":p},chonky:{flexDirection:"row",gap:v.size_080,borderRadius:Z.root.border.radius,marginBlockEnd:Z.root.shadow.y.rest,maxWidth:"100%",paddingBlock:Z.root.layout.padding.block,paddingInline:Z.root.layout.padding.inline,background:i.background[n].rest,border:`${t.rest} solid ${i.border[n].rest}`,color:i.foreground[n].rest,boxShadow:`0 ${Z.root.shadow.y.rest} 0 0 ${i.shadow[n].rest}`,transition:"all 0.12s ease-out","@media not (hover: hover)":{transition:"none"}},chonkyPressed:p,chonkyDisabled:u};return Dn[r]=R.StyleSheet.create(h),Dn[r]};class Qi extends g.Component{render(){const{children:a,disabled:n,waiting:r,testId:t,opened:i,"aria-label":s,...l}=this.props;return e.jsx(Xi,{"aria-expanded":i?"true":"false","aria-haspopup":"menu",kind:"tertiary","aria-label":s,disabled:n,...l,testId:t,endIcon:ea,children:a})}}class Hr extends g.Component{static getDerivedStateFromProps(a,n){return{opened:typeof a.opened=="boolean"?a.opened:n.opened}}getMenuItems(){const{children:a,selectedValues:n}=this.props,r=g.Children.toArray(a).filter(Boolean),t=r.some(i=>_.isClassOf(i));return r.map(i=>{const{value:s,disabled:l}=i.props,u={component:i,focusable:Nn.isClassOf(i)||_.isClassOf(i)?!l:!1,populatedProps:{}};if(Nn.isClassOf(i))return{...u,populatedProps:{indent:t,onClick:this.handleItemSelected}};if(_.isClassOf(i)){const p=n?n.includes(s):!1;return{...u,populatedProps:{onToggle:this.handleOptionSelected,selected:p,variant:"check",role:"menuitemcheckbox","aria-checked":p,"aria-selected":void 0}}}else return u})}renderOpener(a,n){const{disabled:r,menuText:t,opener:i,testId:s,id:l}=this.props;return e.jsx(In,{id:l,children:u=>e.jsx(Fa,{id:u,"aria-controls":n,"aria-haspopup":"menu",onClick:this.handleClick,disabled:a===0||r,text:t,ref:this.handleOpenerRef,testId:i?void 0:s,opened:this.state.opened,role:"button",children:i||(p=>{const{text:h,opened:b,...x}=p;return e.jsx(Qi,{...x,disabled:r,opened:!!b,testId:s,children:t})})})})}render(){const{alignment:a,dropdownStyle:n,style:r,className:t,dropdownId:i}=this.props,s=this.getMenuItems();return e.jsx(In,{id:i,children:l=>e.jsx(Gr,{id:l,role:"menu",style:r,className:t,opener:this.renderOpener(s.length,l),alignment:a,open:this.state.opened,items:s,openerElement:this.openerElement,onOpenChanged:this.handleOpenChanged,dropdownStyle:[Zi.menuTopSpace,n]})})}constructor(...a){super(...a),this.state={opened:!1},this.handleItemSelected=()=>{this.handleOpenChanged(!1),this.openerElement&&this.openerElement.focus()},this.handleOpenChanged=n=>{this.setState({opened:n}),this.props.onToggle&&this.props.onToggle(n)},this.handleOptionSelected=n=>{const{onChange:r,selectedValues:t}=this.props;if(!(!r||!t)){if(t.includes(n)){const i=t.indexOf(n),s=[...t.slice(0,i),...t.slice(i+1)];r(s)}else r([...t,n]);this.handleItemSelected()}},this.handleOpenerRef=n=>{this.openerElement=en.findDOMNode(n)},this.handleClick=n=>{this.handleOpenChanged(!this.state.opened)}}}Hr.defaultProps={alignment:"left",disabled:!1};const Zi=R.StyleSheet.create({caret:{marginInlineStart:v.size_040},opener:{whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},menuTopSpace:{top:`calc(-1 * ${v.size_040})`}}),el=an("button");class Ur extends g.Component{render(){const{children:a,disabled:n,error:r,id:t,isPlaceholder:i,open:s,testId:l,"aria-label":u,"aria-required":p,"aria-controls":h,onBlur:b,onOpenChanged:x,...T}=this.props,S=nl(i,r),P=n?E.core.foreground.disabled.default:H.opener.color.icon,M=[ca.shared,S.default,n&&S.disabled,!n&&this.state.pressed&&S.press];return e.jsxs(el,{...T,"aria-disabled":n,"aria-expanded":s?"true":"false","aria-invalid":r,"aria-label":u??void 0,"aria-required":p,"aria-haspopup":"listbox","aria-controls":h,"data-testid":l,id:t,role:"combobox",type:"button",style:M,onClick:n?void 0:this.handleClick,onKeyDown:n?void 0:this.handleKeyDown,onKeyUp:n?void 0:this.handleKeyUp,onBlur:b,children:[e.jsx(Fn,{tag:"span",style:ca.text,children:a||e.jsx("span",{"aria-hidden":"true",children:" "})}),e.jsx(Ae,{icon:ea,color:P,size:"small",style:ca.caret,"aria-hidden":"true"})]})}constructor(a){super(a),this.handleClick=n=>{const{open:r}=this.props;this.props.onOpenChanged(!r)},this.handleKeyDown=n=>{const r=n.key;(r===fe.enter||r===fe.space)&&(this.setState({pressed:!0}),n.preventDefault())},this.handleKeyUp=n=>{const r=n.key;(r===fe.enter||r===fe.space)&&(this.setState({pressed:!1}),this.handleClick(n))},this.state={pressed:!1}}}Ur.defaultProps={disabled:!1,error:!1,isPlaceholder:!1};const ca=R.StyleSheet.create({shared:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"space-between",color:E.text.primary,height:nn,paddingInlineStart:H.opener.layout.padding.inlineStart,paddingInlineEnd:H.opener.layout.padding.inlineEnd,borderWidth:0,borderRadius:H.opener.border.radius.rest,borderStyle:"solid",outline:"none",textDecoration:"none",boxSizing:"border-box",whiteSpace:"nowrap",touchAction:"manipulation"},text:{marginInlineEnd:v.size_080,whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},caret:{minWidth:16}}),Mn={},nl=(o,a)=>{const n=`${o}-${a}`;if(Mn[n])return Mn[n];const r=a?"destructive":"progressive",t=E.action.secondary[r],i={borderColor:t.hover.border,boxShadow:`inset 0 0 0 ${D.width.thin} ${t.hover.border}`},s={background:t.press.background,color:o?a?E.input.default.placeholder:E.core.foreground.instructive.default:E.input.default.foreground,borderColor:t.press.border,boxShadow:`inset 0 0 0 ${D.width.thin} ${t.press.border}`,borderRadius:H.opener.border.radius.press},l=a?E.input.error:E.input.default,u={background:E.input.disabled.background,borderColor:E.input.disabled.border,borderWidth:D.width.thin,borderRadius:H.opener.border.radius.rest,color:E.input.disabled.placeholder},p={default:{background:l.background,borderColor:l.border,borderWidth:a?H.opener.border.width.error:D.width.thin,color:o?E.core.foreground.neutral.subtle:l.foreground,cursor:"pointer",":hover":i,"@media not (hover: hover)":{":hover":{borderColor:l.border,borderWidth:D.width.thin,paddingInlineStart:H.opener.layout.padding.inlineStart,paddingInlineEnd:H.opener.layout.padding.inlineEnd}},":active":s,...be.focus},disabled:{...u,cursor:"not-allowed",":hover":{...u,outline:"none",boxShadow:"none"},":active":{...u,outline:"none",boxShadow:"none"},":focus-visible":u},press:s};return Mn[n]=R.StyleSheet.create(p),Mn[n]},al="This field is required.";function dn(o){return o?o.length>0:!1}function rl({value:o,disabled:a=!1,validate:n,onValidate:r,required:t,open:i}){const[s,l]=g.useState(()=>n&&dn(o)&&!a&&n(o)||null),u=g.useCallback(T=>{if(!a){if(n){const S=T!==void 0&&n(T)||null;if(l(S),r&&r(S),S)return}if(t){const S=typeof t=="string"?t:al,P=dn(T)?null:S;l(P),r&&r(P)}}},[a,n,l,r,t]);co(()=>{dn(o)&&u(o)});function p(){!i&&t&&!dn(o)&&u(o)}return{errorMessage:s,onOpenerBlurValidation:p,onDropdownClosedValidation:()=>{t&&!dn(o)&&u(o)},onSelectionValidation:T=>{u(T)},onSelectedValuesChangeValidation:()=>{l(null),r&&r(null)}}}const te=o=>{const a=g.useRef(0),{children:n,error:r=!1,id:t,opener:i,placeholder:s,selectedValue:l,testId:u,alignment:p="left",autoFocus:h=!0,dropdownStyle:b,enableTypeAhead:x=!0,isFilterable:T,labels:S={clearSearch:Te.clearSearch,filter:Te.filter,noResults:Te.noResults,someResults:Te.someSelected},onChange:P,onToggle:M,opened:j,style:A,className:w,"aria-label":c,"aria-invalid":k,"aria-required":I,disabled:f=!1,dropdownId:q,validate:N,onValidate:K,required:ee,showOpenerLabelAsText:O=!0,...$}=o,[V,ce]=g.useState(!1),[_e,za]=g.useState(""),[oa,St]=g.useState(),{errorMessage:At,onOpenerBlurValidation:Ea,onDropdownClosedValidation:Pt,onSelectionValidation:Lt}=rl({value:l,disabled:f,validate:N,onValidate:K,required:ee,open:V}),_a=r||!!At;g.useEffect(()=>{f?ce(!1):typeof j=="boolean"&&ce(j)},[f,j]);const ia=G=>{ce(G),za(""),M&&M(G),G||Pt()},jt=G=>{G!==l&&P(G),V&&oa&&oa.focus(),ce(!1),M&&M(!1),Lt(G)},It=G=>{let he=0;return a.current=0,G.map(ke=>{const{disabled:Ue,value:Ke}=ke.props,sa=l===Ke;return sa&&(a.current=he),Ue||(he+=1),{component:ke,focusable:!Ue,populatedProps:{onToggle:jt,selected:sa,variant:"check"}}})},Nt=G=>{const he=_e.toLowerCase();return G.filter(({props:ke})=>!_e||Kn(ke).toLowerCase().indexOf(he)>-1)},Rt=G=>It(T?Nt(G):G),Ft=G=>{za(G)},Da=G=>{const he=en.findDOMNode(G);St(he)},Ot=G=>{ia(!V)},Ma=G=>{ho({message:G})};g.useEffect(()=>{const he=g.Children.toArray(n).find(ke=>ke.props.value===l);if(he){const ke=Kn(he.props);ke&&Ma(ke)}},[l,n]);const zt=(G,he)=>{const Ue=g.Children.toArray(n).find(En=>En.props.value===l);let Ke;return Ue?Ke=Di(O,Ue.props):Ke=s,e.jsx(In,{id:t,children:En=>i?e.jsx(Fa,{id:En,"aria-label":c,"aria-controls":he,"aria-haspopup":"listbox",onClick:Ot,disabled:G,ref:Da,role:"combobox",text:Ke,opened:V,error:_a,onBlur:Ea,children:i}):e.jsx(Ur,{...$,"aria-label":c,"aria-controls":he,disabled:G,id:En,error:_a,isPlaceholder:!Ue,onOpenChanged:ia,open:V,ref:Da,testId:u,onBlur:Ea,children:Ke})})},$a=g.Children.toArray(n).filter(Boolean),Et=$a.filter(G=>!G.props.disabled).length,la=Rt($a),Va=Et===0||f,{someResults:Wa}=S;return g.useEffect(()=>{V&&Ma(Wa(la.length))},[la.length,Wa,V]),e.jsx(In,{id:q,children:G=>e.jsx(Gr,{id:G,role:"listbox",selectionType:"single",alignment:p,autoFocus:h,enableTypeAhead:x,dropdownStyle:[T&&Ti,Ci,b],initialFocusedIndex:a.current,items:la,onOpenChanged:ia,open:V,opener:zt(Va,G),openerElement:oa,style:A,className:w,isFilterable:T,onSearchTextChanged:T?Ft:void 0,searchText:T?_e:"",labels:S,"aria-invalid":k,"aria-required":I,disabled:Va})})};an("span");R.StyleSheet.create({srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}});g.memo(function({disabled:a,focusedMultiSelectIndex:n,id:r,labels:t,onRemove:i,removeSelectedLabel:s,selected:l,testId:u}){return e.jsx(y,{role:"group",style:ha.pillsWrapper,id:r,children:l.map((p,h)=>{const b=t[h],x=h===n,T=r+h;return e.jsx(Ze,{id:T,testId:u?`${u}-pill-${h}`:void 0,size:"small",style:[ha.pill,x&&ha.pillFocused],kind:x?"info":"neutral","aria-label":s(b),tabIndex:-1,onClick:()=>i(p),children:e.jsxs(e.Fragment,{children:[b,!a&&e.jsx(Ae,{icon:oo,size:"small"})]})},T)})})});const ha=R.StyleSheet.create({pillsWrapper:{flexDirection:"row",flexWrap:"wrap"},pill:{fontSize:Ne.body.size.small,justifyContent:"space-between",alignItems:"center",marginBlockStart:v.size_040,marginInlineEnd:v.size_040,paddingInlineEnd:v.size_040},pillFocused:be.focus[":focus-visible"]});R.StyleSheet.create({listbox:{backgroundColor:E.surface.primary,outline:"none",paddingBlock:H.listbox.layout.padding.block,paddingInline:H.listbox.layout.padding.inline},disabled:{color:E.action.secondary.disabled.foreground}});R.StyleSheet.create({wrapper:{flexDirection:"row",alignItems:"center",width:"100%",maxWidth:"100%",flexWrap:"wrap",background:E.surface.primary,borderRadius:H.opener.border.radius.rest,border:`${D.width.thin} solid ${E.core.border.neutral.subtle}`,paddingInline:H.opener.layout.padding.inline,overflow:"hidden"},focused:be.focus[":focus-visible"],disabled:{background:E.input.disabled.background,border:`${D.width.thin} solid ${E.input.disabled.border}`,color:E.input.disabled.foreground},error:{background:E.input.error.background,border:`${H.opener.border.width.error} solid ${E.input.error.border}`,color:E.input.error.foreground},combobox:{appearance:"none",background:"none",border:"none",outline:"none",padding:0,minWidth:v.size_040,width:"auto",display:"inline-grid",gridArea:"1 / 2",":focus-visible":{outline:"none",border:"none"}},listbox:{backgroundColor:E.surface.primary,borderRadius:H.listbox.border.radius,border:`solid ${D.width.thin} ${E.core.border.neutral.subtle}`,boxShadow:H.listbox.shadow.default,maxHeight:"var(--popper-max-height)",overflowY:"auto"},hidden:{pointerEvents:"none",visibility:"hidden"},button:{position:"absolute",right:v.size_040,top:v.size_040,margin:0},buttonOpen:{transform:"rotate(180deg)"},clearButton:{right:v.size_400},iconWrapper:{padding:v.size_040,minWidth:"auto"}});const Ta="unlimited",Kr=o=>{const a=parseInt(o,10);return isNaN(a)||a===0?Ta:a},Xr=({numPoints:o=1,onChange:a})=>e.jsx(te,{selectedValue:`${o}`,onChange:n=>{a(Kr(n))},placeholder:"",style:tl.singleSelectShort,children:[...[...Array(7).keys()].map(n=>e.jsx(_,{value:`${n}`,label:`${n} point${n>1?"s":""}`},n)),e.jsx(_,{value:Ta,label:"unlimited"},"unlimited")]}),tl=R.StyleSheet.create({singleSelectShort:{height:26}});Xr.__docgenInfo={description:"",methods:[],displayName:"GraphPointsCountSelector",props:{numPoints:{required:!1,tsType:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(points: PointValue) => void",signature:{arguments:[{type:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},name:"points"}],return:{name:"void"}}},description:""}}};const Jr=o=>e.jsxs(te,{selectedValue:o.graphType,onChange:o.onChange,placeholder:"Select an answer type",style:ol.singleSelectShort,children:[e.jsx(_,{value:"none",label:"None"}),e.jsx(_,{value:"linear",label:"Linear function"}),e.jsx(_,{value:"quadratic",label:"Quadratic function"}),e.jsx(_,{value:"sinusoid",label:"Sinusoid function"}),e.jsx(_,{value:"circle",label:"Circle"}),e.jsx(_,{value:"point",label:"Point(s)"}),e.jsx(_,{value:"linear-system",label:"Linear System"}),e.jsx(_,{value:"polygon",label:"Polygon"}),e.jsx(_,{value:"segment",label:"Line Segment(s)"}),e.jsx(_,{value:"ray",label:"Ray"}),e.jsx(_,{value:"angle",label:"Angle"})]}),ol=R.StyleSheet.create({singleSelectShort:{height:26}});Jr.__docgenInfo={description:"",methods:[],displayName:"GraphTypeSelector",props:{graphType:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newGraphType: string) => void",signature:{arguments:[{type:{name:"string"},name:"newGraphType"}],return:{name:"void"}}},description:""}}};function Yr(o){return e.jsxs(e.Fragment,{children:[e.jsx(tn,{title:"Correct Answer",isOpen:!0,isCollapsible:!1}),e.jsxs(y,{id:o.id,children:[e.jsxs(y,{children:[e.jsx(ja,{style:{paddingTop:m.xxSmall_6,paddingBottom:m.xxSmall_6,color:F.offBlack64},children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."}),e.jsx(na,{style:{fontSize:12,backgroundColor:"#eee",paddingInline:m.xxSmall_6,borderColor:"#ccc",borderStyle:"solid",borderWidth:1},children:o.equationString})]}),o.children]})]})}Yr.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCorrectAnswer",props:{id:{required:!0,tsType:{name:"string"},description:""},equationString:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function Qr(o){const{ariaLabelValue:a,ariaDescriptionValue:n,onChange:r}=o,[t,i]=g.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(tn,{title:"Description",isCollapsible:!0,isOpen:t,onToggle:i}),t&&e.jsxs(y,{children:[e.jsx(ja,{style:ga.caption,children:"Use these fields to describe the graph as a whole. These are used by screen readers to describe content to users who may be visually impaired."}),e.jsxs(W,{tag:"label",children:["Title",e.jsx(Qe,{value:a,onChange:s=>r({fullGraphAriaLabel:s||void 0}),style:ga.spaceAbove})]}),e.jsx(C,{size:m.small_12}),e.jsxs(W,{tag:"label",children:["Description",e.jsx(Un,{rows:8,resizeType:"vertical",value:n,onChange:s=>r({fullGraphAriaDescription:s||void 0}),style:ga.spaceAbove})]})]})]})}const ga=R.StyleSheet.create({caption:{color:F.offBlack64,paddingTop:m.xxSmall_6,paddingBottom:m.xxSmall_6},spaceAbove:{marginTop:m.xxxSmall_4}});Qr.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphDescription",props:{ariaLabelValue:{required:!0,tsType:{name:"string"},description:""},ariaDescriptionValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(graphProps: Partial<EditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<EditorProps>"},name:"graphProps"}],return:{name:"void"}}},description:""}}};const ne=o=>{const{children:a,label:n,labelSide:r="left",style:t}=o;return e.jsx("label",{className:R.css($n.label),children:e.jsxs(y,{style:[$n.row,t],children:[r==="start"||e.jsx(Ie,{style:$n.spaceEnd,children:n}),a,r==="end"&&e.jsx(Ie,{style:$n.spaceStart,children:n})]})})},$n=R.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:m.xSmall_8},spaceEnd:{marginInlineEnd:m.xSmall_8}});ne.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:Qa,InfoTip:Za,RangeInput:mn}=ae,il={url:null,width:0,height:0};function ll(o,a){return Math.floor((o[1]-o[0])/a)}const jn=class jn extends g.Component{constructor(n){super(n);d(this,"_isMounted",!1);d(this,"bgUrlRef",g.createRef());d(this,"labelXRef",g.createRef());d(this,"labelYRef",g.createRef());d(this,"change",(...n)=>ie.apply(this,n));d(this,"changeBackgroundUrl",n=>{var i;if(n.type==="keypress"&&n.key!=="Enter")return;const r=(s,l,u)=>{const p={...this.props.backgroundImage};p.url=s,p.width=l,p.height=u,this.setState({backgroundImage:p},this.changeGraph)},t=(i=this.bgUrlRef.current)==null?void 0:i.value;t?Ce.getImageSize(t,(s,l)=>{this._isMounted&&r(t,s,l)}):r(null,0,0)});d(this,"renderLabelChoices",n=>n.map(r=>e.jsx("option",{value:r[1],children:r[0]},r[1])));d(this,"validRange",n=>z.every(n,function(t){return z.isFinite(t)})?n[0]>=n[1]?"Range must have a higher number on the right":!0:"Range must be a valid number");d(this,"validateStepValue",n=>{const{step:r,range:t,name:i,minTicks:s,maxTicks:l}=n,u=ll(t,r);return u<s?i+" is too large, there must be at least "+s+" ticks.":u>l?i+" is too small, there can be at most "+l+" ticks.":!0});d(this,"validSnapStep",(n,r)=>this.validateStepValue({step:n,range:r,name:"Snap step",minTicks:5,maxTicks:60}));d(this,"validGridStep",(n,r)=>this.validateStepValue({step:n,range:r,name:"Grid step",minTicks:3,maxTicks:60}));d(this,"validStep",(n,r)=>this.validateStepValue({step:n,range:r,name:"Step",minTicks:3,maxTicks:20}));d(this,"validBackgroundImageSize",n=>n.url?n.width<=450&&n.height<=450?!0:"Image must be smaller than 450px x 450px.":!0);d(this,"validateGraphSettings",(n,r,t,i,s)=>{const l=this;let u;if(!z.every(n,function(S){return u=l.validRange(S),u===!0})||!z.every(r,function(S,P){return u=l.validStep(S,n[P]),u===!0})||!z.every(t,function(S,P){return u=l.validGridStep(S,n[P]),u===!0})||!z.every(i,function(S,P){return u=l.validSnapStep(S,n[P]),u===!0}))return u;const T=this.validBackgroundImageSize(s);return T!==!0?(u=T,u):!0});d(this,"changeLabel",(n,r)=>{const t=r.target.value,i=this.state.labelsTextbox.slice();i[n]=t,this.setState({labelsTextbox:i},this.changeGraph)});d(this,"changeRange",(n,r)=>{const t=this.state.rangeTextbox.slice();t[n]=r,this.setState({rangeTextbox:t},this.changeGraph)});d(this,"changeStepsBasedOnRange",()=>{const n=this.state.rangeTextbox.slice(),r=this.state.stepTextbox.slice(),t=this.state.gridStepTextbox.slice(),i=this.state.snapStepTextbox.slice(),s=Ce.scaleFromExtent(n[0],this.props.box[0]);if(this.validRange(n[0])===!0){r[0]=Ce.tickStepFromExtent(n[0],this.props.box[0]);const u=Ce.gridStepFromTickStep(r[0],s);u&&(t[0]=u),i[0]=t[0]/2}const l=Ce.scaleFromExtent(n[1],this.props.box[1]);if(this.validRange(n[1])===!0){r[1]=Ce.tickStepFromExtent(n[1],this.props.box[1]);const u=Ce.gridStepFromTickStep(r[1],l);u&&(t[1]=u),i[1]=t[1]/2}this.setState({stepTextbox:r,gridStepTextbox:t,snapStepTextbox:i,rangeTextbox:n},this.changeGraph)});d(this,"changeStep",n=>{this.setState({stepTextbox:n},this.changeGraph)});d(this,"changeSnapStep",n=>{this.setState({snapStepTextbox:n},this.changeGraph)});d(this,"changeGridStep",n=>{this.setState({gridStepTextbox:n,snapStepTextbox:z.map(n,function(r){return r/2})},this.changeGraph)});d(this,"changeGraph",()=>{const n=this.state.labelsTextbox,r=this.state.labelLocation,t=z.map(this.state.rangeTextbox,function(h){return z.map(h,Number)}),i=z.map(this.state.stepTextbox,Number),s=this.state.gridStepTextbox,l=this.state.snapStepTextbox,u=this.state.backgroundImage,p=this.validateGraphSettings(t,i,s,l,u);p===!0?this.change({valid:!0,labels:n,labelLocation:r,range:t,step:i,gridStep:s,snapStep:l,backgroundImage:u}):this.change({valid:p})});this.state={isExpanded:!0,...jn.stateFromProps(n)}}static stateFromProps(n){return{labelsTextbox:n.labels,labelLocation:n.labelLocation,gridStepTextbox:n.gridStep,snapStepTextbox:n.snapStep,stepTextbox:n.step,rangeTextbox:n.range,backgroundImage:{...n.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=z.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(n){(!z.isEqual(this.props.labels,n.labels)||!z.isEqual(this.props.labelLocation,n.labelLocation)||!z.isEqual(this.props.gridStep,n.gridStep)||!z.isEqual(this.props.snapStep,n.snapStep)||!z.isEqual(this.props.step,n.step)||!z.isEqual(this.props.range,n.range)||!z.isEqual(this.props.backgroundImage,n.backgroundImage))&&this.setState(jn.stateFromProps(n))}componentWillUnmount(){this._isMounted=!1}render(){return e.jsxs(e.Fragment,{children:[e.jsx(tn,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&e.jsxs(y,{children:[e.jsxs("div",{className:"graph-settings",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ne,{label:"Label Location",children:e.jsx(Qa,{value:this.props.labelLocation,allowEmpty:!1,buttons:[{value:"onAxis",content:"On Axis"},{value:"alongEdge",content:"Along Graph Edge"}],onChange:this.change("labelLocation")})})}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"x Label",children:e.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:n=>this.changeLabel(0,n),value:this.state.labelsTextbox[0]||""})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ne,{label:"y Label",children:e.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:n=>this.changeLabel(1,n),value:this.state.labelsTextbox[1]||""})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"x Range",children:e.jsx(mn,{value:this.state.rangeTextbox[0],onChange:n=>this.changeRange(0,n),allowPiTruncation:!0})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ne,{label:"y Range",children:e.jsx(mn,{value:this.state.rangeTextbox[1],onChange:n=>this.changeRange(1,n),allowPiTruncation:!0})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"Tick Step",children:e.jsx(mn,{value:this.state.stepTextbox,onChange:this.changeStep,allowPiTruncation:!0})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ne,{label:"Grid Step",children:e.jsx(mn,{value:this.state.gridStepTextbox,onChange:this.changeGridStep,allowPiTruncation:!0})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"Snap Step",children:e.jsx(mn,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep,allowPiTruncation:!0})})}),e.jsxs("div",{className:"perseus-widget-right-col",children:[e.jsx(se,{size:"small",kind:"tertiary",onClick:()=>{this.changeStepsBasedOnRange()},children:"Auto-adjust steps"}),e.jsxs(Za,{children:[e.jsx("p",{children:'Use the "Auto-adjust" steps button to update the tick step, grid step, and snap step to values that are valid for the current range.'}),e.jsx("br",{}),e.jsx("p",{children:"This is useful when the range is changed, and the graph errors due to the step sizes being too large or too small."})]})]})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ne,{label:"Markings:",children:e.jsx(Qa,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"axes",content:"Axes"},{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(pe,{label:"Show tooltips",checked:this.props.showTooltips,onChange:n=>{this.change({showTooltips:n})}})})]}),e.jsxs(ne,{label:"Background image URL:",style:pn.resetSpaceTop,children:[e.jsx("input",{type:"text",className:R.css(pn.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:n=>{const r={...this.props.backgroundImage};r.url=n.target.value,this.setState({backgroundImage:r})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),e.jsx(Za,{children:e.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),e.jsxs(y,{style:pn.protractorSection,children:[e.jsx(y,{style:pn.checkboxRow,children:e.jsx(pe,{label:"Show protractor",checked:this.props.showProtractor,onChange:n=>{this.change({showProtractor:n})},style:pn.resetSpaceTop})}),this.props.showProtractor&&e.jsx(go,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"})]})]})]})}};d(jn,"defaultProps",{box:[ka.defaultBoxSizeSmall,ka.defaultBoxSizeSmall],labels:["$x$","$y$"],labelLocation:"onAxis",range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:il,markings:"graph",showProtractor:!1,showTooltips:!1});let Xn=jn;const pn=R.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${F.offBlack32}`,borderRadius:m.xxxSmall_4,padding:m.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:m.xSmall_8},protractorSection:{marginTop:m.xSmall_8,borderTop:`1px solid ${F.offBlack16}`,paddingTop:m.xSmall_8,paddingBottom:m.xSmall_8,borderBottom:`1px solid ${F.offBlack16}`}});Xn.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
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
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};const{InfoTip:sl}=ae,ul=an("ul");function dl(o){const a=[],n=document.getElementById(o);return n&&n.querySelectorAll("*").forEach(r=>{var l;const t=[],i=r.getAttribute("aria-label"),s=r.getAttribute("aria-describedby");if(i&&t.unshift({name:"label",value:i}),s){const u=s.split(/ +/);for(const p of u){const h=(l=document.getElementById(p))==null?void 0:l.textContent;h&&t.push({name:"description",value:h})}}t.length>0&&a.push({roleOrTag:r.getAttribute("role")||r.tagName.toLowerCase(),className:r.classList[r.classList.length-1]||"",attributes:t})}),a}function ml(o){const{elementArias:a,showTags:n}=o;return e.jsx("ol",{style:{listStyle:"revert",marginLeft:8},children:a.map((r,t)=>e.jsxs("li",{children:[n&&e.jsx(Ze,{size:"small",kind:"success",style:vn.smallSpaceRight,children:r.roleOrTag}),r.className,e.jsx(ul,{style:vn.indentListLeft,children:r.attributes.map((i,s)=>e.jsxs("li",{children:[e.jsx(Ze,{size:"small",kind:i.name==="label"?"info":"neutral",style:vn.smallSpaceRight,children:i.name}),i.value]},s))})]},t))})}function Zr({graphId:o,correct:a,fullGraphAriaLabel:n,fullGraphAriaDescription:r,lockedFigures:t}){const[i,s]=g.useState(!0),[l,u]=g.useState(!1),[p,h]=g.useState([]),b=g.useId();return g.useEffect(()=>{h(dl(o))},[a,n,r,o,t]),e.jsxs(e.Fragment,{children:[e.jsx(tn,{title:"Screen reader tree",isOpen:i,onToggle:s,isCollapsible:!0}),i&&e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:[vn.row,vn.tagSwitch],children:[e.jsx(Pr,{id:b,checked:l,onChange:u}),e.jsx(C,{size:m.xSmall_8}),e.jsx(Ie,{tag:"label",htmlFor:b,children:"Show HTML roles/tags"}),e.jsx(On,{}),e.jsx(sl,{children:'This screen reader tree shows the ARIA labels and descriptions for elements within the "correct answer" Interactive Graph widget displayed above.'})]}),e.jsx(ml,{elementArias:p,showTags:l})]})]})}const vn=R.StyleSheet.create({smallSpaceRight:{marginRight:m.xxSmall_6},indentListLeft:{listStyle:"revert",marginLeft:m.small_12},tagSwitch:{marginTop:m.xSmall_8,marginBottom:m.xSmall_8},row:{flexDirection:"row",alignItems:"center"}});Zr.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphSRTree"};const et=({numSegments:o=1,onChange:a})=>e.jsx(te,{selectedValue:`${o}`,placeholder:"",onChange:n=>{const r=+n;a(r)},style:pl.singleSelectShort,children:z.range(1,7).map(n=>e.jsx(_,{value:`${n}`,label:`${n} segment${n>1?"s":""}`},n))},"segment-select"),pl=R.StyleSheet.create({singleSelectShort:{height:26}});et.__docgenInfo={description:"",methods:[],displayName:"SegmentCountSelector",props:{numSegments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(numSegments: number) => void",signature:{arguments:[{type:{name:"number"},name:"numSegments"}],return:{name:"void"}}},description:""}}};const nt=o=>{const{id:a,onChange:n}=o,r=["point","line","vector","ellipse","polygon","function","label"];return e.jsx(y,{style:er.container,children:e.jsx(Hr,{menuText:"Add locked figure",style:er.addElementSelect,children:r.map(t=>e.jsx(Nn,{label:t,onClick:()=>n(t)},`${a}-${t}`))})})},er=R.StyleSheet.create({container:{marginTop:m.xSmall_8},addElementSelect:{backgroundColor:F.fadedBlue8,borderRadius:m.xxxSmall_4}});nt.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSelect",props:{id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: LockedFigureType) => void",signature:{arguments:[{type:{name:'union["type"]',raw:'LockedFigure["type"]'},name:"value"}],return:{name:"void"}}},description:""}}};const Rn=o=>{const{value:a,onChange:n,...r}=o,[t,i]=g.useState(!1),[s,l]=g.useState(""),u=g.useRef(null);return g.useEffect(()=>{const p=u.current,h=b=>{b.stopPropagation()};return p==null||p.addEventListener("wheel",h),()=>{p==null||p.removeEventListener("wheel",h)}},[u]),e.jsx(Qe,{...r,type:"number",value:t?s:a,onChange:p=>{l(p),n(p)},onFocus:p=>{var h;l(a),i(!0),(h=o.onFocus)==null||h.call(o,p)},onBlur:p=>{var h;i(!1),(h=o.onBlur)==null||h.call(o,p)},ref:u})};Rn.__docgenInfo={description:`This is a custom text field of type="number" for use in Perseus Editors.

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
with this stopPropogation, Firefox matches the native HTML behavior.`,methods:[],displayName:"ScrolllessNumberTextField"};const{convertDegreesToRadians:cl,convertRadiansToDegrees:hl}=Ia,at=o=>{const{angle:a,onChange:n}=o,[r,t]=g.useState(hl(a).toString());function i(s){t(s),!(isNaN(+s)||s==="")&&n(cl(s))}return e.jsxs(X,{tag:"label",style:nr.row,children:["angle (degrees)",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Rn,{value:r,onChange:i,style:nr.textField}),e.jsx(C,{size:m.xxSmall_6})]})},nr=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64}});at.__docgenInfo={description:"",methods:[],displayName:"AngleInput",props:{angle:{required:!0,tsType:{name:"number"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(angle: number) => void",signature:{arguments:[{type:{name:"number"},name:"angle"}],return:{name:"void"}}},description:""}}};const J=o=>{const{coord:a,labels:n,error:r,style:t,onChange:i}=o,[s,l]=g.useState([a[0].toString(),a[1].toString()]);g.useEffect(()=>{l([a[0].toString(),a[1].toString()])},[a]);function u(p,h){const b=[...s];if(b[h]=p,l(b),isNaN(+p)||p==="")return;const x=[...a];x[h]=+p,i(x)}return e.jsxs(y,{style:[De.row,t],children:[e.jsxs(X,{tag:"label",style:De.row,children:[n?n[0]:"x coord",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Rn,{value:s[0],onChange:p=>u(p,0),style:[De.textField,r?De.errorField:void 0]})]}),e.jsx(C,{size:m.medium_16}),e.jsxs(X,{tag:"label",style:De.row,children:[n?n[1]:"y coord",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Rn,{value:s[1],onChange:p=>u(p,1),style:[De.textField,r?De.errorField:void 0]})]})]})},De=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64},errorField:{borderColor:F.red,backgroundColor:F.fadedRed8}});J.__docgenInfo={description:"",methods:[],displayName:"CoordinatePairInput",props:{coord:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},labels:{required:!1,tsType:{name:"tuple",raw:"[string, string]",elements:[{name:"string"},{name:"string"}]},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newCoord: Coord) => void",signature:{arguments:[{type:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},name:"newCoord"}],return:{name:"void"}}},description:""}}};const Oa=o=>{const{color:a,filled:n=!0,decorative:r=!1}=o;return e.jsx(y,{"aria-label":r?void 0:`${a}, ${n?"filled":"open"}`,style:[gl.colorSwatch,{border:`4px solid ${Pe[a]}`,backgroundColor:n?Pe[a]:F.white}]})},gl=R.StyleSheet.create({colorSwatch:{outline:`2px solid ${F.offWhite}`,borderRadius:"50%",width:m.large_24,height:m.large_24}});Oa.__docgenInfo={description:"",methods:[],displayName:"ColorSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!1,tsType:{name:"boolean"},description:""},decorative:{required:!1,tsType:{name:"boolean"},description:""}}};const yl=Object.keys(Pe),Oe=o=>{const{selectedValue:a,style:n,onChange:r}=o;return e.jsx(y,{style:[ar.row,n],children:e.jsxs(X,{tag:"label",style:ar.row,children:["color",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:a,onChange:r,placeholder:"",children:yl.map(t=>e.jsx(_,{value:t,label:t,leftAccessory:e.jsx(Oa,{color:t,decorative:!0})},t))})]})})},ar=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:"auto"}});Oe.__docgenInfo={description:"",methods:[],displayName:"ColorSelect",props:{selectedValue:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newColor: LockedFigureColor) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},name:"newColor"}],return:{name:"void"}}},description:""}}};const rt=o=>{const{color:a,fillStyle:n,strokeStyle:r}=o;return e.jsx(y,{"aria-label":`${a}, stroke ${r}, fill ${n}`,style:[rr.container,{border:`4px ${r} ${Pe[a]}`}],children:e.jsx(y,{style:[rr.innerCircle,{backgroundColor:Pe[a],opacity:n==="white"?0:aa[n]}]})})},rr=R.StyleSheet.create({container:{outline:`2px solid ${F.offWhite}`,borderRadius:"50%",width:m.xLarge_32,height:m.large_24,backgroundColor:F.white,alignItems:"center",justifyContent:"center"},innerCircle:{width:28,height:20,borderRadius:"50%"}});rt.__docgenInfo={description:"",methods:[],displayName:"EllipseSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const zn=o=>{const{selectedValue:a,containerStyle:n,onChange:r}=o;return e.jsxs(X,{tag:"label",style:[bl.lineStrokeSelect,n],children:["stroke",e.jsx(C,{size:m.xxxSmall_4}),e.jsxs(te,{selectedValue:a,onChange:r,placeholder:"",children:[e.jsx(_,{value:"solid",label:"solid"}),e.jsx(_,{value:"dashed",label:"dashed"})]})]})},bl=R.StyleSheet.create({lineStrokeSelect:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0}});zn.__docgenInfo={description:"",methods:[],displayName:"LineStrokeSelect",props:{selectedValue:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: StyleOptions) => void",signature:{arguments:[{type:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},name:"newValue"}],return:{name:"void"}}},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const on=o=>{const{selectedValue:a,containerStyle:n,onChange:r}=o;return e.jsxs(X,{tag:"label",style:[{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0},n],children:["weight",e.jsx(C,{size:m.xxxSmall_4}),e.jsxs(te,{selectedValue:a,onChange:t=>r(t),placeholder:"",children:[e.jsx(_,{value:"thin",label:"thin"}),e.jsx(_,{value:"medium",label:"medium"}),e.jsx(_,{value:"thick",label:"thick"})]})]})};on.__docgenInfo={description:"",methods:[],displayName:"LineWeightSelect",props:{selectedValue:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: StrokeWeight) => void",signature:{arguments:[{type:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},name:"newValue"}],return:{name:"void"}}},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const wl=""+new URL("pencil-circle-gxKdCU6a.svg",import.meta.url).href,{InfoTip:fl}=ae;function He(o){const{ariaLabel:a,getPrepopulatedAriaLabel:n,onChangeProps:r}=o,i=`aria-label-${g.useId()}`,[s,l]=g.useState(!1);return e.jsxs(y,{children:[e.jsx(C,{size:m.xSmall_8}),e.jsxs(y,{style:ya.row,children:[e.jsx(X,{tag:"label",htmlFor:i,children:"Aria label"}),e.jsx(On,{}),e.jsxs(fl,{children:["Aria label is used by screen readers to describe content to users who may be visually impaired. ",e.jsx("br",{}),e.jsx("br",{}),"Populating this field will make it so that users can use a screen reader to navigate to this point and hear the description.",e.jsx("br",{}),e.jsx("br",{}),"If you leave this field blank, the point will be hidden from screen readers. Users will not be able to navigate to this point using a screen reader."]})]}),e.jsx(C,{size:m.xxSmall_6}),e.jsx(ja,{style:ya.caption,children:"The figure is hidden from screen readers if this field is left blank."}),e.jsx(C,{size:m.xxSmall_6}),e.jsx(Un,{id:i,value:s?"Loading...":a??"",onChange:u=>{r({ariaLabel:u||void 0})},placeholder:"Ex. Point at (x, y)",rows:1,resizeType:"vertical"}),e.jsx(se,{kind:"tertiary",startIcon:wl,style:ya.button,onClick:()=>{l(!0),n().then(u=>{l(!1),r({ariaLabel:u})})},children:"Auto-generate"})]})}const ya=R.StyleSheet.create({row:{flexDirection:"row",alignItems:"center"},button:{alignSelf:"start"},caption:{color:F.offBlack64}});He.__docgenInfo={description:"",methods:[],displayName:"LockedFigureAria",props:{ariaLabel:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},getPrepopulatedAriaLabel:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:`The async function that generates the prepopulated aria label
for the locked figure with math details converted to spoken words.`},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: {ariaLabel?: string | undefined}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ariaLabel?: string | undefined}",signature:{properties:[{key:"ariaLabel",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}}]}},name:"props"}],return:{name:"void"}}},description:""}}};const tt=""+new URL("caret-double-down-bold-Bd6la7IK.svg",import.meta.url).href,ot=""+new URL("caret-double-up-bold-DXRVAODE.svg",import.meta.url).href,it=""+new URL("caret-up-bold-DRBgEf-E.svg",import.meta.url).href,ze=o=>{const{figureType:a,onMove:n,onRemove:r}=o;return e.jsxs(y,{style:tr.container,children:[e.jsx(se,{startIcon:Mr,"aria-label":`Delete locked ${a}`,onClick:r,kind:"tertiary",style:tr.deleteButton,children:"Delete"}),n&&e.jsxs(e.Fragment,{children:[e.jsx(On,{}),e.jsx(le,{icon:ot,kind:"tertiary",size:"small","aria-label":`Move locked ${a} to the back`,onClick:()=>n("back")}),e.jsx(le,{icon:it,kind:"tertiary",size:"small","aria-label":`Move locked ${a} backward`,onClick:()=>n("backward")}),e.jsx(le,{icon:ea,kind:"tertiary",size:"small","aria-label":`Move locked ${a} forward`,onClick:()=>n("forward")}),e.jsx(le,{icon:tt,kind:"tertiary",size:"small","aria-label":`Move locked ${a} to the front`,onClick:()=>n("front")})]})]})},tr=R.StyleSheet.create({container:{width:"100%",flexDirection:"row",alignItems:"center",marginTop:m.xxxSmall_4},deleteButton:{marginInlineStart:-4}});ze.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettingsActions",props:{figureType:{required:!0,tsType:{name:'union["type"]',raw:'LockedFigure["type"]'},description:""},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:""},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{InfoTip:kl}=ae;function Ee(o){const{type:a,coord:n,color:r,size:t,text:i,expanded:s,onChangeProps:l,onMove:u,onRemove:p,onToggle:h,containerStyle:b}=o;return e.jsxs(we,{expanded:s,onToggle:h,header:e.jsxs(y,{style:[ve.row,ve.accordionHeaderContainer],children:[e.jsxs(W,{children:["Label (",n[0],", ",n[1],")"]}),e.jsx(C,{size:m.xSmall_8}),i!==""&&e.jsx(W,{style:[{backgroundColor:F.white,color:Pe[r]},ve.accordionHeader],children:i})]}),containerStyle:b,children:[e.jsx(J,{coord:n,onChange:x=>{l({coord:x})},style:ve.spaceUnder}),e.jsxs(y,{style:ve.row,children:[e.jsxs(X,{tag:"label",style:[ve.row,ve.spaceUnder,{flexGrow:1}],children:["text",e.jsx(C,{size:m.xSmall_8}),e.jsx(Qe,{value:i,placeholder:"ex. $x^2$ or $\\frac{1}{2}$",onChange:x=>l({text:x})})]}),e.jsxs(kl,{children:["Surround your text with $ for TeX.",e.jsx("br",{}),"Example: ","This circle has radius $\\frac{1}{2}$ units.",e.jsx("br",{}),e.jsx("br",{}),'It is important to use TeX when appropriate for accessibility. The above example would be read as "This circle has radius one-half units" by screen readers.']})]}),e.jsxs(y,{style:ve.row,children:[e.jsx(Oe,{selectedValue:r,onChange:x=>{l({color:x})},style:ve.spaceUnder}),e.jsx(C,{size:m.medium_16}),e.jsxs(X,{tag:"label",style:ve.row,children:["size",e.jsx(C,{size:m.xSmall_8}),e.jsxs(te,{selectedValue:t,onChange:x=>l({size:x}),placeholder:"",children:[e.jsx(_,{value:"small",label:"small"}),e.jsx(_,{value:"medium",label:"medium"}),e.jsx(_,{value:"large",label:"large"})]})]})]}),e.jsx(ze,{figureType:a,onMove:u,onRemove:p})]})}const ve=R.StyleSheet.create({accordionHeaderContainer:{whiteSpace:"nowrap"},accordionHeader:{padding:m.xxxSmall_4,marginInlineEnd:m.xSmall_8,borderRadius:m.xxxSmall_4,textOverflow:"ellipsis",overflow:"hidden"},row:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0},spaceUnder:{marginBottom:m.xSmall_8}});Ee.__docgenInfo={description:"",methods:[],displayName:"LockedLabelSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"label"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},text:{required:!0,tsType:{name:"string"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},size:{required:!0,tsType:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}]},description:""},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedLabelType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
is for a standalone label, not part of a larger locked figure.`},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const Me="grayH";function Le(o){switch(o){case"point":return{type:"point",coord:[0,0],color:Me,filled:!0,labels:[]};case"line":return{type:"line",kind:"line",points:[Le("point"),{...Le("point"),coord:[2,2]}],color:Me,lineStyle:"solid",showPoint1:!1,showPoint2:!1,weight:"medium",labels:[]};case"vector":return{type:"vector",points:[[0,0],[2,2]],color:Me,weight:"medium",labels:[]};case"ellipse":return{type:"ellipse",center:[0,0],radius:[1,1],angle:0,color:Me,fillStyle:"none",strokeStyle:"solid",weight:"medium",labels:[]};case"polygon":return{type:"polygon",points:[[0,2],[-1,0],[1,0]],color:Me,showVertices:!1,fillStyle:"none",strokeStyle:"solid",weight:"medium",labels:[]};case"function":return{type:"function",color:Me,strokeStyle:"solid",weight:"medium",equation:"x^2",domain:[-1/0,1/0],directionalAxis:"x",labels:[]};case"label":return{type:"label",coord:[0,0],text:"label",color:Me,size:"medium"};default:throw new rn(o)}}function ln(o,a="solid",n,r="medium"){const t=o==="grayH"?"gray":o,s=`. Appearance${r==="medium"?"":` ${r}`} ${a} ${t}`;switch(n){case"none":return`${s} border, with no fill.`;case"white":return`${s} border, with a white fill.`;case"solid":case"translucent":return`${s} border, with a ${n} ${t} fill.`;case void 0:return`${s}.`;default:throw new rn(n)}}async function oe(o){const a=await yo.SpeechRuleEngine.setup("en");let n="";const r=bo(o);for(const t of r)switch(t.type){case"math":n+=a.texToSpeech(t.content);break;case"specialCharacter":n+=t.content.length>1?t.content.slice(1):t.content;break;default:n+=t.content;break}return n}async function Re(o){if(o.length===0)return"";const a=o.map(r=>oe(r.text));return` ${(await Promise.all(a)).join(", ")}`}const{convertRadiansToDegrees:vl}=Ia,{InfoTip:xl}=ae,lt=o=>{const{center:a,radius:n,angle:r,color:t,labels:i,ariaLabel:s,fillStyle:l,strokeStyle:u,weight:p,expanded:h,onToggle:b,onChangeProps:x,onMove:T,onRemove:S}=o;async function P(){const c=await Re(i),k=await oe(`$${a[0]}$`),I=await oe(`$${a[1]}$`),f=await oe(`$${vl(r)}$`),q=n[0]===n[1];let N="";q?N+=`Circle${c} with radius ${n[0]}`:N+=`Ellipse${c} with x radius ${n[0]} and y radius ${n[1]}`,N+=`, centered at ${k} comma ${I}`,!q&&r!==0&&(N+=`, rotated by ${f} degrees`);const K=ln(t,u,l,p);return N+=K,N}function M(c){const k=c[0]-a[0],I=c[1]-a[1],f={center:c};f.labels=i.map(q=>({...q,coord:[q.coord[0]+k,q.coord[1]+I]})),x(f)}function j(c){const k={color:c};k.labels=i.map(I=>({...I,color:c})),x(k)}function A(c,k){const I=[...i];I[k]={...i[k],...c},x({labels:I})}function w(c){const k=i.filter((I,f)=>f!==c);x({labels:k})}return e.jsxs(we,{expanded:h,onToggle:b,header:e.jsxs(y,{style:me.row,children:[e.jsx(W,{children:`Ellipse (${a[0]}, ${a[1]}), radius ${n[0]}, ${n[1]}`}),e.jsx(C,{size:m.xSmall_8}),e.jsx(rt,{color:o.color,fillStyle:l,strokeStyle:u})]}),children:[e.jsxs(y,{style:me.row,children:[e.jsx(J,{coord:a,style:me.spaceUnder,onChange:M}),e.jsx(y,{style:me.spaceUnder,children:e.jsx(xl,{children:"The coordinates for the center of the ellipse."})})]}),e.jsx(J,{coord:n,labels:["x radius","y radius"],style:me.spaceUnder,onChange:c=>x({radius:c})}),e.jsx(at,{angle:r,onChange:c=>x({angle:c})}),e.jsx(C,{size:m.xSmall_8}),e.jsxs(y,{style:[me.row,me.spaceUnder],children:[e.jsx(Oe,{selectedValue:t,onChange:j}),e.jsx(C,{size:m.medium_16}),e.jsxs(X,{tag:"label",style:[me.row,me.truncatedWidth],children:["fill",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:l,onChange:c=>x({fillStyle:c}),placeholder:"",children:Object.keys(aa).map(c=>e.jsx(_,{value:c,label:c},c))})]})]}),e.jsx(zn,{selectedValue:u,onChange:c=>x({strokeStyle:c}),containerStyle:{marginBottom:v.size_080}}),e.jsx(on,{selectedValue:p,onChange:c=>x({weight:c})}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:me.horizontalRule}),e.jsx(He,{ariaLabel:s,getPrepopulatedAriaLabel:P,onChangeProps:c=>{x(c)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:me.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(X,{children:"Visible labels"}),i.map((c,k)=>g.createElement(Ee,{...c,key:k,expanded:!0,onChangeProps:I=>{A(I,k)},onRemove:()=>{w(k)},containerStyle:me.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:Be,onClick:()=>{const c={...Le("label"),coord:[a[0],a[1]-i.length],color:t};x({labels:[...i,c]})},style:me.addButton,children:"Add visible label"}),e.jsx(ze,{figureType:o.type,onMove:T,onRemove:S})]})},me=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},truncatedWidth:{minWidth:0},addButton:{alignSelf:"start"},labelContainer:{backgroundColor:F.white},horizontalRule:{height:1,backgroundColor:F.offBlack16}});lt.__docgenInfo={description:"",methods:[],displayName:"LockedEllipseSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedEllipseType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."}}};const ql=""+new URL("copy-ChcUWZci.svg",import.meta.url).href,Cl=""+new URL("note-pencil-CqqXva0w.svg",import.meta.url).href,ta=o=>{const{color:a,lineStyle:n}=o;return e.jsx(y,{style:or.container,children:e.jsx(y,{"aria-label":`${a}, ${n}`,style:[or.lineSwatch,{border:`5px ${n} ${Pe[a]}`}]})})},or=R.StyleSheet.create({container:{backgroundColor:F.white,justifyContent:"center",padding:m.xSmall_8,borderRadius:m.xxxSmall_4},lineSwatch:{width:40}});ta.__docgenInfo={description:"",methods:[],displayName:"LineSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const ir={linear:["x + 5","1/2x - 2"],polynomial:["1/2x^2 + 3x - 4","(1/3)x^3 - 2x^2 + 3x - 4"],trigonometric:["sin(x) * 3","arctan(2x) + 4"]},st=o=>{const{color:a,strokeStyle:n,equation:r,directionalAxis:t,domain:i,weight:s,ariaLabel:l,onChangeProps:u,onMove:p,onRemove:h}=o,b=o.labels,x=t==="x"?"y=":"x=",T=`Function (${x}${r})`,S=O=>[Number.isFinite(O[0])?O[0].toString():"",Number.isFinite(O[1])?O[1].toString():""],[P,M]=g.useState(S(i)),[j,A]=g.useState("");g.useEffect(()=>{M(S(i))},[i]);async function w(){let $=`Function${await Re(b)} with equation ${x}${r}`;(Number.isFinite(i[0])||Number.isFinite(i[1]))&&($+=`, domain from ${i[0]} to ${i[1]}`);const V=ln(a,n,void 0,s);return $+=V,$}function c(O,$){const V={};V[O]=$,u(V)}function k(O,$){const V=[...P];V[O]=$,M(V);const ce=[...i];let _e=parseFloat($);$===""&&O===0?_e=-1/0:$===""&&O===1&&(_e=1/0),ce[O]=_e,u({domain:ce})}const I=Object.keys(ir),f=j!=="",q=f?ir[j]:["Select category to see example equations"];function N(O){const $={color:O};$.labels=b.map(V=>({...V,color:O})),u($)}function K(O,$){const V=[...b];V[$]={...b[$],...O},u({labels:V})}function ee(O){const $=b.filter((V,ce)=>ce!==O);u({labels:$})}return e.jsxs(we,{expanded:o.expanded,onToggle:o.onToggle,header:e.jsxs(y,{style:U.row,children:[e.jsx(W,{style:U.accordionHeader,children:T}),e.jsx(C,{size:m.xSmall_8}),e.jsx(ta,{color:a,lineStyle:n})]}),children:[e.jsxs(y,{style:[U.row,{marginBottom:v.size_080}],children:[e.jsx(Oe,{selectedValue:a,onChange:N}),e.jsx(C,{size:m.small_12}),e.jsx(zn,{selectedValue:n,onChange:O=>{c("strokeStyle",O)}})]}),e.jsx(on,{selectedValue:s,onChange:O=>u({weight:O})}),e.jsxs(y,{style:[U.row,U.rowSpace],children:[e.jsxs(te,{selectedValue:t,onChange:O=>{c("directionalAxis",O)},"aria-label":"equation prefix",style:[U.dropdownLabel,U.axisMenu],placeholder:"",children:[e.jsx(_,{value:"x",label:"y ="}),e.jsx(_,{value:"y",label:"x ="})]}),e.jsx(C,{size:m.xSmall_8}),e.jsx(Qe,{type:"text","aria-label":"equation",value:r,onChange:O=>{c("equation",O)},style:[U.textField]})]}),e.jsxs(y,{style:[U.row,U.rowSpace],children:[e.jsxs(X,{tag:"label",style:[U.dropdownLabel,U.domainMin],children:["domain min",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Qe,{type:"number",style:U.domainMinField,value:P[0],onChange:O=>{k(0,O)}})]}),e.jsx(C,{size:m.medium_16}),e.jsxs(X,{tag:"label","aria-label":"domain max",style:[U.dropdownLabel,U.domainMax],children:["max",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Qe,{type:"number",style:U.domainMaxField,value:P[1],onChange:O=>{k(1,O)}})]})]}),e.jsxs(we,{header:e.jsx(W,{children:"Example Functions"}),expanded:!1,containerStyle:U.exampleWorkspace,panelStyle:U.exampleAccordionPanel,children:[e.jsxs(X,{tag:"label",style:U.dropdownLabel,children:["Choose a category",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:j,onChange:A,placeholder:"examples",children:I.map(O=>e.jsx(_,{value:O,label:O},O))})]}),f&&e.jsx("ul",{className:R.css(U.exampleContainer),children:q.map((O,$)=>e.jsx(Tl,{category:j,example:O,index:$,pasteEquationFn:c},$))})]}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:U.horizontalRule}),e.jsx(He,{ariaLabel:l,getPrepopulatedAriaLabel:w,onChangeProps:O=>{u(O)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:U.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(X,{children:"Visible labels"}),b.map((O,$)=>e.jsx(Ee,{...O,expanded:!0,onChangeProps:V=>{K(V,$)},onRemove:()=>{ee($)},containerStyle:U.labelContainer},$)),e.jsx(se,{kind:"tertiary",startIcon:Be,onClick:()=>{const O={...Le("label"),coord:[0,-b.length],color:a};u({labels:[...b,O]})},style:U.addButton,children:"Add visible label"}),e.jsx(ze,{figureType:o.type,onMove:p,onRemove:h})]})},Tl=o=>{const{category:a,example:n,index:r,pasteEquationFn:t}=o,i=g.useId();return e.jsxs("li",{className:R.css(U.exampleRow),children:[e.jsx(le,{icon:Cl,kind:"tertiary","aria-label":"paste example","aria-describedby":i,onClick:()=>t("equation",n),size:"medium",style:U.copyPasteButton}),e.jsx(le,{icon:ql,kind:"tertiary","aria-label":"copy example","aria-describedby":i,onClick:()=>navigator.clipboard.writeText(n),size:"medium",style:U.copyPasteButton}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:U.exampleContent,id:i,children:n})]},`${a}-${r}`)},U=R.StyleSheet.create({accordionHeader:{textOverflow:"ellipsis",maxWidth:"calc(100% - 64px)",overflow:"hidden",whiteSpace:"nowrap"},axisMenu:{minWidth:"auto"},copyPasteButton:{flexShrink:"0",margin:"0 2px"},domainMin:{justifyContent:"space-between",width:"calc(((100% - 141px) / 2) + 88.7px)",textWrap:"nowrap"},domainMinField:{width:"calc(100% - 88.7px)"},domainMax:{width:"calc(((100% - 141px) / 2) + 36.2px)"},domainMaxField:{width:"calc(100% - 36.2px)"},dropdownLabel:{alignItems:"center",display:"flex"},exampleAccordionPanel:{alignItems:"start",paddingBottom:"12px",flexDirection:"row",flexWrap:"wrap"},exampleContainer:{background:"white",border:`1px solid ${F.fadedOffBlack16}`,borderRadius:"4px",flexGrow:"1",listStyleType:"none",maxHeight:"88px",margin:"8px 0 0 0",overflowY:"scroll",padding:"4px 12px 4px 4px"},exampleContent:{fontFamily:'"Lato", sans-serif',flexGrow:"1",color:F.offBlack},exampleRow:{alignItems:"center",display:"flex",flexDirection:"row",minHeight:"44px"},exampleWorkspace:{background:F.white50},rowSpace:{marginTop:m.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{flexGrow:"1"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16},labelContainer:{backgroundColor:F.white}});st.__docgenInfo={description:"",methods:[],displayName:"LockedFunctionSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"function"'},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},equation:{required:!0,tsType:{name:"string"},description:"This is the user-defined equation (as it was typed)"},directionalAxis:{required:!0,tsType:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}]},description:"The independent variable of this function"},domain:{required:!0,tsType:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedFunctionType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const Ge=o=>{const{checked:a,label:n,style:r,onChange:t}=o,i=g.useId();return e.jsxs(y,{style:[Sl.row,r],children:[e.jsx(Pr,{id:i,checked:a,onChange:t}),e.jsx(C,{size:m.xSmall_8}),e.jsx(X,{tag:"label",htmlFor:i,children:n})]})},Sl=R.StyleSheet.create({row:{flexDirection:"row",alignItems:"center"}});Ge.__docgenInfo={description:"",methods:[],displayName:"LabeledSwitch",props:{label:{required:!0,tsType:{name:"string"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"newValue"}],return:{name:"void"}}},description:""}}};const Jn=o=>{const{headerLabel:a,coord:n,color:r,filled:t=!0,labels:i,ariaLabel:s,onChangeProps:l,onMove:u,onRemove:p,showPoint:h,error:b,expanded:x,onTogglePoint:T,onToggle:S}=o,P=!u&&!p;async function M(){const k=await Re(i),I=await oe(`$${n[0]}$`),f=await oe(`$${n[1]}$`);let q=`Point${k} at ${I} comma ${f}`;const N=ln(r);return q+=N,q}function j(k){const I={color:k};I.labels=i.map(f=>({...f,color:k})),l(I)}function A(k){const I=k[0]-n[0],f=k[1]-n[1],q={coord:k};q.labels=i.map(N=>({...N,coord:[N.coord[0]+I,N.coord[1]+f]})),l(q)}function w(k,I){const f=[...i];f[I]={...i[I],...k},l({labels:f})}function c(k){const I=i.filter((f,q)=>q!==k);l({labels:I})}return e.jsxs(we,{expanded:x,onToggle:S,containerStyle:P?xe.definingContainer:void 0,panelStyle:P?xe.definingPanel:void 0,header:e.jsxs(y,{style:xe.row,children:[e.jsx(W,{children:`${a||"Point"} (${n[0]}, ${n[1]})`}),e.jsx(C,{size:m.xSmall_8}),e.jsx(Oa,{color:r,filled:t})]}),children:[e.jsx(J,{coord:n,style:xe.spaceUnder,onChange:A,error:!!b}),T&&e.jsx(Ge,{label:"show point on graph",checked:!!h,style:h&&xe.spaceUnder,onChange:T}),(!P||h)&&e.jsxs(e.Fragment,{children:[e.jsx(Oe,{selectedValue:r,onChange:j,style:xe.spaceUnder}),e.jsx(Ge,{label:"open point",checked:!t,onChange:k=>{l({filled:!k})}})]}),!P&&e.jsxs(e.Fragment,{children:[e.jsx(C,{size:m.small_12}),e.jsx(y,{style:xe.horizontalRule}),e.jsx(He,{ariaLabel:s,getPrepopulatedAriaLabel:M,onChangeProps:k=>{l(k)}})]}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:xe.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(X,{children:"Visible labels"}),i.map((k,I)=>g.createElement(Ee,{...k,key:I,containerStyle:!P&&xe.lockedPointLabelContainer,expanded:!0,onChangeProps:f=>{w(f,I)},onRemove:()=>{c(I)}})),e.jsx(se,{kind:"tertiary",startIcon:Be,onClick:()=>{const k={...Le("label"),coord:[n[0]+.5,n[1]-i.length],color:r};l({labels:[...i,k]})},style:xe.addButton,children:"Add visible label"}),p&&e.jsx(ze,{figureType:o.type,onMove:u,onRemove:p})]})},xe=R.StyleSheet.create({definingContainer:{marginTop:m.xSmall_8,marginBottom:0,marginLeft:-4,marginRight:-4,backgroundColor:F.white},definingPanel:{paddingBottom:m.xxSmall_6},lockedPointLabelContainer:{backgroundColor:F.white},row:{flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16}});Jn.__docgenInfo={description:"",methods:[],displayName:"LockedPointSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"point"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when the point is moved."},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the point is removed."}}};const ba="The line cannot have length 0.",ut=o=>{const{kind:a,points:n,color:r,lineStyle:t="solid",showPoint1:i,showPoint2:s,weight:l,labels:u,ariaLabel:p,onChangeProps:h,onMove:b,onRemove:x}=o,[T,S]=n,P=a.charAt(0).toUpperCase()+a.slice(1),M=`${P} (${T.coord[0]},
        ${T.coord[1]}), (${S.coord[0]}, ${S.coord[1]})`,j=Na(T.coord,S.coord);async function A(){const f=await Re(u),q=await Re(T.labels),N=await Re(S.labels),K=await oe(`$${T.coord[0]}$`),ee=await oe(`$${T.coord[1]}$`),O=await oe(`$${S.coord[0]}$`),$=await oe(`$${S.coord[1]}$`);let V;switch(a){case"line":V=`${P}${f} through point${q} at ${K} comma ${ee} and point${N} at ${O} comma ${$}`;break;case"ray":V=`${P}${f} from point${q} at ${K} comma ${ee} through point${N} at ${O} comma ${$}`;break;case"segment":V=`${P}${f} from point${q} at ${K} comma ${ee} to point${N} at ${O} comma ${$}`;break;default:throw new rn(a,"Unknown line kind")}const ce=ln(r,t,void 0,l);return V+=ce,V}function w(f,q){const N=[...n];N[q]={...n[q],...f};const K=ye.midpoint(n[0].coord,n[1].coord),ee=ye.midpoint(N[0].coord,N[1].coord),O=[ee[0]-K[0],ee[1]-K[1]],$=u.map((V,ce)=>({...V,coord:[V.coord[0]+O[0],V.coord[1]+O[1]]}));h({points:N,labels:$})}function c(f){const q=u.map(N=>({...N,color:f}));h({color:f,points:[{...T,color:f,labels:T.labels.map(N=>({...N,color:f}))},{...S,color:f,labels:S.labels.map(N=>({...N,color:f}))}],labels:q})}function k(f,q){const N=[...u];N[q]={...u[q],...f},h({labels:N})}function I(f){const q=u.filter((N,K)=>K!==f);h({labels:q})}return e.jsxs(we,{expanded:o.expanded,onToggle:o.onToggle,header:e.jsxs(y,{style:qe.row,children:[e.jsx(W,{children:M}),e.jsx(C,{size:m.xSmall_8}),e.jsx(ta,{color:r,lineStyle:t})]}),children:[e.jsxs(X,{tag:"label",style:[qe.row,qe.spaceUnder],children:["kind",e.jsx(C,{size:m.xxxSmall_4}),e.jsxs(te,{selectedValue:a,onChange:f=>h({kind:f}),placeholder:"",children:[e.jsx(_,{value:"line",label:"line"}),e.jsx(_,{value:"ray",label:"ray"}),e.jsx(_,{value:"segment",label:"segment"})]})]}),e.jsxs(y,{style:[qe.row,qe.spaceUnder],children:[e.jsx(Oe,{selectedValue:r,onChange:c}),e.jsx(C,{size:m.small_12}),e.jsx(zn,{selectedValue:t,onChange:f=>h({lineStyle:f})})]}),e.jsx(on,{selectedValue:l,onChange:f=>h({weight:f})}),j&&e.jsx(X,{style:qe.errorText,children:ba}),e.jsx(Jn,{headerLabel:"Point 1",expanded:!0,showPoint:i,error:j?ba:null,...T,onTogglePoint:f=>h({showPoint1:f}),onChangeProps:f=>w(f,0)}),e.jsx(Jn,{headerLabel:"Point 2",expanded:!0,showPoint:s,error:j?ba:null,...S,onTogglePoint:f=>h({showPoint2:f}),onChangeProps:f=>w(f,1)}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:qe.horizontalRule}),e.jsx(He,{ariaLabel:p,getPrepopulatedAriaLabel:A,onChangeProps:f=>{h(f)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:qe.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(X,{children:"Visible labels"}),u.map((f,q)=>g.createElement(Ee,{...f,key:q,expanded:!0,onChangeProps:N=>{k(N,q)},onRemove:()=>{I(q)},containerStyle:qe.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:Be,onClick:()=>{const f=[0,-1],q=ye.add(ye.scale(f,u.length),ye.midpoint(n[0].coord,n[1].coord)),N={...Le("label"),coord:q,color:r};h({labels:[...u,N]})},style:qe.addButton,children:"Add visible label"}),e.jsx(ze,{figureType:o.type,onMove:b,onRemove:x})]})},qe=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},errorText:{color:F.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16},labelContainer:{backgroundColor:F.white}});ut.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const Al=""+new URL("arrow-fat-down-Bfm634Ub.svg",import.meta.url).href,Pl=""+new URL("arrow-fat-left-vG4eNh8n.svg",import.meta.url).href,Ll=""+new URL("arrow-fat-right-LGRtshLE.svg",import.meta.url).href,jl=""+new URL("arrow-fat-up-BqHZ5poh.svg",import.meta.url).href,Il=""+new URL("minus-circle-D0QptBrx.svg",import.meta.url).href,dt=o=>{const{color:a,fillStyle:n,strokeStyle:r}=o;return e.jsx(y,{"aria-label":`${a}, stroke ${r}, fill ${n}`,style:[lr.container,{border:`4px ${r} ${Pe[a]}`}],children:e.jsx(y,{style:[lr.innerSquare,{backgroundColor:Pe[a],opacity:n==="white"?0:aa[n]}]})})},lr=R.StyleSheet.create({container:{outline:`2px solid ${F.offWhite}`,width:m.large_24,height:m.large_24,backgroundColor:F.white,alignItems:"center",justifyContent:"center"},innerSquare:{width:20,height:20}});dt.__docgenInfo={description:"",methods:[],displayName:"PolygonSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const mt=o=>{const{points:a,color:n,showVertices:r,fillStyle:t,strokeStyle:i,weight:s,labels:l,ariaLabel:u,expanded:p,onToggle:h,onChangeProps:b,onMove:x,onRemove:T}=o;async function S(){let c=`Polygon${await Re(l)} with ${a.length} sides, vertices at `;const k=await Promise.all(a.map(async([f,q])=>{const N=await oe(`$${f}$`),K=await oe(`$${q}$`);return`${N} comma ${K}`}));c+=k.join(", ");const I=ln(n,i,t,s);return c+=I,c}function P(w){const c={color:w};c.labels=l.map(k=>({...k,color:w})),b(c)}function M(w){switch(w){case"up":b({points:a.map(([c,k])=>[c,k+1]),labels:l.map(c=>({...c,coord:[c.coord[0],c.coord[1]+1]}))});break;case"down":b({points:a.map(([c,k])=>[c,k-1]),labels:l.map(c=>({...c,coord:[c.coord[0],c.coord[1]-1]}))});break;case"left":b({points:a.map(([c,k])=>[c-1,k]),labels:l.map(c=>({...c,coord:[c.coord[0]-1,c.coord[1]]}))});break;case"right":b({points:a.map(([c,k])=>[c+1,k]),labels:l.map(c=>({...c,coord:[c.coord[0]+1,c.coord[1]]}))});break}}function j(w,c){const k=[...l];k[c]={...l[c],...w},b({labels:k})}function A(w){const c=l.filter((k,I)=>I!==w);b({labels:c})}return e.jsxs(we,{expanded:p,onToggle:h,header:e.jsxs(y,{style:Y.row,children:[e.jsx(W,{children:`Polygon, ${a.length} sides`}),e.jsx(C,{size:m.xSmall_8}),e.jsx(dt,{color:n,fillStyle:t,strokeStyle:i})]}),children:[e.jsxs(y,{style:[Y.row,Y.spaceUnder],children:[e.jsx(Oe,{selectedValue:n,onChange:P}),e.jsx(C,{size:m.medium_16}),e.jsxs(X,{tag:"label",style:[Y.row,Y.truncatedWidth],children:["fill",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:t,onChange:w=>b({fillStyle:w}),placeholder:"",children:Object.keys(aa).map(w=>e.jsx(_,{value:w,label:w},w))})]})]}),e.jsx(zn,{selectedValue:i,onChange:w=>b({strokeStyle:w}),containerStyle:Y.spaceUnder}),e.jsx(on,{selectedValue:s,onChange:w=>b({weight:w}),containerStyle:Y.spaceUnder}),e.jsx(Ge,{label:"show vertices",checked:r,onChange:w=>b({showVertices:w}),style:Y.spaceUnder}),e.jsxs(we,{header:e.jsx(W,{children:"Points"}),expanded:!0,containerStyle:Y.pointAccordionContainer,panelStyle:Y.pointAccordionPanel,children:[a.map((w,c)=>{const k=String.fromCharCode(65+c);return e.jsxs(y,{style:[Y.row,Y.spaceUnder],children:[e.jsx(W,{children:`${k}:`}),e.jsx(C,{size:m.medium_16}),e.jsx(J,{coord:w,labels:["x","y"],onChange:I=>{const f=[...a];f[c]=I,o.onChangeProps({points:f})}}),a.length>3&&e.jsx(le,{"aria-label":`Delete polygon point ${k}`,icon:Il,kind:"tertiary",actionType:"destructive",onClick:()=>{const I=[...a];I.splice(c,1),o.onChangeProps({points:I})},style:Y.icon})]},`locked-polygon-point-index-${c}`)}),e.jsxs(y,{style:[Y.row,Y.polygonActionsContainer],children:[e.jsx(se,{kind:"tertiary",startIcon:Be,onClick:()=>{o.onChangeProps({points:[...a,[0,0]]})},children:"Add point"}),e.jsx(On,{}),e.jsxs(y,{style:Y.movementButtonsContainer,children:[e.jsx(le,{"aria-label":"Move polygon up",size:"small",icon:jl,kind:"tertiary",onClick:()=>M("up")}),e.jsxs(y,{style:Y.row,children:[e.jsx(le,{"aria-label":"Move polygon left",size:"small",icon:Pl,kind:"tertiary",onClick:()=>M("left")}),e.jsx(le,{"aria-label":"Move polygon down",size:"small",icon:Al,kind:"tertiary",onClick:()=>M("down")}),e.jsx(le,{"aria-label":"Move polygon right",size:"small",icon:Ll,kind:"tertiary",onClick:()=>M("right")})]})]})]})]}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:Y.horizontalRule}),e.jsx(He,{ariaLabel:u,getPrepopulatedAriaLabel:S,onChangeProps:w=>{b(w)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:Y.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(X,{children:"Visible labels"}),l.map((w,c)=>g.createElement(Ee,{...w,key:c,expanded:!0,onChangeProps:k=>{j(k,c)},onRemove:()=>{A(c)},containerStyle:Y.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:Be,onClick:()=>{const w={...Le("label"),coord:[a[0][0],a[0][1]-l.length],color:n};b({labels:[...l,w]})},style:Y.addButton,children:"Add visible label"}),e.jsx(ze,{figureType:o.type,onMove:x,onRemove:T})]})},Y=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},pointAccordionContainer:{backgroundColor:F.white},pointAccordionPanel:{alignItems:"start"},icon:{marginInlineStart:m.xxxSmall_4},polygonActionsContainer:{width:"100%"},movementButtonsContainer:{display:"flex",flexDirection:"column",alignItems:"center",minWidth:"fit-content"},spaceUnder:{marginBottom:m.xSmall_8},truncatedWidth:{minWidth:0},addButton:{alignSelf:"start"},labelContainer:{backgroundColor:F.white},horizontalRule:{height:1,backgroundColor:F.offBlack16}});mt.__docgenInfo={description:"",methods:[],displayName:"LockedPolygonSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedPolygonType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."}}};const Nl="The vector cannot have length 0.",pt=o=>{const{points:a,color:n,weight:r,labels:t,ariaLabel:i,onChangeProps:s,onMove:l,onRemove:u}=o,[p,h]=a,b=`Vector (${p[0]}, ${p[1]}), (${h[0]}, ${h[1]})`,x=Na(p,h);async function T(){const A=await Re(t),w=await oe(`$${p[0]}$`),c=await oe(`$${p[1]}$`),k=await oe(`$${h[0]}$`),I=await oe(`$${h[1]}$`);let f=`Vector${A} from ${w} comma ${c} to ${k} comma ${I}`;const q=ln(n,"solid",void 0,r);return f+=q,f}function S(A,w){if(typeof A<"u"){const c=[...a];c[w]=[...A];const k=ye.midpoint(p,h),I=ye.midpoint(c[0],c[1]),f=ye.sub(I,k),q=t.map(N=>({...N,coord:ye.add(N.coord,f)}));s({points:c,labels:q})}}function P(A){const w={color:A};w.labels=t.map(c=>({...c,color:A})),s(w)}function M(A,w){const c=[...t];c[w]={...t[w],...A},s({labels:c})}function j(A){const w=t.filter((c,k)=>k!==A);s({labels:w})}return e.jsxs(we,{expanded:o.expanded,onToggle:o.onToggle,header:e.jsxs(y,{style:ge.row,children:[e.jsx(W,{children:b}),e.jsx(C,{size:m.xSmall_8}),e.jsx(ta,{color:n,lineStyle:"solid"})]}),children:[e.jsx(Oe,{selectedValue:n,onChange:P,style:{marginBottom:v.size_080}}),e.jsx(on,{selectedValue:r,onChange:A=>s({weight:A})}),x&&e.jsx(X,{style:ge.errorText,children:Nl}),e.jsx(we,{expanded:!0,containerStyle:ge.container,panelStyle:ge.accordionPanel,header:e.jsx(y,{style:ge.row,children:e.jsx(W,{children:`Tail (${p[0]}, ${p[1]})`})}),children:e.jsx(J,{coord:p,error:x,onChange:A=>{S(A,0)}})}),e.jsx(we,{expanded:!0,containerStyle:ge.container,panelStyle:ge.accordionPanel,header:e.jsx(y,{style:ge.row,children:e.jsx(W,{children:`Tip (${h[0]}, ${h[1]})`})}),children:e.jsx(J,{coord:h,error:x,onChange:A=>{S(A,1)}})}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:ge.horizontalRule}),e.jsx(He,{ariaLabel:i,getPrepopulatedAriaLabel:T,onChangeProps:A=>{s(A)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:ge.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(X,{children:"Visible labels"}),t.map((A,w)=>g.createElement(Ee,{...A,key:w,expanded:!0,onChangeProps:c=>{M(c,w)},onRemove:()=>{j(w)},containerStyle:ge.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:Be,onClick:()=>{const A=[0,-1],w=ye.add(ye.scale(A,t.length),ye.midpoint(p,h)),c={...Le("label"),coord:w,color:n};s({labels:[...t,c]})},style:ge.addButton,children:"Add visible label"}),e.jsx(ze,{figureType:o.type,onMove:l,onRemove:u})]})},ge=R.StyleSheet.create({accordionPanel:{paddingBottom:m.medium_16},container:{marginTop:m.xSmall_8,marginBottom:0,marginLeft:-4,marginRight:-4,backgroundColor:F.white},errorText:{color:F.red,marginTop:m.xSmall_8},row:{flexDirection:"row",alignItems:"center"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16},labelContainer:{backgroundColor:F.white}});pt.__docgenInfo={description:"",methods:[],displayName:"LockedVectorSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"vector"'},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const ct=o=>{switch(o.type){case"point":return e.jsx(Jn,{...o});case"line":return e.jsx(ut,{...o});case"vector":return e.jsx(pt,{...o});case"ellipse":return e.jsx(lt,{...o});case"polygon":return e.jsx(mt,{...o});case"function":return e.jsx(st,{...o});case"label":return e.jsx(Ee,{...o});default:throw new rn(o)}};ct.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."}}};const ht=o=>{const a=Array((o.figures??[]).length).fill(!1),[n,r]=g.useState(a),[t,i]=g.useState(!0),s=g.useId(),{figures:l,onChange:u}=o;function p(j){const w={lockedFigures:[...l||[],Le(j)]};u(w),r([...n,!0])}function h(j,A){if(j===0&&(A==="back"||A==="backward")||l&&j===l.length-1&&(A==="front"||A==="forward"))return;const c=[...l||[]],k=[...n],[I]=c.splice(j,1);switch(k.splice(j,1),A){case"back":c.unshift(I),k.unshift(!0);break;case"backward":c.splice(j-1,0,I),k.splice(j-1,0,!0);break;case"forward":c.splice(j+1,0,I),k.splice(j+1,0,!0);break;case"front":c.push(I),k.push(!0);break}u({lockedFigures:c}),r(k)}function b(j){if(window.confirm("Are you sure you want to delete this figure?")){const A=l||[];u({lockedFigures:[...A.slice(0,j),...A.slice(j+1)]});const w=[...n];w.splice(j,1),r(w)}}function x(j,A){const w=l||[],c={lockedFigures:[...w.slice(0,j),{...w[j],...A},...w.slice(j+1)]};u(c)}function T(j){r(Array(l==null?void 0:l.length).fill(j))}const S=n.every(j=>!j),P=S?"Expand all":"Collapse all",M=!!(l!=null&&l.length);return e.jsxs(e.Fragment,{children:[e.jsx(tn,{title:"Locked Figures",isOpen:t,onToggle:()=>i(!t),isCollapsible:!0}),t&&e.jsxs(y,{children:[l==null?void 0:l.map((j,A)=>e.jsx(ct,{expanded:n[A],onToggle:w=>{const c=[...n];c[A]=w,r(c)},...j,onChangeProps:w=>x(A,w),onMove:w=>h(A,w),onRemove:()=>b(A)},`${s}-locked-${j}-${A}`)),e.jsxs(y,{style:sr.buttonContainer,children:[e.jsx(nt,{id:`${s}-select`,onChange:p}),e.jsx(C,{size:m.small_12}),M&&e.jsx(se,{kind:"secondary",onClick:()=>T(S),style:sr.button,children:P})]})]})]})},sr=R.StyleSheet.create({buttonContainer:{flexDirection:"row",alignItems:"center"},button:{marginTop:m.xSmall_8,flexGrow:1}});ht.__docgenInfo={description:"",methods:[],displayName:"LockedFiguresSection",props:{figures:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<InteractiveGraphEditorProps>"},name:"props"}],return:{name:"void"}}},description:""}}};const Rl=""+new URL("arrow-counter-clockwise-bold-BmDV9QhN.svg",import.meta.url).href,{getClockwiseAngle:Fl}=Ia;function Ol(o){if("startCoords"in o)return o.startCoords}function zl(o,a,n){switch(o.type){case"linear":case"ray":return Dr({...o,startCoords:void 0},a,n);case"segment":return _r({...o,startCoords:void 0},a,n);case"linear-system":return Er({...o,startCoords:void 0},a,n);case"circle":const r=Fr({...o,startCoords:void 0}),t=Or(zr(r.radiusPoint,r.center));return{center:r.center,radius:t};case"sinusoid":return Rr({...o,startCoords:void 0},a,n);case"quadratic":return Nr({...o,startCoords:void 0},a,n);case"point":return Ir({...o,startCoords:void 0},a,n);case"polygon":return jr({...o,startCoords:void 0},a,n);case"angle":return Lr({graph:{...o,startCoords:void 0},range:a,step:n});default:return}}const El=o=>{const a=o[0],n=o[1],r=n[1]-a[1],t=Math.PI/(2*(n[0]-a[0])),i=a[0]*t,s=a[1];return"y = "+r.toFixed(3)+"sin("+t.toFixed(3)+"x - "+i.toFixed(3)+") + "+s.toFixed(3)},_l=o=>{const a=o[0],n=o[1],r=o[2],t=(a[0]-n[0])*(a[0]-r[0])*(n[0]-r[0]);if(t===0)return"Division by zero error";const i=(r[0]*(n[1]-a[1])+n[0]*(a[1]-r[1])+a[0]*(r[1]-n[1]))/t,s=(r[0]*r[0]*(a[1]-n[1])+n[0]*n[0]*(r[1]-a[1])+a[0]*a[0]*(n[1]-r[1]))/t,l=(n[0]*r[0]*(n[0]-r[0])*a[1]+r[0]*a[0]*(r[0]-a[0])*n[1]+a[0]*n[0]*(a[0]-n[0])*r[1])/t;return"y = "+i.toFixed(3)+"x^2 + "+s.toFixed(3)+"x + "+l.toFixed(3)},Dl=(o,a=!1)=>{const n=o[1];return`${Fl(o,a).toFixed(0)}° angle at (${n[0]}, ${n[1]})`},Ml=(o,a)=>{if(a)return!1;switch(o.type){case"point":return o.numPoints!=="unlimited";case"polygon":return o.numSides!=="unlimited"&&o.snapTo!=="angles"&&o.snapTo!=="sides";case"none":return!1;case"angle":case"circle":case"linear":case"linear-system":case"quadratic":case"ray":case"segment":case"sinusoid":return!0;default:throw new rn(o)}},gt=o=>{const{startCoords:a,allowReflexAngles:n,onChange:r}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:cn.equationSection,children:[e.jsx(X,{children:"Starting equation:"}),e.jsx(na,{style:cn.equationBody,children:Dl(a,n)})]}),e.jsxs(y,{style:cn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:t=>r([t,a[1],a[2]])})]}),e.jsxs(y,{style:cn.tile,children:[e.jsx(W,{children:"Vertex:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:t=>r([a[0],t,a[2]])})]}),e.jsxs(y,{style:cn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[2],labels:["x","y"],onChange:t=>r([a[0],a[1],t])})]})]})},cn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:F.fadedOffBlack8,border:`1px solid ${F.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Ne.size.xSmall}});gt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsAngle",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: AngleCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const yt=o=>{const{startCoords:a,onChange:n}=o,[r,t]=g.useState(a.radius.toString());g.useEffect(()=>{t(a.radius.toString())},[a.radius]);function i(s){t(s),!(isNaN(+s)||s===""||+s==0)&&n({center:a.center,radius:parseFloat(s)})}return e.jsxs(y,{style:Vn.tile,children:[e.jsxs(y,{style:Vn.row,children:[e.jsx(W,{children:"Center:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a.center,labels:["x","y"],onChange:s=>n({center:s,radius:a.radius})})]}),e.jsx(C,{size:m.small_12}),e.jsxs(W,{tag:"label",style:Vn.row,children:["Radius:",e.jsx(C,{size:m.small_12}),e.jsx(Rn,{value:r,onChange:i,style:Vn.textField})]})]})},Vn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64}});yt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsCircle",props:{startCoords:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CircleCoords) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},name:"startCoords"}],return:{name:"void"}}},description:""}}};const bt=o=>{const{startCoords:a,onChange:n}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:ur.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:r=>n([r,a[1]])})]}),e.jsxs(y,{style:ur.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:r=>n([a[0],r])})]})]})},ur=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"}});bt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsLine",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const wt=o=>{const{startCoords:a,type:n,onChange:r}=o,t=n==="segment"?"Segment":"Line";return e.jsx(e.Fragment,{children:a.map((i,s)=>e.jsxs(we,{header:e.jsx(W,{children:`${t} ${s+1}`}),expanded:!0,children:[e.jsxs(y,{style:dr.nestedTile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:i[0],labels:["x","y"],onChange:l=>{const u=[...a];u[s]=[l,i[1]],r(u)}})]}),e.jsxs(y,{style:dr.nestedTile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:i[1],labels:["x","y"],onChange:l=>{const u=[...a];u[s]=[i[0],l],r(u)}})]})]},`segment-${s}-start-coords`))})},dr=R.StyleSheet.create({nestedTile:{paddingBottom:m.small_12,flexDirection:"row",alignItems:"center"}});wt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsMultiline",props:{type:{required:!0,tsType:{name:"union",raw:'"linear-system" | "segment"',elements:[{name:"literal",value:'"linear-system"'},{name:"literal",value:'"segment"'}]},description:""},startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const ft=o=>{const{startCoords:a,onChange:n}=o;return e.jsx(e.Fragment,{children:a.map((r,t)=>e.jsxs(y,{style:$l.tile,children:[e.jsx(W,{children:`Point ${t+1}:`}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:r,labels:["x","y"],onChange:i=>{const s=[...a];s[t]=i,n(s)}})]},t))})},$l=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"}});ft.__docgenInfo={description:"",methods:[],displayName:"StartCoordsPoint",props:{startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"Coord[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: Coord[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"Coord[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const kt=o=>{const{startCoords:a,onChange:n}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:hn.equationSection,children:[e.jsx(X,{children:"Starting equation:"}),e.jsx(na,{style:hn.equationBody,children:_l(a)})]}),e.jsxs(y,{style:hn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:r=>n([r,a[1],a[2]])})]}),e.jsxs(y,{style:hn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:r=>n([a[0],r,a[2]])})]}),e.jsxs(y,{style:hn.tile,children:[e.jsx(W,{children:"Point 3:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[2],labels:["x","y"],onChange:r=>n([a[0],a[1],r])})]})]})},hn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:F.fadedOffBlack8,border:`1px solid ${F.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Ne.size.xSmall}});kt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsQuadratic",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: [Coord, Coord, Coord]) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const vt=o=>{const{startCoords:a,onChange:n}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:Wn.equationSection,children:[e.jsx(X,{children:"Starting equation:"}),e.jsx(na,{style:Wn.equationBody,children:El(a)})]}),e.jsxs(y,{style:Wn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:r=>n([r,a[1]])})]}),e.jsxs(y,{style:Wn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:r=>n([a[0],r])})]})]})},Wn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:F.fadedOffBlack8,border:`1px solid ${F.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Ne.size.xSmall}});vt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSinusoid",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: SinusoidCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Vl=o=>{const{type:a,range:n,step:r,allowReflexAngles:t,onChange:i}=o;switch(a){case"linear":case"ray":const s=Dr(o,n,r);return e.jsx(bt,{startCoords:s,onChange:i});case"linear-system":case"segment":const l=a==="segment"?_r(o,n,r):Er(o,n,r);return e.jsx(wt,{type:a,startCoords:l,onChange:i});case"circle":const u=Fr(o),p=Or(zr(u.radiusPoint,u.center));return e.jsx(yt,{startCoords:{center:u.center,radius:p},onChange:i});case"sinusoid":const h=Rr(o,n,r);return e.jsx(vt,{startCoords:h,onChange:i});case"quadratic":const b=Nr(o,n,r);return e.jsx(kt,{startCoords:b,onChange:i});case"point":case"polygon":const x=a==="point"?Ir(o,n,r):jr(o,n,r);return e.jsx(ft,{startCoords:x,onChange:i});case"angle":const T=Lr({graph:o,range:n,step:r});return e.jsx(gt,{startCoords:T,allowReflexAngles:t,onChange:i});default:return null}},xt=o=>{const{range:a,step:n,onChange:r}=o,[t,i]=g.useState(!0);return e.jsxs(y,{children:[e.jsx(tn,{isCollapsible:!0,title:"Start coordinates",isOpen:t,onToggle:()=>i(!t)}),t&&e.jsxs(e.Fragment,{children:[e.jsx(Vl,{...o}),e.jsx(C,{size:m.small_12}),e.jsx(se,{startIcon:Rl,kind:"tertiary",size:"small",onClick:()=>{r(zl(o,a,n))},children:"Use default start coordinates"})]})]})};xt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSettings",props:{range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: StartCoords) => void",signature:{arguments:[{type:{name:'Extract["startCoords"]',raw:`Extract<
    PerseusGraphType,
    GraphTypesThatHaveStartCoords
>["startCoords"]`},name:"startCoords"}],return:{name:"void"}}},description:""}}};const{InfoTip:$e}=ae,wa=wo.widget,Wl=z.map(z.range(3,13),function(o){return e.jsx(_,{value:`${o}`,label:`${o} sides`},`polygon-sides-${o}`)});class Yn extends g.Component{constructor(){super(...arguments);d(this,"displayName","InteractiveGraphEditor");d(this,"className","perseus-widget-interactive-graph");d(this,"changeStartCoords",n=>{var t;if(!((t=this.props.graph)!=null&&t.type))return;const r={...this.props.graph,startCoords:n};this.props.onChange({graph:r})});d(this,"getSaveWarnings",()=>{var r;const n=[];for(const t of this.props.lockedFigures??[])t.type==="line"&&Na(t.points[0].coord,t.points[1].coord)&&n.push("The line cannot have length 0.");return((r=this.props.graph)==null?void 0:r.type)==="polygon"&&this.props.graph.numSides==="unlimited"&&this.props.graph.coords===null&&n.push("Polygon must be closed."),n})}serialize(){const n=z.pick(this.props,"step","backgroundImage","markings","labels","labelLocation","showProtractor","showTooltips","range","gridStep","snapStep","lockedFigures","fullGraphAriaLabel","fullGraphAriaDescription"),r=this.refs.graph;if(r){const t=r&&r.getUserInput();z.extend(n,{graph:{type:t.type,startCoords:this.props.graph&&Ol(this.props.graph)},correct:t}),z.each(["allowReflexAngles","angleOffsetDeg","numPoints","numSides","numSegments","showAngles","showSides","snapTo","snapDegrees"],function(i){z.has(t,i)&&(n.graph[i]=t[i])})}return n}render(){let n,r;const t=this.props.gridStep||Ce.getGridStep(this.props.range,this.props.step,ka.defaultBoxSize),i=this.props.snapStep||Ce.snapStepFromGridStep(t),s=Cr.SMALL;if(this.props.valid===!0){const l=this.props.correct,u={ref:"graph",box:this.props.box,range:this.props.range,labels:this.props.labels,labelLocation:this.props.labelLocation,step:this.props.step,gridStep:t,snapStep:i,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,lockedFigures:this.props.lockedFigures,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,trackInteraction:function(){},userInput:l,handleUserInput:p=>{let h=this.props.correct;Q(p!=null),h.type===p.type?h=Gl(h,p):h=p,this.props.onChange({correct:h,graph:this.props.graph})}};n=e.jsx(wa,{...u,containerSizeClass:s,apiOptions:{...this.props.apiOptions,isMobile:!1}}),r=wa.getEquationString(u)}else n=e.jsx("div",{className:"perseus-error",children:this.props.valid});return e.jsx(In,{children:l=>{var u,p,h,b,x,T,S,P,M,j,A,w,c,k,I,f;return e.jsxs(y,{children:[e.jsx(ne,{label:"Answer type:",children:e.jsx(Jr,{graphType:((u=this.props.graph)==null?void 0:u.type)??wa.defaultProps.userInput.type,onChange:q=>{this.props.onChange({graph:{type:q},correct:{type:q}})}})}),e.jsx(Qr,{ariaLabelValue:this.props.fullGraphAriaLabel??"",ariaDescriptionValue:this.props.fullGraphAriaDescription??"",onChange:this.props.onChange}),e.jsx(Yr,{id:l,equationString:r,children:n}),((p=this.props.correct)==null?void 0:p.type)==="point"&&e.jsx(ne,{label:"Number of Points:",children:e.jsx(Xr,{numPoints:(h=this.props.correct)==null?void 0:h.numPoints,onChange:q=>{this.props.onChange({correct:{type:"point",numPoints:q},graph:{type:"point",numPoints:q}})}})}),((b=this.props.correct)==null?void 0:b.type)==="angle"&&e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:je.row,children:[e.jsx(pe,{label:e.jsx(Ie,{children:"Show angle measures"}),checked:!!((x=this.props.correct)!=null&&x.showAngles),onChange:q=>{var N;((N=this.props.graph)==null?void 0:N.type)==="angle"&&(Q(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:q},graph:{...this.props.graph,showAngles:q}}))}}),e.jsx($e,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(y,{style:je.row,children:[e.jsx(pe,{label:e.jsx(Ie,{children:"Allow reflex angles"}),checked:!!((T=this.props.correct)!=null&&T.allowReflexAngles),onChange:q=>{var K,ee;Q(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),Q(((K=this.props.graph)==null?void 0:K.type)==="angle",`Expected graph type to be angle, but got ${(ee=this.props.graph)==null?void 0:ee.type}`);const N={allowReflexAngles:q};this.props.onChange({correct:{...this.props.correct,...N},graph:{...this.props.graph,...N}})}}),e.jsx($e,{children:e.jsx("p",{children:"Allow students to be able to create reflex angles."})})]})]}),((S=this.props.correct)==null?void 0:S.type)==="polygon"&&e.jsxs(e.Fragment,{children:[e.jsx(ne,{label:"Number of sides:",children:e.jsx(te,{selectedValue:(P=this.props.correct)!=null&&P.numSides?`${this.props.correct.numSides}`:"3",placeholder:"",onChange:q=>{var K;Q(((K=this.props.graph)==null?void 0:K.type)==="polygon");const N={numSides:Kr(q),coords:void 0,startCoords:void 0,snapTo:"grid"};this.props.onChange({correct:{...this.props.correct,...N},graph:{...this.props.graph,...N}})},style:je.singleSelectShort,children:[...Wl,e.jsx(_,{value:"unlimited",label:"unlimited sides"},"unlimited")]},"polygon-select")}),e.jsxs(ne,{label:"Snap to:",children:[e.jsxs(te,{selectedValue:((M=this.props.correct)==null?void 0:M.snapTo)||"grid",placeholder:"",onChange:q=>{var K,ee;Q(this.props.correct.type==="polygon",`Expected correct answer type to be polygon, but got ${this.props.correct.type}`),Q(((K=this.props.graph)==null?void 0:K.type)==="polygon",`Expected graph type to be polygon, but got ${(ee=this.props.graph)==null?void 0:ee.type}`);const N={snapTo:q,coords:null};this.props.onChange({correct:{...this.props.correct,...N},graph:{...this.props.graph,...N}})},style:je.singleSelectShort,children:[e.jsx(_,{value:"grid",label:"grid"}),((j=this.props.correct)==null?void 0:j.numSides)!=="unlimited"&&e.jsx(_,{value:"angles",label:"interior angles"}),((A=this.props.correct)==null?void 0:A.numSides)!=="unlimited"&&e.jsx(_,{value:"sides",label:"side measures"})]}),e.jsxs($e,{children:[e.jsx("p",{children:"These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."}),e.jsx("p",{children:"The interior angle and side measure options guide the points to the nearest whole angle or side measure respectively."})]})]}),e.jsxs(y,{style:je.row,children:[e.jsx(pe,{label:e.jsx(Ie,{children:"Show angle measures"}),checked:!!((w=this.props.correct)!=null&&w.showAngles),onChange:()=>{var q;((q=this.props.graph)==null?void 0:q.type)==="polygon"&&(Q(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:!this.props.correct.showAngles},graph:{...this.props.graph,showAngles:!this.props.graph.showAngles}}))}}),e.jsx($e,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(y,{style:je.row,children:[e.jsx(pe,{label:e.jsx(Ie,{children:"Show side measures"}),checked:!!((c=this.props.correct)!=null&&c.showSides),onChange:()=>{var q;((q=this.props.graph)==null?void 0:q.type)==="polygon"&&this.props.correct.type==="polygon"&&this.props.onChange({correct:{...this.props.correct,showSides:!this.props.correct.showSides},graph:{...this.props.graph,showSides:!this.props.graph.showSides}})}}),e.jsx($e,{children:e.jsx("p",{children:"Displays the side lengths."})})]})]}),((k=this.props.correct)==null?void 0:k.type)==="segment"&&e.jsx(ne,{label:"Number of segments:",children:e.jsx(et,{numSegments:(I=this.props.correct)==null?void 0:I.numSegments,onChange:q=>{this.props.onChange({correct:{type:"segment",numSegments:q,coords:null},graph:{type:"segment",numSegments:q}})}})}),((f=this.props.graph)==null?void 0:f.type)&&Ml(this.props.graph,this.props.static)&&e.jsx(xt,{...this.props.graph,range:this.props.range,step:this.props.step,onChange:this.changeStartCoords}),e.jsx(Zr,{graphId:l,correct:this.props.correct,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,lockedFigures:this.props.lockedFigures}),e.jsx(Xn,{box:qr(s),range:this.props.range,labels:this.props.labels,labelLocation:this.props.labelLocation,step:this.props.step,gridStep:t,snapStep:i,valid:this.props.valid,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,onChange:this.props.onChange}),this.props.correct.type==="polygon"&&e.jsxs(ne,{label:"Student answer must",children:[e.jsxs(te,{selectedValue:this.props.correct.match||"exact",onChange:q=>{Q(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`);const N={...this.props.correct,match:q};this.props.onChange({correct:N})},placeholder:"",style:je.singleSelectShort,children:[e.jsx(_,{value:"exact",label:"match exactly"}),e.jsx(_,{value:"congruent",label:"be congruent"}),e.jsx(_,{value:"approx",label:"be approximately congruent"}),e.jsx(_,{value:"similar",label:"be similar"})]}),e.jsx($e,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Match Exactly:"})," Match exactly in size, orientation, and location on the grid even if it is not shown in the background."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Congruent:"})," Be congruent in size and shape, but can be located anywhere on the grid."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Approximately Congruent:"})," ","Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid."," ",e.jsx("em",{children:"Use this with snapping to angle measure."})]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Similar:"})," Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."]})})]})})]}),this.props.correct.type==="angle"&&e.jsxs(ne,{label:"Student answer must",children:[e.jsxs(te,{selectedValue:this.props.correct.match||"exact",onChange:q=>{Q(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,match:q}})},placeholder:"",style:je.singleSelectShort,children:[e.jsx(_,{value:"exact",label:"match exactly"}),e.jsx(_,{value:"congruent",label:"be congruent"})]}),e.jsx($e,{children:e.jsx("p",{children:"Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."})})]}),e.jsx(ht,{figures:this.props.lockedFigures,onChange:this.props.onChange})]})}})}}d(Yn,"widgetName","interactive-graph"),d(Yn,"defaultProps",{...fo.defaultWidgetOptions,valid:!0,lockedFigures:[]});function Gl(o,a){if(o.type!==a.type)throw new Error(`Cannot merge graphs with different types (${o.type} and ${a.type})`);switch(o.type){case"angle":return Q(a.type==="angle"),{...o,...a};case"circle":return Q(a.type==="circle"),{...o,...a};case"linear":return Q(a.type==="linear"),{...o,...a};case"linear-system":return Q(a.type==="linear-system"),{...o,...a};case"none":return Q(a.type==="none"),{...o,...a};case"point":return Q(a.type==="point"),{...o,...a};case"polygon":return Q(a.type==="polygon"),{...o,...a};case"quadratic":return Q(a.type==="quadratic"),{...o,...a};case"ray":return Q(a.type==="ray"),{...o,...a};case"segment":return Q(a.type==="segment"),{...o,...a};case"sinusoid":return Q(a.type==="sinusoid"),{...o,...a};default:throw new rn(o)}}const je=R.StyleSheet.create({singleSelectShort:{height:26},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center"}});Yn.__docgenInfo={description:`An editor for the InteractiveGraph widget, which allows the user to
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}}},description:""},static:{required:!1,tsType:{name:"boolean"},description:""}}};const{RangeInput:Bl}=ae,Hl=ko.widget,mr=6;class xn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"onMatrixBoardSizeChange",n=>{const r=xo(this.props.answers);if(n[0]!==null&&n[1]!==null){n=[Math.round(Math.min(Math.max(n[0],1),mr)),Math.round(Math.min(Math.max(n[1],1),mr))];const t=z(Math.min(n[0],r[0])).times(i=>z(Math.min(n[1],r[1])).times(s=>this.props.answers[i][s]));this.props.onChange({matrixBoardSize:n,answers:t})}});d(this,"serialize",()=>de.serialize.call(this))}render(){const n={onBlur:()=>{},onFocus:()=>{},trackInteraction:()=>{},userInput:{answers:this.props.answers},handleUserInput:r=>{this.change({answers:r.answers})},...this.props};return e.jsxs("div",{className:"perseus-matrix-editor",children:[e.jsxs("div",{className:"perseus-widget-row",children:[" ","Max matrix size:"," ",e.jsx(Bl,{value:this.props.matrixBoardSize,onChange:this.onMatrixBoardSizeChange,format:this.props.labelStyle,useArrowKeys:!0})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(Hl,{...n})}),e.jsxs("div",{className:"perseus-widget-row",children:[" ","Matrix prefix:"," ",e.jsx(Fe,{ref:"prefix",apiOptions:this.props.apiOptions,content:this.props.prefix,widgetEnabled:!1,onChange:r=>{this.change({prefix:r.content})}})]}),e.jsxs("div",{className:"perseus-widget-row",children:[" ","Matrix suffix:"," ",e.jsx(Fe,{ref:"suffix",apiOptions:this.props.apiOptions,content:this.props.suffix,widgetEnabled:!1,onChange:r=>{this.change({suffix:r.content})}})]})]})}}d(xn,"propTypes",{...ue,matrixBoardSize:L.arrayOf(L.number).isRequired,answers:L.arrayOf(L.arrayOf(L.number)),prefix:L.string,suffix:L.string,cursorPosition:L.arrayOf(L.number)}),d(xn,"widgetName","matrix"),d(xn,"defaultProps",vo.defaultWidgetOptions);xn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onMatrixBoardSizeChange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MatrixEditor",props:{matrixBoardSize:{defaultValue:{value:"[3, 3]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1},answers:{defaultValue:{value:"[[]]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"arrayOf",value:{name:"number"}}},required:!1},prefix:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},suffix:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},cursorPosition:{defaultValue:{value:"[0, 0]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Ul,NumberInput:Gn,RangeInput:Kl}=ae,Xl={url:null,top:0,left:0};class qn extends g.Component{constructor(){super(...arguments);d(this,"className","perseus-widget-measurer");d(this,"change",(...n)=>ie.apply(this,n));d(this,"_changeUrl",n=>{this._changeImage("url",n.target.value)});d(this,"_changeTop",n=>{this._changeImage("top",n)});d(this,"_changeLeft",n=>{this._changeImage("left",n)});d(this,"_changeImage",(n,r)=>{const t=z.clone(this.props.image);t[n]=r,this.change("image",t)});d(this,"renderLabelChoices",n=>z.map(n,function(r){const[t,i]=r;return e.jsx("option",{value:i,children:t},i)}));d(this,"serialize",()=>de.serialize.call(this))}render(){const n=z.extend({},Xl,this.props.image);return e.jsxs("div",{className:"perseus-widget-measurer",children:[e.jsx("div",{children:"Image displayed under protractor and/or ruler:"}),e.jsxs("div",{children:["URL:"," ",e.jsx("input",{type:"text",className:"perseus-widget-measurer-url",ref:"image-url",defaultValue:n.url,onChange:this._changeUrl}),e.jsx(Ul,{children:e.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),n.url&&e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("label",{className:"perseus-widget-left-col",children:["Pixels from top:"," ",e.jsx(Gn,{placeholder:0,onChange:this._changeTop,value:n.top,useArrowKeys:!0})]}),e.jsxs("label",{className:"perseus-widget-right-col",children:["Pixels from left:"," ",e.jsx(Gn,{placeholder:0,onChange:this._changeLeft,value:n.left,useArrowKeys:!0})]})]}),e.jsxs("div",{children:["Containing area [width, height]:"," ",e.jsx(Kl,{onChange:this.change("box"),value:this.props.box,useArrowKeys:!0})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(pe,{label:"Show ruler",checked:this.props.showRuler,onChange:r=>{this.props.onChange({showRuler:r})}})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(pe,{label:"Show protractor",checked:this.props.showProtractor,onChange:r=>{this.props.onChange({showProtractor:r})}})})]}),this.props.showRuler&&e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler label:"," ",e.jsxs("select",{onChange:r=>this.change("rulerLabel",r.target.value),value:this.props.rulerLabel,children:[e.jsx("option",{value:"",children:"None"}),e.jsx("optgroup",{label:"Metric",children:this.renderLabelChoices([["milimeters","mm"],["centimeters","cm"],["meters","m"],["kilometers","km"]])}),e.jsx("optgroup",{label:"Imperial",children:this.renderLabelChoices([["inches","in"],["feet","ft"],["yards","yd"],["miles","mi"]])})]})]})}),e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler ticks:"," ",e.jsx("select",{onChange:r=>this.change("rulerTicks",+r.target.value),value:this.props.rulerTicks,children:z.map([1,2,4,8,10,16],function(r){return e.jsx("option",{value:r,children:r},r)})})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Ruler pixels per unit:"," ",e.jsx(Gn,{placeholder:40,onChange:this.change("rulerPixels"),value:this.props.rulerPixels,useArrowKeys:!0})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Ruler length in units:"," ",e.jsx(Gn,{placeholder:10,onChange:this.change("rulerLength"),value:this.props.rulerLength,useArrowKeys:!0})]})})]})]})}}d(qn,"widgetName","measurer"),d(qn,"propTypes",{...ue,box:L.arrayOf(L.number),image:L.shape({url:L.string,top:L.number,left:L.number}),showProtractor:L.bool,showRuler:L.bool,rulerLabel:L.string,rulerTicks:L.number,rulerPixels:L.number,rulerLength:L.number}),d(qn,"defaultProps",qo.defaultWidgetOptions);qn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_changeUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"_changeTop",docblock:null,modifiers:[],params:[{name:"newTop",optional:!1,type:null}],returns:null},{name:"_changeLeft",docblock:null,modifiers:[],params:[{name:"newLeft",optional:!1,type:null}],returns:null},{name:"_changeImage",docblock:null,modifiers:[],params:[{name:"subProp",optional:!1,type:null},{name:"newValue",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MeasurerEditor",props:{box:{defaultValue:{value:"[480, 480]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1},image:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"shape",value:{url:{name:"string",required:!1},top:{name:"number",required:!1},left:{name:"number",required:!1}}},required:!1},showProtractor:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},showRuler:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},rulerLabel:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},rulerTicks:{defaultValue:{value:"10",computed:!1},description:"",type:{name:"number"},required:!1},rulerPixels:{defaultValue:{value:"40",computed:!1},description:"",type:{name:"number"},required:!1},rulerLength:{defaultValue:{value:"10",computed:!1},description:"",type:{name:"number"},required:!1}},composes:["@khanacademy/perseus"]};const{NumberInput:Jl,TextInput:Yl}=ae;class Qn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"updateMolecule",n=>{this.change({smiles:n})});d(this,"updateRotation",n=>{this.change({rotationAngle:n})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:["SMILES: ",e.jsx(Yl,{onChange:this.updateMolecule,value:this.props.smiles})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Rotation (deg): ",e.jsx(Jl,{onChange:this.updateRotation,value:this.props.rotationAngle})]})})]})}}d(Qn,"propTypes",{...ue,rotationAngle:L.number,smiles:L.string}),d(Qn,"widgetName","molecule-renderer");Qn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"updateMolecule",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"updateRotation",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MoleculeWidgetEditor",props:{rotationAngle:{description:"",type:{name:"number"},required:!1},smiles:{description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Bn,TextListEditor:pr}=ae,cr="normal",hr="auto",gr="horizontal",yr="vertical",br=(o,a,n,r)=>{const t={};n&&r!==void 0&&(t[n]=r.map(p=>({content:p})));const i=n==="correctOptions"?t.correctOptions:o,s=n==="otherOptions"?t.otherOptions:a,l=[...i,...s],u=[...new Set(l.map(p=>p.content))].filter(p=>p!=="").sort().sort((p,h)=>{const b=x=>/\d/.test(x)?0:/^\$?[a-zA-Z]+\$?$/.test(x)?2:1;return b(p)-b(h)}).map(p=>({content:p}));return{...t,options:u}};class Cn extends g.Component{constructor(){super(...arguments);d(this,"onOptionsChange",(n,r,t)=>{const i=br(this.props.correctOptions||[],this.props.otherOptions||[],n,r);this.props.onChange(i,t)});d(this,"onLayoutChange",n=>{this.props.onChange({layout:n.target.value})});d(this,"onHeightChange",n=>{this.props.onChange({height:n.target.value})});d(this,"serialize",()=>{const{options:n}=br(this.props.correctOptions||[],this.props.otherOptions||[]);return{options:n,correctOptions:this.props.correctOptions,otherOptions:this.props.otherOptions,height:this.props.height,layout:this.props.layout}})}render(){return e.jsxs("div",{className:"perseus-widget-orderer",children:[e.jsxs("div",{children:[" ","Correct answer:"," ",e.jsx(Bn,{children:e.jsx("p",{children:"Place the cards in the correct order. The same card can be used more than once in the answer but will only be displayed once at the top of a stack of identical cards."})})]}),e.jsx(pr,{options:z.pluck(this.props.correctOptions,"content"),onChange:this.onOptionsChange.bind(this,"correctOptions"),layout:this.props.layout}),e.jsxs("div",{children:[" ","Other cards:"," ",e.jsx(Bn,{children:e.jsx("p",{children:"Create cards that are not part of the answer."})})]}),e.jsx(pr,{options:z.pluck(this.props.otherOptions,"content"),onChange:this.onOptionsChange.bind(this,"otherOptions"),layout:this.props.layout}),e.jsxs("div",{children:[e.jsxs("label",{children:[" ","Layout:"," ",e.jsxs("select",{value:this.props.layout,onChange:this.onLayoutChange,children:[e.jsx("option",{value:gr,children:"Horizontal"}),e.jsx("option",{value:yr,children:"Vertical"})]})]}),e.jsx(Bn,{children:e.jsx("p",{children:"Use the horizontal layout for short text and small images. The vertical layout is best for longer text (e.g. proofs)."})})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" ","Height:"," ",e.jsxs("select",{value:this.props.height,onChange:this.onHeightChange,children:[e.jsx("option",{value:cr,children:"Normal"}),e.jsx("option",{value:hr,children:"Automatic"})]})]}),e.jsx(Bn,{children:e.jsx("p",{children:'Use "Normal" for text, "Automatic" for images.'})})]})]})}}d(Cn,"propTypes",{correctOptions:L.array,otherOptions:L.array,height:L.oneOf([cr,hr]),layout:L.oneOf([gr,yr]),onChange:L.func.isRequired}),d(Cn,"widgetName","orderer"),d(Cn,"defaultProps",Co.defaultWidgetOptions);Cn.__docgenInfo={description:"",methods:[{name:"onOptionsChange",docblock:null,modifiers:[],params:[{name:"whichOptions",optional:!1,type:null},{name:"options",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"onLayoutChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"onHeightChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"OrdererEditor",props:{correctOptions:{defaultValue:{value:'[{content: "$x$"}]',computed:!1},description:"",type:{name:"array"},required:!1},otherOptions:{defaultValue:{value:'[{content: "$y$"}]',computed:!1},description:"",type:{name:"array"},required:!1},height:{defaultValue:{value:'"normal"',computed:!1},description:"",type:{name:"enum",value:[{value:'"normal"',computed:!1},{value:'"auto"',computed:!1}]},required:!1},layout:{defaultValue:{value:'"horizontal"',computed:!1},description:"",type:{name:"enum",value:[{value:'"horizontal"',computed:!1},{value:'"vertical"',computed:!1}]},required:!1},onChange:{description:"",type:{name:"func"},required:!0}}};const{InfoTip:wr}=ae;class Tn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){const n=e.jsx(Fe,{ref:"passage-editor",apiOptions:this.props.apiOptions,content:this.props.passageText,widgetEnabled:!1,placeholder:"Type passage here...",onChange:t=>{this.change({passageText:t.content})},showWordCount:!0}),r=e.jsx(Fe,{ref:"passage-footnotes-editor",apiOptions:this.props.apiOptions,content:this.props.footnotes,widgetEnabled:!1,placeholder:"Type footnotes here...",onChange:t=>{this.change({footnotes:t.content})}});return e.jsxs("div",{className:"perseus-widget-passage-editor",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(pe,{label:"Show line numbers",checked:this.props.showLineNumbers,onChange:t=>{this.props.onChange({showLineNumbers:t})}})}),e.jsxs("div",{children:["Passage title:",e.jsx(wr,{children:e.jsx("p",{children:"An optional title that will appear directly above the passage in the same font style. (E.g. Passage 1)"})}),e.jsx("div",{children:e.jsx("input",{type:"text",defaultValue:this.props.passageTitle,onChange:t=>{this.change({passageTitle:t.target.value})}})})]}),e.jsxs("div",{children:["Passage Text:",n]}),e.jsxs("div",{children:["Footnotes:",e.jsx(wr,{children:e.jsx("p",{children:"To add footnotes, add ^ characters where they belong in the passage. Then, add ^ in the footnotes area to reference the footnotes in the passage."})}),r]})]})}}d(Tn,"propTypes",{...ue,passageTitle:L.string,passageText:L.string,footnotes:L.string,showLineNumbers:L.bool}),d(Tn,"widgetName","passage"),d(Tn,"defaultProps",To.defaultWidgetOptions);Tn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageEditor",props:{passageTitle:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},passageText:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},footnotes:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},showLineNumbers:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Ql,NumberInput:fr,TextInput:Zl}=ae;class Sn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:["Passage Number: ",e.jsx(fr,{value:this.props.passageNumber,onChange:this.change("passageNumber")})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Reference Number: ",e.jsx(fr,{value:this.props.referenceNumber,onChange:this.change("referenceNumber")})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Summary Text: ",e.jsx(Zl,{value:this.props.summaryText,onChange:this.change("summaryText")}),e.jsxs(Ql,{children:[e.jsx("p",{children:"Short summary of the referenced section. This will be included in parentheses and quotes automatically."}),e.jsx("p",{children:"Ex: The start ... the end"})]})]})})]})}}d(Sn,"propTypes",{...ue,passageNumber:L.number,referenceNumber:L.number,summaryText:L.string}),d(Sn,"widgetName","passage-ref"),d(Sn,"defaultProps",So.defaultWidgetOptions);Sn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageRefEditor",props:{passageNumber:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},referenceNumber:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},summaryText:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};class An extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleContentChange",n=>{this.change({content:n.target.value})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:["Content:",e.jsx("input",{type:"text",value:this.props.content,onChange:this.handleContentChange})]})}}d(An,"propTypes",{...ue,content:L.string}),d(An,"widgetName","passage-ref-target"),d(An,"defaultProps",Ao.defaultWidgetOptions);An.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleContentChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageRefTargetEditor",props:{content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};const kr=""+new URL("plus-bold-CG3_Sgx2.svg",import.meta.url).href,es="_tile_1uiyd_1",ns="_content-heading_1uiyd_14",as="_radio-option-actions-container_1uiyd_18",Sa={tile:es,"content-heading":"_content-heading_1uiyd_14",contentHeading:ns,"radio-option-actions-container":"_radio-option-actions-container_1uiyd_18",radioOptionActionsContainer:as};function qt({content:o,showDelete:a,showMove:n,onDelete:r,onMove:t}){return e.jsxs("div",{className:Sa.radioOptionActionsContainer,children:[a&&e.jsx(se,{size:"small",kind:"tertiary",startIcon:Mr,onClick:()=>{window.confirm(`Are you sure you want to remove this choice? 

${o}`)&&r()},children:"Remove"}),n&&e.jsxs(e.Fragment,{children:[e.jsx(On,{}),e.jsx(le,{icon:ot,kind:"tertiary",size:"xsmall","aria-label":"Move choice to the top",onClick:()=>t("top")}),e.jsx(le,{icon:it,kind:"tertiary",size:"xsmall","aria-label":"Move choice up",onClick:()=>t("up")}),e.jsx(le,{icon:ea,kind:"tertiary",size:"xsmall","aria-label":"Move choice down",onClick:()=>t("down")}),e.jsx(le,{icon:tt,kind:"tertiary",size:"xsmall","aria-label":"Move choice to the bottom",onClick:()=>t("bottom")})]})]})}qt.__docgenInfo={description:"",methods:[],displayName:"RadioOptionSettingsActions",props:{content:{required:!0,tsType:{name:"string"},description:""},showDelete:{required:!0,tsType:{name:"boolean"},description:""},showMove:{required:!0,tsType:{name:"boolean"},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: ChoiceMovementType) => void",signature:{arguments:[{type:{name:"union",raw:'"up" | "down" | "top" | "bottom"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},name:"movement"}],return:{name:"void"}}},description:""}}};function Ct({index:o,correct:a,multipleSelect:n,onClick:r}){return e.jsx(Ze,{size:"large",style:{marginInlineEnd:v.size_080,color:a?F.white:F.red,backgroundColor:a?F.activeGreen:F.fadedRed8,borderRadius:n?D.radius.radius_040:v.size_240,border:`1px solid ${a?F.activeGreen:F.red}`,width:v.size_560,flexDirection:"row"},onClick:r,children:e.jsxs(e.Fragment,{children:[e.jsx(Ae,{size:"small",icon:a?La:oi,style:{marginInlineEnd:v.size_060},color:a?F.white:F.red}),String.fromCharCode(65+o)]})})}Ct.__docgenInfo={description:"",methods:[],displayName:"RadioStatusPill",props:{index:{required:!0,tsType:{name:"number"},description:""},correct:{required:!1,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function Tt({index:o,choice:a,multipleSelect:n,onStatusChange:r,onContentChange:t,onRationaleChange:i,showDelete:s,showMove:l,onDelete:u,onMove:p}){const{content:h,rationale:b,correct:x,isNoneOfTheAbove:T}=a;return e.jsxs("div",{className:Sa.tile,children:[e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx(Ct,{index:o,correct:x,multipleSelect:n,onClick:()=>{r(o,!x)}}),e.jsx(ua,{style:{display:"inline",marginInlineEnd:v.size_080},children:"Status"}),e.jsx(Ze,{kind:x?"accent":"transparent",onClick:()=>{r(o,!0)},style:{marginInlineEnd:v.size_080,outlineColor:x?E.core.background.instructive.default:E.core.border.neutral.default},children:"Correct"}),e.jsx(Ze,{kind:x?"transparent":"accent",onClick:()=>{r(o,!1)},style:{marginInlineEnd:v.size_080,outlineColor:x?E.core.border.neutral.default:E.core.background.instructive.default},children:"Incorrect"})]}),e.jsxs(ua,{tag:"label",className:Sa.contentHeading,children:["Content",e.jsx(Un,{value:T?"None of the above":h,disabled:T,placeholder:"Type a choice here...",resizeType:"vertical",rows:1,onChange:S=>{t(o,S)}})]}),e.jsxs(ua,{tag:"label",children:["Rationale",e.jsx(Un,{value:b??"",placeholder:`Why is this choice ${x?"correct":"incorrect"}?`,resizeType:"vertical",rows:1,onChange:S=>{i(o,S)}})]}),e.jsx(qt,{content:h,showDelete:s,showMove:l,onDelete:u,onMove:S=>p(o,S)})]})}Tt.__docgenInfo={description:"",methods:[],displayName:"RadioOptionSettings",props:{index:{required:!0,tsType:{name:"number"},description:""},choice:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"rationale",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}}]}},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},onStatusChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, correct: boolean) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"boolean"},name:"correct"}],return:{name:"void"}}},description:""},onContentChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, content: string) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"string"},name:"content"}],return:{name:"void"}}},description:""},onRationaleChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, rationale: string) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"string"},name:"rationale"}],return:{name:"void"}}},description:""},showDelete:{required:!0,tsType:{name:"boolean"},description:""},showMove:{required:!0,tsType:{name:"boolean"},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, movement: ChoiceMovementType) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"union",raw:'"up" | "down" | "top" | "bottom"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},name:"movement"}],return:{name:"void"}}},description:""}}};function rs(o,a,n,r){const t=[...o],[i]=t.splice(n,1);switch(r){case"top":if(n===0)return o;t.unshift(i);break;case"up":if(n===0)return o;t.splice(n-1,0,i);break;case"down":if(n===o.length-1||n===o.length-2&&a)return o;t.splice(n+1,0,i);break;case"bottom":if(n===o.length-1)return o;if(a){const s=t.pop();t.push(i),s&&t.push(s)}else t.push(i);break}return t}class Zn extends g.Component{constructor(){super(...arguments);d(this,"onMultipleSelectChange",n=>{const r=n.multipleSelect;let t=this.props.choices;r||Xe(t)>1&&(t=t.map(s=>({...s,correct:!1}))),this.props.onChange({multipleSelect:r,choices:t,numCorrect:Xe(t)})});d(this,"onCountChoicesChange",n=>{const r=n.countChoices;this.props.onChange({countChoices:r})});d(this,"onChange",({checked:n})=>{const r=this.props.choices.map((t,i)=>({...t,correct:n[i],content:t.isNoneOfTheAbove&&!n[i]?"":t.content}));this.props.onChange({choices:r,numCorrect:Xe(r)})});d(this,"onStatusChange",(n,r)=>{let t;r&&!this.props.multipleSelect?t=this.props.choices.map(i=>!1):t=this.props.choices.map(i=>i.correct),t[n]=r,this.onChange({checked:t})});d(this,"onContentChange",(n,r)=>{const t=[...this.props.choices];t[n]={...t[n],content:r},this.props.onChange({choices:t})});d(this,"onRationaleChange",(n,r)=>{const t=[...this.props.choices];t[n]={...t[n],rationale:r},r===""&&delete t[n].rationale,this.props.onChange({choices:t})});d(this,"onDelete",n=>{const r=this.props.choices.slice(),t=r[n];r.splice(n,1),this.props.onChange({choices:r,hasNoneOfTheAbove:this.props.hasNoneOfTheAbove&&!t.isNoneOfTheAbove,numCorrect:Xe(r)})});d(this,"addChoice",(n,r)=>{r.preventDefault();const t=this.props.choices.slice(),i={isNoneOfTheAbove:n,content:""},s=t.length-(this.props.hasNoneOfTheAbove?1:0);t.splice(s,0,i),this.props.onChange({choices:t,hasNoneOfTheAbove:n||this.props.hasNoneOfTheAbove},()=>{this.refs[`choice-editor${s}`].refs["content-editor"].focus()})});d(this,"handleMove",(n,r)=>{const t=rs(this.props.choices,this.props.hasNoneOfTheAbove,n,r);this.props.onChange({choices:t})});d(this,"focus",()=>(this.refs["choice-editor0"].refs["content-editor"].focus(),!0));d(this,"getSaveWarnings",()=>z.some(z.pluck(this.props.choices,"correct"))?[]:["No choice is marked as correct."])}serialize(){const{choices:n,randomize:r,multipleSelect:t,countChoices:i,hasNoneOfTheAbove:s,deselectEnabled:l}=this.props;return{choices:n,randomize:r,multipleSelect:t,countChoices:i,hasNoneOfTheAbove:s,deselectEnabled:l,numCorrect:Xe(n)}}render(){const n=Xe(this.props.choices);return e.jsxs("div",{children:[e.jsx(Lo,{href:"https://www.khanacademy.org/internal-courses/content-creation-best-practices/xe46daa512cd9c644:question-writing/xe46daa512cd9c644:multiple-choice/a/stems",target:"_blank",children:"Multiple choice best practices"}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(Ge,{label:"Randomize order",checked:this.props.randomize,onChange:r=>{this.props.onChange({randomize:r})},style:{marginBlockEnd:v.size_060}}),e.jsx(Ge,{label:"Multiple selections",checked:this.props.multipleSelect,onChange:r=>{this.onMultipleSelectChange({multipleSelect:r})},style:{marginBlockEnd:v.size_060}}),this.props.multipleSelect&&e.jsxs(e.Fragment,{children:[e.jsx(Ge,{label:"Specify number correct",checked:this.props.countChoices,onChange:r=>{this.onCountChoicesChange({countChoices:r})},style:{marginBlockEnd:v.size_060}}),e.jsxs(jo,{children:["Current number correct: ",n]})]})]}),this.props.choices.map((r,t)=>e.jsx(Tt,{index:t,choice:r,multipleSelect:this.props.multipleSelect,onStatusChange:this.onStatusChange,onContentChange:this.onContentChange,onRationaleChange:this.onRationaleChange,showDelete:this.props.choices.length>=2,showMove:this.props.choices.length>1&&!r.isNoneOfTheAbove,onDelete:()=>this.onDelete(t),onMove:this.handleMove},`choice-${t}}`)),e.jsxs("div",{className:"add-choice-container",children:[e.jsx(se,{size:"small",kind:"tertiary",startIcon:kr,onClick:this.addChoice.bind(this,!1),style:{marginInlineEnd:"2.4rem"},children:"Add a choice"}),!this.props.hasNoneOfTheAbove&&e.jsx(se,{size:"small",kind:"tertiary",startIcon:kr,onClick:this.addChoice.bind(this,!0),children:"None of the above"})]})]})}}d(Zn,"widgetName","radio"),d(Zn,"defaultProps",Po.defaultWidgetOptions);Zn.__docgenInfo={description:"",methods:[{name:"onMultipleSelectChange",docblock:null,modifiers:[],params:[{name:"allowMultiple",optional:!1,type:null}],returns:null},{name:"onCountChoicesChange",docblock:null,modifiers:[],params:[{name:"count",optional:!1,type:null}],returns:null},{name:"onChange",docblock:null,modifiers:[],params:[{name:"{checked}",optional:!1,type:null}],returns:null},{name:"onStatusChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"correct",optional:!1,type:null}],returns:null},{name:"onContentChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newContent",optional:!1,type:null}],returns:null},{name:"onRationaleChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newRationale",optional:!1,type:null}],returns:null},{name:"onDelete",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"addChoice",docblock:null,modifiers:[],params:[{name:"noneOfTheAbove",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"handleMove",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"movement",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"rationale",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}}]}}],raw:"PerseusRadioChoice[]"},description:"",defaultValue:{value:"[{}, {}, {}, {}]",computed:!1}},randomize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},hasNoneOfTheAbove:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},multipleSelect:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},deselectEnabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},static:{required:!0,tsType:{name:"boolean"},description:""}}};const{InfoTip:ts,NumberInput:vr}=ae,os=Io.widget;class Pn extends g.Component{constructor(){super(...arguments);d(this,"numberOfColumns",g.createRef());d(this,"focus",()=>{var n;(n=this.numberOfColumns.current)==null||n.focus()});d(this,"onSizeInput",(n,r)=>{let t=+n||0,i=+r||0;t=Math.min(Math.max(1,t),30),i=Math.min(Math.max(1,i),6);const s=this.props.columns,l=this.props.rows,u=this.props.answers;t<=l?u.length=t:z(t-l).times(function(){u.push(Ce.stringArrayOfSize(s))});function p(b){i<=s?b.length=i:z(i-s).times(function(){b.push("")})}const h=this.props.headers;p(h),z.each(u,p),this.props.onChange({rows:t,columns:i,answers:u,headers:h})});d(this,"serialize",()=>{const n=z.pick(this.props,"headers","rows","columns");return z.extend({},n,{answers:z.map(this.props.answers,z.clone)})})}render(){const n={headers:this.props.headers,onChange:this.props.onChange,userInput:this.props.answers,handleUserInput:r=>{this.props.onChange({answers:r})},apiOptions:this.props.apiOptions,editableHeaders:!0,onFocus:()=>{},onBlur:()=>{},trackInteraction:()=>{},Editor:Fe};return e.jsxs("div",{children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Number of columns:"," ",e.jsx(vr,{ref:this.numberOfColumns,value:this.props.columns,onChange:r=>{r&&this.onSizeInput(this.props.rows,r)},useArrowKeys:!0})]})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Number of rows:"," ",e.jsx(vr,{ref:"numberOfRows",value:this.props.rows,onChange:r=>{r&&this.onSizeInput(r,this.props.columns)},useArrowKeys:!0})]})}),e.jsxs("div",{children:[" ","Table of answers:"," ",e.jsx(ts,{children:e.jsx("p",{children:"The student has to fill out all cells in the table. For partially filled tables create a table using the template, and insert text input boxes as desired."})})]}),e.jsx("div",{children:e.jsx(os,{...n})})]})}}d(Pn,"propTypes",{rows:L.number,columns:L.number,headers:L.arrayOf(L.string),answers:L.arrayOf(L.arrayOf(L.string))}),d(Pn,"widgetName","table"),d(Pn,"defaultProps",No.defaultWidgetOptions);Pn.__docgenInfo={description:"",methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"onSizeInput",docblock:null,modifiers:[],params:[{name:"numRawRows",optional:!1,type:null},{name:"numRawColumns",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TableEditor",props:{headers:{defaultValue:{value:'[""]',computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},rows:{defaultValue:{value:"4",computed:!1},description:"",type:{name:"number"},required:!1},columns:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},answers:{defaultValue:{value:`new Array(defaultRows)
.fill(0)
.map(() => new Array(defaultColumns).fill(""))`,computed:!0},description:"",type:{name:"arrayOf",value:{name:"arrayOf",value:{name:"string"}}},required:!1}}};const{InfoTip:is}=ae,ls=/khanacademy\.org\/.*\/v\/(.*)$/;function ss(o){const a=ls.exec(o);return a?a[1]:o}class Ln extends g.Component{constructor(){super(...arguments);d(this,"_handleUrlChange",n=>{this.props.onChange({location:ss(n)})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsx("div",{children:e.jsxs("label",{children:["KA Video Slug:"," ",e.jsx(Se,{value:this.props.location,style:{width:290},onChange:this._handleUrlChange}),e.jsx(is,{children:"KA video URLs will be converted to just the slug."})]})})}}d(Ln,"propTypes",{location:L.string,onChange:L.func}),d(Ln,"widgetName","video"),d(Ln,"defaultProps",Ro.defaultWidgetOptions);Ln.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"_handleUrlChange",docblock:null,modifiers:[],params:[{name:"url",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"VideoEditor",props:{location:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},onChange:{description:"",type:{name:"func"},required:!1}}};const us=[Do,yn,Mo,$o,Vo,Wo,Go,Ve,bn,wn,fn,kn,Ko,Xo,Uo,Yn,Zo,ei,xn,qn,Qn,ni,Qo,Cn,Tn,Sn,An,ai,ri,ti,ii,Pn,Ln,Zn,Ra],Vs=()=>{Fo(Oo),zo(us),Eo(),_o()};export{us as A,si as I,va as J,Zn as R,Vs as r};
