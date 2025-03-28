import{n as u}from"./no-important-DlFk8a1I.js";import{r as o}from"./index-C6mWTJJr.js";const l=class l extends o.Component{constructor(){super(...arguments),this.buttonContainerRef=o.createRef(),this.toggleSelect=e=>{const t=(this.props.values||[]).slice(0),s=this.props.allowEmpty;t.indexOf(e)>=0&&(t.length>1||s)?t.splice(t.indexOf(e),1):t.indexOf(e)<0&&t.push(e),this.props.onChange(t)}}focus(){var e;return(e=this.buttonContainerRef.current)==null||e.focus(),!0}render(){const e=this.props.values||[],t=this.props.buttons.map((n,a)=>{const d=e.indexOf(n.value)>=0;return o.createElement("button",{title:n.title,type:"button",id:""+a,key:""+a,ref:"button"+a,className:u.css(i.buttonStyle,d&&i.selectedStyle),onClick:()=>this.toggleSelect(n.value)},n.content||""+n.value)}),s={display:"inline-block"};return o.createElement("div",{style:s,ref:this.buttonContainerRef},t)}};l.defaultProps={values:[],allowEmpty:!0};let r=l;const i=u.StyleSheet.create({buttonStyle:{backgroundColor:"white",border:"1px solid #ccc",borderLeft:"0",cursor:"pointer",margin:"0",padding:"5px 10px",position:"relative",":first-child":{borderLeft:"1px solid #ccc",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"},":last-child":{borderRight:"1px solid #ccc",borderTopRightRadius:"3px",borderBottomRightRadius:"3px"},":hover":{backgroundColor:"#ccc"},":focus":{zIndex:2}},selectedStyle:{backgroundColor:"#ddd"}});r.__docgenInfo={description:`MultiButtonGroup is an aesthetically pleasing group of buttons,
which allows multiple buttons to be selected at the same time.

NOTE: This component is almost identical to ./button-group.jsx except that
this component allows multiple selection!`,methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:{type:{name:"boolean"}}},{name:"toggleSelect",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:{name:"any"}}],returns:null}],displayName:"MultiButtonGroup",props:{values:{required:!1,tsType:{name:"union",raw:"ReadonlyArray<any> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>"},{name:"null"},{name:"undefined"}]},description:`The initial values of the buttons selected, defaults to null (no
selection).`,defaultValue:{value:"[]",computed:!1}},buttons:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    /**
     * the value returned when the button is selected
     */
    value: any;
    /**
     * The content shown within the button, typically a string that gets
     * rendered as the button's display text.
     */
    content: React.ReactNode;
    /**
     * The title-text shown on hover
     */
    title?: string;
}`,signature:{properties:[{key:"value",value:{name:"any",required:!0},description:"the value returned when the button is selected"},{key:"content",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:`The content shown within the button, typically a string that gets
rendered as the button's display text.`},{key:"title",value:{name:"string",required:!1},description:"The title-text shown on hover"}]}}],raw:`ReadonlyArray<{
    /**
     * the value returned when the button is selected
     */
    value: any;
    /**
     * The content shown within the button, typically a string that gets
     * rendered as the button's display text.
     */
    content: React.ReactNode;
    /**
     * The title-text shown on hover
     */
    title?: string;
}>`},description:"The set of buttons to display in this MultiButtonGroup."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(values?: any) => unknown",signature:{arguments:[{type:{name:"any"},name:"values"}],return:{name:"unknown"}}},description:`A function that is provided with the updated set of selected value
(which it then is responsible for updating)`},allowEmpty:{required:!1,tsType:{name:"boolean"},description:"If false, at least one button must be selected at all times.\n\nDefaults to `true`",defaultValue:{value:"true",computed:!1}}}};export{r as M};
