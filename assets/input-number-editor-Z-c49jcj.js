import{j as e,a as i}from"./jsx-runtime-FVsy8kgq.js";import"./article-renderer-ub6lGcPc.js";import{_ as u}from"./jquery-yG1GhClm.js";import{U as l}from"./util-F8-MDmsT.js";import"./phet-simulation-9PbE2pxN.js";import"./version-akiLXZts.js";import"./dependencies-d8cZibFS.js";import"./perseus-api-Nq3s7IMx.js";import"./multi-renderer-la0A-h33.js";import"./hints-renderer-eYcfi__L.js";import"./renderer-JG1Z7r2S.js";import"./base-radio-SM-baXgO.js";import{c as m}from"./components-yT7oveOH.js";import"./index-k-0mNqHS.js";import{P as d}from"./i18n-context-P5sgPFep.js";import"./svg-image-4Vh9uTQ6.js";import"./index-IIMKO4_x.js";import{r as o}from"./index-TT1qJ6UJ.js";import{B as c}from"./blur-input-hjJsfoK9.js";const{InfoTip:a}=m,h={number:{name:"Numbers",forms:"integer, decimal, proper, improper, mixed"},decimal:{name:"Decimals",forms:"decimal"},integer:{name:"Integers",forms:"integer"},rational:{name:"Fractions and mixed numbers",forms:"integer, proper, improper, mixed"},improper:{name:"Improper numbers (no mixed)",forms:"integer, proper, improper"},mixed:{name:"Mixed numbers (no improper)",forms:"integer, proper, mixed"},percent:{name:"Numbers or percents",forms:"integer, decimal, proper, improper, mixed, percent"},pi:{name:"Numbers with pi",forms:"pi"}},t=class t extends o.Component{constructor(){super(...arguments),this.input=o.createRef(),this.handleAnswerChange=s=>{const r=l.firstNumericalParse(s,this.context.strings)||0;this.props.onChange({value:r})},this.focus=()=>{var s;return(s=this.input.current)==null||s.focus(),!0},this.serialize=()=>({value:this.props.value,simplify:this.props.simplify,size:this.props.size,inexact:this.props.inexact,maxError:this.props.maxError,answerType:this.props.answerType,rightAlign:this.props.rightAlign})}render(){const s=u.map(h,function(r,n){return e("option",{value:n,children:r.name},n)},this);return i("div",{children:[e("div",{children:i("label",{children:["Correct answer:"," ",e(c,{value:""+this.props.value,onChange:this.handleAnswerChange,ref:this.input})]})}),i("div",{children:[i("label",{children:["Unsimplified answers"," ",i("select",{value:this.props.simplify,onChange:r=>{this.props.onChange({simplify:r.target.value})},children:[e("option",{value:"required",children:"will not be graded"}),e("option",{value:"optional",children:"will be accepted"}),e("option",{value:"enforced",children:"will be marked wrong"})]})]}),i(a,{children:[e("p",{children:'Normally select "will not be graded". This will give the user a message saying the answer is correct but not simplified. The user will then have to simplify it and re-enter, but will not be penalized. (5th grade and anything after)'}),e("p",{children:'Select "will be accepted" only if the user is not expected to know how to simplify fractions yet. (Anything prior to 5th grade)'}),e("p",{children:'Select "will be marked wrong" only if we are specifically assessing the ability to simplify.'})]})]}),i("div",{children:[i("label",{children:[e("input",{type:"checkbox",checked:this.props.inexact,onChange:r=>{this.props.onChange({inexact:r.target.checked})}})," ","Allow inexact answers"]}),i("label",{children:[e("input",{type:"checkbox",style:{visibility:"hidden"}}),"Max error:"," ",e("input",{type:"text",disabled:!this.props.inexact,defaultValue:this.props.maxError,"aria-label":"Max error",onBlur:r=>{const n=""+(l.firstNumericalParse(r.target.value,this.context.strings)||0);r.target.value=n,this.props.onChange({maxError:n})}})]})]}),i("div",{children:["Answer type:"," ",e("select",{value:this.props.answerType,onChange:r=>{this.props.onChange({answerType:r.target.value})},"aria-label":"Answer type",children:s}),e(a,{children:e("p",{children:'Use the default "Numbers" unless the answer must be in a specific form (e.g., question is about converting decimals to fractions).'})})]}),i("div",{children:[i("label",{children:["Width"," ",i("select",{value:this.props.size,onChange:r=>{this.props.onChange({size:r.target.value})},children:[e("option",{value:"normal",children:"Normal (80px)"}),e("option",{value:"small",children:"Small (40px)"})]})]}),e(a,{children:e("p",{children:'Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them.'})})]}),e("div",{children:i("label",{children:[e("input",{type:"checkbox",checked:this.props.rightAlign,onChange:r=>{this.props.onChange({rightAlign:r.target.checked})}})," ","Right alignment"]})})]})}};t.contextType=d,t.widgetName="input-number",t.defaultProps={value:0,simplify:"required",size:"normal",inexact:!1,maxError:.1,answerType:"number",rightAlign:!1};let p=t;p.__docgenInfo={description:"",methods:[{name:"handleAnswerChange",docblock:null,modifiers:[],params:[{name:"str",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InputNumberEditor",props:{value:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},simplify:{required:!1,tsType:{name:'PerseusInputNumberWidgetOptions["simplify"]',raw:'PerseusInputNumberWidgetOptions["simplify"]'},description:"",defaultValue:{value:'"required"',computed:!1}},size:{required:!1,tsType:{name:'PerseusInputNumberWidgetOptions["size"]',raw:'PerseusInputNumberWidgetOptions["size"]'},description:"",defaultValue:{value:'"normal"',computed:!1}},inexact:{required:!1,tsType:{name:'PerseusInputNumberWidgetOptions["inexact"]',raw:'PerseusInputNumberWidgetOptions["inexact"]'},description:"",defaultValue:{value:"false",computed:!1}},maxError:{required:!1,tsType:{name:'PerseusInputNumberWidgetOptions["maxError"]',raw:'PerseusInputNumberWidgetOptions["maxError"]'},description:"",defaultValue:{value:"0.1",computed:!1}},answerType:{required:!1,tsType:{name:'PerseusInputNumberWidgetOptions["answerType"]',raw:'PerseusInputNumberWidgetOptions["answerType"]'},description:"",defaultValue:{value:'"number"',computed:!1}},rightAlign:{required:!1,tsType:{name:'PerseusInputNumberWidgetOptions["rightAlign"]',raw:'PerseusInputNumberWidgetOptions["rightAlign"]'},description:"",defaultValue:{value:"false",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(arg1: {
    value?: ParsedValue | 0;
    simplify?: Props["simplify"];
    size?: Props["size"];
    inexact?: Props["inexact"];
    maxError?: Props["maxError"];
    answerType?: Props["answerType"];
    rightAlign?: Props["rightAlign"];
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    value?: ParsedValue | 0;
    simplify?: Props["simplify"];
    size?: Props["size"];
    inexact?: Props["inexact"];
    maxError?: Props["maxError"];
    answerType?: Props["answerType"];
    rightAlign?: Props["rightAlign"];
}`,signature:{properties:[{key:"value",value:{name:"union",raw:"ParsedValue | 0",elements:[{name:"ParsedValue"},{name:"literal",value:"0"}],required:!1}},{key:"simplify",value:{name:'PerseusInputNumberWidgetOptions["simplify"]',raw:'Props["simplify"]',required:!1}},{key:"size",value:{name:'PerseusInputNumberWidgetOptions["size"]',raw:'Props["size"]',required:!1}},{key:"inexact",value:{name:'PerseusInputNumberWidgetOptions["inexact"]',raw:'Props["inexact"]',required:!1}},{key:"maxError",value:{name:'PerseusInputNumberWidgetOptions["maxError"]',raw:'Props["maxError"]',required:!1}},{key:"answerType",value:{name:'PerseusInputNumberWidgetOptions["answerType"]',raw:'Props["answerType"]',required:!1}},{key:"rightAlign",value:{name:'PerseusInputNumberWidgetOptions["rightAlign"]',raw:'Props["rightAlign"]',required:!1}}]}},name:"arg1"}],return:{name:"void"}}},description:""}}};export{p as I};