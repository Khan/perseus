var rn=Object.defineProperty;var an=(t,n,e)=>n in t?rn(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var l=(t,n,e)=>(an(t,typeof n!="symbol"?n+"":n,e),e);import{j as p}from"./jsx-runtime-BT65X5dW.js";import{_ as y,d as sn}from"./index-default-BcKQpA1a.js";import{e as Ae}from"./index-DktHmiAd.js";import{P as j,E}from"./perseus-error-CSETqePQ.js";import{ad as Ge,B as un,ae as on,U as ln,af as Ee,ag as gn,ah as dn,ai as mn}from"./util-Cnd0Ukpp.js";import{P as _}from"./index-CrGd2QqM.js";import{$ as pn}from"./jquery-CkHB0_Mt.js";import{e as cn}from"./index-BzwLglMS.js";import{c as we}from"./index-D7h-teXI.js";import{r as Y}from"./index-C6mWTJJr.js";import{h as ve}from"./index-B1Gws05u.js";import{Z as yn,c as ce}from"./zoomable-tex-Dy-nElJT.js";import{a as hn}from"./i18n-context-bNNtSo4z.js";import{L as $,S as bn}from"./svg-image-BmyLAfxC.js";import{T as Ce}from"./tex-BONImhZG.js";import{Z as wn}from"./zoomable-C_CCSKDG.js";import{g as Q,D as vn}from"./dependencies-BsVPGK1s.js";import{A as fn,C as ye}from"./perseus-api-fTM3z0tF.js";import{L as kn}from"./lint-D0FI20JF.js";import{c as qn,t as xn,u as Pn}from"./constants-BIpV3g0K.js";class H{static parse(n){return new ue(n).parse()}match(n){throw new j("Selector subclasses must implement match()",E.NotAllowed)}toString(){return"Unknown selector class"}}const de=class de{constructor(n){l(this,"tokens");l(this,"tokenIndex");n=n.trim().replace(/\s+/g," "),this.tokens=n.match(de.TOKENS)||[],this.tokenIndex=0}nextToken(){return this.tokens[this.tokenIndex]||""}consume(){this.tokenIndex++}isIdentifier(){const n=this.tokens[this.tokenIndex][0];return n>="a"&&n<="z"||n>="A"&&n<="Z"}skipSpace(){for(;this.nextToken()===" ";)this.consume()}parse(){const n=this.parseTreeSelector();let e=this.nextToken();if(!e)return n;const r=[n];for(;e;){if(e===",")this.consume();else throw new he("Expected comma");r.push(this.parseTreeSelector()),e=this.nextToken()}return new Rn(r)}parseTreeSelector(){this.skipSpace();let n=this.parseNodeSelector();for(;;){const e=this.nextToken();if(!e||e===",")break;if(e===" ")this.consume(),n=new In(n,this.parseNodeSelector());else if(e===">")this.consume(),n=new Tn(n,this.parseNodeSelector());else if(e==="+")this.consume(),n=new Nn(n,this.parseNodeSelector());else if(e==="~")this.consume(),n=new En(n,this.parseNodeSelector());else throw new he("Unexpected token: "+e)}return n}parseNodeSelector(){this.skipSpace();const n=this.nextToken();if(n==="*")return this.consume(),new An;if(this.isIdentifier())return this.consume(),new Sn(n);throw new he("Expected node type")}};l(de,"TOKENS");let ue=de;ue.TOKENS=/([a-zA-Z][\w-]*)|(\d+)|[^\s]|(\s(?=[a-zA-Z\*]))/g;class he extends Error{constructor(n){super(n)}}class Rn extends H{constructor(e){super();l(this,"selectors");this.selectors=e}match(e){for(let r=0;r<this.selectors.length;r++){const a=this.selectors[r].match(e);if(a)return a}return null}toString(){let e="";for(let r=0;r<this.selectors.length;r++)e+=r>0?", ":"",e+=this.selectors[r].toString();return e}}class An extends H{match(n){return[n.currentNode()]}toString(){return"*"}}class Sn extends H{constructor(e){super();l(this,"type");this.type=e}match(e){const r=e.currentNode();return r.type===this.type?[r]:null}toString(){return this.type}}class me extends H{constructor(e,r){super();l(this,"left");l(this,"right");this.left=e,this.right=r}}class In extends me{constructor(n,e){super(n,e)}match(n){const e=this.right.match(n);if(e)for(n=n.clone();n.hasParent();){n.goToParent();const r=this.left.match(n);if(r)return r.concat(e)}return null}toString(){return this.left.toString()+" "+this.right.toString()}}class Tn extends me{constructor(n,e){super(n,e)}match(n){const e=this.right.match(n);if(e&&n.hasParent()){n=n.clone(),n.goToParent();const r=this.left.match(n);if(r)return r.concat(e)}return null}toString(){return this.left.toString()+" > "+this.right.toString()}}class Nn extends me{constructor(n,e){super(n,e)}match(n){const e=this.right.match(n);if(e&&n.hasPreviousSibling()){n=n.clone(),n.goToPreviousSibling();const r=this.left.match(n);if(r)return r.concat(e)}return null}toString(){return this.left.toString()+" + "+this.right.toString()}}class En extends me{constructor(n,e){super(n,e)}match(n){const e=this.right.match(n);if(e)for(n=n.clone();n.hasPreviousSibling();){n.goToPreviousSibling();const r=this.left.match(n);if(r)return r.concat(e)}return null}toString(){return this.left.toString()+" ~ "+this.right.toString()}}const L=class L{constructor(n,e,r,i,a,u){l(this,"name");l(this,"severity");l(this,"selector");l(this,"pattern");l(this,"lint");l(this,"applies");l(this,"message");if(!r&&!i)throw new j("Lint rules must have a selector or pattern",E.InvalidInput,{metadata:{name:n}});this.name=n||"unnamed rule",this.severity=e||L.Severity.BULK_WARNING,this.selector=r||L.DEFAULT_SELECTOR,this.pattern=i||null,typeof a=="function"?(this.lint=a,this.message=null):(this.lint=(...s)=>this._defaultLintFunction(...s),this.message=a),this.applies=u||function(){return!0}}static makeRule(n){return new L(n.name,n.severity,n.selector?H.parse(n.selector):null,L.makePattern(n.pattern),n.lint||n.message,n.applies)}check(n,e,r,i){const a=this.selector.match(e);if(!a)return null;let u;if(this.pattern?u=r.match(this.pattern):u=L.FakePatternMatch(r,r,0),!u)return null;try{const s=this.lint(e,r,a,u,i);return s?typeof s=="string"?{rule:this.name,severity:this.severity,message:s,start:0,end:r.length}:{rule:this.name,severity:this.severity,message:s.message,start:s.start,end:s.end}:null}catch(s){return{rule:"lint-rule-failure",message:`Exception in rule ${this.name}: ${s.message}
Stack trace:
${s.stack}`,start:0,end:r.length}}}_defaultLintFunction(n,e,r,i,a){return{message:this.message||"",start:i.index,end:i.index+i[0].length}}static makePattern(n){if(!n)return null;if(n instanceof RegExp)return n;if(n[0]==="/"){const e=n.lastIndexOf("/"),r=n.substring(1,e),i=n.substring(e+1);return new RegExp(r,i)}return new RegExp(n)}static FakePatternMatch(n,e,r){const i=[e];return i.index=r,i.input=n,i}};l(L,"DEFAULT_SELECTOR"),l(L,"Severity",{ERROR:1,WARNING:2,GUIDELINE:3,BULK_WARNING:4});let d=L;d.DEFAULT_SELECTOR=H.parse("text");const Cn=/\/\/([^\/]+)/;function Xn(t){if(!t)return"";const n=t.match(Cn);return n?n[1]:""}const Yn=d.makeRule({name:"absolute-url",severity:d.Severity.GUIDELINE,selector:"link, image",lint:function(t,n,e,r){const i=e[0].target,a=Xn(i);if(a==="khanacademy.org"||a.endsWith(".khanacademy.org"))return`Don't use absolute URLs:
When linking to KA content or images, omit the
https://www.khanacademy.org URL prefix.
Use a relative URL beginning with / instead.`}}),On=d.makeRule({name:"blockquoted-math",severity:d.Severity.WARNING,selector:"blockQuote math, blockQuote blockMath",message:`Blockquoted math:
math should not be indented.`}),Ln=d.makeRule({name:"blockquoted-widget",severity:d.Severity.WARNING,selector:"blockQuote widget",message:`Blockquoted widget:
widgets should not be indented.`}),jn=d.makeRule({name:"double-spacing-after-terminal",severity:d.Severity.BULK_WARNING,selector:"paragraph",pattern:/[.!\?] {2}/i,message:`Use a single space after a sentence-ending period, or
any other kind of terminal punctuation.`});function Mn(t,n){return`Answer requires a button not found in the button sets: ${t} (in ${n})`}const _n={"\\sqrt":"prealgebra","\\sin":"trig","\\cos":"trig","\\tan":"trig","\\log":"logarithms","\\ln":"logarithms"},Dn=d.makeRule({name:"expression-widget",severity:d.Severity.WARNING,selector:"widget",lint:function(t,n,e,r,i){var g;if(t.currentNode().widgetType!=="expression")return;const a=t.currentNode().id;if(!a)return;const u=(g=i==null?void 0:i.widgets)==null?void 0:g[a];if(!u)return;const s=u.options.answerForms,o=u.options.buttonSets;for(const m of s)for(const[c,w]of Object.entries(_n))if(m.value.includes(c)&&!o.includes(w))return Mn(c,w)}}),Fn=d.makeRule({name:"extra-content-spacing",selector:"paragraph",pattern:/\s+$/,applies:function(t){return(t==null?void 0:t.contentType)==="article"},message:"No extra whitespace at the end of content blocks."}),Gn=d.makeRule({name:"heading-level-1",severity:d.Severity.WARNING,selector:"heading",lint:function(t,n,e,r){if(e[0].level===1)return`Don't use level-1 headings:
Begin headings with two or more # characters.`}}),Wn=d.makeRule({name:"heading-level-skip",severity:d.Severity.WARNING,selector:"heading ~ heading",lint:function(t,n,e,r){const i=e[1],a=e[0];if(i.level>a.level+1)return`Skipped heading level:
this heading is level ${i.level} but
the previous heading was level ${a.level}`}}),Un=d.makeRule({name:"heading-sentence-case",severity:d.Severity.GUIDELINE,selector:"heading",pattern:/^\W*[a-z]/,message:`First letter is lowercase:
the first letter of a heading should be capitalized.`}),Vn={and:!0,nor:!0,but:!0,the:!0,for:!0};function Hn(t){const n=t[0];return n===n.toUpperCase()}const Kn=d.makeRule({name:"heading-title-case",severity:d.Severity.GUIDELINE,selector:"heading",pattern:/[^\s:]\s+[A-Z]+[a-z]/,locale:"en",lint:function(t,n,e,r){let a=n.trim().split(/\s+/);if(a.shift(),a=a.filter(u=>u.length>2&&!Vn.hasOwnProperty(u)),a.length>=3&&a.every(u=>Hn(u)))return`Title-case heading:
This heading appears to be in title-case, but should be sentence-case.
Only capitalize the first letter and proper nouns.`}}),zn=d.makeRule({name:"image-alt-text",severity:d.Severity.WARNING,selector:"image",lint:function(t,n,e,r){const i=e[0];if(!i.alt||!i.alt.trim())return`Images should have alt text:
for accessibility, all images should have alt text.
Specify alt text inside square brackets after the !.`;if(i.alt.length<8)return`Images should have alt text:
for accessibility, all images should have descriptive alt text.
This image's alt text is only ${i.alt.length} characters long.`}}),Qn=d.makeRule({name:"image-in-table",severity:d.Severity.BULK_WARNING,selector:"table image",message:`Image in table:
do not put images inside of tables.`}),Bn=d.makeRule({name:"image-spaces-around-urls",severity:d.Severity.ERROR,selector:"image",lint:function(t,n,e,r,i){const u=e[0].target;if(i&&i.content){const s=i.content.indexOf(u);if(s===-1)return;if(i.content[s-1]!=="("||i.content[s+u.length]!==")")return`Whitespace before or after image url:
For images, don't include any space or newlines after '(' or before ')'.
Whitespace in image URLs causes translation difficulties.`}}}),$n=d.makeRule({name:"image-url-empty",severity:d.Severity.ERROR,selector:"image",lint:function(t,n,e){const i=e[0].target;if(!i||!i.trim())return"Images should have a URL"}}),Jn=d.makeRule({name:"image-widget",severity:d.Severity.WARNING,selector:"widget",lint:function(t,n,e,r,i){if(t.currentNode().widgetType!=="image")return;const a=t.currentNode().id;if(!a)return;const u=i&&i.widgets&&i.widgets[a];if(!u)return;const s=u.options.alt;if(!s)return`Images should have alt text:
for accessibility, all images should have a text description.
Add a description in the "Alt Text" box of the image widget.`;if(s.trim().length<8)return`Images should have alt text:
for accessibility, all images should have descriptive alt text.
This image's alt text is only ${s.trim().length} characters long.`;if(u.options.caption&&u.options.caption.match(/[^\\]\$/))return`No math in image captions:
Don't include math expressions in image captions.`}}),Zn=d.makeRule({name:"link-click-here",severity:d.Severity.WARNING,selector:"link",pattern:/click here/i,message:`Inappropriate link text:
Do not use the words "click here" in links.`}),et=d.makeRule({name:"long-paragraph",severity:d.Severity.GUIDELINE,selector:"paragraph",pattern:/^.{501,}/,lint:function(t,n,e,r){return`Paragraph too long:
This paragraph is ${n.length} characters long.
Shorten it to 500 characters or fewer.`}}),nt=d.makeRule({name:"math-adjacent",severity:d.Severity.WARNING,selector:"blockMath+blockMath",message:`Adjacent math blocks:
combine the blocks between \\begin{align} and \\end{align}`}),tt=d.makeRule({name:"math-align-extra-break",severity:d.Severity.WARNING,selector:"blockMath",pattern:/(\\{2,})\s*\\end{align}/,message:`Extra space at end of block:
Don't end an align block with backslashes`}),rt=d.makeRule({name:"math-align-linebreaks",severity:d.Severity.WARNING,selector:"blockMath",pattern:/\\begin{align}[\s\S]*\\\\[\s\S]+\\end{align}/,lint:function(t,n,e,r){let i=r[0];for(;i.length;){const a=i.indexOf("\\\\");if(a===-1)return;i=i.substring(a+2);const u=i.match(/^\s*\\\\\s*(?!\\\\)/);if(!u)return"Use four backslashes between lines of an align block";i=i.substring(u[0].length)}}}),it=d.makeRule({name:"math-empty",severity:d.Severity.WARNING,selector:"math, blockMath",pattern:/^$/,message:"Empty math: don't use $$ in your markdown."}),at=d.makeRule({name:"math-frac",severity:d.Severity.GUIDELINE,selector:"math, blockMath",pattern:/\\frac[ {]/,message:"Use \\dfrac instead of \\frac in your math expressions."}),st=d.makeRule({name:"math-nested",severity:d.Severity.ERROR,selector:"math, blockMath",pattern:/\\text{[^$}]*\$[^$}]*\$[^}]*}/,message:`Nested math:
Don't nest math expressions inside \\text{} blocks`}),ut=d.makeRule({name:"math-starts-with-space",severity:d.Severity.GUIDELINE,selector:"math, blockMath",pattern:/^\s*(~|\\qquad|\\quad|\\,|\\;|\\:|\\ |\\!|\\enspace|\\phantom)/,message:`Math starts with space:
math should not be indented. Do not begin math expressions with
LaTeX space commands like ~, \\;, \\quad, or \\phantom`}),ot=d.makeRule({name:"math-text-empty",severity:d.Severity.WARNING,selector:"math, blockMath",pattern:/\\text{\s*}/,message:"Empty \\text{} block in math expression"}),lt=d.makeRule({name:"math-without-dollars",severity:d.Severity.GUIDELINE,pattern:/\\\w+{[^}]*}|{|}/,message:`This looks like LaTeX:
did you mean to put it inside dollar signs?`}),gt=d.makeRule({name:"nested-lists",severity:d.Severity.WARNING,selector:"list list",message:`Nested lists:
nested lists are hard to read on mobile devices;
do not use additional indentation.`}),dt=d.makeRule({name:"static-widget-in-question-stem",severity:d.Severity.WARNING,selector:"widget",lint:(t,n,e,r,i)=>{var s;if((i==null?void 0:i.contentType)!=="exercise"||i.stack.includes("hint"))return;const a=t.currentNode().id;if(!a)return;const u=(s=i==null?void 0:i.widgets)==null?void 0:s[a];if(u&&u.static)return"Widget in question stem is static (non-interactive)."}}),mt=d.makeRule({name:"table-missing-cells",severity:d.Severity.WARNING,selector:"table",lint:function(t,n,e,r){const i=e[0],a=i.header.length,u=i.cells.map(s=>s.length);for(let s=0;s<u.length;s++)if(u[s]!==a)return`Table rows don't match header:
The table header has ${a} cells, but
Row ${s+1} has ${u[s]} cells.`}}),pt=d.makeRule({name:"unbalanced-code-delimiters",severity:d.Severity.ERROR,pattern:/[`~]+/,message:`Unbalanced code delimiters:
code blocks should begin and end with the same type and number of delimiters`}),ct=d.makeRule({name:"unescaped-dollar",severity:d.Severity.ERROR,selector:"unescapedDollar",message:`Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`}),yt=d.makeRule({name:"widget-in-table",severity:d.Severity.BULK_WARNING,selector:"table widget",message:`Widget in table:
do not put widgets inside of tables.`}),ht=[Yn,On,Ln,jn,$n,Dn,Fn,Gn,Wn,Un,Kn,zn,Qn,Zn,et,nt,tt,rt,it,at,st,ut,ot,gt,dt,mt,ct,yt,lt,pt,Bn,Jn];class U{constructor(n){l(this,"root");this.root=n}static isNode(n){return n&&typeof n=="object"&&typeof n.type=="string"}static isTextNode(n){return U.isNode(n)&&n.type==="text"&&typeof n.content=="string"}traverse(n){this._traverse(this.root,new Se(this.root),n)}_traverse(n,e,r){let i="";if(U.isNode(n)){const a=n;e._containers.push(a),e._ancestors.push(a),typeof a.content=="string"&&(i=a.content),Object.keys(a).forEach(s=>{if(s==="type")return;const o=a[s];o&&typeof o=="object"&&(e._indexes.push(s),i+=this._traverse(o,e,r),e._indexes.pop())}),e._currentNode=e._ancestors.pop(),e._containers.pop(),r(a,e,i)}else if(Array.isArray(n)){const a=n;e._containers.push(a);let u=0;for(;u<a.length;)e._indexes.push(u),i+=this._traverse(a[u],e,r),u=e._indexes.pop()+1;e._containers.pop()}return i}}class Se{constructor(n){l(this,"root");l(this,"_currentNode");l(this,"_containers");l(this,"_indexes");l(this,"_ancestors");this.root=n,this._currentNode=null,this._containers=new B,this._indexes=new B,this._ancestors=new B}currentNode(){return this._currentNode||this.root}parent(){return this._ancestors.top()}ancestors(){return this._ancestors.values()}nextSibling(){const n=this._containers.top();if(!n||!Array.isArray(n))return null;const e=this._indexes.top();return n.length>e+1?n[e+1]:null}previousSibling(){const n=this._containers.top();if(!n||!Array.isArray(n))return null;const e=this._indexes.top();return e>0?n[e-1]:null}removeNextSibling(){const n=this._containers.top();if(n&&Array.isArray(n)){const e=this._indexes.top();if(n.length>e+1)return n.splice(e+1,1)[0]}return null}replace(...n){const e=this._containers.top();if(!e)throw new j("Can't replace the root of the tree",E.Internal);if(Array.isArray(e)){const r=this._indexes.top();e.splice(r,1,...n),this._indexes.pop(),this._indexes.push(r+n.length-1)}else{const r=this._indexes.top();n.length===0?delete e[r]:n.length===1?e[r]=n[0]:e[r]=n}}hasPreviousSibling(){return Array.isArray(this._containers.top())&&this._indexes.top()>0}goToPreviousSibling(){if(!this.hasPreviousSibling())throw new j("goToPreviousSibling(): node has no previous sibling",E.Internal);this._currentNode=this.previousSibling();const n=this._indexes.pop();this._indexes.push(n-1)}hasParent(){return this._ancestors.size()!==0}goToParent(){if(!this.hasParent())throw new j("goToParent(): node has no ancestor",E.NotAllowed);for(this._currentNode=this._ancestors.pop();this._containers.size()&&this._containers.top()[this._indexes.top()]!==this._currentNode;)this._containers.pop(),this._indexes.pop()}clone(){const n=new Se(this.root);return n._currentNode=this._currentNode,n._containers=this._containers.clone(),n._indexes=this._indexes.clone(),n._ancestors=this._ancestors.clone(),n}equals(n){return this.root===n.root&&this._currentNode===n._currentNode&&this._containers.equals(n._containers)&&this._indexes.equals(n._indexes)&&this._ancestors.equals(n._ancestors)}}class B{constructor(n){l(this,"stack");this.stack=n?n.slice(0):[]}push(n){this.stack.push(n)}pop(){return this.stack.pop()}top(){return this.stack[this.stack.length-1]}values(){return this.stack.slice(0)}size(){return this.stack.length}toString(){return this.stack.toString()}clone(){return new B(this.stack)}equals(n){if(!n||!n.stack||n.stack.length!==this.stack.length)return!1;for(let e=0;e<this.stack.length;e++)if(this.stack[e]!==n.stack[e])return!1;return!0}}const bt="@khanacademy/perseus-linter",wt="__lib_version__";Ae(bt,wt);_.shape({contentType:_.string,highlightLint:_.bool,paths:_.arrayOf(_.string),stack:_.arrayOf(_.string)});const We={contentType:"",highlightLint:!1,paths:[],stack:[]},vt=ht.filter(t=>t.severity<d.Severity.BULK_WARNING);function ft(t,n,e,r=vt){const i=[],a=new U(t);a.traverse((o,g,m)=>{if(U.isTextNode(o)){let c=g.nextSibling();for(;U.isTextNode(c);)o.content+=c.content,g.removeNextSibling(),c=g.nextSibling()}});let u=[],s=!1;return a.traverse((o,g,m)=>{const c=[],w=r.filter(h=>h.applies(n)),k=[...n.stack];k.push(o.type);const x={...n,stack:k.join(".")};if(w.forEach(h=>{const f=h.check(o,g,m,x);f&&((f.start||f.end)&&(f.target=m.substring(f.start,f.end)),i.push(f),c.push(f))}),o.type==="table"?(u.length&&c.push(...u),s=!1,u=[]):s||(s=g.ancestors().some(h=>h.type==="table")),s&&c.length&&u.push(...c),c.length)if(c.sort((h,f)=>h.severity-f.severity),o.type!=="text"||c.length>1)g.replace({type:"lint",content:o,message:c.map(h=>h.message).join(`

`),ruleName:c[0].rule,blockHighlight:x.blockHighlight,insideTable:s,severity:c[0].severity});else{const h=o.content,f=c[0],R=f.start||0,I=f.end||h.length,M=h.substring(0,R),A=h.substring(R,I),ee=h.substring(I),ne=[];M&&ne.push({type:"text",content:M}),ne.push({type:"lint",content:{type:"text",content:A},message:f.message,ruleName:f.rule,insideTable:s,severity:f.severity}),ee&&ne.push({type:"text",content:ee}),g.replace(...ne)}}),i}function kt(t,n){const e=t.stack||[];return{...t,stack:e.concat(n)}}const qt={activeDefinitionId:null,setActiveDefinitionId:()=>{}},Ue=Y.createContext(qt);class fe extends Y.Component{constructor(){super(...arguments);l(this,"state",{activeDefinitionId:null});l(this,"setActiveDefinitionId",e=>{this.setState(r=>({activeDefinitionId:e}))})}render(){const{children:e}=this.props,{activeDefinitionId:r}=this.state,{setActiveDefinitionId:i}=this;return p.jsx(Ue.Provider,{value:{activeDefinitionId:r,setActiveDefinitionId:i},children:e})}}const Kr=Ue.Consumer;fe.__docgenInfo={description:"",methods:[{name:"setActiveDefinitionId",docblock:null,modifiers:[],params:[{name:"activeDefinitionId",optional:!0,type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]}}],returns:{type:{name:"void"}}}],displayName:"DefinitionProvider",props:{children:{required:!0,tsType:{name:"any"},description:""}}};class X extends Y.Component{constructor(n){super(n),this.state={error:""}}componentDidCatch(n,e){var r,i;this.setState({error:n.toString()}),(i=(r=this.props).onError)==null||i.call(r,n,e),$.error("Unhandled Perseus error: "+n.message,E.Internal,{cause:n,loggedMetadata:{componentStack:e&&"componentStack"in e?e.componentStack:"componentStack not provided",...this.props.metadata}})}render(){return this.state.error?p.jsxs("svg",{height:"16",width:"16",viewBox:"0 0 16 16",role:"img",children:[p.jsx("title",{children:"Rendering Error!"}),p.jsx("path",{d:"m8 16c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-3c0.55 0 1-0.45 1-1s-0.45-1-1-1-1 0.45-1 1 0.45 1 1 1zm0-9c-0.55 0-1 0.45-1 1v4c0 0.55.45 1 1 1s1-0.45 1-1v-4c0-0.55-0.45-1-1-1z",fill:"#d92916",fillRule:"evenodd"})]}):this.props.children}}X.__docgenInfo={description:"",methods:[],displayName:"ErrorBoundary",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},metadata:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:""},onError:{required:!1,tsType:{name:"signature",type:"function",raw:"(error: Error, info: any) => void",signature:{arguments:[{type:{name:"Error"},name:"error"},{type:{name:"any"},name:"info"}],return:{name:"void"}}},description:""}}};function xt(){}class Pt{constructor(n,e,r,i){l(this,"_tracked");l(this,"setting");l(this,"track");l(this,"trackApi");l(this,"widgetID");l(this,"widgetType");l(this,"_track",n=>{this._tracked&&!this.setting||(this._tracked=!0,this.trackApi({type:this.widgetType,id:this.widgetID,...n}))});n?(this._tracked=!1,this.trackApi=n,this.widgetType=e,this.widgetID=r,this.setting=i,this.track=this._track):this.track=xt}}const Rt="@khanacademy/simple-markdown",At="__lib_version__";Ae(Rt,At);var St=/\r\n?/g,It=/\t/g,Tt=/\f/g,Ve=function(t){return t.replace(St,`
`).replace(Tt,"").replace(It,"    ")},He=function(t,n){var e=t||{};if(n!=null)for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},Ke=function(t,n){var e=Object.keys(t).filter(function(u){var s=t[u];if(s==null||s.match==null)return!1;var o=s.order;return(typeof o!="number"||!isFinite(o))&&typeof console<"u"&&console.warn("simple-markdown: Invalid order for rule `"+u+"`: "+String(o)),!0});e.sort(function(u,s){var o=t[u],g=t[s],m=o.order,c=g.order;if(m!==c)return m-c;var w=o.quality?0:1,k=g.quality?0:1;return w!==k?w-k:u<s?-1:u>s?1:0});var r,i=function(u,s){var o=[];for(s=s||r,r=s;u;){var g=null,m=null,c=null,w=NaN,k=0,x=e[0],h=t[x];do{var f=h.order,R=s.prevCapture==null?"":s.prevCapture[0],I=h.match(u,s,R);if(I){var M=h.quality?h.quality(I,s,R):0;M<=w||(g=x,m=h,c=I,w=M)}k++,x=e[k],h=t[x]}while(h&&(!c||h.order===f&&h.quality));if(m==null||c==null)throw new Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '"+e[e.length-1]+`'. It seems to not match the following source:
`+u);if(c.index)throw new Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?");var A=m.parse(c,i,s);if(Array.isArray(A))Array.prototype.push.apply(o,A);else{if(A==null||typeof A!="object")throw new Error(`parse() function returned invalid parse result: '${A}'`);A.type==null&&(A.type=g),o.push(A)}s.prevCapture=c,u=u.substring(s.prevCapture[0].length)}return o},a=function(u,s){return r=He(s,n),!r.inline&&!r.disableAutoBlockNewlines&&(u=u+`

`),r.prevCapture=null,i(Ve(u),r)};return a},S=function(t){var n=function(e,r,i){return r.inline?t.exec(e):null};return n.regex=t,n},N=function(t){var n=function(e,r){return r.inline?null:t.exec(e)};return n.regex=t,n},ke=function(t){var n=function(e,r){return t.exec(e)};return n.regex=t,n},Nt=typeof Symbol=="function"&&Symbol.for&&Symbol.for("react.element")||60103,q=function(t,n,e){var r={$$typeof:Nt,type:t,key:n??void 0,ref:null,props:e,_owner:null};return r},P=function(t,n,e,r){e=e||{},r=typeof r<"u"?r:!0;var i="";for(var a in e){var u=e[a];Object.prototype.hasOwnProperty.call(e,a)&&u&&(i+=" "+V(a)+'="'+V(u)+'"')}var s="<"+t+i+">";return r?s+n+"</"+t+">":s},Et={},z=function(t){if(t==null)return null;try{var n=new URL(t,"https://localhost").protocol;if(n.indexOf("javascript:")===0||n.indexOf("vbscript:")===0||n.indexOf("data:")===0)return null}catch{return null}return t},Ct=/[<>&"']/g,Xt={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#96;"},V=function(t){return String(t).replace(Ct,function(n){return Xt[n]})},Yt=/\\([^0-9A-Za-z\s])/g,qe=function(t){return t.replace(Yt,"$1")},oe=function(t,n,e){var r=e.inline||!1;e.inline=!0;var i=t(n,e);return e.inline=r,i},Ot=function(t,n,e){var r=e.inline||!1;e.inline=!1;var i=t(n+`

`,e);return e.inline=r,i},te=function(t,n,e){return{content:oe(n,t[1],e)}},be=function(){return{}},le="(?:[*+-]|\\d+\\.)",ze="( *)("+le+") +",Xe=new RegExp("^"+ze),Lt=new RegExp(ze+"[^\\n]*(?:\\n(?!\\1"+le+` )[^\\n]*)*(
|$)`,"gm"),Qe=/\n{2,}$/,jt=/^ (?= *`)|(` *) $/g,Mt=Qe,Ye=/ *\n+$/,_t=new RegExp("^( *)("+le+`) [\\s\\S]+?(?:
{2,}(?! )(?!\\1`+le+` )\\n*|\\s*
*$)`),Dt=/(?:^|\n)( *)$/,re=function(){var t=/^ *\| *| *\| *$/g,n=/ *$/,e=/^ *-+: *$/,r=/^ *:-+: *$/,i=/^ *:-+ *$/,a=function(m){return e.test(m)?"right":r.test(m)?"center":i.test(m)?"left":null},u=function(m,c,w,k){k&&(m=m.replace(t,""));var x=m.trim().split("|");return x.map(a)},s=function(m,c,w,k){var x=w.inTable;w.inTable=!0;var h=c(m.trim(),w);w.inTable=x;var f=[[]];return h.forEach(function(R,I){R.type==="tableSeparator"?(!k||I!==0&&I!==h.length-1)&&f.push([]):(R.type==="text"&&(h[I+1]==null||h[I+1].type==="tableSeparator")&&(R.content=R.content.replace(n,"")),f[f.length-1].push(R))}),f},o=function(m,c,w,k){var x=m.trim().split(`
`);return x.map(function(h){return s(h,c,w,k)})},g=function(m){return function(c,w,k){k.inline=!0;var x=s(c[1],w,k,m),h=u(c[2],w,k,m),f=o(c[3],w,k,m);return k.inline=!1,{type:"table",header:x,align:h,cells:f}}};return{parseTable:g(!0),parseNpTable:g(!1),TABLE_REGEX:/^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,NPTABLE_REGEX:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/}}(),ie="(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*",Oe=`\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`,Ft=/mailto:/i,Le=function(t,n,e){var r=(t[2]||t[1]).replace(/\s+/g," ").toLowerCase();if(n._defs&&n._defs[r]){var i=n._defs[r];e.target=i.target,e.title=i.title}return n._refs=n._refs||{},n._refs[r]=n._refs[r]||[],n._refs[r].push(e),e},v=0,Z={Array:{react:function(t,n,e){for(var r=e.key,i=[],a=0,u=0;a<t.length;a++,u++){e.key=""+a;var s=t[a];if(s.type==="text")for(s={type:"text",content:s.content};a+1<t.length&&t[a+1].type==="text";a++)s.content+=t[a+1].content;i.push(n(s,e))}return e.key=r,i},html:function(t,n,e){for(var r="",i=0;i<t.length;i++){var a=t[i];if(a.type==="text")for(a={type:"text",content:a.content};i+1<t.length&&t[i+1].type==="text";i++)a.content+=t[i+1].content;r+=n(a,e)}return r}},heading:{order:v++,match:N(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),parse:function(t,n,e){return{level:t[1].length,content:oe(n,t[2].trim(),e)}},react:function(t,n,e){return q("h"+t.level,e.key,{children:n(t.content,e)})},html:function(t,n,e){return P("h"+t.level,n(t.content,e))}},nptable:{order:v++,match:N(re.NPTABLE_REGEX),parse:re.parseNpTable,react:null,html:null},lheading:{order:v++,match:N(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),parse:function(t,n,e){return{type:"heading",level:t[2]==="="?1:2,content:oe(n,t[1],e)}},react:null,html:null},hr:{order:v++,match:N(/^( *[-*_]){3,} *(?:\n *)+\n/),parse:be,react:function(t,n,e){return q("hr",e.key,{"aria-hidden":!0})},html:function(t,n,e){return'<hr aria-hidden="true">'}},codeBlock:{order:v++,match:N(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),parse:function(t,n,e){var r=t[0].replace(/^    /gm,"").replace(/\n+$/,"");return{lang:void 0,content:r}},react:function(t,n,e){var r=t.lang?"markdown-code-"+t.lang:void 0;return q("pre",e.key,{children:q("code",null,{className:r,children:t.content})})},html:function(t,n,e){var r=t.lang?"markdown-code-"+t.lang:void 0,i=P("code",V(t.content),{class:r});return P("pre",i)}},fence:{order:v++,match:N(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),parse:function(t,n,e){return{type:"codeBlock",lang:t[2]||void 0,content:t[3]}},react:null,html:null},blockQuote:{order:v++,match:N(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),parse:function(t,n,e){var r=t[0].replace(/^ *> ?/gm,"");return{content:n(r,e)}},react:function(t,n,e){return q("blockquote",e.key,{children:n(t.content,e)})},html:function(t,n,e){return P("blockquote",n(t.content,e))}},list:{order:v++,match:function(t,n){var e=n.prevCapture==null?"":n.prevCapture[0],r=Dt.exec(e),i=n._list||!n.inline;return r&&i?(t=r[1]+t,_t.exec(t)):null},parse:function(t,n,e){var r=t[2],i=r.length>1,a=i?+r:void 0,u=t[0].replace(Mt,`
`).match(Lt),s=!1,o=u.map(function(g,m){var c=Xe.exec(g),w=c?c[0].length:0,k=new RegExp("^ {1,"+w+"}","gm"),x=g.replace(k,"").replace(Xe,""),h=m===u.length-1,f=x.indexOf(`

