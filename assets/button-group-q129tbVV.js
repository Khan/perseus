import{n as i}from"./no-important-DlFk8a1I.js";import{r as a}from"./index-C6mWTJJr.js";const s=class s extends a.Component{componentWillUnmount(){this.container=null}focus(){if(this.container)return this.container.focus(),!0}toggleSelect(t){const n=this.props.value;this.props.allowEmpty?this.props.onChange(n!==t?t:null):this.props.onChange(t)}render(){const t=this.props.value,n=this.props.buttons.map((e,o)=>a.createElement("button",{title:e.title,type:"button",id:""+o,ref:"button"+o,key:""+o,className:i.css(l.buttonStyle,e.value===t&&l.selectedStyle),onClick:()=>this.toggleSelect(e.value)},e.content||""+e.value)),u={display:"inline-block"};return a.createElement("div",{style:u,ref:e=>this.container=e},n)}};s.defaultProps={value:null,allowEmpty:!0};let r=s;const l=i.StyleSheet.create({buttonStyle:{backgroundColor:"white",border:"1px solid #ccc",borderLeft:"0",cursor:"pointer",margin:"0",padding:"5px 10px",position:"relative",":first-child":{borderLeft:"1px solid #ccc",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"},":last-child":{borderRight:"1px solid #ccc",borderTopRightRadius:"3px",borderBottomRightRadius:"3px"},":hover":{backgroundColor:"#ccc"},":focus":{zIndex:2}},selectedStyle:{backgroundColor:"#ddd"}});r.__docgenInfo={description:"ButtonGroup is an aesthetically pleasing group of buttons.",methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"undefined | boolean",elements:[{name:"undefined"},{name:"boolean"}]}}},{name:"toggleSelect",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:{name:"any"}}],returns:null}],displayName:"ButtonGroup",props:{value:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"null",computed:!1}},buttons:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value?: any) => unknown",signature:{arguments:[{type:{name:"any"},name:"value"}],return:{name:"unknown"}}},description:""},allowEmpty:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};export{r as B};
