import{a as f,j as e,F as T}from"./jsx-runtime-FVsy8kgq.js";import"./util-F8-MDmsT.js";import{e as O}from"./svg-image-4Vh9uTQ6.js";import{B as N}from"./choice-I73s7vIV.js";import{V as m}from"./index-6h5t6F0w.js";import{S as b}from"./index-qUyqkRvh.js";import{s,c as y}from"./index-deFLJwr4.js";import{L as w,a as $}from"./index-h_CiYGGb.js";import{L as U,p as W}from"./locked-figure-aria-cizi6QSj.js";import{l as G}from"./index-awljIyHI.js";import{v as d}from"./index-IIMKO4_x.js";import{P as v,C as F,L as H,a as J}from"./locked-label-settings-7eVXvZDY.js";import{C as K}from"./color-select-Ou1zrjGq.js";import{L as Q}from"./line-swatch-EI3Byz66.js";import{g as X,a as Y}from"./util-a_JWUtR1.js";const Z="The vector cannot have length 0.",_=g=>{var S,k;const{flags:c,points:x,color:h,labels:n,ariaLabel:A,onChangeProps:p,onMove:V,onRemove:q}=g,[i,l]=x,R=`Vector (${i[0]}, ${i[1]}), (${l[0]}, ${l[1]})`,L=O(i,l);function z(){let o="";n&&n.length>0&&(o+=` ${n.map(u=>u.text).join(", ")}`);let r=`Vector${o} from (${i[0]}, ${i[1]}) to (${l[0]}, ${l[1]})`;const t=Y(h);return r+=t,r}function C(o,r){if(typeof o<"u"){const t=[...x];t[r]=[...o];const u=d.midpoint(i,l),j=d.midpoint(t[0],t[1]),D=d.sub(j,u),E=n==null?void 0:n.map(P=>({...P,coord:d.add(P.coord,D)}));p({points:t,labels:E})}}function B(o){const r={color:o};r.labels=n==null?void 0:n.map(t=>({...t,color:o})),p(r)}function M(o,r){if(!n)return;const t=[...n];t[r]={...n[r],...o},p({labels:t})}function I(o){if(!n)return;const r=n.filter((t,u)=>u!==o);p({labels:r})}return f(v,{expanded:g.expanded,onToggle:g.onToggle,header:f(m,{style:a.row,children:[e(w,{children:R}),e(b,{size:s.xSmall_8}),e(Q,{color:h,lineStyle:"solid"})]}),children:[e(m,{style:[a.row,a.spaceUnder],children:e(K,{selectedValue:h,onChange:B})}),L&&e($,{style:a.errorText,children:Z}),e(v,{expanded:!0,containerStyle:a.container,panelStyle:a.accordionPanel,header:e(m,{style:a.row,children:e(w,{children:`Tail (${i[0]}, ${i[1]})`})}),children:e(F,{coord:i,error:L,onChange:o=>{C(o,0)}})}),e(v,{expanded:!0,containerStyle:a.container,panelStyle:a.accordionPanel,header:e(m,{style:a.row,children:e(w,{children:`Tip (${l[0]}, ${l[1]})`})}),children:e(F,{coord:l,error:L,onChange:o=>{C(o,1)}})}),((S=c==null?void 0:c.mafs)==null?void 0:S["locked-figures-aria"])&&f(T,{children:[e(b,{size:s.small_12}),e(m,{style:a.horizontalRule}),e(U,{ariaLabel:A,prePopulatedAriaLabel:z(),onChangeProps:o=>{p(o)}})]}),((k=c==null?void 0:c.mafs)==null?void 0:k["locked-vector-labels"])&&f(T,{children:[e(b,{size:s.xxxSmall_4}),e(m,{style:a.horizontalRule}),e(b,{size:s.small_12}),e($,{children:"Visible labels"}),n==null?void 0:n.map((o,r)=>e(H,{...o,expanded:!0,onChangeProps:t=>{M(t,r)},onRemove:()=>{I(r)},containerStyle:a.labelContainer})),e(N,{kind:"tertiary",startIcon:W,onClick:()=>{const o=[0,-1],r=d.add(d.scale(o,(n==null?void 0:n.length)??0),d.midpoint(i,l)),t={...X("label"),coord:r,color:h};p({labels:[...n??[],t]})},style:a.addButton,children:"Add visible label"})]}),e(J,{figureType:g.type,onMove:V,onRemove:q})]})},a=G.StyleSheet.create({accordionPanel:{paddingBottom:s.medium_16},container:{marginTop:s.xSmall_8,marginBottom:0,marginLeft:-s.xxxSmall_4,marginRight:-s.xxxSmall_4,backgroundColor:y.white},errorText:{color:y.red,marginTop:s.xSmall_8},row:{flexDirection:"row",alignItems:"center"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:y.offBlack16},labelContainer:{backgroundColor:y.white}}),he=_;_.__docgenInfo={description:"",methods:[],displayName:"LockedVectorSettings",props:{flags:{required:!1,tsType:{name:'APIOptions["flags"]',raw:'APIOptions["flags"]'},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFigure>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"LockedFigure"}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{he as L};