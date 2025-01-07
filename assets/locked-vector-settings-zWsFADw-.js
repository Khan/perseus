import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{r as X}from"./index-6oxdNXpR.js";import"./util-_iDv4tVD.js";import{e as B}from"./svg-image-wIdVOlIq.js";import{B as E}from"./index-69t9pbsh.js";import{V as d}from"./index-CgfdZoMj.js";import{S as y}from"./index-C1N8lBvx.js";import{s as i,c as k}from"./index-dmcq622U.js";import{L as w,c as C}from"./index-6ID5EQ9c.js";import{L as I,p as D}from"./locked-figure-aria-t0nH29fN.js";import{l as O}from"./index-awljIyHI.js";import{v as m}from"./index-smZ6iCr_.js";import{P as L,C as T,L as U,a as W}from"./locked-label-settings-JSMIZtWP.js";import{C as G}from"./color-select-8MUbPEyp.js";import{L as H}from"./line-swatch-AxsY8NWM.js";import{g as J,j as K,a as Q}from"./util-uNwD09sQ.js";const Y="The vector cannot have length 0.",j=c=>{var x;const{flags:g,points:q,color:p,labels:n,ariaLabel:F,onChangeProps:s,onMove:S,onRemove:P}=c,[o,u]=q,z=`Vector (${o[0]}, ${o[1]}), (${u[0]}, ${u[1]})`,v=B(o,u);async function A(){let a=`Vector${await K(n)} from ${o[0]} comma ${o[1]} to ${u[0]} comma ${u[1]}`;const l=Q(p);return a+=l,a}function f(r,a){if(typeof r<"u"){const l=[...q];l[a]=[...r];const b=m.midpoint(o,u),V=m.midpoint(l[0],l[1]),_=m.sub(V,b),M=n==null?void 0:n.map(h=>({...h,coord:m.add(h.coord,_)}));s({points:l,labels:M})}}function N(r){const a={color:r};a.labels=n==null?void 0:n.map(l=>({...l,color:r})),s(a)}function $(r,a){if(!n)return;const l=[...n];l[a]={...n[a],...r},s({labels:l})}function R(r){if(!n)return;const a=n.filter((l,b)=>b!==r);s({labels:a})}return e.jsxs(L,{expanded:c.expanded,onToggle:c.onToggle,header:e.jsxs(d,{style:t.row,children:[e.jsx(w,{children:z}),e.jsx(y,{size:i.xSmall_8}),e.jsx(H,{color:p,lineStyle:"solid"})]}),children:[e.jsx(d,{style:[t.row,t.spaceUnder],children:e.jsx(G,{selectedValue:p,onChange:N})}),v&&e.jsx(C,{style:t.errorText,children:Y}),e.jsx(L,{expanded:!0,containerStyle:t.container,panelStyle:t.accordionPanel,header:e.jsx(d,{style:t.row,children:e.jsx(w,{children:`Tail (${o[0]}, ${o[1]})`})}),children:e.jsx(T,{coord:o,error:v,onChange:r=>{f(r,0)}})}),e.jsx(L,{expanded:!0,containerStyle:t.container,panelStyle:t.accordionPanel,header:e.jsx(d,{style:t.row,children:e.jsx(w,{children:`Tip (${u[0]}, ${u[1]})`})}),children:e.jsx(T,{coord:u,error:v,onChange:r=>{f(r,1)}})}),e.jsx(y,{size:i.small_12}),e.jsx(d,{style:t.horizontalRule}),e.jsx(I,{ariaLabel:F,getPrepopulatedAriaLabel:A,onChangeProps:r=>{s(r)}}),((x=g==null?void 0:g.mafs)==null?void 0:x["locked-vector-labels"])&&e.jsxs(e.Fragment,{children:[e.jsx(y,{size:i.xxxSmall_4}),e.jsx(d,{style:t.horizontalRule}),e.jsx(y,{size:i.small_12}),e.jsx(C,{children:"Visible labels"}),n==null?void 0:n.map((r,a)=>X.createElement(U,{...r,key:a,expanded:!0,onChangeProps:l=>{$(l,a)},onRemove:()=>{R(a)},containerStyle:t.labelContainer})),e.jsx(E,{kind:"tertiary",startIcon:D,onClick:()=>{const r=[0,-1],a=m.add(m.scale(r,(n==null?void 0:n.length)??0),m.midpoint(o,u)),l={...J("label"),coord:a,color:p};s({labels:[...n??[],l]})},style:t.addButton,children:"Add visible label"})]}),e.jsx(W,{figureType:c.type,onMove:S,onRemove:P})]})},t=O.StyleSheet.create({accordionPanel:{paddingBottom:i.medium_16},container:{marginTop:i.xSmall_8,marginBottom:0,marginLeft:-i.xxxSmall_4,marginRight:-i.xxxSmall_4,backgroundColor:k.white},errorText:{color:k.red,marginTop:i.xSmall_8},row:{flexDirection:"row",alignItems:"center"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:k.offBlack16},labelContainer:{backgroundColor:k.white}}),ke=j;j.__docgenInfo={description:"",methods:[],displayName:"LockedVectorSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"vector"'},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},flags:{required:!1,tsType:{name:'Readonly["flags"]',raw:'APIOptions["flags"]'},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFigure>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{ke as L};
