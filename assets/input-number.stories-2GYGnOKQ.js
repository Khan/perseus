import{aI as p,j as l}from"./iframe-qpA9NB0p.js";import{S as i}from"./server-item-renderer-with-debug-ui-Cs3kwcEY.js";import"./server-item-renderer-CIFgUBjs.js";import"./hints-renderer-D_01Gx1V.js";import"./main-BXEXH09n.js";import"./test-keypad-context-wrapper-Cvvckpoq.js";import"./Popper-BMl528ea.js";function S(e,n){const u=`${e} 1`,m={type:e,options:n},c={};c[u]=m;const W={content:`[[☃ ${u}]]`,images:{},widgets:c};return p({question:W})}const z={content:`Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  

**What fraction of the pie did Denis's dad eat?**  
![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    
[[☃ input-number 1]]  



`,images:{"https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":{width:200,height:200}},widgets:{"input-number 1":{version:{major:0,minor:0},type:"input-number",graded:!0,alignment:"default",options:{maxError:.1,inexact:!1,value:.3333333333333333,simplify:"optional",answerType:"rational",size:"normal"}}}},E={content:`A washing machine is being redesigned to handle a greater volume of water.  One part is a pipe with a radius of $3 \\,\\text{cm}$ and a length of $11\\,\\text{cm}$.  It gets replaced with a pipe of radius $4\\,\\text{cm}$, and the same length. 

**How many more cubic centimeters of water can the new pipe hold?**

 [[☃ input-number 1]] $\\text{cm}^3$`,images:Object.freeze({}),widgets:{"input-number 1":{type:"input-number",graded:!0,options:{maxError:.1,inexact:!1,value:241.90263432641407,simplify:"required",answerType:"pi",size:"normal"}}}},O={content:`Akshat works in a hospital lab.

To project blood quantities, he wants to know the probability that more than $1$ of the next $7$ donors will have type-A blood. From his previous work, Sorin knows that $\\dfrac14$ of donors have type-A blood.

Akshat uses a computer to produce many samples that simulate the next $7$ donors. The first $8$ samples are shown in the table below where "$\\text{\\red{A}}$" represents a donor *with* type-A blood, and "$\\text{\\blue{Z}}$" represents a donor *without* type-A blood.

**Based on the samples below, estimate the probability that  more than $1$ of the next $7$ donors will have type-A blood.** If necessary, round your answer to the nearest hundredth. [[☃ input-number 1]]

*Note: This a small sample to practice with. A larger sample could give a much better estimate.*

 | Sample |
:-: | :-: | 
$1$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$
$2$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$
$3$ | $\\text{\\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$
$4$ | $\\text{\\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$
$5$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\red{A}}$
$6$ | $\\text{\\blue{Z}, \\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$
$7$ | $\\text{\\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}}$
$8$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$

`,images:Object.freeze({}),widgets:{"input-number 1":{type:"input-number",graded:!0,options:{maxError:.1,inexact:!1,value:.5,simplify:"optional",answerType:"percent",size:"small"}}}},K={title:"Widgets/Input Number",component:i,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to input numerical values with specific validation rules,                    supporting basic mathematical responses."}}},argTypes:{maxError:{control:{type:"range",min:0,max:1,step:.1}},inexact:{control:{type:"boolean"}},value:{control:{type:"number"}},simplify:{control:{type:"select",options:["required","optional","enforced"]}},answerType:{control:{type:"select",options:["number","decimal","integer","rational","improper","mixed","percent","pi"]}},size:{control:{type:"select",options:["normal","small"]}},rightAlign:{control:{type:"boolean"}}}},d=(e,n,u)=>{const m=e.widgets[n];return{...e,widgets:{[n]:{...m,options:{...m.options,...u}}}}},t=e=>{const n=d(z,"input-number 1",e);return l.jsx(i,{item:p({question:n})})};t.args=z.widgets["input-number 1"].options;const r=e=>{const n=d(E,"input-number 1",e);return l.jsx(i,{item:p({question:n})})};r.args=E.widgets["input-number 1"].options;const a=e=>{const n=d(O,"input-number 1",e);return l.jsx(i,{item:p({question:n})})};a.args=O.widgets["input-number 1"].options;const s=()=>{const e=S("input-number",{simplify:"optional",size:"normal",value:42});return e.question.content=`The answer is 42
${e.question.content}`,l.jsx(i,{item:e})},o=()=>{const e=S("input-number",{simplify:"optional",size:"normal",value:42});return e.question.content=`The answer is 42
${e.question.content}`,l.jsx(i,{item:e,startAnswerless:!0})};t.__docgenInfo={description:"",methods:[],displayName:"Rational",props:{answerType:{required:!1,tsType:{name:"union",raw:`| "number"
| "decimal"
| "integer"
| "rational"
| "improper"
| "mixed"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"number"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"integer"'},{name:"literal",value:'"rational"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]},description:""},inexact:{required:!1,tsType:{name:"boolean"},description:""},maxError:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},simplify:{required:!0,tsType:{name:"union",raw:'"required" | "optional" | "enforced"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"optional"'},{name:"literal",value:'"enforced"'}]},description:""},size:{required:!0,tsType:{name:"union",raw:'"normal" | "small"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"small"'}]},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},customKeypad:{required:!1,tsType:{name:"boolean"},description:""}}};r.__docgenInfo={description:"",methods:[],displayName:"PiSimplify",props:{answerType:{required:!1,tsType:{name:"union",raw:`| "number"
| "decimal"
| "integer"
| "rational"
| "improper"
| "mixed"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"number"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"integer"'},{name:"literal",value:'"rational"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]},description:""},inexact:{required:!1,tsType:{name:"boolean"},description:""},maxError:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},simplify:{required:!0,tsType:{name:"union",raw:'"required" | "optional" | "enforced"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"optional"'},{name:"literal",value:'"enforced"'}]},description:""},size:{required:!0,tsType:{name:"union",raw:'"normal" | "small"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"small"'}]},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},customKeypad:{required:!1,tsType:{name:"boolean"},description:""}}};a.__docgenInfo={description:"",methods:[],displayName:"Percent",props:{answerType:{required:!1,tsType:{name:"union",raw:`| "number"
| "decimal"
| "integer"
| "rational"
| "improper"
| "mixed"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"number"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"integer"'},{name:"literal",value:'"rational"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]},description:""},inexact:{required:!1,tsType:{name:"boolean"},description:""},maxError:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},rightAlign:{required:!1,tsType:{name:"boolean"},description:""},simplify:{required:!0,tsType:{name:"union",raw:'"required" | "optional" | "enforced"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"optional"'},{name:"literal",value:'"enforced"'}]},description:""},size:{required:!0,tsType:{name:"union",raw:'"normal" | "small"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"small"'}]},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},customKeypad:{required:!1,tsType:{name:"boolean"},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"Answerful"};o.__docgenInfo={description:"",methods:[],displayName:"Answerless"};var b,g,f;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`(args: InputNumberOptions): React.ReactElement => {
  const question = updateWidgetOptions(question1, "input-number 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,w,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`(args: InputNumberOptions): React.ReactElement => {
  const question = updateWidgetOptions(question2, "input-number 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(y=(w=r.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var v,$,q;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`(args: InputNumberOptions): React.ReactElement => {
  const question = updateWidgetOptions(question3, "input-number 1", args);
  return <ServerItemRendererWithDebugUI item={generateTestPerseusItem({
    question
  })} />;
}`,...(q=($=a.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var x,Z,T;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`(): React.ReactElement => {
  const item = getAnswerfulItem("input-number", {
    simplify: "optional",
    size: "normal",
    value: 42
  });
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line
  item.question.content = \`The answer is 42\\n\${item.question.content}\`;
  return <ServerItemRendererWithDebugUI item={item} />;
}`,...(T=(Z=s.parameters)==null?void 0:Z.docs)==null?void 0:T.source}}};var A,I,R;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`(): React.ReactElement => {
  const item = getAnswerfulItem("input-number", {
    simplify: "optional",
    size: "normal",
    value: 42
  });
  // TODO(LEMS-3083): Remove eslint suppression
  // eslint-disable-next-line
  item.question.content = \`The answer is 42\\n\${item.question.content}\`;
  return <ServerItemRendererWithDebugUI item={item} startAnswerless />;
}`,...(R=(I=o.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};const L=["Rational","PiSimplify","Percent","Answerful","Answerless"];export{s as Answerful,o as Answerless,a as Percent,r as PiSimplify,t as Rational,L as __namedExportsOrder,K as default};
