import{j as o,a as m,F as R}from"./jsx-runtime-FVsy8kgq.js";import{B as _}from"./choice-Dq9nzPyo.js";import{V as y,u as H}from"./index-6h5t6F0w.js";import{S as W}from"./index-qUyqkRvh.js";import{s as h,c as $}from"./index-deFLJwr4.js";import{l as F}from"./index-awljIyHI.js";import{r as b}from"./index-TT1qJ6UJ.js";import{H as O}from"./heading-8aCiuWUg.js";import{g as B}from"./util-fNRYUJJn.js";import{a as j,b as D}from"./answer-choices-p3AbGJTs.js";import{L as G}from"./locked-ellipse-settings-8tu7o3Sr.js";import{L as N}from"./locked-function-settings-ZGn72TdN.js";import{L as z}from"./locked-label-settings-QDAR_FD1.js";import{L as U}from"./locked-line-settings-NNxC5e5m.js";import{L as V}from"./locked-point-settings-dlxfCA5R.js";import{L as J}from"./locked-polygon-settings-Mcz28704.js";import{L as K}from"./locked-vector-settings-I_nZs268.js";const x=n=>{const{id:g,onChange:l}=n,s=["point","line","vector","ellipse","polygon"];return n.showM2bFeatures&&s.push("function"),n.showLabelsFlag&&s.push("label"),o(y,{style:f.container,children:o(j,{menuText:"Add locked figure",style:f.addElementSelect,children:s.map(u=>o(D,{label:u,onClick:()=>l(u)},`${g}-${u}`))})})},f=F.StyleSheet.create({container:{marginTop:h.xSmall_8},addElementSelect:{backgroundColor:$.fadedBlue8,borderRadius:h.xxxSmall_4}});x.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSelect",props:{showM2bFeatures:{required:!0,tsType:{name:"boolean"},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};const L=n=>{switch(n.type){case"point":return o(V,{...n});case"line":return o(U,{...n});case"vector":return o(K,{...n});case"ellipse":return o(G,{...n});case"polygon":return o(J,{...n});case"function":if(n.showM2bFeatures)return o(N,{...n});break;case"label":if(n.showLabelsFlag)return o(z,{...n});break}return null};L.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettings",props:{showM2bFeatures:{required:!1,tsType:{name:"boolean"},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."}}};const T=n=>{const g=Array((n.figures??[]).length).fill(!1),[l,s]=b.useState(g),[u,S]=b.useState(!0),w=H().get("locked-figures-section"),{figures:t,onChange:c}=n;function q(e){const a={lockedFigures:[...t||[],B(e)]};c(a),s([...l,!0])}function P(e,r){if(e===0&&(r==="back"||r==="backward")||t&&e===t.length-1&&(r==="front"||r==="forward"))return;const i=[...t||[]],d=[...l],[p]=i.splice(e,1);switch(d.splice(e,1),r){case"back":i.unshift(p),d.unshift(!0);break;case"backward":i.splice(e-1,0,p),d.splice(e-1,0,!0);break;case"forward":i.splice(e+1,0,p),d.splice(e+1,0,!0);break;case"front":i.push(p),d.push(!0);break}c({lockedFigures:i}),s(d)}function C(e){if(window.confirm("Are you sure you want to delete this figure?")){const r=t||[];c({lockedFigures:[...r.slice(0,e),...r.slice(e+1)]});const a=[...l];a.splice(e,1),s(a)}}function I(e,r){const a=t||[],i={lockedFigures:[...a.slice(0,e),{...a[e],...r},...a.slice(e+1)]};c(i)}function A(e){s(Array(t==null?void 0:t.length).fill(e))}const k=l.every(e=>!e),E=k?"Expand all":"Collapse all",M=!!(t!=null&&t.length);return m(R,{children:[o(O,{title:"Locked Figures",isOpen:u,onToggle:()=>S(!u),isCollapsible:!0}),u&&m(y,{children:[t==null?void 0:t.map((e,r)=>o(L,{showM2bFeatures:n.showM2bFeatures,showLabelsFlag:n.showLabelsFlag,expanded:l[r],onToggle:a=>{const i=[...l];i[r]=a,s(i)},...e,onChangeProps:a=>I(r,a),onMove:a=>P(r,a),onRemove:()=>C(r)},`${w}-locked-${e}-${r}`)),m(y,{style:v.buttonContainer,children:[o(x,{showM2bFeatures:n.showM2bFeatures,showLabelsFlag:n.showLabelsFlag,id:`${w}-select`,onChange:q}),o(W,{size:h.small_12}),M&&o(_,{kind:"secondary",onClick:()=>A(k),style:v.button,children:E})]})]})]})},v=F.StyleSheet.create({buttonContainer:{flexDirection:"row",alignItems:"center"},button:{marginTop:h.xSmall_8,flexGrow:1}}),he=T;T.__docgenInfo={description:"",methods:[],displayName:"LockedFiguresSection",props:{showM2bFeatures:{required:!0,tsType:{name:"boolean"},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},figures:{required:!1,tsType:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<InteractiveGraphEditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
etc.) that are locked in place and not interactive.`},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<InteractiveGraphEditorProps>"},name:"props"}],return:{name:"void"}}},description:""}}};export{he as L};
