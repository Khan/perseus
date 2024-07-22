import{j as g}from"./jsx-runtime-5BUNAZ9W.js";import{r as b}from"./index-4g5l5LRQ.js";import{R as y}from"./index-jmm5gWkb.js";const r=class r extends b.Component{constructor(){super(...arguments),this.state={visible:!1,marginBottomPx:0,zoomed:!0},this.reset=()=>{this._isMounted&&this.state.visible&&(this._originalWidth=null,this.setState({visible:!1,compactHeight:null,expandedHeight:null,zoomed:!0},()=>{this.measureAndScaleChildToFit(!1)}))},this.stopPropagationIfZoomed=e=>{this.state.zoomed||e.stopPropagation()},this.handleClickIfZoomed=e=>{this.state.zoomed||(e.stopPropagation(),this.handleClick())},this.handleClick=()=>{this.setState({zoomed:!this.state.zoomed})}}componentDidMount(){this._isMounted=!0,this.maybeInitializeMeasuring()}componentDidUpdate(){this.maybeInitializeMeasuring()}componentWillUnmount(){window.removeEventListener("resize",this.reset),this._observer&&this._observer.disconnect(),this._isMounted=!1}maybeInitializeMeasuring(){const e=this.props.readyToMeasure&&!this._measuringInitialized;this._isMounted&&e&&(this._measuringInitialized=!0,this._node=y.findDOMNode(this),setTimeout(()=>this.measureAndScaleChildToFit(!1),0),window.MutationObserver&&(this._observer=new MutationObserver(t=>{if(this._isMounted){for(const i of t)if(i.target!==this._node){this.measureAndScaleChildToFit(this.state.zoomed);break}}}),this._observer.observe(this._node,{childList:!0,subtree:!0,attributes:!0})),window.addEventListener("resize",this.reset))}measureAndScaleChildToFit(e){if(!this._isMounted)return;const t={width:this._node.offsetWidth,height:this._node.offsetHeight},i=this.props.computeChildBounds(this._node,t),s=i.width+1,n=i.height+1;if(s>t.width){const o=t.width/s;this.setState({scale:o,zoomed:e,compactHeight:Math.ceil(o*n),expandedHeight:n}),setTimeout(()=>{this._isMounted&&this.setState({visible:!0})})}else this.setState({visible:!0})}render(){const{visible:e,scale:t,compactHeight:i,expandedHeight:s,zoomed:n}=this.state,{animateHeight:o,disableEntranceAnimation:h}=this.props,c=e?{transitionProperty:o?"opacity transform height":"opacity transform",transitionDuration:"0.3s",transitionTimingFunction:"ease-out"}:{},l=!h&&!e,d=l?" translate(0, 8px)":"",m=l?0:1,u=(t??1).toString(),p=n?`scale(1, 1) ${d}`:`scale(${u}, ${u}) ${d}`,f={display:"block",width:"100%",height:n?s:i,transform:p,transformOrigin:"0 0",opacity:m,WebkitTapHighlightColor:"transparent",...c};return g("span",{onClick:this.handleClick,onClickCapture:this.handleClickIfZoomed,onTouchCancelCapture:this.stopPropagationIfZoomed,onTouchEndCapture:this.stopPropagationIfZoomed,onTouchStartCapture:this.stopPropagationIfZoomed,style:f,children:this.props.children})}};r.defaultProps={animateHeight:!1,readyToMeasure:!0,disableEntranceAnimation:!1,computeChildBounds:e=>{const t=e.firstElementChild;return{width:t.offsetWidth,height:t.offsetHeight}}};let a=r;a.__docgenInfo={description:"",methods:[{name:"reset",docblock:null,modifiers:[],params:[],returns:{type:{name:"void"}}},{name:"maybeInitializeMeasuring",docblock:`Calls measureAndScaleChildToFit and sets up a MutationObserver
to call measureAndScaleChildToFit if Zoomable's children change.

If the readyToMeasure prop isn't true or if measuring has already
been initialized this method does nothing.`,modifiers:[],params:[],returns:null,description:`Calls measureAndScaleChildToFit and sets up a MutationObserver
to call measureAndScaleChildToFit if Zoomable's children change.

If the readyToMeasure prop isn't true or if measuring has already
been initialized this method does nothing.`},{name:"stopPropagationIfZoomed",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactTouchEvent",raw:"React.TouchEvent",alias:"React.TouchEvent"}}],returns:null},{name:"measureAndScaleChildToFit",docblock:null,modifiers:[],params:[{name:"zoomed",optional:!1,type:{name:"boolean"}}],returns:null},{name:"handleClickIfZoomed",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactMouseEvent",raw:"React.MouseEvent",alias:"React.MouseEvent"}}],returns:null},{name:"handleClick",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Zoomable",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},animateHeight:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disableEntranceAnimation:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},computeChildBounds:{required:!1,tsType:{name:"signature",type:"function",raw:`(
    parentNode: HTMLElement,
    parentBounds: Bounds,
) => Bounds`,signature:{arguments:[{type:{name:"HTMLElement"},name:"parentNode"},{type:{name:"signature",type:"object",raw:`{
    width: number;
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},name:"parentBounds"}],return:{name:"signature",type:"object",raw:`{
    width: number;
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}}},description:`Optional function that allows customizations in zooming.

Defaults to just using the bounding client rect of the first DOM
element of this component.`,defaultValue:{value:`(parentNode) => {
    const firstChild = parentNode.firstElementChild;

    return {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetWidth' does not exist on type 'Element'.
        width: firstChild.offsetWidth,
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetHeight' does not exist on type 'Element'.
        height: firstChild.offsetHeight,
    };
}`,computed:!1}},readyToMeasure:{required:!1,tsType:{name:"boolean"},description:`Optional boolean specifying whether the component is ready to measure
or not.  Defaults to true for synchronous components like tables.`,defaultValue:{value:"true",computed:!1}}}};export{a as Z};
