var C=Object.defineProperty;var F=(a,r,e)=>r in a?C(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var n=(a,r,e)=>(F(a,typeof r!="symbol"?r+"":r,e),e);import{j as h}from"./jsx-runtime-BT65X5dW.js";import{r as g}from"./index-C6mWTJJr.js";import{l as P,J as b,R as x,p as R}from"./renderer-D-6ot1Lf.js";import{c as A}from"./index-D7h-teXI.js";import{a as O}from"./i18n-context-BT3CWGFO.js";import{g as E,D as k}from"./dependencies-BsVPGK1s.js";import{A as y,C as D}from"./perseus-api-DFYLNfT-.js";import{U as d}from"./util-CaCM5cO7.js";class f extends g.Component{constructor(e){super(e);n(this,"_currentFocus");n(this,"sectionRenderers",[]);n(this,"_handleFocusChange",(e,s)=>{e?this._setCurrentFocus(e):this._onRendererBlur(s)});n(this,"_setCurrentFocus",e=>{const{keypadElement:s,apiOptions:i}=this.props,{isMobile:l}=i,o=this._currentFocus;this._currentFocus=e;let t=!1,u;if(this._currentFocus){const[c,...p]=this._currentFocus;t=this.sectionRenderers[c].getInputPaths().some(_=>d.inputPathsEqual(_,p)),u=this.sectionRenderers[c].getDOMNodeForPath(p)}const{onFocusChange:m}=this.props.apiOptions;m&&setTimeout(()=>{const c=s==null?void 0:s.getDOMNode(),p=c&&t?c.getBoundingClientRect().height:0;m(this._currentFocus,o,p,t?u:null)},0),s&&l&&(t?s.activate():s.dismiss())});n(this,"_onRendererBlur",e=>{const s=this._currentFocus;d.inputPathsEqual(e,s)&&setTimeout(()=>{d.inputPathsEqual(this._currentFocus,s)&&this._setCurrentFocus(null)})});n(this,"blur",()=>{if(this._currentFocus){const[e,...s]=this._currentFocus;this.sectionRenderers[e].blurPath(s)}});n(this,"_sections",()=>{const e=Array.isArray(this.props.json)?this.props.json:[this.props.json];if(E().JIPT.useJIPT){const s=[];for(const i of e)b.parseToArray(i.content).forEach(l=>{s.push({...i,content:l})});return s}return e})}componentDidMount(){this._currentFocus=null}shouldComponentUpdate(e){return e!==this.props}render(){const e={...y.defaults,...this.props.apiOptions,isArticle:!0},s=A({"framework-perseus":!0,"perseus-article":!0,[D.MOBILE]:e.isMobile}),i=this._sections().map((l,o)=>h.jsx("div",{className:"clearfix",children:g.createElement(x,{...l,ref:t=>{t&&(this.sectionRenderers[o]=t)},key:o,key_:o,keypadElement:this.props.keypadElement,apiOptions:{...e,onFocusChange:(t,u)=>{this._handleFocusChange(t&&[o].concat(t),u&&[o].concat(u))}},linterContext:R(this.props.linterContext,"article"),legacyPerseusLint:this.props.legacyPerseusLint,strings:this.context.strings})},o));return h.jsx("div",{className:s,children:h.jsx(k.Provider,{value:this.props.dependencies,children:i})})}}n(f,"contextType",O),n(f,"defaultProps",{apiOptions:y.defaults,useNewStyles:!1,linterContext:P});f.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null},{name:"oldFocusPath",optional:!1,type:null}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:null}],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"_sections",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ArticleRenderer",props:{apiOptions:{defaultValue:{value:`{
    isArticle: false,
    isMobile: false,
    isMobileApp: false,
    onFocusChange: function () {},
    GroupMetadataEditor: StubTagEditor,
    showAlignmentOptions: false,
    readOnly: false,
    groupAnnotator: function (): null {
        return null;
    },
    baseElements: {
        Link: (
            props: any,
        ): React.ReactElement<React.ComponentProps<"a">> => {
            // eslint-disable-next-line jsx-a11y/anchor-has-content -- TODO(LEMS-2871): Address a11y error
            return <a {...props} />;
        },
    },
    setDrawingAreaAvailable: function () {},
    canScrollPage: false,
    crossOutEnabled: false,
    editorChangeDelay: 0,
}`,computed:!1},required:!1},useNewStyles:{defaultValue:{value:"false",computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1}}};export{f as A};
