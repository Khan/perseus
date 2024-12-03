import{j as r}from"./jsx-runtime-63Ea5SlK.js";import{r as d}from"./index-6oxdNXpR.js";const s=10;var m=(t=>(t.Left="left",t.Right="right",t))(m||{}),g=(t=>(t.Top="top",t.Bottom="bottom",t))(g||{});const f=t=>{let o,i,n,e;const l=`${t.width}px solid transparent`;t.horizontalDirection==="right"?o=l:i=l;const a=`${t.height}px solid ${t.color}`;return t.verticalDirection==="top"?n=a:e=a,r.jsx("div",{style:{display:"block",height:0,width:0,position:"absolute",left:t.left,top:t.top,borderLeft:o,borderRight:i,borderTop:n,borderBottom:e}})},h=({position:t="relative",visibility:o="visible",left:i=100,top:n=0,...e})=>{const l=e.verticalDirection==="top",a=l?0:1,u=l?0:-1;return r.jsxs("div",{style:{display:"block",position:t,visibility:o,left:i,top:n,width:e.width+2,height:e.height+1,marginTop:-1,marginBottom:-2,zIndex:s},children:[r.jsx(f,{horizontalDirection:e.horizontalDirection,verticalDirection:e.verticalDirection,color:e.border,left:0,top:u,width:e.width+2,height:e.height+2}),r.jsx(f,{horizontalDirection:e.horizontalDirection,verticalDirection:e.verticalDirection,color:e.color,left:1,top:a,width:e.width,height:e.height})]})},b={top:{top:"-100%"},bottom:{top:0}},w={left:{targetLeft:0},right:{targetLeft:"100%"}},v={left:{tooltipLeft:0,arrowLeft:t=>0},right:{tooltipLeft:"-100%",arrowLeft:t=>-t-2}},c=class c extends d.Component{constructor(){super(...arguments),this.tooltipContainerRef=d.createRef(),this.state={height:null}}componentDidMount(){this._updateHeight()}UNSAFE_componentWillReceiveProps(){this.setState({height:null})}componentDidUpdate(){this._updateHeight()}_renderToolTipDiv(o){const i=Object.assign({},w[this.props.horizontalPosition],v[this.props.horizontalAlign],b[this.props.verticalPosition]);let n,e;return o?(n=r.jsx(h,{verticalDirection:"top",horizontalDirection:this.props.horizontalAlign,position:"absolute",color:"white",border:this.props.borderColor,left:i.arrowLeft(this.props.arrowSize),top:-this.props.arrowSize+2,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:s}),e=r.jsx(h,{verticalDirection:"top",horizontalDirection:this.props.horizontalAlign,visibility:"hidden",color:"white",border:this.props.borderColor,left:i.arrowLeft(this.props.arrowSize),top:-1,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:s})):(n=r.jsx(h,{verticalDirection:"bottom",horizontalDirection:this.props.horizontalAlign,color:"white",border:this.props.borderColor,left:i.arrowLeft(this.props.arrowSize),top:-1,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:s}),e=null),r.jsx("div",{style:{position:"relative",height:0,display:this.props.show?"block":"none"},children:r.jsxs("div",{ref:this.tooltipContainerRef,className:"tooltipContainer",role:"tooltip",style:{position:"absolute",height:this.state.height||void 0,left:i.targetLeft},children:[n,r.jsx("div",{className:this.props.className,ref:"tooltipContent",style:{position:"relative",top:i.top,left:i.tooltipLeft,border:"1px solid "+this.props.borderColor,boxShadow:"0 1px 3px "+this.props.borderColor,zIndex:s-1},children:this.props.children.slice(1)}),e]})})}_updateHeight(){const o=this.tooltipContainerRef.current,i=(o==null?void 0:o.offsetHeight)||0;i!==this.state.height&&this.setState({height:i})}render(){const o=this.props.verticalPosition==="top";return r.jsxs("span",{children:[o&&this._renderToolTipDiv(o),r.jsx("div",{style:this.props.targetContainerStyle,children:this.props.children[0]}),!o&&this._renderToolTipDiv()]})}};c.defaultProps={className:"",arrowSize:10,borderColor:"#ccc",verticalPosition:"bottom",horizontalPosition:"left",horizontalAlign:"left",targetContainerStyle:{}};let p=c;p.__docgenInfo={description:`DEPRECATED! Use Wonder Blocks tooltip instead.

A generic tooltip library for React.js

\`\`\`
import Tooltip from "./tooltip";
<Tooltip
    className="class-for-tooltip-contents"
    horizontalPosition={HoriziontalDirection.Left}
    horizontalAlign={HoriziontalDirection.Left}
    verticalPosition={VerticalDirection.Top}
    arrowSize={10} // arrow size in pixels
    borderColor="#ccc" // color of the border for the tooltip
    show={true} // whether the tooltip should currently be visible
    targetContainerStyle={targetContainerStyle}
>
    <TargetElementOfTheTooltip />
    <TooltipContents1 />
    <TooltipContents2 />
</Tooltip>
\`\`\`

To show/hide the tooltip, the parent component should call the
\`.show()\` and \`.hide()\` methods of the tooltip when appropriate.
(These are usually set up as handlers of events on the target element.)

Notes:
    \`className\` should not specify a border; that is handled by \`borderColor\`
    so that the arrow and tooltip match

\`\`\`
         __,,--\`\`\\\\
 _,,-''\`\`         \\\\     ,
'----------_.------'-.___|\\__
   _.--''\`\`    \`)__   )__   @\\__
  (  .. ''---/___,,E/__,E'------\`
   \`-''\`''
Here be dragons.
\`\`\``,methods:[{name:"_renderToolTipDiv",docblock:null,modifiers:[],params:[{name:"isTooltipAbove",optional:!0,type:{name:"boolean"}}],returns:null},{name:"_updateHeight",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Tooltip",props:{show:{required:!0,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},arrowSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},borderColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#ccc"',computed:!1}},verticalPosition:{required:!1,tsType:{name:"VerticalDirection"},description:"",defaultValue:{value:"VerticalDirection.Bottom",computed:!0}},horizontalPosition:{required:!1,tsType:{name:"HorizontalDirection"},description:"",defaultValue:{value:"HorizontalDirection.Left",computed:!0}},horizontalAlign:{required:!1,tsType:{name:"HorizontalDirection.Left"},description:"",defaultValue:{value:"HorizontalDirection.Left",computed:!0}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},targetContainerStyle:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"{}",computed:!1}}}};export{m as H,p as T,g as V};
