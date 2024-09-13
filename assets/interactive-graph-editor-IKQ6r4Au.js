import{j as e,a as s,F as x}from"./jsx-runtime-FVsy8kgq.js";import{U as pe}from"./util-XcxTwqb0.js";import{l as _e,s as Ae,e as Ge}from"./svg-image-Rjw-_QTV.js";import{g as Le,e as De,b as ze,f as Ne,h as Re,i as Be,k as Oe,j as $e,l as Fe,u as Ee}from"./article-renderer-nEscztTl.js";import{_ as P}from"./jquery-yG1GhClm.js";import"./phet-simulation-OmyjCAdl.js";import"./version-akiLXZts.js";import"./dependencies-8XILypbq.js";import"./perseus-api--FMzJRa0.js";import"./multi-renderer-uaDSvZ8W.js";import"./hints-renderer-phUSAwlE.js";import{S as We}from"./renderer-Bc3o6rku.js";import"./base-radio-uSTZJxUR.js";import{c as Ue}from"./components-QATbWbgm.js";import{i as Ve}from"./constants-I_nlPaPx.js";import"./index-0C4KXdeC.js";import"./i18n-context-W41LcU6B.js";import{w as He}from"./index-J2t_5nK1.js";import{V as l}from"./index-6h5t6F0w.js";import{S as q,O as h}from"./answer-choices--qKW-DVa.js";import{T as Me,a as je,C as de}from"./index-QCAhLhLD.js";import{s as a,c as y,a as H}from"./index-deFLJwr4.js";import{c as ge,f as W,L as u,a as M,b as he}from"./index-h_CiYGGb.js";import{l as b}from"./index-awljIyHI.js";import{r as D}from"./index-TT1qJ6UJ.js";import{i as m}from"./tiny-invariant-bHgPayXn.js";import{L as T,I as Qe}from"./interactive-graph-settings-sfzOL2Xf.js";import{L as Xe}from"./locked-figures-section-pBjkY4Is.js";import{H as j}from"./heading-8aCiuWUg.js";import{S as g}from"./index-qUyqkRvh.js";import"./button-group-nsoLlHtM.js";import"./graph-sgfCFYpv.js";import"./hud-FI3E3dT_.js";import"./icon-YuYiVxsK.js";import"./index-K9BSJPWl.js";import"./inline-icon-tKY1iMkH.js";import"./math-input-5c41KzAV.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-nAb-9rMQ.js";import"./range-input-_BNU8ZEa.js";import"./text-input-15gEhfDF.js";import"./text-list-editor-pe7AGDAl.js";import{B as Ye}from"./choice-j6w4LtFN.js";import{C as f}from"./coordinate-pair-input-23mAp7kL.js";import{a as Ze,b as Je,c as Ke,e as er,s as rr}from"./util-nXMDd9ju.js";import{S as tr}from"./scrollless-number-text-field-U5Bx_xXb.js";import{P as nr}from"./locked-figure-settings-actions-sNZbsX6s.js";const V="unlimited",me=t=>{const r=parseInt(t,10);return isNaN(r)||r===0?V:r},ye=({numPoints:t=1,onChange:r})=>e(q,{selectedValue:`${t}`,onChange:n=>{r(me(n))},placeholder:"",style:ar.singleSelectShort,children:[...[...Array(7).keys()].map(n=>e(h,{value:`${n}`,label:`${n} point${n>1?"s":""}`},n)),e(h,{value:V,label:"unlimited"},"unlimited")]}),ar=b.StyleSheet.create({singleSelectShort:{height:26}});ye.__docgenInfo={description:"",methods:[],displayName:"GraphPointsCountSelector",props:{numPoints:{required:!1,tsType:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(points: PointValue) => void",signature:{arguments:[{type:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},name:"points"}],return:{name:"void"}}},description:""}}};const fe=t=>s(q,{selectedValue:t.graphType,onChange:t.onChange,placeholder:"Select a graph type",style:or.singleSelectShort,children:[e(h,{value:"linear",label:"Linear function"}),e(h,{value:"quadratic",label:"Quadratic function"}),e(h,{value:"sinusoid",label:"Sinusoid function"}),e(h,{value:"circle",label:"Circle"}),e(h,{value:"point",label:"Point(s)"}),e(h,{value:"linear-system",label:"Linear System"}),e(h,{value:"polygon",label:"Polygon"}),e(h,{value:"segment",label:"Line Segment(s)"}),e(h,{value:"ray",label:"Ray"}),e(h,{value:"angle",label:"Angle"})]}),or=b.StyleSheet.create({singleSelectShort:{height:26}});fe.__docgenInfo={description:"",methods:[],displayName:"GraphTypeSelector",props:{graphType:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newGraphType: string) => void",signature:{arguments:[{type:{name:"string"},name:"newGraphType"}],return:{name:"void"}}},description:""}}};function be(t){return s(x,{children:[e(j,{title:"Correct Answer",isOpen:!0,isCollapsible:!1}),s(l,{children:[s(l,{children:[e(ge,{style:{paddingTop:a.xxSmall_6,paddingBottom:a.xxSmall_6,color:y.offBlack64},children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."}),e(W,{style:{fontSize:12,backgroundColor:"#eee",paddingInline:a.xxSmall_6,borderColor:"#ccc",borderStyle:"solid",borderWidth:1},children:t.equationString})]}),t.children]})]})}be.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCorrectAnswer",props:{equationString:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function we(t){const{ariaLabelValue:r,ariaDescriptionValue:n,onChange:o}=t,[i,c]=D.useState(!0);return s(x,{children:[e(j,{title:"Description",isCollapsible:!0,isOpen:i,onToggle:c}),i&&s(l,{children:[e(ge,{style:U.caption,children:"Use these fields to describe the graph as a whole. These are used by screen readers to describe content to users who are visually impaired."}),s(u,{tag:"label",children:["Title",e(Me,{value:r,onChange:p=>o({fullGraphAriaLabel:p}),style:U.spaceAbove})]}),e(g,{size:a.small_12}),s(u,{tag:"label",children:["Description",e(je,{rows:8,resizeType:"vertical",value:n,onChange:p=>o({fullGraphAriaDescription:p}),style:U.spaceAbove})]})]})]})}const U=b.StyleSheet.create({caption:{color:y.offBlack64,paddingTop:a.xxSmall_6,paddingBottom:a.xxSmall_6},spaceAbove:{marginTop:a.xxxSmall_4}});we.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphDescription",props:{ariaLabelValue:{required:!0,tsType:{name:"string"},description:""},ariaDescriptionValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(graphProps: Partial<EditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
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
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
}`,signature:{properties:[{key:"apiOptions",value:{name:"APIOptionsWithDefaults",required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"PerseusGraphType",required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<EditorProps>"},name:"graphProps"}],return:{name:"void"}}},description:""}}};const Ce=({numSegments:t=1,onChange:r})=>e(q,{selectedValue:`${t}`,placeholder:"",onChange:n=>{const o=+n;r(o)},style:sr.singleSelectShort,children:P.range(1,7).map(n=>e(h,{value:`${n}`,label:`${n} segment${n>1?"s":""}`},n))},"segment-select"),sr=b.StyleSheet.create({singleSelectShort:{height:26}});Ce.__docgenInfo={description:"",methods:[],displayName:"SegmentCountSelector",props:{numSegments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(numSegments: number) => void",signature:{arguments:[{type:{name:"number"},name:"numSegments"}],return:{name:"void"}}},description:""}}};const ir=""+new URL("arrow-counter-clockwise-bold-Zg1fUITb.svg",import.meta.url).href,Se=t=>{const{startCoords:r,onChange:n}=t;return s(x,{children:[s(l,{style:_.equationSection,children:[e(M,{children:"Starting equation:"}),e(W,{style:_.equationBody,children:Ze(r)})]}),s(l,{style:_.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:a.small_12}),e(f,{coord:r[0],labels:["x","y"],onChange:o=>n([o,r[1],r[2]])})]}),s(l,{style:_.tile,children:[e(u,{children:"Vertex:"}),e(g,{size:a.small_12}),e(f,{coord:r[1],labels:["x","y"],onChange:o=>n([r[0],o,r[2]])})]}),s(l,{style:_.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:a.small_12}),e(f,{coord:r[2],labels:["x","y"],onChange:o=>n([r[0],r[1],o])})]})]})},_=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:a.xSmall_8,padding:a.small_12,borderRadius:a.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:a.small_12},equationBody:{backgroundColor:y.fadedOffBlack8,border:`1px solid ${y.fadedOffBlack32}`,marginTop:a.xSmall_8,paddingLeft:a.xSmall_8,paddingRight:a.xSmall_8,fontSize:H.size.xSmall}});Se.__docgenInfo={description:"",methods:[],displayName:"StartCoordsAngle",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const ke=t=>{const{startCoords:r,onChange:n}=t,[o,i]=D.useState(r.radius.toString());D.useEffect(()=>{i(r.radius.toString())},[r.radius]);function c(p){i(p),!(isNaN(+p)||p===""||+p==0)&&n({center:r.center,radius:parseFloat(p)})}return s(l,{style:O.tile,children:[s(l,{style:O.row,children:[e(u,{children:"Center:"}),e(g,{size:a.small_12}),e(f,{coord:r.center,labels:["x","y"],onChange:p=>n({center:p,radius:r.radius})})]}),e(g,{size:a.small_12}),s(u,{tag:"label",style:O.row,children:["Radius:",e(g,{size:a.small_12}),e(tr,{value:o,onChange:c,style:O.textField})]})]})},O=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:a.xSmall_8,padding:a.small_12,borderRadius:a.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:a.xxxLarge_64}});ke.__docgenInfo={description:"",methods:[],displayName:"StartCoordsCircle",props:{startCoords:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"Coord",required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const xe=t=>{const{startCoords:r,onChange:n}=t;return s(x,{children:[s(l,{style:ce.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:a.small_12}),e(f,{coord:r[0],labels:["x","y"],onChange:o=>n([o,r[1]])})]}),s(l,{style:ce.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:a.small_12}),e(f,{coord:r[1],labels:["x","y"],onChange:o=>n([r[0],o])})]})]})},ce=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:a.xSmall_8,padding:a.small_12,borderRadius:a.xSmall_8,flexDirection:"row",alignItems:"center"}});xe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsLine",props:{startCoords:{required:!0,tsType:{name:"CollinearTuple"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const ve=t=>{const{startCoords:r,type:n,onChange:o}=t,i=n==="segment"?"Segment":"Line";return e(x,{children:r.map((c,p)=>s(nr,{header:e(u,{children:`${i} ${p+1}`}),expanded:!0,children:[s(l,{style:ue.nestedTile,children:[e(u,{children:"Point 1:"}),e(g,{size:a.small_12}),e(f,{coord:c[0],labels:["x","y"],onChange:w=>{const C=[...r];C[p]=[w,c[1]],o(C)}})]}),s(l,{style:ue.nestedTile,children:[e(u,{children:"Point 2:"}),e(g,{size:a.small_12}),e(f,{coord:c[1],labels:["x","y"],onChange:w=>{const C=[...r];C[p]=[c[0],w],o(C)}})]})]},`segment-${p}-start-coords`))})},ue=b.StyleSheet.create({nestedTile:{paddingBottom:a.small_12,flexDirection:"row",alignItems:"center"}});ve.__docgenInfo={description:"",methods:[],displayName:"StartCoordsMultiline",props:{type:{required:!0,tsType:{name:"union",raw:'"linear-system" | "segment"',elements:[{name:"literal",value:'"linear-system"'},{name:"literal",value:'"segment"'}]},description:""},startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"CollinearTuple"}],raw:"CollinearTuple[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Te=t=>{const{startCoords:r,onChange:n}=t;return e(x,{children:r.map((o,i)=>s(l,{style:lr.tile,children:[e(u,{children:`Point ${i+1}:`}),e(g,{size:a.small_12}),e(f,{coord:o,labels:["x","y"],onChange:c=>{const p=[...r];p[i]=c,n(p)}})]},i))})},lr=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:a.xSmall_8,padding:a.small_12,borderRadius:a.xSmall_8,flexDirection:"row",alignItems:"center"}});Te.__docgenInfo={description:"",methods:[],displayName:"StartCoordsPoint",props:{startCoords:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"Coord"}],raw:"ReadonlyArray<Coord>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Pe=t=>{const{startCoords:r,onChange:n}=t;return s(x,{children:[s(l,{style:A.equationSection,children:[e(M,{children:"Starting equation:"}),e(W,{style:A.equationBody,children:Je(r)})]}),s(l,{style:A.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:a.small_12}),e(f,{coord:r[0],labels:["x","y"],onChange:o=>n([o,r[1],r[2]])})]}),s(l,{style:A.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:a.small_12}),e(f,{coord:r[1],labels:["x","y"],onChange:o=>n([r[0],o,r[2]])})]}),s(l,{style:A.tile,children:[e(u,{children:"Point 3:"}),e(g,{size:a.small_12}),e(f,{coord:r[2],labels:["x","y"],onChange:o=>n([r[0],r[1],o])})]})]})},A=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:a.xSmall_8,padding:a.small_12,borderRadius:a.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:a.small_12},equationBody:{backgroundColor:y.fadedOffBlack8,border:`1px solid ${y.fadedOffBlack32}`,marginTop:a.xSmall_8,paddingLeft:a.xSmall_8,paddingRight:a.xSmall_8,fontSize:H.size.xSmall}});Pe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsQuadratic",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const qe=t=>{const{startCoords:r,onChange:n}=t;return s(x,{children:[s(l,{style:$.equationSection,children:[e(M,{children:"Starting equation:"}),e(W,{style:$.equationBody,children:Ke(r)})]}),s(l,{style:$.tile,children:[e(u,{children:"Point 1:"}),e(g,{size:a.small_12}),e(f,{coord:r[0],labels:["x","y"],onChange:o=>n([o,r[1]])})]}),s(l,{style:$.tile,children:[e(u,{children:"Point 2:"}),e(g,{size:a.small_12}),e(f,{coord:r[1],labels:["x","y"],onChange:o=>n([r[0],o])})]})]})},$=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:a.xSmall_8,padding:a.small_12,borderRadius:a.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:a.small_12},equationBody:{backgroundColor:y.fadedOffBlack8,border:`1px solid ${y.fadedOffBlack32}`,marginTop:a.xSmall_8,paddingLeft:a.xSmall_8,paddingRight:a.xSmall_8,fontSize:H.size.xSmall}});qe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSinusoid",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const pr=t=>{const{type:r,range:n,step:o,onChange:i}=t;switch(r){case"linear":case"ray":const c=Fe(t,n,o);return e(xe,{startCoords:c,onChange:i});case"linear-system":case"segment":const p=r==="segment"?Oe(t,n,o):$e(t,n,o);return e(ve,{type:r,startCoords:p,onChange:i});case"circle":const w=Be(t),C=_e(Ae(w.radiusPoint,w.center));return e(ke,{startCoords:{center:w.center,radius:C},onChange:i});case"sinusoid":const z=Re(t,n,o);return e(qe,{startCoords:z,onChange:i});case"quadratic":const N=Ne(t,n,o);return e(Pe,{startCoords:N,onChange:i});case"point":case"polygon":const R=r==="point"?De(t,n,o):ze(t,n,o);return e(Te,{startCoords:R,onChange:i});case"angle":const B=Le({graph:t,range:n,step:o});return e(Se,{startCoords:B,onChange:i});default:return null}},Ie=t=>{const{range:r,step:n,onChange:o}=t,[i,c]=D.useState(!0);return s(l,{children:[e(j,{isCollapsible:!0,title:"Start coordinates",isOpen:i,onToggle:()=>c(!i)}),i&&s(x,{children:[e(pr,{...t}),e(g,{size:a.small_12}),e(Ye,{startIcon:ir,kind:"tertiary",size:"small",onClick:()=>{o(er(t,r,n))},children:"Use default start coordinates"})]})]})};Ie.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSettings",props:{range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:'(startCoords: PerseusGraphType["startCoords"]) => void',signature:{arguments:[{type:{name:'PerseusGraphType["startCoords"]',raw:'PerseusGraphType["startCoords"]'},name:"startCoords"}],return:{name:"void"}}},description:""}}};const{InfoTip:G}=Ue,{containerSizeClass:dr,getInteractiveBoxFromSizeClass:hr}=We,L=Ee.widget,cr={url:null},ur=P.map(P.range(3,13),function(t){return e(h,{value:`${t}`,label:`${t} sides`},`polygon-sides-${t}`)}),E=class E extends D.Component{constructor(){super(...arguments),this.displayName="InteractiveGraphEditor",this.className="perseus-widget-interactive-graph",this.changeStartCoords=r=>{var o;if(!((o=this.props.graph)!=null&&o.type))return;const n={...this.props.graph,startCoords:r};this.props.onChange({graph:n})},this.getSaveWarnings=()=>{const r=[];for(const n of this.props.lockedFigures??[])n.type==="line"&&Ge(n.points[0].coord,n.points[1].coord)&&r.push("The line cannot have length 0.");return r}}serialize(){var o;const r=P.pick(this.props,"step","backgroundImage","markings","labels","showProtractor","showTooltips","range","gridStep","snapStep","lockedFigures","fullGraphAriaLabel","fullGraphAriaDescription"),n=this.refs.graph;if(n){const i=n&&n.getUserInput();P.extend(r,{graph:{type:i.type,startCoords:(o=this.props.graph)==null?void 0:o.startCoords},correct:i}),P.each(["allowReflexAngles","angleOffsetDeg","numPoints","numSides","numSegments","showAngles","showSides","snapTo","snapDegrees"],function(c){P.has(i,c)&&(r.graph[c]=i[c])})}return r}render(){var p,w,C,z,N,R,B,Q,X,Y,Z,J,K,ee,re,te,ne,ae,oe,se,ie,le;let r,n;const o=this.props.gridStep||pe.getGridStep(this.props.range,this.props.step,Ve.defaultBoxSize),i=this.props.snapStep||pe.snapStepFromGridStep(o),c=dr.SMALL;if(this.props.valid===!0){const d=this.props.correct,S={ref:"graph",box:this.props.box,range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:o,snapStep:i,graph:d,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,lockedFigures:this.props.lockedFigures,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,trackInteraction:function(){},onChange:({graph:k})=>{let v=this.props.correct;m(k!=null),v.type===k.type?v=gr(v,k):v=k,this.props.onChange({correct:v,graph:this.props.graph})}};r=e(L,{...S,containerSizeClass:c,apiOptions:{...this.props.apiOptions,isMobile:!1}}),n=L.getEquationString(S)}else r=e("div",{className:"perseus-error",children:this.props.valid});return s(l,{children:[e(T,{label:"Type of Graph:",children:e(fe,{graphType:((p=this.props.graph)==null?void 0:p.type)??L.defaultProps.graph.type,onChange:d=>{this.props.onChange({graph:{type:d},correct:{type:d}})}})}),this.props.graph&&((z=(C=(w=this.props.apiOptions)==null?void 0:w.flags)==null?void 0:C.mafs)==null?void 0:z[this.props.graph.type])&&e(we,{ariaLabelValue:this.props.fullGraphAriaLabel??"",ariaDescriptionValue:this.props.fullGraphAriaDescription??"",onChange:this.props.onChange}),e(be,{equationString:n,children:r}),((N=this.props.correct)==null?void 0:N.type)==="point"&&e(T,{label:"Number of Points:",children:e(ye,{numPoints:(R=this.props.correct)==null?void 0:R.numPoints,onChange:d=>{this.props.onChange({correct:{type:"point",numPoints:d},graph:{type:"point",numPoints:d}})}})}),((B=this.props.correct)==null?void 0:B.type)==="polygon"&&s(x,{children:[e(T,{label:"Number of sides:",children:e(q,{selectedValue:(Q=this.props.correct)!=null&&Q.numSides?`${this.props.correct.numSides}`:"3",placeholder:"",onChange:d=>{var k;m(((k=this.props.graph)==null?void 0:k.type)==="polygon");const S={numSides:me(d),coords:null,snapTo:"grid"};this.props.onChange({correct:{...this.props.correct,...S},graph:{...this.props.graph,...S}})},style:I.singleSelectShort,children:[...ur,e(h,{value:"unlimited",label:"unlimited sides"},"unlimited")]},"polygon-select")}),s(T,{label:"Snap to:",children:[s(q,{selectedValue:((X=this.props.correct)==null?void 0:X.snapTo)||"grid",placeholder:"",onChange:d=>{var k,v;m(this.props.correct.type==="polygon",`Expected correct answer type to be polygon, but got ${this.props.correct.type}`),m(((k=this.props.graph)==null?void 0:k.type)==="polygon",`Expected graph type to be polygon, but got ${(v=this.props.graph)==null?void 0:v.type}`);const S={snapTo:d,coords:null};this.props.onChange({correct:{...this.props.correct,...S},graph:{...this.props.graph,...S}})},style:I.singleSelectShort,children:[e(h,{value:"grid",label:"grid"}),((Y=this.props.correct)==null?void 0:Y.numSides)!=="unlimited"&&e(h,{value:"angles",label:"interior angles"}),((Z=this.props.correct)==null?void 0:Z.numSides)!=="unlimited"&&e(h,{value:"sides",label:"side measures"})]}),s(G,{children:[e("p",{children:"These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."}),e("p",{children:"The interior angle and side measure options guide the points to the nearest whole angle or side measure respectively."})]})]}),s(l,{style:I.row,children:[e(de,{label:e(he,{children:"Show angle measures"}),checked:!!((J=this.props.correct)!=null&&J.showAngles),onChange:()=>{var d;((d=this.props.graph)==null?void 0:d.type)==="polygon"&&(m(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:!this.props.correct.showAngles},graph:{...this.props.graph,showAngles:!this.props.graph.showAngles}}))}}),e(G,{children:e("p",{children:"Displays the interior angle measures."})})]}),s(l,{style:I.row,children:[e(de,{label:e(he,{children:"Show side measures"}),checked:!!((K=this.props.correct)!=null&&K.showSides),onChange:()=>{var d;((d=this.props.graph)==null?void 0:d.type)==="polygon"&&this.props.correct.type==="polygon"&&this.props.onChange({correct:{...this.props.correct,showSides:!this.props.correct.showSides},graph:{...this.props.graph,showSides:!this.props.graph.showSides}})}}),e(G,{children:e("p",{children:"Displays the side lengths."})})]})]}),((ee=this.props.correct)==null?void 0:ee.type)==="segment"&&e(T,{label:"Number of segments:",children:e(Ce,{numSegments:(re=this.props.correct)==null?void 0:re.numSegments,onChange:d=>{this.props.onChange({correct:{type:"segment",numSegments:d,coords:null},graph:{type:"segment",numSegments:d}})}})}),((te=this.props.graph)==null?void 0:te.type)&&rr(this.props.graph,this.props.static)&&e(Ie,{...this.props.graph,range:this.props.range,step:this.props.step,onChange:this.changeStartCoords}),e(Qe,{box:hr(c),range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:o,snapStep:i,valid:this.props.valid,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,onChange:this.props.onChange}),this.props.correct.type==="polygon"&&s(T,{label:"Student answer must",children:[s(q,{selectedValue:this.props.correct.match||"exact",onChange:d=>{m(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`);const S={...this.props.correct,match:d};this.props.onChange({correct:S})},placeholder:"",style:I.singleSelectShort,children:[e(h,{value:"exact",label:"match exactly"}),e(h,{value:"congruent",label:"be congruent"}),e(h,{value:"approx",label:"be approximately congruent"}),e(h,{value:"similar",label:"be similar"})]}),e(G,{children:s("ul",{children:[e("li",{children:s("p",{children:[e("b",{children:"Match Exactly:"})," Match exactly in size, orientation, and location on the grid even if it is not shown in the background."]})}),e("li",{children:s("p",{children:[e("b",{children:"Be Congruent:"})," Be congruent in size and shape, but can be located anywhere on the grid."]})}),e("li",{children:s("p",{children:[e("b",{children:"Be Approximately Congruent:"})," Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid."," ",e("em",{children:"Use this with snapping to angle measure."})]})}),e("li",{children:s("p",{children:[e("b",{children:"Be Similar:"})," Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."]})})]})})]}),this.props.correct.type==="angle"&&s(T,{label:"Student answer must",children:[s(q,{selectedValue:this.props.correct.match||"exact",onChange:d=>{this.props.onChange({correct:{...this.props.correct,match:d}})},placeholder:"",style:I.singleSelectShort,children:[e(h,{value:"exact",label:"match exactly"}),e(h,{value:"congruent",label:"be congruent"})]}),e(G,{children:e("p",{children:"Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."})})]}),this.props.graph&&((oe=(ae=(ne=this.props.apiOptions)==null?void 0:ne.flags)==null?void 0:ae.mafs)==null?void 0:oe[this.props.graph.type])&&e(Xe,{showLabelsFlag:(le=(ie=(se=this.props.apiOptions)==null?void 0:se.flags)==null?void 0:ie.mafs)==null?void 0:le["interactive-graph-locked-features-labels"],figures:this.props.lockedFigures,onChange:this.props.onChange})]})}};E.widgetName="interactive-graph",E.defaultProps={...L.defaultProps,valid:!0,backgroundImage:cr,showTooltips:!1,correct:{type:L.defaultProps.graph.type,coords:null}};let F=E;function gr(t,r){if(t.type!==r.type)throw new Error(`Cannot merge graphs with different types (${t.type} and ${r.type})`);switch(t.type){case"angle":return m(r.type==="angle"),{...t,...r};case"circle":return m(r.type==="circle"),{...t,...r};case"linear":return m(r.type==="linear"),{...t,...r};case"linear-system":return m(r.type==="linear-system"),{...t,...r};case"point":return m(r.type==="point"),{...t,...r};case"polygon":return m(r.type==="polygon"),{...t,...r};case"quadratic":return m(r.type==="quadratic"),{...t,...r};case"ray":return m(r.type==="ray"),{...t,...r};case"segment":return m(r.type==="segment"),{...t,...r};case"sinusoid":return m(r.type==="sinusoid"),{...t,...r};default:throw new He(t)}}const I=b.StyleSheet.create({singleSelectShort:{height:26},row:{flexDirection:"row",marginTop:a.xSmall_8,alignItems:"center"}}),lt=F;F.__docgenInfo={description:`An editor for the InteractiveGraph widget, which allows the user to
specify the graph's properties and the correct answer.

Used in the exercise editor.`,methods:[{name:"changeStartCoords",docblock:null,modifiers:[],params:[{name:"coords",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"PerseusInteractiveGraphWidgetOptions"}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphEditor",props:{apiOptions:{required:!0,tsType:{name:"APIOptionsWithDefaults"},description:""},labels:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes."},range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph in the x and y directions."},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`},gridStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions."},snapStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions."},box:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph in pixels."},valid:{required:!1,tsType:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"PerseusImageBackground"},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
    url: null,
}`,computed:!1}},markings:{required:!0,tsType:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},showProtractor:{required:!0,tsType:{name:"boolean"},description:"Whether to show the protractor on the graph."},showTooltips:{required:!1,tsType:{name:"boolean"},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`,defaultValue:{value:"false",computed:!1}},correct:{required:!1,tsType:{name:"PerseusGraphType"},description:`The current correct answer for the graph. Updated by this component
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
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
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
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
}`,signature:{properties:[{key:"apiOptions",value:{name:"APIOptionsWithDefaults",required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"PerseusImageBackground",required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"PerseusGraphType",required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}}},description:""},static:{required:!1,tsType:{name:"boolean"},description:""}}};export{lt as I};
