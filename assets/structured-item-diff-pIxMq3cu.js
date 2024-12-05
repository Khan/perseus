import{j as r}from"./jsx-runtime-63Ea5SlK.js";import"./article-renderer-672kQv0H.js";import{_ as f}from"./jquery-yG1GhClm.js";import"./util-AYeX86gl.js";import"./phet-simulation-_7qOO4_B.js";import"./version-akiLXZts.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-1-ethIrW.js";import{d as V,e as F,g as B,s as G}from"./perseus-item-tX_UkuqW.js";import"./hints-renderer-55KvvYOM.js";import{g as ae,b as se}from"./renderer-Fa29TEBe.js";import"./base-radio-lzGbv5LT.js";import"./button-group-G5CZaedn.js";import"./graph-AXw3gRQ0.js";import"./svg-image-ZjoZQGiG.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-BIPwuHvF.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-ILg8RrvB.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-ogh82yD8.js";import"./range-input-w5Z3sPK5.js";import"./text-input-e6f7u9S5.js";import"./text-list-editor-aj1SAzcA.js";import"./index-k-0mNqHS.js";import"./i18n-context-fsWEgybQ.js";import"./index-smZ6iCr_.js";import{r as j}from"./index-6oxdNXpR.js";import{T as ie}from"./text-diff-2tN30EN_.js";import{c as oe}from"./components-_HVRA9p2.js";import{c as x}from"./index-dnMhQZ-1.js";import{P as i}from"./index-0C4KXdeC.js";import{T as ue}from"./tags-diff-FGF9LpCN.js";const _="unchanged",Q="changed",X="added",Y="removed",le=function(a,e,n){let t;return a===e?t=_:a===void 0?t=X:e===void 0?t=Y:t=Q,{after:JSON.stringify(e),before:JSON.stringify(a),children:[],key:n,status:t}},de=function(a,e,n){const t=f.isObject(a)?f(a).keys():[],s=f.isObject(e)?f(e).keys():[],u=f.union(t,s),o=f.map(u,function(p){return Z((a||{})[p],(e||{})[p],p)});let l;return a===void 0?l=X:e===void 0?l=Y:l=f.any(o,function(g){return g.status!==_})?Q:_,{after:"",before:"",children:o,key:n,status:l}},Z=function(a,e,n){return typeof a=="object"||typeof e=="object"?de(a,e,n):le(a,e,n)},{SvgImage:J}=oe,ee=function(a){return(a-1)*20},S="before",C="after",pe="unchanged",L=class L extends j.Component{render(){const e=x(this.props.className,{"diff-row":!0,before:this.props.side===S,after:this.props.side===C});return r.jsx("div",{className:e,children:r.jsxs("div",{style:{paddingLeft:ee(this.props.depth)},children:[this.props.showKey&&this.props.propKey+": ",r.jsx("span",{className:"inner-value dark "+this.props.className,children:this.props.value})]})})}};L.propTypes={className:i.string.isRequired,depth:i.number.isRequired,propKey:i.string.isRequired,showKey:i.bool.isRequired,side:i.oneOf([S,C]).isRequired,value:i.string};let R=L;const E=class E extends j.Component{render(){const e=this;return r.jsx("div",{onClick:e.props.onClick,style:{clear:"both"},children:f.map([S,C],function(n){return r.jsx("div",{className:"diff-row collapsed "+n,children:r.jsx("div",{style:{paddingLeft:ee(e.props.depth)},children:r.jsx("span",{children:" [ show unmodified ] "})})},n)})})}};E.propTypes={depth:i.number,onClick:i.func.isRequired},E.defaultProps={depth:0};let D=E;const P=class P extends j.Component{constructor(){super(...arguments),this.state={expanded:this.props.expanded},this.expand=()=>{this.setState({expanded:!0})}}render(){const e=this.props.entry,n=e.status==="removed",t=e.status==="added",s=e.status==="changed",u=e.children.length>0,o=x({removed:n||s&&!u,dark:n,"blank-space":t}),l=x({added:t||s&&!u,dark:t,"blank-space":n});let p;this.state.expanded?p=e.children:p=f(e.children).select(function(c){return c.status!==pe});let g=p.length<e.children.length;e.children.length===p.length+1&&(p=e.children,g=!1);const w=this;return r.jsxs("div",{children:[e.key&&r.jsxs("div",{style:{clear:"both"},children:[r.jsx(R,{side:S,className:o,depth:this.props.depth,propKey:e.key,showKey:!t,value:e.before}),r.jsx(R,{side:C,className:l,depth:this.props.depth,propKey:e.key,showKey:!n,value:e.after})]}),f.map(p,function(c){return r.jsx(P,{depth:w.props.depth+1,entry:c,expanded:w.state.expanded},c.key)}),g&&r.jsx(D,{depth:this.props.depth+1,onClick:this.expand})]})}};P.propTypes={depth:i.number,entry:i.shape({after:i.string,before:i.string,children:i.arrayOf(i.any),key:i.string}),expanded:i.bool},P.defaultProps={depth:0};let H=P;const K=class K extends j.Component{render(){const{before:e,after:n}=this.props,t=e.options&&e.options.backgroundImage?e.options.backgroundImage.url:"",s=n.options&&n.options.backgroundImage?n.options.backgroundImage.url:"";return r.jsxs("div",{children:[r.jsx("div",{className:"diff-row before",children:t&&r.jsx("div",{className:x({image:!0,"image-unchanged":t===s,"image-removed":t!==s}),children:r.jsx(J,{src:t,title:t})})}),r.jsx("div",{className:"diff-row after",children:s&&r.jsx("div",{className:x({image:!0,"image-unchanged":t===s,"image-added":t!==s}),children:r.jsx(J,{src:s,title:s})})})]})}};K.propTypes={after:i.shape({options:i.objectOf(i.any)}).isRequired,before:i.shape({options:i.objectOf(i.any)}).isRequired};let I=K;const M=class M extends j.Component{render(){const{after:e,before:n,title:t,type:s}=this.props,u=Z(n,e);return r.jsxs("div",{children:[r.jsx("div",{className:"diff-header",children:t}),r.jsx("div",{className:"diff-header",children:t}),r.jsxs("div",{className:"diff-body ui-helper-clearfix",children:[s==="image"&&r.jsx(I,{before:n,after:e}),r.jsx(H,{entry:u})]})]})}};M.propTypes={after:i.shape({options:i.objectOf(i.any)}),before:i.shape({options:i.objectOf(i.any)}),title:i.string.isRequired,type:i.string},M.defaultProps={after:{},before:{},type:""};let O=M;O.__docgenInfo={description:"",methods:[],displayName:"WidgetDiff",props:{after:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"shape",value:{options:{name:"objectOf",value:{name:"any"},required:!1}}},required:!1},before:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"shape",value:{options:{name:"objectOf",value:{name:"any"},required:!1}}},required:!1},type:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"string"},required:!0}}};const U=function(a,e){const{alignment:n,graded:t,options:s,type:u}=a||{},o={options:s};return e&&ae(u).length>1&&(o.alignment=n),u==="transformer"&&(o.graded=t),se(u)&&(o.static=(a==null?void 0:a.static)??void 0),o},$=class $ extends j.Component{render(){const{after:e,before:n,showAlignmentOptions:t,showSeparator:s,title:u}=this.props;let o,l;(n.content||e.content)&&(o=r.jsx(ie,{before:n.content,after:e.content,title:u}));const p=Object.keys(n.widgets??{}).filter(w=>n.content.includes(w)),g=Object.keys(e.widgets??{}).filter(w=>e.content.includes(w));return(p.length||g.length)&&(l=f.union(p,g).map(c=>{var d,y,m,T;return r.jsx(O,{before:U((d=n.widgets)==null?void 0:d[c],t),after:U((y=e.widgets)==null?void 0:y[c],t),title:c,type:(((m=n.widgets)==null?void 0:m[c])??{}).type||(((T=e.widgets)==null?void 0:T[c])??{}).type},c)})),r.jsxs("div",{children:[o,l,s&&r.jsx("div",{className:"diff-separator"})]})}};$.defaultProps={after:{content:"",images:{},widgets:{}},before:{content:"",images:{},widgets:{}},showAlignmentOptions:!1,showSeparator:!1};let W=$;W.__docgenInfo={description:"",methods:[],displayName:"RendererDiff",props:{after:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    content: string;
    // NOTE: images and widgets may not be set for some items hints,
    // specifically in old revisions, which may only be loaded for diffing.
    widgets: PerseusRenderer["widgets"] | null | undefined;
    images: PerseusRenderer["images"] | null | undefined;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"union",raw:'PerseusRenderer["widgets"] | null | undefined',elements:[{name:"signature",raw:'PerseusRenderer["widgets"]'},{name:"null"},{name:"undefined"}],required:!0}},{key:"images",value:{name:"union",raw:'PerseusRenderer["images"] | null | undefined',elements:[{name:"signature",raw:'PerseusRenderer["images"]'},{name:"null"},{name:"undefined"}],required:!0}}]}},description:"",defaultValue:{value:`{
    content: "",
    images: {},
    widgets: {},
}`,computed:!1}},before:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    content: string;
    // NOTE: images and widgets may not be set for some items hints,
    // specifically in old revisions, which may only be loaded for diffing.
    widgets: PerseusRenderer["widgets"] | null | undefined;
    images: PerseusRenderer["images"] | null | undefined;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"union",raw:'PerseusRenderer["widgets"] | null | undefined',elements:[{name:"signature",raw:'PerseusRenderer["widgets"]'},{name:"null"},{name:"undefined"}],required:!0}},{key:"images",value:{name:"union",raw:'PerseusRenderer["images"] | null | undefined',elements:[{name:"signature",raw:'PerseusRenderer["images"]'},{name:"null"},{name:"undefined"}],required:!0}}]}},description:"",defaultValue:{value:`{
    content: "",
    images: {},
    widgets: {},
}`,computed:!1}},showAlignmentOptions:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showSeparator:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},title:{required:!0,tsType:{name:"string"},description:""}}};function z(a,e){let n=!0;for(let t=0;t<e.length;t++){if(t>=a.length)return!1;e[t]!==a[t]&&(n=!1)}return n}function A(a,e){if(a.length!==e.length)return!1;for(let n=0,t=a.length;n<t;n++)if(a[n]!==e[n])return!1;return!0}function me(a){const e=[];for(let n=0;n<a.length;n++)typeof a[n]=="number"?e.push((a[n]+1).toString()+":"):e.push(a[n]);return e.join(" ")}class q extends j.Component{static generateCompletePathsList(e,n,t,s,u){if(s.type==="content"||s.type==="hint"||s.type==="tags"){const o=e.length>0&&A(u,e[0][1]),l=n.length>0&&A(u,n[0][1]);o&&l?(t.push(u),e.splice(0,1),n.splice(0,1)):o?(t.push(u),e.splice(0,1)):l&&(t.push(u),n.splice(0,1))}else if(s.type==="array"){let o=0,l=u.concat(o);for(;e.length>0&&z(e[0][1],l)||n.length>0&&z(n[0][1],l);)q.generateCompletePathsList(e,n,t,s.elementShape,l),o++,l=u.concat(o)}else if(s.type==="object"){const o=Object.keys(s.shape);for(let l=0;l<o.length;l++){const p=u.concat([o[l]]);q.generateCompletePathsList(e,n,t,s.shape[o[l]],p)}}}render(){const{before:e,after:n,shape:t,tags:s}=this.props,u=[],o=[];V().setContentMapper((d,y,m)=>u.push([d,m])).setHintMapper((d,y,m)=>u.push([d,m])).setTagsMapper((d,y,m)=>u.push([d,m])).mapTree(F(e),t),V().setContentMapper((d,y,m)=>o.push([d,m])).setHintMapper((d,y,m)=>o.push([d,m])).setTagsMapper((d,y,m)=>o.push([d,m])).mapTree(F(n),t);const l=u.slice(),p=o.slice(),g=[];q.generateCompletePathsList(l,p,g,t,[]);const w=g.length,c=g.map((d,y)=>{const m=d[d.length-1]==="tags",T=me(d);let v=u.find(b=>A(b[1],d)),k=o.find(b=>A(b[1],d));if(m){v||(v=[[],d]),k||(k=[[],d]);const b=[];Array.isArray(v[0])&&v[0].forEach(h=>{typeof h=="string"&&b.push(s.idToName(h))});const N=[];Array.isArray(k[0])&&k[0].forEach(h=>{typeof h=="string"&&N.push(s.idToName(h))});const ne=b.filter(h=>N.includes(h)),te=b.filter(h=>!N.includes(h)),re=N.filter(h=>!b.includes(h));return r.jsx(ue,{beforeOnly:te,afterOnly:re,intersection:ne,title:T,showSeparator:y<w-1},y)}return v||(v=[B(G.content),d]),k||(k=[B(G.content),d]),r.jsx(W,{before:v[0],after:k[0],title:T,showAlignmentOptions:!1,showSeparator:y<w-1},y)});return r.jsx("div",{className:"framework-perseus",children:c})}}q.__docgenInfo={description:"",methods:[{name:"generateCompletePathsList",docblock:`Traverses the given shape and adds paths that are present in
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"idToName",value:{name:"signature",type:"function",raw:"(arg1: string) => string",signature:{arguments:[{type:{name:"string"},name:"arg1"}],return:{name:"string"}},required:!0}},{key:"nameToId",value:{name:"signature",type:"function",raw:"(arg1: string) => string",signature:{arguments:[{type:{name:"string"},name:"arg1"}],return:{name:"string"}},required:!0}},{key:"names",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""}}};export{W as R,q as S,O as W};
