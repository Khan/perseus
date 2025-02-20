import{r}from"./index-6oxdNXpR.js";const a=10;var u=(t=>(t.Left="left",t.Right="right",t))(u||{}),m=(t=>(t.Top="top",t.Bottom="bottom",t))(m||{});const d=t=>{let o,i,n,e;const l=`${t.width}px solid transparent`;t.horizontalDirection==="right"?o=l:i=l;const s=`${t.height}px solid ${t.color}`;return t.verticalDirection==="top"?n=s:e=s,r.createElement("div",{style:{display:"block",height:0,width:0,position:"absolute",left:t.left,top:t.top,borderLeft:o,borderRight:i,borderTop:n,borderBottom:e}})},h=({position:t="relative",visibility:o="visible",left:i=100,top:n=0,...e})=>{const l=e.verticalDirection==="top",s=l?0:1,f=l?0:-1;return r.createElement("div",{style:{display:"block",position:t,visibility:o,left:i,top:n,width:e.width+2,height:e.height+1,marginTop:-1,marginBottom:-2,zIndex:a}},r.createElement(d,{horizontalDirection:e.horizontalDirection,verticalDirection:e.verticalDirection,color:e.border,left:0,top:f,width:e.width+2,height:e.height+2}),r.createElement(d,{horizontalDirection:e.horizontalDirection,verticalDirection:e.verticalDirection,color:e.color,left:1,top:s,width:e.width,height:e.height}))},g={top:{top:"-100%"},bottom:{top:0}},b={left:{targetLeft:0},right:{targetLeft:"100%"}},w={left:{tooltipLeft:0,arrowLeft:t=>0},right:{tooltipLeft:"-100%",arrowLeft:t=>-t-2}},p=class p extends r.Component{constructor(){super(...arguments),this.tooltipContainerRef=r.createRef(),this.state={height:null}}componentDidMount(){this._updateHeight()}UNSAFE_componentWillReceiveProps(){this.setState({height:null})}componentDidUpdate(){this._updateHeight()}_renderToolTipDiv(o){const i=Object.assign({},b[this.props.horizontalPosition],w[this.props.horizontalAlign],g[this.props.verticalPosition]);let n,e;return o?(n=r.createElement(h,{verticalDirection:"top",horizontalDirection:this.props.horizontalAlign,position:"absolute",color:"white",border:this.props.borderColor,left:i.arrowLeft(this.props.arrowSize),top:-this.props.arrowSize+2,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:a}),e=r.createElement(h,{verticalDirection:"top",horizontalDirection:this.props.horizontalAlign,visibility:"hidden",color:"white",border:this.props.borderColor,left:i.arrowLeft(this.props.arrowSize),top:-1,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:a})):(n=r.createElement(h,{verticalDirection:"bottom",horizontalDirection:this.props.horizontalAlign,color:"white",border:this.props.borderColor,left:i.arrowLeft(this.props.arrowSize),top:-1,width:this.props.arrowSize,height:this.props.arrowSize,zIndex:a}),e=null),r.createElement("div",{style:{position:"relative",height:0,display:this.props.show?"block":"none"}},r.createElement("div",{ref:this.tooltipContainerRef,className:"tooltipContainer",role:"tooltip",style:{position:"absolute",height:this.state.height||void 0,left:i.targetLeft}},n,r.createElement("div",{className:this.props.className,ref:"tooltipContent",style:{position:"relative",top:i.top,left:i.tooltipLeft,border:"1px solid "+this.props.borderColor,boxShadow:"0 1px 3px "+this.props.borderColor,zIndex:a-1}},this.props.children.slice(1)),e))}_updateHeight(){const o=this.tooltipContainerRef.current,i=(o==null?void 0:o.offsetHeight)||0;i!==this.state.height&&this.setState({height:i})}render(){const o=this.props.verticalPosition==="top";return r.createElement("span",null,o&&this._renderToolTipDiv(o),r.createElement("div",{style:this.props.targetContainerStyle},this.props.children[0]),!o&&this._renderToolTipDiv())}};p.defaultProps={className:"",arrowSize:10,borderColor:"#ccc",verticalPosition:"bottom",horizontalPosition:"left",horizontalAlign:"left",targetContainerStyle:{}};let c=p;c.__docgenInfo={description:`DEPRECATED! Use Wonder Blocks tooltip instead.

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
\`\`\``,methods:[{name:"_renderToolTipDiv",docblock:null,modifiers:[],params:[{name:"isTooltipAbove",optional:!0,type:{name:"boolean"}}],returns:null},{name:"_updateHeight",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Tooltip",props:{show:{required:!0,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},arrowSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},borderColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#ccc"',computed:!1}},verticalPosition:{required:!1,tsType:{name:"VerticalDirection"},description:"",defaultValue:{value:"VerticalDirection.Bottom",computed:!0}},horizontalPosition:{required:!1,tsType:{name:"HorizontalDirection"},description:"",defaultValue:{value:"HorizontalDirection.Left",computed:!0}},horizontalAlign:{required:!1,tsType:{name:"HorizontalDirection.Left"},description:"",defaultValue:{value:"HorizontalDirection.Left",computed:!0}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},targetContainerStyle:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:"{}",computed:!1}}}};export{u as H,c as T,m as V};
