var o=Object.defineProperty;var p=(t,e,r)=>e in t?o(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var i=(t,e,r)=>p(t,typeof e!="symbol"?e+"":e,r);import{r as l,ac as u,ad as d,j as s,ae as n,s as m}from"./iframe-CyaMcHXZ.js";import"./item-version-CpFDh9zS.js";import"./article-renderer-fFuMDBLs.js";import"./server-item-renderer-RD683Umq.js";import"./hints-renderer-DyNQzPo6.js";class a extends l.Component{constructor(){super(...arguments);i(this,"getSaveWarnings",()=>d(this.props.url,"en")===null?["Please enter a URL from the PhET domain."]:[])}serialize(){return{url:this.props.url,description:this.props.description}}render(){return s.jsxs("div",{children:[s.jsx(n,{label:"URL",value:this.props.url,onChange:r=>this.props.onChange({url:r}),style:{marginBottom:m.large_24}}),s.jsx(n,{label:"Description",value:this.props.description,onChange:r=>this.props.onChange({description:r})})]})}}i(a,"defaultProps",u.defaultWidgetOptions),i(a,"widgetName","phet-simulation");a.__docgenInfo={description:`An editor for adding a PhET simulation widget that allows users to interact
with physics simulations.`,methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    // A URL to display, must start with https://phet.colorado.edu/
    url: string;
    // Translatable Text; Description of the sim for Khanmigo and alt text
    description: string;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"description",value:{name:"string",required:!0}}]}}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PhetSimulationEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(arg1: {
    url?: Props["url"];
    description?: Props["description"];
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    url?: Props["url"];
    description?: Props["description"];
}`,signature:{properties:[{key:"url",value:{name:'intersection["url"]',raw:'Props["url"]',required:!1}},{key:"description",value:{name:'intersection["description"]',raw:'Props["description"]',required:!1}}]}},name:"arg1"}],return:{name:"void"}}},description:""},url:{defaultValue:{value:'""',computed:!1},required:!1},description:{defaultValue:{value:'""',computed:!1},required:!1}}};export{a as P};
