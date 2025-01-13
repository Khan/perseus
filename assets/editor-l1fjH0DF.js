import{j as U}from"./jsx-runtime-63Ea5SlK.js";import{S as ws,d as ks}from"./article-renderer-J_Jc9T9I.js";import{_ as K}from"./index-default-4_ZsnO94.js";import{U as Ue}from"./util-Jthj9rdu.js";import"./phet-simulation-BRtt8u-B.js";import{e as Hr,g as qs,b as Ts,u as As,f as xs,h as xa,i as Rs,j as Os,P as Br,m as Cs}from"./renderer-VK2cPRUB.js";import"./perseus-api-_PWPZoDE.js";import"./perseus-item-fvowVELo.js";import"./hints-renderer-9IE4v8GX.js";import"./version-akiLXZts.js";import{P as zs,E as Ws}from"./perseus-error-l3K_anoI.js";import"./base-radio-aAZRdKDu.js";import"./button-group-G5CZaedn.js";import"./graph-dC09AxBQ.js";import{L as Es}from"./svg-image-r8WIvKzz.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-ZIpjk6I_.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-7iuIIaaC.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-a-k60kbJ.js";import"./range-input-CHqVDKQd.js";import"./text-input-j0CmatLw.js";import"./text-list-editor-ND6Qift6.js";import"./dependencies-CP7Uh8Kq.js";import"./i18n-context-JRliD99t.js";import"./underscore-H6_Y1mVe.js";import{$ as Ss}from"./jquery-5v7aFUvu.js";import"./index-smZ6iCr_.js";import{c as js,g as _s}from"./_commonjsHelpers-4gQjN7DL.js";import{r as at}from"./index-6oxdNXpR.js";import{c as Ns}from"./components-k8pxH1W_.js";import{c as Is,i as Ls}from"./icon-paths-5JCXzGsq.js";import{S as Ms}from"./index-R5O7Arjo.js";import{s as Ps}from"./index-dmcq622U.js";import{g as Ds}from"./icon-paths-EoBkHOLI.js";import{S as Fs}from"./section-control-button-78iQ9V5_.js";import{T as Bs}from"./tex-error-view-UUAKVorJ.js";var Ca={exports:{}};(function(u,d){(function(q,R){u.exports=R()})(typeof self<"u"?self:js,function(){return function(p){var q={};function R(O){if(q[O])return q[O].exports;var _=q[O]={i:O,l:!1,exports:{}};return p[O].call(_.exports,_,_.exports,R),_.l=!0,_.exports}return R.m=p,R.c=q,R.d=function(O,_,M){R.o(O,_)||Object.defineProperty(O,_,{enumerable:!0,get:M})},R.r=function(O){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(O,"__esModule",{value:!0})},R.t=function(O,_){if(_&1&&(O=R(O)),_&8||_&4&&typeof O=="object"&&O&&O.__esModule)return O;var M=Object.create(null);if(R.r(M),Object.defineProperty(M,"default",{enumerable:!0,value:O}),_&2&&typeof O!="string")for(var x in O)R.d(M,x,(function(ae){return O[ae]}).bind(null,x));return M},R.n=function(O){var _=O&&O.__esModule?function(){return O.default}:function(){return O};return R.d(_,"a",_),_},R.o=function(O,_){return Object.prototype.hasOwnProperty.call(O,_)},R.p="",R(R.s=1)}([function(p,q,R){},function(p,q,R){R.r(q),R(0);var O=function(){function o(e,t,r){this.lexer=void 0,this.start=void 0,this.end=void 0,this.lexer=e,this.start=t,this.end=r}return o.range=function(t,r){return r?!t||!t.loc||!r.loc||t.loc.lexer!==r.loc.lexer?null:new o(t.loc.lexer,t.loc.start,r.loc.end):t&&t.loc},o}(),_=function(){function o(t,r){this.text=void 0,this.loc=void 0,this.text=t,this.loc=r}var e=o.prototype;return e.range=function(r,n){return new o(n,O.range(this,r))},o}(),M=function o(e,t){this.position=void 0;var r="KaTeX parse error: "+e,n,i=t&&t.loc;if(i&&i.start<=i.end){var l=i.lexer.input;n=i.start;var m=i.end;n===l.length?r+=" at end of input: ":r+=" at position "+(n+1)+": ";var y=l.slice(n,m).replace(/[^]/g,"$&̲"),c;n>15?c="…"+l.slice(n-15,n):c=l.slice(0,n);var b;m+15<l.length?b=l.slice(m,m+15)+"…":b=l.slice(m),r+=c+y+b}var k=new Error(r);return k.name="ParseError",k.__proto__=o.prototype,k.position=n,k};M.prototype.__proto__=Error.prototype;var x=M,ae=function(e,t){return e.indexOf(t)!==-1},de=function(e,t){return e===void 0?t:e},Ce=/([A-Z])/g,ne=function(e){return e.replace(Ce,"-$1").toLowerCase()},Y={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},Te=/[&><"']/g;function ze(o){return String(o).replace(Te,function(e){return Y[e]})}var Q=function o(e){return e.type==="ordgroup"||e.type==="color"?e.body.length===1?o(e.body[0]):e:e.type==="font"?o(e.body):e},pe=function(e){var t=Q(e);return t.type==="mathord"||t.type==="textord"||t.type==="atom"},ee=function(e){if(!e)throw new Error("Expected non-null, but got "+String(e));return e},Ae=function(e){var t=/^\s*([^\\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(e);return t!=null?t[1]:"_relative"},N={contains:ae,deflt:de,escape:ze,hyphenate:ne,getBaseElem:Q,isCharacterBox:pe,protocolFromUrl:Ae},Ke=function(){function o(t){this.displayMode=void 0,this.output=void 0,this.leqno=void 0,this.fleqn=void 0,this.throwOnError=void 0,this.errorColor=void 0,this.macros=void 0,this.minRuleThickness=void 0,this.colorIsTextColor=void 0,this.strict=void 0,this.trust=void 0,this.maxSize=void 0,this.maxExpand=void 0,t=t||{},this.displayMode=N.deflt(t.displayMode,!1),this.output=N.deflt(t.output,"htmlAndMathml"),this.leqno=N.deflt(t.leqno,!1),this.fleqn=N.deflt(t.fleqn,!1),this.throwOnError=N.deflt(t.throwOnError,!0),this.errorColor=N.deflt(t.errorColor,"#cc0000"),this.macros=t.macros||{},this.minRuleThickness=Math.max(0,N.deflt(t.minRuleThickness,0)),this.colorIsTextColor=N.deflt(t.colorIsTextColor,!1),this.strict=N.deflt(t.strict,"warn"),this.trust=N.deflt(t.trust,!1),this.maxSize=Math.max(0,N.deflt(t.maxSize,1/0)),this.maxExpand=Math.max(0,N.deflt(t.maxExpand,1e3))}var e=o.prototype;return e.reportNonstrict=function(r,n,i){var l=this.strict;if(typeof l=="function"&&(l=l(r,n,i)),!(!l||l==="ignore")){if(l===!0||l==="error")throw new x("LaTeX-incompatible input and strict mode is set to 'error': "+(n+" ["+r+"]"),i);l==="warn"?typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to 'warn': "+(n+" ["+r+"]")):typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to "+("unrecognized '"+l+"': "+n+" ["+r+"]"))}},e.useStrictBehavior=function(r,n,i){var l=this.strict;if(typeof l=="function")try{l=l(r,n,i)}catch{l="error"}return!l||l==="ignore"?!1:l===!0||l==="error"?!0:l==="warn"?(typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to 'warn': "+(n+" ["+r+"]")),!1):(typeof console<"u"&&console.warn("LaTeX-incompatible input and strict mode is set to "+("unrecognized '"+l+"': "+n+" ["+r+"]")),!1)},e.isTrusted=function(r){r.url&&!r.protocol&&(r.protocol=N.protocolFromUrl(r.url));var n=typeof this.trust=="function"?this.trust(r):this.trust;return!!n},o}(),Se=function(){function o(t,r,n){this.id=void 0,this.size=void 0,this.cramped=void 0,this.id=t,this.size=r,this.cramped=n}var e=o.prototype;return e.sup=function(){return Be[ja[this.id]]},e.sub=function(){return Be[_a[this.id]]},e.fracNum=function(){return Be[Na[this.id]]},e.fracDen=function(){return Be[Ia[this.id]]},e.cramp=function(){return Be[La[this.id]]},e.text=function(){return Be[Ma[this.id]]},e.isTight=function(){return this.size>=2},o}(),rr=0,Et=1,ht=2,He=3,kt=4,_e=5,mt=6,xe=7,Be=[new Se(rr,0,!1),new Se(Et,0,!0),new Se(ht,1,!1),new Se(He,1,!0),new Se(kt,2,!1),new Se(_e,2,!0),new Se(mt,3,!1),new Se(xe,3,!0)],ja=[kt,_e,kt,_e,mt,xe,mt,xe],_a=[_e,_e,_e,_e,xe,xe,xe,xe],Na=[ht,He,kt,_e,mt,xe,mt,xe],Ia=[He,He,_e,_e,xe,xe,xe,xe],La=[Et,Et,He,He,_e,_e,xe,xe],Ma=[rr,Et,ht,He,ht,He,ht,He],F={DISPLAY:Be[rr],TEXT:Be[ht],SCRIPT:Be[kt],SCRIPTSCRIPT:Be[mt]},nr=[{name:"latin",blocks:[[256,591],[768,879]]},{name:"cyrillic",blocks:[[1024,1279]]},{name:"brahmic",blocks:[[2304,4255]]},{name:"georgian",blocks:[[4256,4351]]},{name:"cjk",blocks:[[12288,12543],[19968,40879],[65280,65376]]},{name:"hangul",blocks:[[44032,55215]]}];function Pa(o){for(var e=0;e<nr.length;e++)for(var t=nr[e],r=0;r<t.blocks.length;r++){var n=t.blocks[r];if(o>=n[0]&&o<=n[1])return t.name}return null}var qt=[];nr.forEach(function(o){return o.blocks.forEach(function(e){return qt.push.apply(qt,e)})});function Kr(o){for(var e=0;e<qt.length;e+=2)if(o>=qt[e]&&o<=qt[e+1])return!0;return!1}var yt=80,Da=function(e,t){return"M95,"+(622+e+t)+`
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l`+e/2.075+" -"+e+`
c5.3,-9.3,12,-14,20,-14
H400000v`+(40+e)+`H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M`+(834+e)+" "+t+"h400000v"+(40+e)+"h-400000z"},Fa=function(e,t){return"M263,"+(601+e+t)+`c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l`+e/2.084+" -"+e+`
c4.7,-7.3,11,-11,19,-11
H40000v`+(40+e)+`H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M`+(1001+e)+" "+t+"h400000v"+(40+e)+"h-400000z"},Ba=function(e,t){return"M983 "+(10+e+t)+`
l`+e/3.13+" -"+e+`
c4,-6.7,10,-10,18,-10 H400000v`+(40+e)+`
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M`+(1001+e)+" "+t+"h400000v"+(40+e)+"h-400000z"},Ua=function(e,t){return"M424,"+(2398+e+t)+`
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l`+e/4.223+" -"+e+`c4,-6.7,10,-10,18,-10 H400000
v`+(40+e)+`H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M`+(1001+e)+" "+t+`
h400000v`+(40+e)+"h-400000z"},Ha=function(e,t){return"M473,"+(2713+e+t)+`
c339.3,-1799.3,509.3,-2700,510,-2702 l`+e/5.298+" -"+e+`
c3.3,-7.3,9.3,-11,18,-11 H400000v`+(40+e)+`H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM`+(1001+e)+" "+t+"h400000v"+(40+e)+"H1017.7z"},Va=function(e,t,r){var n=r-54-t-e;return"M702 "+(e+t)+"H400000"+(40+e)+`
H742v`+n+`l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 `+t+"H400000v"+(40+e)+"H742z"},Ga=function(e,t,r){t=1e3*t;var n="";switch(e){case"sqrtMain":n=Da(t,yt);break;case"sqrtSize1":n=Fa(t,yt);break;case"sqrtSize2":n=Ba(t,yt);break;case"sqrtSize3":n=Ua(t,yt);break;case"sqrtSize4":n=Ha(t,yt);break;case"sqrtTall":n=Va(t,yt,r)}return n},Xr={doubleleftarrow:`M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,doublerightarrow:`M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,leftarrow:`M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,leftbrace:`M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,leftbraceunder:`M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,leftgroup:`M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,leftgroupunder:`M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,leftharpoon:`M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,leftharpoonplus:`M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,leftharpoondown:`M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,leftharpoondownplus:`M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,lefthook:`M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,leftlinesegment:`M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,leftmapsto:`M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,leftToFrom:`M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,longequal:`M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,midbrace:`M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,midbraceunder:`M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,oiintSize1:`M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,oiintSize2:`M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,oiiintSize1:`M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,oiiintSize2:`M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,rightarrow:`M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,rightbrace:`M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,rightbraceunder:`M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,rightgroup:`M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,rightgroupunder:`M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,rightharpoon:`M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,rightharpoonplus:`M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,rightharpoondown:`M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,rightharpoondownplus:`M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,righthook:`M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,rightlinesegment:`M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,rightToFrom:`M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,twoheadleftarrow:`M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,twoheadrightarrow:`M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,tilde1:`M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,tilde2:`M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,tilde3:`M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,tilde4:`M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,vec:`M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,widehat1:`M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,widehat2:`M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widehat3:`M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widehat4:`M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widecheck1:`M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,widecheck2:`M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,widecheck3:`M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,widecheck4:`M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,baraboveleftarrow:`M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,rightarrowabovebar:`M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,baraboveshortleftharpoon:`M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,rightharpoonaboveshortbar:`M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,shortbaraboveleftharpoon:`M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,shortrightharpoonabovebar:`M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`},Tt=function(){function o(t){this.children=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,this.children=t,this.classes=[],this.height=0,this.depth=0,this.maxFontSize=0,this.style={}}var e=o.prototype;return e.hasClass=function(r){return N.contains(this.classes,r)},e.toNode=function(){for(var r=document.createDocumentFragment(),n=0;n<this.children.length;n++)r.appendChild(this.children[n].toNode());return r},e.toMarkup=function(){for(var r="",n=0;n<this.children.length;n++)r+=this.children[n].toMarkup();return r},e.toText=function(){var r=function(i){return i.toText()};return this.children.map(r).join("")},o}(),gt=function(e){return e.filter(function(t){return t}).join(" ")},Yr=function(e,t,r){if(this.classes=e||[],this.attributes={},this.height=0,this.depth=0,this.maxFontSize=0,this.style=r||{},t){t.style.isTight()&&this.classes.push("mtight");var n=t.getColor();n&&(this.style.color=n)}},Zr=function(e){var t=document.createElement(e);t.className=gt(this.classes);for(var r in this.style)this.style.hasOwnProperty(r)&&(t.style[r]=this.style[r]);for(var n in this.attributes)this.attributes.hasOwnProperty(n)&&t.setAttribute(n,this.attributes[n]);for(var i=0;i<this.children.length;i++)t.appendChild(this.children[i].toNode());return t},Jr=function(e){var t="<"+e;this.classes.length&&(t+=' class="'+N.escape(gt(this.classes))+'"');var r="";for(var n in this.style)this.style.hasOwnProperty(n)&&(r+=N.hyphenate(n)+":"+this.style[n]+";");r&&(t+=' style="'+N.escape(r)+'"');for(var i in this.attributes)this.attributes.hasOwnProperty(i)&&(t+=" "+i+'="'+N.escape(this.attributes[i])+'"');t+=">";for(var l=0;l<this.children.length;l++)t+=this.children[l].toMarkup();return t+="</"+e+">",t},St=function(){function o(t,r,n,i){this.children=void 0,this.attributes=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.width=void 0,this.maxFontSize=void 0,this.style=void 0,Yr.call(this,t,n,i),this.children=r||[]}var e=o.prototype;return e.setAttribute=function(r,n){this.attributes[r]=n},e.hasClass=function(r){return N.contains(this.classes,r)},e.toNode=function(){return Zr.call(this,"span")},e.toMarkup=function(){return Jr.call(this,"span")},o}(),ar=function(){function o(t,r,n,i){this.children=void 0,this.attributes=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,Yr.call(this,r,i),this.children=n||[],this.setAttribute("href",t)}var e=o.prototype;return e.setAttribute=function(r,n){this.attributes[r]=n},e.hasClass=function(r){return N.contains(this.classes,r)},e.toNode=function(){return Zr.call(this,"a")},e.toMarkup=function(){return Jr.call(this,"a")},o}(),$a=function(){function o(t,r,n){this.src=void 0,this.alt=void 0,this.classes=void 0,this.height=void 0,this.depth=void 0,this.maxFontSize=void 0,this.style=void 0,this.alt=r,this.src=t,this.classes=["mord"],this.style=n}var e=o.prototype;return e.hasClass=function(r){return N.contains(this.classes,r)},e.toNode=function(){var r=document.createElement("img");r.src=this.src,r.alt=this.alt,r.className="mord";for(var n in this.style)this.style.hasOwnProperty(n)&&(r.style[n]=this.style[n]);return r},e.toMarkup=function(){var r="<img  src='"+this.src+" 'alt='"+this.alt+"' ",n="";for(var i in this.style)this.style.hasOwnProperty(i)&&(n+=N.hyphenate(i)+":"+this.style[i]+";");return n&&(r+=' style="'+N.escape(n)+'"'),r+="'/>",r},o}(),Ka={î:"ı̂",ï:"ı̈",í:"ı́",ì:"ı̀"},Ne=function(){function o(t,r,n,i,l,m,y,c){this.text=void 0,this.height=void 0,this.depth=void 0,this.italic=void 0,this.skew=void 0,this.width=void 0,this.maxFontSize=void 0,this.classes=void 0,this.style=void 0,this.text=t,this.height=r||0,this.depth=n||0,this.italic=i||0,this.skew=l||0,this.width=m||0,this.classes=y||[],this.style=c||{},this.maxFontSize=0;var b=Pa(this.text.charCodeAt(0));b&&this.classes.push(b+"_fallback"),/[îïíì]/.test(this.text)&&(this.text=Ka[this.text])}var e=o.prototype;return e.hasClass=function(r){return N.contains(this.classes,r)},e.toNode=function(){var r=document.createTextNode(this.text),n=null;this.italic>0&&(n=document.createElement("span"),n.style.marginRight=this.italic+"em"),this.classes.length>0&&(n=n||document.createElement("span"),n.className=gt(this.classes));for(var i in this.style)this.style.hasOwnProperty(i)&&(n=n||document.createElement("span"),n.style[i]=this.style[i]);return n?(n.appendChild(r),n):r},e.toMarkup=function(){var r=!1,n="<span";this.classes.length&&(r=!0,n+=' class="',n+=N.escape(gt(this.classes)),n+='"');var i="";this.italic>0&&(i+="margin-right:"+this.italic+"em;");for(var l in this.style)this.style.hasOwnProperty(l)&&(i+=N.hyphenate(l)+":"+this.style[l]+";");i&&(r=!0,n+=' style="'+N.escape(i)+'"');var m=N.escape(this.text);return r?(n+=">",n+=m,n+="</span>",n):m},o}(),ct=function(){function o(t,r){this.children=void 0,this.attributes=void 0,this.children=t||[],this.attributes=r||{}}var e=o.prototype;return e.toNode=function(){var r="http://www.w3.org/2000/svg",n=document.createElementNS(r,"svg");for(var i in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,i)&&n.setAttribute(i,this.attributes[i]);for(var l=0;l<this.children.length;l++)n.appendChild(this.children[l].toNode());return n},e.toMarkup=function(){var r="<svg";for(var n in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,n)&&(r+=" "+n+"='"+this.attributes[n]+"'");r+=">";for(var i=0;i<this.children.length;i++)r+=this.children[i].toMarkup();return r+="</svg>",r},o}(),At=function(){function o(t,r){this.pathName=void 0,this.alternate=void 0,this.pathName=t,this.alternate=r}var e=o.prototype;return e.toNode=function(){var r="http://www.w3.org/2000/svg",n=document.createElementNS(r,"path");return this.alternate?n.setAttribute("d",this.alternate):n.setAttribute("d",Xr[this.pathName]),n},e.toMarkup=function(){return this.alternate?"<path d='"+this.alternate+"'/>":"<path d='"+Xr[this.pathName]+"'/>"},o}(),ir=function(){function o(t){this.attributes=void 0,this.attributes=t||{}}var e=o.prototype;return e.toNode=function(){var r="http://www.w3.org/2000/svg",n=document.createElementNS(r,"line");for(var i in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,i)&&n.setAttribute(i,this.attributes[i]);return n},e.toMarkup=function(){var r="<line";for(var n in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,n)&&(r+=" "+n+"='"+this.attributes[n]+"'");return r+="/>",r},o}();function Qr(o){if(o instanceof Ne)return o;throw new Error("Expected symbolNode but got "+String(o)+".")}function Xa(o){if(o instanceof St)return o;throw new Error("Expected span<HtmlDomNode> but got "+String(o)+".")}var it={"AMS-Regular":{65:[0,.68889,0,0,.72222],66:[0,.68889,0,0,.66667],67:[0,.68889,0,0,.72222],68:[0,.68889,0,0,.72222],69:[0,.68889,0,0,.66667],70:[0,.68889,0,0,.61111],71:[0,.68889,0,0,.77778],72:[0,.68889,0,0,.77778],73:[0,.68889,0,0,.38889],74:[.16667,.68889,0,0,.5],75:[0,.68889,0,0,.77778],76:[0,.68889,0,0,.66667],77:[0,.68889,0,0,.94445],78:[0,.68889,0,0,.72222],79:[.16667,.68889,0,0,.77778],80:[0,.68889,0,0,.61111],81:[.16667,.68889,0,0,.77778],82:[0,.68889,0,0,.72222],83:[0,.68889,0,0,.55556],84:[0,.68889,0,0,.66667],85:[0,.68889,0,0,.72222],86:[0,.68889,0,0,.72222],87:[0,.68889,0,0,1],88:[0,.68889,0,0,.72222],89:[0,.68889,0,0,.72222],90:[0,.68889,0,0,.66667],107:[0,.68889,0,0,.55556],165:[0,.675,.025,0,.75],174:[.15559,.69224,0,0,.94666],240:[0,.68889,0,0,.55556],295:[0,.68889,0,0,.54028],710:[0,.825,0,0,2.33334],732:[0,.9,0,0,2.33334],770:[0,.825,0,0,2.33334],771:[0,.9,0,0,2.33334],989:[.08167,.58167,0,0,.77778],1008:[0,.43056,.04028,0,.66667],8245:[0,.54986,0,0,.275],8463:[0,.68889,0,0,.54028],8487:[0,.68889,0,0,.72222],8498:[0,.68889,0,0,.55556],8502:[0,.68889,0,0,.66667],8503:[0,.68889,0,0,.44445],8504:[0,.68889,0,0,.66667],8513:[0,.68889,0,0,.63889],8592:[-.03598,.46402,0,0,.5],8594:[-.03598,.46402,0,0,.5],8602:[-.13313,.36687,0,0,1],8603:[-.13313,.36687,0,0,1],8606:[.01354,.52239,0,0,1],8608:[.01354,.52239,0,0,1],8610:[.01354,.52239,0,0,1.11111],8611:[.01354,.52239,0,0,1.11111],8619:[0,.54986,0,0,1],8620:[0,.54986,0,0,1],8621:[-.13313,.37788,0,0,1.38889],8622:[-.13313,.36687,0,0,1],8624:[0,.69224,0,0,.5],8625:[0,.69224,0,0,.5],8630:[0,.43056,0,0,1],8631:[0,.43056,0,0,1],8634:[.08198,.58198,0,0,.77778],8635:[.08198,.58198,0,0,.77778],8638:[.19444,.69224,0,0,.41667],8639:[.19444,.69224,0,0,.41667],8642:[.19444,.69224,0,0,.41667],8643:[.19444,.69224,0,0,.41667],8644:[.1808,.675,0,0,1],8646:[.1808,.675,0,0,1],8647:[.1808,.675,0,0,1],8648:[.19444,.69224,0,0,.83334],8649:[.1808,.675,0,0,1],8650:[.19444,.69224,0,0,.83334],8651:[.01354,.52239,0,0,1],8652:[.01354,.52239,0,0,1],8653:[-.13313,.36687,0,0,1],8654:[-.13313,.36687,0,0,1],8655:[-.13313,.36687,0,0,1],8666:[.13667,.63667,0,0,1],8667:[.13667,.63667,0,0,1],8669:[-.13313,.37788,0,0,1],8672:[-.064,.437,0,0,1.334],8674:[-.064,.437,0,0,1.334],8705:[0,.825,0,0,.5],8708:[0,.68889,0,0,.55556],8709:[.08167,.58167,0,0,.77778],8717:[0,.43056,0,0,.42917],8722:[-.03598,.46402,0,0,.5],8724:[.08198,.69224,0,0,.77778],8726:[.08167,.58167,0,0,.77778],8733:[0,.69224,0,0,.77778],8736:[0,.69224,0,0,.72222],8737:[0,.69224,0,0,.72222],8738:[.03517,.52239,0,0,.72222],8739:[.08167,.58167,0,0,.22222],8740:[.25142,.74111,0,0,.27778],8741:[.08167,.58167,0,0,.38889],8742:[.25142,.74111,0,0,.5],8756:[0,.69224,0,0,.66667],8757:[0,.69224,0,0,.66667],8764:[-.13313,.36687,0,0,.77778],8765:[-.13313,.37788,0,0,.77778],8769:[-.13313,.36687,0,0,.77778],8770:[-.03625,.46375,0,0,.77778],8774:[.30274,.79383,0,0,.77778],8776:[-.01688,.48312,0,0,.77778],8778:[.08167,.58167,0,0,.77778],8782:[.06062,.54986,0,0,.77778],8783:[.06062,.54986,0,0,.77778],8785:[.08198,.58198,0,0,.77778],8786:[.08198,.58198,0,0,.77778],8787:[.08198,.58198,0,0,.77778],8790:[0,.69224,0,0,.77778],8791:[.22958,.72958,0,0,.77778],8796:[.08198,.91667,0,0,.77778],8806:[.25583,.75583,0,0,.77778],8807:[.25583,.75583,0,0,.77778],8808:[.25142,.75726,0,0,.77778],8809:[.25142,.75726,0,0,.77778],8812:[.25583,.75583,0,0,.5],8814:[.20576,.70576,0,0,.77778],8815:[.20576,.70576,0,0,.77778],8816:[.30274,.79383,0,0,.77778],8817:[.30274,.79383,0,0,.77778],8818:[.22958,.72958,0,0,.77778],8819:[.22958,.72958,0,0,.77778],8822:[.1808,.675,0,0,.77778],8823:[.1808,.675,0,0,.77778],8828:[.13667,.63667,0,0,.77778],8829:[.13667,.63667,0,0,.77778],8830:[.22958,.72958,0,0,.77778],8831:[.22958,.72958,0,0,.77778],8832:[.20576,.70576,0,0,.77778],8833:[.20576,.70576,0,0,.77778],8840:[.30274,.79383,0,0,.77778],8841:[.30274,.79383,0,0,.77778],8842:[.13597,.63597,0,0,.77778],8843:[.13597,.63597,0,0,.77778],8847:[.03517,.54986,0,0,.77778],8848:[.03517,.54986,0,0,.77778],8858:[.08198,.58198,0,0,.77778],8859:[.08198,.58198,0,0,.77778],8861:[.08198,.58198,0,0,.77778],8862:[0,.675,0,0,.77778],8863:[0,.675,0,0,.77778],8864:[0,.675,0,0,.77778],8865:[0,.675,0,0,.77778],8872:[0,.69224,0,0,.61111],8873:[0,.69224,0,0,.72222],8874:[0,.69224,0,0,.88889],8876:[0,.68889,0,0,.61111],8877:[0,.68889,0,0,.61111],8878:[0,.68889,0,0,.72222],8879:[0,.68889,0,0,.72222],8882:[.03517,.54986,0,0,.77778],8883:[.03517,.54986,0,0,.77778],8884:[.13667,.63667,0,0,.77778],8885:[.13667,.63667,0,0,.77778],8888:[0,.54986,0,0,1.11111],8890:[.19444,.43056,0,0,.55556],8891:[.19444,.69224,0,0,.61111],8892:[.19444,.69224,0,0,.61111],8901:[0,.54986,0,0,.27778],8903:[.08167,.58167,0,0,.77778],8905:[.08167,.58167,0,0,.77778],8906:[.08167,.58167,0,0,.77778],8907:[0,.69224,0,0,.77778],8908:[0,.69224,0,0,.77778],8909:[-.03598,.46402,0,0,.77778],8910:[0,.54986,0,0,.76042],8911:[0,.54986,0,0,.76042],8912:[.03517,.54986,0,0,.77778],8913:[.03517,.54986,0,0,.77778],8914:[0,.54986,0,0,.66667],8915:[0,.54986,0,0,.66667],8916:[0,.69224,0,0,.66667],8918:[.0391,.5391,0,0,.77778],8919:[.0391,.5391,0,0,.77778],8920:[.03517,.54986,0,0,1.33334],8921:[.03517,.54986,0,0,1.33334],8922:[.38569,.88569,0,0,.77778],8923:[.38569,.88569,0,0,.77778],8926:[.13667,.63667,0,0,.77778],8927:[.13667,.63667,0,0,.77778],8928:[.30274,.79383,0,0,.77778],8929:[.30274,.79383,0,0,.77778],8934:[.23222,.74111,0,0,.77778],8935:[.23222,.74111,0,0,.77778],8936:[.23222,.74111,0,0,.77778],8937:[.23222,.74111,0,0,.77778],8938:[.20576,.70576,0,0,.77778],8939:[.20576,.70576,0,0,.77778],8940:[.30274,.79383,0,0,.77778],8941:[.30274,.79383,0,0,.77778],8994:[.19444,.69224,0,0,.77778],8995:[.19444,.69224,0,0,.77778],9416:[.15559,.69224,0,0,.90222],9484:[0,.69224,0,0,.5],9488:[0,.69224,0,0,.5],9492:[0,.37788,0,0,.5],9496:[0,.37788,0,0,.5],9585:[.19444,.68889,0,0,.88889],9586:[.19444,.74111,0,0,.88889],9632:[0,.675,0,0,.77778],9633:[0,.675,0,0,.77778],9650:[0,.54986,0,0,.72222],9651:[0,.54986,0,0,.72222],9654:[.03517,.54986,0,0,.77778],9660:[0,.54986,0,0,.72222],9661:[0,.54986,0,0,.72222],9664:[.03517,.54986,0,0,.77778],9674:[.11111,.69224,0,0,.66667],9733:[.19444,.69224,0,0,.94445],10003:[0,.69224,0,0,.83334],10016:[0,.69224,0,0,.83334],10731:[.11111,.69224,0,0,.66667],10846:[.19444,.75583,0,0,.61111],10877:[.13667,.63667,0,0,.77778],10878:[.13667,.63667,0,0,.77778],10885:[.25583,.75583,0,0,.77778],10886:[.25583,.75583,0,0,.77778],10887:[.13597,.63597,0,0,.77778],10888:[.13597,.63597,0,0,.77778],10889:[.26167,.75726,0,0,.77778],10890:[.26167,.75726,0,0,.77778],10891:[.48256,.98256,0,0,.77778],10892:[.48256,.98256,0,0,.77778],10901:[.13667,.63667,0,0,.77778],10902:[.13667,.63667,0,0,.77778],10933:[.25142,.75726,0,0,.77778],10934:[.25142,.75726,0,0,.77778],10935:[.26167,.75726,0,0,.77778],10936:[.26167,.75726,0,0,.77778],10937:[.26167,.75726,0,0,.77778],10938:[.26167,.75726,0,0,.77778],10949:[.25583,.75583,0,0,.77778],10950:[.25583,.75583,0,0,.77778],10955:[.28481,.79383,0,0,.77778],10956:[.28481,.79383,0,0,.77778],57350:[.08167,.58167,0,0,.22222],57351:[.08167,.58167,0,0,.38889],57352:[.08167,.58167,0,0,.77778],57353:[0,.43056,.04028,0,.66667],57356:[.25142,.75726,0,0,.77778],57357:[.25142,.75726,0,0,.77778],57358:[.41951,.91951,0,0,.77778],57359:[.30274,.79383,0,0,.77778],57360:[.30274,.79383,0,0,.77778],57361:[.41951,.91951,0,0,.77778],57366:[.25142,.75726,0,0,.77778],57367:[.25142,.75726,0,0,.77778],57368:[.25142,.75726,0,0,.77778],57369:[.25142,.75726,0,0,.77778],57370:[.13597,.63597,0,0,.77778],57371:[.13597,.63597,0,0,.77778]},"Caligraphic-Regular":{48:[0,.43056,0,0,.5],49:[0,.43056,0,0,.5],50:[0,.43056,0,0,.5],51:[.19444,.43056,0,0,.5],52:[.19444,.43056,0,0,.5],53:[.19444,.43056,0,0,.5],54:[0,.64444,0,0,.5],55:[.19444,.43056,0,0,.5],56:[0,.64444,0,0,.5],57:[.19444,.43056,0,0,.5],65:[0,.68333,0,.19445,.79847],66:[0,.68333,.03041,.13889,.65681],67:[0,.68333,.05834,.13889,.52653],68:[0,.68333,.02778,.08334,.77139],69:[0,.68333,.08944,.11111,.52778],70:[0,.68333,.09931,.11111,.71875],71:[.09722,.68333,.0593,.11111,.59487],72:[0,.68333,.00965,.11111,.84452],73:[0,.68333,.07382,0,.54452],74:[.09722,.68333,.18472,.16667,.67778],75:[0,.68333,.01445,.05556,.76195],76:[0,.68333,0,.13889,.68972],77:[0,.68333,0,.13889,1.2009],78:[0,.68333,.14736,.08334,.82049],79:[0,.68333,.02778,.11111,.79611],80:[0,.68333,.08222,.08334,.69556],81:[.09722,.68333,0,.11111,.81667],82:[0,.68333,0,.08334,.8475],83:[0,.68333,.075,.13889,.60556],84:[0,.68333,.25417,0,.54464],85:[0,.68333,.09931,.08334,.62583],86:[0,.68333,.08222,0,.61278],87:[0,.68333,.08222,.08334,.98778],88:[0,.68333,.14643,.13889,.7133],89:[.09722,.68333,.08222,.08334,.66834],90:[0,.68333,.07944,.13889,.72473]},"Fraktur-Regular":{33:[0,.69141,0,0,.29574],34:[0,.69141,0,0,.21471],38:[0,.69141,0,0,.73786],39:[0,.69141,0,0,.21201],40:[.24982,.74947,0,0,.38865],41:[.24982,.74947,0,0,.38865],42:[0,.62119,0,0,.27764],43:[.08319,.58283,0,0,.75623],44:[0,.10803,0,0,.27764],45:[.08319,.58283,0,0,.75623],46:[0,.10803,0,0,.27764],47:[.24982,.74947,0,0,.50181],48:[0,.47534,0,0,.50181],49:[0,.47534,0,0,.50181],50:[0,.47534,0,0,.50181],51:[.18906,.47534,0,0,.50181],52:[.18906,.47534,0,0,.50181],53:[.18906,.47534,0,0,.50181],54:[0,.69141,0,0,.50181],55:[.18906,.47534,0,0,.50181],56:[0,.69141,0,0,.50181],57:[.18906,.47534,0,0,.50181],58:[0,.47534,0,0,.21606],59:[.12604,.47534,0,0,.21606],61:[-.13099,.36866,0,0,.75623],63:[0,.69141,0,0,.36245],65:[0,.69141,0,0,.7176],66:[0,.69141,0,0,.88397],67:[0,.69141,0,0,.61254],68:[0,.69141,0,0,.83158],69:[0,.69141,0,0,.66278],70:[.12604,.69141,0,0,.61119],71:[0,.69141,0,0,.78539],72:[.06302,.69141,0,0,.7203],73:[0,.69141,0,0,.55448],74:[.12604,.69141,0,0,.55231],75:[0,.69141,0,0,.66845],76:[0,.69141,0,0,.66602],77:[0,.69141,0,0,1.04953],78:[0,.69141,0,0,.83212],79:[0,.69141,0,0,.82699],80:[.18906,.69141,0,0,.82753],81:[.03781,.69141,0,0,.82699],82:[0,.69141,0,0,.82807],83:[0,.69141,0,0,.82861],84:[0,.69141,0,0,.66899],85:[0,.69141,0,0,.64576],86:[0,.69141,0,0,.83131],87:[0,.69141,0,0,1.04602],88:[0,.69141,0,0,.71922],89:[.18906,.69141,0,0,.83293],90:[.12604,.69141,0,0,.60201],91:[.24982,.74947,0,0,.27764],93:[.24982,.74947,0,0,.27764],94:[0,.69141,0,0,.49965],97:[0,.47534,0,0,.50046],98:[0,.69141,0,0,.51315],99:[0,.47534,0,0,.38946],100:[0,.62119,0,0,.49857],101:[0,.47534,0,0,.40053],102:[.18906,.69141,0,0,.32626],103:[.18906,.47534,0,0,.5037],104:[.18906,.69141,0,0,.52126],105:[0,.69141,0,0,.27899],106:[0,.69141,0,0,.28088],107:[0,.69141,0,0,.38946],108:[0,.69141,0,0,.27953],109:[0,.47534,0,0,.76676],110:[0,.47534,0,0,.52666],111:[0,.47534,0,0,.48885],112:[.18906,.52396,0,0,.50046],113:[.18906,.47534,0,0,.48912],114:[0,.47534,0,0,.38919],115:[0,.47534,0,0,.44266],116:[0,.62119,0,0,.33301],117:[0,.47534,0,0,.5172],118:[0,.52396,0,0,.5118],119:[0,.52396,0,0,.77351],120:[.18906,.47534,0,0,.38865],121:[.18906,.47534,0,0,.49884],122:[.18906,.47534,0,0,.39054],8216:[0,.69141,0,0,.21471],8217:[0,.69141,0,0,.21471],58112:[0,.62119,0,0,.49749],58113:[0,.62119,0,0,.4983],58114:[.18906,.69141,0,0,.33328],58115:[.18906,.69141,0,0,.32923],58116:[.18906,.47534,0,0,.50343],58117:[0,.69141,0,0,.33301],58118:[0,.62119,0,0,.33409],58119:[0,.47534,0,0,.50073]},"Main-Bold":{33:[0,.69444,0,0,.35],34:[0,.69444,0,0,.60278],35:[.19444,.69444,0,0,.95833],36:[.05556,.75,0,0,.575],37:[.05556,.75,0,0,.95833],38:[0,.69444,0,0,.89444],39:[0,.69444,0,0,.31944],40:[.25,.75,0,0,.44722],41:[.25,.75,0,0,.44722],42:[0,.75,0,0,.575],43:[.13333,.63333,0,0,.89444],44:[.19444,.15556,0,0,.31944],45:[0,.44444,0,0,.38333],46:[0,.15556,0,0,.31944],47:[.25,.75,0,0,.575],48:[0,.64444,0,0,.575],49:[0,.64444,0,0,.575],50:[0,.64444,0,0,.575],51:[0,.64444,0,0,.575],52:[0,.64444,0,0,.575],53:[0,.64444,0,0,.575],54:[0,.64444,0,0,.575],55:[0,.64444,0,0,.575],56:[0,.64444,0,0,.575],57:[0,.64444,0,0,.575],58:[0,.44444,0,0,.31944],59:[.19444,.44444,0,0,.31944],60:[.08556,.58556,0,0,.89444],61:[-.10889,.39111,0,0,.89444],62:[.08556,.58556,0,0,.89444],63:[0,.69444,0,0,.54305],64:[0,.69444,0,0,.89444],65:[0,.68611,0,0,.86944],66:[0,.68611,0,0,.81805],67:[0,.68611,0,0,.83055],68:[0,.68611,0,0,.88194],69:[0,.68611,0,0,.75555],70:[0,.68611,0,0,.72361],71:[0,.68611,0,0,.90416],72:[0,.68611,0,0,.9],73:[0,.68611,0,0,.43611],74:[0,.68611,0,0,.59444],75:[0,.68611,0,0,.90138],76:[0,.68611,0,0,.69166],77:[0,.68611,0,0,1.09166],78:[0,.68611,0,0,.9],79:[0,.68611,0,0,.86388],80:[0,.68611,0,0,.78611],81:[.19444,.68611,0,0,.86388],82:[0,.68611,0,0,.8625],83:[0,.68611,0,0,.63889],84:[0,.68611,0,0,.8],85:[0,.68611,0,0,.88472],86:[0,.68611,.01597,0,.86944],87:[0,.68611,.01597,0,1.18888],88:[0,.68611,0,0,.86944],89:[0,.68611,.02875,0,.86944],90:[0,.68611,0,0,.70277],91:[.25,.75,0,0,.31944],92:[.25,.75,0,0,.575],93:[.25,.75,0,0,.31944],94:[0,.69444,0,0,.575],95:[.31,.13444,.03194,0,.575],97:[0,.44444,0,0,.55902],98:[0,.69444,0,0,.63889],99:[0,.44444,0,0,.51111],100:[0,.69444,0,0,.63889],101:[0,.44444,0,0,.52708],102:[0,.69444,.10903,0,.35139],103:[.19444,.44444,.01597,0,.575],104:[0,.69444,0,0,.63889],105:[0,.69444,0,0,.31944],106:[.19444,.69444,0,0,.35139],107:[0,.69444,0,0,.60694],108:[0,.69444,0,0,.31944],109:[0,.44444,0,0,.95833],110:[0,.44444,0,0,.63889],111:[0,.44444,0,0,.575],112:[.19444,.44444,0,0,.63889],113:[.19444,.44444,0,0,.60694],114:[0,.44444,0,0,.47361],115:[0,.44444,0,0,.45361],116:[0,.63492,0,0,.44722],117:[0,.44444,0,0,.63889],118:[0,.44444,.01597,0,.60694],119:[0,.44444,.01597,0,.83055],120:[0,.44444,0,0,.60694],121:[.19444,.44444,.01597,0,.60694],122:[0,.44444,0,0,.51111],123:[.25,.75,0,0,.575],124:[.25,.75,0,0,.31944],125:[.25,.75,0,0,.575],126:[.35,.34444,0,0,.575],168:[0,.69444,0,0,.575],172:[0,.44444,0,0,.76666],176:[0,.69444,0,0,.86944],177:[.13333,.63333,0,0,.89444],184:[.17014,0,0,0,.51111],198:[0,.68611,0,0,1.04166],215:[.13333,.63333,0,0,.89444],216:[.04861,.73472,0,0,.89444],223:[0,.69444,0,0,.59722],230:[0,.44444,0,0,.83055],247:[.13333,.63333,0,0,.89444],248:[.09722,.54167,0,0,.575],305:[0,.44444,0,0,.31944],338:[0,.68611,0,0,1.16944],339:[0,.44444,0,0,.89444],567:[.19444,.44444,0,0,.35139],710:[0,.69444,0,0,.575],711:[0,.63194,0,0,.575],713:[0,.59611,0,0,.575],714:[0,.69444,0,0,.575],715:[0,.69444,0,0,.575],728:[0,.69444,0,0,.575],729:[0,.69444,0,0,.31944],730:[0,.69444,0,0,.86944],732:[0,.69444,0,0,.575],733:[0,.69444,0,0,.575],915:[0,.68611,0,0,.69166],916:[0,.68611,0,0,.95833],920:[0,.68611,0,0,.89444],923:[0,.68611,0,0,.80555],926:[0,.68611,0,0,.76666],928:[0,.68611,0,0,.9],931:[0,.68611,0,0,.83055],933:[0,.68611,0,0,.89444],934:[0,.68611,0,0,.83055],936:[0,.68611,0,0,.89444],937:[0,.68611,0,0,.83055],8211:[0,.44444,.03194,0,.575],8212:[0,.44444,.03194,0,1.14999],8216:[0,.69444,0,0,.31944],8217:[0,.69444,0,0,.31944],8220:[0,.69444,0,0,.60278],8221:[0,.69444,0,0,.60278],8224:[.19444,.69444,0,0,.51111],8225:[.19444,.69444,0,0,.51111],8242:[0,.55556,0,0,.34444],8407:[0,.72444,.15486,0,.575],8463:[0,.69444,0,0,.66759],8465:[0,.69444,0,0,.83055],8467:[0,.69444,0,0,.47361],8472:[.19444,.44444,0,0,.74027],8476:[0,.69444,0,0,.83055],8501:[0,.69444,0,0,.70277],8592:[-.10889,.39111,0,0,1.14999],8593:[.19444,.69444,0,0,.575],8594:[-.10889,.39111,0,0,1.14999],8595:[.19444,.69444,0,0,.575],8596:[-.10889,.39111,0,0,1.14999],8597:[.25,.75,0,0,.575],8598:[.19444,.69444,0,0,1.14999],8599:[.19444,.69444,0,0,1.14999],8600:[.19444,.69444,0,0,1.14999],8601:[.19444,.69444,0,0,1.14999],8636:[-.10889,.39111,0,0,1.14999],8637:[-.10889,.39111,0,0,1.14999],8640:[-.10889,.39111,0,0,1.14999],8641:[-.10889,.39111,0,0,1.14999],8656:[-.10889,.39111,0,0,1.14999],8657:[.19444,.69444,0,0,.70277],8658:[-.10889,.39111,0,0,1.14999],8659:[.19444,.69444,0,0,.70277],8660:[-.10889,.39111,0,0,1.14999],8661:[.25,.75,0,0,.70277],8704:[0,.69444,0,0,.63889],8706:[0,.69444,.06389,0,.62847],8707:[0,.69444,0,0,.63889],8709:[.05556,.75,0,0,.575],8711:[0,.68611,0,0,.95833],8712:[.08556,.58556,0,0,.76666],8715:[.08556,.58556,0,0,.76666],8722:[.13333,.63333,0,0,.89444],8723:[.13333,.63333,0,0,.89444],8725:[.25,.75,0,0,.575],8726:[.25,.75,0,0,.575],8727:[-.02778,.47222,0,0,.575],8728:[-.02639,.47361,0,0,.575],8729:[-.02639,.47361,0,0,.575],8730:[.18,.82,0,0,.95833],8733:[0,.44444,0,0,.89444],8734:[0,.44444,0,0,1.14999],8736:[0,.69224,0,0,.72222],8739:[.25,.75,0,0,.31944],8741:[.25,.75,0,0,.575],8743:[0,.55556,0,0,.76666],8744:[0,.55556,0,0,.76666],8745:[0,.55556,0,0,.76666],8746:[0,.55556,0,0,.76666],8747:[.19444,.69444,.12778,0,.56875],8764:[-.10889,.39111,0,0,.89444],8768:[.19444,.69444,0,0,.31944],8771:[.00222,.50222,0,0,.89444],8776:[.02444,.52444,0,0,.89444],8781:[.00222,.50222,0,0,.89444],8801:[.00222,.50222,0,0,.89444],8804:[.19667,.69667,0,0,.89444],8805:[.19667,.69667,0,0,.89444],8810:[.08556,.58556,0,0,1.14999],8811:[.08556,.58556,0,0,1.14999],8826:[.08556,.58556,0,0,.89444],8827:[.08556,.58556,0,0,.89444],8834:[.08556,.58556,0,0,.89444],8835:[.08556,.58556,0,0,.89444],8838:[.19667,.69667,0,0,.89444],8839:[.19667,.69667,0,0,.89444],8846:[0,.55556,0,0,.76666],8849:[.19667,.69667,0,0,.89444],8850:[.19667,.69667,0,0,.89444],8851:[0,.55556,0,0,.76666],8852:[0,.55556,0,0,.76666],8853:[.13333,.63333,0,0,.89444],8854:[.13333,.63333,0,0,.89444],8855:[.13333,.63333,0,0,.89444],8856:[.13333,.63333,0,0,.89444],8857:[.13333,.63333,0,0,.89444],8866:[0,.69444,0,0,.70277],8867:[0,.69444,0,0,.70277],8868:[0,.69444,0,0,.89444],8869:[0,.69444,0,0,.89444],8900:[-.02639,.47361,0,0,.575],8901:[-.02639,.47361,0,0,.31944],8902:[-.02778,.47222,0,0,.575],8968:[.25,.75,0,0,.51111],8969:[.25,.75,0,0,.51111],8970:[.25,.75,0,0,.51111],8971:[.25,.75,0,0,.51111],8994:[-.13889,.36111,0,0,1.14999],8995:[-.13889,.36111,0,0,1.14999],9651:[.19444,.69444,0,0,1.02222],9657:[-.02778,.47222,0,0,.575],9661:[.19444,.69444,0,0,1.02222],9667:[-.02778,.47222,0,0,.575],9711:[.19444,.69444,0,0,1.14999],9824:[.12963,.69444,0,0,.89444],9825:[.12963,.69444,0,0,.89444],9826:[.12963,.69444,0,0,.89444],9827:[.12963,.69444,0,0,.89444],9837:[0,.75,0,0,.44722],9838:[.19444,.69444,0,0,.44722],9839:[.19444,.69444,0,0,.44722],10216:[.25,.75,0,0,.44722],10217:[.25,.75,0,0,.44722],10815:[0,.68611,0,0,.9],10927:[.19667,.69667,0,0,.89444],10928:[.19667,.69667,0,0,.89444],57376:[.19444,.69444,0,0,0]},"Main-BoldItalic":{33:[0,.69444,.11417,0,.38611],34:[0,.69444,.07939,0,.62055],35:[.19444,.69444,.06833,0,.94444],37:[.05556,.75,.12861,0,.94444],38:[0,.69444,.08528,0,.88555],39:[0,.69444,.12945,0,.35555],40:[.25,.75,.15806,0,.47333],41:[.25,.75,.03306,0,.47333],42:[0,.75,.14333,0,.59111],43:[.10333,.60333,.03306,0,.88555],44:[.19444,.14722,0,0,.35555],45:[0,.44444,.02611,0,.41444],46:[0,.14722,0,0,.35555],47:[.25,.75,.15806,0,.59111],48:[0,.64444,.13167,0,.59111],49:[0,.64444,.13167,0,.59111],50:[0,.64444,.13167,0,.59111],51:[0,.64444,.13167,0,.59111],52:[.19444,.64444,.13167,0,.59111],53:[0,.64444,.13167,0,.59111],54:[0,.64444,.13167,0,.59111],55:[.19444,.64444,.13167,0,.59111],56:[0,.64444,.13167,0,.59111],57:[0,.64444,.13167,0,.59111],58:[0,.44444,.06695,0,.35555],59:[.19444,.44444,.06695,0,.35555],61:[-.10889,.39111,.06833,0,.88555],63:[0,.69444,.11472,0,.59111],64:[0,.69444,.09208,0,.88555],65:[0,.68611,0,0,.86555],66:[0,.68611,.0992,0,.81666],67:[0,.68611,.14208,0,.82666],68:[0,.68611,.09062,0,.87555],69:[0,.68611,.11431,0,.75666],70:[0,.68611,.12903,0,.72722],71:[0,.68611,.07347,0,.89527],72:[0,.68611,.17208,0,.8961],73:[0,.68611,.15681,0,.47166],74:[0,.68611,.145,0,.61055],75:[0,.68611,.14208,0,.89499],76:[0,.68611,0,0,.69777],77:[0,.68611,.17208,0,1.07277],78:[0,.68611,.17208,0,.8961],79:[0,.68611,.09062,0,.85499],80:[0,.68611,.0992,0,.78721],81:[.19444,.68611,.09062,0,.85499],82:[0,.68611,.02559,0,.85944],83:[0,.68611,.11264,0,.64999],84:[0,.68611,.12903,0,.7961],85:[0,.68611,.17208,0,.88083],86:[0,.68611,.18625,0,.86555],87:[0,.68611,.18625,0,1.15999],88:[0,.68611,.15681,0,.86555],89:[0,.68611,.19803,0,.86555],90:[0,.68611,.14208,0,.70888],91:[.25,.75,.1875,0,.35611],93:[.25,.75,.09972,0,.35611],94:[0,.69444,.06709,0,.59111],95:[.31,.13444,.09811,0,.59111],97:[0,.44444,.09426,0,.59111],98:[0,.69444,.07861,0,.53222],99:[0,.44444,.05222,0,.53222],100:[0,.69444,.10861,0,.59111],101:[0,.44444,.085,0,.53222],102:[.19444,.69444,.21778,0,.4],103:[.19444,.44444,.105,0,.53222],104:[0,.69444,.09426,0,.59111],105:[0,.69326,.11387,0,.35555],106:[.19444,.69326,.1672,0,.35555],107:[0,.69444,.11111,0,.53222],108:[0,.69444,.10861,0,.29666],109:[0,.44444,.09426,0,.94444],110:[0,.44444,.09426,0,.64999],111:[0,.44444,.07861,0,.59111],112:[.19444,.44444,.07861,0,.59111],113:[.19444,.44444,.105,0,.53222],114:[0,.44444,.11111,0,.50167],115:[0,.44444,.08167,0,.48694],116:[0,.63492,.09639,0,.385],117:[0,.44444,.09426,0,.62055],118:[0,.44444,.11111,0,.53222],119:[0,.44444,.11111,0,.76777],120:[0,.44444,.12583,0,.56055],121:[.19444,.44444,.105,0,.56166],122:[0,.44444,.13889,0,.49055],126:[.35,.34444,.11472,0,.59111],163:[0,.69444,0,0,.86853],168:[0,.69444,.11473,0,.59111],176:[0,.69444,0,0,.94888],184:[.17014,0,0,0,.53222],198:[0,.68611,.11431,0,1.02277],216:[.04861,.73472,.09062,0,.88555],223:[.19444,.69444,.09736,0,.665],230:[0,.44444,.085,0,.82666],248:[.09722,.54167,.09458,0,.59111],305:[0,.44444,.09426,0,.35555],338:[0,.68611,.11431,0,1.14054],339:[0,.44444,.085,0,.82666],567:[.19444,.44444,.04611,0,.385],710:[0,.69444,.06709,0,.59111],711:[0,.63194,.08271,0,.59111],713:[0,.59444,.10444,0,.59111],714:[0,.69444,.08528,0,.59111],715:[0,.69444,0,0,.59111],728:[0,.69444,.10333,0,.59111],729:[0,.69444,.12945,0,.35555],730:[0,.69444,0,0,.94888],732:[0,.69444,.11472,0,.59111],733:[0,.69444,.11472,0,.59111],915:[0,.68611,.12903,0,.69777],916:[0,.68611,0,0,.94444],920:[0,.68611,.09062,0,.88555],923:[0,.68611,0,0,.80666],926:[0,.68611,.15092,0,.76777],928:[0,.68611,.17208,0,.8961],931:[0,.68611,.11431,0,.82666],933:[0,.68611,.10778,0,.88555],934:[0,.68611,.05632,0,.82666],936:[0,.68611,.10778,0,.88555],937:[0,.68611,.0992,0,.82666],8211:[0,.44444,.09811,0,.59111],8212:[0,.44444,.09811,0,1.18221],8216:[0,.69444,.12945,0,.35555],8217:[0,.69444,.12945,0,.35555],8220:[0,.69444,.16772,0,.62055],8221:[0,.69444,.07939,0,.62055]},"Main-Italic":{33:[0,.69444,.12417,0,.30667],34:[0,.69444,.06961,0,.51444],35:[.19444,.69444,.06616,0,.81777],37:[.05556,.75,.13639,0,.81777],38:[0,.69444,.09694,0,.76666],39:[0,.69444,.12417,0,.30667],40:[.25,.75,.16194,0,.40889],41:[.25,.75,.03694,0,.40889],42:[0,.75,.14917,0,.51111],43:[.05667,.56167,.03694,0,.76666],44:[.19444,.10556,0,0,.30667],45:[0,.43056,.02826,0,.35778],46:[0,.10556,0,0,.30667],47:[.25,.75,.16194,0,.51111],48:[0,.64444,.13556,0,.51111],49:[0,.64444,.13556,0,.51111],50:[0,.64444,.13556,0,.51111],51:[0,.64444,.13556,0,.51111],52:[.19444,.64444,.13556,0,.51111],53:[0,.64444,.13556,0,.51111],54:[0,.64444,.13556,0,.51111],55:[.19444,.64444,.13556,0,.51111],56:[0,.64444,.13556,0,.51111],57:[0,.64444,.13556,0,.51111],58:[0,.43056,.0582,0,.30667],59:[.19444,.43056,.0582,0,.30667],61:[-.13313,.36687,.06616,0,.76666],63:[0,.69444,.1225,0,.51111],64:[0,.69444,.09597,0,.76666],65:[0,.68333,0,0,.74333],66:[0,.68333,.10257,0,.70389],67:[0,.68333,.14528,0,.71555],68:[0,.68333,.09403,0,.755],69:[0,.68333,.12028,0,.67833],70:[0,.68333,.13305,0,.65277],71:[0,.68333,.08722,0,.77361],72:[0,.68333,.16389,0,.74333],73:[0,.68333,.15806,0,.38555],74:[0,.68333,.14028,0,.525],75:[0,.68333,.14528,0,.76888],76:[0,.68333,0,0,.62722],77:[0,.68333,.16389,0,.89666],78:[0,.68333,.16389,0,.74333],79:[0,.68333,.09403,0,.76666],80:[0,.68333,.10257,0,.67833],81:[.19444,.68333,.09403,0,.76666],82:[0,.68333,.03868,0,.72944],83:[0,.68333,.11972,0,.56222],84:[0,.68333,.13305,0,.71555],85:[0,.68333,.16389,0,.74333],86:[0,.68333,.18361,0,.74333],87:[0,.68333,.18361,0,.99888],88:[0,.68333,.15806,0,.74333],89:[0,.68333,.19383,0,.74333],90:[0,.68333,.14528,0,.61333],91:[.25,.75,.1875,0,.30667],93:[.25,.75,.10528,0,.30667],94:[0,.69444,.06646,0,.51111],95:[.31,.12056,.09208,0,.51111],97:[0,.43056,.07671,0,.51111],98:[0,.69444,.06312,0,.46],99:[0,.43056,.05653,0,.46],100:[0,.69444,.10333,0,.51111],101:[0,.43056,.07514,0,.46],102:[.19444,.69444,.21194,0,.30667],103:[.19444,.43056,.08847,0,.46],104:[0,.69444,.07671,0,.51111],105:[0,.65536,.1019,0,.30667],106:[.19444,.65536,.14467,0,.30667],107:[0,.69444,.10764,0,.46],108:[0,.69444,.10333,0,.25555],109:[0,.43056,.07671,0,.81777],110:[0,.43056,.07671,0,.56222],111:[0,.43056,.06312,0,.51111],112:[.19444,.43056,.06312,0,.51111],113:[.19444,.43056,.08847,0,.46],114:[0,.43056,.10764,0,.42166],115:[0,.43056,.08208,0,.40889],116:[0,.61508,.09486,0,.33222],117:[0,.43056,.07671,0,.53666],118:[0,.43056,.10764,0,.46],119:[0,.43056,.10764,0,.66444],120:[0,.43056,.12042,0,.46389],121:[.19444,.43056,.08847,0,.48555],122:[0,.43056,.12292,0,.40889],126:[.35,.31786,.11585,0,.51111],163:[0,.69444,0,0,.76909],168:[0,.66786,.10474,0,.51111],176:[0,.69444,0,0,.83129],184:[.17014,0,0,0,.46],198:[0,.68333,.12028,0,.88277],216:[.04861,.73194,.09403,0,.76666],223:[.19444,.69444,.10514,0,.53666],230:[0,.43056,.07514,0,.71555],248:[.09722,.52778,.09194,0,.51111],305:[0,.43056,0,.02778,.32246],338:[0,.68333,.12028,0,.98499],339:[0,.43056,.07514,0,.71555],567:[.19444,.43056,0,.08334,.38403],710:[0,.69444,.06646,0,.51111],711:[0,.62847,.08295,0,.51111],713:[0,.56167,.10333,0,.51111],714:[0,.69444,.09694,0,.51111],715:[0,.69444,0,0,.51111],728:[0,.69444,.10806,0,.51111],729:[0,.66786,.11752,0,.30667],730:[0,.69444,0,0,.83129],732:[0,.66786,.11585,0,.51111],733:[0,.69444,.1225,0,.51111],915:[0,.68333,.13305,0,.62722],916:[0,.68333,0,0,.81777],920:[0,.68333,.09403,0,.76666],923:[0,.68333,0,0,.69222],926:[0,.68333,.15294,0,.66444],928:[0,.68333,.16389,0,.74333],931:[0,.68333,.12028,0,.71555],933:[0,.68333,.11111,0,.76666],934:[0,.68333,.05986,0,.71555],936:[0,.68333,.11111,0,.76666],937:[0,.68333,.10257,0,.71555],8211:[0,.43056,.09208,0,.51111],8212:[0,.43056,.09208,0,1.02222],8216:[0,.69444,.12417,0,.30667],8217:[0,.69444,.12417,0,.30667],8220:[0,.69444,.1685,0,.51444],8221:[0,.69444,.06961,0,.51444],8463:[0,.68889,0,0,.54028]},"Main-Regular":{32:[0,0,0,0,.25],33:[0,.69444,0,0,.27778],34:[0,.69444,0,0,.5],35:[.19444,.69444,0,0,.83334],36:[.05556,.75,0,0,.5],37:[.05556,.75,0,0,.83334],38:[0,.69444,0,0,.77778],39:[0,.69444,0,0,.27778],40:[.25,.75,0,0,.38889],41:[.25,.75,0,0,.38889],42:[0,.75,0,0,.5],43:[.08333,.58333,0,0,.77778],44:[.19444,.10556,0,0,.27778],45:[0,.43056,0,0,.33333],46:[0,.10556,0,0,.27778],47:[.25,.75,0,0,.5],48:[0,.64444,0,0,.5],49:[0,.64444,0,0,.5],50:[0,.64444,0,0,.5],51:[0,.64444,0,0,.5],52:[0,.64444,0,0,.5],53:[0,.64444,0,0,.5],54:[0,.64444,0,0,.5],55:[0,.64444,0,0,.5],56:[0,.64444,0,0,.5],57:[0,.64444,0,0,.5],58:[0,.43056,0,0,.27778],59:[.19444,.43056,0,0,.27778],60:[.0391,.5391,0,0,.77778],61:[-.13313,.36687,0,0,.77778],62:[.0391,.5391,0,0,.77778],63:[0,.69444,0,0,.47222],64:[0,.69444,0,0,.77778],65:[0,.68333,0,0,.75],66:[0,.68333,0,0,.70834],67:[0,.68333,0,0,.72222],68:[0,.68333,0,0,.76389],69:[0,.68333,0,0,.68056],70:[0,.68333,0,0,.65278],71:[0,.68333,0,0,.78472],72:[0,.68333,0,0,.75],73:[0,.68333,0,0,.36111],74:[0,.68333,0,0,.51389],75:[0,.68333,0,0,.77778],76:[0,.68333,0,0,.625],77:[0,.68333,0,0,.91667],78:[0,.68333,0,0,.75],79:[0,.68333,0,0,.77778],80:[0,.68333,0,0,.68056],81:[.19444,.68333,0,0,.77778],82:[0,.68333,0,0,.73611],83:[0,.68333,0,0,.55556],84:[0,.68333,0,0,.72222],85:[0,.68333,0,0,.75],86:[0,.68333,.01389,0,.75],87:[0,.68333,.01389,0,1.02778],88:[0,.68333,0,0,.75],89:[0,.68333,.025,0,.75],90:[0,.68333,0,0,.61111],91:[.25,.75,0,0,.27778],92:[.25,.75,0,0,.5],93:[.25,.75,0,0,.27778],94:[0,.69444,0,0,.5],95:[.31,.12056,.02778,0,.5],97:[0,.43056,0,0,.5],98:[0,.69444,0,0,.55556],99:[0,.43056,0,0,.44445],100:[0,.69444,0,0,.55556],101:[0,.43056,0,0,.44445],102:[0,.69444,.07778,0,.30556],103:[.19444,.43056,.01389,0,.5],104:[0,.69444,0,0,.55556],105:[0,.66786,0,0,.27778],106:[.19444,.66786,0,0,.30556],107:[0,.69444,0,0,.52778],108:[0,.69444,0,0,.27778],109:[0,.43056,0,0,.83334],110:[0,.43056,0,0,.55556],111:[0,.43056,0,0,.5],112:[.19444,.43056,0,0,.55556],113:[.19444,.43056,0,0,.52778],114:[0,.43056,0,0,.39167],115:[0,.43056,0,0,.39445],116:[0,.61508,0,0,.38889],117:[0,.43056,0,0,.55556],118:[0,.43056,.01389,0,.52778],119:[0,.43056,.01389,0,.72222],120:[0,.43056,0,0,.52778],121:[.19444,.43056,.01389,0,.52778],122:[0,.43056,0,0,.44445],123:[.25,.75,0,0,.5],124:[.25,.75,0,0,.27778],125:[.25,.75,0,0,.5],126:[.35,.31786,0,0,.5],160:[0,0,0,0,.25],167:[.19444,.69444,0,0,.44445],168:[0,.66786,0,0,.5],172:[0,.43056,0,0,.66667],176:[0,.69444,0,0,.75],177:[.08333,.58333,0,0,.77778],182:[.19444,.69444,0,0,.61111],184:[.17014,0,0,0,.44445],198:[0,.68333,0,0,.90278],215:[.08333,.58333,0,0,.77778],216:[.04861,.73194,0,0,.77778],223:[0,.69444,0,0,.5],230:[0,.43056,0,0,.72222],247:[.08333,.58333,0,0,.77778],248:[.09722,.52778,0,0,.5],305:[0,.43056,0,0,.27778],338:[0,.68333,0,0,1.01389],339:[0,.43056,0,0,.77778],567:[.19444,.43056,0,0,.30556],710:[0,.69444,0,0,.5],711:[0,.62847,0,0,.5],713:[0,.56778,0,0,.5],714:[0,.69444,0,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,0,0,.5],729:[0,.66786,0,0,.27778],730:[0,.69444,0,0,.75],732:[0,.66786,0,0,.5],733:[0,.69444,0,0,.5],915:[0,.68333,0,0,.625],916:[0,.68333,0,0,.83334],920:[0,.68333,0,0,.77778],923:[0,.68333,0,0,.69445],926:[0,.68333,0,0,.66667],928:[0,.68333,0,0,.75],931:[0,.68333,0,0,.72222],933:[0,.68333,0,0,.77778],934:[0,.68333,0,0,.72222],936:[0,.68333,0,0,.77778],937:[0,.68333,0,0,.72222],8211:[0,.43056,.02778,0,.5],8212:[0,.43056,.02778,0,1],8216:[0,.69444,0,0,.27778],8217:[0,.69444,0,0,.27778],8220:[0,.69444,0,0,.5],8221:[0,.69444,0,0,.5],8224:[.19444,.69444,0,0,.44445],8225:[.19444,.69444,0,0,.44445],8230:[0,.12,0,0,1.172],8242:[0,.55556,0,0,.275],8407:[0,.71444,.15382,0,.5],8463:[0,.68889,0,0,.54028],8465:[0,.69444,0,0,.72222],8467:[0,.69444,0,.11111,.41667],8472:[.19444,.43056,0,.11111,.63646],8476:[0,.69444,0,0,.72222],8501:[0,.69444,0,0,.61111],8592:[-.13313,.36687,0,0,1],8593:[.19444,.69444,0,0,.5],8594:[-.13313,.36687,0,0,1],8595:[.19444,.69444,0,0,.5],8596:[-.13313,.36687,0,0,1],8597:[.25,.75,0,0,.5],8598:[.19444,.69444,0,0,1],8599:[.19444,.69444,0,0,1],8600:[.19444,.69444,0,0,1],8601:[.19444,.69444,0,0,1],8614:[.011,.511,0,0,1],8617:[.011,.511,0,0,1.126],8618:[.011,.511,0,0,1.126],8636:[-.13313,.36687,0,0,1],8637:[-.13313,.36687,0,0,1],8640:[-.13313,.36687,0,0,1],8641:[-.13313,.36687,0,0,1],8652:[.011,.671,0,0,1],8656:[-.13313,.36687,0,0,1],8657:[.19444,.69444,0,0,.61111],8658:[-.13313,.36687,0,0,1],8659:[.19444,.69444,0,0,.61111],8660:[-.13313,.36687,0,0,1],8661:[.25,.75,0,0,.61111],8704:[0,.69444,0,0,.55556],8706:[0,.69444,.05556,.08334,.5309],8707:[0,.69444,0,0,.55556],8709:[.05556,.75,0,0,.5],8711:[0,.68333,0,0,.83334],8712:[.0391,.5391,0,0,.66667],8715:[.0391,.5391,0,0,.66667],8722:[.08333,.58333,0,0,.77778],8723:[.08333,.58333,0,0,.77778],8725:[.25,.75,0,0,.5],8726:[.25,.75,0,0,.5],8727:[-.03472,.46528,0,0,.5],8728:[-.05555,.44445,0,0,.5],8729:[-.05555,.44445,0,0,.5],8730:[.2,.8,0,0,.83334],8733:[0,.43056,0,0,.77778],8734:[0,.43056,0,0,1],8736:[0,.69224,0,0,.72222],8739:[.25,.75,0,0,.27778],8741:[.25,.75,0,0,.5],8743:[0,.55556,0,0,.66667],8744:[0,.55556,0,0,.66667],8745:[0,.55556,0,0,.66667],8746:[0,.55556,0,0,.66667],8747:[.19444,.69444,.11111,0,.41667],8764:[-.13313,.36687,0,0,.77778],8768:[.19444,.69444,0,0,.27778],8771:[-.03625,.46375,0,0,.77778],8773:[-.022,.589,0,0,1],8776:[-.01688,.48312,0,0,.77778],8781:[-.03625,.46375,0,0,.77778],8784:[-.133,.67,0,0,.778],8801:[-.03625,.46375,0,0,.77778],8804:[.13597,.63597,0,0,.77778],8805:[.13597,.63597,0,0,.77778],8810:[.0391,.5391,0,0,1],8811:[.0391,.5391,0,0,1],8826:[.0391,.5391,0,0,.77778],8827:[.0391,.5391,0,0,.77778],8834:[.0391,.5391,0,0,.77778],8835:[.0391,.5391,0,0,.77778],8838:[.13597,.63597,0,0,.77778],8839:[.13597,.63597,0,0,.77778],8846:[0,.55556,0,0,.66667],8849:[.13597,.63597,0,0,.77778],8850:[.13597,.63597,0,0,.77778],8851:[0,.55556,0,0,.66667],8852:[0,.55556,0,0,.66667],8853:[.08333,.58333,0,0,.77778],8854:[.08333,.58333,0,0,.77778],8855:[.08333,.58333,0,0,.77778],8856:[.08333,.58333,0,0,.77778],8857:[.08333,.58333,0,0,.77778],8866:[0,.69444,0,0,.61111],8867:[0,.69444,0,0,.61111],8868:[0,.69444,0,0,.77778],8869:[0,.69444,0,0,.77778],8872:[.249,.75,0,0,.867],8900:[-.05555,.44445,0,0,.5],8901:[-.05555,.44445,0,0,.27778],8902:[-.03472,.46528,0,0,.5],8904:[.005,.505,0,0,.9],8942:[.03,.9,0,0,.278],8943:[-.19,.31,0,0,1.172],8945:[-.1,.82,0,0,1.282],8968:[.25,.75,0,0,.44445],8969:[.25,.75,0,0,.44445],8970:[.25,.75,0,0,.44445],8971:[.25,.75,0,0,.44445],8994:[-.14236,.35764,0,0,1],8995:[-.14236,.35764,0,0,1],9136:[.244,.744,0,0,.412],9137:[.244,.744,0,0,.412],9651:[.19444,.69444,0,0,.88889],9657:[-.03472,.46528,0,0,.5],9661:[.19444,.69444,0,0,.88889],9667:[-.03472,.46528,0,0,.5],9711:[.19444,.69444,0,0,1],9824:[.12963,.69444,0,0,.77778],9825:[.12963,.69444,0,0,.77778],9826:[.12963,.69444,0,0,.77778],9827:[.12963,.69444,0,0,.77778],9837:[0,.75,0,0,.38889],9838:[.19444,.69444,0,0,.38889],9839:[.19444,.69444,0,0,.38889],10216:[.25,.75,0,0,.38889],10217:[.25,.75,0,0,.38889],10222:[.244,.744,0,0,.412],10223:[.244,.744,0,0,.412],10229:[.011,.511,0,0,1.609],10230:[.011,.511,0,0,1.638],10231:[.011,.511,0,0,1.859],10232:[.024,.525,0,0,1.609],10233:[.024,.525,0,0,1.638],10234:[.024,.525,0,0,1.858],10236:[.011,.511,0,0,1.638],10815:[0,.68333,0,0,.75],10927:[.13597,.63597,0,0,.77778],10928:[.13597,.63597,0,0,.77778],57376:[.19444,.69444,0,0,0]},"Math-BoldItalic":{65:[0,.68611,0,0,.86944],66:[0,.68611,.04835,0,.8664],67:[0,.68611,.06979,0,.81694],68:[0,.68611,.03194,0,.93812],69:[0,.68611,.05451,0,.81007],70:[0,.68611,.15972,0,.68889],71:[0,.68611,0,0,.88673],72:[0,.68611,.08229,0,.98229],73:[0,.68611,.07778,0,.51111],74:[0,.68611,.10069,0,.63125],75:[0,.68611,.06979,0,.97118],76:[0,.68611,0,0,.75555],77:[0,.68611,.11424,0,1.14201],78:[0,.68611,.11424,0,.95034],79:[0,.68611,.03194,0,.83666],80:[0,.68611,.15972,0,.72309],81:[.19444,.68611,0,0,.86861],82:[0,.68611,.00421,0,.87235],83:[0,.68611,.05382,0,.69271],84:[0,.68611,.15972,0,.63663],85:[0,.68611,.11424,0,.80027],86:[0,.68611,.25555,0,.67778],87:[0,.68611,.15972,0,1.09305],88:[0,.68611,.07778,0,.94722],89:[0,.68611,.25555,0,.67458],90:[0,.68611,.06979,0,.77257],97:[0,.44444,0,0,.63287],98:[0,.69444,0,0,.52083],99:[0,.44444,0,0,.51342],100:[0,.69444,0,0,.60972],101:[0,.44444,0,0,.55361],102:[.19444,.69444,.11042,0,.56806],103:[.19444,.44444,.03704,0,.5449],104:[0,.69444,0,0,.66759],105:[0,.69326,0,0,.4048],106:[.19444,.69326,.0622,0,.47083],107:[0,.69444,.01852,0,.6037],108:[0,.69444,.0088,0,.34815],109:[0,.44444,0,0,1.0324],110:[0,.44444,0,0,.71296],111:[0,.44444,0,0,.58472],112:[.19444,.44444,0,0,.60092],113:[.19444,.44444,.03704,0,.54213],114:[0,.44444,.03194,0,.5287],115:[0,.44444,0,0,.53125],116:[0,.63492,0,0,.41528],117:[0,.44444,0,0,.68102],118:[0,.44444,.03704,0,.56666],119:[0,.44444,.02778,0,.83148],120:[0,.44444,0,0,.65903],121:[.19444,.44444,.03704,0,.59028],122:[0,.44444,.04213,0,.55509],915:[0,.68611,.15972,0,.65694],916:[0,.68611,0,0,.95833],920:[0,.68611,.03194,0,.86722],923:[0,.68611,0,0,.80555],926:[0,.68611,.07458,0,.84125],928:[0,.68611,.08229,0,.98229],931:[0,.68611,.05451,0,.88507],933:[0,.68611,.15972,0,.67083],934:[0,.68611,0,0,.76666],936:[0,.68611,.11653,0,.71402],937:[0,.68611,.04835,0,.8789],945:[0,.44444,0,0,.76064],946:[.19444,.69444,.03403,0,.65972],947:[.19444,.44444,.06389,0,.59003],948:[0,.69444,.03819,0,.52222],949:[0,.44444,0,0,.52882],950:[.19444,.69444,.06215,0,.50833],951:[.19444,.44444,.03704,0,.6],952:[0,.69444,.03194,0,.5618],953:[0,.44444,0,0,.41204],954:[0,.44444,0,0,.66759],955:[0,.69444,0,0,.67083],956:[.19444,.44444,0,0,.70787],957:[0,.44444,.06898,0,.57685],958:[.19444,.69444,.03021,0,.50833],959:[0,.44444,0,0,.58472],960:[0,.44444,.03704,0,.68241],961:[.19444,.44444,0,0,.6118],962:[.09722,.44444,.07917,0,.42361],963:[0,.44444,.03704,0,.68588],964:[0,.44444,.13472,0,.52083],965:[0,.44444,.03704,0,.63055],966:[.19444,.44444,0,0,.74722],967:[.19444,.44444,0,0,.71805],968:[.19444,.69444,.03704,0,.75833],969:[0,.44444,.03704,0,.71782],977:[0,.69444,0,0,.69155],981:[.19444,.69444,0,0,.7125],982:[0,.44444,.03194,0,.975],1009:[.19444,.44444,0,0,.6118],1013:[0,.44444,0,0,.48333]},"Math-Italic":{65:[0,.68333,0,.13889,.75],66:[0,.68333,.05017,.08334,.75851],67:[0,.68333,.07153,.08334,.71472],68:[0,.68333,.02778,.05556,.82792],69:[0,.68333,.05764,.08334,.7382],70:[0,.68333,.13889,.08334,.64306],71:[0,.68333,0,.08334,.78625],72:[0,.68333,.08125,.05556,.83125],73:[0,.68333,.07847,.11111,.43958],74:[0,.68333,.09618,.16667,.55451],75:[0,.68333,.07153,.05556,.84931],76:[0,.68333,0,.02778,.68056],77:[0,.68333,.10903,.08334,.97014],78:[0,.68333,.10903,.08334,.80347],79:[0,.68333,.02778,.08334,.76278],80:[0,.68333,.13889,.08334,.64201],81:[.19444,.68333,0,.08334,.79056],82:[0,.68333,.00773,.08334,.75929],83:[0,.68333,.05764,.08334,.6132],84:[0,.68333,.13889,.08334,.58438],85:[0,.68333,.10903,.02778,.68278],86:[0,.68333,.22222,0,.58333],87:[0,.68333,.13889,0,.94445],88:[0,.68333,.07847,.08334,.82847],89:[0,.68333,.22222,0,.58056],90:[0,.68333,.07153,.08334,.68264],97:[0,.43056,0,0,.52859],98:[0,.69444,0,0,.42917],99:[0,.43056,0,.05556,.43276],100:[0,.69444,0,.16667,.52049],101:[0,.43056,0,.05556,.46563],102:[.19444,.69444,.10764,.16667,.48959],103:[.19444,.43056,.03588,.02778,.47697],104:[0,.69444,0,0,.57616],105:[0,.65952,0,0,.34451],106:[.19444,.65952,.05724,0,.41181],107:[0,.69444,.03148,0,.5206],108:[0,.69444,.01968,.08334,.29838],109:[0,.43056,0,0,.87801],110:[0,.43056,0,0,.60023],111:[0,.43056,0,.05556,.48472],112:[.19444,.43056,0,.08334,.50313],113:[.19444,.43056,.03588,.08334,.44641],114:[0,.43056,.02778,.05556,.45116],115:[0,.43056,0,.05556,.46875],116:[0,.61508,0,.08334,.36111],117:[0,.43056,0,.02778,.57246],118:[0,.43056,.03588,.02778,.48472],119:[0,.43056,.02691,.08334,.71592],120:[0,.43056,0,.02778,.57153],121:[.19444,.43056,.03588,.05556,.49028],122:[0,.43056,.04398,.05556,.46505],915:[0,.68333,.13889,.08334,.61528],916:[0,.68333,0,.16667,.83334],920:[0,.68333,.02778,.08334,.76278],923:[0,.68333,0,.16667,.69445],926:[0,.68333,.07569,.08334,.74236],928:[0,.68333,.08125,.05556,.83125],931:[0,.68333,.05764,.08334,.77986],933:[0,.68333,.13889,.05556,.58333],934:[0,.68333,0,.08334,.66667],936:[0,.68333,.11,.05556,.61222],937:[0,.68333,.05017,.08334,.7724],945:[0,.43056,.0037,.02778,.6397],946:[.19444,.69444,.05278,.08334,.56563],947:[.19444,.43056,.05556,0,.51773],948:[0,.69444,.03785,.05556,.44444],949:[0,.43056,0,.08334,.46632],950:[.19444,.69444,.07378,.08334,.4375],951:[.19444,.43056,.03588,.05556,.49653],952:[0,.69444,.02778,.08334,.46944],953:[0,.43056,0,.05556,.35394],954:[0,.43056,0,0,.57616],955:[0,.69444,0,0,.58334],956:[.19444,.43056,0,.02778,.60255],957:[0,.43056,.06366,.02778,.49398],958:[.19444,.69444,.04601,.11111,.4375],959:[0,.43056,0,.05556,.48472],960:[0,.43056,.03588,0,.57003],961:[.19444,.43056,0,.08334,.51702],962:[.09722,.43056,.07986,.08334,.36285],963:[0,.43056,.03588,0,.57141],964:[0,.43056,.1132,.02778,.43715],965:[0,.43056,.03588,.02778,.54028],966:[.19444,.43056,0,.08334,.65417],967:[.19444,.43056,0,.05556,.62569],968:[.19444,.69444,.03588,.11111,.65139],969:[0,.43056,.03588,0,.62245],977:[0,.69444,0,.08334,.59144],981:[.19444,.69444,0,.08334,.59583],982:[0,.43056,.02778,0,.82813],1009:[.19444,.43056,0,.08334,.51702],1013:[0,.43056,0,.05556,.4059]},"Math-Regular":{65:[0,.68333,0,.13889,.75],66:[0,.68333,.05017,.08334,.75851],67:[0,.68333,.07153,.08334,.71472],68:[0,.68333,.02778,.05556,.82792],69:[0,.68333,.05764,.08334,.7382],70:[0,.68333,.13889,.08334,.64306],71:[0,.68333,0,.08334,.78625],72:[0,.68333,.08125,.05556,.83125],73:[0,.68333,.07847,.11111,.43958],74:[0,.68333,.09618,.16667,.55451],75:[0,.68333,.07153,.05556,.84931],76:[0,.68333,0,.02778,.68056],77:[0,.68333,.10903,.08334,.97014],78:[0,.68333,.10903,.08334,.80347],79:[0,.68333,.02778,.08334,.76278],80:[0,.68333,.13889,.08334,.64201],81:[.19444,.68333,0,.08334,.79056],82:[0,.68333,.00773,.08334,.75929],83:[0,.68333,.05764,.08334,.6132],84:[0,.68333,.13889,.08334,.58438],85:[0,.68333,.10903,.02778,.68278],86:[0,.68333,.22222,0,.58333],87:[0,.68333,.13889,0,.94445],88:[0,.68333,.07847,.08334,.82847],89:[0,.68333,.22222,0,.58056],90:[0,.68333,.07153,.08334,.68264],97:[0,.43056,0,0,.52859],98:[0,.69444,0,0,.42917],99:[0,.43056,0,.05556,.43276],100:[0,.69444,0,.16667,.52049],101:[0,.43056,0,.05556,.46563],102:[.19444,.69444,.10764,.16667,.48959],103:[.19444,.43056,.03588,.02778,.47697],104:[0,.69444,0,0,.57616],105:[0,.65952,0,0,.34451],106:[.19444,.65952,.05724,0,.41181],107:[0,.69444,.03148,0,.5206],108:[0,.69444,.01968,.08334,.29838],109:[0,.43056,0,0,.87801],110:[0,.43056,0,0,.60023],111:[0,.43056,0,.05556,.48472],112:[.19444,.43056,0,.08334,.50313],113:[.19444,.43056,.03588,.08334,.44641],114:[0,.43056,.02778,.05556,.45116],115:[0,.43056,0,.05556,.46875],116:[0,.61508,0,.08334,.36111],117:[0,.43056,0,.02778,.57246],118:[0,.43056,.03588,.02778,.48472],119:[0,.43056,.02691,.08334,.71592],120:[0,.43056,0,.02778,.57153],121:[.19444,.43056,.03588,.05556,.49028],122:[0,.43056,.04398,.05556,.46505],915:[0,.68333,.13889,.08334,.61528],916:[0,.68333,0,.16667,.83334],920:[0,.68333,.02778,.08334,.76278],923:[0,.68333,0,.16667,.69445],926:[0,.68333,.07569,.08334,.74236],928:[0,.68333,.08125,.05556,.83125],931:[0,.68333,.05764,.08334,.77986],933:[0,.68333,.13889,.05556,.58333],934:[0,.68333,0,.08334,.66667],936:[0,.68333,.11,.05556,.61222],937:[0,.68333,.05017,.08334,.7724],945:[0,.43056,.0037,.02778,.6397],946:[.19444,.69444,.05278,.08334,.56563],947:[.19444,.43056,.05556,0,.51773],948:[0,.69444,.03785,.05556,.44444],949:[0,.43056,0,.08334,.46632],950:[.19444,.69444,.07378,.08334,.4375],951:[.19444,.43056,.03588,.05556,.49653],952:[0,.69444,.02778,.08334,.46944],953:[0,.43056,0,.05556,.35394],954:[0,.43056,0,0,.57616],955:[0,.69444,0,0,.58334],956:[.19444,.43056,0,.02778,.60255],957:[0,.43056,.06366,.02778,.49398],958:[.19444,.69444,.04601,.11111,.4375],959:[0,.43056,0,.05556,.48472],960:[0,.43056,.03588,0,.57003],961:[.19444,.43056,0,.08334,.51702],962:[.09722,.43056,.07986,.08334,.36285],963:[0,.43056,.03588,0,.57141],964:[0,.43056,.1132,.02778,.43715],965:[0,.43056,.03588,.02778,.54028],966:[.19444,.43056,0,.08334,.65417],967:[.19444,.43056,0,.05556,.62569],968:[.19444,.69444,.03588,.11111,.65139],969:[0,.43056,.03588,0,.62245],977:[0,.69444,0,.08334,.59144],981:[.19444,.69444,0,.08334,.59583],982:[0,.43056,.02778,0,.82813],1009:[.19444,.43056,0,.08334,.51702],1013:[0,.43056,0,.05556,.4059]},"SansSerif-Bold":{33:[0,.69444,0,0,.36667],34:[0,.69444,0,0,.55834],35:[.19444,.69444,0,0,.91667],36:[.05556,.75,0,0,.55],37:[.05556,.75,0,0,1.02912],38:[0,.69444,0,0,.83056],39:[0,.69444,0,0,.30556],40:[.25,.75,0,0,.42778],41:[.25,.75,0,0,.42778],42:[0,.75,0,0,.55],43:[.11667,.61667,0,0,.85556],44:[.10556,.13056,0,0,.30556],45:[0,.45833,0,0,.36667],46:[0,.13056,0,0,.30556],47:[.25,.75,0,0,.55],48:[0,.69444,0,0,.55],49:[0,.69444,0,0,.55],50:[0,.69444,0,0,.55],51:[0,.69444,0,0,.55],52:[0,.69444,0,0,.55],53:[0,.69444,0,0,.55],54:[0,.69444,0,0,.55],55:[0,.69444,0,0,.55],56:[0,.69444,0,0,.55],57:[0,.69444,0,0,.55],58:[0,.45833,0,0,.30556],59:[.10556,.45833,0,0,.30556],61:[-.09375,.40625,0,0,.85556],63:[0,.69444,0,0,.51945],64:[0,.69444,0,0,.73334],65:[0,.69444,0,0,.73334],66:[0,.69444,0,0,.73334],67:[0,.69444,0,0,.70278],68:[0,.69444,0,0,.79445],69:[0,.69444,0,0,.64167],70:[0,.69444,0,0,.61111],71:[0,.69444,0,0,.73334],72:[0,.69444,0,0,.79445],73:[0,.69444,0,0,.33056],74:[0,.69444,0,0,.51945],75:[0,.69444,0,0,.76389],76:[0,.69444,0,0,.58056],77:[0,.69444,0,0,.97778],78:[0,.69444,0,0,.79445],79:[0,.69444,0,0,.79445],80:[0,.69444,0,0,.70278],81:[.10556,.69444,0,0,.79445],82:[0,.69444,0,0,.70278],83:[0,.69444,0,0,.61111],84:[0,.69444,0,0,.73334],85:[0,.69444,0,0,.76389],86:[0,.69444,.01528,0,.73334],87:[0,.69444,.01528,0,1.03889],88:[0,.69444,0,0,.73334],89:[0,.69444,.0275,0,.73334],90:[0,.69444,0,0,.67223],91:[.25,.75,0,0,.34306],93:[.25,.75,0,0,.34306],94:[0,.69444,0,0,.55],95:[.35,.10833,.03056,0,.55],97:[0,.45833,0,0,.525],98:[0,.69444,0,0,.56111],99:[0,.45833,0,0,.48889],100:[0,.69444,0,0,.56111],101:[0,.45833,0,0,.51111],102:[0,.69444,.07639,0,.33611],103:[.19444,.45833,.01528,0,.55],104:[0,.69444,0,0,.56111],105:[0,.69444,0,0,.25556],106:[.19444,.69444,0,0,.28611],107:[0,.69444,0,0,.53056],108:[0,.69444,0,0,.25556],109:[0,.45833,0,0,.86667],110:[0,.45833,0,0,.56111],111:[0,.45833,0,0,.55],112:[.19444,.45833,0,0,.56111],113:[.19444,.45833,0,0,.56111],114:[0,.45833,.01528,0,.37222],115:[0,.45833,0,0,.42167],116:[0,.58929,0,0,.40417],117:[0,.45833,0,0,.56111],118:[0,.45833,.01528,0,.5],119:[0,.45833,.01528,0,.74445],120:[0,.45833,0,0,.5],121:[.19444,.45833,.01528,0,.5],122:[0,.45833,0,0,.47639],126:[.35,.34444,0,0,.55],168:[0,.69444,0,0,.55],176:[0,.69444,0,0,.73334],180:[0,.69444,0,0,.55],184:[.17014,0,0,0,.48889],305:[0,.45833,0,0,.25556],567:[.19444,.45833,0,0,.28611],710:[0,.69444,0,0,.55],711:[0,.63542,0,0,.55],713:[0,.63778,0,0,.55],728:[0,.69444,0,0,.55],729:[0,.69444,0,0,.30556],730:[0,.69444,0,0,.73334],732:[0,.69444,0,0,.55],733:[0,.69444,0,0,.55],915:[0,.69444,0,0,.58056],916:[0,.69444,0,0,.91667],920:[0,.69444,0,0,.85556],923:[0,.69444,0,0,.67223],926:[0,.69444,0,0,.73334],928:[0,.69444,0,0,.79445],931:[0,.69444,0,0,.79445],933:[0,.69444,0,0,.85556],934:[0,.69444,0,0,.79445],936:[0,.69444,0,0,.85556],937:[0,.69444,0,0,.79445],8211:[0,.45833,.03056,0,.55],8212:[0,.45833,.03056,0,1.10001],8216:[0,.69444,0,0,.30556],8217:[0,.69444,0,0,.30556],8220:[0,.69444,0,0,.55834],8221:[0,.69444,0,0,.55834]},"SansSerif-Italic":{33:[0,.69444,.05733,0,.31945],34:[0,.69444,.00316,0,.5],35:[.19444,.69444,.05087,0,.83334],36:[.05556,.75,.11156,0,.5],37:[.05556,.75,.03126,0,.83334],38:[0,.69444,.03058,0,.75834],39:[0,.69444,.07816,0,.27778],40:[.25,.75,.13164,0,.38889],41:[.25,.75,.02536,0,.38889],42:[0,.75,.11775,0,.5],43:[.08333,.58333,.02536,0,.77778],44:[.125,.08333,0,0,.27778],45:[0,.44444,.01946,0,.33333],46:[0,.08333,0,0,.27778],47:[.25,.75,.13164,0,.5],48:[0,.65556,.11156,0,.5],49:[0,.65556,.11156,0,.5],50:[0,.65556,.11156,0,.5],51:[0,.65556,.11156,0,.5],52:[0,.65556,.11156,0,.5],53:[0,.65556,.11156,0,.5],54:[0,.65556,.11156,0,.5],55:[0,.65556,.11156,0,.5],56:[0,.65556,.11156,0,.5],57:[0,.65556,.11156,0,.5],58:[0,.44444,.02502,0,.27778],59:[.125,.44444,.02502,0,.27778],61:[-.13,.37,.05087,0,.77778],63:[0,.69444,.11809,0,.47222],64:[0,.69444,.07555,0,.66667],65:[0,.69444,0,0,.66667],66:[0,.69444,.08293,0,.66667],67:[0,.69444,.11983,0,.63889],68:[0,.69444,.07555,0,.72223],69:[0,.69444,.11983,0,.59722],70:[0,.69444,.13372,0,.56945],71:[0,.69444,.11983,0,.66667],72:[0,.69444,.08094,0,.70834],73:[0,.69444,.13372,0,.27778],74:[0,.69444,.08094,0,.47222],75:[0,.69444,.11983,0,.69445],76:[0,.69444,0,0,.54167],77:[0,.69444,.08094,0,.875],78:[0,.69444,.08094,0,.70834],79:[0,.69444,.07555,0,.73611],80:[0,.69444,.08293,0,.63889],81:[.125,.69444,.07555,0,.73611],82:[0,.69444,.08293,0,.64584],83:[0,.69444,.09205,0,.55556],84:[0,.69444,.13372,0,.68056],85:[0,.69444,.08094,0,.6875],86:[0,.69444,.1615,0,.66667],87:[0,.69444,.1615,0,.94445],88:[0,.69444,.13372,0,.66667],89:[0,.69444,.17261,0,.66667],90:[0,.69444,.11983,0,.61111],91:[.25,.75,.15942,0,.28889],93:[.25,.75,.08719,0,.28889],94:[0,.69444,.0799,0,.5],95:[.35,.09444,.08616,0,.5],97:[0,.44444,.00981,0,.48056],98:[0,.69444,.03057,0,.51667],99:[0,.44444,.08336,0,.44445],100:[0,.69444,.09483,0,.51667],101:[0,.44444,.06778,0,.44445],102:[0,.69444,.21705,0,.30556],103:[.19444,.44444,.10836,0,.5],104:[0,.69444,.01778,0,.51667],105:[0,.67937,.09718,0,.23889],106:[.19444,.67937,.09162,0,.26667],107:[0,.69444,.08336,0,.48889],108:[0,.69444,.09483,0,.23889],109:[0,.44444,.01778,0,.79445],110:[0,.44444,.01778,0,.51667],111:[0,.44444,.06613,0,.5],112:[.19444,.44444,.0389,0,.51667],113:[.19444,.44444,.04169,0,.51667],114:[0,.44444,.10836,0,.34167],115:[0,.44444,.0778,0,.38333],116:[0,.57143,.07225,0,.36111],117:[0,.44444,.04169,0,.51667],118:[0,.44444,.10836,0,.46111],119:[0,.44444,.10836,0,.68334],120:[0,.44444,.09169,0,.46111],121:[.19444,.44444,.10836,0,.46111],122:[0,.44444,.08752,0,.43472],126:[.35,.32659,.08826,0,.5],168:[0,.67937,.06385,0,.5],176:[0,.69444,0,0,.73752],184:[.17014,0,0,0,.44445],305:[0,.44444,.04169,0,.23889],567:[.19444,.44444,.04169,0,.26667],710:[0,.69444,.0799,0,.5],711:[0,.63194,.08432,0,.5],713:[0,.60889,.08776,0,.5],714:[0,.69444,.09205,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,.09483,0,.5],729:[0,.67937,.07774,0,.27778],730:[0,.69444,0,0,.73752],732:[0,.67659,.08826,0,.5],733:[0,.69444,.09205,0,.5],915:[0,.69444,.13372,0,.54167],916:[0,.69444,0,0,.83334],920:[0,.69444,.07555,0,.77778],923:[0,.69444,0,0,.61111],926:[0,.69444,.12816,0,.66667],928:[0,.69444,.08094,0,.70834],931:[0,.69444,.11983,0,.72222],933:[0,.69444,.09031,0,.77778],934:[0,.69444,.04603,0,.72222],936:[0,.69444,.09031,0,.77778],937:[0,.69444,.08293,0,.72222],8211:[0,.44444,.08616,0,.5],8212:[0,.44444,.08616,0,1],8216:[0,.69444,.07816,0,.27778],8217:[0,.69444,.07816,0,.27778],8220:[0,.69444,.14205,0,.5],8221:[0,.69444,.00316,0,.5]},"SansSerif-Regular":{33:[0,.69444,0,0,.31945],34:[0,.69444,0,0,.5],35:[.19444,.69444,0,0,.83334],36:[.05556,.75,0,0,.5],37:[.05556,.75,0,0,.83334],38:[0,.69444,0,0,.75834],39:[0,.69444,0,0,.27778],40:[.25,.75,0,0,.38889],41:[.25,.75,0,0,.38889],42:[0,.75,0,0,.5],43:[.08333,.58333,0,0,.77778],44:[.125,.08333,0,0,.27778],45:[0,.44444,0,0,.33333],46:[0,.08333,0,0,.27778],47:[.25,.75,0,0,.5],48:[0,.65556,0,0,.5],49:[0,.65556,0,0,.5],50:[0,.65556,0,0,.5],51:[0,.65556,0,0,.5],52:[0,.65556,0,0,.5],53:[0,.65556,0,0,.5],54:[0,.65556,0,0,.5],55:[0,.65556,0,0,.5],56:[0,.65556,0,0,.5],57:[0,.65556,0,0,.5],58:[0,.44444,0,0,.27778],59:[.125,.44444,0,0,.27778],61:[-.13,.37,0,0,.77778],63:[0,.69444,0,0,.47222],64:[0,.69444,0,0,.66667],65:[0,.69444,0,0,.66667],66:[0,.69444,0,0,.66667],67:[0,.69444,0,0,.63889],68:[0,.69444,0,0,.72223],69:[0,.69444,0,0,.59722],70:[0,.69444,0,0,.56945],71:[0,.69444,0,0,.66667],72:[0,.69444,0,0,.70834],73:[0,.69444,0,0,.27778],74:[0,.69444,0,0,.47222],75:[0,.69444,0,0,.69445],76:[0,.69444,0,0,.54167],77:[0,.69444,0,0,.875],78:[0,.69444,0,0,.70834],79:[0,.69444,0,0,.73611],80:[0,.69444,0,0,.63889],81:[.125,.69444,0,0,.73611],82:[0,.69444,0,0,.64584],83:[0,.69444,0,0,.55556],84:[0,.69444,0,0,.68056],85:[0,.69444,0,0,.6875],86:[0,.69444,.01389,0,.66667],87:[0,.69444,.01389,0,.94445],88:[0,.69444,0,0,.66667],89:[0,.69444,.025,0,.66667],90:[0,.69444,0,0,.61111],91:[.25,.75,0,0,.28889],93:[.25,.75,0,0,.28889],94:[0,.69444,0,0,.5],95:[.35,.09444,.02778,0,.5],97:[0,.44444,0,0,.48056],98:[0,.69444,0,0,.51667],99:[0,.44444,0,0,.44445],100:[0,.69444,0,0,.51667],101:[0,.44444,0,0,.44445],102:[0,.69444,.06944,0,.30556],103:[.19444,.44444,.01389,0,.5],104:[0,.69444,0,0,.51667],105:[0,.67937,0,0,.23889],106:[.19444,.67937,0,0,.26667],107:[0,.69444,0,0,.48889],108:[0,.69444,0,0,.23889],109:[0,.44444,0,0,.79445],110:[0,.44444,0,0,.51667],111:[0,.44444,0,0,.5],112:[.19444,.44444,0,0,.51667],113:[.19444,.44444,0,0,.51667],114:[0,.44444,.01389,0,.34167],115:[0,.44444,0,0,.38333],116:[0,.57143,0,0,.36111],117:[0,.44444,0,0,.51667],118:[0,.44444,.01389,0,.46111],119:[0,.44444,.01389,0,.68334],120:[0,.44444,0,0,.46111],121:[.19444,.44444,.01389,0,.46111],122:[0,.44444,0,0,.43472],126:[.35,.32659,0,0,.5],168:[0,.67937,0,0,.5],176:[0,.69444,0,0,.66667],184:[.17014,0,0,0,.44445],305:[0,.44444,0,0,.23889],567:[.19444,.44444,0,0,.26667],710:[0,.69444,0,0,.5],711:[0,.63194,0,0,.5],713:[0,.60889,0,0,.5],714:[0,.69444,0,0,.5],715:[0,.69444,0,0,.5],728:[0,.69444,0,0,.5],729:[0,.67937,0,0,.27778],730:[0,.69444,0,0,.66667],732:[0,.67659,0,0,.5],733:[0,.69444,0,0,.5],915:[0,.69444,0,0,.54167],916:[0,.69444,0,0,.83334],920:[0,.69444,0,0,.77778],923:[0,.69444,0,0,.61111],926:[0,.69444,0,0,.66667],928:[0,.69444,0,0,.70834],931:[0,.69444,0,0,.72222],933:[0,.69444,0,0,.77778],934:[0,.69444,0,0,.72222],936:[0,.69444,0,0,.77778],937:[0,.69444,0,0,.72222],8211:[0,.44444,.02778,0,.5],8212:[0,.44444,.02778,0,1],8216:[0,.69444,0,0,.27778],8217:[0,.69444,0,0,.27778],8220:[0,.69444,0,0,.5],8221:[0,.69444,0,0,.5]},"Script-Regular":{65:[0,.7,.22925,0,.80253],66:[0,.7,.04087,0,.90757],67:[0,.7,.1689,0,.66619],68:[0,.7,.09371,0,.77443],69:[0,.7,.18583,0,.56162],70:[0,.7,.13634,0,.89544],71:[0,.7,.17322,0,.60961],72:[0,.7,.29694,0,.96919],73:[0,.7,.19189,0,.80907],74:[.27778,.7,.19189,0,1.05159],75:[0,.7,.31259,0,.91364],76:[0,.7,.19189,0,.87373],77:[0,.7,.15981,0,1.08031],78:[0,.7,.3525,0,.9015],79:[0,.7,.08078,0,.73787],80:[0,.7,.08078,0,1.01262],81:[0,.7,.03305,0,.88282],82:[0,.7,.06259,0,.85],83:[0,.7,.19189,0,.86767],84:[0,.7,.29087,0,.74697],85:[0,.7,.25815,0,.79996],86:[0,.7,.27523,0,.62204],87:[0,.7,.27523,0,.80532],88:[0,.7,.26006,0,.94445],89:[0,.7,.2939,0,.70961],90:[0,.7,.24037,0,.8212]},"Size1-Regular":{40:[.35001,.85,0,0,.45834],41:[.35001,.85,0,0,.45834],47:[.35001,.85,0,0,.57778],91:[.35001,.85,0,0,.41667],92:[.35001,.85,0,0,.57778],93:[.35001,.85,0,0,.41667],123:[.35001,.85,0,0,.58334],125:[.35001,.85,0,0,.58334],710:[0,.72222,0,0,.55556],732:[0,.72222,0,0,.55556],770:[0,.72222,0,0,.55556],771:[0,.72222,0,0,.55556],8214:[-99e-5,.601,0,0,.77778],8593:[1e-5,.6,0,0,.66667],8595:[1e-5,.6,0,0,.66667],8657:[1e-5,.6,0,0,.77778],8659:[1e-5,.6,0,0,.77778],8719:[.25001,.75,0,0,.94445],8720:[.25001,.75,0,0,.94445],8721:[.25001,.75,0,0,1.05556],8730:[.35001,.85,0,0,1],8739:[-.00599,.606,0,0,.33333],8741:[-.00599,.606,0,0,.55556],8747:[.30612,.805,.19445,0,.47222],8748:[.306,.805,.19445,0,.47222],8749:[.306,.805,.19445,0,.47222],8750:[.30612,.805,.19445,0,.47222],8896:[.25001,.75,0,0,.83334],8897:[.25001,.75,0,0,.83334],8898:[.25001,.75,0,0,.83334],8899:[.25001,.75,0,0,.83334],8968:[.35001,.85,0,0,.47222],8969:[.35001,.85,0,0,.47222],8970:[.35001,.85,0,0,.47222],8971:[.35001,.85,0,0,.47222],9168:[-99e-5,.601,0,0,.66667],10216:[.35001,.85,0,0,.47222],10217:[.35001,.85,0,0,.47222],10752:[.25001,.75,0,0,1.11111],10753:[.25001,.75,0,0,1.11111],10754:[.25001,.75,0,0,1.11111],10756:[.25001,.75,0,0,.83334],10758:[.25001,.75,0,0,.83334]},"Size2-Regular":{40:[.65002,1.15,0,0,.59722],41:[.65002,1.15,0,0,.59722],47:[.65002,1.15,0,0,.81111],91:[.65002,1.15,0,0,.47222],92:[.65002,1.15,0,0,.81111],93:[.65002,1.15,0,0,.47222],123:[.65002,1.15,0,0,.66667],125:[.65002,1.15,0,0,.66667],710:[0,.75,0,0,1],732:[0,.75,0,0,1],770:[0,.75,0,0,1],771:[0,.75,0,0,1],8719:[.55001,1.05,0,0,1.27778],8720:[.55001,1.05,0,0,1.27778],8721:[.55001,1.05,0,0,1.44445],8730:[.65002,1.15,0,0,1],8747:[.86225,1.36,.44445,0,.55556],8748:[.862,1.36,.44445,0,.55556],8749:[.862,1.36,.44445,0,.55556],8750:[.86225,1.36,.44445,0,.55556],8896:[.55001,1.05,0,0,1.11111],8897:[.55001,1.05,0,0,1.11111],8898:[.55001,1.05,0,0,1.11111],8899:[.55001,1.05,0,0,1.11111],8968:[.65002,1.15,0,0,.52778],8969:[.65002,1.15,0,0,.52778],8970:[.65002,1.15,0,0,.52778],8971:[.65002,1.15,0,0,.52778],10216:[.65002,1.15,0,0,.61111],10217:[.65002,1.15,0,0,.61111],10752:[.55001,1.05,0,0,1.51112],10753:[.55001,1.05,0,0,1.51112],10754:[.55001,1.05,0,0,1.51112],10756:[.55001,1.05,0,0,1.11111],10758:[.55001,1.05,0,0,1.11111]},"Size3-Regular":{40:[.95003,1.45,0,0,.73611],41:[.95003,1.45,0,0,.73611],47:[.95003,1.45,0,0,1.04445],91:[.95003,1.45,0,0,.52778],92:[.95003,1.45,0,0,1.04445],93:[.95003,1.45,0,0,.52778],123:[.95003,1.45,0,0,.75],125:[.95003,1.45,0,0,.75],710:[0,.75,0,0,1.44445],732:[0,.75,0,0,1.44445],770:[0,.75,0,0,1.44445],771:[0,.75,0,0,1.44445],8730:[.95003,1.45,0,0,1],8968:[.95003,1.45,0,0,.58334],8969:[.95003,1.45,0,0,.58334],8970:[.95003,1.45,0,0,.58334],8971:[.95003,1.45,0,0,.58334],10216:[.95003,1.45,0,0,.75],10217:[.95003,1.45,0,0,.75]},"Size4-Regular":{40:[1.25003,1.75,0,0,.79167],41:[1.25003,1.75,0,0,.79167],47:[1.25003,1.75,0,0,1.27778],91:[1.25003,1.75,0,0,.58334],92:[1.25003,1.75,0,0,1.27778],93:[1.25003,1.75,0,0,.58334],123:[1.25003,1.75,0,0,.80556],125:[1.25003,1.75,0,0,.80556],710:[0,.825,0,0,1.8889],732:[0,.825,0,0,1.8889],770:[0,.825,0,0,1.8889],771:[0,.825,0,0,1.8889],8730:[1.25003,1.75,0,0,1],8968:[1.25003,1.75,0,0,.63889],8969:[1.25003,1.75,0,0,.63889],8970:[1.25003,1.75,0,0,.63889],8971:[1.25003,1.75,0,0,.63889],9115:[.64502,1.155,0,0,.875],9116:[1e-5,.6,0,0,.875],9117:[.64502,1.155,0,0,.875],9118:[.64502,1.155,0,0,.875],9119:[1e-5,.6,0,0,.875],9120:[.64502,1.155,0,0,.875],9121:[.64502,1.155,0,0,.66667],9122:[-99e-5,.601,0,0,.66667],9123:[.64502,1.155,0,0,.66667],9124:[.64502,1.155,0,0,.66667],9125:[-99e-5,.601,0,0,.66667],9126:[.64502,1.155,0,0,.66667],9127:[1e-5,.9,0,0,.88889],9128:[.65002,1.15,0,0,.88889],9129:[.90001,0,0,0,.88889],9130:[0,.3,0,0,.88889],9131:[1e-5,.9,0,0,.88889],9132:[.65002,1.15,0,0,.88889],9133:[.90001,0,0,0,.88889],9143:[.88502,.915,0,0,1.05556],10216:[1.25003,1.75,0,0,.80556],10217:[1.25003,1.75,0,0,.80556],57344:[-.00499,.605,0,0,1.05556],57345:[-.00499,.605,0,0,1.05556],57680:[0,.12,0,0,.45],57681:[0,.12,0,0,.45],57682:[0,.12,0,0,.45],57683:[0,.12,0,0,.45]},"Typewriter-Regular":{32:[0,0,0,0,.525],33:[0,.61111,0,0,.525],34:[0,.61111,0,0,.525],35:[0,.61111,0,0,.525],36:[.08333,.69444,0,0,.525],37:[.08333,.69444,0,0,.525],38:[0,.61111,0,0,.525],39:[0,.61111,0,0,.525],40:[.08333,.69444,0,0,.525],41:[.08333,.69444,0,0,.525],42:[0,.52083,0,0,.525],43:[-.08056,.53055,0,0,.525],44:[.13889,.125,0,0,.525],45:[-.08056,.53055,0,0,.525],46:[0,.125,0,0,.525],47:[.08333,.69444,0,0,.525],48:[0,.61111,0,0,.525],49:[0,.61111,0,0,.525],50:[0,.61111,0,0,.525],51:[0,.61111,0,0,.525],52:[0,.61111,0,0,.525],53:[0,.61111,0,0,.525],54:[0,.61111,0,0,.525],55:[0,.61111,0,0,.525],56:[0,.61111,0,0,.525],57:[0,.61111,0,0,.525],58:[0,.43056,0,0,.525],59:[.13889,.43056,0,0,.525],60:[-.05556,.55556,0,0,.525],61:[-.19549,.41562,0,0,.525],62:[-.05556,.55556,0,0,.525],63:[0,.61111,0,0,.525],64:[0,.61111,0,0,.525],65:[0,.61111,0,0,.525],66:[0,.61111,0,0,.525],67:[0,.61111,0,0,.525],68:[0,.61111,0,0,.525],69:[0,.61111,0,0,.525],70:[0,.61111,0,0,.525],71:[0,.61111,0,0,.525],72:[0,.61111,0,0,.525],73:[0,.61111,0,0,.525],74:[0,.61111,0,0,.525],75:[0,.61111,0,0,.525],76:[0,.61111,0,0,.525],77:[0,.61111,0,0,.525],78:[0,.61111,0,0,.525],79:[0,.61111,0,0,.525],80:[0,.61111,0,0,.525],81:[.13889,.61111,0,0,.525],82:[0,.61111,0,0,.525],83:[0,.61111,0,0,.525],84:[0,.61111,0,0,.525],85:[0,.61111,0,0,.525],86:[0,.61111,0,0,.525],87:[0,.61111,0,0,.525],88:[0,.61111,0,0,.525],89:[0,.61111,0,0,.525],90:[0,.61111,0,0,.525],91:[.08333,.69444,0,0,.525],92:[.08333,.69444,0,0,.525],93:[.08333,.69444,0,0,.525],94:[0,.61111,0,0,.525],95:[.09514,0,0,0,.525],96:[0,.61111,0,0,.525],97:[0,.43056,0,0,.525],98:[0,.61111,0,0,.525],99:[0,.43056,0,0,.525],100:[0,.61111,0,0,.525],101:[0,.43056,0,0,.525],102:[0,.61111,0,0,.525],103:[.22222,.43056,0,0,.525],104:[0,.61111,0,0,.525],105:[0,.61111,0,0,.525],106:[.22222,.61111,0,0,.525],107:[0,.61111,0,0,.525],108:[0,.61111,0,0,.525],109:[0,.43056,0,0,.525],110:[0,.43056,0,0,.525],111:[0,.43056,0,0,.525],112:[.22222,.43056,0,0,.525],113:[.22222,.43056,0,0,.525],114:[0,.43056,0,0,.525],115:[0,.43056,0,0,.525],116:[0,.55358,0,0,.525],117:[0,.43056,0,0,.525],118:[0,.43056,0,0,.525],119:[0,.43056,0,0,.525],120:[0,.43056,0,0,.525],121:[.22222,.43056,0,0,.525],122:[0,.43056,0,0,.525],123:[.08333,.69444,0,0,.525],124:[.08333,.69444,0,0,.525],125:[.08333,.69444,0,0,.525],126:[0,.61111,0,0,.525],127:[0,.61111,0,0,.525],160:[0,0,0,0,.525],176:[0,.61111,0,0,.525],184:[.19445,0,0,0,.525],305:[0,.43056,0,0,.525],567:[.22222,.43056,0,0,.525],711:[0,.56597,0,0,.525],713:[0,.56555,0,0,.525],714:[0,.61111,0,0,.525],715:[0,.61111,0,0,.525],728:[0,.61111,0,0,.525],730:[0,.61111,0,0,.525],770:[0,.61111,0,0,.525],771:[0,.61111,0,0,.525],776:[0,.61111,0,0,.525],915:[0,.61111,0,0,.525],916:[0,.61111,0,0,.525],920:[0,.61111,0,0,.525],923:[0,.61111,0,0,.525],926:[0,.61111,0,0,.525],928:[0,.61111,0,0,.525],931:[0,.61111,0,0,.525],933:[0,.61111,0,0,.525],934:[0,.61111,0,0,.525],936:[0,.61111,0,0,.525],937:[0,.61111,0,0,.525],8216:[0,.61111,0,0,.525],8217:[0,.61111,0,0,.525],8242:[0,.61111,0,0,.525],9251:[.11111,.21944,0,0,.525]}},jt={slant:[.25,.25,.25],space:[0,0,0],stretch:[0,0,0],shrink:[0,0,0],xHeight:[.431,.431,.431],quad:[1,1.171,1.472],extraSpace:[0,0,0],num1:[.677,.732,.925],num2:[.394,.384,.387],num3:[.444,.471,.504],denom1:[.686,.752,1.025],denom2:[.345,.344,.532],sup1:[.413,.503,.504],sup2:[.363,.431,.404],sup3:[.289,.286,.294],sub1:[.15,.143,.2],sub2:[.247,.286,.4],supDrop:[.386,.353,.494],subDrop:[.05,.071,.1],delim1:[2.39,1.7,1.98],delim2:[1.01,1.157,1.42],axisHeight:[.25,.25,.25],defaultRuleThickness:[.04,.049,.049],bigOpSpacing1:[.111,.111,.111],bigOpSpacing2:[.166,.166,.166],bigOpSpacing3:[.2,.2,.2],bigOpSpacing4:[.6,.611,.611],bigOpSpacing5:[.1,.143,.143],sqrtRuleThickness:[.04,.04,.04],ptPerEm:[10,10,10],doubleRuleSep:[.2,.2,.2],arrayRuleWidth:[.04,.04,.04],fboxsep:[.3,.3,.3],fboxrule:[.04,.04,.04]},en={Å:"A",Ç:"C",Ð:"D",Þ:"o",å:"a",ç:"c",ð:"d",þ:"o",А:"A",Б:"B",В:"B",Г:"F",Д:"A",Е:"E",Ж:"K",З:"3",И:"N",Й:"N",К:"K",Л:"N",М:"M",Н:"H",О:"O",П:"N",Р:"P",С:"C",Т:"T",У:"y",Ф:"O",Х:"X",Ц:"U",Ч:"h",Ш:"W",Щ:"W",Ъ:"B",Ы:"X",Ь:"B",Э:"3",Ю:"X",Я:"R",а:"a",б:"b",в:"a",г:"r",д:"y",е:"e",ж:"m",з:"e",и:"n",й:"n",к:"n",л:"n",м:"m",н:"n",о:"o",п:"n",р:"p",с:"c",т:"o",у:"y",ф:"b",х:"x",ц:"n",ч:"n",ш:"w",щ:"w",ъ:"a",ы:"m",ь:"a",э:"e",ю:"m",я:"r"};function Ya(o,e){it[o]=e}function sr(o,e,t){if(!it[e])throw new Error("Font metrics not found for font: "+e+".");var r=o.charCodeAt(0),n=it[e][r];if(!n&&o[0]in en&&(r=en[o[0]].charCodeAt(0),n=it[e][r]),!n&&t==="text"&&Kr(r)&&(n=it[e][77]),n)return{depth:n[0],height:n[1],italic:n[2],skew:n[3],width:n[4]}}var or={};function Za(o){var e;if(o>=5?e=0:o>=3?e=1:e=2,!or[e]){var t=or[e]={cssEmPerMu:jt.quad[e]/18};for(var r in jt)jt.hasOwnProperty(r)&&(t[r]=jt[r][e])}return or[e]}var Ja={bin:1,close:1,inner:1,open:1,punct:1,rel:1},Qa={"accent-token":1,mathord:1,"op-token":1,spacing:1,textord:1},_t={math:{},text:{}},me=_t;function a(o,e,t,r,n,i){_t[o][n]={font:e,group:t,replace:r},i&&r&&(_t[o][r]=_t[o][n])}var s="math",z="text",h="main",f="ams",le="accent-token",I="bin",fe="close",pt="inner",D="mathord",ye="op-token",Re="open",Nt="punct",v="rel",je="spacing",w="textord";a(s,h,v,"≡","\\equiv",!0),a(s,h,v,"≺","\\prec",!0),a(s,h,v,"≻","\\succ",!0),a(s,h,v,"∼","\\sim",!0),a(s,h,v,"⊥","\\perp"),a(s,h,v,"⪯","\\preceq",!0),a(s,h,v,"⪰","\\succeq",!0),a(s,h,v,"≃","\\simeq",!0),a(s,h,v,"∣","\\mid",!0),a(s,h,v,"≪","\\ll",!0),a(s,h,v,"≫","\\gg",!0),a(s,h,v,"≍","\\asymp",!0),a(s,h,v,"∥","\\parallel"),a(s,h,v,"⋈","\\bowtie",!0),a(s,h,v,"⌣","\\smile",!0),a(s,h,v,"⊑","\\sqsubseteq",!0),a(s,h,v,"⊒","\\sqsupseteq",!0),a(s,h,v,"≐","\\doteq",!0),a(s,h,v,"⌢","\\frown",!0),a(s,h,v,"∋","\\ni",!0),a(s,h,v,"∝","\\propto",!0),a(s,h,v,"⊢","\\vdash",!0),a(s,h,v,"⊣","\\dashv",!0),a(s,h,v,"∋","\\owns"),a(s,h,Nt,".","\\ldotp"),a(s,h,Nt,"⋅","\\cdotp"),a(s,h,w,"#","\\#"),a(z,h,w,"#","\\#"),a(s,h,w,"&","\\&"),a(z,h,w,"&","\\&"),a(s,h,w,"ℵ","\\aleph",!0),a(s,h,w,"∀","\\forall",!0),a(s,h,w,"ℏ","\\hbar",!0),a(s,h,w,"∃","\\exists",!0),a(s,h,w,"∇","\\nabla",!0),a(s,h,w,"♭","\\flat",!0),a(s,h,w,"ℓ","\\ell",!0),a(s,h,w,"♮","\\natural",!0),a(s,h,w,"♣","\\clubsuit",!0),a(s,h,w,"℘","\\wp",!0),a(s,h,w,"♯","\\sharp",!0),a(s,h,w,"♢","\\diamondsuit",!0),a(s,h,w,"ℜ","\\Re",!0),a(s,h,w,"♡","\\heartsuit",!0),a(s,h,w,"ℑ","\\Im",!0),a(s,h,w,"♠","\\spadesuit",!0),a(z,h,w,"§","\\S",!0),a(z,h,w,"¶","\\P",!0),a(s,h,w,"†","\\dag"),a(z,h,w,"†","\\dag"),a(z,h,w,"†","\\textdagger"),a(s,h,w,"‡","\\ddag"),a(z,h,w,"‡","\\ddag"),a(z,h,w,"‡","\\textdaggerdbl"),a(s,h,fe,"⎱","\\rmoustache",!0),a(s,h,Re,"⎰","\\lmoustache",!0),a(s,h,fe,"⟯","\\rgroup",!0),a(s,h,Re,"⟮","\\lgroup",!0),a(s,h,I,"∓","\\mp",!0),a(s,h,I,"⊖","\\ominus",!0),a(s,h,I,"⊎","\\uplus",!0),a(s,h,I,"⊓","\\sqcap",!0),a(s,h,I,"∗","\\ast"),a(s,h,I,"⊔","\\sqcup",!0),a(s,h,I,"◯","\\bigcirc"),a(s,h,I,"∙","\\bullet"),a(s,h,I,"‡","\\ddagger"),a(s,h,I,"≀","\\wr",!0),a(s,h,I,"⨿","\\amalg"),a(s,h,I,"&","\\And"),a(s,h,v,"⟵","\\longleftarrow",!0),a(s,h,v,"⇐","\\Leftarrow",!0),a(s,h,v,"⟸","\\Longleftarrow",!0),a(s,h,v,"⟶","\\longrightarrow",!0),a(s,h,v,"⇒","\\Rightarrow",!0),a(s,h,v,"⟹","\\Longrightarrow",!0),a(s,h,v,"↔","\\leftrightarrow",!0),a(s,h,v,"⟷","\\longleftrightarrow",!0),a(s,h,v,"⇔","\\Leftrightarrow",!0),a(s,h,v,"⟺","\\Longleftrightarrow",!0),a(s,h,v,"↦","\\mapsto",!0),a(s,h,v,"⟼","\\longmapsto",!0),a(s,h,v,"↗","\\nearrow",!0),a(s,h,v,"↩","\\hookleftarrow",!0),a(s,h,v,"↪","\\hookrightarrow",!0),a(s,h,v,"↘","\\searrow",!0),a(s,h,v,"↼","\\leftharpoonup",!0),a(s,h,v,"⇀","\\rightharpoonup",!0),a(s,h,v,"↙","\\swarrow",!0),a(s,h,v,"↽","\\leftharpoondown",!0),a(s,h,v,"⇁","\\rightharpoondown",!0),a(s,h,v,"↖","\\nwarrow",!0),a(s,h,v,"⇌","\\rightleftharpoons",!0),a(s,f,v,"≮","\\nless",!0),a(s,f,v,"","\\@nleqslant"),a(s,f,v,"","\\@nleqq"),a(s,f,v,"⪇","\\lneq",!0),a(s,f,v,"≨","\\lneqq",!0),a(s,f,v,"","\\@lvertneqq"),a(s,f,v,"⋦","\\lnsim",!0),a(s,f,v,"⪉","\\lnapprox",!0),a(s,f,v,"⊀","\\nprec",!0),a(s,f,v,"⋠","\\npreceq",!0),a(s,f,v,"⋨","\\precnsim",!0),a(s,f,v,"⪹","\\precnapprox",!0),a(s,f,v,"≁","\\nsim",!0),a(s,f,v,"","\\@nshortmid"),a(s,f,v,"∤","\\nmid",!0),a(s,f,v,"⊬","\\nvdash",!0),a(s,f,v,"⊭","\\nvDash",!0),a(s,f,v,"⋪","\\ntriangleleft"),a(s,f,v,"⋬","\\ntrianglelefteq",!0),a(s,f,v,"⊊","\\subsetneq",!0),a(s,f,v,"","\\@varsubsetneq"),a(s,f,v,"⫋","\\subsetneqq",!0),a(s,f,v,"","\\@varsubsetneqq"),a(s,f,v,"≯","\\ngtr",!0),a(s,f,v,"","\\@ngeqslant"),a(s,f,v,"","\\@ngeqq"),a(s,f,v,"⪈","\\gneq",!0),a(s,f,v,"≩","\\gneqq",!0),a(s,f,v,"","\\@gvertneqq"),a(s,f,v,"⋧","\\gnsim",!0),a(s,f,v,"⪊","\\gnapprox",!0),a(s,f,v,"⊁","\\nsucc",!0),a(s,f,v,"⋡","\\nsucceq",!0),a(s,f,v,"⋩","\\succnsim",!0),a(s,f,v,"⪺","\\succnapprox",!0),a(s,f,v,"≆","\\ncong",!0),a(s,f,v,"","\\@nshortparallel"),a(s,f,v,"∦","\\nparallel",!0),a(s,f,v,"⊯","\\nVDash",!0),a(s,f,v,"⋫","\\ntriangleright"),a(s,f,v,"⋭","\\ntrianglerighteq",!0),a(s,f,v,"","\\@nsupseteqq"),a(s,f,v,"⊋","\\supsetneq",!0),a(s,f,v,"","\\@varsupsetneq"),a(s,f,v,"⫌","\\supsetneqq",!0),a(s,f,v,"","\\@varsupsetneqq"),a(s,f,v,"⊮","\\nVdash",!0),a(s,f,v,"⪵","\\precneqq",!0),a(s,f,v,"⪶","\\succneqq",!0),a(s,f,v,"","\\@nsubseteqq"),a(s,f,I,"⊴","\\unlhd"),a(s,f,I,"⊵","\\unrhd"),a(s,f,v,"↚","\\nleftarrow",!0),a(s,f,v,"↛","\\nrightarrow",!0),a(s,f,v,"⇍","\\nLeftarrow",!0),a(s,f,v,"⇏","\\nRightarrow",!0),a(s,f,v,"↮","\\nleftrightarrow",!0),a(s,f,v,"⇎","\\nLeftrightarrow",!0),a(s,f,v,"△","\\vartriangle"),a(s,f,w,"ℏ","\\hslash"),a(s,f,w,"▽","\\triangledown"),a(s,f,w,"◊","\\lozenge"),a(s,f,w,"Ⓢ","\\circledS"),a(s,f,w,"®","\\circledR"),a(z,f,w,"®","\\circledR"),a(s,f,w,"∡","\\measuredangle",!0),a(s,f,w,"∄","\\nexists"),a(s,f,w,"℧","\\mho"),a(s,f,w,"Ⅎ","\\Finv",!0),a(s,f,w,"⅁","\\Game",!0),a(s,f,w,"‵","\\backprime"),a(s,f,w,"▲","\\blacktriangle"),a(s,f,w,"▼","\\blacktriangledown"),a(s,f,w,"■","\\blacksquare"),a(s,f,w,"⧫","\\blacklozenge"),a(s,f,w,"★","\\bigstar"),a(s,f,w,"∢","\\sphericalangle",!0),a(s,f,w,"∁","\\complement",!0),a(s,f,w,"ð","\\eth",!0),a(s,f,w,"╱","\\diagup"),a(s,f,w,"╲","\\diagdown"),a(s,f,w,"□","\\square"),a(s,f,w,"□","\\Box"),a(s,f,w,"◊","\\Diamond"),a(s,f,w,"¥","\\yen",!0),a(z,f,w,"¥","\\yen",!0),a(s,f,w,"✓","\\checkmark",!0),a(z,f,w,"✓","\\checkmark"),a(s,f,w,"ℶ","\\beth",!0),a(s,f,w,"ℸ","\\daleth",!0),a(s,f,w,"ℷ","\\gimel",!0),a(s,f,w,"ϝ","\\digamma",!0),a(s,f,w,"ϰ","\\varkappa"),a(s,f,Re,"┌","\\ulcorner",!0),a(s,f,fe,"┐","\\urcorner",!0),a(s,f,Re,"└","\\llcorner",!0),a(s,f,fe,"┘","\\lrcorner",!0),a(s,f,v,"≦","\\leqq",!0),a(s,f,v,"⩽","\\leqslant",!0),a(s,f,v,"⪕","\\eqslantless",!0),a(s,f,v,"≲","\\lesssim",!0),a(s,f,v,"⪅","\\lessapprox",!0),a(s,f,v,"≊","\\approxeq",!0),a(s,f,I,"⋖","\\lessdot"),a(s,f,v,"⋘","\\lll",!0),a(s,f,v,"≶","\\lessgtr",!0),a(s,f,v,"⋚","\\lesseqgtr",!0),a(s,f,v,"⪋","\\lesseqqgtr",!0),a(s,f,v,"≑","\\doteqdot"),a(s,f,v,"≓","\\risingdotseq",!0),a(s,f,v,"≒","\\fallingdotseq",!0),a(s,f,v,"∽","\\backsim",!0),a(s,f,v,"⋍","\\backsimeq",!0),a(s,f,v,"⫅","\\subseteqq",!0),a(s,f,v,"⋐","\\Subset",!0),a(s,f,v,"⊏","\\sqsubset",!0),a(s,f,v,"≼","\\preccurlyeq",!0),a(s,f,v,"⋞","\\curlyeqprec",!0),a(s,f,v,"≾","\\precsim",!0),a(s,f,v,"⪷","\\precapprox",!0),a(s,f,v,"⊲","\\vartriangleleft"),a(s,f,v,"⊴","\\trianglelefteq"),a(s,f,v,"⊨","\\vDash",!0),a(s,f,v,"⊪","\\Vvdash",!0),a(s,f,v,"⌣","\\smallsmile"),a(s,f,v,"⌢","\\smallfrown"),a(s,f,v,"≏","\\bumpeq",!0),a(s,f,v,"≎","\\Bumpeq",!0),a(s,f,v,"≧","\\geqq",!0),a(s,f,v,"⩾","\\geqslant",!0),a(s,f,v,"⪖","\\eqslantgtr",!0),a(s,f,v,"≳","\\gtrsim",!0),a(s,f,v,"⪆","\\gtrapprox",!0),a(s,f,I,"⋗","\\gtrdot"),a(s,f,v,"⋙","\\ggg",!0),a(s,f,v,"≷","\\gtrless",!0),a(s,f,v,"⋛","\\gtreqless",!0),a(s,f,v,"⪌","\\gtreqqless",!0),a(s,f,v,"≖","\\eqcirc",!0),a(s,f,v,"≗","\\circeq",!0),a(s,f,v,"≜","\\triangleq",!0),a(s,f,v,"∼","\\thicksim"),a(s,f,v,"≈","\\thickapprox"),a(s,f,v,"⫆","\\supseteqq",!0),a(s,f,v,"⋑","\\Supset",!0),a(s,f,v,"⊐","\\sqsupset",!0),a(s,f,v,"≽","\\succcurlyeq",!0),a(s,f,v,"⋟","\\curlyeqsucc",!0),a(s,f,v,"≿","\\succsim",!0),a(s,f,v,"⪸","\\succapprox",!0),a(s,f,v,"⊳","\\vartriangleright"),a(s,f,v,"⊵","\\trianglerighteq"),a(s,f,v,"⊩","\\Vdash",!0),a(s,f,v,"∣","\\shortmid"),a(s,f,v,"∥","\\shortparallel"),a(s,f,v,"≬","\\between",!0),a(s,f,v,"⋔","\\pitchfork",!0),a(s,f,v,"∝","\\varpropto"),a(s,f,v,"◀","\\blacktriangleleft"),a(s,f,v,"∴","\\therefore",!0),a(s,f,v,"∍","\\backepsilon"),a(s,f,v,"▶","\\blacktriangleright"),a(s,f,v,"∵","\\because",!0),a(s,f,v,"⋘","\\llless"),a(s,f,v,"⋙","\\gggtr"),a(s,f,I,"⊲","\\lhd"),a(s,f,I,"⊳","\\rhd"),a(s,f,v,"≂","\\eqsim",!0),a(s,h,v,"⋈","\\Join"),a(s,f,v,"≑","\\Doteq",!0),a(s,f,I,"∔","\\dotplus",!0),a(s,f,I,"∖","\\smallsetminus"),a(s,f,I,"⋒","\\Cap",!0),a(s,f,I,"⋓","\\Cup",!0),a(s,f,I,"⩞","\\doublebarwedge",!0),a(s,f,I,"⊟","\\boxminus",!0),a(s,f,I,"⊞","\\boxplus",!0),a(s,f,I,"⋇","\\divideontimes",!0),a(s,f,I,"⋉","\\ltimes",!0),a(s,f,I,"⋊","\\rtimes",!0),a(s,f,I,"⋋","\\leftthreetimes",!0),a(s,f,I,"⋌","\\rightthreetimes",!0),a(s,f,I,"⋏","\\curlywedge",!0),a(s,f,I,"⋎","\\curlyvee",!0),a(s,f,I,"⊝","\\circleddash",!0),a(s,f,I,"⊛","\\circledast",!0),a(s,f,I,"⋅","\\centerdot"),a(s,f,I,"⊺","\\intercal",!0),a(s,f,I,"⋒","\\doublecap"),a(s,f,I,"⋓","\\doublecup"),a(s,f,I,"⊠","\\boxtimes",!0),a(s,f,v,"⇢","\\dashrightarrow",!0),a(s,f,v,"⇠","\\dashleftarrow",!0),a(s,f,v,"⇇","\\leftleftarrows",!0),a(s,f,v,"⇆","\\leftrightarrows",!0),a(s,f,v,"⇚","\\Lleftarrow",!0),a(s,f,v,"↞","\\twoheadleftarrow",!0),a(s,f,v,"↢","\\leftarrowtail",!0),a(s,f,v,"↫","\\looparrowleft",!0),a(s,f,v,"⇋","\\leftrightharpoons",!0),a(s,f,v,"↶","\\curvearrowleft",!0),a(s,f,v,"↺","\\circlearrowleft",!0),a(s,f,v,"↰","\\Lsh",!0),a(s,f,v,"⇈","\\upuparrows",!0),a(s,f,v,"↿","\\upharpoonleft",!0),a(s,f,v,"⇃","\\downharpoonleft",!0),a(s,f,v,"⊸","\\multimap",!0),a(s,f,v,"↭","\\leftrightsquigarrow",!0),a(s,f,v,"⇉","\\rightrightarrows",!0),a(s,f,v,"⇄","\\rightleftarrows",!0),a(s,f,v,"↠","\\twoheadrightarrow",!0),a(s,f,v,"↣","\\rightarrowtail",!0),a(s,f,v,"↬","\\looparrowright",!0),a(s,f,v,"↷","\\curvearrowright",!0),a(s,f,v,"↻","\\circlearrowright",!0),a(s,f,v,"↱","\\Rsh",!0),a(s,f,v,"⇊","\\downdownarrows",!0),a(s,f,v,"↾","\\upharpoonright",!0),a(s,f,v,"⇂","\\downharpoonright",!0),a(s,f,v,"⇝","\\rightsquigarrow",!0),a(s,f,v,"⇝","\\leadsto"),a(s,f,v,"⇛","\\Rrightarrow",!0),a(s,f,v,"↾","\\restriction"),a(s,h,w,"‘","`"),a(s,h,w,"$","\\$"),a(z,h,w,"$","\\$"),a(z,h,w,"$","\\textdollar"),a(s,h,w,"%","\\%"),a(z,h,w,"%","\\%"),a(s,h,w,"_","\\_"),a(z,h,w,"_","\\_"),a(z,h,w,"_","\\textunderscore"),a(s,h,w,"∠","\\angle",!0),a(s,h,w,"∞","\\infty",!0),a(s,h,w,"′","\\prime"),a(s,h,w,"△","\\triangle"),a(s,h,w,"Γ","\\Gamma",!0),a(s,h,w,"Δ","\\Delta",!0),a(s,h,w,"Θ","\\Theta",!0),a(s,h,w,"Λ","\\Lambda",!0),a(s,h,w,"Ξ","\\Xi",!0),a(s,h,w,"Π","\\Pi",!0),a(s,h,w,"Σ","\\Sigma",!0),a(s,h,w,"Υ","\\Upsilon",!0),a(s,h,w,"Φ","\\Phi",!0),a(s,h,w,"Ψ","\\Psi",!0),a(s,h,w,"Ω","\\Omega",!0),a(s,h,w,"A","Α"),a(s,h,w,"B","Β"),a(s,h,w,"E","Ε"),a(s,h,w,"Z","Ζ"),a(s,h,w,"H","Η"),a(s,h,w,"I","Ι"),a(s,h,w,"K","Κ"),a(s,h,w,"M","Μ"),a(s,h,w,"N","Ν"),a(s,h,w,"O","Ο"),a(s,h,w,"P","Ρ"),a(s,h,w,"T","Τ"),a(s,h,w,"X","Χ"),a(s,h,w,"¬","\\neg",!0),a(s,h,w,"¬","\\lnot"),a(s,h,w,"⊤","\\top"),a(s,h,w,"⊥","\\bot"),a(s,h,w,"∅","\\emptyset"),a(s,f,w,"∅","\\varnothing"),a(s,h,D,"α","\\alpha",!0),a(s,h,D,"β","\\beta",!0),a(s,h,D,"γ","\\gamma",!0),a(s,h,D,"δ","\\delta",!0),a(s,h,D,"ϵ","\\epsilon",!0),a(s,h,D,"ζ","\\zeta",!0),a(s,h,D,"η","\\eta",!0),a(s,h,D,"θ","\\theta",!0),a(s,h,D,"ι","\\iota",!0),a(s,h,D,"κ","\\kappa",!0),a(s,h,D,"λ","\\lambda",!0),a(s,h,D,"μ","\\mu",!0),a(s,h,D,"ν","\\nu",!0),a(s,h,D,"ξ","\\xi",!0),a(s,h,D,"ο","\\omicron",!0),a(s,h,D,"π","\\pi",!0),a(s,h,D,"ρ","\\rho",!0),a(s,h,D,"σ","\\sigma",!0),a(s,h,D,"τ","\\tau",!0),a(s,h,D,"υ","\\upsilon",!0),a(s,h,D,"ϕ","\\phi",!0),a(s,h,D,"χ","\\chi",!0),a(s,h,D,"ψ","\\psi",!0),a(s,h,D,"ω","\\omega",!0),a(s,h,D,"ε","\\varepsilon",!0),a(s,h,D,"ϑ","\\vartheta",!0),a(s,h,D,"ϖ","\\varpi",!0),a(s,h,D,"ϱ","\\varrho",!0),a(s,h,D,"ς","\\varsigma",!0),a(s,h,D,"φ","\\varphi",!0),a(s,h,I,"∗","*"),a(s,h,I,"+","+"),a(s,h,I,"−","-"),a(s,h,I,"⋅","\\cdot",!0),a(s,h,I,"∘","\\circ"),a(s,h,I,"÷","\\div",!0),a(s,h,I,"±","\\pm",!0),a(s,h,I,"×","\\times",!0),a(s,h,I,"∩","\\cap",!0),a(s,h,I,"∪","\\cup",!0),a(s,h,I,"∖","\\setminus"),a(s,h,I,"∧","\\land"),a(s,h,I,"∨","\\lor"),a(s,h,I,"∧","\\wedge",!0),a(s,h,I,"∨","\\vee",!0),a(s,h,w,"√","\\surd"),a(s,h,Re,"(","("),a(s,h,Re,"[","["),a(s,h,Re,"⟨","\\langle",!0),a(s,h,Re,"∣","\\lvert"),a(s,h,Re,"∥","\\lVert"),a(s,h,fe,")",")"),a(s,h,fe,"]","]"),a(s,h,fe,"?","?"),a(s,h,fe,"!","!"),a(s,h,fe,"⟩","\\rangle",!0),a(s,h,fe,"∣","\\rvert"),a(s,h,fe,"∥","\\rVert"),a(s,h,v,"=","="),a(s,h,v,"<","<"),a(s,h,v,">",">"),a(s,h,v,":",":"),a(s,h,v,"≈","\\approx",!0),a(s,h,v,"≅","\\cong",!0),a(s,h,v,"≥","\\ge"),a(s,h,v,"≥","\\geq",!0),a(s,h,v,"←","\\gets"),a(s,h,v,">","\\gt"),a(s,h,v,"∈","\\in",!0),a(s,h,v,"","\\@not"),a(s,h,v,"⊂","\\subset",!0),a(s,h,v,"⊃","\\supset",!0),a(s,h,v,"⊆","\\subseteq",!0),a(s,h,v,"⊇","\\supseteq",!0),a(s,f,v,"⊈","\\nsubseteq",!0),a(s,f,v,"⊉","\\nsupseteq",!0),a(s,h,v,"⊨","\\models"),a(s,h,v,"←","\\leftarrow",!0),a(s,h,v,"≤","\\le"),a(s,h,v,"≤","\\leq",!0),a(s,h,v,"<","\\lt"),a(s,h,v,"→","\\rightarrow",!0),a(s,h,v,"→","\\to"),a(s,f,v,"≱","\\ngeq",!0),a(s,f,v,"≰","\\nleq",!0),a(s,h,je," ","\\ "),a(s,h,je," ","~"),a(s,h,je," ","\\space"),a(s,h,je," ","\\nobreakspace"),a(z,h,je," ","\\ "),a(z,h,je," ","~"),a(z,h,je," ","\\space"),a(z,h,je," ","\\nobreakspace"),a(s,h,je,null,"\\nobreak"),a(s,h,je,null,"\\allowbreak"),a(s,h,Nt,",",","),a(s,h,Nt,";",";"),a(s,f,I,"⊼","\\barwedge",!0),a(s,f,I,"⊻","\\veebar",!0),a(s,h,I,"⊙","\\odot",!0),a(s,h,I,"⊕","\\oplus",!0),a(s,h,I,"⊗","\\otimes",!0),a(s,h,w,"∂","\\partial",!0),a(s,h,I,"⊘","\\oslash",!0),a(s,f,I,"⊚","\\circledcirc",!0),a(s,f,I,"⊡","\\boxdot",!0),a(s,h,I,"△","\\bigtriangleup"),a(s,h,I,"▽","\\bigtriangledown"),a(s,h,I,"†","\\dagger"),a(s,h,I,"⋄","\\diamond"),a(s,h,I,"⋆","\\star"),a(s,h,I,"◃","\\triangleleft"),a(s,h,I,"▹","\\triangleright"),a(s,h,Re,"{","\\{"),a(z,h,w,"{","\\{"),a(z,h,w,"{","\\textbraceleft"),a(s,h,fe,"}","\\}"),a(z,h,w,"}","\\}"),a(z,h,w,"}","\\textbraceright"),a(s,h,Re,"{","\\lbrace"),a(s,h,fe,"}","\\rbrace"),a(s,h,Re,"[","\\lbrack"),a(z,h,w,"[","\\lbrack"),a(s,h,fe,"]","\\rbrack"),a(z,h,w,"]","\\rbrack"),a(s,h,Re,"(","\\lparen"),a(s,h,fe,")","\\rparen"),a(z,h,w,"<","\\textless"),a(z,h,w,">","\\textgreater"),a(s,h,Re,"⌊","\\lfloor",!0),a(s,h,fe,"⌋","\\rfloor",!0),a(s,h,Re,"⌈","\\lceil",!0),a(s,h,fe,"⌉","\\rceil",!0),a(s,h,w,"\\","\\backslash"),a(s,h,w,"∣","|"),a(s,h,w,"∣","\\vert"),a(z,h,w,"|","\\textbar"),a(s,h,w,"∥","\\|"),a(s,h,w,"∥","\\Vert"),a(z,h,w,"∥","\\textbardbl"),a(z,h,w,"~","\\textasciitilde"),a(z,h,w,"\\","\\textbackslash"),a(z,h,w,"^","\\textasciicircum"),a(s,h,v,"↑","\\uparrow",!0),a(s,h,v,"⇑","\\Uparrow",!0),a(s,h,v,"↓","\\downarrow",!0),a(s,h,v,"⇓","\\Downarrow",!0),a(s,h,v,"↕","\\updownarrow",!0),a(s,h,v,"⇕","\\Updownarrow",!0),a(s,h,ye,"∐","\\coprod"),a(s,h,ye,"⋁","\\bigvee"),a(s,h,ye,"⋀","\\bigwedge"),a(s,h,ye,"⨄","\\biguplus"),a(s,h,ye,"⋂","\\bigcap"),a(s,h,ye,"⋃","\\bigcup"),a(s,h,ye,"∫","\\int"),a(s,h,ye,"∫","\\intop"),a(s,h,ye,"∬","\\iint"),a(s,h,ye,"∭","\\iiint"),a(s,h,ye,"∏","\\prod"),a(s,h,ye,"∑","\\sum"),a(s,h,ye,"⨂","\\bigotimes"),a(s,h,ye,"⨁","\\bigoplus"),a(s,h,ye,"⨀","\\bigodot"),a(s,h,ye,"∮","\\oint"),a(s,h,ye,"∯","\\oiint"),a(s,h,ye,"∰","\\oiiint"),a(s,h,ye,"⨆","\\bigsqcup"),a(s,h,ye,"∫","\\smallint"),a(z,h,pt,"…","\\textellipsis"),a(s,h,pt,"…","\\mathellipsis"),a(z,h,pt,"…","\\ldots",!0),a(s,h,pt,"…","\\ldots",!0),a(s,h,pt,"⋯","\\@cdots",!0),a(s,h,pt,"⋱","\\ddots",!0),a(s,h,w,"⋮","\\varvdots"),a(s,h,le,"ˊ","\\acute"),a(s,h,le,"ˋ","\\grave"),a(s,h,le,"¨","\\ddot"),a(s,h,le,"~","\\tilde"),a(s,h,le,"ˉ","\\bar"),a(s,h,le,"˘","\\breve"),a(s,h,le,"ˇ","\\check"),a(s,h,le,"^","\\hat"),a(s,h,le,"⃗","\\vec"),a(s,h,le,"˙","\\dot"),a(s,h,le,"˚","\\mathring"),a(s,h,D,"ı","\\imath",!0),a(s,h,D,"ȷ","\\jmath",!0),a(z,h,w,"ı","\\i",!0),a(z,h,w,"ȷ","\\j",!0),a(z,h,w,"ß","\\ss",!0),a(z,h,w,"æ","\\ae",!0),a(z,h,w,"æ","\\ae",!0),a(z,h,w,"œ","\\oe",!0),a(z,h,w,"ø","\\o",!0),a(z,h,w,"Æ","\\AE",!0),a(z,h,w,"Œ","\\OE",!0),a(z,h,w,"Ø","\\O",!0),a(z,h,le,"ˊ","\\'"),a(z,h,le,"ˋ","\\`"),a(z,h,le,"ˆ","\\^"),a(z,h,le,"˜","\\~"),a(z,h,le,"ˉ","\\="),a(z,h,le,"˘","\\u"),a(z,h,le,"˙","\\."),a(z,h,le,"˚","\\r"),a(z,h,le,"ˇ","\\v"),a(z,h,le,"¨",'\\"'),a(z,h,le,"˝","\\H"),a(z,h,le,"◯","\\textcircled");var tn={"--":!0,"---":!0,"``":!0,"''":!0};a(z,h,w,"–","--"),a(z,h,w,"–","\\textendash"),a(z,h,w,"—","---"),a(z,h,w,"—","\\textemdash"),a(z,h,w,"‘","`"),a(z,h,w,"‘","\\textquoteleft"),a(z,h,w,"’","'"),a(z,h,w,"’","\\textquoteright"),a(z,h,w,"“","``"),a(z,h,w,"“","\\textquotedblleft"),a(z,h,w,"”","''"),a(z,h,w,"”","\\textquotedblright"),a(s,h,w,"°","\\degree",!0),a(z,h,w,"°","\\degree"),a(z,h,w,"°","\\textdegree",!0),a(s,h,D,"£","\\pounds"),a(s,h,D,"£","\\mathsterling",!0),a(z,h,D,"£","\\pounds"),a(z,h,D,"£","\\textsterling",!0),a(s,f,w,"✠","\\maltese"),a(z,f,w,"✠","\\maltese"),a(z,h,je," ","\\ "),a(z,h,je," "," "),a(z,h,je," ","~");for(var rn='0123456789/@."',lr=0;lr<rn.length;lr++){var nn=rn.charAt(lr);a(s,h,w,nn,nn)}for(var an='0123456789!@*()-=+[]<>|";:?/.,',ur=0;ur<an.length;ur++){var sn=an.charAt(ur);a(z,h,w,sn,sn)}for(var It="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",dr=0;dr<It.length;dr++){var Lt=It.charAt(dr);a(s,h,D,Lt,Lt),a(z,h,w,Lt,Lt)}a(s,f,w,"C","ℂ"),a(z,f,w,"C","ℂ"),a(s,f,w,"H","ℍ"),a(z,f,w,"H","ℍ"),a(s,f,w,"N","ℕ"),a(z,f,w,"N","ℕ"),a(s,f,w,"P","ℙ"),a(z,f,w,"P","ℙ"),a(s,f,w,"Q","ℚ"),a(z,f,w,"Q","ℚ"),a(s,f,w,"R","ℝ"),a(z,f,w,"R","ℝ"),a(s,f,w,"Z","ℤ"),a(z,f,w,"Z","ℤ"),a(s,h,D,"h","ℎ"),a(z,h,D,"h","ℎ");for(var B="",We=0;We<It.length;We++){var ge=It.charAt(We);B=String.fromCharCode(55349,56320+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56372+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56424+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56580+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56736+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56788+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56840+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56944+We),a(s,h,D,ge,B),a(z,h,w,ge,B),We<26&&(B=String.fromCharCode(55349,56632+We),a(s,h,D,ge,B),a(z,h,w,ge,B),B=String.fromCharCode(55349,56476+We),a(s,h,D,ge,B),a(z,h,w,ge,B))}B="𝕜",a(s,h,D,"k",B),a(z,h,w,"k",B);for(var st=0;st<10;st++){var Xe=st.toString();B=String.fromCharCode(55349,57294+st),a(s,h,D,Xe,B),a(z,h,w,Xe,B),B=String.fromCharCode(55349,57314+st),a(s,h,D,Xe,B),a(z,h,w,Xe,B),B=String.fromCharCode(55349,57324+st),a(s,h,D,Xe,B),a(z,h,w,Xe,B),B=String.fromCharCode(55349,57334+st),a(s,h,D,Xe,B),a(z,h,w,Xe,B)}for(var hr="ÇÐÞçþ",mr=0;mr<hr.length;mr++){var Mt=hr.charAt(mr);a(s,h,D,Mt,Mt),a(z,h,w,Mt,Mt)}a(z,h,w,"ð","ð"),a(z,h,w,"–","–"),a(z,h,w,"—","—"),a(z,h,w,"‘","‘"),a(z,h,w,"’","’"),a(z,h,w,"“","“"),a(z,h,w,"”","”");var Pt=[["mathbf","textbf","Main-Bold"],["mathbf","textbf","Main-Bold"],["mathdefault","textit","Math-Italic"],["mathdefault","textit","Math-Italic"],["boldsymbol","boldsymbol","Main-BoldItalic"],["boldsymbol","boldsymbol","Main-BoldItalic"],["mathscr","textscr","Script-Regular"],["","",""],["","",""],["","",""],["mathfrak","textfrak","Fraktur-Regular"],["mathfrak","textfrak","Fraktur-Regular"],["mathbb","textbb","AMS-Regular"],["mathbb","textbb","AMS-Regular"],["","",""],["","",""],["mathsf","textsf","SansSerif-Regular"],["mathsf","textsf","SansSerif-Regular"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathitsf","textitsf","SansSerif-Italic"],["mathitsf","textitsf","SansSerif-Italic"],["","",""],["","",""],["mathtt","texttt","Typewriter-Regular"],["mathtt","texttt","Typewriter-Regular"]],on=[["mathbf","textbf","Main-Bold"],["","",""],["mathsf","textsf","SansSerif-Regular"],["mathboldsf","textboldsf","SansSerif-Bold"],["mathtt","texttt","Typewriter-Regular"]],ei=function(e,t){var r=e.charCodeAt(0),n=e.charCodeAt(1),i=(r-55296)*1024+(n-56320)+65536,l=t==="math"?0:1;if(119808<=i&&i<120484){var m=Math.floor((i-119808)/26);return[Pt[m][2],Pt[m][l]]}else if(120782<=i&&i<=120831){var y=Math.floor((i-120782)/10);return[on[y][2],on[y][l]]}else{if(i===120485||i===120486)return[Pt[0][2],Pt[0][l]];if(120486<i&&i<120782)return["",""];throw new x("Unsupported character: "+e)}},ti=[[1,1,1],[2,1,1],[3,1,1],[4,2,1],[5,2,1],[6,3,1],[7,4,2],[8,6,3],[9,7,6],[10,8,7],[11,10,9]],ln=[.5,.6,.7,.8,.9,1,1.2,1.44,1.728,2.074,2.488],un=function(e,t){return t.size<2?e:ti[e-1][t.size-1]},dn=function(){function o(t){this.style=void 0,this.color=void 0,this.size=void 0,this.textSize=void 0,this.phantom=void 0,this.font=void 0,this.fontFamily=void 0,this.fontWeight=void 0,this.fontShape=void 0,this.sizeMultiplier=void 0,this.maxSize=void 0,this.minRuleThickness=void 0,this._fontMetrics=void 0,this.style=t.style,this.color=t.color,this.size=t.size||o.BASESIZE,this.textSize=t.textSize||this.size,this.phantom=!!t.phantom,this.font=t.font||"",this.fontFamily=t.fontFamily||"",this.fontWeight=t.fontWeight||"",this.fontShape=t.fontShape||"",this.sizeMultiplier=ln[this.size-1],this.maxSize=t.maxSize,this.minRuleThickness=t.minRuleThickness,this._fontMetrics=void 0}var e=o.prototype;return e.extend=function(r){var n={style:this.style,size:this.size,textSize:this.textSize,color:this.color,phantom:this.phantom,font:this.font,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontShape:this.fontShape,maxSize:this.maxSize,minRuleThickness:this.minRuleThickness};for(var i in r)r.hasOwnProperty(i)&&(n[i]=r[i]);return new o(n)},e.havingStyle=function(r){return this.style===r?this:this.extend({style:r,size:un(this.textSize,r)})},e.havingCrampedStyle=function(){return this.havingStyle(this.style.cramp())},e.havingSize=function(r){return this.size===r&&this.textSize===r?this:this.extend({style:this.style.text(),size:r,textSize:r,sizeMultiplier:ln[r-1]})},e.havingBaseStyle=function(r){r=r||this.style.text();var n=un(o.BASESIZE,r);return this.size===n&&this.textSize===o.BASESIZE&&this.style===r?this:this.extend({style:r,size:n})},e.havingBaseSizing=function(){var r;switch(this.style.id){case 4:case 5:r=3;break;case 6:case 7:r=1;break;default:r=6}return this.extend({style:this.style.text(),size:r})},e.withColor=function(r){return this.extend({color:r})},e.withPhantom=function(){return this.extend({phantom:!0})},e.withFont=function(r){return this.extend({font:r})},e.withTextFontFamily=function(r){return this.extend({fontFamily:r,font:""})},e.withTextFontWeight=function(r){return this.extend({fontWeight:r,font:""})},e.withTextFontShape=function(r){return this.extend({fontShape:r,font:""})},e.sizingClasses=function(r){return r.size!==this.size?["sizing","reset-size"+r.size,"size"+this.size]:[]},e.baseSizingClasses=function(){return this.size!==o.BASESIZE?["sizing","reset-size"+this.size,"size"+o.BASESIZE]:[]},e.fontMetrics=function(){return this._fontMetrics||(this._fontMetrics=Za(this.size)),this._fontMetrics},e.getColor=function(){return this.phantom?"transparent":this.color},o}();dn.BASESIZE=6;var ri=dn,yr={pt:1,mm:7227/2540,cm:7227/254,in:72.27,bp:803/800,pc:12,dd:1238/1157,cc:14856/1157,nd:685/642,nc:1370/107,sp:1/65536,px:803/800},ni={ex:!0,em:!0,mu:!0},hn=function(e){return typeof e!="string"&&(e=e.unit),e in yr||e in ni||e==="ex"},ce=function(e,t){var r;if(e.unit in yr)r=yr[e.unit]/t.fontMetrics().ptPerEm/t.sizeMultiplier;else if(e.unit==="mu")r=t.fontMetrics().cssEmPerMu;else{var n;if(t.style.isTight()?n=t.havingStyle(t.style.text()):n=t,e.unit==="ex")r=n.fontMetrics().xHeight;else if(e.unit==="em")r=n.fontMetrics().quad;else throw new x("Invalid unit: '"+e.unit+"'");n!==t&&(r*=n.sizeMultiplier/t.sizeMultiplier)}return Math.min(e.number*r,t.maxSize)},gr=["\\imath","ı","\\jmath","ȷ","\\pounds","\\mathsterling","\\textsterling","£"],Dt=function(e,t,r){return me[r][e]&&me[r][e].replace&&(e=me[r][e].replace),{value:e,metrics:sr(e,t,r)}},De=function(e,t,r,n,i){var l=Dt(e,t,r),m=l.metrics;e=l.value;var y;if(m){var c=m.italic;(r==="text"||n&&n.font==="mathit")&&(c=0),y=new Ne(e,m.height,m.depth,c,m.skew,m.width,i)}else typeof console<"u"&&console.warn("No character metrics "+("for '"+e+"' in style '"+t+"' and mode '"+r+"'")),y=new Ne(e,0,0,0,0,0,i);if(n){y.maxFontSize=n.sizeMultiplier,n.style.isTight()&&y.classes.push("mtight");var b=n.getColor();b&&(y.style.color=b)}return y},ai=function(e,t,r,n){return n===void 0&&(n=[]),r.font==="boldsymbol"&&Dt(e,"Main-Bold",t).metrics?De(e,"Main-Bold",t,r,n.concat(["mathbf"])):e==="\\"||me[t][e].font==="main"?De(e,"Main-Regular",t,r,n):De(e,"AMS-Regular",t,r,n.concat(["amsrm"]))},ii=function(e,t,r,n){return/[0-9]/.test(e.charAt(0))||N.contains(gr,e)?{fontName:"Main-Italic",fontClass:"mathit"}:{fontName:"Math-Italic",fontClass:"mathdefault"}},si=function(e,t,r,n){return N.contains(gr,e)?{fontName:"Main-Italic",fontClass:"mathit"}:/[0-9]/.test(e.charAt(0))?{fontName:"Caligraphic-Regular",fontClass:"mathcal"}:{fontName:"Math-Italic",fontClass:"mathdefault"}},oi=function(e,t,r,n){return Dt(e,"Math-BoldItalic",t).metrics?{fontName:"Math-BoldItalic",fontClass:"boldsymbol"}:{fontName:"Main-Bold",fontClass:"mathbf"}},li=function(e,t,r){var n=e.mode,i=e.text,l=["mord"],m=n==="math"||n==="text"&&t.font,y=m?t.font:t.fontFamily;if(i.charCodeAt(0)===55349){var c=ei(i,n),b=c[0],k=c[1];return De(i,b,n,t,l.concat(k))}else if(y){var A,W;if(y==="boldsymbol"||y==="mathnormal"){var E=y==="boldsymbol"?oi(i,n):si(i);A=E.fontName,W=[E.fontClass]}else N.contains(gr,i)?(A="Main-Italic",W=["mathit"]):m?(A=gn[y].fontName,W=[y]):(A=Ft(y,t.fontWeight,t.fontShape),W=[y,t.fontWeight,t.fontShape]);if(Dt(i,A,n).metrics)return De(i,A,n,t,l.concat(W));if(tn.hasOwnProperty(i)&&A.substr(0,10)==="Typewriter"){for(var j=[],L=0;L<i.length;L++)j.push(De(i[L],A,n,t,l.concat(W)));return yn(j)}}if(r==="mathord"){var H=ii(i);return De(i,H.fontName,n,t,l.concat([H.fontClass]))}else if(r==="textord"){var V=me[n][i]&&me[n][i].font;if(V==="ams"){var $=Ft("amsrm",t.fontWeight,t.fontShape);return De(i,$,n,t,l.concat("amsrm",t.fontWeight,t.fontShape))}else if(V==="main"||!V){var re=Ft("textrm",t.fontWeight,t.fontShape);return De(i,re,n,t,l.concat(t.fontWeight,t.fontShape))}else{var Z=Ft(V,t.fontWeight,t.fontShape);return De(i,Z,n,t,l.concat(Z,t.fontWeight,t.fontShape))}}else throw new Error("unexpected type: "+r+" in makeOrd")},ui=function(e,t){if(gt(e.classes)!==gt(t.classes)||e.skew!==t.skew||e.maxFontSize!==t.maxFontSize)return!1;for(var r in e.style)if(e.style.hasOwnProperty(r)&&e.style[r]!==t.style[r])return!1;for(var n in t.style)if(t.style.hasOwnProperty(n)&&e.style[n]!==t.style[n])return!1;return!0},di=function(e){for(var t=0;t<e.length-1;t++){var r=e[t],n=e[t+1];r instanceof Ne&&n instanceof Ne&&ui(r,n)&&(r.text+=n.text,r.height=Math.max(r.height,n.height),r.depth=Math.max(r.depth,n.depth),r.italic=n.italic,e.splice(t+1,1),t--)}return e},cr=function(e){for(var t=0,r=0,n=0,i=0;i<e.children.length;i++){var l=e.children[i];l.height>t&&(t=l.height),l.depth>r&&(r=l.depth),l.maxFontSize>n&&(n=l.maxFontSize)}e.height=t,e.depth=r,e.maxFontSize=n},Ee=function(e,t,r,n){var i=new St(e,t,r,n);return cr(i),i},mn=function(e,t,r,n){return new St(e,t,r,n)},hi=function(e,t,r){var n=Ee([e],[],t);return n.height=Math.max(r||t.fontMetrics().defaultRuleThickness,t.minRuleThickness),n.style.borderBottomWidth=n.height+"em",n.maxFontSize=1,n},mi=function(e,t,r,n){var i=new ar(e,t,r,n);return cr(i),i},yn=function(e){var t=new Tt(e);return cr(t),t},yi=function(e,t){return e instanceof Tt?Ee([],[e],t):e},gi=function(e){if(e.positionType==="individualShift"){for(var t=e.children,r=[t[0]],n=-t[0].shift-t[0].elem.depth,i=n,l=1;l<t.length;l++){var m=-t[l].shift-i-t[l].elem.depth,y=m-(t[l-1].elem.height+t[l-1].elem.depth);i=i+m,r.push({type:"kern",size:y}),r.push(t[l])}return{children:r,depth:n}}var c;if(e.positionType==="top"){for(var b=e.positionData,k=0;k<e.children.length;k++){var A=e.children[k];b-=A.type==="kern"?A.size:A.elem.height+A.elem.depth}c=b}else if(e.positionType==="bottom")c=-e.positionData;else{var W=e.children[0];if(W.type!=="elem")throw new Error('First child must have type "elem".');if(e.positionType==="shift")c=-W.elem.depth-e.positionData;else if(e.positionType==="firstBaseline")c=-W.elem.depth;else throw new Error("Invalid positionType "+e.positionType+".")}return{children:e.children,depth:c}},ci=function(e,t){for(var r=gi(e),n=r.children,i=r.depth,l=0,m=0;m<n.length;m++){var y=n[m];if(y.type==="elem"){var c=y.elem;l=Math.max(l,c.maxFontSize,c.height)}}l+=2;var b=Ee(["pstrut"],[]);b.style.height=l+"em";for(var k=[],A=i,W=i,E=i,j=0;j<n.length;j++){var L=n[j];if(L.type==="kern")E+=L.size;else{var H=L.elem,V=L.wrapperClasses||[],$=L.wrapperStyle||{},re=Ee(V,[b,H],void 0,$);re.style.top=-l-E-H.depth+"em",L.marginLeft&&(re.style.marginLeft=L.marginLeft),L.marginRight&&(re.style.marginRight=L.marginRight),k.push(re),E+=H.height+H.depth}A=Math.min(A,E),W=Math.max(W,E)}var Z=Ee(["vlist"],k);Z.style.height=W+"em";var se;if(A<0){var oe=Ee([],[]),he=Ee(["vlist"],[oe]);he.style.height=-A+"em";var ke=Ee(["vlist-s"],[new Ne("​")]);se=[Ee(["vlist-r"],[Z,ke]),Ee(["vlist-r"],[he])]}else se=[Ee(["vlist-r"],[Z])];var be=Ee(["vlist-t"],se);return se.length===2&&be.classes.push("vlist-t2"),be.height=W,be.depth=-A,be},pi=function(e,t){var r=Ee(["mspace"],[],t),n=ce(e,t);return r.style.marginRight=n+"em",r},Ft=function(e,t,r){var n="";switch(e){case"amsrm":n="AMS";break;case"textrm":n="Main";break;case"textsf":n="SansSerif";break;case"texttt":n="Typewriter";break;default:n=e}var i;return t==="textbf"&&r==="textit"?i="BoldItalic":t==="textbf"?i="Bold":t==="textit"?i="Italic":i="Regular",n+"-"+i},gn={mathbf:{variant:"bold",fontName:"Main-Bold"},mathrm:{variant:"normal",fontName:"Main-Regular"},textit:{variant:"italic",fontName:"Main-Italic"},mathit:{variant:"italic",fontName:"Main-Italic"},mathbb:{variant:"double-struck",fontName:"AMS-Regular"},mathcal:{variant:"script",fontName:"Caligraphic-Regular"},mathfrak:{variant:"fraktur",fontName:"Fraktur-Regular"},mathscr:{variant:"script",fontName:"Script-Regular"},mathsf:{variant:"sans-serif",fontName:"SansSerif-Regular"},mathtt:{variant:"monospace",fontName:"Typewriter-Regular"}},cn={vec:["vec",.471,.714],oiintSize1:["oiintSize1",.957,.499],oiintSize2:["oiintSize2",1.472,.659],oiiintSize1:["oiiintSize1",1.304,.499],oiiintSize2:["oiiintSize2",1.98,.659]},fi=function(e,t){var r=cn[e],n=r[0],i=r[1],l=r[2],m=new At(n),y=new ct([m],{width:i+"em",height:l+"em",style:"width:"+i+"em",viewBox:"0 0 "+1e3*i+" "+1e3*l,preserveAspectRatio:"xMinYMin"}),c=mn(["overlay"],[y],t);return c.height=l,c.style.height=l+"em",c.style.width=i+"em",c},T={fontMap:gn,makeSymbol:De,mathsym:ai,makeSpan:Ee,makeSvgSpan:mn,makeLineSpan:hi,makeAnchor:mi,makeFragment:yn,wrapFragment:yi,makeVList:ci,makeOrd:li,makeGlue:pi,staticSvg:fi,svgData:cn,tryCombineChars:di};function G(o,e){var t=we(o,e);if(!t)throw new Error("Expected node of type "+e+", but got "+(o?"node of type "+o.type:String(o)));return t}function we(o,e){return o&&o.type===e?o:null}function pn(o,e){var t=vi(o,e);if(!t)throw new Error('Expected node of type "atom" and family "'+e+'", but got '+(o?o.type==="atom"?"atom of family "+o.family:"node of type "+o.type:String(o)));return t}function vi(o,e){return o&&o.type==="atom"&&o.family===e?o:null}function fn(o){var e=Bt(o);if(!e)throw new Error("Expected node of symbol group type, but got "+(o?"node of type "+o.type:String(o)));return e}function Bt(o){return o&&(o.type==="atom"||Qa.hasOwnProperty(o.type))?o:null}var ue={number:3,unit:"mu"},ot={number:4,unit:"mu"},Ve={number:5,unit:"mu"},bi={mord:{mop:ue,mbin:ot,mrel:Ve,minner:ue},mop:{mord:ue,mop:ue,mrel:Ve,minner:ue},mbin:{mord:ot,mop:ot,mopen:ot,minner:ot},mrel:{mord:Ve,mop:Ve,mopen:Ve,minner:Ve},mopen:{},mclose:{mop:ue,mbin:ot,mrel:Ve,minner:ue},mpunct:{mord:ue,mop:ue,mrel:Ve,mopen:ue,mclose:ue,mpunct:ue,minner:ue},minner:{mord:ue,mop:ue,mbin:ot,mrel:Ve,mopen:ue,mpunct:ue,minner:ue}},wi={mord:{mop:ue},mop:{mord:ue,mop:ue},mbin:{},mrel:{},mopen:{},mclose:{mop:ue},mpunct:{},minner:{mop:ue}},vn={},Ut={},Ht={};function P(o){for(var e=o.type,t=o.names,r=o.props,n=o.handler,i=o.htmlBuilder,l=o.mathmlBuilder,m={type:e,numArgs:r.numArgs,argTypes:r.argTypes,greediness:r.greediness===void 0?1:r.greediness,allowedInText:!!r.allowedInText,allowedInMath:r.allowedInMath===void 0?!0:r.allowedInMath,numOptionalArgs:r.numOptionalArgs||0,infix:!!r.infix,handler:n},y=0;y<t.length;++y)vn[t[y]]=m;e&&(i&&(Ut[e]=i),l&&(Ht[e]=l))}function lt(o){var e=o.type,t=o.htmlBuilder,r=o.mathmlBuilder;P({type:e,names:[],props:{numArgs:0},handler:function(){throw new Error("Should never be called.")},htmlBuilder:t,mathmlBuilder:r})}var ve=function(e){var t=we(e,"ordgroup");return t?t.body:[e]},Ye=T.makeSpan,ki=["leftmost","mbin","mopen","mrel","mop","mpunct"],qi=["rightmost","mrel","mclose","mpunct"],Ti={display:F.DISPLAY,text:F.TEXT,script:F.SCRIPT,scriptscript:F.SCRIPTSCRIPT},Ai={mord:"mord",mop:"mop",mbin:"mbin",mrel:"mrel",mopen:"mopen",mclose:"mclose",mpunct:"mpunct",minner:"minner"},Oe=function(e,t,r,n){n===void 0&&(n=[null,null]);for(var i=[],l=0;l<e.length;l++){var m=X(e[l],t);if(m instanceof Tt){var y=m.children;i.push.apply(i,y)}else i.push(m)}if(!r)return i;var c=t;if(e.length===1){var b=we(e[0],"sizing")||we(e[0],"styling");b&&(b.type==="sizing"?c=t.havingSize(b.size):b.type==="styling"&&(c=t.havingStyle(Ti[b.style])))}var k=Ye([n[0]||"leftmost"],[],t),A=Ye([n[1]||"rightmost"],[],t);return bn(i,function(W,E){var j=E.classes[0],L=W.classes[0];j==="mbin"&&N.contains(qi,L)?E.classes[0]="mord":L==="mbin"&&N.contains(ki,j)&&(W.classes[0]="mord")},{node:k},A),bn(i,function(W,E){var j=pr(E),L=pr(W),H=j&&L?W.hasClass("mtight")?wi[j][L]:bi[j][L]:null;if(H)return T.makeGlue(H,c)},{node:k},A),i},bn=function o(e,t,r,n){n&&e.push(n);for(var i=0;i<e.length;i++){var l=e[i],m=wn(l);if(m){o(m.children,t,r);continue}if(l.classes[0]!=="mspace"){var y=t(l,r.node);y&&(r.insertAfter?r.insertAfter(y):(e.unshift(y),i++)),r.node=l,r.insertAfter=function(c){return function(b){e.splice(c+1,0,b),i++}}(i)}}n&&e.pop()},wn=function(e){return e instanceof Tt||e instanceof ar?e:null},xi=function o(e,t){var r=wn(e);if(r){var n=r.children;if(n.length){if(t==="right")return o(n[n.length-1],"right");if(t==="left")return o(n[0],"left")}}return e},pr=function(e,t){return e?(t&&(e=xi(e,t)),Ai[e.classes[0]]||null):null},xt=function(e,t){var r=["nulldelimiter"].concat(e.baseSizingClasses());return Ye(t.concat(r))},X=function(e,t,r){if(!e)return Ye();if(Ut[e.type]){var n=Ut[e.type](e,t);if(r&&t.size!==r.size){n=Ye(t.sizingClasses(r),[n],t);var i=t.sizeMultiplier/r.sizeMultiplier;n.height*=i,n.depth*=i}return n}else throw new x("Got group of unknown type: '"+e.type+"'")};function Vt(o,e){var t=Ye(["base"],o,e),r=Ye(["strut"]);return r.style.height=t.height+t.depth+"em",r.style.verticalAlign=-t.depth+"em",t.children.unshift(r),t}function fr(o,e){var t=null;o.length===1&&o[0].type==="tag"&&(t=o[0].tag,o=o[0].body);for(var r=Oe(o,e,!0),n=[],i=[],l=0;l<r.length;l++)if(i.push(r[l]),r[l].hasClass("mbin")||r[l].hasClass("mrel")||r[l].hasClass("allowbreak")){for(var m=!1;l<r.length-1&&r[l+1].hasClass("mspace")&&!r[l+1].hasClass("newline");)l++,i.push(r[l]),r[l].hasClass("nobreak")&&(m=!0);m||(n.push(Vt(i,e)),i=[])}else r[l].hasClass("newline")&&(i.pop(),i.length>0&&(n.push(Vt(i,e)),i=[]),n.push(r[l]));i.length>0&&n.push(Vt(i,e));var y;t&&(y=Vt(Oe(t,e,!0)),y.classes=["tag"],n.push(y));var c=Ye(["katex-html"],n);if(c.setAttribute("aria-hidden","true"),y){var b=y.children[0];b.style.height=c.height+c.depth+"em",b.style.verticalAlign=-c.depth+"em"}return c}function kn(o){return new Tt(o)}var Ie=function(){function o(t,r){this.type=void 0,this.attributes=void 0,this.children=void 0,this.type=t,this.attributes={},this.children=r||[]}var e=o.prototype;return e.setAttribute=function(r,n){this.attributes[r]=n},e.getAttribute=function(r){return this.attributes[r]},e.toNode=function(){var r=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var n in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,n)&&r.setAttribute(n,this.attributes[n]);for(var i=0;i<this.children.length;i++)r.appendChild(this.children[i].toNode());return r},e.toMarkup=function(){var r="<"+this.type;for(var n in this.attributes)Object.prototype.hasOwnProperty.call(this.attributes,n)&&(r+=" "+n+'="',r+=N.escape(this.attributes[n]),r+='"');r+=">";for(var i=0;i<this.children.length;i++)r+=this.children[i].toMarkup();return r+="</"+this.type+">",r},e.toText=function(){return this.children.map(function(r){return r.toText()}).join("")},o}(),Rt=function(){function o(t){this.text=void 0,this.text=t}var e=o.prototype;return e.toNode=function(){return document.createTextNode(this.text)},e.toMarkup=function(){return N.escape(this.toText())},e.toText=function(){return this.text},o}(),Ri=function(){function o(t){this.width=void 0,this.character=void 0,this.width=t,t>=.05555&&t<=.05556?this.character=" ":t>=.1666&&t<=.1667?this.character=" ":t>=.2222&&t<=.2223?this.character=" ":t>=.2777&&t<=.2778?this.character="  ":t>=-.05556&&t<=-.05555?this.character=" ⁣":t>=-.1667&&t<=-.1666?this.character=" ⁣":t>=-.2223&&t<=-.2222?this.character=" ⁣":t>=-.2778&&t<=-.2777?this.character=" ⁣":this.character=null}var e=o.prototype;return e.toNode=function(){if(this.character)return document.createTextNode(this.character);var r=document.createElementNS("http://www.w3.org/1998/Math/MathML","mspace");return r.setAttribute("width",this.width+"em"),r},e.toMarkup=function(){return this.character?"<mtext>"+this.character+"</mtext>":'<mspace width="'+this.width+'em"/>'},e.toText=function(){return this.character?this.character:" "},o}(),S={MathNode:Ie,TextNode:Rt,SpaceNode:Ri,newDocumentFragment:kn},Le=function(e,t,r){return me[t][e]&&me[t][e].replace&&e.charCodeAt(0)!==55349&&!(tn.hasOwnProperty(e)&&r&&(r.fontFamily&&r.fontFamily.substr(4,2)==="tt"||r.font&&r.font.substr(4,2)==="tt"))&&(e=me[t][e].replace),new S.TextNode(e)},vr=function(e){return e.length===1?e[0]:new S.MathNode("mrow",e)},br=function(e,t){if(t.fontFamily==="texttt")return"monospace";if(t.fontFamily==="textsf")return t.fontShape==="textit"&&t.fontWeight==="textbf"?"sans-serif-bold-italic":t.fontShape==="textit"?"sans-serif-italic":t.fontWeight==="textbf"?"bold-sans-serif":"sans-serif";if(t.fontShape==="textit"&&t.fontWeight==="textbf")return"bold-italic";if(t.fontShape==="textit")return"italic";if(t.fontWeight==="textbf")return"bold";var r=t.font;if(!r||r==="mathnormal")return null;var n=e.mode;if(r==="mathit")return"italic";if(r==="boldsymbol")return"bold-italic";if(r==="mathbf")return"bold";if(r==="mathbb")return"double-struck";if(r==="mathfrak")return"fraktur";if(r==="mathscr"||r==="mathcal")return"script";if(r==="mathsf")return"sans-serif";if(r==="mathtt")return"monospace";var i=e.text;if(N.contains(["\\imath","\\jmath"],i))return null;me[n][i]&&me[n][i].replace&&(i=me[n][i].replace);var l=T.fontMap[r].fontName;return sr(i,l,n)?T.fontMap[r].variant:null},Me=function(e,t,r){if(e.length===1){var n=ie(e[0],t);return r&&n instanceof Ie&&n.type==="mo"&&(n.setAttribute("lspace","0em"),n.setAttribute("rspace","0em")),[n]}for(var i=[],l,m=0;m<e.length;m++){var y=ie(e[m],t);if(y instanceof Ie&&l instanceof Ie){if(y.type==="mtext"&&l.type==="mtext"&&y.getAttribute("mathvariant")===l.getAttribute("mathvariant")){var c;(c=l.children).push.apply(c,y.children);continue}else if(y.type==="mn"&&l.type==="mn"){var b;(b=l.children).push.apply(b,y.children);continue}else if(y.type==="mi"&&y.children.length===1&&l.type==="mn"){var k=y.children[0];if(k instanceof Rt&&k.text==="."){var A;(A=l.children).push.apply(A,y.children);continue}}else if(l.type==="mi"&&l.children.length===1){var W=l.children[0];if(W instanceof Rt&&W.text==="̸"&&(y.type==="mo"||y.type==="mi"||y.type==="mn")){var E=y.children[0];E instanceof Rt&&E.text.length>0&&(E.text=E.text.slice(0,1)+"̸"+E.text.slice(1),i.pop())}}}i.push(y),l=y}return i},ut=function(e,t,r){return vr(Me(e,t,r))},ie=function(e,t){if(!e)return new S.MathNode("mrow");if(Ht[e.type]){var r=Ht[e.type](e,t);return r}else throw new x("Got group of unknown type: '"+e.type+"'")};function qn(o,e,t,r){var n=Me(o,t),i;n.length===1&&n[0]instanceof Ie&&N.contains(["mrow","mtable"],n[0].type)?i=n[0]:i=new S.MathNode("mrow",n);var l=new S.MathNode("annotation",[new S.TextNode(e)]);l.setAttribute("encoding","application/x-tex");var m=new S.MathNode("semantics",[i,l]),y=new S.MathNode("math",[m]);y.setAttribute("xmlns","http://www.w3.org/1998/Math/MathML");var c=r?"katex":"katex-mathml";return T.makeSpan([c],[y])}var Tn=function(e){return new ri({style:e.displayMode?F.DISPLAY:F.TEXT,maxSize:e.maxSize,minRuleThickness:e.minRuleThickness})},An=function(e,t){if(t.displayMode){var r=["katex-display"];t.leqno&&r.push("leqno"),t.fleqn&&r.push("fleqn"),e=T.makeSpan(r,[e])}return e},Oi=function(e,t,r){var n=Tn(r),i;if(r.output==="mathml")return qn(e,t,n,!0);if(r.output==="html"){var l=fr(e,n);i=T.makeSpan(["katex"],[l])}else{var m=qn(e,t,n,!1),y=fr(e,n);i=T.makeSpan(["katex"],[m,y])}return An(i,r)},Ci=function(e,t,r){var n=Tn(r),i=fr(e,n),l=T.makeSpan(["katex"],[i]);return An(l,r)},zi={widehat:"^",widecheck:"ˇ",widetilde:"~",utilde:"~",overleftarrow:"←",underleftarrow:"←",xleftarrow:"←",overrightarrow:"→",underrightarrow:"→",xrightarrow:"→",underbrace:"⏟",overbrace:"⏞",overgroup:"⏠",undergroup:"⏡",overleftrightarrow:"↔",underleftrightarrow:"↔",xleftrightarrow:"↔",Overrightarrow:"⇒",xRightarrow:"⇒",overleftharpoon:"↼",xleftharpoonup:"↼",overrightharpoon:"⇀",xrightharpoonup:"⇀",xLeftarrow:"⇐",xLeftrightarrow:"⇔",xhookleftarrow:"↩",xhookrightarrow:"↪",xmapsto:"↦",xrightharpoondown:"⇁",xleftharpoondown:"↽",xrightleftharpoons:"⇌",xleftrightharpoons:"⇋",xtwoheadleftarrow:"↞",xtwoheadrightarrow:"↠",xlongequal:"=",xtofrom:"⇄",xrightleftarrows:"⇄",xrightequilibrium:"⇌",xleftequilibrium:"⇋"},Wi=function(e){var t=new S.MathNode("mo",[new S.TextNode(zi[e.substr(1)])]);return t.setAttribute("stretchy","true"),t},Ei={overrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],overleftarrow:[["leftarrow"],.888,522,"xMinYMin"],underrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],underleftarrow:[["leftarrow"],.888,522,"xMinYMin"],xrightarrow:[["rightarrow"],1.469,522,"xMaxYMin"],xleftarrow:[["leftarrow"],1.469,522,"xMinYMin"],Overrightarrow:[["doublerightarrow"],.888,560,"xMaxYMin"],xRightarrow:[["doublerightarrow"],1.526,560,"xMaxYMin"],xLeftarrow:[["doubleleftarrow"],1.526,560,"xMinYMin"],overleftharpoon:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoonup:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoondown:[["leftharpoondown"],.888,522,"xMinYMin"],overrightharpoon:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoonup:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoondown:[["rightharpoondown"],.888,522,"xMaxYMin"],xlongequal:[["longequal"],.888,334,"xMinYMin"],xtwoheadleftarrow:[["twoheadleftarrow"],.888,334,"xMinYMin"],xtwoheadrightarrow:[["twoheadrightarrow"],.888,334,"xMaxYMin"],overleftrightarrow:[["leftarrow","rightarrow"],.888,522],overbrace:[["leftbrace","midbrace","rightbrace"],1.6,548],underbrace:[["leftbraceunder","midbraceunder","rightbraceunder"],1.6,548],underleftrightarrow:[["leftarrow","rightarrow"],.888,522],xleftrightarrow:[["leftarrow","rightarrow"],1.75,522],xLeftrightarrow:[["doubleleftarrow","doublerightarrow"],1.75,560],xrightleftharpoons:[["leftharpoondownplus","rightharpoonplus"],1.75,716],xleftrightharpoons:[["leftharpoonplus","rightharpoondownplus"],1.75,716],xhookleftarrow:[["leftarrow","righthook"],1.08,522],xhookrightarrow:[["lefthook","rightarrow"],1.08,522],overlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],underlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],overgroup:[["leftgroup","rightgroup"],.888,342],undergroup:[["leftgroupunder","rightgroupunder"],.888,342],xmapsto:[["leftmapsto","rightarrow"],1.5,522],xtofrom:[["leftToFrom","rightToFrom"],1.75,528],xrightleftarrows:[["baraboveleftarrow","rightarrowabovebar"],1.75,901],xrightequilibrium:[["baraboveshortleftharpoon","rightharpoonaboveshortbar"],1.75,716],xleftequilibrium:[["shortbaraboveleftharpoon","shortrightharpoonabovebar"],1.75,716]},Si=function(e){return e.type==="ordgroup"?e.body.length:1},ji=function(e,t){function r(){var y=4e5,c=e.label.substr(1);if(N.contains(["widehat","widecheck","widetilde","utilde"],c)){var b=e,k=Si(b.base),A,W,E;if(k>5)c==="widehat"||c==="widecheck"?(A=420,y=2364,E=.42,W=c+"4"):(A=312,y=2340,E=.34,W="tilde4");else{var j=[1,1,2,2,3,3][k];c==="widehat"||c==="widecheck"?(y=[0,1062,2364,2364,2364][j],A=[0,239,300,360,420][j],E=[0,.24,.3,.3,.36,.42][j],W=c+j):(y=[0,600,1033,2339,2340][j],A=[0,260,286,306,312][j],E=[0,.26,.286,.3,.306,.34][j],W="tilde"+j)}var L=new At(W),H=new ct([L],{width:"100%",height:E+"em",viewBox:"0 0 "+y+" "+A,preserveAspectRatio:"none"});return{span:T.makeSvgSpan([],[H],t),minWidth:0,height:E}}else{var V=[],$=Ei[c],re=$[0],Z=$[1],se=$[2],oe=se/1e3,he=re.length,ke,be;if(he===1){var J=$[3];ke=["hide-tail"],be=[J]}else if(he===2)ke=["halfarrow-left","halfarrow-right"],be=["xMinYMin","xMaxYMin"];else if(he===3)ke=["brace-left","brace-center","brace-right"],be=["xMinYMin","xMidYMin","xMaxYMin"];else throw new Error(`Correct katexImagesData or update code here to support
                    `+he+" children.");for(var Pe=0;Pe<he;Pe++){var rt=new At(re[Pe]),Fe=new ct([rt],{width:"400em",height:oe+"em",viewBox:"0 0 "+y+" "+se,preserveAspectRatio:be[Pe]+" slice"}),qe=T.makeSvgSpan([ke[Pe]],[Fe],t);if(he===1)return{span:qe,minWidth:Z,height:oe};qe.style.height=oe+"em",V.push(qe)}return{span:T.makeSpan(["stretchy"],V,t),minWidth:Z,height:oe}}}var n=r(),i=n.span,l=n.minWidth,m=n.height;return i.height=m,i.style.height=m+"em",l>0&&(i.style.minWidth=l+"em"),i},_i=function(e,t,r,n){var i,l=e.height+e.depth+2*r;if(/fbox|color/.test(t)){if(i=T.makeSpan(["stretchy",t],[],n),t==="fbox"){var m=n.color&&n.getColor();m&&(i.style.borderColor=m)}}else{var y=[];/^[bx]cancel$/.test(t)&&y.push(new ir({x1:"0",y1:"0",x2:"100%",y2:"100%","stroke-width":"0.046em"})),/^x?cancel$/.test(t)&&y.push(new ir({x1:"0",y1:"100%",x2:"100%",y2:"0","stroke-width":"0.046em"}));var c=new ct(y,{width:"100%",height:l+"em"});i=T.makeSvgSpan([],[c],n)}return i.height=l,i.style.height=l+"em",i},Ge={encloseSpan:_i,mathMLnode:Wi,svgSpan:ji},wr=function(e,t){var r,n,i=we(e,"supsub"),l;i?(n=G(i.base,"accent"),r=n.base,i.base=r,l=Xa(X(i,t)),i.base=n):(n=G(e,"accent"),r=n.base);var m=X(r,t.havingCrampedStyle()),y=n.isShifty&&N.isCharacterBox(r),c=0;if(y){var b=N.getBaseElem(r),k=X(b,t.havingCrampedStyle());c=Qr(k).skew}var A=Math.min(m.height,t.fontMetrics().xHeight),W;if(n.isStretchy)W=Ge.svgSpan(n,t),W=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:m},{type:"elem",elem:W,wrapperClasses:["svg-align"],wrapperStyle:c>0?{width:"calc(100% - "+2*c+"em)",marginLeft:2*c+"em"}:void 0}]},t);else{var E,j;n.label==="\\vec"?(E=T.staticSvg("vec",t),j=T.svgData.vec[1]):(E=T.makeOrd({mode:n.mode,text:n.label},t,"textord"),E=Qr(E),E.italic=0,j=E.width),W=T.makeSpan(["accent-body"],[E]);var L=n.label==="\\textcircled";L&&(W.classes.push("accent-full"),A=m.height);var H=c;L||(H-=j/2),W.style.left=H+"em",n.label==="\\textcircled"&&(W.style.top=".2em"),W=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:m},{type:"kern",size:-A},{type:"elem",elem:W}]},t)}var V=T.makeSpan(["mord","accent"],[W],t);return l?(l.children[0]=V,l.height=Math.max(V.height,l.height),l.classes[0]="mord",l):V},xn=function(e,t){var r=e.isStretchy?Ge.mathMLnode(e.label):new S.MathNode("mo",[Le(e.label,e.mode)]),n=new S.MathNode("mover",[ie(e.base,t),r]);return n.setAttribute("accent","true"),n},Ni=new RegExp(["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\mathring"].map(function(o){return"\\"+o}).join("|"));P({type:"accent",names:["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot","\\mathring","\\widecheck","\\widehat","\\widetilde","\\overrightarrow","\\overleftarrow","\\Overrightarrow","\\overleftrightarrow","\\overgroup","\\overlinesegment","\\overleftharpoon","\\overrightharpoon"],props:{numArgs:1},handler:function(e,t){var r=t[0],n=!Ni.test(e.funcName),i=!n||e.funcName==="\\widehat"||e.funcName==="\\widetilde"||e.funcName==="\\widecheck";return{type:"accent",mode:e.parser.mode,label:e.funcName,isStretchy:n,isShifty:i,base:r}},htmlBuilder:wr,mathmlBuilder:xn}),P({type:"accent",names:["\\'","\\`","\\^","\\~","\\=","\\u","\\.",'\\"',"\\r","\\H","\\v","\\textcircled"],props:{numArgs:1,allowedInText:!0,allowedInMath:!1},handler:function(e,t){var r=t[0];return{type:"accent",mode:e.parser.mode,label:e.funcName,isStretchy:!1,isShifty:!0,base:r}},htmlBuilder:wr,mathmlBuilder:xn}),P({type:"accentUnder",names:["\\underleftarrow","\\underrightarrow","\\underleftrightarrow","\\undergroup","\\underlinesegment","\\utilde"],props:{numArgs:1},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0];return{type:"accentUnder",mode:r.mode,label:n,base:i}},htmlBuilder:function(e,t){var r=X(e.base,t),n=Ge.svgSpan(e,t),i=e.label==="\\utilde"?.12:0,l=T.makeVList({positionType:"bottom",positionData:n.height+i,children:[{type:"elem",elem:n,wrapperClasses:["svg-align"]},{type:"kern",size:i},{type:"elem",elem:r}]},t);return T.makeSpan(["mord","accentunder"],[l],t)},mathmlBuilder:function(e,t){var r=Ge.mathMLnode(e.label),n=new S.MathNode("munder",[ie(e.base,t),r]);return n.setAttribute("accentunder","true"),n}});var Gt=function(e){var t=new S.MathNode("mpadded",e?[e]:[]);return t.setAttribute("width","+0.6em"),t.setAttribute("lspace","0.3em"),t};P({type:"xArrow",names:["\\xleftarrow","\\xrightarrow","\\xLeftarrow","\\xRightarrow","\\xleftrightarrow","\\xLeftrightarrow","\\xhookleftarrow","\\xhookrightarrow","\\xmapsto","\\xrightharpoondown","\\xrightharpoonup","\\xleftharpoondown","\\xleftharpoonup","\\xrightleftharpoons","\\xleftrightharpoons","\\xlongequal","\\xtwoheadrightarrow","\\xtwoheadleftarrow","\\xtofrom","\\xrightleftarrows","\\xrightequilibrium","\\xleftequilibrium"],props:{numArgs:1,numOptionalArgs:1},handler:function(e,t,r){var n=e.parser,i=e.funcName;return{type:"xArrow",mode:n.mode,label:i,body:t[0],below:r[0]}},htmlBuilder:function(e,t){var r=t.style,n=t.havingStyle(r.sup()),i=T.wrapFragment(X(e.body,n,t),t);i.classes.push("x-arrow-pad");var l;e.below&&(n=t.havingStyle(r.sub()),l=T.wrapFragment(X(e.below,n,t),t),l.classes.push("x-arrow-pad"));var m=Ge.svgSpan(e,t),y=-t.fontMetrics().axisHeight+.5*m.height,c=-t.fontMetrics().axisHeight-.5*m.height-.111;(i.depth>.25||e.label==="\\xleftequilibrium")&&(c-=i.depth);var b;if(l){var k=-t.fontMetrics().axisHeight+l.height+.5*m.height+.111;b=T.makeVList({positionType:"individualShift",children:[{type:"elem",elem:i,shift:c},{type:"elem",elem:m,shift:y},{type:"elem",elem:l,shift:k}]},t)}else b=T.makeVList({positionType:"individualShift",children:[{type:"elem",elem:i,shift:c},{type:"elem",elem:m,shift:y}]},t);return b.children[0].children[0].children[1].classes.push("svg-align"),T.makeSpan(["mrel","x-arrow"],[b],t)},mathmlBuilder:function(e,t){var r=Ge.mathMLnode(e.label),n;if(e.body){var i=Gt(ie(e.body,t));if(e.below){var l=Gt(ie(e.below,t));n=new S.MathNode("munderover",[r,l,i])}else n=new S.MathNode("mover",[r,i])}else if(e.below){var m=Gt(ie(e.below,t));n=new S.MathNode("munder",[r,m])}else n=Gt(),n=new S.MathNode("mover",[r,n]);return n}}),P({type:"textord",names:["\\@char"],props:{numArgs:1,allowedInText:!0},handler:function(e,t){for(var r=e.parser,n=G(t[0],"ordgroup"),i=n.body,l="",m=0;m<i.length;m++){var y=G(i[m],"textord");l+=y.text}var c=parseInt(l);if(isNaN(c))throw new x("\\@char has non-numeric argument "+l);return{type:"textord",mode:r.mode,text:String.fromCharCode(c)}}});var Rn=function(e,t){var r=Oe(e.body,t.withColor(e.color),!1);return T.makeFragment(r)},On=function(e,t){var r=Me(e.body,t.withColor(e.color)),n=new S.MathNode("mstyle",r);return n.setAttribute("mathcolor",e.color),n};P({type:"color",names:["\\textcolor"],props:{numArgs:2,allowedInText:!0,greediness:3,argTypes:["color","original"]},handler:function(e,t){var r=e.parser,n=G(t[0],"color-token").color,i=t[1];return{type:"color",mode:r.mode,color:n,body:ve(i)}},htmlBuilder:Rn,mathmlBuilder:On}),P({type:"color",names:["\\color"],props:{numArgs:1,allowedInText:!0,greediness:3,argTypes:["color"]},handler:function(e,t){var r=e.parser,n=e.breakOnTokenText,i=G(t[0],"color-token").color;r.gullet.macros.set("\\current@color",i);var l=r.parseExpression(!0,n);return{type:"color",mode:r.mode,color:i,body:l}},htmlBuilder:Rn,mathmlBuilder:On}),P({type:"cr",names:["\\cr","\\newline"],props:{numArgs:0,numOptionalArgs:1,argTypes:["size"],allowedInText:!0},handler:function(e,t,r){var n=e.parser,i=e.funcName,l=r[0],m=i==="\\cr",y=!1;return m||(n.settings.displayMode&&n.settings.useStrictBehavior("newLineInDisplayMode","In LaTeX, \\\\ or \\newline does nothing in display mode")?y=!1:y=!0),{type:"cr",mode:n.mode,newLine:y,newRow:m,size:l&&G(l,"size").value}},htmlBuilder:function(e,t){if(e.newRow)throw new x("\\cr valid only within a tabular/array environment");var r=T.makeSpan(["mspace"],[],t);return e.newLine&&(r.classes.push("newline"),e.size&&(r.style.marginTop=ce(e.size,t)+"em")),r},mathmlBuilder:function(e,t){var r=new S.MathNode("mspace");return e.newLine&&(r.setAttribute("linebreak","newline"),e.size&&r.setAttribute("height",ce(e.size,t)+"em")),r}});var Ot=function(e,t,r){var n=me.math[e]&&me.math[e].replace,i=sr(n||e,t,r);if(!i)throw new Error("Unsupported symbol "+e+" and font size "+t+".");return i},kr=function(e,t,r,n){var i=r.havingBaseStyle(t),l=T.makeSpan(n.concat(i.sizingClasses(r)),[e],r),m=i.sizeMultiplier/r.sizeMultiplier;return l.height*=m,l.depth*=m,l.maxFontSize=i.sizeMultiplier,l},Cn=function(e,t,r){var n=t.havingBaseStyle(r),i=(1-t.sizeMultiplier/n.sizeMultiplier)*t.fontMetrics().axisHeight;e.classes.push("delimcenter"),e.style.top=i+"em",e.height-=i,e.depth+=i},Ii=function(e,t,r,n,i,l){var m=T.makeSymbol(e,"Main-Regular",i,n),y=kr(m,t,n,l);return r&&Cn(y,n,t),y},Li=function(e,t,r,n){return T.makeSymbol(e,"Size"+t+"-Regular",r,n)},zn=function(e,t,r,n,i,l){var m=Li(e,t,i,n),y=kr(T.makeSpan(["delimsizing","size"+t],[m],n),F.TEXT,n,l);return r&&Cn(y,n,F.TEXT),y},Ze=function(e,t,r){var n;t==="Size1-Regular"?n="delim-size1":n="delim-size4";var i=T.makeSpan(["delimsizinginner",n],[T.makeSpan([],[T.makeSymbol(e,t,r)])]);return{type:"elem",elem:i}},Ct={type:"kern",size:-.005},Wn=function(e,t,r,n,i,l){var m,y,c,b;m=c=b=e,y=null;var k="Size1-Regular";e==="\\uparrow"?c=b="⏐":e==="\\Uparrow"?c=b="‖":e==="\\downarrow"?m=c="⏐":e==="\\Downarrow"?m=c="‖":e==="\\updownarrow"?(m="\\uparrow",c="⏐",b="\\downarrow"):e==="\\Updownarrow"?(m="\\Uparrow",c="‖",b="\\Downarrow"):e==="["||e==="\\lbrack"?(m="⎡",c="⎢",b="⎣",k="Size4-Regular"):e==="]"||e==="\\rbrack"?(m="⎤",c="⎥",b="⎦",k="Size4-Regular"):e==="\\lfloor"||e==="⌊"?(c=m="⎢",b="⎣",k="Size4-Regular"):e==="\\lceil"||e==="⌈"?(m="⎡",c=b="⎢",k="Size4-Regular"):e==="\\rfloor"||e==="⌋"?(c=m="⎥",b="⎦",k="Size4-Regular"):e==="\\rceil"||e==="⌉"?(m="⎤",c=b="⎥",k="Size4-Regular"):e==="("||e==="\\lparen"?(m="⎛",c="⎜",b="⎝",k="Size4-Regular"):e===")"||e==="\\rparen"?(m="⎞",c="⎟",b="⎠",k="Size4-Regular"):e==="\\{"||e==="\\lbrace"?(m="⎧",y="⎨",b="⎩",c="⎪",k="Size4-Regular"):e==="\\}"||e==="\\rbrace"?(m="⎫",y="⎬",b="⎭",c="⎪",k="Size4-Regular"):e==="\\lgroup"||e==="⟮"?(m="⎧",b="⎩",c="⎪",k="Size4-Regular"):e==="\\rgroup"||e==="⟯"?(m="⎫",b="⎭",c="⎪",k="Size4-Regular"):e==="\\lmoustache"||e==="⎰"?(m="⎧",b="⎭",c="⎪",k="Size4-Regular"):(e==="\\rmoustache"||e==="⎱")&&(m="⎫",b="⎩",c="⎪",k="Size4-Regular");var A=Ot(m,k,i),W=A.height+A.depth,E=Ot(c,k,i),j=E.height+E.depth,L=Ot(b,k,i),H=L.height+L.depth,V=0,$=1;if(y!==null){var re=Ot(y,k,i);V=re.height+re.depth,$=2}var Z=W+H+V,se=Math.max(0,Math.ceil((t-Z)/($*j))),oe=Z+se*$*j,he=n.fontMetrics().axisHeight;r&&(he*=n.sizeMultiplier);var ke=oe/2-he,be=(se+1)*.005-j,J=[];if(J.push(Ze(b,k,i)),y===null)for(var Pe=0;Pe<se;Pe++)J.push(Ct),J.push(Ze(c,k,i));else{for(var rt=0;rt<se;rt++)J.push(Ct),J.push(Ze(c,k,i));J.push({type:"kern",size:be}),J.push(Ze(c,k,i)),J.push(Ct),J.push(Ze(y,k,i));for(var Fe=0;Fe<se;Fe++)J.push(Ct),J.push(Ze(c,k,i))}J.push({type:"kern",size:be}),J.push(Ze(c,k,i)),J.push(Ct),J.push(Ze(m,k,i));var qe=n.havingBaseStyle(F.TEXT),nt=T.makeVList({positionType:"bottom",positionData:ke,children:J},qe);return kr(T.makeSpan(["delimsizing","mult"],[nt],qe),F.TEXT,n,l)},qr=80,Tr=.08,Ar=function(e,t,r,n,i){var l=Ga(e,n,r),m=new At(e,l),y=new ct([m],{width:"400em",height:t+"em",viewBox:"0 0 400000 "+r,preserveAspectRatio:"xMinYMin slice"});return T.makeSvgSpan(["hide-tail"],[y],i)},Mi=function(e,t){var r=t.havingBaseSizing(),n=_n("\\surd",e*r.sizeMultiplier,jn,r),i=r.sizeMultiplier,l=Math.max(0,t.minRuleThickness-t.fontMetrics().sqrtRuleThickness),m,y=0,c=0,b=0,k;return n.type==="small"?(b=1e3+1e3*l+qr,e<1?i=1:e<1.4&&(i=.7),y=(1+l+Tr)/i,c=(1+l)/i,m=Ar("sqrtMain",y,b,l,t),m.style.minWidth="0.853em",k=.833/i):n.type==="large"?(b=(1e3+qr)*$t[n.size],c=($t[n.size]+l)/i,y=($t[n.size]+l+Tr)/i,m=Ar("sqrtSize"+n.size,y,b,l,t),m.style.minWidth="1.02em",k=1/i):(y=e+l+Tr,c=e+l,b=Math.floor(1e3*e+l)+qr,m=Ar("sqrtTall",y,b,l,t),m.style.minWidth="0.742em",k=1.056),m.height=c,m.style.height=y+"em",{span:m,advanceWidth:k,ruleWidth:(t.fontMetrics().sqrtRuleThickness+l)*i}},En=["(","\\lparen",")","\\rparen","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","⌊","⌋","\\lceil","\\rceil","⌈","⌉","\\surd"],Pi=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","⟮","⟯","\\lmoustache","\\rmoustache","⎰","⎱"],Sn=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"],$t=[0,1.2,1.8,2.4,3],Di=function(e,t,r,n,i){if(e==="<"||e==="\\lt"||e==="⟨"?e="\\langle":(e===">"||e==="\\gt"||e==="⟩")&&(e="\\rangle"),N.contains(En,e)||N.contains(Sn,e))return zn(e,t,!1,r,n,i);if(N.contains(Pi,e))return Wn(e,$t[t],!1,r,n,i);throw new x("Illegal delimiter: '"+e+"'")},Fi=[{type:"small",style:F.SCRIPTSCRIPT},{type:"small",style:F.SCRIPT},{type:"small",style:F.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}],Bi=[{type:"small",style:F.SCRIPTSCRIPT},{type:"small",style:F.SCRIPT},{type:"small",style:F.TEXT},{type:"stack"}],jn=[{type:"small",style:F.SCRIPTSCRIPT},{type:"small",style:F.SCRIPT},{type:"small",style:F.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}],Ui=function(e){if(e.type==="small")return"Main-Regular";if(e.type==="large")return"Size"+e.size+"-Regular";if(e.type==="stack")return"Size4-Regular";throw new Error("Add support for delim type '"+e.type+"' here.")},_n=function(e,t,r,n){for(var i=Math.min(2,3-n.style.size),l=i;l<r.length&&r[l].type!=="stack";l++){var m=Ot(e,Ui(r[l]),"math"),y=m.height+m.depth;if(r[l].type==="small"){var c=n.havingBaseStyle(r[l].style);y*=c.sizeMultiplier}if(y>t)return r[l]}return r[r.length-1]},Nn=function(e,t,r,n,i,l){e==="<"||e==="\\lt"||e==="⟨"?e="\\langle":(e===">"||e==="\\gt"||e==="⟩")&&(e="\\rangle");var m;N.contains(Sn,e)?m=Fi:N.contains(En,e)?m=jn:m=Bi;var y=_n(e,t,m,n);return y.type==="small"?Ii(e,y.style,r,n,i,l):y.type==="large"?zn(e,y.size,r,n,i,l):Wn(e,t,r,n,i,l)},Hi=function(e,t,r,n,i,l){var m=n.fontMetrics().axisHeight*n.sizeMultiplier,y=901,c=5/n.fontMetrics().ptPerEm,b=Math.max(t-m,r+m),k=Math.max(b/500*y,2*b-c);return Nn(e,k,!0,n,i,l)},Je={sqrtImage:Mi,sizedDelim:Di,customSizedDelim:Nn,leftRightDelim:Hi},In={"\\bigl":{mclass:"mopen",size:1},"\\Bigl":{mclass:"mopen",size:2},"\\biggl":{mclass:"mopen",size:3},"\\Biggl":{mclass:"mopen",size:4},"\\bigr":{mclass:"mclose",size:1},"\\Bigr":{mclass:"mclose",size:2},"\\biggr":{mclass:"mclose",size:3},"\\Biggr":{mclass:"mclose",size:4},"\\bigm":{mclass:"mrel",size:1},"\\Bigm":{mclass:"mrel",size:2},"\\biggm":{mclass:"mrel",size:3},"\\Biggm":{mclass:"mrel",size:4},"\\big":{mclass:"mord",size:1},"\\Big":{mclass:"mord",size:2},"\\bigg":{mclass:"mord",size:3},"\\Bigg":{mclass:"mord",size:4}},Vi=["(","\\lparen",")","\\rparen","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","⌊","⌋","\\lceil","\\rceil","⌈","⌉","<",">","\\langle","⟨","\\rangle","⟩","\\lt","\\gt","\\lvert","\\rvert","\\lVert","\\rVert","\\lgroup","\\rgroup","⟮","⟯","\\lmoustache","\\rmoustache","⎰","⎱","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."];function Kt(o,e){var t=Bt(o);if(t&&N.contains(Vi,t.text))return t;throw new x("Invalid delimiter: '"+(t?t.text:JSON.stringify(o))+"' after '"+e.funcName+"'",o)}P({type:"delimsizing",names:["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg"],props:{numArgs:1},handler:function(e,t){var r=Kt(t[0],e);return{type:"delimsizing",mode:e.parser.mode,size:In[e.funcName].size,mclass:In[e.funcName].mclass,delim:r.text}},htmlBuilder:function(e,t){return e.delim==="."?T.makeSpan([e.mclass]):Je.sizedDelim(e.delim,e.size,t,e.mode,[e.mclass])},mathmlBuilder:function(e){var t=[];e.delim!=="."&&t.push(Le(e.delim,e.mode));var r=new S.MathNode("mo",t);return e.mclass==="mopen"||e.mclass==="mclose"?r.setAttribute("fence","true"):r.setAttribute("fence","false"),r}});function Ln(o){if(!o.body)throw new Error("Bug: The leftright ParseNode wasn't fully parsed.")}P({type:"leftright-right",names:["\\right"],props:{numArgs:1},handler:function(e,t){var r=e.parser.gullet.macros.get("\\current@color");if(r&&typeof r!="string")throw new x("\\current@color set to non-string in \\right");return{type:"leftright-right",mode:e.parser.mode,delim:Kt(t[0],e).text,color:r}}}),P({type:"leftright",names:["\\left"],props:{numArgs:1},handler:function(e,t){var r=Kt(t[0],e),n=e.parser;++n.leftrightDepth;var i=n.parseExpression(!1);--n.leftrightDepth,n.expect("\\right",!1);var l=G(n.parseFunction(),"leftright-right");return{type:"leftright",mode:n.mode,body:i,left:r.text,right:l.delim,rightColor:l.color}},htmlBuilder:function(e,t){Ln(e);for(var r=Oe(e.body,t,!0,["mopen","mclose"]),n=0,i=0,l=!1,m=0;m<r.length;m++)r[m].isMiddle?l=!0:(n=Math.max(r[m].height,n),i=Math.max(r[m].depth,i));n*=t.sizeMultiplier,i*=t.sizeMultiplier;var y;if(e.left==="."?y=xt(t,["mopen"]):y=Je.leftRightDelim(e.left,n,i,t,e.mode,["mopen"]),r.unshift(y),l)for(var c=1;c<r.length;c++){var b=r[c],k=b.isMiddle;k&&(r[c]=Je.leftRightDelim(k.delim,n,i,k.options,e.mode,[]))}var A;if(e.right===".")A=xt(t,["mclose"]);else{var W=e.rightColor?t.withColor(e.rightColor):t;A=Je.leftRightDelim(e.right,n,i,W,e.mode,["mclose"])}return r.push(A),T.makeSpan(["minner"],r,t)},mathmlBuilder:function(e,t){Ln(e);var r=Me(e.body,t);if(e.left!=="."){var n=new S.MathNode("mo",[Le(e.left,e.mode)]);n.setAttribute("fence","true"),r.unshift(n)}if(e.right!=="."){var i=new S.MathNode("mo",[Le(e.right,e.mode)]);i.setAttribute("fence","true"),e.rightColor&&i.setAttribute("mathcolor",e.rightColor),r.push(i)}return vr(r)}}),P({type:"middle",names:["\\middle"],props:{numArgs:1},handler:function(e,t){var r=Kt(t[0],e);if(!e.parser.leftrightDepth)throw new x("\\middle without preceding \\left",r);return{type:"middle",mode:e.parser.mode,delim:r.text}},htmlBuilder:function(e,t){var r;if(e.delim===".")r=xt(t,[]);else{r=Je.sizedDelim(e.delim,1,t,e.mode,[]);var n={delim:e.delim,options:t};r.isMiddle=n}return r},mathmlBuilder:function(e,t){var r=e.delim==="\\vert"||e.delim==="|"?Le("|","text"):Le(e.delim,e.mode),n=new S.MathNode("mo",[r]);return n.setAttribute("fence","true"),n.setAttribute("lspace","0.05em"),n.setAttribute("rspace","0.05em"),n}});var xr=function(e,t){var r=T.wrapFragment(X(e.body,t),t),n=e.label.substr(1),i=t.sizeMultiplier,l,m=0,y=N.isCharacterBox(e.body);if(n==="sout")l=T.makeSpan(["stretchy","sout"]),l.height=t.fontMetrics().defaultRuleThickness/i,m=-.5*t.fontMetrics().xHeight;else{/cancel/.test(n)?y||r.classes.push("cancel-pad"):r.classes.push("boxpad");var c=0,b=0;/box/.test(n)?(b=Math.max(t.fontMetrics().fboxrule,t.minRuleThickness),c=t.fontMetrics().fboxsep+(n==="colorbox"?0:b)):c=y?.2:0,l=Ge.encloseSpan(r,n,c,t),/fbox|boxed|fcolorbox/.test(n)&&(l.style.borderStyle="solid",l.style.borderWidth=b+"em"),m=r.depth+c,e.backgroundColor&&(l.style.backgroundColor=e.backgroundColor,e.borderColor&&(l.style.borderColor=e.borderColor))}var k;return e.backgroundColor?k=T.makeVList({positionType:"individualShift",children:[{type:"elem",elem:l,shift:m},{type:"elem",elem:r,shift:0}]},t):k=T.makeVList({positionType:"individualShift",children:[{type:"elem",elem:r,shift:0},{type:"elem",elem:l,shift:m,wrapperClasses:/cancel/.test(n)?["svg-align"]:[]}]},t),/cancel/.test(n)&&(k.height=r.height,k.depth=r.depth),/cancel/.test(n)&&!y?T.makeSpan(["mord","cancel-lap"],[k],t):T.makeSpan(["mord"],[k],t)},Rr=function(e,t){var r=0,n=new S.MathNode(e.label.indexOf("colorbox")>-1?"mpadded":"menclose",[ie(e.body,t)]);switch(e.label){case"\\cancel":n.setAttribute("notation","updiagonalstrike");break;case"\\bcancel":n.setAttribute("notation","downdiagonalstrike");break;case"\\sout":n.setAttribute("notation","horizontalstrike");break;case"\\fbox":n.setAttribute("notation","box");break;case"\\fcolorbox":case"\\colorbox":if(r=t.fontMetrics().fboxsep*t.fontMetrics().ptPerEm,n.setAttribute("width","+"+2*r+"pt"),n.setAttribute("height","+"+2*r+"pt"),n.setAttribute("lspace",r+"pt"),n.setAttribute("voffset",r+"pt"),e.label==="\\fcolorbox"){var i=Math.max(t.fontMetrics().fboxrule,t.minRuleThickness);n.setAttribute("style","border: "+i+"em solid "+String(e.borderColor))}break;case"\\xcancel":n.setAttribute("notation","updiagonalstrike downdiagonalstrike");break}return e.backgroundColor&&n.setAttribute("mathbackground",e.backgroundColor),n};P({type:"enclose",names:["\\colorbox"],props:{numArgs:2,allowedInText:!0,greediness:3,argTypes:["color","text"]},handler:function(e,t,r){var n=e.parser,i=e.funcName,l=G(t[0],"color-token").color,m=t[1];return{type:"enclose",mode:n.mode,label:i,backgroundColor:l,body:m}},htmlBuilder:xr,mathmlBuilder:Rr}),P({type:"enclose",names:["\\fcolorbox"],props:{numArgs:3,allowedInText:!0,greediness:3,argTypes:["color","color","text"]},handler:function(e,t,r){var n=e.parser,i=e.funcName,l=G(t[0],"color-token").color,m=G(t[1],"color-token").color,y=t[2];return{type:"enclose",mode:n.mode,label:i,backgroundColor:m,borderColor:l,body:y}},htmlBuilder:xr,mathmlBuilder:Rr}),P({type:"enclose",names:["\\fbox"],props:{numArgs:1,argTypes:["hbox"],allowedInText:!0},handler:function(e,t){var r=e.parser;return{type:"enclose",mode:r.mode,label:"\\fbox",body:t[0]}}}),P({type:"enclose",names:["\\cancel","\\bcancel","\\xcancel","\\sout"],props:{numArgs:1},handler:function(e,t,r){var n=e.parser,i=e.funcName,l=t[0];return{type:"enclose",mode:n.mode,label:i,body:l}},htmlBuilder:xr,mathmlBuilder:Rr});var Mn={};function Qe(o){for(var e=o.type,t=o.names,r=o.props,n=o.handler,i=o.htmlBuilder,l=o.mathmlBuilder,m={type:e,numArgs:r.numArgs||0,greediness:1,allowedInText:!1,numOptionalArgs:0,handler:n},y=0;y<t.length;++y)Mn[t[y]]=m;i&&(Ut[e]=i),l&&(Ht[e]=l)}function Pn(o){var e=[];o.consumeSpaces();for(var t=o.fetch().text;t==="\\hline"||t==="\\hdashline";)o.consume(),e.push(t==="\\hdashline"),o.consumeSpaces(),t=o.fetch().text;return e}function dt(o,e,t){var r=e.hskipBeforeAndAfter,n=e.addJot,i=e.cols,l=e.arraystretch,m=e.colSeparationType;if(o.gullet.beginGroup(),o.gullet.macros.set("\\\\","\\cr"),!l){var y=o.gullet.expandMacroAsText("\\arraystretch");if(y==null)l=1;else if(l=parseFloat(y),!l||l<0)throw new x("Invalid \\arraystretch: "+y)}o.gullet.beginGroup();var c=[],b=[c],k=[],A=[];for(A.push(Pn(o));;){var W=o.parseExpression(!1,"\\cr");o.gullet.endGroup(),o.gullet.beginGroup(),W={type:"ordgroup",mode:o.mode,body:W},t&&(W={type:"styling",mode:o.mode,style:t,body:[W]}),c.push(W);var E=o.fetch().text;if(E==="&")o.consume();else if(E==="\\end"){c.length===1&&W.type==="styling"&&W.body[0].body.length===0&&b.pop(),A.length<b.length+1&&A.push([]);break}else if(E==="\\cr"){var j=G(o.parseFunction(),"cr");k.push(j.size),A.push(Pn(o)),c=[],b.push(c)}else throw new x("Expected & or \\\\ or \\cr or \\end",o.nextToken)}return o.gullet.endGroup(),o.gullet.endGroup(),{type:"array",mode:o.mode,addJot:n,arraystretch:l,body:b,cols:i,rowGaps:k,hskipBeforeAndAfter:r,hLinesBeforeRow:A,colSeparationType:m}}function Or(o){return o.substr(0,1)==="d"?"display":"text"}var et=function(e,t){var r,n,i=e.body.length,l=e.hLinesBeforeRow,m=0,y=new Array(i),c=[],b=Math.max(t.fontMetrics().arrayRuleWidth,t.minRuleThickness),k=1/t.fontMetrics().ptPerEm,A=5*k;if(e.colSeparationType&&e.colSeparationType==="small"){var W=t.havingStyle(F.SCRIPT).sizeMultiplier;A=.2778*(W/t.sizeMultiplier)}var E=12*k,j=3*k,L=e.arraystretch*E,H=.7*L,V=.3*L,$=0;function re(Aa){for(var Jt=0;Jt<Aa.length;++Jt)Jt>0&&($+=.25),c.push({pos:$,isDashed:Aa[Jt]})}for(re(l[0]),r=0;r<e.body.length;++r){var Z=e.body[r],se=H,oe=V;m<Z.length&&(m=Z.length);var he=new Array(Z.length);for(n=0;n<Z.length;++n){var ke=X(Z[n],t);oe<ke.depth&&(oe=ke.depth),se<ke.height&&(se=ke.height),he[n]=ke}var be=e.rowGaps[r],J=0;be&&(J=ce(be,t),J>0&&(J+=V,oe<J&&(oe=J),J=0)),e.addJot&&(oe+=j),he.height=se,he.depth=oe,$+=se,he.pos=$,$+=oe+J,y[r]=he,re(l[r+1])}var Pe=$/2+t.fontMetrics().axisHeight,rt=e.cols||[],Fe=[],qe,nt;for(n=0,nt=0;n<m||nt<rt.length;++n,++nt){for(var $e=rt[nt]||{},ka=!0;$e.type==="separator";){if(ka||(qe=T.makeSpan(["arraycolsep"],[]),qe.style.width=t.fontMetrics().doubleRuleSep+"em",Fe.push(qe)),$e.separator==="|"||$e.separator===":"){var ps=$e.separator==="|"?"solid":"dashed",vt=T.makeSpan(["vertical-separator"],[],t);vt.style.height=$+"em",vt.style.borderRightWidth=b+"em",vt.style.borderRightStyle=ps,vt.style.margin="0 -"+b/2+"em",vt.style.verticalAlign=-($-Pe)+"em",Fe.push(vt)}else throw new x("Invalid separator type: "+$e.separator);nt++,$e=rt[nt]||{},ka=!1}if(!(n>=m)){var bt=void 0;(n>0||e.hskipBeforeAndAfter)&&(bt=N.deflt($e.pregap,A),bt!==0&&(qe=T.makeSpan(["arraycolsep"],[]),qe.style.width=bt+"em",Fe.push(qe)));var wt=[];for(r=0;r<i;++r){var Yt=y[r],Zt=Yt[n];if(Zt){var fs=Yt.pos-Pe;Zt.depth=Yt.depth,Zt.height=Yt.height,wt.push({type:"elem",elem:Zt,shift:fs})}}wt=T.makeVList({positionType:"individualShift",children:wt},t),wt=T.makeSpan(["col-align-"+($e.align||"c")],[wt]),Fe.push(wt),(n<m-1||e.hskipBeforeAndAfter)&&(bt=N.deflt($e.postgap,A),bt!==0&&(qe=T.makeSpan(["arraycolsep"],[]),qe.style.width=bt+"em",Fe.push(qe)))}}if(y=T.makeSpan(["mtable"],Fe),c.length>0){for(var vs=T.makeLineSpan("hline",t,b),bs=T.makeLineSpan("hdashline",t,b),Fr=[{type:"elem",elem:y,shift:0}];c.length>0;){var qa=c.pop(),Ta=qa.pos-Pe;qa.isDashed?Fr.push({type:"elem",elem:bs,shift:Ta}):Fr.push({type:"elem",elem:vs,shift:Ta})}y=T.makeVList({positionType:"individualShift",children:Fr},t)}return T.makeSpan(["mord"],[y],t)},Gi={c:"center ",l:"left ",r:"right "},tt=function(e,t){var r=new S.MathNode("mtable",e.body.map(function($){return new S.MathNode("mtr",$.map(function(re){return new S.MathNode("mtd",[ie(re,t)])}))})),n=e.arraystretch===.5?.1:.16+e.arraystretch-1+(e.addJot?.09:0);r.setAttribute("rowspacing",n+"em");var i="",l="";if(e.cols){var m=e.cols,y="",c=!1,b=0,k=m.length;m[0].type==="separator"&&(i+="top ",b=1),m[m.length-1].type==="separator"&&(i+="bottom ",k-=1);for(var A=b;A<k;A++)m[A].type==="align"?(l+=Gi[m[A].align],c&&(y+="none "),c=!0):m[A].type==="separator"&&c&&(y+=m[A].separator==="|"?"solid ":"dashed ",c=!1);r.setAttribute("columnalign",l.trim()),/[sd]/.test(y)&&r.setAttribute("columnlines",y.trim())}if(e.colSeparationType==="align"){for(var W=e.cols||[],E="",j=1;j<W.length;j++)E+=j%2?"0em ":"1em ";r.setAttribute("columnspacing",E.trim())}else e.colSeparationType==="alignat"?r.setAttribute("columnspacing","0em"):e.colSeparationType==="small"?r.setAttribute("columnspacing","0.2778em"):r.setAttribute("columnspacing","1em");var L="",H=e.hLinesBeforeRow;i+=H[0].length>0?"left ":"",i+=H[H.length-1].length>0?"right ":"";for(var V=1;V<H.length-1;V++)L+=H[V].length===0?"none ":H[V][0]?"dashed ":"solid ";return/[sd]/.test(L)&&r.setAttribute("rowlines",L.trim()),i!==""&&(r=new S.MathNode("menclose",[r]),r.setAttribute("notation",i.trim())),e.arraystretch&&e.arraystretch<1&&(r=new S.MathNode("mstyle",[r]),r.setAttribute("scriptlevel","1")),r},Dn=function(e,t){var r=[],n=dt(e.parser,{cols:r,addJot:!0},"display"),i,l=0,m={type:"ordgroup",mode:e.mode,body:[]},y=we(t[0],"ordgroup");if(y){for(var c="",b=0;b<y.body.length;b++){var k=G(y.body[b],"textord");c+=k.text}i=Number(c),l=i*2}var A=!l;n.body.forEach(function(L){for(var H=1;H<L.length;H+=2){var V=G(L[H],"styling"),$=G(V.body[0],"ordgroup");$.body.unshift(m)}if(A)l<L.length&&(l=L.length);else{var re=L.length/2;if(i<re)throw new x("Too many math in a row: "+("expected "+i+", but got "+re),L[0])}});for(var W=0;W<l;++W){var E="r",j=0;W%2===1?E="l":W>0&&A&&(j=1),r[W]={type:"align",align:E,pregap:j,postgap:0}}return n.colSeparationType=A?"align":"alignat",n};Qe({type:"array",names:["array","darray"],props:{numArgs:1},handler:function(e,t){var r=Bt(t[0]),n=r?[t[0]]:G(t[0],"ordgroup").body,i=n.map(function(m){var y=fn(m),c=y.text;if("lcr".indexOf(c)!==-1)return{type:"align",align:c};if(c==="|")return{type:"separator",separator:"|"};if(c===":")return{type:"separator",separator:":"};throw new x("Unknown column alignment: "+c,m)}),l={cols:i,hskipBeforeAndAfter:!0};return dt(e.parser,l,Or(e.envName))},htmlBuilder:et,mathmlBuilder:tt}),Qe({type:"array",names:["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix"],props:{numArgs:0},handler:function(e){var t={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[e.envName],r={hskipBeforeAndAfter:!1},n=dt(e.parser,r,Or(e.envName));return t?{type:"leftright",mode:e.mode,body:[n],left:t[0],right:t[1],rightColor:void 0}:n},htmlBuilder:et,mathmlBuilder:tt}),Qe({type:"array",names:["smallmatrix"],props:{numArgs:0},handler:function(e){var t={arraystretch:.5},r=dt(e.parser,t,"script");return r.colSeparationType="small",r},htmlBuilder:et,mathmlBuilder:tt}),Qe({type:"array",names:["subarray"],props:{numArgs:1},handler:function(e,t){var r=Bt(t[0]),n=r?[t[0]]:G(t[0],"ordgroup").body,i=n.map(function(m){var y=fn(m),c=y.text;if("lc".indexOf(c)!==-1)return{type:"align",align:c};throw new x("Unknown column alignment: "+c,m)});if(i.length>1)throw new x("{subarray} can contain only one column");var l={cols:i,hskipBeforeAndAfter:!1,arraystretch:.5};if(l=dt(e.parser,l,"script"),l.body[0].length>1)throw new x("{subarray} can contain only one column");return l},htmlBuilder:et,mathmlBuilder:tt}),Qe({type:"array",names:["cases","dcases"],props:{numArgs:0},handler:function(e){var t={arraystretch:1.2,cols:[{type:"align",align:"l",pregap:0,postgap:1},{type:"align",align:"l",pregap:0,postgap:0}]},r=dt(e.parser,t,Or(e.envName));return{type:"leftright",mode:e.mode,body:[r],left:"\\{",right:".",rightColor:void 0}},htmlBuilder:et,mathmlBuilder:tt}),Qe({type:"array",names:["aligned"],props:{numArgs:0},handler:Dn,htmlBuilder:et,mathmlBuilder:tt}),Qe({type:"array",names:["gathered"],props:{numArgs:0},handler:function(e){var t={cols:[{type:"align",align:"c"}],addJot:!0};return dt(e.parser,t,"display")},htmlBuilder:et,mathmlBuilder:tt}),Qe({type:"array",names:["alignedat"],props:{numArgs:1},handler:Dn,htmlBuilder:et,mathmlBuilder:tt}),P({type:"text",names:["\\hline","\\hdashline"],props:{numArgs:0,allowedInText:!0,allowedInMath:!0},handler:function(e,t){throw new x(e.funcName+" valid only within array environment")}});var $i=Mn,Fn=$i;P({type:"environment",names:["\\begin","\\end"],props:{numArgs:1,argTypes:["text"]},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0];if(i.type!=="ordgroup")throw new x("Invalid environment name",i);for(var l="",m=0;m<i.body.length;++m)l+=G(i.body[m],"textord").text;if(n==="\\begin"){if(!Fn.hasOwnProperty(l))throw new x("No such environment: "+l,i);var y=Fn[l],c=r.parseArguments("\\begin{"+l+"}",y),b=c.args,k=c.optArgs,A={mode:r.mode,envName:l,parser:r},W=y.handler(A,b,k);r.expect("\\end",!1);var E=r.nextToken,j=G(r.parseFunction(),"environment");if(j.name!==l)throw new x("Mismatch: \\begin{"+l+"} matched by \\end{"+j.name+"}",E);return W}return{type:"environment",mode:r.mode,name:l,nameGroup:i}}});var Ki=T.makeSpan;function Bn(o,e){var t=Oe(o.body,e,!0);return Ki([o.mclass],t,e)}function Un(o,e){var t,r=Me(o.body,e);return o.mclass==="minner"?S.newDocumentFragment(r):(o.mclass==="mord"?o.isCharacterBox?(t=r[0],t.type="mi"):t=new S.MathNode("mi",r):(o.isCharacterBox?(t=r[0],t.type="mo"):t=new S.MathNode("mo",r),o.mclass==="mbin"?(t.attributes.lspace="0.22em",t.attributes.rspace="0.22em"):o.mclass==="mpunct"?(t.attributes.lspace="0em",t.attributes.rspace="0.17em"):(o.mclass==="mopen"||o.mclass==="mclose")&&(t.attributes.lspace="0em",t.attributes.rspace="0em")),t)}P({type:"mclass",names:["\\mathord","\\mathbin","\\mathrel","\\mathopen","\\mathclose","\\mathpunct","\\mathinner"],props:{numArgs:1},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0];return{type:"mclass",mode:r.mode,mclass:"m"+n.substr(5),body:ve(i),isCharacterBox:N.isCharacterBox(i)}},htmlBuilder:Bn,mathmlBuilder:Un});var Cr=function(e){var t=e.type==="ordgroup"&&e.body.length?e.body[0]:e;return t.type==="atom"&&(t.family==="bin"||t.family==="rel")?"m"+t.family:"mord"};P({type:"mclass",names:["\\@binrel"],props:{numArgs:2},handler:function(e,t){var r=e.parser;return{type:"mclass",mode:r.mode,mclass:Cr(t[0]),body:[t[1]],isCharacterBox:N.isCharacterBox(t[1])}}}),P({type:"mclass",names:["\\stackrel","\\overset","\\underset"],props:{numArgs:2},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[1],l=t[0],m;n!=="\\stackrel"?m=Cr(i):m="mrel";var y={type:"op",mode:i.mode,limits:!0,alwaysHandleSupSub:!0,parentIsSupSub:!1,symbol:!1,suppressBaseShift:n!=="\\stackrel",body:ve(i)},c={type:"supsub",mode:l.mode,base:y,sup:n==="\\underset"?null:l,sub:n==="\\underset"?l:null};return{type:"mclass",mode:r.mode,mclass:m,body:[c],isCharacterBox:N.isCharacterBox(c)}},htmlBuilder:Bn,mathmlBuilder:Un});var Hn=function(e,t){var r=e.font,n=t.withFont(r);return X(e.body,n)},Vn=function(e,t){var r=e.font,n=t.withFont(r);return ie(e.body,n)},Gn={"\\Bbb":"\\mathbb","\\bold":"\\mathbf","\\frak":"\\mathfrak","\\bm":"\\boldsymbol"};P({type:"font",names:["\\mathrm","\\mathit","\\mathbf","\\mathnormal","\\mathbb","\\mathcal","\\mathfrak","\\mathscr","\\mathsf","\\mathtt","\\Bbb","\\bold","\\frak"],props:{numArgs:1,greediness:2},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0],l=n;return l in Gn&&(l=Gn[l]),{type:"font",mode:r.mode,font:l.slice(1),body:i}},htmlBuilder:Hn,mathmlBuilder:Vn}),P({type:"mclass",names:["\\boldsymbol","\\bm"],props:{numArgs:1,greediness:2},handler:function(e,t){var r=e.parser,n=t[0],i=N.isCharacterBox(n);return{type:"mclass",mode:r.mode,mclass:Cr(n),body:[{type:"font",mode:r.mode,font:"boldsymbol",body:n}],isCharacterBox:i}}}),P({type:"font",names:["\\rm","\\sf","\\tt","\\bf","\\it"],props:{numArgs:0,allowedInText:!0},handler:function(e,t){var r=e.parser,n=e.funcName,i=e.breakOnTokenText,l=r.mode,m=r.parseExpression(!0,i),y="math"+n.slice(1);return{type:"font",mode:l,font:y,body:{type:"ordgroup",mode:r.mode,body:m}}},htmlBuilder:Hn,mathmlBuilder:Vn});var $n=function(e,t){var r=t;return e==="display"?r=r.id>=F.SCRIPT.id?r.text():F.DISPLAY:e==="text"&&r.size===F.DISPLAY.size?r=F.TEXT:e==="script"?r=F.SCRIPT:e==="scriptscript"&&(r=F.SCRIPTSCRIPT),r},zr=function(e,t){var r=$n(e.size,t.style),n=r.fracNum(),i=r.fracDen(),l;l=t.havingStyle(n);var m=X(e.numer,l,t);if(e.continued){var y=8.5/t.fontMetrics().ptPerEm,c=3.5/t.fontMetrics().ptPerEm;m.height=m.height<y?y:m.height,m.depth=m.depth<c?c:m.depth}l=t.havingStyle(i);var b=X(e.denom,l,t),k,A,W;e.hasBarLine?(e.barSize?(A=ce(e.barSize,t),k=T.makeLineSpan("frac-line",t,A)):k=T.makeLineSpan("frac-line",t),A=k.height,W=k.height):(k=null,A=0,W=t.fontMetrics().defaultRuleThickness);var E,j,L;r.size===F.DISPLAY.size||e.size==="display"?(E=t.fontMetrics().num1,A>0?j=3*W:j=7*W,L=t.fontMetrics().denom1):(A>0?(E=t.fontMetrics().num2,j=W):(E=t.fontMetrics().num3,j=3*W),L=t.fontMetrics().denom2);var H;if(k){var $=t.fontMetrics().axisHeight;E-m.depth-($+.5*A)<j&&(E+=j-(E-m.depth-($+.5*A))),$-.5*A-(b.height-L)<j&&(L+=j-($-.5*A-(b.height-L)));var re=-($-.5*A);H=T.makeVList({positionType:"individualShift",children:[{type:"elem",elem:b,shift:L},{type:"elem",elem:k,shift:re},{type:"elem",elem:m,shift:-E}]},t)}else{var V=E-m.depth-(b.height-L);V<j&&(E+=.5*(j-V),L+=.5*(j-V)),H=T.makeVList({positionType:"individualShift",children:[{type:"elem",elem:b,shift:L},{type:"elem",elem:m,shift:-E}]},t)}l=t.havingStyle(r),H.height*=l.sizeMultiplier/t.sizeMultiplier,H.depth*=l.sizeMultiplier/t.sizeMultiplier;var Z;r.size===F.DISPLAY.size?Z=t.fontMetrics().delim1:Z=t.fontMetrics().delim2;var se,oe;return e.leftDelim==null?se=xt(t,["mopen"]):se=Je.customSizedDelim(e.leftDelim,Z,!0,t.havingStyle(r),e.mode,["mopen"]),e.continued?oe=T.makeSpan([]):e.rightDelim==null?oe=xt(t,["mclose"]):oe=Je.customSizedDelim(e.rightDelim,Z,!0,t.havingStyle(r),e.mode,["mclose"]),T.makeSpan(["mord"].concat(l.sizingClasses(t)),[se,T.makeSpan(["mfrac"],[H]),oe],t)},Wr=function(e,t){var r=new S.MathNode("mfrac",[ie(e.numer,t),ie(e.denom,t)]);if(!e.hasBarLine)r.setAttribute("linethickness","0px");else if(e.barSize){var n=ce(e.barSize,t);r.setAttribute("linethickness",n+"em")}var i=$n(e.size,t.style);if(i.size!==t.style.size){r=new S.MathNode("mstyle",[r]);var l=i.size===F.DISPLAY.size?"true":"false";r.setAttribute("displaystyle",l),r.setAttribute("scriptlevel","0")}if(e.leftDelim!=null||e.rightDelim!=null){var m=[];if(e.leftDelim!=null){var y=new S.MathNode("mo",[new S.TextNode(e.leftDelim.replace("\\",""))]);y.setAttribute("fence","true"),m.push(y)}if(m.push(r),e.rightDelim!=null){var c=new S.MathNode("mo",[new S.TextNode(e.rightDelim.replace("\\",""))]);c.setAttribute("fence","true"),m.push(c)}return vr(m)}return r};P({type:"genfrac",names:["\\cfrac","\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom","\\\\atopfrac","\\\\bracefrac","\\\\brackfrac"],props:{numArgs:2,greediness:2},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0],l=t[1],m,y=null,c=null,b="auto";switch(n){case"\\cfrac":case"\\dfrac":case"\\frac":case"\\tfrac":m=!0;break;case"\\\\atopfrac":m=!1;break;case"\\dbinom":case"\\binom":case"\\tbinom":m=!1,y="(",c=")";break;case"\\\\bracefrac":m=!1,y="\\{",c="\\}";break;case"\\\\brackfrac":m=!1,y="[",c="]";break;default:throw new Error("Unrecognized genfrac command")}switch(n){case"\\cfrac":case"\\dfrac":case"\\dbinom":b="display";break;case"\\tfrac":case"\\tbinom":b="text";break}return{type:"genfrac",mode:r.mode,continued:n==="\\cfrac",numer:i,denom:l,hasBarLine:m,leftDelim:y,rightDelim:c,size:b,barSize:null}},htmlBuilder:zr,mathmlBuilder:Wr}),P({type:"infix",names:["\\over","\\choose","\\atop","\\brace","\\brack"],props:{numArgs:0,infix:!0},handler:function(e){var t=e.parser,r=e.funcName,n=e.token,i;switch(r){case"\\over":i="\\frac";break;case"\\choose":i="\\binom";break;case"\\atop":i="\\\\atopfrac";break;case"\\brace":i="\\\\bracefrac";break;case"\\brack":i="\\\\brackfrac";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",mode:t.mode,replaceWith:i,token:n}}});var Kn=["display","text","script","scriptscript"],Xn=function(e){var t=null;return e.length>0&&(t=e,t=t==="."?null:t),t};P({type:"genfrac",names:["\\genfrac"],props:{numArgs:6,greediness:6,argTypes:["math","math","size","text","math","math"]},handler:function(e,t){var r=e.parser,n=t[4],i=t[5],l=we(t[0],"atom");l&&(l=pn(t[0],"open"));var m=l?Xn(l.text):null,y=we(t[1],"atom");y&&(y=pn(t[1],"close"));var c=y?Xn(y.text):null,b=G(t[2],"size"),k,A=null;b.isBlank?k=!0:(A=b.value,k=A.number>0);var W="auto",E=we(t[3],"ordgroup");if(E){if(E.body.length>0){var j=G(E.body[0],"textord");W=Kn[Number(j.text)]}}else E=G(t[3],"textord"),W=Kn[Number(E.text)];return{type:"genfrac",mode:r.mode,numer:n,denom:i,continued:!1,hasBarLine:k,barSize:A,leftDelim:m,rightDelim:c,size:W}},htmlBuilder:zr,mathmlBuilder:Wr}),P({type:"infix",names:["\\above"],props:{numArgs:1,argTypes:["size"],infix:!0},handler:function(e,t){var r=e.parser;e.funcName;var n=e.token;return{type:"infix",mode:r.mode,replaceWith:"\\\\abovefrac",size:G(t[0],"size").value,token:n}}}),P({type:"genfrac",names:["\\\\abovefrac"],props:{numArgs:3,argTypes:["math","size","math"]},handler:function(e,t){var r=e.parser;e.funcName;var n=t[0],i=ee(G(t[1],"infix").size),l=t[2],m=i.number>0;return{type:"genfrac",mode:r.mode,numer:n,denom:l,continued:!1,hasBarLine:m,barSize:i,leftDelim:null,rightDelim:null,size:"auto"}},htmlBuilder:zr,mathmlBuilder:Wr});var Yn=function(e,t){var r=t.style,n,i,l=we(e,"supsub");l?(n=l.sup?X(l.sup,t.havingStyle(r.sup()),t):X(l.sub,t.havingStyle(r.sub()),t),i=G(l.base,"horizBrace")):i=G(e,"horizBrace");var m=X(i.base,t.havingBaseStyle(F.DISPLAY)),y=Ge.svgSpan(i,t),c;if(i.isOver?(c=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:m},{type:"kern",size:.1},{type:"elem",elem:y}]},t),c.children[0].children[0].children[1].classes.push("svg-align")):(c=T.makeVList({positionType:"bottom",positionData:m.depth+.1+y.height,children:[{type:"elem",elem:y},{type:"kern",size:.1},{type:"elem",elem:m}]},t),c.children[0].children[0].children[0].classes.push("svg-align")),n){var b=T.makeSpan(["mord",i.isOver?"mover":"munder"],[c],t);i.isOver?c=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:b},{type:"kern",size:.2},{type:"elem",elem:n}]},t):c=T.makeVList({positionType:"bottom",positionData:b.depth+.2+n.height+n.depth,children:[{type:"elem",elem:n},{type:"kern",size:.2},{type:"elem",elem:b}]},t)}return T.makeSpan(["mord",i.isOver?"mover":"munder"],[c],t)},Xi=function(e,t){var r=Ge.mathMLnode(e.label);return new S.MathNode(e.isOver?"mover":"munder",[ie(e.base,t),r])};P({type:"horizBrace",names:["\\overbrace","\\underbrace"],props:{numArgs:1},handler:function(e,t){var r=e.parser,n=e.funcName;return{type:"horizBrace",mode:r.mode,label:n,isOver:/^\\over/.test(n),base:t[0]}},htmlBuilder:Yn,mathmlBuilder:Xi}),P({type:"href",names:["\\href"],props:{numArgs:2,argTypes:["url","original"],allowedInText:!0},handler:function(e,t){var r=e.parser,n=t[1],i=G(t[0],"url").url;return r.settings.isTrusted({command:"\\href",url:i})?{type:"href",mode:r.mode,href:i,body:ve(n)}:r.formatUnsupportedCmd("\\href")},htmlBuilder:function(e,t){var r=Oe(e.body,t,!1);return T.makeAnchor(e.href,[],r,t)},mathmlBuilder:function(e,t){var r=ut(e.body,t);return r instanceof Ie||(r=new Ie("mrow",[r])),r.setAttribute("href",e.href),r}}),P({type:"href",names:["\\url"],props:{numArgs:1,argTypes:["url"],allowedInText:!0},handler:function(e,t){var r=e.parser,n=G(t[0],"url").url;if(!r.settings.isTrusted({command:"\\url",url:n}))return r.formatUnsupportedCmd("\\url");for(var i=[],l=0;l<n.length;l++){var m=n[l];m==="~"&&(m="\\textasciitilde"),i.push({type:"textord",mode:"text",text:m})}var y={type:"text",mode:r.mode,font:"\\texttt",body:i};return{type:"href",mode:r.mode,href:n,body:ve(y)}}}),P({type:"htmlmathml",names:["\\html@mathml"],props:{numArgs:2,allowedInText:!0},handler:function(e,t){var r=e.parser;return{type:"htmlmathml",mode:r.mode,html:ve(t[0]),mathml:ve(t[1])}},htmlBuilder:function(e,t){var r=Oe(e.html,t,!1);return T.makeFragment(r)},mathmlBuilder:function(e,t){return ut(e.mathml,t)}});var Er=function(e){if(/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))return{number:+e,unit:"bp"};var t=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);if(!t)throw new x("Invalid size: '"+e+"' in \\includegraphics");var r={number:+(t[1]+t[2]),unit:t[3]};if(!hn(r))throw new x("Invalid unit: '"+r.unit+"' in \\includegraphics.");return r};P({type:"includegraphics",names:["\\includegraphics"],props:{numArgs:1,numOptionalArgs:1,argTypes:["raw","url"],allowedInText:!1},handler:function(e,t,r){var n=e.parser,i={number:0,unit:"em"},l={number:.9,unit:"em"},m={number:0,unit:"em"},y="";if(r[0])for(var c=G(r[0],"raw").string,b=c.split(","),k=0;k<b.length;k++){var A=b[k].split("=");if(A.length===2){var W=A[1].trim();switch(A[0].trim()){case"alt":y=W;break;case"width":i=Er(W);break;case"height":l=Er(W);break;case"totalheight":m=Er(W);break;default:throw new x("Invalid key: '"+A[0]+"' in \\includegraphics.")}}}var E=G(t[0],"url").url;return y===""&&(y=E,y=y.replace(/^.*[\\/]/,""),y=y.substring(0,y.lastIndexOf("."))),n.settings.isTrusted({command:"\\includegraphics",url:E})?{type:"includegraphics",mode:n.mode,alt:y,width:i,height:l,totalheight:m,src:E}:n.formatUnsupportedCmd("\\includegraphics")},htmlBuilder:function(e,t){var r=ce(e.height,t),n=0;e.totalheight.number>0&&(n=ce(e.totalheight,t)-r,n=Number(n.toFixed(2)));var i=0;e.width.number>0&&(i=ce(e.width,t));var l={height:r+n+"em"};i>0&&(l.width=i+"em"),n>0&&(l.verticalAlign=-n+"em");var m=new $a(e.src,e.alt,l);return m.height=r,m.depth=n,m},mathmlBuilder:function(e,t){var r=new S.MathNode("mglyph",[]);r.setAttribute("alt",e.alt);var n=ce(e.height,t),i=0;if(e.totalheight.number>0&&(i=ce(e.totalheight,t)-n,i=i.toFixed(2),r.setAttribute("valign","-"+i+"em")),r.setAttribute("height",n+i+"em"),e.width.number>0){var l=ce(e.width,t);r.setAttribute("width",l+"em")}return r.setAttribute("src",e.src),r}}),P({type:"kern",names:["\\kern","\\mkern","\\hskip","\\mskip"],props:{numArgs:1,argTypes:["size"],allowedInText:!0},handler:function(e,t){var r=e.parser,n=e.funcName,i=G(t[0],"size");if(r.settings.strict){var l=n[1]==="m",m=i.value.unit==="mu";l?(m||r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+n+" supports only mu units, "+("not "+i.value.unit+" units")),r.mode!=="math"&&r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+n+" works only in math mode")):m&&r.settings.reportNonstrict("mathVsTextUnits","LaTeX's "+n+" doesn't support mu units")}return{type:"kern",mode:r.mode,dimension:i.value}},htmlBuilder:function(e,t){return T.makeGlue(e.dimension,t)},mathmlBuilder:function(e,t){var r=ce(e.dimension,t);return new S.SpaceNode(r)}}),P({type:"lap",names:["\\mathllap","\\mathrlap","\\mathclap"],props:{numArgs:1,allowedInText:!0},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0];return{type:"lap",mode:r.mode,alignment:n.slice(5),body:i}},htmlBuilder:function(e,t){var r;e.alignment==="clap"?(r=T.makeSpan([],[X(e.body,t)]),r=T.makeSpan(["inner"],[r],t)):r=T.makeSpan(["inner"],[X(e.body,t)]);var n=T.makeSpan(["fix"],[]),i=T.makeSpan([e.alignment],[r,n],t),l=T.makeSpan(["strut"]);return l.style.height=i.height+i.depth+"em",l.style.verticalAlign=-i.depth+"em",i.children.unshift(l),i=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:i}]},t),T.makeSpan(["mord"],[i],t)},mathmlBuilder:function(e,t){var r=new S.MathNode("mpadded",[ie(e.body,t)]);if(e.alignment!=="rlap"){var n=e.alignment==="llap"?"-1":"-0.5";r.setAttribute("lspace",n+"width")}return r.setAttribute("width","0px"),r}}),P({type:"styling",names:["\\(","$"],props:{numArgs:0,allowedInText:!0,allowedInMath:!1},handler:function(e,t){var r=e.funcName,n=e.parser,i=n.mode;n.switchMode("math");var l=r==="\\("?"\\)":"$",m=n.parseExpression(!1,l);return n.expect(l),n.switchMode(i),{type:"styling",mode:n.mode,style:"text",body:m}}}),P({type:"text",names:["\\)","\\]"],props:{numArgs:0,allowedInText:!0,allowedInMath:!1},handler:function(e,t){throw new x("Mismatched "+e.funcName)}});var Zn=function(e,t){switch(t.style.size){case F.DISPLAY.size:return e.display;case F.TEXT.size:return e.text;case F.SCRIPT.size:return e.script;case F.SCRIPTSCRIPT.size:return e.scriptscript;default:return e.text}};P({type:"mathchoice",names:["\\mathchoice"],props:{numArgs:4},handler:function(e,t){var r=e.parser;return{type:"mathchoice",mode:r.mode,display:ve(t[0]),text:ve(t[1]),script:ve(t[2]),scriptscript:ve(t[3])}},htmlBuilder:function(e,t){var r=Zn(e,t),n=Oe(r,t,!1);return T.makeFragment(n)},mathmlBuilder:function(e,t){var r=Zn(e,t);return ut(r,t)}});var Jn=function(e,t,r,n,i,l,m){e=T.makeSpan([],[e]);var y,c;if(t){var b=X(t,n.havingStyle(i.sup()),n);c={elem:b,kern:Math.max(n.fontMetrics().bigOpSpacing1,n.fontMetrics().bigOpSpacing3-b.depth)}}if(r){var k=X(r,n.havingStyle(i.sub()),n);y={elem:k,kern:Math.max(n.fontMetrics().bigOpSpacing2,n.fontMetrics().bigOpSpacing4-k.height)}}var A;if(c&&y){var W=n.fontMetrics().bigOpSpacing5+y.elem.height+y.elem.depth+y.kern+e.depth+m;A=T.makeVList({positionType:"bottom",positionData:W,children:[{type:"kern",size:n.fontMetrics().bigOpSpacing5},{type:"elem",elem:y.elem,marginLeft:-l+"em"},{type:"kern",size:y.kern},{type:"elem",elem:e},{type:"kern",size:c.kern},{type:"elem",elem:c.elem,marginLeft:l+"em"},{type:"kern",size:n.fontMetrics().bigOpSpacing5}]},n)}else if(y){var E=e.height-m;A=T.makeVList({positionType:"top",positionData:E,children:[{type:"kern",size:n.fontMetrics().bigOpSpacing5},{type:"elem",elem:y.elem,marginLeft:-l+"em"},{type:"kern",size:y.kern},{type:"elem",elem:e}]},n)}else if(c){var j=e.depth+m;A=T.makeVList({positionType:"bottom",positionData:j,children:[{type:"elem",elem:e},{type:"kern",size:c.kern},{type:"elem",elem:c.elem,marginLeft:l+"em"},{type:"kern",size:n.fontMetrics().bigOpSpacing5}]},n)}else return e;return T.makeSpan(["mop","op-limits"],[A],n)},Qn=["\\smallint"],ft=function(e,t){var r,n,i=!1,l,m=we(e,"supsub");m?(r=m.sup,n=m.sub,l=G(m.base,"op"),i=!0):l=G(e,"op");var y=t.style,c=!1;y.size===F.DISPLAY.size&&l.symbol&&!N.contains(Qn,l.name)&&(c=!0);var b;if(l.symbol){var k=c?"Size2-Regular":"Size1-Regular",A="";if((l.name==="\\oiint"||l.name==="\\oiiint")&&(A=l.name.substr(1),l.name=A==="oiint"?"\\iint":"\\iiint"),b=T.makeSymbol(l.name,k,"math",t,["mop","op-symbol",c?"large-op":"small-op"]),A.length>0){var W=b.italic,E=T.staticSvg(A+"Size"+(c?"2":"1"),t);b=T.makeVList({positionType:"individualShift",children:[{type:"elem",elem:b,shift:0},{type:"elem",elem:E,shift:c?.08:0}]},t),l.name="\\"+A,b.classes.unshift("mop"),b.italic=W}}else if(l.body){var j=Oe(l.body,t,!0);j.length===1&&j[0]instanceof Ne?(b=j[0],b.classes[0]="mop"):b=T.makeSpan(["mop"],T.tryCombineChars(j),t)}else{for(var L=[],H=1;H<l.name.length;H++)L.push(T.mathsym(l.name[H],l.mode,t));b=T.makeSpan(["mop"],L,t)}var V=0,$=0;return(b instanceof Ne||l.name==="\\oiint"||l.name==="\\oiiint")&&!l.suppressBaseShift&&(V=(b.height-b.depth)/2-t.fontMetrics().axisHeight,$=b.italic),i?Jn(b,r,n,t,y,$,V):(V&&(b.style.position="relative",b.style.top=V+"em"),b)},zt=function(e,t){var r;if(e.symbol)r=new Ie("mo",[Le(e.name,e.mode)]),N.contains(Qn,e.name)&&r.setAttribute("largeop","false");else if(e.body)r=new Ie("mo",Me(e.body,t));else{r=new Ie("mi",[new Rt(e.name.slice(1))]);var n=new Ie("mo",[Le("⁡","text")]);e.parentIsSupSub?r=new Ie("mo",[r,n]):r=kn([r,n])}return r},Yi={"∏":"\\prod","∐":"\\coprod","∑":"\\sum","⋀":"\\bigwedge","⋁":"\\bigvee","⋂":"\\bigcap","⋃":"\\bigcup","⨀":"\\bigodot","⨁":"\\bigoplus","⨂":"\\bigotimes","⨄":"\\biguplus","⨆":"\\bigsqcup"};P({type:"op",names:["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint","∏","∐","∑","⋀","⋁","⋂","⋃","⨀","⨁","⨂","⨄","⨆"],props:{numArgs:0},handler:function(e,t){var r=e.parser,n=e.funcName,i=n;return i.length===1&&(i=Yi[i]),{type:"op",mode:r.mode,limits:!0,parentIsSupSub:!1,symbol:!0,name:i}},htmlBuilder:ft,mathmlBuilder:zt}),P({type:"op",names:["\\mathop"],props:{numArgs:1},handler:function(e,t){var r=e.parser,n=t[0];return{type:"op",mode:r.mode,limits:!1,parentIsSupSub:!1,symbol:!1,body:ve(n)}},htmlBuilder:ft,mathmlBuilder:zt});var Zi={"∫":"\\int","∬":"\\iint","∭":"\\iiint","∮":"\\oint","∯":"\\oiint","∰":"\\oiiint"};P({type:"op",names:["\\arcsin","\\arccos","\\arctan","\\arctg","\\arcctg","\\arg","\\ch","\\cos","\\cosec","\\cosh","\\cot","\\cotg","\\coth","\\csc","\\ctg","\\cth","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\sh","\\tan","\\tanh","\\tg","\\th"],props:{numArgs:0},handler:function(e){var t=e.parser,r=e.funcName;return{type:"op",mode:t.mode,limits:!1,parentIsSupSub:!1,symbol:!1,name:r}},htmlBuilder:ft,mathmlBuilder:zt}),P({type:"op",names:["\\det","\\gcd","\\inf","\\lim","\\max","\\min","\\Pr","\\sup"],props:{numArgs:0},handler:function(e){var t=e.parser,r=e.funcName;return{type:"op",mode:t.mode,limits:!0,parentIsSupSub:!1,symbol:!1,name:r}},htmlBuilder:ft,mathmlBuilder:zt}),P({type:"op",names:["\\int","\\iint","\\iiint","\\oint","\\oiint","\\oiiint","∫","∬","∭","∮","∯","∰"],props:{numArgs:0},handler:function(e){var t=e.parser,r=e.funcName,n=r;return n.length===1&&(n=Zi[n]),{type:"op",mode:t.mode,limits:!1,parentIsSupSub:!1,symbol:!0,name:n}},htmlBuilder:ft,mathmlBuilder:zt});var ea=function(e,t){var r,n,i=!1,l,m=we(e,"supsub");m?(r=m.sup,n=m.sub,l=G(m.base,"operatorname"),i=!0):l=G(e,"operatorname");var y;if(l.body.length>0){for(var c=l.body.map(function(W){var E=W.text;return typeof E=="string"?{type:"textord",mode:W.mode,text:E}:W}),b=Oe(c,t.withFont("mathrm"),!0),k=0;k<b.length;k++){var A=b[k];A instanceof Ne&&(A.text=A.text.replace(/\u2212/,"-").replace(/\u2217/,"*"))}y=T.makeSpan(["mop"],b,t)}else y=T.makeSpan(["mop"],[],t);return i?Jn(y,r,n,t,t.style,0,0):y},Ji=function(e,t){for(var r=Me(e.body,t.withFont("mathrm")),n=!0,i=0;i<r.length;i++){var l=r[i];if(!(l instanceof S.SpaceNode))if(l instanceof S.MathNode)switch(l.type){case"mi":case"mn":case"ms":case"mspace":case"mtext":break;case"mo":{var m=l.children[0];l.children.length===1&&m instanceof S.TextNode?m.text=m.text.replace(/\u2212/,"-").replace(/\u2217/,"*"):n=!1;break}default:n=!1}else n=!1}if(n){var y=r.map(function(k){return k.toText()}).join("");r=[new S.TextNode(y)]}var c=new S.MathNode("mi",r);c.setAttribute("mathvariant","normal");var b=new S.MathNode("mo",[Le("⁡","text")]);return e.parentIsSupSub?new S.MathNode("mo",[c,b]):S.newDocumentFragment([c,b])};P({type:"operatorname",names:["\\operatorname","\\operatorname*"],props:{numArgs:1},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0];return{type:"operatorname",mode:r.mode,body:ve(i),alwaysHandleSupSub:n==="\\operatorname*",limits:!1,parentIsSupSub:!1}},htmlBuilder:ea,mathmlBuilder:Ji}),lt({type:"ordgroup",htmlBuilder:function(e,t){return e.semisimple?T.makeFragment(Oe(e.body,t,!1)):T.makeSpan(["mord"],Oe(e.body,t,!0),t)},mathmlBuilder:function(e,t){return ut(e.body,t,!0)}}),P({type:"overline",names:["\\overline"],props:{numArgs:1},handler:function(e,t){var r=e.parser,n=t[0];return{type:"overline",mode:r.mode,body:n}},htmlBuilder:function(e,t){var r=X(e.body,t.havingCrampedStyle()),n=T.makeLineSpan("overline-line",t),i=t.fontMetrics().defaultRuleThickness,l=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r},{type:"kern",size:3*i},{type:"elem",elem:n},{type:"kern",size:i}]},t);return T.makeSpan(["mord","overline"],[l],t)},mathmlBuilder:function(e,t){var r=new S.MathNode("mo",[new S.TextNode("‾")]);r.setAttribute("stretchy","true");var n=new S.MathNode("mover",[ie(e.body,t),r]);return n.setAttribute("accent","true"),n}}),P({type:"phantom",names:["\\phantom"],props:{numArgs:1,allowedInText:!0},handler:function(e,t){var r=e.parser,n=t[0];return{type:"phantom",mode:r.mode,body:ve(n)}},htmlBuilder:function(e,t){var r=Oe(e.body,t.withPhantom(),!1);return T.makeFragment(r)},mathmlBuilder:function(e,t){var r=Me(e.body,t);return new S.MathNode("mphantom",r)}}),P({type:"hphantom",names:["\\hphantom"],props:{numArgs:1,allowedInText:!0},handler:function(e,t){var r=e.parser,n=t[0];return{type:"hphantom",mode:r.mode,body:n}},htmlBuilder:function(e,t){var r=T.makeSpan([],[X(e.body,t.withPhantom())]);if(r.height=0,r.depth=0,r.children)for(var n=0;n<r.children.length;n++)r.children[n].height=0,r.children[n].depth=0;return r=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r}]},t),T.makeSpan(["mord"],[r],t)},mathmlBuilder:function(e,t){var r=Me(ve(e.body),t),n=new S.MathNode("mphantom",r),i=new S.MathNode("mpadded",[n]);return i.setAttribute("height","0px"),i.setAttribute("depth","0px"),i}}),P({type:"vphantom",names:["\\vphantom"],props:{numArgs:1,allowedInText:!0},handler:function(e,t){var r=e.parser,n=t[0];return{type:"vphantom",mode:r.mode,body:n}},htmlBuilder:function(e,t){var r=T.makeSpan(["inner"],[X(e.body,t.withPhantom())]),n=T.makeSpan(["fix"],[]);return T.makeSpan(["mord","rlap"],[r,n],t)},mathmlBuilder:function(e,t){var r=Me(ve(e.body),t),n=new S.MathNode("mphantom",r),i=new S.MathNode("mpadded",[n]);return i.setAttribute("width","0px"),i}}),P({type:"raisebox",names:["\\raisebox"],props:{numArgs:2,argTypes:["size","hbox"],allowedInText:!0},handler:function(e,t){var r=e.parser,n=G(t[0],"size").value,i=t[1];return{type:"raisebox",mode:r.mode,dy:n,body:i}},htmlBuilder:function(e,t){var r=X(e.body,t),n=ce(e.dy,t);return T.makeVList({positionType:"shift",positionData:-n,children:[{type:"elem",elem:r}]},t)},mathmlBuilder:function(e,t){var r=new S.MathNode("mpadded",[ie(e.body,t)]),n=e.dy.number+e.dy.unit;return r.setAttribute("voffset",n),r}}),P({type:"rule",names:["\\rule"],props:{numArgs:2,numOptionalArgs:1,argTypes:["size","size","size"]},handler:function(e,t,r){var n=e.parser,i=r[0],l=G(t[0],"size"),m=G(t[1],"size");return{type:"rule",mode:n.mode,shift:i&&G(i,"size").value,width:l.value,height:m.value}},htmlBuilder:function(e,t){var r=T.makeSpan(["mord","rule"],[],t),n=ce(e.width,t),i=ce(e.height,t),l=e.shift?ce(e.shift,t):0;return r.style.borderRightWidth=n+"em",r.style.borderTopWidth=i+"em",r.style.bottom=l+"em",r.width=n,r.height=i+l,r.depth=-l,r.maxFontSize=i*1.125*t.sizeMultiplier,r},mathmlBuilder:function(e,t){var r=ce(e.width,t),n=ce(e.height,t),i=e.shift?ce(e.shift,t):0,l=t.color&&t.getColor()||"black",m=new S.MathNode("mspace");m.setAttribute("mathbackground",l),m.setAttribute("width",r+"em"),m.setAttribute("height",n+"em");var y=new S.MathNode("mpadded",[m]);return i>=0?y.setAttribute("height","+"+i+"em"):(y.setAttribute("height",i+"em"),y.setAttribute("depth","+"+-i+"em")),y.setAttribute("voffset",i+"em"),y}});function ta(o,e,t){for(var r=Oe(o,e,!1),n=e.sizeMultiplier/t.sizeMultiplier,i=0;i<r.length;i++){var l=r[i].classes.indexOf("sizing");l<0?Array.prototype.push.apply(r[i].classes,e.sizingClasses(t)):r[i].classes[l+1]==="reset-size"+e.size&&(r[i].classes[l+1]="reset-size"+t.size),r[i].height*=n,r[i].depth*=n}return T.makeFragment(r)}var ra=["\\tiny","\\sixptsize","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],Qi=function(e,t){var r=t.havingSize(e.size);return ta(e.body,r,t)};P({type:"sizing",names:ra,props:{numArgs:0,allowedInText:!0},handler:function(e,t){var r=e.breakOnTokenText,n=e.funcName,i=e.parser,l=i.parseExpression(!1,r);return{type:"sizing",mode:i.mode,size:ra.indexOf(n)+1,body:l}},htmlBuilder:Qi,mathmlBuilder:function(e,t){var r=t.havingSize(e.size),n=Me(e.body,r),i=new S.MathNode("mstyle",n);return i.setAttribute("mathsize",r.sizeMultiplier+"em"),i}}),P({type:"smash",names:["\\smash"],props:{numArgs:1,numOptionalArgs:1,allowedInText:!0},handler:function(e,t,r){var n=e.parser,i=!1,l=!1,m=r[0]&&G(r[0],"ordgroup");if(m)for(var y="",c=0;c<m.body.length;++c){var b=m.body[c];if(y=b.text,y==="t")i=!0;else if(y==="b")l=!0;else{i=!1,l=!1;break}}else i=!0,l=!0;var k=t[0];return{type:"smash",mode:n.mode,body:k,smashHeight:i,smashDepth:l}},htmlBuilder:function(e,t){var r=T.makeSpan([],[X(e.body,t)]);if(!e.smashHeight&&!e.smashDepth)return r;if(e.smashHeight&&(r.height=0,r.children))for(var n=0;n<r.children.length;n++)r.children[n].height=0;if(e.smashDepth&&(r.depth=0,r.children))for(var i=0;i<r.children.length;i++)r.children[i].depth=0;var l=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r}]},t);return T.makeSpan(["mord"],[l],t)},mathmlBuilder:function(e,t){var r=new S.MathNode("mpadded",[ie(e.body,t)]);return e.smashHeight&&r.setAttribute("height","0px"),e.smashDepth&&r.setAttribute("depth","0px"),r}}),P({type:"sqrt",names:["\\sqrt"],props:{numArgs:1,numOptionalArgs:1},handler:function(e,t,r){var n=e.parser,i=r[0],l=t[0];return{type:"sqrt",mode:n.mode,body:l,index:i}},htmlBuilder:function(e,t){var r=X(e.body,t.havingCrampedStyle());r.height===0&&(r.height=t.fontMetrics().xHeight),r=T.wrapFragment(r,t);var n=t.fontMetrics(),i=n.defaultRuleThickness,l=i;t.style.id<F.TEXT.id&&(l=t.fontMetrics().xHeight);var m=i+l/4,y=r.height+r.depth+m+i,c=Je.sqrtImage(y,t),b=c.span,k=c.ruleWidth,A=c.advanceWidth,W=b.height-k;W>r.height+r.depth+m&&(m=(m+W-r.height-r.depth)/2);var E=b.height-r.height-m-k;r.style.paddingLeft=A+"em";var j=T.makeVList({positionType:"firstBaseline",children:[{type:"elem",elem:r,wrapperClasses:["svg-align"]},{type:"kern",size:-(r.height+E)},{type:"elem",elem:b},{type:"kern",size:k}]},t);if(e.index){var L=t.havingStyle(F.SCRIPTSCRIPT),H=X(e.index,L,t),V=.6*(j.height-j.depth),$=T.makeVList({positionType:"shift",positionData:-V,children:[{type:"elem",elem:H}]},t),re=T.makeSpan(["root"],[$]);return T.makeSpan(["mord","sqrt"],[re,j],t)}else return T.makeSpan(["mord","sqrt"],[j],t)},mathmlBuilder:function(e,t){var r=e.body,n=e.index;return n?new S.MathNode("mroot",[ie(r,t),ie(n,t)]):new S.MathNode("msqrt",[ie(r,t)])}});var na={display:F.DISPLAY,text:F.TEXT,script:F.SCRIPT,scriptscript:F.SCRIPTSCRIPT};P({type:"styling",names:["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],props:{numArgs:0,allowedInText:!0},handler:function(e,t){var r=e.breakOnTokenText,n=e.funcName,i=e.parser,l=i.parseExpression(!0,r),m=n.slice(1,n.length-5);return{type:"styling",mode:i.mode,style:m,body:l}},htmlBuilder:function(e,t){var r=na[e.style],n=t.havingStyle(r).withFont("");return ta(e.body,n,t)},mathmlBuilder:function(e,t){var r=na[e.style],n=t.havingStyle(r),i=Me(e.body,n),l=new S.MathNode("mstyle",i),m={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]},y=m[e.style];return l.setAttribute("scriptlevel",y[0]),l.setAttribute("displaystyle",y[1]),l}});var es=function(e,t){var r=e.base;if(r)if(r.type==="op"){var n=r.limits&&(t.style.size===F.DISPLAY.size||r.alwaysHandleSupSub);return n?ft:null}else if(r.type==="operatorname"){var i=r.alwaysHandleSupSub&&(t.style.size===F.DISPLAY.size||r.limits);return i?ea:null}else{if(r.type==="accent")return N.isCharacterBox(r.base)?wr:null;if(r.type==="horizBrace"){var l=!e.sub;return l===r.isOver?Yn:null}else return null}else return null};lt({type:"supsub",htmlBuilder:function(e,t){var r=es(e,t);if(r)return r(e,t);var n=e.base,i=e.sup,l=e.sub,m=X(n,t),y,c,b=t.fontMetrics(),k=0,A=0,W=n&&N.isCharacterBox(n);if(i){var E=t.havingStyle(t.style.sup());y=X(i,E,t),W||(k=m.height-E.fontMetrics().supDrop*E.sizeMultiplier/t.sizeMultiplier)}if(l){var j=t.havingStyle(t.style.sub());c=X(l,j,t),W||(A=m.depth+j.fontMetrics().subDrop*j.sizeMultiplier/t.sizeMultiplier)}var L;t.style===F.DISPLAY?L=b.sup1:t.style.cramped?L=b.sup3:L=b.sup2;var H=t.sizeMultiplier,V=.5/b.ptPerEm/H+"em",$=null;if(c){var re=e.base&&e.base.type==="op"&&e.base.name&&(e.base.name==="\\oiint"||e.base.name==="\\oiiint");(m instanceof Ne||re)&&($=-m.italic+"em")}var Z;if(y&&c){k=Math.max(k,L,y.depth+.25*b.xHeight),A=Math.max(A,b.sub2);var se=b.defaultRuleThickness,oe=4*se;if(k-y.depth-(c.height-A)<oe){A=oe-(k-y.depth)+c.height;var he=.8*b.xHeight-(k-y.depth);he>0&&(k+=he,A-=he)}var ke=[{type:"elem",elem:c,shift:A,marginRight:V,marginLeft:$},{type:"elem",elem:y,shift:-k,marginRight:V}];Z=T.makeVList({positionType:"individualShift",children:ke},t)}else if(c){A=Math.max(A,b.sub1,c.height-.8*b.xHeight);var be=[{type:"elem",elem:c,marginLeft:$,marginRight:V}];Z=T.makeVList({positionType:"shift",positionData:A,children:be},t)}else if(y)k=Math.max(k,L,y.depth+.25*b.xHeight),Z=T.makeVList({positionType:"shift",positionData:-k,children:[{type:"elem",elem:y,marginRight:V}]},t);else throw new Error("supsub must have either sup or sub.");var J=pr(m,"right")||"mord";return T.makeSpan([J],[m,T.makeSpan(["msupsub"],[Z])],t)},mathmlBuilder:function(e,t){var r=!1,n,i,l=we(e.base,"horizBrace");l&&(i=!!e.sup,i===l.isOver&&(r=!0,n=l.isOver)),e.base&&(e.base.type==="op"||e.base.type==="operatorname")&&(e.base.parentIsSupSub=!0);var m=[ie(e.base,t)];e.sub&&m.push(ie(e.sub,t)),e.sup&&m.push(ie(e.sup,t));var y;if(r)y=n?"mover":"munder";else if(e.sub)if(e.sup){var k=e.base;k&&k.type==="op"&&k.limits&&t.style===F.DISPLAY||k&&k.type==="operatorname"&&k.alwaysHandleSupSub&&(t.style===F.DISPLAY||k.limits)?y="munderover":y="msubsup"}else{var b=e.base;b&&b.type==="op"&&b.limits&&(t.style===F.DISPLAY||b.alwaysHandleSupSub)||b&&b.type==="operatorname"&&b.alwaysHandleSupSub&&(b.limits||t.style===F.DISPLAY)?y="munder":y="msub"}else{var c=e.base;c&&c.type==="op"&&c.limits&&(t.style===F.DISPLAY||c.alwaysHandleSupSub)||c&&c.type==="operatorname"&&c.alwaysHandleSupSub&&(c.limits||t.style===F.DISPLAY)?y="mover":y="msup"}var A=new S.MathNode(y,m);return A}}),lt({type:"atom",htmlBuilder:function(e,t){return T.mathsym(e.text,e.mode,t,["m"+e.family])},mathmlBuilder:function(e,t){var r=new S.MathNode("mo",[Le(e.text,e.mode)]);if(e.family==="bin"){var n=br(e,t);n==="bold-italic"&&r.setAttribute("mathvariant",n)}else e.family==="punct"?r.setAttribute("separator","true"):(e.family==="open"||e.family==="close")&&r.setAttribute("stretchy","false");return r}});var aa={mi:"italic",mn:"normal",mtext:"normal"};lt({type:"mathord",htmlBuilder:function(e,t){return T.makeOrd(e,t,"mathord")},mathmlBuilder:function(e,t){var r=new S.MathNode("mi",[Le(e.text,e.mode,t)]),n=br(e,t)||"italic";return n!==aa[r.type]&&r.setAttribute("mathvariant",n),r}}),lt({type:"textord",htmlBuilder:function(e,t){return T.makeOrd(e,t,"textord")},mathmlBuilder:function(e,t){var r=Le(e.text,e.mode,t),n=br(e,t)||"normal",i;return e.mode==="text"?i=new S.MathNode("mtext",[r]):/[0-9]/.test(e.text)?i=new S.MathNode("mn",[r]):e.text==="\\prime"?i=new S.MathNode("mo",[r]):i=new S.MathNode("mi",[r]),n!==aa[i.type]&&i.setAttribute("mathvariant",n),i}});var Sr={"\\nobreak":"nobreak","\\allowbreak":"allowbreak"},jr={" ":{},"\\ ":{},"~":{className:"nobreak"},"\\space":{},"\\nobreakspace":{className:"nobreak"}};lt({type:"spacing",htmlBuilder:function(e,t){if(jr.hasOwnProperty(e.text)){var r=jr[e.text].className||"";if(e.mode==="text"){var n=T.makeOrd(e,t,"textord");return n.classes.push(r),n}else return T.makeSpan(["mspace",r],[T.mathsym(e.text,e.mode,t)],t)}else{if(Sr.hasOwnProperty(e.text))return T.makeSpan(["mspace",Sr[e.text]],[],t);throw new x('Unknown type of space "'+e.text+'"')}},mathmlBuilder:function(e,t){var r;if(jr.hasOwnProperty(e.text))r=new S.MathNode("mtext",[new S.TextNode(" ")]);else{if(Sr.hasOwnProperty(e.text))return new S.MathNode("mspace");throw new x('Unknown type of space "'+e.text+'"')}return r}});var ia=function(){var e=new S.MathNode("mtd",[]);return e.setAttribute("width","50%"),e};lt({type:"tag",mathmlBuilder:function(e,t){var r=new S.MathNode("mtable",[new S.MathNode("mtr",[ia(),new S.MathNode("mtd",[ut(e.body,t)]),ia(),new S.MathNode("mtd",[ut(e.tag,t)])])]);return r.setAttribute("width","100%"),r}});var sa={"\\text":void 0,"\\textrm":"textrm","\\textsf":"textsf","\\texttt":"texttt","\\textnormal":"textrm"},oa={"\\textbf":"textbf","\\textmd":"textmd"},ts={"\\textit":"textit","\\textup":"textup"},la=function(e,t){var r=e.font;return r?sa[r]?t.withTextFontFamily(sa[r]):oa[r]?t.withTextFontWeight(oa[r]):t.withTextFontShape(ts[r]):t};P({type:"text",names:["\\text","\\textrm","\\textsf","\\texttt","\\textnormal","\\textbf","\\textmd","\\textit","\\textup"],props:{numArgs:1,argTypes:["text"],greediness:2,allowedInText:!0},handler:function(e,t){var r=e.parser,n=e.funcName,i=t[0];return{type:"text",mode:r.mode,body:ve(i),font:n}},htmlBuilder:function(e,t){var r=la(e,t),n=Oe(e.body,r,!0);return T.makeSpan(["mord","text"],T.tryCombineChars(n),r)},mathmlBuilder:function(e,t){var r=la(e,t);return ut(e.body,r)}}),P({type:"underline",names:["\\underline"],props:{numArgs:1,allowedInText:!0},handler:function(e,t){var r=e.parser;return{type:"underline",mode:r.mode,body:t[0]}},htmlBuilder:function(e,t){var r=X(e.body,t),n=T.makeLineSpan("underline-line",t),i=t.fontMetrics().defaultRuleThickness,l=T.makeVList({positionType:"top",positionData:r.height,children:[{type:"kern",size:i},{type:"elem",elem:n},{type:"kern",size:3*i},{type:"elem",elem:r}]},t);return T.makeSpan(["mord","underline"],[l],t)},mathmlBuilder:function(e,t){var r=new S.MathNode("mo",[new S.TextNode("‾")]);r.setAttribute("stretchy","true");var n=new S.MathNode("munder",[ie(e.body,t),r]);return n.setAttribute("accentunder","true"),n}}),P({type:"verb",names:["\\verb"],props:{numArgs:0,allowedInText:!0},handler:function(e,t,r){throw new x("\\verb ended by end of line instead of matching delimiter")},htmlBuilder:function(e,t){for(var r=ua(e),n=[],i=t.havingStyle(t.style.text()),l=0;l<r.length;l++){var m=r[l];m==="~"&&(m="\\textasciitilde"),n.push(T.makeSymbol(m,"Typewriter-Regular",e.mode,i,["mord","texttt"]))}return T.makeSpan(["mord","text"].concat(i.sizingClasses(t)),T.tryCombineChars(n),i)},mathmlBuilder:function(e,t){var r=new S.TextNode(ua(e)),n=new S.MathNode("mtext",[r]);return n.setAttribute("mathvariant","monospace"),n}});var ua=function(e){return e.body.replace(/ /g,e.star?"␣":" ")},rs=vn,Wt=rs,_r=`[ \r
	]`,da="\\\\[a-zA-Z@]+",ns="\\\\[^\uD800-\uDFFF]",as=""+da+_r+"*",is=new RegExp("^("+da+")"+_r+"*$"),Nr="[̀-ͯ]",ss=new RegExp(Nr+"+$"),os="("+_r+"+)|([!-\\[\\]-‧‪-퟿豈-￿]"+(Nr+"*")+"|[\uD800-\uDBFF][\uDC00-\uDFFF]"+(Nr+"*")+"|\\\\verb\\*([^]).*?\\3|\\\\verb([^*a-zA-Z]).*?\\4|\\\\operatorname\\*"+("|"+as)+("|"+ns+")"),ha=function(){function o(t,r){this.input=void 0,this.settings=void 0,this.tokenRegex=void 0,this.catcodes=void 0,this.input=t,this.settings=r,this.tokenRegex=new RegExp(os,"g"),this.catcodes={"%":14}}var e=o.prototype;return e.setCatcode=function(r,n){this.catcodes[r]=n},e.lex=function(){var r=this.input,n=this.tokenRegex.lastIndex;if(n===r.length)return new _("EOF",new O(this,n,n));var i=this.tokenRegex.exec(r);if(i===null||i.index!==n)throw new x("Unexpected character: '"+r[n]+"'",new _(r[n],new O(this,n,n+1)));var l=i[2]||" ";if(this.catcodes[l]===14){var m=r.indexOf(`
`,this.tokenRegex.lastIndex);return m===-1?(this.tokenRegex.lastIndex=r.length,this.settings.reportNonstrict("commentAtEnd","% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")):this.tokenRegex.lastIndex=m+1,this.lex()}var y=l.match(is);return y&&(l=y[1]),new _(l,new O(this,n,this.tokenRegex.lastIndex))},o}(),ls=function(){function o(t,r){t===void 0&&(t={}),r===void 0&&(r={}),this.current=void 0,this.builtins=void 0,this.undefStack=void 0,this.current=r,this.builtins=t,this.undefStack=[]}var e=o.prototype;return e.beginGroup=function(){this.undefStack.push({})},e.endGroup=function(){if(this.undefStack.length===0)throw new x("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");var r=this.undefStack.pop();for(var n in r)r.hasOwnProperty(n)&&(r[n]===void 0?delete this.current[n]:this.current[n]=r[n])},e.has=function(r){return this.current.hasOwnProperty(r)||this.builtins.hasOwnProperty(r)},e.get=function(r){return this.current.hasOwnProperty(r)?this.current[r]:this.builtins[r]},e.set=function(r,n,i){if(i===void 0&&(i=!1),i){for(var l=0;l<this.undefStack.length;l++)delete this.undefStack[l][r];this.undefStack.length>0&&(this.undefStack[this.undefStack.length-1][r]=n)}else{var m=this.undefStack[this.undefStack.length-1];m&&!m.hasOwnProperty(r)&&(m[r]=this.current[r])}this.current[r]=n},o}(),ma={},us=ma;function g(o,e){ma[o]=e}g("\\@firstoftwo",function(o){var e=o.consumeArgs(2);return{tokens:e[0],numArgs:0}}),g("\\@secondoftwo",function(o){var e=o.consumeArgs(2);return{tokens:e[1],numArgs:0}}),g("\\@ifnextchar",function(o){var e=o.consumeArgs(3),t=o.future();return e[0].length===1&&e[0][0].text===t.text?{tokens:e[1],numArgs:0}:{tokens:e[2],numArgs:0}}),g("\\@ifstar","\\@ifnextchar *{\\@firstoftwo{#1}}"),g("\\TextOrMath",function(o){var e=o.consumeArgs(2);return o.mode==="text"?{tokens:e[0],numArgs:0}:{tokens:e[1],numArgs:0}});var ya={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,A:10,b:11,B:11,c:12,C:12,d:13,D:13,e:14,E:14,f:15,F:15};g("\\char",function(o){var e=o.popToken(),t,r="";if(e.text==="'")t=8,e=o.popToken();else if(e.text==='"')t=16,e=o.popToken();else if(e.text==="`")if(e=o.popToken(),e.text[0]==="\\")r=e.text.charCodeAt(1);else{if(e.text==="EOF")throw new x("\\char` missing argument");r=e.text.charCodeAt(0)}else t=10;if(t){if(r=ya[e.text],r==null||r>=t)throw new x("Invalid base-"+t+" digit "+e.text);for(var n;(n=ya[o.future().text])!=null&&n<t;)r*=t,r+=n,o.popToken()}return"\\@char{"+r+"}"});var Ir=function(e,t){var r=e.consumeArgs(1)[0];if(r.length!==1)throw new x("\\gdef's first argument must be a macro name");var n=r[0].text,i=0;for(r=e.consumeArgs(1)[0];r.length===1&&r[0].text==="#";){if(r=e.consumeArgs(1)[0],r.length!==1)throw new x('Invalid argument number length "'+r.length+'"');if(!/^[1-9]$/.test(r[0].text))throw new x('Invalid argument number "'+r[0].text+'"');if(i++,parseInt(r[0].text)!==i)throw new x('Argument number "'+r[0].text+'" out of order');r=e.consumeArgs(1)[0]}return e.macros.set(n,{tokens:r,numArgs:i},t),""};g("\\gdef",function(o){return Ir(o,!0)}),g("\\def",function(o){return Ir(o,!1)}),g("\\global",function(o){var e=o.consumeArgs(1)[0];if(e.length!==1)throw new x("Invalid command after \\global");var t=e[0].text;if(t==="\\def")return Ir(o,!0);throw new x("Invalid command '"+t+"' after \\global")});var Lr=function(e,t,r){var n=e.consumeArgs(1)[0];if(n.length!==1)throw new x("\\newcommand's first argument must be a macro name");var i=n[0].text,l=e.isDefined(i);if(l&&!t)throw new x("\\newcommand{"+i+"} attempting to redefine "+(i+"; use \\renewcommand"));if(!l&&!r)throw new x("\\renewcommand{"+i+"} when command "+i+" does not yet exist; use \\newcommand");var m=0;if(n=e.consumeArgs(1)[0],n.length===1&&n[0].text==="["){for(var y="",c=e.expandNextToken();c.text!=="]"&&c.text!=="EOF";)y+=c.text,c=e.expandNextToken();if(!y.match(/^\s*[0-9]+\s*$/))throw new x("Invalid number of arguments: "+y);m=parseInt(y),n=e.consumeArgs(1)[0]}return e.macros.set(i,{tokens:n,numArgs:m}),""};g("\\newcommand",function(o){return Lr(o,!1,!0)}),g("\\renewcommand",function(o){return Lr(o,!0,!1)}),g("\\providecommand",function(o){return Lr(o,!0,!0)}),g("\\bgroup","{"),g("\\egroup","}"),g("\\lq","`"),g("\\rq","'"),g("\\aa","\\r a"),g("\\AA","\\r A"),g("\\textcopyright","\\html@mathml{\\textcircled{c}}{\\char`©}"),g("\\copyright","\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}"),g("\\textregistered","\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}"),g("ℬ","\\mathscr{B}"),g("ℰ","\\mathscr{E}"),g("ℱ","\\mathscr{F}"),g("ℋ","\\mathscr{H}"),g("ℐ","\\mathscr{I}"),g("ℒ","\\mathscr{L}"),g("ℳ","\\mathscr{M}"),g("ℛ","\\mathscr{R}"),g("ℭ","\\mathfrak{C}"),g("ℌ","\\mathfrak{H}"),g("ℨ","\\mathfrak{Z}"),g("\\Bbbk","\\Bbb{k}"),g("·","\\cdotp"),g("\\llap","\\mathllap{\\textrm{#1}}"),g("\\rlap","\\mathrlap{\\textrm{#1}}"),g("\\clap","\\mathclap{\\textrm{#1}}"),g("\\not",'\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}'),g("\\neq","\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}"),g("\\ne","\\neq"),g("≠","\\neq"),g("\\notin","\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}"),g("∉","\\notin"),g("≘","\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}"),g("≙","\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}"),g("≚","\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}"),g("≛","\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}"),g("≝","\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}"),g("≞","\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}"),g("≟","\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}"),g("⟂","\\perp"),g("‼","\\mathclose{!\\mkern-0.8mu!}"),g("∌","\\notni"),g("⌜","\\ulcorner"),g("⌝","\\urcorner"),g("⌞","\\llcorner"),g("⌟","\\lrcorner"),g("©","\\copyright"),g("®","\\textregistered"),g("️","\\textregistered"),g("\\vdots","\\mathord{\\varvdots\\rule{0pt}{15pt}}"),g("⋮","\\vdots"),g("\\varGamma","\\mathit{\\Gamma}"),g("\\varDelta","\\mathit{\\Delta}"),g("\\varTheta","\\mathit{\\Theta}"),g("\\varLambda","\\mathit{\\Lambda}"),g("\\varXi","\\mathit{\\Xi}"),g("\\varPi","\\mathit{\\Pi}"),g("\\varSigma","\\mathit{\\Sigma}"),g("\\varUpsilon","\\mathit{\\Upsilon}"),g("\\varPhi","\\mathit{\\Phi}"),g("\\varPsi","\\mathit{\\Psi}"),g("\\varOmega","\\mathit{\\Omega}"),g("\\substack","\\begin{subarray}{c}#1\\end{subarray}"),g("\\colon","\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu"),g("\\boxed","\\fbox{$\\displaystyle{#1}$}"),g("\\iff","\\DOTSB\\;\\Longleftrightarrow\\;"),g("\\implies","\\DOTSB\\;\\Longrightarrow\\;"),g("\\impliedby","\\DOTSB\\;\\Longleftarrow\\;");var ga={",":"\\dotsc","\\not":"\\dotsb","+":"\\dotsb","=":"\\dotsb","<":"\\dotsb",">":"\\dotsb","-":"\\dotsb","*":"\\dotsb",":":"\\dotsb","\\DOTSB":"\\dotsb","\\coprod":"\\dotsb","\\bigvee":"\\dotsb","\\bigwedge":"\\dotsb","\\biguplus":"\\dotsb","\\bigcap":"\\dotsb","\\bigcup":"\\dotsb","\\prod":"\\dotsb","\\sum":"\\dotsb","\\bigotimes":"\\dotsb","\\bigoplus":"\\dotsb","\\bigodot":"\\dotsb","\\bigsqcup":"\\dotsb","\\And":"\\dotsb","\\longrightarrow":"\\dotsb","\\Longrightarrow":"\\dotsb","\\longleftarrow":"\\dotsb","\\Longleftarrow":"\\dotsb","\\longleftrightarrow":"\\dotsb","\\Longleftrightarrow":"\\dotsb","\\mapsto":"\\dotsb","\\longmapsto":"\\dotsb","\\hookrightarrow":"\\dotsb","\\doteq":"\\dotsb","\\mathbin":"\\dotsb","\\mathrel":"\\dotsb","\\relbar":"\\dotsb","\\Relbar":"\\dotsb","\\xrightarrow":"\\dotsb","\\xleftarrow":"\\dotsb","\\DOTSI":"\\dotsi","\\int":"\\dotsi","\\oint":"\\dotsi","\\iint":"\\dotsi","\\iiint":"\\dotsi","\\iiiint":"\\dotsi","\\idotsint":"\\dotsi","\\DOTSX":"\\dotsx"};g("\\dots",function(o){var e="\\dotso",t=o.expandAfterFuture().text;return t in ga?e=ga[t]:(t.substr(0,4)==="\\not"||t in me.math&&N.contains(["bin","rel"],me.math[t].group))&&(e="\\dotsb"),e});var Mr={")":!0,"]":!0,"\\rbrack":!0,"\\}":!0,"\\rbrace":!0,"\\rangle":!0,"\\rceil":!0,"\\rfloor":!0,"\\rgroup":!0,"\\rmoustache":!0,"\\right":!0,"\\bigr":!0,"\\biggr":!0,"\\Bigr":!0,"\\Biggr":!0,$:!0,";":!0,".":!0,",":!0};g("\\dotso",function(o){var e=o.future().text;return e in Mr?"\\ldots\\,":"\\ldots"}),g("\\dotsc",function(o){var e=o.future().text;return e in Mr&&e!==","?"\\ldots\\,":"\\ldots"}),g("\\cdots",function(o){var e=o.future().text;return e in Mr?"\\@cdots\\,":"\\@cdots"}),g("\\dotsb","\\cdots"),g("\\dotsm","\\cdots"),g("\\dotsi","\\!\\cdots"),g("\\dotsx","\\ldots\\,"),g("\\DOTSI","\\relax"),g("\\DOTSB","\\relax"),g("\\DOTSX","\\relax"),g("\\tmspace","\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"),g("\\,","\\tmspace+{3mu}{.1667em}"),g("\\thinspace","\\,"),g("\\>","\\mskip{4mu}"),g("\\:","\\tmspace+{4mu}{.2222em}"),g("\\medspace","\\:"),g("\\;","\\tmspace+{5mu}{.2777em}"),g("\\thickspace","\\;"),g("\\!","\\tmspace-{3mu}{.1667em}"),g("\\negthinspace","\\!"),g("\\negmedspace","\\tmspace-{4mu}{.2222em}"),g("\\negthickspace","\\tmspace-{5mu}{.277em}"),g("\\enspace","\\kern.5em "),g("\\enskip","\\hskip.5em\\relax"),g("\\quad","\\hskip1em\\relax"),g("\\qquad","\\hskip2em\\relax"),g("\\tag","\\@ifstar\\tag@literal\\tag@paren"),g("\\tag@paren","\\tag@literal{({#1})}"),g("\\tag@literal",function(o){if(o.macros.get("\\df@tag"))throw new x("Multiple \\tag");return"\\gdef\\df@tag{\\text{#1}}"}),g("\\bmod","\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"),g("\\pod","\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"),g("\\pmod","\\pod{{\\rm mod}\\mkern6mu#1}"),g("\\mod","\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"),g("\\pmb","\\html@mathml{\\@binrel{#1}{\\mathrlap{#1}\\kern0.5px#1}}{\\mathbf{#1}}"),g("\\\\","\\newline"),g("\\TeX","\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");var ca=it["Main-Regular"][84][1]-.7*it["Main-Regular"][65][1]+"em";g("\\LaTeX","\\textrm{\\html@mathml{"+("L\\kern-.36em\\raisebox{"+ca+"}{\\scriptstyle A}")+"\\kern-.15em\\TeX}{LaTeX}}"),g("\\KaTeX","\\textrm{\\html@mathml{"+("K\\kern-.17em\\raisebox{"+ca+"}{\\scriptstyle A}")+"\\kern-.15em\\TeX}{KaTeX}}"),g("\\hspace","\\@ifstar\\@hspacer\\@hspace"),g("\\@hspace","\\hskip #1\\relax"),g("\\@hspacer","\\rule{0pt}{0pt}\\hskip #1\\relax"),g("\\ordinarycolon",":"),g("\\vcentcolon","\\mathrel{\\mathop\\ordinarycolon}"),g("\\dblcolon",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}'),g("\\coloneqq",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}'),g("\\Coloneqq",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}'),g("\\coloneq",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}'),g("\\Coloneq",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}'),g("\\eqqcolon",'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}'),g("\\Eqqcolon",'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}'),g("\\eqcolon",'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}'),g("\\Eqcolon",'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}'),g("\\colonapprox",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}'),g("\\Colonapprox",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}'),g("\\colonsim",'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}'),g("\\Colonsim",'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}'),g("∷","\\dblcolon"),g("∹","\\eqcolon"),g("≔","\\coloneqq"),g("≕","\\eqqcolon"),g("⩴","\\Coloneqq"),g("\\ratio","\\vcentcolon"),g("\\coloncolon","\\dblcolon"),g("\\colonequals","\\coloneqq"),g("\\coloncolonequals","\\Coloneqq"),g("\\equalscolon","\\eqqcolon"),g("\\equalscoloncolon","\\Eqqcolon"),g("\\colonminus","\\coloneq"),g("\\coloncolonminus","\\Coloneq"),g("\\minuscolon","\\eqcolon"),g("\\minuscoloncolon","\\Eqcolon"),g("\\coloncolonapprox","\\Colonapprox"),g("\\coloncolonsim","\\Colonsim"),g("\\simcolon","\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),g("\\simcoloncolon","\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}"),g("\\approxcolon","\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}"),g("\\approxcoloncolon","\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"),g("\\notni","\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}"),g("\\limsup","\\DOTSB\\operatorname*{lim\\,sup}"),g("\\liminf","\\DOTSB\\operatorname*{lim\\,inf}"),g("\\gvertneqq","\\html@mathml{\\@gvertneqq}{≩}"),g("\\lvertneqq","\\html@mathml{\\@lvertneqq}{≨}"),g("\\ngeqq","\\html@mathml{\\@ngeqq}{≱}"),g("\\ngeqslant","\\html@mathml{\\@ngeqslant}{≱}"),g("\\nleqq","\\html@mathml{\\@nleqq}{≰}"),g("\\nleqslant","\\html@mathml{\\@nleqslant}{≰}"),g("\\nshortmid","\\html@mathml{\\@nshortmid}{∤}"),g("\\nshortparallel","\\html@mathml{\\@nshortparallel}{∦}"),g("\\nsubseteqq","\\html@mathml{\\@nsubseteqq}{⊈}"),g("\\nsupseteqq","\\html@mathml{\\@nsupseteqq}{⊉}"),g("\\varsubsetneq","\\html@mathml{\\@varsubsetneq}{⊊}"),g("\\varsubsetneqq","\\html@mathml{\\@varsubsetneqq}{⫋}"),g("\\varsupsetneq","\\html@mathml{\\@varsupsetneq}{⊋}"),g("\\varsupsetneqq","\\html@mathml{\\@varsupsetneqq}{⫌}"),g("\\llbracket","\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}"),g("\\rrbracket","\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}"),g("⟦","\\llbracket"),g("⟧","\\rrbracket"),g("\\lBrace","\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}"),g("\\rBrace","\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}"),g("⦃","\\lBrace"),g("⦄","\\rBrace"),g("\\darr","\\downarrow"),g("\\dArr","\\Downarrow"),g("\\Darr","\\Downarrow"),g("\\lang","\\langle"),g("\\rang","\\rangle"),g("\\uarr","\\uparrow"),g("\\uArr","\\Uparrow"),g("\\Uarr","\\Uparrow"),g("\\N","\\mathbb{N}"),g("\\R","\\mathbb{R}"),g("\\Z","\\mathbb{Z}"),g("\\alef","\\aleph"),g("\\alefsym","\\aleph"),g("\\Alpha","\\mathrm{A}"),g("\\Beta","\\mathrm{B}"),g("\\bull","\\bullet"),g("\\Chi","\\mathrm{X}"),g("\\clubs","\\clubsuit"),g("\\cnums","\\mathbb{C}"),g("\\Complex","\\mathbb{C}"),g("\\Dagger","\\ddagger"),g("\\diamonds","\\diamondsuit"),g("\\empty","\\emptyset"),g("\\Epsilon","\\mathrm{E}"),g("\\Eta","\\mathrm{H}"),g("\\exist","\\exists"),g("\\harr","\\leftrightarrow"),g("\\hArr","\\Leftrightarrow"),g("\\Harr","\\Leftrightarrow"),g("\\hearts","\\heartsuit"),g("\\image","\\Im"),g("\\infin","\\infty"),g("\\Iota","\\mathrm{I}"),g("\\isin","\\in"),g("\\Kappa","\\mathrm{K}"),g("\\larr","\\leftarrow"),g("\\lArr","\\Leftarrow"),g("\\Larr","\\Leftarrow"),g("\\lrarr","\\leftrightarrow"),g("\\lrArr","\\Leftrightarrow"),g("\\Lrarr","\\Leftrightarrow"),g("\\Mu","\\mathrm{M}"),g("\\natnums","\\mathbb{N}"),g("\\Nu","\\mathrm{N}"),g("\\Omicron","\\mathrm{O}"),g("\\plusmn","\\pm"),g("\\rarr","\\rightarrow"),g("\\rArr","\\Rightarrow"),g("\\Rarr","\\Rightarrow"),g("\\real","\\Re"),g("\\reals","\\mathbb{R}"),g("\\Reals","\\mathbb{R}"),g("\\Rho","\\mathrm{P}"),g("\\sdot","\\cdot"),g("\\sect","\\S"),g("\\spades","\\spadesuit"),g("\\sub","\\subset"),g("\\sube","\\subseteq"),g("\\supe","\\supseteq"),g("\\Tau","\\mathrm{T}"),g("\\thetasym","\\vartheta"),g("\\weierp","\\wp"),g("\\Zeta","\\mathrm{Z}"),g("\\argmin","\\DOTSB\\operatorname*{arg\\,min}"),g("\\argmax","\\DOTSB\\operatorname*{arg\\,max}"),g("\\plim","\\DOTSB\\mathop{\\operatorname{plim}}\\limits"),g("\\blue","\\textcolor{##6495ed}{#1}"),g("\\orange","\\textcolor{##ffa500}{#1}"),g("\\pink","\\textcolor{##ff00af}{#1}"),g("\\red","\\textcolor{##df0030}{#1}"),g("\\green","\\textcolor{##28ae7b}{#1}"),g("\\gray","\\textcolor{gray}{#1}"),g("\\purple","\\textcolor{##9d38bd}{#1}"),g("\\blueA","\\textcolor{##ccfaff}{#1}"),g("\\blueB","\\textcolor{##80f6ff}{#1}"),g("\\blueC","\\textcolor{##63d9ea}{#1}"),g("\\blueD","\\textcolor{##11accd}{#1}"),g("\\blueE","\\textcolor{##0c7f99}{#1}"),g("\\tealA","\\textcolor{##94fff5}{#1}"),g("\\tealB","\\textcolor{##26edd5}{#1}"),g("\\tealC","\\textcolor{##01d1c1}{#1}"),g("\\tealD","\\textcolor{##01a995}{#1}"),g("\\tealE","\\textcolor{##208170}{#1}"),g("\\greenA","\\textcolor{##b6ffb0}{#1}"),g("\\greenB","\\textcolor{##8af281}{#1}"),g("\\greenC","\\textcolor{##74cf70}{#1}"),g("\\greenD","\\textcolor{##1fab54}{#1}"),g("\\greenE","\\textcolor{##0d923f}{#1}"),g("\\goldA","\\textcolor{##ffd0a9}{#1}"),g("\\goldB","\\textcolor{##ffbb71}{#1}"),g("\\goldC","\\textcolor{##ff9c39}{#1}"),g("\\goldD","\\textcolor{##e07d10}{#1}"),g("\\goldE","\\textcolor{##a75a05}{#1}"),g("\\redA","\\textcolor{##fca9a9}{#1}"),g("\\redB","\\textcolor{##ff8482}{#1}"),g("\\redC","\\textcolor{##f9685d}{#1}"),g("\\redD","\\textcolor{##e84d39}{#1}"),g("\\redE","\\textcolor{##bc2612}{#1}"),g("\\maroonA","\\textcolor{##ffbde0}{#1}"),g("\\maroonB","\\textcolor{##ff92c6}{#1}"),g("\\maroonC","\\textcolor{##ed5fa6}{#1}"),g("\\maroonD","\\textcolor{##ca337c}{#1}"),g("\\maroonE","\\textcolor{##9e034e}{#1}"),g("\\purpleA","\\textcolor{##ddd7ff}{#1}"),g("\\purpleB","\\textcolor{##c6b9fc}{#1}"),g("\\purpleC","\\textcolor{##aa87ff}{#1}"),g("\\purpleD","\\textcolor{##7854ab}{#1}"),g("\\purpleE","\\textcolor{##543b78}{#1}"),g("\\mintA","\\textcolor{##f5f9e8}{#1}"),g("\\mintB","\\textcolor{##edf2df}{#1}"),g("\\mintC","\\textcolor{##e0e5cc}{#1}"),g("\\grayA","\\textcolor{##f6f7f7}{#1}"),g("\\grayB","\\textcolor{##f0f1f2}{#1}"),g("\\grayC","\\textcolor{##e3e5e6}{#1}"),g("\\grayD","\\textcolor{##d6d8da}{#1}"),g("\\grayE","\\textcolor{##babec2}{#1}"),g("\\grayF","\\textcolor{##888d93}{#1}"),g("\\grayG","\\textcolor{##626569}{#1}"),g("\\grayH","\\textcolor{##3b3e40}{#1}"),g("\\grayI","\\textcolor{##21242c}{#1}"),g("\\kaBlue","\\textcolor{##314453}{#1}"),g("\\kaGreen","\\textcolor{##71B307}{#1}");var pa={"\\relax":!0,"^":!0,_:!0,"\\limits":!0,"\\nolimits":!0},ds=function(){function o(t,r,n){this.settings=void 0,this.expansionCount=void 0,this.lexer=void 0,this.macros=void 0,this.stack=void 0,this.mode=void 0,this.settings=r,this.expansionCount=0,this.feed(t),this.macros=new ls(us,r.macros),this.mode=n,this.stack=[]}var e=o.prototype;return e.feed=function(r){this.lexer=new ha(r,this.settings)},e.switchMode=function(r){this.mode=r},e.beginGroup=function(){this.macros.beginGroup()},e.endGroup=function(){this.macros.endGroup()},e.future=function(){return this.stack.length===0&&this.pushToken(this.lexer.lex()),this.stack[this.stack.length-1]},e.popToken=function(){return this.future(),this.stack.pop()},e.pushToken=function(r){this.stack.push(r)},e.pushTokens=function(r){var n;(n=this.stack).push.apply(n,r)},e.consumeSpaces=function(){for(;;){var r=this.future();if(r.text===" ")this.stack.pop();else break}},e.consumeArgs=function(r){for(var n=[],i=0;i<r;++i){this.consumeSpaces();var l=this.popToken();if(l.text==="{"){for(var m=[],y=1;y!==0;){var c=this.popToken();if(m.push(c),c.text==="{")++y;else if(c.text==="}")--y;else if(c.text==="EOF")throw new x("End of input in macro argument",l)}m.pop(),m.reverse(),n[i]=m}else{if(l.text==="EOF")throw new x("End of input expecting macro argument");n[i]=[l]}}return n},e.expandOnce=function(){var r=this.popToken(),n=r.text,i=this._getExpansion(n);if(i==null)return this.pushToken(r),r;if(this.expansionCount++,this.expansionCount>this.settings.maxExpand)throw new x("Too many expansions: infinite loop or need to increase maxExpand setting");var l=i.tokens;if(i.numArgs){var m=this.consumeArgs(i.numArgs);l=l.slice();for(var y=l.length-1;y>=0;--y){var c=l[y];if(c.text==="#"){if(y===0)throw new x("Incomplete placeholder at end of macro body",c);if(c=l[--y],c.text==="#")l.splice(y+1,1);else if(/^[1-9]$/.test(c.text)){var b;(b=l).splice.apply(b,[y,2].concat(m[+c.text-1]))}else throw new x("Not a valid argument number",c)}}}return this.pushTokens(l),l},e.expandAfterFuture=function(){return this.expandOnce(),this.future()},e.expandNextToken=function(){for(;;){var r=this.expandOnce();if(r instanceof _)if(r.text==="\\relax")this.stack.pop();else return this.stack.pop()}throw new Error},e.expandMacro=function(r){if(this.macros.get(r)){var n=[],i=this.stack.length;for(this.pushToken(new _(r));this.stack.length>i;){var l=this.expandOnce();l instanceof _&&n.push(this.stack.pop())}return n}},e.expandMacroAsText=function(r){var n=this.expandMacro(r);return n&&n.map(function(i){return i.text}).join("")},e._getExpansion=function(r){var n=this.macros.get(r);if(n==null)return n;var i=typeof n=="function"?n(this):n;if(typeof i=="string"){var l=0;if(i.indexOf("#")!==-1)for(var m=i.replace(/##/g,"");m.indexOf("#"+(l+1))!==-1;)++l;for(var y=new ha(i,this.settings),c=[],b=y.lex();b.text!=="EOF";)c.push(b),b=y.lex();c.reverse();var k={tokens:c,numArgs:l};return k}return i},e.isDefined=function(r){return this.macros.has(r)||Wt.hasOwnProperty(r)||me.math.hasOwnProperty(r)||me.text.hasOwnProperty(r)||pa.hasOwnProperty(r)},o}(),fa={"́":{text:"\\'",math:"\\acute"},"̀":{text:"\\`",math:"\\grave"},"̈":{text:'\\"',math:"\\ddot"},"̃":{text:"\\~",math:"\\tilde"},"̄":{text:"\\=",math:"\\bar"},"̆":{text:"\\u",math:"\\breve"},"̌":{text:"\\v",math:"\\check"},"̂":{text:"\\^",math:"\\hat"},"̇":{text:"\\.",math:"\\dot"},"̊":{text:"\\r",math:"\\mathring"},"̋":{text:"\\H"}},va={á:"á",à:"à",ä:"ä",ǟ:"ǟ",ã:"ã",ā:"ā",ă:"ă",ắ:"ắ",ằ:"ằ",ẵ:"ẵ",ǎ:"ǎ",â:"â",ấ:"ấ",ầ:"ầ",ẫ:"ẫ",ȧ:"ȧ",ǡ:"ǡ",å:"å",ǻ:"ǻ",ḃ:"ḃ",ć:"ć",č:"č",ĉ:"ĉ",ċ:"ċ",ď:"ď",ḋ:"ḋ",é:"é",è:"è",ë:"ë",ẽ:"ẽ",ē:"ē",ḗ:"ḗ",ḕ:"ḕ",ĕ:"ĕ",ě:"ě",ê:"ê",ế:"ế",ề:"ề",ễ:"ễ",ė:"ė",ḟ:"ḟ",ǵ:"ǵ",ḡ:"ḡ",ğ:"ğ",ǧ:"ǧ",ĝ:"ĝ",ġ:"ġ",ḧ:"ḧ",ȟ:"ȟ",ĥ:"ĥ",ḣ:"ḣ",í:"í",ì:"ì",ï:"ï",ḯ:"ḯ",ĩ:"ĩ",ī:"ī",ĭ:"ĭ",ǐ:"ǐ",î:"î",ǰ:"ǰ",ĵ:"ĵ",ḱ:"ḱ",ǩ:"ǩ",ĺ:"ĺ",ľ:"ľ",ḿ:"ḿ",ṁ:"ṁ",ń:"ń",ǹ:"ǹ",ñ:"ñ",ň:"ň",ṅ:"ṅ",ó:"ó",ò:"ò",ö:"ö",ȫ:"ȫ",õ:"õ",ṍ:"ṍ",ṏ:"ṏ",ȭ:"ȭ",ō:"ō",ṓ:"ṓ",ṑ:"ṑ",ŏ:"ŏ",ǒ:"ǒ",ô:"ô",ố:"ố",ồ:"ồ",ỗ:"ỗ",ȯ:"ȯ",ȱ:"ȱ",ő:"ő",ṕ:"ṕ",ṗ:"ṗ",ŕ:"ŕ",ř:"ř",ṙ:"ṙ",ś:"ś",ṥ:"ṥ",š:"š",ṧ:"ṧ",ŝ:"ŝ",ṡ:"ṡ",ẗ:"ẗ",ť:"ť",ṫ:"ṫ",ú:"ú",ù:"ù",ü:"ü",ǘ:"ǘ",ǜ:"ǜ",ǖ:"ǖ",ǚ:"ǚ",ũ:"ũ",ṹ:"ṹ",ū:"ū",ṻ:"ṻ",ŭ:"ŭ",ǔ:"ǔ",û:"û",ů:"ů",ű:"ű",ṽ:"ṽ",ẃ:"ẃ",ẁ:"ẁ",ẅ:"ẅ",ŵ:"ŵ",ẇ:"ẇ",ẘ:"ẘ",ẍ:"ẍ",ẋ:"ẋ",ý:"ý",ỳ:"ỳ",ÿ:"ÿ",ỹ:"ỹ",ȳ:"ȳ",ŷ:"ŷ",ẏ:"ẏ",ẙ:"ẙ",ź:"ź",ž:"ž",ẑ:"ẑ",ż:"ż",Á:"Á",À:"À",Ä:"Ä",Ǟ:"Ǟ",Ã:"Ã",Ā:"Ā",Ă:"Ă",Ắ:"Ắ",Ằ:"Ằ",Ẵ:"Ẵ",Ǎ:"Ǎ",Â:"Â",Ấ:"Ấ",Ầ:"Ầ",Ẫ:"Ẫ",Ȧ:"Ȧ",Ǡ:"Ǡ",Å:"Å",Ǻ:"Ǻ",Ḃ:"Ḃ",Ć:"Ć",Č:"Č",Ĉ:"Ĉ",Ċ:"Ċ",Ď:"Ď",Ḋ:"Ḋ",É:"É",È:"È",Ë:"Ë",Ẽ:"Ẽ",Ē:"Ē",Ḗ:"Ḗ",Ḕ:"Ḕ",Ĕ:"Ĕ",Ě:"Ě",Ê:"Ê",Ế:"Ế",Ề:"Ề",Ễ:"Ễ",Ė:"Ė",Ḟ:"Ḟ",Ǵ:"Ǵ",Ḡ:"Ḡ",Ğ:"Ğ",Ǧ:"Ǧ",Ĝ:"Ĝ",Ġ:"Ġ",Ḧ:"Ḧ",Ȟ:"Ȟ",Ĥ:"Ĥ",Ḣ:"Ḣ",Í:"Í",Ì:"Ì",Ï:"Ï",Ḯ:"Ḯ",Ĩ:"Ĩ",Ī:"Ī",Ĭ:"Ĭ",Ǐ:"Ǐ",Î:"Î",İ:"İ",Ĵ:"Ĵ",Ḱ:"Ḱ",Ǩ:"Ǩ",Ĺ:"Ĺ",Ľ:"Ľ",Ḿ:"Ḿ",Ṁ:"Ṁ",Ń:"Ń",Ǹ:"Ǹ",Ñ:"Ñ",Ň:"Ň",Ṅ:"Ṅ",Ó:"Ó",Ò:"Ò",Ö:"Ö",Ȫ:"Ȫ",Õ:"Õ",Ṍ:"Ṍ",Ṏ:"Ṏ",Ȭ:"Ȭ",Ō:"Ō",Ṓ:"Ṓ",Ṑ:"Ṑ",Ŏ:"Ŏ",Ǒ:"Ǒ",Ô:"Ô",Ố:"Ố",Ồ:"Ồ",Ỗ:"Ỗ",Ȯ:"Ȯ",Ȱ:"Ȱ",Ő:"Ő",Ṕ:"Ṕ",Ṗ:"Ṗ",Ŕ:"Ŕ",Ř:"Ř",Ṙ:"Ṙ",Ś:"Ś",Ṥ:"Ṥ",Š:"Š",Ṧ:"Ṧ",Ŝ:"Ŝ",Ṡ:"Ṡ",Ť:"Ť",Ṫ:"Ṫ",Ú:"Ú",Ù:"Ù",Ü:"Ü",Ǘ:"Ǘ",Ǜ:"Ǜ",Ǖ:"Ǖ",Ǚ:"Ǚ",Ũ:"Ũ",Ṹ:"Ṹ",Ū:"Ū",Ṻ:"Ṻ",Ŭ:"Ŭ",Ǔ:"Ǔ",Û:"Û",Ů:"Ů",Ű:"Ű",Ṽ:"Ṽ",Ẃ:"Ẃ",Ẁ:"Ẁ",Ẅ:"Ẅ",Ŵ:"Ŵ",Ẇ:"Ẇ",Ẍ:"Ẍ",Ẋ:"Ẋ",Ý:"Ý",Ỳ:"Ỳ",Ÿ:"Ÿ",Ỹ:"Ỹ",Ȳ:"Ȳ",Ŷ:"Ŷ",Ẏ:"Ẏ",Ź:"Ź",Ž:"Ž",Ẑ:"Ẑ",Ż:"Ż",ά:"ά",ὰ:"ὰ",ᾱ:"ᾱ",ᾰ:"ᾰ",έ:"έ",ὲ:"ὲ",ή:"ή",ὴ:"ὴ",ί:"ί",ὶ:"ὶ",ϊ:"ϊ",ΐ:"ΐ",ῒ:"ῒ",ῑ:"ῑ",ῐ:"ῐ",ό:"ό",ὸ:"ὸ",ύ:"ύ",ὺ:"ὺ",ϋ:"ϋ",ΰ:"ΰ",ῢ:"ῢ",ῡ:"ῡ",ῠ:"ῠ",ώ:"ώ",ὼ:"ὼ",Ύ:"Ύ",Ὺ:"Ὺ",Ϋ:"Ϋ",Ῡ:"Ῡ",Ῠ:"Ῠ",Ώ:"Ώ",Ὼ:"Ὼ"},Xt=function(){function o(t,r){this.mode=void 0,this.gullet=void 0,this.settings=void 0,this.leftrightDepth=void 0,this.nextToken=void 0,this.mode="math",this.gullet=new ds(t,r,this.mode),this.settings=r,this.leftrightDepth=0}var e=o.prototype;return e.expect=function(r,n){if(n===void 0&&(n=!0),this.fetch().text!==r)throw new x("Expected '"+r+"', got '"+this.fetch().text+"'",this.fetch());n&&this.consume()},e.consume=function(){this.nextToken=null},e.fetch=function(){return this.nextToken==null&&(this.nextToken=this.gullet.expandNextToken()),this.nextToken},e.switchMode=function(r){this.mode=r,this.gullet.switchMode(r)},e.parse=function(){this.gullet.beginGroup(),this.settings.colorIsTextColor&&this.gullet.macros.set("\\color","\\textcolor");var r=this.parseExpression(!1);return this.expect("EOF"),this.gullet.endGroup(),r},e.parseExpression=function(r,n){for(var i=[];;){this.mode==="math"&&this.consumeSpaces();var l=this.fetch();if(o.endOfExpression.indexOf(l.text)!==-1||n&&l.text===n||r&&Wt[l.text]&&Wt[l.text].infix)break;var m=this.parseAtom(n);if(!m)break;i.push(m)}return this.mode==="text"&&this.formLigatures(i),this.handleInfixNodes(i)},e.handleInfixNodes=function(r){for(var n=-1,i,l=0;l<r.length;l++){var m=we(r[l],"infix");if(m){if(n!==-1)throw new x("only one infix operator per group",m.token);n=l,i=m.replaceWith}}if(n!==-1&&i){var y,c,b=r.slice(0,n),k=r.slice(n+1);b.length===1&&b[0].type==="ordgroup"?y=b[0]:y={type:"ordgroup",mode:this.mode,body:b},k.length===1&&k[0].type==="ordgroup"?c=k[0]:c={type:"ordgroup",mode:this.mode,body:k};var A;return i==="\\\\abovefrac"?A=this.callFunction(i,[y,r[n],c],[]):A=this.callFunction(i,[y,c],[]),[A]}else return r},e.handleSupSubscript=function(r){var n=this.fetch(),i=n.text;this.consume();var l=this.parseGroup(r,!1,o.SUPSUB_GREEDINESS,void 0,void 0,!0);if(!l)throw new x("Expected group after '"+i+"'",n);return l},e.formatUnsupportedCmd=function(r){for(var n=[],i=0;i<r.length;i++)n.push({type:"textord",mode:"text",text:r[i]});var l={type:"text",mode:this.mode,body:n},m={type:"color",mode:this.mode,color:this.settings.errorColor,body:[l]};return m},e.parseAtom=function(r){var n=this.parseGroup("atom",!1,null,r);if(this.mode==="text")return n;for(var i,l;;){this.consumeSpaces();var m=this.fetch();if(m.text==="\\limits"||m.text==="\\nolimits"){var y=we(n,"op");if(y){var c=m.text==="\\limits";y.limits=c,y.alwaysHandleSupSub=!0}else if(y=we(n,"operatorname"),y&&y.alwaysHandleSupSub){var b=m.text==="\\limits";y.limits=b}else throw new x("Limit controls must follow a math operator",m);this.consume()}else if(m.text==="^"){if(i)throw new x("Double superscript",m);i=this.handleSupSubscript("superscript")}else if(m.text==="_"){if(l)throw new x("Double subscript",m);l=this.handleSupSubscript("subscript")}else if(m.text==="'"){if(i)throw new x("Double superscript",m);var k={type:"textord",mode:this.mode,text:"\\prime"},A=[k];for(this.consume();this.fetch().text==="'";)A.push(k),this.consume();this.fetch().text==="^"&&A.push(this.handleSupSubscript("superscript")),i={type:"ordgroup",mode:this.mode,body:A}}else break}return i||l?{type:"supsub",mode:this.mode,base:n,sup:i,sub:l}:n},e.parseFunction=function(r,n,i){var l=this.fetch(),m=l.text,y=Wt[m];if(!y)return null;if(this.consume(),i!=null&&y.greediness<=i)throw new x("Got function '"+m+"' with no arguments"+(n?" as "+n:""),l);if(this.mode==="text"&&!y.allowedInText)throw new x("Can't use function '"+m+"' in text mode",l);if(this.mode==="math"&&y.allowedInMath===!1)throw new x("Can't use function '"+m+"' in math mode",l);var c=this.parseArguments(m,y),b=c.args,k=c.optArgs;return this.callFunction(m,b,k,l,r)},e.callFunction=function(r,n,i,l,m){var y={funcName:r,parser:this,token:l,breakOnTokenText:m},c=Wt[r];if(c&&c.handler)return c.handler(y,n,i);throw new x("No function handler for "+r)},e.parseArguments=function(r,n){var i=n.numArgs+n.numOptionalArgs;if(i===0)return{args:[],optArgs:[]};for(var l=n.greediness,m=[],y=[],c=0;c<i;c++){var b=n.argTypes&&n.argTypes[c],k=c<n.numOptionalArgs,A=c>0&&!k||c===0&&!k&&this.mode==="math",W=this.parseGroupOfType("argument to '"+r+"'",b,k,l,A);if(!W){if(k){y.push(null);continue}throw new x("Expected group after '"+r+"'",this.fetch())}(k?y:m).push(W)}return{args:m,optArgs:y}},e.parseGroupOfType=function(r,n,i,l,m){switch(n){case"color":return m&&this.consumeSpaces(),this.parseColorGroup(i);case"size":return m&&this.consumeSpaces(),this.parseSizeGroup(i);case"url":return this.parseUrlGroup(i,m);case"math":case"text":return this.parseGroup(r,i,l,void 0,n,m);case"hbox":{var y=this.parseGroup(r,i,l,void 0,"text",m);if(!y)return y;var c={type:"styling",mode:y.mode,body:[y],style:"text"};return c}case"raw":{if(m&&this.consumeSpaces(),i&&this.fetch().text==="{")return null;var b=this.parseStringGroup("raw",i,!0);if(b)return{type:"raw",mode:"text",string:b.text};throw new x("Expected raw group",this.fetch())}case"original":case null:case void 0:return this.parseGroup(r,i,l,void 0,void 0,m);default:throw new x("Unknown group type as "+r,this.fetch())}},e.consumeSpaces=function(){for(;this.fetch().text===" ";)this.consume()},e.parseStringGroup=function(r,n,i){var l=n?"[":"{",m=n?"]":"}",y=this.fetch();if(y.text!==l){if(n)return null;if(i&&y.text!=="EOF"&&/[^{}[\]]/.test(y.text))return this.consume(),y}var c=this.mode;this.mode="text",this.expect(l);for(var b="",k=this.fetch(),A=0,W=k,E;(E=this.fetch()).text!==m||i&&A>0;){switch(E.text){case"EOF":throw new x("Unexpected end of input in "+r,k.range(W,b));case l:A++;break;case m:A--;break}W=E,b+=W.text,this.consume()}return this.expect(m),this.mode=c,k.range(W,b)},e.parseRegexGroup=function(r,n){var i=this.mode;this.mode="text";for(var l=this.fetch(),m=l,y="",c;(c=this.fetch()).text!=="EOF"&&r.test(y+c.text);)m=c,y+=m.text,this.consume();if(y==="")throw new x("Invalid "+n+": '"+l.text+"'",l);return this.mode=i,l.range(m,y)},e.parseColorGroup=function(r){var n=this.parseStringGroup("color",r);if(!n)return null;var i=/^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(n.text);if(!i)throw new x("Invalid color: '"+n.text+"'",n);var l=i[0];return/^[0-9a-f]{6}$/i.test(l)&&(l="#"+l),{type:"color-token",mode:this.mode,color:l}},e.parseSizeGroup=function(r){var n,i=!1;if(!r&&this.fetch().text!=="{"?n=this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,"size"):n=this.parseStringGroup("size",r),!n)return null;!r&&n.text.length===0&&(n.text="0pt",i=!0);var l=/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(n.text);if(!l)throw new x("Invalid size: '"+n.text+"'",n);var m={number:+(l[1]+l[2]),unit:l[3]};if(!hn(m))throw new x("Invalid unit: '"+m.unit+"'",n);return{type:"size",mode:this.mode,value:m,isBlank:i}},e.parseUrlGroup=function(r,n){this.gullet.lexer.setCatcode("%",13);var i=this.parseStringGroup("url",r,!0);if(this.gullet.lexer.setCatcode("%",14),!i)return null;var l=i.text.replace(/\\([#$%&~_^{}])/g,"$1");return{type:"url",mode:this.mode,url:l}},e.parseGroup=function(r,n,i,l,m,y){var c=this.mode;m&&this.switchMode(m),y&&this.consumeSpaces();var b=this.fetch(),k=b.text,A;if(n?k==="[":k==="{"||k==="\\begingroup"){this.consume();var W=o.endOfGroup[k];this.gullet.beginGroup();var E=this.parseExpression(!1,W),j=this.fetch();this.expect(W),this.gullet.endGroup(),A={type:"ordgroup",mode:this.mode,loc:O.range(b,j),body:E,semisimple:k==="\\begingroup"||void 0}}else if(n)A=null;else if(A=this.parseFunction(l,r,i)||this.parseSymbol(),A==null&&k[0]==="\\"&&!pa.hasOwnProperty(k)){if(this.settings.throwOnError)throw new x("Undefined control sequence: "+k,b);A=this.formatUnsupportedCmd(k),this.consume()}return m&&this.switchMode(c),A},e.formLigatures=function(r){for(var n=r.length-1,i=0;i<n;++i){var l=r[i],m=l.text;m==="-"&&r[i+1].text==="-"&&(i+1<n&&r[i+2].text==="-"?(r.splice(i,3,{type:"textord",mode:"text",loc:O.range(l,r[i+2]),text:"---"}),n-=2):(r.splice(i,2,{type:"textord",mode:"text",loc:O.range(l,r[i+1]),text:"--"}),n-=1)),(m==="'"||m==="`")&&r[i+1].text===m&&(r.splice(i,2,{type:"textord",mode:"text",loc:O.range(l,r[i+1]),text:m+m}),n-=1)}},e.parseSymbol=function(){var r=this.fetch(),n=r.text;if(/^\\verb[^a-zA-Z]/.test(n)){this.consume();var i=n.slice(5),l=i.charAt(0)==="*";if(l&&(i=i.slice(1)),i.length<2||i.charAt(0)!==i.slice(-1))throw new x(`\\verb assertion failed --
                    please report what input caused this bug`);return i=i.slice(1,-1),{type:"verb",mode:"text",body:i,star:l}}va.hasOwnProperty(n[0])&&!me[this.mode][n[0]]&&(this.settings.strict&&this.mode==="math"&&this.settings.reportNonstrict("unicodeTextInMathMode",'Accented Unicode text character "'+n[0]+'" used in math mode',r),n=va[n[0]]+n.substr(1));var m=ss.exec(n);m&&(n=n.substring(0,m.index),n==="i"?n="ı":n==="j"&&(n="ȷ"));var y;if(me[this.mode][n]){this.settings.strict&&this.mode==="math"&&hr.indexOf(n)>=0&&this.settings.reportNonstrict("unicodeTextInMathMode",'Latin-1/Unicode text character "'+n[0]+'" used in math mode',r);var c=me[this.mode][n].group,b=O.range(r),k;if(Ja.hasOwnProperty(c)){var A=c;k={type:"atom",mode:this.mode,family:A,loc:b,text:n}}else k={type:c,mode:this.mode,loc:b,text:n};y=k}else if(n.charCodeAt(0)>=128)this.settings.strict&&(Kr(n.charCodeAt(0))?this.mode==="math"&&this.settings.reportNonstrict("unicodeTextInMathMode",'Unicode text character "'+n[0]+'" used in math mode',r):this.settings.reportNonstrict("unknownSymbol",'Unrecognized Unicode character "'+n[0]+'"'+(" ("+n.charCodeAt(0)+")"),r)),y={type:"textord",mode:"text",loc:O.range(r),text:n};else return null;if(this.consume(),m)for(var W=0;W<m[0].length;W++){var E=m[0][W];if(!fa[E])throw new x("Unknown accent ' "+E+"'",r);var j=fa[E][this.mode];if(!j)throw new x("Accent "+E+" unsupported in "+this.mode+" mode",r);y={type:"accent",mode:this.mode,loc:O.range(r),label:j,isStretchy:!1,isShifty:!0,base:y}}return y},o}();Xt.endOfExpression=["}","\\endgroup","\\end","\\right","&"],Xt.endOfGroup={"[":"]","{":"}","\\begingroup":"\\endgroup"},Xt.SUPSUB_GREEDINESS=1;var hs=function(e,t){if(!(typeof e=="string"||e instanceof String))throw new TypeError("KaTeX can only parse string typed expression");var r=new Xt(e,t);delete r.gullet.macros.current["\\df@tag"];var n=r.parse();if(r.gullet.macros.get("\\df@tag")){if(!t.displayMode)throw new x("\\tag works only in display equations");r.gullet.feed("\\df@tag"),n=[{type:"tag",mode:"text",body:n,tag:r.parse()}]}return n},Pr=hs,ba=function(e,t,r){t.textContent="";var n=Dr(e,r).toNode();t.appendChild(n)};typeof document<"u"&&document.compatMode!=="CSS1Compat"&&(typeof console<"u"&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."),ba=function(){throw new x("KaTeX doesn't work in quirks mode.")});var ms=function(e,t){var r=Dr(e,t).toMarkup();return r},ys=function(e,t){var r=new Ke(t);return Pr(e,r)},wa=function(e,t,r){if(r.throwOnError||!(e instanceof x))throw e;var n=T.makeSpan(["katex-error"],[new Ne(t)]);return n.setAttribute("title",e.toString()),n.setAttribute("style","color:"+r.errorColor),n},Dr=function(e,t){var r=new Ke(t);try{var n=Pr(e,r);return Oi(n,e,r)}catch(i){return wa(i,e,r)}},gs=function(e,t){var r=new Ke(t);try{var n=Pr(e,r);return Ci(n,e,r)}catch(i){return wa(i,e,r)}},cs={version:"0.11.1",render:ba,renderToString:ms,ParseError:x,__parse:ys,__renderToDomTree:Dr,__renderToHTMLTree:gs,__setFontMetrics:Ya,__defineSymbol:a,__defineMacro:g,__domTree:{Span:St,Anchor:ar,SymbolNode:Ne,SvgNode:ct,PathNode:At,LineNode:ir}};q.default=cs}]).default})})(Ca);var Us=Ca.exports;const tr=_s(Us),za=function(u,d){let p="",q=u[u.length-1].loc.start;for(let O=u.length-1;O>=0;O--)u[O].loc.start>q&&(p+=" ",q=u[O].loc.start),p+=u[O].text,q+=u[O].text.length;return te.go(C.go(p,d))};var C={go:function(u,d){if(!u)return[];d===void 0&&(d="ce");let p="0";const q={};q.parenthesisLevel=0,u=u.replace(/\n/g," "),u=u.replace(/[\u2212\u2013\u2014\u2010]/g,"-"),u=u.replace(/[\u2026]/g,"...");let R,O=10;const _=[];for(;;){R!==u?(O=10,R=u):O--;const x=C.stateMachines[d],ae=x.transitions[p]||x.transitions["*"];e:for(let de=0;de<ae.length;de++){const Ce=C.patterns.match_(ae[de].pattern,u);if(Ce){const ne=ae[de].task;for(let Y=0;Y<ne.action_.length;Y++){var M;if(x.actions[ne.action_[Y].type_])M=x.actions[ne.action_[Y].type_](q,Ce.match_,ne.action_[Y].option);else if(C.actions[ne.action_[Y].type_])M=C.actions[ne.action_[Y].type_](q,Ce.match_,ne.action_[Y].option);else throw["MhchemBugA","mhchem bug A. Please report. ("+ne.action_[Y].type_+")"];C.concatArray(_,M)}if(p=ne.nextState||p,u.length>0){if(ne.revisit||(u=Ce.remainder),!ne.toContinue)break e}else return _}}if(O<=0)throw["MhchemBugU","mhchem bug U. Please report."]}},concatArray:function(u,d){if(d)if(Array.isArray(d))for(let p=0;p<d.length;p++)u.push(d[p]);else u.push(d)},patterns:{patterns:{empty:/^$/,else:/^./,else2:/^./,space:/^\s/,"space A":/^\s(?=[A-Z\\$])/,space$:/^\s$/,"a-z":/^[a-z]/,x:/^x/,x$:/^x$/,i$:/^i$/,letters:/^(?:[a-zA-Z\u03B1-\u03C9\u0391-\u03A9?@]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))))+/,"\\greek":/^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))/,"one lowercase latin letter $":/^(?:([a-z])(?:$|[^a-zA-Z]))$/,"$one lowercase latin letter$ $":/^\$(?:([a-z])(?:$|[^a-zA-Z]))\$$/,"one lowercase greek letter $":/^(?:\$?[\u03B1-\u03C9]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)\s*\$?)(?:\s+|\{\}|(?![a-zA-Z]))$/,digits:/^[0-9]+/,"-9.,9":/^[+\-]?(?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))/,"-9.,9 no missing 0":/^[+\-]?[0-9]+(?:[.,][0-9]+)?/,"(-)(9.,9)(e)(99)":function(u){const d=u.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))?(\((?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))\))?(?:([eE]|\s*(\*|x|\\times|\u00D7)\s*10\^)([+\-]?[0-9]+|\{[+\-]?[0-9]+\}))?/);return d&&d[0]?{match_:d.splice(1),remainder:u.substr(d[0].length)}:null},"(-)(9)^(-9)":function(u){const d=u.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+)?)\^([+\-]?[0-9]+|\{[+\-]?[0-9]+\})/);return d&&d[0]?{match_:d.splice(1),remainder:u.substr(d[0].length)}:null},"state of aggregation $":function(u){const d=C.patterns.findObserveGroups(u,"",/^\([a-z]{1,3}(?=[\),])/,")","");if(d&&d.remainder.match(/^($|[\s,;\)\]\}])/))return d;const p=u.match(/^(?:\((?:\\ca\s?)?\$[amothc]\$\))/);return p?{match_:p[0],remainder:u.substr(p[0].length)}:null},"_{(state of aggregation)}$":/^_\{(\([a-z]{1,3}\))\}/,"{[(":/^(?:\\\{|\[|\()/,")]}":/^(?:\)|\]|\\\})/,", ":/^[,;]\s*/,",":/^[,;]/,".":/^[.]/,". ":/^([.\u22C5\u00B7\u2022])\s*/,"...":/^\.\.\.(?=$|[^.])/,"* ":/^([*])\s*/,"^{(...)}":function(u){return C.patterns.findObserveGroups(u,"^{","","","}")},"^($...$)":function(u){return C.patterns.findObserveGroups(u,"^","$","$","")},"^a":/^\^([0-9]+|[^\\_])/,"^\\x{}{}":function(u){return C.patterns.findObserveGroups(u,"^",/^\\[a-zA-Z]+\{/,"}","","","{","}","",!0)},"^\\x{}":function(u){return C.patterns.findObserveGroups(u,"^",/^\\[a-zA-Z]+\{/,"}","")},"^\\x":/^\^(\\[a-zA-Z]+)\s*/,"^(-1)":/^\^(-?\d+)/,"'":/^'/,"_{(...)}":function(u){return C.patterns.findObserveGroups(u,"_{","","","}")},"_($...$)":function(u){return C.patterns.findObserveGroups(u,"_","$","$","")},_9:/^_([+\-]?[0-9]+|[^\\])/,"_\\x{}{}":function(u){return C.patterns.findObserveGroups(u,"_",/^\\[a-zA-Z]+\{/,"}","","","{","}","",!0)},"_\\x{}":function(u){return C.patterns.findObserveGroups(u,"_",/^\\[a-zA-Z]+\{/,"}","")},"_\\x":/^_(\\[a-zA-Z]+)\s*/,"^_":/^(?:\^(?=_)|\_(?=\^)|[\^_]$)/,"{}":/^\{\}/,"{...}":function(u){return C.patterns.findObserveGroups(u,"","{","}","")},"{(...)}":function(u){return C.patterns.findObserveGroups(u,"{","","","}")},"$...$":function(u){return C.patterns.findObserveGroups(u,"","$","$","")},"${(...)}$":function(u){return C.patterns.findObserveGroups(u,"${","","","}$")},"$(...)$":function(u){return C.patterns.findObserveGroups(u,"$","","","$")},"=<>":/^[=<>]/,"#":/^[#\u2261]/,"+":/^\+/,"-$":/^-(?=[\s_},;\]/]|$|\([a-z]+\))/,"-9":/^-(?=[0-9])/,"- orbital overlap":/^-(?=(?:[spd]|sp)(?:$|[\s,;\)\]\}]))/,"-":/^-/,"pm-operator":/^(?:\\pm|\$\\pm\$|\+-|\+\/-)/,operator:/^(?:\+|(?:[\-=<>]|<<|>>|\\approx|\$\\approx\$)(?=\s|$|-?[0-9]))/,arrowUpDown:/^(?:v|\(v\)|\^|\(\^\))(?=$|[\s,;\)\]\}])/,"\\bond{(...)}":function(u){return C.patterns.findObserveGroups(u,"\\bond{","","","}")},"->":/^(?:<->|<-->|->|<-|<=>>|<<=>|<=>|[\u2192\u27F6\u21CC])/,CMT:/^[CMT](?=\[)/,"[(...)]":function(u){return C.patterns.findObserveGroups(u,"[","","","]")},"1st-level escape":/^(&|\\\\|\\hline)\s*/,"\\,":/^(?:\\[,\ ;:])/,"\\x{}{}":function(u){return C.patterns.findObserveGroups(u,"",/^\\[a-zA-Z]+\{/,"}","","","{","}","",!0)},"\\x{}":function(u){return C.patterns.findObserveGroups(u,"",/^\\[a-zA-Z]+\{/,"}","")},"\\ca":/^\\ca(?:\s+|(?![a-zA-Z]))/,"\\x":/^(?:\\[a-zA-Z]+\s*|\\[_&{}%])/,orbital:/^(?:[0-9]{1,2}[spdfgh]|[0-9]{0,2}sp)(?=$|[^a-zA-Z])/,others:/^[\/~|]/,"\\frac{(...)}":function(u){return C.patterns.findObserveGroups(u,"\\frac{","","","}","{","","","}")},"\\overset{(...)}":function(u){return C.patterns.findObserveGroups(u,"\\overset{","","","}","{","","","}")},"\\underset{(...)}":function(u){return C.patterns.findObserveGroups(u,"\\underset{","","","}","{","","","}")},"\\underbrace{(...)}":function(u){return C.patterns.findObserveGroups(u,"\\underbrace{","","","}_","{","","","}")},"\\color{(...)}0":function(u){return C.patterns.findObserveGroups(u,"\\color{","","","}")},"\\color{(...)}{(...)}1":function(u){return C.patterns.findObserveGroups(u,"\\color{","","","}","{","","","}")},"\\color(...){(...)}2":function(u){return C.patterns.findObserveGroups(u,"\\color","\\","",/^(?=\{)/,"{","","","}")},"\\ce{(...)}":function(u){return C.patterns.findObserveGroups(u,"\\ce{","","","}")},oxidation$:/^(?:[+-][IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,"d-oxidation$":/^(?:[+-]?\s?[IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,"roman numeral":/^[IVX]+/,"1/2$":/^[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+(?:\$[a-z]\$|[a-z])?$/,amount:function(u){let d;if(d=u.match(/^(?:(?:(?:\([+\-]?[0-9]+\/[0-9]+\)|[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+|[+\-]?[0-9]+[.,][0-9]+|[+\-]?\.[0-9]+|[+\-]?[0-9]+)(?:[a-z](?=\s*[A-Z]))?)|[+\-]?[a-z](?=\s*[A-Z])|\+(?!\s))/),d)return{match_:d[0],remainder:u.substr(d[0].length)};const p=C.patterns.findObserveGroups(u,"","$","$","");return p&&(d=p.match_.match(/^\$(?:\(?[+\-]?(?:[0-9]*[a-z]?[+\-])?[0-9]*[a-z](?:[+\-][0-9]*[a-z]?)?\)?|\+|-)\$$/),d)?{match_:d[0],remainder:u.substr(d[0].length)}:null},amount2:function(u){return this.amount(u)},"(KV letters),":/^(?:[A-Z][a-z]{0,2}|i)(?=,)/,formula$:function(u){if(u.match(/^\([a-z]+\)$/))return null;const d=u.match(/^(?:[a-z]|(?:[0-9\ \+\-\,\.\(\)]+[a-z])+[0-9\ \+\-\,\.\(\)]*|(?:[a-z][0-9\ \+\-\,\.\(\)]+)+[a-z]?)$/);return d?{match_:d[0],remainder:u.substr(d[0].length)}:null},uprightEntities:/^(?:pH|pOH|pC|pK|iPr|iBu)(?=$|[^a-zA-Z])/,"/":/^\s*(\/)\s*/,"//":/^\s*(\/\/)\s*/,"*":/^\s*[*.]\s*/},findObserveGroups:function(u,d,p,q,R,O,_,M,x,ae){const de=function(pe,ee){if(typeof ee=="string")return pe.indexOf(ee)!==0?null:ee;const Ae=pe.match(ee);return Ae?Ae[0]:null},Ce=function(pe,ee,Ae){let N=0;for(;ee<pe.length;){const Ke=pe.charAt(ee),Se=de(pe.substr(ee),Ae);if(Se!==null&&N===0)return{endMatchBegin:ee,endMatchEnd:ee+Se.length};if(Ke==="{")N++;else if(Ke==="}"){if(N===0)throw["ExtraCloseMissingOpen","Extra close brace or missing open brace"];N--}ee++}return N>0,null};let ne=de(u,d);if(ne===null||(u=u.substr(ne.length),ne=de(u,p),ne===null))return null;const Y=Ce(u,ne.length,q||R);if(Y===null)return null;const Te=u.substring(0,q?Y.endMatchEnd:Y.endMatchBegin);if(!(O||_))return{match_:Te,remainder:u.substr(Y.endMatchEnd)};const ze=this.findObserveGroups(u.substr(Y.endMatchEnd),O,_,M,x);if(ze===null)return null;const Q=[Te,ze.match_];return{match_:ae?Q.join(""):Q,remainder:ze.remainder}},match_:function(u,d){const p=C.patterns.patterns[u];if(p===void 0)throw["MhchemBugP","mhchem bug P. Please report. ("+u+")"];if(typeof p=="function")return C.patterns.patterns[u](d);{const q=d.match(p);if(q){let R;return q[2]?R=[q[1],q[2]]:q[1]?R=q[1]:R=q[0],{match_:R,remainder:d.substr(q[0].length)}}return null}}},actions:{"a=":function(u,d){u.a=(u.a||"")+d},"b=":function(u,d){u.b=(u.b||"")+d},"p=":function(u,d){u.p=(u.p||"")+d},"o=":function(u,d){u.o=(u.o||"")+d},"q=":function(u,d){u.q=(u.q||"")+d},"d=":function(u,d){u.d=(u.d||"")+d},"rm=":function(u,d){u.rm=(u.rm||"")+d},"text=":function(u,d){u.text_=(u.text_||"")+d},insert:function(u,d,p){return{type_:p}},"insert+p1":function(u,d,p){return{type_:p,p1:d}},"insert+p1+p2":function(u,d,p){return{type_:p,p1:d[0],p2:d[1]}},copy:function(u,d){return d},rm:function(u,d){return{type_:"rm",p1:d||""}},text:function(u,d){return C.go(d,"text")},"{text}":function(u,d){const p=["{"];return C.concatArray(p,C.go(d,"text")),p.push("}"),p},"tex-math":function(u,d){return C.go(d,"tex-math")},"tex-math tight":function(u,d){return C.go(d,"tex-math tight")},bond:function(u,d,p){return{type_:"bond",kind_:p||d}},"color0-output":function(u,d){return{type_:"color0",color:d[0]}},ce:function(u,d){return C.go(d)},"1/2":function(u,d){const p=[];d.match(/^[+\-]/)&&(p.push(d.substr(0,1)),d=d.substr(1));const q=d.match(/^([0-9]+|\$[a-z]\$|[a-z])\/([0-9]+)(\$[a-z]\$|[a-z])?$/);return q[1]=q[1].replace(/\$/g,""),p.push({type_:"frac",p1:q[1],p2:q[2]}),q[3]&&(q[3]=q[3].replace(/\$/g,""),p.push({type_:"tex-math",p1:q[3]})),p},"9,9":function(u,d){return C.go(d,"9,9")}},createTransitions:function(u){let d,p,q,R;const O={};for(d in u)for(p in u[d])for(q=p.split("|"),u[d][p].stateArray=q,R=0;R<q.length;R++)O[q[R]]=[];for(d in u)for(p in u[d])for(q=u[d][p].stateArray||[],R=0;R<q.length;R++){const _=u[d][p];if(_.action_){_.action_=[].concat(_.action_);for(let x=0;x<_.action_.length;x++)typeof _.action_[x]=="string"&&(_.action_[x]={type_:_.action_[x]})}else _.action_=[];const M=d.split("|");for(let x=0;x<M.length;x++)if(q[R]==="*")for(const ae in O)O[ae].push({pattern:M[x],task:_});else O[q[R]].push({pattern:M[x],task:_})}return O},stateMachines:{}};C.stateMachines={ce:{transitions:C.createTransitions({empty:{"*":{action_:"output"}},else:{"0|1|2":{action_:"beginsWithBond=false",revisit:!0,toContinue:!0}},oxidation$:{0:{action_:"oxidation-output"}},CMT:{r:{action_:"rdt=",nextState:"rt"},rd:{action_:"rqt=",nextState:"rdt"}},arrowUpDown:{"0|1|2|as":{action_:["sb=false","output","operator"],nextState:"1"}},uprightEntities:{"0|1|2":{action_:["o=","output"],nextState:"1"}},orbital:{"0|1|2|3":{action_:"o=",nextState:"o"}},"->":{"0|1|2|3":{action_:"r=",nextState:"r"},"a|as":{action_:["output","r="],nextState:"r"},"*":{action_:["output","r="],nextState:"r"}},"+":{o:{action_:"d= kv",nextState:"d"},"d|D":{action_:"d=",nextState:"d"},q:{action_:"d=",nextState:"qd"},"qd|qD":{action_:"d=",nextState:"qd"},dq:{action_:["output","d="],nextState:"d"},3:{action_:["sb=false","output","operator"],nextState:"0"}},amount:{"0|2":{action_:"a=",nextState:"a"}},"pm-operator":{"0|1|2|a|as":{action_:["sb=false","output",{type_:"operator",option:"\\pm"}],nextState:"0"}},operator:{"0|1|2|a|as":{action_:["sb=false","output","operator"],nextState:"0"}},"-$":{"o|q":{action_:["charge or bond","output"],nextState:"qd"},d:{action_:"d=",nextState:"d"},D:{action_:["output",{type_:"bond",option:"-"}],nextState:"3"},q:{action_:"d=",nextState:"qd"},qd:{action_:"d=",nextState:"qd"},"qD|dq":{action_:["output",{type_:"bond",option:"-"}],nextState:"3"}},"-9":{"3|o":{action_:["output",{type_:"insert",option:"hyphen"}],nextState:"3"}},"- orbital overlap":{o:{action_:["output",{type_:"insert",option:"hyphen"}],nextState:"2"},d:{action_:["output",{type_:"insert",option:"hyphen"}],nextState:"2"}},"-":{"0|1|2":{action_:[{type_:"output",option:1},"beginsWithBond=true",{type_:"bond",option:"-"}],nextState:"3"},3:{action_:{type_:"bond",option:"-"}},a:{action_:["output",{type_:"insert",option:"hyphen"}],nextState:"2"},as:{action_:[{type_:"output",option:2},{type_:"bond",option:"-"}],nextState:"3"},b:{action_:"b="},o:{action_:{type_:"- after o/d",option:!1},nextState:"2"},q:{action_:{type_:"- after o/d",option:!1},nextState:"2"},"d|qd|dq":{action_:{type_:"- after o/d",option:!0},nextState:"2"},"D|qD|p":{action_:["output",{type_:"bond",option:"-"}],nextState:"3"}},amount2:{"1|3":{action_:"a=",nextState:"a"}},letters:{"0|1|2|3|a|as|b|p|bp|o":{action_:"o=",nextState:"o"},"q|dq":{action_:["output","o="],nextState:"o"},"d|D|qd|qD":{action_:"o after d",nextState:"o"}},digits:{o:{action_:"q=",nextState:"q"},"d|D":{action_:"q=",nextState:"dq"},q:{action_:["output","o="],nextState:"o"},a:{action_:"o=",nextState:"o"}},"space A":{"b|p|bp":{}},space:{a:{nextState:"as"},0:{action_:"sb=false"},"1|2":{action_:"sb=true"},"r|rt|rd|rdt|rdq":{action_:"output",nextState:"0"},"*":{action_:["output","sb=true"],nextState:"1"}},"1st-level escape":{"1|2":{action_:["output",{type_:"insert+p1",option:"1st-level escape"}]},"*":{action_:["output",{type_:"insert+p1",option:"1st-level escape"}],nextState:"0"}},"[(...)]":{"r|rt":{action_:"rd=",nextState:"rd"},"rd|rdt":{action_:"rq=",nextState:"rdq"}},"...":{"o|d|D|dq|qd|qD":{action_:["output",{type_:"bond",option:"..."}],nextState:"3"},"*":{action_:[{type_:"output",option:1},{type_:"insert",option:"ellipsis"}],nextState:"1"}},". |* ":{"*":{action_:["output",{type_:"insert",option:"addition compound"}],nextState:"1"}},"state of aggregation $":{"*":{action_:["output","state of aggregation"],nextState:"1"}},"{[(":{"a|as|o":{action_:["o=","output","parenthesisLevel++"],nextState:"2"},"0|1|2|3":{action_:["o=","output","parenthesisLevel++"],nextState:"2"},"*":{action_:["output","o=","output","parenthesisLevel++"],nextState:"2"}},")]}":{"0|1|2|3|b|p|bp|o":{action_:["o=","parenthesisLevel--"],nextState:"o"},"a|as|d|D|q|qd|qD|dq":{action_:["output","o=","parenthesisLevel--"],nextState:"o"}},", ":{"*":{action_:["output","comma"],nextState:"0"}},"^_":{"*":{}},"^{(...)}|^($...$)":{"0|1|2|as":{action_:"b=",nextState:"b"},p:{action_:"b=",nextState:"bp"},"3|o":{action_:"d= kv",nextState:"D"},q:{action_:"d=",nextState:"qD"},"d|D|qd|qD|dq":{action_:["output","d="],nextState:"D"}},"^a|^\\x{}{}|^\\x{}|^\\x|'":{"0|1|2|as":{action_:"b=",nextState:"b"},p:{action_:"b=",nextState:"bp"},"3|o":{action_:"d= kv",nextState:"d"},q:{action_:"d=",nextState:"qd"},"d|qd|D|qD":{action_:"d="},dq:{action_:["output","d="],nextState:"d"}},"_{(state of aggregation)}$":{"d|D|q|qd|qD|dq":{action_:["output","q="],nextState:"q"}},"_{(...)}|_($...$)|_9|_\\x{}{}|_\\x{}|_\\x":{"0|1|2|as":{action_:"p=",nextState:"p"},b:{action_:"p=",nextState:"bp"},"3|o":{action_:"q=",nextState:"q"},"d|D":{action_:"q=",nextState:"dq"},"q|qd|qD|dq":{action_:["output","q="],nextState:"q"}},"=<>":{"0|1|2|3|a|as|o|q|d|D|qd|qD|dq":{action_:[{type_:"output",option:2},"bond"],nextState:"3"}},"#":{"0|1|2|3|a|as|o":{action_:[{type_:"output",option:2},{type_:"bond",option:"#"}],nextState:"3"}},"{}":{"*":{action_:{type_:"output",option:1},nextState:"1"}},"{...}":{"0|1|2|3|a|as|b|p|bp":{action_:"o=",nextState:"o"},"o|d|D|q|qd|qD|dq":{action_:["output","o="],nextState:"o"}},"$...$":{a:{action_:"a="},"0|1|2|3|as|b|p|bp|o":{action_:"o=",nextState:"o"},"as|o":{action_:"o="},"q|d|D|qd|qD|dq":{action_:["output","o="],nextState:"o"}},"\\bond{(...)}":{"*":{action_:[{type_:"output",option:2},"bond"],nextState:"3"}},"\\frac{(...)}":{"*":{action_:[{type_:"output",option:1},"frac-output"],nextState:"3"}},"\\overset{(...)}":{"*":{action_:[{type_:"output",option:2},"overset-output"],nextState:"3"}},"\\underset{(...)}":{"*":{action_:[{type_:"output",option:2},"underset-output"],nextState:"3"}},"\\underbrace{(...)}":{"*":{action_:[{type_:"output",option:2},"underbrace-output"],nextState:"3"}},"\\color{(...)}{(...)}1|\\color(...){(...)}2":{"*":{action_:[{type_:"output",option:2},"color-output"],nextState:"3"}},"\\color{(...)}0":{"*":{action_:[{type_:"output",option:2},"color0-output"]}},"\\ce{(...)}":{"*":{action_:[{type_:"output",option:2},"ce"],nextState:"3"}},"\\,":{"*":{action_:[{type_:"output",option:1},"copy"],nextState:"1"}},"\\x{}{}|\\x{}|\\x":{"0|1|2|3|a|as|b|p|bp|o|c0":{action_:["o=","output"],nextState:"3"},"*":{action_:["output","o=","output"],nextState:"3"}},others:{"*":{action_:[{type_:"output",option:1},"copy"],nextState:"3"}},else2:{a:{action_:"a to o",nextState:"o",revisit:!0},as:{action_:["output","sb=true"],nextState:"1",revisit:!0},"r|rt|rd|rdt|rdq":{action_:["output"],nextState:"0",revisit:!0},"*":{action_:["output","copy"],nextState:"3"}}}),actions:{"o after d":function(u,d){let p;if((u.d||"").match(/^[0-9]+$/)){const q=u.d;u.d=void 0,p=this.output(u),u.b=q}else p=this.output(u);return C.actions["o="](u,d),p},"d= kv":function(u,d){u.d=d,u.dType="kv"},"charge or bond":function(u,d){if(u.beginsWithBond){const p=[];return C.concatArray(p,this.output(u)),C.concatArray(p,C.actions.bond(u,d,"-")),p}u.d=d},"- after o/d":function(u,d,p){let q=C.patterns.match_("orbital",u.o||"");const R=C.patterns.match_("one lowercase greek letter $",u.o||""),O=C.patterns.match_("one lowercase latin letter $",u.o||""),_=C.patterns.match_("$one lowercase latin letter$ $",u.o||""),M=d==="-"&&(q&&q.remainder===""||R||O||_);M&&!u.a&&!u.b&&!u.p&&!u.d&&!u.q&&!q&&O&&(u.o="$"+u.o+"$");const x=[];return M?(C.concatArray(x,this.output(u)),x.push({type_:"hyphen"})):(q=C.patterns.match_("digits",u.d||""),p&&q&&q.remainder===""?(C.concatArray(x,C.actions["d="](u,d)),C.concatArray(x,this.output(u))):(C.concatArray(x,this.output(u)),C.concatArray(x,C.actions.bond(u,d,"-")))),x},"a to o":function(u){u.o=u.a,u.a=void 0},"sb=true":function(u){u.sb=!0},"sb=false":function(u){u.sb=!1},"beginsWithBond=true":function(u){u.beginsWithBond=!0},"beginsWithBond=false":function(u){u.beginsWithBond=!1},"parenthesisLevel++":function(u){u.parenthesisLevel++},"parenthesisLevel--":function(u){u.parenthesisLevel--},"state of aggregation":function(u,d){return{type_:"state of aggregation",p1:C.go(d,"o")}},comma:function(u,d){const p=d.replace(/\s*$/,"");return p!==d&&u.parenthesisLevel===0?{type_:"comma enumeration L",p1:p}:{type_:"comma enumeration M",p1:p}},output:function(u,d,p){let q;if(!u.r)q=[],!u.a&&!u.b&&!u.p&&!u.o&&!u.q&&!u.d&&!p||(u.sb&&q.push({type_:"entitySkip"}),!u.o&&!u.q&&!u.d&&!u.b&&!u.p&&p!==2?(u.o=u.a,u.a=void 0):!u.o&&!u.q&&!u.d&&(u.b||u.p)?(u.o=u.a,u.d=u.b,u.q=u.p,u.a=u.b=u.p=void 0):u.o&&u.dType==="kv"&&C.patterns.match_("d-oxidation$",u.d||"")?u.dType="oxidation":u.o&&u.dType==="kv"&&!u.q&&(u.dType=void 0),q.push({type_:"chemfive",a:C.go(u.a,"a"),b:C.go(u.b,"bd"),p:C.go(u.p,"pq"),o:C.go(u.o,"o"),q:C.go(u.q,"pq"),d:C.go(u.d,u.dType==="oxidation"?"oxidation":"bd"),dType:u.dType}));else{let R;u.rdt==="M"?R=C.go(u.rd,"tex-math"):u.rdt==="T"?R=[{type_:"text",p1:u.rd||""}]:R=C.go(u.rd);let O;u.rqt==="M"?O=C.go(u.rq,"tex-math"):u.rqt==="T"?O=[{type_:"text",p1:u.rq||""}]:O=C.go(u.rq),q={type_:"arrow",r:u.r,rd:R,rq:O}}for(const R in u)R!=="parenthesisLevel"&&R!=="beginsWithBond"&&delete u[R];return q},"oxidation-output":function(u,d){const p=["{"];return C.concatArray(p,C.go(d,"oxidation")),p.push("}"),p},"frac-output":function(u,d){return{type_:"frac-ce",p1:C.go(d[0]),p2:C.go(d[1])}},"overset-output":function(u,d){return{type_:"overset",p1:C.go(d[0]),p2:C.go(d[1])}},"underset-output":function(u,d){return{type_:"underset",p1:C.go(d[0]),p2:C.go(d[1])}},"underbrace-output":function(u,d){return{type_:"underbrace",p1:C.go(d[0]),p2:C.go(d[1])}},"color-output":function(u,d){return{type_:"color",color1:d[0],color2:C.go(d[1])}},"r=":function(u,d){u.r=d},"rdt=":function(u,d){u.rdt=d},"rd=":function(u,d){u.rd=d},"rqt=":function(u,d){u.rqt=d},"rq=":function(u,d){u.rq=d},operator:function(u,d,p){return{type_:"operator",kind_:p||d}}}},a:{transitions:C.createTransitions({empty:{"*":{}},"1/2$":{0:{action_:"1/2"}},else:{0:{nextState:"1",revisit:!0}},"$(...)$":{"*":{action_:"tex-math tight",nextState:"1"}},",":{"*":{action_:{type_:"insert",option:"commaDecimal"}}},else2:{"*":{action_:"copy"}}}),actions:{}},o:{transitions:C.createTransitions({empty:{"*":{}},"1/2$":{0:{action_:"1/2"}},else:{0:{nextState:"1",revisit:!0}},letters:{"*":{action_:"rm"}},"\\ca":{"*":{action_:{type_:"insert",option:"circa"}}},"\\x{}{}|\\x{}|\\x":{"*":{action_:"copy"}},"${(...)}$|$(...)$":{"*":{action_:"tex-math"}},"{(...)}":{"*":{action_:"{text}"}},else2:{"*":{action_:"copy"}}}),actions:{}},text:{transitions:C.createTransitions({empty:{"*":{action_:"output"}},"{...}":{"*":{action_:"text="}},"${(...)}$|$(...)$":{"*":{action_:"tex-math"}},"\\greek":{"*":{action_:["output","rm"]}},"\\,|\\x{}{}|\\x{}|\\x":{"*":{action_:["output","copy"]}},else:{"*":{action_:"text="}}}),actions:{output:function(u){if(u.text_){const d={type_:"text",p1:u.text_};for(const p in u)delete u[p];return d}}}},pq:{transitions:C.createTransitions({empty:{"*":{}},"state of aggregation $":{"*":{action_:"state of aggregation"}},i$:{0:{nextState:"!f",revisit:!0}},"(KV letters),":{0:{action_:"rm",nextState:"0"}},formula$:{0:{nextState:"f",revisit:!0}},"1/2$":{0:{action_:"1/2"}},else:{0:{nextState:"!f",revisit:!0}},"${(...)}$|$(...)$":{"*":{action_:"tex-math"}},"{(...)}":{"*":{action_:"text"}},"a-z":{f:{action_:"tex-math"}},letters:{"*":{action_:"rm"}},"-9.,9":{"*":{action_:"9,9"}},",":{"*":{action_:{type_:"insert+p1",option:"comma enumeration S"}}},"\\color{(...)}{(...)}1|\\color(...){(...)}2":{"*":{action_:"color-output"}},"\\color{(...)}0":{"*":{action_:"color0-output"}},"\\ce{(...)}":{"*":{action_:"ce"}},"\\,|\\x{}{}|\\x{}|\\x":{"*":{action_:"copy"}},else2:{"*":{action_:"copy"}}}),actions:{"state of aggregation":function(u,d){return{type_:"state of aggregation subscript",p1:C.go(d,"o")}},"color-output":function(u,d){return{type_:"color",color1:d[0],color2:C.go(d[1],"pq")}}}},bd:{transitions:C.createTransitions({empty:{"*":{}},x$:{0:{nextState:"!f",revisit:!0}},formula$:{0:{nextState:"f",revisit:!0}},else:{0:{nextState:"!f",revisit:!0}},"-9.,9 no missing 0":{"*":{action_:"9,9"}},".":{"*":{action_:{type_:"insert",option:"electron dot"}}},"a-z":{f:{action_:"tex-math"}},x:{"*":{action_:{type_:"insert",option:"KV x"}}},letters:{"*":{action_:"rm"}},"'":{"*":{action_:{type_:"insert",option:"prime"}}},"${(...)}$|$(...)$":{"*":{action_:"tex-math"}},"{(...)}":{"*":{action_:"text"}},"\\color{(...)}{(...)}1|\\color(...){(...)}2":{"*":{action_:"color-output"}},"\\color{(...)}0":{"*":{action_:"color0-output"}},"\\ce{(...)}":{"*":{action_:"ce"}},"\\,|\\x{}{}|\\x{}|\\x":{"*":{action_:"copy"}},else2:{"*":{action_:"copy"}}}),actions:{"color-output":function(u,d){return{type_:"color",color1:d[0],color2:C.go(d[1],"bd")}}}},oxidation:{transitions:C.createTransitions({empty:{"*":{}},"roman numeral":{"*":{action_:"roman-numeral"}},"${(...)}$|$(...)$":{"*":{action_:"tex-math"}},else:{"*":{action_:"copy"}}}),actions:{"roman-numeral":function(u,d){return{type_:"roman numeral",p1:d||""}}}},"tex-math":{transitions:C.createTransitions({empty:{"*":{action_:"output"}},"\\ce{(...)}":{"*":{action_:["output","ce"]}},"{...}|\\,|\\x{}{}|\\x{}|\\x":{"*":{action_:"o="}},else:{"*":{action_:"o="}}}),actions:{output:function(u){if(u.o){const d={type_:"tex-math",p1:u.o};for(const p in u)delete u[p];return d}}}},"tex-math tight":{transitions:C.createTransitions({empty:{"*":{action_:"output"}},"\\ce{(...)}":{"*":{action_:["output","ce"]}},"{...}|\\,|\\x{}{}|\\x{}|\\x":{"*":{action_:"o="}},"-|+":{"*":{action_:"tight operator"}},else:{"*":{action_:"o="}}}),actions:{"tight operator":function(u,d){u.o=(u.o||"")+"{"+d+"}"},output:function(u){if(u.o){const d={type_:"tex-math",p1:u.o};for(const p in u)delete u[p];return d}}}},"9,9":{transitions:C.createTransitions({empty:{"*":{}},",":{"*":{action_:"comma"}},else:{"*":{action_:"copy"}}}),actions:{comma:function(){return{type_:"commaDecimal"}}}},pu:{transitions:C.createTransitions({empty:{"*":{action_:"output"}},space$:{"*":{action_:["output","space"]}},"{[(|)]}":{"0|a":{action_:"copy"}},"(-)(9)^(-9)":{0:{action_:"number^",nextState:"a"}},"(-)(9.,9)(e)(99)":{0:{action_:"enumber",nextState:"a"}},space:{"0|a":{}},"pm-operator":{"0|a":{action_:{type_:"operator",option:"\\pm"},nextState:"0"}},operator:{"0|a":{action_:"copy",nextState:"0"}},"//":{d:{action_:"o=",nextState:"/"}},"/":{d:{action_:"o=",nextState:"/"}},"{...}|else":{"0|d":{action_:"d=",nextState:"d"},a:{action_:["space","d="],nextState:"d"},"/|q":{action_:"q=",nextState:"q"}}}),actions:{enumber:function(u,d){const p=[];return d[0]==="+-"||d[0]==="+/-"?p.push("\\pm "):d[0]&&p.push(d[0]),d[1]&&(C.concatArray(p,C.go(d[1],"pu-9,9")),d[2]&&(d[2].match(/[,.]/)?C.concatArray(p,C.go(d[2],"pu-9,9")):p.push(d[2])),d[3]=d[4]||d[3],d[3]&&(d[3]=d[3].trim(),d[3]==="e"||d[3].substr(0,1)==="*"?p.push({type_:"cdot"}):p.push({type_:"times"}))),d[3]&&p.push("10^{"+d[5]+"}"),p},"number^":function(u,d){const p=[];return d[0]==="+-"||d[0]==="+/-"?p.push("\\pm "):d[0]&&p.push(d[0]),C.concatArray(p,C.go(d[1],"pu-9,9")),p.push("^{"+d[2]+"}"),p},operator:function(u,d,p){return{type_:"operator",kind_:p||d}},space:function(){return{type_:"pu-space-1"}},output:function(u){let d;const p=C.patterns.match_("{(...)}",u.d||"");p&&p.remainder===""&&(u.d=p.match_);const q=C.patterns.match_("{(...)}",u.q||"");if(q&&q.remainder===""&&(u.q=q.match_),u.d&&(u.d=u.d.replace(/\u00B0C|\^oC|\^{o}C/g,"{}^{\\circ}C"),u.d=u.d.replace(/\u00B0F|\^oF|\^{o}F/g,"{}^{\\circ}F")),u.q){u.q=u.q.replace(/\u00B0C|\^oC|\^{o}C/g,"{}^{\\circ}C"),u.q=u.q.replace(/\u00B0F|\^oF|\^{o}F/g,"{}^{\\circ}F");const R={d:C.go(u.d,"pu"),q:C.go(u.q,"pu")};u.o==="//"?d={type_:"pu-frac",p1:R.d,p2:R.q}:(d=R.d,R.d.length>1||R.q.length>1?d.push({type_:" / "}):d.push({type_:"/"}),C.concatArray(d,R.q))}else d=C.go(u.d,"pu-2");for(const R in u)delete u[R];return d}}},"pu-2":{transitions:C.createTransitions({empty:{"*":{action_:"output"}},"*":{"*":{action_:["output","cdot"],nextState:"0"}},"\\x":{"*":{action_:"rm="}},space:{"*":{action_:["output","space"],nextState:"0"}},"^{(...)}|^(-1)":{1:{action_:"^(-1)"}},"-9.,9":{0:{action_:"rm=",nextState:"0"},1:{action_:"^(-1)",nextState:"0"}},"{...}|else":{"*":{action_:"rm=",nextState:"1"}}}),actions:{cdot:function(){return{type_:"tight cdot"}},"^(-1)":function(u,d){u.rm+="^{"+d+"}"},space:function(){return{type_:"pu-space-2"}},output:function(u){let d=[];if(u.rm){const p=C.patterns.match_("{(...)}",u.rm||"");p&&p.remainder===""?d=C.go(p.match_,"pu"):d={type_:"rm",p1:u.rm}}for(const p in u)delete u[p];return d}}},"pu-9,9":{transitions:C.createTransitions({empty:{0:{action_:"output-0"},o:{action_:"output-o"}},",":{0:{action_:["output-0","comma"],nextState:"o"}},".":{0:{action_:["output-0","copy"],nextState:"o"}},else:{"*":{action_:"text="}}}),actions:{comma:function(){return{type_:"commaDecimal"}},"output-0":function(u){const d=[];if(u.text_=u.text_||"",u.text_.length>4){let p=u.text_.length%3;p===0&&(p=3);for(let q=u.text_.length-3;q>0;q-=3)d.push(u.text_.substr(q,3)),d.push({type_:"1000 separator"});d.push(u.text_.substr(0,p)),d.reverse()}else d.push(u.text_);for(const p in u)delete u[p];return d},"output-o":function(u){const d=[];if(u.text_=u.text_||"",u.text_.length>4){const q=u.text_.length-3;for(var p=0;p<q;p+=3)d.push(u.text_.substr(p,3)),d.push({type_:"1000 separator"});d.push(u.text_.substr(p))}else d.push(u.text_);for(const q in u)delete u[q];return d}}}};var te={go:function(u,d){if(!u)return"";let p="",q=!1;for(let R=0;R<u.length;R++){const O=u[R];typeof O=="string"?p+=O:(p+=te._go2(O),O.type_==="1st-level escape"&&(q=!0))}return!d&&!q&&p&&(p="{"+p+"}"),p},_goInner:function(u){return u&&te.go(u,!0)},_go2:function(u){let d;switch(u.type_){case"chemfive":d="";var p={a:te._goInner(u.a),b:te._goInner(u.b),p:te._goInner(u.p),o:te._goInner(u.o),q:te._goInner(u.q),d:te._goInner(u.d)};p.a&&(p.a.match(/^[+\-]/)&&(p.a="{"+p.a+"}"),d+=p.a+"\\,"),(p.b||p.p)&&(d+="{\\vphantom{X}}",d+="^{\\hphantom{"+(p.b||"")+"}}_{\\hphantom{"+(p.p||"")+"}}",d+="{\\vphantom{X}}",d+="^{\\smash[t]{\\vphantom{2}}\\mathllap{"+(p.b||"")+"}}",d+="_{\\vphantom{2}\\mathllap{\\smash[t]{"+(p.p||"")+"}}}"),p.o&&(p.o.match(/^[+\-]/)&&(p.o="{"+p.o+"}"),d+=p.o),u.dType==="kv"?((p.d||p.q)&&(d+="{\\vphantom{X}}"),p.d&&(d+="^{"+p.d+"}"),p.q&&(d+="_{\\smash[t]{"+p.q+"}}")):u.dType==="oxidation"?(p.d&&(d+="{\\vphantom{X}}",d+="^{"+p.d+"}"),p.q&&(d+="{\\vphantom{X}}",d+="_{\\smash[t]{"+p.q+"}}")):(p.q&&(d+="{\\vphantom{X}}",d+="_{\\smash[t]{"+p.q+"}}"),p.d&&(d+="{\\vphantom{X}}",d+="^{"+p.d+"}"));break;case"rm":d="\\mathrm{"+u.p1+"}";break;case"text":u.p1.match(/[\^_]/)?(u.p1=u.p1.replace(" ","~").replace("-","\\text{-}"),d="\\mathrm{"+u.p1+"}"):d="\\text{"+u.p1+"}";break;case"roman numeral":d="\\mathrm{"+u.p1+"}";break;case"state of aggregation":d="\\mskip2mu "+te._goInner(u.p1);break;case"state of aggregation subscript":d="\\mskip1mu "+te._goInner(u.p1);break;case"bond":if(d=te._getBond(u.kind_),!d)throw["MhchemErrorBond","mhchem Error. Unknown bond type ("+u.kind_+")"];break;case"frac":var q="\\frac{"+u.p1+"}{"+u.p2+"}";d="\\mathchoice{\\textstyle"+q+"}{"+q+"}{"+q+"}{"+q+"}";break;case"pu-frac":var R="\\frac{"+te._goInner(u.p1)+"}{"+te._goInner(u.p2)+"}";d="\\mathchoice{\\textstyle"+R+"}{"+R+"}{"+R+"}{"+R+"}";break;case"tex-math":d=u.p1+" ";break;case"frac-ce":d="\\frac{"+te._goInner(u.p1)+"}{"+te._goInner(u.p2)+"}";break;case"overset":d="\\overset{"+te._goInner(u.p1)+"}{"+te._goInner(u.p2)+"}";break;case"underset":d="\\underset{"+te._goInner(u.p1)+"}{"+te._goInner(u.p2)+"}";break;case"underbrace":d="\\underbrace{"+te._goInner(u.p1)+"}_{"+te._goInner(u.p2)+"}";break;case"color":d="{\\color{"+u.color1+"}{"+te._goInner(u.color2)+"}}";break;case"color0":d="\\color{"+u.color+"}";break;case"arrow":var O={rd:te._goInner(u.rd),rq:te._goInner(u.rq)},_="\\x"+te._getArrow(u.r);O.rq&&(_+="[{"+O.rq+"}]"),O.rd?_+="{"+O.rd+"}":_+="{}",d=_;break;case"operator":d=te._getOperator(u.kind_);break;case"1st-level escape":d=u.p1+" ";break;case"space":d=" ";break;case"entitySkip":d="~";break;case"pu-space-1":d="~";break;case"pu-space-2":d="\\mkern3mu ";break;case"1000 separator":d="\\mkern2mu ";break;case"commaDecimal":d="{,}";break;case"comma enumeration L":d="{"+u.p1+"}\\mkern6mu ";break;case"comma enumeration M":d="{"+u.p1+"}\\mkern3mu ";break;case"comma enumeration S":d="{"+u.p1+"}\\mkern1mu ";break;case"hyphen":d="\\text{-}";break;case"addition compound":d="\\,{\\cdot}\\,";break;case"electron dot":d="\\mkern1mu \\bullet\\mkern1mu ";break;case"KV x":d="{\\times}";break;case"prime":d="\\prime ";break;case"cdot":d="\\cdot ";break;case"tight cdot":d="\\mkern1mu{\\cdot}\\mkern1mu ";break;case"times":d="\\times ";break;case"circa":d="{\\sim}";break;case"^":d="uparrow";break;case"v":d="downarrow";break;case"ellipsis":d="\\ldots ";break;case"/":d="/";break;case" / ":d="\\,/\\,";break;default:throw["MhchemBugT","mhchem bug T. Please report."]}return d},_getArrow:function(u){switch(u){case"->":return"rightarrow";case"→":return"rightarrow";case"⟶":return"rightarrow";case"<-":return"leftarrow";case"<->":return"leftrightarrow";case"<-->":return"rightleftarrows";case"<=>":return"rightleftharpoons";case"⇌":return"rightleftharpoons";case"<=>>":return"rightequilibrium";case"<<=>":return"leftequilibrium";default:throw["MhchemBugT","mhchem bug T. Please report."]}},_getBond:function(u){switch(u){case"-":return"{-}";case"1":return"{-}";case"=":return"{=}";case"2":return"{=}";case"#":return"{\\equiv}";case"3":return"{\\equiv}";case"~":return"{\\tripledash}";case"~-":return"{\\mathrlap{\\raisebox{-.1em}{$-$}}\\raisebox{.1em}{$\\tripledash$}}";case"~=":return"{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$\\tripledash$}}-}";case"~--":return"{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$\\tripledash$}}-}";case"-~-":return"{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$-$}}\\tripledash}";case"...":return"{{\\cdot}{\\cdot}{\\cdot}}";case"....":return"{{\\cdot}{\\cdot}{\\cdot}{\\cdot}}";case"->":return"{\\rightarrow}";case"<-":return"{\\leftarrow}";case"<":return"{<}";case">":return"{>}";default:throw["MhchemBugT","mhchem bug T. Please report."]}},_getOperator:function(u){switch(u){case"+":return" {}+{} ";case"-":return" {}-{} ";case"=":return" {}={} ";case"<":return" {}<{} ";case">":return" {}>{} ";case"<<":return" {}\\ll{} ";case">>":return" {}\\gg{} ";case"\\pm":return" {}\\pm{} ";case"\\approx":return" {}\\approx{} ";case"$\\approx$":return" {}\\approx{} ";case"v":return" \\downarrow{} ";case"(v)":return" \\downarrow{} ";case"^":return" \\uparrow{} ";case"(^)":return" \\uparrow{} ";default:throw["MhchemBugT","mhchem bug T. Please report."]}}};tr.__defineMacro("\\ce",function(u){return za(u.consumeArgs(1)[0],"ce")});tr.__defineMacro("\\pu",function(u){return za(u.consumeArgs(1)[0],"pu")});tr.__defineMacro("\\tripledash","{\\vphantom{-}\\raisebox{2.56mu}{$\\mkern2mu\\tiny\\text{-}\\mkern1mu\\text{-}\\mkern1mu\\text{-}\\mkern2mu$}}");const Gr=class Gr extends at.Component{constructor(d){super(d),this.state={dragHover:!1},this.handleDrop=this.handleDrop.bind(this),this.handleDragEnd=this.handleDragEnd.bind(this),this.handleDragOver=this.handleDragOver.bind(this),this.handleDragLeave=this.handleDragLeave.bind(this),this.handleDragEnter=this.handleDragEnter.bind(this)}handleDrop(d){d.stopPropagation(),d.preventDefault(),this.setState({dragHover:!1}),this.props.onDrop(d)}handleDragEnd(){this.setState({dragHover:!1})}handleDragOver(d){d.preventDefault()}handleDragLeave(){this.setState({dragHover:!1})}handleDragEnter(d){this.setState({dragHover:this.props.shouldDragHighlight(d)})}render(){const d=this.state.dragHover?{opacity:.3}:{},{component:p,shouldDragHighlight:q,...R}=this.props;return U.jsx(p,{...R,style:Object.assign({},this.props.style,d),onDrop:this.handleDrop,onDragEnd:this.handleDragEnd,onDragOver:this.handleDragOver,onDragEnter:this.handleDragEnter,onDragLeave:this.handleDragLeave})}};Gr.defaultProps={component:"div",shouldDragHighlight:()=>!0};let er=Gr;er.__docgenInfo={description:"",methods:[{name:"handleDrop",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"DragEvent",alias:"DragEvent"}}],returns:null},{name:"handleDragEnd",docblock:null,modifiers:[],params:[],returns:null},{name:"handleDragOver",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"handleDragLeave",docblock:null,modifiers:[],params:[],returns:null},{name:"handleDragEnter",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null}],displayName:"DragTarget",props:{onDrop:{required:!0,tsType:{name:"signature",type:"function",raw:"(e: DragEvent) => void",signature:{arguments:[{type:{name:"DragEvent"},name:"e"}],return:{name:"void"}}},description:""},component:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:'"div"',computed:!1}},shouldDragHighlight:{required:!1,tsType:{name:"signature",type:"function",raw:"(any) => boolean",signature:{arguments:[{name:"any"}],return:{name:"boolean"}}},description:"",defaultValue:{value:"() => true",computed:!1}},style:{required:!1,tsType:{name:"any"},description:""},children:{required:!1,tsType:{name:"any"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const{InlineIcon:Ra}=Ns,Oa=u=>{const d=K.omit(u,ks);return As(d)};class Wa extends at.Component{constructor(d){super(d),this._toggleWidget=p=>{p.preventDefault(),this.setState({showWidget:!this.state.showWidget})},this._handleWidgetChange=(p,q,R)=>{var _;const O={...this.state.widgetInfo,options:{...this.state.widgetInfo.options,...((_=this.widget.current)==null?void 0:_.serialize())??{},...p}};this.props.onChange(O,q,R)},this._setStatic=p=>{const q={...this.state.widgetInfo,static:p};this.props.onChange(q)},this._handleAlignmentChange=p=>{const q=p.currentTarget.value,R=Object.assign({},this.state.widgetInfo);R.alignment=q,this.props.onChange(R)},this.getSaveWarnings=()=>{var q;const p=(q=this.widget.current)==null?void 0:q.getSaveWarnings;return p?p():[]},this.serialize=()=>{const p=this.state.widgetInfo;return{type:p.type,alignment:p.alignment,static:p.static,graded:p.graded,options:this.widget.current.serialize(),version:p.version}},this.state={showWidget:d.widgetIsOpen??!0,widgetInfo:Oa(d)},this.widget=at.createRef()}UNSAFE_componentWillReceiveProps(d){this.setState({widgetInfo:Oa(d)}),d.widgetIsOpen!=null&&d.widgetIsOpen!==this.props.widgetIsOpen&&this.setState({showWidget:d.widgetIsOpen})}render(){const d=this.state.widgetInfo,p=Hr(d.type);let q;this.props.apiOptions.showAlignmentOptions?q=qs(d.type):q=["default"];const R=Ts(d.type);return U.jsxs("div",{className:"perseus-widget-editor",children:[U.jsxs("div",{className:"perseus-widget-editor-title "+(this.state.showWidget?"open":"closed"),children:[U.jsxs("a",{className:"perseus-widget-editor-title-id",href:"#",onClick:this._toggleWidget,children:[this.props.id,this.state.showWidget?U.jsx(Ra,{...Is}):U.jsx(Ra,{...Ds})]}),R&&U.jsx(Hs,{label:"Static",checked:!!d.static,onChange:this._setStatic}),q.length>1&&U.jsx("select",{className:"alignment",value:d.alignment,onChange:this._handleAlignmentChange,children:q.map(O=>U.jsx("option",{children:O},O))}),U.jsx(Fs,{icon:Ls,onClick:()=>{this.props.onRemove()},title:"Remove image widget"})]}),U.jsx("div",{className:"perseus-widget-editor-content "+(this.state.showWidget?"enter":"leave"),children:p&&U.jsx(p,{ref:this.widget,onChange:this._handleWidgetChange,static:d.static,apiOptions:this.props.apiOptions,...d.options})})]})}}function Hs(u){const{label:d,...p}=u,q=at.useId();return U.jsxs(U.Fragment,{children:[U.jsx("label",{htmlFor:q,children:d}),U.jsx(Ms,{size:Ps.xxSmall_6}),U.jsx(ws,{id:q,...p})]})}Wa.__docgenInfo={description:"",methods:[{name:"_toggleWidget",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent",alias:"React.SyntheticEvent"}}],returns:null},{name:"_handleWidgetChange",docblock:null,modifiers:[],params:[{name:"newProps",optional:!1,type:{name:"intersection",raw:`{
    // Unserialized props
    id: string;
    onChange: (
        widgetInfo: PerseusWidget,
        cb?: () => unknown,
        silent?: boolean,
    ) => unknown;
    onRemove: () => unknown;
    apiOptions: APIOptions;
    widgetIsOpen?: boolean;
} & Omit<PerseusWidget, "key">`,elements:[{name:"signature",type:"object",raw:`{
    // Unserialized props
    id: string;
    onChange: (
        widgetInfo: PerseusWidget,
        cb?: () => unknown,
        silent?: boolean,
    ) => unknown;
    onRemove: () => unknown;
    apiOptions: APIOptions;
    widgetIsOpen?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    widgetInfo: PerseusWidget,
    cb?: () => unknown,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:`| CategorizerWidget
| CSProgramWidget
| DefinitionWidget
| DropdownWidget
| ExplanationWidget
| ExpressionWidget
| GradedGroupSetWidget
| GradedGroupWidget
| GrapherWidget
| GroupWidget
| IFrameWidget
| ImageWidget
| InputNumberWidget
| InteractionWidget
| InteractiveGraphWidget
| LabelImageWidget
| MatcherWidget
| MatrixWidget
| MeasurerWidget
| MockWidget
| MoleculeRendererWidget
| NumberLineWidget
| NumericInputWidget
| OrdererWidget
| PassageRefWidget
| PassageWidget
| PhetSimulationWidget
| PlotterWidget
| PythonProgramWidget
| RadioWidget
| RefTargetWidget
| SorterWidget
| TableWidget
| VideoWidget
| DeprecatedStandinWidget`,elements:[{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}]},name:"widgetInfo"},{type:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},name:"cb"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"onRemove",value:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}},required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
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
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
    };
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
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1}},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
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
only after a good few seconds.`},{key:"flags",value:{name:"signature",type:"object",raw:`{
    /**
     * Flags related to the interactive-graph Mafs migration.
     *
     * Add values to the relevant array to create new flags.
     */
    mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:"false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean}",elements:[{name:"literal",value:"false"},{name:"signature",type:"object",raw:"{[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean}",signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof MafsGraphTypeFlags)[number]",required:!1},value:{name:"boolean"}}]}}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`,required:!0}},{key:"widgetIsOpen",value:{name:"boolean",required:!1}}]}},{name:"Omit",elements:[{name:"union",raw:`| CategorizerWidget
| CSProgramWidget
| DefinitionWidget
| DropdownWidget
| ExplanationWidget
| ExpressionWidget
| GradedGroupSetWidget
| GradedGroupWidget
| GrapherWidget
| GroupWidget
| IFrameWidget
| ImageWidget
| InputNumberWidget
| InteractionWidget
| InteractiveGraphWidget
| LabelImageWidget
| MatcherWidget
| MatrixWidget
| MeasurerWidget
| MockWidget
| MoleculeRendererWidget
| NumberLineWidget
| NumericInputWidget
| OrdererWidget
| PassageRefWidget
| PassageWidget
| PhetSimulationWidget
| PlotterWidget
| PythonProgramWidget
| RadioWidget
| RefTargetWidget
| SorterWidget
| TableWidget
| VideoWidget
| DeprecatedStandinWidget`,elements:[{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}]},{name:"literal",value:'"key"'}],raw:'Omit<PerseusWidget, "key">'}],alias:"WidgetEditorProps"}},{name:"cb",optional:!1,type:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}}},{name:"silent",optional:!1,type:{name:"boolean"}}],returns:null},{name:"_setStatic",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:{name:"boolean"}}],returns:null},{name:"_handleAlignmentChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLSelectElement>",elements:[{name:"HTMLSelectElement"}],alias:"React.SyntheticEvent"}}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"WidgetEditor",props:{id:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    widgetInfo: PerseusWidget,
    cb?: () => unknown,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:`| CategorizerWidget
| CSProgramWidget
| DefinitionWidget
| DropdownWidget
| ExplanationWidget
| ExpressionWidget
| GradedGroupSetWidget
| GradedGroupWidget
| GrapherWidget
| GroupWidget
| IFrameWidget
| ImageWidget
| InputNumberWidget
| InteractionWidget
| InteractiveGraphWidget
| LabelImageWidget
| MatcherWidget
| MatrixWidget
| MeasurerWidget
| MockWidget
| MoleculeRendererWidget
| NumberLineWidget
| NumericInputWidget
| OrdererWidget
| PassageRefWidget
| PassageWidget
| PhetSimulationWidget
| PlotterWidget
| PythonProgramWidget
| RadioWidget
| RefTargetWidget
| SorterWidget
| TableWidget
| VideoWidget
| DeprecatedStandinWidget`,elements:[{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}]},name:"widgetInfo"},{type:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},name:"cb"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}}},description:""},onRemove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
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
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
    };
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
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1}},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
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
only after a good few seconds.`},{key:"flags",value:{name:"signature",type:"object",raw:`{
    /**
     * Flags related to the interactive-graph Mafs migration.
     *
     * Add values to the relevant array to create new flags.
     */
    mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:"false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean}",elements:[{name:"literal",value:"false"},{name:"signature",type:"object",raw:"{[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean}",signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof MafsGraphTypeFlags)[number]",required:!1},value:{name:"boolean"}}]}}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},description:""},widgetIsOpen:{required:!1,tsType:{name:"boolean"},description:""}}};class Ea extends at.Component{constructor(){super(...arguments),this.handleChange=d=>{const p=d.currentTarget.value;p!==""&&this.props.onChange&&this.props.onChange(p)}}shouldComponentUpdate(){return!1}render(){const d=xs(),p=K.sortBy(K.keys(d),R=>d[R].displayName);return U.jsxs("select",{value:"",onChange:this.handleChange,children:[U.jsx("option",{value:"",children:"Add a widget…"}),U.jsx("option",{disabled:!0,children:"--"}),K.map(p,R=>U.jsx("option",{value:R,children:d[R].displayName},R))]})}}Ea.__docgenInfo={description:"",methods:[{name:"handleChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLSelectElement>",elements:[{name:"HTMLSelectElement"}],alias:"React.SyntheticEvent"}}],returns:null}],displayName:"WidgetSelect",props:{onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(widgetType: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"widgetType"}],return:{name:"unknown"}}},description:""}}};const Vs="[[☃ {id}]]",Sa="(\\[\\[☃ {id}\\]\\])",Qt=new RegExp(Sa.replace("{id}","[a-z-]+ [0-9]+"),"g"),Gs=/^\[\[([a-z-]+)$/,$s=/(?:\n{2,}|^\n*)$/,Ks=/(\n*)$/,Xs=/^(\n*)/,Ur=u=>{let d=u.toString();return d.length>=5&&(d=d.replace(/(\d)(?=(\d{3})+$)/g,"$1{,}")),d},Ys=u=>{if(!$s.test(u)){const d=Ks.exec(u);if(d){const p=d[1];return u+`

`.slice(0,2-p.length)}}return u},Zs=u=>{const d=Xs.exec(u);if(!d)return u;const p=d[1];return`

`.slice(0,2-p.length)+u},Js=/!\[[^\]]*\]\(([^\s)]+)[^)]*\)/g,Qs=function(u,d){const p=[];for(;;){const q=u.exec(d);if(!q)break;p.push(q)}return p},eo=function(u){return Qs(Js,u).map(d=>d[1])},$r=class $r extends at.Component{constructor(){super(...arguments),this.underlay=at.createRef(),this.textarea=at.createRef(),this.state={textAreaValue:this.props.content},this._handleWidgetEditorChange=(d,p,q,R)=>{const O=Object.assign({},this.props.widgets);O[d]=Object.assign({},O[d],p),this.props.onChange({widgets:O},q,R)},this._handleWidgetEditorRemove=d=>{if(!confirm("Are you sure you want to delete this item?"))return;const p=this.textarea.current,q=new RegExp(Sa.replace("{id}",d),"gm");this.props.onChange({content:p==null?void 0:p.value.replace(q,"")})},this._sizeImages=d=>{const p=eo(d.content),q=K.pick(d.images,p),R=K.filter(p,O=>!q[O]);K.each(R,O=>{Ue.getImageSize(O,(_,M)=>{q[O]={width:_,height:M},d.onChange({images:K.clone(q)},null,!0)})})},this.handleDrop=d=>{const{imageUploader:p}=this.props;let q=this.state.textAreaValue||"";const R=d.dataTransfer;if(!R||!p)return;const O=R.files;if(O.length===0){const M=R.getData("URL");if(M){const x=q+`

![](`+M+")";this.lastUserValue=this.props.content,this.props.onChange({content:x})}return}const _=this.state.textAreaValue;K(O).chain().map(function(M){if(!M.type.match("image.*"))return null;const x="☃ "+K.uniqueId("image_");return q+=`

![](`+x+")",{file:M,sentinel:x}}).reject(K.isNull).tap(()=>{this.lastUserValue=_,this.props.onChange({content:q})}).each(M=>{p(M.file,x=>{this.lastUserValue=_,this.props.onChange({content:this.state.textAreaValue.replace(M.sentinel,x)})})})},this.handleChange=d=>{clearTimeout(this.deferredChange),this.setState({textAreaValue:d.currentTarget.value}),this.deferredChange=setTimeout(()=>{this.state.textAreaValue!==this.props.content&&this.props.onChange({content:this.state.textAreaValue})},this.props.apiOptions.editorChangeDelay)},this._handleKeyDown=d=>{if(d.stopPropagation(),d.key==="Tab"){const p=this.textarea.current,q=Ue.textarea.getWordBeforeCursor(p),R=q.string.toLowerCase().match(Gs);if(R!=null){const O=R[1],M=xa().filter(x=>x.substring(0,O.length)===O);if(M.length===1){const x=M[0];this._addWidgetToContent(this.props.content,[q.pos.start,q.pos.end+1],x)}d.preventDefault()}}},this._maybeCopyWidgets=d=>{const p=d.currentTarget,q=p.value.substring(p.selectionStart,p.selectionEnd),R=K.map(q.match(Qt),_=>Ue.rWidgetParts.exec(_)[1]),O=K.pick(this.serialize().widgets,R);localStorage.perseusLastCopiedText=q,localStorage.perseusLastCopiedWidgets=JSON.stringify(O),Es.log(`Widgets copied: ${localStorage.perseusLastCopiedWidgets}`)},this._maybePasteWidgets=d=>{const p=localStorage.perseusLastCopiedWidgets,q=localStorage.perseusLastCopiedText,R=d.originalEvent.clipboardData.getData("text");if(p&&q===R){d.preventDefault();const O=JSON.parse(p),_=this._safeWidgetNameMapping(O),M={};for(const[Y,Te]of Object.entries(O))M[_[Y]]=Te;const x=K.extend(M,this.props.widgets),ae=q.replace(Qt,Y=>{const Te=Ue.rWidgetParts.exec(Y),ze=Te[0],Q=Te[1];return ze.replace(Q,_[Q])}),de=d.currentTarget,Ce=de.selectionStart,ne=this.state.textAreaValue.substr(0,Ce)+ae+this.state.textAreaValue.substr(de.selectionEnd);this.lastUserValue=this.state.textAreaValue,this.props.onChange({content:ne,widgets:x},()=>{const Y=Ce+ae.length;Ue.textarea.moveCursor(de,Y)})}},this._safeWidgetNameMapping=d=>{const p=K.keys(d).map(M=>M.split(" ")),q=K.uniq(p.map(M=>M[0])),R=K.keys(this.props.widgets).map(M=>M.split(" ")),O={};K.each(q,M=>{O[M]=K.chain(R).filter(x=>x[0]===M).map(x=>+x[1]+1).max().value(),O[M]=Math.max(O[M],1)});const _={};return K.each(p,M=>{const x=M.join(" "),ae=M[0];_[x]=`${ae} ${O[ae]}`,O[ae]++}),_},this._addWidgetToContent=(d,p,q)=>{var ze;const R=K.map(d.match(Qt),Q=>{const pe=Ue.rWidgetParts.exec(Q),ee=pe[2],Ae=+pe[3];return[ee,Ae]}),O=K.reduce(R,(Q,pe)=>{const[ee,Ae]=pe;return ee===q?Math.max(Ae+1,Q):Q},1),_=q+" "+O,M=Vs.replace("{id}",_),x=Rs(q)==="block",ae=d.slice(0,p[0]),de=d.slice(p[1]),Ce=x?Ys(ae):ae,ne=x?Zs(de):de,Y=Ce+M+ne,Te={...this.props.widgets};Te[_]={options:(ze=Hr(q))==null?void 0:ze.defaultProps,type:q,version:Os(q)},this.lastUserValue=this.props.content,this.props.onChange({content:Y,widgets:Te},()=>{this.textarea.current&&Ue.textarea.moveCursor(this.textarea.current,Y.length-de.length)})},this._addWidget=d=>{const p=this.textarea.current;p&&(this._addWidgetToContent(this.props.content,[p.selectionStart,p.selectionEnd],d),p.focus())},this.addTemplate=d=>{const p=d.currentTarget.value;if(p==="")return;d.currentTarget.value="";let q=this.props.content;q=q.replace(/\n*$/,`

`);let R;if(p==="table")R=`header 1 | header 2 | header 3
- | - | -
data 1 | data 2 | data 3
data 4 | data 5 | data 6
data 7 | data 8 | data 9`;else if(p==="titledTable")R=`|| **Table title** ||
header 1 | header 2 | header 3
- | - | -
data 1 | data 2 | data 3
data 4 | data 5 | data 6
data 7 | data 8 | data 9`;else if(p==="alignment")R=`$\\begin{align} x+5 &= 30 \\\\
x+5-5 &= 30-5 \\\\
x &= 25 \\end{align}$`;else if(p==="piecewise")R=`$f(x) = \\begin{cases}
7 & \\text{if }x=1 \\\\
f(x-1)+5 & \\text{if }x > 1
\\end{cases}$`;else if(p==="allWidgets")R=xa().map(_=>`[[${Ue.snowman} ${_} 1]]`).join(`

`);else throw new zs("Invalid template type: "+p,Ws.InvalidInput,{metadata:{templateType:p}});const O=q+R;this.lastUserValue=this.props.content,this.props.onChange({content:O},this.focusAndMoveToEnd)},this.getSaveWarnings=()=>{const d=K.intersection(this.widgetIds,K.keys(this.refs));return K(d).chain().map(q=>{const R=this.refs[q].getSaveWarnings,O=R?R():[];return K.map(O,_=>q+": "+_)}).flatten(!0).value()},this.focus=()=>{const d=this.textarea.current;d&&d.focus()},this.focusAndMoveToEnd=()=>{this.focus();const d=this.textarea.current;d&&(d.selectionStart=d.value.length,d.selectionEnd=d.value.length)},this.serialize=d=>{const p={},q=K.intersection(this.widgetIds,K.keys(this.refs));return K.each(q,R=>{p[R]=this.refs[R].serialize()}),d&&d.keepDeletedWidgets&&K.chain(this.props.widgets).keys().reject(R=>K.contains(q,R)).each(R=>{p[R]=this.props.widgets[R]}),{replace:this.props.replace,content:this.props.content,images:this.props.images,widgets:p}}}componentDidMount(){this.lastUserValue=null,this._sizeImages(this.props),Ss(this.textarea.current).on("copy cut",this._maybeCopyWidgets).on("paste",this._maybePasteWidgets)}UNSAFE_componentWillReceiveProps(d){this.props.content!==d.content&&this.setState({textAreaValue:d.content})}componentDidUpdate(d){const p=this.textarea.current;this.lastUserValue!=null&&p&&(p.focus(),p.value=this.lastUserValue,p.selectionStart=0,p.setSelectionRange(0,d.content.length),document.execCommand("insertText",!1,this.props.content)===!1&&(p.value=this.props.content),this.lastUserValue=null),this.props.content!==d.content&&this._sizeImages(this.props)}componentWillUnmount(){clearTimeout(this.deferredChange)}getWidgetEditor(d,p){if(Hr(p))return U.jsx(Wa,{ref:d,id:d,onChange:this._handleWidgetEditorChange.bind(this,d),onRemove:this._handleWidgetEditorRemove.bind(this,d),apiOptions:this.props.apiOptions,widgetIsOpen:this.props.widgetIsOpen,...this.props.widgets[d]},d)}render(){let d,p,q,R,O,_,M;const x=[];if(this.props.showWordCount){const ze=Br.characterCount(this.props.content),Q=Math.floor(ze/6);M=U.jsx("span",{className:"perseus-editor-word-count",title:"~"+Ur(Q)+" words ("+Ur(ze)+" characters)",children:Ur(Q)})}if(this.props.widgetEnabled){d=Ue.split(this.props.content,Qt),p={},q=[];for(let Q=0;Q<d.length;Q++)if(Q%2===0){q.push(d[Q]);const pe=Br.parse(d[Q]);Br.traverseContent(pe,ee=>{if(ee.type==="math"||ee.type==="blockMath"){const Ae=Cs(ee.content);try{tr.renderToString(Ae,{colorIsTextColor:!0})}catch(N){x.push({math:Ae,message:N.message})}}})}else{const pe=Ue.rWidgetParts.exec(d[Q]);if(pe!=null){const ee=pe[1],Ae=pe[2],N=ee in p;p[ee]=this.getWidgetEditor(ee,Ae);const Ke=N||!p[ee]?"error ":"",Se=N?Q:ee;q.push(U.jsx("b",{className:Ke,children:d[Q]},Se))}}if(this.widgetIds=K.keys(p),R=U.jsx(Ea,{onChange:this._addWidget}),O=U.jsxs("select",{onChange:this.addTemplate,children:[U.jsx("option",{value:"",children:"Insert template…"}),U.jsx("option",{disabled:!0,children:"--"}),U.jsx("option",{value:"table",children:"Table"}),U.jsx("option",{value:"titledTable",children:"Titled table"}),U.jsx("option",{value:"alignment",children:"Aligned equations"}),U.jsx("option",{value:"piecewise",children:"Piecewise function"}),U.jsx("option",{disabled:!0,children:"--"}),U.jsx("option",{value:"allWidgets",children:"All widgets (for testing)"})]}),!this.props.immutableWidgets){const Q=Object.values(p);_=U.jsxs("div",{className:"perseus-editor-widgets",children:[U.jsxs("div",{className:"perseus-editor-widgets-selectors",children:[R,O,M]}),Q]}),M=null}}else q=[this.props.content];q.push(U.jsx("br",{},"end"));const ae=[U.jsx("div",{className:"perseus-textarea-underlay",ref:this.underlay,children:q},"underlay"),U.jsx("textarea",{ref:this.textarea,onChange:this.handleChange,onKeyDown:this._handleKeyDown,placeholder:this.props.placeholder,disabled:this.props.disabled,value:this.state.textAreaValue},"textarea")];let de;this.props.imageUploader?de=U.jsx(er,{onDrop:this.handleDrop,className:"perseus-textarea-pair",children:ae}):de=U.jsx("div",{className:"perseus-textarea-pair",children:ae});const ne=this.props.content.replace(/\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/g,"").trim().length===0,Y=!/\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/g.test(this.props.content),Te={borderTop:"none",padding:4,backgroundColor:"pink"};return U.jsxs("div",{className:"perseus-single-editor "+(this.props.className||""),children:[de,x.length>0&&U.jsx(Bs,{errorList:x}),this.props.warnNoPrompt&&ne&&U.jsx("div",{style:Te,children:"Graded Groups should contain a prompt"}),this.props.warnNoWidgets&&Y&&U.jsx("div",{style:Te,children:"Graded Groups should contain at least one widget"}),M,_]})}};$r.defaultProps={content:"",placeholder:"",widgets:{},images:{},disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!1,warnNoPrompt:!1,warnNoWidgets:!1};let Vr=$r;Vr.__docgenInfo={description:"",methods:[{name:"getWidgetEditor",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:{name:"string"}},{name:"type",optional:!1,type:{name:'union["type"]',raw:'PerseusWidget["type"]'}}],returns:{type:{name:"union",raw:"undefined | React.ReactNode",elements:[{name:"undefined"},{name:"ReactReactNode",raw:"React.ReactNode"}]}}},{name:"_handleWidgetEditorChange",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:{name:"string"}},{name:"newWidgetInfo",optional:!1,type:{name:"union",raw:`| CategorizerWidget
| CSProgramWidget
| DefinitionWidget
| DropdownWidget
| ExplanationWidget
| ExpressionWidget
| GradedGroupSetWidget
| GradedGroupWidget
| GrapherWidget
| GroupWidget
| IFrameWidget
| ImageWidget
| InputNumberWidget
| InteractionWidget
| InteractiveGraphWidget
| LabelImageWidget
| MatcherWidget
| MatrixWidget
| MeasurerWidget
| MockWidget
| MoleculeRendererWidget
| NumberLineWidget
| NumericInputWidget
| OrdererWidget
| PassageRefWidget
| PassageWidget
| PhetSimulationWidget
| PlotterWidget
| PythonProgramWidget
| RadioWidget
| RefTargetWidget
| SorterWidget
| TableWidget
| VideoWidget
| DeprecatedStandinWidget`,elements:[{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}],alias:"PerseusWidget"}},{name:"cb",optional:!0,type:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}}},{name:"silent",optional:!0,type:{name:"boolean"}}],returns:null},{name:"_handleWidgetEditorRemove",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:{name:"string"}}],returns:null},{name:"_sizeImages",docblock:`Calculate the size of all the images in props.content, and send
those sizes to this.props.images using props.onChange.`,modifiers:[],params:[{name:"props",optional:!1,type:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: any;
    className?: string;
    content: string;
    replace?: any;
    placeholder: string;
    widgets: PerseusWidgetsMap;
    images: any;
    disabled: boolean;
    widgetEnabled: boolean;
    immutableWidgets: boolean;
    showWordCount: boolean;
    warnNoPrompt: boolean;
    warnNoWidgets: boolean;
    widgetIsOpen?: boolean;
    imageUploader?: ImageUploader;
    onChange: ChangeHandler;
}`,signature:{properties:[{key:"apiOptions",value:{name:"any",required:!0}},{key:"className",value:{name:"string",required:!1}},{key:"content",value:{name:"string",required:!0}},{key:"replace",value:{name:"any",required:!1}},{key:"placeholder",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"images",value:{name:"any",required:!0}},{key:"disabled",value:{name:"boolean",required:!0}},{key:"widgetEnabled",value:{name:"boolean",required:!0}},{key:"immutableWidgets",value:{name:"boolean",required:!0}},{key:"showWordCount",value:{name:"boolean",required:!0}},{key:"warnNoPrompt",value:{name:"boolean",required:!0}},{key:"warnNoWidgets",value:{name:"boolean",required:!0}},{key:"widgetIsOpen",value:{name:"boolean",required:!1}},{key:"imageUploader",value:{name:"signature",type:"function",raw:`(
    file: File,
    callback: (url: string) => unknown,
) => unknown`,signature:{arguments:[{type:{name:"File"},name:"file"},{type:{name:"signature",type:"function",raw:"(url: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"url"}],return:{name:"unknown"}}},name:"callback"}],return:{name:"unknown"}},required:!1}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
    // Used in the PerseusGradedGroup widget.  A list of "tags" that are keys
    // that represent other content in the system.  Not rendered to the user.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    metadata?: ReadonlyArray<string>;
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    major: number;
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"intersection",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"intersection",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}}]}}],raw:`Readonly<{
    apiOptions: any;
    className?: string;
    content: string;
    replace?: any;
    placeholder: string;
    widgets: PerseusWidgetsMap;
    images: any;
    disabled: boolean;
    widgetEnabled: boolean;
    immutableWidgets: boolean;
    showWordCount: boolean;
    warnNoPrompt: boolean;
    warnNoWidgets: boolean;
    widgetIsOpen?: boolean;
    imageUploader?: ImageUploader;
    onChange: ChangeHandler;
}>`,alias:"Props"}}],returns:null,description:`Calculate the size of all the images in props.content, and send
those sizes to this.props.images using props.onChange.`},{name:"handleDrop",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"DragEvent",alias:"DragEvent"}}],returns:null},{name:"handleChange",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}],alias:"React.SyntheticEvent"}}],returns:null},{name:"_handleKeyDown",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}],alias:"React.KeyboardEvent"}}],returns:null},{name:"_maybeCopyWidgets",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}],alias:"React.SyntheticEvent"}}],returns:null},{name:"_maybePasteWidgets",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLTextAreaElement>",elements:[{name:"HTMLTextAreaElement"}],alias:"React.SyntheticEvent"}}],returns:null},{name:"_safeWidgetNameMapping",docblock:null,modifiers:[],params:[{name:"widgetData",optional:!1,type:{name:"signature",type:"object",raw:"{[name: string]: any}",signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}}}],returns:null},{name:"_addWidgetToContent",docblock:null,modifiers:[],params:[{name:"oldContent",optional:!1,type:{name:"string"}},{name:"cursorRange",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",alias:"ReadonlyArray"}},{name:"widgetType",optional:!1,type:{name:'union["type"]',raw:'PerseusWidget["type"]'}}],returns:null},{name:"_addWidget",docblock:null,modifiers:[],params:[{name:"widgetType",optional:!1,type:{name:"string"}}],returns:null},{name:"addTemplate",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent<HTMLSelectElement>",elements:[{name:"HTMLSelectElement"}],alias:"React.SyntheticEvent"}}],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"focusAndMoveToEnd",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[{name:"options",optional:!1,type:{name:"any"}}],returns:null}],displayName:"Editor",props:{content:{defaultValue:{value:'""',computed:!1},required:!1},placeholder:{defaultValue:{value:'""',computed:!1},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},required:!1},images:{defaultValue:{value:"{}",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},widgetEnabled:{defaultValue:{value:"true",computed:!1},required:!1},immutableWidgets:{defaultValue:{value:"false",computed:!1},required:!1},showWordCount:{defaultValue:{value:"false",computed:!1},required:!1},warnNoPrompt:{defaultValue:{value:"false",computed:!1},required:!1},warnNoWidgets:{defaultValue:{value:"false",computed:!1},required:!1}}};export{Vr as E};
