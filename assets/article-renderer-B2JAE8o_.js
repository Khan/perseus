var C=Object.defineProperty;var y=(i,r,e)=>r in i?C(i,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[r]=e;var n=(i,r,e)=>(y(i,typeof r!="symbol"?r+"":r,e),e);import{r as g,aJ as P,aK as x,A as _,aB as f,af as b,aL as O,E,a6 as A,j as d,aM as R,a1 as k,aN as M,aO as N}from"./iframe-C-wjKudE.js";class m extends g.Component{constructor(e){super(e);n(this,"_currentFocus");n(this,"sectionRenderers",[]);n(this,"_handleFocusChange",(e,s)=>{e?this._setCurrentFocus(e):this._onRendererBlur(s)});n(this,"_setCurrentFocus",e=>{const{keypadElement:s,apiOptions:l}=this.props,{isMobile:u}=l,a=this._currentFocus;this._currentFocus=e;let c=!1,p;if(this._currentFocus){const[t,...o]=this._currentFocus;c=this.sectionRenderers[t].getInputPaths().some(F=>f.inputPathsEqual(F,o)),p=this.sectionRenderers[t].getDOMNodeForPath(o)}const{onFocusChange:h}=this.props.apiOptions;h&&setTimeout(()=>{const t=s==null?void 0:s.getDOMNode(),o=t&&c?t.getBoundingClientRect().height:0;h(this._currentFocus,a,o,c?p:null)},0),s&&u&&(c?s.activate():s.dismiss())});n(this,"_onRendererBlur",e=>{const s=this._currentFocus;f.inputPathsEqual(e,s)&&setTimeout(()=>{f.inputPathsEqual(this._currentFocus,s)&&this._setCurrentFocus(null)})});n(this,"blur",()=>{if(this._currentFocus){const[e,...s]=this._currentFocus;this.sectionRenderers[e].blurPath(s)}});n(this,"_sections",()=>{const e=Array.isArray(this.props.json)?this.props.json:[this.props.json];if(b().JIPT.useJIPT){const s=[];for(const l of e)O.parseToArray(l.content).forEach(u=>{s.push({...l,content:u})});return s}return e})}componentDidMount(){this._currentFocus=null}shouldComponentUpdate(e){return e!==this.props}render(){const e={..._.defaults,...this.props.apiOptions,isArticle:!0},s=E({"framework-perseus":!0,"perseus-article":!0,[A.MOBILE]:e.isMobile}),l=this._sections().map((u,a)=>d.jsx("div",{className:"clearfix",children:d.jsx(R,{widgets:u.widgets,problemNum:0,children:({userInput:c,handleUserInput:p,initializeUserInput:h})=>g.createElement(k,{...u,userInput:c,handleUserInput:p,initializeUserInput:h,ref:t=>{t&&(this.sectionRenderers[a]=t)},key:a,keypadElement:this.props.keypadElement,apiOptions:{...e,onFocusChange:(t,o)=>{this._handleFocusChange(t&&[a].concat(t),o&&[a].concat(o))}},linterContext:M(this.props.linterContext,"article"),legacyPerseusLint:this.props.legacyPerseusLint,strings:this.context.strings})})},a));return d.jsx("div",{className:s,children:d.jsx(N.Provider,{value:this.props.dependencies,children:l})})}}n(m,"contextType",P),n(m,"defaultProps",{apiOptions:_.defaults,useNewStyles:!1,linterContext:x});m.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null},{name:"oldFocusPath",optional:!1,type:null}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:null}],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"_sections",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ArticleRenderer",props:{apiOptions:{defaultValue:{value:`{
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
}`,computed:!1},required:!1}}};export{m as A};
