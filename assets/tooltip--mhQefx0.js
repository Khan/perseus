import{j as r,a as p}from"./jsx-runtime-FVsy8kgq.js";import{r as m}from"./index-TT1qJ6UJ.js";import{R as g}from"./index-7vsPyIck.js";const s=10;var b=(t=>(t.Left="left",t.Right="right",t))(b||{}),w=(t=>(t.Top="top",t.Bottom="bottom",t))(w||{});const f=t=>{let i,o,n,e;const l=`${t.width}px solid transparent`;t.horizontalDirection==="right"?i=l:o=l;const a=`${t.height}px solid ${t.color}`;return t.verticalDirection==="top"?n=a:e=a,r("div",{style:{display:"block",height:0,width:0,position:"absolute",left:t.left,top:t.top,borderLeft:i,borderRight:o,borderTop:n,borderBottom:e}})},h=({position:t="relative",visibility:i="visible",left:o=100,top:n=0,...e})=>{const l=e.verticalDirection==="top",a=l?0:1,u=l?0:-1;return p("div",{style:{display:"block",position:t,visibility:i,left:o,top:n,width:e.width+2,height:e.height+1,marginTop:-1,marginBottom:-2,zIndex:s},children:[r(f,{horizontalDirection:e.horizontalDirection,verticalDirection:e.verticalDirection,color:e.border,left:0,top:u,width:e.width+2,height:e.height+2}),r(f,{horizontalDirection:e.horizontalDirection,verticalDirection:e.verticalDirection,color:e.color,left:1,top:a,width:e.width,height:e.height})]})},v={top:{top:"-100%"},bottom:{top:0}},T={left:{targetLeft:0},right:{targetLeft:"100%"}},z={left:{tooltipLeft:0,arrowLeft:t=>0},right:{tooltipLeft:"-100%",arrowLeft:t=>-t-2}},d=class d extends m.Component{constructor(){super(...arguments),this.state={height:null}}componentDidMount(){this._updateHeight()}UNSAFE_componentWillReceiveProps(){this.setState({height:null})}componentDidUpdate(){this._updateHeight()}_renderToolTipDiv(i){const o=Object.assign({},T[this.props.horizontalPosition],z[this.props.horizontalAlign],v[this.props.verticalPosition]);let n,e;return i?(n=r(h,{verticalDirection:"top",horizontalDirection:this.props.horizontalAlign,position:"absolute",color:"white",border:this.props.borderColor,left:o.arrowLeft(this.props.arrowSize),top:-this.props.arrowSize+2,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:s}),e=r(h,{verticalDirection:"top",horizontalDirection:this.props.horizontalAlign,visibility:"hidden",color:"white",border:this.props.borderColor,left:o.arrowLeft(this.props.arrowSize),top:-1,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:s})):(n=r(h,{verticalDirection:"bottom",horizontalDirection:this.props.horizontalAlign,color:"white",border:this.props.borderColor,left:o.arrowLeft(this.props.arrowSize),top:-1,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:s}),e=null),r("div",{style:{position:"relative",height:0,display:this.props.show?"block":"none"},children:p("div",{ref:"tooltipContainer",className:"tooltipContainer",style:{position:"absolute",height:this.state.height||void 0,left:o.targetLeft},children:[n,r("div",{className:this.props.className,ref:"tooltipContent",style:{position:"relative",top:o.top,left:o.tooltipLeft,border:"1px solid "+this.props.borderColor,boxShadow:"0 1px 3px "+this.props.borderColor,zIndex:s-1},children:this.props.children.slice(1)}),e]})})}_updateHeight(){const o=g.findDOMNode(this.refs.tooltipContainer).offsetHeight;o!==this.state.height&&this.setState({height:o})}render(){const i=this.props.verticalPosition==="top";return p("span",{children:[i&&this._renderToolTipDiv(i),r("div",{style:this.props.targetContainerStyle,children:this.props.children[0]}),!i&&this._renderToolTipDiv()]})}};d.defaultProps={className:"",arrowSize:10,borderColor:"#ccc",verticalPosition:"bottom",horizontalPosition:"left",horizontalAlign:"left",targetContainerStyle:{}};let c=d;c.__docgenInfo={description:`DEPRECATED! Use Wonder Blocks tooltip instead.

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
\`\`\``,methods:[{name:"_renderToolTipDiv",docblock:null,modifiers:[],params:[{name:"isTooltipAbove",optional:!0,type:{name:"boolean"}}],returns:null},{name:"_updateHeight",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Tooltip",props:{show:{required:!0,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},arrowSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},borderColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#ccc"',computed:!1}},verticalPosition:{required:!1,tsType:{name:"VerticalDirection"},description:"",defaultValue:{value:"VerticalDirection.Bottom",computed:!0}},horizontalPosition:{required:!1,tsType:{name:"HorizontalDirection"},description:"",defaultValue:{value:"HorizontalDirection.Left",computed:!0}},horizontalAlign:{required:!1,tsType:{name:"HorizontalDirection.Left"},description:"",defaultValue:{value:"HorizontalDirection.Left",computed:!0}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},targetContainerStyle:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"{}",computed:!1}}}};export{b as H,c as T,w as V};
