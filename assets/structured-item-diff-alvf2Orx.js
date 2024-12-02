import{j as n}from"./jsx-runtime-63Ea5SlK.js";import"./article-renderer-JIlzqaPM.js";import{_ as b}from"./jquery-yG1GhClm.js";import"./util-AYeX86gl.js";import"./phet-simulation-_7qOO4_B.js";import"./version-akiLXZts.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-1-ethIrW.js";import{d as D,e as V,g as H,s as G}from"./perseus-item-YhL5oSPz.js";import"./hints-renderer-mroHfjtV.js";import{g as ae,s as ie}from"./renderer-6G9zNccl.js";import"./base-radio-AH6_jTIn.js";import"./button-group-G5CZaedn.js";import"./graph-ASQAtWJc.js";import"./svg-image-8VV-_RGO.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-BIPwuHvF.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-ILg8RrvB.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-ogh82yD8.js";import"./range-input-w5Z3sPK5.js";import"./text-input-5e4vF1bl.js";import"./text-list-editor-aj1SAzcA.js";import"./index-k-0mNqHS.js";import"./i18n-context-fsWEgybQ.js";import"./index-smZ6iCr_.js";import{r as q}from"./index-6oxdNXpR.js";import{T as se}from"./text-diff-1bSvOrS6.js";import{c as oe}from"./components-b_FFTCjA.js";import{c as O}from"./index-dnMhQZ-1.js";import{P as s}from"./index-0C4KXdeC.js";import{T as le}from"./tags-diff-HhKR3EBa.js";const _="unchanged",Q="changed",X="added",Y="removed",ue=function(a,e,r){let t;return a===e?t=_:a===void 0?t=X:e===void 0?t=Y:t=Q,{after:JSON.stringify(e),before:JSON.stringify(a),children:[],key:r,status:t}},de=function(a,e,r){const t=b.isObject(a)?b(a).keys():[],i=b.isObject(e)?b(e).keys():[],l=b.union(t,i),o=b.map(l,function(y){return Z((a||{})[y],(e||{})[y],y)});let u;return a===void 0?u=X:e===void 0?u=Y:u=b.any(o,function(p){return p.status!==_})?Q:_,{after:"",before:"",children:o,key:r,status:u}},Z=function(a,e,r){return typeof a=="object"||typeof e=="object"?de(a,e,r):ue(a,e,r)},{SvgImage:K}=oe,ee=function(a){return(a-1)*20},x="before",z="after",ye="unchanged",U=class U extends q.Component{render(){const e=O(this.props.className,{"diff-row":!0,before:this.props.side===x,after:this.props.side===z});return n.jsx("div",{className:e,children:n.jsxs("div",{style:{paddingLeft:ee(this.props.depth)},children:[this.props.showKey&&this.props.propKey+": ",n.jsx("span",{className:"inner-value dark "+this.props.className,children:this.props.value})]})})}};U.propTypes={className:s.string.isRequired,depth:s.number.isRequired,propKey:s.string.isRequired,showKey:s.bool.isRequired,side:s.oneOf([x,z]).isRequired,value:s.string};let N=U;const E=class E extends q.Component{render(){const e=this;return n.jsx("div",{onClick:e.props.onClick,style:{clear:"both"},children:b.map([x,z],function(r){return n.jsx("div",{className:"diff-row collapsed "+r,children:n.jsx("div",{style:{paddingLeft:ee(e.props.depth)},children:n.jsx("span",{children:" [ show unmodified ] "})})},r)})})}};E.propTypes={depth:s.number,onClick:s.func.isRequired},E.defaultProps={depth:0};let $=E;const A=class A extends q.Component{constructor(){super(...arguments),this.state={expanded:this.props.expanded},this.expand=()=>{this.setState({expanded:!0})}}render(){const e=this.props.entry,r=e.status==="removed",t=e.status==="added",i=e.status==="changed",l=e.children.length>0,o=O({removed:r||i&&!l,dark:r,"blank-space":t}),u=O({added:t||i&&!l,dark:t,"blank-space":r});let y;this.state.expanded?y=e.children:y=b(e.children).select(function(g){return g.status!==ye});let p=y.length<e.children.length;e.children.length===y.length+1&&(y=e.children,p=!1);const v=this;return n.jsxs("div",{children:[e.key&&n.jsxs("div",{style:{clear:"both"},children:[n.jsx(N,{side:x,className:o,depth:this.props.depth,propKey:e.key,showKey:!t,value:e.before}),n.jsx(N,{side:z,className:u,depth:this.props.depth,propKey:e.key,showKey:!r,value:e.after})]}),b.map(y,function(g){return n.jsx(A,{depth:v.props.depth+1,entry:g,expanded:v.state.expanded},g.key)}),p&&n.jsx($,{depth:this.props.depth+1,onClick:this.expand})]})}};A.propTypes={depth:s.number,entry:s.shape({after:s.string,before:s.string,children:s.arrayOf(s.any),key:s.string}),expanded:s.bool},A.defaultProps={depth:0};let P=A;const S=class S extends q.Component{render(){const{before:e,after:r}=this.props,t=e.options&&e.options.backgroundImage?e.options.backgroundImage.url:"",i=r.options&&r.options.backgroundImage?r.options.backgroundImage.url:"";return n.jsxs("div",{children:[n.jsx("div",{className:"diff-row before",children:t&&n.jsx("div",{className:O({image:!0,"image-unchanged":t===i,"image-removed":t!==i}),children:n.jsx(K,{src:t,title:t})})}),n.jsx("div",{className:"diff-row after",children:i&&n.jsx("div",{className:O({image:!0,"image-unchanged":t===i,"image-added":t!==i}),children:n.jsx(K,{src:i,title:i})})})]})}};S.propTypes={after:s.shape({options:s.objectOf(s.any)}).isRequired,before:s.shape({options:s.objectOf(s.any)}).isRequired};let F=S;const L=class L extends q.Component{render(){const{after:e,before:r,title:t,type:i}=this.props,l=Z(r,e);return n.jsxs("div",{children:[n.jsx("div",{className:"diff-header",children:t}),n.jsx("div",{className:"diff-header",children:t}),n.jsxs("div",{className:"diff-body ui-helper-clearfix",children:[i==="image"&&n.jsx(F,{before:r,after:e}),n.jsx(P,{entry:l})]})]})}};L.propTypes={after:s.shape({options:s.objectOf(s.any)}),before:s.shape({options:s.objectOf(s.any)}),title:s.string.isRequired,type:s.string},L.defaultProps={after:{},before:{},type:""};let I=L;I.__docgenInfo={description:"",methods:[],displayName:"WidgetDiff",props:{after:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"shape",value:{options:{name:"objectOf",value:{name:"any"},required:!1}}},required:!1},before:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"shape",value:{options:{name:"objectOf",value:{name:"any"},required:!1}}},required:!1},type:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"string"},required:!0}}};const B=function(a,e){const{alignment:r,graded:t,options:i,type:l}=a||{},o={options:i};return e&&ae(l).length>1&&(o.alignment=r),l==="transformer"&&(o.graded=t),ie(l)&&(o.static=(a==null?void 0:a.static)??void 0),o},M=class M extends q.Component{render(){const{after:e,before:r,showAlignmentOptions:t,showSeparator:i,title:l}=this.props;let o,u;(r.content||e.content)&&(o=n.jsx(se,{before:r.content,after:e.content,title:l}));const y=Object.keys(r.widgets??{}).filter(v=>r.content.includes(v)),p=Object.keys(e.widgets??{}).filter(v=>e.content.includes(v));return(y.length||p.length)&&(u=b.union(y,p).map(g=>{var d,h,m,T;return n.jsx(I,{before:B((d=r.widgets)==null?void 0:d[g],t),after:B((h=e.widgets)==null?void 0:h[g],t),title:g,type:(((m=r.widgets)==null?void 0:m[g])??{}).type||(((T=e.widgets)==null?void 0:T[g])??{}).type},g)})),n.jsxs("div",{children:[o,u,i&&n.jsx("div",{className:"diff-separator"})]})}};M.defaultProps={after:{content:"",images:{},widgets:{}},before:{content:"",images:{},widgets:{}},showAlignmentOptions:!1,showSeparator:!1};let C=M;C.__docgenInfo={description:"",methods:[],displayName:"RendererDiff",props:{after:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    content: string;
    // NOTE: images and widgets may not be set for some items hints,
    // specifically in old revisions, which may only be loaded for diffing.
    widgets: PerseusRenderer["widgets"] | null | undefined;
    images: PerseusRenderer["images"] | null | undefined;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"union",raw:'PerseusRenderer["widgets"] | null | undefined',elements:[{name:"intersection",raw:'PerseusRenderer["widgets"]'},{name:"null"},{name:"undefined"}],required:!0}},{key:"images",value:{name:"union",raw:'PerseusRenderer["images"] | null | undefined',elements:[{name:"signature",raw:'PerseusRenderer["images"]'},{name:"null"},{name:"undefined"}],required:!0}}]}},description:"",defaultValue:{value:`{
    content: "",
    images: {},
    widgets: {},
}`,computed:!1}},before:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    content: string;
    // NOTE: images and widgets may not be set for some items hints,
    // specifically in old revisions, which may only be loaded for diffing.
    widgets: PerseusRenderer["widgets"] | null | undefined;
    images: PerseusRenderer["images"] | null | undefined;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"union",raw:'PerseusRenderer["widgets"] | null | undefined',elements:[{name:"intersection",raw:'PerseusRenderer["widgets"]'},{name:"null"},{name:"undefined"}],required:!0}},{key:"images",value:{name:"union",raw:'PerseusRenderer["images"] | null | undefined',elements:[{name:"signature",raw:'PerseusRenderer["images"]'},{name:"null"},{name:"undefined"}],required:!0}}]}},description:"",defaultValue:{value:`{
    content: "",
    images: {},
    widgets: {},
}`,computed:!1}},showAlignmentOptions:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showSeparator:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},title:{required:!0,tsType:{name:"string"},description:""}}};function J(a,e){let r=!0;for(let t=0;t<e.length;t++){if(t>=a.length)return!1;e[t]!==a[t]&&(r=!1)}return r}function W(a,e){if(a.length!==e.length)return!1;for(let r=0,t=a.length;r<t;r++)if(a[r]!==e[r])return!1;return!0}function me(a){const e=[];for(let r=0;r<a.length;r++)typeof a[r]=="number"?e.push((a[r]+1).toString()+":"):e.push(a[r]);return e.join(" ")}class R extends q.Component{static generateCompletePathsList(e,r,t,i,l){if(i.type==="content"||i.type==="hint"||i.type==="tags"){const o=e.length>0&&W(l,e[0][1]),u=r.length>0&&W(l,r[0][1]);o&&u?(t.push(l),e.splice(0,1),r.splice(0,1)):o?(t.push(l),e.splice(0,1)):u&&(t.push(l),r.splice(0,1))}else if(i.type==="array"){let o=0,u=l.concat(o);for(;e.length>0&&J(e[0][1],u)||r.length>0&&J(r[0][1],u);)R.generateCompletePathsList(e,r,t,i.elementShape,u),o++,u=l.concat(o)}else if(i.type==="object"){const o=Object.keys(i.shape);for(let u=0;u<o.length;u++){const y=l.concat([o[u]]);R.generateCompletePathsList(e,r,t,i.shape[o[u]],y)}}}render(){const{before:e,after:r,shape:t,tags:i}=this.props,l=[],o=[];D().setContentMapper((d,h,m)=>l.push([d,m])).setHintMapper((d,h,m)=>l.push([d,m])).setTagsMapper((d,h,m)=>l.push([d,m])).mapTree(V(e),t),D().setContentMapper((d,h,m)=>o.push([d,m])).setHintMapper((d,h,m)=>o.push([d,m])).setTagsMapper((d,h,m)=>o.push([d,m])).mapTree(V(r),t);const u=l.slice(),y=o.slice(),p=[];R.generateCompletePathsList(u,y,p,t,[]);const v=p.length,g=p.map((d,h)=>{const m=d[d.length-1]==="tags",T=me(d);let f=l.find(w=>W(w[1],d)),k=o.find(w=>W(w[1],d));if(m){f||(f=[[],d]),k||(k=[[],d]);const w=[];Array.isArray(f[0])&&f[0].forEach(c=>{typeof c=="string"&&w.push(i.idToName(c))});const j=[];Array.isArray(k[0])&&k[0].forEach(c=>{typeof c=="string"&&j.push(i.idToName(c))});const re=w.filter(c=>j.includes(c)),te=w.filter(c=>!j.includes(c)),ne=j.filter(c=>!w.includes(c));return n.jsx(le,{beforeOnly:te,afterOnly:ne,intersection:re,title:T,showSeparator:h<v-1},h)}return f||(f=[H(G.content),d]),k||(k=[H(G.content),d]),n.jsx(C,{before:f[0],after:k[0],title:T,showAlignmentOptions:!1,showSeparator:h<v-1},h)});return n.jsx("div",{className:"framework-perseus",children:g})}}R.__docgenInfo={description:"",methods:[{name:"generateCompletePathsList",docblock:`Traverses the given shape and adds paths that are present in
beforeList and afterList to result. Note that this method assumes
the order of elements in beforeList and afterList, which are
from buildMapper(), is the same order they appear in in the shape.`,modifiers:["static"],params:[{name:"beforeList",optional:!1,type:{name:"Array",elements:[{name:"tuple",raw:"[unknown, Path]",elements:[{name:"unknown"},{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"}]}],raw:"Array<ItemList>",alias:"Array"}},{name:"afterList",optional:!1,type:{name:"Array",elements:[{name:"tuple",raw:"[unknown, Path]",elements:[{name:"unknown"},{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"}]}],raw:"Array<ItemList>",alias:"Array"}},{name:"result",optional:!1,type:{name:"Array",elements:[{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"}],raw:"Array<Path>",alias:"Array"}},{name:"shape",optional:!1,type:{name:"union",raw:`| ContentShape
| HintShape
| TagsShape
| ArrayShape
| ObjectShape`,elements:[{name:"signature",type:"object",raw:`{
    type: "content";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"content"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "hint";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"hint"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tags";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tags"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "array";
    /**
     * Each element of an ArrayNode has the same shape, which is specified by
     * the \`elementShape\` property.
     */
    elementShape: Shape;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"array"',required:!0}},{key:"elementShape",value:{name:"Shape",required:!0},description:"Each element of an ArrayNode has the same shape, which is specified by\nthe `elementShape` property."}]}},{name:"signature",type:"object",raw:`{
    type: "object";
    /**
     * Each property of an ObjectNode has its own shape, which is specified
     * under the corresponding key in the \`shape\` property.
     */
    shape: {
        [k: string]: Shape;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"object"',required:!0}},{key:"shape",value:{name:"signature",type:"object",raw:`{
    [k: string]: Shape;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Shape",required:!0}}]},required:!0},description:"Each property of an ObjectNode has its own shape, which is specified\nunder the corresponding key in the `shape` property."}]}}],alias:"Shape"}},{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"ReadonlyArray"}}],returns:{type:{name:"void"}},description:`Traverses the given shape and adds paths that are present in
beforeList and afterList to result. Note that this method assumes
the order of elements in beforeList and afterList, which are
from buildMapper(), is the same order they appear in in the shape.`}],displayName:"StructuredItemDiff",props:{after:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    _multi: ItemTree;
}`,signature:{properties:[{key:"_multi",value:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `cs-program ${number}`]: CSProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`cs-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `definition ${number}`]: DefinitionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`definition ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `dropdown ${number}`]: DropdownWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`dropdown ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `explanation ${number}`]: ExplanationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`explanation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `expression ${number}`]: ExpressionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`expression ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `grapher ${number}`]: GrapherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`grapher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `group ${number}`]: GroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group-set ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `iframe ${number}`]: IFrameWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`iframe ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `image ${number}`]: ImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `input-number ${number}`]: InputNumberWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`input-number ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interaction ${number}`]: InteractionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interaction ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interactive-graph ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `label-image ${number}`]: LabelImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`label-image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matcher ${number}`]: MatcherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matcher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matrix ${number}`]: MatrixWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matrix ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `measurer ${number}`]: MeasurerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`measurer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`molecule-renderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `number-line ${number}`]: NumberLineWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`number-line ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`numeric-input ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `orderer ${number}`]: OrdererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`orderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage ${number}`]: PassageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref-target ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`phet-simulation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `plotter ${number}`]: PlotterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`plotter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `python-program ${number}`]: PythonProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`python-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `radio ${number}`]: RadioWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`radio ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `sorter ${number}`]: SorterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`sorter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `table ${number}`]: TableWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`table ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `video ${number}`]: VideoWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`video ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}]},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `cs-program ${number}`]: CSProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`cs-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `definition ${number}`]: DefinitionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`definition ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `dropdown ${number}`]: DropdownWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`dropdown ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `explanation ${number}`]: ExplanationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`explanation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `expression ${number}`]: ExpressionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`expression ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `grapher ${number}`]: GrapherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`grapher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `group ${number}`]: GroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group-set ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `iframe ${number}`]: IFrameWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`iframe ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `image ${number}`]: ImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `input-number ${number}`]: InputNumberWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`input-number ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interaction ${number}`]: InteractionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interaction ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interactive-graph ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `label-image ${number}`]: LabelImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`label-image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matcher ${number}`]: MatcherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matcher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matrix ${number}`]: MatrixWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matrix ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `measurer ${number}`]: MeasurerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`measurer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`molecule-renderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `number-line ${number}`]: NumberLineWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`number-line ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`numeric-input ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `orderer ${number}`]: OrdererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`orderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage ${number}`]: PassageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref-target ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`phet-simulation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `plotter ${number}`]: PlotterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`plotter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `python-program ${number}`]: PythonProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`python-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `radio ${number}`]: RadioWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`radio ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `sorter ${number}`]: SorterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`sorter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `table ${number}`]: TableWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`table ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `video ${number}`]: VideoWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`video ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}]},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]}},description:""},before:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    _multi: ItemTree;
}`,signature:{properties:[{key:"_multi",value:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `cs-program ${number}`]: CSProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`cs-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `definition ${number}`]: DefinitionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`definition ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `dropdown ${number}`]: DropdownWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`dropdown ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `explanation ${number}`]: ExplanationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`explanation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `expression ${number}`]: ExpressionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`expression ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `grapher ${number}`]: GrapherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`grapher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `group ${number}`]: GroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group-set ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `iframe ${number}`]: IFrameWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`iframe ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `image ${number}`]: ImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `input-number ${number}`]: InputNumberWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`input-number ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interaction ${number}`]: InteractionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interaction ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interactive-graph ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `label-image ${number}`]: LabelImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`label-image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matcher ${number}`]: MatcherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matcher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matrix ${number}`]: MatrixWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matrix ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `measurer ${number}`]: MeasurerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`measurer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`molecule-renderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `number-line ${number}`]: NumberLineWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`number-line ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`numeric-input ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `orderer ${number}`]: OrdererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`orderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage ${number}`]: PassageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref-target ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`phet-simulation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `plotter ${number}`]: PlotterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`plotter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `python-program ${number}`]: PythonProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`python-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `radio ${number}`]: RadioWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`radio ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `sorter ${number}`]: SorterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`sorter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `table ${number}`]: TableWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`table ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `video ${number}`]: VideoWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`video ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}]},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `cs-program ${number}`]: CSProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`cs-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `definition ${number}`]: DefinitionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`definition ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `dropdown ${number}`]: DropdownWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`dropdown ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `explanation ${number}`]: ExplanationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`explanation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `expression ${number}`]: ExpressionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`expression ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `grapher ${number}`]: GrapherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`grapher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `group ${number}`]: GroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group-set ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `iframe ${number}`]: IFrameWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`iframe ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `image ${number}`]: ImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `input-number ${number}`]: InputNumberWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`input-number ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interaction ${number}`]: InteractionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interaction ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interactive-graph ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `label-image ${number}`]: LabelImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`label-image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matcher ${number}`]: MatcherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matcher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matrix ${number}`]: MatrixWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matrix ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `measurer ${number}`]: MeasurerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`measurer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`molecule-renderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `number-line ${number}`]: NumberLineWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`number-line ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`numeric-input ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `orderer ${number}`]: OrdererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`orderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage ${number}`]: PassageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref-target ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`phet-simulation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `plotter ${number}`]: PlotterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`plotter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `python-program ${number}`]: PythonProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`python-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `radio ${number}`]: RadioWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`radio ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `sorter ${number}`]: SorterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`sorter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `table ${number}`]: TableWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`table ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `video ${number}`]: VideoWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`video ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}]},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]}},description:""},shape:{required:!0,tsType:{name:"union",raw:`| ContentShape
| HintShape
| TagsShape
| ArrayShape
| ObjectShape`,elements:[{name:"signature",type:"object",raw:`{
    type: "content";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"content"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "hint";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"hint"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tags";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tags"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "array";
    /**
     * Each element of an ArrayNode has the same shape, which is specified by
     * the \`elementShape\` property.
     */
    elementShape: Shape;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"array"',required:!0}},{key:"elementShape",value:{name:"Shape",required:!0},description:"Each element of an ArrayNode has the same shape, which is specified by\nthe `elementShape` property."}]}},{name:"signature",type:"object",raw:`{
    type: "object";
    /**
     * Each property of an ObjectNode has its own shape, which is specified
     * under the corresponding key in the \`shape\` property.
     */
    shape: {
        [k: string]: Shape;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"object"',required:!0}},{key:"shape",value:{name:"signature",type:"object",raw:`{
    [k: string]: Shape;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Shape",required:!0}}]},required:!0},description:"Each property of an ObjectNode has its own shape, which is specified\nunder the corresponding key in the `shape` property."}]}}]},description:""},tags:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    idToName: (arg1: string) => string;
    nameToId: (arg1: string) => string;
    names: ReadonlyArray<string>;
}`,signature:{properties:[{key:"idToName",value:{name:"signature",type:"function",raw:"(arg1: string) => string",signature:{arguments:[{type:{name:"string"},name:"arg1"}],return:{name:"string"}},required:!0}},{key:"nameToId",value:{name:"signature",type:"function",raw:"(arg1: string) => string",signature:{arguments:[{type:{name:"string"},name:"arg1"}],return:{name:"string"}},required:!0}},{key:"names",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""}}};export{C as R,R as S,I as W};
