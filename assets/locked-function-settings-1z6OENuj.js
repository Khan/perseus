import{a as o,j as n}from"./jsx-runtime-FVsy8kgq.js";import{V as m}from"./index-6h5t6F0w.js";import{S as M,O as L}from"./answer-choices-Qj96H4Dg.js";import{T as y}from"./index-aLQwBKgs.js";import{S as l}from"./index-qUyqkRvh.js";import{s as i}from"./index-deFLJwr4.js";import{L as I,a as F}from"./index-h_CiYGGb.js";import{l as _}from"./index-awljIyHI.js";import{r as T}from"./index-TT1qJ6UJ.js";import{P as E,L as z}from"./locked-figure-settings-actions-aUZ7hr2y.js";import{C as D}from"./color-select-4qB9IkZ1.js";import{L as A}from"./line-stroke-select-6E7BaPin.js";import{L as W}from"./line-swatch-VH2xMppx.js";const C=d=>{const{color:f,strokeStyle:x,equation:g,directionalAxis:h,domain:a,onChangeProps:w,onMove:k,onRemove:q}=d,P=`Function (${h==="x"?"y=":"x="}${g})`,[p,S]=T.useState([a&&a[0]!==-1/0?a[0].toString():"",a&&a[1]!==1/0?a[1].toString():""]);T.useEffect(()=>{S([a&&a[0]!==-1/0?a[0].toString():"",a&&a[1]!==1/0?a[1].toString():""])},[a]);function c(e,r){const s={};s[e]=r,w(s)}function b(e,r){const s=[...p];s[e]=r,S(s);const v=a?[...a]:[-1/0,1/0];let u=parseFloat(r);r===""&&e===0?u=-1/0:r===""&&e===1&&(u=1/0),v[e]=u,w({domain:v})}return o(E,{expanded:d.expanded,onToggle:d.onToggle,header:o(m,{style:t.row,children:[n(I,{style:t.accordionHeader,children:P}),n(l,{size:i.xSmall_8}),n(W,{color:f,lineStyle:x})]}),children:[o(m,{style:[t.row,t.spaceUnder],children:[n(D,{selectedValue:f,onChange:e=>{c("color",e)}}),n(l,{size:i.small_12}),n(A,{selectedValue:x,onChange:e=>{c("strokeStyle",e)}})]}),o(m,{style:[t.row,t.rowSpace],children:[o(M,{selectedValue:h,onChange:e=>{c("directionalAxis",e)},"aria-label":"equation prefix",style:t.equationPrefix,placeholder:"",children:[n(L,{value:"x",label:"y ="}),n(L,{value:"y",label:"x ="})]}),n(l,{size:i.xSmall_8}),n(y,{type:"text","aria-label":"equation",value:g,onChange:e=>{c("equation",e)},style:[t.textField]})]}),o(m,{style:[t.row,t.rowSpace],children:[o(F,{tag:"label",style:t.domainMin,children:["domain min",n(l,{size:i.xxSmall_6}),n(y,{type:"number",style:t.domainMinField,value:p[0],onChange:e=>{b(0,e)}})]}),n(l,{size:i.medium_16}),o(F,{tag:"label","aria-label":"domain max",style:t.domainMax,children:["max",n(l,{size:i.xxSmall_6}),n(y,{type:"number",style:t.domainMaxField,value:p[1],onChange:e=>{b(1,e)}})]})]}),n(z,{figureType:d.type,onMove:k,onRemove:q})]})},t=_.StyleSheet.create({accordionHeader:{textOverflow:"ellipsis",maxWidth:"calc(100% - 64px)",overflow:"hidden",whiteSpace:"nowrap"},equationPrefix:{minWidth:"auto"},domainMin:{alignItems:"center",display:"flex",width:"calc(((100% - 141px) / 2) + 88.7px)",textWrap:"nowrap"},domainMinField:{width:"calc(100% - 88.7px)"},domainMax:{alignItems:"center",display:"flex",width:"calc(((100% - 141px) / 2) + 36.2px)"},domainMaxField:{width:"calc(100% - 36.2px)"},rowSpace:{marginTop:i.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{flexGrow:"1"}}),Y=C;C.__docgenInfo={description:"",methods:[],displayName:"LockedFunctionSettings",props:{showM2bFeatures:{required:!1,tsType:{name:"boolean"},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFunctionType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"LockedFunctionType"}],raw:"Partial<LockedFunctionType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{Y as L};