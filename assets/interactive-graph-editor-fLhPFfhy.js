import{j as e,a as o,F as C}from"./jsx-runtime-FVsy8kgq.js";import{U as de}from"./util-XcxTwqb0.js";import{l as Ae,s as Ge,e as Le}from"./svg-image-l4qRmTJ6.js";import{g as De,e as ze,b as Ne,f as Re,h as Be,i as Oe,k as Fe,j as $e,l as Ue,u as Me}from"./article-renderer-7EhxyBJV.js";import{_ as x}from"./jquery-yG1GhClm.js";import"./phet-simulation-2so4a5HI.js";import"./version-akiLXZts.js";import"./dependencies-8XILypbq.js";import"./perseus-api--FMzJRa0.js";import"./multi-renderer-W2l5Dnvu.js";import"./hints-renderer-FAwE727U.js";import{S as Ve}from"./renderer-d7-jtpvN.js";import"./base-radio-FvVcbquV.js";import{c as We}from"./components-ftqFC_iQ.js";import{i as Ee}from"./constants-I_nlPaPx.js";import"./index-k-0mNqHS.js";import"./i18n-context-W41LcU6B.js";import{V as l}from"./index-6h5t6F0w.js";import{S as v,O as d}from"./answer-choices-o07Zm5SO.js";import{T as He,C as he}from"./index-aLQwBKgs.js";import{s as n,c as m,a as V}from"./index-deFLJwr4.js";import{c as me,f as $,L as u,a as W,b as ce}from"./index-h_CiYGGb.js";import{l as f}from"./index-awljIyHI.js";import{r as G}from"./index-TT1qJ6UJ.js";import{L as k,I as je}from"./interactive-graph-settings-Bf2cQ2yf.js";import{L as Qe}from"./locked-figures-section-hu0xLpf_.js";import{H as E}from"./heading-8aCiuWUg.js";import{S as g}from"./index-qUyqkRvh.js";import"./button-group-nsoLlHtM.js";import"./graph-oe1kl-EU.js";import"./hud-FI3E3dT_.js";import"./icon-YuYiVxsK.js";import"./index-K9BSJPWl.js";import"./inline-icon-tKY1iMkH.js";import"./math-input-5c41KzAV.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-nAb-9rMQ.js";import"./range-input-_BNU8ZEa.js";import"./text-input-UKLpKhjh.js";import"./text-list-editor-pe7AGDAl.js";import{B as Xe}from"./choice-j6w4LtFN.js";import{C as y}from"./coordinate-pair-input-CKQnldBe.js";import{a as Ye,b as Ze,c as Je,e as Ke,s as er}from"./util-wcQyCG4h.js";import{S as rr}from"./scrollless-number-text-field-UfnpPNU_.js";import{P as tr}from"./locked-figure-settings-actions-EL2EBJSk.js";const M="unlimited",ye=s=>{const r=parseInt(s,10);return isNaN(r)||r===0?M:r},fe=({numPoints:s=1,onChange:r})=>e(v,{selectedValue:`${s}`,onChange:t=>{r(ye(t))},placeholder:"",style:nr.singleSelectShort,children:[...[...Array(7).keys()].map(t=>e(d,{value:`${t}`,label:`${t} point${t>1?"s":""}`},t)),e(d,{value:M,label:"unlimited"},"unlimited")]}),nr=f.StyleSheet.create({singleSelectShort:{height:26}});fe.__docgenInfo={description:"",methods:[],displayName:"GraphPointsCountSelector",props:{numPoints:{required:!1,tsType:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(points: PointValue) => void",signature:{arguments:[{type:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},name:"points"}],return:{name:"void"}}},description:""}}};const be=s=>o(v,{selectedValue:s.graphType,onChange:s.onChange,placeholder:"Select a graph type",style:ar.singleSelectShort,children:[e(d,{value:"linear",label:"Linear function"}),e(d,{value:"quadratic",label:"Quadratic function"}),e(d,{value:"sinusoid",label:"Sinusoid function"}),e(d,{value:"circle",label:"Circle"}),e(d,{value:"point",label:"Point(s)"}),e(d,{value:"linear-system",label:"Linear System"}),e(d,{value:"polygon",label:"Polygon"}),e(d,{value:"segment",label:"Line Segment(s)"}),e(d,{value:"ray",label:"Ray"}),e(d,{value:"angle",label:"Angle"})]}),ar=f.StyleSheet.create({singleSelectShort:{height:26}});be.__docgenInfo={description:"",methods:[],displayName:"GraphTypeSelector",props:{graphType:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newGraphType: string) => void",signature:{arguments:[{type:{name:"string"},name:"newGraphType"}],return:{name:"void"}}},description:""}}};function we(s){return o(C,{children:[e(E,{title:"Correct Answer",isOpen:!0,isCollapsible:!1}),o(l,{children:[o(l,{children:[e(me,{style:{paddingTop:n.xxSmall_6,paddingBottom:n.xxSmall_6,color:m.offBlack64},children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."}),e($,{style:{fontSize:12,backgroundColor:"#eee",paddingInline:n.xxSmall_6,borderColor:"#ccc",borderStyle:"solid",borderWidth:1},children:s.equationString})]}),s.children]})]})}we.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCorrectAnswer",props:{equationString:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function Ce(s){const{ariaLabelValue:r,ariaDescriptionValue:t,onChange:a}=s,[i,h]=G.useState(!0);return o(C,{children:[e(E,{title:"Description",isCollapsible:!0,isOpen:i,onToggle:h}),i&&o(l,{children:[e(me,{style:or.caption,children:"Use these fields to describe the graph as a whole. These are used by screen readers to describe content to users who are visually impaired."}),o(u,{tag:"label",children:["Title",e(He,{value:r,onChange:p=>a({fullGraphAriaLabel:p})})]}),e(g,{size:n.xSmall_8}),o(u,{tag:"label",style:{display:"flex",flexDirection:"column"},children:["Description",e("textarea",{rows:8,value:t,onChange:p=>a({fullGraphAriaDescription:p.target.value})})]})]})]})}const or=f.StyleSheet.create({caption:{color:m.offBlack64,paddingTop:n.xxSmall_6,paddingBottom:n.xxSmall_6}});Ce.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphDescription",props:{ariaLabelValue:{required:!0,tsType:{name:"string"},description:""},ariaDescriptionValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(graphProps: Partial<EditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * The range of the graph in the x and y directions.
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
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: string | boolean;
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
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    correct: any; // TODO(jeremy)
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the \`aria-description\` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's \`aria-describedby\` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["graph"];
    onChange: (props: Partial<Props>) => void;
}`,signature:{properties:[{key:"apiOptions",value:{name:"APIOptionsWithDefaults",required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"any",required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<EditorProps>"},name:"graphProps"}],return:{name:"void"}}},description:""}}};const Se=({numSegments:s=1,onChange:r})=>e(v,{selectedValue:`${s}`,placeholder:"",onChange:t=>{const a=+t;r(a)},style:sr.singleSelectShort,children:x.range(1,7).map(t=>e(d,{value:`${t}`,label:`${t} segment${t>1?"s":""}`},t))},"segment-select"),sr=f.StyleSheet.create({singleSelectShort:{height:26}});Se.__docgenInfo={description:"",methods:[],displayName:"SegmentCountSelector",props:{numSegments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(numSegments: number) => void",signature:{arguments:[{type:{name:"number"},name:"numSegments"}],return:{name:"void"}}},description:""}}};const ir=""+new URL("arrow-counter-clockwise-bold-Zg1fUITb.svg",import.meta.url).href,ke=s=>{const{startCoords:r,onChange:t}=s;return o(C,{children:[o(l,{style:q.equationSection,children:[e(W,{children:"Starting equation:"}),e($,{style:q.equationBody,children:Ye(r)})]}),o(l,{style:q.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:n.small_12}),e(y,{coord:r[0],labels:["x","y"],onChange:a=>t([a,r[1],r[2]])})]}),o(l,{style:q.tile,children:[e(u,{children:"Vertex:"}),e(g,{size:n.small_12}),e(y,{coord:r[1],labels:["x","y"],onChange:a=>t([r[0],a,r[2]])})]}),o(l,{style:q.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:n.small_12}),e(y,{coord:r[2],labels:["x","y"],onChange:a=>t([r[0],r[1],a])})]})]})},q=f.StyleSheet.create({tile:{backgroundColor:m.fadedBlue8,marginTop:n.xSmall_8,padding:n.small_12,borderRadius:n.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:n.small_12},equationBody:{backgroundColor:m.fadedOffBlack8,border:`1px solid ${m.fadedOffBlack32}`,marginTop:n.xSmall_8,paddingLeft:n.xSmall_8,paddingRight:n.xSmall_8,fontSize:V.size.xSmall}});ke.__docgenInfo={description:"",methods:[],displayName:"StartCoordsAngle",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const xe=s=>{const{startCoords:r,onChange:t}=s,[a,i]=G.useState(r.radius.toString());G.useEffect(()=>{i(r.radius.toString())},[r.radius]);function h(p){i(p),!(isNaN(+p)||p===""||+p==0)&&t({center:r.center,radius:parseFloat(p)})}return o(l,{style:R.tile,children:[o(l,{style:R.row,children:[e(u,{children:"Center:"}),e(g,{size:n.small_12}),e(y,{coord:r.center,labels:["x","y"],onChange:p=>t({center:p,radius:r.radius})})]}),e(g,{size:n.small_12}),o(u,{tag:"label",style:R.row,children:["Radius:",e(g,{size:n.small_12}),e(rr,{value:a,onChange:h,style:R.textField})]})]})},R=f.StyleSheet.create({tile:{backgroundColor:m.fadedBlue8,marginTop:n.xSmall_8,padding:n.small_12,borderRadius:n.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:n.xxxLarge_64}});xe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsCircle",props:{startCoords:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"Coord",required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const ve=s=>{const{startCoords:r,onChange:t}=s;return o(C,{children:[o(l,{style:ue.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:n.small_12}),e(y,{coord:r[0],labels:["x","y"],onChange:a=>t([a,r[1]])})]}),o(l,{style:ue.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:n.small_12}),e(y,{coord:r[1],labels:["x","y"],onChange:a=>t([r[0],a])})]})]})},ue=f.StyleSheet.create({tile:{backgroundColor:m.fadedBlue8,marginTop:n.xSmall_8,padding:n.small_12,borderRadius:n.xSmall_8,flexDirection:"row",alignItems:"center"}});ve.__docgenInfo={description:"",methods:[],displayName:"StartCoordsLine",props:{startCoords:{required:!0,tsType:{name:"CollinearTuple"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Te=s=>{const{startCoords:r,type:t,onChange:a}=s,i=t==="segment"?"Segment":"Line";return e(C,{children:r.map((h,p)=>o(tr,{header:e(u,{children:`${i} ${p+1}`}),expanded:!0,children:[o(l,{style:ge.nestedTile,children:[e(u,{children:"Point 1:"}),e(g,{size:n.small_12}),e(y,{coord:h[0],labels:["x","y"],onChange:b=>{const w=[...r];w[p]=[b,h[1]],a(w)}})]}),o(l,{style:ge.nestedTile,children:[e(u,{children:"Point 2:"}),e(g,{size:n.small_12}),e(y,{coord:h[1],labels:["x","y"],onChange:b=>{const w=[...r];w[p]=[h[0],b],a(w)}})]})]},`segment-${p}-start-coords`))})},ge=f.StyleSheet.create({nestedTile:{paddingBottom:n.small_12,flexDirection:"row",alignItems:"center"}});Te.__docgenInfo={description:"",methods:[],displayName:"StartCoordsMultiline",props:{type:{required:!0,tsType:{name:"union",raw:'"linear-system" | "segment"',elements:[{name:"literal",value:'"linear-system"'},{name:"literal",value:'"segment"'}]},description:""},startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"CollinearTuple"}],raw:"CollinearTuple[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Pe=s=>{const{startCoords:r,onChange:t}=s;return e(C,{children:r.map((a,i)=>o(l,{style:lr.tile,children:[e(u,{children:`Point ${i+1}:`}),e(g,{size:n.small_12}),e(y,{coord:a,labels:["x","y"],onChange:h=>{const p=[...r];p[i]=h,t(p)}})]},i))})},lr=f.StyleSheet.create({tile:{backgroundColor:m.fadedBlue8,marginTop:n.xSmall_8,padding:n.small_12,borderRadius:n.xSmall_8,flexDirection:"row",alignItems:"center"}});Pe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsPoint",props:{startCoords:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"Coord"}],raw:"ReadonlyArray<Coord>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const qe=s=>{const{startCoords:r,onChange:t}=s;return o(C,{children:[o(l,{style:I.equationSection,children:[e(W,{children:"Starting equation:"}),e($,{style:I.equationBody,children:Ze(r)})]}),o(l,{style:I.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:n.small_12}),e(y,{coord:r[0],labels:["x","y"],onChange:a=>t([a,r[1],r[2]])})]}),o(l,{style:I.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:n.small_12}),e(y,{coord:r[1],labels:["x","y"],onChange:a=>t([r[0],a,r[2]])})]}),o(l,{style:I.tile,children:[e(u,{children:"Point 3:"}),e(g,{size:n.small_12}),e(y,{coord:r[2],labels:["x","y"],onChange:a=>t([r[0],r[1],a])})]})]})},I=f.StyleSheet.create({tile:{backgroundColor:m.fadedBlue8,marginTop:n.xSmall_8,padding:n.small_12,borderRadius:n.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:n.small_12},equationBody:{backgroundColor:m.fadedOffBlack8,border:`1px solid ${m.fadedOffBlack32}`,marginTop:n.xSmall_8,paddingLeft:n.xSmall_8,paddingRight:n.xSmall_8,fontSize:V.size.xSmall}});qe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsQuadratic",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Ie=s=>{const{startCoords:r,onChange:t}=s;return o(C,{children:[o(l,{style:B.equationSection,children:[e(W,{children:"Starting equation:"}),e($,{style:B.equationBody,children:Je(r)})]}),o(l,{style:B.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:n.small_12}),e(y,{coord:r[0],labels:["x","y"],onChange:a=>t([a,r[1]])})]}),o(l,{style:B.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:n.small_12}),e(y,{coord:r[1],labels:["x","y"],onChange:a=>t([r[0],a])})]})]})},B=f.StyleSheet.create({tile:{backgroundColor:m.fadedBlue8,marginTop:n.xSmall_8,padding:n.small_12,borderRadius:n.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:n.small_12},equationBody:{backgroundColor:m.fadedOffBlack8,border:`1px solid ${m.fadedOffBlack32}`,marginTop:n.xSmall_8,paddingLeft:n.xSmall_8,paddingRight:n.xSmall_8,fontSize:V.size.xSmall}});Ie.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSinusoid",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const pr=s=>{const{type:r,range:t,step:a,onChange:i}=s;switch(r){case"linear":case"ray":const h=Ue(s,t,a);return e(ve,{startCoords:h,onChange:i});case"linear-system":case"segment":const p=r==="segment"?Fe(s,t,a):$e(s,t,a);return e(Te,{type:r,startCoords:p,onChange:i});case"circle":const b=Oe(s),w=Ae(Ge(b.radiusPoint,b.center));return e(xe,{startCoords:{center:b.center,radius:w},onChange:i});case"sinusoid":const L=Be(s,t,a);return e(Ie,{startCoords:L,onChange:i});case"quadratic":const D=Re(s,t,a);return e(qe,{startCoords:D,onChange:i});case"point":case"polygon":const z=r==="point"?ze(s,t,a):Ne(s,t,a);return e(Pe,{startCoords:z,onChange:i});case"angle":const N=De({graph:s,range:t,step:a});return e(ke,{startCoords:N,onChange:i});default:return null}},_e=s=>{const{range:r,step:t,onChange:a}=s,[i,h]=G.useState(!0);return o(l,{children:[e(E,{isCollapsible:!0,title:"Start coordinates",isOpen:i,onToggle:()=>h(!i)}),i&&o(C,{children:[e(pr,{...s}),e(g,{size:n.small_12}),e(Xe,{startIcon:ir,kind:"tertiary",size:"small",onClick:()=>{a(Ke(s,r,t))},children:"Use default start coordinates"})]})]})};_e.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSettings",props:{range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const{InfoTip:_}=We,{containerSizeClass:dr,getInteractiveBoxFromSizeClass:hr}=Ve,A=Me.widget,cr={url:null},ur=x.map(x.range(3,13),function(s){return e(d,{value:`${s}`,label:`${s} sides`},`polygon-sides-${s}`)}),F=class F extends G.Component{constructor(){super(...arguments),this.displayName="InteractiveGraphEditor",this.className="perseus-widget-interactive-graph",this.changeMatchType=r=>{const t={...this.props.correct,match:r};this.props.onChange({correct:t})},this.changeStartCoords=r=>{var a;if(!((a=this.props.graph)!=null&&a.type))return;const t={...this.props.graph,startCoords:r};this.props.onChange({graph:t})},this.getSaveWarnings=()=>{const r=[];for(const t of this.props.lockedFigures??[])t.type==="line"&&Le(t.points[0].coord,t.points[1].coord)&&r.push("The line cannot have length 0.");return r}}serialize(){var a;const r=x.pick(this.props,"step","backgroundImage","markings","labels","showProtractor","showTooltips","range","gridStep","snapStep","lockedFigures","fullGraphAriaLabel","fullGraphAriaDescription"),t=this.refs.graph;if(t){const i=t&&t.getUserInput();x.extend(r,{graph:{type:i.type,startCoords:(a=this.props.graph)==null?void 0:a.startCoords},correct:i}),x.each(["allowReflexAngles","angleOffsetDeg","numPoints","numSides","numSegments","showAngles","showSides","snapTo","snapDegrees"],function(h){x.has(i,h)&&(r.graph[h]=i[h])})}return r}render(){var p,b,w,L,D,z,N,H,j,Q,X,Y,Z,J,K,ee,re,te,ne,ae,oe,se,ie,le,pe;let r,t;const a=this.props.gridStep||de.getGridStep(this.props.range,this.props.step,Ee.defaultBoxSize),i=this.props.snapStep||de.snapStepFromGridStep(a),h=dr.SMALL;if(this.props.valid===!0){const c=this.props.correct,S={ref:"graph",box:this.props.box,range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:a,snapStep:i,graph:c,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,lockedFigures:this.props.lockedFigures,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,trackInteraction:function(){},onChange:U=>{let P=this.props.correct;P.type===U.graph.type?P={...P,...U.graph}:P=U.graph,this.props.onChange({correct:P,graph:this.props.graph})}};r=e(A,{...S,containerSizeClass:h,apiOptions:{...this.props.apiOptions,isMobile:!1}}),t=A.getEquationString(S)}else r=e("div",{className:"perseus-error",children:this.props.valid});return o(l,{children:[e(k,{label:"Type of Graph:",children:e(be,{graphType:((p=this.props.graph)==null?void 0:p.type)??A.defaultProps.graph.type,onChange:c=>{this.props.onChange({graph:{type:c},correct:{type:c}})}})}),this.props.graph&&((L=(w=(b=this.props.apiOptions)==null?void 0:b.flags)==null?void 0:w.mafs)==null?void 0:L[this.props.graph.type])&&e(Ce,{ariaLabelValue:this.props.fullGraphAriaLabel??"",ariaDescriptionValue:this.props.fullGraphAriaDescription??"",onChange:this.props.onChange}),e(we,{equationString:t,children:r}),((D=this.props.correct)==null?void 0:D.type)==="point"&&e(k,{label:"Number of Points:",children:e(fe,{numPoints:(z=this.props.correct)==null?void 0:z.numPoints,onChange:c=>{this.props.onChange({correct:{type:"point",numPoints:c},graph:{type:"point",numPoints:c}})}})}),((N=this.props.correct)==null?void 0:N.type)==="polygon"&&o(C,{children:[e(k,{label:"Number of sides:",children:e(v,{selectedValue:(H=this.props.correct)!=null&&H.numSides?`${this.props.correct.numSides}`:"3",placeholder:"",onChange:c=>{const S={...this.props.correct,numSides:ye(c),coords:null,snapTo:"grid"};this.props.onChange({correct:S,graph:S})},style:T.singleSelectShort,children:[...ur,e(d,{value:"unlimited",label:"unlimited sides"},"unlimited")]},"polygon-select")}),o(k,{label:"Snap to:",children:[o(v,{selectedValue:((j=this.props.correct)==null?void 0:j.snapTo)||"grid",placeholder:"",onChange:c=>{const S={...this.props.correct,snapTo:c,coords:null};this.props.onChange({correct:S,graph:S})},style:T.singleSelectShort,children:[e(d,{value:"grid",label:"grid"}),((Q=this.props.correct)==null?void 0:Q.numSides)!=="unlimited"&&e(d,{value:"angles",label:"interior angles"}),((X=this.props.correct)==null?void 0:X.numSides)!=="unlimited"&&e(d,{value:"sides",label:"side measures"})]}),o(_,{children:[e("p",{children:"These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."}),e("p",{children:"The interior angle and side measure options guide the points to the nearest whole angle or side measure respectively."})]})]}),o(l,{style:T.row,children:[e(he,{label:e(ce,{children:"Show angle measures"}),checked:!!((Y=this.props.correct)!=null&&Y.showAngles),onChange:()=>{var c;((c=this.props.graph)==null?void 0:c.type)==="polygon"&&this.props.onChange({correct:{...this.props.correct,showAngles:!this.props.correct.showAngles},graph:{...this.props.graph,showAngles:!this.props.graph.showAngles}})}}),e(_,{children:e("p",{children:"Displays the interior angle measures."})})]}),o(l,{style:T.row,children:[e(he,{label:e(ce,{children:"Show side measures"}),checked:!!((Z=this.props.correct)!=null&&Z.showSides),onChange:()=>{var c;((c=this.props.graph)==null?void 0:c.type)==="polygon"&&this.props.onChange({correct:{...this.props.correct,showSides:!this.props.correct.showSides},graph:{...this.props.graph,showSides:!this.props.graph.showSides}})}}),e(_,{children:e("p",{children:"Displays the side lengths."})})]})]}),((J=this.props.correct)==null?void 0:J.type)==="segment"&&e(k,{label:"Number of segments:",children:e(Se,{numSegments:(K=this.props.correct)==null?void 0:K.numSegments,onChange:c=>{this.props.onChange({correct:{type:"segment",numSegments:c,coords:null},graph:{type:"segment",numSegments:c}})}})}),((ee=this.props.graph)==null?void 0:ee.type)&&er(this.props.apiOptions.flags,this.props.graph)&&e(_e,{...this.props.graph,range:this.props.range,step:this.props.step,onChange:this.changeStartCoords}),e(je,{box:hr(h),range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:a,snapStep:i,valid:this.props.valid,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,onChange:this.props.onChange}),this.props.correct.type==="polygon"&&o(k,{label:"Student answer must",children:[o(v,{selectedValue:this.props.correct.match||"exact",onChange:this.changeMatchType,placeholder:"",style:T.singleSelectShort,children:[e(d,{value:"exact",label:"match exactly"}),e(d,{value:"congruent",label:"be congruent"}),e(d,{value:"approx",label:"be approximately congruent"}),e(d,{value:"similar",label:"be similar"})]}),e(_,{children:o("ul",{children:[e("li",{children:o("p",{children:[e("b",{children:"Match Exactly:"})," Match exactly in size, orientation, and location on the grid even if it is not shown in the background."]})}),e("li",{children:o("p",{children:[e("b",{children:"Be Congruent:"})," Be congruent in size and shape, but can be located anywhere on the grid."]})}),e("li",{children:o("p",{children:[e("b",{children:"Be Approximately Congruent:"})," Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid."," ",e("em",{children:"Use this with snapping to angle measure."})]})}),e("li",{children:o("p",{children:[e("b",{children:"Be Similar:"})," Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."]})})]})})]}),this.props.correct.type==="angle"&&o(k,{label:"Student answer must",children:[o(v,{selectedValue:this.props.correct.match||"exact",onChange:this.changeMatchType,placeholder:"",style:T.singleSelectShort,children:[e(d,{value:"exact",label:"match exactly"}),e(d,{value:"congruent",label:"be congruent"})]}),e(_,{children:e("p",{children:"Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."})})]}),this.props.graph&&((ne=(te=(re=this.props.apiOptions)==null?void 0:re.flags)==null?void 0:te.mafs)==null?void 0:ne[this.props.graph.type])&&e(Qe,{showM2bFeatures:(se=(oe=(ae=this.props.apiOptions)==null?void 0:ae.flags)==null?void 0:oe.mafs)==null?void 0:se["interactive-graph-locked-features-m2b"],showLabelsFlag:(pe=(le=(ie=this.props.apiOptions)==null?void 0:ie.flags)==null?void 0:le.mafs)==null?void 0:pe["interactive-graph-locked-features-labels"],figures:this.props.lockedFigures,onChange:this.props.onChange})]})}};F.widgetName="interactive-graph",F.defaultProps={...A.defaultProps,valid:!0,backgroundImage:cr,showTooltips:!1,correct:{type:A.defaultProps.graph.type,coords:null}};let O=F;const T=f.StyleSheet.create({singleSelectShort:{height:26},row:{flexDirection:"row",marginTop:n.xSmall_8,alignItems:"center"}}),ot=O;O.__docgenInfo={description:`An editor for the InteractiveGraph widget, which allows the user to
specify the graph's properties and the correct answer.

Used in the exercise editor.`,methods:[{name:"changeMatchType",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"changeStartCoords",docblock:null,modifiers:[],params:[{name:"coords",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"PerseusInteractiveGraphWidgetOptions"}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphEditor",props:{apiOptions:{required:!0,tsType:{name:"APIOptionsWithDefaults"},description:""},labels:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes."},range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph in the x and y directions."},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`},gridStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions."},snapStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions."},box:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph in pixels."},valid:{required:!1,tsType:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"PerseusImageBackground"},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
    url: null,
}`,computed:!1}},markings:{required:!0,tsType:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},showProtractor:{required:!0,tsType:{name:"boolean"},description:"Whether to show the protractor on the graph."},showTooltips:{required:!1,tsType:{name:"boolean"},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`,defaultValue:{value:"false",computed:!1}},correct:{required:!1,tsType:{name:"any"},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`,defaultValue:{value:`{
    type: InteractiveGraph.defaultProps.graph.type,
    coords: null,
}`,computed:!1}},lockedFigures:{required:!1,tsType:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>"},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},fullGraphAriaLabel:{required:!1,tsType:{name:"string"},description:""},fullGraphAriaDescription:{required:!1,tsType:{name:"string"},description:""},graph:{required:!0,tsType:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]'},description:"The graph to display in the graph area."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * The range of the graph in the x and y directions.
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
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: string | boolean;
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
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    correct: any; // TODO(jeremy)
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the \`aria-description\` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's \`aria-describedby\` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["graph"];
    onChange: (props: Partial<Props>) => void;
}`,signature:{properties:[{key:"apiOptions",value:{name:"APIOptionsWithDefaults",required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"any",required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}}},description:""}}};export{ot as I};
