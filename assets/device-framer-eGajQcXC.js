import{j as r}from"./jsx-runtime-FVsy8kgq.js";import{r as s}from"./index-TT1qJ6UJ.js";import{p as d,l}from"./constants-p_UgHLsb.js";const e={phone:{width:320,height:480,framedWidth:320},tablet:{width:750,height:920,framedWidth:525},desktop:{width:688,height:600,framedWidth:688}},m=({children:o,deviceType:t="phone",nochrome:h})=>{const i=s.useMemo(()=>e[t].framedWidth/e[t].width,[t]),a=s.useMemo(()=>({backgroundColor:"white",overflow:"scroll",color:"black",textAlign:"left",width:e[t].width,height:e[t].height,border:"solid 1px #CCC",margin:8,zoom:i}),[t,i]);return h?r("div",{style:{overflow:"scroll",width:e[t].framedWidth+2*d+l},children:r("div",{children:o})},"screen"):r("div",{className:"screen",style:{...a,textAlign:"start"},children:o},"screen")};m.__docgenInfo={description:"",methods:[],displayName:"DeviceFramer",props:{deviceType:{defaultValue:{value:'"phone"',computed:!1},required:!1}}};export{m as D};