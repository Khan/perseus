import{j as g}from"./jsx-runtime-FVsy8kgq.js";import{T as y}from"./index-QCAhLhLD.js";import{r as h}from"./index-TT1qJ6UJ.js";import{R as t}from"./index-7vsPyIck.js";let s=0;function b(l="input-"){return s++,`${l}${s}`}const a=class a extends h.Component{constructor(n){super(n),this.focus=()=>{t.findDOMNode(this).focus()},this.blur=()=>{t.findDOMNode(this).blur()},this.getValue=()=>{var e;return(e=t.findDOMNode(this))==null?void 0:e.value},this.getStringValue=()=>{var e;return(e=t.findDOMNode(this))==null?void 0:e.value.toString()},this.setSelectionRange=(e,r)=>{t.findDOMNode(this).setSelectionRange(e,r)},this.getSelectionStart=()=>t.findDOMNode(this).selectionStart,this.getSelectionEnd=()=>t.findDOMNode(this).selectionEnd,n.id?this.id=n.id:this.id=b()}render(){const{labelText:n,value:e,onFocus:r,onBlur:o,disabled:u,placeholder:d,onKeyDown:m,style:c}=this.props,p=e===null?"":e.toString();return g(y,{style:c,disabled:u,id:this.id,value:p,type:"text","aria-label":n,onChange:f=>this.props.onChange(f),placeholder:d,onFocus:r,onBlur:o,onKeyDown:m,autoCorrect:"off",autoCapitalize:"off",autoComplete:"off"})}};a.defaultProps={value:"",disabled:!1};let i=a;i.__docgenInfo={description:"",methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"getValue",docblock:null,modifiers:[],params:[],returns:null},{name:"getStringValue",docblock:null,modifiers:[],params:[],returns:null},{name:"setSelectionRange",docblock:null,modifiers:[],params:[{name:"selectionStart",optional:!1,type:null},{name:"selectionEnd",optional:!1,type:null}],returns:null},{name:"getSelectionStart",docblock:null,modifiers:[],params:[],returns:null},{name:"getSelectionEnd",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TextInput",props:{value:{required:!1,tsType:{name:"union",raw:"string | number | null",elements:[{name:"string"},{name:"number"},{name:"null"}]},description:"",defaultValue:{value:'""',computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(arg1?: any) => void",signature:{arguments:[{type:{name:"any"},name:"arg1"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},labelText:{required:!1,tsType:{name:"string"},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},id:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""}}};export{i as T};