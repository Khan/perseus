var Mt=Object.defineProperty;var $t=(o,a,n)=>a in o?Mt(o,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[a]=n;var d=(o,a,n)=>$t(o,typeof a!="symbol"?a+"":a,n);import{cD as Vt,cE as Wt,cF as Gt,cG as Bt,r as g,_ as z,j as e,c8 as xr,aa as j,ab as ue,ad as ie,cH as Ht,C as Ut,c6 as Kt,E as Xt,ae as ce,A as Sa,cI as Jt,n as R,o as Yt,cJ as Qt,cK as Zt,cL as eo,cM as qr,cN as no,cO as Cr,cP as ao,cQ as ro,av as k,bM as Re,x as D,w as E,bR as Tr,bQ as pe,cy as Sr,bi as rn,cw as to,cv as Aa,cR as oo,L as Ne,i as W,V as y,cS as io,cT as Ar,bG as Ae,cU as On,bV as en,aM as lo,cV as Pr,cW as so,t as nn,cX as uo,cY as mo,cZ as fe,I as Nn,bT as Zn,bH as Pa,q as po,c_ as co,c$ as ho,d0 as La,l as F,s as m,d1 as ea,aj as Ze,k as C,d2 as ja,cn as fa,U as Ce,as as se,cf as go,c4 as Lr,d3 as zn,d4 as Ia,u as K,d5 as Pe,d6 as na,aL as le,ch as tn,d7 as yo,d8 as bo,d9 as Na,aP as be,da as jr,db as Ir,dc as Nr,dd as Rr,de as Fr,df as Or,dg as zr,dh as Er,di as _r,dj as Dr,dk as Mr,dl as wo,dm as fo,dn as Q,dp as ko,dq as vo,dr as xo,ds as qo,dt as Co,du as To,dv as So,dw as Ao,aq as sa,dx as Po,dy as Je,cc as Lo,dz as jo,dA as Io,dB as No,dC as Ro,bo as Fo,bp as Oo,ci as zo,cj as Eo,ck as _o}from"./iframe-BDxKU4CJ.js";import"./item-version-r9T2CwCj.js";import"./article-renderer-DhPqGkN_.js";import"./server-item-renderer-cSbYfIXY.js";import"./hints-renderer-g8uXB3Ge.js";import{C as Do}from"./categorizer-editor-B-387Yh-.js";import{c as ae}from"./components-3wg4Cc1O.js";import{E as de}from"./editor-jsonify-B8jiuHJk.js";import{B as Se}from"./blur-input-Di4n51bc.js";import{D as Mo}from"./definition-editor-CbXy4eZM.js";import{D as $o}from"./dropdown-editor-WqlYBLC5.js";import{E as Vo}from"./explanation-editor-Bk2oScb5.js";import{E as Wo}from"./expression-editor-Ox-Hft_Q.js";import{p as He,F as Go}from"./free-response-editor-NzgVqGvl.js";import{E as Oe}from"./editor-HrfTWkUB.js";import{i as Bo}from"./icon-paths-Cfjy_uoj.js";import{G as Ho,I as Uo}from"./interaction-editor-YJztUS7H.js";import{I as Ko}from"./image-editor-CVs7hoFW.js";import{I as Xo}from"./input-number-editor-B-HmbYEt.js";import{P as Jo,d as Yo}from"./Popper-B4jhFkGh.js";import{H as on,t as $r,P as we,N as Qo}from"./numeric-input-editor-DiOb0OeV.js";import{L as Zo}from"./label-image-editor-DqB01_v6.js";import{M as ei}from"./matcher-editor-CKATO8Wr.js";import{N as ni}from"./number-line-editor-CXJBgg2H.js";import{P as ai}from"./phet-simulation-editor-BsMXg8Cz.js";import{P as ri}from"./plotter-editor-C3mSRKZQ.js";import{P as ti}from"./python-program-editor-DFAE662Z.js";import{m as oi}from"./minus-circle-bold-jRcNnagP.js";import{S as ii}from"./sorter-editor-CS3rqsmu.js";const li={chooseType:Vt,defaultPlotProps:Wt,getEquationString:Gt,typeToButton:Bt};class ka extends g.Component{constructor(a){super(a),this.state=this.getInitialState(),this.handleBlur=this.handleBlur.bind(this),this.handleChange=this.handleChange.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}getInitialState(){return{currentValue:JSON.stringify(this.props.value,null,4),valid:!0}}UNSAFE_componentWillReceiveProps(a){(!this.state.valid||!z.isEqual(a.value,JSON.parse(this.state.currentValue?this.state.currentValue:"")))&&this.setState(this.getInitialState())}handleKeyDown(a){if(a.key==="Tab"){const n=a.target.selectionStart,r=a.target.value,t=r.substring(0,n),i=r.substring(n,r.length);a.target.value=t+"    "+i,a.target.selectionStart=t.length+4,a.target.selectionEnd=t.length+4,a.preventDefault(),this.handleChange(a)}}handleChange(a){const n=a.target.value;try{let r=JSON.parse(n);z.isString(r)&&(r=JSON.parse(r)),this.setState({currentValue:n,valid:!0},function(){this.props.onChange(r)})}catch{this.setState({currentValue:n,valid:!1})}}handleBlur(a){const n=a.target.value;try{let r=JSON.parse(n);z.isString(r)&&(r=JSON.parse(r)),this.setState({currentValue:JSON.stringify(r,null,4),valid:!0},function(){this.props.onChange(r)})}catch{this.setState({currentValue:JSON.stringify(this.props.value,null,4),valid:!0})}}render(){const a="perseus-json-editor "+(this.state.valid?"valid":"invalid");return e.jsx("textarea",{className:a,value:this.state.currentValue,onChange:this.handleChange,onKeyDown:this.handleKeyDown,onBlur:this.handleBlur})}}d(ka,"displayName"),d(ka,"defaultProps",{value:{}});ka.__docgenInfo={description:"",methods:[{name:"handleKeyDown",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleBlur",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null}],props:{multiLine:{required:!0,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"{}",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newJson: any) => void",signature:{arguments:[{type:{name:"any"},name:"newJson"}],return:{name:"void"}}},description:""}}};let Ga=0;const va={},xa={};window.iframeDataStore={};window.addEventListener("message",o=>{if(typeof o.data=="string"){const a=va[o.data];a&&a()}else o.data.id&&(o.data.height!==void 0?xa[o.data.id](o.data.height):o.data.lintWarnings&&xr.log("LINTER REPORT",{lintWarnings:JSON.stringify(o.data.lintWarnings)}))});class si extends g.Component{constructor(){super(...arguments);d(this,"_frame");d(this,"container",g.createRef());d(this,"_isMounted");d(this,"_lastData");d(this,"_lastHeight");d(this,"iframeID")}componentDidMount(){this._isMounted=!0,this.iframeID=Ga,Ga++,this._prepareFrame(),va[this.iframeID]=()=>{this.sendNewData(this._lastData)},xa[this.iframeID]=n=>{this._lastHeight=n,this._isMounted&&this.props.seamless&&this.container.current&&(this.container.current.style.height=n+"px")}}shouldComponentUpdate(n){return n.datasetValue!==this.props.datasetValue||n.seamless!==this.props.seamless}componentDidUpdate(n){this.container.current&&(this.props.seamless?this.container.current.style.height=this._lastHeight+"px":this.container.current.style.height="100%"),n.datasetValue!==this.props.datasetValue&&this._prepareFrame()}componentWillUnmount(){va[this.iframeID]=null,xa[this.iframeID]=null,this._isMounted=!1}_prepareFrame(){var r,t;this._frame&&((r=this.container.current)==null||r.removeChild(this._frame));const n=document.createElement("iframe");n.style.width="100%",n.style.height="100%",n.src=this.props.url,this.props.datasetKey&&(n.dataset[this.props.datasetKey]=this.props.datasetValue),n.dataset.id=String(this.iframeID),this.props.seamless&&(n.dataset.lintGutter="true"),(t=this.container.current)==null||t.appendChild(n),this._frame=n}sendNewData(n){const r=this._frame;this._isMounted&&n&&(r!=null&&r.contentWindow)&&(this._lastData=n,window.iframeDataStore[this.iframeID]=n,r.contentWindow.postMessage(this.iframeID,"*"))}render(){return e.jsx("div",{ref:this.container,style:{width:"100%",height:"100%"}})}}si.__docgenInfo={description:"",methods:[{name:"_prepareFrame",docblock:null,modifiers:[],params:[],returns:null},{name:"sendNewData",docblock:null,modifiers:[],params:[{name:"data",optional:!1,type:{name:"any"}}],returns:null}],displayName:"IframeContentRenderer",props:{url:{required:!0,tsType:{name:"string"},description:""},datasetKey:{required:!0,tsType:{name:"string"},description:""},datasetValue:{required:!0,tsType:{name:"any"},description:""},seamless:{required:!0,tsType:{name:"boolean"},description:""}}};const{InfoTip:Ba}=ae,ui=400,di=400;var Hn;let mi=(Hn=class extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("fieldset",{className:"pair-editor",children:[e.jsxs("label",{children:["Name:"," ",e.jsx(Se,{value:this.props.name,onChange:this.change("name")})]}),e.jsxs("label",{children:[" ","Value:"," ",e.jsx(Se,{value:this.props.value,onChange:this.change("value")})]})]})}},d(Hn,"propTypes",{...ue,name:j.string,value:j.string}),d(Hn,"defaultProps",{name:"",value:""}),Hn);var wa;let pi=(wa=class extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handlePairChange",(n,r)=>{const t=this.props.pairs.slice();t[n]=r;const i=t[t.length-1];i.name&&i.value&&t.push({name:"",value:""}),this.change("pairs",t)});d(this,"serialize",()=>de.serialize.call(this))}render(){const n=z.map(this.props.pairs,(r,t)=>e.jsx(mi,{name:r.name,value:r.value,onChange:this.handlePairChange.bind(this,t)},t));return e.jsx("div",{children:n})}},d(wa,"propTypes",{...ue,pairs:j.arrayOf(j.shape({name:j.string,value:j.string})).isRequired}),wa);const ci=/khanacademy\.org\/computer-programming\/[^\/]+\/(\d+)/;function hi(o){const a=ci.exec(o);return a&&(o=a[1]),o}class bn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"_handleSettingsChange",n=>{this.change({settings:n.pairs})});d(this,"_handleProgramIDChange",n=>{n=hi(n);const{isDevServer:r,InitialRequestUrl:t}=Ut(),l=`${r?t.origin:"https://www.khanacademy.org"}/api/internal/scratchpads/${n}`;Kt.getJSON(l).done(s=>{const u=s.userAuthoredContentType;this.change({width:s.width,height:s.height,programID:n,programType:u})}).fail((s,u,p)=>{xr.error("Error retrieving scratchpad info for program ID ",Xt.TransientService,{cause:p,loggedMetadata:{textStatus:u,programID:n}}),this.change({width:ui,height:di,programID:n,programType:null})})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsxs("label",{children:["Url or Program ID:"," ",e.jsx(Se,{value:this.props.programID,onChange:this._handleProgramIDChange})]}),e.jsx("br",{}),e.jsx(ce,{label:"Show Editor",checked:this.props.showEditor,onChange:n=>{this.props.onChange({showEditor:n})}}),e.jsx(Ba,{children:'If you show the editor, you should use the "full-width" alignment to make room for the width of the editor.'}),e.jsx("br",{}),e.jsx(ce,{label:"Show Buttons",checked:this.props.showButtons,onChange:n=>{this.props.onChange({showButtons:n})}}),e.jsx("br",{}),e.jsxs("label",{children:["Settings:",e.jsx(pi,{name:"settings",pairs:this.props.settings,onChange:this._handleSettingsChange}),e.jsxs(Ba,{children:["Settings that you add here are available to the program as an object returned by ",e.jsx("code",{children:"Program.settings()"})]})]})]})}}d(bn,"propTypes",{...ue}),d(bn,"widgetName","cs-program"),d(bn,"defaultProps",Ht.defaultWidgetOptions);bn.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_handleSettingsChange",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"_handleProgramIDChange",docblock:null,modifiers:[],params:[{name:"programID",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"CSProgramEditor",props:{programID:{defaultValue:{value:'""',computed:!1},required:!1},programType:{defaultValue:{value:"null",computed:!1},required:!1},settings:{defaultValue:{value:'[{name: "", value: ""}]',computed:!1},required:!1},showEditor:{defaultValue:{value:"false",computed:!1},required:!1},showButtons:{defaultValue:{value:"false",computed:!1},required:!1},height:{defaultValue:{value:"400",computed:!1},required:!1}},composes:["@khanacademy/perseus"]};class Ra extends g.Component{serialize(){return de.serialize.call(this)}render(){return e.jsxs("div",{children:[e.jsx("p",{children:"This widget has been deprecated and removed"}),e.jsx("p",{children:"Learners will see a message and they will not be graded on this part. Please replace this widget with a supported one."})]})}}d(Ra,"widgetName","deprecated-standin");Ra.__docgenInfo={description:"",methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"any"}}}],displayName:"DeprecatedStandinEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(options: any) => void",signature:{arguments:[{type:{name:"any"},name:"options"}],return:{name:"void"}}},description:""}}};const{InlineIcon:Ha,TextInput:gi}=ae;class We extends g.Component{constructor(){super(...arguments);d(this,"editor",g.createRef());d(this,"hintEditor",g.createRef());d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleAddHint",()=>{const n={content:"",images:{},widgets:{}};this.props.onChange({hint:n},()=>{var r;(r=this.hintEditor.current)==null||r.focus()})});d(this,"handleRemoveHint",n=>{this.props.onChange({hint:null})});d(this,"getSaveWarnings",()=>{var n;return(n=this.editor.current)==null?void 0:n.getSaveWarnings()});d(this,"serialize",()=>{var n,r;return{title:this.props.title,...(n=this.editor.current)==null?void 0:n.serialize(),hint:(r=this.hintEditor.current)==null?void 0:r.serialize()}})}render(){return e.jsxs("div",{className:"perseus-group-editor",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{className:R.css(ua.title),children:["Title:"," ",e.jsx(gi,{value:this.props.title,className:R.css(ua.input),onChange:this.change("title")})]})}),e.jsx(Oe,{ref:this.editor,content:this.props.content,widgets:this.props.widgets,apiOptions:this.props.apiOptions,images:this.props.images,widgetEnabled:!0,immutableWidgets:!1,onChange:this.props.onChange,warnNoPrompt:!0,warnNoWidgets:!0}),!this.props.hint&&e.jsxs("button",{type:"button",style:{marginTop:10},className:"add-hint simple-button orange",onClick:this.handleAddHint,children:[e.jsx(Ha,{...Bo})," Add a hint"]}),this.props.hint&&e.jsxs("div",{className:"perseus-hint-editor",children:[e.jsx("div",{className:R.css(ua.hintsTitle),children:"Hint"}),e.jsx(Oe,{ref:this.hintEditor,content:this.props.hint?this.props.hint.content:"",widgets:this.props.hint?this.props.hint.widgets:{},apiOptions:this.props.apiOptions,images:this.props.hint&&this.props.hint.images,widgetEnabled:!0,immutableWidgets:!1,onChange:n=>{this.change("hint",Object.assign({},this.props.hint,n))}}),e.jsxs("button",{type:"button",className:"remove-hint simple-button orange",onClick:this.handleRemoveHint,children:[e.jsx(Ha,{...Yt})," Remove this hint"]})]})]})}}d(We,"propTypes",{...ue,title:j.string,content:j.string,widgets:j.object,images:j.object,apiOptions:Sa.propTypes}),d(We,"widgetName","graded-group"),d(We,"defaultProps",Jt.defaultWidgetOptions);const ua=R.StyleSheet.create({title:{fontSize:18,fontWeight:"bold"},input:{fontSize:18},hintsTitle:{marginTop:10,fontSize:"110%",fontWeight:"bold"}});We.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleAddHint",docblock:null,modifiers:[],params:[],returns:null},{name:"handleRemoveHint",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GradedGroupEditor",props:{title:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},images:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},hint:{defaultValue:{value:"null",computed:!1},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0}},composes:["@khanacademy/perseus"]};class wn extends g.Component{constructor(){super(...arguments);d(this,"_editors");d(this,"change",(...n)=>ie.apply(this,n));d(this,"getSaveWarnings",()=>[].concat(...this._editors.map(n=>n?n.getSaveWarnings():[])));d(this,"serialize",()=>({gradedGroups:this.props.gradedGroups}));d(this,"renderGroups",()=>this.props.gradedGroups?this.props.gradedGroups.map((n,r)=>e.jsx(We,{ref:t=>this._editors[r]=t,...n,apiOptions:this.props.apiOptions,widgetEnabled:!0,immutableWidgets:!1,onChange:t=>this.change("gradedGroups",yi(this.props.gradedGroups,r,{...this.props.gradedGroups[r],...t}))},r)):null);d(this,"addGroup",()=>{const n=this.props.gradedGroups||[];this.change("gradedGroups",n.concat([We.defaultProps]))})}UNSAFE_componentWillMount(){this._editors=[]}render(){return e.jsxs("div",{className:"perseus-group-editor",children:[this.renderGroups(),e.jsx("button",{onClick:this.addGroup,children:"Add group"})]})}}d(wn,"propTypes",{...ue,apiOptions:Sa.propTypes,gradedGroups:j.array,onChange:j.func.isRequired}),d(wn,"widgetName","graded-group-set"),d(wn,"defaultProps",Qt.defaultWidgetOptions);const yi=(o,a,n)=>[...o.slice(0,a),n,...o.slice(a+1)];wn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null},{name:"renderGroups",docblock:null,modifiers:[],params:[],returns:null},{name:"addGroup",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GradedGroupSetEditor",props:{gradedGroups:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"array"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0},onChange:{description:"",type:{name:"func"},required:!0}},composes:["@khanacademy/perseus"]};const{InfoTip:bi,MultiButtonGroup:wi}=ae,fi=Zt.widget,{chooseType:ki,defaultPlotProps:vi,getEquationString:xi,typeToButton:qi}=li;class fn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleAvailableTypesChange",n=>{let r=this.props.correct;if(!z.contains(n,this.props.correct.type)){const t=this.props.graph,i=ki(n);r=vi(i,t)}this.props.onChange({availableTypes:n,correct:r})});d(this,"serialize",()=>z.chain(this.props).pick("correct","availableTypes").extend({graph:z.omit(this.props.graph,"box")}).value())}render(){const n=Cr.SMALL;let r,t;if(this.props.graph.valid===!0){const i={apiOptions:this.props.apiOptions,containerSizeClass:n,graph:this.props.graph,userInput:this.props.correct,handleUserInput:(l,s)=>{let u=this.props.correct;u.type===(l==null?void 0:l.type)?u=z.extend({},u,l):u=l,this.props.onChange({correct:u},s)},availableTypes:this.props.availableTypes,trackInteraction:function(){}};t=e.jsx(fi,{...i}),r=xi(i.userInput)}else t=e.jsx("div",{className:"perseus-error",children:this.props.graph.valid});return e.jsxs("div",{children:[e.jsxs("div",{children:["Correct answer"," ",e.jsx(bi,{children:e.jsx("p",{children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."})})," ",": ",r]}),e.jsx(Ho,{editableSettings:["graph","snap","image"],box:qr(n),range:this.props.graph.range,labels:this.props.graph.labels,step:this.props.graph.step,gridStep:this.props.graph.gridStep,snapStep:this.props.graph.snapStep,valid:this.props.graph.valid,backgroundImage:this.props.graph.backgroundImage,markings:this.props.graph.markings,rulerLabel:this.props.graph.rulerLabel,rulerTicks:this.props.graph.rulerTicks,showTooltips:this.props.graph.showTooltips,onChange:this.change("graph")}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Available functions: "}),e.jsx(wi,{allowEmpty:!1,values:this.props.availableTypes,buttons:z.map(no,qi),onChange:this.handleAvailableTypesChange})]}),t]})}}d(fn,"propTypes",{...ue}),d(fn,"widgetName","grapher"),d(fn,"defaultProps",eo.defaultWidgetOptions);fn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleAvailableTypesChange",docblock:null,modifiers:[],params:[{name:"newAvailableTypes",optional:!1,type:{name:"Array",elements:[{name:"any"}],raw:"Array<any>",alias:"Array"}}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GrapherEditor",props:{graph:{defaultValue:{value:`{
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
}`,computed:!1},required:!1},availableTypes:{defaultValue:{value:'["linear"]',computed:!1},required:!1}},composes:["@khanacademy/perseus"]};class kn extends g.Component{constructor(){super(...arguments);d(this,"editor",g.createRef());d(this,"getSaveWarnings",()=>{var n;return(n=this.editor.current)==null?void 0:n.getSaveWarnings()});d(this,"serialize",()=>{var n;return z.extend({},(n=this.editor.current)==null?void 0:n.serialize())})}render(){return e.jsx("div",{className:"perseus-group-editor",children:e.jsx(Oe,{ref:this.editor,content:this.props.content,widgets:this.props.widgets,apiOptions:this.props.apiOptions,images:this.props.images,widgetEnabled:!0,immutableWidgets:!1,onChange:this.props.onChange})})}}d(kn,"propTypes",{content:j.string,widgets:j.object,images:j.object,apiOptions:Sa.propTypes}),d(kn,"widgetName","group"),d(kn,"defaultProps",ao.defaultWidgetOptions);kn.__docgenInfo={description:"",methods:[{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"GroupEditor",props:{content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},images:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},apiOptions:{description:"",type:{name:"shape",value:{isArticle:{name:"bool",required:!0},onFocusChange:{name:"func",required:!0},GroupMetadataEditor:{name:"func",required:!0},showAlignmentOptions:{name:"bool",required:!0},readOnly:{name:"bool",required:!0},answerableCallback:{name:"func",required:!1},getAnotherHint:{name:"func",required:!1},interactionCallback:{name:"func",required:!1},groupAnnotator:{name:"func",required:!0},imagePlaceholder:{name:"node",required:!1},widgetPlaceholder:{name:"node",required:!1},baseElements:{name:"shape",value:{Link:{name:"func",required:!1}},required:!1},imagePreloader:{name:"func",required:!1},trackInteraction:{name:"func",required:!1},customKeypad:{name:"bool",required:!1},nativeKeypadProxy:{name:"func",required:!1},isMobile:{name:"bool",required:!1},isMobileApp:{name:"bool",required:!1},setDrawingAreaAvailable:{name:"func",required:!1},hintProgressColor:{name:"string",required:!1},canScrollPage:{name:"bool",required:!1},editorChangeDelay:{name:"number",required:!1}}},required:!0}}};class qa extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("fieldset",{children:[e.jsxs("label",{children:["Name:",e.jsx(Se,{value:this.props.name,onChange:this.change("name")})]}),e.jsxs("label",{children:["Value:",e.jsx(Se,{value:this.props.value,onChange:this.change("value")})]})]})}}d(qa,"propTypes",{...ue,name:j.string,value:j.string}),d(qa,"defaultProps",{name:"",value:""});class Vr extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handlePairChange",(n,r)=>{const t=this.props.pairs.slice();t[n]=r;const i=t[t.length-1];i.name&&i.value&&t.push({name:"",value:""}),this.change("pairs",t)});d(this,"serialize",()=>de.serialize.call(this))}render(){const n=z.map(this.props.pairs,(r,t)=>e.jsx(qa,{name:r.name,value:r.value,onChange:this.handlePairChange.bind(this,t)},t));return e.jsx("div",{children:n})}}d(Vr,"propTypes",{...ue,pairs:j.arrayOf(j.shape({name:j.string,value:j.string})).isRequired});class vn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleSettingsChange",n=>{this.change({settings:n.pairs})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsxs("div",{style:{fontWeight:"bold",textAlign:"center"},children:["This widget is deprecated! ",e.jsx("br",{}),"Try using the Video or CS Program widgets instead."]}),e.jsxs("label",{children:["Url or Program ID:",e.jsx(Se,{value:this.props.url,onChange:this.change("url")})]}),e.jsx("br",{}),e.jsxs("label",{children:["Settings:",e.jsx(Vr,{name:"settings",pairs:this.props.settings,onChange:this.handleSettingsChange})]}),e.jsx("br",{}),e.jsxs("label",{children:["Width:",e.jsx(Se,{value:this.props.width,onChange:this.change("width")})]}),e.jsxs("label",{children:["Height:",e.jsx(Se,{value:this.props.height,onChange:this.change("height")})]}),e.jsx(ce,{label:"Allow full screen",checked:this.props.allowFullScreen,onChange:n=>{this.props.onChange({allowFullScreen:n})}}),e.jsx("br",{}),e.jsx(ce,{label:"Allow iframe content to redirect the page",checked:this.props.allowTopNavigation,onChange:n=>{this.props.onChange({allowTopNavigation:n})}})]})}}d(vn,"propTypes",{...ue}),d(vn,"widgetName","iframe"),d(vn,"defaultProps",ro.defaultWidgetOptions);vn.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleSettingsChange",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"IframeEditor",props:{url:{defaultValue:{value:'""',computed:!1},required:!1},settings:{defaultValue:{value:'[{name: "", value: ""}]',computed:!1},required:!1},width:{defaultValue:{value:'"400"',computed:!1},required:!1},height:{defaultValue:{value:'"400"',computed:!1},required:!1},allowFullScreen:{defaultValue:{value:"false",computed:!1},required:!1},allowTopNavigation:{defaultValue:{value:"false",computed:!1},required:!1}},composes:["@khanacademy/perseus"]};const Ci={marginBlock:k.size_080},Ti={minHeight:100},an=40,Wr=9,Gr=9,Te={clearSearch:"Clear search",filter:"Filter",noResults:"No results",someSelected:o=>o===1?"1 item":`${o} items`};var Si={listbox:{border:{radius:D.radius.radius_040},layout:{padding:{inline:k.size_0,block:k.size_040}},shadow:{default:`0 ${k.size_080} ${k.size_080} 0 ${E.core.shadow.transparent}`}},opener:{border:{width:{error:D.width.thin},radius:{rest:D.radius.radius_040}},color:{icon:E.core.foreground.neutral.default},layout:{padding:{inline:k.size_160,inlineStart:k.size_160,inlineEnd:k.size_120}}},item:{border:{radius:{default:D.radius.radius_040,press:D.radius.radius_040}},layout:{padding:{block:k.size_100,inlineStart:k.size_080,inlineEnd:k.size_160}},font:{weight:Re.weight.regular}}},X=Tr(Si,"--wb-c-dropdown-");class Rn extends g.Component{static isClassOf(a){return a&&a.type&&a.type.__IS_ACTION_ITEM__}render(){const{disabled:a,horizontalRule:n,href:r,target:t,indent:i,label:l,lang:s,leftAccessory:u,rightAccessory:p,onClick:h,role:b,style:x,subtitle1:S,subtitle2:L,testId:A,active:M}=this.props,T=[un.wrapper,x],P=typeof l=="string"?e.jsx(On,{tag:"div",lang:s,style:un.label,children:l}):g.cloneElement(l,{lang:s,style:un.label,...l.props});return e.jsx(Pr,{disabled:a,horizontalRule:n,leftAccessory:u,rightAccessory:p,style:[T,un.shared,i&&un.indent],role:b,testId:A,subtitle1:S,title:P,subtitle2:L,href:r,target:t,onClick:h,active:M})}}Rn.defaultProps={disabled:!1,horizontalRule:"none",indent:!1,role:"menuitem"};Rn.__IS_ACTION_ITEM__=!0;const un=R.StyleSheet.create({wrapper:{minHeight:an,touchAction:"manipulation",":focus":{borderRadius:X.item.border.radius.default,outline:pe.focus[":focus-visible"].outline,outlineOffset:`calc(${D.width.medium} * -1)`,boxShadow:`inset 0 0 0 calc(${D.width.medium}*2) ${E.focus.inner}`,":after":{content:"unset"}}},shared:{minHeight:an,paddingBlock:X.item.layout.padding.block},label:{fontWeight:X.item.font.weight,lineHeight:k.size_200,whiteSpace:"nowrap",userSelect:"none"},indent:{paddingInlineStart:k.size_320}}),Ai=function(o){const{selected:a,disabled:n}=o,r=n?E.core.foreground.disabled.strong:E.core.foreground.instructive.default;return e.jsx(Ae,{color:r,icon:Pa,size:"small",style:[Ua.bounds,!a&&Ua.hide]})},Ua=R.StyleSheet.create({bounds:{alignSelf:"center",height:k.size_160,minHeight:k.size_160,minWidth:k.size_160},hide:{visibility:"hidden"}}),Pi=function(o){const{disabled:a,selected:n}=o;return e.jsx(y,{className:"checkbox",style:[Dn.checkbox,n&&!a&&Dn.selected,a&&Dn.disabledCheckbox],children:n&&e.jsx(Ae,{icon:Pa,size:"small",className:"check",style:[{width:k.size_120,height:k.size_120,margin:k.size_020},a&&n&&Dn.disabledCheckFormatting]})})},Ye={color:{default:{border:E.input.default.border,background:E.input.default.background},disabled:{border:E.input.disabled.border,background:E.input.disabled.background},selected:{background:E.input.checked.background,foreground:E.input.checked.foreground}}},Dn=R.StyleSheet.create({checkbox:{alignSelf:"center",minHeight:k.size_160,minWidth:k.size_160,height:k.size_160,background:Ye.color.default.background,borderRadius:3,borderWidth:D.width.thin,borderStyle:"solid",borderColor:Ye.color.default.border},selected:{borderWidth:0,background:Ye.color.selected.background,color:Ye.color.selected.foreground},disabledCheckbox:{borderColor:Ye.color.disabled.border,backgroundColor:Ye.color.disabled.background},disabledCheckFormatting:{position:"absolute",top:-1,left:-1}});class _ extends g.Component{static isClassOf(a){return a&&a.type&&a.type.__IS_OPTION_ITEM__}getCheckComponent(){return this.props.variant==="check"?Ai:Pi}render(){const{disabled:a,focused:n,label:r,selected:t,testId:i,leftAccessory:l,horizontalRule:s,parentComponent:u,rightAccessory:p,style:h,subtitle1:b,subtitle2:x,value:S,onClick:L,onToggle:A,variant:M,role:T,...P}=this.props,w=this.getCheckComponent(),c=[dn.optionItem,h],v=[dn.listboxOptionItem,n&&dn.listboxOptionItemFocused],I=[dn.selectOptionItem];return e.jsx(Pr,{disabled:a,horizontalRule:s,style:[c,u==="listbox"?v:I],"aria-selected":t?"true":"false",role:T,testId:i,leftAccessory:e.jsx(e.Fragment,{children:l?e.jsxs(y,{style:{flexDirection:"row",gap:k.size_080},children:[e.jsx(w,{disabled:a,selected:t}),l]}):e.jsx(w,{disabled:a,selected:t})}),rightAccessory:p,subtitle1:b,title:e.jsx(On,{tag:"div",style:dn.label,children:r}),subtitle2:x,onClick:this.handleClick,tabIndex:u==="listbox"?-1:void 0,...P})}constructor(...a){super(...a),this.handleClick=()=>{const{onClick:n,onToggle:r,value:t}=this.props;r(t),n&&n()}}}_.defaultProps={disabled:!1,focused:!1,horizontalRule:"none",onToggle:()=>{},role:"option",selected:!1};_.__IS_OPTION_ITEM__=!0;const da={borderRadius:X.item.border.radius.default,outline:pe.focus[":focus-visible"].outline,outlineOffset:`calc(${D.width.medium} * -1)`,boxShadow:`inset 0 0 0 calc(${D.width.medium}*2) ${E.focus.inner}`},Ka={outline:"none",boxShadow:"none"},dn=R.StyleSheet.create({optionItem:{paddingBlock:X.item.layout.padding.block,paddingInlineStart:X.item.layout.padding.inlineStart,paddingInlineEnd:X.item.layout.padding.inlineEnd,whiteSpace:"nowrap",minHeight:k.size_400,":active":{borderRadius:X.item.border.radius.press},":is([aria-disabled=true])":{":focus":Ka}},listboxOptionItem:{":focus-visible":Ka},listboxOptionItemFocused:{...da,":focus-visible":da},selectOptionItem:{":focus":da},label:{fontWeight:X.item.font.weight,lineHeight:k.size_200,whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},hide:{visibility:"hidden"}});class Ge extends g.Component{static isClassOf(a){return a&&a.type&&a.type.__IS_SEPARATOR_ITEM__}render(){return e.jsx(y,{style:[Li.separator,this.props.style],"aria-hidden":"true"})}}Ge.__IS_SEPARATOR_ITEM__=!0;const Li=R.StyleSheet.create({separator:{borderTop:`${D.width.thin} solid ${E.core.border.neutral.subtle}`,height:1,minHeight:1,marginBlock:k.size_040}});class Fa extends g.Component{renderAnchorChildren(a,n){const{disabled:r,testId:t,text:i,opened:l,"aria-controls":s,"aria-haspopup":u,"aria-required":p,id:h,role:b,onBlur:x}=this.props,S=this.props.children({...a,text:i,opened:l}),L=S.props,A=this.getTestIdFromProps(L),M=L["aria-label"]??this.props["aria-label"];return g.cloneElement(S,{...n,"aria-label":M??void 0,"aria-invalid":this.props.error,disabled:r,"aria-controls":s,role:b,id:h,"aria-expanded":l?"true":"false","aria-haspopup":u,"aria-required":p,onClick:L.onClick?T=>{L.onClick(T),n.onClick(T)}:n.onClick,"data-testid":A||t,onBlur:x})}render(){return e.jsx(so,{onClick:this.props.onClick,disabled:this.props.disabled,tabIndex:0,children:(a,n)=>this.renderAnchorChildren(a,n)})}constructor(...a){super(...a),this.getTestIdFromProps=n=>n.testId||n["data-testid"]}}Fa.defaultProps={disabled:!1};class ji extends g.Component{render(){const{data:a,index:n,style:r}=this.props,t=a[n];if(Ge.isClassOf(t.component))return g.cloneElement(t.component,{style:r});{const{component:i,populatedProps:l,onClick:s,role:u,ref:p}=t;return g.cloneElement(i,{style:r,...l,key:n,onClick:s,ref:t.focusable&&p,role:u})}}}function Xa(o,a=0){return o.slice(0,Wr).reduce((n,r)=>Ge.isClassOf(r.component)?n+Gr:n+an,a)}class Ii extends g.Component{componentDidMount(){const{schedule:a}=this.props;a.animationFrame(()=>{this.setWidth()})}componentDidUpdate(a){const{data:n,listRef:r}=this.props;a.data.length!==n.length&&(this.setHeight(),r&&r.current&&r.current.resetAfterIndex(1))}setWidth(){const a=nn.findDOMNode(this),n=a==null?void 0:a.parentElement;if(n){const r=n.getBoundingClientRect().width;this.setState({width:r})}}setHeight(){const a=Xa(this.props.data);this.setState({height:a})}renderInitialItems(){const{data:a}=this.props,n=a.map(t=>t.component);return g.Children.toArray(n).filter(Boolean).sort((t,i)=>i.props.label&&t.props.label?i.props.label.length-t.props.label.length:-1).slice(0,Wr).map(t=>g.cloneElement(t,{style:{visibility:"hidden"}}))}renderVirtualizedList(a,n){const{data:r,listRef:t}=this.props;return e.jsx(uo,{height:n,itemCount:r.length,itemSize:this.getItemSize,itemData:r,style:{overflowX:"hidden"},width:a,overscanCount:5,ref:t,children:ji})}render(){const{width:a,height:n}=this.state;return a==null?this.renderInitialItems():this.renderVirtualizedList(a,n)}constructor(a){super(a),this.getItemSize=n=>{const r=this.props.data[n];return Ge.isClassOf(r.component)?Gr:an},this.state={height:Xa(a.data),width:a.width}}}var Ni=Sr(Ii);function Ri({state:o,options:a}){const n=Yo(o,a),{y:r}=o.modifiersData.preventOverflow||{y:0},{height:t}=o.rects.popper,[i]=o.placement.split("-"),s=t-n[i==="top"?"top":"bottom"]-r;o.styles.popper={...o.styles.popper,maxHeight:`${s}px`,"--popper-max-height":`${s}px`}}const Fi={name:"maxHeight",enabled:!0,phase:"main",options:{padding:an},requiresIfExists:["offset","preventOverflow","flip"],fn:Ri},Oi=[{name:"preventOverflow",options:{rootBoundary:"viewport",altAxis:!0,tether:!1}},Fi],zi=function({children:o,alignment:a="left",onPopperElement:n,referenceElement:r}){const t=po(r)||document.querySelector("body");return t?nn.createPortal(e.jsx(Jo,{innerRef:i=>{i&&n&&n(i)},referenceElement:r,strategy:"fixed",placement:a==="left"?"bottom-start":"bottom-end",modifiers:Oi,children:({placement:i,ref:l,style:s,hasPopperEscaped:u,isReferenceHidden:p})=>{const h=!!(u||p);return e.jsx("div",{ref:l,style:s,"data-testid":"dropdown-popper","data-placement":i,children:o(h)})}}),t):null};function Ei(o){return o.length===1||!/^[A-Z]/i.test(o)?o:""}function _i(o,a){let n;return function(...t){const i=()=>{clearTimeout(n),o(...t)};clearTimeout(n),n=setTimeout(i,a)}}function Ja(o){return typeof o=="string"}function Un(o){return Ja(o.label)?o.label:Ja(o.labelAsText)?o.labelAsText:""}function Di(o,a){return o?Un(a):a.label}const Mi=125;class aa extends g.Component{static sameItemsFocusable(a,n){if(a.length!==n.length)return!1;for(let r=0;r<a.length;r++)if(a[r].focusable!==n[r].focusable)return!1;return!0}static getDerivedStateFromProps(a,n){if(n.itemRefs.length===0&&a.open||!aa.sameItemsFocusable(n.prevItems,a.items)){const r=[];for(let t=0;t<a.items.length;t++)if(a.items[t].focusable){const i=g.createRef();r.push({ref:i,originalIndex:t})}return{itemRefs:r,prevItems:a.items,sameItemsFocusable:!1}}else return{prevItems:a.items,sameItemsFocusable:!0}}componentDidMount(){this.updateEventListeners(),this.maybeFocusInitialItem()}componentDidUpdate(a){const{open:n,searchText:r}=this.props;if(a.open!==n)this.updateEventListeners(),this.maybeFocusInitialItem();else if(n){const{itemRefs:t,sameItemsFocusable:i}=this.state;if(i||a.searchText!==r)return;{const l=t.findIndex(s=>s.originalIndex===this.focusedOriginalIndex);l===-1?(this.focusedIndex=0,this.itemsClicked=!1,this.scheduleToFocusCurrentItem()):this.focusedIndex=l}this.props.labels!==a.labels&&this.setState({labels:{...this.state.labels,...this.props.labels}})}}componentWillUnmount(){this.removeEventListeners()}resetFocusedIndex(){const{initialFocusedIndex:a}=this.props;if(typeof a<"u")this.focusedIndex=a;else{if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=0}}maybeFocusInitialItem(){const{autoFocus:a,open:n}=this.props;a&&(n?(this.resetFocusedIndex(),this.scheduleToFocusCurrentItem()):n||(this.itemsClicked=!1))}updateEventListeners(){this.props.open?this.addEventListeners():this.removeEventListeners()}addEventListeners(){document.addEventListener("mouseup",this.handleInteract),document.addEventListener("touchend",this.handleInteract)}removeEventListeners(){document.removeEventListener("mouseup",this.handleInteract),document.removeEventListener("touchend",this.handleInteract)}scheduleToFocusCurrentItem(a){this.shouldVirtualizeList()?this.props.schedule.animationFrame(()=>{this.focusCurrentItem(a)}):this.focusCurrentItem(a)}focusCurrentItem(a){const n=this.state.itemRefs[this.focusedIndex];if(!n)return;const{current:r}=this.virtualizedListRef;r&&r.scrollToItem(n.originalIndex);const t=()=>{if(!this.props.open)return;const i=this.state.itemRefs[this.focusedIndex],l=nn.findDOMNode(i.ref.current);if(!l&&this.shouldVirtualizeList()){this.props.schedule.animationFrame(t);return}l&&(l.focus(),this.focusedOriginalIndex=i.originalIndex,a&&a(l))};this.shouldVirtualizeList()?this.props.schedule.animationFrame(t):t()}focusSearchField(){this.searchFieldRef.current&&this.searchFieldRef.current.focus()}hasSearchField(){return!!this.props.isFilterable}isSearchFieldFocused(){return this.hasSearchField()&&document.activeElement===this.searchFieldRef.current}focusPreviousItem(){if(this.focusedIndex===0||this.isSearchFieldFocused()&&!this.props.enableTypeAhead){if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=this.state.itemRefs.length-1}else this.isSearchFieldFocused()||(this.focusedIndex-=1);this.scheduleToFocusCurrentItem()}focusNextItem(){if(this.focusedIndex===this.state.itemRefs.length-1||this.isSearchFieldFocused()&&!this.props.enableTypeAhead){if(this.hasSearchField()&&!this.isSearchFieldFocused())return this.focusSearchField();this.focusedIndex=0}else this.isSearchFieldFocused()||(this.focusedIndex+=1);this.scheduleToFocusCurrentItem()}restoreTabOrder(){this.props.openerElement&&this.props.openerElement.focus()}getItemRole(){const{role:a}=this.props;switch(a){case"listbox":return"option";case"menu":return"menuitem";default:throw new Error(`Expected "listbox" or "menu" for role, but receieved "${a}" instead.`)}}maybeRenderNoResults(){const{items:a,labels:{noResults:n}}=this.props;return a.length===0?e.jsx(On,{style:Qe.noResult,testId:"dropdown-core-no-results",children:n}):null}shouldVirtualizeList(){return this.props.items.length>Mi}renderList(){let a=0;const n=this.getItemRole();return this.props.items.map((r,t)=>{if(Ge.isClassOf(r.component))return r.component;const{component:i,focusable:l,populatedProps:s}=r;l&&(a+=1);const u=a-1,p=this.state.itemRefs[u]?this.state.itemRefs[u].ref:null;return g.cloneElement(i,{...s,key:t,onClick:()=>{this.handleItemClick(u,r)},ref:l?p:null,role:s.role||n})})}parseVirtualizedItems(){let a=0;const n=this.getItemRole();return this.props.items.map((r,t)=>{const{populatedProps:i}=r;!Ge.isClassOf(r.component)&&r.focusable&&(a+=1);const l=a-1;return{...r,role:i.role||n,ref:r.focusable&&this.state.itemRefs[l]?this.state.itemRefs[l].ref:null,onClick:()=>{this.handleItemClick(l,r)}}})}renderVirtualizedList(){const a=this.parseVirtualizedItems();return e.jsx(Ni,{data:a,listRef:this.virtualizedListRef})}renderSearchField(){const{searchText:a}=this.props,{labels:n}=this.state;return e.jsx(mo,{clearAriaLabel:n.clearSearch,onChange:this.handleSearchTextChanged,placeholder:n.filter,ref:this.searchFieldRef,style:Qe.searchInputStyle,value:a||""})}renderDropdownMenu(a,n){const{"aria-invalid":r,"aria-required":t,dropdownStyle:i,isFilterable:l,openerElement:s,role:u,id:p}=this.props,h=s&&window.getComputedStyle(s),b=h?h.getPropertyValue("width"):0;return e.jsxs(y,{onMouseUp:this.handleDropdownMouseUp,style:[Qe.dropdown,n&&Qe.hidden,i],testId:"dropdown-core-container",children:[l&&this.renderSearchField(),e.jsx(y,{id:p,role:u,style:[Qe.listboxOrMenu,{minWidth:b}],"aria-invalid":u==="listbox"?r:void 0,"aria-required":u==="listbox"?t:void 0,children:a}),this.maybeRenderNoResults()]})}renderDropdown(){const{alignment:a,openerElement:n}=this.props,r=this.shouldVirtualizeList()?this.renderVirtualizedList():this.renderList();return e.jsx(zi,{alignment:a,onPopperElement:t=>{this.popperElement=t},referenceElement:n,children:t=>this.renderDropdownMenu(r,t)})}render(){const{open:a,opener:n,style:r,className:t,disabled:i}=this.props;return e.jsxs(y,{onKeyDown:i?void 0:this.handleKeyDown,onKeyUp:i?void 0:this.handleKeyUp,style:[Qe.menuWrapper,r],className:t,children:[n,a&&this.renderDropdown()]})}constructor(a){super(a),this.focusedIndex=-1,this.focusedOriginalIndex=-1,this.itemsClicked=!1,this.searchFieldRef=g.createRef(),this.handleInteract=n=>{const{open:r,onOpenChanged:t}=this.props,i=n.target,l=nn.findDOMNode(this);r&&l&&!l.contains(i)&&this.popperElement&&!this.popperElement.contains(i)&&t(!1)},this.handleKeyDown=n=>{const{enableTypeAhead:r,onOpenChanged:t,open:i,searchText:l}=this.props,s=n.key;if(r&&Ei(s)&&(n.stopPropagation(),this.textSuggestion+=s,this.handleKeyDownDebounced(this.textSuggestion)),!i){if(s===fe.down){n.preventDefault(),t(!0);return}return}switch(s){case fe.tab:if(this.isSearchFieldFocused()&&l)return;this.restoreTabOrder(),t(!1);return;case fe.space:if(this.isSearchFieldFocused())return;n.preventDefault();return;case fe.up:n.preventDefault(),this.focusPreviousItem();return;case fe.down:n.preventDefault(),this.focusNextItem();return}},this.handleKeyUp=n=>{const{onOpenChanged:r,open:t}=this.props;switch(n.key){case fe.space:if(this.isSearchFieldFocused())return;n.preventDefault();return;case fe.escape:t&&(n.stopPropagation(),this.restoreTabOrder(),r(!1));return}},this.handleKeyDownDebounceResult=n=>{const r=this.props.items.filter(t=>t.focusable).findIndex(({component:t})=>{if(Ge.isClassOf(t))return!1;if(_.isClassOf(t)){const i=t.props;return Un(i).toLowerCase().startsWith(n.toLowerCase())}return!1});if(r>=0){const t=!this.props.open;t&&this.props.onOpenChanged(!0),this.focusedIndex=r,this.scheduleToFocusCurrentItem(i=>{this.props.selectionType==="single"&&t&&i&&(i.click(),this.props.onOpenChanged(!1))})}this.textSuggestion=""},this.handleClickFocus=n=>{this.itemsClicked=!0,this.focusedIndex=n,this.focusedOriginalIndex=this.state.itemRefs[this.focusedIndex].originalIndex},this.handleDropdownMouseUp=n=>{n.nativeEvent.stopImmediatePropagation?n.nativeEvent.stopImmediatePropagation():n.stopPropagation()},this.handleItemClick=(n,r)=>{this.handleClickFocus(n),r.component.props.onClick&&r.component.props.onClick(),r.populatedProps.onClick&&r.populatedProps.onClick()},this.handleSearchTextChanged=n=>{const{onSearchTextChanged:r}=this.props;r&&r(n)},this.resetFocusedIndex(),this.state={prevItems:this.props.items,itemRefs:[],sameItemsFocusable:!1,labels:{noResults:Te.noResults,someResults:Te.someSelected,...a.labels}},this.virtualizedListRef=g.createRef(),this.handleKeyDownDebounced=_i(this.handleKeyDownDebounceResult,500),this.textSuggestion=""}}aa.defaultProps={alignment:"left",autoFocus:!0,enableTypeAhead:!0,labels:{clearSearch:Te.clearSearch,filter:Te.filter,noResults:Te.noResults,someResults:Te.someSelected},selectionType:"single"};const Qe=R.StyleSheet.create({menuWrapper:{width:"fit-content"},dropdown:{backgroundColor:E.surface.primary,borderRadius:X.listbox.border.radius,paddingBlock:X.listbox.layout.padding.block,paddingInline:X.listbox.layout.padding.inline,border:`solid ${D.width.thin} ${E.core.border.neutral.subtle}`,boxShadow:X.listbox.shadow.default,maxHeight:"var(--popper-max-height)"},listboxOrMenu:{overflowY:"auto"},hidden:{pointerEvents:"none",visibility:"hidden"},noResult:{color:E.core.foreground.neutral.default,alignSelf:"center",marginBlockStart:k.size_060},searchInputStyle:{margin:k.size_080,marginBlockStart:k.size_040,minHeight:"auto",position:"sticky"},srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}});var Br=Sr(aa);const $i=k.size_040,Vi={root:{border:{width:{primary:{default:D.width.none,hover:D.width.medium,press:D.width.medium},secondary:{default:D.width.thin,hover:D.width.thin,press:D.width.thin},tertiary:{default:D.width.none,hover:D.width.none,press:D.width.none}},offset:{primary:D.width.medium,secondary:0,tertiary:0},radius:{default:D.radius.radius_040,hover:D.radius.radius_040,press:D.radius.radius_040}},sizing:{height:{small:k.size_320,medium:k.size_400,large:k.size_560},underline:{hover:k.size_020,press:k.size_010}},layout:{padding:{inline:{primary:{small:k.size_160,medium:k.size_160,large:k.size_320},secondary:{small:k.size_120,medium:k.size_160,large:k.size_180},tertiary:{small:k.size_0,medium:k.size_0,large:k.size_0}}}},font:{size:{large:"1.8rem"},lineHeight:{small:Re.lineHeight.xMedium,default:Re.lineHeight.large,large:"2.6rem"},weight:{default:Re.weight.bold},decoration:{hover:"underline",press:"underline"},offset:{default:$i}}},icon:{margin:{inline:{inner:k.size_060,outer:`calc(-1 * ${D.width.medium})`}},padding:k.size_020,sizing:{small:k.size_160,medium:k.size_240,large:k.size_240}}};var B=Tr(Vi,"--wb-c-button-");function Ya({icon:o,size:a,style:n,testId:r}){const t={width:B.icon.sizing[a],height:B.icon.sizing[a]},i={"aria-hidden":!0,color:"currentColor",style:[n,t],testId:r};switch(a){case"small":return e.jsx(Ae,{...i,size:"small",icon:o});case"medium":default:return e.jsx(Ae,{...i,size:"medium",icon:o})}}const Wi=rn("a"),Gi=rn("button"),Bi=rn(to),Hr=g.forwardRef(function(a,n){const{children:r,disabled:t,href:i,id:l,skipClientNav:s,style:u,testId:p,type:h,...b}=a,x={"data-testid":p,id:l,role:"button",style:[Hi.reset,u],...b},S=Aa();return i&&!t?S&&!s&&oo(i)?e.jsx(Bi,{...x,to:i,ref:n,children:r}):e.jsx(Wi,{...x,href:i,ref:n,children:r}):e.jsx(Gi,{type:h||"button",...x,"aria-disabled":t,ref:n,children:r})}),Hi=R.StyleSheet.create({reset:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",margin:0,padding:0,border:"none",cursor:"pointer",outline:"none",textDecoration:"none",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",":focus":{WebkitTapHighlightColor:"rgba(0,0,0,0)"}}}),Ui=g.forwardRef(function(a,n){const{children:r,skipClientNav:t,actionType:i,disabled:l,focused:s,hovered:u,href:p=void 0,kind:h="primary",labelStyle:b,pressed:x,size:S="medium",style:L,testId:A,type:M=void 0,spinner:T,startIcon:P,endIcon:w,id:c,waiting:v,...I}=a,f=Ki(i,h,S),q=T||l,N=[re.shared,P&&re.withStartIcon,w&&re.withEndIcon,f.default,q&&f.disabled,!q&&(x?f.pressed:s&&f.focused),S==="small"&&re.small,S==="large"&&re.large],U=S==="small"?Ne:W,ee=e.jsx(U,{style:[re.text,S==="small"&&re.smallText,S==="large"&&re.largeText,b,T&&re.hiddenText,h==="tertiary"&&!q&&(x?[f.hover,f.active]:u&&f.hover)],testId:A?`${A}-inner-label`:void 0,children:r}),O={medium:"small",small:"xsmall",large:"medium"},$=S==="small"?"small":"medium",V=e.jsxs(g.Fragment,{children:[P&&e.jsx(y,{style:re.iconWrapper,children:e.jsx(Ya,{size:$,icon:P,style:[re.startIcon,h==="tertiary"&&re.tertiaryStartIcon],testId:A?`${A}-start-icon`:void 0})}),ee,T&&e.jsx(io,{style:re.spinner,size:O[S],light:h==="primary",testId:`${A||"button"}-spinner`}),w&&e.jsx(y,{testId:A?`${A}-end-icon-wrapper`:void 0,style:[yn.endIcon,re.iconWrapper,re.endIconWrapper,h==="tertiary"&&re.endIconWrapperTertiary],children:e.jsx(Ya,{size:$,icon:w,testId:A?`${A}-end-icon`:void 0})})]});return e.jsx(Hr,{...I,disabled:q,href:p,id:c,ref:n,skipClientNav:t,style:[N,L],testId:A,tabIndex:a.tabIndex,type:M,children:V})}),re=R.StyleSheet.create({shared:{height:B.root.sizing.height.medium,paddingBlock:0},small:{height:B.root.sizing.height.small},large:{height:B.root.sizing.height.large},text:{alignItems:"center",fontWeight:B.root.font.weight.default,whiteSpace:"nowrap",overflow:"hidden",lineHeight:B.root.font.lineHeight.default,textOverflow:"ellipsis",display:"inline-block",pointerEvents:"none"},smallText:{lineHeight:B.root.font.lineHeight.small},largeText:{fontSize:B.root.font.size.large,lineHeight:B.root.font.lineHeight.large},hiddenText:{visibility:"hidden"},spinner:{position:"absolute"},startIcon:{marginInlineStart:B.icon.margin.inline.outer,marginInlineEnd:B.icon.margin.inline.inner},tertiaryStartIcon:{marginInlineStart:0},endIcon:{marginInlineStart:B.icon.margin.inline.inner},iconWrapper:{padding:B.icon.padding,minWidth:"auto"},endIconWrapper:{marginInlineStart:B.icon.margin.inline.inner,marginInlineEnd:B.icon.margin.inline.outer},endIconWrapperTertiary:{marginInlineEnd:0}}),yn={},Ki=(o="progressive",a,n)=>{const r=`${o}-${a}-${n}`;if(yn[r])return yn[r];const t=B.root.layout.padding.inline[a][n],i=B.root.border.width[a],l=B.root.border.offset[a],s=E.action[a][o],u=E.action[a].disabled,p={borderColor:u.border,borderWidth:i.default,borderRadius:B.root.border.radius.default,background:u.background,color:u.foreground},h={...p,outline:"none",boxShadow:"none",textDecoration:"none",textDecorationThickness:"unset",textUnderlineOffset:"unset"},b={background:s.press.background,borderRadius:B.root.border.radius.press,color:s.press.foreground,...a==="primary"?{outline:`${i.press} solid ${s.press.border}`,outlineOffset:l}:void 0,...a!=="primary"?{borderColor:s.press.border,boxShadow:`inset 0 0 0 ${i.press} ${s.press.border}`}:void 0,...a==="tertiary"?{textUnderlineOffset:B.root.font.offset.default,textDecoration:`${B.root.font.decoration.press} ${B.root.sizing.underline.press}`}:void 0},x={default:{borderRadius:B.root.border.radius.default,paddingInline:t,borderStyle:"solid",borderWidth:i.default,borderColor:s.default.border,background:s.default.background,color:s.default.foreground,transition:"border-radius 0.1s ease-in-out",":hover":{background:s.hover.background,borderRadius:B.root.border.radius.hover,color:s.hover.foreground,...a==="primary"?{outline:`${i.hover} solid ${s.hover.border}`,outlineOffset:l}:void 0,...a!=="primary"?{borderColor:s.hover.border,boxShadow:`inset 0 0 0 ${i.hover} ${s.hover.border}`}:void 0,...a==="tertiary"?{textUnderlineOffset:B.root.font.offset.default,textDecoration:`${B.root.font.decoration.hover} ${B.root.sizing.underline.hover}`}:void 0},"@media not (hover: hover)":{":hover":{backgroundColor:"transparent"}},":active":b,...pe.focus,...a==="secondary"?{":focus-visible:hover":{...pe.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${i.hover} ${s.hover.border}, ${pe.focus[":focus-visible"].boxShadow}`},":focus-visible:active":{...pe.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${i.press} ${s.press.border}, ${pe.focus[":focus-visible"].boxShadow}`}}:{}},pressed:b,disabled:{cursor:"not-allowed",...p,":hover":h,":active":h,":focus-visible":p}};return yn[r]=R.StyleSheet.create(x),yn[r]},Xi=g.forwardRef(function(a,n){const{href:r=void 0,type:t=void 0,children:i,skipClientNav:l,onClick:s,beforeNav:u=void 0,safeWithNav:p=void 0,tabIndex:h,target:b,rel:x,actionType:S="progressive",kind:L="primary",size:A="medium",disabled:M=!1,spinner:T=!1,...P}=a,w=Aa(),c=Ar(r,l,w),v=u?{beforeNav:u}:{target:b};return e.jsx(c,{disabled:T||M,href:r,role:"button",type:t,onClick:s,safeWithNav:p,rel:x,...v,children:(I,f)=>e.jsx(Ui,{...P,...I,...f,disabled:M,spinner:T||I.waiting,actionType:S,kind:L,size:A,skipClientNav:l,href:r,target:b,type:t,tabIndex:h,ref:n,children:i})})}),Ji=g.forwardRef(function(a,n){const{children:r,disabled:t=!1,kind:i="primary",focused:l,pressed:s,styles:u,type:p=void 0,startIcon:h,endIcon:b,hovered:x,waiting:S,...L}=a,A=Yi("progressive",t,i),M=[A.button,t&&A.disabled,!t&&s&&A.pressed,!t&&!s&&l&&A.focused,u==null?void 0:u.root],T=[A.chonky,t&&A.chonkyDisabled,!t&&s&&A.chonkyPressed,u==null?void 0:u.box];return e.jsx(Hr,{...L,disabled:t,ref:n,style:M,type:p,children:e.jsx(e.Fragment,{children:e.jsxs(y,{style:T,className:"chonky",children:[h&&e.jsx(Ae,{size:"medium",color:"currentColor",icon:h,style:[ma.icon,u==null?void 0:u.startIcon],"aria-hidden":"true"}),e.jsx(On,{tag:"span",size:"medium",weight:"semi",style:[ma.label,u==null?void 0:u.label],children:r}),b&&e.jsx(Ae,{size:"medium",color:"currentColor",icon:b,style:[ma.icon,u==null?void 0:u.endIcon],"aria-hidden":"true"})]})})})});g.forwardRef(function(a,n){const{href:r=void 0,type:t=void 0,children:i,skipClientNav:l,onClick:s,beforeNav:u=void 0,safeWithNav:p=void 0,tabIndex:h,target:b,rel:x,kind:S="primary",disabled:L=!1,...A}=a,M=Aa(),T=Ar(r,l,M),P=u?{beforeNav:u}:{target:b};return e.jsx(T,{disabled:L,href:r,role:r?"link":"button",type:t,onClick:s,safeWithNav:p,rel:x,...P,children:(w,c)=>e.jsx(Ji,{...A,...w,...c,disabled:L,kind:S,skipClientNav:l,href:r,target:b,type:t,tabIndex:h,ref:n,children:i})})});const Z={root:{border:{width:{primary:{rest:D.width.thin,hover:D.width.thin,press:D.width.thin},secondary:{rest:D.width.thin,hover:D.width.thin,press:D.width.thin},tertiary:{rest:D.width.thin,hover:D.width.thin,press:D.width.thin}},radius:D.radius.radius_120},layout:{padding:{block:k.size_140,inline:k.size_480}},shadow:{y:{rest:"6px",hover:"8px",press:k.size_0}}},label:{color:{progressive:E.core.foreground.instructive.default,neutral:E.core.foreground.neutral.default,disabled:E.core.foreground.disabled.default},font:{lineHeight:k.size_140},layout:{padding:{blockStart:k.size_040,blockEnd:k.size_060},width:k.size_640}},icon:{sizing:{height:k.size_200,width:k.size_200}}},ma={icon:{alignSelf:"center",width:Z.icon.sizing.width,height:Z.icon.sizing.height},label:{lineHeight:Z.label.font.lineHeight,paddingBlockStart:Z.label.layout.padding.blockStart,paddingBlockEnd:Z.label.layout.padding.blockEnd}},Mn={},Yi=(o="progressive",a,n)=>{const r=`${o}-d_${a}-${n}`;if(Mn[r])return Mn[r];const t=Z.root.border.width[n],i=E.chonky[o],l=E.chonky.disabled,s={outline:"none",transform:"none"},u={background:l.background[n],borderWidth:t.rest,borderColor:l.border[n],color:l.foreground[n],boxShadow:`0 ${Z.root.shadow.y.rest} 0 0 ${l.shadow[n]}`,transform:"none"},p={background:i.background[n].press,border:`${t.press} solid ${i.border[n].press}`,boxShadow:`0 ${Z.root.shadow.y.press} 0 0 ${i.shadow[n].press}`,color:i.foreground[n].press,transform:`translateY(${Z.root.shadow.y.rest})`},h={button:{background:"transparent",borderRadius:Z.root.border.radius,color:Z.label.color[o],height:"auto",flexDirection:"column",gap:k.size_020,alignSelf:"flex-start",justifySelf:"center",":is(:hover) .chonky":{background:i.background[n].hover,border:`${t.hover} solid ${i.border[n].hover}`,boxShadow:`0 ${Z.root.shadow.y.hover} 0 0 ${i.shadow[n].hover}`,color:i.foreground[n].hover,transform:`translateY(calc((${Z.root.shadow.y.hover} - ${Z.root.shadow.y.rest}) * -1))`},":is(:active) .chonky":p,...pe.focus},focused:pe.focus[":focus-visible"],disabled:{cursor:"not-allowed",color:Z.label.color.disabled,...s,":hover":s,":active":s,":focus-visible":{transform:"none"},":is(:hover) .chonky":s,":is(:hover) .chonky":u,":is(:active) .chonky":u},pressed:{".chonky":p},chonky:{flexDirection:"row",gap:k.size_080,borderRadius:Z.root.border.radius,marginBlockEnd:Z.root.shadow.y.rest,maxWidth:"100%",paddingBlock:Z.root.layout.padding.block,paddingInline:Z.root.layout.padding.inline,background:i.background[n].rest,border:`${t.rest} solid ${i.border[n].rest}`,color:i.foreground[n].rest,boxShadow:`0 ${Z.root.shadow.y.rest} 0 0 ${i.shadow[n].rest}`,transition:"all 0.12s ease-out","@media not (hover: hover)":{transition:"none"}},chonkyPressed:p,chonkyDisabled:u};return Mn[r]=R.StyleSheet.create(h),Mn[r]};class Qi extends g.Component{render(){const{children:a,disabled:n,waiting:r,testId:t,opened:i,"aria-label":l,...s}=this.props;return e.jsx(Xi,{"aria-expanded":i?"true":"false","aria-haspopup":"menu",kind:"tertiary","aria-label":l,disabled:n,...s,testId:t,endIcon:Zn,children:a})}}class Ur extends g.Component{static getDerivedStateFromProps(a,n){return{opened:typeof a.opened=="boolean"?a.opened:n.opened}}getMenuItems(){const{children:a,selectedValues:n}=this.props,r=g.Children.toArray(a).filter(Boolean),t=r.some(i=>_.isClassOf(i));return r.map(i=>{const{value:l,disabled:s}=i.props,u={component:i,focusable:Rn.isClassOf(i)||_.isClassOf(i)?!s:!1,populatedProps:{}};if(Rn.isClassOf(i))return{...u,populatedProps:{indent:t,onClick:this.handleItemSelected}};if(_.isClassOf(i)){const p=n?n.includes(l):!1;return{...u,populatedProps:{onToggle:this.handleOptionSelected,selected:p,variant:"check",role:"menuitemcheckbox","aria-checked":p,"aria-selected":void 0}}}else return u})}renderOpener(a,n){const{disabled:r,menuText:t,opener:i,testId:l,id:s}=this.props;return e.jsx(Nn,{id:s,children:u=>e.jsx(Fa,{id:u,"aria-controls":n,"aria-haspopup":"menu",onClick:this.handleClick,disabled:a===0||r,text:t,ref:this.handleOpenerRef,testId:i?void 0:l,opened:this.state.opened,role:"button",children:i||(p=>{const{text:h,opened:b,...x}=p;return e.jsx(Qi,{...x,disabled:r,opened:!!b,testId:l,children:t})})})})}render(){const{alignment:a,dropdownStyle:n,style:r,className:t,dropdownId:i}=this.props,l=this.getMenuItems();return e.jsx(Nn,{id:i,children:s=>e.jsx(Br,{id:s,role:"menu",style:r,className:t,opener:this.renderOpener(l.length,s),alignment:a,open:this.state.opened,items:l,openerElement:this.openerElement,onOpenChanged:this.handleOpenChanged,dropdownStyle:[Zi.menuTopSpace,n]})})}constructor(...a){super(...a),this.state={opened:!1},this.handleItemSelected=()=>{this.handleOpenChanged(!1),this.openerElement&&this.openerElement.focus()},this.handleOpenChanged=n=>{this.setState({opened:n}),this.props.onToggle&&this.props.onToggle(n)},this.handleOptionSelected=n=>{const{onChange:r,selectedValues:t}=this.props;if(!(!r||!t)){if(t.includes(n)){const i=t.indexOf(n),l=[...t.slice(0,i),...t.slice(i+1)];r(l)}else r([...t,n]);this.handleItemSelected()}},this.handleOpenerRef=n=>{this.openerElement=nn.findDOMNode(n)},this.handleClick=n=>{this.handleOpenChanged(!this.state.opened)}}}Ur.defaultProps={alignment:"left",disabled:!1};const Zi=R.StyleSheet.create({caret:{marginInlineStart:k.size_040},opener:{whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},menuTopSpace:{top:`calc(-1 * ${k.size_040})`}}),el=rn("button");class Kr extends g.Component{render(){const{children:a,disabled:n,error:r,id:t,isPlaceholder:i,open:l,testId:s,"aria-label":u,"aria-required":p,"aria-controls":h,onBlur:b,onOpenChanged:x,...S}=this.props,L=n?E.core.foreground.disabled.default:X.opener.color.icon,A=[je.shared,je.default,n&&je.disabled,r&&je.error,i&&je.placeholder,!n&&this.state.pressed&&je.press];return e.jsxs(el,{...S,"aria-disabled":n,"aria-expanded":l?"true":"false","aria-invalid":r,"aria-label":u??void 0,"aria-required":p,"aria-haspopup":"listbox","aria-controls":h,"data-testid":s,id:t,role:"combobox",type:"button",style:A,onClick:n?void 0:this.handleClick,onKeyDown:n?void 0:this.handleKeyDown,onKeyUp:n?void 0:this.handleKeyUp,onBlur:b,children:[e.jsx(On,{tag:"span",style:je.text,children:a||e.jsx("span",{"aria-hidden":"true",children:" "})}),e.jsx(Ae,{icon:Zn,color:L,size:"small",style:je.caret,"aria-hidden":"true"})]})}constructor(a){super(a),this.handleClick=n=>{const{open:r}=this.props;this.props.onOpenChanged(!r)},this.handleKeyDown=n=>{const r=n.key;(r===fe.enter||r===fe.space)&&(this.setState({pressed:!0}),n.preventDefault())},this.handleKeyUp=n=>{const r=n.key;(r===fe.enter||r===fe.space)&&(this.setState({pressed:!1}),this.handleClick(n))},this.state={pressed:!1}}}Kr.defaultProps={disabled:!1,error:!1,isPlaceholder:!1};const pa=`0 0 0 ${D.width.thin} ${E.input.default.border}`,je=R.StyleSheet.create({shared:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"space-between",color:E.core.foreground.neutral.strong,height:an,paddingInlineStart:X.opener.layout.padding.inlineStart,paddingInlineEnd:X.opener.layout.padding.inlineEnd,borderWidth:0,borderRadius:X.opener.border.radius.rest,borderStyle:"solid",outline:"none",textDecoration:"none",boxSizing:"border-box",whiteSpace:"nowrap",touchAction:"manipulation"},text:{marginInlineEnd:k.size_080,whiteSpace:"nowrap",userSelect:"none",overflow:"hidden",textOverflow:"ellipsis"},caret:{minWidth:k.size_160},default:{background:E.input.default.background,border:`${D.width.thin} solid ${E.input.default.border}`,color:E.input.default.foreground,cursor:"pointer",...pe.focus,":active":{boxShadow:pa}},error:{background:E.input.error.background,border:`${X.opener.border.width.error} solid ${E.input.error.border}`,color:E.input.error.foreground},disabled:{background:E.input.disabled.background,border:`${D.width.thin} solid ${E.input.disabled.border}`,color:E.input.disabled.foreground,cursor:"not-allowed",":active":{boxShadow:"none"}},press:{boxShadow:pa,":focus-visible":{boxShadow:`${pa}, ${pe.focus[":focus-visible"].boxShadow}`}},placeholder:{color:E.input.default.placeholder}}),nl="This field is required.";function mn(o){return o?o.length>0:!1}function al({value:o,disabled:a=!1,validate:n,onValidate:r,required:t,open:i}){const[l,s]=g.useState(()=>n&&mn(o)&&!a&&n(o)||null),u=g.useCallback(S=>{if(!a){if(n){const L=S!==void 0&&n(S)||null;if(s(L),r&&r(L),L)return}if(t){const L=typeof t=="string"?t:nl,A=mn(S)?null:L;s(A),r&&r(A)}}},[a,n,s,r,t]);co(()=>{mn(o)&&u(o)});function p(){!i&&t&&!mn(o)&&u(o)}return{errorMessage:l,onOpenerBlurValidation:p,onDropdownClosedValidation:()=>{t&&!mn(o)&&u(o)},onSelectionValidation:S=>{u(S)},onSelectedValuesChangeValidation:()=>{s(null),r&&r(null)}}}const te=o=>{const a=g.useRef(0),{children:n,error:r=!1,id:t,opener:i,placeholder:l,selectedValue:s,testId:u,alignment:p="left",autoFocus:h=!0,dropdownStyle:b,enableTypeAhead:x=!0,isFilterable:S,labels:L={clearSearch:Te.clearSearch,filter:Te.filter,noResults:Te.noResults,someResults:Te.someSelected},onChange:A,onToggle:M,opened:T,style:P,className:w,"aria-label":c,"aria-invalid":v,"aria-required":I,disabled:f=!1,dropdownId:q,validate:N,onValidate:U,required:ee,showOpenerLabelAsText:O=!0,...$}=o,[V,he]=g.useState(!1),[De,za]=g.useState(""),[ta,Pt]=g.useState(),{errorMessage:Lt,onOpenerBlurValidation:Ea,onDropdownClosedValidation:jt,onSelectionValidation:It}=al({value:s,disabled:f,validate:N,onValidate:U,required:ee,open:V}),_a=r||!!Lt;g.useEffect(()=>{f?he(!1):typeof T=="boolean"&&he(T)},[f,T]);const oa=G=>{he(G),za(""),M&&M(G),G||jt()},Nt=G=>{G!==s&&A(G),V&&ta&&ta.focus(),he(!1),M&&M(!1),It(G)},Rt=G=>{let ge=0;return a.current=0,G.map(ke=>{const{disabled:Ke,value:Xe}=ke.props,la=s===Xe;return la&&(a.current=ge),Ke||(ge+=1),{component:ke,focusable:!Ke,populatedProps:{onToggle:Nt,selected:la,variant:"check"}}})},Ft=G=>{const ge=De.toLowerCase();return G.filter(({props:ke})=>!De||Un(ke).toLowerCase().indexOf(ge)>-1)},Ot=G=>Rt(S?Ft(G):G),zt=G=>{za(G)},Da=G=>{const ge=nn.findDOMNode(G);Pt(ge)},Et=G=>{oa(!V)},Ma=G=>{ho({message:G})};g.useEffect(()=>{const ge=g.Children.toArray(n).find(ke=>ke.props.value===s);if(ge){const ke=Un(ge.props);ke&&Ma(ke)}},[s,n]);const _t=(G,ge)=>{const Ke=g.Children.toArray(n).find(_n=>_n.props.value===s);let Xe;return Ke?Xe=Di(O,Ke.props):Xe=l,e.jsx(Nn,{id:t,children:_n=>i?e.jsx(Fa,{id:_n,"aria-label":c,"aria-controls":ge,"aria-haspopup":"listbox",onClick:Et,disabled:G,ref:Da,role:"combobox",text:Xe,opened:V,error:_a,onBlur:Ea,children:i}):e.jsx(Kr,{...$,"aria-label":c,"aria-controls":ge,disabled:G,id:_n,error:_a,isPlaceholder:!Ke,onOpenChanged:oa,open:V,ref:Da,testId:u,onBlur:Ea,children:Xe})})},$a=g.Children.toArray(n).filter(Boolean),Dt=$a.filter(G=>!G.props.disabled).length,ia=Ot($a),Va=Dt===0||f,{someResults:Wa}=L;return g.useEffect(()=>{V&&Ma(Wa(ia.length))},[ia.length,Wa,V]),e.jsx(Nn,{id:q,children:G=>e.jsx(Br,{id:G,role:"listbox",selectionType:"single",alignment:p,autoFocus:h,enableTypeAhead:x,dropdownStyle:[S&&Ti,Ci,b],initialFocusedIndex:a.current,items:ia,onOpenChanged:oa,open:V,opener:_t(Va,G),openerElement:ta,style:P,className:w,isFilterable:S,onSearchTextChanged:S?zt:void 0,searchText:S?De:"",labels:L,"aria-invalid":v,"aria-required":I,disabled:Va})})};rn("span");R.StyleSheet.create({srOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}});g.memo(function({disabled:a,focusedMultiSelectIndex:n,id:r,labels:t,onRemove:i,removeSelectedLabel:l,selected:s,testId:u}){return e.jsx(y,{role:"group",style:ca.pillsWrapper,id:r,children:s.map((p,h)=>{const b=t[h],x=h===n,S=r+h;return e.jsx(en,{id:S,testId:u?`${u}-pill-${h}`:void 0,size:"small",style:[ca.pill,x&&ca.pillFocused],kind:x?"info":"neutral","aria-label":l(b),tabIndex:-1,onClick:()=>i(p),children:e.jsxs(e.Fragment,{children:[b,!a&&e.jsx(Ae,{icon:lo,size:"small"})]})},S)})})});const ca=R.StyleSheet.create({pillsWrapper:{flexDirection:"row",flexWrap:"wrap"},pill:{fontSize:Re.body.size.small,justifyContent:"space-between",alignItems:"center",marginBlockStart:k.size_040,marginInlineEnd:k.size_040,paddingInlineEnd:k.size_040},pillFocused:pe.focus[":focus-visible"]});R.StyleSheet.create({listbox:{backgroundColor:E.surface.primary,outline:"none",paddingBlock:X.listbox.layout.padding.block,paddingInline:X.listbox.layout.padding.inline},disabled:{color:E.action.secondary.disabled.foreground}});R.StyleSheet.create({wrapper:{flexDirection:"row",alignItems:"center",width:"100%",maxWidth:"100%",flexWrap:"wrap",background:E.surface.primary,borderRadius:X.opener.border.radius.rest,border:`${D.width.thin} solid ${E.core.border.neutral.subtle}`,paddingInline:X.opener.layout.padding.inline,overflow:"hidden"},focused:pe.focus[":focus-visible"],disabled:{background:E.input.disabled.background,border:`${D.width.thin} solid ${E.input.disabled.border}`,color:E.input.disabled.foreground},error:{background:E.input.error.background,border:`${X.opener.border.width.error} solid ${E.input.error.border}`,color:E.input.error.foreground},combobox:{appearance:"none",background:"none",border:"none",outline:"none",padding:0,minWidth:k.size_040,width:"auto",display:"inline-grid",gridArea:"1 / 2",":focus-visible":{outline:"none",border:"none"}},listbox:{backgroundColor:E.surface.primary,borderRadius:X.listbox.border.radius,border:`solid ${D.width.thin} ${E.core.border.neutral.subtle}`,boxShadow:X.listbox.shadow.default,maxHeight:"var(--popper-max-height)",overflowY:"auto"},hidden:{pointerEvents:"none",visibility:"hidden"},button:{position:"absolute",right:k.size_040,top:k.size_040,margin:0},buttonOpen:{transform:"rotate(180deg)"},clearButton:{right:k.size_400},iconWrapper:{padding:k.size_040,minWidth:"auto"}});const Ca="unlimited",Xr=o=>{const a=parseInt(o,10);return isNaN(a)||a===0?Ca:a},Jr=({numPoints:o=1,onChange:a})=>e.jsx(te,{selectedValue:`${o}`,onChange:n=>{a(Xr(n))},placeholder:"",style:rl.singleSelectShort,children:[...[...Array(7).keys()].map(n=>e.jsx(_,{value:`${n}`,label:`${n} point${n>1?"s":""}`},n)),e.jsx(_,{value:Ca,label:"unlimited"},"unlimited")]}),rl=R.StyleSheet.create({singleSelectShort:{height:26}});Jr.__docgenInfo={description:"",methods:[],displayName:"GraphPointsCountSelector",props:{numPoints:{required:!1,tsType:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(points: PointValue) => void",signature:{arguments:[{type:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},name:"points"}],return:{name:"void"}}},description:""}}};const Yr=o=>e.jsxs(te,{selectedValue:o.graphType,onChange:o.onChange,placeholder:"Select an answer type",style:tl.singleSelectShort,children:[e.jsx(_,{value:"none",label:"None"}),e.jsx(_,{value:"linear",label:"Linear function"}),e.jsx(_,{value:"quadratic",label:"Quadratic function"}),e.jsx(_,{value:"sinusoid",label:"Sinusoid function"}),e.jsx(_,{value:"circle",label:"Circle"}),e.jsx(_,{value:"point",label:"Point(s)"}),e.jsx(_,{value:"linear-system",label:"Linear System"}),e.jsx(_,{value:"polygon",label:"Polygon"}),e.jsx(_,{value:"segment",label:"Line Segment(s)"}),e.jsx(_,{value:"ray",label:"Ray"}),e.jsx(_,{value:"angle",label:"Angle"})]}),tl=R.StyleSheet.create({singleSelectShort:{height:26}});Yr.__docgenInfo={description:"",methods:[],displayName:"GraphTypeSelector",props:{graphType:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newGraphType: string) => void",signature:{arguments:[{type:{name:"string"},name:"newGraphType"}],return:{name:"void"}}},description:""}}};function Qr(o){return e.jsxs(e.Fragment,{children:[e.jsx(on,{title:"Correct Answer",isOpen:!0,isCollapsible:!1}),e.jsxs(y,{id:o.id,children:[e.jsxs(y,{children:[e.jsx(La,{style:{paddingTop:m.xxSmall_6,paddingBottom:m.xxSmall_6,color:F.offBlack64},children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."}),e.jsx(ea,{style:{fontSize:12,backgroundColor:"#eee",paddingInline:m.xxSmall_6,borderColor:"#ccc",borderStyle:"solid",borderWidth:1},children:o.equationString})]}),o.children]})]})}Qr.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCorrectAnswer",props:{id:{required:!0,tsType:{name:"string"},description:""},equationString:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function Zr(o){const{ariaLabelValue:a,ariaDescriptionValue:n,onChange:r}=o,[t,i]=g.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(on,{title:"Description",isCollapsible:!0,isOpen:t,onToggle:i}),t&&e.jsxs(y,{children:[e.jsx(La,{style:ha.caption,children:"Use these fields to describe the graph as a whole. These are used by screen readers to describe content to users who may be visually impaired."}),e.jsxs(W,{tag:"label",children:["Title",e.jsx(Ze,{value:a,onChange:l=>r({fullGraphAriaLabel:l||void 0}),style:ha.spaceAbove})]}),e.jsx(C,{size:m.small_12}),e.jsxs(W,{tag:"label",children:["Description",e.jsx(ja,{rows:8,resizeType:"vertical",value:n,onChange:l=>r({fullGraphAriaDescription:l||void 0}),style:ha.spaceAbove})]})]})]})}const ha=R.StyleSheet.create({caption:{color:F.offBlack64,paddingTop:m.xxSmall_6,paddingBottom:m.xxSmall_6},spaceAbove:{marginTop:m.xxxSmall_4}});Zr.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphDescription",props:{ariaLabelValue:{required:!0,tsType:{name:"string"},description:""},ariaDescriptionValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(graphProps: Partial<EditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<EditorProps>"},name:"graphProps"}],return:{name:"void"}}},description:""}}};const ne=o=>{const{children:a,label:n,labelSide:r="left",style:t}=o;return e.jsx("label",{className:R.css($n.label),children:e.jsxs(y,{style:[$n.row,t],children:[r==="start"||e.jsx(Ne,{style:$n.spaceEnd,children:n}),a,r==="end"&&e.jsx(Ne,{style:$n.spaceStart,children:n})]})})},$n=R.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:m.xSmall_8},spaceEnd:{marginInlineEnd:m.xSmall_8}});ne.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:Qa,InfoTip:Za,RangeInput:pn}=ae,ol={url:null,width:0,height:0};function il(o,a){return Math.floor((o[1]-o[0])/a)}const In=class In extends g.Component{constructor(n){super(n);d(this,"_isMounted",!1);d(this,"bgUrlRef",g.createRef());d(this,"labelXRef",g.createRef());d(this,"labelYRef",g.createRef());d(this,"change",(...n)=>ie.apply(this,n));d(this,"changeBackgroundUrl",n=>{var i;if(n.type==="keypress"&&n.key!=="Enter")return;const r=(l,s,u)=>{const p={...this.props.backgroundImage};p.url=l,p.width=s,p.height=u,this.setState({backgroundImage:p},this.changeGraph)},t=(i=this.bgUrlRef.current)==null?void 0:i.value;t?Ce.getImageSize(t,(l,s)=>{this._isMounted&&r(t,l,s)}):r(null,0,0)});d(this,"renderLabelChoices",n=>n.map(r=>e.jsx("option",{value:r[1],children:r[0]},r[1])));d(this,"validRange",n=>z.every(n,function(t){return z.isFinite(t)})?n[0]>=n[1]?"Range must have a higher number on the right":!0:"Range must be a valid number");d(this,"validateStepValue",n=>{const{step:r,range:t,name:i,minTicks:l,maxTicks:s}=n,u=il(t,r);return u<l?i+" is too large, there must be at least "+l+" ticks.":u>s?i+" is too small, there can be at most "+s+" ticks.":!0});d(this,"validSnapStep",(n,r)=>this.validateStepValue({step:n,range:r,name:"Snap step",minTicks:5,maxTicks:60}));d(this,"validGridStep",(n,r)=>this.validateStepValue({step:n,range:r,name:"Grid step",minTicks:3,maxTicks:60}));d(this,"validStep",(n,r)=>this.validateStepValue({step:n,range:r,name:"Step",minTicks:3,maxTicks:20}));d(this,"validBackgroundImageSize",n=>n.url?n.width<=450&&n.height<=450?!0:"Image must be smaller than 450px x 450px.":!0);d(this,"validateGraphSettings",(n,r,t,i,l)=>{const s=this;let u;if(!z.every(n,function(L){return u=s.validRange(L),u===!0})||!z.every(r,function(L,A){return u=s.validStep(L,n[A]),u===!0})||!z.every(t,function(L,A){return u=s.validGridStep(L,n[A]),u===!0})||!z.every(i,function(L,A){return u=s.validSnapStep(L,n[A]),u===!0}))return u;const S=this.validBackgroundImageSize(l);return S!==!0?(u=S,u):!0});d(this,"changeLabel",(n,r)=>{const t=r.target.value,i=this.state.labelsTextbox.slice();i[n]=t,this.setState({labelsTextbox:i},this.changeGraph)});d(this,"changeRange",(n,r)=>{const t=this.state.rangeTextbox.slice();t[n]=r,this.setState({rangeTextbox:t},this.changeGraph)});d(this,"changeStepsBasedOnRange",()=>{const n=this.state.rangeTextbox.slice(),r=this.state.stepTextbox.slice(),t=this.state.gridStepTextbox.slice(),i=this.state.snapStepTextbox.slice(),l=Ce.scaleFromExtent(n[0],this.props.box[0]);if(this.validRange(n[0])===!0){r[0]=Ce.tickStepFromExtent(n[0],this.props.box[0]);const u=Ce.gridStepFromTickStep(r[0],l);u&&(t[0]=u),i[0]=t[0]/2}const s=Ce.scaleFromExtent(n[1],this.props.box[1]);if(this.validRange(n[1])===!0){r[1]=Ce.tickStepFromExtent(n[1],this.props.box[1]);const u=Ce.gridStepFromTickStep(r[1],s);u&&(t[1]=u),i[1]=t[1]/2}this.setState({stepTextbox:r,gridStepTextbox:t,snapStepTextbox:i,rangeTextbox:n},this.changeGraph)});d(this,"changeStep",n=>{this.setState({stepTextbox:n},this.changeGraph)});d(this,"changeSnapStep",n=>{this.setState({snapStepTextbox:n},this.changeGraph)});d(this,"changeGridStep",n=>{this.setState({gridStepTextbox:n,snapStepTextbox:z.map(n,function(r){return r/2})},this.changeGraph)});d(this,"changeGraph",()=>{const n=this.state.labelsTextbox,r=this.state.labelLocation,t=z.map(this.state.rangeTextbox,function(h){return z.map(h,Number)}),i=z.map(this.state.stepTextbox,Number),l=this.state.gridStepTextbox,s=this.state.snapStepTextbox,u=this.state.backgroundImage,p=this.validateGraphSettings(t,i,l,s,u);p===!0?this.change({valid:!0,labels:n,labelLocation:r,range:t,step:i,gridStep:l,snapStep:s,backgroundImage:u}):this.change({valid:p})});this.state={isExpanded:!0,...In.stateFromProps(n)}}static stateFromProps(n){return{labelsTextbox:n.labels,labelLocation:n.labelLocation,gridStepTextbox:n.gridStep,snapStepTextbox:n.snapStep,stepTextbox:n.step,rangeTextbox:n.range,backgroundImage:{...n.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=z.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(n){(!z.isEqual(this.props.labels,n.labels)||!z.isEqual(this.props.labelLocation,n.labelLocation)||!z.isEqual(this.props.gridStep,n.gridStep)||!z.isEqual(this.props.snapStep,n.snapStep)||!z.isEqual(this.props.step,n.step)||!z.isEqual(this.props.range,n.range)||!z.isEqual(this.props.backgroundImage,n.backgroundImage))&&this.setState(In.stateFromProps(n))}componentWillUnmount(){this._isMounted=!1}render(){return e.jsxs(e.Fragment,{children:[e.jsx(on,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&e.jsxs(y,{children:[e.jsxs("div",{className:"graph-settings",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ne,{label:"Label Location",children:e.jsx(Qa,{value:this.props.labelLocation,allowEmpty:!1,buttons:[{value:"onAxis",content:"On Axis"},{value:"alongEdge",content:"Along Graph Edge"}],onChange:this.change("labelLocation")})})}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"x Label",children:e.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:n=>this.changeLabel(0,n),value:this.state.labelsTextbox[0]||""})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ne,{label:"y Label",children:e.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:n=>this.changeLabel(1,n),value:this.state.labelsTextbox[1]||""})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"x Range",children:e.jsx(pn,{value:this.state.rangeTextbox[0],onChange:n=>this.changeRange(0,n),allowPiTruncation:!0})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ne,{label:"y Range",children:e.jsx(pn,{value:this.state.rangeTextbox[1],onChange:n=>this.changeRange(1,n),allowPiTruncation:!0})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"Tick Step",children:e.jsx(pn,{value:this.state.stepTextbox,onChange:this.changeStep,allowPiTruncation:!0})})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ne,{label:"Grid Step",children:e.jsx(pn,{value:this.state.gridStepTextbox,onChange:this.changeGridStep,allowPiTruncation:!0})})})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ne,{label:"Snap Step",children:e.jsx(pn,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep,allowPiTruncation:!0})})}),e.jsxs("div",{className:"perseus-widget-right-col",children:[e.jsx(se,{size:"small",kind:"tertiary",onClick:()=>{this.changeStepsBasedOnRange()},children:"Auto-adjust steps"}),e.jsxs(Za,{children:[e.jsx("p",{children:'Use the "Auto-adjust" steps button to update the tick step, grid step, and snap step to values that are valid for the current range.'}),e.jsx("br",{}),e.jsx("p",{children:"This is useful when the range is changed, and the graph errors due to the step sizes being too large or too small."})]})]})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ne,{label:"Markings:",children:e.jsx(Qa,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"axes",content:"Axes"},{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ce,{label:"Show tooltips",checked:this.props.showTooltips,onChange:n=>{this.change({showTooltips:n})}})})]}),e.jsxs(ne,{label:"Background image URL:",style:cn.resetSpaceTop,children:[e.jsx("input",{type:"text",className:R.css(cn.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:n=>{const r={...this.props.backgroundImage};r.url=n.target.value,this.setState({backgroundImage:r})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),e.jsx(Za,{children:e.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),e.jsxs(y,{style:cn.protractorSection,children:[e.jsx(y,{style:cn.checkboxRow,children:e.jsx(ce,{label:"Show protractor",checked:this.props.showProtractor,onChange:n=>{this.change({showProtractor:n})},style:cn.resetSpaceTop})}),this.props.showProtractor&&e.jsx(go,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"})]})]})]})}};d(In,"defaultProps",{box:[fa.defaultBoxSizeSmall,fa.defaultBoxSizeSmall],labels:["$x$","$y$"],labelLocation:"onAxis",range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:ol,markings:"graph",showProtractor:!1,showTooltips:!1});let Kn=In;const cn=R.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${F.offBlack32}`,borderRadius:m.xxxSmall_4,padding:m.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:m.xSmall_8},protractorSection:{marginTop:m.xSmall_8,borderTop:`1px solid ${F.offBlack16}`,paddingTop:m.xSmall_8,paddingBottom:m.xSmall_8,borderBottom:`1px solid ${F.offBlack16}`}});Kn.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
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
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};const{InfoTip:ll}=ae,sl=rn("ul");function ul(o){const a=[],n=document.getElementById(o);return n&&n.querySelectorAll("*").forEach(r=>{var s;const t=[],i=r.getAttribute("aria-label"),l=r.getAttribute("aria-describedby");if(i&&t.unshift({name:"label",value:i}),l){const u=l.split(/ +/);for(const p of u){const h=(s=document.getElementById(p))==null?void 0:s.textContent;h&&t.push({name:"description",value:h})}}t.length>0&&a.push({roleOrTag:r.getAttribute("role")||r.tagName.toLowerCase(),className:r.classList[r.classList.length-1]||"",attributes:t})}),a}function dl(o){const{elementArias:a,showTags:n}=o;return e.jsx("ol",{style:{listStyle:"revert",marginLeft:8},children:a.map((r,t)=>e.jsxs("li",{children:[n&&e.jsx(en,{size:"small",kind:"success",style:xn.smallSpaceRight,children:r.roleOrTag}),r.className,e.jsx(sl,{style:xn.indentListLeft,children:r.attributes.map((i,l)=>e.jsxs("li",{children:[e.jsx(en,{size:"small",kind:i.name==="label"?"info":"neutral",style:xn.smallSpaceRight,children:i.name}),i.value]},l))})]},t))})}function et({graphId:o,correct:a,fullGraphAriaLabel:n,fullGraphAriaDescription:r,lockedFigures:t}){const[i,l]=g.useState(!0),[s,u]=g.useState(!1),[p,h]=g.useState([]),b=g.useId();return g.useEffect(()=>{h(ul(o))},[a,n,r,o,t]),e.jsxs(e.Fragment,{children:[e.jsx(on,{title:"Screen reader tree",isOpen:i,onToggle:l,isCollapsible:!0}),i&&e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:[xn.row,xn.tagSwitch],children:[e.jsx(Lr,{id:b,checked:s,onChange:u}),e.jsx(C,{size:m.xSmall_8}),e.jsx(Ne,{tag:"label",htmlFor:b,children:"Show HTML roles/tags"}),e.jsx(zn,{}),e.jsx(ll,{children:'This screen reader tree shows the ARIA labels and descriptions for elements within the "correct answer" Interactive Graph widget displayed above.'})]}),e.jsx(dl,{elementArias:p,showTags:s})]})]})}const xn=R.StyleSheet.create({smallSpaceRight:{marginRight:m.xxSmall_6},indentListLeft:{listStyle:"revert",marginLeft:m.small_12},tagSwitch:{marginTop:m.xSmall_8,marginBottom:m.xSmall_8},row:{flexDirection:"row",alignItems:"center"}});et.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphSRTree"};const nt=({numSegments:o=1,onChange:a})=>e.jsx(te,{selectedValue:`${o}`,placeholder:"",onChange:n=>{const r=+n;a(r)},style:ml.singleSelectShort,children:z.range(1,7).map(n=>e.jsx(_,{value:`${n}`,label:`${n} segment${n>1?"s":""}`},n))},"segment-select"),ml=R.StyleSheet.create({singleSelectShort:{height:26}});nt.__docgenInfo={description:"",methods:[],displayName:"SegmentCountSelector",props:{numSegments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(numSegments: number) => void",signature:{arguments:[{type:{name:"number"},name:"numSegments"}],return:{name:"void"}}},description:""}}};const at=o=>{const{id:a,onChange:n}=o,r=["point","line","vector","ellipse","polygon","function","label"];return e.jsx(y,{style:er.container,children:e.jsx(Ur,{menuText:"Add locked figure",style:er.addElementSelect,children:r.map(t=>e.jsx(Rn,{label:t,onClick:()=>n(t)},`${a}-${t}`))})})},er=R.StyleSheet.create({container:{marginTop:m.xSmall_8},addElementSelect:{backgroundColor:F.fadedBlue8,borderRadius:m.xxxSmall_4}});at.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSelect",props:{id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: LockedFigureType) => void",signature:{arguments:[{type:{name:'union["type"]',raw:'LockedFigure["type"]'},name:"value"}],return:{name:"void"}}},description:""}}};const Fn=o=>{const{value:a,onChange:n,...r}=o,[t,i]=g.useState(!1),[l,s]=g.useState(""),u=g.useRef(null);return g.useEffect(()=>{const p=u.current,h=b=>{b.stopPropagation()};return p==null||p.addEventListener("wheel",h),()=>{p==null||p.removeEventListener("wheel",h)}},[u]),e.jsx(Ze,{...r,type:"number",value:t?l:a,onChange:p=>{s(p),n(p)},onFocus:p=>{var h;s(a),i(!0),(h=o.onFocus)==null||h.call(o,p)},onBlur:p=>{var h;i(!1),(h=o.onBlur)==null||h.call(o,p)},ref:u})};Fn.__docgenInfo={description:`This is a custom text field of type="number" for use in Perseus Editors.

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
with this stopPropogation, Firefox matches the native HTML behavior.`,methods:[],displayName:"ScrolllessNumberTextField"};const{convertDegreesToRadians:pl,convertRadiansToDegrees:cl}=Ia,rt=o=>{const{angle:a,onChange:n}=o,[r,t]=g.useState(cl(a).toString());function i(l){t(l),!(isNaN(+l)||l==="")&&n(pl(l))}return e.jsxs(K,{tag:"label",style:nr.row,children:["angle (degrees)",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Fn,{value:r,onChange:i,style:nr.textField}),e.jsx(C,{size:m.xxSmall_6})]})},nr=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64}});rt.__docgenInfo={description:"",methods:[],displayName:"AngleInput",props:{angle:{required:!0,tsType:{name:"number"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(angle: number) => void",signature:{arguments:[{type:{name:"number"},name:"angle"}],return:{name:"void"}}},description:""}}};const J=o=>{const{coord:a,labels:n,error:r,style:t,onChange:i}=o,[l,s]=g.useState([a[0].toString(),a[1].toString()]);g.useEffect(()=>{s([a[0].toString(),a[1].toString()])},[a]);function u(p,h){const b=[...l];if(b[h]=p,s(b),isNaN(+p)||p==="")return;const x=[...a];x[h]=+p,i(x)}return e.jsxs(y,{style:[Me.row,t],children:[e.jsxs(K,{tag:"label",style:Me.row,children:[n?n[0]:"x coord",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Fn,{value:l[0],onChange:p=>u(p,0),style:[Me.textField,r?Me.errorField:void 0]})]}),e.jsx(C,{size:m.medium_16}),e.jsxs(K,{tag:"label",style:Me.row,children:[n?n[1]:"y coord",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Fn,{value:l[1],onChange:p=>u(p,1),style:[Me.textField,r?Me.errorField:void 0]})]})]})},Me=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64},errorField:{borderColor:F.red,backgroundColor:F.fadedRed8}});J.__docgenInfo={description:"",methods:[],displayName:"CoordinatePairInput",props:{coord:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},labels:{required:!1,tsType:{name:"tuple",raw:"[string, string]",elements:[{name:"string"},{name:"string"}]},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newCoord: Coord) => void",signature:{arguments:[{type:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},name:"newCoord"}],return:{name:"void"}}},description:""}}};const Oa=o=>{const{color:a,filled:n=!0,decorative:r=!1}=o;return e.jsx(y,{"aria-label":r?void 0:`${a}, ${n?"filled":"open"}`,style:[hl.colorSwatch,{border:`4px solid ${Pe[a]}`,backgroundColor:n?Pe[a]:F.white}]})},hl=R.StyleSheet.create({colorSwatch:{outline:`2px solid ${F.offWhite}`,borderRadius:"50%",width:m.large_24,height:m.large_24}});Oa.__docgenInfo={description:"",methods:[],displayName:"ColorSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!1,tsType:{name:"boolean"},description:""},decorative:{required:!1,tsType:{name:"boolean"},description:""}}};const gl=Object.keys(Pe),ze=o=>{const{selectedValue:a,style:n,onChange:r}=o;return e.jsx(y,{style:[ar.row,n],children:e.jsxs(K,{tag:"label",style:ar.row,children:["color",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:a,onChange:r,placeholder:"",children:gl.map(t=>e.jsx(_,{value:t,label:t,leftAccessory:e.jsx(Oa,{color:t,decorative:!0})},t))})]})})},ar=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:"auto"}});ze.__docgenInfo={description:"",methods:[],displayName:"ColorSelect",props:{selectedValue:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newColor: LockedFigureColor) => void",signature:{arguments:[{type:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},name:"newColor"}],return:{name:"void"}}},description:""}}};const tt=o=>{const{color:a,fillStyle:n,strokeStyle:r}=o;return e.jsx(y,{"aria-label":`${a}, stroke ${r}, fill ${n}`,style:[rr.container,{border:`4px ${r} ${Pe[a]}`}],children:e.jsx(y,{style:[rr.innerCircle,{backgroundColor:Pe[a],opacity:n==="white"?0:na[n]}]})})},rr=R.StyleSheet.create({container:{outline:`2px solid ${F.offWhite}`,borderRadius:"50%",width:m.xLarge_32,height:m.large_24,backgroundColor:F.white,alignItems:"center",justifyContent:"center"},innerCircle:{width:28,height:20,borderRadius:"50%"}});tt.__docgenInfo={description:"",methods:[],displayName:"EllipseSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const En=o=>{const{selectedValue:a,containerStyle:n,onChange:r}=o;return e.jsxs(K,{tag:"label",style:[yl.lineStrokeSelect,n],children:["stroke",e.jsx(C,{size:m.xxxSmall_4}),e.jsxs(te,{selectedValue:a,onChange:r,placeholder:"",children:[e.jsx(_,{value:"solid",label:"solid"}),e.jsx(_,{value:"dashed",label:"dashed"})]})]})},yl=R.StyleSheet.create({lineStrokeSelect:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0}});En.__docgenInfo={description:"",methods:[],displayName:"LineStrokeSelect",props:{selectedValue:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: StyleOptions) => void",signature:{arguments:[{type:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},name:"newValue"}],return:{name:"void"}}},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const ln=o=>{const{selectedValue:a,containerStyle:n,onChange:r}=o;return e.jsxs(K,{tag:"label",style:[{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0},n],children:["weight",e.jsx(C,{size:m.xxxSmall_4}),e.jsxs(te,{selectedValue:a,onChange:t=>r(t),placeholder:"",children:[e.jsx(_,{value:"thin",label:"thin"}),e.jsx(_,{value:"medium",label:"medium"}),e.jsx(_,{value:"thick",label:"thick"})]})]})};ln.__docgenInfo={description:"",methods:[],displayName:"LineWeightSelect",props:{selectedValue:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: StrokeWeight) => void",signature:{arguments:[{type:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},name:"newValue"}],return:{name:"void"}}},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const bl=""+new URL("pencil-circle-gxKdCU6a.svg",import.meta.url).href,{InfoTip:wl}=ae;function Ue(o){const{ariaLabel:a,getPrepopulatedAriaLabel:n,onChangeProps:r}=o,i=`aria-label-${g.useId()}`,[l,s]=g.useState(!1);return e.jsxs(y,{children:[e.jsx(C,{size:m.xSmall_8}),e.jsxs(y,{style:ga.row,children:[e.jsx(K,{tag:"label",htmlFor:i,children:"Aria label"}),e.jsx(zn,{}),e.jsxs(wl,{children:["Aria label is used by screen readers to describe content to users who may be visually impaired. ",e.jsx("br",{}),e.jsx("br",{}),"Populating this field will make it so that users can use a screen reader to navigate to this point and hear the description.",e.jsx("br",{}),e.jsx("br",{}),"If you leave this field blank, the point will be hidden from screen readers. Users will not be able to navigate to this point using a screen reader."]})]}),e.jsx(C,{size:m.xxSmall_6}),e.jsx(La,{style:ga.caption,children:"The figure is hidden from screen readers if this field is left blank."}),e.jsx(C,{size:m.xxSmall_6}),e.jsx(ja,{id:i,value:l?"Loading...":a??"",onChange:u=>{r({ariaLabel:u||void 0})},placeholder:"Ex. Point at (x, y)",rows:1,resizeType:"vertical"}),e.jsx(se,{kind:"tertiary",startIcon:bl,style:ga.button,onClick:()=>{s(!0),n().then(u=>{s(!1),r({ariaLabel:u})})},children:"Auto-generate"})]})}const ga=R.StyleSheet.create({row:{flexDirection:"row",alignItems:"center"},button:{alignSelf:"start"},caption:{color:F.offBlack64}});Ue.__docgenInfo={description:"",methods:[],displayName:"LockedFigureAria",props:{ariaLabel:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},getPrepopulatedAriaLabel:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<string>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"string"}],raw:"Promise<string>"}}},description:`The async function that generates the prepopulated aria label
for the locked figure with math details converted to spoken words.`},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: {ariaLabel?: string | undefined}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ariaLabel?: string | undefined}",signature:{properties:[{key:"ariaLabel",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}}]}},name:"props"}],return:{name:"void"}}},description:""}}};const ot=""+new URL("caret-double-down-bold-Bd6la7IK.svg",import.meta.url).href,it=""+new URL("caret-double-up-bold-DXRVAODE.svg",import.meta.url).href,lt=""+new URL("caret-up-bold-DRBgEf-E.svg",import.meta.url).href,Ee=o=>{const{figureType:a,onMove:n,onRemove:r}=o;return e.jsxs(y,{style:tr.container,children:[e.jsx(se,{startIcon:$r,"aria-label":`Delete locked ${a}`,onClick:r,kind:"tertiary",style:tr.deleteButton,children:"Delete"}),n&&e.jsxs(e.Fragment,{children:[e.jsx(zn,{}),e.jsx(le,{icon:it,kind:"tertiary",size:"small","aria-label":`Move locked ${a} to the back`,onClick:()=>n("back")}),e.jsx(le,{icon:lt,kind:"tertiary",size:"small","aria-label":`Move locked ${a} backward`,onClick:()=>n("backward")}),e.jsx(le,{icon:Zn,kind:"tertiary",size:"small","aria-label":`Move locked ${a} forward`,onClick:()=>n("forward")}),e.jsx(le,{icon:ot,kind:"tertiary",size:"small","aria-label":`Move locked ${a} to the front`,onClick:()=>n("front")})]})]})},tr=R.StyleSheet.create({container:{width:"100%",flexDirection:"row",alignItems:"center",marginTop:m.xxxSmall_4},deleteButton:{marginInlineStart:-4}});Ee.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettingsActions",props:{figureType:{required:!0,tsType:{name:'union["type"]',raw:'LockedFigure["type"]'},description:""},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:""},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{InfoTip:fl}=ae;function _e(o){const{type:a,coord:n,color:r,size:t,text:i,expanded:l,onChangeProps:s,onMove:u,onRemove:p,onToggle:h,containerStyle:b}=o;return e.jsxs(we,{expanded:l,onToggle:h,header:e.jsxs(y,{style:[ve.row,ve.accordionHeaderContainer],children:[e.jsxs(W,{children:["Label (",n[0],", ",n[1],")"]}),e.jsx(C,{size:m.xSmall_8}),i!==""&&e.jsx(W,{style:[{backgroundColor:F.white,color:Pe[r]},ve.accordionHeader],children:i})]}),containerStyle:b,children:[e.jsx(J,{coord:n,onChange:x=>{s({coord:x})},style:ve.spaceUnder}),e.jsxs(y,{style:ve.row,children:[e.jsxs(K,{tag:"label",style:[ve.row,ve.spaceUnder,{flexGrow:1}],children:["text",e.jsx(C,{size:m.xSmall_8}),e.jsx(Ze,{value:i,placeholder:"ex. $x^2$ or $\\frac{1}{2}$",onChange:x=>s({text:x})})]}),e.jsxs(fl,{children:["Surround your text with $ for TeX.",e.jsx("br",{}),"Example: ","This circle has radius $\\frac{1}{2}$ units.",e.jsx("br",{}),e.jsx("br",{}),'It is important to use TeX when appropriate for accessibility. The above example would be read as "This circle has radius one-half units" by screen readers.']})]}),e.jsxs(y,{style:ve.row,children:[e.jsx(ze,{selectedValue:r,onChange:x=>{s({color:x})},style:ve.spaceUnder}),e.jsx(C,{size:m.medium_16}),e.jsxs(K,{tag:"label",style:ve.row,children:["size",e.jsx(C,{size:m.xSmall_8}),e.jsxs(te,{selectedValue:t,onChange:x=>s({size:x}),placeholder:"",children:[e.jsx(_,{value:"small",label:"small"}),e.jsx(_,{value:"medium",label:"medium"}),e.jsx(_,{value:"large",label:"large"})]})]})]}),e.jsx(Ee,{figureType:a,onMove:u,onRemove:p})]})}const ve=R.StyleSheet.create({accordionHeaderContainer:{whiteSpace:"nowrap"},accordionHeader:{padding:m.xxxSmall_4,marginInlineEnd:m.xSmall_8,borderRadius:m.xxxSmall_4,textOverflow:"ellipsis",overflow:"hidden"},row:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0},spaceUnder:{marginBottom:m.xSmall_8}});_e.__docgenInfo={description:"",methods:[],displayName:"LockedLabelSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"label"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},text:{required:!0,tsType:{name:"string"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},size:{required:!0,tsType:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}]},description:""},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedLabelType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
is for a standalone label, not part of a larger locked figure.`},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};const $e="grayH";function Le(o){switch(o){case"point":return{type:"point",coord:[0,0],color:$e,filled:!0,labels:[]};case"line":return{type:"line",kind:"line",points:[Le("point"),{...Le("point"),coord:[2,2]}],color:$e,lineStyle:"solid",showPoint1:!1,showPoint2:!1,weight:"medium",labels:[]};case"vector":return{type:"vector",points:[[0,0],[2,2]],color:$e,weight:"medium",labels:[]};case"ellipse":return{type:"ellipse",center:[0,0],radius:[1,1],angle:0,color:$e,fillStyle:"none",strokeStyle:"solid",weight:"medium",labels:[]};case"polygon":return{type:"polygon",points:[[0,2],[-1,0],[1,0]],color:$e,showVertices:!1,fillStyle:"none",strokeStyle:"solid",weight:"medium",labels:[]};case"function":return{type:"function",color:$e,strokeStyle:"solid",weight:"medium",equation:"x^2",domain:[-1/0,1/0],directionalAxis:"x",labels:[]};case"label":return{type:"label",coord:[0,0],text:"label",color:$e,size:"medium"};default:throw new tn(o)}}function sn(o,a="solid",n,r="medium"){const t=o==="grayH"?"gray":o,l=`. Appearance${r==="medium"?"":` ${r}`} ${a} ${t}`;switch(n){case"none":return`${l} border, with no fill.`;case"white":return`${l} border, with a white fill.`;case"solid":case"translucent":return`${l} border, with a ${n} ${t} fill.`;case void 0:return`${l}.`;default:throw new tn(n)}}async function oe(o){const a=await yo.SpeechRuleEngine.setup("en");let n="";const r=bo(o);for(const t of r)switch(t.type){case"math":n+=a.texToSpeech(t.content);break;case"specialCharacter":n+=t.content.length>1?t.content.slice(1):t.content;break;default:n+=t.content;break}return n}async function Fe(o){if(o.length===0)return"";const a=o.map(r=>oe(r.text));return` ${(await Promise.all(a)).join(", ")}`}const{convertRadiansToDegrees:kl}=Ia,{InfoTip:vl}=ae,st=o=>{const{center:a,radius:n,angle:r,color:t,labels:i,ariaLabel:l,fillStyle:s,strokeStyle:u,weight:p,expanded:h,onToggle:b,onChangeProps:x,onMove:S,onRemove:L}=o;async function A(){const c=await Fe(i),v=await oe(`$${a[0]}$`),I=await oe(`$${a[1]}$`),f=await oe(`$${kl(r)}$`),q=n[0]===n[1];let N="";q?N+=`Circle${c} with radius ${n[0]}`:N+=`Ellipse${c} with x radius ${n[0]} and y radius ${n[1]}`,N+=`, centered at ${v} comma ${I}`,!q&&r!==0&&(N+=`, rotated by ${f} degrees`);const U=sn(t,u,s,p);return N+=U,N}function M(c){const v=c[0]-a[0],I=c[1]-a[1],f={center:c};f.labels=i.map(q=>({...q,coord:[q.coord[0]+v,q.coord[1]+I]})),x(f)}function T(c){const v={color:c};v.labels=i.map(I=>({...I,color:c})),x(v)}function P(c,v){const I=[...i];I[v]={...i[v],...c},x({labels:I})}function w(c){const v=i.filter((I,f)=>f!==c);x({labels:v})}return e.jsxs(we,{expanded:h,onToggle:b,header:e.jsxs(y,{style:me.row,children:[e.jsx(W,{children:`Ellipse (${a[0]}, ${a[1]}), radius ${n[0]}, ${n[1]}`}),e.jsx(C,{size:m.xSmall_8}),e.jsx(tt,{color:o.color,fillStyle:s,strokeStyle:u})]}),children:[e.jsxs(y,{style:me.row,children:[e.jsx(J,{coord:a,style:me.spaceUnder,onChange:M}),e.jsx(y,{style:me.spaceUnder,children:e.jsx(vl,{children:"The coordinates for the center of the ellipse."})})]}),e.jsx(J,{coord:n,labels:["x radius","y radius"],style:me.spaceUnder,onChange:c=>x({radius:c})}),e.jsx(rt,{angle:r,onChange:c=>x({angle:c})}),e.jsx(C,{size:m.xSmall_8}),e.jsxs(y,{style:[me.row,me.spaceUnder],children:[e.jsx(ze,{selectedValue:t,onChange:T}),e.jsx(C,{size:m.medium_16}),e.jsxs(K,{tag:"label",style:[me.row,me.truncatedWidth],children:["fill",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:s,onChange:c=>x({fillStyle:c}),placeholder:"",children:Object.keys(na).map(c=>e.jsx(_,{value:c,label:c},c))})]})]}),e.jsx(En,{selectedValue:u,onChange:c=>x({strokeStyle:c}),containerStyle:{marginBottom:k.size_080}}),e.jsx(ln,{selectedValue:p,onChange:c=>x({weight:c})}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:me.horizontalRule}),e.jsx(Ue,{ariaLabel:l,getPrepopulatedAriaLabel:A,onChangeProps:c=>{x(c)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:me.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(K,{children:"Visible labels"}),i.map((c,v)=>g.createElement(_e,{...c,key:v,expanded:!0,onChangeProps:I=>{P(I,v)},onRemove:()=>{w(v)},containerStyle:me.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:He,onClick:()=>{const c={...Le("label"),coord:[a[0],a[1]-i.length],color:t};x({labels:[...i,c]})},style:me.addButton,children:"Add visible label"}),e.jsx(Ee,{figureType:o.type,onMove:S,onRemove:L})]})},me=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},truncatedWidth:{minWidth:0},addButton:{alignSelf:"start"},labelContainer:{backgroundColor:F.white},horizontalRule:{height:1,backgroundColor:F.offBlack16}});st.__docgenInfo={description:"",methods:[],displayName:"LockedEllipseSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedEllipseType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."}}};const xl=""+new URL("copy-ChcUWZci.svg",import.meta.url).href,ql=""+new URL("note-pencil-CqqXva0w.svg",import.meta.url).href,ra=o=>{const{color:a,lineStyle:n}=o;return e.jsx(y,{style:or.container,children:e.jsx(y,{"aria-label":`${a}, ${n}`,style:[or.lineSwatch,{border:`5px ${n} ${Pe[a]}`}]})})},or=R.StyleSheet.create({container:{backgroundColor:F.white,justifyContent:"center",padding:m.xSmall_8,borderRadius:m.xxxSmall_4},lineSwatch:{width:40}});ra.__docgenInfo={description:"",methods:[],displayName:"LineSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const ir={linear:["x + 5","1/2x - 2"],polynomial:["1/2x^2 + 3x - 4","(1/3)x^3 - 2x^2 + 3x - 4"],trigonometric:["sin(x) * 3","arctan(2x) + 4"]},ut=o=>{const{color:a,strokeStyle:n,equation:r,directionalAxis:t,domain:i,weight:l,ariaLabel:s,onChangeProps:u,onMove:p,onRemove:h}=o,b=o.labels,x=t==="x"?"y=":"x=",S=`Function (${x}${r})`,L=O=>[Number.isFinite(O[0])?O[0].toString():"",Number.isFinite(O[1])?O[1].toString():""],[A,M]=g.useState(L(i)),[T,P]=g.useState("");g.useEffect(()=>{M(L(i))},[i]);async function w(){let $=`Function${await Fe(b)} with equation ${x}${r}`;(Number.isFinite(i[0])||Number.isFinite(i[1]))&&($+=`, domain from ${i[0]} to ${i[1]}`);const V=sn(a,n,void 0,l);return $+=V,$}function c(O,$){const V={};V[O]=$,u(V)}function v(O,$){const V=[...A];V[O]=$,M(V);const he=[...i];let De=parseFloat($);$===""&&O===0?De=-1/0:$===""&&O===1&&(De=1/0),he[O]=De,u({domain:he})}const I=Object.keys(ir),f=T!=="",q=f?ir[T]:["Select category to see example equations"];function N(O){const $={color:O};$.labels=b.map(V=>({...V,color:O})),u($)}function U(O,$){const V=[...b];V[$]={...b[$],...O},u({labels:V})}function ee(O){const $=b.filter((V,he)=>he!==O);u({labels:$})}return e.jsxs(we,{expanded:o.expanded,onToggle:o.onToggle,header:e.jsxs(y,{style:H.row,children:[e.jsx(W,{style:H.accordionHeader,children:S}),e.jsx(C,{size:m.xSmall_8}),e.jsx(ra,{color:a,lineStyle:n})]}),children:[e.jsxs(y,{style:[H.row,{marginBottom:k.size_080}],children:[e.jsx(ze,{selectedValue:a,onChange:N}),e.jsx(C,{size:m.small_12}),e.jsx(En,{selectedValue:n,onChange:O=>{c("strokeStyle",O)}})]}),e.jsx(ln,{selectedValue:l,onChange:O=>u({weight:O})}),e.jsxs(y,{style:[H.row,H.rowSpace],children:[e.jsxs(te,{selectedValue:t,onChange:O=>{c("directionalAxis",O)},"aria-label":"equation prefix",style:[H.dropdownLabel,H.axisMenu],placeholder:"",children:[e.jsx(_,{value:"x",label:"y ="}),e.jsx(_,{value:"y",label:"x ="})]}),e.jsx(C,{size:m.xSmall_8}),e.jsx(Ze,{type:"text","aria-label":"equation",value:r,onChange:O=>{c("equation",O)},style:[H.textField]})]}),e.jsxs(y,{style:[H.row,H.rowSpace],children:[e.jsxs(K,{tag:"label",style:[H.dropdownLabel,H.domainMin],children:["domain min",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Ze,{type:"number",style:H.domainMinField,value:A[0],onChange:O=>{v(0,O)}})]}),e.jsx(C,{size:m.medium_16}),e.jsxs(K,{tag:"label","aria-label":"domain max",style:[H.dropdownLabel,H.domainMax],children:["max",e.jsx(C,{size:m.xxSmall_6}),e.jsx(Ze,{type:"number",style:H.domainMaxField,value:A[1],onChange:O=>{v(1,O)}})]})]}),e.jsxs(we,{header:e.jsx(W,{children:"Example Functions"}),expanded:!1,containerStyle:H.exampleWorkspace,panelStyle:H.exampleAccordionPanel,children:[e.jsxs(K,{tag:"label",style:H.dropdownLabel,children:["Choose a category",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:T,onChange:P,placeholder:"examples",children:I.map(O=>e.jsx(_,{value:O,label:O},O))})]}),f&&e.jsx("ul",{className:R.css(H.exampleContainer),children:q.map((O,$)=>e.jsx(Cl,{category:T,example:O,index:$,pasteEquationFn:c},$))})]}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:H.horizontalRule}),e.jsx(Ue,{ariaLabel:s,getPrepopulatedAriaLabel:w,onChangeProps:O=>{u(O)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:H.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(K,{children:"Visible labels"}),b.map((O,$)=>e.jsx(_e,{...O,expanded:!0,onChangeProps:V=>{U(V,$)},onRemove:()=>{ee($)},containerStyle:H.labelContainer},$)),e.jsx(se,{kind:"tertiary",startIcon:He,onClick:()=>{const O={...Le("label"),coord:[0,-b.length],color:a};u({labels:[...b,O]})},style:H.addButton,children:"Add visible label"}),e.jsx(Ee,{figureType:o.type,onMove:p,onRemove:h})]})},Cl=o=>{const{category:a,example:n,index:r,pasteEquationFn:t}=o,i=g.useId();return e.jsxs("li",{className:R.css(H.exampleRow),children:[e.jsx(le,{icon:ql,kind:"tertiary","aria-label":"paste example","aria-describedby":i,onClick:()=>t("equation",n),size:"medium",style:H.copyPasteButton}),e.jsx(le,{icon:xl,kind:"tertiary","aria-label":"copy example","aria-describedby":i,onClick:()=>navigator.clipboard.writeText(n),size:"medium",style:H.copyPasteButton}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:H.exampleContent,id:i,children:n})]},`${a}-${r}`)},H=R.StyleSheet.create({accordionHeader:{textOverflow:"ellipsis",maxWidth:"calc(100% - 64px)",overflow:"hidden",whiteSpace:"nowrap"},axisMenu:{minWidth:"auto"},copyPasteButton:{flexShrink:"0",margin:"0 2px"},domainMin:{justifyContent:"space-between",width:"calc(((100% - 141px) / 2) + 88.7px)",textWrap:"nowrap"},domainMinField:{width:"calc(100% - 88.7px)"},domainMax:{width:"calc(((100% - 141px) / 2) + 36.2px)"},domainMaxField:{width:"calc(100% - 36.2px)"},dropdownLabel:{alignItems:"center",display:"flex"},exampleAccordionPanel:{alignItems:"start",paddingBottom:"12px",flexDirection:"row",flexWrap:"wrap"},exampleContainer:{background:"white",border:`1px solid ${F.fadedOffBlack16}`,borderRadius:"4px",flexGrow:"1",listStyleType:"none",maxHeight:"88px",margin:"8px 0 0 0",overflowY:"scroll",padding:"4px 12px 4px 4px"},exampleContent:{fontFamily:'"Lato", sans-serif',flexGrow:"1",color:F.offBlack},exampleRow:{alignItems:"center",display:"flex",flexDirection:"row",minHeight:"44px"},exampleWorkspace:{background:F.white50},rowSpace:{marginTop:m.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{flexGrow:"1"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16},labelContainer:{backgroundColor:F.white}});ut.__docgenInfo={description:"",methods:[],displayName:"LockedFunctionSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"function"'},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},equation:{required:!0,tsType:{name:"string"},description:"This is the user-defined equation (as it was typed)"},directionalAxis:{required:!0,tsType:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}]},description:"The independent variable of this function"},domain:{required:!0,tsType:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedFunctionType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const Be=o=>{const{checked:a,label:n,style:r,onChange:t}=o,i=g.useId();return e.jsxs(y,{style:[Tl.row,r],children:[e.jsx(Lr,{id:i,checked:a,onChange:t}),e.jsx(C,{size:m.xSmall_8}),e.jsx(K,{tag:"label",htmlFor:i,children:n})]})},Tl=R.StyleSheet.create({row:{flexDirection:"row",alignItems:"center"}});Be.__docgenInfo={description:"",methods:[],displayName:"LabeledSwitch",props:{label:{required:!0,tsType:{name:"string"},description:""},checked:{required:!0,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newValue: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"newValue"}],return:{name:"void"}}},description:""}}};const Xn=o=>{const{headerLabel:a,coord:n,color:r,filled:t=!0,labels:i,ariaLabel:l,onChangeProps:s,onMove:u,onRemove:p,showPoint:h,error:b,expanded:x,onTogglePoint:S,onToggle:L}=o,A=!u&&!p;async function M(){const v=await Fe(i),I=await oe(`$${n[0]}$`),f=await oe(`$${n[1]}$`);let q=`Point${v} at ${I} comma ${f}`;const N=sn(r);return q+=N,q}function T(v){const I={color:v};I.labels=i.map(f=>({...f,color:v})),s(I)}function P(v){const I=v[0]-n[0],f=v[1]-n[1],q={coord:v};q.labels=i.map(N=>({...N,coord:[N.coord[0]+I,N.coord[1]+f]})),s(q)}function w(v,I){const f=[...i];f[I]={...i[I],...v},s({labels:f})}function c(v){const I=i.filter((f,q)=>q!==v);s({labels:I})}return e.jsxs(we,{expanded:x,onToggle:L,containerStyle:A?xe.definingContainer:void 0,panelStyle:A?xe.definingPanel:void 0,header:e.jsxs(y,{style:xe.row,children:[e.jsx(W,{children:`${a||"Point"} (${n[0]}, ${n[1]})`}),e.jsx(C,{size:m.xSmall_8}),e.jsx(Oa,{color:r,filled:t})]}),children:[e.jsx(J,{coord:n,style:xe.spaceUnder,onChange:P,error:!!b}),S&&e.jsx(Be,{label:"show point on graph",checked:!!h,style:h&&xe.spaceUnder,onChange:S}),(!A||h)&&e.jsxs(e.Fragment,{children:[e.jsx(ze,{selectedValue:r,onChange:T,style:xe.spaceUnder}),e.jsx(Be,{label:"open point",checked:!t,onChange:v=>{s({filled:!v})}})]}),!A&&e.jsxs(e.Fragment,{children:[e.jsx(C,{size:m.small_12}),e.jsx(y,{style:xe.horizontalRule}),e.jsx(Ue,{ariaLabel:l,getPrepopulatedAriaLabel:M,onChangeProps:v=>{s(v)}})]}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:xe.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(K,{children:"Visible labels"}),i.map((v,I)=>g.createElement(_e,{...v,key:I,containerStyle:!A&&xe.lockedPointLabelContainer,expanded:!0,onChangeProps:f=>{w(f,I)},onRemove:()=>{c(I)}})),e.jsx(se,{kind:"tertiary",startIcon:He,onClick:()=>{const v={...Le("label"),coord:[n[0]+.5,n[1]-i.length],color:r};s({labels:[...i,v]})},style:xe.addButton,children:"Add visible label"}),p&&e.jsx(Ee,{figureType:o.type,onMove:u,onRemove:p})]})},xe=R.StyleSheet.create({definingContainer:{marginTop:m.xSmall_8,marginBottom:0,marginLeft:-4,marginRight:-4,backgroundColor:F.white},definingPanel:{paddingBottom:m.xxSmall_6},lockedPointLabelContainer:{backgroundColor:F.white},row:{flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16}});Xn.__docgenInfo={description:"",methods:[],displayName:"LockedPointSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"point"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when the point is moved."},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the point is removed."}}};const ya="The line cannot have length 0.",dt=o=>{const{kind:a,points:n,color:r,lineStyle:t="solid",showPoint1:i,showPoint2:l,weight:s,labels:u,ariaLabel:p,onChangeProps:h,onMove:b,onRemove:x}=o,[S,L]=n,A=a.charAt(0).toUpperCase()+a.slice(1),M=`${A} (${S.coord[0]},
        ${S.coord[1]}), (${L.coord[0]}, ${L.coord[1]})`,T=Na(S.coord,L.coord);async function P(){const f=await Fe(u),q=await Fe(S.labels),N=await Fe(L.labels),U=await oe(`$${S.coord[0]}$`),ee=await oe(`$${S.coord[1]}$`),O=await oe(`$${L.coord[0]}$`),$=await oe(`$${L.coord[1]}$`);let V;switch(a){case"line":V=`${A}${f} through point${q} at ${U} comma ${ee} and point${N} at ${O} comma ${$}`;break;case"ray":V=`${A}${f} from point${q} at ${U} comma ${ee} through point${N} at ${O} comma ${$}`;break;case"segment":V=`${A}${f} from point${q} at ${U} comma ${ee} to point${N} at ${O} comma ${$}`;break;default:throw new tn(a,"Unknown line kind")}const he=sn(r,t,void 0,s);return V+=he,V}function w(f,q){const N=[...n];N[q]={...n[q],...f};const U=be.midpoint(n[0].coord,n[1].coord),ee=be.midpoint(N[0].coord,N[1].coord),O=[ee[0]-U[0],ee[1]-U[1]],$=u.map((V,he)=>({...V,coord:[V.coord[0]+O[0],V.coord[1]+O[1]]}));h({points:N,labels:$})}function c(f){const q=u.map(N=>({...N,color:f}));h({color:f,points:[{...S,color:f,labels:S.labels.map(N=>({...N,color:f}))},{...L,color:f,labels:L.labels.map(N=>({...N,color:f}))}],labels:q})}function v(f,q){const N=[...u];N[q]={...u[q],...f},h({labels:N})}function I(f){const q=u.filter((N,U)=>U!==f);h({labels:q})}return e.jsxs(we,{expanded:o.expanded,onToggle:o.onToggle,header:e.jsxs(y,{style:qe.row,children:[e.jsx(W,{children:M}),e.jsx(C,{size:m.xSmall_8}),e.jsx(ra,{color:r,lineStyle:t})]}),children:[e.jsxs(K,{tag:"label",style:[qe.row,qe.spaceUnder],children:["kind",e.jsx(C,{size:m.xxxSmall_4}),e.jsxs(te,{selectedValue:a,onChange:f=>h({kind:f}),placeholder:"",children:[e.jsx(_,{value:"line",label:"line"}),e.jsx(_,{value:"ray",label:"ray"}),e.jsx(_,{value:"segment",label:"segment"})]})]}),e.jsxs(y,{style:[qe.row,qe.spaceUnder],children:[e.jsx(ze,{selectedValue:r,onChange:c}),e.jsx(C,{size:m.small_12}),e.jsx(En,{selectedValue:t,onChange:f=>h({lineStyle:f})})]}),e.jsx(ln,{selectedValue:s,onChange:f=>h({weight:f})}),T&&e.jsx(K,{style:qe.errorText,children:ya}),e.jsx(Xn,{headerLabel:"Point 1",expanded:!0,showPoint:i,error:T?ya:null,...S,onTogglePoint:f=>h({showPoint1:f}),onChangeProps:f=>w(f,0)}),e.jsx(Xn,{headerLabel:"Point 2",expanded:!0,showPoint:l,error:T?ya:null,...L,onTogglePoint:f=>h({showPoint2:f}),onChangeProps:f=>w(f,1)}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:qe.horizontalRule}),e.jsx(Ue,{ariaLabel:p,getPrepopulatedAriaLabel:P,onChangeProps:f=>{h(f)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:qe.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(K,{children:"Visible labels"}),u.map((f,q)=>g.createElement(_e,{...f,key:q,expanded:!0,onChangeProps:N=>{v(N,q)},onRemove:()=>{I(q)},containerStyle:qe.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:He,onClick:()=>{const f=[0,-1],q=be.add(be.scale(f,u.length),be.midpoint(n[0].coord,n[1].coord)),N={...Le("label"),coord:q,color:r};h({labels:[...u,N]})},style:qe.addButton,children:"Add visible label"}),e.jsx(Ee,{figureType:o.type,onMove:b,onRemove:x})]})},qe=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:m.xSmall_8},errorText:{color:F.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16},labelContainer:{backgroundColor:F.white}});dt.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const Sl=""+new URL("arrow-fat-down-Bfm634Ub.svg",import.meta.url).href,Al=""+new URL("arrow-fat-left-vG4eNh8n.svg",import.meta.url).href,Pl=""+new URL("arrow-fat-right-LGRtshLE.svg",import.meta.url).href,Ll=""+new URL("arrow-fat-up-BqHZ5poh.svg",import.meta.url).href,jl=""+new URL("minus-circle-D0QptBrx.svg",import.meta.url).href,mt=o=>{const{color:a,fillStyle:n,strokeStyle:r}=o;return e.jsx(y,{"aria-label":`${a}, stroke ${r}, fill ${n}`,style:[lr.container,{border:`4px ${r} ${Pe[a]}`}],children:e.jsx(y,{style:[lr.innerSquare,{backgroundColor:Pe[a],opacity:n==="white"?0:na[n]}]})})},lr=R.StyleSheet.create({container:{outline:`2px solid ${F.offWhite}`,width:m.large_24,height:m.large_24,backgroundColor:F.white,alignItems:"center",justifyContent:"center"},innerSquare:{width:20,height:20}});mt.__docgenInfo={description:"",methods:[],displayName:"PolygonSwatch",props:{color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""}}};const pt=o=>{const{points:a,color:n,showVertices:r,fillStyle:t,strokeStyle:i,weight:l,labels:s,ariaLabel:u,expanded:p,onToggle:h,onChangeProps:b,onMove:x,onRemove:S}=o;async function L(){let c=`Polygon${await Fe(s)} with ${a.length} sides, vertices at `;const v=await Promise.all(a.map(async([f,q])=>{const N=await oe(`$${f}$`),U=await oe(`$${q}$`);return`${N} comma ${U}`}));c+=v.join(", ");const I=sn(n,i,t,l);return c+=I,c}function A(w){const c={color:w};c.labels=s.map(v=>({...v,color:w})),b(c)}function M(w){switch(w){case"up":b({points:a.map(([c,v])=>[c,v+1]),labels:s.map(c=>({...c,coord:[c.coord[0],c.coord[1]+1]}))});break;case"down":b({points:a.map(([c,v])=>[c,v-1]),labels:s.map(c=>({...c,coord:[c.coord[0],c.coord[1]-1]}))});break;case"left":b({points:a.map(([c,v])=>[c-1,v]),labels:s.map(c=>({...c,coord:[c.coord[0]-1,c.coord[1]]}))});break;case"right":b({points:a.map(([c,v])=>[c+1,v]),labels:s.map(c=>({...c,coord:[c.coord[0]+1,c.coord[1]]}))});break}}function T(w,c){const v=[...s];v[c]={...s[c],...w},b({labels:v})}function P(w){const c=s.filter((v,I)=>I!==w);b({labels:c})}return e.jsxs(we,{expanded:p,onToggle:h,header:e.jsxs(y,{style:Y.row,children:[e.jsx(W,{children:`Polygon, ${a.length} sides`}),e.jsx(C,{size:m.xSmall_8}),e.jsx(mt,{color:n,fillStyle:t,strokeStyle:i})]}),children:[e.jsxs(y,{style:[Y.row,Y.spaceUnder],children:[e.jsx(ze,{selectedValue:n,onChange:A}),e.jsx(C,{size:m.medium_16}),e.jsxs(K,{tag:"label",style:[Y.row,Y.truncatedWidth],children:["fill",e.jsx(C,{size:m.xxSmall_6}),e.jsx(te,{selectedValue:t,onChange:w=>b({fillStyle:w}),placeholder:"",children:Object.keys(na).map(w=>e.jsx(_,{value:w,label:w},w))})]})]}),e.jsx(En,{selectedValue:i,onChange:w=>b({strokeStyle:w}),containerStyle:Y.spaceUnder}),e.jsx(ln,{selectedValue:l,onChange:w=>b({weight:w}),containerStyle:Y.spaceUnder}),e.jsx(Be,{label:"show vertices",checked:r,onChange:w=>b({showVertices:w}),style:Y.spaceUnder}),e.jsxs(we,{header:e.jsx(W,{children:"Points"}),expanded:!0,containerStyle:Y.pointAccordionContainer,panelStyle:Y.pointAccordionPanel,children:[a.map((w,c)=>{const v=String.fromCharCode(65+c);return e.jsxs(y,{style:[Y.row,Y.spaceUnder],children:[e.jsx(W,{children:`${v}:`}),e.jsx(C,{size:m.medium_16}),e.jsx(J,{coord:w,labels:["x","y"],onChange:I=>{const f=[...a];f[c]=I,o.onChangeProps({points:f})}}),a.length>3&&e.jsx(le,{"aria-label":`Delete polygon point ${v}`,icon:jl,kind:"tertiary",actionType:"destructive",onClick:()=>{const I=[...a];I.splice(c,1),o.onChangeProps({points:I})},style:Y.icon})]},`locked-polygon-point-index-${c}`)}),e.jsxs(y,{style:[Y.row,Y.polygonActionsContainer],children:[e.jsx(se,{kind:"tertiary",startIcon:He,onClick:()=>{o.onChangeProps({points:[...a,[0,0]]})},children:"Add point"}),e.jsx(zn,{}),e.jsxs(y,{style:Y.movementButtonsContainer,children:[e.jsx(le,{"aria-label":"Move polygon up",size:"small",icon:Ll,kind:"tertiary",onClick:()=>M("up")}),e.jsxs(y,{style:Y.row,children:[e.jsx(le,{"aria-label":"Move polygon left",size:"small",icon:Al,kind:"tertiary",onClick:()=>M("left")}),e.jsx(le,{"aria-label":"Move polygon down",size:"small",icon:Sl,kind:"tertiary",onClick:()=>M("down")}),e.jsx(le,{"aria-label":"Move polygon right",size:"small",icon:Pl,kind:"tertiary",onClick:()=>M("right")})]})]})]})]}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:Y.horizontalRule}),e.jsx(Ue,{ariaLabel:u,getPrepopulatedAriaLabel:L,onChangeProps:w=>{b(w)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:Y.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(K,{children:"Visible labels"}),s.map((w,c)=>g.createElement(_e,{...w,key:c,expanded:!0,onChangeProps:v=>{T(v,c)},onRemove:()=>{P(c)},containerStyle:Y.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:He,onClick:()=>{const w={...Le("label"),coord:[a[0][0],a[0][1]-s.length],color:n};b({labels:[...s,w]})},style:Y.addButton,children:"Add visible label"}),e.jsx(Ee,{figureType:o.type,onMove:x,onRemove:S})]})},Y=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},pointAccordionContainer:{backgroundColor:F.white},pointAccordionPanel:{alignItems:"start"},icon:{marginInlineStart:m.xxxSmall_4},polygonActionsContainer:{width:"100%"},movementButtonsContainer:{display:"flex",flexDirection:"column",alignItems:"center",minWidth:"fit-content"},spaceUnder:{marginBottom:m.xSmall_8},truncatedWidth:{minWidth:0},addButton:{alignSelf:"start"},labelContainer:{backgroundColor:F.white},horizontalRule:{height:1,backgroundColor:F.offBlack16}});pt.__docgenInfo={description:"",methods:[],displayName:"LockedPolygonSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"Partial<LockedPolygonType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."}}};const Il="The vector cannot have length 0.",ct=o=>{const{points:a,color:n,weight:r,labels:t,ariaLabel:i,onChangeProps:l,onMove:s,onRemove:u}=o,[p,h]=a,b=`Vector (${p[0]}, ${p[1]}), (${h[0]}, ${h[1]})`,x=Na(p,h);async function S(){const P=await Fe(t),w=await oe(`$${p[0]}$`),c=await oe(`$${p[1]}$`),v=await oe(`$${h[0]}$`),I=await oe(`$${h[1]}$`);let f=`Vector${P} from ${w} comma ${c} to ${v} comma ${I}`;const q=sn(n,"solid",void 0,r);return f+=q,f}function L(P,w){if(typeof P<"u"){const c=[...a];c[w]=[...P];const v=be.midpoint(p,h),I=be.midpoint(c[0],c[1]),f=be.sub(I,v),q=t.map(N=>({...N,coord:be.add(N.coord,f)}));l({points:c,labels:q})}}function A(P){const w={color:P};w.labels=t.map(c=>({...c,color:P})),l(w)}function M(P,w){const c=[...t];c[w]={...t[w],...P},l({labels:c})}function T(P){const w=t.filter((c,v)=>v!==P);l({labels:w})}return e.jsxs(we,{expanded:o.expanded,onToggle:o.onToggle,header:e.jsxs(y,{style:ye.row,children:[e.jsx(W,{children:b}),e.jsx(C,{size:m.xSmall_8}),e.jsx(ra,{color:n,lineStyle:"solid"})]}),children:[e.jsx(ze,{selectedValue:n,onChange:A,style:{marginBottom:k.size_080}}),e.jsx(ln,{selectedValue:r,onChange:P=>l({weight:P})}),x&&e.jsx(K,{style:ye.errorText,children:Il}),e.jsx(we,{expanded:!0,containerStyle:ye.container,panelStyle:ye.accordionPanel,header:e.jsx(y,{style:ye.row,children:e.jsx(W,{children:`Tail (${p[0]}, ${p[1]})`})}),children:e.jsx(J,{coord:p,error:x,onChange:P=>{L(P,0)}})}),e.jsx(we,{expanded:!0,containerStyle:ye.container,panelStyle:ye.accordionPanel,header:e.jsx(y,{style:ye.row,children:e.jsx(W,{children:`Tip (${h[0]}, ${h[1]})`})}),children:e.jsx(J,{coord:h,error:x,onChange:P=>{L(P,1)}})}),e.jsx(C,{size:m.small_12}),e.jsx(y,{style:ye.horizontalRule}),e.jsx(Ue,{ariaLabel:i,getPrepopulatedAriaLabel:S,onChangeProps:P=>{l(P)}}),e.jsx(C,{size:m.xxxSmall_4}),e.jsx(y,{style:ye.horizontalRule}),e.jsx(C,{size:m.small_12}),e.jsx(K,{children:"Visible labels"}),t.map((P,w)=>g.createElement(_e,{...P,key:w,expanded:!0,onChangeProps:c=>{M(c,w)},onRemove:()=>{T(w)},containerStyle:ye.labelContainer})),e.jsx(se,{kind:"tertiary",startIcon:He,onClick:()=>{const P=[0,-1],w=be.add(be.scale(P,t.length),be.midpoint(p,h)),c={...Le("label"),coord:w,color:n};l({labels:[...t,c]})},style:ye.addButton,children:"Add visible label"}),e.jsx(Ee,{figureType:o.type,onMove:s,onRemove:u})]})},ye=R.StyleSheet.create({accordionPanel:{paddingBottom:m.medium_16},container:{marginTop:m.xSmall_8,marginBottom:0,marginLeft:-4,marginRight:-4,backgroundColor:F.white},errorText:{color:F.red,marginTop:m.xSmall_8},row:{flexDirection:"row",alignItems:"center"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:F.offBlack16},labelContainer:{backgroundColor:F.white}});ct.__docgenInfo={description:"",methods:[],displayName:"LockedVectorSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"vector"'},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},weight:{required:!0,tsType:{name:"union",raw:'"thin" | "medium" | "thick"',elements:[{name:"literal",value:'"thin"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"thick"'}]},description:""},labels:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};const ht=o=>{switch(o.type){case"point":return e.jsx(Xn,{...o});case"line":return e.jsx(dt,{...o});case"vector":return e.jsx(ct,{...o});case"ellipse":return e.jsx(st,{...o});case"polygon":return e.jsx(pt,{...o});case"function":return e.jsx(ut,{...o});case"label":return e.jsx(_e,{...o});default:throw new tn(o)}};ht.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettings",props:{onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."}}};const gt=o=>{const a=Array((o.figures??[]).length).fill(!1),[n,r]=g.useState(a),[t,i]=g.useState(!0),l=g.useId(),{figures:s,onChange:u}=o;function p(T){const w={lockedFigures:[...s||[],Le(T)]};u(w),r([...n,!0])}function h(T,P){if(T===0&&(P==="back"||P==="backward")||s&&T===s.length-1&&(P==="front"||P==="forward"))return;const c=[...s||[]],v=[...n],[I]=c.splice(T,1);switch(v.splice(T,1),P){case"back":c.unshift(I),v.unshift(!0);break;case"backward":c.splice(T-1,0,I),v.splice(T-1,0,!0);break;case"forward":c.splice(T+1,0,I),v.splice(T+1,0,!0);break;case"front":c.push(I),v.push(!0);break}u({lockedFigures:c}),r(v)}function b(T){if(window.confirm("Are you sure you want to delete this figure?")){const P=s||[];u({lockedFigures:[...P.slice(0,T),...P.slice(T+1)]});const w=[...n];w.splice(T,1),r(w)}}function x(T,P){const w=s||[],c={lockedFigures:[...w.slice(0,T),{...w[T],...P},...w.slice(T+1)]};u(c)}function S(T){r(Array(s==null?void 0:s.length).fill(T))}const L=n.every(T=>!T),A=L?"Expand all":"Collapse all",M=!!(s!=null&&s.length);return e.jsxs(e.Fragment,{children:[e.jsx(on,{title:"Locked Figures",isOpen:t,onToggle:()=>i(!t),isCollapsible:!0}),t&&e.jsxs(y,{children:[s==null?void 0:s.map((T,P)=>e.jsx(ht,{expanded:n[P],onToggle:w=>{const c=[...n];c[P]=w,r(c)},...T,onChangeProps:w=>x(P,w),onMove:w=>h(P,w),onRemove:()=>b(P)},`${l}-locked-${T}-${P}`)),e.jsxs(y,{style:sr.buttonContainer,children:[e.jsx(at,{id:`${l}-select`,onChange:p}),e.jsx(C,{size:m.small_12}),M&&e.jsx(se,{kind:"secondary",onClick:()=>S(L),style:sr.button,children:A})]})]})]})},sr=R.StyleSheet.create({buttonContainer:{flexDirection:"row",alignItems:"center"},button:{marginTop:m.xSmall_8,flexGrow:1}});gt.__docgenInfo={description:"",methods:[],displayName:"LockedFiguresSection",props:{figures:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<InteractiveGraphEditorProps>"},name:"props"}],return:{name:"void"}}},description:""}}};const Nl=""+new URL("arrow-counter-clockwise-bold-BmDV9QhN.svg",import.meta.url).href,{getClockwiseAngle:Rl}=Ia;function Fl(o){if("startCoords"in o)return o.startCoords}function Ol(o,a,n){switch(o.type){case"linear":case"ray":return Mr({...o,startCoords:void 0},a,n);case"segment":return Dr({...o,startCoords:void 0},a,n);case"linear-system":return _r({...o,startCoords:void 0},a,n);case"circle":const r=Or({...o,startCoords:void 0}),t=zr(Er(r.radiusPoint,r.center));return{center:r.center,radius:t};case"sinusoid":return Fr({...o,startCoords:void 0},a,n);case"quadratic":return Rr({...o,startCoords:void 0},a,n);case"point":return Nr({...o,startCoords:void 0},a,n);case"polygon":return Ir({...o,startCoords:void 0},a,n);case"angle":return jr({graph:{...o,startCoords:void 0},range:a,step:n});default:return}}const zl=o=>{const a=o[0],n=o[1],r=n[1]-a[1],t=Math.PI/(2*(n[0]-a[0])),i=a[0]*t,l=a[1];return"y = "+r.toFixed(3)+"sin("+t.toFixed(3)+"x - "+i.toFixed(3)+") + "+l.toFixed(3)},El=o=>{const a=o[0],n=o[1],r=o[2],t=(a[0]-n[0])*(a[0]-r[0])*(n[0]-r[0]);if(t===0)return"Division by zero error";const i=(r[0]*(n[1]-a[1])+n[0]*(a[1]-r[1])+a[0]*(r[1]-n[1]))/t,l=(r[0]*r[0]*(a[1]-n[1])+n[0]*n[0]*(r[1]-a[1])+a[0]*a[0]*(n[1]-r[1]))/t,s=(n[0]*r[0]*(n[0]-r[0])*a[1]+r[0]*a[0]*(r[0]-a[0])*n[1]+a[0]*n[0]*(a[0]-n[0])*r[1])/t;return"y = "+i.toFixed(3)+"x^2 + "+l.toFixed(3)+"x + "+s.toFixed(3)},_l=(o,a=!1)=>{const n=o[1];return`${Rl(o,a).toFixed(0)}° angle at (${n[0]}, ${n[1]})`},Dl=(o,a)=>{if(a)return!1;switch(o.type){case"point":return o.numPoints!=="unlimited";case"polygon":return o.numSides!=="unlimited"&&o.snapTo!=="angles"&&o.snapTo!=="sides";case"none":return!1;case"angle":case"circle":case"linear":case"linear-system":case"quadratic":case"ray":case"segment":case"sinusoid":return!0;default:throw new tn(o)}},yt=o=>{const{startCoords:a,allowReflexAngles:n,onChange:r}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:hn.equationSection,children:[e.jsx(K,{children:"Starting equation:"}),e.jsx(ea,{style:hn.equationBody,children:_l(a,n)})]}),e.jsxs(y,{style:hn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:t=>r([t,a[1],a[2]])})]}),e.jsxs(y,{style:hn.tile,children:[e.jsx(W,{children:"Vertex:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:t=>r([a[0],t,a[2]])})]}),e.jsxs(y,{style:hn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[2],labels:["x","y"],onChange:t=>r([a[0],a[1],t])})]})]})},hn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:F.fadedOffBlack8,border:`1px solid ${F.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Re.size.xSmall}});yt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsAngle",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: AngleCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const bt=o=>{const{startCoords:a,onChange:n}=o,[r,t]=g.useState(a.radius.toString());g.useEffect(()=>{t(a.radius.toString())},[a.radius]);function i(l){t(l),!(isNaN(+l)||l===""||+l==0)&&n({center:a.center,radius:parseFloat(l)})}return e.jsxs(y,{style:Vn.tile,children:[e.jsxs(y,{style:Vn.row,children:[e.jsx(W,{children:"Center:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a.center,labels:["x","y"],onChange:l=>n({center:l,radius:a.radius})})]}),e.jsx(C,{size:m.small_12}),e.jsxs(W,{tag:"label",style:Vn.row,children:["Radius:",e.jsx(C,{size:m.small_12}),e.jsx(Fn,{value:r,onChange:i,style:Vn.textField})]})]})},Vn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:m.xxxLarge_64}});bt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsCircle",props:{startCoords:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CircleCoords) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},name:"startCoords"}],return:{name:"void"}}},description:""}}};const wt=o=>{const{startCoords:a,onChange:n}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:ur.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:r=>n([r,a[1]])})]}),e.jsxs(y,{style:ur.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:r=>n([a[0],r])})]})]})},ur=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"}});wt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsLine",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const ft=o=>{const{startCoords:a,type:n,onChange:r}=o,t=n==="segment"?"Segment":"Line";return e.jsx(e.Fragment,{children:a.map((i,l)=>e.jsxs(we,{header:e.jsx(W,{children:`${t} ${l+1}`}),expanded:!0,children:[e.jsxs(y,{style:dr.nestedTile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:i[0],labels:["x","y"],onChange:s=>{const u=[...a];u[l]=[s,i[1]],r(u)}})]}),e.jsxs(y,{style:dr.nestedTile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:i[1],labels:["x","y"],onChange:s=>{const u=[...a];u[l]=[i[0],s],r(u)}})]})]},`segment-${l}-start-coords`))})},dr=R.StyleSheet.create({nestedTile:{paddingBottom:m.small_12,flexDirection:"row",alignItems:"center"}});ft.__docgenInfo={description:"",methods:[],displayName:"StartCoordsMultiline",props:{type:{required:!0,tsType:{name:"union",raw:'"linear-system" | "segment"',elements:[{name:"literal",value:'"linear-system"'},{name:"literal",value:'"segment"'}]},description:""},startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const kt=o=>{const{startCoords:a,onChange:n}=o;return e.jsx(e.Fragment,{children:a.map((r,t)=>e.jsxs(y,{style:Ml.tile,children:[e.jsx(W,{children:`Point ${t+1}:`}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:r,labels:["x","y"],onChange:i=>{const l=[...a];l[t]=i,n(l)}})]},t))})},Ml=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"}});kt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsPoint",props:{startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"Coord[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: Coord[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"Coord[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const vt=o=>{const{startCoords:a,onChange:n}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:gn.equationSection,children:[e.jsx(K,{children:"Starting equation:"}),e.jsx(ea,{style:gn.equationBody,children:El(a)})]}),e.jsxs(y,{style:gn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:r=>n([r,a[1],a[2]])})]}),e.jsxs(y,{style:gn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:r=>n([a[0],r,a[2]])})]}),e.jsxs(y,{style:gn.tile,children:[e.jsx(W,{children:"Point 3:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[2],labels:["x","y"],onChange:r=>n([a[0],a[1],r])})]})]})},gn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:F.fadedOffBlack8,border:`1px solid ${F.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Re.size.xSmall}});vt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsQuadratic",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: [Coord, Coord, Coord]) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const xt=o=>{const{startCoords:a,onChange:n}=o;return e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:Wn.equationSection,children:[e.jsx(K,{children:"Starting equation:"}),e.jsx(ea,{style:Wn.equationBody,children:zl(a)})]}),e.jsxs(y,{style:Wn.tile,children:[e.jsx(W,{children:"Point 1:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[0],labels:["x","y"],onChange:r=>n([r,a[1]])})]}),e.jsxs(y,{style:Wn.tile,children:[e.jsx(W,{children:"Point 2:"}),e.jsx(C,{size:m.small_12}),e.jsx(J,{coord:a[1],labels:["x","y"],onChange:r=>n([a[0],r])})]})]})},Wn=R.StyleSheet.create({tile:{backgroundColor:F.fadedBlue8,marginTop:m.xSmall_8,padding:m.small_12,borderRadius:m.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:m.small_12},equationBody:{backgroundColor:F.fadedOffBlack8,border:`1px solid ${F.fadedOffBlack32}`,marginTop:m.xSmall_8,paddingLeft:m.xSmall_8,paddingRight:m.xSmall_8,fontSize:Re.size.xSmall}});xt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSinusoid",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: SinusoidCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const $l=o=>{const{type:a,range:n,step:r,allowReflexAngles:t,onChange:i}=o;switch(a){case"linear":case"ray":const l=Mr(o,n,r);return e.jsx(wt,{startCoords:l,onChange:i});case"linear-system":case"segment":const s=a==="segment"?Dr(o,n,r):_r(o,n,r);return e.jsx(ft,{type:a,startCoords:s,onChange:i});case"circle":const u=Or(o),p=zr(Er(u.radiusPoint,u.center));return e.jsx(bt,{startCoords:{center:u.center,radius:p},onChange:i});case"sinusoid":const h=Fr(o,n,r);return e.jsx(xt,{startCoords:h,onChange:i});case"quadratic":const b=Rr(o,n,r);return e.jsx(vt,{startCoords:b,onChange:i});case"point":case"polygon":const x=a==="point"?Nr(o,n,r):Ir(o,n,r);return e.jsx(kt,{startCoords:x,onChange:i});case"angle":const S=jr({graph:o,range:n,step:r});return e.jsx(yt,{startCoords:S,allowReflexAngles:t,onChange:i});default:return null}},qt=o=>{const{range:a,step:n,onChange:r}=o,[t,i]=g.useState(!0);return e.jsxs(y,{children:[e.jsx(on,{isCollapsible:!0,title:"Start coordinates",isOpen:t,onToggle:()=>i(!t)}),t&&e.jsxs(e.Fragment,{children:[e.jsx($l,{...o}),e.jsx(C,{size:m.small_12}),e.jsx(se,{startIcon:Nl,kind:"tertiary",size:"small",onClick:()=>{r(Ol(o,a,n))},children:"Use default start coordinates"})]})]})};qt.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSettings",props:{range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: StartCoords) => void",signature:{arguments:[{type:{name:'Extract["startCoords"]',raw:`Extract<
    PerseusGraphType,
    GraphTypesThatHaveStartCoords
