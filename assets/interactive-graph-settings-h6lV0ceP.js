import{j as a,a as d,F as N}from"./jsx-runtime-FVsy8kgq.js";import{c as C}from"./article-renderer-BlosWTYk.js";import{_ as l}from"./jquery-yG1GhClm.js";import{U as k}from"./util-XR-uqOh-.js";import{B as E}from"./phet-simulation-a-CqgrmB.js";import"./version-akiLXZts.js";import"./dependencies-d8cZibFS.js";import"./perseus-api-Nq3s7IMx.js";import"./perseus-item-Mi1qnh4h.js";import"./hints-renderer-w8fwv-TJ.js";import"./renderer-shnhjTaa.js";import"./base-radio-Sv3eKype.js";import{c as z}from"./components-3azNG_ZX.js";import{i as P}from"./constants-iPV6vHZm.js";import"./index-k-0mNqHS.js";import"./i18n-context-H_mTdYuW.js";import"./svg-image-h96M64n1.js";import"./index-IIMKO4_x.js";import{V as v}from"./index-6h5t6F0w.js";import{C as B}from"./index-QCAhLhLD.js";import{s as m,c as q}from"./index-deFLJwr4.js";import{l as R}from"./index-awljIyHI.js";import{r as w}from"./index-TT1qJ6UJ.js";import{H}from"./heading-8aCiuWUg.js";import{b as G}from"./index-h_CiYGGb.js";const h=x=>{const{children:n,label:e,labelSide:t="left",style:s}=x;return a("label",{className:R.css(S.label),children:d(v,{style:[S.row,s],children:[t==="start"||a(G,{style:S.spaceEnd,children:e}),n,t==="end"&&a(G,{style:S.spaceStart,children:e})]})})},S=R.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:m.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:m.xSmall_8},spaceEnd:{marginInlineEnd:m.xSmall_8}});h.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:V,InfoTip:_,RangeInput:b}=z,U={url:null,width:0,height:0};function A(x,n){return Math.floor((x[1]-x[0])/n)}const y=class y extends w.Component{constructor(n){super(n),this._isMounted=!1,this.bgUrlRef=w.createRef(),this.labelXRef=w.createRef(),this.labelYRef=w.createRef(),this.change=(...e)=>C.apply(this,e),this.changeBackgroundUrl=e=>{var i;if(e.type==="keypress"&&e.key!=="Enter")return;const t=(p,o,r)=>{const u={...this.props.backgroundImage};u.url=p,u.width=o,u.height=r,this.setState({backgroundImage:u},this.changeGraph)},s=(i=this.bgUrlRef.current)==null?void 0:i.value;s?k.getImageSize(s,(p,o)=>{this._isMounted&&t(s,p,o)}):t(null,0,0)},this.renderLabelChoices=e=>e.map(t=>a("option",{value:t[1],children:t[0]},t[1])),this.validRange=e=>l.every(e,function(s){return l.isFinite(s)})?e[0]>=e[1]?"Range must have a higher number on the right":!0:"Range must be a valid number",this.validateStepValue=e=>{const{step:t,range:s,name:i,minTicks:p,maxTicks:o}=e,r=A(s,t);return r<p?i+" is too large, there must be at least "+p+" ticks.":r>o?i+" is too small, there can be at most "+o+" ticks.":!0},this.validSnapStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Snap step",minTicks:5,maxTicks:60}),this.validGridStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Grid step",minTicks:3,maxTicks:60}),this.validStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Step",minTicks:3,maxTicks:20}),this.validBackgroundImageSize=e=>e.url?e.width<=450&&e.height<=450?!0:"Image must be smaller than 450px x 450px.":!0,this.validateGraphSettings=(e,t,s,i,p)=>{const o=this;let r;if(!l.every(e,function(g){return r=o.validRange(g),r===!0})||!l.every(t,function(g,c){return r=o.validStep(g,e[c]),r===!0})||!l.every(s,function(g,c){return r=o.validGridStep(g,e[c]),r===!0})||!l.every(i,function(g,c){return r=o.validSnapStep(g,e[c]),r===!0}))return r;const I=this.validBackgroundImageSize(p);return I!==!0?(r=I,r):!0},this.changeLabel=(e,t)=>{const s=t.target.value,i=this.state.labelsTextbox.slice();i[e]=s,this.setState({labelsTextbox:i},this.changeGraph)},this.changeRange=(e,t)=>{const s=this.state.rangeTextbox.slice();s[e]=t;const i=this.state.stepTextbox.slice(),p=this.state.gridStepTextbox.slice(),o=this.state.snapStepTextbox.slice(),r=k.scaleFromExtent(s[e],this.props.box[e]);if(this.validRange(s[e])===!0){i[e]=k.tickStepFromExtent(s[e],this.props.box[e]);const u=k.gridStepFromTickStep(i[e],r);u&&(p[e]=u),o[e]=p[e]/2}this.setState({stepTextbox:i,gridStepTextbox:p,snapStepTextbox:o,rangeTextbox:s},this.changeGraph)},this.changeStep=e=>{this.setState({stepTextbox:e},this.changeGraph)},this.changeSnapStep=e=>{this.setState({snapStepTextbox:e},this.changeGraph)},this.changeGridStep=e=>{this.setState({gridStepTextbox:e,snapStepTextbox:l.map(e,function(t){return t/2})},this.changeGraph)},this.changeGraph=()=>{const e=this.state.labelsTextbox,t=l.map(this.state.rangeTextbox,function(u){return l.map(u,Number)}),s=l.map(this.state.stepTextbox,Number),i=this.state.gridStepTextbox,p=this.state.snapStepTextbox,o=this.state.backgroundImage,r=this.validateGraphSettings(t,s,i,p,o);r===!0?this.change({valid:!0,labels:e,range:t,step:s,gridStep:i,snapStep:p,backgroundImage:o}):this.change({valid:r})},this.state={isExpanded:!0,...y.stateFromProps(n)}}static stateFromProps(n){return{labelsTextbox:n.labels,gridStepTextbox:n.gridStep,snapStepTextbox:n.snapStep,stepTextbox:n.step,rangeTextbox:n.range,backgroundImage:{...n.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=l.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(n){(!l.isEqual(this.props.labels,n.labels)||!l.isEqual(this.props.gridStep,n.gridStep)||!l.isEqual(this.props.snapStep,n.snapStep)||!l.isEqual(this.props.step,n.step)||!l.isEqual(this.props.range,n.range)||!l.isEqual(this.props.backgroundImage,n.backgroundImage))&&this.setState(y.stateFromProps(n))}componentWillUnmount(){this._isMounted=!1}render(){return d(N,{children:[a(H,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&d(v,{children:[d("div",{className:"graph-settings",children:[d("div",{className:"perseus-widget-row",children:[a("div",{className:"perseus-widget-left-col",children:a(h,{label:"x Label",children:a("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:n=>this.changeLabel(0,n),value:this.state.labelsTextbox[0]||""})})}),a("div",{className:"perseus-widget-right-col",children:a(h,{label:"y Label",children:a("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:n=>this.changeLabel(1,n),value:this.state.labelsTextbox[1]||""})})})]}),d("div",{className:"perseus-widget-row",children:[a("div",{className:"perseus-widget-left-col",children:a(h,{label:"x Range",children:a(b,{value:this.state.rangeTextbox[0],onChange:n=>this.changeRange(0,n)})})}),a("div",{className:"perseus-widget-right-col",children:a(h,{label:"y Range",children:a(b,{value:this.state.rangeTextbox[1],onChange:n=>this.changeRange(1,n)})})})]}),d("div",{className:"perseus-widget-row",children:[a("div",{className:"perseus-widget-left-col",children:a(h,{label:"Tick Step",children:a(b,{value:this.state.stepTextbox,onChange:this.changeStep})})}),a("div",{className:"perseus-widget-right-col",children:a(h,{label:"Grid Step",children:a(b,{value:this.state.gridStepTextbox,onChange:this.changeGridStep})})})]}),a("div",{className:"perseus-widget-row",children:a("div",{className:"perseus-widget-left-col",children:a(h,{label:"Snap Step",children:a(b,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep})})})}),a("div",{className:"perseus-widget-row",children:a(h,{label:"Markings:",children:a(V,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),a("div",{className:"perseus-widget-left-col",children:a(B,{label:"Show tooltips",checked:this.props.showTooltips,onChange:n=>{this.change({showTooltips:n})}})})]}),d(h,{label:"Background image URL:",style:f.resetSpaceTop,children:[a("input",{type:"text",className:R.css(f.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:n=>{const e={...this.props.backgroundImage};e.url=n.target.value,this.setState({backgroundImage:e})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),a(_,{children:a("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),d(v,{style:f.protractorSection,children:[a(v,{style:f.checkboxRow,children:a(B,{label:"Show protractor",checked:this.props.showProtractor,onChange:n=>{this.change({showProtractor:n})},style:f.resetSpaceTop})}),this.props.showProtractor&&a(E,{layout:"floating",text:"The protractor is not accessible. Please consider an alternate approach.",kind:"warning"})]})]})]})}};y.defaultProps={box:[P.defaultBoxSizeSmall,P.defaultBoxSizeSmall],labels:["x","y"],range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:U,markings:"graph",showProtractor:!1,showTooltips:!1};let T=y;const f=R.StyleSheet.create({resetSpaceTop:{marginTop:0},backgroundUrlInput:{border:`1px solid ${q.offBlack32}`,borderRadius:m.xxxSmall_4,padding:m.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:m.xSmall_8},protractorSection:{marginTop:m.xSmall_8,borderTop:`1px solid ${q.offBlack16}`,paddingTop:m.xSmall_8,paddingBottom:m.xSmall_8,borderBottom:`1px solid ${q.offBlack16}`}}),ge=T;T.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
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
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]},alias:"Props"}}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphSettings",props:{box:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph area in pixels.",defaultValue:{value:`[
    interactiveSizes.defaultBoxSizeSmall,
    interactiveSizes.defaultBoxSizeSmall,
]`,computed:!1}},labels:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes.",defaultValue:{value:'["x", "y"]',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph.",defaultValue:{value:`[
    [-10, 10],
    [-10, 10],
]`,computed:!1}},step:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`,defaultValue:{value:"[1, 1]",computed:!1}},gridStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},snapStep:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions.",defaultValue:{value:"[1, 1]",computed:!1}},valid:{required:!1,tsType:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"PerseusImageBackground"},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
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
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};export{ge as I,h as L};
