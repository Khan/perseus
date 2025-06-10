var I=Object.defineProperty;var _=(m,h,e)=>h in m?I(m,h,{enumerable:!0,configurable:!0,writable:!0,value:e}):m[h]=e;var s=(m,h,e)=>(_(m,typeof h!="symbol"?h+"":h,e),e);import{j as a,n as S,V as T,a2 as L,s as g,r as w,c4 as N,_ as i,ae as G,aC as v,ai as P,cA as C,e as q}from"./iframe-DUcWS4Kc.js";import"./item-version-DV7ga0wE.js";import"./article-renderer-DapLuozo.js";import"./server-item-renderer-C1A2hIGM.js";import"./hints-renderer-B13fU_rg.js";import{c as B}from"./components-CLfYsQvP.js";import{H as z}from"./heading-DbiXbMlM.js";const d=m=>{const{children:h,label:e,labelSide:n="left",style:r}=m;return a.jsx("label",{className:S.css(k.label),children:a.jsxs(T,{style:[k.row,r],children:[n==="start"||a.jsx(L,{style:k.spaceEnd,children:e}),h,n==="end"&&a.jsx(L,{style:k.spaceStart,children:e})]})})},k=S.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:g.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:g.xSmall_8},spaceEnd:{marginInlineEnd:g.xSmall_8}});d.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:A,InfoTip:V,RangeInput:f}=B,H={url:null,width:0,height:0};function U(m,h){return Math.floor((m[1]-m[0])/h)}const y=class y extends w.Component{constructor(e){super(e);s(this,"_isMounted",!1);s(this,"bgUrlRef",w.createRef());s(this,"labelXRef",w.createRef());s(this,"labelYRef",w.createRef());s(this,"change",(...e)=>G.apply(this,e));s(this,"changeBackgroundUrl",e=>{var l;if(e.type==="keypress"&&e.key!=="Enter")return;const n=(u,o,t)=>{const p={...this.props.backgroundImage};p.url=u,p.width=o,p.height=t,this.setState({backgroundImage:p},this.changeGraph)},r=(l=this.bgUrlRef.current)==null?void 0:l.value;r?v.getImageSize(r,(u,o)=>{this._isMounted&&n(r,u,o)}):n(null,0,0)});s(this,"renderLabelChoices",e=>e.map(n=>a.jsx("option",{value:n[1],children:n[0]},n[1])));s(this,"validRange",e=>i.every(e,function(r){return i.isFinite(r)})?e[0]>=e[1]?"Range must have a higher number on the right":!0:"Range must be a valid number");s(this,"validateStepValue",e=>{const{step:n,range:r,name:l,minTicks:u,maxTicks:o}=e,t=U(r,n);return t<u?l+" is too large, there must be at least "+u+" ticks.":t>o?l+" is too small, there can be at most "+o+" ticks.":!0});s(this,"validSnapStep",(e,n)=>this.validateStepValue({step:e,range:n,name:"Snap step",minTicks:5,maxTicks:60}));s(this,"validGridStep",(e,n)=>this.validateStepValue({step:e,range:n,name:"Grid step",minTicks:3,maxTicks:60}));s(this,"validStep",(e,n)=>this.validateStepValue({step:e,range:n,name:"Step",minTicks:3,maxTicks:20}));s(this,"validBackgroundImageSize",e=>e.url?e.width<=450&&e.height<=450?!0:"Image must be smaller than 450px x 450px.":!0);s(this,"validateGraphSettings",(e,n,r,l,u)=>{const o=this;let t;if(!i.every(e,function(c){return t=o.validRange(c),t===!0})||!i.every(n,function(c,b){return t=o.validStep(c,e[b]),t===!0})||!i.every(r,function(c,b){return t=o.validGridStep(c,e[b]),t===!0})||!i.every(l,function(c,b){return t=o.validSnapStep(c,e[b]),t===!0}))return t;const E=this.validBackgroundImageSize(u);return E!==!0?(t=E,t):!0});s(this,"changeLabel",(e,n)=>{const r=n.target.value,l=this.state.labelsTextbox.slice();l[e]=r,this.setState({labelsTextbox:l},this.changeGraph)});s(this,"changeRange",(e,n)=>{const r=this.state.rangeTextbox.slice();r[e]=n;const l=this.state.stepTextbox.slice(),u=this.state.gridStepTextbox.slice(),o=this.state.snapStepTextbox.slice(),t=v.scaleFromExtent(r[e],this.props.box[e]);if(this.validRange(r[e])===!0){l[e]=v.tickStepFromExtent(r[e],this.props.box[e]);const p=v.gridStepFromTickStep(l[e],t);p&&(u[e]=p),o[e]=u[e]/2}this.setState({stepTextbox:l,gridStepTextbox:u,snapStepTextbox:o,rangeTextbox:r},this.changeGraph)});s(this,"changeStep",e=>{this.setState({stepTextbox:e},this.changeGraph)});s(this,"changeSnapStep",e=>{this.setState({snapStepTextbox:e},this.changeGraph)});s(this,"changeGridStep",e=>{this.setState({gridStepTextbox:e,snapStepTextbox:i.map(e,function(n){return n/2})},this.changeGraph)});s(this,"changeGraph",()=>{const e=this.state.labelsTextbox,n=this.state.labelLocation,r=i.map(this.state.rangeTextbox,function(j){return i.map(j,Number)}),l=i.map(this.state.stepTextbox,Number),u=this.state.gridStepTextbox,o=this.state.snapStepTextbox,t=this.state.backgroundImage,p=this.validateGraphSettings(r,l,u,o,t);p===!0?this.change({valid:!0,labels:e,labelLocation:n,range:r,step:l,gridStep:u,snapStep:o,backgroundImage:t}):this.change({valid:p})});this.state={isExpanded:!0,...y.stateFromProps(e)}}static stateFromProps(e){return{labelsTextbox:e.labels,labelLocation:e.labelLocation,gridStepTextbox:e.gridStep,snapStepTextbox:e.snapStep,stepTextbox:e.step,rangeTextbox:e.range,backgroundImage:{...e.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=i.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(e){(!i.isEqual(this.props.labels,e.labels)||!i.isEqual(this.props.labelLocation,e.labelLocation)||!i.isEqual(this.props.gridStep,e.gridStep)||!i.isEqual(this.props.snapStep,e.snapStep)||!i.isEqual(this.props.step,e.step)||!i.isEqual(this.props.range,e.range)||!i.isEqual(this.props.backgroundImage,e.backgroundImage))&&this.setState(y.stateFromProps(e))}componentWillUnmount(){this._isMounted=!1}render(){return a.jsxs(a.Fragment,{children:[a.jsx(z,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&a.jsxs(T,{children:[a.jsxs("div",{className:"graph-settings",children:[a.jsx("div",{className:"perseus-widget-row",children:a.jsx(d,{label:"Label Location",children:a.jsx(A,{value:this.props.labelLocation,allowEmpty:!1,buttons:[{value:"onAxis",content:"On Axis"},{value:"alongEdge",content:"Along Graph Edge"}],onChange:this.change("labelLocation")})})}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(d,{label:"x Label",children:a.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:e=>this.changeLabel(0,e),value:this.state.labelsTextbox[0]||""})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(d,{label:"y Label",children:a.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:e=>this.changeLabel(1,e),value:this.state.labelsTextbox[1]||""})})})]}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(d,{label:"x Range",children:a.jsx(f,{value:this.state.rangeTextbox[0],onChange:e=>this.changeRange(0,e),allowPiTruncation:!0})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(d,{label:"y Range",children:a.jsx(f,{value:this.state.rangeTextbox[1],onChange:e=>this.changeRange(1,e),allowPiTruncation:!0})})})]}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(d,{label:"Tick Step",children:a.jsx(f,{value:this.state.stepTextbox,onChange:this.changeStep,allowPiTruncation:!0})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(d,{label:"Grid Step",children:a.jsx(f,{value:this.state.gridStepTextbox,onChange:this.changeGridStep,allowPiTruncation:!0})})})]}),a.jsx("div",{className:"perseus-widget-row",children:a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(d,{label:"Snap Step",children:a.jsx(f,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep,allowPiTruncation:!0})})})}),a.jsx("div",{className:"perseus-widget-row",children:a.jsx(d,{label:"Markings:",children:a.jsx(A,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"axes",content:"Axes"},{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(P,{label:"Show tooltips",checked:this.props.showTooltips,onChange:e=>{this.change({showTooltips:e})}})})]}),a.jsxs(d,{label:"Background image URL:",style:x.resetSpaceTop,children:[a.jsx("input",{type:"text",className:S.css(x.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:e=>{const n={...this.props.backgroundImage};n.url=e.target.value,this.setState({backgroundImage:n})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),a.jsx(V,{children:a.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),a.jsxs(T,{style:x.protractorSection,children:[a.jsx(T,{style:x.checkboxRow,children:a.jsx(P,{label:"Show protractor",checked:this.props.showProtractor,onChange:e=>{this.change({showProtractor:e})},style:x.resetSpaceTop})}),this.props.showProtractor&&a.jsx(C,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"})]})]})]})}};s(y,"defaultProps",{box:[N.defaultBoxSizeSmall,N.defaultBoxSizeSmall],labels:["$x$","$y$"],labelLocation:"onAxis",range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:H,markings:"graph",showProtractor:!1,showTooltips:!1});let R=y;const x=S.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${q.offBlack32}`,borderRadius:g.xxxSmall_4,padding:g.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:g.xSmall_8},protractorSection:{marginTop:g.xSmall_8,borderTop:`1px solid ${q.offBlack16}`,paddingTop:g.xSmall_8,paddingBottom:g.xSmall_8,borderBottom:`1px solid ${q.offBlack16}`}});R.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
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
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]},alias:"Props"}}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphSettings",props:{box:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph area in pixels.",defaultValue:{value:`[
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
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};export{R as I,d as L};
