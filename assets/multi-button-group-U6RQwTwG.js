var m=Object.defineProperty;var y=(o,n,e)=>n in o?m(o,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[n]=e;var a=(o,n,e)=>(y(o,typeof n!="symbol"?n+"":n,e),e);import{j as i}from"./jsx-runtime-BT65X5dW.js";import{n as c}from"./no-important-DlFk8a1I.js";import{r as u}from"./index-C6mWTJJr.js";class p extends u.Component{constructor(){super(...arguments);a(this,"buttonContainerRef",u.createRef());a(this,"toggleSelect",e=>{const t=(this.props.values||[]).slice(0),r=this.props.allowEmpty;t.indexOf(e)>=0&&(t.length>1||r)?t.splice(t.indexOf(e),1):t.indexOf(e)<0&&t.push(e),this.props.onChange(t)})}focus(){var e;return(e=this.buttonContainerRef.current)==null||e.focus(),!0}render(){const e=this.props.values||[],t=this.props.buttons.map((s,l)=>{const h=e.indexOf(s.value)>=0;return i.jsx("button",{title:s.title,type:"button",id:""+l,ref:"button"+l,className:c.css(d.buttonStyle,h&&d.selectedStyle),onClick:()=>this.toggleSelect(s.value),children:s.content||""+s.value},""+l)}),r={display:"inline-block"};return i.jsx("div",{style:r,ref:this.buttonContainerRef,children:t})}}a(p,"defaultProps",{values:[],allowEmpty:!0});const d=c.StyleSheet.create({buttonStyle:{backgroundColor:"white",border:"1px solid #ccc",borderLeft:"0",cursor:"pointer",margin:"0",padding:"5px 10px",position:"relative",":first-child":{borderLeft:"1px solid #ccc",borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px"},":last-child":{borderRight:"1px solid #ccc",borderTopRightRadius:"3px",borderBottomRightRadius:"3px"},":hover":{backgroundColor:"#ccc"},":focus":{zIndex:2}},selectedStyle:{backgroundColor:"#ddd"}});p.__docgenInfo={description:`MultiButtonGroup is an aesthetically pleasing group of buttons,
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
(which it then is responsible for updating)`},allowEmpty:{required:!1,tsType:{name:"boolean"},description:"If false, at least one button must be selected at all times.\n\nDefaults to `true`",defaultValue:{value:"true",computed:!1}}}};export{p as M};