>["startCoords"]`},name:"startCoords"}],return:{name:"void"}}},description:""}}};const{InfoTip:Ve}=ae,ba=wo.widget,Vl=z.map(z.range(3,13),function(o){return e.jsx(_,{value:`${o}`,label:`${o} sides`},`polygon-sides-${o}`)});class Jn extends g.Component{constructor(){super(...arguments);d(this,"displayName","InteractiveGraphEditor");d(this,"className","perseus-widget-interactive-graph");d(this,"changeStartCoords",n=>{var t;if(!((t=this.props.graph)!=null&&t.type))return;const r={...this.props.graph,startCoords:n};this.props.onChange({graph:r})});d(this,"getSaveWarnings",()=>{var r;const n=[];for(const t of this.props.lockedFigures??[])t.type==="line"&&Na(t.points[0].coord,t.points[1].coord)&&n.push("The line cannot have length 0.");return((r=this.props.graph)==null?void 0:r.type)==="polygon"&&this.props.graph.numSides==="unlimited"&&this.props.graph.coords===null&&n.push("Polygon must be closed."),n})}serialize(){const n=z.pick(this.props,"step","backgroundImage","markings","labels","labelLocation","showProtractor","showTooltips","range","gridStep","snapStep","lockedFigures","fullGraphAriaLabel","fullGraphAriaDescription"),r=this.refs.graph;if(r){const t=r&&r.getUserInput();z.extend(n,{graph:{type:t.type,startCoords:this.props.graph&&Fl(this.props.graph)},correct:t}),z.each(["allowReflexAngles","angleOffsetDeg","numPoints","numSides","numSegments","showAngles","showSides","snapTo","snapDegrees"],function(i){z.has(t,i)&&(n.graph[i]=t[i])})}return n}render(){let n,r;const t=this.props.gridStep||Ce.getGridStep(this.props.range,this.props.step,fa.defaultBoxSize),i=this.props.snapStep||Ce.snapStepFromGridStep(t),l=Cr.SMALL;if(this.props.valid===!0){const s=this.props.correct,u={ref:"graph",box:this.props.box,range:this.props.range,labels:this.props.labels,labelLocation:this.props.labelLocation,step:this.props.step,gridStep:t,snapStep:i,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,lockedFigures:this.props.lockedFigures,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,trackInteraction:function(){},userInput:s,handleUserInput:p=>{let h=this.props.correct;Q(p!=null),h.type===p.type?h=Wl(h,p):h=p,this.props.onChange({correct:h,graph:this.props.graph})}};n=e.jsx(ba,{...u,containerSizeClass:l,apiOptions:{...this.props.apiOptions,isMobile:!1}}),r=ba.getEquationString(u)}else n=e.jsx("div",{className:"perseus-error",children:this.props.valid});return e.jsx(Nn,{children:s=>{var u,p,h,b,x,S,L,A,M,T,P,w,c,v,I,f;return e.jsxs(y,{children:[e.jsx(ne,{label:"Answer type:",children:e.jsx(Yr,{graphType:((u=this.props.graph)==null?void 0:u.type)??ba.defaultProps.userInput.type,onChange:q=>{this.props.onChange({graph:{type:q},correct:{type:q}})}})}),e.jsx(Zr,{ariaLabelValue:this.props.fullGraphAriaLabel??"",ariaDescriptionValue:this.props.fullGraphAriaDescription??"",onChange:this.props.onChange}),e.jsx(Qr,{id:s,equationString:r,children:n}),((p=this.props.correct)==null?void 0:p.type)==="point"&&e.jsx(ne,{label:"Number of Points:",children:e.jsx(Jr,{numPoints:(h=this.props.correct)==null?void 0:h.numPoints,onChange:q=>{this.props.onChange({correct:{type:"point",numPoints:q},graph:{type:"point",numPoints:q}})}})}),((b=this.props.correct)==null?void 0:b.type)==="angle"&&e.jsxs(e.Fragment,{children:[e.jsxs(y,{style:Ie.row,children:[e.jsx(ce,{label:e.jsx(Ne,{children:"Show angle measures"}),checked:!!((x=this.props.correct)!=null&&x.showAngles),onChange:q=>{var N;((N=this.props.graph)==null?void 0:N.type)==="angle"&&(Q(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:q},graph:{...this.props.graph,showAngles:q}}))}}),e.jsx(Ve,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(y,{style:Ie.row,children:[e.jsx(ce,{label:e.jsx(Ne,{children:"Allow reflex angles"}),checked:!!((S=this.props.correct)!=null&&S.allowReflexAngles),onChange:q=>{var U,ee;Q(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),Q(((U=this.props.graph)==null?void 0:U.type)==="angle",`Expected graph type to be angle, but got ${(ee=this.props.graph)==null?void 0:ee.type}`);const N={allowReflexAngles:q};this.props.onChange({correct:{...this.props.correct,...N},graph:{...this.props.graph,...N}})}}),e.jsx(Ve,{children:e.jsx("p",{children:"Allow students to be able to create reflex angles."})})]})]}),((L=this.props.correct)==null?void 0:L.type)==="polygon"&&e.jsxs(e.Fragment,{children:[e.jsx(ne,{label:"Number of sides:",children:e.jsx(te,{selectedValue:(A=this.props.correct)!=null&&A.numSides?`${this.props.correct.numSides}`:"3",placeholder:"",onChange:q=>{var U;Q(((U=this.props.graph)==null?void 0:U.type)==="polygon");const N={numSides:Xr(q),coords:void 0,startCoords:void 0,snapTo:"grid"};this.props.onChange({correct:{...this.props.correct,...N},graph:{...this.props.graph,...N}})},style:Ie.singleSelectShort,children:[...Vl,e.jsx(_,{value:"unlimited",label:"unlimited sides"},"unlimited")]},"polygon-select")}),e.jsxs(ne,{label:"Snap to:",children:[e.jsxs(te,{selectedValue:((M=this.props.correct)==null?void 0:M.snapTo)||"grid",placeholder:"",onChange:q=>{var U,ee;Q(this.props.correct.type==="polygon",`Expected correct answer type to be polygon, but got ${this.props.correct.type}`),Q(((U=this.props.graph)==null?void 0:U.type)==="polygon",`Expected graph type to be polygon, but got ${(ee=this.props.graph)==null?void 0:ee.type}`);const N={snapTo:q,coords:null};this.props.onChange({correct:{...this.props.correct,...N},graph:{...this.props.graph,...N}})},style:Ie.singleSelectShort,children:[e.jsx(_,{value:"grid",label:"grid"}),((T=this.props.correct)==null?void 0:T.numSides)!=="unlimited"&&e.jsx(_,{value:"angles",label:"interior angles"}),((P=this.props.correct)==null?void 0:P.numSides)!=="unlimited"&&e.jsx(_,{value:"sides",label:"side measures"})]}),e.jsxs(Ve,{children:[e.jsx("p",{children:"These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."}),e.jsx("p",{children:"The interior angle and side measure options guide the points to the nearest whole angle or side measure respectively."})]})]}),e.jsxs(y,{style:Ie.row,children:[e.jsx(ce,{label:e.jsx(Ne,{children:"Show angle measures"}),checked:!!((w=this.props.correct)!=null&&w.showAngles),onChange:()=>{var q;((q=this.props.graph)==null?void 0:q.type)==="polygon"&&(Q(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:!this.props.correct.showAngles},graph:{...this.props.graph,showAngles:!this.props.graph.showAngles}}))}}),e.jsx(Ve,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(y,{style:Ie.row,children:[e.jsx(ce,{label:e.jsx(Ne,{children:"Show side measures"}),checked:!!((c=this.props.correct)!=null&&c.showSides),onChange:()=>{var q;((q=this.props.graph)==null?void 0:q.type)==="polygon"&&this.props.correct.type==="polygon"&&this.props.onChange({correct:{...this.props.correct,showSides:!this.props.correct.showSides},graph:{...this.props.graph,showSides:!this.props.graph.showSides}})}}),e.jsx(Ve,{children:e.jsx("p",{children:"Displays the side lengths."})})]})]}),((v=this.props.correct)==null?void 0:v.type)==="segment"&&e.jsx(ne,{label:"Number of segments:",children:e.jsx(nt,{numSegments:(I=this.props.correct)==null?void 0:I.numSegments,onChange:q=>{this.props.onChange({correct:{type:"segment",numSegments:q,coords:null},graph:{type:"segment",numSegments:q}})}})}),((f=this.props.graph)==null?void 0:f.type)&&Dl(this.props.graph,this.props.static)&&e.jsx(qt,{...this.props.graph,range:this.props.range,step:this.props.step,onChange:this.changeStartCoords}),e.jsx(et,{graphId:s,correct:this.props.correct,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,lockedFigures:this.props.lockedFigures}),e.jsx(Kn,{box:qr(l),range:this.props.range,labels:this.props.labels,labelLocation:this.props.labelLocation,step:this.props.step,gridStep:t,snapStep:i,valid:this.props.valid,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,onChange:this.props.onChange}),this.props.correct.type==="polygon"&&e.jsxs(ne,{label:"Student answer must",children:[e.jsxs(te,{selectedValue:this.props.correct.match||"exact",onChange:q=>{Q(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`);const N={...this.props.correct,match:q};this.props.onChange({correct:N})},placeholder:"",style:Ie.singleSelectShort,children:[e.jsx(_,{value:"exact",label:"match exactly"}),e.jsx(_,{value:"congruent",label:"be congruent"}),e.jsx(_,{value:"approx",label:"be approximately congruent"}),e.jsx(_,{value:"similar",label:"be similar"})]}),e.jsx(Ve,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Match Exactly:"})," Match exactly in size, orientation, and location on the grid even if it is not shown in the background."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Congruent:"})," Be congruent in size and shape, but can be located anywhere on the grid."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Approximately Congruent:"})," ","Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid."," ",e.jsx("em",{children:"Use this with snapping to angle measure."})]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Similar:"})," Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."]})})]})})]}),this.props.correct.type==="angle"&&e.jsxs(ne,{label:"Student answer must",children:[e.jsxs(te,{selectedValue:this.props.correct.match||"exact",onChange:q=>{Q(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,match:q}})},placeholder:"",style:Ie.singleSelectShort,children:[e.jsx(_,{value:"exact",label:"match exactly"}),e.jsx(_,{value:"congruent",label:"be congruent"})]}),e.jsx(Ve,{children:e.jsx("p",{children:"Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."})})]}),e.jsx(gt,{figures:this.props.lockedFigures,onChange:this.props.onChange})]})}})}}d(Jn,"widgetName","interactive-graph"),d(Jn,"defaultProps",{...fo.defaultWidgetOptions,valid:!0,lockedFigures:[]});function Wl(o,a){if(o.type!==a.type)throw new Error(`Cannot merge graphs with different types (${o.type} and ${a.type})`);switch(o.type){case"angle":return Q(a.type==="angle"),{...o,...a};case"circle":return Q(a.type==="circle"),{...o,...a};case"linear":return Q(a.type==="linear"),{...o,...a};case"linear-system":return Q(a.type==="linear-system"),{...o,...a};case"none":return Q(a.type==="none"),{...o,...a};case"point":return Q(a.type==="point"),{...o,...a};case"polygon":return Q(a.type==="polygon"),{...o,...a};case"quadratic":return Q(a.type==="quadratic"),{...o,...a};case"ray":return Q(a.type==="ray"),{...o,...a};case"segment":return Q(a.type==="segment"),{...o,...a};case"sinusoid":return Q(a.type==="sinusoid"),{...o,...a};default:throw new tn(o)}}const Ie=R.StyleSheet.create({singleSelectShort:{height:26},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center"}});Jn.__docgenInfo={description:`An editor for the InteractiveGraph widget, which allows the user to
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["userInput"]',raw:'InteractiveGraphProps["userInput"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}}},description:""},static:{required:!1,tsType:{name:"boolean"},description:""}}};const{RangeInput:Gl}=ae,Bl=ko.widget,mr=6;class qn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"onMatrixBoardSizeChange",n=>{const r=xo(this.props.answers);if(n[0]!==null&&n[1]!==null){n=[Math.round(Math.min(Math.max(n[0],1),mr)),Math.round(Math.min(Math.max(n[1],1),mr))];const t=z(Math.min(n[0],r[0])).times(i=>z(Math.min(n[1],r[1])).times(l=>this.props.answers[i][l]));this.props.onChange({matrixBoardSize:n,answers:t})}});d(this,"serialize",()=>de.serialize.call(this))}render(){const n={onBlur:()=>{},onFocus:()=>{},trackInteraction:()=>{},userInput:{answers:this.props.answers},handleUserInput:r=>{this.change({answers:r.answers})},...this.props};return e.jsxs("div",{className:"perseus-matrix-editor",children:[e.jsxs("div",{className:"perseus-widget-row",children:[" ","Max matrix size:"," ",e.jsx(Gl,{value:this.props.matrixBoardSize,onChange:this.onMatrixBoardSizeChange,format:this.props.labelStyle,useArrowKeys:!0})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(Bl,{...n})}),e.jsxs("div",{className:"perseus-widget-row",children:[" ","Matrix prefix:"," ",e.jsx(Oe,{ref:"prefix",apiOptions:this.props.apiOptions,content:this.props.prefix,widgetEnabled:!1,onChange:r=>{this.change({prefix:r.content})}})]}),e.jsxs("div",{className:"perseus-widget-row",children:[" ","Matrix suffix:"," ",e.jsx(Oe,{ref:"suffix",apiOptions:this.props.apiOptions,content:this.props.suffix,widgetEnabled:!1,onChange:r=>{this.change({suffix:r.content})}})]})]})}}d(qn,"propTypes",{...ue,matrixBoardSize:j.arrayOf(j.number).isRequired,answers:j.arrayOf(j.arrayOf(j.number)),prefix:j.string,suffix:j.string,cursorPosition:j.arrayOf(j.number)}),d(qn,"widgetName","matrix"),d(qn,"defaultProps",vo.defaultWidgetOptions);qn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onMatrixBoardSizeChange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MatrixEditor",props:{matrixBoardSize:{defaultValue:{value:"[3, 3]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1},answers:{defaultValue:{value:"[[]]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"arrayOf",value:{name:"number"}}},required:!1},prefix:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},suffix:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},cursorPosition:{defaultValue:{value:"[0, 0]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Hl,NumberInput:Gn,RangeInput:Ul}=ae,Kl={url:null,top:0,left:0};class Cn extends g.Component{constructor(){super(...arguments);d(this,"className","perseus-widget-measurer");d(this,"change",(...n)=>ie.apply(this,n));d(this,"_changeUrl",n=>{this._changeImage("url",n.target.value)});d(this,"_changeTop",n=>{this._changeImage("top",n)});d(this,"_changeLeft",n=>{this._changeImage("left",n)});d(this,"_changeImage",(n,r)=>{const t=z.clone(this.props.image);t[n]=r,this.change("image",t)});d(this,"renderLabelChoices",n=>z.map(n,function(r){const[t,i]=r;return e.jsx("option",{value:i,children:t},i)}));d(this,"serialize",()=>de.serialize.call(this))}render(){const n=z.extend({},Kl,this.props.image);return e.jsxs("div",{className:"perseus-widget-measurer",children:[e.jsx("div",{children:"Image displayed under protractor and/or ruler:"}),e.jsxs("div",{children:["URL:"," ",e.jsx("input",{type:"text",className:"perseus-widget-measurer-url",ref:"image-url",defaultValue:n.url,onChange:this._changeUrl}),e.jsx(Hl,{children:e.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),n.url&&e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("label",{className:"perseus-widget-left-col",children:["Pixels from top:"," ",e.jsx(Gn,{placeholder:0,onChange:this._changeTop,value:n.top,useArrowKeys:!0})]}),e.jsxs("label",{className:"perseus-widget-right-col",children:["Pixels from left:"," ",e.jsx(Gn,{placeholder:0,onChange:this._changeLeft,value:n.left,useArrowKeys:!0})]})]}),e.jsxs("div",{children:["Containing area [width, height]:"," ",e.jsx(Ul,{onChange:this.change("box"),value:this.props.box,useArrowKeys:!0})]}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("div",{className:"perseus-widget-left-col",children:e.jsx(ce,{label:"Show ruler",checked:this.props.showRuler,onChange:r=>{this.props.onChange({showRuler:r})}})}),e.jsx("div",{className:"perseus-widget-right-col",children:e.jsx(ce,{label:"Show protractor",checked:this.props.showProtractor,onChange:r=>{this.props.onChange({showProtractor:r})}})})]}),this.props.showRuler&&e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler label:"," ",e.jsxs("select",{onChange:r=>this.change("rulerLabel",r.target.value),value:this.props.rulerLabel,children:[e.jsx("option",{value:"",children:"None"}),e.jsx("optgroup",{label:"Metric",children:this.renderLabelChoices([["milimeters","mm"],["centimeters","cm"],["meters","m"],["kilometers","km"]])}),e.jsx("optgroup",{label:"Imperial",children:this.renderLabelChoices([["inches","in"],["feet","ft"],["yards","yd"],["miles","mi"]])})]})]})}),e.jsx("div",{children:e.jsxs("label",{children:[" ","Ruler ticks:"," ",e.jsx("select",{onChange:r=>this.change("rulerTicks",+r.target.value),value:this.props.rulerTicks,children:z.map([1,2,4,8,10,16],function(r){return e.jsx("option",{value:r,children:r},r)})})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Ruler pixels per unit:"," ",e.jsx(Gn,{placeholder:40,onChange:this.change("rulerPixels"),value:this.props.rulerPixels,useArrowKeys:!0})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Ruler length in units:"," ",e.jsx(Gn,{placeholder:10,onChange:this.change("rulerLength"),value:this.props.rulerLength,useArrowKeys:!0})]})})]})]})}}d(Cn,"widgetName","measurer"),d(Cn,"propTypes",{...ue,box:j.arrayOf(j.number),image:j.shape({url:j.string,top:j.number,left:j.number}),showProtractor:j.bool,showRuler:j.bool,rulerLabel:j.string,rulerTicks:j.number,rulerPixels:j.number,rulerLength:j.number}),d(Cn,"defaultProps",qo.defaultWidgetOptions);Cn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_changeUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"_changeTop",docblock:null,modifiers:[],params:[{name:"newTop",optional:!1,type:null}],returns:null},{name:"_changeLeft",docblock:null,modifiers:[],params:[{name:"newLeft",optional:!1,type:null}],returns:null},{name:"_changeImage",docblock:null,modifiers:[],params:[{name:"subProp",optional:!1,type:null},{name:"newValue",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MeasurerEditor",props:{box:{defaultValue:{value:"[480, 480]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"number"}},required:!1},image:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"shape",value:{url:{name:"string",required:!1},top:{name:"number",required:!1},left:{name:"number",required:!1}}},required:!1},showProtractor:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},showRuler:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},rulerLabel:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},rulerTicks:{defaultValue:{value:"10",computed:!1},description:"",type:{name:"number"},required:!1},rulerPixels:{defaultValue:{value:"40",computed:!1},description:"",type:{name:"number"},required:!1},rulerLength:{defaultValue:{value:"10",computed:!1},description:"",type:{name:"number"},required:!1}},composes:["@khanacademy/perseus"]};const{NumberInput:Xl,TextInput:Jl}=ae;class Yn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"updateMolecule",n=>{this.change({smiles:n})});d(this,"updateRotation",n=>{this.change({rotationAngle:n})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:["SMILES: ",e.jsx(Jl,{onChange:this.updateMolecule,value:this.props.smiles})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Rotation (deg): ",e.jsx(Xl,{onChange:this.updateRotation,value:this.props.rotationAngle})]})})]})}}d(Yn,"propTypes",{...ue,rotationAngle:j.number,smiles:j.string}),d(Yn,"widgetName","molecule-renderer");Yn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"updateMolecule",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"updateRotation",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MoleculeWidgetEditor",props:{rotationAngle:{description:"",type:{name:"number"},required:!1},smiles:{description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Bn,TextListEditor:pr}=ae,cr="normal",hr="auto",gr="horizontal",yr="vertical",br=(o,a,n,r)=>{const t={};n&&r!==void 0&&(t[n]=r.map(p=>({content:p})));const i=n==="correctOptions"?t.correctOptions:o,l=n==="otherOptions"?t.otherOptions:a,s=[...i,...l],u=[...new Set(s.map(p=>p.content))].filter(p=>p!=="").sort().sort((p,h)=>{const b=x=>/\d/.test(x)?0:/^\$?[a-zA-Z]+\$?$/.test(x)?2:1;return b(p)-b(h)}).map(p=>({content:p}));return{...t,options:u}};class Tn extends g.Component{constructor(){super(...arguments);d(this,"onOptionsChange",(n,r,t)=>{const i=br(this.props.correctOptions||[],this.props.otherOptions||[],n,r);this.props.onChange(i,t)});d(this,"onLayoutChange",n=>{this.props.onChange({layout:n.target.value})});d(this,"onHeightChange",n=>{this.props.onChange({height:n.target.value})});d(this,"serialize",()=>{const{options:n}=br(this.props.correctOptions||[],this.props.otherOptions||[]);return{options:n,correctOptions:this.props.correctOptions,otherOptions:this.props.otherOptions,height:this.props.height,layout:this.props.layout}})}render(){return e.jsxs("div",{className:"perseus-widget-orderer",children:[e.jsxs("div",{children:[" ","Correct answer:"," ",e.jsx(Bn,{children:e.jsx("p",{children:"Place the cards in the correct order. The same card can be used more than once in the answer but will only be displayed once at the top of a stack of identical cards."})})]}),e.jsx(pr,{options:z.pluck(this.props.correctOptions,"content"),onChange:this.onOptionsChange.bind(this,"correctOptions"),layout:this.props.layout}),e.jsxs("div",{children:[" ","Other cards:"," ",e.jsx(Bn,{children:e.jsx("p",{children:"Create cards that are not part of the answer."})})]}),e.jsx(pr,{options:z.pluck(this.props.otherOptions,"content"),onChange:this.onOptionsChange.bind(this,"otherOptions"),layout:this.props.layout}),e.jsxs("div",{children:[e.jsxs("label",{children:[" ","Layout:"," ",e.jsxs("select",{value:this.props.layout,onChange:this.onLayoutChange,children:[e.jsx("option",{value:gr,children:"Horizontal"}),e.jsx("option",{value:yr,children:"Vertical"})]})]}),e.jsx(Bn,{children:e.jsx("p",{children:"Use the horizontal layout for short text and small images. The vertical layout is best for longer text (e.g. proofs)."})})]}),e.jsxs("div",{children:[e.jsxs("label",{children:[" ","Height:"," ",e.jsxs("select",{value:this.props.height,onChange:this.onHeightChange,children:[e.jsx("option",{value:cr,children:"Normal"}),e.jsx("option",{value:hr,children:"Automatic"})]})]}),e.jsx(Bn,{children:e.jsx("p",{children:'Use "Normal" for text, "Automatic" for images.'})})]})]})}}d(Tn,"propTypes",{correctOptions:j.array,otherOptions:j.array,height:j.oneOf([cr,hr]),layout:j.oneOf([gr,yr]),onChange:j.func.isRequired}),d(Tn,"widgetName","orderer"),d(Tn,"defaultProps",Co.defaultWidgetOptions);Tn.__docgenInfo={description:"",methods:[{name:"onOptionsChange",docblock:null,modifiers:[],params:[{name:"whichOptions",optional:!1,type:null},{name:"options",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"onLayoutChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"onHeightChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"OrdererEditor",props:{correctOptions:{defaultValue:{value:'[{content: "$x$"}]',computed:!1},description:"",type:{name:"array"},required:!1},otherOptions:{defaultValue:{value:'[{content: "$y$"}]',computed:!1},description:"",type:{name:"array"},required:!1},height:{defaultValue:{value:'"normal"',computed:!1},description:"",type:{name:"enum",value:[{value:'"normal"',computed:!1},{value:'"auto"',computed:!1}]},required:!1},layout:{defaultValue:{value:'"horizontal"',computed:!1},description:"",type:{name:"enum",value:[{value:'"horizontal"',computed:!1},{value:'"vertical"',computed:!1}]},required:!1},onChange:{description:"",type:{name:"func"},required:!0}}};const{InfoTip:wr}=ae;class Sn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){const n=e.jsx(Oe,{ref:"passage-editor",apiOptions:this.props.apiOptions,content:this.props.passageText,widgetEnabled:!1,placeholder:"Type passage here...",onChange:t=>{this.change({passageText:t.content})},showWordCount:!0}),r=e.jsx(Oe,{ref:"passage-footnotes-editor",apiOptions:this.props.apiOptions,content:this.props.footnotes,widgetEnabled:!1,placeholder:"Type footnotes here...",onChange:t=>{this.change({footnotes:t.content})}});return e.jsxs("div",{className:"perseus-widget-passage-editor",children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsx(ce,{label:"Show line numbers",checked:this.props.showLineNumbers,onChange:t=>{this.props.onChange({showLineNumbers:t})}})}),e.jsxs("div",{children:["Passage title:",e.jsx(wr,{children:e.jsx("p",{children:"An optional title that will appear directly above the passage in the same font style. (E.g. Passage 1)"})}),e.jsx("div",{children:e.jsx("input",{type:"text",defaultValue:this.props.passageTitle,onChange:t=>{this.change({passageTitle:t.target.value})}})})]}),e.jsxs("div",{children:["Passage Text:",n]}),e.jsxs("div",{children:["Footnotes:",e.jsx(wr,{children:e.jsx("p",{children:"To add footnotes, add ^ characters where they belong in the passage. Then, add ^ in the footnotes area to reference the footnotes in the passage."})}),r]})]})}}d(Sn,"propTypes",{...ue,passageTitle:j.string,passageText:j.string,footnotes:j.string,showLineNumbers:j.bool}),d(Sn,"widgetName","passage"),d(Sn,"defaultProps",To.defaultWidgetOptions);Sn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageEditor",props:{passageTitle:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},passageText:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},footnotes:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},showLineNumbers:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1}},composes:["@khanacademy/perseus"]};const{InfoTip:Yl,NumberInput:fr,TextInput:Ql}=ae;class An extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("label",{children:["Passage Number: ",e.jsx(fr,{value:this.props.passageNumber,onChange:this.change("passageNumber")})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Reference Number: ",e.jsx(fr,{value:this.props.referenceNumber,onChange:this.change("referenceNumber")})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Summary Text: ",e.jsx(Ql,{value:this.props.summaryText,onChange:this.change("summaryText")}),e.jsxs(Yl,{children:[e.jsx("p",{children:"Short summary of the referenced section. This will be included in parentheses and quotes automatically."}),e.jsx("p",{children:"Ex: The start ... the end"})]})]})})]})}}d(An,"propTypes",{...ue,passageNumber:j.number,referenceNumber:j.number,summaryText:j.string}),d(An,"widgetName","passage-ref"),d(An,"defaultProps",So.defaultWidgetOptions);An.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageRefEditor",props:{passageNumber:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},referenceNumber:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},summaryText:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};class Pn extends g.Component{constructor(){super(...arguments);d(this,"change",(...n)=>ie.apply(this,n));d(this,"handleContentChange",n=>{this.change({content:n.target.value})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsxs("div",{children:["Content:",e.jsx("input",{type:"text",value:this.props.content,onChange:this.handleContentChange})]})}}d(Pn,"propTypes",{...ue,content:j.string}),d(Pn,"widgetName","passage-ref-target"),d(Pn,"defaultProps",Ao.defaultWidgetOptions);Pn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"handleContentChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PassageRefTargetEditor",props:{content:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1}},composes:["@khanacademy/perseus"]};const kr=""+new URL("plus-bold-CG3_Sgx2.svg",import.meta.url).href,Ta=o=>{const a=g.useRef(null);return g.useEffect(()=>{const n=a.current;n&&(n.style.height="42px",n.style.height=`${n.scrollHeight}px`)},[o.value]),e.jsx(ja,{...o,ref:a,resizeType:"none",style:{overflow:"hidden",...o.style}})};Ta.__docgenInfo={description:"",methods:[],displayName:"AutoResizingTextArea"};const Zl="_tile_1f8yn_1",es="_radio-option-actions-container_1f8yn_14",Ct={tile:Zl,radioOptionActionsContainer:es};function Tt({content:o,showDelete:a,showMove:n,onDelete:r,onMove:t}){return e.jsxs("div",{className:Ct.radioOptionActionsContainer,children:[a&&e.jsx(se,{size:"small",kind:"tertiary",startIcon:$r,onClick:()=>{window.confirm(`Are you sure you want to remove this choice? 