`)!==-1,R=f||h&&s;s=R;var I=e.inline,M=e._list;e._list=!0;var A;R?(e.inline=!1,A=x.replace(Ye,`

`)):(e.inline=!0,A=x.replace(Ye,""));var ee=n(A,e);return e.inline=I,e._list=M,ee});return{ordered:i,start:a,items:o}},react:function(t,n,e){var r=t.ordered?"ol":"ul";return q(r,e.key,{start:t.start,children:t.items.map(function(i,a){return q("li",""+a,{children:n(i,e)})})})},html:function(t,n,e){var r=t.items.map(function(u){return P("li",n(u,e))}).join(""),i=t.ordered?"ol":"ul",a={start:t.start};return P(i,r,a)}},def:{order:v++,match:N(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),parse:function(t,n,e){var r=t[1].replace(/\s+/g," ").toLowerCase(),i=t[2],a=t[3];return e._refs&&e._refs[r]&&e._refs[r].forEach(function(u){u.target=i,u.title=a}),e._defs=e._defs||{},e._defs[r]={target:i,title:a},{def:r,target:i,title:a}},react:function(){return null},html:function(){return""}},table:{order:v++,match:N(re.TABLE_REGEX),parse:re.parseTable,react:function(t,n,e){var r=function(u){return t.align[u]==null?{}:{textAlign:t.align[u]}},i=t.header.map(function(u,s){return q("th",""+s,{style:r(s),scope:"col",children:n(u,e)})}),a=t.cells.map(function(u,s){return q("tr",""+s,{children:u.map(function(o,g){return q("td",""+g,{style:r(g),children:n(o,e)})})})});return q("table",e.key,{children:[q("thead","thead",{children:q("tr",null,{children:i})}),q("tbody","tbody",{children:a})]})},html:function(t,n,e){var r=function(o){return t.align[o]==null?"":"text-align:"+t.align[o]+";"},i=t.header.map(function(o,g){return P("th",n(o,e),{style:r(g),scope:"col"})}).join(""),a=t.cells.map(function(o){var g=o.map(function(m,c){return P("td",n(m,e),{style:r(c)})}).join("");return P("tr",g)}).join(""),u=P("thead",P("tr",i)),s=P("tbody",a);return P("table",u+s)}},newline:{order:v++,match:N(/^(?:\n *)*\n/),parse:be,react:function(t,n,e){return`
`},html:function(t,n,e){return`
`}},paragraph:{order:v++,match:N(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),parse:te,react:function(t,n,e){return q("div",e.key,{className:"paragraph",children:n(t.content,e)})},html:function(t,n,e){var r={class:"paragraph"};return P("div",n(t.content,e),r)}},escape:{order:v++,match:S(/^\\([^0-9A-Za-z\s])/),parse:function(t,n,e){return{type:"text",content:t[1]}},react:null,html:null},tableSeparator:{order:v++,match:function(t,n){return n.inTable?/^ *\| */.exec(t):null},parse:function(){return{type:"tableSeparator"}},react:function(){return" | "},html:function(){return" &vert; "}},autolink:{order:v++,match:S(/^<([^: >]+:\/[^ >]+)>/),parse:function(t,n,e){return{type:"link",content:[{type:"text",content:t[1]}],target:t[1]}},react:null,html:null},mailto:{order:v++,match:S(/^<([^ >]+@[^ >]+)>/),parse:function(t,n,e){var r=t[1],i=t[1];return Ft.test(i)||(i="mailto:"+i),{type:"link",content:[{type:"text",content:r}],target:i}},react:null,html:null},url:{order:v++,match:S(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),parse:function(t,n,e){return{type:"link",content:[{type:"text",content:t[1]}],target:t[1],title:void 0}},react:null,html:null},link:{order:v++,match:S(new RegExp("^\\[("+ie+")\\]\\("+Oe+"\\)")),parse:function(t,n,e){var r={content:n(t[1],e),target:qe(t[2]),title:t[3]};return r},react:function(t,n,e){return q("a",e.key,{href:z(t.target),title:t.title,children:n(t.content,e)})},html:function(t,n,e){var r={href:z(t.target),title:t.title};return P("a",n(t.content,e),r)}},image:{order:v++,match:S(new RegExp("^!\\[("+ie+")\\]\\("+Oe+"\\)")),parse:function(t,n,e){var r={alt:t[1],target:qe(t[2]),title:t[3]};return r},react:function(t,n,e){return q("img",e.key,{src:z(t.target),alt:t.alt,title:t.title})},html:function(t,n,e){var r={src:z(t.target),alt:t.alt,title:t.title};return P("img","",r,!1)}},reflink:{order:v++,match:S(new RegExp("^\\[("+ie+")\\]\\s*\\[([^\\]]*)\\]")),parse:function(t,n,e){return Le(t,e,{type:"link",content:n(t[1],e)})},react:null,html:null},refimage:{order:v++,match:S(new RegExp("^!\\[("+ie+")\\]\\s*\\[([^\\]]*)\\]")),parse:function(t,n,e){return Le(t,e,{type:"image",alt:t[1]})},react:null,html:null},em:{order:v,match:S(new RegExp("^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)")),quality:function(t){return t[0].length+.2},parse:function(t,n,e){return{content:n(t[2]||t[1],e)}},react:function(t,n,e){return q("em",e.key,{children:n(t.content,e)})},html:function(t,n,e){return P("em",n(t.content,e))}},strong:{order:v,match:S(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),quality:function(t){return t[0].length+.1},parse:te,react:function(t,n,e){return q("strong",e.key,{children:n(t.content,e)})},html:function(t,n,e){return P("strong",n(t.content,e))}},u:{order:v++,match:S(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),quality:function(t){return t[0].length},parse:te,react:function(t,n,e){return q("u",e.key,{children:n(t.content,e)})},html:function(t,n,e){return P("u",n(t.content,e))}},del:{order:v++,match:S(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),parse:te,react:function(t,n,e){return q("del",e.key,{children:n(t.content,e)})},html:function(t,n,e){return P("del",n(t.content,e))}},inlineCode:{order:v++,match:S(/^(`+)([\s\S]*?[^`])\1(?!`)/),parse:function(t,n,e){return{content:t[2].replace(jt,"$1")}},react:function(t,n,e){return q("code",e.key,{children:t.content})},html:function(t,n,e){return P("code",V(t.content))}},br:{order:v++,match:ke(/^ {2,}\n/),parse:be,react:function(t,n,e){return q("br",e.key,Et)},html:function(t,n,e){return"<br>"}},text:{order:v++,match:ke(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),parse:function(t,n,e){return{content:t[0]}},react:function(t,n,e){return t.content},html:function(t,n,e){return V(t.content)}}},Gt=function(t,n){!n&&typeof console<"u"&&console.warn("simple-markdown ruleOutput should take 'react' or 'html' as the second argument.");var e=function(r,i,a){return t[r.type][n](r,i,a)};return e},Wt=function(t){var n=function(e,r){if(r=r||{},Array.isArray(e)){for(var i=r.key,a=[],u=null,s=0;s<e.length;s++){r.key=""+s;var o=n(e[s],r);typeof o=="string"&&typeof u=="string"?(u=u+o,a[a.length-1]=u):(a.push(o),u=o)}return r.key=i,a}else return t(e,n,r)};return n},Ut=function(t){var n=function(e,r){return r=r||{},Array.isArray(e)?e.map(function(i){return n(i,r)}).join(""):t(e,n,r)};return n},Ie=function(t,n,e={}){if(!n)throw new Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");var r,i=t.Array||Z.Array,a=i[n];if(!a)throw new Error("simple-markdown: outputFor: to join nodes of type `"+n+"` you must provide an `Array:` joiner rule with that type, Please see the docs for details on specifying an Array rule.");var u=a,s=function(g,m){return m=m||r,r=m,Array.isArray(g)?u(g,s,m):t[g.type][n](g,s,m)},o=function(g,m){return r=He(m,e),s(g,r)};return o},pe=Ke(Z),Te=function(t,n){return n=n||{},n.inline=!1,pe(t,n)},Vt=function(t,n){return n=n||{},n.inline=!0,pe(t,n)},je=function(t,n){var e=Qe.test(t);return n=n||{},n.inline=!e,pe(t,n)},xe=Ie(Z,"react"),Be=Ie(Z,"html"),$e=function(t,n){return xe(Te(t,n),n)},Ht=function(t,n){return Be(Te(t,n),n)},Kt=function(t){var n={};for(var e in t)e!=="source"&&Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n.children=$e(t.source),q("div",null,n)},b={defaultRules:Z,parserFor:Ke,outputFor:Ie,inlineRegex:S,blockRegex:N,anyScopeRegex:ke,parseInline:oe,parseBlock:Ot,markdownToReact:$e,markdownToHtml:Ht,ReactMarkdown:Kt,defaultBlockParse:Te,defaultInlineParse:Vt,defaultImplicitParse:je,defaultReactOutput:xe,defaultHtmlOutput:Be,preprocess:Ve,sanitizeText:V,sanitizeUrl:z,unescapeUrl:qe,htmlTag:P,reactElement:q,defaultRawParse:pe,ruleOutput:Gt,reactFor:Wt,htmlFor:Ut,defaultParse:function(...t){return typeof console<"u"&&console.warn("defaultParse is deprecated, please use `defaultImplicitParse`"),je.apply(null,t)},defaultOutput:function(...t){return typeof console<"u"&&console.warn("defaultOutput is deprecated, please use `defaultReactOutput`"),xe.apply(null,t)}};const zt={fence:{match:b.defaultRules.fence.match,order:1,parse:(t,n,e)=>({type:"codeBlock",lang:t[2]||void 0,content:t[3]})},paragraph:{match:b.defaultRules.paragraph.match,order:2,parse:(t,n,e)=>({content:t[1]})}},Qt=b.parserFor(zt),Bt=t=>{const n=t.replace(/^\n\s*\n/,"")+`

`;return Qt(n,{inline:!1}).map(e=>e.content)},$t=t=>t.join(`

`),Me={parseToArray:Bt,joinFromArray:$t},Jt="@khanacademy/pure-markdown",Zt="__lib_version__";Ae(Jt,Zt);const er=/^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/,Je=(t,n,e)=>{const r=t.length;let i=0;if(e){if(n.inline)return null;for(;i<r&&t[i]===" ";)i++}if(!(i<r&&t[i]==="$"))return null;i++;const a=i;let u=0;for(;i<r;){const s=t[i];if(s==="\\")i++;else if(u<=0&&s==="$"){let o=i+1;if(e){const g=/^(?: *\n){2,}/.exec(t.slice(o));o=g?o+g[0].length:null}return o?[t.substring(0,o),t.substring(a,i)]:null}else if(s==="{")u++;else if(s==="}")u--;else if(s===`
`&&t[i-1]===`
`)return null;i++}return null},nr=(t,n)=>Je(t,n,!1),tr=(t,n)=>Je(t,n,!0),rr=new RegExp("^\\|\\| +(.*) +\\|\\| *\\n("+b.defaultRules.nptable.match.regex.source.substring(1)+")"),ir=b.blockRegex(/^(crwdns.*)\n\s*\n/),T={...b.defaultRules,columns:{order:-2,match:b.blockRegex(/^([\s\S]*\n\n)={5,}\n\n([\s\S]*)/),parse:(t,n,e)=>({col1:n(t[1],e),col2:n(t[2],e)})},crowdinId:{order:-1,match:(t,n,e)=>n.isJipt?ir(t,n,e):null,parse:(t,n,e)=>({id:t[1]})},titledTable:{order:b.defaultRules.nptable.order-.5,match:b.blockRegex(rr),parse:(t,n,e)=>{const r=b.parseInline(n,t[1],e),i=t.slice(2),a=b.defaultRules.nptable.parse(i,n,e);return{title:r,table:a}}},widget:{order:b.defaultRules.link.order-.75,match:b.inlineRegex(er),parse:(t,n,e)=>({id:t[1],widgetType:t[2]})},blockMath:{order:b.defaultRules.codeBlock.order+.5,match:tr,parse:(t,n,e)=>({content:t[1]})},math:{order:b.defaultRules.link.order-.25,match:nr,parse:(t,n,e)=>({content:t[1]})},unescapedDollar:{order:b.defaultRules.link.order-.24,match:b.inlineRegex(/^(?!\\)\$/),parse:(t,n,e)=>({})},fence:{...b.defaultRules.fence,parse:(t,n,e)=>{const r=b.defaultRules.fence.parse(t,n,e);return r.lang==="alt"?{type:"codeBlock",lang:"alt",content:n(r.content+`

`,e)}:r}},blockQuote:{...b.defaultRules.blockQuote,match:b.blockRegex(/^ *>[^\n]+(\n( *>)?[^\n]+)*\n{2,}/)},lint:{order:1e3,match:t=>null,parse:(t,n,e)=>({})}};b.parserFor(T);const J={...T,columns:{...T.columns,react:(t,n,e)=>p.jsxs("div",{className:"perseus-two-columns",children:[p.jsx("div",{className:"perseus-column",children:p.jsx("div",{className:"perseus-column-content",children:n(t.col1,e)})}),p.jsx("div",{className:"perseus-column",children:p.jsx("div",{className:"perseus-column-content",children:n(t.col2,e)})})]},e.key)},crowdinId:{...T.crowdinId,react:(t,n,e)=>t.id},table:{...T.table,react:function(t,n,e){const r=b.defaultRules.table.react(t,n,e);return e.isMobile?Y.cloneElement(r,{tabIndex:0}):r}},titledTable:{...T.titledTable,react:(t,n,e)=>{var i;let r;if(!t.table)r="//invalid table//";else if(t.table.type==="lint")((i=t.table.content)==null?void 0:i.type)==="table"?r=J.lint.react({...t.table,content:{...t,table:t.table.content}},n,{...e,unwrapTitledTableContents:!0}):r=J.lint.react(t.table,n,e);else{const a=b.defaultRules.table.react(t.table,n,e),u=p.jsx("caption",{className:"perseus-table-title",children:n(t.title,e)},"caption");r=Y.cloneElement(a,null,[u,...a.props.children])}return e.unwrapTitledTableContents?r:p.jsx("div",{className:"perseus-titled-table",children:r},e.key)}},widget:{...T.widget,react:(t,n,e)=>p.jsx("em",{children:`[Widget: ${t.id}]`},e.key)},blockMath:{...T.blockMath,react:(t,n,e)=>{const{TeX:r}=Q();return p.jsx(r,{children:t.content},e.key)}},math:{...T.math,react:(t,n,e)=>{const{TeX:r}=Q();return p.jsx(r,{children:t.content},e.key)}},unescapedDollar:{...T.unescapedDollar,react:(t,n,e)=>"$"},link:{...T.link,react:function(t,n,e){const r=b.defaultRules.link.react(t,n,e),i=r.props.href;let a=null;(i?i.match(/https?:\/\/[^/]*khanacademy.org|^\//):!1)||(a="noopener noreferrer");const s={...r.props,target:"_blank",href:i,rel:a};return e.baseElements&&e.baseElements.Link?e.baseElements.Link(s):Y.cloneElement(r,s)}},codeBlock:{...T.codeBlock,react:(t,n,e)=>t.lang==="alt"?p.jsx("div",{className:"perseus-markdown-alt perseus-sr-only",children:n(t.content,e)},e.key):b.defaultRules.codeBlock.react(t,n,e)},lint:{...T.lint,react:(t,n,e)=>p.jsx(kn,{message:t.message,ruleName:t.ruleName,inline:ar(t.content),blockHighlight:t.blockHighlight,insideTable:t.insideTable,severity:t.severity,children:n(t.content,e)})}};function ar(t){return!!(t&&t.type&&sr.hasOwnProperty(t.type))}const sr={text:!0,math:!0,unescapedDollar:!0,link:!0,img:!0,strong:!0,u:!0,em:!0,del:!0,code:!0},Ze=b.parserFor(J),en=(t,n)=>{const e=t+`

`;return Ze(e,{...n,inline:!1})},ur=(t,n)=>Ze(t,{...n,inline:!0}),O=(t,n)=>{y.isArray(t)?y.each(t,e=>O(e,n)):y.isObject(t)&&(n(t),t.type==="table"?(O(t.header,n),O(t.cells,n)):t.type==="list"?O(t.items,n):t.type==="titledTable"?O(t.table,n):t.type==="columns"?(O(t.col1,n),O(t.col2,n)):y.isArray(t.content)&&O(t.content,n))},Pe=t=>{if(y.isArray(t))return y.flatten(y.map(t,Pe));if(t.content&&y.isString(t.content))return t.type.toLowerCase().indexOf("code")!==-1?["",t.content,""]:[t.content.replace(/\s+/g," ")];const n=y.chain(t).values().flatten().filter(r=>r!=null&&y.has(r,"type")).value();if(!n.length)return[];const e=Pe(n);if(t.type==="paragraph"&&e.length){e[0]=e[0].replace(/^\s+/,"");const r=e.length-1;e[r]=e[r].replace(/\s+$/,"")}return e},or=t=>{const n=en(t);return Pe(n).join("").length},D={characterCount:or,traverseContent:O,parse:en,parseInline:ur,reactFor:b.reactFor,ruleOutput:b.ruleOutput(J,"react"),basicOutput:b.reactFor(b.ruleOutput(J,"react")),sanitizeUrl:b.sanitizeUrl};class nn extends Y.Component{render(){const n=this.props.className?"paragraph "+this.props.className:"paragraph";return p.jsx("div",{className:this.props.inline?this.props.className??void 0:n,"data-perseus-component-index":this.props.translationIndex,"data-perseus-paragraph-index":this.props.paragraphIndex,children:this.props.children})}}nn.__docgenInfo={description:"",methods:[],displayName:"QuestionParagraph",props:{className:{required:!1,tsType:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]},description:""},translationIndex:{required:!0,tsType:{name:"number"},description:""},paragraphIndex:{required:!1,tsType:{name:"number"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},inline:{required:!1,tsType:{name:"boolean"},description:""}}};const lr=1e3;class gr{constructor(){l(this,"previousContent",null);l(this,"runLinter",sn((n,e)=>{if(!(typeof KA>"u")&&n!==this.previousContent){if(this.previousContent=n,n===""){e([]);return}fetch("/api/internal/translations/lint_poentry?preview=1&lang=en",{headers:{"Content-Type":"application/json"},body:JSON.stringify({msgid:n,msgstr:n,format:"perseus_text",filename:""}),method:"POST"}).then(r=>r.status>=400?{status:"error",message:"Could not run i18n linter."}:r.json(),r=>({status:"error",message:"Could not run i18n linter."})).then(r=>{r.status==="error"?e(["Some part of this text makes it untranslatable. The specific message from the i18n linter was: "+r.message.replace(/\n/g," ")]):e([])})}},lr))}applyLintErrors(n,e){if(e.length){const r=e.join(`

`);n.unshift({content:{type:"text",content:""},insideTable:!1,message:r,ruleName:"legacy-error",severity:d.Severity.ERROR,type:"lint"})}}}const dr=t=>t.replace(/\{align[*]?\}/g,"{aligned}").replace(/[\u00a0]/g," "),{interactiveSizes:ae}=qn,mr=xn,pr=Pn,W={SMALL:"small",MEDIUM:"medium",LARGE:"large"},cr=t=>t?t<=mr?W.SMALL:t<=pr?W.MEDIUM:W.LARGE:W.MEDIUM,zr=t=>t===W.SMALL?[ae.defaultBoxSizeSmall,ae.defaultBoxSizeSmall]:[ae.defaultBoxSize,ae.defaultBoxSize],yr="",hr=!1,C=new Ge("Perseus widget registry"),ge=new Ge("Perseus widget editor registry"),_e=t=>t,tn=(t,n)=>{C.set(t,n)},Qr=t=>{t.forEach(n=>{tn(n.name,n)})},F=(t,n)=>{const e=C.get(n);if(!e){const r=`Failed to replace ${t} with ${n}`;throw new j(r,E.Internal)}tn(t,e)},Br=()=>{F("transformer","deprecated-standin"),F("lights-puzzle","deprecated-standin"),F("reaction-diagram","deprecated-standin"),F("sequence","deprecated-standin"),F("simulator","deprecated-standin"),F("unit-input","deprecated-standin")},$r=t=>{t.forEach(n=>{if(!n.widgetName)throw new j(`Editor ${n.displayName} doesn't have a widgetName property`,E.Internal);ge.set(n.widgetName,n)})},G=(t,n)=>{const e=ge.get(n);if(!e&&$){const r=`Failed to replace editor ${t} with ${n}`;$.error(r,E.Internal);return}ge.set(t,e)},Jr=()=>{G("transformer","deprecated-standin"),G("lights-puzzle","deprecated-standin"),G("reaction-diagram","deprecated-standin"),G("sequence","deprecated-standin"),G("simulator","deprecated-standin"),G("unit-input","deprecated-standin")},br=t=>{const n=C.get(t);return n==null?null:n.getWidget?n.getWidget():n.widget},Zr=t=>ge.get(t)??null,wr=t=>{const n=C.get(t);if(n!=null)return n.version||{major:0,minor:0}},ei=()=>{const t={};return C.keys().forEach(n=>{t[n]=wr(n)}),t},ni=()=>C.entries().reduce((t,[n,e])=>(e.hidden||(t[n]=e),t),{}),ti=()=>C.keys(),vr=(t,n,e)=>{const r=t.type,i=C.get(r);if(i==null)return t;let a;return t.static?a=fr(r)||_e:a=i.transform||_e,a(t.options,n,e)},ri=t=>{const n=C.get(t);return n&&n.staticTransform!=null},fr=t=>{const n=C.get(t);return n&&n.staticTransform},kr=t=>{const n=C.get(t);return n&&n.tracking||yr},qr=t=>{const n=C.get(t);return n&&n.isLintable||hr};class Ne extends Y.Component{constructor(){super(...arguments);l(this,"widgetRef",Y.createRef());l(this,"state",{sizeClass:W.MEDIUM,widgetProps:this.props.initialProps});l(this,"getWidget",()=>this.widgetRef.current);l(this,"replaceWidgetProps",e=>{this.setState({widgetProps:e})})}componentDidMount(){if(this.state.widgetProps.apiOptions.isMobile){const e=ve.findDOMNode(this).offsetWidth;this.setState({sizeClass:cr(e)})}}UNSAFE_componentWillReceiveProps(e){if(this.props.type!==e.type)throw new Error("WidgetContainer can't change widget type; set a different key instead to recreate the container.")}shouldComponentUpdate(e,r){return this.props.shouldHighlight!==e.shouldHighlight||this.props.type!==e.type||this.state.widgetProps!==r.widgetProps||this.state.sizeClass!==r.sizeClass}render(){var k;let e=we({"perseus-widget-container":!0,"widget-highlight":this.props.shouldHighlight,"widget-nohighlight":!this.props.shouldHighlight,"perseus-widget__definition":this.props.type==="definition"});const r=this.props.type,i=navigator.userAgent,a=br(r);if(a==null)return console.warn(`Widget type '${r}' not found!`),p.jsx("div",{className:e});let u="null";r==="interactive-graph"&&(u=((k=this.state.widgetProps.graph)==null?void 0:k.type)??"null");let s=this.state.widgetProps.alignment;s==="default"&&(s=un(r)),e+=" widget-"+s;const o=this.state.widgetProps.apiOptions,g=this.state.widgetProps.static||o.readOnly,m={position:"relative",overflow:"visible"},c={width:"100%",height:"100%",position:"absolute",top:0,left:0,zIndex:3},w=qr(r)?this.props.linterContext:{...this.props.linterContext,highlightLint:!1};return p.jsx("div",{className:e,style:g?m:{},children:p.jsx(vn.Consumer,{children:({analytics:x})=>p.jsxs(X,{metadata:{widget_type:r,widget_id:this.props.id},onError:h=>{x.onAnalyticsEvent({type:"perseus:widget-rendering-error:ti",payload:{widgetSubType:u,widgetType:r,widgetId:this.props.id,message:h.message,userAgent:i}})},children:[p.jsx(a,{...this.state.widgetProps,linterContext:w,containerSizeClass:this.state.sizeClass,ref:this.widgetRef}),g&&p.jsx("div",{style:c})]})})})}}l(Ne,"defaultProps",{linterContext:We});Ne.__docgenInfo={description:"",methods:[{name:"getWidget",docblock:null,modifiers:[],params:[],returns:null},{name:"replaceWidgetProps",docblock:null,modifiers:[],params:[{name:"newWidgetProps",optional:!1,type:null}],returns:null}],displayName:"WidgetContainer",props:{shouldHighlight:{required:!0,tsType:{name:"boolean"},description:""},type:{required:!0,tsType:{name:"string"},description:""},id:{required:!0,tsType:{name:"string"},description:""},initialProps:{required:!0,tsType:{name:"intersection",raw:"RenderProps & UniversalWidgetProps<Rubric, TrackingExtraArgs>",elements:[{name:"any"},{name:"signature",type:"object",raw:`{
    reviewModeRubric?: ReviewModeRubric | null | undefined;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewMode: boolean;
    onChange: ChangeHandler;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"reviewModeRubric",value:{name:"union",raw:"ReviewModeRubric | null | undefined",elements:[{name:"RubricRegistry[RubricRegistry]",raw:"RubricRegistry[keyof RubricRegistry]"},{name:"null"},{name:"undefined"}],required:!1}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,elements:[{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
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
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`},{name:"signature",type:"object",raw:`{
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"isMobileApp",value:{name:"NonNullable",elements:[{name:'Readonly["isMobileApp"]',raw:'APIOptions["isMobileApp"]'}],raw:'NonNullable<APIOptions["isMobileApp"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
    }
>`,required:!0}},{key:"keypadElement",value:{name:"any",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},{key:"onFocus",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"onBlur",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"findWidgets",value:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
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
        // widgets/number-line.tsx
        divisionRange?: number[];
        // widgets/number-line.ts
        numDivisions?: number;
        // widgets/number-line.ts
        numLinePosition?: number;
        // widgets/number-line.ts
        rel?: Relationship;
        // widgets/label-image.tsx
        markers?: Array<LabelImageMarkerPublicData | PerseusLabelImageMarker>;
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
    // widgets/number-line.tsx
    divisionRange?: number[];
    // widgets/number-line.ts
    numDivisions?: number;
    // widgets/number-line.ts
    numLinePosition?: number;
    // widgets/number-line.ts
    rel?: Relationship;
    // widgets/label-image.tsx
    markers?: Array<LabelImageMarkerPublicData | PerseusLabelImageMarker>;
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}}]}}],required:!1}},{key:"divisionRange",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}},{key:"numDivisions",value:{name:"number",required:!1}},{key:"numLinePosition",value:{name:"number",required:!1}},{key:"rel",value:{name:"union",raw:'"eq" | "lt" | "gt" | "le" | "ge"',elements:[{name:"literal",value:'"eq"'},{name:"literal",value:'"lt"'},{name:"literal",value:'"gt"'},{name:"literal",value:'"le"'},{name:"literal",value:'"ge"'}],required:!1}},{key:"markers",value:{name:"Array",elements:[{name:"union",raw:"LabelImageMarkerPublicData | PerseusLabelImageMarker",elements:[{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
    // A list of correct answers for this marker.  Often only one but can have multiple
    answers: string[];
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // X Coordiate location of the marker on the image
    x: number;
    // Y Coordinate location of the marker on the image
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},{name:"union",raw:'"x" | "y" | "label"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'},{name:"literal",value:'"label"'}]}],raw:`Pick<
    PerseusLabelImageMarker,
    "x" | "y" | "label"
>`},{name:"signature",type:"object",raw:`{
    // A list of correct answers for this marker.  Often only one but can have multiple
    answers: string[];
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // X Coordiate location of the marker on the image
    x: number;
    // Y Coordinate location of the marker on the image
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}}]}],raw:"Array<LabelImageMarkerPublicData | PerseusLabelImageMarker>",required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"containerSizeClass",value:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]",required:!0}}]}}]},description:""},linterContext:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:"",defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1}}}};const xr=/\S/,Pr=/(web\+graphie|https):\/\/[^\s]*/,K=()=>{},De=["content","problemNum","widgets"],se=t=>"container:"+t,Rr=function(t,n){return t===null||n===null?t===n:y.every(t,(e,r)=>{if(n!=null)return y.isEqual(e,n[r])})};class Re extends Y.Component{constructor(e){super(e);l(this,"_currentFocus");l(this,"_foundTextNodes");l(this,"_interactionTrackers");l(this,"_isMounted");l(this,"_isTwoColumn");l(this,"_translationLinter");l(this,"_widgetContainers",new Map);l(this,"lastRenderedMarkdown");l(this,"reuseMarkdown");l(this,"translationIndex");l(this,"widgetIds");l(this,"getApiOptions",()=>({...fn.defaults,...this.props.apiOptions}));l(this,"_getInitialWidgetState",e=>{const r=on(e.widgets);return{widgetInfo:r,widgetProps:this._getAllWidgetsStartProps(r,e)}});l(this,"_getAllWidgetsStartProps",(e,r)=>{var o;const{apiOptions:i,problemNum:a}=r,u={},{strings:s}=this.props;return cn(e).forEach(([g,m])=>{u[g]=vr(m,s,a)}),(o=i==null?void 0:i.onWidgetStartProps)==null||o.call(i,u),u});l(this,"_getDefaultWidgetInfo",e=>{const r=ln.rTypeFromWidgetId.exec(e);return r==null?{}:{type:r[1],graded:!0,options:{}}});l(this,"_getWidgetInfo",e=>this.state.widgetInfo[e]||this._getDefaultWidgetInfo(e));l(this,"renderWidget",(e,r,i)=>{const a=this.state.widgetInfo[r];if(a&&a.alignment==="full-width"&&(i.foundFullWidth=!0),a){const u=a&&a.type||e,s=y.contains(this.props.highlightedWidgets,r);return p.jsx(Ne,{id:r,ref:o=>{const g=se(r);o!=null?this._widgetContainers.set(g,o):this._widgetContainers.delete(g)},type:u,initialProps:this.getWidgetProps(r),shouldHighlight:s,linterContext:kt(this.props.linterContext,"widget")},se(r))}return null});l(this,"getSerializedState",e=>Ee(e||this.state.widgetProps,(r,i)=>{const a=this.getWidgetInstance(i);return a&&a.getSerializedState?a.getSerializedState():r}));l(this,"restoreSerializedState",(e,r)=>{const i=y.keys(e),a=y.keys(this.state.widgetProps);if(i.length!==a.length||y.intersection(i,a).length!==i.length){$.error("Refusing to restore bad serialized state:",E.Internal,{loggedMetadata:{serializedState:JSON.stringify(e),currentProps:JSON.stringify(this.state.widgetProps)}});return}let u=1;const s=()=>{--u,r&&u===0&&r()};this.setState({widgetProps:Ee(e,(o,g)=>{const m=this.getWidgetInstance(g);if(m&&m.restoreSerializedState){++u;const c=m.restoreSerializedState(o,s);return y.extend({},this.state.widgetProps[g],c)}return o})},()=>{setTimeout(s,0)})});l(this,"showRationalesForCurrentlySelectedChoices",()=>{Object.keys(this.props.widgets).forEach(e=>{const r=this.getWidgetInstance(e);r&&r.showRationalesForCurrentlySelectedChoices&&r.showRationalesForCurrentlySelectedChoices(this._getWidgetInfo(e).options)})});l(this,"deselectIncorrectSelectedChoices",()=>{Object.keys(this.props.widgets).forEach(e=>{const r=this.getWidgetInstance(e);r&&r.deselectIncorrectSelectedChoices&&r.deselectIncorrectSelectedChoices()})});l(this,"findInternalWidgets",e=>{let r;if(typeof e=="string")if(e.indexOf(" ")!==-1){const a=e;r=(u,s,o)=>u===a}else{const a=e;r=(u,s,o)=>s.type===a}else r=e;return this.widgetIds.filter(a=>{const u=this._getWidgetInfo(a),s=this.getWidgetInstance(a);return r(a,u,s)}).map(this.getWidgetInstance)});l(this,"findWidgets",e=>[...this.findInternalWidgets(e),...this.props.findExternalWidgets(e)]);l(this,"getWidgetInstance",e=>{const r=this._widgetContainers.get(se(e));return r?r.getWidget():null});l(this,"_onWidgetFocus",(e,r=[])=>{if(!y.isArray(r))throw new j("widget props.onFocus focusPath must be an Array, but was"+JSON.stringify(r),E.Internal);this._setCurrentFocus([e].concat(r))});l(this,"_onWidgetBlur",(e,r)=>{const i=this._currentFocus,a=[e].concat(r);y.isEqual(a,i)&&y.defer(()=>{y.isEqual(this._currentFocus,i)&&this._setCurrentFocus(null)})});l(this,"getContent",(e,r)=>r.jiptContent||e.content);l(this,"shouldRenderJiptPlaceholder",(e,r)=>Q().JIPT.useJIPT&&r.jiptContent==null&&e.content.indexOf("crwdns")!==-1);l(this,"replaceJiptContent",(e,r)=>{if(r==null)this.setState({jiptContent:e});else{/^\s*(`{3,}|~{3,})\s*(\S+)?\s*\n([\s\S]+?)\s*\1\s*$/.test(e)||(/\S\n\s*\n\S/.test(e)?e="$\\large{\\red{\\text{Please translate each paragraph to a single paragraph.}}}$":/^\s*$/.test(e)&&(e="$\\large{\\red{\\text{Translated paragraph is currently empty}}}$"));const a=this.getContent(this.props,this.state),u=Me.parseToArray(a);u[r]=e,this.setState({jiptContent:Me.joinFromArray(u)})}});l(this,"outputMarkdown",(e,r)=>{if(y.isArray(e)){const u=r.key,s=[];let o=!1;for(let g=0;g<e.length;g++){r.key=g,r.paragraphIndex=g;const m=this.outputMarkdown(e[g],r),c=typeof m=="string";typeof m=="string"&&o?s[s.length-1]+=m:s.push(m),o=c}return r.key=u,s}this._foundTextNodes=!1,r.foundFullWidth=!1;const i=this.outputNested(e,r);let a;return this.translationIndex!=null?a=null:a=we({"perseus-paragraph-centered":!this._foundTextNodes,"perseus-paragraph-full-width":r.foundFullWidth&&e.content.length===1}),p.jsx(nn,{className:a,translationIndex:this.translationIndex,paragraphIndex:r.paragraphIndex,inline:this.props.inline,children:p.jsx(X,{children:i})},r.key)});l(this,"outputNested",(e,r)=>{if(y.isArray(e)){const i=r.key,a=[];let u=!1;for(let s=0;s<e.length;s++){r.key=s;const o=this.outputNested(e[s],r),g=typeof o=="string";typeof o=="string"&&u?a[a.length-1]+=o:a.push(o),u=g}return r.key=i,a}return this.outputNode(e,this.outputNested,r)});l(this,"outputNode",(e,r,i)=>{const a=this.getApiOptions(),u=a.imagePlaceholder;if(e.type==="widget"){const s=a.widgetPlaceholder;return s||(this._foundTextNodes=!0,this.widgetIds.includes(e.id)?p.jsx("span",{className:"renderer-widget-error",children:["Widget [[","☃"," ",e.id,"]] already exists."].join("")},i.key):(this.widgetIds.push(e.id),this.renderWidget(e.widgetType,e.id,i)))}if(e.type==="blockMath"){const s=dr(e.content),o={overflowX:"auto",overflowY:"hidden",paddingTop:10,paddingBottom:10,marginTop:-10,marginBottom:-10};if(a.isMobile){const m={marginLeft:-16,marginRight:-16},c={paddingLeft:16,paddingRight:16},w={...o,...Fe.mobileZoomableParentFix};return p.jsx("div",{className:"perseus-block-math",style:m,children:p.jsx(X,{children:p.jsx("div",{className:"perseus-block-math-inner",style:{...w,...c},children:p.jsx(yn,{children:s})})})},i.key)}return p.jsx("div",{className:"perseus-block-math",children:p.jsx(X,{children:p.jsx("div",{className:"perseus-block-math-inner",style:o,children:p.jsx(ce.Consumer,{children:({setAssetStatus:g})=>p.jsx(Ce,{setAssetStatus:g,children:s})})})})},i.key)}if(e.type==="math"){const s=e.content;return p.jsx("span",{style:{whiteSpace:"nowrap"},children:p.jsxs(X,{children:[p.jsx("span",{}),p.jsx(ce.Consumer,{children:({setAssetStatus:o})=>p.jsx(Ce,{onRender:this.props.onRender,setAssetStatus:o,children:s})}),p.jsx("span",{})]})},i.key)}if(e.type==="image"){if(u)return u;const s=y.has(this.props.images,e.target)?this.props.images[e.target]:null,o=!i.inTable;return p.jsx(X,{children:p.jsx(ce.Consumer,{children:({setAssetStatus:g})=>p.jsx(bn,{setAssetStatus:g,src:D.sanitizeUrl(e.target),alt:e.alt,title:e.title,responsive:o,onUpdate:this.props.onRender,zoomToFullSizeOnMobile:a.isMobile&&a.isArticle,...s})})},i.key)}if(e.type==="columns")return this._isTwoColumn=!0,p.jsx(X,{children:D.ruleOutput(e,r,i)},i.key);if(e.type==="text")return xr.test(e.content)&&(this._foundTextNodes=!0),u&&Pr.test(e.content)?u:e.content;if(e.type==="table"||e.type==="titledTable"){const s=D.ruleOutput(e,r,{...i,isMobile:a.isMobile,inTable:!0});if(!a.isMobile)return s;const o={marginLeft:-16,marginRight:-16},m={...{paddingLeft:0,paddingRight:0},...Fe.mobileZoomableParentFix},c=p.jsx("div",{style:{...m,overflowX:"auto"},children:p.jsx(X,{children:p.jsx(wn,{animateHeight:!0,children:s})})});return p.jsx("div",{style:o,children:c})}return p.jsx(X,{children:D.ruleOutput(e,r,i)},i.key)});l(this,"handleRender",e=>{const r=this.props.onRender,i=e.onRender;if(r!==K||i!==K){const a=pn(ve.findDOMNode(this)).find("img");i!==K&&a.off("load",i),r!==K&&a.on("load",r)}r()});l(this,"_setCurrentFocus",e=>{const r=this.getApiOptions();if(!Rr(e,this._currentFocus)){const i=this._currentFocus;i&&this.blurPath(i),this._currentFocus=e,r.onFocusChange(this._currentFocus,i)}});l(this,"focus",()=>{var i;let e,r;for(let a=0;a<this.widgetIds.length;a++){const u=this.widgetIds[a],s=this.getWidgetInstance(u),o=(i=s==null?void 0:s.focus)==null?void 0:i.call(s);if(o){e=u,r=o;break}}if(e){let a;return typeof r=="object"?(a=[e].concat(r.path||[]),$.error("Renderer received a focus result of type 'object' instead of the expected type 'boolean'",E.Internal,{loggedMetadata:{focusResult:JSON.stringify(r),currentProps:JSON.stringify(this.state.widgetProps)}})):a=[e],this._setCurrentFocus(a),!0}});l(this,"getDOMNodeForPath",e=>{const r=y.first(e),i=y.rest(e),a=this.getWidgetInstance(r);if(a!=null&&a.getDOMNodeForPath)return a.getDOMNodeForPath(i);if(i.length===0)return ve.findDOMNode(a)});l(this,"getInputPaths",()=>{const e=[];return this.widgetIds.forEach(r=>{const i=this.getWidgetInstance(r);i&&i.getInputPaths&&i.getInputPaths().forEach(u=>{const s=[r].concat(u);e.push(s)})}),e});l(this,"focusPath",e=>{var u;if(y.isEqual(this._currentFocus,e))return;this._currentFocus&&this.blurPath(this._currentFocus);const r=y.first(e),i=y.rest(e),a=this.getWidgetInstance(r);(u=a==null?void 0:a.focusInputPath)==null||u.call(a,i)});l(this,"blurPath",e=>{var u;if(!y.isEqual(this._currentFocus,e))return;const r=y.first(e),i=y.rest(e);if(this.getWidgetInstance(r)){const s=this.getWidgetInstance(r);(u=s==null?void 0:s.blurInputPath)==null||u.call(s,i)}});l(this,"blur",()=>{this._currentFocus&&this.blurPath(this._currentFocus)});l(this,"serialize",()=>{const e={};return y.each(this.state.widgetInfo,function(r,i){const u=this.getWidgetInstance(i).serialize();y.isEmpty(u)||(e[i]=u)},this),e});l(this,"_setWidgetProps",(e,r,i,a)=>{this.setState(u=>{const s={...u.widgetProps,[e]:{...u.widgetProps[e],...r}},o=a?u.lastUsedWidgetId:e;return a||this.props.onSerializedStateUpdated(this.getSerializedState(s)),{lastUsedWidgetId:o,widgetProps:s}},()=>{setTimeout(()=>{const u=i&&i();a||this.props.onInteractWithWidget(e),u!==!1&&this._setCurrentFocus([e])},0)})});l(this,"setInputValue",(e,r,i)=>{var o;const a=y.first(e),u=y.rest(e),s=this.getWidgetInstance(a);(o=s==null?void 0:s.setInputValue)==null||o.call(s,u,r,i)});l(this,"getWidgetIds",()=>this.widgetIds);l(this,"handletranslationLintErrors",e=>{this._isMounted&&this.setState({translationLintErrors:e})});this._translationLinter=new gr,this.state={jiptContent:null,translationLintErrors:[],lastUsedWidgetId:null,...this._getInitialWidgetState(e)}}componentDidMount(){this._isMounted=!0,this.handleRender({}),this._currentFocus=null,this.props.serializedState&&this.restoreSerializedState(this.props.serializedState),this.props.linterContext.highlightLint&&this._translationLinter.runLinter(this.props.content,this.handletranslationLintErrors)}UNSAFE_componentWillReceiveProps(e){y.isEqual(y.pick(this.props,De),y.pick(e,De))||this.setState(this._getInitialWidgetState(e))}shouldComponentUpdate(e,r){if(this.props.alwaysUpdate)return!0;const i=!y.isEqual(this.state,r);return!y.isEqual(this.props,e)||i}UNSAFE_componentWillUpdate(e,r){const i=this.shouldRenderJiptPlaceholder(this.props,this.state),a=this.shouldRenderJiptPlaceholder(e,r),u=this.getContent(this.props,this.state),s=this.getContent(e,r),o=this.props.highlightedWidgets,g=e.highlightedWidgets;this.reuseMarkdown=!i&&!a&&u===s&&y.isEqual(this.state.translationLintErrors,r.translationLintErrors)&&(!this.props.linterContext.highlightLint||y.isEqual(this.props.widgets,e.widgets))&&this.props.linterContext.highlightLint===e.linterContext.highlightLint&&o===g}componentDidUpdate(e,r){this.handleRender(e),this.widgetIds.forEach(i=>{const a=this._widgetContainers.get(se(i));a==null||a.replaceWidgetProps(this.getWidgetProps(i))}),this.props.serializedState&&!y.isEqual(this.props.serializedState,this.getSerializedState())&&this.restoreSerializedState(this.props.serializedState),this.props.linterContext.highlightLint&&this._translationLinter.runLinter(this.props.content,this.handletranslationLintErrors)}componentWillUnmount(){this.widgetIds=[],this.translationIndex!=null&&Q().rendererTranslationComponents.removeComponentAtIndex(this.translationIndex),this._isMounted=!1}getWidgetProps(e){const r=this.getApiOptions(),i=this.state.widgetProps[e]||{},a=this.state.widgetInfo[e],u=this.props.reviewMode&&a?a.options:null;this._interactionTrackers||(this._interactionTrackers={});let s=this._interactionTrackers[e];return s||(s=this._interactionTrackers[e]=new Pt(r.trackInteraction,a&&a.type,e,kr(a&&a.type))),{...i,widgetId:e,alignment:a&&a.alignment,static:a==null?void 0:a.static,problemNum:this.props.problemNum,apiOptions:this.getApiOptions(),keypadElement:this.props.keypadElement,questionCompleted:this.props.questionCompleted,showSolutions:this.props.showSolutions,onFocus:y.partial(this._onWidgetFocus,e),onBlur:y.partial(this._onWidgetBlur,e),findWidgets:this.findWidgets,reviewModeRubric:u,reviewMode:this.props.reviewMode,onChange:(o,g,m=!1)=>{this._setWidgetProps(e,o,g,m)},trackInteraction:s.track,isLastUsedWidget:e===this.state.lastUsedWidgetId}}emptyWidgets(){return gn(this.state.widgetInfo,this.widgetIds,this.getUserInputMap(),this.context.locale)}getUserInput(){return this.widgetIds.map(e=>{const r=this.getWidgetInstance(e);if(r&&r.getUserInput)return r.getUserInput()})}getUserInputMap(){const e={};return this.widgetIds.forEach(r=>{const i=this.getWidgetInstance(r);i!=null&&i.getUserInputMap?e[r]=i.getUserInputMap():i!=null&&i.getUserInput&&(e[r]=i.getUserInput())}),e}getPromptJSON(){const{content:e}=this.props,r={};return this.widgetIds.forEach(i=>{var u;const a=this.getWidgetInstance(i);r[i]=((u=a==null?void 0:a.getPromptJSON)==null?void 0:u.call(a))||{}}),{content:e,widgets:r}}score(){const e=dn(this.state.widgetInfo,this.widgetIds,this.getUserInputMap(),this.context.locale);return mn(e)}render(){const e=this.getApiOptions();if(this.reuseMarkdown)return this.lastRenderedMarkdown;const r=this.getContent(this.props,this.state);if(this.widgetIds=[],this.shouldRenderJiptPlaceholder(this.props,this.state)&&(this.translationIndex||(this.translationIndex=Q().rendererTranslationComponents.addComponent(this)),!e.isArticle))return p.jsx(fe,{children:p.jsx("div",{"data-perseus-component-index":this.translationIndex,children:r})});this._isTwoColumn=!1;const i=this.props.inline?D.parseInline(r,{isJipt:this.translationIndex!=null}):D.parse(r,{isJipt:this.translationIndex!=null});if(this.props.linterContext.highlightLint){const s={content:this.props.content,widgets:this.props.widgets,...this.props.linterContext};ft(i,s),this._translationLinter.applyLintErrors(i,[...this.state.translationLintErrors,...this.props.legacyPerseusLint||[]])}const a=this.outputMarkdown(i,{baseElements:e.baseElements}),u=we({[ye.RENDERER]:!0,[ye.RESPONSIVE_RENDERER]:!0,[ye.TWO_COLUMN_RENDERER]:this._isTwoColumn});return this.lastRenderedMarkdown=p.jsx(fe,{children:p.jsx("div",{className:u,children:a})}),this.lastRenderedMarkdown}}l(Re,"contextType",hn),l(Re,"defaultProps",{content:"",widgets:{},images:{},highlightedWidgets:[],questionCompleted:!1,showSolutions:"none",onRender:K,onInteractWithWidget:function(){},findExternalWidgets:()=>[],alwaysUpdate:!1,reviewMode:!1,serializedState:null,onSerializedStateUpdated:()=>{},linterContext:We});const Fe={mobileZoomableParentFix:{transform:"translate3d(0,0,0)"}};Re.__docgenInfo={description:"",methods:[{name:"getApiOptions",docblock:null,modifiers:[],params:[],returns:null},{name:"_getInitialWidgetState",docblock:null,modifiers:[],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`Partial<React.ContextType<typeof DependenciesContext>> & {
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,elements:[{name:"Partial",elements:[{name:"ReactContextType",raw:"React.ContextType<typeof DependenciesContext>",elements:[{name:"DependenciesContext"}]}],raw:"Partial<React.ContextType<typeof DependenciesContext>>"},{name:"signature",type:"object",raw:`{
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`,required:!1}},{key:"alwaysUpdate",value:{name:"boolean",required:!1}},{key:"findExternalWidgets",value:{name:"any",required:!0}},{key:"highlightedWidgets",value:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",required:!1}},{key:"images",value:{name:"signature",raw:'PerseusRenderer["images"]',required:!0}},{key:"keypadElement",value:{name:"union",raw:"KeypadAPI | null",elements:[{name:"KeypadAPI"},{name:"null"}],required:!1}},{key:"onInteractWithWidget",value:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}},required:!0}},{key:"onRender",value:{name:"signature",type:"function",raw:"(node?: any) => void",signature:{arguments:[{type:{name:"any"},name:"node"}],return:{name:"void"}},required:!0}},{key:"problemNum",value:{name:"number",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1}},{key:"reviewMode",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"showSolutions",value:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}],required:!1},description:'If set to "all", all rationales or solutions will be shown. If set to\n"selected", soltions will only be shown for selected choices. If set to\n"none", solutions will not be shown-- equivalent to `undefined`.'},{key:"content",value:{name:"string",raw:'PerseusRenderer["content"]',required:!0}},{key:"serializedState",value:{name:"any",required:!1}},{key:"onSerializedStateUpdated",value:{name:"signature",type:"function",raw:`(serializedState: {
    [key: string]: any;
}) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    [key: string]: any;
}`,signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"serializedState"}],return:{name:"unknown"}},required:!0},description:`Callback which is called when serialized state changes with the new
serialized state.`},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0},description:`If linterContext.highlightLint is true, then content will be passed to
the linter and any warnings will be highlighted in the rendered output.`},{key:"legacyPerseusLint",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"widgets",value:{name:"signature",raw:'PerseusRenderer["widgets"]',required:!0}},{key:"inline",value:{name:"boolean",required:!1},description:"Skip adding paragraph class"},{key:"strings",value:{name:"signature",type:"object",raw:`{
    // \`num\` is a special variable name that is used to determine the plurality
    // of the translated string.
    characterCount: ({used, num}: {used: number; num: number}) => string;
    closeKeypad: string;
    openKeypad: string;
    mathInputBox: string;
    removeHighlight: string;
    addHighlight: string;
    hintPos: ({pos}: {pos: number}) => string;
    errorRendering: ({error}: {error: string}) => string;
    APPROXIMATED_PI_ERROR: string;
    EXTRA_SYMBOLS_ERROR: string;
    NEEDS_TO_BE_SIMPLFIED_ERROR: string;
    MISSING_PERCENT_ERROR: string;
    MULTIPLICATION_SIGN_ERROR: string;
    WRONG_CASE_ERROR: string;
    WRONG_LETTER_ERROR: string;
    invalidSelection: string;
    ERROR_TITLE: string;
    ERROR_MESSAGE: string;
    USER_INPUT_EMPTY: string;
    USER_INPUT_TOO_LONG: string;
    hints: string;
    getAnotherHint: string;
    deprecatedStandin: string;
    keepTrying: string;
    tryAgain: string;
    check: string;
    correctExcited: string;
    nextQuestion: string;
    skipToTitle: ({title}: {title: string}) => string;
    current: string;
    correct: string;
    correctSelected: string;
    incorrect: string;
    incorrectSelected: string;
    hideExplanation: string;
    explain: string;
    INVALID_MESSAGE_PREFIX: string;
    DEFAULT_INVALID_MESSAGE_1: string;
    DEFAULT_INVALID_MESSAGE_2: string;
    integerExample: string;
    properExample: string;
    simplifiedProperExample: string;
    improperExample: string;
    simplifiedImproperExample: string;
    mixedExample: string;
    decimalExample: string;
    percentExample: string;
    piExample: string;
    yourAnswer: string;
    yourAnswerLabel: string;
    addPoints: string;
    addVertices: string;
    tapMultiple: string;
    tapSingle: string;
    clickMultiple: string;
    clickSingle: string;
    choices: string;
    answers: ({num}: {num: number}) => string;
    hideAnswersToggleLabel: string;
    moves: ({num}: {num: number}) => string;
    clickTiles: string;
    turnOffLights: string;
    fillAllCells: string;
    molecularDrawing: ({content}: {content: string}) => string;
    switchDirection: string;
    circleOpen: string;
    circleFilled: string;
    numDivisions: string;
    divisions: ({divRangeString}: {divRangeString: string}) => string;
    lineRange: ({lineRange}: {lineRange: string}) => string;
    lineNumber: ({lineNumber}: {lineNumber: string}) => string;
    symbolPassage: ({
        questionSymbol,
        questionNumber,
    }: {
        questionSymbol: string;
        questionNumber: string;
    }) => string;
    symbolQuestion: ({sentenceSymbol}: {sentenceSymbol: string}) => string;
    lineLabel: string;
    beginningPassage: string;
    beginningFootnotes: string;
    endPassage: string;
    questionMarker: ({number}: {number: string}) => string;
    circleMarker: ({number}: {number: string}) => string;
    sentenceMarker: ({number}: {number: string}) => string;
    dragHandles: string;
    tapAddPoints: string;
    false: string;
    true: string;
    no: string;
    yes: string;
    chooseCorrectNum: string;
    notNoneOfTheAbove: string;
    noneOfTheAbove: string;
    chooseNumAnswers: ({numCorrect}: {numCorrect: string}) => string;
    chooseAllAnswers: string;
    chooseOneAnswer: string;
    choiceCheckedCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
    scrollAnswers: string;
    scrollLeft: string;
    scrollRight: string;
    rightArrow: string;
    dontUnderstandUnits: string;
    checkSigFigs: string;
    answerNumericallyIncorrect: string;
    checkUnits: string;
    dontUnderstand: string;
    loading: string;
    videoTranscript: string;
    somethingWrong: string;
    videoWrapper: string;
    mathInputTitle: string;
    mathInputDescription: string;
    sin: string;
    cos: string;
    tan: string;
    simulationLoadFail: string;
    simulationLocaleWarning: string;
    selectAnAnswer: string;
    srGraphInstructions: string;
    srUnlimitedGraphInstructions: string;
    addPoint: string;
    removePoint: string;
    graphKeyboardPrompt: string;
    closePolygon: string;
    openPolygon: string;
    srPointAtCoordinates: ({
        num,
        x,
        y,
    }: {
        num: number;
        x: string;
        y: string;
    }) => string;
    srInteractiveElements: ({elements}: {elements: string}) => string;
    srNoInteractiveElements: string;
    srCircleGraph: string;
    srCircleShape: ({
        centerX,
        centerY,
    }: {
        centerX: string;
        centerY: string;
    }) => string;
    srCircleRadiusPointRight: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadiusPointLeft: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadius: ({radius}: {radius: number}) => string;
    srCircleOuterPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
        point4X,
        point4Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
        point4X: string;
        point4Y: string;
    }) => string;
    srLinearGraph: string;
    srLinearGraphPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearGraphSlopeIncreasing: string;
    srLinearGraphSlopeDecreasing: string;
    srLinearGraphSlopeHorizontal: string;
    srLinearGraphSlopeVertical: string;
    srLinearGraphXOnlyIntercept: ({xIntercept}: {xIntercept: string}) => string;
    srLinearGraphYOnlyIntercept: ({yIntercept}: {yIntercept: string}) => string;
    srLinearGraphBothIntercepts: ({
        xIntercept,
        yIntercept,
    }: {
        xIntercept: string;
        yIntercept: string;
    }) => string;
    srLinearGraphOriginIntercept: string;
    srLinearGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srAngleStartingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleEndingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleVertexWithAngleMeasure: ({
        x,
        y,
        angleMeasure,
    }: {
        x: string;
        y: string;
        angleMeasure: string;
    }) => string;
    srAngleGraphAriaLabel: string;
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        angleMeasure: string;
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srAngleInteractiveElements: ({
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srSingleSegmentGraphAriaLabel: string;
    srMultipleSegmentGraphAriaLabel: ({
        countOfSegments,
    }: {
        countOfSegments: number;
    }) => string;
    srMultipleSegmentIndividualLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        indexOfSegment,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        indexOfSegment: number;
    }) => string;
    srSingleSegmentLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srSegmentLength: ({length}: {length: string}) => string;
    srSingleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
    }) => string;
    srMultipleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
        indexOfSegment,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
        indexOfSegment: number;
    }) => string;
    srSegmentGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemGraph: string;
    srLinearSystemPoints: ({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemPoint({
        lineNumber,
        pointSequence,
        x,
        y,
    }: {
        lineNumber: number;
        pointSequence: number;
        x: string;
        y: string;
    }): string;
    srLinearSystemGrabHandle({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }): string;
    srLinearSystemIntersection({x, y}: {x: string; y: string}): string;
    srLinearSystemParallel: string;
    srRayGraph: string;
    srRayPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srRayEndpoint: ({x, y}: {x: string; y: string}) => string;
    srRayTerminalPoint: ({x, y}: {x: string; y: string}) => string;
    srRayGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srQuadraticGraph: string;
    srQuadraticFaceUp: string;
    srQuadraticFaceDown: string;
    srQuadraticGraphVertexOrigin: string;
    srQuadraticGraphVertexXAxis: string;
    srQuadraticGraphVertexYAxis: string;
    srQuadraticGraphVertexQuadrant: ({quadrant}: {quadrant: number}) => string;
    srQuadraticTwoXIntercepts: ({
        intercept1,
        intercept2,
    }: {
        intercept1: string;
        intercept2: string;
    }) => string;
    srQuadraticOneXIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticYIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticPointOrigin: ({pointNumber}: {pointNumber: number}) => string;
    srQuadraticPointAxis: ({
        pointNumber,
        x,
        y,
    }: {
        pointNumber: number;
        x: string;
        y: string;
    }) => string;
    srQuadraticPointQuadrant: ({
        pointNumber,
        x,
        y,
        quadrant,
    }: {
        pointNumber: number;
        x: string;
        y: string;
        quadrant: number;
    }) => string;
    srQuadraticInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
    }) => string;
    srPolygonGraph: string;
    srPolygonGraphCoordinatePlane: string;
    srPolygonGraphPointsNum: ({num}: {num: number}) => string;
    srPolygonGraphPointsOne: string;
    srPolygonElementsNum: ({num}: {num: number}) => string;
    srPolygonElementsOne: string;
    srPolygonPointAngleApprox: ({angle}: {angle: string}) => string;
    srPolygonPointAngle: ({angle}: {angle: number}) => string;
    srPolygonSideLength: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srPolygonSideLengthApprox: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srUnlimitedPolygonEmpty: string;
    srSinusoidGraph: string;
    srSinusoidRootPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMaxPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMinPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidFlatPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidDescription: ({
        minValue,
        maxValue,
        cycleStart,
        cycleEnd,
    }: {
        minValue: string;
        maxValue: string;
        cycleStart: string;
        cycleEnd: string;
    }) => string;
    srSinusoidInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
}`,signature:{properties:[{key:"characterCount",value:{name:"signature",type:"function",raw:"({used, num}: {used: number; num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{used: number; num: number}",signature:{properties:[{key:"used",value:{name:"number",required:!0}},{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"USER_INPUT_EMPTY",value:{name:"string",required:!0}},{key:"USER_INPUT_TOO_LONG",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"scrollAnswers",value:{name:"string",required:!0}},{key:"scrollLeft",value:{name:"string",required:!0}},{key:"scrollRight",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"srGraphInstructions",value:{name:"string",required:!0}},{key:"srUnlimitedGraphInstructions",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
    num,
    x,
    y,
}: {
    num: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    num: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"num",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srInteractiveElements",value:{name:"signature",type:"function",raw:"({elements}: {elements: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{elements: string}",signature:{properties:[{key:"elements",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srNoInteractiveElements",value:{name:"string",required:!0}},{key:"srCircleGraph",value:{name:"string",required:!0}},{key:"srCircleShape",value:{name:"signature",type:"function",raw:`({
    centerX,
    centerY,
}: {
    centerX: string;
    centerY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    centerX: string;
    centerY: string;
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointRight",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointLeft",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadius",value:{name:"signature",type:"function",raw:"({radius}: {radius: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{radius: number}",signature:{properties:[{key:"radius",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleOuterPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
    point4X,
    point4Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}},{key:"point4X",value:{name:"string",required:!0}},{key:"point4Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraph",value:{name:"string",required:!0}},{key:"srLinearGraphPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphSlopeIncreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeDecreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeHorizontal",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeVertical",value:{name:"string",required:!0}},{key:"srLinearGraphXOnlyIntercept",value:{name:"signature",type:"function",raw:"({xIntercept}: {xIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{xIntercept: string}",signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphYOnlyIntercept",value:{name:"signature",type:"function",raw:"({yIntercept}: {yIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{yIntercept: string}",signature:{properties:[{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphBothIntercepts",value:{name:"signature",type:"function",raw:`({
    xIntercept,
    yIntercept,
}: {
    xIntercept: string;
    yIntercept: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    xIntercept: string;
    yIntercept: string;
}`,signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}},{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphOriginIntercept",value:{name:"string",required:!0}},{key:"srLinearGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleStartingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleEndingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
    x,
    y,
    angleMeasure,
}: {
    x: string;
    y: string;
    angleMeasure: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    x: string;
    y: string;
    angleMeasure: string;
}`,signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"angleMeasure",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleGraphAriaLabel",value:{name:"string",required:!0}},{key:"srAngleGraphAriaDescription",value:{name:"signature",type:"function",raw:`({
    angleMeasure,
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleInteractiveElements",value:{name:"signature",type:"function",raw:`({
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphAriaLabel",value:{name:"string",required:!0}},{key:"srMultipleSegmentGraphAriaLabel",value:{name:"signature",type:"function",raw:`({
    countOfSegments,
}: {
    countOfSegments: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    countOfSegments: number;
}`,signature:{properties:[{key:"countOfSegments",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentIndividualLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    indexOfSegment,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentLength",value:{name:"signature",type:"function",raw:"({length}: {length: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{length: string}",signature:{properties:[{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
}: {
    endpointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
    indexOfSegment,
}: {
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemGraph",value:{name:"string",required:!0}},{key:"srLinearSystemPoints",value:{name:"signature",type:"function",raw:`({
    lineNumber,
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"lineNumber",value:{name:"number",required:!0}},{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemPoint",value:{name:"string",required:!0}},{key:"srLinearSystemGrabHandle",value:{name:"string",required:!0}},{key:"srLinearSystemIntersection",value:{name:"string",required:!0}},{key:"srLinearSystemParallel",value:{name:"string",required:!0}},{key:"srRayGraph",value:{name:"string",required:!0}},{key:"srRayPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayEndpoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayTerminalPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticGraph",value:{name:"string",required:!0}},{key:"srQuadraticFaceUp",value:{name:"string",required:!0}},{key:"srQuadraticFaceDown",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexOrigin",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexXAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexYAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexQuadrant",value:{name:"signature",type:"function",raw:"({quadrant}: {quadrant: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{quadrant: number}",signature:{properties:[{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticTwoXIntercepts",value:{name:"signature",type:"function",raw:`({
    intercept1,
    intercept2,
}: {
    intercept1: string;
    intercept2: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    intercept1: string;
    intercept2: string;
}`,signature:{properties:[{key:"intercept1",value:{name:"string",required:!0}},{key:"intercept2",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticOneXIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticYIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointOrigin",value:{name:"signature",type:"function",raw:"({pointNumber}: {pointNumber: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pointNumber: number}",signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointAxis",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
}: {
    pointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointQuadrant",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
    quadrant,
}: {
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraph",value:{name:"string",required:!0}},{key:"srPolygonGraphCoordinatePlane",value:{name:"string",required:!0}},{key:"srPolygonGraphPointsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraphPointsOne",value:{name:"string",required:!0}},{key:"srPolygonElementsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonElementsOne",value:{name:"string",required:!0}},{key:"srPolygonPointAngleApprox",value:{name:"signature",type:"function",raw:"({angle}: {angle: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: string}",signature:{properties:[{key:"angle",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonPointAngle",value:{name:"signature",type:"function",raw:"({angle}: {angle: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: number}",signature:{properties:[{key:"angle",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLength",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLengthApprox",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srUnlimitedPolygonEmpty",value:{name:"string",required:!0}},{key:"srSinusoidGraph",value:{name:"string",required:!0}},{key:"srSinusoidRootPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMaxPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMinPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidFlatPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidDescription",value:{name:"signature",type:"function",raw:`({
    minValue,
    maxValue,
    cycleStart,
    cycleEnd,
}: {
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}`,signature:{properties:[{key:"minValue",value:{name:"string",required:!0}},{key:"maxValue",value:{name:"string",required:!0}},{key:"cycleStart",value:{name:"string",required:!0}},{key:"cycleEnd",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}}],returns:null},{name:"_getAllWidgetsStartProps",docblock:null,modifiers:[],params:[{name:"allWidgetInfo",optional:!1,type:null},{name:"props",optional:!1,type:null}],returns:null},{name:"_getDefaultWidgetInfo",docblock:null,modifiers:[],params:[{name:"widgetId",optional:!1,type:{name:"string"}}],returns:null},{name:"_getWidgetInfo",docblock:null,modifiers:[],params:[{name:"widgetId",optional:!1,type:{name:"string"}}],returns:{type:{name:"PerseusWidgetTypes[PerseusWidgetTypes]",raw:"PerseusWidgetTypes[keyof PerseusWidgetTypes]"}}},{name:"renderWidget",docblock:null,modifiers:[],params:[{name:"impliedType",optional:!1,type:{name:"string"}},{name:"id",optional:!1,type:{name:"string"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    isMobile?: boolean;
    inTable?: boolean;
    key?: number;
    paragraphIndex?: number;
    foundFullWidth?: boolean;
    baseElements?: any;
}`,signature:{properties:[{key:"isMobile",value:{name:"boolean",required:!1}},{key:"inTable",value:{name:"boolean",required:!1}},{key:"key",value:{name:"number",required:!1}},{key:"paragraphIndex",value:{name:"number",required:!1}},{key:"foundFullWidth",value:{name:"boolean",required:!1}},{key:"baseElements",value:{name:"any",required:!1}}]},alias:"WidgetState"}}],returns:null},{name:"getWidgetProps",docblock:null,modifiers:[],params:[{name:"widgetId",optional:!1,type:{name:"string"}}],returns:{type:{name:"intersection",raw:"RenderProps & UniversalWidgetProps<Rubric, TrackingExtraArgs>",elements:[{name:"any"},{name:"signature",type:"object",raw:`{
    reviewModeRubric?: ReviewModeRubric | null | undefined;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewMode: boolean;
    onChange: ChangeHandler;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"reviewModeRubric",value:{name:"union",raw:"ReviewModeRubric | null | undefined",elements:[{name:"RubricRegistry[RubricRegistry]",raw:"RubricRegistry[keyof RubricRegistry]"},{name:"null"},{name:"undefined"}],required:!1}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,elements:[{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
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
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`},{name:"signature",type:"object",raw:`{
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"isMobileApp",value:{name:"NonNullable",elements:[{name:'Readonly["isMobileApp"]',raw:'APIOptions["isMobileApp"]'}],raw:'NonNullable<APIOptions["isMobileApp"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        isMobileApp: NonNullable<APIOptions["isMobileApp"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
    }
>`,required:!0}},{key:"keypadElement",value:{name:"any",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},{key:"onFocus",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"onBlur",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"findWidgets",value:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
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
        // widgets/number-line.tsx
        divisionRange?: number[];
        // widgets/number-line.ts
        numDivisions?: number;
        // widgets/number-line.ts
        numLinePosition?: number;
        // widgets/number-line.ts
        rel?: Relationship;
        // widgets/label-image.tsx
        markers?: Array<LabelImageMarkerPublicData | PerseusLabelImageMarker>;
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
    // widgets/number-line.tsx
    divisionRange?: number[];
    // widgets/number-line.ts
    numDivisions?: number;
    // widgets/number-line.ts
    numLinePosition?: number;
    // widgets/number-line.ts
    rel?: Relationship;
    // widgets/label-image.tsx
    markers?: Array<LabelImageMarkerPublicData | PerseusLabelImageMarker>;
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
    coords?: [Coord, Coord, Coord];
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
    // Used instead of \`coords\` in some old graphs that have only one point.
    coord?: Coord;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
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
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: Coord[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: Coord[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"Coord[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"Coord[]",required:!1}}]}}],required:!1}},{key:"divisionRange",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}},{key:"numDivisions",value:{name:"number",required:!1}},{key:"numLinePosition",value:{name:"number",required:!1}},{key:"rel",value:{name:"union",raw:'"eq" | "lt" | "gt" | "le" | "ge"',elements:[{name:"literal",value:'"eq"'},{name:"literal",value:'"lt"'},{name:"literal",value:'"gt"'},{name:"literal",value:'"le"'},{name:"literal",value:'"ge"'}],required:!1}},{key:"markers",value:{name:"Array",elements:[{name:"union",raw:"LabelImageMarkerPublicData | PerseusLabelImageMarker",elements:[{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
    // A list of correct answers for this marker.  Often only one but can have multiple
    answers: string[];
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // X Coordiate location of the marker on the image
    x: number;
    // Y Coordinate location of the marker on the image
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},{name:"union",raw:'"x" | "y" | "label"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'},{name:"literal",value:'"label"'}]}],raw:`Pick<
    PerseusLabelImageMarker,
    "x" | "y" | "label"
>`},{name:"signature",type:"object",raw:`{
    // A list of correct answers for this marker.  Often only one but can have multiple
    answers: string[];
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // X Coordiate location of the marker on the image
    x: number;
    // Y Coordinate location of the marker on the image
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}}]}],raw:"Array<LabelImageMarkerPublicData | PerseusLabelImageMarker>",required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"containerSizeClass",value:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]",required:!0}}]}}]}}},{name:"getSerializedState",docblock:`Serializes the questions state so it can be recovered.

The return value of this function can be sent to the
\`restoreSerializedState\` method to restore this state.

If an instance of widgetProps is passed in, it generates the serialized
state from that instead of the current widget props.`,modifiers:[],params:[{name:"widgetProps",optional:!1,type:{name:"any"}}],returns:{type:{name:"signature",type:"object",raw:`{
    [id: string]: any;
}`,signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}}},description:`Serializes the questions state so it can be recovered.

The return value of this function can be sent to the
\`restoreSerializedState\` method to restore this state.

If an instance of widgetProps is passed in, it generates the serialized
state from that instead of the current widget props.`},{name:"restoreSerializedState",docblock:null,modifiers:[],params:[{name:"serializedState",optional:!1,type:{name:"Record",elements:[{name:"string"},{name:"any"}],raw:"Record<string, any>",alias:"SerializedState"}},{name:"callback",optional:!0,type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}}}],returns:null},{name:"showRationalesForCurrentlySelectedChoices",docblock:`Tell each of the radio widgets to show rationales for each of the
currently selected choices inside of them. If the widget is correct, it
shows rationales for all of the choices. This also disables interaction
with the choices that we show rationales for.`,modifiers:[],params:[],returns:null,description:`Tell each of the radio widgets to show rationales for each of the
currently selected choices inside of them. If the widget is correct, it
shows rationales for all of the choices. This also disables interaction
with the choices that we show rationales for.`},{name:"deselectIncorrectSelectedChoices",docblock:`Tells each of the radio widgets to deselect any of the incorrect choices
that are currently selected (leaving correct choices still selected).`,modifiers:[],params:[],returns:null,description:`Tells each of the radio widgets to deselect any of the incorrect choices
that are currently selected (leaving correct choices still selected).`},{name:"findInternalWidgets",docblock:`Allows inter-widget communication.

This function yields this Renderer's own internal widgets, and it's used
in two places.

First, we expose our own internal widgets to each other by giving them
a \`findWidgets\` function that, in turn, calls this function.

Second, we expose our own internal widgets to this Renderer's parent,
by allowing it to call this function directly. That way, it can hook us
up to other Renderers on the page, by writing a \`findExternalWidgets\`
prop that calls each other Renderer's \`findInternalWidgets\` function.

Takes a \`filterCriterion\` on which widgets to return.
\`filterCriterion\` can be one of:
 * A string widget id
 * A string widget type
 * a function from (id, widgetInfo, widgetComponent) to true or false

Returns an array of the matching widget components.

If you need to do logic with more than the components, it is possible
to do such logic inside the filter, rather than on the result array.

See the passage-ref widget for an example.

"Remember: abilities are not inherently good or evil, it's how you use
them." ~ Kyle Katarn
Please use this one with caution.`,modifiers:[],params:[{name:"filterCriterion",optional:!1,type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}],alias:"FilterCriterion"}}],returns:null,description:`Allows inter-widget communication.

This function yields this Renderer's own internal widgets, and it's used
in two places.

First, we expose our own internal widgets to each other by giving them
a \`findWidgets\` function that, in turn, calls this function.

Second, we expose our own internal widgets to this Renderer's parent,
by allowing it to call this function directly. That way, it can hook us
up to other Renderers on the page, by writing a \`findExternalWidgets\`
prop that calls each other Renderer's \`findInternalWidgets\` function.

Takes a \`filterCriterion\` on which widgets to return.
\`filterCriterion\` can be one of:
 * A string widget id
 * A string widget type
 * a function from (id, widgetInfo, widgetComponent) to true or false

Returns an array of the matching widget components.

If you need to do logic with more than the components, it is possible
to do such logic inside the filter, rather than on the result array.

See the passage-ref widget for an example.

"Remember: abilities are not inherently good or evil, it's how you use
them." ~ Kyle Katarn
Please use this one with caution.`},{name:"findWidgets",docblock:`Allows inter-widget communication.

Includes both widgets internal to this Renderer, and external widgets
exposed by the \`findExternalWidgets\` prop.

See \`findInteralWidgets\` for more information.`,modifiers:[],params:[{name:"filterCriterion",optional:!1,type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}],alias:"FilterCriterion"}}],returns:null,description:`Allows inter-widget communication.

Includes both widgets internal to this Renderer, and external widgets
exposed by the \`findExternalWidgets\` prop.

See \`findInteralWidgets\` for more information.`},{name:"getWidgetInstance",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:null}],returns:null},{name:"_onWidgetFocus",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:{name:"string"}},{name:"focusPath",optional:!0,type:null}],returns:null},{name:"_onWidgetBlur",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:{name:"string"}},{name:"blurPath",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"getContent",docblock:null,modifiers:[],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`Partial<React.ContextType<typeof DependenciesContext>> & {
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,elements:[{name:"Partial",elements:[{name:"ReactContextType",raw:"React.ContextType<typeof DependenciesContext>",elements:[{name:"DependenciesContext"}]}],raw:"Partial<React.ContextType<typeof DependenciesContext>>"},{name:"signature",type:"object",raw:`{
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`,required:!1}},{key:"alwaysUpdate",value:{name:"boolean",required:!1}},{key:"findExternalWidgets",value:{name:"any",required:!0}},{key:"highlightedWidgets",value:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",required:!1}},{key:"images",value:{name:"signature",raw:'PerseusRenderer["images"]',required:!0}},{key:"keypadElement",value:{name:"union",raw:"KeypadAPI | null",elements:[{name:"KeypadAPI"},{name:"null"}],required:!1}},{key:"onInteractWithWidget",value:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}},required:!0}},{key:"onRender",value:{name:"signature",type:"function",raw:"(node?: any) => void",signature:{arguments:[{type:{name:"any"},name:"node"}],return:{name:"void"}},required:!0}},{key:"problemNum",value:{name:"number",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1}},{key:"reviewMode",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"showSolutions",value:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}],required:!1},description:'If set to "all", all rationales or solutions will be shown. If set to\n"selected", soltions will only be shown for selected choices. If set to\n"none", solutions will not be shown-- equivalent to `undefined`.'},{key:"content",value:{name:"string",raw:'PerseusRenderer["content"]',required:!0}},{key:"serializedState",value:{name:"any",required:!1}},{key:"onSerializedStateUpdated",value:{name:"signature",type:"function",raw:`(serializedState: {
    [key: string]: any;
}) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    [key: string]: any;
}`,signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"serializedState"}],return:{name:"unknown"}},required:!0},description:`Callback which is called when serialized state changes with the new
serialized state.`},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0},description:`If linterContext.highlightLint is true, then content will be passed to
the linter and any warnings will be highlighted in the rendered output.`},{key:"legacyPerseusLint",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"widgets",value:{name:"signature",raw:'PerseusRenderer["widgets"]',required:!0}},{key:"inline",value:{name:"boolean",required:!1},description:"Skip adding paragraph class"},{key:"strings",value:{name:"signature",type:"object",raw:`{
    // \`num\` is a special variable name that is used to determine the plurality
    // of the translated string.
    characterCount: ({used, num}: {used: number; num: number}) => string;
    closeKeypad: string;
    openKeypad: string;
    mathInputBox: string;
    removeHighlight: string;
    addHighlight: string;
    hintPos: ({pos}: {pos: number}) => string;
    errorRendering: ({error}: {error: string}) => string;
    APPROXIMATED_PI_ERROR: string;
    EXTRA_SYMBOLS_ERROR: string;
    NEEDS_TO_BE_SIMPLFIED_ERROR: string;
    MISSING_PERCENT_ERROR: string;
    MULTIPLICATION_SIGN_ERROR: string;
    WRONG_CASE_ERROR: string;
    WRONG_LETTER_ERROR: string;
    invalidSelection: string;
    ERROR_TITLE: string;
    ERROR_MESSAGE: string;
    USER_INPUT_EMPTY: string;
    USER_INPUT_TOO_LONG: string;
    hints: string;
    getAnotherHint: string;
    deprecatedStandin: string;
    keepTrying: string;
    tryAgain: string;
    check: string;
    correctExcited: string;
    nextQuestion: string;
    skipToTitle: ({title}: {title: string}) => string;
    current: string;
    correct: string;
    correctSelected: string;
    incorrect: string;
    incorrectSelected: string;
    hideExplanation: string;
    explain: string;
    INVALID_MESSAGE_PREFIX: string;
    DEFAULT_INVALID_MESSAGE_1: string;
    DEFAULT_INVALID_MESSAGE_2: string;
    integerExample: string;
    properExample: string;
    simplifiedProperExample: string;
    improperExample: string;
    simplifiedImproperExample: string;
    mixedExample: string;
    decimalExample: string;
    percentExample: string;
    piExample: string;
    yourAnswer: string;
    yourAnswerLabel: string;
    addPoints: string;
    addVertices: string;
    tapMultiple: string;
    tapSingle: string;
    clickMultiple: string;
    clickSingle: string;
    choices: string;
    answers: ({num}: {num: number}) => string;
    hideAnswersToggleLabel: string;
    moves: ({num}: {num: number}) => string;
    clickTiles: string;
    turnOffLights: string;
    fillAllCells: string;
    molecularDrawing: ({content}: {content: string}) => string;
    switchDirection: string;
    circleOpen: string;
    circleFilled: string;
    numDivisions: string;
    divisions: ({divRangeString}: {divRangeString: string}) => string;
    lineRange: ({lineRange}: {lineRange: string}) => string;
    lineNumber: ({lineNumber}: {lineNumber: string}) => string;
    symbolPassage: ({
        questionSymbol,
        questionNumber,
    }: {
        questionSymbol: string;
        questionNumber: string;
    }) => string;
    symbolQuestion: ({sentenceSymbol}: {sentenceSymbol: string}) => string;
    lineLabel: string;
    beginningPassage: string;
    beginningFootnotes: string;
    endPassage: string;
    questionMarker: ({number}: {number: string}) => string;
    circleMarker: ({number}: {number: string}) => string;
    sentenceMarker: ({number}: {number: string}) => string;
    dragHandles: string;
    tapAddPoints: string;
    false: string;
    true: string;
    no: string;
    yes: string;
    chooseCorrectNum: string;
    notNoneOfTheAbove: string;
    noneOfTheAbove: string;
    chooseNumAnswers: ({numCorrect}: {numCorrect: string}) => string;
    chooseAllAnswers: string;
    chooseOneAnswer: string;
    choiceCheckedCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
    scrollAnswers: string;
    scrollLeft: string;
    scrollRight: string;
    rightArrow: string;
    dontUnderstandUnits: string;
    checkSigFigs: string;
    answerNumericallyIncorrect: string;
    checkUnits: string;
    dontUnderstand: string;
    loading: string;
    videoTranscript: string;
    somethingWrong: string;
    videoWrapper: string;
    mathInputTitle: string;
    mathInputDescription: string;
    sin: string;
    cos: string;
    tan: string;
    simulationLoadFail: string;
    simulationLocaleWarning: string;
    selectAnAnswer: string;
    srGraphInstructions: string;
    srUnlimitedGraphInstructions: string;
    addPoint: string;
    removePoint: string;
    graphKeyboardPrompt: string;
    closePolygon: string;
    openPolygon: string;
    srPointAtCoordinates: ({
        num,
        x,
        y,
    }: {
        num: number;
        x: string;
        y: string;
    }) => string;
    srInteractiveElements: ({elements}: {elements: string}) => string;
    srNoInteractiveElements: string;
    srCircleGraph: string;
    srCircleShape: ({
        centerX,
        centerY,
    }: {
        centerX: string;
        centerY: string;
    }) => string;
    srCircleRadiusPointRight: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadiusPointLeft: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadius: ({radius}: {radius: number}) => string;
    srCircleOuterPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
        point4X,
        point4Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
        point4X: string;
        point4Y: string;
    }) => string;
    srLinearGraph: string;
    srLinearGraphPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearGraphSlopeIncreasing: string;
    srLinearGraphSlopeDecreasing: string;
    srLinearGraphSlopeHorizontal: string;
    srLinearGraphSlopeVertical: string;
    srLinearGraphXOnlyIntercept: ({xIntercept}: {xIntercept: string}) => string;
    srLinearGraphYOnlyIntercept: ({yIntercept}: {yIntercept: string}) => string;
    srLinearGraphBothIntercepts: ({
        xIntercept,
        yIntercept,
    }: {
        xIntercept: string;
        yIntercept: string;
    }) => string;
    srLinearGraphOriginIntercept: string;
    srLinearGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srAngleStartingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleEndingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleVertexWithAngleMeasure: ({
        x,
        y,
        angleMeasure,
    }: {
        x: string;
        y: string;
        angleMeasure: string;
    }) => string;
    srAngleGraphAriaLabel: string;
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        angleMeasure: string;
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srAngleInteractiveElements: ({
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srSingleSegmentGraphAriaLabel: string;
    srMultipleSegmentGraphAriaLabel: ({
        countOfSegments,
    }: {
        countOfSegments: number;
    }) => string;
    srMultipleSegmentIndividualLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        indexOfSegment,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        indexOfSegment: number;
    }) => string;
    srSingleSegmentLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srSegmentLength: ({length}: {length: string}) => string;
    srSingleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
    }) => string;
    srMultipleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
        indexOfSegment,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
        indexOfSegment: number;
    }) => string;
    srSegmentGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemGraph: string;
    srLinearSystemPoints: ({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemPoint({
        lineNumber,
        pointSequence,
        x,
        y,
    }: {
        lineNumber: number;
        pointSequence: number;
        x: string;
        y: string;
    }): string;
    srLinearSystemGrabHandle({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }): string;
    srLinearSystemIntersection({x, y}: {x: string; y: string}): string;
    srLinearSystemParallel: string;
    srRayGraph: string;
    srRayPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srRayEndpoint: ({x, y}: {x: string; y: string}) => string;
    srRayTerminalPoint: ({x, y}: {x: string; y: string}) => string;
    srRayGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srQuadraticGraph: string;
    srQuadraticFaceUp: string;
    srQuadraticFaceDown: string;
    srQuadraticGraphVertexOrigin: string;
    srQuadraticGraphVertexXAxis: string;
    srQuadraticGraphVertexYAxis: string;
    srQuadraticGraphVertexQuadrant: ({quadrant}: {quadrant: number}) => string;
    srQuadraticTwoXIntercepts: ({
        intercept1,
        intercept2,
    }: {
        intercept1: string;
        intercept2: string;
    }) => string;
    srQuadraticOneXIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticYIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticPointOrigin: ({pointNumber}: {pointNumber: number}) => string;
    srQuadraticPointAxis: ({
        pointNumber,
        x,
        y,
    }: {
        pointNumber: number;
        x: string;
        y: string;
    }) => string;
    srQuadraticPointQuadrant: ({
        pointNumber,
        x,
        y,
        quadrant,
    }: {
        pointNumber: number;
        x: string;
        y: string;
        quadrant: number;
    }) => string;
    srQuadraticInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
    }) => string;
    srPolygonGraph: string;
    srPolygonGraphCoordinatePlane: string;
    srPolygonGraphPointsNum: ({num}: {num: number}) => string;
    srPolygonGraphPointsOne: string;
    srPolygonElementsNum: ({num}: {num: number}) => string;
    srPolygonElementsOne: string;
    srPolygonPointAngleApprox: ({angle}: {angle: string}) => string;
    srPolygonPointAngle: ({angle}: {angle: number}) => string;
    srPolygonSideLength: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srPolygonSideLengthApprox: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srUnlimitedPolygonEmpty: string;
    srSinusoidGraph: string;
    srSinusoidRootPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMaxPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMinPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidFlatPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidDescription: ({
        minValue,
        maxValue,
        cycleStart,
        cycleEnd,
    }: {
        minValue: string;
        maxValue: string;
        cycleStart: string;
        cycleEnd: string;
    }) => string;
    srSinusoidInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
}`,signature:{properties:[{key:"characterCount",value:{name:"signature",type:"function",raw:"({used, num}: {used: number; num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{used: number; num: number}",signature:{properties:[{key:"used",value:{name:"number",required:!0}},{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"USER_INPUT_EMPTY",value:{name:"string",required:!0}},{key:"USER_INPUT_TOO_LONG",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"scrollAnswers",value:{name:"string",required:!0}},{key:"scrollLeft",value:{name:"string",required:!0}},{key:"scrollRight",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"srGraphInstructions",value:{name:"string",required:!0}},{key:"srUnlimitedGraphInstructions",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
    num,
    x,
    y,
}: {
    num: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    num: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"num",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srInteractiveElements",value:{name:"signature",type:"function",raw:"({elements}: {elements: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{elements: string}",signature:{properties:[{key:"elements",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srNoInteractiveElements",value:{name:"string",required:!0}},{key:"srCircleGraph",value:{name:"string",required:!0}},{key:"srCircleShape",value:{name:"signature",type:"function",raw:`({
    centerX,
    centerY,
}: {
    centerX: string;
    centerY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    centerX: string;
    centerY: string;
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointRight",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointLeft",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadius",value:{name:"signature",type:"function",raw:"({radius}: {radius: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{radius: number}",signature:{properties:[{key:"radius",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleOuterPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
    point4X,
    point4Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}},{key:"point4X",value:{name:"string",required:!0}},{key:"point4Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraph",value:{name:"string",required:!0}},{key:"srLinearGraphPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphSlopeIncreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeDecreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeHorizontal",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeVertical",value:{name:"string",required:!0}},{key:"srLinearGraphXOnlyIntercept",value:{name:"signature",type:"function",raw:"({xIntercept}: {xIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{xIntercept: string}",signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphYOnlyIntercept",value:{name:"signature",type:"function",raw:"({yIntercept}: {yIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{yIntercept: string}",signature:{properties:[{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphBothIntercepts",value:{name:"signature",type:"function",raw:`({
    xIntercept,
    yIntercept,
}: {
    xIntercept: string;
    yIntercept: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    xIntercept: string;
    yIntercept: string;
}`,signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}},{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphOriginIntercept",value:{name:"string",required:!0}},{key:"srLinearGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleStartingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleEndingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
    x,
    y,
    angleMeasure,
}: {
    x: string;
    y: string;
    angleMeasure: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    x: string;
    y: string;
    angleMeasure: string;
}`,signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"angleMeasure",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleGraphAriaLabel",value:{name:"string",required:!0}},{key:"srAngleGraphAriaDescription",value:{name:"signature",type:"function",raw:`({
    angleMeasure,
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleInteractiveElements",value:{name:"signature",type:"function",raw:`({
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphAriaLabel",value:{name:"string",required:!0}},{key:"srMultipleSegmentGraphAriaLabel",value:{name:"signature",type:"function",raw:`({
    countOfSegments,
}: {
    countOfSegments: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    countOfSegments: number;
}`,signature:{properties:[{key:"countOfSegments",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentIndividualLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    indexOfSegment,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentLength",value:{name:"signature",type:"function",raw:"({length}: {length: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{length: string}",signature:{properties:[{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
}: {
    endpointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
    indexOfSegment,
}: {
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemGraph",value:{name:"string",required:!0}},{key:"srLinearSystemPoints",value:{name:"signature",type:"function",raw:`({
    lineNumber,
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"lineNumber",value:{name:"number",required:!0}},{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemPoint",value:{name:"string",required:!0}},{key:"srLinearSystemGrabHandle",value:{name:"string",required:!0}},{key:"srLinearSystemIntersection",value:{name:"string",required:!0}},{key:"srLinearSystemParallel",value:{name:"string",required:!0}},{key:"srRayGraph",value:{name:"string",required:!0}},{key:"srRayPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayEndpoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayTerminalPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticGraph",value:{name:"string",required:!0}},{key:"srQuadraticFaceUp",value:{name:"string",required:!0}},{key:"srQuadraticFaceDown",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexOrigin",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexXAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexYAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexQuadrant",value:{name:"signature",type:"function",raw:"({quadrant}: {quadrant: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{quadrant: number}",signature:{properties:[{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticTwoXIntercepts",value:{name:"signature",type:"function",raw:`({
    intercept1,
    intercept2,
}: {
    intercept1: string;
    intercept2: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    intercept1: string;
    intercept2: string;
}`,signature:{properties:[{key:"intercept1",value:{name:"string",required:!0}},{key:"intercept2",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticOneXIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticYIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointOrigin",value:{name:"signature",type:"function",raw:"({pointNumber}: {pointNumber: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pointNumber: number}",signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointAxis",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
}: {
    pointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointQuadrant",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
    quadrant,
}: {
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraph",value:{name:"string",required:!0}},{key:"srPolygonGraphCoordinatePlane",value:{name:"string",required:!0}},{key:"srPolygonGraphPointsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraphPointsOne",value:{name:"string",required:!0}},{key:"srPolygonElementsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonElementsOne",value:{name:"string",required:!0}},{key:"srPolygonPointAngleApprox",value:{name:"signature",type:"function",raw:"({angle}: {angle: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: string}",signature:{properties:[{key:"angle",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonPointAngle",value:{name:"signature",type:"function",raw:"({angle}: {angle: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: number}",signature:{properties:[{key:"angle",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLength",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLengthApprox",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srUnlimitedPolygonEmpty",value:{name:"string",required:!0}},{key:"srSinusoidGraph",value:{name:"string",required:!0}},{key:"srSinusoidRootPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMaxPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMinPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidFlatPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidDescription",value:{name:"signature",type:"function",raw:`({
    minValue,
    maxValue,
    cycleStart,
    cycleEnd,
}: {
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}`,signature:{properties:[{key:"minValue",value:{name:"string",required:!0}},{key:"maxValue",value:{name:"string",required:!0}},{key:"cycleStart",value:{name:"string",required:!0}},{key:"cycleEnd",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    translationLintErrors: ReadonlyArray<string>;
    widgetInfo: Readonly<PerseusWidgetsMap>;
    widgetProps: Readonly<{
        [id: string]: any | null | undefined;
    }>;
    jiptContent: any;
    lastUsedWidgetId: string | null | undefined;
}`,signature:{properties:[{key:"translationLintErrors",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"widgetInfo",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}}],raw:"Readonly<PerseusWidgetsMap>",required:!0}},{key:"widgetProps",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    [id: string]: any | null | undefined;
}`,signature:{properties:[{key:{name:"string"},value:{name:"union",raw:"any | null | undefined",elements:[{name:"any"},{name:"null"},{name:"undefined"}],required:!0}}]}}],raw:`Readonly<{
    [id: string]: any | null | undefined;
}>`,required:!0}},{key:"jiptContent",value:{name:"any",required:!0}},{key:"lastUsedWidgetId",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]},alias:"State"}}],returns:null},{name:"shouldRenderJiptPlaceholder",docblock:null,modifiers:[],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`Partial<React.ContextType<typeof DependenciesContext>> & {
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,elements:[{name:"Partial",elements:[{name:"ReactContextType",raw:"React.ContextType<typeof DependenciesContext>",elements:[{name:"DependenciesContext"}]}],raw:"Partial<React.ContextType<typeof DependenciesContext>>"},{name:"signature",type:"object",raw:`{
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`,required:!1}},{key:"alwaysUpdate",value:{name:"boolean",required:!1}},{key:"findExternalWidgets",value:{name:"any",required:!0}},{key:"highlightedWidgets",value:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",required:!1}},{key:"images",value:{name:"signature",raw:'PerseusRenderer["images"]',required:!0}},{key:"keypadElement",value:{name:"union",raw:"KeypadAPI | null",elements:[{name:"KeypadAPI"},{name:"null"}],required:!1}},{key:"onInteractWithWidget",value:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}},required:!0}},{key:"onRender",value:{name:"signature",type:"function",raw:"(node?: any) => void",signature:{arguments:[{type:{name:"any"},name:"node"}],return:{name:"void"}},required:!0}},{key:"problemNum",value:{name:"number",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1}},{key:"reviewMode",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"showSolutions",value:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}],required:!1},description:'If set to "all", all rationales or solutions will be shown. If set to\n"selected", soltions will only be shown for selected choices. If set to\n"none", solutions will not be shown-- equivalent to `undefined`.'},{key:"content",value:{name:"string",raw:'PerseusRenderer["content"]',required:!0}},{key:"serializedState",value:{name:"any",required:!1}},{key:"onSerializedStateUpdated",value:{name:"signature",type:"function",raw:`(serializedState: {
    [key: string]: any;
}) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    [key: string]: any;
}`,signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"serializedState"}],return:{name:"unknown"}},required:!0},description:`Callback which is called when serialized state changes with the new
serialized state.`},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0},description:`If linterContext.highlightLint is true, then content will be passed to
the linter and any warnings will be highlighted in the rendered output.`},{key:"legacyPerseusLint",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"widgets",value:{name:"signature",raw:'PerseusRenderer["widgets"]',required:!0}},{key:"inline",value:{name:"boolean",required:!1},description:"Skip adding paragraph class"},{key:"strings",value:{name:"signature",type:"object",raw:`{
    // \`num\` is a special variable name that is used to determine the plurality
    // of the translated string.
    characterCount: ({used, num}: {used: number; num: number}) => string;
    closeKeypad: string;
    openKeypad: string;
    mathInputBox: string;
    removeHighlight: string;
    addHighlight: string;
    hintPos: ({pos}: {pos: number}) => string;
    errorRendering: ({error}: {error: string}) => string;
    APPROXIMATED_PI_ERROR: string;
    EXTRA_SYMBOLS_ERROR: string;
    NEEDS_TO_BE_SIMPLFIED_ERROR: string;
    MISSING_PERCENT_ERROR: string;
    MULTIPLICATION_SIGN_ERROR: string;
    WRONG_CASE_ERROR: string;
    WRONG_LETTER_ERROR: string;
    invalidSelection: string;
    ERROR_TITLE: string;
    ERROR_MESSAGE: string;
    USER_INPUT_EMPTY: string;
    USER_INPUT_TOO_LONG: string;
    hints: string;
    getAnotherHint: string;
    deprecatedStandin: string;
    keepTrying: string;
    tryAgain: string;
    check: string;
    correctExcited: string;
    nextQuestion: string;
    skipToTitle: ({title}: {title: string}) => string;
    current: string;
    correct: string;
    correctSelected: string;
    incorrect: string;
    incorrectSelected: string;
    hideExplanation: string;
    explain: string;
    INVALID_MESSAGE_PREFIX: string;
    DEFAULT_INVALID_MESSAGE_1: string;
    DEFAULT_INVALID_MESSAGE_2: string;
    integerExample: string;
    properExample: string;
    simplifiedProperExample: string;
    improperExample: string;
    simplifiedImproperExample: string;
    mixedExample: string;
    decimalExample: string;
    percentExample: string;
    piExample: string;
    yourAnswer: string;
    yourAnswerLabel: string;
    addPoints: string;
    addVertices: string;
    tapMultiple: string;
    tapSingle: string;
    clickMultiple: string;
    clickSingle: string;
    choices: string;
    answers: ({num}: {num: number}) => string;
    hideAnswersToggleLabel: string;
    moves: ({num}: {num: number}) => string;
    clickTiles: string;
    turnOffLights: string;
    fillAllCells: string;
    molecularDrawing: ({content}: {content: string}) => string;
    switchDirection: string;
    circleOpen: string;
    circleFilled: string;
    numDivisions: string;
    divisions: ({divRangeString}: {divRangeString: string}) => string;
    lineRange: ({lineRange}: {lineRange: string}) => string;
    lineNumber: ({lineNumber}: {lineNumber: string}) => string;
    symbolPassage: ({
        questionSymbol,
        questionNumber,
    }: {
        questionSymbol: string;
        questionNumber: string;
    }) => string;
    symbolQuestion: ({sentenceSymbol}: {sentenceSymbol: string}) => string;
    lineLabel: string;
    beginningPassage: string;
    beginningFootnotes: string;
    endPassage: string;
    questionMarker: ({number}: {number: string}) => string;
    circleMarker: ({number}: {number: string}) => string;
    sentenceMarker: ({number}: {number: string}) => string;
    dragHandles: string;
    tapAddPoints: string;
    false: string;
    true: string;
    no: string;
    yes: string;
    chooseCorrectNum: string;
    notNoneOfTheAbove: string;
    noneOfTheAbove: string;
    chooseNumAnswers: ({numCorrect}: {numCorrect: string}) => string;
    chooseAllAnswers: string;
    chooseOneAnswer: string;
    choiceCheckedCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
    scrollAnswers: string;
    scrollLeft: string;
    scrollRight: string;
    rightArrow: string;
    dontUnderstandUnits: string;
    checkSigFigs: string;
    answerNumericallyIncorrect: string;
    checkUnits: string;
    dontUnderstand: string;
    loading: string;
    videoTranscript: string;
    somethingWrong: string;
    videoWrapper: string;
    mathInputTitle: string;
    mathInputDescription: string;
    sin: string;
    cos: string;
    tan: string;
    simulationLoadFail: string;
    simulationLocaleWarning: string;
    selectAnAnswer: string;
    srGraphInstructions: string;
    srUnlimitedGraphInstructions: string;
    addPoint: string;
    removePoint: string;
    graphKeyboardPrompt: string;
    closePolygon: string;
    openPolygon: string;
    srPointAtCoordinates: ({
        num,
        x,
        y,
    }: {
        num: number;
        x: string;
        y: string;
    }) => string;
    srInteractiveElements: ({elements}: {elements: string}) => string;
    srNoInteractiveElements: string;
    srCircleGraph: string;
    srCircleShape: ({
        centerX,
        centerY,
    }: {
        centerX: string;
        centerY: string;
    }) => string;
    srCircleRadiusPointRight: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadiusPointLeft: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadius: ({radius}: {radius: number}) => string;
    srCircleOuterPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
        point4X,
        point4Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
        point4X: string;
        point4Y: string;
    }) => string;
    srLinearGraph: string;
    srLinearGraphPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearGraphSlopeIncreasing: string;
    srLinearGraphSlopeDecreasing: string;
    srLinearGraphSlopeHorizontal: string;
    srLinearGraphSlopeVertical: string;
    srLinearGraphXOnlyIntercept: ({xIntercept}: {xIntercept: string}) => string;
    srLinearGraphYOnlyIntercept: ({yIntercept}: {yIntercept: string}) => string;
    srLinearGraphBothIntercepts: ({
        xIntercept,
        yIntercept,
    }: {
        xIntercept: string;
        yIntercept: string;
    }) => string;
    srLinearGraphOriginIntercept: string;
    srLinearGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srAngleStartingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleEndingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleVertexWithAngleMeasure: ({
        x,
        y,
        angleMeasure,
    }: {
        x: string;
        y: string;
        angleMeasure: string;
    }) => string;
    srAngleGraphAriaLabel: string;
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        angleMeasure: string;
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srAngleInteractiveElements: ({
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srSingleSegmentGraphAriaLabel: string;
    srMultipleSegmentGraphAriaLabel: ({
        countOfSegments,
    }: {
        countOfSegments: number;
    }) => string;
    srMultipleSegmentIndividualLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        indexOfSegment,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        indexOfSegment: number;
    }) => string;
    srSingleSegmentLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srSegmentLength: ({length}: {length: string}) => string;
    srSingleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
    }) => string;
    srMultipleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
        indexOfSegment,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
        indexOfSegment: number;
    }) => string;
    srSegmentGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemGraph: string;
    srLinearSystemPoints: ({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemPoint({
        lineNumber,
        pointSequence,
        x,
        y,
    }: {
        lineNumber: number;
        pointSequence: number;
        x: string;
        y: string;
    }): string;
    srLinearSystemGrabHandle({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }): string;
    srLinearSystemIntersection({x, y}: {x: string; y: string}): string;
    srLinearSystemParallel: string;
    srRayGraph: string;
    srRayPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srRayEndpoint: ({x, y}: {x: string; y: string}) => string;
    srRayTerminalPoint: ({x, y}: {x: string; y: string}) => string;
    srRayGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srQuadraticGraph: string;
    srQuadraticFaceUp: string;
    srQuadraticFaceDown: string;
    srQuadraticGraphVertexOrigin: string;
    srQuadraticGraphVertexXAxis: string;
    srQuadraticGraphVertexYAxis: string;
    srQuadraticGraphVertexQuadrant: ({quadrant}: {quadrant: number}) => string;
    srQuadraticTwoXIntercepts: ({
        intercept1,
        intercept2,
    }: {
        intercept1: string;
        intercept2: string;
    }) => string;
    srQuadraticOneXIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticYIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticPointOrigin: ({pointNumber}: {pointNumber: number}) => string;
    srQuadraticPointAxis: ({
        pointNumber,
        x,
        y,
    }: {
        pointNumber: number;
        x: string;
        y: string;
    }) => string;
    srQuadraticPointQuadrant: ({
        pointNumber,
        x,
        y,
        quadrant,
    }: {
        pointNumber: number;
        x: string;
        y: string;
        quadrant: number;
    }) => string;
    srQuadraticInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
    }) => string;
    srPolygonGraph: string;
    srPolygonGraphCoordinatePlane: string;
    srPolygonGraphPointsNum: ({num}: {num: number}) => string;
    srPolygonGraphPointsOne: string;
    srPolygonElementsNum: ({num}: {num: number}) => string;
    srPolygonElementsOne: string;
    srPolygonPointAngleApprox: ({angle}: {angle: string}) => string;
    srPolygonPointAngle: ({angle}: {angle: number}) => string;
    srPolygonSideLength: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srPolygonSideLengthApprox: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srUnlimitedPolygonEmpty: string;
    srSinusoidGraph: string;
    srSinusoidRootPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMaxPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMinPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidFlatPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidDescription: ({
        minValue,
        maxValue,
        cycleStart,
        cycleEnd,
    }: {
        minValue: string;
        maxValue: string;
        cycleStart: string;
        cycleEnd: string;
    }) => string;
    srSinusoidInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
}`,signature:{properties:[{key:"characterCount",value:{name:"signature",type:"function",raw:"({used, num}: {used: number; num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{used: number; num: number}",signature:{properties:[{key:"used",value:{name:"number",required:!0}},{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"USER_INPUT_EMPTY",value:{name:"string",required:!0}},{key:"USER_INPUT_TOO_LONG",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"scrollAnswers",value:{name:"string",required:!0}},{key:"scrollLeft",value:{name:"string",required:!0}},{key:"scrollRight",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"srGraphInstructions",value:{name:"string",required:!0}},{key:"srUnlimitedGraphInstructions",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
    num,
    x,
    y,
}: {
    num: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    num: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"num",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srInteractiveElements",value:{name:"signature",type:"function",raw:"({elements}: {elements: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{elements: string}",signature:{properties:[{key:"elements",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srNoInteractiveElements",value:{name:"string",required:!0}},{key:"srCircleGraph",value:{name:"string",required:!0}},{key:"srCircleShape",value:{name:"signature",type:"function",raw:`({
    centerX,
    centerY,
}: {
    centerX: string;
    centerY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    centerX: string;
    centerY: string;
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointRight",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointLeft",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadius",value:{name:"signature",type:"function",raw:"({radius}: {radius: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{radius: number}",signature:{properties:[{key:"radius",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleOuterPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
    point4X,
    point4Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}},{key:"point4X",value:{name:"string",required:!0}},{key:"point4Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraph",value:{name:"string",required:!0}},{key:"srLinearGraphPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphSlopeIncreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeDecreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeHorizontal",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeVertical",value:{name:"string",required:!0}},{key:"srLinearGraphXOnlyIntercept",value:{name:"signature",type:"function",raw:"({xIntercept}: {xIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{xIntercept: string}",signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphYOnlyIntercept",value:{name:"signature",type:"function",raw:"({yIntercept}: {yIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{yIntercept: string}",signature:{properties:[{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphBothIntercepts",value:{name:"signature",type:"function",raw:`({
    xIntercept,
    yIntercept,
}: {
    xIntercept: string;
    yIntercept: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    xIntercept: string;
    yIntercept: string;
}`,signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}},{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphOriginIntercept",value:{name:"string",required:!0}},{key:"srLinearGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleStartingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleEndingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
    x,
    y,
    angleMeasure,
}: {
    x: string;
    y: string;
    angleMeasure: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    x: string;
    y: string;
    angleMeasure: string;
}`,signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"angleMeasure",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleGraphAriaLabel",value:{name:"string",required:!0}},{key:"srAngleGraphAriaDescription",value:{name:"signature",type:"function",raw:`({
    angleMeasure,
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleInteractiveElements",value:{name:"signature",type:"function",raw:`({
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphAriaLabel",value:{name:"string",required:!0}},{key:"srMultipleSegmentGraphAriaLabel",value:{name:"signature",type:"function",raw:`({
    countOfSegments,
}: {
    countOfSegments: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    countOfSegments: number;
}`,signature:{properties:[{key:"countOfSegments",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentIndividualLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    indexOfSegment,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentLength",value:{name:"signature",type:"function",raw:"({length}: {length: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{length: string}",signature:{properties:[{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
}: {
    endpointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
    indexOfSegment,
}: {
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemGraph",value:{name:"string",required:!0}},{key:"srLinearSystemPoints",value:{name:"signature",type:"function",raw:`({
    lineNumber,
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"lineNumber",value:{name:"number",required:!0}},{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemPoint",value:{name:"string",required:!0}},{key:"srLinearSystemGrabHandle",value:{name:"string",required:!0}},{key:"srLinearSystemIntersection",value:{name:"string",required:!0}},{key:"srLinearSystemParallel",value:{name:"string",required:!0}},{key:"srRayGraph",value:{name:"string",required:!0}},{key:"srRayPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayEndpoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayTerminalPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticGraph",value:{name:"string",required:!0}},{key:"srQuadraticFaceUp",value:{name:"string",required:!0}},{key:"srQuadraticFaceDown",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexOrigin",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexXAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexYAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexQuadrant",value:{name:"signature",type:"function",raw:"({quadrant}: {quadrant: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{quadrant: number}",signature:{properties:[{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticTwoXIntercepts",value:{name:"signature",type:"function",raw:`({
    intercept1,
    intercept2,
}: {
    intercept1: string;
    intercept2: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    intercept1: string;
    intercept2: string;
}`,signature:{properties:[{key:"intercept1",value:{name:"string",required:!0}},{key:"intercept2",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticOneXIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticYIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointOrigin",value:{name:"signature",type:"function",raw:"({pointNumber}: {pointNumber: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pointNumber: number}",signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointAxis",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
}: {
    pointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointQuadrant",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
    quadrant,
}: {
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraph",value:{name:"string",required:!0}},{key:"srPolygonGraphCoordinatePlane",value:{name:"string",required:!0}},{key:"srPolygonGraphPointsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraphPointsOne",value:{name:"string",required:!0}},{key:"srPolygonElementsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonElementsOne",value:{name:"string",required:!0}},{key:"srPolygonPointAngleApprox",value:{name:"signature",type:"function",raw:"({angle}: {angle: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: string}",signature:{properties:[{key:"angle",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonPointAngle",value:{name:"signature",type:"function",raw:"({angle}: {angle: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: number}",signature:{properties:[{key:"angle",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLength",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLengthApprox",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srUnlimitedPolygonEmpty",value:{name:"string",required:!0}},{key:"srSinusoidGraph",value:{name:"string",required:!0}},{key:"srSinusoidRootPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMaxPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMinPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidFlatPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidDescription",value:{name:"signature",type:"function",raw:`({
    minValue,
    maxValue,
    cycleStart,
    cycleEnd,
}: {
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}`,signature:{properties:[{key:"minValue",value:{name:"string",required:!0}},{key:"maxValue",value:{name:"string",required:!0}},{key:"cycleStart",value:{name:"string",required:!0}},{key:"cycleEnd",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    translationLintErrors: ReadonlyArray<string>;
    widgetInfo: Readonly<PerseusWidgetsMap>;
    widgetProps: Readonly<{
        [id: string]: any | null | undefined;
    }>;
    jiptContent: any;
    lastUsedWidgetId: string | null | undefined;
}`,signature:{properties:[{key:"translationLintErrors",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"widgetInfo",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}}],raw:"Readonly<PerseusWidgetsMap>",required:!0}},{key:"widgetProps",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    [id: string]: any | null | undefined;
}`,signature:{properties:[{key:{name:"string"},value:{name:"union",raw:"any | null | undefined",elements:[{name:"any"},{name:"null"},{name:"undefined"}],required:!0}}]}}],raw:`Readonly<{
    [id: string]: any | null | undefined;
}>`,required:!0}},{key:"jiptContent",value:{name:"any",required:!0}},{key:"lastUsedWidgetId",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]},alias:"State"}}],returns:{type:{name:"boolean"}}},{name:"replaceJiptContent",docblock:null,modifiers:[],params:[{name:"content",optional:!1,type:{name:"string"}},{name:"paragraphIndex",optional:!1,type:{name:"number"}}],returns:null},{name:"outputMarkdown",docblock:null,modifiers:[],params:[{name:"ast",optional:!1,type:{name:"any"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    isMobile?: boolean;
    inTable?: boolean;
    key?: number;
    paragraphIndex?: number;
    foundFullWidth?: boolean;
    baseElements?: any;
}`,signature:{properties:[{key:"isMobile",value:{name:"boolean",required:!1}},{key:"inTable",value:{name:"boolean",required:!1}},{key:"key",value:{name:"number",required:!1}},{key:"paragraphIndex",value:{name:"number",required:!1}},{key:"foundFullWidth",value:{name:"boolean",required:!1}},{key:"baseElements",value:{name:"any",required:!1}}]},alias:"WidgetState"}}],returns:null},{name:"outputNested",docblock:null,modifiers:[],params:[{name:"ast",optional:!1,type:{name:"any"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    isMobile?: boolean;
    inTable?: boolean;
    key?: number;
    paragraphIndex?: number;
    foundFullWidth?: boolean;
    baseElements?: any;
}`,signature:{properties:[{key:"isMobile",value:{name:"boolean",required:!1}},{key:"inTable",value:{name:"boolean",required:!1}},{key:"key",value:{name:"number",required:!1}},{key:"paragraphIndex",value:{name:"number",required:!1}},{key:"foundFullWidth",value:{name:"boolean",required:!1}},{key:"baseElements",value:{name:"any",required:!1}}]},alias:"WidgetState"}}],returns:null},{name:"outputNode",docblock:null,modifiers:[],params:[{name:"node",optional:!1,type:{name:"any"}},{name:"nestedOutput",optional:!1,type:{name:"any"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    isMobile?: boolean;
    inTable?: boolean;
    key?: number;
    paragraphIndex?: number;
    foundFullWidth?: boolean;
    baseElements?: any;
}`,signature:{properties:[{key:"isMobile",value:{name:"boolean",required:!1}},{key:"inTable",value:{name:"boolean",required:!1}},{key:"key",value:{name:"number",required:!1}},{key:"paragraphIndex",value:{name:"number",required:!1}},{key:"foundFullWidth",value:{name:"boolean",required:!1}},{key:"baseElements",value:{name:"any",required:!1}}]},alias:"WidgetState"}}],returns:null},{name:"handleRender",docblock:null,modifiers:[],params:[{name:"prevProps",optional:!1,type:{name:"intersection",raw:`Partial<React.ContextType<typeof DependenciesContext>> & {
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,elements:[{name:"Partial",elements:[{name:"ReactContextType",raw:"React.ContextType<typeof DependenciesContext>",elements:[{name:"DependenciesContext"}]}],raw:"Partial<React.ContextType<typeof DependenciesContext>>"},{name:"signature",type:"object",raw:`{
    apiOptions?: APIOptions;
    alwaysUpdate?: boolean;
    findExternalWidgets: any;
    highlightedWidgets?: ReadonlyArray<any>;
    images: PerseusRenderer["images"];
    keypadElement?: KeypadAPI | null;
    onInteractWithWidget: (id: string) => void;
    onRender: (node?: any) => void;
    problemNum?: number;
    questionCompleted?: boolean;
    reviewMode?: boolean | null | undefined;
    /**
     * If set to "all", all rationales or solutions will be shown. If set to
     * "selected", soltions will only be shown for selected choices. If set to
     * "none", solutions will not be shown-- equivalent to \`undefined\`.
     */
    showSolutions?: ShowSolutions;
    content: PerseusRenderer["content"];
    serializedState?: any;
    /**
     * Callback which is called when serialized state changes with the new
     * serialized state.
     */
    onSerializedStateUpdated: (serializedState: {
        [key: string]: any;
    }) => unknown;
    /**
     * If linterContext.highlightLint is true, then content will be passed to
     * the linter and any warnings will be highlighted in the rendered output.
     */
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
    widgets: PerseusRenderer["widgets"];
    /**
     *  Skip adding paragraph class
     */
    inline?: boolean;
    strings: PerseusStrings;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`,required:!1}},{key:"alwaysUpdate",value:{name:"boolean",required:!1}},{key:"findExternalWidgets",value:{name:"any",required:!0}},{key:"highlightedWidgets",value:{name:"ReadonlyArray",elements:[{name:"any"}],raw:"ReadonlyArray<any>",required:!1}},{key:"images",value:{name:"signature",raw:'PerseusRenderer["images"]',required:!0}},{key:"keypadElement",value:{name:"union",raw:"KeypadAPI | null",elements:[{name:"KeypadAPI"},{name:"null"}],required:!1}},{key:"onInteractWithWidget",value:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}},required:!0}},{key:"onRender",value:{name:"signature",type:"function",raw:"(node?: any) => void",signature:{arguments:[{type:{name:"any"},name:"node"}],return:{name:"void"}},required:!0}},{key:"problemNum",value:{name:"number",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1}},{key:"reviewMode",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"showSolutions",value:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}],required:!1},description:'If set to "all", all rationales or solutions will be shown. If set to\n"selected", soltions will only be shown for selected choices. If set to\n"none", solutions will not be shown-- equivalent to `undefined`.'},{key:"content",value:{name:"string",raw:'PerseusRenderer["content"]',required:!0}},{key:"serializedState",value:{name:"any",required:!1}},{key:"onSerializedStateUpdated",value:{name:"signature",type:"function",raw:`(serializedState: {
    [key: string]: any;
}) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    [key: string]: any;
}`,signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"serializedState"}],return:{name:"unknown"}},required:!0},description:`Callback which is called when serialized state changes with the new
serialized state.`},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0},description:`If linterContext.highlightLint is true, then content will be passed to
the linter and any warnings will be highlighted in the rendered output.`},{key:"legacyPerseusLint",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"widgets",value:{name:"signature",raw:'PerseusRenderer["widgets"]',required:!0}},{key:"inline",value:{name:"boolean",required:!1},description:"Skip adding paragraph class"},{key:"strings",value:{name:"signature",type:"object",raw:`{
    // \`num\` is a special variable name that is used to determine the plurality
    // of the translated string.
    characterCount: ({used, num}: {used: number; num: number}) => string;
    closeKeypad: string;
    openKeypad: string;
    mathInputBox: string;
    removeHighlight: string;
    addHighlight: string;
    hintPos: ({pos}: {pos: number}) => string;
    errorRendering: ({error}: {error: string}) => string;
    APPROXIMATED_PI_ERROR: string;
    EXTRA_SYMBOLS_ERROR: string;
    NEEDS_TO_BE_SIMPLFIED_ERROR: string;
    MISSING_PERCENT_ERROR: string;
    MULTIPLICATION_SIGN_ERROR: string;
    WRONG_CASE_ERROR: string;
    WRONG_LETTER_ERROR: string;
    invalidSelection: string;
    ERROR_TITLE: string;
    ERROR_MESSAGE: string;
    USER_INPUT_EMPTY: string;
    USER_INPUT_TOO_LONG: string;
    hints: string;
    getAnotherHint: string;
    deprecatedStandin: string;
    keepTrying: string;
    tryAgain: string;
    check: string;
    correctExcited: string;
    nextQuestion: string;
    skipToTitle: ({title}: {title: string}) => string;
    current: string;
    correct: string;
    correctSelected: string;
    incorrect: string;
    incorrectSelected: string;
    hideExplanation: string;
    explain: string;
    INVALID_MESSAGE_PREFIX: string;
    DEFAULT_INVALID_MESSAGE_1: string;
    DEFAULT_INVALID_MESSAGE_2: string;
    integerExample: string;
    properExample: string;
    simplifiedProperExample: string;
    improperExample: string;
    simplifiedImproperExample: string;
    mixedExample: string;
    decimalExample: string;
    percentExample: string;
    piExample: string;
    yourAnswer: string;
    yourAnswerLabel: string;
    addPoints: string;
    addVertices: string;
    tapMultiple: string;
    tapSingle: string;
    clickMultiple: string;
    clickSingle: string;
    choices: string;
    answers: ({num}: {num: number}) => string;
    hideAnswersToggleLabel: string;
    moves: ({num}: {num: number}) => string;
    clickTiles: string;
    turnOffLights: string;
    fillAllCells: string;
    molecularDrawing: ({content}: {content: string}) => string;
    switchDirection: string;
    circleOpen: string;
    circleFilled: string;
    numDivisions: string;
    divisions: ({divRangeString}: {divRangeString: string}) => string;
    lineRange: ({lineRange}: {lineRange: string}) => string;
    lineNumber: ({lineNumber}: {lineNumber: string}) => string;
    symbolPassage: ({
        questionSymbol,
        questionNumber,
    }: {
        questionSymbol: string;
        questionNumber: string;
    }) => string;
    symbolQuestion: ({sentenceSymbol}: {sentenceSymbol: string}) => string;
    lineLabel: string;
    beginningPassage: string;
    beginningFootnotes: string;
    endPassage: string;
    questionMarker: ({number}: {number: string}) => string;
    circleMarker: ({number}: {number: string}) => string;
    sentenceMarker: ({number}: {number: string}) => string;
    dragHandles: string;
    tapAddPoints: string;
    false: string;
    true: string;
    no: string;
    yes: string;
    chooseCorrectNum: string;
    notNoneOfTheAbove: string;
    noneOfTheAbove: string;
    chooseNumAnswers: ({numCorrect}: {numCorrect: string}) => string;
    chooseAllAnswers: string;
    chooseOneAnswer: string;
    choiceCheckedCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
    scrollAnswers: string;
    scrollLeft: string;
    scrollRight: string;
    rightArrow: string;
    dontUnderstandUnits: string;
    checkSigFigs: string;
    answerNumericallyIncorrect: string;
    checkUnits: string;
    dontUnderstand: string;
    loading: string;
    videoTranscript: string;
    somethingWrong: string;
    videoWrapper: string;
    mathInputTitle: string;
    mathInputDescription: string;
    sin: string;
    cos: string;
    tan: string;
    simulationLoadFail: string;
    simulationLocaleWarning: string;
    selectAnAnswer: string;
    srGraphInstructions: string;
    srUnlimitedGraphInstructions: string;
    addPoint: string;
    removePoint: string;
    graphKeyboardPrompt: string;
    closePolygon: string;
    openPolygon: string;
    srPointAtCoordinates: ({
        num,
        x,
        y,
    }: {
        num: number;
        x: string;
        y: string;
    }) => string;
    srInteractiveElements: ({elements}: {elements: string}) => string;
    srNoInteractiveElements: string;
    srCircleGraph: string;
    srCircleShape: ({
        centerX,
        centerY,
    }: {
        centerX: string;
        centerY: string;
    }) => string;
    srCircleRadiusPointRight: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadiusPointLeft: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadius: ({radius}: {radius: number}) => string;
    srCircleOuterPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
        point4X,
        point4Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
        point4X: string;
        point4Y: string;
    }) => string;
    srLinearGraph: string;
    srLinearGraphPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearGraphSlopeIncreasing: string;
    srLinearGraphSlopeDecreasing: string;
    srLinearGraphSlopeHorizontal: string;
    srLinearGraphSlopeVertical: string;
    srLinearGraphXOnlyIntercept: ({xIntercept}: {xIntercept: string}) => string;
    srLinearGraphYOnlyIntercept: ({yIntercept}: {yIntercept: string}) => string;
    srLinearGraphBothIntercepts: ({
        xIntercept,
        yIntercept,
    }: {
        xIntercept: string;
        yIntercept: string;
    }) => string;
    srLinearGraphOriginIntercept: string;
    srLinearGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srAngleStartingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleEndingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleVertexWithAngleMeasure: ({
        x,
        y,
        angleMeasure,
    }: {
        x: string;
        y: string;
        angleMeasure: string;
    }) => string;
    srAngleGraphAriaLabel: string;
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        angleMeasure: string;
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srAngleInteractiveElements: ({
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srSingleSegmentGraphAriaLabel: string;
    srMultipleSegmentGraphAriaLabel: ({
        countOfSegments,
    }: {
        countOfSegments: number;
    }) => string;
    srMultipleSegmentIndividualLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        indexOfSegment,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        indexOfSegment: number;
    }) => string;
    srSingleSegmentLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srSegmentLength: ({length}: {length: string}) => string;
    srSingleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
    }) => string;
    srMultipleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
        indexOfSegment,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
        indexOfSegment: number;
    }) => string;
    srSegmentGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemGraph: string;
    srLinearSystemPoints: ({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemPoint({
        lineNumber,
        pointSequence,
        x,
        y,
    }: {
        lineNumber: number;
        pointSequence: number;
        x: string;
        y: string;
    }): string;
    srLinearSystemGrabHandle({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }): string;
    srLinearSystemIntersection({x, y}: {x: string; y: string}): string;
    srLinearSystemParallel: string;
    srRayGraph: string;
    srRayPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srRayEndpoint: ({x, y}: {x: string; y: string}) => string;
    srRayTerminalPoint: ({x, y}: {x: string; y: string}) => string;
    srRayGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srQuadraticGraph: string;
    srQuadraticFaceUp: string;
    srQuadraticFaceDown: string;
    srQuadraticGraphVertexOrigin: string;
    srQuadraticGraphVertexXAxis: string;
    srQuadraticGraphVertexYAxis: string;
    srQuadraticGraphVertexQuadrant: ({quadrant}: {quadrant: number}) => string;
    srQuadraticTwoXIntercepts: ({
        intercept1,
        intercept2,
    }: {
        intercept1: string;
        intercept2: string;
    }) => string;
    srQuadraticOneXIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticYIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticPointOrigin: ({pointNumber}: {pointNumber: number}) => string;
    srQuadraticPointAxis: ({
        pointNumber,
        x,
        y,
    }: {
        pointNumber: number;
        x: string;
        y: string;
    }) => string;
    srQuadraticPointQuadrant: ({
        pointNumber,
        x,
        y,
        quadrant,
    }: {
        pointNumber: number;
        x: string;
        y: string;
        quadrant: number;
    }) => string;
    srQuadraticInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
    }) => string;
    srPolygonGraph: string;
    srPolygonGraphCoordinatePlane: string;
    srPolygonGraphPointsNum: ({num}: {num: number}) => string;
    srPolygonGraphPointsOne: string;
    srPolygonElementsNum: ({num}: {num: number}) => string;
    srPolygonElementsOne: string;
    srPolygonPointAngleApprox: ({angle}: {angle: string}) => string;
    srPolygonPointAngle: ({angle}: {angle: number}) => string;
    srPolygonSideLength: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srPolygonSideLengthApprox: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srUnlimitedPolygonEmpty: string;
    srSinusoidGraph: string;
    srSinusoidRootPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMaxPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMinPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidFlatPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidDescription: ({
        minValue,
        maxValue,
        cycleStart,
        cycleEnd,
    }: {
        minValue: string;
        maxValue: string;
        cycleStart: string;
        cycleEnd: string;
    }) => string;
    srSinusoidInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
}`,signature:{properties:[{key:"characterCount",value:{name:"signature",type:"function",raw:"({used, num}: {used: number; num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{used: number; num: number}",signature:{properties:[{key:"used",value:{name:"number",required:!0}},{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"USER_INPUT_EMPTY",value:{name:"string",required:!0}},{key:"USER_INPUT_TOO_LONG",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"scrollAnswers",value:{name:"string",required:!0}},{key:"scrollLeft",value:{name:"string",required:!0}},{key:"scrollRight",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"srGraphInstructions",value:{name:"string",required:!0}},{key:"srUnlimitedGraphInstructions",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
    num,
    x,
    y,
}: {
    num: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    num: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"num",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srInteractiveElements",value:{name:"signature",type:"function",raw:"({elements}: {elements: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{elements: string}",signature:{properties:[{key:"elements",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srNoInteractiveElements",value:{name:"string",required:!0}},{key:"srCircleGraph",value:{name:"string",required:!0}},{key:"srCircleShape",value:{name:"signature",type:"function",raw:`({
    centerX,
    centerY,
}: {
    centerX: string;
    centerY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    centerX: string;
    centerY: string;
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointRight",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointLeft",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadius",value:{name:"signature",type:"function",raw:"({radius}: {radius: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{radius: number}",signature:{properties:[{key:"radius",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleOuterPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
    point4X,
    point4Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}},{key:"point4X",value:{name:"string",required:!0}},{key:"point4Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraph",value:{name:"string",required:!0}},{key:"srLinearGraphPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphSlopeIncreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeDecreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeHorizontal",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeVertical",value:{name:"string",required:!0}},{key:"srLinearGraphXOnlyIntercept",value:{name:"signature",type:"function",raw:"({xIntercept}: {xIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{xIntercept: string}",signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphYOnlyIntercept",value:{name:"signature",type:"function",raw:"({yIntercept}: {yIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{yIntercept: string}",signature:{properties:[{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphBothIntercepts",value:{name:"signature",type:"function",raw:`({
    xIntercept,
    yIntercept,
}: {
    xIntercept: string;
    yIntercept: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    xIntercept: string;
    yIntercept: string;
}`,signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}},{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphOriginIntercept",value:{name:"string",required:!0}},{key:"srLinearGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleStartingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleEndingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
    x,
    y,
    angleMeasure,
}: {
    x: string;
    y: string;
    angleMeasure: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    x: string;
    y: string;
    angleMeasure: string;
}`,signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"angleMeasure",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleGraphAriaLabel",value:{name:"string",required:!0}},{key:"srAngleGraphAriaDescription",value:{name:"signature",type:"function",raw:`({
    angleMeasure,
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleInteractiveElements",value:{name:"signature",type:"function",raw:`({
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphAriaLabel",value:{name:"string",required:!0}},{key:"srMultipleSegmentGraphAriaLabel",value:{name:"signature",type:"function",raw:`({
    countOfSegments,
}: {
    countOfSegments: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    countOfSegments: number;
}`,signature:{properties:[{key:"countOfSegments",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentIndividualLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    indexOfSegment,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentLength",value:{name:"signature",type:"function",raw:"({length}: {length: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{length: string}",signature:{properties:[{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
}: {
    endpointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
    indexOfSegment,
}: {
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemGraph",value:{name:"string",required:!0}},{key:"srLinearSystemPoints",value:{name:"signature",type:"function",raw:`({
    lineNumber,
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"lineNumber",value:{name:"number",required:!0}},{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemPoint",value:{name:"string",required:!0}},{key:"srLinearSystemGrabHandle",value:{name:"string",required:!0}},{key:"srLinearSystemIntersection",value:{name:"string",required:!0}},{key:"srLinearSystemParallel",value:{name:"string",required:!0}},{key:"srRayGraph",value:{name:"string",required:!0}},{key:"srRayPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayEndpoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayTerminalPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticGraph",value:{name:"string",required:!0}},{key:"srQuadraticFaceUp",value:{name:"string",required:!0}},{key:"srQuadraticFaceDown",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexOrigin",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexXAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexYAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexQuadrant",value:{name:"signature",type:"function",raw:"({quadrant}: {quadrant: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{quadrant: number}",signature:{properties:[{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticTwoXIntercepts",value:{name:"signature",type:"function",raw:`({
    intercept1,
    intercept2,
}: {
    intercept1: string;
    intercept2: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    intercept1: string;
    intercept2: string;
}`,signature:{properties:[{key:"intercept1",value:{name:"string",required:!0}},{key:"intercept2",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticOneXIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticYIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointOrigin",value:{name:"signature",type:"function",raw:"({pointNumber}: {pointNumber: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pointNumber: number}",signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointAxis",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
}: {
    pointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointQuadrant",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
    quadrant,
}: {
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraph",value:{name:"string",required:!0}},{key:"srPolygonGraphCoordinatePlane",value:{name:"string",required:!0}},{key:"srPolygonGraphPointsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraphPointsOne",value:{name:"string",required:!0}},{key:"srPolygonElementsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonElementsOne",value:{name:"string",required:!0}},{key:"srPolygonPointAngleApprox",value:{name:"signature",type:"function",raw:"({angle}: {angle: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: string}",signature:{properties:[{key:"angle",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonPointAngle",value:{name:"signature",type:"function",raw:"({angle}: {angle: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: number}",signature:{properties:[{key:"angle",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLength",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLengthApprox",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srUnlimitedPolygonEmpty",value:{name:"string",required:!0}},{key:"srSinusoidGraph",value:{name:"string",required:!0}},{key:"srSinusoidRootPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMaxPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMinPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidFlatPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidDescription",value:{name:"signature",type:"function",raw:`({
    minValue,
    maxValue,
    cycleStart,
    cycleEnd,
}: {
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}`,signature:{properties:[{key:"minValue",value:{name:"string",required:!0}},{key:"maxValue",value:{name:"string",required:!0}},{key:"cycleStart",value:{name:"string",required:!0}},{key:"cycleEnd",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"getDOMNodeForPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"getInputPaths",docblock:null,modifiers:[],params:[],returns:null},{name:"focusPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"blurPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null},{name:"emptyWidgets",docblock:`Returns an array of widget ids that are empty (meaning widgets where the
learner has not interacted with the widget yet or has not filled in all
fields).  For example, the \`interactive-graph\` widget is considered
empty if the graph is in the starting state.`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}},description:`Returns an array of widget ids that are empty (meaning widgets where the
learner has not interacted with the widget yet or has not filled in all
fields).  For example, the \`interactive-graph\` widget is considered
empty if the graph is in the starting state.`},{name:"_setWidgetProps",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:null},{name:"newProps",optional:!1,type:null},{name:"cb",optional:!1,type:null},{name:"silent",optional:!1,type:null}],returns:null},{name:"setInputValue",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:null},{name:"newValue",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"getUserInput",docblock:`Returns an array of the widget \`.getUserInput()\` results

TODO: can we remove this?
@deprecated use getUserInputMap`,modifiers:[],params:[],returns:{type:{name:"Array",elements:[{name:"union",raw:"UserInputArray | UserInput | null | undefined",elements:[{name:"UserInputArray"},{name:"UserInputRegistry[UserInputRegistry]",raw:"UserInputRegistry[keyof UserInputRegistry]"},{name:"null"},{name:"undefined"}]}],raw:`Array<
    UserInputArray | UserInput | null | undefined
>`}},description:"Returns an array of the widget `.getUserInput()` results\n\nTODO: can we remove this?"},{name:"getUserInputMap",docblock:"Returns an object of the widget `.getUserInput()` results",modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"UserInputRegistry",required:!0},value:{name:"UserInputRegistry[Property]",raw:"TRegistry[Property]"}}]}}},description:"Returns an object of the widget `.getUserInput()` results"},{name:"getWidgetIds",docblock:`Returns an array of all widget IDs in the order they occur in
the content.`,modifiers:[],params:[],returns:null,description:`Returns an array of all widget IDs in the order they occur in
the content.`},{name:"getPromptJSON",docblock:`Returns a JSON representation of the content and widgets
that can be passed to an LLM for prompt context.`,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    content: string;
    widgets: {
        [widgetId: string]: WidgetPromptJSON;
    };
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:`{
    [widgetId: string]: WidgetPromptJSON;
}`,signature:{properties:[{key:{name:"string"},value:{name:"union",raw:`| CategorizerPromptJSON
| DefinitionPromptJSON
| DropdownPromptJSON
| ExplanationPromptJSON
| ExpressionPromptJSON
| GradedGroupPromptJSON
| GradedGroupSetPromptJSON
| GrapherPromptJSON
| GroupPromptJSON
| ImagePromptJSON
| InputNumberPromptJSON
| LabelImagePromptJSON
| MatcherPromptJSON
| MatrixPromptJSON
| MockWidgetPromptJSON
| NumberLinePromptJSON
| NumericInputPromptJSON
| OrdererPromptJSON
| PassagePromptJSON
| PassageRefPromptJSON
| RadioPromptJSON
| SorterPromptJSON
| UnsupportedWidgetPromptJSON`,elements:[{name:"signature",type:"object",raw:`{
    type: "categorizer";
    options: {
        items: ReadonlyArray<string>;
        categories: ReadonlyArray<string>;
    };
    userInput: {
        itemToCategoryMapping: ReadonlyArray<number>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"categorizer"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    items: ReadonlyArray<string>;
    categories: ReadonlyArray<string>;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    itemToCategoryMapping: ReadonlyArray<number>;
}`,signature:{properties:[{key:"itemToCategoryMapping",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "definition";
    definition: string;
    togglePrompt: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"definition"',required:!0}},{key:"definition",value:{name:"string",required:!0}},{key:"togglePrompt",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "dropdown";
    options: {
        items: ReadonlyArray<string>;
    };
    userInput: {
        selectedIndex: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"dropdown"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    items: ReadonlyArray<string>;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    selectedIndex: number;
}`,signature:{properties:[{key:"selectedIndex",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "explanation";
    showPrompt: string;
    explanation: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"explanation"',required:!0}},{key:"showPrompt",value:{name:"string",required:!0}},{key:"explanation",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "expression";
    label?: string;
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"expression"',required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"intersection",raw:`RendererPromptJSON & {
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,elements:[{name:"RendererPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group"',required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"hint",value:{name:"union",raw:"RendererPromptJSON | string",elements:[{name:"RendererPromptJSON"},{name:"string"}],required:!0}}]}}],required:!0},{name:"signature",type:"object",raw:`{
    type: "graded-group-set";
    options: {
        groupCount: number;
        currentGroup: GradedGroupPromptJSON;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group-set"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    groupCount: number;
    currentGroup: GradedGroupPromptJSON;
}`,signature:{properties:[{key:"groupCount",value:{name:"number",required:!0}},{key:"currentGroup",value:{name:"intersection",raw:`RendererPromptJSON & {
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,elements:[{name:"RendererPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group"',required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"hint",value:{name:"union",raw:"RendererPromptJSON | string",elements:[{name:"RendererPromptJSON"},{name:"string"}],required:!0}}]}}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "grapher";
    options: {
        availableTypes: ReadonlyArray<string>;
        range: [x: [min: number, max: number], y: [min: number, max: number]];
        labels: ReadonlyArray<string>;
        tickStep: [number, number];
        gridStep?: [number, number];
        snapStep?: [number, number];
        backgroundImageUrl?: string | null;
    };
    userInput: GrapherAnswerTypes;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"grapher"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    availableTypes: ReadonlyArray<string>;
    range: [x: [min: number, max: number], y: [min: number, max: number]];
    labels: ReadonlyArray<string>;
    tickStep: [number, number];
    gridStep?: [number, number];
    snapStep?: [number, number];
    backgroundImageUrl?: string | null;
}`,signature:{properties:[{key:"availableTypes",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"range",value:{name:"tuple",raw:"[x: [min: number, max: number], y: [min: number, max: number]]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"tickStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"snapStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"backgroundImageUrl",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}}]},required:!0}},{key:"userInput",value:{name:"union",raw:`| {
      type: "absolute_value";
      // If \`coords\` is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [vertex: Coord, secondPoint: Coord];
  }
| {
      type: "exponential";
      // Two points along the asymptote line. Usually (always?) a
      // horizontal or vertical line.
      asymptote: [Coord, Coord];
      // Two points along the exponential curve. One end of the curve
      // trends towards the asymptote.
      // If \`coords\` is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "linear";
      // Two points along the straight line
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "logarithm";
      // Two points along the asymptote line.
      asymptote: [Coord, Coord];
      // Two points along the logarithmic curve. One end of the curve
      // trends towards the asymptote.
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "quadratic";
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [vertex: Coord, secondPoint: Coord];
  }
| {
      type: "sinusoid";
      // Two points on the same slope in the sinusoid wave line.
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "tangent";
      // Two points on the same slope in the tangent wave line.
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "absolute_value";
    // If \`coords\` is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [vertex: Coord, secondPoint: Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"absolute_value"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [vertex: Coord, secondPoint: Coord]",elements:[{name:"null"},{name:"tuple",raw:"[vertex: Coord, secondPoint: Coord]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "exponential";
    // Two points along the asymptote line. Usually (always?) a
    // horizontal or vertical line.
    asymptote: [Coord, Coord];
    // Two points along the exponential curve. One end of the curve
    // trends towards the asymptote.
    // If \`coords\` is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"exponential"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // Two points along the straight line
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "logarithm";
    // Two points along the asymptote line.
    asymptote: [Coord, Coord];
    // Two points along the logarithmic curve. One end of the curve
    // trends towards the asymptote.
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"logarithm"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [vertex: Coord, secondPoint: Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [vertex: Coord, secondPoint: Coord]",elements:[{name:"null"},{name:"tuple",raw:"[vertex: Coord, secondPoint: Coord]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Two points on the same slope in the sinusoid wave line.
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tangent";
    // Two points on the same slope in the tangent wave line.
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tangent"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}}],required:!0}}]}},{name:"intersection",raw:`RendererPromptJSON & {
    type: "group";
}`,elements:[{name:"RendererPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "group";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"group"',required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    type: "image";
    options: {
        altText: string;
        title: string;
        caption: string;
        imageUrl: string | null | undefined;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"image"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    altText: string;
    title: string;
    caption: string;
    imageUrl: string | null | undefined;
}`,signature:{properties:[{key:"altText",value:{name:"string",required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"caption",value:{name:"string",required:!0}},{key:"imageUrl",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "input-number";
    options: {
        simplify: string;
        answerType: string;
    };
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"input-number"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    simplify: string;
    answerType: string;
}`,signature:{properties:[{key:"simplify",value:{name:"string",required:!0}},{key:"answerType",value:{name:"string",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "label-image";
    options: {
        choices: ReadonlyArray<string>;
        imageUrl: string;
        imageAlt: string;
        markers: BaseMarker[];
    };
    userInput: {
        markers: UserInputMarker[];
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label-image"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    choices: ReadonlyArray<string>;
    imageUrl: string;
    imageAlt: string;
    markers: BaseMarker[];
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"imageUrl",value:{name:"string",required:!0}},{key:"imageAlt",value:{name:"string",required:!0}},{key:"markers",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    label: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}}]}}],raw:"BaseMarker[]",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    markers: UserInputMarker[];
}`,signature:{properties:[{key:"markers",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    selected?: ReadonlyArray<string>;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}}]}}],raw:"UserInputMarker[]",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "matcher";
    options: {
        labels: ReadonlyArray<string>;
        left: ReadonlyArray<string>;
        right: ReadonlyArray<string>;
        orderMatters: boolean;
    };
    userInput: {
        left: ReadonlyArray<string>;
        right: ReadonlyArray<string>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"matcher"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    labels: ReadonlyArray<string>;
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
    orderMatters: boolean;
}`,signature:{properties:[{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"orderMatters",value:{name:"boolean",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
}`,signature:{properties:[{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "matrix";
    options: {
        height: number;
        width: number;
    };
    userInput: {
        answerRows: ReadonlyArray<ReadonlyArray<number>>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"matrix"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    height: number;
    width: number;
}`,signature:{properties:[{key:"height",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    answerRows: ReadonlyArray<ReadonlyArray<number>>;
}`,signature:{properties:[{key:"answerRows",value:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "mock-widget";
    options: {
        value: string;
    };
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"mock-widget"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "number-line";
    options: {
        range: ReadonlyArray<number>;
        numDivisions: number;
        snapDivisions: number;
    };
    userInput: {
        numLinePosition: number;
        numDivisions: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"number-line"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    range: ReadonlyArray<number>;
    numDivisions: number;
    snapDivisions: number;
}`,signature:{properties:[{key:"range",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"numDivisions",value:{name:"number",required:!0}},{key:"snapDivisions",value:{name:"number",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    numLinePosition: number;
    numDivisions: number;
}`,signature:{properties:[{key:"numLinePosition",value:{name:"number",required:!0}},{key:"numDivisions",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "numeric-input";
    label: string;
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"numeric-input"',required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "orderer";
    options: {
        options: ReadonlyArray<string>;
    };
    userInput: {
        values: ReadonlyArray<string>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"orderer"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    options: ReadonlyArray<string>;
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    values: ReadonlyArray<string>;
}`,signature:{properties:[{key:"values",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "passage";
    options: {
        passageTitle: string;
        passageText: string;
        footnotes: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"passage"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    passageTitle: string;
    passageText: string;
    footnotes: string;
}`,signature:{properties:[{key:"passageTitle",value:{name:"string",required:!0}},{key:"passageText",value:{name:"string",required:!0}},{key:"footnotes",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "passage-ref";
    options: {
        passageNumber: number;
        referenceNumber: number;
        summaryText: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"passage-ref"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    passageNumber: number;
    referenceNumber: number;
    summaryText: string;
}`,signature:{properties:[{key:"passageNumber",value:{name:"number",required:!0}},{key:"referenceNumber",value:{name:"number",required:!0}},{key:"summaryText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "radio";
    hasNoneOfTheAbove: boolean;
    options: BasicOption[];
    userInput: {
        selectedOptions: ReadonlyArray<boolean>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"radio"',required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!0}},{key:"options",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]}}],raw:"BasicOption[]",required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    selectedOptions: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"selectedOptions",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "sorter";
    userInput: {
        values: ReadonlyArray<string>;
        changed: boolean;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sorter"',required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    values: ReadonlyArray<string>;
    changed: boolean;
}`,signature:{properties:[{key:"values",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"changed",value:{name:"boolean",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: UnsupportedWidget;
    message?: string;
    isSupported: boolean;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| "cs-program"
| "iframe"
| "interaction"
| "interactive-graph-unsupported"
| "measurer"
| "phet-simulation"
| "plotter"
| "python-program"
| "video"`,elements:[{name:"literal",value:'"cs-program"'},{name:"literal",value:'"iframe"'},{name:"literal",value:'"interaction"'},{name:"literal",value:'"interactive-graph-unsupported"'},{name:"literal",value:'"measurer"'},{name:"literal",value:'"phet-simulation"'},{name:"literal",value:'"plotter"'},{name:"literal",value:'"python-program"'},{name:"literal",value:'"video"'}],required:!0}},{key:"message",value:{name:"string",required:!1}},{key:"isSupported",value:{name:"boolean",required:!0}}]}}],required:!0}}]},required:!0}}]}}},description:`Returns a JSON representation of the content and widgets
that can be passed to an LLM for prompt context.`},{name:"score",docblock:`Scores the content.

@deprecated use scorePerseusItem`,modifiers:[],params:[],returns:{type:{name:"union",raw:`| {
      type: "invalid";
      message?: string | null | undefined;
      suppressAlmostThere?: boolean | null | undefined;
  }
| {
      type: "points";
      earned: number;
      total: number;
      message?: string | null | undefined;
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "invalid";
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"invalid"',required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "points";
    earned: number;
    total: number;
    message?: string | null | undefined;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"points"',required:!0}},{key:"earned",value:{name:"number",required:!0}},{key:"total",value:{name:"number",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}}]}}]}},description:"Scores the content."},{name:"handletranslationLintErrors",docblock:null,modifiers:[],params:[{name:"lintErrors",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",alias:"ReadonlyArray"}}],returns:null}],displayName:"Renderer",props:{content:{defaultValue:{value:'""',computed:!1},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},required:!1},images:{defaultValue:{value:"{}",computed:!1},required:!1},highlightedWidgets:{defaultValue:{value:"[]",computed:!1},required:!1},questionCompleted:{defaultValue:{value:"false",computed:!1},required:!1},showSolutions:{defaultValue:{value:'"none"',computed:!1},required:!1},onRender:{defaultValue:{value:"() => {}",computed:!1},required:!1},onInteractWithWidget:{defaultValue:{value:"function () {}",computed:!1},required:!1},findExternalWidgets:{defaultValue:{value:"() => []",computed:!1},required:!1},alwaysUpdate:{defaultValue:{value:"false",computed:!1},required:!1},reviewMode:{defaultValue:{value:"false",computed:!1},required:!1},serializedState:{defaultValue:{value:"null",computed:!1},required:!1},onSerializedStateUpdated:{defaultValue:{value:"() => {}",computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1}}};export{Kr as D,Me as J,D as P,Re as R,b as S,Br as a,$r as b,Jr as c,Zr as d,ni as e,ti as f,ei as g,wr as h,dr as i,W as j,zr as k,We as l,T as m,kt as p,Qr as r,ri as s};
