import{a0 as fe,a1 as ye,r as w,cL as D,cM as be,j as r,cN as N,cO as de,cP as J,n as $,g as u,f as S,e as j,cH as W,cQ as we,cR as ve,cS as ke,bz as x,b$ as L,cT as xe,cU as Te,cV as E,s as T,cW as Se,u as Ie,cX as Pe,cY as Ce}from"./iframe-CHyJX4M4.js";import{L as Re,a as Ae,H as Z,R as ee,S as je}from"./split-view-Bj6oMIui.js";import{P as V,T as qe,S as Me,d as Fe}from"./test-keypad-context-wrapper-CdU8ARec.js";import{S as We}from"./server-item-renderer-J5PHmMM-.js";function Ne(t){return t.type==="points"&&t.earned>=t.total}function De(t,e,n){if(t.type==="points")return{empty:!1,correct:Ne(t),message:t.message,guess:e,state:n};if(t.type==="invalid")return{empty:!0,correct:!1,message:t.message,suppressAlmostThere:t.suppressAlmostThere,guess:e,state:n};throw new fe("Invalid score type: "+t.type,ye.InvalidInput,{metadata:{score:JSON.stringify(t),guess:JSON.stringify(e),state:JSON.stringify(n)}})}const te=t=>{switch(t){case"link":return{triggerOnEnter:!0,triggerOnSpace:!1};case"checkbox":case"radio":case"listbox":return{triggerOnEnter:!1,triggerOnSpace:!0};case"button":case"menuitem":case"menu":case"option":default:return{triggerOnEnter:!0,triggerOnSpace:!0}}},Ee={onClick:()=>{},onMouseEnter:()=>{},onMouseLeave:()=>{},onMouseDown:()=>{},onMouseUp:()=>{},onTouchStart:()=>{},onTouchEnd:()=>{},onTouchCancel:()=>{},onKeyDown:()=>{},onKeyUp:()=>{}},ne={hovered:!1,focused:!1,pressed:!1,waiting:!1};class Q extends w.Component{static getDerivedStateFromProps(e,n){return e.disabled?{...ne,focused:n.focused}:null}navigateOrReset(e){if(e){const{navigate:n,href:a,skipClientNav:s,target:i=void 0}=this.props;a&&(i==="_blank"?(window.open(a,"_blank"),this.setState({waiting:!1})):n&&!s?(n(a,{viewTransition:this.props.viewTransition}),this.setState({waiting:!1})):window.location.assign(a))}else this.setState({waiting:!1})}handleSafeWithNav(e,n){const{skipClientNav:a,navigate:s}=this.props;return s&&!a||this.props.target==="_blank"?(e(),this.navigateOrReset(n),Promise.resolve()):(this.state.waiting||this.setState({waiting:!0}),e().then(()=>{this.state.waiting||this.setState({waiting:!0})}).catch(i=>{}).finally(()=>{this.navigateOrReset(n)}))}runCallbackAndMaybeNavigate(e){const{onClick:n=void 0,beforeNav:a=void 0,safeWithNav:s=void 0,href:i,type:l}=this.props;let o=!0,c=!0;if(n&&n(e),e.defaultPrevented&&(o=!1,c=!1),e.preventDefault(),!i&&l==="submit"&&c){let d=e.currentTarget;for(;d;){if(d instanceof window.HTMLFormElement){const h=new window.Event("submit",{bubbles:!0,cancelable:!0});d.dispatchEvent(h);break}d=d.parentElement}}if(a)this.setState({waiting:!0}),a().then(()=>s?this.handleSafeWithNav(s,o):this.navigateOrReset(o)).catch(()=>{});else{if(s)return this.handleSafeWithNav(s,o);this.navigateOrReset(o)}}render(){const e=this.props.rel||(this.props.target==="_blank"?"noopener noreferrer":void 0),n=this.props.disabled?{...Ee,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e}:{onClick:this.handleClick,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd,onTouchCancel:this.handleTouchCancel,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e},{children:a}=this.props;return a&&a(this.state,n)}constructor(e){super(e),this.handleClick=n=>{const{onClick:a=void 0,beforeNav:s=void 0,safeWithNav:i=void 0}=this.props;this.enterClick||((a||s||i)&&(this.waitingForClick=!1),this.runCallbackAndMaybeNavigate(n))},this.handleMouseEnter=n=>{this.waitingForClick||this.setState({hovered:!0})},this.handleMouseLeave=()=>{this.waitingForClick||this.setState({hovered:!1,pressed:!1,focused:!1})},this.handleMouseDown=n=>{this.props.onMouseDown&&this.props.onMouseDown(n),this.setState({pressed:!0})},this.handleMouseUp=n=>{this.props.onMouseUp&&this.props.onMouseUp(n),this.setState({pressed:!1,focused:!1})},this.handleTouchStart=()=>{this.setState({pressed:!0})},this.handleTouchEnd=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleTouchCancel=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleKeyDown=n=>{const{onKeyDown:a,role:s}=this.props;a&&a(n);const i=n.key,{triggerOnEnter:l,triggerOnSpace:o}=te(s);l&&i===D.enter||o&&i===D.space?(n.preventDefault(),this.setState({pressed:!0})):!l&&i===D.enter&&(this.enterClick=!0)},this.handleKeyUp=n=>{const{onKeyUp:a,role:s}=this.props;a&&a(n);const i=n.key,{triggerOnEnter:l,triggerOnSpace:o}=te(s);l&&i===D.enter||o&&i===D.space?(this.setState({pressed:!1,focused:!0}),this.runCallbackAndMaybeNavigate(n)):!l&&i===D.enter&&(this.enterClick=!1)},this.handleFocus=n=>{const{onFocus:a}=this.props;this.setState({focused:!0},()=>{a&&a(n)})},this.handleBlur=n=>{this.setState({focused:!1,pressed:!1})},this.state=ne,this.waitingForClick=!1,this.enterClick=!1}}Q.defaultProps={disabled:!1};const X=t=>typeof t!="string"?!1:!/^(https?:)?\/\//i.test(t)&&!/^([^#]*#[\w-]*|[\w\-.]+:)/.test(t);function Oe(t){function e(n){const a=be();return r.jsx(t,{...n,navigate:a})}return e.displayName="withRouter(ClickableBehavior)",e}const _e=Oe(Q);function le(t,e,n){return n&&e!==!0&&t&&X(t)?_e:Q}const $e=N("a"),Ue=N("button"),ze=N(de),Ke=w.forwardRef(function(e,n){const a=(k,v,A)=>{const U=e.href&&!e.disabled,z=v&&!e.skipClientNav&&X(e.href||"");return U&&z&&e.href?r.jsx(ze,{...A,to:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:n,children:e.children(k)}):U&&!z?r.jsx($e,{...A,href:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:n,children:e.children(k)}):r.jsx(Ue,{...A,type:"button","aria-disabled":e.disabled,ref:n,children:e.children(k)})},s=J(),{href:i,onClick:l,skipClientNav:o,beforeNav:c=void 0,safeWithNav:d=void 0,style:h,target:y=void 0,testId:g,onFocus:m,onKeyDown:q,onKeyUp:P,onMouseDown:f,onMouseUp:R,hideDefaultFocusRing:b,light:M,disabled:p,tabIndex:C,...I}=e,F=le(i,o,s),H=k=>[O.reset,O.link,!b&&k.focused&&(M?O.focusedLight:O.focused),p&&O.disabled,h];return c?r.jsx(F,{href:i,onClick:l,beforeNav:c,safeWithNav:d,onFocus:m,onKeyDown:q,onKeyUp:P,onMouseDown:f,onMouseUp:R,disabled:p,tabIndex:C,children:(k,v)=>a(k,s,{...I,"data-testid":g,style:H(k),...v})}):r.jsx(F,{href:i,onClick:l,safeWithNav:d,onFocus:m,onKeyDown:q,onKeyUp:P,onMouseDown:f,onMouseUp:R,target:y,disabled:p,tabIndex:C,children:(k,v)=>a(k,s,{...I,"data-testid":g,style:H(k),...v})})});Ke.defaultProps={light:!1,disabled:!1};const O=$.StyleSheet.create({reset:{border:"none",margin:0,padding:0,width:"auto",overflow:"visible",background:"transparent",textDecoration:"none",color:"inherit",font:"inherit",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",outline:"none",lineHeight:"normal",WebkitFontSmoothing:"inherit",MozOsxFontSmoothing:"inherit"},link:{cursor:"pointer"},focused:{":focus":{outline:`solid ${u.width.medium} ${S.focus.outer}`}},focusedLight:{outline:`solid ${u.width.medium} ${S.border.inverse}`},disabled:{color:S.action.secondary.disabled.foreground,cursor:"not-allowed",":focus":{outline:"none"},":focus-visible":{outline:`solid ${u.width.medium} ${S.focus.outer}`}}}),Le={xsmall:16,small:24,medium:48,large:96},Be={xsmall:"M7.237.741C7.165.393 6.95.154 6.656.053A1.01 1.01 0 0 0 6.18.01c-.053.009-.053.009-.087.017C2.553.949 0 4.214 0 7.91 0 12.36 3.598 16 8 16c4.4 0 8-3.647 8-8.112a1.02 1.02 0 0 0-.118-.423.877.877 0 0 0-.808-.48.909.909 0 0 0-.81.46c-.09.151-.13.296-.146.455-.08 3.493-2.737 6.207-6.118 6.207-3.41 0-6.118-2.74-6.118-6.196 0-2.843 1.936-5.291 4.644-6.022.1-.028.224-.082.352-.177a.928.928 0 0 0 .36-.97z",small:"M10.598.943c-.093-.449-.362-.748-.732-.875a1.314 1.314 0 0 0-.723-.033C3.83 1.417 0 6.317 0 11.864 0 18.538 5.398 24 12 24c6.598 0 12-5.471 12-12.16a1.333 1.333 0 0 0-.154-.548c-.193-.368-.544-.606-1.023-.606-.472 0-.825.229-1.035.585-.117.2-.169.39-.189.582-.124 5.472-4.294 9.73-9.599 9.73-5.349 0-9.599-4.3-9.599-9.72 0-4.46 3.036-8.299 7.28-9.444.127-.036.291-.107.458-.232.373-.28.57-.711.46-1.244z",medium:"M44.19 23.455a1.91 1.91 0 1 1 3.801 0h.003c.004.18.006.363.006.545 0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0c.182 0 .364.002.545.006V.01a1.91 1.91 0 1 1 0 3.801v.015A20.564 20.564 0 0 0 24 3.818C12.854 3.818 3.818 12.854 3.818 24c0 11.146 9.036 20.182 20.182 20.182 11.146 0 20.182-9.036 20.182-20.182 0-.182-.003-.364-.007-.545h.015z",large:"M88.38 46.91a3.818 3.818 0 1 1 7.602 0h.006c.008.362.012.725.012 1.09 0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0c.365 0 .728.004 1.09.012v.005a3.818 3.818 0 1 1 0 7.602v.032c-.362-.01-.725-.015-1.09-.015C25.708 7.636 7.636 25.708 7.636 48c0 22.292 18.072 40.364 40.364 40.364 22.292 0 40.364-18.072 40.364-40.364 0-.365-.005-.728-.015-1.09h.032z"},re={light:j.white,dark:j.offBlack50},He=N("path");class ue extends w.Component{render(){const{size:e,light:n,style:a,testId:s}=this.props,i=Le[e],l=Be[e],o=n?re.light:re.dark,c=r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:`0 0 ${i} ${i}`,"data-testid":s,children:r.jsx(He,{style:[ae.loadingSpinner,{fill:o}],fillRule:"nonzero",d:l})});return r.jsx(W,{style:[ae.spinnerContainer,a],children:c})}}ue.defaultProps={size:"large",light:!1};const Ge={"0%":{transform:"rotate(0deg)"},"50%":{transform:"rotate(180deg)"},"100%":{transform:"rotate(360deg)"}},ae=$.StyleSheet.create({spinnerContainer:{justifyContent:"center"},loadingSpinner:{transformOrigin:"50% 50%",animationName:Ge,animationDuration:"1.1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}}),Ve=x.size_040,B={root:{color:S.action,border:{width:{primary:{default:u.width.none,hover:u.width.medium,press:u.width.medium},secondary:{default:u.width.thin,hover:u.width.thin,press:u.width.thin},tertiary:{default:u.width.none,hover:u.width.medium,press:u.width.medium}},offset:{primary:u.width.medium,secondary:0,tertiary:0},radius:{small:u.radius.radius_040,medium:u.radius.radius_040,large:u.radius.radius_040}},sizing:{height:{small:x.size_320,medium:x.size_400,large:x.size_560},underline:{hover:x.size_020,press:x.size_010}},padding:{medium:x.size_160,large:x.size_320},font:{size:{large:"1.8rem"},lineHeight:{small:L.lineHeight.xMedium,default:L.lineHeight.large,large:"2.6rem"},weight:{default:L.weight.bold},offset:{default:Ve}}},icon:{color:{secondary:{progressive:{hover:{background:"transparent",foreground:S.action.secondary.progressive.hover.foreground}},destructive:{hover:{background:"transparent",foreground:S.action.secondary.destructive.hover.foreground}},neutral:{hover:{background:"transparent",foreground:S.action.secondary.neutral.hover.foreground}}}},border:{radius:u.radius.radius_full},margin:{inline:{inner:x.size_060,outer:`calc(-1 * ${u.width.medium})`}},padding:x.size_020}},K=j.offWhite,Je=ke(B,{root:{color:{secondary:{progressive:{default:{border:j.fadedBlue,background:K},hover:{background:K,foreground:S.action.secondary.progressive.default.foreground},press:{background:j.fadedBlue8}},destructive:{default:{border:j.fadedRed,background:K},hover:{background:K,foreground:S.action.secondary.destructive.default.foreground},press:{background:j.fadedRed8}}}},border:{radius:{medium:u.radius.radius_120,small:u.radius.radius_080,large:u.radius.radius_120}},font:{weight:{default:L.weight.medium}}},icon:{color:{secondary:{progressive:{hover:{background:j.fadedBlue16,foreground:S.action.secondary.progressive.default.foreground}},destructive:{hover:{background:j.fadedRed16,foreground:S.action.secondary.destructive.default.foreground}}}},border:{radius:u.radius.radius_full},margin:{inline:{outer:`calc(-1 * ${x.size_080})`}},padding:x.size_020}}),Qe={default:B,khanmigo:Je},ce=ve(B);function Xe(t){const e=w.useContext(we),n=Qe[e]||B;return r.jsx(ce.Provider,{value:n,children:t.children})}function ie({icon:t,size:e,style:n,testId:a}){const s={"aria-hidden":!0,color:"currentColor",style:n,testId:a};switch(e){case"small":return r.jsx(V,{...s,size:"small",icon:t});case"medium":default:return r.jsx(V,{...s,size:"medium",icon:t})}}const Ye=N("a"),Ze=N("button"),et=N(de),tt=w.forwardRef(function(e,n){const{children:a,disabled:s,href:i,id:l,skipClientNav:o,style:c,testId:d,type:h,...y}=e,g={"data-testid":d,id:l,role:"button",style:[nt.reset,c],...y},m=J();return i&&!s?m&&!o&&X(i)?r.jsx(et,{...g,to:i,ref:n,children:a}):r.jsx(Ye,{...g,href:i,ref:n,children:a}):r.jsx(Ze,{type:h||"button",...g,"aria-disabled":s,ref:n,children:a})}),nt=$.StyleSheet.create({reset:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",margin:0,padding:0,border:"none",cursor:"pointer",outline:"none",textDecoration:"none",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",":focus":{WebkitTapHighlightColor:"rgba(0,0,0,0)"}}}),rt=w.forwardRef(function(e,n){const{theme:a,themeName:s}=xe(ce),i=Te(at,a),{children:l,skipClientNav:o,actionType:c,disabled:d,focused:h,hovered:y,href:g=void 0,kind:m="primary",labelStyle:q,pressed:P,size:f="medium",style:R,testId:b,type:M=void 0,spinner:p,startIcon:C,endIcon:I,id:F,waiting:H,...k}=e,v=it(c,m,f,a,s),A=p||d,U=[i.shared,C&&i.withStartIcon,I&&i.withEndIcon,v.default,A&&v.disabled,!A&&(P?v.pressed:h&&v.focused),f==="small"&&i.small,f==="large"&&i.large],z=f==="small"?Re:Ae,ge=r.jsx(z,{style:[i.text,f==="small"&&i.smallText,f==="large"&&i.largeText,q,p&&i.hiddenText,m==="tertiary"&&!A&&(P?[v.hover,v.active]:y&&v.hover)],testId:b?`${b}-inner-label`:void 0,children:l}),pe={medium:"small",small:"xsmall",large:"medium"},Y=f==="small"?"small":"medium",me=r.jsxs(w.Fragment,{children:[C&&r.jsx(W,{style:i.iconWrapper,children:r.jsx(ie,{size:Y,icon:C,style:[i.startIcon,m==="tertiary"&&i.tertiaryStartIcon],testId:b?`${b}-start-icon`:void 0})}),ge,p&&r.jsx(ue,{style:i.spinner,size:pe[f],light:m==="primary",testId:`${b||"button"}-spinner`}),I&&r.jsx(W,{testId:b?`${b}-end-icon-wrapper`:void 0,style:[_.endIcon,i.iconWrapper,i.endIconWrapper,m==="tertiary"&&i.endIconWrapperTertiary,!A&&(h||y)&&m!=="primary"&&v.iconWrapperHovered],children:r.jsx(ie,{size:Y,icon:I,testId:b?`${b}-end-icon`:void 0})})]});return r.jsx(tt,{...k,disabled:A,href:g,id:F,ref:n,skipClientNav:o,style:[U,R],testId:b,tabIndex:e.tabIndex,type:M,children:me})}),at=t=>({shared:{height:t.root.sizing.height.medium,paddingBlock:0,paddingInline:t.root.padding.medium},small:{borderRadius:t.root.border.radius.small,height:t.root.sizing.height.small},large:{borderRadius:t.root.border.radius.large,height:t.root.sizing.height.large},text:{alignItems:"center",fontWeight:t.root.font.weight.default,whiteSpace:"nowrap",overflow:"hidden",lineHeight:t.root.font.lineHeight.default,textOverflow:"ellipsis",display:"inline-block",pointerEvents:"none"},smallText:{lineHeight:t.root.font.lineHeight.small},largeText:{fontSize:t.root.font.size.large,lineHeight:t.root.font.lineHeight.large},hiddenText:{visibility:"hidden"},spinner:{position:"absolute"},startIcon:{marginInlineStart:t.icon.margin.inline.outer,marginInlineEnd:t.icon.margin.inline.inner},tertiaryStartIcon:{marginInlineStart:0},endIcon:{marginInlineStart:t.icon.margin.inline.inner},iconWrapper:{borderRadius:t.icon.border.radius,padding:t.icon.padding,minWidth:"auto"},endIconWrapper:{marginInlineStart:t.icon.margin.inline.inner,marginInlineEnd:t.icon.margin.inline.outer},endIconWrapperTertiary:{marginInlineEnd:0}}),_={},it=(t="progressive",e,n,a,s)=>{const i=`${t}-${e}-${n}-${s}`;if(_[i])return _[i];const l=n==="large"?a.root.padding.large:a.root.padding.medium,o=a.root.border.width[e],c=a.root.border.offset[e],d=a.root.color[e][t],h=a.root.color[e].disabled,y={borderColor:h.border,borderWidth:o.default,background:h.background,color:h.foreground},g={...y,outline:"none",boxShadow:"none",textDecoration:"none",textDecorationThickness:"unset",textUnderlineOffset:"unset"},m={default:{borderRadius:a.root.border.radius[n],paddingInline:e==="tertiary"?0:l,borderStyle:"solid",borderWidth:o.default,borderColor:d.default.border,background:d.default.background,color:d.default.foreground,":hover":{background:d.hover.background,color:d.hover.foreground,...e==="primary"?{outline:`${o.hover} solid ${d.hover.border}`,outlineOffset:c}:void 0,...e==="secondary"?{borderColor:d.hover.border,boxShadow:`inset 0 0 0 ${o.hover} ${d.hover.border}`}:void 0,...e==="tertiary"?{textDecoration:"underline",textUnderlineOffset:a.root.font.offset.default,textDecorationThickness:a.root.sizing.underline.hover}:void 0},"@media not (hover: hover)":{":hover":{backgroundColor:"transparent"}},":active":{background:d.press.background,color:d.press.foreground,...e==="primary"?{outline:`${o.press} solid ${d.press.border}`,outlineOffset:c}:void 0,...e==="secondary"?{borderColor:d.press.border,boxShadow:`inset 0 0 0 ${o.press} ${d.press.border}`}:void 0,...e==="tertiary"?{textDecoration:"underline",textUnderlineOffset:a.root.font.offset.default,textDecorationThickness:a.root.sizing.underline.press}:void 0},...E.focus,...e==="secondary"?{":focus-visible:hover":{...E.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${o.hover} ${d.hover.border}, ${E.focus[":focus-visible"].boxShadow}`},":focus-visible:active":{...E.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${o.press} ${d.press.border}, ${E.focus[":focus-visible"].boxShadow}`}}:{}},disabled:{cursor:"not-allowed",...y,":hover":g,":active":g,":focus-visible":y},iconWrapperHovered:{...e==="secondary"?{backgroundColor:a.icon.color[e][t].hover.background,color:a.icon.color[e][t].hover.foreground}:void 0}};return _[i]=$.StyleSheet.create(m),_[i]},G=w.forwardRef(function(e,n){const{href:a=void 0,type:s=void 0,children:i,skipClientNav:l,onClick:o,beforeNav:c=void 0,safeWithNav:d=void 0,tabIndex:h,target:y,rel:g,actionType:m="progressive",kind:q="primary",size:P="medium",disabled:f=!1,spinner:R=!1,...b}=e,M=J(),p=le(a,l,M),C=c?{beforeNav:c}:{target:y};return r.jsx(p,{disabled:R||f,href:a,role:"button",type:s,onClick:o,safeWithNav:d,rel:g,...C,children:(I,F)=>r.jsx(Xe,{children:r.jsx(rt,{...b,...I,...F,disabled:f,spinner:R||I.waiting,actionType:m,kind:q,size:P,skipClientNav:l,href:a,target:y,type:s,tabIndex:h,ref:n,children:i})})})}),se=T.large_24,st={small:{query:"(max-width: 767px)",totalColumns:4,gutterWidth:T.medium_16,marginWidth:T.medium_16},medium:{query:"(min-width: 768px) and (max-width: 1023px)",totalColumns:8,gutterWidth:T.xLarge_32,marginWidth:T.large_24},large:{query:"(min-width: 1024px)",totalColumns:12,gutterWidth:T.xLarge_32,marginWidth:se,maxWidth:1120+se*2}};T.xLarge_32,T.medium_16;T.medium_16,T.medium_16,T.xLarge_32,T.xxLarge_48;const ot={ssrSize:"large",mediaSpec:st},dt=w.createContext(ot);dt.displayName="MediaLayoutContext";$.StyleSheet.create({grow:{flexGrow:1}});class oe extends w.Component{render(){const{size:e,style:n}=this.props;return r.jsx(W,{"aria-hidden":"true",style:[lt(e),n]})}}const lt=t=>({width:t,MsFlexBasis:t,MsFlexPreferredSize:t,WebkitFlexBasis:t,flexBasis:t,flexShrink:0});function he({score:t}){return t==null?null:r.jsxs(r.Fragment,{children:[r.jsxs("table",{style:{marginTop:"20px"},children:[r.jsx("thead",{children:r.jsxs("tr",{style:{fontWeight:"bold"},children:[r.jsx("td",{children:"Empty"}),r.jsx("td",{children:"Correct"}),r.jsx("td",{style:{width:"100%"},children:"Message"})]})}),r.jsx("tbody",{children:r.jsxs("tr",{children:[r.jsx("td",{children:t.empty.toString()}),r.jsx("td",{children:t.correct.toString()}),r.jsx("td",{children:t.message})]})})]}),r.jsx(Z,{style:{marginTop:"10px"},children:"Guess"}),r.jsx(ee,{quotesOnKeys:!1,enableClipboard:!1,src:t.guess}),r.jsx(Z,{style:{marginTop:"10px"},children:"State"}),r.jsx(ee,{quotesOnKeys:!1,enableClipboard:!1,src:t.state})]})}he.__docgenInfo={description:"",methods:[],displayName:"KEScoreUI",props:{score:{required:!0,tsType:{name:"union",raw:"KEScore | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
}`,signature:{properties:[{key:"empty",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"guess",value:{name:"any",required:!0}},{key:"state",value:{name:"any",required:!0}}]}},{name:"null"},{name:"undefined"}]},description:""}}};const ut=({title:t="Widget",item:e,apiOptions:n=Object.freeze({}),linterContext:a,reviewMode:s=!1,startAnswerless:i=!1,showSolutions:l})=>{const o=w.useRef(null),[c,d]=w.useState(null),[h,y]=w.useState(n.isMobile??!1),[g,m]=w.useState(0),[q,P]=w.useState(i),f={...n,isMobile:h,customKeypad:h},R=()=>{const p=o.current;if(!p)return;const C=p.getUserInput(),I=Ce(e.question,C,"en"),F=[p.getUserInputLegacy(),[]];return De(I,F,p.getSerializedState().question)},M=q&&!s&&(l==="none"||!l)?Se(e):e;return r.jsx(qe,{children:r.jsx(je,{rendererTitle:r.jsxs(W,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:[t,r.jsx(W,{style:{marginLeft:"auto"},children:r.jsx(Me,{icon:r.jsx(V,{icon:Fe}),checked:h,onChange:y})})]}),renderer:r.jsxs(r.Fragment,{children:[r.jsx(W,{className:h?"perseus-mobile":"",children:r.jsx(Ie.Consumer,{children:({keypadElement:p})=>r.jsx(We,{ref:o,problemNum:0,score:c,apiOptions:f,item:M,dependencies:Pe,keypadElement:p,linterContext:a,reviewMode:s,showSolutions:l,hintsVisible:g})})}),r.jsxs(W,{style:{flexDirection:"row",alignItems:"center"},children:[r.jsx(G,{onClick:()=>{P(!1),o.current&&d(R())},children:"Check"}),r.jsx(oe,{size:8}),r.jsx(G,{onClick:()=>{var p;P(!1),(p=o.current)==null||p.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"}),r.jsx(oe,{size:8}),r.jsx(G,{disabled:g>=e.hints.length,onClick:()=>{m(g+1)},children:g>=e.hints.length?"No hints left":`Take Hint ${g+1}`})]}),r.jsx(he,{score:c})]}),jsonObject:M})})};ut.__docgenInfo={description:"",methods:[],displayName:"ServerItemRendererWithDebugUI",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Widget"',computed:!1}},item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""},startAnswerless:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},reviewMode:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showSolutions:{required:!1,tsType:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}]},description:""}}};export{ut as S,Ne as i};
