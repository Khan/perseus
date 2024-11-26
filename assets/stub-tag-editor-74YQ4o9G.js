import{a as o,j as r}from"./jsx-runtime-FVsy8kgq.js";import{P as e}from"./index-0C4KXdeC.js";import{r as i}from"./index-TT1qJ6UJ.js";import{T as n}from"./text-list-editor-Jz35fIN1.js";const a=[],s=class s extends i.Component{render(){return o("div",{children:[this.props.showTitle&&r("div",{style:{fontSize:14},children:"Tags:"}),r(n,{options:this.props.value||a,layout:"vertical",onChange:this.props.onChange})]})}};s.propTypes={value:e.arrayOf(e.string),onChange:e.func.isRequired,showTitle:e.bool.isRequired},s.defaultProps={value:a,showTitle:!0};let t=s;t.__docgenInfo={description:`Stub Tag Editor.

This is stupidly used by Perseus Zero because I didn't implement
the <TagEditor> for Perseus Zero (since everyone wants me to
delete it anyways).

This is a small wrapper for a TextListEditor that allows us to
edit raw Tag ID strings in perseus zero (please don't use this).

It also gives a nicer interface for the group metadata editor
in local demo mode.`,methods:[],displayName:"StubTagEditor",props:{value:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},showTitle:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},onChange:{description:"",type:{name:"func"},required:!0}}};export{t as S};
