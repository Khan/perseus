import{j as o,a as y,F as R}from"./jsx-runtime-5BUNAZ9W.js";import{B as _}from"./choice-S5THRw8V.js";import{V as k,u as H}from"./index-e4P84RkC.js";import{S as W}from"./index-wjVcXLkf.js";import{s as g,c as $}from"./index-lUErx3pE.js";import{l as F}from"./index-awljIyHI.js";import{r as b}from"./index-4g5l5LRQ.js";import{H as O}from"./heading-m7-VnwH_.js";import{g as B}from"./util-Bz6Wi_gr.js";import{a as j,b as D}from"./answer-choices-9MonqSxj.js";import{L as G}from"./locked-ellipse-settings-FACM1nVT.js";import{L as N}from"./locked-line-settings-pkOhYsly.js";import{L as z}from"./locked-point-settings-rMJZb2ua.js";import{L as U}from"./locked-polygon-settings-oRM1AuvX.js";import{L as V}from"./locked-vector-settings-sEVxZCo5.js";const T=a=>{const{id:m,onChange:s}=a,l=["point","line","vector","ellipse","polygon"],d=a.showM2bFeatures?[...l,"function"]:l;return o(k,{style:v.container,children:o(j,{menuText:"Add locked figure",style:v.addElementSelect,children:d.map(p=>o(D,{label:p,onClick:()=>s(p)},`${m}-${p}`))})})},v=F.StyleSheet.create({container:{marginTop:g.xSmall_8},addElementSelect:{backgroundColor:$.fadedBlue8,borderRadius:g.xxxSmall_4}});T.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSelect",props:{showM2bFeatures:{required:!0,tsType:{name:"boolean"},description:""},id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};const S=a=>{switch(a.type){case"point":return o(z,{...a});case"line":return o(N,{...a});case"vector":return o(V,{...a});case"ellipse":return o(G,{...a});case"polygon":return o(U,{...a})}return null};S.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettings",props:{showM2bFeatures:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."}}};const L=a=>{const m=Array((a.figures??[]).length).fill(!1),[s,l]=b.useState(m),[d,p]=b.useState(!0),w=H().get("locked-figures-section"),{figures:r,onChange:c}=a;function q(e){const t={lockedFigures:[...r||[],B(e)]};c(t),l([...s,!0])}function P(e,n){if(e===0&&(n==="back"||n==="backward")||r&&e===r.length-1&&(n==="front"||n==="forward"))return;const i=[...r||[]],u=[...s],[h]=i.splice(e,1);switch(u.splice(e,1),n){case"back":i.unshift(h),u.unshift(!0);break;case"backward":i.splice(e-1,0,h),u.splice(e-1,0,!0);break;case"forward":i.splice(e+1,0,h),u.splice(e+1,0,!0);break;case"front":i.push(h),u.push(!0);break}c({lockedFigures:i}),l(u)}function C(e){if(window.confirm("Are you sure you want to delete this figure?")){const n=r||[];c({lockedFigures:[...n.slice(0,e),...n.slice(e+1)]});const t=[...s];t.splice(e,1),l(t)}}function I(e,n){const t=r||[],i={lockedFigures:[...t.slice(0,e),{...t[e],...n},...t.slice(e+1)]};c(i)}function A(e){l(Array(r==null?void 0:r.length).fill(e))}const f=s.every(e=>!e),E=f?"Expand all":"Collapse all",M=!!(r!=null&&r.length);return y(R,{children:[o(O,{title:"Locked Figures",isOpen:d,onToggle:()=>p(!d),isCollapsible:!0}),d&&y(k,{children:[r==null?void 0:r.map((e,n)=>{if(e.type!=="function")return o(S,{showM2bFeatures:a.showM2bFeatures,expanded:s[n],onToggle:t=>{const i=[...s];i[n]=t,l(i)},...e,onChangeProps:t=>I(n,t),onMove:t=>P(n,t),onRemove:()=>C(n)},`${w}-locked-${e}-${n}`)}),y(k,{style:x.buttonContainer,children:[o(T,{showM2bFeatures:a.showM2bFeatures,id:`${w}-select`,onChange:q}),o(W,{size:g.small_12}),M&&o(_,{kind:"secondary",onClick:()=>A(f),style:x.button,children:E})]})]})]})},x=F.StyleSheet.create({buttonContainer:{flexDirection:"row",alignItems:"center"},button:{marginTop:g.xSmall_8,flexGrow:1}}),ue=L;L.__docgenInfo={description:"",methods:[],displayName:"LockedFiguresSection",props:{showM2bFeatures:{required:!0,tsType:{name:"boolean"},description:""},figures:{required:!1,tsType:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<InteractiveGraphEditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
etc.) that are locked in place and not interactive.`},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}}]}}],raw:"Partial<InteractiveGraphEditorProps>"},name:"props"}],return:{name:"void"}}},description:""}}};export{ue as L};
