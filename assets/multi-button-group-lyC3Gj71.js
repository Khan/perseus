import{j as l}from"./jsx-runtime-FVsy8kgq.js";import{l as d}from"./index-awljIyHI.js";import{r as i}from"./index-TT1qJ6UJ.js";const a=class a extends i.Component{constructor(){super(...arguments),this.buttonContainerRef=i.createRef(),this.toggleSelect=e=>{const t=(this.props.values||[]).slice(0),r=this.props.allowEmpty;t.indexOf(e)>=0&&(t.length>1||r)?t.splice(t.indexOf(e),1):t.indexOf(e)<0&&t.push(e),this.props.onChange(t)}}focus(){var e;return(e=this.buttonContainerRef.current)==null||e.focus(),!0}render(){const e=this.props.values||[],t=this.props.buttons.map((n,o)=>{const c=e.indexOf(n.value)>=0;return l("button",{title:n.title,type:"button",id:""+o,ref:"button"+o,className:d.css(u.buttonStyle,c&&u.selectedStyle),onClick:()=>this.toggleSelect(n.value),children:n.content||""+n.value},""+o)});return l("div",{style:{display:"inline-block"},ref:this.buttonContainerRef,children:t})}};a.defaultProps={values:[],allowEmpty:!0};let s=a;const u=d.StyleSheet.create({buttonStyle:{backgroundColor:"white",border:"1px solid #ccc",borderLeft:"0",cursor:"pointer",margin:"0",padding:"5px 10px",position:"relative",":first-child":{borderLeft:"1px solid #ccc",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"},":last-child":{borderRight:"1px solid #ccc",borderTopRightRadius:"3px",borderBottomRightRadius:"3px"},":hover":{backgroundColor:"#ccc"},":focus":{zIndex:2}},selectedStyle:{backgroundColor:"#ddd"}});s.__docgenInfo={description:`MultiButtonGroup is an aesthetically pleasing group of buttons,
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
(which it then is responsible for updating)`},allowEmpty:{required:!1,tsType:{name:"boolean"},description:"If false, at least one button must be selected at all times.\n\nDefaults to `true`",defaultValue:{value:"true",computed:!1}}}};export{s as M};
