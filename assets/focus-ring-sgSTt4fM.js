import{j as d}from"./jsx-runtime-FVsy8kgq.js";import{l as e}from"./index-awljIyHI.js";import{k as n}from"./constants-I_nlPaPx.js";const o=function(r){const{visible:t,color:s,children:l,multipleSelect:a}=r,i={borderColor:t?s:"transparent",borderRadius:a?5:"50%"};return d("span",{"data-testid":"focus-ring",className:e.css(c.ring),style:i,children:l})};o.defaultProps={visible:!0,color:n,multipleSelect:!1};const c=e.StyleSheet.create({ring:{margin:"auto",display:"inline-block",borderWidth:2,padding:2,borderStyle:"solid"}});o.__docgenInfo={description:"",methods:[],displayName:"FocusRing",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},visible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#71B307"',computed:!1}},multipleSelect:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};export{o as F};