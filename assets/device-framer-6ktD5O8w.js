import{j as o}from"./jsx-runtime-FVsy8kgq.js";import"./article-renderer-4y7LcYNV.js";import"./jquery-yG1GhClm.js";import"./util-YrNvlCNO.js";import"./phet-simulation-4u5-UljK.js";import"./version-akiLXZts.js";import"./dependencies-8XILypbq.js";import"./perseus-api-mOiZT07d.js";import"./multi-renderer-TkkEhTow.js";import"./hints-renderer-sA0Ao_qa.js";import"./renderer-hPmI_Chp.js";import"./base-radio-TdBv-OLd.js";import"./button-group-nsoLlHtM.js";import"./graph-myhk4Jua.js";import"./svg-image-RL9NlJEY.js";import"./hud-FI3E3dT_.js";import"./icon-YuYiVxsK.js";import"./index-K9BSJPWl.js";import"./inline-icon-tKY1iMkH.js";import"./math-input-b6JdL4xR.js";import"./multi-button-group-a0iIfrwx.js";import"./number-input-ZhezuDVT.js";import"./range-input-kzyKWO0E.js";import"./text-input-15gEhfDF.js";import"./text-list-editor-pe7AGDAl.js";import{p as h,l as a}from"./constants-hQyjCzwz.js";import"./index-k-0mNqHS.js";import"./i18n-context-hxuRe8oU.js";import"./index-IIMKO4_x.js";import{r as m}from"./index-TT1qJ6UJ.js";const r={phone:{width:320,height:480,framedWidth:320},tablet:{width:750,height:920,framedWidth:525},desktop:{width:688,height:600,framedWidth:688}},d=({children:i,deviceType:t="phone",nochrome:p})=>{const e=m.useMemo(()=>r[t].framedWidth/r[t].width,[t]),s=m.useMemo(()=>({backgroundColor:"white",overflow:"scroll",color:"black",textAlign:"left",width:r[t].width,height:r[t].height,border:"solid 1px #CCC",margin:8,zoom:e}),[t,e]);return p?o("div",{style:{overflow:"scroll",width:r[t].framedWidth+2*h+a},children:o("div",{children:i})},"screen"):o("div",{className:"screen",style:{...s,textAlign:"start"},children:i},"screen")};d.__docgenInfo={description:"",methods:[],displayName:"DeviceFramer",props:{deviceType:{defaultValue:{value:'"phone"',computed:!1},required:!1}}};export{d as D};