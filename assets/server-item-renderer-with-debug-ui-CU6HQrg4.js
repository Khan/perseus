import{j as s}from"./jsx-runtime-BT65X5dW.js";import{_ as o,a as Y}from"./extends-DDykod_l.js";import{r as i}from"./index-C6mWTJJr.js";import{n as G}from"./no-important-DlFk8a1I.js";import{a as ve,L as he,u as Z}from"./index-CazpBUXm.js";import{k as j,a as N,V as F}from"./index-DOvxIgPk.js";import{b as S,a as O,c as q,s as p,f as U,t as ke}from"./index-Ds5N5m2R.js";import{L as xe,a as Te,H as ae,R as re,S as Se}from"./split-view-C75H4AdG.js";import{T as Ce,c as Pe,m as Ie,u as Re,b as Ae}from"./index-DAJiRA_A.js";import{P as X,T as Ee,S as We,d as qe}from"./test-keypad-context-wrapper-ULbAkEC7.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-Be22yvXk.js";import{s as Fe}from"./split-perseus-item-CtLcNrxj.js";import{s as Ne}from"./util-Diowxd44.js";import"./jquery-CkHB0_Mt.js";import{a as De}from"./mobile-keypad-DlNbOZKZ.js";import{S as Me}from"./server-item-renderer-Bw4PL6Zb.js";import{P as je,E as Le}from"./perseus-error-CSETqePQ.js";import{s as Oe}from"./test-dependencies-KXAeU4kU.js";function _e(e){return e.type==="points"&&e.earned>=e.total}function Ue(e,t,a){if(e.type==="points")return{empty:!1,correct:_e(e),message:e.message,guess:t,state:a};if(e.type==="invalid")return{empty:!0,correct:!1,message:e.message,suppressAlmostThere:e.suppressAlmostThere,guess:t,state:a};throw new je("Invalid score type: "+e.type,Le.InvalidInput,{metadata:{score:JSON.stringify(e),guess:JSON.stringify(t),state:JSON.stringify(a)}})}const ie=e=>{switch(e){case"link":return{triggerOnEnter:!0,triggerOnSpace:!1};case"checkbox":case"radio":case"listbox":return{triggerOnEnter:!1,triggerOnSpace:!0};case"button":case"menuitem":case"menu":case"option":default:return{triggerOnEnter:!0,triggerOnSpace:!0}}},Ke={onClick:()=>{},onMouseEnter:()=>{},onMouseLeave:()=>{},onMouseDown:()=>{},onMouseUp:()=>{},onTouchStart:()=>{},onTouchEnd:()=>{},onTouchCancel:()=>{},onKeyDown:()=>{},onKeyUp:()=>{}},oe={hovered:!1,focused:!1,pressed:!1,waiting:!1};class ee extends i.Component{static getDerivedStateFromProps(t,a){return t.disabled?o({},oe,{focused:a.focused}):null}constructor(t){super(t),this.waitingForClick=void 0,this.enterClick=void 0,this.handleClick=a=>{const{onClick:n=void 0,beforeNav:d=void 0,safeWithNav:r=void 0}=this.props;this.enterClick||((n||d||r)&&(this.waitingForClick=!1),this.runCallbackAndMaybeNavigate(a))},this.handleMouseEnter=a=>{this.waitingForClick||this.setState({hovered:!0})},this.handleMouseLeave=()=>{this.waitingForClick||this.setState({hovered:!1,pressed:!1,focused:!1})},this.handleMouseDown=a=>{this.props.onMouseDown&&this.props.onMouseDown(a),this.setState({pressed:!0})},this.handleMouseUp=a=>{this.props.onMouseUp&&this.props.onMouseUp(a),this.setState({pressed:!1,focused:!1})},this.handleTouchStart=()=>{this.setState({pressed:!0})},this.handleTouchEnd=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleTouchCancel=()=>{this.setState({pressed:!1}),this.waitingForClick=!0},this.handleKeyDown=a=>{const{onKeyDown:n,role:d}=this.props;n&&n(a);const r=a.key,{triggerOnEnter:c,triggerOnSpace:u}=ie(d);c&&r===j.enter||u&&r===j.space?(a.preventDefault(),this.setState({pressed:!0})):!c&&r===j.enter&&(this.enterClick=!0)},this.handleKeyUp=a=>{const{onKeyUp:n,role:d}=this.props;n&&n(a);const r=a.key,{triggerOnEnter:c,triggerOnSpace:u}=ie(d);c&&r===j.enter||u&&r===j.space?(this.setState({pressed:!1,focused:!0}),this.runCallbackAndMaybeNavigate(a)):!c&&r===j.enter&&(this.enterClick=!1)},this.handleFocus=a=>{const{onFocus:n}=this.props;this.setState({focused:!0},()=>{n&&n(a)})},this.handleBlur=a=>{this.setState({focused:!1,pressed:!1})},this.state=oe,this.waitingForClick=!1,this.enterClick=!1}navigateOrReset(t){if(t){const{navigate:a,href:n,skipClientNav:d,target:r=void 0}=this.props;n&&(r==="_blank"?(window.open(n,"_blank"),this.setState({waiting:!1})):a&&!d?(a(n),this.setState({waiting:!1})):window.location.assign(n))}else this.setState({waiting:!1})}handleSafeWithNav(t,a){const{skipClientNav:n,navigate:d}=this.props;return d&&!n||this.props.target==="_blank"?(t(),this.navigateOrReset(a),Promise.resolve()):(this.state.waiting||this.setState({waiting:!0}),t().then(()=>{this.state.waiting||this.setState({waiting:!0})}).catch(r=>{}).finally(()=>{this.navigateOrReset(a)}))}runCallbackAndMaybeNavigate(t){const{onClick:a=void 0,beforeNav:n=void 0,safeWithNav:d=void 0,href:r,type:c}=this.props;let u=!0,y=!0;if(a&&a(t),t.defaultPrevented&&(u=!1,y=!1),t.preventDefault(),!r&&c==="submit"&&y){let h=t.currentTarget;for(;h;){if(h instanceof window.HTMLFormElement){const w=new window.Event("submit",{bubbles:!0,cancelable:!0});h.dispatchEvent(w);break}h=h.parentElement}}if(n)this.setState({waiting:!0}),n().then(()=>d?this.handleSafeWithNav(d,u):this.navigateOrReset(u)).catch(()=>{});else{if(d)return this.handleSafeWithNav(d,u);this.navigateOrReset(u)}}render(){const t=this.props.rel||(this.props.target==="_blank"?"noopener noreferrer":void 0),a=this.props.disabled?o({},Ke,{onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:t}):{onClick:this.handleClick,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd,onTouchCancel:this.handleTouchCancel,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,onFocus:this.handleFocus,onBlur:this.handleBlur,tabIndex:this.props.tabIndex,rel:t},{children:n}=this.props;return n&&n(this.state,a)}}ee.defaultProps={disabled:!1};const te=e=>typeof e!="string"?!1:!/^(https?:)?\/\//i.test(e)&&!/^([^#]*#[\w-]*|[\w\-.]+:)/.test(e);function ze(e){function t(a){const n=ve();return i.createElement(e,o({},a,{navigate:n}))}return t.displayName="withRouter(ClickableBehavior)",t}const He=ze(ee);function ge(e,t,a){return a&&t!==!0&&e&&te(e)?He:ee}const $e=["href","onClick","skipClientNav","beforeNav","safeWithNav","style","target","testId","onFocus","onKeyDown","onKeyUp","onMouseDown","onMouseUp","hideDefaultFocusRing","light","disabled","tabIndex"],Be=N("a"),Ge=N("button"),Ve=N(he),Je=i.forwardRef(function(t,a){const n=(C,T,E)=>{const H=t.href&&!t.disabled,M=T&&!t.skipClientNav&&te(t.href||"");return H&&M&&t.href?i.createElement(Ve,o({},E,{to:t.href,role:t.role,target:t.target||void 0,"aria-disabled":t.disabled?"true":"false",ref:a}),t.children(C)):H&&!M?i.createElement(Be,o({},E,{href:t.href,role:t.role,target:t.target||void 0,"aria-disabled":t.disabled?"true":"false",ref:a}),t.children(C)):i.createElement(Ge,o({},E,{type:"button","aria-disabled":t.disabled,ref:a}),t.children(C))},d=Z(),{href:r,onClick:c,skipClientNav:u,beforeNav:y=void 0,safeWithNav:h=void 0,style:w,target:l=void 0,testId:g,onFocus:m,onKeyDown:f,onKeyUp:x,onMouseDown:I,onMouseUp:v,hideDefaultFocusRing:D,light:k,disabled:b,tabIndex:R}=t,A=Y(t,$e),W=ge(r,u,d),z=C=>[_.reset,_.link,!D&&C.focused&&(k?_.focusedLight:_.focused),b&&_.disabled,w];return y?i.createElement(W,{href:r,onClick:c,beforeNav:y,safeWithNav:h,onFocus:m,onKeyDown:f,onKeyUp:x,onMouseDown:I,onMouseUp:v,disabled:b,tabIndex:R},(C,T)=>n(C,d,o({},A,{"data-testid":g,style:z(C)},T))):i.createElement(W,{href:r,onClick:c,safeWithNav:h,onFocus:m,onKeyDown:f,onKeyUp:x,onMouseDown:I,onMouseUp:v,target:l,disabled:b,tabIndex:R},(C,T)=>n(C,d,o({},A,{"data-testid":g,style:z(C)},T)))});Je.defaultProps={light:!1,disabled:!1};const _=G.StyleSheet.create({reset:{border:"none",margin:0,padding:0,width:"auto",overflow:"visible",background:"transparent",textDecoration:"none",color:"inherit",font:"inherit",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",outline:"none",lineHeight:"normal",WebkitFontSmoothing:"inherit",MozOsxFontSmoothing:"inherit"},link:{cursor:"pointer"},focused:{":focus":{outline:`solid ${S.width.medium} ${O.focus.outer}`}},focusedLight:{outline:`solid ${S.width.medium} ${O.border.inverse}`},disabled:{color:O.action.secondary.disabled.foreground,cursor:"not-allowed",":focus":{outline:"none"},":focus-visible":{outline:`solid ${S.width.medium} ${O.focus.outer}`}}}),Qe={xsmall:16,small:24,medium:48,large:96},Xe={xsmall:"M7.237.741C7.165.393 6.95.154 6.656.053A1.01 1.01 0 0 0 6.18.01c-.053.009-.053.009-.087.017C2.553.949 0 4.214 0 7.91 0 12.36 3.598 16 8 16c4.4 0 8-3.647 8-8.112a1.02 1.02 0 0 0-.118-.423.877.877 0 0 0-.808-.48.909.909 0 0 0-.81.46c-.09.151-.13.296-.146.455-.08 3.493-2.737 6.207-6.118 6.207-3.41 0-6.118-2.74-6.118-6.196 0-2.843 1.936-5.291 4.644-6.022.1-.028.224-.082.352-.177a.928.928 0 0 0 .36-.97z",small:"M10.598.943c-.093-.449-.362-.748-.732-.875a1.314 1.314 0 0 0-.723-.033C3.83 1.417 0 6.317 0 11.864 0 18.538 5.398 24 12 24c6.598 0 12-5.471 12-12.16a1.333 1.333 0 0 0-.154-.548c-.193-.368-.544-.606-1.023-.606-.472 0-.825.229-1.035.585-.117.2-.169.39-.189.582-.124 5.472-4.294 9.73-9.599 9.73-5.349 0-9.599-4.3-9.599-9.72 0-4.46 3.036-8.299 7.28-9.444.127-.036.291-.107.458-.232.373-.28.57-.711.46-1.244z",medium:"M44.19 23.455a1.91 1.91 0 1 1 3.801 0h.003c.004.18.006.363.006.545 0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0c.182 0 .364.002.545.006V.01a1.91 1.91 0 1 1 0 3.801v.015A20.564 20.564 0 0 0 24 3.818C12.854 3.818 3.818 12.854 3.818 24c0 11.146 9.036 20.182 20.182 20.182 11.146 0 20.182-9.036 20.182-20.182 0-.182-.003-.364-.007-.545h.015z",large:"M88.38 46.91a3.818 3.818 0 1 1 7.602 0h.006c.008.362.012.725.012 1.09 0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0c.365 0 .728.004 1.09.012v.005a3.818 3.818 0 1 1 0 7.602v.032c-.362-.01-.725-.015-1.09-.015C25.708 7.636 7.636 25.708 7.636 48c0 22.292 18.072 40.364 40.364 40.364 22.292 0 40.364-18.072 40.364-40.364 0-.365-.005-.728-.015-1.09h.032z"},se={light:q.white,dark:q.offBlack50},Ye=N("path");class pe extends i.Component{render(){const{size:t,light:a,style:n,testId:d}=this.props,r=Qe[t],c=Xe[t],u=a?se.light:se.dark,y=i.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:r,viewBox:`0 0 ${r} ${r}`,"data-testid":d},i.createElement(Ye,{style:[de.loadingSpinner,{fill:u}],fillRule:"nonzero",d:c}));return i.createElement(F,{style:[de.spinnerContainer,n]},y)}}pe.defaultProps={size:"large",light:!1};const Ze={"0%":{transform:"rotate(0deg)"},"50%":{transform:"rotate(180deg)"},"100%":{transform:"rotate(360deg)"}},de=G.StyleSheet.create({spinnerContainer:{justifyContent:"center"},loadingSpinner:{transformOrigin:"50% 50%",animationName:Ze,animationDuration:"1.1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}}),{semanticColor:P}=ke,$=p.xxxSmall_4,L={border:P.focus.outer},V={color:{primary:{progressive:o({},P.action.primary.progressive,{focus:L}),destructive:o({},P.action.primary.destructive,{focus:L}),disabled:P.action.primary.disabled},secondary:{progressive:o({},P.action.secondary.progressive,{focus:L,hover:o({},P.action.secondary.progressive.hover,{icon:"transparent"})}),destructive:o({},P.action.secondary.destructive,{focus:L,hover:o({},P.action.secondary.destructive.hover,{icon:"transparent"})}),disabled:o({},P.action.secondary.disabled,{border:P.action.primary.disabled.border})},tertiary:{progressive:o({},P.action.tertiary.progressive,{focus:L}),destructive:o({},P.action.tertiary.destructive,{focus:L}),disabled:P.action.tertiary.disabled}},border:{width:{secondary:S.width.thin,focused:S.width.medium,disabled:S.width.medium},offset:{primary:p.xxxxSmall_2,secondary:-p.xxxxSmall_2},radius:{default:S.radius.radius_040,small:S.radius.radius_040,large:S.radius.radius_040,icon:S.radius.radius_full}},size:{height:{small:p.xLarge_32,medium:40,large:56},underline:{hover:p.xxxxSmall_2,active:1}},margin:{icon:{offset:-p.xxxxSmall_2}},padding:{xsmall:p.xxxxSmall_2,small:p.xxSmall_6,medium:p.small_12,large:p.medium_16,xLarge:p.xLarge_32},font:{size:{large:18},lineHeight:{small:U.lineHeight.small+$,default:U.lineHeight.medium+$,large:U.lineHeight.medium+2+$},weight:{default:U.weight.bold},offset:{default:$}}},B=q.offWhite,et=Ie(V,{color:{secondary:{progressive:{default:{border:q.fadedBlue,background:B},hover:{background:B,icon:q.fadedBlue16,foreground:O.action.secondary.progressive.default.foreground},press:{background:q.fadedBlue8}},destructive:{default:{border:q.fadedRed,background:B},hover:{background:B,icon:q.fadedRed16,foreground:O.action.secondary.destructive.default.foreground},press:{background:q.fadedRed8}}}},border:{radius:{default:S.radius.radius_120,small:S.radius.radius_080,large:S.radius.radius_120},width:{focused:S.width.thin}},margin:{icon:{offset:-p.xSmall_8}},font:{weight:{default:U.weight.regular}}}),tt={default:V,khanmigo:et},me=Pe(V);function nt(e){const t=i.useContext(Ce),a=tt[t]||V;return i.createElement(me.Provider,{value:a},e.children)}function le({icon:e,size:t,style:a,testId:n}){const d={"aria-hidden":!0,color:"currentColor",style:a,testId:n};switch(t){case"small":return i.createElement(X,o({},d,{size:"small",icon:e}));case"medium":default:return i.createElement(X,o({},d,{size:"medium",icon:e}))}}const at=["children","skipClientNav","color","disabled","focused","hovered","href","kind","labelStyle","pressed","size","style","testId","type","spinner","startIcon","endIcon","id","waiting"],rt=N("a"),it=N("button"),ot=N(he),st=i.forwardRef(function(t,a){const{theme:n,themeName:d}=Re(me),r=Ae(dt,n),c=Z(),{children:u,skipClientNav:y,color:h,disabled:w,focused:l,hovered:g,href:m=void 0,kind:f="primary",labelStyle:x,pressed:I,size:v="medium",style:D,testId:k,type:b=void 0,spinner:R,startIcon:A,endIcon:W,id:z}=t,C=Y(t,at),T=lt(h,f,v,n,d),E=R||w,H=[r.shared,E&&r.disabled,A&&r.withStartIcon,W&&r.withEndIcon,T.default,E&&T.disabled,!E&&(I?T.pressed:l&&T.focused),v==="small"&&r.small,v==="large"&&r.large],M=o({"data-testid":k,id:z,role:"button",style:[H,D]},C),ye=v==="small"?xe:Te,be=i.createElement(ye,{style:[r.text,v==="small"&&r.smallText,v==="large"&&r.largeText,x,R&&r.hiddenText,f==="tertiary"&&r.textWithFocus,f==="tertiary"&&!E&&(I?[T.hover,T.active]:g&&T.hover)],testId:k?`${k}-inner-label`:void 0},u),we={medium:"small",small:"xsmall",large:"medium"},ne=v==="small"?"small":"medium",J=i.createElement(i.Fragment,null,A&&i.createElement(F,{style:r.iconWrapper},i.createElement(le,{size:ne,icon:A,style:[r.startIcon,f==="tertiary"&&r.tertiaryStartIcon],testId:k?`${k}-start-icon`:void 0})),be,R&&i.createElement(pe,{style:r.spinner,size:we[v],light:f==="primary",testId:`${k||"button"}-spinner`}),W&&i.createElement(F,{testId:k?`${k}-end-icon-wrapper`:void 0,style:[K.endIcon,r.iconWrapper,r.endIconWrapper,f==="tertiary"&&r.endIconWrapperTertiary,!E&&(l||g)&&f!=="primary"&&T.iconWrapperHovered]},i.createElement(le,{size:ne,icon:W,testId:k?`${k}-end-icon`:void 0})));return m&&!E?c&&!y&&te(m)?i.createElement(ot,o({},M,{to:m,ref:a}),J):i.createElement(rt,o({},M,{href:m,ref:a}),J):i.createElement(it,o({type:b||"button"},M,{"aria-disabled":E,ref:a}),J)}),dt=e=>({shared:{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",height:e.size.height.medium,paddingTop:0,paddingBottom:0,paddingLeft:e.padding.large,paddingRight:e.padding.large,border:"none",borderRadius:e.border.radius.default,cursor:"pointer",outline:"none",textDecoration:"none",boxSizing:"border-box",touchAction:"manipulation",userSelect:"none",":focus":{WebkitTapHighlightColor:"rgba(0,0,0,0)"}},disabled:{cursor:"auto"},small:{borderRadius:e.border.radius.small,height:e.size.height.small},large:{borderRadius:e.border.radius.large,height:e.size.height.large},text:{alignItems:"center",fontWeight:e.font.weight.default,whiteSpace:"nowrap",overflow:"hidden",lineHeight:`${e.font.lineHeight.default}px`,textOverflow:"ellipsis",display:"inline-block",pointerEvents:"none"},smallText:{lineHeight:`${e.font.lineHeight.small}px`},largeText:{fontSize:e.font.size.large,lineHeight:`${e.font.lineHeight.large}px`},textWithFocus:{position:"relative"},hiddenText:{visibility:"hidden"},spinner:{position:"absolute"},startIcon:{marginRight:e.padding.small,marginLeft:e.margin.icon.offset},tertiaryStartIcon:{marginLeft:0},endIcon:{marginLeft:e.padding.small},iconWrapper:{borderRadius:e.border.radius.icon,padding:e.padding.xsmall,minWidth:"auto"},endIconWrapper:{marginLeft:e.padding.small,marginRight:e.margin.icon.offset},endIconWrapperTertiary:{marginRight:0}}),K={},lt=(e="default",t,a,n,d)=>{const r=`${e}-${t}-${a}-${d}`;if(K[r])return K[r];const c=a==="large"?n.padding.xLarge:n.padding.large,u=e==="destructive"?"destructive":"progressive",y=n.color[t].disabled,h={borderColor:y.border,background:y.background,color:y.foreground};let w={};if(t==="primary"){const l=n.color.primary[u],g={outlineOffset:n.border.offset.primary,outlineStyle:"solid",outlineWidth:n.border.width.focused},m=o({},g,{outlineColor:l.focus.border}),f=o({},g,{outlineColor:l.hover.border}),x={background:l.press.background,outlineColor:l.press.border,outlineOffset:n.border.offset.primary,outlineStyle:"solid",outlineWidth:n.border.width.focused};w={default:{background:l.default.background,color:l.default.foreground,paddingInline:c,":hover":f,":focus-visible":m,":active":x},focused:m,pressed:x,disabled:o({},h,{cursor:"not-allowed",":hover":o({},h,{outline:"none"}),":active":o({},h,{outline:"none"}),":focus-visible":m})}}else if(t==="secondary"){const l=n.color.secondary[u],g={background:l.hover.background,outlineStyle:"solid",outlineOffset:n.border.offset.secondary,outlineWidth:n.border.width.focused},m=o({},g,{outlineColor:l.focus.border}),f=o({},g,{borderColor:l.hover.border}),x={background:l.press.background,color:l.press.foreground,outlineColor:l.press.border,outlineStyle:"solid",outlineWidth:n.border.width.focused};w={default:{background:l.default.background,color:l.default.foreground,borderColor:l.default.border,borderStyle:"solid",borderWidth:n.border.width.secondary,paddingInline:c,":hover":f,":focus-visible":m,":active":x},focused:m,pressed:x,disabled:o({},h,{cursor:"not-allowed",":hover":o({},h,{outline:"none"}),":active":o({},h,{outline:"none"}),":focus-visible":m}),iconWrapperHovered:{backgroundColor:l.hover.icon,color:l.hover.foreground}}}else if(t==="tertiary"){const l=n.color.tertiary[u],g={outlineStyle:"solid",borderColor:"transparent",outlineColor:l.focus.border,outlineWidth:n.border.width.focused,borderRadius:n.border.radius.default},m={color:l.press.foreground,textDecoration:"underline",textDecorationThickness:n.size.underline.active,textUnderlineOffset:n.font.offset.default},f=o({},h,{textDecoration:"none",textDecorationThickness:"unset",textUnderlineOffset:"unset",outline:"none"});w={default:{background:l.default.background,color:l.default.foreground,paddingInline:0,":hover":{textUnderlineOffset:n.font.offset.default,textDecoration:"underline",textDecorationThickness:n.size.underline.hover},":focus-visible":g,":active":m},focused:g,pressed:m,disabled:o({},h,{cursor:"not-allowed",":hover":f,":active":f,":focus-visible":g})}}else throw new Error("Button kind not recognized");return K[r]=G.StyleSheet.create(w),K[r]},ut=["href","type","children","skipClientNav","onClick","beforeNav","safeWithNav","tabIndex","target","rel","color","kind","size","disabled","spinner"],Q=i.forwardRef(function(t,a){const{href:n=void 0,type:d=void 0,children:r,skipClientNav:c,onClick:u,beforeNav:y=void 0,safeWithNav:h=void 0,tabIndex:w,target:l,rel:g,color:m="default",kind:f="primary",size:x="medium",disabled:I=!1,spinner:v=!1}=t,D=Y(t,ut),k=Z(),b=ge(n,c,k),R=(A,W)=>i.createElement(nt,null,i.createElement(st,o({},D,A,W,{disabled:I,spinner:v||A.waiting,color:m,kind:f,size:x,skipClientNav:c,href:n,target:l,type:d,tabIndex:w,ref:a}),r));return y?i.createElement(b,{disabled:v||I,href:n,role:"button",type:d,onClick:u,beforeNav:y,safeWithNav:h,rel:g},R):i.createElement(b,{disabled:v||I,href:n,role:"button",type:d,onClick:u,safeWithNav:h,target:l,rel:g},R)}),ue=p.large_24,ct={small:{query:"(max-width: 767px)",totalColumns:4,gutterWidth:p.medium_16,marginWidth:p.medium_16},medium:{query:"(min-width: 768px) and (max-width: 1023px)",totalColumns:8,gutterWidth:p.xLarge_32,marginWidth:p.large_24},large:{query:"(min-width: 1024px)",totalColumns:12,gutterWidth:p.xLarge_32,marginWidth:ue,maxWidth:1120+ue*2}};p.xLarge_32,p.medium_16;p.medium_16,p.medium_16,p.xLarge_32,p.xxLarge_48;const ht={ssrSize:"large",mediaSpec:ct},gt=i.createContext(ht);gt.displayName="MediaLayoutContext";G.StyleSheet.create({grow:{flexGrow:1}});class ce extends i.Component{render(){const{size:t,style:a}=this.props;return i.createElement(F,{"aria-hidden":"true",style:[pt(t),a]})}}const pt=e=>({width:e,MsFlexBasis:e,MsFlexPreferredSize:e,WebkitFlexBasis:e,flexBasis:e,flexShrink:0});function fe({score:e}){return e==null?null:s.jsxs(s.Fragment,{children:[s.jsxs("table",{style:{marginTop:"20px"},children:[s.jsx("thead",{children:s.jsxs("tr",{style:{fontWeight:"bold"},children:[s.jsx("td",{children:"Empty"}),s.jsx("td",{children:"Correct"}),s.jsx("td",{style:{width:"100%"},children:"Message"})]})}),s.jsx("tbody",{children:s.jsxs("tr",{children:[s.jsx("td",{children:e.empty.toString()}),s.jsx("td",{children:e.correct.toString()}),s.jsx("td",{children:e.message})]})})]}),s.jsx(ae,{style:{marginTop:"10px"},children:"Guess"}),s.jsx(re,{quotesOnKeys:!1,enableClipboard:!1,src:e.guess}),s.jsx(ae,{style:{marginTop:"10px"},children:"State"}),s.jsx(re,{quotesOnKeys:!1,enableClipboard:!1,src:e.state})]})}fe.__docgenInfo={description:"",methods:[],displayName:"KEScoreUI",props:{score:{required:!0,tsType:{name:"union",raw:"KEScore | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
}`,signature:{properties:[{key:"empty",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"guess",value:{name:"any",required:!0}},{key:"state",value:{name:"any",required:!0}}]}},{name:"null"},{name:"undefined"}]},description:""}}};const mt=({title:e="Widget",item:t,apiOptions:a=Object.freeze({}),linterContext:n,reviewMode:d=!1,startAnswerless:r=!1,showSolutions:c})=>{const u=i.useRef(null),[y,h]=i.useState(null),[w,l]=i.useState(a.isMobile??!1),[g,m]=i.useState(0),[f,x]=i.useState(r),I={...a,isMobile:w,customKeypad:w},v=()=>{const b=u.current;if(!b)return;const R=b.getUserInput(),A=Ne(t.question,R,"en"),W=[b.getUserInputLegacy(),[]];return Ue(A,W,b.getSerializedState().question)},k=f&&!d&&(c==="none"||!c)?Fe(t):t;return s.jsx(Ee,{children:s.jsx(Se,{rendererTitle:s.jsxs(F,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:[e,s.jsx(F,{style:{marginLeft:"auto"},children:s.jsx(We,{icon:s.jsx(X,{icon:qe}),checked:w,onChange:l})})]}),renderer:s.jsxs(s.Fragment,{children:[s.jsx(F,{className:w?"perseus-mobile":"",children:s.jsx(De.Consumer,{children:({keypadElement:b})=>s.jsx(Me,{ref:u,problemNum:0,score:y,apiOptions:I,item:k,dependencies:Oe,keypadElement:b,linterContext:n,reviewMode:d,showSolutions:c,hintsVisible:g})})}),s.jsxs(F,{style:{flexDirection:"row",alignItems:"center"},children:[s.jsx(Q,{onClick:()=>{x(!1),u.current&&h(v())},children:"Check"}),s.jsx(ce,{size:8}),s.jsx(Q,{onClick:()=>{var b;x(!1),(b=u.current)==null||b.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"}),s.jsx(ce,{size:8}),s.jsx(Q,{disabled:g>=t.hints.length,onClick:()=>{m(g+1)},children:g>=t.hints.length?"No hints left":`Take Hint ${g+1}`})]}),s.jsx(fe,{score:y})]}),jsonObject:k})})};mt.__docgenInfo={description:"",methods:[],displayName:"ServerItemRendererWithDebugUI",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Widget"',computed:!1}},item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""},startAnswerless:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},reviewMode:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showSolutions:{required:!1,tsType:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}]},description:""}}};export{mt as S,_e as i};
