import{j as y}from"./jsx-runtime-63Ea5SlK.js";import{a as Ie}from"./version-akiLXZts.js";import{P as S,E as R}from"./perseus-error-l3K_anoI.js";import{g as mn}from"./_commonjsHelpers-4gQjN7DL.js";import{e as gn}from"./index-J2t_5nK1.js";import{c as ve}from"./index-dnMhQZ-1.js";import{_ as g,d as pn,$ as yn}from"./jquery-yG1GhClm.js";import{r as j}from"./index-6oxdNXpR.js";import{F as ke}from"./index-9gkyvru-.js";import{c as he}from"./asset-context-H6Iqp7Gi.js";import{P as cn}from"./i18n-context-ei4f54eq.js";import{L as H,b as qe,S as hn}from"./svg-image-3LTMuTsF.js";import{T as We}from"./tex-MX5FPdQh.js";import{Z as wn}from"./zoomable-_uYFBX1Q.js";import{Z as bn}from"./zoomable-tex-Jjwex-Ep.js";import{g as J,D as fn}from"./dependencies-CP7Uh8Kq.js";import{A as vn,C as we}from"./perseus-api-ooj0_ZRv.js";import{L as kn}from"./lint-CRWxUAIQ.js";import{U as qn}from"./util-_iDv4tVD.js";import{f as Tn,t as An,u as Rn,z as xn}from"./constants-iPV6vHZm.js";class K{static parse(e){return new ge(e).parse()}match(e){throw new S("Selector subclasses must implement match()",R.NotAllowed)}toString(){return"Unknown selector class"}}class ge{constructor(e){e=e.trim().replace(/\s+/g," "),this.tokens=e.match(ge.TOKENS)||[],this.tokenIndex=0}nextToken(){return this.tokens[this.tokenIndex]||""}consume(){this.tokenIndex++}isIdentifier(){const e=this.tokens[this.tokenIndex][0];return e>="a"&&e<="z"||e>="A"&&e<="Z"}skipSpace(){for(;this.nextToken()===" ";)this.consume()}parse(){const e=this.parseTreeSelector();let n=this.nextToken();if(!n)return e;const t=[e];for(;n;){if(n===",")this.consume();else throw new be("Expected comma");t.push(this.parseTreeSelector()),n=this.nextToken()}return new Pn(t)}parseTreeSelector(){this.skipSpace();let e=this.parseNodeSelector();for(;;){const n=this.nextToken();if(!n||n===",")break;if(n===" ")this.consume(),e=new On(e,this.parseNodeSelector());else if(n===">")this.consume(),e=new Sn(e,this.parseNodeSelector());else if(n==="+")this.consume(),e=new En(e,this.parseNodeSelector());else if(n==="~")this.consume(),e=new Nn(e,this.parseNodeSelector());else throw new be("Unexpected token: "+n)}return e}parseNodeSelector(){this.skipSpace();const e=this.nextToken();if(e==="*")return this.consume(),new Cn;if(this.isIdentifier())return this.consume(),new In(e);throw new be("Expected node type")}}ge.TOKENS=/([a-zA-Z][\w-]*)|(\d+)|[^\s]|(\s(?=[a-zA-Z\*]))/g;class be extends Error{constructor(e){super(e)}}class Pn extends K{constructor(e){super(),this.selectors=e}match(e){for(let n=0;n<this.selectors.length;n++){const a=this.selectors[n].match(e);if(a)return a}return null}toString(){let e="";for(let n=0;n<this.selectors.length;n++)e+=n>0?", ":"",e+=this.selectors[n].toString();return e}}class Cn extends K{match(e){return[e.currentNode()]}toString(){return"*"}}class In extends K{constructor(e){super(),this.type=e}match(e){const n=e.currentNode();return n.type===this.type?[n]:null}toString(){return this.type}}class pe extends K{constructor(e,n){super(),this.left=e,this.right=n}}class On extends pe{constructor(e,n){super(e,n)}match(e){const n=this.right.match(e);if(n)for(e=e.clone();e.hasParent();){e.goToParent();const t=this.left.match(e);if(t)return t.concat(n)}return null}toString(){return this.left.toString()+" "+this.right.toString()}}class Sn extends pe{constructor(e,n){super(e,n)}match(e){const n=this.right.match(e);if(n&&e.hasParent()){e=e.clone(),e.goToParent();const t=this.left.match(e);if(t)return t.concat(n)}return null}toString(){return this.left.toString()+" > "+this.right.toString()}}class En extends pe{constructor(e,n){super(e,n)}match(e){const n=this.right.match(e);if(n&&e.hasPreviousSibling()){e=e.clone(),e.goToPreviousSibling();const t=this.left.match(e);if(t)return t.concat(n)}return null}toString(){return this.left.toString()+" + "+this.right.toString()}}class Nn extends pe{constructor(e,n){super(e,n)}match(e){const n=this.right.match(e);if(n)for(e=e.clone();e.hasPreviousSibling();){e.goToPreviousSibling();const t=this.left.match(e);if(t)return t.concat(n)}return null}toString(){return this.left.toString()+" ~ "+this.right.toString()}}const L=class L{constructor(e,n,t,a,i,o){if(!t&&!a)throw new S("Lint rules must have a selector or pattern",R.InvalidInput,{metadata:{name:e}});this.name=e||"unnamed rule",this.severity=n||L.Severity.BULK_WARNING,this.selector=t||L.DEFAULT_SELECTOR,this.pattern=a||null,typeof i=="function"?(this.lint=i,this.message=null):(this.lint=(...s)=>this._defaultLintFunction(...s),this.message=i),this.applies=o||function(){return!0}}static makeRule(e){return new L(e.name,e.severity,e.selector?K.parse(e.selector):null,L.makePattern(e.pattern),e.lint||e.message,e.applies)}check(e,n,t,a){const i=this.selector.match(n);if(!i)return null;let o;if(this.pattern?o=t.match(this.pattern):o=L.FakePatternMatch(t,t,0),!o)return null;try{const s=this.lint(n,t,i,o,a);return s?typeof s=="string"?{rule:this.name,severity:this.severity,message:s,start:0,end:t.length}:{rule:this.name,severity:this.severity,message:s.message,start:s.start,end:s.end}:null}catch(s){return{rule:"lint-rule-failure",message:`Exception in rule ${this.name}: ${s.message}
Stack trace:
${s.stack}`,start:0,end:t.length}}}_defaultLintFunction(e,n,t,a,i){return{message:this.message||"",start:a.index,end:a.index+a[0].length}}static makePattern(e){if(!e)return null;if(e instanceof RegExp)return e;if(e[0]==="/"){const n=e.lastIndexOf("/"),t=e.substring(1,n),a=e.substring(n+1);return new RegExp(t,a)}return new RegExp(e)}static FakePatternMatch(e,n,t){const a=[n];return a.index=t,a.input=e,a}};L.Severity={ERROR:1,WARNING:2,GUIDELINE:3,BULK_WARNING:4};let m=L;m.DEFAULT_SELECTOR=K.parse("text");const jn=/\/\/([^\/]+)/;function Wn(r){if(!r)return"";const e=r.match(jn);return e?e[1]:""}const Ln=m.makeRule({name:"absolute-url",severity:m.Severity.GUIDELINE,selector:"link, image",lint:function(r,e,n,t){const a=n[0].target,i=Wn(a);if(i==="khanacademy.org"||i.endsWith(".khanacademy.org"))return`Don't use absolute URLs:
When linking to KA content or images, omit the
https://www.khanacademy.org URL prefix.
Use a relative URL beginning with / instead.`}}),Mn=m.makeRule({name:"blockquoted-math",severity:m.Severity.WARNING,selector:"blockQuote math, blockQuote blockMath",message:`Blockquoted math:
math should not be indented.`}),Fn=m.makeRule({name:"blockquoted-widget",severity:m.Severity.WARNING,selector:"blockQuote widget",message:`Blockquoted widget:
widgets should not be indented.`}),_n=m.makeRule({name:"double-spacing-after-terminal",severity:m.Severity.BULK_WARNING,selector:"paragraph",pattern:/[.!\?] {2}/i,message:`Use a single space after a sentence-ending period, or
any other kind of terminal punctuation.`});function Dn(r,e){return`Answer requires a button not found in the button sets: ${r} (in ${e})`}const Gn={"\\sqrt":"prealgebra","\\sin":"trig","\\cos":"trig","\\tan":"trig","\\log":"logarithms","\\ln":"logarithms"},Xn=m.makeRule({name:"expression-widget",severity:m.Severity.WARNING,selector:"widget",lint:function(r,e,n,t,a){var l;if(r.currentNode().widgetType!=="expression")return;const i=r.currentNode().id;if(!i)return;const o=(l=a==null?void 0:a.widgets)==null?void 0:l[i];if(!o)return;const s=o.options.answerForms,u=o.options.buttonSets;for(const d of s)for(const[p,w]of Object.entries(Gn))if(d.value.includes(p)&&!u.includes(w))return Dn(p,w)}}),zn=m.makeRule({name:"extra-content-spacing",selector:"paragraph",pattern:/\s+$/,applies:function(r){return(r==null?void 0:r.contentType)==="article"},message:"No extra whitespace at the end of content blocks."}),Un=m.makeRule({name:"heading-level-1",severity:m.Severity.WARNING,selector:"heading",lint:function(r,e,n,t){if(n[0].level===1)return`Don't use level-1 headings:
Begin headings with two or more # characters.`}}),Yn=m.makeRule({name:"heading-level-skip",severity:m.Severity.WARNING,selector:"heading ~ heading",lint:function(r,e,n,t){const a=n[1],i=n[0];if(a.level>i.level+1)return`Skipped heading level:
this heading is level ${a.level} but
the previous heading was level ${i.level}`}}),Vn=m.makeRule({name:"heading-sentence-case",severity:m.Severity.GUIDELINE,selector:"heading",pattern:/^\W*[a-z]/,message:`First letter is lowercase:
the first letter of a heading should be capitalized.`}),Hn={and:!0,nor:!0,but:!0,the:!0,for:!0};function Kn(r){const e=r[0];return e===e.toUpperCase()}const Bn=m.makeRule({name:"heading-title-case",severity:m.Severity.GUIDELINE,selector:"heading",pattern:/[^\s:]\s+[A-Z]+[a-z]/,locale:"en",lint:function(r,e,n,t){let i=e.trim().split(/\s+/);if(i.shift(),i=i.filter(o=>o.length>2&&!Hn.hasOwnProperty(o)),i.length>=3&&i.every(o=>Kn(o)))return`Title-case heading:
This heading appears to be in title-case, but should be sentence-case.
Only capitalize the first letter and proper nouns.`}}),$n=m.makeRule({name:"image-alt-text",severity:m.Severity.WARNING,selector:"image",lint:function(r,e,n,t){const a=n[0];if(!a.alt||!a.alt.trim())return`Images should have alt text:
for accessibility, all images should have alt text.
Specify alt text inside square brackets after the !.`;if(a.alt.length<8)return`Images should have alt text:
for accessibility, all images should have descriptive alt text.
This image's alt text is only ${a.alt.length} characters long.`}}),Jn=m.makeRule({name:"image-in-table",severity:m.Severity.BULK_WARNING,selector:"table image",message:`Image in table:
do not put images inside of tables.`}),Qn=m.makeRule({name:"image-spaces-around-urls",severity:m.Severity.ERROR,selector:"image",lint:function(r,e,n,t,a){const o=n[0].target;if(a&&a.content){const s=a.content.indexOf(o);if(s===-1)return;if(a.content[s-1]!=="("||a.content[s+o.length]!==")")return`Whitespace before or after image url:
For images, don't include any space or newlines after '(' or before ')'.
Whitespace in image URLs causes translation difficulties.`}}}),Zn=m.makeRule({name:"image-widget",severity:m.Severity.WARNING,selector:"widget",lint:function(r,e,n,t,a){if(r.currentNode().widgetType!=="image")return;const i=r.currentNode().id;if(!i)return;const o=a&&a.widgets&&a.widgets[i];if(!o)return;const s=o.options.alt;if(!s)return`Images should have alt text:
for accessibility, all images should have a text description.
Add a description in the "Alt Text" box of the image widget.`;if(s.trim().length<8)return`Images should have alt text:
for accessibility, all images should have descriptive alt text.
This image's alt text is only ${s.trim().length} characters long.`;if(o.options.caption&&o.options.caption.match(/[^\\]\$/))return`No math in image captions:
Don't include math expressions in image captions.`}}),er=m.makeRule({name:"link-click-here",severity:m.Severity.WARNING,selector:"link",pattern:/click here/i,message:`Inappropriate link text:
Do not use the words "click here" in links.`}),nr=m.makeRule({name:"long-paragraph",severity:m.Severity.GUIDELINE,selector:"paragraph",pattern:/^.{501,}/,lint:function(r,e,n,t){return`Paragraph too long:
This paragraph is ${e.length} characters long.
Shorten it to 500 characters or fewer.`}}),rr=m.makeRule({name:"math-adjacent",severity:m.Severity.WARNING,selector:"blockMath+blockMath",message:`Adjacent math blocks:
combine the blocks between \\begin{align} and \\end{align}`}),tr=m.makeRule({name:"math-align-extra-break",severity:m.Severity.WARNING,selector:"blockMath",pattern:/(\\{2,})\s*\\end{align}/,message:`Extra space at end of block:
Don't end an align block with backslashes`}),ar=m.makeRule({name:"math-align-linebreaks",severity:m.Severity.WARNING,selector:"blockMath",pattern:/\\begin{align}[\s\S]*\\\\[\s\S]+\\end{align}/,lint:function(r,e,n,t){let a=t[0];for(;a.length;){const i=a.indexOf("\\\\");if(i===-1)return;a=a.substring(i+2);const o=a.match(/^\s*\\\\\s*(?!\\\\)/);if(!o)return"Use four backslashes between lines of an align block";a=a.substring(o[0].length)}}}),ir=m.makeRule({name:"math-empty",severity:m.Severity.WARNING,selector:"math, blockMath",pattern:/^$/,message:"Empty math: don't use $$ in your markdown."}),sr=m.makeRule({name:"math-font-size",severity:m.Severity.GUIDELINE,selector:"math, blockMath",pattern:/\\(tiny|Tiny|small|large|Large|LARGE|huge|Huge|scriptsize|normalsize)\s*{/,message:`Math font size:
Don't change the default font size with \\Large{} or similar commands`}),or=m.makeRule({name:"math-frac",severity:m.Severity.GUIDELINE,selector:"math, blockMath",pattern:/\\frac[ {]/,message:"Use \\dfrac instead of \\frac in your math expressions."}),ur=m.makeRule({name:"math-nested",severity:m.Severity.ERROR,selector:"math, blockMath",pattern:/\\text{[^$}]*\$[^$}]*\$[^}]*}/,message:`Nested math:
Don't nest math expressions inside \\text{} blocks`}),lr=m.makeRule({name:"math-starts-with-space",severity:m.Severity.GUIDELINE,selector:"math, blockMath",pattern:/^\s*(~|\\qquad|\\quad|\\,|\\;|\\:|\\ |\\!|\\enspace|\\phantom)/,message:`Math starts with space:
math should not be indented. Do not begin math expressions with
LaTeX space commands like ~, \\;, \\quad, or \\phantom`}),dr=m.makeRule({name:"math-text-empty",severity:m.Severity.WARNING,selector:"math, blockMath",pattern:/\\text{\s*}/,message:"Empty \\text{} block in math expression"}),mr=m.makeRule({name:"math-without-dollars",severity:m.Severity.GUIDELINE,pattern:/\\\w+{[^}]*}|{|}/,message:`This looks like LaTeX:
did you mean to put it inside dollar signs?`}),gr=m.makeRule({name:"nested-lists",severity:m.Severity.WARNING,selector:"list list",message:`Nested lists:
nested lists are hard to read on mobile devices;
do not use additional indentation.`}),pr=m.makeRule({name:"static-widget-in-question-stem",severity:m.Severity.WARNING,selector:"widget",lint:(r,e,n,t,a)=>{var s;if((a==null?void 0:a.contentType)!=="exercise"||a.stack.includes("hint"))return;const i=r.currentNode().id;if(!i)return;const o=(s=a==null?void 0:a.widgets)==null?void 0:s[i];if(o&&o.static)return"Widget in question stem is static (non-interactive)."}}),yr=m.makeRule({name:"table-missing-cells",severity:m.Severity.WARNING,selector:"table",lint:function(r,e,n,t){const a=n[0],i=a.header.length,o=a.cells.map(s=>s.length);for(let s=0;s<o.length;s++)if(o[s]!==i)return`Table rows don't match header:
The table header has ${i} cells, but
Row ${s+1} has ${o[s]} cells.`}}),cr=m.makeRule({name:"unbalanced-code-delimiters",severity:m.Severity.ERROR,pattern:/[`~]+/,message:`Unbalanced code delimiters:
code blocks should begin and end with the same type and number of delimiters`}),hr=m.makeRule({name:"unescaped-dollar",severity:m.Severity.ERROR,selector:"unescapedDollar",message:`Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`}),wr=m.makeRule({name:"widget-in-table",severity:m.Severity.BULK_WARNING,selector:"table widget",message:`Widget in table:
do not put widgets inside of tables.`}),br=[Ln,Mn,Fn,_n,Xn,zn,Un,Yn,Vn,Bn,$n,Jn,er,nr,rr,tr,ar,ir,sr,or,ur,lr,dr,gr,pr,yr,hr,wr,mr,cr,Qn,Zn];class Y{constructor(e){this.root=e}static isNode(e){return e&&typeof e=="object"&&typeof e.type=="string"}static isTextNode(e){return Y.isNode(e)&&e.type==="text"&&typeof e.content=="string"}traverse(e){this._traverse(this.root,new Oe(this.root),e)}_traverse(e,n,t){let a="";if(Y.isNode(e)){const i=e;n._containers.push(i),n._ancestors.push(i),typeof i.content=="string"&&(a=i.content),Object.keys(i).forEach(s=>{if(s==="type")return;const u=i[s];u&&typeof u=="object"&&(n._indexes.push(s),a+=this._traverse(u,n,t),n._indexes.pop())}),n._currentNode=n._ancestors.pop(),n._containers.pop(),t(i,n,a)}else if(Array.isArray(e)){const i=e;n._containers.push(i);let o=0;for(;o<i.length;)n._indexes.push(o),a+=this._traverse(i[o],n,t),o=n._indexes.pop()+1;n._containers.pop()}return a}}class Oe{constructor(e){this.root=e,this._currentNode=null,this._containers=new Q,this._indexes=new Q,this._ancestors=new Q}currentNode(){return this._currentNode||this.root}parent(){return this._ancestors.top()}ancestors(){return this._ancestors.values()}nextSibling(){const e=this._containers.top();if(!e||!Array.isArray(e))return null;const n=this._indexes.top();return e.length>n+1?e[n+1]:null}previousSibling(){const e=this._containers.top();if(!e||!Array.isArray(e))return null;const n=this._indexes.top();return n>0?e[n-1]:null}removeNextSibling(){const e=this._containers.top();if(e&&Array.isArray(e)){const n=this._indexes.top();if(e.length>n+1)return e.splice(n+1,1)[0]}return null}replace(...e){const n=this._containers.top();if(!n)throw new S("Can't replace the root of the tree",R.Internal);if(Array.isArray(n)){const t=this._indexes.top();n.splice(t,1,...e),this._indexes.pop(),this._indexes.push(t+e.length-1)}else{const t=this._indexes.top();e.length===0?delete n[t]:e.length===1?n[t]=e[0]:n[t]=e}}hasPreviousSibling(){return Array.isArray(this._containers.top())&&this._indexes.top()>0}goToPreviousSibling(){if(!this.hasPreviousSibling())throw new S("goToPreviousSibling(): node has no previous sibling",R.Internal);this._currentNode=this.previousSibling();const e=this._indexes.pop();this._indexes.push(e-1)}hasParent(){return this._ancestors.size()!==0}goToParent(){if(!this.hasParent())throw new S("goToParent(): node has no ancestor",R.NotAllowed);for(this._currentNode=this._ancestors.pop();this._containers.size()&&this._containers.top()[this._indexes.top()]!==this._currentNode;)this._containers.pop(),this._indexes.pop()}clone(){const e=new Oe(this.root);return e._currentNode=this._currentNode,e._containers=this._containers.clone(),e._indexes=this._indexes.clone(),e._ancestors=this._ancestors.clone(),e}equals(e){return this.root===e.root&&this._currentNode===e._currentNode&&this._containers.equals(e._containers)&&this._indexes.equals(e._indexes)&&this._ancestors.equals(e._ancestors)}}class Q{constructor(e){this.stack=e?e.slice(0):[]}push(e){this.stack.push(e)}pop(){return this.stack.pop()}top(){return this.stack[this.stack.length-1]}values(){return this.stack.slice(0)}size(){return this.stack.length}toString(){return this.stack.toString()}clone(){return new Q(this.stack)}equals(e){if(!e||!e.stack||e.stack.length!==this.stack.length)return!1;for(let n=0;n<this.stack.length;n++)if(this.stack[n]!==e.stack[n])return!1;return!0}}const fr="@khanacademy/perseus-linter",vr="__lib_version__";Ie(fr,vr);var Ve={exports:{}};function ye(r){return function(){return r}}var D=function(){};D.thatReturns=ye;D.thatReturnsFalse=ye(!1);D.thatReturnsTrue=ye(!0);D.thatReturnsNull=ye(null);D.thatReturnsThis=function(){return this};D.thatReturnsArgument=function(r){return r};var kr=D;function qr(r,e,n,t,a,i,o,s){if(!r){var u;if(e===void 0)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,t,a,i,o,s],d=0;u=new Error(e.replace(/%s/g,function(){return l[d++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}}var Tr=qr,Ar="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Rr=Ar,xr=kr,Pr=Tr,Cr=Rr,Ir=function(){function r(t,a,i,o,s,u){u!==Cr&&Pr(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}r.isRequired=r;function e(){return r}var n={array:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:e,element:r,instanceOf:e,node:r,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e};return n.checkPropTypes=xr,n.PropTypes=n,n};Ve.exports=Ir();var Or=Ve.exports;const F=mn(Or);F.shape({contentType:F.string,highlightLint:F.bool,paths:F.arrayOf(F.string),stack:F.arrayOf(F.string)});const He={contentType:"",highlightLint:!1,paths:[],stack:[]},Sr=br.filter(r=>r.severity<m.Severity.BULK_WARNING);function Er(r,e,n,t=Sr){const a=[],i=new Y(r);i.traverse((u,l,d)=>{if(Y.isTextNode(u)){let p=l.nextSibling();for(;Y.isTextNode(p);)u.content+=p.content,l.removeNextSibling(),p=l.nextSibling()}});let o=[],s=!1;return i.traverse((u,l,d)=>{const p=[],w=t.filter(c=>c.applies(e)),q=[...e.stack];q.push(u.type);const A={...e,stack:q.join(".")};if(w.forEach(c=>{const f=c.check(u,l,d,A);f&&((f.start||f.end)&&(f.target=d.substring(f.start,f.end)),a.push(f),n&&p.push(f))}),!!n&&(u.type==="table"?(o.length&&p.push(...o),s=!1,o=[]):s||(s=l.ancestors().some(c=>c.type==="table")),s&&p.length&&o.push(...p),p.length))if(p.sort((c,f)=>c.severity-f.severity),u.type!=="text"||p.length>1)l.replace({type:"lint",content:u,message:p.map(c=>c.message).join(`

`),ruleName:p[0].rule,blockHighlight:A.blockHighlight,insideTable:s,severity:p[0].severity});else{const c=u.content,f=p[0],x=f.start||0,I=f.end||c.length,M=c.substring(0,x),P=c.substring(x,I),ne=c.substring(I),re=[];M&&re.push({type:"text",content:M}),re.push({type:"lint",content:{type:"text",content:P},message:f.message,ruleName:f.rule,insideTable:s,severity:f.severity}),ne&&re.push({type:"text",content:ne}),l.replace(...re)}}),a}function Nr(r,e){const n=r.stack||[];return{...r,stack:n.concat(e)}}const jr={activeDefinitionId:null,setActiveDefinitionId:()=>{}},Ke=j.createContext(jr);class Te extends j.Component{constructor(){super(...arguments),this.state={activeDefinitionId:null},this.setActiveDefinitionId=e=>{this.setState(n=>({activeDefinitionId:e}))}}render(){const{children:e}=this.props,{activeDefinitionId:n}=this.state,{setActiveDefinitionId:t}=this;return y.jsx(Ke.Provider,{value:{activeDefinitionId:n,setActiveDefinitionId:t},children:e})}}const wa=Ke.Consumer;Te.__docgenInfo={description:"",methods:[{name:"setActiveDefinitionId",docblock:null,modifiers:[],params:[{name:"activeDefinitionId",optional:!0,type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]}}],returns:{type:{name:"void"}}}],displayName:"DefinitionProvider",props:{children:{required:!0,tsType:{name:"any"},description:""}}};class N extends j.Component{constructor(e){super(e),this.state={error:""}}componentDidCatch(e,n){var t,a;this.setState({error:e.toString()}),(a=(t=this.props).onError)==null||a.call(t,e,n),H.error("Unhandled Perseus error: "+e.message,R.Internal,{cause:e,loggedMetadata:{componentStack:n&&"componentStack"in n?n.componentStack:"componentStack not provided",...this.props.metadata}})}render(){return this.state.error?y.jsxs("svg",{height:"16",width:"16",viewBox:"0 0 16 16",role:"img",children:[y.jsx("title",{children:"Rendering Error!"}),y.jsx("path",{d:"m8 16c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-3c0.55 0 1-0.45 1-1s-0.45-1-1-1-1 0.45-1 1 0.45 1 1 1zm0-9c-0.55 0-1 0.45-1 1v4c0 0.55.45 1 1 1s1-0.45 1-1v-4c0-0.55-0.45-1-1-1z",fill:"#d92916",fillRule:"evenodd"})]}):this.props.children}}N.__docgenInfo={description:"",methods:[],displayName:"ErrorBoundary",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},metadata:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:""},onError:{required:!1,tsType:{name:"signature",type:"function",raw:"(error: Error, info: any) => void",signature:{arguments:[{type:{name:"Error"},name:"error"},{type:{name:"any"},name:"info"}],return:{name:"void"}}},description:""}}};function Wr(){}class Lr{constructor(e,n,t,a){this._track=i=>{this._tracked&&!this.setting||(this._tracked=!0,this.trackApi({type:this.widgetType,id:this.widgetID,...i}))},e?(this._tracked=!1,this.trackApi=e,this.widgetType=n,this.widgetID=t,this.setting=a,this.track=this._track):this.track=Wr}}const Mr="@khanacademy/simple-markdown",Fr="__lib_version__";Ie(Mr,Fr);var _r=/\r\n?/g,Dr=/\t/g,Gr=/\f/g,Be=function(r){return r.replace(_r,`
`).replace(Gr,"").replace(Dr,"    ")},$e=function(r,e){var n=r||{};if(e!=null)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n},Je=function(r,e){var n=Object.keys(r).filter(function(o){var s=r[o];if(s==null||s.match==null)return!1;var u=s.order;return(typeof u!="number"||!isFinite(u))&&typeof console<"u"&&console.warn("simple-markdown: Invalid order for rule `"+o+"`: "+String(u)),!0});n.sort(function(o,s){var u=r[o],l=r[s],d=u.order,p=l.order;if(d!==p)return d-p;var w=u.quality?0:1,q=l.quality?0:1;return w!==q?w-q:o<s?-1:o>s?1:0});var t,a=function(o,s){var u=[];for(s=s||t,t=s;o;){var l=null,d=null,p=null,w=NaN,q=0,A=n[0],c=r[A];do{var f=c.order,x=s.prevCapture==null?"":s.prevCapture[0],I=c.match(o,s,x);if(I){var M=c.quality?c.quality(I,s,x):0;M<=w||(l=A,d=c,p=I,w=M)}q++,A=n[q],c=r[A]}while(c&&(!p||c.order===f&&c.quality));if(d==null||p==null)throw new Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '"+n[n.length-1]+`'. It seems to not match the following source:
`+o);if(p.index)throw new Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?");var P=d.parse(p,a,s);if(Array.isArray(P))Array.prototype.push.apply(u,P);else{if(P==null||typeof P!="object")throw new Error(`parse() function returned invalid parse result: '${P}'`);P.type==null&&(P.type=l),u.push(P)}s.prevCapture=p,o=o.substring(s.prevCapture[0].length)}return u},i=function(o,s){return t=$e(s,e),!t.inline&&!t.disableAutoBlockNewlines&&(o=o+`

`),t.prevCapture=null,a(Be(o),t)};return i},C=function(r){var e=function(n,t,a){return t.inline?r.exec(n):null};return e.regex=r,e},E=function(r){var e=function(n,t){return t.inline?null:r.exec(n)};return e.regex=r,e},Ae=function(r){var e=function(n,t){return r.exec(n)};return e.regex=r,e},Xr=typeof Symbol=="function"&&Symbol.for&&Symbol.for("react.element")||60103,v=function(r,e,n){var t={$$typeof:Xr,type:r,key:e??void 0,ref:null,props:n,_owner:null};return t},T=function(r,e,n,t){n=n||{},t=typeof t<"u"?t:!0;var a="";for(var i in n){var o=n[i];Object.prototype.hasOwnProperty.call(n,i)&&o&&(a+=" "+V(i)+'="'+V(o)+'"')}var s="<"+r+a+">";return t?s+e+"</"+r+">":s},zr={},$=function(r){if(r==null)return null;try{var e=new URL(r,"https://localhost").protocol;if(e.indexOf("javascript:")===0||e.indexOf("vbscript:")===0||e.indexOf("data:")===0)return null}catch{return null}return r},Ur=/[<>&"']/g,Yr={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#96;"},V=function(r){return String(r).replace(Ur,function(e){return Yr[e]})},Vr=/\\([^0-9A-Za-z\s])/g,Re=function(r){return r.replace(Vr,"$1")},ue=function(r,e,n){var t=n.inline||!1;n.inline=!0;var a=r(e,n);return n.inline=t,a},Hr=function(r,e,n){var t=n.inline||!1;n.inline=!1;var a=r(e+`

`,n);return n.inline=t,a},te=function(r,e,n){return{content:ue(e,r[1],n)}},fe=function(){return{}},le="(?:[*+-]|\\d+\\.)",Qe="( *)("+le+") +",Le=new RegExp("^"+Qe),Kr=new RegExp(Qe+"[^\\n]*(?:\\n(?!\\1"+le+` )[^\\n]*)*(
|$)`,"gm"),Ze=/\n{2,}$/,Br=/^ (?= *`)|(` *) $/g,$r=Ze,Me=/ *\n+$/,Jr=new RegExp("^( *)("+le+`) [\\s\\S]+?(?:
{2,}(?! )(?!\\1`+le+` )\\n*|\\s*
*$)`),Qr=/(?:^|\n)( *)$/,ae=function(){var r=/^ *\| *| *\| *$/g,e=/ *$/,n=/^ *-+: *$/,t=/^ *:-+: *$/,a=/^ *:-+ *$/,i=function(d){return n.test(d)?"right":t.test(d)?"center":a.test(d)?"left":null},o=function(d,p,w,q){q&&(d=d.replace(r,""));var A=d.trim().split("|");return A.map(i)},s=function(d,p,w,q){var A=w.inTable;w.inTable=!0;var c=p(d.trim(),w);w.inTable=A;var f=[[]];return c.forEach(function(x,I){x.type==="tableSeparator"?(!q||I!==0&&I!==c.length-1)&&f.push([]):(x.type==="text"&&(c[I+1]==null||c[I+1].type==="tableSeparator")&&(x.content=x.content.replace(e,"")),f[f.length-1].push(x))}),f},u=function(d,p,w,q){var A=d.trim().split(`
`);return A.map(function(c){return s(c,p,w,q)})},l=function(d){return function(p,w,q){q.inline=!0;var A=s(p[1],w,q,d),c=o(p[2],w,q,d),f=u(p[3],w,q,d);return q.inline=!1,{type:"table",header:A,align:c,cells:f}}};return{parseTable:l(!0),parseNpTable:l(!1),TABLE_REGEX:/^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,NPTABLE_REGEX:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/}}(),ie="(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*",Fe=`\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`,Zr=/mailto:/i,_e=function(r,e,n){var t=(r[2]||r[1]).replace(/\s+/g," ").toLowerCase();if(e._defs&&e._defs[t]){var a=e._defs[t];n.target=a.target,n.title=a.title}return e._refs=e._refs||{},e._refs[t]=e._refs[t]||[],e._refs[t].push(n),n},b=0,ee={Array:{react:function(r,e,n){for(var t=n.key,a=[],i=0,o=0;i<r.length;i++,o++){n.key=""+i;var s=r[i];if(s.type==="text")for(s={type:"text",content:s.content};i+1<r.length&&r[i+1].type==="text";i++)s.content+=r[i+1].content;a.push(e(s,n))}return n.key=t,a},html:function(r,e,n){for(var t="",a=0;a<r.length;a++){var i=r[a];if(i.type==="text")for(i={type:"text",content:i.content};a+1<r.length&&r[a+1].type==="text";a++)i.content+=r[a+1].content;t+=e(i,n)}return t}},heading:{order:b++,match:E(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),parse:function(r,e,n){return{level:r[1].length,content:ue(e,r[2].trim(),n)}},react:function(r,e,n){return v("h"+r.level,n.key,{children:e(r.content,n)})},html:function(r,e,n){return T("h"+r.level,e(r.content,n))}},nptable:{order:b++,match:E(ae.NPTABLE_REGEX),parse:ae.parseNpTable,react:null,html:null},lheading:{order:b++,match:E(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),parse:function(r,e,n){return{type:"heading",level:r[2]==="="?1:2,content:ue(e,r[1],n)}},react:null,html:null},hr:{order:b++,match:E(/^( *[-*_]){3,} *(?:\n *)+\n/),parse:fe,react:function(r,e,n){return v("hr",n.key,{"aria-hidden":!0})},html:function(r,e,n){return'<hr aria-hidden="true">'}},codeBlock:{order:b++,match:E(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),parse:function(r,e,n){var t=r[0].replace(/^    /gm,"").replace(/\n+$/,"");return{lang:void 0,content:t}},react:function(r,e,n){var t=r.lang?"markdown-code-"+r.lang:void 0;return v("pre",n.key,{children:v("code",null,{className:t,children:r.content})})},html:function(r,e,n){var t=r.lang?"markdown-code-"+r.lang:void 0,a=T("code",V(r.content),{class:t});return T("pre",a)}},fence:{order:b++,match:E(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),parse:function(r,e,n){return{type:"codeBlock",lang:r[2]||void 0,content:r[3]}},react:null,html:null},blockQuote:{order:b++,match:E(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),parse:function(r,e,n){var t=r[0].replace(/^ *> ?/gm,"");return{content:e(t,n)}},react:function(r,e,n){return v("blockquote",n.key,{children:e(r.content,n)})},html:function(r,e,n){return T("blockquote",e(r.content,n))}},list:{order:b++,match:function(r,e){var n=e.prevCapture==null?"":e.prevCapture[0],t=Qr.exec(n),a=e._list||!e.inline;return t&&a?(r=t[1]+r,Jr.exec(r)):null},parse:function(r,e,n){var t=r[2],a=t.length>1,i=a?+t:void 0,o=r[0].replace($r,`
`).match(Kr),s=!1,u=o.map(function(l,d){var p=Le.exec(l),w=p?p[0].length:0,q=new RegExp("^ {1,"+w+"}","gm"),A=l.replace(q,"").replace(Le,""),c=d===o.length-1,f=A.indexOf(`

