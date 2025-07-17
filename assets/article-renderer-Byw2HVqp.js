var y=Object.defineProperty;var C=(o,r,e)=>r in o?y(o,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[r]=e;var n=(o,r,e)=>(C(o,typeof r!="symbol"?r+"":r,e),e);import{r as g,aJ as P,aK as b,A as _,aB as h,af as x,aL as O,F as R,a6 as k,j as d,R as A,aM as E,aN as M}from"./iframe-dtRUXA0K.js";class f extends g.Component{constructor(e){super(e);n(this,"_currentFocus");n(this,"sectionRenderers",[]);n(this,"_handleFocusChange",(e,s)=>{e?this._setCurrentFocus(e):this._onRendererBlur(s)});n(this,"_setCurrentFocus",e=>{const{keypadElement:s,apiOptions:i}=this.props,{isMobile:l}=i,a=this._currentFocus;this._currentFocus=e;let t=!1,u;if(this._currentFocus){const[c,...p]=this._currentFocus;t=this.sectionRenderers[c].getInputPaths().some(F=>h.inputPathsEqual(F,p)),u=this.sectionRenderers[c].getDOMNodeForPath(p)}const{onFocusChange:m}=this.props.apiOptions;m&&setTimeout(()=>{const c=s==null?void 0:s.getDOMNode(),p=c&&t?c.getBoundingClientRect().height:0;m(this._currentFocus,a,p,t?u:null)},0),s&&l&&(t?s.activate():s.dismiss())});n(this,"_onRendererBlur",e=>{const s=this._currentFocus;h.inputPathsEqual(e,s)&&setTimeout(()=>{h.inputPathsEqual(this._currentFocus,s)&&this._setCurrentFocus(null)})});n(this,"blur",()=>{if(this._currentFocus){const[e,...s]=this._currentFocus;this.sectionRenderers[e].blurPath(s)}});n(this,"_sections",()=>{const e=Array.isArray(this.props.json)?this.props.json:[this.props.json];if(x().JIPT.useJIPT){const s=[];for(const i of e)O.parseToArray(i.content).forEach(l=>{s.push({...i,content:l})});return s}return e})}componentDidMount(){this._currentFocus=null}shouldComponentUpdate(e){return e!==this.props}render(){const e={..._.defaults,...this.props.apiOptions,isArticle:!0},s=R({"framework-perseus":!0,"perseus-article":!0,[k.MOBILE]:e.isMobile}),i=this._sections().map((l,a)=>d.jsx("div",{className:"clearfix",children:g.createElement(A,{...l,ref:t=>{t&&(this.sectionRenderers[a]=t)},key:a,key_:a,keypadElement:this.props.keypadElement,apiOptions:{...e,onFocusChange:(t,u)=>{this._handleFocusChange(t&&[a].concat(t),u&&[a].concat(u))}},linterContext:E(this.props.linterContext,"article"),legacyPerseusLint:this.props.legacyPerseusLint,strings:this.context.strings})},a));return d.jsx("div",{className:s,children:d.jsx(M.Provider,{value:this.props.dependencies,children:i})})}}n(f,"contextType",P),n(f,"defaultProps",{apiOptions:_.defaults,useNewStyles:!1,linterContext:b});f.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null},{name:"oldFocusPath",optional:!1,type:null}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:null}],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"_sections",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ArticleRenderer",props:{apiOptions:{defaultValue:{value:`{
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
    editorChangeDelay: 0,
}`,computed:!1},required:!1},useNewStyles:{defaultValue:{value:"false",computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [],
    stack: [],
}`,computed:!1},required:!1}}};export{f as A};
