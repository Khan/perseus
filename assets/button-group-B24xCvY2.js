var p=Object.defineProperty;var h=(o,t,e)=>t in o?p(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var a=(o,t,e)=>(h(o,typeof t!="symbol"?t+"":t,e),e);import{j as l}from"./jsx-runtime-BT65X5dW.js";import{n as u}from"./no-important-DlFk8a1I.js";import{r as m}from"./index-C6mWTJJr.js";class c extends m.Component{constructor(){super(...arguments);a(this,"container")}componentWillUnmount(){this.container=null}focus(){if(this.container)return this.container.focus(),!0}toggleSelect(e){const r=this.props.value;this.props.allowEmpty?this.props.onChange(r!==e?e:null):this.props.onChange(e)}render(){const e=this.props.value,r=this.props.buttons.map((n,s)=>l.jsx("button",{title:n.title,type:"button",ref:"button"+s,className:u.css(i.buttonStyle,n.value===e&&i.selectedStyle,n.value===e&&this.props.selectedButtonStyle),onClick:()=>this.toggleSelect(n.value),children:n.content||""+n.value},""+s)),d={display:"inline-block"};return l.jsx("div",{style:d,ref:n=>this.container=n,children:r})}}a(c,"defaultProps",{value:null,allowEmpty:!0});const i=u.StyleSheet.create({buttonStyle:{backgroundColor:"white",border:"1px solid #ccc",borderLeft:"0",cursor:"pointer",margin:"0",padding:"5px 10px",position:"relative",":first-child":{borderLeft:"1px solid #ccc",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"},":last-child":{borderRight:"1px solid #ccc",borderTopRightRadius:"3px",borderBottomRightRadius:"3px"},":hover":{backgroundColor:"#ccc"},":focus":{zIndex:2}},selectedStyle:{backgroundColor:"#ddd"}});c.__docgenInfo={description:"ButtonGroup is an aesthetically pleasing group of buttons.",methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"undefined | boolean",elements:[{name:"undefined"},{name:"boolean"}]}}},{name:"toggleSelect",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:{name:"any"}}],returns:null}],displayName:"ButtonGroup",props:{value:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"null",computed:!1}},buttons:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // the value returned when the button is selected
    value: any;
    // the content shown within the button, typically a string that gets
    // rendered as the button's display text
    content: React.ReactNode;
    // the title-text shown on hover
    title?: string;
}`,signature:{properties:[{key:"value",value:{name:"any",required:!0}},{key:"content",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"title",value:{name:"string",required:!1}}]}}],raw:`ReadonlyArray<{
    // the value returned when the button is selected
    value: any;
    // the content shown within the button, typically a string that gets
    // rendered as the button's display text
    content: React.ReactNode;
    // the title-text shown on hover
    title?: string;
}>`},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value?: any) => unknown",signature:{arguments:[{type:{name:"any"},name:"value"}],return:{name:"unknown"}}},description:""},allowEmpty:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},selectedButtonStyle:{required:!1,tsType:{name:"CSSProperties"},description:"Customizes the selected button's styling."}}};export{c as B};
