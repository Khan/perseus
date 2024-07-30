import{j as o,a as m,F as R}from"./jsx-runtime-5BUNAZ9W.js";import{B as _}from"./choice--TeDH0lH.js";import{V as y,u as H}from"./index-e4P84RkC.js";import{S as W}from"./index-wjVcXLkf.js";import{s as h,c as $}from"./index-lUErx3pE.js";import{l as F}from"./index-awljIyHI.js";import{r as b}from"./index-4g5l5LRQ.js";import{H as O}from"./heading-m7-VnwH_.js";import{g as B}from"./util-lUUoF3jg.js";import{a as j,b as D}from"./answer-choices-0kmMu87Y.js";import{L as G}from"./locked-ellipse-settings-jAI1L9Su.js";import{L as N}from"./locked-line-settings-APoZaOeW.js";import{L as z}from"./locked-point-settings-jo_rTXz9.js";import{L as U}from"./locked-polygon-settings-THlzSpbw.js";import{L as V}from"./locked-vector-settings-vUnMM0we.js";const x=n=>{const{id:g,onChange:s}=n,u=n.showM2Features?["point","line","vector","ellipse","polygon"]:["point","line"];return o(y,{style:f.container,children:o(j,{menuText:"Add locked figure",style:f.addElementSelect,children:u.map(l=>o(D,{label:l,onClick:()=>s(l)},`${g}-${l}`))})})},f=F.StyleSheet.create({container:{marginTop:h.xSmall_8},addElementSelect:{backgroundColor:$.fadedBlue8,borderRadius:h.xxxSmall_4}});x.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSelect",props:{showM2Features:{required:!0,tsType:{name:"boolean"},description:""},showM2bFeatures:{required:!0,tsType:{name:"boolean"},description:""},id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};const T=n=>{switch(n.type){case"point":return o(z,{...n});case"line":return o(N,{...n});case"vector":if(n.showM2Features)return o(V,{...n});break;case"ellipse":if(n.showM2Features)return o(G,{...n});break;case"polygon":if(n.showM2Features)return o(U,{...n})}return null};T.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettings",props:{showM2Features:{required:!1,tsType:{name:"boolean"},description:""},showM2bFeatures:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."}}};const S=n=>{const g=Array((n.figures??[]).length).fill(!1),[s,u]=b.useState(g),[l,q]=b.useState(!0),w=H().get("locked-figures-section"),{figures:t,onChange:c}=n;function L(e){const a={lockedFigures:[...t||[],B(e)]};c(a),u([...s,!0])}function P(e,r){if(e===0&&(r==="back"||r==="backward")||t&&e===t.length-1&&(r==="front"||r==="forward"))return;const i=[...t||[]],d=[...s],[p]=i.splice(e,1);switch(d.splice(e,1),r){case"back":i.unshift(p),d.unshift(!0);break;case"backward":i.splice(e-1,0,p),d.splice(e-1,0,!0);break;case"forward":i.splice(e+1,0,p),d.splice(e+1,0,!0);break;case"front":i.push(p),d.push(!0);break}c({lockedFigures:i}),u(d)}function C(e){if(window.confirm("Are you sure you want to delete this figure?")){const r=t||[];c({lockedFigures:[...r.slice(0,e),...r.slice(e+1)]});const a=[...s];a.splice(e,1),u(a)}}function M(e,r){const a=t||[],i={lockedFigures:[...a.slice(0,e),{...a[e],...r},...a.slice(e+1)]};c(i)}function I(e){u(Array(t==null?void 0:t.length).fill(e))}const k=s.every(e=>!e),A=k?"Expand all":"Collapse all",E=!!(t!=null&&t.length);return m(R,{children:[o(O,{title:"Locked Figures",isOpen:l,onToggle:()=>q(!l),isCollapsible:!0}),l&&m(y,{children:[t==null?void 0:t.map((e,r)=>{if(e.type!=="function")return o(T,{showM2Features:n.showM2Features,showM2bFeatures:n.showM2bFeatures,expanded:s[r],onToggle:a=>{const i=[...s];i[r]=a,u(i)},...e,onChangeProps:a=>M(r,a),onMove:a=>P(r,a),onRemove:()=>C(r)},`${w}-locked-${e}-${r}`)}),m(y,{style:v.buttonContainer,children:[o(x,{showM2Features:n.showM2Features,showM2bFeatures:n.showM2bFeatures,id:`${w}-select`,onChange:L}),o(W,{size:h.small_12}),E&&o(_,{kind:"secondary",onClick:()=>I(k),style:v.button,children:A})]})]})]})},v=F.StyleSheet.create({buttonContainer:{flexDirection:"row",alignItems:"center"},button:{marginTop:h.xSmall_8,flexGrow:1}}),le=S;S.__docgenInfo={description:"",methods:[],displayName:"LockedFiguresSection",props:{showM2Features:{required:!0,tsType:{name:"boolean"},description:""},showM2bFeatures:{required:!0,tsType:{name:"boolean"},description:""},figures:{required:!1,tsType:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<InteractiveGraphEditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
etc.) that are locked in place and not interactive.`},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<InteractiveGraphEditorProps>"},name:"props"}],return:{name:"void"}}},description:""}}};export{le as L};
