import{a as _}from"./version-akiLXZts.js";import"./article-editor-_xQHuY9Y.js";import"./device-framer-MUDr0WgQ.js";import"./viewport-resizer-hvS1XVYJ.js";import{j as n}from"./jsx-runtime-63Ea5SlK.js";import{P as d}from"./index-0C4KXdeC.js";import{r as y}from"./index-6oxdNXpR.js";import{_ as D}from"./jquery-yG1GhClm.js";import{R as A,W as G}from"./structured-item-diff-S-hpba-M.js";import{H as K}from"./editor-page-qGS3OIGf.js";import{E as $}from"./editor-sMtre1dB.js";import{w as z}from"./article-renderer-MPYDO1co.js";import"./util-AYeX86gl.js";import"./phet-simulation-_7qOO4_B.js";import{c as B,r as U,a as J,d as Q}from"./renderer-3XfatrQ2.js";import{A as Y}from"./perseus-api-1-ethIrW.js";import{l as p,g as Z,e as X}from"./perseus-item-7ZhsvZ2s.js";import"./hints-renderer-rbO_NW6-.js";import"./base-radio-S7-M79GH.js";import"./button-group-G5CZaedn.js";import"./graph-4ZDD3NK_.js";import"./svg-image-FcZanvM1.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-BIPwuHvF.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-ILg8RrvB.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-ogh82yD8.js";import"./range-input-w5Z3sPK5.js";import"./text-input-e6f7u9S5.js";import"./text-list-editor-aj1SAzcA.js";import"./dependencies-CP7Uh8Kq.js";import"./index-k-0mNqHS.js";import"./i18n-context-fsWEgybQ.js";import"./index-smZ6iCr_.js";import{J as ee,A as ne}from"./register-all-widgets-and-editors-for-testing-__2zr6rw.js";import{c as te}from"./components-2XngBvY8.js";import{c as M,i as re}from"./icon-paths-5JCXzGsq.js";import{M as ae}from"./multi-items-l780CU-j.js";import{l as i}from"./index-awljIyHI.js";import{F as se}from"./index-9gkyvru-.js";/* empty css                       */const ie="@khanacademy/perseus-editor",oe="__lib_version__";_(ie,oe);const T=d.shape({content:d.string,images:d.objectOf(d.any),widgets:d.objectOf(d.any)}),f=class f extends y.Component{constructor(){super(...arguments),this.state=f._stateFromProps(this.props)}UNSAFE_componentWillReceiveProps(e){this.setState(f._stateFromProps(e))}render(){const{before:e,after:t}=this.state,r=Math.max(e.length,t.length),s=D.times(r,l=>n.jsx(A,{before:l<e.length?e[l]:void 0,after:l<t.length?t[l]:void 0,title:`Section ${l+1}`,showAlignmentOptions:!0,showSeparator:l<r-1},l));return n.jsx("div",{className:"framework-perseus",children:s})}};f.propTypes={after:d.oneOfType([T,d.arrayOf(T)]).isRequired,before:d.oneOfType([T,d.arrayOf(T)]).isRequired},f._stateFromProps=e=>{const{before:t,after:r}=e;return{before:Array.isArray(t)?t:[t],after:Array.isArray(r)?r:[r]}};let R=f;R.__docgenInfo={description:"",methods:[{name:"_stateFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:null}],returns:null}],displayName:"ArticleDiff",props:{after:{description:"",type:{name:"union",value:[{name:"custom",raw:"rendererProps"},{name:"arrayOf",value:{name:"custom",raw:"rendererProps"}}]},required:!0},before:{description:"",type:{name:"union",value:[{name:"custom",raw:"rendererProps"},{name:"arrayOf",value:{name:"custom",raw:"rendererProps"}}]},required:!0}}};const W=d.shape({question:d.shape({}).isRequired,answerArea:d.shape({}).isRequired,hints:d.arrayOf(d.any).isRequired}),S=class S extends y.Component{render(){const{before:e,after:t}=this.props,r=Math.max(e.hints.length,t.hints.length),s=n.jsx(A,{before:e.question,after:t.question,title:"Question",showAlignmentOptions:!1,showSeparator:!0}),l=n.jsx(G,{before:e.answerArea,after:t.answerArea,title:"Question extras"}),u=D.times(r,function(m){return n.jsx(A,{before:m<e.hints.length?e.hints[m]:void 0,after:m<t.hints.length?t.hints[m]:void 0,title:`Hint ${m+1}`,showAlignmentOptions:!1,showSeparator:m<r-1},m)});return n.jsxs("div",{className:"framework-perseus",children:[s,l,u&&n.jsx("div",{className:"diff-separator"}),u]})}};S.propTypes={after:W.isRequired,before:W.isRequired};let N=S;N.__docgenInfo={description:"",methods:[],displayName:"ItemDiff",props:{after:{description:"",type:{name:"custom",raw:"itemProps.isRequired"},required:!1},before:{description:"",type:{name:"custom",raw:"itemProps.isRequired"},required:!1}}};const q=class q extends y.Component{render(){const{children:e,color:t,onClick:r,...s}=this.props;return n.jsx("div",{className:i.css(x.baseButton,t==="green"&&x.green,t==="orange"&&x.orange),onClick:r,...s,children:e})}};q.propTypes={children:d.node,color:d.oneOf(["orange","green"]),onClick:d.func},q.defaultProps={children:null,color:"green",onClick:()=>{}};let w=q;const x=i.StyleSheet.create({baseButton:{top:"0",fontSize:"11px",padding:"3px 10px",backgroundRepeat:"repeat-x",borderColor:`
             rgba(0, 0, 0, 0.1)
             rgba(0, 0, 0, 0.1)
             rgba(0, 0, 0, 0.25)
         `,color:"#ffffff",borderRadius:"3px",lineHeight:"15px",cursor:"pointer",transition:"box-shadow ease-in-out 0.15s",appearance:"none",textDecoration:"none",textAlign:"center",":hover":{boxShadow:`0 1px 1px rgba(0, 0, 0, 0.35),
                 inset 0 0 50px 5px rgba(255, 255, 255, 0.2)`}},green:{border:"1px solid #7fab07",backgroundColor:"#80ac07",backgroundImage:"linear-gradient(to bottom, #8aba08, #719807)",":hover":{borderBottomColor:"#547105",backgroundColor:"#719807"}},orange:{border:"1px solid #d45704",backgroundColor:"#d55704",backgroundImage:"linear-gradient(to bottom, #e35d04, #c04f03)",":hover":{borderBottomColor:"#983e03",backgroundColor:"#c04f03"}}});w.__docgenInfo={description:"",methods:[],displayName:"SimpleButton",props:{children:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"node"},required:!1},color:{defaultValue:{value:'"green"',computed:!1},description:"",type:{name:"enum",value:[{value:'"orange"',computed:!1},{value:'"green"',computed:!1}]},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1}}};const{InlineIcon:j}=te,{MultiRenderer:le}=ae;class C extends y.Component{constructor(){super(...arguments),this._handleSelectMode=e=>{if(this.props.onChange){const t=e.target.value;this.props.onChange(t)}}}render(){return n.jsxs("label",{children:["Mode:"," ",n.jsxs("select",{value:this.props.currentMode,onChange:this._handleSelectMode,children:[n.jsx("option",{value:"edit",children:"Edit"}),n.jsx("option",{value:"preview",children:"Preview"}),n.jsx("option",{value:"json",children:"Dev-only JSON"})]})]})}}function O(o){return o.replace(/[A-Z]/g,e=>" "+e.toLowerCase())}function P(o){return o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}function L(o){return o.charAt(o.length-1)==="s"?o.slice(0,-1):o}function h(o){return["_multi",...o]}const E=({depth:o,...e})=>{const r=`h${Math.min(o,5)+1}`;return n.jsx(r,{...e})},I=o=>{const{shape:e,data:t,path:r,actions:s,name:l,controls:u,...m}=o,c=l||O(r[r.length-1]||""),b=n.jsx(ce,{...m,shape:e,data:t,path:r,actions:s}),v=r.join(".");return e.type==="array"?n.jsx(de,{name:c,controls:u,path:r,shape:e,actions:s,children:b},v):e.type==="object"?n.jsx(me,{name:c,controls:u,path:r,children:b},v):n.jsx(ue,{name:c,controls:u,path:r,shape:e,children:b},v)},ue=({name:o,controls:e,children:t,path:r,shape:s})=>{const u=(s.type==="content"||s.type==="hint")&&n.jsx("div",{className:i.css(a.containerHeader),children:n.jsx(E,{depth:r.length,className:i.css(a.containerTitle),children:P(o)})});return n.jsxs("div",{className:i.css(a.container),children:[n.jsxs("span",{className:i.css(a.row,a.rowHeading),children:[n.jsx("div",{className:i.css(a.columnLeft),children:n.jsxs("div",{className:"pod-title "+i.css(a.containerHeader),children:[n.jsx("div",{className:i.css(a.containerTitle),children:P(o)}),e]})}),n.jsx("div",{className:i.css(a.columnRight),children:u})]}),t]})},de=o=>{const{name:e,controls:t,children:r,path:s,shape:l,actions:u}=o;return n.jsxs("div",{className:i.css(a.container),children:[t&&n.jsx("div",{className:i.css(a.columnLeft,a.containerHeader),children:t}),n.jsx("div",{children:r}),n.jsx("div",{className:i.css(a.columnLeft),children:n.jsxs("a",{href:"javascript:void 0",onClick:()=>u.addArrayElement(s,l.elementShape),children:["Add a ",L(e)]})})]})},me=({name:o,controls:e,children:t,path:r})=>{const s=n.jsxs("div",{className:i.css(a.containerHeader),children:[n.jsx(E,{depth:r.length,className:i.css(a.containerTitle),children:P(o)}),e]}),l=(o||e)&&n.jsx("div",{className:i.css(a.containerHeader,a.previewCollectionHeader),children:n.jsx(E,{depth:r.length,className:i.css(a.containerTitle),children:P(o)})}),u=s&&l;return n.jsxs("div",{className:i.css(a.container),children:[u&&n.jsxs("span",{className:i.css(a.row),children:[n.jsx("div",{className:i.css(a.columnLeft),children:s}),n.jsx("div",{className:i.css(a.columnRight),children:l})]}),n.jsx("div",{className:i.css(r.length>0&&a.contentIndent),children:t})]})},ce=o=>{const{shape:e,data:t,...r}=o;return e.type==="content"?n.jsx(pe,{shape:e,data:t,...r}):e.type==="hint"?n.jsx(he,{shape:e,data:t,...r}):e.type==="tags"?n.jsx(ye,{shape:e,data:t,...r}):e.type==="array"?n.jsx(ge,{shape:e,data:t,...r}):e.type==="object"?n.jsx(fe,{shape:e,data:t,...r}):null},V=o=>class extends y.Component{constructor(){super(...arguments),this.state={sticky:!1},this.updateStickiness=()=>{const r=se.findDOMNode(this).offsetHeight,s=window.innerHeight,l=r>s;l!==this.state.sticky&&this.setState({sticky:l})}}componentDidMount(){this.stickynessTimer=setInterval(this.updateStickiness,1e3),this.updateStickiness()}componentWillUnmount(){clearInterval(this.stickynessTimer)}render(){return n.jsx(o,{...this.props,sticky:this.state.sticky})}},pe=V(o=>{const{data:e,path:t,actions:r,apiOptions:s,renderers:l,sticky:u}=o,m=n.jsx("div",{className:"framework-perseus",children:p(l).get(t)});return n.jsx("span",{children:n.jsxs("div",{className:i.css(a.row),children:[n.jsx("div",{className:i.css(a.columnLeft),children:n.jsx("div",{className:i.css(u&&a.sticky),children:n.jsx($,{...e,onChange:c=>r.mergeValueAtPath(t,c),apiOptions:s})})}),n.jsx("div",{className:i.css(a.columnRight),children:n.jsx("div",{className:i.css(u&&a.sticky),children:m})})]})})}),he=V(o=>{const{data:e,path:t,actions:r,apiOptions:s,renderers:l,sticky:u}=o,m=n.jsx("div",{className:"framework-perseus",children:p(l).get(t)});return n.jsxs("div",{className:i.css(a.row),children:[n.jsx("div",{className:i.css(a.columnLeft),children:n.jsx("div",{className:i.css(u&&a.sticky),children:n.jsx(K,{...e,className:i.css(a.hintEditor),onChange:c=>r.mergeValueAtPath(t,c),apiOptions:s,showTitle:!1,showRemoveButton:!1,showMoveButtons:!1,onRemove:()=>{},onMove:c=>{},isFirst:!0,isLast:!0})})}),n.jsx("div",{className:i.css(a.columnRight),children:n.jsx("div",{className:i.css(u&&a.sticky),children:m})})]})}),ye=o=>{const{data:e,path:t,actions:r,apiOptions:s}=o,{GroupMetadataEditor:l}=s;return l==null?null:n.jsx("div",{className:i.css(a.columnLeft),children:n.jsx("div",{className:i.css(a.tagsEditor),children:n.jsx(l,{value:e,onChange:u=>r.setValueAtPath(t,u),showTitle:!1})})})},ge=o=>{const{shape:e,data:t,path:r,actions:s,...l}=o,u=O(r[r.length-1]),m=L(u),c=e.elementShape.type,b=c==="content"||c==="hint",v=t.map((F,g)=>{const k=r.concat(g),H=[g>0&&n.jsx("div",{className:i.css(a.control),children:n.jsx(w,{color:"orange",title:"Move up",onClick:()=>s.moveArrayElementUp(k),children:n.jsx("div",{className:i.css(a.verticalFlip),children:n.jsx(j,{...M})})})},"moveArrayElementUp"),g<t.length-1&&n.jsx("div",{className:i.css(a.control),children:n.jsx(w,{color:"orange",title:"Move down",onClick:()=>s.moveArrayElementDown(k),children:n.jsx(j,{...M})})},"moveArrayElementDown"),n.jsx("div",{className:i.css(a.control),children:n.jsx(w,{color:"orange",title:"Delete",onClick:()=>s.removeArrayElement(k),children:n.jsx(j,{...re})})},"removeArrayElement")];return n.jsx("div",{className:i.css(a.arrayElement,!b&&a.arrayElementAndNotLeaf),children:y.createElement(I,{...l,key:g,shape:e.elementShape,data:F,path:k,actions:s,name:`${m} ${g+1}`,controls:H})},g)});return n.jsx("div",{children:v})},fe=o=>{const{shape:e,data:t,path:r,...s}=o,l=Object.keys(e.shape).map(u=>n.jsx("div",{className:i.css(a.objectElement),children:n.jsx(I,{...s,shape:e.shape[u],data:t[u],path:r.concat(u)})},u));return n.jsx("div",{children:l})};class we extends y.Component{constructor(){super(...arguments),this._renderLayout=()=>{const{Layout:e,apiOptions:t,item:r}=this.props;return n.jsx(e,{ref:s=>this.layout=s,item:r,apiOptions:t})},this._renderJson=()=>n.jsxs("div",{children:[n.jsx(C,{currentMode:this.props.editorMode,onChange:e=>this.props.onChange({editorMode:e})}),n.jsx(ee,{multiLine:!0,value:this.props.item,onChange:e=>this.props.onChange({item:e})})]}),this._renderPreview=()=>n.jsxs("div",{children:[n.jsx(C,{currentMode:this.props.editorMode,onChange:e=>this.props.onChange({editorMode:e})}),this._renderLayout()]}),this.mergeValueAtPath=(e,t)=>{this.props.onChange({item:p(this.props.item).merge(h(e),t).freeze()})},this.setValueAtPath=(e,t)=>{this.props.onChange({item:p(this.props.item).set(h(e),t).freeze()})},this.addArrayElement=(e,t)=>{const r=p(this.props.item).get(h(e)).length,s=e.concat(r),l=Z(t);this.props.onChange({item:p(this.props.item).set(h(s),l).freeze()})},this.removeArrayElement=e=>{this.props.onChange({item:p(this.props.item).del(h(e)).freeze()})},this.moveArrayElementDown=e=>{const r=e[e.length-1]+1,s=e.slice(0,-1).concat(r),l=p(this.props.item).get(h(e)),u=p(this.props.item).get(h(s));this.props.onChange({item:p(this.props.item).set(h(e),u).set(h(s),l).freeze()})},this.moveArrayElementUp=e=>{const t=e[e.length-1],r=e.slice(0,-1).concat(t-1);this.moveArrayElementDown(r)},this._renderEdit=()=>{const e={...Y.defaults,...this.props.apiOptions},{item:t}=this.props,r=this.props.Layout.shape;return n.jsxs("div",{className:"perseus-multirenderer-editor",children:[n.jsx(C,{currentMode:this.props.editorMode,onChange:s=>this.props.onChange({editorMode:s})}),n.jsx(le,{item:t,shape:r,apiOptions:e,dependencies:{analytics:{onAnalyticsEvent:async()=>{}},useVideo:()=>{}},children:({renderers:s})=>n.jsx(I,{shape:r,data:X(t),path:[],actions:this,apiOptions:e,renderers:s})})]})},this.score=()=>{if(this.layout)return this.layout.score()},this.getSerializedState=()=>{if(this.layout)return this.layout.getSerializedState()},this.restoreSerializedState=e=>{this.layout&&this.layout.restoreSerializedState(e)},this._renderContent=()=>{switch(this.props.editorMode){case"json":return this._renderJson();case"preview":return this._renderPreview();case"edit":return this._renderEdit();default:return n.jsx(C,{currentMode:this.props.editorMode,onChange:e=>this.props.onChange({editorMode:e})})}}}render(){return n.jsx("div",{id:"perseus",children:this._renderContent()})}}const a=i.StyleSheet.create({container:{},editor:{width:"100%"},treePreview:{position:"relative"},verticalFlip:{transform:"scaleY(-1)"},control:{marginLeft:12},containerHeader:{alignItems:"flex-end",display:"flex",flexDirection:"row"},previewCollectionHeader:{marginBottom:16},containerTitle:{flexGrow:1,margin:0},contentIndent:{marginLeft:8},hintEditor:{paddingBottom:0},arrayElement:{marginBottom:16},arrayElementAndNotLeaf:{borderBottom:"1px solid #ccc",":first-child":{borderTop:"1px solid #ccc",paddingTop:16}},objectElement:{marginBottom:16},tagsEditor:{border:"1px solid #ddd",padding:"5px 10px"},row:{display:"flex",position:"relative"},columnLeft:{width:360,marginRight:30,position:"relative"},columnRight:{flex:1,marginLeft:30,position:"relative"},sticky:{position:"sticky",top:33},rowHeading:{position:"sticky",backgroundColor:"white",width:"100%",zIndex:101,top:-1}});we.__docgenInfo={description:"",methods:[{name:"_renderLayout",docblock:null,modifiers:[],params:[],returns:null},{name:"_renderJson",docblock:null,modifiers:[],params:[],returns:null},{name:"_renderPreview",docblock:null,modifiers:[],params:[],returns:null},{name:"mergeValueAtPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}},{name:"newValue",optional:!1,type:{name:"unknown"}}],returns:null},{name:"setValueAtPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}},{name:"newValue",optional:!1,type:{name:"unknown"}}],returns:null},{name:"addArrayElement",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",alias:"Path"}},{name:"shape",optional:!1,type:{name:"union",raw:`| ContentShape
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    callback?: () => void,
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
    /**
     * Translatable Markdown content to be rendered.  May include references to
     * widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
     * For each image found in this content, there can be an entry in the
     * \`images\` dict (below) with the key being the image's url which defines
     * additional attributes for the image.
     */
    content: string;
    /**
     * A dictionary of {[widgetName]: Widget} to be referenced from the content
     * field.
     */
    widgets: PerseusWidgetsMap;
    // Used in the PerseusGradedGroup widget.  A list of "tags" that are keys
    // that represent other content in the system.  Not rendered to the user.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    metadata?: ReadonlyArray<string>;
    /**
     * A dictionary of {[imageUrl]: PerseusImageDetail}.
     */
    images: {
        [imageUrl: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0},description:`Translatable Markdown content to be rendered.  May include references to
widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
For each image found in this content, there can be an entry in the
\`images\` dict (below) with the key being the image's url which defines
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    major: number;
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}}},description:""}}};B(ne);U(z);J();Q();
