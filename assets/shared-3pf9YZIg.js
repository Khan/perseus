import{l as n}from"./index-awljIyHI.js";import{f as t}from"./constants-I_nlPaPx.js";import{m as i}from"./media-queries-MaBBbpNq.js";const{zIndexAboveScratchpad:a,zIndexInteractiveComponent:d,radioBorderColor:p,checkedColor:r,circleSize:o,radioMarginWidth:e}=t,g=n.StyleSheet.create({perseusInteractive:{zIndex:d,position:"relative"},aboveScratchpad:{position:"relative",zIndex:a},blankBackground:{backgroundColor:"#FDFDFD"},perseusSrOnly:{border:0,clip:"rect(0,0,0,0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1},responsiveLabel:{[i.smOrSmaller]:{fontSize:14,lineHeight:1.3},[i.md]:{fontSize:17,lineHeight:1.4},[i.lgOrLarger]:{fontSize:20,lineHeight:1.4}},responsiveInput:{display:"inline-block",WebkitAppearance:"none",appearance:"none","::-ms-check":{display:"none"},backgroundColor:"#fff",border:"2px solid #fff",boxShadow:`0 0px 0px 1px ${p}`,outline:"none",boxSizing:"border-box",flexShrink:0,marginBottom:1,marginLeft:1,marginRight:1,marginTop:1,height:o-2,width:o-2},responsiveRadioInput:{borderRadius:"50%",":checked":{backgroundColor:r,border:"none",borderRadius:"50%",boxShadow:`inset 0px 0px 0px 2px white, 0 0px 0px 2px ${r}`,marginTop:e,marginBottom:e,marginLeft:e,marginRight:e,height:o-2*e,width:o-2*e}},responsiveRadioInputActive:{backgroundColor:"#fff",border:"2px solid #fff",borderRadius:"50%",boxShadow:`0 0px 0px 2px ${r}`,marginTop:e,marginBottom:e,marginLeft:e,marginRight:e,height:o-2*e,width:o-2*e,":checked":{backgroundColor:"#fff"}},disableTextSelection:{userSelect:"none"}});export{g as s};