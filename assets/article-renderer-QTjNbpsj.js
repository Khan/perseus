import{J as y,l as C,R as F,p as _}from"./renderer-Hg-eJGH1.js";import{c as P}from"./index-dnMhQZ-1.js";import{r as l}from"./index-6oxdNXpR.js";import{a as b}from"./i18n-context-Q5gDzbF3.js";import{g as E,D as O}from"./dependencies-CP7Uh8Kq.js";import{A as m,C as k}from"./perseus-api-Y55S7ZPk.js";import{U as p}from"./util-ghoLYzZ7.js";const c=class c extends l.Component{constructor(o){super(o),this.sectionRenderers=[],this._handleFocusChange=(t,e)=>{t?this._setCurrentFocus(t):this._onRendererBlur(e)},this._setCurrentFocus=t=>{const{keypadElement:e,apiOptions:a}=this.props,{isMobile:s}=a,n=this._currentFocus;this._currentFocus=t;let r=!1,d;if(this._currentFocus){const[i,...u]=this._currentFocus;r=this.sectionRenderers[i].getInputPaths().some(g=>p.inputPathsEqual(g,u)),d=this.sectionRenderers[i].getDOMNodeForPath(u)}const{onFocusChange:f}=this.props.apiOptions;f&&setTimeout(()=>{const i=e==null?void 0:e.getDOMNode(),u=i&&r?i.getBoundingClientRect().height:0;f(this._currentFocus,n,u,r?d:null)},0),e&&s&&(r?e.activate():e.dismiss())},this._onRendererBlur=t=>{const e=this._currentFocus;p.inputPathsEqual(t,e)&&setTimeout(()=>{p.inputPathsEqual(this._currentFocus,e)&&this._setCurrentFocus(null)})},this.blur=()=>{if(this._currentFocus){const[t,...e]=this._currentFocus;this.sectionRenderers[t].blurPath(e)}},this._sections=()=>{const t=Array.isArray(this.props.json)?this.props.json:[this.props.json];if(E().JIPT.useJIPT){const e=[];for(const a of t)y.parseToArray(a.content).forEach(s=>{e.push({...a,content:s})});return e}return t}}componentDidMount(){this._currentFocus=null}shouldComponentUpdate(o){return o!==this.props}render(){const o={...m.defaults,...this.props.apiOptions,isArticle:!0},t=P({"framework-perseus":!0,"perseus-article":!0,[k.MOBILE]:o.isMobile}),e=this._sections().map((a,s)=>l.createElement("div",{key:s,className:"clearfix"},l.createElement(F,{...a,ref:n=>{n&&(this.sectionRenderers[s]=n)},key:s,key_:s,keypadElement:this.props.keypadElement,apiOptions:{...o,onFocusChange:(n,r)=>{this._handleFocusChange(n&&[s].concat(n),r&&[s].concat(r))}},linterContext:_(this.props.linterContext,"article"),legacyPerseusLint:this.props.legacyPerseusLint,strings:this.context.strings})));return l.createElement("div",{className:t},l.createElement(O.Provider,{value:this.props.dependencies},e))}};c.contextType=b,c.defaultProps={apiOptions:m.defaults,useNewStyles:!1,linterContext:C};let h=c;h.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null},{name:"oldFocusPath",optional:!1,type:null}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocusPath",optional:!1,type:null}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:null}],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"_sections",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ArticleRenderer",props:{apiOptions:{defaultValue:{value:`{
    isArticle: false,
    isMobile: false,
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
}`,computed:!1},required:!1}}};export{h as A};
