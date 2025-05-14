var l=Object.defineProperty;var p=(s,e,t)=>e in s?l(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var o=(s,e,t)=>(p(s,typeof e!="symbol"?e+"":e,t),t);import{j as a}from"./jsx-runtime-BT65X5dW.js";import{P as r}from"./index-CrGd2QqM.js";import{r as d}from"./index-C6mWTJJr.js";import{T as u}from"./text-list-editor-C2gddtxS.js";const n=[];class i extends d.Component{render(){return a.jsxs("div",{children:[this.props.showTitle&&a.jsx("div",{style:{fontSize:14},children:"Tags:"}),a.jsx(u,{options:this.props.value||n,layout:"vertical",onChange:this.props.onChange})]})}}o(i,"propTypes",{value:r.arrayOf(r.string),onChange:r.func.isRequired,showTitle:r.bool.isRequired}),o(i,"defaultProps",{value:n,showTitle:!0});i.__docgenInfo={description:`Stub Tag Editor.

This is stupidly used by Perseus Zero because I didn't implement
the <TagEditor> for Perseus Zero (since everyone wants me to
delete it anyways).

This is a small wrapper for a TextListEditor that allows us to
edit raw Tag ID strings in perseus zero (please don't use this).

It also gives a nicer interface for the group metadata editor
in local demo mode.`,methods:[],displayName:"StubTagEditor",props:{value:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},showTitle:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},onChange:{description:"",type:{name:"func"},required:!0}}};export{i as S};
