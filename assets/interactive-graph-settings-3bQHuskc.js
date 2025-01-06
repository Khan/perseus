import{j as a}from"./jsx-runtime-63Ea5SlK.js";import{c as P}from"./article-renderer-nb-Ygn5X.js";import{_ as o}from"./jquery-yG1GhClm.js";import{U as x}from"./util-_iDv4tVD.js";import{B as E}from"./phet-simulation-hVRVRfpl.js";import"./version-akiLXZts.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-ooj0_ZRv.js";import"./perseus-item-r8f_b4Ci.js";import"./hints-renderer-rFnohg-h.js";import"./renderer-AFQFCCCa.js";import"./base-radio-B-aOvhxE.js";import{c as _}from"./components-9-Pv2o0C.js";import{i as j}from"./constants-iPV6vHZm.js";import"./i18n-context-ei4f54eq.js";import"./svg-image--maxZNcn.js";import"./index-smZ6iCr_.js";import{V as v}from"./index-CgfdZoMj.js";import{C as N}from"./index-n_qhmlFr.js";import{s as d,c as q}from"./index-dmcq622U.js";import{l as T}from"./index-awljIyHI.js";import{r as k}from"./index-6oxdNXpR.js";import{H as G}from"./heading-ZiSKfWRf.js";import{b as I}from"./index-6ID5EQ9c.js";const h=y=>{const{children:n,label:e,labelSide:t="left",style:s}=y;return a.jsx("label",{className:T.css(w.label),children:a.jsxs(v,{style:[w.row,s],children:[t==="start"||a.jsx(I,{style:w.spaceEnd,children:e}),n,t==="end"&&a.jsx(I,{style:w.spaceStart,children:e})]})})},w=T.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:d.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:d.xSmall_8},spaceEnd:{marginInlineEnd:d.xSmall_8}});h.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:B,InfoTip:C,RangeInput:c}=_,z={url:null,width:0,height:0};function U(y,n){return Math.floor((y[1]-y[0])/n)}const f=class f extends k.Component{constructor(n){super(n),this._isMounted=!1,this.bgUrlRef=k.createRef(),this.labelXRef=k.createRef(),this.labelYRef=k.createRef(),this.change=(...e)=>P.apply(this,e),this.changeBackgroundUrl=e=>{var i;if(e.type==="keypress"&&e.key!=="Enter")return;const t=(u,l,r)=>{const p={...this.props.backgroundImage};p.url=u,p.width=l,p.height=r,this.setState({backgroundImage:p},this.changeGraph)},s=(i=this.bgUrlRef.current)==null?void 0:i.value;s?x.getImageSize(s,(u,l)=>{this._isMounted&&t(s,u,l)}):t(null,0,0)},this.renderLabelChoices=e=>e.map(t=>a.jsx("option",{value:t[1],children:t[0]},t[1])),this.validRange=e=>o.every(e,function(s){return o.isFinite(s)})?e[0]>=e[1]?"Range must have a higher number on the right":!0:"Range must be a valid number",this.validateStepValue=e=>{const{step:t,range:s,name:i,minTicks:u,maxTicks:l}=e,r=U(s,t);return r<u?i+" is too large, there must be at least "+u+" ticks.":r>l?i+" is too small, there can be at most "+l+" ticks.":!0},this.validSnapStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Snap step",minTicks:5,maxTicks:60}),this.validGridStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Grid step",minTicks:3,maxTicks:60}),this.validStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Step",minTicks:3,maxTicks:20}),this.validBackgroundImageSize=e=>e.url?e.width<=450&&e.height<=450?!0:"Image must be smaller than 450px x 450px.":!0,this.validateGraphSettings=(e,t,s,i,u)=>{const l=this;let r;if(!o.every(e,function(m){return r=l.validRange(m),r===!0})||!o.every(t,function(m,g){return r=l.validStep(m,e[g]),r===!0})||!o.every(s,function(m,g){return r=l.validGridStep(m,e[g]),r===!0})||!o.every(i,function(m,g){return r=l.validSnapStep(m,e[g]),r===!0}))return r;const R=this.validBackgroundImageSize(u);return R!==!0?(r=R,r):!0},this.changeLabel=(e,t)=>{const s=t.target.value,i=this.state.labelsTextbox.slice();i[e]=s,this.setState({labelsTextbox:i},this.changeGraph)},this.changeRange=(e,t)=>{const s=this.state.rangeTextbox.slice();s[e]=t;const i=this.state.stepTextbox.slice(),u=this.state.gridStepTextbox.slice(),l=this.state.snapStepTextbox.slice(),r=x.scaleFromExtent(s[e],this.props.box[e]);if(this.validRange(s[e])===!0){i[e]=x.tickStepFromExtent(s[e],this.props.box[e]);const p=x.gridStepFromTickStep(i[e],r);p&&(u[e]=p),l[e]=u[e]/2}this.setState({stepTextbox:i,gridStepTextbox:u,snapStepTextbox:l,rangeTextbox:s},this.changeGraph)},this.changeStep=e=>{this.setState({stepTextbox:e},this.changeGraph)},this.changeSnapStep=e=>{this.setState({snapStepTextbox:e},this.changeGraph)},this.changeGridStep=e=>{this.setState({gridStepTextbox:e,snapStepTextbox:o.map(e,function(t){return t/2})},this.changeGraph)},this.changeGraph=()=>{const e=this.state.labelsTextbox,t=o.map(this.state.rangeTextbox,function(p){return o.map(p,Number)}),s=o.map(this.state.stepTextbox,Number),i=this.state.gridStepTextbox,u=this.state.snapStepTextbox,l=this.state.backgroundImage,r=this.validateGraphSettings(t,s,i,u,l);r===!0?this.change({valid:!0,labels:e,range:t,step:s,gridStep:i,snapStep:u,backgroundImage:l}):this.change({valid:r})},this.state={isExpanded:!0,...f.stateFromProps(n)}}static stateFromProps(n){return{labelsTextbox:n.labels,gridStepTextbox:n.gridStep,snapStepTextbox:n.snapStep,stepTextbox:n.step,rangeTextbox:n.range,backgroundImage:{...n.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=o.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(n){(!o.isEqual(this.props.labels,n.labels)||!o.isEqual(this.props.gridStep,n.gridStep)||!o.isEqual(this.props.snapStep,n.snapStep)||!o.isEqual(this.props.step,n.step)||!o.isEqual(this.props.range,n.range)||!o.isEqual(this.props.backgroundImage,n.backgroundImage))&&this.setState(f.stateFromProps(n))}componentWillUnmount(){this._isMounted=!1}render(){return a.jsxs(a.Fragment,{children:[a.jsx(G,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&a.jsxs(v,{children:[a.jsxs("div",{className:"graph-settings",children:[a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(h,{label:"x Label",children:a.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:n=>this.changeLabel(0,n),value:this.state.labelsTextbox[0]||""})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(h,{label:"y Label",children:a.jsx("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:n=>this.changeLabel(1,n),value:this.state.labelsTextbox[1]||""})})})]}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(h,{label:"x Range",children:a.jsx(c,{value:this.state.rangeTextbox[0],onChange:n=>this.changeRange(0,n)})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(h,{label:"y Range",children:a.jsx(c,{value:this.state.rangeTextbox[1],onChange:n=>this.changeRange(1,n)})})})]}),a.jsxs("div",{className:"perseus-widget-row",children:[a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(h,{label:"Tick Step",children:a.jsx(c,{value:this.state.stepTextbox,onChange:this.changeStep})})}),a.jsx("div",{className:"perseus-widget-right-col",children:a.jsx(h,{label:"Grid Step",children:a.jsx(c,{value:this.state.gridStepTextbox,onChange:this.changeGridStep})})})]}),a.jsx("div",{className:"perseus-widget-row",children:a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(h,{label:"Snap Step",children:a.jsx(c,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep})})})}),a.jsx("div",{className:"perseus-widget-row",children:a.jsx(h,{label:"Markings:",children:a.jsx(B,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),a.jsx("div",{className:"perseus-widget-left-col",children:a.jsx(N,{label:"Show tooltips",checked:this.props.showTooltips,onChange:n=>{this.change({showTooltips:n})}})})]}),a.jsxs(h,{label:"Background image URL:",style:b.resetSpaceTop,children:[a.jsx("input",{type:"text",className:T.css(b.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:n=>{const e={...this.props.backgroundImage};e.url=n.target.value,this.setState({backgroundImage:e})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),a.jsx(C,{children:a.jsx("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),a.jsxs(v,{style:b.protractorSection,children:[a.jsx(v,{style:b.checkboxRow,children:a.jsx(N,{label:"Show protractor",checked:this.props.showProtractor,onChange:n=>{this.change({showProtractor:n})},style:b.resetSpaceTop})}),this.props.showProtractor&&a.jsx(E,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"})]})]})]})}};f.defaultProps={box:[j.defaultBoxSizeSmall,j.defaultBoxSizeSmall],labels:["$x$","$y$"],range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:z,markings:"graph",showProtractor:!1,showTooltips:!1};let S=f;const b=T.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${q.offBlack32}`,borderRadius:d.xxxSmall_4,padding:d.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:d.xSmall_8},protractorSection:{marginTop:d.xSmall_8,borderTop:`1px solid ${q.offBlack16}`,paddingTop:d.xSmall_8,paddingBottom:d.xSmall_8,borderBottom:`1px solid ${q.offBlack16}`}}),he=S;S.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
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
    valid: boolean | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;

    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
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
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
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
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]},alias:"Props"}}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphSettings",props:{box:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph area in pixels.",defaultValue:{value:`[
    interactiveSizes.defaultBoxSizeSmall,
    interactiveSizes.defaultBoxSizeSmall,
]`,computed:!1}},labels:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes.",defaultValue:{value:'["$x$", "$y$"]',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph.",defaultValue:{value:`[
    [-10, 10],
    [-10, 10],
]`,computed:!1}},step:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`,defaultValue:{value:"[1, 1]",computed:!1}},gridStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},snapStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},valid:{required:!1,tsType:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}]},description:`An error message to display in the graph area, or true if the
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
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
    url: null,
    width: 0,
    height: 0,
}`,computed:!1}},markings:{required:!1,tsType:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:`The type of markings to display on the graph.
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
    valid: boolean | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;

    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
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
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
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
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};export{he as I,h as L};
