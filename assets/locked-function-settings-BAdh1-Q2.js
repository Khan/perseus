import{a as r,j as a,F as B}from"./jsx-runtime-FVsy8kgq.js";import{B as Z}from"./choice-XJA1Q6b6.js";import{V as u}from"./index-6h5t6F0w.js";import{S as E,O as F}from"./answer-choices-6-H_Lo1M.js";import{T as P}from"./index-QCAhLhLD.js";import{P as R,L as ee,a as ae,I as $}from"./locked-label-settings-SUT5FiPP.js";import{S as c}from"./index-qUyqkRvh.js";import{s,c as h}from"./index-deFLJwr4.js";import{L as D,a as C}from"./index-h_CiYGGb.js";import{L as ne,p as oe}from"./locked-figure-aria-EuoXHerS.js";import{l as I}from"./index-awljIyHI.js";import{r as L}from"./index-TT1qJ6UJ.js";import{C as te}from"./color-select-7RnOW2LO.js";import{L as ie}from"./line-stroke-select-m-v1WSmZ.js";import{L as le}from"./line-swatch-zv_HkwP2.js";import{g as re,j as se,a as ce}from"./util-cvu8Tq8n.js";const de=""+new URL("copy-oXFFmXIn.svg",import.meta.url).href,pe=""+new URL("note-pencil-qql72tMF.svg",import.meta.url).href,j={linear:["x + 5","1/2x - 2"],polynomial:["1/2x^2 + 3x - 4","(1/3)x^3 - 2x^2 + 3x - 4"],trigonometric:["sin(x) * 3","arctan(2x) + 4"]},O=x=>{var _,A;const{flags:d,color:p,strokeStyle:g,equation:y,directionalAxis:f,domain:t,labels:i,ariaLabel:W,onChangeProps:m,onMove:H,onRemove:V}=x,T=f==="x"?"y=":"x=",G=`Function (${T}${y})`,[v,q]=L.useState([t&&t[0]!==-1/0?t[0].toString():"",t&&t[1]!==1/0?t[1].toString():""]),[b,N]=L.useState("");L.useEffect(()=>{q([t&&t[0]!==-1/0?t[0].toString():"",t&&t[1]!==1/0?t[1].toString():""])},[t]);async function U(){let o=`Function${await se(i)} with equation ${T}${y}`;t&&!(t[0]===-1/0&&t[1]===1/0)&&(o+=`, domain from ${t[0]} to ${t[1]}`);const l=ce(p,g);return o+=l,o}function w(e,o){const l={};l[e]=o,m(l)}function z(e,o){const l=[...v];l[e]=o,q(l);const S=t?[...t]:[-1/0,1/0];let k=parseFloat(o);o===""&&e===0?k=-1/0:o===""&&e===1&&(k=1/0),S[e]=k,m({domain:S})}const X=Object.keys(j),M=b!=="",Y=M?j[b]:["Select category to see example equations"];function J(e){const o={color:e};o.labels=i==null?void 0:i.map(l=>({...l,color:e})),m(o)}function K(e,o){if(!i)return;const l=[...i];l[o]={...i[o],...e},m({labels:l})}function Q(e){if(!i)return;const o=i.filter((l,S)=>S!==e);m({labels:o})}return r(R,{expanded:x.expanded,onToggle:x.onToggle,header:r(u,{style:n.row,children:[a(D,{style:n.accordionHeader,children:G}),a(c,{size:s.xSmall_8}),a(le,{color:p,lineStyle:g})]}),children:[r(u,{style:[n.row,n.spaceUnder],children:[a(te,{selectedValue:p,onChange:J}),a(c,{size:s.small_12}),a(ie,{selectedValue:g,onChange:e=>{w("strokeStyle",e)}})]}),r(u,{style:[n.row,n.rowSpace],children:[r(E,{selectedValue:f,onChange:e=>{w("directionalAxis",e)},"aria-label":"equation prefix",style:[n.dropdownLabel,n.axisMenu],placeholder:"",children:[a(F,{value:"x",label:"y ="}),a(F,{value:"y",label:"x ="})]}),a(c,{size:s.xSmall_8}),a(P,{type:"text","aria-label":"equation",value:y,onChange:e=>{w("equation",e)},style:[n.textField]})]}),r(u,{style:[n.row,n.rowSpace],children:[r(C,{tag:"label",style:[n.dropdownLabel,n.domainMin],children:["domain min",a(c,{size:s.xxSmall_6}),a(P,{type:"number",style:n.domainMinField,value:v[0],onChange:e=>{z(0,e)}})]}),a(c,{size:s.medium_16}),r(C,{tag:"label","aria-label":"domain max",style:[n.dropdownLabel,n.domainMax],children:["max",a(c,{size:s.xxSmall_6}),a(P,{type:"number",style:n.domainMaxField,value:v[1],onChange:e=>{z(1,e)}})]})]}),r(R,{header:a(D,{children:"Example Functions"}),expanded:!1,containerStyle:n.exampleWorkspace,panelStyle:n.exampleAccordionPanel,children:[r(C,{tag:"label",style:n.dropdownLabel,children:["Choose a category",a(c,{size:s.xxSmall_6}),a(E,{selectedValue:b,onChange:N,placeholder:"examples",children:X.map(e=>a(F,{value:e,label:e},e))})]}),M&&a("ul",{className:I.css(n.exampleContainer),children:Y.map((e,o)=>a(me,{category:b,example:e,index:o,pasteEquationFn:w},o))})]}),((_=d==null?void 0:d.mafs)==null?void 0:_["locked-figures-aria"])&&r(B,{children:[a(c,{size:s.small_12}),a(u,{style:n.horizontalRule}),a(ne,{ariaLabel:W,getPrepopulatedAriaLabel:U,onChangeProps:e=>{m(e)}})]}),((A=d==null?void 0:d.mafs)==null?void 0:A["locked-function-labels"])&&r(B,{children:[a(c,{size:s.xxxSmall_4}),a(u,{style:n.horizontalRule}),a(c,{size:s.small_12}),a(C,{children:"Visible labels"}),i==null?void 0:i.map((e,o)=>a(ee,{...e,expanded:!0,onChangeProps:l=>{K(l,o)},onRemove:()=>{Q(o)},containerStyle:n.labelContainer},o)),a(Z,{kind:"tertiary",startIcon:oe,onClick:()=>{const e={...re("label"),coord:[0,-((i==null?void 0:i.length)??0)],color:p};m({labels:[...i??[],e]})},style:n.addButton,children:"Add visible label"})]}),a(ae,{figureType:x.type,onMove:H,onRemove:V})]})},me=x=>{const{category:d,example:p,index:g,pasteEquationFn:y}=x,f=L.useId();return r("li",{className:I.css(n.exampleRow),children:[a($,{icon:pe,"aria-label":"paste example","aria-describedby":f,onClick:()=>y("equation",p),size:"medium",style:n.copyPasteButton}),a($,{icon:de,"aria-label":"copy example","aria-describedby":f,onClick:()=>navigator.clipboard.writeText(p),size:"medium",style:n.copyPasteButton}),a(c,{size:s.xxxSmall_4}),a(u,{style:n.exampleContent,id:f,children:p})]},`${d}-${g}`)},n=I.StyleSheet.create({accordionHeader:{textOverflow:"ellipsis",maxWidth:"calc(100% - 64px)",overflow:"hidden",whiteSpace:"nowrap"},axisMenu:{minWidth:"auto"},copyPasteButton:{flexShrink:"0",margin:"0 2px"},domainMin:{justifyContent:"space-between",width:"calc(((100% - 141px) / 2) + 88.7px)",textWrap:"nowrap"},domainMinField:{width:"calc(100% - 88.7px)"},domainMax:{width:"calc(((100% - 141px) / 2) + 36.2px)"},domainMaxField:{width:"calc(100% - 36.2px)"},dropdownLabel:{alignItems:"center",display:"flex"},exampleAccordionPanel:{alignItems:"start",paddingBottom:"12px",flexDirection:"row",flexWrap:"wrap"},exampleContainer:{background:"white",border:`1px solid ${h.fadedOffBlack16}`,borderRadius:"4px",flexGrow:"1",listStyleType:"none",maxHeight:"88px",margin:"8px 0 0 0",overflowY:"scroll",padding:"4px 12px 4px 4px"},exampleContent:{fontFamily:'"Lato", sans-serif',flexGrow:"1",color:h.offBlack},exampleRow:{alignItems:"center",display:"flex",flexDirection:"row",minHeight:"44px"},exampleWorkspace:{background:h.white50},rowSpace:{marginTop:s.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{flexGrow:"1"},addButton:{alignSelf:"start"},horizontalRule:{height:1,backgroundColor:h.offBlack16},labelContainer:{backgroundColor:h.white}}),Te=O;O.__docgenInfo={description:"",methods:[],displayName:"LockedFunctionSettings",props:{flags:{required:!1,tsType:{name:'APIOptions["flags"]',raw:'APIOptions["flags"]'},description:""},showLabelsFlag:{required:!1,tsType:{name:"boolean"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:"Called when a movement button (top, up, down, bottom) is pressed."},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFunctionType>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"LockedFunctionType"}],raw:"Partial<LockedFunctionType>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (points, color, etc.) are updated."}}};export{Te as L};