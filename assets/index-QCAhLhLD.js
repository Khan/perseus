import{a as w,_ as m,b as I,U as Oe,V as A,u as Ve,c as Me,I as xe}from"./index-6h5t6F0w.js";import{r as t}from"./index-TT1qJ6UJ.js";import{l as S}from"./index-awljIyHI.js";import{s as h,m as V,c as a,b as he,a as Ke}from"./index-deFLJwr4.js";import{a as re,b as z,s as Se}from"./index-h_CiYGGb.js";import{P as Ue}from"./index-xuPsLuPk.js";import{c as He,m as Ge}from"./minus-bold-ONmDo3Ve.js";function Ce(n){const e=[];if(n)if(Array.isArray(n))for(const o of n)e.push(...Ce(o));else e.push(n);else return e;return e}function ke(n){const e=[],o=[];if(!n)return{style:{},className:""};const r=typeof global<"u"&&global.SNAPSHOT_INLINE_APHRODITE;Ce(n).forEach(i=>{const s=i._definition;if(s!=null)if(r){const d={};for(const[u,c]of Object.entries(s))d[u.replace(/-[a-z]/g,f=>f[1].toUpperCase())]=c;o.push(d)}else e.push(i);else o.push(i)});const l=Object.assign({},...o);if(o.length>0&&!r){const i=S.StyleSheet.create({inlineStyles:l});e.push(i.inlineStyles)}return{style:r?l:{},className:S.css(...e)}}const je=["children","style","tag","testId"],Xe=/^h[1-6]$/,pe=S.StyleSheet.create({text:{WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},header:{marginTop:0,marginBottom:0}});t.forwardRef(function(e,o){let{children:r,style:l,tag:i="span",testId:s}=e,d=w(e,je);const u=Xe.test(i),c=ke([pe.text,u&&pe.header,l]),f=d.className?[d.className,c.className].join(" "):c.className;return t.createElement(i,m({},d,{style:c.style,className:f,"data-testid":s,ref:o}),r)});const Je=["className","style"];function M(n,e){return t.forwardRef((o,r)=>{const{className:l,style:i}=o,s=w(o,Je),d=typeof n=="string"?Qe[n]:null,{className:u,style:c}=ke([d,e,i]);return t.createElement(n,m({},s,{ref:r,className:[u,l].filter(Boolean).join(" "),style:c}))})}const Qe=S.StyleSheet.create({button:{margin:0,"::-moz-focus-inner":{border:0}}}),Ye=["testId","tag"],K=S.StyleSheet.create({default:{alignItems:"stretch",borderWidth:0,borderStyle:"solid",boxSizing:"border-box",display:"flex",flexDirection:"column",margin:0,padding:0,position:"relative",zIndex:0,minHeight:0,minWidth:0}}),Ze=M("div",K.default),et=M("article",K.default),tt=M("aside",K.default),rt=M("nav",K.default),ot=M("section",K.default),at=t.forwardRef(function(e,o){const{testId:r,tag:l="div"}=e,i=w(e,Ye),s=m({},i,{"data-testid":r});switch(l){case"article":return t.createElement(et,m({},s,{ref:o}));case"aside":return t.createElement(tt,m({},s,{ref:o}));case"nav":return t.createElement(rt,m({},s,{ref:o}));case"section":return t.createElement(ot,m({},s,{ref:o}));case"div":return t.createElement(Ze,m({},s,{ref:o}));default:throw Error(`${l} is not an allowed value for the 'tag' prop`)}});let D=function(n){return n.Root="root",n.Initial="initial",n.Standard="standard",n}({});const Z=t.createContext(D.Root);Z.displayName="RenderStateContext";class lt extends t.Component{constructor(...e){super(...e),this.state={mounted:!1},this._isTheRootComponent=!1}componentDidMount(){this._isTheRootComponent&&this.setState({mounted:!0})}_renderAsRootComponent(){const{mounted:e}=this.state,{children:o,fallback:r}=this.props;return this._isTheRootComponent=!0,e?t.createElement(Z.Provider,{value:D.Standard},o()):r?t.createElement(Z.Provider,{value:D.Initial},r()):null}_maybeRender(e){const{children:o,fallback:r}=this.props;switch(e){case D.Root:return this._renderAsRootComponent();case D.Initial:return r?r():null;case D.Standard:return o()}{var l;return console.log(`We got a render state we don't understand: "${(l=JSON.stringify(e))!=null?l:""}"`),this._maybeRender(D.Root)}}render(){return t.createElement(Z.Consumer,null,e=>this._maybeRender(e))}}class oe{constructor(e){this._uniqueFactoryName=void 0,this.get=r=>{const l=r.toLowerCase();if(!this._hasValidIdChars(r))throw new Error(`Invalid identifier key: ${r}`);return`${this._uniqueFactoryName}-${l}`},e=typeof e=="string"?e:"";const o=e.toLowerCase();if(!this._hasValidIdChars(o))throw new Error(`Invalid factory scope: ${e}`);this._uniqueFactoryName=`uid-${o}-${oe._factoryUniquenessCounter++}`}_hasValidIdChars(e){return typeof e=="string"?!/\s/.test(e):!1}}oe._factoryUniquenessCounter=0;class ne{get(e){return e}}ne.Default=new ne;var nt=ne.Default;class st extends t.Component{constructor(...e){super(...e),this._idFactory=void 0}_performRender(e){const{children:o,mockOnFirstRender:r,scope:l}=this.props;return e?r?o(nt):null:(this._idFactory||(this._idFactory=new oe(l)),o(this._idFactory))}render(){return t.createElement(lt,{fallback:()=>this._performRender(!0)},()=>this._performRender(!1))}}class ie extends t.Component{renderChildren(e){const{id:o,children:r}=this.props,l=e?e.get(ie.defaultId):o;if(!l)throw new Error("Did not get an identifier factory nor a id prop");return r(l)}render(){const{id:e,scope:o}=this.props;return e?this.renderChildren():t.createElement(st,{scope:o,mockOnFirstRender:!0},r=>this.renderChildren(r))}}ie.defaultId="wb-id";const me=h.large_24,it={small:{query:"(max-width: 767px)",totalColumns:4,gutterWidth:h.medium_16,marginWidth:h.medium_16},medium:{query:"(min-width: 768px) and (max-width: 1023px)",totalColumns:8,gutterWidth:h.xLarge_32,marginWidth:h.large_24},large:{query:"(min-width: 1024px)",totalColumns:12,gutterWidth:h.xLarge_32,marginWidth:me,maxWidth:1120+me*2}},dt={ssrSize:"large",mediaSpec:it},ct=t.createContext(dt);ct.displayName="MediaLayoutContext";S.StyleSheet.create({grow:{flexGrow:1}});class q extends t.Component{render(){const{size:e,style:o}=this.props;return t.createElement(at,{"aria-hidden":"true",style:[ut(e),o]})}}const ut=n=>({width:n,MsFlexBasis:n,MsFlexPreferredSize:n,WebkitFlexBasis:n,flexBasis:n,flexShrink:0}),ft=["checked","disabled","error","groupName","id","testId"];function ht(n){switch(n){case!0:return"true";case!1:return"false";default:return"mixed"}}const{blue:$e,red:we,white:_,offWhite:pt,offBlack16:mt,offBlack32:bt,offBlack50:yt}=a,O=h.medium_16,se=h.small_12,gt=I("input"),xt=t.forwardRef(function(e,o){const{checked:r,disabled:l,error:i,groupName:s,id:d,testId:u}=e,c=w(e,ft),f=t.useRef(null);t.useEffect(()=>{f.current!=null&&(f.current.indeterminate=r==null)},[r,f]);const C=()=>{},g=kt(r,i),k=[j.inputReset,j.default,!l&&g.default,l&&j.disabled],b=t.createElement(Ue,{color:l?bt:_,icon:r?He:Ge,size:"small",style:[j.checkboxIcon,{width:se,height:se}]}),y=ht(r);return t.createElement(t.Fragment,null,t.createElement(gt,m({},c,{ref:p=>{f.current=p,typeof o=="function"?o(p):o!=null&&(o.current=p)},type:"checkbox","aria-checked":y,"aria-invalid":i,checked:r??void 0,disabled:l,id:d,name:s,onChange:C,style:k,"data-testid":u})),r||r==null?b:t.createElement(t.Fragment,null))}),j=S.StyleSheet.create({inputReset:{appearance:"none",WebkitAppearance:"none",MozAppearance:"none"},default:{height:O,width:O,minHeight:O,minWidth:O,margin:0,outline:"none",boxSizing:"border-box",borderStyle:"solid",borderWidth:1,borderRadius:3},disabled:{cursor:"auto",backgroundColor:pt,borderColor:mt,borderWidth:1},checkboxIcon:{position:"absolute",pointerEvents:"none",margin:(O-se)/2}}),St=V(a.fadedBlue16,_),Ct=a.activeBlue,ee=V(a.fadedRed8,_),ve=a.activeRed,be={default:{faded:St,base:$e,active:Ct},error:{faded:ee,base:we,active:ve}},X={},kt=(n,e)=>{const o=`${String(n)}-${String(e)}`;if(X[o])return X[o];const r=e?be.error:be.default;let l={};return n||n==null?l={default:{backgroundColor:r.base,borderWidth:0,":focus-visible":{boxShadow:`0 0 0 1px ${_}, 0 0 0 3px ${r.base}`},":hover":{boxShadow:`0 0 0 1px ${_}, 0 0 0 3px ${r.base}`},":active":{boxShadow:`0 0 0 1px ${_}, 0 0 0 3px ${r.active}`,background:r.active}}}:l={default:{backgroundColor:e?ee:_,borderColor:e?we:yt,":focus-visible":{backgroundColor:e?ee:_,borderColor:r.base,borderWidth:2},":hover":{backgroundColor:e?ee:_,borderColor:r.base,borderWidth:2},":active":{backgroundColor:r.faded,borderColor:e?ve:$e,borderWidth:2}}},X[o]=S.StyleSheet.create(l),X[o]},$t=["checked","disabled","error","groupName","id","testId"],{blue:Ee,red:Re,white:R,offWhite:wt,offBlack16:vt,offBlack32:Et,offBlack50:Rt}=a,_t=I("input"),Bt=t.forwardRef(function(e,o){const r=()=>{},{checked:l,disabled:i,error:s,groupName:d,id:u,testId:c}=e,f=w(e,$t),C=Lt(l,s),g=[le.inputReset,le.default,!i&&C.default,i&&le.disabled];return t.createElement(t.Fragment,null,t.createElement(_t,m({},f,{type:"radio","aria-invalid":s,checked:l??void 0,disabled:i,id:u,name:d,onChange:r,style:g,"data-testid":c,ref:o})),i&&l&&t.createElement("span",{style:It}))}),B=16,It={position:"absolute",top:B/4,left:B/4,height:B/2,width:B/2,borderRadius:"50%",backgroundColor:Et},le=S.StyleSheet.create({inputReset:{appearance:"none",WebkitAppearance:"none",MozAppearance:"none"},default:{height:B,width:B,minHeight:B,minWidth:B,margin:0,outline:"none",boxSizing:"border-box",borderStyle:"solid",borderWidth:1,borderRadius:"50%"},disabled:{cursor:"auto",backgroundColor:wt,borderColor:vt,borderWidth:1}}),Ft=V(a.fadedBlue16,R),te=V(a.fadedRed8,R),ye={default:{faded:Ft,base:Ee,active:a.activeBlue},error:{faded:te,base:Re,active:a.activeRed}},J={},Lt=(n,e)=>{const o=`${String(n)}-${String(e)}`;if(J[o])return J[o];const r=e?ye.error:ye.default;let l={};return n?l={default:{backgroundColor:R,borderColor:r.base,borderWidth:B/4,":focus-visible":{boxShadow:`0 0 0 1px ${R}, 0 0 0 3px ${r.base}`},":hover":{boxShadow:`0 0 0 1px ${R}, 0 0 0 3px ${r.base}`},":active":{boxShadow:`0 0 0 1px ${R}, 0 0 0 3px ${r.active}`,borderColor:r.active}}}:l={default:{backgroundColor:e?te:R,borderColor:e?Re:Rt,":focus-visible":{backgroundColor:e?te:R,borderColor:r.base,borderWidth:2},":hover":{backgroundColor:e?te:R,borderColor:r.base,borderWidth:2},":active":{backgroundColor:r.faded,borderColor:e?a.activeRed:Ee,borderWidth:2}}},J[o]=S.StyleSheet.create(l),J[o]},Nt=["checked","description","disabled","error","id","label","onChange","style","className","variant"],_e=t.forwardRef(function(e,o){const{checked:r,description:l,disabled:i=!1,error:s=!1,id:d,label:u,onChange:c,style:f,className:C,variant:g}=e,k=w(e,Nt),b=()=>{g==="radio"&&r||c(!r)},y=()=>g==="radio"?Bt:xt,p=$=>t.createElement(re,{style:[Q.label,i&&Q.disabledLabel]},t.createElement("label",{htmlFor:$},u)),x=$=>t.createElement(z,{style:Q.description,id:$},l),F=y();return t.createElement(Oe,{mockOnFirstRender:!0,scope:"choice"},$=>{const P=d||$.get("main"),L=l?$.get("description"):void 0;return t.createElement(A,{style:f,className:C},t.createElement(A,{style:Q.wrapper,tabIndex:-1},t.createElement(F,m({},k,{id:P,checked:r,"aria-describedby":L,onClick:b,disabled:i,error:s,ref:o})),t.createElement(q,{size:h.xSmall_8}),u&&p(P)),l&&x(L))})}),Q=S.StyleSheet.create({wrapper:{flexDirection:"row",alignItems:"flex-start",outline:"none"},label:{marginTop:-2},disabledLabel:{color:a.offBlack32},description:{marginLeft:h.medium_16+h.xSmall_8,marginTop:h.xxxSmall_4,color:a.offBlack64}}),Wt=t.forwardRef(function(e,o){const{disabled:r=!1,error:l=!1}=e;return t.createElement(_e,m({},e,{variant:"checkbox",disabled:r,error:l,ref:o}))}),Dt=["disabled","error"],qt=t.forwardRef(function(e,o){const{disabled:r=!1,error:l=!1}=e,i=w(e,Dt);return t.createElement(_e,m({},i,{variant:"radio",disabled:r,error:l,ref:o}))}),zt=["checked","disabled","onChange","value","variant"];t.forwardRef(function(e,o){const{checked:r=!1,disabled:l=!1,onChange:i=()=>{},variant:s}=e,d=w(e,zt),c=(f=>f==="checkbox"?Wt:qt)(s);return t.createElement(c,m({},d,{checked:r,disabled:l,onChange:i,ref:o}))});const v=S.StyleSheet.create({fieldset:{border:"none",padding:0,margin:0},legend:{padding:0},description:{marginTop:h.xxxSmall_4,color:a.offBlack64},error:{marginTop:h.xxxSmall_4,color:a.red},defaultLineGap:{marginTop:h.xSmall_8}}),Pt=I("fieldset"),Tt=I("legend");t.forwardRef(function(e,o){const{children:r,label:l,description:i,errorMessage:s,groupName:d,onChange:u,selectedValues:c,style:f,testId:C}=e,g=(b,y)=>{if(y){const p=c.indexOf(b),x=[...c.slice(0,p),...c.slice(p+1)];u(x)}else u([...c,b])},k=t.Children.toArray(r).filter(Boolean);return t.createElement(Pt,{"data-testid":C,style:v.fieldset,ref:o},t.createElement(A,{style:f},l&&t.createElement(Tt,{style:v.legend},t.createElement(re,null,l)),i&&t.createElement(z,{style:v.description},i),s&&t.createElement(z,{style:v.error},s),(l||i||s)&&t.createElement(q,{size:h.small_12}),k.map((b,y)=>{const{style:p,value:x}=b.props,F=c.includes(x);return t.cloneElement(b,{checked:F,error:!!s,groupName:d,id:`${d}-${x}`,key:x,onChange:()=>g(x,F),style:[y>0&&v.defaultLineGap,p],variant:"checkbox"})})))});const At=I("fieldset"),Ot=I("legend");t.forwardRef(function(e,o){const{children:r,label:l,description:i,errorMessage:s,groupName:d,onChange:u,selectedValue:c,style:f,testId:C}=e,g=t.Children.toArray(r).filter(Boolean);return t.createElement(At,{"data-testid":C,style:v.fieldset,ref:o},t.createElement(A,{style:f},l&&t.createElement(Ot,{style:v.legend},t.createElement(re,null,l)),i&&t.createElement(z,{style:v.description},i),s&&t.createElement(z,{style:v.error},s),(l||i||s)&&t.createElement(q,{size:h.small_12}),g.map((k,b)=>{const{style:y,value:p}=k.props,x=c===p;return t.cloneElement(k,{checked:x,error:!!s,groupName:d,id:`${d}-${p}`,key:p,onChange:()=>u(p),style:[b>0&&v.defaultLineGap,y],variant:"radio"})})))});const Vt=["id","type","value","name","disabled","onKeyDown","placeholder","light","style","testId","readOnly","autoFocus","autoComplete","forwardedRef","onFocus","onBlur","onValidate","validate","onChange","required"],Mt="This field is required.",Kt=I("input");class Be extends t.Component{constructor(e){super(e),this.state={error:null,focused:!1},this.maybeValidate=o=>{const{validate:r,onValidate:l,required:i}=this.props;if(r){const s=r(o)||null;this.setState({error:s},()=>{l&&l(s)})}else if(i){const d=o?null:typeof i=="string"?i:Mt;this.setState({error:d},()=>{l&&l(d)})}},this.handleChange=o=>{const{onChange:r}=this.props,l=o.target.value;this.maybeValidate(l),r(l)},this.handleFocus=o=>{const{onFocus:r}=this.props;this.setState({focused:!0},()=>{r&&r(o)})},this.handleBlur=o=>{const{onBlur:r}=this.props;this.setState({focused:!1},()=>{r&&r(o)})},e.validate&&e.value!==""&&(this.state.error=e.validate(e.value)||null)}componentDidMount(){this.props.value!==""&&this.maybeValidate(this.props.value)}render(){const e=this.props,{id:o,type:r,value:l,name:i,disabled:s,onKeyDown:d,placeholder:u,light:c,style:f,testId:C,readOnly:g,autoFocus:k,autoComplete:b,forwardedRef:y}=e,p=w(e,Vt);return t.createElement(xe,{id:o,scope:"text-field"},x=>t.createElement(Kt,m({style:[W.input,Se.LabelMedium,W.default,s?W.disabled:this.state.focused?[W.focused,c&&W.defaultLight]:!!this.state.error&&[W.error,c&&W.errorLight],!!this.state.error&&W.error,f&&f],id:x,type:r,placeholder:u,value:l,name:i,disabled:s,onChange:this.handleChange,onKeyDown:d,onFocus:this.handleFocus,onBlur:this.handleBlur,"data-testid":C,readOnly:g,autoFocus:k,autoComplete:b,ref:y},p,{"aria-invalid":this.state.error?"true":"false"})))}}Be.defaultProps={type:"text",disabled:!1,light:!1};const W=S.StyleSheet.create({input:{width:"100%",height:40,borderRadius:4,boxSizing:"border-box",paddingLeft:h.medium_16,margin:0,outline:"none",boxShadow:"none"},default:{background:a.white,border:`1px solid ${a.offBlack50}`,color:a.offBlack,"::placeholder":{color:a.offBlack64}},error:{background:a.fadedRed8,border:`1px solid ${a.red}`,color:a.offBlack,"::placeholder":{color:a.offBlack64}},disabled:{background:a.offWhite,border:`1px solid ${a.offBlack16}`,color:a.offBlack64,"::placeholder":{color:a.offBlack32}},focused:{background:a.white,border:`1px solid ${a.blue}`,color:a.offBlack,"::placeholder":{color:a.offBlack64}},defaultLight:{boxShadow:`0px 0px 0px 1px ${a.blue}, 0px 0px 0px 2px ${a.white}`},errorLight:{boxShadow:`0px 0px 0px 1px ${a.red}, 0px 0px 0px 2px ${a.white}`}});var Ut=t.forwardRef((n,e)=>t.createElement(Be,m({},n,{forwardedRef:e})));const Ht=I("span");class Gt extends t.Component{renderLabel(){const{label:e,id:o,required:r,testId:l}=this.props,i=t.createElement(Ht,{style:Y.required,"aria-hidden":!0}," ","*");return t.createElement(t.Fragment,null,t.createElement(re,{style:Y.label,tag:"label",htmlFor:o&&`${o}-field`,testId:l&&`${l}-label`},e,r&&i),t.createElement(q,{size:h.xxxSmall_4}))}maybeRenderDescription(){const{description:e,testId:o}=this.props;return e?t.createElement(t.Fragment,null,t.createElement(z,{style:Y.description,testId:o&&`${o}-description`},e),t.createElement(q,{size:h.xxxSmall_4})):null}maybeRenderError(){const{error:e,id:o,testId:r}=this.props;return e?t.createElement(t.Fragment,null,t.createElement(q,{size:h.small_12}),t.createElement(z,{style:Y.error,role:"alert",id:o&&`${o}-error`,testId:r&&`${r}-error`},e)):null}render(){const{field:e,style:o}=this.props;return t.createElement(A,{style:o},this.renderLabel(),this.maybeRenderDescription(),t.createElement(q,{size:h.xSmall_8}),e,this.maybeRenderError())}}const Y=S.StyleSheet.create({label:{color:a.offBlack},description:{color:a.offBlack64},error:{color:a.red},required:{color:a.red}}),jt=["id","type","label","description","value","disabled","required","validate","onChange","onKeyDown","placeholder","light","style","testId","readOnly","autoComplete","forwardedRef","ariaDescribedby","onValidate","onFocus","onBlur"];class Ie extends t.Component{constructor(e){super(e),this.handleValidate=o=>{const{onValidate:r}=this.props;this.setState({error:o},()=>{r&&r(o)})},this.handleFocus=o=>{const{onFocus:r}=this.props;this.setState({focused:!0},()=>{r&&r(o)})},this.handleBlur=o=>{const{onBlur:r}=this.props;this.setState({focused:!1},()=>{r&&r(o)})},this.state={error:null,focused:!1}}render(){const e=this.props,{id:o,type:r,label:l,description:i,value:s,disabled:d,required:u,validate:c,onChange:f,onKeyDown:C,placeholder:g,light:k,style:b,testId:y,readOnly:p,autoComplete:x,forwardedRef:F,ariaDescribedby:$}=e,P=w(e,jt);return t.createElement(xe,{id:o,scope:"labeled-text-field"},L=>t.createElement(Gt,{id:L,testId:y,style:b,field:t.createElement(Ut,m({id:`${L}-field`,"aria-describedby":$||`${L}-error`,"aria-required":u?"true":"false",required:u,testId:y&&`${y}-field`,type:r,value:s,placeholder:g,disabled:d,validate:c,onValidate:this.handleValidate,onChange:f,onKeyDown:C,onFocus:this.handleFocus,onBlur:this.handleBlur,light:k,readOnly:p,autoComplete:x,ref:F},P)),label:l,description:i,required:!!u,error:!this.state.focused&&this.state.error||""}))}}Ie.defaultProps={type:"text",disabled:!1,light:!1};var nr=t.forwardRef((n,e)=>t.createElement(Ie,m({},n,{forwardedRef:e})));const Xt=["onChange","value","placeholder","disabled","id","testId","style","readOnly","autoComplete","name","className","autoFocus","rows","spellCheck","wrap","minLength","maxLength","onClick","onKeyDown","onKeyUp","onFocus","onBlur","validate","onValidate","required","resizeType","light","rootStyle"],Jt="This field is required.",Qt=I("textarea"),sr=t.forwardRef(function(e,o){const{onChange:r,value:l,placeholder:i,disabled:s,id:d,testId:u,style:c,readOnly:f,autoComplete:C,name:g,className:k,autoFocus:b,rows:y,spellCheck:p,wrap:x,minLength:F,maxLength:$,onClick:P,onKeyDown:L,onKeyUp:Fe,onFocus:Le,onBlur:Ne,validate:de,onValidate:U,required:H,resizeType:ce,light:We,rootStyle:De}=e,qe=w(e,Xt),[ae,ue]=t.useState(null),ze=Ve("text-area"),Pe=d??ze.get("id"),Te=T=>{const N=T.target.value;r(N),fe(N)},fe=T=>{if(de){const N=de(T)||null;ue(N),U&&U(N)}else if(H){const G=T?null:typeof H=="string"?H:Jt;ue(G),U&&U(G)}};Me(()=>{l!==""&&fe(l)});const Ae=()=>{const T=[E.textarea,Se.LabelMedium,ce&&Yt[ce]],N=[E.default,!s&&E.defaultFocus,s&&E.disabled,!!ae&&E.error],G=[E.light,!s&&E.lightFocus,s&&E.lightDisabled,!!ae&&E.lightError];return[...T,...We?G:N]};return t.createElement(A,{style:[{width:"100%"},De]},t.createElement(Qt,m({id:Pe,"data-testid":u,ref:o,className:k,style:[...Ae(),c],value:l,onChange:Te,placeholder:i,"aria-disabled":s,readOnly:f||s,autoComplete:C,name:g,autoFocus:b,rows:y,spellCheck:p,wrap:x,minLength:F,maxLength:$,onClick:s?void 0:P,onKeyDown:s?void 0:L,onKeyUp:s?void 0:Fe,onFocus:Le,onBlur:Ne,required:!!H},qe,{"aria-invalid":!!ae})))}),ge=10,E=S.StyleSheet.create({textarea:{borderRadius:he.radius.medium_4,boxSizing:"border-box",padding:`${ge}px ${h.medium_16}px`,minHeight:`${ge*2+Ke.lineHeight.medium+2*he.width.hairline}px`},default:{background:a.white,border:`1px solid ${a.offBlack50}`,color:a.offBlack,"::placeholder":{color:a.offBlack64}},defaultFocus:{":focus-visible":{borderColor:a.blue,outline:`1px solid ${a.blue}`,outlineOffset:0}},disabled:{background:a.offWhite,border:`1px solid ${a.offBlack16}`,color:a.offBlack64,"::placeholder":{color:a.offBlack64},cursor:"not-allowed",":focus-visible":{outline:"none",boxShadow:`0 0 0 1px ${a.white}, 0 0 0 3px ${a.offBlack32}`}},error:{background:a.fadedRed8,border:`1px solid ${a.red}`,color:a.offBlack,"::placeholder":{color:a.offBlack64},":focus-visible":{outlineColor:a.red,borderColor:a.red}},light:{background:a.white,border:`1px solid ${a.offBlack16}`,color:a.offBlack,"::placeholder":{color:a.offBlack64}},lightFocus:{":focus-visible":{outline:`1px solid ${a.blue}`,outlineOffset:0,borderColor:a.blue,boxShadow:`0px 0px 0px 2px ${a.blue}, 0px 0px 0px 3px ${a.white}`}},lightDisabled:{backgroundColor:"transparent",border:`1px solid ${a.white32}`,color:a.white64,"::placeholder":{color:a.white64},cursor:"not-allowed",":focus-visible":{borderColor:V(a.white32,a.blue),outline:"none",boxShadow:`0 0 0 1px ${a.offBlack32}, 0 0 0 3px ${a.fadedBlue}`}},lightError:{background:a.fadedRed8,border:`1px solid ${a.red}`,boxShadow:`0px 0px 0px 1px ${a.red}, 0px 0px 0px 2px ${a.white}`,color:a.offBlack,"::placeholder":{color:a.offBlack64},":focus-visible":{outlineColor:a.red,borderColor:a.red,boxShadow:`0px 0px 0px 2px ${a.red}, 0px 0px 0px 3px ${a.white}`}}}),Yt=S.StyleSheet.create({both:{resize:"both"},none:{resize:"none"},horizontal:{resize:"horizontal"},vertical:{resize:"vertical"}});export{Wt as C,Ut as T,sr as a,nr as l};