import{a as p,j as o,F as b}from"./jsx-runtime-FVsy8kgq.js";import{B as D}from"./choice-E4eyMygy.js";import{V as w}from"./index-6h5t6F0w.js";import{S as u}from"./index-qUyqkRvh.js";import{s,c as P}from"./index-deFLJwr4.js";import{L as I,a as M}from"./index-h_CiYGGb.js";import{L as U,p as E}from"./locked-figure-aria-8YYYONye.js";import{l as W}from"./index-awljIyHI.js";import{P as N,C as G,L as H,a as J}from"./locked-label-settings-e8q9axzS.js";import{C as K}from"./color-select-PoqNTQ6j.js";import{C as Q,g as X}from"./util-POrnmQZS.js";import{L as _}from"./labeled-switch-Z3WFbRVk.js";const q=L=>{var k,S,T;const{flags:r,headerLabel:A,coord:i,color:g,filled:C=!0,labels:n,ariaLabel:B,onChangeProps:d,onMove:v,onRemove:h,showPoint:f,expanded:R,onTogglePoint:x,onToggle:z}=L,c=!v&&!h;function F(){let e=`Point at (${i[0]}, ${i[1]})`;return n&&n.length>0&&(e+=" with label",n.length>1&&(e+="s"),e+=` ${n.map(t=>t.text).join(", ")}`),e}function O(e){const t={color:e};n&&(t.labels=n.map(l=>({...l,color:e}))),d(t)}function $(e){const t=e[0]-i[0],l=e[1]-i[1],m={coord:e};n&&(m.labels=n.map(y=>({...y,coord:[y.coord[0]+t,y.coord[1]+l]}))),d(m)}function V(e,t){if(!n)return;const l=[...n];l[t]={...n[t],...e},d({labels:l})}function j(e){if(!n)return;const t=n.filter((l,m)=>m!==e);d({labels:t})}return p(N,{expanded:R,onToggle:z,containerStyle:c?a.definingContainer:void 0,panelStyle:c?a.definingPanel:void 0,header:p(w,{style:a.row,children:[o(I,{children:`${A||"Point"} (${i[0]}, ${i[1]})`}),o(u,{size:s.xSmall_8}),o(Q,{color:g,filled:C})]}),children:[o(G,{coord:i,style:a.spaceUnder,onChange:$}),x&&o(_,{label:"show point on graph",checked:!!f,style:f&&a.spaceUnder,onChange:x}),(!c||f)&&p(b,{children:[o(K,{selectedValue:g,onChange:O,style:a.spaceUnder}),o(_,{label:"open point",checked:!C,onChange:e=>{d({filled:!e})}})]}),!c&&((k=r==null?void 0:r.mafs)==null?void 0:k["locked-figures-aria"])&&p(b,{children:[o(u,{size:s.small_12}),o(w,{style:a.horizontalRule}),o(U,{ariaLabel:B,prePopulatedAriaLabel:F(),onChangeProps:e=>{d(e)}})]}),(!c&&((S=r==null?void 0:r.mafs)==null?void 0:S["locked-point-labels"])||c&&((T=r==null?void 0:r.mafs)==null?void 0:T["locked-line-labels"]))&&p(b,{children:[o(u,{size:s.xxxSmall_4}),o(w,{style:a.horizontalRule}),o(u,{size:s.small_12}),o(M,{children:"Visible labels"}),n==null?void 0:n.map((e,t)=>o(H,{...e,containerStyle:!c&&a.lockedPointLabelContainer,expanded:!0,onChangeProps:l=>{V(l,t)},onRemove:()=>{j(t)}})),o(D,{kind:"tertiary",startIcon:E,onClick:()=>{const e={...X("label"),coord:[i[0]+.5,i[1]-1*((n==null?void 0:n.length)??0)],color:g};d({labels:[...n??[],e]})},style:a.addButton,children:"Add visible label"})]}),h&&o(J,{figureType:L.type,onMove:v,onRemove:h})]})},a=W.StyleSheet.create({definingContainer:{marginTop:s.xSmall_8,marginBottom:0,marginLeft:-s.xxxSmall_4,marginRight:-s.xxxSmall_4,backgroundColor:P.white},definingPanel:{paddingBottom:s.xxSmall_6},lockedPointLabelContainer:{backgroundColor:P.white},row:{flexDirection:"row",alignItems:"center"},spaceUnder:{marginBottom:s.xSmall_8},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:P.offBlack16}}),ce=q;q.__docgenInfo={description:"",methods:[],displayName:"LockedPointSettings",props:{flags:{required:!1,tsType:{name:'APIOptions["flags"]',raw:'APIOptions["flags"]'},description:"Optional flags to determine which features are enabled."},headerLabel:{required:!1,tsType:{name:"string"},description:`Optional label for the point to display in the header summary.
Defaults to "Point".`},showPoint:{required:!1,tsType:{name:"boolean"},description:"Whether the extra point settings are toggled open."},error:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"Optional error message to display."},onTogglePoint:{required:!1,tsType:{name:"signature",type:"function",raw:"(newValue) => void",signature:{arguments:[{name:"newValue"}],return:{name:"void"}}},description:"Called when the extra settings toggle switch is changed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedPointType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"LockedPointType"}],raw:"Partial<LockedPointType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coords, color, etc.) are updated."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when the point is moved."},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the point is removed."}}};export{ce as L};