`)!==-1,x=f||c&&s;s=x;var I=n.inline,M=n._list;n._list=!0;var P;x?(n.inline=!1,P=A.replace(Me,`

`)):(n.inline=!0,P=A.replace(Me,""));var ne=e(P,n);return n.inline=I,n._list=M,ne});return{ordered:a,start:i,items:u}},react:function(r,e,n){var t=r.ordered?"ol":"ul";return v(t,n.key,{start:r.start,children:r.items.map(function(a,i){return v("li",""+i,{children:e(a,n)})})})},html:function(r,e,n){var t=r.items.map(function(o){return T("li",e(o,n))}).join(""),a=r.ordered?"ol":"ul",i={start:r.start};return T(a,t,i)}},def:{order:b++,match:E(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),parse:function(r,e,n){var t=r[1].replace(/\s+/g," ").toLowerCase(),a=r[2],i=r[3];return n._refs&&n._refs[t]&&n._refs[t].forEach(function(o){o.target=a,o.title=i}),n._defs=n._defs||{},n._defs[t]={target:a,title:i},{def:t,target:a,title:i}},react:function(){return null},html:function(){return""}},table:{order:b++,match:E(ae.TABLE_REGEX),parse:ae.parseTable,react:function(r,e,n){var t=function(o){return r.align[o]==null?{}:{textAlign:r.align[o]}},a=r.header.map(function(o,s){return v("th",""+s,{style:t(s),scope:"col",children:e(o,n)})}),i=r.cells.map(function(o,s){return v("tr",""+s,{children:o.map(function(u,l){return v("td",""+l,{style:t(l),children:e(u,n)})})})});return v("table",n.key,{children:[v("thead","thead",{children:v("tr",null,{children:a})}),v("tbody","tbody",{children:i})]})},html:function(r,e,n){var t=function(u){return r.align[u]==null?"":"text-align:"+r.align[u]+";"},a=r.header.map(function(u,l){return T("th",e(u,n),{style:t(l),scope:"col"})}).join(""),i=r.cells.map(function(u){var l=u.map(function(d,p){return T("td",e(d,n),{style:t(p)})}).join("");return T("tr",l)}).join(""),o=T("thead",T("tr",a)),s=T("tbody",i);return T("table",o+s)}},newline:{order:b++,match:E(/^(?:\n *)*\n/),parse:fe,react:function(r,e,n){return`
`},html:function(r,e,n){return`
`}},paragraph:{order:b++,match:E(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),parse:te,react:function(r,e,n){return v("div",n.key,{className:"paragraph",children:e(r.content,n)})},html:function(r,e,n){var t={class:"paragraph"};return T("div",e(r.content,n),t)}},escape:{order:b++,match:C(/^\\([^0-9A-Za-z\s])/),parse:function(r,e,n){return{type:"text",content:r[1]}},react:null,html:null},tableSeparator:{order:b++,match:function(r,e){return e.inTable?/^ *\| */.exec(r):null},parse:function(){return{type:"tableSeparator"}},react:function(){return" | "},html:function(){return" &vert; "}},autolink:{order:b++,match:C(/^<([^: >]+:\/[^ >]+)>/),parse:function(r,e,n){return{type:"link",content:[{type:"text",content:r[1]}],target:r[1]}},react:null,html:null},mailto:{order:b++,match:C(/^<([^ >]+@[^ >]+)>/),parse:function(r,e,n){var t=r[1],a=r[1];return Zr.test(a)||(a="mailto:"+a),{type:"link",content:[{type:"text",content:t}],target:a}},react:null,html:null},url:{order:b++,match:C(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),parse:function(r,e,n){return{type:"link",content:[{type:"text",content:r[1]}],target:r[1],title:void 0}},react:null,html:null},link:{order:b++,match:C(new RegExp("^\\[("+ie+")\\]\\("+Fe+"\\)")),parse:function(r,e,n){var t={content:e(r[1],n),target:Re(r[2]),title:r[3]};return t},react:function(r,e,n){return v("a",n.key,{href:$(r.target),title:r.title,children:e(r.content,n)})},html:function(r,e,n){var t={href:$(r.target),title:r.title};return T("a",e(r.content,n),t)}},image:{order:b++,match:C(new RegExp("^!\\[("+ie+")\\]\\("+Fe+"\\)")),parse:function(r,e,n){var t={alt:r[1],target:Re(r[2]),title:r[3]};return t},react:function(r,e,n){return v("img",n.key,{src:$(r.target),alt:r.alt,title:r.title})},html:function(r,e,n){var t={src:$(r.target),alt:r.alt,title:r.title};return T("img","",t,!1)}},reflink:{order:b++,match:C(new RegExp("^\\[("+ie+")\\]\\s*\\[([^\\]]*)\\]")),parse:function(r,e,n){return _e(r,n,{type:"link",content:e(r[1],n)})},react:null,html:null},refimage:{order:b++,match:C(new RegExp("^!\\[("+ie+")\\]\\s*\\[([^\\]]*)\\]")),parse:function(r,e,n){return _e(r,n,{type:"image",alt:r[1]})},react:null,html:null},em:{order:b,match:C(new RegExp("^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)")),quality:function(r){return r[0].length+.2},parse:function(r,e,n){return{content:e(r[2]||r[1],n)}},react:function(r,e,n){return v("em",n.key,{children:e(r.content,n)})},html:function(r,e,n){return T("em",e(r.content,n))}},strong:{order:b,match:C(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),quality:function(r){return r[0].length+.1},parse:te,react:function(r,e,n){return v("strong",n.key,{children:e(r.content,n)})},html:function(r,e,n){return T("strong",e(r.content,n))}},u:{order:b++,match:C(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),quality:function(r){return r[0].length},parse:te,react:function(r,e,n){return v("u",n.key,{children:e(r.content,n)})},html:function(r,e,n){return T("u",e(r.content,n))}},del:{order:b++,match:C(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),parse:te,react:function(r,e,n){return v("del",n.key,{children:e(r.content,n)})},html:function(r,e,n){return T("del",e(r.content,n))}},inlineCode:{order:b++,match:C(/^(`+)([\s\S]*?[^`])\1(?!`)/),parse:function(r,e,n){return{content:r[2].replace(Br,"$1")}},react:function(r,e,n){return v("code",n.key,{children:r.content})},html:function(r,e,n){return T("code",V(r.content))}},br:{order:b++,match:Ae(/^ {2,}\n/),parse:fe,react:function(r,e,n){return v("br",n.key,zr)},html:function(r,e,n){return"<br>"}},text:{order:b++,match:Ae(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),parse:function(r,e,n){return{content:r[0]}},react:function(r,e,n){return r.content},html:function(r,e,n){return V(r.content)}}},et=function(r,e){!e&&typeof console<"u"&&console.warn("simple-markdown ruleOutput should take 'react' or 'html' as the second argument.");var n=function(t,a,i){return r[t.type][e](t,a,i)};return n},nt=function(r){var e=function(n,t){if(t=t||{},Array.isArray(n)){for(var a=t.key,i=[],o=null,s=0;s<n.length;s++){t.key=""+s;var u=e(n[s],t);typeof u=="string"&&typeof o=="string"?(o=o+u,i[i.length-1]=o):(i.push(u),o=u)}return t.key=a,i}else return r(n,e,t)};return e},rt=function(r){var e=function(n,t){return t=t||{},Array.isArray(n)?n.map(function(a){return e(a,t)}).join(""):r(n,e,t)};return e},Se=function(r,e,n={}){if(!e)throw new Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");var t,a=r.Array||ee.Array,i=a[e];if(!i)throw new Error("simple-markdown: outputFor: to join nodes of type `"+e+"` you must provide an `Array:` joiner rule with that type, Please see the docs for details on specifying an Array rule.");var o=i,s=function(l,d){return d=d||t,t=d,Array.isArray(l)?o(l,s,d):r[l.type][e](l,s,d)},u=function(l,d){return t=$e(d,n),s(l,t)};return u},ce=Je(ee),Ee=function(r,e){return e=e||{},e.inline=!1,ce(r,e)},tt=function(r,e){return e=e||{},e.inline=!0,ce(r,e)},De=function(r,e){var n=Ze.test(r);return e=e||{},e.inline=!n,ce(r,e)},xe=Se(ee,"react"),en=Se(ee,"html"),nn=function(r,e){return xe(Ee(r,e),e)},at=function(r,e){return en(Ee(r,e),e)},it=function(r){var e={};for(var n in r)n!=="source"&&Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e.children=nn(r.source),v("div",null,e)},h={defaultRules:ee,parserFor:Je,outputFor:Se,inlineRegex:C,blockRegex:E,anyScopeRegex:Ae,parseInline:ue,parseBlock:Hr,markdownToReact:nn,markdownToHtml:at,ReactMarkdown:it,defaultBlockParse:Ee,defaultInlineParse:tt,defaultImplicitParse:De,defaultReactOutput:xe,defaultHtmlOutput:en,preprocess:Be,sanitizeText:V,sanitizeUrl:$,unescapeUrl:Re,htmlTag:T,reactElement:v,defaultRawParse:ce,ruleOutput:et,reactFor:nt,htmlFor:rt,defaultParse:function(...r){return typeof console<"u"&&console.warn("defaultParse is deprecated, please use `defaultImplicitParse`"),De.apply(null,r)},defaultOutput:function(...r){return typeof console<"u"&&console.warn("defaultOutput is deprecated, please use `defaultReactOutput`"),xe.apply(null,r)}};const st={fence:{match:h.defaultRules.fence.match,order:1,parse:(r,e,n)=>({type:"codeBlock",lang:r[2]||void 0,content:r[3]})},paragraph:{match:h.defaultRules.paragraph.match,order:2,parse:(r,e,n)=>({content:r[1]})}},ot=h.parserFor(st),ut=r=>{const e=r.replace(/^\n\s*\n/,"")+`

`;return ot(e,{inline:!1}).map(n=>n.content)},lt=r=>r.join(`

`),Ge={parseToArray:ut,joinFromArray:lt},dt="@khanacademy/pure-markdown",mt="__lib_version__";Ie(dt,mt);const gt=/^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/,rn=(r,e,n)=>{const t=r.length;let a=0;if(n){if(e.inline)return null;for(;a<t&&r[a]===" ";)a++}if(!(a<t&&r[a]==="$"))return null;a++;const i=a;let o=0;for(;a<t;){const s=r[a];if(s==="\\")a++;else if(o<=0&&s==="$"){let u=a+1;if(n){const l=/^(?: *\n){2,}/.exec(r.slice(u));u=l?u+l[0].length:null}return u?[r.substring(0,u),r.substring(i,a)]:null}else if(s==="{")o++;else if(s==="}")o--;else if(s===`
`&&r[a-1]===`
`)return null;a++}return null},pt=(r,e)=>rn(r,e,!1),yt=(r,e)=>rn(r,e,!0),ct=new RegExp("^\\|\\| +(.*) +\\|\\| *\\n("+h.defaultRules.nptable.match.regex.source.substring(1)+")"),ht=h.blockRegex(/^(crwdns.*)\n\s*\n/),O={...h.defaultRules,columns:{order:-2,match:h.blockRegex(/^([\s\S]*\n\n)={5,}\n\n([\s\S]*)/),parse:(r,e,n)=>({col1:e(r[1],n),col2:e(r[2],n)})},crowdinId:{order:-1,match:(r,e,n)=>e.isJipt?ht(r,e,n):null,parse:(r,e,n)=>({id:r[1]})},titledTable:{order:h.defaultRules.nptable.order-.5,match:h.blockRegex(ct),parse:(r,e,n)=>{const t=h.parseInline(e,r[1],n),a=r.slice(2),i=h.defaultRules.nptable.parse(a,e,n);return{title:t,table:i}}},widget:{order:h.defaultRules.link.order-.75,match:h.inlineRegex(gt),parse:(r,e,n)=>({id:r[1],widgetType:r[2]})},blockMath:{order:h.defaultRules.codeBlock.order+.5,match:yt,parse:(r,e,n)=>({content:r[1]})},math:{order:h.defaultRules.link.order-.25,match:pt,parse:(r,e,n)=>({content:r[1]})},unescapedDollar:{order:h.defaultRules.link.order-.24,match:h.inlineRegex(/^(?!\\)\$/),parse:(r,e,n)=>({})},fence:{...h.defaultRules.fence,parse:(r,e,n)=>{const t=h.defaultRules.fence.parse(r,e,n);return t.lang==="alt"?{type:"codeBlock",lang:"alt",content:e(t.content+`

`,n)}:t}},blockQuote:{...h.defaultRules.blockQuote,match:h.blockRegex(/^ *>[^\n]+(\n( *>)?[^\n]+)*\n{2,}/)},lint:{order:1e3,match:r=>null,parse:(r,e,n)=>({})}};h.parserFor(O);const Z={...O,columns:{...O.columns,react:(r,e,n)=>y.jsxs("div",{className:"perseus-two-columns",children:[y.jsx("div",{className:"perseus-column",children:y.jsx("div",{className:"perseus-column-content",children:e(r.col1,n)})}),y.jsx("div",{className:"perseus-column",children:y.jsx("div",{className:"perseus-column-content",children:e(r.col2,n)})})]},n.key)},crowdinId:{...O.crowdinId,react:(r,e,n)=>r.id},table:{...O.table,react:function(r,e,n){const t=h.defaultRules.table.react(r,e,n);return n.isMobile?j.cloneElement(t,{tabIndex:0}):t}},titledTable:{...O.titledTable,react:(r,e,n)=>{var a;let t;if(!r.table)t="//invalid table//";else if(r.table.type==="lint")((a=r.table.content)==null?void 0:a.type)==="table"?t=Z.lint.react({...r.table,content:{...r,table:r.table.content}},e,{...n,unwrapTitledTableContents:!0}):t=Z.lint.react(r.table,e,n);else{const i=h.defaultRules.table.react(r.table,e,n),o=y.jsx("caption",{className:"perseus-table-title",children:e(r.title,n)},"caption");t=j.cloneElement(i,null,[o,...i.props.children])}return n.unwrapTitledTableContents?t:y.jsx("div",{className:"perseus-titled-table",children:t},n.key)}},widget:{...O.widget,react:(r,e,n)=>y.jsx("em",{children:`[Widget: ${r.id}]`},n.key)},blockMath:{...O.blockMath,react:(r,e,n)=>{const{TeX:t}=J();return y.jsx(t,{children:r.content},n.key)}},math:{...O.math,react:(r,e,n)=>{const{TeX:t}=J();return y.jsx(t,{children:r.content},n.key)}},unescapedDollar:{...O.unescapedDollar,react:(r,e,n)=>"$"},link:{...O.link,react:function(r,e,n){const t=h.defaultRules.link.react(r,e,n),a=t.props.href;let i=null;(a?a.match(/https?:\/\/[^/]*khanacademy.org|^\//):!1)||(i="noopener noreferrer");const s={...t.props,target:"_blank",href:a,rel:i};return n.baseElements&&n.baseElements.Link?n.baseElements.Link(s):j.cloneElement(t,s)}},codeBlock:{...O.codeBlock,react:(r,e,n)=>r.lang==="alt"?y.jsx("div",{className:"perseus-markdown-alt perseus-sr-only",children:e(r.content,n)},n.key):h.defaultRules.codeBlock.react(r,e,n)},lint:{...O.lint,react:(r,e,n)=>y.jsx(kn,{message:r.message,ruleName:r.ruleName,inline:wt(r.content),blockHighlight:r.blockHighlight,insideTable:r.insideTable,severity:r.severity,children:e(r.content,n)})}};function wt(r){return!!(r&&r.type&&bt.hasOwnProperty(r.type))}const bt={text:!0,math:!0,unescapedDollar:!0,link:!0,img:!0,strong:!0,u:!0,em:!0,del:!0,code:!0},tn=h.parserFor(Z),an=(r,e)=>{const n=r+`

`;return tn(n,{...e,inline:!1})},ft=(r,e)=>tn(r,{...e,inline:!0}),W=(r,e)=>{g.isArray(r)?g.each(r,n=>W(n,e)):g.isObject(r)&&(e(r),r.type==="table"?(W(r.header,e),W(r.cells,e)):r.type==="list"?W(r.items,e):r.type==="titledTable"?W(r.table,e):r.type==="columns"?(W(r.col1,e),W(r.col2,e)):g.isArray(r.content)&&W(r.content,e))},Pe=r=>{if(g.isArray(r))return g.flatten(g.map(r,Pe));if(r.content&&g.isString(r.content))return r.type.toLowerCase().indexOf("code")!==-1?["",r.content,""]:[r.content.replace(/\s+/g," ")];const e=g.chain(r).values().flatten().filter(t=>t!=null&&g.has(t,"type")).value();if(!e.length)return[];const n=Pe(e);if(r.type==="paragraph"&&n.length){n[0]=n[0].replace(/^\s+/,"");const t=n.length-1;n[t]=n[t].replace(/\s+$/,"")}return n},vt=r=>{const e=an(r);return Pe(e).join("").length},G={characterCount:vt,traverseContent:W,parse:an,parseInline:ft,reactFor:h.reactFor,ruleOutput:h.ruleOutput(Z,"react"),basicOutput:h.reactFor(h.ruleOutput(Z,"react")),sanitizeUrl:h.sanitizeUrl};class sn extends j.Component{render(){const e=this.props.className?"paragraph "+this.props.className:"paragraph";return y.jsx("div",{className:this.props.inline?this.props.className??void 0:e,"data-perseus-component-index":this.props.translationIndex,"data-perseus-paragraph-index":this.props.paragraphIndex,children:this.props.children})}}sn.__docgenInfo={description:"",methods:[],displayName:"QuestionParagraph",props:{className:{required:!1,tsType:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]},description:""},translationIndex:{required:!0,tsType:{name:"number"},description:""},paragraphIndex:{required:!1,tsType:{name:"number"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},inline:{required:!1,tsType:{name:"boolean"},description:""}}};const kt={type:"points",earned:0,total:0,message:null};function qt(r){return r.type==="invalid"&&(!r.message||r.message.length===0)}function Tt(r,e){let n;if(r.type==="points"&&e.type==="points")return r.message&&e.message&&r.message!==e.message?n=null:n=r.message||e.message,{type:"points",earned:r.earned+e.earned,total:r.total+e.total,message:n};if(r.type==="points"&&e.type==="invalid")return e;if(r.type==="invalid"&&e.type==="points")return r;if(r.type==="invalid"&&e.type==="invalid")return r.message&&e.message&&r.message!==e.message?n=null:n=r.message||e.message,{type:"invalid",message:n};throw new S("PerseusScore with unknown type encountered",R.InvalidInput,{metadata:{scoreA:JSON.stringify(r),scoreB:JSON.stringify(e)}})}function on(r){return Object.values(r).reduce(Tt,kt)}function At(r){return r.type==="points"&&r.earned>=r.total}function ba(r,e,n){if(r.type==="points")return{empty:!1,correct:At(r),message:r.message,guess:e,state:n};if(r.type==="invalid")return{empty:!0,correct:!1,message:r.message,suppressAlmostThere:r.suppressAlmostThere,guess:e,state:n};throw new S("Invalid score type: "+r.type,R.InvalidInput,{metadata:{score:JSON.stringify(r),guess:JSON.stringify(e),state:JSON.stringify(n)}})}function Rt(){return/\[\[☃ ([A-Za-z0-9- ]+)\]\]/g}function xt(r){const e=[],n=Rt();let t=n.exec(r);for(;t!==null;)e.push(t[1]),t=n.exec(r);return e}const Xe="block",Pt=["default"],Ct=!1,It="",Ot=!1,k={},_={},un=(r,e)=>{k[r]=e},fa=r=>{r.forEach(e=>{un(e.name,e)}),Mt()},X=(r,e)=>{const n=k[e];if(!n){const t=`Failed to replace ${r} with ${e}`;throw new S(t,R.Internal)}un(r,n)},va=()=>{X("transformer","deprecated-standin"),X("lights-puzzle","deprecated-standin"),X("reaction-diagram","deprecated-standin"),X("sequence","deprecated-standin"),X("simulator","deprecated-standin"),X("unit-input","deprecated-standin")},ka=r=>{r.forEach(e=>{if(!e.widgetName)throw new S(`Editor ${e.displayName} doesn't have a widgetName property`,R.Internal);_[e.widgetName]=e})},z=(r,e)=>{const n=_[e];if(!n&&H){const t=`Failed to replace editor ${r} with ${e}`;H.error(t,R.Internal);return}_[r]=n},qa=()=>{z("transformer","deprecated-standin"),z("lights-puzzle","deprecated-standin"),z("reaction-diagram","deprecated-standin"),z("sequence","deprecated-standin"),z("simulator","deprecated-standin"),z("unit-input","deprecated-standin")},St=r=>{var e,n,t;return g.has(k,r)?(e=k[r])!=null&&e.getWidget?(t=(n=k[r]).getWidget)==null?void 0:t.call(n):k[r].widget:null},ln=r=>{var e;return((e=k[r])==null?void 0:e.scorer)??null},Ta=r=>g.has(_,r)?_[r]:null,Et=r=>{if(k[r])return k[r].version||{major:0,minor:0}},Aa=()=>{const r={};return g.each(g.keys(k),function(e){r[e]=Et(e)}),r},Ra=()=>g.pick(k,g.reject(g.keys(k),function(r){return k[r].hidden})),xa=()=>g.keys(k),Nt=r=>{const e=r.type;if(!g.isString(e))throw new S("widget type must be a string, but was: "+e,R.Internal);const n=k[e];if(n==null)return r;const t=r.version||{major:0,minor:0},a=n.version||{major:0,minor:0};if(t.major>a.major||t.major===a.major&&t.minor>a.minor)return r;let i=g.clone(r.options)||{};const o=n.propUpgrades||{};if(g.keys(i).length!==0)for(let d=t.major+1;d<=a.major;d++)o[String(d)]?i=o[String(d)](i):H.error("No upgrade found for widget. Cannot render.",R.Internal,{loggedMetadata:{type:e,fromMajorVersion:d-1,toMajorVersion:d}});i={...e in _?_[e].defaultProps:{},...i};let u=r.alignment;(u==null||u==="default")&&(u=Wt(e)[0]);let l=r.static;return l==null&&(l=Ct),g.extend({},r,{version:a,graded:r.graded!=null?r.graded:!0,alignment:u,static:l,options:i})},jt=(r,e,n)=>{const t=r.type,a=k[t];if(a==null)return r;let i;return r.static?i=Ft(t)||g.identity:i=a.transform||g.identity,i(r.options,e,n)},Wt=r=>{const e=k[r];return e&&e.supportedAlignments||Pt},Lt=r=>{const e=k[r];let n;return e?(e.getDefaultAlignment?n=e.getDefaultAlignment():n=e.defaultAlignment,n||Xe):Xe},ze=["block","inline-block","inline","float-left","float-right","full-width"],Mt=()=>{g.each(k,function(r){if(r.defaultAlignment&&!g.contains(ze,r.defaultAlignment))throw new S("Widget '"+r.displayName+"' has an invalid defaultAlignment value: "+r.defaultAlignment,R.InvalidInput);if(r.supportedAlignments){const e=g.difference(r.supportedAlignments,ze);if(e.length)throw new S("Widget '"+r.displayName+"' has an invalid value for supportedAlignments: "+e.join(" "),R.InvalidInput)}})},Pa=r=>{const e=k[r];return e&&e.staticTransform!=null},Ft=r=>{const e=k[r];return e&&e.staticTransform},_t=r=>{const e=k[r];return e&&e.tracking||It},Dt=r=>{const e=k[r];return e&&e.isLintable||Ot};function Ne(r){return qe(r,(e,n)=>{if(!e.type||!e.alignment){const t={};e.type||(t.type=n.split(" ")[0]),e.alignment||(t.alignment="default"),e={...e,...t}}return Nt(e)})}function Gt(r,e,n,t,a){const i=Ne(r);return e.filter(o=>{const s=i[o];if(!s||s.static)return!1;const u=ln(s.type),l=u==null?void 0:u(n[o],s.options,t,a);if(l)return qt(l)})}function Ca(r,e,n,t){const a=xt(r.content),i=dn(r.widgets,a,e,n,t);return on(i)}function dn(r,e,n,t,a){const i=Ne(r),o=e.filter(u=>{const l=i[u],d=(l==null?void 0:l.graded)==null||l.graded,p=!!(l!=null&&l.static);return d&&!p}),s={};return o.forEach(u=>{const l=i[u];if(!l)return;const d=n[u],p=ln(l.type),w=p==null?void 0:p(d,l.options,t,a);w!=null&&(s[u]=w)}),s}const Xt=1e3;class zt{constructor(){this.previousContent=null,this.runLinter=pn((e,n)=>{if(!(typeof KA>"u")&&e!==this.previousContent){if(this.previousContent=e,e===""){n([]);return}fetch("/api/internal/translations/lint_poentry?preview=1&lang=en",{headers:{"Content-Type":"application/json"},body:JSON.stringify({msgid:e,msgstr:e,format:"perseus_text",filename:""}),method:"POST"}).then(t=>t.status>=400?{status:"error",message:"Could not run i18n linter."}:t.json(),t=>({status:"error",message:"Could not run i18n linter."})).then(t=>{t.status==="error"?n(["Some part of this text makes it untranslatable. The specific message from the i18n linter was: "+t.message.replace(/\n/g," ")]):n([])})}},Xt)}applyLintErrors(e,n){if(n.length){const t=n.join(`

`);e.unshift({content:{type:"text",content:""},insideTable:!1,message:t,ruleName:"legacy-error",severity:m.Severity.ERROR,type:"lint"})}}}const Ut=r=>r.replace(/\{align[*]?\}/g,"{aligned}").replace(/[\u00a0]/g," "),{interactiveSizes:se}=Tn,Yt=An,Vt=Rn,U={SMALL:"small",MEDIUM:"medium",LARGE:"large",XLARGE:"xlarge"},Ht=r=>r?r<=Yt?U.SMALL:r<=Vt?U.MEDIUM:U.LARGE:U.MEDIUM,Ia=r=>r===U.SMALL?[se.defaultBoxSizeSmall,se.defaultBoxSizeSmall]:[se.defaultBoxSize,se.defaultBoxSize],je=class je extends j.Component{constructor(){super(...arguments),this.widgetRef=j.createRef(),this.state={sizeClass:U.MEDIUM,widgetProps:this.props.initialProps},this.getWidget=()=>this.widgetRef.current,this.replaceWidgetProps=e=>{this.setState({widgetProps:e})}}componentDidMount(){if(this.state.widgetProps.apiOptions.isMobile){const e=ke.findDOMNode(this).offsetWidth;this.setState({sizeClass:Ht(e)})}}UNSAFE_componentWillReceiveProps(e){if(this.props.type!==e.type)throw new Error("WidgetContainer can't change widget type; set a different key instead to recreate the container.")}shouldComponentUpdate(e,n){return this.props.shouldHighlight!==e.shouldHighlight||this.props.type!==e.type||this.state.widgetProps!==n.widgetProps||this.state.sizeClass!==n.sizeClass}render(){let e=ve({"perseus-widget-container":!0,"widget-highlight":this.props.shouldHighlight,"widget-nohighlight":!this.props.shouldHighlight,"perseus-widget__definition":this.props.type==="definition"});const n=this.props.type,t=St(n);if(t==null)return console.warn(`Widget type '${n}' not found!`),y.jsx("div",{className:e});let a=this.state.widgetProps.alignment;a==="default"&&(a=Lt(n)),e+=" widget-"+a;const i=this.state.widgetProps.apiOptions,o=this.state.widgetProps.static||i.readOnly,s={position:"relative",overflow:"visible"},u={width:"100%",height:"100%",position:"absolute",top:0,left:0,zIndex:xn},l=Dt(n)?this.props.linterContext:{...this.props.linterContext,highlightLint:!1};return y.jsx("div",{className:e,style:o?s:{},children:y.jsx(fn.Consumer,{children:({analytics:d})=>y.jsxs(N,{metadata:{widget_type:n,widget_id:this.props.id},onError:()=>{d.onAnalyticsEvent({type:"perseus:widget-rendering-error",payload:{widgetType:n,widgetId:this.props.id}})},children:[y.jsx(t,{...this.state.widgetProps,linterContext:l,containerSizeClass:this.state.sizeClass,ref:this.widgetRef}),o&&y.jsx("div",{style:u})]})})})}};je.defaultProps={linterContext:He};let de=je;de.__docgenInfo={description:"",methods:[{name:"getWidget",docblock:null,modifiers:[],params:[],returns:null},{name:"replaceWidgetProps",docblock:null,modifiers:[],params:[{name:"newWidgetProps",optional:!1,type:null}],returns:null}],displayName:"WidgetContainer",props:{shouldHighlight:{required:!0,tsType:{name:"boolean"},description:""},type:{required:!0,tsType:{name:"string"},description:""},id:{required:!0,tsType:{name:"string"},description:""},initialProps:{required:!0,tsType:{name:"intersection",raw:`RenderProps & {
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
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,elements:[{name:"any"},{name:"signature",type:"object",raw:`{
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
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`},{name:"signature",type:"object",raw:`{
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"GroupMetadataEditor",value:{name:"NonNullable",elements:[{name:'Readonly["GroupMetadataEditor"]',raw:'APIOptions["GroupMetadataEditor"]'}],raw:'NonNullable<APIOptions["GroupMetadataEditor"]>',required:!0}},{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
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
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewModeRubric",value:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"union",raw:`| PerseusCategorizerWidgetOptions
| PerseusCSProgramWidgetOptions
| PerseusDefinitionWidgetOptions
| PerseusDropdownWidgetOptions
| PerseusExplanationWidgetOptions
| PerseusExpressionWidgetOptions
| PerseusGradedGroupSetWidgetOptions
| PerseusGradedGroupWidgetOptions
| PerseusIFrameWidgetOptions
| PerseusImageWidgetOptions
| PerseusInputNumberWidgetOptions
| PerseusInteractionWidgetOptions
| PerseusInteractiveGraphWidgetOptions
| PerseusLabelImageWidgetOptions
| PerseusMatcherWidgetOptions
| PerseusMatrixWidgetOptions
| PerseusMeasurerWidgetOptions
| PerseusMoleculeRendererWidgetOptions
| PerseusNumberLineWidgetOptions
| PerseusNumericInputWidgetOptions
| PerseusOrdererWidgetOptions
| PerseusPassageRefTargetWidgetOptions
| PerseusPassageRefWidgetOptions
| PerseusPassageWidgetOptions
| PerseusPhetSimulationWidgetOptions
| PerseusPlotterWidgetOptions
| PerseusRadioWidgetOptions
| PerseusSorterWidgetOptions
| PerseusTableWidgetOptions
| PerseusVideoWidgetOptions`,elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The ID of the CS program to embed
    programID: string;
    // Deprecated.  Always null and sometimes omitted entirely.
    programType?: any;
    // Settings that you add here are available to the program as an object returned by Program.settings()
    settings: ReadonlyArray<PerseusCSProgramSetting>;
    // If you show the editor, you should use the "full-width" alignment to make room for the width of the editor.
    showEditor: boolean;
    // Whether to show the execute buttons
    showButtons: boolean;
    // TODO(benchristel): width is not used. Delete it?
    // The width of the widget
    width: number;
    // The height of the widget
    height: number;
    // TODO(benchristel): static is not used. Delete it?
    // Always false
    static: boolean;
}`,signature:{properties:[{key:"programID",value:{name:"string",required:!0}},{key:"programType",value:{name:"any",required:!1}},{key:"settings",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The name/key of the setting
    name: string;
    // The value of the setting
    value: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"ReadonlyArray<PerseusCSProgramSetting>",required:!0}},{key:"showEditor",value:{name:"boolean",required:!0}},{key:"showButtons",value:{name:"boolean",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable text; the word to define. e.g. "vertex"
    togglePrompt: string;
    // Translatable text; the definition of the word. e.g. "where 2 rays connect"
    definition: string;
    // Always false. Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"togglePrompt",value:{name:"string",required:!0}},{key:"definition",value:{name:"string",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A list of choices for the dropdown
    choices: ReadonlyArray<PerseusDropdownChoice>;
    // Translatable Text; placeholder text for a dropdown. e.g. "Please select a fruit"
    placeholder: string;
    // Always false.  Not used for this widget
    static: boolean;
    // Translatable Text; visible label for the dropdown
    visibleLabel?: string;
    // Translatable Text; aria label that screen readers will read
    ariaLabel?: string;
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable text; The text for the option. e.g. "Banana" or "Orange"
    content: string;
    // Whether this is the correct option or not
    correct: boolean;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"correct",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<PerseusDropdownChoice>",required:!0}},{key:"placeholder",value:{name:"string",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; The clickable text to expand an explanation.  e.g. "What is an apple?"
    showPrompt: string;
    // Translatable Text; The cliclable text to hide an explanation. e.g. "Thanks. I got it!"
    hidePrompt: string;
    // Translatable Markdown; The explanation that is shown when showPrompt is clicked.  e.g. "An apple is a tasty fruit."
    explanation: string;
    // explanation fields can embed widgets. When they do, the details of the widgets are here.
    widgets: PerseusWidgetsMap;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"showPrompt",value:{name:"string",required:!0}},{key:"hidePrompt",value:{name:"string",required:!0}},{key:"explanation",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The expression forms the answer may come in
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    buttonSets: LegacyButtonSets;
    // Variables that can be used as functions.  Default: ["f", "g", "h"]
    functions: ReadonlyArray<string>;
    // Use x for rendering multiplication instead of a center dot.
    times: boolean;
    // visible label associated with the MathQuill field
    visibleLabel?: string;
    // aria label for screen readers attached to MathQuill field
    ariaLabel?: string;
    // Controls when buttons for special characters are visible when using a
    // desktop browser.  Defaults to "focused".
    // NOTE: This isn't listed in perseus-format.js or perseus_data.go, but
    // appears in item data in the datastore.
    buttonsVisible?: "always" | "never" | "focused";
}`,signature:{properties:[{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The TeX form of the expression.  e.g. "x\\\\cdot3=y"
    value: string;
    // The Answer expression must have the same form
    form: boolean;
    // The answer expression must be fully expanded and simplified
    simplify: boolean;
    // Whether the form is considered "correct", "wrong", or "ungraded"
    considered: (typeof PerseusExpressionAnswerFormConsidered)[number];
    // A key to identify the answer form in a list
    // NOTE: perseus-format.js says this is required even though it isn't necessary.
    key?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"ReadonlyArray<PerseusExpressionAnswerForm>",required:!0}},{key:"buttonSets",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "basic"
| "basic+div"
| "trig"
| "prealgebra"
| "logarithms"
| "basic relations"
| "advanced relations"
| "scientific"`,elements:[{name:"literal",value:'"basic"'},{name:"literal",value:'"basic+div"'},{name:"literal",value:'"trig"'},{name:"literal",value:'"prealgebra"'},{name:"literal",value:'"logarithms"'},{name:"literal",value:'"basic relations"'},{name:"literal",value:'"advanced relations"'},{name:"literal",value:'"scientific"'}]}],raw:`ReadonlyArray<
    | "basic"
    | "basic+div"
    | "trig"
    | "prealgebra"
    | "logarithms"
    | "basic relations"
    | "advanced relations"
    | "scientific"
>`,required:!0}},{key:"functions",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // A list of Widget Groups
    gradedGroups: ReadonlyArray<PerseusGradedGroupWidgetOptions>;
}`,signature:{properties:[{key:"gradedGroups",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Text; A title to be displayed for the group.
    title: string;
    // Not used in Perseus (but is set in (en, pt) production data)
    hasHint?: boolean | null | undefined;
    // A section to define hints for the group.
    hint?: PerseusRenderer | null | undefined;
    // Translatable Markdown. May include widgets and images embedded.
    content: string;
    // See PerseusRenderer.widgets
    widgets: PerseusWidgetsMap;
    // Not used in Perseus
    widgetEnabled?: boolean | null | undefined;
    // Not used in Perseus
    immutableWidgets?: boolean | null | undefined;
    // See PerseusRenderer.images
    images: {
        [key: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"hasHint",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"hint",value:{name:"union",raw:"PerseusRenderer | null | undefined",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"widgetEnabled",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"immutableWidgets",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [key: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}}],raw:"ReadonlyArray<PerseusGradedGroupWidgetOptions>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; A title to be displayed for the group.
    title: string;
    // Not used in Perseus (but is set in (en, pt) production data)
    hasHint?: boolean | null | undefined;
    // A section to define hints for the group.
    hint?: PerseusRenderer | null | undefined;
    // Translatable Markdown. May include widgets and images embedded.
    content: string;
    // See PerseusRenderer.widgets
    widgets: PerseusWidgetsMap;
    // Not used in Perseus
    widgetEnabled?: boolean | null | undefined;
    // Not used in Perseus
    immutableWidgets?: boolean | null | undefined;
    // See PerseusRenderer.images
    images: {
        [key: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"hasHint",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"hint",value:{name:"union",raw:"PerseusRenderer | null | undefined",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"widgetEnabled",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"immutableWidgets",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [key: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A URL to display OR a CS Program ID
    url: string;
    // Settings that you add here are available to the program as an object returned by Program.settings()
    settings: ReadonlyArray<PerseusCSProgramSetting>;
    // The width of the widget
    width: number | string;
    // The height of the widget
    height: number | string;
    // Whether to allow the IFrame to become full-screen (like a video)
    allowFullScreen: boolean;
    // Whether to allow the iframe content to redirect the page
    allowTopNavigation?: boolean;
    // Always false
    static: boolean;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"settings",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The name/key of the setting
    name: string;
    // The value of the setting
    value: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"ReadonlyArray<PerseusCSProgramSetting>",required:!0}},{key:"width",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!0}},{key:"height",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!0}},{key:"allowFullScreen",value:{name:"boolean",required:!0}},{key:"allowTopNavigation",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Markdown; Text to be shown for the title of the image
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    title?: string;
    // Translatable Markdown; Text to be shown in the caption section of an image
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    caption?: string;
    // Translatable Text; The alt text to be shown in the img.alt attribute
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alt?: string;
    // The image details for the image to be displayed
    backgroundImage: PerseusImageBackground;
    // Always false.  Not used for this widget
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // A list of labels to display on the image
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    labels?: ReadonlyArray<PerseusImageLabel>;
    // The range on the image render for labels
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    range?: [Interval, Interval];
    // The box on the image render for labels. The same as backgroundImage.width and backgroundImage.height
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    box?: Size;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"caption",value:{name:"string",required:!1}},{key:"alt",value:{name:"string",required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Text; The content of the label to display
    content: string;
    // The visual alignment of the label. default: "center"
    alignment: string;
    // The point on the image to display the label
    coordinates: ReadonlyArray<number>;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"alignment",value:{name:"string",required:!0}},{key:"coordinates",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}}],raw:"ReadonlyArray<PerseusImageLabel>",required:!1}},{key:"range",value:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}},{key:"box",value:{name:"tuple",raw:"[width: number, height: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    answerType?:
        | "number"
        | "decimal"
        | "integer"
        | "rational"
        | "improper"
        | "mixed"
        | "percent"
        | "pi";
    inexact?: boolean;
    maxError?: number | string;
    rightAlign?: boolean;
    simplify: "required" | "optional" | "enforced";
    size: "normal" | "small";
    value: string | number;
    customKeypad?: boolean;
}`,signature:{properties:[{key:"answerType",value:{name:"union",raw:`| "number"
| "decimal"
| "integer"
| "rational"
| "improper"
| "mixed"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"number"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"integer"'},{name:"literal",value:'"rational"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!1}},{key:"inexact",value:{name:"boolean",required:!1}},{key:"maxError",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"rightAlign",value:{name:"boolean",required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "optional" | "enforced"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"optional"'},{name:"literal",value:'"enforced"'}],required:!0}},{key:"size",value:{name:"union",raw:'"normal" | "small"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"small"'}],required:!0}},{key:"value",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!0}},{key:"customKeypad",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The definition of the graph
    graph: PerseusInteractionGraph;
    // The elements of the graph
    elements: ReadonlyArray<PerseusInteractionElement>;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"graph",value:{name:"signature",type:"object",raw:`{
    // "canvas", "graph"
    editableSettings?: ReadonlyArray<"canvas" | "graph">;
    // The Grid Canvas size. e.g. [400, 140]
    box: Size;
    // The Axis labels.  e.g. ["x", "y"]
    labels: ReadonlyArray<string>;
    // The Axis ranges. e.g. [[-10, 10], [-10, 10]]
    range: [Interval, Interval];
    // The steps in the grid. default [1, 1]
    gridStep: [number, number];
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
    // The snap steps. default [0.5, 0.5]
    snapStep?: [number, number];
    // Whether the grid is valid or not.  Do the numbers all make sense?
    // NOTE(jeremy) The editor for this widget sometimes stores the graph
    // editor validation error message into this field. It seems innocuous
    // because it looks like many of these usages don't actually use the graph
    // at all.
    valid?: boolean | string;
    // An optional background image to use
    backgroundImage?: PerseusImageBackground;
    // Whether to show the Protractor tool overlayed on top of the graph
    showProtractor?: boolean;
    // Whether to show the Ruler tool overlayed on top of the graph
    showRuler?: boolean;
    // The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft", "yd", "mi"
    rulerLabel?: string;
    // How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16
    rulerTicks?: number;
    // This controls the number (and position) of the tick marks for the X and Y axis. e.g. [1, 1]
    tickStep: [number, number];
}`,signature:{properties:[{key:"editableSettings",value:{name:"ReadonlyArray",elements:[{name:"union",raw:'"canvas" | "graph"',elements:[{name:"literal",value:'"canvas"'},{name:"literal",value:'"graph"'}]}],raw:'ReadonlyArray<"canvas" | "graph">',required:!1}},{key:"box",value:{name:"tuple",raw:"[width: number, height: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"range",value:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"snapStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"valid",value:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}],required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"showProtractor",value:{name:"boolean",required:!1}},{key:"showRuler",value:{name:"boolean",required:!1}},{key:"rulerLabel",value:{name:"string",required:!1}},{key:"rulerTicks",value:{name:"number",required:!1}},{key:"tickStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}}]},required:!0}},{key:"elements",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| {
      type: "function";
      // An identifier for the element
      key: string;
      options: PerseusInteractionFunctionElementOptions;
  }
| {
      type: "label";
      // An identifier for the element
      key: string;
      options: PerseusInteractionLabelElementOptions;
  }
| {
      type: "line";
      // An identifier for the element
      key: string;
      options: PerseusInteractionLineElementOptions;
  }
| {
      type: "movable-line";
      // An identifier for the element
      key: string;
      options: PerseusInteractionMovableLineElementOptions;
  }
| {
      type: "movable-point";
      // An identifier for the element
      key: string;
      options: PerseusInteractionMovablePointElementOptions;
  }
| {
      type: "parametric";
      // An identifier for the element
      key: string;
      options: PerseusInteractionParametricElementOptions;
  }
| {
      type: "point";
      // An identifier for the element
      key: string;
      options: PerseusInteractionPointElementOptions;
  }
| {
      type: "rectangle";
      // An identifier for the element
      key: string;
      options: PerseusInteractionRectangleElementOptions;
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "function";
    // An identifier for the element
    key: string;
    options: PerseusInteractionFunctionElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The definition of the function to draw on the graph.  e.g "x^2 + 1"
    value: string;
    // The name of the function like f(n). default: "f"
    funcName: string;
    // The range of points to start plotting
    rangeMin: string;
    // The range of points to end plotting
    rangeMax: string;
    // The color of the stroke. e.g. #6495ED
    color: string;
    // If the function stroke has a dash, what is it? options: "", "-", "- ", ".", ". "
    strokeDasharray: string;
    // The thickness of the stroke
    strokeWidth: number;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"funcName",value:{name:"string",required:!0}},{key:"rangeMin",value:{name:"string",required:!0}},{key:"rangeMax",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"strokeDasharray",value:{name:"string",required:!0}},{key:"strokeWidth",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    // An identifier for the element
    key: string;
    options: PerseusInteractionLabelElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable Text; the content of the label
    label: string;
    // The color of the label.  e.g. "red"
    color: string;
    // The X location of the label
    coordX: string;
    // The Y location of the label
    coordY: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"coordX",value:{name:"string",required:!0}},{key:"coordY",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    // An identifier for the element
    key: string;
    options: PerseusInteractionLineElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // A color code for the line segment.  e.g. "#FFOOAF"
    color: string;
    // The start of the line segment (X)
    startX: string;
    // The start of the line segment (Y)
    startY: string;
    // The end of the line segment (X)
    endX: string;
    // The end of the line segment (Y)
    endY: string;
    // If the line stroke has a dash, what is it? options: "", "-", "- ", ".", ". "
    strokeDasharray: string;
    // The thickness of the line
    strokeWidth: number;
    // Does the line have an arrow point to it? options: "", "->"
    arrows: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"startX",value:{name:"string",required:!0}},{key:"startY",value:{name:"string",required:!0}},{key:"endX",value:{name:"string",required:!0}},{key:"endY",value:{name:"string",required:!0}},{key:"strokeDasharray",value:{name:"string",required:!0}},{key:"strokeWidth",value:{name:"number",required:!0}},{key:"arrows",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "movable-line";
    // An identifier for the element
    key: string;
    options: PerseusInteractionMovableLineElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"movable-line"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The start of the line segment (X)
    startX: string;
    // The start of the line segment (Y)
    startY: string;
    // Start updates (Xn, Yn) for n
    startSubscript: number;
    // The end of the line segment (X)
    endX: string;
    // The end of the line segment (Y)
    endY: string;
    // End updates (Xm, Ym) for m
    endSubscript: number;
    // How to constrain this line? options "none", "snap", "x", "y"
    constraint: string;
    // The snap resolution when constraint is set to "snap"
    snap: number;
    // The constraint function for when constraint is set to "x" or "y"
    constraintFn: string;
    // The lowest possible X value
    constraintXMin: string;
    // The highest possible X value
    constraintXMax: string;
    // The lowest possible Y value
    constraintYMin: string;
    // The highest possible Y value
    constraintYMax: string;
}`,signature:{properties:[{key:"startX",value:{name:"string",required:!0}},{key:"startY",value:{name:"string",required:!0}},{key:"startSubscript",value:{name:"number",required:!0}},{key:"endX",value:{name:"string",required:!0}},{key:"endY",value:{name:"string",required:!0}},{key:"endSubscript",value:{name:"number",required:!0}},{key:"constraint",value:{name:"string",required:!0}},{key:"snap",value:{name:"number",required:!0}},{key:"constraintFn",value:{name:"string",required:!0}},{key:"constraintXMin",value:{name:"string",required:!0}},{key:"constraintXMax",value:{name:"string",required:!0}},{key:"constraintYMin",value:{name:"string",required:!0}},{key:"constraintYMax",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "movable-point";
    // An identifier for the element
    key: string;
    options: PerseusInteractionMovablePointElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"movable-point"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The X position of the point
    startX: string;
    // The Y position of the point
    startY: string;
    // Update (Xn, Yn) for n
    varSubscript: number;
    // How to constrain this line? options "none", "snap", "x", "y"
    constraint: string;
    // The snap resolution when constraint is set to "snap"
    snap: number;
    // The constraint function for when constraint is set to "x" or "y"
    constraintFn: string;
    // The lowest possible X value
    constraintXMin: string;
    // The highest possible X value
    constraintXMax: string;
    // The lowest possible Y value
    constraintYMin: string;
    // The highest possible Y value
    constraintYMax: string;
}`,signature:{properties:[{key:"startX",value:{name:"string",required:!0}},{key:"startY",value:{name:"string",required:!0}},{key:"varSubscript",value:{name:"number",required:!0}},{key:"constraint",value:{name:"string",required:!0}},{key:"snap",value:{name:"number",required:!0}},{key:"constraintFn",value:{name:"string",required:!0}},{key:"constraintXMin",value:{name:"string",required:!0}},{key:"constraintXMax",value:{name:"string",required:!0}},{key:"constraintYMin",value:{name:"string",required:!0}},{key:"constraintYMax",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "parametric";
    // An identifier for the element
    key: string;
    options: PerseusInteractionParametricElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"parametric"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The function for the X coordinate. e.g. "\\\\cos(t)"
    x: string;
    // The function for the Y coordinate. e.g. "\\\\sin(t)"
    y: string;
    // The range of points to start plotting
    rangeMin: string;
    // The range of points to end plotting
    rangeMax: string;
    // The color of the stroke. e.g. #6495ED
    color: string;
    // If the function stroke has a dash, what is it? options: "", "-", "- ", ".", ". "
    strokeDasharray: string;
    // The thickness of the stroke
    strokeWidth: number;
}`,signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"rangeMin",value:{name:"string",required:!0}},{key:"rangeMax",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"strokeDasharray",value:{name:"string",required:!0}},{key:"strokeWidth",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // An identifier for the element
    key: string;
    options: PerseusInteractionPointElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The color of the point.  e.g. "black"
    color: string;
    // The X coordinate of the point
    coordX: string;
    // The Y coordinate of the point
    coordY: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"coordX",value:{name:"string",required:!0}},{key:"coordY",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "rectangle";
    // An identifier for the element
    key: string;
    options: PerseusInteractionRectangleElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"rectangle"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The fill color.  e.g. "#EDD19B"
    color: string;
    // The lower left point X
    coordX: string;
    // The lower left point Y
    coordY: string;
    // The width of the rectangle
    width: string;
    // The height of the rectangle
    height: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"coordX",value:{name:"string",required:!0}},{key:"coordY",value:{name:"string",required:!0}},{key:"width",value:{name:"string",required:!0}},{key:"height",value:{name:"string",required:!0}}]},required:!0}}]}}]}],raw:"ReadonlyArray<PerseusInteractionElement>",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Where the little black axis lines & labels (ticks) should render.
    // Also known as the tick step. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    step: [number, number];
    // Where the grid lines on the graph will render. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    gridStep?: [x: number, y: number];
    // Where the graph points will lock to when they are dragged. default [0.5, 0.5]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    snapStep?: [x: number, y: number];
    // An optional image to use in the background
    backgroundImage?: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
    // How to label the X and Y axis.  default: ["x", "y"]
    labels?: ReadonlyArray<string>;
    // Whether to show the Protractor tool overlayed on top of the graph
    showProtractor: boolean;
    /**
     * Whether to show the Ruler tool overlayed on top of the graph.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    showRuler?: boolean;
    // Whether to show tooltips on the graph
    showTooltips?: boolean;
    /**
     * The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
     * "yd", "mi".
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerLabel?: string;
    /**
     * How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
     * an integer.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerTicks?: number;
    // The X and Y coordinate ranges for the view of the graph.  default: [[-10, 10], [-10, 10]]
    // NOTE(kevinb): perseus_data.go defines this as Array<Array<number>>
    // TODO(kevinb): Add a transform function to interactive-graph.jsx to
    // rename \`range\` to \`ranges\` so that things are less confusing.
    range: GraphRange;
    // The type of graph
    graph: PerseusGraphType;
    // The correct kind of graph, if being used to select function type
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    // Shapes (points, chords, etc) displayed on the graph that cannot
    // be moved by the user.
    lockedFigures?: ReadonlyArray<LockedFigure>;
    // Aria label that applies to the entire graph.
    fullGraphAriaLabel?: string;
    // Aria description that applies to the entire graph.
    fullGraphAriaDescription?: string;
}`,signature:{properties:[{key:"step",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"showProtractor",value:{name:"boolean",required:!0}},{key:"showRuler",value:{name:"boolean",required:!1},description:`Whether to show the Ruler tool overlayed on top of the graph.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"showTooltips",value:{name:"boolean",required:!1}},{key:"rulerLabel",value:{name:"string",required:!1},description:`The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
"yd", "mi".
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"rulerTicks",value:{name:"number",required:!1},description:`How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
an integer.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"range",value:{name:"tuple",raw:`[
    x: [min: number, max: number],
    y: [min: number, max: number],
]`,elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!1}},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!1}},{key:"lockedFigures",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"ReadonlyArray<LockedFigure>",required:!1}},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; Tex representation of choices
    choices: ReadonlyArray<string>;
    // The URL of the image
    imageUrl: string;
    // Translatable Text; To show up in the img.alt attribute
    imageAlt: string;
    // The height of the image
    imageHeight: number;
    // The width of the image
    imageWidth: number;
    // A list of markers to display on the image
    markers: ReadonlyArray<PerseusLabelImageMarker>;
    // Do not display answer choices in instructions
    hideChoicesFromInstructions: boolean;
    // Allow multiple answers per marker
    multipleAnswers: boolean;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"imageUrl",value:{name:"string",required:!0}},{key:"imageAlt",value:{name:"string",required:!0}},{key:"imageHeight",value:{name:"number",required:!0}},{key:"imageWidth",value:{name:"number",required:!0}},{key:"markers",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // A list of correct answers for this marker.  Often only one but can have multiple
    answers: ReadonlyArray<string>;
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // X Coordiate location of the marker on the image
    x: number;
    // Y Coordinate location of the marker on the image
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}}],raw:"ReadonlyArray<PerseusLabelImageMarker>",required:!0}},{key:"hideChoicesFromInstructions",value:{name:"boolean",required:!0}},{key:"multipleAnswers",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; Labels to adorn the headings for the columns.  Only 2 values [left, right]. e.g. ["Concepts", "Things"]
    labels: ReadonlyArray<string>;
    // Translatable Text; Static concepts to show in the left column. e.g. ["Fruit", "Color", "Clothes"]
    left: ReadonlyArray<string>;
    // Translatable Markup; Values that represent the concepts to be correlated with the concepts.  e.g. ["Red", "Shirt", "Banana"]
    right: ReadonlyArray<string>;
    // Order of the matched pairs matters. With this option enabled, only the order provided above will be treated as correct. This is useful when ordering is significant, such as in the context of a proof. If disabled, pairwise matching is sufficient. To make this clear, the left column becomes fixed in the provided order and only the cards in the right column can be moved.
    orderMatters: boolean;
    // Adds padding to the rows.  Padding is good for text, but not needed for images.
    padding: boolean;
}`,signature:{properties:[{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"orderMatters",value:{name:"boolean",required:!0}},{key:"padding",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; Shown before the matrix
    prefix?: string | undefined;
    // Translatable Text; Shown after the matrix
    suffix?: string | undefined;
    // A data matrix representing the "correct" answers to be entered into the matrix
    answers: PerseusMatrixWidgetAnswers;
    // The coordinate location of the cursor position at start. default: [0, 0]
    cursorPosition?: ReadonlyArray<number> | undefined;
    // The coordinate size of the matrix.  Only supports 2-dimensional matrix.  default: [3, 3]
    matrixBoardSize: ReadonlyArray<number>;
    // Whether this is meant to statically display the answers (true) or be used as an input field, graded against the answers
    static?: boolean | undefined;
}`,signature:{properties:[{key:"prefix",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"suffix",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>",required:!0}},{key:"cursorPosition",value:{name:"union",raw:"ReadonlyArray<number> | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},{name:"undefined"}],required:!1}},{key:"matrixBoardSize",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"static",value:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The image that the user is meant to measure
    image: PerseusImageBackground;
    // Whether to show the Protractor tool overlayed on top of the image
    showProtractor: boolean;
    // Whether to show the Ruler tool overlayed on top of the image
    showRuler: boolean;
    // The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft", "yd", "mi"
    rulerLabel: string;
    // How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16
    rulerTicks: number;
    // The number of image pixels per unit (label)
    rulerPixels: number;
    // The number of units to display on the ruler
    rulerLength: number;
    // Containing area [width, height]
    box: [number, number];
    // TODO(benchristel): static is not used. Remove it?
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"image",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"showProtractor",value:{name:"boolean",required:!0}},{key:"showRuler",value:{name:"boolean",required:!0}},{key:"rulerLabel",value:{name:"string",required:!0}},{key:"rulerTicks",value:{name:"number",required:!0}},{key:"rulerPixels",value:{name:"number",required:!0}},{key:"rulerLength",value:{name:"number",required:!0}},{key:"box",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    widgetId: string;
    rotationAngle?: number;
    smiles?: string;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"rotationAngle",value:{name:"number",required:!1}},{key:"smiles",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The position of the endpoints of the number line. Setting the range constrains the position of the answer and the labels.
    range: ReadonlyArray<number>;
    // This controls the position of the left / right labels. By default, the labels are set by the range.  Note:  Ensure that the labels line up with the tick marks, or it may be confusing for users.
    labelRange: ReadonlyArray<number | null>;
    // This controls the styling of the labels for the two main labels as well as all the tick mark labels, if applicable. Options: "decimal", "improper", "mixed", "non-reduced"
    labelStyle: string;
    // Show label ticks
    labelTicks: boolean;
    // Show tick controller
    isTickCtrl?: boolean | null | undefined;
    // The range of divisions within the line
    divisionRange: ReadonlyArray<number>;
    // This controls the number (and position) of the tick marks. The number of divisions is constrained to the division range. Note:  The user will be able to specify the number of divisions in a number input.
    numDivisions: number | null | undefined;
    // This determines the number of different places the point will snap between two adjacent tick marks. Note: Ensure the required number of snap increments is provided to answer the question.
    snapDivisions: number;
    // This controls the number (and position) of the tick marks; you can either set the number of divisions (2 divisions would split the entire range in two halves), or the tick step (the distance between ticks) and the other value will be updated accordingly. Note:  There is no check to see if labels coordinate with the tick marks, which may be confusing for users if the blue labels and black ticks are off-step.
    tickStep: number | null | undefined;
    // The correct relative value. default: "eq". options: "eq", "lt", "gt", "le", "ge"
    correctRel: string | null | undefined;
    // This is the correct answer. The answer is validated (as right or wrong) by using only the end position of the point and the relation (=, &lt;, &gt;, ≤, ≥).
    correctX: number | null;
    // This controls the initial position of the point along the number line
    initialX: number | null | undefined;
    // Show tooltips
    showTooltip?: boolean;
    // When true, the answer is displayed and is immutable
    static: boolean;
}`,signature:{properties:[{key:"range",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"labelRange",value:{name:"ReadonlyArray",elements:[{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]}],raw:"ReadonlyArray<number | null>",required:!0}},{key:"labelStyle",value:{name:"string",required:!0}},{key:"labelTicks",value:{name:"boolean",required:!0}},{key:"isTickCtrl",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"divisionRange",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"numDivisions",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"snapDivisions",value:{name:"number",required:!0}},{key:"tickStep",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"correctRel",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"correctX",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!0}},{key:"initialX",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"showTooltip",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A list of all the possible correct and incorrect answers
    answers: ReadonlyArray<PerseusNumericInputAnswer>;
    // Translatable Text; Text to describe this input. This will be shown to users using screenreaders.
    labelText?: string | undefined;
    // Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them. Options: "normal" or "small"
    size: string;
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
    // Whether to right-align the text or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    rightAlign?: boolean;
    // Always false.  Not used for this widget
    static: boolean;
    // Used by examples, maybe not used and should be removed in the future
    // see TODO in numeric-input
    answerForms?: ReadonlyArray<PerseusNumericInputAnswerForm>;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    answerForms?: ReadonlyArray<MathFormat>;
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    // NOTE: perseus_data.go says this is non-nullable even though we handle null values.
    maxError: number | null | undefined;
    // Unsimplified answers are Ungraded, Accepted, or Wrong. Options: "required", "correct", or "enforced"
    simplify: string | null | undefined;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}],raw:"ReadonlyArray<MathFormat>",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"simplify",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswer>",required:!0}},{key:"labelText",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"size",value:{name:"string",required:!0}},{key:"coefficient",value:{name:"boolean",required:!0}},{key:"rightAlign",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    simplify:
        | "required"
        | "correct"
        | "enforced"
        | "optional"
        | null
        | undefined;
    name: MathFormat;
}`,signature:{properties:[{key:"simplify",value:{name:"union",raw:`| "required"
| "correct"
| "enforced"
| "optional"
| null
| undefined`,elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"correct"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'},{name:"null"},{name:"undefined"}],required:!0}},{key:"name",value:{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswerForm>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // All of the options available to the user. Place the cards in the correct order. The same card can be used more than once in the answer but will only be displayed once at the top of a stack of identical cards.
    options: ReadonlyArray<PerseusRenderer>;
    // The correct order of the options
    correctOptions: ReadonlyArray<PerseusRenderer>;
    // Cards that are not part of the answer
    otherOptions: ReadonlyArray<PerseusRenderer>;
    // "normal" for text options.  "auto" for image options.
    height: "normal" | "auto";
    // Use the "horizontal" layout for short text and small images. The "vertical" layout is best for longer text (e.g. proofs).
    layout: "horizontal" | "vertical";
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}}],raw:"ReadonlyArray<PerseusRenderer>",required:!0}},{key:"correctOptions",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}}],raw:"ReadonlyArray<PerseusRenderer>",required:!0}},{key:"otherOptions",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}}],raw:"ReadonlyArray<PerseusRenderer>",required:!0}},{key:"height",value:{name:"union",raw:'"normal" | "auto"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"auto"'}],required:!0}},{key:"layout",value:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    content: string;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The passage number
    passageNumber: number;
    // The reference number
    referenceNumber: number;
    // Short summary of the referenced section. This will be included in parentheses and quotes automatically.
    summaryText?: string;
}`,signature:{properties:[{key:"passageNumber",value:{name:"number",required:!0}},{key:"referenceNumber",value:{name:"number",required:!0}},{key:"summaryText",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; To add footnotes, add ^ characters where they belong in the passage. Then, add ^ in the footnotes area to reference the footnotes in the passage.
    footnotes: string;
    // Translatable Text; The text of the passage
    passageText: string;
    // translatableText - An optional title that will appear directly above the passage in the same font style. (e.g. Passage 1)
    passageTitle: string;
    // Should we show line numbers along with the passage?
    showLineNumbers: boolean;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"footnotes",value:{name:"string",required:!0}},{key:"passageText",value:{name:"string",required:!0}},{key:"passageTitle",value:{name:"string",required:!0}},{key:"showLineNumbers",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A URL to display, must start with https://phet.colorado.edu/
    url: string;
    // Translatable Text; Description of the sim for Khanmigo and alt text
    description: string;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"description",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; The Axis labels. e.g. ["X Label", "Y Label"]
    labels: ReadonlyArray<string>;
    // Translatable Text; Categories to display along the X access.  e.g. [">0", ">6", ">12", ">18"]
    categories: ReadonlyArray<string>;
    // The type of the graph. options "bar", "line", "pic", "histogram", "dotplot"
    type: PlotType;
    // The maximimum Y tick to display in the graph
    maxY: number;
    // The scale of the Y Axis
    scaleY: number;
    // Which ticks to display the labels for. For instance, setting this to "4" will only show every 4th label (plus the last one)
    labelInterval: number | null | undefined;
    // Creates the specified number of divisions between the horizontal lines. Fewer snaps between lines makes the graph easier for the student to create correctly.
    snapsPerLine: number;
    // The Y values the graph should start with
    starting: ReadonlyArray<number>;
    // The Y values that represent the correct answer expected
    correct: ReadonlyArray<number>;
    // A picture to represent items in a graph.
    picUrl: string | null | undefined;
    // deprecated
    picSize: number | null | undefined;
    // deprecated
    picBoxHeight: number | null | undefined;
    // deprecated
    plotDimensions: ReadonlyArray<number>;
}`,signature:{properties:[{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof plotterPlotTypes)[number]",required:!0}},{key:"maxY",value:{name:"number",required:!0}},{key:"scaleY",value:{name:"number",required:!0}},{key:"labelInterval",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"snapsPerLine",value:{name:"number",required:!0}},{key:"starting",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"correct",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"picUrl",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"picSize",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"picBoxHeight",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"plotDimensions",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The choices provided to the user.
    choices: ReadonlyArray<PerseusRadioChoice>;
    // Does this have a "none of the above" option?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    hasNoneOfTheAbove?: boolean;
    // If multipleSelect is enabled, Specify the number expected to be correct.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    countChoices?: boolean;
    // Randomize the order of the options or keep them as defined
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    randomize?: boolean;
    // Does this set allow for multiple selections to be correct?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    multipleSelect?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    deselectEnabled?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    onePerLine?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    displayCount?: any;
    // v0 props
    // \`noneOfTheAbove\` is still in use (but only set to \`false\`).
    noneOfTheAbove?: false;
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Markdown; The label for this choice
    content: string;
    // Translatable Markdown; A clue to give the user when they get it wrong
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    clue?: string;
    // Whether this option is a correct answer or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    correct?: boolean;
    // If this is none of the above, override the content with "None of the above"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    isNoneOfTheAbove?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    widgets?: PerseusWidgetsMap;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"clue",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}}]}}],raw:"ReadonlyArray<PerseusRadioChoice>",required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"countChoices",value:{name:"boolean",required:!1}},{key:"randomize",value:{name:"boolean",required:!1}},{key:"multipleSelect",value:{name:"boolean",required:!1}},{key:"deselectEnabled",value:{name:"boolean",required:!1}},{key:"onePerLine",value:{name:"boolean",required:!1}},{key:"displayCount",value:{name:"any",required:!1}},{key:"noneOfTheAbove",value:{name:"literal",value:"false",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; The correct answer (in the correct order). The user will see the cards in a randomized order.
    correct: ReadonlyArray<string>;
    // Adds padding to the options.  Padding is good for text but not needed for images
    padding: boolean;
    // Use the "horizontal" layout for short text and small images. The "vertical" layout is best for longer text and larger images.
    layout: "horizontal" | "vertical";
}`,signature:{properties:[{key:"correct",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"padding",value:{name:"boolean",required:!0}},{key:"layout",value:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; A list of column headers
    headers: ReadonlyArray<string>;
    // The number of rows to display
    rows: number;
    // The number of columns to display
    columns: number;
    // Translatable Text; A 2-dimensional array of text to populate the table with
    answers: ReadonlyArray<ReadonlyArray<string>>;
}`,signature:{properties:[{key:"headers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"rows",value:{name:"number",required:!0}},{key:"columns",value:{name:"number",required:!0}},{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}],raw:"ReadonlyArray<ReadonlyArray<string>>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    location: string;
    static?: boolean;
}`,signature:{properties:[{key:"location",value:{name:"string",required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}]},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
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
}`,computed:!1}}}};const Kt=/\S/,Bt=/(web\+graphie|https):\/\/[^\s]*/,B=()=>{},Ue=["content","problemNum","widgets"],oe=r=>"container:"+r,$t=function(r,e){return r===null||e===null?r===e:g.every(r,(n,t)=>{if(e!=null)return g.isEqual(n,e[t])})},me=class me extends j.Component{constructor(e){super(e),this._widgetContainers=new Map,this.getApiOptions=()=>({...vn.defaults,...this.props.apiOptions}),this._getInitialWidgetState=n=>{const t=Ne(n.widgets);return{widgetInfo:t,widgetProps:this._getAllWidgetsStartProps(t,n)}},this._getAllWidgetsStartProps=(n,t)=>{var u;const{apiOptions:a,problemNum:i}=t,o={},{strings:s}=this.props;return gn(n).forEach(([l,d])=>{o[l]=jt(d,s,i)}),(u=a==null?void 0:a.onWidgetStartProps)==null||u.call(a,o),o},this._getDefaultWidgetInfo=n=>{const t=qn.rTypeFromWidgetId.exec(n);return t==null?{}:{type:t[1],graded:!0,options:{}}},this._getWidgetInfo=n=>this.state.widgetInfo[n]||this._getDefaultWidgetInfo(n),this.renderWidget=(n,t,a)=>{const i=this.state.widgetInfo[t];if(i&&i.alignment==="full-width"&&(a.foundFullWidth=!0),i){const o=i&&i.type||n,s=g.contains(this.props.highlightedWidgets,t);return y.jsx(de,{id:t,ref:u=>{const l=oe(t);u!=null?this._widgetContainers.set(l,u):this._widgetContainers.delete(l)},type:o,initialProps:this.getWidgetProps(t),shouldHighlight:s,linterContext:Nr(this.props.linterContext,"widget")},oe(t))}return null},this.getSerializedState=n=>qe(n||this.state.widgetProps,(t,a)=>{const i=this.getWidgetInstance(a);return i&&i.getSerializedState?i.getSerializedState():t}),this.restoreSerializedState=(n,t)=>{const a=g.keys(n),i=g.keys(this.state.widgetProps);if(a.length!==i.length||g.intersection(a,i).length!==a.length){H.error("Refusing to restore bad serialized state:",R.Internal,{loggedMetadata:{serializedState:JSON.stringify(n),currentProps:JSON.stringify(this.state.widgetProps)}});return}let o=1;const s=()=>{--o,t&&o===0&&t()};this.setState({widgetProps:qe(n,(u,l)=>{const d=this.getWidgetInstance(l);if(d&&d.restoreSerializedState){++o;const p=d.restoreSerializedState(u,s);return g.extend({},this.state.widgetProps[l],p)}return u})},()=>{setTimeout(s,0)})},this.showRationalesForCurrentlySelectedChoices=()=>{Object.keys(this.props.widgets).forEach(n=>{const t=this.getWidgetInstance(n);t&&t.showRationalesForCurrentlySelectedChoices&&t.showRationalesForCurrentlySelectedChoices(this._getWidgetInfo(n).options)})},this.deselectIncorrectSelectedChoices=()=>{Object.keys(this.props.widgets).forEach(n=>{const t=this.getWidgetInstance(n);t&&t.deselectIncorrectSelectedChoices&&t.deselectIncorrectSelectedChoices()})},this.findInternalWidgets=n=>{let t;if(typeof n=="string")if(n.indexOf(" ")!==-1){const i=n;t=(o,s,u)=>o===i}else{const i=n;t=(o,s,u)=>s.type===i}else t=n;return this.widgetIds.filter(i=>{const o=this._getWidgetInfo(i),s=this.getWidgetInstance(i);return t(i,o,s)}).map(this.getWidgetInstance)},this.findWidgets=n=>[...this.findInternalWidgets(n),...this.props.findExternalWidgets(n)],this.getWidgetInstance=n=>{const t=this._widgetContainers.get(oe(n));return t?t.getWidget():null},this._onWidgetFocus=(n,t=[])=>{if(!g.isArray(t))throw new S("widget props.onFocus focusPath must be an Array, but was"+JSON.stringify(t),R.Internal);this._setCurrentFocus([n].concat(t))},this._onWidgetBlur=(n,t)=>{const a=this._currentFocus,i=[n].concat(t);g.isEqual(i,a)&&g.defer(()=>{g.isEqual(this._currentFocus,a)&&this._setCurrentFocus(null)})},this.getContent=(n,t)=>t.jiptContent||n.content,this.shouldRenderJiptPlaceholder=(n,t)=>J().JIPT.useJIPT&&t.jiptContent==null&&n.content.indexOf("crwdns")!==-1,this.replaceJiptContent=(n,t)=>{if(t==null)this.setState({jiptContent:n});else{/^\s*(`{3,}|~{3,})\s*(\S+)?\s*\n([\s\S]+?)\s*\1\s*$/.test(n)||(/\S\n\s*\n\S/.test(n)?n="$\\large{\\red{\\text{Please translate each paragraph to a single paragraph.}}}$":/^\s*$/.test(n)&&(n="$\\large{\\red{\\text{Translated paragraph is currently empty}}}$"));const i=this.getContent(this.props,this.state),o=Ge.parseToArray(i);o[t]=n,this.setState({jiptContent:Ge.joinFromArray(o)})}},this.outputMarkdown=(n,t)=>{if(g.isArray(n)){const o=t.key,s=[];let u=!1;for(let l=0;l<n.length;l++){t.key=l,t.paragraphIndex=l;const d=this.outputMarkdown(n[l],t),p=typeof d=="string";typeof d=="string"&&u?s[s.length-1]+=d:s.push(d),u=p}return t.key=o,s}this._foundTextNodes=!1,t.foundFullWidth=!1;const a=this.outputNested(n,t);let i;return this.translationIndex!=null?i=null:i=ve({"perseus-paragraph-centered":!this._foundTextNodes,"perseus-paragraph-full-width":t.foundFullWidth&&n.content.length===1}),y.jsx(sn,{className:i,translationIndex:this.translationIndex,paragraphIndex:t.paragraphIndex,inline:this.props.inline,children:y.jsx(N,{children:a})},t.key)},this.outputNested=(n,t)=>{if(g.isArray(n)){const a=t.key,i=[];let o=!1;for(let s=0;s<n.length;s++){t.key=s;const u=this.outputNested(n[s],t),l=typeof u=="string";typeof u=="string"&&o?i[i.length-1]+=u:i.push(u),o=l}return t.key=a,i}return this.outputNode(n,this.outputNested,t)},this.outputNode=(n,t,a)=>{const i=this.getApiOptions(),o=i.imagePlaceholder;if(n.type==="widget"){const s=i.widgetPlaceholder;return s||(this._foundTextNodes=!0,this.widgetIds.includes(n.id)?y.jsx("span",{className:"renderer-widget-error",children:["Widget [[","☃"," ",n.id,"]] already exists."].join("")},a.key):(this.widgetIds.push(n.id),this.renderWidget(n.widgetType,n.id,a)))}if(n.type==="blockMath"){const s=Ut(n.content),u={overflowX:"auto",overflowY:"hidden",paddingTop:10,paddingBottom:10,marginTop:-10,marginBottom:-10};if(i.isMobile){const d={marginLeft:-16,marginRight:-16},p={paddingLeft:16,paddingRight:16},w={...u,...Ye.mobileZoomableParentFix};return y.jsx("div",{className:"perseus-block-math",style:d,children:y.jsx(N,{children:y.jsx("div",{className:"perseus-block-math-inner",style:{...w,...p},children:y.jsx(bn,{children:s})})})},a.key)}return y.jsx("div",{className:"perseus-block-math",children:y.jsx(N,{children:y.jsx("div",{className:"perseus-block-math-inner",style:u,children:y.jsx(he.Consumer,{children:({setAssetStatus:l})=>y.jsx(We,{setAssetStatus:l,children:s})})})})},a.key)}if(n.type==="math"){const s=n.content.replace(/\{align[*]?\}/g,"{aligned}");return y.jsx("span",{style:{whiteSpace:"nowrap"},children:y.jsxs(N,{children:[y.jsx("span",{}),y.jsx(he.Consumer,{children:({setAssetStatus:u})=>y.jsx(We,{onRender:this.props.onRender,setAssetStatus:u,children:s})}),y.jsx("span",{})]})},a.key)}if(n.type==="image"){if(o)return o;const s=g.has(this.props.images,n.target)?this.props.images[n.target]:null,u=!a.inTable;return y.jsx(N,{children:y.jsx(he.Consumer,{children:({setAssetStatus:l})=>y.jsx(hn,{setAssetStatus:l,src:G.sanitizeUrl(n.target),alt:n.alt,title:n.title,responsive:u,onUpdate:this.props.onRender,zoomToFullSizeOnMobile:i.isMobile&&i.isArticle,...s})})},a.key)}if(n.type==="columns")return this._isTwoColumn=!0,y.jsx(N,{children:G.ruleOutput(n,t,a)},a.key);if(n.type==="text")return Kt.test(n.content)&&(this._foundTextNodes=!0),o&&Bt.test(n.content)?o:n.content;if(n.type==="table"||n.type==="titledTable"){const s=G.ruleOutput(n,t,{...a,isMobile:i.isMobile,inTable:!0});if(!i.isMobile)return s;const u=16,l={marginLeft:-u,marginRight:-u},p={...{paddingLeft:0,paddingRight:0},...Ye.mobileZoomableParentFix},w=y.jsx("div",{style:{...p,overflowX:"auto"},children:y.jsx(N,{children:y.jsx(wn,{animateHeight:!0,children:s})})});return y.jsx("div",{style:l,children:w})}return y.jsx(N,{children:G.ruleOutput(n,t,a)},a.key)},this.handleRender=n=>{const t=this.props.onRender,a=n.onRender;if(t!==B||a!==B){const i=yn(ke.findDOMNode(this)).find("img");a!==B&&i.off("load",a),t!==B&&i.on("load",t)}t()},this._setCurrentFocus=n=>{const t=this.getApiOptions();if(!$t(n,this._currentFocus)){const a=this._currentFocus;a&&this.blurPath(a),this._currentFocus=n,t.onFocusChange(this._currentFocus,a)}},this.focus=()=>{var a;let n,t;for(let i=0;i<this.widgetIds.length;i++){const o=this.widgetIds[i],s=this.getWidgetInstance(o),u=(a=s==null?void 0:s.focus)==null?void 0:a.call(s);if(u){n=o,t=u;break}}if(n){let i;return typeof t=="object"?(i=[n].concat(t.path||[]),H.error("Renderer received a focus result of type 'object' instead of the expected type 'boolean'",R.Internal,{loggedMetadata:{focusResult:JSON.stringify(t),currentProps:JSON.stringify(this.state.widgetProps)}})):i=[n],this._setCurrentFocus(i),!0}},this.getDOMNodeForPath=n=>{const t=g.first(n),a=g.rest(n),i=this.getWidgetInstance(t);if(i!=null&&i.getDOMNodeForPath)return i.getDOMNodeForPath(a);if(a.length===0)return ke.findDOMNode(i)},this.getInputPaths=()=>{const n=[];return this.widgetIds.forEach(t=>{const a=this.getWidgetInstance(t);a&&a.getInputPaths&&a.getInputPaths().forEach(o=>{const s=[t].concat(o);n.push(s)})}),n},this.focusPath=n=>{var o;if(g.isEqual(this._currentFocus,n))return;this._currentFocus&&this.blurPath(this._currentFocus);const t=g.first(n),a=g.rest(n),i=this.getWidgetInstance(t);(o=i==null?void 0:i.focusInputPath)==null||o.call(i,a)},this.blurPath=n=>{var o;if(!g.isEqual(this._currentFocus,n))return;const t=g.first(n),a=g.rest(n);if(this.getWidgetInstance(t)){const s=this.getWidgetInstance(t);(o=s==null?void 0:s.blurInputPath)==null||o.call(s,a)}},this.blur=()=>{this._currentFocus&&this.blurPath(this._currentFocus)},this.serialize=()=>{const n={};return g.each(this.state.widgetInfo,function(t,a){const o=this.getWidgetInstance(a).serialize();g.isEmpty(o)||(n[a]=o)},this),n},this._setWidgetProps=(n,t,a,i)=>{this.setState(o=>{const s={...o.widgetProps,[n]:{...o.widgetProps[n],...t}},u=i?o.lastUsedWidgetId:n;return i||this.props.onSerializedStateUpdated(this.getSerializedState(s)),{lastUsedWidgetId:u,widgetProps:s}},()=>{setTimeout(()=>{const o=a&&a();i||this.props.onInteractWithWidget(n),o!==!1&&this._setCurrentFocus([n])},0)})},this.setInputValue=(n,t,a)=>{var u;const i=g.first(n),o=g.rest(n),s=this.getWidgetInstance(i);(u=s==null?void 0:s.setInputValue)==null||u.call(s,o,t,a)},this.getWidgetIds=()=>this.widgetIds,this.handletranslationLintErrors=n=>{this._isMounted&&this.setState({translationLintErrors:n})},this._translationLinter=new zt,this.state={jiptContent:null,translationLintErrors:[],lastUsedWidgetId:null,...this._getInitialWidgetState(e)}}componentDidMount(){this._isMounted=!0,this.handleRender({}),this._currentFocus=null,this.props.serializedState&&this.restoreSerializedState(this.props.serializedState),this.props.linterContext.highlightLint&&this._translationLinter.runLinter(this.props.content,this.handletranslationLintErrors)}UNSAFE_componentWillReceiveProps(e){g.isEqual(g.pick(this.props,Ue),g.pick(e,Ue))||this.setState(this._getInitialWidgetState(e))}shouldComponentUpdate(e,n){if(this.props.alwaysUpdate)return!0;const t=!g.isEqual(this.state,n);return!g.isEqual(this.props,e)||t}UNSAFE_componentWillUpdate(e,n){const t=this.shouldRenderJiptPlaceholder(this.props,this.state),a=this.shouldRenderJiptPlaceholder(e,n),i=this.getContent(this.props,this.state),o=this.getContent(e,n),s=this.props.highlightedWidgets,u=e.highlightedWidgets;this.reuseMarkdown=!t&&!a&&i===o&&g.isEqual(this.state.translationLintErrors,n.translationLintErrors)&&(!this.props.linterContext.highlightLint||g.isEqual(this.props.widgets,e.widgets))&&this.props.linterContext.highlightLint===e.linterContext.highlightLint&&s===u}componentDidUpdate(e,n){this.handleRender(e),this.widgetIds.forEach(t=>{const a=this._widgetContainers.get(oe(t));a==null||a.replaceWidgetProps(this.getWidgetProps(t))}),this.props.serializedState&&!g.isEqual(this.props.serializedState,this.getSerializedState())&&this.restoreSerializedState(this.props.serializedState),this.props.linterContext.highlightLint&&this._translationLinter.runLinter(this.props.content,this.handletranslationLintErrors)}componentWillUnmount(){this.widgetIds=[],this.translationIndex!=null&&J().rendererTranslationComponents.removeComponentAtIndex(this.translationIndex),this._isMounted=!1}getWidgetProps(e){const n=this.getApiOptions(),t=this.state.widgetProps[e]||{},a=this.state.widgetInfo[e],i=this.props.reviewMode&&a?a.options:null;this._interactionTrackers||(this._interactionTrackers={});let o=this._interactionTrackers[e];return o||(o=this._interactionTrackers[e]=new Lr(n.trackInteraction,a&&a.type,e,_t(a&&a.type))),{...t,widgetId:e,alignment:a&&a.alignment,static:a==null?void 0:a.static,problemNum:this.props.problemNum,apiOptions:this.getApiOptions(),keypadElement:this.props.keypadElement,questionCompleted:this.props.questionCompleted,showSolutions:this.props.showSolutions,onFocus:g.partial(this._onWidgetFocus,e),onBlur:g.partial(this._onWidgetBlur,e),findWidgets:this.findWidgets,reviewModeRubric:i,reviewMode:this.props.reviewMode,onChange:(s,u,l=!1)=>{this._setWidgetProps(e,s,u,l)},trackInteraction:o.track,isLastUsedWidget:e===this.state.lastUsedWidgetId}}emptyWidgets(){return Gt(this.state.widgetInfo,this.widgetIds,this.getUserInputMap(),this.props.strings,this.context.locale)}getUserInput(){return this.widgetIds.map(e=>{const n=this.getWidgetInstance(e);if(n&&n.getUserInput)return n.getUserInput()})}getUserInputMap(){const e={};return this.widgetIds.forEach(n=>{const t=this.getWidgetInstance(n);t!=null&&t.getUserInputMap?e[n]=t.getUserInputMap():t!=null&&t.getUserInput&&(e[n]=t.getUserInput())}),e}getPromptJSON(){const{content:e}=this.props,n={};return this.widgetIds.forEach(t=>{var i;const a=this.getWidgetInstance(t);n[t]=((i=a==null?void 0:a.getPromptJSON)==null?void 0:i.call(a))||{}}),{content:e,widgets:n}}score(){const e=dn(this.state.widgetInfo,this.widgetIds,this.getUserInputMap(),this.props.strings,this.context.locale);return on(e)}render(){const e=this.getApiOptions();if(this.reuseMarkdown)return this.lastRenderedMarkdown;const n=this.getContent(this.props,this.state);if(this.widgetIds=[],this.shouldRenderJiptPlaceholder(this.props,this.state)&&(this.translationIndex||(this.translationIndex=J().rendererTranslationComponents.addComponent(this)),!e.isArticle))return y.jsx(Te,{children:y.jsx("div",{"data-perseus-component-index":this.translationIndex,children:n})});this._isTwoColumn=!1;const t=this.props.inline?G.parseInline(n,{isJipt:this.translationIndex!=null}):G.parse(n,{isJipt:this.translationIndex!=null});if(this.props.linterContext.highlightLint){const o={content:this.props.content,widgets:this.props.widgets,...this.props.linterContext};Er(t,o,!0),this._translationLinter.applyLintErrors(t,[...this.state.translationLintErrors,...this.props.legacyPerseusLint||[]])}const a=this.outputMarkdown(t,{baseElements:e.baseElements}),i=ve({[we.RENDERER]:!0,[we.RESPONSIVE_RENDERER]:!0,[we.TWO_COLUMN_RENDERER]:this._isTwoColumn});return this.lastRenderedMarkdown=y.jsx(Te,{children:y.jsx("div",{className:i,children:a})}),this.lastRenderedMarkdown}};me.contextType=cn,me.defaultProps={content:"",widgets:{},images:{},highlightedWidgets:[],questionCompleted:!1,showSolutions:"none",onRender:B,onInteractWithWidget:function(){},findExternalWidgets:()=>[],alwaysUpdate:!1,reviewMode:!1,serializedState:null,onSerializedStateUpdated:()=>{},linterContext:He};let Ce=me;const Ye={mobileZoomableParentFix:{transform:"translate3d(0,0,0)"}};Ce.__docgenInfo={description:"",methods:[{name:"getApiOptions",docblock:null,modifiers:[],params:[],returns:null},{name:"_getInitialWidgetState",docblock:null,modifiers:[],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`Partial<React.ContextType<typeof DependenciesContext>> & {
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    correctCrossedOut: string;
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
    choiceCrossedOutCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choiceCrossedOut: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    crossOut: string;
    crossOutOption: string;
    crossOutChoice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
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
    // The following strings are used for interactive graph SR descriptions.
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
    srCircleRadiusPoint: ({
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
    srAngleSideAtCoordinates: ({
        point,
        side,
        x,
        y,
    }: {
        point: number;
        side: string;
        x: string;
        y: string;
    }) => string;
    srAngleVertexAtCoordinatesWithAngleMeasure: ({
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
    // The above strings are used for interactive graph SR descriptions.
}`,signature:{properties:[{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"correctCrossedOut",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOut",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"crossOut",value:{name:"string",required:!0}},{key:"crossOutOption",value:{name:"string",required:!0}},{key:"crossOutChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPoint",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleSideAtCoordinates",value:{name:"signature",type:"function",raw:`({
    point,
    side,
    x,
    y,
}: {
    point: number;
    side: string;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point: number;
    side: string;
    x: string;
    y: string;
}`,signature:{properties:[{key:"point",value:{name:"number",required:!0}},{key:"side",value:{name:"string",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexAtCoordinatesWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}}],returns:null},{name:"_getAllWidgetsStartProps",docblock:null,modifiers:[],params:[{name:"allWidgetInfo",optional:!1,type:null},{name:"props",optional:!1,type:null}],returns:null},{name:"_getDefaultWidgetInfo",docblock:null,modifiers:[],params:[{name:"widgetId",optional:!1,type:{name:"string"}}],returns:null},{name:"_getWidgetInfo",docblock:null,modifiers:[],params:[{name:"widgetId",optional:!1,type:{name:"string"}}],returns:{type:{name:"union",raw:`| CategorizerWidget
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
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}]}}},{name:"renderWidget",docblock:null,modifiers:[],params:[{name:"impliedType",optional:!1,type:{name:"string"}},{name:"id",optional:!1,type:{name:"string"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    isMobile?: boolean;
    inTable?: boolean;
    key?: number;
    paragraphIndex?: number;
    foundFullWidth?: boolean;
    baseElements?: any;
}`,signature:{properties:[{key:"isMobile",value:{name:"boolean",required:!1}},{key:"inTable",value:{name:"boolean",required:!1}},{key:"key",value:{name:"number",required:!1}},{key:"paragraphIndex",value:{name:"number",required:!1}},{key:"foundFullWidth",value:{name:"boolean",required:!1}},{key:"baseElements",value:{name:"any",required:!1}}]},alias:"WidgetState"}}],returns:null},{name:"getWidgetProps",docblock:null,modifiers:[],params:[{name:"widgetId",optional:!1,type:{name:"string"}}],returns:{type:{name:"intersection",raw:`RenderProps & {
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
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,elements:[{name:"any"},{name:"signature",type:"object",raw:`{
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
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`},{name:"signature",type:"object",raw:`{
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"GroupMetadataEditor",value:{name:"NonNullable",elements:[{name:'Readonly["GroupMetadataEditor"]',raw:'APIOptions["GroupMetadataEditor"]'}],raw:'NonNullable<APIOptions["GroupMetadataEditor"]>',required:!0}},{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
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
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewModeRubric",value:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"union",raw:`| PerseusCategorizerWidgetOptions
| PerseusCSProgramWidgetOptions
| PerseusDefinitionWidgetOptions
| PerseusDropdownWidgetOptions
| PerseusExplanationWidgetOptions
| PerseusExpressionWidgetOptions
| PerseusGradedGroupSetWidgetOptions
| PerseusGradedGroupWidgetOptions
| PerseusIFrameWidgetOptions
| PerseusImageWidgetOptions
| PerseusInputNumberWidgetOptions
| PerseusInteractionWidgetOptions
| PerseusInteractiveGraphWidgetOptions
| PerseusLabelImageWidgetOptions
| PerseusMatcherWidgetOptions
| PerseusMatrixWidgetOptions
| PerseusMeasurerWidgetOptions
| PerseusMoleculeRendererWidgetOptions
| PerseusNumberLineWidgetOptions
| PerseusNumericInputWidgetOptions
| PerseusOrdererWidgetOptions
| PerseusPassageRefTargetWidgetOptions
| PerseusPassageRefWidgetOptions
| PerseusPassageWidgetOptions
| PerseusPhetSimulationWidgetOptions
| PerseusPlotterWidgetOptions
| PerseusRadioWidgetOptions
| PerseusSorterWidgetOptions
| PerseusTableWidgetOptions
| PerseusVideoWidgetOptions`,elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The ID of the CS program to embed
    programID: string;
    // Deprecated.  Always null and sometimes omitted entirely.
    programType?: any;
    // Settings that you add here are available to the program as an object returned by Program.settings()
    settings: ReadonlyArray<PerseusCSProgramSetting>;
    // If you show the editor, you should use the "full-width" alignment to make room for the width of the editor.
    showEditor: boolean;
    // Whether to show the execute buttons
    showButtons: boolean;
    // TODO(benchristel): width is not used. Delete it?
    // The width of the widget
    width: number;
    // The height of the widget
    height: number;
    // TODO(benchristel): static is not used. Delete it?
    // Always false
    static: boolean;
}`,signature:{properties:[{key:"programID",value:{name:"string",required:!0}},{key:"programType",value:{name:"any",required:!1}},{key:"settings",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The name/key of the setting
    name: string;
    // The value of the setting
    value: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"ReadonlyArray<PerseusCSProgramSetting>",required:!0}},{key:"showEditor",value:{name:"boolean",required:!0}},{key:"showButtons",value:{name:"boolean",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable text; the word to define. e.g. "vertex"
    togglePrompt: string;
    // Translatable text; the definition of the word. e.g. "where 2 rays connect"
    definition: string;
    // Always false. Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"togglePrompt",value:{name:"string",required:!0}},{key:"definition",value:{name:"string",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A list of choices for the dropdown
    choices: ReadonlyArray<PerseusDropdownChoice>;
    // Translatable Text; placeholder text for a dropdown. e.g. "Please select a fruit"
    placeholder: string;
    // Always false.  Not used for this widget
    static: boolean;
    // Translatable Text; visible label for the dropdown
    visibleLabel?: string;
    // Translatable Text; aria label that screen readers will read
    ariaLabel?: string;
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable text; The text for the option. e.g. "Banana" or "Orange"
    content: string;
    // Whether this is the correct option or not
    correct: boolean;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"correct",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<PerseusDropdownChoice>",required:!0}},{key:"placeholder",value:{name:"string",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; The clickable text to expand an explanation.  e.g. "What is an apple?"
    showPrompt: string;
    // Translatable Text; The cliclable text to hide an explanation. e.g. "Thanks. I got it!"
    hidePrompt: string;
    // Translatable Markdown; The explanation that is shown when showPrompt is clicked.  e.g. "An apple is a tasty fruit."
    explanation: string;
    // explanation fields can embed widgets. When they do, the details of the widgets are here.
    widgets: PerseusWidgetsMap;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"showPrompt",value:{name:"string",required:!0}},{key:"hidePrompt",value:{name:"string",required:!0}},{key:"explanation",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The expression forms the answer may come in
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    buttonSets: LegacyButtonSets;
    // Variables that can be used as functions.  Default: ["f", "g", "h"]
    functions: ReadonlyArray<string>;
    // Use x for rendering multiplication instead of a center dot.
    times: boolean;
    // visible label associated with the MathQuill field
    visibleLabel?: string;
    // aria label for screen readers attached to MathQuill field
    ariaLabel?: string;
    // Controls when buttons for special characters are visible when using a
    // desktop browser.  Defaults to "focused".
    // NOTE: This isn't listed in perseus-format.js or perseus_data.go, but
    // appears in item data in the datastore.
    buttonsVisible?: "always" | "never" | "focused";
}`,signature:{properties:[{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The TeX form of the expression.  e.g. "x\\\\cdot3=y"
    value: string;
    // The Answer expression must have the same form
    form: boolean;
    // The answer expression must be fully expanded and simplified
    simplify: boolean;
    // Whether the form is considered "correct", "wrong", or "ungraded"
    considered: (typeof PerseusExpressionAnswerFormConsidered)[number];
    // A key to identify the answer form in a list
    // NOTE: perseus-format.js says this is required even though it isn't necessary.
    key?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"ReadonlyArray<PerseusExpressionAnswerForm>",required:!0}},{key:"buttonSets",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "basic"
| "basic+div"
| "trig"
| "prealgebra"
| "logarithms"
| "basic relations"
| "advanced relations"
| "scientific"`,elements:[{name:"literal",value:'"basic"'},{name:"literal",value:'"basic+div"'},{name:"literal",value:'"trig"'},{name:"literal",value:'"prealgebra"'},{name:"literal",value:'"logarithms"'},{name:"literal",value:'"basic relations"'},{name:"literal",value:'"advanced relations"'},{name:"literal",value:'"scientific"'}]}],raw:`ReadonlyArray<
    | "basic"
    | "basic+div"
    | "trig"
    | "prealgebra"
    | "logarithms"
    | "basic relations"
    | "advanced relations"
    | "scientific"
>`,required:!0}},{key:"functions",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"times",value:{name:"boolean",required:!0}},{key:"visibleLabel",value:{name:"string",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}},{key:"buttonsVisible",value:{name:"union",raw:'"always" | "never" | "focused"',elements:[{name:"literal",value:'"always"'},{name:"literal",value:'"never"'},{name:"literal",value:'"focused"'}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // A list of Widget Groups
    gradedGroups: ReadonlyArray<PerseusGradedGroupWidgetOptions>;
}`,signature:{properties:[{key:"gradedGroups",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Text; A title to be displayed for the group.
    title: string;
    // Not used in Perseus (but is set in (en, pt) production data)
    hasHint?: boolean | null | undefined;
    // A section to define hints for the group.
    hint?: PerseusRenderer | null | undefined;
    // Translatable Markdown. May include widgets and images embedded.
    content: string;
    // See PerseusRenderer.widgets
    widgets: PerseusWidgetsMap;
    // Not used in Perseus
    widgetEnabled?: boolean | null | undefined;
    // Not used in Perseus
    immutableWidgets?: boolean | null | undefined;
    // See PerseusRenderer.images
    images: {
        [key: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"hasHint",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"hint",value:{name:"union",raw:"PerseusRenderer | null | undefined",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"widgetEnabled",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"immutableWidgets",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [key: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}}],raw:"ReadonlyArray<PerseusGradedGroupWidgetOptions>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; A title to be displayed for the group.
    title: string;
    // Not used in Perseus (but is set in (en, pt) production data)
    hasHint?: boolean | null | undefined;
    // A section to define hints for the group.
    hint?: PerseusRenderer | null | undefined;
    // Translatable Markdown. May include widgets and images embedded.
    content: string;
    // See PerseusRenderer.widgets
    widgets: PerseusWidgetsMap;
    // Not used in Perseus
    widgetEnabled?: boolean | null | undefined;
    // Not used in Perseus
    immutableWidgets?: boolean | null | undefined;
    // See PerseusRenderer.images
    images: {
        [key: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"hasHint",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"hint",value:{name:"union",raw:"PerseusRenderer | null | undefined",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}},{key:"widgetEnabled",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"immutableWidgets",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [key: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A URL to display OR a CS Program ID
    url: string;
    // Settings that you add here are available to the program as an object returned by Program.settings()
    settings: ReadonlyArray<PerseusCSProgramSetting>;
    // The width of the widget
    width: number | string;
    // The height of the widget
    height: number | string;
    // Whether to allow the IFrame to become full-screen (like a video)
    allowFullScreen: boolean;
    // Whether to allow the iframe content to redirect the page
    allowTopNavigation?: boolean;
    // Always false
    static: boolean;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"settings",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The name/key of the setting
    name: string;
    // The value of the setting
    value: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"ReadonlyArray<PerseusCSProgramSetting>",required:!0}},{key:"width",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!0}},{key:"height",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!0}},{key:"allowFullScreen",value:{name:"boolean",required:!0}},{key:"allowTopNavigation",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Markdown; Text to be shown for the title of the image
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    title?: string;
    // Translatable Markdown; Text to be shown in the caption section of an image
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    caption?: string;
    // Translatable Text; The alt text to be shown in the img.alt attribute
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alt?: string;
    // The image details for the image to be displayed
    backgroundImage: PerseusImageBackground;
    // Always false.  Not used for this widget
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // A list of labels to display on the image
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    labels?: ReadonlyArray<PerseusImageLabel>;
    // The range on the image render for labels
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    range?: [Interval, Interval];
    // The box on the image render for labels. The same as backgroundImage.width and backgroundImage.height
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    box?: Size;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"caption",value:{name:"string",required:!1}},{key:"alt",value:{name:"string",required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Text; The content of the label to display
    content: string;
    // The visual alignment of the label. default: "center"
    alignment: string;
    // The point on the image to display the label
    coordinates: ReadonlyArray<number>;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"alignment",value:{name:"string",required:!0}},{key:"coordinates",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}}],raw:"ReadonlyArray<PerseusImageLabel>",required:!1}},{key:"range",value:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}},{key:"box",value:{name:"tuple",raw:"[width: number, height: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    answerType?:
        | "number"
        | "decimal"
        | "integer"
        | "rational"
        | "improper"
        | "mixed"
        | "percent"
        | "pi";
    inexact?: boolean;
    maxError?: number | string;
    rightAlign?: boolean;
    simplify: "required" | "optional" | "enforced";
    size: "normal" | "small";
    value: string | number;
    customKeypad?: boolean;
}`,signature:{properties:[{key:"answerType",value:{name:"union",raw:`| "number"
| "decimal"
| "integer"
| "rational"
| "improper"
| "mixed"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"number"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"integer"'},{name:"literal",value:'"rational"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!1}},{key:"inexact",value:{name:"boolean",required:!1}},{key:"maxError",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"rightAlign",value:{name:"boolean",required:!1}},{key:"simplify",value:{name:"union",raw:'"required" | "optional" | "enforced"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"optional"'},{name:"literal",value:'"enforced"'}],required:!0}},{key:"size",value:{name:"union",raw:'"normal" | "small"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"small"'}],required:!0}},{key:"value",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!0}},{key:"customKeypad",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The definition of the graph
    graph: PerseusInteractionGraph;
    // The elements of the graph
    elements: ReadonlyArray<PerseusInteractionElement>;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"graph",value:{name:"signature",type:"object",raw:`{
    // "canvas", "graph"
    editableSettings?: ReadonlyArray<"canvas" | "graph">;
    // The Grid Canvas size. e.g. [400, 140]
    box: Size;
    // The Axis labels.  e.g. ["x", "y"]
    labels: ReadonlyArray<string>;
    // The Axis ranges. e.g. [[-10, 10], [-10, 10]]
    range: [Interval, Interval];
    // The steps in the grid. default [1, 1]
    gridStep: [number, number];
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
    // The snap steps. default [0.5, 0.5]
    snapStep?: [number, number];
    // Whether the grid is valid or not.  Do the numbers all make sense?
    // NOTE(jeremy) The editor for this widget sometimes stores the graph
    // editor validation error message into this field. It seems innocuous
    // because it looks like many of these usages don't actually use the graph
    // at all.
    valid?: boolean | string;
    // An optional background image to use
    backgroundImage?: PerseusImageBackground;
    // Whether to show the Protractor tool overlayed on top of the graph
    showProtractor?: boolean;
    // Whether to show the Ruler tool overlayed on top of the graph
    showRuler?: boolean;
    // The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft", "yd", "mi"
    rulerLabel?: string;
    // How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16
    rulerTicks?: number;
    // This controls the number (and position) of the tick marks for the X and Y axis. e.g. [1, 1]
    tickStep: [number, number];
}`,signature:{properties:[{key:"editableSettings",value:{name:"ReadonlyArray",elements:[{name:"union",raw:'"canvas" | "graph"',elements:[{name:"literal",value:'"canvas"'},{name:"literal",value:'"graph"'}]}],raw:'ReadonlyArray<"canvas" | "graph">',required:!1}},{key:"box",value:{name:"tuple",raw:"[width: number, height: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"range",value:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"snapStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"valid",value:{name:"union",raw:"boolean | string",elements:[{name:"boolean"},{name:"string"}],required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"showProtractor",value:{name:"boolean",required:!1}},{key:"showRuler",value:{name:"boolean",required:!1}},{key:"rulerLabel",value:{name:"string",required:!1}},{key:"rulerTicks",value:{name:"number",required:!1}},{key:"tickStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}}]},required:!0}},{key:"elements",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| {
      type: "function";
      // An identifier for the element
      key: string;
      options: PerseusInteractionFunctionElementOptions;
  }
| {
      type: "label";
      // An identifier for the element
      key: string;
      options: PerseusInteractionLabelElementOptions;
  }
| {
      type: "line";
      // An identifier for the element
      key: string;
      options: PerseusInteractionLineElementOptions;
  }
| {
      type: "movable-line";
      // An identifier for the element
      key: string;
      options: PerseusInteractionMovableLineElementOptions;
  }
| {
      type: "movable-point";
      // An identifier for the element
      key: string;
      options: PerseusInteractionMovablePointElementOptions;
  }
| {
      type: "parametric";
      // An identifier for the element
      key: string;
      options: PerseusInteractionParametricElementOptions;
  }
| {
      type: "point";
      // An identifier for the element
      key: string;
      options: PerseusInteractionPointElementOptions;
  }
| {
      type: "rectangle";
      // An identifier for the element
      key: string;
      options: PerseusInteractionRectangleElementOptions;
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "function";
    // An identifier for the element
    key: string;
    options: PerseusInteractionFunctionElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The definition of the function to draw on the graph.  e.g "x^2 + 1"
    value: string;
    // The name of the function like f(n). default: "f"
    funcName: string;
    // The range of points to start plotting
    rangeMin: string;
    // The range of points to end plotting
    rangeMax: string;
    // The color of the stroke. e.g. #6495ED
    color: string;
    // If the function stroke has a dash, what is it? options: "", "-", "- ", ".", ". "
    strokeDasharray: string;
    // The thickness of the stroke
    strokeWidth: number;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"funcName",value:{name:"string",required:!0}},{key:"rangeMin",value:{name:"string",required:!0}},{key:"rangeMax",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"strokeDasharray",value:{name:"string",required:!0}},{key:"strokeWidth",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    // An identifier for the element
    key: string;
    options: PerseusInteractionLabelElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable Text; the content of the label
    label: string;
    // The color of the label.  e.g. "red"
    color: string;
    // The X location of the label
    coordX: string;
    // The Y location of the label
    coordY: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"coordX",value:{name:"string",required:!0}},{key:"coordY",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    // An identifier for the element
    key: string;
    options: PerseusInteractionLineElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // A color code for the line segment.  e.g. "#FFOOAF"
    color: string;
    // The start of the line segment (X)
    startX: string;
    // The start of the line segment (Y)
    startY: string;
    // The end of the line segment (X)
    endX: string;
    // The end of the line segment (Y)
    endY: string;
    // If the line stroke has a dash, what is it? options: "", "-", "- ", ".", ". "
    strokeDasharray: string;
    // The thickness of the line
    strokeWidth: number;
    // Does the line have an arrow point to it? options: "", "->"
    arrows: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"startX",value:{name:"string",required:!0}},{key:"startY",value:{name:"string",required:!0}},{key:"endX",value:{name:"string",required:!0}},{key:"endY",value:{name:"string",required:!0}},{key:"strokeDasharray",value:{name:"string",required:!0}},{key:"strokeWidth",value:{name:"number",required:!0}},{key:"arrows",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "movable-line";
    // An identifier for the element
    key: string;
    options: PerseusInteractionMovableLineElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"movable-line"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The start of the line segment (X)
    startX: string;
    // The start of the line segment (Y)
    startY: string;
    // Start updates (Xn, Yn) for n
    startSubscript: number;
    // The end of the line segment (X)
    endX: string;
    // The end of the line segment (Y)
    endY: string;
    // End updates (Xm, Ym) for m
    endSubscript: number;
    // How to constrain this line? options "none", "snap", "x", "y"
    constraint: string;
    // The snap resolution when constraint is set to "snap"
    snap: number;
    // The constraint function for when constraint is set to "x" or "y"
    constraintFn: string;
    // The lowest possible X value
    constraintXMin: string;
    // The highest possible X value
    constraintXMax: string;
    // The lowest possible Y value
    constraintYMin: string;
    // The highest possible Y value
    constraintYMax: string;
}`,signature:{properties:[{key:"startX",value:{name:"string",required:!0}},{key:"startY",value:{name:"string",required:!0}},{key:"startSubscript",value:{name:"number",required:!0}},{key:"endX",value:{name:"string",required:!0}},{key:"endY",value:{name:"string",required:!0}},{key:"endSubscript",value:{name:"number",required:!0}},{key:"constraint",value:{name:"string",required:!0}},{key:"snap",value:{name:"number",required:!0}},{key:"constraintFn",value:{name:"string",required:!0}},{key:"constraintXMin",value:{name:"string",required:!0}},{key:"constraintXMax",value:{name:"string",required:!0}},{key:"constraintYMin",value:{name:"string",required:!0}},{key:"constraintYMax",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "movable-point";
    // An identifier for the element
    key: string;
    options: PerseusInteractionMovablePointElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"movable-point"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The X position of the point
    startX: string;
    // The Y position of the point
    startY: string;
    // Update (Xn, Yn) for n
    varSubscript: number;
    // How to constrain this line? options "none", "snap", "x", "y"
    constraint: string;
    // The snap resolution when constraint is set to "snap"
    snap: number;
    // The constraint function for when constraint is set to "x" or "y"
    constraintFn: string;
    // The lowest possible X value
    constraintXMin: string;
    // The highest possible X value
    constraintXMax: string;
    // The lowest possible Y value
    constraintYMin: string;
    // The highest possible Y value
    constraintYMax: string;
}`,signature:{properties:[{key:"startX",value:{name:"string",required:!0}},{key:"startY",value:{name:"string",required:!0}},{key:"varSubscript",value:{name:"number",required:!0}},{key:"constraint",value:{name:"string",required:!0}},{key:"snap",value:{name:"number",required:!0}},{key:"constraintFn",value:{name:"string",required:!0}},{key:"constraintXMin",value:{name:"string",required:!0}},{key:"constraintXMax",value:{name:"string",required:!0}},{key:"constraintYMin",value:{name:"string",required:!0}},{key:"constraintYMax",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "parametric";
    // An identifier for the element
    key: string;
    options: PerseusInteractionParametricElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"parametric"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The function for the X coordinate. e.g. "\\\\cos(t)"
    x: string;
    // The function for the Y coordinate. e.g. "\\\\sin(t)"
    y: string;
    // The range of points to start plotting
    rangeMin: string;
    // The range of points to end plotting
    rangeMax: string;
    // The color of the stroke. e.g. #6495ED
    color: string;
    // If the function stroke has a dash, what is it? options: "", "-", "- ", ".", ". "
    strokeDasharray: string;
    // The thickness of the stroke
    strokeWidth: number;
}`,signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"rangeMin",value:{name:"string",required:!0}},{key:"rangeMax",value:{name:"string",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"strokeDasharray",value:{name:"string",required:!0}},{key:"strokeWidth",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "point";
    // An identifier for the element
    key: string;
    options: PerseusInteractionPointElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The color of the point.  e.g. "black"
    color: string;
    // The X coordinate of the point
    coordX: string;
    // The Y coordinate of the point
    coordY: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"coordX",value:{name:"string",required:!0}},{key:"coordY",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "rectangle";
    // An identifier for the element
    key: string;
    options: PerseusInteractionRectangleElementOptions;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"rectangle"',required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // The fill color.  e.g. "#EDD19B"
    color: string;
    // The lower left point X
    coordX: string;
    // The lower left point Y
    coordY: string;
    // The width of the rectangle
    width: string;
    // The height of the rectangle
    height: string;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"coordX",value:{name:"string",required:!0}},{key:"coordY",value:{name:"string",required:!0}},{key:"width",value:{name:"string",required:!0}},{key:"height",value:{name:"string",required:!0}}]},required:!0}}]}}]}],raw:"ReadonlyArray<PerseusInteractionElement>",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Where the little black axis lines & labels (ticks) should render.
    // Also known as the tick step. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    step: [number, number];
    // Where the grid lines on the graph will render. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    gridStep?: [x: number, y: number];
    // Where the graph points will lock to when they are dragged. default [0.5, 0.5]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    snapStep?: [x: number, y: number];
    // An optional image to use in the background
    backgroundImage?: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
    // How to label the X and Y axis.  default: ["x", "y"]
    labels?: ReadonlyArray<string>;
    // Whether to show the Protractor tool overlayed on top of the graph
    showProtractor: boolean;
    /**
     * Whether to show the Ruler tool overlayed on top of the graph.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    showRuler?: boolean;
    // Whether to show tooltips on the graph
    showTooltips?: boolean;
    /**
     * The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
     * "yd", "mi".
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerLabel?: string;
    /**
     * How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
     * an integer.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerTicks?: number;
    // The X and Y coordinate ranges for the view of the graph.  default: [[-10, 10], [-10, 10]]
    // NOTE(kevinb): perseus_data.go defines this as Array<Array<number>>
    // TODO(kevinb): Add a transform function to interactive-graph.jsx to
    // rename \`range\` to \`ranges\` so that things are less confusing.
    range: GraphRange;
    // The type of graph
    graph: PerseusGraphType;
    // The correct kind of graph, if being used to select function type
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    // Shapes (points, chords, etc) displayed on the graph that cannot
    // be moved by the user.
    lockedFigures?: ReadonlyArray<LockedFigure>;
    // Aria label that applies to the entire graph.
    fullGraphAriaLabel?: string;
    // Aria description that applies to the entire graph.
    fullGraphAriaDescription?: string;
}`,signature:{properties:[{key:"step",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"showProtractor",value:{name:"boolean",required:!0}},{key:"showRuler",value:{name:"boolean",required:!1},description:`Whether to show the Ruler tool overlayed on top of the graph.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"showTooltips",value:{name:"boolean",required:!1}},{key:"rulerLabel",value:{name:"string",required:!1},description:`The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
"yd", "mi".
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"rulerTicks",value:{name:"number",required:!1},description:`How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
an integer.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"range",value:{name:"tuple",raw:`[
    x: [min: number, max: number],
    y: [min: number, max: number],
]`,elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!1}},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!1}},{key:"lockedFigures",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"ReadonlyArray<LockedFigure>",required:!1}},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; Tex representation of choices
    choices: ReadonlyArray<string>;
    // The URL of the image
    imageUrl: string;
    // Translatable Text; To show up in the img.alt attribute
    imageAlt: string;
    // The height of the image
    imageHeight: number;
    // The width of the image
    imageWidth: number;
    // A list of markers to display on the image
    markers: ReadonlyArray<PerseusLabelImageMarker>;
    // Do not display answer choices in instructions
    hideChoicesFromInstructions: boolean;
    // Allow multiple answers per marker
    multipleAnswers: boolean;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"imageUrl",value:{name:"string",required:!0}},{key:"imageAlt",value:{name:"string",required:!0}},{key:"imageHeight",value:{name:"number",required:!0}},{key:"imageWidth",value:{name:"number",required:!0}},{key:"markers",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // A list of correct answers for this marker.  Often only one but can have multiple
    answers: ReadonlyArray<string>;
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // X Coordiate location of the marker on the image
    x: number;
    // Y Coordinate location of the marker on the image
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}}],raw:"ReadonlyArray<PerseusLabelImageMarker>",required:!0}},{key:"hideChoicesFromInstructions",value:{name:"boolean",required:!0}},{key:"multipleAnswers",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; Labels to adorn the headings for the columns.  Only 2 values [left, right]. e.g. ["Concepts", "Things"]
    labels: ReadonlyArray<string>;
    // Translatable Text; Static concepts to show in the left column. e.g. ["Fruit", "Color", "Clothes"]
    left: ReadonlyArray<string>;
    // Translatable Markup; Values that represent the concepts to be correlated with the concepts.  e.g. ["Red", "Shirt", "Banana"]
    right: ReadonlyArray<string>;
    // Order of the matched pairs matters. With this option enabled, only the order provided above will be treated as correct. This is useful when ordering is significant, such as in the context of a proof. If disabled, pairwise matching is sufficient. To make this clear, the left column becomes fixed in the provided order and only the cards in the right column can be moved.
    orderMatters: boolean;
    // Adds padding to the rows.  Padding is good for text, but not needed for images.
    padding: boolean;
}`,signature:{properties:[{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"orderMatters",value:{name:"boolean",required:!0}},{key:"padding",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; Shown before the matrix
    prefix?: string | undefined;
    // Translatable Text; Shown after the matrix
    suffix?: string | undefined;
    // A data matrix representing the "correct" answers to be entered into the matrix
    answers: PerseusMatrixWidgetAnswers;
    // The coordinate location of the cursor position at start. default: [0, 0]
    cursorPosition?: ReadonlyArray<number> | undefined;
    // The coordinate size of the matrix.  Only supports 2-dimensional matrix.  default: [3, 3]
    matrixBoardSize: ReadonlyArray<number>;
    // Whether this is meant to statically display the answers (true) or be used as an input field, graded against the answers
    static?: boolean | undefined;
}`,signature:{properties:[{key:"prefix",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"suffix",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>",required:!0}},{key:"cursorPosition",value:{name:"union",raw:"ReadonlyArray<number> | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},{name:"undefined"}],required:!1}},{key:"matrixBoardSize",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"static",value:{name:"union",raw:"boolean | undefined",elements:[{name:"boolean"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The image that the user is meant to measure
    image: PerseusImageBackground;
    // Whether to show the Protractor tool overlayed on top of the image
    showProtractor: boolean;
    // Whether to show the Ruler tool overlayed on top of the image
    showRuler: boolean;
    // The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft", "yd", "mi"
    rulerLabel: string;
    // How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16
    rulerTicks: number;
    // The number of image pixels per unit (label)
    rulerPixels: number;
    // The number of units to display on the ruler
    rulerLength: number;
    // Containing area [width, height]
    box: [number, number];
    // TODO(benchristel): static is not used. Remove it?
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"image",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0}},{key:"showProtractor",value:{name:"boolean",required:!0}},{key:"showRuler",value:{name:"boolean",required:!0}},{key:"rulerLabel",value:{name:"string",required:!0}},{key:"rulerTicks",value:{name:"number",required:!0}},{key:"rulerPixels",value:{name:"number",required:!0}},{key:"rulerLength",value:{name:"number",required:!0}},{key:"box",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    widgetId: string;
    rotationAngle?: number;
    smiles?: string;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"rotationAngle",value:{name:"number",required:!1}},{key:"smiles",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // The position of the endpoints of the number line. Setting the range constrains the position of the answer and the labels.
    range: ReadonlyArray<number>;
    // This controls the position of the left / right labels. By default, the labels are set by the range.  Note:  Ensure that the labels line up with the tick marks, or it may be confusing for users.
    labelRange: ReadonlyArray<number | null>;
    // This controls the styling of the labels for the two main labels as well as all the tick mark labels, if applicable. Options: "decimal", "improper", "mixed", "non-reduced"
    labelStyle: string;
    // Show label ticks
    labelTicks: boolean;
    // Show tick controller
    isTickCtrl?: boolean | null | undefined;
    // The range of divisions within the line
    divisionRange: ReadonlyArray<number>;
    // This controls the number (and position) of the tick marks. The number of divisions is constrained to the division range. Note:  The user will be able to specify the number of divisions in a number input.
    numDivisions: number | null | undefined;
    // This determines the number of different places the point will snap between two adjacent tick marks. Note: Ensure the required number of snap increments is provided to answer the question.
    snapDivisions: number;
    // This controls the number (and position) of the tick marks; you can either set the number of divisions (2 divisions would split the entire range in two halves), or the tick step (the distance between ticks) and the other value will be updated accordingly. Note:  There is no check to see if labels coordinate with the tick marks, which may be confusing for users if the blue labels and black ticks are off-step.
    tickStep: number | null | undefined;
    // The correct relative value. default: "eq". options: "eq", "lt", "gt", "le", "ge"
    correctRel: string | null | undefined;
    // This is the correct answer. The answer is validated (as right or wrong) by using only the end position of the point and the relation (=, &lt;, &gt;, ≤, ≥).
    correctX: number | null;
    // This controls the initial position of the point along the number line
    initialX: number | null | undefined;
    // Show tooltips
    showTooltip?: boolean;
    // When true, the answer is displayed and is immutable
    static: boolean;
}`,signature:{properties:[{key:"range",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"labelRange",value:{name:"ReadonlyArray",elements:[{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]}],raw:"ReadonlyArray<number | null>",required:!0}},{key:"labelStyle",value:{name:"string",required:!0}},{key:"labelTicks",value:{name:"boolean",required:!0}},{key:"isTickCtrl",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"divisionRange",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"numDivisions",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"snapDivisions",value:{name:"number",required:!0}},{key:"tickStep",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"correctRel",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"correctX",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!0}},{key:"initialX",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"showTooltip",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A list of all the possible correct and incorrect answers
    answers: ReadonlyArray<PerseusNumericInputAnswer>;
    // Translatable Text; Text to describe this input. This will be shown to users using screenreaders.
    labelText?: string | undefined;
    // Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them. Options: "normal" or "small"
    size: string;
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
    // Whether to right-align the text or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    rightAlign?: boolean;
    // Always false.  Not used for this widget
    static: boolean;
    // Used by examples, maybe not used and should be removed in the future
    // see TODO in numeric-input
    answerForms?: ReadonlyArray<PerseusNumericInputAnswerForm>;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    answerForms?: ReadonlyArray<MathFormat>;
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    // NOTE: perseus_data.go says this is non-nullable even though we handle null values.
    maxError: number | null | undefined;
    // Unsimplified answers are Ungraded, Accepted, or Wrong. Options: "required", "correct", or "enforced"
    simplify: string | null | undefined;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}],raw:"ReadonlyArray<MathFormat>",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"simplify",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswer>",required:!0}},{key:"labelText",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"size",value:{name:"string",required:!0}},{key:"coefficient",value:{name:"boolean",required:!0}},{key:"rightAlign",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    simplify:
        | "required"
        | "correct"
        | "enforced"
        | "optional"
        | null
        | undefined;
    name: MathFormat;
}`,signature:{properties:[{key:"simplify",value:{name:"union",raw:`| "required"
| "correct"
| "enforced"
| "optional"
| null
| undefined`,elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"correct"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'},{name:"null"},{name:"undefined"}],required:!0}},{key:"name",value:{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswerForm>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // All of the options available to the user. Place the cards in the correct order. The same card can be used more than once in the answer but will only be displayed once at the top of a stack of identical cards.
    options: ReadonlyArray<PerseusRenderer>;
    // The correct order of the options
    correctOptions: ReadonlyArray<PerseusRenderer>;
    // Cards that are not part of the answer
    otherOptions: ReadonlyArray<PerseusRenderer>;
    // "normal" for text options.  "auto" for image options.
    height: "normal" | "auto";
    // Use the "horizontal" layout for short text and small images. The "vertical" layout is best for longer text (e.g. proofs).
    layout: "horizontal" | "vertical";
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}}],raw:"ReadonlyArray<PerseusRenderer>",required:!0}},{key:"correctOptions",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}}],raw:"ReadonlyArray<PerseusRenderer>",required:!0}},{key:"otherOptions",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}}],raw:"ReadonlyArray<PerseusRenderer>",required:!0}},{key:"height",value:{name:"union",raw:'"normal" | "auto"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"auto"'}],required:!0}},{key:"layout",value:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    content: string;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The passage number
    passageNumber: number;
    // The reference number
    referenceNumber: number;
    // Short summary of the referenced section. This will be included in parentheses and quotes automatically.
    summaryText?: string;
}`,signature:{properties:[{key:"passageNumber",value:{name:"number",required:!0}},{key:"referenceNumber",value:{name:"number",required:!0}},{key:"summaryText",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; To add footnotes, add ^ characters where they belong in the passage. Then, add ^ in the footnotes area to reference the footnotes in the passage.
    footnotes: string;
    // Translatable Text; The text of the passage
    passageText: string;
    // translatableText - An optional title that will appear directly above the passage in the same font style. (e.g. Passage 1)
    passageTitle: string;
    // Should we show line numbers along with the passage?
    showLineNumbers: boolean;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"footnotes",value:{name:"string",required:!0}},{key:"passageText",value:{name:"string",required:!0}},{key:"passageTitle",value:{name:"string",required:!0}},{key:"showLineNumbers",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // A URL to display, must start with https://phet.colorado.edu/
    url: string;
    // Translatable Text; Description of the sim for Khanmigo and alt text
    description: string;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}},{key:"description",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; The Axis labels. e.g. ["X Label", "Y Label"]
    labels: ReadonlyArray<string>;
    // Translatable Text; Categories to display along the X access.  e.g. [">0", ">6", ">12", ">18"]
    categories: ReadonlyArray<string>;
    // The type of the graph. options "bar", "line", "pic", "histogram", "dotplot"
    type: PlotType;
    // The maximimum Y tick to display in the graph
    maxY: number;
    // The scale of the Y Axis
    scaleY: number;
    // Which ticks to display the labels for. For instance, setting this to "4" will only show every 4th label (plus the last one)
    labelInterval: number | null | undefined;
    // Creates the specified number of divisions between the horizontal lines. Fewer snaps between lines makes the graph easier for the student to create correctly.
    snapsPerLine: number;
    // The Y values the graph should start with
    starting: ReadonlyArray<number>;
    // The Y values that represent the correct answer expected
    correct: ReadonlyArray<number>;
    // A picture to represent items in a graph.
    picUrl: string | null | undefined;
    // deprecated
    picSize: number | null | undefined;
    // deprecated
    picBoxHeight: number | null | undefined;
    // deprecated
    plotDimensions: ReadonlyArray<number>;
}`,signature:{properties:[{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"type",value:{name:"unknown[number]",raw:"(typeof plotterPlotTypes)[number]",required:!0}},{key:"maxY",value:{name:"number",required:!0}},{key:"scaleY",value:{name:"number",required:!0}},{key:"labelInterval",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"snapsPerLine",value:{name:"number",required:!0}},{key:"starting",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"correct",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"picUrl",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"picSize",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"picBoxHeight",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"plotDimensions",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The choices provided to the user.
    choices: ReadonlyArray<PerseusRadioChoice>;
    // Does this have a "none of the above" option?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    hasNoneOfTheAbove?: boolean;
    // If multipleSelect is enabled, Specify the number expected to be correct.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    countChoices?: boolean;
    // Randomize the order of the options or keep them as defined
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    randomize?: boolean;
    // Does this set allow for multiple selections to be correct?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    multipleSelect?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    deselectEnabled?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    onePerLine?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    displayCount?: any;
    // v0 props
    // \`noneOfTheAbove\` is still in use (but only set to \`false\`).
    noneOfTheAbove?: false;
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Markdown; The label for this choice
    content: string;
    // Translatable Markdown; A clue to give the user when they get it wrong
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    clue?: string;
    // Whether this option is a correct answer or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    correct?: boolean;
    // If this is none of the above, override the content with "None of the above"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    isNoneOfTheAbove?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    widgets?: PerseusWidgetsMap;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"clue",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!1}}]}}],raw:"ReadonlyArray<PerseusRadioChoice>",required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"countChoices",value:{name:"boolean",required:!1}},{key:"randomize",value:{name:"boolean",required:!1}},{key:"multipleSelect",value:{name:"boolean",required:!1}},{key:"deselectEnabled",value:{name:"boolean",required:!1}},{key:"onePerLine",value:{name:"boolean",required:!1}},{key:"displayCount",value:{name:"any",required:!1}},{key:"noneOfTheAbove",value:{name:"literal",value:"false",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; The correct answer (in the correct order). The user will see the cards in a randomized order.
    correct: ReadonlyArray<string>;
    // Adds padding to the options.  Padding is good for text but not needed for images
    padding: boolean;
    // Use the "horizontal" layout for short text and small images. The "vertical" layout is best for longer text and larger images.
    layout: "horizontal" | "vertical";
}`,signature:{properties:[{key:"correct",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"padding",value:{name:"boolean",required:!0}},{key:"layout",value:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable Text; A list of column headers
    headers: ReadonlyArray<string>;
    // The number of rows to display
    rows: number;
    // The number of columns to display
    columns: number;
    // Translatable Text; A 2-dimensional array of text to populate the table with
    answers: ReadonlyArray<ReadonlyArray<string>>;
}`,signature:{properties:[{key:"headers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"rows",value:{name:"number",required:!0}},{key:"columns",value:{name:"number",required:!0}},{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}],raw:"ReadonlyArray<ReadonlyArray<string>>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    location: string;
    static?: boolean;
}`,signature:{properties:[{key:"location",value:{name:"string",required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}]},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    correctCrossedOut: string;
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
    choiceCrossedOutCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choiceCrossedOut: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    crossOut: string;
    crossOutOption: string;
    crossOutChoice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
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
    // The following strings are used for interactive graph SR descriptions.
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
    srCircleRadiusPoint: ({
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
    srAngleSideAtCoordinates: ({
        point,
        side,
        x,
        y,
    }: {
        point: number;
        side: string;
        x: string;
        y: string;
    }) => string;
    srAngleVertexAtCoordinatesWithAngleMeasure: ({
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
    // The above strings are used for interactive graph SR descriptions.
}`,signature:{properties:[{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"correctCrossedOut",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOut",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"crossOut",value:{name:"string",required:!0}},{key:"crossOutOption",value:{name:"string",required:!0}},{key:"crossOutChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPoint",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleSideAtCoordinates",value:{name:"signature",type:"function",raw:`({
    point,
    side,
    x,
    y,
}: {
    point: number;
    side: string;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point: number;
    side: string;
    x: string;
    y: string;
}`,signature:{properties:[{key:"point",value:{name:"number",required:!0}},{key:"side",value:{name:"string",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexAtCoordinatesWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    translationLintErrors: ReadonlyArray<string>;
    widgetInfo: Readonly<PerseusWidgetsMap>;
    widgetProps: Readonly<{
        [id: string]: any | null | undefined;
    }>;
    jiptContent: any;
    lastUsedWidgetId: string | null | undefined;
}`,signature:{properties:[{key:"translationLintErrors",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"widgetInfo",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}}],raw:"Readonly<PerseusWidgetsMap>",required:!0}},{key:"widgetProps",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    correctCrossedOut: string;
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
    choiceCrossedOutCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choiceCrossedOut: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    crossOut: string;
    crossOutOption: string;
    crossOutChoice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
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
    // The following strings are used for interactive graph SR descriptions.
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
    srCircleRadiusPoint: ({
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
    srAngleSideAtCoordinates: ({
        point,
        side,
        x,
        y,
    }: {
        point: number;
        side: string;
        x: string;
        y: string;
    }) => string;
    srAngleVertexAtCoordinatesWithAngleMeasure: ({
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
    // The above strings are used for interactive graph SR descriptions.
}`,signature:{properties:[{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"correctCrossedOut",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOut",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"crossOut",value:{name:"string",required:!0}},{key:"crossOutOption",value:{name:"string",required:!0}},{key:"crossOutChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPoint",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleSideAtCoordinates",value:{name:"signature",type:"function",raw:`({
    point,
    side,
    x,
    y,
}: {
    point: number;
    side: string;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point: number;
    side: string;
    x: string;
    y: string;
}`,signature:{properties:[{key:"point",value:{name:"number",required:!0}},{key:"side",value:{name:"string",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexAtCoordinatesWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}},{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    translationLintErrors: ReadonlyArray<string>;
    widgetInfo: Readonly<PerseusWidgetsMap>;
    widgetProps: Readonly<{
        [id: string]: any | null | undefined;
    }>;
    jiptContent: any;
    lastUsedWidgetId: string | null | undefined;
}`,signature:{properties:[{key:"translationLintErrors",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"widgetInfo",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}}],raw:"Readonly<PerseusWidgetsMap>",required:!0}},{key:"widgetProps",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    correctCrossedOut: string;
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
    choiceCrossedOutCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choiceCrossedOut: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    crossOut: string;
    crossOutOption: string;
    crossOutChoice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
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
    // The following strings are used for interactive graph SR descriptions.
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
    srCircleRadiusPoint: ({
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
    srAngleSideAtCoordinates: ({
        point,
        side,
        x,
        y,
    }: {
        point: number;
        side: string;
        x: string;
        y: string;
    }) => string;
    srAngleVertexAtCoordinatesWithAngleMeasure: ({
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
    // The above strings are used for interactive graph SR descriptions.
}`,signature:{properties:[{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"correctCrossedOut",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOut",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"crossOut",value:{name:"string",required:!0}},{key:"crossOutOption",value:{name:"string",required:!0}},{key:"crossOutChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPoint",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleSideAtCoordinates",value:{name:"signature",type:"function",raw:`({
    point,
    side,
    x,
    y,
}: {
    point: number;
    side: string;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point: number;
    side: string;
    x: string;
    y: string;
}`,signature:{properties:[{key:"point",value:{name:"number",required:!0}},{key:"side",value:{name:"string",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexAtCoordinatesWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}}]}}],alias:"Props"}}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"getDOMNodeForPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"getInputPaths",docblock:null,modifiers:[],params:[],returns:null},{name:"focusPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"blurPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null},{name:"emptyWidgets",docblock:`Returns an array of widget ids that are empty (meaning widgets where the
learner has not interacted with the widget yet or has not filled in all
fields).  For example, the \`interactive-graph\` widget is considered
empty if the graph is in the starting state.`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}},description:`Returns an array of widget ids that are empty (meaning widgets where the
learner has not interacted with the widget yet or has not filled in all
fields).  For example, the \`interactive-graph\` widget is considered
empty if the graph is in the starting state.`},{name:"_setWidgetProps",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:null},{name:"newProps",optional:!1,type:null},{name:"cb",optional:!1,type:null},{name:"silent",optional:!1,type:null}],returns:null},{name:"setInputValue",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:null},{name:"newValue",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"getUserInput",docblock:`Returns an array of the widget \`.getUserInput()\` results

TODO: can we remove this?
@deprecated use getUserInputMap`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"union",raw:"UserInputArray | UserInput | null | undefined",elements:[{name:"UserInputArray"},{name:"union",raw:`| PerseusCategorizerUserInput
| PerseusCSProgramUserInput
| PerseusDropdownUserInput
| PerseusExpressionUserInput
| PerseusGrapherUserInput
| PerseusIFrameUserInput
| PerseusInputNumberUserInput
| PerseusInteractiveGraphUserInput
| PerseusLabelImageUserInput
| PerseusMatcherUserInput
| PerseusMatrixUserInput
| PerseusNumberLineUserInput
| PerseusNumericInputUserInput
| PerseusOrdererUserInput
| PerseusPlotterUserInput
| PerseusRadioUserInput
| PerseusSorterUserInput
| PerseusTableUserInput`,elements:[{name:"signature",type:"object",raw:`{
    values: PerseusCategorizerScoringData["values"];
}`,signature:{properties:[{key:"values",value:{name:'intersection["values"]',raw:'PerseusCategorizerScoringData["values"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    value: number;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0}}]}},{name:"string"},{name:"union",raw:'PerseusGrapherRubric["correct"]'},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}]},{name:"signature",type:"object",raw:`{
    markers: ReadonlyArray<InteractiveMarkerType>;
}`,signature:{properties:[{key:"markers",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`MarkerType & {
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
    // The list of correct answers expected for the marker.
    answers: ReadonlyArray<string>;
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"showCorrectness",value:{name:"union",raw:'"correct" | "incorrect"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'}],required:!1}},{key:"focused",value:{name:"boolean",required:!1}}]}}]}],raw:"ReadonlyArray<InteractiveMarkerType>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
}`,signature:{properties:[{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    answers: PerseusMatrixRubric["answers"];
}`,signature:{properties:[{key:"answers",value:{name:'intersection["answers"]',raw:'PerseusMatrixRubric["answers"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    isTickCrtl?: boolean;
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
    divisionRange: ReadonlyArray<number>;
}`,signature:{properties:[{key:"isTickCrtl",value:{name:"boolean",required:!1}},{key:"numLinePosition",value:{name:"number",required:!0}},{key:"rel",value:{name:"union",raw:'Relationship | "eq"',elements:[{name:"union",raw:'"lt" | "gt" | "le" | "ge"',elements:[{name:"literal",value:'"lt"'},{name:"literal",value:'"gt"'},{name:"literal",value:'"le"'},{name:"literal",value:'"ge"'}]},{name:"literal",value:'"eq"'}],required:!0}},{key:"numDivisions",value:{name:"number",required:!0}},{key:"divisionRange",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    current: ReadonlyArray<string>;
}`,signature:{properties:[{key:"current",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},{name:"signature",type:"object",raw:`{
    choicesSelected: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"choicesSelected",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    options: ReadonlyArray<string>;
    changed: boolean;
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"changed",value:{name:"boolean",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}],raw:"ReadonlyArray<ReadonlyArray<string>>"}]},{name:"null"},{name:"undefined"}]}],raw:`ReadonlyArray<
    UserInputArray | UserInput | null | undefined
>`}},description:"Returns an array of the widget `.getUserInput()` results\n\nTODO: can we remove this?"},{name:"getUserInputMap",docblock:"Returns an object of the widget `.getUserInput()` results",modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:"{[widgetId: string]: UserInput | UserInputMap}",signature:{properties:[{key:{name:"string"},value:{name:"union",raw:"UserInput | UserInputMap",elements:[{name:"union",raw:`| PerseusCategorizerUserInput
| PerseusCSProgramUserInput
| PerseusDropdownUserInput
| PerseusExpressionUserInput
| PerseusGrapherUserInput
| PerseusIFrameUserInput
| PerseusInputNumberUserInput
| PerseusInteractiveGraphUserInput
| PerseusLabelImageUserInput
| PerseusMatcherUserInput
| PerseusMatrixUserInput
| PerseusNumberLineUserInput
| PerseusNumericInputUserInput
| PerseusOrdererUserInput
| PerseusPlotterUserInput
| PerseusRadioUserInput
| PerseusSorterUserInput
| PerseusTableUserInput`,elements:[{name:"signature",type:"object",raw:`{
    values: PerseusCategorizerScoringData["values"];
}`,signature:{properties:[{key:"values",value:{name:'intersection["values"]',raw:'PerseusCategorizerScoringData["values"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    value: number;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0}}]}},{name:"string"},{name:"union",raw:'PerseusGrapherRubric["correct"]'},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}]},{name:"signature",type:"object",raw:`{
    markers: ReadonlyArray<InteractiveMarkerType>;
}`,signature:{properties:[{key:"markers",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`MarkerType & {
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
    // The list of correct answers expected for the marker.
    answers: ReadonlyArray<string>;
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"showCorrectness",value:{name:"union",raw:'"correct" | "incorrect"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'}],required:!1}},{key:"focused",value:{name:"boolean",required:!1}}]}}]}],raw:"ReadonlyArray<InteractiveMarkerType>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
}`,signature:{properties:[{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    answers: PerseusMatrixRubric["answers"];
}`,signature:{properties:[{key:"answers",value:{name:'intersection["answers"]',raw:'PerseusMatrixRubric["answers"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    isTickCrtl?: boolean;
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
    divisionRange: ReadonlyArray<number>;
}`,signature:{properties:[{key:"isTickCrtl",value:{name:"boolean",required:!1}},{key:"numLinePosition",value:{name:"number",required:!0}},{key:"rel",value:{name:"union",raw:'Relationship | "eq"',elements:[{name:"union",raw:'"lt" | "gt" | "le" | "ge"',elements:[{name:"literal",value:'"lt"'},{name:"literal",value:'"gt"'},{name:"literal",value:'"le"'},{name:"literal",value:'"ge"'}]},{name:"literal",value:'"eq"'}],required:!0}},{key:"numDivisions",value:{name:"number",required:!0}},{key:"divisionRange",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    current: ReadonlyArray<string>;
}`,signature:{properties:[{key:"current",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},{name:"signature",type:"object",raw:`{
    choicesSelected: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"choicesSelected",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    options: ReadonlyArray<string>;
    changed: boolean;
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"changed",value:{name:"boolean",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}],raw:"ReadonlyArray<ReadonlyArray<string>>"}]},{name:"UserInputMap"}],required:!0}}]}}},description:"Returns an object of the widget `.getUserInput()` results"},{name:"getWidgetIds",docblock:`Returns an array of all widget IDs in the order they occur in
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
      coords: [
          // The vertex
          Coord, // A point along one line of the absolute value "V" lines
          Coord,
      ];
  }
| {
      type: "exponential";
      // Two points along the asymptote line. Usually (always?) a
      // horizontal or vertical line.
      asymptote: [Coord, Coord];
      // Two points along the exponential curve. One end of the curve
      // trends towards the asymptote.
      coords: [Coord, Coord];
  }
| {
      type: "linear";
      // Two points along the straight line
      coords: [Coord, Coord];
  }
| {
      type: "logarithm";
      // Two points along the asymptote line.
      asymptote: [Coord, Coord];
      // Two points along the logarithmic curve. One end of the curve
      // trends towards the asymptote.
      coords: [Coord, Coord];
  }
| {
      type: "quadratic";
      coords: [
          // The vertex of the parabola
          Coord, // A point along the parabola
          Coord,
      ];
  }
| {
      type: "sinusoid";
      // Two points on the same slope in the sinusoid wave line.
      coords: [Coord, Coord];
  }
| {
      type: "tangent";
      // Two points on the same slope in the tangent wave line.
      coords: [Coord, Coord];
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "absolute_value";
    coords: [
        // The vertex
        Coord, // A point along one line of the absolute value "V" lines
        Coord,
    ];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"absolute_value"',required:!0}},{key:"coords",value:{name:"tuple",raw:`[
    // The vertex
    Coord, // A point along one line of the absolute value "V" lines
    Coord,
]`,elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "exponential";
    // Two points along the asymptote line. Usually (always?) a
    // horizontal or vertical line.
    asymptote: [Coord, Coord];
    // Two points along the exponential curve. One end of the curve
    // trends towards the asymptote.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"exponential"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // Two points along the straight line
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "logarithm";
    // Two points along the asymptote line.
    asymptote: [Coord, Coord];
    // Two points along the logarithmic curve. One end of the curve
    // trends towards the asymptote.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"logarithm"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    coords: [
        // The vertex of the parabola
        Coord, // A point along the parabola
        Coord,
    ];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"tuple",raw:`[
    // The vertex of the parabola
    Coord, // A point along the parabola
    Coord,
]`,elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Two points on the same slope in the sinusoid wave line.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tangent";
    // Two points on the same slope in the tangent wave line.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tangent"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}}],required:!0}}]}},{name:"intersection",raw:`RendererPromptJSON & {
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
}`,computed:!1},required:!1}}};export{wa as D,Ge as J,G as P,Ce as R,h as S,va as a,Pa as b,ka as c,qa as d,Ta as e,Ra as f,Wt as g,xa as h,Lt as i,Et as j,ba as k,He as l,Ut as m,At as n,Ia as o,Nr as p,U as q,fa as r,Ca as s,Aa as t,Nt as u,St as v,dn as w,on as x,O as y};