${o}`)&&r()},children:"Remove"}),n&&e.jsxs(e.Fragment,{children:[e.jsx(zn,{}),e.jsx(le,{icon:it,kind:"tertiary",size:"xsmall","aria-label":"Move choice to the top",onClick:()=>t("top")}),e.jsx(le,{icon:lt,kind:"tertiary",size:"xsmall","aria-label":"Move choice up",onClick:()=>t("up")}),e.jsx(le,{icon:Zn,kind:"tertiary",size:"xsmall","aria-label":"Move choice down",onClick:()=>t("down")}),e.jsx(le,{icon:ot,kind:"tertiary",size:"xsmall","aria-label":"Move choice to the bottom",onClick:()=>t("bottom")})]})]})}Tt.__docgenInfo={description:"",methods:[],displayName:"RadioOptionSettingsActions",props:{content:{required:!0,tsType:{name:"string"},description:""},showDelete:{required:!0,tsType:{name:"boolean"},description:""},showMove:{required:!0,tsType:{name:"boolean"},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: ChoiceMovementType) => void",signature:{arguments:[{type:{name:"union",raw:'"up" | "down" | "top" | "bottom"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},name:"movement"}],return:{name:"void"}}},description:""}}};function St({index:o,correct:a,multipleSelect:n,onClick:r}){return e.jsx(en,{size:"large",style:{marginInlineEnd:k.size_080,color:a?F.white:F.red,backgroundColor:a?F.activeGreen:F.fadedRed8,borderRadius:n?D.radius.radius_040:k.size_240,border:`1px solid ${a?F.activeGreen:F.red}`,width:k.size_560,flexDirection:"row"},onClick:r,children:e.jsxs(e.Fragment,{children:[e.jsx(Ae,{size:"small",icon:a?Pa:oi,style:{marginInlineEnd:k.size_060},color:a?F.white:F.red}),String.fromCharCode(65+o)]})})}St.__docgenInfo={description:"",methods:[],displayName:"RadioStatusPill",props:{index:{required:!0,tsType:{name:"number"},description:""},correct:{required:!1,tsType:{name:"boolean"},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function At({index:o,choice:a,multipleSelect:n,onStatusChange:r,onContentChange:t,onRationaleChange:i,showDelete:l,showMove:s,onDelete:u,onMove:p}){const{content:h,rationale:b,correct:x,isNoneOfTheAbove:S}=a,L=g.useId(),A=`${L}-content-textarea`,M=`${L}-rationale-textarea`;return e.jsxs("div",{className:Ct.tile,children:[e.jsxs("fieldset",{className:"perseus-widget-row",children:[e.jsx(St,{index:o,correct:x,multipleSelect:n,onClick:()=>{r(o,!x)}}),e.jsx(sa,{style:{display:"inline",marginInlineEnd:k.size_080},children:"Status"}),e.jsx(en,{kind:x?"accent":"transparent",onClick:()=>{r(o,!0)},style:{marginInlineEnd:k.size_080,outlineColor:x?E.core.background.instructive.default:E.core.border.neutral.default},children:"Correct"}),e.jsx(en,{kind:x?"transparent":"accent",onClick:()=>{r(o,!1)},style:{marginInlineEnd:k.size_080,outlineColor:x?E.core.border.neutral.default:E.core.background.instructive.default},children:"Incorrect"})]}),e.jsx(sa,{tag:"label",htmlFor:A,children:"Content"}),e.jsx(Ta,{id:A,value:S?"None of the above":h,disabled:S,placeholder:"Type a choice here...",onChange:T=>{t(o,T)},style:{marginBlockEnd:k.size_080}}),e.jsxs(sa,{tag:"label",htmlFor:M,children:["Rationale",e.jsx(Ta,{id:M,value:b??"",placeholder:`Why is this choice ${x?"correct":"incorrect"}?`,onChange:T=>{i(o,T)}})]}),e.jsx(Tt,{content:h,showDelete:l,showMove:s,onDelete:u,onMove:T=>p(o,T)})]})}At.__docgenInfo={description:"",methods:[],displayName:"RadioOptionSettings",props:{index:{required:!0,tsType:{name:"number"},description:""},choice:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"rationale",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}}]}},description:""},multipleSelect:{required:!0,tsType:{name:"boolean"},description:""},onStatusChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, correct: boolean) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"boolean"},name:"correct"}],return:{name:"void"}}},description:""},onContentChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, content: string) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"string"},name:"content"}],return:{name:"void"}}},description:""},onRationaleChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, rationale: string) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"string"},name:"rationale"}],return:{name:"void"}}},description:""},showDelete:{required:!0,tsType:{name:"boolean"},description:""},showMove:{required:!0,tsType:{name:"boolean"},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(choiceIndex: number, movement: ChoiceMovementType) => void",signature:{arguments:[{type:{name:"number"},name:"choiceIndex"},{type:{name:"union",raw:'"up" | "down" | "top" | "bottom"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},name:"movement"}],return:{name:"void"}}},description:""}}};function ns(o,a,n,r){const t=[...o],[i]=t.splice(n,1);switch(r){case"top":if(n===0)return o;t.unshift(i);break;case"up":if(n===0)return o;t.splice(n-1,0,i);break;case"down":if(n===o.length-1||n===o.length-2&&a)return o;t.splice(n+1,0,i);break;case"bottom":if(n===o.length-1)return o;if(a){const l=t.pop();t.push(i),l&&t.push(l)}else t.push(i);break}return t}class Qn extends g.Component{constructor(){super(...arguments);d(this,"onMultipleSelectChange",n=>{const r=n.multipleSelect;let t=this.props.choices;r||Je(t)>1&&(t=t.map(l=>({...l,correct:!1}))),this.props.onChange({multipleSelect:r,choices:t,numCorrect:Je(t)})});d(this,"onCountChoicesChange",n=>{const r=n.countChoices;this.props.onChange({countChoices:r})});d(this,"onChange",({checked:n})=>{const r=this.props.choices.map((t,i)=>({...t,correct:n[i],content:t.isNoneOfTheAbove&&!n[i]?"":t.content}));this.props.onChange({choices:r,numCorrect:Je(r)})});d(this,"onStatusChange",(n,r)=>{let t;r&&!this.props.multipleSelect?t=this.props.choices.map(i=>!1):t=this.props.choices.map(i=>i.correct),t[n]=r,this.onChange({checked:t})});d(this,"onContentChange",(n,r)=>{const t=[...this.props.choices];t[n]={...t[n],content:r},this.props.onChange({choices:t})});d(this,"onRationaleChange",(n,r)=>{const t=[...this.props.choices];t[n]={...t[n],rationale:r},r===""&&delete t[n].rationale,this.props.onChange({choices:t})});d(this,"onDelete",n=>{const r=this.props.choices.slice(),t=r[n];r.splice(n,1),this.props.onChange({choices:r,hasNoneOfTheAbove:this.props.hasNoneOfTheAbove&&!t.isNoneOfTheAbove,numCorrect:Je(r)})});d(this,"addChoice",(n,r)=>{r.preventDefault();const t=this.props.choices.slice(),i={isNoneOfTheAbove:n,content:""},l=t.length-(this.props.hasNoneOfTheAbove?1:0);t.splice(l,0,i),this.props.onChange({choices:t,hasNoneOfTheAbove:n||this.props.hasNoneOfTheAbove},()=>{this.refs[`choice-editor${l}`].refs["content-editor"].focus()})});d(this,"handleMove",(n,r)=>{const t=ns(this.props.choices,this.props.hasNoneOfTheAbove,n,r);this.props.onChange({choices:t})});d(this,"focus",()=>(this.refs["choice-editor0"].refs["content-editor"].focus(),!0));d(this,"getSaveWarnings",()=>z.some(z.pluck(this.props.choices,"correct"))?[]:["No choice is marked as correct."])}serialize(){const{choices:n,randomize:r,multipleSelect:t,countChoices:i,hasNoneOfTheAbove:l,deselectEnabled:s}=this.props;return{choices:n,randomize:r,multipleSelect:t,countChoices:i,hasNoneOfTheAbove:l,deselectEnabled:s,numCorrect:Je(n)}}render(){const n=Je(this.props.choices);return e.jsxs("div",{children:[e.jsx(Lo,{href:"https://www.khanacademy.org/internal-courses/content-creation-best-practices/xe46daa512cd9c644:question-writing/xe46daa512cd9c644:multiple-choice/a/stems",target:"_blank",children:"Multiple choice best practices"}),e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(Be,{label:"Randomize order",checked:this.props.randomize,onChange:r=>{this.props.onChange({randomize:r})},style:{marginBlockEnd:k.size_060}}),e.jsx(Be,{label:"Multiple selections",checked:this.props.multipleSelect,onChange:r=>{this.onMultipleSelectChange({multipleSelect:r})},style:{marginBlockEnd:k.size_060}}),this.props.multipleSelect&&e.jsxs(e.Fragment,{children:[e.jsx(Be,{label:"Specify number correct",checked:this.props.countChoices,onChange:r=>{this.onCountChoicesChange({countChoices:r})},style:{marginBlockEnd:k.size_060}}),e.jsxs(jo,{children:["Current number correct: ",n]})]})]}),this.props.choices.map((r,t)=>e.jsx(At,{index:t,choice:r,multipleSelect:this.props.multipleSelect,onStatusChange:this.onStatusChange,onContentChange:this.onContentChange,onRationaleChange:this.onRationaleChange,showDelete:this.props.choices.length>=2,showMove:this.props.choices.length>1&&!r.isNoneOfTheAbove,onDelete:()=>this.onDelete(t),onMove:this.handleMove},`choice-${t}}`)),e.jsxs("div",{className:"add-choice-container",children:[e.jsx(se,{size:"small",kind:"tertiary",startIcon:kr,onClick:this.addChoice.bind(this,!1),style:{marginInlineEnd:"2.4rem"},children:"Add a choice"}),!this.props.hasNoneOfTheAbove&&e.jsx(se,{size:"small",kind:"tertiary",startIcon:kr,onClick:this.addChoice.bind(this,!0),children:"None of the above"})]})]})}}d(Qn,"widgetName","radio"),d(Qn,"defaultProps",Po.defaultWidgetOptions);Qn.__docgenInfo={description:"",methods:[{name:"onMultipleSelectChange",docblock:null,modifiers:[],params:[{name:"allowMultiple",optional:!1,type:null}],returns:null},{name:"onCountChoicesChange",docblock:null,modifiers:[],params:[{name:"count",optional:!1,type:null}],returns:null},{name:"onChange",docblock:null,modifiers:[],params:[{name:"{checked}",optional:!1,type:null}],returns:null},{name:"onStatusChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"correct",optional:!1,type:null}],returns:null},{name:"onContentChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newContent",optional:!1,type:null}],returns:null},{name:"onRationaleChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newRationale",optional:!1,type:null}],returns:null},{name:"onDelete",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"addChoice",docblock:null,modifiers:[],params:[{name:"noneOfTheAbove",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"handleMove",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"movement",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"rationale",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}}]}}],raw:"PerseusRadioChoice[]"},description:"",defaultValue:{value:"[{}, {}, {}, {}]",computed:!1}},randomize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},hasNoneOfTheAbove:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},multipleSelect:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},deselectEnabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},static:{required:!0,tsType:{name:"boolean"},description:""}}};const{InfoTip:as,NumberInput:vr}=ae,rs=Io.widget;class Ln extends g.Component{constructor(){super(...arguments);d(this,"numberOfColumns",g.createRef());d(this,"focus",()=>{var n;(n=this.numberOfColumns.current)==null||n.focus()});d(this,"onSizeInput",(n,r)=>{let t=+n||0,i=+r||0;t=Math.min(Math.max(1,t),30),i=Math.min(Math.max(1,i),6);const l=this.props.columns,s=this.props.rows,u=this.props.answers;t<=s?u.length=t:z(t-s).times(function(){u.push(Ce.stringArrayOfSize(l))});function p(b){i<=l?b.length=i:z(i-l).times(function(){b.push("")})}const h=this.props.headers;p(h),z.each(u,p),this.props.onChange({rows:t,columns:i,answers:u,headers:h})});d(this,"serialize",()=>{const n=z.pick(this.props,"headers","rows","columns");return z.extend({},n,{answers:z.map(this.props.answers,z.clone)})})}render(){const n={headers:this.props.headers,onChange:this.props.onChange,userInput:this.props.answers,handleUserInput:r=>{this.props.onChange({answers:r})},apiOptions:this.props.apiOptions,editableHeaders:!0,onFocus:()=>{},onBlur:()=>{},trackInteraction:()=>{},Editor:Oe};return e.jsxs("div",{children:[e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Number of columns:"," ",e.jsx(vr,{ref:this.numberOfColumns,value:this.props.columns,onChange:r=>{r&&this.onSizeInput(this.props.rows,r)},useArrowKeys:!0})]})}),e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Number of rows:"," ",e.jsx(vr,{ref:"numberOfRows",value:this.props.rows,onChange:r=>{r&&this.onSizeInput(r,this.props.columns)},useArrowKeys:!0})]})}),e.jsxs("div",{children:[" ","Table of answers:"," ",e.jsx(as,{children:e.jsx("p",{children:"The student has to fill out all cells in the table. For partially filled tables create a table using the template, and insert text input boxes as desired."})})]}),e.jsx("div",{children:e.jsx(rs,{...n})})]})}}d(Ln,"propTypes",{rows:j.number,columns:j.number,headers:j.arrayOf(j.string),answers:j.arrayOf(j.arrayOf(j.string))}),d(Ln,"widgetName","table"),d(Ln,"defaultProps",No.defaultWidgetOptions);Ln.__docgenInfo={description:"",methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"onSizeInput",docblock:null,modifiers:[],params:[{name:"numRawRows",optional:!1,type:null},{name:"numRawColumns",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TableEditor",props:{headers:{defaultValue:{value:'[""]',computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},rows:{defaultValue:{value:"4",computed:!1},description:"",type:{name:"number"},required:!1},columns:{defaultValue:{value:"1",computed:!1},description:"",type:{name:"number"},required:!1},answers:{defaultValue:{value:`new Array(defaultRows)
.fill(0)
.map(() => new Array(defaultColumns).fill(""))`,computed:!0},description:"",type:{name:"arrayOf",value:{name:"arrayOf",value:{name:"string"}}},required:!1}}};const{InfoTip:ts}=ae,os=/khanacademy\.org\/.*\/v\/(.*)$/;function is(o){const a=os.exec(o);return a?a[1]:o}class jn extends g.Component{constructor(){super(...arguments);d(this,"_handleUrlChange",n=>{this.props.onChange({location:is(n)})});d(this,"serialize",()=>de.serialize.call(this))}render(){return e.jsx("div",{children:e.jsxs("label",{children:["KA Video Slug:"," ",e.jsx(Se,{value:this.props.location,style:{width:290},onChange:this._handleUrlChange}),e.jsx(ts,{children:"KA video URLs will be converted to just the slug."})]})})}}d(jn,"propTypes",{location:j.string,onChange:j.func}),d(jn,"widgetName","video"),d(jn,"defaultProps",Ro.defaultWidgetOptions);jn.__docgenInfo={description:"This is the main editor for this widget, to specify all the options.",methods:[{name:"_handleUrlChange",docblock:null,modifiers:[],params:[{name:"url",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"VideoEditor",props:{location:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},onChange:{description:"",type:{name:"func"},required:!1}}};const ls=[Do,bn,Mo,$o,Vo,Wo,Go,We,wn,fn,kn,vn,Ko,Xo,Uo,Jn,Zo,ei,qn,Cn,Yn,ni,Qo,Tn,Sn,An,Pn,ai,ri,ti,ii,Ln,jn,Qn,Ra],Ms=()=>{Fo(Oo),zo(ls),Eo(),_o()};export{ls as A,si as I,ka as J,Qn as R,Ms as r};
