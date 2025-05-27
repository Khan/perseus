import{j as a}from"./jsx-runtime-BT65X5dW.js";import{r as b}from"./index-C6mWTJJr.js";import{n as W}from"./no-important-DlFk8a1I.js";import{a as we,L as ce,u as X}from"./index-BN1f3DJf.js";import{k as D,a as N,V as B,L as ve,b as ke,H as te,R as ne,S as xe}from"./split-view-Bj3Zehqg.js";import{b as h,a as T,c as j,e as x,f as L,s as S}from"./index-BfjDPqC2.js";import{T as Se,c as Te,m as Ie,u as Pe,b as Ce,f as E}from"./index-BDsoIsav.js";import{V as U}from"./index-B_N1aciG.js";import{T as Re,S as Ae,P as je,d as qe}from"./test-keypad-context-wrapper--C-uYlz0.js";import"./index-default-BcKQpA1a.js";import"./index-DktHmiAd.js";import{s as Fe}from"./split-perseus-item-JKIdQbrf.js";import{C as Me}from"./util-AEEC48XJ.js";import"./jquery-CkHB0_Mt.js";import{a as Ne}from"./mobile-keypad-DvhXuqfO.js";import{S as We}from"./server-item-renderer-Dl2jhlsm.js";import{P as De,E as Ee}from"./perseus-error-CSETqePQ.js";import{s as $e}from"./test-dependencies-Zp9rkyK2.js";function Oe(t){return t.type==="points"&&t.earned>=t.total}function _e(t,e,n){if(t.type==="points")return{empty:!1,correct:Oe(t),message:t.message,guess:e,state:n};if(t.type==="invalid")return{empty:!0,correct:!1,message:t.message,suppressAlmostThere:t.suppressAlmostThere,guess:e,state:n};throw new De("Invalid score type: "+t.type,Ee.InvalidInput,{metadata:{score:JSON.stringify(t),guess:JSON.stringify(e),state:JSON.stringify(n)}})}const re=t=>{switch(t){case"link":return{triggerOnEnter:!0,triggerOnSpace:!1};case"checkbox":case"radio":case"listbox":return{triggerOnEnter:!1,triggerOnSpace:!0};case"button":case"menuitem":case"menu":case"option":default:return{triggerOnEnter:!0,triggerOnSpace:!0}}},ze={onClick:()=>{},onMouseEnter:()=>{},onMouseLeave:()=>{},onMouseDown:()=>{},onMouseUp:()=>{},onTouchStart:()=>{},onTouchEnd:()=>{},onTouchCancel:()=>{},onKeyDown:()=>{},onKeyUp:()=>{}},ae={hovered:!1,focused:!1,pressed:!1,waiting:!1};class Y extends b.Component{static getDerivedStateFromProps(e,n){return e.disabled?{...ae,focused:n.focused}:null}navigateOrReset(e){if(e){const{navigate:n,href:r,skipClientNav:s,target:i=void 0}=this.props;r&&(i==="_blank"?(window.open(r,"_blank"),this.setState({waiting:!1})):n&&!s?(n(r,{viewTransition:this.props.viewTransition}),this.setState({waiting:!1})):window.location.assign(r))}else this.setState({waiting:!1})}handleSafeWithNav(e,n){const{skipClientNav:r,navigate:s}=this.props;return s&&!r||this.props.target==="_blank"?(e(),this.navigateOrReset(n),Promise.resolve()):(this.state.waiting||this.setState({waiting:!0}),e().then(()=>{this.state.waiting||this.setState({waiting:!0})}).catch(i=>{}).finally(()=>{this.navigateOrReset(n)}))}runCallbackAndMaybeNavigate(e){const{onClick:n=void 0,beforeNav:r=void 0,safeWithNav:s=void 0,href:i,type:l}=this.props;let o=!0,u=!0;if(n&&n(e),e.defaultPrevented&&(o=!1,u=!1),e.preventDefault(),!i&&l==="submit"&&u){let d=e.currentTarget;for(;d;){if(d instanceof window.HTMLFormElement){const c=new window.Event("submit",{bubbles:!0,cancelable:!0});d.dispatchEvent(c);break}d=d.parentElement}}if(r)this.setState({waiting:!0}),r().then(()=>s?this.handleSafeWithNav(s,o):this.navigateOrReset(o)).catch(()=>{});else{if(s)return this.handleSafeWithNav(s,o);this.navigateOrReset(o)}}render(){const e=this.props.rel||(this.props.target==="_blank"?"noopener noreferrer":void 0),n=this.props.disabled?{...ze,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e}:{onClick:this.handleClick,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd,onTouchCancel:this.handleTouchCancel,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:e},{children:r}=this.props;return r&&r(this.state,n)}constructor(e){super(e),this.handleClick=n=>{const{onClick:r=void 0,beforeNav:s=void 0,safeWithNav:i=void 0}=this.props;this.enterClick||((r||s||i)&&(this.waitingForClick=!1),this.runCallbackAndMaybeNavigate(n))},this.handleMouseEnter=n=>{this.waitingForClick||this.setState({hovered:!0})},this.handleMouseLeave=()=>{this.waitingForClick||this.setState({hovered:!1,pressed:!1,focused:!1})},this.handleMouseDown=n=>{this.props.onMouseDown&&this.props.onMouseDown(n),this.setState({pressed:!0})},this.handleMouseUp=n=>{this.props.onMouseUp&&this.props.onMouseUp(n),this.setState({pressed:!1,focused:!1})},this.handleTouchStart=()=>{this.setState({pressed:!0})},this.handleTouchEnd=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleTouchCancel=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleKeyDown=n=>{const{onKeyDown:r,role:s}=this.props;r&&r(n);const i=n.key,{triggerOnEnter:l,triggerOnSpace:o}=re(s);l&&i===D.enter||o&&i===D.space?(n.preventDefault(),this.setState({pressed:!0})):!l&&i===D.enter&&(this.enterClick=!0)},this.handleKeyUp=n=>{const{onKeyUp:r,role:s}=this.props;r&&r(n);const i=n.key,{triggerOnEnter:l,triggerOnSpace:o}=re(s);l&&i===D.enter||o&&i===D.space?(this.setState({pressed:!1,focused:!0}),this.runCallbackAndMaybeNavigate(n)):!l&&i===D.enter&&(this.enterClick=!1)},this.handleFocus=n=>{const{onFocus:r}=this.props;this.setState({focused:!0},()=>{r&&r(n)})},this.handleBlur=n=>{this.setState({focused:!1,pressed:!1})},this.state=ae,this.waitingForClick=!1,this.enterClick=!1}}Y.defaultProps={disabled:!1};const Z=t=>typeof t!="string"?!1:!/^(https?:)?\/\//i.test(t)&&!/^([^#]*#[\w-]*|[\w\-.]+:)/.test(t);function Ue(t){function e(n){const r=we();return a.jsx(t,{...n,navigate:r})}return e.displayName="withRouter(ClickableBehavior)",e}const Ke=Ue(Y);function he(t,e,n){return n&&e!==!0&&t&&Z(t)?Ke:Y}const Le=N("a"),Be=N("button"),He=N(ce),Ge=b.forwardRef(function(e,n){const r=(k,v,A)=>{const _=e.href&&!e.disabled,z=v&&!e.skipClientNav&&Z(e.href||"");return _&&z&&e.href?a.jsx(He,{...A,to:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:n,children:e.children(k)}):_&&!z?a.jsx(Le,{...A,href:e.href,role:e.role,target:e.target||void 0,"aria-disabled":e.disabled?"true":"false",ref:n,children:e.children(k)}):a.jsx(Be,{...A,type:"button","aria-disabled":e.disabled,ref:n,children:e.children(k)})},s=X(),{href:i,onClick:l,skipClientNav:o,beforeNav:u=void 0,safeWithNav:d=void 0,style:c,target:f=void 0,testId:g,onFocus:p,onKeyDown:q,onKeyUp:P,onMouseDown:y,onMouseUp:R,hideDefaultFocusRing:w,light:F,disabled:m,tabIndex:C,...I}=e,M=he(i,o,s),G=k=>[$.reset,$.link,!w&&k.focused&&(F?$.focusedLight:$.focused),m&&$.disabled,c];return u?a.jsx(M,{href:i,onClick:l,beforeNav:u,safeWithNav:d,onFocus:p,onKeyDown:q,onKeyUp:P,onMouseDown:y,onMouseUp:R,disabled:m,tabIndex:C,children:(k,v)=>r(k,s,{...I,"data-testid":g,style:G(k),...v})}):a.jsx(M,{href:i,onClick:l,safeWithNav:d,onFocus:p,onKeyDown:q,onKeyUp:P,onMouseDown:y,onMouseUp:R,target:f,disabled:m,tabIndex:C,children:(k,v)=>r(k,s,{...I,"data-testid":g,style:G(k),...v})})});Ge.defaultProps={light:!1,disabled:!1};const $=W.StyleSheet.create({reset:{border:"none",margin:0,padding:0,width:"auto",overflow:"visible",background:"transparent",textDecoration:"none",color:"inherit",font:"inherit",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",outline:"none",lineHeight:"normal",WebkitFontSmoothing:"inherit",MozOsxFontSmoothing:"inherit"},link:{cursor:"pointer"},focused:{":focus":{outline:`solid ${h.width.medium} ${T.focus.outer}`}},focusedLight:{outline:`solid ${h.width.medium} ${T.border.inverse}`},disabled:{color:T.action.secondary.disabled.foreground,cursor:"not-allowed",":focus":{outline:"none"},":focus-visible":{outline:`solid ${h.width.medium} ${T.focus.outer}`}}}),Ve={xsmall:16,small:24,medium:48,large:96},Je={xsmall:"M7.237.741C7.165.393 6.95.154 6.656.053A1.01 1.01 0 0 0 6.18.01c-.053.009-.053.009-.087.017C2.553.949 0 4.214 0 7.91 0 12.36 3.598 16 8 16c4.4 0 8-3.647 8-8.112a1.02 1.02 0 0 0-.118-.423.877.877 0 0 0-.808-.48.909.909 0 0 0-.81.46c-.09.151-.13.296-.146.455-.08 3.493-2.737 6.207-6.118 6.207-3.41 0-6.118-2.74-6.118-6.196 0-2.843 1.936-5.291 4.644-6.022.1-.028.224-.082.352-.177a.928.928 0 0 0 .36-.97z",small:"M10.598.943c-.093-.449-.362-.748-.732-.875a1.314 1.314 0 0 0-.723-.033C3.83 1.417 0 6.317 0 11.864 0 18.538 5.398 24 12 24c6.598 0 12-5.471 12-12.16a1.333 1.333 0 0 0-.154-.548c-.193-.368-.544-.606-1.023-.606-.472 0-.825.229-1.035.585-.117.2-.169.39-.189.582-.124 5.472-4.294 9.73-9.599 9.73-5.349 0-9.599-4.3-9.599-9.72 0-4.46 3.036-8.299 7.28-9.444.127-.036.291-.107.458-.232.373-.28.57-.711.46-1.244z",medium:"M44.19 23.455a1.91 1.91 0 1 1 3.801 0h.003c.004.18.006.363.006.545 0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0c.182 0 .364.002.545.006V.01a1.91 1.91 0 1 1 0 3.801v.015A20.564 20.564 0 0 0 24 3.818C12.854 3.818 3.818 12.854 3.818 24c0 11.146 9.036 20.182 20.182 20.182 11.146 0 20.182-9.036 20.182-20.182 0-.182-.003-.364-.007-.545h.015z",large:"M88.38 46.91a3.818 3.818 0 1 1 7.602 0h.006c.008.362.012.725.012 1.09 0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0c.365 0 .728.004 1.09.012v.005a3.818 3.818 0 1 1 0 7.602v.032c-.362-.01-.725-.015-1.09-.015C25.708 7.636 7.636 25.708 7.636 48c0 22.292 18.072 40.364 40.364 40.364 22.292 0 40.364-18.072 40.364-40.364 0-.365-.005-.728-.015-1.09h.032z"},ie={light:j.white,dark:j.offBlack50},Qe=N("path");class ge extends b.Component{render(){const{size:e,light:n,style:r,testId:s}=this.props,i=Ve[e],l=Je[e],o=n?ie.light:ie.dark,u=a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:`0 0 ${i} ${i}`,"data-testid":s,children:a.jsx(Qe,{style:[se.loadingSpinner,{fill:o}],fillRule:"nonzero",d:l})});return a.jsx(B,{style:[se.spinnerContainer,r],children:u})}}ge.defaultProps={size:"large",light:!1};const Xe={"0%":{transform:"rotate(0deg)"},"50%":{transform:"rotate(180deg)"},"100%":{transform:"rotate(360deg)"}},se=W.StyleSheet.create({spinnerContainer:{justifyContent:"center"},loadingSpinner:{transformOrigin:"50% 50%",animationName:Xe,animationDuration:"1.1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}}),Ye=t=>({small:16,medium:24,large:48,xlarge:96})[t],Ze=N("span"),J=b.forwardRef(function(e,n){const{color:r="currentColor",icon:s,size:i="small",style:l,testId:o,className:u,role:d,...c}=e,f=Ye(i),g=`${u??""}`,p=et(r,f);return a.jsx(Ze,{...c,className:g,style:[Q.svg,p.icon,{maskImage:`url(${s})`},l],"data-testid":o,ref:n,role:d??c["aria-label"]?"img":void 0})}),oe={},et=(t,e)=>{const n=`${t}-${e}`;if(Q[n])return Q[n];const r={icon:{backgroundColor:t,width:e,height:e}};return oe[n]=W.StyleSheet.create(r),oe[n]},Q=W.StyleSheet.create({svg:{display:"inline-block",verticalAlign:"text-bottom",flexShrink:0,flexGrow:0,maskSize:"100%",maskRepeat:"no-repeat",maskPosition:"center"}});J.displayName="PhosphorIcon";const tt=x.size_040,H={root:{color:T.action,border:{width:{primary:{default:h.width.none,hover:h.width.medium,press:h.width.medium},secondary:{default:h.width.thin,hover:h.width.thin,press:h.width.thin},tertiary:{default:h.width.none,hover:h.width.medium,press:h.width.medium}},offset:{primary:h.width.medium,secondary:0,tertiary:0},radius:{small:h.radius.radius_040,medium:h.radius.radius_040,large:h.radius.radius_040}},sizing:{height:{small:x.size_320,medium:x.size_400,large:x.size_560},underline:{hover:x.size_020,press:x.size_010}},padding:{medium:x.size_160,large:x.size_320},font:{size:{large:"1.8rem"},lineHeight:{small:L.lineHeight.xMedium,default:L.lineHeight.large,large:"2.6rem"},weight:{default:L.weight.bold},offset:{default:tt}}},icon:{color:{secondary:{progressive:{hover:{background:"transparent",foreground:T.action.secondary.progressive.hover.foreground}},destructive:{hover:{background:"transparent",foreground:T.action.secondary.destructive.hover.foreground}},neutral:{hover:{background:"transparent",foreground:T.action.secondary.neutral.hover.foreground}}}},border:{radius:h.radius.radius_full},margin:{inline:{inner:x.size_060,outer:`calc(-1 * ${h.width.medium})`}},padding:x.size_020}},K=j.offWhite,nt=Ie(H,{root:{color:{secondary:{progressive:{default:{border:j.fadedBlue,background:K},hover:{background:K,foreground:T.action.secondary.progressive.default.foreground},press:{background:j.fadedBlue8}},destructive:{default:{border:j.fadedRed,background:K},hover:{background:K,foreground:T.action.secondary.destructive.default.foreground},press:{background:j.fadedRed8}}}},border:{radius:{medium:h.radius.radius_120,small:h.radius.radius_080,large:h.radius.radius_120}},font:{weight:{default:L.weight.regular}}},icon:{color:{secondary:{progressive:{hover:{background:j.fadedBlue16,foreground:T.action.secondary.progressive.default.foreground}},destructive:{hover:{background:j.fadedRed16,foreground:T.action.secondary.destructive.default.foreground}}}},border:{radius:h.radius.radius_full},margin:{inline:{outer:`calc(-1 * ${x.size_080})`}},padding:x.size_020}}),rt={default:H,khanmigo:nt},pe=Te(H);function at(t){const e=b.useContext(Se),n=rt[e]||H;return a.jsx(pe.Provider,{value:n,children:t.children})}function de({icon:t,size:e,style:n,testId:r}){const s={"aria-hidden":!0,color:"currentColor",style:n,testId:r};switch(e){case"small":return a.jsx(J,{...s,size:"small",icon:t});case"medium":default:return a.jsx(J,{...s,size:"medium",icon:t})}}const it=N("a"),st=N("button"),ot=N(ce),dt=b.forwardRef(function(e,n){const{children:r,disabled:s,href:i,id:l,skipClientNav:o,style:u,testId:d,type:c,...f}=e,g={"data-testid":d,id:l,role:"button",style:[lt.reset,u],...f},p=X();return i&&!s?p&&!o&&Z(i)?a.jsx(ot,{...g,to:i,ref:n,children:r}):a.jsx(it,{...g,href:i,ref:n,children:r}):a.jsx(st,{type:c||"button",...g,"aria-disabled":s,ref:n,children:r})}),lt=W.StyleSheet.create({reset:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",margin:0,padding:0,border:"none",cursor:"pointer",outline:"none",textDecoration:"none",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",":focus":{WebkitTapHighlightColor:"rgba(0,0,0,0)"}}}),ut=b.forwardRef(function(e,n){const{theme:r,themeName:s}=Pe(pe),i=Ce(ct,r),{children:l,skipClientNav:o,actionType:u,disabled:d,focused:c,hovered:f,href:g=void 0,kind:p="primary",labelStyle:q,pressed:P,size:y="medium",style:R,testId:w,type:F=void 0,spinner:m,startIcon:C,endIcon:I,id:M,waiting:G,...k}=e,v=ht(u,p,y,r,s),A=m||d,_=[i.shared,C&&i.withStartIcon,I&&i.withEndIcon,v.default,A&&v.disabled,!A&&(P?v.pressed:c&&v.focused),y==="small"&&i.small,y==="large"&&i.large],z=y==="small"?ve:ke,fe=a.jsx(z,{style:[i.text,y==="small"&&i.smallText,y==="large"&&i.largeText,q,m&&i.hiddenText,p==="tertiary"&&!A&&(P?[v.hover,v.active]:f&&v.hover)],testId:w?`${w}-inner-label`:void 0,children:l}),ye={medium:"small",small:"xsmall",large:"medium"},ee=y==="small"?"small":"medium",be=a.jsxs(b.Fragment,{children:[C&&a.jsx(B,{style:i.iconWrapper,children:a.jsx(de,{size:ee,icon:C,style:[i.startIcon,p==="tertiary"&&i.tertiaryStartIcon],testId:w?`${w}-start-icon`:void 0})}),fe,m&&a.jsx(ge,{style:i.spinner,size:ye[y],light:p==="primary",testId:`${w||"button"}-spinner`}),I&&a.jsx(B,{testId:w?`${w}-end-icon-wrapper`:void 0,style:[O.endIcon,i.iconWrapper,i.endIconWrapper,p==="tertiary"&&i.endIconWrapperTertiary,!A&&(c||f)&&p!=="primary"&&v.iconWrapperHovered],children:a.jsx(de,{size:ee,icon:I,testId:w?`${w}-end-icon`:void 0})})]});return a.jsx(dt,{...k,disabled:A,href:g,id:M,ref:n,skipClientNav:o,style:[_,R],testId:w,tabIndex:e.tabIndex,type:F,children:be})}),ct=t=>({shared:{height:t.root.sizing.height.medium,paddingBlock:0,paddingInline:t.root.padding.medium},small:{borderRadius:t.root.border.radius.small,height:t.root.sizing.height.small},large:{borderRadius:t.root.border.radius.large,height:t.root.sizing.height.large},text:{alignItems:"center",fontWeight:t.root.font.weight.default,whiteSpace:"nowrap",overflow:"hidden",lineHeight:t.root.font.lineHeight.default,textOverflow:"ellipsis",display:"inline-block",pointerEvents:"none"},smallText:{lineHeight:t.root.font.lineHeight.small},largeText:{fontSize:t.root.font.size.large,lineHeight:t.root.font.lineHeight.large},hiddenText:{visibility:"hidden"},spinner:{position:"absolute"},startIcon:{marginInlineStart:t.icon.margin.inline.outer,marginInlineEnd:t.icon.margin.inline.inner},tertiaryStartIcon:{marginInlineStart:0},endIcon:{marginInlineStart:t.icon.margin.inline.inner},iconWrapper:{borderRadius:t.icon.border.radius,padding:t.icon.padding,minWidth:"auto"},endIconWrapper:{marginInlineStart:t.icon.margin.inline.inner,marginInlineEnd:t.icon.margin.inline.outer},endIconWrapperTertiary:{marginInlineEnd:0}}),O={},ht=(t="progressive",e,n,r,s)=>{const i=`${t}-${e}-${n}-${s}`;if(O[i])return O[i];const l=n==="large"?r.root.padding.large:r.root.padding.medium,o=r.root.border.width[e],u=r.root.border.offset[e],d=r.root.color[e][t],c=r.root.color[e].disabled,f={borderColor:c.border,borderWidth:o.default,background:c.background,color:c.foreground},g={...f,outline:"none",boxShadow:"none",textDecoration:"none",textDecorationThickness:"unset",textUnderlineOffset:"unset"},p={default:{borderRadius:r.root.border.radius[n],paddingInline:e==="tertiary"?0:l,borderStyle:"solid",borderWidth:o.default,borderColor:d.default.border,background:d.default.background,color:d.default.foreground,":hover":{background:d.hover.background,color:d.hover.foreground,...e==="primary"?{outline:`${o.hover} solid ${d.hover.border}`,outlineOffset:u}:void 0,...e==="secondary"?{borderColor:d.hover.border,boxShadow:`inset 0 0 0 ${o.hover} ${d.hover.border}`}:void 0,...e==="tertiary"?{textDecoration:"underline",textUnderlineOffset:r.root.font.offset.default,textDecorationThickness:r.root.sizing.underline.hover}:void 0},"@media not (hover: hover)":{":hover":{backgroundColor:"transparent"}},":active":{background:d.press.background,color:d.press.foreground,...e==="primary"?{outline:`${o.press} solid ${d.press.border}`,outlineOffset:u}:void 0,...e==="secondary"?{borderColor:d.press.border,boxShadow:`inset 0 0 0 ${o.press} ${d.press.border}`}:void 0,...e==="tertiary"?{textDecoration:"underline",textUnderlineOffset:r.root.font.offset.default,textDecorationThickness:r.root.sizing.underline.press}:void 0},...E.focus,...e==="secondary"?{":focus-visible:hover":{...E.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${o.hover} ${d.hover.border}, ${E.focus[":focus-visible"].boxShadow}`},":focus-visible:active":{...E.focus[":focus-visible"],boxShadow:`inset 0 0 0 ${o.press} ${d.press.border}, ${E.focus[":focus-visible"].boxShadow}`}}:{}},disabled:{cursor:"not-allowed",...f,":hover":g,":active":g,":focus-visible":f},iconWrapperHovered:{...e==="secondary"?{backgroundColor:r.icon.color[e][t].hover.background,color:r.icon.color[e][t].hover.foreground}:void 0}};return O[i]=W.StyleSheet.create(p),O[i]},V=b.forwardRef(function(e,n){const{href:r=void 0,type:s=void 0,children:i,skipClientNav:l,onClick:o,beforeNav:u=void 0,safeWithNav:d=void 0,tabIndex:c,target:f,rel:g,actionType:p="progressive",kind:q="primary",size:P="medium",disabled:y=!1,spinner:R=!1,...w}=e,F=X(),m=he(r,l,F),C=u?{beforeNav:u}:{target:f};return a.jsx(m,{disabled:R||y,href:r,role:"button",type:s,onClick:o,safeWithNav:d,rel:g,...C,children:(I,M)=>a.jsx(at,{children:a.jsx(ut,{...w,...I,...M,disabled:y,spinner:R||I.waiting,actionType:p,kind:q,size:P,skipClientNav:l,href:r,target:f,type:s,tabIndex:c,ref:n,children:i})})})}),le=S.large_24,gt={small:{query:"(max-width: 767px)",totalColumns:4,gutterWidth:S.medium_16,marginWidth:S.medium_16},medium:{query:"(min-width: 768px) and (max-width: 1023px)",totalColumns:8,gutterWidth:S.xLarge_32,marginWidth:S.large_24},large:{query:"(min-width: 1024px)",totalColumns:12,gutterWidth:S.xLarge_32,marginWidth:le,maxWidth:1120+le*2}};S.xLarge_32,S.medium_16;S.medium_16,S.medium_16,S.xLarge_32,S.xxLarge_48;const pt={ssrSize:"large",mediaSpec:gt},mt=b.createContext(pt);mt.displayName="MediaLayoutContext";W.StyleSheet.create({grow:{flexGrow:1}});class ue extends b.Component{render(){const{size:e,style:n}=this.props;return a.jsx(B,{"aria-hidden":"true",style:[ft(e),n]})}}const ft=t=>({width:t,MsFlexBasis:t,MsFlexPreferredSize:t,WebkitFlexBasis:t,flexBasis:t,flexShrink:0});function me({score:t}){return t==null?null:a.jsxs(a.Fragment,{children:[a.jsxs("table",{style:{marginTop:"20px"},children:[a.jsx("thead",{children:a.jsxs("tr",{style:{fontWeight:"bold"},children:[a.jsx("td",{children:"Empty"}),a.jsx("td",{children:"Correct"}),a.jsx("td",{style:{width:"100%"},children:"Message"})]})}),a.jsx("tbody",{children:a.jsxs("tr",{children:[a.jsx("td",{children:t.empty.toString()}),a.jsx("td",{children:t.correct.toString()}),a.jsx("td",{children:t.message})]})})]}),a.jsx(te,{style:{marginTop:"10px"},children:"Guess"}),a.jsx(ne,{quotesOnKeys:!1,enableClipboard:!1,src:t.guess}),a.jsx(te,{style:{marginTop:"10px"},children:"State"}),a.jsx(ne,{quotesOnKeys:!1,enableClipboard:!1,src:t.state})]})}me.__docgenInfo={description:"",methods:[],displayName:"KEScoreUI",props:{score:{required:!0,tsType:{name:"union",raw:"KEScore | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
}`,signature:{properties:[{key:"empty",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"guess",value:{name:"any",required:!0}},{key:"state",value:{name:"any",required:!0}}]}},{name:"null"},{name:"undefined"}]},description:""}}};const yt=({title:t="Widget",item:e,apiOptions:n=Object.freeze({}),linterContext:r,reviewMode:s=!1,startAnswerless:i=!1,showSolutions:l})=>{const o=b.useRef(null),[u,d]=b.useState(null),[c,f]=b.useState(n.isMobile??!1),[g,p]=b.useState(0),[q,P]=b.useState(i),y={...n,isMobile:c,customKeypad:c},R=()=>{const m=o.current;if(!m)return;const C=m.getUserInput(),I=Me(e.question,C,"en"),M=[m.getUserInputLegacy(),[]];return _e(I,M,m.getSerializedState().question)},F=q&&!s&&(l==="none"||!l)?Fe(e):e;return a.jsx(Re,{children:a.jsx(xe,{rendererTitle:a.jsxs(U,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:[t,a.jsx(U,{style:{marginLeft:"auto"},children:a.jsx(Ae,{icon:a.jsx(je,{icon:qe}),checked:c,onChange:f})})]}),renderer:a.jsxs(a.Fragment,{children:[a.jsx(U,{className:c?"perseus-mobile":"",children:a.jsx(Ne.Consumer,{children:({keypadElement:m})=>a.jsx(We,{ref:o,problemNum:0,score:u,apiOptions:y,item:F,dependencies:$e,keypadElement:m,linterContext:r,reviewMode:s,showSolutions:l,hintsVisible:g})})}),a.jsxs(U,{style:{flexDirection:"row",alignItems:"center"},children:[a.jsx(V,{onClick:()=>{P(!1),o.current&&d(R())},children:"Check"}),a.jsx(ue,{size:8}),a.jsx(V,{onClick:()=>{var m;P(!1),(m=o.current)==null||m.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"}),a.jsx(ue,{size:8}),a.jsx(V,{disabled:g>=e.hints.length,onClick:()=>{p(g+1)},children:g>=e.hints.length?"No hints left":`Take Hint ${g+1}`})]}),a.jsx(me,{score:u})]}),jsonObject:F})})};yt.__docgenInfo={description:"",methods:[],displayName:"ServerItemRendererWithDebugUI",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Widget"',computed:!1}},item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""},startAnswerless:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},reviewMode:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showSolutions:{required:!1,tsType:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}]},description:""}}};export{yt as S,Oe as i};
