import{a as T,j as f,F as $e}from"./jsx-runtime-FVsy8kgq.js";import{l as Be}from"./article-renderer-uXYWGyOY.js";import"./jquery-yG1GhClm.js";import"./util-XR-uqOh-.js";import"./phet-simulation-a-CqgrmB.js";import"./version-akiLXZts.js";import"./dependencies-d8cZibFS.js";import"./perseus-api-Nq3s7IMx.js";import"./perseus-item-iWjoDclg.js";import"./hints-renderer-w8fwv-TJ.js";import"./renderer-shnhjTaa.js";import"./base-radio-Sv3eKype.js";import{c as Fe}from"./components-3azNG_ZX.js";import"./index-k-0mNqHS.js";import"./i18n-context-H_mTdYuW.js";import"./svg-image-h96M64n1.js";import"./index-IIMKO4_x.js";import{V as L,b as ne,u as Ne,a as V,_ as y}from"./index-6h5t6F0w.js";import{c as Se,S as De,O as ae}from"./answer-choices-MX0vy2-k.js";import{T as Le}from"./index-QCAhLhLD.js";import{S as K,a as Me}from"./index-qUyqkRvh.js";import{s as u,c as s,b as U}from"./index-deFLJwr4.js";import{a as re,H as Pe,B as Ae,L as pe}from"./index-h_CiYGGb.js";import{l as R}from"./index-awljIyHI.js";import{r as a}from"./index-TT1qJ6UJ.js";import{S as me}from"./scrollless-number-text-field-U5Bx_xXb.js";import{C as Oe}from"./index-o3wWn3Y5.js";import{P as le}from"./index-xuPsLuPk.js";import{C as We}from"./color-select-vQ-VRkdQ.js";import{B as ze}from"./choice-Yxd0I4UE.js";import{w as Ue,c as we,L as Ce}from"./react-router-dom-W_e8xVUu.js";import{m as Ke,c as qe,u as He,T as je}from"./index-rfN0X25E.js";const xe=i=>{const{coord:e,labels:t,error:r,style:n,onChange:o}=i,[d,l]=a.useState([e[0].toString(),e[1].toString()]);a.useEffect(()=>{l([e[0].toString(),e[1].toString()])},[e]);function h(c,g){const v=[...d];if(v[g]=c,l(v),isNaN(+c)||c==="")return;const p=[...e];p[g]=+c,o(p)}return T(L,{style:[W.row,n],children:[T(re,{tag:"label",style:W.row,children:[t?t[0]:"x coord",f(K,{size:u.xxSmall_6}),f(me,{value:d[0],onChange:c=>h(c,0),style:[W.textField,r?W.errorField:void 0]})]}),f(K,{size:u.medium_16}),T(re,{tag:"label",style:W.row,children:[t?t[1]:"y coord",f(K,{size:u.xxSmall_6}),f(me,{value:d[1],onChange:c=>h(c,1),style:[W.textField,r?W.errorField:void 0]})]})]})},W=R.StyleSheet.create({row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:u.xxxLarge_64},errorField:{borderColor:s.red,backgroundColor:s.fadedRed8}}),Ve=xe;xe.__docgenInfo={description:"",methods:[],displayName:"CoordinatePairInput",props:{coord:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},labels:{required:!1,tsType:{name:"tuple",raw:"[string, string]",elements:[{name:"string"},{name:"string"}]},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"StyleType"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newCoord: Coord) => void",signature:{arguments:[{type:{name:"Coord"},name:"newCoord"}],return:{name:"void"}}},description:""}}};function Q(){return Q=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[r]=t[r])}return i},Q.apply(this,arguments)}function ke(i,e){if(i==null)return{};var t={},r=Object.keys(i),n,o;for(o=0;o<r.length;o++)n=r[o],!(e.indexOf(n)>=0)&&(t[n]=i[n]);return t}const Ge=["children","id","initialExpandedIndex","allowMultipleExpanded","caretPosition","cornerKind","animated","style"],Qe=ne("ul"),Xe=6;a.forwardRef(function(e,t){const{children:r,id:n,initialExpandedIndex:o,allowMultipleExpanded:d=!0,caretPosition:l,cornerKind:h="rounded",animated:c,style:g}=e,v=ke(e,Ge),p=Array(r.length).fill(!1);o!==void 0&&(p[o]=!0);const[w,S]=a.useState(p),m=Array(r.length).fill(null),C=r.length<=Xe,I=(x,b)=>{const k=d?[...w]:Array(r.length).fill(!1),_=!w[x];k[x]=_,S(k),b&&b(_)},F=x=>{var b,k,_,N;const D=m.findIndex(B=>B.current===document.activeElement);if(D!==-1)switch(x.key){case"ArrowUp":x.preventDefault();const B=(D+r.length-1)%r.length;(b=m[B].current)==null||b.focus();break;case"ArrowDown":x.preventDefault();const M=(D+1)%r.length;(k=m[M].current)==null||k.focus();break;case"Home":x.preventDefault(),(_=m[0].current)==null||_.focus();break;case"End":x.preventDefault(),(N=m[r.length-1].current)==null||N.focus();break}};return a.createElement(Qe,Q({style:[Je.wrapper,g],onKeyDown:F},v,{ref:t}),r.map((x,b)=>{const{caretPosition:k,cornerKind:_,onToggle:N,animated:D}=x.props,B=a.createRef();m[b]=B;const $=b===0,M=b===r.length-1;return a.createElement("li",{key:b,id:n},a.cloneElement(x,{animated:D??c,caretPosition:k??l,cornerKind:_??h,expanded:w[b],onToggle:()=>I(b,N),isFirstSection:$,isLastSection:M,isRegion:C,ref:B}))}))});const Je=R.StyleSheet.create({wrapper:{boxSizing:"border-box",listStyle:"none",padding:0,width:"100%"}});function Ye(i,e,t,r){switch(i){case"rounded-per-section":return{roundedTop:!0,roundedBottom:!r};case"rounded":return{roundedTop:e,roundedBottom:t&&!r};default:return{roundedTop:!1,roundedBottom:!1}}}const Ze=a.forwardRef(function(e,t){const{id:r,header:n,caretPosition:o,cornerKind:d,collapsible:l=!0,expanded:h,animated:c,onClick:g,sectionContentUniqueId:v,headerStyle:p,tag:w="h2",testId:S,isFirstSection:m,isLastSection:C}=e,I=typeof n=="string",{roundedTop:F,roundedBottom:x}=Ye(d,m,C,h);return a.createElement(Pe,{tag:w,style:E.heading},a.createElement(Oe,{id:r,"aria-expanded":h,"aria-controls":v,onClick:g,disabled:!l,testId:S?`${S}-header`:void 0,style:[E.headerWrapper,c&&E.headerWrapperWithAnimation,o==="start"&&E.headerWrapperCaretStart,F&&E.roundedTop,x&&E.roundedBottom,p,!l&&E.disabled],ref:t},()=>a.createElement(a.Fragment,null,a.createElement(L,{style:[E.headerContent,I&&E.headerString]},I?a.createElement(L,{style:[o==="end"?E.headerStringCaretEnd:E.headerStringCaretStart]},n):n),l&&a.createElement(le,{icon:Se,color:s.offBlack64,size:"small",style:[c&&E.iconWithAnimation,o==="start"?E.iconStart:E.iconEnd,h&&E.iconExpanded],testId:S?`${S}-caret-icon`:void 0}))))}),J=u.small_12-1,ge="300ms",E=R.StyleSheet.create({heading:{minWidth:0,marginTop:0},headerWrapper:{display:"flex",flexDirection:"row",alignItems:"center",overflow:"hidden",minWidth:"auto",width:"100%",position:"relative",zIndex:1,":active":{outline:`2px solid ${s.activeBlue}`},":hover":{outline:`2px solid ${s.blue}`},":focus":{boxShadow:`0 0 0 2px ${s.blue}`},":focus:not(:focus-visible)":{boxShadow:"none"},":focus-visible":{outline:`2px solid ${s.blue}`}},headerWrapperWithAnimation:{transition:`border-radius ${ge}`},headerWrapperCaretStart:{flexDirection:"row-reverse"},roundedTop:{borderStartStartRadius:J,borderStartEndRadius:J},roundedBottom:{borderEndStartRadius:J,borderEndEndRadius:J},headerContent:{flexGrow:1,textAlign:"start"},headerString:{paddingTop:u.medium_16,paddingBottom:u.medium_16},headerStringCaretEnd:{paddingInlineEnd:u.small_12,paddingInlineStart:u.medium_16},headerStringCaretStart:{paddingInlineEnd:u.medium_16,paddingInlineStart:u.small_12},iconWithAnimation:{transition:`transform ${ge}`},iconExpanded:{transform:"rotate(180deg)"},iconStart:{marginInlineStart:u.medium_16},iconEnd:{marginInlineEnd:u.medium_16},disabled:{pointerEvents:"none",color:"inherit",":focus":{boxShadow:`0 0 0 2px ${s.offBlack32}`},":focus:not(:focus-visible)":{boxShadow:"none"},":focus-visible":{outline:`2px solid ${s.offBlack32}`}}}),et=["children","id","header","collapsible","expanded","animated","onToggle","caretPosition","cornerKind","style","headerStyle","tag","testId","isFirstSection","isLastSection","isRegion"],tt=a.forwardRef(function(e,t){const{children:r,id:n,header:o,collapsible:d,expanded:l,animated:h=!1,onToggle:c,caretPosition:g="end",cornerKind:v="rounded",style:p,headerStyle:w,tag:S,testId:m,isFirstSection:C=!0,isLastSection:I=!0,isRegion:F=!0}=e,x=ke(e,et),[b,k]=a.useState(l??!1),_=l!==void 0&&c,N=Ne(),D=n??N.get("accordion-section"),B=n?`${n}-header`:N.get("accordion-section-header"),$=N.get("accordion-section-content"),M=rt(v,C,I),fe=()=>{_?c(!l):(k(!b),c&&c(!b))};let q;return d===!1?q=!0:q=_?l:b,a.createElement(L,Q({id:D,style:[A.wrapper,h&&A.wrapperWithAnimation,M.wrapper,q?A.wrapperExpanded:A.wrapperCollapsed,p],testId:m},x),a.createElement(Ze,{id:B,header:o,caretPosition:g,cornerKind:v,collapsible:d,expanded:q,animated:h,onClick:fe,sectionContentUniqueId:$,headerStyle:w,tag:S,testId:m,isFirstSection:C,isLastSection:I,ref:t}),a.createElement(L,{id:$,role:F?"region":void 0,"aria-labelledby":B,style:[A.contentWrapper,q?A.contentWrapperExpanded:A.conentWrapperCollapsed,M.contentWrapper],testId:m?`${m}-content-panel`:void 0},typeof r=="string"?a.createElement(Ae,{style:A.stringContent},r):r))}),A=R.StyleSheet.create({wrapper:{display:"grid",position:"static",boxSizing:"border-box",backgroundColor:s.white},wrapperWithAnimation:{transition:"grid-template-rows 300ms"},wrapperCollapsed:{gridTemplateRows:"min-content 0fr"},wrapperExpanded:{gridTemplateRows:"min-content 1fr"},contentWrapper:{overflow:"hidden"},conentWrapperCollapsed:{visibility:"hidden"},contentWrapperExpanded:{visibility:"visible"},stringContent:{padding:u.medium_16}}),Y={},rt=(i,e,t)=>{const r=`${i}-${e.toString()}-${t.toString()}`;if(Y[r])return Y[r];let n=Object.freeze({}),o=Object.freeze({}),d=Object.freeze({}),l=Object.freeze({});i==="square"&&(n={border:`1px solid ${s.offBlack16}`,borderBottom:"none",borderRadius:0},t&&(l={borderBottom:`1px solid ${s.offBlack16}`})),i==="rounded"&&(n={border:`1px solid ${s.offBlack16}`,borderBottom:"none"},e&&(d={borderStartStartRadius:u.small_12,borderStartEndRadius:u.small_12}),t&&(l={borderBottom:`1px solid ${s.offBlack16}`,borderEndStartRadius:u.small_12,borderEndEndRadius:u.small_12},o={borderEndEndRadius:u.small_12,borderEndStartRadius:u.small_12})),i==="rounded-per-section"&&(n={border:`1px solid ${s.offBlack16}`,borderRadius:u.small_12,marginBottom:u.medium_16},o={borderEndEndRadius:u.small_12,borderEndStartRadius:u.small_12});const h={wrapper:Q({},n,d,l),contentWrapper:o};return Y[r]=R.StyleSheet.create(h),Y[r]},Re=i=>{const{children:e,header:t,expanded:r,containerStyle:n,panelStyle:o,onToggle:d}=i;return f(L,{className:"perseus-editor-accordion",children:f(tt,{expanded:r,onToggle:d,style:[se.container,n],headerStyle:se.accordionHeader,header:t,children:f(L,{style:[se.accordionPanel,o],children:e})})})},se=R.StyleSheet.create({container:{backgroundColor:s.fadedBlue8,marginTop:u.xSmall_8},accordionHeader:{padding:u.small_12,paddingInlineEnd:0,height:u.xxLarge_48},accordionPanel:{paddingTop:u.xxSmall_6,paddingBottom:u.xxxSmall_4,paddingLeft:u.small_12,paddingRight:u.small_12}}),nt=Re;Re.__docgenInfo={description:"",methods:[],displayName:"PerseusEditorAccordion",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactNode | React.ReactNode[]",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"}]},description:""},header:{required:!0,tsType:{name:"union",raw:"string | React.ReactElement",elements:[{name:"string"},{name:"ReactReactElement",raw:"React.ReactElement"}]},description:""},expanded:{required:!1,tsType:{name:"boolean"},description:""},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""},panelStyle:{required:!1,tsType:{name:"StyleType"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""}}};function Ee(i){const e=[];if(i)if(Array.isArray(i))for(const t of i)e.push(...Ee(t));else e.push(i);else return e;return e}function Ie(i){const e=[],t=[];if(!i)return{style:{},className:""};const r=typeof global<"u"&&global.SNAPSHOT_INLINE_APHRODITE;Ee(i).forEach(o=>{const d=o._definition;if(d!=null)if(r){const l={};for(const[h,c]of Object.entries(d))l[h.replace(/-[a-z]/g,g=>g[1].toUpperCase())]=c;t.push(l)}else e.push(o);else t.push(o)});const n=Object.assign({},...t);if(t.length>0&&!r){const o=R.StyleSheet.create({inlineStyles:n});e.push(o.inlineStyles)}return{style:r?n:{},className:R.css(...e)}}const ot=["children","style","tag","testId"],it=/^h[1-6]$/,ye=R.StyleSheet.create({text:{WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},header:{marginTop:0,marginBottom:0}});a.forwardRef(function(e,t){let{children:r,style:n,tag:o="span",testId:d}=e,l=V(e,ot);const h=it.test(o),c=Ie([ye.text,h&&ye.header,n]),g=l.className?[l.className,c.className].join(" "):c.className;return a.createElement(o,y({},l,{style:c.style,className:g,"data-testid":d,ref:t}),r)});const at=["className","style"];function O(i,e){return a.forwardRef((t,r)=>{const{className:n,style:o}=t,d=V(t,at),l=typeof i=="string"?st[i]:null,{className:h,style:c}=Ie([l,e,o]);return a.createElement(i,y({},d,{ref:r,className:[h,n].filter(Boolean).join(" "),style:c}))})}const st=R.StyleSheet.create({button:{margin:0,"::-moz-focus-inner":{border:0}}}),lt=["testId","tag"],X=R.StyleSheet.create({default:{alignItems:"stretch",borderWidth:0,borderStyle:"solid",boxSizing:"border-box",display:"flex",flexDirection:"column",margin:0,padding:0,position:"relative",zIndex:0,minHeight:0,minWidth:0}}),dt=O("div",X.default),ct=O("article",X.default),ut=O("aside",X.default),ht=O("nav",X.default),ft=O("section",X.default);a.forwardRef(function(e,t){const{testId:r,tag:n="div"}=e,o=V(e,lt),d=y({},o,{"data-testid":r});switch(n){case"article":return a.createElement(ct,y({},d,{ref:t}));case"aside":return a.createElement(ut,y({},d,{ref:t}));case"nav":return a.createElement(ht,y({},d,{ref:t}));case"section":return a.createElement(ft,y({},d,{ref:t}));case"div":return a.createElement(dt,y({},d,{ref:t}));default:throw Error(`${n} is not an allowed value for the 'tag' prop`)}});let z=function(i){return i.Root="root",i.Initial="initial",i.Standard="standard",i}({});const te=a.createContext(z.Root);te.displayName="RenderStateContext";class pt extends a.Component{constructor(...e){super(...e),this.state={mounted:!1},this._isTheRootComponent=!1}componentDidMount(){this._isTheRootComponent&&this.setState({mounted:!0})}_renderAsRootComponent(){const{mounted:e}=this.state,{children:t,fallback:r}=this.props;return this._isTheRootComponent=!0,e?a.createElement(te.Provider,{value:z.Standard},t()):r?a.createElement(te.Provider,{value:z.Initial},r()):null}_maybeRender(e){const{children:t,fallback:r}=this.props;switch(e){case z.Root:return this._renderAsRootComponent();case z.Initial:return r?r():null;case z.Standard:return t()}{var n;return console.log(`We got a render state we don't understand: "${(n=JSON.stringify(e))!=null?n:""}"`),this._maybeRender(z.Root)}}render(){return a.createElement(te.Consumer,null,e=>this._maybeRender(e))}}class oe{constructor(e){this._uniqueFactoryName=void 0,this.get=r=>{const n=r.toLowerCase();if(!this._hasValidIdChars(r))throw new Error(`Invalid identifier key: ${r}`);return`${this._uniqueFactoryName}-${n}`},e=typeof e=="string"?e:"";const t=e.toLowerCase();if(!this._hasValidIdChars(t))throw new Error(`Invalid factory scope: ${e}`);this._uniqueFactoryName=`uid-${t}-${oe._factoryUniquenessCounter++}`}_hasValidIdChars(e){return typeof e=="string"?!/\s/.test(e):!1}}oe._factoryUniquenessCounter=0;class de{get(e){return e}}de.Default=new de;var mt=de.Default;class gt extends a.Component{constructor(...e){super(...e),this._idFactory=void 0}_performRender(e){const{children:t,mockOnFirstRender:r,scope:n}=this.props;return e?r?t(mt):null:(this._idFactory||(this._idFactory=new oe(n)),t(this._idFactory))}render(){return a.createElement(pt,{fallback:()=>this._performRender(!0)},()=>this._performRender(!1))}}class ce extends a.Component{renderChildren(e){const{id:t,children:r}=this.props,n=e?e.get(ce.defaultId):t;if(!n)throw new Error("Did not get an identifier factory nor a id prop");return r(n)}render(){const{id:e,scope:t}=this.props;return e?this.renderChildren():a.createElement(gt,{scope:t,mockOnFirstRender:!0},r=>this.renderChildren(r))}}ce.defaultId="wb-id";const be=i=>{switch(i){case"link":return{triggerOnEnter:!0,triggerOnSpace:!1};case"checkbox":case"radio":case"listbox":return{triggerOnEnter:!1,triggerOnSpace:!0};case"button":case"menuitem":case"menu":case"option":default:return{triggerOnEnter:!0,triggerOnSpace:!0}}},yt={onClick:()=>{},onMouseEnter:()=>{},onMouseLeave:()=>{},onMouseDown:()=>{},onMouseUp:()=>{},onTouchStart:()=>{},onTouchEnd:()=>{},onTouchCancel:()=>{},onKeyDown:()=>{},onKeyUp:()=>{}},H={enter:13,space:32},ve={hovered:!1,focused:!1,pressed:!1,waiting:!1};class ue extends a.Component{static getDerivedStateFromProps(e,t){return e.disabled?y({},ve,{focused:t.focused}):null}constructor(e){super(e),this.waitingForClick=void 0,this.enterClick=void 0,this.handleClick=t=>{const{onClick:r=void 0,beforeNav:n=void 0,safeWithNav:o=void 0}=this.props;this.enterClick||((r||n||o)&&(this.waitingForClick=!1),this.runCallbackAndMaybeNavigate(t))},this.handleMouseEnter=t=>{this.waitingForClick||this.setState({hovered:!0})},this.handleMouseLeave=()=>{this.waitingForClick||this.setState({hovered:!1,pressed:!1,focused:!1})},this.handleMouseDown=t=>{this.props.onMouseDown&&this.props.onMouseDown(t),this.setState({pressed:!0})},this.handleMouseUp=t=>{this.props.onMouseUp&&this.props.onMouseUp(t),this.setState({pressed:!1,focused:!1})},this.handleTouchStart=()=>{this.setState({pressed:!0})},this.handleTouchEnd=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleTouchCancel=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleKeyDown=t=>{const{onKeyDown:r,role:n}=this.props;r&&r(t);const o=t.which||t.keyCode,{triggerOnEnter:d,triggerOnSpace:l}=be(n);d&&o===H.enter||l&&o===H.space?(t.preventDefault(),this.setState({pressed:!0})):!d&&o===H.enter&&(this.enterClick=!0)},this.handleKeyUp=t=>{const{onKeyUp:r,role:n}=this.props;r&&r(t);const o=t.which||t.keyCode,{triggerOnEnter:d,triggerOnSpace:l}=be(n);d&&o===H.enter||l&&o===H.space?(this.setState({pressed:!1,focused:!0}),this.runCallbackAndMaybeNavigate(t)):!d&&o===H.enter&&(this.enterClick=!1)},this.handleFocus=t=>{const{onFocus:r}=this.props;this.setState({focused:!0},()=>{r&&r(t)})},this.handleBlur=t=>{this.setState({focused:!1,pressed:!1})},this.state=ve,this.waitingForClick=!1,this.enterClick=!1}navigateOrReset(e){if(e){const{history:t,href:r,skipClientNav:n,target:o=void 0}=this.props;r&&(o==="_blank"?(window.open(r,"_blank"),this.setState({waiting:!1})):t&&!n?(t.push(r),this.setState({waiting:!1})):window.location.assign(r))}else this.setState({waiting:!1})}handleSafeWithNav(e,t){const{skipClientNav:r,history:n}=this.props;return n&&!r||this.props.target==="_blank"?(e(),this.navigateOrReset(t),Promise.resolve()):(this.state.waiting||this.setState({waiting:!0}),e().then(()=>{this.state.waiting||this.setState({waiting:!0})}).catch(o=>{}).finally(()=>{this.navigateOrReset(t)}))}runCallbackAndMaybeNavigate(e){const{onClick:t=void 0,beforeNav:r=void 0,safeWithNav:n=void 0,href:o,type:d}=this.props;let l=!0,h=!0;if(t&&t(e),e.defaultPrevented&&(l=!1,h=!1),e.preventDefault(),!o&&d==="submit"&&h){let c=e.currentTarget;for(;c;){if(c instanceof window.HTMLFormElement){const g=new window.Event("submit",{bubbles:!0,cancelable:!0});c.dispatchEvent(g);break}c=c.parentElement}}if(r)this.setState({waiting:!0}),r().then(()=>n?this.handleSafeWithNav(n,l):this.navigateOrReset(l)).catch(()=>{});else{if(n)return this.handleSafeWithNav(n,l);this.navigateOrReset(l)}}render(){const e=this.props.rel||(this.props.target==="_blank"?"noopener noreferrer":void 0),t=this.props.disabled?y({},yt,{onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e}):{onClick:this.handleClick,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd,onTouchCancel:this.handleTouchCancel,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e},{children:r}=this.props;return r&&r(this.state,t)}}ue.defaultProps={disabled:!1};const he=i=>typeof i!="string"?!1:!/^(https?:)?\/\//i.test(i)&&!/^([^#]*#[\w-]*|[\w\-.]+:)/.test(i),bt=Ue(ue);function vt(i,e,t){return t&&e!==!0&&i&&he(i)?bt:ue}const St=["href","onClick","skipClientNav","beforeNav","safeWithNav","style","target","testId","onFocus","onKeyDown","onKeyUp","onMouseDown","onMouseUp","hideDefaultFocusRing","light","disabled","tabIndex"],wt=O("a"),Ct=O("button"),xt=O(Ce),kt=a.forwardRef(function(e,t){const r=(o,d,l)=>{const h=e.href&&!e.disabled,c=d&&!e.skipClientNav&&he(e.href||"");return h&&c&&e.href?a.createElement(xt,y({},l,{to:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:t}),e.children(o)):h&&!c?a.createElement(wt,y({},l,{href:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:t}),e.children(o)):a.createElement(Ct,y({},l,{type:"button","aria-disabled":e.disabled,ref:t}),e.children(o))},n=o=>{const{href:d,onClick:l,skipClientNav:h,beforeNav:c=void 0,safeWithNav:g=void 0,style:v,target:p=void 0,testId:w,onFocus:S,onKeyDown:m,onKeyUp:C,onMouseDown:I,onMouseUp:F,hideDefaultFocusRing:x,light:b,disabled:k,tabIndex:_}=e,N=V(e,St),D=vt(d,h,o),B=$=>[G.reset,G.link,!x&&$.focused&&(b?G.focusedLight:G.focused),k&&G.disabled,v];return c?a.createElement(D,{href:d,onClick:l,beforeNav:c,safeWithNav:g,onFocus:S,onKeyDown:m,onKeyUp:C,onMouseDown:I,onMouseUp:F,disabled:k,tabIndex:_},($,M)=>r($,o,y({},N,{"data-testid":w,style:B($)},M))):a.createElement(D,{href:d,onClick:l,safeWithNav:g,onFocus:S,onKeyDown:m,onKeyUp:C,onMouseDown:I,onMouseUp:F,target:p,disabled:k,tabIndex:_},($,M)=>r($,o,y({},N,{"data-testid":w,style:B($)},M)))};return a.createElement(we.Consumer,null,o=>n(o))});kt.defaultProps={light:!1,disabled:!1};const G=R.StyleSheet.create({reset:{border:"none",margin:0,padding:0,width:"auto",overflow:"visible",background:"transparent",textDecoration:"none",color:"inherit",font:"inherit",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",outline:"none",lineHeight:"normal",WebkitFontSmoothing:"inherit",MozOsxFontSmoothing:"inherit"},link:{cursor:"pointer"},focused:{":focus":{outline:`solid 2px ${s.blue}`}},focusedLight:{outline:`solid 2px ${s.white}`},disabled:{color:s.offBlack32,cursor:"not-allowed",":focus":{outline:"none"},":focus-visible":{outline:`solid 2px ${s.blue}`}}}),Rt=i=>{switch(i){case"xsmall":return"small";case"small":return"medium";case"medium":return"medium";case"large":return"medium"}},Et=i=>({xsmall:24,small:32,medium:40,large:48})[i],ie={color:{bg:{hovered:"transparent",active:"transparent",disabled:"transparent",filled:{action:{hovered:"transparent",active:"transparent"},critical:{hovered:"transparent",active:"transparent"}}},stroke:{disabled:{default:s.offBlack32,inverse:s.white50},inverse:s.white,action:{default:s.blue,active:s.activeBlue,inverse:s.fadedBlue},critical:{default:s.red,active:s.activeRed,inverse:s.fadedRed},primary:{action:{hovered:s.blue,active:s.activeBlue},critical:{hovered:s.red,active:s.activeRed},inverse:{default:s.white,hovered:s.white}},secondary:{default:s.offBlack},tertiary:{default:s.offBlack64},filled:{action:{hovered:s.blue,active:s.activeBlue},critical:{hovered:s.red,active:s.activeRed}}}},border:{width:{default:U.width.thin,active:U.width.none,hovered:U.width.thin,hoveredInverse:U.width.thin},radius:{default:U.radius.medium_4}}},It=Ke(ie,{color:{bg:{hovered:s.white,active:s.white64,filled:{action:{hovered:s.blue,active:s.activeBlue},critical:{hovered:s.red,active:s.activeRed}}},stroke:{action:{inverse:s.eggplant},critical:{inverse:s.eggplant},primary:{action:{hovered:s.eggplant,active:s.eggplant},critical:{hovered:s.eggplant,active:s.eggplant},inverse:{hovered:s.eggplant}},filled:{action:{hovered:s.white,active:s.white},critical:{hovered:s.white,active:s.white}}}},border:{width:{hovered:U.width.none,hoveredInverse:U.width.none}}}),_t={default:ie,khanmigo:It},_e=qe(ie);function Tt(i){var e;const t=a.useContext(je),r=(e=_t[t])!=null?e:ie;return a.createElement(_e.Provider,{value:r},i.children)}const $t=["color","disabled","href","icon","kind","light","size","skipClientNav","style","testId"];function Bt({icon:i,size:e}){switch(Rt(e)){case"small":return a.createElement(le,{size:"small",color:"currentColor",icon:i});case"medium":default:return a.createElement(le,{size:"medium",color:"currentColor",icon:i})}}const Ft=ne("a"),Nt=ne("button"),Dt=ne(Ce),Lt=a.forwardRef(function(e,t){const{color:r,disabled:n,href:o,icon:d,kind:l="primary",light:h=!1,size:c="medium",skipClientNav:g,style:v,testId:p}=e,w=V(e,$t),{theme:S,themeName:m}=He(_e),C=I=>{const F=At(r,l,h,c,S,m),x=[Mt.shared,F.default,n&&F.disabled],b=a.createElement(Bt,{size:c,icon:d}),k=y({"data-testid":p,style:[x,v]},w);return o&&!n?I&&!g&&he(o)?a.createElement(Dt,y({},k,{to:o,ref:t}),b):a.createElement(Ft,y({},k,{href:o,ref:t}),b):a.createElement(Nt,y({type:"button"},k,{onClick:n?void 0:w.onClick,"aria-disabled":n,ref:t}),b)};return a.createElement(we.Consumer,null,I=>C(I))}),Mt=R.StyleSheet.create({shared:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",padding:0,cursor:"pointer",border:"none",outline:"none",textDecoration:"none",background:"none",margin:-8,touchAction:"manipulation"}}),Z={};function Pt(i,e,t,r,n){switch(i){case"primary":const o=n==="destructive"?e.color.stroke.primary.critical.hovered:e.color.stroke.primary.action.hovered;return{":hover":{backgroundColor:e.color.bg.hovered,color:r?e.color.stroke.primary.inverse.hovered:o,outlineColor:r?e.color.stroke.inverse:t,outlineOffset:1,outlineStyle:"solid",outlineWidth:r?e.border.width.hoveredInverse:e.border.width.hovered},":active":{backgroundColor:e.color.bg.active}};case"secondary":case"tertiary":return{":hover":{backgroundColor:n==="destructive"?e.color.bg.filled.critical.hovered:e.color.bg.filled.action.hovered,color:n==="destructive"?e.color.stroke.filled.critical.hovered:e.color.stroke.filled.action.hovered,outlineWidth:e.border.width.active},":active":{backgroundColor:n==="destructive"?e.color.bg.filled.critical.active:e.color.bg.filled.action.active,color:n==="destructive"?e.color.stroke.filled.critical.active:e.color.stroke.filled.action.active,outlineWidth:e.border.width.active}};default:return{":focus-visible":{},":hover":{},":active":{}}}}const At=(i="default",e,t,r,n,o)=>{const d=i==="destructive"?n.color.stroke.critical.default:n.color.stroke.action.default,l=`${d}-${e}-${t}-${r}-${o}`;if(Z[l])return Z[l];if(t&&e!=="primary")throw new Error("Light is only supported for primary IconButtons");const h=(()=>{switch(e){case"primary":return t?n.color.stroke.primary.inverse.default:d;case"secondary":return n.color.stroke.secondary.default;case"tertiary":return n.color.stroke.tertiary.default;default:throw new Error("IconButton kind not recognized")}})(),c=Et(r),g=Pt(e,n,d,t,i),v=i==="destructive"?n.color.stroke.critical.inverse:n.color.stroke.action.inverse,p=i==="destructive"?n.color.stroke.critical.active:n.color.stroke.action.active,w=t?n.color.stroke.inverse:d,S=t?n.color.stroke.disabled.inverse:n.color.stroke.disabled.default,m={backgroundColor:n.color.bg.disabled,color:S,outlineColor:S},C={default:{height:c,width:c,color:h,borderRadius:n.border.radius.default,":hover":y({boxShadow:"none",color:w,borderRadius:n.border.radius.default,outlineWidth:n.border.width.default},g[":hover"]),"@media not (hover: hover)":{":hover":{boxShadow:"none",color:h,borderRadius:n.border.radius.default,outline:"none",backgroundColor:"transparent"}},":focus":{boxShadow:`0 0 0 ${n.border.width.default}px ${w}`,borderRadius:n.border.radius.default},":focus:not(:focus-visible)":{boxShadow:"none"},":focus-visible":y({boxShadow:"none",outlineWidth:n.border.width.default,outlineColor:w,outlineOffset:1,outlineStyle:"solid",borderRadius:n.border.radius.default},g[":focus-visible"]),":active":y({color:t?v:p,outlineWidth:n.border.width.default,outlineColor:t?v:p,outlineOffset:1,outlineStyle:"solid",borderRadius:n.border.radius.default},g[":active"])},disabled:{color:S,cursor:"not-allowed",":hover":y({},m,{outline:"none"}),":active":y({},m,{outline:"none"}),":focus":{boxShadow:`0 0 0 ${n.border.width.default}px ${S}`,borderRadius:n.border.radius.default},":focus:not(:focus-visible)":{boxShadow:"none"},":focus-visible":m}};return Z[l]=R.StyleSheet.create(C),Z[l]},Ot=["color","disabled","href","kind","light","size","skipClientNav","tabIndex","target"],ee=a.forwardRef(function(e,t){const{color:r="default",disabled:n=!1,href:o,kind:d="primary",light:l=!1,size:h="medium",skipClientNav:c,tabIndex:g,target:v}=e,p=V(e,Ot);function w(m){const C=m.key;!o&&(C==="Enter"||C==="Space")&&m.preventDefault()}function S(m){const C=m.key;!o&&(C==="Enter"||C==="Space")&&p.onClick&&p.onClick(m)}return a.createElement(Tt,null,a.createElement(Lt,y({},p,{color:r,disabled:n,href:o,kind:d,light:l,ref:t,skipClientNav:c,size:h,target:v,tabIndex:g,onKeyDown:w,onKeyUp:S})))}),Wt=""+new URL("caret-double-down-bold-XepWuyCn.svg",import.meta.url).href,zt=""+new URL("caret-double-up-bold-10VQDgxI.svg",import.meta.url).href,Ut=""+new URL("caret-up-bold-0QYBH_hJ.svg",import.meta.url).href,Kt=""+new URL("trash-bold-rak1tQ6r.svg",import.meta.url).href,Te=i=>{const{figureType:e,onMove:t,onRemove:r}=i;return T(L,{style:j.container,children:[f(ze,{startIcon:Kt,"aria-label":`Delete locked ${e}`,onClick:r,kind:"tertiary",style:j.deleteButton,children:"Delete"}),t&&T($e,{children:[f(Me,{}),f(ee,{icon:zt,size:"small","aria-label":`Move locked ${e} to the back`,onClick:()=>t("back"),style:j.iconButton}),f(ee,{icon:Ut,size:"small","aria-label":`Move locked ${e} backward`,onClick:()=>t("backward"),style:j.iconButton}),f(ee,{icon:Se,size:"small","aria-label":`Move locked ${e} forward`,onClick:()=>t("forward"),style:j.iconButton}),f(ee,{icon:Wt,size:"small","aria-label":`Move locked ${e} to the front`,onClick:()=>t("front"),style:j.iconButton})]})]})},j=R.StyleSheet.create({container:{width:"100%",flexDirection:"row",alignItems:"center",marginTop:u.xxxSmall_4},deleteButton:{marginInlineStart:-u.xxxSmall_4},iconButton:{margin:0}}),qt=Te;Te.__docgenInfo={description:"",methods:[],displayName:"LockedFigureSettingsActions",props:{figureType:{required:!0,tsType:{name:"LockedFigureType"},description:""},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:""},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{InfoTip:Ht}=Fe;function jt(i){const{type:e,coord:t,color:r,size:n,text:o,expanded:d,onChangeProps:l,onMove:h,onRemove:c,onToggle:g,containerStyle:v}=i;return T(nt,{expanded:d,onToggle:g,header:T(L,{style:[P.row,P.accordionHeaderContainer],children:[T(pe,{children:["Label (",t[0],", ",t[1],")"]}),f(K,{size:u.xSmall_8}),o!==""&&f(pe,{style:[{backgroundColor:s.white,color:Be[r]},P.accordionHeader],children:o})]}),containerStyle:v,children:[f(Ve,{coord:t,onChange:p=>{l({coord:p})},style:P.spaceUnder}),T(L,{style:P.row,children:[T(re,{tag:"label",style:[P.row,P.spaceUnder,{flexGrow:1}],children:["text",f(K,{size:u.xSmall_8}),f(Le,{value:o,placeholder:"ex. x^2 or \\frac{1}{2}",onChange:p=>l({text:p})})]}),T(Ht,{children:["Surround your text with $ for TeX.",f("br",{}),"Example: ","This circle has radius $\\frac{1}{2}$ units.",f("br",{}),f("br",{}),'It is important to use TeX when appropriate for accessibility. The above example would be read as "This circle has radius one-half units" by screen readers.']})]}),T(L,{style:P.row,children:[f(We,{selectedValue:r,onChange:p=>{l({color:p})},style:P.spaceUnder}),f(K,{size:u.medium_16}),T(re,{tag:"label",style:P.row,children:["size",f(K,{size:u.xSmall_8}),T(De,{selectedValue:n,onChange:p=>l({size:p}),placeholder:"",children:[f(ae,{value:"small",label:"small"}),f(ae,{value:"medium",label:"medium"}),f(ae,{value:"large",label:"large"})]})]})]}),f(qt,{figureType:e,onMove:h,onRemove:c})]})}const P=R.StyleSheet.create({accordionHeaderContainer:{whiteSpace:"nowrap"},accordionHeader:{padding:u.xxxSmall_4,marginInlineEnd:u.xSmall_8,borderRadius:u.xxxSmall_4,textOverflow:"ellipsis",overflow:"hidden"},row:{display:"flex",flexDirection:"row",alignItems:"center",minWidth:0},spaceUnder:{marginBottom:u.xSmall_8}});jt.__docgenInfo={description:"",methods:[],displayName:"LockedLabelSettings",props:{onChangeProps:{required:!0,tsType:{name:"signature",type:"function",raw:"(newProps: Partial<LockedFigure>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"LockedFigure"}],raw:"Partial<LockedFigure>"},name:"newProps"}],return:{name:"void"}}},description:"Called when the props (coord, color, etc.) are updated."},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(movement: LockedFigureSettingsMovementType) => void",signature:{arguments:[{type:{name:"union",raw:`| "back"
| "backward"
| "forward"
| "front"`,elements:[{name:"literal",value:'"back"'},{name:"literal",value:'"backward"'},{name:"literal",value:'"forward"'},{name:"literal",value:'"front"'}]},name:"movement"}],return:{name:"void"}}},description:`Called when a movement button (top, up, down, bottom) is pressed.
This is also used to indicate that this LockedLabelSettings component
is for a standalone label, not part of a larger locked figure.`},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when the delete button is pressed."},expanded:{required:!1,tsType:{name:"boolean"},description:"Whether this accordion is expanded."},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Called when the accordion is expanded or collapsed."},containerStyle:{required:!1,tsType:{name:"StyleType"},description:""}}};export{Ve as C,ee as I,jt as L,nt as P,qt as a};