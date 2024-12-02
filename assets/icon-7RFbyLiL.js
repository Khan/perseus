import{j as s}from"./jsx-runtime-63Ea5SlK.js";import{r as w}from"./index-6oxdNXpR.js";const l=10,r=class r extends w.Component{render(){const{color:p,pathClassName:c,className:d,title:n,style:h,alt:u}=this.props;let{icon:e,size:t}=this.props,i="";typeof e=="string"&&(e={path:e,width:l,height:l}),typeof t!="number"&&(t=1,i="em");const a=t,m=a/e.height*e.width,f=0,g=0,y=!!this.props.focusable;return s.jsxs("svg",{role:"img",alt:u,"aria-label":n,"aria-hidden":n?null:!0,className:d,style:h,focusable:y.toString(),width:m+i,height:a+i,viewBox:`${f} ${g} ${e.width} ${e.height}`,children:[!!n&&s.jsx("title",{children:n}),s.jsx("path",{className:c,fill:p,d:e.path})]})}};r.defaultProps={color:"currentColor"};let o=r;o.__docgenInfo={description:`An SVG Icon

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
}`,signature:{properties:[{key:"height",value:{name:"number",required:!0}},{key:"path",value:{name:"string",required:!0}},{key:"width",value:{name:"number",required:!0}}]}},{name:"string"}]},description:""},pathClassName:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"number"},description:""},alt:{required:!1,tsType:{name:"string"},description:""}}};export{o as I};
