import{j as n}from"./jsx-runtime-63Ea5SlK.js";import{r as O}from"./index-6oxdNXpR.js";import"./util-Deofanvy.js";import{e as Y}from"./svg-image-Ah59ySlS.js";import"./index-default-4_ZsnO94.js";import"./index-VBBZE5E5.js";import"./jquery-5v7aFUvu.js";import{B as K}from"./index-sN6aPTh8.js";import{V as w}from"./index-Cj1jPHW9.js";import{S as W,O as C}from"./answer-choices-MAOKOSuW.js";import{S as y}from"./index-GucNpBmh.js";import{s as p,c as T}from"./index-dmcq622U.js";import{L as Z,a as P}from"./index-SAZ92ybN.js";import{L as G,p as H}from"./locked-figure-aria-YcQhin1w.js";import{l as J}from"./index-awljIyHI.js";import{v as k}from"./index-smZ6iCr_.js";import{P as Q}from"./trash-bold-Er4Wp4s-.js";import{C as ee}from"./color-select-TxURnyCN.js";import{L as ne}from"./line-stroke-select-R-pGwW3n.js";import{L as re}from"./line-swatch-4JfoE1Sr.js";import{L as ae,a as le}from"./locked-label-settings-ffdjxACt.js";import{L as A}from"./locked-point-settings-5n-UQkoZ.js";import{g as oe,j as S,a as L,b as te}from"./util-aYfIQMja.js";const j="The line cannot have length 0.",N=g=>{const{kind:q,points:d,color:b,lineStyle:f="solid",showPoint1:R,showPoint2:V,labels:r,ariaLabel:X,onChangeProps:o,onMove:_,onRemove:M}=g,[i,u]=d,F=q.charAt(0).toUpperCase()+q.slice(1),B=`${F} (${i.coord[0]},
        ${i.coord[1]}), (${u.coord[0]}, ${u.coord[1]})`,h=Y(i.coord,u.coord);async function E(){const e=await S(r),a=await S(i.labels),l=await S(u.labels),s=await L(`$${i.coord[0]}$`),t=await L(`$${i.coord[1]}$`),v=await L(`$${u.coord[0]}$`),x=await L(`$${u.coord[1]}$`);let c=`${F}${e} from point${a} at ${s} comma ${t} to point${l} at ${v} comma ${x}`;const $=te(b,f);return c+=$,c}function z(e,a){const l=[...d];l[a]={...d[a],...e};const s=k.midpoint(d[0].coord,d[1].coord),t=k.midpoint(l[0].coord,l[1].coord),v=[t[0]-s[0],t[1]-s[1]],x=r==null?void 0:r.map((c,$)=>({...c,coord:[c.coord[0]+v[0],c.coord[1]+v[1]]}));o({points:l,labels:x})}function D(e){var l,s;const a=r==null?void 0:r.map(t=>({...t,color:e}));o({color:e,points:[{...i,color:e,labels:(l=i.labels)==null?void 0:l.map(t=>({...t,color:e}))},{...u,color:e,labels:(s=u.labels)==null?void 0:s.map(t=>({...t,color:e}))}],labels:a})}function I(e,a){if(!r)return;const l=[...r];l[a]={...r[a],...e},o({labels:l})}function U(e){if(!r)return;const a=r.filter((l,s)=>s!==e);o({labels:a})}return n.jsxs(Q,{expanded:g.expanded,onToggle:g.onToggle,header:n.jsxs(w,{style:m.row,children:[n.jsx(Z,{children:B}),n.jsx(y,{size:p.xSmall_8}),n.jsx(re,{color:b,lineStyle:f})]}),children:[n.jsxs(P,{tag:"label",style:[m.row,m.spaceUnder],children:["kind",n.jsx(y,{size:p.xxxSmall_4}),n.jsxs(W,{selectedValue:q,onChange:e=>o({kind:e}),placeholder:"",children:[n.jsx(C,{value:"line",label:"line"}),n.jsx(C,{value:"ray",label:"ray"}),n.jsx(C,{value:"segment",label:"segment"})]})]}),n.jsxs(w,{style:m.row,children:[n.jsx(ee,{selectedValue:b,onChange:D}),n.jsx(y,{size:p.small_12}),n.jsx(ne,{selectedValue:f,onChange:e=>o({lineStyle:e})})]}),h&&n.jsx(P,{style:m.errorText,children:j}),n.jsx(A,{headerLabel:"Point 1",expanded:!0,showPoint:R,error:h?j:null,...i,onTogglePoint:e=>o({showPoint1:e}),onChangeProps:e=>z(e,0)}),n.jsx(A,{headerLabel:"Point 2",expanded:!0,showPoint:V,error:h?j:null,...u,onTogglePoint:e=>o({showPoint2:e}),onChangeProps:e=>z(e,1)}),n.jsx(y,{size:p.small_12}),n.jsx(w,{style:m.horizontalRule}),n.jsx(G,{ariaLabel:X,getPrepopulatedAriaLabel:E,onChangeProps:e=>{o(e)}}),n.jsx(y,{size:p.xxxSmall_4}),n.jsx(w,{style:m.horizontalRule}),n.jsx(y,{size:p.small_12}),n.jsx(P,{children:"Visible labels"}),r==null?void 0:r.map((e,a)=>O.createElement(ae,{...e,key:a,expanded:!0,onChangeProps:l=>{I(l,a)},onRemove:()=>{U(a)},containerStyle:m.labelContainer})),n.jsx(K,{kind:"tertiary",startIcon:H,onClick:()=>{const e=[0,-1],a=k.add(k.scale(e,(r==null?void 0:r.length)??0),k.midpoint(d[0].coord,d[1].coord)),l={...oe("label"),coord:a,color:b};o({labels:[...r??[],l]})},style:m.addButton,children:"Add visible label"}),n.jsx(le,{figureType:g.type,onMove:_,onRemove:M})]})},m=J.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:p.xSmall_8},errorText:{color:T.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:T.offBlack16},labelContainer:{backgroundColor:T.white}}),Fe=N;N.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{Fe as L};
