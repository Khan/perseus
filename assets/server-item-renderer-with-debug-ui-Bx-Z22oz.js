import{a0 as he,a1 as pe,r as v,cM as W,cN as ge,j as n,cO as D,cP as oe,cQ as V,n as O,g as y,f as E,e as X,cI as j,cR as me,cS as K,bC as P,c1 as H,s as T,cT as fe,u as ye,cU as be,cV as we}from"./iframe-DUcWS4Kc.js";import{L as ve,a as ke,H as Y,R as Z,S as xe}from"./split-view-CvDZe8wx.js";import{P as G,T as Te,S as Se,d as Ie}from"./test-keypad-context-wrapper-BwchvXCS.js";import{S as Pe}from"./server-item-renderer-C1A2hIGM.js";function Ce(a){return a.type==="points"&&a.earned>=a.total}function Re(a,e,t){if(a.type==="points")return{empty:!1,correct:Ce(a),message:a.message,guess:e,state:t};if(a.type==="invalid")return{empty:!0,correct:!1,message:a.message,suppressAlmostThere:a.suppressAlmostThere,guess:e,state:t};throw new he("Invalid score type: "+a.type,pe.InvalidInput,{metadata:{score:JSON.stringify(a),guess:JSON.stringify(e),state:JSON.stringify(t)}})}const ee=a=>{switch(a){case"link":return{triggerOnEnter:!0,triggerOnSpace:!1};case"checkbox":case"radio":case"listbox":return{triggerOnEnter:!1,triggerOnSpace:!0};case"button":case"menuitem":case"menu":case"option":default:return{triggerOnEnter:!0,triggerOnSpace:!0}}},Ae={onClick:()=>{},onMouseEnter:()=>{},onMouseLeave:()=>{},onMouseDown:()=>{},onMouseUp:()=>{},onTouchStart:()=>{},onTouchEnd:()=>{},onTouchCancel:()=>{},onKeyDown:()=>{},onKeyUp:()=>{}},te={hovered:!1,focused:!1,pressed:!1,waiting:!1};class J extends v.Component{static getDerivedStateFromProps(e,t){return e.disabled?{...te,focused:t.focused}:null}navigateOrReset(e){if(e){const{navigate:t,href:r,skipClientNav:o,target:i=void 0}=this.props;r&&(i==="_blank"?(window.open(r,"_blank"),this.setState({waiting:!1})):t&&!o?(t(r,{viewTransition:this.props.viewTransition}),this.setState({waiting:!1})):window.location.assign(r))}else this.setState({waiting:!1})}handleSafeWithNav(e,t){const{skipClientNav:r,navigate:o}=this.props;return o&&!r||this.props.target==="_blank"?(e(),this.navigateOrReset(t),Promise.resolve()):(this.state.waiting||this.setState({waiting:!0}),e().then(()=>{this.state.waiting||this.setState({waiting:!0})}).catch(i=>{}).finally(()=>{this.navigateOrReset(t)}))}runCallbackAndMaybeNavigate(e){const{onClick:t=void 0,beforeNav:r=void 0,safeWithNav:o=void 0,href:i,type:d}=this.props;let s=!0,u=!0;if(t&&t(e),e.defaultPrevented&&(s=!1,u=!1),e.preventDefault(),!i&&d==="submit"&&u){let h=e.currentTarget;for(;h;){if(h instanceof window.HTMLFormElement){const c=new window.Event("submit",{bubbles:!0,cancelable:!0});h.dispatchEvent(c);break}h=h.parentElement}}if(r)this.setState({waiting:!0}),r().then(()=>o?this.handleSafeWithNav(o,s):this.navigateOrReset(s)).catch(()=>{});else{if(o)return this.handleSafeWithNav(o,s);this.navigateOrReset(s)}}render(){const e=this.props.rel||(this.props.target==="_blank"?"noopener noreferrer":void 0),t=this.props.disabled?{...Ae,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e}:{onClick:this.handleClick,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd,onTouchCancel:this.handleTouchCancel,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e},{children:r}=this.props;return r&&r(this.state,t)}constructor(e){super(e),this.handleClick=t=>{const{onClick:r=void 0,beforeNav:o=void 0,safeWithNav:i=void 0}=this.props;this.enterClick||((r||o||i)&&(this.waitingForClick=!1),this.runCallbackAndMaybeNavigate(t))},this.handleMouseEnter=t=>{this.waitingForClick||this.setState({hovered:!0})},this.handleMouseLeave=()=>{this.waitingForClick||this.setState({hovered:!1,pressed:!1,focused:!1})},this.handleMouseDown=t=>{this.props.onMouseDown&&this.props.onMouseDown(t),this.setState({pressed:!0})},this.handleMouseUp=t=>{this.props.onMouseUp&&this.props.onMouseUp(t),this.setState({pressed:!1,focused:!1})},this.handleTouchStart=()=>{this.setState({pressed:!0})},this.handleTouchEnd=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleTouchCancel=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleKeyDown=t=>{const{onKeyDown:r,role:o}=this.props;r&&r(t);const i=t.key,{triggerOnEnter:d,triggerOnSpace:s}=ee(o);d&&i===W.enter||s&&i===W.space?(t.preventDefault(),this.setState({pressed:!0})):!d&&i===W.enter&&(this.enterClick=!0)},this.handleKeyUp=t=>{const{onKeyUp:r,role:o}=this.props;r&&r(t);const i=t.key,{triggerOnEnter:d,triggerOnSpace:s}=ee(o);d&&i===W.enter||s&&i===W.space?(this.setState({pressed:!1,focused:!0}),this.runCallbackAndMaybeNavigate(t)):!d&&i===W.enter&&(this.enterClick=!1)},this.handleFocus=t=>{const{onFocus:r}=this.props;this.setState({focused:!0},()=>{r&&r(t)})},this.handleBlur=t=>{this.setState({focused:!1,pressed:!1})},this.state=te,this.waitingForClick=!1,this.enterClick=!1}}J.defaultProps={disabled:!1};const Q=a=>typeof a!="string"?!1:!/^(https?:)?\/\//i.test(a)&&!/^([^#]*#[\w-]*|[\w\-.]+:)/.test(a);function qe(a){function e(t){const r=ge();return n.jsx(a,{...t,navigate:r})}return e.displayName="withRouter(ClickableBehavior)",e}const je=qe(J);function de(a,e,t){return t&&e!==!0&&a&&Q(a)?je:J}const Me=D("a"),Fe=D("button"),Ne=D(oe),De=v.forwardRef(function(e,t){const r=(k,N,U)=>{const _=e.href&&!e.disabled,$=N&&!e.skipClientNav&&Q(e.href||"");return _&&$&&e.href?n.jsx(Ne,{...U,to:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:t,children:e.children(k)}):_&&!$?n.jsx(Me,{...U,href:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:t,children:e.children(k)}):n.jsx(Fe,{...U,type:"button","aria-disabled":e.disabled,ref:t,children:e.children(k)})},o=V(),{href:i,onClick:d,skipClientNav:s,beforeNav:u=void 0,safeWithNav:h=void 0,style:c,target:x=void 0,testId:g,onFocus:m,onKeyDown:A,onKeyUp:p,onMouseDown:C,onMouseUp:S,hideDefaultFocusRing:q,light:I,disabled:f,tabIndex:M,...R}=e,w=de(i,s,o),F=k=>[L.reset,L.link,!q&&k.focused&&(I?L.focusedLight:L.focused),f&&L.disabled,c];return u?n.jsx(w,{href:i,onClick:d,beforeNav:u,safeWithNav:h,onFocus:m,onKeyDown:A,onKeyUp:p,onMouseDown:C,onMouseUp:S,disabled:f,tabIndex:M,children:(k,N)=>r(k,o,{...R,"data-testid":g,style:F(k),...N})}):n.jsx(w,{href:i,onClick:d,safeWithNav:h,onFocus:m,onKeyDown:A,onKeyUp:p,onMouseDown:C,onMouseUp:S,target:x,disabled:f,tabIndex:M,children:(k,N)=>r(k,o,{...R,"data-testid":g,style:F(k),...N})})});De.defaultProps={light:!1,disabled:!1};const L=O.StyleSheet.create({reset:{border:"none",margin:0,padding:0,width:"auto",overflow:"visible",background:"transparent",textDecoration:"none",color:"inherit",font:"inherit",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",outline:"none",lineHeight:"normal",WebkitFontSmoothing:"inherit",MozOsxFontSmoothing:"inherit"},link:{cursor:"pointer"},focused:{":focus":{outline:`solid ${y.width.medium} ${E.focus.outer}`}},focusedLight:{outline:`solid ${y.width.medium} ${E.core.border.inverse.strong}`},disabled:{color:E.action.secondary.disabled.foreground,cursor:"not-allowed",":focus":{outline:"none"},":focus-visible":{outline:`solid ${y.width.medium} ${E.focus.outer}`}}}),We={xsmall:16,small:24,medium:48,large:96},Ee={xsmall:"M7.237.741C7.165.393 6.95.154 6.656.053A1.01 1.01 0 0 0 6.18.01c-.053.009-.053.009-.087.017C2.553.949 0 4.214 0 7.91 0 12.36 3.598 16 8 16c4.4 0 8-3.647 8-8.112a1.02 1.02 0 0 0-.118-.423.877.877 0 0 0-.808-.48.909.909 0 0 0-.81.46c-.09.151-.13.296-.146.455-.08 3.493-2.737 6.207-6.118 6.207-3.41 0-6.118-2.74-6.118-6.196 0-2.843 1.936-5.291 4.644-6.022.1-.028.224-.082.352-.177a.928.928 0 0 0 .36-.97z",small:"M10.598.943c-.093-.449-.362-.748-.732-.875a1.314 1.314 0 0 0-.723-.033C3.83 1.417 0 6.317 0 11.864 0 18.538 5.398 24 12 24c6.598 0 12-5.471 12-12.16a1.333 1.333 0 0 0-.154-.548c-.193-.368-.544-.606-1.023-.606-.472 0-.825.229-1.035.585-.117.2-.169.39-.189.582-.124 5.472-4.294 9.73-9.599 9.73-5.349 0-9.599-4.3-9.599-9.72 0-4.46 3.036-8.299 7.28-9.444.127-.036.291-.107.458-.232.373-.28.57-.711.46-1.244z",medium:"M44.19 23.455a1.91 1.91 0 1 1 3.801 0h.003c.004.18.006.363.006.545 0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0c.182 0 .364.002.545.006V.01a1.91 1.91 0 1 1 0 3.801v.015A20.564 20.564 0 0 0 24 3.818C12.854 3.818 3.818 12.854 3.818 24c0 11.146 9.036 20.182 20.182 20.182 11.146 0 20.182-9.036 20.182-20.182 0-.182-.003-.364-.007-.545h.015z",large:"M88.38 46.91a3.818 3.818 0 1 1 7.602 0h.006c.008.362.012.725.012 1.09 0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0c.365 0 .728.004 1.09.012v.005a3.818 3.818 0 1 1 0 7.602v.032c-.362-.01-.725-.015-1.09-.015C25.708 7.636 7.636 25.708 7.636 48c0 22.292 18.072 40.364 40.364 40.364 22.292 0 40.364-18.072 40.364-40.364 0-.365-.005-.728-.015-1.09h.032z"},ne={light:X.white,dark:X.offBlack50},Oe=D("path");class le extends v.Component{render(){const{size:e,light:t,style:r,testId:o}=this.props,i=We[e],d=Ee[e],s=t?ne.light:ne.dark,u=n.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:`0 0 ${i} ${i}`,"data-testid":o,children:n.jsx(Oe,{style:[ae.loadingSpinner,{fill:s}],fillRule:"nonzero",d})});return n.jsx(j,{style:[ae.spinnerContainer,r],children:u})}}le.defaultProps={size:"large",light:!1};const Ue={"0%":{transform:"rotate(0deg)"},"50%":{transform:"rotate(180deg)"},"100%":{transform:"rotate(360deg)"}},ae=O.StyleSheet.create({spinnerContainer:{justifyContent:"center"},loadingSpinner:{transformOrigin:"50% 50%",animationName:Ue,animationDuration:"1.1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}});function re({icon:a,size:e,style:t,testId:r}){const o={"aria-hidden":!0,color:"currentColor",style:t,testId:r};switch(e){case"small":return n.jsx(G,{...o,size:"small",icon:a});case"medium":default:return n.jsx(G,{...o,size:"medium",icon:a})}}const $e=P.size_040,Ke={root:{border:{width:{primary:{default:y.width.none,hover:y.width.medium,press:y.width.medium},secondary:{default:y.width.thin,hover:y.width.thin,press:y.width.thin},tertiary:{default:y.width.none,hover:y.width.medium,press:y.width.medium}},offset:{primary:y.width.medium,secondary:0,tertiary:0},radius:{small:y.radius.radius_040,medium:y.radius.radius_040,large:y.radius.radius_040}},sizing:{height:{small:P.size_320,medium:P.size_400,large:P.size_560},underline:{hover:P.size_020,press:P.size_010}},padding:{medium:P.size_160,large:P.size_320},font:{size:{large:"1.8rem"},lineHeight:{small:H.lineHeight.xMedium,default:H.lineHeight.large,large:"2.6rem"},weight:{default:H.weight.bold},offset:{default:$e}}},icon:{margin:{inline:{inner:P.size_060,outer:`calc(-1 * ${y.width.medium})`}},padding:P.size_020}};var l=me(Ke,"--wb-c-button-");const Le=D("a"),ze=D("button"),_e=D(oe),He=v.forwardRef(function(e,t){const{children:r,disabled:o,href:i,id:d,skipClientNav:s,style:u,testId:h,type:c,...x}=e,g={"data-testid":h,id:d,role:"button",style:[Be.reset,u],...x},m=V();return i&&!o?m&&!s&&Q(i)?n.jsx(_e,{...g,to:i,ref:t,children:r}):n.jsx(Le,{...g,href:i,ref:t,children:r}):n.jsx(ze,{type:c||"button",...g,"aria-disabled":o,ref:t,children:r})}),Be=O.StyleSheet.create({reset:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",margin:0,padding:0,border:"none",cursor:"pointer",outline:"none",textDecoration:"none",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",":focus":{WebkitTapHighlightColor:"rgba(0,0,0,0)"}}}),Ge=v.forwardRef(function(e,t){const{children:r,skipClientNav:o,actionType:i,disabled:d,focused:s,hovered:u,href:h=void 0,kind:c="primary",labelStyle:x,pressed:g,size:m="medium",style:A,testId:p,type:C=void 0,spinner:S,startIcon:q,endIcon:I,id:f,waiting:M,...R}=e,w=Ve(i,c,m),F=S||d,k=[b.shared,q&&b.withStartIcon,I&&b.withEndIcon,w.default,F&&w.disabled,!F&&(g?w.pressed:s&&w.focused),m==="small"&&b.small,m==="large"&&b.large],N=m==="small"?ve:ke,U=n.jsx(N,{style:[b.text,m==="small"&&b.smallText,m==="large"&&b.largeText,x,S&&b.hiddenText,c==="tertiary"&&!F&&(g?[w.hover,w.active]:u&&w.hover)],testId:p?`${p}-inner-label`:void 0,children:r}),_={medium:"small",small:"xsmall",large:"medium"},$=m==="small"?"small":"medium",ce=n.jsxs(v.Fragment,{children:[q&&n.jsx(j,{style:b.iconWrapper,children:n.jsx(re,{size:$,icon:q,style:[b.startIcon,c==="tertiary"&&b.tertiaryStartIcon],testId:p?`${p}-start-icon`:void 0})}),U,S&&n.jsx(le,{style:b.spinner,size:_[m],light:c==="primary",testId:`${p||"button"}-spinner`}),I&&n.jsx(j,{testId:p?`${p}-end-icon-wrapper`:void 0,style:[z.endIcon,b.iconWrapper,b.endIconWrapper,c==="tertiary"&&b.endIconWrapperTertiary],children:n.jsx(re,{size:$,icon:I,testId:p?`${p}-end-icon`:void 0})})]});return n.jsx(He,{...R,disabled:F,href:h,id:f,ref:t,skipClientNav:o,style:[k,A],testId:p,tabIndex:e.tabIndex,type:C,children:ce})}),b=O.StyleSheet.create({shared:{height:l.root.sizing.height.medium,paddingBlock:0,paddingInline:l.root.padding.medium},small:{borderRadius:l.root.border.radius.small,height:l.root.sizing.height.small},large:{borderRadius:l.root.border.radius.large,height:l.root.sizing.height.large},text:{alignItems:"center",fontWeight:l.root.font.weight.default,whiteSpace:"nowrap",overflow:"hidden",lineHeight:l.root.font.lineHeight.default,textOverflow:"ellipsis",display:"inline-block",pointerEvents:"none"},smallText:{lineHeight:l.root.font.lineHeight.small},largeText:{fontSize:l.root.font.size.large,lineHeight:l.root.font.lineHeight.large},hiddenText:{visibility:"hidden"},spinner:{position:"absolute"},startIcon:{marginInlineStart:l.icon.margin.inline.outer,marginInlineEnd:l.icon.margin.inline.inner},tertiaryStartIcon:{marginInlineStart:0},endIcon:{marginInlineStart:l.icon.margin.inline.inner},iconWrapper:{padding:l.icon.padding,minWidth:"auto"},endIconWrapper:{marginInlineStart:l.icon.margin.inline.inner,marginInlineEnd:l.icon.margin.inline.outer},endIconWrapperTertiary:{marginInlineEnd:0}}),z={},Ve=(a="progressive",e,t)=>{const r=`${a}-${e}-${t}`;if(z[r])return z[r];const o=t==="large"?l.root.padding.large:l.root.padding.medium,i=l.root.border.width[e],d=l.root.border.offset[e],s=E.action[e][a],u=E.action[e].disabled,h={borderColor:u.border,borderWidth:i.default,background:u.background,color:u.foreground},c={...h,outline:"none",boxShadow:"none",textDecoration:"none",textDecorationThickness:"unset",textUnderlineOffset:"unset"},x={default:{borderRadius:l.root.border.radius[t],paddingInline:e==="tertiary"?0:o,borderStyle:"solid",borderWidth:i.default,borderColor:s.default.border,background:s.default.background,color:s.default.foreground,":hover":{background:s.hover.background,color:s.hover.foreground,...e==="primary"?{outline:`${i.hover} solid ${s.hover.border}`,outlineOffset:d}:void 0,...e==="secondary"?{borderColor:s.hover.border,boxShadow:`inset 0 0 0 ${i.hover} ${s.hover.border}`}:void 0,...e==="tertiary"?{textDecoration:"underline",textUnderlineOffset:l.root.font.offset.default,textDecorationThickness:l.root.sizing.underline.hover}:void 0},"@media not (hover: hover)":{":hover":{backgroundColor:"transparent"}},":active":{background:s.press.background,color:s.press.foreground,...e==="primary"?{outline:`${i.press} solid ${s.press.border}`,outlineOffset:d}:void 0,...e==="secondary"?{borderColor:s.press.border,boxShadow:`inset 0 0 0 ${i.press} ${s.press.border}`}:void 0,...e==="tertiary"?{textDecoration:"underline",textUnderlineOffset:l.root.font.offset.default,textDecorationThickness:l.root.sizing.underline.press}:void 0},...K.focus,...e==="secondary"?{":focus-visible:hover":{...K.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${i.hover} ${s.hover.border}, ${K.focus[":focus-visible"].boxShadow}`},":focus-visible:active":{...K.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${i.press} ${s.press.border}, ${K.focus[":focus-visible"].boxShadow}`}}:{}},disabled:{cursor:"not-allowed",...h,":hover":c,":active":c,":focus-visible":h}};return z[r]=O.StyleSheet.create(x),z[r]},B=v.forwardRef(function(e,t){const{href:r=void 0,type:o=void 0,children:i,skipClientNav:d,onClick:s,beforeNav:u=void 0,safeWithNav:h=void 0,tabIndex:c,target:x,rel:g,actionType:m="progressive",kind:A="primary",size:p="medium",disabled:C=!1,spinner:S=!1,...q}=e,I=V(),f=de(r,d,I),M=u?{beforeNav:u}:{target:x};return n.jsx(f,{disabled:S||C,href:r,role:"button",type:o,onClick:s,safeWithNav:h,rel:g,...M,children:(R,w)=>n.jsx(Ge,{...q,...R,...w,disabled:C,spinner:S||R.waiting,actionType:m,kind:A,size:p,skipClientNav:d,href:r,target:x,type:o,tabIndex:c,ref:t,children:i})})}),ie=T.large_24,Je={small:{query:"(max-width: 767px)",totalColumns:4,gutterWidth:T.medium_16,marginWidth:T.medium_16},medium:{query:"(min-width: 768px) and (max-width: 1023px)",totalColumns:8,gutterWidth:T.xLarge_32,marginWidth:T.large_24},large:{query:"(min-width: 1024px)",totalColumns:12,gutterWidth:T.xLarge_32,marginWidth:ie,maxWidth:1120+ie*2}};T.xLarge_32,T.medium_16;T.medium_16,T.medium_16,T.xLarge_32,T.xxLarge_48;const Qe={ssrSize:"large",mediaSpec:Je},Xe=v.createContext(Qe);Xe.displayName="MediaLayoutContext";O.StyleSheet.create({grow:{flexGrow:1}});class se extends v.Component{render(){const{size:e,style:t}=this.props;return n.jsx(j,{"aria-hidden":"true",style:[Ye(e),t]})}}const Ye=a=>({width:a,MsFlexBasis:a,MsFlexPreferredSize:a,WebkitFlexBasis:a,flexBasis:a,flexShrink:0});function ue({score:a}){return a==null?null:n.jsxs(n.Fragment,{children:[n.jsxs("table",{style:{marginTop:"20px"},children:[n.jsx("thead",{children:n.jsxs("tr",{style:{fontWeight:"bold"},children:[n.jsx("td",{children:"Empty"}),n.jsx("td",{children:"Correct"}),n.jsx("td",{style:{width:"100%"},children:"Message"})]})}),n.jsx("tbody",{children:n.jsxs("tr",{children:[n.jsx("td",{children:a.empty.toString()}),n.jsx("td",{children:a.correct.toString()}),n.jsx("td",{children:a.message})]})})]}),n.jsx(Y,{style:{marginTop:"10px"},children:"Guess"}),n.jsx(Z,{quotesOnKeys:!1,enableClipboard:!1,src:a.guess}),n.jsx(Y,{style:{marginTop:"10px"},children:"State"}),n.jsx(Z,{quotesOnKeys:!1,enableClipboard:!1,src:a.state})]})}ue.__docgenInfo={description:"",methods:[],displayName:"KEScoreUI",props:{score:{required:!0,tsType:{name:"union",raw:"KEScore | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
}`,signature:{properties:[{key:"empty",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"guess",value:{name:"any",required:!0}},{key:"state",value:{name:"any",required:!0}}]}},{name:"null"},{name:"undefined"}]},description:""}}};const Ze=({title:a="Widget",item:e,apiOptions:t=Object.freeze({}),linterContext:r,reviewMode:o=!1,startAnswerless:i=!1,showSolutions:d})=>{const s=v.useRef(null),[u,h]=v.useState(null),[c,x]=v.useState(t.isMobile??!1),[g,m]=v.useState(0),[A,p]=v.useState(i),C={...t,isMobile:c,customKeypad:c},S=()=>{const f=s.current;if(!f)return;const M=f.getUserInput(),R=we(e.question,M,"en"),w=[f.getUserInputLegacy(),[]];return Re(R,w,f.getSerializedState().question)},I=A&&!o&&(d==="none"||!d)?fe(e):e;return n.jsx(Te,{children:n.jsx(xe,{rendererTitle:n.jsxs(j,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:[a,n.jsx(j,{style:{marginLeft:"auto"},children:n.jsx(Se,{icon:n.jsx(G,{icon:Ie}),checked:c,onChange:x})})]}),renderer:n.jsxs(n.Fragment,{children:[n.jsx(j,{className:c?"perseus-mobile":"",children:n.jsx(ye.Consumer,{children:({keypadElement:f})=>n.jsx(Pe,{ref:s,problemNum:0,score:u,apiOptions:C,item:I,dependencies:be,keypadElement:f,linterContext:r,reviewMode:o,showSolutions:d,hintsVisible:g})})}),n.jsxs(j,{style:{flexDirection:"row",alignItems:"center"},children:[n.jsx(B,{onClick:()=>{p(!1),s.current&&h(S())},children:"Check"}),n.jsx(se,{size:8}),n.jsx(B,{onClick:()=>{var f;p(!1),(f=s.current)==null||f.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"}),n.jsx(se,{size:8}),n.jsx(B,{disabled:g>=e.hints.length,onClick:()=>{m(g+1)},children:g>=e.hints.length?"No hints left":`Take Hint ${g+1}`})]}),n.jsx(ue,{score:u})]}),jsonObject:I})})};Ze.__docgenInfo={description:"",methods:[],displayName:"ServerItemRendererWithDebugUI",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Widget"',computed:!1}},item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    // The details of the question being asked to the user.
    question: PerseusRenderer;
    // A collection of hints to be offered to the user that support answering the question.
    hints: Hint[];
    // Details about the tools the user might need to answer the question
    answerArea: PerseusAnswerArea | null | undefined;
}`,signature:{properties:[{key:"question",value:{name:"signature",type:"object",raw:`{
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
    /**
     * Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
     * are keys that represent other content in the system.  Not rendered to
     * the user. NOTE: perseus_data.go says this is required even though it
     * isn't necessary.
     * @deprecated
     */
    metadata?: any;
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"any",required:!1},description:`Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
are keys that represent other content in the system.  Not rendered to
the user. NOTE: perseus_data.go says this is required even though it
isn't necessary.
@deprecated`},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]},required:!0}},{key:"hints",value:{name:"Array",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
    /**
     * Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
     * are keys that represent other content in the system.  Not rendered to
     * the user. NOTE: perseus_data.go says this is required even though it
     * isn't necessary.
     * @deprecated
     */
    metadata?: any;
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"any",required:!1},description:`Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
are keys that represent other content in the system.  Not rendered to
the user. NOTE: perseus_data.go says this is required even though it
isn't necessary.
@deprecated`},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]},required:!0},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"Hint[]",required:!0}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null | undefined",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"},{name:"undefined"}],required:!0}}]}},description:""},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    /**
     * @deprecated - metadata is no longer used by the Group widget
     */
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
    /** Indicates whether or not to use mobile app styling. */
    isMobileApp?: boolean;
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
    /**
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
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
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1},description:"@deprecated - metadata is no longer used by the Group widget"},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
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
keypadElementPropType from math-input/src/prop-types.js.`},{key:"isMobile",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile styling."},{key:"isMobileApp",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile app styling."},{key:"setDrawingAreaAvailable",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1},description:`A function, called with a bool indicating whether use of the
drawing area (scratchpad) should be allowed/disallowed.

Previously handled by \`Khan.scratchpad.enable/disable\``},{key:"hintProgressColor",value:{name:"string",required:!1},description:"The color used for the hint progress indicator (eg. 1 / 3)"},{key:"canScrollPage",value:{name:"boolean",required:!1},description:`Whether this Renderer is allowed to auto-scroll the rest of the
page. For example, if this is enabled, the most recently used
radio widget will attempt to keep the "selected" answer in view
after entering review mode.

Defaults to \`false\`.`},{key:"editorChangeDelay",value:{name:"number",required:!1},description:`The value in milliseconds by which the local state of content
in a editor is delayed before propagated to a prop. For example,
when text is typed in the text area of an Editor component,
there will be a delay equal to the value of \`editorChangeDelay\`
before the change is propagated. This is added for better
responsiveness of the editor when used in certain contexts such
as StructuredItem exercises where constant re-rendering for each
keystroke caused text typed in the text area to appear in it
only after a good few seconds.`},{key:"flags",value:{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof PerseusFeatureFlags)[number]"},{name:"boolean"}],raw:"Record<(typeof PerseusFeatureFlags)[number], boolean>",required:!1},description:`Feature flags that can be passed from consuming application.
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    /**
     * @deprecated - metadata is no longer used by the Group widget
     */
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
    /** Indicates whether or not to use mobile app styling. */
    isMobileApp?: boolean;
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
    /**
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},description:"",defaultValue:{value:"Object.freeze({})",computed:!0}},linterContext:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""},startAnswerless:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},reviewMode:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showSolutions:{required:!1,tsType:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}]},description:""}}};export{Ze as S,Ce as i};
