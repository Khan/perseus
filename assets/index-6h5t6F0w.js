import{r as s,a as C}from"./index-TT1qJ6UJ.js";import{l as m}from"./index-awljIyHI.js";function v(r,e){if(r==null)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(e.includes(n))continue;t[n]=r[n]}return t}function c(){return c=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)({}).hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r},c.apply(null,arguments)}function _(r){const e=[];if(r)if(Array.isArray(r))for(const t of r)e.push(..._(t));else e.push(r);else return e;return e}function E(r){const e=[],t=[];if(!r)return{style:{},className:""};const n=typeof global<"u"&&global.SNAPSHOT_INLINE_APHRODITE;_(r).forEach(a=>{const i=a._definition;if(i!=null)if(n){const d={};for(const[h,u]of Object.entries(i))d[h.replace(/-[a-z]/g,g=>g[1].toUpperCase())]=u;t.push(d)}else e.push(a);else t.push(a)});const o=Object.assign({},...t);if(t.length>0&&!n){const a=m.StyleSheet.create({inlineStyles:o});e.push(a.inlineStyles)}return{style:n?o:{},className:m.css(...e)}}const N=["children","style","tag","testId"],F=/^h[1-6]$/,w=m.StyleSheet.create({text:{WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},header:{marginTop:0,marginBottom:0}}),H=s.forwardRef(function(e,t){let{children:n,style:o,tag:a="span",testId:i}=e,d=v(e,N);const h=F.test(a),u=E([w.text,h&&w.header,o]),g=d.className?[d.className,u.className].join(" "):u.className;return s.createElement(a,c({},d,{style:u.style,className:g,"data-testid":i,ref:t}),n)}),P=["className","style"];function y(r,e){return s.forwardRef((t,n)=>{const{className:o,style:a}=t,i=v(t,P),d=typeof r=="string"?O[r]:null,{className:h,style:u}=E([d,e,a]);return s.createElement(r,c({},i,{ref:n,className:[h,o].filter(Boolean).join(" "),style:u}))})}const O=m.StyleSheet.create({button:{margin:0,"::-moz-focus-inner":{border:0}}}),T=["testId","tag"],p=m.StyleSheet.create({default:{alignItems:"stretch",borderWidth:0,borderStyle:"solid",boxSizing:"border-box",display:"flex",flexDirection:"column",margin:0,padding:0,position:"relative",zIndex:0,minHeight:0,minWidth:0}}),$=y("div",p.default),D=y("article",p.default),q=y("aside",p.default),A=y("nav",p.default),j=y("section",p.default),M=s.forwardRef(function(e,t){const{testId:n,tag:o="div"}=e,a=v(e,T),i=c({},a,{"data-testid":n});switch(o){case"article":return s.createElement(D,c({},i,{ref:t}));case"aside":return s.createElement(q,c({},i,{ref:t}));case"nav":return s.createElement(A,c({},i,{ref:t}));case"section":return s.createElement(j,c({},i,{ref:t}));case"div":return s.createElement($,c({},i,{ref:t}));default:throw Error(`${o} is not an allowed value for the 'tag' prop`)}});let l=function(r){return r.Root="root",r.Initial="initial",r.Standard="standard",r}({});const f=s.createContext(l.Root);f.displayName="RenderStateContext";class W extends s.Component{constructor(...e){super(...e),this.state={mounted:!1},this._isTheRootComponent=!1}componentDidMount(){this._isTheRootComponent&&this.setState({mounted:!0})}_renderAsRootComponent(){const{mounted:e}=this.state,{children:t,placeholder:n}=this.props;return this._isTheRootComponent=!0,e?s.createElement(f.Provider,{value:l.Standard},t()):n?s.createElement(f.Provider,{value:l.Initial},n()):null}_maybeRender(e){const{children:t,placeholder:n}=this.props;switch(e){case l.Root:return this._renderAsRootComponent();case l.Initial:return n?n():null;case l.Standard:return t()}{var o;return console.log(`We got a render state we don't understand: "${(o=JSON.stringify(e))!=null?o:""}"`),this._maybeRender(l.Root)}}render(){return s.createElement(f.Consumer,null,e=>this._maybeRender(e))}}class S{constructor(e){this._uniqueFactoryName=void 0,this.get=n=>{const o=n.toLowerCase();if(!this._hasValidIdChars(n))throw new Error(`Invalid identifier key: ${n}`);return`${this._uniqueFactoryName}-${o}`},e=typeof e=="string"?e:"";const t=e.toLowerCase();if(!this._hasValidIdChars(t))throw new Error(`Invalid factory scope: ${e}`);this._uniqueFactoryName=`uid-${t}-${S._factoryUniquenessCounter++}`}_hasValidIdChars(e){return typeof e=="string"?!/\s/.test(e):!1}}S._factoryUniquenessCounter=0;class R{get(e){return e}}R.Default=new R;var b=R.Default;class z extends s.Component{constructor(...e){super(...e),this._idFactory=void 0}_performRender(e){const{children:t,mockOnFirstRender:n,scope:o}=this.props;return e?n?t(b):null:(this._idFactory||(this._idFactory=new S(o)),t(this._idFactory))}render(){return s.createElement(W,{placeholder:()=>this._performRender(!0)},()=>this._performRender(!1))}}class I extends s.Component{renderChildren(e){const{id:t,children:n}=this.props,o=e?e.get(I.defaultId):t;if(!o)throw new Error("Did not get an identifier factory nor a id prop");return n(o)}render(){const{id:e,scope:t}=this.props;return e?this.renderChildren():s.createElement(z,{scope:t,mockOnFirstRender:!0},n=>this.renderChildren(n))}}I.defaultId="wb-id";const x=()=>s.useContext(f),B=r=>{const e=x(),t=s.useRef(null);if(e===l.Root)throw new Error("Components using useUniqueIdWithMock() should be descendants of <RenderStateRoot>");return e===l.Initial?b:(t.current||(t.current=new S(r)),t.current)};function K(r){const e=s.useRef(r);return e.current=r,e}const G=r=>{s.useEffect(r,[])},{useEffect:U,useState:L}=C,J=({children:r,throwIfNested:e=!0})=>{const[t,n]=L(!0),o=x();if(U(()=>{n(!1)},[]),o!==l.Root){if(e)throw new Error("There's already a <RenderStateRoot> above this instance in the render tree.  This instance should be removed.");return s.createElement(s.Fragment,null,r)}const a=t?l.Initial:l.Standard;return s.createElement(f.Provider,{value:a},r)};export{I,J as R,H as T,z as U,M as V,c as _,v as a,y as b,G as c,K as d,B as u};