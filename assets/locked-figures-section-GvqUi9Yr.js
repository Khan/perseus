import{j as o,a as m,F as R}from"./jsx-runtime-FVsy8kgq.js";import{B as _}from"./choice-j6w4LtFN.js";import{V as y,u as D}from"./index-6h5t6F0w.js";import{S as W}from"./index-qUyqkRvh.js";import{s as h,c as H}from"./index-deFLJwr4.js";import{l as L}from"./index-awljIyHI.js";import{r as b}from"./index-TT1qJ6UJ.js";import{H as O}from"./heading-8aCiuWUg.js";import{a as $,b as M}from"./answer-choices-9e2HoFrw.js";import{L as B}from"./locked-ellipse-settings-QJqGSqmv.js";import{L as N}from"./locked-function-settings-5p0RRy9e.js";import{L as j}from"./locked-label-settings-bvsxzVas.js";import{L as z}from"./locked-line-settings-VStZ7IHp.js";import{L as U}from"./locked-point-settings-Bj1oMNdD.js";import{L as V}from"./locked-polygon-settings-6L5de7og.js";import{L as J}from"./locked-vector-settings-Gmj5levq.js";import{g as K}from"./util-BMMFrB0U.js";const x=r=>{const{id:g,onChange:s}=r,l=["point","line","vector","ellipse","polygon","function"];return r.showLabelsFlag&&l.push("label"),o(y,{style:w.container,children:o($,{menuText:"Add locked figure",style:w.addElementSelect,children:l.map(d=>o(M,{label:d,onClick:()=>s(d)},`${g}-${d}`))})})},w=L.StyleSheet.create({container:{marginTop:h.xSmall_8},addElementSelect:{backgroundColor:H.fadedBlue8,borderRadius:h.xxxSmall_4}});x.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSelect",props:{showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};const F=r=>{switch(r.type){case"point":return o(U,{...r});case"line":return o(z,{...r});case"vector":return o(J,{...r});case"ellipse":return o(B,{...r});case"polygon":return o(V,{...r});case"function":return o(N,{...r});case"label":if(r.showLabelsFlag)return o(j,{...r});break}return null};F.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettings",props:{showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."}}};const S=r=>{const g=Array((r.figures??[]).length).fill(!1),[s,l]=b.useState(g),[d,T]=b.useState(!0),f=D().get("locked-figures-section"),{figures:t,onChange:p}=r;function q(e){const a={lockedFigures:[...t||[],K(e)]};p(a),l([...s,!0])}function P(e,n){if(e===0&&(n==="back"||n==="backward")||t&&e===t.length-1&&(n==="front"||n==="forward"))return;const i=[...t||[]],u=[...s],[c]=i.splice(e,1);switch(u.splice(e,1),n){case"back":i.unshift(c),u.unshift(!0);break;case"backward":i.splice(e-1,0,c),u.splice(e-1,0,!0);break;case"forward":i.splice(e+1,0,c),u.splice(e+1,0,!0);break;case"front":i.push(c),u.push(!0);break}p({lockedFigures:i}),l(u)}function A(e){if(window.confirm("Are you sure you want to delete this figure?")){const n=t||[];p({lockedFigures:[...n.slice(0,e),...n.slice(e+1)]});const a=[...s];a.splice(e,1),l(a)}}function C(e,n){const a=t||[],i={lockedFigures:[...a.slice(0,e),{...a[e],...n},...a.slice(e+1)]};p(i)}function I(e){l(Array(t==null?void 0:t.length).fill(e))}const k=s.every(e=>!e),E=k?"Expand all":"Collapse all",G=!!(t!=null&&t.length);return m(R,{children:[o(O,{title:"Locked Figures",isOpen:d,onToggle:()=>T(!d),isCollapsible:!0}),d&&m(y,{children:[t==null?void 0:t.map((e,n)=>o(F,{showLabelsFlag:r.showLabelsFlag,expanded:s[n],onToggle:a=>{const i=[...s];i[n]=a,l(i)},...e,onChangeProps:a=>C(n,a),onMove:a=>P(n,a),onRemove:()=>A(n)},`${f}-locked-${e}-${n}`)),m(y,{style:v.buttonContainer,children:[o(x,{showLabelsFlag:r.showLabelsFlag,id:`${f}-select`,onChange:q}),o(W,{size:h.small_12}),G&&o(_,{kind:"secondary",onClick:()=>I(k),style:v.button,children:E})]})]})]})},v=L.StyleSheet.create({buttonContainer:{flexDirection:"row",alignItems:"center"},button:{marginTop:h.xSmall_8,flexGrow:1}}),he=S;S.__docgenInfo={description:"",methods:[],displayName:"LockedFiguresSection",props:{showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},figures:{required:!1,tsType:{name:"Array",elements:[{name:"LockedFigure"}],raw:"Array<LockedFigure>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<InteractiveGraphEditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
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
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<InteractiveGraphEditorProps>"},name:"props"}],return:{name:"void"}}},description:""}}};export{he as L};
