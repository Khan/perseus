import{c as I}from"./all-widgets-VckdNShu.js";import{B as A}from"./phet-simulation-2fci0qCu.js";import{_ as i}from"./underscore-885MUNGo.js";import"./random-util-9WQRKwFZ.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-Y55S7ZPk.js";import"./server-item-renderer-dsat1eWr.js";import"./article-renderer-QTjNbpsj.js";import"./hints-renderer-goFU3zk6.js";import"./renderer-Hg-eJGH1.js";import"./base-radio-j3azDPVf.js";import{c as G}from"./components-tx96aJ2k.js";import{j as R}from"./constants-vGHYchdS.js";import"./i18n-context-Q5gDzbF3.js";import{U as x}from"./util-ghoLYzZ7.js";import"./svg-image-JxxWp2z_.js";import"./jquery-5v7aFUvu.js";import"./index-smZ6iCr_.js";import{V as v}from"./index-hw7d7wq0.js";import{C as L}from"./index-F5uqTDBi.js";import{s as m,c as S}from"./index-zRqVZh6A.js";import{n as T}from"./no-important-xCWWYXQR.js";import{r as a}from"./index-6oxdNXpR.js";import{H as _}from"./heading-Irlk3f2q.js";import{b as N}from"./index-jek-Xksa.js";const p=y=>{const{children:t,label:e,labelSide:n="left",style:s}=y;return a.createElement("label",{className:T.css(w.label)},a.createElement(v,{style:[w.row,s]},n==="start"||a.createElement(N,{style:w.spaceEnd},e),t,n==="end"&&a.createElement(N,{style:w.spaceStart},e)))},w=T.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:m.xSmall_8},spaceEnd:{marginInlineEnd:m.xSmall_8}});p.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:P,InfoTip:C,RangeInput:c}=G,B={url:null,width:0,height:0};function z(y,t){return Math.floor((y[1]-y[0])/t)}const f=class f extends a.Component{constructor(t){super(t),this._isMounted=!1,this.bgUrlRef=a.createRef(),this.labelXRef=a.createRef(),this.labelYRef=a.createRef(),this.change=(...e)=>I.apply(this,e),this.changeBackgroundUrl=e=>{var l;if(e.type==="keypress"&&e.key!=="Enter")return;const n=(u,o,r)=>{const h={...this.props.backgroundImage};h.url=u,h.width=o,h.height=r,this.setState({backgroundImage:h},this.changeGraph)},s=(l=this.bgUrlRef.current)==null?void 0:l.value;s?x.getImageSize(s,(u,o)=>{this._isMounted&&n(s,u,o)}):n(null,0,0)},this.renderLabelChoices=e=>e.map(n=>a.createElement("option",{key:n[1],value:n[1]},n[0])),this.validRange=e=>i.every(e,function(s){return i.isFinite(s)})?e[0]>=e[1]?"Range must have a higher number on the right":!0:"Range must be a valid number",this.validateStepValue=e=>{const{step:n,range:s,name:l,minTicks:u,maxTicks:o}=e,r=z(s,n);return r<u?l+" is too large, there must be at least "+u+" ticks.":r>o?l+" is too small, there can be at most "+o+" ticks.":!0},this.validSnapStep=(e,n)=>this.validateStepValue({step:e,range:n,name:"Snap step",minTicks:5,maxTicks:60}),this.validGridStep=(e,n)=>this.validateStepValue({step:e,range:n,name:"Grid step",minTicks:3,maxTicks:60}),this.validStep=(e,n)=>this.validateStepValue({step:e,range:n,name:"Step",minTicks:3,maxTicks:20}),this.validBackgroundImageSize=e=>e.url?e.width<=450&&e.height<=450?!0:"Image must be smaller than 450px x 450px.":!0,this.validateGraphSettings=(e,n,s,l,u)=>{const o=this;let r;if(!i.every(e,function(d){return r=o.validRange(d),r===!0})||!i.every(n,function(d,g){return r=o.validStep(d,e[g]),r===!0})||!i.every(s,function(d,g){return r=o.validGridStep(d,e[g]),r===!0})||!i.every(l,function(d,g){return r=o.validSnapStep(d,e[g]),r===!0}))return r;const q=this.validBackgroundImageSize(u);return q!==!0?(r=q,r):!0},this.changeLabel=(e,n)=>{const s=n.target.value,l=this.state.labelsTextbox.slice();l[e]=s,this.setState({labelsTextbox:l},this.changeGraph)},this.changeRange=(e,n)=>{const s=this.state.rangeTextbox.slice();s[e]=n;const l=this.state.stepTextbox.slice(),u=this.state.gridStepTextbox.slice(),o=this.state.snapStepTextbox.slice(),r=x.scaleFromExtent(s[e],this.props.box[e]);if(this.validRange(s[e])===!0){l[e]=x.tickStepFromExtent(s[e],this.props.box[e]);const h=x.gridStepFromTickStep(l[e],r);h&&(u[e]=h),o[e]=u[e]/2}this.setState({stepTextbox:l,gridStepTextbox:u,snapStepTextbox:o,rangeTextbox:s},this.changeGraph)},this.changeStep=e=>{this.setState({stepTextbox:e},this.changeGraph)},this.changeSnapStep=e=>{this.setState({snapStepTextbox:e},this.changeGraph)},this.changeGridStep=e=>{this.setState({gridStepTextbox:e,snapStepTextbox:i.map(e,function(n){return n/2})},this.changeGraph)},this.changeGraph=()=>{const e=this.state.labelsTextbox,n=this.state.labelLocation,s=i.map(this.state.rangeTextbox,function(E){return i.map(E,Number)}),l=i.map(this.state.stepTextbox,Number),u=this.state.gridStepTextbox,o=this.state.snapStepTextbox,r=this.state.backgroundImage,h=this.validateGraphSettings(s,l,u,o,r);h===!0?this.change({valid:!0,labels:e,labelLocation:n,range:s,step:l,gridStep:u,snapStep:o,backgroundImage:r}):this.change({valid:h})},this.state={isExpanded:!0,...f.stateFromProps(t)}}static stateFromProps(t){return{labelsTextbox:t.labels,labelLocation:t.labelLocation,gridStepTextbox:t.gridStep,snapStepTextbox:t.snapStep,stepTextbox:t.step,rangeTextbox:t.range,backgroundImage:{...t.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=i.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(t){(!i.isEqual(this.props.labels,t.labels)||!i.isEqual(this.props.labelLocation,t.labelLocation)||!i.isEqual(this.props.gridStep,t.gridStep)||!i.isEqual(this.props.snapStep,t.snapStep)||!i.isEqual(this.props.step,t.step)||!i.isEqual(this.props.range,t.range)||!i.isEqual(this.props.backgroundImage,t.backgroundImage))&&this.setState(f.stateFromProps(t))}componentWillUnmount(){this._isMounted=!1}render(){return a.createElement(a.Fragment,null,a.createElement(_,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&a.createElement(v,null,a.createElement("div",{className:"graph-settings"},a.createElement("div",{className:"perseus-widget-row"},a.createElement(p,{label:"Label Location"},a.createElement(P,{value:this.props.labelLocation,allowEmpty:!1,buttons:[{value:"onAxis",content:"On Axis"},{value:"alongEdge",content:"Along Graph Edge"}],onChange:this.change("labelLocation")}))),a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(p,{label:"x Label"},a.createElement("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:t=>this.changeLabel(0,t),value:this.state.labelsTextbox[0]||""}))),a.createElement("div",{className:"perseus-widget-right-col"},a.createElement(p,{label:"y Label"},a.createElement("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:t=>this.changeLabel(1,t),value:this.state.labelsTextbox[1]||""})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(p,{label:"x Range"},a.createElement(c,{value:this.state.rangeTextbox[0],onChange:t=>this.changeRange(0,t),allowPiTruncation:!0}))),a.createElement("div",{className:"perseus-widget-right-col"},a.createElement(p,{label:"y Range"},a.createElement(c,{value:this.state.rangeTextbox[1],onChange:t=>this.changeRange(1,t),allowPiTruncation:!0})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(p,{label:"Tick Step"},a.createElement(c,{value:this.state.stepTextbox,onChange:this.changeStep,allowPiTruncation:!0}))),a.createElement("div",{className:"perseus-widget-right-col"},a.createElement(p,{label:"Grid Step"},a.createElement(c,{value:this.state.gridStepTextbox,onChange:this.changeGridStep,allowPiTruncation:!0})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(p,{label:"Snap Step"},a.createElement(c,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep,allowPiTruncation:!0})))),a.createElement("div",{className:"perseus-widget-row"},a.createElement(p,{label:"Markings:"},a.createElement(P,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"axes",content:"Axes"},{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")}))),a.createElement("div",{className:"perseus-widget-left-col"},a.createElement(L,{label:"Show tooltips",checked:this.props.showTooltips,onChange:t=>{this.change({showTooltips:t})}}))),a.createElement(p,{label:"Background image URL:",style:b.resetSpaceTop},a.createElement("input",{type:"text",className:T.css(b.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:t=>{const e={...this.props.backgroundImage};e.url=t.target.value,this.setState({backgroundImage:e})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),a.createElement(C,null,a.createElement("p",null,'Create an image in graphie, or use the "Add image" function to create a background.'))),a.createElement(v,{style:b.protractorSection},a.createElement(v,{style:b.checkboxRow},a.createElement(L,{label:"Show protractor",checked:this.props.showProtractor,onChange:t=>{this.change({showProtractor:t})},style:b.resetSpaceTop})),this.props.showProtractor&&a.createElement(A,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"}))))}};f.defaultProps={box:[R.defaultBoxSizeSmall,R.defaultBoxSizeSmall],labels:["$x$","$y$"],labelLocation:"onAxis",range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:B,markings:"graph",showProtractor:!1,showTooltips:!1};let k=f;const b=T.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${S.offBlack32}`,borderRadius:m.xxxSmall_4,padding:m.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:m.xSmall_8},protractorSection:{marginTop:m.xSmall_8,borderTop:`1px solid ${S.offBlack16}`,paddingTop:m.xSmall_8,paddingBottom:m.xSmall_8,borderBottom:`1px solid ${S.offBlack16}`}}),pe=k;k.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
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
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};export{pe as I,p as L};
