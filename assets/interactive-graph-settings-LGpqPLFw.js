import{j as a,a as p,F as L}from"./jsx-runtime-5BUNAZ9W.js";import{B as V}from"./article-renderer-67Fcbxs8.js";import{_ as o}from"./index-default-4_ZsnO94.js";import{U as S}from"./util-Kf-UsGkl.js";import{c as z}from"./unit-ti2HXQ4p.js";import"./version-akiLXZts.js";import"./dependencies-9B_Bv_mA.js";import"./perseus-api-cFDIds9P.js";import"./multi-renderer-YY9lJ2HB.js";import"./hints-renderer-5MYO6gBp.js";import"./renderer-jXtsf37s.js";import"./base-radio-y4Xo7lPV.js";import{c as E}from"./components-MWI_x7cO.js";import"./jquery-5v7aFUvu.js";import{i as C}from"./constants-I_nlPaPx.js";import"./i18n-context-3gTlIcWM.js";import{V as k}from"./index-e4P84RkC.js";import{S as N,O as m}from"./answer-choices-6QN12fjD.js";import{s as g,c as I}from"./index-lUErx3pE.js";import{l as q}from"./index-awljIyHI.js";import{r as v}from"./index-4g5l5LRQ.js";import{b as G}from"./index-QR_wlop5.js";import{H}from"./heading-m7-VnwH_.js";const h=w=>{const{children:n,label:e,labelSide:t="left",style:s}=w;return a("label",{className:q.css(T.label),children:p(k,{style:[T.row,s],children:[t==="start"||a(G,{style:T.spaceEnd,children:e}),n,t==="end"&&a(G,{style:T.spaceStart,children:e})]})})},T=q.StyleSheet.create({label:{width:"fit-content"},row:{flexDirection:"row",marginTop:g.xSmall_8,alignItems:"center",width:"fit-content"},spaceStart:{marginInlineStart:g.xSmall_8},spaceEnd:{marginInlineEnd:g.xSmall_8}});h.__docgenInfo={description:"",methods:[],displayName:"LabeledRow",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},labelSide:{required:!1,tsType:{name:"union",raw:'"start" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"end"'}]},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{ButtonGroup:W,InfoTip:_,PropCheckBox:P,RangeInput:y}=E,U={url:null,width:0,height:0};function A(w,n){return Math.floor((w[1]-w[0])/n)}const x=class x extends v.Component{constructor(n){super(n),this._isMounted=!1,this.bgUrlRef=v.createRef(),this.labelXRef=v.createRef(),this.labelYRef=v.createRef(),this.change=(...e)=>z.apply(this,e),this.changeRulerLabel=e=>{this.change({rulerLabel:e.target.value})},this.changeRulerTicks=e=>{this.change({rulerTicks:+e.target.value})},this.changeBackgroundUrl=e=>{var l;if(e.type==="keypress"&&e.key!=="Enter")return;const t=(u,i,r)=>{const d={...this.props.backgroundImage};d.url=u,d.width=i,d.height=r,this.setState({backgroundImage:d},this.changeGraph)},s=(l=this.bgUrlRef.current)==null?void 0:l.value;s?S.getImageSize(s,(u,i)=>{this._isMounted&&t(s,u,i)}):t(null,0,0)},this.renderLabelChoices=e=>e.map(t=>a("option",{value:t[1],children:t[0]},t[1])),this.validRange=e=>o.every(e,function(s){return o.isFinite(s)})?e[0]>=e[1]?"Range must have a higher number on the right":!0:"Range must be a valid number",this.validateStepValue=e=>{const{step:t,range:s,name:l,minTicks:u,maxTicks:i}=e,r=A(s,t);return r<u?l+" is too large, there must be at least "+u+" ticks.":r>i?l+" is too small, there can be at most "+i+" ticks.":!0},this.validSnapStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Snap step",minTicks:5,maxTicks:60}),this.validGridStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Grid step",minTicks:3,maxTicks:60}),this.validStep=(e,t)=>this.validateStepValue({step:e,range:t,name:"Step",minTicks:3,maxTicks:20}),this.validBackgroundImageSize=e=>e.url?e.width<=450&&e.height<=450?!0:"Image must be smaller than 450px x 450px.":!0,this.validateGraphSettings=(e,t,s,l,u)=>{const i=this;let r;if(!o.every(e,function(b){return r=i.validRange(b),r===!0})||!o.every(t,function(b,f){return r=i.validStep(b,e[f]),r===!0})||!o.every(s,function(b,f){return r=i.validGridStep(b,e[f]),r===!0})||!o.every(l,function(b,f){return r=i.validSnapStep(b,e[f]),r===!0}))return r;const B=this.validBackgroundImageSize(u);return B!==!0?(r=B,r):!0},this.changeLabel=(e,t)=>{const s=t.target.value,l=this.state.labelsTextbox.slice();l[e]=s,this.setState({labelsTextbox:l},this.changeGraph)},this.changeRange=(e,t)=>{const s=this.state.rangeTextbox.slice();s[e]=t;const l=this.state.stepTextbox.slice(),u=this.state.gridStepTextbox.slice(),i=this.state.snapStepTextbox.slice(),r=S.scaleFromExtent(s[e],this.props.box[e]);if(this.validRange(s[e])===!0){l[e]=S.tickStepFromExtent(s[e],this.props.box[e]);const d=S.gridStepFromTickStep(l[e],r);d&&(u[e]=d),i[e]=u[e]/2}this.setState({stepTextbox:l,gridStepTextbox:u,snapStepTextbox:i,rangeTextbox:s},this.changeGraph)},this.changeStep=e=>{this.setState({stepTextbox:e},this.changeGraph)},this.changeSnapStep=e=>{this.setState({snapStepTextbox:e},this.changeGraph)},this.changeGridStep=e=>{this.setState({gridStepTextbox:e,snapStepTextbox:o.map(e,function(t){return t/2})},this.changeGraph)},this.changeGraph=()=>{const e=this.state.labelsTextbox,t=o.map(this.state.rangeTextbox,function(d){return o.map(d,Number)}),s=o.map(this.state.stepTextbox,Number),l=this.state.gridStepTextbox,u=this.state.snapStepTextbox,i=this.state.backgroundImage,r=this.validateGraphSettings(t,s,l,u,i);r===!0?this.change({valid:!0,labels:e,range:t,step:s,gridStep:l,snapStep:u,backgroundImage:i}):this.change({valid:r})},this.state={isExpanded:!0,...x.stateFromProps(n)}}static stateFromProps(n){return{labelsTextbox:n.labels,gridStepTextbox:n.gridStep,snapStepTextbox:n.snapStep,stepTextbox:n.step,rangeTextbox:n.range,backgroundImage:{...n.backgroundImage}}}componentDidMount(){this._isMounted=!0,this.changeGraph=o.debounce(this.changeGraph,300)}UNSAFE_componentWillReceiveProps(n){(!o.isEqual(this.props.labels,n.labels)||!o.isEqual(this.props.gridStep,n.gridStep)||!o.isEqual(this.props.snapStep,n.snapStep)||!o.isEqual(this.props.step,n.step)||!o.isEqual(this.props.range,n.range)||!o.isEqual(this.props.backgroundImage,n.backgroundImage))&&this.setState(x.stateFromProps(n))}componentWillUnmount(){this._isMounted=!1}render(){return p(L,{children:[a(H,{title:"Common Graph Settings",isOpen:this.state.isExpanded,isCollapsible:!0,onToggle:()=>this.setState({isExpanded:!this.state.isExpanded})}),this.state.isExpanded&&p(k,{children:[p("div",{className:"graph-settings",children:[p("div",{className:"perseus-widget-row",children:[a("div",{className:"perseus-widget-left-col",children:a(h,{label:"x Label",children:a("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelXRef,onChange:n=>this.changeLabel(0,n),value:this.state.labelsTextbox[0]||""})})}),a("div",{className:"perseus-widget-right-col",children:a(h,{label:"y Label",children:a("input",{type:"text",className:"graph-settings-axis-label",ref:this.labelYRef,onChange:n=>this.changeLabel(1,n),value:this.state.labelsTextbox[1]||""})})})]}),p("div",{className:"perseus-widget-row",children:[a("div",{className:"perseus-widget-left-col",children:a(h,{label:"x Range",children:a(y,{value:this.state.rangeTextbox[0],onChange:n=>this.changeRange(0,n)})})}),a("div",{className:"perseus-widget-right-col",children:a(h,{label:"y Range",children:a(y,{value:this.state.rangeTextbox[1],onChange:n=>this.changeRange(1,n)})})})]}),p("div",{className:"perseus-widget-row",children:[a("div",{className:"perseus-widget-left-col",children:a(h,{label:"Tick Step",children:a(y,{value:this.state.stepTextbox,onChange:this.changeStep})})}),a("div",{className:"perseus-widget-right-col",children:a(h,{label:"Grid Step",children:a(y,{value:this.state.gridStepTextbox,onChange:this.changeGridStep})})})]}),a("div",{className:"perseus-widget-row",children:a("div",{className:"perseus-widget-left-col",children:a(h,{label:"Snap Step",children:a(y,{value:this.state.snapStepTextbox,onChange:this.changeSnapStep})})})}),a("div",{className:"perseus-widget-row",children:a(h,{label:"Markings:",children:a(W,{value:this.props.markings,allowEmpty:!1,buttons:[{value:"graph",content:"Graph"},{value:"grid",content:"Grid"},{value:"none",content:"None"}],onChange:this.change("markings")})})}),a("div",{className:"perseus-widget-left-col",children:a(P,{label:"Show tooltips",showTooltips:this.props.showTooltips,onChange:this.change})})]}),p(h,{label:"Background image URL:",style:c.resetSpaceTop,children:[a("input",{type:"text",className:q.css(c.backgroundUrlInput),ref:this.bgUrlRef,value:this.state.backgroundImage.url||"",onChange:n=>{const e={...this.props.backgroundImage};e.url=n.target.value,this.setState({backgroundImage:e})},onKeyPress:this.changeBackgroundUrl,onBlur:this.changeBackgroundUrl}),a(_,{children:a("p",{children:'Create an image in graphie, or use the "Add image" function to create a background.'})})]}),p(k,{style:c.rulerSection,children:[p(k,{style:c.checkboxRow,children:[a(P,{label:"Show ruler",showRuler:this.props.showRuler,onChange:this.change,style:c.resetSpaceTop}),a(P,{label:"Show protractor",showProtractor:this.props.showProtractor,onChange:this.change,style:c.resetSpaceTop})]}),(this.props.showRuler||this.props.showProtractor)&&a(V,{layout:"floating",text:"The ruler and protractor are not accessible. Please consider an alternate approach.",kind:"warning"}),this.props.showRuler&&p(k,{style:c.spaceTop,children:[a(h,{label:"Ruler label:",style:c.resetSpaceTop,children:p(N,{id:"ruler-label-select",selectedValue:this.props.rulerLabel,onChange:n=>{this.change({rulerLabel:n})},placeholder:"None",style:c.singleSelectShort,children:[a(m,{value:"",label:"None",horizontalRule:"full-width"}),a(m,{value:"mm",label:"Milimeters"}),a(m,{value:"cm",label:"Centimeters"}),a(m,{value:"m",label:"Meters"}),a(m,{value:"km",label:"Kilometers",horizontalRule:"full-width"}),a(m,{value:"in",label:"Inches"}),a(m,{value:"ft",label:"Feet"}),a(m,{value:"yd",label:"Yards"}),a(m,{value:"mi",label:"Miles"})]})}),a(h,{label:"Ruler ticks:",children:a(N,{id:"ruler-ticks-select",selectedValue:`${this.props.rulerTicks}`,onChange:n=>{this.change({rulerTicks:n})},placeholder:"10",style:c.singleSelectShort,children:[1,2,4,8,10,16].map(n=>a(m,{value:`${n}`,label:`${n}`},n))})})]})]})]})]})}};x.defaultProps={box:[C.defaultBoxSizeSmall,C.defaultBoxSizeSmall],labels:["x","y"],range:[[-10,10],[-10,10]],step:[1,1],gridStep:[1,1],snapStep:[1,1],valid:!0,backgroundImage:U,markings:"graph",showProtractor:!1,showRuler:!1,showTooltips:!1,rulerLabel:"",rulerTicks:10};let R=x;const c=q.StyleSheet.create({resetSpaceTop:{marginTop:0},spaceTop:{marginTop:g.xSmall_8},singleSelectShort:{height:26},backgroundUrlInput:{border:`1px solid ${I.offBlack32}`,borderRadius:g.xxxSmall_4,padding:g.xxxSmall_4},checkboxRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:g.xSmall_8},rulerSection:{marginTop:g.xSmall_8,borderTop:`1px solid ${I.offBlack16}`,paddingTop:g.xSmall_8,paddingBottom:g.xSmall_8,borderBottom:`1px solid ${I.offBlack16}`}}),ce=R;R.__docgenInfo={description:"",methods:[{name:"stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
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
     * Whether to show the ruler on the graph.
     */
    showRuler: boolean;
    /**
     * Whether to show tooltips on the graph.
     */
    showTooltips: boolean;
    /**
     * The label to display on the ruler, if any.
     */
    rulerLabel: string;
    /**
     * The number of ticks to display on the ruler.
     */
    rulerTicks: number;

    onChange: (arg1: Partial<Props>) => void;
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showRuler",value:{name:"boolean",required:!0},description:"Whether to show the ruler on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"rulerLabel",value:{name:"string",required:!0},description:"The label to display on the ruler, if any."},{key:"rulerTicks",value:{name:"number",required:!0},description:"The number of ticks to display on the ruler."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]},alias:"Props"}}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"changeRulerLabel",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeRulerTicks",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeBackgroundUrl",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"renderLabelChoices",docblock:null,modifiers:[],params:[{name:"choices",optional:!1,type:null}],returns:null},{name:"validRange",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null}],returns:null},{name:"validateStepValue",docblock:null,modifiers:[],params:[{name:"settings",optional:!1,type:null}],returns:null},{name:"validSnapStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validGridStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null},{name:"range",optional:!1,type:null}],returns:null},{name:"validBackgroundImageSize",docblock:null,modifiers:[],params:[{name:"image",optional:!1,type:null}],returns:null},{name:"validateGraphSettings",docblock:null,modifiers:[],params:[{name:"range",optional:!1,type:null},{name:"step",optional:!1,type:null},{name:"gridStep",optional:!1,type:null},{name:"snapStep",optional:!1,type:null},{name:"image",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changeRange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"values",optional:!1,type:null}],returns:null},{name:"changeStep",docblock:null,modifiers:[],params:[{name:"step",optional:!1,type:null}],returns:null},{name:"changeSnapStep",docblock:null,modifiers:[],params:[{name:"snapStep",optional:!1,type:null}],returns:null},{name:"changeGridStep",docblock:null,modifiers:[],params:[{name:"gridStep",optional:!1,type:null}],returns:null},{name:"changeGraph",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphSettings",props:{box:{required:!1,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph area in pixels.",defaultValue:{value:`[
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
- none: shows no markings`,defaultValue:{value:'"graph"',computed:!1}},showProtractor:{required:!1,tsType:{name:"boolean"},description:"Whether to show the protractor on the graph.",defaultValue:{value:"false",computed:!1}},showRuler:{required:!1,tsType:{name:"boolean"},description:"Whether to show the ruler on the graph.",defaultValue:{value:"false",computed:!1}},showTooltips:{required:!1,tsType:{name:"boolean"},description:"Whether to show tooltips on the graph.",defaultValue:{value:"false",computed:!1}},rulerLabel:{required:!1,tsType:{name:"string"},description:"The label to display on the ruler, if any.",defaultValue:{value:'""',computed:!1}},rulerTicks:{required:!1,tsType:{name:"number"},description:"The number of ticks to display on the ruler.",defaultValue:{value:"10",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
     * Whether to show the ruler on the graph.
     */
    showRuler: boolean;
    /**
     * Whether to show tooltips on the graph.
     */
    showTooltips: boolean;
    /**
     * The label to display on the ruler, if any.
     */
    rulerLabel: string;
    /**
     * The number of ticks to display on the ruler.
     */
    rulerTicks: number;

    onChange: (arg1: Partial<Props>) => void;
}`,signature:{properties:[{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph area in pixels."},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"valid",value:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showRuler",value:{name:"boolean",required:!0},description:"Whether to show the ruler on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:"Whether to show tooltips on the graph."},{key:"rulerLabel",value:{name:"string",required:!0},description:"The label to display on the ruler, if any."},{key:"rulerTicks",value:{name:"number",required:!0},description:"The number of ticks to display on the ruler."},{key:"onChange",value:{name:"signature",type:"function",raw:"(arg1: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"arg1"}],return:{name:"void"}}},description:""}}};export{ce as I,h as L};
