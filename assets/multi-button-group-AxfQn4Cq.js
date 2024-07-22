import{j as l}from"./jsx-runtime-5BUNAZ9W.js";import{l as u}from"./index-awljIyHI.js";import{r as c}from"./index-4g5l5LRQ.js";import{r as p}from"./index-jmm5gWkb.js";const s=class s extends c.Component{constructor(){super(...arguments),this.toggleSelect=e=>{const t=(this.props.values||[]).slice(0),r=this.props.allowEmpty;t.indexOf(e)>=0&&(t.length>1||r)?t.splice(t.indexOf(e),1):t.indexOf(e)<0&&t.push(e),this.props.onChange(t)}}focus(){var e;return(e=p.findDOMNode(this))==null||e.focus(),!0}render(){const e=this.props.values||[],t=this.props.buttons.map((n,o)=>{const d=e.indexOf(n.value)>=0;return l("button",{title:n.title,type:"button",id:""+o,ref:"button"+o,className:u.css(i.buttonStyle,d&&i.selectedStyle),onClick:()=>this.toggleSelect(n.value),children:n.content||""+n.value},""+o)});return l("div",{style:{display:"inline-block"},children:t})}};s.defaultProps={values:[],allowEmpty:!0};let a=s;const i=u.StyleSheet.create({buttonStyle:{backgroundColor:"white",border:"1px solid #ccc",borderLeft:"0",cursor:"pointer",margin:"0",padding:"5px 10px",position:"relative",":first-child":{borderLeft:"1px solid #ccc",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"},":last-child":{borderRight:"1px solid #ccc",borderTopRightRadius:"3px",borderBottomRightRadius:"3px"},":hover":{backgroundColor:"#ccc"},":focus":{zIndex:2}},selectedStyle:{backgroundColor:"#ddd"}});a.__docgenInfo={description:`MultiButtonGroup is an aesthetically pleasing group of buttons,
which allows multiple buttons to be selected at the same time.

NOTE: This component is almost identical to ./button-group.jsx except that
this component allows multiple selection!`,methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:{type:{name:"boolean"}}},{name:"toggleSelect",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:{name:"any"}}],returns:null}],displayName:"MultiButtonGroup",props:{values:{required:!1,tsType:{name:"union",raw:"ReadonlyArray<any> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>"},{name:"null"},{name:"undefined"}]},description:"",defaultValue:{value:"[]",computed:!1}},buttons:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(values?: any) => unknown",signature:{arguments:[{type:{name:"any"},name:"values"}],return:{name:"unknown"}}},description:""},allowEmpty:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};export{a as M};
