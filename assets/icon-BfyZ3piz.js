var b=Object.defineProperty;var I=(i,e,t)=>e in i?b(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var l=(i,e,t)=>(I(i,typeof e!="symbol"?e+"":e,t),t);import{j as a}from"./jsx-runtime-BT65X5dW.js";import{r as q}from"./index-C6mWTJJr.js";const p=10;class d extends q.Component{render(){const{color:e,pathClassName:t,className:h,title:s,style:u,alt:m}=this.props;let{icon:n,size:o}=this.props,r="";typeof n=="string"&&(n={path:n,width:p,height:p}),typeof o!="number"&&(o=1,r="em");const c=o,f=c/n.height*n.width,g=0,y=0,w=!!this.props.focusable;return a.jsxs("svg",{role:"img",alt:m,"aria-label":s,"aria-hidden":s?null:!0,className:h,style:u,focusable:w.toString(),width:f+r,height:c+r,viewBox:`${g} ${y} ${n.width} ${n.height}`,children:[!!s&&a.jsx("title",{children:s}),a.jsx("path",{className:t,fill:e,d:n.path})]})}}l(d,"defaultProps",{color:"currentColor"});d.__docgenInfo={description:`An SVG Icon

This component is designed to take in SVG paths and render icons based upon
them. If you are looking for an icon that we've used before you should look
in \`icon-paths.js\` which is a reference file for all the SVG paths that
we've used. You'll need to copy the object from that file into whichever
file you're using the icon and explicitly pass it in to the <Icon/> React
component.

Sample usage:

\`\`\`
const dropdownIcon = \`M5,6L0,0L10,0\`;
<Icon icon={dropdownIcon} />
\`\`\`

Or:

\`\`\`
  const dropdownIcon = {
      path: \`M5,6L0,0L10,0\`,
      height: 10,
      width: 10,
  };
  <Icon icon={dropdownIcon} size={20} />
\`\`\`

If you want to add an entirely new icon please read the note inside
the \`icon-paths.ts\` file.`,methods:[],displayName:"Icon",props:{className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},title:{required:!1,tsType:{name:"string"},description:""},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"currentColor"',computed:!1}},focusable:{required:!1,tsType:{name:"boolean"},description:""},icon:{required:!0,tsType:{name:"union",raw:"IconType | string",elements:[{name:"signature",type:"object",raw:`{
    height: number;
    path: string;
    width: number;
}`,signature:{properties:[{key:"height",value:{name:"number",required:!0}},{key:"path",value:{name:"string",required:!0}},{key:"width",value:{name:"number",required:!0}}]}},{name:"string"}]},description:""},pathClassName:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"number"},description:""},alt:{required:!1,tsType:{name:"string"},description:""}}};export{d as I};
