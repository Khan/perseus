import{j as d}from"./jsx-runtime-FVsy8kgq.js";import{l}from"./article-renderer-ub6lGcPc.js";import"./jquery-yG1GhClm.js";import"./util-F8-MDmsT.js";import"./phet-simulation-9PbE2pxN.js";import"./version-akiLXZts.js";import"./dependencies-d8cZibFS.js";import"./perseus-api-Nq3s7IMx.js";import"./multi-renderer-la0A-h33.js";import"./hints-renderer-eYcfi__L.js";import"./renderer-JG1Z7r2S.js";import"./base-radio-SM-baXgO.js";import"./button-group-nsoLlHtM.js";import"./graph-2fIs0C28.js";import"./svg-image-4Vh9uTQ6.js";import"./hud-4BOtaFc1.js";import"./icon-R5gZamfG.js";import"./index-K9BSJPWl.js";import"./inline-icon-NjJlm7d0.js";import"./math-input-JZMGF6RZ.js";import"./multi-button-group-atHe8dYZ.js";import"./number-input-AfYHd3vF.js";import"./range-input-gZ_c3T2F.js";import"./text-input-15gEhfDF.js";import"./text-list-editor-Jz35fIN1.js";import"./index-k-0mNqHS.js";import"./i18n-context-P5sgPFep.js";import"./index-IIMKO4_x.js";import{V as m}from"./index-6h5t6F0w.js";import{c as p,s as n}from"./index-deFLJwr4.js";import{l as u}from"./index-awljIyHI.js";import{w as s}from"./index-J2t_5nK1.js";const c=e=>{const{color:o,filled:i=!0,decorative:r=!1}=e;return d(m,{"aria-label":r?void 0:`${o}, ${i?"filled":"open"}`,style:[f.colorSwatch,{border:`4px solid ${l[o]}`,backgroundColor:i?l[o]:p.white}]})},f=u.StyleSheet.create({colorSwatch:{outline:`2px solid ${p.offWhite}`,borderRadius:"50%",width:n.large_24,height:n.large_24}}),J=c;c.__docgenInfo={description:"",methods:[],displayName:"ColorSwatch",props:{color:{required:!0,tsType:{name:"LockedFigureColor"},description:""},filled:{required:!1,tsType:{name:"boolean"},description:""},decorative:{required:!1,tsType:{name:"boolean"},description:""}}};const t="grayH";function a(e){switch(e){case"point":return{type:"point",coord:[0,0],color:t,filled:!0};case"line":return{type:"line",kind:"line",points:[a("point"),{...a("point"),coord:[2,2]}],color:t,lineStyle:"solid",showPoint1:!1,showPoint2:!1};case"vector":return{type:"vector",points:[[0,0],[2,2]],color:t};case"ellipse":return{type:"ellipse",center:[0,0],radius:[1,1],angle:0,color:t,fillStyle:"none",strokeStyle:"solid"};case"polygon":return{type:"polygon",points:[[0,2],[-1,0],[1,0]],color:t,showVertices:!1,fillStyle:"none",strokeStyle:"solid"};case"function":return{type:"function",color:t,strokeStyle:"solid",equation:"x^2",directionalAxis:"x"};case"label":return{type:"label",coord:[0,0],text:"",color:t,size:"medium"};default:throw new s(e)}}function K(e,o="solid",i){const r=e==="grayH"?"gray":e;switch(i){case"none":return`. Appearance ${o} ${r} border, with no fill.`;case"white":return`. Appearance ${o} ${r} border, with a white fill.`;case"solid":case"translucent":return`. Appearance ${o} ${r} border, with a ${i} ${r} fill.`;case void 0:return`. Appearance ${o} ${r}.`;default:throw new s(i)}}export{J as C,K as a,a as g};