import{j as n}from"./jsx-runtime-63Ea5SlK.js";import{r as U}from"./index-6oxdNXpR.js";import"./util-_iDv4tVD.js";import{e as K}from"./svg-image-wIdVOlIq.js";import{B as W}from"./index-69t9pbsh.js";import{V as v}from"./index-CgfdZoMj.js";import{S as Z,O as x}from"./answer-choices-0E6R-XMj.js";import{S as c}from"./index-C1N8lBvx.js";import{s as p,c as h}from"./index-dmcq622U.js";import{L as G,c as C}from"./index-6ID5EQ9c.js";import{L as H,p as J}from"./locked-figure-aria-t0nH29fN.js";import{l as Q}from"./index-awljIyHI.js";import{v as k}from"./index-smZ6iCr_.js";import{P as Y,L as ee,a as ne}from"./locked-label-settings-JSMIZtWP.js";import{C as re}from"./color-select-8MUbPEyp.js";import{L as ae}from"./line-stroke-select-K8tsOvC1.js";import{L as le}from"./line-swatch-AxsY8NWM.js";import{L as A}from"./locked-point-settings-Iy2Qmbj7.js";import{g as oe,j as T,a as te}from"./util-uNwD09sQ.js";const j="The line cannot have length 0.",N=g=>{var P;const{flags:y,kind:w,points:d,color:b,lineStyle:L="solid",showPoint1:$,showPoint2:R,labels:r,ariaLabel:V,onChangeProps:o,onMove:_,onRemove:X}=g,[u,s]=d,S=w.charAt(0).toUpperCase()+w.slice(1),M=`${S} (${u.coord[0]},
        ${u.coord[1]}), (${s.coord[0]}, ${s.coord[1]})`,q=K(u.coord,s.coord);async function B(){const e=await T(r),a=await T(u.labels),l=await T(s.labels);let t=`${S}${e} from point${a} at ${u.coord[0]} comma ${u.coord[1]} to point${l} at ${s.coord[0]} comma ${s.coord[1]}`;const i=te(b,L);return t+=i,t}function F(e,a){const l=[...d];l[a]={...d[a],...e};const t=k.midpoint(d[0].coord,d[1].coord),i=k.midpoint(l[0].coord,l[1].coord),z=[i[0]-t[0],i[1]-t[1]],O=r==null?void 0:r.map((f,ie)=>({...f,coord:[f.coord[0]+z[0],f.coord[1]+z[1]]}));o({points:l,labels:O})}function E(e){var l,t;const a=r==null?void 0:r.map(i=>({...i,color:e}));o({color:e,points:[{...u,color:e,labels:(l=u.labels)==null?void 0:l.map(i=>({...i,color:e}))},{...s,color:e,labels:(t=s.labels)==null?void 0:t.map(i=>({...i,color:e}))}],labels:a})}function I(e,a){if(!r)return;const l=[...r];l[a]={...r[a],...e},o({labels:l})}function D(e){if(!r)return;const a=r.filter((l,t)=>t!==e);o({labels:a})}return n.jsxs(Y,{expanded:g.expanded,onToggle:g.onToggle,header:n.jsxs(v,{style:m.row,children:[n.jsx(G,{children:M}),n.jsx(c,{size:p.xSmall_8}),n.jsx(le,{color:b,lineStyle:L})]}),children:[n.jsxs(C,{tag:"label",style:[m.row,m.spaceUnder],children:["kind",n.jsx(c,{size:p.xxxSmall_4}),n.jsxs(Z,{selectedValue:w,onChange:e=>o({kind:e}),placeholder:"",children:[n.jsx(x,{value:"line",label:"line"}),n.jsx(x,{value:"ray",label:"ray"}),n.jsx(x,{value:"segment",label:"segment"})]})]}),n.jsxs(v,{style:m.row,children:[n.jsx(re,{selectedValue:b,onChange:E}),n.jsx(c,{size:p.small_12}),n.jsx(ae,{selectedValue:L,onChange:e=>o({lineStyle:e})})]}),q&&n.jsx(C,{style:m.errorText,children:j}),n.jsx(A,{flags:y,headerLabel:"Point 1",expanded:!0,showPoint:$,error:q?j:null,...u,onTogglePoint:e=>o({showPoint1:e}),onChangeProps:e=>F(e,0)}),n.jsx(A,{flags:y,headerLabel:"Point 2",expanded:!0,showPoint:R,error:q?j:null,...s,onTogglePoint:e=>o({showPoint2:e}),onChangeProps:e=>F(e,1)}),n.jsx(c,{size:p.small_12}),n.jsx(v,{style:m.horizontalRule}),n.jsx(H,{ariaLabel:V,getPrepopulatedAriaLabel:B,onChangeProps:e=>{o(e)}}),((P=y==null?void 0:y.mafs)==null?void 0:P["locked-line-labels"])&&n.jsxs(n.Fragment,{children:[n.jsx(c,{size:p.xxxSmall_4}),n.jsx(v,{style:m.horizontalRule}),n.jsx(c,{size:p.small_12}),n.jsx(C,{children:"Visible labels"}),r==null?void 0:r.map((e,a)=>U.createElement(ee,{...e,key:a,expanded:!0,onChangeProps:l=>{I(l,a)},onRemove:()=>{D(a)},containerStyle:m.labelContainer})),n.jsx(W,{kind:"tertiary",startIcon:J,onClick:()=>{const e=[0,-1],a=k.add(k.scale(e,(r==null?void 0:r.length)??0),k.midpoint(d[0].coord,d[1].coord)),l={...oe("label"),coord:a,color:b};o({labels:[...r??[],l]})},style:m.addButton,children:"Add visible label"})]}),n.jsx(ne,{figureType:g.type,onMove:_,onRemove:X})]})},m=Q.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:p.xSmall_8},errorText:{color:h.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:h.offBlack16},labelContainer:{backgroundColor:h.white}}),je=N;N.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{je as L};
