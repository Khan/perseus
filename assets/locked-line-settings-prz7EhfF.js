import{a as g,j as o,F as q}from"./jsx-runtime-FVsy8kgq.js";import"./util-XR-uqOh-.js";import{e as Z}from"./svg-image-h96M64n1.js";import{B as G}from"./choice-Yxd0I4UE.js";import{V as w}from"./index-6h5t6F0w.js";import{S as H,O as x}from"./answer-choices-MX0vy2-k.js";import{S as b}from"./index-qUyqkRvh.js";import{s as h,c as C}from"./index-deFLJwr4.js";import{L as J,a as T}from"./index-h_CiYGGb.js";import{L as Q,p as X}from"./locked-figure-aria-ByNSJgw5.js";import{l as Y}from"./index-awljIyHI.js";import{v as f}from"./index-IIMKO4_x.js";import{P as ee,L as oe,a as ne}from"./locked-label-settings-b-63f_H3.js";import{C as te}from"./color-select-vQ-VRkdQ.js";import{L as ae}from"./line-stroke-select-beb5pxzH.js";import{L as re}from"./line-swatch-b16FOmaU.js";import{L as V}from"./locked-point-settings-yzpG7MRB.js";import{g as ie,a as le,b as se}from"./util-Tz779vJj.js";const $="The line cannot have length 0.",M=L=>{var A,_;const{flags:p,kind:v,points:u,color:y,lineStyle:P="solid",showPoint1:R,showPoint2:j,labels:n,ariaLabel:B,onChangeProps:l,onMove:I,onRemove:D}=L,[r,i]=u,F=v.charAt(0).toUpperCase()+v.slice(1),O=`${F} (${r.coord[0]},
        ${r.coord[1]}), (${i.coord[0]}, ${i.coord[1]})`,k=Z(r.coord,i.coord);async function U(){let e="",a="",t="";n&&n.length>0&&(e+=` ${n.map(m=>m.text).join(", ")}`),r.labels&&r.labels.length>0&&(a+=` ${r.labels.map(m=>m.text).join(", ")}`),i.labels&&i.labels.length>0&&(t+=` ${i.labels.map(m=>m.text).join(", ")}`);let s=await le(`${F}${e} from point${a} at (${r.coord[0]}, ${r.coord[1]}) to point${t} at (${i.coord[0]}, ${i.coord[1]})`);const d=se(y,P);return s+=d,s}function z(e,a){const t=[...u];t[a]={...u[a],...e};const s=f.midpoint(u[0].coord,u[1].coord),d=f.midpoint(t[0].coord,t[1].coord),m=[d[0]-s[0],d[1]-s[1]],W=n==null?void 0:n.map((S,de)=>({...S,coord:[S.coord[0]+m[0],S.coord[1]+m[1]]}));l({points:t,labels:W})}function E(e){var t,s;const a=n==null?void 0:n.map(d=>({...d,color:e}));l({color:e,points:[{...r,color:e,labels:(t=r.labels)==null?void 0:t.map(d=>({...d,color:e}))},{...i,color:e,labels:(s=i.labels)==null?void 0:s.map(d=>({...d,color:e}))}],labels:a})}function K(e,a){if(!n)return;const t=[...n];t[a]={...n[a],...e},l({labels:t})}function N(e){if(!n)return;const a=n.filter((t,s)=>s!==e);l({labels:a})}return g(ee,{expanded:L.expanded,onToggle:L.onToggle,header:g(w,{style:c.row,children:[o(J,{children:O}),o(b,{size:h.xSmall_8}),o(re,{color:y,lineStyle:P})]}),children:[g(T,{tag:"label",style:[c.row,c.spaceUnder],children:["kind",o(b,{size:h.xxxSmall_4}),g(H,{selectedValue:v,onChange:e=>l({kind:e}),placeholder:"",children:[o(x,{value:"line",label:"line"}),o(x,{value:"ray",label:"ray"}),o(x,{value:"segment",label:"segment"})]})]}),g(w,{style:c.row,children:[o(te,{selectedValue:y,onChange:E}),o(b,{size:h.small_12}),o(ae,{selectedValue:P,onChange:e=>l({lineStyle:e})})]}),k&&o(T,{style:c.errorText,children:$}),o(V,{flags:p,headerLabel:"Point 1",expanded:!0,showPoint:R,error:k?$:null,...r,onTogglePoint:e=>l({showPoint1:e}),onChangeProps:e=>z(e,0)}),o(V,{flags:p,headerLabel:"Point 2",expanded:!0,showPoint:j,error:k?$:null,...i,onTogglePoint:e=>l({showPoint2:e}),onChangeProps:e=>z(e,1)}),((A=p==null?void 0:p.mafs)==null?void 0:A["locked-figures-aria"])&&g(q,{children:[o(b,{size:h.small_12}),o(w,{style:c.horizontalRule}),o(Q,{ariaLabel:B,getPrepopulatedAriaLabel:U,onChangeProps:e=>{l(e)}})]}),((_=p==null?void 0:p.mafs)==null?void 0:_["locked-line-labels"])&&g(q,{children:[o(b,{size:h.xxxSmall_4}),o(w,{style:c.horizontalRule}),o(b,{size:h.small_12}),o(T,{children:"Visible labels"}),n==null?void 0:n.map((e,a)=>o(oe,{...e,expanded:!0,onChangeProps:t=>{K(t,a)},onRemove:()=>{N(a)},containerStyle:c.labelContainer})),o(G,{kind:"tertiary",startIcon:X,onClick:()=>{const e=[0,-1],a=f.add(f.scale(e,(n==null?void 0:n.length)??0),f.midpoint(u[0].coord,u[1].coord)),t={...ie("label"),coord:a,color:y};l({labels:[...n??[],t]})},style:c.addButton,children:"Add visible label"})]}),o(ne,{figureType:L.type,onMove:I,onRemove:D})]})},c=Y.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:h.xSmall_8},errorText:{color:C.red},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:C.offBlack16},labelContainer:{backgroundColor:C.white}}),$e=M;M.__docgenInfo={description:"",methods:[],displayName:"LockedLineSettings",props:{flags:{required:!1,tsType:{name:'APIOptions["flags"]',raw:'APIOptions["flags"]'},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFigure>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"LockedFigure"}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{$e as L};