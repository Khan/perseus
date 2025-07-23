var B=Object.defineProperty;var G=(d,h,e)=>h in d?B(d,h,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[h]=e;var s=(d,h,e)=>(G(d,typeof h!="symbol"?h+"":h,e),e);import{j as a,n as T,V as S,a2 as L,s as g,r as v,c4 as N,_ as i,ad as _,aB as b,a0 as C,ah as A,cJ as z,e as q}from"./iframe-DtbX7KBe.js";import"./item-version-BEL4jV8Z.js";import"./article-renderer-Dl2x5ihV.js";import"./server-item-renderer-BExEo_fl.js";import"./hints-renderer-BGyx14Rl.js";import{c as V}from"./components-dXgi6rqD.js";import{H as U}from"./heading-CUIhAKtf.js";const p=d=>{const{children:h,label:e,labelSide:n="left",style:r}=d;return a.jsx("label",{className:T.css(k.label),children:a.jsxs(S,{style:[k.row,r],children:[n==="start"||a.jsx(L,{style:k.spaceEnd,children:e}),h,n==="end"&&a.jsx(L,{style:k.spaceStart,children:e})]})})},k=T.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:g.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:g.xSmall_8},spaceEnd:{marginInlineEnd:g.xSmall_8}});p.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:P,InfoTip:I,RangeInput:x}=V,H={url:null,width:0,height:0};function O(d,h){return Math.floor((d[1]-d[0])/h)}const w=class w extends v.Component{constructor(e){super(e);s(this,"_isMounted",!1);s(this,"bgUrlRef",v.createRef());s(this,"labelXRef",v.createRef());s(this,"labelYRef",v.createRef());s(this,"change",(...e)=>_.apply(this,e));s(this,"changeBackgroundUrl",e=>{var l;if(e.type==="keypress"&&e.key!=="Enter")return;const n=(u,o,t)=>{const m={...this.props.backgroundImage};m.url=u,m.width=o,m.height=t,this.setState({backgroundImage:m},this.changeGraph)},r=(l=this.bgUrlRef.current)==null?void 0:l.value;r?b.getImageSize(r,(u,o)=>{this._isMounted&&n(r,u,o)}):n(null,0,0)});s(this,"renderLabelChoices",e=>e.map(n=>a.jsx("option",{value:n[1],children:n[0]},n[1])));s(this,"validRange",e=>i.every(e,function(r){return i.isFinite(r)})?e[0]>=e[1]?"Range must have a higher number on the right":!0:"Range must be a valid number");s(this,"validateStepValue",e=>{const{step:n,range:r,name:l,minTicks:u,maxTicks:o}=e,t=O(r,n);return t<u?l+" is too large, there must be at least "+u+" ticks.":t>o?l+" is too small, there can be at most "+o+" ticks.":!0});s(this,"validSnapStep",(e,n)=>this.validateStepValue({step:e,range:n,name:"Snap step",minTicks:5,maxTicks:60}));s(this,"validGridStep",(e,n)=>this.validateStepValue({step:e,range:n,name:"Grid step",minTicks:3,maxTicks:60}));s(this,"validStep",(e,n)=>this.validateStepValue({step:e,range:n,name:"Step",minTicks:3,maxTicks:20}));s(this,"validBackgroundImageSize",e=>e.url?e.width<=450&&e.height<=450?!0:"Image must be smaller than 450px x 450px.":!0);s(this,"validateGraphSettings",(e,n,r,l,u)=>{const o=this;let t;if(!i.every(e,function(c){return t=o.validRange(c),t===!0})||!i.every(n,function(c,f){return t=o.validStep(c,e[f]),t===!0})||!i.every(r,function(c,f){return t=o.validGridStep(c,e[f]),t===!0})||!i.every(l,function(c,f){return t=o.validSnapStep(c,e[f]),t===!0}))return t;const E=this.validBackgroundImageSize(u);return E!==!0?(t=E,t):!0});s(this,"changeLabel",(e,n)=>{const r=n.target.value,l=this.state.labelsTextbox.slice();l[e]=r,this.setState({labelsTextbox:l},this.changeGraph)});s(this,"changeRange",(e,n)=>{const r=this.state.rangeTextbox.slice();r[e]=n,this.setState({rangeTextbox:r},this.changeGraph)});s(this,"changeStepsBasedOnRange",()=>{const e=this.state.rangeTextbox.slice(),n=this.state.stepTextbox.slice(),r=this.state.gridStepTextbox.slice(),l=this.state.snapStepTextbox.slice(),u=b.scaleFromExtent(e[0],this.props.box[0]);if(this.validRange(e[0])===!0){n[0]=b.tickStepFromExtent(e[0],this.props.box[0]);const t=b.gridStepFromTickStep(n[0],u);t&&(r[0]=t),l[0]=r[0]/2}const o=b.scaleFromExtent(e[1],this.props.box[1]);if(this.validRange(e[1])===!0){n[1]=b.tickStepFromExtent(e[1],this.props.box[1]);const t=b.gridStepFromTickStep(n[1],o);t&&(r[1]=t),l[1]=r[1]/2}this.setState({stepTextbox:n,gridStepTextbox:r,snapStepTextbox:l,rangeTextbox:e},this.changeGraph)});s(this,"changeStep",e=>{this.setState({stepTextbox:e},this.changeGraph)});s(this,"changeSnapStep",e=>{this.setState({snapStepTextbox:e},this.changeGraph)});s(this,"changeGridStep",e=>{this.setState({gridStepTextbox:e,snapStepTextbox:i.map(e,function(n){return n/2})},this.changeGraph)});s(this,"changeGraph",()=>{const e=this.state.labelsTextbox,n=this.state.labelLocation,r=i.map(this.state.rangeTextbox,function(R){return i.map(R,Number)}),l=i.map(this.state.stepTextbox,Number),u=this.state.gridStepTextbox,o=this.state.snapStepTextbox,t=this.state.backgroundImage,m=this.validateGraphSettings(r,l,u,o,t);m===!0?this.change({valid:!0,labels:e,labelLocation:n,range:r,step:l,gridStep:u,snapStep:o,backgroundImage:t}):this.change({valid:m})});this.state={isExpanded:!0,...w.stateFromProps(e)}}static stateFromProps(e){return{labelsTextbox:e.labels,labelLocation:e.labelLocation,gridStepTextbox:e.gridStep,snapStepTextbox:e.snapStep,stepTextbox:e.step,rangeTextbox:e.range,backgroundImage:{...e.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=i.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(e){(!i.isEqual(this.props.labels,e.labels)||!i.isEqual(this.props.labelLocation,e.labelLocation)||!i.isEqual(this.props.gridStep,e.gridStep)||!i.isEqual(this.props.snapStep,e.snapStep)||!i.isEqual(this.props.step,e.step)||!i.isEqual(this.props.range,e.range)||!i.isEqual(this.props.backgroundImage,e.backgroundImage))&&this.setState(w.stateFromProps(e))}componentWillUnmount(){this._isMounted=!1}render(){return a.jsxs(a.Fragment,{children:[a.jsx(U,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&a.jsxs(S,{children:[a.jsxs("div",{className:"graph-settings",children:[a.jsx("div",{className:"perseus-widget-row",children:a.jsx(p,{label:"Label Location",children:a.jsx(P,{value:this.props.labelLocation,allowEmpty:!1,buttons:[{value:"onAxis",content:"On Axis"},{value:"alongEdge",content:"Along Graph Edge"}],onChange:this.change("labelLocation")})})}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(p,{label:"x Label",children:a.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:e=>this.changeLabel(0,e),value:this.state.labelsTextbox[0]||""})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(p,{label:"y Label",children:a.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:e=>this.changeLabel(1,e),value:this.state.labelsTextbox[1]||""})})})]}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(p,{label:"x Range",children:a.jsx(x,{value:this.state.rangeTextbox[0],onChange:e=>this.changeRange(0,e),allowPiTruncation:!0})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(p,{label:"y Range",children:a.jsx(x,{value:this.state.rangeTextbox[1],onChange:e=>this.changeRange(1,e),allowPiTruncation:!0})})})]}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(p,{label:"Tick Step",children:a.jsx(x,{value:this.state.stepTextbox,onChange:this.changeStep,allowPiTruncation:!0})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(p,{label:"Grid Step",children:a.jsx(x,{value:this.state.gridStepTextbox,onChange:this.changeGridStep,allowPiTruncation:!0})})})]}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(p,{label:"Snap Step",children:a.jsx(x,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep,allowPiTruncation:!0})})}),a.jsxs("div",{className:"perseus-widget-right-col",children:[a.jsx(C,{size:"small",kind:"tertiary",onClick:()=>{this.changeStepsBasedOnRange()},children:"Auto-adjust steps"}),a.jsxs(I,{children:[a.jsx("p",{children:'Use the "Auto-adjust" steps button to update the tick step, grid step, and snap step to values that are valid for the current range.'}),a.jsx("br",{}),a.jsx("p",{children:"This is useful when the range is changed, and the graph errors due to the step sizes being too large or too small."})]})]})]}),a.jsx("div",{className:"perseus-widget-row",children:a.jsx(p,{label:"Markings:",children:a.jsx(P,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"axes",content:"Axes"},{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(A,{label:"Show tooltips",checked:this.props.showTooltips,onChange:e=>{this.change({showTooltips:e})}})})]}),a.jsxs(p,{label:"Background image URL:",style:y.resetSpaceTop,children:[a.jsx("input",{type:"text",className:T.css(y.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:e=>{const n={...this.props.backgroundImage};n.url=e.target.value,this.setState({backgroundImage:n})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),a.jsx(I,{children:a.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),a.jsxs(S,{style:y.protractorSection,children:[a.jsx(S,{style:y.checkboxRow,children:a.jsx(A,{label:"Show protractor",checked:this.props.showProtractor,onChange:e=>{this.change({showProtractor:e})},style:y.resetSpaceTop})}),this.props.showProtractor&&a.jsx(z,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"})]})]})]})}};s(w,"defaultProps",{box:[N.defaultBoxSizeSmall,N.defaultBoxSizeSmall],labels:["$x$","$y$"],labelLocation:"onAxis",range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:H,markings:"graph",showProtractor:!1,showTooltips:!1});let j=w;const y=T.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${q.offBlack32}`,borderRadius:g.xxxSmall_4,padding:g.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:g.xSmall_8},protractorSection:{marginTop:g.xSmall_8,borderTop:`1px solid ${q.offBlack16}`,paddingTop:g.xSmall_8,paddingBottom:g.xSmall_8,borderBottom:`1px solid ${q.offBlack16}`}});j.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
    /**
     * The size of the graph area in pixels.
     */
    box: [x: number, y: number];
    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation: AxisLabelLocation;
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
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!0},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
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
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]},alias:"Props"}}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStepsBasedOnRange",docblock:null,modifiers:[],params:[],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphSettings",props:{box:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph area in pixels.",defaultValue:{value:`[
    interactiveSizes.defaultBoxSizeSmall,
    interactiveSizes.defaultBoxSizeSmall,
]`,computed:!1}},labels:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes.",defaultValue:{value:'["$x$", "$y$"]',computed:!1}},labelLocation:{required:!1,tsType:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}]},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`,defaultValue:{value:'"onAxis"',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph.",defaultValue:{value:`[
    [-10, 10],
    [-10, 10],
]`,computed:!1}},step:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`,defaultValue:{value:"[1, 1]",computed:!1}},gridStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},snapStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},valid:{required:!1,tsType:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
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
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
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
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation: AxisLabelLocation;
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
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"labelLocation",value:{name:"union",raw:'"onAxis" | "alongEdge"',elements:[{name:"literal",value:'"onAxis"'},{name:"literal",value:'"alongEdge"'}],required:!0},description:`Specifies the location of the labels on the graph.  default: "onAxis".
- "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
- "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
   The y label is rotated. Typically used when the range min is near 0 with longer labels.`},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"true | string",elements:[{name:"literal",value:"true"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url?: string | null;
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
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- axes: shows the axes without the gride lines
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};export{j as I,p as L};
