import{j as c,a as b}from"./jsx-runtime-FVsy8kgq.js";import"./article-renderer-y3FyHVLE.js";import{_ as d}from"./jquery-yG1GhClm.js";import"./util-XcxTwqb0.js";import"./phet-simulation-OmyjCAdl.js";import"./version-akiLXZts.js";import"./dependencies-8XILypbq.js";import"./perseus-api--FMzJRa0.js";import"./multi-renderer-0XDv8ANK.js";import"./hints-renderer-phUSAwlE.js";import"./renderer-Bc3o6rku.js";import"./base-radio-uSTZJxUR.js";import{c as Q}from"./components-QATbWbgm.js";import"./index-0C4KXdeC.js";import"./i18n-context-W41LcU6B.js";import"./svg-image-Rjw-_QTV.js";import{c as R}from"./index-dnMhQZ-1.js";import{P as E}from"./index-k-0mNqHS.js";import{r as U}from"./index-TT1qJ6UJ.js";function M(t){return{newPos:t.newPos,components:t.components.slice(0)}}function V(t){for(var e=[],n=0;n<t.length;n++)t[n]&&e.push(t[n]);return e}function Y(t){var e=t;return e=e.replace(/&/g,"&amp;"),e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=e.replace(/"/g,"&quot;"),e}var C=function(t){this.ignoreWhitespace=t};C.prototype={diff:function(t,e){if(e===t)return[{value:e}];if(!e)return[{value:t,removed:!0}];if(!t)return[{value:e,added:!0}];e=this.tokenize(e),t=this.tokenize(t);var n=e.length,r=t.length,f=n+r,i=[{newPos:-1,components:[]}],s=this.extractCommon(i[0],e,t,0);if(i[0].newPos+1>=n&&s+1>=r)return i[0].components;for(var p=1;p<=f;p++)for(var o=-1*p;o<=p;o+=2){var a,l=i[o-1],u=i[o+1];s=(u?u.newPos:0)-o,l&&(i[o-1]=void 0);var m=l&&l.newPos+1<n,v=u&&0<=s&&s<r;if(!m&&!v){i[o]=void 0;continue}!m||v&&l.newPos<u.newPos?(a=M(u),this.pushComponent(a.components,t[s],void 0,!0)):(a=M(l),a.newPos++,this.pushComponent(a.components,e[a.newPos],!0,void 0));var s=this.extractCommon(a,e,t,o);if(a.newPos+1>=n&&s+1>=r)return a.components;i[o]=a}},pushComponent:function(t,e,n,r){var f=t[t.length-1];f&&f.added===n&&f.removed===r?t[t.length-1]={value:this.join(f.value,e),added:n,removed:r}:t.push({value:e,added:n,removed:r})},extractCommon:function(t,e,n,r){for(var f=e.length,i=n.length,s=t.newPos,p=s-r;s+1<f&&p+1<i&&this.equals(e[s+1],n[p+1]);)s++,p++,this.pushComponent(t.components,e[s],void 0,void 0);return t.newPos=s,p},equals:function(t,e){var n=/\S/;return this.ignoreWhitespace&&!n.test(t)&&!n.test(e)?!0:t===e},join:function(t,e){return t+e},tokenize:function(t){return t}};var Z=new C,X=new C(!0),_=new C;X.tokenize=_.tokenize=function(t){return V(t.split(/(\s+|\b)/))};var $=new C(!0);$.tokenize=function(t){return V(t.split(/([{}:;,]|\s+)/))};var F=new C;F.tokenize=function(t){for(var e=[],n=t.split(/^/m),r=0;r<n.length;r++){var f=n[r],i=n[r-1];f==`
`&&i&&i[i.length-1]==="\r"?e[e.length-1]+=`
`:f&&e.push(f)}return e};const B={Diff:C,diffChars:function(t,e){return Z.diff(t,e)},diffWords:function(t,e){return X.diff(t,e)},diffWordsWithSpace:function(t,e){return _.diff(t,e)},diffLines:function(t,e){return F.diff(t,e)},diffCss:function(t,e){return $.diff(t,e)},createPatch:function(t,e,n,r,f){var i=[];i.push("Index: "+t),i.push("==================================================================="),i.push("--- "+t+(typeof r>"u"?"":"	"+r)),i.push("+++ "+t+(typeof f>"u"?"":"	"+f));var s=F.diff(e,n);s[s.length-1].value||s.pop(),s.push({value:"",lines:[]});function p(N){return N.map(function(y){return" "+y})}function o(N,y,W){var A=s[s.length-2],J=y===s.length-2,K=y===s.length-3&&(W.added!==A.added||W.removed!==A.removed);!/\n$/.test(W.value)&&(J||K)&&N.push("\\ No newline at end of file")}for(var a=0,l=0,u=[],m=1,v=1,w=0;w<s.length;w++){var g=s[w],h=g.lines||g.value.replace(/\n$/,"").split(`
`);if(g.lines=h,g.added||g.removed){if(!a){var I=s[w-1];a=m,l=v,I&&(u=p(I.lines.slice(-4)),a-=u.length,l-=u.length)}u.push.apply(u,h.map(function(N){return(g.added?"+":"-")+N})),o(u,w,g),g.added?v+=h.length:m+=h.length}else{if(a)if(h.length<=8&&w<s.length-2)u.push.apply(u,p(h));else{var k=Math.min(h.length,4);i.push("@@ -"+a+","+(m-a+k)+" +"+l+","+(v-l+k)+" @@"),i.push.apply(i,u),i.push.apply(i,p(h.slice(0,k))),h.length<=4&&o(i,w,g),a=0,l=0,u=[]}m+=h.length,v+=h.length}}return i.join(`
`)+`
`},applyPatch:function(t,e){for(var n=e.split(`
`),r=[],f=!1,i=!1,s=n[0][0]==="I"?4:0;s<n.length;s++)if(n[s][0]==="@"){var p=n[s].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);r.unshift({start:p[3],oldlength:p[2],oldlines:[],newlength:p[4],newlines:[]})}else n[s][0]==="+"?r[0].newlines.push(n[s].substr(1)):n[s][0]==="-"?r[0].oldlines.push(n[s].substr(1)):n[s][0]===" "?(r[0].newlines.push(n[s].substr(1)),r[0].oldlines.push(n[s].substr(1))):n[s][0]==="\\"&&(n[s-1][0]==="+"?f=!0:n[s-1][0]==="-"&&(i=!0));for(var o=t.split(`
`),s=r.length-1;s>=0;s--){for(var a=r[s],l=0;l<a.oldlength;l++)if(o[a.start-1+l]!==a.oldlines[l])return!1;Array.prototype.splice.apply(o,[a.start-1,+a.oldlength].concat(a.newlines))}if(f)for(;!o[o.length-1];)o.pop();else i&&o.push("");return o.join(`
`)},convertChangesToXML:function(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];r.added?e.push("<ins>"):r.removed&&e.push("<del>"),e.push(Y(r.value)),r.added?e.push("</ins>"):r.removed&&e.push("</del>")}return e.join("")},convertChangesToDMP:function(t){for(var e=[],n,r=0;r<t.length;r++)n=t[r],e.push([n.added?1:n.removed?-1:0,n.value]);return e}},H=function(t){const e=[];let n=[];return d.each(t,r=>{const f=r.value.split(`
`);d.each(f,(i,s)=>{s>0&&(e.push(n),n=[]);const o=d.extend({},r,{value:i});n.push(o)})}),n.length&&e.push(n),e},P=function(t){return t.added?"added":t.removed?"removed":"unchanged"},S=t=>d.map(t.value,e=>({value:e,status:P(t)})),ee=function(t,e){return d.flatten(d.map(t,e),!0)},x=new B.Diff;x.tokenize=t=>d.map(t,e=>[e]);x.join=(t,e)=>t.concat(e);x.equals=d.isEqual;const te=t=>ee(t,S),ne=function(t,e){const n=x.diff(t,e),r=te(n);return{before:d.filter(r,f=>f.status!=="added"),after:d.filter(r,f=>f.status!=="removed")}},{SvgImage:se}=Q,q="before",D="after",re=/http.*?\.png|web\+graphie[^)]*/g,O=function(t){return t.match(re)||[]},G=function(t,e,n){return t.added?e:t.removed?n:""},z=class z extends U.Component{render(){return c("div",{children:d.map(this.props.images,(e,n)=>{const r=R({image:!0,"image-unchanged":e.status==="unchanged","image-added":e.status==="added","image-removed":e.status==="removed"});return c("div",{children:c("div",{className:r,children:c(se,{src:e.value,title:e.value})})},n)})})}};z.propTypes={images:E.arrayOf(E.shape({})).isRequired};let T=z;const L=class L extends U.Component{constructor(){super(...arguments),this.state={collapsed:this.props.before===this.props.after},this.handleExpand=()=>{this.setState({collapsed:!1})}}UNSAFE_componentWillReceiveProps(e){this.setState({collapsed:e.before===e.after})}render(){const e=B.diffWords(this.props.before,this.props.after),n=H(e),r=O(this.props.before),f=O(this.props.after),i=ne(r,f),s=d.map(n,o=>{const a={};return a.before=d(o).map(function(l,u){return c("span",{className:G(l,"not-present","removed dark"),children:l.value},u)}),a.after=d(o).map(function(l,u){return c("span",{className:G(l,"added dark","not-present"),children:l.value},u)}),a}),p=R({"diff-row":!0,collapsed:this.state.collapsed});return b("div",{children:[c("div",{className:"diff-header",children:this.props.title}),c("div",{className:"diff-header",children:this.props.title}),c("div",{className:"diff-body ui-helper-clearfix",children:d.map([q,D],(o,a)=>b("div",{className:"diff-row "+o,children:[!this.state.collapsed&&d.map(s,(l,u)=>{const m=l[o].length>1,v=R({"diff-line":!0,added:o===D&&m,removed:o===q&&m});return c("div",{className:v,children:l[o]},u)}),!this.state.collapsed&&c(T,{images:i[o]})]},a))}),d.map([q,D],(o,a)=>c("div",{className:p+" "+o,onClick:this.handleExpand,children:this.state.collapsed&&c("span",{children:b("span",{className:"expand-button",children:[" ","[ show unmodified ]"," "]})})},a))]})}};L.propTypes={after:E.string,before:E.string,title:E.string.isRequired},L.defaultProps={after:"",before:""};let j=L;j.__docgenInfo={description:"",methods:[{name:"handleExpand",docblock:null,modifiers:[],params:[],returns:null}],displayName:"TextDiff",props:{after:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},before:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"string"},required:!0}}};export{j as T};