import{j as t,a as s}from"./jsx-runtime-FVsy8kgq.js";import"./article-renderer-y3FyHVLE.js";import{_ as i}from"./jquery-yG1GhClm.js";import{P as d,E as c}from"./util-XcxTwqb0.js";import"./phet-simulation-OmyjCAdl.js";import"./version-akiLXZts.js";import"./dependencies-8XILypbq.js";import{A as u}from"./perseus-api--FMzJRa0.js";import"./multi-renderer-0XDv8ANK.js";import"./hints-renderer-phUSAwlE.js";import"./renderer-Bc3o6rku.js";import"./base-radio-uSTZJxUR.js";import{c as g}from"./components-QATbWbgm.js";import{I as v}from"./icon-paths-AuJwhOz7.js";import"./index-0C4KXdeC.js";import"./i18n-context-W41LcU6B.js";import"./svg-image-Rjw-_QTV.js";import{r as w}from"./index-TT1qJ6UJ.js";import{D as R}from"./device-framer-70ML3JM8.js";import{I as _,J as k}from"./register-all-widgets-and-editors-for-testing-2h3xxgus.js";import{S as o}from"./section-control-button-BZdtqJhw.js";import{E as b}from"./editor-GipEVakU.js";const{HUD:P,InlineIcon:C}=g,{iconCircleArrowDown:A,iconCircleArrowUp:S,iconPlus:h,iconTrash:E}=v,m=class m extends w.Component{constructor(){super(...arguments),this.state={highlightLint:!0},this._handleJsonChange=n=>{this.props.onChange({json:n})},this._handleEditorChange=(n,e)=>{const a=i.clone(this._sections());a[n]=i.extend({},a[n],e),this.props.onChange({json:a})}}componentDidMount(){this._updatePreviewFrames()}componentDidUpdate(){this._updatePreviewFrames()}_updatePreviewFrames(){this.props.mode==="preview"?this.refs["frame-all"].sendNewData({type:"article-all",data:this._sections().map((n,e)=>this._apiOptionsForSection(n,e))}):this.props.mode==="edit"&&this._sections().forEach((n,e)=>{this.refs["frame-"+e].sendNewData({type:"article",data:this._apiOptionsForSection(n,e)})})}_apiOptionsForSection(n,e){const a=this.refs[`editor${e}`];return{apiOptions:{...u.defaults,...this.props.apiOptions,showAlignmentOptions:!0,isArticle:!0},json:n,useNewStyles:this.props.useNewStyles,linterContext:{contentType:"article",highlightLint:this.state.highlightLint,paths:this.props.contentPaths},legacyPerseusLint:a?a.getSaveWarnings():[]}}_sections(){return Array.isArray(this.props.json)?this.props.json:[this.props.json]}_renderEditor(){const{imageUploader:n,sectionImageUploadGenerator:e}=this.props,a={...u.defaults,...this.props.apiOptions,showAlignmentOptions:!0,isArticle:!0},p=this._sections();return s("div",{className:"perseus-editor-table",children:[p.map((y,r)=>[s("div",{className:"perseus-editor-row",children:[s("div",{className:"perseus-editor-left-cell",children:[s("div",{className:"pod-title",children:["Section ",r+1,s("div",{style:{display:"inline-block",float:"right"},children:[e(r),t(o,{icon:h,onClick:()=>{this._handleAddSectionAfter(r)},title:"Add a new section after this one"}),r+1<p.length&&t(o,{icon:A,onClick:()=>{this._handleMoveSectionLater(r)},title:"Move this section down"}),r>0&&t(o,{icon:S,onClick:()=>{this._handleMoveSectionEarlier(r)},title:"Move this section up"}),t(o,{icon:E,onClick:()=>{const f="Are you sure you want to delete section "+(r+1)+"?";confirm(f)&&this._handleRemoveSection(r)},title:"Delete this section"})]})]}),t(b,{...y,apiOptions:a,imageUploader:n,onChange:i.partial(this._handleEditorChange,r),placeholder:"Type your section text here...",ref:"editor"+r})]}),t("div",{className:"editor-preview",children:this._renderIframePreview(r,!0)})]},r)]),this._renderAddSection(),this._renderLinterHUD()]})}_renderAddSection(){return t("div",{className:"perseus-editor-row",children:t("div",{className:"perseus-editor-left-cell",children:s("a",{href:"#",className:"simple-button orange",onClick:()=>{this._handleAddSectionAfter(this._sections().length-1)},children:[t(C,{...h})," Add a section"]})})})}_renderLinterHUD(){return t(P,{message:"Style warnings",enabled:this.state.highlightLint,onClick:()=>{this.setState({highlightLint:!this.state.highlightLint})}})}_renderIframePreview(n,e){const a=this.props.screen==="phone"||this.props.screen==="tablet";return t(R,{deviceType:this.props.screen,nochrome:e,children:t(_,{ref:"frame-"+n,datasetKey:"mobile",datasetValue:a,seamless:e,url:this.props.previewURL},this.props.screen)})}_renderPreviewMode(){return t("div",{className:"standalone-preview",children:this._renderIframePreview("all",!1)})}_handleMoveSectionEarlier(n){if(n===0)return;const e=i.clone(this._sections()),a=e[n];e.splice(n,1),e.splice(n-1,0,a),this.props.onChange({json:e})}_handleMoveSectionLater(n){const e=i.clone(this._sections());if(n+1===e.length)return;const a=e[n];e.splice(n,1),e.splice(n+1,0,a),this.props.onChange({json:e})}_handleAddSectionAfter(n){const e=i.clone(this.serialize()),a=n>=0?{widgets:e[n].widgets}:{};e.splice(n+1,0,a),this.props.onChange({json:e})}_handleRemoveSection(n){const e=i.clone(this._sections());e.splice(n,1),this.props.onChange({json:e})}serialize(){if(this.props.mode==="edit")return this._sections().map((n,e)=>this.refs["editor"+e].serialize());if(this.props.mode==="preview"||this.props.mode==="json")return this.props.json;throw new d("Could not serialize; mode "+this.props.mode+" not found",c.Internal)}getSaveWarnings(){if(this.props.mode!=="edit")throw new d("Can only get save warnings in edit mode.",c.NotAllowed);return this._sections().map((n,e)=>this.refs["editor"+e].getSaveWarnings())}render(){return s("div",{className:"framework-perseus perseus-article-editor",children:[this.props.mode==="edit"&&this._renderEditor(),this.props.mode==="preview"&&this._renderPreviewMode(),this.props.mode==="json"&&s("div",{className:"json-editor",children:[t("div",{className:"json-editor-warning",children:t("span",{children:"Warning: Editing in this mode can lead to broken articles!"})}),t(k,{multiLine:!0,onChange:this._handleJsonChange,value:this.props.json})]})]})}};m.defaultProps={contentPaths:[],json:[{}],mode:"edit",screen:"desktop",sectionImageUploadGenerator:()=>t("span",{}),useNewStyles:!1};let l=m;l.__docgenInfo={description:"",methods:[{name:"_updatePreviewFrames",docblock:null,modifiers:[],params:[],returns:null},{name:"_apiOptionsForSection",docblock:null,modifiers:[],params:[{name:"section",optional:!1,type:{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]},alias:"RendererProps"}},{name:"sectionIndex",optional:!1,type:{name:"number"}}],returns:{type:{name:"any"}}},{name:"_sections",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}}},{name:"_renderEditor",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"div">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"div">',elements:[{name:"literal",value:'"div"'}]}]}}},{name:"_renderAddSection",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"div">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"div">',elements:[{name:"literal",value:'"div"'}]}]}}},{name:"_renderLinterHUD",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},{name:"_renderIframePreview",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]}},{name:"nochrome",optional:!1,type:{name:"boolean"}}],returns:{type:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},{name:"_renderPreviewMode",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"div">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"div">',elements:[{name:"literal",value:'"div"'}]}]}}},{name:"_handleJsonChange",docblock:null,modifiers:[],params:[{name:"newJson",optional:!1,type:null}],returns:null},{name:"_handleEditorChange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"newProps",optional:!1,type:null}],returns:null},{name:"_handleMoveSectionEarlier",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"_handleMoveSectionLater",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"_handleAddSectionAfter",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"_handleRemoveSection",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"RendererProps | ReadonlyArray<RendererProps>",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}]}}},{name:"getSaveWarnings",docblock:`Returns an array, with one element be section.
Each element is an array of lint warnings present in that section.

This function can currently only be called in edit mode.`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}},description:`Returns an array, with one element be section.
Each element is an array of lint warnings present in that section.

This function can currently only be called in edit mode.`}],displayName:"ArticleEditor",props:{contentPaths:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"",defaultValue:{value:"[]",computed:!1}},json:{required:!1,tsType:{name:"union",raw:"RendererProps | ReadonlyArray<RendererProps>",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}]},description:"",defaultValue:{value:"[{}]",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:'"diff" | "edit" | "json" | "preview"',elements:[{name:"literal",value:'"diff"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"json"'},{name:"literal",value:'"preview"'}]},description:"",defaultValue:{value:'"edit"',computed:!1}},screen:{required:!1,tsType:{name:"union",raw:'"phone" | "tablet" | "desktop"',elements:[{name:"literal",value:'"phone"'},{name:"literal",value:'"tablet"'},{name:"literal",value:'"desktop"'}]},description:"",defaultValue:{value:'"desktop"',computed:!1}},sectionImageUploadGenerator:{required:!1,tsType:{name:"signature",type:"function",raw:`(
    i: number,
) => React.ReactElement<React.ComponentProps<"span">>`,signature:{arguments:[{type:{name:"number"},name:"i"}],return:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"span">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"span">',elements:[{name:"literal",value:'"span"'}]}]}}},description:"",defaultValue:{value:"() => <span />",computed:!1}},useNewStyles:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},apiOptions:{required:!1,tsType:{name:"APIOptions"},description:""},imageUploader:{required:!1,tsType:{name:"ImageUploader"},description:""},previewURL:{required:!0,tsType:{name:"string"},description:""}}};export{l as A};