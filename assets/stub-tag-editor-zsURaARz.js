import{j as t}from"./jsx-runtime-63Ea5SlK.js";import{P as e}from"./index-IiwcBdIZ.js";import{r as i}from"./index-6oxdNXpR.js";import{T as a}from"./text-list-editor-K49FGdd7.js";const o=[],s=class s extends i.Component{render(){return t.jsxs("div",{children:[this.props.showTitle&&t.jsx("div",{style:{fontSize:14},children:"Tags:"}),t.jsx(a,{options:this.props.value||o,layout:"vertical",onChange:this.props.onChange})]})}};s.propTypes={value:e.arrayOf(e.string),onChange:e.func.isRequired,showTitle:e.bool.isRequired},s.defaultProps={value:o,showTitle:!0};let r=s;r.__docgenInfo={description:`Stub Tag Editor.

This is stupidly used by Perseus Zero because I didn't implement
the <TagEditor> for Perseus Zero (since everyone wants me to
delete it anyways).

This is a small wrapper for a TextListEditor that allows us to
edit raw Tag ID strings in perseus zero (please don't use this).

It also gives a nicer interface for the group metadata editor
in local demo mode.`,methods:[],displayName:"StubTagEditor",props:{value:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"string"}},required:!1},showTitle:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},onChange:{description:"",type:{name:"func"},required:!0}}};export{r as S};
