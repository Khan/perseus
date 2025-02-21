import{c as I}from"./all-widgets-UbNvf8Lw.js";import{B as N}from"./phet-simulation-Sua1c876.js";import{_ as o}from"./underscore-885MUNGo.js";import"./random-util-g9RgnkPR.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-Y55S7ZPk.js";import"./server-item-renderer-l6FMiMu3.js";import"./article-renderer-E0xKSLoG.js";import"./hints-renderer-U7yoitaB.js";import"./renderer-IIGnnjEs.js";import"./base-radio-biJvF5YX.js";import{c as _}from"./components-cU7oGhwm.js";import{j as E}from"./constants-vGHYchdS.js";import"./i18n-context-jir6aF-r.js";import{U as x}from"./util-WQRabdk_.js";import"./svg-image-XSbIxrin.js";import"./jquery-5v7aFUvu.js";import"./index-smZ6iCr_.js";import{V as k}from"./index-iTGWTR8W.js";import{C as R}from"./index-Mag-4PMw.js";import{s as h,c as T}from"./index-QHkT31Yt.js";import{n as S}from"./no-important-xCWWYXQR.js";import{r as a}from"./index-6oxdNXpR.js";import{H as G}from"./heading-1Cay4iDE.js";import{b as P}from"./index-OUR0CuKj.js";const m=y=>{const{children:t,label:e,labelSide:n="left",style:s}=y;return a.createElement("label",{className:S.css(w.label)},a.createElement(k,{style:[w.row,s]},n==="start"||a.createElement(P,{style:w.spaceEnd},e),t,n==="end"&&a.createElement(P,{style:w.spaceStart},e)))},w=S.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:h.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:h.xSmall_8},spaceEnd:{marginInlineEnd:h.xSmall_8}});m.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:B,InfoTip:C,RangeInput:c}=_,z={url:null,width:0,height:0};function U(y,t){return Math.floor((y[1]-y[0])/t)}const f=class f extends a.Component{constructor(t){super(t),this._isMounted=!1,this.bgUrlRef=a.createRef(),this.labelXRef=a.createRef(),this.labelYRef=a.createRef(),this.change=(...e)=>I.apply(this,e),this.changeBackgroundUrl=e=>{var i;if(e.type==="keypress"&&e.key!=="Enter")return;const n=(u,l,r)=>{const p={...this.props.backgroundImage};p.url=u,p.width=l,p.height=r,this.setState({backgroundImage:p},this.changeGraph)},s=(i=this.bgUrlRef.current)==null?void 0:i.value;s?x.getImageSize(s,(u,l)=>{this._isMounted&&n(s,u,l)}):n(null,0,0)},this.renderLabelChoices=e=>e.map(n=>a.createElement("option",{key:n[1],value:n[1]},n[0])),this.validRange=e=>o.every(e,function(s){return o.isFinite(s)})?e[0]>=e[1]?"Range must have a higher number on the right":!0:"Range must be a valid number",this.validateStepValue=e=>{const{step:n,range:s,name:i,minTicks:u,maxTicks:l}=e,r=U(s,n);return r<u?i+" is too large, there must be at least "+u+" ticks.":r>l?i+" is too small, there can be at most "+l+" ticks.":!0},this.validSnapStep=(e,n)=>this.validateStepValue({step:e,range:n,name:"Snap step",minTicks:5,maxTicks:60}),this.validGridStep=(e,n)=>this.validateStepValue({step:e,range:n,name:"Grid step",minTicks:3,maxTicks:60}),this.validStep=(e,n)=>this.validateStepValue({step:e,range:n,name:"Step",minTicks:3,maxTicks:20}),this.validBackgroundImageSize=e=>e.url?e.width<=450&&e.height<=450?!0:"Image must be smaller than 450px x 450px.":!0,this.validateGraphSettings=(e,n,s,i,u)=>{const l=this;let r;if(!o.every(e,function(d){return r=l.validRange(d),r===!0})||!o.every(n,function(d,g){return r=l.validStep(d,e[g]),r===!0})||!o.every(s,function(d,g){return r=l.validGridStep(d,e[g]),r===!0})||!o.every(i,function(d,g){return r=l.validSnapStep(d,e[g]),r===!0}))return r;const q=this.validBackgroundImageSize(u);return q!==!0?(r=q,r):!0},this.changeLabel=(e,n)=>{const s=n.target.value,i=this.state.labelsTextbox.slice();i[e]=s,this.setState({labelsTextbox:i},this.changeGraph)},this.changeRange=(e,n)=>{const s=this.state.rangeTextbox.slice();s[e]=n;const i=this.state.stepTextbox.slice(),u=this.state.gridStepTextbox.slice(),l=this.state.snapStepTextbox.slice(),r=x.scaleFromExtent(s[e],this.props.box[e]);if(this.validRange(s[e])===!0){i[e]=x.tickStepFromExtent(s[e],this.props.box[e]);const p=x.gridStepFromTickStep(i[e],r);p&&(u[e]=p),l[e]=u[e]/2}this.setState({stepTextbox:i,gridStepTextbox:u,snapStepTextbox:l,rangeTextbox:s},this.changeGraph)},this.changeStep=e=>{this.setState({stepTextbox:e},this.changeGraph)},this.changeSnapStep=e=>{this.setState({snapStepTextbox:e},this.changeGraph)},this.changeGridStep=e=>{this.setState({gridStepTextbox:e,snapStepTextbox:o.map(e,function(n){return n/2})},this.changeGraph)},this.changeGraph=()=>{const e=this.state.labelsTextbox,n=o.map(this.state.rangeTextbox,function(p){return o.map(p,Number)}),s=o.map(this.state.stepTextbox,Number),i=this.state.gridStepTextbox,u=this.state.snapStepTextbox,l=this.state.backgroundImage,r=this.validateGraphSettings(n,s,i,u,l);r===!0?this.change({valid:!0,labels:e,range:n,step:s,gridStep:i,snapStep:u,backgroundImage:l}):this.change({valid:r})},this.state={isExpanded:!0,...f.stateFromProps(t)}}static stateFromProps(t){return{labelsTextbox:t.labels,gridStepTextbox:t.gridStep,snapStepTextbox:t.snapStep,stepTextbox:t.step,rangeTextbox:t.range,backgroundImage:{...t.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=o.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(t){(!o.isEqual(this.props.labels,t.labels)||!o.isEqual(this.props.gridStep,t.gridStep)||!o.isEqual(this.props.snapStep,t.snapStep)||!o.isEqual(this.props.step,t.step)||!o.isEqual(this.props.range,t.range)||!o.isEqual(this.props.backgroundImage,t.backgroundImage))&&this.setState(f.stateFromProps(t))}componentWillUnmount(){this._isMounted=!1}render(){return a.createElement(a.Fragment,null,a.createElement(G,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&a.createElement(k,null,a.createElement("div",{className:"graph-settings"},a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(m,{label:"x Label"},a.createElement("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:t=>this.changeLabel(0,t),value:this.state.labelsTextbox[0]||""}))),a.createElement("div",{className:"perseus-widget-right-col"},a.createElement(m,{label:"y Label"},a.createElement("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:t=>this.changeLabel(1,t),value:this.state.labelsTextbox[1]||""})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(m,{label:"x Range"},a.createElement(c,{value:this.state.rangeTextbox[0],onChange:t=>this.changeRange(0,t),allowPiTruncation:!0}))),a.createElement("div",{className:"perseus-widget-right-col"},a.createElement(m,{label:"y Range"},a.createElement(c,{value:this.state.rangeTextbox[1],onChange:t=>this.changeRange(1,t),allowPiTruncation:!0})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(m,{label:"Tick Step"},a.createElement(c,{value:this.state.stepTextbox,onChange:this.changeStep,allowPiTruncation:!0}))),a.createElement("div",{className:"perseus-widget-right-col"},a.createElement(m,{label:"Grid Step"},a.createElement(c,{value:this.state.gridStepTextbox,onChange:this.changeGridStep,allowPiTruncation:!0})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(m,{label:"Snap Step"},a.createElement(c,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep,allowPiTruncation:!0})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement(m,{label:"Markings:"},a.createElement(B,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"axes",content:"Axes"},{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")}))),a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(R,{label:"Show tooltips",checked:this.props.showTooltips,onChange:t=>{this.change({showTooltips:t})}}))),a.createElement(m,{label:"Background image URL:",style:b.resetSpaceTop},a.createElement("input",{type:"text",className:S.css(b.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:t=>{const e={...this.props.backgroundImage};e.url=t.target.value,this.setState({backgroundImage:e})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),a.createElement(C,null,a.createElement("p",null,'Create an image in graphie, or use the "Add image" function to create a background.'))),a.createElement(k,{style:b.protractorSection},a.createElement(k,{style:b.checkboxRow},a.createElement(R,{label:"Show protractor",checked:this.props.showProtractor,onChange:t=>{this.change({showProtractor:t})},style:b.resetSpaceTop})),this.props.showProtractor&&a.createElement(N,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"}))))}};f.defaultProps={box:[E.defaultBoxSizeSmall,E.defaultBoxSizeSmall],labels:["$x$","$y$"],range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:z,markings:"graph",showProtractor:!1,showTooltips:!1};let v=f;const b=S.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${T.offBlack32}`,borderRadius:h.xxxSmall_4,padding:h.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:h.xSmall_8},protractorSection:{marginTop:h.xSmall_8,borderTop:`1px solid ${T.offBlack16}`,paddingTop:h.xSmall_8,paddingBottom:h.xSmall_8,borderBottom:`1px solid ${T.offBlack16}`}}),me=v;v.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
    /**
     * The size of the graph area in pixels.
     */
    box: [x: number, y: number];
    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * The range of the graph.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;

    /**
     * The type of markings to display on the graph.
     * - axes: shows the axes without the gride lines
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     */
    showTooltips: boolean;

    onChange: (arg1: Partial<Props>) => void;
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]},alias:"Props"}}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphSettings",props:{box:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph area in pixels.",defaultValue:{value:`[
    interactiveSizes.defaultBoxSizeSmall,
    interactiveSizes.defaultBoxSizeSmall,
]`,computed:!1}},labels:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes.",defaultValue:{value:'["$x$", "$y$"]',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph.",defaultValue:{value:`[
    [-10, 10],
    [-10, 10],
]`,computed:!1}},step:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`,defaultValue:{value:"[1, 1]",computed:!1}},gridStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},snapStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},valid:{required:!1,tsType:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
    url: null,
    width: 0,
    height: 0,
}`,computed:!1}},markings:{required:!1,tsType:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`,defaultValue:{value:'"graph"',computed:!1}},showProtractor:{required:!1,tsType:{name:"boolean"},description:"Whether to show the protractor on the graph.",defaultValue:{value:"false",computed:!1}},showTooltips:{required:!1,tsType:{name:"boolean"},description:"Whether to show tooltips on the graph.",defaultValue:{value:"false",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    /**
     * The size of the graph area in pixels.
     */
    box: [x: number, y: number];
    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * The range of the graph.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;

    /**
     * The type of markings to display on the graph.
     * - axes: shows the axes without the gride lines
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     */
    showTooltips: boolean;

    onChange: (arg1: Partial<Props>) => void;
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};export{me as I,m as L};
