import{j as r}from"./jsx-runtime-63Ea5SlK.js";import"./util-AYeX86gl.js";import{e as K}from"./svg-image-FcZanvM1.js";import{B as W}from"./choice-Xr-SKHrB.js";import{V as v}from"./index-0DbkllkJ.js";import{S as Z,O as h}from"./answer-choices-BvCuCrDd.js";import{S as y}from"./index-nqMmpXbO.js";import{s as c,c as x}from"./index-deFLJwr4.js";import{L as G,a as C}from"./index-18qWGOW7.js";import{L as H,p as J}from"./locked-figure-aria-G5ecBSuw.js";import{l as Q}from"./index-awljIyHI.js";import{v as b}from"./index-smZ6iCr_.js";import{P as Y,L as ee,a as re}from"./locked-label-settings-sHo8DjC4.js";import{C as ne}from"./color-select-JWbIjxmk.js";import{L as ae}from"./line-stroke-select-OgLwffrZ.js";import{L as le}from"./line-swatch-wstb9auL.js";import{L as N}from"./locked-point-settings-yOnHJo2I.js";import{g as te,j as T,a as oe}from"./util-uQZZCXuL.js";const j="The line cannot have length 0.",$=g=>{var P,z;const{flags:d,kind:w,points:p,color:k,lineStyle:L="solid",showPoint1:R,showPoint2:V,labels:n,ariaLabel:_,onChangeProps:t,onMove:X,onRemove:I}=g,[u,s]=p,F=w.charAt(0).toUpperCase()+w.slice(1),M=`${F} (${u.coord[0]},
        ${u.coord[1]}), (${s.coord[0]}, ${s.coord[1]})`,q=K(u.coord,s.coord);async function B(){const e=await T(n),l=await T(u.labels),a=await T(s.labels);let o=`${F}${e} from point${l} at (${u.coord[0]}, ${u.coord[1]}) to point${a} at (${s.coord[0]}, ${s.coord[1]})`;const i=oe(k,L);return o+=i,o}function S(e,l){const a=[...p];a[l]={...p[l],...e};const o=b.midpoint(p[0].coord,p[1].coord),i=b.midpoint(a[0].coord,a[1].coord),A=[i[0]-o[0],i[1]-o[1]],U=n==null?void 0:n.map((f,ie)=>({...f,coord:[f.coord[0]+A[0],f.coord[1]+A[1]]}));t({points:a,labels:U})}function E(e){var a,o;const l=n==null?void 0:n.map(i=>({...i,color:e}));t({color:e,points:[{...u,color:e,labels:(a=u.labels)==null?void 0:a.map(i=>({...i,color:e}))},{...s,color:e,labels:(o=s.labels)==null?void 0:o.map(i=>({...i,color:e}))}],labels:l})}function D(e,l){if(!n)return;const a=[...n];a[l]={...n[l],...e},t({labels:a})}function O(e){if(!n)return;const l=n.filter((a,o)=>o!==e);t({labels:l})}return r.jsxs(Y,{expanded:g.expanded,onToggle:g.onToggle,header:r.jsxs(v,{style:m.row,children:[r.jsx(G,{children:M}),r.jsx(y,{size:c.xSmall_8}),r.jsx(le,{color:k,lineStyle:L})]}),children:[r.jsxs(C,{tag:"label",style:[m.row,m.spaceUnder],children:["kind",r.jsx(y,{size:c.xxxSmall_4}),r.jsxs(Z,{selectedValue:w,onChange:e=>t({kind:e}),placeholder:"",children:[r.jsx(h,{value:"line",label:"line"}),r.jsx(h,{value:"ray",label:"ray"}),r.jsx(h,{value:"segment",label:"segment"})]})]}),r.jsxs(v,{style:m.row,children:[r.jsx(ne,{selectedValue:k,onChange:E}),r.jsx(y,{size:c.small_12}),r.jsx(ae,{selectedValue:L,onChange:e=>t({lineStyle:e})})]}),q&&r.jsx(C,{style:m.errorText,children:j}),r.jsx(N,{flags:d,headerLabel:"Point 1",expanded:!0,showPoint:R,error:q?j:null,...u,onTogglePoint:e=>t({showPoint1:e}),onChangeProps:e=>S(e,0)}),r.jsx(N,{flags:d,headerLabel:"Point 2",expanded:!0,showPoint:V,error:q?j:null,...s,onTogglePoint:e=>t({showPoint2:e}),onChangeProps:e=>S(e,1)}),((P=d==null?void 0:d.mafs)==null?void 0:P["locked-figures-aria"])&&r.jsxs(r.Fragment,{children:[r.jsx(y,{size:c.small_12}),r.jsx(v,{style:m.horizontalRule}),r.jsx(H,{ariaLabel:_,getPrepopulatedAriaLabel:B,onChangeProps:e=>{t(e)}})]}),((z=d==null?void 0:d.mafs)==null?void 0:z["locked-line-labels"])&&r.jsxs(r.Fragment,{children:[r.jsx(y,{size:c.xxxSmall_4}),r.jsx(v,{style:m.horizontalRule}),r.jsx(y,{size:c.small_12}),r.jsx(C,{children:"Visible labels"}),n==null?void 0:n.map((e,l)=>r.jsx(ee,{...e,expanded:!0,onChangeProps:a=>{D(a,l)},onRemove:()=>{O(l)},containerStyle:m.labelContainer})),r.jsx(W,{kind:"tertiary",startIcon:J,onClick:()=>{const e=[0,-1],l=b.add(b.scale(e,(n==null?void 0:n.length)??0),b.midpoint(p[0].coord,p[1].coord)),a={...te("label"),coord:l,color:k};t({labels:[...n??[],a]})},style:m.addButton,children:"Add visible label"})]}),r.jsx(re,{figureType:g.type,onMove:X,onRemove:I})]})},m=Q.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:c.xSmall_8},errorText:{color:x.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:x.offBlack16},labelContainer:{backgroundColor:x.white}}),Te=$;$.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},flags:{required:!1,tsType:{name:'Readonly["flags"]',raw:'APIOptions["flags"]'},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"Interval",required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{Te as L};
