import{j as r,a as s,F as v}from"./jsx-runtime-FVsy8kgq.js";import{U as ce}from"./util-XcxTwqb0.js";import{l as we,s as be,e as Ve}from"./svg-image-Rjw-_QTV.js";import{i as Ce,j as Se,k as xe,m as ve,n as ke,o as Te,q as qe,r as Pe,s as Ie,u as He}from"./article-renderer-dW7aHaSz.js";import{_ as q}from"./jquery-yG1GhClm.js";import"./phet-simulation-1GGKwmGg.js";import"./version-akiLXZts.js";import"./dependencies-8XILypbq.js";import"./perseus-api-mOiZT07d.js";import"./multi-renderer-NFwN-QKw.js";import"./hints-renderer-Y5rRhi0x.js";import{S as je}from"./renderer-fCZtd29S.js";import"./base-radio-_elPes9Q.js";import{c as Qe}from"./components-QATbWbgm.js";import{i as Xe}from"./constants-I_nlPaPx.js";import"./index-k-0mNqHS.js";import"./i18n-context-W41LcU6B.js";import{w as Ae}from"./index-J2t_5nK1.js";import"./index-IIMKO4_x.js";import{V as d}from"./index-6h5t6F0w.js";import{S as P,O as p}from"./answer-choices-rUhkpW85.js";import{T as Ye,a as Ze,C as ue}from"./index-QCAhLhLD.js";import{s as o,c as y,a as V}from"./index-deFLJwr4.js";import{c as _e,f as W,L as u,a as H,b as ge}from"./index-h_CiYGGb.js";import{l as b}from"./index-awljIyHI.js";import{r as D}from"./index-TT1qJ6UJ.js";import{i as m}from"./tiny-invariant-bHgPayXn.js";import{H as j}from"./heading-8aCiuWUg.js";import{S as g}from"./index-qUyqkRvh.js";import{L as T,I as Je}from"./interactive-graph-settings-s1YY1apj.js";import{L as Ke}from"./locked-figures-section-sDV7Vsym.js";import"./button-group-nsoLlHtM.js";import"./graph-sgfCFYpv.js";import"./hud-FI3E3dT_.js";import"./icon-YuYiVxsK.js";import"./index-K9BSJPWl.js";import"./inline-icon-tKY1iMkH.js";import"./math-input-5c41KzAV.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-nAb-9rMQ.js";import"./range-input-_BNU8ZEa.js";import"./text-input-15gEhfDF.js";import"./text-list-editor-pe7AGDAl.js";import{B as er}from"./choice-MC7GDocC.js";import{C as f,P as rr}from"./locked-figure-settings-actions-uXmYmaRN.js";import{S as tr}from"./scrollless-number-text-field-U5Bx_xXb.js";const M="unlimited",Le=t=>{const e=parseInt(t,10);return isNaN(e)||e===0?M:e},Ge=({numPoints:t=1,onChange:e})=>r(P,{selectedValue:`${t}`,onChange:n=>{e(Le(n))},placeholder:"",style:nr.singleSelectShort,children:[...[...Array(7).keys()].map(n=>r(p,{value:`${n}`,label:`${n} point${n>1?"s":""}`},n)),r(p,{value:M,label:"unlimited"},"unlimited")]}),nr=b.StyleSheet.create({singleSelectShort:{height:26}});Ge.__docgenInfo={description:"",methods:[],displayName:"GraphPointsCountSelector",props:{numPoints:{required:!1,tsType:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(points: PointValue) => void",signature:{arguments:[{type:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},name:"points"}],return:{name:"void"}}},description:""}}};const De=t=>s(P,{selectedValue:t.graphType,onChange:t.onChange,placeholder:"Select an answer type",style:ar.singleSelectShort,children:[t.showNoneOption&&r(p,{value:"none",label:"None"}),r(p,{value:"linear",label:"Linear function"}),r(p,{value:"quadratic",label:"Quadratic function"}),r(p,{value:"sinusoid",label:"Sinusoid function"}),r(p,{value:"circle",label:"Circle"}),r(p,{value:"point",label:"Point(s)"}),r(p,{value:"linear-system",label:"Linear System"}),r(p,{value:"polygon",label:"Polygon"}),r(p,{value:"segment",label:"Line Segment(s)"}),r(p,{value:"ray",label:"Ray"}),r(p,{value:"angle",label:"Angle"})]}),ar=b.StyleSheet.create({singleSelectShort:{height:26}});De.__docgenInfo={description:"",methods:[],displayName:"GraphTypeSelector",props:{graphType:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newGraphType: string) => void",signature:{arguments:[{type:{name:"string"},name:"newGraphType"}],return:{name:"void"}}},description:""},showNoneOption:{required:!0,tsType:{name:"boolean"},description:""}}};function Ne(t){return s(v,{children:[r(j,{title:"Correct Answer",isOpen:!0,isCollapsible:!1}),s(d,{children:[s(d,{children:[r(_e,{style:{paddingTop:o.xxSmall_6,paddingBottom:o.xxSmall_6,color:y.offBlack64},children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."}),r(W,{style:{fontSize:12,backgroundColor:"#eee",paddingInline:o.xxSmall_6,borderColor:"#ccc",borderStyle:"solid",borderWidth:1},children:t.equationString})]}),t.children]})]})}Ne.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCorrectAnswer",props:{equationString:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function ze(t){const{ariaLabelValue:e,ariaDescriptionValue:n,onChange:a}=t,[i,c]=D.useState(!0);return s(v,{children:[r(j,{title:"Description",isCollapsible:!0,isOpen:i,onToggle:c}),i&&s(d,{children:[r(_e,{style:U.caption,children:"Use these fields to describe the graph as a whole. These are used by screen readers to describe content to users who are visually impaired."}),s(u,{tag:"label",children:["Title",r(Ye,{value:e,onChange:l=>a({fullGraphAriaLabel:l}),style:U.spaceAbove})]}),r(g,{size:o.small_12}),s(u,{tag:"label",children:["Description",r(Ze,{rows:8,resizeType:"vertical",value:n,onChange:l=>a({fullGraphAriaDescription:l}),style:U.spaceAbove})]})]})]})}const U=b.StyleSheet.create({caption:{color:y.offBlack64,paddingTop:o.xxSmall_6,paddingBottom:o.xxSmall_6},spaceAbove:{marginTop:o.xxxSmall_4}});ze.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphDescription",props:{ariaLabelValue:{required:!0,tsType:{name:"string"},description:""},ariaDescriptionValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(graphProps: Partial<EditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<EditorProps>"},name:"graphProps"}],return:{name:"void"}}},description:""}}};const Re=({numSegments:t=1,onChange:e})=>r(P,{selectedValue:`${t}`,placeholder:"",onChange:n=>{const a=+n;e(a)},style:or.singleSelectShort,children:q.range(1,7).map(n=>r(p,{value:`${n}`,label:`${n} segment${n>1?"s":""}`},n))},"segment-select"),or=b.StyleSheet.create({singleSelectShort:{height:26}});Re.__docgenInfo={description:"",methods:[],displayName:"SegmentCountSelector",props:{numSegments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(numSegments: number) => void",signature:{arguments:[{type:{name:"number"},name:"numSegments"}],return:{name:"void"}}},description:""}}};const sr=""+new URL("arrow-counter-clockwise-bold-Zg1fUITb.svg",import.meta.url).href;function ir(t){if("startCoords"in t)return t.startCoords}function lr(t,e,n){switch(t.type){case"linear":case"ray":return Ie({...t,startCoords:void 0},e,n);case"segment":return Pe({...t,startCoords:void 0},e,n);case"linear-system":return qe({...t,startCoords:void 0},e,n);case"circle":const a=Te({...t,startCoords:void 0}),i=we(be(a.radiusPoint,a.center));return{center:a.center,radius:i};case"sinusoid":return ke({...t,startCoords:void 0},e,n);case"quadratic":return ve({...t,startCoords:void 0},e,n);case"point":return xe({...t,startCoords:void 0},e,n);case"polygon":return Se({...t,startCoords:void 0},e,n);case"angle":return Ce({graph:{...t,startCoords:void 0},range:e,step:n});default:return}}const pr=t=>{const e=t[0],n=t[1],a=n[1]-e[1],i=Math.PI/(2*(n[0]-e[0])),c=e[0]*i,l=e[1];return"y = "+a.toFixed(3)+"sin("+i.toFixed(3)+"x - "+c.toFixed(3)+") + "+l.toFixed(3)},dr=t=>{const e=t[0],n=t[1],a=t[2],i=(e[0]-n[0])*(e[0]-a[0])*(n[0]-a[0]);if(i===0)return"Division by zero error";const c=(a[0]*(n[1]-e[1])+n[0]*(e[1]-a[1])+e[0]*(a[1]-n[1]))/i,l=(a[0]*a[0]*(e[1]-n[1])+n[0]*n[0]*(a[1]-e[1])+e[0]*e[0]*(n[1]-a[1]))/i,w=(n[0]*a[0]*(n[0]-a[0])*e[1]+a[0]*e[0]*(a[0]-e[0])*n[1]+e[0]*n[0]*(e[0]-n[0])*a[1])/i;return"y = "+c.toFixed(3)+"x^2 + "+l.toFixed(3)+"x + "+w.toFixed(3)},me=(t,e)=>{const n=t[0]-e[0],a=t[1]-e[1];return(180+Math.atan2(-a,-n)*180/Math.PI+360)%360},hr=t=>{const[e,n,a]=t;return`${(me(a,n)-me(e,n)).toFixed(0)}° angle at (${n[0]}, ${n[1]})`},cr=(t,e)=>{if(e)return!1;switch(t.type){case"point":return t.numPoints!=="unlimited";case"polygon":return t.numSides!=="unlimited"&&t.snapTo!=="angles"&&t.snapTo!=="sides";case"none":return!1;case"angle":case"circle":case"linear":case"linear-system":case"quadratic":case"ray":case"segment":case"sinusoid":return!0;default:throw new Ae(t)}},Oe=t=>{const{startCoords:e,onChange:n}=t;return s(v,{children:[s(d,{style:A.equationSection,children:[r(H,{children:"Starting equation:"}),r(W,{style:A.equationBody,children:hr(e)})]}),s(d,{style:A.tile,children:[r(u,{children:"Point 1:"}),r(g,{size:o.small_12}),r(f,{coord:e[0],labels:["x","y"],onChange:a=>n([a,e[1],e[2]])})]}),s(d,{style:A.tile,children:[r(u,{children:"Vertex:"}),r(g,{size:o.small_12}),r(f,{coord:e[1],labels:["x","y"],onChange:a=>n([e[0],a,e[2]])})]}),s(d,{style:A.tile,children:[r(u,{children:"Point 2:"}),r(g,{size:o.small_12}),r(f,{coord:e[2],labels:["x","y"],onChange:a=>n([e[0],e[1],a])})]})]})},A=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:o.small_12},equationBody:{backgroundColor:y.fadedOffBlack8,border:`1px solid ${y.fadedOffBlack32}`,marginTop:o.xSmall_8,paddingLeft:o.xSmall_8,paddingRight:o.xSmall_8,fontSize:V.size.xSmall}});Oe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsAngle",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: AngleCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Fe=t=>{const{startCoords:e,onChange:n}=t,[a,i]=D.useState(e.radius.toString());D.useEffect(()=>{i(e.radius.toString())},[e.radius]);function c(l){i(l),!(isNaN(+l)||l===""||+l==0)&&n({center:e.center,radius:parseFloat(l)})}return s(d,{style:F.tile,children:[s(d,{style:F.row,children:[r(u,{children:"Center:"}),r(g,{size:o.small_12}),r(f,{coord:e.center,labels:["x","y"],onChange:l=>n({center:l,radius:e.radius})})]}),r(g,{size:o.small_12}),s(u,{tag:"label",style:F.row,children:["Radius:",r(g,{size:o.small_12}),r(tr,{value:a,onChange:c,style:F.textField})]})]})},F=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:o.xxxLarge_64}});Fe.__docgenInfo={description:"",methods:[],displayName:"StartCoordsCircle",props:{startCoords:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"Coord",required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CircleCoords) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"Coord",required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},name:"startCoords"}],return:{name:"void"}}},description:""}}};const $e=t=>{const{startCoords:e,onChange:n}=t;return s(v,{children:[s(d,{style:ye.tile,children:[r(u,{children:"Point 1:"}),r(g,{size:o.small_12}),r(f,{coord:e[0],labels:["x","y"],onChange:a=>n([a,e[1]])})]}),s(d,{style:ye.tile,children:[r(u,{children:"Point 2:"}),r(g,{size:o.small_12}),r(f,{coord:e[1],labels:["x","y"],onChange:a=>n([e[0],a])})]})]})},ye=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"}});$e.__docgenInfo={description:"",methods:[],displayName:"StartCoordsLine",props:{startCoords:{required:!0,tsType:{name:"CollinearTuple"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple) => void",signature:{arguments:[{type:{name:"CollinearTuple"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Be=t=>{const{startCoords:e,type:n,onChange:a}=t,i=n==="segment"?"Segment":"Line";return r(v,{children:e.map((c,l)=>s(rr,{header:r(u,{children:`${i} ${l+1}`}),expanded:!0,children:[s(d,{style:fe.nestedTile,children:[r(u,{children:"Point 1:"}),r(g,{size:o.small_12}),r(f,{coord:c[0],labels:["x","y"],onChange:w=>{const C=[...e];C[l]=[w,c[1]],a(C)}})]}),s(d,{style:fe.nestedTile,children:[r(u,{children:"Point 2:"}),r(g,{size:o.small_12}),r(f,{coord:c[1],labels:["x","y"],onChange:w=>{const C=[...e];C[l]=[c[0],w],a(C)}})]})]},`segment-${l}-start-coords`))})},fe=b.StyleSheet.create({nestedTile:{paddingBottom:o.small_12,flexDirection:"row",alignItems:"center"}});Be.__docgenInfo={description:"",methods:[],displayName:"StartCoordsMultiline",props:{type:{required:!0,tsType:{name:"union",raw:'"linear-system" | "segment"',elements:[{name:"literal",value:'"linear-system"'},{name:"literal",value:'"segment"'}]},description:""},startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"CollinearTuple"}],raw:"CollinearTuple[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"CollinearTuple"}],raw:"CollinearTuple[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Ee=t=>{const{startCoords:e,onChange:n}=t;return r(v,{children:e.map((a,i)=>s(d,{style:ur.tile,children:[r(u,{children:`Point ${i+1}:`}),r(g,{size:o.small_12}),r(f,{coord:a,labels:["x","y"],onChange:c=>{const l=[...e];l[i]=c,n(l)}})]},i))})},ur=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"}});Ee.__docgenInfo={description:"",methods:[],displayName:"StartCoordsPoint",props:{startCoords:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"Coord"}],raw:"ReadonlyArray<Coord>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: ReadonlyArray<Coord>) => void",signature:{arguments:[{type:{name:"ReadonlyArray",elements:[{name:"Coord"}],raw:"ReadonlyArray<Coord>"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const We=t=>{const{startCoords:e,onChange:n}=t;return s(v,{children:[s(d,{style:_.equationSection,children:[r(H,{children:"Starting equation:"}),r(W,{style:_.equationBody,children:dr(e)})]}),s(d,{style:_.tile,children:[r(u,{children:"Point 1:"}),r(g,{size:o.small_12}),r(f,{coord:e[0],labels:["x","y"],onChange:a=>n([a,e[1],e[2]])})]}),s(d,{style:_.tile,children:[r(u,{children:"Point 2:"}),r(g,{size:o.small_12}),r(f,{coord:e[1],labels:["x","y"],onChange:a=>n([e[0],a,e[2]])})]}),s(d,{style:_.tile,children:[r(u,{children:"Point 3:"}),r(g,{size:o.small_12}),r(f,{coord:e[2],labels:["x","y"],onChange:a=>n([e[0],e[1],a])})]})]})},_=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:o.small_12},equationBody:{backgroundColor:y.fadedOffBlack8,border:`1px solid ${y.fadedOffBlack32}`,marginTop:o.xSmall_8,paddingLeft:o.xSmall_8,paddingRight:o.xSmall_8,fontSize:V.size.xSmall}});We.__docgenInfo={description:"",methods:[],displayName:"StartCoordsQuadratic",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: [Coord, Coord, Coord]) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"},{name:"Coord"}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Ue=t=>{const{startCoords:e,onChange:n}=t;return s(v,{children:[s(d,{style:$.equationSection,children:[r(H,{children:"Starting equation:"}),r(W,{style:$.equationBody,children:pr(e)})]}),s(d,{style:$.tile,children:[r(u,{children:"Point 1:"}),r(g,{size:o.small_12}),r(f,{coord:e[0],labels:["x","y"],onChange:a=>n([a,e[1]])})]}),s(d,{style:$.tile,children:[r(u,{children:"Point 2:"}),r(g,{size:o.small_12}),r(f,{coord:e[1],labels:["x","y"],onChange:a=>n([e[0],a])})]})]})},$=b.StyleSheet.create({tile:{backgroundColor:y.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:o.small_12},equationBody:{backgroundColor:y.fadedOffBlack8,border:`1px solid ${y.fadedOffBlack32}`,marginTop:o.xSmall_8,paddingLeft:o.xSmall_8,paddingRight:o.xSmall_8,fontSize:V.size.xSmall}});Ue.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSinusoid",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: SinusoidCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"Coord"},{name:"Coord"}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const gr=t=>{const{type:e,range:n,step:a,onChange:i}=t;switch(e){case"linear":case"ray":const c=Ie(t,n,a);return r($e,{startCoords:c,onChange:i});case"linear-system":case"segment":const l=e==="segment"?Pe(t,n,a):qe(t,n,a);return r(Be,{type:e,startCoords:l,onChange:i});case"circle":const w=Te(t),C=we(be(w.radiusPoint,w.center));return r(Fe,{startCoords:{center:w.center,radius:C},onChange:i});case"sinusoid":const N=ke(t,n,a);return r(Ue,{startCoords:N,onChange:i});case"quadratic":const z=ve(t,n,a);return r(We,{startCoords:z,onChange:i});case"point":case"polygon":const R=e==="point"?xe(t,n,a):Se(t,n,a);return r(Ee,{startCoords:R,onChange:i});case"angle":const O=Ce({graph:t,range:n,step:a});return r(Oe,{startCoords:O,onChange:i});default:return null}},Me=t=>{const{range:e,step:n,onChange:a}=t,[i,c]=D.useState(!0);return s(d,{children:[r(j,{isCollapsible:!0,title:"Start coordinates",isOpen:i,onToggle:()=>c(!i)}),i&&s(v,{children:[r(gr,{...t}),r(g,{size:o.small_12}),r(er,{startIcon:sr,kind:"tertiary",size:"small",onClick:()=>{a(lr(t,e,n))},children:"Use default start coordinates"})]})]})};Me.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSettings",props:{range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: StartCoords) => void",signature:{arguments:[{type:{name:'Extract["startCoords"]',raw:`Extract<
    PerseusGraphType,
    GraphTypesThatHaveStartCoords
>["startCoords"]`},name:"startCoords"}],return:{name:"void"}}},description:""}}};const{InfoTip:L}=Qe,{containerSizeClass:mr,getInteractiveBoxFromSizeClass:yr}=je,G=He.widget,fr={url:null},wr=q.map(q.range(3,13),function(t){return r(p,{value:`${t}`,label:`${t} sides`},`polygon-sides-${t}`)}),E=class E extends D.Component{constructor(){super(...arguments),this.displayName="InteractiveGraphEditor",this.className="perseus-widget-interactive-graph",this.changeStartCoords=e=>{var a;if(!((a=this.props.graph)!=null&&a.type))return;const n={...this.props.graph,startCoords:e};this.props.onChange({graph:n})},this.getSaveWarnings=()=>{const e=[];for(const n of this.props.lockedFigures??[])n.type==="line"&&Ve(n.points[0].coord,n.points[1].coord)&&e.push("The line cannot have length 0.");return e}}serialize(){const e=q.pick(this.props,"step","backgroundImage","markings","labels","showProtractor","showTooltips","range","gridStep","snapStep","lockedFigures","fullGraphAriaLabel","fullGraphAriaDescription"),n=this.refs.graph;if(n){const a=n&&n.getUserInput();q.extend(e,{graph:{type:a.type,startCoords:this.props.graph&&ir(this.props.graph)},correct:a}),q.each(["allowReflexAngles","angleOffsetDeg","numPoints","numSides","numSegments","showAngles","showSides","snapTo","snapDegrees"],function(i){q.has(a,i)&&(e.graph[i]=a[i])})}return e}render(){var l,w,C,N,z,R,O,Q,X,Y,Z,J,K,ee,re,te,ne,ae,oe,se,ie,le,pe,de,he;let e,n;const a=this.props.gridStep||ce.getGridStep(this.props.range,this.props.step,Xe.defaultBoxSize),i=this.props.snapStep||ce.snapStepFromGridStep(a),c=mr.SMALL;if(this.props.valid===!0){const h=this.props.correct,S={ref:"graph",box:this.props.box,range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:a,snapStep:i,graph:h,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,lockedFigures:this.props.lockedFigures,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,trackInteraction:function(){},onChange:({graph:x})=>{let k=this.props.correct;m(x!=null),k.type===x.type?k=br(k,x):k=x,this.props.onChange({correct:k,graph:this.props.graph})}};e=r(G,{...S,containerSizeClass:c,apiOptions:{...this.props.apiOptions,isMobile:!1}}),n=G.getEquationString(S)}else e=r("div",{className:"perseus-error",children:this.props.valid});return s(d,{children:[r(T,{label:"Answer type:",children:r(De,{graphType:((l=this.props.graph)==null?void 0:l.type)??G.defaultProps.graph.type,onChange:h=>{this.props.onChange({graph:{type:h},correct:{type:h}})},showNoneOption:(N=(C=(w=this.props.apiOptions)==null?void 0:w.flags)==null?void 0:C.mafs)==null?void 0:N.none})}),this.props.graph&&((O=(R=(z=this.props.apiOptions)==null?void 0:z.flags)==null?void 0:R.mafs)==null?void 0:O[this.props.graph.type])&&r(ze,{ariaLabelValue:this.props.fullGraphAriaLabel??"",ariaDescriptionValue:this.props.fullGraphAriaDescription??"",onChange:this.props.onChange}),r(Ne,{equationString:n,children:e}),((Q=this.props.correct)==null?void 0:Q.type)==="point"&&r(T,{label:"Number of Points:",children:r(Ge,{numPoints:(X=this.props.correct)==null?void 0:X.numPoints,onChange:h=>{this.props.onChange({correct:{type:"point",numPoints:h},graph:{type:"point",numPoints:h}})}})}),((Y=this.props.correct)==null?void 0:Y.type)==="polygon"&&s(v,{children:[r(T,{label:"Number of sides:",children:r(P,{selectedValue:(Z=this.props.correct)!=null&&Z.numSides?`${this.props.correct.numSides}`:"3",placeholder:"",onChange:h=>{var x;m(((x=this.props.graph)==null?void 0:x.type)==="polygon");const S={numSides:Le(h),coords:null,snapTo:"grid"};this.props.onChange({correct:{...this.props.correct,...S},graph:{...this.props.graph,...S}})},style:I.singleSelectShort,children:[...wr,r(p,{value:"unlimited",label:"unlimited sides"},"unlimited")]},"polygon-select")}),s(T,{label:"Snap to:",children:[s(P,{selectedValue:((J=this.props.correct)==null?void 0:J.snapTo)||"grid",placeholder:"",onChange:h=>{var x,k;m(this.props.correct.type==="polygon",`Expected correct answer type to be polygon, but got ${this.props.correct.type}`),m(((x=this.props.graph)==null?void 0:x.type)==="polygon",`Expected graph type to be polygon, but got ${(k=this.props.graph)==null?void 0:k.type}`);const S={snapTo:h,coords:null};this.props.onChange({correct:{...this.props.correct,...S},graph:{...this.props.graph,...S}})},style:I.singleSelectShort,children:[r(p,{value:"grid",label:"grid"}),((K=this.props.correct)==null?void 0:K.numSides)!=="unlimited"&&r(p,{value:"angles",label:"interior angles"}),((ee=this.props.correct)==null?void 0:ee.numSides)!=="unlimited"&&r(p,{value:"sides",label:"side measures"})]}),s(L,{children:[r("p",{children:"These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."}),r("p",{children:"The interior angle and side measure options guide the points to the nearest whole angle or side measure respectively."})]})]}),s(d,{style:I.row,children:[r(ue,{label:r(ge,{children:"Show angle measures"}),checked:!!((re=this.props.correct)!=null&&re.showAngles),onChange:()=>{var h;((h=this.props.graph)==null?void 0:h.type)==="polygon"&&(m(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:!this.props.correct.showAngles},graph:{...this.props.graph,showAngles:!this.props.graph.showAngles}}))}}),r(L,{children:r("p",{children:"Displays the interior angle measures."})})]}),s(d,{style:I.row,children:[r(ue,{label:r(ge,{children:"Show side measures"}),checked:!!((te=this.props.correct)!=null&&te.showSides),onChange:()=>{var h;((h=this.props.graph)==null?void 0:h.type)==="polygon"&&this.props.correct.type==="polygon"&&this.props.onChange({correct:{...this.props.correct,showSides:!this.props.correct.showSides},graph:{...this.props.graph,showSides:!this.props.graph.showSides}})}}),r(L,{children:r("p",{children:"Displays the side lengths."})})]})]}),((ne=this.props.correct)==null?void 0:ne.type)==="segment"&&r(T,{label:"Number of segments:",children:r(Re,{numSegments:(ae=this.props.correct)==null?void 0:ae.numSegments,onChange:h=>{this.props.onChange({correct:{type:"segment",numSegments:h,coords:null},graph:{type:"segment",numSegments:h}})}})}),((oe=this.props.graph)==null?void 0:oe.type)&&cr(this.props.graph,this.props.static)&&r(Me,{...this.props.graph,range:this.props.range,step:this.props.step,onChange:this.changeStartCoords}),r(Je,{box:yr(c),range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:a,snapStep:i,valid:this.props.valid,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,onChange:this.props.onChange}),this.props.correct.type==="polygon"&&s(T,{label:"Student answer must",children:[s(P,{selectedValue:this.props.correct.match||"exact",onChange:h=>{m(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`);const S={...this.props.correct,match:h};this.props.onChange({correct:S})},placeholder:"",style:I.singleSelectShort,children:[r(p,{value:"exact",label:"match exactly"}),r(p,{value:"congruent",label:"be congruent"}),r(p,{value:"approx",label:"be approximately congruent"}),r(p,{value:"similar",label:"be similar"})]}),r(L,{children:s("ul",{children:[r("li",{children:s("p",{children:[r("b",{children:"Match Exactly:"})," Match exactly in size, orientation, and location on the grid even if it is not shown in the background."]})}),r("li",{children:s("p",{children:[r("b",{children:"Be Congruent:"})," Be congruent in size and shape, but can be located anywhere on the grid."]})}),r("li",{children:s("p",{children:[r("b",{children:"Be Approximately Congruent:"})," Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid."," ",r("em",{children:"Use this with snapping to angle measure."})]})}),r("li",{children:s("p",{children:[r("b",{children:"Be Similar:"})," Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."]})})]})})]}),this.props.correct.type==="angle"&&s(T,{label:"Student answer must",children:[s(P,{selectedValue:this.props.correct.match||"exact",onChange:h=>{this.props.onChange({correct:{...this.props.correct,match:h}})},placeholder:"",style:I.singleSelectShort,children:[r(p,{value:"exact",label:"match exactly"}),r(p,{value:"congruent",label:"be congruent"})]}),r(L,{children:r("p",{children:"Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."})})]}),this.props.graph&&((le=(ie=(se=this.props.apiOptions)==null?void 0:se.flags)==null?void 0:ie.mafs)==null?void 0:le[this.props.graph.type])&&r(Ke,{flags:this.props.apiOptions.flags,showLabelsFlag:(he=(de=(pe=this.props.apiOptions)==null?void 0:pe.flags)==null?void 0:de.mafs)==null?void 0:he["interactive-graph-locked-features-labels"],figures:this.props.lockedFigures,onChange:this.props.onChange})]})}};E.widgetName="interactive-graph",E.defaultProps={...G.defaultProps,valid:!0,backgroundImage:fr,showTooltips:!1,correct:{type:G.defaultProps.graph.type,coords:null}};let B=E;function br(t,e){if(t.type!==e.type)throw new Error(`Cannot merge graphs with different types (${t.type} and ${e.type})`);switch(t.type){case"angle":return m(e.type==="angle"),{...t,...e};case"circle":return m(e.type==="circle"),{...t,...e};case"linear":return m(e.type==="linear"),{...t,...e};case"linear-system":return m(e.type==="linear-system"),{...t,...e};case"none":return m(e.type==="none"),{...t,...e};case"point":return m(e.type==="point"),{...t,...e};case"polygon":return m(e.type==="polygon"),{...t,...e};case"quadratic":return m(e.type==="quadratic"),{...t,...e};case"ray":return m(e.type==="ray"),{...t,...e};case"segment":return m(e.type==="segment"),{...t,...e};case"sinusoid":return m(e.type==="sinusoid"),{...t,...e};default:throw new Ae(t)}}const I=b.StyleSheet.create({singleSelectShort:{height:26},row:{flexDirection:"row",marginTop:o.xSmall_8,alignItems:"center"}}),ct=B;B.__docgenInfo={description:`An editor for the InteractiveGraph widget, which allows the user to
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}}},description:""},static:{required:!1,tsType:{name:"boolean"},description:""}}};export{ct as I};
