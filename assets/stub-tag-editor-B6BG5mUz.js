import{P as e}from"./index-CrGd2QqM.js";import{r as t}from"./index-C6mWTJJr.js";import{T as o}from"./text-list-editor-Rb8EP659.js";const a=[],s=class s extends t.Component{render(){return t.createElement("div",null,this.props.showTitle&&t.createElement("div",{style:{fontSize:14}},"Tags:"),t.createElement(o,{options:this.props.value||a,layout:"vertical",onChange:this.props.onChange}))}};s.propTypes={value:e.arrayOf(e.string),onChange:e.func.isRequired,showTitle:e.bool.isRequired},s.defaultProps={value:a,showTitle:!0};let r=s;r.__docgenInfo={description:`Stub Tag Editor.

This is stupidly used by Perseus Zero because I didn't implement
the <TagEditor> for Perseus Zero (since everyone wants me to
delete it anyways).

This is a small wrapper for a TextListEditor that allows us to
edit raw Tag ID strings in perseus zero (please don't use this).

It also gives a nicer interface for the group metadata editor
in local demo mode.`,methods:[],displayName:"StubTagEditor",props:{value:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},showTitle:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},onChange:{description:"",type:{name:"func"},required:!0}}};export{r as S};
