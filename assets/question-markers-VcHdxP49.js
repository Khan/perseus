import{j as a}from"./jsx-runtime-63Ea5SlK.js";import{r as c}from"./index-6oxdNXpR.js";import{b as y}from"./article-renderer-mU-6RWLp.js";import"./jquery-yG1GhClm.js";import{U as g}from"./util-AYeX86gl.js";import"./phet-simulation-_7qOO4_B.js";import"./version-akiLXZts.js";import{g as h}from"./dependencies-CP7Uh8Kq.js";import"./perseus-api-1-ethIrW.js";import"./perseus-item-CWRjfKXr.js";import"./hints-renderer-alc4yvsU.js";import"./renderer-1DxKQj1_.js";import"./base-radio-9_hKye4B.js";import"./button-group-G5CZaedn.js";import"./graph-QfZUzUyx.js";import"./svg-image-7aOK05RI.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-BIPwuHvF.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-ILg8RrvB.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-ogh82yD8.js";import"./range-input-w5Z3sPK5.js";import"./text-input-5e4vF1bl.js";import"./text-list-editor-aj1SAzcA.js";import"./index-k-0mNqHS.js";import"./i18n-context-fsWEgybQ.js";import"./index-smZ6iCr_.js";import{l as i}from"./index-awljIyHI.js";import{a as k,b}from"./global-colors-VIVU4Od4.js";import{M as f}from"./marker-qF2kRuTF.js";class R extends c.Component{constructor(){super(...arguments),this._markers=[],this.handleImageDoubleClick=r=>{r.preventDefault();const e=r.currentTarget.getBoundingClientRect(),n=Math.round((r.clientX-e.left)/e.width*1e3)/10,l=Math.round((r.clientY-e.top)/e.height*1e3)/10,{markers:t,onChange:o}=this.props;o([...t,{answers:[],label:"",x:n,y:l}])}}openDropdownForMarkerIndices(r){r.forEach(e=>{var n;this._markers[e]&&((n=this._markers[e])==null||n.openDropdown())})}render(){const{choices:r,imageUrl:e,imageWidth:n,imageHeight:l,markers:t,onChange:o}=this.props,u=h().staticUrl;return a.jsxs("div",{children:[a.jsx("div",{className:i.css(m.title),children:"Markers"}),a.jsx("div",{className:i.css(m.subtitle),children:e?a.jsxs("span",{children:["Double-click on the image to add a marker.",a.jsx("br",{}),a.jsx("br",{}),"Markers are read by screen readers in the order that you add them here, so add in a logical order for the learner (e.g. sequentially, clockwise). You can test order by using keyboard tabbing."]}):"Upload an image to place markers."}),e&&a.jsxs("div",{className:i.css(m.markersCanvas),style:{maxWidth:n,maxHeight:l},children:[a.jsx("img",{alt:"",className:i.css(m.image),src:u(g.getRealImageUrl(e)),onDoubleClick:this.handleImageDoubleClick}),t.map((p,s)=>c.createElement(f,{...p,choices:r,key:`${p.x}.${p.y}`,onChange:d=>o([...t.slice(0,s),d,...t.slice(s+1)]),onRemove:()=>o([...t.slice(0,s),...t.slice(s+1)]),ref:d=>this._markers[s]=d}))]})]})}}const m=i.StyleSheet.create({title:{...y,marginBottom:6,color:k},subtitle:{fontFamily:"inherit",fontSize:12,lineHeight:"14px",marginBottom:12,color:b},markersCanvas:{position:"relative",border:"solid 1px rgba(33, 36, 44, 0.16)"},image:{display:"block",maxWidth:"100%"}});R.__docgenInfo={description:"",methods:[{name:"openDropdownForMarkerIndices",docblock:null,modifiers:[],params:[{name:"indices",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",alias:"ReadonlyArray"}}],returns:null},{name:"handleImageDoubleClick",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactMouseEvent",raw:"React.MouseEvent",alias:"React.MouseEvent"}}],returns:null}],displayName:"QuestionMarkers",props:{choices:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},imageUrl:{required:!0,tsType:{name:"string"},description:""},imageWidth:{required:!0,tsType:{name:"number"},description:""},imageHeight:{required:!0,tsType:{name:"number"},description:""},markers:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The list of correct answers expected for the marker.
    answers: ReadonlyArray<string>;
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}}],raw:"ReadonlyArray<MarkerType>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(markers: ReadonlyArray<MarkerType>) => void",signature:{arguments:[{type:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The list of correct answers expected for the marker.
    answers: ReadonlyArray<string>;
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}}],raw:"ReadonlyArray<MarkerType>"},name:"markers"}],return:{name:"void"}}},description:""}}};export{R as Q};