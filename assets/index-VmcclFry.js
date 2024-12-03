import{a as M}from"./version-akiLXZts.js";import"./article-editor-e8SegBQb.js";import"./device-framer-MUDr0WgQ.js";import"./viewport-resizer-NDxHhhPy.js";import{j as r}from"./jsx-runtime-63Ea5SlK.js";import{P as d}from"./index-0C4KXdeC.js";import{r as p}from"./index-6oxdNXpR.js";import{_}from"./jquery-yG1GhClm.js";import{R as x,W as D}from"./structured-item-diff-Ohq1nr_G.js";import{H as V}from"./editor-page-HJzNpmft.js";import{E as H}from"./editor-5JJfJo0I.js";import{w as G}from"./article-renderer-LdbmAv3a.js";import"./util-AYeX86gl.js";import"./phet-simulation-_7qOO4_B.js";import{c as K,r as B,a as J,d as Q}from"./renderer-1DxKQj1_.js";import{A as Y}from"./perseus-api-1-ethIrW.js";import{l as g,g as Z,e as X}from"./perseus-item-pujp3Me4.js";import"./hints-renderer-alc4yvsU.js";import"./base-radio-9_hKye4B.js";import"./button-group-G5CZaedn.js";import"./graph-QfZUzUyx.js";import"./svg-image-7aOK05RI.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-BIPwuHvF.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-ILg8RrvB.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-ogh82yD8.js";import"./range-input-w5Z3sPK5.js";import"./text-input-5e4vF1bl.js";import"./text-list-editor-aj1SAzcA.js";import"./dependencies-CP7Uh8Kq.js";import"./index-k-0mNqHS.js";import"./i18n-context-fsWEgybQ.js";import"./index-smZ6iCr_.js";import{J as ee,A as re}from"./register-all-widgets-and-editors-for-testing-8x6GBWB0.js";import{c as te}from"./components-ODdjt0Ld.js";import{c as E,i as ne}from"./icon-paths-5JCXzGsq.js";import{M as ae}from"./multi-items-SKDLZwz_.js";import{l as s}from"./index-awljIyHI.js";import{F as ie}from"./index-9gkyvru-.js";/* empty css                       */const se="@khanacademy/perseus-editor",oe="__lib_version__";M(se,oe);const q=d.shape({content:d.string,images:d.objectOf(d.any),widgets:d.objectOf(d.any)}),b=class b extends p.Component{constructor(){super(...arguments),this.state=b._stateFromProps(this.props)}UNSAFE_componentWillReceiveProps(e){this.setState(b._stateFromProps(e))}render(){const{before:e,after:t}=this.state,n=Math.max(e.length,t.length),i=_.times(n,l=>r.jsx(x,{before:l<e.length?e[l]:void 0,after:l<t.length?t[l]:void 0,title:`Section ${l+1}`,showAlignmentOptions:!0,showSeparator:l<n-1},l));return r.jsx("div",{className:"framework-perseus",children:i})}};b.propTypes={after:d.oneOfType([q,d.arrayOf(q)]).isRequired,before:d.oneOfType([q,d.arrayOf(q)]).isRequired},b._stateFromProps=e=>{const{before:t,after:n}=e;return{before:Array.isArray(t)?t:[t],after:Array.isArray(n)?n:[n]}};let W=b;W.__docgenInfo={description:"",methods:[{name:"_stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null}],displayName:"ArticleDiff",props:{after:{description:"",type:{name:"union",value:[{name:"custom",raw:"rendererProps"},{name:"arrayOf",value:{name:"custom",raw:"rendererProps"}}]},required:!0},before:{description:"",type:{name:"union",value:[{name:"custom",raw:"rendererProps"},{name:"arrayOf",value:{name:"custom",raw:"rendererProps"}}]},required:!0}}};const L=d.shape({question:d.shape({}).isRequired,answerArea:d.shape({}).isRequired,hints:d.arrayOf(d.any).isRequired}),N=class N extends p.Component{render(){const{before:e,after:t}=this.props,n=Math.max(e.hints.length,t.hints.length),i=r.jsx(x,{before:e.question,after:t.question,title:"Question",showAlignmentOptions:!1,showSeparator:!0}),l=r.jsx(D,{before:e.answerArea,after:t.answerArea,title:"Question extras"}),u=_.times(n,function(y){return r.jsx(x,{before:y<e.hints.length?e.hints[y]:void 0,after:y<t.hints.length?t.hints[y]:void 0,title:`Hint ${y+1}`,showAlignmentOptions:!1,showSeparator:y<n-1},y)});return r.jsxs("div",{className:"framework-perseus",children:[i,l,u&&r.jsx("div",{className:"diff-separator"}),u]})}};N.propTypes={after:L.isRequired,before:L.isRequired};let C=N;C.__docgenInfo={description:"",methods:[],displayName:"ItemDiff",props:{after:{description:"",type:{name:"custom",raw:"itemProps.isRequired"},required:!1},before:{description:"",type:{name:"custom",raw:"itemProps.isRequired"},required:!1}}};const A=class A extends p.Component{render(){const{children:e,color:t,onClick:n,...i}=this.props;return r.jsx("div",{className:s.css(O.baseButton,t==="green"&&O.green,t==="orange"&&O.orange),onClick:n,...i,children:e})}};A.propTypes={children:d.node,color:d.oneOf(["orange","green"]),onClick:d.func},A.defaultProps={children:null,color:"green",onClick:()=>{}};let v=A;const O=s.StyleSheet.create({baseButton:{top:"0",fontSize:"11px",padding:"3px 10px",backgroundRepeat:"repeat-x",borderColor:`
             rgba(0, 0, 0, 0.1)
             rgba(0, 0, 0, 0.1)
             rgba(0, 0, 0, 0.25)
         `,color:"#ffffff",borderRadius:"3px",lineHeight:"15px",cursor:"pointer",transition:"box-shadow ease-in-out 0.15s",appearance:"none",textDecoration:"none",textAlign:"center",":hover":{boxShadow:`0 1px 1px rgba(0, 0, 0, 0.35),
                 inset 0 0 50px 5px rgba(255, 255, 255, 0.2)`}},green:{border:"1px solid #7fab07",backgroundColor:"#80ac07",backgroundImage:"linear-gradient(to bottom, #8aba08, #719807)",":hover":{borderBottomColor:"#547105",backgroundColor:"#719807"}},orange:{border:"1px solid #d45704",backgroundColor:"#d55704",backgroundImage:"linear-gradient(to bottom, #e35d04, #c04f03)",":hover":{borderBottomColor:"#983e03",backgroundColor:"#c04f03"}}});v.__docgenInfo={description:"",methods:[],displayName:"SimpleButton",props:{children:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"node"},required:!1},color:{defaultValue:{value:'"green"',computed:!1},description:"",type:{name:"enum",value:[{value:'"orange"',computed:!1},{value:'"green"',computed:!1}]},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1}}};const{InlineIcon:j}=te,{MultiRenderer:le}=ae;class T extends p.Component{constructor(){super(...arguments),this._handleSelectMode=e=>{if(this.props.onChange){const t=e.target.value;this.props.onChange(t)}}}render(){return r.jsxs("label",{children:["Mode:"," ",r.jsxs("select",{value:this.props.currentMode,onChange:this._handleSelectMode,children:[r.jsx("option",{value:"edit",children:"Edit"}),r.jsx("option",{value:"preview",children:"Preview"}),r.jsx("option",{value:"json",children:"Dev-only JSON"})]})]})}}function P(o){return o.replace(/[A-Z]/g,e=>" "+e.toLowerCase())}function R(o){return o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}function $(o){return o.charAt(o.length-1)==="s"?o.slice(0,-1):o}function h(o){return["_multi",...o]}const z=({depth:o,...e})=>{const n=`h${Math.min(o,5)+1}`;return r.jsx(n,{...e})},I=o=>{const{shape:e,data:t,path:n,actions:i,name:l,controls:u,...y}=o,m=l||P(n[n.length-1]||""),w=r.jsx(me,{...y,shape:e,data:t,path:n,actions:i}),f=n.join(".");return e.type==="array"?r.jsx(de,{name:m,controls:u,path:n,shape:e,actions:i,children:w},f):e.type==="object"?r.jsx(ye,{name:m,controls:u,path:n,children:w},f):r.jsx(ue,{name:m,controls:u,path:n,shape:e,children:w},f)},ue=({name:o,controls:e,children:t,path:n,shape:i})=>{const u=(i.type==="content"||i.type==="hint")&&r.jsx("div",{className:s.css(a.containerHeader),children:r.jsx(z,{depth:n.length,className:s.css(a.containerTitle),children:R(o)})});return r.jsxs("div",{className:s.css(a.container),children:[r.jsxs("span",{className:s.css(a.row,a.rowHeading),children:[r.jsx("div",{className:s.css(a.columnLeft),children:r.jsxs("div",{className:"pod-title "+s.css(a.containerHeader),children:[r.jsx("div",{className:s.css(a.containerTitle),children:R(o)}),e]})}),r.jsx("div",{className:s.css(a.columnRight),children:u})]}),t]})},de=o=>{const{name:e,controls:t,children:n,path:i,shape:l,actions:u}=o;return r.jsxs("div",{className:s.css(a.container),children:[t&&r.jsx("div",{className:s.css(a.columnLeft,a.containerHeader),children:t}),r.jsx("div",{children:n}),r.jsx("div",{className:s.css(a.columnLeft),children:r.jsxs("a",{href:"javascript:void 0",onClick:()=>u.addArrayElement(i,l.elementShape),children:["Add a ",$(e)]})})]})},ye=({name:o,controls:e,children:t,path:n})=>{const i=r.jsxs("div",{className:s.css(a.containerHeader),children:[r.jsx(z,{depth:n.length,className:s.css(a.containerTitle),children:R(o)}),e]}),l=(o||e)&&r.jsx("div",{className:s.css(a.containerHeader,a.previewCollectionHeader),children:r.jsx(z,{depth:n.length,className:s.css(a.containerTitle),children:R(o)})}),u=i&&l;return r.jsxs("div",{className:s.css(a.container),children:[u&&r.jsxs("span",{className:s.css(a.row),children:[r.jsx("div",{className:s.css(a.columnLeft),children:i}),r.jsx("div",{className:s.css(a.columnRight),children:l})]}),r.jsx("div",{className:s.css(n.length>0&&a.contentIndent),children:t})]})},me=o=>{const{shape:e,data:t,...n}=o;return e.type==="content"?r.jsx(ge,{shape:e,data:t,...n}):e.type==="hint"?r.jsx(he,{shape:e,data:t,...n}):e.type==="tags"?r.jsx(pe,{shape:e,data:t,...n}):e.type==="array"?r.jsx(ce,{shape:e,data:t,...n}):e.type==="object"?r.jsx(be,{shape:e,data:t,...n}):null},F=o=>class extends p.Component{constructor(){super(...arguments),this.state={sticky:!1},this.updateStickiness=()=>{const n=ie.findDOMNode(this).offsetHeight,i=window.innerHeight,l=n>i;l!==this.state.sticky&&this.setState({sticky:l})}}componentDidMount(){this.stickynessTimer=setInterval(this.updateStickiness,1e3),this.updateStickiness()}componentWillUnmount(){clearInterval(this.stickynessTimer)}render(){return r.jsx(o,{...this.props,sticky:this.state.sticky})}},ge=F(o=>{const{data:e,path:t,actions:n,apiOptions:i,renderers:l,sticky:u}=o,y=r.jsx("div",{className:"framework-perseus",children:g(l).get(t)});return r.jsx("span",{children:r.jsxs("div",{className:s.css(a.row),children:[r.jsx("div",{className:s.css(a.columnLeft),children:r.jsx("div",{className:s.css(u&&a.sticky),children:r.jsx(H,{...e,onChange:m=>n.mergeValueAtPath(t,m),apiOptions:i})})}),r.jsx("div",{className:s.css(a.columnRight),children:r.jsx("div",{className:s.css(u&&a.sticky),children:y})})]})})}),he=F(o=>{const{data:e,path:t,actions:n,apiOptions:i,renderers:l,sticky:u}=o,y=r.jsx("div",{className:"framework-perseus",children:g(l).get(t)});return r.jsxs("div",{className:s.css(a.row),children:[r.jsx("div",{className:s.css(a.columnLeft),children:r.jsx("div",{className:s.css(u&&a.sticky),children:r.jsx(V,{...e,className:s.css(a.hintEditor),onChange:m=>n.mergeValueAtPath(t,m),apiOptions:i,showTitle:!1,showRemoveButton:!1,showMoveButtons:!1,onRemove:()=>{},onMove:m=>{},isFirst:!0,isLast:!0})})}),r.jsx("div",{className:s.css(a.columnRight),children:r.jsx("div",{className:s.css(u&&a.sticky),children:y})})]})}),pe=o=>{const{data:e,path:t,actions:n,apiOptions:i}=o,{GroupMetadataEditor:l}=i;return l==null?null:r.jsx("div",{className:s.css(a.columnLeft),children:r.jsx("div",{className:s.css(a.tagsEditor),children:r.jsx(l,{value:e,onChange:u=>n.setValueAtPath(t,u),showTitle:!1})})})},ce=o=>{const{shape:e,data:t,path:n,actions:i,...l}=o,u=P(n[n.length-1]),y=$(u),m=e.elementShape.type,w=m==="content"||m==="hint",f=t.map((U,c)=>{const k=n.concat(c),S=[c>0&&r.jsx("div",{className:s.css(a.control),children:r.jsx(v,{color:"orange",title:"Move up",onClick:()=>i.moveArrayElementUp(k),children:r.jsx("div",{className:s.css(a.verticalFlip),children:r.jsx(j,{...E})})})},"moveArrayElementUp"),c<t.length-1&&r.jsx("div",{className:s.css(a.control),children:r.jsx(v,{color:"orange",title:"Move down",onClick:()=>i.moveArrayElementDown(k),children:r.jsx(j,{...E})})},"moveArrayElementDown"),r.jsx("div",{className:s.css(a.control),children:r.jsx(v,{color:"orange",title:"Delete",onClick:()=>i.removeArrayElement(k),children:r.jsx(j,{...ne})})},"removeArrayElement")];return r.jsx("div",{className:s.css(a.arrayElement,!w&&a.arrayElementAndNotLeaf),children:p.createElement(I,{...l,key:c,shape:e.elementShape,data:U,path:k,actions:i,name:`${y} ${c+1}`,controls:S})},c)});return r.jsx("div",{children:f})},be=o=>{const{shape:e,data:t,path:n,...i}=o,l=Object.keys(e.shape).map(u=>r.jsx("div",{className:s.css(a.objectElement),children:r.jsx(I,{...i,shape:e.shape[u],data:t[u],path:n.concat(u)})},u));return r.jsx("div",{children:l})};class ve extends p.Component{constructor(){super(...arguments),this._renderLayout=()=>{const{Layout:e,apiOptions:t,item:n}=this.props;return r.jsx(e,{ref:i=>this.layout=i,item:n,apiOptions:t})},this._renderJson=()=>r.jsxs("div",{children:[r.jsx(T,{currentMode:this.props.editorMode,onChange:e=>this.props.onChange({editorMode:e})}),r.jsx(ee,{multiLine:!0,value:this.props.item,onChange:e=>this.props.onChange({item:e})})]}),this._renderPreview=()=>r.jsxs("div",{children:[r.jsx(T,{currentMode:this.props.editorMode,onChange:e=>this.props.onChange({editorMode:e})}),this._renderLayout()]}),this.mergeValueAtPath=(e,t)=>{this.props.onChange({item:g(this.props.item).merge(h(e),t).freeze()})},this.setValueAtPath=(e,t)=>{this.props.onChange({item:g(this.props.item).set(h(e),t).freeze()})},this.addArrayElement=(e,t)=>{const n=g(this.props.item).get(h(e)).length,i=e.concat(n),l=Z(t);this.props.onChange({item:g(this.props.item).set(h(i),l).freeze()})},this.removeArrayElement=e=>{this.props.onChange({item:g(this.props.item).del(h(e)).freeze()})},this.moveArrayElementDown=e=>{const n=e[e.length-1]+1,i=e.slice(0,-1).concat(n),l=g(this.props.item).get(h(e)),u=g(this.props.item).get(h(i));this.props.onChange({item:g(this.props.item).set(h(e),u).set(h(i),l).freeze()})},this.moveArrayElementUp=e=>{const t=e[e.length-1],n=e.slice(0,-1).concat(t-1);this.moveArrayElementDown(n)},this._renderEdit=()=>{const e={...Y.defaults,...this.props.apiOptions},{item:t}=this.props,n=this.props.Layout.shape;return r.jsxs("div",{className:"perseus-multirenderer-editor",children:[r.jsx(T,{currentMode:this.props.editorMode,onChange:i=>this.props.onChange({editorMode:i})}),r.jsx(le,{item:t,shape:n,apiOptions:e,dependencies:{analytics:{onAnalyticsEvent:async()=>{}},useVideo:()=>{}},children:({renderers:i})=>r.jsx(I,{shape:n,data:X(t),path:[],actions:this,apiOptions:e,renderers:i})})]})},this.score=()=>{if(this.layout)return this.layout.score()},this.getSerializedState=()=>{if(this.layout)return this.layout.getSerializedState()},this.restoreSerializedState=e=>{this.layout&&this.layout.restoreSerializedState(e)},this._renderContent=()=>{switch(this.props.editorMode){case"json":return this._renderJson();case"preview":return this._renderPreview();case"edit":return this._renderEdit();default:return r.jsx(T,{currentMode:this.props.editorMode,onChange:e=>this.props.onChange({editorMode:e})})}}}render(){return r.jsx("div",{id:"perseus",children:this._renderContent()})}}const a=s.StyleSheet.create({container:{},editor:{width:"100%"},treePreview:{position:"relative"},verticalFlip:{transform:"scaleY(-1)"},control:{marginLeft:12},containerHeader:{alignItems:"flex-end",display:"flex",flexDirection:"row"},previewCollectionHeader:{marginBottom:16},containerTitle:{flexGrow:1,margin:0},contentIndent:{marginLeft:8},hintEditor:{paddingBottom:0},arrayElement:{marginBottom:16},arrayElementAndNotLeaf:{borderBottom:"1px solid #ccc",":first-child":{borderTop:"1px solid #ccc",paddingTop:16}},objectElement:{marginBottom:16},tagsEditor:{border:"1px solid #ddd",padding:"5px 10px"},row:{display:"flex",position:"relative"},columnLeft:{width:360,marginRight:30,position:"relative"},columnRight:{flex:1,marginLeft:30,position:"relative"},sticky:{position:"sticky",top:33},rowHeading:{position:"sticky",backgroundColor:"white",width:"100%",zIndex:101,top:-1}});ve.__docgenInfo={description:"",methods:[{name:"_renderLayout",docblock:null,modifiers:[],params:[],returns:null},{name:"_renderJson",docblock:null,modifiers:[],params:[],returns:null},{name:"_renderPreview",docblock:null,modifiers:[],params:[],returns:null},{name:"mergeValueAtPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}},{name:"newValue",optional:!1,type:{name:"unknown"}}],returns:null},{name:"setValueAtPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}},{name:"newValue",optional:!1,type:{name:"unknown"}}],returns:null},{name:"addArrayElement",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}},{name:"shape",optional:!1,type:{name:"union",raw:`| ContentShape
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
}`,signature:{properties:[{key:{name:"string"},value:{name:"Shape",required:!0}}]},required:!0},description:"Each property of an ObjectNode has its own shape, which is specified\nunder the corresponding key in the `shape` property."}]}}],alias:"Shape"}}],returns:null},{name:"removeArrayElement",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}}],returns:null},{name:"moveArrayElementDown",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}}],returns:null},{name:"moveArrayElementUp",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}}],returns:null},{name:"_renderEdit",docblock:null,modifiers:[],params:[],returns:null},{name:"score",docblock:null,modifiers:[],params:[],returns:null},{name:"getSerializedState",docblock:null,modifiers:[],params:[],returns:null},{name:"restoreSerializedState",docblock:null,modifiers:[],params:[{name:"state",optional:!1,type:{name:"any"}}],returns:null},{name:"_renderContent",docblock:null,modifiers:[],params:[],returns:null}],displayName:"MultiRendererEditor",props:{Layout:{required:!0,tsType:{name:"intersection",raw:"React.ComponentType<any> & LayoutStatics",elements:[{name:"ReactComponentType",raw:"React.ComponentType<any>",elements:[{name:"any"}]},{name:"LayoutStatics"}]},description:""},apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}`,signature:{properties:[{key:"isArticle",value:{name:"boolean",required:!1}},{key:"onFocusChange",value:{name:"signature",type:"function",raw:`(
    newFocusPath: FocusPath,
    oldFocusPath: FocusPath,
    keypadHeight?: number,
    focusedElement?: HTMLElement,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1}},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
answered correctly and should no longer be interactive.`},{key:"answerableCallback",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1}},{key:"getAnotherHint",value:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}},required:!1}},{key:"interactionCallback",value:{name:"signature",type:"function",raw:"(widgetData: {[widgetId: string]: any}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{[widgetId: string]: any}",signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"widgetData"}],return:{name:"void"}},required:!1}},{key:"groupAnnotator",value:{name:"signature",type:"function",raw:"(groupNumber: number, widgetId: string) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"groupNumber"},{type:{name:"string"},name:"widgetId"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`A function that takes in the relative problem number (starts at
0 and is incremented for each group widget), and the ID of the
group widget, then returns a react component that will be added
immediately above the renderer in the group widget. If the
function returns null, no annotation will be added.`},{key:"imagePlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If imagePlaceholder is set, Perseus will render the placeholder instead
of the image node.`},{key:"widgetPlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If widgetPlaceholder is set, Perseus will render the placeholder instead
of the widget node.`},{key:"baseElements",value:{name:"signature",type:"object",raw:`{
    /**
     * The <Link /> component provided here must adhere to the same
     * interface as React's base <a /> component.
     */
    Link: React.ComponentType<any>;
}`,signature:{properties:[{key:"Link",value:{name:"ReactComponentType",raw:"React.ComponentType<any>",elements:[{name:"any"}],required:!0},description:`The <Link /> component provided here must adhere to the same
interface as React's base <a /> component.`}]},required:!1},description:`Base React elements that can be used in place of the standard DOM
DOM elements. For example, when provided, <Link /> will be used
in place of <a />. This allows clients to provide pre-styled
components or components with custom behavior.`},{key:"imagePreloader",value:{name:"signature",type:"function",raw:"(dimensions: Dimensions) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]}},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
to display while an image is loading.`},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(args: TrackInteractionArgs) => void",signature:{arguments:[{type:{name:"intersection",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
} & Partial<TrackingGradedGroupExtraArguments> &
    Partial<TrackingSequenceExtraArguments>`,elements:[{name:"signature",type:"object",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"correct",value:{name:"boolean",required:!1}}]}},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    status: "correct" | "incorrect" | "invalid";
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]}}],raw:"Partial<TrackingGradedGroupExtraArguments>"},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    visible: number;
}`,signature:{properties:[{key:"visible",value:{name:"number",required:!0}}]}}],raw:"Partial<TrackingSequenceExtraArguments>"}]},name:"args"}],return:{name:"void"}},required:!1},description:`A function that is called when the user has interacted with a widget. It
also includes any extra parameters that the originating widget provided.
This is used for keeping track of widget interactions.`},{key:"customKeypad",value:{name:"boolean",required:!1},description:`A boolean that indicates whether or not a custom keypad is
being used.  For mobile web this will be the ProvidedKeypad
component.  In this situation we use the MathInput component
from the math-input repo instead of the existing perseus math
input components.`},{key:"nativeKeypadProxy",value:{name:"signature",type:"function",raw:"(blur: () => void) => KeypadAPI",signature:{arguments:[{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"blur"}],return:{name:"KeypadAPI"}},required:!1},description:`If this is provided, it is called instead of appending an instance
of \`math-input\`'s keypad to the body. This is used by the native
apps so they can have the keypad be defined on the native side.
It is called with an function that, when called, blurs the input,
and is expected to return an object of the shape
keypadElementPropType from math-input/src/prop-types.js.`},{key:"isMobile",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile styling."},{key:"setDrawingAreaAvailable",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1},description:`A function, called with a bool indicating whether use of the
drawing area (scratchpad) should be allowed/disallowed.

Previously handled by \`Khan.scratchpad.enable/disable\``},{key:"hintProgressColor",value:{name:"string",required:!1},description:"The color used for the hint progress indicator (eg. 1 / 3)"},{key:"canScrollPage",value:{name:"boolean",required:!1},description:`Whether this Renderer is allowed to auto-scroll the rest of the
page. For example, if this is enabled, the most recently used
radio widget will attempt to keep the "selected" answer in view
after entering review mode.

Defaults to \`false\`.`},{key:"crossOutEnabled",value:{name:"boolean",required:!1},description:`Whether to enable the cross-out feature on multiple-choice radio
widgets. This allows users to note which answers they believe to
be incorrect, to find the answer by process of elimination.

We plan to roll this out to all call sites eventually, but for
now we have this flag, to add it to Generalized Test Prep first.`},{key:"editorChangeDelay",value:{name:"number",required:!1},description:`The value in milliseconds by which the local state of content
in a editor is delayed before propagated to a prop. For example,
when text is typed in the text area of an Editor component,
there will be a delay equal to the value of \`editorChangeDelay\`
before the change is propagated. This is added for better
responsiveness of the editor when used in certain contexts such
as StructuredItem exercises where constant re-rendering for each
keystroke caused text typed in the text area to appear in it
only after a good few seconds.`},{key:"flags",value:{name:"signature",type:"object",raw:`{
    /**
     * Flags related to the interactive-graph Mafs migration.
     *
     * Add values to the relevant array to create new flags.
     */
    mafs?:
        | false
        | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
              [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
          });
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:`| false
| ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
      [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
  })`,elements:[{name:"literal",value:"false"},{name:"unknown"}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}]},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
after they have been transformed by the widget's transform function.
This is useful for when we need to know how a widget has shuffled its
the available choices.`}]}}],raw:`Readonly<{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},description:""},item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]}},description:""},editorMode:{required:!0,tsType:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        // used in MutirenderEditor
        item?: Item;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => unknown | null | undefined,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    // used in MutirenderEditor
    item?: Item;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
    // Translatable Markdown content to be rendered.  May include references to
    // widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
    // For each image found in this content, there can be an entry in the
    // \`images\` dict (below) with the key being the image's url which defines
    // additional attributes for the image.
    content: string;
    // A dictionary of {[widgetName]: Widget} to be referenced from the content field
    widgets: PerseusWidgetsMap;
    // Used in the PerseusGradedGroup widget.  A list of "tags" that are keys that represent other content in the system.  Not rendered to the user.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    metadata?: ReadonlyArray<string>;
    // A dictionary of {[imageUrl]: PerseusImageDetail}.
    images: {
        [key: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}],required:!1}},{key:"metadata",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [key: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}],required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"item",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}],required:!1},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `phet-simulation ${number}`]: PhetSimulationWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}],required:!1},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],required:!1}}]}},{name:"intersection",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"intersection",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => unknown | null | undefined",signature:{arguments:[],return:{name:"union",raw:"unknown | null | undefined",elements:[{name:"unknown"},{name:"null"},{name:"undefined"}]}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}}},description:""}}};K(re);B(G);J();Q();
