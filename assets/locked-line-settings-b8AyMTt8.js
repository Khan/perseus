import{e as O}from"./util-WQRabdk_.js";import"./underscore-885MUNGo.js";import"./random-util-g9RgnkPR.js";import"./jquery-5v7aFUvu.js";import{B as Y}from"./index-dLgOY9TT.js";import{V as w}from"./index-iTGWTR8W.js";import{S as K,O as T}from"./answer-choices-OW0Rv6m2.js";import{S as y}from"./index-86cQASob.js";import{s as c,c as x}from"./index-QHkT31Yt.js";import{L as W,a as P}from"./index-OUR0CuKj.js";import{L as Z,p as G}from"./locked-figure-aria-svBzUonK.js";import{n as H}from"./no-important-xCWWYXQR.js";import{v as k}from"./index-smZ6iCr_.js";import{r as n}from"./index-6oxdNXpR.js";import{P as J}from"./trash-bold-I0m3A6dS.js";import{C as Q}from"./color-select-LHin7cg7.js";import{L as ee}from"./line-stroke-select-H-zg6bqA.js";import{L as ne}from"./line-swatch-BWyLOJkc.js";import{L as re,a as ae}from"./locked-label-settings-d8vvCwLr.js";import{L as A}from"./locked-point-settings-I3IDmDnn.js";import{g as le,j as S,a as L,b as te}from"./util-32yZQf3V.js";const F="The line cannot have length 0.",j=g=>{const{kind:q,points:d,color:b,lineStyle:f="solid",showPoint1:N,showPoint2:V,labels:r,ariaLabel:R,onChangeProps:t,onMove:X,onRemove:_}=g,[i,u]=d,E=q.charAt(0).toUpperCase()+q.slice(1),M=`${E} (${i.coord[0]},
        ${i.coord[1]}), (${u.coord[0]}, ${u.coord[1]})`,h=O(i.coord,u.coord);async function B(){const e=await S(r),a=await S(i.labels),l=await S(u.labels),m=await L(`$${i.coord[0]}$`),o=await L(`$${i.coord[1]}$`),v=await L(`$${u.coord[0]}$`),C=await L(`$${u.coord[1]}$`);let p=`${E}${e} from point${a} at ${m} comma ${o} to point${l} at ${v} comma ${C}`;const $=te(b,f);return p+=$,p}function z(e,a){const l=[...d];l[a]={...d[a],...e};const m=k.midpoint(d[0].coord,d[1].coord),o=k.midpoint(l[0].coord,l[1].coord),v=[o[0]-m[0],o[1]-m[1]],C=r==null?void 0:r.map((p,$)=>({...p,coord:[p.coord[0]+v[0],p.coord[1]+v[1]]}));t({points:l,labels:C})}function D(e){var l,m;const a=r==null?void 0:r.map(o=>({...o,color:e}));t({color:e,points:[{...i,color:e,labels:(l=i.labels)==null?void 0:l.map(o=>({...o,color:e}))},{...u,color:e,labels:(m=u.labels)==null?void 0:m.map(o=>({...o,color:e}))}],labels:a})}function I(e,a){if(!r)return;const l=[...r];l[a]={...r[a],...e},t({labels:l})}function U(e){if(!r)return;const a=r.filter((l,m)=>m!==e);t({labels:a})}return n.createElement(J,{expanded:g.expanded,onToggle:g.onToggle,header:n.createElement(w,{style:s.row},n.createElement(W,null,M),n.createElement(y,{size:c.xSmall_8}),n.createElement(ne,{color:b,lineStyle:f}))},n.createElement(P,{tag:"label",style:[s.row,s.spaceUnder]},"kind",n.createElement(y,{size:c.xxxSmall_4}),n.createElement(K,{selectedValue:q,onChange:e=>t({kind:e}),placeholder:""},n.createElement(T,{value:"line",label:"line"}),n.createElement(T,{value:"ray",label:"ray"}),n.createElement(T,{value:"segment",label:"segment"}))),n.createElement(w,{style:s.row},n.createElement(Q,{selectedValue:b,onChange:D}),n.createElement(y,{size:c.small_12}),n.createElement(ee,{selectedValue:f,onChange:e=>t({lineStyle:e})})),h&&n.createElement(P,{style:s.errorText},F),n.createElement(A,{headerLabel:"Point 1",expanded:!0,showPoint:N,error:h?F:null,...i,onTogglePoint:e=>t({showPoint1:e}),onChangeProps:e=>z(e,0)}),n.createElement(A,{headerLabel:"Point 2",expanded:!0,showPoint:V,error:h?F:null,...u,onTogglePoint:e=>t({showPoint2:e}),onChangeProps:e=>z(e,1)}),n.createElement(y,{size:c.small_12}),n.createElement(w,{style:s.horizontalRule}),n.createElement(Z,{ariaLabel:R,getPrepopulatedAriaLabel:B,onChangeProps:e=>{t(e)}}),n.createElement(y,{size:c.xxxSmall_4}),n.createElement(w,{style:s.horizontalRule}),n.createElement(y,{size:c.small_12}),n.createElement(P,null,"Visible labels"),r==null?void 0:r.map((e,a)=>n.createElement(re,{...e,key:a,expanded:!0,onChangeProps:l=>{I(l,a)},onRemove:()=>{U(a)},containerStyle:s.labelContainer})),n.createElement(Y,{kind:"tertiary",startIcon:G,onClick:()=>{const e=[0,-1],a=k.add(k.scale(e,(r==null?void 0:r.length)??0),k.midpoint(d[0].coord,d[1].coord)),l={...le("label"),coord:a,color:b};t({labels:[...r??[],l]})},style:s.addButton},"Add visible label"),n.createElement(ae,{figureType:g.type,onMove:X,onRemove:_}))},s=H.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:c.xSmall_8},errorText:{color:x.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:x.offBlack16},labelContainer:{backgroundColor:x.white}}),Pe=j;j.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    domain?: [min: number | null, max: number | null];
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number | null, max: number | null]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{Pe as L};
