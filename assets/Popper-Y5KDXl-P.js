import{r as j}from"./index-6oxdNXpR.js";import{r as mt}from"./index-9gkyvru-.js";import{g as ht}from"./_commonjsHelpers-4gQjN7DL.js";var yt=j.createContext();j.createContext();var gt=function(t){return Array.isArray(t)?t[0]:t},wt=function(t){if(typeof t=="function"){for(var r=arguments.length,n=new Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];return t.apply(void 0,n)}},bt=function(t,r){if(typeof t=="function")return wt(t,r);t!=null&&(t.current=r)},Ve=function(t){return t.reduce(function(r,n){var a=n[0],o=n[1];return r[a]=o,r},{})},qe=typeof window<"u"&&window.document&&window.document.createElement?j.useLayoutEffect:j.useEffect,$="top",L="bottom",k="right",B="left",Se="auto",ue=[$,L,k,B],Z="start",se="end",Ot="clippingParents",et="viewport",ae="popper",xt="reference",ze=ue.reduce(function(e,t){return e.concat([t+"-"+Z,t+"-"+se])},[]),tt=[].concat(ue,[Se]).reduce(function(e,t){return e.concat([t,t+"-"+Z,t+"-"+se])},[]),Et="beforeRead",Pt="read",At="afterRead",Rt="beforeMain",St="main",Dt="afterMain",jt="beforeWrite",$t="write",Bt="afterWrite",Ct=[Et,Pt,At,Rt,St,Dt,jt,$t,Bt];function N(e){return e?(e.nodeName||"").toLowerCase():null}function M(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function K(e){var t=M(e).Element;return e instanceof t||e instanceof Element}function T(e){var t=M(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function De(e){if(typeof ShadowRoot>"u")return!1;var t=M(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Mt(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},a=t.attributes[r]||{},o=t.elements[r];!T(o)||!N(o)||(Object.assign(o.style,n),Object.keys(a).forEach(function(u){var s=a[u];s===!1?o.removeAttribute(u):o.setAttribute(u,s===!0?"":s)}))})}function Tt(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var a=t.elements[n],o=t.attributes[n]||{},u=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),s=u.reduce(function(i,c){return i[c]="",i},{});!T(a)||!N(a)||(Object.assign(a.style,s),Object.keys(o).forEach(function(i){a.removeAttribute(i)}))})}}const Lt={name:"applyStyles",enabled:!0,phase:"write",fn:Mt,effect:Tt,requires:["computeStyles"]};function H(e){return e.split("-")[0]}var J=Math.max,we=Math.min,_=Math.round;function Ae(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function rt(){return!/^((?!chrome|android).)*safari/i.test(Ae())}function ee(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),a=1,o=1;t&&T(e)&&(a=e.offsetWidth>0&&_(n.width)/e.offsetWidth||1,o=e.offsetHeight>0&&_(n.height)/e.offsetHeight||1);var u=K(e)?M(e):window,s=u.visualViewport,i=!rt()&&r,c=(n.left+(i&&s?s.offsetLeft:0))/a,f=(n.top+(i&&s?s.offsetTop:0))/o,v=n.width/a,m=n.height/o;return{width:v,height:m,top:f,right:c+v,bottom:f+m,left:c,x:c,y:f}}function je(e){var t=ee(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function nt(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&De(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function I(e){return M(e).getComputedStyle(e)}function kt(e){return["table","td","th"].indexOf(N(e))>=0}function V(e){return((K(e)?e.ownerDocument:e.document)||window.document).documentElement}function be(e){return N(e)==="html"?e:e.assignedSlot||e.parentNode||(De(e)?e.host:null)||V(e)}function Ye(e){return!T(e)||I(e).position==="fixed"?null:e.offsetParent}function Wt(e){var t=/firefox/i.test(Ae()),r=/Trident/i.test(Ae());if(r&&T(e)){var n=I(e);if(n.position==="fixed")return null}var a=be(e);for(De(a)&&(a=a.host);T(a)&&["html","body"].indexOf(N(a))<0;){var o=I(a);if(o.transform!=="none"||o.perspective!=="none"||o.contain==="paint"||["transform","perspective"].indexOf(o.willChange)!==-1||t&&o.willChange==="filter"||t&&o.filter&&o.filter!=="none")return a;a=a.parentNode}return null}function ce(e){for(var t=M(e),r=Ye(e);r&&kt(r)&&I(r).position==="static";)r=Ye(r);return r&&(N(r)==="html"||N(r)==="body"&&I(r).position==="static")?t:r||Wt(e)||t}function $e(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function oe(e,t,r){return J(e,we(t,r))}function Ft(e,t,r){var n=oe(e,t,r);return n>r?r:n}function at(){return{top:0,right:0,bottom:0,left:0}}function ot(e){return Object.assign({},at(),e)}function it(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var Ht=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,ot(typeof t!="number"?t:it(t,ue))};function Nt(e){var t,r=e.state,n=e.name,a=e.options,o=r.elements.arrow,u=r.modifiersData.popperOffsets,s=H(r.placement),i=$e(s),c=[B,k].indexOf(s)>=0,f=c?"height":"width";if(!(!o||!u)){var v=Ht(a.padding,r),m=je(o),p=i==="y"?$:B,g=i==="y"?L:k,h=r.rects.reference[f]+r.rects.reference[i]-u[i]-r.rects.popper[f],d=u[i]-r.rects.reference[i],b=ce(o),E=b?i==="y"?b.clientHeight||0:b.clientWidth||0:0,O=h/2-d/2,l=v[p],y=E-m[f]-v[g],w=E/2-m[f]/2+O,x=oe(l,w,y),P=i;r.modifiersData[n]=(t={},t[P]=x,t.centerOffset=x-w,t)}}function It(e){var t=e.state,r=e.options,n=r.element,a=n===void 0?"[data-popper-arrow]":n;a!=null&&(typeof a=="string"&&(a=t.elements.popper.querySelector(a),!a)||nt(t.elements.popper,a)&&(t.elements.arrow=a))}const Ut={name:"arrow",enabled:!0,phase:"main",fn:Nt,effect:It,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function te(e){return e.split("-")[1]}var Vt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function qt(e,t){var r=e.x,n=e.y,a=t.devicePixelRatio||1;return{x:_(r*a)/a||0,y:_(n*a)/a||0}}function Xe(e){var t,r=e.popper,n=e.popperRect,a=e.placement,o=e.variation,u=e.offsets,s=e.position,i=e.gpuAcceleration,c=e.adaptive,f=e.roundOffsets,v=e.isFixed,m=u.x,p=m===void 0?0:m,g=u.y,h=g===void 0?0:g,d=typeof f=="function"?f({x:p,y:h}):{x:p,y:h};p=d.x,h=d.y;var b=u.hasOwnProperty("x"),E=u.hasOwnProperty("y"),O=B,l=$,y=window;if(c){var w=ce(r),x="clientHeight",P="clientWidth";if(w===M(r)&&(w=V(r),I(w).position!=="static"&&s==="absolute"&&(x="scrollHeight",P="scrollWidth")),w=w,a===$||(a===B||a===k)&&o===se){l=L;var R=v&&w===y&&y.visualViewport?y.visualViewport.height:w[x];h-=R-n.height,h*=i?1:-1}if(a===B||(a===$||a===L)&&o===se){O=k;var A=v&&w===y&&y.visualViewport?y.visualViewport.width:w[P];p-=A-n.width,p*=i?1:-1}}var S=Object.assign({position:s},c&&Vt),W=f===!0?qt({x:p,y:h},M(r)):{x:p,y:h};if(p=W.x,h=W.y,i){var D;return Object.assign({},S,(D={},D[l]=E?"0":"",D[O]=b?"0":"",D.transform=(y.devicePixelRatio||1)<=1?"translate("+p+"px, "+h+"px)":"translate3d("+p+"px, "+h+"px, 0)",D))}return Object.assign({},S,(t={},t[l]=E?h+"px":"",t[O]=b?p+"px":"",t.transform="",t))}function zt(e){var t=e.state,r=e.options,n=r.gpuAcceleration,a=n===void 0?!0:n,o=r.adaptive,u=o===void 0?!0:o,s=r.roundOffsets,i=s===void 0?!0:s,c={placement:H(t.placement),variation:te(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Xe(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:u,roundOffsets:i})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Xe(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:i})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Yt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:zt,data:{}};var he={passive:!0};function Xt(e){var t=e.state,r=e.instance,n=e.options,a=n.scroll,o=a===void 0?!0:a,u=n.resize,s=u===void 0?!0:u,i=M(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return o&&c.forEach(function(f){f.addEventListener("scroll",r.update,he)}),s&&i.addEventListener("resize",r.update,he),function(){o&&c.forEach(function(f){f.removeEventListener("scroll",r.update,he)}),s&&i.removeEventListener("resize",r.update,he)}}const Gt={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Xt,data:{}};var Jt={left:"right",right:"left",bottom:"top",top:"bottom"};function ye(e){return e.replace(/left|right|bottom|top/g,function(t){return Jt[t]})}var Kt={start:"end",end:"start"};function Ge(e){return e.replace(/start|end/g,function(t){return Kt[t]})}function Be(e){var t=M(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Ce(e){return ee(V(e)).left+Be(e).scrollLeft}function Qt(e,t){var r=M(e),n=V(e),a=r.visualViewport,o=n.clientWidth,u=n.clientHeight,s=0,i=0;if(a){o=a.width,u=a.height;var c=rt();(c||!c&&t==="fixed")&&(s=a.offsetLeft,i=a.offsetTop)}return{width:o,height:u,x:s+Ce(e),y:i}}function Zt(e){var t,r=V(e),n=Be(e),a=(t=e.ownerDocument)==null?void 0:t.body,o=J(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),u=J(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),s=-n.scrollLeft+Ce(e),i=-n.scrollTop;return I(a||r).direction==="rtl"&&(s+=J(r.clientWidth,a?a.clientWidth:0)-o),{width:o,height:u,x:s,y:i}}function Me(e){var t=I(e),r=t.overflow,n=t.overflowX,a=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+a+n)}function st(e){return["html","body","#document"].indexOf(N(e))>=0?e.ownerDocument.body:T(e)&&Me(e)?e:st(be(e))}function ie(e,t){var r;t===void 0&&(t=[]);var n=st(e),a=n===((r=e.ownerDocument)==null?void 0:r.body),o=M(n),u=a?[o].concat(o.visualViewport||[],Me(n)?n:[]):n,s=t.concat(u);return a?s:s.concat(ie(be(u)))}function Re(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function _t(e,t){var r=ee(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function Je(e,t,r){return t===et?Re(Qt(e,r)):K(t)?_t(t,r):Re(Zt(V(e)))}function er(e){var t=ie(be(e)),r=["absolute","fixed"].indexOf(I(e).position)>=0,n=r&&T(e)?ce(e):e;return K(n)?t.filter(function(a){return K(a)&&nt(a,n)&&N(a)!=="body"}):[]}function tr(e,t,r,n){var a=t==="clippingParents"?er(e):[].concat(t),o=[].concat(a,[r]),u=o[0],s=o.reduce(function(i,c){var f=Je(e,c,n);return i.top=J(f.top,i.top),i.right=we(f.right,i.right),i.bottom=we(f.bottom,i.bottom),i.left=J(f.left,i.left),i},Je(e,u,n));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function ft(e){var t=e.reference,r=e.element,n=e.placement,a=n?H(n):null,o=n?te(n):null,u=t.x+t.width/2-r.width/2,s=t.y+t.height/2-r.height/2,i;switch(a){case $:i={x:u,y:t.y-r.height};break;case L:i={x:u,y:t.y+t.height};break;case k:i={x:t.x+t.width,y:s};break;case B:i={x:t.x-r.width,y:s};break;default:i={x:t.x,y:t.y}}var c=a?$e(a):null;if(c!=null){var f=c==="y"?"height":"width";switch(o){case Z:i[c]=i[c]-(t[f]/2-r[f]/2);break;case se:i[c]=i[c]+(t[f]/2-r[f]/2);break}}return i}function fe(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=n===void 0?e.placement:n,o=r.strategy,u=o===void 0?e.strategy:o,s=r.boundary,i=s===void 0?Ot:s,c=r.rootBoundary,f=c===void 0?et:c,v=r.elementContext,m=v===void 0?ae:v,p=r.altBoundary,g=p===void 0?!1:p,h=r.padding,d=h===void 0?0:h,b=ot(typeof d!="number"?d:it(d,ue)),E=m===ae?xt:ae,O=e.rects.popper,l=e.elements[g?E:m],y=tr(K(l)?l:l.contextElement||V(e.elements.popper),i,f,u),w=ee(e.elements.reference),x=ft({reference:w,element:O,strategy:"absolute",placement:a}),P=Re(Object.assign({},O,x)),R=m===ae?P:w,A={top:y.top-R.top+b.top,bottom:R.bottom-y.bottom+b.bottom,left:y.left-R.left+b.left,right:R.right-y.right+b.right},S=e.modifiersData.offset;if(m===ae&&S){var W=S[a];Object.keys(A).forEach(function(D){var q=[k,L].indexOf(D)>=0?1:-1,z=[$,L].indexOf(D)>=0?"y":"x";A[D]+=W[z]*q})}return A}function rr(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=r.boundary,o=r.rootBoundary,u=r.padding,s=r.flipVariations,i=r.allowedAutoPlacements,c=i===void 0?tt:i,f=te(n),v=f?s?ze:ze.filter(function(g){return te(g)===f}):ue,m=v.filter(function(g){return c.indexOf(g)>=0});m.length===0&&(m=v);var p=m.reduce(function(g,h){return g[h]=fe(e,{placement:h,boundary:a,rootBoundary:o,padding:u})[H(h)],g},{});return Object.keys(p).sort(function(g,h){return p[g]-p[h]})}function nr(e){if(H(e)===Se)return[];var t=ye(e);return[Ge(e),t,Ge(t)]}function ar(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var a=r.mainAxis,o=a===void 0?!0:a,u=r.altAxis,s=u===void 0?!0:u,i=r.fallbackPlacements,c=r.padding,f=r.boundary,v=r.rootBoundary,m=r.altBoundary,p=r.flipVariations,g=p===void 0?!0:p,h=r.allowedAutoPlacements,d=t.options.placement,b=H(d),E=b===d,O=i||(E||!g?[ye(d)]:nr(d)),l=[d].concat(O).reduce(function(Q,U){return Q.concat(H(U)===Se?rr(t,{placement:U,boundary:f,rootBoundary:v,padding:c,flipVariations:g,allowedAutoPlacements:h}):U)},[]),y=t.rects.reference,w=t.rects.popper,x=new Map,P=!0,R=l[0],A=0;A<l.length;A++){var S=l[A],W=H(S),D=te(S)===Z,q=[$,L].indexOf(W)>=0,z=q?"width":"height",C=fe(t,{placement:S,boundary:f,rootBoundary:v,altBoundary:m,padding:c}),F=q?D?k:B:D?L:$;y[z]>w[z]&&(F=ye(F));var pe=ye(F),Y=[];if(o&&Y.push(C[W]<=0),s&&Y.push(C[F]<=0,C[pe]<=0),Y.every(function(Q){return Q})){R=S,P=!1;break}x.set(S,Y)}if(P)for(var le=g?3:1,Oe=function(U){var ne=l.find(function(de){var X=x.get(de);if(X)return X.slice(0,U).every(function(xe){return xe})});if(ne)return R=ne,"break"},re=le;re>0;re--){var ve=Oe(re);if(ve==="break")break}t.placement!==R&&(t.modifiersData[n]._skip=!0,t.placement=R,t.reset=!0)}}const or={name:"flip",enabled:!0,phase:"main",fn:ar,requiresIfExists:["offset"],data:{_skip:!1}};function Ke(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function Qe(e){return[$,k,L,B].some(function(t){return e[t]>=0})}function ir(e){var t=e.state,r=e.name,n=t.rects.reference,a=t.rects.popper,o=t.modifiersData.preventOverflow,u=fe(t,{elementContext:"reference"}),s=fe(t,{altBoundary:!0}),i=Ke(u,n),c=Ke(s,a,o),f=Qe(i),v=Qe(c);t.modifiersData[r]={referenceClippingOffsets:i,popperEscapeOffsets:c,isReferenceHidden:f,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":v})}const sr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:ir};function fr(e,t,r){var n=H(e),a=[B,$].indexOf(n)>=0?-1:1,o=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,u=o[0],s=o[1];return u=u||0,s=(s||0)*a,[B,k].indexOf(n)>=0?{x:s,y:u}:{x:u,y:s}}function ur(e){var t=e.state,r=e.options,n=e.name,a=r.offset,o=a===void 0?[0,0]:a,u=tt.reduce(function(f,v){return f[v]=fr(v,t.rects,o),f},{}),s=u[t.placement],i=s.x,c=s.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=i,t.modifiersData.popperOffsets.y+=c),t.modifiersData[n]=u}const cr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:ur};function pr(e){var t=e.state,r=e.name;t.modifiersData[r]=ft({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const lr={name:"popperOffsets",enabled:!0,phase:"read",fn:pr,data:{}};function vr(e){return e==="x"?"y":"x"}function dr(e){var t=e.state,r=e.options,n=e.name,a=r.mainAxis,o=a===void 0?!0:a,u=r.altAxis,s=u===void 0?!1:u,i=r.boundary,c=r.rootBoundary,f=r.altBoundary,v=r.padding,m=r.tether,p=m===void 0?!0:m,g=r.tetherOffset,h=g===void 0?0:g,d=fe(t,{boundary:i,rootBoundary:c,padding:v,altBoundary:f}),b=H(t.placement),E=te(t.placement),O=!E,l=$e(b),y=vr(l),w=t.modifiersData.popperOffsets,x=t.rects.reference,P=t.rects.popper,R=typeof h=="function"?h(Object.assign({},t.rects,{placement:t.placement})):h,A=typeof R=="number"?{mainAxis:R,altAxis:R}:Object.assign({mainAxis:0,altAxis:0},R),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,W={x:0,y:0};if(w){if(o){var D,q=l==="y"?$:B,z=l==="y"?L:k,C=l==="y"?"height":"width",F=w[l],pe=F+d[q],Y=F-d[z],le=p?-P[C]/2:0,Oe=E===Z?x[C]:P[C],re=E===Z?-P[C]:-x[C],ve=t.elements.arrow,Q=p&&ve?je(ve):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:at(),ne=U[q],de=U[z],X=oe(0,x[C],Q[C]),xe=O?x[C]/2-le-X-ne-A.mainAxis:Oe-X-ne-A.mainAxis,ut=O?-x[C]/2+le+X+de+A.mainAxis:re+X+de+A.mainAxis,Ee=t.elements.arrow&&ce(t.elements.arrow),ct=Ee?l==="y"?Ee.clientTop||0:Ee.clientLeft||0:0,Te=(D=S==null?void 0:S[l])!=null?D:0,pt=F+xe-Te-ct,lt=F+ut-Te,Le=oe(p?we(pe,pt):pe,F,p?J(Y,lt):Y);w[l]=Le,W[l]=Le-F}if(s){var ke,vt=l==="x"?$:B,dt=l==="x"?L:k,G=w[y],me=y==="y"?"height":"width",We=G+d[vt],Fe=G-d[dt],Pe=[$,B].indexOf(b)!==-1,He=(ke=S==null?void 0:S[y])!=null?ke:0,Ne=Pe?We:G-x[me]-P[me]-He+A.altAxis,Ie=Pe?G+x[me]+P[me]-He-A.altAxis:Fe,Ue=p&&Pe?Ft(Ne,G,Ie):oe(p?Ne:We,G,p?Ie:Fe);w[y]=Ue,W[y]=Ue-G}t.modifiersData[n]=W}}const mr={name:"preventOverflow",enabled:!0,phase:"main",fn:dr,requiresIfExists:["offset"]};function hr(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function yr(e){return e===M(e)||!T(e)?Be(e):hr(e)}function gr(e){var t=e.getBoundingClientRect(),r=_(t.width)/e.offsetWidth||1,n=_(t.height)/e.offsetHeight||1;return r!==1||n!==1}function wr(e,t,r){r===void 0&&(r=!1);var n=T(t),a=T(t)&&gr(t),o=V(t),u=ee(e,a,r),s={scrollLeft:0,scrollTop:0},i={x:0,y:0};return(n||!n&&!r)&&((N(t)!=="body"||Me(o))&&(s=yr(t)),T(t)?(i=ee(t,!0),i.x+=t.clientLeft,i.y+=t.clientTop):o&&(i.x=Ce(o))),{x:u.left+s.scrollLeft-i.x,y:u.top+s.scrollTop-i.y,width:u.width,height:u.height}}function br(e){var t=new Map,r=new Set,n=[];e.forEach(function(o){t.set(o.name,o)});function a(o){r.add(o.name);var u=[].concat(o.requires||[],o.requiresIfExists||[]);u.forEach(function(s){if(!r.has(s)){var i=t.get(s);i&&a(i)}}),n.push(o)}return e.forEach(function(o){r.has(o.name)||a(o)}),n}function Or(e){var t=br(e);return Ct.reduce(function(r,n){return r.concat(t.filter(function(a){return a.phase===n}))},[])}function xr(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function Er(e){var t=e.reduce(function(r,n){var a=r[n.name];return r[n.name]=a?Object.assign({},a,n,{options:Object.assign({},a.options,n.options),data:Object.assign({},a.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var Ze={placement:"bottom",modifiers:[],strategy:"absolute"};function _e(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Pr(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,a=t.defaultOptions,o=a===void 0?Ze:a;return function(s,i,c){c===void 0&&(c=o);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ze,o),modifiersData:{},elements:{reference:s,popper:i},attributes:{},styles:{}},v=[],m=!1,p={state:f,setOptions:function(b){var E=typeof b=="function"?b(f.options):b;h(),f.options=Object.assign({},o,f.options,E),f.scrollParents={reference:K(s)?ie(s):s.contextElement?ie(s.contextElement):[],popper:ie(i)};var O=Or(Er([].concat(n,f.options.modifiers)));return f.orderedModifiers=O.filter(function(l){return l.enabled}),g(),p.update()},forceUpdate:function(){if(!m){var b=f.elements,E=b.reference,O=b.popper;if(_e(E,O)){f.rects={reference:wr(E,ce(O),f.options.strategy==="fixed"),popper:je(O)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(A){return f.modifiersData[A.name]=Object.assign({},A.data)});for(var l=0;l<f.orderedModifiers.length;l++){if(f.reset===!0){f.reset=!1,l=-1;continue}var y=f.orderedModifiers[l],w=y.fn,x=y.options,P=x===void 0?{}:x,R=y.name;typeof w=="function"&&(f=w({state:f,options:P,name:R,instance:p})||f)}}}},update:xr(function(){return new Promise(function(d){p.forceUpdate(),d(f)})}),destroy:function(){h(),m=!0}};if(!_e(s,i))return p;p.setOptions(c).then(function(d){!m&&c.onFirstUpdate&&c.onFirstUpdate(d)});function g(){f.orderedModifiers.forEach(function(d){var b=d.name,E=d.options,O=E===void 0?{}:E,l=d.effect;if(typeof l=="function"){var y=l({state:f,name:b,instance:p,options:O}),w=function(){};v.push(y||w)}})}function h(){v.forEach(function(d){return d()}),v=[]}return p}}var Ar=[Gt,lr,Yt,Lt,cr,or,mr,Ut,sr],Rr=Pr({defaultModifiers:Ar}),Sr=typeof Element<"u",Dr=typeof Map=="function",jr=typeof Set=="function",$r=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function ge(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var r,n,a;if(Array.isArray(e)){if(r=e.length,r!=t.length)return!1;for(n=r;n--!==0;)if(!ge(e[n],t[n]))return!1;return!0}var o;if(Dr&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(o=e.entries();!(n=o.next()).done;)if(!t.has(n.value[0]))return!1;for(o=e.entries();!(n=o.next()).done;)if(!ge(n.value[1],t.get(n.value[0])))return!1;return!0}if(jr&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(o=e.entries();!(n=o.next()).done;)if(!t.has(n.value[0]))return!1;return!0}if($r&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(r=e.length,r!=t.length)return!1;for(n=r;n--!==0;)if(e[n]!==t[n])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(a=Object.keys(e),r=a.length,r!==Object.keys(t).length)return!1;for(n=r;n--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[n]))return!1;if(Sr&&e instanceof Element)return!1;for(n=r;n--!==0;)if(!((a[n]==="_owner"||a[n]==="__v"||a[n]==="__o")&&e.$$typeof)&&!ge(e[a[n]],t[a[n]]))return!1;return!0}return e!==e&&t!==t}var Br=function(t,r){try{return ge(t,r)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}};const Cr=ht(Br);var Mr=[],Tr=function(t,r,n){n===void 0&&(n={});var a=j.useRef(null),o={onFirstUpdate:n.onFirstUpdate,placement:n.placement||"bottom",strategy:n.strategy||"absolute",modifiers:n.modifiers||Mr},u=j.useState({styles:{popper:{position:o.strategy,left:"0",top:"0"},arrow:{position:"absolute"}},attributes:{}}),s=u[0],i=u[1],c=j.useMemo(function(){return{name:"updateState",enabled:!0,phase:"write",fn:function(p){var g=p.state,h=Object.keys(g.elements);mt.flushSync(function(){i({styles:Ve(h.map(function(d){return[d,g.styles[d]||{}]})),attributes:Ve(h.map(function(d){return[d,g.attributes[d]]}))})})},requires:["computeStyles"]}},[]),f=j.useMemo(function(){var m={onFirstUpdate:o.onFirstUpdate,placement:o.placement,strategy:o.strategy,modifiers:[].concat(o.modifiers,[c,{name:"applyStyles",enabled:!1}])};return Cr(a.current,m)?a.current||m:(a.current=m,m)},[o.onFirstUpdate,o.placement,o.strategy,o.modifiers,c]),v=j.useRef();return qe(function(){v.current&&v.current.setOptions(f)},[f]),qe(function(){if(!(t==null||r==null)){var m=n.createPopper||Rr,p=m(t,r,f);return v.current=p,function(){p.destroy(),v.current=null}}},[t,r,n.createPopper]),{state:v.current?v.current.state:null,styles:s.styles,attributes:s.attributes,update:v.current?v.current.update:null,forceUpdate:v.current?v.current.forceUpdate:null}},Lr=function(){},kr=function(){return Promise.resolve(null)},Wr=[];function Ir(e){var t=e.placement,r=t===void 0?"bottom":t,n=e.strategy,a=n===void 0?"absolute":n,o=e.modifiers,u=o===void 0?Wr:o,s=e.referenceElement,i=e.onFirstUpdate,c=e.innerRef,f=e.children,v=j.useContext(yt),m=j.useState(null),p=m[0],g=m[1],h=j.useState(null),d=h[0],b=h[1];j.useEffect(function(){bt(c,p)},[c,p]);var E=j.useMemo(function(){return{placement:r,strategy:a,onFirstUpdate:i,modifiers:[].concat(u,[{name:"arrow",enabled:d!=null,options:{element:d}}])}},[r,a,i,u,d]),O=Tr(s||v,p,E),l=O.state,y=O.styles,w=O.forceUpdate,x=O.update,P=j.useMemo(function(){return{ref:g,style:y.popper,placement:l?l.placement:r,hasPopperEscaped:l&&l.modifiersData.hide?l.modifiersData.hide.hasPopperEscaped:null,isReferenceHidden:l&&l.modifiersData.hide?l.modifiersData.hide.isReferenceHidden:null,arrowProps:{style:y.arrow,ref:b},forceUpdate:w||Lr,update:x||kr}},[g,b,r,l,y,x,w]);return gt(f)(P)}export{Ir as P,fe as d};