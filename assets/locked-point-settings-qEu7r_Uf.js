import{a as d,j as e}from"./jsx-runtime-FVsy8kgq.js";import{V as g}from"./index-6h5t6F0w.js";import{S as f}from"./index-qUyqkRvh.js";import{s as l}from"./index-deFLJwr4.js";import{L as h}from"./index-h_CiYGGb.js";import{l as y}from"./index-awljIyHI.js";import{C as w}from"./coordinate-pair-input-23mAp7kL.js";import{P as v,L as C}from"./locked-figure-settings-actions-sNZbsX6s.js";import{C as P}from"./color-select-uCaVRa9n.js";import{C as b}from"./color-swatch-AIoBFp-Z.js";import{L}from"./labeled-switch-T61Fcoup.js";const m=n=>{const{coord:t,color:i,filled:s=!0,onChangeProps:r,onMove:p,onRemove:c}=n;function u(o){r({color:o})}return d(v,{expanded:n.expanded,onToggle:n.onToggle,header:d(g,{style:a.row,children:[e(h,{children:`Point (${t[0]}, ${t[1]})`}),e(f,{size:l.xSmall_8}),e(b,{color:i,filled:s})]}),children:[e(w,{coord:t,style:a.spaceUnder,onChange:o=>{r({coord:o})}}),e(P,{selectedValue:i,onChange:u,style:a.spaceUnder}),e(L,{label:"open point",checked:!s,onChange:o=>{r({filled:!o})}}),e(C,{figureType:n.type,onMove:p,onRemove:c})]})},a=y.StyleSheet.create({row:{flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:l.xSmall_8}}),V=m;m.__docgenInfo={description:"",methods:[],displayName:"LockedPointSettings",props:{showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedPointType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"LockedPointType"}],raw:"Partial<LockedPointType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."}}};export{V as L};