var o=Object.defineProperty;var p=(t,r,e)=>r in t?o(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e;var i=(t,r,e)=>(p(t,typeof r!="symbol"?r+"":r,e),e);import{r as l,cd as u,ce as d,j as s,bw as a,s as c}from"./iframe-rTh-qpeb.js";import"./item-version-BoPwVzYW.js";import"./article-renderer-BMePpXSB.js";import"./server-item-renderer-CMOhgjPp.js";import"./hints-renderer-Ced41RaC.js";class n extends l.Component{constructor(){super(...arguments);i(this,"getSaveWarnings",()=>d(this.props.url,"en")===null?["Please enter a URL from the PhET domain."]:[])}serialize(){return{url:this.props.url,description:this.props.description}}render(){return s.jsxs("div",{children:[s.jsx(a,{label:"URL",value:this.props.url,onChange:e=>this.props.onChange({url:e}),style:{marginBottom:c.large_24}}),s.jsx(a,{label:"Description",value:this.props.description,onChange:e=>this.props.onChange({description:e})})]})}}i(n,"defaultProps",u.defaultWidgetOptions),i(n,"widgetName","phet-simulation");n.__docgenInfo={description:"",methods:[{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"url",value:{name:'intersection["url"]',raw:'Props["url"]',required:!1}},{key:"description",value:{name:'intersection["description"]',raw:'Props["description"]',required:!1}}]}},name:"arg1"}],return:{name:"void"}}},description:""},url:{defaultValue:{value:'""',computed:!1},required:!1},description:{defaultValue:{value:'""',computed:!1},required:!1}}};export{n as P};
