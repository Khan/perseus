import{a as o,j as t}from"./jsx-runtime-FVsy8kgq.js";import{c as l,p as m}from"./article-renderer-ub6lGcPc.js";import{_ as n}from"./jquery-yG1GhClm.js";import"./util-F8-MDmsT.js";import"./phet-simulation-9PbE2pxN.js";import"./version-akiLXZts.js";import"./dependencies-d8cZibFS.js";import"./perseus-api-Nq3s7IMx.js";import"./multi-renderer-la0A-h33.js";import"./hints-renderer-eYcfi__L.js";import"./renderer-JG1Z7r2S.js";import"./base-radio-SM-baXgO.js";import{c as d}from"./components-yT7oveOH.js";import"./index-k-0mNqHS.js";import"./i18n-context-P5sgPFep.js";import"./svg-image-4Vh9uTQ6.js";import"./index-IIMKO4_x.js";import{E as c}from"./editor-jsonify-4Li1SRv8.js";import{P as i}from"./index-0C4KXdeC.js";import{r as h}from"./index-TT1qJ6UJ.js";import{E as u}from"./editor-1XE8pcNh.js";const{TextInput:p}=d,g={showPrompt:"Explain",hidePrompt:"Hide explanation",explanation:`explanation goes here

more explanation`,widgets:{}},s=class s extends h.Component{constructor(){super(...arguments),this.state={},this.change=(...e)=>l.apply(this,e),this.serialize=()=>c.serialize.call(this)}render(){return o("div",{className:"perseus-widget-explanation-editor",children:[t("div",{className:"perseus-widget-row",children:o("label",{children:["Prompt to show explanation:"," ",t(p,{value:this.props.showPrompt,onChange:this.change("showPrompt")})]})}),t("div",{className:"perseus-widget-row",children:o("label",{children:["Prompt to hide explanation:"," ",t(p,{value:this.props.hidePrompt,onChange:this.change("hidePrompt")})]})}),t("div",{className:"perseus-widget-row",children:t(u,{apiOptions:this.props.apiOptions,content:this.props.explanation,widgets:this.props.widgets,widgetEnabled:!0,immutableWidgets:!1,onChange:e=>{const a={};n.has(e,"content")&&(a.explanation=e.content),n.has(e,"widgets")&&(a.widgets=e.widgets),this.change(a)}})})]})}};s.propTypes={...m,showPrompt:i.string,hidePrompt:i.string,explanation:i.string,widgets:i.object,apiOptions:i.any},s.widgetName="explanation",s.defaultProps=g;let r=s;r.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ExplanationEditor",props:{showPrompt:{defaultValue:{value:'"Explain"',computed:!1},description:"",type:{name:"string"},required:!1},hidePrompt:{defaultValue:{value:'"Hide explanation"',computed:!1},description:"",type:{name:"string"},required:!1},explanation:{defaultValue:{value:'"explanation goes here\\n\\nmore explanation"',computed:!1},description:"",type:{name:"string"},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},apiOptions:{description:"",type:{name:"any"},required:!1}},composes:["@khanacademy/perseus"]};export{r as E};